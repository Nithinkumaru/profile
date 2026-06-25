"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, Linkedin, Instagram, Mail, Share2, Flame } from "lucide-react";
import dynamic from "next/dynamic";

import Background from "@/components/Background";
import CardGrid from "@/components/CardGrid";
import ShareModal from "@/components/ShareModal";
import { personalInfo } from "@/lib/data";

const AIAssistant = dynamic(() => import("@/components/AIAssistant"), { ssr: false });

const socials = [
  { icon: Github, href: personalInfo.github, label: "GitHub" },
  { icon: Linkedin, href: personalInfo.linkedin, label: "LinkedIn" },
  { icon: Instagram, href: personalInfo.instagram, label: "Instagram" },
  { icon: Mail, href: `mailto:${personalInfo.email}`, label: "Email" },
];

const roles = ["AI Engineer", "ML Developer", "Full Stack Dev", "Builder"];

export default function Home() {
  const [chatOpen, setChatOpen] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const [roleIndex] = useState(0);

  return (
    <>
      {/* Animated background */}
      <Background />

      {/* Full-screen layout */}
      <div
        className="relative z-10 flex flex-col h-screen"
        style={{ userSelect: "none" }}
      >

        {/* ── TOP BAR ── */}
        <div className="flex items-center justify-between px-5 pt-5 flex-shrink-0">
          {/* Logo / Flame btn */}
          <motion.button
            className="top-btn"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            onClick={() => setChatOpen(true)}
            title="Ask AI Assistant"
          >
            <Flame className="w-4 h-4 text-orange-400" />
          </motion.button>

          {/* Share btn */}
          <motion.button
            className="top-btn"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.15 }}
            onClick={() => setShareOpen(true)}
            title="Share profile"
          >
            <Share2 className="w-4 h-4 text-white/70" />
          </motion.button>
        </div>

        {/* ── PROFILE HEADER ── */}
        <div className="flex-1 flex flex-col items-center justify-center pb-4 px-4 text-center min-h-0">
          <motion.div
            className="flex flex-col items-center gap-3"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Profile image */}
            <div className="relative mb-1">
              <div
                className="w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center font-bold text-white text-2xl"
                style={{
                  background: "linear-gradient(135deg, #6C3EF4 0%, #00E5FF 100%)",
                  boxShadow: "0 0 40px rgba(108,62,244,0.5), 0 0 80px rgba(108,62,244,0.2)",
                }}
              >
                NK
              </div>
              {/* Online dot */}
              <div
                className="absolute bottom-1 right-1 w-4 h-4 rounded-full border-2 border-white"
                style={{ background: "#22c55e", boxShadow: "0 0 8px #22c55e" }}
              />
            </div>

            {/* Name */}
            <h1 className="profile-name">{personalInfo.name}</h1>

            {/* Animated role */}
            <motion.p
              className="text-white/60 text-sm font-medium"
              key={roleIndex}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {roles[roleIndex]}
            </motion.p>

            {/* Social icons */}
            <div className="profile-socials">
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
            </div>
          </motion.div>
        </div>

        {/* ── CARD GRID ── */}
        <motion.div
          className="flex-shrink-0"
          style={{ paddingBottom: 72 }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <CardGrid />
        </motion.div>
      </div>

      {/* ── AI CHAT BUTTON ── */}
      <motion.button
        className="ai-btn"
        onClick={() => setChatOpen(true)}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
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
            className="fixed inset-0 z-50"
          >
            <AIAssistant onClose={() => setChatOpen(false)} />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {shareOpen && (
          <motion.div key="share" className="fixed inset-0 z-50">
            <ShareModal onClose={() => setShareOpen(false)} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
