import { t as _t, lang, setLang, LANGS } from "@/i18n";
import { Link } from "react-router-dom";
import { legalPages } from "@/content/site";
import { BrandMark } from "./SiteHeader";

const linkCls = "block text-[13px] text-primary py-1 hover:text-foreground transition-colors";

const Col = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div>
    <p className="eyebrow mb-4">{title}</p>
    <div className="space-y-1">{children}</div>
  </div>
);

const PRODUCT_LINKS = [
  { label: "Products", path: "/products" },
  { label: "Markets", path: "/markets" },
  { label: "Business", path: "/business" },
  { label: "About us", path: "/about" },
  { label: "Blog", path: "/blog" },
  { label: "Support", path: "/support" },
];

const SiteFooter = ({ onResetCookies }: { onResetCookies?: () => void }) => (
  <footer className="border-t border-border bg-secondary/40">
    <div className="px-6 lg:px-10 pt-16 pb-12 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-12 gap-x-8 gap-y-12">
      <div className="col-span-2 md:col-span-4 lg:col-span-4">
        <div className="flex items-center gap-3 mb-5">
          <BrandMark className="h-8 w-8" />
          <span className="font-display text-xl font-semibold" style={{ fontStretch: "112%" }}>Blockscaner</span>
        </div>
        <p className="text-sm text-muted-foreground max-w-sm leading-relaxed">
          {_t("Buy, sell, swap and grow crypto on one secure platform — built for everyone, in your language.")}
        </p>
        <Link to="/login?modo=registro" className="mt-6 inline-flex bg-primary text-primary-foreground px-5 py-2.5 text-sm font-medium">{_t("Create your account")}</Link>
      </div>

      <div className="lg:col-span-2">
        <Col title={_t("Platform")}>
          {PRODUCT_LINKS.map((s) => <Link key={s.path} to={s.path} className={linkCls}>{_t(s.label)}</Link>)}
        </Col>
      </div>

      <div className="lg:col-span-2">
        <Col title={_t("Service")}>
          <Link to="/contact" className={linkCls}>{_t("Contact")}</Link>
          <Link to="/support" className={linkCls}>{_t("Support")}</Link>
          <Link to="/chat" className={linkCls}>{_t("Chat assistant")}</Link>
          <Link to="/login" className={linkCls}>{_t("Client area")}</Link>
          <Link to="/sitemap" className={linkCls}>{_t("Sitemap")}</Link>
          {onResetCookies && <button onClick={onResetCookies} className={`${linkCls} text-left`}>{_t("Cookie settings")}</button>}
        </Col>
      </div>

      <div className="col-span-2 lg:col-span-4">
        <Col title={_t("Legal")}>
          <div className="grid sm:grid-cols-2 gap-x-6">
            {legalPages.map((l) => <Link key={l.slug} to={`/rechtliches/${l.slug}`} className={linkCls}>{_t(l.title)}</Link>)}
          </div>
        </Col>
      </div>
    </div>

    <div className="px-6 lg:px-10 py-5 border-t border-border flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs text-muted-foreground">
      <span>© {new Date().getFullYear()} Blockscaner</span>
      <span className="flex items-center gap-2">
        {LANGS.map((l) => (
          <button key={l.code} onClick={() => setLang(l.code)} className={lang === l.code ? "text-foreground font-semibold" : "text-primary hover:text-foreground"}>{l.label}</button>
        ))}
      </span>
    </div>
  </footer>
);

export default SiteFooter;
