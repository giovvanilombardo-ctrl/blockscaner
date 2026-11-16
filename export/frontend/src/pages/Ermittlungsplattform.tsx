import { t as _t } from "@/i18n";
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import SiteLayout from "@/components/site/SiteLayout";
import VektorMark from "@/components/site/VektorMark";
import VektorSections from "@/components/site/VektorSections";

const DotWave = () => {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const cv = ref.current; if (!cv) return;
    const ctx = cv.getContext("2d"); if (!ctx) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const cyan = getComputedStyle(document.documentElement).getPropertyValue("--cyan").trim();
    let w = 0, h = 0, raf = 0;
    const resize = () => { const r = cv.getBoundingClientRect(); w = r.width; h = r.height; cv.width = w; cv.height = h; };
    const draw = (t: number) => {
      const s = t / 1000;
      ctx.clearRect(0, 0, w, h);
      const cols = 140, rows = 46;
      for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {
          const u = i / cols, v = j / rows;
          const z = Math.sin(u * 7 + s * 0.6) * Math.cos(v * 5 - s * 0.4) + Math.sin(u * 3 + v * 4 + s * 0.3) * 0.8;
          const x = w * (0.45 + u * 0.6) + (v - 0.5) * w * 0.15;
          const y = h * (0.55 + v * 0.5) - z * h * 0.12 - (1 - Math.abs(u - 0.55) * 1.6) * h * 0.18;
          const a = Math.max(0, Math.min(1, 0.25 + z * 0.45));
          if (a < 0.08) continue;
          ctx.fillStyle = `hsl(${cyan} / ${a})`;
          ctx.fillRect(x, y, 1.6, 1.6);
        }
      }
    };
    const loop = (t: number) => { draw(t); raf = requestAnimationFrame(loop); };
    resize(); const ro = new ResizeObserver(resize); ro.observe(cv);
    reduced ? draw(4000) : (raf = requestAnimationFrame(loop));
    return () => { cancelAnimationFrame(raf); ro.disconnect(); };
  }, []);
  return <canvas ref={ref} aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full" />;
};

const Ermittlungsplattform = () => (
  <SiteLayout>
    <Helmet>
      <title>{_t("KI-Ermittlungsplattform | Blockscaner")}</title>
      <meta name="description" content={_t("Die KI-Ermittlungsplattform für All-Source-Intelligence.")} />
    </Helmet>
    <section className="relative overflow-hidden bg-deep text-deep-foreground min-h-[640px]">
      <DotWave />
      <div className="relative mx-auto max-w-6xl px-6 lg:px-10 pt-16 pb-40">
        <p className="flex items-center gap-5 font-mono text-6xl md:text-8xl font-bold tracking-[0.3em] uppercase text-sky-300 [text-shadow:0_0_24px_rgba(56,189,248,0.8)]"><VektorMark className="h-16 w-16 md:h-24 md:w-24 shrink-0 drop-shadow-[0_0_16px_rgba(56,189,248,0.8)]" />Blockscaner<span className="animate-pulse">_</span></p>
        <div className="mt-12 grid gap-10 md:grid-cols-2 items-start">
          <h1 className="font-display text-4xl md:text-5xl leading-tight">{_t("Geben Sie die Kontrolle zurück in die Hände der Ermittler.")}</h1>
          <div className="md:ml-auto md:max-w-sm border-t border-deep-foreground pt-3">
            <p className="text-sm leading-relaxed"><span className="font-mono font-bold uppercase tracking-[0.3em] text-sky-300 [text-shadow:0_0_12px_rgba(56,189,248,0.8)]">Blockscaner<span className="animate-pulse">_</span></span> brings connected intelligence and expert investigative methods into one comprehensive inquiry. Under human direction, it uses AI to pursue more lines of investigation and follow relevant connections further.</p>
            <Link to="/contact" className="mt-5 inline-block rounded bg-background px-3 py-2 font-mono text-xs uppercase text-foreground">{_t("So funktioniert's")}</Link>
          </div>
        </div>
      </div>
    </section>
    <VektorSections />
  </SiteLayout>
);

export default Ermittlungsplattform;
