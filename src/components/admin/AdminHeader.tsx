import { Link } from "react-router-dom";

export default function AdminHeader() {
  return (
    <header className="sticky top-0 z-20 flex h-20 items-center justify-between border-b bg-white/95 px-6 backdrop-blur md:px-8">

      {/* MOBILE LOGO */}
      <div className="lg:hidden">
        <h1 className="text-xl font-black">
          PRAPT
        </h1>

        <p className="text-[9px] font-bold uppercase tracking-widest text-gray-400">
          Admin
        </p>
      </div>

      {/* DESKTOP TITLE */}
      <div className="hidden lg:block">
        <p className="text-sm text-gray-400">
          Welcome back
        </p>

        <p className="font-bold">
          Platform Administrator
        </p>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-3">

        {/* Notifications */}
        <button
          className="relative flex h-11 w-11 items-center justify-center rounded-xl border text-lg transition hover:bg-gray-50"
          aria-label="Notifications"
        >
          🔔

          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-black" />
        </button>

        {/* Profile */}
        <Link
          to="/admin/settings"
          className="flex items-center gap-3 rounded-xl border px-3 py-2 transition hover:bg-gray-50"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-black text-xs font-bold text-white">
            A
          </div>

          <div className="hidden text-left sm:block">
            <p className="text-sm font-bold">
              Admin
            </p>

            <p className="text-[11px] text-gray-400">
              Administrator
            </p>
          </div>
        </Link>

      </div>

    </header>
  );
}