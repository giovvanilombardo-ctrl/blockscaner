import { useState } from "react";
import { z } from "zod";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { CheckCircle, Loader2, Phone, ShieldCheck, Clock, FileText, MessageSquare } from "lucide-react";
import { t as _t } from "@/i18n";
import SiteLayout from "@/components/site/SiteLayout";
import { supabase } from "@/integrations/supabase/client";
import heroImg from "@/assets/customer-service.jpg";

const schema = z.object({
  vorname: z.string().trim().min(2, _t("Mindestens 2 Zeichen")).max(100),
  nachname: z.string().trim().min(2, _t("Mindestens 2 Zeichen")).max(100),
  telefon: z.string().trim().regex(/^[+0-9()\s/-]{6,25}$/, _t("Ungültige Telefonnummer")),
  email: z.string().trim().email(_t("Ungültige E-Mail-Adresse")).max(255),
  zeit: z.string().min(1, _t("Bitte wählen Sie eine Option")),
  anliegen: z.string().trim().max(1000),
  consent: z.literal(true, { errorMap: () => ({ message: _t("Bitte stimmen Sie der Verarbeitung zu.") }) }),
});

const zeiten = [_t("So schnell wie möglich"), _t("Vormittags (9–12 Uhr)"), _t("Mittags (12–15 Uhr)"), _t("Nachmittags (15–18 Uhr)")];

const infos = [
  { icon: Clock, title: _t("Erreichbarkeit"), text: _t("Unser Kundenservice ruft Sie in der Regel innerhalb von 24 Stunden zurück – werktags von 9 bis 18 Uhr.") },
  { icon: FileText, title: _t("Was Sie bereithalten sollten"), text: _t("Transaktions-IDs, Wallet-Adressen, Kontoauszüge, Screenshots der Kommunikation und – falls vorhanden – Ihre Anzeigennummer.") },
  { icon: ShieldCheck, title: _t("Ihre Sicherheit"), text: _t("Wir fragen niemals nach Passwörtern, PINs, TANs oder Ihrer Seed-Phrase. Geben Sie diese niemals weiter – auch nicht an uns.") },
  { icon: MessageSquare, title: _t("Weitere Wege"), text: _t("Sie können uns auch schriftlich über das Kontaktformular erreichen oder sofort mit unserem KI-Assistenten sprechen.") },
];

const faqs = [
  { q: _t("Ist der Rückruf kostenlos?"), a: _t("Ja. Das Erstgespräch mit unserem Kundenservice ist für Sie kostenlos und unverbindlich.") },
  { q: _t("Was passiert im Gespräch?"), a: _t("Wir hören zu, ordnen Ihren Fall ein und erklären Ihnen die nächsten sinnvollen Schritte, z. B. Beweissicherung und Meldewege.") },
  { q: _t("Können Sie mein Geld garantiert zurückholen?"), a: _t("Nein. Seriöse Anbieter geben keine Garantie. Wir analysieren öffentliche Daten und dokumentieren Ihren Fall für Behörden und Anwälte.") },
];

const Kundenservice = () => {
  const [v, setV] = useState<Record<string, any>>({ vorname: "", nachname: "", telefon: "", email: "", zeit: "", anliegen: "", consent: false });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [fail, setFail] = useState<string | null>(null);
  const set = (k: string, val: any) => setV((s) => ({ ...s, [k]: val }));

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
      const d = r.data;
      const row = {
        vorname: d.vorname, nachname: d.nachname, email: d.email, telefon: d.telefon,
        betrugsart: "Telefonischer Rückruf", kryptowaehrung: "—", verlorener_betrag: "—", wann: d.zeit,
        plattform: "—", polizeibericht: "—", kontaktweg: "Telefon",
        beschreibung: `Rückrufwunsch (${d.zeit}). ${d.anliegen || "Kein Anliegen angegeben."}`,
      };
      const { error } = await supabase.from("leads").insert(row as any);
      if (error) throw error;
      await supabase.functions.invoke("notify-lead", { body: row });
      setDone(true);
    } catch {
      setFail(_t("Fehler beim Senden. Bitte versuchen Sie es erneut."));
    } finally {
      setBusy(false);
    }
  };

  const field = "w-full bg-background border border-border px-4 h-12 text-sm outline-none focus:border-primary";
  const err = (k: string) => errors[k] && <p className="text-xs text-destructive mt-1">{errors[k]}</p>;

  return (
    <SiteLayout>
      <Helmet>
        <title>{_t("Kundenservice – Telefonische Unterstützung | Blockscaner")}</title>
        <meta name="description" content={_t("Fordern Sie einen kostenlosen Rückruf unseres Kundenservice an. Hilfreiche Informationen für Betroffene von Cybercrime und Kryptobetrug.")} />
        <link rel="canonical" href="https://blockchain-24.com/kundenservice" />
      </Helmet>

      <section className="px-6 lg:px-10 py-12 border-b border-border grid lg:grid-cols-2 gap-10 items-start">
        <img src={heroImg} alt={_t("Mitarbeiterin unseres Kundenservice mit Headset")} className="block w-full h-auto" />
        <div className="max-w-xl">
          <p className="eyebrow mb-3 !text-primary">{_t("Über uns · Kundenservice")}</p>
          <h1 className="font-display text-4xl md:text-6xl leading-tight mb-5">{_t("Wir sind für Sie da – persönlich am Telefon.")}</h1>
          <p className="text-base md:text-lg text-muted-foreground mb-8">{_t("Unser Kundenservice hört zu, ordnet Ihren Fall ein und erklärt Ihnen ruhig die nächsten Schritte.")}</p>
        <div id="rueckruf" className="mt-8 scroll-mt-28 border-2 border-primary/30 bg-card p-6 md:p-8 shadow-xl shadow-primary/10">
          {done ? (
            <div className="text-center py-10">
              <CheckCircle className="h-12 w-12 text-success mx-auto mb-4" />
              <h2 className="font-display text-2xl mb-2">{_t("Vielen Dank!")}</h2>
              <p className="text-muted-foreground">{_t("Unser Kundenservice ruft Sie in Kürze zurück.")}</p>
            </div>
          ) : (
            <form onSubmit={submit} noValidate className="space-y-4">
              <h2 className="font-display text-2xl">{_t("Telefonischen Rückruf anfordern")}</h2>
              <p className="text-sm text-muted-foreground">{_t("Kostenlos und unverbindlich.")}</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div><label className="text-xs mb-1 block">{_t("Vorname")} *</label><input className={field} value={v.vorname} onChange={(e) => set("vorname", e.target.value)} />{err("vorname")}</div>
                <div><label className="text-xs mb-1 block">{_t("Nachname")} *</label><input className={field} value={v.nachname} onChange={(e) => set("nachname", e.target.value)} />{err("nachname")}</div>
                <div><label className="text-xs mb-1 block">{_t("Telefonnummer")} *</label><input type="tel" className={field} value={v.telefon} onChange={(e) => set("telefon", e.target.value)} />{err("telefon")}</div>
                <div><label className="text-xs mb-1 block">{_t("E-Mail")} *</label><input type="email" className={field} value={v.email} onChange={(e) => set("email", e.target.value)} />{err("email")}</div>
              </div>
              <div>
                <label className="text-xs mb-1 block">{_t("Bevorzugte Rückrufzeit")} *</label>
                <select className={field} value={v.zeit} onChange={(e) => set("zeit", e.target.value)}>
                  <option value="">{_t("Bitte wählen")}</option>
                  {zeiten.map((z) => <option key={z} value={z}>{z}</option>)}
                </select>
                {err("zeit")}
              </div>
              <div>
                <label className="text-xs mb-1 block">{_t("Worum geht es? (optional)")}</label>
                <textarea rows={4} className={`${field} h-auto py-3`} value={v.anliegen} onChange={(e) => set("anliegen", e.target.value)} />
              </div>
              <label className="flex gap-2 text-xs text-muted-foreground">
                <input type="checkbox" checked={v.consent} onChange={(e) => set("consent", e.target.checked)} className="mt-0.5" />
                {_t("Ich bin einverstanden, dass meine Angaben zur Bearbeitung meiner Rückrufanfrage verarbeitet werden.")}
              </label>
              {err("consent")}
              {fail && <p role="alert" className="text-sm text-destructive">{fail}</p>}
              <button disabled={busy} className="w-full h-12 bg-primary text-primary-foreground font-medium flex items-center justify-center gap-2 disabled:opacity-60">
                {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Phone className="h-4 w-4" />} {_t("Rückruf anfordern")}
              </button>
            </form>
          )}
        </div>
        </div>
      </section>

      <section className="px-6 lg:px-10 py-16 border-b border-border grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {infos.map(({ icon: Icon, title, text }) => (
          <div key={title} className="border border-border bg-card p-6">
            <Icon className="h-6 w-6 text-primary mb-4" />
            <h2 className="font-display text-lg mb-2">{title}</h2>
            <p className="text-sm text-muted-foreground">{text}</p>
          </div>
        ))}
      </section>

      <section className="px-6 lg:px-10 py-16 border-b border-border grid lg:grid-cols-12 gap-10">
        <div className="lg:col-span-5">
          <p className="eyebrow mb-3">{_t("Häufige Fragen")}</p>
          <h2 className="font-display text-3xl mb-6">{_t("Gut zu wissen vor dem Gespräch")}</h2>
          <dl className="space-y-6">
            {faqs.map((f) => (
              <div key={f.q} className="border-t border-border pt-4">
                <dt className="font-medium mb-1">{f.q}</dt>
                <dd className="text-sm text-muted-foreground">{f.a}</dd>
              </div>
            ))}
          </dl>
          <p className="text-sm mt-8">{_t("Lieber schriftlich?")} <Link to="/contact" className="text-primary">{_t("Zum Kontaktformular")}</Link> · <Link to="/chat" className="text-primary">{_t("KI-Assistent")}</Link></p>
        </div>
      </section>
    </SiteLayout>
  );
};

export default Kundenservice;
