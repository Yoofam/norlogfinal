import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useSiteSettings } from "../hooks/useSiteData";

const navItems = [
  { to: "/", label: "Home" },
  { to: "/products", label: "Materials & Equipment" },
  { to: "/services", label: "Services" },
  { to: "/about", label: "About / Contact" },
];

export default function Header() {
  const { settings } = useSiteSettings();
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  return (
    <header className="sticky top-0 z-40 bg-charcoal text-paper border-b-4 border-safety">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-20">
        <NavLink to="/" className="flex items-center gap-2.5 sm:gap-3 min-w-0">
          {settings.logo_url ? (
            <img
              src={settings.logo_url}
              alt={settings.company_name}
              className="w-9 h-9 sm:w-10 sm:h-10 object-contain bg-white shrink-0"
            />
          ) : (
            <span className="w-9 h-9 sm:w-10 sm:h-10 bg-safety text-charcoal font-display font-800 flex items-center justify-center text-xl shrink-0">
              {settings.company_name?.[0] || "N"}
            </span>
          )}
          <span className="font-display text-base sm:text-lg leading-tight tracking-tight truncate">
            {settings.company_name}
          </span>
        </NavLink>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8 font-body text-sm">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              className={({ isActive }) =>
                `pb-1 border-b-2 transition-colors ${
                  isActive
                    ? "border-safety text-white"
                    : "border-transparent text-line hover:text-white hover:border-line"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3 shrink-0">
          <NavLink
            to="/quote"
            className="hidden sm:inline-block font-body text-sm font-semibold bg-safety text-charcoal px-5 py-2.5 hover:bg-white transition-colors"
          >
            Get a Quote
          </NavLink>

          {/* Mobile menu toggle */}
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            className="md:hidden w-10 h-10 flex items-center justify-center border-2 border-paper"
          >
            {menuOpen ? (
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="2" y1="2" x2="16" y2="16" />
                <line x1="16" y1="2" x2="2" y2="16" />
              </svg>
            ) : (
              <svg width="18" height="13" viewBox="0 0 18 13" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="0" y1="1" x2="18" y2="1" />
                <line x1="0" y1="6.5" x2="18" y2="6.5" />
                <line x1="0" y1="12" x2="18" y2="12" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu panel */}
      {menuOpen && (
        <nav className="md:hidden border-t border-steel/40">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-2 flex flex-col">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/"}
                className={({ isActive }) =>
                  `py-3.5 border-b border-steel/30 text-base ${
                    isActive ? "text-safety font-semibold" : "text-line"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
            <NavLink
              to="/quote"
              className="mt-4 mb-3 text-center bg-safety text-charcoal font-semibold px-5 py-3"
            >
              Get a Quote
            </NavLink>
          </div>
        </nav>
      )}
    </header>
  );
}
