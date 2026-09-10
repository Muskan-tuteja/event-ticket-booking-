import { useMemo, useState } from "react";
import {
  Search,
  MoreHorizontal,
  CreditCard,
  IndianRupee,
  CheckCircle2,
  Clock3,
  XCircle,
  RotateCcw,
} from "lucide-react";

import AdminSidebar from "../../components/admin/AdminSidebar";
import AdminHeader from "../../components/admin/AdminHeader";

type PaymentStatus = "Successful" | "Pending" | "Failed" | "Refunded";

interface Payment {
  id: string;
  orderId: string;
  customer: string;
  email: string;
  event: string;
  amount: number;
  method: string;
  date: string;
  status: PaymentStatus;
}

const initialPayments: Payment[] = [
  {
    id: "pay_RP82191",
    orderId: "PRP-10021",
    customer: "Aarav Sharma",
    email: "aarav.sharma@gmail.com",
    event: "Music Fest 2026",
    amount: 998,
    method: "UPI",
    date: "10 Sep 2026, 10:42 AM",
    status: "Successful",
  },
  {
    id: "pay_RP82190",
    orderId: "PRP-10020",
    customer: "Priya Mehta",
    email: "priya.mehta@gmail.com",
    event: "Tech Summit 2026",
    amount: 799,
    method: "Card",
    date: "09 Sep 2026, 08:16 PM",
    status: "Successful",
  },
  {
    id: "pay_RP82189",
    orderId: "PRP-10019",
    customer: "Rohan Verma",
    email: "rohan.verma@gmail.com",
    event: "Comedy Night",
    amount: 1197,
    method: "UPI",
    date: "09 Sep 2026, 06:25 PM",
    status: "Pending",
  },
  {
    id: "pay_RP82188",
    orderId: "PRP-10018",
    customer: "Neha Kapoor",
    email: "neha.kapoor@gmail.com",
    event: "Music Fest 2026",
    amount: 998,
    method: "Net Banking",
    date: "08 Sep 2026, 04:51 PM",
    status: "Failed",
  },
  {
    id: "pay_RP82187",
    orderId: "PRP-10017",
    customer: "Karan Singh",
    email: "karan.singh@gmail.com",
    event: "Tech Summit 2026",
    amount: 1598,
    method: "UPI",
    date: "07 Sep 2026, 11:32 AM",
    status: "Refunded",
  },
  {
    id: "pay_RP82186",
    orderId: "PRP-10016",
    customer: "Simran Kaur",
    email: "simran.kaur@gmail.com",
    event: "Comedy Night",
    amount: 798,
    method: "Card",
    date: "06 Sep 2026, 09:48 PM",
    status: "Successful",
  },
  {
    id: "pay_RP82185",
    orderId: "PRP-10015",
    customer: "Rahul Gupta",
    email: "rahul.gupta@gmail.com",
    event: "Music Fest 2026",
    amount: 999,
    method: "UPI",
    date: "05 Sep 2026, 02:19 PM",
    status: "Successful",
  },
];

export default function Payments() {
  const [payments, setPayments] =
    useState<Payment[]>(initialPayments);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const filteredPayments = useMemo(() => {
    return payments.filter((payment) => {
      const value = search.toLowerCase();

      const matchesSearch =
        payment.id.toLowerCase().includes(value) ||
        payment.orderId.toLowerCase().includes(value) ||
        payment.customer.toLowerCase().includes(value) ||
        payment.email.toLowerCase().includes(value) ||
        payment.event.toLowerCase().includes(value);

      const matchesStatus =
        statusFilter === "All" ||
        payment.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [payments, search, statusFilter]);

  const successfulPayments = payments.filter(
    (payment) => payment.status === "Successful"
  ).length;

  const pendingPayments = payments.filter(
    (payment) => payment.status === "Pending"
  ).length;

  const failedPayments = payments.filter(
    (payment) => payment.status === "Failed"
  ).length;

  const successfulRevenue = payments
    .filter((payment) => payment.status === "Successful")
    .reduce((sum, payment) => sum + payment.amount, 0);

  const refundPayment = (id: string) => {
    setPayments((current) =>
      current.map((payment) =>
        payment.id === id
          ? { ...payment, status: "Refunded" }
          : payment
      )
    );

    setOpenMenu(null);
  };

  return (
    <div className="min-h-screen bg-[#f7f7f8]">
      <AdminSidebar />

      <div className="min-h-screen lg:ml-[274px]">
        <AdminHeader
          title="Payments"
          subtitle="Monitor transactions, payment status and refunds."
        />

        <main className="p-5 md:p-8">

          {/* HEADER */}
          <div className="mb-7">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-gray-400">
              Financial Management
            </p>

            <div className="mt-2 flex flex-col justify-between gap-4 md:flex-row md:items-end">
              <div>
                <h1 className="text-3xl font-black tracking-tight text-gray-950">
                  Payments
                </h1>

                <p className="mt-2 text-sm text-gray-500">
                  Track Razorpay transactions and customer payments.
                </p>
              </div>

              <div className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-600 shadow-sm">
                <CreditCard size={17} />
                Razorpay
              </div>
            </div>
          </div>

          {/* STATS */}
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

            <SummaryCard
              title="Successful"
              value={successfulPayments.toString()}
              icon={<CheckCircle2 size={20} />}
              description="Completed payments"
            />

            <SummaryCard
              title="Pending"
              value={pendingPayments.toString()}
              icon={<Clock3 size={20} />}
              description="Awaiting confirmation"
            />

            <SummaryCard
              title="Failed"
              value={failedPayments.toString()}
              icon={<XCircle size={20} />}
              description="Unsuccessful payments"
            />

            <SummaryCard
              title="Revenue"
              value={`₹${successfulRevenue.toLocaleString()}`}
              icon={<IndianRupee size={20} />}
              description="Successful transactions"
            />

          </div>

          {/* TABLE */}
          <section className="mt-7 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

            {/* FILTER BAR */}
            <div className="border-b border-gray-100 p-5">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

                <div className="relative w-full lg:max-w-md">
                  <Search
                    size={18}
                    className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search payment, order or customer..."
                    className="h-11 w-full rounded-xl border border-gray-200 bg-gray-50 pl-11 pr-4 text-sm outline-none transition focus:border-gray-400 focus:bg-white"
                  />
                </div>

                <div className="flex flex-wrap gap-2">
                  {[
                    "All",
                    "Successful",
                    "Pending",
                    "Failed",
                    "Refunded",
                  ].map((status) => (
                    <button
                      key={status}
                      type="button"
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
              <table className="w-full min-w-[1200px]">

                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50/70 text-left">

                    <th className="px-5 py-4 text-xs font-bold uppercase tracking-wider text-gray-400">
                      Payment
                    </th>

                    <th className="px-5 py-4 text-xs font-bold uppercase tracking-wider text-gray-400">
                      Customer
                    </th>

                    <th className="px-5 py-4 text-xs font-bold uppercase tracking-wider text-gray-400">
                      Event
                    </th>

                    <th className="px-5 py-4 text-xs font-bold uppercase tracking-wider text-gray-400">
                      Amount
                    </th>

                    <th className="px-5 py-4 text-xs font-bold uppercase tracking-wider text-gray-400">
                      Method
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
                  {filteredPayments.map((payment) => (
                    <tr
                      key={payment.id}
                      className="border-b border-gray-100 last:border-0 hover:bg-gray-50/60"
                    >

                      {/* PAYMENT */}
                      <td className="px-5 py-5">
                        <p className="font-bold text-gray-950">
                          {payment.id}
                        </p>

                        <p className="mt-1 text-xs text-gray-400">
                          Order: {payment.orderId}
                        </p>
                      </td>

                      {/* CUSTOMER */}
                      <td className="px-5 py-5">
                        <div className="flex items-center gap-3">

                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-xs font-black">
                            {payment.customer
                              .split(" ")
                              .map((word) => word[0])
                              .join("")
                              .slice(0, 2)}
                          </div>

                          <div>
                            <p className="text-sm font-bold text-gray-900">
                              {payment.customer}
                            </p>

                            <p className="mt-1 text-xs text-gray-400">
                              {payment.email}
                            </p>
                          </div>

                        </div>
                      </td>

                      {/* EVENT */}
                      <td className="px-5 py-5">
                        <p className="text-sm font-semibold text-gray-800">
                          {payment.event}
                        </p>
                      </td>

                      {/* AMOUNT */}
                      <td className="px-5 py-5">
                        <div className="flex items-center gap-1">
                          <IndianRupee
                            size={14}
                            className="text-gray-400"
                          />

                          <span className="text-sm font-black">
                            {payment.amount.toLocaleString()}
                          </span>
                        </div>
                      </td>

                      {/* METHOD */}
                      <td className="px-5 py-5">
                        <span className="rounded-lg bg-gray-100 px-3 py-1.5 text-xs font-bold text-gray-700">
                          {payment.method}
                        </span>
                      </td>

                      {/* DATE */}
                      <td className="px-5 py-5 text-sm text-gray-500">
                        {payment.date}
                      </td>

                      {/* STATUS */}
                      <td className="px-5 py-5">
                        <StatusBadge status={payment.status} />
                      </td>

                      {/* ACTION */}
                      <td className="relative px-5 py-5 text-right">

                        <button
                          type="button"
                          onClick={() =>
                            setOpenMenu(
                              openMenu === payment.id
                                ? null
                                : payment.id
                            )
                          }
                          className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-500 transition hover:bg-gray-100"
                        >
                          <MoreHorizontal size={18} />
                        </button>

                        {openMenu === payment.id && (
                          <div className="absolute right-5 top-14 z-20 w-48 overflow-hidden rounded-xl border border-gray-200 bg-white p-1.5 text-left shadow-xl">

                            <button
                              type="button"
                              onClick={() => setOpenMenu(null)}
                              className="w-full rounded-lg px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-50"
                            >
                              View Payment
                            </button>

                            {payment.status === "Successful" && (
                              <button
                                type="button"
                                onClick={() =>
                                  refundPayment(payment.id)
                                }
                                className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-sm text-red-600 hover:bg-red-50"
                              >
                                <RotateCcw size={15} />
                                Refund Payment
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
            {filteredPayments.length === 0 && (
              <div className="flex flex-col items-center justify-center px-6 py-16 text-center">

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-100">
                  <CreditCard
                    size={24}
                    className="text-gray-400"
                  />
                </div>

                <h3 className="mt-4 font-bold text-gray-900">
                  No payments found
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  Try changing your search or payment status.
                </p>

              </div>
            )}

            {/* FOOTER */}
            <div className="flex flex-col gap-2 border-t border-gray-100 px-5 py-4 text-sm text-gray-500 sm:flex-row sm:items-center sm:justify-between">

              <span>
                Showing{" "}
                <strong className="text-gray-900">
                  {filteredPayments.length}
                </strong>{" "}
                of{" "}
                <strong className="text-gray-900">
                  {payments.length}
                </strong>{" "}
                payments
              </span>

              <span className="text-xs text-gray-400">
                Payment gateway integration pending
              </span>

            </div>

          </section>

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

function StatusBadge({
  status,
}: {
  status: PaymentStatus;
}) {
  const styles: Record<PaymentStatus, string> = {
    Successful: "bg-green-50 text-green-700",
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