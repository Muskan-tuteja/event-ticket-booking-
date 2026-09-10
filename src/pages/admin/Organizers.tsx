import { useMemo, useState } from "react";
import {
  Search,
  MoreHorizontal,
  Users,
  CalendarDays,
  IndianRupee,
  CheckCircle2,
  Clock3,
  Ban,
} from "lucide-react";

import AdminSidebar from "../../components/admin/AdminSidebar";
import AdminHeader from "../../components/admin/AdminHeader";

type OrganizerStatus = "Active" | "Pending" | "Suspended";

type Organizer = {
  id: number;
  name: string;
  email: string;
  phone: string;
  events: number;
  revenue: string;
  joined: string;
  status: OrganizerStatus;
};

const initialOrganizers: Organizer[] = [
  {
    id: 1,
    name: "Urban Events",
    email: "hello@urbanevents.com",
    phone: "+91 98765 43210",
    events: 18,
    revenue: "₹12.4L",
    joined: "Jan 2026",
    status: "Active",
  },
  {
    id: 2,
    name: "TechWorld India",
    email: "team@techworld.in",
    phone: "+91 98123 45678",
    events: 12,
    revenue: "₹9.8L",
    joined: "Feb 2026",
    status: "Active",
  },
  {
    id: 3,
    name: "Laugh Factory",
    email: "contact@laughfactory.in",
    phone: "+91 97654 32109",
    events: 8,
    revenue: "₹5.6L",
    joined: "Mar 2026",
    status: "Active",
  },
  {
    id: 4,
    name: "Startup India",
    email: "events@startupindia.in",
    phone: "+91 98989 12345",
    events: 3,
    revenue: "₹2.1L",
    joined: "Aug 2026",
    status: "Pending",
  },
  {
    id: 5,
    name: "Creative Hub",
    email: "hello@creativehub.in",
    phone: "+91 91234 56789",
    events: 6,
    revenue: "₹3.7L",
    joined: "Apr 2026",
    status: "Suspended",
  },
];

export default function Organizers() {
  const [organizers, setOrganizers] =
    useState<Organizer[]>(initialOrganizers);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");

  const filteredOrganizers = useMemo(() => {
    return organizers.filter((organizer) => {
      const value = search.toLowerCase();

      const matchesSearch =
        organizer.name.toLowerCase().includes(value) ||
        organizer.email.toLowerCase().includes(value) ||
        organizer.phone.includes(value);

      const matchesStatus =
        status === "All" || organizer.status === status;

      return matchesSearch && matchesStatus;
    });
  }, [organizers, search, status]);

  const updateStatus = (
    id: number,
    newStatus: OrganizerStatus
  ) => {
    setOrganizers((current) =>
      current.map((organizer) =>
        organizer.id === id
          ? { ...organizer, status: newStatus }
          : organizer
      )
    );
  };

  const counts = {
    all: organizers.length,
    active: organizers.filter(
      (organizer) => organizer.status === "Active"
    ).length,
    pending: organizers.filter(
      (organizer) => organizer.status === "Pending"
    ).length,
    suspended: organizers.filter(
      (organizer) => organizer.status === "Suspended"
    ).length,
  };

  return (
    <div className="min-h-screen bg-[#f7f7f8]">

      <AdminSidebar />

      <div className="min-h-screen lg:ml-[274px]">

        <AdminHeader
          title="Organizers"
          subtitle="Manage event organizers and their platform activity."
        />

        <main className="p-5 md:p-8">

          {/* INTRO */}
          <div className="mb-8">

            <p className="text-xs font-bold uppercase tracking-[0.18em] text-gray-400">
              Management
            </p>

            <div className="mt-2 flex flex-col justify-between gap-5 md:flex-row md:items-end">

              <div>
                <h1 className="text-3xl font-black tracking-tight text-gray-950 md:text-4xl">
                  Organizers
                </h1>

                <p className="mt-2 text-sm text-gray-500">
                  Review and manage organizers hosting events on PRAPT.
                </p>
              </div>

              <div className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm shadow-sm">
                <span className="font-bold">
                  {counts.all}
                </span>{" "}
                total organizers
              </div>

            </div>
          </div>

          {/* SUMMARY */}
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

            <SummaryCard
              title="Total Organizers"
              value={counts.all}
              icon={<Users size={20} />}
            />

            <SummaryCard
              title="Active"
              value={counts.active}
              icon={<CheckCircle2 size={20} />}
            />

            <SummaryCard
              title="Pending Review"
              value={counts.pending}
              icon={<Clock3 size={20} />}
            />

            <SummaryCard
              title="Suspended"
              value={counts.suspended}
              icon={<Ban size={20} />}
            />

          </div>

          {/* FILTER */}
          <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">

            <div className="grid gap-3 md:grid-cols-[1fr_200px]">

              <div className="relative">

                <Search
                  size={18}
                  className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  value={search}
                  onChange={(e) =>
                    setSearch(e.target.value)
                  }
                  placeholder="Search organizer, email or phone..."
                  className="h-11 w-full rounded-xl border border-gray-200 bg-gray-50 pl-11 pr-4 text-sm outline-none transition focus:border-black focus:bg-white"
                />

              </div>

              <select
                value={status}
                onChange={(e) =>
                  setStatus(e.target.value)
                }
                className="h-11 rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm outline-none focus:border-black"
              >
                <option value="All">
                  All Status
                </option>

                <option value="Active">
                  Active
                </option>

                <option value="Pending">
                  Pending
                </option>

                <option value="Suspended">
                  Suspended
                </option>
              </select>

            </div>

          </div>

          {/* TABLE */}
          <div className="mt-6 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

            <div className="flex items-center justify-between border-b border-gray-100 px-6 py-5">

              <div>
                <h2 className="font-black text-gray-950">
                  All Organizers
                </h2>

                <p className="mt-1 text-xs text-gray-500">
                  Showing {filteredOrganizers.length} of{" "}
                  {organizers.length} organizers
                </p>
              </div>

            </div>

            <div className="overflow-x-auto">

              <table className="w-full min-w-[1000px] text-left">

                <thead className="bg-gray-50">

                  <tr className="text-xs uppercase tracking-wider text-gray-400">

                    <th className="px-6 py-4">
                      Organizer
                    </th>

                    <th className="px-6 py-4">
                      Contact
                    </th>

                    <th className="px-6 py-4">
                      Events
                    </th>

                    <th className="px-6 py-4">
                      Revenue
                    </th>

                    <th className="px-6 py-4">
                      Joined
                    </th>

                    <th className="px-6 py-4">
                      Status
                    </th>

                    <th className="px-6 py-4">
                      Action
                    </th>

                  </tr>

                </thead>

                <tbody className="divide-y divide-gray-100">

                  {filteredOrganizers.map((organizer) => (

                    <tr
                      key={organizer.id}
                      className="transition hover:bg-gray-50"
                    >

                      {/* ORGANIZER */}
                      <td className="px-6 py-5">

                        <div className="flex items-center gap-3">

                          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gray-100 font-black">
                            {organizer.name.charAt(0)}
                          </div>

                          <div>
                            <p className="font-bold text-gray-950">
                              {organizer.name}
                            </p>

                            <p className="mt-1 text-xs text-gray-400">
                              Organizer #{organizer.id}
                            </p>
                          </div>

                        </div>

                      </td>

                      {/* CONTACT */}
                      <td className="px-6 py-5">

                        <p className="text-sm font-medium text-gray-700">
                          {organizer.email}
                        </p>

                        <p className="mt-1 text-xs text-gray-400">
                          {organizer.phone}
                        </p>

                      </td>

                      {/* EVENTS */}
                      <td className="px-6 py-5">

                        <div className="flex items-center gap-2">

                          <CalendarDays
                            size={17}
                            className="text-gray-400"
                          />

                          <span className="text-sm font-bold">
                            {organizer.events}
                          </span>

                        </div>

                      </td>

                      {/* REVENUE */}
                      <td className="px-6 py-5">

                        <div className="flex items-center gap-1">

                          <IndianRupee
                            size={15}
                            className="text-gray-400"
                          />

                          <span className="text-sm font-bold">
                            {organizer.revenue.replace("₹", "")}
                          </span>

                        </div>

                      </td>

                      {/* JOINED */}
                      <td className="px-6 py-5 text-sm text-gray-600">
                        {organizer.joined}
                      </td>

                      {/* STATUS */}
                      <td className="px-6 py-5">
                        <StatusBadge
                          status={organizer.status}
                        />
                      </td>

                      {/* ACTION */}
                      <td className="px-6 py-5">

                        <div className="flex items-center gap-2">

                          <button
                            type="button"
                            className="rounded-lg border border-gray-200 px-3 py-2 text-xs font-semibold transition hover:bg-gray-100"
                          >
                            View
                          </button>

                          {organizer.status === "Pending" && (
                            <button
                              type="button"
                              onClick={() =>
                                updateStatus(
                                  organizer.id,
                                  "Active"
                                )
                              }
                              className="rounded-lg bg-black px-3 py-2 text-xs font-bold text-white transition hover:bg-gray-800"
                            >
                              Approve
                            </button>
                          )}

                          {organizer.status === "Active" && (
                            <button
                              type="button"
                              onClick={() =>
                                updateStatus(
                                  organizer.id,
                                  "Suspended"
                                )
                              }
                              className="rounded-lg border border-gray-200 px-3 py-2 text-xs font-semibold text-gray-600 transition hover:bg-gray-100"
                            >
                              Suspend
                            </button>
                          )}

                          {organizer.status === "Suspended" && (
                            <button
                              type="button"
                              onClick={() =>
                                updateStatus(
                                  organizer.id,
                                  "Active"
                                )
                              }
                              className="rounded-lg bg-black px-3 py-2 text-xs font-bold text-white transition hover:bg-gray-800"
                            >
                              Activate
                            </button>
                          )}

                          <button
                            type="button"
                            className="rounded-lg p-2 text-gray-400 transition hover:bg-gray-100 hover:text-black"
                          >
                            <MoreHorizontal size={18} />
                          </button>

                        </div>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

            {/* EMPTY */}
            {filteredOrganizers.length === 0 && (
              <div className="px-6 py-16 text-center">

                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100">
                  <Search size={20} />
                </div>

                <h3 className="mt-4 font-bold">
                  No organizers found
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  Try changing your search or status filter.
                </p>

              </div>
            )}

          </div>

        </main>

      </div>
    </div>
  );
}

/* ================= SUMMARY CARD ================= */

function SummaryCard({
  title,
  value,
  icon,
}: {
  title: string;
  value: number;
  icon: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">

      <div className="flex items-center justify-between">

        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gray-100">
          {icon}
        </div>

      </div>

      <p className="mt-5 text-sm text-gray-500">
        {title}
      </p>

      <p className="mt-1 text-2xl font-black text-gray-950">
        {value}
      </p>

    </div>
  );
}

/* ================= STATUS ================= */

function StatusBadge({
  status,
}: {
  status: OrganizerStatus;
}) {
  const styles: Record<OrganizerStatus, string> = {
    Active: "bg-green-50 text-green-700",
    Pending: "bg-yellow-50 text-yellow-700",
    Suspended: "bg-red-50 text-red-700",
  };

  return (
    <span
      className={`inline-flex rounded-full px-3 py-1.5 text-xs font-bold ${styles[status]}`}
    >
      {status}
    </span>
  );
}