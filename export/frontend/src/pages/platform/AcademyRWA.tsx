import SiteLayout from "@/components/site/SiteLayout";
import Seo from "@/components/Seo";
import { t as _t } from "@/i18n";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

/* RWA hero artwork — premium dark vault scene */
const ArtRWA = (
  <svg viewBox="0 0 340 210" preserveAspectRatio="xMidYMid slice">
    <defs>
      <radialGradient id="rwaBg" cx="50%" cy="30%" r="80%">
        <stop offset="0" stopColor="#2a1e3f"/><stop offset="1" stopColor="#0d0b16"/>
      </radialGradient>
      <linearGradient id="rwaGlobe" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#c9b8ff"/><stop offset=".5" stopColor="#8b5cf6"/><stop offset="1" stopColor="#5b21b6"/>
      </linearGradient>
      <linearGradient id="rwaPed" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#3a2d5c"/><stop offset="1" stopColor="#17122a"/>
      </linearGradient>
      <linearGradient id="rwaGold" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stopColor="#f5d98a"/><stop offset=".5" stopColor="#e8b94a"/><stop offset="1" stopColor="#c9932a"/>
      </linearGradient>
      <linearGradient id="rwaRing" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stopColor="#c9b8ff" stopOpacity=".1"/><stop offset=".5" stopColor="#c9b8ff" stopOpacity=".85"/><stop offset="1" stopColor="#c9b8ff" stopOpacity=".1"/>
      </linearGradient>
    </defs>
    <rect width="340" height="210" fill="url(#rwaBg)"/>
    {/* ambient glow */}
    <ellipse cx="170" cy="96" rx="120" ry="80" fill="#8b5cf6" opacity=".12"/>
    {/* floor reflection */}
    <ellipse cx="170" cy="186" rx="110" ry="14" fill="#8b5cf6" opacity=".1"/>
    {/* light beams */}
    <g fill="#c9b8ff" opacity=".05">
      <path d="M80 0 L150 210 L60 210 Z"/>
      <path d="M260 0 L190 210 L280 210 Z"/>
    </g>
    {/* sparkle particles */}
    <g fill="#c9b8ff">
      <circle cx="60" cy="44" r="1.6" opacity=".8"/><circle cx="286" cy="40" r="1.4" opacity=".7"/>
      <circle cx="44" cy="120" r="1.3" opacity=".6"/><circle cx="300" cy="118" r="1.5" opacity=".7"/>
      <circle cx="120" cy="26" r="1.2" opacity=".5"/><circle cx="222" cy="24" r="1.3" opacity=".55"/>
    </g>
    {/* orbit rings */}
    <ellipse cx="170" cy="92" rx="104" ry="30" fill="none" stroke="url(#rwaRing)" strokeWidth="1.2" transform="rotate(-16 170 92)"/>
    <ellipse cx="170" cy="92" rx="118" ry="36" fill="none" stroke="url(#rwaRing)" strokeWidth=".9" opacity=".6" transform="rotate(-16 170 92)"/>
    {/* globe */}
    <circle cx="170" cy="88" r="48" fill="url(#rwaGlobe)"/>
    <circle cx="170" cy="88" r="48" fill="none" stroke="#e9d5ff" strokeWidth="1" opacity=".6"/>
    {/* globe wireframe */}
    <g stroke="#e9d5ff" strokeWidth="1" fill="none" opacity=".65">
      <ellipse cx="170" cy="88" rx="48" ry="15"/>
      <ellipse cx="170" cy="88" rx="48" ry="30"/>
      <ellipse cx="170" cy="88" rx="48" ry="42"/>
      <ellipse cx="170" cy="88" rx="13" ry="48"/>
      <ellipse cx="170" cy="88" rx="28" ry="48"/>
      <ellipse cx="170" cy="88" rx="40" ry="48"/>
    </g>
    {/* globe sheen */}
    <ellipse cx="152" cy="68" rx="20" ry="12" fill="#fff" opacity=".14" transform="rotate(-22 152 68)"/>
    {/* RWA label */}
    <rect x="141" y="74" width="58" height="28" rx="14" fill="#0d0b16" stroke="url(#rwaGold)" strokeWidth="1.6"/>
    <text x="170" y="93" fontSize="15" fontWeight="800" textAnchor="middle" fill="#f5d98a" letterSpacing="1.5">RWA</text>
    {/* house chip */}
    <g transform="rotate(-14 104 98)">
      <ellipse cx="104" cy="98" rx="21" ry="27" fill="#17122a" stroke="#c9b8ff" strokeWidth="1.4"/>
      <path d="M95 100 L104 91 L113 100 M97 98 v9 h14 v-9" fill="none" stroke="#f5d98a" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
    </g>
    {/* car chip */}
    <circle cx="238" cy="70" r="21" fill="#17122a" stroke="#c9b8ff" strokeWidth="1.4"/>
    <path d="M228 72 h20 l-3 -8 h-14 Z M228 72 v6 h20 v-6" fill="none" stroke="#f5d98a" strokeWidth="2" strokeLinejoin="round"/>
    <circle cx="232" cy="79" r="1.9" fill="#f5d98a"/><circle cx="244" cy="79" r="1.9" fill="#f5d98a"/>
    {/* pedestal */}
    <path d="M128 150 h84 l8 30 a76 16 0 0 1 -100 0 Z" fill="url(#rwaPed)"/>
    <ellipse cx="170" cy="150" rx="42" ry="12" fill="#241b3e" stroke="#c9b8ff" strokeWidth="1" opacity=".9"/>
    <ellipse cx="170" cy="182" rx="84" ry="16" fill="none" stroke="#c9b8ff" strokeWidth="1" opacity=".4"/>
    {/* gold base line */}
    <path d="M96 196 h148" stroke="url(#rwaGold)" strokeWidth="1.4" opacity=".7"/>
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

export default function AcademyRWA() {
  return (
    <SiteLayout>
      <Seo title="RWA: what they are and how they work — Blockscaner Academy" description="Real World Assets (RWA): the new revolution in the global financial system." />
      <div className="ac-article" data-testid="academy-article-rwa">

        {/* header row */}
        <div className="ac-article-top">
          <Link to="/products/academy" className="ac-back" aria-label="Back to Academy"><ArrowLeft size={18} /></Link>
          <Tag>DeFi</Tag>
        </div>

        <div className="ac-article-head">
          <h1>{_t("RWA: what they are")}<br />{_t("and how they work")}</h1>
          <div className="ac-share">
            <span className="ac-share-ic" aria-label="Share on X"><ShareIcon d="M18.9 2H22l-6.8 7.8L23 22h-6.3l-4.9-6.4L6.2 22H3l7.3-8.3L1.5 2h6.4l4.4 5.9L18.9 2zm-1.1 18h1.7L7.1 3.9H5.3L17.8 20z"/></span>
            <span className="ac-share-ic" aria-label="Share on Facebook"><ShareIcon d="M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.4h-1.2c-1.2 0-1.6.8-1.6 1.6V12h2.7l-.4 2.9h-2.3v7A10 10 0 0 0 22 12z"/></span>
            <span className="ac-share-ic" aria-label="Share on LinkedIn"><ShareIcon d="M20.4 20.4h-3.5v-5.6c0-1.3 0-3-1.9-3s-2.1 1.4-2.1 2.9v5.7H9.4V9h3.4v1.6h.1c.5-.9 1.7-1.9 3.4-1.9 3.6 0 4.3 2.4 4.3 5.5v6.2zM5.3 7.4a2 2 0 1 1 0-4.1 2 2 0 0 1 0 4.1zM7.1 20.4H3.6V9h3.5v11.4z"/></span>
          </div>
        </div>
        <p className="ac-meta">February 6, 2026&nbsp;&nbsp;•&nbsp;&nbsp;11 min</p>

        {/* hero image */}
        <div className="ac-article-thumb">
          <Badge>Beginner</Badge>
          {ArtRWA}
        </div>

        {/* You will learn */}
        <div className="ac-learn">
          <h2>{_t("You will learn")}</h2>
          <ul>
            <li><a href="#rwa-revolution">{_t("Real World Assets (RWA): the new revolution in the global financial system")}</a></li>
            <li><a href="#rwa-technically">{_t("What are RWAs technically?")}</a></li>
            <li><a href="#rwa-tokenisation">{_t("How the tokenisation process works")}</a></li>
            <li><a href="#rwa-fleap">{_t("A practical example: the Fleap case")}</a></li>
            <li><a href="#rwa-conclusions">{_t("Conclusions")}</a></li>
          </ul>
        </div>

        {/* Article body */}
        <div className="ac-body">
          <h2 id="rwa-revolution">{_t("Real World Assets (RWA): the new revolution in the global financial system")}</h2>
          <p>Real World Assets (RWAs) are a blockchain-based innovation that has the potential to transform the way we transfer and hold assets, both financial and non-financial.</p>
          <p>In 2026, RWAs are experiencing significant interest and adoption, particularly among institutional entities, due to their key features, including efficiency, decentralisation, and accessibility.</p>
          <p>As our CEO, Andrea Ferrero, aptly puts it, <i>"If we have been using tracks built after the Second World War, tokenisation is allowing us to move financial securities and more onto new tracks."</i> If you are curious to find out what RWAs are and how they work, this is the article for you.</p>

          {/* Google Trends: RWA interest over time */}
          <section className="ac-rwa-trends" data-testid="rwa-trends">
            <div className="ac-summary-brand">
              <span className="ac-summary-check"><svg viewBox="0 0 24 24" width="16" height="16"><path d="M5 13l4 4L19 7" stroke="#fff" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
              <span>academy</span>
            </div>
            <div className="ac-rwa-trends-card">
              {/* search row */}
              <div className="ac-rwa-trends-top">
                <div className="ac-rwa-trends-search">
                  <span className="ac-rwa-trends-dot" />
                  <span className="ac-rwa-trends-term">RWA<br /><i>Search term</i></span>
                </div>
                <div className="ac-rwa-trends-compare">+ Compare</div>
              </div>
              {/* filter row */}
              <div className="ac-rwa-trends-filters">
                <span>All over the world ▾</span>
                <span>2004 - Present ▾</span>
                <span>All categories ▾</span>
                <span>Google Search ▾</span>
              </div>
              {/* chart */}
              <div className="ac-rwa-trends-chart">
                <div className="ac-rwa-trends-charthead">
                  <span>Interest over time ⓘ</span>
                  <span className="ac-rwa-trends-tools">⤓ &nbsp;&lt;/&gt;&nbsp; ⤢</span>
                </div>
                <svg viewBox="0 0 560 200" preserveAspectRatio="none" role="img" aria-label="RWA interest over time chart">
                  <defs>
                    <linearGradient id="rwaTrendGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0" stopColor="#4a7de0" stopOpacity=".28" />
                      <stop offset="1" stopColor="#4a7de0" stopOpacity=".02" />
                    </linearGradient>
                  </defs>
                  {/* grid */}
                  <g stroke="#eeeef3" strokeWidth="1">
                    <line x1="8" y1="30" x2="552" y2="30"/>
                    <line x1="8" y1="75" x2="552" y2="75"/>
                    <line x1="8" y1="120" x2="552" y2="120"/>
                    <line x1="8" y1="165" x2="552" y2="165"/>
                  </g>
                  {/* area */}
                  <path d="M8,150 L40,149 L80,148 L120,147 L160,146 L200,145 L240,144 L280,143 L320,142 L360,141 L390,138 L410,130 L430,120 L450,110 L470,95 L490,75 L510,55 L528,38 L544,26 L552,20 L552,168 L8,168 Z" fill="url(#rwaTrendGrad)"/>
                  {/* line */}
                  <path d="M8,150 L40,149 L80,148 L120,147 L160,146 L200,145 L240,144 L280,143 L320,142 L360,141 L390,138 L410,130 L430,120 L450,110 L470,95 L490,75 L510,55 L528,38 L544,26 L552,20" fill="none" stroke="#4a7de0" strokeWidth="2"/>
                  {/* x labels */}
                  <g fontSize="8.5" fill="#9a9aa0" textAnchor="middle">
                    <text x="60" y="186">1 gen 2004</text>
                    <text x="200" y="186">1 gen 2010</text>
                    <text x="340" y="186">1 mar 2016</text>
                    <text x="480" y="186">1 apr 2022</text>
                  </g>
                </svg>
              </div>
            </div>
          </section>

          <h2 id="rwa-technically">{_t("What are RWAs technically?")}</h2>
          <p>What are <b>RWAs</b>? Simply put, RWAs are real-world assets (such as shares, bonds, real estate, loans, or works of art) represented in <a href="#" onClick={(e) => e.preventDefault()}>decentralised finance</a> via smart contracts.</p>

          {/* RWA definition table */}
          <div className="ac-rwa-table" data-testid="rwa-table">
            <div className="ac-rwa-table-row"><b>Real asset</b><span>A legal object that has economic value (a house, a debt security, an ounce of gold, a share).</span></div>
            <div className="ac-rwa-table-row"><b>RWA token</b><span>The digital representation of the asset</span></div>
            <div className="ac-rwa-table-row"><b>Smart contract</b><span>The mechanism that regulates issuance, transfer, and rights</span></div>
            <div className="ac-rwa-table-row"><b>Blockchain</b><span>The register that guarantees transparency and immutability</span></div>
          </div>

          <p>Although the concept may seem trivial, this 'simple' innovation is triggering a <b>silent revolution in the global financial infrastructure</b>, breaking down barriers to entry and making inherently inefficient markets liquid.</p>
          <p>Historically, institutions such as banks, stock exchanges, and management companies have offered these services in an exclusive and centralised manner, forcing users to compromise on privacy, management costs, and the overall efficiency of the asset exchange process.</p>
          <p>The goal of RWAs is therefore to evolve the current financial system from an efficient but highly centralised system to an even more efficient one, while introducing decentralisation and greater access.</p>

          {/* Efficiency / Privacy-Security quadrant */}
          <section className="ac-rwa-quadsec" data-testid="rwa-quadrant">
            <div className="ac-summary-brand">
              <span className="ac-summary-check"><svg viewBox="0 0 24 24" width="16" height="16"><path d="M5 13l4 4L19 7" stroke="#fff" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
              <span>academy</span>
            </div>
            <div className="ac-rwa-quad">
              <svg viewBox="0 0 420 400" role="img" aria-label="Efficiency vs Privacy-Security quadrant">
                {/* quadrant backgrounds */}
                <rect x="60" y="36" width="150" height="150" rx="14" fill="#f1f1f4"/>
                <rect x="210" y="36" width="150" height="150" rx="14" fill="#b9f0d6"/>
                <rect x="60" y="186" width="150" height="150" rx="14" fill="#ffd0cc"/>
                <rect x="210" y="186" width="150" height="150" rx="14" fill="#f1f1f4"/>
                {/* axes */}
                <line x1="210" y1="20" x2="210" y2="356" stroke="#0f0f12" strokeWidth="1.6"/>
                <path d="M210 14 l-5 10 h10 Z" fill="#0f0f12"/>
                <line x1="48" y1="186" x2="376" y2="186" stroke="#0f0f12" strokeWidth="1.6"/>
                <path d="M382 186 l-10 -5 v10 Z" fill="#0f0f12"/>
                {/* axis labels */}
                <text x="210" y="12" fontSize="13" fontWeight="800" textAnchor="middle" fill="#0f0f12">Efficiency</text>
                <text x="376" y="206" fontSize="13" fontWeight="800" textAnchor="end" fill="#0f0f12">Privacy-Security</text>
                {/* bubbles */}
                <g>
                  <ellipse cx="136" cy="112" rx="52" ry="24" fill="#8b5cf6"/>
                  <text x="136" y="108" fontSize="10.5" fontWeight="700" textAnchor="middle" fill="#fff">Digital</text>
                  <text x="136" y="119" fontSize="10.5" fontWeight="700" textAnchor="middle" fill="#fff">Centralised</text>
                  <text x="136" y="130" fontSize="10.5" fontWeight="700" textAnchor="middle" fill="#fff">System</text>
                </g>
                <g>
                  <ellipse cx="286" cy="80" rx="54" ry="24" fill="#8b5cf6"/>
                  <text x="286" y="76" fontSize="10.5" fontWeight="700" textAnchor="middle" fill="#fff">Digital</text>
                  <text x="286" y="87" fontSize="10.5" fontWeight="700" textAnchor="middle" fill="#fff">Decentralised</text>
                  <text x="286" y="98" fontSize="10.5" fontWeight="700" textAnchor="middle" fill="#fff">System</text>
                </g>
                <g>
                  <ellipse cx="136" cy="262" rx="46" ry="20" fill="#8b5cf6"/>
                  <text x="136" y="266" fontSize="10.5" fontWeight="700" textAnchor="middle" fill="#fff">Paper System</text>
                </g>
              </svg>
            </div>
          </section>

          <p>To better understand the mission and purpose of <b>RWAs</b>, let us retrace the evolution of modern financial infrastructure by studying <b>three fundamental steps</b> that have characterised this sector: the era of the paper-based system, the era of the centralised digital system and the era of the decentralised digital system.</p>

          <h3>{_t("The era of the paper-based system (until the 1970s)")}</h3>
          <p>This was the dominant system until the early 1970s. At this stage, the transfer of value between two parties occurred exclusively through the physical exchange of paper documents (share certificates, bonds, bearer securities), which were the only means of establishing ownership of the asset.</p>
          <ul>
            <li><b>The problem:</b> ownership was tied to the physical possession of the 'piece of paper', making exchanges slow, expensive and geographically limited.</li>
          </ul>

          {/* Paper System illustration */}
          <section className="ac-rwa-era" data-testid="rwa-paper-era">
            <div className="ac-summary-brand">
              <span className="ac-summary-check"><svg viewBox="0 0 24 24" width="16" height="16"><path d="M5 13l4 4L19 7" stroke="#fff" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
              <span>academy</span>
            </div>
            <h3 className="ac-depin-prn-title">{_t("Paper System")}</h3>
            <div className="ac-rwa-era-art">
              <svg viewBox="0 0 300 230" role="img" aria-label="Paper System illustration">
                {/* big lavender circle */}
                <circle cx="150" cy="118" r="64" fill="#ece8fb" stroke="#c9b8f5" strokeWidth="1.4"/>
                {/* document icon */}
                <rect x="128" y="86" width="44" height="58" rx="7" fill="#0f0f12"/>
                <g stroke="#fff" strokeWidth="4.6" strokeLinecap="round">
                  <path d="M137 100 h26"/><path d="M137 112 h26"/><path d="M137 124 h14"/>
                </g>
                {/* hand chips */}
                <circle cx="222" cy="66" r="26" fill="#ece8fb" stroke="#c9b8f5" strokeWidth="1.4"/>
                <g fill="none" stroke="#0f0f12" strokeWidth="2.4" strokeLinecap="round">
                  <circle cx="218" cy="60" r="3.4"/>
                  <path d="M210 72 q8 -6 16 0 M214 76 h8"/>
                </g>
                <circle cx="96" cy="168" r="24" fill="#ece8fb" stroke="#c9b8f5" strokeWidth="1.4"/>
                <g fill="none" stroke="#0f0f12" strokeWidth="2.4" strokeLinecap="round">
                  <circle cx="92" cy="162" r="3.4"/>
                  <path d="M84 174 q8 -6 16 0 M88 178 h8"/>
                </g>
              </svg>
            </div>
          </section>

          <h3>{_t("The era of the centralised digital system (from the 1970s to 2020)")}</h3>
          <p>This phase began with the start of digitisation in the United States, particularly with the founding of <b>NASDAQ</b> in 1971 (the world's first electronic stock market). In this system, ownership transfers almost instantly with a single click, effectively eliminating physical media.</p>
          <ul>
            <li><b>The problem:</b> although much more efficient than the paper-based model, this system is inherently centralised. To function, it requires a trusted intermediary (banks, brokers, clearinghouses) to maintain records of individual ownership and validate transactions, potentially in a subjective or opaque manner. In this context, the need for a <b>decentralised</b> and <b>permissionless</b> alternative emerges.</li>
          </ul>

          {/* Centralised Exchange (CEX) illustration */}
          <section className="ac-rwa-era" data-testid="rwa-cex-era">
            <div className="ac-summary-brand">
              <span className="ac-summary-check"><svg viewBox="0 0 24 24" width="16" height="16"><path d="M5 13l4 4L19 7" stroke="#fff" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
              <span>academy</span>
            </div>
            <h3 className="ac-depin-prn-title">{_t("Centralised Exchange (CEX)")}</h3>
            <div className="ac-rwa-cex-art">
              <svg viewBox="0 0 300 260" role="img" aria-label="Centralised Exchange illustration">
                {/* hub */}
                <g>
                  <circle cx="150" cy="130" r="24" fill="#ece8fb" stroke="#0f0f12" strokeWidth="2"/>
                  <path d="M138 138 v-14 l12 -8 12 8 v14 h-6 v-10 h-12 v10 Z" fill="#0f0f12"/>
                  <rect x="136" y="138" width="28" height="4" rx="2" fill="#0f0f12"/>
                </g>
                {/* hexagon spokes */}
                <g stroke="#0f0f12" strokeWidth="1.4">
                  <line x1="150" y1="106" x2="150" y2="70"/>
                  <line x1="150" y1="154" x2="150" y2="190"/>
                  <line x1="129" y1="118" x2="98" y2="100"/>
                  <line x1="171" y1="118" x2="202" y2="100"/>
                  <line x1="129" y1="142" x2="98" y2="160"/>
                  <line x1="171" y1="142" x2="202" y2="160"/>
                </g>
                <g stroke="#0f0f12" strokeWidth="1.4" fill="none">
                  <path d="M150 70 L202 100 L202 160 L150 190 L98 160 L98 100 Z"/>
                </g>
                <g fill="#0f0f12">
                  <circle cx="150" cy="70" r="3"/><circle cx="150" cy="190" r="3"/>
                  <circle cx="98" cy="100" r="3"/><circle cx="202" cy="100" r="3"/>
                  <circle cx="98" cy="160" r="3"/><circle cx="202" cy="160" r="3"/>
                </g>
                {/* people chips */}
                <g>
                  <circle cx="150" cy="46" r="22" fill="#ece8fb" stroke="#c9b8f5" strokeWidth="1.2"/>
                  <circle cx="150" cy="42" r="5.4" fill="#0f0f12"/>
                  <path d="M142 58 q8 -10 16 0 Z" fill="#0f0f12"/>
                  <rect x="149" y="46" width="2" height="9" fill="#fff"/>
                </g>
                <g>
                  <circle cx="150" cy="214" r="22" fill="#ece8fb" stroke="#c9b8f5" strokeWidth="1.2"/>
                  <circle cx="150" cy="210" r="5.4" fill="#0f0f12"/>
                  <path d="M142 226 q8 -10 16 0 Z" fill="#0f0f12"/>
                  <rect x="149" y="214" width="2" height="9" fill="#fff"/>
                </g>
                <g>
                  <circle cx="78" cy="90" r="22" fill="#ece8fb" stroke="#c9b8f5" strokeWidth="1.2"/>
                  <circle cx="78" cy="86" r="5.4" fill="#0f0f12"/>
                  <path d="M70 102 q8 -10 16 0 Z" fill="#0f0f12"/>
                  <rect x="77" y="90" width="2" height="9" fill="#fff"/>
                </g>
                <g>
                  <circle cx="222" cy="90" r="22" fill="#ece8fb" stroke="#c9b8f5" strokeWidth="1.2"/>
                  <circle cx="222" cy="86" r="5.4" fill="#0f0f12"/>
                  <path d="M214 102 q8 -10 16 0 Z" fill="#0f0f12"/>
                  <rect x="221" y="90" width="2" height="9" fill="#fff"/>
                </g>
                <g>
                  <circle cx="78" cy="170" r="22" fill="#ece8fb" stroke="#c9b8f5" strokeWidth="1.2"/>
                  <circle cx="78" cy="166" r="5.4" fill="#0f0f12"/>
                  <path d="M70 182 q8 -10 16 0 Z" fill="#0f0f12"/>
                  <rect x="77" y="170" width="2" height="9" fill="#fff"/>
                </g>
                <g>
                  <circle cx="222" cy="170" r="22" fill="#ece8fb" stroke="#c9b8f5" strokeWidth="1.2"/>
                  <circle cx="222" cy="166" r="5.4" fill="#0f0f12"/>
                  <path d="M214 182 q8 -10 16 0 Z" fill="#0f0f12"/>
                  <rect x="221" y="170" width="2" height="9" fill="#fff"/>
                </g>
              </svg>
            </div>
          </section>

          <h3>{_t("The era of the decentralised digital system (since 2020)")}</h3>
          <p>This phase marks the definitive shift from trust in human institutions to trust in cryptographic code. While the previous era digitised information and its movement, the decentralised era — driven by <a href="#" onClick={(e) => e.preventDefault()}>blockchain</a> technology and the advent of <b>RWAs</b> — is digitising <b>value itself</b>.</p>
          <p>In this new paradigm, assets are no longer confined to private, isolated databases but are entered into distributed ledgers, structurally changing the global financial system and introducing three unprecedented innovations:</p>
          <ul>
            <li><b>Transformation of intermediation:</b> thanks to smart contracts, assets can be exchanged peer-to-peer, with rules and rights programmed directly into the token. This is a fundamental step towards reducing the number of manual steps that were mandatory until yesterday.</li>
            <li><b>Liquidity and fractionalisation:</b> RWAs allow historically indivisible assets (such as real estate or investment funds) to be divided into thousands of tokens. This allows anyone to participate in markets previously reserved exclusively for large capital, transforming illiquid assets into dynamic financial instruments.</li>
            <li><b>Transparency and composability:</b> every transaction is verifiable on-chain, eliminating the risk of register manipulation. Furthermore, being based on distributed standards, these assets can be integrated into decentralised finance protocols, allowing, for example, a tokenised property to be used as collateral for a loan instantly.</li>
          </ul>

          {/* Decentralised Exchange (DEX) illustration */}
          <section className="ac-rwa-era" data-testid="rwa-dex-era">
            <div className="ac-summary-brand">
              <span className="ac-summary-check"><svg viewBox="0 0 24 24" width="16" height="16"><path d="M5 13l4 4L19 7" stroke="#fff" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
              <span>academy</span>
            </div>
            <h3 className="ac-depin-prn-title">{_t("Decentralised Exchange (DEX)")}</h3>
            <div className="ac-rwa-cex-art">
              <svg viewBox="0 0 300 250" role="img" aria-label="Decentralised Exchange illustration">
                {/* connections */}
                <g stroke="#0f0f12" strokeWidth="1.6">
                  <line x1="112" y1="72" x2="142" y2="106"/>
                  <line x1="200" y1="66" x2="164" y2="102"/>
                  <line x1="200" y1="92" x2="200" y2="120"/>
                  <line x1="116" y1="158" x2="140" y2="130"/>
                  <line x1="204" y1="160" x2="166" y2="130"/>
                  <line x1="116" y1="180" x2="172" y2="178"/>
                </g>
                <g fill="#0f0f12">
                  <circle cx="112" cy="72" r="2.6"/><circle cx="200" cy="66" r="2.6"/><circle cx="200" cy="120" r="2.6"/>
                  <circle cx="116" cy="158" r="2.6"/><circle cx="204" cy="160" r="2.6"/><circle cx="172" cy="178" r="2.6"/>
                </g>
                {/* center person (larger) */}
                <g>
                  <circle cx="152" cy="118" r="32" fill="#fff" stroke="#0f0f12" strokeWidth="1.8"/>
                  <circle cx="152" cy="110" r="9" fill="#0f0f12"/>
                  <path d="M138 136 q14 -16 28 0 Z" fill="#e8e2fb" stroke="#0f0f12" strokeWidth="1.4"/>
                  <rect x="150.4" y="116" width="3.2" height="16" fill="#0f0f12"/>
                </g>
                {/* top-left person */}
                <g>
                  <circle cx="96" cy="52" r="24" fill="#fff" stroke="#0f0f12" strokeWidth="1.6"/>
                  <circle cx="96" cy="46" r="7" fill="#0f0f12"/>
                  <path d="M85 66 q11 -12 22 0 Z" fill="#e8e2fb" stroke="#0f0f12" strokeWidth="1.2"/>
                  <rect x="94.8" y="50" width="2.6" height="12" fill="#0f0f12"/>
                </g>
                {/* top-right person */}
                <g>
                  <circle cx="214" cy="44" r="20" fill="#fff" stroke="#0f0f12" strokeWidth="1.6"/>
                  <circle cx="214" cy="39" r="6" fill="#0f0f12"/>
                  <path d="M205 56 q9 -10 18 0 Z" fill="#e8e2fb" stroke="#0f0f12" strokeWidth="1.1"/>
                  <rect x="213" y="42" width="2.2" height="10" fill="#0f0f12"/>
                </g>
                {/* bottom-left person */}
                <g>
                  <circle cx="98" cy="186" r="20" fill="#fff" stroke="#0f0f12" strokeWidth="1.6"/>
                  <circle cx="98" cy="181" r="6" fill="#0f0f12"/>
                  <path d="M89 198 q9 -10 18 0 Z" fill="#e8e2fb" stroke="#0f0f12" strokeWidth="1.1"/>
                  <rect x="97" y="184" width="2.2" height="10" fill="#0f0f12"/>
                </g>
                {/* bottom-right person (larger) */}
                <g>
                  <circle cx="220" cy="188" r="26" fill="#fff" stroke="#0f0f12" strokeWidth="1.6"/>
                  <circle cx="220" cy="182" r="7.4" fill="#0f0f12"/>
                  <path d="M208 202 q12 -13 24 0 Z" fill="#e8e2fb" stroke="#0f0f12" strokeWidth="1.3"/>
                  <rect x="218.6" y="186" width="2.8" height="13" fill="#0f0f12"/>
                </g>
              </svg>
            </div>
          </section>

          <p>Tokenisation and, specifically, RWAs therefore represent the latest frontier in infrastructure innovation underpinning global value transfer. Although this path is not without problems — such as vulnerability to cyberattacks and the system's current operational complexity — it is undoubtedly the most plausible evolution of the current financial system.</p>

          <h2 id="rwa-tokenisation">{_t("How the tokenisation process works")}</h2>
          <p>Now that we understand what RWAs are and what problem they aim to solve, let's analyse how a physical asset is actually transformed into a digital asset. This process, known as <b>tokenisation</b>, is not a simple technical act, but an operation that combines law, finance and technology through <b>three essential stages: digitisation, code creation and market launch</b>.</p>

          <h3>{_t("1. Digitisation of the asset")}</h3>
          <p>The process begins with <b>digitisation</b>, a crucial step that bridges the physical and cryptographic worlds. At this stage, the real asset (whether a gold bar, a property, or a commercial credit) undergoes rigorous evaluation and specific legal structuring.</p>
          <p>It is not just a matter of creating a digital 'photo' of the asset, but of establishing a <b>legal framework</b>—often through special purpose vehicles or custody agreements—that ensures ownership of the token effectively confers ownership, economic rights, and economic benefits of the underlying asset. At this stage, all relevant information, such as appraisals, certificates of authenticity and technical data, is prepared for transfer to the distributed ledger.</p>

          <h3>{_t("2. Creating the smart contract")}</h3>
          <p>Once the legal and documentation framework is defined, the technical phase of creating the <b>smart contract</b> begins. In this step, the tool for exchanging the asset within the blockchain infrastructure is developed.</p>
          <p>The rules for using the token are written into the code, including the dividend distribution frequency, transfers (required to comply with anti-money laundering regulations), voting rights for holders, and all other information necessary for the asset. Through the <b>minting</b> process, the asset is officially issued on the blockchain, transforming a physical asset into a unique, secure, and non-counterfeit digital unit.</p>

          <h3>{_t("3. Entry into the asset market")}</h3>
          <p>The final stage concerns the asset's entry into the market, which represents a real step forward compared to the past. Thanks to tokenisation, the asset enters a global ecosystem that offers several indisputable advantages over the legacy digital system, including the potential for greater liquidity and accessibility.</p>
          <p>On the one hand, by operating within a market structure built on <b>decentralisation, open access, and distributed systems</b>, a tokenised asset gains access to a global market that operates <b>24/7</b>. This eliminates the geographical and temporal barriers of traditional markets, dramatically increasing the base of potential investors and, in turn, liquidity and accessibility.</p>
          <p>On the other hand, as RWAs are a digital representation of a physical asset, they benefit from the possibility of being <b>fractionated</b> into multiple shares in a much simpler way than a classic digital contract, bringing undoubted advantages in the process of exchanging large or valuable and typically illiquid assets, such as real estate or works of art.</p>

          {/* Fractionalisation illustration */}
          <section className="ac-rwa-frac" data-testid="rwa-fraction">
            <div className="ac-summary-brand">
              <span className="ac-summary-check"><svg viewBox="0 0 24 24" width="16" height="16"><path d="M5 13l4 4L19 7" stroke="#fff" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
              <span>academy</span>
            </div>
            <div className="ac-rwa-frac-art">
              <svg viewBox="0 0 640 210" role="img" aria-label="Asset fractionalisation illustration">
                {/* building chip */}
                <circle cx="110" cy="105" r="58" fill="#ece8fb"/>
                <g fill="none" stroke="#0f0f12" strokeWidth="3" strokeLinejoin="round">
                  <rect x="92" y="70" width="26" height="64" rx="4"/>
                  <rect x="112" y="82" width="18" height="52" rx="4"/>
                  <path d="M98 82 h14 M98 92 h14 M98 102 h14 M98 112 h14 M118 92 h6 M118 102 h6 M118 112 h6"/>
                </g>
                <text x="110" y="182" fontSize="19" fontWeight="800" textAnchor="middle" fill="#0f0f12">$250.000</text>
                {/* arrow 1 */}
                <g stroke="#0f0f12" strokeWidth="2.6" fill="none" strokeLinecap="round">
                  <line x1="192" y1="105" x2="232" y2="105"/>
                  <path d="M226 98 l10 7 -10 7"/>
                </g>
                {/* hexagon of cubes */}
                <g stroke="#0f0f12" strokeWidth="1.8" fill="none">
                  <path d="M320 60 L352 78 L352 114 L320 132 L288 114 L288 78 Z"/>
                </g>
                <g stroke="#0f0f12" strokeWidth="1.4">
                  <line x1="320" y1="60" x2="320" y2="96"/>
                  <line x1="320" y1="96" x2="288" y2="78"/>
                  <line x1="320" y1="96" x2="352" y2="78"/>
                </g>
                {/* cubes */}
                <g>
                  <g transform="translate(298 42)">
                    <path d="M0 10 l14 -8 14 8 v16 l-14 8 -14 -8 Z" fill="#c9b8f5" stroke="#0f0f12" strokeWidth="1.6"/>
                    <path d="M0 10 l14 8 14 -8 M14 18 v16" fill="none" stroke="#0f0f12" strokeWidth="1.4"/>
                  </g>
                  <g transform="translate(262 66)">
                    <path d="M0 10 l14 -8 14 8 v16 l-14 8 -14 -8 Z" fill="#fff" stroke="#0f0f12" strokeWidth="1.6"/>
                    <path d="M0 10 l14 8 14 -8 M14 18 v16" fill="none" stroke="#0f0f12" strokeWidth="1.4"/>
                  </g>
                  <g transform="translate(334 66)">
                    <path d="M0 10 l14 -8 14 8 v16 l-14 8 -14 -8 Z" fill="#fff" stroke="#0f0f12" strokeWidth="1.6"/>
                    <path d="M0 10 l14 8 14 -8 M14 18 v16" fill="none" stroke="#0f0f12" strokeWidth="1.4"/>
                  </g>
                  <g transform="translate(298 90)">
                    <path d="M0 10 l14 -8 14 8 v16 l-14 8 -14 -8 Z" fill="#fff" stroke="#0f0f12" strokeWidth="1.6"/>
                    <path d="M0 10 l14 8 14 -8 M14 18 v16" fill="none" stroke="#0f0f12" strokeWidth="1.4"/>
                  </g>
                  <g transform="translate(262 118)">
                    <path d="M0 10 l14 -8 14 8 v16 l-14 8 -14 -8 Z" fill="#fff" stroke="#0f0f12" strokeWidth="1.6"/>
                    <path d="M0 10 l14 8 14 -8 M14 18 v16" fill="none" stroke="#0f0f12" strokeWidth="1.4"/>
                  </g>
                  <g transform="translate(334 118)">
                    <path d="M0 10 l14 -8 14 8 v16 l-14 8 -14 -8 Z" fill="#fff" stroke="#0f0f12" strokeWidth="1.6"/>
                    <path d="M0 10 l14 8 14 -8 M14 18 v16" fill="none" stroke="#0f0f12" strokeWidth="1.4"/>
                  </g>
                </g>
                {/* arrow 2 */}
                <g stroke="#0f0f12" strokeWidth="2.6" fill="none" strokeLinecap="round">
                  <line x1="396" y1="105" x2="436" y2="105"/>
                  <path d="M430 98 l10 7 -10 7"/>
                </g>
                {/* token chips */}
                <g fill="#ece8fb">
                  <circle cx="470" cy="66" r="13"/><circle cx="506" cy="48" r="13"/><circle cx="542" cy="64" r="13"/>
                  <circle cx="506" cy="92" r="13"/><circle cx="470" cy="118" r="13"/><circle cx="542" cy="118" r="13"/>
                  <circle cx="506" cy="140" r="13"/>
                </g>
                <g fill="#0f0f12">
                  <circle cx="466" cy="64" r="3"/><circle cx="474" cy="69" r="3"/>
                  <circle cx="502" cy="46" r="3"/><circle cx="510" cy="51" r="3"/>
                  <circle cx="538" cy="62" r="3"/><circle cx="546" cy="67" r="3"/>
                  <circle cx="502" cy="90" r="3"/><circle cx="510" cy="95" r="3"/>
                  <circle cx="466" cy="116" r="3"/><circle cx="474" cy="121" r="3"/>
                  <circle cx="538" cy="116" r="3"/><circle cx="546" cy="121" r="3"/>
                  <circle cx="502" cy="138" r="3"/><circle cx="510" cy="143" r="3"/>
                </g>
                <text x="506" y="188" fontSize="16" fontWeight="800" textAnchor="middle" fill="#0f0f12">1 token</text>
                <text x="506" y="206" fontSize="15" fontWeight="800" textAnchor="middle" fill="#0f0f12">$25</text>
              </svg>
            </div>
          </section>

          <p>Ultimately, the integration of these three phases demonstrates that tokenisation is not simply a migration of data from a paper register to a digital one, but a <b>fundamental shift in the concept of ownership</b>. Through the perfect synchrony between legal compliance, technological rigour, and freedom of exchange, RWAs enable historically static assets to achieve unprecedented dynamism and flexibility.</p>

          <h2 id="rwa-fleap">{_t("A practical example: the Fleap case")}</h2>
          <p>To illustrate the potential of tokenisation in concrete terms, let us examine one of the most significant case studies in Italy: the Fleap case. This example represents a milestone in the RWA sector, as it demonstrates how blockchain technology is successfully applied to complex financial processes while ensuring full legal and operational compliance.</p>
          <p>More specifically, <b>Fleap S.p.A.</b> is an Italian company founded in 2019 within PoliHub, the incubator of the Politecnico di Milano, to create new opportunities in private markets through the tokenisation of financial instruments.</p>
          <p>Fleap is a highly emblematic case, as it was the first company to obtain authorisation from <b>CONSOB</b> (the Italian financial markets regulator) as a 'register keeper' under the 'Fintech Decree'. Thanks to this qualification, it can offer Italian companies native tokenisation services for financial instruments.</p>
          <p>Through its platform, it is possible to manage shares, bonds, debt securities and OICR units as <b>programmable tokens</b> on the blockchain, while maintaining their legal value and economic rights unchanged. This brings concrete benefits in terms of transparency, efficiency and cost reduction.</p>
          <p>The platform also supports advanced governance features, including voting management, minute-taking, document storage, and corporate operations automation, reducing the complexity of historically burdensome, fragmented processes.</p>
          <p>The Fleap case demonstrates that asset tokenisation technology is a ready-made solution to improve our relationship with financial asset management, offering a glimpse into the future infrastructure of the economic system.</p>

          <h2 id="rwa-conclusions">{_t("Conclusions")}</h2>
          <p>As we have analysed, RWAs are among the most revolutionary frontiers in technology applied to finance, marking a paradigm shift that is rewriting the rules of ownership and exchange.</p>
          <p>Currently, the RWA market (excluding stablecoins) has reached a capitalisation of approximately <b>$14 billion</b>. However, this is only the beginning: expert estimates indicate exponential growth that will bring the sector to <b>$38 billion</b> over the coming years, confirming that tokenisation is emerging from an experimental phase to become an institutionally recognised standard.</p>
          <p>In this scenario, understanding what RWAs are is a vital requirement for anyone who wants to correctly interpret the direction of financial markets and value transfer systems globally. We are witnessing the birth of a more equitable, liquid and transparent financial infrastructure, where the boundary between 'real' and 'digital' has now been definitively blurred.</p>
        </div>

        {/* Sign up banner */}
        <div className="ac-signup" data-testid="rwa-signup-banner">
          <div className="ac-signup-left">
            <span className="ac-buy-logo ac-signup-logo"><svg viewBox="0 0 24 24" width="20" height="20"><rect x="3" y="3" width="18" height="18" rx="4" fill="none" stroke="#fff" strokeWidth="1.6"/><path d="M8 8h6a3 3 0 0 1 0 6H8zM8 14h7a3 3 0 0 1 0 6H8z" fill="none" stroke="#fff" strokeWidth="1.6"/><circle cx="17.5" cy="6.5" r="1.3" fill="#3ddc84"/></svg>blockscaner</span>
            <h3>{_t("Sign up")}<br />{_t("to Blockscaner")}</h3>
            <a className="ac-signup-btn" href="/products" onClick={(e) => e.preventDefault()}>{_t("Start now")} <span>→</span></a>
          </div>
          <div className="ac-signup-art">
            <svg viewBox="0 0 240 190" preserveAspectRatio="xMidYMid slice">
              <defs>
                <linearGradient id="rwaBanner" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0" stopColor="#0e5fb8"/><stop offset="1" stopColor="#1a7fd0"/>
                </linearGradient>
              </defs>
              <rect width="240" height="190" fill="url(#rwaBanner)"/>
              <path d="M120 190 Q150 96 240 110 L240 190 Z" fill="#3ddc84"/>
              <rect x="86" y="18" width="92" height="180" rx="16" fill="#fff" stroke="#0d0d12" strokeWidth="3"/>
              <text x="96" y="36" fontSize="9" fill="#0f0f12">9:41</text>
              <g fill="#0f0f12"><rect x="150" y="30" width="8" height="6" rx="1"/><rect x="161" y="28" width="10" height="8" rx="2"/></g>
              <text x="96" y="56" fontSize="11" fontWeight="800" fill="#0f0f12">Home</text>
              <circle cx="150" cy="52" r="5" fill="none" stroke="#0f0f12" strokeWidth="1.4"/>
              <circle cx="162" cy="52" r="5" fill="none" stroke="#0f0f12" strokeWidth="1.4"/>
              <text x="96" y="76" fontSize="15" fontWeight="800" fill="#0f0f12">1.350,00 €</text>
              <text x="96" y="88" fontSize="7" fill="#8b8b93">Saldo Totale</text>
              <text x="96" y="106" fontSize="9" fontWeight="800" fill="#0f0f12">I tuoi preferiti</text>
              <text x="158" y="106" fontSize="7" fill="#8b8b93">Vedi tutti</text>
              <g fontSize="8" fill="#0f0f12">
                <circle cx="102" cy="122" r="7" fill="#f7931a"/><text x="102" y="125" fontSize="8" fontWeight="800" textAnchor="middle" fill="#fff">₿</text>
                <text x="114" y="120" fontWeight="800">Bitcoin</text><text x="114" y="129" fontSize="6.5" fill="#8b8b93">BTC</text>
                <text x="150" y="120" fontSize="8" fontWeight="800">36.079,35 €</text><text x="150" y="129" fontSize="6.5" fill="#16a34a">+0,29%</text>
                <circle cx="102" cy="142" r="7" fill="#627eea"/><path d="M102 137 l4 5.4 -4 5.4 -4 -5.4 Z" fill="#fff"/>
                <text x="114" y="140" fontWeight="800">Ethereum</text><text x="114" y="149" fontSize="6.5" fill="#8b8b93">ETH</text>
                <text x="150" y="140" fontSize="8" fontWeight="800">2.502,40 €</text><text x="150" y="149" fontSize="6.5" fill="#16a34a">+2,17%</text>
                <circle cx="102" cy="162" r="7" fill="#23292f"/><text x="102" y="165" fontSize="8" fontWeight="800" textAnchor="middle" fill="#fff">✕</text>
                <text x="114" y="160" fontWeight="800">Ripple</text><text x="114" y="169" fontSize="6.5" fill="#8b8b93">XRP</text>
                <text x="150" y="160" fontSize="8" fontWeight="800">0,8197 €</text><text x="150" y="169" fontSize="6.5" fill="#dc2626">-0,15%</text>
                <circle cx="102" cy="182" r="7" fill="#ff007a"/><text x="102" y="185" fontSize="7" fontWeight="800" textAnchor="middle" fill="#fff">U</text>
                <text x="114" y="180" fontWeight="800">Uniswap</text><text x="114" y="189" fontSize="6.5" fill="#8b8b93">UNI</text>
                <text x="150" y="180" fontSize="8" fontWeight="800">20,14 €</text><text x="150" y="189" fontSize="6.5" fill="#dc2626">-0,50%</text>
              </g>
            </svg>
          </div>
        </div>

        {/* Disclaimer */}
        <p className="ac-disclaimer">
          This content is provided solely for informational and educational purposes and does not constitute financial, legal
          or tax advice, nor does it represent a public offering or solicitation to invest pursuant to Legislative Decree
          58/1998 (TUF). Crypto-assets are highly volatile instruments and carry a significant risk of partial or total loss of
          invested capital. Past performance and any forecasts do not guarantee future results. For a detailed overview of
          the risks, please refer to the <a href="#" onClick={(e) => e.preventDefault()}>General Risk Disclosure</a>. The payment account offered by Blockscaner is regulated
          under Legislative Decree 11/2010 and cannot be equated with a bank current account; therefore, it does not
          benefit from the protections applicable to bank deposits. You are encouraged to perform your own independent
          and informed assessments, consult the latest <a href="#" onClick={(e) => e.preventDefault()}>Payment Account Terms and Conditions</a> and <a href="#" onClick={(e) => e.preventDefault()}>Currency Exchange
          Terms and Conditions</a>, and, where appropriate, seek advice from a qualified professional before making any
          financial or economic decision.
        </p>

        {/* Related */}
        <section className="ac-related">
          <h2>{_t("Related")}</h2>
          <div className="ac-grid">
            <article className="ac-card" onClick={() => window.location.assign("/products/academy/erc-8004")} style={{ cursor: "pointer" }}>
              <div className="ac-thumb"><Badge>Beginner</Badge>
                <svg viewBox="0 0 340 210" preserveAspectRatio="xMidYMid slice">
                  <rect width="340" height="210" fill="#aee3ff"/>
                  <circle cx="170" cy="105" r="40" fill="#fff"/>
                  <path d="M170 66 L192 108 L170 126 L148 108 Z" fill="#3a86ff"/>
                  <path d="M170 66 L192 108 L170 94 Z" fill="#0d0d12"/>
                  <g fill="#3a86ff" stroke="#0d0d12" strokeWidth="2.5">
                    <path d="M50 150 L70 108 L90 150 Z"/>
                    <path d="M250 150 L270 108 L290 150 Z"/>
                    <path d="M96 162 L112 128 L128 162 Z"/>
                    <path d="M212 162 L228 128 L244 162 Z"/>
                  </g>
                  <g stroke="#0d0d12" strokeWidth="3" fill="none">
                    <path d="M70 108 L70 76 M270 108 L270 76"/>
                  </g>
                  <circle cx="70" cy="66" r="10" fill="#fff" stroke="#0d0d12" strokeWidth="3"/>
                  <circle cx="270" cy="66" r="10" fill="#fff" stroke="#0d0d12" strokeWidth="3"/>
                </svg>
              </div>
              <div className="ac-tags"><span className="ac-tag">Ethereum</span></div>
              <h3>ERC-8004: The Future of AI on Ethereum</h3>
              <p className="ac-desc">The Ethereum ERC-8004 update is here: the new standard that promises a new lease of life for AI agents.</p>
              <p className="ac-meta">March 31, 2026&nbsp;&nbsp;•&nbsp;&nbsp;8 min</p>
            </article>
            <article className="ac-card" onClick={() => window.location.assign("/products/academy/depin")} style={{ cursor: "pointer" }}>
              <div className="ac-thumb"><Badge>Principiante</Badge>
                <svg viewBox="0 0 340 210" preserveAspectRatio="xMidYMid slice">
                  <rect width="340" height="210" fill="#bfe9ff"/>
                  <g stroke="#0d0d12" strokeWidth="4" fill="none">
                    <path d="M30 30 L96 66 M310 26 L244 62 M26 184 L96 146 M314 182 L244 144"/>
                  </g>
                  <g fill="#3a86ff" stroke="#0d0d12" strokeWidth="3.5">
                    <rect x="12" y="14" width="34" height="34" rx="6" transform="rotate(12 29 31)"/>
                    <rect x="294" y="12" width="34" height="34" rx="6" transform="rotate(-10 311 29)"/>
                    <rect x="10" y="168" width="34" height="34" rx="6" transform="rotate(-8 27 185)"/>
                    <rect x="296" y="166" width="34" height="34" rx="6" transform="rotate(10 313 183)"/>
                  </g>
                  <path d="M170 40 v-16 M160 30 l10 -10 10 10" stroke="#0d0d12" strokeWidth="4" fill="none" strokeLinecap="round"/>
                  <path d="M86 80 a84 44 0 0 1 168 0 l-8 38 a44 26 0 0 1 -32 19 l-26 5 a32 17 0 0 1 -36 0 l-26 -5 a44 26 0 0 1 -32 -19 Z" fill="#3ad0ff" stroke="#0d0d12" strokeWidth="5"/>
                  <rect x="112" y="72" width="116" height="44" rx="22" fill="#fff" stroke="#0d0d12" strokeWidth="4"/>
                  <text x="170" y="104" fontSize="30" fontWeight="800" textAnchor="middle" fill="#0d0d12" fontStyle="italic">DePIN</text>
                  <rect x="96" y="148" width="64" height="26" rx="8" fill="#3ad0ff" stroke="#0d0d12" strokeWidth="3.5" transform="rotate(-4 128 161)"/>
                  <rect x="182" y="148" width="64" height="26" rx="8" fill="#3a86ff" stroke="#0d0d12" strokeWidth="3.5" transform="rotate(4 214 161)"/>
                </svg>
              </div>
              <div className="ac-tags"><span className="ac-tag">DeFi</span></div>
              <h3>DePIN: what they are and how decentralized physical infrastructure networks work</h3>
              <p className="ac-desc">Che cos'è il DePIN? La tecnologia blockchain che sta rivoluzionando le infrastrutture fisiche decentralizzate</p>
              <p className="ac-meta">March 19, 2026&nbsp;&nbsp;•&nbsp;&nbsp;8 min</p>
            </article>
            <article className="ac-card">
              <div className="ac-thumb"><Badge>Beginner</Badge>
                <svg viewBox="0 0 340 210" preserveAspectRatio="xMidYMid slice">
                  <rect width="340" height="210" fill="#a98bff"/>
                  <g stroke="#fff" strokeWidth="3" strokeLinecap="round">
                    <path d="M40 40 l14 14 M54 40 l-14 14"/>
                    <path d="M288 36 l14 14 M302 36 l-14 14"/>
                    <path d="M52 150 l12 12 M64 150 l-12 12"/>
                    <path d="M282 158 l12 12 M294 158 l-12 12"/>
                    <path d="M150 26 l10 10 M160 26 l-10 10"/>
                  </g>
                  <circle cx="120" cy="112" r="56" fill="#fff"/>
                  <path d="M150 60 a58 58 0 0 1 66 44 q10 2 8 12 q-2 8 -10 10 q2 10 -6 14 q0 12 -12 14 l-4 22 h-66 q10 -30 4 -52 a58 58 0 0 1 20 -64 Z" fill="#0d0d12"/>
                  <circle cx="196" cy="96" r="18" fill="none" stroke="#fff" strokeWidth="3"/>
                  <path d="M182 108 a18 18 0 0 1 24 -22" stroke="#fff" strokeWidth="3" fill="none"/>
                  <path d="M178 92 l34 10" stroke="#fff" strokeWidth="3" strokeLinecap="round"/>
                </svg>
              </div>
              <div className="ac-tags"><span className="ac-tag">IA</span></div>
              <h3>What is Grok: Elon Musk's new AI assistant</h3>
              <p className="ac-desc">Grok is xAI's artificial intelligence model designed to redefine the concept of a virtual assistant. Discover how it works and what makes it different.</p>
              <p className="ac-meta">August 26, 2025&nbsp;&nbsp;•&nbsp;&nbsp;10 min</p>
            </article>
          </div>
        </section>

      </div>
    </SiteLayout>
  );
}
