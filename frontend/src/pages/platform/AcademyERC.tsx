import SiteLayout from "@/components/site/SiteLayout";
import Seo from "@/components/Seo";
import { t as _t } from "@/i18n";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

/* ERC-8004 hero artwork — Ethereum towers */
const ArtERC = (
  <svg viewBox="0 0 340 210" preserveAspectRatio="xMidYMid slice">
    <rect width="340" height="210" fill="#aee3ff"/>
    <circle cx="170" cy="105" r="34" fill="#fff"/>
    <path d="M170 74 L188 110 L170 126 L152 110 Z" fill="#3a86ff"/>
    <path d="M170 74 L188 110 L170 96 Z" fill="#0d0d12"/>
    {/* towers */}
    <g fill="#3a86ff">
      <path d="M40 140 L60 100 L80 140 Z"/>
      <path d="M260 140 L280 100 L300 140 Z"/>
    </g>
    <g stroke="#0d0d12" strokeWidth="3" fill="none">
      <path d="M60 100 L60 66 M280 100 L280 66"/>
    </g>
    <circle cx="60" cy="58" r="9" fill="#fff" stroke="#0d0d12" strokeWidth="3"/>
    <circle cx="280" cy="58" r="9" fill="#fff" stroke="#0d0d12" strokeWidth="3"/>
    {/* small ETH crystals */}
    <path d="M104 128 L116 156 L104 168 L92 156 Z" fill="#3a86ff"/>
    <path d="M104 128 L116 156 L104 146 Z" fill="#0d0d12"/>
    <path d="M236 128 L248 156 L236 168 L224 156 Z" fill="#3a86ff"/>
    <path d="M236 128 L248 156 L236 146 Z" fill="#0d0d12"/>
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

export default function AcademyERC() {
  return (
    <SiteLayout>
      <Seo title="ERC-8004: The Future of AI on Ethereum — Blockscaner Academy" description="The Ethereum ERC-8004 update is here: the new standard that promises a new lease of life for AI agents." />
      <div className="ac-article" data-testid="academy-article-erc">

        {/* header row */}
        <div className="ac-article-top">
          <Link to="/products/academy" className="ac-back" aria-label="Back to Academy"><ArrowLeft size={18} /></Link>
          <Tag>Ethereum</Tag>
        </div>

        <div className="ac-article-head">
          <h1>{_t("ERC-8004: The Future of")}<br />{_t("AI on Ethereum")}</h1>
          <div className="ac-share">
            <span className="ac-share-ic" aria-label="Share on X"><ShareIcon d="M18.9 2H22l-6.8 7.8L23 22h-6.3l-4.9-6.4L6.2 22H3l7.3-8.3L1.5 2h6.4l4.4 5.9L18.9 2zm-1.1 18h1.7L7.1 3.9H5.3L17.8 20z"/></span>
            <span className="ac-share-ic" aria-label="Share on Facebook"><ShareIcon d="M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.4h-1.2c-1.2 0-1.6.8-1.6 1.6V12h2.7l-.4 2.9h-2.3v7A10 10 0 0 0 22 12z"/></span>
            <span className="ac-share-ic" aria-label="Share on LinkedIn"><ShareIcon d="M20.4 20.4h-3.5v-5.6c0-1.3 0-3-1.9-3s-2.1 1.4-2.1 2.9v5.7H9.4V9h3.4v1.6h.1c.5-.9 1.7-1.9 3.4-1.9 3.6 0 4.3 2.4 4.3 5.5v6.2zM5.3 7.4a2 2 0 1 1 0-4.1 2 2 0 0 1 0 4.1zM7.1 20.4H3.6V9h3.5v11.4z"/></span>
          </div>
        </div>
        <p className="ac-meta">March 31, 2026&nbsp;&nbsp;•&nbsp;&nbsp;8 min</p>

        {/* hero image */}
        <div className="ac-article-thumb">
          <Badge>Beginner</Badge>
          {ArtERC}
        </div>

        {/* You will learn */}
        <div className="ac-learn">
          <h2>{_t("You will learn")}</h2>
          <ul>
            <li><a href="#erc-update">{_t("The Ethereum ERC-8004 update is here: the new standard that promises a new lease of life for AI agents.")}</a></li>
            <li><a href="#erc-trust">{_t("The problem of trust between agents")}</a></li>
            <li><a href="#erc-what">{_t("What is an ERC")}</a></li>
            <li><a href="#erc-registries">{_t("How ERC-8004 works: the three registries")}</a></li>
            <li><a href="#erc-future">{_t("Why it matters for the future of Ethereum")}</a></li>
          </ul>
        </div>

      </div>
    </SiteLayout>
  );
}
