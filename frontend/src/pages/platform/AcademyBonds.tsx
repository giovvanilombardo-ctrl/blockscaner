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

      </div>
    </SiteLayout>
  );
}
