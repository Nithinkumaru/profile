"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  Globe, Cloud, Smartphone,
  Webhook, Layers, Workflow, Car,
  GraduationCap, HeartPulse, Landmark, ShoppingCart, Rocket, Building2, Wifi,
  Zap, TrendingUp, Sparkles, Gauge, Search, ShieldCheck, LifeBuoy, MousePointerClick,
  Link2, Bot, GitBranch, Mail, Calendar, Sparkles as OpenAiIcon,
  BrainCircuit, MessageSquareCode, Bug, Server, ArrowUpRight, ArrowRight,
} from "lucide-react";
import {
  SiReact, SiNextdotjs, SiTypescript, SiJavascript, SiHtml5, SiCss, SiTailwindcss,
  SiNodedotjs, SiExpress, SiPython, SiMongodb, SiMysql, SiPostgresql, SiFirebase,
  SiDocker, SiGit, SiGithub, SiLinux, SiTensorflow, SiPytorch, SiHuggingface,
} from "react-icons/si";
import { FaJava } from "react-icons/fa";

const EASE = [0.22, 0.61, 0.36, 1] as const;

type IconComp = React.ComponentType<{ size?: number; className?: string }>;

// ─── Shared: scroll reveal + magnetic CTA ─────────────────────────────────────

function Reveal({
  children, delay = 0, className = "",
}: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

function SectionHeader({ label, title, subtitle }: { label: string; title: string; subtitle: string }) {
  return (
    <Reveal className="section-header">
      <span className="section-label">{label}</span>
      <h2 className="section-title">{title}</h2>
      <p className="section-subtitle">{subtitle}</p>
    </Reveal>
  );
}

function MagneticButton({
  children, onClick, outline = false,
}: { children: React.ReactNode; onClick?: () => void; outline?: boolean }) {
  const ref = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const move = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left - r.width / 2) * 0.3;
      const y = (e.clientY - r.top - r.height / 2) * 0.3;
      el.style.transform = `translate(${x}px, ${y}px)`;
    };
    const leave = () => { el.style.transform = "translate(0,0)"; };

    el.addEventListener("mousemove", move);
    el.addEventListener("mouseleave", leave);
    return () => {
      el.removeEventListener("mousemove", move);
      el.removeEventListener("mouseleave", leave);
    };
  }, []);

  return (
    <button
      ref={ref}
      onClick={onClick}
      className={`card-btn magnetic-btn${outline ? " card-btn-outline" : ""}`}
      style={{ transition: "transform 0.15s cubic-bezier(.22,.61,.36,1), background 0.2s ease, box-shadow 0.2s ease" }}
    >
      {children}
    </button>
  );
}

// ─── Data ──────────────────────────────────────────────────────────────────────

type WhatIDoItem = {
  icon: IconComp;
  category: string;
  title: string;
  desc: string;
  tags: string[];
  gridClass: string;
  highlight?: boolean;
};

// gridClass (wid-1..wid-8) maps each card into a fixed desktop Bento template — see .what-i-do-grid in globals.css
const WHAT_I_DO: WhatIDoItem[] = [
  { icon: Smartphone, category: "App Development", title: "App Development",
    desc: "Modern, responsive mobile applications built with clean architecture and smooth user experiences.",
    tags: ["React Native", "Android", "API Integration", "Firebase"], gridClass: "wid-1" },
  { icon: Globe, category: "Web Development", title: "Web Development",
    desc: "Fast, scalable and modern websites and web applications designed for real businesses and startups.",
    tags: ["React", "Vite", "Node.js", "TypeScript", "REST APIs"], gridClass: "wid-2" },
  { icon: BrainCircuit, category: "AI & Machine Learning", title: "AI & ML",
    desc: "Intelligent solutions using machine learning, LLMs and AI-powered automation.",
    tags: ["Python", "Machine Learning", "LLMs", "Hugging Face", "LangChain"], gridClass: "wid-3", highlight: true },
  { icon: MessageSquareCode, category: "AI Chatbots", title: "AI Chatbots",
    desc: "Custom AI assistants and chatbots that understand users, answer questions and automate conversations.",
    tags: ["LLMs", "RAG", "LangChain", "Vector DB", "AI Agents"], gridClass: "wid-4" },
  { icon: Bug, category: "QA & Automation", title: "QA & Automation",
    desc: "Reliable software testing and automation to improve product quality and reduce repetitive manual testing.",
    tags: ["Manual Testing", "Automation Testing", "API Testing", "Postman"], gridClass: "wid-5" },
  { icon: Server, category: "Backend & APIs", title: "Backend & APIs",
    desc: "Secure and scalable backend systems, REST APIs and database-driven applications.",
    tags: ["Node.js", "Express", "TypeScript", "MySQL", "MongoDB"], gridClass: "wid-6" },
  { icon: Workflow, category: "Automation & Integrations", title: "Automation & Integrations",
    desc: "Connecting tools, APIs and business workflows to eliminate repetitive work and improve productivity.",
    tags: ["REST APIs", "Webhooks", "Workflow Automation", "Third-party APIs"], gridClass: "wid-7" },
  { icon: Cloud, category: "Deployment & Cloud", title: "Deployment & Cloud",
    desc: "Deploying and maintaining production-ready applications with reliable hosting and infrastructure.",
    tags: ["Vercel", "Hostinger", "GitHub", "Cloudflare", "Linux"], gridClass: "wid-8" },
];

const TECH_GROUPS: { name: string; items: { name: string; Icon: IconComp }[] }[] = [
  { name: "Frontend", items: [
    { name: "React", Icon: SiReact },
    { name: "Next.js", Icon: SiNextdotjs },
    { name: "TypeScript", Icon: SiTypescript },
    { name: "JavaScript", Icon: SiJavascript },
    { name: "HTML", Icon: SiHtml5 },
    { name: "CSS", Icon: SiCss },
    { name: "Tailwind CSS", Icon: SiTailwindcss },
  ] },
  { name: "Backend", items: [
    { name: "Node.js", Icon: SiNodedotjs },
    { name: "Express", Icon: SiExpress },
    { name: "Python", Icon: SiPython },
    { name: "Java", Icon: FaJava },
    { name: "REST API", Icon: Webhook },
  ] },
  { name: "AI", items: [
    { name: "TensorFlow", Icon: SiTensorflow },
    { name: "PyTorch", Icon: SiPytorch },
    { name: "LangChain", Icon: Link2 },
    { name: "OpenAI", Icon: OpenAiIcon },
    { name: "Hugging Face", Icon: SiHuggingface },
    { name: "Ollama", Icon: Bot },
  ] },
  { name: "Databases", items: [
    { name: "MongoDB", Icon: SiMongodb },
    { name: "MySQL", Icon: SiMysql },
    { name: "PostgreSQL", Icon: SiPostgresql },
    { name: "Firebase", Icon: SiFirebase },
  ] },
  { name: "DevOps", items: [
    { name: "Docker", Icon: SiDocker },
    { name: "Git", Icon: SiGit },
    { name: "GitHub", Icon: SiGithub },
    { name: "Linux", Icon: SiLinux },
    { name: "CI/CD", Icon: GitBranch },
  ] },
];

const PROCESS: { title: string; desc: string }[] = [
  { title: "Discovery", desc: "Understanding your goals, users, and constraints before writing a line of code." },
  { title: "Planning", desc: "Mapping the architecture, timeline, and milestones for the build." },
  { title: "Design", desc: "Wireframes and UI design aligned to your brand and user experience goals." },
  { title: "Development", desc: "Clean, well-tested code shipped in focused, reviewable increments." },
  { title: "Testing", desc: "Manual and automated testing across devices, edge cases, and real usage." },
  { title: "Deployment", desc: "Production rollout with monitoring, backups, and zero-downtime releases." },
  { title: "Maintenance", desc: "Ongoing support, updates, and improvements after launch." },
];

const INDUSTRIES: { name: string; icon: IconComp }[] = [
  { name: "Education", icon: GraduationCap },
  { name: "Healthcare", icon: HeartPulse },
  { name: "Automotive", icon: Car },
  { name: "FinTech", icon: TrendingUp },
  { name: "E-commerce", icon: ShoppingCart },
  { name: "AI Startups", icon: Rocket },
  { name: "Enterprise", icon: Building2 },
  { name: "Government", icon: Landmark },
  { name: "IoT", icon: Wifi },
];

const WHY: { icon: IconComp; title: string; desc: string }[] = [
  { icon: Zap, title: "Fast Delivery", desc: "Momentum from day one — no long, silent build cycles." },
  { icon: Layers, title: "Clean Architecture", desc: "Code that's organized, documented, and easy to extend." },
  { icon: TrendingUp, title: "Scalable Code", desc: "Built to handle growth, not just the demo." },
  { icon: Sparkles, title: "Modern UI", desc: "Interfaces that feel current, polished, and considered." },
  { icon: Gauge, title: "Performance Optimized", desc: "Fast load times and smooth interactions by default." },
  { icon: Search, title: "SEO Friendly", desc: "Structured for discoverability from the first commit." },
  { icon: ShieldCheck, title: "Secure Applications", desc: "Security treated as a requirement, not an afterthought." },
  { icon: LifeBuoy, title: "Long-term Support", desc: "I stick around after launch, not just to ship-and-run." },
  { icon: Rocket, title: "Latest Technologies", desc: "Current tools and frameworks, chosen deliberately." },
  { icon: MousePointerClick, title: "Micro Interactions", desc: "Small animated details that make products feel alive." },
];

// ─── Section bodies ──────────────────────────────────────────────────────────

function WhatIDo({ onContact }: { onContact: () => void }) {
  return (
    <>
      <div className="what-i-do-grid">
        {WHAT_I_DO.map((s, i) => (
          <Reveal key={s.title} delay={(i % 4) * 0.06} className={s.gridClass}>
            <div className={`wid-card${s.highlight ? " wid-card--highlight" : ""}`}>
              {s.highlight && <span className="wid-core-badge">Core Skill</span>}
              <div className="wid-card-header">
                <s.icon size={18} />
                <span className="wid-category">{s.category}</span>
              </div>
              <p className="wid-title">{s.title}</p>
              <p className="wid-desc">{s.desc}</p>
              <div className="wid-tags">
                {s.tags.map((t) => <span key={t} className="tag-chip">{t}</span>)}
              </div>
              <ArrowUpRight className="wid-arrow" size={16} aria-hidden="true" />
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.25} className="wid-cta">
        <p className="wid-cta-line">Have a project in mind?</p>
        <p className="wid-cta-sub">Let&apos;s build something useful.</p>
        <MagneticButton onClick={onContact}>Let&apos;s Work Together <ArrowRight size={14} /></MagneticButton>
      </Reveal>
    </>
  );
}

function TechStack() {
  return (
    <div>
      {TECH_GROUPS.map((g, gi) => (
        <Reveal key={g.name} delay={gi * 0.06} className="mb-10 last:mb-0">
          <p className="tech-group-label">{g.name}</p>
          <div className="flex flex-wrap gap-3">
            {g.items.map((t) => (
              <div key={t.name} className="tech-chip" data-tooltip={`${t.name} · ${g.name}`}>
                <t.Icon size={24} />
                <span>{t.name}</span>
              </div>
            ))}
          </div>
        </Reveal>
      ))}
    </div>
  );
}

function Process() {
  return (
    <div className="timeline">
      <motion.div
        className="timeline-line"
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1.1, ease: EASE }}
      />
      {PROCESS.map((step, i) => (
        <Reveal key={step.title} delay={i * 0.09} className="timeline-step">
          <div className="timeline-dot">{String(i + 1).padStart(2, "0")}</div>
          <div className="timeline-content">
            <p className="timeline-title">{step.title}</p>
            <p className="timeline-desc">{step.desc}</p>
          </div>
        </Reveal>
      ))}
    </div>
  );
}

function Industries() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
      {INDUSTRIES.map((ind, i) => (
        <Reveal key={ind.name} delay={(i % 6) * 0.05}>
          <div className="industry-chip"><ind.icon size={18} /><span>{ind.name}</span></div>
        </Reveal>
      ))}
    </div>
  );
}

function WhyWorkWithMe({ onContact, onBooking }: { onContact: () => void; onBooking: (time?: string) => void }) {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {WHY.map((w, i) => (
          <Reveal key={w.title} delay={(i % 3) * 0.06}>
            <div className="premium-card">
              <div className="premium-card-icon"><w.icon size={20} /></div>
              <p className="premium-card-title">{w.title}</p>
              <p className="premium-card-desc">{w.desc}</p>
            </div>
          </Reveal>
        ))}
      </div>
      <Reveal delay={0.2} className="flex flex-wrap justify-center gap-3 mt-12">
        <MagneticButton onClick={onContact}><Mail size={14} />Let&apos;s talk</MagneticButton>
        <MagneticButton outline onClick={() => onBooking()}><Calendar size={14} />Book a call</MagneticButton>
      </Reveal>
    </>
  );
}

// ─── Composed export ─────────────────────────────────────────────────────────

interface Props {
  onContact: () => void;
  onBooking: (time?: string) => void;
}

export default function PremiumSections({ onContact, onBooking }: Props) {
  return (
    <>
      <div className="section"><div className="section-inner">
        <SectionHeader
          label="Freelance Services"
          title="What I Do"
          subtitle="Building digital products, automating workflows, and solving real-world problems with technology."
        />
        <WhatIDo onContact={onContact} />
      </div></div>

      <div className="section-divider" />

      <div className="section"><div className="section-inner">
        <SectionHeader
          label="Toolbox"
          title="Technologies I Work With"
          subtitle="The languages, frameworks, and infrastructure behind everything I build."
        />
        <TechStack />
      </div></div>

      <div className="section-divider" />

      <div className="section"><div className="section-inner">
        <SectionHeader
          label="How I Work"
          title="Development Process"
          subtitle="A straightforward path from idea to a maintained product."
        />
        <Process />
      </div></div>

      <div className="section-divider" />

      <div className="section"><div className="section-inner">
        <SectionHeader
          label="Domains"
          title="Industries I Build For"
          subtitle="Products shipped across a range of industries and problem spaces."
        />
        <Industries />
      </div></div>

      <div className="section-divider" />

      <div className="section" style={{ paddingBottom: 120 }}><div className="section-inner">
        <SectionHeader
          label="Why Me"
          title="Why Work With Me"
          subtitle="What you can expect when we build together."
        />
        <WhyWorkWithMe onContact={onContact} onBooking={onBooking} />
      </div></div>
    </>
  );
}
