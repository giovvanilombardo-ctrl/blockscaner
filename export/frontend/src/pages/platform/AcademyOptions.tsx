import SiteLayout from "@/components/site/SiteLayout";
import Seo from "@/components/Seo";
import { t as _t } from "@/i18n";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import optionsHands from "@/assets/options-hands.png";

/* PUT/CALL hero — realistic hands holding documents */
const ArtOptionsHero = <img src={optionsHands} alt="Two hands holding PUT and CALL documents" style={{ display: "block", width: "100%", height: "auto" }} />;

function Badge({ children }: { children: React.ReactNode }) {
  return <span className="ac-badge"><i />{children}</span>;
}
function Tag({ children }: { children: React.ReactNode }) {
  return <span className="ac-tag">{children}</span>;
}

const ShareIcon = ({ d }: { d: string }) => (
  <svg viewBox="0 0 24 24" width="18" height="18"><path d={d} fill="#0f0f12"/></svg>
);

export default function AcademyOptions() {
  return (
    <SiteLayout>
      <Seo title="Options: what are they and how do they work? — Blockscaner Academy" description="Options in finance are contracts giving the right, but not the obligation, to buy or sell an asset at a set price by a certain date, with a paid premium." />
      <div className="ac-article" data-testid="academy-article-options">

        {/* header row */}
        <div className="ac-article-top">
          <Link to="/products/academy" className="ac-back" aria-label="Back to Academy"><ArrowLeft size={18} /></Link>
          <Tag>Stocks</Tag>
        </div>

        <div className="ac-article-head">
          <h1>{_t("Options: what are they")}<br />{_t("and how do they work?")}</h1>
          <div className="ac-share">
            <span className="ac-share-ic" aria-label="Share on X"><ShareIcon d="M18.9 2H22l-6.8 7.8L23 22h-6.3l-4.9-6.4L6.2 22H3l7.3-8.3L1.5 2h6.4l4.4 5.9L18.9 2zm-1.1 18h1.7L7.1 3.9H5.3L17.8 20z"/></span>
            <span className="ac-share-ic" aria-label="Share on Facebook"><ShareIcon d="M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.4h-1.2c-1.2 0-1.6.8-1.6 1.6V12h2.7l-.4 2.9h-2.3v7A10 10 0 0 0 22 12z"/></span>
            <span className="ac-share-ic" aria-label="Share on LinkedIn"><ShareIcon d="M20.4 20.4h-3.5v-5.6c0-1.3 0-3-1.9-3s-2.1 1.4-2.1 2.9v5.7H9.4V9h3.4v1.6h.1c.5-.9 1.7-1.9 3.4-1.9 3.6 0 4.3 2.4 4.3 5.5v6.2zM5.3 7.4a2 2 0 1 1 0-4.1 2 2 0 0 1 0 4.1zM7.1 20.4H3.6V9h3.5v11.4z"/></span>
          </div>
        </div>
        <p className="ac-meta">September 10, 2024&nbsp;&nbsp;•&nbsp;&nbsp;5 min</p>

        {/* hero image */}
        <div className="ac-article-thumb">
          <Badge>Beginner</Badge>
          {ArtOptionsHero}
        </div>

        {/* You will learn */}
        <div className="ac-learn">
          <h2>{_t("You will learn")}</h2>
          <ul>
            <li><a href="#options-definition">{_t("What is an option in finance? A definition")}</a></li>
            <li><a href="#options-types">{_t("Key types of options")}</a></li>
            <li><a href="#options-practical">{_t("How options work: a practical example")}</a></li>
            <li><a href="#options-asymmetry">{_t("Asymmetry of risk and reward in options")}</a></li>
          </ul>
        </div>

        {/* Article body */}
        <div className="ac-body">
          <p>Options are a type of financial derivative whose value depends on the price of an underlying asset. The underlying asset may be “real,” such as a commodity, or “financial,” like stocks, bonds, or exchange rates. The term “derivative” signifies this dependence on the underlying asset. Options provide flexibility for traders and investors, allowing them to speculate or hedge against market risk.</p>

          <h2 id="options-definition">What is an option in finance? A definition</h2>
          <p>In finance, an option is a contract granting the holder the right, but not the obligation, to buy (Call) or sell (Put) an asset at a predetermined price (strike price) within a set period (maturity). For this right, the buyer pays a premium. Options function similarly to insurance policies: the buyer pays a premium for protection in the event of a specified market movement.</p>
          <p>If this movement doesn’t occur, the buyer forfeits the premium. Options also amplify market exposure via leverage since each option contract typically covers multiple assets.</p>

          <h2 id="options-types">Key types of options</h2>
          <p>Having covered the basic option finance definition, let’s explore the main types of options and their specific characteristics:</p>
          <ul>
            <li><b>Call options:</b> These give the holder the right to buy the underlying asset at the strike price before expiration. When the holder expects a price increase, call options are similar to a long position but only yield a profit if the asset reaches the strike price.</li>
            <li><b>Put options:</b> These are the inverse of Calls, allowing the holder to sell an asset at the strike price if the price falls. They function similarly to short selling, letting investors “bet” on a price decrease.</li>
            <li><b>American options:</b> These options can be exercised at any point before expiration, offering more flexibility than standard European options.</li>
            <li><b>Exotic options:</b> These options have complex features beyond standard options, such as barrier or binary options, which are only exercised if they hit a specified price.</li>
            <li><b>Over-the-counter (OTC) options:</b> OTC options are custom contracts directly negotiated between parties, often used by institutional investors for specific hedging needs.</li>
          </ul>

          <h2 id="options-practical">How options work: a practical example</h2>
          <p>Let’s consider a practical example to understand better how options work. Suppose you purchase a Call option on NVIDIA with a strike price of $140, covering 100 shares and expiring in 90 days. You pay a premium of $2 per share. Currently, NVIDIA’s price is about $110.</p>
          <p>In 90 days, you’ll have the right to buy these shares at $140 each, regardless of their market price. You must also account for the premium cost of $200 (100 shares x $2).</p>
          <p>If NVIDIA’s price remains at $110, there’s no benefit in exercising the option at $140. The premium cost would be lost. However, if NVIDIA’s price rises to $200, your option allows you to buy 100 shares worth $20,000 for just $14,000. After deducting the $200 premium, your contract value is $5,800, giving you the choice to purchase the shares or sell the option for a profit.</p>
          <p>Put options operate similarly but with an opposite outlook. Buyers of Put options expect prices to fall.</p>

          <h2 id="options-asymmetry">Asymmetry of risk and reward in options</h2>
          <p>A key concept in options trading is the asymmetry of risk and reward. For Call options, the potential profit is limitless, as it depends solely on how much the underlying asset rises. Conversely, potential losses are capped at the premium paid.</p>
          <p>For example, if the option expires below $142, our profit and loss (P&amp;L) is zero. This is because the price increase only offsets the premium cost. Conversely, if prices drop, we’re protected as we can simply choose not to exercise the option, with the premium as our only loss.</p>
          <div className="ac-note">
            <h4>Break-even point:</h4>
            <p>Break-even = strike price * number of shares + premium ÷ number of shares = (140 * 100) + 200 ÷ 100 = <b>$142</b></p>
          </div>

          <h3 id="options-sellers">Option sellers</h3>
          <p>Now that you know what options are and how they work, you might wonder why anyone would sell options. Options require two parties: the buyer of a Call or Put and the seller, who plays the role of an “insurer.” For sellers, the risk-reward profile is reversed.</p>
          <p>Option sellers can earn up to the premium paid (e.g., $200 in our example). Still, their losses are theoretically unlimited if the asset’s price rises sharply, as they must sell it at the strike price of $140 regardless of its market value.</p>
          <p>In summary, options create a zero-sum scenario: one party gains while the other loses. They’re valuable tools for hedging or leveraging, but they require experience and are not ideal for beginners. Therefore, they are often found only on platforms suited to advanced traders.</p>
        </div>

        {/* Buy CTA */}
        <div className="ac-buy" style={{ marginTop: "3rem" }}>
          <div className="ac-buy-left">
            <span className="ac-buy-logo"><svg viewBox="0 0 24 24" width="20" height="20"><rect x="3" y="3" width="18" height="18" rx="4" fill="none" stroke="#0f0f12" strokeWidth="1.6"/><path d="M8 8h6a3 3 0 0 1 0 6H8zM8 14h7a3 3 0 0 1 0 6H8z" fill="none" stroke="#0f0f12" strokeWidth="1.6"/><circle cx="17.5" cy="6.5" r="1.3" fill="#1663d9"/></svg>blockscaner</span>
            <h3>{_t("Sign up")}<br />{_t("to Blockscaner")}</h3>
            <a className="ac-buy-btn" href="/products" onClick={(e) => e.preventDefault()}>{_t("Start now")} <span>→</span></a>
          </div>
          <div className="ac-buy-art">
            <svg viewBox="0 0 200 120" preserveAspectRatio="xMidYMid slice">
              <rect width="200" height="120" fill="none"/>
              <rect x="20" y="34" width="110" height="70" rx="10" fill="#fff" stroke="#0d0d12" strokeWidth="3"/>
              <circle cx="75" cy="69" r="20" fill="#3ddc84" stroke="#0d0d12" strokeWidth="3"/>
              <path d="M75 56 L84 70 L75 76 L66 70 Z" fill="#0d0d12"/>
              <rect x="112" y="52" width="66" height="42" rx="10" fill="#1663d9"/>
              <circle cx="130" cy="73" r="11" fill="#fff"/>
              <text x="152" y="78" fontSize="10" fontWeight="800" fill="#fff">ETH</text>
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
            <article className="ac-card" onClick={() => window.location.assign("/products/academy/bonds")} style={{ cursor: "pointer" }}>
              <div className="ac-thumb"><Badge>Beginner</Badge>
                <svg viewBox="0 0 340 210" preserveAspectRatio="xMidYMid slice">
                  <rect width="340" height="210" fill="#d9ccff"/>
                  <path d="M60 130 L60 96 L98 70 L136 96 L136 130 Z" fill="#b9a7f0" stroke="#0d0d12" strokeWidth="4"/>
                  <path d="M98 70 L136 96 H60 Z" fill="#8b5cf6"/>
                  <rect x="74" y="104" width="9" height="26" fill="#0d0d12"/><rect x="92" y="104" width="9" height="26" fill="#0d0d12"/><rect x="110" y="104" width="9" height="26" fill="#0d0d12"/>
                  <path d="M204 130 L204 96 L242 70 L280 96 L280 130 Z" fill="#b9a7f0" stroke="#0d0d12" strokeWidth="4"/>
                  <path d="M242 70 L280 96 H204 Z" fill="#8b5cf6"/>
                  <rect x="218" y="104" width="9" height="26" fill="#0d0d12"/><rect x="236" y="104" width="9" height="26" fill="#0d0d12"/><rect x="254" y="104" width="9" height="26" fill="#0d0d12"/>
                  <rect x="140" y="58" width="90" height="86" rx="6" fill="#f3edff" stroke="#0d0d12" strokeWidth="4"/>
                  <rect x="148" y="66" width="74" height="70" rx="4" fill="none" stroke="#0d0d12" strokeWidth="2"/>
                  <circle cx="185" cy="90" r="14" fill="#c9a7ff" stroke="#0d0d12" strokeWidth="3"/>
                  <circle cx="185" cy="90" r="8" fill="none" stroke="#0d0d12" strokeWidth="2" strokeDasharray="2 2"/>
                  <line x1="158" y1="112" x2="212" y2="112" stroke="#0d0d12" strokeWidth="2.4"/>
                  <line x1="158" y1="120" x2="206" y2="120" stroke="#0d0d12" strokeWidth="2.4"/>
                  <line x1="158" y1="128" x2="200" y2="128" stroke="#0d0d12" strokeWidth="2.4"/>
                  <circle cx="66" cy="64" r="15" fill="#fff" stroke="#0d0d12" strokeWidth="3.4"/>
                  <ellipse cx="66" cy="72" rx="15" ry="5" fill="#d9ccff" stroke="#0d0d12" strokeWidth="2"/>
                  <circle cx="278" cy="64" r="15" fill="#fff" stroke="#0d0d12" strokeWidth="3.4"/>
                  <ellipse cx="278" cy="72" rx="15" ry="5" fill="#d9ccff" stroke="#0d0d12" strokeWidth="2"/>
                  <circle cx="100" cy="152" r="15" fill="#fff" stroke="#0d0d12" strokeWidth="3.4"/>
                  <ellipse cx="100" cy="160" rx="15" ry="5" fill="#d9ccff" stroke="#0d0d12" strokeWidth="2"/>
                  <circle cx="252" cy="152" r="15" fill="#fff" stroke="#0d0d12" strokeWidth="3.4"/>
                  <ellipse cx="252" cy="160" rx="15" ry="5" fill="#d9ccff" stroke="#0d0d12" strokeWidth="2"/>
                </svg>
              </div>
              <div className="ac-tags"><span className="ac-tag">Stocks</span></div>
              <h3>What are bonds and how do they work?</h3>
              <p className="ac-desc">What are bonds, and how do they work? The financial instruments that reduce the portfolio risk</p>
              <p className="ac-meta">April 17, 2026&nbsp;&nbsp;•&nbsp;&nbsp;14 min</p>
            </article>
            <article className="ac-card">
              <div className="ac-thumb"><Badge>Beginner</Badge>
                <svg viewBox="0 0 220 150" preserveAspectRatio="xMidYMid slice">
                  <rect width="220" height="150" fill="#0d0d12"/>
                  <circle cx="110" cy="72" r="52" fill="#8b5cf6"/>
                  <g fill="#efe9ff" stroke="#0d0d12" strokeWidth="1.4">
                    <path d="M78 40 h20 v10 a6 6 0 0 0 10 0 v-10 h20 v20 h-10 a6 6 0 0 0 0 10 h10 v20 h-20 v-10 a6 6 0 0 0 -10 0 v10 h-20 z"/>
                    <path d="M52 84 h14 v8 a5 5 0 0 0 8 0 v-8 h14 v14 h-8 a5 5 0 0 0 0 8 h8 v14 h-14 v-8 a5 5 0 0 0 -8 0 v8 h-14 z" transform="translate(-6 -8)"/>
                    <path d="M142 92 h14 v8 a5 5 0 0 0 8 0 v-8 h14 v14 h-8 a5 5 0 0 0 0 8 h8 v14 h-14 v-8 a5 5 0 0 0 -8 0 v8 h-14 z" transform="translate(-2 6)"/>
                  </g>
                  <path d="M98 66 q12 10 24 0 l6 6 q-6 6 -12 6 t-12 -6 z" fill="#fff" stroke="#0d0d12" strokeWidth="1.4"/>
                </svg>
              </div>
              <div className="ac-tags"><span className="ac-tag">Stocks</span></div>
              <h3>Stakeholders: who they are and how to identify them</h3>
              <p className="ac-desc">What is a stakeholder? Discover the meaning of stakeholders, their types, practical examples, and the process of stakeholder mapping.</p>
              <p className="ac-meta">June 25, 2024&nbsp;&nbsp;•&nbsp;&nbsp;5 min</p>
            </article>
            <article className="ac-card">
              <div className="ac-thumb"><Badge>Beginner</Badge>
                <svg viewBox="0 0 220 150" preserveAspectRatio="xMidYMid slice">
                  <rect width="220" height="150" fill="#ff4d6d"/>
                  <path d="M108 40 C120 34 142 36 152 50 C162 64 160 84 148 96 C138 106 122 108 108 102 C96 96 88 84 88 70 C88 56 96 46 108 40 Z" fill="#fff"/>
                  <path d="M108 40 C114 30 130 28 138 36" stroke="#0d0d12" strokeWidth="2.4" fill="none"/>
                  <circle cx="108" cy="66" r="20" fill="#ff4d6d" stroke="#0d0d12" strokeWidth="2.4"/>
                  <path d="M102 62 l6 6 l10 -10" stroke="#fff" strokeWidth="2.4" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M136 34 C146 26 160 28 168 38" stroke="#fff" strokeWidth="2" fill="none"/>
                  <circle cx="52" cy="60" r="14" fill="#ff4d6d" stroke="#fff" strokeWidth="2"/>
                  <circle cx="176" cy="96" r="18" fill="#fff" stroke="#0d0d12" strokeWidth="2.4"/>
                  <path d="M170 92 h12 M176 86 v12" stroke="#ff4d6d" strokeWidth="2.4" strokeLinecap="round"/>
                  <path d="M60 110 l6 -12 l6 12 l-12 -8 h12 z" fill="#fff"/>
                </svg>
              </div>
              <div className="ac-tags"><span className="ac-tag">Fiat Currency</span><span className="ac-tag">Stocks</span></div>
              <h3>Managed Assets: what are they and how do they work?</h3>
              <p className="ac-desc">Managed assets are services for investing and managing capital, led by professionals or passive tools, based on risk profiles and financial goals.</p>
              <p className="ac-meta">June 18, 2024&nbsp;&nbsp;•&nbsp;&nbsp;4 min</p>
            </article>
          </div>
        </section>

      </div>
    </SiteLayout>
  );
}
