import { t as _t, lang, setLang, LANGS } from "@/i18n";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, Search, X, LifeBuoy, ChevronDown, UserRound, LayoutDashboard, LogOut, Globe, ArrowLeftRight, LineChart, Zap, GraduationCap, Users, Boxes, Briefcase, ShieldCheck } from "lucide-react";
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

/* Products mega-menu content — "To trade" / "To learn" */
const PRODUCTS_MENU = {
  trade: [
    { icon: ArrowLeftRight, color: "text-white bg-emerald-500", title: "Blockscaner", desc: "Buy and sell crypto assets on a simple, intuitive platform.", to: "/products" },
    { icon: LineChart, color: "text-white bg-slate-800", title: "Blockscaner Pro", desc: "Advanced platform for buying and selling crypto, with charting tools and conditional orders.", to: "/products" },
  ],
  learn: [
    { icon: Zap, color: "text-white bg-fuchsia-500", title: "Blockscaner Step", desc: "Walk, take crypto quizzes, complete challenges and earn rewards.", to: "/products" },
    { icon: GraduationCap, color: "text-white bg-violet-500", title: "Academy", desc: "Learn the basics of crypto assets and blockchain with simple guides and free access.", to: "/products/academy" },
  ],
};

export const BrandMark = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
    <rect x="1" y="1" width="30" height="30" fill="none" stroke="currentColor" strokeWidth="1.2" />
    <path d="M8 8h9a4 4 0 0 1 0 8H8zM8 16h10a4 4 0 0 1 0 8H8z" fill="none" stroke="currentColor" strokeWidth="1.6" />
    <circle cx="24.5" cy="7.5" r="1.6" className="fill-primary" />
  </svg>
);

/* About us mega-menu content */
const ABOUT_MENU = [
  { icon: Users, color: "text-white bg-violet-500", title: "Leadership", desc: "Meet the team behind Blockscaner.", to: "/about" },
  { icon: Boxes, color: "text-white bg-emerald-500", title: "Ecosystem", desc: "Explore our products and services.", to: "/about" },
  { icon: Briefcase, color: "text-white bg-fuchsia-500", title: "Work with us", desc: "Join our mission to build the future of crypto.", to: "/about" },
  { icon: ShieldCheck, color: "text-white bg-blue-500", title: "Security", desc: "Learn how we protect your assets and data.", to: "/about" },
];

/* Mega-menu item — icon + title + description */
const MenuItem = ({ item }: { item: { icon: any; color: string; title: string; desc: string; to: string } }) => {
  return (
    <Link to={item.to} className="group flex items-start gap-4">
      <span>
        <span className="block text-[15px] font-bold text-foreground group-hover:text-primary transition-colors">{_t(item.title)}</span>
        <span className="mt-1 block text-[13px] leading-snug text-muted-foreground">{_t(item.desc)}</span>
      </span>
    </Link>
  );
};

const SiteHeader = () => {  const [open, setOpen] = useState<string | null>(null);
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
      <div className="relative flex h-[72px] items-center justify-center px-6 lg:px-10">
        <div className="flex items-center gap-16 lg:gap-24">
        <Link to="/" className="flex items-center gap-2.5 shrink-0" aria-label="Blockscaner">
          <BrandMark className="h-8 w-8 text-foreground" />
          <span className="font-display text-[19px] font-bold tracking-tight text-foreground">Blockscaner</span>
        </Link>

        <nav aria-label={_t("Main navigation")} className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {NAV_LINKS.map((n) => {
              if (n.label === "Products") {
                return (
                  <li key={n.path} className="relative" onMouseEnter={() => setOpen("products")} onMouseLeave={() => setOpen(null)}>
                    <Link
                      to={n.path}
                      onClick={() => setOpen(null)}
                      className={`whitespace-nowrap text-[15px] font-semibold tracking-tight transition-colors ${loc.pathname === n.path || open === "products" ? "text-foreground" : "text-foreground/90 hover:text-foreground"}`}
                    >
                      {_t(n.label)}
                    </Link>
                    {open === "products" && (
                      <div className="absolute left-1/2 top-full z-50 -translate-x-1/2 pt-4">
                        <div className="w-[640px] rounded-2xl border border-border bg-background p-8 shadow-2xl">
                          <div className="grid grid-cols-2 gap-10">
                            <div>
                              <p className="mb-5 text-lg font-bold text-foreground">{_t("To trade")}</p>
                              <div className="space-y-6">
                                {PRODUCTS_MENU.trade.map((item) => <MenuItem key={item.title} item={item} />)}
                              </div>
                            </div>
                            <div>
                              <p className="mb-5 text-lg font-bold text-foreground">{_t("To learn")}</p>
                              <div className="space-y-6">
                                {PRODUCTS_MENU.learn.map((item) => <MenuItem key={item.title} item={item} />)}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </li>
                );
              }
              if (n.label === "About us") {
                return (
                  <li key={n.path} className="relative" onMouseEnter={() => setOpen("about")} onMouseLeave={() => setOpen(null)}>
                    <Link
                      to={n.path}
                      onClick={() => setOpen(null)}
                      className={`whitespace-nowrap text-[15px] font-semibold tracking-tight transition-colors ${loc.pathname === n.path || open === "about" ? "text-foreground" : "text-foreground/90 hover:text-foreground"}`}
                    >
                      {_t(n.label)}
                    </Link>
                    {open === "about" && (
                      <div className="absolute left-1/2 top-full z-50 -translate-x-1/2 pt-4">
                        <div className="w-[340px] rounded-2xl border border-border bg-background p-6 shadow-2xl">
                          <div className="space-y-5">
                            {ABOUT_MENU.map((item) => <MenuItem key={item.title} item={item} />)}
                          </div>
                        </div>
                      </div>
                    )}
                  </li>
                );
              }
              return (
                <li key={n.path}>
                  <Link
                    to={n.path}
                    className={`whitespace-nowrap text-[15px] font-semibold tracking-tight transition-colors ${loc.pathname === n.path ? "text-foreground" : "text-foreground/90 hover:text-foreground"}`}
                  >
                    {_t(n.label)}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-5">
          {/* language globe */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center justify-center text-foreground hover:text-primary transition" aria-label={_t("Language")} data-testid="lang-globe">
                <Globe className="h-[22px] w-[22px]" strokeWidth={1.7}/>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-32">
              {LANGS.map((l) => (
                <DropdownMenuItem key={l.code} onSelect={() => setLang(l.code)} className={`cursor-pointer ${lang === l.code ? "font-semibold" : ""}`}>
                  {l.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {!loggedIn && (
            <>
              <Link to="/login" className="hidden sm:block text-[15px] font-semibold text-foreground hover:text-primary transition">
                {_t("Log in")}
              </Link>
              <Link to="/login?modo=registro" className="hidden sm:inline-flex items-center rounded-full bg-primary px-6 py-2.5 text-[15px] font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 transition">
                {_t("Sign up")}
              </Link>
            </>
          )}

          {loggedIn && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button data-testid="nav-account-menu" className="hidden sm:inline-flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-[15px] font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 transition" aria-label={_t("My account")}>
                  <UserRound className="h-4 w-4" /> {_t("My account")} <ChevronDown className="h-3.5 w-3.5" />
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
