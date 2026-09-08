
import { Link } from "react-router-dom";

export default function PaymentSuccess() {
  return (
    <main className="min-h-screen bg-[#f7f7f8] px-5 py-10 md:px-8 md:py-16">

      <div className="mx-auto max-w-2xl">

        {/* =====================================================
            SUCCESS HEADER
        ===================================================== */}

        <div className="text-center">

          <div className="relative mx-auto flex h-24 w-24 items-center justify-center">

            <div className="absolute inset-0 animate-ping rounded-full bg-emerald-100 opacity-60" />

            <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500 text-4xl font-black text-white shadow-xl shadow-emerald-500/20">
              ✓
            </div>

          </div>

          <p className="mt-7 text-xs font-black uppercase tracking-[0.3em] text-emerald-600">
            Booking confirmed
          </p>

          <h1 className="mt-2 text-4xl font-black tracking-tight md:text-5xl">
            You're going to the event! 🎉
          </h1>

          <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-gray-500 md:text-base">
            Your payment was successful and your digital ticket is ready.
            We've saved your booking to My Tickets.
          </p>

        </div>

        {/* =====================================================
            TICKET CARD
        ===================================================== */}

        <section className="relative mt-10 overflow-hidden rounded-[30px] border border-gray-200 bg-white shadow-[0_25px_70px_rgba(0,0,0,0.10)]">

          {/* Top */}
          <div className="bg-[#09090b] px-6 py-7 text-white md:px-8">

            <div className="flex items-start justify-between gap-5">

              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-gray-500">
                  PRAPT Ticket
                </p>

                <h2 className="mt-2 text-2xl font-black">
                  Music Fest 2026
                </h2>

                <p className="mt-1 text-sm text-gray-400">
                  General Admission
                </p>
              </div>

              <span className="rounded-full bg-emerald-500/10 px-3 py-1.5 text-xs font-bold text-emerald-400">
                Confirmed
              </span>

            </div>

          </div>

          {/* Ticket details */}
          <div className="p-6 md:p-8">

            <div className="grid gap-5 sm:grid-cols-2">

              <div className="rounded-2xl bg-gray-50 p-4">
                <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                  Date
                </p>

                <p className="mt-1 font-black">
                  20 Sep 2026
                </p>
              </div>

              <div className="rounded-2xl bg-gray-50 p-4">
                <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                  Time
                </p>

                <p className="mt-1 font-black">
                  6:00 PM
                </p>
              </div>

              <div className="rounded-2xl bg-gray-50 p-4">
                <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                  Location
                </p>

                <p className="mt-1 font-black">
                  Gurugram
                </p>
              </div>

              <div className="rounded-2xl bg-gray-50 p-4">
                <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                  Ticket
                </p>

                <p className="mt-1 font-black">
                  General Admission
                </p>
              </div>

            </div>

            {/* Divider */}
            <div className="my-7 flex items-center gap-3">

              <div className="h-px flex-1 border-t border-dashed border-gray-300" />

              <span className="text-xs font-bold text-gray-300">
                ✦
              </span>

              <div className="h-px flex-1 border-t border-dashed border-gray-300" />

            </div>

            {/* Booking ID */}
            <div className="flex flex-col gap-3 rounded-2xl border border-gray-200 p-4 sm:flex-row sm:items-center sm:justify-between">

              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                  Booking ID
                </p>

                <p className="mt-1 font-mono text-sm font-black">
                  PRAPT-00123
                </p>
              </div>

              <span className="rounded-lg bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-600">
                Payment successful
              </span>

            </div>

            {/* =================================================
                QR PLACEHOLDER
            ================================================= */}

            <div className="mt-6 rounded-2xl bg-gray-50 p-6 text-center">

              <div className="mx-auto flex h-32 w-32 items-center justify-center rounded-2xl border-2 border-dashed border-gray-300 bg-white">

                <div className="text-center">
                  <div className="text-3xl">▦</div>

                  <p className="mt-1 text-[9px] font-bold uppercase tracking-wider text-gray-400">
                    QR Ticket
                  </p>
                </div>

              </div>

              <p className="mt-4 text-xs font-semibold text-gray-500">
                Show this ticket at the venue entrance
              </p>

            </div>

          </div>

        </section>

        {/* =====================================================
            ACTIONS
        ===================================================== */}

        <div className="mt-7 grid gap-3 sm:grid-cols-2">

          <Link
            to="/tickets"
            className="flex items-center justify-center rounded-2xl bg-[#09090b] py-4 text-sm font-black text-white transition hover:-translate-y-0.5 hover:bg-violet-600 hover:shadow-lg"
          >
            View My Ticket →
          </Link>

          <Link
            to="/events"
            className="flex items-center justify-center rounded-2xl border border-gray-200 bg-white py-4 text-sm font-black transition hover:border-black"
          >
            Explore More Events
          </Link>

        </div>

        {/* =====================================================
            TRUST MESSAGE
        ===================================================== */}

        <div className="mt-7 text-center">

          <p className="text-xs text-gray-400">
            🔒 Your booking is secure and saved to your account.
          </p>

        </div>

      </div>

    </main>
  );
}

