"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only on true pointer (mouse) devices
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    document.body.style.cursor = "none";

    const mouse = { x: -200, y: -200 };
    const ring$ = { x: -200, y: -200 };
    let rafId = 0;
    let hovered = false;
    let pressed = false;

    // ── Tick: ring lags behind with spring ──
    const tick = () => {
      ring$.x += (mouse.x - ring$.x) * 0.13;
      ring$.y += (mouse.y - ring$.y) * 0.13;
      ring.style.transform = `translate3d(${ring$.x}px,${ring$.y}px,0) translate(-50%,-50%)`;
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      dot.style.transform = `translate3d(${e.clientX}px,${e.clientY}px,0) translate(-50%,-50%)`;
    };

    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      const clickable = !!(
        t.closest("a") ||
        t.closest("button") ||
        t.closest('[role="button"]') ||
        t.classList.contains("card-btn") ||
        t.classList.contains("social-link") ||
        t.classList.contains("top-btn")
      );
      if (clickable === hovered) return;
      hovered = clickable;
      ring.style.width  = clickable ? "52px" : "36px";
      ring.style.height = clickable ? "52px" : "36px";
      ring.style.borderColor = clickable
        ? "rgba(108,62,244,0.8)"
        : "rgba(255,255,255,0.35)";
      ring.style.background = clickable
        ? "rgba(108,62,244,0.06)"
        : "transparent";
      dot.style.opacity = clickable ? "0.4" : "1";
    };

    const onDown = () => {
      pressed = true;
      dot.style.transform += " scale(0.5)";
      ring.style.transform += " scale(0.82)";
    };

    const onUp = () => {
      pressed = false;
      // scale will restore on next tick
    };

    const onLeave = () => {
      dot.style.opacity = "0";
      ring.style.opacity = "0";
    };
    const onEnter = () => {
      dot.style.opacity = hovered ? "0.4" : "1";
      ring.style.opacity = "1";
    };

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("mouseup", onUp);
    document.documentElement.addEventListener("mouseleave", onLeave);
    document.documentElement.addEventListener("mouseenter", onEnter);

    return () => {
      cancelAnimationFrame(rafId);
      document.body.style.cursor = "";
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("mouseup", onUp);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.documentElement.removeEventListener("mouseenter", onEnter);
    };
  }, []);

  return (
    <>
      {/* Dot — follows exactly */}
      <div
        ref={dotRef}
        aria-hidden="true"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 7,
          height: 7,
          borderRadius: "50%",
          background: "#7C3AED",
          pointerEvents: "none",
          zIndex: 99999,
          willChange: "transform",
          transition: "opacity 0.2s",
        }}
      />
      {/* Ring — lags with spring */}
      <div
        ref={ringRef}
        aria-hidden="true"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 36,
          height: 36,
          borderRadius: "50%",
          border: "1.5px solid rgba(255,255,255,0.35)",
          background: "transparent",
          pointerEvents: "none",
          zIndex: 99998,
          willChange: "transform",
          transition:
            "width 0.3s cubic-bezier(.22,.61,.36,1), height 0.3s cubic-bezier(.22,.61,.36,1), border-color 0.3s ease, background 0.3s ease, opacity 0.2s",
        }}
      />
    </>
  );
}
