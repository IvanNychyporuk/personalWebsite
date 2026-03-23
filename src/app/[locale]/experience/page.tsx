import type { Locale } from "@/lib/i18n";
import { isLocale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionaries";
import styles from "../content.module.css";
import expStyles from "./experience.module.css";

type TimelineItem = {
  dates: string;
  title: string;
  place: string;
  type: "role" | "education" | "training";
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
    type: "education",
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
    type: "education",
    bullets: ["Diploma engineer degree (comparable to a German master level)."],
  },
];

const TYPE_LABEL: Record<TimelineItem["type"], string> = {
  role: "Role",
  education: "Education",
  training: "Training",
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

  const timeline = locale === "en" ? TIMELINE_EN : [];

  return (
    <main className={styles.page}>
      <div className="container">
        <header className={styles.header}>
          <p className="kicker">{dict.nav.experience}</p>
          <h1 className={styles.title}>Experience</h1>
          <p className={styles.lead}>
            15+ years across VFX compositing, advertising, and cinematography.
            Now focused on AI media, content design, and workflow integration.
          </p>
        </header>

        <div className={styles.grid}>
          <section className={`card ${styles.block}`}>
            <ol className={expStyles.timeline}>
              {timeline.map((item) => (
                <li key={`${item.dates}:${item.title}`} className={expStyles.entry}>
                  <span className={`${expStyles.badge} ${expStyles[item.type]}`}>
                    {TYPE_LABEL[item.type]}
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
