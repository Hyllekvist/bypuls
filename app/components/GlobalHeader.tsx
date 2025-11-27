"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./GlobalHeader.module.css";

const NAV_ITEMS = [
  { href: "/", label: "Danmark" },
  { href: "/trends", label: "Trends" },
  { href: "/metode", label: "Metode" },
];

export function GlobalHeader() {
  const pathname = usePathname();

  return (
    <header className={styles.wrapper}>
      <div className={styles.inner}>
        <div className={styles.left}>
          <span className={styles.brandText}>BYPULS</span>
        </div>
        <nav className={styles.nav} aria-label="Primær navigation">
          {NAV_ITEMS.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`${styles.navLink} ${
                  active ? styles.navLinkActive : ""
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
