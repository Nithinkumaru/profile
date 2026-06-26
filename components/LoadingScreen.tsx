"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Props { onComplete: () => void }

export default function LoadingScreen({ onComplete }: Props) {
  const [progress, setProgress] = useState(0);
  const [done, setDone]         = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    // Advance progress with a simple interval — works even when rAF is throttled
    timerRef.current = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(timerRef.current!);
          setTimeout(() => setDone(true), 200);
          return 100;
        }
        // Ease-out: fast at first, slow near 100
        const step = Math.max(1, Math.round((100 - p) * 0.12));
        return Math.min(100, p + step);
      });
    }, 30);

    // Hard failsafe — always complete within 2.5 s no matter what
    const failsafe = setTimeout(() => {
      clearInterval(timerRef.current!);
      setProgress(100);
      setTimeout(() => setDone(true), 200);
    }, 2500);

    return () => {
      clearInterval(timerRef.current!);
      clearTimeout(failsafe);
    };
  }, []);

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {!done && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.5, ease: [0.22, 0.61, 0.36, 1] }}
          style={{
            position: "fixed", inset: 0, zIndex: 9999,
            background: "#051F20",
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center",
            gap: 32,
          }}
        >
          {/* Logo mark */}
          <motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: [0.22, 0.61, 0.36, 1] }}
            style={{
              width: 72, height: 72, borderRadius: 20,
              background: "linear-gradient(135deg, #163832, #8EB69B)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 26, fontWeight: 800, color: "#DAF1DE",
              fontFamily: "Space Grotesk, sans-serif",
              boxShadow: "0 0 48px rgba(35,83,71,0.55)",
            }}
          >
            NK
          </motion.div>

          {/* Name */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.45, ease: [0.22, 0.61, 0.36, 1] }}
            style={{
              color: "rgba(218,241,222,0.5)",
              fontSize: 13, fontFamily: "Inter, sans-serif",
              letterSpacing: "0.18em", textTransform: "uppercase",
            }}
          >
            Nithin Kumar U
          </motion.p>

          {/* Progress bar */}
          <div style={{ width: 160, position: "relative" }}>
            <div style={{
              height: 2, width: "100%",
              background: "rgba(218,241,222,0.1)",
              borderRadius: 2, overflow: "hidden",
            }}>
              <div
                style={{
                  height: "100%",
                  background: "linear-gradient(90deg, #235347, #8EB69B)",
                  borderRadius: 2,
                  width: `${progress}%`,
                  transition: "width 0.03s linear",
                }}
              />
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
        </motion.div>
      )}
    </AnimatePresence>
  );
}
