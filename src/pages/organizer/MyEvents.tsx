import { Link } from "react-router-dom";
import { useMemo, useState } from "react";

const organizerEvents = [
  {
    id: 1,
    title: "Music Fest 2026",
    category: "Music",
    location: "Gurugram",
    date: "20 Sep 2026",
    time: "6:00 PM",
    status: "Approved",
    ticketsSold: 420,
    totalTickets: 500,
    revenue: 209580,
    image:
      "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 2,
    title: "Tech Summit 2026",
    category: "Technology",
    location: "Noida",
    date: "25 Sep 2026",
    time: "10:00 AM",
    status: "Pending",
    ticketsSold: 0,
    totalTickets: 800,
    revenue: 0,
    image:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 3,
    title: "Comedy Night",
    category: "Comedy",
    location: "Delhi",
    date: "28 Sep 2026",
    time: "7:30 PM",
    status: "Draft",
    ticketsSold: 0,
    totalTickets: 300,
    revenue: 0,
    image:
      "https://images.unsplash.com/photo-1527224538127-2104bb71c51b?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 4,
    title: "Startup Networking Meet",
    category: "Business",
    location: "Gurugram",
    date: "05 Oct 2026",
    time: "5:00 PM",
    status: "Rejected",
    ticketsSold: 0,
    totalTickets: 200,
    revenue: 0,
    image:
      "https://images.unsplash.com/photo-1515169067868-5387ec356754?auto=format&fit=crop&w=900&q=85",
  },
];

const tabs = ["All", "Approved", "Pending", "Draft", "Rejected"];

export default function MyEvents() {
  const [activeTab, setActiveTab] = useState("All");
  const [search, setSearch] = useState("");

  const filteredEvents = useMemo(() => {
    return organizerEvents.filter((event) => {
      const matchesTab =
        activeTab === "All" || event.status === activeTab;

      const matchesSearch =
        event.title.toLowerCase().includes(search.toLowerCase()) ||
        event.location.toLowerCase().includes(search.toLowerCase());

      return matchesTab && matchesSearch;
    });
  }, [activeTab, search]);

  return (
    <div className="min-h-screen bg-[#f7f7f8] text-gray-900">

      {/* TOP HEADER */}
      <header className="sticky top-0 z-30 border-b bg-white/95 backdrop-blur">
        <div className="flex h-20 items-center justify-between px-6 md:px-10">

          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">
              Organizer Portal
            </p>

            <h1 className="text-xl font-black">
              My Events
            </h1>
          </div>

          <Link
            to="/organizer/create-event"
            className="rounded-xl bg-black px-5 py-3 text-sm font-bold text-white transition hover:bg-gray-800"
          >
            + Create Event
          </Link>

        </div>
      </header>

      {/* MAIN */}
      <main className="mx-auto max-w-7xl px-6 py-8 md:px-10">

        {/* INTRO */}
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">

          <div>
            <h2 className="text-3xl font-black tracking-tight md:text-4xl">
              Manage your events
            </h2>

            <p className="mt-2 text-gray-500">
              Create, edit and track all your events from one place.
            </p>
          </div>

          <div className="rounded-xl border bg-white px-4 py-3 text-sm">
            <span className="text-gray-500">Total Events</span>
            <strong className="ml-2 text-lg">
              {organizerEvents.length}
            </strong>
          </div>

        </div>

        {/* SEARCH */}
        <div className="mt-8 rounded-2xl border bg-white p-3 shadow-sm">

          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
              🔍
            </span>

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search your events..."
              className="h-12 w-full rounded-xl bg-gray-100 pl-11 pr-4 outline-none transition focus:bg-white focus:ring-2 focus:ring-black"
            />
          </div>

        </div>

        {/* FILTER TABS */}
        <div className="mt-6 flex gap-2 overflow-x-auto pb-2">

          {tabs.map((tab) => {

            const count =
              tab === "All"
                ? organizerEvents.length
                : organizerEvents.filter(
                    (event) => event.status === tab
                  ).length;

            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`whitespace-nowrap rounded-full px-4 py-2.5 text-sm font-semibold transition ${
                  activeTab === tab
                    ? "bg-black text-white"
                    : "border bg-white text-gray-600 hover:border-black"
                }`}
              >
                {tab}
                <span
                  className={`ml-2 rounded-full px-2 py-0.5 text-xs ${
                    activeTab === tab
                      ? "bg-white/20"
                      : "bg-gray-100"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}

        </div>

        {/* EVENTS */}
        <div className="mt-8 space-y-5">

          {filteredEvents.length > 0 ? (
            filteredEvents.map((event) => {

              const percentage =
                event.totalTickets > 0
                  ? Math.round(
                      (event.ticketsSold / event.totalTickets) * 100
                    )
                  : 0;

              return (
                <article
                  key={event.id}
                  className="overflow-hidden rounded-3xl border bg-white shadow-sm transition hover:shadow-lg"
                >

                  <div className="flex flex-col md:flex-row">

                    {/* IMAGE */}
                    <div className="relative h-56 md:h-auto md:w-72 md:shrink-0">

                      <img
                        src={event.image}
                        alt={event.title}
                        className="h-full w-full object-cover"
                      />

                      <span className="absolute left-4 top-4 rounded-full bg-white px-3 py-1.5 text-xs font-bold">
                        {event.category}
                      </span>

                    </div>

                    {/* CONTENT */}
                    <div className="flex flex-1 flex-col p-6">

                      <div className="flex flex-col justify-between gap-4 sm:flex-row">

                        <div>
                          <div className="flex items-center gap-3">

                            <h3 className="text-2xl font-black">
                              {event.title}
                            </h3>

                            <StatusBadge status={event.status} />

                          </div>

                          <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm text-gray-500">
                            <span>📅 {event.date}</span>
                            <span>◷ {event.time}</span>
                            <span>📍 {event.location}</span>
                          </div>
                        </div>

                        {/* MENU */}
                        <button
                          type="button"
                          className="h-9 w-9 rounded-lg border text-gray-500 hover:bg-gray-50"
                        >
                          ⋮
                        </button>

                      </div>

                      {/* STATS */}
                      <div className="mt-7 grid grid-cols-2 gap-4 border-y py-5 md:grid-cols-3">

                        <div>
                          <p className="text-xs font-medium text-gray-400">
                            Tickets Sold
                          </p>

                          <p className="mt-1 text-xl font-black">
                            {event.ticketsSold}
                            <span className="ml-1 text-sm font-normal text-gray-400">
                              / {event.totalTickets}
                            </span>
                          </p>
                        </div>

                        <div>
                          <p className="text-xs font-medium text-gray-400">
                            Revenue
                          </p>

                          <p className="mt-1 text-xl font-black">
                            ₹{event.revenue.toLocaleString("en-IN")}
                          </p>
                        </div>

                        <div className="col-span-2 md:col-span-1">
                          <div className="flex justify-between text-xs">
                            <span className="font-medium text-gray-400">
                              Ticket Sales
                            </span>

                            <span className="font-bold">
                              {percentage}%
                            </span>
                          </div>

                          <div className="mt-2 h-2 overflow-hidden rounded-full bg-gray-100">
                            <div
                              className="h-full rounded-full bg-black"
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                        </div>

                      </div>

                      {/* ACTIONS */}
                      <div className="mt-5 flex flex-wrap gap-3">

                        <Link
                          to={`/organizer/events/${event.id}`}
                          className="rounded-xl bg-black px-4 py-2.5 text-sm font-bold text-white hover:bg-gray-800"
                        >
                          Manage Event
                        </Link>

                        {event.status === "Approved" && (
                          <Link
                            to="/organizer/attendees"
                            className="rounded-xl border px-4 py-2.5 text-sm font-semibold hover:bg-gray-50"
                          >
                            View Attendees
                          </Link>
                        )}

                        {event.status === "Draft" && (
                          <Link
                            to={`/organizer/events/${event.id}/edit`}
                            className="rounded-xl border px-4 py-2.5 text-sm font-semibold hover:bg-gray-50"
                          >
                            Continue Editing
                          </Link>
                        )}

                        {event.status === "Rejected" && (
                          <button className="rounded-xl border px-4 py-2.5 text-sm font-semibold hover:bg-gray-50">
                            View Reason
                          </button>
                        )}

                      </div>

                    </div>

                  </div>

                </article>
              );
            })
          ) : (

            /* EMPTY STATE */
            <div className="rounded-3xl border bg-white px-6 py-20 text-center">

              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 text-2xl">
                🎪
              </div>

              <h3 className="mt-5 text-xl font-bold">
                No events found
              </h3>

              <p className="mt-2 text-gray-500">
                Try changing your search or filter.
              </p>

              <Link
                to="/organizer/create-event"
                className="mt-6 inline-block rounded-xl bg-black px-5 py-3 font-semibold text-white"
              >
                Create Event
              </Link>

            </div>

          )}

        </div>

      </main>

    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    Approved: "bg-green-100 text-green-700",
    Pending: "bg-yellow-100 text-yellow-700",
    Draft: "bg-gray-100 text-gray-600",
    Rejected: "bg-red-100 text-red-700",
  };

  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-bold ${
        styles[status] || "bg-gray-100 text-gray-600"
      }`}
    >
      {status}
    </span>
  );
}