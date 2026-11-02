import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { t as _t } from "@/i18n";
import SiteLayout from "@/components/site/SiteLayout";
import Seo from "@/components/Seo";
import {
  Play, GraduationCap, Users, ArrowDownUp, Landmark, Code2, Scale,
  ArrowUpRight, Flame, BadgePercent, Star,
} from "lucide-react";
import coinBtc from "@/assets/coins/bitcoin.png";
import coinEth from "@/assets/coins/ethereum.png";
import coinUsdt from "@/assets/coins/tether.png";
import coinUsdc from "@/assets/coins/usd-coin.png";
import coinXrp from "@/assets/coins/ripple.png";
import coinDot from "@/assets/coins/polkadot.png";
import coinEur from "@/assets/coins/euro.png";
import "@/platform.css";

const COIN_PHOTOS: Record<string, string> = {
  bitcoin: coinBtc, ethereum: coinEth, tether: coinUsdt,
  "usd-coin": coinUsdc, ripple: coinXrp, polkadot: coinDot, euro: coinEur,
};

type Coin = { id: string; name: string; symbol: string; image: string };

/* fetch top coins once (backend-cached) to drive the floating coins + marquee */
function useCoins(): Coin[] {
  const [coins, setCoins] = useState<Coin[]>([]);
  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/market/coins?per_page=40&page=1`)
      .then((r) => (r.ok ? r.json() : []))
      .then((j) => { if (Array.isArray(j)) setCoins(j.slice(0, 20)); })
      .catch(() => {});
  }, []);
  return coins;
}

/* scroll-reveal: adds .in when the element enters the viewport */
function Reveal({ children, className = "", delay = 0, ...rest }: any) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { el.classList.add("in"); obs.disconnect(); } },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} className={`rv ${className}`} style={{ transitionDelay: `${delay}ms` }} {...rest}>
      {children}
    </div>
  );
}

/* animated number for the stat cards */
function CountUp({ to, suffix }: { to: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [val, setVal] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      obs.disconnect();
      const t0 = performance.now();
      const tick = (t: number) => {
        const k = Math.min(1, (t - t0) / 1400);
        setVal(Math.round(to * (1 - Math.pow(1 - k, 3))));
        if (k < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, { threshold: 0.4 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [to]);
  return <span ref={ref}>{val}{suffix}</span>;
}

/* exact reference layout: photorealistic coin renders lying on the black surface */
const HERO_SLOTS = [
  { coin: "ripple", top: "13%", left: "3%", size: 185, rz: -8, depth: 1.0, d: 1.2, anim: "b" },
  { coin: "usd-coin", top: "1.5%", left: "3.5%", size: 440, rz: 4, depth: 1.8, d: 0, anim: "a" },
  { coin: "tether", top: "32%", left: "4.5%", size: 210, rz: -5, depth: 1.2, d: 2.1, anim: "c" },
  { coin: "polkadot", top: "44%", right: "16%", size: 165, rz: 6, depth: 0.9, d: 0.6, anim: "d" },
  { coin: "ethereum", bottom: "30%", right: "8%", size: 205, rz: 5, depth: 1.1, d: 1.5, anim: "b" },
  { coin: "bitcoin", bottom: "-4%", right: "5%", size: 390, rz: -4, depth: 1.5, d: 0.9, anim: "c" },
];

function ReportBtn({ id }: { id: string }) {
  return (
    <Link to="/contact?topic=report" className="bz-pill" data-testid={id}>
      {_t("Download the Report")}
    </Link>
  );
}

export default function Business() {
  const coins = useCoins();

  return (
    <SiteLayout>
      <Seo
        title={`${_t("Business")}: ${_t("crypto treasury, payments and team training")} | Blockscaner`}
        description={_t("Put crypto to work for your company: treasury diversification, crypto payments settled in Euro, OTC desk, staking and tailored team training on Blockscaner.")}
      />
      <div className="bz-page" data-testid="business-page">

        {/* ---------- HERO (photo 5) ---------- */}
        <section className="bz-hero">
          {HERO_SLOTS.map((s, i) => {
            const { coin, size, d, rz, depth, anim, ...pos } = s as any;
            return (
              <div key={coin} className="bz-coin-par" style={{ ...pos } as any}>
                <div className="bz-coin-tilt" style={{ width: size, height: size, "--rz": `${rz}deg` } as any}>
                  <div className="bz-coin-spin" style={{ animationName: `bz-drift-${anim}`, animationDelay: `${d}s`, animationDuration: `${7 + i * 0.7}s` }}>
                    <img src={COIN_PHOTOS[coin]} alt={coin} className="bz-coin-photo" loading="lazy" />
                  </div>
                </div>
              </div>
            );
          })}
          {/* big euro coin render, flat on the surface */}
          <div className="bz-coin-par bz-euro-par" style={{ bottom: "-10%", right: "17%" } as any}>
            <div className="bz-coin-tilt" style={{ width: 340, height: 340, "--rz": "3deg" } as any}>
              <div className="bz-coin-spin" style={{ animationName: "bz-drift-d", animationDelay: "1.7s", animationDuration: "8.5s" }}>
                <img src={coinEur} alt="Euro" className="bz-coin-photo" loading="lazy" />
              </div>
            </div>
          </div>
          <Reveal className="bz-hero-in">
            <h1 className="bz-h1">
              {_t("Your company's")}<br />
              <span className="bz-accent">{_t("strategic asset")}</span> {_t("is crypto")}
            </h1>
            <p className="bz-sub">
              {_t("Book a meeting with our Account Manager and discover tailored solutions for your business.")}
            </p>
            <Link to="/contact" className="bz-cta" data-testid="business-contact-btn">{_t("Contact us")}</Link>
          </Reveal>
          <div className="bz-tp" data-testid="business-trustpilot">
            <p className="bz-tp-head"><Star className="h-3.5 w-3.5" fill="#00b67a" strokeWidth={0} /> Trustpilot</p>
            <div className="bz-tp-stars">
              {[0, 1, 2, 3, 4].map((i) => (
                <span key={i} className="bz-tp-star"><Star className="h-3 w-3" fill="#fff" strokeWidth={0} /></span>
              ))}
            </div>
            <p className="bz-tp-sub">{_t("Rated by our users")}</p>
          </div>
        </section>

        {/* ---------- TRUSTED BY (photo 4) ---------- */}
        <section className="bz-trusted">
          <Reveal><h2 className="bz-h2">{_t("Trusted by")}</h2></Reveal>
          <div className="bz-marquee" data-testid="business-marquee">
            <div className="bz-marquee-track">
              {[...coins, ...coins].map((c, i) => (
                <span key={`${c.id}-${i}`} className="bz-marquee-item">
                  <img src={c.image} alt="" loading="lazy" /> {c.name}
                </span>
              ))}
            </div>
          </div>
          <div className="bz-stats">
            <Reveal className="bz-stat" delay={0}>
              <p className="bz-stat-label">{_t("Empowering success")}</p>
              <p className="bz-stat-num" data-testid="business-stat-clients"><CountUp to={300} suffix="+" /></p>
              <p className="bz-stat-sub">{_t("Business clients")}</p>
            </Reveal>
            <Reveal className="bz-stat" delay={120}>
              <p className="bz-stat-label">{_t("Preferred by professionals")}</p>
              <p className="bz-stat-num" data-testid="business-stat-users"><CountUp to={2} suffix="M+" /></p>
              <p className="bz-stat-sub">{_t("Users")}</p>
            </Reveal>
          </div>
        </section>

        {/* ---------- TREASURY (photo 4 bottom + photo 3) ---------- */}
        <section className="bz-section">
          <Reveal>
            <h2 className="bz-h2">{_t("Diversify your company's treasury with crypto")}</h2>
            <p className="bz-sub">
              {_t("Allocate part of your company's liquidity to digital assets with growth potential, thanks to staking, 24/7 markets and instant liquidity.")}
            </p>
          </Reveal>
          <Reveal className="bz-banner bz-banner-green">
            <div>
              <p className="bz-banner-title">
                {_t("Make crypto a")} <span className="bz-accent">{_t("differentiating asset")}</span> {_t("in your balance sheet.")}
              </p>
              <p className="bz-banner-sub">{_t("Integrate crypto into your financial strategy to optimise capital and unlock new opportunities.")}</p>
            </div>
            <ReportBtn id="business-report-treasury" />
          </Reveal>

          <div className="bz-grid-2">
            <Reveal className="bz-card bz-card-blue">
              <h3>{_t("Move large capital with our")} <span className="bz-accent">{_t("OTC Desk")}</span></h3>
              <p>{_t("Reduce trading costs and minimise volatility risks. The OTC service enables efficient and secure management of significant capital.")}</p>
              <div className="bz-otc-art">
                <span className="bz-tag bz-tag-up"><ArrowUpRight className="h-3 w-3" /> {_t("Less fee")}</span>
                <div className="bz-otc-coin">
                  {coins[0] && <img src={coins[0].image} alt={coins[0].name} />}
                </div>
                <span className="bz-tag bz-tag-down"><ArrowDownUp className="h-3 w-3" /> {_t("Less risks")}</span>
                <div className="bz-otc-arrow bz-otc-arrow-a" />
                <div className="bz-otc-arrow bz-otc-arrow-b" />
              </div>
            </Reveal>
            <Reveal className="bz-card" delay={120}>
              <p className="bz-accent bz-card-kicker">{_t("Sub-account")}</p>
              <h3>{_t("Maximum control and flexibility")}</h3>
              <p>{_t("Manage access and functionalities for each company team with Sub-accounts. Organise operations across multiple accounts and optimise reporting while maintaining complete control.")}</p>
              <div className="bz-people-art">
                <div className="bz-person bz-person-1"><Users className="h-6 w-6" /></div>
                <div className="bz-person bz-person-2"><Users className="h-5 w-5" /></div>
                <div className="bz-person bz-person-3"><Users className="h-4 w-4" /></div>
                <div className="bz-podium" />
              </div>
            </Reveal>
          </div>

          <div className="bz-grid-2">
            <Reveal className="bz-card">
              <h3>{_t("Staking: up to 18% APY")}</h3>
              <p>{_t("Turn a passive resource into a productive asset, maximising returns on your crypto reserves. Staking allows you to support network security and earn rewards.")}</p>
              <Link to="/contact?topic=report" className="bz-link" data-testid="business-staking-report">{_t("Download the Report")} <ArrowUpRight className="h-4 w-4" /></Link>
              <div className="bz-phone">
                <div className="bz-phone-head"><BadgePercent className="h-4 w-4" /> {_t("Staking")}</div>
                <div className="bz-phone-row">
                  <span>{_t("Proof of Stake")}</span>
                  {coins.find((c) => c.id === "solana") && <img src={coins.find((c) => c.id === "solana")!.image} alt="Solana" />}
                  <Flame className="h-4 w-4 bz-flame" />
                </div>
                <div className="bz-phone-row">
                  <span>{_t("Liquid Staking")}</span>
                  {coins.find((c) => c.id === "ethereum") && <img src={coins.find((c) => c.id === "ethereum")!.image} alt="Ethereum" />}
                </div>
              </div>
            </Reveal>
            <Reveal className="bz-card bz-card-green" delay={120}>
              <p className="bz-card-kicker">{_t("Loyalty Program")}</p>
              <h3>{_t("Join the clubs to buy and sell crypto with reduced fees, enjoy numerous benefits and earn rewards on every trade.")}</h3>
              <Link to="/products" className="bz-link" data-testid="business-loyalty-link">{_t("Learn more")} <ArrowUpRight className="h-4 w-4" /></Link>
            </Reveal>
          </div>
        </section>

        {/* ---------- PAYMENTS (photo 2) ---------- */}
        <section className="bz-section">
          <Reveal>
            <h2 className="bz-h2">{_t("Manage crypto payments")}</h2>
            <p className="bz-sub">
              {_t("Lower fees than traditional systems, real-time transactions, and the ability to use stablecoins like USDC to ensure value stability.")}
            </p>
          </Reveal>
          <Reveal className="bz-banner bz-banner-blue">
            <div>
              <p className="bz-banner-title">
                {_t("Cut")} <span className="bz-accent">{_t("costs")}</span> {_t("and accelerate")} <span className="bz-accent">{_t("global transactions")}</span> {_t("with crypto.")}
              </p>
              <p className="bz-banner-sub">{_t("Discover a new standard for financial transactions.")}</p>
            </div>
            <ReportBtn id="business-report-payments" />
          </Reveal>

          <Reveal className="bz-card bz-settle">
            <div className="bz-settle-copy">
              <p className="bz-card-kicker">{_t("Only Euro")}</p>
              <h3>{_t("Receive crypto, settle in Euro")}</h3>
              <p>{_t("Automatically convert cryptocurrency payments into Euros to eliminate market fluctuation risks. Ensure revenue stability and predictability with a system immune to volatility.")}</p>
              <Link to="/contact" className="bz-link" data-testid="business-settle-contact">{_t("Talk to us")} <ArrowUpRight className="h-4 w-4" /></Link>
            </div>
            <div className="bz-settle-art">
              <div className="bz-flow bz-flow-a">
                <span className="bz-flow-tag">{_t("Send Bitcoin")}</span>
                <div className="bz-coin-static"><div className="bz-coin-face">{coins[0] && <img src={coins[0].image} alt="Bitcoin" />}<span className="bz-glare" /></div></div>
              </div>
              <div className="bz-flow-arrow" />
              <div className="bz-flow bz-flow-b">
                <span className="bz-flow-tag">{_t("Receive Euro")}</span>
                <div className="bz-coin-static"><div className="bz-coin-face bz-face-eur"><span className="bz-eur-sign-sm">€</span><span className="bz-glare" /></div></div>
              </div>
            </div>
          </Reveal>
        </section>

        {/* ---------- TRAINING (photo 1) ---------- */}
        <section className="bz-section">
          <Reveal>
            <h2 className="bz-h2">{_t("Train your team on Crypto and Blockchain")}</h2>
            <p className="bz-sub">{_t("Invest in your company's future with customised e-learning courses for every department.")}</p>
          </Reveal>
          <Reveal className="bz-banner bz-banner-dark">
            <div>
              <p className="bz-banner-title">
                <span className="bz-accent">{_t("Blockchain:")}</span> {_t("the innovation transforming the")} <span className="bz-accent">{_t("job market.")}</span>
              </p>
              <p className="bz-banner-sub">{_t("A technology that is revolutionising industries and career opportunities.")}</p>
            </div>
            <ReportBtn id="business-report-training" />
          </Reveal>

          <div className="bz-grid-2">
            <Reveal className="bz-card bz-card-green">
              <h3><span className="bz-accent">{_t("E-learning")}</span> {_t("courses for your employees")}</h3>
              <div className="bz-video" data-testid="business-video-card">
                <div className="bz-video-globe" />
                <div className="bz-video-play"><Play className="h-6 w-6" /></div>
                <div className="bz-video-bar"><span /></div>
                <p className="bz-video-title">{_t("The Blockchain")}</p>
              </div>
            </Reveal>
            <Reveal className="bz-card bz-card-purple" delay={120}>
              <h3><span className="bz-accent-2">{_t("Academy")}</span> {_t("for clients")}</h3>
              <p>{_t("A tailor-made programme to train your clients, strengthening their trust in using your services.")}</p>
              <Link to="/blog" className="bz-link" data-testid="business-academy-link">{_t("Discover the Academy")}</Link>
              <div className="bz-academy">
                <div className="bz-academy-win">
                  <div className="bz-academy-dots"><i /><i /><i /></div>
                  <p className="bz-academy-h">{_t("Wyckoff Theory: what it is and how it works")}</p>
                  <div className="bz-academy-line" /><div className="bz-academy-line short" />
                  <div className="bz-academy-thumbs"><span /><span /><span /></div>
                </div>
                <div className="bz-cap"><GraduationCap className="h-10 w-10" /></div>
              </div>
            </Reveal>
          </div>

          <div className="bz-grid-3">
            {[
              { icon: Landmark, title: "Finance Workshop", desc: "Integration of blockchain-based assets into corporate finance and treasury processes.", id: "business-workshop-finance" },
              { icon: Code2, title: "IT Workshop", desc: "Implementation of blockchain and DLT infrastructure with your technical team.", id: "business-workshop-it" },
              { icon: Scale, title: "Legal Workshop", desc: "Ensuring business compliance with crypto-asset regulation, MiCA and reporting duties.", id: "business-workshop-legal" },
            ].map((wk, i) => { const I = wk.icon; return (
              <Reveal key={wk.id} className="bz-card bz-workshop" delay={i * 120}>
                <div className="bz-workshop-ico"><I className="h-5 w-5" /></div>
                <h3>{_t(wk.title)}</h3>
                <p>{_t(wk.desc)}</p>
                <Link to="/contact?topic=workshop" className="bz-link" data-testid={wk.id}>{_t("Request info")} <ArrowUpRight className="h-4 w-4" /></Link>
              </Reveal>
            );})}
          </div>
        </section>

        {/* ---------- FINAL CTA ---------- */}
        <Reveal className="bz-final">
          <h2 className="bz-h2">{_t("Ready to make crypto work for your business?")}</h2>
          <p className="bz-sub">{_t("Book a meeting with our Account Manager and discover tailored solutions for your company.")}</p>
          <Link to="/contact" className="bz-cta" data-testid="business-final-cta">{_t("Contact us")}</Link>
        </Reveal>
      </div>
    </SiteLayout>
  );
}
