import SiteLayout from "@/components/site/SiteLayout";
import Seo from "@/components/Seo";
import { t as _t } from "@/i18n";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const ArtBonds = (
  <svg viewBox="0 0 340 210" preserveAspectRatio="xMidYMid slice">
    <rect width="340" height="210" fill="#d9ccff"/>
    {/* left building */}
    <path d="M60 130 L60 96 L98 70 L136 96 L136 130 Z" fill="#b9a7f0" stroke="#0d0d12" strokeWidth="4"/>
    <path d="M98 70 L136 96 H60 Z" fill="#8b5cf6"/>
    <rect x="74" y="104" width="9" height="26" fill="#0d0d12"/><rect x="92" y="104" width="9" height="26" fill="#0d0d12"/><rect x="110" y="104" width="9" height="26" fill="#0d0d12"/>
    {/* right building */}
    <path d="M204 130 L204 96 L242 70 L280 96 L280 130 Z" fill="#b9a7f0" stroke="#0d0d12" strokeWidth="4"/>
    <path d="M242 70 L280 96 H204 Z" fill="#8b5cf6"/>
    <rect x="218" y="104" width="9" height="26" fill="#0d0d12"/><rect x="236" y="104" width="9" height="26" fill="#0d0d12"/><rect x="254" y="104" width="9" height="26" fill="#0d0d12"/>
    {/* centre certificate */}
    <rect x="140" y="58" width="90" height="86" rx="6" fill="#f3edff" stroke="#0d0d12" strokeWidth="4"/>
    <rect x="148" y="66" width="74" height="70" rx="4" fill="none" stroke="#0d0d12" strokeWidth="2"/>
    {/* seal */}
    <circle cx="185" cy="90" r="14" fill="#c9a7ff" stroke="#0d0d12" strokeWidth="3"/>
    <circle cx="185" cy="90" r="8" fill="none" stroke="#0d0d12" strokeWidth="2" strokeDasharray="2 2"/>
    {/* lines */}
    <line x1="158" y1="112" x2="212" y2="112" stroke="#0d0d12" strokeWidth="2.4"/>
    <line x1="158" y1="120" x2="206" y2="120" stroke="#0d0d12" strokeWidth="2.4"/>
    <line x1="158" y1="128" x2="200" y2="128" stroke="#0d0d12" strokeWidth="2.4"/>
    {/* coins */}
    <circle cx="66" cy="64" r="15" fill="#fff" stroke="#0d0d12" strokeWidth="3.4"/>
    <ellipse cx="66" cy="72" rx="15" ry="5" fill="#d9ccff" stroke="#0d0d12" strokeWidth="2"/>
    <circle cx="278" cy="64" r="15" fill="#fff" stroke="#0d0d12" strokeWidth="3.4"/>
    <ellipse cx="278" cy="72" rx="15" ry="5" fill="#d9ccff" stroke="#0d0d12" strokeWidth="2"/>
    <circle cx="100" cy="152" r="15" fill="#fff" stroke="#0d0d12" strokeWidth="3.4"/>
    <ellipse cx="100" cy="160" rx="15" ry="5" fill="#d9ccff" stroke="#0d0d12" strokeWidth="2"/>
    <circle cx="252" cy="152" r="15" fill="#fff" stroke="#0d0d12" strokeWidth="3.4"/>
    <ellipse cx="252" cy="160" rx="15" ry="5" fill="#d9ccff" stroke="#0d0d12" strokeWidth="2"/>
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

export default function AcademyBonds() {
  return (
    <SiteLayout>
      <Seo title="What are bonds and how do they work? — Blockscaner Academy" description="What are bonds, and how do they work? The financial instruments that reduce the portfolio risk." />
      <div className="ac-article" data-testid="academy-article-bonds">

        {/* header row */}
        <div className="ac-article-top">
          <Link to="/products/academy" className="ac-back" aria-label="Back to Academy"><ArrowLeft size={18} /></Link>
          <Tag>Stocks</Tag>
        </div>

        <div className="ac-article-head">
          <h1>{_t("What are bonds and how")}<br />{_t("do they work?")}</h1>
          <div className="ac-share">
            <span className="ac-share-ic" aria-label="Share on X"><ShareIcon d="M18.9 2H22l-6.8 7.8L23 22h-6.3l-4.9-6.4L6.2 22H3l7.3-8.3L1.5 2h6.4l4.4 5.9L18.9 2zm-1.1 18h1.7L7.1 3.9H5.3L17.8 20z"/></span>
            <span className="ac-share-ic" aria-label="Share on Facebook"><ShareIcon d="M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.4h-1.2c-1.2 0-1.6.8-1.6 1.6V12h2.7l-.4 2.9h-2.3v7A10 10 0 0 0 22 12z"/></span>
            <span className="ac-share-ic" aria-label="Share on LinkedIn"><ShareIcon d="M20.4 20.4h-3.5v-5.6c0-1.3 0-3-1.9-3s-2.1 1.4-2.1 2.9v5.7H9.4V9h3.4v1.6h.1c.5-.9 1.7-1.9 3.4-1.9 3.6 0 4.3 2.4 4.3 5.5v6.2zM5.3 7.4a2 2 0 1 1 0-4.1 2 2 0 0 1 0 4.1zM7.1 20.4H3.6V9h3.5v11.4z"/></span>
          </div>
        </div>
        <p className="ac-meta">April 17, 2026&nbsp;&nbsp;•&nbsp;&nbsp;14 min</p>

        {/* hero image */}
        <div className="ac-article-thumb">
          <Badge>Beginner</Badge>
          {ArtBonds}
        </div>

        {/* You will learn */}
        <div className="ac-learn">
          <h2>{_t("You will learn")}</h2>
          <ul>
            <li><a href="#bonds-intro">{_t("What are bonds, and how do they work? Financial instruments to reduce portfolio risk")}</a></li>
            <li><a href="#bonds-what">{_t("What are bonds?")}</a></li>
            <li><a href="#bonds-technically">{_t("How bonds work technically")}</a></li>
            <li><a href="#bonds-characteristics">{_t("Key characteristics of bonds")}</a></li>
            <li><a href="#bonds-advantages">{_t("Advantages associated with the use of bonds")}</a></li>
            <li><a href="#bonds-risks">{_t("Risks associated with investing in bonds")}</a></li>
            <li><a href="#bonds-tokenisation">{_t("Tokenisation of bonds")}</a></li>
            <li><a href="#bonds-conclusions">{_t("Conclusions")}</a></li>
          </ul>
        </div>

        {/* Article body */}
        <div className="ac-body">
          <h2 id="bonds-intro">What are bonds, and how do they work? Financial instruments to reduce portfolio risk</h2>
          <p>Bonds are one of the fundamental financial instruments of traditional finance. They act as a bridge between those who need money for their projects (such as a government or a company) and those who want to invest their savings to grow them.</p>
          <p>With a market estimated at around $140.7 trillion and widespread use by governments, supranational bodies, businesses and private individuals, understanding in detail what bonds are and how they work is essential for building sound financial literacy.</p>
          <p>That said, let’s dive straight in and find out what bonds are and how they work.</p>

          <h2 id="bonds-what">What are bonds?</h2>
          <p>Bonds are debt instruments issued by an entity that, as the debtor, undertakes to repay a specific sum of money to a counterparty (investor or creditor) by a predetermined deadline, whilst making periodic payments of interest, known as coupons.</p>
          <p>This exchange of value is defined and governed by a financial contract, namely the bond, which unambiguously and bindingly sets out the terms, timing and conditions under which the entire transaction is to be managed.</p>
          <p>In a nutshell, a bond is nothing more than a loan in the form of a financial security: the purchaser lends capital, the issuer receives it, thereby formalising the debt and the terms of repayment.</p>

          <h2 id="bonds-technically">How bonds work technically</h2>
          <p>To fully understand what bonds are and how they work, let us now examine their technical structure in detail, focusing specifically on three aspects: the parties involved, the issuance mechanism and the coupon/yield system.</p>

          <h3 id="bonds-parties">The parties involved</h3>
          <p>A bond issue is a capital market transaction involving the interaction of at least two categories of parties, whose positions are mirror images of and complementary to one another:</p>
          <ul>
            <li><b>The debtor (or issuer):</b> the party (state, supranational body, or company) that issues the bond to borrow money. It undertakes contractually to repay the principal at maturity and to pay the agreed interest.</li>
            <li><b>The creditor (or investor):</b> is the party (private individual, bank, investment fund) which, having surplus liquidity, decides to lend a sum of money in exchange for future remuneration (interest).</li>
          </ul>
        </div>

        {/* Academy image: Creditor vs Debtor */}
        <section className="ac-summary" data-testid="bonds-parties-img">
          <div className="ac-summary-brand">
            <span className="ac-summary-check"><svg viewBox="0 0 24 24" width="16" height="16"><path d="M5 13l4 4L19 7" stroke="#fff" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
            <span>academy</span>
          </div>
          <div className="ac-parties">
            <div className="ac-party">
              <svg viewBox="0 0 120 130" width="110" height="118">
                <circle cx="60" cy="60" r="52" fill="#fff" stroke="#0d0d12" strokeWidth="2.4"/>
                <circle cx="60" cy="52" r="17" fill="#fff" stroke="#0d0d12" strokeWidth="2"/>
                <path d="M42 52 C42 36 78 36 78 52 C78 44 72 38 60 38 C48 38 42 44 42 52 Z" fill="#0d0d12"/>
                <path d="M46 50 q2 -2 4 0 M56 50 q2 -2 4 0" stroke="#0d0d12" strokeWidth="2.4" fill="none" strokeLinecap="round"/>
                <path d="M60 64 l-4 6 h8 z" fill="#0d0d12"/>
                <path d="M36 96 C40 78 80 78 84 96 L84 106 L36 106 Z" fill="#efe9ff" stroke="#0d0d12" strokeWidth="2"/>
                <rect x="57" y="84" width="6" height="20" rx="3" fill="#0d0d12"/>
              </svg>
              <p className="ac-party-name">Creditor</p>
              <p className="ac-party-sub">(Money Surplus)</p>
            </div>
            <div className="ac-party">
              <svg viewBox="0 0 120 130" width="110" height="118">
                <circle cx="60" cy="60" r="52" fill="#fff" stroke="#0d0d12" strokeWidth="2.4"/>
                <circle cx="60" cy="52" r="17" fill="#fff" stroke="#0d0d12" strokeWidth="2"/>
                <path d="M42 52 C42 36 78 36 78 52 C78 44 72 38 60 38 C48 38 42 44 42 52 Z" fill="#0d0d12"/>
                <path d="M46 50 q2 -2 4 0 M56 50 q2 -2 4 0" stroke="#0d0d12" strokeWidth="2.4" fill="none" strokeLinecap="round"/>
                <path d="M60 64 l-4 6 h8 z" fill="#0d0d12"/>
                <path d="M36 96 C40 78 80 78 84 96 L84 106 L36 106 Z" fill="#efe9ff" stroke="#0d0d12" strokeWidth="2"/>
                <rect x="57" y="84" width="6" height="20" rx="3" fill="#0d0d12"/>
              </svg>
              <p className="ac-party-name">Debtor</p>
              <p className="ac-party-sub">(Money Need)</p>
            </div>
          </div>
        </section>

        {/* Article body — continued */}
        <div className="ac-body" style={{ marginTop: "3rem" }}>
          <p>The relationship between these counterparties establishes a direct credit relationship in which the investor acquires the right to receive future payments, whilst the issuer assumes a binding obligation to honour the debt by repaying the principal and interest.</p>

          <h3 id="bonds-issuance">Issuance mechanism</h3>
          <p>To place securities on the market and raise capital, the issuer primarily uses two procedures: public auctions and direct placements. Let’s look in detail at the differences between these two methods:</p>
          <ul>
            <li><b>Public auction:</b> the most common method for government bonds (such as BTPs). It operates as a genuine competitive tender: the issuer does not set the final price in advance; instead, it offers the securities to the market, inviting institutional investors (such as banks) to submit bids. It is the interplay between supply and demand that determines the purchase price and, consequently, the bond’s effective yield.</li>
            <li><b>Direct placement:</b> In this case, the issuer (often a company or a bank) uses a group of intermediary banks to sell the securities directly to investors. Unlike an auction, here the terms (price and interest rate) are often set in advance by the issuer. Investors simply reserve and purchase the securities on the agreed terms, until the offer is exhausted.</li>
          </ul>
          <p>In both cases, once trading has concluded, a bond must have three fundamental elements to be defined as such: a maturity date, a face value (principal), and an interest rate, also known as a coupon.</p>

          <h3 id="bonds-coupons">Coupons and the effective yield of a bond</h3>
          <p>During the life of the bond, as we have mentioned, the debtor pays the creditor periodic interest, known as a coupon. This may be paid annually, half-yearly or at other intervals, and may be a fixed or variable amount, depending on the bond’s terms.The coupon is the component set at the time of issue and represents the ‘cost’ of the loan to the debtor and the nominal return to the creditor. However, it is essential not to confuse the coupon with the actual return on the investment.</p>
        </div>

        {/* Academy image: bond flow diagram */}
        <section className="ac-summary" data-testid="bonds-flow">
          <div className="ac-summary-brand">
            <span className="ac-summary-check"><svg viewBox="0 0 24 24" width="16" height="16"><path d="M5 13l4 4L19 7" stroke="#fff" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
            <span>academy</span>
          </div>

          <div className="ac-flow">
            <div className="ac-flow-person">
              <svg viewBox="0 0 100 112" width="92" height="102">
                <circle cx="50" cy="52" r="44" fill="#fff" stroke="#0d0d12" strokeWidth="2"/>
                <circle cx="50" cy="46" r="14" fill="#fff" stroke="#0d0d12" strokeWidth="1.6"/>
                <path d="M36 46 C36 32 64 32 64 46 C64 39 59 34 50 34 C41 34 36 39 36 46 Z" fill="#0d0d12"/>
                <path d="M40 44 q2 -2 4 0 M48 44 q2 -2 4 0" stroke="#0d0d12" strokeWidth="2" fill="none" strokeLinecap="round"/>
                <path d="M50 56 l-3 5 h6 z" fill="#0d0d12"/>
                <path d="M30 84 C33 68 67 68 70 84 L70 92 L30 92 Z" fill="#efe9ff" stroke="#0d0d12" strokeWidth="1.6"/>
                <rect x="47" y="74" width="5" height="17" rx="2.5" fill="#0d0d12"/>
              </svg>
            </div>

            <div className="ac-flow-steps">
              <div className="ac-flow-row">
                <svg className="ac-flow-arrow right" viewBox="0 0 24 24" width="18" height="18"><path d="M3 12h15M13 6l7 6-7 6" stroke="#0d0d12" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
                <span className="ac-flow-chip">Presta 10.000 €</span>
                <svg className="ac-flow-arrow right" viewBox="0 0 24 24" width="18" height="18"><path d="M3 12h15M13 6l7 6-7 6" stroke="#0d0d12" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
              <div className="ac-flow-row">
                <svg className="ac-flow-arrow left" viewBox="0 0 24 24" width="18" height="18"><path d="M21 12H6M11 6l-7 6 7 6" stroke="#0d0d12" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
                <span className="ac-flow-chip">Cedola annua 5%</span>
                <svg className="ac-flow-arrow left" viewBox="0 0 24 24" width="18" height="18"><path d="M21 12H6M11 6l-7 6 7 6" stroke="#0d0d12" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
              <div className="ac-flow-row">
                <svg className="ac-flow-arrow left" viewBox="0 0 24 24" width="18" height="18"><path d="M21 12H6M11 6l-7 6 7 6" stroke="#0d0d12" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
                <span className="ac-flow-chip">Ricevi 10.000 €</span>
                <svg className="ac-flow-arrow left" viewBox="0 0 24 24" width="18" height="18"><path d="M21 12H6M11 6l-7 6 7 6" stroke="#0d0d12" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
                <span className="ac-flow-note">alla scadenza</span>
              </div>
            </div>

            <div className="ac-flow-issuer">Emittente</div>
          </div>
        </section>

        {/* Article body — continued */}
        <div className="ac-body" style={{ marginTop: "3rem" }}>
          <p>Whilst the coupon (often fixed) remains unchanged, the investor’s return can change drastically if the bond is purchased in the secondary market. After issuance, in fact, the securities are freely traded between investors, and their prices fluctuate with interest rate trends and the issuer’s creditworthiness.</p>
          <p>To better understand this mechanism, let’s look at a practical example.</p>
          <p>Imagine a bond issued at a value of €100 with a fixed coupon of 5% (meaning it pays €5 per year). If, for various market reasons, the price of this bond falls to €90 and you decide to buy it, your actual return increases significantly for two reasons:</p>
          <ul>
            <li>You will still receive the fixed €5 coupon (which, on an investment of just €90, represents a rate higher than the original 5%);</li>
            <li>At maturity, you will be repaid the nominal €100, guaranteeing you a further profit of €10 (the difference between what you paid and what you are repaid).</li>
          </ul>
          <p>It is precisely for this reason that, in the bond market, price and yield always move in opposite directions: when the price of a bond falls, its effective yield for the buyer rises, and vice versa.</p>

          <h2 id="bonds-characteristics">Key characteristics of bonds</h2>
          <p>Bonds can have very different characteristics, which influence their expected return, risk and suitability for different investor profiles. Let’s look at the main ones:</p>

          <h3 id="bonds-bankruptcy">Repayment in the event of bankruptcy</h3>
          <p>A key consideration is how bonds are treated in the event of the issuer’s bankruptcy. In bankruptcy situations, bonds offer greater protection than other financial instruments, such as shares. Bondholders, in fact, have priority in repayments: this means that, in the event of the company’s liquidation, they will be repaid — at least partially — before shareholders, drawing on the remaining available resources.</p>
        </div>

        {/* Academy image: repayment priority pyramid */}
        <section className="ac-summary" data-testid="bonds-pyramid">
          <div className="ac-summary-brand">
            <span className="ac-summary-check"><svg viewBox="0 0 24 24" width="16" height="16"><path d="M5 13l4 4L19 7" stroke="#fff" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
            <span>academy</span>
          </div>

          <div className="ac-pyramid">
            <div className="ac-pyramid-side left">
              <span className="ac-chip">Low Risk</span>
              <svg viewBox="0 0 20 80" width="16" height="64"><line x1="10" y1="4" x2="10" y2="56" stroke="#0d0d12" strokeWidth="1.8"/><path d="M4 50 L10 60 L16 50 Z" fill="#0d0d12"/></svg>
              <span className="ac-chip">High Risk</span>
            </div>

            <div className="ac-pyramid-chart">
              <div className="ac-pyramid-row r1"><span>Senior Debt</span></div>
              <div className="ac-pyramid-row r2"><span>Subordinated Debt</span></div>
              <div className="ac-pyramid-row r3"><span>Preferred Equity</span></div>
              <div className="ac-pyramid-row r4"><span>Common Equity</span></div>
            </div>

            <div className="ac-pyramid-side right">
              <span className="ac-chip">High Priority<br />of Payment</span>
              <svg viewBox="0 0 20 80" width="16" height="64"><line x1="10" y1="60" x2="10" y2="8" stroke="#0d0d12" strokeWidth="1.8"/><path d="M4 14 L10 4 L16 14 Z" fill="#0d0d12"/></svg>
              <span className="ac-chip">Low Priority<br />of Payment</span>
            </div>
          </div>
        </section>

        {/* Article body — continued */}
        <div className="ac-body" style={{ marginTop: "3rem" }}>
          <p>Whilst the coupon (often fixed) remains unchanged, the investor’s return can change drastically if the bond is purchased in the secondary market. After issuance, in fact, the securities are freely traded between investors, and their prices fluctuate with interest rate trends and the issuer’s creditworthiness.</p>
          <p>To better understand this mechanism, let’s look at a practical example.</p>
          <p>Imagine a bond issued at a value of €100 with a fixed coupon of 5% (meaning it pays €5 per year). If, for various market reasons, the price of this bond falls to €90 and you decide to buy it, your actual return increases significantly for two reasons:</p>
          <ul>
            <li>You will still receive the fixed €5 coupon (which, on an investment of just €90, represents a rate higher than the original 5%);</li>
            <li>At maturity, you will be repaid the nominal €100, guaranteeing you a further profit of €10 (the difference between what you paid and what you are repaid).</li>
          </ul>
          <p>It is precisely for this reason that, in the bond market, price and yield always move in opposite directions: when the price of a bond falls, its effective yield for the buyer rises, and vice versa.</p>

          <h2 id="bonds-characteristics">Key characteristics of bonds</h2>
          <p>Bonds can have very different characteristics, which influence their expected return, risk and suitability for different investor profiles. Let’s look at the main ones:</p>

          <h3 id="bonds-bankruptcy">Repayment in the event of bankruptcy</h3>
          <p>A key consideration is how bonds are treated in the event of the issuer’s bankruptcy. In bankruptcy situations, bonds offer greater protection than other financial instruments, such as shares. Bondholders, in fact, have priority in repayments: this means that, in the event of the company’s liquidation, they will be repaid — at least partially — before shareholders, drawing on the remaining available resources.</p>
        </div>

        {/* Article body — fixed/variable rate and maturity */}
        <div className="ac-body" style={{ marginTop: "3rem" }}>
          <h3 id="bonds-rate">Fixed rate and variable rate</h3>
          <p>Another key distinction between the different types of bonds concerns the structure of the interest rate applied:</p>
          <ul>
            <li><b>Fixed-rate bonds:</b> these provide for the payment of a fixed coupon for the entire duration of the security. They offer investors stable and easily predictable cash flows, making them particularly suitable in low-volatility market environments or during periods of falling interest rates.</li>
            <li><b>Floating-rate bonds:</b> these have a coupon indexed to a benchmark (such as the Euribor or the ECB’s official rate), with periodic updates. This makes them more responsive to changes in the macroeconomic environment, with the advantage of protecting the investor in scenarios of rising interest rates, but with less predictability regarding returns.</li>
          </ul>

          <h3 id="bonds-maturity">Maturity: short, medium and long term</h3>
          <p>A further criterion for classifying bonds relates to the remaining maturity of the investment, i.e. the time between the purchase of the security and its maturity:</p>
          <ul>
            <li><b>Short term:</b> up to 2 years.</li>
            <li><b>Medium term:</b> between 2 and 5 years.</li>
            <li><b>Long term:</b> over 5 years.</li>
          </ul>
        </div>

        {/* Academy image: maturity cards */}
        <section className="ac-summary" data-testid="bonds-maturity-cards">
          <div className="ac-summary-brand">
            <span className="ac-summary-check"><svg viewBox="0 0 24 24" width="16" height="16"><path d="M5 13l4 4L19 7" stroke="#fff" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
            <span>academy</span>
          </div>

          <div className="ac-maturity">
            <div className="ac-mat-card">
              <div className="ac-mat-dots"><i className="on"/><i/><i/></div>
              <p className="ac-mat-title">Short-term</p>
              <p className="ac-mat-body">The short-term usually refers to a period of less than two years</p>
            </div>
            <div className="ac-mat-card">
              <div className="ac-mat-dots"><i className="on"/><i className="on"/><i/></div>
              <p className="ac-mat-title">Medium-term</p>
              <p className="ac-mat-body">The medium term is a period that typically lasts between approximately 2 and 5 years</p>
            </div>
            <div className="ac-mat-card">
              <div className="ac-mat-dots"><i className="on"/><i className="on"/><i className="on"/></div>
              <p className="ac-mat-title">Long-term</p>
              <p className="ac-mat-body">The long term extends well beyond five years; for some, at least ten.</p>
            </div>
          </div>
        </section>

        <p className="ac-body" style={{ marginTop: "2.4rem", maxWidth: 560 }}>
          Maturity directly affects the security’s risk/return profile. Generally, bonds with longer maturities tend to offer higher yields to compensate for the increased risk, particularly that associated with changes in interest rates over time.
        </p>

        {/* Academy image: yield curve */}
        <section className="ac-summary" data-testid="bonds-yield-curve">
          <div className="ac-summary-brand">
            <span className="ac-summary-check"><svg viewBox="0 0 24 24" width="16" height="16"><path d="M5 13l4 4L19 7" stroke="#fff" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
            <span>academy</span>
          </div>
          <div className="ac-curve">
            <span className="ac-curve-label">Yield</span>
            <svg viewBox="0 0 560 320" preserveAspectRatio="none" style={{ width: "100%", height: 220 }}>
              <line x1="40" y1="290" x2="540" y2="290" stroke="#0d0d12" strokeWidth="1.6"/>
              <path d="M532 286 L544 290 L532 294 Z" fill="#0d0d12"/>
              <line x1="40" y1="290" x2="40" y2="20" stroke="#0d0d12" strokeWidth="1.6"/>
              <path d="M36 28 L40 16 L44 28 Z" fill="#0d0d12"/>
              <path d="M40 290 C120 250 180 150 240 100 C320 50 420 30 540 24" fill="none" stroke="#0d0d12" strokeWidth="2.4"/>
            </svg>
          </div>
        </section>

        {/* Article body — continued */}
        <div className="ac-body" style={{ marginTop: "3rem" }}>
          <h3 id="bonds-rating">Credit rating</h3>
          <p>A credit rating is an assessment assigned by independent, specialised agencies, such as Moody’s, Standard & Poor’s, and Fitch, that measures an issuer’s financial strength and its ability to repay debt on time.</p>
          <p>A high rating indicates a low risk of default and, therefore, a safer bond, but one generally associated with a lower yield. Conversely, bonds with lower ratings — known as high-yield or junk bonds — offer higher yields to compensate for the greater perceived risk to investors.</p>
          <p>This classification is probably the most important analytical tool for assessing the issuer’s reliability and, consequently, the investment’s risk. Although bonds do enjoy a ‘priority’ of repayment in the event of the issuer’s bankruptcy (as we have seen), this risk is never zero.</p>
          <p>In this sense, investors use credit ratings precisely to define their risk management strategies.</p>

          <h2 id="bonds-advantages">Advantages associated with the use of bonds</h2>
          <p>Now that we understand what bonds are and how they work, let’s take a look at the main advantages associated with these financial instruments.</p>

          <h3 id="bonds-stable">Stable returns and low volatility</h3>
          <p>One of the most valued aspects of bonds is the ability to know in advance the cash flows they will generate. Unlike riskier instruments such as shares, bonds offer periodic payments (coupons) whose amounts and due dates are generally set at the time of issue.</p>
          <p>Although their prices may fluctuate over time on the secondary market — influenced by factors such as interest rates and the issuer’s creditworthiness — they have historically exhibited lower volatility than equities.</p>
          <p>This is due to the scheduled nature of the returns and, above all, to the priority of repayment (seniority), which guarantees them a privileged position within the company’s capital structure in the event of default.</p>

          <h3 id="bonds-diversification">Portfolio risk diversification</h3>
          <p>Bonds are an ideal instrument for diversifying risk within a financial portfolio. Their nature as relatively stable assets, particularly during periods of market turbulence, makes them attractive to investors.</p>
          <p>In such contexts, the growing demand for bonds tends to drive up their price, helping to offset losses from other, more volatile instruments, such as shares.</p>
        </div>

        {/* Academy image: Advantages of bonds */}
        <section className="ac-summary" data-testid="bonds-advantages-img">
          <div className="ac-summary-brand">
            <span className="ac-summary-check"><svg viewBox="0 0 24 24" width="16" height="16"><path d="M5 13l4 4L19 7" stroke="#fff" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
            <span>academy</span>
          </div>
          <h2 className="ac-adv-title">Advantages of bonds</h2>
          <div className="ac-adv-list">
            <div className="ac-adv-item">
              <span className="ac-adv-ic"><svg viewBox="0 0 40 40" width="38" height="38"><circle cx="20" cy="20" r="17" fill="none" stroke="#0d0d12" strokeWidth="1.6"/><path d="M12 22 l4 -6 l4 5 l6 -9" stroke="#0d0d12" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
              <p>Consistency of returns</p>
            </div>
            <div className="ac-adv-item">
              <span className="ac-adv-ic"><svg viewBox="0 0 40 40" width="38" height="38"><circle cx="20" cy="20" r="17" fill="none" stroke="#0d0d12" strokeWidth="1.6"/><path d="M9 20 C12 14 28 14 31 20 C28 26 12 26 9 20 Z" fill="none" stroke="#0d0d12" strokeWidth="1.6"/><circle cx="20" cy="20" r="3.6" fill="none" stroke="#0d0d12" strokeWidth="1.6"/><circle cx="20" cy="20" r="1.2" fill="#0d0d12"/></svg></span>
              <p>Low volatility</p>
            </div>
            <div className="ac-adv-item">
              <span className="ac-adv-ic"><svg viewBox="0 0 40 40" width="38" height="38"><circle cx="20" cy="20" r="17" fill="none" stroke="#0d0d12" strokeWidth="1.6"/><circle cx="20" cy="20" r="6" fill="none" stroke="#0d0d12" strokeWidth="1.6"/><circle cx="20" cy="20" r="2" fill="#0d0d12"/><path d="M20 8v3 M20 29v3 M8 20h3 M29 20h3 M11.5 11.5l2 2 M26.5 26.5l2 2 M28.5 11.5l-2 2 M13.5 26.5l-2 2" stroke="#0d0d12" strokeWidth="1.6"/></svg></span>
              <p>Portfolio risk diversification</p>
            </div>
          </div>
        </section>

        {/* Article body — risks */}
        <div className="ac-body" style={{ marginTop: "3rem" }}>
          <h2 id="bonds-risks">Risks associated with investing in bonds</h2>
          <p>In addition to their many advantages, bonds — like any other investment — carry risks that are important to consider before investing.</p>

          <h3 id="bonds-credit-risk">Credit risk (issuer default)</h3>
          <p>One of the main risks associated with bonds is credit risk, i.e. the possibility that the issuer — be it a company or a government — will be unable to honour coupon payments or repay the principal at maturity. In the event of default, the bondholder could suffer a partial or total loss of their investment, unless a third party guarantees the bond.</p>
          <p>It should be noted, however, that, as mentioned earlier, in the event of the issuer’s bankruptcy, bondholders have priority over shareholders in the distribution of any remaining assets. This can partially limit the losses incurred by the investor.</p>

          <h3 id="bonds-rate-risk">Interest rate risk</h3>
          <p>Interest rate risk relates to the possibility that the market price of a bond may change over time due to fluctuations in the interest rates set by central banks.</p>
          <p>To understand this better, let’s take a simple example: imagine you have a bond that pays 2% interest. If, at a later date, the central bank raises rates and new bonds offering 4% start to be issued, your bond — which pays only 2% — becomes less attractive to other investors. Consequently, its market price falls.</p>
        </div>

        {/* Interest rate sensitivity diagram */}
        <section className="ac-summary" data-testid="bonds-rate-sensitivity">
          <h3 className="ac-adv-title" style={{ textAlign: "center" }}>Interest rate sensitivity</h3>
          <div className="ac-rate">
            <div className="ac-rate-row">
              <span className="ac-rate-chip">Interest rates</span>
              <span className="ac-rate-arrow up"><svg viewBox="0 0 24 24" width="14" height="14"><path d="M12 5v12M6 11l6-6 6 6" stroke="#fff" strokeWidth="2.4" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
              <span className="ac-rate-chip">Bond price</span>
              <span className="ac-rate-arrow down"><svg viewBox="0 0 24 24" width="14" height="14"><path d="M12 19V7M6 13l6 6 6-6" stroke="#fff" strokeWidth="2.4" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
            </div>
            <div className="ac-rate-row">
              <span className="ac-rate-chip">Interest rates</span>
              <span className="ac-rate-arrow down"><svg viewBox="0 0 24 24" width="14" height="14"><path d="M12 19V7M6 13l6 6 6-6" stroke="#fff" strokeWidth="2.4" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
              <span className="ac-rate-chip">Bond price</span>
              <span className="ac-rate-arrow up"><svg viewBox="0 0 24 24" width="14" height="14"><path d="M12 5v12M6 11l6-6 6 6" stroke="#fff" strokeWidth="2.4" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
            </div>
          </div>
        </section>

        {/* Article body — continued */}
        <div className="ac-body" style={{ marginTop: "3rem" }}>
          <p><b>Although this risk can be mitigated by holding the bond to maturity</b> (thus collecting the agreed face value), it remains a crucial factor for investors to consider.</p>
          <p>If the investor needs to liquidate the investment before maturity, they may be forced to sell at a price lower than the purchase price, thereby incurring a loss.</p>

          <h3 id="bonds-inflation-risk">Inflation risk</h3>
          <p>This risk mainly concerns <b>long-term</b> bonds or those issued in <b>foreign currencies that are less stable</b> than the world’s major currencies.</p>
          <p>Inflation risk arises when, despite the bond’s nominal yield being positive, the general rise in prices erodes, or even cancels out, the real return on the investment. If, for example, we take a bond offering a yield of <b>3%</b> and inflation of <b>4%</b>, the real yield will be negative (<b>-1%</b>), resulting in a loss of purchasing power for the investor.</p>
        </div>

        {/* Academy image: Risks associated with bonds */}
        <section className="ac-summary" data-testid="bonds-risks-img">
          <div className="ac-summary-brand">
            <span className="ac-summary-check"><svg viewBox="0 0 24 24" width="16" height="16"><path d="M5 13l4 4L19 7" stroke="#fff" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
            <span>academy</span>
          </div>
          <h2 className="ac-adv-title">Risks associated with bonds</h2>
          <div className="ac-adv-list">
            <div className="ac-adv-item">
              <span className="ac-adv-ic"><svg viewBox="0 0 40 40" width="38" height="38"><circle cx="20" cy="20" r="17" fill="none" stroke="#0d0d12" strokeWidth="1.6"/><rect x="12" y="14" width="16" height="12" rx="2" fill="#0d0d12"/><text x="20" y="23.4" fontSize="9" fontWeight="800" textAnchor="middle" fill="#fff">€</text><path d="M26 16 l3 -3 M28 19 l3 -3" stroke="#0d0d12" strokeWidth="1.6"/></svg></span>
              <p>Credit risk (issuer default)</p>
            </div>
            <div className="ac-adv-item">
              <span className="ac-adv-ic"><svg viewBox="0 0 40 40" width="38" height="38"><circle cx="20" cy="20" r="17" fill="none" stroke="#0d0d12" strokeWidth="1.6"/><rect x="12" y="16" width="4" height="10" fill="#0d0d12"/><rect x="18" y="12" width="4" height="14" fill="#0d0d12"/><rect x="24" y="18" width="4" height="8" fill="#0d0d12"/></svg></span>
              <p>Interest rate risk</p>
            </div>
            <div className="ac-adv-item">
              <span className="ac-adv-ic"><svg viewBox="0 0 40 40" width="38" height="38"><circle cx="20" cy="20" r="17" fill="none" stroke="#0d0d12" strokeWidth="1.6"/><rect x="11" y="14" width="8" height="12" rx="1.6" fill="#0d0d12"/><text x="15" y="22" fontSize="7" fontWeight="800" textAnchor="middle" fill="#fff">$</text><rect x="21" y="14" width="8" height="12" rx="1.6" fill="#0d0d12"/><text x="25" y="22" fontSize="7" fontWeight="800" textAnchor="middle" fill="#fff">€</text></svg></span>
              <p>Risk of inflation</p>
            </div>
          </div>
        </section>

        {/* Article body — tokenisation */}
        <div className="ac-body" style={{ marginTop: "3rem" }}>
          <h2 id="bonds-tokenisation">Tokenisation of bonds</h2>
          <p>As explored in the article <em>“Real World Assets (RWA): what they are and how tokenised securities work”</em>, the tokenisation of traditional financial assets represents one of the hottest and most promising trends within the DeFi ecosystem.</p>
          <p><b>Bonds are at the forefront of this evolution, establishing themselves as the most “tokenised” asset class</b> in decentralised finance. In particular, <b>US Treasuries</b> play a central role in this transformation, thanks to their liquidity, reliability and standardisation.</p>
          <p>According to the latest data, the total value of tokenised US Treasuries has exceeded <b>$10 billion</b>, confirming the growing interest from institutional investors and on-chain developers in real financial instruments that are accessible in digital form.</p>
        </div>

        {/* Academy image: RWA chart */}
        <section className="ac-summary" data-testid="bonds-rwa-chart">
          <div className="ac-summary-brand">
            <span className="ac-summary-check"><svg viewBox="0 0 24 24" width="16" height="16"><path d="M5 13l4 4L19 7" stroke="#fff" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
            <span>academy</span>
          </div>
          <div className="ac-rwa">
            <div className="ac-rwa-head">
              <p className="ac-rwa-title">Treasury Product Metrics</p>
              <div className="ac-rwa-tabs">
                <span className="ac-rwa-tab on">Treasury Market Caps</span>
                <span className="ac-rwa-tab">Mint / Burn Volumes</span>
                <span className="ac-rwa-tab">Holders</span>
                <span className="ac-rwa-tab">7D APY</span>
              </div>
            </div>
            <svg viewBox="0 0 560 240" preserveAspectRatio="none" style={{ width: "100%", height: 220 }}>
              {[0,1,2,3,4,5].map((i) => (
                <line key={i} x1="40" y1={30 + i * 38} x2="540" y2={30 + i * 38} stroke="#ececf0" strokeWidth="1"/>
              ))}
              <text x="34" y="34" fontSize="9" fill="#9a9aa0" textAnchor="end">$12.5B</text>
              <text x="34" y="72" fontSize="9" fill="#9a9aa0" textAnchor="end">$10.0B</text>
              <text x="34" y="110" fontSize="9" fill="#9a9aa0" textAnchor="end">$7.5B</text>
              <text x="34" y="148" fontSize="9" fill="#9a9aa0" textAnchor="end">$5.0B</text>
              <text x="34" y="186" fontSize="9" fill="#9a9aa0" textAnchor="end">$2.5B</text>
              <text x="34" y="224" fontSize="9" fill="#9a9aa0" textAnchor="end">$0.0B</text>
              {/* stacked areas */}
              <path d="M40 220 L120 210 L200 190 L280 150 L360 120 L440 90 L540 60 L540 220 Z" fill="#ffd9b3"/>
              <path d="M40 220 L120 212 L200 196 L280 170 L360 150 L440 130 L540 110 L540 220 Z" fill="#9fd8c9"/>
              <path d="M40 220 L120 214 L200 200 L280 184 L360 170 L440 158 L540 148 L540 220 Z" fill="#aee3ff"/>
              <path d="M40 220 L120 216 L200 208 L280 198 L360 190 L440 182 L540 176 L540 220 Z" fill="#c9a7ff"/>
              <path d="M40 220 L120 218 L200 214 L280 210 L360 206 L440 202 L540 200 L540 220 Z" fill="#8b5cf6" opacity=".35"/>
              <g fontSize="8.5" fill="#57575c">
                <text x="40" y="234">1/1/23</text><text x="120" y="234">5/1/23</text><text x="200" y="234">9/1/23</text>
                <text x="280" y="234">1/1/24</text><text x="360" y="234">5/1/24</text><text x="440" y="234">9/1/24</text><text x="520" y="234" textAnchor="end">1/1/25</text>
              </g>
              <text x="200" y="80" fontSize="12" fontWeight="700" fill="#b3a1e8">rwa.xyz</text>
            </svg>
            <div className="ac-rwa-legend">
              <span><i style={{background:"#ffd9b3"}}/>BlackRock US...</span>
              <span><i style={{background:"#9fd8c9"}}/>Circle USYC</span>
              <span><i style={{background:"#aee3ff"}}/>Ondo U.S. Doll...</span>
              <span><i style={{background:"#c9a7ff"}}/>Franklin OnCh...</span>
              <span><i style={{background:"#8b5cf6"}}/>Superstate Sh...</span>
            </div>
          </div>
        </section>

        {/* Article body — continued */}
        <div className="ac-body" style={{ marginTop: "3rem" }}>
          <p>Bonds are therefore set to usher in a new chapter in their history, evolving from distribution exclusively through traditional channels to an on-chain infrastructure, making the debt market more efficient, liquid and global, thanks to native blockchain advantages such as instant settlement (T+0) and 24/7 operation.</p>

          <h2 id="bonds-conclusions">Conclusions</h2>
          <p>In an uncertain macroeconomic environment such as that of recent years, understanding what bonds are and how they work is an essential step towards building a solid, diversified portfolio that is more resilient to market fluctuations.</p>
          <p>Thanks to their advantages and provided risks are properly assessed, bonds offer investors an effective tool for diversifying exposure and reducing the overall volatility of their portfolio.</p>
          <p>Furthermore, with the tokenisation of traditional assets and the entry of bonds into the world of decentralised finance, barriers to accessing this financial instrument are gradually being reduced, opening new opportunities to a much wider audience of investors.</p>
          <p>Ultimately, knowing what bonds are and how they work means not only understanding a financial product, but equipping oneself with a genuine tool for interpreting the economic landscape – one that is useful for protecting capital, making more informed choices and seizing new opportunities, including, today, at the very heart of decentralised on-chain finance.</p>
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
            <article className="ac-card">
              <div className="ac-thumb"><Badge>Beginner</Badge>
                <svg viewBox="0 0 220 150" preserveAspectRatio="xMidYMid slice">
                  <rect width="220" height="150" fill="#0d0d12"/>
                  <rect x="36" y="30" width="64" height="80" rx="8" fill="#fff"/>
                  <rect x="46" y="44" width="30" height="8" rx="4" fill="#3a86ff"/>
                  <rect x="46" y="58" width="44" height="6" rx="3" fill="#d9f0ff"/>
                  <rect x="46" y="70" width="44" height="6" rx="3" fill="#d9f0ff"/>
                  <text x="68" y="102" fontSize="13" fontWeight="800" textAnchor="middle" fill="#3a86ff">PUT</text>
                  <rect x="120" y="30" width="64" height="80" rx="8" fill="#fff"/>
                  <rect x="130" y="44" width="34" height="8" rx="4" fill="#8b5cf6"/>
                  <rect x="130" y="58" width="44" height="6" rx="3" fill="#eee6ff"/>
                  <rect x="130" y="70" width="44" height="6" rx="3" fill="#eee6ff"/>
                  <text x="152" y="102" fontSize="13" fontWeight="800" textAnchor="middle" fill="#8b5cf6">CALL</text>
                  <circle cx="60" cy="122" r="9" fill="#3a86ff"/><circle cx="168" cy="122" r="9" fill="#8b5cf6"/>
                </svg>
              </div>
              <div className="ac-tags"><span className="ac-tag">Stocks</span></div>
              <h3>Options: what are they and how do they work?</h3>
              <p className="ac-desc">Options in finance are contracts giving the right, but not the obligation, to buy or sell an asset at a set price by a certain date, with a paid premium.</p>
              <p className="ac-meta">September 10, 2024&nbsp;&nbsp;•&nbsp;&nbsp;5 min</p>
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
