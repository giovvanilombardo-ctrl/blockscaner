import SiteLayout from "@/components/site/SiteLayout";
import Seo from "@/components/Seo";
import { t as _t } from "@/i18n";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

/* Berachain hero artwork — honeycomb with bear coin */
const ArtBerachain = (
  <svg viewBox="0 0 340 210" preserveAspectRatio="xMidYMid slice">
    <rect width="340" height="210" fill="#ffd21f"/>
    {/* honeycomb */}
    <g fill="#0d0d12">
      <path d="M40 40 l20 -12 20 12 v24 l-20 12 -20 -12 Z"/>
      <path d="M260 30 l20 -12 20 12 v24 l-20 12 -20 -12 Z"/>
      <path d="M300 120 l20 -12 20 12 v24 l-20 12 -20 -12 Z"/>
      <path d="M30 140 l20 -12 20 12 v24 l-20 12 -20 -12 Z"/>
      <path d="M150 20 l20 -12 20 12 v24 l-20 12 -20 -12 Z"/>
      <path d="M240 150 l20 -12 20 12 v24 l-20 12 -20 -12 Z"/>
    </g>
    {/* bear coin */}
    <circle cx="170" cy="106" r="44" fill="#fff" stroke="#0d0d12" strokeWidth="4.4"/>
    <circle cx="170" cy="106" r="36" fill="#ffd21f"/>
    {/* bear head */}
    <g fill="#0d0d12">
      <circle cx="156" cy="96" r="8"/><circle cx="184" cy="96" r="8"/>
      <path d="M148 104 a22 20 0 0 1 44 0 a22 20 0 0 1 -44 0 Z"/>
    </g>
    <g fill="#ffd21f">
      <circle cx="162" cy="104" r="2.8"/><circle cx="178" cy="104" r="2.8"/>
    </g>
    <ellipse cx="170" cy="114" rx="6" ry="5" fill="#0d0d12"/>
    {/* chain links */}
    <g stroke="#0d0d12" strokeWidth="2.6" fill="none">
      <path d="M206 84 a8 8 0 0 1 16 0 v8 a8 8 0 0 1 -16 0 Z"/>
      <path d="M214 100 v10"/>
      <path d="M206 110 a8 8 0 0 1 16 0 v8 a8 8 0 0 1 -16 0 Z"/>
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

export default function AcademyBerachain() {
  return (
    <SiteLayout>
      <Seo title="Berachain: what it is and how it revolutionises Liquidity in Web3 — Blockscaner Academy" description="Discover how Berachain, a hybrid blockchain, is revolutionising Web3 with its Proof-of-Liquidity mechanism." />
      <div className="ac-article" data-testid="academy-article-berachain">

        {/* breadcrumb */}
        <p className="ac-crumb">
          <Link to="/products/academy">Home</Link>
          <span>›</span>
          <a href="#" onClick={(e) => e.preventDefault()}>DeFi</a>
          <span>›</span>
          <b>Berachain: what it is and how it revolutionises Liquidity in Web3</b>
        </p>

        {/* header row */}
        <div className="ac-article-top">
          <Link to="/products/academy" className="ac-back" aria-label="Back to Academy"><ArrowLeft size={18} /></Link>
          <Tag>DeFi</Tag><Tag>Proof-Of-Stake</Tag>
        </div>

        <div className="ac-article-head">
          <h1>{_t("Berachain: what it is and")}<br />{_t("how it revolutionises")}<br />{_t("Liquidity in Web3")}</h1>
          <div className="ac-share">
            <span className="ac-share-ic" aria-label="Share on X"><ShareIcon d="M18.9 2H22l-6.8 7.8L23 22h-6.3l-4.9-6.4L6.2 22H3l7.3-8.3L1.5 2h6.4l4.4 5.9L18.9 2zm-1.1 18h1.7L7.1 3.9H5.3L17.8 20z"/></span>
            <span className="ac-share-ic" aria-label="Share on Facebook"><ShareIcon d="M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.4h-1.2c-1.2 0-1.6.8-1.6 1.6V12h2.7l-.4 2.9h-2.3v7A10 10 0 0 0 22 12z"/></span>
            <span className="ac-share-ic" aria-label="Share on LinkedIn"><ShareIcon d="M20.4 20.4h-3.5v-5.6c0-1.3 0-3-1.9-3s-2.1 1.4-2.1 2.9v5.7H9.4V9h3.4v1.6h.1c.5-.9 1.7-1.9 3.4-1.9 3.6 0 4.3 2.4 4.3 5.5v6.2zM5.3 7.4a2 2 0 1 1 0-4.1 2 2 0 0 1 0 4.1zM7.1 20.4H3.6V9h3.5v11.4z"/></span>
          </div>
        </div>
        <p className="ac-meta">September 24, 2025&nbsp;&nbsp;•&nbsp;&nbsp;15 min</p>

        {/* hero image */}
        <div className="ac-article-thumb">
          <Badge>Beginner</Badge>
          {ArtBerachain}
        </div>

        {/* You will learn */}
        <div className="ac-learn">
          <h2>{_t("You will learn")}</h2>
          <ul>
            <li><a href="#bera-carbon">{_t("More than just a carbon copy of Ethereum")}</a></li>
            <li><a href="#bera-pol">{_t("Proof-of-Liquidity: a new security model")}</a></li>
            <li><a href="#bera-vaults">{_t("Reward vaults: the Liquidity Engine")}</a></li>
            <li><a href="#bera-chef">{_t("BeraChef: the contract that “Cooks Up” rewards")}</a></li>
            <li><a href="#bera-tokens">{_t("The two-token architecture: BERA and BGT")}</a></li>
            <li><a href="#bera-honey">{_t("HONEY, the ecosystem’s stablecoin")}</a></li>
            <li><a href="#bera-flywheel">{_t("The dApp ecosystem and the “Flywheel Effect”")}</a></li>
            <li><a href="#bera-conclusion">{_t("Conclusion")}</a></li>
          </ul>
        </div>

        {/* Article body */}
        <div className="ac-body">
          <p><b>Berachain</b> is a unique Layer 1 blockchain that combines the interoperability of the Cosmos Software Development Kit (SDK) with full compatibility with the Ethereum ecosystem (EVM). If we had to define it in one word, that word would be "liquidity." This concept, along with its efficient management, is central to its functionality and distinguishes it from other protocols in the Web3 space. This is made possible by an innovative mechanism developed by the network itself: <b>Proof-of-Liquidity</b>.</p>

          <h2 id="bera-carbon">{_t("More than just a carbon copy of Ethereum")}</h2>
          <p>To fully understand how Berachain operates, we need to examine its two foundational elements: its technical architecture and its innovative consensus mechanism. Berachain can be seen as a hybrid between Cosmos and Ethereum.</p>

          <h3>{_t("Technical architecture")}</h3>
          <p>Think of Ethereum as a universal computer, with the <b>Ethereum Virtual Machine (EVM)</b> serving as its operating system, responsible for executing smart contracts. Berachain has developed an execution environment that closely resembles Ethereum's engine, which it refers to as <b>"EVM Identical."</b></p>
          <p>Whenever the Ethereum system is updated, Berachain can instantly adopt the new version, ensuring maximum compatibility. This is a significant advantage for developers: launching an application on Berachain is just like doing it on Ethereum. This compatibility not only attracts talent and projects from the Ethereum ecosystem but also promotes the development of a rich and diverse environment.</p>
          <p>In the introduction, we discussed the Cosmos Software Development Kit (SDK). How does Berachain reconcile the two virtual environments? The answer lies in its technical architecture, which is based on <b>BeaconKit</b>. This framework decouples the consensus engine from the execution environment.</p>

          <h3>{_t("Consensus mechanism")}</h3>
          <p>In simpler terms, Berachain utilises <b>CometBFT</b>, a highly secure and battle-tested consensus engine from the Cosmos ecosystem, to enable validators to agree on the network's state. BeaconKit acts as a modular bridge, allowing this consensus engine to communicate seamlessly with an execution environment similar to Ethereum's.</p>
          <p>This architecture offers a benefit known as <b>single-slot finality</b>, resulting in high efficiency. It allows a transaction to be considered final and irreversible in just <b>two seconds</b>, whereas on Ethereum, this state is typically reached in about thirteen minutes.</p>

          <h2 id="bera-pol">{_t("Proof-of-Liquidity: a new security model")}</h2>
          <p>We now reach the core of Berachain's innovation. To fully grasp this, it's beneficial to take a step back. Since Bitcoin's inception, blockchains have sought to resolve the trilemma of security, speed, and scalability. The initial consensus model was <b>Proof-of-Work (PoW)</b>, introduced by Bitcoin, which requires miners to invest significant computational resources to validate blocks. Due to the associated costs and environmental impact, the industry has gradually shifted towards <b>Proof-of-Stake (PoS)</b>.</p>
          <p>In the Proof-of-Stake model used by Ethereum, validators have a vested interest in the network's security by staking the native tokens. If they act maliciously, a portion of their staked capital can be burned, a process known as <b>slashing</b>. This mechanism aligns their interests with the overall security of the network.</p>

          <h3>{_t("The limitations of PoS and the rise of PoL")}</h3>
          <p>However, PoS has a significant limitation: it does not create a direct connection between validators and the decentralised applications (dApps) existing on the blockchain. At the consensus level, there are no incentives for validators to support dApps that provide economic value actively, and similarly, dApps may not have a reason to align with the interests of validators.</p>
          <p>This is where Berachain's <b>Proof-of-Liquidity (PoL)</b> model comes into play. Building on the principles of PoS, PoL incorporates an incentive system directly into the core of the protocol, strategically designed to align the interests of all participants: validators, applications, and users.</p>
          <p>In summary, Proof-of-Liquidity (PoL) is a model that balances network security with the availability of liquidity. Rather than depending solely on staked capital, as in Proof-of-Stake, Berachain actively incentivises users to provide liquidity to the ecosystem's applications.</p>

          <h3>{_t("PoL v2 and its innovations")}</h3>
          <p>This creates a merit-based system: the more liquidity that flows into applications, the more secure and appealing the network becomes for new projects. PoL transforms validators from mere network guardians into proactive capital managers, rewarding them for their ability to allocate resources and align everyone's interests intelligently. With its evolution to <b>PoL v2</b>, the consensus mechanism has been further enhanced to make it more sustainable and balanced. The main innovations are:</p>
          <ul>
            <li><b>Yield for BERA Staking:</b> Staking BERA for network security now generates a direct yield in BGT.</li>
            <li><b>Incentive Sustainability:</b> To fund this yield, a significant portion of the incentives generated by the ecosystem is captured at the protocol level to reward those who secure the network.</li>
            <li><b>Token Decoupling:</b> The 1:1 conversion mechanism from BGT to BERA has been removed, clearly separating the role of security from that of governance.</li>
          </ul>

          <h3>{_t("Berachain's two-token architecture")}</h3>
          <p>To make Proof-of-Liquidity work, Berachain uses a two-token architecture, designed to separate the functions of governance and gas fees. There is also <b>HONEY</b>, the native stablecoin pegged to the dollar, which is positioned outside of the PoL system. Below is a brief description, but we will cover it in detail in a dedicated section:</p>
          <ul>
            <li><b>BERA (Gas Token):</b> The native token used to pay transaction fees (gas) and for validator staking. With PoL v2, it gained an additional utility: staking not only secures the network but also generates a direct yield in BGT.</li>
            <li><b>BGT (Governance Token):</b> The heart of network participation. It is earned by both providing liquidity and staking BERA, and it cannot be sold or traded (it is soulbound, a term from the gaming world). Its sole purpose is to be "delegated" to validators, giving them the power to produce blocks and influence the future of the protocol.</li>
          </ul>

          <h2 id="bera-vaults">{_t("Reward vaults: the Liquidity Engine")}</h2>
          <p>It's impossible to understand what Berachain is and how it works without discussing <b>Reward Vaults</b>, the practical tool through which Proof-of-Liquidity comes to life. These are smart contracts where users can stake specific tokens to receive a stream of rewards in BGT.</p>

          <h3>{_t("How to use a Reward Vault")}</h3>
          <p>The process is simple:</p>
          <ul>
            <li>Interact with a dApp (e.g., provide liquidity to a DEX) and receive a "receipt token."</li>
            <li>Stake this token in the corresponding Reward Vault.</li>
            <li>Start earning a portion of the BGT that validators direct to that vault.</li>
          </ul>
          <p>Additionally, projects can add extra incentives to make their vaults more attractive, creating a competitive market that rewards the most valuable applications.</p>

          <h3>{_t("The incentive loop in action")}</h3>
          <p>So how is the loop closed? The process is a continuous flow of incentives:</p>
          <ul>
            <li><b>Users</b> delegate their BGT to the validators they trust, "boosting" them and increasing the rewards those validators receive.</li>
            <li><b>dApps</b> offer incentives (in other tokens, such as stablecoins) to convince validators to direct new BGT emissions to their Reward Vaults.</li>
            <li><b>Validators</b>, to maximise their earnings, choose the vaults with the best incentives, thereby directing liquidity where it is most demanded.</li>
            <li>Finally, both the validator (via a commission) and the users who "boosted" them receive a portion of the incentives offered by the dApps, creating a profit for all active participants.</li>
          </ul>

          <h2 id="bera-chef">{_t("BeraChef: the contract that “Cooks Up” rewards")}</h2>
          <p>To manage this complex flow of incentives, Berachain relies on <b>BeraChef</b>, a smart contract that acts like a Michelin-starred chef directing their kitchen brigade. Its three main tasks are:</p>
          <ul>
            <li>Controlling which "safes" (Vaults) are eligible to receive rewards.</li>
            <li>Managing validator preferences, which determine the percentage of BGT allocated to each Vault.</li>
            <li>Administering the commissions that validators can charge on the payments they receive from dApps.</li>
          </ul>
          <p>Each validator can set its own allocation strategy, specifying how to distribute rewards among various projects. If they don't, a default configuration is used.</p>
          <p>To conclude, the exact amount of BGT issued per block is determined by a mathematical formula that considers several variables, such as the validator's "boost" and other network parameters. This ensures the system remains balanced and that incentives are distributed to promote long-term growth and security.</p>

          <h3>{_t("How are earnings calculated? The Boost APR")}</h3>
          <p>As you navigate the Berachain ecosystem, you will often encounter the <b>"Boost APR"</b> metric. What does it mean? In simple terms, it is the Annual Percentage Rate (APR) you can expect to earn by delegating your BGT tokens to a specific validator.</p>
          <p>This value is not fixed but is calculated dynamically. The system analyses a specific period and sums the value of all the "incentives" a validator has received from the various projects they support. This total earning is then compared to the total amount of BGT delegated to that validator and projected on an annual basis.</p>
          <p>A key detail is that the displayed APR percentage already accounts for the validator's commission. This means the yield you see is what is actually due to delegators like you, making the comparison between validators transparent and straightforward. Ultimately, the Boost APR is the tool that allows you to choose which validators to entrust your tokens to strategically.</p>

          <h2 id="bera-tokens">{_t("The two-token architecture: BERA and BGT")}</h2>
          <p>After exploring the infrastructure of this Layer 1 blockchain, it's time to focus on the tokens that coexist within this innovative ecosystem, which is the only way to understand how Berachain works fully. This architecture is designed to separate governance functions from economic ones, creating a more stable and balanced system.</p>

          <h3>{_t("BERA, the fuel of the network")}</h3>
          <p><b>BERA</b> is the native token of Berachain, its "fuel." Like other Layer 1 blockchains, it is essential for paying transaction fees (gas). One of its most interesting features is that a portion of the fees paid in BERA is burned, meaning it is permanently destroyed, reducing the circulating supply over time.</p>
          <p>The second major utility of BERA is related to security: it is the asset that validators must stake to participate in consensus. The more BERA a validator stakes, the higher their probability of being chosen to produce new blocks. In short, the economic value of all staked BERA tokens constitutes the financial security of the chain.</p>
          <p>To understand BERA's value and role, it's helpful to analyse its tokenomics. The total supply at genesis is <b>500 million BERA</b>. To this, an annual inflation of about 9% is added, managed through BGT emissions and subject to governance veto.</p>

          <h3>{_t("BGT, the power of governance")}</h3>
          <p>We've already established that <b>BGT</b> is the asset that makes Berachain truly different from other networks. While BERA is at the centre of its economic model, BGT manages decision-making power and incentives. As we've seen, it is a non-transferable token earned by actively participating in the ecosystem, primarily by providing liquidity.</p>
          <p>So, once earned, what can you do with BGT?</p>
          <ul>
            <li><b>Governance:</b> BGT holders can vote directly on governance proposals or delegate their voting power to other addresses. This allows them to influence decisions that shape the future of Berachain actively.</li>
            <li><b>Earn from Incentives:</b> By delegating their BGT to a validator ("boosting" them), users earn a portion of the incentives that the validator receives from the applications it supports.</li>
            <li><b>Earn from dApp Fees:</b> Those who delegate their BGT also receive a share of the fees generated by Berachain's main applications, such as the decentralised exchange (BEX) and the HONEY minting service. The collected fees are distributed proportionally to delegators.</li>
          </ul>

          <h2 id="bera-honey">{_t("HONEY, the ecosystem’s stablecoin")}</h2>
          <p>A native stablecoin is a must-have in this innovative financial ecosystem. <b>HONEY</b> is designed to provide a stable option for users, being a fully collateralised stablecoin with a value soft-pegged to the US dollar.</p>
          <p>High-quality reserves guarantee its stability. Currently, it is backed by a basket of the market's most reliable stablecoins:</p>
          <ul>
            <li>USDC (Circle)</li>
            <li>USDT (Tether)</li>
            <li>pyUSD (PayPal)</li>
          </ul>
          <p>You can obtain HONEY in two main ways:</p>
          <ul>
            <li><b>Minting:</b> By depositing governance-approved collateral (like USDC, USDT, or pyUSD) in the dedicated application.</li>
            <li><b>Swapping:</b> By purchasing it on a decentralised exchange.</li>
          </ul>
          <p>One of HONEY's most innovative features is its security mechanism, called <b>"Basket Mode."</b> This system automatically activates if one of the collateral assets loses its stability (depegs). In this mode, when a user decides to redeem their HONEY, they do not receive a single asset of their choice but rather a proportional share of all collateral in the system.</p>
          <p>This intelligent mechanism prevents bank runs on the healthier assets, distributing risk and protecting the stablecoin's overall stability. Finally, the small fees generated from minting and redeeming HONEY are also distributed to BGT holders, adding another source of revenue for those who actively participate in governance.</p>

          <h2 id="bera-flywheel">{_t("The dApp ecosystem and the “Flywheel Effect”")}</h2>
          <p>The success of Berachain is entirely linked to that of its application ecosystem, which revolves around the dynamics of Proof-of-Liquidity. The central hub for this interaction is <b>BeraHub</b>, the portal where users can manage their BGT, stake their BERA tokens, and access <b>BEX</b>, the network's native decentralised exchange.</p>
          <p>However, analysing data from DeFiLlama reveals that the ecosystem is already highly competitive: the exchange with the most value locked is <b>Kodiak</b>, while the leading protocol by TVL is <b>Infrared Finance</b>, dedicated to liquid staking, alongside other notable projects like <b>Dolomite</b>, an advanced protocol for lending and margin trading. This demonstrates the network's vibrancy, where success is not a given but must be earned.</p>
          <p>This is where the true strength of PoL manifests: the success of the applications is vital for the success of the network itself, creating a <b>"flywheel effect"</b> at the ecosystem level.</p>
          <p>This model transforms competition from a zero-sum game into a collaborative environment based on close coordination among three leading actors:</p>
          <ul>
            <li><b>Users:</b> They deposit liquidity into dApp pools to earn BGT. Subsequently, they delegate ("boost") their BGT to the most efficient validators to maximise their rewards.</li>
            <li><b>Protocols (dApps):</b> To attract user liquidity, dApps must convince validators to direct BGT emissions to their pools. To do this, they offer direct incentives (known as "bribes") to validators, paying them with their own native tokens.</li>
            <li><b>Validators:</b> In addition to securing the network, validators act as capital managers. To maximise their earnings (composed of commissions and incentives), they direct BGT emissions to the dApps offering the best rewards.</li>
          </ul>
          <p>This creates a virtuous cycle: the most solid dApps offer the best incentives, attract more emissions from validators, which in turn attract more liquidity from users, making the entire ecosystem stronger and more liquid.</p>
          <p>Despite the mainnet launching only recently (February 6, 2025), the network has seen explosive adoption. Shortly after its launch, Berachain reached the incredible milestone of <b>$3 billion in Total Value Locked (TVL)</b> in less than a month, peaking at $3.3 billion at the end of March. During that peak, the volume on the network's decentralised exchanges hit highs of $160 million per day, with monthly DEX volume in March nearing $2.4 billion.</p>

          <h2 id="bera-conclusion">{_t("Conclusion")}</h2>
          <p>Technology alone is not enough to guarantee a blockchain's success. Berachain's approach stands out because it focuses not only on technical innovation but on creating a virtuous cycle that ensures sustained growth and collaboration within its ecosystem.</p>
          <p>In a crypto sector where users are the scarcest resource, Berachain is rewriting the rules. Instead of adopting tactics that sometimes lock up user liquidity without guarantees, its model transforms them from mere "exit liquidity" into active and fundamental participants, with a decision-making role in where value and liquidity should flow.</p>
          <p><b>Proof-of-Liquidity</b> can be seen as the first "extendable incentive system at the protocol level," designed for long-term success. This concept aligns with the <b>"Fat Bera Thesis"</b>: the idea that applications capturing the most value in the ecosystem will be those that best leverage the PoL mechanism to attract users and capital.</p>
          <p>However, the model also raises important questions that only time can answer. Will the strong interdependence between validators and BGT delegators last once the network is fully operational? Will validators, given their importance, become too powerful, centralising power? And what would happen if the demand for transactions on the network were to fall?</p>
          <p>Many of these fascinating theoretical assumptions will have to be confirmed by the test of the market. The success of Berachain will depend on its real-world implementation and the continuous efforts of its community to ensure that its principles of decentralisation and sustainability are upheld over time.</p>
        </div>

        {/* Buy BERA banner */}
        <div className="ac-buy ac-buy-bera" data-testid="bera-buy-banner">
          <div className="ac-buy-left">
            <span className="ac-buy-logo ac-signup-logo"><svg viewBox="0 0 24 24" width="20" height="20"><rect x="3" y="3" width="18" height="18" rx="4" fill="none" stroke="#fff" strokeWidth="1.6"/><path d="M8 8h6a3 3 0 0 1 0 6H8zM8 14h7a3 3 0 0 1 0 6H8z" fill="none" stroke="#fff" strokeWidth="1.6"/><circle cx="17.5" cy="6.5" r="1.3" fill="#3ddc84"/></svg>blockscaner</span>
            <h3>{_t("Buy BERA")}<br />{_t("on Blockscaner")}</h3>
            <a className="ac-buy-btn" href="/products" onClick={(e) => e.preventDefault()}>{_t("Buy now")} <span>→</span></a>
          </div>
          <div className="ac-buy-art">
            <svg viewBox="0 0 220 150" preserveAspectRatio="xMidYMid slice">
              <defs>
                <linearGradient id="beraPed" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#fff"/><stop offset="1" stopColor="#e8e4e0"/>
                </linearGradient>
              </defs>
              {/* pedestal */}
              <path d="M70 150 L70 88 a40 14 0 0 1 80 0 L150 150 Z" fill="url(#beraPed)"/>
              <ellipse cx="110" cy="88" rx="40" ry="14" fill="#f2efec"/>
              {/* coin */}
              <circle cx="110" cy="58" r="34" fill="#fff" stroke="#d5d0ca" strokeWidth="2"/>
              <circle cx="110" cy="58" r="26" fill="#7a3b12"/>
              <g fill="#fff">
                <circle cx="102" cy="52" r="5"/><circle cx="118" cy="52" r="5"/>
                <path d="M97 58 a13 12 0 0 1 26 0 a13 12 0 0 1 -26 0 Z"/>
              </g>
              <ellipse cx="110" cy="66" rx="4" ry="3" fill="#7a3b12"/>
              <g stroke="#fff" strokeWidth="2" fill="none">
                <path d="M124 62 q6 6 0 12"/>
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
            <article className="ac-card" onClick={() => window.location.assign("/products/academy/sonic")} style={{ cursor: "pointer" }}>
              <div className="ac-thumb"><Badge>Beginner</Badge>
                <svg viewBox="0 0 340 210" preserveAspectRatio="xMidYMid slice">
                  <rect width="340" height="210" fill="#c9a7ff"/>
                  <circle cx="170" cy="118" r="58" fill="#fff"/>
                  <path d="M170 52 C188 70 214 76 238 70 C224 94 212 112 200 128 C184 116 172 98 170 78 C164 98 152 116 136 128 C124 112 112 94 98 70 C122 76 152 70 170 52 Z" fill="#8b5cf6"/>
                  <path d="M170 52 C176 66 178 78 178 90 C170 78 166 66 170 52 Z" fill="#fff"/>
                  <circle cx="170" cy="118" r="58" fill="none" stroke="#0d0d12" strokeWidth="3.5"/>
                  <g stroke="#0d0d12" strokeWidth="3" strokeLinecap="round">
                    <path d="M56 118 h22"/><path d="M50 132 h16"/>
                    <path d="M284 118 h-22"/><path d="M290 132 h-16"/>
                  </g>
                </svg>
              </div>
              <div className="ac-tags"><span className="ac-tag">DeFi</span></div>
              <h3>Sonic Blockchain: What Is It and How Does It Work?</h3>
              <p className="ac-desc">Discover Sonic: the ultra-fast EVM blockchain evolved from Fantom. 400k TPS, sub-second finality, and 90% fee rewards for developers.</p>
              <p className="ac-meta">November 26, 2025&nbsp;&nbsp;•&nbsp;&nbsp;10 min</p>
            </article>
            <article className="ac-card" onClick={() => window.location.assign("/products/academy/address-poisoning")} style={{ cursor: "pointer" }}>
              <div className="ac-thumb"><Badge>Beginner</Badge>
                <svg viewBox="0 0 340 210" preserveAspectRatio="xMidYMid slice">
                  <rect width="340" height="210" fill="#c9a7ff"/>
                  <g fill="#8b5cf6" stroke="#0d0d12" strokeWidth="3">
                    <path d="M20 20 L60 20 L40 60 Z"/>
                    <path d="M300 30 L340 30 L320 70 Z"/>
                    <path d="M40 170 L80 170 L60 210 Z"/>
                    <path d="M290 160 L330 160 L310 200 Z"/>
                  </g>
                  <g transform="rotate(-20 120 110)">
                    <rect x="100" y="70" width="26" height="60" rx="8" fill="#fff" stroke="#0d0d12" strokeWidth="3.4"/>
                    <rect x="104" y="60" width="18" height="14" rx="4" fill="#fff" stroke="#0d0d12" strokeWidth="3"/>
                    <path d="M110 84 q6 8 0 16" stroke="#0d0d12" strokeWidth="2.4" fill="none" strokeLinecap="round"/>
                  </g>
                  <path d="M190 78 L246 158 L134 158 Z" fill="#fff" stroke="#0d0d12" strokeWidth="4" strokeLinejoin="round"/>
                  <path d="M190 98 L222 148 L158 148 Z" fill="#0d0d12"/>
                  <rect x="187" y="120" width="6" height="14" rx="3" fill="#fff"/>
                  <circle cx="190" cy="140" r="3.4" fill="#fff"/>
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
                  <rect width="340" height="210" fill="#0d0d12"/>
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
