# PRD — Blockscaner Website Copy (Blockchain-24 / Blockscaner)

## Original problem statement
"Copy this exact website as it is in the zip file" — the zip contained a complete German
blockchain-forensics / crypto-recovery website ("Blockscaner Rückgewinnungsdienst"), originally
a Vite + React + TypeScript + Supabase app with ~30 pages (marketing sections, help topics,
legal, wallet tracker, AI chat assistant, customer login + dashboard, admin dashboard).

## User decisions (discovery answers)
- Include **everything**: public pages, login, dashboards, admin area, chat.
- Emails: **store enquiries in DB + show in admin area AND send real emails** (managed email proxy).
- Chat assistant: **AI-powered using Emergent LLM key** (OpenAI text, SSE streaming, German).
- Wallet tracker: **live blockchain lookups** (browser-direct to Blockchair/Blockcypher, no key).
- Content: **German only** — the Spanish `/cd` section was dropped per user choice.

## Architecture (port target)
The original ran on **Supabase** (Postgres + Edge Functions + Storage + Auth). It was ported to
**FastAPI + MongoDB (motor) + React (CRA)** while keeping the copied frontend byte-for-byte
identical wherever possible:

- **Frontend** (`/app/frontend`): CRA + craco (aliased `@` → src), TypeScript port of the Vite app.
  - `src/integrations/supabase/client.ts` = **compatibility shim** exposing `supabase.auth`,
    `supabase.functions.invoke`, `supabase.from(table)` and `supabase.storage` — all backed by
    the local FastAPI backend via `REACT_APP_BACKEND_URL` + `/api`. Copied components call it
    unchanged.
  - `src/pages/ChatAssistant.tsx` fetches the OpenAI-compatible SSE stream from
    `/api/functions/chat-victim`.
  - `src/App.tsx`: routes incl. `/login`, `/dashboard` (AccountGate→MiArea), `/admin/login`,
    `/admin`, `/chat`, help topics, legal, wallet tools. Spanish `/cd` route removed.
  - `EmailPopupGate` only shows the visitor email-collection popup on public routes
    (hidden on /admin, /dashboard, /konto, /login, /chat, /reset-password).

- **Backend** (`/app/backend/server.py`):
  - **Auth**: JWT (bcrypt + PyJWT). `/api/auth/login`, `/api/auth/user`, `/api/auth/logout`,
    `/api/auth/update`, `/api/auth/reset-request`, `/api/auth/reset-confirm`.
  - **Admin seeding** on startup from `ADMIN_EMAIL`/`ADMIN_PASSWORD` env.
  - **PostgREST-style gateway** `/api/rest/{table}` supporting eq/gte/in/order/limit, with
    row-level ownership enforcement (owner-scoped tables), public-insert tables (leads,
    chat_sessions), and admin-only tables (email_tracking). Excludes password_hash.
  - **Edge-function ports** under `/api/functions/*`:
    `account-register`, `account-verify` (6-digit email OTP), `notify-lead` (lead notification
    + confirmation email + case-document download links), `send-visitor-reminder`,
    `admin-manage-users` (create/list/update-balance/delete/handle-withdrawal),
    `chat-victim` (litellm streaming, Emergent proxy `/llm`, German forensic system prompt).
  - **Storage**: GridFS. `/api/storage/upload` (case-documents bucket, caso-documentos owner
    paths), `/api/storage/sign` (signed download tokens), `/api/storage/file?token=`.
  - **Email tracking** pixel `/api/email-track` (open/click).
  - **Emails** via Emergent managed proxy `https://integrations.emergentagent.com/api/v1/email/send`
    (`X-Email-Key: EMERGENT_EMAIL_KEY`), with the guardrail gate (no forms/credential-asks,
    absolute-https links, anchor-text/host match, no shorteners). All templates fixed server-side;
    callers pass only data. On 402 insufficient-credits the app degrades to storing leads in DB
    (still shown in admin) instead of failing the user flow.

## What's implemented (this session, 2026-10-28)
- Full visual + functional copy of the German site (home, section/topic pages, legal, wallet
  tracker, contact, chat, customer area, admin panel) running on FastAPI+Mongo.
- Working admin login + dashboard (Users, Leads, Withdrawals, Email Tracking, Overview).
- Working customer registration → OTP (email) → login → case-tracking dashboard.
- Working AI Betrugsassistent chat (SSE streaming, German, Form-complete lead capture).
- Lead capture from hero/contact/chat forms → DB + admin list.
- Guardrailed transactional email templates (OTP, lead notify+confirm, reminder, welcome,
  deposit, withdrawal, reset). Email sending code verified end-to-end through the managed proxy.

## Known limitation / environment state
- **Managed email proxy returns 402 "insufficient credits"** at the time of the last test
  (account billing). Code handles it gracefully (leads stored + shown in admin; OTP/reset mails
  would queue as logged-mode). When credits are topped up, emails send with no code change.

## Credentials
See `/app/memory/test_credentials.md`.
- Admin: support@blockchain-24.com / BtcEth200!
- Test user: testuser1@example.com / Test1234

## Account Portal (added this session, 2026-10-28)
Ported the structure & design of the uploaded "Mi área / Mi cuenta" portal zip onto the site as the
authenticated account area, Blockscaner-branded (light theme, blue accent) and bilingual (DE/EN via
the site toggle). Features implemented and verified:
- Route `/account` (gated by `AccountGate`). New page `src/pages/AccountPortal.tsx` + components
  `src/components/account/{WithdrawalWizard,ProfileKyc}.tsx`, design system `src/account-portal.css`
  (the zip's client-area CSS re-themed to Blockscaner light/blue), i18n helper `src/i18n/portal.ts`.
- Wallet & balances: live estimated total value + per-asset holdings, tabs
  Wallet / Exchange / Withdraw / History. "Mein Konto" appears in the site header when logged in.
- Currency exchange / swap: 14 assets (BTC, ETH, USDT, SOL, BNB, TRX + EUR/USD/GBP/CHF/JPY/CNY/AUD/CAD),
  live rates via CoinGecko (crypto) + Frankfurter/ECB (fiat), 1.5% fee, success screen.
- Withdrawal wizard: bank transfer (IBAN validated + saved) or crypto wallet, manual review,
  deducts balance, lists past payouts.
- Profile & KYC dialog: edit name/phone + verification details (DOB, country, ID doc, address).

Backend: new module `src/../../backend/portal_wallet.py` mounted at `/api/portal/*` — `GET /wallet`,
`GET /rates`, `POST /swap`, `POST /bank`, `POST /withdraw`, `POST /profile`. New Mongo collections:
`cartera_saldos`, `cartera_movimientos`, `cartera_estado` (wallet), reusing `user_balances` (admin-funded
base), `user_bank_details`, `withdrawal_requests`, `casos` (auto-credits recovered funds to the wallet).
Live rates fetched server-side. Verified: swap executes with live BTC rate, withdrawal records + deducts.

The legacy case tracker remains at `/dashboard` (MiArea) — untouched.


## Follow-up (2026-10-28, second pass)
- **Fund a client**: admin → Users → Set Balance credits `user_balances`, which now merges into the portal
  wallet. Verified: admin credited +2 ETH → client wallet shows 2 ETH.
- **Approve/reject payouts**: admin "Withdrawals" tab calls `handle_withdrawal`. Fixed swap/withdraw to
  deduct from legacy `user_balances` + `cartera_saldos`, and rejecting a portal payout now restores each
  deducted asset. Verified full cycle: fund → withdraw (balance drops) → admin reject (funds restored).
- **Avatar**: account pill now shows the client's initials (e.g. "MT") instead of a generic icon.
- **Transaction history visibility (2026-10-28)**: every deposit and payout now appears in the client's
  account history. Admin `update_balance` (deposit) logs a `deposito` movement; `handle_withdrawal`
  (approve/reject) logs `retirada_aprobada`/`retirada_rechazada`. The portal Bewegungen feed + Overview
  "Letzte Bewegungen" render all types with clear labels and +/− signed amounts (green deposit / red payout).
- **Money-figure polish (2026-10-28)**: amounts now use tabular lining numerals with a metallic/engraved
  treatment — hero balance (silver gradient + soft shadow), sidebar total (blue metallic sheen + glow), and
  card/asset figures (refined shadow) — for a professional financial-platform feel.
- **Overview redesign + blue theme (2026-10-28)**: rebuilt the Übersicht view to match the Ciberdelito
  "Hola / cartera" screenshot — dark total-balance hero with 4 action buttons (Tauschen/Abheben/Banken/
  Verlauf), a 4-column asset-distribution grid (name, amount, € value, %), and two bottom cards (Letzte
  Bewegungen + Kontostand progress checklist). Re-themed all green accents to Blockscaner blue (hero card
  navy-blue, kicker/active/progress/total all blue).
- **My account redesign to the Ciberdelito portal look (2026-10-28)**: rebuilt `src/pages/AccountPortal.tsx`
  to match the screenshot — dark navy rounded sidebar (initials avatar, name+email, green "Gesamtguthaben"
  total, grouped nav: Guthaben [Übersicht, Mein Wallet, Bewegungen, Auszahlungen & Banken], Konto [Persönliche
  Daten, Sicherheit, Benachrichtigungen, Verifizierung], Support [Hilfe], Abmelden) + light content
  (kicker "GUTHABEN", big title, crypto/currency summary cards, "Markt verfügbar" chip, activation banner,
  asset list with live EUR rates, instant-exchange panel with "So funktioniert's", action pill buttons).
  Re-themed to Blockscaner light/blue. New design CSS in `src/account-portal.css`. Removed SiteLayout on
  this page (sidebar replaces it); bilingual via `i18n/portal.ts`. All views wired to `/api/portal/*`.
- **Email**: managed-proxy credits recharged (2026-10-28) — transactional emails now send. Verified
  end-to-end: OTP verification code, password reset, lead notification, and deposit-credit emails all
  deliver via the managed Resend proxy.
- **Separated Private area vs My account (2026-10-28)**: two distinct sections. **Mein Konto** (`/account`)
  = account portal (wallet, exchange, withdraw, history, KYC). **Privater Bereich** (`/dashboard`) = case
  tracker (MiArea). Login redirects to the Private area; the portal keeps a "Mein Fall" tab to `/dashboard`.
- **Header remodel (2026-10-28)**: the top-right action cluster had too many buttons (Search, Anmelden,
  Konto erstellen, Soforthilfe, Privater Bereich, Mein Konto). Now: logged out → Search icon + Anmelden +
  Konto erstellen (Soforthilfe moved to mobile menu + "Kundenportal" top-bar link); logged in → Search +
  one "Mein Konto" dropdown containing Privater Bereich / Mein Konto / Abmelden. Mobile menu mirrors both.

- **PLATFORM PIVOT (2026-11-02)**: repositioned from a recovery service to a crypto trading/investing
  platform (Blockscaner). Header nav now: Products / Markets / Business / About us / Blog / Support + a
  5-language switcher (EN·DE·FR·ES·IT), English as the default/primary language. New pages in
  `src/pages/platform/` (Products, Markets [live CoinGecko prices], Business, About, Blog, Support) built on
  `src/pages/platform/_shell.tsx` + `src/platform.css`, modeled on youngplatform.com. Homepage (Index.tsx)
  keeps the hero but the body is now trading sections (Products / Markets teaser / Business / CTAs). Footer
  rebuilt to platform links + 5-language switcher. i18n/index.ts now supports en/de/fr/es/it (English primary,
  others fall back to English until translated). Login button label is now "Go to my area". My account
  (AccountPortal wallet/exchange/withdraw/KYC) and the case tracker are UNCHANGED and fully working.
  Kept-but-legacy: recovery help topics, legal pages, ChatAssistant (German forensic prompt) — pending rebrand.

- **Header → youngplatform style (2026-11-02)**: rebuilt the header to match youngplatform.com's structure,
  font and dimensions — Blockscaner logo+name left, centered black menu (Products/Markets/Business/About us/
  Blog/Support), and right side: a globe language icon (opens EN/DE/FR/ES/IT menu) + text "Log in" + filled
  rounded "Sign up" pill (Blockscaner blue). Removed the top utility bar. Logged-in users get a rounded blue
  "My account" pill.

- **Products mega-dropdown (2026-11-02)**: hovering "Products" in the header opens a two-column popup
  modeled on youngplatform — "To trade" (Blockscaner, Blockscaner Pro) and "To learn" (Blockscaner Step,
  Academy), each with a colored icon tile + bold title + short description, in a white rounded card.

- **Markets page → youngplatform style (2026-11-02)**: rebuilt `/markets` as a full markets table —
  breadcrumb, "Crypto Markets" title, search bar, "All / Crypto-assets available on Blockscaner", and a live
  table (Name+icon, Price, 7-day sparkline Graph, Trend 24h, Market Cap, 24H Volume, Buy) with pagination.
  Data from CoinGecko markets endpoint (120 assets, sparkline_in_7d). Blockscaner blue Buy buttons → sign-up.

- **Coin detail page (2026-11-02)**: `/markets/:coinId` — full Bitcoin page modeled on youngplatform. Hero
  image header (user's "BTC Screen 1.PNG" → `src/assets/btc-hero.png`), breadcrumb, "Buy Bitcoin (BTC): value
  and price trends" title + lead, Buy now / Converter CTAs, a live price chart (CoinGecko market_chart with
  1D/1W/1M/6M/2Y tabs, retry on rate-limit), all long-form content sections, a sticky right sidebar TOC,
  Market Data grid, Whitepaper link, Academy card, "Buy in 3 steps", About, Top movers chips, disclaimer,
  final CTA. Content in `src/content/coins.ts` (extensible to more coins). Market rows on `/markets` now link
  to the detail page. Blockscaner blue throughout.

## Backlog / next tasks
- P0: Top up Emergent credits so transactional emails (OTP, lead notify, reset — and price-alert
  notifications) actually send to real inboxes. Alert pipeline itself is built and tested.
- P1: Decide production from-domain (verify a real sending domain in Resend for delivery to
  arbitrary inboxes, not just the Resend test inbox).
- P1: Attach/confirm a production domain, then re-add canonical/og:url/og:image tags and
  sitemap.xml (currently omitted by design — see SEO note below).
- P1: Full long-form content for the remaining curated coins (USDC, TRX, LTC, BCH, LINK, DOT, AVAX
  still use the shorter generic template).
- P1: Run the full scheduled-recurring-task for `send-visitor-reminder` follow-ups (cron).
- P2: Re-add the Spanish `/cd` international section if ever wanted (files still available).
- P2: Wallet report PDF polish.

- **Business page rebuild (2026-11-02)**: full dark interactive `/business` from the user's 5 youngplatform
  screenshots — hero with live floating coin dishes (icons from `/api/market/coins?per_page=40`, CSS float
  animations), scrolling assets marquee (pause on hover), count-up stat cards (300+ / 2M+), treasury
  section (green report banner, OTC Desk card with animated arrows, Sub-account people art, Staking phone
  mock, Loyalty card), payments section (blue banner, "Receive crypto, settle in Euro" with animated
  BTC→EUR flow), training section (report banner, E-learning video mock with pulsing play button, Academy
  browser mock with graduation cap, Finance/IT/Legal workshop cards), final CTA. Scroll-reveal via
  IntersectionObserver throughout; all CTAs link to /contact, /products or /blog. Trustpilot badges and
  YP partner logos from the screenshots intentionally omitted (would be fabricated claims). Blockscaner
  blue accent; per-route Seo added. Hero coins restyled after feedback: large white 3D dishes on deep
  black (#030405), cropped at the hero corners/edges like the reference; then arranged as two diagonal
  clusters stepping from the top-left and bottom-right corners toward the title (user feedback); mobile
  keeps two small coins flanking the CTA.

- **Markets speed + interactive chart (2026-11-02)**: user reported slow /markets, broken range buttons
  and a non-interactive chart. Root cause: cold-cache requests waited through 12s+ of 429 retries.
  Fixes: (1) `_cached()` in market_data.py is now stale-while-revalidate — any cached entry serves
  instantly and refreshes in the background (verified 0.59s stale serve vs 12.5s before); retry budget
  shortened to fail fast. (2) CoinChart rewritten: stores timestamped points, mouse/touch crosshair with
  dashed guide line, highlighted dot and tooltip (price + date/time), header price/time follow the
  cursor, all ranges prefetched in the background ~3s apart after page load so 1D/1W/6M/2Y switch
  instantly, and a visible "Chart temporarily unavailable — Retry" overlay instead of silent blanks.
  Verified in browser: markets rows in 0.9s, tooltips at 15-95% hover positions, all 5 ranges render.

- **Richer pages + SEO + price alerts + related coins (2026-11-02)**:
  (1) Full hand-written 8-section pages for SOL, XRP, USDT, BNB, ADA, DOGE (`coins.ts`, registered in
  COINS; their old KNOWN template entries removed). (2) Per-coin SEO via new `src/components/Seo.tsx`
  (unique title/description/OG/Twitter per coin page and /markets); static `public/index.html` head
  rewritten for the trading platform (was stale German forensics SEO), lang=en, JSON-LD Organization +
  WebSite, real noscript fallback; robots.txt + llms.txt rewritten; sitemap.xml DELETED — no confirmed
  production domain, so all absolute-URL tags (canonical, og:url, og:image, sitemap) are intentionally
  omitted until a domain is attached. (3) Price alerts: `backend/price_alerts.py` (CRUD
  `/api/alerts`, max 20 active/user) + platform cron `*/15 * * * *` -> `/api/cron/price-alerts`
  (WEBHOOK_CRON_SECRET bearer auth, constant-time compare, run_id dedup, background check via
  market_data.eur_prices_for, one-shot trigger + email via email_wrapper/send_email);
  `.emergent/crons.yml` created. Frontend `src/components/PriceAlert.tsx` on every coin page
  (logged-out -> login prompt; logged-in -> direction+target form, list, delete). Tested end-to-end:
  create -> cron fire -> trigger recorded -> email attempted (blocked only because the test address is
  fake — Resend "undeliverable recipient"; real addresses will send once credits are topped up).
  (4) "People also view" row on coin pages (market-cap neighbours from the top-40 list) + scroll-to-top
  on coin change.

- **Backend market-data proxy + coin pages + scrollspy (2026-11-02)**: P0 rate-limit fix done — all
  CoinGecko calls moved behind FastAPI (`/app/backend/market_data.py`, prefix `/api/market`: `coins`,
  `coin/{id}`, `chart/{id}`, `simple-price`) with a shared TTL in-memory cache, stale-on-error fallback
  and 429 retry; `simple-price` resolves from the warm markets cache first. Wallet `live_rates()` in
  `portal_wallet.py` reuses the same cache. Frontend `Markets.tsx`, `CoinDetail.tsx`, `UserDashboard.tsx`
  now call the backend proxy. Ethereum got a full custom detail page (`ETHEREUM` in `coins.ts`, 8
  sections); 13 other majors (USDT, USDC, SOL, BNB, XRP, ADA, DOGE, TRX, LTC, BCH, LINK, DOT, AVAX) get
  generated pages via `genericCoin()`. Scrollspy on the coin-page TOC highlights the section being read
  (IntersectionObserver, last-visible-wins). Test round 1 (`/app/test_reports/iteration_1.json`):
  backend 6/6 pass; fixed the two HIGH findings (0,00 € chart placeholder -> "—", scrollspy stuck on
  first visible section). Known soft spot: chart for non-BTC coins can 503 while CoinGecko rate-limits
  the shared preview egress IP until the cache warms; frontend retries and the cache then serves all.

- **Detail pages for ALL listed coins (2026-11-02)**: every coin on `/markets` now opens a full detail
  page — no more "Asset not found". BTC/ETH keep hand-written long-form content; 13 majors keep curated
  generic pages; all other coins get a dynamic page built from a new cached backend profile endpoint
  (`GET /api/market/info/{id}`, 24h TTL: description, genesis date, categories, homepage/explorer/
  whitepaper links) via `coinFromInfo()`/`coinFromMarket()` in `coins.ts`. Page renders instantly with
  live market data, then upgrades to full descriptive content when the profile arrives.
  `GET /api/market/coin/{id}` now resolves from the warm markets-list cache first (~150ms, survives
  CoinGecko 429 storms); invalid ids return fast 404 -> "Asset not found". Self-tested via curl +
  screenshots (sui, near, litecoin, notacoin123).

- **Coin page TOC + hero cleanup (2026-11-02)**: sticky sidebar TOC deleted then re-inserted per user request
  (exactly one instance, applies to all coin detail pages). Removed the `btc-hero` hero image from the
  Bitcoin page because it was a full screenshot of youngplatform.com that visually duplicated the page
  title and TOC (asset file kept at `src/assets/btc-hero.png`, just no longer rendered).
