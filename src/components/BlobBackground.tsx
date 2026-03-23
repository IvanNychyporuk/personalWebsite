"use client";
import { useEffect, useRef } from "react";
import styles from "./BlobBackground.module.css";

// Per-blob scroll parallax config: [xFactor, yFactor, scaleFactor]
// Small values keep it subtle — blobs drift gently as you scroll
const SCROLL_CONFIG = [
  [ 0.04,  0.06, 0.00015],  // blob1
  [-0.05,  0.03, 0.00010],  // blob2
  [ 0.03, -0.05, 0.00012],  // blob3
  [-0.04, -0.03, 0.00008],  // blob4
];

export function BlobBackground() {
  const pointerRef = useRef<HTMLDivElement>(null);
  const blobRefs   = useRef<(HTMLDivElement | null)[]>([]);
  const rafRef     = useRef<number | undefined>(undefined);
  const cur        = useRef({ x: 0, y: 0 });
  const tg         = useRef({ x: 0, y: 0 });
  const scrollY    = useRef(0);

  // Track mouse
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      tg.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  // Track scroll (passive, no layout cost)
  useEffect(() => {
    const onScroll = () => { scrollY.current = window.scrollY; };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // RAF loop — cursor lerp + scroll parallax on blobs
  useEffect(() => {
    function tick() {
      const sy = scrollY.current;

      // Pointer blob follows cursor
      if (pointerRef.current) {
        cur.current.x += (tg.current.x - cur.current.x) / 20;
        cur.current.y += (tg.current.y - cur.current.y) / 20;
        pointerRef.current.style.transform =
          `translate(${Math.round(cur.current.x)}px, ${Math.round(cur.current.y)}px)`;
      }

      // Static blobs drift based on scroll
      blobRefs.current.forEach((el, i) => {
        if (!el) return;
        const [xf, yf, sf] = SCROLL_CONFIG[i];
        const tx = sy * xf;
        const ty = sy * yf;
        const sc = 1 + sy * sf;
        el.style.transform = `translate(${tx.toFixed(1)}px, ${ty.toFixed(1)}px) scale(${sc.toFixed(4)})`;
      });

      rafRef.current = requestAnimationFrame(tick);
    }
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current !== undefined) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div className={styles.container} aria-hidden="true">
      <div className={styles.gradients}>
        {[styles.blob1, styles.blob2, styles.blob3, styles.blob4].map((cls, i) => (
          <div
            key={i}
            ref={el => { blobRefs.current[i] = el; }}
            className={`${styles.blob} ${cls}`}
          />
        ))}
        <div className={`${styles.blob} ${styles.blob5}`} />
        {/* Pointer blob — JS translates this to follow the cursor */}
        <div ref={pointerRef} className={`${styles.blob} ${styles.blobPointer}`} />
      </div>
    </div>
  );
}
