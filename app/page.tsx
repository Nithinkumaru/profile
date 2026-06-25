"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, Linkedin, Instagram, Mail, Share2, Flame } from "lucide-react";
import dynamic from "next/dynamic";

import Background from "@/components/Background";
import CardGrid from "@/components/CardGrid";
import ShareModal from "@/components/ShareModal";
import CustomCursor from "@/components/CustomCursor";
import { personalInfo } from "@/lib/data";

const AIAssistant = dynamic(() => import("@/components/AIAssistant"), { ssr: false });

const socials = [
  { icon: Github,    href: personalInfo.github,                label: "GitHub"    },
  { icon: Linkedin,  href: personalInfo.linkedin,              label: "LinkedIn"  },
  { icon: Instagram, href: personalInfo.instagram,             label: "Instagram" },
  { icon: Mail,      href: `mailto:${personalInfo.email}`,     label: "Email"     },
];

const EASE = [0.22, 0.61, 0.36, 1] as const;

export default function Home() {
  const [chatOpen,   setChatOpen]   = useState(false);
  const [shareOpen,  setShareOpen]  = useState(false);
  const [roleIndex,  setRoleIndex]  = useState(0);

  // Cycle through roles every 2.8 s
  useEffect(() => {
    const id = setInterval(
      () => setRoleIndex((i) => (i + 1) % personalInfo.roles.length),
      2800,
    );
    return () => clearInterval(id);
  }, []);

  return (
    <>
      {/* Custom cursor — desktop only (no-op on touch) */}
      <CustomCursor />

      {/* Animated background */}
      <Background />

      {/* Full-screen layout */}
      <div
        className="relative z-10 flex flex-col h-screen"
        style={{ userSelect: "none" }}
      >

        {/* ── TOP BAR ── */}
        <div className="flex items-center justify-between px-5 pt-5 flex-shrink-0">
          <motion.button
            className="top-btn"
            initial={{ opacity: 0, scale: 0.75, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08, ease: EASE }}
            onClick={() => setChatOpen(true)}
            title="Ask AI Assistant"
          >
            <Flame className="w-4 h-4 text-orange-400" />
          </motion.button>

          <motion.button
            className="top-btn"
            initial={{ opacity: 0, scale: 0.75, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.14, ease: EASE }}
            onClick={() => setShareOpen(true)}
            title="Share profile"
          >
            <Share2 className="w-4 h-4 text-white/70" />
          </motion.button>
        </div>

        {/* ── PROFILE HEADER ── */}
        <div className="flex-1 flex flex-col items-center justify-center pb-4 px-4 text-center min-h-0">
          <div className="flex flex-col items-center gap-3">

            {/* Avatar */}
            <motion.div
              className="relative mb-1"
              initial={{ opacity: 0, scale: 0.88 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.18, ease: EASE }}
            >
              <div
                className="w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center font-bold text-white text-2xl"
                style={{
                  background: "linear-gradient(135deg, #6C3EF4 0%, #00E5FF 100%)",
                  boxShadow: "0 0 40px rgba(108,62,244,0.5), 0 0 80px rgba(108,62,244,0.2)",
                }}
              >
                NK
              </div>
              <div
                className="absolute bottom-1 right-1 w-4 h-4 rounded-full border-2 border-white"
                style={{ background: "#22c55e", boxShadow: "0 0 8px #22c55e" }}
              />
            </motion.div>

            {/* Name */}
            <motion.h1
              className="profile-name"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.26, ease: EASE }}
            >
              {personalInfo.name}
            </motion.h1>

            {/* Rotating role subtitle */}
            <div style={{ height: 22, overflow: "hidden", position: "relative" }}>
              <AnimatePresence mode="wait" initial={false}>
                <motion.p
                  key={roleIndex}
                  className="text-white/55 text-sm font-medium tracking-wide"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.35, ease: EASE }}
                >
                  {personalInfo.roles[roleIndex]}
                </motion.p>
              </AnimatePresence>
            </div>

            {/* Socials */}
            <motion.div
              className="profile-socials"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.38, ease: EASE }}
            >
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="social-link"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </motion.div>
          </div>
        </div>

        {/* ── CARD GRID ── */}
        <motion.div
          className="flex-shrink-0"
          style={{ paddingBottom: 72 }}
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.45, ease: EASE }}
        >
          <CardGrid />
        </motion.div>
      </div>

      {/* ── AI CHAT BUTTON ── */}
      <motion.button
        className="ai-btn"
        onClick={() => setChatOpen(true)}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.62, ease: EASE }}
        whileHover={{ scale: 1.04, transition: { duration: 0.2 } }}
        whileTap={{ scale: 0.96 }}
      >
        {/* Dots like Claylight */}
        <div className="flex gap-1">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-white/50"
              style={{ animation: `typingBounce 1.4s ease-in-out ${i * 0.2}s infinite` }}
            />
          ))}
        </div>
        <span>Ask me anything</span>
      </motion.button>

      {/* ── OVERLAYS ── */}
      <AnimatePresence>
        {chatOpen && (
          <motion.div
            key="chat"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="fixed inset-0 z-50"
          >
            <AIAssistant onClose={() => setChatOpen(false)} />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {shareOpen && (
          <motion.div
            key="share"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: EASE }}
            className="fixed inset-0 z-50"
          >
            <ShareModal onClose={() => setShareOpen(false)} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
