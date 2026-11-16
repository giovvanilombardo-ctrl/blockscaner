import { t as _t } from "@/i18n";
import { ReactNode, useEffect } from "react";
import { useLocation } from "react-router-dom";
import SiteHeader from "./SiteHeader";
import SiteFooter from "./SiteFooter";

const SiteLayout = ({ children, onResetCookies }: { children: ReactNode; onResetCookies?: () => void }) => {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1));
      if (el) { setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "start" }), 60); return; }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[200] bg-primary text-primary-foreground px-4 py-2">{_t("Zum Inhalt springen")}</a>
      <SiteHeader />
      <main id="main" key={pathname} className="flex-1 reveal" style={{ animationDuration: ".45s" }}>{children}</main>
      <SiteFooter onResetCookies={onResetCookies} />
    </div>
  );
};

export default SiteLayout;
