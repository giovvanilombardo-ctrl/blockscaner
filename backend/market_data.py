"""Server-side CoinGecko proxy with a shared in-memory TTL cache.

Browsers used to call CoinGecko directly and hit 429 rate limits (prices
showing as 0,00 / dashes). Now all clients share one backend cache, so
CoinGecko sees at most one request per TTL window per endpoint.
"""
import asyncio
import json
import logging
import re
import time
from pathlib import Path

import httpx
from fastapi import APIRouter, HTTPException, Query

logger = logging.getLogger(__name__)

CG = "https://api.coingecko.com/api/v3"
_ID_RE = re.compile(r"^[a-z0-9][a-z0-9\-,]*$")

router = APIRouter(prefix="/api/market", tags=["market"])

_cache: dict = {}
_locks: dict = {}

# Disk persistence: survives backend restarts, so a restart during a CoinGecko
# 429 storm still serves data (SWR refreshes it in the background).
CACHE_FILE = Path(__file__).parent / ".cache" / "market_cache.json"
_dirty = False
_last_flush = 0.0


def _load_disk():
    try:
        if CACHE_FILE.exists():
            data = json.loads(CACHE_FILE.read_text())
            if isinstance(data, dict):
                _cache.update(data)
                logger.info("market cache loaded from disk: %d entries", len(data))
    except Exception as e:
        logger.warning("market cache load failed: %s", e)


def _store(key: str, data):
    global _dirty, _last_flush
    _cache[key] = {"t": time.time(), "data": data}
    _dirty = True
    if time.time() - _last_flush > 20:
        try:
            _dirty = False
            _last_flush = time.time()
            CACHE_FILE.parent.mkdir(exist_ok=True)
            CACHE_FILE.write_text(json.dumps(_cache))
        except Exception as e:
            logger.warning("market cache flush failed: %s", e)


_load_disk()


async def _fetch(path: str, params: dict):
    """One upstream call with a short retry budget (fail fast - the caller or a
    background refresh decides what to serve instead)."""
    for attempt in range(2):
        try:
            async with httpx.AsyncClient(timeout=8) as c:
                r = await c.get(f"{CG}{path}", params=params)
            if r.status_code == 200:
                return r.json()
            if r.status_code == 429:
                await asyncio.sleep(1.5 * (attempt + 1))
                continue
            logger.info("coingecko %s -> HTTP %s", path, r.status_code)
            return None
        except Exception as e:
            logger.info("coingecko %s failed: %s", path, e)
            await asyncio.sleep(1)
    return None


async def _refresh(key: str, path: str, params: dict, transform):
    lock = _locks.setdefault(key, asyncio.Lock())
    if lock.locked():  # a refresh is already in flight for this key
        return
    async with lock:
        data = await _fetch(path, params)
        if data is not None:
            if transform:
                data = transform(data)
            _store(key, data)


async def _cached(key: str, ttl: int, path: str, params: dict, transform=None):
    """Stale-while-revalidate: any cached entry is served instantly; expired
    entries refresh in the background. Only a never-seen key waits."""
    now = time.time()
    ent = _cache.get(key)
    if ent and now - ent["t"] < ttl:
        return ent["data"]
    if ent:
        asyncio.create_task(_refresh(key, path, params, transform))
        return ent["data"]
    lock = _locks.setdefault(key, asyncio.Lock())
    async with lock:
        ent = _cache.get(key)
        if ent:
            return ent["data"]
        data = await _fetch(path, params)
        if data is not None:
            if transform:
                data = transform(data)
            _store(key, data)
            return data
        raise HTTPException(status_code=503, detail="Market data temporarily unavailable")


@router.get("/coins")
async def market_coins(per_page: int = Query(120, le=250), page: int = Query(1, ge=1)):
    return await _cached(f"coins:{per_page}:{page}", 90, "/coins/markets", {
        "vs_currency": "eur", "order": "market_cap_desc", "per_page": per_page,
        "page": page, "price_change_percentage": "24h", "sparkline": "true",
    })


@router.get("/coin/{coin_id}")
async def market_coin(coin_id: str):
    if not _ID_RE.match(coin_id):
        raise HTTPException(status_code=400, detail="invalid coin id")
    # serve from the warm markets-list cache first (survives 429 storms)
    for key, ent in list(_cache.items()):
        if key.startswith("coins:") and isinstance(ent["data"], list):
            for row in ent["data"]:
                if row.get("id") == coin_id:
                    return row
    data = await _cached(f"coin:{coin_id}", 60, "/coins/markets", {
        "vs_currency": "eur", "ids": coin_id,
        "price_change_percentage": "24h", "sparkline": "true",
    })
    if isinstance(data, list) and data:
        return data[0]
    raise HTTPException(status_code=404, detail="coin not found")


@router.get("/chart/{coin_id}")
async def market_chart(coin_id: str, days: int = Query(30, ge=1, le=2000)):
    if not _ID_RE.match(coin_id):
        raise HTTPException(status_code=400, detail="invalid coin id")
    return await _cached(f"chart:{coin_id}:{days}", 300, f"/coins/{coin_id}/market_chart",
                         {"vs_currency": "eur", "days": days})


@router.get("/simple-price")
async def simple_price(ids: str = Query(..., max_length=500)):
    if not _ID_RE.match(ids):
        raise HTTPException(status_code=400, detail="invalid ids")
    wanted = [i for i in ids.split(",") if i]
    prices = await eur_prices_for(wanted)
    if prices:
        return {cid: {"eur": v} for cid, v in prices.items()}
    raise HTTPException(status_code=503, detail="Market data temporarily unavailable")


@router.get("/info/{coin_id}")
async def coin_info(coin_id: str):
    """Slim per-coin profile (description, facts, links) for dynamic coin pages.
    Cached 24h - descriptive content rarely changes."""
    if not _ID_RE.match(coin_id):
        raise HTTPException(status_code=400, detail="invalid coin id")

    def slim(d: dict) -> dict:
        links = d.get("links") or {}
        return {
            "id": d.get("id"), "symbol": d.get("symbol"), "name": d.get("name"),
            "description": (d.get("description") or {}).get("en") or "",
            "genesis_date": d.get("genesis_date"),
            "categories": [c for c in (d.get("categories") or []) if c],
            "homepage": [u for u in (links.get("homepage") or []) if u],
            "explorer": [u for u in (links.get("blockchain_site") or []) if u],
            "whitepaper": links.get("whitepaper") or "",
        }

    return await _cached(f"info:{coin_id}", 86400, f"/coins/{coin_id}", {
        "localization": "false", "tickers": "false", "market_data": "false",
        "community_data": "false", "developer_data": "false", "sparkline": "false",
    }, transform=slim)


async def eur_prices_for(ids: list) -> dict:
    """EUR prices sourced from whatever the shared cache already holds
    (markets list / single coin), hitting CoinGecko only for gaps."""
    out: dict = {}
    for key, ent in list(_cache.items()):
        if key.startswith("coins:") and isinstance(ent["data"], list):
            for row in ent["data"]:
                cid, price = row.get("id"), row.get("current_price")
                if cid in ids and isinstance(price, (int, float)):
                    out[cid] = float(price)
        elif key.startswith("coin:") and isinstance(ent["data"], dict):
            row = ent["data"]
            cid, price = row.get("id"), row.get("current_price")
            if cid in ids and isinstance(price, (int, float)):
                out[cid] = float(price)
    missing = [i for i in ids if i not in out]
    if missing:
        try:
            data = await _cached(f"simple:{','.join(missing)}", 60, "/simple/price",
                                 {"ids": ",".join(missing), "vs_currencies": "eur"})
            for cid in missing:
                v = data.get(cid, {}).get("eur") if isinstance(data, dict) else None
                if isinstance(v, (int, float)):
                    out[cid] = float(v)
        except HTTPException:
            pass
    return out
