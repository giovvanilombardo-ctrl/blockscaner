import { t as _t, lang, setLang } from "@/i18n";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, Search, X, LifeBuoy, ChevronDown, UserRound, LayoutDashboard } from "lucide-react";
import { sections } from "@/content/site";
import SearchDialog from "./SearchDialog";
import { supabase } from "@/integrations/supabase/client";

export const BrandMark = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
    <rect x="1" y="1" width="30" height="30" fill="none" stroke="currentColor" strokeWidth="1.2" />
    <path d="M8 8h9a4 4 0 0 1 0 8H8zM8 16h10a4 4 0 0 1 0 8H8z" fill="none" stroke="currentColor" strokeWidth="1.6" />
    <circle cx="24.5" cy="7.5" r="1.6" className="fill-primary" />
  </svg>
);

const SiteHeader = () => {
  const [open, setOpen] = useState<string | null>(null);
  const [mobile, setMobile] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const loc = useLocation();

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setLoggedIn(!!data.session));
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setLoggedIn(!!s));
    return () => { sub.subscription.unsubscribe(); };
  }, []);

  useEffect(() => { setOpen(null); setMobile(false); }, [loc.pathname]);
  useEffect(() => {
    const k = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") { e.preventDefault(); setSearchOpen(true); }
      if (e.key === "Escape") setOpen(null);
    };
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur-md" onMouseLeave={() => setOpen(null)}>
      <div className="hidden md:flex h-8 items-center justify-between border-b border-border px-6 lg:px-10 text-[11px] font-mono uppercase tracking-[0.14em] text-muted-foreground">
        <span>{_t("Unabhängige Aufklärung · Digitale Forensik · Blockchain-Analyse")}</span>
        <div className="flex items-center gap-5">
          <Link to="/login" className="text-primary">{_t("Kundenportal")}</Link>
          <span aria-label={_t("Sprache")} className="flex items-center gap-1">
            <button onClick={() => setLang("de")} aria-pressed={lang === "de"} className={lang === "de" ? "text-foreground font-semibold" : "text-primary"}>DE</button>
            <span>/</span>
            <button onClick={() => setLang("en")} aria-pressed={lang === "en"} className={lang === "en" ? "text-foreground font-semibold" : "text-primary"}>EN</button>
          </span>
        </div>
      </div>
      <div className="flex h-16 items-center justify-between gap-6 px-6 lg:px-10">
        <Link to="/" className="flex items-center gap-3 shrink-0" aria-label={_t("Blockscaner – Startseite")}>
          <BrandMark className="h-7 w-7 text-foreground" />
          <span className="font-display text-lg font-semibold tracking-tight" style={{ fontStretch: "112%" }}>Blockscaner</span>
          <span className="hidden 2xl:inline eyebrow border-l border-border pl-3">{_t("Institut für digitale Aufklärung")}</span>
        </Link>

        <nav aria-label={_t("Hauptnavigation")} className="hidden lg:block">
          <ul className="flex items-center">
            {sections.map((s) => (
              <li key={s.key}>
                <button
                  type="button"
                  aria-expanded={open === s.key}
                  onMouseEnter={() => setOpen(s.key)}
                  onFocus={() => setOpen(s.key)}
                  onClick={() => setOpen(open === s.key ? null : s.key)}
                  className={`flex items-center gap-1 whitespace-nowrap px-2.5 py-2 text-[13px] transition-colors ${loc.pathname.startsWith(s.path) ? "text-foreground" : "text-primary"}`}
                >
                  {s.label.split(" & ")[0].replace("Hilfe für Betroffene","Hilfe").replace("Blockchain Intelligence","Intelligence")}
                  <ChevronDown className={`h-3 w-3 transition-transform ${open === s.key ? "rotate-180" : ""}`} />
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <button onClick={() => setSearchOpen(true)} className="flex items-center gap-2 border border-border px-3 py-2 text-xs text-primary hover:border-primary transition" aria-label={_t("Suche öffnen")}>
            <Search className="h-3.5 w-3.5" />
            <span className="hidden xl:inline">{_t("Suche")}</span>
            <kbd className="hidden xl:inline font-mono text-[10px] opacity-60">⌘K</kbd>
          </button>
          <Link to="/login" className="hidden sm:flex items-center whitespace-nowrap border border-primary px-4 py-2 text-xs font-medium text-primary transition">
            {_t("Anmelden")}
          </Link>
          <Link to="/login?modo=registro" className="hidden sm:flex items-center whitespace-nowrap bg-primary px-4 py-2 text-xs font-medium text-primary-foreground hover:bg-primary/90 transition">
            {_t("Konto erstellen")}
          </Link>
          <Link to="/hilfe#erste-schritte" className="hidden sm:flex items-center gap-2 bg-primary px-4 py-2 text-xs font-medium text-primary-foreground hover:bg-primary/90 transition">
            <LifeBuoy className="h-3.5 w-3.5" /> {_t("Soforthilfe")}
          </Link>
          {loggedIn && (
            <Link to="/dashboard" data-testid="nav-private-area" className="hidden sm:flex items-center gap-2 border border-primary px-4 py-2 text-xs font-medium text-primary hover:bg-primary hover:text-primary-foreground transition">
              <LayoutDashboard className="h-3.5 w-3.5" /> {_t("Privater Bereich")}
            </Link>
          )}
          {loggedIn && (
            <Link to="/account" data-testid="nav-my-account" className="hidden sm:flex items-center gap-2 border border-primary px-4 py-2 text-xs font-medium text-primary hover:bg-primary hover:text-primary-foreground transition">
              <UserRound className="h-3.5 w-3.5" /> {_t("Mein Konto")}
            </Link>
          )}
          <button className="lg:hidden p-2" aria-label={_t("Menü")} aria-expanded={mobile} onClick={() => setMobile(!mobile)}>
            {mobile ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mega menu */}
      {open && (() => {
        const s = sections.find((x) => x.key === open)!;
        return (
          <div className="absolute inset-x-0 top-full hidden lg:block border-b border-border bg-popover reveal" style={{ animationDuration: ".25s" }}>
            <div className="grid grid-cols-12 gap-10 px-10 py-10">
              <div className="col-span-4">
                <p className="eyebrow mb-3">{s.index} — {s.label}</p>
                <p className="font-display text-2xl leading-tight mb-4">{s.title}</p>
                <Link to={s.path} className="text-sm text-primary hover:underline">{_t("Übersicht öffnen →")}</Link>
              </div>
              <ul className="col-span-8 grid grid-cols-3 gap-x-8 gap-y-1">
                {s.topics.map((t) => (
                  <li key={t.id}>
                    <Link to={t.href ?? `${s.path}#${t.id}`} className="block border-t border-border py-2.5 text-[13px] text-primary hover:border-primary transition-colors">
                      {t.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        );
      })()}

      {/* Mobile */}
      {mobile && (
        <div className="lg:hidden border-t border-border bg-background max-h-[80vh] overflow-y-auto">
          <Link to="/hilfe#erste-schritte" className="flex items-center gap-2 bg-primary px-6 py-4 text-sm font-medium text-primary-foreground">
            <LifeBuoy className="h-4 w-4" /> {_t("Soforthilfe – erste Schritte")}
          </Link>
          {sections.map((s) => (
            <Link key={s.key} to={s.path} className="flex justify-between border-b border-border px-6 py-4">
              <span>{s.label}</span><span className="font-mono text-xs text-muted-foreground">{s.index}</span>
            </Link>
          ))}
          <Link to="/contact" className="block border-b border-border px-6 py-4">{_t("Kontakt")}</Link>
          <Link to="/login" className="block border-b border-border px-6 py-4 text-primary">{_t("Anmelden")}</Link>
          <Link to="/login?modo=registro" className="block bg-primary px-6 py-4 text-sm font-medium text-primary-foreground">{_t("Konto erstellen")}</Link>
        </div>
      )}

      <SearchDialog open={searchOpen} onClose={() => setSearchOpen(false)} />
    </header>
  );
};

export default SiteHeader;
