import type { Locale } from "@/lib/i18n";
import { isLocale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionaries";
import styles from "./aiAssistant.module.css";

export default async function AiAssistantPage({
  params,
}: {
  params: Promise<{ locale: string }> | { locale: string };
}) {
  const resolved = await Promise.resolve(params);
  const locale = resolved.locale;
  if (!isLocale(locale)) return null;
  const dict = await getDictionary(locale as Locale);

  return (
    <main className={styles.wrap}>
      <div className="container">
        <p className="kicker">{dict.nav.aiAssistant}</p>
        <p className={styles.lead}>{dict.aiAssistant.lead}</p>
        <div className={styles.frame}>
          <iframe
            src="/chatbot/index.html"
            className={styles.iframe}
            title="AI Assistant"
            allow="autoplay"
          />
        </div>
      </div>
    </main>
  );
}
