import { useState } from "react";
import { uploadImage } from "../../lib/api";

export default function ImageUploadField({ label, value, onChange, folder }) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  async function handleFile(e) {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    setError("");
    try {
      const url = await uploadImage(file, folder);
      onChange(url);
    } catch (err) {
      setError(err.message);
    } finally {
      setUploading(false);
    }
  }

  return (
    <div>
      <span className="text-xs font-mono text-steel uppercase block mb-1.5">{label}</span>
      <div className="flex items-center gap-3">
        {value ? (
          <img src={value} alt="" className="w-14 h-14 object-cover border border-line" />
        ) : (
          <div className="w-14 h-14 border border-line bg-paper" />
        )}
        <label className="text-sm font-semibold border-2 border-charcoal px-4 py-2 cursor-pointer hover:bg-charcoal hover:text-paper transition-colors">
          {uploading ? "Uploading…" : "Upload"}
          <input type="file" accept="image/*" onChange={handleFile} className="hidden" disabled={uploading} />
        </label>
      </div>
      {error && <p className="text-rust text-xs mt-1">{error}</p>}
    </div>
  );
}
