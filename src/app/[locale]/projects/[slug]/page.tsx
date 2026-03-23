import { notFound } from "next/navigation";
import type { Locale } from "@/lib/i18n";
import { isLocale } from "@/lib/i18n";
import { getProjectSource } from "@/lib/projects";
import styles from "./projectPage.module.css";

import remarkGfm from "remark-gfm";
import { compileMDX } from "next-mdx-remote/rsc";
import ImageCarousel from "@/components/ImageCarousel";
import YouTubeEmbed from "@/components/YouTubeEmbed";

function MdxImg(props: React.ImgHTMLAttributes<HTMLImageElement>) {
  const { style, ...rest } = props;
  return (
    <img
      {...rest}
      style={{
        maxWidth: "100%",
        height: "auto",
        borderRadius: "8px",
        display: "block",
        ...style,
      }}
    />
  );
}

export default async function ProjectPage({
  params,
}: {
  params:
    | Promise<{ locale: string; slug: string }>
    | { locale: string; slug: string };
}) {
  const resolved = await Promise.resolve(params);
  const { locale, slug } = resolved;

  if (!isLocale(locale)) notFound();

  const project = await getProjectSource(slug, locale as Locale);
  if (!project) notFound();

  const compiled = await compileMDX({
    source: project.source,
    components: { ImageCarousel, YouTubeEmbed, img: MdxImg },
    options: {
      blockJS: false,
      mdxOptions: {
        remarkPlugins: [remarkGfm],
      },
    },
  });

  return (
    <main className={styles.page}>
      <div className="container">
        <div className={styles.top}>
          <div>
            <p className="kicker">Project</p>
            <h1 className={styles.title}>{project.frontmatter.title}</h1>
            <div className={styles.meta}>
              {project.frontmatter.year ? (
                <span>{project.frontmatter.year}</span>
              ) : null}
              {project.frontmatter.tags?.length ? (
                <span>{project.frontmatter.tags.join(" / ")}</span>
              ) : null}
            </div>
          </div>

          <div className={`card ${styles.mdx}`}>
            <p className={styles.summary}>
              {project.frontmatter.summary ||
                "A short overview of the work, process, and outcomes."}
            </p>
          </div>
        </div>

        <div className={styles.content}>
          <article className={`card ${styles.mdx}`}>{compiled.content}</article>
        </div>
      </div>
    </main>
  );
}
