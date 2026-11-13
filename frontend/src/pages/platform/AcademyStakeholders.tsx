import SiteLayout from "@/components/site/SiteLayout";
import Seo from "@/components/Seo";
import { t as _t } from "@/i18n";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

/* handshake puzzle hero artwork */
const ArtStakeholders = (
  <svg viewBox="0 0 340 210" preserveAspectRatio="xMidYMid slice">
    <rect width="340" height="210" fill="#0d0d12"/>
    <circle cx="170" cy="105" r="72" fill="#8b5cf6"/>
    <circle cx="170" cy="105" r="72" fill="none" stroke="#0d0d12" strokeWidth="3"/>
    {/* puzzle pieces */}
    <g fill="#efe9ff" stroke="#0d0d12" strokeWidth="2">
      <path d="M56 46 h22 v12 a7 7 0 0 0 10 0 v-12 h22 v22 h-12 a7 7 0 0 0 0 10 h12 v22 h-22 v-12 a7 7 0 0 0 -10 0 v12 h-22 z" transform="rotate(-12 83 72)"/>
      <path d="M96 132 h22 v12 a7 7 0 0 0 10 0 v-12 h22 v22 h-12 a7 7 0 0 0 0 10 h12 v22 h-22 v-12 a7 7 0 0 0 -10 0 v12 h-22 z" transform="rotate(8 123 164)"/>
      <path d="M222 48 h22 v12 a7 7 0 0 0 10 0 v-12 h22 v22 h-12 a7 7 0 0 0 0 10 h12 v22 h-22 v-12 a7 7 0 0 0 -10 0 v12 h-22 z" transform="rotate(10 255 74)"/>
    </g>
    {/* handshake */}
    <g stroke="#0d0d12" strokeWidth="2.4" fill="#fff">
      <path d="M118 108 L150 96 L168 110 L152 122 Z"/>
      <path d="M152 122 L168 110 L186 122 L176 134 L160 130 Z" fill="#efe9ff"/>
      <path d="M160 130 L176 134 L190 126 L198 116 L182 104 L168 110 Z"/>
    </g>
    <path d="M138 116 L166 132 L186 122" stroke="#0d0d12" strokeWidth="2.4" fill="none" strokeLinecap="round"/>
    {/* floating puzzle */}
    <g fill="#efe9ff" stroke="#0d0d12" strokeWidth="2">
      <path d="M282 132 h16 v9 a5 5 0 0 0 7 0 v-9 h16 v16 h-9 a5 5 0 0 0 0 7 h9 v16 h-16 v-9 a5 5 0 0 0 -7 0 v9 h-16 z"/>
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

export default function AcademyStakeholders() {
  return (
    <SiteLayout>
      <Seo title="Stakeholders: who they are and how to identify them — Blockscaner Academy" description="What is a stakeholder? Discover the meaning of stakeholders, their types, practical examples, and the process of stakeholder mapping." />
      <div className="ac-article" data-testid="academy-article-stakeholders">

        {/* breadcrumb */}
        <p className="ac-crumb">
          <Link to="/products/academy">Home</Link>
          <span>›</span>
          <a href="#" onClick={(e) => e.preventDefault()}>Easy Economics</a>
          <span>›</span>
          <b>Stakeholders: who they are and how to identify them</b>
        </p>

        {/* header row */}
        <div className="ac-article-top">
          <Link to="/products/academy" className="ac-back" aria-label="Back to Academy"><ArrowLeft size={18} /></Link>
          <Tag>Stocks</Tag>
        </div>

        <div className="ac-article-head">
          <h1>{_t("Stakeholders: who they")}<br />{_t("are and how to identify")}<br />{_t("them")}</h1>
          <div className="ac-share">
            <span className="ac-share-ic" aria-label="Share on X"><ShareIcon d="M18.9 2H22l-6.8 7.8L23 22h-6.3l-4.9-6.4L6.2 22H3l7.3-8.3L1.5 2h6.4l4.4 5.9L18.9 2zm-1.1 18h1.7L7.1 3.9H5.3L17.8 20z"/></span>
            <span className="ac-share-ic" aria-label="Share on Facebook"><ShareIcon d="M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.4h-1.2c-1.2 0-1.6.8-1.6 1.6V12h2.7l-.4 2.9h-2.3v7A10 10 0 0 0 22 12z"/></span>
            <span className="ac-share-ic" aria-label="Share on LinkedIn"><ShareIcon d="M20.4 20.4h-3.5v-5.6c0-1.3 0-3-1.9-3s-2.1 1.4-2.1 2.9v5.7H9.4V9h3.4v1.6h.1c.5-.9 1.7-1.9 3.4-1.9 3.6 0 4.3 2.4 4.3 5.5v6.2zM5.3 7.4a2 2 0 1 1 0-4.1 2 2 0 0 1 0 4.1zM7.1 20.4H3.6V9h3.5v11.4z"/></span>
          </div>
        </div>
        <p className="ac-meta">June 25, 2024&nbsp;&nbsp;•&nbsp;&nbsp;5 min</p>

        {/* hero image */}
        <div className="ac-article-thumb">
          <Badge>Beginner</Badge>
          {ArtStakeholders}
        </div>

        {/* You will learn */}
        <div className="ac-learn">
          <h2>{_t("You will learn")}</h2>
          <ul>
            <li><a href="#stakeholders-intro">{_t("Introduction: who are the stakeholders?")}</a></li>
            <li><a href="#stakeholders-examples">{_t("Practical examples of stakeholders")}</a></li>
            <li><a href="#stakeholders-difference">{_t("Difference between stakeholders and shareholders")}</a></li>
            <li><a href="#stakeholders-important">{_t("Why are stakeholders important?")}</a></li>
          </ul>
        </div>

      </div>
    </SiteLayout>
  );
}
