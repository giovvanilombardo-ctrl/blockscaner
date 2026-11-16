import { useEffect, useRef, useState } from "react";

/** Particle "flower" that explodes and re-forms into a new flower / frequency pattern, 3 times. */
const BloomField = () => {
  const ref = useRef<HTMLCanvasElement>(null);
  const [paused, setPaused] = useState(false);
  const pausedRef = useRef(false);
  pausedRef.current = paused;

  useEffect(() => {
    const cv = ref.current; if (!cv) return;
    const ctx = cv.getContext("2d"); if (!ctx) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const cyan = getComputedStyle(document.documentElement).getPropertyValue("--cyan").trim();
    let w = 0, h = 0, raf = 0;
    let seed = 7;
    const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
    const N = 7000;
    const base = Array.from({ length: N }, (_, i) => ({ i, a: rnd() * Math.PI * 2, r: rnd(), j: rnd(), s: 0.7 + rnd() * 1.3, al: 0.35 + rnd() * 0.65 }));

    // Three clearly different flowers (unit coords, hollow centre)
    const GOLD = Math.PI * (3 - Math.sqrt(5));
    const shapes = [
      // 1. Rose: five big rounded petals
      (p: typeof base[0]) => {
        const petal = Math.abs(Math.cos(2.5 * p.a));
        const R = 0.22 + Math.pow(p.r, 0.8) * (0.25 + 0.75 * Math.pow(petal, 0.6));
        return [Math.cos(p.a) * R * 1.2, Math.sin(p.a) * R];
      },
      // 2. Sunflower: golden-angle spiral seeds in a dense ring
      (p: typeof base[0]) => {
        const t = p.i / N; const ang = p.i * GOLD;
        const R = 0.25 + 0.75 * Math.sqrt(t);
        return [Math.cos(ang) * R * 1.2, Math.sin(ang) * R];
      },
      // 3. Lotus: inner 6 wide petals + outer 12 pointed petals
      (p: typeof base[0]) => {
        if (p.j < 0.45) {
          const R = 0.2 + p.r * 0.45 * (0.4 + 0.6 * Math.abs(Math.cos(3 * p.a)));
          return [Math.cos(p.a) * R * 1.2, Math.sin(p.a) * R];
        }
        const tip = Math.pow(Math.abs(Math.cos(6 * p.a)), 3);
        const R = 0.45 + p.r * (0.15 + 0.85 * tip) * 0.6;
        return [Math.cos(p.a) * R * 1.2, Math.sin(p.a) * R];
      },
    ];
    const resize = () => { const r = cv.getBoundingClientRect(); w = r.width; h = r.height; cv.width = w; cv.height = h; };
    const ease = (x: number) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
    const HOLD = 2.4, BURST = 0.8, FORM = 0.9; // 3 flowers ≈ 12s loop
    const CYCLE = HOLD + BURST + FORM;
    let elapsed = 0, last = performance.now();

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      const done = reduced;
      const cyc = Math.floor(elapsed / CYCLE) % 3;
      const local = elapsed % CYCLE;
      const cx = w / 2, cy = h / 2, S = Math.min(w * 0.3, h * 0.52);
      const breathe = 1 + Math.sin(elapsed * 0.8) * 0.015;
      ctx.fillStyle = `hsl(${cyan})`;
      for (let i = 0; i < N; i++) {
        const p = base[i];
        const [ax, ay] = shapes[cyc](p);
        let x = ax, y = ay;
        if (!done && local > HOLD) {
          const [bx, by] = shapes[(cyc + 1) % 3](p);
          const sw = (p.j - 0.5) * 2.4; // swirl angle per particle
          const ang = Math.atan2(ay, ax) + sw, dist = 1.3 + p.j * 1.6;
          const ex = Math.cos(ang) * dist * 1.2, ey = Math.sin(ang) * dist;
          if (local < HOLD + BURST) {
            const k = ease((local - HOLD) / BURST); x = ax + (ex - ax) * k; y = ay + (ey - ay) * k;
          } else {
            const k = ease((local - HOLD - BURST) / FORM); x = ex + (bx - ex) * k; y = ey + (by - ey) * k;
          }
        }
        { const rot = Math.sin(elapsed * 0.25) * 0.06, c = Math.cos(rot), sn = Math.sin(rot); const nx = x * c - y * sn; y = x * sn + y * c; x = nx; }
        const jx = Math.sin(elapsed * 1.3 + i) * 0.004, jy = Math.cos(elapsed * 1.1 + i * 1.7) * 0.004;
        ctx.globalAlpha = p.al;
        ctx.beginPath(); ctx.arc(cx + (x + jx) * S * breathe, cy + (y + jy) * S * breathe, p.s, 0, 6.283); ctx.fill();
      }
      ctx.globalAlpha = 1;
    };
    const loop = (t: number) => {
      const dt = Math.max(0, Math.min(0.05, (t - last) / 1000)); last = t;
      if (!pausedRef.current && !document.hidden) elapsed += dt;
      draw(); raf = requestAnimationFrame(loop);
    };
    resize(); const ro = new ResizeObserver(resize); ro.observe(cv);
    if (reduced) draw(); else raf = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(raf); ro.disconnect(); };
  }, []);

  return (
    <>
      <canvas ref={ref} aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full" />
      <button type="button" onClick={() => setPaused((v) => !v)} aria-label={paused ? "Play" : "Pause"}
        className="absolute bottom-6 right-6 z-10 grid h-7 w-7 place-items-center rounded border border-deep-foreground/40 bg-deep text-deep-foreground text-[10px]">
        {paused ? "▶" : "❚❚"}
      </button>
    </>
  );
};

export default BloomField;
