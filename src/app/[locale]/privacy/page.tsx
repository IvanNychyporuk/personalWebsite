import type { Locale } from "@/lib/i18n";
import { isLocale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionaries";
import styles from "../content.module.css";

export default async function PrivacyPage({
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
          <p className="kicker">{dict.privacy.title}</p>
          <h1 className={styles.title}>{dict.privacy.title}</h1>
          <p className={styles.lead}>{dict.privacy.placeholder}</p>
        </header>

        <section className={`card ${styles.block}`}>
          <h2 className={styles.blockTitle}>Placeholder</h2>
          <ul className={styles.list}>
            <li>Data processing overview</li>
            <li>Hosting/provider details</li>
            <li>Cookies and analytics (if added)</li>
            <li>Contact form/chatbot privacy notes (once implemented)</li>
          </ul>
        </section>
      </div>
    </main>
  );
}
