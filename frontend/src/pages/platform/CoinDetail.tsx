import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { t as _t } from "@/i18n";
import SiteLayout from "@/components/site/SiteLayout";
import { ChevronRight, ArrowUpRight, ExternalLink } from "lucide-react";
import { COINS, CoinContent } from "@/content/coins";
import btcHero from "@/assets/btc-hero.png";
import "@/platform.css";

const eur = (v: number) => new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR", maximumFractionDigits: 2 }).format(v || 0);
const big = (v: number) => v >= 1e9 ? `${(v / 1e9).toFixed(2)} Bln` : v >= 1e6 ? `${(v / 1e6).toFixed(2)} Mln` : new Intl.NumberFormat("de-DE").format(Math.round(v || 0));
const RANGES = ["1D", "1W", "1M", "6M", "2Y"];

const HERO_IMAGES: Record<string, string> = { "btc-hero": btcHero };

function CoinChart({ coinId, sym, current }: { coinId: string; sym: string; current: any }) {
  const [range, setRange] = useState("1M");
  const [points, setPoints] = useState<number[]>([]);
  useEffect(() => {
    let alive = true;
    const days = range === "1D" ? 1 : range === "1W" ? 7 : range === "1M" ? 30 : range === "6M" ? 180 : 730;
    const load = (attempt = 0) => {
      fetch(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=eur&days=${days}`)
        .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
        .then((j) => { if (alive) setPoints((j.prices || []).map((p: any[]) => p[1])); })
        .catch(() => { if (alive && attempt < 3) setTimeout(() => load(attempt + 1), 1500 * (attempt + 1)); });
    };
    load();
    return () => { alive = false; };
  }, [coinId, range]);

  const w = 600, h = 220;
  const path = useMemo(() => {
    if (points.length < 2) return "";
    const min = Math.min(...points), max = Math.max(...points), rng = max - min || 1;
    return points.map((v, i) => `${(i / (points.length - 1)) * w},${h - ((v - min) / rng) * (h - 24) - 12}`).join(" ");
  }, [points]);
  const up = points.length > 1 && points[points.length - 1] >= points[0];

  return (
    <div className="cd-chart">
      <div className="cd-chart-head">
        <div>
          <p className="cd-chart-name">{sym === "BTC" ? "Bitcoin" : sym}</p>
          <p className="cd-chart-price">{eur(current?.current_price)}</p>
          <p className={`cd-chart-change ${(current?.price_change_percentage_24h || 0) >= 0 ? "up" : "down"}`}>
            {(current?.price_change_percentage_24h || 0).toFixed(2)} %
          </p>
        </div>
        {current?.image && <img src={current.image} alt={sym} className="cd-chart-icon" />}
      </div>
      <svg viewBox={`0 0 ${w} ${h}`} className="cd-chart-svg" preserveAspectRatio="none">
        {points.length > 1 && <polyline fill="none" stroke={up ? "#16a34a" : "#f0b90b"} strokeWidth="2" points={path} />}
      </svg>
      <div className="cd-ranges">
        {RANGES.map((r) => (
          <button key={r} onClick={() => setRange(r)} className={`cd-range ${range === r ? "on" : ""}`}>{r}</button>
        ))}
      </div>
    </div>
  );
}

export default function CoinDetail() {
  const { coinId = "bitcoin" } = useParams();
  const coin: CoinContent | undefined = COINS[coinId];
  const [market, setMarket] = useState<any>(null);
  const [topMovers, setTopMovers] = useState<any[]>([]);

  useEffect(() => {
    if (!coin) return;
    let alive = true;
    const getJSON = (url: string, attempt = 0): Promise<any> =>
      fetch(url)
        .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
        .catch(() => (attempt < 3 ? new Promise((res) => setTimeout(() => res(getJSON(url, attempt + 1)), 1600 * (attempt + 1))) : []));
    getJSON(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&ids=${coin.id}&price_change_percentage=24h&sparkline=true`)
      .then((j) => { if (alive) setMarket(Array.isArray(j) ? j[0] : null); });
    getJSON(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&order=market_cap_desc&per_page=40&page=1&price_change_percentage=24h`)
      .then((j) => {
        if (!alive) return;
        const arr = (Array.isArray(j) ? j : []).filter((c: any) => c.id !== coin.id)
          .sort((a: any, b: any) => Math.abs(b.price_change_percentage_24h || 0) - Math.abs(a.price_change_percentage_24h || 0));
        setTopMovers(arr.slice(0, 7));
      });
    return () => { alive = false; };
  }, [coin]);

  if (!coin) {
    return (
      <SiteLayout>
        <div className="pf-hero"><h1 className="pf-title">{_t("Asset not found")}</h1>
          <p className="pf-lead"><Link to="/markets" style={{ color: "#1663d9" }}>{_t("Back to markets")}</Link></p></div>
      </SiteLayout>
    );
  }

  const heroImg = coin.heroImage ? HERO_IMAGES[coin.heroImage] : undefined;
  const md = [
    { label: _t("Price 24H"), value: market ? eur(market.current_price) : "—" },
    { label: _t("Change 24H"), value: market ? `${(market.price_change_percentage_24h || 0).toFixed(2)}%` : "—" },
    { label: _t("Circulating Supply"), value: market ? `${coin.sym} ${(market.circulating_supply / 1e6).toFixed(2)} Mln` : "—" },
    { label: _t("Max supply"), value: market?.max_supply ? `${coin.sym} ${(market.max_supply / 1e6).toFixed(2)} Mln` : "—" },
    { label: _t("Market Cap"), value: market ? eur(market.market_cap) : "—" },
    { label: _t("Volume"), value: market ? eur(market.total_volume) : "—" },
  ];

  const toc = [
    ...coin.sections.map((s) => ({ id: s.id, label: s.title })),
    { id: "market-data", label: `${coin.name} Market Data` },
    { id: "academy", label: _t("Learn More in the Academy") },
    { id: "buy-steps", label: _t(`Buy ${coin.name} in 3 steps on Blockscaner`) },
    { id: "about", label: _t("What does Blockscaner do?") },
    { id: "top-movers", label: _t("Check out the Top movers") },
  ];

  return (
    <SiteLayout>
      <div className="cd-page">
        <nav className="mk-crumb">
          <Link to="/">{_t("Home")}</Link> <ChevronRight className="h-3 w-3" /> <Link to="/markets">{_t("Market")}</Link> <ChevronRight className="h-3 w-3" /> <span>{coin.name}</span>
        </nav>

        <h1 className="cd-title">{coin.title}</h1>
        <p className="cd-lead">{coin.lead}</p>

        <div className="cd-actions">
          <Link to="/login?modo=registro" className="cd-btn-primary">{_t("Buy now")}</Link>
          <Link to="/account" className="cd-btn-ghost">{_t("Converter")}</Link>
        </div>

        {heroImg && <div className="cd-hero"><img src={heroImg} alt={coin.name} /></div>}

        <div className="cd-layout">
          {/* main column */}
          <div className="cd-main">
            <CoinChart coinId={coin.id} sym={coin.sym} current={market} />

            {coin.sections.map((s) => (
              <section key={s.id} id={s.id} className="cd-section">
                <h2>{s.title}</h2>
                {s.body.map((p, i) => <p key={i}>{p}</p>)}
              </section>
            ))}

            <section id="market-data" className="cd-section">
              <h2>{_t(`${coin.name} Market Data`)}</h2>
              <div className="cd-md-grid">
                {md.map((m) => (
                  <div key={m.label} className="cd-md-item"><small>{m.label}</small><b>{m.value}</b></div>
                ))}
              </div>
            </section>

            {coin.whitepaper && (
              <section className="cd-section">
                <h2>{_t("Useful links")}</h2>
                <a href={coin.whitepaper} target="_blank" rel="noreferrer" className="cd-link">
                  {_t("Whitepaper")} <ExternalLink className="h-4 w-4" />
                </a>
              </section>
            )}

            <section id="academy" className="cd-section cd-cta-card">
              <h2>{_t("Learn More in the Academy")}</h2>
              <p>{_t("From Web3 basics to decentralised finance. Access guides and insights tailored to every level, and navigate the crypto market with confidence.")}</p>
              <Link to="/blog" className="cd-btn-ghost">{_t("Visit the Academy")} <ArrowUpRight className="h-4 w-4" /></Link>
            </section>

            <section id="buy-steps" className="cd-section">
              <h2>{_t(`Buy ${coin.name} in 3 steps on Blockscaner`)}</h2>
              <ol className="cd-steps">
                <li><b>{_t("Sign up and verify your identity")}</b><p>{_t("Create your account in minutes. Once verified, you're ready to buy and sell crypto on Blockscaner.")}</p></li>
                <li><b>{_t("Fund your wallet")}</b><p>{_t("Deposit Euros using your preferred method: card, bank transfer, Apple Pay, or Google Pay. Start with as little as €20.")}</p></li>
                <li><b>{_t("Buy and sell crypto")}</b><p>{_t("Trade instantly using your wallet balance. Prices and fees are transparently displayed before any confirmation.")}</p></li>
              </ol>
            </section>

            <section id="about" className="cd-section">
              <h2>{_t("What does Blockscaner do?")}</h2>
              <p>{_t("Blockscaner is the European platform for the crypto-asset world. We work to make buying and selling crypto-assets a clear and accessible experience — whether you are taking your first steps or trading regularly.")}</p>
            </section>

            <section id="top-movers" className="cd-section">
              <h2>{_t("Check out the Top movers")}</h2>
              <p>{_t("Discover the cryptocurrencies with the biggest price changes over the last 24 hours.")}</p>
              <div className="cd-movers">
                {topMovers.map((c) => (
                  <Link key={c.id} to={`/markets/${c.id}`} className="cd-mover">
                    <img src={c.image} alt="" /><b>{c.name}</b><span>{c.symbol.toUpperCase()}</span>
                  </Link>
                ))}
              </div>
            </section>

            <section className="cd-section cd-disclaimer">
              <p>{_t("This content constitutes a marketing communication and does not constitute investment advice or a personalised recommendation. Crypto-assets are highly volatile and involve a significant risk of losing up to the entirety of the capital invested. Users are invited to conduct independent and informed assessments, consulting the Terms and Conditions and, where appropriate, seeking advice from a qualified professional advisor before making any economic or financial decision.")}</p>
            </section>

            <div className="cd-final-cta">
              <Link to="/login?modo=registro" className="cd-btn-primary">{_t("Jump into the crypto market now")}</Link>
            </div>
          </div>

          {/* sticky sidebar TOC */}
          <aside className="cd-toc">
            <nav>
              {toc.map((t) => (
                <a key={t.id} href={`#${t.id}`} className="cd-toc-link">{t.label}</a>
              ))}
            </nav>
          </aside>
        </div>
      </div>
    </SiteLayout>
  );
}
