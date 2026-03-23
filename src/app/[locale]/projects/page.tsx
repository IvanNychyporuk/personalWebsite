import type { Locale } from "@/lib/i18n";
import { isLocale } from "@/lib/i18n";
import { getAllProjects } from "@/lib/projects";
import styles from "./projects.module.css";
import { ProjectsGrid } from "./ProjectsGrid";

export default async function ProjectsIndexPage({
  params,
}: {
  params: Promise<{ locale: string }> | { locale: string };
}) {
  const resolved = await Promise.resolve(params);
  const locale = resolved.locale;

  if (!isLocale(locale)) return null;

  const projects = await getAllProjects(locale as Locale);

  return (
    <main className={styles.page}>
      <div className="container">
        <p className="kicker">Projects</p>
        <h1 className={styles.title}>One-page overviews</h1>
        <p className={styles.lead}>
          Short, scannable summaries. No downloads - each project stands on its
          own.
        </p>

        <ProjectsGrid locale={locale} projects={projects} />
      </div>
    </main>
  );
}
