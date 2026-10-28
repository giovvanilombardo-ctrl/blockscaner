import { t as _t, lang } from "@/i18n";

/** Bilingual portal text: German primary, English from the site toggle.
 *  Falls back to a DE/EN pair when the string isn't in the shared dictionary. */
export function useP() {
  const p = (de: string, en: string) => (lang === "en" ? (_t(de) !== de ? _t(de) : en) : de);
  return { p, lang };
}
