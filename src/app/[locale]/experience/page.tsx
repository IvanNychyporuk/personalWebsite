import type { Locale } from "@/lib/i18n";
import { isLocale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionaries";
import styles from "../content.module.css";
import expStyles from "./experience.module.css";

type TimelineItem = {
  dates: string;
  title: string;
  place: string;
  type: "role" | "training" | "language" | "degree";
  bullets: string[];
};

const TIMELINE_EN: TimelineItem[] = [
  {
    dates: "09/2025 – 03/2026",
    title: "KI Medien- und Content Gestalter (AI Media & Content Designer)",
    place: "WBS Training, Trier (Germany)",
    type: "training",
    bullets: [
      "Full-time certified program covering AI-powered media production and content design.",
      "Curriculum: AI project conception & development, AI in media development, AI text creation, AI image & video editing, audio & music production with AI, social media marketing, web development, computer animation, project management, AI ethics and legal aspects.",
      "Hands-on work with tools including ChatGPT, DALL-E, Claude Code, Adobe CC, Figma, and AI workflow automation.",
    ],
  },
  {
    dates: "04/2025 – present",
    title: "Adobe Photoshop (advanced)",
    place: "Udemy (online)",
    type: "training",
    bullets: ["Advanced compositing, retouching, and print/digital design workflows."],
  },
  {
    dates: "08/2024 – 03/2025",
    title: "German language qualification",
    place: "Burgerservice, Trier",
    type: "language",
    bullets: ["Completed B1."],
  },
  {
    dates: "05/2023 – 06/2024",
    title: "Nuke Compositing Artist (remote)",
    place: "UPP Postproduction Studio (Prague, Czech Republic)",
    type: "role",
    bullets: [
      "Optimized and enhanced live-action footage for final delivery.",
      "Digital clean-up, retouching, and beauty work.",
      "Green/blue screen replacement with photoreal backgrounds.",
      "Integrated VFX elements (smoke, fire, explosions) and 3D assets.",
      "Collaboration with VFX supervisors and production teams; feedback iterations and QC.",
      "Credits include streaming releases (e.g., Gran Turismo (2023), Carry On (2024)).",
    ],
  },
  {
    dates: "05/2022 – 04/2023",
    title: "Fusion Compositing Artist (hybrid)",
    place: "LuxDigital Studio (Kehlen, Luxembourg)",
    type: "role",
    bullets: [
      "Clean-up, retouching, and digital make-up.",
      "Keying and background replacement with color/light matching.",
      "3D element integration with precise look continuity.",
      "Estimated work effort and supported multi-step approval workflows.",
    ],
  },
  {
    dates: "05/2018 – 02/2022",
    title: "Compositing Artist (full-time)",
    place: "Postmodern Digital (Kyiv, Ukraine)",
    type: "role",
    bullets: [
      "Visual effects for film and TV within established pipelines.",
      "Worked across international teams (China, Russia, Europe).",
      "Projects include: The Wandering Earth, Robot 2.0, Pulse, Cosmoball.",
    ],
  },
  {
    dates: "09/2017 – 02/2022",
    title: "Freelance Compositing Artist (advertising + TV)",
    place: "Kyiv, Ukraine",
    type: "role",
    bullets: [
      "Commercial VFX, animated overlays, look development.",
      "Campaigns for brands including Coca-Cola, Milka, Auchan, Roshen, Vodafone.",
    ],
  },
  {
    dates: "04/2009 – 07/2018",
    title: "Director of Photography / Camera Operator",
    place: "Ukraine",
    type: "role",
    bullets: [
      "Music videos, documentaries, and TV productions.",
      "Bridge between directing and postproduction for consistent visual storytelling.",
    ],
  },
  {
    dates: "09/2001 – 02/2007",
    title: "Electrical Engineering (Dipl.-Ing.)",
    place: "Technical University of Kyiv (Ukraine)",
    type: "degree",
    bullets: ["Diploma engineer degree (comparable to a German master level)."],
  },
];

const TIMELINE_DE: TimelineItem[] = [
  {
    dates: "09/2025 – 03/2026",
    title: "KI Medien- und Content Gestalter (AI Media & Content Designer)",
    place: "WBS Training, Trier (Deutschland)",
    type: "training",
    bullets: [
      "Vollzeit-Zertifizierungsprogramm für KI-gestützte Medienproduktion und Contentgestaltung.",
      "Lehrplan: KI-Projektkonzeption & -entwicklung, KI in der Medienentwicklung, KI-Texterstellung, KI-Bild- & Videobearbeitung, Audio- & Musikproduktion mit KI, Social-Media-Marketing, Webentwicklung, Computeranimation, Projektmanagement, KI-Ethik und rechtliche Aspekte.",
      "Praxis mit Tools wie ChatGPT, DALL-E, Claude Code, Adobe CC, Figma und KI-Workflow-Automatisierung.",
    ],
  },
  {
    dates: "04/2025 – heute",
    title: "Adobe Photoshop (fortgeschritten)",
    place: "Udemy (online)",
    type: "training",
    bullets: ["Fortgeschrittenes Compositing, Retusche und Workflows für Print-/Digitaldesign."],
  },
  {
    dates: "08/2024 – 03/2025",
    title: "Deutschsprachliche Qualifikation",
    place: "Burgerservice, Trier",
    type: "language",
    bullets: ["Abschluss B1."],
  },
  {
    dates: "05/2023 – 06/2024",
    title: "Nuke Compositing Artist (remote)",
    place: "UPP Postproduction Studio (Prag, Tschechische Republik)",
    type: "role",
    bullets: [
      "Optimierung und Veredelung von Live-Action-Material für die finale Auslieferung.",
      "Digitales Clean-up, Retusche und Beauty-Bearbeitung.",
      "Green/Blue-Screen-Replacement mit fotorealistischen Hintergründen.",
      "Integration von VFX-Elementen (Rauch, Feuer, Explosionen) und 3D-Assets.",
      "Zusammenarbeit mit VFX-Supervisors und Produktionsteams; Feedback-Iterationen und Qualitätskontrolle.",
      "Credits u. a.: Gran Turismo (2023), Carry On (2024) (Streaming-Releases).",
    ],
  },
  {
    dates: "05/2022 – 04/2023",
    title: "Fusion Compositing Artist (hybrid)",
    place: "LuxDigital Studio (Kehlen, Luxemburg)",
    type: "role",
    bullets: [
      "Clean-up, Retusche und digitales Make-up.",
      "Keying und Hintergrundersatz mit Farb- und Lichtabstimmung.",
      "Integration von 3D-Elementen mit präziser Look-Kontinuität.",
      "Arbeitsaufwandschätzungen und Unterstützung mehrstufiger Abnahmeprozesse.",
    ],
  },
  {
    dates: "05/2018 – 02/2022",
    title: "Compositing Artist (Vollzeit)",
    place: "Postmodern Digital (Kiew, Ukraine)",
    type: "role",
    bullets: [
      "Visual Effects für Film und TV innerhalb etablierter Pipelines.",
      "Zusammenarbeit mit internationalen Teams (China, Russland, Europa).",
      "Projekte: The Wandering Earth, Robot 2.0, Pulse, Cosmoball.",
    ],
  },
  {
    dates: "09/2017 – 02/2022",
    title: "Freelance Compositing Artist (Werbung + TV)",
    place: "Kiew, Ukraine",
    type: "role",
    bullets: [
      "Werbe-VFX, animierte Overlays, Look Development.",
      "Kampagnen für Marken wie Coca-Cola, Milka, Auchan, Roshen, Vodafone.",
    ],
  },
  {
    dates: "04/2009 – 07/2018",
    title: "Director of Photography / Kameramann",
    place: "Ukraine",
    type: "role",
    bullets: [
      "Musikvideos, Dokumentarfilme und TV-Produktionen.",
      "Bindeglied zwischen Regie und Postproduktion für konsistentes visuelles Storytelling.",
    ],
  },
  {
    dates: "09/2001 – 02/2007",
    title: "Elektrotechnik (Dipl.-Ing.)",
    place: "Technische Universität Kiew (Ukraine)",
    type: "degree",
    bullets: ["Diplomingenieur-Abschluss (vergleichbar mit einem deutschen Masterabschluss)."],
  },
];

const TYPE_LABEL: Record<string, Record<TimelineItem["type"], string>> = {
  en: { role: "Role", training: "Training", language: "Language", degree: "Degree" },
  de: { role: "Position", training: "Weiterbildung", language: "Sprachkurs", degree: "Studium" },
};

export default async function ExperiencePage({
  params,
}: {
  params: Promise<{ locale: string }> | { locale: string };
}) {
  const resolved = await Promise.resolve(params);
  const locale = resolved.locale;
  if (!isLocale(locale)) return null;
  const dict = await getDictionary(locale as Locale);

  const timeline = locale === "de" ? TIMELINE_DE : TIMELINE_EN;
  const labels = TYPE_LABEL[locale] ?? TYPE_LABEL.en;

  const title = locale === "de" ? "Erfahrung" : "Experience";
  const lead =
    locale === "de"
      ? "15+ Jahre in VFX-Compositing, Werbung und Kinematografie. Jetzt fokussiert auf KI-Medien, Contentgestaltung und Workflow-Integration."
      : "15+ years across VFX compositing, advertising, and cinematography. Now focused on AI media, content design, and workflow integration.";

  return (
    <main className={styles.page}>
      <div className="container">
        <header className={styles.header}>
          <p className="kicker">{dict.nav.experience}</p>
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.lead}>{lead}</p>
        </header>

        <div className={styles.grid}>
          <section className={`card ${styles.block}`}>
            <ol className={expStyles.timeline}>
              {timeline.map((item) => (
                <li key={`${item.dates}:${item.title}`} className={expStyles.entry}>
                  <span className={`${expStyles.badge} ${expStyles[item.type]}`}>
                    {labels[item.type]}
                  </span>
                  <div className={expStyles.meta}>
                    <strong className={expStyles.dates}>{item.dates}</strong>
                    <span className={expStyles.title}>{item.title}</span>
                    <span className={expStyles.place}>{item.place}</span>
                  </div>
                  <ul className={styles.list}>
                    {item.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ol>
          </section>
        </div>
      </div>
    </main>
  );
}
