import { useState } from "react";
import { Link } from "react-router-dom";
import { Pause, Play, Hexagon, FileSearch, Layers, ScanSearch } from "lucide-react";

const rows = [
  { tag: "INTELLIGENCE", title: "Understand what no single source reveals.", text: "Bring corporate, cyber, identity, dark web, financial, sanctions, and other intelligence into one investigation." },
  { tag: "SPEED", title: "Search further. Move faster.", text: "Pursue more lines of inquiry and follow connections further than a team can manage by hand." },
  { tag: "TRADECRAFT", title: "Put specialist methods to work.", text: "Use expert-tested skills and repeatable analytic methods across teams, bringing specialized expertise into every investigation." },
  { tag: "DISRUPT", title: "Turn findings into action.", text: "Use reviewed evidence to draft legal process, submit asset freezes, or request infrastructure takedowns." },
];

const cards = [
  { title: "No limits", Icon: Hexagon, text: "Adversaries cross borders, change identities, and adopt new technology without any oversight. AI lets them multiply attacks, adapt tactics, and rebuild infrastructure faster than teams can investigate by hand." },
  { title: "Higher standards", Icon: FileSearch, text: "Investigators must document every step, respect jurisdictions and meet evidentiary standards that criminals never face." },
  { title: "Limited resources", Icon: Layers, text: "Teams work with fixed budgets, fragmented tools and too few analysts for the volume of cases they receive." },
  { title: "Closing the gap", Icon: ScanSearch, text: "Blockscaner combines connected intelligence with AI-assisted methods so investigators can keep pace — under human direction." },
];

const logos = ["GREYNOISE", "AML Ranger", "AsiaVerify", "BankCheck.", "BITSIGHT", "CACI DARKBLUE", "Castellum.AI", "MINERVA", "NewsCatcher", "novirusthanks", "opencorporates", "opensanctions", "OSINT Industries", "Overwatch", "Webamon", "Whisper", "WhoisXMLAPI", "wire|screen", "xapien", "SHADOWDRAGON", "SHADOWNEXUS"];

const steps = [
  { title: "Start with the question.", text: "The investigator defines the question, scope, and starting point: a person, organization, domain, IP address, email, account, wallet, or another known signal.", glyph: "?" },
  { title: "Search across connected intelligence.", text: "Blockscaner queries connected sources in parallel and links entities, transactions and infrastructure into one view.", glyph: "⌕" },
  { title: "Apply expert methods.", text: "Repeatable analytic methods guide every line of inquiry, so results stay consistent and reviewable.", glyph: "◇" },
  { title: "Combine machine scale with human judgment.", text: "AI expands the search; investigators review, decide and document every conclusion.", glyph: "✓" },
];

const VektorSections = () => {
  const [card, setCard] = useState(0);
  const [paused, setPaused] = useState(false);
  const [step, setStep] = useState(0);

  return (
    <>
      {/* 1 */}
      <section className="bg-secondary py-20">
        <div className="mx-auto max-w-6xl px-6 lg:px-10">
          <div className="grid gap-8 md:grid-cols-[1fr_380px] pb-12">
            <h2 className="font-display text-5xl md:text-6xl tracking-tight">Fight smarter with Blockscaner.</h2>
            <p className="text-sm leading-relaxed">Blockscaner brings connected intelligence and expert investigative methods into one comprehensive inquiry. Under human direction, it uses AI to pursue more lines of investigation and follow relevant connections further.</p>
          </div>
          {rows.map((r) => (
            <div key={r.tag} className="group grid gap-6 md:grid-cols-[1fr_380px] border-t border-foreground/40 py-10 transition-colors hover:bg-background/60">
              <div>
                <p className="font-mono text-xs font-bold tracking-widest text-primary">{r.tag}</p>
                <h3 className="mt-2 font-display text-4xl md:text-5xl tracking-tight transition-transform group-hover:translate-x-2">{r.title}</h3>
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground pt-6">{r.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 2 */}
      <section className="bg-deep text-deep-foreground py-20">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="font-display text-4xl md:text-5xl text-deep-foreground">Criminal networks<br />operate without limits.</h2>
          <div className="mt-10 flex h-80 gap-3">
            {cards.map((c, i) => {
              const open = i === card;
              return (
                <button key={c.title} onClick={() => setCard(i)} onMouseEnter={() => setCard(i)} aria-expanded={open}
                  className={`relative overflow-hidden rounded-md p-5 text-left transition-all duration-500 ${open ? "flex-[4] bg-background text-foreground" : "flex-1 bg-muted text-foreground hover:bg-background/80"}`}>
                  <c.Icon className={`absolute right-4 top-4 ${open ? "h-12 w-12" : "h-6 w-6"} transition-all`} strokeWidth={1.2} />
                  {open ? (
                    <>
                      <p className="font-display text-2xl">{c.title}</p>
                      <p className="absolute bottom-5 left-5 right-5 text-xs leading-relaxed">{c.text}</p>
                    </>
                  ) : (
                    <p className="font-display text-2xl [writing-mode:vertical-rl] whitespace-nowrap">{c.title}</p>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3 */}
      <section className="bg-secondary py-20">
        <div className="mx-auto max-w-5xl px-6">
          <div className="grid gap-8 md:grid-cols-2">
            <h2 className="font-display text-4xl md:text-5xl tracking-tight">Millions of data points, all working for you.</h2>
            <p className="text-sm leading-relaxed">Blockscaner's Data Network brings intelligence from specialized data providers into one investigation under a single Blockscaner contract.¹ Teams can follow connections across sources without negotiating separate provider contracts or assembling and maintaining the sources themselves.</p>
          </div>
          <div className="mt-12 overflow-hidden border-y border-border">
            {[0, 1, 2].map((r) => {
              const list = logos.slice(r * 7, r * 7 + 7);
              return (
                <div key={r} className="overflow-hidden border-b border-border last:border-0 py-5">
                  <div className="flex w-max gap-16 vk-marquee" style={{ animationPlayState: paused ? "paused" : "running", animationDirection: r % 2 ? "reverse" : "normal" }}>
                    {[...list, ...list].map((l, i) => <span key={i} className="font-display text-lg font-semibold text-muted-foreground whitespace-nowrap">{l}</span>)}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-6 flex items-center justify-between text-xs text-muted-foreground">
            <p>¹ Provider availability varies by customer and jurisdiction. Supplemental terms may apply.</p>
            <button onClick={() => setPaused(!paused)} aria-label={paused ? "Play" : "Pause"} className="rounded border border-foreground p-1.5 text-foreground">
              {paused ? <Play className="h-3 w-3" /> : <Pause className="h-3 w-3" />}
            </button>
          </div>
        </div>
      </section>

      {/* 4 */}
      <section className="bg-background py-20">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="font-display text-4xl md:text-5xl tracking-tight">How to investigate with<br />Blockscaner.</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <div>
              {steps.map((s, i) => (
                <button key={s.title} onClick={() => setStep(i)} className="block w-full border-t border-foreground py-3 text-left last:border-b">
                  <p className={`font-semibold text-xl ${i === step ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}>{s.title}</p>
                  {i === step && <p className="mt-2 pb-8 text-xs leading-relaxed">{s.text}</p>}
                </button>
              ))}
              <Link to="/vektor-capabilities" className="mt-10 inline-block rounded bg-foreground px-3 py-2 font-mono text-[10px] uppercase tracking-wider text-background">Explore all capabilities</Link>
            </div>
            <div className="relative flex aspect-square items-center justify-center overflow-hidden rounded-md bg-deep text-deep-foreground">
              <div className="absolute inset-10 rounded-full border-[6px] border-dotted border-primary/70 animate-[spin_30s_linear_infinite]" />
              <div className="absolute inset-20 rounded-full border-4 border-dotted border-primary/50 animate-[spin_20s_linear_infinite_reverse]" />
              <span key={step} className="relative font-display text-8xl">{steps[step].glyph}</span>
            </div>
          </div>
        </div>
      </section>

      {/* 5 */}
      <section className="relative overflow-hidden bg-deep text-deep-foreground py-20">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="font-display text-5xl md:text-7xl leading-tight">Put Blockscaner<br />on the case.</h2>
          <div className="mt-12 flex gap-3">
            <Link to="/contact" className="rounded bg-background px-3 py-2 font-mono text-[10px] uppercase tracking-wider text-foreground">Request a demo</Link>
            <Link to="/tools" className="rounded border border-background px-3 py-2 font-mono text-[10px] uppercase tracking-wider hover:bg-background/10">Explore capabilities</Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default VektorSections;
