"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./BottomNav.module.css";

const ITEMS = [
  { href: "/", label: "Danmark" },
  { href: "/trends", label: "Trends" },
  { href: "/metode", label: "Metode" },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className={styles.wrapper} aria-label="Bundnavigation">
      <div className={styles.inner}>
        {ITEMS.map((item) => {
          const active =
            item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`${styles.item} ${active ? styles.itemActive : ""}`}
            >
              <span className={styles.iconDot} />
              <span className={styles.label}>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
