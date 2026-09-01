import { useState } from "react";
import PageBanner from "../components/PageBanner";
import { supabase } from "../lib/supabase";

const initialForm = {
  name: "",
  phone: "",
  need: "Building materials",
  location: "",
  details: "",
};

export default function Quote() {
  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function update(field) {
    return (e) => setForm((f) => ({ ...f, [field]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const { error } = await supabase.from("quote_requests").insert([form]);
    setLoading(false);
    if (error) {
      setError("Something went wrong sending your request. Please try again or call us directly.");
      return;
    }
    setSubmitted(true);
  }

  return (
    <div>
      <PageBanner
        eyebrow="REQUEST"
        title="Get a costed quote"
        detail="Tell us what you need. We reply with itemised pricing within 24 hours."
      />

      <div className="max-w-2xl mx-auto px-6 py-14">
        {submitted ? (
          <div className="border border-line bg-white p-10 text-center">
            <p className="font-display text-2xl text-charcoal mb-2">Request received</p>
            <p className="text-steel text-sm">
              Someone from site operations will call or email you within 24
              hours with a costed quote.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white border border-line p-8 space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <label className="block">
                <span className="text-xs font-mono text-steel uppercase">Full name</span>
                <input required type="text" value={form.name} onChange={update("name")} className="mt-1.5 w-full border border-line px-4 py-2.5 bg-paper focus:bg-white" />
              </label>
              <label className="block">
                <span className="text-xs font-mono text-steel uppercase">Phone number</span>
                <input required type="tel" value={form.phone} onChange={update("phone")} className="mt-1.5 w-full border border-line px-4 py-2.5 bg-paper focus:bg-white" />
              </label>
            </div>

            <label className="block">
              <span className="text-xs font-mono text-steel uppercase">What do you need?</span>
              <select value={form.need} onChange={update("need")} className="mt-1.5 w-full border border-line px-4 py-2.5 bg-paper focus:bg-white">
                <option>Building materials</option>
                <option>Equipment rental</option>
                <option>Construction service</option>
                <option>A mix of the above</option>
              </select>
            </label>

            <label className="block">
              <span className="text-xs font-mono text-steel uppercase">Site location</span>
              <input required type="text" placeholder="State, city or full address" value={form.location} onChange={update("location")} className="mt-1.5 w-full border border-line px-4 py-2.5 bg-paper focus:bg-white" />
            </label>

            <label className="block">
              <span className="text-xs font-mono text-steel uppercase">Details</span>
              <textarea required rows={5} placeholder="List materials, machines, or the scope of work" value={form.details} onChange={update("details")} className="mt-1.5 w-full border border-line px-4 py-2.5 bg-paper focus:bg-white" />
            </label>

            {error && (
              <p className="text-rust text-sm border border-rust/40 bg-rust/5 px-3 py-2">{error}</p>
            )}

            <button type="submit" disabled={loading} className="bg-charcoal text-paper font-semibold px-7 py-3.5 hover:bg-steel transition-colors w-full md:w-auto disabled:opacity-60">
              {loading ? "Sending…" : "Send Request"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
