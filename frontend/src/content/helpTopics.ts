import { lang } from "@/i18n";

/** Bilingual pair [German, English]. Used for long-form topic content instead of en.json keys. */
export type Bi = [string, string];
export const L = (b: Bi) => (lang === "en" ? b[1] : b[0]);

export interface HelpTopic {
  id: string;
  kicker: Bi;
  intro: Bi;
  facts: { v: string; l: Bi }[];
  flowTitle: Bi;
  flow: { t: Bi; d: Bi }[];
  flags: Bi[];
  actions: Bi[];
  myths: { m: Bi; f: Bi }[];
  faq: { q: Bi; a: Bi }[];
}

export const helpTopics: HelpTopic[] = [
  {
    id: "erste-schritte",
    kicker: ["Notfallprotokoll", "Emergency protocol"],
    intro: ["Die ersten Stunden entscheiden darüber, ob weiterer Schaden entsteht und ob Spuren erhalten bleiben. Handeln Sie ruhig, in fester Reihenfolge – Stoppen, Sichern, Melden.", "The first hours determine whether further damage occurs and whether traces are preserved. Act calmly in a fixed order – stop, secure, report."],
    facts: [
      { v: "110", l: ["Polizei bei akuter Gefahr", "Police in acute danger"] },
      { v: "116 116", l: ["Sperr-Notruf für Karten & Konten", "Card & account blocking hotline"] },
      { v: "116 006", l: ["Opfer-Telefon Weisser Ring", "Weisser Ring victim helpline"] },
    ],
    flowTitle: ["Die ersten 24 Stunden", "The first 24 hours"],
    flow: [
      { t: ["0–1 h · Stoppen", "0–1 h · Stop"], d: ["Keine weiteren Zahlungen, Kontakt zum Täter nicht fortsetzen, keine Software installieren.", "No further payments, stop contact with the perpetrator, install no software."] },
      { t: ["1–3 h · Sperren", "1–3 h · Block"], d: ["Bank, Karte, Börse informieren. Bei Fernzugriff: Gerät vom Internet trennen.", "Notify bank, card issuer, exchange. If remote access was granted: disconnect the device."] },
      { t: ["3–6 h · Sichern", "3–6 h · Secure"], d: ["Passwörter von einem sauberen Gerät ändern, Mehr-Faktor-Authentifizierung aktivieren.", "Change passwords from a clean device, enable multi-factor authentication."] },
      { t: ["6–12 h · Dokumentieren", "6–12 h · Document"], d: ["Chats, E-Mails, Überweisungen und Transaktions-IDs unverändert sichern.", "Preserve chats, emails, transfers and transaction IDs unchanged."] },
      { t: ["12–24 h · Melden", "12–24 h · Report"], d: ["Online-Anzeige bei der Polizei erstatten, Aktenzeichen notieren.", "File an online police report and note the case number."] },
    ],
    flags: [["Druck, sofort zu zahlen, um „Verluste zu verhindern“", "Pressure to pay immediately to “prevent losses”"], ["Aufforderung, Software wie AnyDesk zu installieren", "Requests to install software such as AnyDesk"], ["Neue Kontaktaufnahme kurz nach dem Vorfall", "New contact shortly after the incident"], ["Gebühren für eine Auszahlung", "Fees required for a withdrawal"], ["Bitte um Geheimhaltung gegenüber der Bank", "Being asked to keep it secret from your bank"]],
    actions: [["Alle Zahlungen gestoppt", "All payments stopped"], ["Bank / Börse informiert", "Bank / exchange notified"], ["Passwörter geändert", "Passwords changed"], ["Fernzugriff entfernt", "Remote access removed"], ["Beweise gesichert", "Evidence preserved"], ["Anzeige erstattet", "Police report filed"]],
    myths: [
      { m: ["„Wenn ich noch einmal zahle, bekomme ich alles zurück.“", "“If I pay once more, I'll get everything back.”"], f: ["Folgezahlungen sind fast immer Teil desselben Betrugs.", "Follow-up payments are almost always part of the same fraud."] },
      { m: ["„Eine Anzeige bringt nichts.“", "“Reporting is pointless.”"], f: ["Anzeigen verknüpfen Fälle und sind oft Voraussetzung für Bank- und Versicherungsverfahren.", "Reports link cases and are often required for bank and insurance procedures."] },
      { m: ["„Ich warte erst ab.“", "“I'll wait and see.”"], f: ["Je früher Börsen informiert werden, desto eher können Mittel eingefroren werden.", "The earlier exchanges are informed, the more likely funds can be frozen."] },
    ],
    faq: [
      { q: ["Soll ich das Gerät ausschalten?", "Should I turn off the device?"], a: ["Trennen Sie es vom Internet, schalten Sie es aber nicht aus – flüchtige Spuren bleiben so erhalten.", "Disconnect it from the internet but do not switch it off – volatile traces remain preserved."] },
      { q: ["Wo erstatte ich Anzeige?", "Where do I report?"], a: ["Bei der Online-Wache Ihres Bundeslandes oder jeder Polizeidienststelle.", "At your federal state's online police station or any police station."] },
      { q: ["Muss ich den Täter konfrontieren?", "Should I confront the perpetrator?"], a: ["Nein. Brechen Sie den Kontakt ab, ohne ihn zu warnen, und sichern Sie vorher alle Nachrichten.", "No. End contact without warning them, after saving all messages."] },
    ],
  },
  {
    id: "kryptobetrug",
    kicker: ["Digitale Vermögenswerte", "Digital assets"],
    intro: ["Krypto-Transaktionen sind öffentlich einsehbar, aber unumkehrbar. Täter nutzen gefälschte Plattformen, manipulierte Wallets und Mixer, um Mittel schnell zu verschieben – dennoch hinterlässt jede Bewegung eine dauerhafte Spur im Ledger.", "Crypto transactions are publicly visible but irreversible. Perpetrators use fake platforms, manipulated wallets and mixers to move funds quickly – yet every movement leaves a permanent trace on the ledger."],
    facts: [
      { v: "100 %", l: ["der On-chain-Transaktionen öffentlich", "of on-chain transactions are public"] },
      { v: "0", l: ["Rückbuchungsfunktion im Protokoll", "built-in chargeback functions"] },
      { v: "≈ 10 min", l: ["durchschnittliche BTC-Blockzeit", "average BTC block time"] },
    ],
    flowTitle: ["Wie Gelder typischerweise fließen", "How funds typically flow"],
    flow: [
      { t: ["Einzahlung", "Deposit"], d: ["Opfer kauft Krypto bei einer regulierten Börse und sendet sie an eine Adresse der „Plattform“.", "Victim buys crypto on a regulated exchange and sends it to a “platform” address."] },
      { t: ["Sammeladresse", "Collector address"], d: ["Mittel vieler Opfer werden auf wenigen Adressen gebündelt.", "Funds from many victims are pooled into a few addresses."] },
      { t: ["Verschleierung", "Obfuscation"], d: ["Aufteilung, Chain-Hopping über Bridges, Tausch in Stablecoins.", "Splitting, chain-hopping via bridges, swapping into stablecoins."] },
      { t: ["Auszahlung", "Cash-out"], d: ["Über Börsen, OTC-Händler oder P2P-Märkte in Fiat-Geld.", "Via exchanges, OTC desks or P2P markets into fiat."] },
    ],
    flags: [["Plattform nicht bei der BaFin registriert", "Platform not registered with BaFin"], ["Garantierte tägliche Renditen", "Guaranteed daily returns"], ["Auszahlung nur gegen „Steuer“ oder „Gebühr“", "Withdrawal only after “tax” or “fee”"], ["Kontakt ausschließlich über WhatsApp/Telegram", "Contact only via WhatsApp/Telegram"], ["Aufforderung, die Seed-Phrase zu teilen", "Request to share your seed phrase"]],
    actions: [["Alle Transaktions-Hashes notiert", "All transaction hashes noted"], ["Empfängeradressen kopiert", "Recipient addresses copied"], ["Börse informiert, von der gesendet wurde", "Sending exchange notified"], ["Screenshots der Plattform gesichert", "Platform screenshots saved"], ["Seed-Phrase niemandem gegeben", "Seed phrase shared with no one"], ["Anzeige mit Adressen erstattet", "Report filed including addresses"]],
    myths: [
      { m: ["„Krypto ist anonym.“", "“Crypto is anonymous.”"], f: ["Sie ist pseudonym: Jede Bewegung bleibt dauerhaft nachvollziehbar.", "It is pseudonymous: every movement remains permanently traceable."] },
      { m: ["„Ein Hacker kann die Transaktion zurückholen.“", "“A hacker can reverse the transaction.”"], f: ["Das ist technisch nicht möglich. Solche Angebote sind Folgebetrug.", "That is technically impossible. Such offers are follow-up fraud."] },
      { m: ["„Die Börse ist schuld.“", "“The exchange is to blame.”"], f: ["Börsen können jedoch Konten der Empfänger sperren, wenn sie früh informiert werden.", "Exchanges can, however, freeze recipient accounts if informed early."] },
    ],
    faq: [
      { q: ["Was ist ein Transaktions-Hash?", "What is a transaction hash?"], a: ["Eine eindeutige ID jeder Transaktion, z. B. 0x… (ETH) oder 64 Zeichen (BTC). Sie finden ihn in Ihrer Wallet oder Börsenhistorie.", "A unique ID for each transaction, e.g. 0x… (ETH) or 64 characters (BTC). Find it in your wallet or exchange history."] },
      { q: ["Kann man Mittel einfrieren?", "Can funds be frozen?"], a: ["Nur zentrale Akteure wie Börsen oder bestimmte Stablecoin-Emittenten – meist auf behördliche Anfrage.", "Only central actors such as exchanges or certain stablecoin issuers – usually upon request by authorities."] },
      { q: ["Hilft der Explorer auf dieser Seite?", "Does the explorer on this site help?"], a: ["Er zeigt öffentliche Transaktionen einer Adresse. Er beweist keine Identität.", "It shows public transactions of an address. It does not prove identity."] },
    ],
  },
  {
    id: "anlagebetrug",
    kicker: ["Investmentbetrug", "Investment fraud"],
    intro: ["Gefälschte Handelsplattformen sehen professionell aus, zeigen steigende Kontostände und zahlen anfangs kleine Gewinne aus. Die Zahlen auf dem Bildschirm sind jedoch frei erfunden – das Geld ist längst weitergeleitet.", "Fake trading platforms look professional, show rising balances and pay out small profits at first. The numbers on screen are invented – the money has long been moved on."],
    facts: [
      { v: "BaFin", l: ["Unternehmensdatenbank prüfen", "Check the company database"] },
      { v: "5–15 %", l: ["typisch versprochene Monatsrendite", "typical promised monthly return"] },
      { v: "1.", l: ["kleine Auszahlung schafft Vertrauen", "small payout builds trust"] },
    ],
    flowTitle: ["Der Lebenszyklus einer Fake-Plattform", "Lifecycle of a fake platform"],
    flow: [
      { t: ["Anwerbung", "Recruitment"], d: ["Werbung mit Prominenten, Social-Media-Anzeigen oder „Berater“ am Telefon.", "Celebrity ads, social media ads or a phone “advisor”."] },
      { t: ["Testeinzahlung", "Test deposit"], d: ["250 € Einstieg, schnelle Scheingewinne im Dashboard.", "€250 entry, quick fake profits on the dashboard."] },
      { t: ["Eskalation", "Escalation"], d: ["Kredite, Fernzugriff, „exklusive“ Chancen für höhere Einzahlungen.", "Loans, remote access, “exclusive” opportunities for larger deposits."] },
      { t: ["Sperre", "Lock-out"], d: ["Auszahlung nur gegen Gebühren, Steuern oder „Geldwäscheprüfung“.", "Withdrawal only against fees, taxes or an “AML check”."] },
      { t: ["Verschwinden", "Disappearance"], d: ["Plattform offline, Berater nicht erreichbar, neue Domain.", "Platform offline, advisor unreachable, new domain."] },
    ],
    flags: [["Kein Impressum oder Sitz in Offshore-Staat", "No legal notice or offshore seat"], ["Domain erst wenige Monate alt", "Domain only a few months old"], ["Berater drängt zu Krediten", "Advisor pushes you to take loans"], ["Fernzugriff „zur Unterstützung“", "Remote access “to help you”"], ["Prominente werben angeblich dafür", "Celebrities supposedly endorse it"]],
    actions: [["Plattform in BaFin-Datenbank geprüft", "Platform checked in BaFin database"], ["Domain und URL gesichert", "Domain and URL saved"], ["Einzahlungsbelege gesammelt", "Deposit receipts collected"], ["Kontakt abgebrochen", "Contact ended"], ["Meldung an BaFin", "Reported to BaFin"], ["Polizeiliche Anzeige", "Police report filed"]],
    myths: [
      { m: ["„Ich habe doch Gewinne ausgezahlt bekommen.“", "“But I received payouts.”"], f: ["Kleine Auszahlungen sind ein bewusster Köder.", "Small payouts are a deliberate lure."] },
      { m: ["„Die Website wirkt seriös.“", "“The website looks legitimate.”"], f: ["Professionelle Vorlagen kosten Tätern nur wenige Euro.", "Professional templates cost perpetrators only a few euros."] },
      { m: ["„Für die Auszahlung muss ich Steuern vorab zahlen.“", "“I must prepay taxes to withdraw.”"], f: ["Kein seriöser Broker verlangt das. Es ist die nächste Betrugsstufe.", "No legitimate broker requires this. It is the next stage of fraud."] },
    ],
    faq: [
      { q: ["Wie prüfe ich einen Anbieter?", "How do I check a provider?"], a: ["In der BaFin-Unternehmensdatenbank und den Warnlisten der BaFin sowie der IOSCO.", "In the BaFin company database and the warning lists of BaFin and IOSCO."] },
      { q: ["Ich habe einen Kredit aufgenommen – was nun?", "I took out a loan – what now?"], a: ["Informieren Sie sofort die Bank und schildern Sie den Betrug; holen Sie Schuldnerberatung ein.", "Inform the bank immediately, explain the fraud and seek debt counselling."] },
      { q: ["Der Berater ruft weiter an.", "The advisor keeps calling."], a: ["Nicht antworten, Nummer blockieren, Anrufe dokumentieren.", "Don't answer, block the number, document calls."] },
    ],
  },
  {
    id: "phishing",
    kicker: ["Täuschung & Manipulation", "Deception & manipulation"],
    intro: ["Phishing zielt nicht auf Technik, sondern auf Menschen. Täuschend echte Nachrichten erzeugen Zeitdruck, Angst oder Neugier – damit Sie klicken, bevor Sie prüfen.", "Phishing targets people, not technology. Convincing messages create urgency, fear or curiosity – so you click before you check."],
    facts: [
      { v: "0", l: ["Banken, die per Mail nach TAN fragen", "banks that ask for a TAN by email"] },
      { v: "3 s", l: ["genügen für einen Fehlklick", "are enough for a mis-click"] },
      { v: "MFA", l: ["stoppt die meisten Kontoübernahmen", "stops most account takeovers"] },
    ],
    flowTitle: ["Anatomie eines Angriffs", "Anatomy of an attack"],
    flow: [
      { t: ["Köder", "Lure"], d: ["E-Mail, SMS („Smishing“) oder Anruf („Vishing“) im Namen eines bekannten Unternehmens.", "Email, SMS (“smishing”) or call (“vishing”) in the name of a known company."] },
      { t: ["Auslöser", "Trigger"], d: ["Angebliche Sperre, Paket, Rückerstattung – mit Frist.", "Supposed lock, parcel, refund – with a deadline."] },
      { t: ["Gefälschte Seite", "Fake page"], d: ["Kopie der echten Login-Seite mit ähnlicher Domain.", "Copy of the real login page with a look-alike domain."] },
      { t: ["Missbrauch", "Abuse"], d: ["Zugangsdaten werden sofort genutzt, oft binnen Minuten.", "Credentials are used immediately, often within minutes."] },
    ],
    flags: [["Absenderdomain weicht minimal ab", "Sender domain differs slightly"], ["Unpersönliche Anrede", "Impersonal greeting"], ["Frist von 24 Stunden", "24-hour deadline"], ["Link-Ziel passt nicht zum Text", "Link target doesn't match text"], ["Anrufer bittet um TAN oder Code", "Caller asks for TAN or code"]],
    actions: [["Passwort von sauberem Gerät geändert", "Password changed from a clean device"], ["Alle Sitzungen beendet", "All sessions ended"], ["MFA aktiviert", "MFA enabled"], ["Bank angerufen (bei Bankdaten)", "Bank called (if bank data)"], ["Mail als .eml gesichert", "Email saved as .eml"], ["An Verbraucherzentrale gemeldet", "Reported to consumer centre"]],
    myths: [
      { m: ["„Ich erkenne Phishing sofort.“", "“I always spot phishing.”"], f: ["Gezieltes Spear-Phishing nutzt echte Namen und Kontexte.", "Targeted spear phishing uses real names and context."] },
      { m: ["„Das Schloss-Symbol bedeutet sicher.“", "“The padlock means safe.”"], f: ["Es zeigt nur eine verschlüsselte Verbindung – auch zu Betrugsseiten.", "It only shows an encrypted connection – also to fraud sites."] },
      { m: ["„Nur Klicken ist harmlos.“", "“Just clicking is harmless.”"], f: ["Meist ja – gefährlich wird es bei Eingaben oder Downloads.", "Usually yes – danger starts with entering data or downloads."] },
    ],
    faq: [
      { q: ["Ich habe Daten eingegeben – was zuerst?", "I entered data – what first?"], a: ["Passwort ändern, bei Bankdaten sofort die Bank bzw. 116 116 anrufen.", "Change the password; for bank data call your bank or 116 116 immediately."] },
      { q: ["Wie prüfe ich einen Link?", "How do I check a link?"], a: ["Maus darüber halten und die echte Domain von rechts nach links lesen.", "Hover over it and read the real domain from right to left."] },
      { q: ["Wohin weiterleiten?", "Where to forward it?"], a: ["An den Phishing-Radar der Verbraucherzentrale NRW und an den betroffenen Anbieter.", "To the Verbraucherzentrale NRW phishing radar and the affected provider."] },
    ],
  },
  {
    id: "identitaetsdiebstahl",
    kicker: ["Missbrauch persönlicher Daten", "Misuse of personal data"],
    intro: ["Mit gestohlenen Ausweisdaten schließen Täter Verträge, eröffnen Konten oder bestellen Waren. Oft bemerken Betroffene es erst durch Mahnungen – dann zählt eine lückenlose Dokumentation.", "With stolen ID data, perpetrators sign contracts, open accounts or order goods. Victims often notice only through reminders – then thorough documentation matters."],
    facts: [
      { v: "1×", l: ["kostenlose SCHUFA-Auskunft pro Jahr (Art. 15)", "free SCHUFA report per year (Art. 15)"] },
      { v: "§ 263", l: ["StGB – Betrug", "German Criminal Code – fraud"] },
      { v: "Art. 17", l: ["DSGVO – Recht auf Löschung", "GDPR – right to erasure"] },
    ],
    flowTitle: ["Wie Identitäten missbraucht werden", "How identities are misused"],
    flow: [
      { t: ["Datenabfluss", "Data leak"], d: ["Datenleck, Phishing, gefälschte Wohnungsanzeige mit Ausweis-Upload.", "Data breach, phishing, fake rental ad requesting ID upload."] },
      { t: ["Verifizierung", "Verification"], d: ["Video-Ident mit Ihrem Ausweis über einen „Job“ oder Strohmann.", "Video-ident with your ID via a “job” or straw man."] },
      { t: ["Missbrauch", "Misuse"], d: ["Konten, Handyverträge, Bestellungen auf Rechnung.", "Accounts, phone contracts, orders on invoice."] },
      { t: ["Entdeckung", "Discovery"], d: ["Mahnungen, Inkasso, negative SCHUFA-Einträge.", "Reminders, debt collection, negative credit entries."] },
    ],
    flags: [["Post über unbekannte Verträge", "Mail about unknown contracts"], ["Pakete, die Sie nicht bestellt haben", "Parcels you didn't order"], ["Jobangebot mit Video-Ident", "Job offer requiring video ident"], ["Plötzlich abgelehnte Kredite", "Sudden credit rejections"], ["Login-Hinweise aus fremden Ländern", "Login alerts from foreign countries"]],
    actions: [["Anzeige erstattet", "Police report filed"], ["SCHUFA-Selbstauskunft angefordert", "SCHUFA self-disclosure requested"], ["Händlern schriftlich widersprochen", "Objected to merchants in writing"], ["Ausweisverlust gemeldet (falls zutreffend)", "ID loss reported (if applicable)"], ["Kontoauszüge geprüft", "Statements checked"], ["Ordner mit Schriftverkehr angelegt", "Folder with correspondence created"]],
    myths: [
      { m: ["„Ich muss die Rechnungen zahlen.“", "“I must pay the invoices.”"], f: ["Nein – widersprechen Sie schriftlich unter Verweis auf Ihre Anzeige.", "No – object in writing, referencing your police report."] },
      { m: ["„Nur Prominente sind betroffen.“", "“Only celebrities are affected.”"], f: ["Jeder mit Ausweisdaten im Umlauf kann betroffen sein.", "Anyone whose ID data circulates can be affected."] },
      { m: ["„Einmal geklärt, ist es vorbei.“", "“Once resolved, it's over.”"], f: ["Daten können erneut genutzt werden – prüfen Sie regelmäßig.", "Data may be reused – check regularly."] },
    ],
    faq: [
      { q: ["Muss ich einen neuen Ausweis beantragen?", "Do I need a new ID?"], a: ["Bei Verlust oder Diebstahl des Dokuments ja; bei bloßen Kopien entscheidet das Bürgeramt.", "If the document was lost or stolen, yes; for mere copies, ask your citizens' office."] },
      { q: ["Wie widerspreche ich Inkasso?", "How do I contest debt collection?"], a: ["Schriftlich, mit Aktenzeichen der Anzeige, per Einschreiben.", "In writing, with the police case number, by registered mail."] },
      { q: ["Hilft ein Datenschutzauskunftsersuchen?", "Does a GDPR access request help?"], a: ["Ja, nach Art. 15 DSGVO erfahren Sie, welche Daten ein Unternehmen gespeichert hat.", "Yes, under Art. 15 GDPR you learn what data a company holds."] },
    ],
  },
  {
    id: "kontouebernahme",
    kicker: ["Account Takeover", "Account takeover"],
    intro: ["Bei einer Kontoübernahme kontrollieren Täter Ihr E-Mail-, Social-Media- oder Bankkonto. Das E-Mail-Konto ist dabei der Generalschlüssel – wer es besitzt, kann fast alle anderen Passwörter zurücksetzen.", "In an account takeover, perpetrators control your email, social media or bank account. Email is the master key – whoever owns it can reset almost every other password."],
    facts: [
      { v: "1", l: ["E-Mail-Konto öffnet alle anderen", "email account unlocks all others"] },
      { v: "MFA", l: ["App oder Hardware-Key statt SMS", "app or hardware key over SMS"] },
      { v: "≠", l: ["ein Passwort pro Dienst", "one password per service"] },
    ],
    flowTitle: ["Rückeroberung in vier Schritten", "Recovery in four steps"],
    flow: [
      { t: ["Zugang zurückgewinnen", "Regain access"], d: ["Offizielles Wiederherstellungsformular des Anbieters nutzen.", "Use the provider's official recovery form."] },
      { t: ["Täter aussperren", "Lock out attacker"], d: ["Alle Sitzungen beenden, fremde Geräte und Apps entfernen.", "End all sessions, remove unknown devices and apps."] },
      { t: ["Wiederherstellung prüfen", "Check recovery"], d: ["Ersatz-E-Mail, Telefonnummer und Weiterleitungsregeln kontrollieren.", "Check backup email, phone number and forwarding rules."] },
      { t: ["Umfeld warnen", "Warn contacts"], d: ["Kontakte informieren, dass Nachrichten nicht von Ihnen stammen.", "Tell contacts that messages were not from you."] },
    ],
    flags: [["Unbekannte Login-Benachrichtigungen", "Unknown login notifications"], ["Geänderte Wiederherstellungs-E-Mail", "Changed recovery email"], ["Neue Weiterleitungsregeln im Postfach", "New mailbox forwarding rules"], ["Freunde erhalten Geldbitten", "Friends receive money requests"], ["MFA-Codes, die Sie nicht angefordert haben", "MFA codes you didn't request"]],
    actions: [["Passwort zurückgesetzt", "Password reset"], ["Alle Sitzungen abgemeldet", "All sessions signed out"], ["Weiterleitungen gelöscht", "Forwarding rules deleted"], ["MFA per App aktiviert", "App-based MFA enabled"], ["Kontakte gewarnt", "Contacts warned"], ["Anbieter-Support kontaktiert", "Provider support contacted"]],
    myths: [
      { m: ["„SMS-Codes sind sicher genug.“", "“SMS codes are secure enough.”"], f: ["SIM-Swapping kann sie abfangen – Authenticator-Apps sind robuster.", "SIM swapping can intercept them – authenticator apps are stronger."] },
      { m: ["„Mein Passwort ist stark, also bin ich sicher.“", "“My password is strong, so I'm safe.”"], f: ["Wiederverwendete Passwörter werden über Datenlecks ausprobiert.", "Reused passwords are tested via data leaks."] },
      { m: ["„Der Support schreibt mir zuerst.“", "“Support will message me first.”"], f: ["Echte Anbieter melden sich nicht per Direktnachricht.", "Real providers don't contact you by DM."] },
    ],
    faq: [
      { q: ["Täter hat die Telefonnummer geändert.", "The attacker changed the phone number."], a: ["Nutzen Sie die Identitätsprüfung des Anbieters und Ihren Mobilfunkanbieter (SIM-Sperre).", "Use the provider's identity verification and your mobile carrier (SIM lock)."] },
      { q: ["Wurde mein Passwort geleakt?", "Was my password leaked?"], a: ["Prüfen Sie dies beim HPI Identity Leak Checker oder Have I Been Pwned.", "Check with the HPI Identity Leak Checker or Have I Been Pwned."] },
      { q: ["Ist eine Anzeige sinnvoll?", "Is a report worthwhile?"], a: ["Ja, insbesondere wenn Geld gefordert oder in Ihrem Namen betrogen wurde.", "Yes, especially if money was requested or fraud was done in your name."] },
    ],
  },
  {
    id: "ransomware",
    kicker: ["Verschlüsselung & Erpressung", "Encryption & extortion"],
    intro: ["Ransomware verschlüsselt Daten und fordert Lösegeld – oft mit der zusätzlichen Drohung, gestohlene Daten zu veröffentlichen. Besonnenes Handeln schützt Beweise und Ihre Wiederherstellungsoptionen.", "Ransomware encrypts data and demands ransom – often with an added threat to publish stolen data. Deliberate action protects evidence and your recovery options."],
    facts: [
      { v: "ZAC", l: ["Zentrale Ansprechstelle Cybercrime", "Central cybercrime contact point"] },
      { v: "3-2-1", l: ["Backup-Regel", "backup rule"] },
      { v: "0 €", l: ["empfohlenes Lösegeld", "recommended ransom"] },
    ],
    flowTitle: ["Incident-Response-Ablauf", "Incident response flow"],
    flow: [
      { t: ["Isolieren", "Isolate"], d: ["Netzwerkkabel ziehen, WLAN aus – Gerät eingeschaltet lassen.", "Unplug network, Wi-Fi off – keep device powered on."] },
      { t: ["Erfassen", "Capture"], d: ["Erpressernachricht fotografieren, Dateiendungen notieren.", "Photograph ransom note, note file extensions."] },
      { t: ["Melden", "Report"], d: ["ZAC der Landespolizei, Unternehmen zusätzlich BSI.", "State police ZAC; businesses also the BSI."] },
      { t: ["Wiederherstellen", "Restore"], d: ["Aus sauberen Offline-Backups, nach forensischer Freigabe.", "From clean offline backups, after forensic clearance."] },
    ],
    flags: [["Dateien mit unbekannter Endung", "Files with unknown extension"], ["Textdatei „README“ in jedem Ordner", "“README” text file in every folder"], ["Ungewöhnlich hohe CPU-Last", "Unusually high CPU load"], ["Deaktivierter Virenschutz", "Disabled antivirus"], ["Nicht angeforderte Admin-Konten", "Unrequested admin accounts"]],
    actions: [["Gerät vom Netz getrennt", "Device disconnected"], ["Nicht ausgeschaltet", "Not switched off"], ["Erpressernachricht fotografiert", "Ransom note photographed"], ["Backups isoliert", "Backups isolated"], ["ZAC informiert", "ZAC notified"], ["Datenschutzpflichten geprüft", "Data protection duties checked"]],
    myths: [
      { m: ["„Nach Zahlung bekomme ich alles zurück.“", "“Paying gets everything back.”"], f: ["Es gibt keine Garantie – und Zahlende werden oft erneut angegriffen.", "There is no guarantee – and payers are often targeted again."] },
      { m: ["„Neu installieren reicht.“", "“Reinstalling is enough.”"], f: ["Ohne Ursachenanalyse bleibt der Zugang der Täter oft bestehen.", "Without root-cause analysis, attacker access often remains."] },
      { m: ["„Nur Firmen sind Ziel.“", "“Only businesses are targets.”"], f: ["Auch Privatgeräte und NAS-Speicher werden verschlüsselt.", "Private devices and NAS storage get encrypted too."] },
    ],
    faq: [
      { q: ["Gibt es kostenlose Entschlüsseler?", "Are there free decryptors?"], a: ["Für manche Varianten ja – prüfen Sie das Projekt „No More Ransom“.", "For some variants yes – check the “No More Ransom” project."] },
      { q: ["Muss ich Kunden informieren?", "Must I inform customers?"], a: ["Bei personenbezogenen Daten gelten Meldepflichten nach DSGVO (72 Stunden).", "With personal data, GDPR notification duties apply (72 hours)."] },
      { q: ["Darf ich mit den Tätern verhandeln?", "May I negotiate with attackers?"], a: ["Tun Sie dies nicht eigenständig; sprechen Sie zuerst mit der Polizei.", "Don't do it on your own; speak with the police first."] },
    ],
  },
  {
    id: "romance-scam",
    kicker: ["Emotionale Manipulation", "Emotional manipulation"],
    intro: ["Romance Scams sind organisierte Kriminalität mit Drehbüchern. Über Wochen wird eine Beziehung aufgebaut – erst dann folgen Notlagen, Zoll-Gebühren oder Krypto-„Investments“. Scham ist fehl am Platz: Die Täter sind Profis.", "Romance scams are organised crime with scripts. A relationship is built over weeks – only then come emergencies, customs fees or crypto “investments”. Shame is misplaced: the perpetrators are professionals."],
    facts: [
      { v: "4–12", l: ["Wochen Vertrauensaufbau", "weeks of trust-building"] },
      { v: "0", l: ["echte Videoanrufe", "real video calls"] },
      { v: "116 006", l: ["Weisser Ring Opfer-Telefon", "Weisser Ring helpline"] },
    ],
    flowTitle: ["Das Drehbuch der Täter", "The perpetrators' script"],
    flow: [
      { t: ["Kontakt", "Contact"], d: ["Dating-App, Social Media oder „falsch verbunden“-Nachricht.", "Dating app, social media or a “wrong number” message."] },
      { t: ["Love Bombing", "Love bombing"], d: ["Tägliche Nachrichten, Zukunftspläne, große Gefühle.", "Daily messages, future plans, intense feelings."] },
      { t: ["Isolation", "Isolation"], d: ["Wechsel zu WhatsApp/Telegram, Misstrauen gegen Freunde säen.", "Switch to WhatsApp/Telegram, sowing distrust of friends."] },
      { t: ["Notlage", "Crisis"], d: ["Krankenhaus, Zoll, eingefrorenes Konto – oder ein „sicheres Investment“.", "Hospital, customs, frozen account – or a “safe investment”."] },
      { t: ["Endlosschleife", "Endless loop"], d: ["Jede Zahlung führt zu einer neuen Forderung.", "Every payment leads to a new demand."] },
    ],
    flags: [["Videoanrufe scheitern immer", "Video calls always fail"], ["Beruf im Ausland (Militär, Ölplattform, Arzt)", "Job abroad (military, oil rig, doctor)"], ["Profilbilder zu perfekt", "Profile pictures too perfect"], ["Erste Geldbitte nach Wochen", "First money request after weeks"], ["Bitte um Geheimhaltung", "Request for secrecy"]],
    actions: [["Kein weiteres Geld gesendet", "No more money sent"], ["Chatverlauf vollständig exportiert", "Full chat history exported"], ["Profilbilder rückwärts gesucht", "Reverse image search done"], ["Kontakt beendet", "Contact ended"], ["Plattform informiert", "Platform notified"], ["Mit Vertrauensperson gesprochen", "Talked to someone you trust"]],
    myths: [
      { m: ["„Mir passiert das nicht.“", "“It won't happen to me.”"], f: ["Betroffen sind alle Altersgruppen und Bildungsniveaus.", "All age groups and education levels are affected."] },
      { m: ["„Die Gefühle waren echt.“", "“The feelings were real.”"], f: ["Ihre Gefühle ja – die Person dahinter war ein Skript.", "Yours were – the person behind it was a script."] },
      { m: ["„Wenn ich noch helfe, kommt sie/er.“", "“If I help once more, they'll come.”"], f: ["Ein Treffen findet in diesen Fällen nie statt.", "In these cases, a meeting never happens."] },
    ],
    faq: [
      { q: ["Wie prüfe ich ein Profilbild?", "How do I check a profile photo?"], a: ["Mit einer Bilder-Rückwärtssuche (z. B. Google Lens, TinEye).", "With a reverse image search (e.g. Google Lens, TinEye)."] },
      { q: ["Soll ich den Betrug ansprechen?", "Should I confront them?"], a: ["Nein. Sichern Sie Beweise und brechen Sie den Kontakt kommentarlos ab.", "No. Save evidence and end contact without comment."] },
      { q: ["Ich schäme mich – wer hilft?", "I feel ashamed – who helps?"], a: ["Der Weisse Ring (116 006) bietet vertrauliche, kostenlose Beratung.", "Weisser Ring (116 006) offers confidential, free counselling."] },
    ],
  },
  {
    id: "impersonation",
    kicker: ["Falsche Identitäten", "False identities"],
    intro: ["Täter geben sich als Polizei, Bank, Behörde, Familienmitglied oder Prominente aus. Mit gefälschter Rufnummer, KI-Stimme oder kopiertem Profil wirken sie täuschend echt. Die Lösung: immer über einen unabhängigen Kanal zurückrufen.", "Perpetrators pose as police, bank, authorities, family members or celebrities. With spoofed numbers, AI voices or cloned profiles they seem genuine. The solution: always call back via an independent channel."],
    facts: [
      { v: "110", l: ["ruft Sie nie selbst an", "never calls you itself"] },
      { v: "KI", l: ["Stimmen lassen sich klonen", "voices can be cloned"] },
      { v: "1", l: ["unabhängiger Rückruf genügt", "independent callback suffices"] },
    ],
    flowTitle: ["Typische Rollen", "Typical roles"],
    flow: [
      { t: ["Falsche Polizei", "Fake police"], d: ["Warnt vor Einbrechern und will Wertsachen „sichern“.", "Warns of burglars and wants to “safeguard” valuables."] },
      { t: ["Falsche Bank", "Fake bank"], d: ["Meldet verdächtige Buchung und verlangt eine TAN.", "Reports a suspicious transaction and asks for a TAN."] },
      { t: ["„Hallo Mama“", "“Hi Mum”"], d: ["Kind mit neuer Nummer braucht dringend Geld.", "Child with a new number urgently needs money."] },
      { t: ["Falsche Rückholer", "Fake recovery agents"], d: ["Versprechen gegen Gebühr, verlorenes Geld zurückzuholen.", "Promise to recover lost money for a fee."] },
    ],
    flags: [["Anzeige 110 im Display", "110 shown on caller ID"], ["Neue Nummer eines Angehörigen", "Relative's new number"], ["Bitte um Bargeld- oder Goldübergabe", "Request to hand over cash or gold"], ["Vorabgebühr für Rückholung", "Upfront fee for recovery"], ["Verbot, mit anderen zu sprechen", "Told not to talk to anyone"]],
    actions: [["Aufgelegt", "Hung up"], ["Über bekannte Nummer zurückgerufen", "Called back via known number"], ["Familien-Codewort vereinbart", "Family code word agreed"], ["Nummer/Profil gesichert", "Number/profile saved"], ["Plattform gemeldet", "Reported to platform"], ["Polizei informiert", "Police informed"]],
    myths: [
      { m: ["„Die Nummer im Display stimmt.“", "“The displayed number is real.”"], f: ["Rufnummern lassen sich technisch fälschen (Spoofing).", "Numbers can be technically spoofed."] },
      { m: ["„Ich erkenne die Stimme meines Kindes.“", "“I'd recognise my child's voice.”"], f: ["Wenige Sekunden Audio reichen für KI-Klone.", "A few seconds of audio suffice for AI clones."] },
      { m: ["„Rückholdienste helfen Opfern.“", "“Recovery services help victims.”"], f: ["Wer Rückholung garantiert und Vorkasse verlangt, betrügt.", "Anyone guaranteeing recovery for upfront payment is a fraudster."] },
    ],
    faq: [
      { q: ["Holt die Polizei Wertsachen ab?", "Does the police collect valuables?"], a: ["Niemals. Legen Sie auf und wählen Sie selbst 110.", "Never. Hang up and dial 110 yourself."] },
      { q: ["Was ist ein Familien-Codewort?", "What is a family code word?"], a: ["Ein vereinbartes Wort, das nur Ihre Familie kennt – zur Prüfung in Notfällen.", "An agreed word only your family knows – for verification in emergencies."] },
      { q: ["Ist Blockscaner ein Rückholdienst?", "Is Blockscaner a recovery service?"], a: ["Nein. Wir analysieren öffentliche Daten und versprechen keine Rückholung.", "No. We analyse public data and do not promise recovery."] },
    ],
  },
  {
    id: "wallet",
    kicker: ["Self-Custody", "Self-custody"],
    intro: ["Wer die Seed-Phrase kennt, besitzt die Wallet. Wer eine bösartige Freigabe signiert, gibt Token aus der Hand. Eine kompromittierte Wallet ist nicht reparierbar – nur verlassbar.", "Whoever knows the seed phrase owns the wallet. Whoever signs a malicious approval hands over tokens. A compromised wallet cannot be repaired – only abandoned."],
    facts: [
      { v: "12/24", l: ["Wörter der Seed-Phrase", "seed phrase words"] },
      { v: "∞", l: ["Unbegrenzte Approvals sind riskant", "unlimited approvals are risky"] },
      { v: "0", l: ["legitime Gründe, die Seed zu teilen", "legitimate reasons to share a seed"] },
    ],
    flowTitle: ["Notfallplan bei Kompromittierung", "Emergency plan when compromised"],
    flow: [
      { t: ["Neue Wallet", "New wallet"], d: ["Auf sauberem Gerät eine neue Seed-Phrase erzeugen, offline notieren.", "Create a new seed on a clean device, write it down offline."] },
      { t: ["Mittel retten", "Move funds"], d: ["Verbliebene Assets sofort übertragen – vor dem Sweeper-Bot.", "Transfer remaining assets immediately – before a sweeper bot."] },
      { t: ["Freigaben widerrufen", "Revoke approvals"], d: ["Approvals mit revoke.cash prüfen und widerrufen.", "Review and revoke approvals with revoke.cash."] },
      { t: ["Ursache finden", "Find the cause"], d: ["Gefälschte Seite, Malware oder geteilte Seed identifizieren.", "Identify fake site, malware or shared seed."] },
    ],
    flags: [["Seite verlangt Seed zur „Validierung“", "Site asks for seed to “validate”"], ["Signatur für setApprovalForAll", "Signature for setApprovalForAll"], ["Unbekannte Token im Portfolio", "Unknown tokens in portfolio"], ["Airdrop, der „Claim“ verlangt", "Airdrop requiring a “claim”"], ["Support schreibt per DM", "Support DMs you"]],
    actions: [["Neue Wallet erstellt", "New wallet created"], ["Restguthaben übertragen", "Remaining balance moved"], ["Approvals widerrufen", "Approvals revoked"], ["Gerät auf Malware geprüft", "Device scanned for malware"], ["Hardware-Wallet erwogen", "Hardware wallet considered"], ["Vorfall dokumentiert", "Incident documented"]],
    myths: [
      { m: ["„Passwort ändern reicht.“", "“Changing the password is enough.”"], f: ["Das Passwort schützt nur die App – die Seed bleibt kompromittiert.", "The password only protects the app – the seed remains compromised."] },
      { m: ["„Hardware-Wallets sind unhackbar.“", "“Hardware wallets are unhackable.”"], f: ["Sie schützen den Schlüssel, nicht vor böswilligen Signaturen.", "They protect the key, not against malicious signatures."] },
      { m: ["„Ein Screenshot der Seed ist ein Backup.“", "“A seed screenshot is a backup.”"], f: ["Cloud-Fotos sind ein häufiger Diebstahlsweg.", "Cloud photos are a common theft vector."] },
    ],
    faq: [
      { q: ["Was ist ein Approval?", "What is an approval?"], a: ["Eine Erlaubnis für einen Smart Contract, Ihre Token zu bewegen.", "A permission for a smart contract to move your tokens."] },
      { q: ["Was ist ein Sweeper-Bot?", "What is a sweeper bot?"], a: ["Ein Skript, das jede Einzahlung auf eine kompromittierte Adresse sofort abzieht.", "A script that drains every deposit to a compromised address instantly."] },
      { q: ["Kann ich meine Wallet hier prüfen?", "Can I check my wallet here?"], a: ["Ja, der Explorer zeigt öffentliche Transaktionen – ohne Seed oder Login.", "Yes, the explorer shows public transactions – without seed or login."] },
    ],
  },
  {
    id: "beweissicherung",
    kicker: ["Digitale Forensik für Betroffene", "Digital forensics for victims"],
    intro: ["Beweise sind die Grundlage jeder Anzeige, Bankreklamation und Analyse. Entscheidend ist, sie unverändert, vollständig und chronologisch zu sichern – bevor Täter Chats löschen oder Seiten verschwinden.", "Evidence is the foundation of every report, bank claim and analysis. What matters is preserving it unchanged, complete and chronological – before perpetrators delete chats or sites vanish."],
    facts: [
      { v: ".eml", l: ["Original-E-Mail mit Headern", "original email with headers"] },
      { v: "UTC", l: ["Zeitzone immer angeben", "always state timezone"] },
      { v: "SHA-256", l: ["Prüfsumme belegt Unverändertheit", "checksum proves integrity"] },
    ],
    flowTitle: ["Beweiskette aufbauen", "Building the chain of evidence"],
    flow: [
      { t: ["Sammeln", "Collect"], d: ["Chats, E-Mails, Kontoauszüge, Hashes, URLs, Profile.", "Chats, emails, statements, hashes, URLs, profiles."] },
      { t: ["Sichern", "Preserve"], d: ["Exportfunktionen nutzen, Originale nicht bearbeiten.", "Use export functions, don't edit originals."] },
      { t: ["Ordnen", "Organise"], d: ["Chronologische Tabelle: Datum, Uhrzeit, Ereignis, Beleg.", "Chronological table: date, time, event, proof."] },
      { t: ["Duplizieren", "Duplicate"], d: ["Zwei Kopien auf getrennten Speichermedien.", "Two copies on separate storage media."] },
    ],
    flags: [["Täter bitten, Chats zu löschen", "Perpetrators ask to delete chats"], ["Nachrichten „verschwinden“ automatisch", "Messages auto-disappear"], ["Plattform-URL ändert sich", "Platform URL changes"], ["Screenshots ohne Datum", "Screenshots without date"], ["Nur Fotos vom Bildschirm", "Only photos of the screen"]],
    actions: [["Chats exportiert", "Chats exported"], ["E-Mails als .eml gesichert", "Emails saved as .eml"], ["Transaktions-Hashes gelistet", "Transaction hashes listed"], ["Kontoauszüge gespeichert", "Statements saved"], ["Zeitleiste erstellt", "Timeline created"], ["Zweite Kopie angelegt", "Second copy made"]],
    myths: [
      { m: ["„Screenshots reichen.“", "“Screenshots suffice.”"], f: ["Exporte mit Metadaten sind deutlich belastbarer.", "Exports with metadata are far more robust."] },
      { m: ["„Ich lösche peinliche Teile.“", "“I'll delete embarrassing parts.”"], f: ["Lücken schwächen die Glaubwürdigkeit – Ermittler urteilen nicht.", "Gaps weaken credibility – investigators don't judge."] },
      { m: ["„Die Polizei sichert alles selbst.“", "“Police will secure everything.”"], f: ["Viele Daten existieren nur auf Ihrem Gerät.", "Much data exists only on your device."] },
    ],
    faq: [
      { q: ["Wie exportiere ich WhatsApp-Chats?", "How do I export WhatsApp chats?"], a: ["Chat öffnen → Mehr → Chat exportieren → mit Medien.", "Open chat → More → Export chat → include media."] },
      { q: ["Wie sichere ich eine Website?", "How do I preserve a website?"], a: ["Screenshot mit URL und Uhrzeit, zusätzlich Archivierung über web.archive.org.", "Screenshot with URL and time, plus archiving via web.archive.org."] },
      { q: ["Kann ich Ihnen Beweise schicken?", "Can I send you evidence?"], a: ["Ja, über das vertrauliche Formular mit Dateiupload.", "Yes, via the confidential form with file upload."] },
    ],
  },
  {
    id: "meldewege",
    kicker: ["Zuständigkeiten", "Responsibilities"],
    intro: ["Wer ist wofür zuständig? Polizei ermittelt, Banken und Börsen können Konten sperren, Aufsichtsbehörden warnen vor Anbietern, Opferhilfen begleiten Sie. Die richtige Reihenfolge spart Zeit.", "Who is responsible for what? Police investigate, banks and exchanges can freeze accounts, regulators warn about providers, victim support accompanies you. The right order saves time."],
    facts: [
      { v: "16", l: ["Online-Wachen der Bundesländer", "state online police stations"] },
      { v: "BaFin", l: ["unerlaubte Finanzgeschäfte", "unauthorised financial business"] },
      { v: "BSI", l: ["IT-Sicherheitsvorfälle", "IT security incidents"] },
    ],
    flowTitle: ["Reihenfolge der Meldungen", "Order of reports"],
    flow: [
      { t: ["Bank / Börse", "Bank / exchange"], d: ["Sofort – sie können Zahlungen stoppen oder Konten sperren.", "Immediately – they can stop payments or freeze accounts."] },
      { t: ["Polizei", "Police"], d: ["Online-Anzeige; Aktenzeichen für alle weiteren Stellen.", "Online report; case number for all other bodies."] },
      { t: ["Aufsicht", "Regulator"], d: ["BaFin bei Anlagebetrug, Verbraucherzentrale bei Phishing.", "BaFin for investment fraud, consumer centre for phishing."] },
      { t: ["Plattformen", "Platforms"], d: ["Dating-App, Social Media, Hoster der Betrugsseite.", "Dating app, social media, host of the fraud site."] },
      { t: ["Opferhilfe", "Victim support"], d: ["Weisser Ring, lokale Opferberatung.", "Weisser Ring, local victim counselling."] },
    ],
    flags: [["„Behörde“ verlangt Gebühren", "“Authority” demands fees"], ["Angebliche Interpol-Mail", "Alleged Interpol email"], ["Anwalt meldet sich ungefragt", "Lawyer contacts you unsolicited"], ["Formular außerhalb .de-Behördenseiten", "Form outside official .de sites"], ["Druck, nicht zur Polizei zu gehen", "Pressure not to go to police"]],
    actions: [["Bank/Börse informiert", "Bank/exchange informed"], ["Online-Anzeige erstattet", "Online report filed"], ["Aktenzeichen notiert", "Case number noted"], ["BaFin/Verbraucherzentrale gemeldet", "BaFin/consumer centre notified"], ["Plattform gemeldet", "Platform reported"], ["Opferhilfe kontaktiert", "Victim support contacted"]],
    myths: [
      { m: ["„Kleine Beträge interessieren niemanden.“", "“Small amounts don't matter.”"], f: ["Viele kleine Anzeigen decken große Täterstrukturen auf.", "Many small reports uncover large criminal networks."] },
      { m: ["„Die Polizei ist für Krypto nicht zuständig.“", "“Police don't handle crypto.”"], f: ["Alle Länder haben spezialisierte Cybercrime-Dienststellen.", "All states have specialised cybercrime units."] },
      { m: ["„Behörden verlangen Bearbeitungsgebühren.“", "“Authorities charge processing fees.”"], f: ["Eine Anzeige ist kostenlos.", "Filing a report is free."] },
    ],
    faq: [
      { q: ["Täter im Ausland – lohnt sich das?", "Perpetrator abroad – is it worth it?"], a: ["Ja. Internationale Rechtshilfe und Börsenanfragen sind möglich.", "Yes. International legal assistance and exchange requests are possible."] },
      { q: ["Was ist die ZAC?", "What is the ZAC?"], a: ["Die Zentrale Ansprechstelle Cybercrime für Unternehmen und Behörden in jedem Land.", "The central cybercrime contact point for businesses and authorities in each state."] },
      { q: ["Brauche ich einen Anwalt?", "Do I need a lawyer?"], a: ["Für die Anzeige nicht. Bei zivilrechtlichen Ansprüchen kann er sinnvoll sein.", "Not for the report. For civil claims it can be useful."] },
    ],
  },
  {
    id: "checklisten",
    kicker: ["Zum Abhaken", "To tick off"],
    intro: ["Drei Checklisten für drei Phasen: die ersten 24 Stunden, die erste Woche und die Vorbereitung Ihrer Anzeige. Haken Sie Punkte direkt hier ab – der Fortschritt wird nur in Ihrem Browser gespeichert.", "Three checklists for three phases: the first 24 hours, the first week and preparing your report. Tick items right here – progress stays only in your browser."],
    facts: [
      { v: "24 h", l: ["Schaden begrenzen", "limit damage"] },
      { v: "7 T", l: ["Dokumentation abschließen", "complete documentation"] },
      { v: "1", l: ["vollständige Anzeige", "complete police report"] },
    ],
    flowTitle: ["Die drei Phasen", "The three phases"],
    flow: [
      { t: ["Erste 24 Stunden", "First 24 hours"], d: ["Zahlungen stoppen, sperren, Zugänge sichern.", "Stop payments, block, secure access."] },
      { t: ["Erste Woche", "First week"], d: ["Beweise ordnen, Stellen informieren, Umfeld einbeziehen.", "Organise evidence, inform bodies, involve your circle."] },
      { t: ["Anzeige vorbereiten", "Prepare report"], d: ["Zeitleiste, Beträge, Adressen, Kontaktdaten der Täter.", "Timeline, amounts, addresses, perpetrator contacts."] },
      { t: ["Nachsorge", "Aftercare"], d: ["Konten überwachen, Folgebetrug erkennen, Unterstützung annehmen.", "Monitor accounts, recognise follow-up fraud, accept support."] },
    ],
    flags: [["Neue „Hilfe“-Angebote nach der Anzeige", "New “help” offers after reporting"], ["Kontakt von angeblichen Behörden", "Contact from alleged authorities"], ["Erneute Login-Warnungen", "Repeated login alerts"], ["Forderungen zur Auszahlung", "Demands to release payouts"], ["Gefühl, „es selbst lösen“ zu müssen", "Feeling you must “solve it alone”"]],
    actions: [["Zahlungen gestoppt (24 h)", "Payments stopped (24 h)"], ["Konten gesperrt/gesichert (24 h)", "Accounts blocked/secured (24 h)"], ["Beweise exportiert (Woche)", "Evidence exported (week)"], ["Zeitleiste erstellt (Woche)", "Timeline created (week)"], ["Gesamtschaden berechnet (Anzeige)", "Total loss calculated (report)"], ["Anzeige eingereicht (Anzeige)", "Report submitted (report)"]],
    myths: [
      { m: ["„Checklisten sind nur für Firmen.“", "“Checklists are for companies.”"], f: ["Unter Stress vergisst jeder etwas – Listen entlasten.", "Under stress everyone forgets things – lists help."] },
      { m: ["„Ich muss alles sofort erledigen.“", "“I must do everything now.”"], f: ["Nur die 24-Stunden-Punkte sind dringend.", "Only the 24-hour items are urgent."] },
      { m: ["„Danach ist alles vorbei.“", "“Afterwards it's all over.”"], f: ["Achten Sie noch Monate auf Folgebetrug.", "Watch for follow-up fraud for months."] },
    ],
    faq: [
      { q: ["Werden meine Haken gespeichert?", "Are my ticks saved?"], a: ["Nur lokal in diesem Browser – nicht auf unseren Servern.", "Only locally in this browser – not on our servers."] },
      { q: ["Kann ich die Liste drucken?", "Can I print the list?"], a: ["Ja, nutzen Sie die Druckfunktion Ihres Browsers.", "Yes, use your browser's print function."] },
      { q: ["Was gehört in die Zeitleiste?", "What goes into the timeline?"], a: ["Datum, Uhrzeit, Ereignis, Betrag, Beleg – eine Zeile pro Ereignis.", "Date, time, event, amount, proof – one line per event."] },
    ],
  },
  {
    id: "faq",
    kicker: ["Ehrliche Antworten", "Honest answers"],
    intro: ["Die Fragen, die uns Betroffene am häufigsten stellen – mit ehrlichen Antworten, auch wenn sie unbequem sind. Wir versprechen nichts, was wir nicht belegen können.", "The questions victims ask us most often – with honest answers, even when uncomfortable. We promise nothing we cannot substantiate."],
    facts: [
      { v: "0", l: ["Garantien auf Rückholung", "recovery guarantees"] },
      { v: "100 %", l: ["vertrauliche Behandlung", "confidential handling"] },
      { v: "DE / EN", l: ["Beratung in zwei Sprachen", "support in two languages"] },
    ],
    flowTitle: ["Was nach Ihrer Anfrage passiert", "What happens after your request"],
    flow: [
      { t: ["Eingang", "Receipt"], d: ["Ihre Schilderung wird vertraulich erfasst.", "Your account is recorded confidentially."] },
      { t: ["Sichtung", "Review"], d: ["Wir prüfen, welche öffentlichen Daten vorliegen.", "We check which public data exists."] },
      { t: ["Einordnung", "Assessment"], d: ["Ehrliche Einschätzung, was möglich ist – und was nicht.", "Honest assessment of what is possible – and what isn't."] },
      { t: ["Dokumentation", "Documentation"], d: ["Strukturierte Unterlagen für Behörden und Banken.", "Structured documents for authorities and banks."] },
    ],
    flags: [["Jemand garantiert die Rückholung", "Someone guarantees recovery"], ["Vorkasse in Krypto", "Upfront payment in crypto"], ["Erfolgsquote „98 %“", "“98 %” success rate"], ["Kontakt kurz nach Ihrer Online-Suche", "Contact right after your online search"], ["Druck, schnell zu unterschreiben", "Pressure to sign quickly"]],
    actions: [["Fragen notiert", "Questions written down"], ["Unterlagen bereitgelegt", "Documents prepared"], ["Anbieter auf Seriosität geprüft", "Provider checked for legitimacy"], ["Formular ausgefüllt", "Form completed"], ["Assistent befragt", "Assistant consulted"], ["Rückmeldung abgewartet", "Awaited response"]],
    myths: [
      { m: ["„Krypto lässt sich immer zurückholen.“", "“Crypto can always be recovered.”"], f: ["Oft ist das nicht möglich. Frühe Meldungen verbessern nur die Chancen auf Einfrieren.", "Often it's not possible. Early reports only improve the chances of freezing."] },
      { m: ["„Wer viel zahlt, bekommt mehr Hilfe.“", "“Paying more gets better help.”"], f: ["Behördliche Hilfe ist kostenlos.", "Help from authorities is free."] },
      { m: ["„Ich bin selbst schuld.“", "“It's my own fault.”"], f: ["Verantwortlich sind allein die Täter.", "Only the perpetrators are responsible."] },
    ],
    faq: [
      { q: ["Kann mein Geld zurückgeholt werden?", "Can my money be recovered?"], a: ["Ehrlich: oft nicht. Eine frühe Meldung an Börsen und Behörden verbessert jedoch die Chancen, dass Mittel eingefroren werden.", "Honestly: often not. Early reporting to exchanges and authorities improves the chances that funds are frozen."] },
      { q: ["Was kostet Ihre Unterstützung?", "What does your support cost?"], a: ["Die Erstschilderung ist unverbindlich. Konditionen besprechen wir transparent vor jeder Leistung.", "The initial account is non-binding. Terms are discussed transparently before any service."] },
      { q: ["Wer sieht meine Daten?", "Who sees my data?"], a: ["Nur das zuständige Team, verschlüsselt übertragen und DSGVO-konform gespeichert.", "Only the responsible team, transmitted encrypted and stored GDPR-compliant."] },
      { q: ["Arbeiten Sie mit der Polizei?", "Do you work with police?"], a: ["Wir ersetzen keine Behörde. Unsere Dokumentation kann Ihre Anzeige unterstützen.", "We don't replace authorities. Our documentation can support your report."] },
    ],
  },
  {
    id: "unterstuetzung",
    kicker: ["Sie sind nicht allein", "You are not alone"],
    intro: ["Betrug trifft nicht nur das Konto, sondern auch das Vertrauen und den Schlaf. Neben Behörden gibt es Stellen, die Sie emotional, rechtlich und finanziell begleiten – vertraulich und meist kostenlos.", "Fraud hits not only your account but also your trust and sleep. Beyond authorities, there are organisations that support you emotionally, legally and financially – confidentially and mostly free."],
    facts: [
      { v: "116 006", l: ["Weisser Ring Opfer-Telefon", "Weisser Ring helpline"] },
      { v: "0800 111 0 111", l: ["Telefonseelsorge, rund um die Uhr", "Crisis line, 24/7"] },
      { v: "24/7", l: ["KI-Assistent auf dieser Website", "AI assistant on this website"] },
    ],
    flowTitle: ["Ihr Unterstützungsnetz", "Your support network"],
    flow: [
      { t: ["Emotional", "Emotional"], d: ["Telefonseelsorge, Weisser Ring, Vertrauenspersonen.", "Crisis lines, Weisser Ring, people you trust."] },
      { t: ["Rechtlich", "Legal"], d: ["Opferanwälte, Verbraucherzentralen, Beratungshilfeschein.", "Victim lawyers, consumer centres, legal aid certificate."] },
      { t: ["Finanziell", "Financial"], d: ["Schuldnerberatung, Gespräch mit der Hausbank.", "Debt counselling, talking to your bank."] },
      { t: ["Fachlich", "Technical"], d: ["Unser Team und Assistent für Analyse und Dokumentation.", "Our team and assistant for analysis and documentation."] },
    ],
    flags: [["Sie schlafen schlecht oder ziehen sich zurück", "You sleep badly or withdraw"], ["Gedanken an Selbstvorwürfe", "Thoughts of self-blame"], ["Neue Kredite, um Verluste auszugleichen", "New loans to offset losses"], ["Geheimhaltung vor der Familie", "Hiding it from family"], ["Angebote, die „alles lösen“", "Offers that “fix everything”"]],
    actions: [["Mit einer Vertrauensperson gesprochen", "Talked to someone you trust"], ["Opferhilfe angerufen", "Called victim support"], ["Finanzlage geordnet", "Finances reviewed"], ["Rechtliche Beratung eingeholt", "Legal advice obtained"], ["Fall bei uns geschildert", "Case described to us"], ["Pausen eingeplant", "Breaks planned"]],
    myths: [
      { m: ["„Hilfe zu suchen ist Schwäche.“", "“Seeking help is weakness.”"], f: ["Es ist der wirksamste nächste Schritt.", "It's the most effective next step."] },
      { m: ["„Beratung ist teuer.“", "“Counselling is expensive.”"], f: ["Viele Angebote sind kostenlos.", "Many services are free."] },
      { m: ["„Niemand versteht das.“", "“No one understands.”"], f: ["Tausende Betroffene erleben Ähnliches jedes Jahr.", "Thousands of victims experience similar things every year."] },
    ],
    faq: [
      { q: ["Ist die Beratung anonym?", "Is counselling anonymous?"], a: ["Weisser Ring und Telefonseelsorge können anonym genutzt werden.", "Weisser Ring and crisis lines can be used anonymously."] },
      { q: ["Wie erreiche ich Ihr Team?", "How do I reach your team?"], a: ["Über das Kontaktformular, den Rückruf-Service oder den KI-Assistenten.", "Via the contact form, callback service or AI assistant."] },
      { q: ["Was, wenn es mir sehr schlecht geht?", "What if I feel very bad?"], a: ["Rufen Sie die Telefonseelsorge (0800 111 0 111) oder in Notfällen 112 an.", "Call the crisis line (0800 111 0 111) or 112 in emergencies."] },
    ],
  },
];
