import SiteLayout from "@/components/site/SiteLayout";
import Seo from "@/components/Seo";
import { t as _t } from "@/i18n";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

/* Wyckoff hero artwork — zigzag accumulation/distribution chart */
const ArtWyckoff = (
  <svg viewBox="0 0 340 210" preserveAspectRatio="xMidYMid slice">
    <rect width="340" height="210" fill="#9fdcff"/>
    {/* zigzag lines */}
    <g fill="none" stroke="#3ad0ff" strokeWidth="7" strokeLinejoin="round">
      <path d="M10 130 L50 62 L90 132 L130 68 L170 134 L210 66 L250 132 L290 72 L330 128"/>
    </g>
    <g fill="none" stroke="#0d0d12" strokeWidth="1.8" strokeLinejoin="round">
      <path d="M10 130 L50 62 L90 132 L130 68 L170 134 L210 66 L250 132 L290 72 L330 128"/>
    </g>
    {/* ellipses */}
    <ellipse cx="90" cy="104" rx="22" ry="12" fill="#fff" stroke="#0d0d12" strokeWidth="3.4" transform="rotate(-18 90 104)"/>
    <ellipse cx="250" cy="104" rx="22" ry="12" fill="#fff" stroke="#0d0d12" strokeWidth="3.4" transform="rotate(18 250 104)"/>
    <ellipse cx="60" cy="170" rx="24" ry="13" fill="#fff" stroke="#0d0d12" strokeWidth="3.4" transform="rotate(-12 60 170)"/>
    <ellipse cx="286" cy="166" rx="24" ry="13" fill="#fff" stroke="#0d0d12" strokeWidth="3.4" transform="rotate(12 286 166)"/>
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

export default function AcademyWyckoff() {
  return (
    <SiteLayout>
      <Seo title="Wyckoff theory: what is it, and how does it work? — Blockscaner Academy" description="Wyckoff theory is a trading method focused on market cycles, guiding traders in understanding price movements through accumulation and distribution." />
      <div className="ac-article" data-testid="academy-article-wyckoff">

        {/* breadcrumb */}
        <p className="ac-crumb">
          <Link to="/products/academy">Home</Link>
          <span>›</span>
          <a href="#" onClick={(e) => e.preventDefault()}>Trading</a>
          <span>›</span>
          <b>Wyckoff theory: what is it, and how does it work?</b>
        </p>

        {/* header row */}
        <div className="ac-article-top">
          <Link to="/products/academy" className="ac-back" aria-label="Back to Academy"><ArrowLeft size={18} /></Link>
          <Tag>Crypto Technical Analysis</Tag>
        </div>

        <div className="ac-article-head">
          <h1>{_t("Wyckoff theory: what is it,")}<br />{_t("and how does it work?")}</h1>
          <div className="ac-share">
            <span className="ac-share-ic" aria-label="Share on X"><ShareIcon d="M18.9 2H22l-6.8 7.8L23 22h-6.3l-4.9-6.4L6.2 22H3l7.3-8.3L1.5 2h6.4l4.4 5.9L18.9 2zm-1.1 18h1.7L7.1 3.9H5.3L17.8 20z"/></span>
            <span className="ac-share-ic" aria-label="Share on Facebook"><ShareIcon d="M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.4h-1.2c-1.2 0-1.6.8-1.6 1.6V12h2.7l-.4 2.9h-2.3v7A10 10 0 0 0 22 12z"/></span>
            <span className="ac-share-ic" aria-label="Share on LinkedIn"><ShareIcon d="M20.4 20.4h-3.5v-5.6c0-1.3 0-3-1.9-3s-2.1 1.4-2.1 2.9v5.7H9.4V9h3.4v1.6h.1c.5-.9 1.7-1.9 3.4-1.9 3.6 0 4.3 2.4 4.3 5.5v6.2zM5.3 7.4a2 2 0 1 1 0-4.1 2 2 0 0 1 0 4.1zM7.1 20.4H3.6V9h3.5v11.4z"/></span>
          </div>
        </div>
        <p className="ac-meta">November 21, 2024&nbsp;&nbsp;•&nbsp;&nbsp;5 min</p>

        {/* hero image */}
        <div className="ac-article-thumb">
          <Badge>Beginner</Badge>
          {ArtWyckoff}
        </div>

        {/* You will learn */}
        <div className="ac-learn">
          <h2>{_t("You will learn")}</h2>
          <ul>
            <li><a href="#wyckoff-intro">{_t("Wyckoff theory: trading method based on market cycles")}</a></li>
            <li><a href="#wyckoff-what">{_t("What is the Wyckoff method?")}</a></li>
            <li><a href="#wyckoff-laws">{_t("The three fundamental laws of Wyckoff")}</a></li>
            <li><a href="#wyckoff-schematic">{_t("The Wyckoff market cycle schematic")}</a></li>
            <li><a href="#wyckoff-conclusions">{_t("Conclusions")}</a></li>
          </ul>
        </div>

      </div>
    </SiteLayout>
  );
}
