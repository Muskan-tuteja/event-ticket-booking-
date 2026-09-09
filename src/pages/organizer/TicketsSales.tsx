import { Link } from "react-router-dom";
import { useMemo, useState } from "react";

const ticketTypes = [
  {
    name: "General Admission",
    price: 499,
    sold: 420,
    total: 500,
    revenue: 209580,
  },
  {
    name: "VIP",
    price: 999,
    sold: 72,
    total: 100,
    revenue: 71928,
  },
];

const orders = [
  {
    id: "#PR1028",
    customer: "Riya Sharma",
    email: "riya@example.com",
    ticket: "VIP",
    quantity: 2,
    amount: 1998,
    status: "Paid",
    date: "09 Sep 2026",
  },
  {
    id: "#PR1027",
    customer: "Neha Singh",
    email: "neha@example.com",
    ticket: "General Admission",
    quantity: 2,
    amount: 998,
    status: "Paid",
    date: "09 Sep 2026",
  },
  {
    id: "#PR1026",
    customer: "Aman Gupta",
    email: "aman@example.com",
    ticket: "General Admission",
    quantity: 1,
    amount: 499,
    status: "Paid",
    date: "08 Sep 2026",
  },
  {
    id: "#PR1025",
    customer: "Rahul Verma",
    email: "rahul@example.com",
    ticket: "VIP",
    quantity: 1,
    amount: 999,
    status: "Refunded",
    date: "08 Sep 2026",
  },
  {
    id: "#PR1024",
    customer: "Karan Mehta",
    email: "karan@example.com",
    ticket: "General Admission",
    quantity: 3,
    amount: 1497,
    status: "Paid",
    date: "07 Sep 2026",
  },
];

export default function TicketsSales() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [search, setSearch] = useState("");

  const totalSold = ticketTypes.reduce(
    (sum, ticket) => sum + ticket.sold,
    0
  );

  const totalRevenue = ticketTypes.reduce(
    (sum, ticket) => sum + ticket.revenue,
    0
  );

  const totalAvailable = ticketTypes.reduce(
    (sum, ticket) => sum + ticket.total - ticket.sold,
    0
  );

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const filterMatch =
        activeFilter === "All" ||
        order.status === activeFilter;

      const searchMatch =
        order.customer.toLowerCase().includes(search.toLowerCase()) ||
        order.id.toLowerCase().includes(search.toLowerCase()) ||
        order.ticket.toLowerCase().includes(search.toLowerCase());

      return filterMatch && searchMatch;
    });
  }, [activeFilter, search]);

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
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">
                Organizer Portal
              </p>

              <h1 className="text-xl font-black">
                Tickets & Sales
              </h1>
            </div>

          </div>

          <button className="rounded-xl bg-black px-5 py-3 text-sm font-bold text-white hover:bg-gray-800">
            Export Sales
          </button>

        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-8 md:px-10">

        {/* INTRO */}
        <div>
          <h2 className="text-3xl font-black md:text-4xl">
            Tickets & Sales
          </h2>

          <p className="mt-2 text-gray-500">
            Track ticket sales, revenue and customer orders.
          </p>
        </div>

        {/* STATS */}
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

          <StatCard
            title="Total Revenue"
            value={`₹${totalRevenue.toLocaleString("en-IN")}`}
            subtitle="Gross ticket revenue"
            icon="₹"
          />

          <StatCard
            title="Tickets Sold"
            value={totalSold.toString()}
            subtitle="Across all ticket types"
            icon="🎟️"
          />

          <StatCard
            title="Available"
            value={totalAvailable.toString()}
            subtitle="Tickets remaining"
            icon="◷"
          />

          <StatCard
            title="Total Orders"
            value="428"
            subtitle="Successful purchases"
            icon="↗"
          />

        </div>

        {/* SALES CHART */}
        <section className="mt-8 rounded-3xl border bg-white p-6 md:p-8">

          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

            <div>
              <h3 className="text-xl font-black">
                Sales Performance
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                Ticket sales over the last 30 days.
              </p>
            </div>

            <select className="rounded-xl border px-4 py-2.5 text-sm font-semibold outline-none">
              <option>Last 30 Days</option>
              <option>Last 7 Days</option>
              <option>This Month</option>
            </select>

          </div>

          <div className="mt-8 flex h-64 items-end gap-2 border-b">

            {[30, 42, 35, 55, 48, 68, 52, 75, 62, 80, 72, 90, 65, 95, 82, 100].map(
              (height, index) => (
                <div
                  key={index}
                  className="flex h-full flex-1 items-end"
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
            <span>Aug 10</span>
            <span>Aug 20</span>
            <span>Aug 30</span>
            <span>Sep 09</span>
          </div>

        </section>

        {/* TICKET TYPES */}
        <section className="mt-8">

          <div className="flex items-end justify-between">

            <div>
              <h3 className="text-2xl font-black">
                Ticket Types
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                Sales performance by ticket category.
              </p>
            </div>

            <Link
              to="/organizer/events/1"
              className="text-sm font-bold underline"
            >
              Manage Tickets
            </Link>

          </div>

          <div className="mt-5 grid gap-5 md:grid-cols-2">

            {ticketTypes.map((ticket) => {

              const percentage = Math.round(
                (ticket.sold / ticket.total) * 100
              );

              return (
                <div
                  key={ticket.name}
                  className="rounded-2xl border bg-white p-6 shadow-sm"
                >

                  <div className="flex items-start justify-between">

                    <div>
                      <p className="text-sm text-gray-500">
                        Ticket Type
                      </p>

                      <h4 className="mt-1 text-xl font-black">
                        {ticket.name}
                      </h4>
                    </div>

                    <span className="rounded-xl bg-gray-100 px-3 py-2 text-sm font-bold">
                      ₹{ticket.price}
                    </span>

                  </div>

                  <div className="mt-6 flex justify-between">

                    <div>
                      <p className="text-xs text-gray-400">
                        Sold
                      </p>

                      <p className="mt-1 text-xl font-black">
                        {ticket.sold}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-gray-400">
                        Revenue
                      </p>

                      <p className="mt-1 text-xl font-black">
                        ₹{ticket.revenue.toLocaleString("en-IN")}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-gray-400">
                        Sales
                      </p>

                      <p className="mt-1 text-xl font-black">
                        {percentage}%
                      </p>
                    </div>

                  </div>

                  <div className="mt-5 h-2 rounded-full bg-gray-100">
                    <div
                      className="h-full rounded-full bg-black"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>

                </div>
              );
            })}

          </div>

        </section>

        {/* ORDERS */}
        <section className="mt-8">

          <div>
            <h3 className="text-2xl font-black">
              Recent Orders
            </h3>

            <p className="mt-1 text-sm text-gray-500">
              View and track customer ticket purchases.
            </p>
          </div>

          {/* SEARCH + FILTER */}
          <div className="mt-5 rounded-2xl border bg-white p-3">

            <div className="flex flex-col gap-3 md:flex-row">

              <div className="relative flex-1">

                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                  🔍
                </span>

                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search customer, order or ticket..."
                  className="h-12 w-full rounded-xl bg-gray-100 pl-11 pr-4 outline-none focus:bg-white focus:ring-2 focus:ring-black"
                />

              </div>

              <div className="flex gap-2">

                {["All", "Paid", "Refunded"].map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    className={`rounded-xl px-4 py-3 text-sm font-semibold ${
                      activeFilter === filter
                        ? "bg-black text-white"
                        : "border hover:bg-gray-50"
                    }`}
                  >
                    {filter}
                  </button>
                ))}

              </div>

            </div>

          </div>

          {/* TABLE */}
          <div className="mt-4 overflow-hidden rounded-2xl border bg-white">

            <div className="overflow-x-auto">

              <table className="w-full min-w-[850px] text-left">

                <thead className="border-b bg-gray-50 text-xs uppercase tracking-wide text-gray-400">

                  <tr>
                    <th className="px-6 py-4">Order</th>
                    <th className="px-6 py-4">Customer</th>
                    <th className="px-6 py-4">Ticket</th>
                    <th className="px-6 py-4">Qty</th>
                    <th className="px-6 py-4">Amount</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Date</th>
                  </tr>

                </thead>

                <tbody>

                  {filteredOrders.map((order) => (

                    <tr
                      key={order.id}
                      className="border-b last:border-0 hover:bg-gray-50"
                    >

                      <td className="px-6 py-5 text-sm font-bold">
                        {order.id}
                      </td>

                      <td className="px-6 py-5">

                        <p className="font-semibold">
                          {order.customer}
                        </p>

                        <p className="text-xs text-gray-400">
                          {order.email}
                        </p>

                      </td>

                      <td className="px-6 py-5 text-sm">
                        {order.ticket}
                      </td>

                      <td className="px-6 py-5 text-sm">
                        {order.quantity}
                      </td>

                      <td className="px-6 py-5 text-sm font-bold">
                        ₹{order.amount.toLocaleString("en-IN")}
                      </td>

                      <td className="px-6 py-5">

                        <span
                          className={`rounded-full px-3 py-1.5 text-xs font-bold ${
                            order.status === "Paid"
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {order.status}
                        </span>

                      </td>

                      <td className="px-6 py-5 text-sm text-gray-500">
                        {order.date}
                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

            {filteredOrders.length === 0 && (
              <div className="p-12 text-center text-gray-500">
                No orders found.
              </div>
            )}

          </div>

        </section>

      </main>
    </div>
  );
}

function StatCard({
  title,
  value,
  subtitle,
  icon,
}: {
  title: string;
  value: string;
  subtitle: string;
  icon: string;
}) {
  return (
    <div className="rounded-2xl border bg-white p-5 shadow-sm">

      <div className="flex items-center justify-between">

        <p className="text-sm font-medium text-gray-500">
          {title}
        </p>

        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gray-100 font-bold">
          {icon}
        </span>

      </div>

      <p className="mt-4 text-2xl font-black">
        {value}
      </p>

      <p className="mt-1 text-xs text-gray-400">
        {subtitle}
      </p>

    </div>
  );
}