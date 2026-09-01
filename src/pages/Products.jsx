import { Link } from "react-router-dom";
import PageBanner from "../components/PageBanner";
import { useMaterials, useEquipment } from "../hooks/useSiteData";

function SpecTable({ title, columns, rows, priceKey }) {
  return (
    <div className="mb-16">
      <h2 className="font-display text-2xl text-charcoal mb-5">{title}</h2>
      <div className="border border-line bg-white overflow-x-auto">
        <table className="w-full text-sm min-w-[650px]">
          <thead>
            <tr className="border-b border-line font-mono text-xs text-steel uppercase text-left">
              <th className="px-5 py-3 font-normal w-16"></th>
              {columns.map((c) => (
                <th key={c} className="px-5 py-3 font-normal">{c}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {rows.map((r) => (
              <tr key={r.code} className="hover:bg-paper/60">
                <td className="px-5 py-3">
                  {r.image_url ? (
                    <img src={r.image_url} alt={r.name} className="w-10 h-10 object-cover border border-line" />
                  ) : (
                    <div className="w-10 h-10 border border-line bg-paper" />
                  )}
                </td>
                <td className="px-5 py-4 font-mono text-xs text-steel">{r.code}</td>
                <td className="px-5 py-4 font-semibold text-charcoal">{r.name}</td>
                <td className="px-5 py-4 text-steel">{r.note}</td>
                <td className="px-5 py-4 font-display text-charcoal whitespace-nowrap">{r[priceKey]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function Products() {
  const { rows: materials, loading: materialsLoading } = useMaterials();
  const { rows: equipment, loading: equipmentLoading } = useEquipment();

  return (
    <div>
      <PageBanner
        eyebrow="DIV.01 / DIV.02"
        title="Materials & Equipment"
        detail="Current stock and fleet rates. Prices are guide rates — every order is confirmed on a written quote before delivery."
      />

      <div className="max-w-6xl mx-auto px-6 py-14">
        {materialsLoading ? (
          <p className="text-steel mb-16">Loading materials…</p>
        ) : (
          <SpecTable title="Building Materials" columns={["Code", "Item", "Notes", "Price"]} rows={materials} priceKey="price" />
        )}

        {equipmentLoading ? (
          <p className="text-steel mb-16">Loading equipment…</p>
        ) : (
          <SpecTable title="Heavy Equipment Rental" columns={["Code", "Machine", "Notes", "Rate"]} rows={equipment} priceKey="rate" />
        )}

        <div className="bg-white border border-line p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h3 className="font-display text-xl text-charcoal mb-1">Don't see what you need?</h3>
            <p className="text-steel text-sm">We source outside the standard catalogue for larger projects.</p>
          </div>
          <Link
            to="/quote"
            className="bg-charcoal text-paper font-semibold px-6 py-3 hover:bg-steel transition-colors shrink-0 w-fit"
          >
            Request a Custom Quote
          </Link>
        </div>
      </div>
    </div>
  );
}
