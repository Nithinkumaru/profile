"use client";

import { motion } from "framer-motion";
import { Zap } from "lucide-react";
import { skills } from "@/lib/data";

const categoryColors: Record<string, { text: string; bg: string; border: string }> = {
  Languages:     { text: "#6C3EF4", bg: "rgba(108,62,244,0.1)",  border: "rgba(108,62,244,0.25)" },
  Frontend:      { text: "#00E5FF", bg: "rgba(0,229,255,0.1)",   border: "rgba(0,229,255,0.25)" },
  Backend:       { text: "#A855F7", bg: "rgba(168,85,247,0.1)",  border: "rgba(168,85,247,0.25)" },
  "AI & ML":     { text: "#F59E0B", bg: "rgba(245,158,11,0.1)",  border: "rgba(245,158,11,0.25)" },
  Databases:     { text: "#10B981", bg: "rgba(16,185,129,0.1)",  border: "rgba(16,185,129,0.25)" },
  "DevOps & Cloud": { text: "#EF4444", bg: "rgba(239,68,68,0.1)", border: "rgba(239,68,68,0.25)" },
};

const skillIcons: Record<string, string> = {
  Python: "🐍", JavaScript: "🟨", TypeScript: "💙", Java: "☕", "C++": "⚡", SQL: "🗄️",
  React: "⚛️", "Next.js": "▲", TailwindCSS: "🎨", "Framer Motion": "🎭", GSAP: "💫",
  "Node.js": "🟢", FastAPI: "⚡", Flask: "🌶️", Express: "🚂", "REST APIs": "🔗", GraphQL: "◉",
  TensorFlow: "🔷", PyTorch: "🔥", "Scikit-learn": "🧠", LangChain: "🔗", FAISS: "🔍",
  OpenAI: "🤖", "Hugging Face": "🤗", "Computer Vision": "👁️",
  Supabase: "💚", PostgreSQL: "🐘", MongoDB: "🍃", MySQL: "🐬", Redis: "❤️", Pinecone: "🌲",
  Docker: "🐳", AWS: "☁️", Git: "🔀", "GitHub Actions": "⚙️", Nginx: "🌐", Linux: "🐧",
};

export default function Skills() {
  return (
    <section id="skills" className="relative py-24 px-4 md:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="section-tag mx-auto mb-4">
          <Zap className="w-3 h-3" />
          Skills
        </div>
        <h2
          className="font-display text-4xl md:text-5xl font-bold text-white"
          style={{ fontFamily: "Space Grotesk" }}
        >
          My <span className="gradient-text">toolkit</span>
        </h2>
        <p className="text-zinc-400 mt-3 max-w-xl mx-auto">
          Technologies I use to bring ideas from concept to production-ready reality.
        </p>
      </motion.div>

      {/* Categories */}
      <div className="flex flex-col gap-10">
        {Object.entries(skills).map(([category, items], catIdx) => {
          const colors = categoryColors[category] || categoryColors["Languages"];
          return (
            <motion.div
              key={category}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: catIdx * 0.08 }}
              className="flex flex-col md:flex-row md:items-start gap-4 md:gap-8"
            >
              {/* Category label */}
              <div className="flex-shrink-0 w-36">
                <span
                  className="inline-flex items-center px-3 py-1.5 rounded-xl text-xs font-semibold"
                  style={{
                    color: colors.text,
                    background: colors.bg,
                    border: `1px solid ${colors.border}`,
                  }}
                >
                  {category}
                </span>
              </div>

              {/* Skill badges */}
              <div className="flex flex-wrap gap-2">
                {items.map((skill, i) => (
                  <motion.div
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.4,
                      delay: catIdx * 0.05 + i * 0.04,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    whileHover={{ y: -4, scale: 1.05 }}
                    className="skill-badge"
                    style={{
                      "--hover-color": colors.text,
                    } as React.CSSProperties}
                  >
                    {skillIcons[skill] && (
                      <span className="text-sm">{skillIcons[skill]}</span>
                    )}
                    <span>{skill}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Bottom stats */}
      <motion.div
        className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        {[
          { label: "Languages", count: skills["Languages"].length, color: "#6C3EF4" },
          { label: "Frameworks", count: skills["Frontend"].length + skills["Backend"].length, color: "#00E5FF" },
          { label: "AI & ML libs", count: skills["AI & ML"].length, color: "#F59E0B" },
          { label: "Tools", count: skills["DevOps & Cloud"].length + skills["Databases"].length, color: "#A855F7" },
        ].map(({ label, count, color }) => (
          <div
            key={label}
            className="glass-card p-5 flex flex-col items-center gap-2 text-center"
            style={{ borderRadius: 20 }}
          >
            <span
              className="font-display font-bold text-3xl"
              style={{ color }}
            >
              {count}+
            </span>
            <span className="text-sm text-zinc-400">{label}</span>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
