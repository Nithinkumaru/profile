"use client";

import { createContext, useCallback, useContext, useState, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import ShareModal from "@/components/ShareModal";

const AIAssistant  = dynamic(() => import("@/components/AIAssistant"),  { ssr: false });
const ContactModal = dynamic(() => import("@/components/ContactModal"), { ssr: false });
const BookingModal = dynamic(() => import("@/components/BookingModal"), { ssr: false });

const EASE = [0.22, 0.61, 0.36, 1] as const;

interface UIContextValue {
  chatOpen: boolean;
  contactOpen: boolean;
  bookingOpen: boolean;
  shareOpen: boolean;
  openChat: () => void;
  closeChat: () => void;
  openContact: () => void;
  closeContact: () => void;
  openBooking: (time?: string) => void;
  closeBooking: () => void;
  openShare: () => void;
  closeShare: () => void;
}

const UIContext = createContext<UIContextValue | null>(null);

/** Access global chat/contact/booking/share modal state from anywhere in the app. */
export function useUI() {
  const ctx = useContext(UIContext);
  if (!ctx) throw new Error("useUI() must be used within <UIProvider>");
  return ctx;
}

export default function UIProvider({ children }: { children: ReactNode }) {
  const [chatOpen, setChatOpen]       = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [shareOpen, setShareOpen]     = useState(false);
  const [bookingTime, setBookingTime] = useState<string | undefined>(undefined);

  const openChat     = useCallback(() => setChatOpen(true), []);
  const closeChat     = useCallback(() => setChatOpen(false), []);
  const openContact  = useCallback(() => setContactOpen(true), []);
  const closeContact  = useCallback(() => setContactOpen(false), []);
  const openBooking  = useCallback((time?: string) => { setBookingTime(time); setBookingOpen(true); }, []);
  const closeBooking  = useCallback(() => setBookingOpen(false), []);
  const openShare    = useCallback(() => setShareOpen(true), []);
  const closeShare    = useCallback(() => setShareOpen(false), []);

  return (
    <UIContext.Provider
      value={{
        chatOpen, contactOpen, bookingOpen, shareOpen,
        openChat, closeChat, openContact, closeContact,
        openBooking, closeBooking, openShare, closeShare,
      }}
    >
      {children}

      <AnimatePresence>
        {chatOpen && <AIAssistant key="chat" onClose={closeChat} />}
      </AnimatePresence>

      <AnimatePresence>
        {contactOpen && <ContactModal key="contact" onClose={closeContact} />}
      </AnimatePresence>

      <AnimatePresence>
        {bookingOpen && (
          <BookingModal key="booking" initialTime={bookingTime} onClose={closeBooking} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {shareOpen && (
          <motion.div
            key="share"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: EASE }}
            className="fixed inset-0 z-50"
          >
            <ShareModal onClose={closeShare} />
          </motion.div>
        )}
      </AnimatePresence>
    </UIContext.Provider>
  );
}
