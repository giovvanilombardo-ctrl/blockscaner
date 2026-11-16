// Seven animated SVG glyphs for the methodology steps (pure SVG/CSS, honours reduced motion via CSS).
const S = { fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

const Capture = () => (
  <svg viewBox="0 0 80 80" className="w-full h-full">
    <g {...S} opacity=".4"><path d="M10 24V10h14M56 10h14v14M70 56v14H56M24 70H10V56" /></g>
    <g {...S}><path d="M10 24V10h14M56 10h14v14M70 56v14H56M24 70H10V56" className="ma-corners" /></g>
    {[0, 1, 2, 3, 4].map((r) => (
      <g key={r}>{[0, 1, 2, 3, 4].map((c) => <rect key={c} x={20 + c * 9} y={20 + r * 9} width="4" height="4" fill="currentColor" className="ma-blink" style={{ animationDelay: `${((r * 5 + c) * 137) % 1600}ms` }} />)}</g>
    ))}
    <rect x="12" y="12" width="56" height="2" fill="currentColor" className="ma-scan" />
  </svg>
);

const Secure = () => (
  <svg viewBox="0 0 80 80" className="w-full h-full">
    <circle cx="40" cy="40" r="32" {...S} strokeDasharray="4 6" className="ma-spin" style={{ transformOrigin: "40px 40px" }} />
    <circle cx="40" cy="40" r="25" {...S} opacity=".35" strokeDasharray="30 8" className="ma-spin-rev" style={{ transformOrigin: "40px 40px" }} />
    <rect x="28" y="38" width="24" height="18" {...S} />
    <path d="M32 38v-6a8 8 0 0 1 16 0v6" {...S} className="ma-shackle" />
    <circle cx="40" cy="46" r="2" fill="currentColor" className="ma-blink" />
  </svg>
);

const Query = () => (
  <svg viewBox="0 0 80 80" className="w-full h-full">
    {[0, 1, 2, 3, 4].map((i) => <rect key={i} x="10" y={14 + i * 11} width={40 + ((i * 17) % 22)} height="4" fill="currentColor" opacity=".25" className="ma-row" style={{ animationDelay: `${i * 220}ms` }} />)}
    <g className="ma-sweep">
      <circle cx="40" cy="36" r="12" {...S} strokeWidth="2" />
      <path d="M49 45l9 9" {...S} strokeWidth="2.5" />
    </g>
  </svg>
);

const LinkG = () => {
  const n = [[16, 20], [62, 16], [40, 40], [14, 62], [66, 60]];
  const e = [[0, 2], [1, 2], [2, 3], [2, 4], [0, 1], [3, 4]];
  return (
    <svg viewBox="0 0 80 80" className="w-full h-full">
      {e.map(([a, b], i) => <line key={i} x1={n[a][0]} y1={n[a][1]} x2={n[b][0]} y2={n[b][1]} {...S} strokeDasharray="60" className="ma-draw" style={{ animationDelay: `${i * 250}ms` }} />)}
      {n.map(([x, y], i) => <circle key={i} cx={x} cy={y} r={i === 2 ? 5 : 3.5} fill="currentColor" className="ma-pulse" style={{ transformOrigin: `${x}px ${y}px`, animationDelay: `${i * 300}ms` }} />)}
    </svg>
  );
};

const Assess = () => (
  <svg viewBox="0 0 80 80" className="w-full h-full">
    <path d="M12 54a28 28 0 0 1 56 0" {...S} opacity=".3" strokeWidth="5" />
    <path d="M12 54a28 28 0 0 1 56 0" {...S} strokeWidth="5" strokeDasharray="88" className="ma-gauge" />
    {[0, 1, 2, 3, 4, 5, 6].map((i) => { const a = Math.PI * (1 - i / 6); return <line key={i} x1={40 + Math.cos(a) * 20} y1={54 - Math.sin(a) * 20} x2={40 + Math.cos(a) * 23} y2={54 - Math.sin(a) * 23} {...S} />; })}
    <line x1="40" y1="54" x2="40" y2="32" {...S} strokeWidth="2" className="ma-needle" style={{ transformOrigin: "40px 54px" }} />
    <circle cx="40" cy="54" r="3" fill="currentColor" />
    <text x="40" y="70" textAnchor="middle" fill="currentColor" style={{ font: "8px 'IBM Plex Mono'" }}>RISK</text>
  </svg>
);

const Document = () => (
  <svg viewBox="0 0 80 80" className="w-full h-full">
    <path d="M20 10h30l12 12v48H20z" {...S} />
    <path d="M50 10v12h12" {...S} />
    {[0, 1, 2, 3, 4].map((i) => <line key={i} x1="27" y1={32 + i * 8} x2={i === 4 ? 44 : 55} y2={32 + i * 8} {...S} strokeDasharray="30" className="ma-write" style={{ animationDelay: `${i * 350}ms` }} />)}
  </svg>
);

const Verify = () => (
  <svg viewBox="0 0 80 80" className="w-full h-full">
    <circle cx="40" cy="40" r="14" {...S} className="ma-ripple" style={{ transformOrigin: "40px 40px" }} />
    <circle cx="40" cy="40" r="14" {...S} className="ma-ripple" style={{ transformOrigin: "40px 40px", animationDelay: "1s" }} />
    <path d="M40 12l22 8v18c0 14-10 24-22 30-12-6-22-16-22-30V20z" {...S} />
    <path d="M30 40l7 7 13-14" {...S} strokeWidth="2.5" strokeDasharray="30" className="ma-check" />
  </svg>
);

export const methodAnims = [Capture, Secure, Query, LinkG, Assess, Document, Verify];
