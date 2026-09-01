import { useAuth } from "../lib/AuthContext";
import AdminLogin from "./AdminLogin";
import AdminDashboard from "./AdminDashboard";

export default function Admin() {
  const { session, loading } = useAuth();

  if (loading) {
    return <div className="max-w-6xl mx-auto px-6 py-20 text-steel">Loading…</div>;
  }

  return session ? <AdminDashboard /> : <AdminLogin />;
}
