import SiteLayout from "@/components/site/SiteLayout";
import Seo from "@/components/Seo";
import { t as _t } from "@/i18n";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

/* PUT/CALL hero artwork — exact reference */
const ArtOptionsHero = (
  <svg viewBox="0 0 340 210" preserveAspectRatio="xMidYMid slice">
    <rect width="340" height="210" fill="#0d0d12"/>
    {/* corner arcs */}
    <path d="M-40 -20 A90 90 0 0 1 40 -50" fill="none" stroke="#4fc3f7" strokeWidth="10"/>
    <path d="M300 -30 A80 80 0 0 1 380 30" fill="none" stroke="#4fc3f7" strokeWidth="10"/>
    <path d="M-30 240 A80 80 0 0 1 40 180" fill="none" stroke="#4fc3f7" strokeWidth="10"/>
    <path d="M320 240 A70 70 0 0 1 380 190" fill="none" stroke="#4fc3f7" strokeWidth="10"/>

    {/* PUT document */}
    <g>
      <rect x="58" y="34" width="100" height="128" rx="6" fill="#fff"/>
      <path d="M158 34 v128 h0" stroke="#e6e6ea" strokeWidth="2"/>
      <text x="108" y="52" fontSize="13" fontWeight="800" textAnchor="middle" fill="#3a86ff">PUT</text>
      {[66, 78, 90, 102].map((y) => (
        <rect key={y} x="70" y={y} width="76" height="7" rx="3.5" fill="#3a86ff"/>
      ))}
      <rect x="120" y="126" width="26" height="26" rx="5" fill="#3a86ff"/>
      <path d="M128 139 l6 6 l10 -10" stroke="#fff" strokeWidth="2.4" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      {/* hand holding PUT */}
      <path d="M0 96 C14 88 26 86 34 90 L34 118 C26 122 14 122 0 128 Z" fill="#4fc3f7"/>
      <path d="M34 90 C46 92 56 98 60 106 C64 114 62 124 56 130 C50 136 42 138 34 136 Z" fill="#fff"/>
      <path d="M34 96 C42 98 50 104 54 110" stroke="#0d0d12" strokeWidth="2" fill="none" strokeLinecap="round"/>
    </g>

    {/* CALL document */}
    <g>
      <rect x="182" y="46" width="100" height="128" rx="6" fill="#fff"/>
      <path d="M182 46 v128 h0" stroke="#e6e6ea" strokeWidth="2"/>
      <text x="232" y="64" fontSize="13" fontWeight="800" textAnchor="middle" fill="#3a86ff">CALL</text>
      {[78, 90, 102, 114].map((y) => (
        <rect key={y} x="194" y={y} width="76" height="7" rx="3.5" fill="#3a86ff"/>
      ))}
      <rect x="194" y="138" width="26" height="26" rx="5" fill="#3a86ff"/>
      <path d="M202 151 l6 6 l10 -10" stroke="#fff" strokeWidth="2.4" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      {/* hand holding CALL */}
      <path d="M340 108 C326 100 314 98 306 102 L306 130 C314 134 326 134 340 140 Z" fill="#4fc3f7"/>
      <path d="M306 102 C294 104 284 110 280 118 C276 126 278 136 284 142 C290 148 298 150 306 148 Z" fill="#fff"/>
      <path d="M306 108 C298 110 290 116 286 122" stroke="#0d0d12" strokeWidth="2" fill="none" strokeLinecap="round"/>
    </g>
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

export default function AcademyOptions() {
  return (
    <SiteLayout>
      <Seo title="Options: what are they and how do they work? — Blockscaner Academy" description="Options in finance are contracts giving the right, but not the obligation, to buy or sell an asset at a set price by a certain date, with a paid premium." />
      <div className="ac-article" data-testid="academy-article-options">

        {/* header row */}
        <div className="ac-article-top">
          <Link to="/products/academy" className="ac-back" aria-label="Back to Academy"><ArrowLeft size={18} /></Link>
          <Tag>Stocks</Tag>
        </div>

        <div className="ac-article-head">
          <h1>{_t("Options: what are they")}<br />{_t("and how do they work?")}</h1>
          <div className="ac-share">
            <span className="ac-share-ic" aria-label="Share on X"><ShareIcon d="M18.9 2H22l-6.8 7.8L23 22h-6.3l-4.9-6.4L6.2 22H3l7.3-8.3L1.5 2h6.4l4.4 5.9L18.9 2zm-1.1 18h1.7L7.1 3.9H5.3L17.8 20z"/></span>
            <span className="ac-share-ic" aria-label="Share on Facebook"><ShareIcon d="M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.4h-1.2c-1.2 0-1.6.8-1.6 1.6V12h2.7l-.4 2.9h-2.3v7A10 10 0 0 0 22 12z"/></span>
            <span className="ac-share-ic" aria-label="Share on LinkedIn"><ShareIcon d="M20.4 20.4h-3.5v-5.6c0-1.3 0-3-1.9-3s-2.1 1.4-2.1 2.9v5.7H9.4V9h3.4v1.6h.1c.5-.9 1.7-1.9 3.4-1.9 3.6 0 4.3 2.4 4.3 5.5v6.2zM5.3 7.4a2 2 0 1 1 0-4.1 2 2 0 0 1 0 4.1zM7.1 20.4H3.6V9h3.5v11.4z"/></span>
          </div>
        </div>
        <p className="ac-meta">September 10, 2024&nbsp;&nbsp;•&nbsp;&nbsp;5 min</p>

        {/* hero image */}
        <div className="ac-article-thumb">
          <Badge>Beginner</Badge>
          {ArtOptionsHero}
        </div>

        {/* You will learn */}
        <div className="ac-learn">
          <h2>{_t("You will learn")}</h2>
          <ul>
            <li><a href="#options-definition">{_t("What is an option in finance? A definition")}</a></li>
            <li><a href="#options-types">{_t("Key types of options")}</a></li>
            <li><a href="#options-practical">{_t("How options work: a practical example")}</a></li>
            <li><a href="#options-asymmetry">{_t("Asymmetry of risk and reward in options")}</a></li>
          </ul>
        </div>

      </div>
    </SiteLayout>
  );
}
