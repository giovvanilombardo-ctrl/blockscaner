import SiteLayout from "@/components/site/SiteLayout";
import Seo from "@/components/Seo";
import { t as _t } from "@/i18n";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

/* RWA hero artwork — premium dark vault scene */
const ArtRWA = (
  <svg viewBox="0 0 340 210" preserveAspectRatio="xMidYMid slice">
    <defs>
      <radialGradient id="rwaBg" cx="50%" cy="30%" r="80%">
        <stop offset="0" stopColor="#2a1e3f"/><stop offset="1" stopColor="#0d0b16"/>
      </radialGradient>
      <linearGradient id="rwaGlobe" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#c9b8ff"/><stop offset=".5" stopColor="#8b5cf6"/><stop offset="1" stopColor="#5b21b6"/>
      </linearGradient>
      <linearGradient id="rwaPed" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#3a2d5c"/><stop offset="1" stopColor="#17122a"/>
      </linearGradient>
      <linearGradient id="rwaGold" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stopColor="#f5d98a"/><stop offset=".5" stopColor="#e8b94a"/><stop offset="1" stopColor="#c9932a"/>
      </linearGradient>
      <linearGradient id="rwaRing" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stopColor="#c9b8ff" stopOpacity=".1"/><stop offset=".5" stopColor="#c9b8ff" stopOpacity=".85"/><stop offset="1" stopColor="#c9b8ff" stopOpacity=".1"/>
      </linearGradient>
    </defs>
    <rect width="340" height="210" fill="url(#rwaBg)"/>
    {/* ambient glow */}
    <ellipse cx="170" cy="96" rx="120" ry="80" fill="#8b5cf6" opacity=".12"/>
    {/* floor reflection */}
    <ellipse cx="170" cy="186" rx="110" ry="14" fill="#8b5cf6" opacity=".1"/>
    {/* light beams */}
    <g fill="#c9b8ff" opacity=".05">
      <path d="M80 0 L150 210 L60 210 Z"/>
      <path d="M260 0 L190 210 L280 210 Z"/>
    </g>
    {/* sparkle particles */}
    <g fill="#c9b8ff">
      <circle cx="60" cy="44" r="1.6" opacity=".8"/><circle cx="286" cy="40" r="1.4" opacity=".7"/>
      <circle cx="44" cy="120" r="1.3" opacity=".6"/><circle cx="300" cy="118" r="1.5" opacity=".7"/>
      <circle cx="120" cy="26" r="1.2" opacity=".5"/><circle cx="222" cy="24" r="1.3" opacity=".55"/>
    </g>
    {/* orbit rings */}
    <ellipse cx="170" cy="92" rx="104" ry="30" fill="none" stroke="url(#rwaRing)" strokeWidth="1.2" transform="rotate(-16 170 92)"/>
    <ellipse cx="170" cy="92" rx="118" ry="36" fill="none" stroke="url(#rwaRing)" strokeWidth=".9" opacity=".6" transform="rotate(-16 170 92)"/>
    {/* globe */}
    <circle cx="170" cy="88" r="48" fill="url(#rwaGlobe)"/>
    <circle cx="170" cy="88" r="48" fill="none" stroke="#e9d5ff" strokeWidth="1" opacity=".6"/>
    {/* globe wireframe */}
    <g stroke="#e9d5ff" strokeWidth="1" fill="none" opacity=".65">
      <ellipse cx="170" cy="88" rx="48" ry="15"/>
      <ellipse cx="170" cy="88" rx="48" ry="30"/>
      <ellipse cx="170" cy="88" rx="48" ry="42"/>
      <ellipse cx="170" cy="88" rx="13" ry="48"/>
      <ellipse cx="170" cy="88" rx="28" ry="48"/>
      <ellipse cx="170" cy="88" rx="40" ry="48"/>
    </g>
    {/* globe sheen */}
    <ellipse cx="152" cy="68" rx="20" ry="12" fill="#fff" opacity=".14" transform="rotate(-22 152 68)"/>
    {/* RWA label */}
    <rect x="141" y="74" width="58" height="28" rx="14" fill="#0d0b16" stroke="url(#rwaGold)" strokeWidth="1.6"/>
    <text x="170" y="93" fontSize="15" fontWeight="800" textAnchor="middle" fill="#f5d98a" letterSpacing="1.5">RWA</text>
    {/* house chip */}
    <g transform="rotate(-14 104 98)">
      <ellipse cx="104" cy="98" rx="21" ry="27" fill="#17122a" stroke="#c9b8ff" strokeWidth="1.4"/>
      <path d="M95 100 L104 91 L113 100 M97 98 v9 h14 v-9" fill="none" stroke="#f5d98a" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
    </g>
    {/* car chip */}
    <circle cx="238" cy="70" r="21" fill="#17122a" stroke="#c9b8ff" strokeWidth="1.4"/>
    <path d="M228 72 h20 l-3 -8 h-14 Z M228 72 v6 h20 v-6" fill="none" stroke="#f5d98a" strokeWidth="2" strokeLinejoin="round"/>
    <circle cx="232" cy="79" r="1.9" fill="#f5d98a"/><circle cx="244" cy="79" r="1.9" fill="#f5d98a"/>
    {/* pedestal */}
    <path d="M128 150 h84 l8 30 a76 16 0 0 1 -100 0 Z" fill="url(#rwaPed)"/>
    <ellipse cx="170" cy="150" rx="42" ry="12" fill="#241b3e" stroke="#c9b8ff" strokeWidth="1" opacity=".9"/>
    <ellipse cx="170" cy="182" rx="84" ry="16" fill="none" stroke="#c9b8ff" strokeWidth="1" opacity=".4"/>
    {/* gold base line */}
    <path d="M96 196 h148" stroke="url(#rwaGold)" strokeWidth="1.4" opacity=".7"/>
  </svg>
);

function Badge({ children }: { children: React.ReactNode }) {
  return <span className="ac-badge"><i />{children}</span>;
}
function Tag({ children }: { children: React.ReactNode }) {
  return <span className="ac-tag">{children}</span>;
}

const ShareIcon = ({ d }: { d: string }) => (
  <svg viewBox="0 0 24 24" width="18" height="18"><path d={d} fill="#0f0f12"/></svg>
);

export default function AcademyRWA() {
  return (
    <SiteLayout>
      <Seo title="RWA: what they are and how they work — Blockscaner Academy" description="Real World Assets (RWA): the new revolution in the global financial system." />
      <div className="ac-article" data-testid="academy-article-rwa">

        {/* header row */}
        <div className="ac-article-top">
          <Link to="/products/academy" className="ac-back" aria-label="Back to Academy"><ArrowLeft size={18} /></Link>
          <Tag>DeFi</Tag>
        </div>

        <div className="ac-article-head">
          <h1>{_t("RWA: what they are")}<br />{_t("and how they work")}</h1>
          <div className="ac-share">
            <span className="ac-share-ic" aria-label="Share on X"><ShareIcon d="M18.9 2H22l-6.8 7.8L23 22h-6.3l-4.9-6.4L6.2 22H3l7.3-8.3L1.5 2h6.4l4.4 5.9L18.9 2zm-1.1 18h1.7L7.1 3.9H5.3L17.8 20z"/></span>
            <span className="ac-share-ic" aria-label="Share on Facebook"><ShareIcon d="M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.4h-1.2c-1.2 0-1.6.8-1.6 1.6V12h2.7l-.4 2.9h-2.3v7A10 10 0 0 0 22 12z"/></span>
            <span className="ac-share-ic" aria-label="Share on LinkedIn"><ShareIcon d="M20.4 20.4h-3.5v-5.6c0-1.3 0-3-1.9-3s-2.1 1.4-2.1 2.9v5.7H9.4V9h3.4v1.6h.1c.5-.9 1.7-1.9 3.4-1.9 3.6 0 4.3 2.4 4.3 5.5v6.2zM5.3 7.4a2 2 0 1 1 0-4.1 2 2 0 0 1 0 4.1zM7.1 20.4H3.6V9h3.5v11.4z"/></span>
          </div>
        </div>
        <p className="ac-meta">February 6, 2026&nbsp;&nbsp;•&nbsp;&nbsp;11 min</p>

        {/* hero image */}
        <div className="ac-article-thumb">
          <Badge>Beginner</Badge>
          {ArtRWA}
        </div>

        {/* You will learn */}
        <div className="ac-learn">
          <h2>{_t("You will learn")}</h2>
          <ul>
            <li><a href="#rwa-revolution">{_t("Real World Assets (RWA): the new revolution in the global financial system")}</a></li>
            <li><a href="#rwa-technically">{_t("What are RWAs technically?")}</a></li>
            <li><a href="#rwa-tokenisation">{_t("How the tokenisation process works")}</a></li>
            <li><a href="#rwa-fleap">{_t("A practical example: the Fleap case")}</a></li>
            <li><a href="#rwa-conclusions">{_t("Conclusions")}</a></li>
          </ul>
        </div>

      </div>
    </SiteLayout>
  );
}
