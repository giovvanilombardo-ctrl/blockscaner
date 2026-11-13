import SiteLayout from "@/components/site/SiteLayout";
import Seo from "@/components/Seo";
import { t as _t } from "@/i18n";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

/* Sonic hero artwork — purple starburst on lavender */
const ArtSonic = (
  <svg viewBox="0 0 340 210" preserveAspectRatio="xMidYMid slice">
    <rect width="340" height="210" fill="#c9a7ff"/>
    {/* burst */}
    <circle cx="170" cy="118" r="58" fill="#fff"/>
    <path d="M170 52 C188 70 214 76 238 70 C224 94 212 112 200 128 C184 116 172 98 170 78 C164 98 152 116 136 128 C124 112 112 94 98 70 C122 76 152 70 170 52 Z" fill="#8b5cf6"/>
    <path d="M170 52 C176 66 178 78 178 90 C170 78 166 66 170 52 Z" fill="#fff"/>
    <circle cx="170" cy="118" r="58" fill="none" stroke="#0d0d12" strokeWidth="3.5"/>
    {/* speed lines */}
    <g stroke="#0d0d12" strokeWidth="3" strokeLinecap="round">
      <path d="M56 118 h22"/><path d="M50 132 h16"/>
      <path d="M284 118 h-22"/><path d="M290 132 h-16"/>
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

export default function AcademySonic() {
  return (
    <SiteLayout>
      <Seo title="Sonic Blockchain: What Is It and How Does It Work? — Blockscaner Academy" description="Discover Sonic: the ultra-fast EVM blockchain evolved from Fantom. 400k TPS, sub-second finality, and 90% fee rewards for developers." />
      <div className="ac-article" data-testid="academy-article-sonic">

        {/* breadcrumb */}
        <p className="ac-crumb">
          <Link to="/products/academy">Home</Link>
          <span>›</span>
          <a href="#" onClick={(e) => e.preventDefault()}>Blockchain</a>
          <span>›</span>
          <b>Sonic Blockchain: What Is It and How Does It Work?</b>
        </p>

        {/* header row */}
        <div className="ac-article-top">
          <Link to="/products/academy" className="ac-back" aria-label="Back to Academy"><ArrowLeft size={18} /></Link>
          <Tag>DeFi</Tag>
        </div>

        <div className="ac-article-head">
          <h1>{_t("Sonic Blockchain: What")}<br />{_t("Is It and How Does It")}<br />{_t("Work?")}</h1>
          <div className="ac-share">
            <span className="ac-share-ic" aria-label="Share on X"><ShareIcon d="M18.9 2H22l-6.8 7.8L23 22h-6.3l-4.9-6.4L6.2 22H3l7.3-8.3L1.5 2h6.4l4.4 5.9L18.9 2zm-1.1 18h1.7L7.1 3.9H5.3L17.8 20z"/></span>
            <span className="ac-share-ic" aria-label="Share on Facebook"><ShareIcon d="M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.4h-1.2c-1.2 0-1.6.8-1.6 1.6V12h2.7l-.4 2.9h-2.3v7A10 10 0 0 0 22 12z"/></span>
            <span className="ac-share-ic" aria-label="Share on LinkedIn"><ShareIcon d="M20.4 20.4h-3.5v-5.6c0-1.3 0-3-1.9-3s-2.1 1.4-2.1 2.9v5.7H9.4V9h3.4v1.6h.1c.5-.9 1.7-1.9 3.4-1.9 3.6 0 4.3 2.4 4.3 5.5v6.2zM5.3 7.4a2 2 0 1 1 0-4.1 2 2 0 0 1 0 4.1zM7.1 20.4H3.6V9h3.5v11.4z"/></span>
          </div>
        </div>
        <p className="ac-meta">November 26, 2025&nbsp;&nbsp;•&nbsp;&nbsp;10 min</p>

        {/* hero image */}
        <div className="ac-article-thumb">
          <Badge>Beginner</Badge>
          {ArtSonic}
        </div>

        {/* You will learn */}
        <div className="ac-learn">
          <h2>{_t("You will learn")}</h2>
          <ul>
            <li><a href="#sonic-revolution">{_t("Sonic: The Ultra-Fast L1 EVM Blockchain That Revolutionized Fantom")}</a></li>
            <li><a href="#sonic-motivation">{_t("The Motivation Behind Rebranding Fantom to Sonic")}</a></li>
            <li><a href="#sonic-what">{_t("What is Sonic?")}</a></li>
            <li><a href="#sonic-architecture">{_t("Under the Bonnet: Sonic's High-Speed Architecture")}</a></li>
            <li><a href="#sonic-tokenomics">{_t("$S: Tokenomics That Reward Developers")}</a></li>
            <li><a href="#sonic-inflation">{_t("Balancing the Books: Inflation vs Deflation")}</a></li>
            <li><a href="#sonic-conclusions">{_t("Conclusions")}</a></li>
          </ul>
        </div>

        {/* Article body */}
        <div className="ac-body">
          <h2 id="sonic-revolution">{_t("Sonic: The Ultra-Fast L1 EVM Blockchain That Revolutionized Fantom")}</h2>
          <p>The world of cryptocurrency is in constant flux, with new blockchains emerging to promise superior performance and innovative features. Whilst <b>Ethereum</b> inaugurated the era of smart contracts, it still suffers from significant speed limitations—roughly 15–30 transactions per second (TPS) on its base layer—and exorbitant costs when the network becomes congested.</p>
          <p>Projects such as <b>Polkadot</b> have wagered on interoperability between various parallel blockchains (known as parachains) to surmount these hurdles, whilst others have sacrificed a degree of decentralisation to bolster the speed at which blocks are approved.</p>
          <p>Today, a new contender is garnering attention as a potential "Ethereum killer": <b>Sonic</b>, a next-generation blockchain born from the Fantom team's experience and spearheaded by the Web3 legend <b>Andre Cronje</b>. In this article, we shall explore what Sonic is and how it works, discovering a blockchain that bets on speed, security, and user experience.</p>

          <h2 id="sonic-motivation">{_t("The Motivation Behind Rebranding Fantom to Sonic")}</h2>
          <p>Sonic traces its lineage back to the <b>Fantom</b> project. Once a pioneer, Fantom reached the zenith of its success in 2022, establishing itself amongst the leading "fast Layer-1s" (the base layer blockchains like Bitcoin or Ethereum) with a capitalisation of over <b>$10 billion in Total Value Locked (TVL)</b>—a metric used to measure the total capital held within a protocol.</p>
          <p>Despite its cutting-edge architecture for its time, Fantom eventually faced several critical issues that gradually eroded its initial allure. These difficulties were exacerbated primarily by the lack of native stablecoins (cryptocurrencies pegged to stable assets like the Dollar) and, crucially, the absence of secure native bridges—the tools used to transfer assets between different blockchains. Following exploits that hit third-party bridges (such as Multichain), this deficiency triggered a significant flight of capital from the ecosystem, culminating in a decline in confidence that began in late 2022.</p>

          {/* TVL chart */}
          <section className="ac-sonic-tvl" data-testid="sonic-tvl-chart">
            <div className="ac-summary-brand">
              <span className="ac-summary-check"><svg viewBox="0 0 24 24" width="16" height="16"><path d="M5 13l4 4L19 7" stroke="#fff" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
              <span>academy</span>
            </div>
            <div className="ac-sonic-tvl-card">
              <b>Total Value Locked (TVL)</b>
              <svg viewBox="0 0 620 260" preserveAspectRatio="none" role="img" aria-label="Total Value Locked chart">
                <defs>
                  <linearGradient id="sonicTvlGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#8b5cf6" stopOpacity=".3" />
                    <stop offset="1" stopColor="#8b5cf6" stopOpacity=".02" />
                  </linearGradient>
                </defs>
                <g stroke="#eeeef3" strokeWidth="1">
                  <line x1="40" y1="40" x2="600" y2="40"/>
                  <line x1="40" y1="95" x2="600" y2="95"/>
                  <line x1="40" y1="150" x2="600" y2="150"/>
                  <line x1="40" y1="205" x2="600" y2="205"/>
                </g>
                <g fontSize="10" fill="#9a9aa0" textAnchor="end">
                  <text x="34" y="44">$8b</text>
                  <text x="34" y="99">$6b</text>
                  <text x="34" y="154">$4b</text>
                  <text x="34" y="209">$2b</text>
                </g>
                <g fontSize="10" fill="#9a9aa0" textAnchor="middle">
                  <text x="80" y="222">Jul</text>
                  <text x="170" y="222">2022</text>
                  <text x="260" y="222">Jul</text>
                  <text x="350" y="222">2023</text>
                  <text x="440" y="222">Jul</text>
                  <text x="530" y="222">2024</text>
                  <text x="620" y="222">Jul</text>
                </g>
                {/* area */}
                <path d="M40,200 L70,198 L100,196 L120,190 L130,150 L140,120 L150,90 L160,110 L170,70 L180,120 L190,60 L200,100 L210,80 L220,140 L230,180 L240,190 L260,194 L300,196 L350,197 L400,198 L460,199 L520,199 L580,199 L600,199 L600,205 L40,205 Z" fill="url(#sonicTvlGrad)"/>
                {/* line */}
                <path d="M40,200 L70,198 L100,196 L120,190 L130,150 L140,120 L150,90 L160,110 L170,70 L180,120 L190,60 L200,100 L210,80 L220,140 L230,180 L240,190 L260,194 L300,196 L350,197 L400,198 L460,199 L520,199 L580,199 L600,199" fill="none" stroke="#8b5cf6" strokeWidth="2"/>
              </svg>
            </div>
          </section>

          <p>Faced with these tribulations, the rebranding to Sonic was not merely a cosmetic name change but a strategic necessity. It represented a <b>"full protocol reset"</b>—a <b>"clean break"</b> from the past — to rebuild the infrastructure from the ground up and redesign the network's economy, learning from historical errors.</p>

          {/* Fantom → Sonic logo transition */}
          <section className="ac-sonic-transition" data-testid="sonic-transition">
            <div className="ac-summary-brand">
              <span className="ac-summary-check"><svg viewBox="0 0 24 24" width="16" height="16"><path d="M5 13l4 4L19 7" stroke="#fff" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
              <span>academy</span>
            </div>
            <div className="ac-sonic-transition-row">
              <div className="ac-sonic-token">
                <div className="ac-sonic-logo ac-sonic-ftm">
                  <svg viewBox="0 0 120 120"><circle cx="60" cy="60" r="56" fill="#1e9ee6"/><g fill="none" stroke="#fff" strokeWidth="4" strokeLinejoin="round"><path d="M60 24 L90 40 L90 76 L60 96 L30 76 L30 40 Z"/><path d="M60 24 v36 M60 60 L90 76 M60 60 L30 76"/></g></svg>
                </div>
                <span className="ac-sonic-label">Fantom $FTM</span>
              </div>
              <span className="ac-sonic-arrow">→</span>
              <div className="ac-sonic-token">
                <div className="ac-sonic-logo ac-sonic-s">
                  <svg viewBox="0 0 120 120"><circle cx="60" cy="60" r="56" fill="#1a1a2e"/><circle cx="60" cy="60" r="26" fill="#fff"/><path d="M60 34 C74 44 90 48 104 44 C96 60 88 72 78 82 C68 74 62 62 60 50 C56 62 50 74 40 82 C30 72 24 60 16 44 C30 48 46 44 60 34 Z" fill="#8b5cf6"/></svg>
                </div>
                <span className="ac-sonic-label">Sonic $S</span>
              </div>
            </div>
          </section>

          <p>The objective behind Sonic's inception was crystal clear: to transition from a blockchain that was fast and cheap but lacking in security and reliability (Fantom) to one with a completely restructured architecture, equipped with <b>parallel execution</b>, <b>secure native bridges</b>, a renewed economic model, and an ecosystem that is far more inviting for software developers.</p>

          <h2 id="sonic-what">{_t("What is Sonic?")}</h2>
          <p>Sonic is a high-performance Layer-1 blockchain platform that is fully compatible with the <b>Ethereum Virtual Machine (EVM)</b>. In plain English, this means it can support the same smart contracts and applications as Ethereum, but it functions far more rapidly and efficiently.</p>
          <p>Launching in 2025 as the evolution of the Fantom project, Sonic immediately made headlines with its record-breaking figures: the network claims to be capable of handling up to <b>400,000 transactions per second (TPS)</b> with a finality (the time it takes for a transaction to be irreversible) of under one second. By comparison, Ethereum without external scaling solutions processes mere dozens, whilst even notoriously fast blockchains like Solana aim for tens of thousands of TPS.</p>
          <p>Everything is powered by the native token <b>$S</b>, which is used to pay network fees, stake (lock up tokens to secure the network), and participate in the platform's governance.</p>
          <p>From a conceptual standpoint, Sonic presents itself as a <b>monolithic blockchain</b>: it does not use "sharding" (splitting the network into smaller pieces) or parallel chains like Polkadot. Instead, it aims to enhance performance on a single network by optimising every technological layer.</p>

          <h2 id="sonic-architecture">{_t("Under the Bonnet: Sonic's High-Speed Architecture")}</h2>
          <p>Sonic's efficiency and velocity stem from a consensus architecture and data structure that transcend the limitations of traditional blockchains. This is achieved primarily through two technological innovations: <b>Asynchronous Byzantine Fault Tolerance (ABFT)</b> and <b>Directed Acyclic Graphs (DAG)</b>.</p>

          <h3>{_t("1. Asynchronous Byzantine Fault Tolerance (ABFT)")}</h3>
          <p>Consensus is the crucial mechanism by which nodes (computers) in a decentralised network agree on the state of the ledger, whilst tolerating the presence of malicious actors (often termed "Byzantine nodes").</p>
          <p>In traditional blockchains, block approval is rigid and sequential: one block must be validated by a majority of nodes before the next can even be proposed. This sequential nature creates a bottleneck that limits throughput and increases latency (the delay before a transaction is finalised).</p>
          <p>To overcome this, Sonic implements <b>ABFT</b>, which offers:</p>
          <ul>
            <li><b>Validator Independence:</b> Each validator can propose and pre-validate transactions independently and in parallel, eliminating the need to wait for a global turn or immediate agreement on a final block.</li>
            <li><b>BFT Security:</b> The protocol guarantees security and deterministic finality even when up to 33% of nodes are malicious.</li>
            <li><b>Reduced Latency:</b> Removing the need for global, sequential ordering amongst validators drastically reduces the time required to finalise transactions.</li>
          </ul>

          <h3>{_t("2. The DAG: Goodbye Chain, Hello Web")}</h3>
          <p>Imagine a traditional blockchain as a chain of railway carriages: each carriage (block) must be hitched in single file, one after the other. Whilst orderly, in computing terms, this is extremely slow.</p>
          <p>Sonic, thanks to its advanced consensus system (ABFT), allows "validators" to work together in parallel, utilising a data structure known as a <b>Directed Acyclic Graph (DAG)</b>.</p>

          <h3>{_t("How the DAG Works: The Web of Consensus")}</h3>
          <ul>
            <li><b>Web-like Structure:</b> The DAG resembles a complex network or cobweb. It is directed (connections move in one direction, representing time) and Acyclic (you can never loop back, ensuring transactions are final).</li>
            <li><b>Nodes are "Events":</b> In Sonic, every time a validator processes and proposes a batch of transactions, they create an "event block" which becomes a node (a point) in the DAG.</li>
            <li><b>Knowledge and Timeline:</b> The connections (edges) between nodes are not random. Each new "event block" includes references to previous blocks the validator has seen and validated. This records the mutual knowledge between validators and establishes the chronological order of transactions.</li>
            <li><b>Parallel and Immediate Validation:</b> Unlike a chain, where everyone must agree on a single block at a time, in a DAG, all validators can add new nodes to the web simultaneously.</li>
          </ul>

          {/* Blockchain vs DAG illustration */}
          <section className="ac-sonic-dagsec" data-testid="sonic-dag">
            <div className="ac-summary-brand">
              <span className="ac-summary-check"><svg viewBox="0 0 24 24" width="16" height="16"><path d="M5 13l4 4L19 7" stroke="#fff" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
              <span>academy</span>
            </div>
            <div className="ac-sonic-dag">
              <div className="ac-sonic-dag-col">
                <b>Blockchain</b>
                <svg viewBox="0 0 240 90" role="img" aria-label="Blockchain linear chain">
                  <g stroke="#0f0f12" strokeWidth="1.4">
                    <line x1="28" y1="45" x2="52" y2="45"/><line x1="68" y1="45" x2="92" y2="45"/>
                    <line x1="108" y1="45" x2="132" y2="45"/><line x1="148" y1="45" x2="172" y2="45"/>
                    <line x1="188" y1="45" x2="212" y2="45"/>
                  </g>
                  <rect x="12" y="37" width="16" height="16" rx="4" fill="#8b5cf6" opacity=".45"/>
                  <g fill="#8b5cf6">
                    <rect x="52" y="37" width="16" height="16" rx="4"/>
                    <rect x="92" y="37" width="16" height="16" rx="4"/>
                    <rect x="132" y="37" width="16" height="16" rx="4"/>
                    <rect x="172" y="37" width="16" height="16" rx="4"/>
                    <rect x="212" y="37" width="16" height="16" rx="4"/>
                  </g>
                </svg>
              </div>
              <div className="ac-sonic-dag-col">
                <b>(DAG/Directed Acyclic Graph)</b>
                <svg viewBox="0 0 260 130" role="img" aria-label="DAG web of nodes">
                  <g stroke="#9a9aa0" strokeWidth=".7" fill="none">
                    <path d="M24 30 L70 18 M70 18 L112 34 M112 34 L154 16 M154 16 L200 32 M200 32 L238 18"/>
                    <path d="M24 30 L44 70 M44 70 L84 60 M84 60 L122 80 M122 80 L160 58 M160 58 L206 76 M206 76 L244 58"/>
                    <path d="M44 70 L70 104 M70 104 L110 92 M110 92 L150 112 M150 112 L192 96 M192 96 L232 110"/>
                    <path d="M70 18 L84 60 M112 34 L84 60 M112 34 L122 80 M154 16 L160 58 M154 16 L122 80 M200 32 L160 58 M200 32 L206 76 M238 18 L244 58"/>
                    <path d="M84 60 L70 104 M122 80 L110 92 M160 58 L150 112 M206 76 L192 96 M244 58 L232 110"/>
                    <path d="M24 30 L70 18 M24 30 L44 70 M70 104 L150 112 M44 70 L110 92 M70 18 L122 80"/>
                  </g>
                  <g fill="#8b5cf6">
                    <rect x="16" y="22" width="16" height="16" rx="4" opacity=".45"/>
                    <rect x="62" y="10" width="16" height="16" rx="4"/>
                    <rect x="104" y="26" width="16" height="16" rx="4"/>
                    <rect x="146" y="8" width="16" height="16" rx="4"/>
                    <rect x="192" y="24" width="16" height="16" rx="4"/>
                    <rect x="230" y="10" width="16" height="16" rx="4"/>
                    <rect x="36" y="62" width="16" height="16" rx="4"/>
                    <rect x="76" y="52" width="16" height="16" rx="4"/>
                    <rect x="114" y="72" width="16" height="16" rx="4"/>
                    <rect x="152" y="50" width="16" height="16" rx="4"/>
                    <rect x="198" y="68" width="16" height="16" rx="4"/>
                    <rect x="236" y="50" width="16" height="16" rx="4"/>
                    <rect x="62" y="96" width="16" height="16" rx="4"/>
                    <rect x="102" y="84" width="16" height="16" rx="4"/>
                    <rect x="142" y="104" width="16" height="16" rx="4"/>
                    <rect x="184" y="88" width="16" height="16" rx="4"/>
                    <rect x="224" y="102" width="16" height="16" rx="4"/>
                  </g>
                </svg>
              </div>
            </div>
          </section>

          <p>This eliminates the need for a single point of congestion, allowing data to flow simultaneously across the network, ensuring maximum efficiency and speed. Sonic's approach combines the security of ABFT consensus with the flexibility of the DAG, transforming the sequential bottleneck typical of traditional blockchains into a parallel superhighway for data.</p>

          <h2 id="sonic-tokenomics">{_t("$S: Tokenomics That Reward Developers")}</h2>
          <p>Sonic's innovation is not limited to its "hardware"; it extends to its economic operating system. The native token, denoted <b>$S</b>, is essential to network security and governance, serving as a fee currency, a staking currency, and a voting currency.</p>
          <p>Beyond these traditional uses, the tokenomics of $S introduces a novel feature called <b>Fee Monetisation (FeeM)</b>.</p>

          <h3>{_t("Fee Monetisation (FeeM): The 90% Revolution")}</h3>
          <p>The <b>Fee Monetisation (FeeM)</b> mechanism marks a significant shift in how developers are rewarded within the Sonic ecosystem. It is a system designed to directly value developers' contributions, allowing applications that sign up to the programme to receive up to <b>90% of the transaction fees (gas)</b> generated by their on-chain operations.</p>
          <p>This model transforms network fees from a mere operating cost into a direct source of remuneration, creating a concrete link between an application's activity and the project's economic sustainability. It introduces an incentive model based on two fundamental principles:</p>
          <ul>
            <li><b>Financial Sustainability:</b> Developers can count on a stable revenue stream proportional to the usage of their applications. This reduces the need for external funding (such as venture capital) and fosters the creation of autonomous, long-lasting projects.</li>
            <li><b>Incentive for Quality:</b> Since revenue is tied to transaction volume, developers are naturally driven to improve, update, and constantly optimise their Decentralised Apps (DApps), stimulating a virtuous circle of innovation and growth for the entire ecosystem.</li>
          </ul>
          <p>The programme is already live and has distributed over <b>2 million $S tokens</b> to more than <b>230 DApps</b>. Coupled with EVM compatibility, this system makes Sonic a beautiful platform for development teams, offering an environment that combines high technical performance with tangible economic incentives.</p>

          {/* Sonic FeeM leaderboard */}
          <section className="ac-sonic-feecard" data-testid="sonic-feecard">
            <div className="ac-summary-brand">
              <span className="ac-summary-check"><svg viewBox="0 0 24 24" width="16" height="16"><path d="M5 13l4 4L19 7" stroke="#fff" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
              <span>academy</span>
            </div>
            <div className="ac-sonic-leader">
              <div className="ac-sonic-leader-head">
                <span className="ac-sonic-leader-logo">⟶sonic</span>
                <span className="ac-sonic-leader-connect">Connect Wallet</span>
              </div>
              <div className="ac-sonic-leader-total">
                <small>Total app revenue</small>
                <b>2,420,252 <span className="ac-sonic-s-coin">S</span></b>
                <div className="ac-sonic-leader-stats">
                  <div><small>Active apps</small><b>232</b></div>
                  <div><small>Active contracts</small><b>17,190</b></div>
                </div>
              </div>
              <div className="ac-sonic-leader-board">
                <b>Project Leaderboard</b>
                <table>
                  <thead><tr><th>#</th><th>Project name</th><th>Total transactions</th><th>Total rewards</th><th>Available to claim</th></tr></thead>
                  <tbody>
                    <tr><td>1</td><td>Xpress</td><td>8,136,256</td><td>581,077.01 S</td><td>542.37 S</td></tr>
                    <tr><td>2</td><td>Shadow</td><td>24,739,860</td><td>379,684.65 S</td><td>10,032.03 S</td></tr>
                    <tr><td>3</td><td>Stere</td><td>5,720,609</td><td>341,104.71 S</td><td>643.76 S</td></tr>
                    <tr><td>4</td><td>INFINITY</td><td>6,450,164</td><td>233,277.98 S</td><td>397.09 S</td></tr>
                    <tr><td>5</td><td>Pyth</td><td>14,598,165</td><td>189,937.36 S</td><td>139,937.36 S</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          <h2 id="sonic-inflation">{_t("Balancing the Books: Inflation vs Deflation")}</h2>
          <p>The economic model of the $S token has been meticulously engineered to achieve a dynamic balance between the <b>inflation</b> necessary for security and strategic <b>deflation</b> to preserve value.</p>
          <p>From an inflationary perspective, the issuance of $S is fundamental to maintaining the protocol's security. Since validators must be incentivised to lock up their tokens (staking) and protect the network, the model envisages a fixed annual issuance of approximately <b>1.75%</b> once initial funds are exhausted.</p>
          <p>To offset this issuance, Sonic employs a series of strategic deflationary mechanisms that "burn" tokens (permanently removing them from circulation) and directly tie supply to network activity. The most significant mechanism concerns transaction fees:</p>
          <ul>
            <li><b>Burning of Non-Redistributed Fees:</b> If a decentralised application does not join the Fee Monetisation (FeeM) programme, <b>50% of the fees</b> generated by that application are immediately burned, reducing the overall supply. The remaining portion is divided between validators (45%) and the ecosystem fund (5%).</li>
            <li><b>Burning of Unused Tokens:</b> To ensure allocation is efficient, Sonic actively burns tokens destined for airdrops (promotional giveaways) or ecosystem development that remain unclaimed or unused beyond a pre-set period.</li>
          </ul>
          <p>This tokenomics structure for $S is thus designed to establish a sustainable equilibrium: it guarantees constant, modest long-term inflation to fund network security, whilst simultaneously offering—through various burn mechanisms—the opportunity for a significant reduction in the circulating supply.</p>

          <h2 id="sonic-conclusions">{_t("Conclusions")}</h2>
          <p>Sonic emerges as a next-generation blockchain, founded upon a triple pillar of innovation: <b>performance</b>, <b>compatibility</b>, and <b>economics</b>.</p>
          <p>Its ultra-fast performance is guaranteed by state-of-the-art architecture that pairs Asynchronous Byzantine Fault Tolerance (aBFT) consensus with a Directed Acyclic Graph (DAG) data structure. This eliminates the sequential bottlenecks typical of traditional blockchains while maintaining full compatibility with the EVM.</p>
          <p>Added to all this is the Fee Monetisation (FeeM) system, which flips the dynamic on its head, transforming Sonic into a direct economic partner for DApps and creating a development incentive hitherto unseen in any other Web3 ecosystem. In light of what we have observed, it only remains to be seen whether this combination of high velocity and developer incentives will transform Sonic into the next significant evolution of the blockchain landscape and the definitive "Ethereum killer" that the market so desperately craves.</p>
        </div>

        {/* Related */}
        <section className="ac-related">
          <h2>{_t("Related")}</h2>
          <div className="ac-grid">
            <article className="ac-card">
              <div className="ac-thumb"><Badge>Beginner</Badge>
                <svg viewBox="0 0 340 210" preserveAspectRatio="xMidYMid slice">
                  <rect width="340" height="210" fill="#c9a7ff"/>
                  {/* purple triangles */}
                  <g fill="#8b5cf6" stroke="#0d0d12" strokeWidth="3">
                    <path d="M20 20 L60 20 L40 60 Z"/>
                    <path d="M300 30 L340 30 L320 70 Z"/>
                    <path d="M40 170 L80 170 L60 210 Z"/>
                    <path d="M290 160 L330 160 L310 200 Z"/>
                  </g>
                  {/* bottle */}
                  <g transform="rotate(-20 120 110)">
                    <rect x="100" y="70" width="26" height="60" rx="8" fill="#fff" stroke="#0d0d12" strokeWidth="3.4"/>
                    <rect x="104" y="60" width="18" height="14" rx="4" fill="#fff" stroke="#0d0d12" strokeWidth="3"/>
                    <path d="M110 84 q6 8 0 16" stroke="#0d0d12" strokeWidth="2.4" fill="none" strokeLinecap="round"/>
                  </g>
                  {/* warning triangle */}
                  <path d="M190 78 L246 158 L134 158 Z" fill="#fff" stroke="#0d0d12" strokeWidth="4" strokeLinejoin="round"/>
                  <path d="M190 98 L222 148 L158 148 Z" fill="#0d0d12"/>
                  <rect x="187" y="120" width="6" height="14" rx="3" fill="#fff"/>
                  <circle cx="190" cy="140" r="3.4" fill="#fff"/>
                  {/* droplets */}
                  <g fill="#0d0d12">
                    <circle cx="150" cy="92" r="3"/><circle cx="140" cy="108" r="2.6"/>
                    <circle cx="246" cy="92" r="2.6"/>
                  </g>
                </svg>
              </div>
              <div className="ac-tags"><span className="ac-tag">Crypto Security</span></div>
              <h3>Address poisoning: what it is and how to defend against it</h3>
              <p className="ac-desc">Address poisoning is a sophisticated social engineering scam targeting crypto transactions. Learn how this attack works, its devastating impact, and essential strategies to protect your crypto fund</p>
              <p className="ac-meta">October 15, 2025&nbsp;&nbsp;•&nbsp;&nbsp;8 min</p>
            </article>
            <article className="ac-card">
              <div className="ac-thumb"><Badge>Beginner</Badge>
                <svg viewBox="0 0 340 210" preserveAspectRatio="xMidYMid slice">
                  <rect width="340" height="210" fill="#ffd21f"/>
                  {/* honeycomb */}
                  <g fill="#0d0d12">
                    <path d="M40 40 l20 -12 20 12 v24 l-20 12 -20 -12 Z"/>
                    <path d="M260 30 l20 -12 20 12 v24 l-20 12 -20 -12 Z"/>
                    <path d="M300 120 l20 -12 20 12 v24 l-20 12 -20 -12 Z"/>
                    <path d="M30 140 l20 -12 20 12 v24 l-20 12 -20 -12 Z"/>
                    <path d="M150 20 l20 -12 20 12 v24 l-20 12 -20 -12 Z"/>
                  </g>
                  {/* bear coin */}
                  <circle cx="170" cy="106" r="42" fill="#fff" stroke="#0d0d12" strokeWidth="4"/>
                  <circle cx="170" cy="106" r="34" fill="#0d0d12"/>
                  {/* bear head */}
                  <g fill="#fff">
                    <circle cx="158" cy="98" r="7"/><circle cx="182" cy="98" r="7"/>
                    <path d="M150 106 a20 18 0 0 1 40 0 a20 18 0 0 1 -40 0 Z"/>
                  </g>
                  <g fill="#0d0d12">
                    <circle cx="162" cy="106" r="2.6"/><circle cx="178" cy="106" r="2.6"/>
                    <ellipse cx="170" cy="116" rx="5" ry="4"/>
                  </g>
                  {/* drops */}
                  <g stroke="#0d0d12" strokeWidth="2.4" fill="none" strokeLinecap="round">
                    <path d="M212 78 q6 8 0 14"/><path d="M224 88 q5 7 0 12"/>
                  </g>
                </svg>
              </div>
              <div className="ac-tags"><span className="ac-tag">DeFi</span><span className="ac-tag">Proof-Of-Stake</span></div>
              <h3>Berachain: what it is and how it revolutionises Liquidity in Web3</h3>
              <p className="ac-desc">Discover how Berachain, a hybrid blockchain, is revolutionising Web3 with its Proof-of-Liquidity mechanism, blending security and liquidity management.</p>
              <p className="ac-meta">September 24, 2025&nbsp;&nbsp;•&nbsp;&nbsp;15 min</p>
            </article>
            <article className="ac-card">
              <div className="ac-thumb"><Badge>Beginner</Badge>
                <svg viewBox="0 0 340 210" preserveAspectRatio="xMidYMid slice">
                  <rect width="340" height="210" fill="#0d0d12"/>
                  {/* isometric cubes */}
                  <g stroke="#0d0d12" strokeWidth="1.6">
                    <g fill="#8b5cf6">
                      <path d="M20 60 l24 -14 24 14 v28 l-24 14 -24 -14 Z"/>
                      <path d="M60 90 l24 -14 24 14 v28 l-24 14 -24 -14 Z"/>
                      <path d="M100 50 l24 -14 24 14 v28 l-24 14 -24 -14 Z"/>
                      <path d="M140 80 l24 -14 24 14 v28 l-24 14 -24 -14 Z"/>
                      <path d="M20 120 l24 -14 24 14 v28 l-24 14 -24 -14 Z"/>
                      <path d="M100 140 l24 -14 24 14 v28 l-24 14 -24 -14 Z"/>
                      <path d="M60 160 l24 -14 24 14 v28 l-24 14 -24 -14 Z"/>
                    </g>
                    <g fill="#fff">
                      <path d="M44 46 l24 -14 24 14 v28 l-24 14 -24 -14 Z"/>
                      <path d="M124 66 l24 -14 24 14 v28 l-24 14 -24 -14 Z"/>
                      <path d="M44 106 l24 -14 24 14 v28 l-24 14 -24 -14 Z"/>
                      <path d="M84 136 l24 -14 24 14 v28 l-24 14 -24 -14 Z"/>
                      <path d="M44 166 l24 -14 24 14 v28 l-24 14 -24 -14 Z"/>
                    </g>
                  </g>
                  {/* magnifier */}
                  <g transform="rotate(-18 250 120)">
                    <circle cx="250" cy="112" r="34" fill="none" stroke="#8b5cf6" strokeWidth="8"/>
                    <circle cx="250" cy="112" r="34" fill="none" stroke="#0d0d12" strokeWidth="2"/>
                    <rect x="272" y="138" width="14" height="46" rx="7" fill="#8b5cf6" stroke="#0d0d12" strokeWidth="2.4"/>
                  </g>
                </svg>
              </div>
              <div className="ac-tags"><span className="ac-tag">Bitcoin</span></div>
              <h3>Bitcoin Block Explorer: how to read a cryptocurrency transaction</h3>
              <p className="ac-desc">What is a blockchain explorer and how does it work? We find out how to read transaction data in cryptocurrencies.</p>
              <p className="ac-meta">April 17, 2025&nbsp;&nbsp;•&nbsp;&nbsp;10 min</p>
            </article>
          </div>
        </section>

      </div>
    </SiteLayout>
  );
}
