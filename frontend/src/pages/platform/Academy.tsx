import SiteLayout from "@/components/site/SiteLayout";
import Seo from "@/components/Seo";
import { t as _t } from "@/i18n";

/* ---------- Reusable pieces ---------- */

function Badge({ children }: { children: React.ReactNode }) {
  return <span className="ac-badge"><i />{children}</span>;
}

function Tag({ children }: { children: React.ReactNode }) {
  return <span className="ac-tag">{children}</span>;
}

function Card({ badge = "Beginner", tags, title, desc, date, mins, art }: {
  badge?: string; tags: string[]; title: string; desc: string; date: string; mins: number; art: React.ReactNode;
}) {
  return (
    <article className="ac-card">
      <div className="ac-thumb">
        <Badge>{badge}</Badge>
        {art}
      </div>
      <div className="ac-tags">{tags.map((t) => <Tag key={t}>{t}</Tag>)}</div>
      <h3>{_t(title)}</h3>
      <p className="ac-desc">{_t(desc)}</p>
      <p className="ac-meta">{date} • {mins} min</p>
    </article>
  );
}

function Category({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="ac-cat">
      <div className="ac-cat-head">
        <h2>{_t(title)}</h2>
        <a className="ac-more" href="#" onClick={(e) => e.preventDefault()}>{_t("See more")}</a>
      </div>
      <div className="ac-grid">{children}</div>
    </section>
  );
}

/* ---------- Thumbnail artwork (SVG, matching the reference style) ---------- */

const ArtRaydium = (
  <svg viewBox="0 0 220 150" preserveAspectRatio="xMidYMid slice">
    <rect width="220" height="150" fill="#4fc3f7"/>
    <path d="M0 150 L60 60 L110 110 L170 30 L220 90 V150 Z" fill="#0d0d12"/>
    <path d="M40 150 L110 70 L180 150 Z" fill="#8be2ff" opacity=".8"/>
    <circle cx="110" cy="70" r="42" fill="#fff"/>
    <circle cx="110" cy="70" r="34" fill="#0d0d12"/>
    <path d="M110 48 L128 82 H92 Z" fill="#fff"/>
    <circle cx="188" cy="34" r="8" fill="#0d0d12"/><circle cx="200" cy="56" r="5" fill="#0d0d12"/>
    <rect x="96" y="60" width="28" height="20" rx="4" fill="#4fc3f7"/>
    <text x="110" y="75" fontSize="16" fontWeight="800" textAnchor="middle" fill="#0d0d12">R</text>
  </svg>
);

const ArtFetch = (
  <svg viewBox="0 0 220 150" preserveAspectRatio="xMidYMid slice">
    <rect width="220" height="150" fill="#0d0d12"/>
    <circle cx="110" cy="75" r="34" fill="#ffd23f"/>
    <circle cx="110" cy="75" r="26" fill="#fff"/>
    <circle cx="110" cy="75" r="18" fill="#0d0d12"/>
    {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
      <circle key={a} cx={110 + 11 * Math.cos((a * Math.PI) / 180)} cy={75 + 11 * Math.sin((a * Math.PI) / 180)} r="2.4" fill="#ffd23f"/>
    ))}
    <rect x="18" y="92" width="36" height="36" rx="4" fill="#ffd23f"/>
    <rect x="170" y="24" width="34" height="34" rx="4" fill="#ffd23f"/>
    <rect x="28" y="28" width="20" height="20" rx="3" fill="#fff"/>
    <rect x="172" y="98" width="20" height="20" rx="3" fill="#fff"/>
  </svg>
);

const ArtFutures = (
  <svg viewBox="0 0 220 150" preserveAspectRatio="xMidYMid slice">
    <rect width="220" height="150" fill="#7cc4ff"/>
    <path d="M0 110 L40 50 L80 90 L120 40 L170 95 L220 55 V150 H0 Z" fill="#0d0d12"/>
    <path d="M30 150 L80 80 L130 130 L180 70 L220 120 V150 Z" fill="#3a86ff"/>
    <circle cx="120" cy="60" r="18" fill="#fff"/>
    <circle cx="120" cy="60" r="12" fill="#7cc4ff"/>
    <circle cx="34" cy="90" r="8" fill="#fff"/><circle cx="34" cy="90" r="5" fill="#3a86ff"/>
    <circle cx="190" cy="118" r="10" fill="#fff"/><circle cx="190" cy="118" r="6" fill="#0d0d12"/>
  </svg>
);

const ArtWyckoff = (
  <svg viewBox="0 0 220 150" preserveAspectRatio="xMidYMid slice">
    <rect width="220" height="150" fill="#9fdcff"/>
    <path d="M0 120 L20 60 L40 100 L60 40 L80 95 L100 30 L120 90 L140 50 L160 105 L180 45 L200 95 L220 60" fill="none" stroke="#fff" strokeWidth="6"/>
    <path d="M0 130 L20 80 L40 115 L60 60 L80 110 L100 50 L120 105 L140 70 L160 120 L180 65 L200 110 L220 80" fill="none" stroke="#0d0d12" strokeWidth="3"/>
    <ellipse cx="100" cy="110" rx="12" ry="6" fill="#fff"/><ellipse cx="140" cy="30" rx="12" ry="6" fill="#fff"/>
  </svg>
);

const ArtSupertrend = (
  <svg viewBox="0 0 220 150" preserveAspectRatio="xMidYMid slice">
    <rect width="220" height="150" fill="#d9f0ff"/>
    <rect x="30" y="30" width="160" height="90" rx="6" fill="#fff" stroke="#0d0d12" strokeWidth="3"/>
    <rect x="86" y="120" width="48" height="8" rx="4" fill="#0d0d12"/>
    {[40, 58, 76, 94, 112, 130, 148, 166].map((x, i) => (
      <g key={x}>
        <rect x={x} y={i % 2 ? 55 : 45} width="8" height={i % 2 ? 22 : 30} fill={i % 3 === 0 ? "#3a86ff" : "#7cc4ff"}/>
        <line x1={x + 4} y1={i % 2 ? 48 : 38} x2={x + 4} y2={i % 2 ? 82 : 82} stroke="#0d0d12" strokeWidth="2"/>
      </g>
    ))}
    <path d="M36 90 Q110 20 186 96" fill="none" stroke="#0d0d12" strokeWidth="2.4"/>
    <rect x="120" y="12" width="76" height="22" rx="6" fill="#3a86ff"/>
    <text x="158" y="27" fontSize="11" fontWeight="800" textAnchor="middle" fill="#fff">Supertrend</text>
  </svg>
);

const ArtSonic = (
  <svg viewBox="0 0 220 150" preserveAspectRatio="xMidYMid slice">
    <rect width="220" height="150" fill="#c9a7ff"/>
    <circle cx="110" cy="90" r="46" fill="#fff"/>
    <path d="M110 44 C126 60 150 66 172 60 C160 80 150 96 140 110 C126 100 116 84 110 70 C104 84 94 100 80 110 C70 96 60 80 48 60 C70 66 94 60 110 44 Z" fill="#8b5cf6"/>
    <path d="M110 44 C116 56 118 66 118 76 C112 66 108 56 110 44 Z" fill="#fff"/>
    <circle cx="110" cy="90" r="46" fill="none" stroke="#0d0d12" strokeWidth="3"/>
  </svg>
);

const ArtPoison = (
  <svg viewBox="0 0 220 150" preserveAspectRatio="xMidYMid slice">
    <rect width="220" height="150" fill="#d9ccff"/>
    <path d="M60 20 L40 60 L60 100" fill="none" stroke="#0d0d12" strokeWidth="3"/>
    <path d="M170 30 L190 70 L170 110" fill="none" stroke="#0d0d12" strokeWidth="3"/>
    <path d="M110 40 L140 110 H80 Z" fill="#fff" stroke="#0d0d12" strokeWidth="3"/>
    <circle cx="110" cy="82" r="6" fill="#8b5cf6"/>
    <rect x="106" y="66" width="8" height="18" rx="4" fill="#8b5cf6"/>
    <path d="M88 96 C80 108 96 114 100 104 C104 96 92 92 88 96 Z" fill="#8b5cf6"/>
    <path d="M132 96 C140 108 124 114 120 104 C116 96 128 92 132 96 Z" fill="#8b5cf6"/>
    <path d="M60 118 L80 130 M160 118 L140 130" stroke="#0d0d12" strokeWidth="3" strokeLinecap="round"/>
  </svg>
);

const ArtBerachain = (
  <svg viewBox="0 0 220 150" preserveAspectRatio="xMidYMid slice">
    <rect width="220" height="150" fill="#ffd23f"/>
    {[0, 1, 2, 3, 4, 5].map((i) => (
      <path key={i} d={`M${30 + i * 32} 20 L${46 + i * 32} 28 L${46 + i * 32} 44 L${30 + i * 32} 52 L${14 + i * 32} 44 L${14 + i * 32} 28 Z`} fill="none" stroke="#0d0d12" strokeWidth="2"/>
    ))}
    <circle cx="110" cy="80" r="30" fill="#fff"/>
    <circle cx="110" cy="80" r="24" fill="#ffd23f"/>
    <circle cx="110" cy="80" r="24" fill="none" stroke="#0d0d12" strokeWidth="3"/>
    <text x="110" y="85" fontSize="13" fontWeight="800" textAnchor="middle" fill="#0d0d12">₿₿</text>
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

const ArtEthereum = (
  <svg viewBox="0 0 220 150" preserveAspectRatio="xMidYMid slice">
    <rect width="220" height="150" fill="#9ff5d2"/>
    <rect x="20" y="24" width="180" height="104" rx="8" fill="none" stroke="#0d0d12" strokeWidth="3"/>
    <circle cx="36" cy="38" r="4" fill="#0d0d12"/><circle cx="50" cy="38" r="4" fill="#0d0d12"/><circle cx="64" cy="38" r="4" fill="#0d0d12"/>
    <line x1="20" y1="48" x2="200" y2="48" stroke="#0d0d12" strokeWidth="3"/>
    <circle cx="80" cy="88" r="26" fill="#fff" stroke="#0d0d12" strokeWidth="3"/>
    <path d="M80 70 L92 90 L80 98 L68 90 Z" fill="#0d0d12"/>
    <circle cx="140" cy="88" r="26" fill="#fff" stroke="#0d0d12" strokeWidth="3"/>
    <circle cx="140" cy="88" r="16" fill="none" stroke="#0d0d12" strokeWidth="3"/>
    <circle cx="140" cy="88" r="8" fill="none" stroke="#0d0d12" strokeWidth="3"/>
    <circle cx="140" cy="88" r="3" fill="#0d0d12"/>
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

/* ---------- Page ---------- */

export default function Academy() {
  return (
    <SiteLayout>
      <Seo title="Blockscaner Academy — Learn crypto, trading and economics" description="Guides, courses and market explainers — written to make crypto make sense." />

      <div className="ac-wrap" data-testid="academy-page">
        {/* Featured hero — top of the page */}
        <section className="ac-feature" data-testid="academy-feature">
          <div className="ac-feature-copy">
            <Tag>Ethereum</Tag>
            <h2>{_t("The genesis of Ethereum: the story of the ICO")}</h2>
            <p className="ac-desc">{_t("The Ethereum ICO showcased an innovative fundraising model that inspired numerous projects and entrepreneurs.")}</p>
            <p className="ac-meta">October 9, 2026 • 10 min</p>
          </div>
          <div className="ac-feature-thumb">
            <Badge>Beginner</Badge>
            {ArtEthereum}
          </div>
        </section>

        {/* Cryptonomics */}
        <Category title="Cryptonomics">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 340px))", gap: "2rem 1.6rem" }}>
            <Card tags={["Crypto Market"]} title="Raydium: what it is and how it works"
              desc="What is Raydium and how does it work? We answer this and other key questions about Solana's most popular DEX"
              date="November 21, 2024" mins={6} art={ArtRaydium} />
            <Card tags={["Crypto Market", "Proof-Of-Stake"]} title="Understanding Fetch.ai (FET): a complete guide with essential information"
              desc="Fetch.ai merges AI with blockchain. Discover how FET cryptocurrency powers its innovative tech and applications in AI."
              date="December 20, 2023" mins={5} art={ArtFetch} />
          </div>
        </Category>

        {/* Trading */}
        <Category title="Trading">
          <Card tags={["Derivati"]} title="Futures: what they are and how they work"
            desc="What are futures and how do they work? Discover these unique derivative financial instruments widely used by expert traders."
            date="November 26, 2025" mins={8} art={ArtFutures} />
          <Card tags={["Crypto Technical Analysis"]} title="Wyckoff theory: what is it, and how does it work?"
            desc="Wyckoff theory is a trading method focused on market cycles, guiding traders in understanding price movements through accumulation and distribution."
            date="November 21, 2024" mins={5} art={ArtWyckoff} />
          <Card tags={["Crypto Technical Analysis"]} title="Supertrend Indicator: What is it, and how does it work?"
            desc="Learn what the Supertrend indicator is, what it measures and how to use it for your trading strategies for cryptocurrencies."
            date="March 22, 2024" mins={7} art={ArtSupertrend} />
        </Category>

        {/* Blockchain */}
        <Category title="Blockchain">
          <Card tags={["DeFi"]} title="Sonic Blockchain: What Is It and How Does It Work?"
            desc="Discover Sonic: the ultra-fast EVM blockchain evolved from Fantom. 400k TPS, sub-second finality, and 90% fee rewards for developers."
            date="November 26, 2025" mins={10} art={ArtSonic} />
          <Card tags={["Crypto Security"]} title="Address poisoning: what it is and how to defend against it"
            desc="Address poisoning is a sophisticated social engineering scam targeting crypto transactions. Learn how this attack works, its devastating impact, and essential strategies to protect your crypto fund"
            date="October 15, 2025" mins={8} art={ArtPoison} />
          <Card tags={["DeFi", "Proof-Of-Stake"]} title="Berachain: what it is and how it revolutionises Liquidity in Web3"
            desc="Discover how Berachain, a hybrid blockchain, is revolutionising Web3 with its Proof-of-Liquidity mechanism, blending security and liquidity management."
            date="September 24, 2025" mins={15} art={ArtBerachain} />
        </Category>

        {/* Easy Economics */}
        <Category title="Easy Economics">
          <Card tags={["Stocks"]} title="What are bonds and how do they work?"
            desc="What are bonds, and how do they work? The financial instruments that reduce the portfolio risk"
            date="April 17, 2026" mins={14} art={ArtBonds} />
          <Card tags={["Stocks"]} title="Options: what are they and how do they work?"
            desc="Options in finance are contracts giving the right, but not the obligation, to buy or sell an asset at a set price by a certain date, with a paid premium."
            date="September 10, 2024" mins={5} art={ArtOptions} />
          <Card tags={["Stocks"]} title="Stakeholders: who they are and how to identify them"
            desc="What is a stakeholder? Discover the meaning of stakeholders, their types, practical examples, and the process of stakeholder mapping."
            date="June 25, 2024" mins={5} art={ArtStake} />
        </Category>

        {/* Technology */}
        <Category title="Technology">
          <Card tags={["Ethereum"]} title="ERC-8004: The Future of AI on Ethereum"
            desc="The Ethereum ERC-8004 update is here: the new standard that promises a new lease of life for AI agents."
            date="March 31, 2026" mins={8} art={ArtERC} />
          <Card tags={["DeFi"]} badge="Principiante" title="DePIN: what they are and how decentralized physical infrastructure networks work"
            desc="Che cos'è il DePIN? La tecnologia blockchain che sta rivoluzionando le infrastrutture fisiche decentralizzate"
            date="March 19, 2026" mins={8} art={ArtDePIN} />
          <Card tags={["DeFi"]} title="RWA: what they are and how they work"
            desc="Real World Assets (RWA): the new revolution in the global financial system"
            date="February 6, 2026" mins={11} art={ArtRWA} />
        </Category>

        {/* Cryptocurrencies */}
        <Category title="Cryptocurrencies">
          <Card tags={["Ethereum"]} title="The genesis of Ethereum: the story of the ICO"
            desc="The Ethereum ICO showcased an innovative fundraising model that inspired numerous projects and entrepreneurs."
            date="October 9, 2026" mins={10} art={ArtEthereum} />
          <Card tags={["Bitcoin"]} title="What is Bitcoin and how does it work?"
            desc="Bitcoin is the first cryptocurrency ever created, the most durable, strong and secure. Find out everything about its story and its functioning."
            date="October 8, 2026" mins={11} art={ArtBitcoin} />
          <Card tags={["Meme"]} title="Popcat: what it is and how it works"
            desc="POPCAT: what it is and how the 'pop' cat meme coin works"
            date="May 8, 2026" mins={7} art={ArtPopcat} />
        </Category>
      </div>
    </SiteLayout>
  );
}
