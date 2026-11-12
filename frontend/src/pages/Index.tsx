import { t as _t, lang } from "@/i18n";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowUpRight, ArrowLeftRight, TrendingUp, Wallet, ShieldCheck, Plus, RefreshCcw, ArrowDownUp as MoveIcon, MoreHorizontal, Check } from "lucide-react";
import SiteLayout from "@/components/site/SiteLayout";
import BloomField from "@/components/site/BloomField";

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
        <h1 className="font-display text-4xl md:text-5xl font-light leading-[1.1]">{_t("The most valuable currency is the freedom to choose.")}</h1>
        <div className="md:ml-auto md:max-w-xs border-t border-deep-foreground/50 pt-3">
          <p className="text-sm leading-snug">{_t("Crypto to build value. One account to trade, hold and invest — simply, securely and on your own terms.")}</p>
          <Link to="/login?modo=registro" className="mt-5 inline-block rounded bg-background px-3 py-2 font-mono text-xs uppercase text-foreground">{_t("Get started")}</Link>
        </div>
      </div>
    </section>

    {/* EVERYDAY — "From today's shopping to tomorrow's plans." (reference) */}
    <section className="px-6 lg:px-10 py-20 lg:py-28 bg-white" style={{ zoom: 1.1 }} data-testid="home-everyday">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="font-display text-4xl md:text-5xl font-semibold leading-[1.1] tracking-tight text-foreground">
          {_t("From today's shopping")}<br />{_t("to tomorrow's plans.")}
        </h2>
        <p className="mt-5 text-sm text-muted-foreground max-w-xl mx-auto leading-relaxed">
          {_t("We simplify everyday payments, bills and spending, removing the little hassles so you can focus on your ambitions.")}
        </p>
      </div>

      <div className="mx-auto mt-14 grid max-w-5xl gap-6 md:grid-cols-2">
        {/* CRYPTO card (light) */}
        <div className="relative overflow-hidden rounded-3xl bg-[#f4f6f9] p-8 pb-0 flex flex-col" data-testid="home-crypto-card">
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
            <span className="absolute -left-2 top-0 grid h-20 w-20 place-items-center rounded-full bg-white shadow-lg shadow-slate-900/10">
              <span className="grid h-12 w-12 place-items-center rounded-full bg-[#00c867]"><Check className="h-6 w-6 text-white" strokeWidth={3.5} /></span>
            </span>
            <span className="absolute right-6 -top-4 grid h-16 w-16 place-items-center rounded-full bg-[#e6007a] shadow-lg shadow-slate-900/10">
              <span className="grid grid-cols-2 gap-1">{[0,1,2,3,4,5].map(i => <i key={i} className="h-1.5 w-1.5 rounded-full bg-white/90" />)}</span>
            </span>
            <span className="absolute right-24 top-24 grid h-20 w-20 place-items-center rounded-full bg-white shadow-lg shadow-slate-900/10">
              <svg viewBox="0 0 32 32" className="h-9 w-9"><path d="M9 8 L16 16 L23 8 M9 24 L16 16 L23 24" stroke="#1e293b" strokeWidth="3.4" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </span>
            <span className="absolute right-2 top-20 grid h-12 w-12 place-items-center rounded-full bg-[#2775ca] shadow-lg shadow-slate-900/10">
              <span className="text-white text-sm font-black">$</span>
            </span>
            <span className="absolute bottom-0 right-14 grid h-16 w-16 place-items-center rounded-full bg-[#f7931a] shadow-lg shadow-slate-900/10">
              <span className="text-white text-2xl font-black">₿</span>
            </span>
            <span className="absolute bottom-6 right-40 grid h-11 w-11 place-items-center rounded-full bg-[#3453e0] shadow-lg shadow-slate-900/10">
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

        {/* ACCOUNT card (dark) */}
        <div className="relative overflow-hidden rounded-3xl bg-[#0a1a2f] p-8 pb-0 flex flex-col text-white" data-testid="home-account-card">
          <h3 className="text-xl font-bold leading-snug">
            <span className="text-[#00c867]">ACCOUNT.</span> {_t("Save on what you do every day.")}
          </h3>
          <p className="mt-3 text-xs leading-relaxed text-slate-300 max-w-xs">
            {_t("Salary payments, bank transfers, spending alerts and the Blockscaner Card for everyday spending.")}
          </p>
          <Link to="/products" className="mt-5 inline-flex w-fit items-center gap-1.5 rounded-full bg-primary px-5 py-2.5 text-xs font-bold text-primary-foreground hover:bg-primary/90 transition" data-testid="home-account-cta">
            {_t("Find out more")} <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
          {/* phone mockup */}
          <div className="relative mx-auto mt-8 w-56 rounded-t-[2rem] border-x-[6px] border-t-[6px] border-black bg-[#060d18] px-4 pt-5 pb-0 shadow-2xl">
            <div className="flex items-center justify-between">
              <span className="grid h-6 w-6 place-items-center rounded-full bg-slate-700/70"><span className="h-2.5 w-2.5 rounded-full bg-slate-400" /></span>
              <span className="flex gap-1.5"><span className="h-4 w-4 rounded-full bg-slate-700/70" /><span className="h-4 w-4 rounded-full bg-slate-700/70" /></span>
            </div>
            <p className="mt-3 text-center text-[9px] text-slate-400">{_t("Account")}</p>
            <p className="text-center text-xl font-bold">€6,840.20</p>
            <p className="text-center text-[9px] text-[#00c867]">+6% 30d · <span className="text-slate-400">+13.62%</span></p>
            <svg viewBox="0 0 180 60" className="mt-2 w-full">
              <polyline points="0,42 20,38 34,44 52,30 66,34 84,22 100,28 118,16 136,24 154,12 180,18" fill="none" stroke="#00c867" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <div className="flex justify-center gap-3 text-[8px] text-slate-500"><span>1Y</span><span>1M</span><span className="text-white font-bold">1W</span><span>1D</span></div>
            <div className="mt-3 grid grid-cols-4 gap-1 pb-1 text-center text-[8px] text-slate-300">
              <span><span className="mx-auto mb-1 grid h-7 w-7 place-items-center rounded-full bg-[#00c867]"><Plus className="h-3.5 w-3.5 text-white" /></span>{_t("Deposit")}</span>
              <span><span className="mx-auto mb-1 grid h-7 w-7 place-items-center rounded-full bg-slate-800"><RefreshCcw className="h-3 w-3" /></span>{_t("Pay")}</span>
              <span><span className="mx-auto mb-1 grid h-7 w-7 place-items-center rounded-full bg-slate-800"><MoveIcon className="h-3 w-3" /></span>{_t("Move")}</span>
              <span><span className="mx-auto mb-1 grid h-7 w-7 place-items-center rounded-full bg-slate-800"><MoreHorizontal className="h-3 w-3" /></span>{_t("More")}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Precision trading banner */}
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
        <span className="hidden h-14 w-14 shrink-0 place-items-center rounded-full bg-black sm:grid">
          <Check className="h-7 w-7 text-white" strokeWidth={3.5} />
        </span>
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

function MarketTicker(){
  const items = [["BTC","Bitcoin"],["ETH","Ethereum"],["USDT","Tether"],["SOL","Solana"],["BNB","BNB"]];
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
