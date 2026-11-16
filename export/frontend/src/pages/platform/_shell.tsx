import SiteLayout from "@/components/site/SiteLayout";
import "@/platform.css";

/** Shared platform page shell — body only (hero removed). English-first copy. */
export function PageShell({ children, zoom = 1 }:{ kicker?:string; title?:string; lead?:string; children?:React.ReactNode; zoom?:number }){
  const z = zoom !== 1 ? { zoom } as React.CSSProperties : undefined;
  return (
    <SiteLayout>
      <section className="pf-body" style={z}>{children}</section>
    </SiteLayout>
  );
}
export function CTAButtons(){
  return null;
}
