import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { CheckCircle2, Circle, FileCheck2, Headset, LayoutDashboard, LifeBuoy, LogOut, Mail, MonitorSmartphone, ShieldCheck, UserRound } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CdBack, CdButton, CdRoot, L } from "./AccountShell";
import { dateFmt, loadPanel } from "./data";
import { STOPS } from "./MiArea";

type Sec = "resumen" | "perfil" | "seguridad" | "ayuda";

function Header({ kicker, title, text }: { kicker: string; title: string; text: string }) {
  return <header className="acct-head"><p>{kicker}</p><h1>{title}</h1><span>{text}</span></header>;
}

export default function MiCuenta() {
  const navigate = useNavigate();
  const qc = useQueryClient();
  const { data } = useQuery({ queryKey: ["mi-panel"], queryFn: loadPanel });
  const [sec, setSec] = useState<Sec>("resumen");
  const [pw, setPw] = useState({ cur: "", a: "", b: "" });
  const [busy, setBusy] = useState(false);
  useEffect(() => { document.title = L("Mein Konto – Blockscaner", "My account – Blockscaner"); }, []);
  const p = data?.perfil;
  const nombre = [p?.nombre, p?.apellidos].filter(Boolean).join(" ") || p?.full_name || L("Kunde", "Customer");
  const ini = nombre.split(" ").map((s: string) => s[0]).slice(0, 2).join("").toUpperCase();
  const caso = data?.caso;
  const menu: [Sec, string, any, string][] = [
    ["resumen", L("Übersicht", "Overview"), LayoutDashboard, L("Konto", "Account")],
    ["perfil", L("Persönliche Daten", "Personal details"), UserRound, L("Konto", "Account")],
    ["seguridad", L("Sicherheit", "Security"), ShieldCheck, L("Konto", "Account")],
    ["ayuda", L("Hilfe", "Help"), LifeBuoy, L("Support", "Support")],
  ];
  const groups = Array.from(new Set(menu.map((m) => m[3])));
  const checks: [string, boolean][] = [
    [L("E-Mail bestätigt", "Email confirmed"), !!p?.email_verificado],
    [L("Name vollständig", "Name complete"), !!(p?.nombre && p?.apellidos) || !!p?.full_name],
    [L("Telefon hinterlegt", "Phone on file"), !!p?.telefono],
    [L("Dokumente eingereicht", "Documents submitted"), (data?.documentos.length ?? 0) > 0],
  ];
  const ok = checks.filter((c) => c[1]).length;

  async function logout(global = false) { qc.clear(); await supabase.auth.signOut(global ? { scope: "global" } : undefined); navigate("/login", { replace: true }); }
  async function changePw(e: React.FormEvent) {
    e.preventDefault();
    if (pw.a.length < 8) return toast.error(L("Mindestens 8 Zeichen", "At least 8 characters"));
    if (pw.a !== pw.b) return toast.error(L("Die Passwörter stimmen nicht überein", "Passwords don't match"));
    setBusy(true);
    const { error } = await supabase.auth.updateUser({ password: pw.a, current_password: pw.cur } as any);
    setBusy(false);
    if (error) toast.error(L("Passwort konnte nicht geändert werden. Prüfen Sie Ihr aktuelles Passwort.", "Password could not be changed. Check your current password."));
    else { toast.success(L("Passwort aktualisiert", "Password updated")); setPw({ cur: "", a: "", b: "" }); }
  }
  const field = (id: string, label: string, v?: string | null) => <div><Label htmlFor={id}>{label}</Label><Input id={id} value={v || "—"} readOnly disabled /></div>;

  return (
    <CdRoot>
      <div className="client-area-page acct-page">
        <div className="acct-shell">
          <aside className="acct-side">
            <div className="acct-id"><span className="acct-avatar">{ini}</span><div><strong>{nombre}</strong><small>{data?.email}</small></div></div>
            <nav>
              {groups.map((g) => (
                <div key={g} className="acct-group"><p>{g}</p>
                  {menu.filter((m) => m[3] === g).map(([id, label, Icon]) => <button key={id} type="button" className={sec === id ? "is-active" : ""} onClick={() => setSec(id)}><Icon /> {label}</button>)}
                </div>
              ))}
            </nav>
            <button type="button" className="acct-logout" onClick={() => logout()}><LogOut /> {L("Abmelden", "Sign out")}</button>
          </aside>
          <main className="acct-main">
            <div className="acct-top"><CdBack /><Link to="/account" className="acct-link">{L("Zurück zu meinem Fall", "Back to my case")}</Link></div>

            {sec === "resumen" && (
              <section className="acct-section">
                <Header kicker={L("Mein Konto", "My account")} title={`${L("Hallo", "Hello")}, ${nombre}`} text={L("Ihr persönlicher Bereich für Profil, Sicherheit und Ihren Fall.", "Your personal hub for profile, security and your case.")} />
                <div className="acct-two">
                  <div className="acct-card">
                    <h3>{L("Ihr Fall", "Your case")}</h3>
                    <p className="text-sm text-muted-foreground">{L("Akte", "File")} {caso?.referencia ?? "—"} · {L("Phase", "Stage")} {caso?.fase ?? 1} / 6: {STOPS[Math.max(0, Math.min(5, (caso?.fase ?? 1) - 1))].title} · {caso?.progreso ?? 0}%</p>
                    <p className="mt-2 text-sm">{caso?.proxima_accion || L("Ihr Team meldet sich mit dem nächsten Schritt.", "Your team will get back to you with the next step.")}</p>
                    <Link to="/account" className="acct-more">{L("Meinen Weg ansehen", "View my journey")}</Link>
                  </div>
                  <div className="acct-card">
                    <h3>{L("Kontostatus", "Account status")}</h3>
                    <div className="acct-check">
                      <div className="acct-check-bar"><span style={{ width: `${(ok / checks.length) * 100}%` }} /></div>
                      <small>{ok} {L("von", "of")} {checks.length} {L("erledigt", "completed")}</small>
                      {checks.map(([l, v]) => <div key={l} className={v ? "is-ok" : ""}>{v ? <CheckCircle2 /> : <Circle />} {l}</div>)}
                    </div>
                  </div>
                </div>
              </section>
            )}

            {sec === "perfil" && (
              <section className="acct-section">
                <Header kicker={L("Konto", "Account")} title={L("Persönliche Daten", "Personal details")} text={L("Für Änderungen wenden Sie sich bitte an Ihr Team.", "To change these details, please contact your team.")} />
                <div className="acct-card pd-block"><div className="pd-head"><span className="pd-num">01</span><div><h3>{L("Identität", "Identity")}</h3></div></div>
                  <div className="acct-form">{field("p-n", L("Vorname", "First name"), p?.nombre)}{field("p-a", L("Nachname", "Last name"), p?.apellidos)}</div></div>
                <div className="acct-card pd-block"><div className="pd-head"><span className="pd-num">02</span><div><h3>{L("Kontakt", "Contact")}</h3></div></div>
                  <div className="acct-form">{field("p-t", L("Telefon", "Phone"), p?.telefono)}{field("p-e", L("E-Mail", "Email"), data?.email)}{field("p-c", L("Konto erstellt am", "Account created"), dateFmt(p?.created_at))}</div></div>
                <div className="acct-card pd-block"><div className="pd-head"><span className="pd-num">03</span><div><h3>{L("Ihre Dokumente", "Your documents")}</h3></div></div>
                  {data?.documentos.length ? data.documentos.map((d: any) => <div key={d.id} className="acct-row"><FileCheck2 /><div><strong>{d.nombre}</strong><small>{d.tipo} · {dateFmt(d.created_at)}</small></div></div>) : <p className="acct-empty">{L("Noch keine Dokumente.", "No documents yet.")}</p>}
                </div>
              </section>
            )}

            {sec === "seguridad" && (
              <section className="acct-section">
                <Header kicker={L("Konto", "Account")} title={L("Sicherheit", "Security")} text={L("Schützen Sie den Zugang zu Ihrem Konto.", "Protect access to your account.")} />
                <form className="acct-card acct-form" onSubmit={changePw}>
                  <h3>{L("Passwort ändern", "Change password")}</h3>
                  <div><Label htmlFor="s-c">{L("Aktuelles Passwort", "Current password")}</Label><Input id="s-c" type="password" autoComplete="current-password" value={pw.cur} onChange={(e) => setPw({ ...pw, cur: e.target.value })} required /></div>
                  <div><Label htmlFor="s-a">{L("Neues Passwort", "New password")}</Label><Input id="s-a" type="password" autoComplete="new-password" value={pw.a} onChange={(e) => setPw({ ...pw, a: e.target.value })} /></div>
                  <div><Label htmlFor="s-b">{L("Passwort wiederholen", "Repeat password")}</Label><Input id="s-b" type="password" autoComplete="new-password" value={pw.b} onChange={(e) => setPw({ ...pw, b: e.target.value })} /></div>
                  <CdButton type="submit" disabled={busy}>{L("Aktualisieren", "Update")}</CdButton>
                </form>
                <div className="acct-card">
                  <h3>{L("Geräte und Sitzungen", "Devices and sessions")}</h3>
                  <div className="acct-row"><MonitorSmartphone /><div><strong>{L("Dieses Gerät", "This device")}</strong><small>{data?.email}</small></div><span className="acct-pill acct-pill--pagada">{L("Aktiv", "Active")}</span></div>
                  <CdButton onClick={() => logout(true)}><LogOut className="h-4 w-4" /> {L("Auf allen Geräten abmelden", "Sign out on all devices")}</CdButton>
                </div>
              </section>
            )}

            {sec === "ayuda" && (
              <section className="acct-section">
                <Header kicker="Support" title={L("Brauchen Sie Hilfe?", "Need help?")} text={L("Unser Team begleitet Sie bei jedem Schritt.", "Our team supports you at every step.")} />
                <div className="acct-help">
                  <a href="mailto:support@blockchain-24.com"><Mail /><strong>{L("E-Mail", "Email")}</strong><small>support@blockchain-24.com</small></a>
                  <Link to="/kundenservice"><Headset /><strong>{L("Kundenservice", "Customer service")}</strong><small>{L("Rückruf anfordern", "Request a callback")}</small></Link>
                </div>
                <div className="acct-card">
                  <h3>{L("Häufige Fragen", "Frequently asked questions")}</h3>
                  {[
                    [L("Kann mein Geld garantiert zurückgeholt werden?", "Is recovery of my money guaranteed?"), L("Nein. Niemand kann eine Rückgewinnung garantieren. Wir dokumentieren und analysieren Ihren Fall.", "No. Nobody can guarantee recovery. We document and analyse your case.")],
                    [L("Muss ich etwas zahlen, um Gelder freizugeben?", "Do I have to pay to release funds?"), L("Nein. Wir verlangen niemals Gebühren, Steuern oder Vorauszahlungen zur Freigabe von Geldern. Wer das verlangt, ist sehr wahrscheinlich ein Betrüger.", "No. We never ask for fees, taxes or advance payments to release funds. Anyone who does is very likely a scammer.")],
                    [L("Wie ändere ich meine Daten?", "How do I change my details?"), L("Schreiben Sie Ihrem Team an support@blockchain-24.com.", "Email your team at support@blockchain-24.com.")],
                  ].map(([q, a]) => <details key={q} className="acct-faq"><summary>{q}</summary><p>{a}</p></details>)}
                </div>
              </section>
            )}
          </main>
        </div>
      </div>
    </CdRoot>
  );
}
