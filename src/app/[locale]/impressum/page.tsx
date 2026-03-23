import type { Locale } from "@/lib/i18n";
import { isLocale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionaries";
import styles from "../content.module.css";
import Link from "next/link";

const PROVIDER_NAME = "Ivan Nychyporuk";
const ADDRESS_LINES = ["Zurmaiener Strasse 128", "54292 Trier", "Germany"];
const EMAIL = "nychyporuk.ivan.vfx@gmail.com";

function Content({ locale }: { locale: Locale }) {
  if (locale === "de") {
    return (
      <>
        <section className={`card ${styles.block}`}>
          <h2 className={styles.blockTitle}>Diensteanbieter</h2>
          <p className={styles.lead} style={{ marginTop: 0 }}>
            {PROVIDER_NAME}
            <br />
            {ADDRESS_LINES.map((l) => (
              <span key={l}>
                {l}
                <br />
              </span>
            ))}
          </p>
        </section>

        <section className={`card ${styles.block}`}>
          <h2 className={styles.blockTitle}>Kontakt</h2>
          <p className={styles.lead} style={{ marginTop: 0 }}>
            E-Mail: <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
          </p>
          <p className={styles.lead}>
            Kontaktformular: <Link href={`/${locale}/contact`}>Kontakt</Link>
          </p>
        </section>

        <section className={`card ${styles.block}`}>
          <h2 className={styles.blockTitle}>Verantwortlich fuer den Inhalt</h2>
          <p className={styles.lead} style={{ marginTop: 0 }}>
            Verantwortlich gemaess § 18 Abs. 2 MStV:
            <br />
            {PROVIDER_NAME}
            <br />
            {ADDRESS_LINES.join(", ")}
          </p>
        </section>

        <section className={`card ${styles.block}`}>
          <h2 className={styles.blockTitle}>Streitbeilegung</h2>
          <p className={styles.lead} style={{ marginTop: 0 }}>
            Die Europaeische Kommission stellt eine Plattform zur
            Online-Streitbeilegung (OS) bereit:
            <br />
            <a
              href="https://ec.europa.eu/consumers/odr/"
              target="_blank"
              rel="noreferrer"
            >
              https://ec.europa.eu/consumers/odr/
            </a>
          </p>
          <p className={styles.lead}>
            Ich bin nicht verpflichtet und nicht bereit, an
            Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle
            teilzunehmen.
          </p>
        </section>

        <section className={`card ${styles.block}`}>
          <h2 className={styles.blockTitle}>Haftung fuer Inhalte</h2>
          <p className={styles.lead} style={{ marginTop: 0 }}>
            Als Diensteanbieter bin ich gemaess den allgemeinen Gesetzen fuer
            eigene Inhalte auf diesen Seiten verantwortlich. Eine Verpflichtung
            zur Ueberwachung uebermittelter oder gespeicherter fremder
            Informationen besteht jedoch nicht.
          </p>
        </section>

        <section className={`card ${styles.block}`}>
          <h2 className={styles.blockTitle}>Haftung fuer Links</h2>
          <p className={styles.lead} style={{ marginTop: 0 }}>
            Diese Website kann Links zu externen Websites Dritter enthalten. Auf
            deren Inhalte habe ich keinen Einfluss. Deshalb kann ich fuer diese
            fremden Inhalte auch keine Gewaehr uebernehmen.
          </p>
        </section>

        <section className={`card ${styles.block}`}>
          <h2 className={styles.blockTitle}>Urheberrecht</h2>
          <p className={styles.lead} style={{ marginTop: 0 }}>
            Die Inhalte und Werke auf dieser Website unterliegen dem
            Urheberrecht. Eine Vervielfaeltigung, Bearbeitung, Verbreitung und
            jede Art der Verwertung ausserhalb der Grenzen des Urheberrechts
            beduerfen der schriftlichen Zustimmung.
          </p>
        </section>
      </>
    );
  }

  return (
    <>
      <section className={`card ${styles.block}`}>
        <h2 className={styles.blockTitle}>Provider</h2>
        <p className={styles.lead} style={{ marginTop: 0 }}>
          {PROVIDER_NAME}
          <br />
          {ADDRESS_LINES.map((l) => (
            <span key={l}>
              {l}
              <br />
            </span>
          ))}
        </p>
      </section>

      <section className={`card ${styles.block}`}>
        <h2 className={styles.blockTitle}>Contact</h2>
        <p className={styles.lead} style={{ marginTop: 0 }}>
          Email: <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
        </p>
        <p className={styles.lead}>
          Contact form: <Link href={`/${locale}/contact`}>Contact</Link>
        </p>
      </section>

      <section className={`card ${styles.block}`}>
        <h2 className={styles.blockTitle}>Responsible for content</h2>
        <p className={styles.lead} style={{ marginTop: 0 }}>
          Responsible pursuant to German media law (MStV):
          <br />
          {PROVIDER_NAME}, {ADDRESS_LINES.join(", ")}
        </p>
      </section>

      <section className={`card ${styles.block}`}>
        <h2 className={styles.blockTitle}>Dispute resolution</h2>
        <p className={styles.lead} style={{ marginTop: 0 }}>
          The European Commission provides a platform for online dispute
          resolution (ODR):
          <br />
          <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noreferrer">
            https://ec.europa.eu/consumers/odr/
          </a>
        </p>
        <p className={styles.lead}>
          I am not obliged and not willing to participate in dispute resolution
          proceedings before a consumer arbitration board.
        </p>
      </section>

      <section className={`card ${styles.block}`}>
        <h2 className={styles.blockTitle}>Liability</h2>
        <p className={styles.lead} style={{ marginTop: 0 }}>
          As a service provider, I am responsible for my own content on these
          pages under general laws. However, there is no obligation to monitor
          transmitted or stored third-party information.
        </p>
        <p className={styles.lead}>
          This website may contain links to external third-party websites. I
          have no influence on their content and therefore cannot assume any
          liability for those contents.
        </p>
      </section>

      <section className={`card ${styles.block}`}>
        <h2 className={styles.blockTitle}>Copyright</h2>
        <p className={styles.lead} style={{ marginTop: 0 }}>
          The content and works on this website are subject to copyright law.
          Any reproduction, editing, distribution, or exploitation beyond the
          limits of copyright law requires prior written consent.
        </p>
      </section>
    </>
  );
}

export default async function ImpressumPage({
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
          <p className="kicker">{dict.nav.impressum}</p>
          <h1 className={styles.title}>{dict.impressum.title}</h1>
          <p className={styles.lead}>
            {locale === "de"
              ? "Impressum fuer Websites, die in Deutschland betrieben werden."
              : "Legal notice (Impressum) for websites operated from Germany."}
          </p>
        </header>

        <Content locale={locale as Locale} />
      </div>
    </main>
  );
}
