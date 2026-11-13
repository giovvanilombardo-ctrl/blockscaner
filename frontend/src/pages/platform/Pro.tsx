import SiteLayout from "@/components/site/SiteLayout";
import Seo from "@/components/Seo";
import { t as _t } from "@/i18n";
import { ArrowRight } from "lucide-react";

/* Blurry candlestick chart backdrop */
function ProBackdrop() {
  const candles = [
    [60, 620, 570, 550, 660], [90, 570, 610, 540, 640], [120, 610, 555, 530, 640],
    [150, 555, 500, 480, 590], [185, 500, 545, 470, 580], [220, 545, 470, 450, 580],
    [255, 470, 520, 445, 555], [290, 520, 440, 420, 555], [325, 440, 490, 415, 525],
    [360, 490, 415, 395, 525], [400, 415, 470, 390, 505], [440, 470, 400, 375, 505],
    [480, 400, 450, 370, 485], [520, 450, 385, 360, 485], [560, 385, 430, 355, 470],
    [600, 430, 370, 345, 470], [640, 370, 415, 340, 455], [680, 415, 355, 330, 455],
    [720, 355, 400, 325, 440], [760, 400, 340, 315, 440], [800, 340, 385, 310, 430],
    [840, 385, 325, 300, 430], [880, 325, 370, 295, 415], [920, 370, 310, 285, 415],
    [960, 310, 355, 280, 400], [1000, 355, 295, 270, 400], [1040, 295, 340, 265, 385],
    [1080, 340, 280, 255, 385], [1120, 280, 325, 250, 370], [1160, 325, 265, 240, 370],
    [1200, 265, 310, 235, 355], [1240, 310, 250, 225, 355], [1280, 250, 295, 220, 340],
    [1320, 295, 235, 210, 340], [1360, 235, 280, 205, 325], [1400, 280, 220, 195, 325],
    [1440, 220, 265, 190, 310], [1480, 265, 205, 180, 310], [1520, 205, 250, 175, 295],
    [1560, 250, 190, 165, 295], [1600, 190, 235, 160, 280], [1640, 235, 175, 150, 280],
    [1680, 175, 220, 145, 265], [1720, 220, 160, 135, 265], [1760, 160, 205, 130, 250],
    [1800, 205, 145, 120, 250], [1840, 145, 190, 115, 235], [1880, 190, 130, 105, 235],
    [1920, 130, 175, 100, 220],
  ];
  return (
    <svg className="pro-hero-bg" viewBox="0 0 1980 800" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id="proUp" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2ee58a"/><stop offset="1" stopColor="#0a5c34"/>
        </linearGradient>
        <linearGradient id="proDn" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#e11d48"/><stop offset="1" stopColor="#5c0a1e"/>
        </linearGradient>
        <filter id="proBlur" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="14"/>
        </filter>
      </defs>
      <g filter="url(#proBlur)" opacity=".55">
        {candles.map(([x, o, c, h, l], i) => {
          const up = c < o;
          const col = up ? "url(#proUp)" : "url(#proDn)";
          const top = Math.min(o, c);
          const hgt = Math.max(Math.abs(o - c), 8);
          return (
            <g key={i}>
              <line x1={x + 7} y1={h} x2={x + 7} y2={l} stroke={up ? "#2ee58a" : "#e11d48"} strokeWidth="3" opacity=".8"/>
              <rect x={x} y={top} width="14" height={hgt} fill={col} rx="3"/>
            </g>
          );
        })}
      </g>
    </svg>
  );
}

export default function Pro() {
  return (
    <SiteLayout>
      <Seo title="Blockscaner Pro — Unmatched precision. Minimal fees." description="Built for expert traders who prioritise speed and comprehensive tools. An advanced trading environment for quick decisions, sophisticated strategies, and real-time monitoring." />
      <div className="pro-page" data-testid="pro-page">
        <ProBackdrop />
        <div className="pro-hero">
          <h1 data-testid="pro-hero-title">
            {_t("Unmatched")} <em>precision.</em><br />
            {_t("Minimal")} <em>fees.</em>
          </h1>
          <p data-testid="pro-hero-sub">
            {_t("Built for expert traders who prioritise speed and comprehensive tools. An advanced trading environment for quick decisions, sophisticated strategies, and real-time monitoring.")}
          </p>
          <a className="pro-cta" href="/signup" data-testid="pro-signup-btn">
            {_t("Sign up")}
          </a>
        </div>
      </div>
    </SiteLayout>
  );
}
