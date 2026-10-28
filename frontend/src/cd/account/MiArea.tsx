import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Check, CheckCircle2, Clock3, FileCheck2, FileText, FileUp, FolderSearch2, Landmark, Loader2, LogOut, Mail, MessageSquareText, Route as RouteIcon, Scale, SearchCheck, ShieldCheck, UserRound, XCircle } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CdBack, CdButton, CdRoot, L } from "./AccountShell";
import { dateFmt, loadPanel } from "./data";

export const STOPS = [
  { icon: FileCheck2, title: L("Dokumentation", "Documentation"), short: L("Eingang und Prüfung", "Intake and review"), meaning: L("Wir sammeln und sichern die Informationen, die für eine solide Bearbeitung nötig sind.", "We collect and preserve the information needed to work on a solid basis."), next: L("Prüfung der Unterlagen und Beginn der technischen Analyse.", "Review of the file and start of the technical analysis.") },
  { icon: FolderSearch2, title: L("Analyse", "Analysis"), short: L("Die Analyse beginnt", "Analysis begins"), meaning: L("Wir verfolgen die Bewegung der Vermögenswerte anhand öffentlicher Daten.", "We follow the movement of assets using public data."), next: L("Zusammenführung der Erkenntnisse.", "Consolidation of findings.") },
  { icon: SearchCheck, title: L("Ergebnisse", "Findings"), short: L("Dokumentierte Erkenntnisse", "Documented findings"), meaning: L("Technische Hinweise werden in klare, nachvollziehbare Ergebnisse überführt.", "Technical indications are turned into clear, traceable findings."), next: L("Gesamtprüfung der verfügbaren Belege.", "Overall review of the available evidence.") },
  { icon: Scale, title: L("Prüfung", "Review"), short: L("Bewertung des Falls", "Case assessment"), meaning: L("Wir prüfen die Belastbarkeit der Akte und die verfügbaren Optionen.", "We review the strength of the file and the available options."), next: L("Vorbereitung von Bericht und Weitergabe.", "Preparation of report and hand-over.") },
  { icon: ShieldCheck, title: L("Vorbereitung", "Preparation"), short: L("Bericht und Koordination", "Report and coordination"), meaning: L("Wir bereiten Berichte vor, die Sie z. B. bei Polizei oder Anwalt verwenden können.", "We prepare reports you can use, for example, with the police or a lawyer."), next: L("Abschluss und Übergabe der Unterlagen.", "Completion and hand-over of documents.") },
  { icon: Landmark, title: L("Abschluss", "Closure"), short: L("Ergebnis und Übergabe", "Outcome and hand-over"), meaning: L("Der Fall wird dokumentiert abgeschlossen. Eine Rückgewinnung von Geldern kann nicht garantiert werden.", "The case is closed with documentation. Recovery of funds cannot be guaranteed."), next: L("Übergabe des Abschlussberichts.", "Hand-over of the final report.") },
];

const DOC_TYPES: [string, string[]][] = [
  [L("Identität", "Identity"), [L("Ausweis (Vorder- und Rückseite)", "ID card (front and back)"), L("Reisepass", "Passport")]],
  [L("Finanzen", "Finances"), [L("Kontoauszug", "Bank statement"), L("Überweisungsbeleg", "Transfer receipt"), L("Kartenzahlungsbeleg", "Card payment receipt")]],
  [L("Krypto", "Crypto"), [L("Transaktions-Hash (TXID)", "Transaction hash (TXID)"), L("Wallet-Adresse", "Wallet address"), L("Exchange-Verlauf", "Exchange history")]],
  [L("Beweise", "Evidence"), [L("Chat-Screenshots", "Chat screenshots"), L("E-Mails des Täters", "Emails from the scammer"), L("Screenshots der Betrugsseite", "Screenshots of the fraudulent site")]],
  [L("Rechtliches", "Legal"), [L("Polizeiliche Anzeige", "Police report"), L("Sonstiges Dokument", "Other document")]],
];

function Upload({ userId, docs }: { userId: string; docs: any[] }) {
  const input = useRef<HTMLInputElement>(null);
  const tipo = useRef(L("Sonstiges Dokument", "Other document"));
  const [busy, setBusy] = useState(false);
  const qc = useQueryClient();
  const states: Record<string, [any, string, string]> = {
    pendiente: [Clock3, L("Wird von Ihrem Team geprüft", "Being reviewed by your team"), "text-amber-500"],
    aceptado: [CheckCircle2, L("Geprüft", "Verified"), "text-primary"],
    rechazado: [XCircle, L("Abgelehnt", "Rejected"), "text-destructive"],
  };
  async function upload(files: FileList | null) {
    if (!files?.length) return;
    setBusy(true); let ok = 0;
    for (const file of Array.from(files)) {
      if (file.size > 20 * 1024 * 1024) { toast.error(`${file.name}: ${L("größer als 20 MB", "larger than 20 MB")}`); continue; }
      const path = `${userId}/${crypto.randomUUID()}-${file.name.replace(/[^\w.\-]/g, "_")}`;
      const { error } = await supabase.storage.from("caso-documentos").upload(path, file, { contentType: file.type || "application/octet-stream" });
      if (error) { toast.error(file.name); continue; }
      const { error: e2 } = await supabase.from("caso_documentos").insert({ user_id: userId, nombre: file.name, tipo: tipo.current, path, tamano: file.size });
      if (!e2) ok++;
    }
    setBusy(false); if (input.current) input.current.value = "";
    if (ok) { toast.success(L("Dokument(e) an Ihr Team gesendet", "Document(s) sent to your team")); qc.invalidateQueries({ queryKey: ["mi-panel"] }); }
  }
  async function open(path: string) {
    const { data } = await supabase.storage.from("caso-documentos").createSignedUrl(path, 300);
    if (data?.signedUrl) window.open(data.signedUrl, "_blank", "noopener");
  }
  return (
    <section className="case-upload">
      <div className="case-upload-head">
        <div><h3>{L("Reichen Sie Ihre Unterlagen ein", "Submit your documents")}</h3><p>{L("Dateien, Fotos oder PDF (max. 20 MB pro Datei). Ihr Team prüft sie.", "Files, photos or PDF (max. 20 MB each). Your team will review them.")}</p></div>
        <input ref={input} type="file" multiple hidden onChange={(e) => void upload(e.target.files)} />
        <DropdownMenu>
          <DropdownMenuTrigger asChild><CdButton disabled={busy}>{busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <FileUp className="h-4 w-4" />}{busy ? L("Wird hochgeladen…", "Uploading…") : L("Dateien hochladen", "Upload files")}</CdButton></DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="max-h-[70vh] w-80 overflow-y-auto">
            {DOC_TYPES.map(([g, items]) => <div key={g}><DropdownMenuLabel>{g}</DropdownMenuLabel>{items.map((t) => <DropdownMenuItem key={t} onSelect={() => { tipo.current = t; setTimeout(() => input.current?.click(), 0); }}>{t}</DropdownMenuItem>)}<DropdownMenuSeparator /></div>)}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      {docs.length ? (
        <ul className="case-upload-list">
          {docs.map((d) => { const [Icon, label, cls] = states[d.estado] ?? states.pendiente; return (
            <li key={d.id}><Icon className={cls} /><div><strong>{d.nombre}</strong>{d.tipo && <small>{d.tipo}</small>}<small className={cls}>{label}</small>{d.estado === "rechazado" && d.nota_revision && <small>{L("Grund: ", "Reason: ")}{d.nota_revision}</small>}</div><CdButton variant="outline" size="sm" onClick={() => void open(d.path)}>{L("Ansehen", "View")}</CdButton></li>
          ); })}
        </ul>
      ) : <p className="client-empty">{L("Sie haben noch keine Dokumente gesendet.", "You haven't sent any documents yet.")}</p>}
    </section>
  );
}

export default function MiArea() {
  const navigate = useNavigate();
  const qc = useQueryClient();
  const { data, isLoading } = useQuery({ queryKey: ["mi-panel"], queryFn: loadPanel, refetchInterval: 15000 });
  const caso = data?.caso;
  const current = Math.max(0, Math.min(5, Number(caso?.fase ?? 1) - 1));
  const [sel, setSel] = useState(current);
  useEffect(() => setSel(current), [current]);
  useEffect(() => { document.title = L("Mein Bereich – Blockscaner", "My area – Blockscaner"); }, []);
  const nombre = [data?.perfil?.nombre, data?.perfil?.apellidos].filter(Boolean).join(" ") || data?.perfil?.full_name || "";
  const stop = STOPS[sel];
  const SelIcon = stop.icon;
  const updates = (data?.actualizaciones ?? []).filter((u: any) => Number(u.fase) === sel + 1);
  const state = (i: number) => (i < current ? "completed" : i === current ? "current" : "upcoming");
  const stateLabel = { completed: L("Abgeschlossen", "Completed"), current: L("Aktuelle Phase", "Current stage"), upcoming: L("Demnächst", "Upcoming") };
  const progress = Math.max(0, Math.min(100, Number(caso?.progreso) || 0));

  async function logout() { qc.clear(); await supabase.auth.signOut(); navigate("/login", { replace: true }); }

  return (
    <CdRoot>
      <div className="client-area-page">
        <main className="client-area-shell container mx-auto px-4 py-8 sm:px-6">
          <div className="client-area-topbar flex items-center justify-between"><CdBack /><CdButton variant="ghost" onClick={logout}><LogOut className="h-4 w-4" />{L("Abmelden", "Sign out")}</CdButton></div>
          <header className="client-welcome">
            <div className="client-welcome-heading">
              <div><p>{L("Privater Bereich", "Private area")}</p><h1>{nombre ? `${L("Hallo", "Hello")}, ${nombre}` : L("Hallo", "Hello")}</h1></div>
              <Link to="/konto" className="account-pill"><span className="account-pill-icon"><span className="account-pill-ring" /><UserRound /></span><span className="account-pill-text"><span className="account-pill-title">{L("Mein Konto", "My account")}</span><span className="account-pill-sub">{L("Profil verwalten", "Manage profile")}</span></span></Link>
            </div>
            <span>{L("Hier verfolgen Sie Ihren Fall Schritt für Schritt.", "Here you can follow your case step by step.")}</span>
          </header>

          {isLoading && <div className="client-loading"><Loader2 className="animate-spin" /> {L("Wird geladen…", "Loading…")}</div>}

          {!isLoading && data && (
            <div className="client-journey">
              <section className="client-summary">
                <div className="client-summary-topline"><span><ShieldCheck /> {caso?.referencia ?? L("wird vergeben", "being assigned")}</span><span className="client-status-pill client-status-current">{stateLabel.current}: {STOPS[current].title}</span></div>
                <div className="client-summary-visuals">
                  <div className="client-progress-orbit" style={{ "--case-progress": `${progress}%` } as React.CSSProperties}>
                    <div className="client-progress-orbit-core"><RouteIcon /><strong>{progress}%</strong><span>{L("erledigt", "complete")}</span></div>
                  </div>
                  <div className="client-available">
                    <span><Clock3 /> {L("Nächster Schritt", "Next step")}</span>
                    <strong style={{ fontSize: "1.1rem" }}>{caso?.proxima_accion || L("Ihr Team meldet sich mit dem nächsten Schritt.", "Your team will get back to you with the next step.")}</strong>
                    {caso?.investigador && <small>{L("Zuständig: ", "Assigned: ")}{caso.investigador}</small>}
                  </div>
                </div>
                {caso?.resumen && <div className="client-summary-legend"><span>{caso.resumen}</span></div>}
              </section>

              <section className="client-road-section">
                <div className="client-road-heading"><div><p>{L("Ihr Weg", "Your journey")}</p><h2>{L("Von der Akte zum Abschluss", "From file to closure")}</h2></div><p>{L("Wählen Sie eine Phase, um Details zu sehen.", "Select a stage to see its details.")}</p></div>
                <div className="client-road-scroll">
                  <div className="client-road" style={{ "--road-progress": `${(current / 5) * 100}%` } as React.CSSProperties}>
                    <div className="client-road-base"><span /></div>
                    {STOPS.map((s, i) => { const st = state(i); const Icon = s.icon; return (
                      <button key={i} type="button" data-stop-index={i} data-stage={i + 1} data-stop-state={st} aria-pressed={sel === i} className="client-stop" onClick={() => setSel(i)}>
                        <span className="client-stop-visual"><span className="client-stop-number">{String(i + 1).padStart(2, "0")}</span><span className="client-stop-icon"><Icon /></span>{st === "completed" && <span className="client-stop-check"><Check /></span>}</span>
                        <span className="client-stop-copy"><small>{stateLabel[st]}</small><strong>{s.title}</strong><span>{s.short}</span></span>
                      </button>
                    ); })}
                  </div>
                </div>
              </section>

              <section className="client-stop-ecosystem" data-stage={sel + 1}>
                <header className="client-stop-header">
                  <div className="client-stop-hero-visual"><div className="client-stop-emblem"><SelIcon /></div></div>
                  <div><p>{L("Phase", "Stage")} {String(sel + 1).padStart(2, "0")} · {stateLabel[state(sel)]}</p><h2>{stop.title}</h2><span>{stop.meaning}</span></div>
                  {sel === current && <div className="client-you-are-here"><RouteIcon /> {L("Sie sind hier", "You are here")}</div>}
                </header>
                {sel === 0 && data.userId && <Upload userId={data.userId} docs={data.documentos} />}
                <Tabs defaultValue="overview" className="client-stage-tabs">
                  <TabsList><TabsTrigger value="overview">{L("Jetzt", "Now")}</TabsTrigger><TabsTrigger value="activity">{L("Aktivität", "Activity")}</TabsTrigger></TabsList>
                  <TabsContent value="overview" className="client-stage-content">
                    <div className="client-primary-narrative">
                      <p className="client-kicker">{L("Was passiert", "What is happening")}</p>
                      <h3>{sel === current ? (caso?.resumen || stop.meaning) : sel < current ? L("Diese Phase ist abgeschlossen.", "This stage is complete.") : L("Diese Phase beginnt, wenn die vorherigen Schritte abgeschlossen sind.", "This stage starts once the previous steps are complete.")}</h3>
                      <div className="client-next-step"><Clock3 /><div><span>{L("Geplanter nächster Schritt", "Planned next step")}</span><strong>{sel === current && caso?.proxima_accion ? caso.proxima_accion : stop.next}</strong></div></div>
                    </div>
                    <aside className="client-stage-aside">
                      <div><span>{L("Dokumentierte Arbeit", "Documented work")}</span><strong>{updates.length} {L("Aktualisierungen", "updates")}</strong></div>
                      <div><span>{L("Ihre Dokumente", "Your documents")}</span><strong>{data.documentos.length}</strong></div>
                      <div><span>{L("Letzte Aktualisierung", "Last update")}</span><strong>{dateFmt(updates[0]?.fecha ?? caso?.updated_at)}</strong></div>
                    </aside>
                  </TabsContent>
                  <TabsContent value="activity" className="client-stage-content">
                    <div className="client-section-intro"><MessageSquareText /><div><h3>{L("Aktivität und Verlauf", "Activity and history")}</h3><p>{L("Von Ihrem Team veröffentlichte Neuigkeiten zu dieser Phase.", "News published by your team for this stage.")}</p></div></div>
                    <ol className="client-activity-list">
                      {updates.map((u: any) => <li key={u.id}><time>{dateFmt(u.fecha)}</time><strong>{u.titulo}</strong>{u.descripcion && <p>{u.descripcion}</p>}</li>)}
                      {!updates.length && <li className="client-empty">{L("In dieser Phase gibt es noch keine Aktualisierungen.", "No updates published for this stage yet.")}</li>}
                    </ol>
                  </TabsContent>
                </Tabs>
                <div className="client-contact-line mt-6"><a href="mailto:support@blockchain-24.com"><Mail /> support@blockchain-24.com</a><Link to="/kundenservice"><FileText /> {L("Kundenservice", "Customer service")}</Link></div>
              </section>
            </div>
          )}
        </main>
      </div>
    </CdRoot>
  );
}
