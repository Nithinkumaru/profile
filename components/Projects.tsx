"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, ExternalLink, ChevronRight, Layers } from "lucide-react";
import { projects } from "@/lib/data";

function ProjectCard({ project, index }: { project: (typeof projects)[0]; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="project-card group cursor-pointer"
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ y: -8 }}
      style={{
        ["--hover-gradient" as string]: `linear-gradient(135deg, ${project.color}08 0%, transparent 100%)`,
      }}
    >
      {/* Image area */}
      <div
        className="relative h-44 overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${project.color}20, ${project.color}05)`,
        }}
      >
        {/* Animated gradient placeholder */}
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse at 30% 40%, ${project.color}30 0%, transparent 60%)`,
          }}
        />
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `linear-gradient(${project.color}20 1px, transparent 1px), linear-gradient(to right, ${project.color}20 1px, transparent 1px)`,
            backgroundSize: "32px 32px",
          }}
        />

        {/* Project number */}
        <div className="absolute top-4 left-4">
          <span
            className="text-xs font-mono font-medium px-2 py-1 rounded-lg"
            style={{
              background: `${project.color}20`,
              border: `1px solid ${project.color}30`,
              color: project.color,
            }}
          >
            0{project.id}
          </span>
        </div>

        {/* Featured badge */}
        {project.featured && (
          <div className="absolute top-4 right-4">
            <span
              className="text-xs font-medium px-2 py-1 rounded-lg"
              style={{
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.12)",
                color: "#F4F4F5",
              }}
            >
              Featured
            </span>
          </div>
        )}

        {/* Large icon area */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            animate={hovered ? { scale: 1.05, rotate: 3 } : { scale: 1, rotate: 0 }}
            transition={{ duration: 0.4 }}
            className="text-6xl opacity-30"
          >
            {project.id === 1 ? "🛡️" :
             project.id === 2 ? "🚀" :
             project.id === 3 ? "🤖" :
             project.id === 4 ? "📞" :
             project.id === 5 ? "❤️" : "💬"}
          </motion.div>
        </div>

        {/* Hover overlay */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              className="absolute inset-0 flex items-center justify-center gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              style={{ background: `${project.color}15`, backdropFilter: "blur(4px)" }}
            >
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-white transition-all hover:scale-105"
                style={{ background: "rgba(0,0,0,0.6)", border: "1px solid rgba(255,255,255,0.15)" }}
              >
                <Github className="w-4 h-4" />
                Code
              </a>
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-white transition-all hover:scale-105"
                style={{ background: project.color }}
              >
                <ExternalLink className="w-4 h-4" />
                Live
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col gap-3">
        <div>
          <h3
            className="font-display font-bold text-white text-lg leading-tight mb-1.5 group-hover:text-primary transition-colors"
            style={{ fontFamily: "Space Grotesk" }}
          >
            {project.title}
          </h3>
          <p className="text-sm text-zinc-400 leading-relaxed line-clamp-2">
            {project.description}
          </p>
        </div>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-1.5">
          {project.tech.slice(0, 4).map((t) => (
            <span
              key={t}
              className="px-2 py-0.5 rounded-md text-xs font-medium text-zinc-400"
              style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              {t}
            </span>
          ))}
          {project.tech.length > 4 && (
            <span
              className="px-2 py-0.5 rounded-md text-xs font-medium text-zinc-500"
              style={{ background: "rgba(255,255,255,0.05)" }}
            >
              +{project.tech.length - 4}
            </span>
          )}
        </div>

        {/* Links */}
        <div className="flex items-center gap-3 pt-1 border-t border-zinc-800">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs text-zinc-500 hover:text-zinc-200 transition-colors"
          >
            <Github className="w-3.5 h-3.5" />
            Source
          </a>
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs hover:opacity-80 transition-opacity ml-auto font-medium"
            style={{ color: project.color }}
          >
            View Project
            <ChevronRight className="w-3 h-3" />
          </a>
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const [showAll, setShowAll] = useState(false);
  const displayed = showAll ? projects : projects.slice(0, 3);

  return (
    <section id="projects" className="relative py-24 px-4 md:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <motion.div
        className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div>
          <div className="section-tag mb-4">
            <Layers className="w-3 h-3" />
            Projects
          </div>
          <h2
            className="font-display text-4xl md:text-5xl font-bold text-white"
            style={{ fontFamily: "Space Grotesk" }}
          >
            Things I&apos;ve{" "}
            <span className="gradient-text">built</span>
          </h2>
          <p className="text-zinc-400 mt-3 max-w-xl">
            A selection of projects ranging from AI systems to full-stack products,
            each solving a real problem.
          </p>
        </div>
      </motion.div>

      {/* Projects grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <AnimatePresence>
          {displayed.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </AnimatePresence>
      </div>

      {/* Show more */}
      {!showAll && projects.length > 3 && (
        <motion.div
          className="flex justify-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <button
            onClick={() => setShowAll(true)}
            className="flex items-center gap-2 px-8 py-3.5 rounded-2xl text-sm font-semibold text-zinc-300 hover:text-white transition-all hover:scale-[1.02] magnetic-btn"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            View All {projects.length} Projects
            <ChevronRight className="w-4 h-4" />
          </button>
        </motion.div>
      )}
    </section>
  );
}
