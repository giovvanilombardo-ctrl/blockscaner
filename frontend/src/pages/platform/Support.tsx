import { PageShell, CTAButtons } from "./_shell";
import { t as _t } from "@/i18n";
import { Link } from "react-router-dom";
import { LifeBuoy, MessageSquare, Mail, HelpCircle } from "lucide-react";

const CARDS = [
  { icon: MessageSquare, title: "Chat with us", desc: "Get instant help from our assistant — 24/7, in your language.", to:"/chat", cta:"Open chat" },
  { icon: HelpCircle, title: "Help centre", desc: "Guides and answers on trading, your wallet, security and your account.", to:"/hilfe", cta:"Browse help" },
  { icon: Mail, title: "Contact us", desc: "Reach the team directly — we reply within one business day.", to:"/contact", cta:"Contact" },
  { icon: LifeBuoy, title: "Account support", desc: "Issues signing in, verification or payouts? We're here to help.", to:"/kundenservice", cta:"Get support" },
];

export default function Support(){
  return (
    <PageShell kicker="Support" title="We're here to help" lead="Real people and instant answers — whenever you need a hand with your account, your wallet or a trade.">
      <div className="pf-grid">
        {CARDS.map((p)=>{ const I=p.icon; return (
          <div key={p.title} className="pf-card">
            <div className="pf-ico"><I className="h-5 w-5"/></div>
            <h3>{_t(p.title)}</h3>
            <p>{_t(p.desc)}</p>
            <Link to={p.to} className="pf-card-link" style={{display:"inline-block",marginTop:".8rem",color:"#1663d9",fontWeight:600,fontSize:".85rem"}}>{_t(p.cta)} →</Link>
          </div>
        );})}
      </div>
      <CTAButtons/>
    </PageShell>
  );
}
