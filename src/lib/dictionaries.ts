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
    profileKicker: string;
    profileTitle: string;
    profileBody: string;
    highlightsKicker: string;
    highlightsTitle: string;
    highlight1Badge: string;
    highlight1Title: string;
    highlight1Body: string;
    highlight2Badge: string;
    highlight2Title: string;
    highlight2Body: string;
    highlight3Badge: string;
    highlight3Title: string;
    highlight3Body: string;
    capabilitiesKicker: string;
    capabilitiesTitle: string;
    cap1Title: string;
    cap1Body: string;
    cap2Title: string;
    cap2Body: string;
    cap3Title: string;
    cap3Body: string;
    processKicker: string;
    processTitle: string;
    step1Title: string;
    step1Body: string;
    step2Title: string;
    step2Body: string;
    step3Title: string;
    step3Body: string;
    step4Title: string;
    step4Body: string;
    step5Title: string;
    step5Body: string;
    contactKicker: string;
    contactTitle: string;
    contactBody: string;
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
