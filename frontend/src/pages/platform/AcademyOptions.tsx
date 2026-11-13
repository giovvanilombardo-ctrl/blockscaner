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
    <path d="M-30 -30 A80 80 0 0 1 40 -50" fill="none" stroke="#4fc3f7" strokeWidth="9"/>
    <path d="M300 -40 A80 80 0 0 1 380 20" fill="none" stroke="#4fc3f7" strokeWidth="9"/>
    <path d="M-30 240 A80 80 0 0 1 40 190" fill="none" stroke="#4fc3f7" strokeWidth="9"/>
    <path d="M310 240 A70 70 0 0 1 380 190" fill="none" stroke="#4fc3f7" strokeWidth="9"/>

    {/* PUT document + hand (left) */}
    <g transform="translate(0 -6)">
      <rect x="74" y="28" width="92" height="128" rx="6" fill="#fff"/>
      <path d="M166 28 v128" stroke="#e6e6ea" strokeWidth="1.6"/>
      <text x="120" y="46" fontSize="13" fontWeight="800" textAnchor="middle" fill="#3a86ff">PUT</text>
      {[58, 70, 82, 94].map((y) => (
        <rect key={y} x="86" y={y} width="68" height="7" rx="3.5" fill="#3a86ff"/>
      ))}
      <rect x="130" y="118" width="24" height="24" rx="5" fill="#3a86ff"/>
      <path d="M137 130 l5 5 l9 -9" stroke="#fff" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      {/* arm (blue, entering from left) */}
      <path d="M-10 118 C14 108 34 104 46 108 L46 132 C34 136 14 140 -10 148 Z" fill="#4fc3f7"/>
      {/* hand (white, gripping document edge) */}
      <path d="M46 108 C54 110 62 114 66 120 L60 128 C54 130 48 128 46 124 Z" fill="#fff"/>
      <path d="M60 118 L74 116 L74 128 L60 128 Z" fill="#fff"/>
      <path d="M50 112 C56 114 62 118 66 122" stroke="#0d0d12" strokeWidth="2" fill="none" strokeLinecap="round"/>
    </g>

    {/* CALL document + hand (right) */}
    <g transform="translate(0 8)">
      <rect x="182" y="34" width="92" height="128" rx="6" fill="#fff"/>
      <path d="M182 34 v128" stroke="#e6e6ea" strokeWidth="1.6"/>
      <text x="228" y="52" fontSize="13" fontWeight="800" textAnchor="middle" fill="#3a86ff">CALL</text>
      {[64, 76, 88, 100].map((y) => (
        <rect key={y} x="194" y={y} width="68" height="7" rx="3.5" fill="#3a86ff"/>
      ))}
      <rect x="194" y="124" width="24" height="24" rx="5" fill="#3a86ff"/>
      <path d="M201 136 l5 5 l9 -9" stroke="#fff" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      {/* arm (blue, entering from right) */}
      <path d="M350 126 C326 116 306 112 294 116 L294 140 C306 144 326 148 350 156 Z" fill="#4fc3f7"/>
      {/* hand (white, gripping document edge) */}
      <path d="M294 116 C286 118 278 122 274 128 L280 136 C286 138 292 136 294 132 Z" fill="#fff"/>
      <path d="M280 126 L266 124 L266 136 L280 136 Z" fill="#fff"/>
      <path d="M290 120 C284 122 278 126 274 130" stroke="#0d0d12" strokeWidth="2" fill="none" strokeLinecap="round"/>
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
