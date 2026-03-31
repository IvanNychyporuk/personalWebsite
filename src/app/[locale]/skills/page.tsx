import type { Locale } from "@/lib/i18n";
import { isLocale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionaries";
import styles from "../content.module.css";

const AI_TOOLS = [
  "ChatGPT",
  "Claude Code/ Claude Cowork",
  "Antigravity / VS Code",
  "Google AI Studio / Google Veo / Nano Banana",
  "DALL-E",
  "Adobe Firefly",
  "Suno (AI music generation)",
  "ElevenLabs (AI voice & voice-over)",
  "Cloudflare Workers (serverless AI proxy)",
  "Unity (AI-assisted game prototyping)",
];

const AI_SKILLS_EN = [
  "Prompt engineering — text, image, video, audio",
  "AI agent system design and orchestration",
  "AI workflow automation and pipeline design",
  "Storyboard and content creation with AI tools",
  "AI audio & music production pipeline",
  "Social media content strategy with AI",
  "Serverless architecture for AI applications",
  "Game prototyping with AI-generated assets",
];

const AI_SKILLS_DE = [
  "Prompt Engineering — Text, Bild, Video, Audio",
  "KI-Agentensysteme — Konzeption und Steuerung",
  "KI-Workflow-Automatisierung und Pipeline-Design",
  "Storyboard- und Contenterstellung mit KI-Tools",
  "KI-Audio- & Musikproduktions-Pipeline",
  "Social-Media-Contentstrategie mit KI",
  "Serverlose Architektur für KI-Anwendungen",
  "Game-Prototyping mit KI-generierten Assets",
];

const VFX_TOOLS_EN = [
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

const VFX_TOOLS_DE = [
  "Foundry Nuke",
  "Blackmagic Fusion",
  "Adobe Photoshop",
  "Krita (KI-Bildgenerierungs-Toolkit)",
  "Mocha Pro",
  "Maya",
  "3D Equalizer",
  "After Effects (Grundkenntnisse)",
  "DaVinci Resolve (Grundkenntnisse)",
];

const VFX_TECHNIQUES_EN = [
  "Keying (green/blue screen)",
  "2D & 3D tracking",
  "Rotoscoping & clean-up",
  "Color matching and look development",
  "Pipeline coordination and handoffs",
  "Storytelling and visual dramaturgy",
];

const VFX_TECHNIQUES_DE = [
  "Keying (Green-/Bluescreen)",
  "2D- & 3D-Tracking",
  "Rotoscoping & Clean-up",
  "Farbabgleich und Look Development",
  "Pipeline-Koordination und Übergaben",
  "Storytelling und visuelle Dramaturgie",
];

const LANGUAGES_EN = [
  "English (B2)",
  "German (B1, improving)",
  "Ukrainian (native)",
  "Russian (native)",
];

const LANGUAGES_DE = [
  "Ukrainisch (Muttersprache)",
  "Russisch (Muttersprache)",
  "Englisch (B2)",
  "Deutsch (B1, in Verbesserung)",
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
  const de = locale === "de";

  const aiSkills = de ? AI_SKILLS_DE : AI_SKILLS_EN;
  const vfxTools = de ? VFX_TOOLS_DE : VFX_TOOLS_EN;
  const vfxTechniques = de ? VFX_TECHNIQUES_DE : VFX_TECHNIQUES_EN;
  const languages = de ? LANGUAGES_DE : LANGUAGES_EN;

  return (
    <main className={styles.page}>
      <div className="container">
        <header className={styles.header}>
          <p className="kicker">{dict.nav.skills}</p>
          <h1 className={styles.title}>{de ? "Fähigkeiten" : "Skills"}</h1>
          <p className={styles.lead}>
            {de
              ? "Ein in VFX verwurzeltes Skill-Set mit starkem Fokus auf KI-gestützte Medienproduktion, Content-Workflows und agentenbasierte Automatisierung."
              : "A VFX-rooted toolkit with a strong focus on AI-powered media creation, content workflows, and agent-based automation."}
          </p>
        </header>

        <div className={styles.twoCol}>
          <section className={`card ${styles.block}`}>
            <h2 className={styles.blockTitle}>KI-Tools</h2>
            <ul className={styles.list}>
              {AI_TOOLS.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </section>
          <section className={`card ${styles.block}`}>
            <h2 className={styles.blockTitle}>{de ? "KI-Kompetenzen" : "AI Skills"}</h2>
            <ul className={styles.list}>
              {aiSkills.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </section>
        </div>

        <div className={styles.twoCol} style={{ marginTop: '14px' }}>
          <section className={`card ${styles.block}`}>
            <h2 className={styles.blockTitle}>{de ? "Grafik-, Video- und VFX-Tools" : "Graphics, Video and VFX Tools"}</h2>
            <ul className={styles.list}>
              {vfxTools.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </section>
          <section className={`card ${styles.block}`}>
            <h2 className={styles.blockTitle}>{de ? "Produktionstechniken" : "Production Techniques"}</h2>
            <ul className={styles.list}>
              {vfxTechniques.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </section>
        </div>

        <div className={styles.grid} style={{ marginTop: '14px' }}>
          <section className={`card ${styles.block}`}>
            <h2 className={styles.blockTitle}>{de ? "Sprachen" : "Languages"}</h2>
            <ul className={styles.list}>
              {languages.map((l) => (
                <li key={l}>{l}</li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </main>
  );
}
