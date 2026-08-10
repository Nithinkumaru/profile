"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, Linkedin, Mail, Share2, Flame, Sparkles, ChevronDown } from "lucide-react";
import dynamic from "next/dynamic";

import Background       from "@/components/Background";
import CardGrid         from "@/components/CardGrid";
import ShareModal       from "@/components/ShareModal";
import CustomCursor     from "@/components/CustomCursor";
import LoadingScreen    from "@/components/LoadingScreen";
import PremiumSections  from "@/components/PremiumSections";
import { personalInfo } from "@/lib/data";
import { trackEvent } from "@/lib/supabase";

const AIAssistant  = dynamic(() => import("@/components/AIAssistant"),  { ssr: false });
const ContactModal = dynamic(() => import("@/components/ContactModal"), { ssr: false });
const BookingModal = dynamic(() => import("@/components/BookingModal"), { ssr: false });

const socials = [
  { icon: Github,    href: personalInfo.github,              label: "GitHub",    event: "github_click"    as const },
  { icon: Linkedin,  href: personalInfo.linkedin,            label: "LinkedIn",  event: "linkedin_click"  as const },
  { icon: Mail,      href: `mailto:${personalInfo.email}`,   label: "Email",     event: "email_click"      as const },
];

const EASE = [0.22, 0.61, 0.36, 1] as const;

export default function Home() {
  const [loaded,       setLoaded]       = useState(true);
  const [chatOpen,     setChatOpen]     = useState(false);
  const [shareOpen,    setShareOpen]    = useState(false);
  const [contactOpen,  setContactOpen]  = useState(false);
  const [bookingOpen,  setBookingOpen]  = useState(false);
  const [bookingTime,  setBookingTime]  = useState<string | undefined>(undefined);
  const [roleIndex,    setRoleIndex]    = useState(0);
  const [scrolled,     setScrolled]     = useState(false);

  // Reveal a "scroll to explore" hint until the visitor scrolls past the hero —
  // the page used to end at the fold, so there's no other cue that more exists below.
  // Scroll position is read from body (not window) because the desktop/mobile
  // overflow rules make <body> the actual scrolling element, not <html>/window;
  // the listener is attached with capture:true since body's scroll event doesn't bubble.
  useEffect(() => {
    const getScrollY = () => document.body.scrollTop || document.documentElement.scrollTop || window.scrollY;
    const onScroll = () => setScrolled(getScrollY() > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true, capture: true });
    return () => window.removeEventListener("scroll", onScroll, true);
  }, []);

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
      {/* Loading screen removed — caused infinite 0% hang on production */}

      {/* Custom cursor — desktop only */}
      <CustomCursor />

      {/* Background */}
      <Background />

      {/* Main layout — NO overflow-x:hidden here; iOS Safari turns any overflow:hidden
          on a container into a scroll trap that kills body scroll */}
      <div className="relative z-10 flex flex-col md:h-screen" style={{ minHeight: "100dvh" }}>

        {/* ── TOP BAR ── */}
        <div className="flex items-center justify-between px-5 pt-5 flex-shrink-0">
          <motion.button
            className="top-btn"
            initial={{ opacity: 0, scale: 0.75, y: -8 }}
            animate={{ opacity: loaded ? 1 : 0, scale: loaded ? 1 : 0.75, y: loaded ? 0 : -8 }}
            transition={{ duration: 0.5, delay: 0.1, ease: EASE }}
            onClick={() => setChatOpen(true)}
            title="Ask AI Assistant"
          >
            <Flame className="w-4 h-4 text-orange-400" />
          </motion.button>

          <motion.button
            className="top-btn"
            initial={{ opacity: 0, scale: 0.75, y: -8 }}
            animate={{ opacity: loaded ? 1 : 0, scale: loaded ? 1 : 0.75, y: loaded ? 0 : -8 }}
            transition={{ duration: 0.5, delay: 0.16, ease: EASE }}
            onClick={() => setShareOpen(true)}
            title="Share profile"
          >
            <Share2 className="w-4 h-4" style={{ color: "rgba(218,241,222,0.7)" }} />
          </motion.button>
        </div>

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
                  style={{ color: "rgba(218,241,222,0.55)", fontSize: 13, fontWeight: 500, letterSpacing: "0.03em" }}
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
            onContact={() => setContactOpen(true)}
            onBooking={(time) => { setBookingTime(time); setBookingOpen(true); }}
          />
        </motion.div>
      </div>

      {/* ── SCROLL HINT (fades once the visitor scrolls past the hero) ── */}
      <AnimatePresence>
        {!scrolled && (
          <motion.button
            key="scroll-hint"
            className="scroll-hint"
            initial={{ opacity: 0 }}
            animate={{ opacity: loaded ? 1 : 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
            onClick={() => document.getElementById("what-i-do")?.scrollIntoView({ behavior: "smooth" })}
            aria-label="Scroll to explore more"
          >
            <span>Scroll to explore</span>
            <ChevronDown size={14} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* ── PREMIUM SECTIONS (scrolls in below the hero fold) ── */}
      <PremiumSections
        onContact={() => setContactOpen(true)}
        onBooking={(time) => { setBookingTime(time); setBookingOpen(true); }}
      />

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
            onClick={() => setChatOpen(true)}
            aria-label="Open AI Assistant"
            title="Ask me anything"
          >
            <Sparkles size={20} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* ── OVERLAYS ── */}
      <AnimatePresence>
        {chatOpen && (
          <AIAssistant key="chat" onClose={() => setChatOpen(false)} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {shareOpen && (
          <motion.div key="share" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: EASE }} className="fixed inset-0 z-50">
            <ShareModal onClose={() => setShareOpen(false)} />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {contactOpen && (
          <ContactModal key="contact" onClose={() => setContactOpen(false)} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {bookingOpen && (
          <BookingModal key="booking" initialTime={bookingTime} onClose={() => setBookingOpen(false)} />
        )}
      </AnimatePresence>
    </>
  );
}
