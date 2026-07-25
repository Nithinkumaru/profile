"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, Linkedin, Instagram, Mail, Sparkles } from "lucide-react";

import CardGrid      from "@/components/CardGrid";
import { useUI }     from "@/components/UIProvider";
import { personalInfo } from "@/lib/data";
import { trackEvent } from "@/lib/supabase";

const socials = [
  { icon: Github,    href: personalInfo.github,              label: "GitHub",    event: "github_click"    as const },
  { icon: Linkedin,  href: personalInfo.linkedin,            label: "LinkedIn",  event: "linkedin_click"  as const },
  { icon: Instagram, href: personalInfo.instagram,           label: "Instagram", event: "instagram_click" as const },
  { icon: Mail,      href: `mailto:${personalInfo.email}`,   label: "Email",     event: "email_click"      as const },
];

const EASE = [0.22, 0.61, 0.36, 1] as const;

export default function Home() {
  const [loaded]     = useState(true);
  const [roleIndex, setRoleIndex] = useState(0);
  const { chatOpen, openChat, openContact, openBooking } = useUI();

  // Role cycling
  useEffect(() => {
    const id = setInterval(
      () => setRoleIndex(i => (i + 1) % personalInfo.roles.length),
      2800,
    );
    return () => clearInterval(id);
  }, []);

  // Page view analytics
  useEffect(() => {
    if (loaded) trackEvent("page_view");
  }, [loaded]);

  return (
    <>
      {/* Main layout — NO overflow-x:hidden here; iOS Safari turns any overflow:hidden
          on a container into a scroll trap that kills body scroll.
          Height accounts for the fixed Navbar (64px) mounted in layout.tsx. */}
      <div className="relative z-10 flex flex-col md:h-[calc(100vh-64px)]" style={{ minHeight: "calc(100dvh - 64px)" }}>

        {/* ── PROFILE HEADER ── */}
        <div className="md:flex-1 flex flex-col items-center justify-center py-8 md:py-4 px-4 text-center md:min-h-0">
          <div className="flex flex-col items-center gap-3">

            {/* Avatar */}
            <motion.div
              className="relative mb-1"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: loaded ? 1 : 0, scale: loaded ? 1 : 0.85 }}
              transition={{ duration: 0.65, delay: 0.2, ease: EASE }}
            >
              <div
                className="w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center font-bold text-white text-2xl"
                style={{
                  background: "linear-gradient(135deg, #163832 0%, #8EB69B 100%)",
                  boxShadow: "0 0 40px rgba(35,83,71,0.6), 0 0 80px rgba(35,83,71,0.25)",
                  fontFamily: "Space Grotesk, sans-serif",
                }}
              >
                NK
              </div>
              <div
                className="absolute bottom-1 right-1 w-4 h-4 rounded-full border-2 border-white"
                style={{ background: "#4ade80", boxShadow: "0 0 8px #4ade80" }}
              />
            </motion.div>

            {/* Name */}
            <motion.h1
              className="profile-name"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: loaded ? 1 : 0, y: loaded ? 0 : 16 }}
              transition={{ duration: 0.6, delay: 0.28, ease: EASE }}
            >
              {personalInfo.name}
            </motion.h1>

            {/* Rotating role */}
            <div style={{ height: 22, overflow: "hidden" }}>
              <AnimatePresence mode="wait" initial={false}>
                <motion.p
                  key={roleIndex}
                  style={{ color: "var(--text-subtitle)", fontSize: 13, fontWeight: 500, letterSpacing: "0.03em" }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1,  y: 0  }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.32, ease: EASE }}
                >
                  {personalInfo.roles[roleIndex]}
                </motion.p>
              </AnimatePresence>
            </div>

            {/* Social icons */}
            <motion.div
              className="profile-socials"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: loaded ? 1 : 0, y: loaded ? 0 : 10 }}
              transition={{ duration: 0.55, delay: 0.4, ease: EASE }}
            >
              {socials.map(({ icon: Icon, href, label, event }) => (
                <a
                  key={label} href={href}
                  target="_blank" rel="noopener noreferrer"
                  aria-label={label} className="social-link"
                  onClick={() => trackEvent(event)}
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </motion.div>
          </div>
        </div>

        {/* ── CARD CAROUSEL ── */}
        <motion.div
          className="md:flex-shrink-0"
          style={{ paddingBottom: 0 }}
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: loaded ? 1 : 0, y: loaded ? 0 : 36 }}
          transition={{ duration: 0.65, delay: 0.48, ease: EASE }}
        >
          <CardGrid
            onContact={openContact}
            onBooking={openBooking}
          />
        </motion.div>
      </div>

      {/* ── AI FAB (floating widget, bottom-right — never overlaps CTAs) ── */}
      <AnimatePresence>
        {!chatOpen && (
          <motion.button
            key="ai-fab"
            className="ai-fab"
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: loaded ? 1 : 0, scale: loaded ? 1 : 0.7 }}
            exit={{ opacity: 0, scale: 0.7 }}
            transition={{ duration: 0.3, ease: EASE }}
            onClick={openChat}
            aria-label="Open AI Assistant"
            title="Ask me anything"
          >
            <Sparkles size={20} />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
