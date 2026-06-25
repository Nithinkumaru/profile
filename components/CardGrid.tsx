"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import { motion } from "framer-motion";
import {
  Github, Linkedin, Instagram, Mail, ExternalLink, Calendar,
  Download, Code2, Briefcase, ArrowRight, Sparkles, ChevronRight,
} from "lucide-react";
import { personalInfo, projects } from "@/lib/data";

// ─── Premium easing ─────────────────────────────────────────────────────────
const EASE = [0.22, 0.61, 0.36, 1] as const;

// ─── Card entrance animation ─────────────────────────────────────────────────
const cardVariants = {
  hidden: { opacity: 0, y: 28, scale: 0.96 },
  visible: (i: number) => ({
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.55, delay: 0.35 + i * 0.07, ease: EASE },
  }),
};

// ─── 3D tilt card wrapper ────────────────────────────────────────────────────
function TiltCard({
  children,
  className = "",
  index = 0,
  isDragging,
}: {
  children: React.ReactNode;
  className?: string;
  index?: number;
  isDragging: React.MutableRefObject<boolean>;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const state = useRef({ rx: 0, ry: 0, trx: 0, try_: 0, hover: false, raf: 0 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const s = state.current;
    const isMouse = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!isMouse) return;

    const tick = () => {
      s.rx += (s.trx - s.rx) * 0.1;
      s.ry += (s.try_ - s.ry) * 0.1;

      const ty   = s.hover ? -8 : 0;
      const sc   = s.hover ? 1.02 : 1;
      const glow = s.hover ? "0 20px 60px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.15)" : "";

      el.style.transform = `perspective(900px) rotateX(${s.rx}deg) rotateY(${s.ry}deg) translateY(${ty}px) scale(${sc})`;
      el.style.boxShadow = glow;

      if (Math.abs(s.rx - s.trx) > 0.01 || Math.abs(s.ry - s.try_) > 0.01 || s.hover) {
        s.raf = requestAnimationFrame(tick);
      }
    };

    const onEnter = () => {
      if (isDragging.current) return;
      s.hover = true;
      cancelAnimationFrame(s.raf);
      s.raf = requestAnimationFrame(tick);
    };

    const onMove = (e: MouseEvent) => {
      if (isDragging.current || !s.hover) return;
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width  - 0.5;
      const y = (e.clientY - r.top)  / r.height - 0.5;
      s.trx = -y * 5;
      s.try_ = x * 5;
    };

    const onLeave = () => {
      s.hover = false;
      s.trx = 0;
      s.try_ = 0;
      cancelAnimationFrame(s.raf);
      s.raf = requestAnimationFrame(tick);
    };

    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mousemove",  onMove);
    el.addEventListener("mouseleave", onLeave);

    return () => {
      cancelAnimationFrame(s.raf);
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mousemove",  onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [isDragging]);

  return (
    <motion.div
      ref={ref}
      custom={index}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      className={`card ${className}`}
      style={{ willChange: "transform", transformStyle: "preserve-3d", cursor: "grab" }}
    >
      {/* Inner highlight that moves with tilt */}
      <div
        className="absolute inset-0 rounded-[22px] pointer-events-none transition-opacity duration-300"
        style={{
          background: "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, transparent 60%)",
          opacity: 1,
        }}
      />
      {children}
    </motion.div>
  );
}

// ─── Momentum horizontal scroller hook ──────────────────────────────────────
function useMomentumScroll(containerRef: React.RefObject<HTMLDivElement | null>) {
  const dragging = useRef(false);
  const state = useRef({
    pos: 0,      // current smooth scroll position
    target: 0,   // where we want to be
    vel: 0,      // velocity (from wheel or drag release)
    dragStartX: 0,
    dragStartPos: 0,
    lastX: 0,
    lastT: 0,
    raf: 0,
  });

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const p = state.current;
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v));
    const maxX = () => el.scrollWidth - el.clientWidth;

    // ── Snap to nearest card after settling ──
    const snapNearest = () => {
      const cards = Array.from(el.children) as HTMLElement[];
      let best = 0;
      let bestDist = Infinity;
      for (const c of cards) {
        const d = Math.abs(c.offsetLeft - p.pos);
        if (d < bestDist) { bestDist = d; best = c.offsetLeft; }
      }
      // soft-snap: aim for that position
      const dist = best - p.target;
      if (Math.abs(dist) < 2) return; // already there
      p.target += dist * 0.35;
    };

    // ── RAF loop ────────────────────────────────
    const tick = () => {
      const max = maxX();

      // Apply velocity (momentum)
      p.target = clamp(p.target + p.vel, 0, max);
      p.vel   *= 0.88; // friction

      // Spring toward target
      const diff = p.target - p.pos;
      p.pos += diff * 0.1;

      // Write to DOM
      el.scrollLeft = p.pos;

      const moving = Math.abs(p.vel) > 0.08 || Math.abs(diff) > 0.2;
      if (moving) {
        p.raf = requestAnimationFrame(tick);
      } else {
        // settled — snap to nearest card
        p.pos = p.target;
        el.scrollLeft = p.pos;
        snapNearest();
        if (Math.abs(p.target - p.pos) > 0.5) {
          p.raf = requestAnimationFrame(tick);
        }
      }
    };

    const go = () => {
      cancelAnimationFrame(p.raf);
      p.raf = requestAnimationFrame(tick);
    };

    // ── Wheel → horizontal ───────────────────────
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      // both vertical and horizontal wheel move the carousel
      const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      const normalized = e.deltaMode === 1 ? delta * 30 : delta; // line mode
      p.vel += normalized * 0.55;
      p.vel  = clamp(p.vel, -80, 80);
      go();
    };

    // ── Pointer drag ─────────────────────────────
    const onDown = (e: PointerEvent) => {
      // only main button
      if (e.button !== 0) return;
      dragging.current = true;
      p.dragStartX   = e.clientX;
      p.dragStartPos = p.pos;
      p.vel          = 0;
      p.lastX        = e.clientX;
      p.lastT        = performance.now();
      el.setPointerCapture(e.pointerId);
      el.style.cursor = "grabbing";
      cancelAnimationFrame(p.raf);
    };

    const onMove = (e: PointerEvent) => {
      if (!dragging.current) return;
      const dx      = p.dragStartX - e.clientX;
      const clamped = clamp(p.dragStartPos + dx, 0, maxX());

      // Direct: no spring while dragging (feels responsive)
      p.pos    = clamped;
      p.target = clamped;
      el.scrollLeft = p.pos;

      // Track velocity
      const now = performance.now();
      const dt  = now - p.lastT;
      if (dt > 0 && dt < 60) {
        p.vel = ((p.lastX - e.clientX) / dt) * 16; // 60fps
      }
      p.lastX = e.clientX;
      p.lastT = now;
    };

    const onUp = (e: PointerEvent) => {
      if (!dragging.current) return;
      dragging.current = false;
      el.releasePointerCapture(e.pointerId);
      el.style.cursor = "grab";
      go(); // let momentum continue
    };

    // ── Keyboard ────────────────────────────────
    const onKey = (e: KeyboardEvent) => {
      if (!el.matches(":focus-within") && document.activeElement?.closest(".cards-container") === null) return;
      const step = 220;
      if (e.key === "ArrowRight") { e.preventDefault(); p.target = clamp(p.target + step, 0, maxX()); go(); }
      if (e.key === "ArrowLeft")  { e.preventDefault(); p.target = clamp(p.target - step, 0, maxX()); go(); }
    };

    el.addEventListener("wheel",       onWheel, { passive: false });
    el.addEventListener("pointerdown", onDown);
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerup",   onUp);
    el.addEventListener("pointercancel", onUp);
    window.addEventListener("keydown", onKey);

    return () => {
      cancelAnimationFrame(p.raf);
      el.removeEventListener("wheel",       onWheel);
      el.removeEventListener("pointerdown", onDown);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerup",   onUp);
      el.removeEventListener("pointercancel", onUp);
      window.removeEventListener("keydown", onKey);
    };
  }, [containerRef]);

  return dragging;
}

// ─── Scroll dot indicator ────────────────────────────────────────────────────
function ScrollDots({ count, active }: { count: number; active: number }) {
  return (
    <div className="scroll-dots" aria-hidden="true">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className={`scroll-dot ${i === active ? "active" : ""}`} />
      ))}
    </div>
  );
}

// ─── Main CardGrid ────────────────────────────────────────────────────────────
export default function CardGrid() {
  const scrollRef  = useRef<HTMLDivElement>(null);
  const dragging   = useMomentumScroll(scrollRef);
  const [activeDot, setActiveDot] = useState(0);

  // Update active dot on scroll
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    let raf = 0;
    const check = () => {
      raf = requestAnimationFrame(() => {
        const first = (el.children[0] as HTMLElement)?.offsetWidth ?? 220;
        setActiveDot(Math.round(el.scrollLeft / (first + 12)));
      });
    };
    el.addEventListener("scroll", check, { passive: true });
    return () => { el.removeEventListener("scroll", check); cancelAnimationFrame(raf); };
  }, []);

  return (
    <div className="relative w-full">
      <div
        ref={scrollRef}
        className="cards-container"
        style={{ height: "clamp(320px, 42vh, 440px)" }}
        tabIndex={0}
        role="region"
        aria-label="Profile cards — drag or scroll to explore"
      >

        {/* 1 ── Profile (tall, 2-row) */}
        <TiltCard index={0} className="card-tall card-w-md p-5 flex flex-col gap-4" isDragging={dragging}>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-white text-base flex-shrink-0"
              style={{ background: "linear-gradient(135deg,#6C3EF4,#A855F7)" }}>
              NK
            </div>
            <div>
              <p className="card-title text-base leading-tight">Nithin Kumar U</p>
              <p className="card-body text-xs">AI &amp; ML Engineer</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full" style={{ background:"#22c55e", boxShadow:"0 0 6px #22c55e" }} />
            <span className="card-body text-xs">Available for projects</span>
          </div>
          <p className="card-body text-xs flex-1 leading-relaxed">
            I build intelligent products at the intersection of AI and exceptional UX.
          </p>
          <button className="card-btn group" onClick={() => {}}>
            Learn more
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
          </button>
        </TiltCard>

        {/* 2 ── Hire Me (short top) */}
        <TiltCard index={1} className="card-short card-w-md p-5 flex flex-col gap-3" isDragging={dragging}>
          <div className="card-label"><ExternalLink className="w-3 h-3" />Let&apos;s work together</div>
          <p className="card-title text-lg">Hire Me</p>
          <a href={`mailto:${personalInfo.email}`} className="card-btn mt-auto group">
            <Mail className="w-3.5 h-3.5" />
            Get in touch
          </a>
        </TiltCard>

        {/* 3 ── Contact / socials (short bottom) */}
        <TiltCard index={2} className="card-short card-w-md p-5 flex flex-col gap-3" isDragging={dragging}>
          <div className="card-label"><Briefcase className="w-3 h-3" />Reach out</div>
          <div className="flex flex-col gap-1 flex-1">
            <p className="card-body text-xs">{personalInfo.email}</p>
            <p className="card-body text-xs">{personalInfo.location}</p>
          </div>
          <div className="flex gap-2 mt-auto">
            {[
              { icon: Github,    href: personalInfo.github },
              { icon: Linkedin,  href: personalInfo.linkedin },
              { icon: Instagram, href: personalInfo.instagram },
              { icon: Mail,      href: `mailto:${personalInfo.email}` },
            ].map(({ icon: Icon, href }, i) => (
              <a key={i} href={href} target="_blank" rel="noopener noreferrer"
                className="social-link" style={{ width:30, height:30 }}>
                <Icon className="w-3.5 h-3.5" />
              </a>
            ))}
          </div>
        </TiltCard>

        {/* 4 ── Book a Call (tall) */}
        <TiltCard index={3} className="card-tall card-w-lg p-5 flex flex-col gap-4" isDragging={dragging}>
          <div className="card-label"><Calendar className="w-3 h-3" />Free consultation</div>
          <p className="card-title">Book a Call</p>
          <p className="card-body text-xs flex-1">
            Have a project in mind? Let&apos;s chat! Free 30-minute consultations available.
          </p>
          <div className="flex flex-col gap-2">
            {["Mon 10:00 AM", "Wed 2:00 PM", "Fri 11:00 AM"].map((slot) => (
              <div key={slot} className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs"
                style={{ background:"rgba(255,255,255,0.14)", border:"1px solid rgba(255,255,255,0.2)" }}>
                <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background:"#22c55e" }} />
                <span className="card-body">{slot}</span>
                <span className="ml-auto card-body opacity-60">30 min</span>
              </div>
            ))}
          </div>
          <a href="https://calendly.com/" target="_blank" rel="noopener noreferrer" className="card-btn group">
            <Calendar className="w-3.5 h-3.5" />
            Schedule 30-min call
          </a>
        </TiltCard>

        {/* 5 ── Featured Project (tall) */}
        <TiltCard index={4} className="card-tall card-w-lg p-5 flex flex-col gap-4 overflow-hidden" isDragging={dragging}>
          <div className="relative rounded-xl overflow-hidden flex-shrink-0" style={{ height:96 }}>
            <div className="absolute inset-0"
              style={{ background:"linear-gradient(135deg,rgba(108,62,244,0.3),rgba(0,229,255,0.15))" }} />
            <div className="absolute inset-0"
              style={{ backgroundImage:"linear-gradient(rgba(108,62,244,0.18) 1px,transparent 1px),linear-gradient(90deg,rgba(108,62,244,0.18) 1px,transparent 1px)", backgroundSize:"20px 20px" }} />
            <div className="absolute inset-0 flex items-center justify-center text-4xl select-none">🛡️</div>
          </div>
          <div className="card-label"><ExternalLink className="w-3 h-3" />Featured Project</div>
          <p className="card-title text-lg leading-tight">{projects[0].title}</p>
          <p className="card-body text-xs flex-1 line-clamp-2">{projects[0].description}</p>
          <div className="flex flex-wrap gap-1.5">
            {projects[0].tech.slice(0, 3).map((t) => (
              <span key={t} className="tech-badge">{t}</span>
            ))}
          </div>
          <a href={projects[0].github} target="_blank" rel="noopener noreferrer" className="card-btn group">
            <Github className="w-3.5 h-3.5" />
            View on GitHub
          </a>
        </TiltCard>

        {/* 6 ── GitHub stats (short top) */}
        <TiltCard index={5} className="card-short card-w-md p-5 flex flex-col gap-3" isDragging={dragging}>
          <div className="card-label"><Github className="w-3 h-3" />GitHub</div>
          <p className="card-title text-lg">My Code</p>
          <div className="flex gap-4 mt-auto">
            {[["20+","Repos"],["500+","Commits"]].map(([v,l]) => (
              <div key={l} className="text-center">
                <p className="font-bold text-lg" style={{ color:"#6C3EF4", fontFamily:"Space Grotesk" }}>{v}</p>
                <p className="card-body" style={{ fontSize:10 }}>{l}</p>
              </div>
            ))}
          </div>
          <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="card-btn group">
            Browse <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </TiltCard>

        {/* 7 ── LinkedIn (short bottom) */}
        <TiltCard index={6} className="card-short card-w-md p-5 flex flex-col gap-3" isDragging={dragging}>
          <div className="card-label"><Linkedin className="w-3 h-3" />LinkedIn</div>
          <p className="card-title text-lg">Connect</p>
          <p className="card-body text-xs flex-1">Let&apos;s build a professional connection!</p>
          <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="card-btn group">
            View Profile <ChevronRight className="w-3.5 h-3.5" />
          </a>
        </TiltCard>

        {/* 8 ── All projects (tall) */}
        <TiltCard index={7} className="card-tall card-w-xl p-5 flex flex-col gap-3" isDragging={dragging}>
          <div className="card-label"><Code2 className="w-3 h-3" />View My Work</div>
          <p className="card-title">My Projects</p>
          <p className="card-body text-xs">AI systems, full-stack apps and ML models shipped to production.</p>
          <div className="flex flex-col gap-2 flex-1">
            {projects.slice(0, 4).map((p, i) => (
              <a key={p.id} href={p.github} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 rounded-xl transition-all duration-200 hover:bg-white/20 group"
                style={{ background:"rgba(255,255,255,0.1)" }}>
                <span className="text-xl flex-shrink-0 select-none">
                  {["🛡️","🚀","🤖","📞"][i]}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="card-title text-sm truncate">{p.title}</p>
                  <p className="card-body text-xs truncate">{p.tech.slice(0,2).join(" · ")}</p>
                </div>
                <ExternalLink className="w-3 h-3 text-black/30 group-hover:text-black/60 flex-shrink-0 transition-colors" />
              </a>
            ))}
          </div>
          <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="card-btn group">
            See all projects <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
          </a>
        </TiltCard>

        {/* 9 ── Resume (short top) */}
        <TiltCard index={8} className="card-short card-w-md p-5 flex flex-col gap-3" isDragging={dragging}>
          <div className="card-label"><Download className="w-3 h-3" />Resume</div>
          <p className="card-title text-lg">Download CV</p>
          <a href={personalInfo.resume} download className="card-btn mt-auto group">
            <Download className="w-3.5 h-3.5" />
            Download PDF
          </a>
        </TiltCard>

        {/* 10 ── Latest build (short bottom) */}
        <TiltCard index={9} className="card-short card-w-md p-5 flex flex-col gap-3" isDragging={dragging}>
          <div className="card-label"><Sparkles className="w-3 h-3" />Latest Build</div>
          <p className="card-title text-base leading-tight">{projects[1].title}</p>
          <div className="flex flex-wrap gap-1">
            {projects[1].tech.slice(0,2).map((t) => (
              <span key={t} className="tech-badge" style={{ fontSize:10, padding:"2px 8px" }}>{t}</span>
            ))}
          </div>
          <a href={projects[1].github} target="_blank" rel="noopener noreferrer" className="card-btn mt-auto group">
            View <ExternalLink className="w-3 h-3" />
          </a>
        </TiltCard>

      </div>

      {/* Scroll indicator dots */}
      <ScrollDots count={5} active={Math.min(activeDot, 4)} />
    </div>
  );
}
