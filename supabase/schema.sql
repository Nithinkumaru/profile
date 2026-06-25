-- ============================================================
-- Nithin Kumar U — Portfolio Supabase Schema
-- Run this in your Supabase SQL editor
-- ============================================================

-- Contact form submissions
create table if not exists contact_submissions (
  id          uuid    default gen_random_uuid() primary key,
  name        text    not null,
  email       text    not null,
  phone       text,
  message     text    not null,
  created_at  timestamptz default now()
);

-- Consultation bookings
create table if not exists booking_submissions (
  id              uuid    default gen_random_uuid() primary key,
  name            text    not null,
  email           text    not null,
  phone           text,
  preferred_date  date    not null,
  preferred_time  text    not null,
  notes           text,
  created_at      timestamptz default now()
);

-- Analytics events
create table if not exists analytics_events (
  id          uuid    default gen_random_uuid() primary key,
  event_type  text    not null,
  metadata    jsonb,
  created_at  timestamptz default now()
);

-- Row Level Security — allow anonymous inserts only
alter table contact_submissions    enable row level security;
alter table booking_submissions    enable row level security;
alter table analytics_events       enable row level security;

create policy "anon insert contact"   on contact_submissions  for insert with check (true);
create policy "anon insert booking"   on booking_submissions  for insert with check (true);
create policy "anon insert analytics" on analytics_events     for insert with check (true);
