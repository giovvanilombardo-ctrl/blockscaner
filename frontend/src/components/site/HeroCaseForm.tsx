import { useRef, useState } from "react";
import { z } from "zod";
import { CheckCircle, Loader2, Paperclip, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { t as _t } from "@/i18n";

const MAX_FILES = 10;
const MAX_SIZE = 10 * 1024 * 1024;
const ACCEPT = ".pdf,.jpg,.jpeg,.png,.webp,.heic,.doc,.docx,.txt,.eml,.msg,.csv,.xlsx,.zip";

const schema = z.object({
  vorname: z.string().trim().min(2, _t("Mindestens 2 Zeichen")).max(100),
  nachname: z.string().trim().min(2, _t("Mindestens 2 Zeichen")).max(100),
  email: z.string().trim().email(_t("Ungültige E-Mail-Adresse")).max(255),
  telefon: z.string().trim().regex(/^[+0-9()\s/-]{6,25}$/, _t("Ungültige Telefonnummer")),
  betrugsart: z.string().min(1, _t("Bitte wählen Sie eine Option")),
  verlorener_betrag: z.string().min(1, _t("Bitte wählen Sie eine Option")),
  wann: z.string().min(1, _t("Bitte wählen Sie eine Option")),
  kryptowaehrung: z.string().min(1, _t("Bitte wählen Sie eine Option")),
  plattform: z.string().trim().max(200),
  wallet_adresse: z.string().trim().max(120),
  polizeibericht: z.string().min(1, _t("Bitte wählen Sie eine Option")),
  kontaktweg: z.string().min(1, _t("Bitte wählen Sie eine Option")),
  beschreibung: z.string().trim().min(20, _t("Bitte beschreiben Sie Ihren Fall ausführlicher (min. 20 Zeichen)")).max(5000),
  consent: z.literal(true, { errorMap: () => ({ message: _t("Bitte stimmen Sie der Verarbeitung zu.") }) }),
});

type Form = Record<keyof z.infer<typeof schema>, any>;

const opts = {
  betrugsart: [_t("Fake-Börse / Handelsplattform"), _t("Investitionsbetrug"), _t("Romance Scam (Liebesbetrug)"), _t("Phishing-Angriff"), _t("Gehacktes Wallet"), _t("Identitätsdiebstahl"), _t("Ransomware-Angriff"), _t("Sonstiges")],
  verlorener_betrag: [_t("Unter 5.000 €"), "5.000 – 25.000 €", "25.000 – 100.000 €", "100.000 – 500.000 €", _t("Über 500.000 €")],
  wann: [_t("In den letzten 7 Tagen"), _t("Vor 1 – 4 Wochen"), _t("Vor 1 – 3 Monaten"), _t("Vor 3 – 12 Monaten"), _t("Vor über einem Jahr")],
  kryptowaehrung: ["Bitcoin (BTC)", "Ethereum (ETH)", "USDT (Tether)", "USDC", _t("Mehrere Kryptowährungen"), _t("Keine – Banküberweisung / Karte"), _t("Sonstiges")],
  polizeibericht: [_t("Ja"), _t("Nein"), _t("Geplant")],
  kontaktweg: [_t("E-Mail"), _t("Telefon"), "WhatsApp"],
};

const empty: Form = { vorname: "", nachname: "", email: "", telefon: "", betrugsart: "", verlorener_betrag: "", wann: "", kryptowaehrung: "", plattform: "", wallet_adresse: "", polizeibericht: "", kontaktweg: "", beschreibung: "", consent: false };

const field = "w-full h-11 bg-background border border-input px-3 text-sm outline-none focus:border-primary";

const HeroCaseForm = () => {
  const [v, setV] = useState<Form>(empty);
  const [files, setFiles] = useState<File[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [fail, setFail] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const set = (k: keyof Form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setV({ ...v, [k]: e.target.type === "checkbox" ? (e.target as HTMLInputElement).checked : e.target.value });

  const addFiles = (list: FileList | null) => {
    if (!list) return;
    const next = [...files];
    let msg = "";
    for (const f of Array.from(list)) {
      if (f.size > MAX_SIZE) { msg = `${f.name}: ${_t("Datei größer als 10 MB")}`; continue; }
      if (next.length >= MAX_FILES) { msg = _t("Maximal 10 Dateien"); break; }
      next.push(f);
    }
    setFiles(next);
    setErrors((e) => ({ ...e, files: msg }));
    if (fileRef.current) fileRef.current.value = "";
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFail(null);
    const r = schema.safeParse(v);
    if (!r.success) {
      const errs: Record<string, string> = {};
      r.error.issues.forEach((i) => (errs[i.path[0] as string] ??= i.message));
      setErrors(errs);
      return;
    }
    setErrors({});
    setBusy(true);
    try {
      const folder = `uploads/${crypto.randomUUID()}`;
      const paths: string[] = [];
      for (const f of files) {
        const safe = f.name.replace(/[^a-zA-Z0-9._-]/g, "_").slice(-80);
        const path = `${folder}/${Date.now()}_${safe}`;
        const { error } = await supabase.storage.from("case-documents").upload(path, f, { contentType: f.type || undefined });
        if (error) throw error;
        paths.push(path);
      }
      const { consent, ...d } = r.data;
      const row = { ...d, plattform: d.plattform || "—", wallet_adresse: d.wallet_adresse || null, dokumente: paths.length ? paths : null };
      const { error } = await supabase.from("leads").insert(row as any);
      if (error) throw error;
      await supabase.functions.invoke("notify-lead", { body: row });
      setDone(true);
    } catch (err) {
      console.error("Case form submit failed");
      setFail(_t("Fehler beim Senden. Bitte versuchen Sie es erneut."));
    } finally {
      setBusy(false);
    }
  };

  if (done) {
    return (
      <div className="bg-card border border-border p-8 text-center shadow-xl">
        <CheckCircle className="h-12 w-12 text-success mx-auto mb-4" />
        <h2 className="font-display text-2xl mb-2">{_t("Vielen Dank für Ihre Anfrage")}</h2>
        <p className="text-muted-foreground">{_t("Unser Team wird sich innerhalb von 24 Stunden bei Ihnen melden.")}</p>
      </div>
    );
  }

  const Err = ({ k }: { k: string }) => (errors[k] ? <p className="mt-1 text-xs text-destructive">{errors[k]}</p> : null);
  const Sel = ({ k, label }: { k: keyof typeof opts; label: string }) => (
    <div>
      <label htmlFor={`hf-${k}`} className="block text-xs mb-1">{label}</label>
      <select id={`hf-${k}`} value={v[k]} onChange={set(k)} className={field} aria-invalid={!!errors[k]}>
        <option value="">{_t("Bitte auswählen")}</option>
        {opts[k].map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
      <Err k={k} />
    </div>
  );
  const Inp = ({ k, label, type = "text", ph }: { k: keyof Form; label: string; type?: string; ph?: string }) => (
    <div>
      <label htmlFor={`hf-${k}`} className="block text-xs mb-1">{label}</label>
      <input id={`hf-${k}`} type={type} value={v[k]} onChange={set(k)} placeholder={ph} className={field} aria-invalid={!!errors[k]} />
      <Err k={k as string} />
    </div>
  );

  return (
    <form onSubmit={submit} noValidate className="bg-card border border-border p-6 md:p-7 shadow-xl max-h-none" aria-labelledby="hf-title">
      <p className="eyebrow mb-2">{_t("Vertraulich · Kostenlos für die Ersteinschätzung")}</p>
      <h2 id="hf-title" className="font-display text-2xl mb-5">{_t("Unterstützung durch unser Team anfordern")}</h2>

      <div className="grid sm:grid-cols-2 gap-3">
        {Inp({ k: "vorname", label: _t("Vorname *") })}
        {Inp({ k: "nachname", label: _t("Nachname *") })}
        {Inp({ k: "email", label: _t("E-Mail-Adresse *"), type: "email" })}
        {Inp({ k: "telefon", label: _t("Telefonnummer *"), type: "tel", ph: "+49 …" })}
        {Sel({ k: "betrugsart", label: _t("Art des Betrugs *") })}
        {Sel({ k: "verlorener_betrag", label: _t("Geschätzter Verlust *") })}
        {Sel({ k: "wann", label: _t("Wann ist der Betrug passiert? *") })}
        {Sel({ k: "kryptowaehrung", label: _t("Betroffene Kryptowährung *") })}
        {Inp({ k: "plattform", label: _t("Plattform / Website (falls bekannt)"), ph: _t("z.B. fake-exchange.com") })}
        {Inp({ k: "wallet_adresse", label: _t("Wallet-Adresse des Betrügers (falls bekannt)"), ph: "0x… / bc1…" })}
        {Sel({ k: "polizeibericht", label: _t("Wurde bereits ein Polizeibericht erstattet? *") })}
        {Sel({ k: "kontaktweg", label: _t("Bevorzugter Kontaktweg *") })}
      </div>

      <div className="mt-3">
        <label htmlFor="hf-beschreibung" className="block text-xs mb-1">{_t("Was ist passiert? *")}</label>
        <textarea id="hf-beschreibung" rows={4} value={v.beschreibung} onChange={set("beschreibung")} maxLength={5000}
          placeholder={_t("Bitte schildern Sie den Vorfall so detailliert wie möglich: Wie sind Sie mit dem Betrüger in Kontakt gekommen? Welche Schritte wurden unternommen? Haben Sie Beweise (Screenshots, E-Mails, Transaktions-IDs)?")}
          className="w-full bg-background border border-input px-3 py-2 text-sm outline-none focus:border-primary resize-y" aria-invalid={!!errors.beschreibung} />
        <Err k="beschreibung" />
      </div>

      <div className="mt-3">
        <p className="text-xs mb-1">{_t("Dokumente & Beweise (Screenshots, Kontoauszüge, E-Mails, Verträge …)")}</p>
        <button type="button" onClick={() => fileRef.current?.click()} className="w-full border border-dashed border-primary/60 px-4 py-4 text-sm text-primary flex items-center justify-center gap-2 hover:bg-primary/5">
          <Paperclip className="h-4 w-4" /> {_t("Dateien hinzufügen")}
        </button>
        <input ref={fileRef} type="file" multiple accept={ACCEPT} className="sr-only" onChange={(e) => addFiles(e.target.files)} aria-label={_t("Dateien hinzufügen")} />
        <p className="mt-1 text-[11px] text-muted-foreground">{_t("Bis zu 10 Dateien, je max. 10 MB. PDF, Bilder, Word, E-Mail, ZIP.")}</p>
        <Err k="files" />
        {files.length > 0 && (
          <ul className="mt-2 space-y-1">
            {files.map((f, i) => (
              <li key={i} className="flex items-center justify-between text-xs bg-secondary px-3 py-1.5">
                <span className="truncate">{f.name} · {(f.size / 1024 / 1024).toFixed(1)} MB</span>
                <button type="button" onClick={() => setFiles(files.filter((_, j) => j !== i))} aria-label={_t("Entfernen")}><X className="h-3.5 w-3.5" /></button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <label className="mt-4 flex gap-2 items-start text-xs text-muted-foreground">
        <input type="checkbox" checked={v.consent} onChange={set("consent")} className="mt-0.5 accent-[hsl(var(--primary))]" />
        <span>{_t("Ich stimme zu, dass meine Angaben und Dokumente zur Bearbeitung meines Falls verarbeitet werden. *")}</span>
      </label>
      <Err k="consent" />

      {fail && <p role="alert" className="mt-3 text-sm text-destructive">{fail}</p>}

      <button disabled={busy} className="mt-5 w-full h-12 bg-primary text-primary-foreground text-sm font-medium flex items-center justify-center gap-2 hover:bg-primary/90 disabled:opacity-60">
        {busy && <Loader2 className="h-4 w-4 animate-spin" />}
        {busy ? _t("Wird gesendet...") : _t("Anfrage absenden")}
      </button>
      <p className="mt-2 text-[11px] text-muted-foreground">{_t("🔒 Alle Daten werden verschlüsselt und vertraulich behandelt.")}</p>
    </form>
  );
};

export default HeroCaseForm;
