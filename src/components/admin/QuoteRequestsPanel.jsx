import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

export default function QuoteRequestsPanel() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      setLoading(true);
      const { data, error } = await supabase
        .from("quote_requests")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) setError(error.message);
      else setRequests(data || []);
      setLoading(false);
    }
    load();
  }, []);

  if (loading) return <p className="text-steel">Loading…</p>;
  if (error) return <p className="text-rust text-sm border border-rust/40 bg-rust/5 px-3 py-2">{error}</p>;
  if (requests.length === 0) {
    return <div className="bg-white border border-line p-8 text-center text-steel">No quote requests yet.</div>;
  }

  return (
    <div className="border border-line bg-white overflow-x-auto">
      <table className="w-full text-sm min-w-[800px]">
        <thead>
          <tr className="border-b border-line font-mono text-xs text-steel uppercase text-left">
            <th className="px-5 py-3 font-normal">Date</th>
            <th className="px-5 py-3 font-normal">Name</th>
            <th className="px-5 py-3 font-normal">Phone</th>
            <th className="px-5 py-3 font-normal">Need</th>
            <th className="px-5 py-3 font-normal">Location</th>
            <th className="px-5 py-3 font-normal">Details</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-line">
          {requests.map((r) => (
            <tr key={r.id}>
              <td className="px-5 py-4 text-steel whitespace-nowrap">{new Date(r.created_at).toLocaleDateString()}</td>
              <td className="px-5 py-4 font-semibold text-charcoal whitespace-nowrap">{r.name}</td>
              <td className="px-5 py-4 text-steel whitespace-nowrap">{r.phone}</td>
              <td className="px-5 py-4 text-steel whitespace-nowrap">{r.need}</td>
              <td className="px-5 py-4 text-steel">{r.location}</td>
              <td className="px-5 py-4 text-steel max-w-xs">{r.details}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
