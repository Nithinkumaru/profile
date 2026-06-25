"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Instagram, Mail, Download, ArrowRight, Sparkles } from "lucide-react";
import { personalInfo } from "@/lib/data";

const socialLinks = [
  { icon: Github, href: personalInfo.github, label: "GitHub" },
  { icon: Linkedin, href: personalInfo.linkedin, label: "LinkedIn" },
  { icon: Instagram, href: personalInfo.instagram, label: "Instagram" },
  { icon: Mail, href: `mailto:${personalInfo.email}`, label: "Email" },
];

function RotatingText({ items }: { items: string[] }) {
  const [index, setIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const current = items[index];

    if (!isDeleting && displayed.length < current.length) {
      timerRef.current = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 80);
    } else if (!isDeleting && displayed.length === current.length) {
      timerRef.current = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && displayed.length > 0) {
      timerRef.current = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 40);
    } else if (isDeleting && displayed.length === 0) {
      setIsDeleting(false);
      setIndex((i) => (i + 1) % items.length);
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [displayed, isDeleting, index, items]);

  return (
    <span className="relative">
      <span className="gradient-text font-display font-bold">{displayed}</span>
      <span
        className="inline-block w-0.5 h-[1em] ml-0.5 align-middle rounded-full"
        style={{
          background: "#6C3EF4",
          animation: "pulse 1s ease-in-out infinite",
        }}
      />
    </span>
  );
}

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center pt-20 pb-12 px-4 overflow-hidden"
      ref={containerRef}
    >
      {/* Spotlight */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 50% 60% at 50% 30%, rgba(108,62,244,0.12) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto gap-8">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="section-tag"
        >
          <Sparkles className="w-3 h-3" />
          Available for exciting projects
        </motion.div>

        {/* Profile image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          {/* Rotating gradient ring */}
          <div className="absolute -inset-2 rounded-full profile-ring" style={{
            background: "conic-gradient(from 0deg, #6C3EF4, #00E5FF, #A855F7, #6C3EF4)",
            padding: "2px",
            borderRadius: "50%",
          }}>
            <div style={{ width: "100%", height: "100%", borderRadius: "50%", background: "#09090B" }} />
          </div>

          {/* Glow */}
          <div
            className="absolute -inset-4 rounded-full pointer-events-none"
            style={{
              background: "radial-gradient(circle, rgba(108,62,244,0.25) 0%, transparent 70%)",
              animation: "pulse 3s ease-in-out infinite",
            }}
          />

          {/* Profile image / avatar */}
          <div
            className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden flex items-center justify-center"
            style={{
              background: "linear-gradient(135deg, #1a0533, #0d1a33)",
              border: "2px solid rgba(108,62,244,0.3)",
            }}
          >
            {/* Placeholder avatar — replace with <img src="/profile.jpg" alt="Nithin Kumar U" /> */}
            <div className="flex flex-col items-center gap-1">
              <span className="font-display font-bold text-4xl gradient-text">NK</span>
            </div>

            {/* Shimmer */}
            <div className="absolute inset-0 shimmer opacity-20" />
          </div>
        </motion.div>

        {/* Name */}
        <motion.div
          className="flex flex-col gap-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <h1
            className="text-5xl md:text-7xl lg:text-8xl font-display font-bold tracking-tight"
            style={{ fontFamily: "Space Grotesk, sans-serif", lineHeight: 1.05 }}
          >
            <span className="gradient-text-subtle">Nithin</span>{" "}
            <span className="gradient-text">Kumar U</span>
          </h1>
        </motion.div>

        {/* Rotating subtitle */}
        <motion.div
          className="text-xl md:text-2xl lg:text-3xl font-medium min-h-[1.5em] flex items-center gap-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <span className="text-zinc-500">I&apos;m a</span>
          <RotatingText items={personalInfo.roles} />
        </motion.div>

        {/* Tagline */}
        <motion.p
          className="text-lg md:text-xl text-zinc-400 max-w-2xl leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          {personalInfo.tagline}
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          className="flex flex-col sm:flex-row items-center gap-4 mt-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
        >
          <button
            onClick={() => document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" })}
            className="group flex items-center gap-2 px-7 py-3.5 rounded-2xl text-sm font-semibold text-white transition-all hover:scale-[1.03] magnetic-btn"
            style={{
              background: "linear-gradient(135deg, #6C3EF4, #A855F7)",
              boxShadow: "0 0 30px rgba(108,62,244,0.35), 0 4px 20px rgba(0,0,0,0.3)",
            }}
          >
            View My Work
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <a
            href={personalInfo.resume}
            download
            className="flex items-center gap-2 px-7 py-3.5 rounded-2xl text-sm font-semibold text-zinc-300 hover:text-white transition-all hover:scale-[1.03] magnetic-btn"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            <Download className="w-4 h-4" />
            Download CV
          </a>
        </motion.div>

        {/* Social icons */}
        <motion.div
          className="flex items-center gap-3 mt-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
        >
          {socialLinks.map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="group w-10 h-10 rounded-xl flex items-center justify-center text-zinc-500 hover:text-white transition-all hover:scale-110 magnetic-btn"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <Icon className="w-4 h-4 group-hover:scale-110 transition-transform" />
            </a>
          ))}
        </motion.div>

        {/* Stats row */}
        <motion.div
          className="flex items-center gap-8 md:gap-12 mt-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7 }}
        >
          {[
            { value: "20+", label: "Projects" },
            { value: "2+", label: "Years" },
            { value: "500+", label: "Commits" },
            { value: "10+", label: "Clients" },
          ].map(({ value, label }) => (
            <div key={label} className="flex flex-col items-center gap-1">
              <span className="font-display font-bold text-xl md:text-2xl gradient-text">{value}</span>
              <span className="text-xs text-zinc-500">{label}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-zinc-600"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <motion.div
          className="w-px h-8 rounded-full"
          style={{ background: "linear-gradient(180deg, rgba(108,62,244,0.6), transparent)" }}
          animate={{ scaleY: [0.5, 1, 0.5], opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
}
