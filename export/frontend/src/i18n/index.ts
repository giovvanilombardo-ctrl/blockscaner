import en from "./en.json";

export type Lang = "en" | "de" | "fr" | "es" | "it";
export const LANGS: { code: Lang; label: string }[] = [
  { code: "en", label: "EN" },
  { code: "de", label: "DE" },
  { code: "fr", label: "FR" },
  { code: "es", label: "ES" },
  { code: "it", label: "IT" },
];

const stored = typeof localStorage !== "undefined" ? localStorage.getItem("site_lang") : null;
const valid: Lang[] = ["en", "de", "fr", "es", "it"];
export const lang: Lang = valid.includes(stored as Lang) ? (stored as Lang) : "en";
if (typeof document !== "undefined") document.documentElement.lang = lang;

const dict = en as Record<string, string>;
/** Translate a source string. English is the primary language; other languages fall back to English. */
export const t = (s: string): string => (lang === "en" ? s : dict[s] ?? s);
export const locale = { en: "en-GB", de: "de-DE", fr: "fr-FR", es: "es-ES", it: "it-IT" }[lang];
export const setLang = (l: Lang) => {
  if (l === lang) return;
  localStorage.setItem("site_lang", l);
  window.location.reload();
};
