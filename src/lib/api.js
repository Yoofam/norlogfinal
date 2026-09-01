import { supabase } from "./supabase";

// ---------- Site settings ----------
export async function getSiteSettings() {
  const { data, error } = await supabase.from("site_settings").select("*").eq("id", 1).single();
  if (error) throw error;
  return data;
}

export async function updateSiteSettings(fields) {
  const { data, error } = await supabase
    .from("site_settings")
    .update({ ...fields, updated_at: new Date().toISOString() })
    .eq("id", 1)
    .select()
    .single();
  if (error) throw error;
  return data;
}

// ---------- Generic CRUD for materials / equipment / services ----------
function makeTableApi(table) {
  return {
    list: async () => {
      const { data, error } = await supabase.from(table).select("*").order("sort_order", { ascending: true });
      if (error) throw error;
      return data;
    },
    upsert: async (row) => {
      const { data, error } = await supabase.from(table).upsert(row).select().single();
      if (error) throw error;
      return data;
    },
    remove: async (id) => {
      const { error } = await supabase.from(table).delete().eq("id", id);
      if (error) throw error;
    },
  };
}

export const materialsApi = makeTableApi("materials");
export const equipmentApi = makeTableApi("equipment");
export const servicesApi = makeTableApi("services");

// ---------- Image upload (logo, product photos) ----------
export async function uploadImage(file, folder) {
  const ext = file.name.split(".").pop();
  const path = `${folder}/${crypto.randomUUID()}.${ext}`;
  const { error } = await supabase.storage.from("site-images").upload(path, file, { upsert: true });
  if (error) throw error;
  const { data } = supabase.storage.from("site-images").getPublicUrl(path);
  return data.publicUrl;
}
