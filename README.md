# Norlog Building Concept — Website Rebuild

React + Vite + Tailwind CSS frontend, with Supabase for the database, auth, and image storage.

## Pages
- Home — hero, stats, three divisions, why-us checklist, quote CTA
- Materials & Equipment — live catalogue pulled from the database
- Services — live list pulled from the database
- About / Contact — live contact details
- Quote — request form, saves to the database
- Admin (`/admin`) — sign in, manage everything below

## 1. Set up Supabase (free tier is enough)
1. Create a project at supabase.com.
2. **SQL Editor → New query** → paste the entire contents of `supabase/schema.sql` → **Run**. This creates every table (quote requests, site settings, materials, equipment, services), the image storage bucket, and all the access rules — and seeds it with the current site content so you're not starting from a blank admin panel. Safe to re-run if you need to.
3. **Authentication → Users → Add user** — create the admin login (email + password). This is the only account that can sign in at `/admin`. There's no public sign-up.
4. **Project Settings → API** for the two values below (already filled in for this project).

## 2. Configure the app
`.env` (already set for this project):
```
VITE_SUPABASE_URL=https://qulwqdgkhlxzaswlacxb.supabase.co
VITE_SUPABASE_ANON_KEY=sb_publishable_...
```
This is the anon/public key — safe to ship in frontend code. It only allows what the SQL policies permit (public insert on quote requests, public read on content, admin-only write). Never put the separate `service_role` key in this frontend.

## 3. Run it
```bash
npm install
npm run dev      # local dev server
npm run build    # production build -> dist/
```

## What's editable from `/admin` now
- **Quote Requests** — every submission from the "Get a Quote" form, newest first.
- **Contact & Branding** — company name, tagline, phone, email, address, and the site logo (uploads straight to Supabase Storage and updates the header/footer everywhere).
- **Materials** — add, edit, delete catalogue items, each with its own photo.
- **Equipment** — same, for the rental fleet.
- **Services** — add, edit, delete service listings.

Every change saves to the database and shows up on the live site immediately — no redeploy needed for content edits (you only need to rebuild/redeploy when you change actual code).

## Fallback behaviour
If the database is briefly unreachable, public pages fall back to the baked-in defaults in `src/data/content.js` rather than showing a broken page. That file is a safety net now, not the source of truth — edit content from `/admin`, not this file.

## Deploying
Any static host works (Netlify, Vercel, Cloudflare Pages, pxxl.click, etc.) — set the two `VITE_SUPABASE_*` env vars in your host's build settings, since they're baked in at build time.
