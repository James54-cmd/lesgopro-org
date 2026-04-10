create table if not exists public.school_years (
  id uuid primary key default gen_random_uuid(),
  label text not null unique,
  starts_on date,
  ends_on date,
  is_current boolean not null default false,
  is_active boolean not null default true,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create unique index if not exists school_years_single_current_idx
on public.school_years (is_current)
where is_current = true;

create table if not exists public.enrollment_counts (
  id uuid primary key default gen_random_uuid(),
  school_year_id uuid not null references public.school_years (id) on delete cascade,
  department_slug text not null default 'it',
  department_name text not null default 'Information Technology',
  student_count integer not null check (student_count >= 0),
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  unique (school_year_id, department_slug)
);

create table if not exists public.officer_positions (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  sort_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.officers (
  id uuid primary key default gen_random_uuid(),
  school_year_id uuid not null references public.school_years (id) on delete cascade,
  officer_position_id uuid references public.officer_positions (id) on delete set null,
  custom_position_name text,
  first_name text not null,
  last_name text not null,
  slug text not null unique,
  bio text,
  photo_url text,
  profile_url text,
  email text,
  phone_number text,
  sort_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.programs (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  description text,
  thumbnail_url text,
  video_url text,
  cta_url text,
  sort_order integer not null default 0,
  is_published boolean not null default true,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  description text,
  github_url text not null,
  live_demo_url text,
  thumbnail_url text,
  video_url text,
  sort_order integer not null default 0,
  is_featured boolean not null default false,
  is_published boolean not null default true,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.events (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  description text,
  starts_at timestamptz,
  ends_at timestamptz,
  venue text,
  registration_url text,
  external_url text,
  thumbnail_url text,
  video_url text,
  sort_order integer not null default 0,
  is_published boolean not null default true,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.gallery_items (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  media_type text not null default 'image' check (media_type in ('image', 'video')),
  media_url text not null,
  thumbnail_url text,
  external_url text,
  sort_order integer not null default 0,
  is_published boolean not null default true,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.social_links (
  id uuid primary key default gen_random_uuid(),
  platform text not null,
  label text not null,
  url text not null,
  icon_name text,
  sort_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create or replace function public.set_content_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = timezone('utc', now());
  return new;
end;
$$;

drop trigger if exists set_school_years_updated_at on public.school_years;
create trigger set_school_years_updated_at
before update on public.school_years
for each row
execute function public.set_content_updated_at();

drop trigger if exists set_enrollment_counts_updated_at on public.enrollment_counts;
create trigger set_enrollment_counts_updated_at
before update on public.enrollment_counts
for each row
execute function public.set_content_updated_at();

drop trigger if exists set_officer_positions_updated_at on public.officer_positions;
create trigger set_officer_positions_updated_at
before update on public.officer_positions
for each row
execute function public.set_content_updated_at();

drop trigger if exists set_officers_updated_at on public.officers;
create trigger set_officers_updated_at
before update on public.officers
for each row
execute function public.set_content_updated_at();

drop trigger if exists set_programs_updated_at on public.programs;
create trigger set_programs_updated_at
before update on public.programs
for each row
execute function public.set_content_updated_at();

drop trigger if exists set_projects_updated_at on public.projects;
create trigger set_projects_updated_at
before update on public.projects
for each row
execute function public.set_content_updated_at();

drop trigger if exists set_events_updated_at on public.events;
create trigger set_events_updated_at
before update on public.events
for each row
execute function public.set_content_updated_at();

drop trigger if exists set_gallery_items_updated_at on public.gallery_items;
create trigger set_gallery_items_updated_at
before update on public.gallery_items
for each row
execute function public.set_content_updated_at();

drop trigger if exists set_social_links_updated_at on public.social_links;
create trigger set_social_links_updated_at
before update on public.social_links
for each row
execute function public.set_content_updated_at();

create or replace function public.ensure_single_current_school_year()
returns trigger
language plpgsql
as $$
begin
  if new.is_current then
    update public.school_years
    set is_current = false
    where id <> new.id and is_current = true;
  end if;

  return new;
end;
$$;

drop trigger if exists ensure_single_current_school_year on public.school_years;
create trigger ensure_single_current_school_year
before insert or update on public.school_years
for each row
execute function public.ensure_single_current_school_year();

create or replace view public.current_it_enrollment as
select
  sy.id as school_year_id,
  sy.label as school_year_label,
  sy.starts_on,
  sy.ends_on,
  ec.id as enrollment_count_id,
  ec.department_slug,
  ec.department_name,
  ec.student_count
from public.school_years sy
left join public.enrollment_counts ec
  on ec.school_year_id = sy.id
 and ec.department_slug = 'it'
where sy.is_current = true
  and sy.is_active = true;

alter table public.school_years enable row level security;
alter table public.enrollment_counts enable row level security;
alter table public.officer_positions enable row level security;
alter table public.officers enable row level security;
alter table public.programs enable row level security;
alter table public.projects enable row level security;
alter table public.events enable row level security;
alter table public.gallery_items enable row level security;
alter table public.social_links enable row level security;

drop policy if exists "service role can manage school years" on public.school_years;
create policy "service role can manage school years"
on public.school_years
for all
to service_role
using (true)
with check (true);

drop policy if exists "service role can manage enrollment counts" on public.enrollment_counts;
create policy "service role can manage enrollment counts"
on public.enrollment_counts
for all
to service_role
using (true)
with check (true);

drop policy if exists "service role can manage officer positions" on public.officer_positions;
create policy "service role can manage officer positions"
on public.officer_positions
for all
to service_role
using (true)
with check (true);

drop policy if exists "service role can manage officers" on public.officers;
create policy "service role can manage officers"
on public.officers
for all
to service_role
using (true)
with check (true);

drop policy if exists "service role can manage programs" on public.programs;
create policy "service role can manage programs"
on public.programs
for all
to service_role
using (true)
with check (true);

drop policy if exists "service role can manage projects" on public.projects;
create policy "service role can manage projects"
on public.projects
for all
to service_role
using (true)
with check (true);

drop policy if exists "service role can manage events" on public.events;
create policy "service role can manage events"
on public.events
for all
to service_role
using (true)
with check (true);

drop policy if exists "service role can manage gallery items" on public.gallery_items;
create policy "service role can manage gallery items"
on public.gallery_items
for all
to service_role
using (true)
with check (true);

drop policy if exists "service role can manage social links" on public.social_links;
create policy "service role can manage social links"
on public.social_links
for all
to service_role
using (true)
with check (true);
