import { Link } from "react-router-dom";

const stats = [
  {
    title: "Total Events",
    value: "12",
    change: "+2 this month",
    icon: "◫",
  },
  {
    title: "Tickets Sold",
    value: "1,245",
    change: "+18.4% this month",
    icon: "🎟",
  },
  {
    title: "Revenue",
    value: "₹8.4L",
    change: "+12.5% this month",
    icon: "₹",
  },
  {
    title: "Upcoming Events",
    value: "4",
    change: "Next: Music Fest",
    icon: "◷",
  },
];

const events = [
  {
    name: "Music Fest 2026",
    location: "Gurugram",
    date: "20 Sep 2026",
    tickets: "540 tickets",
    status: "Approved",
  },
  {
    name: "Tech Summit 2026",
    location: "Noida",
    date: "25 Sep 2026",
    tickets: "320 tickets",
    status: "Pending",
  },
  {
    name: "Comedy Night",
    location: "Delhi",
    date: "28 Sep 2026",
    tickets: "185 tickets",
    status: "Approved",
  },
];

export default function OrganizerDashboard() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">

      {/* SIDEBAR */}
      <aside className="fixed left-0 top-0 hidden h-screen w-64 border-r border-gray-200 bg-white lg:block">

        {/* Logo */}
        <div className="flex h-20 items-center border-b border-gray-100 px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-black font-black text-white">
              P
            </div>

            <div>
              <p className="text-xl font-black tracking-tight">
                PRAPT
              </p>

              <p className="-mt-1 text-[9px] font-semibold tracking-[3px] text-gray-400">
                ORGANIZER
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="p-4">

          <p className="mb-3 px-3 text-xs font-bold uppercase tracking-wider text-gray-400">
            Workspace
          </p>

          <nav className="space-y-1">

            <Link
              to="/organizer"
              className="flex items-center gap-3 rounded-xl bg-black px-4 py-3 text-sm font-semibold text-white"
            >
              <span>▦</span>
              Dashboard
            </Link>

            <Link
              to="/organizer/events"
              className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-gray-600 transition hover:bg-gray-100 hover:text-black"
            >
              <span>◫</span>
              My Events
            </Link>

            <Link
              to="/organizer/create-event"
              className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-gray-600 transition hover:bg-gray-100 hover:text-black"
            >
              <span>＋</span>
              Create Event
            </Link>

            <Link
              to="/organizer/tickets"
              className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-gray-600 transition hover:bg-gray-100 hover:text-black"
            >
              <span>🎟</span>
              Tickets & Sales
            </Link>

            <Link
              to="/organizer/attendees"
              className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-gray-600 transition hover:bg-gray-100 hover:text-black"
            >
              <span>♙</span>
              Attendees
            </Link>

            <Link
              to="/organizer/analytics"
              className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-gray-600 transition hover:bg-gray-100 hover:text-black"
            >
              <span>◔</span>
              Analytics
            </Link>

            <Link
              to="/scanner"
              className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-gray-600 transition hover:bg-gray-100 hover:text-black"
            >
              <span>▣</span>
              Scanner
            </Link>

          </nav>

          <div className="my-6 border-t border-gray-100" />

          <p className="mb-3 px-3 text-xs font-bold uppercase tracking-wider text-gray-400">
            Account
          </p>

          <nav className="space-y-1">

            <Link
              to="/organizer/settings"
              className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-gray-600 transition hover:bg-gray-100 hover:text-black"
            >
              <span>⚙</span>
              Settings
            </Link>

            <Link
              to="/"
              className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-gray-600 transition hover:bg-gray-100 hover:text-black"
            >
              <span>↪</span>
              Back to Website
            </Link>

          </nav>

        </div>

        {/* Bottom profile */}
        <div className="absolute bottom-0 left-0 right-0 border-t border-gray-100 p-4">

          <div className="flex items-center gap-3 rounded-xl bg-gray-50 p-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black font-bold text-white">
              M
            </div>

            <div className="min-w-0">
              <p className="truncate text-sm font-semibold">
                Organizer
              </p>

              <p className="truncate text-xs text-gray-500">
                organizer@prapt.com
              </p>
            </div>

          </div>

        </div>

      </aside>

      {/* MAIN CONTENT */}
      <div className="lg:ml-64">

        {/* TOPBAR */}
        <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-gray-200 bg-white/90 px-5 backdrop-blur md:px-8">

          <div>
            <p className="text-sm text-gray-500">
              Organizer Portal
            </p>

            <h1 className="text-xl font-bold">
              Dashboard
            </h1>
          </div>

          <div className="flex items-center gap-3">

            <button className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-600 hover:bg-gray-50">
              🔔
            </button>

            <div className="hidden items-center gap-3 border-l border-gray-200 pl-4 sm:flex">

              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-black text-sm font-bold text-white">
                M
              </div>

              <div>
                <p className="text-sm font-semibold">
                  Organizer
                </p>

                <p className="text-xs text-gray-500">
                  Account
                </p>
              </div>

            </div>

          </div>

        </header>

        {/* PAGE */}
        <main className="p-5 md:p-8">

          {/* Welcome */}
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">

            <div>
              <p className="text-sm font-medium text-gray-500">
                Welcome back 👋
              </p>

              <h2 className="mt-1 text-3xl font-black tracking-tight md:text-4xl">
                Here's your event overview
              </h2>

              <p className="mt-2 text-gray-500">
                Manage your events, tickets and revenue from one place.
              </p>
            </div>

            <Link
              to="/organizer/create-event"
              className="inline-flex items-center justify-center rounded-xl bg-black px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-gray-800"
            >
              + Create Event
            </Link>

          </div>

          {/* STATS */}
          <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

            {stats.map((stat) => (
              <div
                key={stat.title}
                className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >

                <div className="flex items-start justify-between">

                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      {stat.title}
                    </p>

                    <h3 className="mt-2 text-3xl font-black tracking-tight">
                      {stat.value}
                    </h3>
                  </div>

                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gray-100 text-lg font-bold">
                    {stat.icon}
                  </div>

                </div>

                <p className="mt-4 text-xs font-medium text-gray-500">
                  {stat.change}
                </p>

              </div>
            ))}

          </div>

          {/* CONTENT GRID */}
          <div className="mt-8 grid gap-6 xl:grid-cols-3">

            {/* EVENTS */}
            <section className="xl:col-span-2 rounded-2xl border border-gray-200 bg-white">

              <div className="flex items-center justify-between border-b border-gray-100 p-5 md:p-6">

                <div>
                  <h3 className="text-lg font-bold">
                    Recent Events
                  </h3>

                  <p className="mt-1 text-sm text-gray-500">
                    Your latest created events
                  </p>
                </div>

                <Link
                  to="/organizer/events"
                  className="text-sm font-semibold underline underline-offset-4"
                >
                  View all
                </Link>

              </div>

              <div className="divide-y divide-gray-100">

                {events.map((event) => (
                  <div
                    key={event.name}
                    className="flex flex-col gap-4 p-5 transition hover:bg-gray-50 sm:flex-row sm:items-center sm:justify-between md:p-6"
                  >

                    <div className="flex items-center gap-4">

                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-xl">
                        🎫
                      </div>

                      <div>
                        <h4 className="font-bold">
                          {event.name}
                        </h4>

                        <p className="mt-1 text-sm text-gray-500">
                          {event.location} • {event.date}
                        </p>

                        <p className="mt-1 text-xs text-gray-400">
                          {event.tickets}
                        </p>
                      </div>

                    </div>

                    <span
                      className={`w-fit rounded-full px-3 py-1.5 text-xs font-semibold ${
                        event.status === "Approved"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {event.status}
                    </span>

                  </div>
                ))}

              </div>

            </section>

            {/* QUICK ACTIONS */}
            <section className="rounded-2xl border border-gray-200 bg-white p-5 md:p-6">

              <h3 className="text-lg font-bold">
                Quick Actions
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                Frequently used organizer tools
              </p>

              <div className="mt-6 space-y-3">

                <Link
                  to="/organizer/create-event"
                  className="flex items-center gap-4 rounded-xl border border-gray-200 p-4 transition hover:border-black hover:bg-gray-50"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-black text-lg text-white">
                    +
                  </div>

                  <div>
                    <p className="font-semibold">
                      Create Event
                    </p>

                    <p className="text-xs text-gray-500">
                      Publish a new experience
                    </p>
                  </div>
                </Link>

                <Link
                  to="/scanner"
                  className="flex items-center gap-4 rounded-xl border border-gray-200 p-4 transition hover:border-black hover:bg-gray-50"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 text-lg">
                    ▣
                  </div>

                  <div>
                    <p className="font-semibold">
                      Open Scanner
                    </p>

                    <p className="text-xs text-gray-500">
                      Validate event tickets
                    </p>
                  </div>
                </Link>

                <Link
                  to="/organizer/analytics"
                  className="flex items-center gap-4 rounded-xl border border-gray-200 p-4 transition hover:border-black hover:bg-gray-50"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 text-lg">
                    ◔
                  </div>

                  <div>
                    <p className="font-semibold">
                      View Analytics
                    </p>

                    <p className="text-xs text-gray-500">
                      Track sales & revenue
                    </p>
                  </div>
                </Link>

              </div>

            </section>

          </div>

        </main>

      </div>

    </div>
  );
}