-- Remove the cta_url column from programs table as it's no longer needed
alter table public.programs drop column if exists cta_url;