import { createClient } from "@supabase/supabase-js";

const url  = process.env.NEXT_PUBLIC_SUPABASE_URL  ?? "";
const key  = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

export const supabase = url && key ? createClient(url, key) : null;

// ── Types ────────────────────────────────────────────────────────────────────

export interface ContactRow {
  id?: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
  created_at?: string;
}

export interface BookingRow {
  id?: string;
  name: string;
  email: string;
  phone?: string;
  preferred_date: string;
  preferred_time: string;
  notes?: string;
  created_at?: string;
}

export type AnalyticsEvent =
  | "page_view"
  | "resume_download"
  | "github_click"
  | "linkedin_click"
  | "project_click"
  | "contact_submit"
  | "booking_submit";

// ── Helpers ──────────────────────────────────────────────────────────────────

export async function submitContact(data: ContactRow) {
  if (!supabase) return { error: "Supabase not configured" };
  const { error } = await supabase.from("contact_submissions").insert([data]);
  return { error: error?.message };
}

export async function submitBooking(data: BookingRow) {
  if (!supabase) return { error: "Supabase not configured" };
  const { error } = await supabase.from("booking_submissions").insert([data]);
  return { error: error?.message };
}

export async function trackEvent(type: AnalyticsEvent, metadata?: Record<string, unknown>) {
  if (!supabase) return;
  await supabase.from("analytics_events").insert([{ event_type: type, metadata }]);
}
