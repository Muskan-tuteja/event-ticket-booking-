import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Events", path: "/events" },
    { name: "My Tickets", path: "/tickets" },
  ];

  const getCustomer = () => {
    const data =
      localStorage.getItem("prapt_customer") ||
      sessionStorage.getItem("prapt_customer");

    if (!data) return null;

    try {
      return JSON.parse(data);
    } catch {
      return null;
    }
  };

  const customer = getCustomer();

  const closeMenu = () => {
    setMobileMenuOpen(false);
    setProfileOpen(false);
  };

  const getName = () => {
    if (!customer) return "";

    return (
      customer.full_name ||
      customer.name ||
      customer.email?.split("@")[0] ||
      "User"
    );
  };

  const getInitial = () => {
    return getName().charAt(0).toUpperCase();
  };

  const handleLogout = () => {
    localStorage.removeItem("prapt_access_token");
    localStorage.removeItem("prapt_refresh_token");
    localStorage.removeItem("prapt_user");
    localStorage.removeItem("prapt_profile");
    localStorage.removeItem("prapt_customer");

    sessionStorage.removeItem("prapt_access_token");
    sessionStorage.removeItem("prapt_refresh_token");
    sessionStorage.removeItem("prapt_user");
    sessionStorage.removeItem("prapt_profile");
    sessionStorage.removeItem("prapt_customer");

    setProfileOpen(false);
    setMobileMenuOpen(false);

    navigate("/login", { replace: true });
  };

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur-xl">

      {/* NAVBAR */}

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

        {/* DESKTOP NAV */}

        <nav className="hidden items-center gap-1 rounded-full bg-gray-100 p-1 md:flex">

          {navItems.map((item) => {
            const active =
              location.pathname === item.path;

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

          {/* CREATE EVENT */}

          <Link
            to="/organizer"
            className="rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-semibold text-gray-700 transition duration-300 hover:-translate-y-0.5 hover:border-black hover:text-black"
          >
            Create Event
          </Link>

          {/* USER LOGGED IN */}

          {customer ? (
            <div className="relative">

              <button
                type="button"
                onClick={() =>
                  setProfileOpen((prev) => !prev)
                }
                className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white px-3 py-2 transition-all duration-200 hover:border-black hover:shadow-sm"
              >

                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-black text-sm font-bold text-white">
                  {getInitial()}
                </div>

                <div className="max-w-[130px] text-left">
                  <p className="truncate text-sm font-bold text-gray-900">
                    {getName()}
                  </p>

                  <p className="text-[11px] text-gray-400">
                    My account
                  </p>
                </div>

                <span
                  className={`text-xs text-gray-400 transition-transform ${
                    profileOpen ? "rotate-180" : ""
                  }`}
                >
                  ▼
                </span>

              </button>

              {/* PROFILE DROPDOWN */}

              {profileOpen && (
                <div className="absolute right-0 top-[calc(100%+10px)] w-60 overflow-hidden rounded-2xl border border-gray-200 bg-white p-2 shadow-xl">

                  <div className="border-b border-gray-100 px-3 py-3">

                    <p className="text-sm font-bold text-gray-900">
                      {getName()}
                    </p>

                    <p className="mt-1 truncate text-xs text-gray-400">
                      {customer.email}
                    </p>

                  </div>

                  <Link
                    to="/tickets"
                    onClick={() => setProfileOpen(false)}
                    className="mt-1 flex items-center justify-between rounded-xl px-3 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-100 hover:text-black"
                  >
                    My Tickets
                    <span>→</span>
                  </Link>

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="flex w-full items-center justify-between rounded-xl px-3 py-3 text-left text-sm font-semibold text-red-500 transition hover:bg-red-50"
                  >
                    Logout
                    <span>↗</span>
                  </button>

                </div>
              )}

            </div>
          ) : (

            /* LOGIN */

            <Link
              to="/login"
              className="rounded-xl bg-black px-5 py-2.5 text-sm font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-violet-600"
            >
              Login
            </Link>

          )}

        </div>

        {/* MOBILE HAMBURGER */}

        <button
          type="button"
          onClick={() =>
            setMobileMenuOpen((prev) => !prev)
          }
          className="relative flex h-11 w-11 items-center justify-center rounded-xl border border-gray-200 bg-white transition-all duration-300 hover:bg-gray-100 active:scale-95 md:hidden"
          aria-label={
            mobileMenuOpen
              ? "Close menu"
              : "Open menu"
          }
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

      {/* MOBILE MENU */}

      <div
        className={`overflow-hidden border-t border-gray-100 bg-white transition-all duration-300 md:hidden ${
          mobileMenuOpen
            ? "max-h-[650px] opacity-100"
            : "max-h-0 opacity-0"
        }`}
      >

        <div className="px-5 py-4">

          <div className="flex flex-col gap-2">

            {navItems.map((item) => {
              const active =
                location.pathname === item.path;

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={closeMenu}
                  className={`rounded-xl px-4 py-3.5 text-sm font-semibold ${
                    active
                      ? "bg-black text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    {item.name}
                    <span>→</span>
                  </div>
                </Link>
              );
            })}

            <div className="my-2 border-t border-gray-100" />

            <Link
              to="/organizer"
              onClick={closeMenu}
              className="rounded-xl border border-gray-200 px-4 py-3.5 text-center text-sm font-semibold text-gray-800 hover:border-black"
            >
              Create Event
            </Link>

            {customer ? (

              <>
                <div className="flex items-center gap-3 rounded-xl bg-gray-50 px-4 py-3">

                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-sm font-bold text-white">
                    {getInitial()}
                  </div>

                  <div className="min-w-0">
                    <p className="truncate text-sm font-bold">
                      {getName()}
                    </p>

                    <p className="truncate text-xs text-gray-400">
                      {customer.email}
                    </p>
                  </div>

                </div>

                <Link
                  to="/tickets"
                  onClick={closeMenu}
                  className="rounded-xl bg-gray-100 px-4 py-3.5 text-center text-sm font-semibold text-gray-800"
                >
                  My Tickets
                </Link>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="rounded-xl bg-red-50 px-4 py-3.5 text-center text-sm font-bold text-red-500"
                >
                  Logout
                </button>
              </>

            ) : (

              <Link
                to="/login"
                onClick={closeMenu}
                className="rounded-xl bg-black px-4 py-3.5 text-center text-sm font-bold text-white"
              >
                Login
              </Link>

            )}

          </div>

        </div>

      </div>

    </header>
  );
}