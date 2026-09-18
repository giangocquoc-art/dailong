-- Đại Long CMS core schema
create extension if not exists pgcrypto;

create or replace function public.cms_touch_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end $$;

create table if not exists public.cms_sites (
  id uuid primary key default gen_random_uuid(),
  key text not null unique,
  name text not null,
  primary_domain text,
  locales text[] not null default array['vi','en'],
  default_locale text not null default 'vi',
  status text not null default 'active' check (status in ('active','disabled')),
  settings jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.cms_pages (
  id uuid primary key default gen_random_uuid(),
  site_id uuid not null references public.cms_sites(id) on delete cascade,
  title text not null,
  slug text not null default '',
  path text not null,
  locale text not null default 'vi',
  status text not null default 'draft' check (status in ('draft','published','archived')),
  template text not null default 'default',
  data jsonb not null default '{"root":{"props":{}},"content":[]}'::jsonb,
  seo jsonb not null default '{}'::jsonb,
  version integer not null default 1,
  published_at timestamptz,
  created_by text,
  updated_by text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(site_id,path,locale)
);

create table if not exists public.cms_page_versions (
  id bigserial primary key,
  page_id uuid not null references public.cms_pages(id) on delete cascade,
  version integer not null,
  status text not null default 'draft',
  data jsonb not null,
  seo jsonb not null default '{}'::jsonb,
  created_by text,
  created_at timestamptz not null default now(),
  unique(page_id,version)
);

create table if not exists public.cms_navigation (
  id uuid primary key default gen_random_uuid(),
  site_id uuid not null references public.cms_sites(id) on delete cascade,
  key text not null,
  locale text not null default 'vi',
  items jsonb not null default '[]'::jsonb,
  updated_by text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(site_id,key,locale)
);

create table if not exists public.cms_redirects (
  id uuid primary key default gen_random_uuid(),
  site_id uuid not null references public.cms_sites(id) on delete cascade,
  source text not null,
  destination text not null,
  permanent boolean not null default true,
  enabled boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(site_id,source)
);

create table if not exists public.cms_users (
  id uuid primary key default gen_random_uuid(),
  email text unique,
  display_name text,
  role text not null default 'viewer' check (role in ('superadmin','admin','editor','seo','viewer')),
  status text not null default 'active' check (status in ('active','disabled')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.cms_audit_logs (
  id bigserial primary key,
  actor text,
  action text not null,
  entity_type text not null,
  entity_id text,
  before_data jsonb,
  after_data jsonb,
  meta jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.cms_publish_jobs (
  id uuid primary key default gen_random_uuid(),
  site_id uuid references public.cms_sites(id) on delete cascade,
  page_id uuid references public.cms_pages(id) on delete set null,
  status text not null default 'queued' check (status in ('queued','running','ready','failed')),
  provider text not null default 'vercel',
  deployment_id text,
  deployment_url text,
  error text,
  created_by text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

drop trigger if exists trg_cms_sites_updated_at on public.cms_sites;
create trigger trg_cms_sites_updated_at before update on public.cms_sites for each row execute function public.cms_touch_updated_at();
drop trigger if exists trg_cms_pages_updated_at on public.cms_pages;
create trigger trg_cms_pages_updated_at before update on public.cms_pages for each row execute function public.cms_touch_updated_at();
drop trigger if exists trg_cms_navigation_updated_at on public.cms_navigation;
create trigger trg_cms_navigation_updated_at before update on public.cms_navigation for each row execute function public.cms_touch_updated_at();
drop trigger if exists trg_cms_redirects_updated_at on public.cms_redirects;
create trigger trg_cms_redirects_updated_at before update on public.cms_redirects for each row execute function public.cms_touch_updated_at();
drop trigger if exists trg_cms_users_updated_at on public.cms_users;
create trigger trg_cms_users_updated_at before update on public.cms_users for each row execute function public.cms_touch_updated_at();
drop trigger if exists trg_cms_publish_jobs_updated_at on public.cms_publish_jobs;
create trigger trg_cms_publish_jobs_updated_at before update on public.cms_publish_jobs for each row execute function public.cms_touch_updated_at();

alter table public.cms_sites enable row level security;
alter table public.cms_pages enable row level security;
alter table public.cms_page_versions enable row level security;
alter table public.cms_navigation enable row level security;
alter table public.cms_redirects enable row level security;
alter table public.cms_users enable row level security;
alter table public.cms_audit_logs enable row level security;
alter table public.cms_publish_jobs enable row level security;

-- No anon/authenticated policies are created intentionally.
-- The admin server uses a server-only service-role key after validating the existing CMS session.

insert into public.cms_sites (key,name,primary_domain,locales,default_locale)
values ('gomsudailong','Gốm sứ Đại Long','gomsudailong.vn',array['vi','en'],'vi')
on conflict (key) do update set
  name=excluded.name,
  primary_domain=excluded.primary_domain,
  locales=excluded.locales,
  default_locale=excluded.default_locale;
