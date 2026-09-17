"use client";

import { Menu, Radio, X } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "ГОЛОВНА", href: "/" },
  { label: "ЕФІР", href: "/radio" },
  { label: "РОЗКЛАД", href: "/schedule" },
  { label: "ІСТОРІЯ", href: "/history" },
  { label: "ПРО НАС", href: "/about" },
  { label: "КОНТАКТИ", href: "/contact" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const closeMenu = () => setIsOpen(false);

  return (
    <header className="site-header">
      <nav className="shell nav" aria-label="Основна навігація">
        <Link className="brand-mark" href="/" aria-label="DJ_SKY_STYLE RADIO — головна" onClick={closeMenu}>
          <span className="brand-mark__icon"><Radio size={18} aria-hidden="true" /></span>
          <span>DJ_SKY_STYLE<span>RADIO</span></span>
        </Link>

        <button
          className="nav-toggle"
          type="button"
          onClick={() => setIsOpen((open) => !open)}
          aria-expanded={isOpen}
          aria-controls="main-menu"
          aria-label={isOpen ? "Закрити меню навігації" : "Відкрити меню навігації"}
        >
          {isOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>

        <div id="main-menu" className={`nav-links ${isOpen ? "nav-links--open" : ""}`}>
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} onClick={closeMenu} className={pathname === item.href ? "is-active" : undefined}>{item.label}</Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
