import SiteLayout from "@/components/site/SiteLayout";
import Seo from "@/components/Seo";
import { t as _t } from "@/i18n";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

/* DePIN hero artwork — VR visor with network nodes */
const ArtDePIN = (
  <svg viewBox="0 0 340 210" preserveAspectRatio="xMidYMid slice">
    <rect width="340" height="210" fill="#bfe9ff"/>
    {/* network lines */}
    <g stroke="#0d0d12" strokeWidth="4" fill="none">
      <path d="M30 30 L96 66 M310 26 L244 62 M26 184 L96 146 M314 182 L244 144"/>
    </g>
    {/* corner nodes */}
    <g fill="#3a86ff" stroke="#0d0d12" strokeWidth="3.5">
      <rect x="12" y="14" width="34" height="34" rx="6" transform="rotate(12 29 31)"/>
      <rect x="294" y="12" width="34" height="34" rx="6" transform="rotate(-10 311 29)"/>
      <rect x="10" y="168" width="34" height="34" rx="6" transform="rotate(-8 27 185)"/>
      <rect x="296" y="166" width="34" height="34" rx="6" transform="rotate(10 313 183)"/>
    </g>
    {/* antenna */}
    <path d="M170 40 v-16 M160 30 l10 -10 10 10" stroke="#0d0d12" strokeWidth="4" fill="none" strokeLinecap="round"/>
    {/* VR visor */}
    <path d="M86 80 a84 44 0 0 1 168 0 l-8 38 a44 26 0 0 1 -32 19 l-26 5 a32 17 0 0 1 -36 0 l-26 -5 a44 26 0 0 1 -32 -19 Z" fill="#3ad0ff" stroke="#0d0d12" strokeWidth="5"/>
    <rect x="112" y="72" width="116" height="44" rx="22" fill="#fff" stroke="#0d0d12" strokeWidth="4"/>
    <text x="170" y="104" fontSize="30" fontWeight="800" textAnchor="middle" fill="#0d0d12" fontStyle="italic">DePIN</text>
    {/* base blocks */}
    <rect x="96" y="148" width="64" height="26" rx="8" fill="#3ad0ff" stroke="#0d0d12" strokeWidth="3.5" transform="rotate(-4 128 161)"/>
    <rect x="182" y="148" width="64" height="26" rx="8" fill="#3a86ff" stroke="#0d0d12" strokeWidth="3.5" transform="rotate(4 214 161)"/>
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

export default function AcademyDePIN() {
  return (
    <SiteLayout>
      <Seo title="DePIN: what they are and how decentralized physical infrastructure networks work — Blockscaner Academy" description="What is DePIN? The blockchain technology revolutionising decentralised physical infrastructure." />
      <div className="ac-article" data-testid="academy-article-depin">

        {/* header row */}
        <div className="ac-article-top">
          <Link to="/products/academy" className="ac-back" aria-label="Back to Academy"><ArrowLeft size={18} /></Link>
          <Tag>DeFi</Tag>
        </div>

        <div className="ac-article-head">
          <h1>{_t("DePIN: what they are and how")}<br />{_t("decentralized physical")}<br />{_t("infrastructure networks work")}</h1>
          <div className="ac-share">
            <span className="ac-share-ic" aria-label="Share on X"><ShareIcon d="M18.9 2H22l-6.8 7.8L23 22h-6.3l-4.9-6.4L6.2 22H3l7.3-8.3L1.5 2h6.4l4.4 5.9L18.9 2zm-1.1 18h1.7L7.1 3.9H5.3L17.8 20z"/></span>
            <span className="ac-share-ic" aria-label="Share on Facebook"><ShareIcon d="M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.4h-1.2c-1.2 0-1.6.8-1.6 1.6V12h2.7l-.4 2.9h-2.3v7A10 10 0 0 0 22 12z"/></span>
            <span className="ac-share-ic" aria-label="Share on LinkedIn"><ShareIcon d="M20.4 20.4h-3.5v-5.6c0-1.3 0-3-1.9-3s-2.1 1.4-2.1 2.9v5.7H9.4V9h3.4v1.6h.1c.5-.9 1.7-1.9 3.4-1.9 3.6 0 4.3 2.4 4.3 5.5v6.2zM5.3 7.4a2 2 0 1 1 0-4.1 2 2 0 0 1 0 4.1zM7.1 20.4H3.6V9h3.5v11.4z"/></span>
          </div>
        </div>
        <p className="ac-meta">March 19, 2026&nbsp;&nbsp;•&nbsp;&nbsp;8 min</p>

        {/* hero image */}
        <div className="ac-article-thumb">
          <Badge>Beginner</Badge>
          {ArtDePIN}
        </div>

        {/* You will learn */}
        <div className="ac-learn">
          <h2>{_t("You will learn")}</h2>
          <ul>
            <li><a href="#depin-what">{_t("What is DePIN? the blockchain technology revolutionizing decentralized physical infrastructure")}</a></li>
            <li><a href="#depin-definition">{_t("What is DePIN: a simple definition")}</a></li>
            <li><a href="#depin-flywheel">{_t("How DePIN works: the magic of the economic “flywheel”")}</a></li>
            <li><a href="#depin-categories">{_t("The two major categories of DePIN: PRN vs. DRN")}</a></li>
            <li><a href="#depin-advantages">{_t("The advantages of DePIN")}</a></li>
            <li><a href="#depin-challenges">{_t("Current challenges for the DePIN movement")}</a></li>
            <li><a href="#depin-conclusions">{_t("Conclusions")}</a></li>
          </ul>
        </div>

      </div>
    </SiteLayout>
  );
}
