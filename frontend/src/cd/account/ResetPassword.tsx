import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CdButton, CdRoot, L } from "./AccountShell";

export default function ResetPassword() {
  const navigate = useNavigate();
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const [busy, setBusy] = useState(false);
  return (
    <CdRoot>
      <main className="container mx-auto flex max-w-md flex-col px-4 py-16">
        <form className="space-y-4 rounded-2xl border border-border bg-card p-6" onSubmit={async (e) => {
          e.preventDefault();
          if (a.length < 8 || a !== b) return toast.error(L("Mindestens 8 Zeichen, beide Felder gleich.", "At least 8 characters, both fields matching."));
          setBusy(true);
          const { error } = await supabase.auth.updateUser({ password: a });
          setBusy(false);
          if (error) return toast.error(L("Der Link ist ungültig oder abgelaufen.", "The link is invalid or has expired."));
          toast.success(L("Passwort gespeichert", "Password saved"));
          navigate("/account", { replace: true });
        }}>
          <h1 className="font-display text-2xl font-bold">{L("Neues Passwort festlegen", "Set a new password")}</h1>
          <div><Label htmlFor="r-a">{L("Neues Passwort", "New password")}</Label><Input id="r-a" type="password" autoComplete="new-password" value={a} onChange={(e) => setA(e.target.value)} /></div>
          <div><Label htmlFor="r-b">{L("Passwort wiederholen", "Repeat password")}</Label><Input id="r-b" type="password" autoComplete="new-password" value={b} onChange={(e) => setB(e.target.value)} /></div>
          <CdButton type="submit" className="w-full" disabled={busy}>{L("Speichern", "Save")}</CdButton>
        </form>
      </main>
    </CdRoot>
  );
}
