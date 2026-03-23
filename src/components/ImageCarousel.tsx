'use client';

import { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import styles from './ImageCarousel.module.css';

interface Props {
  images: string[];
  alts?: string[];
}

export default function ImageCarousel({ images, alts = [] }: Props) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const prev = useCallback(() => setIndex(i => (i - 1 + images.length) % images.length), [images.length]);
  const next = useCallback(() => setIndex(i => (i + 1) % images.length), [images.length]);

  const openAt = (i: number) => { setIndex(i); setOpen(true); };
  const close = () => setOpen(false);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = 'hidden';
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', handler);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handler);
    };
  }, [open, prev, next]);

  const lightbox = (
    <div className={styles.overlay} onClick={close}>
      <button className={styles.close} onClick={close} aria-label="Close">✕</button>

      <button
        className={`${styles.arrow} ${styles.arrowLeft}`}
        onClick={e => { e.stopPropagation(); prev(); }}
        aria-label="Previous"
      >‹</button>

      <img
        className={styles.lightboxImg}
        src={images[index]}
        alt={alts[index] || `Screenshot ${index + 1}`}
        onClick={e => e.stopPropagation()}
      />

      <button
        className={`${styles.arrow} ${styles.arrowRight}`}
        onClick={e => { e.stopPropagation(); next(); }}
        aria-label="Next"
      >›</button>

      <div className={styles.dots} onClick={e => e.stopPropagation()}>
        {images.map((_, i) => (
          <button
            key={i}
            className={`${styles.dot} ${i === index ? styles.dotActive : ''}`}
            onClick={() => setIndex(i)}
            aria-label={`Go to ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );

  return (
    <>
      <div className={styles.thumbnails}>
        {images.map((src, i) => (
          <button
            key={src}
            className={styles.thumb}
            onClick={() => openAt(i)}
            aria-label={alts[i] || `Screenshot ${i + 1}`}
          >
            <img src={src} alt={alts[i] || `Screenshot ${i + 1}`} />
          </button>
        ))}
      </div>

      {mounted && open && createPortal(lightbox, document.body)}
    </>
  );
}
