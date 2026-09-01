import { useEffect, useState } from "react";
import { servicesApi } from "../../lib/api";

export default function ServicesPanel() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [draft, setDraft] = useState(null);

  async function load() {
    setLoading(true);
    try {
      setRows(await servicesApi.list());
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  function startEdit(row) {
    setEditingId(row.id);
    setDraft({ ...row });
  }

  function startNew() {
    setEditingId("new");
    setDraft({ name: "", detail: "", sort_order: rows.length + 1 });
  }

  function cancel() {
    setEditingId(null);
    setDraft(null);
  }

  async function save() {
    setError("");
    try {
      await servicesApi.upsert(draft);
      cancel();
      load();
    } catch (err) {
      setError(err.message);
    }
  }

  async function remove(id) {
    if (!confirm("Delete this service?")) return;
    setError("");
    try {
      await servicesApi.remove(id);
      load();
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div>
      {error && <p className="text-rust text-sm border border-rust/40 bg-rust/5 px-3 py-2 mb-4">{error}</p>}

      {loading ? (
        <p className="text-steel">Loading…</p>
      ) : (
        <div className="border border-line bg-white divide-y divide-line mb-6">
          {rows.map((row) =>
            editingId === row.id ? (
              <ServiceForm key={row.id} draft={draft} setDraft={setDraft} onSave={save} onCancel={cancel} />
            ) : (
              <div key={row.id} className="flex items-start gap-4 px-5 py-4">
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-charcoal">{row.name}</p>
                  <p className="text-sm text-steel">{row.detail}</p>
                </div>
                <button onClick={() => startEdit(row)} className="text-sm font-semibold border-2 border-charcoal px-4 py-1.5 hover:bg-charcoal hover:text-paper transition-colors shrink-0">
                  Edit
                </button>
                <button onClick={() => remove(row.id)} className="text-sm font-semibold text-rust border-2 border-rust px-4 py-1.5 hover:bg-rust hover:text-white transition-colors shrink-0">
                  Delete
                </button>
              </div>
            )
          )}
          {rows.length === 0 && <p className="text-steel px-5 py-6 text-sm">No services yet — add one below.</p>}
        </div>
      )}

      {editingId === "new" ? (
        <ServiceForm draft={draft} setDraft={setDraft} onSave={save} onCancel={cancel} isNew />
      ) : (
        <button onClick={startNew} className="bg-charcoal text-paper font-semibold px-6 py-3 hover:bg-steel transition-colors">
          + Add Service
        </button>
      )}
    </div>
  );
}

function ServiceForm({ draft, setDraft, onSave, onCancel, isNew }) {
  return (
    <div className={`p-5 space-y-4 ${isNew ? "bg-white border border-line" : "bg-paper"}`}>
      <label className="block">
        <span className="text-xs font-mono text-steel uppercase">Name</span>
        <input value={draft.name} onChange={(e) => setDraft((d) => ({ ...d, name: e.target.value }))} className="mt-1.5 w-full border border-line px-3 py-2 bg-white" />
      </label>
      <label className="block">
        <span className="text-xs font-mono text-steel uppercase">Detail</span>
        <textarea rows={3} value={draft.detail} onChange={(e) => setDraft((d) => ({ ...d, detail: e.target.value }))} className="mt-1.5 w-full border border-line px-3 py-2 bg-white" />
      </label>
      <div className="flex gap-3">
        <button onClick={onSave} className="bg-charcoal text-paper font-semibold px-6 py-2.5 hover:bg-steel transition-colors">Save</button>
        <button onClick={onCancel} className="border-2 border-charcoal px-6 py-2.5 font-semibold hover:bg-charcoal hover:text-paper transition-colors">Cancel</button>
      </div>
    </div>
  );
}
