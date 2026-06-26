"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  Github, Linkedin, Instagram, Mail, ExternalLink, Calendar,
  Download, Code2, Briefcase, ArrowRight, Sparkles, ChevronRight,
  MapPin, Clock,
} from "lucide-react";
import { personalInfo, projects } from "@/lib/data";
import { trackEvent } from "@/lib/supabase";

const EASE = [0.22, 0.61, 0.36, 1] as const;
const GAP  = 12;   // px gap between columns
const CARD_H = "clamp(290px, 40vh, 400px)"; // outer carousel height

// ─── Card entrance animation ─────────────────────────────────────────────────
const colVariants = {
  hidden:  { opacity: 0, y: 28, scale: 0.96 },
  visible: (i: number) => ({
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.5, delay: 0.3 + (i % 7) * 0.06, ease: EASE },
  }),
};

// ─── 3D Tilt wrapper ─────────────────────────────────────────────────────────
function Card({
  children,
  className = "",
  style = {},
  index = 0,
  isDragging,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  index?: number;
  isDragging: React.MutableRefObject<boolean>;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const s   = useRef({ rx: 0, ry: 0, trx: 0, try_: 0, hover: false, raf: 0 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const p = s.current;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const tick = () => {
      p.rx += (p.trx - p.rx) * 0.1;
      p.ry += (p.try_ - p.ry) * 0.1;
      const lift = p.hover ? -6 : 0;
      const sc   = p.hover ? 1.02 : 1;
      const glow = p.hover
        ? "0 18px 52px rgba(5,31,32,0.55), inset 0 1px 0 rgba(218,241,222,0.1)"
        : "";
      el.style.transform  = `perspective(900px) rotateX(${p.rx}deg) rotateY(${p.ry}deg) translateY(${lift}px) scale(${sc})`;
      el.style.boxShadow  = glow;
      if (Math.abs(p.rx - p.trx) > 0.01 || Math.abs(p.ry - p.try_) > 0.01 || p.hover)
        p.raf = requestAnimationFrame(tick);
    };

    const enter = () => { if (isDragging.current) return; p.hover = true;  cancelAnimationFrame(p.raf); p.raf = requestAnimationFrame(tick); };
    const move  = (e: MouseEvent) => {
      if (isDragging.current || !p.hover) return;
      const r = el.getBoundingClientRect();
      p.trx  = -((e.clientY - r.top)  / r.height - 0.5) * 5;
      p.try_ =  ((e.clientX - r.left) / r.width  - 0.5) * 5;
    };
    const leave = () => {
      p.hover = false; p.trx = 0; p.try_ = 0;
      cancelAnimationFrame(p.raf); p.raf = requestAnimationFrame(tick);
    };

    el.addEventListener("mouseenter", enter);
    el.addEventListener("mousemove",  move);
    el.addEventListener("mouseleave", leave);
    return () => {
      cancelAnimationFrame(p.raf);
      el.removeEventListener("mouseenter", enter);
      el.removeEventListener("mousemove",  move);
      el.removeEventListener("mouseleave", leave);
    };
  }, [isDragging]);

  return (
    <motion.div
      ref={ref}
      custom={index}
      variants={colVariants}
      initial="hidden"
      animate="visible"
      className={`card ${className}`}
      style={{ willChange: "transform", transformStyle: "preserve-3d", height: "100%", ...style }}
    >
      <div className="absolute inset-0 pointer-events-none" style={{ borderRadius: 22, background: "linear-gradient(135deg,rgba(218,241,222,0.04) 0%,transparent 60%)" }} />
      {children}
    </motion.div>
  );
}

// ─── Infinite carousel physics hook ─────────────────────────────────────────
function useInfiniteCarousel(trackRef: React.RefObject<HTMLDivElement | null>) {
  const dragging  = useRef(false);
  const pos       = useRef(0);          // current translateX
  const vel       = useRef(0);          // velocity
  const singleW   = useRef(0);         // width of one set of columns
  const state     = useRef({
    lastX: 0, lastT: 0, raf: 0,
    idleTimer: 0, autoScroll: false,
  });

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const st = state.current;

    // Measure single set width after layout
    const init = () => {
      const total = track.scrollWidth;
      singleW.current = total / 3;
      pos.current     = -singleW.current; // start at middle copy
      track.style.transform = `translate3d(${pos.current}px,0,0)`;
    };
    init();

    const FRICTION  = 0.91;
    const AUTO_SPD  = 0.55;

    const tick = () => {
      // Auto-scroll when idle
      if (st.autoScroll && !dragging.current && Math.abs(vel.current) < 1) {
        vel.current += (AUTO_SPD - vel.current) * 0.04;
      }

      vel.current *= FRICTION;
      pos.current += vel.current;

      // Infinite loop — jump between copies (invisible because content identical)
      const sw = singleW.current;
      if (sw > 0) {
        if (pos.current < -2 * sw) pos.current += sw;
        if (pos.current > 0)        pos.current -= sw;
      }

      track.style.transform = `translate3d(${pos.current}px,0,0)`;

      const moving = Math.abs(vel.current) > 0.04;
      st.raf = moving || st.autoScroll ? requestAnimationFrame(tick) : 0;
    };

    const go = () => {
      if (!st.raf) st.raf = requestAnimationFrame(tick);
    };

    const resetIdleTimer = () => {
      st.autoScroll = false;
      clearTimeout(st.idleTimer);
      st.idleTimer = window.setTimeout(() => { st.autoScroll = true; go(); }, 2000);
    };

    // ── Wheel ─────────────────────────────
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      resetIdleTimer();
      const d = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      vel.current += (e.deltaMode === 1 ? d * 30 : d) * 0.5;
      vel.current = Math.max(-90, Math.min(90, vel.current));
      go();
    };

    // ── Pointer drag ───────────────────────
    const onDown = (e: PointerEvent) => {
      if (e.button !== 0) return;
      dragging.current = true;
      resetIdleTimer();
      st.lastX = e.clientX;
      st.lastT = performance.now();
      vel.current = 0;
      track.setPointerCapture(e.pointerId);
      track.style.cursor = "grabbing";
      cancelAnimationFrame(st.raf); st.raf = 0;
    };

    const onMove = (e: PointerEvent) => {
      if (!dragging.current) return;
      const dx  = e.clientX - st.lastX;
      const now = performance.now();
      const dt  = now - st.lastT;

      pos.current += dx;

      // Clamp to visible copies during drag
      const sw = singleW.current;
      if (sw > 0) {
        if (pos.current < -2 * sw) pos.current += sw;
        if (pos.current > 0)        pos.current -= sw;
      }

      track.style.transform = `translate3d(${pos.current}px,0,0)`;

      if (dt > 0 && dt < 80) vel.current = (-dx / dt) * 16;
      st.lastX = e.clientX;
      st.lastT = now;
    };

    const onUp = (e: PointerEvent) => {
      if (!dragging.current) return;
      dragging.current = false;
      track.releasePointerCapture(e.pointerId);
      track.style.cursor = "grab";
      // Cap release velocity for smoothness
      vel.current = Math.max(-60, Math.min(60, vel.current));
      go();
    };

    // ── Keyboard ──────────────────────────
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") { vel.current += 30; go(); }
      if (e.key === "ArrowLeft")  { vel.current -= 30; go(); }
    };

    // Start auto-scroll after 2s
    st.idleTimer = window.setTimeout(() => { st.autoScroll = true; go(); }, 2000);

    track.addEventListener("wheel",         onWheel, { passive: false });
    track.addEventListener("pointerdown",   onDown);
    track.addEventListener("pointermove",   onMove);
    track.addEventListener("pointerup",     onUp);
    track.addEventListener("pointercancel", onUp);
    window.addEventListener("keydown",      onKey);

    const ro = new ResizeObserver(init);
    ro.observe(track);

    return () => {
      cancelAnimationFrame(st.raf);
      clearTimeout(st.idleTimer);
      ro.disconnect();
      track.removeEventListener("wheel",         onWheel);
      track.removeEventListener("pointerdown",   onDown);
      track.removeEventListener("pointermove",   onMove);
      track.removeEventListener("pointerup",     onUp);
      track.removeEventListener("pointercancel", onUp);
      window.removeEventListener("keydown",      onKey);
    };
  }, [trackRef]);

  return dragging;
}

// ─── Individual card content ──────────────────────────────────────────────────

function ProfileCardContent() {
  return (
    <div className="p-5 flex flex-col gap-3 h-full">
      <div className="flex items-center gap-3">
        <div className="w-11 h-11 rounded-xl flex items-center justify-center font-bold text-sm flex-shrink-0"
          style={{ background: "linear-gradient(135deg,#163832,#8EB69B)", color: "#DAF1DE" }}>NK</div>
        <div>
          <p className="card-title" style={{ fontSize: 14, lineHeight: 1.2 }}>Nithin Kumar U</p>
          <p className="card-body text-xs">AI &amp; ML Engineer</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background:"#4ade80", boxShadow:"0 0 6px #4ade80" }} />
        <span className="card-body text-xs">Available for projects</span>
      </div>
      <p className="card-body text-xs flex-1 leading-relaxed">
        I build intelligent products at the intersection of AI and exceptional UX.
      </p>
      <div className="flex items-center gap-1.5">
        <MapPin size={11} style={{ color:"rgba(218,241,222,0.4)" }} />
        <span className="card-body text-xs">{personalInfo.location}</span>
      </div>
    </div>
  );
}

function HireMeCardContent({ onClick }: { onClick: () => void }) {
  return (
    <div className="p-5 flex flex-col gap-3 h-full">
      <div className="card-label"><ExternalLink size={10} />Let&apos;s work together</div>
      <p className="card-title" style={{ fontSize: 20 }}>Hire Me</p>
      <p className="card-body text-xs flex-1">Looking for an AI engineer or full-stack developer.</p>
      <button onClick={onClick} className="card-btn" style={{ justifyContent: "center" }}>
        <Mail size={13} />Get in touch
      </button>
    </div>
  );
}

function ContactCardContent({ onClick }: { onClick: () => void }) {
  return (
    <div className="p-5 flex flex-col gap-3 h-full">
      <div className="card-label"><Briefcase size={10} />Contact</div>
      <div className="flex flex-col gap-1.5 flex-1">
        <a href={`mailto:${personalInfo.email}`} className="card-body text-xs hover:underline truncate"
          onClick={() => trackEvent("github_click")}>{personalInfo.email}</a>
        <p className="card-body text-xs">{personalInfo.location}</p>
      </div>
      <div className="flex gap-2 mt-auto">
        {([
          { icon: Github,    href: personalInfo.github,    event: "github_click"   as const },
          { icon: Linkedin,  href: personalInfo.linkedin,  event: "linkedin_click" as const },
          { icon: Instagram, href: personalInfo.instagram, event: "github_click"   as const },
          { icon: Mail,      href: `mailto:${personalInfo.email}`, event: "contact_submit" as const },
        ] as const).map(({ icon: Icon, href, event }, i) => (
          <a key={i} href={href} target="_blank" rel="noopener noreferrer"
            className="social-link" style={{ width: 30, height: 30 }}
            onClick={() => trackEvent(event)}>
            <Icon size={13} />
          </a>
        ))}
      </div>
    </div>
  );
}

function BookingCardContent({ onClick }: { onClick: () => void }) {
  const slots = ["Mon–Fri  10 AM", "Mon–Fri  2 PM", "Sat  11 AM"];
  return (
    <div className="p-5 flex flex-col gap-3 h-full">
      <div className="card-label"><Calendar size={10} />Free 30-min call</div>
      <p className="card-title" style={{ fontSize: 20 }}>Book a Call</p>
      <p className="card-body text-xs">No commitment — just a chat about your project.</p>
      <div className="flex flex-col gap-1.5 flex-1">
        {slots.map(s => (
          <div key={s} className="flex items-center gap-2 px-3 py-2 rounded-xl"
            style={{ background:"rgba(35,83,71,0.35)", border:"1px solid rgba(218,241,222,0.1)" }}>
            <Clock size={11} style={{ color:"#8EB69B", flexShrink: 0 }} />
            <span className="card-body text-xs">{s}</span>
          </div>
        ))}
      </div>
      <button onClick={onClick} className="card-btn" style={{ justifyContent: "center" }}>
        <Calendar size={13} />Schedule 30 min
      </button>
    </div>
  );
}

function FeaturedProjectCardContent() {
  const p = projects[0];
  return (
    <div className="p-5 flex flex-col gap-3 h-full">
      <div className="relative rounded-xl overflow-hidden flex-shrink-0" style={{ height: 80 }}>
        <div className="absolute inset-0" style={{ background:"linear-gradient(135deg,rgba(22,56,50,0.6),rgba(142,182,155,0.15))" }} />
        <div className="absolute inset-0" style={{ backgroundImage:"linear-gradient(rgba(35,83,71,0.22) 1px,transparent 1px),linear-gradient(90deg,rgba(35,83,71,0.22) 1px,transparent 1px)", backgroundSize:"20px 20px" }} />
        <div className="absolute inset-0 flex items-center justify-center text-3xl select-none">🛡️</div>
      </div>
      <div className="card-label"><Sparkles size={10} />Featured</div>
      <p className="card-title" style={{ fontSize: 16, lineHeight: 1.3 }}>{p.title}</p>
      <p className="card-body text-xs flex-1 line-clamp-2">{p.description}</p>
      <div className="flex flex-wrap gap-1.5">
        {p.tech.slice(0,3).map(t => <span key={t} className="tech-badge" style={{ fontSize: 10 }}>{t}</span>)}
      </div>
      <a href={p.github} target="_blank" rel="noopener noreferrer" className="card-btn"
        style={{ justifyContent: "center" }} onClick={() => trackEvent("project_click")}>
        <Github size={13} />GitHub
      </a>
    </div>
  );
}

function GitHubCardContent() {
  return (
    <div className="p-5 flex flex-col gap-3 h-full">
      <div className="card-label"><Github size={10} />Open Source</div>
      <p className="card-title" style={{ fontSize: 18 }}>GitHub</p>
      <div className="flex gap-4 flex-1 items-center">
        {[["20+","Repos"],["500+","Commits"]].map(([v,l]) => (
          <div key={l} className="text-center">
            <p style={{ fontSize: 18, fontWeight: 800, color:"#8EB69B", fontFamily:"Space Grotesk,sans-serif" }}>{v}</p>
            <p className="card-body" style={{ fontSize: 10 }}>{l}</p>
          </div>
        ))}
      </div>
      <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="card-btn"
        style={{ justifyContent: "center" }} onClick={() => trackEvent("github_click")}>
        Browse <ExternalLink size={13} />
      </a>
    </div>
  );
}

function LinkedInCardContent() {
  return (
    <div className="p-5 flex flex-col gap-3 h-full">
      <div className="card-label"><Linkedin size={10} />Network</div>
      <p className="card-title" style={{ fontSize: 18 }}>LinkedIn</p>
      <p className="card-body text-xs flex-1">Open to freelance, full-time, and consulting roles.</p>
      <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="card-btn"
        style={{ justifyContent: "center" }} onClick={() => trackEvent("linkedin_click")}>
        Connect <ChevronRight size={13} />
      </a>
    </div>
  );
}

function ProjectsCardContent() {
  const icons = ["🛡️","🚀","🤖","📞"];
  return (
    <div className="p-5 flex flex-col gap-3 h-full">
      <div className="card-label"><Code2 size={10} />Portfolio</div>
      <p className="card-title" style={{ fontSize: 20 }}>My Projects</p>
      <div className="flex flex-col gap-2 flex-1 overflow-hidden">
        {projects.slice(0,4).map((p, i) => (
          <a key={p.id} href={p.github} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-3 p-2.5 rounded-xl group"
            style={{ background:"rgba(35,83,71,0.3)", transition:"background 0.2s ease" }}
            onClick={() => trackEvent("project_click")}
          >
            <span className="text-xl flex-shrink-0 select-none">{icons[i]}</span>
            <div className="flex-1 min-w-0">
              <p className="card-title truncate" style={{ fontSize: 13 }}>{p.title}</p>
              <p className="card-body text-xs truncate">{p.tech.slice(0,2).join(" · ")}</p>
            </div>
            <ExternalLink size={11} style={{ color:"rgba(218,241,222,0.3)", flexShrink: 0 }} />
          </a>
        ))}
      </div>
      <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="card-btn"
        style={{ justifyContent: "center" }} onClick={() => trackEvent("github_click")}>
        All projects <ArrowRight size={13} />
      </a>
    </div>
  );
}

function ResumeCardContent() {
  return (
    <div className="p-5 flex flex-col gap-3 h-full">
      <div className="card-label"><Download size={10} />Resume</div>
      <p className="card-title" style={{ fontSize: 18 }}>Download CV</p>
      <p className="card-body text-xs flex-1">AI Engineer · Full Stack · ML</p>
      <a href={personalInfo.resume} download className="card-btn" style={{ justifyContent: "center" }}
        onClick={() => trackEvent("resume_download")}>
        <Download size={13} />PDF
      </a>
    </div>
  );
}

function LatestBuildCardContent() {
  const p = projects[1];
  return (
    <div className="p-5 flex flex-col gap-3 h-full">
      <div className="card-label"><Sparkles size={10} />Latest</div>
      <p className="card-title" style={{ fontSize: 14, lineHeight: 1.3 }}>{p.title}</p>
      <div className="flex flex-wrap gap-1">
        {p.tech.slice(0,2).map(t => <span key={t} className="tech-badge" style={{ fontSize: 10 }}>{t}</span>)}
      </div>
      <a href={p.github} target="_blank" rel="noopener noreferrer" className="card-btn mt-auto"
        style={{ justifyContent: "center" }} onClick={() => trackEvent("project_click")}>
        View <ExternalLink size={13} />
      </a>
    </div>
  );
}

// ─── Column layout ────────────────────────────────────────────────────────────
// type: 'tall' = one card fills full height | 'pair' = two cards stacked

type ColDef =
  | { id: string; width: number; type: "tall"; content: React.ReactNode }
  | { id: string; width: number; type: "pair"; top: React.ReactNode; bottom: React.ReactNode };

function buildCols(onContact: () => void, onBooking: () => void): ColDef[] {
  return [
    { id: "profile",  width: 210, type: "tall", content: <ProfileCardContent /> },
    { id: "hireme",   width: 210, type: "pair",
      top:    <HireMeCardContent    onClick={onContact} />,
      bottom: <ContactCardContent   onClick={onContact} /> },
    { id: "booking",  width: 265, type: "tall", content: <BookingCardContent  onClick={onBooking} /> },
    { id: "featured", width: 265, type: "tall", content: <FeaturedProjectCardContent /> },
    { id: "socials",  width: 210, type: "pair",
      top:    <GitHubCardContent />,
      bottom: <LinkedInCardContent /> },
    { id: "projects", width: 320, type: "tall", content: <ProjectsCardContent /> },
    { id: "resume",   width: 210, type: "pair",
      top:    <ResumeCardContent />,
      bottom: <LatestBuildCardContent /> },
  ];
}

// ─── Main component ───────────────────────────────────────────────────────────
interface Props {
  onContact: () => void;
  onBooking: () => void;
}

export default function CardGrid({ onContact, onBooking }: Props) {
  const outerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const dragging = useInfiniteCarousel(trackRef);
  const [cols]   = useState(() => buildCols(onContact, onBooking));
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // 3 copies for seamless infinite loop
  const allCols = [...cols, ...cols, ...cols];

  // ── Mobile: vertical stacked cards ──────────────────────────────────────────
  if (isMobile) {
    return (
      <div className="mobile-card-grid">
        {cols.map((col, i) => {
          if (col.type === "tall") {
            return (
              <motion.div
                key={col.id}
                custom={i}
                variants={colVariants}
                initial="hidden"
                animate="visible"
                className="card mobile-card"
              >
                <div className="absolute inset-0 pointer-events-none" style={{ borderRadius: 22, background: "linear-gradient(135deg,rgba(218,241,222,0.04) 0%,transparent 60%)" }} />
                {col.content}
              </motion.div>
            );
          }
          return (
            <div key={col.id} className="mobile-card-pair">
              <motion.div
                custom={i}
                variants={colVariants}
                initial="hidden"
                animate="visible"
                className="card"
                style={{ minHeight: 180 }}
              >
                <div className="absolute inset-0 pointer-events-none" style={{ borderRadius: 22, background: "linear-gradient(135deg,rgba(218,241,222,0.04) 0%,transparent 60%)" }} />
                {col.top}
              </motion.div>
              <motion.div
                custom={i + 0.5}
                variants={colVariants}
                initial="hidden"
                animate="visible"
                className="card"
                style={{ minHeight: 180 }}
              >
                <div className="absolute inset-0 pointer-events-none" style={{ borderRadius: 22, background: "linear-gradient(135deg,rgba(218,241,222,0.04) 0%,transparent 60%)" }} />
                {col.bottom}
              </motion.div>
            </div>
          );
        })}
      </div>
    );
  }

  // ── Desktop: infinite horizontal carousel ────────────────────────────────────
  return (
    <div style={{ position: "relative", width: "100%" }}>
      {/* Fade masks at edges */}
      <div style={{
        position: "absolute", left: 0, top: 0, bottom: 0, width: 48, zIndex: 2,
        background: "linear-gradient(90deg, #051F20 0%, transparent 100%)",
        pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", right: 0, top: 0, bottom: 0, width: 48, zIndex: 2,
        background: "linear-gradient(270deg, #051F20 0%, transparent 100%)",
        pointerEvents: "none",
      }} />

      {/* Scroll container */}
      <div
        ref={outerRef}
        style={{
          overflow: "hidden",
          cursor: "grab",
          paddingLeft: 24,
          paddingRight: 24,
        }}
      >
        {/* Infinite track */}
        <div
          ref={trackRef}
          style={{
            display: "flex",
            gap: GAP,
            height: CARD_H,
            willChange: "transform",
            userSelect: "none",
          }}
        >
          {allCols.map((col, i) => {
            const colIdx = i % cols.length;
            if (col.type === "tall") {
              return (
                <div key={`${col.id}-${i}`} style={{ width: col.width, height: "100%", flexShrink: 0 }}>
                  <Card index={colIdx} isDragging={dragging} style={{ height: "100%" }}>
                    {col.content}
                  </Card>
                </div>
              );
            }
            return (
              <div key={`${col.id}-${i}`} style={{ width: col.width, height: "100%", flexShrink: 0, display: "flex", flexDirection: "column", gap: GAP }}>
                <Card index={colIdx} isDragging={dragging} style={{ flex: 1 }}>
                  {col.top}
                </Card>
                <Card index={colIdx + 1} isDragging={dragging} style={{ flex: 1 }}>
                  {col.bottom}
                </Card>
              </div>
            );
          })}
        </div>
      </div>

      {/* Scroll hint dots (decorative) */}
      <div style={{ display: "flex", gap: 5, justifyContent: "center", padding: "10px 0 0" }}>
        {[0,1,2,3,4].map(i => (
          <div key={i} style={{
            width: i === 2 ? 18 : 5, height: 5, borderRadius: 3,
            background: i === 2 ? "rgba(218,241,222,0.6)" : "rgba(218,241,222,0.18)",
            transition: "all 0.3s ease",
          }} />
        ))}
      </div>
    </div>
  );
}
