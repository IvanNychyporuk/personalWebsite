import "server-only";
import type { Locale } from "@/lib/i18n";

export type Dictionary = {
  nav: {
    home: string;
    projects: string;
    experience: string;
    skills: string;
    contact: string;
    impressum: string;
    aiAssistant: string;
  };
  home: {
    heroKicker: string;
    heroTitle: string;
    heroLead: string;
    heroCtaPrimary: string;
    heroCtaSecondary: string;
    highlightsKicker: string;
    highlightsTitle: string;
    capabilitiesKicker: string;
    capabilitiesTitle: string;
    processKicker: string;
    processTitle: string;
    contactKicker: string;
    contactTitle: string;
  };
  contact: {
    title: string;
    lead: string;
  };
  aiAssistant: {
    title: string;
    lead: string;
    placeholderTitle: string;
    placeholderBody: string;
  };
  impressum: {
    title: string;
    placeholder: string;
  };
  privacy: {
    title: string;
    placeholder: string;
  };
};

const dictionaries = {
  en: () => import("../../content/dictionaries/en.json").then((m) => m.default),
  de: () => import("../../content/dictionaries/de.json").then((m) => m.default),
} satisfies Record<Locale, () => Promise<Dictionary>>;

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  return dictionaries[locale]();
}
