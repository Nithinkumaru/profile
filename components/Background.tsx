"use client";

import { useEffect, useRef } from "react";

export default function Background() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const orbsRef = useRef<HTMLDivElement[]>([]);

  // ── Mouse-reactive spotlight + parallax orbs ──
  useEffect(() => {
    const spotlight = spotlightRef.current;
    if (!spotlight) return;

    const orbs = orbsRef.current.filter(Boolean);
    const orbOffsets = [
      { x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 },
    ];
    const parallaxStrength = [0.016, 0.011, 0.02, 0.007];

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let cx = mx;
    let cy = my;
    let rafId = 0;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
    };

    const tick = () => {
      cx += (mx - cx) * 0.08;
      cy += (my - cy) * 0.08;

      // Spotlight follows cursor
      spotlight.style.background = `radial-gradient(circle 420px at ${cx}px ${cy}px, rgba(35,83,71,0.12) 0%, transparent 70%)`;

      // Orbs parallax away from center
      const normX = (cx / window.innerWidth  - 0.5) * 2;
      const normY = (cy / window.innerHeight - 0.5) * 2;

      orbs.forEach((orb, i) => {
        const s = parallaxStrength[i] ?? 0.01;
        orbOffsets[i].x += (-normX * 40 * s * 100 - orbOffsets[i].x) * 0.05;
        orbOffsets[i].y += (-normY * 40 * s * 100 - orbOffsets[i].y) * 0.05;
        orb.style.transform = `translate3d(${orbOffsets[i].x}px,${orbOffsets[i].y}px,0)`;
      });

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    window.addEventListener("mousemove", onMove, { passive: true });

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  // ── Canvas: twinkling stars + slow flowing lines ──
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    const stars = Array.from({ length: 140 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.1 + 0.2,
      phase: Math.random() * Math.PI * 2,
      speed: Math.random() * 0.006 + 0.003,
    }));

    let t = 0;
    let rafId = 0;

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      t++;

      // Stars (twinkle) — mint green tint
      for (const s of stars) {
        const a = (Math.sin(s.phase + t * s.speed) * 0.35 + 0.5) * 0.45;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(218,241,222,${a})`;
        ctx.fill();
      }

      // Slow flowing aurora lines — forest green
      for (let i = 0; i < 3; i++) {
        ctx.beginPath();
        const speed = (i + 1) * 0.15;
        const amp   = 20 + i * 12;
        const freq  = 0.0025 + i * 0.001;
        const yBase = h * (0.28 + i * 0.14);

        ctx.moveTo(0, yBase);
        for (let x = 0; x <= w; x += 3) {
          ctx.lineTo(x, yBase + Math.sin((x + t * speed * 2) * freq) * amp);
        }
        ctx.strokeStyle = `rgba(35,83,71,${0.055 - i * 0.012})`;
        ctx.lineWidth = 1.2;
        ctx.stroke();
      }

      rafId = requestAnimationFrame(draw);
    };

    const onResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };

    rafId = requestAnimationFrame(draw);
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div className="bg-scene">
      {/* Orbs with parallax via refs */}
      {[0, 1, 2, 3].map((i) => (
        <div
          key={i}
          ref={(el) => { if (el) orbsRef.current[i] = el; }}
          className={`orb orb-${i + 1}`}
          style={{ willChange: "transform" }}
        />
      ))}

      {/* Grid */}
      <div className="bg-grid" />

      {/* Canvas */}
      <canvas ref={canvasRef} className="bg-canvas" />

      {/* Mouse spotlight */}
      <div
        ref={spotlightRef}
        className="absolute inset-0 pointer-events-none"
        style={{ zIndex: 1, willChange: "background" }}
      />

      {/* Vignette */}
      <div className="bg-vignette" />
    </div>
  );
}
