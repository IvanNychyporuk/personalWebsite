import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import { isLocale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionaries";
import styles from "./site.module.css";
import { HeroBanner } from "@/components/HeroBanner";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }> | { locale: string };
}) {
  const resolved = await Promise.resolve(params);
  const locale = resolved.locale;

  if (!isLocale(locale)) {
    return null;
  }

  const dict = await getDictionary(locale as Locale);

  return (
    <main className={styles.main}>
      <HeroBanner locale={locale as Locale} dict={dict} />

      <div className="container">
        <section className={styles.afterHero}>
          <div className={`card ${styles.item} reveal`} style={{ "--d": "60ms" } as never}>
            <p className="kicker">{dict.home.profileKicker}</p>
            <h2 className={styles.sectionTitle} style={{ marginTop: 6 }}>
              {dict.home.profileTitle}
            </h2>
            <p className={styles.itemBody}>{dict.home.profileBody}</p>
            <div style={{ marginTop: 12, display: "flex", gap: 12, flexWrap: "wrap" }}>
              <Link className="button buttonPrimary" href={`/${locale}/projects`}>
                {dict.home.heroCtaPrimary}
              </Link>
              <Link className="button" href={`/${locale}/contact`}>
                {dict.home.heroCtaSecondary}
              </Link>
            </div>
          </div>
        </section>

        {/* Highlights */}
        <section className={styles.section}>
          <p className="kicker">{dict.home.highlightsKicker}</p>
          <h2 className={styles.sectionTitle}>{dict.home.highlightsTitle}</h2>
          <div className={styles.grid}>
            <div className={`card ${styles.item} reveal`} style={{ "--d": "80ms" } as never}>
              <span className={styles.badge} style={{ background: "#F5DFB0", color: "#5A3000" }}>
                {dict.home.highlight1Badge}
              </span>
              <h3 className={styles.itemTitle}>{dict.home.highlight1Title}</h3>
              <p className={styles.itemBody}>{dict.home.highlight1Body}</p>
            </div>
            <div className={`card ${styles.item} reveal`} style={{ "--d": "140ms" } as never}>
              <span className={styles.badge} style={{ background: "#CCD8BC", color: "#283A10" }}>
                {dict.home.highlight2Badge}
              </span>
              <h3 className={styles.itemTitle}>{dict.home.highlight2Title}</h3>
              <p className={styles.itemBody}>{dict.home.highlight2Body}</p>
            </div>
            <div className={`card ${styles.item} reveal`} style={{ "--d": "200ms" } as never}>
              <span className={styles.badge} style={{ background: "#BEC8D5", color: "#102038" }}>
                {dict.home.highlight3Badge}
              </span>
              <h3 className={styles.itemTitle}>{dict.home.highlight3Title}</h3>
              <p className={styles.itemBody}>{dict.home.highlight3Body}</p>
            </div>
          </div>
        </section>

        {/* What I do */}
        <section className={styles.section}>
          <p className="kicker">{dict.home.capabilitiesKicker}</p>
          <h2 className={styles.sectionTitle}>{dict.home.capabilitiesTitle}</h2>
          <div className={styles.grid}>
            <div className={`card ${styles.item} reveal`} style={{ "--d": "80ms" } as never}>
              <div className={styles.bar} style={{ background: "#D4903A" }} />
              <h3 className={styles.itemTitle}>{dict.home.cap1Title}</h3>
              <p className={styles.itemBody}>{dict.home.cap1Body}</p>
            </div>
            <div className={`card ${styles.item} reveal`} style={{ "--d": "140ms" } as never}>
              <div className={styles.bar} style={{ background: "#8CAA78" }} />
              <h3 className={styles.itemTitle}>{dict.home.cap2Title}</h3>
              <p className={styles.itemBody}>{dict.home.cap2Body}</p>
            </div>
            <div className={`card ${styles.item} reveal`} style={{ "--d": "200ms" } as never}>
              <div className={styles.bar} style={{ background: "#7898AA" }} />
              <h3 className={styles.itemTitle}>{dict.home.cap3Title}</h3>
              <p className={styles.itemBody}>{dict.home.cap3Body}</p>
            </div>
          </div>
        </section>

        {/* Process */}
        <section className={styles.section}>
          <p className="kicker">{dict.home.processKicker}</p>
          <h2 className={styles.sectionTitle}>{dict.home.processTitle}</h2>
          <div className={styles.process}>
            <div className={`card ${styles.step} reveal`} style={{ "--d": "60ms" } as never}>
              <div className={styles.dot} style={{ background: "#F5DFB0", color: "#5A3000" }}>01</div>
              <h3 className={styles.stepTitle}>{dict.home.step1Title}</h3>
              <p className={styles.stepBody}>{dict.home.step1Body}</p>
            </div>
            <div className={`card ${styles.step} reveal`} style={{ "--d": "110ms" } as never}>
              <div className={styles.dot} style={{ background: "#CCD8BC", color: "#283A10" }}>02</div>
              <h3 className={styles.stepTitle}>{dict.home.step2Title}</h3>
              <p className={styles.stepBody}>{dict.home.step2Body}</p>
            </div>
            <div className={`card ${styles.step} reveal`} style={{ "--d": "160ms" } as never}>
              <div className={styles.dot} style={{ background: "#BEC8D5", color: "#102038" }}>03</div>
              <h3 className={styles.stepTitle}>{dict.home.step3Title}</h3>
              <p className={styles.stepBody}>{dict.home.step3Body}</p>
            </div>
            <div className={`card ${styles.step} reveal`} style={{ "--d": "210ms" } as never}>
              <div className={styles.dot} style={{ background: "#EDD8B0", color: "#483000" }}>04</div>
              <h3 className={styles.stepTitle}>{dict.home.step4Title}</h3>
              <p className={styles.stepBody}>{dict.home.step4Body}</p>
            </div>
            <div className={`card ${styles.step} reveal`} style={{ "--d": "260ms" } as never}>
              <div className={styles.dot} style={{ background: "#D8D0B8", color: "#302800" }}>05</div>
              <h3 className={styles.stepTitle}>{dict.home.step5Title}</h3>
              <p className={styles.stepBody}>{dict.home.step5Body}</p>
            </div>
          </div>
        </section>
      </div>

      <div className={styles.contactBand}>
        <div className="container">
          <section className={styles.contactSection}>
            <p className="kicker">{dict.home.contactKicker}</p>
            <h2 className={styles.sectionTitle}>{dict.home.contactTitle}</h2>
            <div className={`card ${styles.item} reveal`} style={{ "--d": "80ms" } as never}>
              <p className={styles.itemBody} style={{ marginBottom: 12 }}>
                {dict.home.contactBody}
              </p>
              <Link className="button buttonPrimary" href={`/${locale}/contact`}>
                {dict.nav.contact}
              </Link>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
