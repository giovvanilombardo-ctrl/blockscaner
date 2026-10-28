import { t as _t } from "@/i18n";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import SiteLayout from "@/components/site/SiteLayout";
import { methodAnims } from "@/components/site/MethodAnim";
import StoryFeatures from "@/components/site/StoryFeatures";
import trustBg from "@/assets/trust-bg.jpg";
import { TechTicker } from "@/components/site/TechTicker";
import Environment from "@/components/site/Environment";
import BloomField from "@/components/site/BloomField";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import HeroCaseForm from "@/components/site/HeroCaseForm";
import FraudLab from "@/components/site/FraudLab";
import { sections } from "@/content/site";

const firstHours = [
  { t: _t("0–15 Min"), h: _t("Schaden stoppen"), d: _t("Keine weiteren Zahlungen. Kommunikation mit Tätern einstellen."), p: [_t("Keine weiteren Überweisungen oder Krypto-Transfers ausführen – auch nicht für angebliche Gebühren oder Steuern."), _t("Chat, Telefon und E-Mail mit den Tätern sofort beenden; nicht auf Drohungen reagieren."), _t("Fernwartungs-Apps (z. B. AnyDesk, TeamViewer) deinstallieren und das Gerät vom Internet trennen.")], tip: _t("Täter erhöhen oft den Druck, sobald Sie zögern. Jede weitere Zahlung erhöht nur den Schaden.") },
  { t: _t("15–60 Min"), h: _t("Institute informieren"), d: _t("Bank, Zahlungsdienstleister oder Kryptobörse kontaktieren. Sperr-Notruf 116 116."), p: [_t("Bank oder Zahlungsdienstleister anrufen und eine Rückbuchung bzw. Sperrung verlangen."), _t("Kryptobörse über den offiziellen Support informieren und die Ziel-Wallet melden."), _t("Karten und Online-Banking über den Sperr-Notruf 116 116 sperren lassen.")], tip: _t("Notieren Sie Datum, Uhrzeit und Namen Ihrer Ansprechpartner bei jedem Anruf.") },
  { t: _t("1–6 Std"), h: _t("Zugänge sichern"), d: _t("Passwörter ändern, Mehr-Faktor-Authentifizierung aktivieren, Sitzungen beenden."), p: [_t("Passwörter von E-Mail, Bank und Börsen von einem sauberen Gerät aus ändern."), _t("Mehr-Faktor-Authentifizierung per App aktivieren – nicht per SMS."), _t("Alle aktiven Sitzungen und verbundenen Geräte abmelden.")], tip: _t("Ändern Sie zuerst das Passwort Ihres E-Mail-Kontos – darüber lassen sich alle anderen zurücksetzen.") },
  { t: _t("6–24 Std"), h: _t("Beweise sichern"), d: _t("Screenshots, Transaktions-Hashes, E-Mails und eine Chronologie anlegen."), p: [_t("Screenshots von Chats, Webseiten und Kontoständen mit sichtbarem Datum anfertigen."), _t("Transaktions-Hashes, Wallet-Adressen und Kontoauszüge sammeln."), _t("Eine Chronologie anlegen: wann, wer, welcher Betrag, über welchen Kanal.")], tip: _t("Löschen Sie nichts – auch keine Nachrichten der Täter. Alles kann später als Beweis dienen.") },
  { t: _t("24–72 Std"), h: _t("Anzeige erstatten"), d: _t("Online-Anzeige bei der Polizei Ihres Bundeslandes."), p: [_t("Online-Anzeige bei der Polizei Ihres Bundeslandes oder persönlich auf der Wache stellen."), _t("Gesammelte Beweise und die Chronologie beifügen."), _t("Aktenzeichen notieren und an Bank, Börse und Versicherung weitergeben.")], tip: _t("Vorsicht vor „Recovery“-Angeboten nach der Anzeige: Seriöse Stellen verlangen keine Vorauszahlung.") },
];

const method = [_t("Erfassen"), _t("Sichern"), _t("Abfragen"), _t("Verknüpfen"), _t("Bewerten"), _t("Dokumentieren"), _t("Prüfen")];

const principles = [
  [_t("Opferzentriert"), _t("Wir erklären ohne Schuldzuweisung und in verständlicher Sprache.")],
  [_t("Nachvollziehbar"), _t("Jede Aussage ist mit Quelle, Zeitstempel und Konfidenzstufe versehen.")],
  [_t("Ehrlich über Grenzen"), _t("Wir garantieren keine Rückholung und sind keine Strafverfolgungsbehörde.")],
  [_t("Datensparsam"), _t("Wir erheben nur, was für Ihr Anliegen erforderlich ist.")],
];

const Index = ({ onResetCookies }: { onResetCookies?: () => void }) => (
  <SiteLayout onResetCookies={onResetCookies}>
    <Helmet>
      <title>{_t("Blockscaner – Cybercrime-Opferhilfe & Blockchain-Analyse")}</title>
      <meta name="description" content="Unabhängige Aufklärung, strukturierte Orientierung und nachvollziehbare Blockchain-Analyse für Menschen, die von digitaler Kriminalität betroffen sind." />
      <link rel="canonical" href="https://blockchain-24.com/" />
    </Helmet>

    {/* HERO */}
    <section className="relative overflow-hidden bg-deep text-deep-foreground min-h-[calc(100vh-6rem)] flex items-center">
      <BloomField />
      <div className="relative mx-auto w-full max-w-5xl px-6 lg:px-10 py-24 grid gap-10 md:grid-cols-2 items-center">
        <h1 className="font-display text-4xl md:text-5xl font-light leading-[1.1]">{_t("Kriminelle skalieren mit KI. Verbrechensbekämpfer skalieren mit Blockscaner.")}</h1>
        <div className="md:ml-auto md:max-w-xs border-t border-deep-foreground/50 pt-3">
          <p className="text-sm leading-snug">{_t("KI macht Kriminalität schneller, günstiger und leichter skalierbar. Blockscaner gibt Verbrechensbekämpfern die Ermittlungskapazitäten, um darauf zu reagieren, und hilft Teams, kriminelle Netzwerke aufzudecken und Maßnahmen zu ergreifen, um sie zu zerschlagen.")}</p>
          <Link to="/contact" className="mt-5 inline-block rounded bg-background px-3 py-2 font-mono text-xs uppercase text-foreground">{_t("So funktioniert's")}</Link>
        </div>
      </div>
    </section>

    <StoryFeatures />

    {/* 02 BLOCKCHAIN INTELLIGENCE — split, ledger env */}
    <section className="relative overflow-hidden border-b border-border">
      <div className="grid lg:grid-cols-2 min-h-[560px]">
        <div className="px-6 lg:px-10 py-20 lg:py-28 flex flex-col justify-center">
          <p className="eyebrow mb-5">{_t("02 — Blockchain Intelligence")}</p>
          <h2 className="font-display text-4xl lg:text-5xl leading-tight max-w-lg">{_t("Jede Transaktion hinterlässt eine öffentliche Spur.")}</h2>
          <p className="mt-6 text-muted-foreground max-w-lg leading-relaxed">{_t("Unser Explorer ruft echte Ledger-Daten ab und stellt Geldflüsse als Graph und Zeitachse dar – mit Quelle, Netzwerk und Abrufzeitpunkt.")}</p>
          <div className="mt-10 grid grid-cols-3 max-w-lg border-t border-border">
            {[[_t("Beobachtet"), _t("Ledger-Fakt")], [_t("Interpretiert"), _t("Analyse")], [_t("Hypothese"), _t("Unbestätigt")]].map(([a, b], i) => (
              <div key={a} className="pt-4 pr-4">
                <span className={`block h-1 w-8 mb-3 ${["bg-success", "bg-warning", "bg-signal"][i]}`} />
                <p className="text-sm">{a}</p><p className="text-xs text-muted-foreground">{b}</p>
              </div>
            ))}
          </div>
          <Link to="/blockchain-intelligence#explorer" className="mt-10 inline-flex w-fit items-center gap-2 bg-primary text-primary-foreground px-6 py-3.5 text-sm font-medium">{_t("Explorer öffnen")} <ArrowUpRight className="h-4 w-4" /></Link>
        </div>
        <div className="relative min-h-[360px] border-t lg:border-t-0 lg:border-l border-border bg-card">
          <Environment variant="ledger" />
        </div>
      </div>
    </section>

    {/* 03 FRAUD PATTERNS */}
    <section className="px-6 lg:px-10 py-20 lg:py-28 border-b border-border">
      <div className="grid lg:grid-cols-12 gap-10 mb-12">
        <div className="lg:col-span-5"><p className="eyebrow mb-5">{_t("03 — Betrugsmechanismen")}</p><h2 className="font-display text-4xl lg:text-5xl leading-tight">{_t("Muster erkennen, bevor sie wirken.")}</h2></div>
        <p className="lg:col-span-5 lg:col-start-8 self-end text-muted-foreground leading-relaxed">{_t("Betrug folgt wiederkehrenden Abläufen. Diese synthetischen Lehrbeispiele zeigen die Phasen – und den Moment, an dem man aussteigen sollte.")}</p>
      </div>
      <FraudLab />
    </section>

    {/* 04 — info banner */}
    <section className="px-6 lg:px-10 py-20 lg:py-28 border-b border-border">
      <div className="cta-navy relative overflow-hidden rounded-[2rem] max-w-6xl mx-auto px-6 py-24 lg:py-28 text-center">
        <svg className="absolute inset-0 h-full w-full pointer-events-none" viewBox="0 0 1200 480" preserveAspectRatio="xMidYMid slice" fill="none" aria-hidden="true">
          <g stroke="hsl(0 0% 100% / 0.12)" strokeWidth="1">
            <path d="M0 220 H120 L260 320 H330" /><path d="M0 360 H110 L150 330 H300" />
            <path d="M560 65 H700 L770 0" /><path d="M1200 115 H1140 L1020 225 H960" />
            <path d="M1200 230 H1100" /><path d="M1200 420 H1150 L1060 325 H900" />
          </g>
          <g stroke="hsl(0 0% 100% / 0.22)" fill="hsl(0 0% 100% / 0.03)">
            <circle cx="350" cy="320" r="16" /><circle cx="590" cy="65" r="16" /><circle cx="955" cy="225" r="16" /><circle cx="880" cy="325" r="16" />
          </g>
          <g fill="hsl(0 0% 100% / 0.25)" fontFamily="IBM Plex Mono, monospace" fontSize="8">
            <text x="50" y="223">SCAM</text><text x="185" y="333">DIRTY MONEY</text><text x="1110" y="233">DANGER</text><text x="990" y="328">DANGER</text>
          </g>
        </svg>
        <div className="relative max-w-3xl mx-auto">
          <h2 className="font-display text-3xl md:text-5xl leading-tight cta-navy-title">{_t("Klarheit nach einem Krypto-Betrug – ohne Komplexität")}</h2>
          <p className="mt-6 cta-navy-text">{_t("Öffentliche Blockchain-Daten prüfen, Wallets analysieren und Ihren Fall vertraulich schildern – auf einer Plattform.")}</p>
          <Link to="/contact" className="mt-10 inline-block rounded-full bg-primary text-primary-foreground px-16 py-4 text-sm font-medium hover:bg-primary/90 transition">{_t("Mit einem Experten sprechen")}</Link>
        </div>
      </div>
    </section>

    {/* 05 EXPLORE THE INSTITUTION — asymmetric index */}
    <section className="px-6 lg:px-10 py-20 lg:py-28 border-b border-border">
      <p className="eyebrow mb-10">{_t("05 — Bereiche")}</p>
      <ul>
        {sections.map((s) => (
          <li key={s.key}>
            <Link to={s.path} className="group grid grid-cols-[48px_1fr_auto] md:grid-cols-[80px_1fr_1.2fr_auto] items-baseline gap-6 border-t border-border py-7 hover:bg-card transition-colors px-2">
              <span className="font-mono text-xs text-muted-foreground">{s.index}</span>
              <span className="font-display text-2xl md:text-3xl  transition-colors">{s.label}</span>
              <span className="hidden md:block text-sm text-muted-foreground">{s.lead}</span>
              <ArrowUpRight className="h-5 w-5 text-primary group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition" />
            </Link>
          </li>
        ))}
      </ul>
    </section>

    {/* 06 PRINCIPLES & LIMITS */}
    <section className="relative overflow-hidden border-b border-border bg-cover bg-center" style={{ backgroundImage: `url(${trustBg})` }}>
      <div className="relative px-6 lg:px-10 py-32 lg:py-48 min-h-[85vh] flex items-center">
        <div className="w-full max-w-5xl mx-auto bg-background/90 border border-border shadow-xl grid lg:grid-cols-12">
          <div className="lg:col-span-4 p-8 lg:p-10 border-b lg:border-b-0 lg:border-r border-border"><p className="eyebrow mb-5">{_t("06 — Grundsätze & Grenzen")}</p><h2 className="font-display text-4xl leading-tight text-primary">{_t("Vertrauen entsteht durch Klarheit.")}</h2></div>
          <dl className="lg:col-span-8 grid sm:grid-cols-2">
            {principles.map(([t, d]) => (
              <div key={t} className="p-7 border-b border-border sm:[&:nth-last-child(-n+2)]:border-b-0 sm:odd:border-r"><dt className="font-display text-xl mb-2 text-primary">{t}</dt><dd className="text-sm text-muted-foreground leading-relaxed">{d}</dd></div>
            ))}
          </dl>
        </div>
      </div>
    </section>

    {/* 07 CTA */}
    <section className="px-6 lg:px-10 py-24 lg:py-32 text-center">
      <p className="eyebrow mb-6">{_t("Vertraulich · Kostenlos für die Ersteinschätzung")}</p>
      <h2 className="font-display text-4xl md:text-6xl leading-tight max-w-4xl mx-auto">{_t("Schildern Sie uns, was passiert ist.")}</h2>
      <p className="mt-6 text-muted-foreground max-w-xl mx-auto">{_t("Wir ordnen Ihren Fall ein, prüfen öffentliche Daten und erklären Ihnen ehrlich, welche Wege offenstehen.")}</p>
      <div className="mt-10 flex flex-wrap justify-center gap-3">
        <Link to="/contact" className="bg-primary text-primary-foreground px-7 py-4 text-sm font-medium hover:bg-primary/90 transition">{_t("Fall vertraulich schildern")}</Link>
        <Link to="/chat" className="border border-border px-7 py-4 text-sm hover:border-primary transition">{_t("KI-Assistent starten")}</Link>
      </div>
    </section>
  </SiteLayout>
);

export default Index;
