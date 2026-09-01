import { NavLink } from "react-router-dom";
import { company } from "../data/content";

const navItems = [
  { to: "/", label: "Home" },
  { to: "/products", label: "Materials & Equipment" },
  { to: "/services", label: "Services" },
  { to: "/about", label: "About / Contact" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-40 bg-charcoal text-paper border-b-4 border-safety">
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-20">
        <NavLink to="/" className="flex items-center gap-3 shrink-0">
          <span className="w-10 h-10 bg-safety text-charcoal font-display font-800 flex items-center justify-center text-xl">
            N
          </span>
          <span className="font-display text-lg leading-tight tracking-tight">
            {company.short}
            <span className="block text-[11px] font-body font-normal text-line tracking-normal">
              Building Concept
            </span>
          </span>
        </NavLink>

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

        <NavLink
          to="/quote"
          className="font-body text-sm font-semibold bg-safety text-charcoal px-5 py-2.5 hover:bg-white transition-colors shrink-0"
        >
          Get a Quote
        </NavLink>
      </div>
    </header>
  );
}
