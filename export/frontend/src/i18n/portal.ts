import { lang } from "@/i18n";

/** Bilingual/multilingual portal text. English is the primary language.
 *  Pass the English string and a map of translations; falls back to English. */
export function useP() {
  const p = (enText: string, other?: string | Partial<Record<"de" | "fr" | "es" | "it", string>>) => {
    if (lang === "en") return enText;
    if (typeof other === "string") return lang === "de" ? other : enText;
    return other?.[lang as "de" | "fr" | "es" | "it"] ?? enText;
  };
  return { p, lang };
}
