"""Tests for /api/market/* CoinGecko proxy + simple-price + login."""
import os
import time
import pytest
import requests

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "").rstrip("/")
if not BASE_URL:
    with open("/app/frontend/.env") as f:
        for line in f:
            if line.startswith("REACT_APP_BACKEND_URL="):
                BASE_URL = line.split("=", 1)[1].strip().rstrip("/")


@pytest.fixture(scope="module")
def session():
    return requests.Session()


def _get_with_retry(session, url, tries=3, sleep=20):
    last = None
    for i in range(tries):
        r = session.get(url, timeout=25)
        if r.status_code == 200:
            return r
        last = r
        if r.status_code in (429, 503):
            time.sleep(sleep)
            continue
        return r
    return last


class TestMarketProxy:
    def test_coins_list(self, session):
        r = _get_with_retry(session, f"{BASE_URL}/api/market/coins?per_page=5")
        assert r.status_code == 200, r.text
        data = r.json()
        assert isinstance(data, list) and len(data) == 5
        for c in data:
            assert "id" in c and "current_price" in c
            assert isinstance(c["current_price"], (int, float))

    def test_coin_detail_bitcoin(self, session):
        r = _get_with_retry(session, f"{BASE_URL}/api/market/coin/bitcoin")
        assert r.status_code == 200, r.text
        d = r.json()
        assert d.get("id") == "bitcoin"
        assert isinstance(d.get("current_price"), (int, float)) and d["current_price"] > 0

    def test_chart_bitcoin(self, session):
        r = _get_with_retry(session, f"{BASE_URL}/api/market/chart/bitcoin?days=7")
        assert r.status_code == 200, r.text
        d = r.json()
        assert "prices" in d and isinstance(d["prices"], list) and len(d["prices"]) > 0

    def test_simple_price(self, session):
        r = _get_with_retry(session, f"{BASE_URL}/api/market/simple-price?ids=bitcoin,ethereum")
        assert r.status_code == 200, r.text
        d = r.json()
        assert "bitcoin" in d and "ethereum" in d
        assert isinstance(d["bitcoin"]["eur"], (int, float)) and d["bitcoin"]["eur"] > 0
        assert isinstance(d["ethereum"]["eur"], (int, float)) and d["ethereum"]["eur"] > 0

    def test_invalid_coin_id(self, session):
        r = session.get(f"{BASE_URL}/api/market/coin/BAD!ID", timeout=10)
        assert r.status_code == 400


class TestAuthLogin:
    def test_login_testuser(self, session):
        # Try common endpoints
        for ep in ("/api/account-login", "/api/auth/login", "/api/login"):
            r = session.post(f"{BASE_URL}{ep}",
                             json={"email": "testuser1@example.com", "password": "Test1234"},
                             timeout=15)
            if r.status_code < 400:
                data = r.json()
                assert "token" in data or "access_token" in data or "user" in data
                return
        pytest.fail("No login endpoint accepted testuser1 credentials")
