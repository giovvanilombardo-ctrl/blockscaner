import { t as _t, lang } from "@/i18n";
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowUpRight, ArrowLeftRight, TrendingUp, Wallet, ShieldCheck, Plus, RefreshCcw, ArrowDownUp as MoveIcon, MoreHorizontal, Check } from "lucide-react";
import SiteLayout from "@/components/site/SiteLayout";
import BloomField from "@/components/site/BloomField";
import defiFlower from "@/assets/defi-flower.png";
import cardSwipe from "@/assets/card-swipe.png";
import moneyboxHome from "@/assets/moneybox-home.png";
import coinBtc from "@/assets/coins/bitcoin.png";
import coinEur from "@/assets/coins/euro.png";

/* Scroll-into-view reveal wrapper (fade + slide up) */
function Reveal({ children, className = "", delay = 0, ...rest }: any) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} className={className} {...rest}
      style={{ opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(30px)",
               transition: "opacity .8s cubic-bezier(.22,1,.36,1), transform .8s cubic-bezier(.22,1,.36,1)",
               transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

const Index = ({ onResetCookies }: { onResetCookies?: () => void }) => (
  <SiteLayout onResetCookies={onResetCookies}>
    <Helmet>
      <title>Blockscaner — Crypto Trading & Investing</title>
      <meta name="description" content="Buy, sell, swap and grow crypto on one secure platform. Live markets, a self-contained wallet and simple investing — built for everyone." />
      <link rel="canonical" href="https://blockchain-24.com/" />
    </Helmet>

    {/* HERO (kept) */}
    <section className="relative overflow-hidden bg-deep text-deep-foreground min-h-[calc(100vh-6rem)] flex items-center">
      <BloomField />
      <div className="relative mx-auto w-full max-w-5xl px-6 lg:px-10 py-24 grid gap-10 md:grid-cols-2 items-center">
        <h1 className="font-display text-4xl md:text-5xl font-light leading-[1.1] hyphens-none [overflow-wrap:normal] [word-break:keep-all]">
          {_t("The most valuable currency is the freedom to choose.")}
        </h1>
        <div className="md:ml-auto md:max-w-xs border-t border-deep-foreground/50 pt-3">
          <p className="text-sm leading-snug">{_t("Crypto to build value. One account to trade, hold and invest — simply, securely and on your own terms.")}</p>
          <Link to="/login?modo=registro" className="mt-5 inline-block rounded bg-background px-3 py-2 font-mono text-xs uppercase text-foreground">{_t("Get started")}</Link>
        </div>
      </div>
    </section>

    {/* EVERYDAY — "From today's shopping to tomorrow's plans." (reference) */}
    <section className="px-6 lg:px-10 py-20 lg:py-28 bg-white" style={{ zoom: 1.15 }} data-testid="home-everyday">
      <Reveal className="mx-auto max-w-4xl text-center">
        <h2 className="font-display text-4xl md:text-5xl font-semibold leading-[1.1] tracking-tight text-foreground">
          {_t("From today's shopping")}<br />{_t("to tomorrow's plans.")}
        </h2>
        <p className="mt-5 text-sm text-muted-foreground max-w-xl mx-auto leading-relaxed">
          {_t("We simplify everyday payments, bills and spending, removing the little hassles so you can focus on your ambitions.")}
        </p>
      </Reveal>

      <div className="mx-auto mt-14 grid max-w-5xl gap-6 md:grid-cols-2">
        {/* CRYPTO card (light) */}
        <Reveal className="h-full" delay={0}>
        <div className="relative h-full overflow-hidden rounded-3xl bg-[#f4f6f9] p-8 pb-0 flex flex-col transition-transform duration-500 hover:-translate-y-1.5" data-testid="home-crypto-card">
          <h3 className="text-xl font-bold leading-snug text-foreground">
            <span className="text-[#00c867]">CRYPTO.</span> {_t("Buy crypto for what you want to build.")}
          </h3>
          <p className="mt-3 text-xs leading-relaxed text-muted-foreground max-w-xs">
            {_t("Over 80 assets held in regulated custody. Choose Bitcoin and leading alternatives, with all the protections of MiCAR.")}
          </p>
          <Link to="/login?modo=registro" className="mt-5 inline-flex w-fit items-center gap-1.5 rounded-full bg-primary px-5 py-2.5 text-xs font-bold text-primary-foreground hover:bg-primary/90 transition" data-testid="home-crypto-cta">
            {_t("Start now")} <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
          {/* portfolio mini-card + floating flat coins (reference style) */}
          <div className="relative mt-8 flex-1 min-h-[240px]">
            {/* flat coins scattered around the card */}
            <span className="coin-bob absolute -left-2 top-0 grid h-20 w-20 place-items-center rounded-full bg-white shadow-lg shadow-slate-900/10" style={{ "--cd": "4.2s", animationDelay: "0s" } as any}>
              <span className="grid h-12 w-12 place-items-center rounded-full bg-[#00c867]"><Check className="h-6 w-6 text-white" strokeWidth={3.5} /></span>
            </span>
            <span className="coin-bob absolute right-6 -top-4 grid h-16 w-16 place-items-center rounded-full bg-[#e6007a] shadow-lg shadow-slate-900/10" style={{ "--cd": "5.1s", animationDelay: ".6s" } as any}>
              <span className="grid grid-cols-2 gap-1">{[0,1,2,3,4,5].map(i => <i key={i} className="h-1.5 w-1.5 rounded-full bg-white/90" />)}</span>
            </span>
            <span className="coin-bob absolute right-24 top-24 grid h-20 w-20 place-items-center rounded-full bg-white shadow-lg shadow-slate-900/10" style={{ "--cd": "4.7s", animationDelay: "1.1s" } as any}>
              <svg viewBox="0 0 32 32" className="h-9 w-9"><path d="M9 8 L16 16 L23 8 M9 24 L16 16 L23 24" stroke="#1e293b" strokeWidth="3.4" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </span>
            <span className="coin-bob absolute right-2 top-20 grid h-12 w-12 place-items-center rounded-full bg-[#2775ca] shadow-lg shadow-slate-900/10" style={{ "--cd": "3.9s", animationDelay: "1.6s" } as any}>
              <span className="text-white text-sm font-black">$</span>
            </span>
            <span className="coin-bob absolute bottom-0 right-14 grid h-16 w-16 place-items-center rounded-full bg-[#f7931a] shadow-lg shadow-slate-900/10" style={{ "--cd": "5.4s", animationDelay: ".3s" } as any}>
              <span className="text-white text-2xl font-black">₿</span>
            </span>
            <span className="coin-bob absolute bottom-6 right-40 grid h-11 w-11 place-items-center rounded-full bg-[#3453e0] shadow-lg shadow-slate-900/10" style={{ "--cd": "4.4s", animationDelay: "2s" } as any}>
              <span className="text-white text-lg font-black">Ξ</span>
            </span>
            {/* white portfolio card */}
            <div className="absolute left-10 top-10 w-56 rounded-2xl bg-white p-5 shadow-2xl shadow-slate-900/15 text-left">
              <p className="text-base font-bold text-foreground">3.85 ETH</p>
              <p className="text-[10px] text-muted-foreground mb-3">{_t("Total value")} - €8,174</p>
              {[
                ["Available", "1.77 ETH", "+1.10% (-€0.11)", "€3,758"],
                ["Staking", "1.04 ETH", "3.87% APY", "€2,208"],
                ["Pockets", "1.04 ETH", "+1.10% (-€0.11)", "€2,208"],
              ].map(([label, amt, chip, val]) => (
                <div key={label} className="flex items-center justify-between border-t border-border/60 py-2.5 first:border-0">
                  <span className="flex items-center gap-1.5 text-[10px] font-semibold text-foreground">
                    <span className="grid h-4 w-4 place-items-center rounded-full bg-[#00c867]/15"><Check className="h-2.5 w-2.5 text-[#00c867]" /></span>
                    {label}
                  </span>
                  <span className="text-right">
                    <span className="block text-[10px] font-semibold text-foreground">{amt}</span>
                    <span className="block text-[9px] text-[#00a05a]">{chip} <span className="text-muted-foreground">{val}</span></span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
        </Reveal>

        {/* ACCOUNT card (dark) */}
        <Reveal className="h-full" delay={150}>
        <div className="relative h-full overflow-hidden rounded-3xl bg-[#0a1a2f] p-8 pb-0 flex flex-col text-white transition-transform duration-500 hover:-translate-y-1.5" data-testid="home-account-card">
          <h3 className="text-xl font-bold leading-snug">
            <span className="text-[#00c867]">ACCOUNT.</span> {_t("Save on what you do every day.")}
          </h3>
          <p className="mt-3 text-xs leading-relaxed text-slate-300 max-w-xs">
            {_t("Salary payments, bank transfers, spending alerts and the Blockscaner Card for everyday spending.")}
          </p>
          <Link to="/products" className="mt-5 inline-flex w-fit items-center gap-1.5 rounded-full bg-primary px-5 py-2.5 text-xs font-bold text-primary-foreground hover:bg-primary/90 transition" data-testid="home-account-cta">
            {_t("Find out more")} <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
          {/* phone mockup — bigger, detailed, interactive */}
          <AccountPhone />
        </div>
        </Reveal>
      </div>

      {/* Precision trading banner */}
      <Reveal delay={250}>
      <div className="mx-auto mt-6 flex max-w-5xl items-center gap-4" data-testid="home-pro-banner">
        <div className="relative flex flex-1 flex-col items-start justify-between gap-5 rounded-3xl bg-[#15181e] p-8 text-white sm:flex-row sm:items-center">
          <div className="max-w-md">
            <h3 className="text-xl font-bold">{_t("Precision trading with")} <span className="text-[#00c867]">Blockscaner Pro</span></h3>
            <p className="mt-2 text-xs leading-relaxed text-slate-400">
              {_t("Rock-bottom fees, advanced charts and tools designed for those who live and breathe the markets.")}
            </p>
          </div>
          <Link to="/markets" className="inline-flex items-center gap-1.5 rounded-full bg-primary px-5 py-2.5 text-xs font-bold text-primary-foreground hover:bg-primary/90 transition" data-testid="home-pro-cta">
            {_t("Discover more")} <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
          <span className="absolute -right-2 top-1/2 hidden h-5 w-5 -translate-y-1/2 rotate-45 bg-[#15181e] sm:block" />
        </div>
        <span className="coin-bob hidden h-14 w-14 shrink-0 place-items-center rounded-full bg-black sm:grid" style={{ "--cd": "5s" } as any}>
          <Check className="h-7 w-7 text-white" strokeWidth={3.5} />
        </span>
      </div>
      </Reveal>

      {/* MiCAR regulation banner */}
      <Reveal delay={0}>
        <div className="mx-auto mt-10 flex max-w-5xl flex-col gap-3 rounded-3xl bg-[#0a1a2f] p-7 text-white sm:flex-row sm:items-center sm:justify-between sm:p-8" data-testid="home-micar-banner">
          <div>
            <p className="flex items-center gap-2.5 text-[11px] font-bold tracking-wide">
              <span className="rounded-md bg-[#00c867] px-2 py-0.5 text-[9px] font-extrabold uppercase text-white">Authorised</span>
              <span className="text-slate-300 uppercase">Europe</span>
            </p>
            <h3 className="mt-2.5 text-2xl font-bold tracking-tight">Regulation (EU) 2023/1114 (MiCAR)</h3>
            <p className="mt-1 text-xs text-slate-400">{_t("Crypto-asset service provider (CASP)")}</p>
          </div>
          <a href="https://www.eur-lex.europa.eu" target="_blank" rel="noreferrer" className="text-xs font-semibold text-[#00c867] underline underline-offset-4 hover:text-[#4ade80] transition">
            www.eur-lex.europa.eu
          </a>
        </div>
      </Reveal>

      {/* DEFI WALLET split card */}
      <Reveal delay={120}>
        <div className="mx-auto mt-6 grid max-w-5xl overflow-hidden rounded-3xl md:grid-cols-2" data-testid="home-defi-card">
          {/* left: 3D glass flower art */}
          <div className="relative min-h-[360px] overflow-hidden bg-[#eef1f5]">
            <img src={defiFlower} alt="" className="flower-hero absolute left-1/2 top-1/2 w-[320px] max-w-none -translate-x-1/2 -translate-y-1/2 drop-shadow-2xl" aria-hidden="true" />
            {/* floating tooltip */}
            <div className="absolute left-1/2 top-[26%] z-10 -translate-x-1/2">
              <div className="coin-bob rounded-xl bg-[#2563eb]/85 px-4 py-2.5 text-center text-[11px] font-semibold text-white shadow-lg backdrop-blur-md" style={{ "--cd": "4.6s" } as any}>
                <Check className="mr-1 inline h-3 w-3" strokeWidth={3.5} />{_t("Deposit completed in minutes")}
              </div>
            </div>
            {/* USDC card */}
            <div className="absolute bottom-[8%] left-1/2 z-10 -translate-x-1/2">
              <div className="coin-bob w-64 rounded-2xl bg-white/95 p-5 shadow-2xl shadow-slate-900/15 backdrop-blur" style={{ "--cd": "5.2s", animationDelay: ".8s" } as any}>
                <div className="flex items-center gap-2.5">
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-[#2775ca] text-sm font-black text-white">$</span>
                  <div>
                    <p className="text-sm font-bold text-foreground">USDC · Aave</p>
                    <p className="text-[10px] text-muted-foreground">{_t("Lending · Ethereum Network")}</p>
                  </div>
                </div>
                <div className="mt-3.5 flex items-center justify-between text-[11px]">
                  <span className="text-muted-foreground">{_t("Annual yield")}</span>
                  <span className="font-bold text-[#2563eb]">4.42% <span className="font-normal text-muted-foreground">variable</span></span>
                </div>
                <div className="mt-1.5 flex items-center justify-between text-[11px]">
                  <span className="text-muted-foreground">{_t("Deposited")}</span>
                  <span className="font-bold text-foreground">2,500.00 USDC</span>
                </div>
              </div>
            </div>
          </div>
          {/* right: copy */}
          <div className="flex flex-col justify-center bg-[#0c0e12] p-8 text-white sm:p-10">
            <h3 className="text-2xl font-bold tracking-tight"><span className="text-[#2f7fe8]">DEFI WALLET.</span><br />4.42% {_t("annual returns.")}</h3>
            <p className="mt-4 text-xs leading-relaxed text-slate-300">
              {_t("Access returns* on your funds and swap crypto at lower costs. All with full self-custody and no technical complications.")}
            </p>
            <p className="mt-3 text-[10px] leading-relaxed text-slate-500">
              {_t("*Variable and not guaranteed, generated by third-party protocols. DeFi services aren't covered by the MiCA Regulation and don't benefit from its protections.")}
            </p>
            <Link to="/products" className="mt-6 inline-flex w-fit items-center gap-1.5 rounded-full bg-primary px-5 py-2.5 text-xs font-bold text-primary-foreground hover:bg-primary/90 transition" data-testid="home-defi-cta">
              {_t("Find out more")} <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </Reveal>

      {/* Business banner */}
      <Reveal delay={200}>
        <div className="mx-auto mt-6 flex max-w-5xl items-center gap-4" data-testid="home-business-banner">
          <div className="relative flex flex-1 flex-col items-start justify-between gap-5 rounded-3xl bg-[#eef1f5] p-8 sm:flex-row sm:items-center">
            <div className="max-w-md">
              <h3 className="text-2xl font-bold tracking-tight text-foreground">{_t("Got a")} <span className="text-[#00c867]">{_t("business")}</span>? {_t("Let's help it")} <span className="text-[#00c867]">{_t("thrive")}</span>.</h3>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                {_t("Bitcoin for treasury and international payments 50 times cheaper, with a dedicated Account Manager for your business.")}
              </p>
            </div>
            <Link to="/business" className="inline-flex items-center gap-1.5 rounded-full bg-[#00c867] px-5 py-2.5 text-xs font-bold text-white hover:bg-[#00b35b] transition" data-testid="home-business-cta">
              {_t("Discover more")} <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
            <span className="absolute -right-2 top-1/2 hidden h-5 w-5 -translate-y-1/2 rotate-45 bg-[#eef1f5] sm:block" />
          </div>
          <span className="coin-bob hidden h-14 w-14 shrink-0 place-items-center rounded-full bg-[#00c867] sm:grid" style={{ "--cd": "4.4s", animationDelay: "1.2s" } as any}>
            <Check className="h-7 w-7 text-white" strokeWidth={3.5} />
          </span>
        </div>
      </Reveal>
    </section>

    {/* FROM YOUR ACCOUNT TO CRYPTO AND BACK (reference) */}
    <section className="px-6 lg:px-10 py-20 lg:py-28 bg-white" style={{ zoom: 1.2 }} data-testid="home-card-section">
      <Reveal className="mx-auto max-w-4xl text-center">
        <h2 className="font-display text-4xl md:text-5xl font-semibold leading-[1.1] tracking-tight text-foreground">
          {_t("From your account to crypto")}<br />{_t("and back.")}
        </h2>
        <p className="mt-5 text-sm text-muted-foreground max-w-xl mx-auto leading-relaxed">
          {_t("Manage your money with total flexibility and get more from everyday spending: with the Blockscaner Card, pay anywhere and earn cashback with every purchase.")}
        </p>
      </Reveal>

      <div className="mx-auto mt-14 grid max-w-5xl gap-6 md:grid-cols-2">
        {/* Move funds card (dark) */}
        <Reveal className="h-full" delay={0}>
          <div className="relative h-full min-h-[440px] overflow-hidden rounded-3xl bg-[#0a1a2f] p-8 text-white" data-testid="home-move-funds-card">
            <h3 className="max-w-[240px] text-xl font-bold leading-snug">
              {_t("Move funds from")} <span className="text-[#00c867]">{_t("Account")}</span> {_t("to")} <span className="text-[#00c867]">Crypto</span> {_t("at record speed.")}
            </h3>

            {/* mock accounts + dashed flow arrows */}
            <div className="relative mt-10 h-[280px]">
              <svg className="absolute inset-0 h-full w-full" viewBox="0 0 400 280" fill="none" aria-hidden="true">
                <path d="M320 90 C 360 130 360 170 300 190" stroke="#00c867" strokeWidth="1.8" strokeDasharray="6 6" className="dash-flow" />
                <path d="M300 190 l 8 -1 m -8 1 l 3 -8" stroke="#00c867" strokeWidth="1.8" strokeLinecap="round" />
                <path d="M110 210 C 60 180 60 140 130 118" stroke="#00c867" strokeWidth="1.8" strokeDasharray="6 6" className="dash-flow dash-flow-rev" />
                <path d="M130 118 l -8 2 m 8 -2 l -4 8" stroke="#00c867" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
              <img src={coinBtc} alt="" className="coin-bob absolute left-0 top-2 w-16 object-contain drop-shadow-xl" style={{ "--cd": "4.8s" } as any} aria-hidden="true" />

              {/* crypto account mock */}
              <div className="coin-bob absolute left-16 top-4 w-56 rounded-2xl bg-white p-4 text-foreground shadow-2xl" style={{ "--cd": "5.4s", animationDelay: ".5s" } as any}>
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs font-bold">{_t("Crypto Account")}</p>
                    <p className="text-[10px] text-muted-foreground">€3,388.84 · <span className="text-[#00a05a]">+13.60%</span></p>
                  </div>
                  <span className="flex -space-x-1.5">
                    <i className="h-4 w-4 rounded-full bg-[#f7931a] ring-2 ring-white" />
                    <i className="h-4 w-4 rounded-full bg-[#3453e0] ring-2 ring-white" />
                    <i className="h-4 w-4 rounded-full bg-[#e6007a] ring-2 ring-white" />
                  </span>
                </div>
                <div className="mt-3 flex gap-1.5 text-[9px] font-bold">
                  <span className="rounded-full bg-[#00c867] px-3 py-1 text-white">{_t("Buy")}</span>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-slate-600">{_t("Sell")}</span>
                  <span className="rounded-full bg-slate-100 px-2.5 py-1 text-slate-600">···</span>
                </div>
              </div>

              {/* payment account mock */}
              <div className="coin-bob absolute bottom-2 right-2 w-56 rounded-2xl bg-white p-4 text-foreground shadow-2xl" style={{ "--cd": "4.6s", animationDelay: "1.1s" } as any}>
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs font-bold">{_t("Payment Account")}</p>
                    <p className="text-[10px] text-muted-foreground">{_t("Account no.")} * 8992</p>
                  </div>
                  <span className="grid h-5 w-5 place-items-center rounded-full bg-[#2563eb] text-[9px] font-black text-white">€</span>
                </div>
                <div className="mt-3 flex gap-1.5 text-[9px] font-bold">
                  <span className="rounded-full bg-[#00c867] px-3 py-1 text-white">{_t("Payments")}</span>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-slate-600">{_t("Top up")}</span>
                  <span className="rounded-full bg-slate-100 px-2.5 py-1 text-slate-600">···</span>
                </div>
              </div>
              <img src={coinEur} alt="" className="coin-bob absolute -bottom-4 -right-4 w-14 object-contain drop-shadow-xl" style={{ "--cd": "5.8s", animationDelay: "1.7s" } as any} aria-hidden="true" />
            </div>
          </div>
        </Reveal>

        {/* Card you'll love to swipe (photo) */}
        <Reveal className="h-full" delay={150}>
          <div className="relative h-full min-h-[440px] overflow-hidden rounded-3xl text-white" data-testid="home-swipe-card">
            <img src={cardSwipe} alt={_t("Hand holding the Blockscaner Card")} className="absolute inset-0 h-full w-full object-cover transition-transform duration-[2000ms] hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-transparent to-black/70" />
            <h3 className="absolute left-6 top-6 max-w-[280px] text-2xl font-extrabold uppercase leading-tight tracking-tight">
              {_t("The")} <span className="text-[#00c867]">{_t("card")}</span> {_t("you'll love to swipe.")}
            </h3>
            <div className="absolute inset-x-6 bottom-6">
              <div className="flex items-center justify-between text-[11px] font-semibold text-white/85">
                <span>{_t("Up to")}</span>
                <span>{_t("with Platinum Club")}</span>
              </div>
              <p className="mt-1 text-4xl font-extrabold tracking-tight">3.6% CASHBACK</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>

    {/* BUILDING MEANS PLANNING (reference) */}
    <section className="px-6 lg:px-10 py-20 lg:py-28 bg-white" style={{ zoom: 1.2 }} data-testid="home-planning-section">
      <Reveal className="mx-auto max-w-4xl text-center">
        <h2 className="font-display text-4xl md:text-5xl font-semibold leading-[1.1] tracking-tight text-foreground">
          {_t("Building means planning.")}
        </h2>
        <p className="mt-5 text-sm text-muted-foreground max-w-xl mx-auto leading-relaxed">
          {_t("Choose, set up, automate. Simple tools to grow your balance over time, without needing to pinpoint the right moment in the market.")}
        </p>
      </Reveal>

      <div className="mx-auto mt-14 grid max-w-5xl gap-6 md:grid-cols-2">
        {/* Moneyboxes card */}
        <Reveal className="h-full" delay={0}>
          <div className="relative flex h-full flex-col overflow-hidden rounded-3xl bg-[#f4f6f9] p-8 pb-0" data-testid="home-moneybox-card">
            <h3 className="max-w-[280px] text-xl font-bold leading-snug text-foreground">
              <span className="text-[#00c867]">Moneyboxes.</span> {_t("Big goals, small habits.")}
            </h3>
            <p className="mt-3 max-w-[300px] text-xs leading-relaxed text-muted-foreground">
              {_t("Discipline beats timing. Make time your best ally with recurring purchases.")}
            </p>
            <Link to="/products" className="mt-5 inline-flex w-fit items-center gap-1.5 rounded-full bg-primary px-5 py-2.5 text-xs font-bold text-primary-foreground hover:bg-primary/90 transition" data-testid="home-moneybox-cta">
              {_t("Open a Moneybox")} <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
            {/* interior photo + overlay card */}
            <div className="relative mt-8 flex-1 min-h-[260px]">
              <img src={moneyboxHome} alt={_t("New home interior")} className="absolute inset-0 h-full w-full rounded-t-3xl object-cover" />
              <div className="coin-bob absolute bottom-4 left-4 right-4 rounded-2xl bg-white/95 p-4 shadow-xl backdrop-blur" style={{ "--cd": "5s" } as any}>
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-bold text-foreground">{_t("New home")}</p>
                    <p className="text-[11px] font-semibold text-foreground">€28,640.20</p>
                    <p className="text-[10px] text-muted-foreground">€50 {_t("per month")}</p>
                  </div>
                  <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[9px] font-bold text-[#00a05a]">+1.82% · +€10.20</span>
                </div>
                <div className="mt-3">
                  <p className="text-[9px] font-semibold uppercase tracking-wide text-muted-foreground">{_t("Composition")}</p>
                  <div className="mt-1.5 flex h-1.5 w-full overflow-hidden rounded-full">
                    <span className="h-full w-[62%] bg-[#f7931a]" />
                    <span className="h-full w-[26%] bg-[#627eea]" />
                    <span className="h-full w-[12%] bg-[#2775ca]" />
                  </div>
                  <div className="mt-1.5 flex gap-3 text-[9px] text-muted-foreground">
                    <span className="flex items-center gap-1"><i className="h-2 w-2 rounded-full bg-[#f7931a]" />Bitcoin</span>
                    <span className="flex items-center gap-1"><i className="h-2 w-2 rounded-full bg-[#627eea]" />Ethereum</span>
                    <span className="flex items-center gap-1"><i className="h-2 w-2 rounded-full bg-[#2775ca]" />USDC</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Staking card */}
        <Reveal className="h-full" delay={150}>
          <div className="relative flex h-full flex-col overflow-hidden rounded-3xl bg-[#f4f6f9] p-8 pb-0" data-testid="home-staking-card">
            <h3 className="max-w-[300px] text-xl font-bold leading-snug text-foreground">
              <span className="text-[#00c867]">Staking.</span> {_t("Make what you already have work for you.")}
            </h3>
            <p className="mt-3 max-w-[300px] text-xs leading-relaxed text-muted-foreground">
              {_t("Lock your crypto to help networks and earn rewards every day. If you change your mind, you can exit whenever you like.")}
            </p>
            <Link to="/products" className="mt-5 inline-flex w-fit items-center gap-1.5 rounded-full bg-primary px-5 py-2.5 text-xs font-bold text-primary-foreground hover:bg-primary/90 transition" data-testid="home-staking-cta">
              {_t("Start staking")} <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
            {/* staking art */}
            <div className="relative mt-8 flex-1 min-h-[260px]">
              <svg className="absolute inset-x-0 bottom-0 h-[70%] w-full" viewBox="0 0 400 180" preserveAspectRatio="none" aria-hidden="true">
                <path d="M0 150 C 60 140 90 110 140 118 C 190 126 220 80 270 86 C 320 92 350 40 400 30" fill="none" stroke="#00c867" strokeWidth="2.5" strokeLinecap="round" className="dash-flow" />
              </svg>
              <div className="coin-bob absolute left-0 top-0 rounded-xl bg-white px-3.5 py-2.5 shadow-lg" style={{ "--cd": "4.6s", animationDelay: ".4s" } as any}>
                <p className="text-[9px] font-semibold uppercase tracking-wide text-muted-foreground">{_t("Average APY")}</p>
                <p className="text-sm font-bold text-foreground">2.21%</p>
              </div>
              <div className="coin-bob absolute right-0 top-6 rounded-xl bg-white px-3.5 py-2.5 shadow-lg" style={{ "--cd": "5.3s", animationDelay: "1s" } as any}>
                <p className="text-[9px] font-semibold uppercase tracking-wide text-muted-foreground">{_t("Rewards")}</p>
                <p className="text-sm font-bold text-[#00a05a]">+€265.27</p>
              </div>
              <div className="coin-bob absolute bottom-2 left-1/2 w-60 -translate-x-1/2 rounded-2xl bg-white p-4 shadow-2xl" style={{ "--cd": "5.8s", animationDelay: "1.6s" } as any}>
                <div className="flex items-center gap-2.5">
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-[#627eea] text-sm font-black text-white">Ξ</span>
                  <div>
                    <p className="text-xs font-bold text-foreground">Ethereum</p>
                    <p className="text-[9px] text-muted-foreground">APY 1.34% · <span className="text-[#00a05a]">+€0.01</span></p>
                  </div>
                </div>
                <div className="mt-3 flex items-center justify-between text-[11px]">
                  <span className="font-bold text-foreground">1 ETH</span>
                  <span className="text-muted-foreground">€2,207.67</span>
                </div>
                <span className="mt-3 block rounded-full bg-primary py-1.5 text-center text-[10px] font-bold text-primary-foreground">{_t("Add funds")}</span>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>

    {/* 02 — PRODUCTS */}
    <section className="px-6 lg:px-10 py-20 lg:py-28 border-b border-border">
      <p className="eyebrow mb-5">{_t("02 — Products")}</p>
      <h2 className="font-display text-4xl lg:text-5xl leading-tight max-w-2xl">{_t("One platform for everything crypto.")}</h2>
      <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border border border-border">
        {[
          { I: ArrowLeftRight, t: "Trade", d: "Buy, sell and swap crypto instantly at live market rates." },
          { I: Wallet, t: "Wallet", d: "Hold Bitcoin, Ethereum, stablecoins and more — securely in one place." },
          { I: TrendingUp, t: "Invest", d: "Build long-term wealth with recurring buys and yield on your holdings." },
          { I: ShieldCheck, t: "Security", d: "Institutional-grade custody and account protection by default." },
        ].map(({ I, t, d }) => (
          <Link key={t} to="/products" className="group bg-background p-8 hover:bg-card transition-colors">
            <I className="h-6 w-6 text-primary" />
            <h3 className="mt-5 font-display text-xl">{_t(t)}</h3>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{_t(d)}</p>
            <span className="mt-5 inline-flex items-center gap-1.5 text-xs font-medium text-primary">{_t("Learn more")} <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></span>
          </Link>
        ))}
      </div>
    </section>

    {/* 03 — MARKETS teaser */}
    <section className="relative overflow-hidden border-b border-border">
      <div className="grid lg:grid-cols-2 min-h-[480px]">
        <div className="px-6 lg:px-10 py-20 lg:py-28 flex flex-col justify-center">
          <p className="eyebrow mb-5">{_t("03 — Markets")}</p>
          <h2 className="font-display text-4xl lg:text-5xl leading-tight max-w-lg">{_t("Live prices. Real opportunity.")}</h2>
          <p className="mt-6 text-muted-foreground max-w-lg leading-relaxed">{_t("Follow the markets in real time and act when it matters — with transparent pricing and no hidden fees.")}</p>
          <Link to="/markets" className="mt-10 inline-flex w-fit items-center gap-2 bg-primary text-primary-foreground px-6 py-3.5 text-sm font-medium">{_t("View live markets")} <ArrowUpRight className="h-4 w-4" /></Link>
        </div>
        <div className="relative min-h-[320px] border-t lg:border-t-0 lg:border-l border-border bg-card flex items-center justify-center p-10">
          <MarketTicker />
        </div>
      </div>
    </section>

    {/* 04 — CTA banner */}
    <section className="px-6 lg:px-10 py-20 lg:py-28 border-b border-border">
      <div className="cta-navy relative overflow-hidden rounded-[2rem] max-w-6xl mx-auto px-6 py-24 lg:py-28 text-center">
        <div className="relative max-w-3xl mx-auto">
          <h2 className="font-display text-3xl md:text-5xl leading-tight cta-navy-title">{_t("Start building your crypto future today")}</h2>
          <p className="mt-6 cta-navy-text">{_t("Open your free account in minutes and buy your first crypto with the payment method you already use.")}</p>
          <Link to="/login?modo=registro" className="mt-10 inline-block rounded-full bg-primary text-primary-foreground px-16 py-4 text-sm font-medium hover:bg-primary/90 transition">{_t("Create your account")}</Link>
        </div>
      </div>
    </section>

    {/* 05 — Business */}
    <section className="px-6 lg:px-10 py-20 lg:py-28 border-b border-border">
      <div className="grid lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-6">
          <p className="eyebrow mb-5">{_t("04 — Business")}</p>
          <h2 className="font-display text-4xl lg:text-5xl leading-tight">{_t("Crypto for forward-thinking businesses.")}</h2>
        </div>
        <div className="lg:col-span-6">
          <p className="text-muted-foreground leading-relaxed">{_t("Treasury, international payments and institutional-grade custody — digital-asset services built for companies that move first.")}</p>
          <Link to="/business" className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-primary">{_t("Discover Blockscaner for Business")} <ArrowUpRight className="h-4 w-4" /></Link>
        </div>
      </div>
    </section>

    {/* 07 — CTA */}
    <section className="px-6 lg:px-10 py-24 lg:py-32 text-center">
      <p className="eyebrow mb-6">{_t("Free account · No hidden fees")}</p>
      <h2 className="font-display text-4xl md:text-6xl leading-tight max-w-4xl mx-auto">{_t("Your money, your crypto, your choice.")}</h2>
      <p className="mt-6 text-muted-foreground max-w-xl mx-auto">{_t("Join Blockscaner and take control of your financial future — simply and securely.")}</p>
      <div className="mt-10 flex flex-wrap justify-center gap-3">
        <Link to="/login?modo=registro" className="bg-primary text-primary-foreground px-7 py-4 text-sm font-medium hover:bg-primary/90 transition">{_t("Get started")}</Link>
        <Link to="/products" className="border border-border px-7 py-4 text-sm hover:border-primary transition">{_t("Explore products")}</Link>
      </div>
    </section>
  </SiteLayout>
);

/* Interactive account phone mockup (home ACCOUNT card) */
const PHONE_RANGES = {
  "1Y": { pts: [[0,50],[18,44],[36,47],[54,38],[72,41],[90,30],[108,35],[126,24],[144,29],[162,18],[180,22]], vals: [4180, 4520, 4460, 4930, 4810, 5480, 5320, 5960, 5780, 6540, 6840], change: "+63.5%", note: "last 12 months" },
  "1M": { pts: [[0,40],[20,34],[40,38],[60,28],[80,32],[100,24],[120,28],[140,18],[160,22],[180,14]], vals: [6020, 6280, 6180, 6540, 6440, 6720, 6610, 6940, 6880, 6840], change: "+13.62%", note: "last 30 days" },
  "1W": { pts: [[0,42],[20,38],[34,44],[52,30],[66,34],[84,22],[100,28],[118,16],[136,24],[154,12],[180,18]], vals: [6450, 6580, 6490, 6720, 6640, 6860, 6780, 6980, 6900, 7060, 6840], change: "+6.00%", note: "last 7 days" },
  "1D": { pts: [[0,26],[22,30],[45,27],[68,33],[90,29],[112,35],[134,31],[156,36],[180,33]], vals: [6790, 6760, 6780, 6710, 6740, 6680, 6720, 6660, 6840], change: "+0.84%", note: "today" },
} as const;

function AccountPhone(){
  const [range, setRange] = useState<keyof typeof PHONE_RANGES>("1W");
  const [cursor, setCursor] = useState<number | null>(null);
  const d = PHONE_RANGES[range];
  const n = d.pts.length;
  const active = cursor ?? n - 1;
  const value = d.vals[Math.min(active, d.vals.length - 1)];

  const onMove = (e: React.MouseEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 180;
    setCursor(Math.max(0, Math.min(n - 1, Math.round((x / 180) * (n - 1)))));
  };

  return (
    <div className="phone-float relative mx-auto mt-8 w-72 rounded-t-[2.4rem] border-x-[7px] border-t-[7px] border-black bg-[#060d18] px-5 pt-4 pb-0 shadow-2xl" data-testid="home-account-phone">
      {/* status bar */}
      <div className="flex items-center justify-between text-[9px] text-slate-400">
        <span className="font-semibold">9:41</span>
        <span className="flex items-center gap-1">
          <span className="flex gap-0.5">{[3,5,7,8].map(h => <i key={h} className="w-0.5 rounded-sm bg-slate-400" style={{ height: h }} />)}</span>
          <span className="ml-1 h-2.5 w-5 rounded-sm border border-slate-400"><i className="block h-full w-3/4 rounded-sm bg-slate-400" /></span>
        </span>
      </div>
      {/* header */}
      <div className="mt-3 flex items-center justify-between">
        <span className="grid h-7 w-7 place-items-center rounded-full bg-slate-700/70"><span className="h-3 w-3 rounded-full bg-slate-400" /></span>
        <span className="flex gap-1.5"><span className="h-5 w-5 rounded-full bg-slate-700/70" /><span className="h-5 w-5 rounded-full bg-slate-700/70" /></span>
      </div>
      {/* balance — updates with hover position */}
      <p className="mt-4 text-center text-[10px] uppercase tracking-wider text-slate-400">{_t("Account")}</p>
      <p className="text-center text-2xl font-bold tabular-nums transition-all" data-testid="phone-balance">
        €{value.toLocaleString("en-US", { minimumFractionDigits: 2 })}
      </p>
      <p className="text-center text-[10px] text-[#00c867] font-semibold">{d.change} <span className="text-slate-500 font-normal">· {d.note}</span></p>
      {/* interactive chart */}
      <div className="relative mt-2">
        <svg viewBox="0 0 180 60" className="w-full cursor-crosshair" onMouseMove={onMove} onMouseLeave={() => setCursor(null)} data-testid="phone-chart">
          <defs>
            <linearGradient id="phFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#00c867" stopOpacity=".25" />
              <stop offset="1" stopColor="#00c867" stopOpacity="0" />
            </linearGradient>
          </defs>
          <polygon points={`0,60 ${d.pts.map(p => p.join(",")).join(" ")} 180,60`} fill="url(#phFill)" />
          <polyline points={d.pts.map(p => p.join(",")).join(" ")} fill="none" stroke="#00c867" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          <line x1={d.pts[active][0]} y1="4" x2={d.pts[active][0]} y2="60" stroke="#334155" strokeWidth="1" strokeDasharray="3 3" />
          <circle cx={d.pts[active][0]} cy={d.pts[active][1]} r="4" fill="#00c867" stroke="#060d18" strokeWidth="2" />
        </svg>
      </div>
      {/* range selector — clickable */}
      <div className="mt-1 flex justify-center gap-2">
        {(Object.keys(PHONE_RANGES) as (keyof typeof PHONE_RANGES)[]).map((r) => (
          <button key={r} onClick={() => setRange(r)} data-testid={`phone-range-${r}`}
            className={`rounded-full px-2.5 py-1 text-[9px] font-bold transition ${range === r ? "bg-[#00c867] text-white" : "text-slate-500 hover:text-slate-300"}`}>
            {r}
          </button>
        ))}
      </div>
      {/* actions */}
      <div className="mt-3 grid grid-cols-4 gap-1 pb-1 text-center text-[9px] text-slate-300">
        {[
          { I: Plus, label: "Deposit", hot: true },
          { I: RefreshCcw, label: "Pay", hot: false },
          { I: MoveIcon, label: "Move", hot: false },
          { I: MoreHorizontal, label: "More", hot: false },
        ].map(({ I, label, hot }) => (
          <button key={label} className="group" data-testid={`phone-action-${label.toLowerCase()}`}>
            <span className={`mx-auto mb-1 grid h-9 w-9 place-items-center rounded-full transition group-hover:scale-110 ${hot ? "deposit-pulse bg-[#00c867] group-hover:bg-[#00b35b]" : "bg-slate-800 group-hover:bg-slate-700"}`}>
              <I className="h-4 w-4 text-white" />
            </span>
            {_t(label)}
          </button>
        ))}
      </div>
    </div>
  );
}

function MarketTicker(){  const items = [["BTC","Bitcoin"],["ETH","Ethereum"],["USDT","Tether"],["SOL","Solana"],["BNB","BNB"]];
  return (
    <div className="w-full max-w-md space-y-3">
      {items.map(([sym, name]) => (
        <div key={sym} className="flex items-center justify-between rounded-xl border border-border bg-background px-5 py-3.5">
          <span className="flex items-center gap-3"><span className="font-mono text-xs font-bold text-primary">{sym}</span><span className="text-sm">{name}</span></span>
          <span className="font-mono text-xs text-muted-foreground">{_t("Live on Markets →")}</span>
        </div>
      ))}
    </div>
  );
}

export default Index;
