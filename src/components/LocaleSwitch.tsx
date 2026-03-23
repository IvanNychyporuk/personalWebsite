"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "@/lib/i18n";
import { LOCALES } from "@/lib/i18n";
import styles from "./LocaleSwitch.module.css";

function swapLocale(pathname: string, nextLocale: Locale): string {
  const parts = pathname.split("/");
  if (parts.length < 2) return `/${nextLocale}`;
  parts[1] = nextLocale;
  return parts.join("/") || `/${nextLocale}`;
}

export function LocaleSwitch({ locale }: { locale: Locale }) {
  const pathname = usePathname() || `/${locale}`;

  return (
    <div className={styles.wrap} aria-label="Language">
      {LOCALES.map((l) => (
        <Link
          key={l}
          href={swapLocale(pathname, l)}
          className={`${styles.link} ${l === locale ? styles.active : ""}`}
        >
          {l.toUpperCase()}
        </Link>
      ))}
    </div>
  );
}
