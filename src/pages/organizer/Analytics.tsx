import { Link } from "react-router-dom";

const events = [
  {
    name: "Music Fest 2026",
    tickets: 680,
    revenue: "₹4.2L",
    status: "Approved",
  },
  {
    name: "Tech Summit 2026",
    tickets: 365,
    revenue: "₹2.9L",
    status: "Approved",
  },
  {
    name: "Comedy Night",
    tickets: 200,
    revenue: "₹80K",
    status: "Approved",
  },
];

const ticketTypes = [
  { name: "VIP", sold: 320, revenue: "₹3,20,000", percent: 80 },
  { name: "General Admission", sold: 725, revenue: "₹3,62,500", percent: 65 },
  { name: "Early Bird", sold: 200, revenue: "₹1,60,000", percent: 45 },
];

export default function Analytics() {
  return (
    <div className="min-h-screen bg-[#f7f7f8] text-gray-900">

      {/* HEADER */}
      <header className="sticky top-0 z-30 border-b bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 md:px-10">

          <div className="flex items-center gap-4">
            <Link
              to="/organizer"
              className="flex h-10 w-10 items-center justify-center rounded-xl border hover:bg-gray-50"
            >
              ←
            </Link>

            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-gray-400">
                Organizer Portal
              </p>

              <h1 className="text-xl font-black">
                Analytics
              </h1>
            </div>
          </div>

          <select className="rounded-xl border bg-white px-4 py-3 text-sm font-semibold outline-none">
            <option>Last 30 Days</option>
            <option>Last 7 Days</option>
            <option>This Year</option>
            <option>All Time</option>
          </select>

        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-8 md:px-10">

        {/* TITLE */}
        <div>
          <h2 className="text-3xl font-black md:text-4xl">
            Performance Overview
          </h2>

          <p className="mt-2 text-gray-500">
            Track your ticket sales, revenue and event performance.
          </p>
        </div>

        {/* STATS */}
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

          <Stat
            title="Total Revenue"
            value="₹8,42,500"
            change="+18.4%"
            icon="₹"
          />

          <Stat
            title="Tickets Sold"
            value="1,245"
            change="+12.8%"
            icon="🎟"
          />

          <Stat
            title="Total Orders"
            value="428"
            change="+9.2%"
            icon="🛍"
          />

          <Stat
            title="Check-ins"
            value="318"
            change="+14.5%"
            icon="✓"
          />

        </div>

        {/* CHART + REVENUE */}
        <div className="mt-6 grid gap-6 lg:grid-cols-[1.5fr_0.7fr]">

          {/* SALES CHART */}
          <section className="rounded-2xl border bg-white p-6">

            <div className="flex items-start justify-between">

              <div>
                <h3 className="text-lg font-black">
                  Ticket Sales
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  Tickets sold over the selected period
                </p>
              </div>

              <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-bold text-green-700">
                +18.4%
              </span>

            </div>

            <div className="mt-8 flex h-64 items-end gap-3 sm:gap-5">

              {[35, 48, 42, 62, 55, 75, 68, 88, 72, 94, 82, 100].map(
                (height, index) => (
                  <div
                    key={index}
                    className="flex h-full flex-1 flex-col justify-end"
                  >
                    <div
                      className="w-full rounded-t-lg bg-black transition hover:bg-gray-700"
                      style={{ height: `${height}%` }}
                    />
                  </div>
                )
              )}

            </div>

            <div className="mt-3 flex justify-between text-xs text-gray-400">
              <span>Aug 1</span>
              <span>Aug 7</span>
              <span>Aug 14</span>
              <span>Aug 21</span>
              <span>Aug 30</span>
            </div>

          </section>

          {/* REVENUE */}
          <section className="rounded-2xl bg-black p-6 text-white">

            <p className="text-sm text-gray-400">
              Revenue Overview
            </p>

            <p className="mt-3 text-4xl font-black">
              ₹8.42L
            </p>

            <p className="mt-2 text-sm text-green-400">
              ↑ 18.4% compared to last month
            </p>

            <div className="mt-8 space-y-5">

              <RevenueRow
                label="This Week"
                value="₹1,84,500"
              />

              <RevenueRow
                label="This Month"
                value="₹8,42,500"
              />

              <RevenueRow
                label="Average Order"
                value="₹1,975"
              />

            </div>

          </section>

        </div>

        {/* EVENT PERFORMANCE */}
        <section className="mt-6 rounded-2xl border bg-white">

          <div className="border-b p-6">
            <h3 className="text-lg font-black">
              Event Performance
            </h3>

            <p className="mt-1 text-sm text-gray-500">
              Compare performance across your events.
            </p>
          </div>

          <div className="overflow-x-auto">

            <table className="w-full min-w-[700px] text-left">

              <thead className="bg-gray-50 text-xs uppercase tracking-wide text-gray-400">
                <tr>
                  <th className="px-6 py-4">Event</th>
                  <th className="px-6 py-4">Tickets Sold</th>
                  <th className="px-6 py-4">Revenue</th>
                  <th className="px-6 py-4">Status</th>
                </tr>
              </thead>

              <tbody>

                {events.map((event) => (
                  <tr
                    key={event.name}
                    className="border-t hover:bg-gray-50"
                  >

                    <td className="px-6 py-5 font-bold">
                      {event.name}
                    </td>

                    <td className="px-6 py-5 text-sm">
                      {event.tickets}
                    </td>

                    <td className="px-6 py-5 font-bold">
                      {event.revenue}
                    </td>

                    <td className="px-6 py-5">
                      <span className="rounded-full bg-green-100 px-3 py-1.5 text-xs font-bold text-green-700">
                        {event.status}
                      </span>
                    </td>

                  </tr>
                ))}

              </tbody>

            </table>

          </div>

        </section>

        {/* TICKET TYPES */}
        <section className="mt-6 rounded-2xl border bg-white p-6">

          <div>
            <h3 className="text-lg font-black">
              Ticket Type Performance
            </h3>

            <p className="mt-1 text-sm text-gray-500">
              See which ticket types are performing best.
            </p>
          </div>

          <div className="mt-6 space-y-6">

            {ticketTypes.map((ticket) => (
              <div key={ticket.name}>

                <div className="flex items-center justify-between gap-4">

                  <div>
                    <p className="font-bold">
                      {ticket.name}
                    </p>

                    <p className="mt-1 text-xs text-gray-400">
                      {ticket.sold} tickets sold
                    </p>
                  </div>

                  <p className="font-black">
                    {ticket.revenue}
                  </p>

                </div>

                <div className="mt-3 h-2 overflow-hidden rounded-full bg-gray-100">
                  <div
                    className="h-full rounded-full bg-black"
                    style={{ width: `${ticket.percent}%` }}
                  />
                </div>

              </div>
            ))}

          </div>

        </section>

      </main>
    </div>
  );
}

function Stat({
  title,
  value,
  change,
  icon,
}: {
  title: string;
  value: string;
  change: string;
  icon: string;
}) {
  return (
    <div className="rounded-2xl border bg-white p-5 shadow-sm">

      <div className="flex items-center justify-between">

        <p className="text-sm text-gray-500">
          {title}
        </p>

        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100 font-bold">
          {icon}
        </div>

      </div>

      <p className="mt-4 text-2xl font-black">
        {value}
      </p>

      <p className="mt-2 text-xs font-bold text-green-600">
        {change} from last period
      </p>

    </div>
  );
}

function RevenueRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between border-b border-white/10 pb-4 last:border-0">

      <span className="text-sm text-gray-400">
        {label}
      </span>

      <span className="font-bold">
        {value}
      </span>

    </div>
  );
}