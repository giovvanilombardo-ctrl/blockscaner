import { t as _t } from "@/i18n";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import SiteLayout from "@/components/site/SiteLayout";
import { sections, legalPages, search, searchIndex } from "@/content/site";

const Sitemap = ({ onResetCookies }: { onResetCookies?: () => void }) => {
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState("Alle");
  const cats = [_t("Alle"), ...Array.from(new Set(searchIndex.map((e) => e.section)))];
  const results = (q ? search(q) : []).filter((r) => filter === "Alle" || r.section === filter);
  return (
    <SiteLayout onResetCookies={onResetCookies}>
      <Helmet><title>{_t("Sitemap & Suche | Blockscaner")}</title></Helmet>
      <section className="px-6 lg:px-10 py-20 border-b border-border">
        <p className="eyebrow mb-4">{_t("11 — Sitemap & Suche")}</p>
        <h1 className="font-display text-4xl md:text-5xl mb-8">{_t("Alle Inhalte auf einen Blick.")}</h1>
        <label htmlFor="q" className="sr-only">{_t("Suche")}</label>
        <input id="q" value={q} onChange={(e) => setQ(e.target.value)} placeholder={_t("Suchbegriff eingeben …")} className="w-full max-w-2xl h-14 bg-card border border-border px-5 outline-none focus:border-primary" />
        <div className="mt-4 flex flex-wrap gap-2">
          {cats.map((c) => <button key={c} onClick={() => setFilter(c)} className={`px-3 py-1 text-xs border ${filter === c ? "border-primary" : "border-border text-muted-foreground"}`}>{c}</button>)}
        </div>
        {q && (
          <div className="mt-8 max-w-3xl" aria-live="polite">
            <p className="text-sm text-muted-foreground mb-3">{results.length} {_t("Treffer")}</p>
            {results.map((r) => (
              <Link key={r.href} to={r.href} className="block border-t border-border py-4 hover:bg-card px-2"><span className="eyebrow">{r.section}</span><span className="block mt-1">{r.title}</span><span className="block text-sm text-muted-foreground">{r.summary}</span></Link>
            ))}
            {results.length === 0 && <p className="text-muted-foreground">{_t("Keine Treffer. Durchsuchen Sie die Übersicht unten.")}</p>}
          </div>
        )}
      </section>
      <section className="px-6 lg:px-10 py-16 grid md:grid-cols-2 lg:grid-cols-4 gap-10">
        <div><p className="eyebrow mb-3">01</p><Link to="/" className="font-display text-xl">{_t("Startseite")}</Link></div>
        {sections.map((s) => (
          <div key={s.key}>
            <p className="eyebrow mb-3">{s.index}</p>
            <Link to={s.path} className="font-display text-xl text-primary">{s.label}</Link>
            <ul className="mt-3 space-y-1">{s.topics.map((t) => <li key={t.id}><Link to={t.href ?? `${s.path}#${t.id}`} className="text-sm text-primary">{t.title}</Link></li>)}</ul>
          </div>
        ))}
        <div><p className="eyebrow mb-3">09</p><Link to="/contact" className="font-display text-xl">{_t("Kontakt")}</Link><ul className="mt-3 space-y-1 text-sm text-muted-foreground"><li><Link to="/chat">{_t("KI-Assistent")}</Link></li><li><Link to="/login">{_t("Kundenportal")}</Link></li></ul></div>
        <div><p className="eyebrow mb-3">10</p><span className="font-display text-xl">{_t("Rechtliches")}</span><ul className="mt-3 space-y-1">{legalPages.map((l) => <li key={l.slug}><Link to={`/rechtliches/${l.slug}`} className="text-sm text-primary">{l.title}</Link></li>)}</ul></div>
      </section>
    </SiteLayout>
  );
};

export default Sitemap;
