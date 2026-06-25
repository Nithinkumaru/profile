"use client";

import { motion } from "framer-motion";
import { Briefcase, CheckCircle2 } from "lucide-react";
import { experience } from "@/lib/data";

export default function Experience() {
  return (
    <section id="experience" className="relative py-24 px-4 md:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="section-tag mx-auto mb-4">
          <Briefcase className="w-3 h-3" />
          Experience
        </div>
        <h2
          className="font-display text-4xl md:text-5xl font-bold text-white"
          style={{ fontFamily: "Space Grotesk" }}
        >
          My <span className="gradient-text">journey</span>
        </h2>
        <p className="text-zinc-400 mt-3 max-w-xl mx-auto">
          Roles I&apos;ve held, problems I&apos;ve solved, and impact I&apos;ve made.
        </p>
      </motion.div>

      {/* Timeline */}
      <div className="relative max-w-3xl mx-auto">
        {/* Vertical line */}
        <div className="absolute left-6 md:left-8 top-0 bottom-0 w-px"
          style={{ background: "linear-gradient(180deg, transparent, #6C3EF4, #A855F7, transparent)" }}
        />

        <div className="flex flex-col gap-10">
          {experience.map((exp, i) => (
            <motion.div
              key={exp.id}
              className="relative flex gap-6 md:gap-10 pl-14 md:pl-20"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Timeline dot */}
              <div
                className="absolute left-3 md:left-5 top-5 w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0"
                style={{
                  borderColor: exp.color,
                  background: "#09090B",
                  boxShadow: `0 0 16px ${exp.color}40`,
                }}
              >
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ background: exp.color }}
                />
              </div>

              {/* Card */}
              <div
                className="glass-card flex-1 p-6 hover:border-white/15 transition-all"
                style={{ borderRadius: 20 }}
              >
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-4">
                  <div>
                    <h3
                      className="font-display font-bold text-white text-xl"
                      style={{ fontFamily: "Space Grotesk" }}
                    >
                      {exp.role}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-sm font-medium" style={{ color: exp.color }}>
                        {exp.company}
                      </span>
                      <span
                        className="text-xs px-2 py-0.5 rounded-lg"
                        style={{
                          background: `${exp.color}15`,
                          color: exp.color,
                          border: `1px solid ${exp.color}30`,
                        }}
                      >
                        {exp.type}
                      </span>
                    </div>
                  </div>
                  <span
                    className="flex-shrink-0 text-xs font-mono px-3 py-1.5 rounded-xl"
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      color: "#71717A",
                    }}
                  >
                    {exp.period}
                  </span>
                </div>

                {/* Description */}
                <p className="text-zinc-400 text-sm leading-relaxed mb-4">
                  {exp.description}
                </p>

                {/* Highlights */}
                <ul className="flex flex-col gap-2 mb-4">
                  {exp.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-2 text-sm text-zinc-400">
                      <CheckCircle2
                        className="w-4 h-4 flex-shrink-0 mt-0.5"
                        style={{ color: exp.color }}
                      />
                      {h}
                    </li>
                  ))}
                </ul>

                {/* Tech */}
                <div className="flex flex-wrap gap-1.5 pt-3 border-t border-zinc-800">
                  {exp.tech.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 rounded-lg text-xs font-medium"
                      style={{
                        background: `${exp.color}10`,
                        border: `1px solid ${exp.color}25`,
                        color: exp.color,
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
