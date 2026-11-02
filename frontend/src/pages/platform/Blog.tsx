import { PageShell, CTAButtons } from "./_shell";
import { t as _t } from "@/i18n";
import { BookOpen } from "lucide-react";

const POSTS = [
  { tag:"Markets", title:"Bitcoin at a glance: what moves the price", desc:"The key drivers behind BTC price action — liquidity, macro, and on-chain signals.", date:"This week" },
  { tag:"Investing", title:"Dollar-cost averaging, explained simply", desc:"Why steady, recurring buys can smooth volatility and build wealth over time.", date:"This week" },
  { tag:"Security", title:"Five habits that keep your crypto safe", desc:"From two-factor authentication to spotting phishing — the essentials every holder needs.", date:"This month" },
  { tag:"Products", title:"Swap vs. trade: when to use which", desc:"The difference between instant swaps and order-book trading, and when each wins.", date:"This month" },
];

export default function Blog(){
  return (
    <PageShell kicker="Blog" title="Insights for smarter crypto decisions" lead="Guides, market explainers and product updates — written to make crypto make sense.">
      <div className="pf-grid">
        {POSTS.map((p)=>(
          <div key={p.title} className="pf-card">
            <div className="pf-ico"><BookOpen className="h-5 w-5"/></div>
            <p className="pf-kicker" style={{margin:".6rem 0 .3rem"}}>{_t(p.tag)}</p>
            <h3>{_t(p.title)}</h3>
            <p>{_t(p.desc)}</p>
            <p style={{fontSize:".72rem",color:"#94a3b8",marginTop:".8rem"}}>{_t(p.date)}</p>
          </div>
        ))}
      </div>
      <CTAButtons/>
    </PageShell>
  );
}
