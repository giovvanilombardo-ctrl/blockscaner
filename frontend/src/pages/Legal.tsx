import { t as _t } from "@/i18n";
import { Link, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import SiteLayout from "@/components/site/SiteLayout";
import { legalPages } from "@/content/site";

const P = ({ children }: { children: React.ReactNode }) => <span className="bg-warning/25 px-1">[{children}]</span>;

const body: Record<string, React.ReactNode> = {
  impressum: (<>
    <h2>{_t("Angaben gemäß § 5 DDG")}</h2>
    <p><P>{_t("Firmenname und Rechtsform")}</P><br /><P>{_t("Straße, Hausnummer")}</P><br /><P>{_t("PLZ, Ort, Land")}</P></p>
    <h2>{_t("Vertreten durch")}</h2><p><P>{_t("Name der vertretungsberechtigten Person")}</P></p>
    <h2>{_t("Kontakt")}</h2><p>{_t("E-Mail: support@blockchain-24.com")}<br />{_t("Telefon:")} <P>{_t("Telefonnummer")}</P></p>
    <h2>{_t("Registereintrag")}</h2><p>{_t("Registergericht:")} <P>{_t("Amtsgericht")}</P> {_t("· Registernummer:")} <P>{_t("HRB …")}</P></p>
    <h2>{_t("Umsatzsteuer-ID")}</h2><p><P>{_t("USt-IdNr. gemäß § 27a UStG")}</P></p>
    <h2>{_t("Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV")}</h2><p><P>{_t("Name, Anschrift")}</P></p>
  </>),
  datenschutz: (<>
    <h2>{_t("1. Verantwortlicher")}</h2><p>{_t("Verantwortlich für die Datenverarbeitung ist der im")} <Link to="/rechtliches/impressum">{_t("Impressum")}</Link> {_t("genannte Anbieter.")}</p>
    <h2>{_t("2. Verarbeitete Daten")}</h2><p>{_t("Bei Nutzung des Kontaktformulars und des KI-Assistenten verarbeiten wir die von Ihnen eingegebenen Angaben (z. B. Name, E-Mail, Fallschilderung) zur Bearbeitung Ihres Anliegens (Art. 6 Abs. 1 lit. b DSGVO).")}</p>
    <h2>{_t("3. Blockchain-Explorer")}</h2><p>{_t("Eingegebene Wallet-Adressen werden direkt aus Ihrem Browser an Blockscout bzw. Blockstream übermittelt. Wir speichern diese Abfragen nicht.")}</p>
    <h2>{_t("4. E-Mail-Versand")}</h2><p>{_t("Für Benachrichtigungen nutzen wir den Dienstleister Resend.")} <P>{_t("Angaben zum Auftragsverarbeitungsvertrag und Drittlandübermittlung ergänzen")}</P></p>
    <h2>{_t("5. Speicherdauer")}</h2><p><P>{_t("Konkrete Löschfristen ergänzen")}</P></p>
    <h2>{_t("6. Ihre Rechte")}</h2><p>{_t("Sie haben das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung, Datenübertragbarkeit und Widerspruch sowie das Recht auf Beschwerde bei einer Aufsichtsbehörde.")}</p>
  </>),
  cookies: (<><h2>{_t("Cookies und lokale Speicherung")}</h2><p>{_t("Wir verwenden lokale Speicherung für Ihre Cookie-Entscheidung und Sitzungsdaten des Kundenportals. Nicht notwendige Dienste werden erst nach Einwilligung geladen (§ 25 TDDDG). Sie können Ihre Auswahl jederzeit über „Cookie-Einstellungen“ im Fußbereich ändern.")}</p><p><P>{_t("Liste eingesetzter Analyse- und Tracking-Dienste ergänzen")}</P></p></>),
  haftung: (<><h2>{_t("Haftung für Inhalte")}</h2><p>{_t("Unsere Inhalte wurden mit Sorgfalt erstellt. Sie ersetzen keine Rechtsberatung und keine Anzeige bei den Behörden.")}</p><h2>{_t("Haftung für Links")}</h2><p>{_t("Für Inhalte externer Seiten (z. B. Block-Explorer) sind deren Betreiber verantwortlich.")}</p><h2>{_t("Disclaimer")}</h2><p>{_t("Analysen öffentlicher Blockchain-Daten stellen keine Identifizierung von Personen dar.")}</p></>),
  leistungsumfang: (<><h2>{_t("Was wir leisten")}</h2><p>{_t("Information, Orientierung, Analyse öffentlicher Ledger-Daten und Unterstützung bei der Dokumentation.")}</p><h2>{_t("Was wir nicht leisten")}</h2><p>{_t("Wir sind keine Behörde, keine Anwaltskanzlei und können keine Rückholung von Geldern garantieren. Seien Sie misstrauisch gegenüber jedem Anbieter, der dies verspricht.")}</p></>),
  nutzungsbedingungen: (<><h2>{_t("Geltungsbereich")}</h2><p><P>{_t("Nutzungsbedingungen durch Rechtsberatung erstellen lassen")}</P></p></>),
  urheberrecht: (<><h2>{_t("Urheberrecht")}</h2><p>{_t("Texte und Gestaltung dieser Website sind urheberrechtlich geschützt.")}</p><h2>{_t("Open-Source-Komponenten")}</h2><p>React (MIT), Tailwind CSS (MIT), Radix UI (MIT), lucide-react (ISC). Schriften: Archivo, IBM Plex Sans / Mono (SIL Open Font License).</p></>),
  barrierefreiheit: (<><h2>{_t("Stand der Vereinbarkeit")}</h2><p>{_t("Wir streben die Konformität mit WCAG 2.2 Stufe AA an. Die Website unterstützt Tastaturbedienung, sichtbare Fokusindikatoren und reduzierte Bewegung.")}</p><h2>{_t("Bekannte Einschränkungen")}</h2><p>{_t("Der Transaktionsgraph ist ergänzend als Tabelle verfügbar. Eine englische Fassung ist in Vorbereitung.")}</p><h2>{_t("Feedback")}</h2><p>{_t("Barrieren melden Sie bitte über das")} <Link to="/contact">{_t("Kontaktformular")}</Link>.</p></>),
  sicherheit: (<><h2>{_t("Responsible Disclosure")}</h2><p>{_t("Wenn Sie eine Sicherheitslücke entdecken, melden Sie diese bitte vertraulich über das Kontaktformular mit dem Betreff „Security“. Bitte keine Tests, die Daten Dritter gefährden.")}</p></>),
  korrekturen: (<><h2>{_t("Korrekturrichtlinie")}</h2><p>{_t("Fehler in Veröffentlichungen werden datiert und mit Begründung korrigiert. Frühere Fassungen bleiben nachvollziehbar.")}</p></>),
};

const Legal = ({ onResetCookies }: { onResetCookies?: () => void }) => {
  const { slug = "impressum" } = useParams();
  const page = legalPages.find((l) => l.slug === slug) ?? legalPages[0];
  return (
    <SiteLayout onResetCookies={onResetCookies}>
      <Helmet><title>{`${page.title} | Blockscaner`}</title><meta name="robots" content="index,follow" /></Helmet>
      <div className="paper">
        <div className="px-6 lg:px-10 py-20 grid lg:grid-cols-12 gap-10">
          <nav aria-label={_t("Rechtliches")} className="lg:col-span-3">
            <p className="eyebrow !text-paper-foreground/60 mb-4">{_t("10 — Rechtliches & Transparenz")}</p>
            <ul className="space-y-1">
              {legalPages.map((l) => (
                <li key={l.slug}><Link to={`/rechtliches/${l.slug}`} aria-current={l.slug === page.slug ? "page" : undefined} className={`block py-1.5 text-sm ${l.slug === page.slug ? "font-medium" : "opacity-60 hover:opacity-100"}`}>{l.title}</Link></li>
              ))}
            </ul>
          </nav>
          <article className="lg:col-span-7 max-w-2xl [&_h2]:font-display [&_h2]:text-xl [&_h2]:mt-10 [&_h2]:mb-3 [&_p]:leading-relaxed [&_p]:opacity-85 [&_a]:underline">
            <h1 className="font-display text-4xl md:text-5xl leading-tight mb-6">{page.title}</h1>
            <p className="text-sm !opacity-60 font-mono">{_t("Stand:")} {new Date().toLocaleDateString("de-DE")} {_t("· Gelb markierte Angaben sind Platzhalter und müssen ergänzt werden.")}</p>
            {body[page.slug]}
          </article>
        </div>
      </div>
    </SiteLayout>
  );
};

export default Legal;
