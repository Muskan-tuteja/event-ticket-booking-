import { Link} from "react-router-dom";
import { useState } from "react";

const event = {
  title: "Music Fest 2026",
  category: "Music",
  location: "Gurugram",
  venue: "Cyber Hub",
  date: "20 Sep 2026",
  time: "6:00 PM",
  status: "Approved",
  image:
    "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1200&q=85",
};

const tickets = [
  {
    name: "General Admission",
    price: 499,
    total: 500,
    sold: 420,
  },
  {
    name: "VIP",
    price: 999,
    total: 100,
    sold: 72,
  },
];

export default function EventManagement() {
  // const { id } = useParams();
  const [activeTab, setActiveTab] = useState("Overview");

  const totalSold = tickets.reduce((sum, t) => sum + t.sold, 0);
  const totalTickets = tickets.reduce((sum, t) => sum + t.total, 0);
  const revenue = tickets.reduce(
    (sum, t) => sum + t.price * t.sold,
    0
  );

  return (
    <div className="min-h-screen bg-[#f7f7f8] text-gray-900">

      {/* HEADER */}
      <header className="sticky top-0 z-30 border-b bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">

          <div className="flex items-center gap-4">

            <Link
              to="/organizer/events"
              className="flex h-10 w-10 items-center justify-center rounded-xl border hover:bg-gray-50"
            >
              ←
            </Link>

            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">
                Manage Event
              </p>

              <h1 className="text-xl font-black">
                {event.title}
              </h1>
            </div>

          </div>

          <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-bold text-green-700">
            ✓ {event.status}
          </span>

        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-8">

        {/* EVENT HERO */}
        <div className="overflow-hidden rounded-3xl bg-black text-white shadow-lg">

          <div className="grid md:grid-cols-2">

            <img
              src={event.image}
              alt={event.title}
              className="h-72 w-full object-cover md:h-full"
            />

            <div className="flex flex-col justify-center p-7 md:p-10">

              <span className="w-fit rounded-full bg-white/10 px-3 py-1.5 text-xs font-bold">
                {event.category}
              </span>

              <h2 className="mt-5 text-3xl font-black md:text-4xl">
                {event.title}
              </h2>

              <div className="mt-6 space-y-3 text-sm text-gray-300">
                <p>📅 {event.date}</p>
                <p>◷ {event.time}</p>
                <p>📍 {event.venue}, {event.location}</p>
              </div>

              <div className="mt-7 flex gap-3">

                <button className="rounded-xl bg-white px-5 py-3 text-sm font-bold text-black">
                  Edit Event
                </button>

                <button className="rounded-xl border border-white/20 px-5 py-3 text-sm font-semibold hover:bg-white/10">
                  ⋮ More
                </button>

              </div>

            </div>

          </div>

        </div>

        {/* TABS */}
        <div className="mt-8 overflow-x-auto border-b">

          <div className="flex min-w-max gap-8">

            {["Overview", "Tickets", "Sales", "Attendees"].map(
              (tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`border-b-2 px-1 pb-4 text-sm font-bold transition ${
                    activeTab === tab
                      ? "border-black text-black"
                      : "border-transparent text-gray-400 hover:text-gray-700"
                  }`}
                >
                  {tab}
                </button>
              )
            )}

          </div>

        </div>

        {/* OVERVIEW */}
        {activeTab === "Overview" && (
          <div className="mt-8">

            {/* STATS */}
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

              <Stat
                title="Tickets Sold"
                value={totalSold.toString()}
                subtitle={`of ${totalTickets} tickets`}
                icon="🎟️"
              />

              <Stat
                title="Revenue"
                value={`₹${revenue.toLocaleString("en-IN")}`}
                subtitle="Total sales"
                icon="₹"
              />

              <Stat
                title="Check-ins"
                value="318"
                subtitle="76% of sold tickets"
                icon="✓"
              />

              <Stat
                title="Available"
                value={(totalTickets - totalSold).toString()}
                subtitle="Tickets remaining"
                icon="◷"
              />

            </div>

            {/* QUICK ACTIONS */}
            <div className="mt-8 grid gap-5 md:grid-cols-2">

              <div className="rounded-3xl border bg-white p-6">

                <h3 className="text-xl font-black">
                  Quick Actions
                </h3>

                <div className="mt-5 grid gap-3 sm:grid-cols-2">

                  <button className="rounded-xl border p-4 text-left font-semibold hover:bg-gray-50">
                    ✏️ Edit Event
                  </button>

                  <button className="rounded-xl border p-4 text-left font-semibold hover:bg-gray-50">
                    🎟️ Manage Tickets
                  </button>

                  <button className="rounded-xl border p-4 text-left font-semibold hover:bg-gray-50">
                    👥 View Attendees
                  </button>

                  <Link
                    to="/scanner"
                    className="rounded-xl border p-4 text-left font-semibold hover:bg-gray-50"
                  >
                    📷 Open Scanner
                  </Link>

                </div>

              </div>

              {/* EVENT INFO */}
              <div className="rounded-3xl border bg-white p-6">

                <h3 className="text-xl font-black">
                  Event Information
                </h3>

                <div className="mt-5 space-y-4">

                  <InfoRow label="Category" value={event.category} />

                  <InfoRow label="Date" value={event.date} />

                  <InfoRow label="Time" value={event.time} />

                  <InfoRow
                    label="Venue"
                    value={`${event.venue}, ${event.location}`}
                  />

                </div>

              </div>

            </div>

          </div>
        )}

        {/* TICKETS */}
        {activeTab === "Tickets" && (
          <div className="mt-8">

            <div className="flex items-center justify-between">

              <div>
                <h2 className="text-2xl font-black">
                  Ticket Types
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Manage pricing and ticket inventory.
                </p>
              </div>

              <button className="rounded-xl bg-black px-5 py-3 text-sm font-bold text-white">
                + Add Ticket
              </button>

            </div>

            <div className="mt-6 space-y-4">

              {tickets.map((ticket) => {

                const percentage = Math.round(
                  (ticket.sold / ticket.total) * 100
                );

                return (
                  <div
                    key={ticket.name}
                    className="rounded-2xl border bg-white p-6"
                  >

                    <div className="flex flex-col justify-between gap-4 sm:flex-row">

                      <div>
                        <h3 className="text-lg font-black">
                          {ticket.name}
                        </h3>

                        <p className="mt-1 text-2xl font-black">
                          ₹{ticket.price}
                        </p>
                      </div>

                      <button className="h-fit rounded-xl border px-4 py-2 text-sm font-semibold">
                        Edit
                      </button>

                    </div>

                    <div className="mt-6">

                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">
                          {ticket.sold} sold
                        </span>

                        <span className="font-bold">
                          {ticket.total} total
                        </span>
                      </div>

                      <div className="mt-2 h-2 rounded-full bg-gray-100">
                        <div
                          className="h-full rounded-full bg-black"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>

                    </div>

                  </div>
                );
              })}

            </div>

          </div>
        )}

        {/* SALES */}
        {activeTab === "Sales" && (
          <div className="mt-8">

            <h2 className="text-2xl font-black">
              Sales Overview
            </h2>

            <div className="mt-6 rounded-3xl border bg-white p-6">

              <div className="grid gap-6 sm:grid-cols-3">

                <Stat
                  title="Gross Revenue"
                  value={`₹${revenue.toLocaleString("en-IN")}`}
                  subtitle="Before commission"
                  icon="₹"
                />

                <Stat
                  title="Tickets Sold"
                  value={totalSold.toString()}
                  subtitle="Across all ticket types"
                  icon="🎟️"
                />

                <Stat
                  title="Average Order"
                  value="₹1,250"
                  subtitle="Per customer"
                  icon="↗"
                />

              </div>

              <div className="mt-8 flex h-64 items-end gap-3 border-t pt-8">

                {[35, 48, 42, 65, 55, 78, 92, 70, 85, 96, 75, 100].map(
                  (height, index) => (
                    <div
                      key={index}
                      className="flex flex-1 items-end"
                    >
                      <div
                        className="w-full rounded-t-lg bg-black"
                        style={{ height: `${height}%` }}
                      />
                    </div>
                  )
                )}

              </div>

              <div className="mt-3 flex justify-between text-xs text-gray-400">
                <span>Sep 1</span>
                <span>Sep 20</span>
              </div>

            </div>

          </div>
        )}

        {/* ATTENDEES */}
        {activeTab === "Attendees" && (
          <div className="mt-8">

            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

              <div>
                <h2 className="text-2xl font-black">
                  Attendees
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Manage people attending your event.
                </p>
              </div>

              <button className="rounded-xl border px-5 py-3 text-sm font-bold">
                Export Attendees
              </button>

            </div>

            <div className="mt-6 overflow-hidden rounded-2xl border bg-white">

              <div className="overflow-x-auto">

                <table className="w-full min-w-[700px] text-left">

                  <thead className="border-b bg-gray-50 text-xs uppercase text-gray-400">
                    <tr>
                      <th className="px-6 py-4">Attendee</th>
                      <th className="px-6 py-4">Ticket</th>
                      <th className="px-6 py-4">Order</th>
                      <th className="px-6 py-4">Check-in</th>
                    </tr>
                  </thead>

                  <tbody>

                    {[
                      ["Rahul Sharma", "VIP", "#PR1024", "Checked In"],
                      ["Anjali Verma", "General", "#PR1025", "Not Checked"],
                      ["Aman Gupta", "General", "#PR1026", "Checked In"],
                      ["Neha Singh", "VIP", "#PR1027", "Not Checked"],
                    ].map((person) => (

                      <tr
                        key={person[2]}
                        className="border-b last:border-0"
                      >

                        <td className="px-6 py-5">
                          <p className="font-bold">
                            {person[0]}
                          </p>
                          <p className="text-xs text-gray-400">
                            attendee@example.com
                          </p>
                        </td>

                        <td className="px-6 py-5 text-sm">
                          {person[1]}
                        </td>

                        <td className="px-6 py-5 text-sm font-semibold">
                          {person[2]}
                        </td>

                        <td className="px-6 py-5">

                          <span
                            className={`rounded-full px-3 py-1 text-xs font-bold ${
                              person[3] === "Checked In"
                                ? "bg-green-100 text-green-700"
                                : "bg-gray-100 text-gray-500"
                            }`}
                          >
                            {person[3]}
                          </span>

                        </td>

                      </tr>

                    ))}

                  </tbody>

                </table>

              </div>

            </div>

          </div>
        )}

      </main>
    </div>
  );
}

function Stat({
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
    <div className="rounded-2xl border bg-white p-5">

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

function InfoRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex justify-between gap-4 border-b pb-3 last:border-0">
      <span className="text-sm text-gray-400">
        {label}
      </span>

      <span className="text-right text-sm font-semibold">
        {value}
      </span>
    </div>
  );
}