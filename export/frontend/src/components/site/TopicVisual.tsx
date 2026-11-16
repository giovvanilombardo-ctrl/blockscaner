import React from "react";
/** Unique animated SVG illustration per help topic (SMIL; static when reduced motion is preferred via CSS). */
const P = "hsl(var(--primary))";
const S = "hsl(var(--signal))";
const F = "hsl(var(--foreground))";

const A = ({ attr, values, dur = "3s", begin = "0s" }: { attr: string; values: string; dur?: string; begin?: string }) => (
  <animate attributeName={attr} values={values} dur={dur} begin={begin} repeatCount="indefinite" />
);

const visuals: Record<string, React.ReactNode> = {
  "erste-schritte": (
    <g>
      {[0, 1, 2, 3, 4].map((i) => (
        <g key={i}>
          <circle cx={100} cy={100} r={20 + i * 16} fill="none" stroke={P} strokeOpacity={0.15 + i * 0.05} />
          <circle cx={100} cy={100 - (20 + i * 16)} r={4} fill={i === 4 ? S : P}>
            <animateTransform attributeName="transform" type="rotate" from={`0 100 100`} to={`${i % 2 ? -360 : 360} 100 100`} dur={`${6 + i * 2}s`} repeatCount="indefinite" />
          </circle>
        </g>
      ))}
      <path d="M100 70 L100 104 L118 116" stroke={F} strokeWidth={3} fill="none" strokeLinecap="round">
        <animateTransform attributeName="transform" type="rotate" from="0 100 100" to="360 100 100" dur="12s" repeatCount="indefinite" />
      </path>
      <circle cx={100} cy={100} r={5} fill={F} />
    </g>
  ),
  kryptobetrug: (
    <g>
      {[[30, 40], [30, 100], [30, 160], [100, 100], [170, 60], [170, 140]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={i === 3 ? 14 : 9} fill={i === 3 ? S : "none"} stroke={i === 3 ? S : P} strokeWidth={2} />
      ))}
      {[[30, 40], [30, 100], [30, 160]].map(([x, y], i) => (
        <g key={i}>
          <line x1={x} y1={y} x2={100} y2={100} stroke={P} strokeOpacity={0.3} />
          <circle r={3} fill={P}><animateMotion dur="2.4s" begin={`${i * 0.5}s`} repeatCount="indefinite" path={`M${x} ${y} L100 100`} /></circle>
        </g>
      ))}
      {[[170, 60], [170, 140]].map(([x, y], i) => (
        <g key={i}>
          <line x1={100} y1={100} x2={x} y2={y} stroke={S} strokeOpacity={0.4} strokeDasharray="4 4"><A attr="stroke-dashoffset" values="16;0" dur="1s" /></line>
          <circle r={3} fill={S}><animateMotion dur="2s" begin={`${1 + i * 0.4}s`} repeatCount="indefinite" path={`M100 100 L${x} ${y}`} /></circle>
        </g>
      ))}
      <text x={100} y={104} textAnchor="middle" fontSize={11} fontFamily="IBM Plex Mono" fill="hsl(var(--primary-foreground))">₿</text>
    </g>
  ),
  anlagebetrug: (
    <g>
      {[0, 1, 2, 3, 4, 5].map((i) => <line key={i} x1={20} x2={180} y1={40 + i * 24} y2={40 + i * 24} stroke={P} strokeOpacity={0.1} />)}
      <path d="M20 150 L50 130 L80 120 L110 90 L140 60 L160 45" fill="none" stroke={P} strokeWidth={3} strokeDasharray="220" strokeLinecap="round">
        <A attr="stroke-dashoffset" values="220;0;0;220" dur="5s" />
      </path>
      <path d="M160 45 L170 170" stroke={S} strokeWidth={3} strokeDasharray="130">
        <A attr="stroke-dashoffset" values="130;130;0;130" dur="5s" />
      </path>
      <circle cx={170} cy={170} r={6} fill={S}><A attr="opacity" values="0;0;1;0" dur="5s" /></circle>
      <text x={110} y={34} fontSize={10} fontFamily="IBM Plex Mono" fill={P}>+312%<A attr="opacity" values="0;1;1;0" dur="5s" /></text>
    </g>
  ),
  phishing: (
    <g>
      <rect x={45} y={60} width={110} height={76} rx={4} fill="none" stroke={P} strokeWidth={2} />
      <path d="M45 62 L100 104 L155 62" fill="none" stroke={P} strokeWidth={2} />
      <path d="M150 10 L150 50 Q150 64 138 64 Q128 64 128 54" fill="none" stroke={S} strokeWidth={3} strokeLinecap="round">
        <animateTransform attributeName="transform" type="translate" values="0 -10;0 22;0 -10" dur="3s" repeatCount="indefinite" />
      </path>
      {[0, 1, 2].map((i) => <rect key={i} x={60} y={150 + i * 12} width={80 - i * 20} height={4} fill={P} opacity={0.3}><A attr="width" values={`0;${80 - i * 20};${80 - i * 20}`} dur="3s" begin={`${i * 0.2}s`} /></rect>)}
    </g>
  ),
  identitaetsdiebstahl: (
    <g>
      <rect x={30} y={55} width={140} height={90} rx={8} fill="none" stroke={P} strokeWidth={2} />
      <circle cx={70} cy={92} r={16} fill="none" stroke={P} strokeWidth={2} />
      <path d="M50 130 Q70 110 90 130" fill="none" stroke={P} strokeWidth={2} />
      {[0, 1, 2].map((i) => <rect key={i} x={105} y={80 + i * 14} width={50} height={5} fill={P} opacity={0.4} />)}
      <rect x={30} y={55} width={140} height={90} rx={8} fill={S} opacity={0}>
        <A attr="opacity" values="0;0;0.15;0" dur="3s" />
      </rect>
      <rect x={30} y={55} width={140} height={90} rx={8} fill="none" stroke={S} strokeWidth={2}>
        <animateTransform attributeName="transform" type="translate" values="0 0;8 6;-6 4;0 0" dur="3s" repeatCount="indefinite" />
        <A attr="opacity" values="0;0.8;0.4;0" dur="3s" />
      </rect>
      <line x1={20} x2={180} y1={60} y2={60} stroke={P} strokeWidth={1.5}><A attr="y1" values="55;145;55" dur="3s" /><A attr="y2" values="55;145;55" dur="3s" /></line>
    </g>
  ),
  kontouebernahme: (
    <g>
      <rect x={70} y={95} width={60} height={50} rx={4} fill="none" stroke={P} strokeWidth={2.5} />
      <path d="M80 95 V75 A20 20 0 0 1 120 75 V95" fill="none" stroke={P} strokeWidth={2.5}>
        <animateTransform attributeName="transform" type="translate" values="0 0;0 0;0 -12;0 -12;0 0" dur="4s" repeatCount="indefinite" />
      </path>
      <circle cx={100} cy={118} r={5} fill={P}><A attr="fill" values={`${P};${P};${S};${S};${P}`} dur="4s" /></circle>
      {[0, 60, 120, 180, 240, 300].map((a) => (
        <circle key={a} cx={100 + 72 * Math.cos((a * Math.PI) / 180)} cy={110 + 72 * Math.sin((a * Math.PI) / 180)} r={5} fill="none" stroke={S}>
          <A attr="r" values="3;7;3" dur="2s" begin={`${a / 300}s`} />
        </circle>
      ))}
    </g>
  ),
  ransomware: (
    <g>
      {Array.from({ length: 30 }).map((_, i) => {
        const x = 30 + (i % 6) * 26, y = 35 + Math.floor(i / 6) * 28;
        return (
          <g key={i}>
            <rect x={x} y={y} width={18} height={22} fill="none" stroke={P} strokeOpacity={0.5} />
            <rect x={x} y={y} width={18} height={22} fill={S}><A attr="opacity" values="0;0;0.7;0.7;0" dur="6s" begin={`${(i * 0.13).toFixed(2)}s`} /></rect>
          </g>
        );
      })}
    </g>
  ),
  "romance-scam": (
    <g>
      <path d="M100 160 C40 120 30 80 60 60 C80 48 95 60 100 72 C105 60 120 48 140 60 C170 80 160 120 100 160Z" fill="none" stroke={P} strokeWidth={2.5}>
        <animateTransform attributeName="transform" type="scale" values="1;1.04;1" dur="1.2s" repeatCount="indefinite" additive="sum" />
      </path>
      <path d="M100 72 L92 100 L108 115 L96 145" fill="none" stroke={S} strokeWidth={2.5} strokeDasharray="90"><A attr="stroke-dashoffset" values="90;90;0;0;90" dur="5s" /></path>
      {[0, 1, 2].map((i) => <text key={i} x={40 + i * 50} y={30} fontSize={14} fill={P} fontFamily="IBM Plex Mono">€<A attr="opacity" values="0;1;0" dur="3s" begin={`${i}s`} /><animateTransform attributeName="transform" type="translate" values="0 0;0 -20" dur="3s" begin={`${i}s`} repeatCount="indefinite" /></text>)}
    </g>
  ),
  impersonation: (
    <g>
      {[60, 140].map((x, i) => (
        <g key={x}>
          <circle cx={x} cy={80} r={22} fill="none" stroke={i ? S : P} strokeWidth={2} />
          <path d={`M${x - 34} 150 Q${x} 105 ${x + 34} 150`} fill="none" stroke={i ? S : P} strokeWidth={2} />
        </g>
      ))}
      <g>
        <rect x={34} y={50} width={52} height={60} fill="hsl(var(--background))" stroke={F} strokeWidth={2} rx={26}>
          <animateTransform attributeName="transform" type="translate" values="0 0;80 0;80 0;0 0" dur="5s" repeatCount="indefinite" />
        </rect>
      </g>
      <text x={100} y={180} textAnchor="middle" fontFamily="IBM Plex Mono" fontSize={10} fill={F}>CALLER-ID: 110</text>
    </g>
  ),
  wallet: (
    <g>
      <rect x={45} y={70} width={110} height={70} rx={8} fill="none" stroke={P} strokeWidth={2.5} />
      <rect x={120} y={92} width={35} height={26} rx={4} fill="none" stroke={P} strokeWidth={2} />
      <circle cx={134} cy={105} r={4} fill={P} />
      {Array.from({ length: 12 }).map((_, i) => (
        <text key={i} x={30 + (i % 4) * 40} y={i < 4 ? 40 : i < 8 ? 168 : 190} fontSize={8} fontFamily="IBM Plex Mono" fill={P}>
          {["apple", "river", "stone", "light", "ocean", "seven", "tiger", "glass", "moon", "pilot", "frost", "maple"][i]}
          <A attr="opacity" values="0.15;1;0.15" dur="3s" begin={`${i * 0.25}s`} />
        </text>
      ))}
      <circle cx={100} cy={105} r={44} fill="none" stroke={S} strokeDasharray="6 8"><animateTransform attributeName="transform" type="rotate" from="0 100 105" to="360 100 105" dur="10s" repeatCount="indefinite" /></circle>
    </g>
  ),
  beweissicherung: (
    <g>
      {[0, 1, 2].map((i) => <rect key={i} x={50 + i * 10} y={40 + i * 10} width={80} height={100} fill="hsl(var(--background))" stroke={P} strokeWidth={2} />)}
      {[0, 1, 2, 3].map((i) => <rect key={i} x={84} y={78 + i * 12} width={36} height={4} fill={P} opacity={0.35} />)}
      <circle cx={130} cy={130} r={22} fill="none" stroke={F} strokeWidth={3}>
        <animateTransform attributeName="transform" type="translate" values="0 0;-30 -30;10 -50;0 0" dur="6s" repeatCount="indefinite" />
      </circle>
      <line x1={146} y1={146} x2={170} y2={170} stroke={F} strokeWidth={4} strokeLinecap="round">
        <animateTransform attributeName="transform" type="translate" values="0 0;-30 -30;10 -50;0 0" dur="6s" repeatCount="indefinite" />
      </line>
      <text x={100} y={190} textAnchor="middle" fontSize={8} fontFamily="IBM Plex Mono" fill={P}>SHA-256 ✓ 9f2c…a71e</text>
    </g>
  ),
  meldewege: (
    <g>
      <circle cx={100} cy={100} r={14} fill={P} />
      {[0, 72, 144, 216, 288].map((a, i) => {
        const x = 100 + 70 * Math.cos(((a - 90) * Math.PI) / 180), y = 100 + 70 * Math.sin(((a - 90) * Math.PI) / 180);
        return (
          <g key={a}>
            <line x1={100} y1={100} x2={x} y2={y} stroke={P} strokeOpacity={0.3} />
            <rect x={x - 12} y={y - 12} width={24} height={24} fill="none" stroke={P} strokeWidth={2} />
            <circle r={3.5} fill={P}><animateMotion dur="2.5s" begin={`${i * 0.5}s`} repeatCount="indefinite" path={`M100 100 L${x} ${y}`} /></circle>
          </g>
        );
      })}
    </g>
  ),
  checklisten: (
    <g>
      {[0, 1, 2, 3, 4].map((i) => (
        <g key={i}>
          <rect x={40} y={38 + i * 26} width={16} height={16} fill="none" stroke={P} strokeWidth={2} />
          <path d={`M43 ${46 + i * 26} l4 4 l7 -9`} fill="none" stroke={P} strokeWidth={2.5} strokeDasharray="20"><A attr="stroke-dashoffset" values="20;20;0;0;20" dur="6s" begin={`${i * 0.5}s`} /></path>
          <rect x={66} y={43 + i * 26} width={100 - i * 8} height={6} fill={P} opacity={0.25} />
        </g>
      ))}
      <rect x={40} y={176} width={126} height={4} fill={P} opacity={0.15} />
      <rect x={40} y={176} height={4} fill={P}><A attr="width" values="0;126;126;0" dur="6s" /></rect>
    </g>
  ),
  faq: (
    <g>
      <rect x={30} y={40} width={100} height={46} rx={10} fill="none" stroke={P} strokeWidth={2} />
      <text x={80} y={70} textAnchor="middle" fontSize={22} fill={P} fontFamily="Archivo">?</text>
      <rect x={70} y={110} width={100} height={46} rx={10} fill={P}><A attr="opacity" values="0;0;1;1;0" dur="5s" /></rect>
      {[0, 1, 2].map((i) => <circle key={i} cx={104 + i * 16} cy={133} r={4} fill="hsl(var(--primary-foreground))"><A attr="cy" values="133;127;133" dur="0.9s" begin={`${i * 0.15}s`} /></circle>)}
    </g>
  ),
  unterstuetzung: (
    <g>
      {[0, 1, 2].map((i) => (
        <circle key={i} cx={100} cy={100} r={20} fill="none" stroke={P} strokeWidth={2}>
          <A attr="r" values="20;85" dur="4s" begin={`${i * 1.33}s`} />
          <A attr="opacity" values="0.8;0" dur="4s" begin={`${i * 1.33}s`} />
        </circle>
      ))}
      {[0, 60, 120, 180, 240, 300].map((a) => (
        <circle key={a} cx={100 + 60 * Math.cos((a * Math.PI) / 180)} cy={100 + 60 * Math.sin((a * Math.PI) / 180)} r={6} fill={P} opacity={0.7} />
      ))}
      <path d="M100 118 C80 104 76 90 86 84 C93 80 98 85 100 89 C102 85 107 80 114 84 C124 90 120 104 100 118Z" fill={P} />
    </g>
  ),
};


const hash = (s: string) => { let h = 2166136261; for (const c of s) h = Math.imul(h ^ c.charCodeAt(0), 16777619); return h >>> 0; };
const rng = (seed: number) => () => ((seed = Math.imul(seed ^ (seed >>> 15), 2246822507) ^ Math.imul(seed ^ (seed >>> 13), 3266489909)) >>> 0) / 4294967296;

/** Seeded generative visuals: six families, parameters derived from the topic id so every page differs. */
const Generative = ({ seed }: { seed: string }) => {
  const h = hash(seed), r = rng(h), fam = h % 6, n = 5 + Math.floor(r() * 7);
  const pts = Array.from({ length: n }, (_, i) => { const a = (i / n) * Math.PI * 2 + r(); const d = 35 + r() * 50; return [100 + d * Math.cos(a), 100 + d * Math.sin(a)]; });
  if (fam === 0) return (<g>{pts.map(([x, y], i) => (<g key={i}><line x1={100} y1={100} x2={x} y2={y} stroke={P} strokeOpacity={0.25} /><circle cx={x} cy={y} r={4 + r() * 5} fill="none" stroke={i % 4 === 0 ? S : P} strokeWidth={2} /><circle r={2.5} fill={P}><animateMotion dur={`${1.5 + r() * 2}s`} repeatCount="indefinite" path={`M100 100 L${x} ${y}`} /></circle></g>))}<circle cx={100} cy={100} r={10} fill={P} /></g>);
  if (fam === 1) return (<g>{Array.from({ length: n }, (_, i) => { const w = 160 / n; const v = 30 + r() * 110; return <rect key={i} x={20 + i * w} width={w - 4} y={170 - v} height={v} fill={i === n - 2 ? S : P} opacity={0.75}><A attr="height" values={`${v};${v * 0.4};${v}`} dur={`${2 + r() * 2}s`} /><A attr="y" values={`${170 - v};${170 - v * 0.4};${170 - v}`} dur={`${2 + r() * 2}s`} /></rect>; })}<line x1={15} x2={185} y1={172} y2={172} stroke={F} /></g>);
  if (fam === 2) return (<g>{Array.from({ length: 4 }, (_, i) => (<circle key={i} cx={100} cy={100} r={20 + i * 20} fill="none" stroke={P} strokeOpacity={0.3} strokeDasharray={`${4 + i * 3} ${6 + r() * 6}`}><animateTransform attributeName="transform" type="rotate" from="0 100 100" to={`${i % 2 ? -360 : 360} 100 100`} dur={`${8 + i * 3}s`} repeatCount="indefinite" /></circle>))}<line x1={100} y1={100} x2={100} y2={20} stroke={P} strokeWidth={2}><animateTransform attributeName="transform" type="rotate" from="0 100 100" to="360 100 100" dur="4s" repeatCount="indefinite" /></line>{pts.slice(0, 4).map(([x, y], i) => <circle key={i} cx={x} cy={y} r={4} fill={i ? P : S}><A attr="opacity" values="0.2;1;0.2" dur="4s" begin={`${i}s`} /></circle>)}</g>);
  if (fam === 3) return (<g>{Array.from({ length: 36 }, (_, i) => { const x = 30 + (i % 6) * 25, y = 30 + Math.floor(i / 6) * 25; return <rect key={i} x={x} y={y} width={18} height={18} fill={r() > 0.85 ? S : P}><A attr="opacity" values="0.1;0.8;0.1" dur={`${2 + r() * 3}s`} begin={`${(r() * 3).toFixed(2)}s`} /></rect>; })}</g>);
  if (fam === 4) return (<g>{Array.from({ length: 4 }, (_, k) => { const amp = 10 + r() * 25, f = 1 + Math.floor(r() * 3), y0 = 50 + k * 34; const d = (ph: number) => "M10 " + y0 + Array.from({ length: 37 }, (_, i) => ` L${10 + i * 5} ${(y0 + amp * Math.sin(i / 36 * Math.PI * 2 * f + ph)).toFixed(1)}`).join(""); return <path key={k} d={d(0)} fill="none" stroke={k === 3 ? S : P} strokeWidth={2} opacity={0.8}><animate attributeName="d" values={`${d(0)};${d(Math.PI)};${d(0)}`} dur={`${3 + k}s`} repeatCount="indefinite" /></path>; })}</g>);
  return (<g>{[0, 1, 2, 3].map((i) => (<g key={i}><rect x={40 + i * 8} y={40 + i * 26} width={120 - i * 16} height={20} fill="none" stroke={P} strokeWidth={2} /><rect x={40 + i * 8} y={40 + i * 26} height={20} fill={i === 3 ? S : P} opacity={0.5}><A attr="width" values={`0;${120 - i * 16};${120 - i * 16};0`} dur="5s" begin={`${i * 0.4}s`} /></rect></g>))}<path d="M100 150 L100 175 M90 165 L100 175 L110 165" stroke={P} strokeWidth={2} fill="none"><A attr="opacity" values="0.2;1;0.2" dur="1.5s" /></path></g>);
};

const TopicVisual = ({ id, className = "" }: { id: string; className?: string }) => (
  <svg viewBox="0 0 200 200" className={className} role="img" aria-hidden>
    {visuals[id] ?? <Generative seed={id} />}
  </svg>
);

export default TopicVisual;
