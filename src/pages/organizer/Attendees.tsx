import { Link } from "react-router-dom";
import { useMemo, useState } from "react";

const attendees = [
  {
    id: "PR1028",
    name: "Riya Sharma",
    email: "riya@example.com",
    ticket: "VIP",
    quantity: 2,
    status: "Checked In",
    checkIn: "06:12 PM",
  },
  {
    id: "PR1027",
    name: "Neha Singh",
    email: "neha@example.com",
    ticket: "General Admission",
    quantity: 2,
    status: "Not Checked In",
    checkIn: "-",
  },
  {
    id: "PR1026",
    name: "Aman Gupta",
    email: "aman@example.com",
    ticket: "General Admission",
    quantity: 1,
    status: "Checked In",
    checkIn: "06:25 PM",
  },
  {
    id: "PR1025",
    name: "Rahul Verma",
    email: "rahul@example.com",
    ticket: "VIP",
    quantity: 1,
    status: "Not Checked In",
    checkIn: "-",
  },
  {
    id: "PR1024",
    name: "Karan Mehta",
    email: "karan@example.com",
    ticket: "General Admission",
    quantity: 3,
    status: "Checked In",
    checkIn: "06:40 PM",
  },
  {
    id: "PR1023",
    name: "Simran Kaur",
    email: "simran@example.com",
    ticket: "VIP",
    quantity: 2,
    status: "Not Checked In",
    checkIn: "-",
  },
];

export default function Attendees() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const checkedIn = attendees.filter(
    (person) => person.status === "Checked In"
  ).length;

  const filteredAttendees = useMemo(() => {
    return attendees.filter((person) => {
      const matchesFilter =
        filter === "All" || person.status === filter;

      const matchesSearch =
        person.name.toLowerCase().includes(search.toLowerCase()) ||
        person.email.toLowerCase().includes(search.toLowerCase()) ||
        person.id.toLowerCase().includes(search.toLowerCase()) ||
        person.ticket.toLowerCase().includes(search.toLowerCase());

      return matchesFilter && matchesSearch;
    });
  }, [search, filter]);

  return (
    <div className="min-h-screen bg-[#f7f7f8] text-gray-900">

      {/* HEADER */}
      <header className="sticky top-0 z-30 border-b bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 md:px-10">

          <div className="flex items-center gap-4">

            <Link
              to="/organizer"
              className="flex h-10 w-10 items-center justify-center rounded-xl border text-lg hover:bg-gray-50"
            >
              ←
            </Link>

            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">
                Organizer Portal
              </p>

              <h1 className="text-xl font-black">
                Attendees
              </h1>
            </div>

          </div>

          <button className="rounded-xl bg-black px-5 py-3 text-sm font-bold text-white hover:bg-gray-800">
            ↓ Export CSV
          </button>

        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-8 md:px-10">

        {/* PAGE TITLE */}
        <div>
          <h2 className="text-3xl font-black md:text-4xl">
            Event Attendees
          </h2>

          <p className="mt-2 text-gray-500">
            Manage attendees and track event check-ins.
          </p>
        </div>

        {/* STATS */}
        <div className="mt-8 grid gap-5 sm:grid-cols-3">

          <Stat
            title="Total Attendees"
            value="428"
            subtitle="Registered attendees"
            icon="👥"
          />

          <Stat
            title="Checked In"
            value={checkedIn.toString()}
            subtitle="Attendees entered"
            icon="✓"
          />

          <Stat
            title="Pending Check-in"
            value={(428 - checkedIn).toString()}
            subtitle="Not checked in yet"
            icon="◷"
          />

        </div>

        {/* CHECK-IN PROGRESS */}
        <div className="mt-8 rounded-2xl border bg-white p-6">

          <div className="flex items-center justify-between">

            <div>
              <h3 className="font-black">
                Event Check-in
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                {checkedIn} of 428 attendees checked in
              </p>
            </div>

            <span className="text-lg font-black">
              76%
            </span>

          </div>

          <div className="mt-4 h-3 overflow-hidden rounded-full bg-gray-100">
            <div
              className="h-full rounded-full bg-black"
              style={{ width: "76%" }}
            />
          </div>

        </div>

        {/* SEARCH / FILTER */}
        <section className="mt-8">

          <div className="rounded-2xl border bg-white p-4">

            <div className="flex flex-col gap-3 lg:flex-row">

              {/* SEARCH */}
              <div className="relative flex-1">

                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                  🔍
                </span>

                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search attendee, email, ticket or order..."
                  className="h-12 w-full rounded-xl bg-gray-100 pl-11 pr-4 text-sm outline-none transition focus:bg-white focus:ring-2 focus:ring-black"
                />

              </div>

              {/* FILTER */}
              <div className="flex gap-2">

                {[
                  "All",
                  "Checked In",
                  "Not Checked In",
                ].map((item) => (

                  <button
                    key={item}
                    onClick={() => setFilter(item)}
                    className={`rounded-xl px-4 py-3 text-sm font-semibold transition ${
                      filter === item
                        ? "bg-black text-white"
                        : "border bg-white hover:bg-gray-50"
                    }`}
                  >
                    {item}
                  </button>

                ))}

              </div>

            </div>

          </div>

          {/* TABLE */}
          <div className="mt-4 overflow-hidden rounded-2xl border bg-white">

            <div className="overflow-x-auto">

              <table className="w-full min-w-[900px] text-left">

                <thead className="border-b bg-gray-50 text-xs uppercase tracking-wide text-gray-400">

                  <tr>
                    <th className="px-6 py-4">Attendee</th>
                    <th className="px-6 py-4">Order ID</th>
                    <th className="px-6 py-4">Ticket</th>
                    <th className="px-6 py-4">Qty</th>
                    <th className="px-6 py-4">Check-in</th>
                    <th className="px-6 py-4">Action</th>
                  </tr>

                </thead>

                <tbody>

                  {filteredAttendees.map((person) => (

                    <tr
                      key={person.id}
                      className="border-b last:border-0 hover:bg-gray-50"
                    >

                      {/* PERSON */}
                      <td className="px-6 py-5">

                        <div className="flex items-center gap-3">

                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 font-bold">
                            {person.name.charAt(0)}
                          </div>

                          <div>
                            <p className="font-bold">
                              {person.name}
                            </p>

                            <p className="text-xs text-gray-400">
                              {person.email}
                            </p>
                          </div>

                        </div>

                      </td>

                      {/* ORDER */}
                      <td className="px-6 py-5 text-sm font-semibold">
                        #{person.id}
                      </td>

                      {/* TICKET */}
                      <td className="px-6 py-5">

                        <span className="rounded-lg bg-gray-100 px-3 py-1.5 text-xs font-semibold">
                          {person.ticket}
                        </span>

                      </td>

                      {/* QTY */}
                      <td className="px-6 py-5 text-sm">
                        {person.quantity}
                      </td>

                      {/* STATUS */}
                      <td className="px-6 py-5">

                        <div>

                          <span
                            className={`rounded-full px-3 py-1.5 text-xs font-bold ${
                              person.status === "Checked In"
                                ? "bg-green-100 text-green-700"
                                : "bg-yellow-100 text-yellow-700"
                            }`}
                          >
                            {person.status}
                          </span>

                          {person.checkIn !== "-" && (
                            <p className="mt-2 text-xs text-gray-400">
                              {person.checkIn}
                            </p>
                          )}

                        </div>

                      </td>

                      {/* ACTION */}
                      <td className="px-6 py-5">

                        <button className="rounded-lg border px-3 py-2 text-sm font-semibold hover:bg-gray-50">
                          View
                        </button>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

            {filteredAttendees.length === 0 && (
              <div className="p-12 text-center">

                <div className="text-4xl">
                  👥
                </div>

                <h3 className="mt-3 font-bold">
                  No attendees found
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  Try changing your search or filter.
                </p>

              </div>
            )}

          </div>

        </section>

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
    <div className="rounded-2xl border bg-white p-5 shadow-sm">

      <div className="flex items-center justify-between">

        <p className="text-sm font-medium text-gray-500">
          {title}
        </p>

        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gray-100">
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