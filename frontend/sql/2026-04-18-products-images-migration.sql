-- Products image mapping migration
-- Run in Supabase SQL editor.

begin;

alter table public.products
  add column if not exists images text[] not null default '{}',
  add column if not exists primary_image_index integer not null default 0,
  add column if not exists storage_folder text;

-- If old image_url still exists, migrate its values into images[].
do $$
begin
  if exists (
    select 1
    from information_schema.columns
    where table_schema = 'public'
      and table_name = 'products'
      and column_name = 'image_url'
  ) then
    execute $sql$
      update public.products
      set images = case
        when coalesce(array_length(images, 1), 0) > 0 then images
        when image_url is not null and btrim(image_url) <> '' then array[image_url]
        else '{}'::text[]
      end
    $sql$;
  end if;
end $$;

-- Keep primary index in range when images exist.
alter table public.products
  drop constraint if exists products_primary_image_index_non_negative;
alter table public.products
  add constraint products_primary_image_index_non_negative
    check (primary_image_index >= 0);

alter table public.products
  drop constraint if exists products_primary_image_index_in_range;
alter table public.products
  add constraint products_primary_image_index_in_range
    check (
      coalesce(array_length(images, 1), 0) = 0
      or primary_image_index < array_length(images, 1)
    );

commit;
