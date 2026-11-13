import SiteLayout from "@/components/site/SiteLayout";
import Seo from "@/components/Seo";
import { t as _t } from "@/i18n";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

function BlockscanerLogo() {
  return (
    <span className="eco-logo">
      <svg viewBox="0 0 24 24" width="22" height="22"><rect x="3" y="3" width="18" height="18" rx="4" fill="none" stroke="#0f0f12" strokeWidth="1.6"/><path d="M8 8h6a3 3 0 0 1 0 6H8zM8 14h7a3 3 0 0 1 0 6H8z" fill="none" stroke="#0f0f12" strokeWidth="1.6"/><circle cx="17.5" cy="6.5" r="1.3" fill="#1663d9"/></svg>
      blockscaner
    </span>
  );
}

function PhoneEasy() {
  return (
    <svg viewBox="0 0 320 260" preserveAspectRatio="xMidYMid slice" className="eco-phone">
      <defs>
        <linearGradient id="ecoEasyBg2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2ee58a"/><stop offset="1" stopColor="#0db85f"/>
        </linearGradient>
        <linearGradient id="ecoEasyPhone" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff"/><stop offset="1" stopColor="#f2f2f5"/>
        </linearGradient>
      </defs>
      <rect width="320" height="260" fill="url(#ecoEasyBg2)"/>
      {/* soft glow behind phone */}
      <ellipse cx="160" cy="140" rx="90" ry="120" fill="#fff" opacity=".12"/>
      {/* phone body */}
      <rect x="94" y="14" width="132" height="252" rx="20" fill="#0d0d12"/>
      <rect x="98" y="18" width="124" height="244" rx="16" fill="url(#ecoEasyPhone)"/>
      {/* notch */}
      <rect x="136" y="18" width="48" height="8" rx="4" fill="#0d0d12"/>
      {/* status bar */}
      <text x="104" y="36" fontSize="9" fontWeight="700" fill="#0f0f12">10:58</text>
      <g fill="#0f0f12">
        <path d="M196 30 h1.6 v5 h-1.6 Z M199 29 h1.6 v6 h-1.6 Z M202 28 h1.6 v7 h-1.6 Z M205 27 h1.6 v8 h-1.6 Z"/>
        <rect x="210" y="27" width="9" height="7" rx="1.6" fill="none" stroke="#0f0f12" strokeWidth="1"/>
        <rect x="212" y="29" width="5" height="3" rx=".8" fill="#0f0f12"/>
      </g>
      {/* header */}
      <text x="104" y="58" fontSize="13" fontWeight="800" fill="#0f0f12">Home</text>
      <circle cx="196" cy="54" r="5" fill="none" stroke="#0f0f12" strokeWidth="1.4"/>
      <circle cx="196" cy="54" r="1.6" fill="#0f0f12"/>
      <circle cx="210" cy="54" r="5" fill="none" stroke="#0f0f12" strokeWidth="1.4"/>
      <circle cx="210" cy="51" r="1" fill="#e11d48"/>
      {/* balance */}
      <text x="104" y="80" fontSize="8" fill="#8b8b93">Total Balance</text>
      <text x="104" y="96" fontSize="19" fontWeight="800" fill="#0f0f12">262.48 €</text>
      <rect x="180" y="84" width="34" height="13" rx="6.5" fill="#e6f9ef"/>
      <text x="197" y="93.5" fontSize="7" textAnchor="middle" fill="#16a34a" fontWeight="800">+2.4%</text>
      {/* chart card */}
      <rect x="104" y="106" width="112" height="52" rx="10" fill="#fff" stroke="#eeeef3" strokeWidth="1"/>
      <text x="110" y="118" fontSize="7" fill="#8b8b93">Analytics</text>
      <path d="M108 148 L116 142 L124 146 L132 136 L140 140 L148 130 L156 134 L164 126 L172 130 L180 122 L188 126 L196 118 L204 122" stroke="#2ee58a" strokeWidth="2.2" fill="none" strokeLinecap="round"/>
      <path d="M108 148 L116 142 L124 146 L132 136 L140 140 L148 130 L156 134 L164 126 L172 130 L180 122 L188 126 L196 118 L204 122 L204 154 L108 154 Z" fill="#2ee58a" opacity=".08"/>
      {/* profit */}
      <text x="110" y="168" fontSize="6.5" fill="#8b8b93">Profit & Loss</text>
      <text x="110" y="177" fontSize="8" fontWeight="800" fill="#16a34a">+3.85 €</text>
      {/* holdings */}
      <text x="104" y="196" fontSize="9" fontWeight="800" fill="#0f0f12">My holdings</text>
      <text x="216" y="196" fontSize="6.5" textAnchor="end" fill="#8b8b93">See all</text>
      {/* coin rows */}
      <g fontSize="8">
        <circle cx="112" cy="210" r="8" fill="#f7931a"/>
        <text x="112" y="213" fontSize="9" fontWeight="800" textAnchor="middle" fill="#fff">₿</text>
        <text x="124" y="208" fontWeight="800" fill="#0f0f12">Bitcoin</text>
        <text x="124" y="217" fontSize="6.5" fill="#8b8b93">0.0042 BTC</text>
        <text x="216" y="208" fontSize="8" fontWeight="800" textAnchor="end" fill="#0f0f12">112.30 €</text>
        <text x="216" y="217" fontSize="6.5" textAnchor="end" fill="#16a34a">+1.8%</text>
        <circle cx="112" cy="234" r="8" fill="#627eea"/>
        <path d="M112 228 l5 7 -5 7 -5 -7 Z" fill="#fff"/>
        <text x="124" y="232" fontWeight="800" fill="#0f0f12">Ethereum</text>
        <text x="124" y="241" fontSize="6.5" fill="#8b8b93">0.08 ETH</text>
        <text x="216" y="232" fontSize="8" fontWeight="800" textAnchor="end" fill="#0f0f12">150.18 €</text>
        <text x="216" y="241" fontSize="6.5" textAnchor="end" fill="#e11d48">-0.6%</text>
      </g>
      {/* bottom nav */}
      <rect x="98" y="246" width="124" height="16" rx="0" fill="#fff"/>
      <g fill="#8b8b93">
        <circle cx="116" cy="254" r="2.6"/>
        <rect x="140" y="251" width="5" height="5" rx="1"/>
        <circle cx="164" cy="254" r="2.6"/>
        <rect x="184" y="251" width="5" height="5" rx="1"/>
        <circle cx="206" cy="254" r="2.6"/>
      </g>
      <circle cx="116" cy="254" r="4" fill="none" stroke="#14c96e" strokeWidth="1.4"/>
    </svg>
  );
}

function PhonePro() {
  /* candles: [x, openY, closeY, highY, lowY] */
  const candles = [
    [34, 150, 138, 134, 156], [46, 138, 128, 122, 144], [58, 128, 138, 124, 144],
    [70, 138, 122, 116, 144], [82, 122, 132, 118, 138], [94, 132, 118, 112, 138],
    [106, 118, 108, 102, 124], [118, 108, 118, 104, 124], [130, 118, 102, 96, 124],
    [142, 102, 112, 96, 118], [154, 112, 98, 90, 118], [166, 98, 88, 82, 104],
    [178, 88, 98, 84, 104], [190, 98, 84, 78, 104],
  ];
  return (
    <svg viewBox="0 0 320 260" preserveAspectRatio="xMidYMid slice" className="eco-phone">
      <defs>
        <linearGradient id="ecoProBg2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#14141c"/><stop offset="1" stopColor="#0a0a10"/>
        </linearGradient>
      </defs>
      <rect width="320" height="260" fill="url(#ecoProBg2)"/>
      {/* window */}
      <rect x="10" y="10" width="300" height="240" rx="8" fill="#101016" stroke="#22222c" strokeWidth="1"/>
      {/* title bar */}
      <rect x="10" y="10" width="300" height="18" rx="8" fill="#181820"/>
      <g fill="#5b5b66"><circle cx="19" cy="19" r="2"/><circle cx="26" cy="19" r="2"/><circle cx="33" cy="19" r="2"/></g>
      <text x="160" y="22" fontSize="6" textAnchor="middle" fill="#8b8b93">BTC/EUR — Blockscaner Pro</text>
      {/* pair tabs */}
      <g fontSize="5.5">
        <rect x="16" y="32" width="42" height="12" rx="3" fill="#1e1e28"/>
        <text x="37" y="40" textAnchor="middle" fill="#e8e8ec" fontWeight="700">BTC/EUR</text>
        <rect x="62" y="32" width="42" height="12" rx="3" fill="#16161e"/>
        <text x="83" y="40" textAnchor="middle" fill="#8b8b93">ETH/EUR</text>
        <rect x="108" y="32" width="42" height="12" rx="3" fill="#16161e"/>
        <text x="129" y="40" textAnchor="middle" fill="#8b8b93">SOL/EUR</text>
      </g>
      {/* price header */}
      <text x="16" y="58" fontSize="11" fontWeight="800" fill="#2ee58a">26,482.40</text>
      <text x="78" y="58" fontSize="6" fill="#2ee58a">+1.24%</text>
      <text x="16" y="66" fontSize="5" fill="#8b8b93">24h High 26,780.10</text>
      <text x="90" y="66" fontSize="5" fill="#8b8b93">24h Low 25,940.00</text>
      {/* grid */}
      <g stroke="#1c1c26" strokeWidth=".6">
        <line x1="16" y1="76" x2="206" y2="76"/><line x1="16" y1="106" x2="206" y2="106"/>
        <line x1="16" y1="136" x2="206" y2="136"/><line x1="16" y1="166" x2="206" y2="166"/>
      </g>
      {/* candles */}
      {candles.map(([x, o, c, h, l], i) => {
        const up = c < o;
        const col = up ? "#2ee58a" : "#e11d48";
        const top = Math.min(o, c);
        const hgt = Math.max(Math.abs(o - c), 2);
        return (
          <g key={i}>
            <line x1={x + 3} y1={h} x2={x + 3} y2={l} stroke={col} strokeWidth="1"/>
            <rect x={x} y={top} width="6" height={hgt} fill={col} rx="1"/>
          </g>
        );
      })}
      {/* MA line */}
      <path d="M20 150 L36 142 L52 136 L68 130 L84 126 L100 120 L116 116 L132 110 L148 106 L164 100 L180 96 L196 92" stroke="#f5c518" strokeWidth="1.2" fill="none" opacity=".7"/>
      {/* volume bars */}
      <g>
        {candles.map(([x, o, c], i) => {
          const up = c < o;
          return <rect key={i} x={x} y={176 - (i % 4) * 3} width="6" height={8 + (i % 4) * 3} fill={up ? "#2ee58a" : "#e11d48"} opacity=".35" rx="1"/>;
        })}
      </g>
      {/* right order book */}
      <rect x="214" y="52" width="90" height="130" rx="4" fill="#0c0c12"/>
      <text x="220" y="62" fontSize="5.5" fill="#8b8b93">Order Book</text>
      {[0,1,2,3,4].map(i => (
        <g key={`a${i}`}>
          <rect x="218" y={68 + i * 9} width={60 - i * 8} height="7" rx="1" fill="#e11d48" opacity=".22"/>
          <text x="220" y={73.5 + i * 9} fontSize="4.5" fill="#e11d48">26,49{i}.2</text>
          <text x="296" y={73.5 + i * 9} fontSize="4.5" fill="#8b8b93" textAnchor="end">0.{4 + i}2</text>
        </g>
      ))}
      <rect x="214" y="114" width="90" height="10" fill="#16161e"/>
      <text x="259" y="121.5" fontSize="6" textAnchor="middle" fill="#2ee58a" fontWeight="800">26,482.40</text>
      {[0,1,2,3,4].map(i => (
        <g key={`b${i}`}>
          <rect x={218 + i * 6} y={130 + i * 9} width={60 - i * 8} height="7" rx="1" fill="#2ee58a" opacity=".22"/>
          <text x="220" y={135.5 + i * 9} fontSize="4.5" fill="#2ee58a">26,47{8 - i}.1</text>
          <text x="296" y={135.5 + i * 9} fontSize="4.5" fill="#8b8b93" textAnchor="end">0.{6 + i}8</text>
        </g>
      ))}
      {/* bottom buy/sell */}
      <rect x="16" y="192" width="136" height="52" rx="5" fill="#0c0c12"/>
      <text x="22" y="204" fontSize="5.5" fill="#8b8b93">Amount (BTC)</text>
      <rect x="22" y="208" width="84" height="14" rx="3" fill="#16161e"/>
      <text x="26" y="217.5" fontSize="6" fill="#e8e8ec">0.0421</text>
      <rect x="22" y="228" width="124" height="12" rx="4" fill="#2ee58a"/>
      <text x="84" y="236.5" fontSize="6.5" textAnchor="middle" fill="#0d0d12" fontWeight="800">Buy BTC</text>
      <rect x="160" y="192" width="144" height="52" rx="5" fill="#0c0c12"/>
      <text x="166" y="204" fontSize="5.5" fill="#8b8b93">Total (EUR)</text>
      <rect x="166" y="208" width="88" height="14" rx="3" fill="#16161e"/>
      <text x="170" y="217.5" fontSize="6" fill="#e8e8ec">1,114.91</text>
      <rect x="166" y="228" width="124" height="12" rx="4" fill="#e11d48"/>
      <text x="228" y="236.5" fontSize="6.5" textAnchor="middle" fill="#fff" fontWeight="800">Sell BTC</text>
    </svg>
  );
}

export default function Ecosystem() {
  return (
    <SiteLayout>
      <Seo title="Our Products — Blockscaner" description="We make crypto-assets simple and accessible to everyone." />
      <div className="eco-page" data-testid="ecosystem-page">

        {/* breadcrumb */}
        <p className="ac-crumb">
          <Link to="/">Home</Link>
          <span>›</span>
          <b>Our products</b>
        </p>

        {/* header */}
        <header className="eco-head">
          <h1>{_t("Our Products")}</h1>
          <p>{_t("We make crypto-assets simple and accessible to everyone")}</p>
          <a className="eco-cta" href="/products" onClick={(e) => e.preventDefault()}>
            {_t("Get started on Blockscaner")} <ArrowRight size={16} />
          </a>
        </header>

        {/* one account */}
        <section className="eco-one">
          <h2>{_t("One account for both platforms")}</h2>
          <div className="eco-grid">
            <article className="eco-card eco-card-light" data-testid="eco-easy-card">
              <BlockscanerLogo />
              <h3>{_t("Crypto Made Easy")}</h3>
              <p>{_t("Start buying and selling crypto-assets on a simple, intuitive platform designed to guide you step by step.")}</p>
              <a className="eco-btn" href="/products" onClick={(e) => e.preventDefault()}>{_t("Discover more")}</a>
              <div className="eco-art"><PhoneEasy /></div>
            </article>
            <article className="eco-card eco-card-dark" data-testid="eco-pro-card">
              <BlockscanerLogo />
              <h3>{_t("Crypto Made Pro")}</h3>
              <p>{_t("Advanced platform for buying and selling crypto-assets, featuring charting tools and conditional orders.")}</p>
              <a className="eco-btn" href="/products" onClick={(e) => e.preventDefault()}>{_t("Discover more")}</a>
              <div className="eco-art"><PhonePro /></div>
            </article>
          </div>
        </section>

      </div>
    </SiteLayout>
  );
}
