import SiteLayout from "@/components/site/SiteLayout";
import Seo from "@/components/Seo";
import { t as _t } from "@/i18n";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

/* DePIN hero artwork — VR visor with network nodes */
const ArtDePIN = (
  <svg viewBox="0 0 340 210" preserveAspectRatio="xMidYMid slice">
    <rect width="340" height="210" fill="#bfe9ff"/>
    {/* network lines */}
    <g stroke="#0d0d12" strokeWidth="4" fill="none">
      <path d="M30 30 L96 66 M310 26 L244 62 M26 184 L96 146 M314 182 L244 144"/>
    </g>
    {/* corner nodes */}
    <g fill="#3a86ff" stroke="#0d0d12" strokeWidth="3.5">
      <rect x="12" y="14" width="34" height="34" rx="6" transform="rotate(12 29 31)"/>
      <rect x="294" y="12" width="34" height="34" rx="6" transform="rotate(-10 311 29)"/>
      <rect x="10" y="168" width="34" height="34" rx="6" transform="rotate(-8 27 185)"/>
      <rect x="296" y="166" width="34" height="34" rx="6" transform="rotate(10 313 183)"/>
    </g>
    {/* antenna */}
    <path d="M170 40 v-16 M160 30 l10 -10 10 10" stroke="#0d0d12" strokeWidth="4" fill="none" strokeLinecap="round"/>
    {/* VR visor */}
    <path d="M86 80 a84 44 0 0 1 168 0 l-8 38 a44 26 0 0 1 -32 19 l-26 5 a32 17 0 0 1 -36 0 l-26 -5 a44 26 0 0 1 -32 -19 Z" fill="#3ad0ff" stroke="#0d0d12" strokeWidth="5"/>
    <rect x="112" y="72" width="116" height="44" rx="22" fill="#fff" stroke="#0d0d12" strokeWidth="4"/>
    <text x="170" y="104" fontSize="30" fontWeight="800" textAnchor="middle" fill="#0d0d12" fontStyle="italic">DePIN</text>
    {/* base blocks */}
    <rect x="96" y="148" width="64" height="26" rx="8" fill="#3ad0ff" stroke="#0d0d12" strokeWidth="3.5" transform="rotate(-4 128 161)"/>
    <rect x="182" y="148" width="64" height="26" rx="8" fill="#3a86ff" stroke="#0d0d12" strokeWidth="3.5" transform="rotate(4 214 161)"/>
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

export default function AcademyDePIN() {
  return (
    <SiteLayout>
      <Seo title="DePIN: what they are and how decentralized physical infrastructure networks work — Blockscaner Academy" description="What is DePIN? The blockchain technology revolutionising decentralised physical infrastructure." />
      <div className="ac-article" data-testid="academy-article-depin">

        {/* header row */}
        <div className="ac-article-top">
          <Link to="/products/academy" className="ac-back" aria-label="Back to Academy"><ArrowLeft size={18} /></Link>
          <Tag>DeFi</Tag>
        </div>

        <div className="ac-article-head">
          <h1>{_t("DePIN: what they are and how")}<br />{_t("decentralized physical")}<br />{_t("infrastructure networks work")}</h1>
          <div className="ac-share">
            <span className="ac-share-ic" aria-label="Share on X"><ShareIcon d="M18.9 2H22l-6.8 7.8L23 22h-6.3l-4.9-6.4L6.2 22H3l7.3-8.3L1.5 2h6.4l4.4 5.9L18.9 2zm-1.1 18h1.7L7.1 3.9H5.3L17.8 20z"/></span>
            <span className="ac-share-ic" aria-label="Share on Facebook"><ShareIcon d="M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.4h-1.2c-1.2 0-1.6.8-1.6 1.6V12h2.7l-.4 2.9h-2.3v7A10 10 0 0 0 22 12z"/></span>
            <span className="ac-share-ic" aria-label="Share on LinkedIn"><ShareIcon d="M20.4 20.4h-3.5v-5.6c0-1.3 0-3-1.9-3s-2.1 1.4-2.1 2.9v5.7H9.4V9h3.4v1.6h.1c.5-.9 1.7-1.9 3.4-1.9 3.6 0 4.3 2.4 4.3 5.5v6.2zM5.3 7.4a2 2 0 1 1 0-4.1 2 2 0 0 1 0 4.1zM7.1 20.4H3.6V9h3.5v11.4z"/></span>
          </div>
        </div>
        <p className="ac-meta">March 19, 2026&nbsp;&nbsp;•&nbsp;&nbsp;8 min</p>

        {/* hero image */}
        <div className="ac-article-thumb">
          <Badge>Beginner</Badge>
          {ArtDePIN}
        </div>

        {/* You will learn */}
        <div className="ac-learn">
          <h2>{_t("You will learn")}</h2>
          <ul>
            <li><a href="#depin-what">{_t("What is DePIN? the blockchain technology revolutionizing decentralized physical infrastructure")}</a></li>
            <li><a href="#depin-definition">{_t("What is DePIN: a simple definition")}</a></li>
            <li><a href="#depin-flywheel">{_t("How DePIN works: the magic of the economic “flywheel”")}</a></li>
            <li><a href="#depin-categories">{_t("The two major categories of DePIN: PRN vs. DRN")}</a></li>
            <li><a href="#depin-advantages">{_t("The advantages of DePIN")}</a></li>
            <li><a href="#depin-challenges">{_t("Current challenges for the DePIN movement")}</a></li>
            <li><a href="#depin-conclusions">{_t("Conclusions")}</a></li>
          </ul>
        </div>

        {/* Article body */}
        <div className="ac-body">
          <h2 id="depin-what">{_t("What is DePIN? the blockchain technology revolutionizing decentralized physical infrastructure")}</h2>
          <p>Imagine a world where you don't have to pay massive corporations to use the internet, store data, or access connectivity networks—instead, it is you, using your own hardware, who builds those networks and receives a reward for doing so. This isn't science fiction: it's called DePIN, and it's already happening.</p>
          <p>DePIN, an acronym for <b>Decentralized Physical Infrastructure Networks</b>, is one of the most exciting and fastest-growing sectors in the crypto ecosystem. Unlike many web3 projects that exist solely on-chain, DePIN brings decentralization into the real physical world: hotspots, antennas, hard drives, GPUs, and sensors—all managed not by a single corporation, but by a distributed community of everyday people incentivized by tokens.</p>
          <p>Projects like <a href="#" onClick={(e) => e.preventDefault()}>Filecoin</a> or Render Network are just a small fraction of the entities that, thanks to DePIN technology, are already revolutionizing the world of physical infrastructure, creating a viable alternative to today's centralized systems.</p>
          <p>In this article, we will answer these questions: What is DePIN, how does it work, and why could it be one of the most important trends of the coming years?</p>

          <h2 id="depin-definition">{_t("What is DePIN: a simple definition")}</h2>
          <p>What exactly is DePIN? The core concept behind this movement is to <b>shift the ownership and management of physical infrastructure from large centralized operators to a distributed network of participants</b> coordinated by blockchain technology.</p>
          <p>In the current traditional model, the vast majority of internet networks, servers, data storage systems, and infrastructure are built and controlled by a handful of giant companies. The DePIN movement aims to flip this logic by building decentralized networks managed by a multitude of individuals. In this model, <b>every participant contributes their own physical resources—such as hardware, connectivity, or computing power—and is compensated through economic incentive mechanisms</b>. This creates a system where individual interests are perfectly aligned with the growth of the network.</p>

          {/* DePIN network illustration */}
          <section className="ac-depin-netsec" data-testid="depin-network-art">
            <div className="ac-summary-brand">
              <span className="ac-summary-check"><svg viewBox="0 0 24 24" width="16" height="16"><path d="M5 13l4 4L19 7" stroke="#fff" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
              <span>academy</span>
            </div>
            <div className="ac-depin-net">
              <svg viewBox="0 0 480 260" role="img" aria-label="DePIN network illustration">
                {/* mesh lines */}
                <g stroke="#d9ccf7" strokeWidth="1.2" fill="none">
                  <path d="M60 70 L120 46 M120 46 L190 60 M190 60 L250 40 M250 40 L320 56 M320 56 L400 40"/>
                  <path d="M60 70 L96 128 M96 128 L160 110 M160 110 L230 130 M230 130 L300 108 M300 108 L370 128 M370 128 L420 96"/>
                  <path d="M96 128 L140 190 M140 190 L220 176 M220 176 L290 196 M290 196 L360 176"/>
                  <path d="M120 46 L96 128 M190 60 L160 110 M250 40 L230 130 M320 56 L300 108 M400 40 L370 128"/>
                  <path d="M160 110 L140 190 M230 130 L220 176 M300 108 L290 196 M370 128 L360 176"/>
                  <path d="M60 70 L40 150 M40 150 L96 128 M420 96 L440 170 M440 170 L370 128"/>
                  <path d="M40 150 L140 190 M440 170 L360 176 M140 190 L240 236 M240 236 L290 196"/>
                </g>
                {/* small squares */}
                <g fill="#8b5cf6">
                  <rect x="52" y="62" width="16" height="16" rx="3"/>
                  <rect x="112" y="38" width="16" height="16" rx="3"/>
                  <rect x="182" y="52" width="16" height="16" rx="3"/>
                  <rect x="242" y="32" width="16" height="16" rx="3"/>
                  <rect x="312" y="48" width="16" height="16" rx="3"/>
                  <rect x="392" y="32" width="16" height="16" rx="3"/>
                  <rect x="88" y="120" width="16" height="16" rx="3"/>
                  <rect x="152" y="102" width="16" height="16" rx="3"/>
                  <rect x="292" y="100" width="16" height="16" rx="3"/>
                  <rect x="362" y="120" width="16" height="16" rx="3"/>
                  <rect x="132" y="182" width="16" height="16" rx="3"/>
                  <rect x="212" y="168" width="16" height="16" rx="3"/>
                  <rect x="282" y="188" width="16" height="16" rx="3"/>
                  <rect x="352" y="168" width="16" height="16" rx="3"/>
                  <rect x="232" y="228" width="16" height="16" rx="3"/>
                </g>
                {/* big icon circles */}
                <g>
                  <circle cx="230" cy="130" r="34" fill="#8b5cf6"/>
                  <rect x="216" y="120" width="28" height="24" rx="4" fill="none" stroke="#fff" strokeWidth="3.4"/>
                  <path d="M222 120 v-6 a8 8 0 0 1 16 0 v6" fill="none" stroke="#fff" strokeWidth="3.4"/>
                  <circle cx="230" cy="132" r="3.4" fill="#fff"/>
                </g>
                <g>
                  <circle cx="40" cy="150" r="26" fill="#8b5cf6"/>
                  <path d="M44 136 l-10 16 h8 l-4 12 12 -16 h-8 l6 -12 Z" fill="#fff"/>
                </g>
                <g>
                  <circle cx="420" cy="96" r="26" fill="#8b5cf6"/>
                  <path d="M408 104 a17 17 0 0 1 24 0 M412 98 a12 12 0 0 1 16 0 M416 92 a6 6 0 0 1 8 0" stroke="#fff" strokeWidth="3" fill="none" strokeLinecap="round"/>
                  <circle cx="420" cy="106" r="3" fill="#fff"/>
                </g>
                <g>
                  <circle cx="440" cy="170" r="26" fill="#8b5cf6"/>
                  <g fill="none" stroke="#fff" strokeWidth="2.6">
                    <rect x="430" y="160" width="9" height="9" rx="2"/><rect x="441" y="160" width="9" height="9" rx="2"/>
                    <rect x="430" y="171" width="9" height="9" rx="2"/><rect x="441" y="171" width="9" height="9" rx="2"/>
                  </g>
                </g>
                <g>
                  <circle cx="120" cy="46" r="0" fill="none"/>
                  <circle cx="190" cy="60" r="0" fill="none"/>
                </g>
                <g>
                  <circle cx="170" cy="120" r="24" fill="#8b5cf6"/>
                  <g stroke="#fff" strokeWidth="2.8" strokeLinecap="round">
                    <path d="M162 114 h16 M162 120 h16 M162 126 h10"/>
                  </g>
                  <circle cx="168" cy="112" r="1.8" fill="#fff"/>
                </g>
              </svg>
            </div>
          </section>

          <p>The ambition of <b>DePIN</b> is therefore to offer a concrete alternative to the current market concentration—presently dominated by players like <b>Amazon Web Services (AWS)</b> and <b>Google Cloud</b>—through an incentive system designed to be self-sustaining. This is often described as a <b>flywheel</b>, where the value generated by the infrastructure is redistributed to those who make it possible, rather than being concentrated in the hands of a few central actors.</p>

          <h2 id="depin-flywheel">{_t("How DePIN works: the magic of the economic “flywheel”")}</h2>
          <p>To truly understand what DePIN is and how these networks can compete with giants of the caliber of Amazon or Google, one must look at the secret behind this technology's success: the incentive mechanism that drives everything, known as the <b>flywheel effect</b>.</p>
          <p>The flywheel is a virtuous cycle that allows all participants to receive an incentive to remain within the system, maintaining a perfect balance between three main elements:</p>
          <ul>
            <li><b>Suppliers:</b> those who make their hardware available—such as storage space or 5G antennas—to serve the network.</li>
            <li><b>Rewards (tokens):</b> the economic incentive that drives suppliers to keep their machines active and fully operational.</li>
            <li><b>Users (customers):</b> those who actually use and pay for the service, and who must perceive a real advantage in using the decentralized network compared to centralized competitors.</li>
          </ul>

          {/* Supplier / Tokens / Customer circles */}
          <section className="ac-depin-trio" data-testid="depin-trio">
            <div className="ac-summary-brand">
              <span className="ac-summary-check"><svg viewBox="0 0 24 24" width="16" height="16"><path d="M5 13l4 4L19 7" stroke="#fff" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
              <span>academy</span>
            </div>
            <div className="ac-depin-trio-row">
              <div className="ac-depin-circle"><b>Supplier</b></div>
              <div className="ac-depin-circle"><b>Tokens</b></div>
              <div className="ac-depin-circle"><b>Customer</b></div>
            </div>
          </section>

          <p>The combination of these three elements, along with blockchain technology—which enables the decentralized execution and verification of every step—allows the aforementioned <b>flywheel effect</b> to take hold. This continuously incentivizes existing actors while attracting new ones, activating the cycle as follows:</p>
          <ul>
            <li><b>Network expansion:</b> as more suppliers join the network, drawn by token incentives, the infrastructure becomes more extensive and reliable.</li>
            <li><b>Customer attraction:</b> a stronger network attracts more customers, who begin using the service because it is cost-effective and efficient.</li>
            <li><b>Value generation:</b> increased usage generates value, driving the growth of the ecosystem and increasing demand for the token.</li>
            <li><b>Re-investment &amp; growth:</b> as the token gains value, it attracts new suppliers ready to install more hardware to earn more attractive rewards.</li>
          </ul>

          {/* DePIN Flywheel cycle diagram */}
          <section className="ac-depin-cyclesec" data-testid="depin-flywheel-diagram">
            <div className="ac-summary-brand">
              <span className="ac-summary-check"><svg viewBox="0 0 24 24" width="16" height="16"><path d="M5 13l4 4L19 7" stroke="#fff" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
              <span>academy</span>
            </div>
            <div className="ac-depin-cycle">
              <svg viewBox="0 0 560 420" role="img" aria-label="DePIN Flywheel cycle diagram">
                {/* curved arrows */}
                <g fill="none" stroke="#0f0f12" strokeWidth="2">
                  <path d="M330 96 A150 150 0 0 1 424 190"/>
                  <path d="M418 184 l8 12 l-14 2 Z" fill="#0f0f12" stroke="none"/>
                  <path d="M424 236 A150 150 0 0 1 330 326"/>
                  <path d="M336 318 l-8 12 l-6 -13 Z" fill="#0f0f12" stroke="none"/>
                  <path d="M230 326 A150 150 0 0 1 136 236"/>
                  <path d="M142 230 l-8 -12 l14 -2 Z" fill="#0f0f12" stroke="none"/>
                  <path d="M136 190 A150 150 0 0 1 230 96"/>
                  <path d="M224 102 l8 -12 l6 13 Z" fill="#0f0f12" stroke="none"/>
                </g>
                {/* center label */}
                <text x="280" y="208" fontSize="24" fontWeight="800" textAnchor="middle" fill="#0f0f12">DePIN</text>
                <text x="280" y="236" fontSize="24" fontWeight="800" textAnchor="middle" fill="#0f0f12">Flywheel</text>
                {/* top box */}
                <rect x="196" y="10" width="168" height="66" rx="12" fill="#8b5cf6"/>
                <text x="280" y="34" fontSize="12.5" fontWeight="600" textAnchor="middle" fill="#fff">Token rewards incentivize</text>
                <text x="280" y="50" fontSize="12.5" fontWeight="600" textAnchor="middle" fill="#fff">supply-side participants to</text>
                <text x="280" y="66" fontSize="12.5" fontWeight="600" textAnchor="middle" fill="#fff">deploy infrastructure</text>
                {/* right box */}
                <rect x="392" y="178" width="168" height="76" rx="12" fill="#8b5cf6"/>
                <text x="476" y="198" fontSize="12.5" fontWeight="600" textAnchor="middle" fill="#fff">At the network's</text>
                <text x="476" y="214" fontSize="12.5" fontWeight="600" textAnchor="middle" fill="#fff">supply-side grows, devs,</text>
                <text x="476" y="230" fontSize="12.5" fontWeight="600" textAnchor="middle" fill="#fff">product builders, and end</text>
                <text x="476" y="244" fontSize="12.5" fontWeight="600" textAnchor="middle" fill="#fff">users are attracted</text>
                {/* bottom box */}
                <rect x="196" y="344" width="168" height="76" rx="12" fill="#8b5cf6"/>
                <text x="280" y="364" fontSize="12.5" fontWeight="600" textAnchor="middle" fill="#fff">Fees generated from end</text>
                <text x="280" y="380" fontSize="12.5" fontWeight="600" textAnchor="middle" fill="#fff">users utilizing a network's</text>
                <text x="280" y="396" fontSize="12.5" fontWeight="600" textAnchor="middle" fill="#fff">services attracts more</text>
                <text x="280" y="410" fontSize="12.5" fontWeight="600" textAnchor="middle" fill="#fff">service providers</text>
                {/* left box */}
                <rect x="0" y="178" width="168" height="76" rx="12" fill="#8b5cf6"/>
                <text x="84" y="198" fontSize="12.5" fontWeight="600" textAnchor="middle" fill="#fff">Protocol token models</text>
                <text x="84" y="214" fontSize="12.5" fontWeight="600" textAnchor="middle" fill="#fff">create a relationship</text>
                <text x="84" y="230" fontSize="12.5" fontWeight="600" textAnchor="middle" fill="#fff">between network usage</text>
                <text x="84" y="244" fontSize="12.5" fontWeight="600" textAnchor="middle" fill="#fff">and token price</text>
              </svg>
            </div>
          </section>

          <p>Thanks to this approach, <b>DePIN technology does more than just create a long-term sustainable ecosystem</b>; it also solves the problem of the massive upfront investment required to build infrastructure capable of competing with current centralized options.</p>
          <p>In fact, through this incremental process, the incentive created by the ecosystem's growth allows the network to develop <b>organically</b> without the need for enormous initial capital. This provides a significant competitive advantage over centralized alternatives.</p>

          <h2 id="depin-categories">{_t("The two major categories of DePIN: PRN vs. DRN")}</h2>
          <p>Within the DePIN sector, we can distinguish between two main macro-categories: <b>Physical Resource Networks (PRN)</b> and <b>Digital Resource Networks (DRN)</b>. Let's explore the differences.</p>

          <h3>{_t("PRN: Physical Resource Networks")}</h3>
          <p>Physical Resource Networks coordinate tangible and "localized" physical assets, such as wireless connectivity (<b>5G/Wi-Fi</b>), energy grids, or environmental sensors. In this model, the hardware represents the central resource of the ecosystem, and its <b>geographic distribution</b> is essential to ensuring the coverage and efficiency of the services offered on the ground.</p>

          {/* Physical Resource Networks grid */}
          <section className="ac-depin-prn" data-testid="depin-prn-grid">
            <div className="ac-summary-brand">
              <span className="ac-summary-check"><svg viewBox="0 0 24 24" width="16" height="16"><path d="M5 13l4 4L19 7" stroke="#fff" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
              <span>academy</span>
            </div>
            <h3 className="ac-depin-prn-title">{_t("Physical Resource Networks")}</h3>
            <div className="ac-depin-prn-grid">
              <div className="ac-depin-prn-cell">Wireless<br />Networks</div>
              <div className="ac-depin-prn-cell">Mobility<br />Networks</div>
              <div className="ac-depin-prn-cell">Energy<br />Networks</div>
              <div className="ac-depin-prn-cell">Health<br />Networks</div>
              <div className="ac-depin-prn-cell">Agriculture<br />Networks</div>
              <div className="ac-depin-prn-cell">Geospatial<br />Networks</div>
            </div>
          </section>

          <p>A prime example is <a href="#" onClick={(e) => e.preventDefault()}>Helium</a>, a protocol that allows anyone to install a hotspot in their office or home to contribute to the creation of a <b>decentralized wireless network</b>, receiving tokens in return as a reward for providing coverage and connectivity.</p>

          <h3>{_t("DRN: Digital Resource Networks")}</h3>
          <p><b>Digital Resource Networks</b>, on the other hand, coordinate digital resources. While they still rely on an underlying physical infrastructure, the user interaction occurs primarily at the <b>software level</b>.</p>
          <p>An example is <b>Render Network</b>, a platform that allows those with idle <b>GPUs</b> to make them available for graphic rendering and high-performance computing. Artists, developers, and creative studios can purchase computing power <b>on-demand</b>, paying in tokens. In this case, the end-user does not interact with a visible physical infrastructure—like an antenna or a wireless node—but rather with a distributed network of <b>computational capacity</b> that is orchestrated digitally through <b>smart contracts</b>.</p>

          {/* Digital Resource Networks grid */}
          <section className="ac-depin-prn ac-depin-drn" data-testid="depin-drn-grid">
            <div className="ac-summary-brand">
              <span className="ac-summary-check"><svg viewBox="0 0 24 24" width="16" height="16"><path d="M5 13l4 4L19 7" stroke="#fff" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
              <span>academy</span>
            </div>
            <h3 className="ac-depin-prn-title">{_t("Digital Resource Networks")}</h3>
            <div className="ac-depin-prn-grid ac-depin-drn-grid">
              <div className="ac-depin-prn-cell">Storage<br />Networks</div>
              <div className="ac-depin-prn-cell">Compute<br />Networks</div>
              <div className="ac-depin-prn-cell">Security<br />Networks</div>
              <div className="ac-depin-prn-cell">Bandwidth<br />Networks</div>
            </div>
          </section>

          <p>To learn more about the Render project, we recommend reading our Academy article: <a href="#" onClick={(e) => e.preventDefault()}>"Render Network (RENDER): what it is and how It works."</a> If you're looking to buy RENDER instead, this is the page for you: <a href="#" onClick={(e) => e.preventDefault()}>"Buying Render (RENDER) is easy!"</a></p>

          <h2 id="depin-advantages">{_t("The advantages of DePIN")}</h2>
          <p>Thanks to its architecture, the DePIN model introduces a series of structural advantages that are difficult to replicate using traditional models. Let's look at the three main ones:</p>
          <p><b>Efficiency:</b> through a distributed infrastructure and the use of high-performance blockchains like Solana, Base, and Optimism, DePIN networks are now able to offer competitive performance and, in several use cases, outperform centralized systems. Applications such as distributed GPU rendering, bandwidth provisioning, or environmental data collection already demonstrate how on-chain coordination can result in a more efficient infrastructure compared to centralized alternatives.</p>
          <p><b>Decentralization:</b> in a landscape increasingly dominated by a few large global operators, a system managed by a distributed community represents a structurally more robust alternative. Reducing single points of failure and censorship risks increases overall network security and limits the concentration of decision-making power and resources within a single center of control.</p>
          <p><b>Economic/Incentive Advantage:</b> thanks to the flywheel model, DePIN creates a mechanism where value and revenue are reinvested and distributed within the ecosystem. Directly incentivizing participants aligns the interests of users, operators, and investors, reducing the "value extraction" typical of centralized models and rewarding those who concretely contribute to the development and maintenance of the infrastructure.</p>

          {/* The Advantages of DePIN cards */}
          <section className="ac-depin-adv" data-testid="depin-advantages-cards">
            <div className="ac-summary-brand">
              <span className="ac-summary-check"><svg viewBox="0 0 24 24" width="16" height="16"><path d="M5 13l4 4L19 7" stroke="#fff" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
              <span>academy</span>
            </div>
            <h3 className="ac-depin-prn-title">{_t("The Advantages of DePIN")}</h3>
            <div className="ac-depin-adv-row">
              <div className="ac-depin-adv-card">
                <div className="ac-depin-adv-pill">Efficiency</div>
                <span className="ac-depin-adv-ic">
                  <svg viewBox="0 0 24 24" width="26" height="26"><path d="M12 8.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Zm0 5.2a1.7 1.7 0 1 1 0-3.4 1.7 1.7 0 0 1 0 3.4Z" fill="#0f0f12"/><path d="M12 2l1.2 2.4 2.6-.8.4 2.6 2.6.4-.8 2.6L20.4 12l-2.4 1.2.8 2.6-2.6.4-.4 2.6-2.6-.8L12 22l-1.2-2.4-2.6.8-.4-2.6-2.6-.4.8-2.6L3.6 12 6 10.8l-.8-2.6 2.6-.4.4-2.6 2.6.8Z" fill="#0f0f12" opacity=".92" transform="scale(.86) translate(1.7 1.7)"/></svg>
                </span>
              </div>
              <div className="ac-depin-adv-card">
                <div className="ac-depin-adv-pill">Decentralization</div>
                <span className="ac-depin-adv-ic">
                  <svg viewBox="0 0 24 24" width="26" height="26"><path d="M14.5 3.5c-2.6.6-4.8 2.6-5.6 5.2l-1.5-.4c-1.2-.3-2.4.2-3 1.3l-.5.9 3.4 2 4.4 4.4 2 3.4.9-.5c1.1-.6 1.6-1.8 1.3-3l-.4-1.5c2.6-.8 4.6-3 5.2-5.6.3-1.3.2-2.7-.3-3.9-.5-.6-1.3-.9-2.1-.9-1.2 0-2.4.2-3.8.6Z" fill="none" stroke="#0f0f12" strokeWidth="1.8"/><circle cx="15.5" cy="8.5" r="1.6" fill="none" stroke="#0f0f12" strokeWidth="1.6"/><path d="M7 15c-1.8 1-3 3.4-3.2 5.2 1.8-.2 4.2-1.4 5.2-3.2" fill="none" stroke="#0f0f12" strokeWidth="1.8" strokeLinecap="round"/></svg>
                </span>
              </div>
              <div className="ac-depin-adv-card">
                <div className="ac-depin-adv-pill">Economic/<br />Incentive</div>
                <span className="ac-depin-adv-ic">
                  <svg viewBox="0 0 24 24" width="26" height="26"><circle cx="12" cy="12" r="8.4" fill="none" stroke="#0f0f12" strokeWidth="1.8"/><path d="M8.5 10.5a3.5 3.5 0 0 1 5.9-2.6M15.5 13.5a3.5 3.5 0 0 1-5.9 2.6" fill="none" stroke="#0f0f12" strokeWidth="1.8" strokeLinecap="round"/><path d="M14.2 5.5l.6 2.4-2.4.4M9.8 18.5l-.6-2.4 2.4-.4" fill="none" stroke="#0f0f12" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </span>
              </div>
            </div>
          </section>

          <p>The combination of these three advantages makes the <b>DePIN movement</b> one of the most dynamic and promising drivers in the evolution of the cryptocurrency world today, as well as a significant technological challenge to the giants of <b>Web2</b>.</p>

          <h2 id="depin-challenges">{_t("Current challenges for the DePIN movement")}</h2>
          <p>As we have seen, while DePIN technology represents a major leap forward in creating physical infrastructure from many perspectives, a few years after the birth of this movement, several "growing pains" remain that limit its current large-scale adoption. Let's analyze the main ones:</p>
          <ul>
            <li><b>Operational complexity:</b> actively participating in a DePIN network often requires setting up dedicated hardware, maintaining high <b>uptime</b>, and self-managing wallets and private keys. These are technical barriers that currently make the user experience less intuitive than centralized services, slowing down the entry of the average user.</li>
            <li><b>Economic sustainability of incentives:</b> the <b>flywheel mechanism</b> only works as long as the token maintains enough value to compensate resource providers. During periods of high volatility or a <b>bear market</b>, incentives can decrease, risking that some participants might disconnect their machines, thus affecting the network's capacity and service quality.</li>
            <li><b>Competition with web2 incumbents:</b> large centralized operators possess immense capital, widespread infrastructure, and significant strategic leverage. Through aggressive pricing policies, acquisitions, or vertical integration, they could defend their dominant positions, making the path to mainstream success for DePIN networks more complex.</li>
          </ul>

          {/* DePIN Challenges cards */}
          <section className="ac-depin-adv" data-testid="depin-challenges-cards">
            <div className="ac-summary-brand">
              <span className="ac-summary-check"><svg viewBox="0 0 24 24" width="16" height="16"><path d="M5 13l4 4L19 7" stroke="#fff" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
              <span>academy</span>
            </div>
            <h3 className="ac-depin-prn-title">{_t("DePIN Challenges")}</h3>
            <div className="ac-depin-adv-row">
              <div className="ac-depin-adv-card">
                <div className="ac-depin-adv-pill">Operational<br />Complexity</div>
                <span className="ac-depin-adv-ic">
                  <svg viewBox="0 0 24 24" width="24" height="24"><path d="M12 4 22 20H2Z" fill="none" stroke="#0f0f12" strokeWidth="2" strokeLinejoin="round"/><path d="M12 10v4.4" stroke="#0f0f12" strokeWidth="2" strokeLinecap="round"/><circle cx="12" cy="17.2" r="1.2" fill="#0f0f12"/></svg>
                </span>
              </div>
              <div className="ac-depin-adv-card">
                <div className="ac-depin-adv-pill">Economic<br />Sustainability</div>
                <span className="ac-depin-adv-ic">
                  <svg viewBox="0 0 24 24" width="26" height="26"><circle cx="12" cy="12" r="8.4" fill="none" stroke="#0f0f12" strokeWidth="1.8"/><path d="M8.5 10.5a3.5 3.5 0 0 1 5.9-2.6M15.5 13.5a3.5 3.5 0 0 1-5.9 2.6" fill="none" stroke="#0f0f12" strokeWidth="1.8" strokeLinecap="round"/><path d="M14.2 5.5l.6 2.4-2.4.4M9.8 18.5l-.6-2.4 2.4-.4" fill="none" stroke="#0f0f12" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </span>
              </div>
              <div className="ac-depin-adv-card">
                <div className="ac-depin-adv-pill">Competition with<br />Web2 Incumbents</div>
                <span className="ac-depin-adv-ic">
                  <svg viewBox="0 0 24 24" width="24" height="24"><circle cx="12" cy="12" r="8.4" fill="none" stroke="#0f0f12" strokeWidth="1.8"/><path d="M3.6 12h16.8M12 3.6c2.4 2.2 3.6 5.1 3.6 8.4s-1.2 6.2-3.6 8.4c-2.4-2.2-3.6-5.1-3.6-8.4S9.6 5.8 12 3.6Z" fill="none" stroke="#0f0f12" strokeWidth="1.6"/></svg>
                </span>
              </div>
            </div>
          </section>

          <p>The long-term success of <b>DePIN</b> will therefore depend on the ability of projects to simplify the user experience, stabilize incentive mechanisms, and build a sustainable competitive advantage over traditional operators—transforming from an emerging narrative into infrastructure that is truly adopted on a global scale.</p>

          <h2 id="depin-conclusions">{_t("Conclusions")}</h2>
          <p>According to many experts, <b>DePIN</b> represents one of the most concrete evolutions in the journey toward the <b>mass adoption</b> of blockchain. After an initial phase focused on digital currencies, decentralized finance (DeFi), and collectible assets, the technology is now making a structural shift, moving from the purely digital realm to the management of physical infrastructure.</p>
          <p>With DePIN, blockchain will stop being a simple ledger of transactions and instead become an <b>orchestration layer</b> for energy grids, connectivity, computing power, and data collection systems. This allows decentralization to move beyond the speculative dimension and integrate into services used daily—even by those who have never directly interacted with a cryptocurrency.</p>
          <p>Thanks to DePIN technology, the future of infrastructure is no longer the exclusive domain of large centralized operators; it becomes a tool at the service of the community to develop a fairer and more sustainable tomorrow, in line with the original vision of the <b>Web3</b> movement.</p>
        </div>

      </div>
    </SiteLayout>
  );
}
