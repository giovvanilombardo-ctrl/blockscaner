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
  );
}

export default function StepPage() {
  return (
    <SiteLayout>
      <Seo title="Blockscaner Step — Learn crypto by playing" description="The free, fun and effective way to learn how to make crypto work for you." />
      <StepHero />
      <StepPath />
    </SiteLayout>
  );
}
