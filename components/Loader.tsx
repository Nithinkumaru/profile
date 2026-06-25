"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Loader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          if (intervalRef.current) clearInterval(intervalRef.current);
          setTimeout(() => {
            setDone(true);
            setTimeout(onComplete, 600);
          }, 300);
          return 100;
        }
        const increment = p < 60 ? Math.random() * 8 + 4 : p < 90 ? Math.random() * 3 + 1 : 1;
        return Math.min(p + increment, 100);
      });
    }, 80);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="loader-overlay"
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Background particles */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 rounded-full"
                style={{
                  background: i % 3 === 0 ? "#6C3EF4" : i % 3 === 1 ? "#00E5FF" : "#A855F7",
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  opacity: [0, 0.8, 0],
                  scale: [0, 1.5, 0],
                  y: [0, -60],
                }}
                transition={{
                  duration: 2 + Math.random() * 3,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                  ease: "easeOut",
                }}
              />
            ))}
          </div>

          {/* Logo */}
          <div className="relative flex flex-col items-center gap-10">
            {/* Animated N logo */}
            <div className="relative">
              {/* Outer rotating ring */}
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{
                  background:
                    "conic-gradient(from 0deg, #6C3EF4, #00E5FF, #A855F7, transparent)",
                  padding: 2,
                  borderRadius: "50%",
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              >
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: "50%",
                    background: "#09090B",
                  }}
                />
              </motion.div>

              {/* Logo box */}
              <motion.div
                className="relative w-24 h-24 rounded-3xl flex items-center justify-center"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(108,62,244,0.2), rgba(0,229,255,0.1))",
                  border: "1px solid rgba(108,62,244,0.4)",
                }}
                animate={{
                  boxShadow: [
                    "0 0 20px rgba(108,62,244,0.3)",
                    "0 0 60px rgba(108,62,244,0.6)",
                    "0 0 20px rgba(108,62,244,0.3)",
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <span
                  className="font-display text-4xl font-bold gradient-text"
                  style={{ fontFamily: "Space Grotesk, sans-serif" }}
                >
                  N
                </span>
              </motion.div>
            </div>

            {/* Name */}
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <p
                className="text-lg font-semibold tracking-widest text-zinc-400 uppercase"
                style={{ fontFamily: "Space Grotesk, sans-serif", letterSpacing: "0.3em" }}
              >
                Nithin Kumar U
              </p>
              <p className="text-xs text-zinc-600 mt-1 tracking-widest uppercase">
                AI &amp; Machine Learning Engineer
              </p>
            </motion.div>

            {/* Progress bar */}
            <div className="w-64 flex flex-col items-center gap-3">
              <div className="w-full h-px bg-zinc-800 rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    background: "linear-gradient(90deg, #6C3EF4, #00E5FF)",
                    width: `${progress}%`,
                    transition: "width 0.1s linear",
                  }}
                />
              </div>
              <span className="text-xs text-zinc-500 font-mono tabular-nums">
                {Math.round(progress)}%
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
