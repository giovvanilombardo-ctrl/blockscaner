import { t as _t } from "@/i18n";
import { useState } from "react";
import { Link } from "react-router-dom";

type Kind = "krypto" | "phishing" | "konto" | "identitaet" | "ransomware" | "romance";

const kinds: { k: Kind; label: string }[] = [
  { k: "krypto", label: _t("Geld an eine Krypto- oder Investmentplattform überwiesen") },
  { k: "phishing", label: _t("Zugangsdaten auf einer gefälschten Seite eingegeben") },
  { k: "konto", label: _t("Ein Konto wurde übernommen") },
  { k: "identitaet", label: _t("Meine Identität wird missbraucht") },
  { k: "ransomware", label: _t("Daten verschlüsselt oder Erpressung") },
  { k: "romance", label: _t("Online-Bekanntschaft hat um Geld gebeten") },
];

const plans: Record<Kind, { schutz: string[]; beweise: string[]; melden: string[] }> = {
  krypto: {
    schutz: [_t("Keine weiteren Zahlungen, auch keine „Gebühren“ oder „Steuern“ für Auszahlungen."), _t("Börse, von der Sie überwiesen haben, sofort informieren."), _t("Vorsicht vor Kontaktaufnahmen angeblicher Rückholdienste.")],
    beweise: [_t("Transaktions-Hashes und Empfängeradressen"), _t("URL und Screenshots der Plattform"), _t("Chatverläufe mit Datum")],
    melden: [_t("Online-Anzeige bei der Polizei Ihres Bundeslandes"), _t("Meldung an die BaFin (unerlaubte Finanzgeschäfte)"), _t("Ihre Kryptobörse / Bank")],
  },
  phishing: {
    schutz: [_t("Passwort sofort von einem sauberen Gerät ändern."), _t("Mehr-Faktor-Authentifizierung aktivieren."), _t("Bei Bankdaten: Bank anrufen und Karte/Onlinebanking sperren (Sperr-Notruf 116 116).")],
    beweise: [_t("Phishing-Mail als .eml-Datei"), _t("URL der gefälschten Seite"), _t("Zeitpunkt der Eingabe")],
    melden: [_t("Bank bzw. betroffener Dienst"), _t("Verbraucherzentrale Phishing-Radar"), _t("Polizei bei finanziellem Schaden")],
  },
  konto: {
    schutz: [_t("Passwort zurücksetzen und alle Sitzungen beenden."), _t("Wiederherstellungs-E-Mail und Telefonnummer prüfen."), _t("Kontakte warnen, falls Nachrichten in Ihrem Namen versendet wurden.")],
    beweise: [_t("Benachrichtigungen über Anmeldungen"), _t("Screenshots geänderter Einstellungen")],
    melden: [_t("Support des Anbieters"), _t("Polizei bei Missbrauch oder Schaden")],
  },
  identitaet: {
    schutz: [_t("Ausweisverlust ggf. beim Bürgeramt melden."), _t("Bei SCHUFA eine Selbstauskunft anfordern."), _t("Kontoauszüge auf unbekannte Buchungen prüfen.")],
    beweise: [_t("Rechnungen/Mahnungen unbekannter Verträge"), _t("Schriftverkehr mit Händlern")],
    melden: [_t("Polizei (Anzeige)"), _t("Betroffene Händler und Auskunfteien")],
  },
  ransomware: {
    schutz: [_t("Gerät vom Netzwerk trennen, aber nicht ausschalten."), _t("Kein Lösegeld zahlen."), _t("Backups nicht mit dem infizierten System verbinden.")],
    beweise: [_t("Foto der Erpressernachricht"), _t("Dateiendungen verschlüsselter Dateien")],
    melden: [_t("Zentrale Ansprechstelle Cybercrime (ZAC) Ihres Landes"), _t("BSI (für Unternehmen)")],
  },
  romance: {
    schutz: [_t("Kein weiteres Geld senden."), _t("Kontakt nicht konfrontieren, sondern Beweise sichern und abbrechen."), _t("Mit einer Vertrauensperson sprechen – das ist kein persönliches Versagen.")],
    beweise: [_t("Profilbilder und Profil-URLs"), _t("Gesamter Chatverlauf"), _t("Zahlungsbelege")],
    melden: [_t("Polizei (Anzeige)"), _t("Plattform, auf der der Kontakt stattfand"), _t("Weisser Ring (Opferhilfe, 116 006)")],
  },
};

const VictimFlow = () => {
  const [kind, setKind] = useState<Kind | null>(null);
  const [step, setStep] = useState(0);
  const p = kind ? plans[kind] : null;
  const steps = [_t("Situation"), _t("Schützen"), _t("Beweise"), _t("Melden"), _t("Grenzen")];

  return (
    <div className="paper border border-paper-foreground/10">
      <div className="flex border-b border-paper-foreground/10 overflow-x-auto" role="tablist" aria-label={_t("Fortschritt")}>
        {steps.map((s, i) => (
          <button key={s} role="tab" aria-selected={step === i} disabled={!kind && i > 0} onClick={() => setStep(i)}
            className={`flex-1 min-w-[110px] px-4 py-4 text-left text-xs border-r border-paper-foreground/10 disabled:opacity-40 ${step === i ? "bg-primary text-primary-foreground" : ""}`}>
            <span className="font-mono block opacity-60">0{i + 1}</span>{s}
          </button>
        ))}
      </div>
      <div className="p-6 md:p-10 min-h-[340px]" aria-live="polite">
        {step === 0 && (
          <>
            <h3 className="font-display text-2xl mb-2">{_t("Was ist passiert?")}</h3>
            <p className="text-sm opacity-70 mb-6">{_t("Wählen Sie die Beschreibung, die am ehesten zutrifft. Sie können später wechseln.")}</p>
            <div className="grid md:grid-cols-2 gap-3">
              {kinds.map((o) => (
                <button key={o.k} onClick={() => { setKind(o.k); setStep(1); }}
                  className={`text-left border px-5 py-4 text-[15px] transition ${kind === o.k ? "border-paper-foreground bg-paper-foreground/5" : "border-paper-foreground/15 hover:border-paper-foreground/50"}`}>
                  {o.label}
                </button>
              ))}
            </div>
          </>
        )}
        {p && step > 0 && step < 4 && (
          <>
            <h3 className="font-display text-2xl mb-6">{["", _t("Sofort schützen"), _t("Beweise sichern"), _t("Zuständige Stellen")][step]}</h3>
            <ol className="space-y-4 max-w-2xl">
              {(step === 1 ? p.schutz : step === 2 ? p.beweise : p.melden).map((x, i) => (
                <li key={x} className="flex gap-4"><span className="font-mono text-sm opacity-50">{i + 1}.</span><span>{x}</span></li>
              ))}
            </ol>
          </>
        )}
        {step === 4 && (
          <>
            <h3 className="font-display text-2xl mb-4">{_t("Was wir tun können – und was nicht")}</h3>
            <div className="grid md:grid-cols-2 gap-8 text-[15px]">
              <div><p className="eyebrow !text-paper-foreground/60 mb-2">{_t("Wir können")}</p><ul className="space-y-2"><li>{_t("Öffentliche Blockchain-Daten analysieren und dokumentieren")}</li><li>{_t("Sie bei der Strukturierung Ihrer Beweise unterstützen")}</li><li>{_t("Meldewege erläutern")}</li></ul></div>
              <div><p className="eyebrow !text-paper-foreground/60 mb-2">{_t("Wir können nicht")}</p><ul className="space-y-2"><li>{_t("Eine Rückzahlung garantieren")}</li><li>{_t("Konten sperren oder Ermittlungen führen – das ist Aufgabe der Behörden")}</li><li>{_t("Personen ohne belastbare Belege identifizieren")}</li></ul></div>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/contact" className="bg-primary text-primary-foreground px-5 py-3 text-sm">{_t("Fall vertraulich schildern")}</Link>
              <Link to="/chat" className="border border-paper-foreground/30 px-5 py-3 text-sm">{_t("Mit dem Assistenten sprechen")}</Link>
            </div>
          </>
        )}
        {kind && step < 4 && (
          <button onClick={() => setStep(step + 1)} className="mt-10 border-b border-paper-foreground pb-0.5 text-sm">{_t("Weiter:")} {steps[step + 1]} →</button>
        )}
      </div>
    </div>
  );
};

export default VictimFlow;
