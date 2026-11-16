import { useEffect, useRef } from "react";

export type EnvVariant = "network" | "ledger" | "archive" | "threat" | "trust" | "observatory" | "incident";

/**
 * Procedural, deterministic canvas environments. Pauses when off-screen or tab hidden,
 * renders a single still frame under prefers-reduced-motion, scales density to viewport.
 */
const Environment = ({ variant, className = "" }: { variant: EnvVariant; className?: string }) => {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const css = getComputedStyle(document.documentElement);
    const c = (v: string, a = 1) => `hsl(${css.getPropertyValue(v).trim()} / ${a})`;

    let w = 0, h = 0, raf = 0, visible = true, t0 = performance.now();
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);

    // deterministic PRNG
    let seed = 1337;
    const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);

    type N = { x: number; y: number; z: number };
    let nodes: N[] = [];
    let edges: [number, number][] = [];

    const build = () => {
      seed = 1337;
      const density = Math.max(28, Math.min(110, Math.floor((w * h) / 16000)));
      nodes = Array.from({ length: density }, () => ({ x: rnd() * 2 - 1, y: rnd() * 2 - 1, z: rnd() * 2 - 1 }));
      edges = [];
      nodes.forEach((a, i) => {
        const near = nodes
          .map((b, j) => ({ j, d: (a.x - b.x) ** 2 + (a.y - b.y) ** 2 + (a.z - b.z) ** 2 }))
          .filter((o) => o.j !== i)
          .sort((p, q) => p.d - q.d)
          .slice(0, 2);
        near.forEach((o) => i < o.j && edges.push([i, o.j]));
      });
    };

    const resize = () => {
      const r = canvas.getBoundingClientRect();
      w = r.width; h = r.height;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      build();
      if (reduced) draw(8000);
    };

    const project = (n: N, rot: number) => {
      const cos = Math.cos(rot), sin = Math.sin(rot);
      const x = n.x * cos - n.z * sin;
      const z = n.x * sin + n.z * cos;
      const s = 1 / (1.9 - z * 0.6);
      return { x: w * 0.62 + x * w * 0.42 * s, y: h * 0.5 + n.y * h * 0.42 * s, s, z };
    };

    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h);
      const sec = t / 1000;

      if (variant === "network" || variant === "threat") {
        const rot = sec * 0.04;
        const P = nodes.map((n) => project(n, rot));
        ctx.lineWidth = 1;
        edges.forEach(([a, b], k) => {
          const p = P[a], q = P[b];
          const alpha = 0.06 + 0.18 * ((p.s + q.s) / 2 - 0.4);
          ctx.strokeStyle = c(variant === "threat" && k % 7 === 0 ? "--signal" : "--silver", Math.max(0.04, alpha));
          ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke();
          // packet travelling along selected edges
          if (k % 5 === 0) {
            const f = (sec * 0.15 + k * 0.137) % 1;
            ctx.fillStyle = c("--primary", 0.9);
            ctx.beginPath(); ctx.arc(p.x + (q.x - p.x) * f, p.y + (q.y - p.y) * f, 1.4, 0, 6.283); ctx.fill();
          }
        });
        P.forEach((p, i) => {
          const blue = i % 4 === 0;
          const black = !blue && i % 5 === 0;
          ctx.fillStyle = blue
            ? c("--primary", 0.95)
            : black
            ? "rgba(0, 0, 0, 0.95)"
            : c("--foreground", 0.25 + p.s * 0.5);
          ctx.beginPath(); ctx.arc(p.x, p.y, (blue || black ? 2.2 : 1.4) + p.s * 3, 0, 6.283); ctx.fill();
        });
      }

      if (variant === "ledger") {
        const lanes = 9;
        for (let l = 0; l < lanes; l++) {
          const y = h * (0.12 + (l / lanes) * 0.8);
          ctx.strokeStyle = c("--border", 0.8);
          ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
          const speed = 18 + (l % 3) * 9;
          for (let b = 0; b < 14; b++) {
            const x = ((b * 160 + l * 53 + sec * speed) % (w + 200)) - 100;
            const bw = 26 + ((b * 7 + l) % 5) * 10;
            ctx.strokeStyle = c(b % 6 === 0 ? "--primary" : "--silver", b % 6 === 0 ? 0.7 : 0.18);
            ctx.strokeRect(x, y - 7, bw, 14);
            if (b % 4 === 0 && l < lanes - 1) {
              ctx.strokeStyle = c("--primary", 0.12);
              ctx.beginPath(); ctx.moveTo(x + bw, y); ctx.bezierCurveTo(x + bw + 40, y, x + bw + 20, y + h * 0.09, x + bw + 70, y + h * 0.089); ctx.stroke();
            }
          }
        }
      }

      if (variant === "archive") {
        const cols = Math.ceil(w / 120), rows = Math.ceil(h / 150);
        for (let i = 0; i < cols; i++) for (let j = 0; j < rows; j++) {
          const x = i * 120 + 20, y = j * 150 + 20;
          const k = i * 31 + j * 17;
          ctx.strokeStyle = c("--silver", 0.08);
          ctx.strokeRect(x, y, 84, 112);
          for (let r = 0; r < 6; r++) {
            ctx.fillStyle = c("--silver", 0.07);
            ctx.fillRect(x + 8, y + 14 + r * 14, 40 + ((k + r) % 4) * 8, 2);
          }
        }
        const scan = (sec * 40) % h;
        const g = ctx.createLinearGradient(0, scan - 60, 0, scan);
        g.addColorStop(0, c("--primary", 0)); g.addColorStop(1, c("--primary", 0.12));
        ctx.fillStyle = g; ctx.fillRect(0, scan - 60, w, 60);
      }

      if (variant === "observatory") {
        ctx.strokeStyle = c("--border", 0.6);
        for (let x = 0; x < w; x += 48) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke(); }
        for (let y = 0; y < h; y += 48) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke(); }
        for (let s = 0; s < 4; s++) {
          ctx.strokeStyle = c(s === 0 ? "--primary" : "--silver", s === 0 ? 0.6 : 0.18);
          ctx.beginPath();
          for (let x = 0; x <= w; x += 6) {
            const y = h * (0.35 + s * 0.12) + Math.sin(x * 0.006 + sec * 0.3 + s) * 30 + Math.sin(x * 0.019 + s * 2) * 10;
            x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
          }
          ctx.stroke();
        }
      }

      if (variant === "trust") {
        const cx = w * 0.7, cy = h * 0.5;
        for (let r = 1; r < 9; r++) {
          ctx.strokeStyle = c(r === 4 ? "--primary" : "--silver", r === 4 ? 0.35 : 0.08);
          ctx.beginPath();
          const a0 = sec * 0.05 * (r % 2 ? 1 : -1);
          ctx.arc(cx, cy, r * Math.min(w, h) * 0.06, a0, a0 + Math.PI * 1.4);
          ctx.stroke();
        }
      }

      if (variant === "incident") {
        const y = h * 0.62;
        ctx.strokeStyle = c("--border", 1);
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
        for (let i = 0; i < w / 24; i++) {
          const x = i * 24;
          ctx.strokeStyle = c("--silver", i % 6 === 0 ? 0.35 : 0.12);
          ctx.beginPath(); ctx.moveTo(x, y - (i % 6 === 0 ? 14 : 6)); ctx.lineTo(x, y); ctx.stroke();
        }
        const px = (sec * 30) % w;
        ctx.fillStyle = c("--primary", 0.8);
        ctx.beginPath(); ctx.arc(px, y, 3, 0, 6.283); ctx.fill();
      }
    };

    const loop = (t: number) => {
      if (visible && !document.hidden) draw(t - t0);
      raf = requestAnimationFrame(loop);
    };

    resize();
    const ro = new ResizeObserver(resize); ro.observe(canvas);
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting)); io.observe(canvas);
    if (!reduced) raf = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(raf); ro.disconnect(); io.disconnect(); };
  }, [variant]);

  return <canvas ref={ref} aria-hidden="true" className={`pointer-events-none absolute inset-0 h-full w-full ${className}`} />;
};

export default Environment;
