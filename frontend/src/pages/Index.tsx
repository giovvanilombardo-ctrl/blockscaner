import { t as _t, lang, setLang, LANGS } from "@/i18n";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowUpRight, ArrowLeftRight, TrendingUp, Wallet, ShieldCheck } from "lucide-react";
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
      <div className="absolute top-5 right-6 lg:right-10 z-10 flex items-center rounded-full border border-deep-foreground/30 bg-deep-foreground/10 backdrop-blur-sm overflow-hidden text-[11px] font-mono uppercase tracking-widest">
        {LANGS.map((l, i) => (
          <span key={l.code} className="flex items-center">
            {i > 0 && <span className="opacity-40 px-1">·</span>}
            <button
              onClick={() => setLang(l.code)}
              aria-pressed={lang === l.code}
              data-testid={`hero-lang-${l.code}`}
              className={`px-2.5 py-1.5 transition-colors ${lang === l.code ? "bg-background text-foreground font-semibold" : "text-deep-foreground/80 hover:text-deep-foreground"}`}
            >
              {l.label}
            </button>
          </span>
        ))}
      </div>
      <div className="relative mx-auto w-full max-w-5xl px-6 lg:px-10 py-24 grid gap-10 md:grid-cols-2 items-center">
        <h1 className="font-display text-4xl md:text-5xl font-light leading-[1.1]">{_t("The most valuable currency is the freedom to choose.")}</h1>
        <div className="md:ml-auto md:max-w-xs border-t border-deep-foreground/50 pt-3">
          <p className="text-sm leading-snug">{_t("Crypto to build value. One account to trade, hold and invest — simply, securely and on your own terms.")}</p>
          <Link to="/login?modo=registro" className="mt-5 inline-block rounded bg-background px-3 py-2 font-mono text-xs uppercase text-foreground">{_t("Get started")}</Link>
        </div>
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
