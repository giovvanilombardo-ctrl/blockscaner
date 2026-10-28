import { t as _t } from "@/i18n";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import SiteLayout from "@/components/site/SiteLayout";
import { SectionHeading, SectionTopics } from "@/components/site/SectionDesign";
import VictimFlow from "@/components/site/VictimFlow";
import GraphExplorer from "@/components/site/GraphExplorer";
import SecurityCheck from "@/components/site/SecurityCheck";
import FraudLab from "@/components/site/FraudLab";
import Environment from "@/components/site/Environment";
import { sections } from "@/content/site";

const threat = [
  { k: "Anlagebetrug / Krypto", v: 92 },
  { k: "Phishing", v: 78 },
  { k: "Kontoübernahme", v: 61 },
  { k: "Romance Scam", v: 44 },
  { k: "Ransomware", v: 33 },
  { k: "Identitätsdiebstahl", v: 29 },
];

const sources = [
  [_t("Blockscout API v2"), "Ethereum", "https://eth.blockscout.com", _t("Aktiv im Explorer")],
  [_t("Blockstream Esplora"), "Bitcoin", "https://blockstream.info", _t("Aktiv im Explorer")],
  ["Etherscan", "Ethereum", "https://etherscan.io", _t("Verweis")],
  ["mempool.space", "Bitcoin", "https://mempool.space", _t("Verweis")],
  ["revoke.cash", _t("EVM-Freigaben"), "https://revoke.cash", _t("Verweis")],
  ["GraphSense", _t("Open-Source-Analyse"), "https://graphsense.github.io", _t("Verweis")],
];

const SectionPage = ({ sectionKey, onResetCookies }: { sectionKey: string; onResetCookies?: () => void }) => {
  const s = sections.find((x) => x.key === sectionKey);
  if (!s) return null;
  return (
    <SiteLayout onResetCookies={onResetCookies}>
      <Helmet>
        <title>{`${s.label} | Blockscaner`}</title>
        <meta name="description" content={s.lead} />
        <link rel="canonical" href={`https://blockchain-24.com${s.path}`} />
      </Helmet>
      <SectionHeading section={s}>
        {s.key === "hilfe" && (
          <div className="flex flex-wrap gap-3 text-sm">
            <a href="tel:110" className="border border-signal/60 px-4 py-2">{_t("Akute Gefahr: 110")}</a>
            <a href="tel:116116" className="border border-border px-4 py-2">{_t("Sperr-Notruf 116 116")}</a>
            <a href="tel:116006" className="border border-border px-4 py-2">{_t("Opfer-Telefon 116 006")}</a>
          </div>
        )}
      </SectionHeading>

      {s.key === "hilfe" && (
        <section className="paper px-6 lg:px-10 py-16 border-b border-paper-foreground/10">
          <p className="eyebrow !text-paper-foreground/60 mb-3">{_t("Geführte Orientierung")}</p>
          <h2 className="font-display text-3xl mb-8">{_t("In fünf Schritten zu Ihrem nächsten Schritt.")}</h2>
          <VictimFlow />
        </section>
      )}

      {s.key === "intelligence" && (
        <section id="explorer" className="relative overflow-hidden scroll-mt-28 px-6 lg:px-10 py-24 border-y-2 border-primary/30 bg-gradient-to-b from-primary/10 via-primary/5 to-background">
          <div aria-hidden className="pointer-events-none absolute inset-0 opacity-60 [background-image:linear-gradient(hsl(var(--primary)/0.08)_1px,transparent_1px),linear-gradient(90deg,hsl(var(--primary)/0.08)_1px,transparent_1px)] [background-size:40px_40px]" />
          <div aria-hidden className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-96 w-[60rem] rounded-full bg-primary/20 blur-3xl" />
          <div className="relative max-w-6xl mx-auto">
            <div className="text-center mb-10">
              <p className="eyebrow mb-3 !text-primary">{_t("Werkzeug · Live")}</p>
              <h2 className="font-display text-4xl md:text-5xl mb-4">{_t("Transaktionsgraph & Zeitachse")}</h2>
              <p className="max-w-2xl mx-auto text-sm text-muted-foreground">{_t("Zweck: öffentliche Transaktionen einer Adresse sichtbar machen. Grenze: zeigt die zuletzt verfügbaren Transaktionen (max. 50) und belegt keine Identität. Herkunft: Blockscout (ETH), Blockstream (BTC).")}</p>
            </div>
            <div className="shadow-2xl shadow-primary/20 ring-2 ring-primary/40">
              <GraphExplorer />
            </div>
          </div>
        </section>
      )}

      {s.key === "forschung" && (
        <section className="px-6 lg:px-10 py-16 border-b border-border grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4">
            <p className="eyebrow mb-3">{_t("Bedrohungslandschaft")}</p>
            <h2 className="font-display text-3xl mb-4">{_t("Relative Häufigkeit gemeldeter Fallkategorien")}</h2>
            <p className="text-sm text-muted-foreground">{_t("Illustrativer Index (0–100), abgeleitet aus öffentlichen Lageberichten. Keine eigene Erhebung. Datenstand und Einzelquellen werden mit der ersten Veröffentlichung ergänzt.")}</p>
          </div>
          <figure className="lg:col-span-7 lg:col-start-6">
            <ul className="space-y-4">
              {threat.map((t) => (
                <li key={t.k} className="grid grid-cols-[160px_1fr_40px] items-center gap-4 text-sm">
                  <span>{t.k}</span>
                  <span className="h-2 bg-secondary"><span className="block h-2 bg-primary" style={{ width: `${t.v}%` }} /></span>
                  <span className="font-mono text-xs text-right">{t.v}</span>
                </li>
              ))}
            </ul>
            <figcaption className="sr-only">{_t("Anlagebetrug hat den höchsten Indexwert, gefolgt von Phishing und Kontoübernahme.")}</figcaption>
          </figure>
        </section>
      )}

      {s.key === "praevention" && (
        <section className="px-6 lg:px-10 py-16 border-b border-border">
          <p className="eyebrow mb-3">{_t("Interaktives Lernmodul")}</p>
          <h2 className="font-display text-3xl mb-8">{_t("Wallet- und Kontosicherheit in zwei Minuten prüfen")}</h2>
          <SecurityCheck />
          <h2 className="font-display text-3xl mt-16 mb-8">{_t("Betrugsmuster im Ablauf")}</h2>
          <FraudLab />
        </section>
      )}

      {s.key === "tools" && (
        <section className="px-6 lg:px-10 py-16 border-b border-border">
          <p className="eyebrow mb-3">{_t("Datenherkunft")}</p>
          <h2 className="font-display text-3xl mb-8">{_t("Quellen und Werkzeuge")}</h2>
          <div className="overflow-x-auto border border-border">
            <table className="w-full text-sm">
              <thead className="bg-card text-left"><tr>{[_t("Quelle"), _t("Netzwerk / Zweck"), _t("Status")].map((h) => <th key={h} className="px-5 py-3 eyebrow font-normal">{h}</th>)}</tr></thead>
              <tbody>{sources.map(([n, c, u, st]) => (
                <tr key={n} className="border-t border-border"><td className="px-5 py-3"><a href={u} target="_blank" rel="noopener noreferrer" className="text-primary">{n} ↗</a></td><td className="px-5 py-3 text-muted-foreground">{c}</td><td className="px-5 py-3 font-mono text-xs">{st}</td></tr>
              ))}</tbody>
            </table>
          </div>
        </section>
      )}

      {s.key === "methodik" && (
        <section className="px-6 lg:px-10 py-16 border-b border-border">
          <p className="eyebrow mb-3">{_t("Konfidenzskala")}</p>
          <h2 className="font-display text-3xl mb-8">{_t("Wie sicher ist eine Aussage?")}</h2>
          <div className="grid md:grid-cols-4 border border-border">
            {[[_t("Beobachtet"), _t("Direkt im Ledger überprüfbar."), "bg-success"], [_t("Wahrscheinlich"), _t("Mehrere unabhängige Indizien."), "bg-primary"], [_t("Möglich"), _t("Einzelnes Indiz, plausibel."), "bg-warning"], [_t("Unbestätigt"), _t("Hypothese, nicht belegt."), "bg-signal"]].map(([a, b, c]) => (
              <div key={a} className="p-6 border-b md:border-b-0 md:border-r border-border last:border-0"><span className={`block h-1 w-10 mb-4 ${c}`} /><p className="font-display text-xl">{a}</p><p className="text-sm text-muted-foreground mt-2">{b}</p></div>
            ))}
          </div>
        </section>
      )}

      {s.key === "ueber-uns" && (
        <section className="relative overflow-hidden px-6 lg:px-10 py-20 border-b border-border">
          <Environment variant="observatory" className="opacity-40" />
          <blockquote className="relative font-display text-3xl md:text-5xl leading-tight max-w-4xl">{_t("„Unsere Glaubwürdigkeit hängt nicht davon ab, was wir versprechen, sondern davon, was wir belegen können.“")}</blockquote>
        </section>
      )}

      <SectionTopics section={s} />

      <section className="px-6 lg:px-10 py-16 border-t border-border flex flex-col md:flex-row justify-between gap-6 items-start md:items-center">
        <p className="font-display text-2xl max-w-xl">{_t("Haben Sie eine konkrete Frage zu Ihrem Fall?")}</p>
        <div className="flex gap-3">
          <Link to="/contact" className="bg-primary text-primary-foreground px-6 py-3 text-sm">{_t("Kontakt aufnehmen")}</Link>
          <Link to="/chat" className="border border-border px-6 py-3 text-sm">{_t("KI-Assistent")}</Link>
        </div>
      </section>
    </SiteLayout>
  );
};

export default SectionPage;
