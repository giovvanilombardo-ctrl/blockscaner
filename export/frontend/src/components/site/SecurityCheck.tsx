import { t as _t } from "@/i18n";
import { useState } from "react";

const items = [
  _t("Meine Seed-Phrase ist ausschließlich offline gespeichert (nicht als Foto, nicht in der Cloud)."),
  _t("Ich nutze für größere Beträge eine Hardware-Wallet."),
  _t("Ich prüfe und widerrufe Token-Freigaben (Approvals) regelmäßig."),
  _t("Wichtige Konten sind mit Authenticator-App oder Sicherheitsschlüssel geschützt."),
  _t("Ich nutze einen Passwortmanager mit einzigartigen Passwörtern."),
  _t("Ich öffne Börsen und Wallets nur über gespeicherte Lesezeichen."),
  _t("Betriebssystem und Wallet-Software sind aktuell."),
  _t("Ich habe noch nie eine Seed-Phrase in eine Webseite eingegeben."),
];

/** Privacy-conscious self-assessment: runs entirely in the browser, nothing is stored or sent. */
const SecurityCheck = () => {
  const [done, setDone] = useState<boolean[]>(items.map(() => false));
  const score = done.filter(Boolean).length;
  const pct = Math.round((score / items.length) * 100);
  return (
    <div className="border border-border bg-card grid lg:grid-cols-3">
      <fieldset className="lg:col-span-2 p-6 md:p-8 space-y-3">
        <legend className="sr-only">{_t("Wallet-Sicherheitscheck")}</legend>
        {items.map((it, i) => (
          <label key={it} className="flex gap-4 items-start cursor-pointer border-t border-border pt-3 first:border-0 first:pt-0">
            <input type="checkbox" checked={done[i]} onChange={() => setDone(done.map((d, j) => (j === i ? !d : d)))} className="mt-1 h-4 w-4 accent-[hsl(var(--primary))]" />
            <span className="text-[15px]">{it}</span>
          </label>
        ))}
      </fieldset>
      <div className="border-t lg:border-t-0 lg:border-l border-border p-6 md:p-8 flex flex-col justify-between">
        <div>
          <p className="eyebrow mb-3">{_t("Ergebnis")}</p>
          <p className="font-display text-6xl">{score}<span className="text-2xl text-muted-foreground">/{items.length}</span></p>
          <div className="mt-4 h-1 bg-secondary"><div className="h-1 bg-primary transition-all" style={{ width: `${pct}%` }} /></div>
          <p className="mt-4 text-sm text-muted-foreground" aria-live="polite">
            {pct === 100 ? _t("Sehr gut. Wiederholen Sie den Check alle paar Monate.") : pct >= 60 ? _t("Solide Basis. Schließen Sie die offenen Punkte.") : _t("Hier besteht Handlungsbedarf. Beginnen Sie mit Seed-Phrase und Mehr-Faktor-Authentifizierung.")}
          </p>
        </div>
        <p className="mt-6 text-xs text-muted-foreground">{_t("Dieser Check läuft vollständig in Ihrem Browser. Es werden keine Daten gespeichert oder übertragen.")}</p>
      </div>
    </div>
  );
};

export default SecurityCheck;
