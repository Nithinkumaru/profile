"use client";

import { useEffect, useState } from "react";

interface Props { onComplete: () => void }

export default function LoadingScreen({ onComplete }: Props) {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible]   = useState(true);

  useEffect(() => {
    let p = 0;

    const interval = setInterval(() => {
      p += Math.max(1, Math.round((100 - p) * 0.12));
      if (p >= 100) {
        p = 100;
        clearInterval(interval);
        // fade out then call onComplete directly — no AnimatePresence needed
        setTimeout(() => {
          setVisible(false);
          setTimeout(onComplete, 400); // wait for CSS fade
        }, 150);
      }
      setProgress(p);
    }, 30);

    // Absolute failsafe: always finish within 2s
    const failsafe = setTimeout(() => {
      clearInterval(interval);
      setProgress(100);
      setVisible(false);
      setTimeout(onComplete, 400);
    }, 2000);

    return () => {
      clearInterval(interval);
      clearTimeout(failsafe);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      style={{
        position: "fixed", inset: 0, zIndex: 9999,
        background: "#051F20",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        gap: 32,
        opacity: visible ? 1 : 0,
        transition: "opacity 0.4s ease",
        pointerEvents: visible ? "all" : "none",
      }}
    >
      {/* Logo */}
      <div style={{
        width: 72, height: 72, borderRadius: 20,
        background: "linear-gradient(135deg, #163832, #8EB69B)",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 26, fontWeight: 800, color: "#DAF1DE",
        fontFamily: "Space Grotesk, sans-serif",
        boxShadow: "0 0 48px rgba(35,83,71,0.55)",
      }}>
        NK
      </div>

      {/* Name */}
      <p style={{
        color: "rgba(218,241,222,0.5)",
        fontSize: 13, fontFamily: "Inter, sans-serif",
        letterSpacing: "0.18em", textTransform: "uppercase",
      }}>
        Nithin Kumar U
      </p>

      {/* Progress bar */}
      <div style={{ width: 160 }}>
        <div style={{
          height: 2, width: "100%",
          background: "rgba(218,241,222,0.1)",
          borderRadius: 2, overflow: "hidden",
        }}>
          <div style={{
            height: "100%",
            background: "linear-gradient(90deg, #235347, #8EB69B)",
            borderRadius: 2,
            width: `${progress}%`,
            transition: "width 0.03s linear",
          }} />
        </div>
        <p style={{
          textAlign: "center", marginTop: 10,
          color: "rgba(218,241,222,0.3)",
          fontSize: 11, fontFamily: "Space Grotesk, sans-serif",
          letterSpacing: "0.08em",
        }}>
          {progress}%
        </p>
      </div>
    </div>
  );
}
