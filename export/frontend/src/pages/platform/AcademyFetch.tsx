import SiteLayout from "@/components/site/SiteLayout";
import Seo from "@/components/Seo";
import { t as _t } from "@/i18n";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

/* Fetch.ai hero artwork — yellow lens with dot grid on cream */
const ArtFetch = (
  <svg viewBox="0 0 340 210" preserveAspectRatio="xMidYMid slice">
    <rect width="340" height="210" fill="#0d0d12"/>
    <rect x="0" y="30" width="340" height="150" fill="#ffe9b3"/>
    {/* yellow boxes */}
    <g fill="#ffd21f" stroke="#0d0d12" strokeWidth="3.4">
      <rect x="30" y="130" width="54" height="54" rx="8"/>
      <rect x="252" y="26" width="48" height="48" rx="8"/>
      <rect x="84" y="26" width="42" height="42" rx="8"/>
      <rect x="236" y="146" width="46" height="46" rx="8"/>
    </g>
    {/* white boxes */}
    <g fill="#fff" stroke="#0d0d12" strokeWidth="3">
      <rect x="70" y="120" width="40" height="40" rx="8"/>
      <rect x="240" y="60" width="36" height="36" rx="8"/>
    </g>
    {/* lens */}
    <circle cx="170" cy="106" r="46" fill="#ffd21f" stroke="#0d0d12" strokeWidth="4.6"/>
    <circle cx="170" cy="106" r="38" fill="#fff"/>
    <circle cx="170" cy="106" r="30" fill="#0d0d12"/>
    <g fill="#ffd21f">
      <circle cx="154" cy="94" r="5"/><circle cx="170" cy="94" r="5"/><circle cx="186" cy="94" r="5"/>
      <circle cx="154" cy="110" r="5"/><circle cx="170" cy="110" r="5"/><circle cx="186" cy="110" r="5"/>
      <circle cx="154" cy="126" r="5"/><circle cx="170" cy="126" r="5"/><circle cx="186" cy="126" r="5"/>
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

export default function AcademyFetch() {
  return (
    <SiteLayout>
      <Seo title="Understanding Fetch.ai (FET): a complete guide with essential information — Blockscaner Academy" description="Fetch.ai merges AI with blockchain. Discover how FET cryptocurrency powers its innovative tech and applications in AI." />
      <div className="ac-article" data-testid="academy-article-fetch">

        {/* breadcrumb */}
        <p className="ac-crumb">
          <Link to="/products/academy">Home</Link>
          <span>›</span>
          <a href="#" onClick={(e) => e.preventDefault()}>Cryptonomics</a>
          <span>›</span>
          <b>Understanding Fetch.ai (FET): a complete guide with essential information</b>
        </p>

        {/* header row */}
        <div className="ac-article-top">
          <Link to="/products/academy" className="ac-back" aria-label="Back to Academy"><ArrowLeft size={18} /></Link>
          <Tag>Crypto Market</Tag><Tag>Proof-Of-Stake</Tag>
        </div>

        <div className="ac-article-head">
          <h1>{_t("Understanding Fetch.ai")}<br />{_t("(FET): a complete guide")}<br />{_t("with essential")}<br />{_t("information")}</h1>
          <div className="ac-share">
            <span className="ac-share-ic" aria-label="Share on X"><ShareIcon d="M18.9 2H22l-6.8 7.8L23 22h-6.3l-4.9-6.4L6.2 22H3l7.3-8.3L1.5 2h6.4l4.4 5.9L18.9 2zm-1.1 18h1.7L7.1 3.9H5.3L17.8 20z"/></span>
            <span className="ac-share-ic" aria-label="Share on Facebook"><ShareIcon d="M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.4h-1.2c-1.2 0-1.6.8-1.6 1.6V12h2.7l-.4 2.9h-2.3v7A10 10 0 0 0 22 12z"/></span>
            <span className="ac-share-ic" aria-label="Share on LinkedIn"><ShareIcon d="M20.4 20.4h-3.5v-5.6c0-1.3 0-3-1.9-3s-2.1 1.4-2.1 2.9v5.7H9.4V9h3.4v1.6h.1c.5-.9 1.7-1.9 3.4-1.9 3.6 0 4.3 2.4 4.3 5.5v6.2zM5.3 7.4a2 2 0 1 1 0-4.1 2 2 0 0 1 0 4.1zM7.1 20.4H3.6V9h3.5v11.4z"/></span>
          </div>
        </div>
        <p className="ac-meta">December 20, 2023&nbsp;&nbsp;•&nbsp;&nbsp;5 min</p>

        {/* hero image */}
        <div className="ac-article-thumb">
          <Badge>Beginner</Badge>
          {ArtFetch}
        </div>

        {/* intro paragraph */}
        <div className="ac-body">
          <p>What exactly is Fetch.ai, and how does it operate? Essentially, <b>Fetch.ai</b> is a platform that fuses blockchain technology with artificial intelligence (AI) and machine learning. It offers versatile solutions to various industries, including automotive and healthcare.</p>
        </div>

        {/* academy badge */}
        <div className="ac-summary-brand" style={{ marginTop: "1.2rem" }}>
          <span className="ac-summary-check"><svg viewBox="0 0 24 24" width="16" height="16"><path d="M5 13l4 4L19 7" stroke="#fff" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
          <span>academy</span>
        </div>

        {/* Fetch.ai facts table */}
        <div className="ac-fetch-table" data-testid="fetch-table">
          <div className="ac-fetch-row ac-fetch-row-head">
            <div className="ac-fetch-cell">Launch</div>
            <div className="ac-fetch-cell">Founders</div>
            <div className="ac-fetch-cell">Consensus<br />Mechanism</div>
            <div className="ac-fetch-cell">Max Supply</div>
            <div className="ac-fetch-cell">Field</div>
          </div>
          <div className="ac-fetch-row">
            <div className="ac-fetch-cell">2017</div>
            <div className="ac-fetch-cell">Humayun Sheikh</div>
            <div className="ac-fetch-cell">Fetch.ai</div>
            <div className="ac-fetch-cell">1,152,997,575<br />FET</div>
            <div className="ac-fetch-cell">AI</div>
          </div>
        </div>

        {/* Article body continued */}
        <div className="ac-body">
          <h2 id="fetch-genesis">{_t("The genesis and evolution of Fetch.ai (FET)")}</h2>
          <p>Fetch.ai isn't defined by a singular concept. Established in <b>2017</b>, this platform serves as an AI solutions development lab, complete with its cryptocurrency economy.</p>
          <p>Founded by CEO <b>Humayun Sheikh</b>, Fetch.ai's mission is clear: democratise access to artificial intelligence through an open network available to all. The FET network facilitates secure access to datasets and harnesses AI's capabilities for diverse applications.</p>
          <p>Delving deeper into Fetch.ai's practical applications reveals its versatility. Examples include enhancing DeFi trading services, facilitating data exchange in the automotive sector, and managing intelligent energy grids. In essence, Fetch.ai adeptly handles complex digital systems reliant on extensive data sets.</p>

          <h2 id="fetch-infrastructure">{_t("The technical infrastructure of Fetch.ai")}</h2>
          <p>So, what comprises Fetch.ai, and how does it function technically? Fetch.ai is an <b>interchain protocol</b> developed with the Cosmos Software Development Kit (SDK) and the WASM programming language, positioning it as a next-gen Layer 1 protocol. It stands out with its native AI components, distinguishing it from similar protocols like Celestia (TIA) or Solana (SOL).</p>
          <p>Unlike typical Layer 1 solutions focused on programmability or scalability, Fetch.ai is engineered to facilitate the creation of knowledgeable applications. Software developed on Fetch.ai leverages <b>Autonomous Economic Agents (AEAs)</b>, capable of executing far more complex tasks than traditional smart contracts.</p>
          <p>AEAs dynamically program themselves based on specific needs. Like AI chatbots like Chat GPT, they analyse data and context, acting coherently to achieve set objectives.</p>

          <h2 id="fetch-capabilities">{_t("Capabilities of Fetch.ai")}</h2>
          <p>Fetch.ai transcends being a mere transaction-processing Layer 1 blockchain or a straightforward AI/machine learning program. Through its AEAs, which can be installed on various machines, Fetch.ai addresses a broad spectrum of challenges by leveraging these two technological powerhouses.</p>
          <p>Per the development team, AEAs can be integrated into environments as diverse as research labs, vehicles, hotel rooms, and even aeroplane seats. Fetch.ai's technology appears boundless, and its five main functionalities illustrate this:</p>
          <ul>
            <li><b>Advertising Services:</b> AEAs in marketplaces can pair with promotional 'agents', enabling users to advertise or locate goods and services.</li>
            <li><b>Communication:</b> AEAs' machine learning algorithms understand natural language, facilitating interactions between users speaking different languages.</li>
            <li><b>Negotiation:</b> AEAs follow rules and mechanisms for fair pricing, with customisable strategies to meet user expectations.</li>
            <li><b>Collaboration:</b> With varied objectives, agents can still cooperate for mutual benefits, like optimising a taxi network for equitable earnings.</li>
            <li><b>Execution (Trading):</b> Fetch.AI's scalable, low-cost ledger supports value transfers, enabling secure decentralised trading via DEXs.</li>
          </ul>

          <h2 id="fetch-token">{_t("The FET Token")}</h2>
          <p>The <b>FET token</b>, launched in 2019 through a Binance IEO, is central to Fetch.ai's ecosystem. It covers transaction fees, AEA development, and access to existing services. FET holders can also stake their tokens on the Fetch.ai blockchain, participating in transaction validation via the Proof-of-Stake consensus mechanism and earning FET rewards. Governance within Fetch.ai is also accessible through FET tokens.</p>
          <p>FET exists in two forms: native to the Fetch.ai network and as an <b>ERC-20</b> standard token. Users can convert between these forms using the native bridge.</p>

          <h2 id="fetch-impact">{_t("Fetch.ai's Impact: Automotive and Healthcare Sectors")}</h2>
          <p>Fetch.ai's practical applications extend to various industries. For instance:</p>
          <ul>
            <li><b>Collective Learning:</b> Developed by Fetch.ai, this tool allows AEAs to collaboratively train machine learning models without sharing sensitive data. In collaboration with the Poznan Supercomputing Networking Centre (PSNC), this technology is being used to train algorithms for cancer cell detection, bypassing access to confidential patient data.</li>
            <li><b>Catena-X:</b> This secure network enables efficient data exchange within the automotive industry. Significant brands like Mercedes, Bosch, and Siemens utilise Catena-X for data sharing, enhancing logistics and promoting sustainable CO2 reduction.</li>
          </ul>

          <h2 id="fetch-conclusions">{_t("Conclusions")}</h2>
          <p>To summarise, Fetch.ai represents one of the first blockchains to seamlessly integrate artificial intelligence and machine learning. It aims to leverage these technologies to address complex challenges across various industries.</p>
        </div>

        {/* Sign up banner */}
        <div className="ac-signup" data-testid="fetch-signup-banner">
          <div className="ac-signup-left">
            <span className="ac-buy-logo ac-signup-logo"><svg viewBox="0 0 24 24" width="20" height="20"><rect x="3" y="3" width="18" height="18" rx="4" fill="none" stroke="#fff" strokeWidth="1.6"/><path d="M8 8h6a3 3 0 0 1 0 6H8zM8 14h7a3 3 0 0 1 0 6H8z" fill="none" stroke="#fff" strokeWidth="1.6"/><circle cx="17.5" cy="6.5" r="1.3" fill="#3ddc84"/></svg>blockscaner</span>
            <h3>{_t("Sign up")}<br />{_t("to Blockscaner")}</h3>
            <a className="ac-signup-btn" href="/products" onClick={(e) => e.preventDefault()}>{_t("Start now")} <span>→</span></a>
          </div>
          <div className="ac-signup-art">
            <svg viewBox="0 0 240 190" preserveAspectRatio="xMidYMid slice">
              <defs>
                <linearGradient id="fetchBanner" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0" stopColor="#0e5fb8"/><stop offset="1" stopColor="#1a7fd0"/>
                </linearGradient>
              </defs>
              <rect width="240" height="190" fill="url(#fetchBanner)"/>
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

      </div>
    </SiteLayout>
  );
}
