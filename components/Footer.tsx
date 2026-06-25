"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Instagram, Mail, Heart, ArrowUp, Command } from "lucide-react";
import { personalInfo, navLinks } from "@/lib/data";

export default function Footer() {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="relative mt-12 border-t" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
      {/* Glow at top */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-px"
        style={{ background: "linear-gradient(90deg, transparent, #6C3EF4, #00E5FF, #A855F7, transparent)" }}
      />

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

          {/* Brand */}
          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-3">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center font-display font-bold text-sm text-white"
                style={{
                  background: "linear-gradient(135deg, #6C3EF4, #A855F7)",
                  boxShadow: "0 0 20px rgba(108,62,244,0.3)",
                }}
              >
                N
              </div>
              <div>
                <p className="font-display font-bold text-white" style={{ fontFamily: "Space Grotesk" }}>
                  Nithin Kumar U
                </p>
                <p className="text-xs text-zinc-500">AI & ML Engineer</p>
              </div>
            </div>
            <p className="text-sm text-zinc-500 leading-relaxed">
              Building intelligent products at the intersection of AI and great UX.
              Available for exciting projects.
            </p>
            <div className="flex items-center gap-3">
              {[
                { icon: Github, href: personalInfo.github },
                { icon: Linkedin, href: personalInfo.linkedin },
                { icon: Instagram, href: personalInfo.instagram },
                { icon: Mail, href: `mailto:${personalInfo.email}` },
              ].map(({ icon: Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-zinc-500 hover:text-white transition-all hover:scale-110"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-5">
              Navigation
            </p>
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => document.querySelector(link.href)?.scrollIntoView({ behavior: "smooth" })}
                  className="text-left text-sm text-zinc-500 hover:text-zinc-200 transition-colors w-fit"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <p className="text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-5">
              Get in Touch
            </p>
            <div className="flex flex-col gap-3">
              <a
                href={`mailto:${personalInfo.email}`}
                className="text-sm text-zinc-500 hover:text-zinc-200 transition-colors"
              >
                {personalInfo.email}
              </a>
              <a
                href={`tel:${personalInfo.phone}`}
                className="text-sm text-zinc-500 hover:text-zinc-200 transition-colors"
              >
                {personalInfo.phone}
              </a>
              <p className="text-sm text-zinc-500">{personalInfo.location}</p>
            </div>

            {/* Ctrl+K hint */}
            <div
              className="mt-6 flex items-center gap-2 text-xs text-zinc-600"
            >
              <Command className="w-3 h-3" />
              <span>Press</span>
              <kbd className="px-1.5 py-0.5 rounded bg-zinc-800 font-mono text-zinc-400">Ctrl+K</kbd>
              <span>for quick navigation</span>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-16 pt-8 border-t" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
          <p className="text-xs text-zinc-600 flex items-center gap-1.5">
            Built with
            <Heart className="w-3 h-3 text-red-500/70 fill-red-500/70" />
            by Nithin Kumar U © {new Date().getFullYear()}
          </p>

          <p className="text-xs text-zinc-600">
            Next.js 15 · TypeScript · TailwindCSS · Framer Motion
          </p>

          {/* Back to top */}
          <motion.button
            onClick={scrollTop}
            className="w-9 h-9 rounded-xl flex items-center justify-center text-zinc-500 hover:text-white transition-all hover:scale-110"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
            whileHover={{ y: -2 }}
            aria-label="Back to top"
          >
            <ArrowUp className="w-4 h-4" />
          </motion.button>
        </div>
      </div>
    </footer>
  );
}
