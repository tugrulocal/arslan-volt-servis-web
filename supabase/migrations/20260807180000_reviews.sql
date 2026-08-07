create extension if not exists pgcrypto;

create or replace function public.is_review_admin_aal2()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select
    coalesce(auth.jwt() -> 'app_metadata' ->> 'role', '') = 'review_admin'
    and coalesce(auth.jwt() ->> 'aal', '') = 'aal2';
$$;

create table if not exists public.reviews (
  id uuid primary key default gen_random_uuid(),
  full_name text not null check (char_length(full_name) between 3 and 80),
  public_name text not null check (char_length(public_name) between 2 and 80),
  display_full_name boolean not null default false,
  phone text check (phone is null or char_length(phone) between 10 and 16),
  phone_hmac text not null,
  ip_hmac text,
  idempotency_hmac text not null unique,
  service_id text not null,
  service_title text not null,
  rating smallint not null check (rating between 1 and 5),
  comment text not null check (char_length(comment) between 20 and 700),
  visibility_status text not null default 'published'
    check (visibility_status in ('published', 'hidden', 'quarantined')),
  verification_status text not null default 'unverified'
    check (verification_status in ('unverified', 'verified')),
  featured boolean not null default false,
  owner_reply text check (owner_reply is null or char_length(owner_reply) <= 700),
  source text not null default 'website',
  consent_text_version text not null,
  consent_accepted_at timestamptz not null default now(),
  phone_purge_at timestamptz not null default (now() + interval '90 days'),
  verified_at timestamptz,
  hidden_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists reviews_public_created_idx
  on public.reviews (visibility_status, verification_status, featured desc, created_at desc);

create index if not exists reviews_phone_hmac_created_idx
  on public.reviews (phone_hmac, created_at desc);

create index if not exists reviews_ip_hmac_created_idx
  on public.reviews (ip_hmac, created_at desc);

create table if not exists public.review_audit_logs (
  id uuid primary key default gen_random_uuid(),
  review_id uuid references public.reviews(id) on delete set null,
  admin_user_id uuid,
  action text not null check (char_length(action) between 2 and 80),
  created_at timestamptz not null default now()
);

alter table public.reviews enable row level security;
alter table public.review_audit_logs enable row level security;

revoke all on public.reviews from anon, authenticated;
revoke all on public.review_audit_logs from anon, authenticated;

grant execute on function public.is_review_admin_aal2() to authenticated;

grant select (
  id,
  public_name,
  service_id,
  service_title,
  rating,
  comment,
  visibility_status,
  verification_status,
  featured,
  owner_reply,
  created_at,
  updated_at
) on public.reviews to anon;

grant all on public.reviews to authenticated;
grant insert, select on public.review_audit_logs to authenticated;

drop policy if exists "Anon can read published safe reviews" on public.reviews;
create policy "Anon can read published safe reviews"
on public.reviews
for select
to anon
using (visibility_status = 'published');

drop policy if exists "Review admins with MFA can manage reviews" on public.reviews;
create policy "Review admins with MFA can manage reviews"
on public.reviews
for all
to authenticated
using (public.is_review_admin_aal2())
with check (public.is_review_admin_aal2());

drop policy if exists "Review admins with MFA can write audit logs" on public.review_audit_logs;
create policy "Review admins with MFA can write audit logs"
on public.review_audit_logs
for insert
to authenticated
with check (public.is_review_admin_aal2());

drop policy if exists "Review admins with MFA can read audit logs" on public.review_audit_logs;
create policy "Review admins with MFA can read audit logs"
on public.review_audit_logs
for select
to authenticated
using (public.is_review_admin_aal2());

