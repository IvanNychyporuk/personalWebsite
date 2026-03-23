"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Home, FolderOpen, Briefcase, Sparkles, Mail } from "lucide-react";
import styles from "./NavLinks.module.css";

type NavItem = {
  href: string;
  label: string;
  icon: React.ComponentType<{ size?: number; strokeWidth?: number }>;
};

export function NavLinks({
  locale,
  labels,
}: {
  locale: string;
  labels: {
    home: string;
    projects: string;
    experience: string;
    skills: string;
    contact: string;
  };
}) {
  const pathname = usePathname();

  const items: NavItem[] = [
    { href: `/${locale}`, label: labels.home, icon: Home },
    { href: `/${locale}/projects`, label: labels.projects, icon: FolderOpen },
    { href: `/${locale}/experience`, label: labels.experience, icon: Briefcase },
    { href: `/${locale}/skills`, label: labels.skills, icon: Sparkles },
    { href: `/${locale}/contact`, label: labels.contact, icon: Mail },
  ];

  // Determine active item: exact match for home, prefix match for others
  const activeItem = items.find((item) =>
    item.href === `/${locale}` ? pathname === `/${locale}` || pathname === `/${locale}/` : pathname.startsWith(item.href)
  ) ?? items[0];

  const [activeTab, setActiveTab] = useState(activeItem.label);

  useEffect(() => {
    setActiveTab(activeItem.label);
  }, [activeItem.label]);

  return (
    <nav className={styles.nav} aria-label="Primary">
      {items.map((item) => {
        const isActive = activeTab === item.label;
        const Icon = item.icon;

        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => setActiveTab(item.label)}
            className={`${styles.navLink} ${isActive ? styles.active : ""}`}
          >
            <span className={styles.label}>{item.label}</span>
            <span className={styles.iconWrap} aria-hidden="true">
              <Icon size={16} strokeWidth={2} />
            </span>
            {isActive && (
              <motion.span
                layoutId="nav-lamp"
                className={styles.lamp}
                initial={false}
                transition={{ type: "spring", stiffness: 380, damping: 34 }}
              >
                <span className={styles.lampBar} />
                <span className={styles.lampGlow} />
              </motion.span>
            )}
          </Link>
        );
      })}
    </nav>
  );
}
