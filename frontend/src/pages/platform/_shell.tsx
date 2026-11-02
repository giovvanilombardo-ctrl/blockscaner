import SiteLayout from "@/components/site/SiteLayout";
import { t as _t } from "@/i18n";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import "@/platform.css";

/** Shared platform page shell — hero + body. English-first copy. */
export function PageShell({ kicker, title, lead, children }:{ kicker:string; title:string; lead:string; children?:React.ReactNode }){
  return (
    <SiteLayout>
      <section className="pf-hero">
        <p className="pf-kicker">{_t(kicker)}</p>
        <h1 className="pf-title">{_t(title)}</h1>
        <p className="pf-lead">{_t(lead)}</p>
      </section>
      <section className="pf-body">{children}</section>
    </SiteLayout>
  );
}
export function CTAButtons(){
  return (
    <div className="pf-cta">
      <Button asChild size="lg"><Link to="/login?modo=registro">{_t("Get started")}</Link></Button>
      <Button asChild size="lg" variant="outline"><Link to="/support">{_t("Talk to us")}</Link></Button>
    </div>
  );
}
