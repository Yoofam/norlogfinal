import { useState } from "react";
import { useAuth } from "../lib/AuthContext";
import PageBanner from "../components/PageBanner";
import QuoteRequestsPanel from "../components/admin/QuoteRequestsPanel";
import SiteSettingsPanel from "../components/admin/SiteSettingsPanel";
import CatalogPanel from "../components/admin/CatalogPanel";
import ServicesPanel from "../components/admin/ServicesPanel";
import { materialsApi, equipmentApi } from "../lib/api";

const tabs = [
  { id: "requests", label: "Quote Requests" },
  { id: "settings", label: "Contact & Branding" },
  { id: "materials", label: "Materials" },
  { id: "equipment", label: "Equipment" },
  { id: "services", label: "Services" },
];

export default function AdminDashboard() {
  const { session, signOut } = useAuth();
  const [tab, setTab] = useState("requests");

  return (
    <div>
      <PageBanner eyebrow="ADMIN" title="Dashboard" detail={session?.user?.email} />

      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <nav className="flex flex-wrap gap-2">
            {tabs.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`text-sm font-semibold px-4 py-2 border-2 transition-colors ${
                  tab === t.id
                    ? "bg-charcoal text-paper border-charcoal"
                    : "border-line text-steel hover:border-charcoal hover:text-charcoal"
                }`}
              >
                {t.label}
              </button>
            ))}
          </nav>
          <button
            onClick={signOut}
            className="text-sm font-semibold border-2 border-charcoal px-5 py-2 hover:bg-charcoal hover:text-paper transition-colors shrink-0"
          >
            Sign Out
          </button>
        </div>

        {tab === "requests" && <QuoteRequestsPanel />}
        {tab === "settings" && <SiteSettingsPanel />}
        {tab === "materials" && <CatalogPanel api={materialsApi} priceField="price" priceLabel="Price" folder="materials" />}
        {tab === "equipment" && <CatalogPanel api={equipmentApi} priceField="rate" priceLabel="Rate" folder="equipment" />}
        {tab === "services" && <ServicesPanel />}
      </div>
    </div>
  );
}
