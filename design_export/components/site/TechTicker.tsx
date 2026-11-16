import { useEffect, useState } from "react";

const WORDS = [
  "SCAN  · block #19.482.113",
  "HASH  · 0x7f3a…c91e verified",
  "TRACE · 14 hops mapped",
  "NODE  · peer sync 99.8%",
  "AML   · risk score computed",
  "LINK  · cluster analysis",
  "BTC   · mempool monitored",
  "ETH   · gas 18 gwei",
];
const CHARS = "ABCDEF0123456789#$%&*<>/";

export const TechTicker = () => {
  const [i, setI] = useState(0);
  const [text, setText] = useState(WORDS[0]);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const id = setInterval(() => setI((n) => (n + 1) % WORDS.length), 2600);
    if (reduce) return () => clearInterval(id);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const target = WORDS[i];
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setText(target); return; }
    let frame = 0;
    const id = setInterval(() => {
      frame++;
      const revealed = Math.floor(frame * 1.5);
      setText(target.split("").map((c, k) => (k < revealed || c === " " ? c : CHARS[Math.floor(Math.random() * CHARS.length)])).join(""));
      if (revealed >= target.length) clearInterval(id);
    }, 30);
    return () => clearInterval(id);
  }, [i]);

  return (
    <p className="text-primary whitespace-pre" aria-live="off">
      {text}<span className="animate-pulse">▌</span>
    </p>
  );
};
