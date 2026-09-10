import { useMemo, useState } from "react";
import {
  Search,
  MoreHorizontal,
  Users,
  Ticket,
  IndianRupee,
  UserCheck,
  UserX,
  Mail,
  Phone,
} from "lucide-react";

import AdminSidebar from "../../components/admin/AdminSidebar";
import AdminHeader from "../../components/admin/AdminHeader";

type CustomerStatus = "Active" | "Blocked";

interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
  tickets: number;
  spent: number;
  joined: string;
  status: CustomerStatus;
}

const initialCustomers: Customer[] = [
  {
    id: 1,
    name: "Aarav Sharma",
    email: "aarav.sharma@gmail.com",
    phone: "+91 98765 43210",
    tickets: 8,
    spent: 6490,
    joined: "12 Aug 2026",
    status: "Active",
  },
  {
    id: 2,
    name: "Priya Mehta",
    email: "priya.mehta@gmail.com",
    phone: "+91 98111 22334",
    tickets: 5,
    spent: 3895,
    joined: "19 Aug 2026",
    status: "Active",
  },
  {
    id: 3,
    name: "Rohan Verma",
    email: "rohan.verma@gmail.com",
    phone: "+91 99887 66554",
    tickets: 12,
    spent: 9290,
    joined: "24 Jul 2026",
    status: "Active",
  },
  {
    id: 4,
    name: "Neha Kapoor",
    email: "neha.kapoor@gmail.com",
    phone: "+91 98989 11223",
    tickets: 2,
    spent: 998,
    joined: "02 Sep 2026",
    status: "Blocked",
  },
  {
    id: 5,
    name: "Karan Singh",
    email: "karan.singh@gmail.com",
    phone: "+91 98770 44556",
    tickets: 6,
    spent: 4590,
    joined: "28 Aug 2026",
    status: "Active",
  },
  {
    id: 6,
    name: "Simran Kaur",
    email: "simran.kaur@gmail.com",
    phone: "+91 98211 77889",
    tickets: 4,
    spent: 3196,
    joined: "31 Aug 2026",
    status: "Active",
  },
];

export default function Customers() {
  const [customers, setCustomers] =
    useState<Customer[]>(initialCustomers);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [openMenu, setOpenMenu] = useState<number | null>(null);

  const filteredCustomers = useMemo(() => {
    return customers.filter((customer) => {
      const matchesSearch =
        customer.name.toLowerCase().includes(search.toLowerCase()) ||
        customer.email.toLowerCase().includes(search.toLowerCase()) ||
        customer.phone.includes(search);

      const matchesStatus =
        statusFilter === "All" ||
        customer.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [customers, search, statusFilter]);

  const activeCustomers = customers.filter(
    (customer) => customer.status === "Active"
  ).length;

  const blockedCustomers = customers.filter(
    (customer) => customer.status === "Blocked"
  ).length;

  const totalTickets = customers.reduce(
    (sum, customer) => sum + customer.tickets,
    0
  );

  const totalSpent = customers.reduce(
    (sum, customer) => sum + customer.spent,
    0
  );

  const toggleCustomerStatus = (id: number) => {
    setCustomers((prev) =>
      prev.map((customer) =>
        customer.id === id
          ? {
              ...customer,
              status:
                customer.status === "Active"
                  ? "Blocked"
                  : "Active",
            }
          : customer
      )
    );

    setOpenMenu(null);
  };

  return (
    <div className="min-h-screen bg-[#f7f7f8]">
      <AdminSidebar />

      <div className="min-h-screen lg:ml-[274px]">
        <AdminHeader
          title="Customers"
          subtitle="Manage customer accounts, activity and ticket purchases."
        />

        <main className="p-5 md:p-8">
          {/* TOP */}
          <div className="mb-7 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-semibold text-gray-400">
                Customer Management
              </p>

              <h2 className="mt-1 text-2xl font-black tracking-tight text-gray-950 md:text-3xl">
                All Customers
              </h2>

              <p className="mt-2 text-sm text-gray-500">
                View and manage everyone using the PRAPT platform.
              </p>
            </div>

            <div className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-600 shadow-sm">
              <Users size={17} />
              <span>{customers.length} customers</span>
            </div>
          </div>

          {/* SUMMARY CARDS */}
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <SummaryCard
              title="Total Customers"
              value={customers.length.toString()}
              icon={<Users size={20} />}
              description="Registered users"
            />

            <SummaryCard
              title="Active Customers"
              value={activeCustomers.toString()}
              icon={<UserCheck size={20} />}
              description="Currently active"
            />

            <SummaryCard
              title="Tickets Purchased"
              value={totalTickets.toLocaleString()}
              icon={<Ticket size={20} />}
              description="Across all customers"
            />

            <SummaryCard
              title="Total Spent"
              value={`₹${totalSpent.toLocaleString()}`}
              icon={<IndianRupee size={20} />}
              description="Customer purchases"
            />
          </div>

          {/* FILTER AREA */}
          <section className="mt-7 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
            <div className="border-b border-gray-100 p-5">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                {/* SEARCH */}
                <div className="relative w-full lg:max-w-md">
                  <Search
                    size={18}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search name, email or phone..."
                    className="h-11 w-full rounded-xl border border-gray-200 bg-gray-50 pl-11 pr-4 text-sm outline-none transition focus:border-gray-400 focus:bg-white"
                  />
                </div>

                {/* STATUS FILTER */}
                <div className="flex items-center gap-2">
                  {["All", "Active", "Blocked"].map((status) => (
                    <button
                      key={status}
                      onClick={() => setStatusFilter(status)}
                      className={`rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
                        statusFilter === status
                          ? "bg-black text-white"
                          : "bg-gray-50 text-gray-500 hover:bg-gray-100"
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* TABLE */}
            <div className="overflow-x-auto">
              <table className="w-full min-w-[950px]">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50/70 text-left">
                    <th className="px-5 py-4 text-xs font-bold uppercase tracking-wider text-gray-400">
                      Customer
                    </th>

                    <th className="px-5 py-4 text-xs font-bold uppercase tracking-wider text-gray-400">
                      Contact
                    </th>

                    <th className="px-5 py-4 text-xs font-bold uppercase tracking-wider text-gray-400">
                      Tickets
                    </th>

                    <th className="px-5 py-4 text-xs font-bold uppercase tracking-wider text-gray-400">
                      Total Spent
                    </th>

                    <th className="px-5 py-4 text-xs font-bold uppercase tracking-wider text-gray-400">
                      Joined
                    </th>

                    <th className="px-5 py-4 text-xs font-bold uppercase tracking-wider text-gray-400">
                      Status
                    </th>

                    <th className="px-5 py-4 text-right text-xs font-bold uppercase tracking-wider text-gray-400">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {filteredCustomers.map((customer) => (
                    <tr
                      key={customer.id}
                      className="border-b border-gray-100 last:border-0 hover:bg-gray-50/60"
                    >
                      {/* CUSTOMER */}
                      <td className="px-5 py-5">
                        <div className="flex items-center gap-3">
                          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-black text-sm font-bold text-white">
                            {customer.name
                              .split(" ")
                              .map((word) => word[0])
                              .join("")
                              .slice(0, 2)}
                          </div>

                          <div>
                            <p className="font-bold text-gray-900">
                              {customer.name}
                            </p>

                            <p className="mt-0.5 text-xs text-gray-400">
                              Customer #{customer.id.toString().padStart(4, "0")}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* CONTACT */}
                      <td className="px-5 py-5">
                        <div className="space-y-1.5">
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Mail size={14} className="text-gray-400" />
                            {customer.email}
                          </div>

                          <div className="flex items-center gap-2 text-xs text-gray-400">
                            <Phone size={13} />
                            {customer.phone}
                          </div>
                        </div>
                      </td>

                      {/* TICKETS */}
                      <td className="px-5 py-5">
                        <span className="font-semibold text-gray-900">
                          {customer.tickets}
                        </span>
                      </td>

                      {/* SPENT */}
                      <td className="px-5 py-5">
                        <span className="font-bold text-gray-900">
                          ₹{customer.spent.toLocaleString()}
                        </span>
                      </td>

                      {/* JOINED */}
                      <td className="px-5 py-5 text-sm text-gray-500">
                        {customer.joined}
                      </td>

                      {/* STATUS */}
                      <td className="px-5 py-5">
                        <StatusBadge status={customer.status} />
                      </td>

                      {/* ACTION */}
                      <td className="relative px-5 py-5 text-right">
                        <button
                          onClick={() =>
                            setOpenMenu(
                              openMenu === customer.id
                                ? null
                                : customer.id
                            )
                          }
                          className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-500 transition hover:bg-gray-100"
                        >
                          <MoreHorizontal size={18} />
                        </button>

                        {openMenu === customer.id && (
                          <div className="absolute right-5 top-14 z-20 w-44 overflow-hidden rounded-xl border border-gray-200 bg-white p-1.5 text-left shadow-xl">
                            <button
                              className="w-full rounded-lg px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-50"
                              onClick={() => setOpenMenu(null)}
                            >
                              View Customer
                            </button>

                            <button
                              onClick={() =>
                                toggleCustomerStatus(customer.id)
                              }
                              className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-50"
                            >
                              {customer.status === "Active" ? (
                                <>
                                  <UserX size={15} />
                                  Block Customer
                                </>
                              ) : (
                                <>
                                  <UserCheck size={15} />
                                  Activate Customer
                                </>
                              )}
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* EMPTY */}
            {filteredCustomers.length === 0 && (
              <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-100">
                  <Users size={24} className="text-gray-400" />
                </div>

                <h3 className="mt-4 font-bold text-gray-900">
                  No customers found
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  Try changing your search or status filter.
                </p>
              </div>
            )}

            {/* FOOTER */}
            <div className="flex flex-col gap-2 border-t border-gray-100 px-5 py-4 text-sm text-gray-500 sm:flex-row sm:items-center sm:justify-between">
              <span>
                Showing{" "}
                <strong className="text-gray-900">
                  {filteredCustomers.length}
                </strong>{" "}
                of{" "}
                <strong className="text-gray-900">
                  {customers.length}
                </strong>{" "}
                customers
              </span>

              <span className="text-xs text-gray-400">
                Admin actions are currently demo-only
              </span>
            </div>
          </section>

          {/* BLOCKED INFO */}
          <div className="mt-5 flex items-start gap-3 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gray-100">
              <UserX size={18} className="text-gray-600" />
            </div>

            <div>
              <p className="font-bold text-gray-900">
                Customer account controls
              </p>

              <p className="mt-1 text-sm leading-6 text-gray-500">
                Administrators can review customer activity and
                temporarily block accounts when required.
              </p>

              <p className="mt-1 text-xs text-gray-400">
                Currently blocked: {blockedCustomers} customer
                {blockedCustomers !== 1 ? "s" : ""}
              </p>
            </div>
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
  description,
}: {
  title: string;
  value: string;
  icon: React.ReactNode;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100 text-gray-700">
          {icon}
        </div>

        <span className="rounded-full bg-gray-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-gray-400">
          Live
        </span>
      </div>

      <p className="mt-5 text-sm font-medium text-gray-500">
        {title}
      </p>

      <h3 className="mt-1 text-2xl font-black tracking-tight text-gray-950">
        {value}
      </h3>

      <p className="mt-1 text-xs text-gray-400">
        {description}
      </p>
    </div>
  );
}

function StatusBadge({ status }: { status: CustomerStatus }) {
  const isActive = status === "Active";

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold ${
        isActive
          ? "bg-gray-100 text-gray-800"
          : "bg-black text-white"
      }`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${
          isActive ? "bg-gray-700" : "bg-white"
        }`}
      />

      {status}
    </span>
  );
}