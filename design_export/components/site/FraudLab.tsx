import { t as _t } from "@/i18n";
import { useState } from "react";

const patterns = [
  {
    name: _t("Pig Butchering"),
    steps: [_t("Kontakt über Messenger oder Dating-App"), _t("Vertrauensaufbau über Wochen"), _t("Einladung auf „exklusive“ Handelsplattform"), _t("Kleine Gewinne werden ausgezahlt"), _t("Große Einzahlung, dann Auszahlungssperre")],
    signal: _t("Unbekannter Kontakt bringt das Gespräch auf Investitionen."),
  },
  {
    name: _t("Approval Phishing"),
    steps: [_t("Gefälschte Airdrop- oder Mint-Seite"), _t("Wallet wird verbunden"), _t("Unbegrenzte Token-Freigabe wird signiert"), _t("Drainer-Contract zieht Token ab")],
    signal: _t("Eine Seite verlangt eine Signatur für „setApprovalForAll“ oder „increaseAllowance“."),
  },
  {
    name: _t("Recovery Scam"),
    steps: [_t("Opfer sucht online Hilfe"), _t("„Rückholdienst“ meldet sich proaktiv"), _t("Garantierte Rückholung wird versprochen"), _t("Vorabgebühren werden verlangt")],
    signal: _t("Jemand garantiert die Rückholung gegen Vorauszahlung."),
  },
  {
    name: _t("Fake-Support"),
    steps: [_t("Öffentliche Frage in Forum/Social Media"), _t("Angeblicher Support schreibt privat"), _t("Link zu „Validierungs“-Seite"), _t("Eingabe der Seed-Phrase")],
    signal: _t("Support meldet sich ungefragt per Direktnachricht."),
  },
];

/** Synthetic, clearly labelled educational examples — not investigative findings. */
const FraudLab = () => {
  const [i, setI] = useState(0);
  const p = patterns[i];
  return (
    <div className="border border-border">
      <div className="flex items-center justify-between border-b border-border px-5 py-3">
        <div role="tablist" className="flex flex-wrap gap-1">
          {patterns.map((x, j) => (
            <button key={x.name} role="tab" aria-selected={i === j} onClick={() => setI(j)} className={`px-3 py-1.5 text-xs ${i === j ? "bg-primary text-primary-foreground" : "text-primary"}`}>{x.name}</button>
          ))}
        </div>
        <span className="hidden sm:inline font-mono text-[10px] uppercase tracking-widest px-2 py-1 bg-warning/15 text-warning">{_t("Synthetisches Lehrbeispiel")}</span>
      </div>
      <ol className="grid md:grid-cols-5" key={p.name}>
        {p.steps.map((s, k) => (
          <li key={s} className="reveal border-b md:border-b-0 md:border-r border-border last:border-0 p-5" style={{ animationDelay: `${k * 90}ms` }}>
            <span className="font-mono text-xs text-muted-foreground">{_t("Phase")} {k + 1}</span>
            <p className="mt-2 text-sm">{s}</p>
          </li>
        ))}
      </ol>
      <p className="border-t border-border px-5 py-4 text-sm"><span className="text-signal font-medium">{_t("Warnsignal:")} </span>{p.signal}</p>
    </div>
  );
};

export default FraudLab;
