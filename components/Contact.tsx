"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Github, Linkedin, Instagram, Send, Calendar, Sparkles } from "lucide-react";
import { personalInfo } from "@/lib/data";

export default function Contact() {
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    // Simulate send (replace with actual API call)
    await new Promise((r) => setTimeout(r, 1500));
    setSending(false);
    setSent(true);
    setFormState({ name: "", email: "", message: "" });
  };

  const contacts = [
    { icon: Mail, label: "Email", value: personalInfo.email, href: `mailto:${personalInfo.email}` },
    { icon: Phone, label: "Phone", value: personalInfo.phone, href: `tel:${personalInfo.phone}` },
    { icon: MapPin, label: "Location", value: personalInfo.location, href: "#" },
  ];

  const socials = [
    { icon: Github, label: "GitHub", href: personalInfo.github, color: "#FFFFFF" },
    { icon: Linkedin, label: "LinkedIn", href: personalInfo.linkedin, color: "#0077B5" },
    { icon: Instagram, label: "Instagram", href: personalInfo.instagram, color: "#E1306C" },
    { icon: Mail, label: "Email", href: `mailto:${personalInfo.email}`, color: "#6C3EF4" },
  ];

  return (
    <section id="contact" className="relative py-24 px-4 md:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="section-tag mx-auto mb-4">
          <Sparkles className="w-3 h-3" />
          Contact
        </div>
        <h2
          className="font-display text-4xl md:text-5xl font-bold text-white"
          style={{ fontFamily: "Space Grotesk" }}
        >
          Let&apos;s <span className="gradient-text">work together</span>
        </h2>
        <p className="text-zinc-400 mt-3 max-w-xl mx-auto">
          Have a project in mind? I&apos;m always open to discussing new ideas and opportunities.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">

        {/* Left — info */}
        <motion.div
          className="flex flex-col gap-6"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Book a call CTA */}
          <div
            className="glass-card p-6 relative overflow-hidden"
            style={{ borderRadius: 20 }}
          >
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: "radial-gradient(ellipse at 0% 0%, rgba(108,62,244,0.15) 0%, transparent 60%)",
              }}
            />
            <div className="relative">
              <Calendar className="w-8 h-8 mb-3" style={{ color: "#6C3EF4" }} />
              <h3 className="font-display font-bold text-white text-xl mb-2" style={{ fontFamily: "Space Grotesk" }}>
                Book a Free Consultation
              </h3>
              <p className="text-zinc-400 text-sm mb-5">
                Let&apos;s discuss your project, ideas, or how I can help your team.
              </p>
              <a
                href="https://calendly.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white transition-all hover:scale-[1.02] magnetic-btn"
                style={{
                  background: "linear-gradient(135deg, #6C3EF4, #A855F7)",
                  boxShadow: "0 0 25px rgba(108,62,244,0.3)",
                }}
              >
                <Calendar className="w-4 h-4" />
                Schedule 30-min Call
              </a>
            </div>
          </div>

          {/* Contact details */}
          <div className="glass-card p-6 flex flex-col gap-4" style={{ borderRadius: 20 }}>
            {contacts.map(({ icon: Icon, label, value, href }) => (
              <a
                key={label}
                href={href}
                className="flex items-center gap-4 group"
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all group-hover:scale-110"
                  style={{
                    background: "rgba(108,62,244,0.12)",
                    border: "1px solid rgba(108,62,244,0.25)",
                  }}
                >
                  <Icon className="w-4 h-4" style={{ color: "#6C3EF4" }} />
                </div>
                <div>
                  <p className="text-xs text-zinc-500">{label}</p>
                  <p className="text-sm text-zinc-200 group-hover:text-white transition-colors">
                    {value}
                  </p>
                </div>
              </a>
            ))}
          </div>

          {/* Socials */}
          <div className="flex items-center gap-3">
            {socials.map(({ icon: Icon, label, href, color }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-11 h-11 rounded-xl flex items-center justify-center text-zinc-500 hover:text-white transition-all hover:scale-110 magnetic-btn"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = `${color}40`;
                  (e.currentTarget as HTMLElement).style.boxShadow = `0 0 20px ${color}20`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.08)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "none";
                }}
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </motion.div>

        {/* Right — form */}
        <motion.div
          className="glass-card p-8"
          style={{ borderRadius: 20 }}
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {sent ? (
            <motion.div
              className="flex flex-col items-center justify-center h-full gap-4 text-center py-12"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl"
                style={{ background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.25)" }}
              >
                ✅
              </div>
              <h3 className="font-display font-bold text-white text-xl" style={{ fontFamily: "Space Grotesk" }}>
                Message Sent!
              </h3>
              <p className="text-zinc-400 text-sm">
                Thanks for reaching out. I&apos;ll get back to you within 24 hours.
              </p>
              <button
                onClick={() => setSent(false)}
                className="text-sm text-primary hover:underline"
              >
                Send another message
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <h3 className="font-display font-bold text-white text-xl mb-2" style={{ fontFamily: "Space Grotesk" }}>
                Send a message
              </h3>

              <div className="flex flex-col gap-2">
                <label className="text-xs text-zinc-500 font-medium">Your Name</label>
                <input
                  type="text"
                  required
                  value={formState.name}
                  onChange={(e) => setFormState((s) => ({ ...s, name: e.target.value }))}
                  placeholder="John Doe"
                  className="px-4 py-3 rounded-xl text-sm text-zinc-200 placeholder-zinc-600 outline-none transition-all focus:border-primary"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                  onFocus={(e) => ((e.target as HTMLInputElement).style.borderColor = "rgba(108,62,244,0.5)")}
                  onBlur={(e) => ((e.target as HTMLInputElement).style.borderColor = "rgba(255,255,255,0.08)")}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs text-zinc-500 font-medium">Email Address</label>
                <input
                  type="email"
                  required
                  value={formState.email}
                  onChange={(e) => setFormState((s) => ({ ...s, email: e.target.value }))}
                  placeholder="john@example.com"
                  className="px-4 py-3 rounded-xl text-sm text-zinc-200 placeholder-zinc-600 outline-none transition-all"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                  onFocus={(e) => ((e.target as HTMLInputElement).style.borderColor = "rgba(108,62,244,0.5)")}
                  onBlur={(e) => ((e.target as HTMLInputElement).style.borderColor = "rgba(255,255,255,0.08)")}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs text-zinc-500 font-medium">Message</label>
                <textarea
                  required
                  rows={5}
                  value={formState.message}
                  onChange={(e) => setFormState((s) => ({ ...s, message: e.target.value }))}
                  placeholder="Tell me about your project..."
                  className="px-4 py-3 rounded-xl text-sm text-zinc-200 placeholder-zinc-600 outline-none resize-none transition-all"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                  onFocus={(e) => ((e.target as HTMLTextAreaElement).style.borderColor = "rgba(108,62,244,0.5)")}
                  onBlur={(e) => ((e.target as HTMLTextAreaElement).style.borderColor = "rgba(255,255,255,0.08)")}
                />
              </div>

              <button
                type="submit"
                disabled={sending}
                className="flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-semibold text-white transition-all hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed magnetic-btn"
                style={{
                  background: "linear-gradient(135deg, #6C3EF4, #A855F7)",
                  boxShadow: "0 0 25px rgba(108,62,244,0.3)",
                }}
              >
                {sending ? (
                  <>
                    <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Send Message
                  </>
                )}
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
