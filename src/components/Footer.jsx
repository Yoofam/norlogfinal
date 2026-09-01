import { Link } from "react-router-dom";
import { useSiteSettings } from "../hooks/useSiteData";

export default function Footer() {
  const { settings } = useSiteSettings();

  return (
    <footer className="bg-charcoal text-paper mt-24">
      <div className="max-w-6xl mx-auto px-6 py-14 grid gap-10 md:grid-cols-3">
        <div>
          <div className="font-display text-lg mb-3">{settings.company_name}</div>
          <p className="text-sm text-line max-w-xs leading-relaxed">
            {settings.tagline}
          </p>
        </div>

        <div className="font-mono text-sm text-line space-y-1">
          <div className="text-white font-body font-semibold mb-2 text-sm">Contact</div>
          <div>{settings.phone}</div>
          <div>{settings.email}</div>
          <div>{settings.address}</div>
        </div>

        <div className="text-sm space-y-1">
          <div className="text-white font-body font-semibold mb-2">Quick Links</div>
          <Link to="/products" className="block text-line hover:text-safety w-fit">Materials & Equipment</Link>
          <Link to="/services" className="block text-line hover:text-safety w-fit">Services</Link>
          <Link to="/quote" className="block text-line hover:text-safety w-fit">Request a Quote</Link>
          <Link to="/about" className="block text-line hover:text-safety w-fit">About / Contact</Link>
        </div>
      </div>
      <div className="border-t border-steel/40 text-center text-xs text-line py-5 flex flex-col md:flex-row items-center justify-center gap-2">
        <span>© {new Date().getFullYear()} {settings.company_name?.toUpperCase()}. All rights reserved.</span>
        <Link to="/admin" className="md:ml-2 text-steel hover:text-safety">Admin</Link>
      </div>
    </footer>
  );
}
