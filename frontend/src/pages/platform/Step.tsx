import { t as _t } from "@/i18n";
import SiteLayout from "@/components/site/SiteLayout";
import Seo from "@/components/Seo";
import stepMaze from "@/assets/step-maze.png";

/* Step Hub phone mockup (reference) */
function StepPhone() {
  return (
    <div className="st-phone" data-testid="step-phone">
      {/* status bar */}
      <div className="flex items-center justify-between px-4 pt-3 text-[8px] font-semibold text-slate-800">
        <span>9:41</span>
        <span className="flex items-center gap-1">
          <span className="flex gap-0.5">{[2, 4, 5, 7].map(h => <i key={h} className="w-[2px] rounded-sm bg-slate-800" style={{ height: h }} />)}</span>
          <span className="ml-1 h-2 w-4 rounded-[2px] border border-slate-800"><i className="block h-full w-3/4 rounded-[1px] bg-slate-800" /></span>
        </span>
      </div>
      <p className="px-4 pt-2 text-sm font-extrabold text-slate-900">Hub</p>
      {/* reward pill */}
      <div className="mx-3.5 mt-2 flex items-center justify-between rounded-full bg-[#ffe8f2] px-3 py-1.5">
        <span className="text-[7px] font-bold text-[#e0217e]">1 REWARD {_t("waiting for you")}</span>
        <span className="rounded-full bg-[#ff2e88] px-2 py-0.5 text-[7px] font-extrabold text-white">12 {_t("DAYS")}</span>
      </div>
      {/* mission card */}
      <div className="mx-3.5 mt-2 rounded-2xl bg-white p-3 shadow-sm">
        <p className="text-[9px] font-extrabold leading-tight text-slate-900">{_t("The Journey of")}<br />{_t("Autumn Leaves")}</p>
        <p className="mt-0.5 text-[7px] text-slate-400">{_t("Complete 15 missions")}</p>
        <div className="mt-2 flex items-center gap-2">
          <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-100">
            <div className="h-full w-[14%] rounded-full bg-[#ff2e88]" />
          </div>
          <span className="text-[7px] font-bold text-slate-500">1 / 15</span>
        </div>
      </div>
      {/* claps badge */}
      <div className="mx-3.5 mt-2 flex items-center gap-2 rounded-2xl bg-white p-2.5 shadow-sm">
        <span className="grid h-8 w-8 place-items-center rounded-full bg-[#ff2e88] text-[8px] font-extrabold leading-none text-white">1283<span className="block text-[5px] font-semibold">St-Claps</span></span>
        <div className="flex-1">
          <p className="text-[8px] font-bold text-slate-900">BTC <span className="font-normal text-slate-400">Bitcoin</span></p>
          <p className="text-[8px] font-bold text-slate-900 mt-1">ETH <span className="font-normal text-slate-400">Ethereum</span></p>
        </div>
        <div className="text-right">
          <p className="text-[8px] font-bold text-slate-900">€ 34,697 <span className="text-[#00a05a] font-semibold">+2.2%</span></p>
          <p className="mt-1 text-[8px] font-bold text-slate-900">€ 1,931 <span className="text-[#00a05a] font-semibold">+1.66%</span></p>
        </div>
      </div>
      {/* menu */}
      <div className="mx-3.5 mt-2 space-y-1.5">
        {["Step", "Academy", "Cashback", "Up & Down", "Goals"].map((m, i) => (
          <div key={m} className="flex items-center gap-2 rounded-xl bg-white px-2.5 py-2 shadow-sm">
            <span className="h-2.5 w-2.5 rounded-full" style={{ background: ["#ff2e88", "#7c5cff", "#2f7fe8", "#00c867", "#f5a623"][i] }} />
            <span className="text-[8px] font-semibold text-slate-800">{m}</span>
          </div>
        ))}
      </div>
      {/* bottom nav */}
      <div className="mt-auto flex items-center justify-around border-t border-slate-100 bg-white py-2 text-[7px] text-slate-400">
        <span className="flex flex-col items-center gap-0.5"><i className="h-3 w-3 rounded-sm border-[1.5px] border-slate-300" />Home</span>
        <span className="flex flex-col items-center gap-0.5 font-bold text-slate-900"><i className="h-3 w-3 rounded-sm bg-slate-900" />Hub</span>
        <span className="flex flex-col items-center gap-0.5"><i className="h-3 w-3 rounded-full border-[1.5px] border-slate-300" />{_t("Explore")}</span>
      </div>
    </div>
  );
}

export function StepHero() {
  return (
    <section className="st-wrap" data-testid="step-hero">
      <div className="st-hero">
        <img src={stepMaze} alt="" className="st-bg" aria-hidden="true" />
        <div className="st-copy">
          <h1>{_t("Take your first")}<br />{_t("Step into the")}<br />{_t("crypto world")}</h1>
          <p>{_t("The free, fun and effective way to learn how to make crypto work for you.")}</p>
          <div className="st-actions">
            <button className="st-dl" data-testid="step-download-btn">{_t("Download Step")}</button>
            <span className="st-store" title="App Store">
              <svg viewBox="0 0 24 24" style={{ width: 16, height: 16 }}><path d="M17.05 20.28c-.98.95-2.05.86-3.08.41-1.09-.47-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.41C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8.98-.2 1.92-.86 3.24-.77 1.58.13 2.77.75 3.55 1.92-3.26 1.95-2.47 6.27.46 7.47-.6 1.57-1.37 3.13-2.33 3.55M12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25" fill="#0f172a" /></svg>
            </span>
            <span className="st-store" title="Google Play">
              <svg viewBox="0 0 24 24" style={{ width: 14, height: 14 }}><path d="M5 3.5v17l14-8.5z" fill="#0f172a" /></svg>
            </span>
          </div>
        </div>
        <div className="st-phone-slot">
          <StepPhone />
        </div>
      </div>
    </section>
  );
}

/* Expand your knowledge — guided path section (reference design) */
export function StepPath() {
  return (
    <>
      <style>{`
        .sp-wrap{ padding:3rem 1.5rem 1.5rem; background:#fff; text-align:center; }
        .sp-card{ margin:2.5rem auto 0; max-width:1100px; border-radius:32px; background:#f7f7f8;
          padding:3rem 3rem 3.5rem; display:grid; grid-template-columns:1fr 1fr; gap:2rem; align-items:center; overflow:visible; text-align:left;
          transition:transform .3s ease; }
        .sp-card:hover{ transform:scale(1.015); }
        .sp-phone-slot{ position:relative; display:grid; place-items:center; min-height:380px; }
        .sp-phone{ width:200px; transform:scale(1.196); transition:transform .35s ease; }
        .sp-card:hover .sp-phone{ transform:scale(1.3); }
      `}</style>
      <section className="sp-wrap" data-testid="step-path">
        <h2 className="sp-title">{_t("Expand your knowledge")}</h2>
        <p className="sp-lead">{_t("Not just crypto and blockchain: learn the basics of economics and technology to better understand today's world")}</p>

        <div className="sp-card">
          <div className="sp-copy">
            <h3>{_t("A guided path from A to Z")}</h3>
            <p>{_t("With the Step method, you can understand crypto and blockchain even if you're starting from scratch. You'll always be one step ahead!")}</p>
          </div>

          {/* phone mockup */}
          <div className="sp-phone-slot">
            <div className="sp-phone" data-testid="step-path-phone">
              {/* status bar */}
              <div className="sp-status">
                <span className="sp-chip blue"><i className="sp-dot" />15/100</span>
                <span className="sp-chip green"><i className="sp-dot" />2,64</span>
                <span className="sp-chip red"><i className="sp-heart" />5</span>
                <span className="sp-avatar" />
              </div>
              {/* crypto master card */}
              <div className="sp-master">
                <div>
                  <p className="sp-master-t">Crypto Master</p>
                  <p className="sp-master-s"><i className="sp-dot white" />1 / 10 {_t("CHAPTERS")}</p>
                  <div className="sp-bar"><i /></div>
                </div>
                <span className="sp-trophy">
                  <svg viewBox="0 0 24 24" width="18" height="18"><path d="M6 3h12v2h3v3c0 2.2-1.6 4-3.7 4.4A6 6 0 0 1 13 16.9V19h3v2H8v-2h3v-2.1a6 6 0 0 1-4.3-4.5C4.6 12 3 10.2 3 8V5h3V3zm-1 4c0 1 .7 2 1.7 2.3A9 9 0 0 1 6 7V5zm12 0v-.3c.3.7.4 1.5.4 2.3C18.3 9 19 8 19 7h-2z" fill="#fff"/></svg>
                </span>
              </div>
              {/* chapter card */}
              <div className="sp-chapter">
                <p className="sp-ch-kicker">{_t("CHAPTER 1")}</p>
                <p className="sp-ch-title">{_t("Understanding the technology and innovation in finance")}</p>
              </div>
              {/* lesson nodes */}
              <div className="sp-nodes">
                <div className="sp-node done"><i className="sp-check" /><span>STEP</span><em>10 ⚡</em></div>
                <div className="sp-link" />
                <div className="sp-node done purple"><i className="sp-check" /><span>EDUCATION</span><em>1 / 4</em></div>
                <div className="sp-link" />
                <div className="sp-node todo"><i className="sp-dot green" /><span>UP &amp; DOWN</span><em>3 / 4</em></div>
              </div>
            </div>
            {/* floating coins */}
            <span className="sp-coin check"><svg viewBox="0 0 24 24" width="30" height="30"><path d="M5 13l4 4L19 7" stroke="#3ddc84" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
            <span className="sp-coin eth"><svg viewBox="0 0 24 24" width="22" height="22"><path d="M12 2l6 10-6 4-6-4 6-10zm0 20l6-8-6 4-6-4 6 8z" fill="#627eea"/></svg></span>
            <span className="sp-coin btc"><svg viewBox="0 0 24 24" width="30" height="30"><path d="M14.5 12.5c1.6-.4 2.6-1.6 2.6-3.3 0-2-1.5-3.2-3.6-3.4V3h-2v2.6H9.5V3h-2v2.6H5v2h1.6v10.8H5v2h2.5V23h2v-2.6h2V23h2v-2.5c2.2-.2 3.8-1.5 3.8-3.6 0-1.7-.9-2.9-2.8-3.4zM9.5 7.5h3.2c1.2 0 2 .7 2 1.8s-.8 1.8-2 1.8H9.5V7.5zm0 9.4v-3.8h3.8c1.3 0 2.1.8 2.1 1.9s-.8 1.9-2.1 1.9H9.5z" fill="#f7931a"/></svg></span>
          </div>
        </div>
      </section>
    </>
  );
}

/* Academy + Market news — two-column section (reference design) */
export function StepAcademy() {
  return (
    <section className="sa-wrap" data-testid="step-academy">
      <div className="sa-grid">

        {/* Academy lessons card */}
        <div className="sa-card sa-card--pink">
          <h3>{_t("Dive deeper into the theory")}<br />{_t("with")} <em>lessons</em> {_t("and")} <em>videos</em> {_t("in")}<br />{_t("the Academy section")}</h3>

          <div className="sa-lessons">
            {/* Crypto Heroes */}
            <div className="sa-lesson">
              <span className="sa-thumb pink">
                <svg viewBox="0 0 24 24" width="20" height="20"><path d="M12 2l2.5 5.3 5.5.6-4.1 3.8 1.1 5.6-4.5-2.8L7.5 16l1.1-5.6L4.5 7.9l5.5-.6L12 2z" fill="#ff2e88"/></svg>
              </span>
              <div className="sa-lesson-body">
                <div className="sa-lesson-top"><span>56 {_t("QUIZ")}</span><span className="sa-pts">+500 ⚡</span></div>
                <p className="sa-lesson-t">Crypto Heroes</p>
                <div className="sa-prog"><i style={{ width: "5%" }} /><span>5%</span></div>
              </div>
              <span className="sa-cert">
                <svg viewBox="0 0 24 24" width="18" height="18"><path d="M12 2l2.4 4.9 5.6.8-4 4 1 5.6-5-2.7-5 2.7 1-5.6-4-4 5.6-.8L12 2z" fill="#ff2e88"/><path d="M9 14l-2 8 5-3 5 3-2-8" fill="#ff2e88" opacity=".7"/></svg>
              </span>
            </div>

            {/* Cryptocurrencies */}
            <div className="sa-lesson">
              <span className="sa-thumb lilac">
                <svg viewBox="0 0 24 24" width="20" height="20"><circle cx="8" cy="10" r="4" fill="#7c5cff"/><circle cx="15" cy="14" r="4" fill="#b9a7ff"/><text x="8" y="13" fontSize="7" fontWeight="800" textAnchor="middle" fill="#fff">B</text></svg>
              </span>
              <div className="sa-lesson-body">
                <div className="sa-lesson-top"><span>56 {_t("QUIZ")}</span><span className="sa-pts">+500 ⚡</span></div>
                <p className="sa-lesson-t">Cryptocurrencies</p>
                <div className="sa-prog"><i style={{ width: "2%" }} /><span>2%</span></div>
              </div>
            </div>

            {/* Blockchain */}
            <div className="sa-lesson">
              <span className="sa-thumb blue">
                <svg viewBox="0 0 24 24" width="20" height="20"><path d="M7 4h10v6H7z" fill="#2f7fe8" opacity=".35"/><path d="M4 9h10v6H4z" fill="#2f7fe8" opacity=".6"/><path d="M9 14h10v6H9z" fill="#2f7fe8"/></svg>
              </span>
              <div className="sa-lesson-body">
                <div className="sa-lesson-top"><span>56 {_t("QUIZ")}</span><span className="sa-pts">+500 ⚡</span></div>
                <p className="sa-lesson-t">Blockchain</p>
                <div className="sa-prog"><i style={{ width: "2%" }} /><span>2%</span></div>
              </div>
            </div>
          </div>

          {/* pie decoration */}
          <span className="sa-pie" aria-hidden="true">
            <svg viewBox="0 0 40 40" width="72" height="72">
              <circle cx="20" cy="20" r="18" fill="#fff" opacity=".95"/>
              <path d="M20 20 L20 2 A18 18 0 0 1 35.6 27 Z" fill="#ff2e88"/>
              <circle cx="20" cy="20" r="18" fill="none" stroke="#e9e9ee" strokeWidth="2"/>
            </svg>
          </span>
        </div>

        {/* Market news card */}
        <div className="sa-card sa-card--grey">
          <h3>{_t("Discover economics and technology news")}<br />{_t("explained in the simplest way")}</h3>
          <p className="sa-dl">{_t("Download the app")} <span>→</span></p>

          <div className="sa-market">
            {/* left peek card */}
            <div className="sa-news side left">
              <span className="sa-news-ic pink">
                <svg viewBox="0 0 24 24" width="18" height="18"><path d="M12 3l3 5-3 8-3-8 3-5z" fill="#ff2e88"/><path d="M9 14l-3 5h12l-3-5" fill="#ffc3dd"/></svg>
              </span>
              <div className="sa-lines"><i style={{width:"70%"}}/><i style={{width:"50%"}}/><i style={{width:"62%"}}/></div>
              <span className="sa-explore">Explore</span>
            </div>

            {/* centre ETH card */}
            <div className="sa-news main">
              <div className="sa-news-head">
                <div>
                  <p className="sa-news-kicker">ETHEREUM</p>
                  <p className="sa-news-name">ETH</p>
                  <p className="sa-news-chg"><span className="sa-badge">+0.72% 1d</span><br />+1.44 <span>EUR</span></p>
                </div>
                <div className="sa-news-chart">
                  <svg viewBox="0 0 120 46" width="100%" height="46" preserveAspectRatio="none">
                    <path d="M0 34 L14 30 L24 33 L34 22 L44 26 L56 14 L68 18 L80 8 L94 12 L110 4 L120 7 V46 H0 Z" fill="rgba(47,127,232,.14)"/>
                    <path d="M0 34 L14 30 L24 33 L34 22 L44 26 L56 14 L68 18 L80 8 L94 12 L110 4 L120 7" fill="none" stroke="#2f7fe8" strokeWidth="2"/>
                  </svg>
                  <p className="sa-news-cur">EUR<br /><strong>11,890.00</strong></p>
                </div>
              </div>
              <div className="sa-lines"><i style={{width:"78%"}}/><i style={{width:"56%"}}/><i style={{width:"64%"}}/></div>
              <span className="sa-explore dark">Explore</span>
            </div>

            {/* right peek card */}
            <div className="sa-news side right">
              <p className="sa-news-kicker">MARKET</p>
              <span className="sa-news-ic gears">
                <svg viewBox="0 0 24 24" width="22" height="22"><circle cx="9" cy="12" r="5" fill="none" stroke="#ff2e88" strokeWidth="2"/><circle cx="17" cy="9" r="3.4" fill="none" stroke="#ff9ec7" strokeWidth="2"/><circle cx="17" cy="16" r="2.4" fill="none" stroke="#ffc3dd" strokeWidth="2"/></svg>
              </span>
              <div className="sa-lines"><i style={{width:"72%"}}/><i style={{width:"52%"}}/></div>
              <span className="sa-explore">Explore</span>
            </div>

            {/* bell decoration */}
            <span className="sa-bell" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="30" height="30"><path d="M12 22a2.4 2.4 0 0 0 2.4-2.4H9.6A2.4 2.4 0 0 0 12 22zm7-5.5v-6a7 7 0 0 0-4.8-6.6V3a2.2 2.2 0 1 0-4.4 0v.9A7 7 0 0 0 5 10.5v6L3 18.5v1h18v-1l-2-2z" fill="#ff2e88"/></svg>
              <svg className="sa-bell-waves" viewBox="0 0 24 24" width="30" height="30"><path d="M4 9a9 9 0 0 1 16 0" fill="none" stroke="#ffb2d3" strokeWidth="2" strokeLinecap="round"/><path d="M6.5 12a6.5 6.5 0 0 1 11 0" fill="none" stroke="#ffd0e4" strokeWidth="2" strokeLinecap="round"/></svg>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* Put what you've learned into practice — two-column section (reference design) */
export function StepPractice() {
  return (
    <section className="spr-wrap" data-testid="step-practice">
      <h2 className="spr-title">{_t("Put what you've learned")}<br />{_t("into practice")}</h2>
      <p className="spr-lead">{_t("Step motivates you to build healthy habits like walking, keeping up with the market and learning something new every day")}</p>

      <div className="spr-grid">
        {/* Left — Level up and earn rewards */}
        <div className="spr-card spr-card--grey">
          <h3>{_t("Level up and earn rewards")}</h3>
          <p>{_t("Take part in missions and challenge the community to test yourself and strengthen your knowledge.")}</p>

          <div className="spr-phones">
            {/* left mini screen */}
            <div className="spr-mini left">
              <p className="spr-mini-t">Step</p>
              <p className="spr-mini-s">Claim</p>
              <div className="spr-lines"><i style={{width:"70%"}}/><i style={{width:"45%"}}/><i style={{width:"55%"}}/></div>
              <p className="spr-mini-s2">In progress</p>
              <div className="spr-lines"><i style={{width:"60%"}}/></div>
            </div>

            {/* centre phone */}
            <div className="spr-phone">
              <div className="spr-status"><span>9:41</span><span className="spr-x">×</span></div>
              <div className="spr-confetti">
                <svg viewBox="0 0 120 90" width="100%" height="90">
                  <circle cx="20" cy="18" r="3" fill="#ff2e88"/><circle cx="44" cy="10" r="2.4" fill="#7c5cff"/><circle cx="70" cy="16" r="3" fill="#00c867"/>
                  <circle cx="96" cy="24" r="2.4" fill="#ffb020"/><circle cx="30" cy="40" r="2" fill="#2f7fe8"/><circle cx="88" cy="46" r="2" fill="#ff2e88"/>
                  <path d="M14 62 q6 -8 12 0" stroke="#ff2e88" strokeWidth="2.4" fill="none" strokeLinecap="round"/>
                  <path d="M92 60 q6 -8 12 0" stroke="#7c5cff" strokeWidth="2.4" fill="none" strokeLinecap="round"/>
                </svg>
                <span className="spr-gift">
                  <svg viewBox="0 0 48 48" width="44" height="44"><rect x="8" y="16" width="32" height="26" rx="4" fill="#ff2e88"/><rect x="22" y="16" width="4" height="26" fill="#ff7ab8"/><path d="M24 16c-4-8-14-4-10 2h10zm0 0c4-8 14-4 10 2H24z" fill="#ff5fa2"/><rect x="6" y="12" width="36" height="6" rx="2" fill="#e51d77"/></svg>
                </span>
              </div>
              <p className="spr-done">{_t("Mission completed!")}</p>
              <p className="spr-sub">{_t("You did great! Tap Continue to redeem your reward.")}</p>
              <div className="spr-rank">
                <span className="spr-rank-chip gold"><i/>{_t("Rank")} #12</span>
                <span className="spr-rank-chip blue"><i/>{_t("Completed in")} 12d 2h 3m 4s</span>
              </div>
            </div>

            {/* right mini screen */}
            <div className="spr-mini right">
              <div className="spr-row"><span className="spr-coin-s" /> <div><b>ETH</b><em>3,298.23 €</em></div><span className="spr-chip">+2.0%</span></div>
              <div className="spr-lines"><i style={{width:"55%"}}/></div>
              <div className="spr-row"><span className="spr-coin-s" /> <div><b>Ethereum</b><em>1,120.50 €</em></div><span className="spr-chip">+0.3%</span></div>
            </div>

            {/* star */}
            <span className="spr-star" aria-hidden="true">
              <svg viewBox="0 0 40 40" width="38" height="38"><path d="M20 4l4.5 9.5 10 1.2-7.4 6.9 2 10L20 26.3l-9.1 5.3 2-10L5.5 14.7l10-1.2L20 4z" fill="#ff2e88"/></svg>
              <svg viewBox="0 0 40 40" width="38" height="38" style={{position:"absolute",inset:0,margin:"auto",opacity:".5",transform:"scale(1.5)"}}><path d="M20 4l4.5 9.5 10 1.2-7.4 6.9 2 10L20 26.3l-9.1 5.3 2-10L5.5 14.7l10-1.2L20 4z" fill="none" stroke="#ff9ec7" strokeWidth="2"/></svg>
            </span>
          </div>
        </div>

        {/* Right — Price predictions */}
        <div className="spr-card spr-card--pink">
          <h3>{_t("Put yourself to the")}<br />{_t("test with price")}<br />{_t("predictions!")}</h3>

          <div className="spr-pred">
            <div className="spr-pred-card">
              <div className="spr-pred-top">
                <span className="spr-eth"><svg viewBox="0 0 24 24" width="18" height="18"><path d="M12 2l6 10-6 4-6-4 6-10zm0 20l6-8-6 4-6-4 6 8z" fill="#627eea"/></svg></span>
                <div>
                  <b>Ethereum</b>
                  <em className="spr-green">{_t("You're winning")}</em>
                </div>
                <div className="spr-pred-vals">
                  <b>1,234.56€</b>
                  <span>+EUR 1,324.19€</span>
                </div>
              </div>
              <div className="spr-pred-foot">
                <span>▲ {_t("BOOST ACTIVE")}</span>
                <span>×1.25</span>
              </div>
            </div>
            <span className="spr-pred-coin">
              <svg viewBox="0 0 24 24" width="22" height="22"><path d="M14.5 12.5c1.6-.4 2.6-1.6 2.6-3.3 0-2-1.5-3.2-3.6-3.4V3h-2v2.6H9.5V3h-2v2.6H5v2h1.6v10.8H5v2h2.5V23h2v-2.6h2V23h2v-2.5c2.2-.2 3.8-1.5 3.8-3.6 0-1.7-.9-2.9-2.8-3.4zM9.5 7.5h3.2c1.2 0 2 .7 2 1.8s-.8 1.8-2 1.8H9.5V7.5zm0 9.4v-3.8h3.8c1.3 0 2.1.8 2.1 1.9s-.8 1.9-2.1 1.9H9.5z" fill="#f7931a"/></svg>
            </span>
            <span className="spr-pred-coin small">
              <svg viewBox="0 0 24 24" width="14" height="14"><path d="M12 2l6 10-6 4-6-4 6-10zm0 20l6-8-6 4-6-4 6 8z" fill="#7c5cff"/></svg>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function StepPage() {
  return (
    <SiteLayout>
      <Seo title="Blockscaner Step — Learn crypto by playing" description="The free, fun and effective way to learn how to make crypto work for you." />
      <StepHero />
      <StepPath />
      <StepAcademy />
      <StepPractice />
      <StepCommunity />
    </SiteLayout>
  );
}
/* Get your first cryptocurrency + Join a Community — reference design */
export function StepCommunity() {
  return (
    <section className="sc-wrap" data-testid="step-community">
      <h2 className="sc-title">{_t("Get your first")}<br />{_t("cryptocurrency")}</h2>
      <p className="sc-lead">{_t("Try a new type of asset and its opportunities, with no fees and no risk")}</p>

      <div className="sc-earn">
        <div className="sc-earn-card">
          <h3>{_t("Complete levels to earn Young (YNG)")}</h3>
          <p>{_t("YNG is the token of the Young Platform ecosystem, the key to joining its community of crypto enthusiasts")}</p>
        </div>
        <div className="sc-earn-avatar" aria-hidden="true">
          <svg viewBox="0 0 72 72" width="56" height="56">
            <circle cx="36" cy="36" r="34" fill="#0f0f12"/>
            <path d="M22 40c0-8 6-16 14-16s14 8 14 16c0 4-2 8-5 10v6H27v-6c-3-2-5-6-5-10z" fill="#00d68f"/>
            <path d="M24 30c2-4 6-7 12-7s10 3 12 7c1 2 1 4 0 6-1-2-3-3-5-3s-4 1-5 3c-1-2-3-3-5-3s-4 1-5 3c-1-2-2-4-4-6z" fill="#0f0f12"/>
            <path d="M16 34c-2 0-4 2-4 5v4c0 3 2 5 4 5h4v-14h-4zm40 0c2 0 4 2 4 5v4c0 3-2 5-4 5h-4v-14h4z" fill="#2f7fe8"/>
            <rect x="14" y="30" width="6" height="20" rx="3" fill="#1d5fd0"/>
            <rect x="52" y="30" width="6" height="20" rx="3" fill="#1d5fd0"/>
            <path d="M52 30c0-9-7-16-16-16s-16 7-16 16" stroke="#1d5fd0" strokeWidth="4" fill="none" strokeLinecap="round"/>
            <circle cx="30" cy="40" r="2.4" fill="#0f0f12"/><circle cx="42" cy="40" r="2.4" fill="#0f0f12"/>
            <path d="M32 48c2 2 6 2 8 0" stroke="#0f0f12" strokeWidth="2.4" fill="none" strokeLinecap="round"/>
          </svg>
        </div>
      </div>

      <h2 className="sc-title sc-title2">{_t("Join a Community of 2M+")}<br />{_t("people")}</h2>
      <p className="sc-lead">{_t("Young Platform is the largest community in Italy, bringing together thousands of people who believe in the crypto mission, sharing ideas and supporting each other!")}</p>

      <div className="sc-grid">
        <div className="sc-card" data-testid="community-telegram">
          <span className="sc-ic tg"><svg viewBox="0 0 24 24" width="22" height="22"><path d="M9.04 15.6l-.38 5.3c.54 0 .78-.23 1.06-.5l2.55-2.44 5.28 3.87c.97.53 1.66.25 1.92-.9L22.9 3.9c.31-1.43-.52-1.99-1.46-1.64L2.4 9.6c-1.4.54-1.38 1.32-.24 1.67l4.9 1.53L18.3 5.4c.53-.35 1.02-.16.62.19l-9.88 9z" fill="#229ED9"/></svg></span>
          <p>Telegram</p>
          <span className="sc-arrow"><svg viewBox="0 0 24 24" width="14" height="14"><path d="M7 17L17 7M9 7h8v8" stroke="#0f0f12" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
        </div>
        <div className="sc-card" data-testid="community-discord">
          <span className="sc-ic dc"><svg viewBox="0 0 24 24" width="22" height="22"><path d="M20.3 4.4A19.8 19.8 0 0 0 15.4 3l-.23.46a13.3 13.3 0 0 1 3.3 1.66 12.9 12.9 0 0 0-11 0A13.3 13.3 0 0 1 10.8 3.4L10.6 3a19.8 19.8 0 0 0-4.9 1.5C2.6 8.7 2 12.9 2.3 17a19.9 19.9 0 0 0 6 3l.5-.7a12.7 12.7 0 0 1-2-.95l.5-.36a14.2 14.2 0 0 0 12.2 0l.5.7a19.9 19.9 0 0 0 6-3c.34-4.73-.58-8.84-3.2-12.6zM8.7 15.3c-1.2 0-2.2-1.1-2.2-2.4s1-2.4 2.2-2.4 2.2 1.1 2.2 2.4-1 2.4-2.2 2.4-1 2.4-2.2 2.4z" fill="#5865F2"/></svg></span>
          <p>Discord</p>
          <span className="sc-arrow"><svg viewBox="0 0 24 24" width="14" height="14"><path d="M7 17L17 7M9 7h8v8" stroke="#0f0f12" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
        </div>
        <div className="sc-card" data-testid="community-instagram">
          <span className="sc-ic ig"><svg viewBox="0 0 24 24" width="22" height="22"><rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="#E1306C" strokeWidth="2"/><circle cx="12" cy="12" r="4.2" fill="none" stroke="#E1306C" strokeWidth="2"/><circle cx="17.2" cy="6.8" r="1.3" fill="#E1306C"/></svg></span>
          <p>Instagram</p>
          <span className="sc-arrow"><svg viewBox="0 0 24 24" width="14" height="14"><path d="M7 17L17 7M9 7h8v8" stroke="#0f0f12" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
        </div>
        <div className="sc-card" data-testid="community-youtube">
          <span className="sc-ic yt"><svg viewBox="0 0 24 24" width="22" height="22"><path d="M23 7.2s-.22-1.6-.9-2.3c-.86-.9-1.82-.9-2.26-.96C16.7 3.7 12 3.7 12 3.7s-4.7 0-7.84.24c-.44.06-1.4.06-2.26.96-.68.7-.9 2.3-.9 2.3S.78 9.1.78 11v1.8c0 1.9.22 3.8.22 3.8s.22-1.6.9 2.3c.86.9 2 .87 2.5.96 1.8.18 7.6.24 7.6.24s4.7 0 7.84-.24c.44-.06 1.4-.06 2.26-.96.68-.7.9-2.3.9-2.3s.22-1.9.22-3.8V11c0-1.9-.22-3.8-.22-3.8zM9.7 15.2V8.4l6.1 3.4-6.1 3.4z" fill="#FF0000"/></svg></span>
          <p>Youtube</p>
          <span className="sc-arrow"><svg viewBox="0 0 24 24" width="14" height="14"><path d="M7 17L17 7M9 7h8v8" stroke="#0f0f12" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
        </div>
      </div>
    </section>
  );
}


