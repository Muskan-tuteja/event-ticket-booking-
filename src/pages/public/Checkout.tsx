
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { events } from "../../data/events";

export default function Checkout() {
  const { id } = useParams();

  const event = events.find(
    (item) => item.id === Number(id)
  );

  const [quantity, setQuantity] = useState(1);

  if (!event) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f7f7f8] px-6">
        <div className="text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-white text-3xl shadow-sm">
            😕
          </div>

          <h1 className="mt-6 text-2xl font-black">
            Event not found
          </h1>

          <p className="mt-2 text-gray-500">
            The event you're looking for doesn't exist.
          </p>

          <Link
            to="/events"
            className="mt-6 inline-flex rounded-xl bg-black px-6 py-3 text-sm font-bold text-white"
          >
            Browse Events →
          </Link>
        </div>
      </main>
    );
  }

  const ticketPrice = event.price * quantity;
  const convenienceFee = 50;
  const total = ticketPrice + convenienceFee;

  return (
    <main className="min-h-screen bg-[#f7f7f8] text-[#111827]">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5 md:px-8">

          <Link
            to="/"
            className="text-2xl font-black tracking-tight"
          >
            PRAPT<span className="text-violet-600">.</span>
          </Link>

          <div className="flex items-center gap-2 text-xs font-bold text-gray-400">
            <span className="hidden sm:inline">
              Secure Checkout
            </span>

            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
              ✓
            </span>
          </div>

        </div>
      </header>

      {/* =====================================================
          MAIN
      ===================================================== */}

      <div className="mx-auto max-w-6xl px-5 py-8 md:px-8 md:py-12">

        {/* Breadcrumb */}
        <div className="mb-8 flex items-center gap-2 text-xs font-semibold text-gray-400">
          <Link
            to="/events"
            className="transition hover:text-black"
          >
            Events
          </Link>

          <span>→</span>

          <span className="text-gray-700">
            Checkout
          </span>
        </div>

        {/* Heading */}
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-violet-600">
            Almost there
          </p>

          <h1 className="mt-2 text-4xl font-black tracking-tight md:text-5xl">
            Complete your booking
          </h1>

          <p className="mt-3 text-sm text-gray-500 md:text-base">
            Choose your tickets and review your order before payment.
          </p>
        </div>

        {/* =====================================================
            CHECKOUT GRID
        ===================================================== */}

        <div className="mt-10 grid gap-7 lg:grid-cols-[1fr_380px]">

          {/* =================================================
              LEFT
          ================================================= */}

          <div className="space-y-6">

            {/* Event Card */}
            <section className="overflow-hidden rounded-[28px] border border-gray-200 bg-white shadow-sm">

              <div className="relative h-52 overflow-hidden md:h-60">

                <img
                  src={event.image}
                  alt={event.title}
                  className="h-full w-full object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                <span className="absolute left-5 top-5 rounded-full bg-white/95 px-3.5 py-2 text-xs font-bold text-black">
                  {event.category}
                </span>

                <div className="absolute bottom-5 left-5 text-white">
                  <h2 className="text-2xl font-black md:text-3xl">
                    {event.title}
                  </h2>

                  <p className="mt-2 text-sm text-gray-200">
                    📍 {event.location}
                  </p>
                </div>

              </div>

              {/* Event Details */}
              <div className="grid gap-4 p-5 sm:grid-cols-2 md:p-6">

                <div className="rounded-2xl bg-gray-50 p-4">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                    Date
                  </p>

                  <p className="mt-1 text-sm font-bold">
                    📅 {event.date}
                  </p>
                </div>

                <div className="rounded-2xl bg-gray-50 p-4">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                    Time
                  </p>

                  <p className="mt-1 text-sm font-bold">
                    🕐 {event.time}
                  </p>
                </div>

              </div>

            </section>

            {/* Ticket Selection */}
            <section className="rounded-[28px] border border-gray-200 bg-white p-5 shadow-sm md:p-7">

              <div className="flex items-start justify-between gap-4">

                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400">
                    Tickets
                  </p>

                  <h2 className="mt-2 text-2xl font-black">
                    Select your tickets
                  </h2>

                  <p className="mt-1 text-sm text-gray-500">
                    General Admission
                  </p>
                </div>

                <span className="rounded-full bg-violet-50 px-3 py-1.5 text-xs font-bold text-violet-700">
                  Available
                </span>

              </div>

              {/* Ticket */}
              <div className="mt-7 rounded-2xl border border-gray-200 p-5">

                <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

                  <div>

                    <h3 className="font-black">
                      General Admission
                    </h3>

                    <p className="mt-1 text-sm text-gray-500">
                      Entry ticket
                    </p>

                    <p className="mt-3 text-xl font-black">
                      ₹{event.price}
                      <span className="ml-1 text-xs font-medium text-gray-400">
                        / person
                      </span>
                    </p>

                  </div>

                  {/* Quantity */}
                  <div className="flex items-center justify-between rounded-2xl bg-gray-100 p-1.5 sm:w-36">

                    <button
                      type="button"
                      disabled={quantity === 1}
                      onClick={() =>
                        setQuantity((prev) =>
                          Math.max(1, prev - 1)
                        )
                      }
                      className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-lg font-bold shadow-sm transition hover:bg-black hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      −
                    </button>

                    <span className="min-w-[30px] text-center text-sm font-black">
                      {quantity}
                    </span>

                    <button
                      type="button"
                      disabled={quantity === 6}
                      onClick={() =>
                        setQuantity((prev) =>
                          Math.min(6, prev + 1)
                        )
                      }
                      className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-lg font-bold shadow-sm transition hover:bg-black hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      +
                    </button>

                  </div>

                </div>

                <div className="mt-5 flex items-center gap-2 text-xs text-gray-400">
                  <span className="text-emerald-500">●</span>
                  Maximum 6 tickets per booking
                </div>

              </div>

            </section>

            {/* Trust */}
            <section className="grid gap-3 sm:grid-cols-3">

              <div className="rounded-2xl border border-gray-200 bg-white p-4">
                <p className="text-lg">🔒</p>
                <p className="mt-2 text-xs font-bold">
                  Secure Payment
                </p>
                <p className="mt-1 text-[11px] text-gray-400">
                  Your payment is protected
                </p>
              </div>

              <div className="rounded-2xl border border-gray-200 bg-white p-4">
                <p className="text-lg">🎟️</p>
                <p className="mt-2 text-xs font-bold">
                  Digital Ticket
                </p>
                <p className="mt-1 text-[11px] text-gray-400">
                  Instant ticket delivery
                </p>
              </div>

              <div className="rounded-2xl border border-gray-200 bg-white p-4">
                <p className="text-lg">✓</p>
                <p className="mt-2 text-xs font-bold">
                  Easy Entry
                </p>
                <p className="mt-1 text-[11px] text-gray-400">
                  Scan and enjoy
                </p>
              </div>

            </section>

          </div>

          {/* =================================================
              RIGHT — ORDER SUMMARY
          ================================================= */}

          <aside className="lg:sticky lg:top-6 lg:self-start">

            <section className="overflow-hidden rounded-[28px] border border-gray-200 bg-white shadow-[0_20px_50px_rgba(0,0,0,0.08)]">

              <div className="bg-[#09090b] p-6 text-white">

                <p className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500">
                  Your order
                </p>

                <h2 className="mt-2 text-2xl font-black">
                  Order Summary
                </h2>

              </div>

              <div className="p-6">

                {/* Ticket summary */}
                <div className="flex gap-4">

                  <img
                    src={event.image}
                    alt=""
                    className="h-16 w-16 rounded-xl object-cover"
                  />

                  <div className="min-w-0">
                    <h3 className="truncate text-sm font-black">
                      {event.title}
                    </h3>

                    <p className="mt-1 text-xs text-gray-500">
                      General Admission × {quantity}
                    </p>

                    <p className="mt-1 text-xs text-gray-400">
                      {event.date} • {event.time}
                    </p>
                  </div>

                </div>

                <div className="my-6 border-t border-dashed border-gray-200" />

                {/* Pricing */}
                <div className="space-y-4 text-sm">

                  <div className="flex justify-between text-gray-500">
                    <span>
                      Ticket × {quantity}
                    </span>

                    <span className="font-semibold text-gray-800">
                      ₹{ticketPrice}
                    </span>
                  </div>

                  <div className="flex justify-between text-gray-500">
                    <span>
                      Convenience Fee
                    </span>

                    <span className="font-semibold text-gray-800">
                      ₹{convenienceFee}
                    </span>
                  </div>

                </div>

                <div className="my-6 border-t border-gray-200" />

                {/* Total */}
                <div className="flex items-end justify-between">

                  <div>
                    <p className="text-xs font-medium text-gray-400">
                      Total payable
                    </p>

                    <p className="mt-1 text-3xl font-black tracking-tight">
                      ₹{total}
                    </p>
                  </div>

                  <span className="rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-600">
                    Secure
                  </span>

                </div>

                {/* Payment */}
                <Link
                  to="/payment-success"
                  className="group mt-7 flex w-full items-center justify-center rounded-2xl bg-[#09090b] py-4 text-sm font-black text-white transition duration-300 hover:-translate-y-0.5 hover:bg-violet-600 hover:shadow-lg"
                >
                  Proceed to Payment

                  <span className="ml-2 transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </Link>

                <p className="mt-4 text-center text-[11px] leading-5 text-gray-400">
                  By continuing, you agree to the booking terms
                  and cancellation policy.
                </p>

              </div>

            </section>

            {/* Back */}
            <Link
              to={`/events/${event.id}`}
              className="mt-4 flex items-center justify-center text-sm font-bold text-gray-500 transition hover:text-black"
            >
              ← Back to event
            </Link>

          </aside>

        </div>

      </div>

    </main>
  );
}

