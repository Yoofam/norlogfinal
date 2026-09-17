import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

if (!supabaseConfigured) {
  // eslint-disable-next-line no-console
  console.error(
    "Supabase env vars are missing (VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY). " +
      "The site will run on fallback content only until these are set in your host's environment variables and the site is redeployed."
  );
}

// Fall back to harmless placeholder values so createClient() never throws and
// crashes the whole app at load time — every real Supabase call will simply
// fail gracefully instead, and the hooks in src/hooks/useSiteData.js already
// catch that and fall back to the static content in src/data/content.js.
export const supabase = createClient(
  supabaseUrl || "https://placeholder.supabase.co",
  supabaseAnonKey || "placeholder-anon-key"
);
