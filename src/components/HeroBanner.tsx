"use client";

import { useEffect, useRef } from "react";
import type { Locale } from "@/lib/i18n";
import type { Dictionary } from "@/lib/dictionaries";
import styles from "./HeroBanner.module.css";

export function HeroBanner({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (window.matchMedia("(max-width: 768px)").matches) {
      const video = videoRef.current;
      if (video) {
        video.src = "/hero/hero_p.mp4";
        video.load();
        video.play().catch(() => {});
      }
    }
  }, []);

  return (
    <section className={styles.hero} aria-label="Hero">
      <div className={styles.media} aria-hidden="true">
        <video
          ref={videoRef}
          className={styles.video}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        >
          <source src="/hero/hero.mp4" type="video/mp4" />
        </video>
      </div>
      <div className={styles.grain} aria-hidden="true" />

      <div className={styles.heroInner}>
        <div className={`reveal ${styles.panel}`} style={{ "--d": "70ms" } as never}>
          <h1 className={styles.title}>{dict.home.heroTitle}</h1>
        </div>
      </div>
    </section>
  );
}
