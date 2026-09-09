import { NavLink } from "react-router-dom";

const menuItems = [
  { name: "Dashboard", path: "/admin", icon: "▦" },
  { name: "Events", path: "/admin/events", icon: "🎫" },
  { name: "Organizers", path: "/admin/organizers", icon: "♙" },
  { name: "Customers", path: "/admin/customers", icon: "♙" },
  { name: "Orders", path: "/admin/orders", icon: "▤" },
  { name: "Tickets", path: "/admin/tickets", icon: "▣" },
  { name: "Payouts", path: "/admin/payouts", icon: "₹" },
  { name: "Refunds", path: "/admin/refunds", icon: "↩" },
  { name: "Analytics", path: "/admin/analytics", icon: "↗" },
];

const bottomItems = [
  { name: "Settings", path: "/admin/settings", icon: "⚙" },
  { name: "Audit Logs", path: "/admin/audit-logs", icon: "◷" },
];

export default function AdminSidebar() {
  return (
    <aside className="fixed left-0 top-0 hidden h-screen w-64 flex-col border-r bg-white lg:flex">

      {/* LOGO */}
      <div className="flex h-20 items-center border-b px-6">
        <div>
          <h1 className="text-2xl font-black tracking-tight">
            PRAPT
          </h1>

          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">
            Admin Portal
          </p>
        </div>
      </div>

      {/* MAIN MENU */}
      <nav className="flex-1 space-y-1 overflow-y-auto p-4">

        <p className="mb-3 px-3 text-[11px] font-bold uppercase tracking-wider text-gray-400">
          Management
        </p>

        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === "/admin"}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold transition ${
                isActive
                  ? "bg-black text-white shadow-sm"
                  : "text-gray-600 hover:bg-gray-100 hover:text-black"
              }`
            }
          >
            <span className="flex w-6 justify-center text-base">
              {item.icon}
            </span>

            {item.name}
          </NavLink>
        ))}

        <div className="my-5 border-t" />

        <p className="mb-3 px-3 text-[11px] font-bold uppercase tracking-wider text-gray-400">
          System
        </p>

        {bottomItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold transition ${
                isActive
                  ? "bg-black text-white"
                  : "text-gray-600 hover:bg-gray-100 hover:text-black"
              }`
            }
          >
            <span className="flex w-6 justify-center text-base">
              {item.icon}
            </span>

            {item.name}
          </NavLink>
        ))}

      </nav>

      {/* ADMIN PROFILE */}
      <div className="border-t p-4">

        <div className="flex items-center gap-3 rounded-xl bg-gray-50 p-3">

          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-sm font-bold text-white">
            A
          </div>

          <div className="min-w-0">
            <p className="truncate text-sm font-bold">
              Administrator
            </p>

            <p className="truncate text-xs text-gray-500">
              Platform Admin
            </p>
          </div>

        </div>

      </div>

    </aside>
  );
}