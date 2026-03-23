"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ProjectIndexItem } from "@/lib/projects";
import styles from "./projects.module.css";

function uniq<T>(items: T[]): T[] {
  return Array.from(new Set(items));
}

// Best available image per project slug
const PROJECT_IMAGES: Record<string, string> = {
  "ai-ad-agency":        "/projects/mvac/03-CampaignExsample.png",
  "ai-ad-film":          "/projects/kimuva/cafe-door-after.jpg",
  "ai-music-production": "/projects/kiaumu/mixing-mastering.jpg",
  "ai-news-dashboard":   "/projects/kiwebe/cover.jpeg",
  "ai-social-media":     "/projects/kisome/foggy_winter.png",
  "investigator-game":   "/projects/kicosp/slide-01.jpg",
  "sample-ai-workflow":  "/projects/kibild/HEAD-AND-SHOULDERS PORTRAIT.jpg",
  "vfx-showreel":        "/projects/mvac/VFXtitle.png",
};

export function ProjectsGrid({
  locale,
  projects,
}: {
  locale: string;
  projects: ProjectIndexItem[];
}) {
  const allTags = useMemo(
    () => uniq(projects.flatMap((p) => p.tags ?? [])).sort(),
    [projects]
  );

  const [tag, setTag] = useState<string>("");

  const filtered = useMemo(() => {
    if (!tag) return projects;
    return projects.filter((p) => (p.tags ?? []).includes(tag));
  }, [projects, tag]);

  return (
    <>
      <div className={styles.controls} aria-label="Project filters">
        <button
          type="button"
          className={`${styles.chip} ${!tag ? styles.chipActive : ""}`}
          onClick={() => setTag("")}
        >
          All
        </button>
        {allTags.map((t) => (
          <button
            key={t}
            type="button"
            className={`${styles.chip} ${tag === t ? styles.chipActive : ""}`}
            onClick={() => setTag(t)}
          >
            {t}
          </button>
        ))}
      </div>

      <div className={styles.grid}>
        {filtered.map((p) => {
          const imgSrc = PROJECT_IMAGES[p.slug];
          return (
            <Link
              key={`${p.locale}:${p.slug}`}
              href={`/${locale}/projects/${p.slug}`}
              className={styles.card}
            >
              {imgSrc ? (
                <img
                  src={imgSrc}
                  alt={p.title}
                  className={styles.cardImg}
                />
              ) : (
                <div className={styles.cardPlaceholder} />
              )}
              <div className={styles.cardOverlay} />

              <div className={styles.cardContent}>
                <div className={styles.meta}>
                  <span>{p.year ?? ""}</span>
                  <span>{p.tags?.slice(0, 2).join(" / ")}</span>
                </div>
                <h2 className={styles.cardTitle}>{p.title}</h2>
                {p.summary ? (
                  <p className={styles.summary}>{p.summary}</p>
                ) : null}
                {p.tags?.length ? (
                  <div className={styles.tags}>
                    {p.tags.map((t) => (
                      <span key={t} className={styles.tag}>
                        {t}
                      </span>
                    ))}
                  </div>
                ) : null}
                <div className={styles.readMore}>
                  Read more <ArrowRight size={14} strokeWidth={2} />
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
}
