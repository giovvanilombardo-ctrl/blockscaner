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

          <h2 id="erc-what">{_t("What is an ERC")}</h2>
          <p>Before delving into the more technical aspects of this article and understanding <b>what ERC-8004 is</b> and <b>how it works</b>, it is useful to take a step back and clarify <b>what is meant by the term ERC</b>.</p>
          <p>ERC stands for <b>Ethereum Request for Comments</b>, a set of technical documents that define shared standards for the operation of certain components of the Ethereum ecosystem.</p>
          <p>Essentially, an ERC represents a formal proposal through which developers establish common rules that anyone can adopt — just like the protocols that allow browsers and servers to communicate with one another, regardless of who built them.</p>
          <p>When the community adopts a standard, it becomes a fundamental building block of the blockchain infrastructure, upon which developers can build, knowing that their products will be compatible with the rest of the ecosystem.</p>
          <p>An ERC is therefore <b>an open convention</b>, proposed by developers, discussed publicly and adopted voluntarily to create a more <b>standardised</b> and <b>efficient</b> technological environment.</p>

          <h2 id="erc-registries">{_t("How ERC-8004 works: the three registries")}</h2>
          <p>The ERC-8004 standard, designed to become a benchmark for AI agent infrastructure within the Ethereum ecosystem, achieves this standardisation by establishing <b>three key registries: the 'identity registry', the 'reputation registry' and the 'validation registry'</b>.</p>

          {/* Three registries diagram */}
          <section className="ac-erc-regsec" data-testid="erc-registries-diagram">
            <div className="ac-summary-brand">
              <span className="ac-summary-check"><svg viewBox="0 0 24 24" width="16" height="16"><path d="M5 13l4 4L19 7" stroke="#fff" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
              <span>academy</span>
            </div>
            <div className="ac-erc-reg">
              {/* agents row */}
              <div className="ac-erc-agents">
                <div className="ac-erc-agent">
                  <b>AI Agent 1</b>
                  <span>Manages DeFi portfolio</span>
                </div>
                <div className="ac-erc-link"><i /><span className="ac-erc-q">?</span><i /></div>
                <div className="ac-erc-agent">
                  <b>AI Agent 2</b>
                  <span>Calculates DeFi risk</span>
                </div>
              </div>
              {/* arrows */}
              <div className="ac-erc-arrows">
                <svg viewBox="0 0 20 34" width="18" height="30"><path d="M10 2v24M4 20l6 8 6-8" stroke="#7c5cff" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
                <svg viewBox="0 0 20 34" width="18" height="30"><path d="M10 2v24M4 20l6 8 6-8" stroke="#7c5cff" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
              {/* registries */}
              <div className="ac-erc-regs">
                <div className="ac-erc-registry">
                  <b>Identity Registry</b>
                  <p>Unique on-chain ID via ERC-721 NFT</p>
                  <p>Public Agent Card capabilities &amp; endpoints</p>
                  <p>No intermediaries</p>
                </div>
                <div className="ac-erc-registry">
                  <b>Reputation Registry</b>
                  <p>Structured feedback after each task</p>
                  <p>Immutable and public performance history</p>
                  <p>Open portability</p>
                </div>
                <div className="ac-erc-registry">
                  <b>Validation Registry</b>
                  <p>Third-party verification by independents</p>
                  <p>Auditors, institutions and specialised agents</p>
                  <p>Public and permanent</p>
                </div>
              </div>
            </div>
          </section>

          <p>Each of these registries intervenes at a specific stage of an agent's lifecycle, thereby creating a <b>verifiable</b>, <b>interoperable</b> and <b>trustless</b> system. Let us now look more closely at each registry to understand in detail what ERC-8004 is and how it works.</p>

          <h3>{_t("Identity registry")}</h3>
          <p>The first registry, the <b>identity registry</b>, fulfils the critical function of anchoring the agent on the blockchain, representing its formal and unique identity.</p>
          <p>In a purely digital and potentially ephemeral context, this identity is consolidated through the issuance of a <b>non-fungible token (NFT)</b> compliant with the <b>ERC-721</b> standard. This technical choice not only guarantees authenticity but also enables the transferability of the agent's ownership and granular management of access rights.</p>
          <p>The informational core of this registry lies in the so-called <b>Agent Card</b>, a JSON document that serves as a universal technical specification. Within it, operational endpoints, declared capabilities and payment addresses are mapped; this allows any smart contract or user to uniquely identify the methods of interaction with the synthetic entity, without resorting to centralised intermediaries.</p>

          <h3>{_t("Reputation registry")}</h3>
          <p>The second registry, the <b>reputation registry</b>, constitutes the agent's operational history, acting as an immutable archive of behavioural and technical performance. In this second pillar, trust is quantified through the on-chain recording of structured feedback, generated at the end of each interaction by users or other coordinating agents.</p>
          <p>This architecture transforms qualitative data into a transparent empirical metric that reflects critical parameters such as execution reliability, response latency, and the accuracy of the outputs provided.</p>
          <p>To achieve this objective, the registry introduces a mechanism based on applied game theory: since building a positive reputation requires a constant commitment of resources and time (opportunity cost), the accumulated reputational capital acts as collateral against malicious behaviour. In the absence of a central rating authority, the Reputation Registry enables selecting agents solely on cryptographic evidence, making operational merit a verifiable, immutable digital asset.</p>

          <h3>{_t("Validation registry")}</h3>
          <p>The third and final component, the <b>validation registry</b>, introduces a level of external verification necessary to mitigate the information asymmetries inherent in artificial intelligence models.</p>
          <p>This registry enables qualified third parties — such as security auditors, academic institutions, or agents specialising in validation — to issue formal attestations regarding specific competencies, security standards, or the agent's ethical compliance.</p>
          <p>The combination of these three elements represents a true paradigm shift in how AI agents interact with one another: for the first time, <b>identity</b>, <b>reputation</b>, and <b>validation</b> are brought together and transformed into shared, portable resources that anyone on the blockchain can verify.</p>

          <h2 id="erc-future">{_t("Why it matters for the future of Ethereum")}</h2>
          <p>Ethereum's history is written in its standards. These are not merely technical documents, but the foundations upon which entire cycles of economic innovation rest. This happened in 2015 with <b>ERC-20</b>, which gave rise to the token industry, and in 2017 with <b>ERC-721</b>, which opened the doors to the world of NFTs, transforming both cases into global markets.</p>
          <p><b>ERC-8004</b> follows exactly in this vein, but raises the stakes further by applying the logic of standardisation to agentic artificial intelligence.</p>
          <p>With this standard, Ethereum ceases to be merely a network for financial transactions and positions itself to become the <b>universal trust layer for autonomous agents</b>, thereby creating the technological environment necessary for the growth of an on-chain synthetic economy, where complex services are delivered and verified without human intervention.</p>
          <p>Understanding what ERC-8004 is and how it works means having the tools to grasp the next phase of Ethereum's maturity: the one in which the programmability of value finally meets the autonomy of AI, transforming the network's use into concrete, measurable utility rooted in the real economy.</p>
        </div>

        {/* Buy ETH banner */}
        <div className="ac-buy">
          <div className="ac-buy-left">
            <span className="ac-buy-logo"><svg viewBox="0 0 24 24" width="20" height="20"><rect x="3" y="3" width="18" height="18" rx="4" fill="none" stroke="#0f0f12" strokeWidth="1.6"/><path d="M8 8h6a3 3 0 0 1 0 6H8zM8 14h7a3 3 0 0 1 0 6H8z" fill="none" stroke="#0f0f12" strokeWidth="1.6"/><circle cx="17.5" cy="6.5" r="1.3" fill="#1663d9"/></svg>blockscaner</span>
            <h3>{_t("Buy ETH")}<br />{_t("on Blockscaner")}</h3>
            <a className="ac-buy-btn" href="/products" onClick={(e) => e.preventDefault()}>{_t("Buy now")} <span>→</span></a>
          </div>
          <div className="ac-buy-art">
            <svg viewBox="0 0 220 150" preserveAspectRatio="xMidYMid slice">
              <defs>
                <linearGradient id="ercPed" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#7fb2ff"/><stop offset="1" stopColor="#3a86ff"/>
                </linearGradient>
                <linearGradient id="ercPedTop" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0" stopColor="#a8ccff"/><stop offset="1" stopColor="#6ea8ff"/>
                </linearGradient>
                <linearGradient id="ercCoin" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#8fb6ff"/><stop offset="1" stopColor="#3a86ff"/>
                </linearGradient>
              </defs>
              <rect width="220" height="150" fill="#eef3ff"/>
              {/* pedestal */}
              <path d="M70 150 L70 88 a40 14 0 0 1 80 0 L150 150 Z" fill="url(#ercPed)"/>
              <ellipse cx="110" cy="88" rx="40" ry="14" fill="url(#ercPedTop)"/>
              {/* ETH coin */}
              <circle cx="110" cy="58" r="36" fill="url(#ercCoin)"/>
              <path d="M110 30 L130 60 L110 74 L90 60 Z" fill="#fff"/>
              <path d="M110 30 L130 60 L110 54 Z" fill="#dbe7ff"/>
              <path d="M110 82 L128 64 L110 76 L92 64 Z" fill="#fff" opacity=".9"/>
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
            <article className="ac-card">
              <div className="ac-thumb"><Badge>Beginner</Badge>
                <svg viewBox="0 0 340 210" preserveAspectRatio="xMidYMid slice">
                  <rect width="340" height="210" fill="#bfe9ff"/>
                  {/* network lines */}
                  <g stroke="#0d0d12" strokeWidth="3" fill="none">
                    <path d="M30 30 L90 70 M310 26 L250 66 M26 180 L92 142 M314 178 L248 140"/>
                  </g>
                  <g fill="#3a86ff" stroke="#0d0d12" strokeWidth="3">
                    <rect x="14" y="16" width="30" height="30" rx="6" transform="rotate(12 29 31)"/>
                    <rect x="296" y="14" width="30" height="30" rx="6" transform="rotate(-10 311 29)"/>
                    <rect x="12" y="166" width="30" height="30" rx="6" transform="rotate(-8 27 181)"/>
                    <rect x="298" y="164" width="30" height="30" rx="6" transform="rotate(10 313 179)"/>
                  </g>
                  {/* server block */}
                  <rect x="105" y="120" width="130" height="46" rx="10" fill="#3ad0ff" stroke="#0d0d12" strokeWidth="3.5"/>
                  <path d="M105 132 h130" stroke="#0d0d12" strokeWidth="2" opacity=".4"/>
                  <rect x="112" y="158" width="116" height="14" rx="6" fill="#0d0d12"/>
                  {/* VR visor */}
                  <path d="M92 74 a78 40 0 0 1 156 0 l-8 34 a40 24 0 0 1 -30 18 l-24 4 a30 16 0 0 1 -32 0 l-24 -4 a40 24 0 0 1 -30 -18 Z" fill="#3ad0ff" stroke="#0d0d12" strokeWidth="4"/>
                  <rect x="118" y="66" width="104" height="40" rx="20" fill="#fff" stroke="#0d0d12" strokeWidth="3.5"/>
                  <text x="170" y="95" fontSize="26" fontWeight="800" textAnchor="middle" fill="#0d0d12" fontStyle="italic">DePIN</text>
                  {/* antenna */}
                  <path d="M170 34 v-14 M162 24 l8 -8 8 8" stroke="#0d0d12" strokeWidth="3.5" fill="none" strokeLinecap="round"/>
                </svg>
              </div>
              <div className="ac-tags"><span className="ac-tag">DeFi</span></div>
              <h3>DePIN: what they are and how decentralized physical infrastructure networks work</h3>
              <p className="ac-desc">What is DePIN? The blockchain technology revolutionising decentralised physical infrastructure</p>
              <p className="ac-meta">March 19, 2026&nbsp;&nbsp;•&nbsp;&nbsp;8 min</p>
            </article>
            <article className="ac-card">
              <div className="ac-thumb"><Badge>Beginner</Badge>
                <svg viewBox="0 0 340 210" preserveAspectRatio="xMidYMid slice">
                  <rect width="340" height="210" fill="#ff8f9f"/>
                  {/* side rails */}
                  <rect x="28" y="0" width="26" height="210" rx="13" fill="#0d0d12"/>
                  <rect x="286" y="0" width="26" height="210" rx="13" fill="#0d0d12"/>
                  {/* globe */}
                  <circle cx="170" cy="92" r="52" fill="#ff5f7a" stroke="#0d0d12" strokeWidth="4"/>
                  <g stroke="#0d0d12" strokeWidth="2.2" fill="none">
                    <ellipse cx="170" cy="92" rx="52" ry="18"/>
                    <ellipse cx="170" cy="92" rx="52" ry="36"/>
                    <ellipse cx="170" cy="92" rx="18" ry="52"/>
                    <ellipse cx="170" cy="92" rx="36" ry="52"/>
                    <path d="M118 92 h104"/>
                  </g>
                  {/* pedestal */}
                  <rect x="128" y="146" width="84" height="16" rx="6" fill="#0d0d12"/>
                  <rect x="104" y="162" width="132" height="26" rx="12" fill="#fff" stroke="#0d0d12" strokeWidth="3.5"/>
                  {/* labels */}
                  <g fontSize="13" fontWeight="800" textAnchor="middle">
                    <rect x="66" y="66" width="42" height="26" rx="13" fill="#fff" stroke="#0d0d12" strokeWidth="2.6"/>
                    <text x="87" y="84" fill="#ff5f7a">RWA</text>
                    <rect x="232" y="60" width="42" height="26" rx="13" fill="#fff" stroke="#0d0d12" strokeWidth="2.6"/>
                    <text x="253" y="78" fill="#ff5f7a">RWA</text>
                  </g>
                </svg>
              </div>
              <div className="ac-tags"><span className="ac-tag">DeFi</span></div>
              <h3>RWA: what they are and how they work</h3>
              <p className="ac-desc">Real World Assets (RWA): the new revolution in the global financial system</p>
              <p className="ac-meta">February 6, 2026&nbsp;&nbsp;•&nbsp;&nbsp;11 min</p>
            </article>
            <article className="ac-card">
              <div className="ac-thumb"><Badge>Beginner</Badge>
                <svg viewBox="0 0 340 210" preserveAspectRatio="xMidYMid slice">
                  <rect width="340" height="210" fill="#a98bff"/>
                  {/* x sparkles */}
                  <g stroke="#fff" strokeWidth="3" strokeLinecap="round">
                    <path d="M40 40 l14 14 M54 40 l-14 14"/>
                    <path d="M288 36 l14 14 M302 36 l-14 14"/>
                    <path d="M52 150 l12 12 M64 150 l-12 12"/>
                    <path d="M282 158 l12 12 M294 158 l-12 12"/>
                    <path d="M150 26 l10 10 M160 26 l-10 10"/>
                  </g>
                  {/* moon circle */}
                  <circle cx="120" cy="112" r="56" fill="#fff"/>
                  {/* head silhouette */}
                  <path d="M150 60 a58 58 0 0 1 66 44 q10 2 8 12 q-2 8 -10 10 q2 10 -6 14 q0 12 -12 14 l-4 22 h-66 q10 -30 4 -52 a58 58 0 0 1 20 -64 Z" fill="#0d0d12"/>
                  {/* grok eye */}
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
