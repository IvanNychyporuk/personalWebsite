export const LOCALES = ["en", "de"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "en";

export function isLocale(maybe: string): maybe is Locale {
  return (LOCALES as readonly string[]).includes(maybe);
}
