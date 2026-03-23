import "server-only";

import fs from "node:fs/promises";
import path from "node:path";

import matter from "gray-matter";
import type { Locale } from "@/lib/i18n";

export type ProjectFrontmatter = {
  title: string;
  year?: number;
  tags?: string[];
  summary?: string;
};

export type ProjectIndexItem = ProjectFrontmatter & {
  slug: string;
  locale: Locale;
};

const PROJECTS_DIR = path.join(process.cwd(), "content", "projects");

function filenameForSlug(slug: string, locale: Locale) {
  return `${slug}.${locale}.mdx`;
}

export async function getAllProjects(locale: Locale): Promise<ProjectIndexItem[]> {
  let files: string[] = [];
  try {
    files = await fs.readdir(PROJECTS_DIR);
  } catch {
    return [];
  }

  const localeSuffix = `.${locale}.mdx`;

  const items = await Promise.all(
    files
      .filter((f) => f.endsWith(localeSuffix))
      .map(async (file) => {
        const slug = file.replace(localeSuffix, "");
        const fullPath = path.join(PROJECTS_DIR, file);
        const raw = await fs.readFile(fullPath, "utf8");
        const parsed = matter(raw);
        const data = (parsed.data ?? {}) as Partial<ProjectFrontmatter>;

        return {
          slug,
          locale,
          title: data.title ?? slug,
          year: typeof data.year === "number" ? data.year : undefined,
          tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
          summary: typeof data.summary === "string" ? data.summary : "",
        } satisfies ProjectIndexItem;
      })
  );

  items.sort((a, b) => (b.year ?? 0) - (a.year ?? 0));
  return items;
}

export async function getProjectSource(
  slug: string,
  locale: Locale
): Promise<{ source: string; frontmatter: ProjectFrontmatter } | null> {
  const fullPath = path.join(PROJECTS_DIR, filenameForSlug(slug, locale));

  try {
    const raw = await fs.readFile(fullPath, "utf8");
    const parsed = matter(raw);
    const data = (parsed.data ?? {}) as Partial<ProjectFrontmatter>;

    return {
      source: parsed.content,
      frontmatter: {
        title: data.title ?? slug,
        year: typeof data.year === "number" ? data.year : undefined,
        tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
        summary: typeof data.summary === "string" ? data.summary : "",
      },
    };
  } catch {
    return null;
  }
}
