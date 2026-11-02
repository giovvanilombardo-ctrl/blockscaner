import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { t as _t } from "@/i18n";
import SiteLayout from "@/components/site/SiteLayout";
import Seo from "@/components/Seo";
import { Globe, Search, ChevronDown, ChevronRight, TrendingUp, TrendingDown } from "lucide-react";
import "@/platform.css";

const PER_PAGE = 10;

const eur = (v: number) =>
  new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR", maximumFractionDigits: v < 1 ? 4 : 2 }).format(v || 0);
const big = (v: number) => {
  if (v >= 1e9) return `${(v / 1e9).toFixed(2)} Bln`;
  if (v >= 1e6) return `${(v / 1e6).toFixed(2)} Mln`;
  return new Intl.NumberFormat("de-DE").format(Math.round(v || 0));
};

/* Tiny sparkline */
function Spark({ data, up }: { data: number[]; up: boolean }) {
  if (!data || data.length < 2) return <div style={{ width: 72, height: 28 }} />;
  const w = 72, h = 28, min = Math.min(...data), max = Math.max(...data);
  const rng = max - min || 1;
  const pts = data.map((v, i) => `${(i / (data.length - 1)) * w},${h - ((v - min) / rng) * (h - 2) - 1}`).join(" ");
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="mk-spark">
      <polyline fill="none" stroke={up ? "#16a34a" : "#dc2626"} strokeWidth="1.5" points={pts} />
    </svg>
  );
}

export default function Markets() {
  const [coins, setCoins] = useState<any[]>([]);
  const [sparks, setSparks] = useState<Record<string, number[]>>({});
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/market/coins?per_page=120&page=1`)
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((j) => {
        const arr = Array.isArray(j) ? j : [];
        setCoins(arr);
        const sp: Record<string, number[]> = {};
        arr.forEach((c) => { sp[c.id] = c.sparkline_in_7d?.price || []; });
        setSparks(sp);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return coins;
    return coins.filter((c) => c.name.toLowerCase().includes(q) || c.symbol.toLowerCase().includes(q));
  }, [coins, query]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const pageCoins = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);
  const up = (c: any) => (c.price_change_percentage_24h || 0) >= 0;

  return (
    <SiteLayout>
      <Seo
        title={`${_t("Crypto Markets")}: ${_t("live prices, trends and market capitalisation")} | Blockscaner`}
        description={_t("Live EUR prices, 7-day trends, market cap and 24h volume for the top crypto-assets. Buy Bitcoin, Ethereum and more on Blockscaner.")}
      />
      <div className="mk-page">
        <nav className="mk-crumb">
          <Link to="/">{_t("Home")}</Link> <ChevronRight className="h-3 w-3" /> <span>{_t("Market")}</span>
        </nav>

        <h1 className="mk-title">{_t("Crypto Markets")}</h1>

        <div className="mk-search">
          <Search className="h-4 w-4" />
          <input value={query} onChange={(e) => { setQuery(e.target.value); setPage(1); }} placeholder={_t("Search a crypto asset")} />
        </div>

        <div className="mk-filters">
          <button className="mk-filter is-on"><Globe className="h-4 w-4" /> {_t("All")}</button>
          <span className="mk-filter-note"><TrendingUp className="h-4 w-4" /> {_t("Crypto-assets available on Blockscaner")}</span>
        </div>

        <div className="mk-table">
          <div className="mk-row mk-head">
            <span>{_t("Name")}</span>
            <span className="mk-r">{_t("Price")}</span>
            <span className="mk-c">{_t("Graph")}</span>
            <span className="mk-r">{_t("Trend 24h")}</span>
            <span className="mk-r">{_t("Market Cap")} <ChevronDown className="inline h-3 w-3" /></span>
            <span className="mk-r">{_t("24H Volume")}</span>
            <span className="mk-r">{_t("Action")}</span>
          </div>
          {loading && <div className="mk-empty">{_t("Loading live markets…")}</div>}
          {!loading && pageCoins.map((c) => (
            <div key={c.id} className="mk-row">
              <Link to={`/markets/${c.id}`} className="mk-name mk-name-link">
                <img src={c.image} alt="" />
                <span><b>{c.name}</b><i>{c.symbol.toUpperCase()}</i></span>
              </Link>
              <span className="mk-r mk-price">{eur(c.current_price)}</span>
              <span className="mk-c"><Spark data={sparks[c.id]} up={up(c)} /></span>
              <span className={`mk-r mk-trend ${up(c) ? "up" : "down"}`}>
                {up(c) ? <TrendingUp className="h-3.5 w-3.5" /> : <TrendingDown className="h-3.5 w-3.5" />}
                {Math.abs(c.price_change_percentage_24h || 0).toFixed(2)}%
              </span>
              <span className="mk-r mk-num">{big(c.market_cap)}</span>
              <span className="mk-r mk-num">{big(c.total_volume)}</span>
              <span className="mk-r"><Link to="/login?modo=registro" className="mk-buy">{_t("Buy")}</Link></span>
            </div>
          ))}
          {!loading && pageCoins.length === 0 && <div className="mk-empty">{_t("No assets found.")}</div>}
        </div>

        {totalPages > 1 && (
          <div className="mk-pager">
            {Array.from({ length: totalPages }, (_, i) => i + 1).slice(0, 7).map((n) => (
              <button key={n} onClick={() => setPage(n)} className={`mk-page-btn ${page === n ? "on" : ""}`}>{n}</button>
            ))}
            {totalPages > 7 && <span className="mk-dots">…</span>}
            {totalPages > 7 && <button onClick={() => setPage(totalPages)} className={`mk-page-btn ${page === totalPages ? "on" : ""}`}>{totalPages}</button>}
            <button onClick={() => setPage(Math.min(totalPages, page + 1))} className="mk-page-btn mk-next" aria-label={_t("Next")}><ChevronRight className="h-4 w-4" /></button>
          </div>
        )}
      </div>
    </SiteLayout>
  );
}
