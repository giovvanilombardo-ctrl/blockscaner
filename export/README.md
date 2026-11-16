# Blockscaner — Complete Project Export

## What this project contains
This is the complete, current source code of the Blockscaner crypto platform — a full-stack web application with a React frontend, FastAPI backend, and MongoDB database.

## Technologies used
- **Frontend**: React 19 (Create React App + CRACO), TypeScript, Tailwind CSS 3.4, shadcn/ui (Radix UI), React Router 7, Recharts, Framer Motion, Lucide icons, axios, react-hook-form, zod
- **Backend**: Python 3.11, FastAPI, Motor (async MongoDB driver), PyJWT, bcrypt/passlib, pydantic
- **Database**: MongoDB
- **Email/integrations**: emergentintegrations package (Emergent LLM key for email + AI image generation), CoinGecko API for market data
- **Scheduling**: .emergent/crons.yml platform cron (price-alert evaluation)

## Folder structure
```
frontend/               React app (CRA + craco)
  public/               Static public assets (index.html, favicon, etc.)
  src/
    App.tsx             Router — all page routes
    index.css           Main stylesheet (all custom component styles)
    i18n.tsx            Internationalisation (t() translation helper)
    assets/             All images: leaders/, pro/, misc PNG/JPEG
    components/
      site/             SiteHeader, SiteLayout, SiteFooter
      ui/               shadcn/ui component library
      Seo.tsx           Per-page SEO meta component
      ...
    pages/              All pages: Home, Products, Markets, Business, Academy (+18 article pages), About (Leadership, Ecosystem), Pro, Step, Wallet/portal, auth, legal, etc.
  package.json          Frontend dependencies (yarn)
  yarn.lock             Lockfile — reinstall with `yarn install`
  craco.config.js       CRA override config
  tailwind.config.js    Tailwind config
  postcss.config.js     PostCSS config
  tsconfig.json         TypeScript config
  .env                  Frontend env vars (REACT_APP_BACKEND_URL)

backend/
  server.py             Main FastAPI app — all API routes under /api
  market_data.py        CoinGecko proxy + caching for live prices
  price_alerts.py       Authenticated price alerts + evaluation
  portal_wallet.py      Wallet portal endpoints
  email_templates.py    Email HTML templates
  chat_prompt.py        Chat assistant prompt
  requirements.txt      Python dependencies (pip install -r requirements.txt)
  .env                  Backend env vars (MONGO_URL, DB_NAME, JWT_SECRET, email, etc.)
  scripts/              One-off asset generation scripts (leaders, pro art)
  tests/                Backend pytest suite

mongodb_dump/           Full MongoDB dump of the current database (test_database)
.emergent/              Platform config (crons.yml — scheduled price-alert evaluation)
```

## How to run locally

### 1. Backend
```bash
cd backend
python3 -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
# create backend/.env — see .env variables below
uvicorn server:app --host 0.0.0.0 --port 8001 --reload
```
All API routes are prefixed with `/api`.

### 2. Frontend
```bash
cd frontend
yarn install
# create frontend/.env — see variables below
yarn start     # dev server on :3000
yarn build     # production build in frontend/build
```
The frontend calls the backend via `process.env.REACT_APP_BACKEND_URL` + `/api/...`.

### 3. Database (MongoDB)
Install MongoDB locally (or use MongoDB Atlas). Restore the included dump:
```bash
mongorestore --uri="mongodb://localhost:27017" --db=test_database mongodb_dump/test_database
```

## Environment variables

### backend/.env
- `MONGO_URL` — MongoDB connection string (e.g. mongodb://localhost:27017)
- `DB_NAME` — database name (test_database)
- `JWT_SECRET` — random secret for auth tokens
- `CORS_ORIGINS` — allowed origins (e.g. http://localhost:3000)
- `EMERGENT_EMAIL_KEY` / Emergent LLM key — used by the `emergentintegrations` package for transactional email (price alerts, enquiries) and the AI image-generation scripts. **Replace with your own provider (e.g. Resend, SendGrid) if you leave Emergent** — see section "External services" below.
- `EMAIL_FROM_NAME`, `NOTIFY_EMAIL`, `ADMIN_EMAIL`, `ADMIN_PASSWORD` — notification sender + admin account
- `FRONTEND_URL` — your site URL
- `WEBHOOK_CRON_SECRET` — bearer token for the cron webhook (scheduled price-alert evaluation). Set up your own scheduler (cron/systemd/Cloud Scheduler) to POST to `/api/price-alerts/evaluate` with `Authorization: Bearer <secret>`.

### frontend/.env
- `REACT_APP_BACKEND_URL` — public URL of the backend (e.g. http://localhost:8001 in dev). **No trailing slash.**

## External services requiring reconnection
1. **Email + AI image generation (`emergentintegrations`)** — currently uses the Emergent-managed key. Outside Emergent, either:
   - keep using `emergentintegrations` with your own Emergent LLM key, or
   - replace email sending with Resend/SendGrid (edit `server.py` / `price_alerts.py` mail helpers), and image scripts with any provider (the scripts in `backend/scripts/` are one-off generators — not needed at runtime).
2. **CoinGecko API** — public, no key required (rate-limited). Already proxied/cached by `backend/market_data.py`.
3. **Scheduled tasks (.emergent/crons.yml)** — Emergent platform cron. Replace with your own scheduler calling `POST /api/price-alerts/evaluate` with the bearer secret.
4. **MongoDB** — point `MONGO_URL` at your own instance (local or Atlas).

## Notes
- All images in `frontend/src/assets/` are included as files — no external image URLs are required.
- `frontend/node_modules` and `backend/__pycache__` are excluded (reinstall with yarn/pip).
- The admin account credentials are set via `ADMIN_EMAIL`/`ADMIN_PASSWORD` env vars and seeded on backend startup.
