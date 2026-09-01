-- ============================================================
-- Norlog Building Concept — full schema
-- Run this whole file in Supabase: SQL Editor > New query > Run
-- Safe to re-run: everything uses IF NOT EXISTS / ON CONFLICT.
-- ============================================================

-- ---------- Quote requests (from the public "Get a Quote" form) ----------
create table if not exists quote_requests (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  phone text not null,
  need text not null,
  location text not null,
  details text not null
);
alter table quote_requests enable row level security;

drop policy if exists "Public can submit quote requests" on quote_requests;
create policy "Public can submit quote requests"
  on quote_requests for insert to anon with check (true);

drop policy if exists "Authenticated can read quote requests" on quote_requests;
create policy "Authenticated can read quote requests"
  on quote_requests for select to authenticated using (true);

-- ---------- Site settings (contact info + logo — one row) ----------
create table if not exists site_settings (
  id int primary key default 1,
  company_name text not null default 'Norlog Building Concept',
  tagline text not null default 'Materials, machines, and manpower for the job in front of you.',
  phone text not null default '+234 803 000 0000',
  email text not null default 'info@norlogbc.com',
  address text not null default 'Plot 14, Industrial Layout, Abuja, Nigeria',
  logo_url text,
  updated_at timestamptz not null default now(),
  constraint single_row check (id = 1)
);
insert into site_settings (id) values (1) on conflict (id) do nothing;

alter table site_settings enable row level security;
drop policy if exists "Public can read site settings" on site_settings;
create policy "Public can read site settings" on site_settings for select to public using (true);
drop policy if exists "Authenticated can update site settings" on site_settings;
create policy "Authenticated can update site settings" on site_settings for update to authenticated using (true) with check (true);

-- ---------- Materials ----------
create table if not exists materials (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  name text not null,
  unit text not null,
  price text not null,
  note text,
  image_url text,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);
alter table materials enable row level security;
drop policy if exists "Public can read materials" on materials;
create policy "Public can read materials" on materials for select to public using (true);
drop policy if exists "Authenticated can manage materials" on materials;
create policy "Authenticated can manage materials" on materials for all to authenticated using (true) with check (true);

insert into materials (code, name, unit, price, note, sort_order) values
  ('MAT-01', 'Dangote Cement (3X)', 'per bag', '₦9,200', 'Grade 42.5, mill-fresh stock', 1),
  ('MAT-02', '9-inch Blocks', 'per unit', '₦550', 'Vibrated, cured 21 days', 2),
  ('MAT-03', 'Iron Rod (Y12)', 'per length', '₦11,400', 'BRC-certified, 12mm', 3),
  ('MAT-04', 'Sharp Sand', 'per trip (5 tonnes)', '₦65,000', 'Delivered, river-washed', 4),
  ('MAT-05', 'Granite Chippings', 'per trip', '₦95,000', '12.5mm, quarry direct', 5),
  ('MAT-06', 'Roofing Sheets (Aluzinc)', 'per sheet', '₦8,900', '0.55mm gauge, long-span', 6)
on conflict (code) do nothing;

-- ---------- Equipment ----------
create table if not exists equipment (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  name text not null,
  rate text not null,
  note text,
  image_url text,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);
alter table equipment enable row level security;
drop policy if exists "Public can read equipment" on equipment;
create policy "Public can read equipment" on equipment for select to public using (true);
drop policy if exists "Authenticated can manage equipment" on equipment;
create policy "Authenticated can manage equipment" on equipment for all to authenticated using (true) with check (true);

insert into equipment (code, name, rate, note, sort_order) values
  ('EQP-01', 'CAT 320 Excavator', '₦180,000 / day', 'Operator included on request', 1),
  ('EQP-02', 'Tipper Truck (10-ton)', '₦95,000 / day', 'Fleet of 12, GPS-tracked', 2),
  ('EQP-03', 'Concrete Mixer (350L)', '₦35,000 / day', 'Diesel and electric units', 3),
  ('EQP-04', 'Plate Compactor', '₦20,000 / day', 'For subgrade and paving work', 4)
on conflict (code) do nothing;

-- ---------- Services ----------
create table if not exists services (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  detail text not null,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);
alter table services enable row level security;
drop policy if exists "Public can read services" on services;
create policy "Public can read services" on services for select to public using (true);
drop policy if exists "Authenticated can manage services" on services;
create policy "Authenticated can manage services" on services for all to authenticated using (true) with check (true);

insert into services (name, detail, sort_order) values
  ('Site Clearing & Earthworks', 'Bush clearing, grading, and excavation ahead of foundation work — machine and crew supplied together.', 1),
  ('Foundation & Concrete', 'Setting out, blinding, and pour supervision on strip, raft, and pile foundations.', 2),
  ('Equipment Operation', 'Trained operators for any machine on the fleet, billed with the rental or separately.', 3),
  ('Site Consultation', 'A certified engineer reviews your BOQ and drawings before you commit to a supplier.', 4)
on conflict (name) do nothing;

-- ---------- Storage bucket for the logo + product images ----------
insert into storage.buckets (id, name, public)
  values ('site-images', 'site-images', true)
  on conflict (id) do nothing;

drop policy if exists "Public can view site images" on storage.objects;
create policy "Public can view site images"
  on storage.objects for select to public using (bucket_id = 'site-images');

drop policy if exists "Authenticated can upload site images" on storage.objects;
create policy "Authenticated can upload site images"
  on storage.objects for insert to authenticated with check (bucket_id = 'site-images');

drop policy if exists "Authenticated can update site images" on storage.objects;
create policy "Authenticated can update site images"
  on storage.objects for update to authenticated using (bucket_id = 'site-images');

drop policy if exists "Authenticated can delete site images" on storage.objects;
create policy "Authenticated can delete site images"
  on storage.objects for delete to authenticated using (bucket_id = 'site-images');
