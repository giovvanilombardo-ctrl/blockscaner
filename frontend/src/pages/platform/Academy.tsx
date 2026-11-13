import SiteLayout from "@/components/site/SiteLayout";
import Seo from "@/components/Seo";
import { t as _t } from "@/i18n";

/* ---- hero artwork: mint banknote with ETH coin + fingerprint ---- */
const ArtEthereumNote = (
  <svg viewBox="0 0 340 210" preserveAspectRatio="xMidYMid slice">
    <rect width="340" height="210" fill="#c9f5dd"/>
    {/* banknote */}
    <rect x="46" y="34" width="248" height="142" rx="14" fill="#3ddc84"/>
    <rect x="46" y="34" width="248" height="142" rx="14" fill="none" stroke="#0d0d12" strokeWidth="4"/>
    <rect x="58" y="46" width="224" height="118" rx="8" fill="none" stroke="#0d0d12" strokeWidth="2" opacity=".5"/>
    {/* corner marks */}
    <path d="M58 60 q14 0 14 -14 M282 60 q-14 0 -14 -14 M58 150 q14 0 14 14 M282 150 q-14 0 -14 14" stroke="#0d0d12" strokeWidth="2.5" fill="none"/>
    {/* ETH coin */}
    <circle cx="120" cy="105" r="44" fill="#fff" stroke="#0d0d12" strokeWidth="4"/>
    <path d="M120 74 L138 106 L120 118 L102 106 Z" fill="#0d0d12"/>
    <path d="M120 74 L138 106 L120 100 Z" fill="#0d0d12" opacity=".55"/>
    {/* fingerprint circle */}
    <circle cx="214" cy="105" r="44" fill="#fff" stroke="#0d0d12" strokeWidth="4"/>
    <g fill="none" stroke="#0d0d12" strokeWidth="2.6">
      <path d="M214 84 a21 21 0 0 1 21 21"/><path d="M193 105 a21 21 0 0 1 12 -19"/>
      <path d="M214 93 a12 12 0 0 1 12 12"/><path d="M202 105 a12 12 0 0 1 6 -10"/>
      <path d="M214 101 a4 4 0 0 1 4 4 a4 4 0 0 1 -4 4"/>
      <path d="M226 118 a24 24 0 0 1 -22 10"/><path d="M196 118 a20 20 0 0 1 -6 -13"/>
    </g>
  </svg>
);

const ArtBitcoin = (
  <svg viewBox="0 0 220 150" preserveAspectRatio="xMidYMid slice">
    <rect width="220" height="150" fill="#ffe9a8"/>
    <path d="M0 150 L60 70 L120 110 L220 30 V150 Z" fill="#0d0d12" opacity=".9"/>
    <circle cx="130" cy="66" r="30" fill="#ffd23f" stroke="#0d0d12" strokeWidth="3"/>
    <text x="130" y="78" fontSize="30" fontWeight="800" textAnchor="middle" fill="#0d0d12">₿</text>
    <circle cx="70" cy="104" r="16" fill="#ffd23f" stroke="#0d0d12" strokeWidth="3"/>
    <text x="70" y="110" fontSize="16" fontWeight="800" textAnchor="middle" fill="#0d0d12">Ł</text>
    <circle cx="48" cy="122" r="10" fill="#ffd23f" stroke="#0d0d12" strokeWidth="3"/>
  </svg>
);

const ArtBonds = (
  <svg viewBox="0 0 220 150" preserveAspectRatio="xMidYMid slice">
    <rect width="220" height="150" fill="#d9ccff"/>
    <circle cx="110" cy="75" r="50" fill="#fff"/>
    <path d="M70 100 L70 70 L110 44 L150 70 L150 100 Z" fill="#e9e2ff" stroke="#0d0d12" strokeWidth="3"/>
    <rect x="82" y="80" width="12" height="20" fill="#8b5cf6"/><rect x="104" y="80" width="12" height="20" fill="#8b5cf6"/><rect x="126" y="80" width="12" height="20" fill="#8b5cf6"/>
    <path d="M110 44 L150 70 H70 Z" fill="#8b5cf6"/>
    <circle cx="60" cy="50" r="12" fill="#fff" stroke="#0d0d12" strokeWidth="3"/>
    <circle cx="164" cy="44" r="9" fill="#fff" stroke="#0d0d12" strokeWidth="3"/>
  </svg>
);

const ArtOptions = (
  <svg viewBox="0 0 220 150" preserveAspectRatio="xMidYMid slice">
    <rect width="220" height="150" fill="#0d0d12"/>
    <rect x="36" y="30" width="64" height="80" rx="8" fill="#fff"/>
    <rect x="46" y="44" width="30" height="8" rx="4" fill="#3a86ff"/>
    <rect x="46" y="58" width="44" height="6" rx="3" fill="#d9f0ff"/>
    <rect x="46" y="70" width="44" height="6" rx="3" fill="#d9f0ff"/>
    <text x="68" y="102" fontSize="13" fontWeight="800" textAnchor="middle" fill="#3a86ff">PUT</text>
    <rect x="120" y="30" width="64" height="80" rx="8" fill="#fff"/>
    <rect x="130" y="44" width="34" height="8" rx="4" fill="#8b5cf6"/>
    <rect x="130" y="58" width="44" height="6" rx="3" fill="#eee6ff"/>
    <rect x="130" y="70" width="44" height="6" rx="3" fill="#eee6ff"/>
    <text x="152" y="102" fontSize="13" fontWeight="800" textAnchor="middle" fill="#8b5cf6">CALL</text>
    <circle cx="60" cy="122" r="9" fill="#3a86ff"/><circle cx="168" cy="122" r="9" fill="#8b5cf6"/>
  </svg>
);

const ArtStake = (
  <svg viewBox="0 0 220 150" preserveAspectRatio="xMidYMid slice">
    <rect width="220" height="150" fill="#8b5cf6"/>
    <path d="M30 90 C50 60 80 60 100 80 L110 88 L120 80 C140 60 170 60 190 90 L190 110 C170 80 140 80 120 100 L110 108 L100 100 C80 80 50 80 30 110 Z" fill="#c9a7ff"/>
    <circle cx="70" cy="60" r="16" fill="#fff"/><circle cx="150" cy="60" r="16" fill="#fff"/>
    <path d="M70 52 C70 44 78 44 78 52 M70 52 C70 60 62 60 62 52" stroke="#0d0d12" strokeWidth="3" fill="none"/>
    <path d="M150 52 C150 44 158 44 158 52 M150 52 C150 60 142 60 142 52" stroke="#0d0d12" strokeWidth="3" fill="none"/>
  </svg>
);

const ArtERC = (
  <svg viewBox="0 0 220 150" preserveAspectRatio="xMidYMid slice">
    <rect width="220" height="150" fill="#aee3ff"/>
    <circle cx="110" cy="75" r="34" fill="#fff"/>
    <path d="M110 48 L126 78 L110 92 L94 78 Z" fill="#3a86ff"/>
    <path d="M110 48 L126 78 L110 66 Z" fill="#0d0d12"/>
    <path d="M40 110 L60 84 L80 110 Z" fill="#3a86ff"/><path d="M140 110 L160 84 L180 110 Z" fill="#3a86ff"/>
    <path d="M60 84 L60 60 M160 84 L160 60" stroke="#0d0d12" strokeWidth="3"/>
    <circle cx="60" cy="54" r="8" fill="#fff" stroke="#0d0d12" strokeWidth="3"/>
    <circle cx="160" cy="54" r="8" fill="#fff" stroke="#0d0d12" strokeWidth="3"/>
  </svg>
);

const ArtDePIN = (
  <svg viewBox="0 0 220 150" preserveAspectRatio="xMidYMid slice">
    <rect width="220" height="150" fill="#7cc4ff"/>
    <rect x="46" y="44" width="128" height="64" rx="24" fill="#fff"/>
    <rect x="46" y="44" width="128" height="64" rx="24" fill="none" stroke="#0d0d12" strokeWidth="3"/>
    <text x="110" y="84" fontSize="26" fontWeight="800" textAnchor="middle" fill="#0d0d12">DePIN</text>
    <path d="M70 44 L86 24 M150 44 L134 24" stroke="#0d0d12" strokeWidth="4" strokeLinecap="round"/>
    <circle cx="90" cy="20" r="6" fill="#fff" stroke="#0d0d12" strokeWidth="3"/>
    <circle cx="130" cy="20" r="6" fill="#fff" stroke="#0d0d12" strokeWidth="3"/>
    <circle cx="110" cy="126" r="10" fill="#3a86ff" stroke="#0d0d12" strokeWidth="3"/>
  </svg>
);

const ArtRWA = (
  <svg viewBox="0 0 220 150" preserveAspectRatio="xMidYMid slice">
    <rect width="220" height="150" fill="#ffb3c7"/>
    <ellipse cx="110" cy="112" rx="52" ry="18" fill="#fff"/>
    <ellipse cx="110" cy="112" rx="52" ry="18" fill="none" stroke="#0d0d12" strokeWidth="3"/>
    <circle cx="110" cy="72" r="30" fill="#ff5f8f"/>
    <path d="M90 72 A20 20 0 0 1 130 72 M110 52 A28 28 0 0 1 138 80 M110 92 A28 28 0 0 1 82 64" stroke="#fff" strokeWidth="3" fill="none"/>
    <rect x="88" y="60" width="44" height="24" rx="6" fill="#fff"/>
    <text x="110" y="77" fontSize="14" fontWeight="800" textAnchor="middle" fill="#ff2e88">RWA</text>
    <circle cx="52" cy="60" r="14" fill="#fff"/><text x="52" y="65" fontSize="12" fontWeight="800" textAnchor="middle" fill="#ff2e88">⌂</text>
    <circle cx="170" cy="56" r="10" fill="#fff"/><text x="170" y="60" fontSize="10" fontWeight="800" textAnchor="middle" fill="#ff2e88">@</text>
  </svg>
);

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
function Card({ tags, title, desc, date, mins, art, badge = "Beginner" }: {
  tags: string[]; title: string; desc: string; date: string; mins: number; art: React.ReactNode; badge?: string;
}) {
  return (
    <article className="ac-card">
      <div className="ac-thumb"><Badge>{badge}</Badge>{art}</div>
      <div className="ac-tags">{tags.map((t) => <Tag key={t}>{t}</Tag>)}</div>
      <h3>{_t(title)}</h3>
      <p className="ac-desc">{_t(desc)}</p>
      <p className="ac-meta">{date} • {mins} min</p>
    </article>
  );
}

export default function Academy() {
  return (
    <SiteLayout>
      <Seo title="Blockscaner Academy — Learn crypto, trading and economics" description="Guides, courses and market explainers — written to make crypto make sense." />
      <div className="ac-wrap" data-testid="academy-page">

        {/* Hero — featured article (exact reference layout) */}
        <section className="ac-hero" data-testid="academy-hero">
          <div className="ac-hero-copy">
            <Tag>Ethereum</Tag>
            <h1>{_t("The genesis of")}<br />{_t("Ethereum: the")}<br />{_t("story of the ICO")}</h1>
            <p className="ac-desc">{_t("The Ethereum ICO showcased an innovative fundraising model that inspired numerous projects and entrepreneurs.")}</p>
            <p className="ac-meta">October 9, 2026&nbsp;&nbsp;•&nbsp;&nbsp;10 min</p>
          </div>
          <div className="ac-hero-thumb">
            <Badge>Beginner</Badge>
            {ArtEthereumNote}
          </div>
        </section>

        {/* Cryptocurrencies */}
        <section className="ac-cat">
          <div className="ac-cat-head">
            <h2>{_t("Cryptocurrencies")}</h2>
            <a className="ac-more" href="#" onClick={(e) => e.preventDefault()}>{_t("See more")}</a>
          </div>
          <div className="ac-grid">
            <Card tags={["Ethereum"]} title="The genesis of Ethereum: the story of the ICO"
              desc="The Ethereum ICO showcased an innovative fundraising model that inspired numerous projects and entrepreneurs."
              date="October 9, 2026" mins={10} art={ArtEthereumNote} />
            <Card tags={["Bitcoin"]} title="What is Bitcoin and how does it work?"
              desc="Bitcoin is the first cryptocurrency ever created, the most durable, strong and secure. Find out everything about its story and its functioning."
              date="October 8, 2026" mins={11} art={ArtBitcoin} />
            <Card tags={["Meme"]} title="Popcat: what it is and how it works"
              desc="POPCAT: what it is and how the 'pop' cat meme coin works"
              date="May 8, 2026" mins={7} art={ArtPopcat} />
          </div>
        </section>

        {/* Easy Economics */}
        <section className="ac-cat">
          <div className="ac-cat-head">
            <h2>{_t("Easy Economics")}</h2>
            <a className="ac-more" href="#" onClick={(e) => e.preventDefault()}>{_t("See more")}</a>
          </div>
          <div className="ac-grid">
            <Card tags={["Stocks"]} title="What are bonds and how do they work?"
              desc="What are bonds, and how do they work? The financial instruments that reduce the portfolio risk"
              date="April 17, 2026" mins={14} art={ArtBonds} />
            <Card tags={["Stocks"]} title="Options: what are they and how do they work?"
              desc="Options in finance are contracts giving the right, but not the obligation, to buy or sell an asset at a set price by a certain date, with a paid premium."
              date="September 10, 2024" mins={5} art={ArtOptions} />
            <Card tags={["Stocks"]} title="Stakeholders: who they are and how to identify them"
              desc="What is a stakeholder? Discover the meaning of stakeholders, their types, practical examples, and the process of stakeholder mapping."
              date="June 25, 2024" mins={5} art={ArtStake} />
          </div>
        </section>

        {/* Technology */}
        <section className="ac-cat">
          <div className="ac-cat-head">
            <h2>{_t("Technology")}</h2>
            <a className="ac-more" href="#" onClick={(e) => e.preventDefault()}>{_t("See more")}</a>
          </div>
          <div className="ac-grid">
            <Card tags={["Ethereum"]} title="ERC-8004: The Future of AI on Ethereum"
              desc="The Ethereum ERC-8004 update is here: the new standard that promises a new lease of life for AI agents."
              date="March 31, 2026" mins={8} art={ArtERC} />
            <Card tags={["DeFi"]} badge="Principiante" title="DePIN: what they are and how decentralized physical infrastructure networks work"
              desc="Che cos'è il DePIN? La tecnologia blockchain che sta rivoluzionando le infrastrutture fisiche decentralizzate"
              date="March 19, 2026" mins={8} art={ArtDePIN} />
            <Card tags={["DeFi"]} title="RWA: what they are and how they work"
              desc="Real World Assets (RWA): the new revolution in the global financial system"
              date="February 6, 2026" mins={11} art={ArtRWA} />
          </div>
        </section>

      </div>
    </SiteLayout>
  );
}
