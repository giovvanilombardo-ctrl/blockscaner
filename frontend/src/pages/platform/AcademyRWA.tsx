import SiteLayout from "@/components/site/SiteLayout";
import Seo from "@/components/Seo";
import { t as _t } from "@/i18n";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

/* RWA hero artwork — wireframe globe on pedestal with house/car chips */
const ArtRWA = (
  <svg viewBox="0 0 340 210" preserveAspectRatio="xMidYMid slice">
    <rect width="340" height="210" fill="#ff5f7a"/>
    {/* diagonal side lines */}
    <g stroke="#0d0d12" strokeWidth="3" fill="none">
      <path d="M60 0 L120 210"/><path d="M280 0 L220 210"/>
    </g>
    {/* side black ovals */}
    <ellipse cx="66" cy="120" rx="34" ry="18" fill="#0d0d12" transform="rotate(24 66 120)"/>
    <ellipse cx="274" cy="112" rx="34" ry="18" fill="#0d0d12" transform="rotate(-24 274 112)"/>
    {/* pedestal */}
    <ellipse cx="170" cy="168" rx="66" ry="20" fill="#fff" stroke="#0d0d12" strokeWidth="3.5"/>
    <path d="M104 168 v14 a66 20 0 0 0 132 0 v-14" fill="#0d0d12"/>
    <ellipse cx="170" cy="150" rx="40" ry="12" fill="#fff" stroke="#0d0d12" strokeWidth="3"/>
    <path d="M130 150 v10 a40 12 0 0 0 80 0 v-10" fill="#0d0d12"/>
    {/* wireframe globe */}
    <circle cx="170" cy="92" r="46" fill="#ff5f7a" stroke="#0d0d12" strokeWidth="3.5"/>
    <g stroke="#0d0d12" strokeWidth="1.6" fill="none">
      <ellipse cx="170" cy="92" rx="46" ry="14"/>
      <ellipse cx="170" cy="92" rx="46" ry="28"/>
      <ellipse cx="170" cy="92" rx="46" ry="40"/>
      <ellipse cx="170" cy="92" rx="12" ry="46"/>
      <ellipse cx="170" cy="92" rx="26" ry="46"/>
      <ellipse cx="170" cy="92" rx="38" ry="46"/>
      <path d="M124 92 h92"/>
    </g>
    {/* RWA label */}
    <rect x="142" y="78" width="56" height="28" rx="14" fill="#fff" stroke="#0d0d12" strokeWidth="2.6"/>
    <text x="170" y="97" fontSize="15" fontWeight="800" textAnchor="middle" fill="#ff2e88">RWA</text>
    {/* house chip */}
    <ellipse cx="108" cy="98" rx="20" ry="26" fill="#fff" stroke="#0d0d12" strokeWidth="2.6" transform="rotate(-14 108 98)"/>
    <path d="M100 100 L108 92 L116 100 M102 98 v8 h12 v-8" fill="none" stroke="#ff2e88" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/>
    {/* car chip */}
    <circle cx="238" cy="72" r="20" fill="#ff5f7a" stroke="#0d0d12" strokeWidth="2.6"/>
    <path d="M229 74 h18 l-3 -7 h-12 Z M229 74 v5 h18 v-5" fill="none" stroke="#0d0d12" strokeWidth="2" strokeLinejoin="round"/>
    <circle cx="233" cy="80" r="1.8" fill="#0d0d12"/><circle cx="243" cy="80" r="1.8" fill="#0d0d12"/>
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
