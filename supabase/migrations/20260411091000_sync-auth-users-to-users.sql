create or replace function public.sync_auth_user_to_public_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.users (
    id,
    email,
    first_name,
    last_name,
    slug,
    phone_number,
    role
  )
  values (
    new.id,
    new.email,
    new.raw_user_meta_data ->> 'first_name',
    new.raw_user_meta_data ->> 'last_name',
    new.raw_user_meta_data ->> 'slug',
    coalesce(new.raw_user_meta_data ->> 'phone_number', new.phone),
    'admin'
  )
  on conflict (id) do update
  set email = excluded.email,
      first_name = excluded.first_name,
      last_name = excluded.last_name,
      slug = excluded.slug,
      phone_number = excluded.phone_number;

  return new;
end;
$$;

drop trigger if exists sync_auth_user_to_public_user on auth.users;

create trigger sync_auth_user_to_public_user
after insert on auth.users
for each row
execute function public.sync_auth_user_to_public_user();

insert into public.users (
  id,
  email,
  first_name,
  last_name,
  slug,
  phone_number,
  role
)
select
  id,
  email,
  raw_user_meta_data ->> 'first_name',
  raw_user_meta_data ->> 'last_name',
  raw_user_meta_data ->> 'slug',
  coalesce(raw_user_meta_data ->> 'phone_number', phone),
  'admin'
from auth.users
where email is not null
on conflict (id) do update
set email = excluded.email,
    first_name = excluded.first_name,
    last_name = excluded.last_name,
    slug = excluded.slug,
    phone_number = excluded.phone_number;
