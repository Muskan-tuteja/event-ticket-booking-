
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Events", path: "/events" },
    { name: "My Tickets", path: "/tickets" },
   
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">

        {/* LOGO */}
        <Link
          to="/"
          className="flex items-center gap-2"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-black text-lg font-black text-white">
            P
          </div>

          <div>
            <h1 className="text-2xl font-black tracking-tight">
              PRAPT
            </h1>

            <p className="-mt-1 text-[9px] font-medium tracking-[3px] text-gray-400">
              EXPERIENCES
            </p>
          </div>
        </Link>

        {/* NAVIGATION */}
        <nav className="hidden items-center gap-1 rounded-full bg-gray-100 p-1 md:flex">

          {navItems.map((item) => {
            const active = location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-200 ${
                  active
                    ? "bg-black text-white shadow-sm"
                    : "text-gray-600 hover:bg-white hover:text-black"
                }`}
              >
                {item.name}
              </Link>
            );
          })}

        </nav>

        {/* RIGHT SIDE */}
        <div className="hidden items-center gap-3 md:flex">

          <Link
            to="/organizer"
            className="rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:border-black hover:text-black"
          >
            Create Event
          </Link>

          <Link
            to="/login"
            className="rounded-xl bg-black px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-gray-800"
          >
            Login
          </Link>

        </div>

        {/* MOBILE MENU */}
        <button
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 text-xl md:hidden"
          aria-label="Open menu"
        >
          ☰
        </button>

      </div>
    </header>
  );
}

