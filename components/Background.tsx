"use client";

import { useEffect, useRef } from "react";

export default function Background() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    const stars: { x: number; y: number; r: number; a: number; speed: number }[] = [];
    for (let i = 0; i < 120; i++) {
      stars.push({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.2 + 0.2,
        a: Math.random(),
        speed: Math.random() * 0.008 + 0.002,
      });
    }

    let rafId: number;
    let t = 0;

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      t += 1;

      // Stars
      for (const s of stars) {
        s.a += s.speed;
        const alpha = (Math.sin(s.a) * 0.4 + 0.6) * 0.5;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200,180,255,${alpha})`;
        ctx.fill();
      }

      // Flowing lines
      for (let i = 0; i < 4; i++) {
        ctx.beginPath();
        const startX = (i / 4) * w;
        const amplitude = 30 + i * 10;
        const freq = 0.003 + i * 0.001;
        const offset = (t * (0.3 + i * 0.1)) % (w * 2);

        ctx.moveTo(startX - offset, h * 0.3 + i * h * 0.1);
        for (let x = -50; x < w + 50; x += 4) {
          const y = h * (0.25 + i * 0.12) + Math.sin((x + offset) * freq) * amplitude;
          ctx.lineTo(startX - offset + x + 50, y);
        }
        ctx.strokeStyle = `rgba(120,60,220,${0.04 - i * 0.005})`;
        ctx.lineWidth = 1;
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
      {/* Atmospheric orbs */}
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />
      <div className="orb orb-4" />

      {/* Grid */}
      <div className="bg-grid" />

      {/* Canvas for stars + flowing lines */}
      <canvas ref={canvasRef} className="bg-canvas" />

      {/* Vignette */}
      <div className="bg-vignette" />
    </div>
  );
}
