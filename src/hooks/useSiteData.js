import { useEffect, useState } from "react";
import { getSiteSettings, materialsApi, equipmentApi, servicesApi } from "../lib/api";
import { company as fallbackCompany, materials as fallbackMaterials, equipment as fallbackEquipment, services as fallbackServices } from "../data/content";

export function useSiteSettings() {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getSiteSettings()
      .then(setSettings)
      .catch(() => setSettings(null))
      .finally(() => setLoading(false));
  }, []);

  const resolved = settings || {
    company_name: fallbackCompany.name,
    tagline: fallbackCompany.tagline,
    phone: fallbackCompany.phone,
    email: fallbackCompany.email,
    address: fallbackCompany.address,
    logo_url: null,
  };

  return { settings: resolved, loading };
}

function useTable(api, fallback) {
  const [rows, setRows] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .list()
      .then(setRows)
      .catch(() => setRows(null))
      .finally(() => setLoading(false));
  }, []);

  return { rows: rows ?? fallback, loading };
}

export function useMaterials() {
  return useTable(materialsApi, fallbackMaterials);
}

export function useEquipment() {
  return useTable(equipmentApi, fallbackEquipment);
}

export function useServices() {
  return useTable(servicesApi, fallbackServices);
}
