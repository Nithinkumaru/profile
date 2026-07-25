"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { submitBooking, trackEvent } from "@/lib/supabase";

const EASE = [0.22, 0.61, 0.36, 1] as const;

interface Props { onClose: () => void; initialTime?: string }

const TIMES = [
  "09:00 AM","10:00 AM","11:00 AM",
  "12:00 PM","02:00 PM","03:00 PM",
  "04:00 PM","05:00 PM","06:00 PM",
];

const INITIAL = { name: "", email: "", phone: "", preferred_date: "", preferred_time: "", notes: "" };

function validate(f: typeof INITIAL) {
  const e: Partial<typeof INITIAL> = {};
  if (!f.name.trim())                              e.name           = "Required";
  if (!f.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email        = "Valid email required";
  if (!f.preferred_date)                           e.preferred_date = "Required";
  if (!f.preferred_time)                           e.preferred_time = "Select a time";
  return e;
}

export default function BookingModal({ onClose, initialTime }: Props) {
  const [form,   setForm]   = useState(() => ({ ...INITIAL, preferred_time: initialTime ?? "" }));
  const [errors, setErrors] = useState<Partial<typeof INITIAL>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errMsg, setErrMsg] = useState("");

  const set = (k: keyof typeof INITIAL) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm(p => ({ ...p, [k]: e.target.value }));
    setErrors(p => ({ ...p, [k]: "" }));
  };

  const selectTime = (t: string) => {
    setForm(p => ({ ...p, preferred_time: t }));
    setErrors(p => ({ ...p, preferred_time: "" }));
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setStatus("loading");
    const { error } = await submitBooking(form);

    if (error) {
      setStatus("error");
      setErrMsg(error === "Supabase not configured"
        ? "Booking not yet connected. Please email me directly."
        : error);
    } else {
      setStatus("success");
      await trackEvent("booking_submit");
    }
  };

  // Min date = tomorrow
  const minDate = new Date();
  minDate.setDate(minDate.getDate() + 1);
  const minDateStr = minDate.toISOString().split("T")[0];

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
        overflowY: "auto",
      }}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.92, opacity: 0, y: 10 }}
        transition={{ duration: 0.35, ease: EASE }}
        style={{
          width: "100%", maxWidth: 500,
          background: "rgba(11,43,38,0.9)",
          backdropFilter: "blur(40px)",
          border: "1px solid rgba(218,241,222,0.15)",
          borderRadius: 24, padding: 32,
          color: "#DAF1DE",
          margin: "auto",
        }}
      >
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
          <div>
            <h2 style={{ fontSize: 22, fontWeight: 700, fontFamily: "Space Grotesk, sans-serif", lineHeight: 1.2 }}>
              Book a Consultation
            </h2>
            <p style={{ fontSize: 13, color: "var(--text-subtitle)", marginTop: 4 }}>
              30-minute free call — no commitment
            </p>
          </div>
          <button onClick={onClose} style={{
            width: 36, height: 36, borderRadius: "50%",
            background: "rgba(218,241,222,0.08)",
            border: "1px solid rgba(218,241,222,0.12)",
            color: "rgba(218,241,222,0.6)",
            display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer", flexShrink: 0,
          }}>
            <X size={16} />
          </button>
        </div>

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
                Booking confirmed!
              </h3>
              <p style={{ fontSize: 14, color: "var(--text-subtitle)", lineHeight: 1.6 }}>
                See you on <strong style={{ color: "#8EB69B" }}>{form.preferred_date}</strong> at{" "}
                <strong style={{ color: "#8EB69B" }}>{form.preferred_time}</strong>.
                <br />A confirmation will be sent to {form.email}.
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
                <BField label="Name *" error={errors.name}>
                  <input value={form.name} onChange={set("name")} placeholder="Your name" required />
                </BField>
                <BField label="Email *" error={errors.email}>
                  <input type="email" value={form.email} onChange={set("email")} placeholder="you@email.com" required />
                </BField>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <BField label="Phone">
                  <input value={form.phone} onChange={set("phone")} placeholder="+91 98765 43210" />
                </BField>
                <BField label="Preferred Date *" error={errors.preferred_date}>
                  <input type="date" value={form.preferred_date} onChange={set("preferred_date")} min={minDateStr} required />
                </BField>
              </div>

              {/* Time slots */}
              <div>
                <label style={{ fontSize: 12, fontWeight: 600, color: "var(--text-subtitle)", letterSpacing: "0.05em", display: "block", marginBottom: 10 }}>
                  Preferred Time *
                </label>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {TIMES.map(t => (
                    <button
                      key={t} type="button"
                      onClick={() => selectTime(t)}
                      style={{
                        padding: "8px 14px", borderRadius: 50, fontSize: 12, fontWeight: 600,
                        cursor: "pointer", transition: "all 0.15s ease",
                        background: form.preferred_time === t ? "#235347" : "rgba(218,241,222,0.06)",
                        color: form.preferred_time === t ? "#DAF1DE" : "var(--text-subtitle)",
                        border: `1px solid ${form.preferred_time === t ? "rgba(218,241,222,0.25)" : "rgba(218,241,222,0.1)"}`,
                      }}
                    >
                      {t}
                    </button>
                  ))}
                </div>
                {errors.preferred_time && (
                  <p style={{ fontSize: 12, color: "#fca5a5", marginTop: 6 }}>{errors.preferred_time}</p>
                )}
              </div>

              <BField label="Notes / Project Brief">
                <textarea
                  value={form.notes} onChange={set("notes")}
                  placeholder="Briefly describe what you'd like to discuss..."
                  rows={3} style={{ resize: "none" }}
                />
              </BField>

              <button
                type="submit"
                disabled={status === "loading"}
                style={{
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                  padding: "13px 24px",
                  background: status === "loading" ? "rgba(35,83,71,0.5)" : "#235347",
                  color: "#DAF1DE", border: "none", borderRadius: 50,
                  fontSize: 14, fontWeight: 600, cursor: status === "loading" ? "not-allowed" : "pointer",
                  transition: "background 0.2s ease", marginTop: 4,
                }}
              >
                {status === "loading" ? <Loader2 size={16} className="animate-spin" /> : <Calendar size={16} />}
                {status === "loading" ? "Booking…" : "Confirm Booking"}
              </button>
            </motion.form>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}

function BField({ label, error, children }: { label: string; error?: string; children: React.ReactElement<{ style?: React.CSSProperties }> }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <label style={{ fontSize: 12, fontWeight: 600, color: "var(--text-subtitle)", letterSpacing: "0.05em" }}>
        {label}
      </label>
      {React.cloneElement(children, {
        style: {
          width: "100%", padding: "11px 14px",
          background: "rgba(5,31,32,0.5)",
          border: `1px solid ${error ? "rgba(239,68,68,0.5)" : "rgba(218,241,222,0.12)"}`,
          borderRadius: 12, color: "#DAF1DE",
          fontSize: 14, outline: "none", fontFamily: "Inter, sans-serif",
          colorScheme: "dark",
          ...(children.props.style ?? {}),
        },
      })}
      {error && <p style={{ fontSize: 12, color: "#fca5a5", marginTop: 2 }}>{error}</p>}
    </div>
  );
}
