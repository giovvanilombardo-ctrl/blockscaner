import SiteLayout from "@/components/site/SiteLayout";
import Seo from "@/components/Seo";
import { t as _t } from "@/i18n";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const ArtBonds = (
  <svg viewBox="0 0 340 210" preserveAspectRatio="xMidYMid slice">
    <rect width="340" height="210" fill="#d9ccff"/>
    {/* left building */}
    <path d="M60 130 L60 96 L98 70 L136 96 L136 130 Z" fill="#b9a7f0" stroke="#0d0d12" strokeWidth="4"/>
    <path d="M98 70 L136 96 H60 Z" fill="#8b5cf6"/>
    <rect x="74" y="104" width="9" height="26" fill="#0d0d12"/><rect x="92" y="104" width="9" height="26" fill="#0d0d12"/><rect x="110" y="104" width="9" height="26" fill="#0d0d12"/>
    {/* right building */}
    <path d="M204 130 L204 96 L242 70 L280 96 L280 130 Z" fill="#b9a7f0" stroke="#0d0d12" strokeWidth="4"/>
    <path d="M242 70 L280 96 H204 Z" fill="#8b5cf6"/>
    <rect x="218" y="104" width="9" height="26" fill="#0d0d12"/><rect x="236" y="104" width="9" height="26" fill="#0d0d12"/><rect x="254" y="104" width="9" height="26" fill="#0d0d12"/>
    {/* centre certificate */}
    <rect x="140" y="58" width="90" height="86" rx="6" fill="#f3edff" stroke="#0d0d12" strokeWidth="4"/>
    <rect x="148" y="66" width="74" height="70" rx="4" fill="none" stroke="#0d0d12" strokeWidth="2"/>
    {/* seal */}
    <circle cx="185" cy="90" r="14" fill="#c9a7ff" stroke="#0d0d12" strokeWidth="3"/>
    <circle cx="185" cy="90" r="8" fill="none" stroke="#0d0d12" strokeWidth="2" strokeDasharray="2 2"/>
    {/* lines */}
    <line x1="158" y1="112" x2="212" y2="112" stroke="#0d0d12" strokeWidth="2.4"/>
    <line x1="158" y1="120" x2="206" y2="120" stroke="#0d0d12" strokeWidth="2.4"/>
    <line x1="158" y1="128" x2="200" y2="128" stroke="#0d0d12" strokeWidth="2.4"/>
    {/* coins */}
    <circle cx="66" cy="64" r="15" fill="#fff" stroke="#0d0d12" strokeWidth="3.4"/>
    <ellipse cx="66" cy="72" rx="15" ry="5" fill="#d9ccff" stroke="#0d0d12" strokeWidth="2"/>
    <circle cx="278" cy="64" r="15" fill="#fff" stroke="#0d0d12" strokeWidth="3.4"/>
    <ellipse cx="278" cy="72" rx="15" ry="5" fill="#d9ccff" stroke="#0d0d12" strokeWidth="2"/>
    <circle cx="100" cy="152" r="15" fill="#fff" stroke="#0d0d12" strokeWidth="3.4"/>
    <ellipse cx="100" cy="160" rx="15" ry="5" fill="#d9ccff" stroke="#0d0d12" strokeWidth="2"/>
    <circle cx="252" cy="152" r="15" fill="#fff" stroke="#0d0d12" strokeWidth="3.4"/>
    <ellipse cx="252" cy="160" rx="15" ry="5" fill="#d9ccff" stroke="#0d0d12" strokeWidth="2"/>
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

export default function AcademyBonds() {
  return (
    <SiteLayout>
      <Seo title="What are bonds and how do they work? — Blockscaner Academy" description="What are bonds, and how do they work? The financial instruments that reduce the portfolio risk." />
      <div className="ac-article" data-testid="academy-article-bonds">

        {/* header row */}
        <div className="ac-article-top">
          <Link to="/products/academy" className="ac-back" aria-label="Back to Academy"><ArrowLeft size={18} /></Link>
          <Tag>Stocks</Tag>
        </div>

        <div className="ac-article-head">
          <h1>{_t("What are bonds and how")}<br />{_t("do they work?")}</h1>
          <div className="ac-share">
            <span className="ac-share-ic" aria-label="Share on X"><ShareIcon d="M18.9 2H22l-6.8 7.8L23 22h-6.3l-4.9-6.4L6.2 22H3l7.3-8.3L1.5 2h6.4l4.4 5.9L18.9 2zm-1.1 18h1.7L7.1 3.9H5.3L17.8 20z"/></span>
            <span className="ac-share-ic" aria-label="Share on Facebook"><ShareIcon d="M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.4h-1.2c-1.2 0-1.6.8-1.6 1.6V12h2.7l-.4 2.9h-2.3v7A10 10 0 0 0 22 12z"/></span>
            <span className="ac-share-ic" aria-label="Share on LinkedIn"><ShareIcon d="M20.4 20.4h-3.5v-5.6c0-1.3 0-3-1.9-3s-2.1 1.4-2.1 2.9v5.7H9.4V9h3.4v1.6h.1c.5-.9 1.7-1.9 3.4-1.9 3.6 0 4.3 2.4 4.3 5.5v6.2zM5.3 7.4a2 2 0 1 1 0-4.1 2 2 0 0 1 0 4.1zM7.1 20.4H3.6V9h3.5v11.4z"/></span>
          </div>
        </div>
        <p className="ac-meta">April 17, 2026&nbsp;&nbsp;•&nbsp;&nbsp;14 min</p>

        {/* hero image */}
        <div className="ac-article-thumb">
          <Badge>Beginner</Badge>
          {ArtBonds}
        </div>

        {/* You will learn */}
        <div className="ac-learn">
          <h2>{_t("You will learn")}</h2>
          <ul>
            <li><a href="#bonds-intro">{_t("What are bonds, and how do they work? Financial instruments to reduce portfolio risk")}</a></li>
            <li><a href="#bonds-what">{_t("What are bonds?")}</a></li>
            <li><a href="#bonds-technically">{_t("How bonds work technically")}</a></li>
            <li><a href="#bonds-characteristics">{_t("Key characteristics of bonds")}</a></li>
            <li><a href="#bonds-advantages">{_t("Advantages associated with the use of bonds")}</a></li>
            <li><a href="#bonds-risks">{_t("Risks associated with investing in bonds")}</a></li>
            <li><a href="#bonds-tokenisation">{_t("Tokenisation of bonds")}</a></li>
            <li><a href="#bonds-conclusions">{_t("Conclusions")}</a></li>
          </ul>
        </div>

      </div>
    </SiteLayout>
  );
}
