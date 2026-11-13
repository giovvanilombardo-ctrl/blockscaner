import SiteLayout from "@/components/site/SiteLayout";
import Seo from "@/components/Seo";
import { t as _t } from "@/i18n";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

/* Futures hero artwork — blue mountains and coins */
const ArtFutures = (
  <svg viewBox="0 0 340 210" preserveAspectRatio="xMidYMid slice">
    <rect width="340" height="210" fill="#d9ecff"/>
    {/* back mountains */}
    <path d="M0 90 L40 60 L76 96 L112 66 L150 100 L188 62 L228 100 L264 70 L304 104 L340 76 V210 H0 Z" fill="#0d0d12"/>
    {/* front mountains */}
    <path d="M0 130 L48 92 L92 132 L136 96 L180 134 L226 94 L272 132 L316 100 L340 122 V210 H0 Z" fill="#3a86ff"/>
    {/* coin circles */}
    <circle cx="104" cy="60" r="18" fill="#7cc4ff" stroke="#0d0d12" strokeWidth="3.5"/>
    <circle cx="236" cy="44" r="13" fill="#7cc4ff" stroke="#0d0d12" strokeWidth="3.5"/>
    <circle cx="190" cy="120" r="26" fill="#7cc4ff" stroke="#0d0d12" strokeWidth="4"/>
    <circle cx="70" cy="150" r="16" fill="#7cc4ff" stroke="#0d0d12" strokeWidth="3.5"/>
    <circle cx="290" cy="158" r="20" fill="#7cc4ff" stroke="#0d0d12" strokeWidth="3.5"/>
    {/* small dots */}
    <circle cx="150" cy="40" r="4" fill="#0d0d12"/>
    <circle cx="270" cy="96" r="4" fill="#0d0d12"/>
    {/* bars */}
    <rect x="118" y="150" width="26" height="44" rx="4" fill="#fff" stroke="#0d0d12" strokeWidth="3"/>
    <rect x="220" y="142" width="26" height="52" rx="4" fill="#fff" stroke="#0d0d12" strokeWidth="3"/>
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

export default function AcademyFutures() {
  return (
    <SiteLayout>
      <Seo title="Futures: what they are and how they work — Blockscaner Academy" description="What are futures and how do they work? Discover these unique derivative financial instruments widely used by expert traders." />
      <div className="ac-article" data-testid="academy-article-futures">

        {/* breadcrumb */}
        <p className="ac-crumb">
          <Link to="/products/academy">Home</Link>
          <span>›</span>
          <a href="#" onClick={(e) => e.preventDefault()}>Trading</a>
          <span>›</span>
          <b>Futures: what they are and how they work</b>
        </p>

        {/* header row */}
        <div className="ac-article-top">
          <Link to="/products/academy" className="ac-back" aria-label="Back to Academy"><ArrowLeft size={18} /></Link>
          <Tag>Derivati</Tag>
        </div>

        <div className="ac-article-head">
          <h1>{_t("Futures: what they are")}<br />{_t("and how they work")}</h1>
          <div className="ac-share">
            <span className="ac-share-ic" aria-label="Share on X"><ShareIcon d="M18.9 2H22l-6.8 7.8L23 22h-6.3l-4.9-6.4L6.2 22H3l7.3-8.3L1.5 2h6.4l4.4 5.9L18.9 2zm-1.1 18h1.7L7.1 3.9H5.3L17.8 20z"/></span>
            <span className="ac-share-ic" aria-label="Share on Facebook"><ShareIcon d="M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.4h-1.2c-1.2 0-1.6.8-1.6 1.6V12h2.7l-.4 2.9h-2.3v7A10 10 0 0 0 22 12z"/></span>
            <span className="ac-share-ic" aria-label="Share on LinkedIn"><ShareIcon d="M20.4 20.4h-3.5v-5.6c0-1.3 0-3-1.9-3s-2.1 1.4-2.1 2.9v5.7H9.4V9h3.4v1.6h.1c.5-.9 1.7-1.9 3.4-1.9 3.6 0 4.3 2.4 4.3 5.5v6.2zM5.3 7.4a2 2 0 1 1 0-4.1 2 2 0 0 1 0 4.1zM7.1 20.4H3.6V9h3.5v11.4z"/></span>
          </div>
        </div>
        <p className="ac-meta">November 26, 2025&nbsp;&nbsp;•&nbsp;&nbsp;8 min</p>

        {/* hero image */}
        <div className="ac-article-thumb">
          <Badge>Beginner</Badge>
          {ArtFutures}
        </div>

        {/* You will learn */}
        <div className="ac-learn">
          <h2>{_t("You will learn")}</h2>
          <ul>
            <li><a href="#futures-unravelling">{_t("Unravelling Futures: highly utilised derivative financial instruments for the savvy trader")}</a></li>
            <li><a href="#futures-what">{_t("What exactly are Futures Contracts?")}</a></li>
            <li><a href="#futures-mechanics">{_t("The mechanics of derivative contracts")}</a></li>
            <li><a href="#futures-margin">{_t("Contract guarantees and margin")}</a></li>
            <li><a href="#futures-operational">{_t("Futures: specific operational details")}</a></li>
            <li><a href="#futures-summary">{_t("Summary")}</a></li>
          </ul>
        </div>

        {/* Article body */}
        <div className="ac-body">
          <h2 id="futures-unravelling">{_t("Unravelling Futures: highly utilised derivative financial instruments for the savvy trader")}</h2>
          <p>In the simplest terms, <b>futures contracts</b> are a type of derivative instrument that allows investors to speculate on the future price movements of an underlying asset.</p>
          <p>To elaborate slightly, futures are essentially sale and purchase agreements, or formal forward contracts, where the instrument's value is intrinsically linked to that of an underlying asset.</p>
          <p>If that brief definition isn't quite enough to get your head around what futures are and how they operate, please don't fret! Do carry on reading this comprehensive article, where we'll explore everything you need to know about these sophisticated derivative instruments.</p>

          <h2 id="futures-what">{_t("What exactly are Futures Contracts?")}</h2>
          <p><b>Futures</b> are standardised contracts between two parties that govern, and indeed mandate, the commitment to sell and purchase a specific quantity of an asset at a predetermined price on a future date.</p>
          <p>These contracts are available for an exceptionally wide range of assets, including:</p>
          <ul>
            <li><b>Commodities</b> (such as crude oil or grains)</li>
            <li><b>Stock market indices</b> (like the FTSE 100 or the S&amp;P 500)</li>
            <li><b>Interest rates</b></li>
            <li><b>Currencies</b> (forex)</li>
            <li>And, increasingly, <b>cryptocurrencies</b></li>
          </ul>
          <p>Futures based on traditional assets are typically bought and sold on formal, regulated exchanges—such as the <b>Chicago Mercantile Exchange (CME)</b> or the <b>Intercontinental Exchange (ICE)</b>. These central exchanges act as the counterparty to all transactions, guaranteeing the contracts and significantly reducing the risk of a counterparty failing to honour their agreement. Cryptocurrency futures, on the other hand, are traded on various centralised and decentralised crypto exchanges.</p>

          <h2 id="futures-mechanics">{_t("The mechanics of derivative contracts")}</h2>
          <p>Having established the fundamental nature of these financial instruments, let's now drill down into the mechanics of how futures actually work.</p>
          <p>At their core, these contracts establish a binding obligation between the seller and the buyer to execute a financial transaction at a specified future date.</p>
          <p>One critical feature that dictates the contract's name is the time element:</p>
          <ul>
            <li><b>Futures:</b> These contracts require the transaction to be executed on a specific, fixed date in the future.</li>
            <li><b>Perpetuals:</b> For these, there is no set expiration or maturity date.</li>
          </ul>
          <p>In the digital asset space, perpetual futures have rapidly become the most popular and preferred instrument. Their inherent flexibility, coupled with their ability to align with markets that are relentlessly active 24 hours a day, 7 days a week, has cemented their status as a cornerstone of modern crypto trading.</p>

          <h3>{_t("Focus on Perpetual Futures: tailor-made for Crypto Markets")}</h3>
          <p>Given the non-stop nature of crypto markets, an instrument specifically designed for this dynamism was inevitable. In 2016, the <b>BitMEX</b> exchange introduced perpetual futures—derivative contracts without an expiry date, which perfectly complement the incessant rhythm of the cryptocurrency world.</p>
          <p>Like traditional futures, perpetual contracts enable speculation on the price direction of an asset (e.g., Bitcoin) without requiring the physical possession of the underlying asset itself. The key distinction is, as mentioned, the absence of a maturity date, allowing traders to keep their positions open indefinitely.</p>
          <p>To ensure the contract price remains tied to the price of the underlying asset, a mechanism called the <b>funding rate</b> is employed. At regular intervals (e.g., every eight hours), traders exchange payments based on the difference between the perpetual contract price and the real spot market price:</p>
          <ul>
            <li>If the perpetual price is <b>higher</b> than the spot price, traders with long positions pay the short traders. This encourages selling, pushing the contract price back towards equilibrium.</li>
            <li>If the price is <b>lower</b>, the reverse happens: short traders pay the long traders, compelling the perpetual price to rise.</li>
          </ul>
          <p>This system effectively keeps the contract price in line with the actual market, providing an ideal environment for dynamic speculation.</p>

          <h2 id="futures-margin">{_t("Contract guarantees and margin")}</h2>
          <p>A critical component for understanding futures is the requirement for a <b>contract guarantee</b>. Both parties are obligatorily required to lock up capital to demonstrate that they will be mutually solvent and capable of meeting their obligations when the transaction is due.</p>
          <p>For instance, if the agreement stipulates that a user must sell 1.00 BTC on a future date, they must lock up an equivalent amount as a guarantee. Similarly, the buyer promising the purchase must lock up collateral in fiat currency for the entire period the "position" remains open.</p>
          <p>This locked-up value is known as the <b>margin</b>. When opening a futures position, an investor does not need to pay the full value of the underlying asset; instead, they deposit this margin, which is only a fraction of the total amount, serving as a performance bond.</p>

          <h3>{_t("The role of leverage")}</h3>
          <p>It is also possible to trade these derivative contracts using financial leverage. By employing leverage, one can stipulate contracts with a notional value far superior to the collateral deposited (sometimes up to <b>150 times</b> the margin).</p>
          <p>This type of highly geared operation carries significant risks, most notably the risk of <b>liquidation</b>. This occurs when the margin is no longer sufficient to cover the losses on the position. Liquidation is typically triggered by substantial and sudden market fluctuations and involves the forced closure of the position, often resulting in the loss of all funds deposited as margin within that contract.</p>
          <p>Futures are also <b>marked to market</b> on a daily basis. This means that gains and losses are calculated and applied to the margin account every day based on the market's closing price. If the price moves against the investor's position beyond a certain threshold, a "margin call" will be issued, requiring the investor to deposit additional funds promptly to maintain their position.</p>

          <h2 id="futures-details">{_t("Futures: specific operational details")}</h2>
          <p>Having covered the broader world of derivatives, let's now look at the specific operational features of futures contracts.</p>
          <p>First and foremost, the final purchase or sale price is cemented the moment the contract is signed. Secondly, and critically, futures have a pre-established <b>expiry date</b>.</p>
          <p>When a contract reaches its maturity, the positions are forcibly closed, and the holder receives or pays the difference in cash, or occasionally, receives the physical asset itself (though the latter is rare in financial markets).</p>
          <p>For instance, if a contract provided for the purchase of 1.00 BTC, that amount (or its monetary equivalent) is settled into the account on the expiry day. It goes without saying that the profitability of this practice depends entirely on the price stipulated in the original contract. If Bitcoin was valued at $35,000 at the contract's inception and subsequently rose to $45,000 at expiry, the holder would realise a tidy profit of $10,000.</p>
          <p>Finally, to offer a practical understanding of how futures appear in action, here are the key data points displayed by exchanges:</p>
          <ul>
            <li><b>Expiry Date:</b> The date by which the contract will be automatically terminated.</li>
            <li><b>Index Price:</b> The current, real-time price of the underlying asset (e.g., Bitcoin).</li>
            <li><b>Mark Price:</b> The current price of the derivative contract itself.</li>
            <li><b>Open Interest:</b> The total notional value of all open derivative contracts in a market.</li>
            <li><b>Volume:</b> The monetary amount exchanged in that market, typically over the last 24 hours.</li>
            <li><b>Initial Margin:</b> The minimum collateral required to establish the position.</li>
            <li><b>Maintenance Margin:</b> In leveraged trading, this refers to the price point at which the collateral is insufficient to maintain the position open. If the underlying price falls to this threshold, liquidation is activated.</li>
          </ul>

          <h2 id="futures-summary">{_t("Summary")}</h2>
          <p>Futures are advanced financial instruments that present numerous opportunities but are equally accompanied by significant risks. Their effective comprehension and management demand experience and a meticulously defined strategy. It is imperative to remember that they are derivative instruments strictly intended for advanced-level traders. Utilising them correctly requires a high degree of preparation and market knowledge.</p>
          <p>Used judiciously, futures can be a powerful instrument for both hedging and speculation, affording investors the security and flexibility needed to navigate complex financial markets. If you are new to trading and looking to venture into the world of investing, it might be sensible to begin with something more straightforward, such as the recurring purchase of digital currencies.</p>
        </div>

        {/* Sign up banner */}
        <div className="ac-signup" data-testid="futures-signup-banner">
          <div className="ac-signup-left">
            <span className="ac-buy-logo ac-signup-logo"><svg viewBox="0 0 24 24" width="20" height="20"><rect x="3" y="3" width="18" height="18" rx="4" fill="none" stroke="#fff" strokeWidth="1.6"/><path d="M8 8h6a3 3 0 0 1 0 6H8zM8 14h7a3 3 0 0 1 0 6H8z" fill="none" stroke="#fff" strokeWidth="1.6"/><circle cx="17.5" cy="6.5" r="1.3" fill="#3ddc84"/></svg>blockscaner</span>
            <h3>{_t("Sign up")}<br />{_t("to Blockscaner")}</h3>
            <a className="ac-signup-btn" href="/products" onClick={(e) => e.preventDefault()}>{_t("Start now")} <span>→</span></a>
          </div>
          <div className="ac-signup-art">
            <svg viewBox="0 0 240 190" preserveAspectRatio="xMidYMid slice">
              <defs>
                <linearGradient id="futBanner" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0" stopColor="#0e5fb8"/><stop offset="1" stopColor="#1a7fd0"/>
                </linearGradient>
              </defs>
              <rect width="240" height="190" fill="url(#futBanner)"/>
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
            <article className="ac-card" onClick={() => window.location.assign("/products/academy/wyckoff")} style={{ cursor: "pointer" }}>
              <div className="ac-thumb"><Badge>Beginner</Badge>
                <svg viewBox="0 0 340 210" preserveAspectRatio="xMidYMid slice">
                  <rect width="340" height="210" fill="#bfe9ff"/>
                  {/* zigzag chart lines */}
                  <g fill="none" stroke="#3ad0ff" strokeWidth="6" strokeLinejoin="round">
                    <path d="M20 130 L56 70 L92 132 L128 76 L164 134 L200 74 L236 132 L272 78 L308 130"/>
                  </g>
                  <g fill="none" stroke="#0d0d12" strokeWidth="1.6">
                    <path d="M20 130 L56 70 L92 132 L128 76 L164 134 L200 74 L236 132 L272 78 L308 130"/>
                  </g>
                  {/* ellipses */}
                  <ellipse cx="92" cy="104" rx="18" ry="10" fill="#fff" stroke="#0d0d12" strokeWidth="3" transform="rotate(-18 92 104)"/>
                  <ellipse cx="236" cy="104" rx="18" ry="10" fill="#fff" stroke="#0d0d12" strokeWidth="3" transform="rotate(18 236 104)"/>
                  <ellipse cx="66" cy="168" rx="20" ry="11" fill="#fff" stroke="#0d0d12" strokeWidth="3" transform="rotate(-12 66 168)"/>
                  <ellipse cx="278" cy="166" rx="20" ry="11" fill="#fff" stroke="#0d0d12" strokeWidth="3" transform="rotate(12 278 166)"/>
                </svg>
              </div>
              <div className="ac-tags"><span className="ac-tag">Crypto Technical Analysis</span></div>
              <h3>Wyckoff theory: what is it, and how does it work?</h3>
              <p className="ac-desc">Wyckoff theory is a trading method focused on market cycles, guiding traders in understanding price movements through accumulation and distribution.</p>
              <p className="ac-meta">November 21, 2024&nbsp;&nbsp;•&nbsp;&nbsp;5 min</p>
            </article>
            <article className="ac-card" onClick={() => window.location.assign("/products/academy/supertrend")} style={{ cursor: "pointer" }}>
              <div className="ac-thumb"><Badge>Beginner</Badge>
                <svg viewBox="0 0 340 210" preserveAspectRatio="xMidYMid slice">
                  <rect width="340" height="210" fill="#bfe9ff"/>
                  {/* monitor */}
                  <rect x="70" y="44" width="200" height="124" rx="12" fill="#fff" stroke="#0d0d12" strokeWidth="4"/>
                  <rect x="150" y="168" width="40" height="14" rx="4" fill="#0d0d12"/>
                  {/* candles */}
                  <g fill="#3ad0ff" stroke="#0d0d12" strokeWidth="1.4">
                    <rect x="92" y="96" width="10" height="34"/><rect x="106" y="86" width="10" height="48"/>
                    <rect x="120" y="102" width="10" height="26"/><rect x="134" y="92" width="10" height="40"/>
                    <rect x="148" y="80" width="10" height="50"/><rect x="162" y="94" width="10" height="30"/>
                    <rect x="176" y="86" width="10" height="42"/><rect x="190" y="98" width="10" height="28"/>
                    <rect x="204" y="88" width="10" height="38"/><rect x="218" y="100" width="10" height="24"/>
                    <rect x="232" y="90" width="10" height="34"/>
                  </g>
                  {/* Supertrend label */}
                  <rect x="108" y="54" width="124" height="30" rx="15" fill="#3ad0ff" stroke="#0d0d12" strokeWidth="3"/>
                  <text x="170" y="75" fontSize="16" fontWeight="800" textAnchor="middle" fill="#0d0d12" fontStyle="italic">Supertrend</text>
                  {/* arrows */}
                  <path d="M146 128 l8 8 M154 128 l-8 8" stroke="#0d0d12" strokeWidth="2.4" fill="none" strokeLinecap="round"/>
                  <path d="M206 122 l8 8 M214 122 l-8 8" stroke="#0d0d12" strokeWidth="2.4" fill="none" strokeLinecap="round"/>
                </svg>
              </div>
              <div className="ac-tags"><span className="ac-tag">Crypto Technical Analysis</span></div>
              <h3>Supertrend Indicator: What is it, and how does it work?</h3>
              <p className="ac-desc">Learn what the Supertrend indicator is, what it measures and how to use it for your trading strategies for cryptocurrencies.</p>
              <p className="ac-meta">March 22, 2024&nbsp;&nbsp;•&nbsp;&nbsp;7 min</p>
            </article>
            <article className="ac-card">
              <div className="ac-thumb"><Badge>Beginner</Badge>
                <svg viewBox="0 0 340 210" preserveAspectRatio="xMidYMid slice">
                  <rect width="340" height="210" fill="#c9b8f5"/>
                  {/* monitor */}
                  <rect x="70" y="44" width="200" height="124" rx="12" fill="#fff" stroke="#0d0d12" strokeWidth="4"/>
                  <rect x="150" y="168" width="40" height="14" rx="4" fill="#0d0d12"/>
                  {/* candles */}
                  <g fill="#8b5cf6" stroke="#0d0d12" strokeWidth="1.2">
                    <rect x="92" y="96" width="10" height="30"/><rect x="106" y="88" width="10" height="42"/>
                    <rect x="120" y="102" width="10" height="22"/><rect x="134" y="92" width="10" height="36"/>
                    <rect x="148" y="82" width="10" height="46"/><rect x="162" y="94" width="10" height="28"/>
                    <rect x="176" y="86" width="10" height="38"/><rect x="190" y="98" width="10" height="24"/>
                    <rect x="204" y="88" width="10" height="34"/><rect x="218" y="100" width="10" height="20"/>
                    <rect x="232" y="90" width="10" height="30"/>
                  </g>
                  {/* Bollinger Bands label */}
                  <rect x="96" y="54" width="148" height="30" rx="15" fill="#a98bff" stroke="#0d0d12" strokeWidth="3"/>
                  <text x="170" y="75" fontSize="14" fontWeight="800" textAnchor="middle" fill="#fff">Bollinger Bands</text>
                  {/* arrows */}
                  <path d="M130 128 l8 8 M138 128 l-8 8" stroke="#0d0d12" strokeWidth="2.4" fill="none" strokeLinecap="round"/>
                  <path d="M222 122 l8 8 M230 122 l-8 8" stroke="#0d0d12" strokeWidth="2.4" fill="none" strokeLinecap="round"/>
                </svg>
              </div>
              <div className="ac-tags"><span className="ac-tag">Crypto Technical Analysis</span></div>
              <h3>Bollinger Bands: Understanding Market Volatility</h3>
              <p className="ac-desc">What are Bollinger Bands? Why are they a valuable indicator for trading, and how should they be used?</p>
              <p className="ac-meta">March 15, 2024&nbsp;&nbsp;•&nbsp;&nbsp;7 min</p>
            </article>
          </div>
        </section>

      </div>
    </SiteLayout>
  );
}
