import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Eye, EyeOff, Loader2, LogIn, Mail, ShieldCheck, UserPlus } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CdBack, CdButton, CdRoot, L } from "./AccountShell";

function ForgotPassword({ initial }: { initial: string }) {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState(initial);
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState(false);
  if (!open) return <button type="button" onClick={() => { setEmail(initial); setOpen(true); }} className="text-xs font-semibold text-primary underline-offset-4 hover:underline">{L("Passwort vergessen?", "Forgot your password?")}</button>;
  return (
    <div className="rounded-2xl border border-border bg-muted/30 p-4 text-left">
      {sent ? <p className="text-sm">{L("Falls ein Konto mit ", "If an account exists for ")}<strong>{email}</strong>{L(" existiert, erhalten Sie eine E-Mail mit einem Link zum Festlegen eines neuen Passworts.", ", you will receive an email with a link to set a new password.")}</p> : (
        <form className="space-y-3" onSubmit={async (e) => {
          e.preventDefault(); setBusy(true);
          await supabase.auth.resetPasswordForEmail(email.trim(), { redirectTo: `${window.location.origin}/reset-password` });
          setBusy(false); setSent(true);
        }}>
          <p className="text-sm font-semibold">{L("Passwort zurücksetzen", "Reset password")}</p>
          <Label htmlFor="reset-email">{L("E-Mail Ihres Kontos", "Your account email")}</Label>
          <Input id="reset-email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
          <CdButton type="submit" className="w-full" disabled={busy}>{busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Mail className="h-4 w-4" />}{L("Link senden", "Send link")}</CdButton>
        </form>
      )}
      <button type="button" onClick={() => { setOpen(false); setSent(false); }} className="mt-3 text-xs text-muted-foreground hover:underline">{L("Zurück zur Anmeldung", "Back to sign in")}</button>
    </div>
  );
}

export default function AuthPage() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const [modo, setModo] = useState<"entrar" | "registro">(params.get("modo") === "registro" ? "registro" : "entrar");
  const [busy, setBusy] = useState(false);
  const [aviso, setAviso] = useState<{ tipo: "error" | "ok"; texto: string } | null>(null);
  const [entering, setEntering] = useState(false);
  const [show, setShow] = useState(false);
  const going = useRef(false);
  const [f, setF] = useState({ nombre: "", apellidos: "", email: "", password: "", telefono: "" });
  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement>) => setF((v) => ({ ...v, [k]: e.target.value }));

  const enter = async () => {
    if (going.current) return; going.current = true;
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setEntering(true); await new Promise((r) => setTimeout(r, 2300)); }
    navigate("/account", { replace: true });
  };

  useEffect(() => {
    document.title = L("Kundenzugang – Blockscaner", "Customer access – Blockscaner");
    supabase.auth.getSession().then(({ data }) => { if (data.session) navigate("/account", { replace: true }); });
  }, [navigate]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault(); setBusy(true); setAviso(null);
    try {
      if (modo === "registro") {
        const { data, error } = await supabase.functions.invoke("account-register", { body: { ...f, email: f.email.trim() } });
        const code = (data as any)?.error ?? (error ? await (error as any).context?.json?.().then((j: any) => j?.error).catch(() => "x") : null);
        if (code === "exists") { setAviso({ tipo: "error", texto: L("Diese E-Mail hat bereits ein Konto. Bitte melden Sie sich mit Ihrem Passwort an.", "This email already has an account. Please sign in with your password.") }); return; }
        if (code === "exists_unverified") { setAviso({ tipo: "ok", texto: L("Sie haben die Registrierung mit dieser E-Mail begonnen. Melden Sie sich mit Ihrem gewählten Passwort an, um die Bestätigung abzuschließen.", "You started registering with this email. Sign in with the password you chose to finish verification.") }); setModo("entrar"); return; }
        if (code === "weak_password") throw new Error(L("Dieses Passwort ist zu schwach oder wurde bereits in Datenlecks gefunden. Bitte wählen Sie ein anderes.", "This password is too weak or has appeared in data breaches. Please choose another one."));
        if (code) throw new Error(L("Bitte prüfen Sie Ihre Angaben.", "Please check your details."));
      }
      const { error } = await supabase.auth.signInWithPassword({ email: f.email.trim(), password: f.password });
      if (error) throw new Error(L("E-Mail oder Passwort ist falsch.", "Incorrect email or password."));
      toast.success(modo === "entrar" ? L("Willkommen zurück", "Welcome back") : L("Konto erstellt", "Account created"));
      await enter();
    } catch (err) {
      const t = err instanceof Error ? err.message : L("Vorgang fehlgeschlagen", "Something went wrong");
      setAviso({ tipo: "error", texto: t }); toast.error(t);
    } finally { setBusy(false); }
  }

  const campo = "h-12 rounded-xl text-base md:h-11 md:text-sm";
  const benefits = [
    L("Status und aktuelle Phase Ihres Falls", "Status and current stage of your case"),
    L("Chronologie der Schritte, die Ihr Team dokumentiert", "Timeline of the steps your team documents"),
    L("Sicheres Hochladen Ihrer Unterlagen und Beweise", "Secure upload of your documents and evidence"),
    L("Direkter Kontakt zu Ihrem zuständigen Team", "Direct contact with your assigned team"),
  ];
  return (
    <CdRoot>
      <main className="container mx-auto grid gap-6 px-4 py-8 sm:px-6 md:gap-10 md:py-16 lg:grid-cols-[1.1fr_1fr] lg:py-24">
        <div className="col-span-full -mb-2 md:-mb-6 md:-mt-8"><CdBack /></div>
        <div className="order-2 max-w-xl lg:order-1">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-primary">{L("Kundenbereich", "Customer area")}</p>
          <h2 className="mt-3 font-display text-2xl font-bold leading-tight md:mt-4 md:text-5xl">{L("Verfolgen Sie Ihren Fall in Echtzeit", "Follow your case in real time")}</h2>
          <p className="mt-4 hidden text-muted-foreground md:block">{L("In Ihrem privaten Bereich sehen Sie den Fortschritt Ihres Falls, die Aktualisierungen Ihres Teams und die nächsten Schritte.", "In your private area you can see the progress of your case, updates from your team and the next steps.")}</p>
          <ul className="mt-5 space-y-3 text-sm text-muted-foreground md:mt-8">
            {benefits.map((t) => <li key={t} className="flex items-start gap-3"><ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary" />{t}</li>)}
          </ul>
        </div>
        <div className="order-1 rounded-2xl border border-border bg-card p-5 shadow-lg sm:p-6 md:p-8 lg:order-2">
          <h1 className="mb-1 font-display text-2xl font-bold">{modo === "entrar" ? L("Willkommen zurück", "Welcome back") : L("Konto erstellen", "Create your account")}</h1>
          <p className="mb-5 text-sm text-muted-foreground">{modo === "entrar" ? L("Melden Sie sich an, um Ihren Fall zu verfolgen.", "Sign in to follow your case.") : L("Dauert nur eine Minute. Ihre Daten sind geschützt.", "It only takes a minute. Your data is protected.")}</p>
          <div className="mb-6 flex rounded-xl bg-muted p-1">
            {(["entrar", "registro"] as const).map((m) => (
              <button key={m} type="button" onClick={() => { setModo(m); setAviso(null); }} className={`h-11 flex-1 rounded-lg px-3 text-sm font-semibold transition-colors ${modo === m ? "bg-background text-foreground shadow" : "text-muted-foreground"}`}>
                {m === "entrar" ? L("Anmelden", "Sign in") : L("Konto erstellen", "Create account")}
              </button>
            ))}
          </div>
          {aviso && <p role="alert" className={`mb-4 rounded-lg border p-3 text-sm ${aviso.tipo === "error" ? "border-destructive/40 bg-destructive/10 text-destructive" : "border-primary/40 bg-primary/10 text-primary"}`}>{aviso.texto}</p>}
          <form onSubmit={onSubmit} className="space-y-4">
            {modo === "registro" && (
              <>
                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  <div className="space-y-2"><Label htmlFor="nombre">{L("Vorname", "First name")}</Label><Input id="nombre" className={campo} value={f.nombre} onChange={set("nombre")} required autoComplete="given-name" /></div>
                  <div className="space-y-2"><Label htmlFor="apellidos">{L("Nachname", "Last name")}</Label><Input id="apellidos" className={campo} value={f.apellidos} onChange={set("apellidos")} required autoComplete="family-name" /></div>
                </div>
                <div className="space-y-2"><Label htmlFor="telefono">{L("Telefon", "Phone")}</Label><Input id="telefono" type="tel" className={campo} value={f.telefono} onChange={set("telefono")} required placeholder="+49 151 00000000" autoComplete="tel" pattern="^[+]?[0-9\s().\-]{6,20}$" /></div>
              </>
            )}
            <div className="space-y-2"><Label htmlFor="email">{L("E-Mail", "Email")}</Label><Input id="email" type="email" className={campo} value={f.email} onChange={set("email")} required autoComplete="email" placeholder={L("name@beispiel.de", "you@example.com")} /></div>
            <div className="space-y-2">
              <div className="flex items-center justify-between"><Label htmlFor="password">{L("Passwort", "Password")}</Label>{modo === "registro" && <span className="text-xs text-muted-foreground">{L("Mindestens 6 Zeichen", "At least 6 characters")}</span>}</div>
              <div className="relative">
                <Input id="password" type={show ? "text" : "password"} className={`${campo} pr-12`} value={f.password} onChange={set("password")} required minLength={6} autoComplete={modo === "entrar" ? "current-password" : "new-password"} />
                <button type="button" onClick={() => setShow((v) => !v)} className="absolute inset-y-0 right-0 grid w-12 place-items-center text-muted-foreground" aria-label={show ? L("Passwort verbergen", "Hide password") : L("Passwort anzeigen", "Show password")}>{show ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}</button>
              </div>
            </div>
            <CdButton type="submit" size="xl" className="w-full rounded-xl" disabled={busy}>
              {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : modo === "entrar" ? <LogIn className="h-4 w-4" /> : <UserPlus className="h-4 w-4" />}
              {modo === "entrar" ? L("Zu meinem Bereich", "Go to my area") : L("Mein Konto erstellen", "Create my account")}
            </CdButton>
          </form>
          {modo === "entrar" && <div className="mt-4 text-center"><ForgotPassword initial={f.email} /></div>}
          <p className="mt-4 text-center text-xs text-muted-foreground">
            {L("Mit dem Fortfahren akzeptieren Sie unsere ", "By continuing you accept our ")}<Link to="/cd/bedingungen" className="underline">{L("Bedingungen", "terms")}</Link>{L(" und die ", " and the ")}<Link to="/cd/datenschutz" className="underline">{L("Datenschutzerklärung", "privacy policy")}</Link>.
          </p>
        </div>
      </main>
      {entering && <div className="auth-entering" role="status"><span className="auth-entering-badge"><ShieldCheck /></span><p>{L("Ihr privater Bereich wird vorbereitet…", "Preparing your private area…")}</p></div>}
    </CdRoot>
  );
}
