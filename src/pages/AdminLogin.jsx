import { useState } from "react";
import { useAuth } from "../lib/AuthContext";
import PageBanner from "../components/PageBanner";

export default function AdminLogin() {
  const { signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const { error } = await signIn(email, password);
    setLoading(false);
    if (error) setError(error.message);
  }

  return (
    <div>
      <PageBanner eyebrow="RESTRICTED" title="Admin sign in" />
      <div className="max-w-sm mx-auto px-6 py-14">
        <form onSubmit={handleSubmit} className="bg-white border border-line p-8 space-y-5">
          <label className="block">
            <span className="text-xs font-mono text-steel uppercase">Email</span>
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1.5 w-full border border-line px-4 py-2.5 bg-paper focus:bg-white"
            />
          </label>
          <label className="block">
            <span className="text-xs font-mono text-steel uppercase">Password</span>
            <input
              required
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1.5 w-full border border-line px-4 py-2.5 bg-paper focus:bg-white"
            />
          </label>

          {error && (
            <p className="text-rust text-sm border border-rust/40 bg-rust/5 px-3 py-2">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="bg-charcoal text-paper font-semibold px-7 py-3 hover:bg-steel transition-colors w-full disabled:opacity-60"
          >
            {loading ? "Signing in…" : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
