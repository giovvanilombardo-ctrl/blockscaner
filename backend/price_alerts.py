"""Price alerts: signed-in users set a target EUR price per coin; a platform
cron (see .emergent/crons.yml) checks active alerts and emails users when the
target is reached."""
import asyncio
import hmac
import logging
import os
import uuid
from datetime import datetime, timezone

from fastapi import APIRouter, Depends, HTTPException, Request
from pydantic import BaseModel

from email_templates import send_email, email_wrapper
from market_data import eur_prices_for

logger = logging.getLogger(__name__)

MAX_ALERTS_PER_USER = 20


def create_alerts_router(db, require_user):
    router = APIRouter(prefix="/api/alerts", tags=["alerts"])

    class AlertIn(BaseModel):
        coin_id: str
        sym: str
        name: str
        target_price: float
        direction: str

    @router.get("")
    async def list_alerts(user=Depends(require_user)):
        cur = db.price_alerts.find({"user_id": user["id"]}, {"_id": 0}).sort("created_at", -1)
        return [a async for a in cur]

    @router.post("")
    async def create_alert(body: AlertIn, user=Depends(require_user)):
        if body.target_price <= 0:
            raise HTTPException(400, "invalid target price")
        if body.direction not in ("above", "below"):
            raise HTTPException(400, "invalid direction")
        active = await db.price_alerts.count_documents({"user_id": user["id"], "active": True})
        if active >= MAX_ALERTS_PER_USER:
            raise HTTPException(400, "alert limit reached")
        doc = {
            "id": str(uuid.uuid4()), "user_id": user["id"], "email": user.get("email"),
            "coin_id": body.coin_id, "sym": body.sym.upper(), "name": body.name,
            "target_price": float(body.target_price), "direction": body.direction,
            "active": True, "created_at": datetime.now(timezone.utc).isoformat(),
            "triggered_at": None,
        }
        await db.price_alerts.insert_one(doc)
        doc.pop("_id", None)
        return doc

    @router.delete("/{alert_id}")
    async def delete_alert(alert_id: str, user=Depends(require_user)):
        r = await db.price_alerts.delete_one({"id": alert_id, "user_id": user["id"]})
        if not r.deleted_count:
            raise HTTPException(404, "alert not found")
        return {"ok": True}

    return router


_cron_runs: set = set()


def create_cron_router(db):
    router = APIRouter(prefix="/api/cron", tags=["cron"])

    @router.post("/price-alerts")
    async def price_alerts_cron(request: Request):
        # Cron endpoints must ack 2xx immediately; enqueue/background the actual work.
        secret = os.environ.get("WEBHOOK_CRON_SECRET", "")
        auth = request.headers.get("authorization", "")
        token = auth[len("Bearer "):] if auth.startswith("Bearer ") else ""
        if not secret or not hmac.compare_digest(token, secret):
            raise HTTPException(401, "unauthorized")
        try:
            body = await request.json()
        except Exception:
            raise HTTPException(400, "invalid body")
        run_id = (body or {}).get("run_id") or request.headers.get("x-webhook-id") or ""
        if run_id in _cron_runs:
            return {"ok": True, "deduplicated": True}
        _cron_runs.add(run_id)
        if len(_cron_runs) > 500:
            _cron_runs.clear()
        asyncio.create_task(_check_alerts(db))
        return {"ok": True}

    return router


async def _check_alerts(db):
    try:
        alerts = [a async for a in db.price_alerts.find({"active": True}, {"_id": 0})]
        if not alerts:
            return
        prices = await eur_prices_for(list({a["coin_id"] for a in alerts}))
        for a in alerts:
            price = prices.get(a["coin_id"])
            if not price:
                continue
            hit = price >= a["target_price"] if a["direction"] == "above" else price <= a["target_price"]
            if not hit:
                continue
            await db.price_alerts.update_one(
                {"id": a["id"], "active": True},
                {"$set": {"active": False,
                          "triggered_at": datetime.now(timezone.utc).isoformat(),
                          "trigger_price": price}})
            if a.get("email"):
                subject = f"Price alert: {a['name']} ({a['sym']}) reached your target"
                direction_txt = "risen above" if a["direction"] == "above" else "fallen below"
                content = (
                    f"<h2>Your price alert was triggered</h2>"
                    f"<p>{a['name']} ({a['sym']}) is now trading at <b>{price:,.2f} EUR</b> - "
                    f"it has {direction_txt} your target of {a['target_price']:,.2f} EUR.</p>"
                    f"<p>Log in to your Blockscaner account to review your position.</p>")
                try:
                    await send_email(to=a["email"], subject=subject,
                                     html=email_wrapper(content, a["email"]))
                except Exception as e:
                    logger.warning("alert email failed for %s: %s", a["id"], e)
    except Exception as e:
        logger.error("price alert check failed: %s", e)
