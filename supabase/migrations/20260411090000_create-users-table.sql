create table if not exists public.users (
  id uuid primary key references auth.users (id) on delete cascade,
  email text not null unique,
  first_name text,
  last_name text,
  slug text,
  phone_number text,
  role text not null default 'admin' check (role = 'admin'),
  is_active boolean not null default true,
  last_login_at timestamptz,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

alter table public.users add column if not exists first_name text;
alter table public.users add column if not exists last_name text;
alter table public.users add column if not exists slug text;
alter table public.users add column if not exists phone_number text;
alter table public.users add column if not exists role text;
alter table public.users add column if not exists is_active boolean;
alter table public.users add column if not exists last_login_at timestamptz;
alter table public.users add column if not exists created_at timestamptz;
alter table public.users add column if not exists updated_at timestamptz;

alter table public.users alter column email set not null;
alter table public.users alter column role set default 'admin';
alter table public.users alter column is_active set default true;
alter table public.users alter column created_at set default timezone('utc', now());
alter table public.users alter column updated_at set default timezone('utc', now());

update public.users set role = 'admin' where role is null;
update public.users set is_active = true where is_active is null;
update public.users set created_at = timezone('utc', now()) where created_at is null;
update public.users set updated_at = timezone('utc', now()) where updated_at is null;

alter table public.users alter column role set not null;
alter table public.users alter column is_active set not null;
alter table public.users alter column created_at set not null;
alter table public.users alter column updated_at set not null;

alter table public.users drop constraint if exists users_role_check;
alter table public.users add constraint users_role_check check (role = 'admin');

create unique index if not exists users_email_key on public.users (email);
create unique index if not exists users_slug_key on public.users (slug) where slug is not null;

create or replace function public.set_users_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = timezone('utc', now());
  return new;
end;
$$;

drop trigger if exists set_users_updated_at on public.users;

create trigger set_users_updated_at
before update on public.users
for each row
execute function public.set_users_updated_at();

alter table public.users enable row level security;

drop policy if exists "service role can manage users" on public.users;
create policy "service role can manage users"
on public.users
for all
to service_role
using (true)
with check (true);

drop policy if exists "authenticated users can read own row" on public.users;
create policy "authenticated users can read own row"
on public.users
for select
to authenticated
using (auth.uid() = id);
