import { Link } from "react-router-dom";
import { company, process } from "../data/content";
import { useSiteSettings } from "../hooks/useSiteData";

const divisions = [
  {
    code: "DIV.01",
    accent: "border-steel",
    name: "Building Materials",
    detail: "Cement, blocks, iron rods, sand, granite, tiles and roofing sourced direct from mills and quarries.",
    link: "/products",
    linkLabel: "Shop materials",
  },
  {
    code: "DIV.02",
    accent: "border-rust",
    name: "Heavy Equipment",
    detail: "Excavators, tippers, mixers and compactors — for sale or by the day, week, or project.",
    link: "/products",
    linkLabel: "Rent equipment",
  },
  {
    code: "DIV.03",
    accent: "border-safety",
    name: "Construction Services",
    detail: "Site clearing, foundation work, concrete pours, and consultation, supervised by certified engineers.",
    link: "/services",
    linkLabel: "Book a service",
  },
];

export default function Home() {
  const { settings } = useSiteSettings();
  return (
    <div>
      {/* Hero */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-10 sm:pt-16 pb-14 sm:pb-20 grid md:grid-cols-[1.3fr_1fr] gap-10 sm:gap-12 items-start">
        <div>
          <p className="font-mono text-sm text-rust mb-4">Est. Nigeria — Trusted by Contractors</p>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl leading-[1.1] md:leading-[1.05] text-charcoal">
            {settings.tagline}
          </h1>
          <p className="mt-6 text-steel text-lg max-w-xl leading-relaxed">
            NORLOG supplies materials, rents out heavy machinery, and runs
            construction crews for contractors and homeowners across Nigeria —
            priced right, and delivered on time.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              to="/quote"
              className="bg-charcoal text-paper font-semibold px-7 py-3.5 hover:bg-steel transition-colors"
            >
              Get a Quote
            </Link>
            <Link
              to="/products"
              className="border-2 border-charcoal text-charcoal font-semibold px-7 py-3.5 hover:bg-charcoal hover:text-paper transition-colors"
            >
              Browse Materials
            </Link>
          </div>
        </div>

        {/* Delivery docket */}
        <div className="bg-white border border-line relative">
          <div className="border-b border-dashed border-line px-6 py-3 flex justify-between items-center font-mono text-xs text-steel">
            <span>DELIVERY MANIFEST</span>
            <span>NO. 2026-0831</span>
          </div>
          <dl className="divide-y divide-line">
            {company.stats.map((s) => (
              <div key={s.label} className="flex items-baseline justify-between px-6 py-4">
                <dt className="text-sm text-steel">{s.label}</dt>
                <dd className="font-display text-2xl text-charcoal">
                  {s.value}
                  <span className="text-sm font-body text-rust ml-1">{s.unit}</span>
                </dd>
              </div>
            ))}
          </dl>
          <div className="px-6 py-3 border-t border-line font-mono text-[11px] text-steel">
            Signed off — Site Operations, NORLOG
          </div>
        </div>
      </section>

      {/* Divisions */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="font-display text-3xl text-charcoal mb-10">
          Three divisions. One site partner.
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {divisions.map((d) => (
            <div key={d.code} className={`border-t-4 ${d.accent} bg-white border-l border-r border-b border-line p-6 flex flex-col`}>
              <span className="font-mono text-xs text-steel mb-3">{d.code}</span>
              <h3 className="font-display text-xl text-charcoal mb-2">{d.name}</h3>
              <p className="text-steel text-sm leading-relaxed flex-1">{d.detail}</p>
              <Link to={d.link} className="mt-5 text-sm font-semibold text-charcoal border-b-2 border-safety w-fit hover:text-rust">
                {d.linkLabel}
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Why us — inspection checklist */}
      <section className="bg-white border-y border-line">
        <div className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="font-display text-3xl text-charcoal mb-4">
              Priced right. Delivered on time.
            </h2>
            <p className="text-steel leading-relaxed max-w-md">
              We supply contractors and homeowners across the country with
              the honest pricing and reliable logistics that big projects
              demand.
            </p>
          </div>
          <ul className="space-y-4 font-body">
            {[
              ["Direct-from-source pricing", "No middlemen inflating your BOQ."],
              ["Certified equipment operators", "All rentals include trained operators on request."],
              ["Nationwide delivery", "Tipper and flatbed fleet across 36 states."],
              ["Site supervision", "Engineers on call for critical pours."],
            ].map(([title, detail]) => (
              <li key={title} className="flex gap-4">
                <span className="mt-1 w-5 h-5 border-2 border-charcoal shrink-0 flex items-center justify-center text-xs text-rust">✓</span>
                <div>
                  <p className="font-semibold text-charcoal">{title}</p>
                  <p className="text-steel text-sm">{detail}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Process */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="font-display text-3xl text-charcoal mb-10">How a quote works</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {process.map((p) => (
            <div key={p.step} className="border-l-4 border-charcoal pl-5">
              <span className="font-display text-3xl text-rust">{p.step}</span>
              <h3 className="font-display text-lg text-charcoal mt-2">{p.title}</h3>
              <p className="text-steel text-sm mt-1">{p.detail}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-charcoal text-paper">
        <div className="max-w-6xl mx-auto px-6 py-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <h2 className="font-display text-3xl mb-2">Ready to build?</h2>
            <p className="text-line max-w-md">
              Send us your list. We'll come back with a costed quote — usually
              within 24 hours.
            </p>
          </div>
          <Link
            to="/quote"
            className="bg-safety text-charcoal font-semibold px-8 py-4 hover:bg-white transition-colors shrink-0"
          >
            Start a Quote
          </Link>
        </div>
      </section>
    </div>
  );
}
