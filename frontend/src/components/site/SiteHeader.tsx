import { t as _t, lang, setLang, LANGS } from "@/i18n";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, Search, X, LifeBuoy, ChevronDown, UserRound, LayoutDashboard, LogOut } from "lucide-react";
import SearchDialog from "./SearchDialog";
import { supabase } from "@/integrations/supabase/client";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const NAV_LINKS = [
  { label: "Products", path: "/products" },
  { label: "Markets", path: "/markets" },
  { label: "Business", path: "/business" },
  { label: "About us", path: "/about" },
  { label: "Blog", path: "/blog" },
  { label: "Support", path: "/support" },
];

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
        <span>{_t("Crypto · Trading · Investing")}</span>
        <div className="flex items-center gap-5">
          {!loggedIn && <Link to="/login" className="text-primary">{_t("Client area")}</Link>}
          <span aria-label={_t("Language")} className="flex items-center gap-1.5">
            {LANGS.map((l, i) => (
              <span key={l.code} className="flex items-center gap-1.5">
                {i > 0 && <span className="opacity-40">·</span>}
                <button onClick={() => setLang(l.code)} aria-pressed={lang === l.code} className={lang === l.code ? "text-foreground font-semibold" : "text-primary hover:text-foreground"}>{l.label}</button>
              </span>
            ))}
          </span>
        </div>
      </div>
      <div className="relative flex h-16 items-center gap-6 px-6 lg:px-10">
        <Link to="/" className="flex items-center gap-3 shrink-0" aria-label="Blockscaner">
          <BrandMark className="h-7 w-7 text-foreground" />
          <span className="font-display text-lg font-semibold tracking-tight" style={{ fontStretch: "112%" }}>Blockscaner</span>
        </Link>

        <nav aria-label={_t("Main navigation")} className="hidden lg:block absolute left-1/2 -translate-x-1/2">
          <ul className="flex items-center gap-1">
            {NAV_LINKS.map((n) => (
              <li key={n.path}>
                <Link
                  to={n.path}
                  className={`whitespace-nowrap rounded-md px-3.5 py-2 text-sm font-medium tracking-tight transition-colors ${loc.pathname === n.path ? "bg-secondary text-foreground font-semibold" : "text-foreground/80 hover:text-foreground hover:bg-secondary/60"}`}
                >
                  {_t(n.label)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <button onClick={() => setSearchOpen(true)} className="flex items-center justify-center border border-border p-2 text-primary hover:border-primary transition" aria-label={_t("Suche öffnen")}>
            <Search className="h-3.5 w-3.5" />
          </button>

          {!loggedIn && (
            <>
              <Link to="/login" className="hidden sm:flex items-center whitespace-nowrap border border-primary px-4 py-2 text-xs font-medium text-primary transition">
                {_t("Log in")}
              </Link>
              <Link to="/login?modo=registro" className="hidden sm:flex items-center whitespace-nowrap bg-primary px-4 py-2 text-xs font-medium text-primary-foreground hover:bg-primary/90 transition">
                {_t("Create account")}
              </Link>
            </>
          )}

          {loggedIn && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button data-testid="nav-account-menu" className="hidden sm:flex items-center gap-2 border border-primary px-4 py-2 text-xs font-medium text-primary hover:bg-primary hover:text-primary-foreground transition" aria-label={_t("Mein Konto")}>
                  <UserRound className="h-3.5 w-3.5" /> {_t("Mein Konto")} <ChevronDown className="h-3 w-3" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-52">
                <DropdownMenuItem asChild>
                  <Link to="/dashboard" data-testid="menu-private-area" className="flex items-center gap-2 cursor-pointer">
                    <LayoutDashboard className="h-4 w-4" /> {_t("Private area")}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/account" data-testid="menu-my-account" className="flex items-center gap-2 cursor-pointer">
                    <UserRound className="h-4 w-4" /> {_t("My account")}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="flex items-center gap-2 cursor-pointer text-destructive"
                  onSelect={async () => { await supabase.auth.signOut(); window.location.assign("/"); }}
                >
                  <LogOut className="h-4 w-4" /> {_t("Sign out")}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          <button className="lg:hidden p-2" aria-label={_t("Menü")} aria-expanded={mobile} onClick={() => setMobile(!mobile)}>
            {mobile ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile */}
      {mobile && (
        <div className="lg:hidden border-t border-border bg-background max-h-[80vh] overflow-y-auto">
          {NAV_LINKS.map((n) => (
            <Link key={n.path} to={n.path} className="block border-b border-border px-6 py-4" onClick={() => setMobile(false)}>
              {_t(n.label)}
            </Link>
          ))}
          <div className="flex items-center gap-4 border-b border-border px-6 py-4">
            <span className="text-xs uppercase tracking-widest text-muted-foreground">{_t("Language")}</span>
            {LANGS.map((l) => (
              <button key={l.code} onClick={() => setLang(l.code)} className={lang === l.code ? "font-semibold text-foreground" : "text-primary"}>{l.label}</button>
            ))}
          </div>
          {loggedIn ? (
            <>
              <Link to="/dashboard" className="flex items-center gap-2 border-b border-border px-6 py-4 text-primary"><LayoutDashboard className="h-4 w-4" /> {_t("Private area")}</Link>
              <Link to="/account" className="flex items-center gap-2 border-b border-border px-6 py-4 text-primary"><UserRound className="h-4 w-4" /> {_t("My account")}</Link>
              <button onClick={async () => { await supabase.auth.signOut(); window.location.assign("/"); }} className="flex w-full items-center gap-2 px-6 py-4 text-left text-destructive"><LogOut className="h-4 w-4" /> {_t("Sign out")}</button>
            </>
          ) : (
            <>
              <Link to="/login" className="block border-b border-border px-6 py-4 text-primary">{_t("Log in")}</Link>
              <Link to="/login?modo=registro" className="block bg-primary px-6 py-4 text-sm font-medium text-primary-foreground">{_t("Create account")}</Link>
            </>
          )}
        </div>
      )}

      <SearchDialog open={searchOpen} onClose={() => setSearchOpen(false)} />
    </header>
  );
};

export default SiteHeader;
