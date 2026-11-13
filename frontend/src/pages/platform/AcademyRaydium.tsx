import SiteLayout from "@/components/site/SiteLayout";
import Seo from "@/components/Seo";
import { t as _t } from "@/i18n";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

/* Raydium hero artwork — blue hexagons with R logo */
const ArtRaydium = (
  <svg viewBox="0 0 340 210" preserveAspectRatio="xMidYMid slice">
    <rect width="340" height="210" fill="#3ad0ff"/>
    {/* diagonal panels */}
    <path d="M0 0 L120 0 L60 210 L0 210 Z" fill="#0d0d12"/>
    <path d="M220 0 L340 0 L340 60 L180 210 L120 210 Z" fill="#1e7fe8"/>
    <path d="M0 160 L60 210 L0 210 Z" fill="#7cc4ff"/>
    {/* hexagons */}
    <g>
      <path d="M170 30 l52 30 v60 l-52 30 -52 -30 v-60 Z" fill="#0d0d12"/>
      <path d="M170 42 l44 25 v50 l-44 25 -44 -25 v-50 Z" fill="#3ad0ff"/>
      <path d="M170 54 l36 21 v42 l-36 21 -36 -21 v-42 Z" fill="#0d0d12"/>
      <path d="M170 66 l28 16 v32 l-28 16 -28 -16 v-32 Z" fill="#1e7fe8"/>
      <path d="M170 76 l20 12 v24 l-20 12 -20 -12 v-24 Z" fill="#0d0d12"/>
    </g>
    {/* R letter */}
    <text x="170" y="116" fontSize="44" fontWeight="800" textAnchor="middle" fill="#fff">R</text>
    {/* small hexagons */}
    <g fill="#0d0d12">
      <path d="M262 40 l14 8 v16 l-14 8 -14 -8 v-16 Z"/>
      <path d="M250 66 l10 6 v12 l-10 6 -10 -6 v-12 Z"/>
      <path d="M268 74 l8 5 v10 l-8 5 -8 -5 v-10 Z"/>
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

export default function AcademyRaydium() {
  return (
    <SiteLayout>
      <Seo title="Raydium: what it is and how it works — Blockscaner Academy" description="What is Raydium and how does it work? We answer this and other key questions about Solana's most popular DEX." />
      <div className="ac-article" data-testid="academy-article-raydium">

        {/* breadcrumb */}
        <p className="ac-crumb">
          <Link to="/products/academy">Home</Link>
          <span>›</span>
          <a href="#" onClick={(e) => e.preventDefault()}>Cryptonomics</a>
          <span>›</span>
          <b>Raydium: what it is and how it works</b>
        </p>

        {/* header row */}
        <div className="ac-article-top">
          <Link to="/products/academy" className="ac-back" aria-label="Back to Academy"><ArrowLeft size={18} /></Link>
          <Tag>Crypto Market</Tag>
        </div>

        <div className="ac-article-head">
          <h1>{_t("Raydium: what it is and")}<br />{_t("how it works")}</h1>
          <div className="ac-share">
            <span className="ac-share-ic" aria-label="Share on X"><ShareIcon d="M18.9 2H22l-6.8 7.8L23 22h-6.3l-4.9-6.4L6.2 22H3l7.3-8.3L1.5 2h6.4l4.4 5.9L18.9 2zm-1.1 18h1.7L7.1 3.9H5.3L17.8 20z"/></span>
            <span className="ac-share-ic" aria-label="Share on Facebook"><ShareIcon d="M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.4h-1.2c-1.2 0-1.6.8-1.6 1.6V12h2.7l-.4 2.9h-2.3v7A10 10 0 0 0 22 12z"/></span>
            <span className="ac-share-ic" aria-label="Share on LinkedIn"><ShareIcon d="M20.4 20.4h-3.5v-5.6c0-1.3 0-3-1.9-3s-2.1 1.4-2.1 2.9v5.7H9.4V9h3.4v1.6h.1c.5-.9 1.7-1.9 3.4-1.9 3.6 0 4.3 2.4 4.3 5.5v6.2zM5.3 7.4a2 2 0 1 1 0-4.1 2 2 0 0 1 0 4.1zM7.1 20.4H3.6V9h3.5v11.4z"/></span>
          </div>
        </div>
        <p className="ac-meta">November 21, 2024&nbsp;&nbsp;•&nbsp;&nbsp;6 min</p>

        {/* hero image */}
        <div className="ac-article-thumb">
          <Badge>Beginner</Badge>
          {ArtRaydium}
        </div>

        {/* You will learn */}
        <div className="ac-learn">
          <h2>{_t("You will learn")}</h2>
          <ul>
            <li><a href="#ray-intro">{_t("What is Raydium and how does it work? We answer this and other key questions about Solana's most popular DEX.")}</a></li>
            <li><a href="#ray-what">{_t("Raydium: what is it, and how does it work?")}</a></li>
            <li><a href="#ray-structure">{_t("The structure of Raydium")}</a></li>
            <li><a href="#ray-evolution">{_t("How Raydium works: the evolution of the project")}</a></li>
            <li><a href="#ray-token">{_t("Token RAY and Governance")}</a></li>
          </ul>
        </div>

        {/* Article body */}
        <div className="ac-body">
          <p>Let's explore what Raydium is and how it operates. Raydium is one of the key players in the expansive Solana ecosystem. In this article, we will begin by providing a straightforward explanation of how this decentralised exchange (DEX) functions, specifically focusing on its automated market maker (AMM) technology. Following that, we'll delve into the context of its creation, and finally, we'll focus on the RAY token. So, let's address the question right away: What is Raydium, and how does it work?</p>

          <h2 id="ray-what">{_t("Raydium: what is it, and how does it work?")}</h2>
          <p>Solana is gaining traction in the competition with Ethereum to become the most popular blockchain. One of the standout protocols supporting this network, founded by Anatoly Yakovenko, is <b>Raydium</b>, which is currently the most widely used decentralised exchange (DEX) in the DeFi space.</p>
          <p>Raydium is a decentralised exchange with an <b>automated market maker (AMM)</b> system. Its key features include low transaction costs and fast processing times. On the platform, users can exchange tokens, provide liquidity, and participate in yield farming, all while benefiting from several unique characteristics.</p>
          <p>One of Raydium's notable advantages is its integration with <b>OpenBook</b>, a decentralised order book on Solana, which enhances users' liquidity access.</p>

          <h2 id="ray-structure">{_t("The structure of Raydium")}</h2>
          <p>To understand Raydium and how it operates, we can examine the key components and activities that set it apart from its competitors, both within the Solana network and across other blockchains.</p>

          <h3>{_t("Token Swap")}</h3>
          <p>Raydium enables users to exchange tokens, allowing them to buy and sell digital assets. To use this decentralised exchange, you need a decentralised wallet that supports tokens created with the <b>Solana Program Library (SPL)</b> standard, which is the only type compatible with Raydium. A popular example of such a wallet is <b>Phantom</b>, the most widely used option in the Solana ecosystem.</p>
          <p>Thanks to Solana's speed and scalability, token exchanges on Raydium occur within seconds, and transaction costs are significantly lower than those on Ethereum. Exchanging a token on Raydium is straightforward: simply connect your wallet, select or paste the address of the token you wish to exchange, enter the desired quantity, and click "Swap." If the transaction is confirmed, the swap will be completed in just a few seconds!</p>

          <h3>{_t("Integration with OpenBook")}</h3>
          <p>The main issue with several centralised exchanges is their inability to support limit orders. To address this problem, Raydium integrated its Automated Market Maker (AMM) with <b>OpenBook</b>, which is an open-source fork of Serum version 3, another decentralised exchange (DEX) on the Solana blockchain.</p>
          <p>This integration provides users with access to a larger pool of liquidity and, more importantly, allows for the use of <b>limit orders</b>, offering greater flexibility in trading operations. In other words, by utilising OpenBook, Raydium effectively combines the advantages of decentralised exchanges with certain features of centralised ones by linking its AMM with an innovative order book system.</p>

          <h3>{_t("Liquidity pools (AMM)")}</h3>
          <p>In any decentralised exchange (DEX) that uses an Automated Market Maker (AMM), users can deposit pairs of tokens into <b>liquidity pools</b> and earn rewards in RAY tokens from transactions conducted by other users. Liquidity pools are fundamental to the operation of popular decentralised exchanges, as they enable direct trading without the need for intermediaries.</p>
          <p>On Raydium, users can choose between two types of liquidity pools: <b>Raydium Pools</b> and <b>Permissionless Pools</b>. Raydium Pools are the protocol's official pools, while Permissionless Pools are created by community members and allow anyone to add new ones.</p>
          <p>Regarding returns, the annual yields displayed to users are based on the swaps conducted on this DEX. For each transaction, Raydium adds a <b>0.25% fee</b> to the total amount. Of this fee, 0.22% is allocated to the liquidity pool as rewards for liquidity providers, while the remaining 0.03% is distributed to RAY stakers as their rewards.</p>

          <h3>{_t("Farming and yield optimisation")}</h3>
          <p>Yield farming is also available on Raydium, allowing users to stake Liquidity Provider (LP) tokens to earn additional rewards. Raydium's farms are categorised into two types: <b>Raydium</b> and <b>Fusion</b>.</p>
          <p>The Raydium farms consist of a combination of RAY with another token, rewarding users who deposit LP tokens with RAY tokens. In contrast, Fusion farms feature a variety of tokens for both deposits and rewards.</p>

          <h2 id="ray-evolution">{_t("How Raydium works: the evolution of the project")}</h2>
          <p>Launched in 2021, Raydium was created to overcome the scalability and cost limitations of other blockchains. Its choice of Solana as its core infrastructure was driven by Solana's capability to process over <b>65,000 transactions per second</b> at minimal cost, making it ideal for an automated market maker (AMM) protocol that handles large volumes of trades and liquidity.</p>
          <p>Initially, Raydium integrated its liquidity with Serum's order book. However, due to concerns about Serum's long-term viability, Raydium ceased sharing liquidity with its order book and instead integrated its AMM with <b>OpenBook</b>, a fork of Serum V3.</p>

          <h2 id="ray-token">{_t("Token RAY and Governance")}</h2>
          <p>To fully understand Raydium and its operations, it is essential to examine its utility token, <b>RAY</b>, which plays a central role within the platform. Users who provide liquidity to pools or participate in farming can earn RAY rewards. Additionally, RAY token holders have the opportunity to participate in the protocol's governance, allowing them to influence the team's or the community's proposals for improvements.</p>
          <p>By staking RAY tokens, users can earn further rewards and gain access to advanced features. The token distribution strategy is designed to promote sustainable growth for the protocol, with a significant portion allocated for development, marketing, and community rewards. Raydium was launched in February 2021 with a maximum supply of <b>555 million tokens</b>; as of now, there are <b>290 million RAY</b> tokens in circulation.</p>
          <p>In summary, Raydium is more than just a decentralised exchange with an automated market maker (AMM). It serves as the nerve centre of the Solana ecosystem and is an advanced decentralised application (dapp) that is continuously updated. To support this claim, one can examine its performance from the beginning of 2023, during which it has recorded a total trading volume of more than <b>USD 200 billion</b>, outperforming its competitors.</p>
        </div>

        {/* Buy SOL banner */}
        <div className="ac-buy ac-buy-sol" data-testid="ray-buy-banner">
          <div className="ac-buy-left">
            <span className="ac-buy-logo ac-signup-logo"><svg viewBox="0 0 24 24" width="20" height="20"><rect x="3" y="3" width="18" height="18" rx="4" fill="none" stroke="#fff" strokeWidth="1.6"/><path d="M8 8h6a3 3 0 0 1 0 6H8zM8 14h7a3 3 0 0 1 0 6H8z" fill="none" stroke="#fff" strokeWidth="1.6"/><circle cx="17.5" cy="6.5" r="1.3" fill="#3ddc84"/></svg>blockscaner</span>
            <h3>{_t("Buy SOL")}<br />{_t("on Blockscaner")}</h3>
            <a className="ac-buy-btn" href="/products" onClick={(e) => e.preventDefault()}>{_t("Buy now")} <span>→</span></a>
          </div>
          <div className="ac-buy-art">
            <svg viewBox="0 0 220 150" preserveAspectRatio="xMidYMid slice">
              <defs>
                <linearGradient id="solPed" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#1a1a2e"/><stop offset="1" stopColor="#0d0d12"/>
                </linearGradient>
              </defs>
              {/* pedestal */}
              <path d="M70 150 L70 88 a40 14 0 0 1 80 0 L150 150 Z" fill="url(#solPed)"/>
              <ellipse cx="110" cy="88" rx="40" ry="14" fill="#2a2a4a"/>
              {/* coin */}
              <circle cx="110" cy="58" r="34" fill="#1a1a2e"/>
              <g fill="none" stroke="#14f195" strokeWidth="5" strokeLinecap="round">
                <path d="M88 52 l22 -12 22 12"/>
                <path d="M88 66 l22 -12 22 12"/>
                <path d="M88 80 l22 -12 22 12"/>
              </g>
              <g fill="none" stroke="#9945ff" strokeWidth="3" strokeLinecap="round" opacity=".6">
                <path d="M92 52 l18 -10 18 10"/>
                <path d="M92 66 l18 -10 18 10"/>
                <path d="M92 80 l18 -10 18 10"/>
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
            <article className="ac-card">
              <div className="ac-thumb"><Badge>Beginner</Badge>
                <svg viewBox="0 0 340 210" preserveAspectRatio="xMidYMid slice">
                  <rect width="340" height="210" fill="#ffe9b3"/>
                  {/* yellow boxes */}
                  <g fill="#ffd21f" stroke="#0d0d12" strokeWidth="3">
                    <rect x="40" y="140" width="50" height="50" rx="8"/>
                    <rect x="250" y="30" width="44" height="44" rx="8"/>
                    <rect x="90" y="30" width="40" height="40" rx="8"/>
                    <rect x="230" y="150" width="44" height="44" rx="8"/>
                  </g>
                  {/* lens */}
                  <circle cx="170" cy="106" r="44" fill="#fff" stroke="#0d0d12" strokeWidth="4.4"/>
                  <circle cx="170" cy="106" r="36" fill="#0d0d12"/>
                  <g fill="#ffd21f">
                    <circle cx="156" cy="96" r="5"/><circle cx="170" cy="96" r="5"/><circle cx="184" cy="96" r="5"/>
                    <circle cx="156" cy="110" r="5"/><circle cx="170" cy="110" r="5"/><circle cx="184" cy="110" r="5"/>
                    <circle cx="156" cy="124" r="5"/><circle cx="170" cy="124" r="5"/><circle cx="184" cy="124" r="5"/>
                  </g>
                </svg>
              </div>
              <div className="ac-tags"><span className="ac-tag">Crypto Market</span><span className="ac-tag">Proof-Of-Stake</span></div>
              <h3>Understanding Fetch.ai (FET): a complete guide with essential information</h3>
              <p className="ac-desc">Fetch.ai merges AI with blockchain. Discover how FET cryptocurrency powers its innovative tech and applications in AI.</p>
              <p className="ac-meta">December 20, 2023&nbsp;&nbsp;•&nbsp;&nbsp;5 min</p>
            </article>
            <article className="ac-card">
              <div className="ac-thumb"><Badge>Beginner</Badge>
                <svg viewBox="0 0 340 210" preserveAspectRatio="xMidYMid slice">
                  <rect width="340" height="210" fill="#3ad0ff"/>
                  {/* controller */}
                  <g transform="rotate(-14 170 106)">
                    <rect x="110" y="76" width="120" height="70" rx="22" fill="#fff" stroke="#0d0d12" strokeWidth="4"/>
                    <circle cx="140" cy="104" r="12" fill="#0d0d12"/>
                    <path d="M140 96 v16 M132 104 h16" stroke="#fff" strokeWidth="2.6"/>
                    <g fill="#0d0d12">
                      <circle cx="196" cy="98" r="5"/><circle cx="208" cy="106" r="5"/>
                      <circle cx="196" cy="114" r="5"/><circle cx="184" cy="106" r="5"/>
                    </g>
                  </g>
                  {/* controller arms */}
                  <g fill="#fff" stroke="#0d0d12" strokeWidth="4">
                    <path d="M110 110 L80 130 L96 150 L120 136 Z"/>
                    <path d="M230 110 L260 130 L244 150 L220 136 Z"/>
                  </g>
                </svg>
              </div>
              <div className="ac-tags"><span className="ac-tag">Metaverse</span><span className="ac-tag">NFT</span></div>
              <h3>Play-to-Earn: how gaming on the blockchain works</h3>
              <p className="ac-desc">Let's find out what Play-to-Earn is, the economic model of games that pay in crypto. How does it work and how can you earn crypto by gaming?</p>
              <p className="ac-meta">October 10, 2022&nbsp;&nbsp;•&nbsp;&nbsp;9 min</p>
            </article>
            <article className="ac-card">
              <div className="ac-thumb"><Badge>Intermedio</Badge>
                <svg viewBox="0 0 340 210" preserveAspectRatio="xMidYMid slice">
                  <rect width="340" height="210" fill="#bfe9ff"/>
                  {/* hills */}
                  <path d="M0 120 Q60 80 120 120 T240 110 T340 130 V210 H0 Z" fill="#3ad0ff" opacity=".5"/>
                  <path d="M0 150 Q80 110 160 150 T340 140 V210 H0 Z" fill="#7cc4ff" opacity=".5"/>
                  {/* lock */}
                  <rect x="146" y="86" width="48" height="56" rx="10" fill="#fff" stroke="#0d0d12" strokeWidth="4"/>
                  <path d="M158 86 v-12 a12 12 0 0 1 24 0 v12" fill="none" stroke="#0d0d12" strokeWidth="4"/>
                  <circle cx="170" cy="112" r="7" fill="#0d0d12"/>
                  <rect x="166" y="116" width="8" height="12" rx="2" fill="#0d0d12"/>
                  {/* diamonds */}
                  <g fill="#0d0d12">
                    <path d="M60 60 l10 -12 10 12 -10 12 Z"/>
                    <path d="M280 50 l10 -12 10 12 -10 12 Z"/>
                    <path d="M90 150 l10 -12 10 12 -10 12 Z"/>
                    <path d="M270 160 l10 -12 10 12 -10 12 Z"/>
                  </g>
                </svg>
              </div>
              <div className="ac-tags"><span className="ac-tag">DeFi</span><span className="ac-tag">Proof-Of-Stake</span></div>
              <h3>What is Yield Farming? Liquidity Mining, Staking and Lending compared</h3>
              <p className="ac-desc">DeFi is much more than trading: let's find out what the difference is between Yield Farming and staking and what crypto-lending is.</p>
              <p className="ac-meta">June 9, 2022&nbsp;&nbsp;•&nbsp;&nbsp;10 min</p>
            </article>
          </div>
        </section>

      </div>
    </SiteLayout>
  );
}
