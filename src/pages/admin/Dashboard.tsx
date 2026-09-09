import {
  CalendarDays,
  Ticket,
  IndianRupee,
  Users,
  ArrowUpRight,
  MoreHorizontal,
  CheckCircle2,
  Clock3,
} from "lucide-react";

import AdminSidebar from "../../components/admin/AdminSidebar";
import AdminHeader from "../../components/admin/AdminHeader";
import { Link } from "react-router-dom";

const stats = [
  {
    title: "Total Events",
    value: "128",
    change: "+12.5%",
    icon: CalendarDays,
  },
  {
    title: "Tickets Sold",
    value: "18,420",
    change: "+18.2%",
    icon: Ticket,
  },
  {
    title: "Total Revenue",
    value: "₹24.8L",
    change: "+14.8%",
    icon: IndianRupee,
  },
  {
    title: "Customers",
    value: "8,642",
    change: "+9.4%",
    icon: Users,
  },
];

const events = [
  {
    title: "Music Fest 2026",
    organizer: "Live Nation India",
    location: "Gurugram",
    date: "20 Sep 2026",
    tickets: "540",
    status: "Approved",
  },
  {
    title: "Tech Summit 2026",
    organizer: "Tech Community",
    location: "Noida",
    date: "25 Sep 2026",
    tickets: "320",
    status: "Pending",
  },
  {
    title: "Comedy Night",
    organizer: "Laugh Factory",
    location: "Delhi",
    date: "28 Sep 2026",
    tickets: "210",
    status: "Approved",
  },
];

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-[#f7f7f8]">

      {/* ================= SIDEBAR ================= */}
      <AdminSidebar />

      {/* ================= MAIN CONTENT ================= */}
      <div className="min-h-screen lg:ml-[274px]">

        {/* HEADER */}
        <AdminHeader
          title="Dashboard"
          subtitle="Overview of your PRAPT platform."
        />

        <main className="p-5 md:p-8">

          {/* ================= WELCOME ================= */}
          <section className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-end">

            <div>
              <p className="text-sm font-semibold text-gray-500">
                Welcome back, Admin 👋
              </p>

              <h2 className="mt-2 text-3xl font-black tracking-tight text-gray-950 md:text-4xl">
                Platform overview
              </h2>

              <p className="mt-2 text-sm text-gray-500">
                Monitor events, sales and platform activity.
              </p>
            </div>

            <Link
              to="/admin/events"
              className="inline-flex w-fit items-center justify-center gap-2 rounded-xl bg-black px-5 py-3 text-sm font-bold text-white transition hover:bg-gray-800"
            >
              Manage Events
              <ArrowUpRight size={17} />
            </Link>

          </section>

          {/* ================= STATS ================= */}
          <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

            {stats.map((stat) => {
              const Icon = stat.icon;

              return (
                <div
                  key={stat.title}
                  className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md"
                >

                  <div className="flex items-start justify-between">

                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        {stat.title}
                      </p>

                      <h3 className="mt-2 text-3xl font-black tracking-tight text-gray-950">
                        {stat.value}
                      </h3>
                    </div>

                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gray-100">
                      <Icon size={20} />
                    </div>

                  </div>

                  <div className="mt-5 flex items-center gap-2 text-xs font-semibold">

                    <span className="rounded-full bg-green-50 px-2 py-1 text-green-700">
                      {stat.change}
                    </span>

                    <span className="text-gray-400">
                      vs last month
                    </span>

                  </div>

                </div>
              );
            })}

          </section>

          {/* ================= CONTENT ================= */}
          <section className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1.6fr)_minmax(320px,1fr)]">

            {/* ================= RECENT EVENTS ================= */}
            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

              <div className="flex items-center justify-between border-b border-gray-100 p-6">

                <div>
                  <h3 className="font-black text-gray-950">
                    Recent Events
                  </h3>

                  <p className="mt-1 text-sm text-gray-500">
                    Latest events submitted on PRAPT
                  </p>
                </div>

                <Link
                  to="/admin/events"
                  className="text-sm font-bold text-gray-900 underline underline-offset-4"
                >
                  View all
                </Link>

              </div>

              <div>

                {events.map((event) => (
                  <div
                    key={event.title}
                    className="flex flex-col gap-4 border-b border-gray-100 p-5 last:border-0 sm:flex-row sm:items-center sm:justify-between"
                  >

                    {/* EVENT INFO */}
                    <div className="flex min-w-0 items-center gap-4">

                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gray-100">
                        <CalendarDays size={19} />
                      </div>

                      <div className="min-w-0">

                        <p className="truncate font-bold text-gray-950">
                          {event.title}
                        </p>

                        <p className="mt-1 text-sm text-gray-500">
                          {event.organizer}
                        </p>

                        <p className="mt-1 text-xs text-gray-400">
                          {event.location} • {event.date}
                        </p>

                      </div>

                    </div>

                    {/* EVENT STATUS */}
                    <div className="flex shrink-0 items-center justify-between gap-5 sm:justify-end">

                      <div className="text-right">
                        <p className="text-sm font-bold text-gray-950">
                          {event.tickets}
                        </p>

                        <p className="text-xs text-gray-400">
                          tickets
                        </p>
                      </div>

                      <span
                        className={`rounded-full px-3 py-1.5 text-xs font-bold ${
                          event.status === "Approved"
                            ? "bg-green-50 text-green-700"
                            : "bg-yellow-50 text-yellow-700"
                        }`}
                      >
                        {event.status}
                      </span>

                      <button
                        type="button"
                        className="text-gray-400 transition hover:text-black"
                      >
                        <MoreHorizontal size={18} />
                      </button>

                    </div>

                  </div>
                ))}

              </div>

            </div>

            {/* ================= PLATFORM ACTIVITY ================= */}
            <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">

              <div className="border-b border-gray-100 p-6">

                <h3 className="font-black text-gray-950">
                  Platform Activity
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  Latest admin activity
                </p>

              </div>

              <div className="space-y-6 p-6">

                <div className="flex gap-3">

                  <CheckCircle2
                    className="mt-0.5 shrink-0 text-green-600"
                    size={20}
                  />

                  <div>
                    <p className="text-sm font-semibold text-gray-900">
                      Music Fest 2026 approved
                    </p>

                    <p className="mt-1 text-xs text-gray-400">
                      12 minutes ago
                    </p>
                  </div>

                </div>

                <div className="flex gap-3">

                  <Clock3
                    className="mt-0.5 shrink-0 text-yellow-600"
                    size={20}
                  />

                  <div>
                    <p className="text-sm font-semibold text-gray-900">
                      Tech Summit waiting for approval
                    </p>

                    <p className="mt-1 text-xs text-gray-400">
                      35 minutes ago
                    </p>
                  </div>

                </div>

                <div className="flex gap-3">

                  <Users
                    className="mt-0.5 shrink-0 text-gray-600"
                    size={20}
                  />

                  <div>
                    <p className="text-sm font-semibold text-gray-900">
                      24 new customers registered
                    </p>

                    <p className="mt-1 text-xs text-gray-400">
                      1 hour ago
                    </p>
                  </div>

                </div>

              </div>

            </div>

          </section>

          {/* ================= SALES OVERVIEW ================= */}
          <section className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

            <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">

              <div>
                <h3 className="font-black text-gray-950">
                  Ticket Sales Overview
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  Sales performance this month
                </p>
              </div>

              <span className="w-fit rounded-lg bg-gray-100 px-3 py-2 text-xs font-semibold text-gray-600">
                September 2026
              </span>

            </div>

            {/* CHART */}
            <div className="mt-8">

              <div className="flex h-48 items-end gap-2 sm:gap-3">

                {[35, 52, 45, 70, 58, 82, 65, 91, 76, 84, 70, 96].map(
                  (height, index) => (
                    <div
                      key={index}
                      className="flex h-full flex-1 items-end"
                    >
                      <div
                        style={{
                          height: `${height}%`,
                        }}
                        className="w-full rounded-t-lg bg-black transition hover:bg-gray-700"
                      />
                    </div>
                  )
                )}

              </div>

              <div className="mt-3 flex justify-between text-xs text-gray-400">
                <span>Sep 1</span>
                <span>Sep 7</span>
                <span>Sep 14</span>
                <span>Sep 21</span>
                <span>Sep 30</span>
              </div>

            </div>

          </section>

        </main>

      </div>
    </div>
  );
}