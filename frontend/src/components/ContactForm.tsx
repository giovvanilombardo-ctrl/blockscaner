import { t as _t } from "@/i18n";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Shield, Send, CheckCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

const formSchema = z.object({
  vorname: z.string().trim().min(2, _t("Mindestens 2 Zeichen")).max(100),
  nachname: z.string().trim().min(2, _t("Mindestens 2 Zeichen")).max(100),
  email: z.string().trim().email(_t("Ungültige E-Mail-Adresse")).max(255),
  telefon: z.string().trim().min(5, _t("Ungültige Telefonnummer")).max(30),
  betrugsart: z.string().min(1, _t("Bitte wählen Sie eine Option")),
  kryptowaehrung: z.string().min(1, _t("Bitte wählen Sie eine Option")),
  verlorenerBetrag: z.string().min(1, _t("Bitte wählen Sie eine Option")),
  wann: z.string().min(1, _t("Bitte wählen Sie eine Option")),
  plattform: z.string().trim().min(2, _t("Bitte geben Sie die Plattform an")).max(200),
  walletAdresse: z.string().trim().max(500).optional(),
  polizeibericht: z.string().min(1, _t("Bitte wählen Sie eine Option")),
  beschreibung: z.string().trim().min(20, _t("Bitte beschreiben Sie Ihren Fall ausführlicher (min. 20 Zeichen)")).max(3000),
});

type FormData = z.infer<typeof formSchema>;

const betrugsarten = [
  _t("Investitionsbetrug"),
  _t("Phishing-Angriff"),
  _t("Fake-Börse / Handelsplattform"),
  _t("Romance Scam (Liebesbetrug)"),
  _t("Ponzi / Schneeballsystem"),
  _t("Ransomware-Angriff"),
  _t("SIM-Swapping"),
  _t("Rug Pull (DeFi/NFT)"),
  _t("Gehacktes Wallet"),
  _t("Sonstiges"),
];

const kryptowaehrungen = [
  _t("Bitcoin (BTC)"),
  _t("Ethereum (ETH)"),
  _t("USDT (Tether)"),
  "USDC",
  "BNB",
  _t("Solana (SOL)"),
  _t("XRP (Ripple)"),
  _t("Mehrere Kryptowährungen"),
  _t("Sonstiges"),
];

const betraege = [
  _t("Unter 5.000 €"),
  "5.000 € – 25.000 €",
  "25.000 € – 100.000 €",
  "100.000 € – 500.000 €",
  _t("Über 500.000 €"),
];

const zeitraeume = [
  _t("In den letzten 7 Tagen"),
  _t("Vor 1 – 4 Wochen"),
  _t("Vor 1 – 3 Monaten"),
  _t("Vor 3 – 12 Monaten"),
  _t("Vor über einem Jahr"),
];

const ContactForm = () => {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      // Save to database
      const { error: dbError } = await supabase.from("leads").insert({
        vorname: data.vorname,
        nachname: data.nachname,
        email: data.email,
        telefon: data.telefon,
        betrugsart: data.betrugsart,
        kryptowaehrung: data.kryptowaehrung,
        verlorener_betrag: data.verlorenerBetrag,
        wann: data.wann,
        plattform: data.plattform,
        wallet_adresse: data.walletAdresse || null,
        polizeibericht: data.polizeibericht,
        beschreibung: data.beschreibung,
      });

      if (dbError) throw dbError;

      // Trigger email notification
      await supabase.functions.invoke("notify-lead", {
        body: {
          vorname: data.vorname,
          nachname: data.nachname,
          email: data.email,
          telefon: data.telefon,
          betrugsart: data.betrugsart,
          kryptowaehrung: data.kryptowaehrung,
          verlorener_betrag: data.verlorenerBetrag,
          wann: data.wann,
          plattform: data.plattform,
          wallet_adresse: data.walletAdresse || null,
          polizeibericht: data.polizeibericht,
          beschreibung: data.beschreibung,
        },
      });

      setSubmitted(true);
      toast.success(_t("Ihre Anfrage wurde erfolgreich gesendet!"));
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Fehler beim Senden. Bitte versuchen Sie es erneut.");
    }
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center animate-fade-in-up">
        <div className="rounded-full bg-success/10 p-6 mb-6">
          <CheckCircle className="h-16 w-16 text-success" />
        </div>
        <h2 className="text-3xl font-display font-bold mb-4">
          {_t("Vielen Dank für Ihre Anfrage")}
        </h2>
        <p className="text-muted-foreground max-w-md text-lg">
          {_t("Unser Expertenteam wird Ihren Fall prüfen und sich innerhalb von 24 Stunden bei Ihnen melden.")}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {/* Personal info */}
      <div className="space-y-4">
        <h3 className="text-xl font-display font-semibold flex items-center gap-2 text-foreground">
          <Shield className="h-5 w-5 text-primary" />
          {_t("Persönliche Informationen")}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="vorname">{_t("Vorname *")}</Label>
            <Input id="vorname" placeholder={_t("Max")} {...register("vorname")} className="bg-secondary border-border focus:border-primary" />
            {errors.vorname && <p className="text-sm text-destructive">{errors.vorname.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="nachname">{_t("Nachname *")}</Label>
            <Input id="nachname" placeholder={_t("Mustermann")} {...register("nachname")} className="bg-secondary border-border focus:border-primary" />
            {errors.nachname && <p className="text-sm text-destructive">{errors.nachname.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">{_t("E-Mail-Adresse *")}</Label>
            <Input id="email" type="email" placeholder={_t("max@beispiel.de")} {...register("email")} className="bg-secondary border-border focus:border-primary" />
            {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="telefon">{_t("Telefonnummer *")}</Label>
            <Input id="telefon" placeholder="+49 123 456789" {...register("telefon")} className="bg-secondary border-border focus:border-primary" />
            {errors.telefon && <p className="text-sm text-destructive">{errors.telefon.message}</p>}
          </div>
        </div>
      </div>

      {/* Fraud details */}
      <div className="space-y-4">
        <h3 className="text-xl font-display font-semibold flex items-center gap-2 text-foreground">
          <Shield className="h-5 w-5 text-primary" />
          {_t("Angaben zum Betrug")}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>{_t("Art des Betrugs *")}</Label>
            <Select onValueChange={(v) => setValue("betrugsart", v)}>
              <SelectTrigger className="bg-secondary border-border">
                <SelectValue placeholder={_t("Bitte auswählen")} />
              </SelectTrigger>
              <SelectContent>
                {betrugsarten.map((b) => (
                  <SelectItem key={b} value={b}>{b}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.betrugsart && <p className="text-sm text-destructive">{errors.betrugsart.message}</p>}
          </div>
          <div className="space-y-2">
            <Label>{_t("Betroffene Kryptowährung *")}</Label>
            <Select onValueChange={(v) => setValue("kryptowaehrung", v)}>
              <SelectTrigger className="bg-secondary border-border">
                <SelectValue placeholder={_t("Bitte auswählen")} />
              </SelectTrigger>
              <SelectContent>
                {kryptowaehrungen.map((k) => (
                  <SelectItem key={k} value={k}>{k}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.kryptowaehrung && <p className="text-sm text-destructive">{errors.kryptowaehrung.message}</p>}
          </div>
          <div className="space-y-2">
            <Label>{_t("Geschätzter Verlust *")}</Label>
            <Select onValueChange={(v) => setValue("verlorenerBetrag", v)}>
              <SelectTrigger className="bg-secondary border-border">
                <SelectValue placeholder={_t("Bitte auswählen")} />
              </SelectTrigger>
              <SelectContent>
                {betraege.map((b) => (
                  <SelectItem key={b} value={b}>{b}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.verlorenerBetrag && <p className="text-sm text-destructive">{errors.verlorenerBetrag.message}</p>}
          </div>
          <div className="space-y-2">
            <Label>{_t("Wann ist der Betrug passiert? *")}</Label>
            <Select onValueChange={(v) => setValue("wann", v)}>
              <SelectTrigger className="bg-secondary border-border">
                <SelectValue placeholder={_t("Bitte auswählen")} />
              </SelectTrigger>
              <SelectContent>
                {zeitraeume.map((z) => (
                  <SelectItem key={z} value={z}>{z}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.wann && <p className="text-sm text-destructive">{errors.wann.message}</p>}
          </div>
        </div>
      </div>

      {/* Additional info */}
      <div className="space-y-4">
        <h3 className="text-xl font-display font-semibold flex items-center gap-2 text-foreground">
          <Shield className="h-5 w-5 text-primary" />
          {_t("Zusätzliche Informationen")}
        </h3>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="plattform">{_t("Name der betrügerischen Plattform / Website *")}</Label>
            <Input id="plattform" placeholder={_t("z.B. fake-exchange.com")} {...register("plattform")} className="bg-secondary border-border focus:border-primary" />
            {errors.plattform && <p className="text-sm text-destructive">{errors.plattform.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="walletAdresse">{_t("Wallet-Adresse des Betrügers (falls bekannt)")}</Label>
            <Input id="walletAdresse" placeholder={_t("0x... oder bc1...")} {...register("walletAdresse")} className="bg-secondary border-border focus:border-primary" />
          </div>
          <div className="space-y-2">
            <Label>{_t("Wurde bereits ein Polizeibericht erstattet? *")}</Label>
            <Select onValueChange={(v) => setValue("polizeibericht", v)}>
              <SelectTrigger className="bg-secondary border-border">
                <SelectValue placeholder={_t("Bitte auswählen")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ja">{_t("Ja")}</SelectItem>
                <SelectItem value="nein">{_t("Nein")}</SelectItem>
                <SelectItem value="in_bearbeitung">{_t("In Bearbeitung")}</SelectItem>
              </SelectContent>
            </Select>
            {errors.polizeibericht && <p className="text-sm text-destructive">{errors.polizeibericht.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="beschreibung">{_t("Beschreiben Sie Ihren Fall *")}</Label>
            <Textarea
              id="beschreibung"
              placeholder={_t("Bitte schildern Sie den Vorfall so detailliert wie möglich: Wie sind Sie mit dem Betrüger in Kontakt gekommen? Welche Schritte wurden unternommen? Haben Sie Beweise (Screenshots, E-Mails, Transaktions-IDs)?")}
              rows={6}
              {...register("beschreibung")}
              className="bg-secondary border-border focus:border-primary resize-none"
            />
            {errors.beschreibung && <p className="text-sm text-destructive">{errors.beschreibung.message}</p>}
          </div>
        </div>
      </div>

      <div className="pt-4">
        <Button type="submit" size="lg" disabled={isSubmitting} className="w-full md:w-auto text-lg px-10 py-6 glow-border">
          <Send className="mr-2 h-5 w-5" />
          {isSubmitting ? _t("Wird gesendet...") : _t("Anfrage absenden")}
        </Button>
        <p className="text-sm text-muted-foreground mt-3">
          {_t("Ihre Daten werden vertraulich behandelt und nur zur Fallbearbeitung verwendet.")}
        </p>
      </div>
    </form>
  );
};

export default ContactForm;
