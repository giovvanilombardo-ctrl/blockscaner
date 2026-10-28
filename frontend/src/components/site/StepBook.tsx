import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { t as _t } from "@/i18n";
import { methodAnims } from "./MethodAnim";

export interface BookStep { t: string; h: string; d: string; p: string[]; tip: string }

const anims = [methodAnims[1], methodAnims[0], methodAnims[5], methodAnims[2], methodAnims[6]];

/** Stacked "book page" cards: the active page is in front, the others peek out to the right. Click/tap any page to open it. */
const StepBook = ({ steps }: { steps: BookStep[] }) => {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const n = steps.length;
  const go = (d: number) => setActive((a) => (a + d + n) % n);
  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setActive((a) => (a + 1) % n), 5000);
    return () => clearInterval(id);
  }, [paused, n]);

  return (
    <div>
      <div className="relative h-[560px] sm:h-[520px]" role="tablist" aria-label={_t("Schritte in den ersten Stunden")} onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
        {steps.map((s, i) => {
          const pos = (i - active + n) % n; // 0 = front
          const isFront = pos === 0;
          return (
            <button
              key={s.t}
              role="tab"
              aria-selected={isFront}
              onClick={() => setActive(i)}
              className={`absolute top-0 h-full w-[82%] sm:w-[44%] text-left bg-card rounded-2xl p-7 sm:p-9 transition-all duration-500 ease-out ${isFront ? "shadow-[0_20px_60px_-15px_hsl(var(--foreground)/0.25)] cursor-default" : "shadow-[0_10px_40px_-20px_hsl(var(--foreground)/0.15)] cursor-pointer hover:-translate-y-1"}`}
              style={{
                left: `${pos * 14}%`,
                transform: `translateY(${pos === 0 ? 0 : 8}px)`,
                zIndex: n - pos,
              }}
            >
              <div className={`h-full flex flex-col ${isFront ? "" : "overflow-hidden"}`}>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-display text-5xl text-primary leading-none">{String(i + 1).padStart(2, "0")}</span>
                  {(() => { const A = anims[i % anims.length]; return <span className="h-16 w-16 text-primary"><A /></span>; })()}
                  <span className="font-mono text-xs text-muted-foreground">{s.t}</span>
                </div>
                <h3 className="font-display text-2xl mb-3">{s.h}</h3>
                <p className="text-muted-foreground mb-5">{s.d}</p>
                <div className={`transition-opacity duration-300 ${isFront ? "opacity-100" : "opacity-0"}`}>
                  <ul className="space-y-2 text-sm">
                    {s.p.map((x) => (
                      <li key={x} className="flex gap-2"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />{x}</li>
                    ))}
                  </ul>
                  <p className="mt-5 text-xs border-l-2 border-primary pl-3 text-muted-foreground">{s.tip}</p>
                </div>
              </div>
            </button>
          );
        })}
      </div>
      <div className="mt-6 flex items-center gap-4">
        <button onClick={() => go(-1)} aria-label={_t("Vorheriger Schritt")} className="h-10 w-10 border border-border flex items-center justify-center text-primary"><ChevronLeft className="h-4 w-4" /></button>
        <div className="flex gap-2">
          {steps.map((s, i) => (
            <button key={s.t} onClick={() => setActive(i)} aria-label={s.h} className={`h-2 rounded-full transition-all ${i === active ? "w-8 bg-primary" : "w-2 bg-border"}`} />
          ))}
        </div>
        <button onClick={() => go(1)} aria-label={_t("Nächster Schritt")} className="h-10 w-10 border border-border flex items-center justify-center text-primary"><ChevronRight className="h-4 w-4" /></button>
      </div>
    </div>
  );
};

export default StepBook;
