create unique index if not exists officers_school_year_position_unique_idx
on public.officers (school_year_id, officer_position_id)
where officer_position_id is not null;
