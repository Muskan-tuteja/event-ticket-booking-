import { useState } from "react";
import {
  TrendingUp,
  IndianRupee,
  Ticket,
  ShoppingBag,
  CalendarDays,
  Users,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

import AdminSidebar from "../../components/admin/AdminSidebar";
import AdminHeader from "../../components/admin/AdminHeader";

const monthlyRevenue = [
  { month: "Apr", value: 42 },
  { month: "May", value: 58 },
  { month: "Jun", value: 51 },
  { month: "Jul", value: 76 },
  { month: "Aug", value: 68 },
  { month: "Sep", value: 91 },
];

const topEvents = [
  {
    name: "Music Fest 2026",
    category: "Music",
    tickets: 482,
    revenue: 240518,
    percentage: 82,
  },
  {
    name: "Tech Summit 2026",
    category: "Technology",
    tickets: 318,
    revenue: 254082,
    percentage: 68,
  },
  {
    name: "Comedy Night",
    category: "Comedy",
    tickets: 275,
    revenue: 109725,
    percentage: 54,
  },
  {
    name: "Startup Meetup",
    category: "Business",
    tickets: 194,
    revenue: 87230,
    percentage: 41,
  },
];

export default function Analytics() {
  const [period, setPeriod] = useState("6 Months");

  const maxRevenue = Math.max(
    ...monthlyRevenue.map((item) => item.value)
  );

  return (
    <div className="min-h-screen bg-[#f7f7f8]">
      <AdminSidebar />

      <div className="min-h-screen lg:ml-[274px]">
        <AdminHeader
          title="Analytics"
          subtitle="Track platform performance, revenue and customer activity."
        />

        <main className="p-5 md:p-8">

          {/* HEADER */}
          <div className="mb-7 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-gray-400">
                Platform Insights
              </p>

              <h1 className="mt-2 text-3xl font-black tracking-tight text-gray-950">
                Analytics
              </h1>

              <p className="mt-2 text-sm text-gray-500">
                Understand how PRAPT is performing across events,
                customers and sales.
              </p>
            </div>

            <div className="flex rounded-xl border border-gray-200 bg-white p-1 shadow-sm">
              {["7 Days", "30 Days", "6 Months"].map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setPeriod(item)}
                  className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
                    period === item
                      ? "bg-black text-white"
                      : "text-gray-500 hover:bg-gray-50"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* KPI CARDS */}
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

            <MetricCard
              title="Total Revenue"
              value="₹12.84L"
              change="+18.4%"
              positive
              icon={<IndianRupee size={20} />}
            />

            <MetricCard
              title="Tickets Sold"
              value="3,842"
              change="+12.8%"
              positive
              icon={<Ticket size={20} />}
            />

            <MetricCard
              title="Total Orders"
              value="1,426"
              change="+9.6%"
              positive
              icon={<ShoppingBag size={20} />}
            />

            <MetricCard
              title="Customers"
              value="2,184"
              change="-2.4%"
              positive={false}
              icon={<Users size={20} />}
            />

          </div>

          {/* REVENUE CHART + QUICK STATS */}
          <div className="mt-6 grid gap-6 xl:grid-cols-[1.65fr_1fr]">

            {/* REVENUE CHART */}
            <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm md:p-6">

              <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">

                <div>
                  <p className="text-sm font-bold text-gray-900">
                    Revenue Overview
                  </p>

                  <h2 className="mt-1 text-2xl font-black tracking-tight">
                    ₹12.84L
                  </h2>

                  <p className="mt-1 flex items-center gap-1 text-xs text-gray-500">
                    <TrendingUp size={13} />
                    18.4% compared to previous period
                  </p>
                </div>

                <div className="rounded-lg bg-gray-50 px-3 py-2 text-xs font-semibold text-gray-500">
                  {period}
                </div>

              </div>

              {/* CHART */}
              <div className="mt-8">

                <div className="relative h-64">

                  {/* GRID */}
                  <div className="absolute inset-0 flex flex-col justify-between">
                    {[100, 75, 50, 25, 0].map((value) => (
                      <div
                        key={value}
                        className="flex items-center gap-3"
                      >
                        <span className="w-8 text-right text-[10px] text-gray-400">
                          {value}k
                        </span>

                        <div className="h-px flex-1 bg-gray-100" />
                      </div>
                    ))}
                  </div>

                  {/* BARS */}
                  <div className="absolute bottom-0 left-11 right-0 top-0 flex items-end justify-around gap-3">

                    {monthlyRevenue.map((item) => {
                      const height =
                        (item.value / maxRevenue) * 100;

                      return (
                        <div
                          key={item.month}
                          className="flex h-full flex-1 flex-col items-center justify-end"
                        >
                          <div className="group relative flex h-full w-full max-w-12 items-end">

                            <div
                              className="w-full rounded-t-lg bg-black transition-all duration-300 group-hover:bg-gray-700"
                              style={{
                                height: `${height}%`,
                              }}
                            >
                              <span className="absolute -top-7 left-1/2 hidden -translate-x-1/2 rounded-md bg-black px-2 py-1 text-[10px] font-bold text-white group-hover:block">
                                ₹{item.value}k
                              </span>
                            </div>

                          </div>

                          <span className="mt-3 text-xs font-medium text-gray-400">
                            {item.month}
                          </span>
                        </div>
                      );
                    })}

                  </div>

                </div>

              </div>
            </section>

            {/* QUICK PERFORMANCE */}
            <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm md:p-6">

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-gray-900">
                    Platform Performance
                  </p>

                  <p className="mt-1 text-xs text-gray-400">
                    Current period
                  </p>
                </div>

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100">
                  <TrendingUp size={18} />
                </div>
              </div>

              <div className="mt-7 space-y-6">

                <ProgressItem
                  label="Ticket Conversion"
                  value="78%"
                  percentage={78}
                />

                <ProgressItem
                  label="Payment Success"
                  value="94%"
                  percentage={94}
                />

                <ProgressItem
                  label="Event Approval"
                  value="86%"
                  percentage={86}
                />

                <ProgressItem
                  label="Customer Retention"
                  value="64%"
                  percentage={64}
                />

              </div>

            </section>

          </div>

          {/* LOWER SECTION */}
          <div className="mt-6 grid gap-6 xl:grid-cols-[1.5fr_1fr]">

            {/* TOP EVENTS */}
            <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

              <div className="flex items-center justify-between border-b border-gray-100 p-5 md:p-6">
                <div>
                  <p className="text-sm font-bold text-gray-900">
                    Top Performing Events
                  </p>

                  <p className="mt-1 text-xs text-gray-400">
                    Events generating the most sales
                  </p>
                </div>

                <button
                  type="button"
                  className="text-xs font-bold text-gray-500 hover:text-black"
                >
                  View All
                </button>
              </div>

              <div className="divide-y divide-gray-100">

                {topEvents.map((event, index) => (
                  <div
                    key={event.name}
                    className="p-5 transition hover:bg-gray-50/60 md:p-6"
                  >

                    <div className="flex items-center gap-4">

                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-black text-sm font-black text-white">
                        0{index + 1}
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex flex-col justify-between gap-2 sm:flex-row">

                          <div>
                            <p className="truncate text-sm font-bold text-gray-900">
                              {event.name}
                            </p>

                            <p className="mt-1 text-xs text-gray-400">
                              {event.category} · {event.tickets} tickets
                            </p>
                          </div>

                          <p className="text-sm font-black text-gray-950">
                            ₹{event.revenue.toLocaleString()}
                          </p>

                        </div>

                        <div className="mt-4 h-2 overflow-hidden rounded-full bg-gray-100">
                          <div
                            className="h-full rounded-full bg-black"
                            style={{
                              width: `${event.percentage}%`,
                            }}
                          />
                        </div>

                      </div>

                    </div>

                  </div>
                ))}

              </div>

            </section>

            {/* ACTIVITY SUMMARY */}
            <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm md:p-6">

              <div>
                <p className="text-sm font-bold text-gray-900">
                  Activity Summary
                </p>

                <p className="mt-1 text-xs text-gray-400">
                  Key platform activity
                </p>
              </div>

              <div className="mt-6 space-y-3">

                <ActivityRow
                  icon={<CalendarDays size={17} />}
                  label="New Events"
                  value="24"
                  change="+14%"
                  positive
                />

                <ActivityRow
                  icon={<Users size={17} />}
                  label="New Customers"
                  value="386"
                  change="+21%"
                  positive
                />

                <ActivityRow
                  icon={<Ticket size={17} />}
                  label="Tickets Issued"
                  value="1,248"
                  change="+17%"
                  positive
                />

                <ActivityRow
                  icon={<ShoppingBag size={17} />}
                  label="Orders"
                  value="512"
                  change="+11%"
                  positive
                />

              </div>

              {/* INSIGHT */}
              <div className="mt-6 rounded-xl bg-gray-50 p-4">
                <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
                  Admin Insight
                </p>

                <p className="mt-2 text-sm leading-6 text-gray-700">
                  Music and technology events are currently driving
                  the highest ticket revenue on the platform.
                </p>
              </div>

            </section>

          </div>

        </main>
      </div>
    </div>
  );
}

/* ================= METRIC CARD ================= */

function MetricCard({
  title,
  value,
  change,
  positive,
  icon,
}: {
  title: string;
  value: string;
  change: string;
  positive: boolean;
  icon: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">

      <div className="flex items-start justify-between">

        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100 text-gray-700">
          {icon}
        </div>

        <div
          className={`flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-bold ${
            positive
              ? "bg-green-50 text-green-700"
              : "bg-red-50 text-red-700"
          }`}
        >
          {positive ? (
            <ArrowUpRight size={13} />
          ) : (
            <ArrowDownRight size={13} />
          )}

          {change}
        </div>

      </div>

      <p className="mt-5 text-sm font-medium text-gray-500">
        {title}
      </p>

      <h3 className="mt-1 text-2xl font-black tracking-tight text-gray-950">
        {value}
      </h3>

      <p className="mt-1 text-xs text-gray-400">
        Compared with previous period
      </p>

    </div>
  );
}

/* ================= PROGRESS ================= */

function ProgressItem({
  label,
  value,
  percentage,
}: {
  label: string;
  value: string;
  percentage: number;
}) {
  return (
    <div>

      <div className="mb-2 flex items-center justify-between">
        <span className="text-sm font-semibold text-gray-700">
          {label}
        </span>

        <span className="text-sm font-black text-gray-950">
          {value}
        </span>
      </div>

      <div className="h-2 overflow-hidden rounded-full bg-gray-100">
        <div
          className="h-full rounded-full bg-black"
          style={{
            width: `${percentage}%`,
          }}
        />
      </div>

    </div>
  );
}

/* ================= ACTIVITY ================= */

function ActivityRow({
  icon,
  label,
  value,
  change,
  positive,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  change: string;
  positive: boolean;
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-gray-100 p-3.5">

      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-gray-600">
        {icon}
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold text-gray-800">
          {label}
        </p>
      </div>

      <div className="text-right">
        <p className="text-sm font-black text-gray-950">
          {value}
        </p>

        <p
          className={`text-[10px] font-bold ${
            positive ? "text-green-600" : "text-red-600"
          }`}
        >
          {change}
        </p>
      </div>

    </div>
  );
}