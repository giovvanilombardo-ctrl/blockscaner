import SiteLayout from "@/components/site/SiteLayout";
import Seo from "@/components/Seo";
import { t as _t } from "@/i18n";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

/* Address poisoning hero artwork — purple warning bottle */
const ArtPoison = (
  <svg viewBox="0 0 340 210" preserveAspectRatio="xMidYMid slice">
    <rect width="340" height="210" fill="#c9a7ff"/>
    {/* purple triangles */}
    <g fill="#8b5cf6" stroke="#0d0d12" strokeWidth="3">
      <path d="M20 20 L60 20 L40 60 Z"/>
      <path d="M300 30 L340 30 L320 70 Z"/>
      <path d="M40 170 L80 170 L60 210 Z"/>
      <path d="M290 160 L330 160 L310 200 Z"/>
    </g>
    {/* bottle */}
    <g transform="rotate(-20 120 110)">
      <rect x="100" y="70" width="26" height="60" rx="8" fill="#fff" stroke="#0d0d12" strokeWidth="3.4"/>
      <rect x="104" y="60" width="18" height="14" rx="4" fill="#fff" stroke="#0d0d12" strokeWidth="3"/>
      <path d="M110 84 q6 8 0 16" stroke="#0d0d12" strokeWidth="2.4" fill="none" strokeLinecap="round"/>
    </g>
    {/* warning triangle */}
    <path d="M190 78 L246 158 L134 158 Z" fill="#fff" stroke="#0d0d12" strokeWidth="4" strokeLinejoin="round"/>
    <path d="M190 98 L222 148 L158 148 Z" fill="#0d0d12"/>
    <rect x="187" y="120" width="6" height="14" rx="3" fill="#fff"/>
    <circle cx="190" cy="140" r="3.4" fill="#fff"/>
    {/* droplets */}
    <g fill="#0d0d12">
      <circle cx="150" cy="92" r="3"/><circle cx="140" cy="108" r="2.6"/>
      <circle cx="246" cy="92" r="2.6"/>
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

export default function AcademyPoison() {
  return (
    <SiteLayout>
      <Seo title="Address poisoning: what it is and how to defend against it — Blockscaner Academy" description="Address poisoning is a sophisticated social engineering scam targeting crypto transactions. Learn how this attack works and how to protect your crypto funds." />
      <div className="ac-article" data-testid="academy-article-poison">

        {/* breadcrumb */}
        <p className="ac-crumb">
          <Link to="/products/academy">Home</Link>
          <span>›</span>
          <a href="#" onClick={(e) => e.preventDefault()}>Sicurezza</a>
          <span>›</span>
          <b>Address poisoning: what it is and how to defend against it</b>
        </p>

        {/* header row */}
        <div className="ac-article-top">
          <Link to="/products/academy" className="ac-back" aria-label="Back to Academy"><ArrowLeft size={18} /></Link>
          <Tag>Crypto Security</Tag>
        </div>

        <div className="ac-article-head">
          <h1>{_t("Address poisoning: what it")}<br />{_t("is and how to defend")}<br />{_t("against it")}</h1>
          <div className="ac-share">
            <span className="ac-share-ic" aria-label="Share on X"><ShareIcon d="M18.9 2H22l-6.8 7.8L23 22h-6.3l-4.9-6.4L6.2 22H3l7.3-8.3L1.5 2h6.4l4.4 5.9L18.9 2zm-1.1 18h1.7L7.1 3.9H5.3L17.8 20z"/></span>
            <span className="ac-share-ic" aria-label="Share on Facebook"><ShareIcon d="M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.4h-1.2c-1.2 0-1.6.8-1.6 1.6V12h2.7l-.4 2.9h-2.3v7A10 10 0 0 0 22 12z"/></span>
            <span className="ac-share-ic" aria-label="Share on LinkedIn"><ShareIcon d="M20.4 20.4h-3.5v-5.6c0-1.3 0-3-1.9-3s-2.1 1.4-2.1 2.9v5.7H9.4V9h3.4v1.6h.1c.5-.9 1.7-1.9 3.4-1.9 3.6 0 4.3 2.4 4.3 5.5v6.2zM5.3 7.4a2 2 0 1 1 0-4.1 2 2 0 0 1 0 4.1zM7.1 20.4H3.6V9h3.5v11.4z"/></span>
          </div>
        </div>
        <p className="ac-meta">October 15, 2025&nbsp;&nbsp;•&nbsp;&nbsp;8 min</p>

        {/* hero image */}
        <div className="ac-article-thumb">
          <Badge>Beginner</Badge>
          {ArtPoison}
        </div>

        {/* You will learn */}
        <div className="ac-learn">
          <h2>{_t("You will learn")}</h2>
          <ul>
            <li><a href="#poison-intro">{_t("Address poisoning: how to defend against it")}</a></li>
            <li><a href="#poison-what">{_t("What is address poisoning, and how does it work")}</a></li>
            <li><a href="#poison-data">{_t("Data and spread: the scope of the threat")}</a></li>
            <li><a href="#poison-attack">{_t("How the address poisoning attack works")}</a></li>
            <li><a href="#poison-defend">{_t("How to defend against address poisoning")}</a></li>
            <li><a href="#poison-conclusions">{_t("Conclusions")}</a></li>
          </ul>
        </div>

        {/* Article body */}
        <div className="ac-body">
          <p>The core philosophy of the Web3 world, practically embodied by the concepts of <b>decentralisation</b> and <b>disintermediation</b>, dictates that the user is solely responsible for the custody and management of their funds. For this very reason, security has always been one of the most critical and sensitive topics.</p>
          <p>In this deep dive, we'll explain what address poisoning is, how its attack mechanism works, and what concrete strategies you can adopt to defend yourself against one of the most subtle and widespread threats to cryptocurrency users.</p>

          <h2 id="poison-what">{_t("What is address poisoning, and how does it work")}</h2>
          <p><b>Address poisoning</b> is a sophisticated social engineering scam that aims to intercept cryptocurrency transactions between two or more users. The goal is to trick the user into sending their funds to an incorrect address, which is, of course, controlled by the attacker.</p>
          <p>To achieve this, the attacker exploits our common habit of copying and pasting addresses from the transaction history and only checking the initial and final characters to verify their authenticity. Due to its ease of execution, the aggressor's complete anonymity, and the difficulty of recognition by users, address poisoning is currently one of the most prevalent attacks within the Web3 ecosystem.</p>

          <h2 id="poison-data">{_t("Data and spread: the scope of the threat")}</h2>
          <p>Address poisoning, despite being a low-cost attack for the aggressor (who only spends the gas fees for the malicious transaction), can have a devastating financial impact on the victim.</p>
          <p>Recent research conducted on major blockchains has revealed the vast scope of these attacks:</p>
          <ul>
            <li><b>Volume of attacks:</b> Over <b>270 million</b> address poisoning attempts were identified over a period of about two years, targeting millions of victim wallets.</li>
            <li><b>Most affected Blockchains:</b> The prevalence of attacks is particularly high on chains with lower transaction fees. This makes the attack cheap to execute on a massive scale, amplifying the phenomenon.</li>
            <li><b>Financial Losses:</b> Confirmed global losses due to this scam exceed <b>$83 million</b>, with some analyses estimating a potential overall damage of up to <b>$144 million</b>, making address poisoning one of the most profitable attacks in the crypto landscape.</li>
            <li><b>Target:</b> Aggressors primarily focus on users with high balances or those who make frequent transactions, thereby increasing the statistical probability of the attack's success.</li>
          </ul>

          {/* Victim profile bar chart */}
          <section className="ac-poison-chart" data-testid="poison-chart">
            <div className="ac-summary-brand">
              <span className="ac-summary-check"><svg viewBox="0 0 24 24" width="16" height="16"><path d="M5 13l4 4L19 7" stroke="#fff" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
              <span>academy</span>
            </div>
            <div className="ac-poison-chart-card">
              <b>Address poisoning victim profile vs Typical personal wallet on Ethereum</b>
              <div className="ac-poison-chart-legend">
                <span className="ac-poison-legend-item"><i className="ac-poison-dot ac-poison-dot-victim" />victim profile</span>
                <span className="ac-poison-legend-item"><i className="ac-poison-dot ac-poison-dot-typical" />Typical ETH profile <i className="ac-poison-legend-note">(excluding zero balance addresses)</i></span>
              </div>
              <div className="ac-poison-bars">
                <div className="ac-poison-bar-group">
                  <div className="ac-poison-bar-col">
                    <div className="ac-poison-bar ac-poison-bar-victim" style={{ height: "220px" }}><span>$338,900</span></div>
                    <div className="ac-poison-bar ac-poison-bar-typical" style={{ height: "14px" }}><span>$1,536.96</span></div>
                  </div>
                  <span className="ac-poison-bar-label">AVG balance</span>
                </div>
                <div className="ac-poison-bar-group">
                  <div className="ac-poison-bar-col">
                    <div className="ac-poison-bar ac-poison-bar-victim" style={{ height: "14px" }}><span>$1,060</span></div>
                    <div className="ac-poison-bar ac-poison-bar-typical" style={{ height: "10px" }}><span>$1.87</span></div>
                  </div>
                  <span className="ac-poison-bar-label">Median balance</span>
                </div>
                <div className="ac-poison-bar-group">
                  <div className="ac-poison-bar-col">
                    <div className="ac-poison-bar ac-poison-bar-victim" style={{ height: "16px" }}><span>512 days</span></div>
                    <div className="ac-poison-bar ac-poison-bar-typical" style={{ height: "10px" }}><span>161 days</span></div>
                  </div>
                  <span className="ac-poison-bar-label">AVG transfer lifespan</span>
                </div>
                <div className="ac-poison-bar-group">
                  <div className="ac-poison-bar-col">
                    <div className="ac-poison-bar ac-poison-bar-victim" style={{ height: "18px" }}><span>598</span></div>
                    <div className="ac-poison-bar ac-poison-bar-typical" style={{ height: "10px" }}><span>26</span></div>
                  </div>
                  <span className="ac-poison-bar-label">AVG transfer numbers</span>
                </div>
              </div>
            </div>
          </section>

          <p>These alarming data points necessitate that users study and adopt adequate countermeasures. The attack skillfully exploits distraction in the management of digital wallet addresses, making <b>personal vigilance</b> the most effective defence.</p>

          <h2 id="poison-attack">{_t("Attack mechanism: spoofing")}</h2>
          <p>Technically, address poisoning is an attack that falls squarely into the category of high-precision <b>spoofing</b>. Spoofing is a social engineering technique where the aggressor falsifies their credentials or identity—in this case, the sender's address—to appear as a trusted entity.</p>
          <p>In the context of address poisoning, the attack focuses on <b>visual deception</b> within the victim's transaction history. It recreates a fake address to which the user will send funds, believing they are sending them to an address already known to them.</p>
          <p>The complete operational process behind address poisoning can be described as follows:</p>
          <ul>
            <li><b>Target identification:</b> The attacker first monitors the victim's recent transactions and identifies a legitimate and frequently used address (for example, an exchange or another of the victim's own wallets).</li>
            <li><b>Fictitious address generation (Vanity Address):</b> Using specific software, the aggressor creates a new wallet that they control. These tools generate private keys via brute force until the resulting public address shares a particular sequence of characters with the legitimate address, focusing on the first and last characters. For example, if the correct address is 0xDeaD…fACe, the attacker aims to create one of their own, such as 0xDeaB…faCe.</li>
            <li><b>The Poisoning:</b> Once the "bait" address is generated, the attacker sends a zero-value transaction to the victim's address, thereby making this fake wallet appear in the victim's history.</li>
          </ul>

          {/* Spoofing flow diagram */}
          <section className="ac-poison-flow" data-testid="poison-flow">
            <div className="ac-summary-brand">
              <span className="ac-summary-check"><svg viewBox="0 0 24 24" width="16" height="16"><path d="M5 13l4 4L19 7" stroke="#fff" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
              <span>academy</span>
            </div>
            <div className="ac-poison-flow-art">
              <svg viewBox="0 0 680 300" role="img" aria-label="Address poisoning attack flow">
                {/* arrows */}
                <g stroke="#0f0f12" strokeWidth="1.6" fill="none">
                  {/* 1 */}
                  <line x1="300" y1="88" x2="560" y2="88"/>
                  <path d="M560 84 l10 4 -10 4 Z" fill="#0f0f12"/>
                  {/* 2 (red diagonal) */}
                  <line x1="300" y1="120" x2="560" y2="232" stroke="#e11d48"/>
                  <path d="M560 226 l10 6 -12 2 Z" fill="#e11d48" stroke="none"/>
                  {/* 3 */}
                  <line x1="200" y1="112" x2="200" y2="252"/>
                  <line x1="200" y1="252" x2="560" y2="252"/>
                  <path d="M560 248 l10 4 -10 4 Z" fill="#0f0f12"/>
                </g>
                {/* labels */}
                <text x="350" y="78" fontSize="14" fontWeight="800" fill="#0f0f12">1. 123.4 USDT</text>
                <text x="360" y="176" fontSize="14" fontWeight="800" fill="#e11d48">2. 0.01 USDT</text>
                <text x="290" y="240" fontSize="14" fontWeight="800" fill="#0f0f12">3. 100 USDT</text>
                {/* pills */}
                <g>
                  <rect x="110" y="70" width="190" height="40" rx="20" fill="#8b5cf6"/>
                  <text x="205" y="96" fontSize="15" fontWeight="800" textAnchor="middle" fill="#fff">V: 0×3b75…2712a</text>
                </g>
                <g>
                  <rect x="560" y="70" width="110" height="40" rx="20" fill="#8b5cf6"/>
                  <text x="615" y="96" fontSize="15" fontWeight="800" textAnchor="middle" fill="#fff">R: 0×168…8373d</text>
                </g>
                <g>
                  <rect x="560" y="230" width="110" height="40" rx="20" fill="#8b5cf6"/>
                  <text x="615" y="256" fontSize="15" fontWeight="800" textAnchor="middle" fill="#fff">L: 0×1682…7373d</text>
                </g>
              </svg>
            </div>
          </section>

          <ul>
            <li><b>The Deception:</b> When the user consults their history in the future to retrieve the address to send funds to, they will find the scammer's address (0xDeaB…faCe), which is visually almost indistinguishable from the legitimate one (0xDeaD…fACe). The attacker counts on our <b>superficial verification</b> (only the first and last characters) and <b>excessive reliance on history</b>.</li>
          </ul>

          {/* Second spoofing flow diagram */}
          <section className="ac-poison-flow" data-testid="poison-flow2">
            <div className="ac-summary-brand">
              <span className="ac-summary-check"><svg viewBox="0 0 24 24" width="16" height="16"><path d="M5 13l4 4L19 7" stroke="#fff" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
              <span>academy</span>
            </div>
            <div className="ac-poison-flow-art">
              <svg viewBox="0 0 680 300" role="img" aria-label="Address poisoning deception flow">
                <g stroke="#0f0f12" strokeWidth="1.6" fill="none">
                  <line x1="300" y1="88" x2="560" y2="88"/>
                  <path d="M560 84 l10 4 -10 4 Z" fill="#0f0f12"/>
                  <line x1="300" y1="120" x2="560" y2="232" stroke="#e11d48"/>
                  <path d="M560 226 l10 6 -12 2 Z" fill="#e11d48" stroke="none"/>
                  <line x1="200" y1="112" x2="200" y2="252"/>
                  <line x1="200" y1="252" x2="560" y2="252"/>
                  <path d="M560 248 l10 4 -10 4 Z" fill="#0f0f12"/>
                </g>
                <text x="350" y="78" fontSize="14" fontWeight="800" fill="#0f0f12">1. 123.4 USDT</text>
                <text x="360" y="176" fontSize="14" fontWeight="800" fill="#e11d48">2. 123.4 USDT</text>
                <text x="290" y="240" fontSize="14" fontWeight="800" fill="#0f0f12">3. 100 USDT</text>
                <g>
                  <rect x="110" y="70" width="190" height="40" rx="20" fill="#8b5cf6"/>
                  <text x="205" y="96" fontSize="15" fontWeight="800" textAnchor="middle" fill="#fff">V: 0×3b75…2712a</text>
                </g>
                <g>
                  <rect x="560" y="70" width="110" height="40" rx="20" fill="#8b5cf6"/>
                  <text x="615" y="96" fontSize="15" fontWeight="800" textAnchor="middle" fill="#fff">R: 0×168…8373d</text>
                </g>
                <g>
                  <rect x="560" y="230" width="110" height="40" rx="20" fill="#8b5cf6"/>
                  <text x="615" y="256" fontSize="15" fontWeight="800" textAnchor="middle" fill="#fff">L: 0×1682…7373d</text>
                </g>
              </svg>
            </div>
          </section>

          <p>As soon as the victim copies the fraudulent address and authorises the transaction to it, the funds are transferred to the attacker's wallet, resulting in the definitive loss of access to the funds, given the intrinsically irreversible nature of blockchain operations.</p>

          <h2 id="poison-defend">{_t("How to defend yourself: essential security strategies")}</h2>
          <p>Address poisoning relies on <b>human error</b>, exploiting the user's distraction or excessive trust. Therefore, the most effective defence consists of adopting a methodical approach and exercising maximum attention in every single transaction. Protecting yourself from this type of attack requires a change in habits and a more critical attitude towards transaction history.</p>
          <p>Here is a brief list of fundamental practices to follow before approving any operation via your digital wallets:</p>
          <ul>
            <li><b>Check the Entire Address:</b> This is the golden rule. Attackers often create addresses with prefixes and suffixes identical to the real ones. It is therefore essential to take the necessary time to verify every single digit of the destination address.</li>
            <li><b>Avoid Copy-Pasting from History:</b> One of the riskiest behaviours is copying an address directly from the list of recent transactions. The destination address must always be obtained from the original and verified source, such as the recipient's wallet's "Receive" section.</li>
            <li><b>Perform a Test Transaction for High Amounts:</b> For substantial sums, it is advisable to first send a minimum amount (e.g., $1) as a test. After verifying that the funds have been received correctly, you can proceed with the principal amount. The additional cost of the double gas fee is a small price to pay to ensure security. <b>Note:</b> Even in this case, checking the entire address remains a mandatory step. Attackers are becoming increasingly fast and precise; even a few seconds' interval between a test transaction and the actual one can represent a risk.</li>
            <li><b>Use Whitelists or Trusted Address Books:</b> As an alternative to this double-check process, you can adopt whitelists or address books of trusted contacts for the most frequently used contacts. By verifying an address once and confirming its absolute correctness, you can save it permanently in your address book. This way, when initiating future transactions, you can retrieve the address directly from this secure address book, effectively making the operations immune to any address poisoning attempt or visual deception.</li>
          </ul>
          <p>Adopting these security measures should be enough to avoid falling victim to what is now one of the most common and insidious attacks in the sector.</p>

          <h2 id="poison-conclusions">{_t("Conclusion: The responsibility for security in Web3")}</h2>
          <p>The blockchain is an immutable and almost impossible-to-compromise ledger, but the human mind remains the weakest link. These scams exploit haste and excessive reliance on shortcuts to trick us into making costly and, above all, irreversible mistakes.</p>
          <p>Address poisoning is a subtle attack, but it is also highly preventable with the right combination of attention and adequate tools. Getting into the habit of verifying the entire address and using whitelists is not just a simple recommendation but an essential operational practice in a world that places all the responsibility for operational security on the end-user.</p>
          <p>In Web3, your security is in your hands. Don't take anything for granted; always verify.</p>
          <p>For more information, see the section dedicated to security: <a href="#" onClick={(e) => e.preventDefault()}>Blockscaner Academy — Crypto Security</a></p>
          <p>Practical tips for your security in the crypto world: <a href="#" onClick={(e) => e.preventDefault()}>blockscaner.com</a></p>
        </div>

        {/* Sign up banner */}
        <div className="ac-signup" data-testid="poison-signup-banner">
          <div className="ac-signup-left">
            <span className="ac-buy-logo ac-signup-logo"><svg viewBox="0 0 24 24" width="20" height="20"><rect x="3" y="3" width="18" height="18" rx="4" fill="none" stroke="#fff" strokeWidth="1.6"/><path d="M8 8h6a3 3 0 0 1 0 6H8zM8 14h7a3 3 0 0 1 0 6H8z" fill="none" stroke="#fff" strokeWidth="1.6"/><circle cx="17.5" cy="6.5" r="1.3" fill="#3ddc84"/></svg>blockscaner</span>
            <h3>{_t("Sign up")}<br />{_t("to Blockscaner")}</h3>
            <a className="ac-signup-btn" href="/products" onClick={(e) => e.preventDefault()}>{_t("Start now")} <span>→</span></a>
          </div>
          <div className="ac-signup-art">
            <svg viewBox="0 0 240 190" preserveAspectRatio="xMidYMid slice">
              <defs>
                <linearGradient id="poiBanner" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0" stopColor="#0e5fb8"/><stop offset="1" stopColor="#1a7fd0"/>
                </linearGradient>
              </defs>
              <rect width="240" height="190" fill="url(#poiBanner)"/>
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
            <article className="ac-card">
              <div className="ac-thumb"><Badge>Beginner</Badge>
                <svg viewBox="0 0 340 210" preserveAspectRatio="xMidYMid slice">
                  <rect width="340" height="210" fill="#ffd21f"/>
                  <g fill="#0d0d12">
                    <path d="M40 40 l20 -12 20 12 v24 l-20 12 -20 -12 Z"/>
                    <path d="M260 30 l20 -12 20 12 v24 l-20 12 -20 -12 Z"/>
                    <path d="M300 120 l20 -12 20 12 v24 l-20 12 -20 -12 Z"/>
                    <path d="M30 140 l20 -12 20 12 v24 l-20 12 -20 -12 Z"/>
                    <path d="M150 20 l20 -12 20 12 v24 l-20 12 -20 -12 Z"/>
                  </g>
                  <circle cx="170" cy="106" r="42" fill="#fff" stroke="#0d0d12" strokeWidth="4"/>
                  <circle cx="170" cy="106" r="34" fill="#0d0d12"/>
                  <g fill="#fff">
                    <circle cx="158" cy="98" r="7"/><circle cx="182" cy="98" r="7"/>
                    <path d="M150 106 a20 18 0 0 1 40 0 a20 18 0 0 1 -40 0 Z"/>
                  </g>
                  <g fill="#0d0d12">
                    <circle cx="162" cy="106" r="2.6"/><circle cx="178" cy="106" r="2.6"/>
                    <ellipse cx="170" cy="116" rx="5" ry="4"/>
                  </g>
                  <g stroke="#0d0d12" strokeWidth="2.4" fill="none" strokeLinecap="round">
                    <path d="M212 78 q6 8 0 14"/><path d="M224 88 q5 7 0 12"/>
                  </g>
                </svg>
              </div>
              <div className="ac-tags"><span className="ac-tag">DeFi</span><span className="ac-tag">Proof-Of-Stake</span></div>
              <h3>Berachain: what it is and how it revolutionises Liquidity in Web3</h3>
              <p className="ac-desc">Discover how Berachain, a hybrid blockchain, is revolutionising Web3 with its Proof-of-Liquidity mechanism, blending security and liquidity management.</p>
              <p className="ac-meta">September 24, 2025&nbsp;&nbsp;•&nbsp;&nbsp;15 min</p>
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
