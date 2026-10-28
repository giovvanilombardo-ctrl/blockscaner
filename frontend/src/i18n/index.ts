import en from "./en.json";

export type Lang = "de" | "en";
const stored = typeof localStorage !== "undefined" ? localStorage.getItem("site_lang") : null;
export const lang: Lang = stored === "en" ? "en" : "de";
if (typeof document !== "undefined") document.documentElement.lang = lang;

const dict = en as Record<string, string>;
/** Translate a German source string. German is the source language; English comes from en.json. */
export const t = (s: string): string => (lang === "en" ? dict[s] ?? s : s);
export const locale = lang === "en" ? "en-GB" : "de-DE";
export const setLang = (l: Lang) => {
  if (l === lang) return;
  localStorage.setItem("site_lang", l);
  window.location.reload();
};
