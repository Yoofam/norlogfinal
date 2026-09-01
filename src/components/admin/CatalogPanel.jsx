import { useEffect, useState } from "react";
import ImageUploadField from "./ImageUploadField";

export default function CatalogPanel({ api, priceField, priceLabel, folder }) {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [draft, setDraft] = useState(null);

  async function load() {
    setLoading(true);
    try {
      setRows(await api.list());
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [api]);

  function startEdit(row) {
    setEditingId(row.id);
    setDraft({ ...row });
  }

  function startNew() {
    setEditingId("new");
    setDraft({ code: "", name: "", [priceField]: "", note: "", image_url: null, sort_order: rows.length + 1 });
  }

  function cancel() {
    setEditingId(null);
    setDraft(null);
  }

  async function save() {
    setError("");
    try {
      await api.upsert(draft);
      cancel();
      load();
    } catch (err) {
      setError(err.message);
    }
  }

  async function remove(id) {
    if (!confirm("Delete this item?")) return;
    setError("");
    try {
      await api.remove(id);
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
              <RowForm
                key={row.id}
                draft={draft}
                setDraft={setDraft}
                priceField={priceField}
                priceLabel={priceLabel}
                folder={folder}
                onSave={save}
                onCancel={cancel}
              />
            ) : (
              <div key={row.id} className="flex items-center gap-4 px-5 py-4">
                {row.image_url ? (
                  <img src={row.image_url} alt="" className="w-12 h-12 object-cover border border-line shrink-0" />
                ) : (
                  <div className="w-12 h-12 border border-line bg-paper shrink-0" />
                )}
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-charcoal truncate">{row.name}</p>
                  <p className="text-xs text-steel font-mono">{row.code} · {row[priceField]}</p>
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
          {rows.length === 0 && <p className="text-steel px-5 py-6 text-sm">Nothing here yet — add your first item below.</p>}
        </div>
      )}

      {editingId === "new" ? (
        <RowForm draft={draft} setDraft={setDraft} priceField={priceField} priceLabel={priceLabel} folder={folder} onSave={save} onCancel={cancel} isNew />
      ) : (
        <button onClick={startNew} className="bg-charcoal text-paper font-semibold px-6 py-3 hover:bg-steel transition-colors">
          + Add Item
        </button>
      )}
    </div>
  );
}

function RowForm({ draft, setDraft, priceField, priceLabel, folder, onSave, onCancel, isNew }) {
  function update(field) {
    return (e) => setDraft((d) => ({ ...d, [field]: e.target.value }));
  }

  return (
    <div className={`p-5 space-y-4 ${isNew ? "bg-white border border-line" : "bg-paper"}`}>
      <ImageUploadField label="Photo" value={draft.image_url} onChange={(url) => setDraft((d) => ({ ...d, image_url: url }))} folder={folder} />
      <div className="grid md:grid-cols-2 gap-4">
        <label className="block">
          <span className="text-xs font-mono text-steel uppercase">Code</span>
          <input value={draft.code} onChange={update("code")} className="mt-1.5 w-full border border-line px-3 py-2 bg-white" />
        </label>
        <label className="block">
          <span className="text-xs font-mono text-steel uppercase">Name</span>
          <input value={draft.name} onChange={update("name")} className="mt-1.5 w-full border border-line px-3 py-2 bg-white" />
        </label>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <label className="block">
          <span className="text-xs font-mono text-steel uppercase">{priceLabel}</span>
          <input value={draft[priceField]} onChange={update(priceField)} className="mt-1.5 w-full border border-line px-3 py-2 bg-white" />
        </label>
        <label className="block">
          <span className="text-xs font-mono text-steel uppercase">Note</span>
          <input value={draft.note || ""} onChange={update("note")} className="mt-1.5 w-full border border-line px-3 py-2 bg-white" />
        </label>
      </div>
      <div className="flex gap-3">
        <button onClick={onSave} className="bg-charcoal text-paper font-semibold px-6 py-2.5 hover:bg-steel transition-colors">Save</button>
        <button onClick={onCancel} className="border-2 border-charcoal px-6 py-2.5 font-semibold hover:bg-charcoal hover:text-paper transition-colors">Cancel</button>
      </div>
    </div>
  );
}
