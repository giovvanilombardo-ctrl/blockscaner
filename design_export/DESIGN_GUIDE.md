# Blockscaner — Design Guide
Everything needed to reproduce the current visual design in any website builder.

---

## 1. Typography

The site loads three Google Fonts via CSS `@import` (top of `css/index.css`):

```
@import url('https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@62..125,400..800&family=IBM+Plex+Sans:wght@300;400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap');
```

| Role | Font | Weights used | Where |
|---|---|---|---|
| Display / headings | **Archivo** (variable width 62–125) | 400–800 | All h1–h6, hero titles, card titles, buttons labels in hero |
| Body | **IBM Plex Sans** | 300, 400, 500, 600 | Paragraphs, UI text, navigation, tables |
| Mono | **IBM Plex Mono** | 400, 500 | Numbers, code, price tickers |

Font-family CSS:
- Headings: `font-family: "Archivo", sans-serif;`
- Body: `font-family: "IBM Plex Sans", sans-serif;`
- Mono: `font-family: "IBM Plex Mono", monospace;`
- Body also uses `font-feature-settings: "ss01", "tnum";`

### Type scale (as used across pages)
- Hero H1 (home): `clamp(2.6rem, 5.5vw, 4.4rem)`, weight 500, letter-spacing `-0.03em`, line-height 1.08
- Section H2: `clamp(2rem, 4.2vw, 3.2rem)`, weight 800, letter-spacing `-0.03em`, line-height 1.12
- Card H3: `1.4rem–2rem`, weight 800, letter-spacing `-0.01em`
- Body text: `0.9rem–0.95rem`, line-height 1.6–1.65
- Small/caption: `0.8rem–0.85rem`
- Buttons: `0.85rem–0.95rem`, weight 800

---

## 2. Colour palette

### Core brand colours (HEX)
| Name | HEX | Usage |
|---|---|---|
| Primary blue | `#1d63e8` (hsl 214 88% 48%) | Primary buttons (Sign up, Buy), links, active states |
| Accent blue (hover) | `#2f7bf2` (hsl 214 88% 55%) | Hover states, highlights |
| Accent green (Pro/emerald) | `#2ee58a` | Pro page accents, CTAs on dark backgrounds, "precision/fees" words, success |
| Emerald | `#17b26a` (hsl 152 76% 40%) | Positive trends, success badges |
| Red (down/negative) | `#e11d48` | Down candles, negative trends |
| Ink (main text) | `#101828` approx (hsl 220 30% 12%) | Headings, body on light |
| Muted text | `#5f6b85` approx (hsl 218 12% 42%) | Secondary text |
| Background | `#ffffff` | Page background (light pages) |
| Card background | `#f7f7f8` / `#f8fafc` | Light cards |
| Deep navy (home hero) | `#060d3f` approx (hsl 230 96% 16%) | Homepage hero background |
| Cyan (hero particles) | `#3ae2f0` approx (hsl 188 95% 55%) | Homepage hero glow accents |
| Dark card (Pro) | `#12121a` | Cards on Pro page |
| Dark border | `#1d1d28` | Card borders on dark |
| Pro page background | `#030308` | Deep black for Pro page |
| Pink (Step) | `#ff2e88` → `#e01874` gradient | Step product cards, badges |
| Purple (Academy) | `#8b5cf6` → `#7c3aed` gradient | Academy product cards |

### Gem/accent set (used for icons and category chips)
- gem-purple: hsl(268 60% 55%), gem-orange: hsl(14 85% 55%), gem-yellow: hsl(42 95% 55%), gem-olive: hsl(50 60% 35%), gem-green: hsl(140 60% 30%), gem-teal: hsl(180 70% 50%)

### Common gradients
- Step card: `linear-gradient(#ff2e88, #e01874)`
- Academy card: `linear-gradient(#8b5cf6, #7c3aed)`
- Green API card: `linear-gradient(160deg, #0e5c36, #084527 55%, #063420)`
- Dark overlay on photo cards: `linear-gradient(180deg, rgba(10,10,14,.88), rgba(10,10,14,.55) 40%, rgba(10,10,14,.08) 75%, transparent)`
- CASP light-green card: background `#e6f9ef`, border `#c8eeda`, heading `#0d3b22`, text `#2c5c40`

Full CSS variable definitions are in `css/index.css` (`:root` block, lines 13–58).

---

## 3. Design tokens

- **Radius**: cards 20–28px (`border-radius: 20px` light cards, `28px` on Pro photo cards); buttons fully rounded pills (`border-radius: 99px`); inputs ~10px. Base token `--radius: 0.25rem`.
- **Buttons (pill)**: padding `.65rem 1.3rem` – `.8rem 1.9rem`; weight 800; green on dark (`#2ee58a` bg, `#04140b` text, hover `#4bf09e`); blue on light (`#1d63e8` bg, white text).
- **Borders**: light cards `1px solid #e2e8f0`-ish (hsl 214 25% 88%); dark cards `1px solid #1d1d28`.
- **Shadows**: minimal/flat design; subtle elevation on menus and hover states only.
- **Container widths**: sections max-width `56rem`–`72rem`, centered, side padding `1.5rem`.
- **Section spacing**: vertical padding `2rem 1.5rem 7rem` per section; card grids gap `1.4rem`.

---

## 4. Layout & page patterns

All pages share the same shell (components in `components/site/`):
- **SiteHeader**: white sticky top bar, logo left ("B" mark + "Blockscaner"), center nav (Products, Markets, Business, About us, Blog, Support), right: globe language icon, "Log in" text link, blue pill "Sign up". Products and About-us have dropdown menus (Products = icon + title + description cards; About us = compact text-only list, centered).
- **SiteFooter**: dark/light footer with link columns (Blockscaner, Pro, Step, Academy, Clubs, Start here, Glossary, Buy BTC/ETH/SOL/DOGE, ESG & Whitepapers, Work with us).

### Page-specific patterns (see screenshots/)
1. **Home** (01): full-width deep-navy hero with animated cyan particle field, huge white Archivo headline left, description + white pill "GET STARTED" right; below: product cards, phone mockup with chart range buttons, sections for Pro/DeFi/Business/Moneybox/Staking.
2. **Products** (02): white page, large rounded (28px) pink gradient hero card with 3D blocks + phone mockup, "Download Step" pink pill button with app-store icons.
3. **Markets** (03): white, breadcrumb, huge "Crypto Markets" heading, centered search input, filter pills, clean table rows: coin icon + name/ticker, price, sparkline graph, 24h trend (green up), market cap, volume, blue pill "Buy" button.
4. **Business** (04): black hero with floating 3D coin chips, centered headline "Your company's strategic asset is crypto" (green accent), green pill "Contact us".
5. **Ecosystem** (05): white, centered "Our Products" + green pill CTA, two-column cards (light "Crypto Made Easy" with phone art / black "Crypto Made Pro" with terminal art), "Learn while having fun" section with black Step card (pink accents) and light Academy card (purple accents).
6. **Leadership** (06): white, "Leadership" + subline, sections Board of Directors / Executive Leadership / Founders / Advisors — grid of portrait photos (rounded 16px), name (bold), role (muted), LinkedIn icon.
7. **Academy** (07): white, hero article split (text left + coloured illustration card right with level pill "Beginner"), category sections with "See more" links and rows of coloured article cards (mint/yellow/black pastel cards).
8. **Pro** (08): deep-black page, hero with blurred candlestick chart backdrop + radial dark overlay, "Unmatched precision. Minimal fees." (green italic-accent words), green pill Sign up; then sections "Advanced Trading across 27 Markets" (photo card + medals card), "Our Trading Service" (terminal card + green API card with animated pulse lines), "Compliance & Tax Management" (dark custody card + photo card), small light-green CASP pill, "Our partners" (text logos), CTA banner, "Six years of advanced crypto solutions" (full-bleed photo cards, text top-left, green Contact-us pill button).
9. **Step** (09): white, pink 3D blocks hero card + phone, "Expand your knowledge" sections.
10. **Academy article** (10): white, breadcrumbs, category pill, big Archivo title, date + read time, share icons right, large pastel hero illustration card, long-form body with sidebar table-of-contents, "Buy now →" CTA.
11. **Coin page** (11): white, "Buy Bitcoin (BTC): value and price trends" H1, blue "Buy now" + ghost "Converter" pills, price + % + chart card with 1D/1W/1M/6M/2Y range pills (active = blue), right sidebar with anchor links, price-alert card, related coins.

### Mobile (375px, see 12-home-mobile.png)
- Header collapses to logo + globe + hamburger menu
- Hero text scales down (Archivo ~2.4rem), sections stack to single column (`grid-template-columns: 1fr` under 860px)
- Cards full width, padding reduced to ~2rem

---

## 5. Components & visual rules

- **Dropdown menus**: white rounded panel, soft shadow; Products items show icon chip (coloured bg) + title + 1-line description; About-us items are text-only, centered, compact.
- **Level pills** (Academy): small rounded-full pill, e.g. "Beginner" white bg + green dot, placed on card top-left.
- **Chart range pills**: rounded-full, inactive grey text, active blue bg white text.
- **Photo cards** (Pro solutions): image fills card edge-to-edge (object-fit: cover, object-position center 90%), dark gradient overlay strongest at top, text left-aligned top with ~3rem padding, green pill CTA.
- **Terminal/illustration cards**: SVG/CSS illustrations on dark `#0c0c12`–`#12121a` backgrounds with green/red candlesticks.
- **Cookie banner**: bottom bar, light grey bg, cookie emoji + German text, "Ablehnen" ghost + "Akzeptieren" blue buttons.
- **Animations**: hover transitions 150ms on buttons (`background-color`); homepage particle field (canvas); API card pulse: dashed stroke animation `proApiFlow 2.4s linear infinite` traveling from center node to 6 outer nodes; marquee keyframes `vk-marquee 40s linear infinite`; `prefers-reduced-motion` respected.

---

## 6. Assets inventory (all inside assets/)

- `assets/leaders/` — 14 AI-generated leadership portraits (PNG)
- `assets/pro/` — Pro page art: trader-desk, fee-medals, trading-terminal, api-nodes, tax-management, staking-phone, support-meeting (PNG)
- `assets/` (root) — hero images, monkey-headphones.png, options-hands.png, misc illustrations
- `assets/public/` — favicon.ico, index.html, robots.txt, llms.txt, and `docs/` with 3 branded PDF reports
- Logo: the "B" square mark + "Blockscaner" wordmark (SVG inline in SiteHeader component — `components/site/SiteHeader.tsx`)

## 7. Files in this export

- `css/index.css` — the COMPLETE stylesheet (all custom components, pages, animations, responsive rules) plus the Google Fonts import at the top
- `components/site/` — SiteHeader, SiteLayout, SiteFooter source (structure reference for nav/footer)
- `config/` — tailwind.config.js (fonts/colours/theme tokens), postcss.config.js, craco.config.js, components.json
- `screenshots/` — 12 full-page screenshots (desktop + mobile) of every key page
- `assets/` — every image, portrait, illustration, icon, PDF and favicon used on the site

## 8. How to recreate in another builder
1. Load the 3 Google Fonts (Archivo, IBM Plex Sans, IBM Plex Mono).
2. Set up the colour palette from section 2 as global swatches.
3. Use pill buttons (radius 99px), 20–28px card radius, flat/minimal shadows.
4. Rebuild page layouts following screenshots + section 4 patterns.
5. Use `css/index.css` as the reference for exact paddings, gaps, and typography per component (class names are descriptive: `.eco-*`, `.pro-*`, `.ac-*`, `.mk-*`, `.cd-*`, `.lead-*`).
