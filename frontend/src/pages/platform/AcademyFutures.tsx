import SiteLayout from "@/components/site/SiteLayout";
import Seo from "@/components/Seo";
import { t as _t } from "@/i18n";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

/* Futures hero artwork — blue mountains and coins */
const ArtFutures = (
  <svg viewBox="0 0 340 210" preserveAspectRatio="xMidYMid slice">
    <rect width="340" height="210" fill="#d9ecff"/>
    {/* back mountains */}
    <path d="M0 90 L40 60 L76 96 L112 66 L150 100 L188 62 L228 100 L264 70 L304 104 L340 76 V210 H0 Z" fill="#0d0d12"/>
    {/* front mountains */}
    <path d="M0 130 L48 92 L92 132 L136 96 L180 134 L226 94 L272 132 L316 100 L340 122 V210 H0 Z" fill="#3a86ff"/>
    {/* coin circles */}
    <circle cx="104" cy="60" r="18" fill="#7cc4ff" stroke="#0d0d12" strokeWidth="3.5"/>
    <circle cx="236" cy="44" r="13" fill="#7cc4ff" stroke="#0d0d12" strokeWidth="3.5"/>
    <circle cx="190" cy="120" r="26" fill="#7cc4ff" stroke="#0d0d12" strokeWidth="4"/>
    <circle cx="70" cy="150" r="16" fill="#7cc4ff" stroke="#0d0d12" strokeWidth="3.5"/>
    <circle cx="290" cy="158" r="20" fill="#7cc4ff" stroke="#0d0d12" strokeWidth="3.5"/>
    {/* small dots */}
    <circle cx="150" cy="40" r="4" fill="#0d0d12"/>
    <circle cx="270" cy="96" r="4" fill="#0d0d12"/>
    {/* bars */}
    <rect x="118" y="150" width="26" height="44" rx="4" fill="#fff" stroke="#0d0d12" strokeWidth="3"/>
    <rect x="220" y="142" width="26" height="52" rx="4" fill="#fff" stroke="#0d0d12" strokeWidth="3"/>
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

export default function AcademyFutures() {
  return (
    <SiteLayout>
      <Seo title="Futures: what they are and how they work — Blockscaner Academy" description="What are futures and how do they work? Discover these unique derivative financial instruments widely used by expert traders." />
      <div className="ac-article" data-testid="academy-article-futures">

        {/* breadcrumb */}
        <p className="ac-crumb">
          <Link to="/products/academy">Home</Link>
          <span>›</span>
          <a href="#" onClick={(e) => e.preventDefault()}>Trading</a>
          <span>›</span>
          <b>Futures: what they are and how they work</b>
        </p>

        {/* header row */}
        <div className="ac-article-top">
          <Link to="/products/academy" className="ac-back" aria-label="Back to Academy"><ArrowLeft size={18} /></Link>
          <Tag>Derivati</Tag>
        </div>

        <div className="ac-article-head">
          <h1>{_t("Futures: what they are")}<br />{_t("and how they work")}</h1>
          <div className="ac-share">
            <span className="ac-share-ic" aria-label="Share on X"><ShareIcon d="M18.9 2H22l-6.8 7.8L23 22h-6.3l-4.9-6.4L6.2 22H3l7.3-8.3L1.5 2h6.4l4.4 5.9L18.9 2zm-1.1 18h1.7L7.1 3.9H5.3L17.8 20z"/></span>
            <span className="ac-share-ic" aria-label="Share on Facebook"><ShareIcon d="M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.4h-1.2c-1.2 0-1.6.8-1.6 1.6V12h2.7l-.4 2.9h-2.3v7A10 10 0 0 0 22 12z"/></span>
            <span className="ac-share-ic" aria-label="Share on LinkedIn"><ShareIcon d="M20.4 20.4h-3.5v-5.6c0-1.3 0-3-1.9-3s-2.1 1.4-2.1 2.9v5.7H9.4V9h3.4v1.6h.1c.5-.9 1.7-1.9 3.4-1.9 3.6 0 4.3 2.4 4.3 5.5v6.2zM5.3 7.4a2 2 0 1 1 0-4.1 2 2 0 0 1 0 4.1zM7.1 20.4H3.6V9h3.5v11.4z"/></span>
          </div>
        </div>
        <p className="ac-meta">November 26, 2025&nbsp;&nbsp;•&nbsp;&nbsp;8 min</p>

        {/* hero image */}
        <div className="ac-article-thumb">
          <Badge>Beginner</Badge>
          {ArtFutures}
        </div>

        {/* You will learn */}
        <div className="ac-learn">
          <h2>{_t("You will learn")}</h2>
          <ul>
            <li><a href="#futures-unravelling">{_t("Unravelling Futures: highly utilised derivative financial instruments for the savvy trader")}</a></li>
            <li><a href="#futures-what">{_t("What exactly are Futures Contracts?")}</a></li>
            <li><a href="#futures-mechanics">{_t("The mechanics of derivative contracts")}</a></li>
            <li><a href="#futures-margin">{_t("Contract guarantees and margin")}</a></li>
            <li><a href="#futures-operational">{_t("Futures: specific operational details")}</a></li>
            <li><a href="#futures-summary">{_t("Summary")}</a></li>
          </ul>
        </div>

      </div>
    </SiteLayout>
  );
}
