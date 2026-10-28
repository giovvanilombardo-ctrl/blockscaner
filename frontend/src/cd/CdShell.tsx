import { useEffect, useState, type ReactNode, type ButtonHTMLAttributes } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Menu, UserRound, Shield, Mail, Phone, MapPin, ArrowLeft, ArrowRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { lang, setLang } from "@/i18n";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import "./cd.css";

/** Inline bilingual text: German first, English second. */
export const L = (de: string, en: string) => (lang === "en" ? en : de);

const sizes = { md: "h-10 px-5 text-sm", lg: "h-11 px-6 text-sm", xl: "h-12 px-8 text-base", sm: "h-8 px-3 text-xs" };
export function CdButton({ variant = "hero", size = "md", className, ...p }: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "hero" | "outline" | "ghost"; size?: keyof typeof sizes }) {
  const v = variant === "hero"
    ? "bg-gradient-primary text-primary-foreground font-semibold shadow-lg hover:opacity-90 hover:glow-sm"
    : variant === "outline" ? "border border-border bg-background/40 text-foreground hover:bg-secondary" : "text-foreground hover:bg-secondary";
  return <button {...p} className={cn("inline-flex items-center justify-center gap-2 rounded-full transition-all", sizes[size], v, className)} />;
}

export const cdLinks = [
  { to: "/cd/ueber-uns", de: "Über uns", en: "About us" },
  { to: "/cd/methodik", de: "Methodik", en: "Methodology" },
  { to: "/cd/werkzeuge", de: "Werkzeuge", en: "Tools" },
  { to: "/cd/rechtliches", de: "Rechtliches", en: "Legal" },
  { to: "/cd/trends", de: "Trends", en: "Trends" },
  { to: "/cd/nachrichten", de: "Nachrichten", en: "News" },
];

export function CdNav() {
  const [on, setOn] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setOn(Boolean(data.session)));
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setOn(Boolean(s)));
    return () => { sub.subscription.unsubscribe(); };
  }, []);
  useEffect(() => {
    const u = () => setScrolled(window.scrollY > 24);
    u(); window.addEventListener("scroll", u, { passive: true });
    return () => window.removeEventListener("scroll", u);
  }, []);
  return (
    <div className={`site-nav-shell ${scrolled ? "site-nav-shell-scrolled" : ""}`}>
      <nav className="container mx-auto flex items-center justify-between gap-2 px-4 py-4 sm:gap-4 sm:px-6 sm:py-6" aria-label={L("Hauptnavigation", "Main navigation")}>
        <Link to="/cd" className="font-display text-lg font-bold text-gradient sm:text-2xl" aria-label="Blockscaner">Blockscaner</Link>
        <div className="hidden items-center gap-5 lg:flex">
          {cdLinks.map((e) => (
            <NavLink key={e.to} to={e.to} className={({ isActive }) => cn("site-nav-link text-sm transition-colors hover:text-foreground", isActive ? "site-nav-link-active text-foreground" : "text-muted-foreground")}>
              {L(e.de, e.en)}
            </NavLink>
          ))}
        </div>
        <div className="flex items-center gap-1.5 sm:gap-2">
          <button onClick={() => setLang(lang === "de" ? "en" : "de")} className="h-8 rounded-full px-2 text-xs font-semibold text-muted-foreground hover:text-foreground" aria-label="Sprache / Language">
            {lang === "de" ? "EN" : "DE"}
          </button>
          <Link to={on ? "/account" : "/login"}>
            <CdButton variant="outline" className={cn("h-8 px-2.5 text-[11px] sm:h-9 sm:px-4 sm:text-sm", on && "site-account-button")}>
              <UserRound className="hidden h-4 w-4 sm:block" />
              {on ? L("Mein Bereich", "My area") : L("Anmelden", "Sign in")}
            </CdButton>
          </Link>
          <Link to={on ? "/cd/kontakt" : "/login"}>
            <CdButton className="h-8 px-2.5 text-[11px] sm:h-9 sm:px-5 sm:text-sm">
              {on ? L("Kostenlose Beratung", "Free consultation") : L("Konto erstellen", "Create account")}
            </CdButton>
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger asChild className="lg:hidden">
              <button className="inline-flex h-9 w-9 items-center justify-center rounded-full hover:bg-secondary" aria-label={L("Menü öffnen", "Open menu")}><Menu className="h-5 w-5" /></button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              {cdLinks.map((e) => <DropdownMenuItem key={e.to} asChild><Link to={e.to}>{L(e.de, e.en)}</Link></DropdownMenuItem>)}
              <DropdownMenuItem asChild><Link to="/cd/bedingungen">{L("Bedingungen", "Terms")}</Link></DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </nav>
    </div>
  );
}

export function CdFooter() {
  const nav = [
    ["/cd", "Startseite", "Home"], ["/cd/ueber-uns", "Über uns", "About us"], ["/cd/methodik", "Methodik", "Methodology"],
    ["/cd/werkzeuge", "Werkzeuge", "Tools"], ["/cd/rechtliches", "Recht und Compliance", "Legal and compliance"], ["/cd/trends", "Trends", "Trends"],
    ["/cd/nachrichten", "Nachrichten", "News"], ["/cd/kontakt", "Kontakt", "Contact"], ["/cd/datenschutz", "Datenschutz", "Privacy"], ["/cd/bedingungen", "Bedingungen", "Terms"],
  ];
  return (
    <footer className="border-t border-border/40 bg-card/30">
      <div className="container mx-auto grid gap-10 px-6 py-14 md:grid-cols-4">
        <div className="md:col-span-2">
          <span className="font-display text-xl font-bold text-gradient">Blockscaner</span>
          <p className="mt-4 max-w-md text-sm text-muted-foreground">
            {L("Blockchain-Datenplattform, gegründet 2014 mit Sitz in Lugano (Schweiz). Wir verwandeln pseudonyme Adressen in identifizierte, risikobewertete Entitäten für Ermittler, Aufsichtsbehörden, Finanzinstitute und Betrugsopfer.",
               "Blockchain data platform founded in 2014 and based in Lugano (Switzerland). We turn pseudonymous addresses into identified, risk-scored entities for investigators, regulators, financial institutions and fraud victims.")}
          </p>
          <div className="mt-5 flex items-center gap-2 text-xs text-muted-foreground">
            <Shield className="h-4 w-4 text-primary" />
            {L("Europäischer Rahmen: DSGVO · MiCA · digitale Beweise · Sicherheit und Nachvollziehbarkeit", "European context: GDPR · MiCA · digital evidence · security and traceability")}
          </div>
        </div>
        <div>
          <h2 className="mb-4 text-sm font-semibold">{L("Navigation", "Navigation")}</h2>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {nav.map(([to, de, en]) => <li key={to}><Link to={to} className="transition-colors hover:text-foreground">{L(de, en)}</Link></li>)}
          </ul>
        </div>
        <div>
          <h2 className="mb-4 text-sm font-semibold">{L("Kontakt", "Contact")}</h2>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li className="flex items-center gap-2"><Mail className="h-4 w-4 text-primary" />support@ciberdelito.org</li>
            <li className="flex items-center gap-2"><Phone className="h-4 w-4 text-primary" /><a href="tel:+41445052173" className="transition-colors hover:text-primary">+41 44 505 2173</a></li>
            <li className="flex items-start gap-2"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />Via Carlo Maderno 23, 6900 Lugano, {L("Schweiz", "Switzerland")}</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border/40 py-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Blockscaner. {L("Alle Rechte vorbehalten.", "All rights reserved.")}
      </div>
    </footer>
  );
}

export function CdRoot({ children }: { children: ReactNode }) {
  return <div className="cd-root soft-site-shell min-h-screen overflow-hidden bg-background"><CdNav />{children}<CdFooter /></div>;
}

export function CdBack() {
  const nav = useNavigate();
  return (
    <button onClick={() => (window.history.length > 1 ? nav(-1) : nav("/cd"))} className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground">
      <ArrowLeft className="h-4 w-4" />{L("Zurück", "Back")}
    </button>
  );
}

export function CdPageShell({ children, atmospheric = false }: { children: ReactNode; atmospheric?: boolean }) {
  return (
    <CdRoot>
      <main className={`motion-page-enter${atmospheric ? " atmospheric-flow" : ""}`}>
        <div className="container mx-auto px-6 pt-6"><CdBack /></div>
        {children}
        <section className="bg-primary text-primary-foreground">
          <div className="container mx-auto flex flex-col items-start justify-between gap-6 px-6 py-10 md:flex-row md:items-center">
            <div>
              <p className="mb-2 text-xs font-bold uppercase tracking-widest opacity-70">{L("Vertraulicher Kanal", "Confidential channel")}</p>
              <h2 className="font-display text-2xl font-semibold md:text-3xl">{L("Brauchen Sie Hilfe bei Ihrem Fall?", "Need help with your case?")}</h2>
            </div>
            <Link to="/cd/kontakt" className="group inline-flex h-11 items-center gap-2 rounded-full bg-page-ink px-6 font-semibold text-foreground hover:bg-page-forest">
              {L("Mit einem Experten sprechen", "Talk to an expert")}<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </section>
      </main>
    </CdRoot>
  );
}
