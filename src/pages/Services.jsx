import { Link } from "react-router-dom";
import PageBanner from "../components/PageBanner";
import { useServices } from "../hooks/useSiteData";

export default function Services() {
  const { rows: services, loading } = useServices();

  return (
    <div>
      <PageBanner
        eyebrow="DIV.03"
        title="Construction Services"
        detail="Crews and certified engineers, booked alongside your materials or on their own."
      />

      <div className="max-w-6xl mx-auto px-6 py-14 grid md:grid-cols-2 gap-6">
        {loading ? (
          <p className="text-steel">Loading services…</p>
        ) : (
          services.map((s) => (
            <div key={s.name} className="border border-line bg-white p-7">
              <h3 className="font-display text-xl text-charcoal mb-2">{s.name}</h3>
              <p className="text-steel text-sm leading-relaxed">{s.detail}</p>
            </div>
          ))
        )}
      </div>

      <div className="max-w-6xl mx-auto px-6 pb-16">
        <div className="bg-charcoal text-paper p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <h3 className="font-display text-2xl mb-1">Bring us your scope</h3>
            <p className="text-line text-sm max-w-md">
              Send drawings or a BOQ and an engineer will review it before you commit to a supplier.
            </p>
          </div>
          <Link
            to="/quote"
            className="bg-safety text-charcoal font-semibold px-7 py-3.5 hover:bg-white transition-colors shrink-0"
          >
            Book a Service
          </Link>
        </div>
      </div>
    </div>
  );
}
