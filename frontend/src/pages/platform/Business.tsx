import { PageShell, CTAButtons } from "./_shell";
import { t as _t } from "@/i18n";
import { Building2, Globe2, Landmark, LineChart } from "lucide-react";

const OFFER = [
  { icon: Building2, title: "Corporate treasury", desc: "Put idle capital to work. Allocate a portion of your balance sheet to Bitcoin and digital assets, securely." },
  { icon: Globe2, title: "International payments", desc: "Move value across borders in minutes, not days — with transparent settlement and low cost." },
  { icon: Landmark, title: "Institutional custody", desc: "Segregated, insured custody with dedicated account management and reporting." },
  { icon: LineChart, title: "OTC & execution", desc: "High-touch execution for large orders with deep liquidity and competitive pricing." },
];

export default function Business(){
  return (
    <PageShell kicker="Business" title="Crypto for forward-thinking businesses" lead="Treasury, payments and institutional-grade digital-asset services — built for companies that move first.">
      <div className="pf-grid">
        {OFFER.map((p)=>{ const I=p.icon; return (
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
