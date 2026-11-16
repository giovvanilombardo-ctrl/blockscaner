import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import SiteLayout from "@/components/site/SiteLayout";
import VektorMark from "@/components/site/VektorMark";
import photo from "@/assets/vektor-investigator.jpg";
import {
  FileSearch, Workflow, ScanSearch, Paperclip, Send, Clock, Check, MessageCircle, Users,
  Flag, Building2, ArrowLeft, ArrowRight, X, ChevronUp, ChevronDown, Repeat, ExternalLink,
} from "lucide-react";

const Btn = ({ to = "/contact", children, light = false }: { to?: string; children: React.ReactNode; light?: boolean }) => (
  <Link to={to} className={`inline-block rounded px-3 py-2 font-mono text-[10px] uppercase tracking-wider ${light ? "bg-background text-foreground" : "bg-foreground text-background"}`}>{children}</Link>
);
const H2 = ({ children }: { children: React.ReactNode }) => <h2 className="font-display font-light text-4xl md:text-5xl tracking-tight">{children}</h2>;
const Card = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`rounded-md border border-border bg-background p-4 shadow-sm text-xs ${className}`}>{children}</div>
);

/* ---------- 3: scenarios ---------- */
const scenarios = {
  "FRAUD NETWORK": { q: "Which accounts are linked to the coordinated fraud at Harbor Marketplace?", plan: "Harbor Marketplace", sub: "Coordinated account fraud", saved: "Fraud network assessment", a: "23 accounts share contact points across three regions. Seven reuse two devices and one payout endpoint — merged into one entity: Harbor refund ring." },
  "CRITICAL INFRASTRUCTURE THREAT": { q: "Which infrastructure is connected to the attack on the regional energy grid?", plan: "Northline Utilities", sub: "Infrastructure intrusion", saved: "Threat actor infrastructure map", a: "14 domains and 6 servers link to the intrusion. Four share hosting and certificates with a known threat actor cluster." },
  "SANCTIONS EVASION": { q: "Which wallets move funds on behalf of the sanctioned entity?", plan: "Meridian Trading", sub: "Sanctions evasion network", saved: "Sanctions exposure review", a: "9 wallets route funds through two exchanges and a nested service. 3 wallets have direct exposure to the sanctioned entity." },
};
type ScKey = keyof typeof scenarios;

const AutoChat = ({ q, a }: { q: string; a: string }) => {
  const [n, setN] = useState(0);
  const total = q.length + a.length;
  useEffect(() => { setN(0); }, [q]);
  useEffect(() => {
    const t = setTimeout(() => setN((x) => (x >= total + 60 ? 0 : x + 1)), n === q.length ? 700 : n > total ? 60 : 18 + Math.random() * 45);
    return () => clearTimeout(t);
  }, [n, total, q.length]);
  const qs = q.slice(0, Math.min(n, q.length));
  const as = n > q.length ? a.slice(0, n - q.length) : "";
  return (
    <div className="h-36 overflow-hidden text-xs" aria-live="polite">
      <p className="ml-auto w-[85%] min-h-[1.75rem] rounded bg-secondary px-2 py-1 text-left">{qs}{n <= q.length && <span className="animate-pulse">|</span>}</p>
      {n > q.length && <div className="mt-3"><p className="text-[9px] text-muted-foreground">Blockscaner</p><p className="mt-1 rounded border border-border px-2 py-1">{as}{n < total && <span className="animate-pulse">|</span>}</p></div>}
    </div>
  );
};

const InAction = () => {
  const [tab, setTab] = useState<ScKey>("FRAUD NETWORK");
  const [status, setStatus] = useState<"Pending" | "Approved" | "Clarify">("Pending");
  const [shared, setShared] = useState(true);
  const s = scenarios[tab];
  useEffect(() => { setStatus("Pending"); }, [tab]);
  return (
    <section className="bg-vk-paper py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-wrap items-start justify-between gap-6">
          <H2>See an investigation in action.</H2>
          <p className="max-w-xs text-sm">See the same Blockscaner capabilities applied in different scenarios.</p>
        </div>
        <div className="mt-8 flex flex-wrap gap-3 border-b border-border pb-3">
          {(Object.keys(scenarios) as ScKey[]).map((k) => (
            <button key={k} onClick={() => setTab(k)} className={`rounded px-3 py-1.5 font-mono text-[10px] tracking-wider ${tab === k ? "border border-foreground" : "text-muted-foreground hover:text-foreground"}`}>{k}</button>
          ))}
        </div>
        <div className="grid gap-10 pt-8 md:grid-cols-2">
          <div className="md:border-r md:border-border md:pr-10">
            <h3 className="text-2xl font-semibold leading-tight">Start with a question, account, organization, address, domain, or other lead</h3>
            <Card className="mt-6 p-6">
              <p className="text-center text-base font-semibold">Start a new investigation</p>
              <div className="mt-4 rounded border border-border p-3">
                <AutoChat q={s.q} a={s.a} />
                <div className="flex items-center justify-between">
                  <Paperclip className="h-4 w-4" />
                  <div className="flex items-center gap-2">
                    <select className="rounded border border-border bg-background px-2 py-1 text-[10px]"><option>Default</option><option>Deep</option></select>
                    <button onClick={() => setStatus("Pending")} aria-label="Send" className="rounded bg-primary p-1.5 text-primary-foreground"><Send className="h-3.5 w-3.5" /></button>
                  </div>
                </div>
              </div>
            </Card>
          </div>
          <div className="space-y-10">
            <div className="grid grid-cols-[1fr_auto] gap-6 border-b border-border pb-10 sm:grid-cols-[220px_1fr]">
              <Card>
                <div className="flex justify-between"><span>Plan review</span><span className="flex items-center gap-1 rounded-full bg-foreground px-2 text-[9px] text-background"><Clock className="h-2.5 w-2.5" />{status}</span></div>
                <p className="mt-3 font-semibold">{s.plan}</p><p className="text-muted-foreground">{s.sub}</p>
                {[80, 95, 70, 85].map((w, i) => <div key={i} className="mt-2 flex items-center gap-2"><span>{i + 1}.</span><div className="h-1 rounded bg-muted" style={{ width: `${w}%` }} /></div>)}
                <div className="mt-4 flex justify-center gap-2">
                  <button onClick={() => setStatus("Clarify")} className="flex items-center gap-1 rounded-full border border-border px-3 py-1"><MessageCircle className="h-3 w-3" />Clarify</button>
                  <button onClick={() => setStatus("Approved")} className="flex items-center gap-1 rounded-full bg-secondary px-3 py-1 text-primary"><Check className="h-3 w-3" />Approve</button>
                </div>
              </Card>
              <h3 className="text-2xl font-semibold leading-tight">Review and approve the investigation plan</h3>
            </div>
            <div className="grid grid-cols-[1fr_auto] gap-6 sm:grid-cols-[220px_1fr]">
              <Card>
                <p className="text-[9px] text-muted-foreground">Saved prompt</p>
                <p className="font-semibold">{s.saved}</p>
                {[100, 90, 95, 60].map((w, i) => <div key={i} className="mt-2 h-1 rounded bg-muted" style={{ width: `${w}%` }} />)}
                <button onClick={() => setShared(!shared)} className="mt-5 flex items-center gap-1 rounded border border-border px-2 py-1 text-[9px]"><Users className="h-3 w-3" />{shared ? "Shared with your organization" : "Private"}</button>
              </Card>
              <h3 className="text-2xl font-semibold leading-tight">Save investigation prompts to reuse and share</h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ---------- 4: tradecraft ---------- */
const tradecraft: Record<string, { steps: string[]; watch: string[] }> = {
  Ransomware: { steps: ["Identify strain", "Map payment wallets", "Trace cash-out", "Attribute operators"], watch: ["Reused ransom addresses", "Mixer deposits", "Leak site posts"] },
  "Cyber threat intelligence": { steps: ["Collect indicators", "Pivot on infrastructure", "Cluster activity", "Assess actor"], watch: ["Shared hosting", "Certificate reuse", "Domain bursts"] },
  "Fraud ring": { steps: ["Resolve identities", "Shared selectors", "Payment endpoints", "Submission velocity"], watch: ["Refunds to one endpoint", "Email naming patterns", "Application bursts"] },
  "Sanctions exposure": { steps: ["Screen entities", "Map ownership", "Trace fund flows", "Assess exposure"], watch: ["Nested services", "Front companies", "Sudden wallet hops"] },
  "Critical infrastructure threat": { steps: ["Scope assets", "Detect intrusions", "Link infrastructure", "Prioritize response"], watch: ["Exposed control systems", "Unusual logins", "Known actor tooling"] },
};
const chips = ["CORPORATE REGISTRY", "GEOSPATIAL", "INFRASTRUCTURE AND MALWARE INTELLIGENCE", "MEDIA", "CYBER THREAT AND RANSOMWARE INTELLIGENCE", "DARK WEB", "HIGH-RISK PII AND DEEP IDENTITY RESOLUTION", "GEOPOLITICAL AND RISK INTELLIGENCE", "SHIPPING, AND SUPPLY CHAIN", "DIGITAL RISK PROTECTION AND BRAND ABUSE", "SANCTIONS", "BLOCKCHAIN"];
const agents = ["Account intelligence agent", "Device intelligence agent", "Payment flow agent", "Infrastructure agent"];

const Reach = () => {
  const [tc, setTc] = useState("Fraud ring");
  const [n, setN] = useState(1);
  useEffect(() => { const id = setInterval(() => setN((x) => (x % agents.length) + 1), 1800); return () => clearInterval(id); }, []);
  return (
    <section className="bg-vk-stone py-20">
      <div className="mx-auto max-w-6xl px-6">
        <H2>Reach across sources.</H2>
        <div className="relative mt-8 grid gap-10 border-y border-foreground/30 py-10 md:grid-cols-2">
          <svg viewBox="0 0 600 260" className="pointer-events-none absolute inset-x-0 bottom-0 h-full w-full" aria-hidden="true">
            {[0, 1].map((k) => Array.from({ length: 260 }, (_, i) => { const a = Math.PI * (i / 259); const band = i % 5; const r = 150 + band * 9; const cx = 260 + k * 170; return <circle key={`${k}-${i}`} cx={cx - Math.cos(a) * r} cy={260 - Math.sin(a) * r} r="1.4" className="fill-muted-foreground" opacity={0.15 + band * 0.06} />; }))}
          </svg>
          <h3 className="relative text-2xl font-semibold leading-tight">Investigate using built-in tradecraft developed by Blockscaner experts.</h3>
          <div className="relative grid grid-cols-[150px_1fr] overflow-hidden rounded-md border border-border bg-background text-xs shadow-sm">
            <div className="bg-muted/60">
              {Object.keys(tradecraft).map((k) => (
                <button key={k} onClick={() => setTc(k)} className={`block w-full px-3 py-4 text-left ${tc === k ? "bg-background font-semibold" : "hover:bg-background/60"}`}>{k}</button>
              ))}
            </div>
            <div className="p-4">
              <p className="font-semibold">{tc}</p><p className="text-[9px] text-muted-foreground">Steps</p>
              {tradecraft[tc].steps.map((st, i) => <p key={st} className="mt-2 flex items-center gap-2"><span className="flex h-4 w-4 items-center justify-center rounded-full bg-muted text-[9px]">{i + 1}</span>{st}</p>)}
              <div className="mt-6 rounded bg-muted/50 p-3">
                <p className="text-[9px] text-muted-foreground">Watch for</p>
                {tradecraft[tc].watch.map((w) => <p key={w} className="mt-1.5 inline-flex w-fit items-center gap-1 rounded bg-vk-amber px-2 py-0.5 text-[10px] text-vk-amber"><Flag className="h-3 w-3" />{w}</p>)}
              </div>
            </div>
          </div>
        </div>
        <div className="grid gap-10 pt-10 md:grid-cols-2">
          <div className="md:border-r md:border-border md:pr-10">
            <h3 className="text-2xl font-semibold leading-tight">Bring all-source intelligence into one investigation.</h3>
            <div className="mt-10 space-y-3 overflow-hidden">
              {[0, 1, 2, 3].map((r) => (
                <div key={r} className="flex w-max gap-2 vk-marquee" style={{ animationDirection: r % 2 ? "reverse" : "normal", animationDuration: `${30 + r * 6}s` }}>
                  {[...chips.slice(r * 3, r * 3 + 3), ...chips, ...chips.slice(r * 3, r * 3 + 3), ...chips].map((c, i) => <span key={i} className="whitespace-nowrap rounded-full border border-foreground/50 px-3 py-1 font-mono text-[9px]">{c}</span>)}
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-semibold leading-tight">Follow multiple leads at once.</h3>
            <Card className="mx-auto mt-10 max-w-xs font-semibold">Map the network behind coordinated fraud at Harbor Marketplace</Card>
            <div className="mx-auto max-w-xs border-l border-border pl-4">
              {agents.slice(0, n).map((a, i) => (
                <Card key={a} className="mt-2 flex items-center gap-2">
                  <Building2 className="h-4 w-4" />
                  <div className="flex-1"><p className="font-semibold">{a}</p><p className="text-[9px] text-muted-foreground">{i === n - 1 ? "Searching…" : "Done"}</p></div>
                  <span className={`h-1.5 w-1.5 rounded-full bg-primary ${i === n - 1 ? "animate-pulse" : "opacity-30"}`} />
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ---------- 5: data network ---------- */
const providers = ["AML Ranger", "AsiaVerify", "BankCheck.", "BITSIGHT", "CACI DARKBLUE", "Castellum.AI", "censys", "CLOUDBURST", "COMPLY ADVANTAGE", "Constella", "Criminal IP", "CYJAX", "DARKOWL", "Diligencia", "District 4", "Exorde", "FLASHPOINT", "Fraud Intelligence", "GlobalDatabase", "GREYNOISE", "HudsonRock", "INFRAWATCH", "Kaiko", "KHARON", "MAGNET FORENSICS", "Malanta", "MINERVA", "NewsCatcher", "novirusthanks", "opencorporates", "opensanctions", "OSINT Industries", "Overwatch", "Webamon", "Whisper", "WhoisXMLAPI", "wire|screen", "xapien", "SHADOWDRAGON", "SHADOWNEXUS"];
const DataNetwork = () => {
  const [all, setAll] = useState(false);
  const list = all ? providers : providers.slice(0, 32);
  return (
    <section className="bg-vk-paper py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-8 md:grid-cols-2">
          <H2>Tap into the Blockscaner Data Network.</H2>
          <p className="text-sm">Blockscaner brings intelligence from specialized data providers into one investigation under a single Blockscaner contract.¹ Teams can follow connections across sources without negotiating separate provider contracts or assembling and maintaining the sources themselves.</p>
        </div>
        <div className="mt-8 grid grid-cols-2 border-t border-border sm:grid-cols-4 md:grid-cols-8">
          {list.map((p) => <div key={p} className="flex h-14 items-center justify-center border-b border-border px-2 text-center font-display text-sm font-semibold text-muted-foreground transition-colors hover:bg-background hover:text-foreground">{p}</div>)}
        </div>
        <div className="mt-6 grid items-center gap-4 md:grid-cols-3">
          <p className="text-[10px] text-muted-foreground">¹ Note: Provider availability varies by customer and jurisdiction. Supplemental terms may apply.</p>
          <button onClick={() => setAll(!all)} className="justify-self-center rounded bg-foreground px-3 py-2 font-mono text-[10px] uppercase text-background">{all ? "Show less" : "Show all"}</button>
        </div>
      </div>
    </section>
  );
};

/* ---------- 6: build the picture ---------- */
const pts = Array.from({ length: 22 }, (_, i) => ({ x: 10 + ((i * 37) % 80), y: 10 + ((i * 53) % 80) }));
const BuildPicture = () => {
  const [mode, setMode] = useState<"Graph" | "Priority Graph">("Priority Graph");
  const [hover, setHover] = useState(-1);
  return (
    <section className="bg-vk-paper py-20">
      <div className="mx-auto max-w-6xl px-6">
        <H2>Build the picture.</H2>
        <div className="mt-8 grid gap-10 border-t border-foreground/30 pt-8 md:grid-cols-2">
          <div className="md:border-r md:border-border md:pr-10">
            <h3 className="text-2xl font-semibold leading-tight">Resolve entities across sources and graph their connections.</h3>
            <Card className="mt-8 grid grid-cols-2 gap-3 p-0">
              <div className="p-3 text-[10px] leading-relaxed text-muted-foreground">
                <p className="font-semibold text-foreground">Investigation: Harbor Marketplace</p>
                <p className="mt-2">Account intelligence returns 23 accounts sharing contact points across three regions.</p>
                <div className="mt-2 rounded bg-muted/60 p-2"><p className="font-semibold text-foreground">Thought</p>Seven accounts share two devices and one payout endpoint. Merged into one entity: Harbor refund ring.</div>
                <p className="mt-2">Mapping the operators, mule accounts, reused devices and payment endpoints.</p>
              </div>
              <svg viewBox="0 0 100 100" className="h-full w-full border-l border-border">
                {pts.map((p, i) => i && <line key={i} x1={p.x} y1={p.y} x2={pts[(i * 3) % 6].x} y2={pts[(i * 3) % 6].y} className="stroke-muted-foreground/40" strokeWidth=".3" />)}
                {pts.map((p, i) => <circle key={i} cx={p.x} cy={p.y} r={hover === i ? 2.4 : i < 6 ? 1.6 : 1} onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(-1)} className={i < 6 ? "fill-primary cursor-pointer" : "fill-muted-foreground/50 cursor-pointer"} />)}
              </svg>
            </Card>
          </div>
          <div className="space-y-10">
            <div className="grid grid-cols-[200px_1fr] gap-6 border-b border-border pb-10">
              <Card className="p-0">
                <svg viewBox="0 0 100 70" className="w-full bg-muted/60">
                  {[0, 1, 2, 3, 4, 5].map((i) => { const a = (i / 6) * Math.PI * 2; const x = 50 + Math.cos(a) * 25, y = 35 + Math.sin(a) * 25; return <g key={i}><line x1="50" y1="35" x2={x} y2={y} className="stroke-primary" strokeWidth=".4" strokeDasharray="1 1" /><circle cx={x} cy={y} r="2.5" className="fill-primary"><animate attributeName="r" values="2;3;2" dur={`${2 + i * 0.3}s`} repeatCount="indefinite" /></circle></g>; })}
                  <circle cx="50" cy="35" r="3" className="fill-background stroke-primary" strokeWidth=".6" />
                </svg>
                <div className="p-3"><p className="font-semibold">Harbor refund ring</p><p className="text-[9px] text-muted-foreground">6 relationships · 3 locations, 2 infrastructure, 1 threat actor</p></div>
              </Card>
              <h3 className="text-2xl font-semibold leading-tight">Explore connections between entities.</h3>
            </div>
            <div className="grid grid-cols-[200px_1fr] gap-6">
              <Card>
                <div className="flex rounded bg-muted p-0.5 text-[9px]">
                  {(["Graph", "Priority Graph"] as const).map((m) => <button key={m} onClick={() => setMode(m)} className={`flex-1 rounded py-1 ${mode === m ? "bg-background" : ""}`}>{m}</button>)}
                </div>
                <svg viewBox="0 0 100 80" className="mt-2 w-full">
                  {pts.map((p, i) => <circle key={i} cx={p.x} cy={p.y * 0.8} r={mode === "Priority Graph" && i < 6 ? 2 : 1.2} className={mode === "Priority Graph" && i < 6 ? "fill-primary" : "fill-primary/25"} style={{ transition: "all .4s" }} />)}
                  {mode === "Priority Graph" && pts.slice(1, 6).map((p, i) => <line key={i} x1={pts[0].x} y1={pts[0].y * 0.8} x2={p.x} y2={p.y * 0.8} className="stroke-primary" strokeWidth=".4" />)}
                </svg>
              </Card>
              <h3 className="text-2xl font-semibold leading-tight">Focus on the most relevant entities and connections.</h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ---------- 7: stand behind every finding ---------- */
const StandBehind = () => {
  const [ev, setEv] = useState(true);
  const [claim, setClaim] = useState<"Proposed" | "Confirmed" | "Rejected">("Proposed");
  const [exp, setExp] = useState(false);
  const [done, setDone] = useState("");
  return (
    <section className="bg-vk-stone py-20">
      <div className="mx-auto max-w-6xl px-6">
        <H2>Stand behind every finding.</H2>
        <div className="mt-8 grid border-t border-foreground/30 md:grid-cols-2">
          <div className="border-b border-border py-10 md:border-r md:pr-10">
            <h3 className="text-2xl font-semibold leading-tight">Inspect the evidence behind each statement Blockscaner makes.</h3>
            <Card className="mx-auto mt-8 max-w-sm">
              <p className="text-right text-[9px] text-muted-foreground">You</p>
              <p className="ml-auto w-fit rounded bg-secondary px-2 py-1">What links the Harbor accounts?</p>
              <p className="mt-3 text-[9px] text-muted-foreground">Blockscaner</p>
              <p className="rounded border border-border px-2 py-1">Seven Harbor accounts reuse the same device fingerprint. <button onClick={() => setEv(!ev)} className="rounded bg-primary px-1 text-[9px] text-primary-foreground">[1]</button></p>
              {ev && <div className="mt-3 rounded bg-muted/60 p-3"><p className="text-[9px] text-muted-foreground">Evidence · 1/1</p><p className="font-semibold">Source: Account intelligence</p><p className="text-muted-foreground">The seven accounts were active during the same refund period.</p></div>}
            </Card>
          </div>
          <div className="border-b border-border py-10 md:pl-10">
            <h3 className="text-2xl font-semibold leading-tight">Trace evidence to its source, provider, retrieval time, and API response.</h3>
            <Card className="mx-auto mt-8 max-w-sm">
              <p className="text-[9px] text-muted-foreground">Finding</p><p className="font-semibold">Seven accounts share a device and payout endpoint</p>
              <div className="mt-3 rounded bg-muted/60 p-3">
                <p className="font-semibold">Account intelligence</p>
                <p className="mt-2 text-muted-foreground">Seven accounts reuse the same device fingerprint.</p>
                <p className="mt-4 text-[9px] text-muted-foreground">Provider: Blockscaner Data Network<br />Retrieved: 24.07.2026, 09:12</p>
                <p className="mt-1 flex gap-3 text-[9px] text-primary underline"><span>View API response</span><span className="flex items-center gap-0.5">Go to source<ExternalLink className="h-2.5 w-2.5" /></span></p>
              </div>
            </Card>
          </div>
          <div className="py-10 md:border-r md:border-border md:pr-10">
            <h3 className="text-2xl font-semibold leading-tight">Compare evidence to see where sources agree, differ, or conflict.</h3>
            <Card className="mx-auto mt-8 max-w-sm">
              <div className="flex justify-between"><span className="font-semibold">Statement 2 of 2</span><span className={`rounded px-1.5 text-[9px] ${claim === "Rejected" ? "bg-destructive/15 text-destructive" : "bg-secondary text-primary"}`}>{claim}</span></div>
              <p className="mt-1">The shared device proves all seven accounts have one owner.</p>
              <p className="mt-3 flex items-center gap-2 rounded bg-muted/60 p-2"><Check className="h-3 w-3 text-primary" />Shared device fingerprint</p>
              <p className="mt-2 flex items-center gap-2 rounded bg-muted/60 p-2"><X className="h-3 w-3 text-destructive" />Verified account owners differ</p>
              <div className="mt-4 flex justify-center gap-2">
                <button onClick={() => setClaim("Rejected")} className="rounded-full bg-destructive/10 px-3 py-1 text-destructive">Reject claim</button>
                <button onClick={() => setClaim("Confirmed")} className="rounded-full bg-secondary px-3 py-1 text-primary">Confirm claim</button>
              </div>
            </Card>
          </div>
          <div className="py-10 md:pl-10">
            <h3 className="text-2xl font-semibold leading-tight">Share the full investigation as a sourced report or graph data.</h3>
            <Card className="relative mx-auto mt-8 max-w-sm">
              <p className="font-semibold">Coordinated fraud assessment</p><p className="text-[9px] text-muted-foreground">Prepared: 24.07.2026</p>
              {[90, 70, 85, 60].map((w, i) => <div key={i} className="mt-2 h-1 rounded bg-muted" style={{ width: `${w}%` }} />)}
              {exp && <div className="absolute bottom-14 right-6 w-40 rounded border border-border bg-background p-1 shadow-lg">
                {[["Report", "PDF"], ["Report", "Word"], ["Graph data", "CSV"]].map(([a, b]) => <button key={b} onClick={() => { setDone(`${a} (${b}) export prepared`); setExp(false); }} className="flex w-full justify-between rounded px-2 py-1.5 hover:bg-muted"><span>{a}</span><span className="text-muted-foreground">{b}</span></button>)}
              </div>}
              <div className="mt-6 flex flex-col items-center gap-1">
                <button onClick={() => setExp(!exp)} className="flex items-center gap-1 rounded-full bg-primary px-3 py-1 text-primary-foreground">Export{exp ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}</button>
                {done && <p className="text-[9px] text-muted-foreground">{done} (demo)</p>}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ---------- 8: put to work ---------- */
const Toggle = ({ on, set }: { on: boolean; set: (v: boolean) => void }) => (
  <button onClick={() => set(!on)} aria-pressed={on} className={`relative h-3.5 w-6 rounded-full transition-colors ${on ? "bg-primary" : "bg-muted"}`}><span className={`absolute top-0.5 h-2.5 w-2.5 rounded-full bg-background transition-all ${on ? "left-3" : "left-0.5"}`} /></button>
);
const PutToWork = () => {
  const [saved, setSaved] = useState(false);
  const [tick, setTick] = useState(0);
  const [tg, setTg] = useState([false, true, true, true, false]);
  useEffect(() => { const id = setInterval(() => setTick((t) => t + 1), 2000); return () => clearInterval(id); }, []);
  const jobs = [["Account cluster", "Graph review"], ["Merchant group", "Entity resolution"], ["Device network", "Evidence review"]];
  const set = (i: number) => (v: boolean) => setTg(tg.map((x, j) => (j === i ? v : x)));
  return (
    <section className="bg-vk-paper py-20">
      <div className="mx-auto max-w-6xl px-6">
        <H2>Put Blockscaner to work.</H2>
        <div className="mt-8 grid gap-10 border-t border-foreground/30 pt-8 md:grid-cols-2">
          <div className="md:border-r md:border-border md:pr-10">
            <h3 className="text-2xl font-semibold leading-tight">Schedule repeat investigations and receive only new or changed findings.</h3>
            <Card className="mt-8">
              <p className="flex items-center gap-2 font-semibold"><Repeat className="h-4 w-4 text-primary" />Fraud network watch</p>
              <p className="mt-2 rounded bg-muted/60 px-2 py-1 text-muted-foreground">Harbor Marketplace: Coordinated fraud assessment</p>
              <div className="mt-2 rounded bg-muted/60 p-2"><p>Instructions</p>{[95, 100, 80].map((w, i) => <div key={i} className="mt-1.5 h-1 rounded bg-muted-foreground/20" style={{ width: `${w}%` }} />)}</div>
              <div className="mt-3 grid grid-cols-[70px_1fr] gap-y-2 text-muted-foreground">
                <span>Schedule</span><select className="w-fit bg-transparent text-foreground"><option>Every weekday at 07:00</option><option>Daily at 07:00</option><option>Weekly on Monday</option></select>
                <span>Notify</span><span className="text-foreground">Email + in-app</span>
              </div>
              <div className="mt-4 flex items-center justify-end gap-3"><span className="text-muted-foreground">Run history</span>
                <button onClick={() => setSaved(true)} className="rounded-full bg-foreground px-3 py-1 text-background">{saved ? "Automation saved ✓" : "Save automation"}</button></div>
            </Card>
          </div>
          <div className="space-y-10">
            <div className="grid grid-cols-[200px_1fr] gap-6 border-b border-border pb-10">
              <div className="space-y-2">{jobs.map(([a, b], i) => { const run = (tick + i) % 3 === 0; return <Card key={a} className="flex items-center justify-between p-2"><div><p className="font-semibold">{a}</p><p className="text-[9px] text-muted-foreground">{b}</p></div><span className={`text-[9px] ${run ? "text-primary animate-pulse" : "text-primary/70"}`}>● {run ? "Running" : "Done"}</span></Card>; })}</div>
              <h3 className="text-2xl font-semibold leading-tight">Run investigations in parallel.</h3>
            </div>
            <div className="grid grid-cols-[200px_1fr] gap-6">
              <Card className="space-y-2 p-2">
                <div className="rounded bg-muted/60 p-2"><p className="text-[8px] text-muted-foreground">Confirmation required</p>
                  {["Routine tool calls", "External actions"].map((l, i) => <p key={l} className="mt-1 flex items-center justify-between font-semibold">{l}<Toggle on={tg[i]} set={set(i)} /></p>)}</div>
                <div className="rounded bg-muted/60 p-2"><p className="text-[8px] text-muted-foreground">Available models</p>
                  {["Model provider A", "Model provider B", "Model provider C"].map((l, i) => <p key={l} className="mt-1 flex items-center justify-between font-semibold">{l}<Toggle on={tg[i + 2]} set={set(i + 2)} /></p>)}</div>
              </Card>
              <h3 className="text-2xl font-semibold leading-tight">Set tool approvals and available AI models.</h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ---------- 9: disrupt + testimonials ---------- */
const net = [[5, 20], [15, 10], [28, 6], [12, 40], [25, 33], [38, 50], [40, 18], [52, 12], [50, 30], [58, 42], [65, 18], [72, 8], [80, 22], [90, 26], [78, 45], [68, 58], [55, 62], [42, 68], [20, 62], [25, 72], [85, 50], [90, 60]];
const actions = [{ at: 5, label: "FREEZE ASSETS", title: "Issue asset-freeze requests.", text: "Send requests to freeze connected assets with the supporting financial evidence attached." },
  { at: 10, label: "DRAFT SUBPOENA", title: "Draft legal process and review returns.", text: "Prepare subpoenas and related requests, then receive and review returns in the investigation." },
  { at: 18, label: "TAKEDOWN REQUEST", title: "Issue infrastructure takedown requests.", text: "Send requests to take down domains, servers, accounts, and other infrastructure connected to the threat." }];
const quotes = [["Instead of doing the actual lookups, I can spend more time doing the analysis.", "MEDIA ORGANIZATION"], ["Even if you had them separately, it's just going to take days, weeks to get the same picture that you can get much more quickly using the platform.", "INSURANCE COMPANY"], ["It's much faster than our normal methods, and we actually get results instead of hitting the walls we're used to.", "FINANCIAL REGULATOR"], ["My favorite thing about it was the graphs.", "BANK"], ["It gave us leads we would never have found by hand.", "LAW ENFORCEMENT"]];
const Disrupt = () => {
  const [act, setAct] = useState(0);
  const scroller = useRef<HTMLDivElement>(null);
  const move = (d: number) => scroller.current?.scrollBy({ left: d * 340, behavior: "smooth" });
  return (
    <>
      <section className="bg-vk-wine text-deep-foreground py-20">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 md:grid-cols-2">
          <div>
            <h2 className="font-display font-light text-4xl md:text-5xl leading-tight">Don't just investigate.<br /><span className="text-vk-pink">Disrupt.</span></h2>
            <svg viewBox="0 0 100 80" className="mt-6 w-full">
              {net.map(([x, y], i) => net.slice(i + 1).filter(([x2, y2]) => Math.hypot(x - x2, y - y2) < 24).map(([x2, y2], j) => <line key={`${i}-${j}`} x1={x} y1={y} x2={x2} y2={y2} stroke="currentColor" strokeOpacity=".3" strokeWidth=".2" strokeDasharray=".8 .6" />))}
              {net.map(([x, y], i) => { const a = actions.findIndex((q) => q.at === i); return <g key={i}>
                <circle cx={x} cy={y} r={a >= 0 ? 1.6 : 1.3} className={a >= 0 ? "fill-background cursor-pointer" : "fill-vk-pink"} onClick={() => a >= 0 && setAct(a)}>{a === act && <animate attributeName="r" values="1.6;2.6;1.6" dur="1.5s" repeatCount="indefinite" />}</circle>
                {a >= 0 && <text x={x + 3} y={y - 1.5} fontSize="2.2" className="fill-current font-mono cursor-pointer" onClick={() => setAct(a)}>{actions[a].label}</text>}
              </g>; })}
            </svg>
          </div>
          <div className="space-y-2 md:border-l md:border-background/20 md:pl-10 md:pt-14">
            {actions.map((a, i) => (
              <button key={a.title} onClick={() => setAct(i)} className={`block w-full border-b border-background/20 py-4 text-left transition-opacity ${act === i ? "opacity-100" : "opacity-50 hover:opacity-80"}`}>
                <p className="font-display text-2xl font-medium">{a.title}</p><p className="mt-1 text-xs">{a.text}</p>
              </button>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-vk-paper py-20">
        <div className="mx-auto max-w-6xl px-6">
          <p className="font-mono text-[9px] tracking-widest">CUSTOMER FEEDBACK</p>
          <div className="flex items-end justify-between"><H2>Why users love Blockscaner.</H2>
            <div className="flex gap-2"><button onClick={() => move(-1)} aria-label="Previous" className="rounded border border-border p-1.5"><ArrowLeft className="h-4 w-4" /></button><button onClick={() => move(1)} aria-label="Next" className="rounded border border-foreground p-1.5"><ArrowRight className="h-4 w-4" /></button></div></div>
          <div ref={scroller} className="mt-8 flex snap-x gap-3 overflow-x-auto pb-2 [scrollbar-width:none]">
            {quotes.map(([q, w]) => <div key={q} className="flex h-56 w-80 shrink-0 snap-start flex-col justify-between rounded bg-vk-stone p-5"><p className="font-display font-light text-xl leading-snug">“{q}”</p><p className="font-mono text-[9px]">{w}</p></div>)}
          </div>
        </div>
      </section>
    </>
  );
};

const PinkWave = () => (
  <svg viewBox="0 0 400 300" preserveAspectRatio="xMaxYMax slice" className="pointer-events-none absolute inset-y-0 right-0 h-full w-1/2" aria-hidden="true">
    {Array.from({ length: 900 }, (_, i) => {
      const ring = i % 6, t = (i / 900) * Math.PI * 2 * 3;
      const cx = 360 - ring * 30, cy = 300 - ring * 10, r = 60 + ring * 28 + Math.sin(t * 4) * 12;
      const x = cx + Math.cos(t) * r, y = cy - Math.abs(Math.sin(t)) * r * 1.4;
      return <circle key={i} cx={x} cy={y} r={0.9 + (i % 5) * 0.25} className="fill-vk-pink" opacity={0.25 + (i % 7) / 10}>
        <animate attributeName="opacity" values={`${0.2 + (i % 7) / 10};0.15;${0.2 + (i % 7) / 10}`} dur={`${3 + (i % 5)}s`} repeatCount="indefinite" />
      </circle>;
    })}
  </svg>
);

const VektorFaehigkeiten = () => (
  <SiteLayout>
    <Helmet><title>Blockscaner Capabilities | Blockscaner</title><meta name="description" content="The operating system for investigators: Blockscaner capabilities." /></Helmet>

    <section className="bg-deep text-deep-foreground">
      <div className="mx-auto grid max-w-6xl items-stretch gap-10 px-6 py-10 md:grid-cols-2">
        <div className="flex flex-col">
          <p className="flex items-center gap-2 font-mono text-[10px] tracking-widest"><VektorMark className="h-5 w-5" />CAPABILITIES</p>
          <h1 className="mt-6 font-display font-light text-4xl md:text-5xl leading-tight">The operating system<br />for investigators.</h1>
          <p className="mt-4 max-w-md text-sm">Blockscaner is an all-source investigation environment that brings data and specialist expertise into one place. Teams can move from an initial lead to a concrete finding they can explain and defend.</p>
          <div className="mt-auto pt-10"><Btn light>Request a demo</Btn></div>
        </div>
        <img src={photo} alt="Investigator analysing data on a screen" width={1024} height={832} className="w-full rounded-md object-cover" />
      </div>
    </section>

    <section className="bg-vk-paper py-14">
      <div className="mx-auto max-w-6xl px-6">
        <H2>Blockscaner helps investigators.</H2>
        <div className="mt-8 grid gap-8 md:grid-cols-3">
          {[[FileSearch, "Find", "Surface the networks, organizations, and activity that matter"], [Workflow, "Understand", "Connect the evidence and follow the wider network"], [ScanSearch, "Disrupt", "Support action across freezes, subpoenas, and infrastructure takedowns"]].map(([I, t, d], i) => {
            const Icon = I as typeof FileSearch;
            return <div key={t as string} className={`group ${i ? "md:border-l md:border-foreground/40 md:pl-4" : ""}`}><Icon className="h-9 w-9 transition-transform group-hover:scale-110" strokeWidth={1.2} /><p className="mt-2 font-display font-light text-3xl">{t as string}</p><p className="mt-3 max-w-[200px] text-xs">{d as string}</p></div>;
          })}
        </div>
      </div>
    </section>

    <InAction />
    <Reach />
    <DataNetwork />
    <BuildPicture />
    <StandBehind />
    <PutToWork />
    <Disrupt />

    <section className="relative overflow-hidden bg-vk-wine text-deep-foreground py-20">
      <PinkWave />
      <div className="relative mx-auto max-w-6xl px-6">
        <p className="font-mono text-[9px] tracking-widest">GET STARTED</p>
        <h2 className="mt-2 font-display font-light text-5xl md:text-7xl leading-tight">Put Blockscaner<br />on the case.</h2>
        <div className="mt-12"><Btn light>Request a demo</Btn></div>
      </div>
    </section>
  </SiteLayout>
);

export default VektorFaehigkeiten;
