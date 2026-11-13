import SiteLayout from "@/components/site/SiteLayout";
import Seo from "@/components/Seo";
import { t as _t } from "@/i18n";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

/* handshake puzzle hero artwork */
const ArtStakeholders = (
  <svg viewBox="0 0 340 210" preserveAspectRatio="xMidYMid slice">
    <rect width="340" height="210" fill="#0d0d12"/>
    <circle cx="170" cy="105" r="72" fill="#8b5cf6"/>
    <circle cx="170" cy="105" r="72" fill="none" stroke="#0d0d12" strokeWidth="3"/>
    {/* puzzle pieces */}
    <g fill="#efe9ff" stroke="#0d0d12" strokeWidth="2">
      <path d="M56 46 h22 v12 a7 7 0 0 0 10 0 v-12 h22 v22 h-12 a7 7 0 0 0 0 10 h12 v22 h-22 v-12 a7 7 0 0 0 -10 0 v12 h-22 z" transform="rotate(-12 83 72)"/>
      <path d="M96 132 h22 v12 a7 7 0 0 0 10 0 v-12 h22 v22 h-12 a7 7 0 0 0 0 10 h12 v22 h-22 v-12 a7 7 0 0 0 -10 0 v12 h-22 z" transform="rotate(8 123 164)"/>
      <path d="M222 48 h22 v12 a7 7 0 0 0 10 0 v-12 h22 v22 h-12 a7 7 0 0 0 0 10 h12 v22 h-22 v-12 a7 7 0 0 0 -10 0 v12 h-22 z" transform="rotate(10 255 74)"/>
    </g>
    {/* handshake */}
    <g stroke="#0d0d12" strokeWidth="2.4" fill="#fff">
      <path d="M118 108 L150 96 L168 110 L152 122 Z"/>
      <path d="M152 122 L168 110 L186 122 L176 134 L160 130 Z" fill="#efe9ff"/>
      <path d="M160 130 L176 134 L190 126 L198 116 L182 104 L168 110 Z"/>
    </g>
    <path d="M138 116 L166 132 L186 122" stroke="#0d0d12" strokeWidth="2.4" fill="none" strokeLinecap="round"/>
    {/* floating puzzle */}
    <g fill="#efe9ff" stroke="#0d0d12" strokeWidth="2">
      <path d="M282 132 h16 v9 a5 5 0 0 0 7 0 v-9 h16 v16 h-9 a5 5 0 0 0 0 7 h9 v16 h-16 v-9 a5 5 0 0 0 -7 0 v9 h-16 z"/>
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

export default function AcademyStakeholders() {
  return (
    <SiteLayout>
      <Seo title="Stakeholders: who they are and how to identify them — Blockscaner Academy" description="What is a stakeholder? Discover the meaning of stakeholders, their types, practical examples, and the process of stakeholder mapping." />
      <div className="ac-article" data-testid="academy-article-stakeholders">

        {/* breadcrumb */}
        <p className="ac-crumb">
          <Link to="/products/academy">Home</Link>
          <span>›</span>
          <a href="#" onClick={(e) => e.preventDefault()}>Easy Economics</a>
          <span>›</span>
          <b>Stakeholders: who they are and how to identify them</b>
        </p>

        {/* header row */}
        <div className="ac-article-top">
          <Link to="/products/academy" className="ac-back" aria-label="Back to Academy"><ArrowLeft size={18} /></Link>
          <Tag>Stocks</Tag>
        </div>

        <div className="ac-article-head">
          <h1>{_t("Stakeholders: who they")}<br />{_t("are and how to identify")}<br />{_t("them")}</h1>
          <div className="ac-share">
            <span className="ac-share-ic" aria-label="Share on X"><ShareIcon d="M18.9 2H22l-6.8 7.8L23 22h-6.3l-4.9-6.4L6.2 22H3l7.3-8.3L1.5 2h6.4l4.4 5.9L18.9 2zm-1.1 18h1.7L7.1 3.9H5.3L17.8 20z"/></span>
            <span className="ac-share-ic" aria-label="Share on Facebook"><ShareIcon d="M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.4h-1.2c-1.2 0-1.6.8-1.6 1.6V12h2.7l-.4 2.9h-2.3v7A10 10 0 0 0 22 12z"/></span>
            <span className="ac-share-ic" aria-label="Share on LinkedIn"><ShareIcon d="M20.4 20.4h-3.5v-5.6c0-1.3 0-3-1.9-3s-2.1 1.4-2.1 2.9v5.7H9.4V9h3.4v1.6h.1c.5-.9 1.7-1.9 3.4-1.9 3.6 0 4.3 2.4 4.3 5.5v6.2zM5.3 7.4a2 2 0 1 1 0-4.1 2 2 0 0 1 0 4.1zM7.1 20.4H3.6V9h3.5v11.4z"/></span>
          </div>
        </div>
        <p className="ac-meta">June 25, 2024&nbsp;&nbsp;•&nbsp;&nbsp;5 min</p>

        {/* hero image */}
        <div className="ac-article-thumb">
          <Badge>Beginner</Badge>
          {ArtStakeholders}
        </div>

        {/* You will learn */}
        <div className="ac-learn">
          <h2>{_t("You will learn")}</h2>
          <ul>
            <li><a href="#stakeholders-intro">{_t("Introduction: who are the stakeholders?")}</a></li>
            <li><a href="#stakeholders-examples">{_t("Practical examples of stakeholders")}</a></li>
            <li><a href="#stakeholders-difference">{_t("Difference between stakeholders and shareholders")}</a></li>
            <li><a href="#stakeholders-important">{_t("Why are stakeholders important?")}</a></li>
          </ul>
        </div>

        {/* Article body */}
        <div className="ac-body">
          <h2 id="stakeholders-intro">Introduction: who are the stakeholders?</h2>
          <p>The term stakeholder refers to any individual, group, or organisation impacted by or interested in a business’s operations. In the UK, stakeholders are often called “interest holders” as they are parties who may benefit from or be affected by a company’s decisions. So, what are stakeholders in business, and what roles do they play? This guide will cover the stakeholder definition, types, and examples to clarify their importance in business.</p>

          <h3 id="stakeholders-definition">What is a stakeholder? Definition and meaning</h3>
          <p>A stakeholder is any individual or group that holds a vested interest in a business’s actions and outcomes. Stakeholders range from employees, customers, and suppliers to investors, local communities, and regulatory bodies. These stakeholders each have specific interests and needs that influence how they relate to the business.</p>
          <p>Key examples of stakeholders include:</p>
          <ul>
            <li><b>Internal stakeholders</b> such as employees, management, and investors</li>
            <li><b>External stakeholders</b> like customers, suppliers, government entities, and local communities</li>
          </ul>

          <h3 id="stakeholders-types">Types of stakeholders: internal vs. external</h3>
          <p>To better understand the meaning of stakeholders, it’s useful to differentiate between internal and external stakeholders. Internal stakeholders, such as employees, shareholders, and board members, are directly involved with the business. External stakeholders, on the other hand, don’t work directly for the organisation but still affect its operations or are affected by its actions, such as suppliers, creditors, and the community.</p>
          <ul>
            <li><b>Internal stakeholders</b> – directly linked to the company’s day-to-day operations. For instance, employees rely on the company’s success for their income and career advancement.</li>
            <li><b>External stakeholders</b> – have an indirect relationship with the company. For example, local communities may have environmental or social concerns related to the company’s operations.</li>
          </ul>

          <h2 id="stakeholders-examples">Practical examples of stakeholders</h2>
          <p>To understand stakeholders better, let’s consider a practical example. Imagine you’ve launched a new startup and a business angel invests in it. By contributing funds, the business angel becomes an internal stakeholder directly affected by the company’s success or failure.</p>
          <p>In contrast, a nearby resident affected by the company’s noise or emissions represents an external stakeholder. Additionally, a regulatory agency overseeing your business licensing is an external stakeholder, influencing operations through compliance requirements.</p>

          <h3 id="stakeholders-mapping">Stakeholder mapping: how to identify and manage stakeholders</h3>
          <p>Stakeholder mapping is a crucial part of managing a successful business, as it enables companies to visualise and strategise their relationships with various stakeholders. This process involves identifying stakeholders, assessing their level of interest and influence, and creating a stakeholder map.</p>
          <p>Steps in stakeholder mapping include:</p>
          <ul>
            <li><b>Identify stakeholders</b> – List all parties who may impact or be impacted by your business.</li>
            <li><b>Categories stakeholders</b> – Group them as internal or external, according to their influence level.</li>
            <li><b>Map stakeholders</b> – Visually represent these relationships using a stakeholder map or diagram.</li>
            <li><b>Develop engagement strategies</b> – Tailor communication and strategy for each stakeholder group to address their needs and expectations.</li>
          </ul>

          <h3 id="stakeholders-analysis">Stakeholder analysis: understanding interests and influence</h3>
          <p>Once stakeholders are mapped, stakeholder analysis evaluates each group’s power, interest, and potential impact on the business. This process helps organisations prioritise and allocate resources effectively, building strong stakeholder relationships that support business goals. A well-structured stakeholder analysis ensures transparent communication, minimises risks and reinforces trust.</p>

          <h3 id="stakeholders-management">Stakeholder management: building solid relationships</h3>
          <p>Effective stakeholder management requires a proactive approach to understand and address the interests of different stakeholder groups. By managing stakeholders actively, businesses can maintain positive relationships, reduce conflict, and enhance their reputation.</p>
          <p>Core strategies in stakeholder management:</p>
          <ul>
            <li><b>Regular communication</b> – Ensures stakeholders stay informed and engaged with the company’s goals.</li>
            <li><b>Feedback collection</b> – Allows businesses to address concerns and incorporate stakeholders’ suggestions.</li>
            <li><b>Transparent decision-making</b> – Builds trust and supports long-term relationships.</li>
          </ul>

          <h2 id="stakeholders-difference">Difference between stakeholders and shareholders</h2>
          <p>Though often used interchangeably, stakeholders and shareholders are distinct. A shareholder (or stockholder) owns shares in a company and is primarily interested in the financial returns on their investment. Conversely, stakeholders encompass a broader range of interests, from environmental impact to corporate responsibility.</p>
          <ul>
            <li><b>Shareholders</b> focus on financial gain and often expect returns through dividends or capital growth.</li>
            <li><b>Stakeholders</b> have broader concerns, including sustainability, social responsibility, and ethical practices.</li>
          </ul>

          <h2 id="stakeholders-important">Why are stakeholders important?</h2>
          <p>Effective stakeholder management is essential for achieving business success. Stakeholders influence decisions, affect corporate reputation, and can drive growth or expose risks. By proactively engaging stakeholders, businesses gain insights into their expectations and create a trusted environment. Stakeholder engagement thus enables companies to align their goals with community and market needs, fostering long-term sustainability.</p>
          <p>Companies that understand and address stakeholder needs can strengthen their competitive advantage and build enduring partnerships in a business landscape that increasingly values transparency and social responsibility.</p>
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
            <article className="ac-card" onClick={() => window.location.assign("/products/academy/options")} style={{ cursor: "pointer" }}>
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
