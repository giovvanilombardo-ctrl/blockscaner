import { useEffect, useState, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle2, Loader2, Mail } from "lucide-react";
import { toast } from "sonner";
import type { User } from "@/integrations/supabase/client";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { lang } from "@/i18n";
import { CdButton, L } from "./AccountShell";


const ERR: Record<string, [string, string]> = {
  wait: ["Bitte warten Sie eine Minute, bevor Sie einen neuen Code anfordern.", "Please wait a minute before requesting a new code."],
  expired: ["Der Code ist abgelaufen. Fordern Sie einen neuen an.", "The code has expired. Request a new one."],
  too_many: ["Zu viele Versuche. Fordern Sie einen neuen Code an.", "Too many attempts. Request a new code."],
  wrong: ["Falscher Code.", "Incorrect code."],
};

async function call(body: object) {
  const { data, error } = await supabase.functions.invoke("account-verify", { body });
  let code = (data as any)?.error;
  if (error && !code) code = await (error as any).context?.json?.().then((j: any) => j?.error).catch(() => "x");
  if (code) { const e = ERR[code]; throw new Error(e ? L(e[0], e[1]) : L("Vorgang fehlgeschlagen.", "Something went wrong.")); }
  return data;
}

function Verification({ email, onDone }: { email: string; onDone: () => void }) {
  const [sent, setSent] = useState(false);
  const [code, setCode] = useState("");
  const [busy, setBusy] = useState(false);
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12">
      <div className="w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-lg md:p-8">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-primary">{L("Kontobestätigung", "Account verification")}</p>
        <h1 className="mt-3 font-display text-2xl font-bold">{L("Bestätigen Sie Ihre E-Mail", "Confirm your email")}</h1>
        <p className="mt-2 text-sm text-muted-foreground">{L("Zum Schutz Ihres Falls bestätigen Sie bitte Ihre E-Mail, bevor Sie Ihren Kundenbereich betreten.", "To protect your case, please confirm your email before entering your customer area.")}</p>
        <div className="mt-6 rounded-xl border border-border bg-background/60 p-5">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/15 text-primary"><Mail className="h-5 w-5" /></span>
            <div className="min-w-0"><p className="font-semibold">{L("E-Mail", "Email")}</p><p className="truncate text-sm text-muted-foreground">{email}</p></div>
          </div>
          <div className="mt-4 space-y-3">
            {sent && <Input inputMode="numeric" maxLength={6} placeholder={L("6-stelliger Code", "6-digit code")} value={code} onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))} className="text-center text-lg tracking-[0.5em]" />}
            <div className="flex flex-wrap gap-2">
              {sent && <CdButton type="button" disabled={busy || code.length !== 6} onClick={async () => {
                setBusy(true);
                try { await call({ action: "confirm", codigo: code }); toast.success(L("E-Mail bestätigt", "Email verified")); onDone(); }
                catch (e) { toast.error((e as Error).message); } finally { setBusy(false); }
              }}>{busy && <Loader2 className="h-4 w-4 animate-spin" />}<CheckCircle2 className="h-4 w-4" />{L("Bestätigen", "Verify")}</CdButton>}
              <CdButton type="button" variant={sent ? "outline" : "hero"} disabled={busy} onClick={async () => {
                setBusy(true);
                try { await call({ action: "send", lang }); setSent(true); toast.success(L("Code an Ihre E-Mail gesendet", "Code sent to your email")); }
                catch (e) { toast.error((e as Error).message); } finally { setBusy(false); }
              }}>{sent ? L("Code erneut senden", "Resend code") : L("Code per E-Mail senden", "Send code by email")}</CdButton>
            </div>
          </div>
        </div>
        <CdButton type="button" variant="outline" className="mt-6 w-full" onClick={async () => { await supabase.auth.signOut(); window.location.assign("/login"); }}>{L("Abmelden", "Sign out")}</CdButton>
      </div>
    </div>
  );
}

export default function AccountGate({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null | undefined>(undefined);
  const [verified, setVerified] = useState<boolean | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user ?? null));
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setUser(s?.user ?? null));
    return () => { sub.subscription.unsubscribe(); };
  }, []);
  useEffect(() => {
    if (user === null) navigate("/login", { replace: true });
    if (user) supabase.from("profiles").select("email_verificado").eq("id", user.id).maybeSingle()
      .then(({ data }) => setVerified(data?.email_verificado ?? true));
  }, [user, navigate]);

  if (!user || verified === null) return <div className="flex min-h-screen items-center justify-center bg-background"><Loader2 className="h-5 w-5 animate-spin text-primary" /></div>;
  // Email-code verification temporarily switched off at the owner's request; set to true to re-enable.
  const REQUIRE_EMAIL_CODE = false;
  if (REQUIRE_EMAIL_CODE && !verified) return <Verification email={user.email ?? ""} onDone={() => setVerified(true)} />;
  return <div className="client-area-enter">{children}</div>;
}
