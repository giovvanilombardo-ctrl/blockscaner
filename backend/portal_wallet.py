"""Blockscaner account portal: wallet balances, live exchange rates, currency
swap, withdrawal requests and profile/KYC. MongoDB-backed."""
import time
import uuid
import logging
from datetime import datetime, timezone
from typing import Optional

import httpx
from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel

logger = logging.getLogger(__name__)

# ---------------- Assets & indicative EUR rates (fallback) ----------------
ACTIVOS = ["BTC", "ETH", "USDT", "SOL", "BNB", "TRX", "EUR", "USD", "GBP", "CHF", "JPY", "CNY", "AUD", "CAD"]
FIAT = ["EUR", "USD", "GBP", "CHF", "JPY", "CNY", "AUD", "CAD"]
CRIPTO = [a for a in ACTIVOS if a not in FIAT]
COMISION_CAMBIO = 0.015  # 1.5% swap fee

TASAS_EUR = {
    "BTC": 92450, "ETH": 3120, "USDT": 0.92, "SOL": 138, "BNB": 580, "TRX": 0.21,
    "EUR": 1, "USD": 0.92, "GBP": 1.17, "CHF": 1.05, "JPY": 0.0062, "CNY": 0.13,
    "AUD": 0.6, "CAD": 0.67,
}

_rate_cache = {"t": 0, "tasas": dict(TASAS_EUR)}


async def live_rates() -> dict:
    """Live rates: CoinGecko (crypto) + Frankfurter/ECB (fiat). Fallback to TASAS_EUR."""
    if time.time() - _rate_cache["t"] < 60:
        return _rate_cache["tasas"]
    tasas = dict(TASAS_EUR)
    ids = {"bitcoin": "BTC", "ethereum": "ETH", "tether": "USDT", "solana": "SOL", "binancecoin": "BNB", "tron": "TRX"}
    try:
        from market_data import eur_prices_for
        prices = await eur_prices_for(list(ids))
        for cid, a in ids.items():
            v = prices.get(cid)
            if isinstance(v, (int, float)) and v > 0:
                tasas[a] = float(v)
    except Exception as e:
        logger.info("coingecko rates failed: %s", e)
    try:
        async with httpx.AsyncClient(timeout=6) as c:
            r = await c.get("https://api.frankfurter.app/latest",
                            params={"from": "EUR", "to": "USD,GBP,CHF,JPY,CNY,AUD,CAD"})
            if r.status_code == 200:
                j = r.json().get("rates", {})
                for a in FIAT:
                    v = j.get(a)
                    if a != "EUR" and isinstance(v, (int, float)) and v > 0:
                        tasas[a] = 1.0 / float(v)
    except Exception as e:
        logger.info("frankfurter rates failed: %s", e)
    _rate_cache["t"] = time.time()
    _rate_cache["tasas"] = tasas
    return tasas


def _round(valor: float, activo: str) -> float:
    dec = 2 if (activo in FIAT or activo == "USDT") else 8
    return round(float(valor), dec)


def _now() -> str:
    return datetime.now(timezone.utc).isoformat()


# ---------------- IBAN validation ----------------
def iban_valid(iban: str) -> bool:
    s = "".join((iban or "").split()).upper()
    if not (15 <= len(s) <= 34) or not s[:2].isalpha() or not s[2:].isalnum():
        return False
    rearr = s[4:] + s[:4]
    num = ""
    for ch in rearr:
        num += str(ord(ch) - 55) if ch.isalpha() else ch
    try:
        return int(num) % 97 == 1
    except Exception:
        return False


def create_wallet_router(db, require_user, is_admin):
    router = APIRouter(prefix="/api/portal", tags=["portal"])

    async def _saldos(uid: str) -> dict:
        mapa = {a: 0.0 for a in ACTIVOS}
        async for row in db.cartera_saldos.find({"user_id": uid}, {"_id": 0}):
            a = row.get("activo")
            if a in mapa:
                mapa[a] = float(row.get("cantidad", 0))
        # Merge the legacy admin-funded user_balances (base recovered funds)
        async for row in db.user_balances.find({"user_id": uid}, {"_id": 0}):
            a = (row.get("currency") or "").upper()
            if a in mapa:
                mapa[a] += float(row.get("balance", 0))
        return mapa

    async def _set_saldo(uid: str, activo: str, cantidad: float):
        await db.cartera_saldos.update_one(
            {"user_id": uid, "activo": activo},
            {"$set": {"cantidad": _round(max(cantidad, 0), activo), "updated_at": _now()},
             "$setOnInsert": {"id": str(uuid.uuid4()), "user_id": uid, "activo": activo}},
            upsert=True)

    async def _legacy(uid: str, activo: str) -> float:
        row = await db.user_balances.find_one({"user_id": uid, "currency": activo}, {"_id": 0})
        return float(row["balance"]) if row else 0.0

    async def _deduct(uid: str, activo: str, cantidad: float):
        """Deduct `cantidad` of `activo`, drawing from legacy user_balances first, then cartera_saldos."""
        remaining = float(cantidad)
        leg = await _legacy(uid, activo)
        if leg > 0 and remaining > 0:
            take = min(leg, remaining)
            await db.user_balances.update_one({"user_id": uid, "currency": activo},
                                              {"$set": {"balance": _round(leg - take, activo), "updated_at": _now()}})
            remaining -= take
        if remaining > 0:
            row = await db.cartera_saldos.find_one({"user_id": uid, "activo": activo})
            cur = float(row["cantidad"]) if row else 0.0
            await _set_saldo(uid, activo, cur - remaining)

    async def _credit(uid: str, activo: str, cantidad: float):
        row = await db.cartera_saldos.find_one({"user_id": uid, "activo": activo})
        cur = float(row["cantidad"]) if row else 0.0
        await _set_saldo(uid, activo, cur + float(cantidad))

    async def _movimiento(uid, tipo, payload):
        doc = {"id": str(uuid.uuid4()), "user_id": uid, "tipo": tipo, "created_at": _now(), **payload}
        await db.cartera_movimientos.insert_one(doc)
        doc.pop("_id", None)
        return doc

    @router.get("/wallet")
    async def get_wallet(user=Depends(require_user)):
        uid = user["id"]
        tasas = await live_rates()
        saldos = await _saldos(uid)
        # Credit any newly recovered amount from the case into the wallet
        caso = await db.casos.find_one({"user_id": uid}, {"_id": 0}, sort=[("created_at", -1)])
        if caso:
            activo_rec = caso.get("moneda") if caso.get("moneda") in CRIPTO else "USDT"
            estado = await db.cartera_estado.find_one({"user_id": uid}, {"_id": 0}) or {}
            acreditado = float(estado.get("acreditado", 0))
            recuperado = float(caso.get("monto_recuperado", 0) or 0)
            pendiente = round(recuperado - acreditado, 2)
            if pendiente > 0:
                cantidad = _round(pendiente / tasas.get(activo_rec, 1), activo_rec)
                saldos[activo_rec] += cantidad
                await _set_saldo(uid, activo_rec, saldos[activo_rec])
                await _movimiento(uid, "recuperacion", {"activo": activo_rec, "cantidad": cantidad, "eur": pendiente})
                await db.cartera_estado.update_one({"user_id": uid},
                    {"$set": {"acreditado": recuperado, "updated_at": _now()}}, upsert=True)
        movs = await db.cartera_movimientos.find({"user_id": uid}, {"_id": 0}).sort("created_at", -1).to_list(50)
        retiros = await db.withdrawal_requests.find({"user_id": uid}, {"_id": 0}).sort("created_at", -1).to_list(50)
        banco = await db.user_bank_details.find_one({"user_id": uid}, {"_id": 0, "password_hash": 0})
        total_eur = round(sum(saldos[a] * tasas.get(a, 0) for a in ACTIVOS), 2)
        return {"saldos": saldos, "tasas": tasas, "total_eur": total_eur,
                "movimientos": movs, "retiros": retiros, "banco": banco,
                "caso": {"moneda": caso.get("moneda") if caso else None,
                         "monto_recuperado": caso.get("monto_recuperado") if caso else 0},
                "actualizado": _now()}

    @router.get("/rates")
    async def get_rates():
        return {"tasas": await live_rates(), "actualizado": _now()}

    class SwapIn(BaseModel):
        desde: str
        hacia: str
        cantidad: float

    @router.post("/swap")
    async def swap(body: SwapIn, user=Depends(require_user)):
        desde, hacia = body.desde.upper(), body.hacia.upper()
        if desde not in ACTIVOS or hacia not in ACTIVOS or desde == hacia:
            raise HTTPException(400, "Activos no válidos")
        if body.cantidad <= 0:
            raise HTTPException(400, "Importe no válido")
        uid = user["id"]
        tasas = await live_rates()
        saldos = await _saldos(uid)
        if saldos[desde] < body.cantidad:
            raise HTTPException(400, "Saldo insuficiente")
        # Convert from -> EUR -> to, minus fee
        eur_bruto = body.cantidad * tasas[desde]
        eur_neto = eur_bruto * (1 - COMISION_CAMBIO)
        recibido = _round(eur_neto / tasas[hacia], hacia)
        entregado = _round(body.cantidad, desde)
        saldos[desde] -= entregado
        saldos[hacia] += recibido
        await _deduct(uid, desde, entregado)
        await _credit(uid, hacia, recibido)
        mov = await _movimiento(uid, "cambio", {
            "desde": desde, "hacia": hacia, "entregado": entregado, "recibido": recibido,
            "comision": round(eur_bruto * COMISION_CAMBIO, 2), "tasa_desde": tasas[desde], "tasa_hacia": tasas[hacia]})
        return {"ok": True, "movimiento": mov, "saldos": saldos}

    class BankIn(BaseModel):
        titular: str
        iban: str
        banco: Optional[str] = None
        swift: Optional[str] = None

    @router.post("/bank")
    async def save_bank(body: BankIn, user=Depends(require_user)):
        if not body.titular.strip():
            raise HTTPException(400, "Titular no válido")
        if not iban_valid(body.iban):
            raise HTTPException(400, "IBAN no válido")
        iban_clean = "".join(body.iban.split()).upper()
        await db.user_bank_details.update_one(
            {"user_id": user["id"]},
            {"$set": {"titular": body.titular.strip(), "iban": iban_clean,
                      "banco": body.banco, "swift": body.swift, "updated_at": _now()},
             "$setOnInsert": {"id": str(uuid.uuid4()), "user_id": user["id"]}},
            upsert=True)
        return {"ok": True}

    class WithdrawIn(BaseModel):
        importe: float
        metodo: str  # banco | cripto
        nota: Optional[str] = ""
        activo: Optional[str] = "EUR"
        wallet_address: Optional[str] = None

    @router.post("/withdraw")
    async def withdraw(body: WithdrawIn, user=Depends(require_user)):
        if body.importe <= 0:
            raise HTTPException(400, "Importe no válido")
        uid = user["id"]
        tasas = await live_rates()
        saldos = await _saldos(uid)
        # withdraw in EUR value from available crypto/fiat
        eur_needed = round(body.importe, 2)
        # deduct proportionally from assets with balance, preferring EUR then crypto
        order = ["EUR"] + CRIPTO + [f for f in FIAT if f != "EUR"]
        remaining = eur_needed
        deductions = []
        for a in order:
            if remaining <= 0:
                break
            avail_eur = saldos[a] * tasas.get(a, 0)
            if avail_eur <= 0:
                continue
            take_eur = min(avail_eur, remaining)
            take = _round(take_eur / tasas[a], a)
            if take > 0:
                saldos[a] -= take
                await _deduct(uid, a, take)
                deductions.append({"activo": a, "cantidad": take, "eur": round(take_eur, 2)})
                remaining = round(remaining - take_eur, 2)
        if remaining > 0.009:
            raise HTTPException(400, "Saldo insuficiente para esta retirada")
        doc = {"id": str(uuid.uuid4()), "user_id": uid, "amount": eur_needed, "from_currency": "EUR",
               "eur_amount": eur_needed, "withdraw_type": "eur" if body.metodo == "banco" else "crypto",
               "wallet_address": body.wallet_address, "metodo": body.metodo, "nota": body.nota or "",
               "status": "pending", "balance_locked": True, "deductions": deductions, "created_at": _now()}
        await db.withdrawal_requests.insert_one(doc)
        doc.pop("_id", None)
        await _movimiento(uid, "retirada", {"importe": eur_needed, "metodo": body.metodo})
        return {"ok": True, "retiro": doc}

    class ProfileIn(BaseModel):
        nombre: Optional[str] = None
        apellidos: Optional[str] = None
        telefono: Optional[str] = None
        kyc: Optional[dict] = None

    @router.post("/profile")
    async def update_profile(body: ProfileIn, user=Depends(require_user)):
        upd = {"updated_at": _now()}
        if body.nombre is not None:
            upd["nombre"] = body.nombre.strip()
        if body.apellidos is not None:
            upd["apellidos"] = body.apellidos.strip()
        if body.telefono is not None:
            upd["telefono"] = body.telefono.strip()
        if body.nombre or body.apellidos:
            upd["full_name"] = f"{upd.get('nombre', user.get('nombre', ''))} {upd.get('apellidos', user.get('apellidos', ''))}".strip()
        if body.kyc:
            upd["kyc"] = body.kyc
        await db.profiles.update_one({"id": user["id"]}, {"$set": upd})
        return {"ok": True}

    @router.get("/profile")
    async def get_profile(user=Depends(require_user)):
        return {"perfil": {k: v for k, v in user.items() if k != "password_hash"}}

    return router
