import { ReactNode } from "react";
import Environment, { EnvVariant } from "./Environment";

const PageHero = ({ index, label, title, lead, env, children }: { index: string; label: string; title: string; lead: string; env: EnvVariant; children?: ReactNode }) => (
  <section className="relative overflow-hidden border-b border-border">
    <Environment variant={env} className="opacity-80" />
    <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/20" aria-hidden="true" />
    <div className="relative px-6 lg:px-10 pt-20 pb-16 lg:pt-28 lg:pb-24 grid lg:grid-cols-12 gap-8">
      <div className="lg:col-span-1 font-mono text-xs text-muted-foreground pt-2">{index}</div>
      <div className="lg:col-span-8">
        <p className="eyebrow mb-6">{label}</p>
        <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-medium leading-[1.05] tracking-tight max-w-4xl">{title}</h1>
        <p className="mt-8 text-lg text-muted-foreground max-w-2xl leading-relaxed">{lead}</p>
        {children && <div className="mt-10">{children}</div>}
      </div>
    </div>
  </section>
);

export default PageHero;
