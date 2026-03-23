import type { Locale } from "@/lib/i18n";
import { isLocale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionaries";
import styles from "../content.module.css";
import { ContactForm } from "@/components/ContactForm";

const EMAIL = "nychyporuk.ivan.vfx@gmail.com";
const LINKEDIN = "https://www.linkedin.com/in/ivan-nychyporuk-41233488/";

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }> | { locale: string };
}) {
  const resolved = await Promise.resolve(params);
  const locale = resolved.locale;
  if (!isLocale(locale)) return null;
  const dict = await getDictionary(locale as Locale);

  return (
    <main className={styles.page}>
      <div className="container">
        <header className={styles.header}>
          <p className="kicker">{dict.nav.contact}</p>
          <h1 className={styles.title}>{dict.contact.title}</h1>
          <p className={styles.lead}>{dict.contact.lead}</p>
        </header>

        <div className={styles.twoCol}>
          <section className={`card ${styles.block}`}>
            <h2 className={styles.blockTitle}>Email</h2>
            <p className={styles.lead} style={{ marginTop: 0 }}>
              <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
            </p>
            <p className={styles.lead}>
              Include a short brief, timeline, and any references. If this is a
              role inquiry, please share the job description.
            </p>
          </section>

          <section className={`card ${styles.block}`}>
            <h2 className={styles.blockTitle}>LinkedIn</h2>
            <p className={styles.lead} style={{ marginTop: 0 }}>
              <a href={LINKEDIN} target="_blank" rel="noreferrer">
                {LINKEDIN}
              </a>
            </p>
            <p className={styles.lead}>
              If you message me there, please add context so I can respond
              quickly.
            </p>
          </section>
        </div>

        <div className={styles.grid}>
          <section className={`card ${styles.block}`}>
            <h2 className={styles.blockTitle}>Contact form</h2>
            <ContactForm />
          </section>
        </div>
      </div>
    </main>
  );
}
