drop view if exists public.current_active_officers;

create view public.current_active_officers as
select
  o.id,
  o.school_year_id,
  sy.label as school_year_label,
  sy.is_current as school_year_is_current,
  o.officer_position_id,
  op.name as officer_position_name,
  op.slug as officer_position_slug,
  op.sort_order as officer_position_sort_order,
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
