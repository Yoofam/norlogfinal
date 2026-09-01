import { useEffect, useState } from "react";
import { getSiteSettings, updateSiteSettings } from "../../lib/api";
import ImageUploadField from "./ImageUploadField";

export default function SiteSettingsPanel() {
  const [form, setForm] = useState(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    getSiteSettings()
      .then(setForm)
      .catch((e) => setError(e.message));
  }, []);

  function update(field) {
    return (e) => setForm((f) => ({ ...f, [field]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSaved(false);
    try {
      const updated = await updateSiteSettings({
        company_name: form.company_name,
        tagline: form.tagline,
        phone: form.phone,
        email: form.email,
        address: form.address,
        logo_url: form.logo_url,
      });
      setForm(updated);
      setSaved(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  if (error && !form) {
    return <p className="text-rust text-sm border border-rust/40 bg-rust/5 px-3 py-2">{error}</p>;
  }
  if (!form) return <p className="text-steel">Loading…</p>;

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-line p-8 space-y-6 max-w-2xl">
      <ImageUploadField
        label="Site logo"
        value={form.logo_url}
        onChange={(url) => setForm((f) => ({ ...f, logo_url: url }))}
        folder="logo"
      />

      <label className="block">
        <span className="text-xs font-mono text-steel uppercase">Company name</span>
        <input value={form.company_name} onChange={update("company_name")} className="mt-1.5 w-full border border-line px-4 py-2.5 bg-paper focus:bg-white" />
      </label>

      <label className="block">
        <span className="text-xs font-mono text-steel uppercase">Tagline</span>
        <input value={form.tagline} onChange={update("tagline")} className="mt-1.5 w-full border border-line px-4 py-2.5 bg-paper focus:bg-white" />
      </label>

      <div className="grid md:grid-cols-2 gap-6">
        <label className="block">
          <span className="text-xs font-mono text-steel uppercase">Phone</span>
          <input value={form.phone} onChange={update("phone")} className="mt-1.5 w-full border border-line px-4 py-2.5 bg-paper focus:bg-white" />
        </label>
        <label className="block">
          <span className="text-xs font-mono text-steel uppercase">Email</span>
          <input value={form.email} onChange={update("email")} className="mt-1.5 w-full border border-line px-4 py-2.5 bg-paper focus:bg-white" />
        </label>
      </div>

      <label className="block">
        <span className="text-xs font-mono text-steel uppercase">Address</span>
        <input value={form.address} onChange={update("address")} className="mt-1.5 w-full border border-line px-4 py-2.5 bg-paper focus:bg-white" />
      </label>

      {error && <p className="text-rust text-sm border border-rust/40 bg-rust/5 px-3 py-2">{error}</p>}
      {saved && <p className="text-sm text-steel">Saved — live on the site now.</p>}

      <button type="submit" disabled={saving} className="bg-charcoal text-paper font-semibold px-7 py-3 hover:bg-steel transition-colors disabled:opacity-60">
        {saving ? "Saving…" : "Save Changes"}
      </button>
    </form>
  );
}
