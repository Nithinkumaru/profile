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
  | "instagram_click"
  | "email_click"
  | "project_click"
  | "contact_submit"
  | "booking_submit";

// ── Helpers ──────────────────────────────────────────────────────────────────

// Network-level failures (unreachable host, DNS, offline) surface as a bare
// "TypeError: Failed to fetch" — supabase-js catches that internally and returns it
// as error.message rather than throwing, so a try/catch alone won't intercept it.
// Never show that raw text to a visitor filling out a form.
const UNREACHABLE_MESSAGE = "Couldn't reach the server. Please email me directly instead.";

function friendlyError(message?: string): string | undefined {
  if (!message) return message;
  return /failed to fetch|networkerror|load failed/i.test(message) ? UNREACHABLE_MESSAGE : message;
}

export async function submitContact(data: ContactRow) {
  if (!supabase) return { error: "Supabase not configured" };
  try {
    const { error } = await supabase.from("contact_submissions").insert([data]);
    return { error: friendlyError(error?.message) };
  } catch {
    return { error: UNREACHABLE_MESSAGE };
  }
}

export async function submitBooking(data: BookingRow) {
  if (!supabase) return { error: "Supabase not configured" };
  try {
    const { error } = await supabase.from("booking_submissions").insert([data]);
    return { error: friendlyError(error?.message) };
  } catch {
    return { error: UNREACHABLE_MESSAGE };
  }
}

export async function trackEvent(type: AnalyticsEvent, metadata?: Record<string, unknown>) {
  if (!supabase) return;
  try {
    await supabase.from("analytics_events").insert([{ event_type: type, metadata }]);
  } catch {
    // Analytics failures should never be user-visible or throw unhandled rejections.
  }
}
