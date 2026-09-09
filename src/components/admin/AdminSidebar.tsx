import { NavLink, Link } from "react-router-dom";
import {
  LayoutDashboard,
  CalendarDays,
  Users,
  UserRound,
  ShoppingBag,
  Ticket,
  CreditCard,
  BarChart3,
  Settings,
  LogOut,
  ArrowLeft,
} from "lucide-react";

const menuItems = [
  {
    label: "Dashboard",
    path: "/admin",
    icon: LayoutDashboard,
  },
  {
    label: "Events",
    path: "/admin/events",
    icon: CalendarDays,
  },
  {
    label: "Organizers",
    path: "/admin/organizers",
    icon: Users,
  },
  {
    label: "Customers",
    path: "/admin/customers",
    icon: UserRound,
  },
  {
    label: "Orders",
    path: "/admin/orders",
    icon: ShoppingBag,
  },
  {
    label: "Tickets",
    path: "/admin/tickets",
    icon: Ticket,
  },
  {
    label: "Payments",
    path: "/admin/payments",
    icon: CreditCard,
  },
  {
    label: "Analytics",
    path: "/admin/analytics",
    icon: BarChart3,
  },
];

export default function AdminSidebar() {
  return (
    <>
      {/* DESKTOP SIDEBAR */}
      <aside className="fixed left-0 top-0 z-40 hidden h-screen w-64 flex-col border-r border-gray-200 bg-white lg:flex">

        {/* LOGO */}
        <div className="flex h-20 shrink-0 items-center border-b border-gray-200 px-6">
          <Link to="/admin" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-black text-lg font-black text-white">
              P
            </div>

            <div>
              <p className="text-lg font-black tracking-tight text-gray-950">
                PRAPT
              </p>

              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">
                Admin Portal
              </p>
            </div>
          </Link>
        </div>

        {/* NAVIGATION */}
        <nav className="flex-1 overflow-y-auto px-4 py-6">

          <p className="px-3 text-[11px] font-bold uppercase tracking-[0.18em] text-gray-400">
            Management
          </p>

          <div className="mt-3 space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === "/admin"}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold transition ${
                      isActive
                        ? "bg-black text-white"
                        : "text-gray-600 hover:bg-gray-100 hover:text-gray-950"
                    }`
                  }
                >
                  <Icon size={18} strokeWidth={1.8} />

                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </div>

          <div className="my-6 border-t border-gray-200" />

          <p className="px-3 text-[11px] font-bold uppercase tracking-[0.18em] text-gray-400">
            System
          </p>

          <NavLink
            to="/admin/settings"
            className={({ isActive }) =>
              `mt-3 flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold transition ${
                isActive
                  ? "bg-black text-white"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-950"
              }`
            }
          >
            <Settings size={18} strokeWidth={1.8} />
            Settings
          </NavLink>

        </nav>

        {/* BOTTOM */}
        <div className="shrink-0 border-t border-gray-200 p-4">

          <Link
            to="/"
            className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-gray-600 transition hover:bg-gray-100 hover:text-gray-950"
          >
            <ArrowLeft size={18} />

            <span>Back to Website</span>
          </Link>

          <div className="mt-3 flex items-center gap-3 rounded-2xl bg-gray-50 p-3">

            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-black text-sm font-bold text-white">
              A
            </div>

            <div className="min-w-0">
              <p className="truncate text-sm font-bold text-gray-950">
                Admin
              </p>

              <p className="truncate text-xs text-gray-400">
                admin@prapt.com
              </p>
            </div>

            <button
              type="button"
              className="ml-auto text-gray-400 transition hover:text-black"
              title="Logout"
            >
              <LogOut size={17} />
            </button>

          </div>

        </div>
      </aside>

      {/* MOBILE TOP BAR */}
      <div className="flex h-16 items-center border-b border-gray-200 bg-white px-5 lg:hidden">
        <Link to="/admin" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-black text-sm font-black text-white">
            P
          </div>

          <div>
            <p className="font-black">PRAPT</p>
            <p className="text-[9px] uppercase tracking-widest text-gray-400">
              Admin
            </p>
          </div>
        </Link>
      </div>
    </>
  );
}