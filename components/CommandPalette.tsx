"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, X, Home, Mail, Calendar, Github, Linkedin, Instagram,
  FolderGit2, ChevronRight,
} from "lucide-react";
import { useUI } from "@/components/UIProvider";
import { personalInfo, projects } from "@/lib/data";

const EASE = [0.22, 0.61, 0.36, 1] as const;

interface Command {
  id: string;
  label: string;
  section: string;
  icon: React.ComponentType<{ size?: number }>;
  run: () => void;
}

export default function CommandPalette() {
  const { openContact, openBooking } = useUI();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const commands: Command[] = [
    { id: "home", label: "Scroll to top", section: "Navigate", icon: Home,
      run: () => window.scrollTo({ top: 0, behavior: "smooth" }) },
    { id: "contact", label: "Open contact form", section: "Actions", icon: Mail, run: openContact },
    { id: "book", label: "Book a call", section: "Actions", icon: Calendar, run: () => openBooking() },
    ...projects.map((p) => ({
      id: `project-${p.id}`,
      label: `Open ${p.title} on GitHub`,
      section: "Projects",
      icon: FolderGit2,
      run: () => window.open(p.github, "_blank", "noopener,noreferrer"),
    })),
    { id: "github", label: "Open GitHub profile", section: "Social", icon: Github,
      run: () => window.open(personalInfo.github, "_blank", "noopener,noreferrer") },
    { id: "linkedin", label: "Open LinkedIn profile", section: "Social", icon: Linkedin,
      run: () => window.open(personalInfo.linkedin, "_blank", "noopener,noreferrer") },
    { id: "instagram", label: "Open Instagram profile", section: "Social", icon: Instagram,
      run: () => window.open(personalInfo.instagram, "_blank", "noopener,noreferrer") },
    { id: "email", label: `Email ${personalInfo.email}`, section: "Social", icon: Mail,
      run: () => window.open(`mailto:${personalInfo.email}`) },
  ];

  const filtered = query
    ? commands.filter(
        (c) =>
          c.label.toLowerCase().includes(query.toLowerCase()) ||
          c.section.toLowerCase().includes(query.toLowerCase())
      )
    : commands;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
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
    if (open) setTimeout(() => inputRef.current?.focus(), 50);
  }, [open]);

  useEffect(() => { setSelected(0); }, [query]);

  const execute = (cmd: Command) => {
    setOpen(false);
    cmd.run();
  };

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

  return (
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
            className="command-box"
            initial={{ opacity: 0, scale: 0.96, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            transition={{ duration: 0.2, ease: EASE }}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-label="Command palette"
          >
            <div className="command-input-row">
              <Search size={16} style={{ color: "var(--text-body)", flexShrink: 0 }} />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyNav}
                placeholder="Search commands..."
                className="command-input"
              />
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="command-esc"
                aria-label="Close command palette"
              >
                <X size={12} />
                esc
              </button>
            </div>

            <div className="command-results">
              {filtered.length === 0 ? (
                <div className="command-empty">No commands found</div>
              ) : (
                filtered.map((cmd, i) => {
                  const Icon = cmd.icon;
                  return (
                    <button
                      key={cmd.id}
                      type="button"
                      onClick={() => execute(cmd)}
                      onMouseEnter={() => setSelected(i)}
                      className={`command-item${selected === i ? " selected" : ""}`}
                    >
                      <div className="command-item-icon"><Icon size={14} /></div>
                      <span className="command-item-label">{cmd.label}</span>
                      <span className="command-item-section">{cmd.section}</span>
                      {selected === i && <ChevronRight size={13} style={{ color: "var(--text-body)", flexShrink: 0 }} />}
                    </button>
                  );
                })
              )}
            </div>

            <div className="command-footer">
              <span><kbd>↑↓</kbd> navigate</span>
              <span><kbd>↵</kbd> select</span>
              <span><kbd>esc</kbd> close</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
