import { PageShell, CTAButtons } from "./_shell";
import { t as _t } from "@/i18n";
import { ArrowLeftRight, Wallet, TrendingUp, ShieldCheck, CreditCard, Layers } from "lucide-react";

const PRODUCTS = [
  { icon: ArrowLeftRight, title: "Trade", desc: "Buy, sell and swap crypto instantly at live market rates with transparent, low fees." },
  { icon: Wallet, title: "Wallet", desc: "Hold Bitcoin, Ethereum, stablecoins and more in one secure, self-contained wallet." },
  { icon: TrendingUp, title: "Invest", desc: "Build long-term wealth with recurring buys, portfolios and yield on your holdings." },
  { icon: Layers, title: "Portfolio", desc: "Track every asset and its euro value in one clear, real-time dashboard." },
  { icon: CreditCard, title: "Card", desc: "Spend your balance anywhere with a card linked directly to your account." },
  { icon: ShieldCheck, title: "Security", desc: "Institutional-grade custody, encryption and account protection by default." },
];

export default function Products(){
  return (
    <PageShell kicker="Products" title="Everything you need to trade and invest in crypto" lead="One account to buy, hold, swap and grow your crypto — built for clarity, security and control.">
      <div className="pf-grid">
        {PRODUCTS.map((p)=>{ const I=p.icon; return (
          <div key={p.title} className="pf-card">
            <div className="pf-ico"><I className="h-5 w-5"/></div>
            <h3>{_t(p.title)}</h3>
            <p>{_t(p.desc)}</p>
          </div>
        );})}
      </div>
      <CTAButtons/>
    </PageShell>
  );
}
