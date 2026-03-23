import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import type { Dictionary } from "@/lib/dictionaries";
import styles from "./SiteFooter.module.css";

const EMAIL = "nychyporuk.ivan.vfx@gmail.com";
const LINKEDIN = "https://www.linkedin.com/in/ivan-nychyporuk-41233488/";

export function SiteFooter({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.grid}>
          <div>
            <h2 className={styles.title}>Ivan Nychyporuk</h2>
            <p className={styles.muted}>
              AI Media / Content Designer & Creator. AI integration consultant.
              Based in Trier, Germany.
            </p>
            <p className={styles.small}>
              {new Date().getFullYear()} - All rights reserved.
            </p>
          </div>

          <div>
            <h3 className={styles.title}>Contact</h3>
            <ul className={styles.list}>
              <li>
                <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
              </li>
              <li>
                <a href={LINKEDIN} target="_blank" rel="noreferrer">
                  LinkedIn
                </a>
              </li>
              <li>
                <Link href={`/${locale}/contact`}>{dict.nav.contact}</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className={styles.title}>Links</h3>
            <ul className={styles.list}>
              <li>
                <Link href={`/${locale}/projects`}>{dict.nav.projects}</Link>
              </li>
              <li>
                <Link href={`/${locale}/experience`}>{dict.nav.experience}</Link>
              </li>
              <li>
                <Link href={`/${locale}/impressum`}>{dict.nav.impressum}</Link>
              </li>
              <li>
                <Link href={`/${locale}/privacy`}>{dict.privacy.title}</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
