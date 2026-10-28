import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { methodAnims } from "@/components/site/MethodAnim";
import type { BookStep } from "@/components/site/StepBook";

const StepSlider = ({ steps }: { steps: BookStep[] }) => {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const n = steps.length;
  const go = (k: number) => setI(((k % n) + n) % n);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setI((v) => (v + 1) % n), 5000);
    return () => clearInterval(id);
  }, [paused, n]);

  return (
    <div onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="overflow-hidden border border-border bg-card shadow-lg">
        <div className="flex transition-transform duration-700 ease-out" style={{ transform: `translateX(-${i * 100}%)` }}>
          {steps.map((s, k) => {
            const Anim = methodAnims[k % methodAnims.length];
            return (
              <article key={k} className="w-full shrink-0 p-7 lg:p-9" aria-hidden={k !== i}>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-mono text-xs text-primary">{String(k + 1).padStart(2, "0")} · {s.t}</p>
                    <h3 className="mt-2 font-display text-2xl lg:text-3xl text-primary">{s.h}</h3>
                  </div>
                  <div className="h-16 w-16 shrink-0 text-primary"><Anim /></div>
                </div>
                <p className="mt-4 text-muted-foreground leading-relaxed">{s.d}</p>
                <ul className="mt-5 space-y-2 text-sm">
                  {s.p.map((p) => (
                    <li key={p} className="flex gap-3"><span className="mt-2 h-1.5 w-1.5 shrink-0 bg-primary" />{p}</li>
                  ))}
                </ul>
                <p className="mt-5 border-l-2 border-primary bg-primary/5 px-4 py-3 text-sm">{s.tip}</p>
              </article>
            );
          })}
        </div>
      </div>
      <div className="mt-5 flex items-center justify-between">
        <div className="flex gap-2">
          {steps.map((_, k) => (
            <button key={k} aria-label={`${k + 1}`} onClick={() => go(k)}
              className={`h-1.5 transition-all ${k === i ? "w-8 bg-primary" : "w-4 bg-border"}`} />
          ))}
        </div>
        <div className="flex gap-2">
          <button aria-label="Previous" onClick={() => go(i - 1)} className="border border-border p-2 hover:border-primary"><ChevronLeft className="h-4 w-4" /></button>
          <button aria-label="Next" onClick={() => go(i + 1)} className="border border-border p-2 hover:border-primary"><ChevronRight className="h-4 w-4" /></button>
        </div>
      </div>
    </div>
  );
};

export default StepSlider;
