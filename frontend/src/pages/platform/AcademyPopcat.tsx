import SiteLayout from "@/components/site/SiteLayout";
import Seo from "@/components/Seo";
import { t as _t } from "@/i18n";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const ArtPopcat = (
  <svg viewBox="0 0 220 150" preserveAspectRatio="xMidYMid slice">
    <rect width="220" height="150" fill="#ffb3c7"/>
    <path d="M0 40 C40 10 80 20 110 50 C140 80 180 90 220 60 V0 H0 Z" fill="#0d0d12"/>
    <circle cx="110" cy="84" r="30" fill="#fff"/>
    <circle cx="110" cy="84" r="30" fill="none" stroke="#0d0d12" strokeWidth="3"/>
    <path d="M94 76 L90 66 L100 70 Z M126 76 L130 66 L120 70 Z" fill="#ff5f8f" stroke="#0d0d12" strokeWidth="2"/>
    <circle cx="100" cy="82" r="4" fill="#0d0d12"/><circle cx="120" cy="82" r="4" fill="#0d0d12"/>
    <ellipse cx="110" cy="94" rx="8" ry="10" fill="#0d0d12"/>
    <ellipse cx="110" cy="94" rx="4" ry="6" fill="#ff5f8f"/>
    <circle cx="52" cy="112" r="14" fill="#fff"/><circle cx="176" cy="108" r="10" fill="#fff"/>
    <circle cx="186" cy="46" r="12" fill="#ffb3c7" stroke="#0d0d12" strokeWidth="3"/>
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

export default function AcademyPopcat() {
  return (
    <SiteLayout>
      <Seo title="Popcat: what it is and how it works — Blockscaner Academy" description="POPCAT: what it is and how the 'pop' cat meme coin works." />
      <div className="ac-article" data-testid="academy-article-popcat">

        {/* breadcrumb */}
        <p className="ac-crumb">
          <Link to="/products/academy">Home</Link>
          <span>›</span>
          <a href="#" onClick={(e) => e.preventDefault()}>Cryptocurrencies</a>
          <span>›</span>
          <b>Popcat: what it is and how it works</b>
        </p>

        {/* header row */}
        <div className="ac-article-top">
          <Link to="/products/academy" className="ac-back" aria-label="Back to Academy"><ArrowLeft size={18} /></Link>
          <Tag>Meme</Tag>
        </div>

        <div className="ac-article-head">
          <h1>{_t("Popcat: what it is and")}<br />{_t("how it works")}</h1>
          <div className="ac-share">
            <span className="ac-share-ic" aria-label="Share on X"><ShareIcon d="M18.9 2H22l-6.8 7.8L23 22h-6.3l-4.9-6.4L6.2 22H3l7.3-8.3L1.5 2h6.4l4.4 5.9L18.9 2zm-1.1 18h1.7L7.1 3.9H5.3L17.8 20z"/></span>
            <span className="ac-share-ic" aria-label="Share on Facebook"><ShareIcon d="M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.4h-1.2c-1.2 0-1.6.8-1.6 1.6V12h2.7l-.4 2.9h-2.3v7A10 10 0 0 0 22 12z"/></span>
            <span className="ac-share-ic" aria-label="Share on LinkedIn"><ShareIcon d="M20.4 20.4h-3.5v-5.6c0-1.3 0-3-1.9-3s-2.1 1.4-2.1 2.9v5.7H9.4V9h3.4v1.6h.1c.5-.9 1.7-1.9 3.4-1.9 3.6 0 4.3 2.4 4.3 5.5v6.2zM5.3 7.4a2 2 0 1 1 0-4.1 2 2 0 0 1 0 4.1zM7.1 20.4H3.6V9h3.5v11.4z"/></span>
          </div>
        </div>
        <p className="ac-meta">May 8, 2026&nbsp;&nbsp;•&nbsp;&nbsp;7 min</p>

        {/* hero image */}
        <div className="ac-article-thumb">
          <Badge>Beginner</Badge>
          {ArtPopcat}
        </div>

        {/* You will learn */}
        <div className="ac-learn">
          <h2>{_t("You will learn")}</h2>
          <ul>
            <li><a href="#popcat-what">{_t("POPCAT: what it is and how the 'pop' cat meme coin works")}</a></li>
            <li><a href="#popcat-meme">{_t("POPCAT: The meme that took the internet by storm")}</a></li>
            <li><a href="#popcat-discord">{_t("From Discord to Solana: how the Popcat crypto came about")}</a></li>
            <li><a href="#popcat-community">{_t("The community rebels against the founder")}</a></li>
            <li><a href="#popcat-tokenomics">{_t("Transparent, community-driven tokenomics")}</a></li>
            <li><a href="#popcat-more">{_t("Just a meme, or is there more to it?")}</a></li>
          </ul>
        </div>

        {/* Article body */}
        <div className="ac-body">
          <h2 id="popcat-what">POPCAT: what it is and how the ‘pop’ cat meme coin works</h2>
          <p>There’s a cat on the internet that opens and closes its mouth funnily, making a sharp, irresistible sound. From that simple image, which later became a video, one of the most talked-about meme coins of recent years was born.</p>
          <p>It’s called Popcat, its token is $POPCAT, and its evolution from a simple homemade joke to a financial phenomenon on the blockchain is one of the most absurd—and fascinating—stories in the entire crypto ecosystem. A story made up of global clicks, community uprisings and a climb to the top of the Solana network.</p>
          <p>If you’re curious about what Popcat is and why it’s become a web3 icon, this is the article for you.</p>

          <h2 id="popcat-meme">POPCAT: The meme that took the internet by storm</h2>
          <p>It all began in October 2020, when a Discord user named XavierBFV posted two photos of his pet cat, Oatmeal.</p>
          <p>The first image shows the cat with its mouth closed; in the second, digital editing exaggerates the opening of the mouth into a perfect ‘O’ shape.</p>
        </div>

        {/* Academy image: the original Popcat meme photos */}
        <section className="ac-summary" data-testid="popcat-meme-photos">
          <div className="ac-summary-brand">
            <span className="ac-summary-check"><svg viewBox="0 0 24 24" width="16" height="16"><path d="M5 13l4 4L19 7" stroke="#fff" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
            <span>academy</span>
          </div>

          <div className="ac-meme-img">
            {/* stylised recreation of the two Oatmeal photos */}
            <div className="ac-meme-cat">
              <svg viewBox="0 0 200 130">
                <rect width="200" height="130" fill="#f5f0e6"/>
                <ellipse cx="100" cy="92" rx="46" ry="34" fill="#fff"/>
                <circle cx="100" cy="58" r="30" fill="#fff"/>
                <path d="M74 44 L66 20 L92 32 Z" fill="#e8d9c8"/>
                <path d="M126 44 L134 20 L108 32 Z" fill="#e8d9c8"/>
                <path d="M78 40 L74 26 L90 34 Z" fill="#fff"/>
                <path d="M122 40 L126 26 L110 34 Z" fill="#fff"/>
                <path d="M78 34 C86 26 96 28 100 34 C104 28 114 26 122 34 C118 28 104 24 100 30 C96 24 82 28 78 34 Z" fill="#d9c9b8"/>
                <ellipse cx="88" cy="54" rx="5" ry="6" fill="#0d0d12"/>
                <ellipse cx="112" cy="54" rx="5" ry="6" fill="#0d0d12"/>
                <path d="M96 66 q4 4 8 0" stroke="#0d0d12" strokeWidth="2.4" fill="none" strokeLinecap="round"/>
                <path d="M100 64 l-3 -3 h6 z" fill="#ffb3c7"/>
                <g stroke="#d9c9b8" strokeWidth="1.4" strokeLinecap="round">
                  <line x1="74" y1="60" x2="56" y2="56"/><line x1="74" y1="66" x2="56" y2="66"/>
                  <line x1="126" y1="60" x2="144" y2="56"/><line x1="126" y1="66" x2="144" y2="66"/>
                </g>
                <path d="M86 30 C92 24 108 24 114 30" stroke="#d9c9b8" strokeWidth="6" fill="none" strokeLinecap="round"/>
              </svg>
            </div>
            <div className="ac-meme-cat">
              <svg viewBox="0 0 200 130">
                <rect width="200" height="130" fill="#f5f0e6"/>
                <ellipse cx="100" cy="92" rx="46" ry="34" fill="#fff"/>
                <circle cx="100" cy="58" r="30" fill="#fff"/>
                <path d="M74 44 L66 20 L92 32 Z" fill="#e8d9c8"/>
                <path d="M126 44 L134 20 L108 32 Z" fill="#e8d9c8"/>
                <path d="M78 40 L74 26 L90 34 Z" fill="#fff"/>
                <path d="M122 40 L126 26 L110 34 Z" fill="#fff"/>
                <path d="M78 34 C86 26 96 28 100 34 C104 28 114 26 122 34 C118 28 104 24 100 30 C96 24 82 28 78 34 Z" fill="#d9c9b8"/>
                <path d="M84 50 q4 -4 8 0 M108 50 q4 -4 8 0" stroke="#0d0d12" strokeWidth="2.4" fill="none" strokeLinecap="round"/>
                <ellipse cx="100" cy="72" rx="16" ry="20" fill="#7a1f2b"/>
                <ellipse cx="100" cy="80" rx="10" ry="10" fill="#b33a4a"/>
                <path d="M100 64 l-3 -3 h6 z" fill="#ffb3c7"/>
                <g stroke="#d9c9b8" strokeWidth="1.4" strokeLinecap="round">
                  <line x1="74" y1="60" x2="56" y2="56"/><line x1="74" y1="66" x2="56" y2="66"/>
                  <line x1="126" y1="60" x2="144" y2="56"/><line x1="126" y1="66" x2="144" y2="66"/>
                </g>
                <path d="M86 30 C92 24 108 24 114 30" stroke="#d9c9b8" strokeWidth="6" fill="none" strokeLinecap="round"/>
              </svg>
            </div>
          </div>
        </section>

      </div>
    </SiteLayout>
  );
}
