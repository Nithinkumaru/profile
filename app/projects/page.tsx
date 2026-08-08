"use client";

import { useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";

import Background   from "@/components/Background";
import CustomCursor from "@/components/CustomCursor";
import { projects } from "@/lib/data";
import { trackEvent } from "@/lib/supabase";

const EASE = [0.22, 0.61, 0.36, 1] as const;

export default function ProjectsPage() {
  useEffect(() => { trackEvent("page_view"); }, []);

  return (
    <>
      <CustomCursor />
      <Background />

      <div className="relative z-10">
        <Link href="/" className="top-btn back-btn" aria-label="Back to home" title="Back to home">
          <ArrowLeft size={16} style={{ color: "rgba(218,241,222,0.8)" }} />
        </Link>

        <div className="section" style={{ paddingBottom: 8 }}>
          <div className="section-inner">
            <div className="section-header">
              <span className="section-label">Portfolio</span>
              <h1 className="section-title">All Projects</h1>
              <p className="section-subtitle">
                A closer look at what I&apos;ve built — the problem each project solves and how it helps.
              </p>
            </div>
          </div>
        </div>

        <div className="section" style={{ paddingTop: 8 }}>
          <div className="section-inner">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {projects.map((p, i) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: (i % 3) * 0.07, ease: EASE }}
                >
                  <Link
                    href={`/projects/${p.slug}`}
                    className="premium-card"
                    onClick={() => trackEvent("project_click")}
                  >
                    <span className="card-label">{p.category}</span>
                    <p className="premium-card-title" style={{ marginTop: 10 }}>{p.title}</p>
                    <p className="premium-card-desc">{p.tagline}</p>
                    <div className="flex flex-wrap gap-1.5" style={{ marginTop: 14 }}>
                      {p.tech.slice(0, 3).map((t) => <span key={t} className="tag-chip">{t}</span>)}
                    </div>
                    <span className="project-card-cta">
                      Explore Project <ArrowRight size={13} />
                    </span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
