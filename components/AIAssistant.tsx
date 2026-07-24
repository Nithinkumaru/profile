"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, X, Send, Sparkles } from "lucide-react";

const EASE = [0.22, 0.61, 0.36, 1] as const;

interface Message {
  role: "assistant" | "user";
  text: string;
}

const KNOWLEDGE_BASE: Record<string, string> = {
  default: `Hey, welcome! I'm Nithin's AI assistant. Here's what you can do here: explore his AI & ML projects, request a collaboration, or book a quick call. What brings you here today?`,
  hello: `Hey there! I'm Nithin's assistant. Want to know about his projects, skills, or how to work together?`,
  who: `Nithin Kumar U is an AI & Machine Learning Engineer and Full Stack Developer based in Bangalore, India. He specializes in building intelligent products using LLMs, computer vision, and modern web technologies.`,
  projects: `Nithin has built some really cool things:\n\n🛡️ AI Honeypot System — cybersecurity tool using LLMs to trap attackers\n🚀 TeachGrow Platform — enterprise SaaS for HR teams with AI features\n🤖 Portfolio AI Assistant — RAG-based chatbot (like me!)\n📞 AI Voice Calling System — automated sales calls with AI\n❤️ Heart Disease Prediction — 95% accurate ML model`,
  skills: `Nithin's stack includes:\n\n🐍 Python, TypeScript, JavaScript, Java\n⚛️ React, Next.js, FastAPI, Flask, Node.js\n🧠 TensorFlow, PyTorch, LangChain, FAISS, OpenAI\n☁️ AWS, Docker, Supabase, PostgreSQL, MongoDB`,
  contact: `You can reach Nithin here:\n📧 nithinkumaru@gmail.com\n📍 Bangalore, India\n\nOr just book a free 30-minute call using the "Book a Call" card!`,
  hire: `Nithin is currently open to exciting projects and collaborations! He works on:\n• AI/ML integrations\n• Full-stack web apps\n• LLM-powered products\n• Consulting\n\nBook a free call or send an email to discuss your project!`,
  experience: `Nithin has 2+ years of professional experience:\n\n💼 AI & Full Stack Developer at TeachGrow (2024–Present)\n🔬 ML Intern — Computer Vision (2023–2024)\n💻 Freelance Full Stack Developer (2022–2023)\n\nHe's shipped 20+ projects across AI, fintech, healthcare and edtech.`,
  price: `Nithin's rates depend on the project scope and complexity. Book a free 30-minute call to discuss your project and get a custom quote!`,
};

function getResponse(input: string): string {
  const q = input.toLowerCase();
  if (q.match(/^(hi|hello|hey|sup|yo)/)) return KNOWLEDGE_BASE.hello;
  if (q.match(/who|about|background|yourself/)) return KNOWLEDGE_BASE.who;
  if (q.match(/project|built|work|portfolio|made/)) return KNOWLEDGE_BASE.projects;
  if (q.match(/skill|tech|stack|use|language|framework/)) return KNOWLEDGE_BASE.skills;
  if (q.match(/contact|email|reach|find|talk/)) return KNOWLEDGE_BASE.contact;
  if (q.match(/hire|available|collaborate|freelance|work together|need/)) return KNOWLEDGE_BASE.hire;
  if (q.match(/experience|job|career|history/)) return KNOWLEDGE_BASE.experience;
  if (q.match(/price|cost|rate|charge|fee/)) return KNOWLEDGE_BASE.price;
  return `That's a great question! I'll let Nithin know you asked about that. In the meantime, you can reach him directly at nithinkumaru@gmail.com or book a free call using the card on the page! 🙂`;
}

export default function AIAssistant({ onClose }: { onClose: () => void }) {
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", text: KNOWLEDGE_BASE.default },
  ]);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, thinking]);

  useEffect(() => {
    setTimeout(() => inputRef.current?.focus(), 300);
  }, []);

  const send = async () => {
    const text = input.trim();
    if (!text) return;
    setInput("");
    setMessages((m) => [...m, { role: "user", text }]);
    setThinking(true);

    await new Promise((r) => setTimeout(r, 800 + Math.random() * 600));

    const reply = getResponse(text);
    setThinking(false);
    setMessages((m) => [...m, { role: "assistant", text: reply }]);
  };

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  return (
    <>
      {/* Backdrop — inert on desktop/tablet (widget never blocks the rest of the
          page), becomes a real dismissible scrim on mobile behind the bottom sheet */}
      <motion.div
        className="chat-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        onClick={onClose}
      />

      <motion.div
        className="chat-panel"
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.28, ease: EASE }}
        role="dialog"
        aria-label="AI Assistant chat"
      >
        <div className="chat-panel-handle" />

        {/* Header */}
        <div className="chat-panel-header">
          <div className="chat-panel-header-title">
            <div className="chat-panel-avatar"><Sparkles size={12} /></div>
            <span>AI Assistant</span>
          </div>
          <button className="chat-icon-btn" onClick={onClose} aria-label="Close chat">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Messages */}
        <div className="chat-messages">
          <AnimatePresence initial={false}>
            {messages.map((msg, i) => (
              <motion.div
                key={i}
                className={`chat-bubble ${msg.role === "user" ? "chat-bubble-user" : ""}`}
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                style={{ whiteSpace: "pre-line" }}
              >
                {msg.text}
              </motion.div>
            ))}

            {thinking && (
              <motion.div
                className="chat-bubble flex gap-1.5 items-center"
                style={{ width: "fit-content" }}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <span className="typing-dot" />
                <span className="typing-dot" />
                <span className="typing-dot" />
              </motion.div>
            )}
          </AnimatePresence>
          <div ref={bottomRef} />
        </div>

        {/* Input row */}
        <div className="chat-input-row">
          <button
            className="chat-icon-btn" disabled
            title="Voice input coming soon" aria-label="Voice input coming soon"
          >
            <Mic className="w-5 h-5" />
          </button>

          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKey}
            placeholder="Ask me anything..."
            className="chat-input"
          />

          <button
            className="chat-icon-btn"
            onClick={send}
            aria-label="Send message"
            style={input.trim() ? { background: "rgba(108,62,244,0.5)", borderColor: "rgba(108,62,244,0.6)" } : {}}
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </motion.div>
    </>
  );
}
