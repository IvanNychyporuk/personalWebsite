"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./MobileMenu.module.css";

type MenuLink = {
  href: string;
  label: string;
};

export function MobileMenu({
  buttonLabel,
  title,
  links,
}: {
  buttonLabel: string;
  title: string;
  links: MenuLink[];
}) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const items = useMemo(() => links.filter(Boolean), [links]);

  useEffect(() => {
    // Close the menu on route changes.
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <div className={styles.wrap}>
      <button
        type="button"
        className={`button ${styles.button}`}
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={() => setOpen(true)}
      >
        {buttonLabel}
      </button>

      {open ? (
        <div className={styles.overlay} role="dialog" aria-modal="true">
          <div className={styles.backdrop} onClick={() => setOpen(false)} />
          <div className={styles.panel}>
            <div className={styles.inner}>
              <div className={styles.row}>
                <p className={styles.title}>{title}</p>
                <button
                  type="button"
                  className={`button ${styles.close}`}
                  onClick={() => setOpen(false)}
                >
                  Close
                </button>
              </div>

              <div className={styles.links}>
                {items.map((l) => (
                  <Link key={l.href} href={l.href} className={styles.link}>
                    <span>{l.label}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
