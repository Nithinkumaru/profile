"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Github,
  Linkedin,
  Instagram,
  Mail,
  ExternalLink,
  Calendar,
  Download,
  Code2,
  Briefcase,
  User,
  ChevronRight,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { personalInfo, projects } from "@/lib/data";

export default function CardGrid() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const onScroll = () => {
      const idx = Math.round(el.scrollLeft / 220);
      setActiveIndex(idx);
    };

    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  const fadeIn = (delay: number) => ({
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] },
  });

  return (
    <div className="relative w-full">
      <div ref={scrollRef} className="cards-container" style={{ height: "clamp(320px, 42vh, 440px)" }}>

        {/* ── CARD 1: Profile (tall, 2-row) ── */}
        <motion.div {...fadeIn(0.1)} className="card card-tall card-w-md p-5 flex flex-col gap-4">
          {/* Avatar */}
          <div className="flex items-center gap-3">
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-white text-base flex-shrink-0"
              style={{ background: "linear-gradient(135deg, #6C3EF4, #A855F7)" }}
            >
              NK
            </div>
            <div>
              <p className="card-title text-base leading-tight">Nithin Kumar U</p>
              <p className="card-body text-xs">AI & ML Engineer</p>
            </div>
          </div>

          {/* Status dot */}
          <div className="flex items-center gap-2">
            <span
              className="w-2 h-2 rounded-full"
              style={{ background: "#22c55e", boxShadow: "0 0 6px #22c55e" }}
            />
            <span className="card-body text-xs">Available for projects</span>
          </div>

          {/* Mini bio */}
          <p className="card-body text-xs flex-1 leading-relaxed">
            I build intelligent products at the intersection of AI and exceptional UX.
          </p>

          {/* Learn more */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector("#about-section")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="card-btn"
          >
            Learn more <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </motion.div>

        {/* ── CARD 2: Hire Me (short top) ── */}
        <motion.div {...fadeIn(0.15)} className="card card-short card-w-md p-5 flex flex-col gap-3">
          <div className="card-label">
            <ExternalLink className="w-3 h-3" />
            Let&apos;s work together
          </div>
          <p className="card-title text-lg">Hire Me</p>
          <a
            href={`mailto:${personalInfo.email}`}
            className="card-btn mt-auto"
          >
            <Mail className="w-3.5 h-3.5" />
            Get in touch
          </a>
        </motion.div>

        {/* ── CARD 3: Contact card (short bottom) ── */}
        <motion.div {...fadeIn(0.18)} className="card card-short card-w-md p-5 flex flex-col gap-3">
          <div className="card-label">
            <Briefcase className="w-3 h-3" />
            Reach out
          </div>
          <div className="flex flex-col gap-1.5 flex-1">
            <p className="card-body text-xs">{personalInfo.email}</p>
            <p className="card-body text-xs">{personalInfo.location}</p>
          </div>
          <div className="flex gap-2 mt-auto">
            <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="social-link" style={{ width: 30, height: 30 }}>
              <Github className="w-3.5 h-3.5" />
            </a>
            <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="social-link" style={{ width: 30, height: 30 }}>
              <Linkedin className="w-3.5 h-3.5" />
            </a>
            <a href={personalInfo.instagram} target="_blank" rel="noopener noreferrer" className="social-link" style={{ width: 30, height: 30 }}>
              <Instagram className="w-3.5 h-3.5" />
            </a>
            <a href={`mailto:${personalInfo.email}`} className="social-link" style={{ width: 30, height: 30 }}>
              <Mail className="w-3.5 h-3.5" />
            </a>
          </div>
        </motion.div>

        {/* ── CARD 4: Book a Call (tall) ── */}
        <motion.div {...fadeIn(0.2)} className="card card-tall card-w-lg p-5 flex flex-col gap-4">
          <div className="card-label">
            <Calendar className="w-3 h-3" />
            Free consultation
          </div>
          <p className="card-title">Book a Call</p>
          <p className="card-body text-xs flex-1">
            Have a project in mind? Let&apos;s chat! I offer free 30-minute consultations to explore how I can help.
          </p>

          {/* Time slots preview */}
          <div className="flex flex-col gap-2">
            {["Mon 10:00 AM", "Wed 2:00 PM", "Fri 11:00 AM"].map((slot) => (
              <div
                key={slot}
                className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs"
                style={{ background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.2)" }}
              >
                <span
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{ background: "#22c55e" }}
                />
                <span className="card-body">{slot}</span>
                <span className="ml-auto card-body" style={{ fontSize: 10 }}>30 min</span>
              </div>
            ))}
          </div>

          <a
            href="https://calendly.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="card-btn"
          >
            <Calendar className="w-3.5 h-3.5" />
            Schedule 30-min call
          </a>
        </motion.div>

        {/* ── CARD 5: Featured Project (tall) ── */}
        <motion.div {...fadeIn(0.25)} className="card card-tall card-w-lg p-5 flex flex-col gap-4 overflow-hidden">
          {/* Project preview */}
          <div
            className="relative rounded-xl overflow-hidden flex-shrink-0"
            style={{
              height: 100,
              background: "linear-gradient(135deg, rgba(108,62,244,0.3), rgba(0,229,255,0.15))",
            }}
          >
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: "linear-gradient(rgba(108,62,244,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(108,62,244,0.2) 1px, transparent 1px)",
                backgroundSize: "20px 20px",
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center text-4xl">🛡️</div>
          </div>

          <div className="card-label">
            <ExternalLink className="w-3 h-3" />
            Featured Project
          </div>
          <p className="card-title text-lg">{projects[0].title}</p>
          <p className="card-body text-xs flex-1 line-clamp-2">{projects[0].description}</p>

          <div className="flex flex-wrap gap-1.5">
            {projects[0].tech.slice(0, 3).map((t) => (
              <span key={t} className="tech-badge">{t}</span>
            ))}
          </div>

          <a href={projects[0].github} target="_blank" rel="noopener noreferrer" className="card-btn">
            <Github className="w-3.5 h-3.5" />
            View on GitHub
          </a>
        </motion.div>

        {/* ── CARD 6: GitHub (short top) ── */}
        <motion.div {...fadeIn(0.28)} className="card card-short card-w-md p-5 flex flex-col gap-3">
          <div className="card-label">
            <Github className="w-3 h-3" />
            GitHub
          </div>
          <p className="card-title text-lg">My Code</p>
          <div className="flex gap-3 mt-auto">
            <div className="text-center">
              <p className="font-bold text-lg" style={{ color: "#6C3EF4", fontFamily: "Space Grotesk" }}>20+</p>
              <p className="card-body" style={{ fontSize: 10 }}>Repos</p>
            </div>
            <div className="text-center">
              <p className="font-bold text-lg" style={{ color: "#6C3EF4", fontFamily: "Space Grotesk" }}>500+</p>
              <p className="card-body" style={{ fontSize: 10 }}>Commits</p>
            </div>
          </div>
          <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="card-btn">
            Browse Repos <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </motion.div>

        {/* ── CARD 7: LinkedIn (short bottom) ── */}
        <motion.div {...fadeIn(0.3)} className="card card-short card-w-md p-5 flex flex-col gap-3">
          <div className="card-label">
            <Linkedin className="w-3 h-3" />
            LinkedIn
          </div>
          <p className="card-title text-lg">Connect</p>
          <p className="card-body text-xs flex-1">Let&apos;s build a professional connection!</p>
          <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="card-btn">
            View Profile <ChevronRight className="w-3.5 h-3.5" />
          </a>
        </motion.div>

        {/* ── CARD 8: My Projects (tall) ── */}
        <motion.div {...fadeIn(0.32)} className="card card-tall card-w-xl p-5 flex flex-col gap-3">
          <div className="card-label">
            <Code2 className="w-3 h-3" />
            View My Work
          </div>
          <p className="card-title">My Projects</p>
          <p className="card-body text-xs">Explore AI systems, full-stack apps, and ML models I&apos;ve shipped.</p>

          <div className="flex flex-col gap-2 flex-1">
            {projects.slice(0, 4).map((p) => (
              <a
                key={p.id}
                href={p.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 rounded-xl transition-all hover:bg-white/20 group"
                style={{ background: "rgba(255,255,255,0.1)" }}
              >
                <span className="text-xl flex-shrink-0">
                  {p.id === 1 ? "🛡️" : p.id === 2 ? "🚀" : p.id === 3 ? "🤖" : "📞"}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="card-title text-sm truncate">{p.title}</p>
                  <p className="card-body text-xs truncate">{p.tech.slice(0, 2).join(" · ")}</p>
                </div>
                <ExternalLink className="w-3 h-3 text-black/30 group-hover:text-black/60 flex-shrink-0" />
              </a>
            ))}
          </div>

          <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="card-btn">
            See all projects <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </motion.div>

        {/* ── CARD 9: Resume (short top) ── */}
        <motion.div {...fadeIn(0.35)} className="card card-short card-w-md p-5 flex flex-col gap-3">
          <div className="card-label">
            <Download className="w-3 h-3" />
            Resume
          </div>
          <p className="card-title text-lg">Download CV</p>
          <a href={personalInfo.resume} download className="card-btn mt-auto">
            <Download className="w-3.5 h-3.5" />
            Download PDF
          </a>
        </motion.div>

        {/* ── CARD 10: TeachGrow project (short bottom) ── */}
        <motion.div {...fadeIn(0.38)} className="card card-short card-w-md p-5 flex flex-col gap-3">
          <div className="card-label">
            <Sparkles className="w-3 h-3" />
            Latest Build
          </div>
          <p className="card-title text-base leading-tight">{projects[1].title}</p>
          <div className="flex flex-wrap gap-1">
            {projects[1].tech.slice(0, 2).map((t) => (
              <span key={t} className="tech-badge" style={{ fontSize: 10, padding: "2px 8px" }}>{t}</span>
            ))}
          </div>
          <a href={projects[1].github} target="_blank" rel="noopener noreferrer" className="card-btn mt-auto">
            View <ExternalLink className="w-3 h-3" />
          </a>
        </motion.div>

      </div>

      {/* Scroll dots */}
      <div className="scroll-dots">
        {[0, 1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className={`scroll-dot ${activeIndex === i ? "active" : ""}`}
          />
        ))}
      </div>
    </div>
  );
}
