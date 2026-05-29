
create table public.quote_requests (
  id uuid primary key default gen_random_uuid(),
  insurance_type text not null,
  full_name text not null,
  email text not null,
  phone text not null,
  age int,
  city text,
  message text,
  created_at timestamptz not null default now()
);
alter table public.quote_requests enable row level security;
create policy "anyone can insert quote_requests"
  on public.quote_requests for insert to anon, authenticated with check (true);

create table public.callback_requests (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  phone text not null,
  preferred_time text,
  created_at timestamptz not null default now()
);
alter table public.callback_requests enable row level security;
create policy "anyone can insert callback_requests"
  on public.callback_requests for insert to anon, authenticated with check (true);

create table public.newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  created_at timestamptz not null default now()
);
alter table public.newsletter_subscribers enable row level security;
create policy "anyone can insert newsletter_subscribers"
  on public.newsletter_subscribers for insert to anon, authenticated with check (true);
