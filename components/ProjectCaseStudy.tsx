"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft, ArrowRight, ChevronDown, Mail,
  CheckCircle2, Plus, Minus, ExternalLink,
} from "lucide-react";

import Background   from "@/components/Background";
import CustomCursor from "@/components/CustomCursor";
import { trackEvent } from "@/lib/supabase";
import type { projects } from "@/lib/data";

const ContactModal = dynamic(() => import("@/components/ContactModal"), { ssr: false });

const EASE = [0.22, 0.61, 0.36, 1] as const;

type Project = (typeof projects)[number];

function ContentBlock({ label, text }: { label: string; text: string }) {
  return (
    <div>
      <span className="content-label">{label}</span>
      <p className="content-text">{text}</p>
    </div>
  );
}

function TechnicalDetails({ tech, github }: { tech: string[]; github: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button
        className="tech-toggle"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
      >
        Technical Details {open ? <Minus size={14} /> : <Plus size={14} />}
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            className="tech-panel"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
          >
            <div className="tech-panel-inner">
              <div className="flex flex-wrap gap-2">
                {tech.map((t) => <span key={t} className="tag-chip">{t}</span>)}
              </div>
              <a
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                className="tech-secondary-link"
                onClick={() => trackEvent("github_click")}
              >
                Technical Details / GitHub <ExternalLink size={12} />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ProjectCaseStudy({ project }: { project: Project }) {
  const [contactOpen, setContactOpen] = useState(false);

  useEffect(() => { trackEvent("page_view"); }, []);

  const scrollToSolution = () =>
    document.getElementById("solution")?.scrollIntoView({ behavior: "smooth" });

  return (
    <>
      <CustomCursor />
      <Background />

      <div className="relative z-10">
        <Link href="/" className="top-btn back-btn" aria-label="Back to home" title="Back to home">
          <ArrowLeft size={16} style={{ color: "rgba(218,241,222,0.8)" }} />
        </Link>

        <motion.div
          className="project-hero"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <span className="section-label">{project.category}</span>
          <h1 className="project-title">{project.title}</h1>
          <p className="project-tagline">{project.tagline}</p>
          <div className="project-hero-actions">
            <button className="card-btn" onClick={scrollToSolution}>
              Explore the Solution <ChevronDown size={14} />
            </button>
            <button className="card-btn card-btn-outline" onClick={() => setContactOpen(true)}>
              Contact Me <ArrowRight size={14} />
            </button>
          </div>
        </motion.div>

        <div id="solution" className="project-content">
          <ContentBlock label="What It Is" text={project.whatItIs} />
          <ContentBlock label="Why It Was Built" text={project.whyBuilt} />

          <div>
            <span className="content-label">What It Does</span>
            <ul className="feature-list">
              {project.whatItDoes.map((f) => (
                <li key={f} className="feature-item">
                  <CheckCircle2 size={16} />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>

          <ContentBlock label="How It Helps" text={project.howItHelps} />

          <TechnicalDetails tech={project.tech} github={project.github} />
        </div>

        <div className="wid-cta" style={{ padding: "40px 24px 120px" }}>
          <p className="wid-cta-line">Have something similar in mind?</p>
          <p className="wid-cta-sub">Let&apos;s build a solution for your business.</p>
          <button className="card-btn" onClick={() => setContactOpen(true)}>
            <Mail size={14} /> Let&apos;s Work Together
          </button>
        </div>
      </div>

      <AnimatePresence>
        {contactOpen && <ContactModal key="contact" onClose={() => setContactOpen(false)} />}
      </AnimatePresence>
    </>
  );
}
