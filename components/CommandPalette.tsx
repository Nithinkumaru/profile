"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, FileText, User, Code, Briefcase, Mail, Star, ChevronRight } from "lucide-react";

const commands = [
  { id: "about", label: "Go to About", section: "Navigate", icon: User, href: "#about" },
  { id: "projects", label: "Go to Projects", section: "Navigate", icon: Code, href: "#projects" },
  { id: "experience", label: "Go to Experience", section: "Navigate", icon: Briefcase, href: "#experience" },
  { id: "skills", label: "Go to Skills", section: "Navigate", icon: Star, href: "#skills" },
  { id: "contact", label: "Go to Contact", section: "Navigate", icon: Mail, href: "#contact" },
  { id: "resume", label: "Download Resume", section: "Actions", icon: FileText, href: "/resume.pdf" },
  { id: "github", label: "Open GitHub", section: "Social", icon: Code, href: "https://github.com/NithinkumarU" },
  { id: "linkedin", label: "Open LinkedIn", section: "Social", icon: User, href: "https://linkedin.com/in/nithinkumaru" },
  { id: "email", label: "Send Email", section: "Contact", icon: Mail, href: "mailto:nithinkumaru@gmail.com" },
];

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = query
    ? commands.filter(
        (c) =>
          c.label.toLowerCase().includes(query.toLowerCase()) ||
          c.section.toLowerCase().includes(query.toLowerCase())
      )
    : commands;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setOpen((v) => !v);
        setQuery("");
        setSelected(0);
      }
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  useEffect(() => {
    setSelected(0);
  }, [query]);

  const handleKeyNav = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelected((s) => Math.min(s + 1, filtered.length - 1));
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelected((s) => Math.max(s - 1, 0));
    }
    if (e.key === "Enter") {
      const cmd = filtered[selected];
      if (cmd) execute(cmd);
    }
  };

  const execute = (cmd: (typeof commands)[0]) => {
    setOpen(false);
    if (cmd.href.startsWith("#")) {
      document.querySelector(cmd.href)?.scrollIntoView({ behavior: "smooth" });
    } else if (cmd.href.startsWith("http") || cmd.href.startsWith("mailto")) {
      window.open(cmd.href, "_blank");
    } else {
      window.open(cmd.href);
    }
  };

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            className="command-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={() => setOpen(false)}
          >
            <motion.div
              className="command-box mx-4"
              initial={{ opacity: 0, scale: 0.96, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -10 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Search input */}
              <div className="flex items-center gap-3 px-4 py-4 border-b border-zinc-800">
                <Search className="w-4 h-4 text-zinc-500 flex-shrink-0" />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={handleKeyNav}
                  placeholder="Search commands..."
                  className="flex-1 bg-transparent text-sm text-zinc-200 placeholder-zinc-600 outline-none"
                />
                <button
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-1 text-xs text-zinc-600 hover:text-zinc-400 transition-colors"
                >
                  <kbd className="px-1.5 py-0.5 rounded bg-zinc-800 font-mono text-xs">esc</kbd>
                </button>
              </div>

              {/* Results */}
              <div className="max-h-80 overflow-y-auto py-2">
                {filtered.length === 0 ? (
                  <div className="px-4 py-8 text-center text-sm text-zinc-600">
                    No commands found
                  </div>
                ) : (
                  filtered.map((cmd, i) => {
                    const Icon = cmd.icon;
                    return (
                      <button
                        key={cmd.id}
                        onClick={() => execute(cmd)}
                        onMouseEnter={() => setSelected(i)}
                        className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors ${
                          selected === i
                            ? "bg-zinc-800 text-zinc-100"
                            : "text-zinc-400 hover:text-zinc-200"
                        }`}
                      >
                        <div
                          className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${
                            selected === i ? "bg-primary/20" : "bg-zinc-800"
                          }`}
                        >
                          <Icon className="w-3.5 h-3.5" />
                        </div>
                        <span className="text-sm flex-1">{cmd.label}</span>
                        <span className="text-xs text-zinc-600">{cmd.section}</span>
                        {selected === i && <ChevronRight className="w-3 h-3 text-zinc-600" />}
                      </button>
                    );
                  })
                )}
              </div>

              {/* Footer */}
              <div className="flex items-center gap-4 px-4 py-3 border-t border-zinc-800">
                <span className="text-xs text-zinc-600 flex items-center gap-1">
                  <kbd className="px-1 py-0.5 rounded bg-zinc-800 font-mono text-xs">↑↓</kbd> navigate
                </span>
                <span className="text-xs text-zinc-600 flex items-center gap-1">
                  <kbd className="px-1 py-0.5 rounded bg-zinc-800 font-mono text-xs">↵</kbd> select
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Trigger hint (hidden, keyboard shortcut is the trigger) */}
    </>
  );
}
