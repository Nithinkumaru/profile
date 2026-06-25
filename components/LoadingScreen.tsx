"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Props { onComplete: () => void }

export default function LoadingScreen({ onComplete }: Props) {
  const [progress, setProgress] = useState(0);
  const [done, setDone]         = useState(false);
  const rafRef = useRef(0);
  const startRef = useRef(0);

  useEffect(() => {
    startRef.current = performance.now();

    const animate = (now: number) => {
      const elapsed = now - startRef.current;
      // ease-out over 1400 ms to 100
      const p = Math.min(100, Math.pow(elapsed / 1400, 0.55) * 100);
      setProgress(Math.round(p));

      if (p < 100) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        // hold briefly then exit
        setTimeout(() => setDone(true), 250);
      }
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {!done && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.55, ease: [0.22, 0.61, 0.36, 1] }}
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
            transition={{ duration: 0.6, ease: [0.22, 0.61, 0.36, 1] }}
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
            transition={{ delay: 0.2, duration: 0.5, ease: [0.22, 0.61, 0.36, 1] }}
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
              <motion.div
                style={{
                  height: "100%",
                  background: "linear-gradient(90deg, #235347, #8EB69B)",
                  borderRadius: 2,
                  width: `${progress}%`,
                }}
                transition={{ ease: "linear" }}
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
