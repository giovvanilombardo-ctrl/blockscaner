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

        {/* Article body */}
        <div className="ac-body">
          <h2 id="erc-update">{_t("The Ethereum ERC-8004 update is here: the new standard that promises a new lease of life for AI agents.")}</h2>
          <p>Agent-based artificial intelligence represents <b>one of the fastest-growing developments in the current global technology landscape</b>.</p>
          <p>Unlike a traditional Large Language Model (LLM), which merely generates a response based on an input, an AI agent is designed to pursue objectives autonomously, breaking complex problems into subtasks and using external tools to improve its behaviour based on the results.</p>
          <p>Thanks to AI agents, <b>we are essentially moving rapidly from purely <b>reactive</b> artificial intelligence systems to systems capable of acting in the real world with a significant degree of <b>autonomy</b>.</b></p>

          {/* Agent Growth Trends chart */}
          <section className="ac-chartsec ac-erc-growth" data-testid="erc-growth-chart">
            <div className="ac-summary-brand">
              <span className="ac-summary-check"><svg viewBox="0 0 24 24" width="16" height="16"><path d="M5 13l4 4L19 7" stroke="#fff" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
              <span>academy</span>
            </div>
            <div className="ac-erc-chart">
              <div className="ac-erc-chart-head">
                <b>Agent Growth Trends</b>
                <span className="ac-erc-chart-legend"><i />Daily New Agents</span>
              </div>
              <svg viewBox="0 0 620 240" preserveAspectRatio="none" role="img" aria-label="Agent Growth Trends chart">
                {/* grid */}
                <g stroke="#ececf1" strokeWidth="1">
                  <line x1="46" y1="30" x2="600" y2="30" />
                  <line x1="46" y1="85" x2="600" y2="85" />
                  <line x1="46" y1="140" x2="600" y2="140" />
                  <line x1="46" y1="195" x2="600" y2="195" />
                </g>
                {/* y labels */}
                <g fontSize="10" fill="#9a9aa0" textAnchor="end">
                  <text x="40" y="34">140000</text>
                  <text x="40" y="89">95000</text>
                  <text x="40" y="144">70000</text>
                  <text x="40" y="199">35000</text>
                </g>
                {/* x labels */}
                <g fontSize="10" fill="#9a9aa0" textAnchor="middle">
                  <text x="70" y="214">Jan 13</text>
                  <text x="140" y="214">Jan 21</text>
                  <text x="210" y="214">Jan 29</text>
                  <text x="280" y="214">Feb 6</text>
                  <text x="350" y="214">Feb 14</text>
                  <text x="420" y="214">Feb 22</text>
                  <text x="490" y="214">Mar 5</text>
                  <text x="565" y="214">Mar 10</text>
                </g>
                {/* area fill */}
                <path d="M46,190 L100,190 L150,189 L190,188 L205,150 L230,142 L255,140 L270,126 L300,122 L330,118 L360,100 L390,95 L420,90 L450,60 L480,55 L510,48 L545,42 L575,38 L600,36 L600,195 L46,195 Z" fill="url(#ercGrad)" opacity=".55" />
                {/* line */}
                <path d="M46,190 L100,190 L150,189 L190,188 L205,150 L230,142 L255,140 L270,126 L300,122 L330,118 L360,100 L390,95 L420,90 L450,60 L480,55 L510,48 L545,42 L575,38 L600,36" fill="none" stroke="#7c5cff" strokeWidth="2" />
                <defs>
                  <linearGradient id="ercGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#7c5cff" stopOpacity=".35" />
                    <stop offset="1" stopColor="#7c5cff" stopOpacity=".02" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </section>

          <p>However, this expansion has not yet been matched by the development of adequate shared infrastructure underpinning relationships among the various agents, with the current system forcing agents to operate in fragmented environments, <b>lacking standardised mechanisms to verify the identity of counterparties or to access portable reputation data</b>.</p>
          <p><b>ERC-8004</b> aims to bridge this gap by defining an open standard for <b>the identity</b>, <b>reputation</b> and <b>validation</b> of AI agents on the Ethereum blockchain.</p>
          <p>If you're curious to find out <b>what the ERC-8004 update is</b> and how it could position Ethereum as the fundamental trust layer upon which the future of distributed artificial intelligence rests, you've come to the right place.</p>

          <h2 id="erc-trust">{_t("The problem of trust between agents")}</h2>
          <p>Imagine a future where an AI agent manages your <a href="#" onClick={(e) => e.preventDefault()}>DeFi</a> portfolio: monitoring prices, moving liquidity between protocols, evaluating returns, and executing trades autonomously. Now imagine that an agent needs to hire a second, more specialised agent — perhaps one that calculates a protocol's risk, or one that optimises transaction <a href="#" onClick={(e) => e.preventDefault()}>fees</a>.</p>
          <p>At this point, a series of questions might arise, such as: <b>how does the first agent know whether it can trust the second? How does it verify its credentials? How does it check its performance history? How does it ensure it isn't interacting with an imposter?</b></p>
          <p>Until now, there has been no shared, open answer to these questions. Each platform adopted proprietary solutions, and trust between agents depended on centralised intermediaries.</p>
          <p><b>ERC-8004</b> stems from a proposal released on <b>13 August 2025</b>, which subsequently went live on the mainnet on <b>29 January 2026</b>, by four of the most prominent developers in the Ethereum ecosystem — Marco De Rossi, Davide Crapis, Jordan Ellis and Erik Reppel — to resolve precisely this problem through a system comprising three ledgers, recreating a history of an AI agent's behaviour within the <a href="#" onClick={(e) => e.preventDefault()}>blockchain</a>.</p>

          {/* EIP-8004 card */}
          <section className="ac-erc-eipsec" data-testid="erc-eip-card">
            <div className="ac-summary-brand">
              <span className="ac-summary-check"><svg viewBox="0 0 24 24" width="16" height="16"><path d="M5 13l4 4L19 7" stroke="#fff" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
              <span>academy</span>
            </div>
            <div className="ac-erc-eip">
              <div className="ac-erc-eip-pills">
                <span className="ac-erc-eip-draft">⚠ Draft</span>
                <span className="ac-erc-eip-track">Standards Track: ERC</span>
              </div>
              <h3>ERC-8004: Trustless Agents <span className="ac-erc-eip-ic">💬</span><span className="ac-erc-eip-ic">‹ ›</span></h3>
              <p className="ac-erc-eip-sub">Discover agents and establish trust through reputation and validation</p>
              <div className="ac-erc-eip-rows">
                <div className="ac-erc-eip-row">
                  <span className="ac-erc-eip-k">Authors</span>
                  <span className="ac-erc-eip-v">Marco De Rossi (<a href="#" onClick={(e) => e.preventDefault()}>@MarcoMetaMask</a>), Davide Crapis (<a href="#" onClick={(e) => e.preventDefault()}>@dcrapis</a>) &lt;<a href="#" onClick={(e) => e.preventDefault()}>davide@ethereum.org</a>&gt;, Jordan Ellis &lt;<a href="#" onClick={(e) => e.preventDefault()}>jordaniellis@google.com</a>&gt;, Erik Reppel &lt;<a href="#" onClick={(e) => e.preventDefault()}>erik.reppel@coinbase.com</a>&gt;</span>
                </div>
                <div className="ac-erc-eip-row">
                  <span className="ac-erc-eip-k">Created</span>
                  <span className="ac-erc-eip-v">2025-08-13</span>
                </div>
                <div className="ac-erc-eip-row">
                  <span className="ac-erc-eip-k">Discussion Link</span>
                  <span className="ac-erc-eip-v"><a href="#" onClick={(e) => e.preventDefault()}>https://ethereum-magicians.org/t/erc-8004-trustless-agents/25098</a></span>
                </div>
                <div className="ac-erc-eip-row">
                  <span className="ac-erc-eip-k">Requires</span>
                  <span className="ac-erc-eip-v"><a href="#" onClick={(e) => e.preventDefault()}>EIP-155</a>, <a href="#" onClick={(e) => e.preventDefault()}>EIP-712</a>, <a href="#" onClick={(e) => e.preventDefault()}>EIP-721</a>, <a href="#" onClick={(e) => e.preventDefault()}>EIP-1271</a></span>
                </div>
              </div>
            </div>
          </section>
        </div>

      </div>
    </SiteLayout>
  );
}
