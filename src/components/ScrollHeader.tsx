"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import styles from "./SiteHeader.module.css";

export function ScrollHeader({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Home page is /{locale} — the video hero is only there
  const isHome = /^\/[a-z]{2}\/?$/.test(pathname);

  const [scrolled, setScrolled] = useState(!isHome);

  useEffect(() => {
    if (!isHome) {
      setScrolled(true);
      return;
    }

    function check() {
      setScrolled(window.scrollY > window.innerHeight * 0.8);
    }

    check();
    window.addEventListener("scroll", check, { passive: true });
    return () => window.removeEventListener("scroll", check);
  }, [isHome]);

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}>
      {children}
    </header>
  );
}
