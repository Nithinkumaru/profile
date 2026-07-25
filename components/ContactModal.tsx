"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { submitContact, trackEvent } from "@/lib/supabase";

const EASE = [0.22, 0.61, 0.36, 1] as const;

interface Props { onClose: () => void }

const INITIAL = { name: "", email: "", phone: "", message: "" };

function validate(f: typeof INITIAL) {
  const e: Partial<typeof INITIAL> = {};
  if (!f.name.trim())                             e.name    = "Name is required";
  if (!f.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = "Valid email required";
  if (!f.message.trim() || f.message.length < 10) e.message = "Message must be 10+ characters";
  return e;
}

export default function ContactModal({ onClose }: Props) {
  const [form,    setForm]    = useState(INITIAL);
  const [errors,  setErrors]  = useState<Partial<typeof INITIAL>>({});
  const [status,  setStatus]  = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errMsg,  setErrMsg]  = useState("");

  const set = (k: keyof typeof INITIAL) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(p => ({ ...p, [k]: e.target.value }));
    setErrors(p => ({ ...p, [k]: "" }));
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setStatus("loading");
    const { error } = await submitContact(form);

    if (error) {
      setStatus("error");
      setErrMsg(error === "Supabase not configured"
        ? "Form submission not yet connected. Please email directly."
        : error);
    } else {
      setStatus("success");
      await trackEvent("contact_submit");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
      style={{
        position: "fixed", inset: 0, zIndex: 300,
        background: "rgba(5,31,32,0.75)",
        backdropFilter: "blur(16px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: 20,
      }}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.92, opacity: 0, y: 10 }}
        transition={{ duration: 0.35, ease: EASE }}
        style={{
          width: "100%", maxWidth: 480,
          background: "rgba(11,43,38,0.9)",
          backdropFilter: "blur(40px)",
          border: "1px solid rgba(218,241,222,0.15)",
          borderRadius: 24, padding: 32,
          color: "#DAF1DE",
        }}
      >
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
          <div>
            <h2 style={{ fontSize: 22, fontWeight: 700, fontFamily: "Space Grotesk, sans-serif", lineHeight: 1.2 }}>
              Let&apos;s work together
            </h2>
            <p style={{ fontSize: 13, color: "rgba(218,241,222,0.5)", marginTop: 4 }}>
              I&apos;ll get back within 24 hours
            </p>
          </div>
          <button onClick={onClose} style={{
            width: 36, height: 36, borderRadius: "50%",
            background: "rgba(218,241,222,0.08)",
            border: "1px solid rgba(218,241,222,0.12)",
            color: "rgba(218,241,222,0.6)",
            display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer",
          }}>
            <X size={16} />
          </button>
        </div>

        {/* Success state */}
        <AnimatePresence mode="wait">
          {status === "success" ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, ease: EASE }}
              style={{ textAlign: "center", padding: "32px 0" }}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.1, type: "spring", stiffness: 200, damping: 14 }}
              >
                <CheckCircle2 size={56} color="#8EB69B" style={{ margin: "0 auto 16px" }} />
              </motion.div>
              <h3 style={{ fontSize: 20, fontWeight: 700, fontFamily: "Space Grotesk, sans-serif", marginBottom: 8 }}>
                Message sent!
              </h3>
              <p style={{ fontSize: 14, color: "rgba(218,241,222,0.5)", lineHeight: 1.6 }}>
                Thanks for reaching out. I&apos;ll reply to <strong style={{ color: "#8EB69B" }}>{form.email}</strong> shortly.
              </p>
              <button onClick={onClose} style={{
                marginTop: 24, padding: "10px 28px",
                background: "#235347", color: "#DAF1DE",
                border: "none", borderRadius: 50, fontSize: 14,
                fontWeight: 600, cursor: "pointer",
              }}>
                Close
              </button>
            </motion.div>
          ) : (
            <motion.form key="form" onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {/* Error banner */}
              {status === "error" && (
                <div style={{
                  display: "flex", gap: 8, alignItems: "center",
                  padding: "12px 16px", borderRadius: 12,
                  background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)",
                  fontSize: 13, color: "#fca5a5",
                }}>
                  <AlertCircle size={16} style={{ flexShrink: 0 }} />
                  {errMsg}
                </div>
              )}

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <Field label="Name *" error={errors.name}>
                  <input value={form.name} onChange={set("name")} placeholder="Nithin Kumar" required />
                </Field>
                <Field label="Email *" error={errors.email}>
                  <input type="email" value={form.email} onChange={set("email")} placeholder="you@email.com" required />
                </Field>
              </div>

              <Field label="Phone">
                <input value={form.phone} onChange={set("phone")} placeholder="+91 98765 43210" />
              </Field>

              <Field label="Message *" error={errors.message}>
                <textarea
                  value={form.message} onChange={set("message")}
                  placeholder="Tell me about your project..."
                  rows={4} required
                  style={{ resize: "none" }}
                />
              </Field>

              <button
                type="submit"
                disabled={status === "loading"}
                style={{
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                  padding: "13px 24px",
                  background: status === "loading" ? "rgba(35,83,71,0.5)" : "#235347",
                  color: "#DAF1DE", border: "none", borderRadius: 50,
                  fontSize: 14, fontWeight: 600, cursor: status === "loading" ? "not-allowed" : "pointer",
                  transition: "background 0.2s ease",
                  marginTop: 4,
                }}
              >
                {status === "loading" ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
                {status === "loading" ? "Sending…" : "Send Message"}
              </button>
            </motion.form>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactElement<{ style?: React.CSSProperties }> }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <label style={{ fontSize: 12, fontWeight: 600, color: "rgba(218,241,222,0.5)", letterSpacing: "0.05em" }}>
        {label}
      </label>
      <div style={{ position: "relative" }}>
        {React.cloneElement(children, {
          style: {
            width: "100%", padding: "11px 14px",
            background: "rgba(5,31,32,0.5)",
            border: `1px solid ${error ? "rgba(239,68,68,0.5)" : "rgba(218,241,222,0.12)"}`,
            borderRadius: 12, color: "#DAF1DE",
            fontSize: 14, outline: "none", fontFamily: "Inter, sans-serif",
            ...(children.props.style ?? {}),
          },
        })}
      </div>
      {error && <p style={{ fontSize: 12, color: "#fca5a5", marginTop: 2 }}>{error}</p>}
    </div>
  );
}
