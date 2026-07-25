"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Link, Upload } from "lucide-react";
import { useState } from "react";
import { personalInfo } from "@/lib/data";

const shareOptions = [
  { label: "Copy Link", icon: "🔗", bg: "#6C3EF4", action: "copy" },
  { label: "Share", icon: "⬆️", bg: "#4a4a4a", action: "native" },
  { label: "X", icon: "✕", bg: "#000000", action: "twitter" },
  { label: "Facebook", icon: "f", bg: "#1877F2", action: "facebook" },
  { label: "WhatsApp", icon: "✓", bg: "#25D366", action: "whatsapp" },
  { label: "LinkedIn", icon: "in", bg: "#0077B5", action: "linkedin" },
  { label: "Telegram", icon: "✈", bg: "#229ED9", action: "telegram" },
  { label: "Reddit", icon: "r", bg: "#FF4500", action: "reddit" },
  { label: "Email", icon: "✉", bg: "#888888", action: "email" },
];

export default function ShareModal({ onClose }: { onClose: () => void }) {
  const [copied, setCopied] = useState(false);
  const url = typeof window !== "undefined" ? window.location.href : "";

  const handle = (action: string) => {
    const encodedUrl = encodeURIComponent(url);
    const text = encodeURIComponent(`Check out ${personalInfo.name}'s portfolio!`);

    switch (action) {
      case "copy":
        navigator.clipboard.writeText(url).then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        });
        break;
      case "twitter":
        window.open(`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${text}`, "_blank");
        break;
      case "facebook":
        window.open(`https://facebook.com/sharer/sharer.php?u=${encodedUrl}`, "_blank");
        break;
      case "whatsapp":
        window.open(`https://wa.me/?text=${text}%20${encodedUrl}`, "_blank");
        break;
      case "linkedin":
        window.open(`https://linkedin.com/sharing/share-offsite/?url=${encodedUrl}`, "_blank");
        break;
      case "telegram":
        window.open(`https://t.me/share/url?url=${encodedUrl}&text=${text}`, "_blank");
        break;
      case "reddit":
        window.open(`https://reddit.com/submit?url=${encodedUrl}&title=${text}`, "_blank");
        break;
      case "email":
        window.open(`mailto:?subject=${text}&body=${encodedUrl}`);
        break;
      case "native":
        if (navigator.share) {
          navigator.share({ title: personalInfo.name, url });
        }
        break;
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        className="share-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="share-modal"
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: "spring", bounce: 0.3, duration: 0.4 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-5">
            <span className="font-display font-semibold text-white text-lg" style={{ fontFamily: "Space Grotesk" }}>
              Share
            </span>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full flex items-center justify-center text-white/60 hover:text-white transition-colors"
              style={{ background: "rgba(255,255,255,0.1)" }}
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Preview card */}
          <div className="share-preview">
            <div
              className="absolute inset-0"
              style={{
                background: "linear-gradient(135deg, #1a0030 0%, #0a1040 50%, #000a20 100%)",
              }}
            />
            {/* Stars */}
            {[...Array(15)].map((_, i) => (
              <div
                key={i}
                className="absolute w-0.5 h-0.5 rounded-full bg-white/40"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
              />
            ))}
            <div className="relative z-10 flex flex-col items-center gap-2">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg text-white"
                style={{ background: "linear-gradient(135deg, #6C3EF4, #A855F7)" }}
              >
                NK
              </div>
              <p className="font-display font-bold text-white text-xl" style={{ fontFamily: "Space Grotesk" }}>
                {personalInfo.name}
              </p>
              <p className="text-white/70 text-xs">AI & ML Engineer</p>
            </div>
          </div>

          {/* Share grid */}
          <div className="grid grid-cols-4 gap-3">
            {shareOptions.slice(0, 8).map((opt) => (
              <button
                key={opt.action}
                onClick={() => handle(opt.action)}
                className="social-icon-btn flex-col gap-1"
                style={{ background: opt.bg }}
                title={opt.label}
              >
                <span className="text-white font-bold text-sm">{opt.icon}</span>
              </button>
            ))}
          </div>

          {/* Copy link bar */}
          <div
            className="mt-4 flex items-center gap-2 p-3 rounded-2xl cursor-pointer"
            style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)" }}
            onClick={() => handle("copy")}
          >
            <Link className="w-4 h-4 text-white/50 flex-shrink-0" />
            <span className="text-xs text-white/70 flex-1 truncate">{url}</span>
            <span className="text-xs font-semibold text-purple-300 flex-shrink-0">
              {copied ? "Copied!" : "Copy"}
            </span>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
