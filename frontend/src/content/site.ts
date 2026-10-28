import { t as _t } from "@/i18n";
import type { EnvVariant } from "@/components/site/Environment";

export interface Topic {
  id: string;
  title: string;
  summary: string;
  points?: string[];
  href?: string;
}

export interface Section {
  key: string;
  path: string;
  index: string;
  label: string;
  title: string;
  lead: string;
  env: EnvVariant;
  topics: Topic[];
}

export const sections: Section[] = [
  {
    key: "hilfe",
    path: "/hilfe",
    index: "02",
    label: _t("Hilfe für Betroffene"),
    title: _t("Sie sind nicht allein. Wir helfen Ihnen, die nächsten Schritte zu ordnen."),
    lead: _t("Betrug trifft auch sehr umsichtige Menschen. Diese Seiten führen Sie ruhig und strukturiert durch Schutzmaßnahmen, Beweissicherung und die richtigen Meldewege."),
    env: "incident",
    topics: [
      { id: "erste-schritte", title: _t("Erste Schritte nach einem Cybercrime"), summary: _t("Unterbrechen Sie zuerst jeden weiteren Schaden: keine weiteren Zahlungen, Zugänge sichern, Bank oder Börse sofort informieren."), points: [_t("Keine weiteren Zahlungen leisten – auch nicht für angebliche „Freigabegebühren“."), _t("Bank, Zahlungsdienstleister oder Kryptobörse umgehend kontaktieren."), _t("Passwörter betroffener Konten von einem sauberen Gerät aus ändern."), _t("Alle Nachrichten, Belege und Transaktions-IDs unverändert aufbewahren.")] },
      { id: "kryptobetrug", title: _t("Kryptowährungsbetrug"), summary: _t("Gefälschte Handelsplattformen, angebliche Berater und manipulierte Wallets sind die häufigsten Muster. Transaktionen auf der Blockchain sind öffentlich nachvollziehbar, aber nicht rückgängig zu machen."), points: [_t("Wallet-Adressen und Transaktions-Hashes notieren."), _t("Kommunikation mit der „Plattform“ einstellen."), _t("Keine Seed-Phrase an Dritte herausgeben.")] },
      { id: "anlagebetrug", title: _t("Anlagebetrug und gefälschte Investmentplattformen"), summary: _t("Typisch sind unrealistische Renditeversprechen, scheinbar steigende Kontostände und Auszahlungshindernisse. Prüfen Sie Anbieter in der Unternehmensdatenbank der BaFin.") },
      { id: "phishing", title: _t("Phishing und Social Engineering"), summary: _t("Täuschend echte E-Mails, SMS oder Anrufe zielen auf Zugangsdaten. Seriöse Institute fragen niemals nach PIN, TAN oder Seed-Phrase.") },
      { id: "identitaetsdiebstahl", title: _t("Identitätsdiebstahl"), summary: _t("Wurden Ausweisdaten missbraucht, sollten Sie Anzeige erstatten, die SCHUFA informieren und Konten auf unbekannte Verträge prüfen.") },
      { id: "kontouebernahme", title: _t("Kontoübernahmen"), summary: _t("Melden Sie den Vorfall dem Anbieter, beenden Sie alle aktiven Sitzungen und aktivieren Sie Mehr-Faktor-Authentifizierung.") },
      { id: "ransomware", title: _t("Ransomware und Erpressung"), summary: _t("Betroffene Geräte vom Netz trennen, nicht ausschalten, kein Lösegeld zahlen und die Zentrale Ansprechstelle Cybercrime (ZAC) Ihres Landes kontaktieren.") },
      { id: "romance-scam", title: _t("Romance Scams"), summary: _t("Emotionale Nähe wird gezielt aufgebaut, um später Geld zu erbitten. Das ist kein persönliches Versagen – die Täter arbeiten professionell und arbeitsteilig.") },
      { id: "impersonation", title: _t("Impersonation und gefälschte Identitäten"), summary: _t("Täter geben sich als Behörden, Banken, Prominente oder sogar als „Wiederbeschaffungsdienste“ aus. Prüfen Sie Kontaktdaten stets über unabhängige Quellen.") },
      { id: "wallet", title: _t("Wallet-Sicherheit und kompromittierte Wallets"), summary: _t("Verbleibende Mittel auf eine neu erzeugte Wallet übertragen und erteilte Token-Freigaben (Approvals) widerrufen.") },
      { id: "beweissicherung", title: _t("Beweissicherung"), summary: _t("Gesicherte Beweise sind die Grundlage jeder Anzeige und Analyse."), points: [_t("Screenshots mit sichtbarem Datum und URL."), _t("E-Mails als Originaldatei (.eml) exportieren."), _t("Kontoauszüge und Transaktions-Hashes sammeln."), _t("Eine chronologische Liste aller Ereignisse anlegen.")] },
      { id: "meldewege", title: _t("Meldewege und zuständige Stellen"), summary: _t("Erstatten Sie Anzeige bei der Polizei (in allen Bundesländern online möglich). Weitere Anlaufstellen: Verbraucherzentrale, BaFin, BSI sowie Opferhilfeorganisationen wie der Weisse Ring.") },
      { id: "checklisten", title: _t("Checklisten für Betroffene"), summary: _t("Druckbare Übersichten für die ersten 24 Stunden, die erste Woche und die Vorbereitung einer Anzeige.") },
      { id: "faq", title: _t("Häufig gestellte Fragen"), summary: _t("Kann mein Geld zurückgeholt werden? Ehrlich: Das ist oft nicht möglich. Eine frühe Meldung an Börsen und Behörden verbessert jedoch die Chancen, dass Mittel eingefroren werden.") },
      { id: "unterstuetzung", title: _t("Unterstützung finden"), summary: _t("Neben Behörden helfen Opferberatungsstellen auch emotional. Sie können zudem unseren Assistenten nutzen oder uns direkt schreiben.") },
    ].map((t) => ({ ...t, href: `/hilfe/${t.id}` })),
  },
  {
    key: "intelligence",
    path: "/blockchain-intelligence",
    index: "03",
    label: _t("Blockchain Intelligence"),
    title: _t("Öffentliche Ledger-Daten, nachvollziehbar analysiert."),
    lead: _t("Blockchains sind öffentlich. Wir zeigen, was sich aus diesen Daten belegen lässt – und wo die Grenzen der Interpretation liegen."),
    env: "ledger",
    topics: [
      { id: "einfuehrung", title: _t("Einführung in die Blockchain-Analyse"), summary: _t("Jede Transaktion ist dauerhaft im Ledger gespeichert. Analyse bedeutet, diese Daten zu strukturieren, zu verknüpfen und vorsichtig zu interpretieren.") },
      { id: "transaktionsdaten", title: _t("Öffentliche Transaktionsdaten"), summary: _t("Sender, Empfänger, Betrag, Zeitstempel und Blocknummer sind öffentlich. Namen von Personen sind es nicht.") },
      { id: "adressen", title: _t("Wallet-Adressen und Transaktionshistorien"), summary: _t("Eine Adresse ist ein Pseudonym. Eine Person kann viele Adressen nutzen – und eine Adresse kann einer Börse mit Millionen Kunden gehören.") },
      { id: "block-explorer", title: _t("Block Explorer und öffentliche Datenquellen"), summary: _t("Etherscan, Blockscout, Blockstream und mempool.space machen Ledger-Daten lesbar. Unser Explorer nutzt Blockscout und Blockstream.") },
      { id: "token", title: _t("Token- und Contract-Analyse"), summary: _t("Smart Contracts können Token ausgeben, sperren oder Freigaben missbrauchen. Verifizierter Quellcode ist ein wichtiges, aber kein hinreichendes Vertrauenssignal.") },
      { id: "graphen", title: _t("Transaktionsgraphen"), summary: _t("Adressen werden als Knoten, Transaktionen als Kanten dargestellt. Graphen machen Muster sichtbar, beweisen aber allein keine Täterschaft.") },
      { id: "zeitanalyse", title: _t("Zeitliche Analyse von Geldflüssen"), summary: _t("Alle Zeitstempel geben wir in UTC und in Ortszeit an. Zeitliche Nähe ist ein Indiz, kein Beweis.") },
      { id: "attribution", title: _t("Grenzen der Attribution"), summary: _t("Zuordnungen zu Personen oder Organisationen erfordern off-chain Belege. Wir kennzeichnen jede Zuordnung mit einer Konfidenzstufe.") },
      { id: "on-off-chain", title: _t("On-chain und off-chain Informationen"), summary: _t("On-chain: überprüfbare Ledger-Fakten. Off-chain: Börsendaten, Kommunikation, IP-Adressen – diese sind meist nur Behörden zugänglich.") },
      { id: "fallstudien", title: _t("Fallstudien mit öffentlichen oder synthetischen Daten"), summary: _t("Lehrbeispiele sind stets als „synthetisch“ gekennzeichnet und nie als reale Ermittlungsergebnisse dargestellt.") },
      { id: "dokumentation", title: _t("Technische Dokumentation"), summary: _t("Unsere Datenadapter sind austauschbar; jede Abfrage protokolliert Quelle, Netzwerk und Abrufzeitpunkt.") },
      { id: "analysefehler", title: _t("Häufige Analysefehler"), summary: _t("Change-Adressen falsch zuordnen, Börsen-Hot-Wallets für Täter halten, Zeitzonen verwechseln – wir dokumentieren typische Fehlschlüsse.") },
    ].map((t: Topic) => ({ ...t, href: t.href ?? `/blockchain-intelligence/${t.id}` })),
  },
  {
    key: "forschung",
    path: "/forschung",
    index: "04",
    label: _t("Forschung & Threat Intelligence"),
    title: _t("Forschung, die ihre Quellen offenlegt."),
    lead: _t("Veröffentlichungen zu Betrugsmustern, Bedrohungslage und Methodik – mit Datenstand, Einschränkungen und Korrekturhistorie."),
    env: "observatory",
    topics: [
      { id: "veroeffentlichungen", title: _t("Aktuelle Veröffentlichungen"), summary: _t("Kurzanalysen und Leitfäden zu aktuellen Betrugswellen im deutschsprachigen Raum.") },
      { id: "betrugsmuster", title: _t("Betrugsmuster"), summary: _t("Pig Butchering, Recovery Scams, Approval Phishing, Fake-Support: Ablauf, Warnsignale und Gegenmaßnahmen.") },
      { id: "technische-analysen", title: _t("Technische Analysen"), summary: _t("Untersuchungen zu Drainer-Kits, gefälschten Wallet-Apps und betrügerischen Smart Contracts.") },
      { id: "bedrohungslandschaft", title: _t("Bedrohungslandschaft"), summary: _t("Eine strukturierte Einordnung der Angriffskategorien nach Häufigkeit und Schadenshöhe auf Basis öffentlicher Lageberichte (BKA, BSI, Europol).") },
      { id: "berichte", title: _t("Forschungsberichte"), summary: _t("Längere Studien mit vollständiger Methodik und Datenanhang.") },
      { id: "datenanalysen", title: _t("Öffentliche Datenanalysen"), summary: _t("Reproduzierbare Auswertungen öffentlicher Ledger-Daten.") },
      { id: "einschraenkungen", title: _t("Methodische Einschränkungen"), summary: _t("Jede Veröffentlichung nennt, was die Daten nicht zeigen können.") },
      { id: "datenquellen", title: _t("Datenquellen und Aktualisierungszeitpunkte"), summary: _t("Für jede Zahl geben wir Quelle und Abrufdatum an.") },
      { id: "korrekturen", title: _t("Korrekturen und Aktualisierungshistorie"), summary: _t("Fehler werden sichtbar korrigiert und datiert – nicht still überschrieben.") },
    ].map((t: Topic) => ({ ...t, href: t.href ?? `/forschung/${t.id}` })),
  },
  {
    key: "praevention",
    path: "/praevention",
    index: "05",
    label: _t("Prävention & digitale Sicherheit"),
    title: _t("Sicherheit, die man im Alltag tatsächlich umsetzt."),
    lead: _t("Verständliche Anleitungen und interaktive Checks, damit aus guten Vorsätzen wirksame Gewohnheiten werden."),
    env: "trust",
    topics: [
      { id: "internet", title: _t("Sicheres Verhalten im Internet"), summary: _t("Updates zeitnah installieren, Downloads nur aus offiziellen Quellen, Misstrauen bei Zeitdruck.") },
      { id: "passwoerter", title: _t("Passwort- und Passkey-Sicherheit"), summary: _t("Ein Passwortmanager und – wo verfügbar – Passkeys sind heute der sicherste Standard.") },
      { id: "mfa", title: _t("Mehr-Faktor-Authentifizierung"), summary: _t("Authenticator-App oder Sicherheitsschlüssel sind SMS-Codes vorzuziehen.") },
      { id: "wallet-sicherheit", title: _t("Wallet-Sicherheit"), summary: _t("Seed-Phrase offline aufbewahren, Hardware-Wallet für größere Beträge, Approvals regelmäßig prüfen.") },
      { id: "webseiten", title: _t("Erkennung betrügerischer Webseiten"), summary: _t("Domain genau prüfen, Impressum suchen, Anbieter bei BaFin und Verbraucherzentrale abgleichen.") },
      { id: "nachrichten", title: _t("Sicherer Umgang mit E-Mails und Nachrichten"), summary: _t("Links nicht direkt öffnen, Absender unabhängig verifizieren, Anhänge mit Vorsicht behandeln.") },
      { id: "social-engineering", title: _t("Social Engineering"), summary: _t("Täter nutzen Autorität, Dringlichkeit und Vertrauen. Ein Rückruf über eine bekannte Nummer entlarvt viele Versuche.") },
      { id: "investitionen", title: _t("Sicheres Verhalten bei Krypto-Investitionen"), summary: _t("Keine Investitionen auf Empfehlung unbekannter Kontakte; Garantierenditen gibt es nicht.") },
      { id: "geraete", title: _t("Geräte- und Kontosicherheit"), summary: _t("Bildschirmsperre, Verschlüsselung, getrennte Konten für Arbeit und Privates.") },
      { id: "datenschutz-alltag", title: _t("Datenschutz im Alltag"), summary: _t("Weniger öffentliche Daten bedeuten weniger Angriffsfläche für gezielte Täuschung.") },
      { id: "glossar", title: _t("Glossar"), summary: _t("Seed-Phrase, Approval, Hash, Mixer, Hot Wallet – zentrale Begriffe kurz erklärt.") },
    ].map((t: Topic) => ({ ...t, href: t.href ?? `/praevention/${t.id}` })),
  },
  {
    key: "tools",
    path: "/tools",
    index: "06",
    label: _t("Tools & Open Source"),
    title: _t("Werkzeuge und Quellen, die Sie selbst prüfen können."),
    lead: _t("Transparenz heißt: Wir nennen die öffentlichen Explorer, APIs und Open-Source-Werkzeuge, auf denen unsere Analysen beruhen."),
    env: "network",
    topics: [
      { id: "explorer", title: _t("Öffentliche Blockchain-Explorer"), summary: _t("Etherscan, Blockscout (Ethereum), Blockstream und mempool.space (Bitcoin), Tronscan (Tron).") },
      { id: "analyse", title: _t("Open-Source-Analysewerkzeuge"), summary: _t("BlockSci, GraphSense, ethereum-etl – etablierte Werkzeuge für reproduzierbare Ledger-Analysen.") },
      { id: "visualisierung", title: _t("Transaktionsvisualisierung"), summary: _t("Unser Explorer stellt Geldflüsse als Graph und Zeitachse dar – direkt aus öffentlichen Daten.") },
      { id: "apis", title: _t("Datenquellen und APIs"), summary: _t("Blockscout API v2 und Blockstream Esplora API – frei zugänglich, ohne Schlüssel.") },
      { id: "sicherheit", title: _t("Sicherheitswerkzeuge"), summary: _t("revoke.cash zum Widerrufen von Freigaben, haveibeenpwned.com zur Prüfung von Datenlecks.") },
      { id: "evidence", title: _t("Evidence-Handling-Ressourcen"), summary: _t("Hinweise zu Hash-Werten, Exportformaten und Chain of Custody.") },
      { id: "lizenzen", title: _t("Lizenzinformationen"), summary: _t("Verwendete Bibliotheken und Datenquellen mit Lizenzangaben.") },
      { id: "grenzen", title: _t("Grenzen und bekannte Einschränkungen"), summary: _t("Öffentliche APIs haben Ratenlimits und zeigen nur die jüngsten Transaktionen vollständig.") },
      { id: "ermittlung", title: _t("KI-Ermittlungsplattform"), summary: _t("Verknüpfte Erkenntnisse und Ermittlungsmethoden in einer prüfbaren Untersuchung."), href: "/ermittlungsplattform" },
    ].map((t: Topic) => ({ ...t, href: t.href ?? `/tools/${t.id}` })),
  },
  {
    key: "methodik",
    path: "/methodik",
    index: "07",
    label: _t("Methodik & Standards"),
    title: _t("Jede Aussage muss nachvollziehbar sein."),
    lead: _t("Unser Untersuchungsprozess trennt beobachtete Fakten, analytische Interpretation und unbestätigte Hypothesen."),
    env: "archive",
    topics: [
      { id: "prozess", title: _t("Unser Untersuchungsprozess"), summary: _t("Erfassen → Sichern → Abfragen → Verknüpfen → Bewerten → Dokumentieren → Prüfen.") },
      { id: "quellen", title: _t("Quellenbewertung"), summary: _t("Primärquellen (Ledger) haben Vorrang; Sekundärquellen werden mit Herkunft und Zuverlässigkeit gekennzeichnet.") },
      { id: "validierung", title: _t("Datenvalidierung"), summary: _t("Kritische Daten werden über mindestens zwei unabhängige Explorer abgeglichen.") },
      { id: "reproduzierbarkeit", title: _t("Reproduzierbarkeit"), summary: _t("Eingaben, Abfragen und Abrufzeitpunkte werden protokolliert, sodass Dritte Ergebnisse nachvollziehen können.") },
      { id: "zeitstempel", title: _t("Zeitstempel und Zeitzonen"), summary: _t("Primär UTC, zusätzlich Europe/Berlin – stets mit Angabe.") },
      { id: "unsicherheit", title: _t("Umgang mit Unsicherheit"), summary: _t("Konfidenzstufen: Beobachtet · Wahrscheinlich · Möglich · Unbestätigt.") },
      { id: "attribution", title: _t("Attribution und Konfidenz"), summary: _t("Keine Zuordnung zu natürlichen Personen ohne belastbare off-chain Belege.") },
      { id: "review", title: _t("Peer Review und Qualitätssicherung"), summary: _t("Jede Veröffentlichung wird vor Freigabe von einer zweiten Person geprüft.") },
      { id: "datenminimierung", title: _t("Datenschutz und Datenminimierung"), summary: _t("Wir erheben nur, was für die Fallbearbeitung nötig ist.") },
      { id: "fehler", title: _t("Umgang mit Fehlern und Korrekturen"), summary: _t("Korrekturen werden datiert und begründet veröffentlicht.") },
      { id: "grenzen", title: _t("Grenzen der Untersuchung"), summary: _t("Wir sind keine Behörde, können keine Konten sperren und keine Rückzahlung garantieren.") },
      { id: "disclosure", title: _t("Responsible Disclosure"), summary: _t("Sicherheitslücken in unseren Systemen melden Sie bitte vertraulich über das Kontaktformular.") },
    ],
  },
  {
    key: "ueber-uns",
    path: "/ueber-uns",
    index: "08",
    label: _t("Über uns"),
    title: _t("Eine Institution für digitale Aufklärung."),
    lead: _t("Wir verbinden Opferhilfe, digitale Forensik und Blockchain-Analyse – mit klaren Grundsätzen und offen benannten Grenzen."),
    env: "trust",
    topics: [
      { id: "mission", title: _t("Mission"), summary: _t("Menschen nach digitaler Kriminalität Orientierung geben und öffentliche Blockchain-Daten verständlich machen.") },
      { id: "grundsaetze", title: _t("Grundsätze"), summary: _t("Opferzentriert. Nachvollziehbar. Diskret. Ehrlich über Grenzen.") },
      { id: "arbeitsweise", title: _t("Arbeitsweise"), summary: _t("Strukturierte Fallaufnahme, öffentliche Datenanalyse, Dokumentation für Behörden und Anwälte.") },
      { id: "standards", title: _t("Fachliche Standards"), summary: _t("Orientierung an anerkannten Grundsätzen der digitalen Forensik und Informationssicherheit.") },
      { id: "kundenservice", title: _t("Kundenservice & telefonische Hilfe"), summary: _t("Persönliche Unterstützung am Telefon – fordern Sie einen kostenlosen Rückruf an."), href: "/kundenservice" },
      { id: "unabhaengigkeit", title: _t("Unabhängigkeit und Transparenz"), summary: _t("Angaben zu Team, Kooperationen und Finanzierung werden veröffentlicht, sobald sie verifiziert sind.") },
    ],
  },
];

export const legalPages = [
  { slug: "impressum", title: _t("Impressum") },
  { slug: "datenschutz", title: _t("Datenschutzerklärung") },
  { slug: "cookies", title: _t("Cookie- und Tracking-Informationen") },
  { slug: "haftung", title: _t("Haftungshinweise & Disclaimer") },
  { slug: "leistungsumfang", title: _t("Umfang und Grenzen unserer Leistungen") },
  { slug: "nutzungsbedingungen", title: _t("Nutzungsbedingungen") },
  { slug: "urheberrecht", title: _t("Urheberrecht & Open-Source-Lizenzen") },
  { slug: "barrierefreiheit", title: _t("Erklärung zur Barrierefreiheit") },
  { slug: "sicherheit", title: _t("Sicherheits- & Responsible-Disclosure-Richtlinie") },
  { slug: "korrekturen", title: _t("Transparenz- und Korrekturrichtlinie") },
];

export interface SearchEntry { title: string; summary: string; href: string; section: string }

export const searchIndex: SearchEntry[] = [
  ...sections.flatMap((s) => [
    { title: s.label, summary: s.lead, href: s.path, section: s.label },
    ...s.topics.map((t) => ({ title: t.title, summary: t.summary, href: t.href ?? `${s.path}#${t.id}`, section: s.label })),
  ]),
  ...legalPages.map((l) => ({ title: l.title, summary: _t("Rechtliches und Transparenz"), href: `/rechtliches/${l.slug}`, section: _t("Rechtliches") })),
  { title: _t("Kontakt & Unterstützung"), summary: _t("Sicheres Kontaktformular und KI-Assistent"), href: "/contact", section: _t("Kontakt") },
  { title: _t("Wallet-Explorer"), summary: _t("Öffentliche Transaktionshistorie einer Adresse abrufen"), href: "/blockchain-intelligence#explorer", section: _t("Blockchain Intelligence") },
];

export function search(q: string): SearchEntry[] {
  const terms = q.toLowerCase().trim().split(/\s+/).filter(Boolean);
  if (!terms.length) return [];
  return searchIndex
    .map((e) => {
      const hay = `${e.title} ${e.summary}`.toLowerCase();
      const score = terms.reduce((s, t) => s + (e.title.toLowerCase().includes(t) ? 3 : hay.includes(t) ? 1 : -99), 0);
      return { e, score };
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((x) => x.e);
}
