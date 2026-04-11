create table if not exists public.site_settings (
  id uuid not null default gen_random_uuid (),
  singleton boolean not null default true,
  show_public_leadership boolean not null default true,
  created_at timestamp with time zone not null default timezone ('utc'::text, now()),
  updated_at timestamp with time zone not null default timezone ('utc'::text, now()),
  constraint site_settings_pkey primary key (id),
  constraint site_settings_singleton_key unique (singleton)
) tablespace pg_default;

drop trigger if exists set_site_settings_updated_at on public.site_settings;
create trigger set_site_settings_updated_at
before update on public.site_settings for each row
execute function set_content_updated_at ();

alter table public.site_settings enable row level security;

drop policy if exists "service role can manage site settings" on public.site_settings;
create policy "service role can manage site settings"
on public.site_settings
for all
to service_role
using (true)
with check (true);

insert into public.site_settings (singleton, show_public_leadership)
values (true, true)
on conflict (singleton) do nothing;
