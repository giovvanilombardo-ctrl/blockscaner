import SiteLayout from "@/components/site/SiteLayout";
import Seo from "@/components/Seo";
import { t as _t } from "@/i18n";
import { ArrowRight } from "lucide-react";
import traderDesk from "@/assets/pro/trader-desk.png";
import feeMedals from "@/assets/pro/fee-medals.png";
import tradingTerminal from "@/assets/pro/trading-terminal.png";
import taxManagement from "@/assets/pro/tax-management.png";
import stakingPhone from "@/assets/pro/staking-phone.png";
import supportMeeting from "@/assets/pro/support-meeting.png";


/* Blurry candlestick chart backdrop */
function ProBackdrop() {
  const candles = [
    [60, 620, 570, 550, 660], [90, 570, 610, 540, 640], [120, 610, 555, 530, 640],
    [150, 555, 500, 480, 590], [185, 500, 545, 470, 580], [220, 545, 470, 450, 580],
    [255, 470, 520, 445, 555], [290, 520, 440, 420, 555], [325, 440, 490, 415, 525],
    [360, 490, 415, 395, 525], [400, 415, 470, 390, 505], [440, 470, 400, 375, 505],
    [480, 400, 450, 370, 485], [520, 450, 385, 360, 485], [560, 385, 430, 355, 470],
    [600, 430, 370, 345, 470], [640, 370, 415, 340, 455], [680, 415, 355, 330, 455],
    [720, 355, 400, 325, 440], [760, 400, 340, 315, 440], [800, 340, 385, 310, 430],
    [840, 385, 325, 300, 430], [880, 325, 370, 295, 415], [920, 370, 310, 285, 415],
    [960, 310, 355, 280, 400], [1000, 355, 295, 270, 400], [1040, 295, 340, 265, 385],
    [1080, 340, 280, 255, 385], [1120, 280, 325, 250, 370], [1160, 325, 265, 240, 370],
    [1200, 265, 310, 235, 355], [1240, 310, 250, 225, 355], [1280, 250, 295, 220, 340],
    [1320, 295, 235, 210, 340], [1360, 235, 280, 205, 325], [1400, 280, 220, 195, 325],
    [1440, 220, 265, 190, 310], [1480, 265, 205, 180, 310], [1520, 205, 250, 175, 295],
    [1560, 250, 190, 165, 295], [1600, 190, 235, 160, 280], [1640, 235, 175, 150, 280],
    [1680, 175, 220, 145, 265], [1720, 220, 160, 135, 265], [1760, 160, 205, 130, 250],
    [1800, 205, 145, 120, 250], [1840, 145, 190, 115, 235], [1880, 190, 130, 105, 235],
    [1920, 130, 175, 100, 220],
  ];
  return (
    <svg className="pro-hero-bg" viewBox="0 0 1980 800" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id="proUp" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2ee58a"/><stop offset="1" stopColor="#0a5c34"/>
        </linearGradient>
        <linearGradient id="proDn" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#e11d48"/><stop offset="1" stopColor="#5c0a1e"/>
        </linearGradient>
        <filter id="proBlur" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="5"/>
        </filter>
      </defs>
      <g filter="url(#proBlur)" opacity="1" transform="translate(0,-80)">
        {candles.map(([x, o, c, h, l], i) => {
          const up = c < o;
          const col = up ? "url(#proUp)" : "url(#proDn)";
          const top = Math.min(o, c);
          const hgt = Math.max(Math.abs(o - c), 8);
          return (
            <g key={i}>
              <line x1={x + 7} y1={h} x2={x + 7} y2={l} stroke={up ? "#2ee58a" : "#e11d48"} strokeWidth="3" opacity=".8"/>
              <rect x={x} y={top} width="14" height={hgt} fill={col} rx="3"/>
            </g>
          );
        })}
      </g>
    </svg>
  );
}

/* Animated API nodes: light pulses travel from the central node to 6 outer nodes on a loop */
function ApiNodesAnimated() {
  const cx = 320;
  const cy = 330;
  const R = 200;
  const angles = [-70, -42, -14, 14, 42, 70];
  return (
    <svg viewBox="0 0 640 420" preserveAspectRatio="xMidYMax slice" className="pro-api-anim">
      <defs>
        <radialGradient id="proApiCenter" cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="#0e5c36"/><stop offset="100%" stopColor="#084527"/>
        </radialGradient>
      </defs>
      <rect width="640" height="420" fill="transparent"/>
      {angles.map((deg, i) => {
        const rad = (deg - 90) * (Math.PI / 180);
        const x2 = cx + R * Math.cos(rad);
        const y2 = cy + R * Math.sin(rad) * 0.9;
        return (
          <g key={i}>
            <path d={`M${cx} ${cy} Q ${cx + (x2 - cx) * 0.5} ${cy + (y2 - cy) * 0.35 - 20} ${x2} ${y2}`}
              stroke="#2ee58a" strokeWidth="2" fill="none" opacity=".35"/>
            <path d={`M${cx} ${cy} Q ${cx + (x2 - cx) * 0.5} ${cy + (y2 - cy) * 0.35 - 20} ${x2} ${y2}`}
              stroke="#7dffb8" strokeWidth="3.5" fill="none" strokeLinecap="round"
              strokeDasharray="26 240" className="pro-api-pulse" style={{ animationDelay: `${i * 0.28}s` }}/>
            <circle cx={x2} cy={y2} r="7" fill="#0a3d24" stroke="#2ee58a" strokeWidth="2.5"/>
          </g>
        );
      })}
      <circle cx={cx} cy={cy} r="34" fill="url(#proApiCenter)" stroke="#2ee58a" strokeWidth="3"/>
      <circle cx={cx} cy={cy} r="16" fill="#2ee58a" opacity=".9"/>
    </svg>
  );
}

export default function Pro() {
  return (
    <SiteLayout>
      <Seo title="Blockscaner Pro — Unmatched precision. Minimal fees." description="Built for expert traders who prioritise speed and comprehensive tools. An advanced trading environment for quick decisions, sophisticated strategies, and real-time monitoring." />
      <div className="pro-page" data-testid="pro-page">
        <ProBackdrop />
        <div className="pro-hero">
          <h1 data-testid="pro-hero-title">
            {_t("Unmatched")} <em>precision.</em><br />
            {_t("Minimal")} <em>fees.</em>
          </h1>
          <p data-testid="pro-hero-sub">
            {_t("Built for expert traders who prioritise speed and comprehensive tools. An advanced trading environment for quick decisions, sophisticated strategies, and real-time monitoring.")}
          </p>
          <a className="pro-cta" href="/signup" data-testid="pro-signup-btn">
            {_t("Sign up")}
          </a>
        </div>

        {/* advanced trading */}
        <section className="pro-markets">
          <h2>{_t("Advanced Trading across")} <b>27</b><br />{_t("Markets")}</h2>
          <p className="pro-markets-sub">{_t("Manage risk with limit and stop-limit orders in the most dynamic markets.")}</p>
          <div className="pro-markets-grid">
            <article className="pro-mcard pro-mcard-photo" data-testid="pro-liquidity-card">
              <img className="pro-mcard-bg" src={traderDesk} alt="" aria-hidden="true" />
              <div className="pro-mcard-body">
                <h3>{_t("Instant trading and high liquidity")}</h3>
                <p>{_t("Instant executions with tight spreads, optimised even for high volumes. Rely on a fast, scalable infrastructure for seamless access to crypto markets, with transactions processed in milliseconds for maximum control and accuracy.")}</p>
              </div>
            </article>
            <article className="pro-mcard" data-testid="pro-fees-card">
              <h3><em>0% fees,</em> {_t("maximum profitability")}</h3>
              <p>{_t("With a volume-based fee structure, no subscription fees, and no minimum portfolio size, you decide how you trade on crypto markets. Join Blockscaner Clubs for 90% lower trading fees.")}</p>
              <a className="pro-mbtn" href="/products" onClick={(e) => e.preventDefault()} data-testid="pro-clubs-btn">
                {_t("Discover Clubs")} <ArrowRight size={14} />
              </a>
              <img src={feeMedals} alt="Blue, gold, silver and bronze check-mark medals" loading="lazy" />
            </article>
          </div>
        </section>

        {/* our trading service */}
        <section className="pro-service">
          <h2>{_t("Our Trading Service")}</h2>
          <p className="pro-markets-sub">{_t("Leverage complex order types to enhance your trading strategies. Our platform enables simultaneous order placements and automated risk monitoring for effective portfolio management.")}</p>
          <div className="pro-service-grid">
            <article className="pro-mcard pro-scard pro-scard-dark" data-testid="pro-tradingview-card">
              <div className="pro-mcard-body">
                <h3>{_t("Precision")} <em>Trading</em> {_t("with TradingView")}</h3>
                <p>{_t("Analyse market trends and spot trading opportunities with advanced charts and 80+ technical indicators integrated from TradingView.")}</p>
              </div>
              <img className="pro-scard-img" src={tradingTerminal} alt="Professional trading terminal with candlestick chart" loading="lazy" />
            </article>
            <article className="pro-mcard pro-scard pro-scard-green" data-testid="pro-api-card">
              <div className="pro-mcard-body">
                <h3>{_t("High-Performance API")}</h3>
                <h4>{_t("Connect via API, WebSocket, or REST with IP whitelisting capabilities for secure, customised access.")}</h4>
                <a className="pro-mbtn" href="/products" onClick={(e) => e.preventDefault()} data-testid="pro-api-btn">
                  {_t("Find out more")} <ArrowRight size={14} />
                </a>
              </div>
              <div className="pro-scard-art"><ApiNodesAnimated /></div>
            </article>
          </div>
        </section>

        {/* compliance & tax management */}
        <section className="pro-compliance">
          <h2>{_t("Compliance & Tax Management")}</h2>
          <p className="pro-markets-sub">{_t("Blockscaner Pro complies with MiCA regulations and is recognised by major European authorities, including for tax reporting.")}</p>
          <div className="pro-compliance-grid">
            <article className="pro-mcard pro-ccard pro-ccard-dark" data-testid="pro-custody-card">
              <div className="pro-mcard-body">
                <h3>{_t("Security priority")}</h3>
                <h4>{_t("1:1 Custody")}<br />{_t("Your assets are protected; never lent or reused.")}</h4>
                <p>{_t("The highest security standards protect your investments, thanks to advanced systems such as two-factor authentication (2FA), mobile biometrics, and multifactorial risk management.")}</p>
              </div>
            </article>
            <article className="pro-mcard pro-ccard pro-ccard-photo" data-testid="pro-tax-card">
              <img className="pro-ccard-bg" src={taxManagement} alt="" aria-hidden="true" />
              <div className="pro-ccard-overlay" />
              <div className="pro-mcard-body">
                <h3>{_t("Integrated tax management")}</h3>
                <p>{_t("Get full tax support across all your digital assets, including external wallets, NFTs, and DeFi platforms. Access one-on-one assistance from crypto-specialised accountants for optimised, compliant tax filings.")}</p>
              </div>
            </article>
          </div>
        </section>

        {/* casp authorisation */}
        <section className="pro-casp">
          <div className="pro-casp-card">
            <h3>{_t("CASP Authorisation")}</h3>
            <p>{_t("Blockscaner is authorised by Consob as a Crypto-Asset Service Provider (CASP), pursuant to Regulation (EU) 2023/1114.")}</p>
          </div>
        </section>

        {/* six years of advanced crypto solutions */}
        <section className="pro-solutions">
          <h2>{_t("Six years of")} <em>{_t("advanced crypto")}</em><br />{_t("solutions")}</h2>
          <p className="pro-markets-sub">{_t("Earn high APYs through lending, with daily liquidity. Access 27 crypto pairs and advanced trading tools on the first OAM-approved platform.")}</p>
          <div className="pro-solutions-grid">
            <article className="pro-sol-card" data-testid="pro-support-card">
              <div className="pro-sol-body">
                <h3>{_t("Dedicated customer support")}</h3>
                <p>{_t("Benefit from a dedicated account manager to answer your questions and support your trading journey, with live assistance available via live chat, phone, or virtual meeting.")}</p>
              </div>
              <img className="pro-sol-img" src={supportMeeting} alt="Two professionals looking at a laptop in an office" loading="lazy" />
            </article>
            <article className="pro-sol-card" data-testid="pro-staking-card">
              <div className="pro-sol-body">
                <h3>{_t("Up to +5% tokens with")} <em>{_t("staking.")}</em></h3>
                <p>{_t("Maximise your crypto portfolio's results with staking on top Proof-of-Stake cryptocurrencies: Ethereum, Celestia, Solana, and Cosmos. Ideal for growing your assets without active trading.")}</p>
              </div>
              <img className="pro-sol-img" src={stakingPhone} alt="Phone showing staking app with Solana and Ethereum" loading="lazy" />
            </article>
          </div>
        </section>
      </div>
    </SiteLayout>
  );
}
