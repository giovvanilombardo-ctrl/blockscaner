import { t as _t, lang, setLang } from "@/i18n";
import { Link } from "react-router-dom";
import { sections, legalPages } from "@/content/site";
import { BrandMark } from "./SiteHeader";

const linkCls = "block text-[13px] text-primary py-1";

const Col = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div>
    <p className="eyebrow mb-4">{title}</p>
    <div className="space-y-1">{children}</div>
  </div>
);

const SiteFooter = ({ onResetCookies }: { onResetCookies?: () => void }) => (
  <footer className="border-t border-border bg-secondary/40">
    <div className="px-6 lg:px-10 pt-16 pb-12 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-12 gap-x-8 gap-y-12">
      <div className="col-span-2 md:col-span-4 lg:col-span-4">
        <div className="flex items-center gap-3 mb-5">
          <BrandMark className="h-8 w-8" />
          <span className="font-display text-xl font-semibold" style={{ fontStretch: "112%" }}>Blockscaner</span>
        </div>
        <p className="text-sm text-muted-foreground max-w-sm leading-relaxed">
          {_t("Unabhängige Aufklärung, strukturierte Orientierung und nachvollziehbare Blockchain-Analyse für Menschen, die von digitaler Kriminalität betroffen sind.")}
        </p>
        <p className="mt-6 text-xs text-muted-foreground max-w-sm border-l-2 border-signal pl-3">
          {_t("Bei akuter Gefahr wählen Sie bitte 110. Wir sind keine Behörde und können keine Rückzahlung garantieren.")}
        </p>
        <Link to="/kundenservice" className="mt-6 inline-flex bg-primary text-primary-foreground px-5 py-2.5 text-sm font-medium">{_t("Rückruf anfordern")}</Link>
      </div>

      <div className="lg:col-span-2">
        <Col title={_t("Themen")}>
          {sections.map((s) => <Link key={s.key} to={s.path} className={linkCls}>{s.label}</Link>)}
        </Col>
      </div>

      <div className="lg:col-span-2">
        <Col title={_t("Service")}>
          <Link to="/contact" className={linkCls}>{_t("Kontakt")}</Link>
          <Link to="/kundenservice" className={linkCls}>{_t("Kundenservice")}</Link>
          <Link to="/chat" className={linkCls}>{_t("KI-Assistent")}</Link>
          <Link to="/login" className={linkCls}>{_t("Kundenportal")}</Link>
          <Link to="/sitemap" className={linkCls}>{_t("Sitemap & Suche")}</Link>
          {onResetCookies && <button onClick={onResetCookies} className={`${linkCls} text-left`}>{_t("Cookie-Einstellungen")}</button>}
        </Col>
      </div>

      <div className="col-span-2 lg:col-span-4">
        <Col title={_t("Rechtliches & Transparenz")}>
          <div className="grid sm:grid-cols-2 gap-x-6">
            {legalPages.map((l) => <Link key={l.slug} to={`/rechtliches/${l.slug}`} className={linkCls}>{l.title}</Link>)}
          </div>
        </Col>
      </div>
    </div>

    <div className="px-6 lg:px-10 py-5 border-t border-border flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs text-muted-foreground">
      <span>© {new Date().getFullYear()} {_t("Blockscaner · blockchain-24.com")}</span>
      <span className="font-mono text-[11px]">{_t("Alle Zeitangaben UTC sofern nicht anders angegeben")}</span>
      <span>
        <button onClick={() => setLang("de")} className={lang === "de" ? "text-foreground font-semibold" : "text-primary"}>Deutsch</button>
        <span className="mx-2">·</span>
        <button onClick={() => setLang("en")} className={lang === "en" ? "text-foreground font-semibold" : "text-primary"}>English</button>
      </span>
    </div>
  </footer>
);

export default SiteFooter;
