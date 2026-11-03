import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { t as _t } from "@/i18n";
import SiteLayout from "@/components/site/SiteLayout";
import Seo from "@/components/Seo";
import {
  GraduationCap, ArrowDownUp, Landmark, Code2, Scale,
  ArrowUpRight, Star, Info, Percent, ChevronLeft, MoreHorizontal, PieChart,
} from "lucide-react";
import coinBtc from "@/assets/coins/bitcoin.png";
import coinEth from "@/assets/coins/ethereum.png";
import coinUsdt from "@/assets/coins/tether.png";
import coinUsdc from "@/assets/coins/usd-coin.png";
import coinXrp from "@/assets/coins/ripple.png";
import coinDot from "@/assets/coins/polkadot.png";
import coinEur from "@/assets/coins/euro.png";
import "@/platform.css";

const COIN_PHOTOS: Record<string, string> = {
  bitcoin: coinBtc, ethereum: coinEth, tether: coinUsdt,
  "usd-coin": coinUsdc, ripple: coinXrp, polkadot: coinDot, euro: coinEur,
};

type Coin = { id: string; name: string; symbol: string; image: string };

/* fetch top coins once (backend-cached) to drive the floating coins + marquee */
function useCoins(): Coin[] {
  const [coins, setCoins] = useState<Coin[]>([]);
  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/market/coins?per_page=40&page=1`)
      .then((r) => (r.ok ? r.json() : []))
      .then((j) => { if (Array.isArray(j)) setCoins(j.slice(0, 20)); })
      .catch(() => {});
  }, []);
  return coins;
}

/* scroll-reveal: adds .in when the element enters the viewport */
function Reveal({ children, className = "", delay = 0, ...rest }: any) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { el.classList.add("in"); obs.disconnect(); } },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} className={`rv ${className}`} style={{ transitionDelay: `${delay}ms` }} {...rest}>
      {children}
    </div>
  );
}

/* animated number for the stat cards */
function CountUp({ to, suffix }: { to: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [val, setVal] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      obs.disconnect();
      const t0 = performance.now();
      const tick = (t: number) => {
        const k = Math.min(1, (t - t0) / 1400);
        setVal(Math.round(to * (1 - Math.pow(1 - k, 3))));
        if (k < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, { threshold: 0.4 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [to]);
  return <span ref={ref}>{val}{suffix}</span>;
}

/* exact reference layout: photorealistic coin renders lying on the black surface */
const HERO_SLOTS = [
  { coin: "ripple", top: "11%", left: "2%", size: 185, rz: -8, depth: 1.0, d: 1.2, anim: "b" },
  { coin: "usd-coin", top: "-3%", left: "-3%", size: 440, rz: 4, depth: 1.8, d: 0, anim: "a" },
  { coin: "tether", top: "35%", left: "1.5%", size: 210, rz: -5, depth: 1.2, d: 2.1, anim: "c" },
  { coin: "polkadot", top: "44%", right: "16%", size: 165, rz: 6, depth: 0.9, d: 0.6, anim: "d" },
  { coin: "ethereum", bottom: "30%", right: "8%", size: 205, rz: 5, depth: 1.1, d: 1.5, anim: "b" },
  { coin: "bitcoin", bottom: "-4%", right: "5%", size: 390, rz: -4, depth: 1.5, d: 0.9, anim: "c" },
];

const REPORT_URL = "/docs/blockscaner-tesoreria-aziendale.pdf";
const REPORT_PAYMENTS_URL = "/docs/blockscaner-pagamenti-internazionali.pdf";
const REPORT_TRAINING_URL = "/docs/blockscaner-training-hub.pdf";

/* white person glyph used inside the green sub-account circles (reference design) */
function PersonGlyph() {
  return (
    <svg viewBox="0 0 100 100" aria-hidden="true" style={{ width: "68%", height: "68%" }}>
      <circle cx="50" cy="35" r="19" fill="#fff" />
      <path d="M21 92 C21 62 79 62 79 92 Z" fill="#fff" />
    </svg>
  );
}

/* thick tilted check mark used on the loyalty coins (reference design) */
function LoyalCheck({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 100 100" style={{ width: "56%", height: "56%", overflow: "visible" }}>
      <g transform="rotate(-18 50 50)">
        <path d="M30 52 L44 66" stroke={color} strokeWidth="17" strokeLinecap="round" fill="none" />
        <path d="M44 66 L74 36" stroke={color} strokeWidth="17" strokeLinecap="round" fill="none" />
      </g>
    </svg>
  );
}
/* 3D hexagon block — flat-topped isometric prism (loyalty art, reference design).
   Coordinates: top hexagon edge s=25,50 / 75,50 / 100,75 / 75,100 / 25,100 / 0,75,
   prism depth D added below, bottom face identical shifted down. */
function HexIcon({ size }: { size: number }) {
  const D = 42; // prism depth as % of top height
  return (
    <svg viewBox={`0 0 100 ${100 + D}`} style={{ width: size, height: "auto", display: "block" }}>
      <path d={`M0 75 L25 100 L25 ${100 + D} L0 ${75 + D} Z`} fill="var(--left)" />
      <path d={`M25 100 L75 100 L75 ${100 + D} L25 ${100 + D} Z`} fill="var(--front)" />
      <path d={`M75 100 L100 75 L100 ${75 + D} L75 ${100 + D} Z`} fill="var(--right)" />
      <path d={`M25 50 L75 50 L100 75 L75 100 L25 100 L0 75 Z`} fill="var(--top)" />
    </svg>
  );
}




/* green scalloped seal with % (staking card, reference design) */
function Seal() {
  const pts = Array.from({ length: 96 }, (_, i) => {
    const t = (i / 96) * Math.PI * 2;
    const r = 44 + 6 * Math.sin(14 * t);
    return `${(50 + r * Math.cos(t)).toFixed(1)},${(50 + r * Math.sin(t)).toFixed(1)}`;
  }).join(" L");
  return (
    <div className="bz-seal">
      <svg viewBox="0 0 100 100" aria-hidden="true">
        <path d={`M${pts} Z`} fill="#b8f1cf" />
        <circle cx="50" cy="50" r="30" fill="#16a34a" />
      </svg>
      <Percent className="h-8 w-8" color="#fff" strokeWidth={3.2} />
    </div>
  );
}

/* small filled flame graphic (staking card, reference design) */
function FlameArt({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 72" className={`bz-flame3 ${className}`} aria-hidden="true">
      <path d="M30 2 C36 14 48 20 48 38 C48 54 40 70 30 70 C20 70 12 54 12 38 C12 26 20 20 22 10 C26 18 28 20 30 22 C28 12 28 6 30 2 Z" fill="#f97316" />
      <path d="M30 30 C35 40 39 45 39 54 C39 62 35 68 30 68 C25 68 21 62 21 54 C21 45 25 40 30 30 Z" fill="#fbbf24" />
      <path d="M30 46 C33 51 35 53 35 59 C35 64 32.5 67 30 67 C27.5 67 25 64 25 59 C25 53 27 51 30 46 Z" fill="#fef3c7" />
    </svg>
  );
}

/* cartoon e-learning thumbnails for the Academy card (hand-drawn style) */
function VideoThumb() {
  return (
    <svg viewBox="0 0 120 72" aria-hidden="true" style={{ width: "100%", height: "100%" }}>
      <rect x="4" y="8" width="112" height="56" rx="8" fill="#1e293b" />
      <circle cx="60" cy="36" r="16" fill="#3b82f6" />
      <path d="M56 28 L70 36 L56 44 Z" fill="#fff" />
      <rect x="16" y="52" width="60" height="4" rx="2" fill="#475569" />
      <rect x="16" y="52" width="28" height="4" rx="2" fill="#93c5fd" />
    </svg>
  );
}
function LaptopThumb() {
  return (
    <svg viewBox="0 0 120 72" aria-hidden="true" style={{ width: "100%", height: "100%" }}>
      <rect x="20" y="12" width="80" height="46" rx="5" fill="#f8fafc" stroke="#334155" strokeWidth="2.5" />
      <rect x="30" y="22" width="36" height="26" rx="3" fill="#e0e7ff" />
      <path d="M40 48 L40 30 M48 44 L48 26 M56 40 L56 34" stroke="#6366f1" strokeWidth="3" strokeLinecap="round" fill="none" />
      <rect x="70" y="26" width="20" height="16" rx="2" fill="#fde68a" />
      <path d="M74 30 h12 M74 34 h12" stroke="#92400e" strokeWidth="1.5" />
      <path d="M20 58 h80 l-6 6 H26 Z" fill="#94a3b8" />
    </svg>
  );
}
function CertThumb() {
  return (
    <svg viewBox="0 0 120 72" aria-hidden="true" style={{ width: "100%", height: "100%" }}>
      <rect x="30" y="10" width="60" height="44" rx="4" fill="#fffbeb" stroke="#d97706" strokeWidth="2.5" />
      <circle cx="60" cy="26" r="9" fill="none" stroke="#d97706" strokeWidth="2.5" />
      <path d="M56 26 L59 29 L64 23" stroke="#d97706" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M40 42 h40 M40 48 h28" stroke="#d97706" strokeWidth="2" strokeLinecap="round" />
      <path d="M30 54 L26 66 L32 62 L38 68 L34 56" fill="#f87171" />
      <path d="M90 54 L94 66 L88 62 L82 68 L86 56" fill="#f87171" />
    </svg>
  );
}

function ReportBtn({ id, url = REPORT_URL, name = "Blockscaner-Tesoreria-Aziendale.pdf" }: { id: string; url?: string; name?: string }) {
  return (
    <a href={url} download={name} className="bz-pill" data-testid={id}>
      {_t("Download the Report")}
    </a>
  );
}

/* scrolls to the enquiry form, optionally preselecting a topic */
function scrollToForm(topic?: string) {
  const el = document.getElementById("business-contact");
  if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
  if (topic) window.dispatchEvent(new CustomEvent("bz-topic", { detail: topic }));
}

function BizContactForm() {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [topic, setTopic] = useState("Treasury & OTC");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [err, setErr] = useState("");

  useEffect(() => {
    const h = (e: any) => setTopic(e.detail);
    window.addEventListener("bz-topic", h);
    return () => window.removeEventListener("bz-topic", h);
  }, []);

  const submit = async () => {
    if (!name.trim() || !company.trim() || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      setErr(_t("Please fill in name, company and a valid email."));
      return;
    }
    setBusy(true); setErr("");
    try {
      const r = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/business-enquiry`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, company, email, phone, topic, message }),
      });
      if (!r.ok) throw new Error();
      setDone(true);
    } catch {
      setErr(_t("Could not send. Please try again."));
    }
    setBusy(false);
  };

  if (done) {
    return (
      <div className="bz-form-done" data-testid="business-form-success">
        <h3>{_t("Thank you!")}</h3>
        <p>{_t("Your enquiry has been sent. Our Account Manager will get back to you within one business day.")}</p>
      </div>
    );
  }

  return (
    <div className="bz-form" data-testid="business-contact-form">
      <div className="bz-form-row">
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder={_t("Your name")} data-testid="biz-form-name" />
        <input value={company} onChange={(e) => setCompany(e.target.value)} placeholder={_t("Company")} data-testid="biz-form-company" />
      </div>
      <div className="bz-form-row">
        <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder={_t("Work email")} type="email" data-testid="biz-form-email" />
        <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder={_t("Phone (optional)")} data-testid="biz-form-phone" />
      </div>
      <select value={topic} onChange={(e) => setTopic(e.target.value)} data-testid="biz-form-topic">
        <option>Treasury &amp; OTC</option>
        <option>{_t("Crypto payments")}</option>
        <option>{_t("Team training")}</option>
        <option>{_t("Workshops")}</option>
        <option>Staking</option>
        <option>{_t("Other")}</option>
      </select>
      <textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={4}
        placeholder={_t("Tell us about your goals (optional)")} data-testid="biz-form-message" />
      {err && <p className="bz-form-err" data-testid="biz-form-error">{err}</p>}
      <button onClick={submit} disabled={busy} className="bz-cta" data-testid="biz-form-submit">
        {busy ? _t("Sending…") : _t("Send enquiry")}
      </button>
    </div>
  );
}

export default function Business() {
  const coins = useCoins();

  return (
    <SiteLayout>
      <Seo
        title={`${_t("Business")}: ${_t("crypto treasury, payments and team training")} | Blockscaner`}
        description={_t("Put crypto to work for your company: treasury diversification, crypto payments settled in Euro, OTC desk, staking and tailored team training on Blockscaner.")}
      />
      <div className="bz-page" data-testid="business-page">

        {/* ---------- HERO (photo 5) ---------- */}
        <section className="bz-hero">
          {HERO_SLOTS.map((s, i) => {
            const { coin, size, d, rz, depth, anim, ...pos } = s as any;
            return (
              <div key={coin} className="bz-coin-par" style={{ ...pos } as any}>
                <div className="bz-coin-tilt" style={{ width: size, height: size, "--rz": `${rz}deg` } as any}>
                  <div className="bz-coin-spin" style={{ animationName: `bz-drift-${anim}`, animationDelay: `${d}s`, animationDuration: `${7 + i * 0.7}s` }}>
                    <img src={COIN_PHOTOS[coin]} alt={coin} className="bz-coin-photo" loading="lazy" />
                  </div>
                </div>
              </div>
            );
          })}
          {/* big euro coin render, flat on the surface */}
          <div className="bz-coin-par bz-euro-par" style={{ bottom: "-10%", right: "17%" } as any}>
            <div className="bz-coin-tilt" style={{ width: 340, height: 340, "--rz": "3deg" } as any}>
              <div className="bz-coin-spin" style={{ animationName: "bz-drift-d", animationDelay: "1.7s", animationDuration: "8.5s" }}>
                <img src={coinEur} alt="Euro" className="bz-coin-photo" loading="lazy" />
              </div>
            </div>
          </div>
          <Reveal className="bz-hero-in">
            <h1 className="bz-h1">
              {_t("Your company's")}<br />
              <span className="bz-accent">{_t("strategic asset")}</span> {_t("is crypto")}
            </h1>
            <p className="bz-sub">
              {_t("Book a meeting with our Account Manager and discover tailored solutions for your business.")}
            </p>
            <button className="bz-cta" onClick={() => scrollToForm()} data-testid="business-contact-btn">{_t("Contact us")}</button>
          </Reveal>
          <div className="bz-tp" data-testid="business-trustpilot">
            <p className="bz-tp-head"><Star className="h-3.5 w-3.5" fill="#00b67a" strokeWidth={0} /> Trustpilot</p>
            <div className="bz-tp-stars">
              {[0, 1, 2, 3, 4].map((i) => (
                <span key={i} className="bz-tp-star"><Star className="h-3 w-3" fill="#fff" strokeWidth={0} /></span>
              ))}
            </div>
            <p className="bz-tp-sub">{_t("Rated by our users")}</p>
          </div>
        </section>

        {/* ---------- TRUSTED BY (photo 4) ---------- */}
        <section className="bz-trusted">
          <Reveal><h2 className="bz-h2">{_t("Trusted by")}</h2></Reveal>
          <div className="bz-marquee" data-testid="business-marquee">
            <div className="bz-marquee-track">
              {[...coins, ...coins].map((c, i) => (
                <span key={`${c.id}-${i}`} className="bz-marquee-item">
                  <img src={c.image} alt="" loading="lazy" /> {c.name}
                </span>
              ))}
            </div>
          </div>
          <div className="bz-stats">
            <Reveal className="bz-stat" delay={0}>
              <p className="bz-stat-label">{_t("Empowering success")}</p>
              <p className="bz-stat-num" data-testid="business-stat-clients"><CountUp to={300} suffix="+" /></p>
              <p className="bz-stat-sub">{_t("Business clients")}</p>
            </Reveal>
            <Reveal className="bz-stat" delay={120}>
              <p className="bz-stat-label">{_t("Preferred by professionals")}</p>
              <p className="bz-stat-num" data-testid="business-stat-users"><CountUp to={2} suffix="M+" /></p>
              <p className="bz-stat-sub">{_t("Users")}</p>
            </Reveal>
          </div>
        </section>

        {/* ---------- TREASURY (photo 4 bottom + photo 3) ---------- */}
        <section className="bz-section">
          <Reveal>
            <h2 className="bz-h2">{_t("Diversify your company's treasury with crypto")}</h2>
            <p className="bz-sub">
              {_t("Allocate part of your company's liquidity to digital assets with growth potential, thanks to staking, 24/7 markets and instant liquidity.")}
            </p>
          </Reveal>
          <Reveal className="bz-banner bz-banner-green">
            <div>
              <p className="bz-banner-title">
                {_t("Make crypto a")} <span className="bz-accent">{_t("differentiating asset")}</span> {_t("in your balance sheet.")}
              </p>
              <p className="bz-banner-sub">{_t("Integrate crypto into your financial strategy to optimise capital and unlock new opportunities.")}</p>
            </div>
            <ReportBtn id="business-report-treasury" />
          </Reveal>

          <div className="bz-grid-2">
            <Reveal className="bz-card bz-card-blue">
              <h3>{_t("Move large capital with our")} <span className="bz-accent-green">{_t("OTC Desk")}</span></h3>
              <p>{_t("Reduce trading costs and minimise volatility risks. The OTC service enables efficient and secure management of significant capital.")}</p>
              <div className="bz-otc-art">
                <svg viewBox="0 0 400 230" className="bz-otc-svg" aria-hidden="true">
                  <path d="M 205 22 C 120 22, 82 80, 62 168" stroke="#22c55e" strokeWidth="13" fill="none" strokeLinecap="round" />
                  <path d="M 38 158 L 88 158 L 60 210 Z" fill="#22c55e" transform="rotate(-9 63 184)" />
                  <path d="M 235 208 C 305 192, 335 140, 348 74" stroke="#2f9cf0" strokeWidth="13" fill="none" strokeLinecap="round" />
                  <path d="M 322 76 L 372 76 L 350 22 Z" fill="#2f9cf0" transform="rotate(9 347 52)" />
                </svg>
                <div className="bz-otc-coin2">
                  {coins[0] && <img src={coins[0].image} alt={coins[0].name} />}
                </div>
                <span className="bz-tag bz-tag-up"><ArrowDownUp className="h-3 w-3" /> {_t("Less fee")}</span>
                <span className="bz-tag bz-tag-down"><ArrowDownUp className="h-3 w-3" /> {_t("Less risks")}</span>
              </div>
            </Reveal>
            <Reveal className="bz-card" delay={120}>
              <p className="bz-accent-green bz-card-kicker">{_t("Sub-account")}</p>
              <h3>{_t("Maximum control and flexibility")}</h3>
              <p>{_t("Manage access and functionalities for each company team with Sub-accounts. Organise operations across multiple accounts and optimise reporting while maintaining complete control.")}</p>
              <div className="bz-people-art">
                <div className="bz-person3 bz-p3-big"><PersonGlyph /></div>
                <div className="bz-person3 bz-p3-sm"><PersonGlyph /></div>
                <div className="bz-person3 bz-p3-md"><PersonGlyph /></div>
                <div className="bz-podium3" />
              </div>
            </Reveal>
          </div>

          <div className="bz-grid-2">
            <Reveal className="bz-card bz-card-stake">
              <h3>{_t("Staking: up to 18% APY")}</h3>
              <p>{_t("Turn a passive resource into a productive asset, maximising returns on your crypto reserves. Staking allows you to support network security and earn rewards.")}</p>
              <a href={REPORT_URL} download="Blockscaner-Tesoreria-Aziendale.pdf" className="bz-btn-ghost" data-testid="business-staking-report">{_t("Download the Report")}</a>
              <div className="bz-stake-art">
                <img src={coinEth} alt="" className="bz-plate-img bz-plate-tr" />
                <img src={coinEth} alt="" className="bz-plate-img bz-plate-bl" />
                <div className="bz-phone3">
                  <span className="bz-phone3-back">←</span>
                  <p className="bz-phone3-title">{_t("Staking")}</p>
                  <p className="bz-phone3-sec">{_t("Proof of Stake")} <Info className="h-3.5 w-3.5" /></p>
                  <div className="bz-phone3-row">
                    {coins.find((c) => c.id === "solana") && <img src={coins.find((c) => c.id === "solana")!.image} alt="Solana" />}
                    <b>Solana</b><span className="bz-phone3-bar" />
                  </div>
                  <p className="bz-phone3-sec">{_t("Liquid Staking")} <Info className="h-3.5 w-3.5" /></p>
                  <div className="bz-phone3-row">
                    {coins.find((c) => c.id === "ethereum") && <img src={coins.find((c) => c.id === "ethereum")!.image} alt="Ethereum" />}
                    <b>Ethereum</b><span className="bz-phone3-bar" />
                  </div>
                </div>
                <Seal />
                <FlameArt className="bz-flame-r" />
                <FlameArt className="bz-flame-l" />
              </div>
            </Reveal>
            <Reveal className="bz-card bz-card-green bz-loyalty" delay={120}>
              <h3 className="bz-loyalty-title">{_t("Loyalty Program")}</h3>
              <p className="bz-loyalty-desc">{_t("Join the clubs to buy and sell crypto with reduced fees, enjoy numerous benefits, and earn rewards on every trade.")}</p>
              <Link to="/products" className="bz-loyalty-link" data-testid="business-loyalty-link">{_t("Learn more")}</Link>
              <div className="bz-loyalty-art" aria-hidden="true">
                <div className="bz-hex4 bz-hex4-gold"><HexIcon size={72} /></div>
                <div className="bz-hex4 bz-hex4-blue"><HexIcon size={118} /></div>
                <div className="bz-hex4 bz-hex4-grey"><HexIcon size={66} /></div>
                <div className="bz-hex4 bz-hex4-brown"><HexIcon size={60} /></div>
                <div className="bz-lycoin bz-lycoin-gold"><LoyalCheck color="#b45309" /></div>
                <div className="bz-lycoin bz-lycoin-grey"><LoyalCheck color="#6b7280" /></div>
                <div className="bz-lycoin bz-lycoin-gold2"><LoyalCheck color="#b45309" /></div>
                <div className="bz-lycoin bz-lycoin-blue"><LoyalCheck color="#1e40af" /></div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ---------- PAYMENTS (photo 2) ---------- */}
        <section className="bz-section">
          <Reveal>
            <h2 className="bz-h2">{_t("Manage crypto payments")}</h2>
            <p className="bz-sub">
              {_t("Lower fees than traditional systems, real-time transactions, and the ability to use stablecoins like USDC to ensure value stability.")}
            </p>
          </Reveal>
          <Reveal className="bz-banner bz-banner-blue">
            <div>
              <p className="bz-banner-title">
                {_t("Cut")} <span className="bz-accent">{_t("costs")}</span> {_t("and accelerate")} <span className="bz-accent">{_t("global transactions")}</span> {_t("with crypto.")}
              </p>
              <p className="bz-banner-sub">{_t("Discover a new standard for financial transactions.")}</p>
            </div>
            <ReportBtn id="business-report-payments" url={REPORT_PAYMENTS_URL} name="Blockscaner-Pagamenti-Internazionali.pdf" />
          </Reveal>

          <Reveal className="bz-card bz-settle">
            <div className="bz-settle-copy">
              <p className="bz-card-kicker">{_t("Only Euro")}</p>
              <h3>{_t("Receive crypto, settle in Euro")}</h3>
              <p>{_t("Automatically convert cryptocurrency payments into Euros to eliminate market fluctuation risks. Ensure revenue stability and predictability with a system immune to volatility.")}</p>
              <button className="bz-link" style={{ background: "none", border: 0, padding: 0, cursor: "pointer" }} onClick={() => scrollToForm(_t("Crypto payments"))} data-testid="business-settle-contact">{_t("Talk to us")} <ArrowUpRight className="h-4 w-4" /></button>
            </div>
            <div className="bz-settle-art">
              <div className="bz-flow bz-flow-a">
                <span className="bz-flow-tag">{_t("Send Bitcoin")}</span>
                <div className="bz-coin-static"><div className="bz-coin-face">{coins[0] && <img src={coins[0].image} alt="Bitcoin" />}<span className="bz-glare" /></div></div>
              </div>
              <div className="bz-flow-arrow" />
              <div className="bz-flow bz-flow-b">
                <span className="bz-flow-tag">{_t("Receive Euro")}</span>
                <div className="bz-coin-static"><div className="bz-coin-face bz-face-eur"><span className="bz-eur-sign-sm">€</span><span className="bz-glare" /></div></div>
              </div>
            </div>
          </Reveal>
        </section>

        {/* ---------- TRAINING (photo 1) ---------- */}
        <section className="bz-section">
          <Reveal>
            <h2 className="bz-h2">{_t("Train your team on Crypto and Blockchain")}</h2>
            <p className="bz-sub">{_t("Invest in your company's future with customised e-learning courses for every department.")}</p>
          </Reveal>
          <Reveal className="bz-banner bz-banner-dark">
            <div>
              <p className="bz-banner-title">
                <span className="bz-accent">{_t("Blockchain:")}</span> {_t("the innovation transforming the")} <span className="bz-accent">{_t("job market.")}</span>
              </p>
              <p className="bz-banner-sub">{_t("A technology that is revolutionising industries and career opportunities.")}</p>
            </div>
            <ReportBtn id="business-report-training" url={REPORT_TRAINING_URL} name="Blockscaner-Training-HUB.pdf" />
          </Reveal>

          <div className="bz-grid-2">
            <Reveal className="bz-card bz-card-green">
              <h3><span className="bz-accent">{_t("E-learning")}</span> {_t("courses for your employees")}</h3>
              <div className="bz-video bz-video-yt" data-testid="business-video-card">
                <iframe
                  src="https://www.youtube.com/embed/SSo_EIwHSd4?rel=0"
                  title="What is Blockchain? Blockchain Explained Simply"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  data-testid="business-video-iframe"
                />
              </div>
            </Reveal>
            <Reveal className="bz-card bz-card-purple" delay={120}>
              <h3><span className="bz-accent-2">{_t("Academy")}</span> {_t("for clients")}</h3>
              <p>{_t("A tailor-made programme to train your clients, strengthening their trust in using your services.")}</p>
              <Link to="/blog" className="bz-link" data-testid="business-academy-link">{_t("Discover the Academy")}</Link>
              <div className="bz-academy">
                <div className="bz-academy-win">
                  <div className="bz-academy-dots"><i /><i /><i /></div>
                  <p className="bz-academy-h">{_t("Wyckoff Theory: what it is and how it works")}</p>
                  <div className="bz-academy-line" /><div className="bz-academy-line short" />
                  <div className="bz-academy-thumbs">
                    <span className="bz-th bz-th-video" aria-label="Video course"><VideoThumb /></span>
                    <span className="bz-th bz-th-laptop" aria-label="E-learning"><LaptopThumb /></span>
                    <span className="bz-th bz-th-cert" aria-label="Certificate"><CertThumb /></span>
                  </div>
                </div>
                <div className="bz-cap"><GraduationCap className="h-10 w-10" /></div>
              </div>
            </Reveal>
          </div>

          <div className="bz-grid-3">
            {[
              { icon: Landmark, title: "Finance Workshop", desc: "Integration of blockchain-based assets into corporate finance and treasury processes.", id: "business-workshop-finance" },
              { icon: Code2, title: "IT Workshop", desc: "Implementation of blockchain and DLT infrastructure with your technical team.", id: "business-workshop-it" },
              { icon: Scale, title: "Legal Workshop", desc: "Ensuring business compliance with crypto-asset regulation, MiCA and reporting duties.", id: "business-workshop-legal" },
            ].map((wk, i) => { const I = wk.icon; return (
              <Reveal key={wk.id} className="bz-card bz-workshop" delay={i * 120}>
                <div className="bz-workshop-ico"><I className="h-5 w-5" /></div>
                <h3>{_t(wk.title)}</h3>
                <p>{_t(wk.desc)}</p>
                <button className="bz-link" style={{ background: "none", border: 0, padding: 0, cursor: "pointer" }} onClick={() => scrollToForm(_t("Workshops"))} data-testid={wk.id}>{_t("Request info")} <ArrowUpRight className="h-4 w-4" /></button>
              </Reveal>
            );})}
          </div>
        </section>

        {/* ---------- FEATURES / WHY US ---------- */}
        <section className="bz-section">
          <Reveal>
            <h2 className="bz-h2">{_t("For over six years, we've crafted advanced solutions for your business")}</h2>
            <p className="bz-sub">{_t("With over two million clients in Europe, we are the leading exchange in Italy.")}</p>
          </Reveal>
          <div className="bz-grid-2">
            <Reveal className="bz-card bz-card-dark bz-feature-analytics">
              <p className="bz-card-kicker">{_t("Analytics")}</p>
              <h3>{_t("Monitor your performance")}</h3>
              <p>{_t("Stay on track with performance management and detailed reporting.")}</p>
              <ul className="bz-list">
                <li>{_t("Yield monitoring")}</li>
                <li>{_t("Tax reporting documents")}</li>
                <li>{_t("Risk diversification")}</li>
              </ul>
              <div className="bz-analytics-art" aria-hidden="true">
                <div className="bz-mock-phone">
                  <div className="bz-mock-notch" />
                  <div className="bz-mock-head"><ChevronLeft className="h-3 w-3" /><b>Analytics</b><MoreHorizontal className="h-3 w-3" /></div>
                  <div className="bz-mock-card">
                    <span>{_t("Trade analysis")}</span>
                    <b className="bz-green">+245.84 €</b>
                    <div className="bz-mock-bars"><i /><i /><i /><i /><i /><i /><i /></div>
                  </div>
                  <div className="bz-mock-card bz-mock-card2">
                    <span>{_t("Total return")}</span>
                    <b className="bz-green">+18.36%</b>
                    <div className="bz-mock-line" />
                  </div>
                </div>
                <div className="bz-mock-phone bz-mock-side">
                  <div className="bz-mock-notch" />
                  <div className="bz-mock-head"><b>Crypto allocation</b><PieChart className="h-3 w-3" /></div>
                  <div className="bz-mock-donut" />
                  <div className="bz-mock-legend">
                    <span><i style={{ background: "#3b82f6" }} />Bitcoin</span><b>52.3%</b>
                    <span><i style={{ background: "#22c55e" }} />Ethereum</span><b>28.1%</b>
                    <span><i style={{ background: "#f59e0b" }} />Solana</span><b>19.6%</b>
                  </div>
                </div>
              </div>
            </Reveal>
            <Reveal className="bz-card bz-card-dark bz-feature-vip" delay={120}>
              <p className="bz-card-kicker">{_t("VIP Service")}</p>
              <h3>{_t("Your Account Manager works with you to optimise your strategy and turn your goals into tangible results.")}</h3>
              <div className="bz-vip-art" aria-hidden="true">
                <svg viewBox="0 0 120 120" className="bz-star">
                  <defs><linearGradient id="st1" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#4ade80"/><stop offset="1" stopColor="#16a34a"/></linearGradient></defs>
                  <path d="M60 14 L74 46 L108 48 L82 68 L91 103 L60 83 L29 103 L38 68 L12 48 L46 46 Z" fill="url(#st1)" stroke="#052e16" strokeWidth="2" />
                  <circle cx="60" cy="60" r="10" fill="#052e16" />
                </svg>
                <svg viewBox="0 0 120 120" className="bz-star bz-star2">
                  <defs><linearGradient id="st2" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#bbf7d0"/><stop offset="1" stopColor="#4ade80"/></linearGradient></defs>
                  <path d="M60 14 L74 46 L108 48 L82 68 L91 103 L60 83 L29 103 L38 68 L12 48 L46 46 Z" fill="url(#st2)" stroke="#052e16" strokeWidth="2" />
                  <circle cx="60" cy="60" r="10" fill="#052e16" />
                </svg>
              </div>
            </Reveal>
          </div>
          <div className="bz-grid-2">
            <Reveal className="bz-card bz-card-dark bz-feature-custody">
              <h3>{_t("No.1 custody and security worldwide")}</h3>
              <p>{_t("All client cryptocurrencies are held in full 1:1 reserve. We use advanced security with Fireblocks and multisig cold storage protection for maximum peace of mind.")}</p>
              <div className="bz-custody-art" aria-hidden="true">
                <svg viewBox="0 0 200 140" className="bz-shield">
                  <defs>
                    <linearGradient id="sh1" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#fbbf24"/><stop offset="1" stopColor="#d97706"/></linearGradient>
                    <linearGradient id="sh2" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#f8fafc"/><stop offset="1" stopColor="#94a3b8"/></linearGradient>
                  </defs>
                  <path d="M100 8 L172 34 V76 C172 108 140 132 100 140 C60 132 28 108 28 76 V34 Z" fill="url(#sh2)" stroke="#475569" strokeWidth="3" />
                  <path d="M100 22 L158 43 V76 C158 100 132 120 100 127 C68 120 42 100 42 76 V43 Z" fill="url(#sh1)" />
                  <circle cx="100" cy="76" r="18" fill="#0f172a" />
                  <path d="M94 76 L98 80 L107 70" stroke="#4ade80" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <div className="bz-coin-3d bz-coin-b">B</div>
                <div className="bz-coin-3d bz-coin-e">Ξ</div>
              </div>
            </Reveal>
            <Reveal className="bz-card bz-card-dark bz-feature-tax" delay={120}>
              <h3>{_t("Connect, calculate and declare")}</h3>
              <p>{_t("Connect exchanges and wallets to automatically calculate gains and losses from trading, staking, NFTs, and DeFi. Receive pre-filled tax reports ready for filing with support from our accountants.")}</p>
              <div className="bz-tax-art" aria-hidden="true">
                <div className="bz-tax-doc">
                  <div className="bz-tax-head">Tax Report</div>
                  <div className="bz-tax-line" /><div className="bz-tax-line s" /><div className="bz-tax-line" /><div className="bz-tax-line s" />
                  <div className="bz-tax-total"><span>{_t("Total gains")}</span><b>+4,281.00 €</b></div>
                </div>
                <div className="bz-tax-calc">
                  <div className="bz-tax-disp">245.84</div>
                  <div className="bz-tax-btns"><i /><i /><i /><i /><i /><i /></div>
                </div>
                <div className="bz-tax-badge"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M5 13 l4 4 L19 7" strokeLinecap="round" strokeLinejoin="round"/></svg></div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ---------- CERTIFICATIONS ---------- */}
        <section className="bz-section bz-certs bz-section-white">
          <Reveal>
            <h2 className="bz-h2 bz-h2-dark">{_t("Our certifications")}</h2>
            <p className="bz-sub bz-sub-dark">{_t("Our operations are recognized by regulatory authorities and comply with European regulations.")}</p>
          </Reveal>
          <div className="bz-grid-3">
            <Reveal className="bz-card bz-card-light">
              <span className="bz-badge bz-badge-green">{_t("Certified")}</span>
              <h3>Registro Operatori<br />Valute Virtuali (PSV1)</h3>
              <p className="bz-cert-meta">Organismo Agenti e Mediatori<br /><a href="https://www.organismo-am.it" target="_blank" rel="noreferrer">www.organismo-am.it</a></p>
            </Reveal>
            <Reveal className="bz-card bz-card-light" delay={80}>
              <span className="bz-badge bz-badge-green">{_t("Authorised")}</span>
              <h3>Prestataire de<br />Services sur Actifs Numériques</h3>
              <p className="bz-cert-meta">Autorité des Marchés Financiers<br /><a href="https://www.amf-france.org" target="_blank" rel="noreferrer">www.amf-france.org</a></p>
            </Reveal>
            <Reveal className="bz-card bz-card-light" delay={160}>
              <span className="bz-badge bz-badge-green">{_t("Authorized CASPs")}</span>
              <h3>Markets in Crypto-<br />Assets Regulation</h3>
              <p className="bz-cert-meta">MiCA - Regulation (UE) 2023/1114<br /><a href="https://eur-lex.europa.eu" target="_blank" rel="noreferrer">www.eur-lex.europa.eu</a></p>
            </Reveal>
          </div>
        </section>

        {/* ---------- PARTNERS ---------- */}
        <section className="bz-section bz-partners bz-section-white">
          <Reveal>
            <h2 className="bz-h2 bz-h2-dark">{_t("Meet our partners")}</h2>
            <p className="bz-sub bz-sub-dark">{_t("Blockscaner has formed solid partnerships with banks, leading global providers, and institutional investors in the cap table, ensuring the highest level of reliability and security for you.")}</p>
          </Reveal>
          <div className="bz-partners-wrap">
            <div className="bz-partners-row" data-testid="business-partners-row">
              {["United Ventures", "Arkes", "Azimut", "Chainalysis", "checkout.com", "United Ventures", "Arkes", "Azimut", "Chainalysis", "checkout.com"].map((name, i) => (
                <span key={i} className="bz-partner">{name}</span>
              ))}
            </div>
          </div>
          <div className="bz-partners-wrap">
            <div className="bz-partners-row bz-partners-rev">
              {["Fireblocks", "Ithaca", "Onfido", "Sella", "Digitech", "Fireblocks", "Ithaca", "Onfido", "Sella", "Digitech"].map((name, i) => (
                <span key={i} className="bz-partner">{name}</span>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- FINAL CTA + ENQUIRY FORM ---------- */}
        <Reveal className="bz-final" id="business-contact">
          <h2 className="bz-h2">{_t("Ready to make crypto work for your business?")}</h2>
          <p className="bz-sub">{_t("Book a meeting with our Account Manager and discover tailored solutions for your company.")}</p>
          <BizContactForm />
        </Reveal>
      </div>
    </SiteLayout>
  );
}
