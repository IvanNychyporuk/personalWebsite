import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import type { Dictionary } from "@/lib/dictionaries";
import styles from "./SiteHeader.module.css";
import { LocaleSwitch } from "@/components/LocaleSwitch";
import { MobileMenu } from "@/components/MobileMenu";
import { NavLinks } from "@/components/NavLinks";
import { ScrollHeader } from "@/components/ScrollHeader";

export function SiteHeader({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const menuLinks = [
    { href: `/${locale}`, label: dict.nav.home },
    { href: `/${locale}/projects`, label: dict.nav.projects },
    { href: `/${locale}/experience`, label: dict.nav.experience },
    { href: `/${locale}/skills`, label: dict.nav.skills },
    { href: `/${locale}/contact`, label: dict.nav.contact },
    { href: `/${locale}/impressum`, label: dict.nav.impressum },
    { href: `/${locale}/privacy`, label: dict.privacy.title },
  ];

  return (
    <ScrollHeader>
      <div className={styles.shell}>
        <div className={styles.inner}>
        <div className={styles.brand}>
          <Link href={`/${locale}`} className={styles.brandLink}>
            <span className={styles.brandName}>Ivan Nychyporuk</span>
          </Link>
          <span className={styles.brandRole}>
            AI Media / Content Creator / VFX Digital Compositor /{" "}
            <span className={styles.noWrap}>AI Integration Consultant</span>
          </span>
        </div>

        <NavLinks
          locale={locale}
          labels={{
            home: dict.nav.home,
            projects: dict.nav.projects,
            experience: dict.nav.experience,
            skills: dict.nav.skills,
            contact: dict.nav.contact,
          }}
        />

        <div className={styles.right}>
          <MobileMenu buttonLabel="Menu" title="Navigation" links={menuLinks} />
          <LocaleSwitch locale={locale} />
          <Link
            href={`/${locale}/ai-assistant`}
            className={`button buttonPrimary ${styles.aiButton}`}
          >
            {dict.nav.aiAssistant}
          </Link>
        </div>
        </div>
      </div>
    </ScrollHeader>
  );
}
