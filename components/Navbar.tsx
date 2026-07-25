"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Command, Share2 } from "lucide-react";
import { useUI } from "@/components/UIProvider";

const EASE = [0.22, 0.61, 0.36, 1] as const;

type NavItem =
  | { type: "route"; href: string; label: string }
  | { type: "action"; id: string; label: string; onClick: () => void };

export default function Navbar() {
  const pathname = usePathname();
  const { openContact, openBooking, openShare } = useUI();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu on route change
  useEffect(() => { setMobileOpen(false); }, [pathname]);

  const items: NavItem[] = [
    { type: "route", href: "/", label: "Home" },
    { type: "action", id: "book", label: "Book a Call", onClick: () => openBooking() },
    { type: "action", id: "contact", label: "Contact", onClick: openContact },
  ];

  const openPalette = () => {
    document.dispatchEvent(new KeyboardEvent("keydown", { key: "k", ctrlKey: true }));
  };

  return (
    <>
      <motion.nav
        className={`site-nav${scrolled ? " site-nav-scrolled" : ""}`}
        initial={{ y: -16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: EASE }}
      >
        <a href="/" className="site-nav-logo" aria-label="Home">
          <span className="site-nav-logo-mark">NK</span>
          <span className="site-nav-logo-text">Nithin Kumar</span>
        </a>

        <div className="site-nav-links">
          {items.map((item) =>
            item.type === "route" ? (
              <a
                key={item.href}
                href={item.href}
                className={`site-nav-link${pathname === item.href ? " active" : ""}`}
              >
                {item.label}
              </a>
            ) : (
              <button key={item.id} type="button" className="site-nav-link" onClick={item.onClick}>
                {item.label}
              </button>
            )
          )}
        </div>

        <div className="site-nav-actions">
          <button
            type="button"
            className="top-btn site-nav-hide-mobile"
            onClick={openShare}
            aria-label="Share profile"
            title="Share profile"
          >
            <Share2 size={16} style={{ color: "var(--text-subtitle)" }} />
          </button>

          <button
            type="button"
            className="site-nav-kbd site-nav-hide-mobile"
            onClick={openPalette}
            aria-label="Open command palette"
          >
            <Command size={12} />
            <span>K</span>
          </button>

          <button
            type="button"
            className="top-btn site-nav-burger"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="site-nav-mobile"
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.22, ease: EASE }}
          >
            {items.map((item) =>
              item.type === "route" ? (
                <a key={item.href} href={item.href} className="site-nav-mobile-link">
                  {item.label}
                </a>
              ) : (
                <button
                  key={item.id}
                  type="button"
                  className="site-nav-mobile-link"
                  onClick={() => { setMobileOpen(false); item.onClick(); }}
                >
                  {item.label}
                </button>
              )
            )}
            <button
              type="button"
              className="site-nav-mobile-link"
              onClick={() => { setMobileOpen(false); openShare(); }}
            >
              Share profile
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
