"use client";

import { motion } from "framer-motion";
import { Github, MapPin, BookOpen, Trophy, GraduationCap, Calendar, Code2, Brain, ExternalLink } from "lucide-react";
import { personalInfo, achievements, education, skills } from "@/lib/data";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] },
  }),
};

function GlassCard({
  children,
  className = "",
  index = 0,
  glowColor = "#6C3EF4",
}: {
  children: React.ReactNode;
  className?: string;
  index?: number;
  glowColor?: string;
}) {
  return (
    <motion.div
      custom={index}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className={`glass-card p-6 relative overflow-hidden group ${className}`}
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      style={{
        ["--hover-glow" as string]: glowColor,
      }}
    >
      {/* Gradient hover reveal */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-3xl"
        style={{
          background: `radial-gradient(ellipse at 50% 0%, ${glowColor}18 0%, transparent 70%)`,
        }}
      />
      {children}
    </motion.div>
  );
}

export default function BentoGrid() {
  const topSkills = Object.entries(skills)
    .slice(0, 2)
    .flatMap(([, v]) => v)
    .slice(0, 8);

  return (
    <section id="about" className="relative py-24 px-4 md:px-8 max-w-7xl mx-auto">
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="section-tag mx-auto mb-4">About</div>
        <h2 className="font-display text-4xl md:text-5xl font-bold text-white mt-2" style={{ fontFamily: "Space Grotesk" }}>
          A glimpse into{" "}
          <span className="gradient-text">my world</span>
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-auto">

        {/* About Me — large */}
        <GlassCard className="lg:col-span-2 lg:row-span-2" index={0} glowColor="#6C3EF4">
          <div className="flex flex-col h-full gap-6">
            <div className="flex items-center justify-between">
              <div className="section-tag text-xs">
                <Brain className="w-3 h-3" />
                About Me
              </div>
              <div
                className="w-2 h-2 rounded-full"
                style={{
                  background: "#00E5FF",
                  boxShadow: "0 0 8px #00E5FF",
                  animation: "pulse 2s ease-in-out infinite",
                }}
              />
            </div>

            <div>
              <h3 className="font-display font-bold text-2xl text-white mb-3" style={{ fontFamily: "Space Grotesk" }}>
                Passionate about building the future with AI
              </h3>
              <p className="text-zinc-400 leading-relaxed text-sm">
                {personalInfo.about}
              </p>
            </div>

            <div className="flex flex-wrap gap-2 mt-auto">
              {["Python", "LangChain", "Next.js", "TensorFlow", "FastAPI", "OpenAI"].map((t) => (
                <span
                  key={t}
                  className="px-3 py-1 rounded-lg text-xs font-medium text-zinc-300"
                  style={{
                    background: "rgba(108,62,244,0.12)",
                    border: "1px solid rgba(108,62,244,0.25)",
                  }}
                >
                  {t}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-2 text-sm text-zinc-500">
              <MapPin className="w-4 h-4 text-primary" />
              {personalInfo.location}
            </div>
          </div>
        </GlassCard>

        {/* GitHub stats */}
        <GlassCard index={1} glowColor="#00E5FF">
          <a
            href={personalInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col h-full gap-4 group/link"
          >
            <div className="flex items-center justify-between">
              <div className="section-tag text-xs" style={{ color: "#00E5FF", borderColor: "rgba(0,229,255,0.25)", background: "rgba(0,229,255,0.08)" }}>
                <Github className="w-3 h-3" />
                GitHub
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-zinc-600 group-hover/link:text-zinc-400 transition-colors" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                { val: "500+", label: "Commits" },
                { val: "20+", label: "Repos" },
                { val: "100+", label: "PRs" },
                { val: "5+", label: "Stars" },
              ].map(({ val, label }) => (
                <div key={label} className="rounded-xl p-3 text-center" style={{ background: "rgba(255,255,255,0.03)" }}>
                  <div className="font-display font-bold text-lg" style={{ color: "#00E5FF" }}>{val}</div>
                  <div className="text-xs text-zinc-500 mt-0.5">{label}</div>
                </div>
              ))}
            </div>
          </a>
        </GlassCard>

        {/* Book a Call */}
        <GlassCard index={2} glowColor="#A855F7">
          <div className="flex flex-col h-full gap-4 min-h-[160px]">
            <div className="section-tag text-xs" style={{ color: "#A855F7", borderColor: "rgba(168,85,247,0.25)", background: "rgba(168,85,247,0.08)" }}>
              <Calendar className="w-3 h-3" />
              Book a Call
            </div>
            <div>
              <h3 className="font-display font-semibold text-white text-lg mb-1">Let&apos;s Talk</h3>
              <p className="text-xs text-zinc-500">Have a project in mind? I&apos;d love to hear about it.</p>
            </div>
            <a
              href="https://calendly.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-auto flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-sm font-semibold text-white transition-all hover:scale-[1.02]"
              style={{ background: "linear-gradient(135deg, #A855F7, #6C3EF4)" }}
            >
              Schedule Free Call
            </a>
          </div>
        </GlassCard>

        {/* Quick skills */}
        <GlassCard index={3} glowColor="#6C3EF4">
          <div className="flex flex-col gap-3">
            <div className="section-tag text-xs">
              <Code2 className="w-3 h-3" />
              Core Stack
            </div>
            <div className="flex flex-wrap gap-2">
              {topSkills.map((s) => (
                <span
                  key={s}
                  className="skill-badge text-xs"
                  style={{ padding: "4px 10px" }}
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        </GlassCard>

        {/* Location map placeholder */}
        <GlassCard index={4} glowColor="#00E5FF">
          <div className="flex flex-col h-full gap-3 min-h-[140px]">
            <div className="section-tag text-xs" style={{ color: "#00E5FF", borderColor: "rgba(0,229,255,0.25)", background: "rgba(0,229,255,0.08)" }}>
              <MapPin className="w-3 h-3" />
              Location
            </div>
            <div className="flex-1 relative rounded-xl overflow-hidden flex items-center justify-center"
              style={{ background: "rgba(0,229,255,0.04)", border: "1px solid rgba(0,229,255,0.1)", minHeight: 80 }}>
              {/* Globe visualization */}
              <div className="text-center">
                <div className="text-4xl mb-2">🇮🇳</div>
                <p className="text-xs text-zinc-400 font-medium">Bangalore, India</p>
                <p className="text-xs text-zinc-600">UTC +5:30</p>
              </div>
              {/* Animated rings */}
              {[1,2,3].map((i) => (
                <div
                  key={i}
                  className="absolute rounded-full"
                  style={{
                    inset: `${i * 20}px`,
                    border: `1px solid rgba(0,229,255,${0.15 - i * 0.04})`,
                    animation: `pulse ${2 + i}s ease-in-out ${i * 0.5}s infinite`,
                  }}
                />
              ))}
            </div>
          </div>
        </GlassCard>

        {/* Achievements */}
        <GlassCard className="lg:col-span-2" index={5} glowColor="#A855F7">
          <div className="flex flex-col gap-4">
            <div className="section-tag text-xs" style={{ color: "#A855F7", borderColor: "rgba(168,85,247,0.25)", background: "rgba(168,85,247,0.08)" }}>
              <Trophy className="w-3 h-3" />
              Achievements
            </div>
            <div className="grid grid-cols-2 gap-3">
              {achievements.map((a) => (
                <div
                  key={a.title}
                  className="flex items-start gap-3 p-3 rounded-xl transition-all hover:bg-white/5"
                  style={{ background: "rgba(255,255,255,0.02)" }}
                >
                  <span className="text-xl flex-shrink-0">{a.icon}</span>
                  <div>
                    <p className="text-sm font-semibold text-white">{a.title}</p>
                    <p className="text-xs text-zinc-500 mt-0.5">{a.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </GlassCard>

        {/* Education */}
        <GlassCard index={6} glowColor="#6C3EF4">
          <div className="flex flex-col gap-3">
            <div className="section-tag text-xs">
              <GraduationCap className="w-3 h-3" />
              Education
            </div>
            {education.map((e) => (
              <div key={e.degree}>
                <p className="font-semibold text-white text-sm">{e.degree}</p>
                <p className="text-xs text-zinc-400 mt-1">{e.institution}</p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs text-zinc-600">{e.period}</span>
                  <span
                    className="text-xs font-medium px-2 py-0.5 rounded-lg"
                    style={{ background: "rgba(108,62,244,0.15)", color: "#A78BFA" }}
                  >
                    {e.grade}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>

        {/* Blog teaser */}
        <GlassCard index={7} glowColor="#00E5FF">
          <div className="flex flex-col gap-3 min-h-[140px]">
            <div className="section-tag text-xs" style={{ color: "#00E5FF", borderColor: "rgba(0,229,255,0.25)", background: "rgba(0,229,255,0.08)" }}>
              <BookOpen className="w-3 h-3" />
              Writing
            </div>
            <h3 className="font-display font-semibold text-white text-sm">Latest from the blog</h3>
            {[
              "Building Production-Ready RAG Systems",
              "LangChain vs LlamaIndex: A Deep Dive",
            ].map((t) => (
              <div key={t} className="flex items-start gap-2 group/blog cursor-pointer">
                <div className="w-1 h-1 rounded-full bg-zinc-600 mt-2 flex-shrink-0 group-hover/blog:bg-primary transition-colors" />
                <p className="text-xs text-zinc-400 group-hover/blog:text-zinc-200 transition-colors">{t}</p>
              </div>
            ))}
          </div>
        </GlassCard>

      </div>
    </section>
  );
}
