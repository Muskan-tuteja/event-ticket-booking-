import { useMemo, useState } from "react";
import {
  Search,
  MoreHorizontal,
  ShoppingBag,
  IndianRupee,
  CheckCircle2,
  Clock3,
  XCircle,
} from "lucide-react";

import AdminSidebar from "../../components/admin/AdminSidebar";
import AdminHeader from "../../components/admin/AdminHeader";

type PaymentStatus = "Paid" | "Pending" | "Failed" | "Refunded";

interface Order {
  id: string;
  customer: string;
  email: string;
  event: string;
  tickets: number;
  amount: number;
  date: string;
  status: PaymentStatus;
}

const initialOrders: Order[] = [
  {
    id: "PRP-10021",
    customer: "Aarav Sharma",
    email: "aarav.sharma@gmail.com",
    event: "Music Fest 2026",
    tickets: 2,
    amount: 998,
    date: "10 Sep 2026",
    status: "Paid",
  },
  {
    id: "PRP-10020",
    customer: "Priya Mehta",
    email: "priya.mehta@gmail.com",
    event: "Tech Summit 2026",
    tickets: 1,
    amount: 799,
    date: "09 Sep 2026",
    status: "Paid",
  },
  {
    id: "PRP-10019",
    customer: "Rohan Verma",
    email: "rohan.verma@gmail.com",
    event: "Comedy Night",
    tickets: 3,
    amount: 1197,
    date: "09 Sep 2026",
    status: "Pending",
  },
  {
    id: "PRP-10018",
    customer: "Neha Kapoor",
    email: "neha.kapoor@gmail.com",
    event: "Music Fest 2026",
    tickets: 2,
    amount: 998,
    date: "08 Sep 2026",
    status: "Failed",
  },
  {
    id: "PRP-10017",
    customer: "Karan Singh",
    email: "karan.singh@gmail.com",
    event: "Tech Summit 2026",
    tickets: 2,
    amount: 1598,
    date: "07 Sep 2026",
    status: "Refunded",
  },
  {
    id: "PRP-10016",
    customer: "Simran Kaur",
    email: "simran.kaur@gmail.com",
    event: "Comedy Night",
    tickets: 2,
    amount: 798,
    date: "06 Sep 2026",
    status: "Paid",
  },
];

export default function Orders() {
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const searchValue = search.toLowerCase();

      const matchesSearch =
        order.id.toLowerCase().includes(searchValue) ||
        order.customer.toLowerCase().includes(searchValue) ||
        order.email.toLowerCase().includes(searchValue) ||
        order.event.toLowerCase().includes(searchValue);

      const matchesStatus =
        statusFilter === "All" ||
        order.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [orders, search, statusFilter]);

  const paidOrders = orders.filter(
    (order) => order.status === "Paid"
  ).length;

  const pendingOrders = orders.filter(
    (order) => order.status === "Pending"
  ).length;

  // const failedOrders = orders.filter(
  //   (order) => order.status === "Failed"
  // ).length;

  const totalRevenue = orders
    .filter((order) => order.status === "Paid")
    .reduce((sum, order) => sum + order.amount, 0);

  const refundOrder = (id: string) => {
    setOrders((current) =>
      current.map((order) =>
        order.id === id
          ? { ...order, status: "Refunded" }
          : order
      )
    );

    setOpenMenu(null);
  };

  return (
    <div className="min-h-screen bg-[#f7f7f8]">

      <AdminSidebar />

      <div className="min-h-screen lg:ml-[274px]">

        <AdminHeader
          title="Orders"
          subtitle="Monitor ticket orders and payment activity."
        />

        <main className="p-5 md:p-8">

          {/* INTRO */}
          <div className="mb-7">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-gray-400">
              Sales Management
            </p>

            <div className="mt-2 flex flex-col justify-between gap-4 md:flex-row md:items-end">

              <div>
                <h1 className="text-3xl font-black tracking-tight text-gray-950">
                  Orders
                </h1>

                <p className="mt-2 text-sm text-gray-500">
                  View customer orders, payments and ticket purchases.
                </p>
              </div>

              <button
                type="button"
                className="rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm font-bold shadow-sm transition hover:bg-gray-50"
              >
                Export Orders
              </button>

            </div>
          </div>

          {/* STATS */}
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

            <SummaryCard
              title="Total Orders"
              value={orders.length.toString()}
              icon={<ShoppingBag size={20} />}
              description="All orders"
            />

            <SummaryCard
              title="Paid Orders"
              value={paidOrders.toString()}
              icon={<CheckCircle2 size={20} />}
              description="Successful payments"
            />

            <SummaryCard
              title="Pending"
              value={pendingOrders.toString()}
              icon={<Clock3 size={20} />}
              description="Awaiting payment"
            />

            <SummaryCard
              title="Revenue"
              value={`₹${totalRevenue.toLocaleString()}`}
              icon={<IndianRupee size={20} />}
              description="Successful orders"
            />

          </div>

          {/* FILTER */}
          <section className="mt-7 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

            <div className="border-b border-gray-100 p-5">

              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

                {/* SEARCH */}
                <div className="relative w-full lg:max-w-md">

                  <Search
                    size={18}
                    className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    value={search}
                    onChange={(e) =>
                      setSearch(e.target.value)
                    }
                    placeholder="Search order, customer or event..."
                    className="h-11 w-full rounded-xl border border-gray-200 bg-gray-50 pl-11 pr-4 text-sm outline-none transition focus:border-gray-400 focus:bg-white"
                  />

                </div>

                {/* FILTERS */}
                <div className="flex flex-wrap gap-2">

                  {[
                    "All",
                    "Paid",
                    "Pending",
                    "Failed",
                    "Refunded",
                  ].map((status) => (
                    <button
                      key={status}
                      type="button"
                      onClick={() =>
                        setStatusFilter(status)
                      }
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

              <table className="w-full min-w-[1050px]">

                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50/70 text-left">

                    <th className="px-5 py-4 text-xs font-bold uppercase tracking-wider text-gray-400">
                      Order
                    </th>

                    <th className="px-5 py-4 text-xs font-bold uppercase tracking-wider text-gray-400">
                      Customer
                    </th>

                    <th className="px-5 py-4 text-xs font-bold uppercase tracking-wider text-gray-400">
                      Event
                    </th>

                    <th className="px-5 py-4 text-xs font-bold uppercase tracking-wider text-gray-400">
                      Tickets
                    </th>

                    <th className="px-5 py-4 text-xs font-bold uppercase tracking-wider text-gray-400">
                      Amount
                    </th>

                    <th className="px-5 py-4 text-xs font-bold uppercase tracking-wider text-gray-400">
                      Date
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

                  {filteredOrders.map((order) => (

                    <tr
                      key={order.id}
                      className="border-b border-gray-100 last:border-0 hover:bg-gray-50/60"
                    >

                      {/* ORDER */}
                      <td className="px-5 py-5">

                        <p className="font-bold text-gray-950">
                          {order.id}
                        </p>

                        <p className="mt-1 text-xs text-gray-400">
                          Ticket order
                        </p>

                      </td>

                      {/* CUSTOMER */}
                      <td className="px-5 py-5">

                        <div className="flex items-center gap-3">

                          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100 text-xs font-black">
                            {order.customer
                              .split(" ")
                              .map((word) => word[0])
                              .join("")
                              .slice(0, 2)}
                          </div>

                          <div>
                            <p className="text-sm font-bold text-gray-900">
                              {order.customer}
                            </p>

                            <p className="mt-1 text-xs text-gray-400">
                              {order.email}
                            </p>
                          </div>

                        </div>

                      </td>

                      {/* EVENT */}
                      <td className="px-5 py-5">

                        <p className="text-sm font-semibold text-gray-800">
                          {order.event}
                        </p>

                      </td>

                      {/* TICKETS */}
                      <td className="px-5 py-5">

                        <span className="text-sm font-bold">
                          {order.tickets}
                        </span>

                      </td>

                      {/* AMOUNT */}
                      <td className="px-5 py-5">

                        <div className="flex items-center gap-1">

                          <IndianRupee
                            size={14}
                            className="text-gray-400"
                          />

                          <span className="text-sm font-bold">
                            {order.amount.toLocaleString()}
                          </span>

                        </div>

                      </td>

                      {/* DATE */}
                      <td className="px-5 py-5 text-sm text-gray-500">
                        {order.date}
                      </td>

                      {/* STATUS */}
                      <td className="px-5 py-5">
                        <StatusBadge
                          status={order.status}
                        />
                      </td>

                      {/* ACTION */}
                      <td className="relative px-5 py-5 text-right">

                        <button
                          type="button"
                          onClick={() =>
                            setOpenMenu(
                              openMenu === order.id
                                ? null
                                : order.id
                            )
                          }
                          className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-500 transition hover:bg-gray-100"
                        >
                          <MoreHorizontal size={18} />
                        </button>

                        {openMenu === order.id && (
                          <div className="absolute right-5 top-14 z-20 w-44 overflow-hidden rounded-xl border border-gray-200 bg-white p-1.5 text-left shadow-xl">

                            <button
                              type="button"
                              onClick={() =>
                                setOpenMenu(null)
                              }
                              className="w-full rounded-lg px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-50"
                            >
                              View Order
                            </button>

                            {order.status === "Paid" && (
                              <button
                                type="button"
                                onClick={() =>
                                  refundOrder(order.id)
                                }
                                className="w-full rounded-lg px-3 py-2.5 text-left text-sm text-red-600 hover:bg-red-50"
                              >
                                Refund Order
                              </button>
                            )}

                          </div>
                        )}

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

            {/* EMPTY */}
            {filteredOrders.length === 0 && (
              <div className="flex flex-col items-center justify-center px-6 py-16 text-center">

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-100">
                  <ShoppingBag
                    size={24}
                    className="text-gray-400"
                  />
                </div>

                <h3 className="mt-4 font-bold">
                  No orders found
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  Try changing your search or payment filter.
                </p>

              </div>
            )}

            {/* FOOTER */}
            <div className="flex flex-col gap-2 border-t border-gray-100 px-5 py-4 text-sm text-gray-500 sm:flex-row sm:items-center sm:justify-between">

              <span>
                Showing{" "}
                <strong className="text-gray-900">
                  {filteredOrders.length}
                </strong>{" "}
                of{" "}
                <strong className="text-gray-900">
                  {orders.length}
                </strong>{" "}
                orders
              </span>

              <span className="flex items-center gap-2 text-xs text-gray-400">
                <XCircle size={13} />
                Demo payment data
              </span>

            </div>

          </section>

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
  description,
}: {
  title: string;
  value: string;
  icon: React.ReactNode;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">

      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100 text-gray-700">
        {icon}
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

/* ================= STATUS ================= */

function StatusBadge({
  status,
}: {
  status: PaymentStatus;
}) {
  const styles: Record<PaymentStatus, string> = {
    Paid: "bg-green-50 text-green-700",
    Pending: "bg-yellow-50 text-yellow-700",
    Failed: "bg-red-50 text-red-700",
    Refunded: "bg-gray-100 text-gray-600",
  };

  return (
    <span
      className={`inline-flex rounded-full px-3 py-1.5 text-xs font-bold ${styles[status]}`}
    >
      {status}
    </span>
  );
}