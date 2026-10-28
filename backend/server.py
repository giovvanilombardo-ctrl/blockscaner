import os
import re
import json
import uuid
import hashlib
import logging
from datetime import datetime, timedelta, timezone
from pathlib import Path
from typing import Optional
from urllib.parse import quote

import bcrypt
import jwt as pyjwt
from dotenv import load_dotenv
from fastapi import FastAPI, APIRouter, Request, Depends, HTTPException, UploadFile
from fastapi.responses import StreamingResponse, Response
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient, AsyncIOMotorGridFSBucket
from pydantic import BaseModel

load_dotenv(Path(__file__).parent / ".env")

from email_templates import (
    send_email, otp_email, abandoned_chat_html, lead_notification_html,
    lead_confirmation_html, visitor_reminder_html, welcome_email,
    deposit_email, withdrawal_email, reset_password_html,
)
from chat_prompt import SYSTEM_PROMPT

# ---------------- Config ----------------
mongo_url = os.environ["MONGO_URL"]
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ["DB_NAME"]]
fs = AsyncIOMotorGridFSBucket(db)

JWT_SECRET = os.environ["JWT_SECRET"]
JWT_ALGO = "HS256"
TOKEN_DAYS = 7
FRONTEND_URL = os.environ.get("FRONTEND_URL", "").rstrip("/")
NOTIFY_EMAIL = os.environ.get("NOTIFY_EMAIL", "delivered@resend.dev")
ADMIN_EMAIL = os.environ.get("ADMIN_EMAIL", "support@blockchain-24.com").lower()
ADMIN_PASSWORD = os.environ.get("ADMIN_PASSWORD", "")
EMERGENT_LLM_KEY = os.environ.get("EMERGENT_LLM_KEY", "")
LLM_MODEL = os.environ.get("LLM_MODEL", "gpt-4o-mini")

logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(name)s - %(levelname)s - %(message)s")
logger = logging.getLogger(__name__)

app = FastAPI()
api_router = APIRouter(prefix="/api")


def now_iso() -> str:
    return datetime.now(timezone.utc).isoformat()


def hash_password(p: str) -> str:
    return bcrypt.hashpw(p.encode(), bcrypt.gensalt()).decode()


def verify_password(p: str, h: str) -> bool:
    try:
        return bcrypt.checkpw(p.encode(), h.encode())
    except Exception:
        return False


def sha256(t: str) -> str:
    return hashlib.sha256(t.encode()).hexdigest()


def make_token(user: dict) -> str:
    now = datetime.now(timezone.utc)
    return pyjwt.encode(
        {"sub": user["id"], "role": user.get("role", "user"), "iat": now, "exp": now + timedelta(days=TOKEN_DAYS)},
        JWT_SECRET, algorithm=JWT_ALGO,
    )


def public_user(profile: dict) -> dict:
    return {
        "id": profile["id"],
        "email": profile.get("email"),
        "user_metadata": {
            "full_name": profile.get("full_name"),
            "nombre": profile.get("nombre"),
            "apellidos": profile.get("apellidos"),
        },
    }


async def get_token_payload(request: Request) -> Optional[dict]:
    auth = request.headers.get("Authorization", "")
    if not auth.startswith("Bearer "):
        return None
    try:
        return pyjwt.decode(auth[7:], JWT_SECRET, algorithms=[JWT_ALGO])
    except Exception:
        return None


async def current_user(request: Request) -> Optional[dict]:
    payload = await get_token_payload(request)
    if not payload:
        return None
    return await db.profiles.find_one({"id": payload["sub"]}, {"_id": 0})


async def require_user(request: Request) -> dict:
    user = await current_user(request)
    if not user:
        raise HTTPException(401, "Unauthorized")
    return user


async def is_admin(user: Optional[dict]) -> bool:
    if not user:
        return False
    return bool(await db.user_roles.find_one({"user_id": user["id"], "role": "admin"}))


async def require_admin(request: Request) -> dict:
    user = await require_user(request)
    if not await is_admin(user):
        raise HTTPException(403, "Forbidden: admin only")
    return user


# ---------------- Startup: seed admin + indexes ----------------
@app.on_event("startup")
async def startup():
    await db.profiles.create_index("email", unique=True)
    await db.download_tokens.create_index("exp", expireAfterSeconds=0)
    if ADMIN_PASSWORD:
        existing = await db.profiles.find_one({"email": ADMIN_EMAIL})
        if not existing:
            uid = str(uuid.uuid4())
            await db.profiles.insert_one({
                "id": uid, "email": ADMIN_EMAIL, "password_hash": hash_password(ADMIN_PASSWORD),
                "full_name": "Admin", "email_verificado": True, "created_at": now_iso(),
            })
            await db.user_roles.insert_one({"user_id": uid, "role": "admin"})
            logger.info("Seeded admin account %s", ADMIN_EMAIL)
        else:
            await db.user_roles.update_one(
                {"user_id": existing["id"], "role": "admin"},
                {"$setOnInsert": {"user_id": existing["id"], "role": "admin"}}, upsert=True)


# ---------------- Auth ----------------
class LoginIn(BaseModel):
    email: str
    password: str


@api_router.get("/")
async def root():
    return {"message": "Hello World"}


@api_router.post("/auth/login")
async def login(body: LoginIn):
    profile = await db.profiles.find_one({"email": body.email.strip().lower()})
    if not profile or not verify_password(body.password, profile.get("password_hash", "")):
        raise HTTPException(401, "Invalid email or password")
    return {"access_token": make_token(profile), "token_type": "bearer", "user": public_user(profile)}


@api_router.get("/auth/user")
async def auth_user(user=Depends(require_user)):
    return public_user(user)


@api_router.post("/auth/logout")
async def logout():
    return {"ok": True}


class UpdatePwIn(BaseModel):
    password: str
    current_password: Optional[str] = None


@api_router.post("/auth/update")
async def update_password(body: UpdatePwIn, user=Depends(require_user)):
    if body.current_password and not verify_password(body.current_password, user.get("password_hash", "")):
        raise HTTPException(400, "Current password incorrect")
    if len(body.password) < 6:
        raise HTTPException(400, "Password too short")
    await db.profiles.update_one({"id": user["id"]}, {"$set": {"password_hash": hash_password(body.password)}})
    return {"ok": True}


class ResetRequestIn(BaseModel):
    email: str


@api_router.post("/auth/reset-request")
async def reset_request(body: ResetRequestIn):
    email = body.email.strip().lower()
    profile = await db.profiles.find_one({"email": email})
    if profile:
        raw = uuid.uuid4().hex + uuid.uuid4().hex
        await db.reset_tokens.insert_one({
            "user_id": profile["id"], "token_hash": sha256(raw), "used": False,
            "expires_at": now_iso(), "exp": datetime.now(timezone.utc) + timedelta(minutes=30),
        })
        link = f"{FRONTEND_URL}/reset-password?token={raw}"
        subject, html = reset_password_html(email, link)
        try:
            await send_email(to=email, subject=subject, html=html)
        except HTTPException:
            pass
    return {"ok": True}


class ResetConfirmIn(BaseModel):
    token: str
    password: str


@api_router.post("/auth/reset-confirm")
async def reset_confirm(body: ResetConfirmIn):
    row = await db.reset_tokens.find_one_and_update(
        {"token_hash": sha256(body.token), "used": False},
        {"$set": {"used": True}},
    )
    if not row:
        raise HTTPException(400, "Invalid or expired token")
    if len(body.password) < 6:
        raise HTTPException(400, "Password too short")
    await db.profiles.update_one({"id": row["user_id"]}, {"$set": {"password_hash": hash_password(body.password)}})
    profile = await db.profiles.find_one({"id": row["user_id"]})
    return {"access_token": make_token(profile), "token_type": "bearer", "user": public_user(profile)}


# ---------------- PostgREST-style table gateway ----------------
OWNER_FIELD = {
    "profiles": "id", "casos": "user_id", "caso_actualizaciones": "user_id",
    "caso_documentos": "user_id", "user_balances": "user_id", "user_bank_details": "user_id",
    "withdrawal_requests": "user_id", "user_roles": "user_id",
}
PUBLIC_INSERT = {"leads", "chat_sessions"}
PUBLIC_UPDATE = {"chat_sessions"}
ADMIN_ONLY = {"email_tracking"}
DENY = {"contacto_otp", "download_tokens", "reset_tokens", "storage_files", "visitor_emails"}


def parse_value(v: str):
    if v == "true":
        return True
    if v == "false":
        return False
    if v == "null":
        return None
    try:
        return int(v)
    except ValueError:
        pass
    try:
        return float(v)
    except ValueError:
        pass
    return v


def parse_filters(request: Request) -> dict:
    q = {}
    for key, raw in request.query_params.multi_items():
        if key in ("select", "order", "limit"):
            continue
        if raw.startswith("eq."):
            q[key] = parse_value(raw[3:])
        elif raw.startswith("gte."):
            q[key] = {"$gte": parse_value(raw[4:])}
        elif raw.startswith("in.(") and raw.endswith(")"):
            q[key] = {"$in": [parse_value(x) for x in raw[4:-1].split(",")]}
    return q


def project_cols(select: str) -> dict:
    if select and select != "*":
        proj = {"_id": 0}
        proj.update({c.strip(): 1 for c in select.split(",") if c.strip()})
        proj.pop("password_hash", None)
        return proj
    return {"_id": 0, "password_hash": 0}


@api_router.api_route("/rest/{table}", methods=["GET", "POST", "PATCH", "DELETE"])
async def rest_gateway(table: str, request: Request):
    if not re.fullmatch(r"[a-z_]+", table) or table in DENY:
        raise HTTPException(404, "Not found")
    coll = db[table]
    user = await current_user(request)
    admin = await is_admin(user)
    method = request.method
    filters = parse_filters(request)

    # POST carrying filters behaves as an update (navigator.sendBeacon cannot PATCH)
    if method == "POST" and filters:
        method = "PATCH"

    if method == "GET":
        if table in ADMIN_ONLY and not admin:
            raise HTTPException(403, "Forbidden")
        if table in ("leads",) and not admin:
            raise HTTPException(403, "Forbidden")
        if table in OWNER_FIELD:
            if not user:
                raise HTTPException(401, "Unauthorized")
            if not admin:
                filters[OWNER_FIELD[table]] = user["id"]
        if table == "chat_sessions" and not admin:
            raise HTTPException(403, "Forbidden")

        select = request.query_params.get("select", "*")
        proj = project_cols(select)
        cursor = coll.find(filters, proj)
        order = request.query_params.get("order")
        if order:
            col, _, direction = order.partition(".")
            cursor = cursor.sort(col, -1 if direction == "desc" else 1)
        limit = request.query_params.get("limit")
        if limit and limit.isdigit():
            cursor = cursor.limit(int(limit))
        return await cursor.to_list(1000)

    body = None
    if method in ("POST", "PATCH"):
        try:
            body = await request.json()
        except Exception:
            body = None

    if method == "POST":
        docs = body if isinstance(body, list) else [body or {}]
        if table in PUBLIC_INSERT:
            pass
        elif table in OWNER_FIELD and table in ("caso_documentos", "user_bank_details", "withdrawal_requests"):
            if not user:
                raise HTTPException(401, "Unauthorized")
            if not admin:
                for d in docs:
                    d["user_id"] = user["id"]
        elif admin:
            pass
        else:
            raise HTTPException(403, "Forbidden")
        for d in docs:
            d.setdefault("id", str(uuid.uuid4()))
            d.setdefault("created_at", now_iso())
        await coll.insert_many(docs)
        for d in docs:
            d.pop("_id", None)
        return docs

    if method == "PATCH":
        if table in PUBLIC_UPDATE:
            pass
        elif table in OWNER_FIELD:
            if not user:
                raise HTTPException(401, "Unauthorized")
            if not admin:
                filters[OWNER_FIELD[table]] = user["id"]
        elif not admin:
            raise HTTPException(403, "Forbidden")
        if not filters and not admin:
            raise HTTPException(400, "Missing filters")
        payload = body or {}
        payload.pop("_id", None)
        await coll.update_many(filters, {"$set": payload})
        return await coll.find(filters, {"_id": 0}).to_list(100)

    if method == "DELETE":
        if not admin:
            if table in OWNER_FIELD and user:
                filters[OWNER_FIELD[table]] = user["id"]
            else:
                raise HTTPException(403, "Forbidden")
        result = await coll.delete_many(filters)
        return {"deleted": result.deleted_count}

    raise HTTPException(405, "Method not allowed")


# ---------------- Edge function ports ----------------
PHONE_RE = re.compile(r"^[+]?[0-9\s().\-]{6,20}$")
EMAIL_RE = re.compile(r"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$")


class RegisterIn(BaseModel):
    nombre: str
    apellidos: str
    telefono: str
    email: str
    password: str


def err_json(code: str, status: int):
    return Response(content=json.dumps({"error": code}), status_code=status,
                    media_type="application/json")


@api_router.post("/functions/account-register")
async def account_register(body: RegisterIn):
    nombre, apellidos = body.nombre.strip(), body.apellidos.strip()
    email = body.email.strip().lower()
    if not (1 <= len(nombre) <= 80 and 1 <= len(apellidos) <= 80
            and PHONE_RE.match(body.telefono.strip()) and EMAIL_RE.match(email) and len(email) <= 255):
        return err_json("invalid_input", 400)
    if not (6 <= len(body.password) <= 128):
        return err_json("weak_password", 400)

    existing = await db.profiles.find_one({"email": email})
    if existing:
        return err_json("exists" if existing.get("email_verificado") else "exists_unverified", 409)

    uid = str(uuid.uuid4())
    await db.profiles.insert_one({
        "id": uid, "email": email, "password_hash": hash_password(body.password),
        "full_name": f"{nombre} {apellidos}", "nombre": nombre, "apellidos": apellidos,
        "telefono": body.telefono.strip(), "email_verificado": False, "created_at": now_iso(),
    })
    await db.user_roles.insert_one({"user_id": uid, "role": "user"})
    await db.casos.insert_one({"id": str(uuid.uuid4()), "user_id": uid, "fase": 1, "progreso": 0, "created_at": now_iso(), "updated_at": now_iso()})
    return {"ok": True}


@api_router.post("/functions/account-verify")
async def account_verify(request: Request, user=Depends(require_user)):
    body = await request.json()
    action = body.get("action")
    uid = user["id"]

    if action == "send":
        recent = await db.contacto_otp.find_one({
            "user_id": uid,
            "created_at": {"$gte": (datetime.now(timezone.utc) - timedelta(seconds=60)).isoformat()},
        })
        if recent:
            return err_json("wait", 429)
        email = (user.get("email") or "").lower()
        codigo = f"{uuid.uuid4().int % 1_000_000:06d}"
        await db.contacto_otp.insert_one({
            "user_id": uid, "tipo": "email", "nuevo_valor": email, "proposito": "registro",
            "codigo_hash": sha256(f"{uid}:{codigo}"),
            "expira_at": (datetime.now(timezone.utc) + timedelta(seconds=600)).isoformat(),
            "intentos": 0, "usado": False, "created_at": now_iso(),
        })
        en = body.get("lang") == "en"
        subject, html = otp_email(user.get("nombre") or "", codigo, en)
        await send_email(to=email, subject=subject, html=html)
        return {"ok": True, "destino": email}

    if action == "confirm":
        codigo = str(body.get("codigo") or "")
        if not re.fullmatch(r"\d{6}", codigo):
            return err_json("invalid_input", 400)
        otp = await db.contacto_otp.find_one(
            {"user_id": uid, "proposito": "registro", "usado": False},
            sort=[("created_at", -1)],
        )
        if not otp or otp["expira_at"] < now_iso():
            return err_json("expired", 400)
        if otp.get("intentos", 0) >= 5:
            return err_json("too_many", 400)
        if sha256(f"{uid}:{codigo}") != otp["codigo_hash"]:
            await db.contacto_otp.update_one({"id": otp.get("id"), "_id": otp["_id"]}, {"$inc": {"intentos": 1}})
            return err_json("wrong", 400)
        await db.contacto_otp.update_one({"_id": otp["_id"]}, {"$set": {"usado": True}})
        await db.profiles.update_one({"id": uid}, {"$set": {"email_verificado": True}})
        return {"ok": True}

    return err_json("invalid_input", 400)


async def sign_download_token(bucket: str, path: str, days: int = 7) -> str:
    raw = uuid.uuid4().hex + uuid.uuid4().hex
    await db.download_tokens.insert_one({
        "token_hash": sha256(raw), "bucket": bucket, "path": path,
        "exp": datetime.now(timezone.utc) + timedelta(days=days),
    })
    return f"{FRONTEND_URL}/api/storage/file?token={raw}"


@api_router.post("/functions/notify-lead")
async def notify_lead(request: Request):
    body = await request.json()
    is_abandoned = body.get("type") == "abandoned_chat"

    if is_abandoned:
        subject, html = abandoned_chat_html(body.get("session_id", ""), body.get("messages") or [])
    else:
        docs = [d for d in (body.get("dokumente") or []) if isinstance(d, str) and d.startswith("uploads/")][:10]
        doc_links = []
        for d in docs:
            doc_links.append(await sign_download_token("case-documents", d, days=7))
        subject, html = lead_notification_html(body, doc_links, body.get("messages"))

    try:
        await send_email(to=NOTIFY_EMAIL, subject=subject, html=html)
    except HTTPException:
        pass

    if not is_abandoned and body.get("email"):
        c_subject, c_html = lead_confirmation_html(body)
        try:
            await send_email(to=body["email"], subject=c_subject, html=c_html)
        except HTTPException:
            pass

    return {"success": True, "method": "email"}


@api_router.post("/functions/send-visitor-reminder")
async def send_visitor_reminder(request: Request):
    body = await request.json()
    email = (body.get("email") or "").strip().lower()
    if not email or len(email) > 255 or not EMAIL_RE.match(email):
        return err_json("Invalid email", 400)
    await db.visitor_emails.update_one(
        {"email": email},
        {"$setOnInsert": {"email": email, "created_at": now_iso()}},
        upsert=True,
    )
    subject, html = visitor_reminder_html(email)
    try:
        await send_email(to=email, subject=subject, html=html)
        return {"success": True, "method": "email"}
    except HTTPException:
        return {"success": True, "method": "logged"}


def format_date_de(date_str: Optional[str] = None) -> str:
    try:
        d = datetime.fromisoformat(date_str) if date_str else datetime.now(timezone.utc)
        return d.strftime("%d.%m.%Y")
    except Exception:
        return date_str or ""


@api_router.post("/functions/admin-manage-users")
async def admin_manage_users(request: Request, admin=Depends(require_admin)):
    body = await request.json()
    action = body.get("action")

    if action == "create_user":
        email = str(body.get("email") or "").strip().lower()
        password = str(body.get("password") or "")
        full_name = body.get("full_name") or email
        if not EMAIL_RE.match(email) or len(password) < 6:
            return err_json("Invalid email or password", 400)
        existing = await db.profiles.find_one({"email": email})
        existed = bool(existing)
        if existing:
            uid = existing["id"]
            await db.profiles.update_one({"id": uid}, {"$set": {
                "full_name": full_name, "incident_date": body.get("incident_date") or None,
            }})
        else:
            uid = str(uuid.uuid4())
            await db.profiles.insert_one({
                "id": uid, "email": email, "password_hash": hash_password(password),
                "full_name": full_name, "incident_date": body.get("incident_date") or None,
                "email_verificado": True, "created_at": now_iso(),
            })
        await db.user_roles.update_one(
            {"user_id": uid, "role": "user"},
            {"$setOnInsert": {"user_id": uid, "role": "user"}}, upsert=True)

        initial_balance = body.get("initial_balance")
        if initial_balance is not None and float(initial_balance) > 0:
            cur = body.get("initial_currency") or "BTC"
            await db.user_balances.update_one(
                {"user_id": uid, "currency": cur},
                {"$set": {"balance": float(initial_balance), "updated_at": now_iso()},
                 "$setOnInsert": {"id": str(uuid.uuid4()), "user_id": uid, "currency": cur}},
                upsert=True)

        if not existed:
            raw = uuid.uuid4().hex + uuid.uuid4().hex
            await db.reset_tokens.insert_one({
                "user_id": uid, "token_hash": sha256(raw), "used": False,
                "expires_at": now_iso(), "exp": datetime.now(timezone.utc) + timedelta(hours=24),
            })
            link = f"{FRONTEND_URL}/reset-password?token={raw}"
            subject, html = welcome_email(full_name, email, link, format_date_de())
            try:
                await send_email(to=email, subject=subject, html=html)
            except HTTPException:
                pass

        return {"success": True, "user_id": uid, "existedAlready": existed}

    if action == "list_users":
        profiles = await db.profiles.find({}, {"_id": 0, "password_hash": 0}).sort("created_at", -1).to_list(1000)
        balances = await db.user_balances.find({}, {"_id": 0}).to_list(5000)
        bank_details = await db.user_bank_details.find({}, {"_id": 0}).to_list(1000)
        roles = await db.user_roles.find({}, {"_id": 0}).to_list(5000)
        return {"profiles": profiles, "balances": balances, "bankDetails": bank_details, "roles": roles}

    if action == "update_balance":
        uid, currency = body.get("user_id"), body.get("currency")
        balance = float(body.get("balance") or 0)
        prev = await db.user_balances.find_one({"user_id": uid, "currency": currency})
        previous = float(prev["balance"]) if prev else 0.0
        await db.user_balances.update_one(
            {"user_id": uid, "currency": currency},
            {"$set": {"balance": balance, "updated_at": now_iso()},
             "$setOnInsert": {"id": str(uuid.uuid4()), "user_id": uid, "currency": currency}},
            upsert=True)
        if balance > previous:
            profile = await db.profiles.find_one({"id": uid})
            if profile and profile.get("email"):
                subject, html = deposit_email(
                    profile.get("full_name") or profile["email"], profile["email"],
                    currency, round(balance - previous, 8), format_date_de())
                try:
                    await send_email(to=profile["email"], subject=subject, html=html)
                except HTTPException:
                    pass
        return {"success": True}

    if action == "update_incident_date":
        await db.profiles.update_one({"id": body.get("user_id")},
                                     {"$set": {"incident_date": body.get("incident_date") or None}})
        return {"success": True}

    if action == "delete_user":
        uid = body.get("user_id")
        await db.profiles.delete_one({"id": uid})
        for coll in ("user_roles", "user_balances", "user_bank_details", "withdrawal_requests",
                     "casos", "caso_actualizaciones", "caso_documentos", "contacto_otp"):
            await db[coll].delete_many({"user_id": uid})
        return {"success": True}

    if action == "handle_withdrawal":
        withdrawal_id, new_status = body.get("withdrawal_id"), body.get("new_status")
        if new_status not in ("approved", "rejected"):
            return err_json("Invalid withdrawal status", 400)
        withdrawal = await db.withdrawal_requests.find_one_and_update(
            {"id": withdrawal_id, "status": {"$in": ["pending", "pending_fee"]}},
            {"$set": {"status": new_status}},
        )
        if not withdrawal:
            existing = await db.withdrawal_requests.find_one({"id": withdrawal_id})
            if not existing:
                return err_json("Withdrawal not found", 404)
            return err_json(f"Withdrawal already {existing['status']}", 409)

        if new_status == "rejected" and withdrawal.get("balance_locked"):
            uid = withdrawal["user_id"]
            amount = float(withdrawal["amount"])
            deductions = withdrawal.get("deductions")
            if deductions:
                # portal withdrawals: restore each deducted asset to the wallet
                for d in deductions:
                    act = d.get("activo")
                    cant = float(d.get("cantidad") or 0)
                    if act and cant > 0:
                        row = await db.cartera_saldos.find_one({"user_id": uid, "activo": act})
                        cur = float(row["cantidad"]) if row else 0.0
                        await db.cartera_saldos.update_one(
                            {"user_id": uid, "activo": act},
                            {"$set": {"cantidad": round(cur + cant, 8), "updated_at": now_iso()},
                             "$setOnInsert": {"id": str(uuid.uuid4()), "user_id": uid, "activo": act}},
                            upsert=True)
            elif withdrawal.get("withdraw_type") == "swap":
                primary = await db.user_balances.find_one({"user_id": uid})
                if primary:
                    await db.user_balances.update_one(
                        {"_id": primary["_id"]},
                        {"$set": {"balance": float(primary["balance"]) + amount, "updated_at": now_iso()}})
            else:
                currency = withdrawal["from_currency"]
                await db.user_balances.update_one(
                    {"user_id": uid, "currency": currency},
                    {"$inc": {"balance": amount}, "$set": {"updated_at": now_iso()},
                     "$setOnInsert": {"id": str(uuid.uuid4()), "user_id": uid, "currency": currency}},
                    upsert=True)

        profile = await db.profiles.find_one({"id": withdrawal["user_id"]})
        if profile and profile.get("email"):
            subject, html = withdrawal_email(
                profile["email"], profile.get("full_name") or profile["email"],
                new_status, withdrawal["amount"], withdrawal["from_currency"],
                withdrawal.get("eur_amount") or 0, withdrawal.get("withdraw_type") or "",
                withdrawal.get("wallet_address"), withdrawal.get("exchange_name"),
                withdrawal.get("fee_percentage"), withdrawal.get("fee_amount"),
                format_date_de(withdrawal.get("created_at")))
            try:
                await send_email(to=profile["email"], subject=subject, html=html)
            except HTTPException:
                pass
        return {"success": True}

    return err_json("Unknown action", 400)


# ---------------- AI chat (OpenAI-compatible SSE) ----------------
@api_router.post("/functions/chat-victim")
async def chat_victim(request: Request):
    body = await request.json()
    messages = body.get("messages") or []
    lang = body.get("lang")
    if not messages:
        return err_json("No messages", 400)

    system = SYSTEM_PROMPT
    if lang == "en":
        system += "\n\nIMPORTANT: The user is browsing the English version of the website. Reply ONLY in English, with the same rules and content as above."

    async def events():
        try:
            import litellm
            full_messages = [{"role": "system", "content": system}]
            full_messages += [{"role": m.get("role"), "content": m.get("content", "")} for m in messages]
            params = {
                "model": f"openai/{LLM_MODEL}",
                "api_key": EMERGENT_LLM_KEY,
                "messages": full_messages,
                "stream": True,
            }
            if EMERGENT_LLM_KEY.startswith("sk-emergent-"):
                params["api_base"] = os.environ.get(
                    "INTEGRATION_PROXY_URL", "https://integrations.emergentagent.com"
                ) + "/llm"
            stream = await litellm.acompletion(**params)
            async for chunk in stream:
                try:
                    delta = chunk.choices[0].delta.content
                except Exception:
                    delta = None
                if delta:
                    yield f"data: {json.dumps({'choices': [{'delta': {'content': delta}}]})}\n\n"
        except Exception as e:
            logger.error("chat error: %s", e)
            yield f"data: {json.dumps({'choices': [{'delta': {'content': ''}}], 'error': str(e)})}\n\n"
        yield "data: [DONE]\n\n"

    return StreamingResponse(events(), media_type="text/event-stream",
                             headers={"Cache-Control": "no-cache", "X-Accel-Buffering": "no"})


# ---------------- Email tracking pixel / click ----------------
@api_router.get("/email-track")
async def email_track(request: Request, t: Optional[str] = None, e: Optional[str] = None,
                      s: Optional[str] = None, r: Optional[str] = None):
    if not t or not e:
        return Response("Missing params", status_code=400)
    await db.email_tracking.insert_one({
        "id": str(uuid.uuid4()), "email": e, "session_id": s, "event_type": t,
        "link_url": r, "user_agent": request.headers.get("user-agent"),
        "ip_address": (request.headers.get("x-forwarded-for") or "").split(",")[0].strip() or None,
        "created_at": now_iso(),
    })
    if t == "click" and r:
        if FRONTEND_URL and r.startswith(FRONTEND_URL):
            return Response(status_code=302, headers={"Location": r})
        return Response(status_code=400)
    pixel = bytes.fromhex("4749463839610100010080000000ffffff21f90401000000002c00000000010001000002024401003b")
    return Response(pixel, media_type="image/gif",
                    headers={"Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
                             "Pragma": "no-cache", "Expires": "0"})


# ---------------- File storage ----------------
MAX_UPLOAD = 20 * 1024 * 1024


@api_router.post("/storage/upload")
async def storage_upload(request: Request, bucket: str, path: str, file: UploadFile):
    user = await current_user(request)
    admin = await is_admin(user)
    if bucket == "case-documents":
        if not path.startswith("uploads/"):
            raise HTTPException(403, "Invalid path")
    elif bucket == "caso-documentos":
        if not user:
            raise HTTPException(401, "Unauthorized")
        if not admin and not path.startswith(f"{user['id']}/"):
            raise HTTPException(403, "Invalid path")
    else:
        raise HTTPException(404, "Unknown bucket")

    data = await file.read(MAX_UPLOAD + 1)
    if len(data) > MAX_UPLOAD:
        raise HTTPException(413, "Maximum size is 20 MB")
    content_type = file.content_type or "application/octet-stream"
    file_id = await fs.upload_from_stream(path, data, metadata={"bucket": bucket})
    await db.storage_files.update_one(
        {"bucket": bucket, "path": path},
        {"$set": {"bucket": bucket, "path": path, "file_id": str(file_id), "size": len(data),
                  "content_type": content_type, "owner": user["id"] if user else None,
                  "created_at": now_iso()}},
        upsert=True)
    return {"path": path}


class SignIn(BaseModel):
    bucket: str
    path: str
    expires_in: int = 300


@api_router.post("/storage/sign")
async def storage_sign(body: SignIn, request: Request):
    user = await require_user(request)
    admin = await is_admin(user)
    if not admin and not body.path.startswith(f"{user['id']}/"):
        raise HTTPException(403, "Forbidden")
    rec = await db.storage_files.find_one({"bucket": body.bucket, "path": body.path})
    if not rec:
        raise HTTPException(404, "Not found")
    raw = uuid.uuid4().hex + uuid.uuid4().hex
    await db.download_tokens.insert_one({
        "token_hash": sha256(raw), "bucket": body.bucket, "path": body.path,
        "exp": datetime.now(timezone.utc) + timedelta(seconds=min(body.expires_in, 604800)),
    })
    return {"signedUrl": f"{FRONTEND_URL}/api/storage/file?token={raw}"}


@api_router.get("/storage/file")
async def storage_file(token: str):
    from bson import ObjectId
    rec = await db.download_tokens.find_one({"token_hash": sha256(token)})
    if not rec:
        raise HTTPException(404, "Not found")
    meta = await db.storage_files.find_one({"bucket": rec["bucket"], "path": rec["path"]})
    if not meta:
        raise HTTPException(404, "Not found")
    out = await fs.open_download_stream(ObjectId(meta["file_id"]))

    async def body():
        while True:
            chunk = await out.read(1024 * 1024)
            if not chunk:
                break
            yield chunk

    return StreamingResponse(body(), media_type=meta.get("content_type") or "application/octet-stream",
                             headers={"Content-Disposition": f'inline; filename="{rec["path"].split("/")[-1]}"'})


app.include_router(api_router)

from portal_wallet import create_wallet_router
app.include_router(create_wallet_router(db, require_user, is_admin))

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get("CORS_ORIGINS", "*").split(","),
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
