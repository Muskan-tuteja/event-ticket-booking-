import AdminSidebar from "../../components/admin/AdminSidebar";
import AdminHeader from "../../components/admin/AdminHeader";
import { Link } from "react-router-dom";

const stats = [
  {
    title: "Total Revenue",
    value: "₹24.8L",
    change: "+12.5%",
    icon: "₹",
  },
  {
    title: "Total Orders",
    value: "3,842",
    change: "+8.2%",
    icon: "▤",
  },
  {
    title: "Tickets Sold",
    value: "8,426",
    change: "+14.8%",
    icon: "🎫",
  },
  {
    title: "Customers",
    value: "5,284",
    change: "+6.4%",
    icon: "♙",
  },
];

const recentOrders = [
  {
    id: "#PR-10245",
    customer: "Rahul Sharma",
    event: "Music Fest 2026",
    amount: "₹998",
    status: "Completed",
  },
  {
    id: "#PR-10244",
    customer: "Ananya Singh",
    event: "Tech Summit 2026",
    amount: "₹799",
    status: "Completed",
  },
  {
    id: "#PR-10243",
    customer: "Aman Verma",
    event: "Comedy Night",
    amount: "₹399",
    status: "Pending",
  },
  {
    id: "#PR-10242",
    customer: "Priya Mehta",
    event: "Music Fest 2026",
    amount: "₹1,497",
    status: "Completed",
  },
];

const pendingEvents = [
  {
    name: "Delhi Startup Expo",
    organizer: "Startup India",
    date: "30 Sep 2026",
  },
  {
    name: "Live DJ Night",
    organizer: "Urban Events",
    date: "04 Oct 2026",
  },
  {
    name: "Design Conference",
    organizer: "Creative Hub",
    date: "10 Oct 2026",
  },
];

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-[#f7f7f8]">

      <AdminSidebar />

      <div className="lg:pl-64">

        <AdminHeader />

        <main className="p-5 md:p-8">

          {/* PAGE TITLE */}
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">

            <div>
              <p className="text-sm font-semibold text-gray-400">
                ADMINISTRATION
              </p>

              <h2 className="mt-1 text-3xl font-black tracking-tight md:text-4xl">
                Dashboard
              </h2>

              <p className="mt-2 text-gray-500">
                Overview of your PRAPT event platform.
              </p>
            </div>

            <Link
              to="/admin/events"
              className="w-fit rounded-xl bg-black px-5 py-3 text-sm font-bold text-white transition hover:bg-gray-800"
            >
              Manage Events →
            </Link>

          </div>

          {/* STATS */}
          <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

            {stats.map((stat) => (
              <div
                key={stat.title}
                className="rounded-2xl border bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >

                <div className="flex items-start justify-between">

                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gray-100 text-lg font-bold">
                    {stat.icon}
                  </div>

                  <span className="rounded-full bg-green-50 px-2.5 py-1 text-xs font-bold text-green-600">
                    {stat.change}
                  </span>

                </div>

                <p className="mt-5 text-sm font-medium text-gray-500">
                  {stat.title}
                </p>

                <h3 className="mt-1 text-2xl font-black">
                  {stat.value}
                </h3>

              </div>
            ))}

          </div>

          {/* CHART + PENDING EVENTS */}
          <div className="mt-6 grid gap-6 xl:grid-cols-[1.6fr_1fr]">

            {/* REVENUE CHART */}
            <div className="rounded-2xl border bg-white p-6 shadow-sm">

              <div className="flex items-center justify-between">

                <div>
                  <h3 className="text-lg font-black">
                    Revenue Overview
                  </h3>

                  <p className="mt-1 text-sm text-gray-500">
                    Platform revenue for the last 6 months
                  </p>
                </div>

                <select className="rounded-lg border bg-white px-3 py-2 text-sm outline-none">
                  <option>Last 6 months</option>
                  <option>Last 30 days</option>
                  <option>This year</option>
                </select>

              </div>

              <div className="mt-8 flex h-64 items-end gap-3 border-b border-l px-4 pb-0">

                {[42, 55, 48, 72, 65, 88, 78, 96, 82, 100, 90, 115].map(
                  (height, index) => (
                    <div
                      key={index}
                      className="group flex h-full flex-1 items-end"
                    >
                      <div
                        style={{ height: `${height * 1.6}px` }}
                        className="w-full rounded-t-lg bg-black transition group-hover:bg-gray-700"
                      />
                    </div>
                  )
                )}

              </div>

              <div className="mt-3 flex justify-between px-2 text-xs text-gray-400">
                <span>Apr</span>
                <span>May</span>
                <span>Jun</span>
                <span>Jul</span>
                <span>Aug</span>
                <span>Sep</span>
              </div>

            </div>

            {/* PENDING EVENTS */}
            <div className="rounded-2xl border bg-white p-6 shadow-sm">

              <div className="flex items-center justify-between">

                <div>
                  <h3 className="text-lg font-black">
                    Pending Approval
                  </h3>

                  <p className="mt-1 text-sm text-gray-500">
                    Events waiting for review
                  </p>
                </div>

                <Link
                  to="/admin/events"
                  className="text-sm font-bold underline"
                >
                  View all
                </Link>

              </div>

              <div className="mt-6 space-y-4">

                {pendingEvents.map((event) => (
                  <div
                    key={event.name}
                    className="rounded-xl border p-4 transition hover:bg-gray-50"
                  >

                    <div className="flex items-start justify-between gap-3">

                      <div>
                        <h4 className="font-bold">
                          {event.name}
                        </h4>

                        <p className="mt-1 text-xs text-gray-500">
                          {event.organizer}
                        </p>

                        <p className="mt-2 text-xs text-gray-400">
                          📅 {event.date}
                        </p>
                      </div>

                      <span className="rounded-full bg-yellow-50 px-2.5 py-1 text-[11px] font-bold text-yellow-700">
                        Pending
                      </span>

                    </div>

                  </div>
                ))}

              </div>

            </div>

          </div>

          {/* RECENT ORDERS */}
          <div className="mt-6 rounded-2xl border bg-white shadow-sm">

            <div className="flex flex-col justify-between gap-3 border-b p-6 sm:flex-row sm:items-center">

              <div>
                <h3 className="text-lg font-black">
                  Recent Orders
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  Latest ticket transactions
                </p>
              </div>

              <Link
                to="/admin/orders"
                className="text-sm font-bold underline"
              >
                View all orders →
              </Link>

            </div>

            {/* TABLE */}
            <div className="overflow-x-auto">

              <table className="w-full min-w-[700px] text-left">

                <thead className="bg-gray-50 text-xs uppercase tracking-wider text-gray-400">

                  <tr>
                    <th className="px-6 py-4 font-bold">
                      Order
                    </th>

                    <th className="px-6 py-4 font-bold">
                      Customer
                    </th>

                    <th className="px-6 py-4 font-bold">
                      Event
                    </th>

                    <th className="px-6 py-4 font-bold">
                      Amount
                    </th>

                    <th className="px-6 py-4 font-bold">
                      Status
                    </th>
                  </tr>

                </thead>

                <tbody className="divide-y">

                  {recentOrders.map((order) => (
                    <tr
                      key={order.id}
                      className="transition hover:bg-gray-50"
                    >

                      <td className="px-6 py-4 text-sm font-bold">
                        {order.id}
                      </td>

                      <td className="px-6 py-4 text-sm">
                        {order.customer}
                      </td>

                      <td className="px-6 py-4 text-sm text-gray-600">
                        {order.event}
                      </td>

                      <td className="px-6 py-4 text-sm font-bold">
                        {order.amount}
                      </td>

                      <td className="px-6 py-4">

                        <span
                          className={`rounded-full px-3 py-1 text-xs font-bold ${
                            order.status === "Completed"
                              ? "bg-green-50 text-green-700"
                              : "bg-yellow-50 text-yellow-700"
                          }`}
                        >
                          {order.status}
                        </span>

                      </td>

                    </tr>
                  ))}

                </tbody>

              </table>

            </div>

          </div>

        </main>

      </div>

    </div>
  );
}