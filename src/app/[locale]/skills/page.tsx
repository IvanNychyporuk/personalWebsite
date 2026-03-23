import type { Locale } from "@/lib/i18n";
import { isLocale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionaries";
import styles from "../content.module.css";

const AI_TOOLS = [
  "ChatGPT",
  "Claude / Claude Code",
  "Google AI Studio",
  "DALL-E",
  "Adobe Firefly",
  "Suno (AI music generation)",
  "ElevenLabs (AI voice & voice-over)",
  "Sonoteller.ai (track analysis)",
  "FADR (stem separation)",
  "Cloudflare Workers (serverless AI proxy)",
  "Unity (AI-assisted game prototyping)",
];

const AI_SKILLS = [
  "Prompt engineering — text, image, video, audio",
  "AI agent system design and orchestration",
  "AI workflow automation and pipeline design",
  "Storyboard and content creation with AI tools",
  "AI audio & music production pipeline",
  "Social media content strategy with AI",
  "Serverless architecture for AI applications",
  "Game prototyping with AI-generated assets",
];

const VFX_TOOLS = [
  "Foundry Nuke",
  "Blackmagic Fusion",
  "Adobe Photoshop",
  "Krita (AI image generation toolkit)",
  "Mocha Pro",
  "Maya",
  "3D Equalizer",
  "After Effects (basic)",
  "DaVinci Resolve (basic)",
];

const VFX_TECHNIQUES = [
  "Keying (green/blue screen)",
  "2D & 3D tracking",
  "Rotoscoping & clean-up",
  "Color matching and look development",
  "Pipeline coordination and handoffs",
  "Storytelling and visual dramaturgy",
];

const LANGUAGES = [
  "Ukrainian (native)",
  "Russian (native)",
  "English (B2)",
  "German (B1, improving)",
];

export default async function SkillsPage({
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
          <p className="kicker">{dict.nav.skills}</p>
          <h1 className={styles.title}>Skills</h1>
          <p className={styles.lead}>
            A VFX-rooted toolkit with a strong focus on AI-powered media
            creation, content workflows, and agent-based automation.
          </p>
        </header>

        <div className={styles.twoCol}>
          <section className={`card ${styles.block}`}>
            <h2 className={styles.blockTitle}>AI Tools</h2>
            <ul className={styles.list}>
              {AI_TOOLS.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </section>
          <section className={`card ${styles.block}`}>
            <h2 className={styles.blockTitle}>AI Skills</h2>
            <ul className={styles.list}>
              {AI_SKILLS.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </section>
        </div>

        <div className={styles.twoCol} style={{ marginTop: '14px' }}>
          <section className={`card ${styles.block}`}>
            <h2 className={styles.blockTitle}>Graphics, Video and VFX Tools</h2>
            <ul className={styles.list}>
              {VFX_TOOLS.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </section>
          <section className={`card ${styles.block}`}>
            <h2 className={styles.blockTitle}>Production Techniques</h2>
            <ul className={styles.list}>
              {VFX_TECHNIQUES.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </section>
        </div>

        <div className={styles.grid} style={{ marginTop: '14px' }}>
          <section className={`card ${styles.block}`}>
            <h2 className={styles.blockTitle}>Languages</h2>
            <ul className={styles.list}>
              {LANGUAGES.map((l) => (
                <li key={l}>{l}</li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </main>
  );
}
