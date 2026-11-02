import { PageShell, CTAButtons } from "./_shell";
import { t as _t } from "@/i18n";
import { ShieldCheck, Users, Award, Globe } from "lucide-react";

const VALUES = [
  { icon: ShieldCheck, title: "Security first", desc: "Your assets are protected by institutional-grade custody, encryption and continuous monitoring." },
  { icon: Users, title: "Built for people", desc: "Whether it's your first euro or your first million, Blockscaner is designed to be clear and simple." },
  { icon: Award, title: "Regulated", desc: "We operate to the highest European compliance and consumer-protection standards." },
  { icon: Globe, title: "European at heart", desc: "Built in Europe, for Europe — in your language, with local support." },
];

export default function About(){
  return (
    <PageShell kicker="About us" title="Making crypto simple, safe and open to everyone" lead="Blockscaner exists so that anyone can take part in the future of money — with clarity, security and control.">
      <div className="pf-grid">
        {VALUES.map((p)=>{ const I=p.icon; return (
          <div key={p.title} className="pf-card">
            <div className="pf-ico"><I className="h-5 w-5"/></div>
            <h3>{_t(p.title)}</h3>
            <p>{_t(p.desc)}</p>
          </div>
        );})}
      </div>
      <div className="pf-section" style={{textAlign:"center"}}>
        <h2 className="pf-h2">{_t("Our mission")}</h2>
        <p className="pf-lead">{_t("To give everyone the freedom to build value with crypto — simply, safely and on their own terms.")}</p>
      </div>
      <CTAButtons/>
    </PageShell>
  );
}
