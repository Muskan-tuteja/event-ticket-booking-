import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Events", path: "/events" },
    { name: "My Tickets", path: "/tickets" },
  ];

  const closeMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur">

      {/* =====================================================
          NAVBAR
      ===================================================== */}

      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">

        {/* LOGO */}

        <Link
          to="/"
          onClick={closeMenu}
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


        {/* =====================================================
            DESKTOP NAVIGATION
        ===================================================== */}

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


        {/* =====================================================
            DESKTOP RIGHT SIDE
        ===================================================== */}

        <div className="hidden items-center gap-3 md:flex">

          <Link
            to="/organizer"
            className="rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-semibold text-gray-700 transition duration-300 hover:-translate-y-0.5 hover:border-black hover:text-black"
          >
            Create Event
          </Link>

          <Link
            to="/login"
            className="rounded-xl bg-black px-5 py-2.5 text-sm font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-gray-800"
          >
            Login
          </Link>

        </div>


        {/* =====================================================
            MOBILE HAMBURGER
        ===================================================== */}

        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="relative flex h-11 w-11 items-center justify-center rounded-xl border border-gray-200 bg-white transition-all duration-300 hover:bg-gray-100 active:scale-95 md:hidden"
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileMenuOpen}
        >

          <span
            className={`absolute h-0.5 w-5 bg-black transition-all duration-300 ${
              mobileMenuOpen
                ? "rotate-45"
                : "-translate-y-1.5"
            }`}
          />

          <span
            className={`absolute h-0.5 w-5 bg-black transition-all duration-300 ${
              mobileMenuOpen
                ? "opacity-0"
                : "opacity-100"
            }`}
          />

          <span
            className={`absolute h-0.5 w-5 bg-black transition-all duration-300 ${
              mobileMenuOpen
                ? "-rotate-45"
                : "translate-y-1.5"
            }`}
          />

        </button>

      </div>


      {/* =====================================================
          MOBILE MENU
      ===================================================== */}

      <div
        className={`overflow-hidden border-t border-gray-100 bg-white transition-all duration-300 md:hidden ${
          mobileMenuOpen
            ? "max-h-[500px] opacity-100"
            : "max-h-0 opacity-0"
        }`}
      >

        <div className="px-5 py-4">

          <div className="flex flex-col gap-2">

            {navItems.map((item) => {
              const active = location.pathname === item.path;

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={closeMenu}
                  className={`rounded-xl px-4 py-3.5 text-sm font-semibold transition-all duration-300 ${
                    active
                      ? "bg-black text-white"
                      : "text-gray-700 hover:bg-gray-100 hover:text-black"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    {item.name}

                    <span
                      className={`transition-transform duration-300 ${
                        active ? "translate-x-1" : ""
                      }`}
                    >
                      →
                    </span>
                  </div>
                </Link>
              );
            })}


            {/* Divider */}

            <div className="my-2 border-t border-gray-100" />


            {/* Create Event */}

            <Link
              to="/organizer"
              onClick={closeMenu}
              className="rounded-xl border border-gray-200 px-4 py-3.5 text-center text-sm font-semibold text-gray-800 transition-all duration-300 hover:border-black hover:bg-gray-50"
            >
              Create Event
            </Link>


            {/* Login */}

            <Link
              to="/login"
              onClick={closeMenu}
              className="rounded-xl bg-black px-4 py-3.5 text-center text-sm font-bold text-white transition-all duration-300 hover:bg-gray-800 active:scale-[0.98]"
            >
              Login
            </Link>

          </div>

        </div>

      </div>

    </header>
  );
}