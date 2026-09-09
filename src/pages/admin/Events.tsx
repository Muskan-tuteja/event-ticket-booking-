import { useMemo, useState } from "react";
import AdminSidebar from "../../components/admin/AdminSidebar";
import AdminHeader from "../../components/admin/AdminHeader";

type EventStatus = "Approved" | "Pending" | "Rejected" | "Cancelled";

type AdminEvent = {
  id: number;
  title: string;
  category: string;
  location: string;
  date: string;
  organizer: string;
  tickets: number;
  revenue: string;
  status: EventStatus;
};

const initialEvents: AdminEvent[] = [
  {
    id: 1,
    title: "Music Fest 2026",
    category: "Music",
    location: "Gurugram",
    date: "20 Sep 2026",
    organizer: "Urban Events",
    tickets: 1245,
    revenue: "₹6.22L",
    status: "Approved",
  },
  {
    id: 2,
    title: "Tech Summit 2026",
    category: "Technology",
    location: "Noida",
    date: "25 Sep 2026",
    organizer: "TechWorld India",
    tickets: 842,
    revenue: "₹6.73L",
    status: "Pending",
  },
  {
    id: 3,
    title: "Comedy Night",
    category: "Comedy",
    location: "Delhi",
    date: "28 Sep 2026",
    organizer: "Laugh Factory",
    tickets: 620,
    revenue: "₹2.47L",
    status: "Approved",
  },
  {
    id: 4,
    title: "Delhi Startup Expo",
    category: "Business",
    location: "Delhi",
    date: "30 Sep 2026",
    organizer: "Startup India",
    tickets: 0,
    revenue: "₹0",
    status: "Pending",
  },
  {
    id: 5,
    title: "Live DJ Night",
    category: "Music",
    location: "Gurugram",
    date: "04 Oct 2026",
    organizer: "Nightlife Co.",
    tickets: 0,
    revenue: "₹0",
    status: "Pending",
  },
  {
    id: 6,
    title: "Design Conference",
    category: "Design",
    location: "Noida",
    date: "10 Oct 2026",
    organizer: "Creative Hub",
    tickets: 0,
    revenue: "₹0",
    status: "Rejected",
  },
];

export default function Events() {
  const [events, setEvents] = useState(initialEvents);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [category, setCategory] = useState("All");

  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      const matchesSearch =
        event.title.toLowerCase().includes(search.toLowerCase()) ||
        event.organizer.toLowerCase().includes(search.toLowerCase()) ||
        event.location.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        status === "All" || event.status === status;

      const matchesCategory =
        category === "All" || event.category === category;

      return matchesSearch && matchesStatus && matchesCategory;
    });
  }, [events, search, status, category]);

  const updateStatus = (id: number, newStatus: EventStatus) => {
    setEvents((current) =>
      current.map((event) =>
        event.id === id
          ? { ...event, status: newStatus }
          : event
      )
    );
  };

  const counts = {
    all: events.length,
    pending: events.filter((e) => e.status === "Pending").length,
    approved: events.filter((e) => e.status === "Approved").length,
    rejected: events.filter((e) => e.status === "Rejected").length,
  };

  return (
    <div className="min-h-screen bg-[#f7f7f8]">

      <AdminSidebar />

      <div className="lg:pl-64">

        <AdminHeader />

        <main className="p-5 md:p-8">

          {/* PAGE HEADER */}
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">

            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-gray-400">
                Management
              </p>

              <h1 className="mt-2 text-3xl font-black tracking-tight">
                Events Management
              </h1>

              <p className="mt-2 text-sm text-gray-500">
                Review, approve and manage all events on PRAPT.
              </p>
            </div>

            <button className="rounded-xl bg-black px-5 py-3 text-sm font-bold text-white transition hover:bg-gray-800">
              + Add Event
            </button>

          </div>

          {/* SUMMARY CARDS */}
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

            <SummaryCard
              title="Total Events"
              value={counts.all}
              icon="🎫"
            />

            <SummaryCard
              title="Pending Review"
              value={counts.pending}
              icon="◷"
            />

            <SummaryCard
              title="Approved"
              value={counts.approved}
              icon="✓"
            />

            <SummaryCard
              title="Rejected"
              value={counts.rejected}
              icon="×"
            />

          </div>

          {/* FILTER PANEL */}
          <div className="mt-6 rounded-2xl border bg-white p-5 shadow-sm">

            <div className="grid gap-3 lg:grid-cols-[1fr_180px_180px_auto]">

              <div className="relative">

                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                  ⌕
                </span>

                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search event, organizer or location..."
                  className="h-11 w-full rounded-xl border bg-gray-50 pl-10 pr-4 text-sm outline-none transition focus:border-black focus:bg-white"
                />

              </div>

              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="h-11 rounded-xl border bg-gray-50 px-4 text-sm outline-none focus:border-black"
              >
                <option value="All">All Status</option>
                <option value="Pending">Pending</option>
                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
                <option value="Cancelled">Cancelled</option>
              </select>

              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="h-11 rounded-xl border bg-gray-50 px-4 text-sm outline-none focus:border-black"
              >
                <option value="All">All Categories</option>
                <option value="Music">Music</option>
                <option value="Technology">Technology</option>
                <option value="Comedy">Comedy</option>
                <option value="Business">Business</option>
                <option value="Design">Design</option>
              </select>

              <button
                onClick={() => {
                  setSearch("");
                  setStatus("All");
                  setCategory("All");
                }}
                className="h-11 rounded-xl border px-5 text-sm font-semibold transition hover:bg-gray-100"
              >
                Reset
              </button>

            </div>

          </div>

          {/* EVENTS TABLE */}
          <div className="mt-6 overflow-hidden rounded-2xl border bg-white shadow-sm">

            <div className="flex items-center justify-between border-b px-6 py-5">

              <div>
                <h2 className="font-black">
                  All Events
                </h2>

                <p className="mt-1 text-xs text-gray-500">
                  Showing {filteredEvents.length} of {events.length} events
                </p>
              </div>

              <button className="rounded-lg border px-4 py-2 text-sm font-semibold hover:bg-gray-50">
                Export
              </button>

            </div>

            <div className="overflow-x-auto">

              <table className="w-full min-w-[1050px] text-left">

                <thead className="bg-gray-50">

                  <tr className="text-xs uppercase tracking-wider text-gray-400">

                    <th className="px-6 py-4">
                      Event
                    </th>

                    <th className="px-6 py-4">
                      Organizer
                    </th>

                    <th className="px-6 py-4">
                      Date / Location
                    </th>

                    <th className="px-6 py-4">
                      Tickets
                    </th>

                    <th className="px-6 py-4">
                      Revenue
                    </th>

                    <th className="px-6 py-4">
                      Status
                    </th>

                    <th className="px-6 py-4">
                      Action
                    </th>

                  </tr>

                </thead>

                <tbody className="divide-y">

                  {filteredEvents.map((event) => (

                    <tr
                      key={event.id}
                      className="transition hover:bg-gray-50"
                    >

                      {/* EVENT */}
                      <td className="px-6 py-5">

                        <div className="flex items-center gap-3">

                          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gray-100 text-lg">
                            {event.category === "Music"
                              ? "🎵"
                              : event.category === "Technology"
                              ? "💻"
                              : event.category === "Comedy"
                              ? "😂"
                              : "✦"}
                          </div>

                          <div>
                            <p className="font-bold">
                              {event.title}
                            </p>

                            <p className="mt-1 text-xs text-gray-400">
                              {event.category}
                            </p>
                          </div>

                        </div>

                      </td>

                      {/* ORGANIZER */}
                      <td className="px-6 py-5 text-sm font-medium">
                        {event.organizer}
                      </td>

                      {/* DATE */}
                      <td className="px-6 py-5">

                        <p className="text-sm font-semibold">
                          {event.date}
                        </p>

                        <p className="mt-1 text-xs text-gray-400">
                          📍 {event.location}
                        </p>

                      </td>

                      {/* TICKETS */}
                      <td className="px-6 py-5 text-sm font-semibold">
                        {event.tickets.toLocaleString()}
                      </td>

                      {/* REVENUE */}
                      <td className="px-6 py-5 text-sm font-bold">
                        {event.revenue}
                      </td>

                      {/* STATUS */}
                      <td className="px-6 py-5">
                        <StatusBadge status={event.status} />
                      </td>

                      {/* ACTION */}
                      <td className="px-6 py-5">

                        <div className="flex items-center gap-2">

                          <button
                            className="rounded-lg border px-3 py-2 text-xs font-semibold hover:bg-gray-100"
                          >
                            View
                          </button>

                          {event.status === "Pending" && (
                            <>
                              <button
                                onClick={() =>
                                  updateStatus(event.id, "Approved")
                                }
                                className="rounded-lg bg-black px-3 py-2 text-xs font-bold text-white hover:bg-gray-800"
                              >
                                Approve
                              </button>

                              <button
                                onClick={() =>
                                  updateStatus(event.id, "Rejected")
                                }
                                className="rounded-lg border border-red-200 px-3 py-2 text-xs font-bold text-red-600 hover:bg-red-50"
                              >
                                Reject
                              </button>
                            </>
                          )}

                          {event.status === "Approved" && (
                            <button
                              onClick={() =>
                                updateStatus(event.id, "Cancelled")
                              }
                              className="rounded-lg border px-3 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-100"
                            >
                              Cancel
                            </button>
                          )}

                        </div>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

            {filteredEvents.length === 0 && (
              <div className="px-6 py-16 text-center">

                <div className="text-4xl">
                  🔎
                </div>

                <h3 className="mt-4 font-bold">
                  No events found
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  Try changing your search or filters.
                </p>

              </div>
            )}

          </div>

        </main>

      </div>

    </div>
  );
}

function SummaryCard({
  title,
  value,
  icon,
}: {
  title: string;
  value: number;
  icon: string;
}) {
  return (
    <div className="rounded-2xl border bg-white p-5 shadow-sm">

      <div className="flex items-center justify-between">

        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gray-100">
          {icon}
        </div>

        <span className="text-xs font-semibold text-gray-400">
          This month
        </span>

      </div>

      <p className="mt-5 text-sm text-gray-500">
        {title}
      </p>

      <p className="mt-1 text-2xl font-black">
        {value}
      </p>

    </div>
  );
}

function StatusBadge({ status }: { status: EventStatus }) {
  const styles = {
    Approved: "bg-green-50 text-green-700",
    Pending: "bg-yellow-50 text-yellow-700",
    Rejected: "bg-red-50 text-red-700",
    Cancelled: "bg-gray-100 text-gray-600",
  };

  return (
    <span
      className={`rounded-full px-3 py-1.5 text-xs font-bold ${styles[status]}`}
    >
      {status}
    </span>
  );
}