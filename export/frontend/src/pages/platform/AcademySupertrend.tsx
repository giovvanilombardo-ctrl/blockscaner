import SiteLayout from "@/components/site/SiteLayout";
import Seo from "@/components/Seo";
import { t as _t } from "@/i18n";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

/* Supertrend hero artwork — monitor with candlesticks and label */
const ArtSupertrend = (
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

export default function AcademySupertrend() {
  return (
    <SiteLayout>
      <Seo title="Supertrend Indicator: What is it, and how does it work? — Blockscaner Academy" description="Learn what the Supertrend indicator is, what it measures and how to use it for your trading strategies for cryptocurrencies." />
      <div className="ac-article" data-testid="academy-article-supertrend">

        {/* breadcrumb */}
        <p className="ac-crumb">
          <Link to="/products/academy">Home</Link>
          <span>›</span>
          <a href="#" onClick={(e) => e.preventDefault()}>Trading</a>
          <span>›</span>
          <b>Supertrend Indicator: What is it, and how does it work?</b>
        </p>

        {/* header row */}
        <div className="ac-article-top">
          <Link to="/products/academy" className="ac-back" aria-label="Back to Academy"><ArrowLeft size={18} /></Link>
          <Tag>Crypto Technical Analysis</Tag>
        </div>

        <div className="ac-article-head">
          <h1>{_t("Supertrend Indicator:")}<br />{_t("What is it, and how does")}<br />{_t("it work?")}</h1>
          <div className="ac-share">
            <span className="ac-share-ic" aria-label="Share on X"><ShareIcon d="M18.9 2H22l-6.8 7.8L23 22h-6.3l-4.9-6.4L6.2 22H3l7.3-8.3L1.5 2h6.4l4.4 5.9L18.9 2zm-1.1 18h1.7L7.1 3.9H5.3L17.8 20z"/></span>
            <span className="ac-share-ic" aria-label="Share on Facebook"><ShareIcon d="M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.4h-1.2c-1.2 0-1.6.8-1.6 1.6V12h2.7l-.4 2.9h-2.3v7A10 10 0 0 0 22 12z"/></span>
            <span className="ac-share-ic" aria-label="Share on LinkedIn"><ShareIcon d="M20.4 20.4h-3.5v-5.6c0-1.3 0-3-1.9-3s-2.1 1.4-2.1 2.9v5.7H9.4V9h3.4v1.6h.1c.5-.9 1.7-1.9 3.4-1.9 3.6 0 4.3 2.4 4.3 5.5v6.2zM5.3 7.4a2 2 0 1 1 0-4.1 2 2 0 0 1 0 4.1zM7.1 20.4H3.6V9h3.5v11.4z"/></span>
          </div>
        </div>
        <p className="ac-meta">March 22, 2024&nbsp;&nbsp;•&nbsp;&nbsp;7 min</p>

        {/* hero image */}
        <div className="ac-article-thumb">
          <Badge>Beginner</Badge>
          {ArtSupertrend}
        </div>

        {/* You will learn */}
        <div className="ac-learn">
          <h2>{_t("You will learn")}</h2>
          <ul>
            <li><a href="#supertrend-what">{_t("Supertrend Indicator: What is it?")}</a></li>
            <li><a href="#supertrend-how">{_t("Supertrend Indicator: How it works")}</a></li>
            <li><a href="#supertrend-formula">{_t("How it is calculated and the formula")}</a></li>
            <li><a href="#supertrend-pros-cons">{_t("Supertrend indicator: advantages and disadvantages")}</a></li>
            <li><a href="#supertrend-conclusions">{_t("Conclusions")}</a></li>
          </ul>
        </div>

        {/* Article body */}
        <div className="ac-body">
          <p>The first brief answer to the question 'What is the Supertrend indicator?' is that it is a <b>trend-following signal</b>, i.e., helpful in identifying and following an ongoing price movement.</p>
          <p>It is one of the most popular in the trading world mainly because it is very easy to use. The Supertrend indicator is also remarkably efficient because it analyses volatility along with price movements.</p>
          <p>Let us analyse this indicator in detail to understand what the Supertrend is and how it works.</p>

          <h2 id="supertrend-what">{_t("Supertrend Indicator: What is it?")}</h2>
          <p><b>Olivier Seban</b>, a professional trader, writer, and teacher, invented the Supertrend in 2011. It belongs to the family of trend-following indicators. These compare price movement information to try to identify the direction of a trend. They are also useful for understanding when the current trend reverses.</p>
          <p>How does it do this? It calculates the <b>average candlestick price</b> on the reference timeframe and the volatility of a stock, cryptocurrency, commodity, or index.</p>
          <p>To understand what the Supertrend is, we need to know what it looks like on the chart. This indicator consists of a line that changes colour, usually from green to red, and position, depending on the movement of the asset in question.</p>
          <p>For example, if it is bearish, the Supertrend indicator will stand above the price as a kind of resistance. Conversely, if the market is rising, the line will support the candles, acting as support.</p>

          <h2 id="supertrend-how">{_t("Supertrend Indicator: How it works")}</h2>
          <p>After understanding the Supertrend indicator, it is time to analyse how it works. The first step is to understand how to set it. There are two main components: the number of bars or length and the factor or multiplier.</p>

          <h3>{_t("The number of bars")}</h3>
          <p>This parameter determines the number of bars or periods used to calculate the <b>Average True Range (ATR)</b>, a key component of the Supertrend. The ATR measures market volatility based on the price range of each bar or period. The 'Number of Bars' affects the sensitivity of the ATR and, consequently, the Supertrend itself.</p>
          <p>A larger number of bars produces a 'flatter' ATR and, consequently, a Supertrend less responsive to price changes, making it more stable in times of volatility. Conversely, fewer bars make the ATR (and thus the Supertrend) more responsive to price movements.</p>

          <h3>{_t("Factor")}</h3>
          <p>Instead, this parameter is multiplied by the ATR and used to adjust the distance of the Supertrend line from prices. Increasing the value of the Factor widens the bands of the Supertrend, making it less sensitive to price movements and reducing false signals in periods of volatility.</p>

          <h2 id="supertrend-formula">{_t("How it is calculated and the formula")}</h2>
          <p>As mentioned, the Supertrend indicator is based on the <b>Average True Range (ATR)</b>, one of the fundamental measures for calculating price volatility. Introduced by <b>J. Welles Wilder Jr.</b> in his book 'New Concepts in Technical Trading Systems', the ATR provides a detailed overview of asset price fluctuations. For this reason, it is one of the most frequently found tools in traders' toolboxes.</p>
          <p>The basic concept behind the ATR is quite simple: the range of movements of an asset, thus providing an estimate of the volatility of that period. This measurement is done by decomposing the entire price range of the asset. The calculation of the ATR considers the deviation between the point of maximum and the point of minimum; it is the absolute value of the difference between the point of minimum or maximum and the point on the graph where the range is closed.</p>
          <p>But let us now see what the Supertrend indicator is in detail by analysing the information it uses to produce the line from which it is composed:</p>
          <ul>
            <li>the closing price of the last candle, depending on the selected time interval;</li>
            <li>the high point touched by the analysed candle;</li>
            <li>the low point touched by the analysed candle;</li>
          </ul>
          <p>The Supertrend indicator then compares the three distances between these values and uses only the largest one, which is known as the actual range, for further calculations.</p>
          <p>After analysing all the variables that make it up, we are ready to tackle the formula that the Supertrend indicator uses to calculate the trend line.</p>
          <p className="ac-quote">Supertrend = (Maximum point + Minimum point) / 2 + (Multiplier or Factor * ATR)</p>
          <p>Once the volatility bands have been calculated, the indicator determines whether the asset price is bullish or bearish. It places the corresponding band above or below the price. If the price crosses one of the bands, the indicator signals a possible trend change.</p>

          <h2 id="supertrend-pros-cons">{_t("Supertrend indicator: advantages and disadvantages")}</h2>
          <p>As already mentioned, many traders and investors use the Supertrend indicator to make more informed decisions and limit risk. What are its strengths, and at what junctures is it better to prefer other indicators?</p>

          <h3>{_t("Strengths")}</h3>
          <ul>
            <li>The Supertrend indicator is easy to use, making it ideal for traders and investors of all levels;</li>
            <li>It allows market trends to be identified;</li>
            <li>Outlines a dynamic resistance or support level;</li>
            <li>The inclusion of the ATR in the formula allows the Supertrend to adapt to volatility;</li>
            <li>It is helpful for traders to improve their level of risk management;</li>
            <li>It is also a very useful confirmation tool, especially when combined with other indicators;</li>
          </ul>

          <h3>{_t("Weaknesses")}</h3>
          <ul>
            <li>The Supertrend is a <b>lagging indicator</b>, i.e. it cannot predict market movements but tends to react to current market conditions;</li>
            <li>It may provide false signals to traders, particularly when markets move sideways for a long period;</li>
            <li>It works best when combined with other indicators as it does not, for example, identify overbought or oversold conditions like Bollinger Bands;</li>
            <li>If used on short time frames, it may be affected by market noise, which is why many traders use it for medium to long-term analysis;</li>
          </ul>

          <h2 id="supertrend-conclusions">{_t("Conclusions")}</h2>
          <p>In conclusion, now you know what the Supertrend indicator is: a versatile and widely adopted technical analysis tool ideal for traders seeking to identify an asset's trend. Its ease of use, combined with its ability to provide clear indications of dynamic support and resistance levels, makes it invaluable for anyone trading in the markets, regardless of level or experience.</p>
          <p>However, as with any analysis tool, the Supertrend also has weaknesses. Its nature as a lagging indicator requires traders to be cautious and combine it with other technical analysis methodologies to confirm trading signals and reduce the possibility of false alarms. In addition, traders should be aware of the market risks associated with using the Supertrend in shorter time frames and sharply sideways markets.</p>
          <p>You can access Blockscaner Pro and test it by analysing the price action of many cryptocurrencies.</p>
        </div>

        {/* Sign up banner */}
        <div className="ac-signup" data-testid="supertrend-signup-banner">
          <div className="ac-signup-left">
            <span className="ac-buy-logo ac-signup-logo"><svg viewBox="0 0 24 24" width="20" height="20"><rect x="3" y="3" width="18" height="18" rx="4" fill="none" stroke="#fff" strokeWidth="1.6"/><path d="M8 8h6a3 3 0 0 1 0 6H8zM8 14h7a3 3 0 0 1 0 6H8z" fill="none" stroke="#fff" strokeWidth="1.6"/><circle cx="17.5" cy="6.5" r="1.3" fill="#3ddc84"/></svg>blockscaner</span>
            <h3>{_t("Sign up")}<br />{_t("to Blockscaner")}</h3>
            <a className="ac-signup-btn" href="/products" onClick={(e) => e.preventDefault()}>{_t("Start now")} <span>→</span></a>
          </div>
          <div className="ac-signup-art">
            <svg viewBox="0 0 240 190" preserveAspectRatio="xMidYMid slice">
              <defs>
                <linearGradient id="stBanner" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0" stopColor="#0e5fb8"/><stop offset="1" stopColor="#1a7fd0"/>
                </linearGradient>
              </defs>
              <rect width="240" height="190" fill="url(#stBanner)"/>
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
            <article className="ac-card" onClick={() => window.location.assign("/products/academy/futures")} style={{ cursor: "pointer" }}>
              <div className="ac-thumb"><Badge>Beginner</Badge>
                <svg viewBox="0 0 340 210" preserveAspectRatio="xMidYMid slice">
                  <rect width="340" height="210" fill="#d9ecff"/>
                  <path d="M0 90 L40 60 L76 96 L112 66 L150 100 L188 62 L228 100 L264 70 L304 104 L340 76 V210 H0 Z" fill="#0d0d12"/>
                  <path d="M0 130 L48 92 L92 132 L136 96 L180 134 L226 94 L272 132 L316 100 L340 122 V210 H0 Z" fill="#3a86ff"/>
                  <circle cx="104" cy="60" r="18" fill="#7cc4ff" stroke="#0d0d12" strokeWidth="3.5"/>
                  <circle cx="236" cy="44" r="13" fill="#7cc4ff" stroke="#0d0d12" strokeWidth="3.5"/>
                  <circle cx="190" cy="120" r="26" fill="#7cc4ff" stroke="#0d0d12" strokeWidth="4"/>
                  <circle cx="70" cy="150" r="16" fill="#7cc4ff" stroke="#0d0d12" strokeWidth="3.5"/>
                  <circle cx="290" cy="158" r="20" fill="#7cc4ff" stroke="#0d0d12" strokeWidth="3.5"/>
                  <circle cx="150" cy="40" r="4" fill="#0d0d12"/>
                  <circle cx="270" cy="96" r="4" fill="#0d0d12"/>
                  <rect x="118" y="150" width="26" height="44" rx="4" fill="#fff" stroke="#0d0d12" strokeWidth="3"/>
                  <rect x="220" y="142" width="26" height="52" rx="4" fill="#fff" stroke="#0d0d12" strokeWidth="3"/>
                </svg>
              </div>
              <div className="ac-tags"><span className="ac-tag">Derivati</span></div>
              <h3>Futures: what they are and how they work</h3>
              <p className="ac-desc">What are futures and how do they work? Discover these unique derivative financial instruments widely used by expert traders.</p>
              <p className="ac-meta">November 26, 2025&nbsp;&nbsp;•&nbsp;&nbsp;8 min</p>
            </article>
            <article className="ac-card" onClick={() => window.location.assign("/products/academy/wyckoff")} style={{ cursor: "pointer" }}>
              <div className="ac-thumb"><Badge>Beginner</Badge>
                <svg viewBox="0 0 340 210" preserveAspectRatio="xMidYMid slice">
                  <rect width="340" height="210" fill="#bfe9ff"/>
                  <path d="M0 96 L26 60 L52 96 L78 56 L104 100 L130 62 L156 102 L182 60 L208 100 L234 58 L260 102 L286 64 L312 100 L340 66 V210 H0 Z" fill="#7cc4ff" opacity=".55"/>
                  <path d="M0 130 L30 88 L60 132 L90 84 L120 136 L150 88 L180 138 L210 86 L240 136 L270 90 L300 134 L330 92 V210 H0 Z" fill="#4aa8ff" opacity=".8"/>
                  <path d="M0 160 L34 110 L68 162 L102 106 L136 166 L170 110 L204 168 L238 112 L272 166 L306 116 L340 158 V210 H0 Z" fill="#1e7fe8"/>
                  <rect x="0" y="146" width="340" height="6" fill="#fff" opacity=".5"/>
                  <ellipse cx="96" cy="92" rx="20" ry="12" fill="#fff" stroke="#0d0d12" strokeWidth="3.4" transform="rotate(-16 96 92)"/>
                  <ellipse cx="238" cy="96" rx="22" ry="13" fill="#fff" stroke="#0d0d12" strokeWidth="3.4" transform="rotate(14 238 96)"/>
                  <ellipse cx="66" cy="162" rx="24" ry="14" fill="#fff" stroke="#0d0d12" strokeWidth="3.4" transform="rotate(-12 66 162)"/>
                  <ellipse cx="290" cy="158" rx="22" ry="13" fill="#fff" stroke="#0d0d12" strokeWidth="3.4" transform="rotate(12 290 158)"/>
                </svg>
              </div>
              <div className="ac-tags"><span className="ac-tag">Crypto Technical Analysis</span></div>
              <h3>Wyckoff theory: what is it, and how does it work?</h3>
              <p className="ac-desc">Wyckoff theory is a trading method focused on market cycles, guiding traders in understanding price movements through accumulation and distribution.</p>
              <p className="ac-meta">November 21, 2024&nbsp;&nbsp;•&nbsp;&nbsp;5 min</p>
            </article>
            <article className="ac-card">
              <div className="ac-thumb"><Badge>Beginner</Badge>
                <svg viewBox="0 0 340 210" preserveAspectRatio="xMidYMid slice">
                  <rect width="340" height="210" fill="#c9b8f5"/>
                  <rect x="70" y="44" width="200" height="124" rx="12" fill="#fff" stroke="#0d0d12" strokeWidth="4"/>
                  <rect x="150" y="168" width="40" height="14" rx="4" fill="#0d0d12"/>
                  <g fill="#8b5cf6" stroke="#0d0d12" strokeWidth="1.2">
                    <rect x="92" y="96" width="10" height="30"/><rect x="106" y="88" width="10" height="42"/>
                    <rect x="120" y="102" width="10" height="22"/><rect x="134" y="92" width="10" height="36"/>
                    <rect x="148" y="82" width="10" height="46"/><rect x="162" y="94" width="10" height="28"/>
                    <rect x="176" y="86" width="10" height="38"/><rect x="190" y="98" width="10" height="24"/>
                    <rect x="204" y="88" width="10" height="34"/><rect x="218" y="100" width="10" height="20"/>
                    <rect x="232" y="90" width="10" height="30"/>
                  </g>
                  <rect x="96" y="54" width="148" height="30" rx="15" fill="#a98bff" stroke="#0d0d12" strokeWidth="3"/>
                  <text x="170" y="75" fontSize="14" fontWeight="800" textAnchor="middle" fill="#fff">Bollinger Bands</text>
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
