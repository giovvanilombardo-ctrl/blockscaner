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
        <linearGradient id="ecoEasyBg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2ee58a"/><stop offset="1" stopColor="#14c96e"/>
        </linearGradient>
      </defs>
      <rect width="320" height="260" fill="url(#ecoEasyBg)"/>
      {/* phone */}
      <rect x="96" y="20" width="128" height="240" rx="18" fill="#fff" stroke="#0d0d12" strokeWidth="3"/>
      <text x="108" y="42" fontSize="10" fill="#0f0f12">10:58</text>
      <g fill="#0f0f12"><rect x="196" y="36" width="8" height="6" rx="1"/><rect x="208" y="34" width="10" height="8" rx="2"/></g>
      {/* Home */}
      <text x="108" y="66" fontSize="13" fontWeight="800" fill="#0f0f12">Home</text>
      <circle cx="196" cy="62" r="5" fill="none" stroke="#0f0f12" strokeWidth="1.4"/>
      <circle cx="210" cy="62" r="5" fill="none" stroke="#0f0f12" strokeWidth="1.4"/>
      {/* balance */}
      <text x="108" y="90" fontSize="18" fontWeight="800" fill="#0f0f12">262.48 €</text>
      <text x="108" y="104" fontSize="7.5" fill="#8b8b93">Total Balance</text>
      <rect x="196" y="84" width="18" height="12" rx="6" fill="#2ee58a"/>
      <text x="205" y="93" fontSize="6" textAnchor="middle" fill="#0d0d12">+2.4%</text>
      {/* analytics */}
      <text x="108" y="128" fontSize="10" fontWeight="800" fill="#0f0f12">Analytics</text>
      <rect x="108" y="138" width="96" height="1.5" fill="#eeeef3"/>
      {/* mini chart */}
      <path d="M110 160 L118 154 L126 158 L134 148 L142 152 L150 144 L158 148 L166 140 L174 144 L182 138 L190 142 L198 136" stroke="#2ee58a" strokeWidth="2.4" fill="none" strokeLinecap="round"/>
      <text x="108" y="176" fontSize="7.5" fill="#8b8b93">Profit & Loss</text>
      <text x="108" y="186" fontSize="8.5" fontWeight="800" fill="#16a34a">+3.85 €</text>
      <text x="108" y="196" fontSize="7" fill="#8b8b93">24h</text>
      {/* stats */}
      <text x="150" y="176" fontSize="7.5" fill="#8b8b93">Statistics</text>
      <text x="150" y="186" fontSize="6.5" fill="#57575c">Manage your crypto wallet better</text>
      <g fill="#0f0f12">
        <circle cx="154" cy="200" r="2.4"/><circle cx="162" cy="200" r="2.4"/><circle cx="170" cy="200" r="2.4"/>
      </g>
    </svg>
  );
}

function PhonePro() {
  return (
    <svg viewBox="0 0 320 260" preserveAspectRatio="xMidYMid slice" className="eco-phone">
      <defs>
        <linearGradient id="ecoProBg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1a1a24"/><stop offset="1" stopColor="#0d0d12"/>
        </linearGradient>
      </defs>
      <rect width="320" height="260" fill="url(#ecoProBg)"/>
      {/* desktop window */}
      <rect x="20" y="24" width="280" height="212" rx="10" fill="#14141a" stroke="#26262e" strokeWidth="1.5"/>
      {/* top bar */}
      <rect x="20" y="24" width="280" height="20" rx="10" fill="#1c1c24"/>
      <g fill="#8b8b93"><circle cx="30" cy="34" r="2.4"/><circle cx="38" cy="34" r="2.4"/><circle cx="46" cy="34" r="2.4"/></g>
      {/* chart area */}
      <rect x="30" y="52" width="170" height="130" rx="6" fill="#0d0d12"/>
      <path d="M34 170 L44 162 L54 166 L64 156 L74 160 L84 150 L94 154 L104 144 L114 148 L124 138 L134 142 L144 132 L154 136 L164 126 L174 130 L184 120 L192 124" stroke="#2ee58a" strokeWidth="2" fill="none" strokeLinecap="round"/>
      <g fill="#2ee58a">
        <rect x="44" y="120" width="4" height="10" rx="1"/><rect x="58" y="130" width="4" height="14" rx="1"/>
        <rect x="72" y="112" width="4" height="12" rx="1"/><rect x="86" y="122" width="4" height="16" rx="1"/>
        <rect x="100" y="106" width="4" height="10" rx="1"/><rect x="114" y="116" width="4" height="14" rx="1"/>
        <rect x="128" y="100" width="4" height="12" rx="1"/><rect x="142" y="110" width="4" height="16" rx="1"/>
        <rect x="156" y="96" width="4" height="10" rx="1"/><rect x="170" y="106" width="4" height="14" rx="1"/>
      </g>
      {/* right panel */}
      <rect x="210" y="52" width="80" height="130" rx="6" fill="#0d0d12"/>
      <g fontSize="6" fill="#8b8b93">
        <text x="216" y="66">BTC/USD</text>
        <text x="216" y="78" fill="#e8e8ec" fontWeight="800">26,482.4</text>
        <text x="216" y="92">ETH/USD</text>
        <text x="216" y="104" fill="#e8e8ec" fontWeight="800">1,842.6</text>
        <text x="216" y="118">SOL/USD</text>
        <text x="216" y="130" fill="#e8e8ec" fontWeight="800">24.18</text>
      </g>
      <g>
        <rect x="216" y="140" width="66" height="8" rx="2" fill="#2ee58a" opacity=".8"/>
        <rect x="216" y="152" width="66" height="8" rx="2" fill="#e11d48" opacity=".8"/>
        <rect x="216" y="164" width="66" height="8" rx="2" fill="#2ee58a" opacity=".6"/>
      </g>
      {/* bottom bar */}
      <rect x="30" y="192" width="260" height="32" rx="6" fill="#1c1c24"/>
      <rect x="38" y="200" width="60" height="16" rx="4" fill="#2ee58a"/>
      <text x="68" y="211" fontSize="7" textAnchor="middle" fill="#0d0d12" fontWeight="800">Buy</text>
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
