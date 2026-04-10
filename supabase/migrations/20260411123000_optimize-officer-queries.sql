create index if not exists officers_school_year_active_sort_idx
on public.officers (school_year_id, is_active, sort_order, last_name, first_name);

create index if not exists officer_positions_active_sort_idx
on public.officer_positions (is_active, sort_order, name);

create index if not exists school_years_active_current_idx
on public.school_years (is_active, is_current, starts_on desc);

create or replace view public.current_active_officers as
select
  o.id,
  o.school_year_id,
  sy.label as school_year_label,
  sy.is_current as school_year_is_current,
  o.officer_position_id,
  op.name as officer_position_name,
  op.slug as officer_position_slug,
  o.custom_position_name,
  coalesce(nullif(o.custom_position_name, ''), op.name) as public_position_name,
  o.first_name,
  o.last_name,
  o.slug,
  o.bio,
  o.photo_url,
  o.profile_url,
  o.email,
  o.phone_number,
  o.sort_order,
  o.is_active,
  o.created_at,
  o.updated_at
from public.officers o
join public.school_years sy
  on sy.id = o.school_year_id
left join public.officer_positions op
  on op.id = o.officer_position_id
where o.is_active = true
  and sy.is_current = true
  and sy.is_active = true;
