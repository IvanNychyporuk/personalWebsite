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
            <p className="kicker">Profile</p>
            <h2 className={styles.sectionTitle} style={{ marginTop: 6 }}>
              AI Media / Content Creator / VFX Digital Compositor / AI Integration Consultant
            </h2>
            <p className={styles.itemBody}>
              15+ years of compositing craft in film and advertising, now applied
              to modern, AI-assisted content workflows.
            </p>
            <div style={{ marginTop: 12, display: "flex", gap: 12, flexWrap: "wrap" }}>
              <Link className="button buttonPrimary" href={`/${locale}/projects`}>
                View projects
              </Link>
              <Link className="button" href={`/${locale}/contact`}>
                Contact
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
                Film + advertising
              </span>
              <h3 className={styles.itemTitle}>15+ years in film + advertising</h3>
              <p className={styles.itemBody}>
                VFX compositing and postproduction across international teams,
                with a strong eye for composition, color, and typography.
              </p>
            </div>
            <div className={`card ${styles.item} reveal`} style={{ "--d": "140ms" } as never}>
              <span className={styles.badge} style={{ background: "#CCD8BC", color: "#283A10" }}>
                Streaming
              </span>
              <h3 className={styles.itemTitle}>Streaming-grade work</h3>
              <p className={styles.itemBody}>
                Experience on productions including Netflix releases (credits
                available on request).
              </p>
            </div>
            <div className={`card ${styles.item} reveal`} style={{ "--d": "200ms" } as never}>
              <span className={styles.badge} style={{ background: "#BEC8D5", color: "#102038" }}>
                AI-native
              </span>
              <h3 className={styles.itemTitle}>Now: AI media + content systems</h3>
              <p className={styles.itemBody}>
                Training and practice in AI-assisted text, image, video, audio,
                and web workflows — with human direction and quality control.
              </p>
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
              <h3 className={styles.itemTitle}>AI content production</h3>
              <p className={styles.itemBody}>
                Short-form video, visuals, and copy — from idea to output,
                optimized for speed, consistency, and brand tone.
              </p>
            </div>
            <div className={`card ${styles.item} reveal`} style={{ "--d": "140ms" } as never}>
              <div className={styles.bar} style={{ background: "#8CAA78" }} />
              <h3 className={styles.itemTitle}>AI integration consulting</h3>
              <p className={styles.itemBody}>
                Workflow design, prompt libraries, QA standards, and tool
                selection that fit real teams and real deadlines.
              </p>
            </div>
            <div className={`card ${styles.item} reveal`} style={{ "--d": "200ms" } as never}>
              <div className={styles.bar} style={{ background: "#7898AA" }} />
              <h3 className={styles.itemTitle}>Visual craft (VFX-rooted)</h3>
              <p className={styles.itemBody}>
                Retouching, compositing, look development, and detail-level
                polish to keep output believable and coherent.
              </p>
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
              <h3 className={styles.stepTitle}>Brief</h3>
              <p className={styles.stepBody}>Goals, audience, constraints, brand references.</p>
            </div>
            <div className={`card ${styles.step} reveal`} style={{ "--d": "110ms" } as never}>
              <div className={styles.dot} style={{ background: "#CCD8BC", color: "#283A10" }}>02</div>
              <h3 className={styles.stepTitle}>Concept</h3>
              <p className={styles.stepBody}>Narrative, storyboard, and prompts — aligned to tone.</p>
            </div>
            <div className={`card ${styles.step} reveal`} style={{ "--d": "160ms" } as never}>
              <div className={styles.dot} style={{ background: "#BEC8D5", color: "#102038" }}>03</div>
              <h3 className={styles.stepTitle}>Production</h3>
              <p className={styles.stepBody}>Generate, edit, and iterate with tight version control.</p>
            </div>
            <div className={`card ${styles.step} reveal`} style={{ "--d": "210ms" } as never}>
              <div className={styles.dot} style={{ background: "#EDD8B0", color: "#483000" }}>04</div>
              <h3 className={styles.stepTitle}>QA</h3>
              <p className={styles.stepBody}>Visual checks, consistency, compliance, and polish.</p>
            </div>
            <div className={`card ${styles.step} reveal`} style={{ "--d": "260ms" } as never}>
              <div className={styles.dot} style={{ background: "#D8D0B8", color: "#302800" }}>05</div>
              <h3 className={styles.stepTitle}>Delivery</h3>
              <p className={styles.stepBody}>Final exports + guidelines so the system keeps working.</p>
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
                Email is best for work opportunities and collaborations.
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
