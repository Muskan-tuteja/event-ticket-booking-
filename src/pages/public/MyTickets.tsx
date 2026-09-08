
export default function MyTickets() {
  return (
    <main className="min-h-screen bg-[#f7f7f8] px-5 py-10 md:px-8 md:py-14">
      <div className="mx-auto max-w-5xl">

        {/* Header */}
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-violet-600">
              Your bookings
            </p>

            <h1 className="mt-2 text-4xl font-black tracking-tight md:text-5xl">
              My Tickets
            </h1>

            <p className="mt-3 text-gray-500">
              Your upcoming events and digital tickets.
            </p>
          </div>

          <span className="w-fit rounded-full bg-white px-4 py-2 text-sm font-bold text-gray-600 shadow-sm ring-1 ring-gray-200">
            1 Upcoming Event
          </span>
        </div>

        {/* Ticket */}
        <div className="relative mt-10 overflow-hidden rounded-[32px] bg-white shadow-[0_20px_60px_rgba(0,0,0,0.08)] ring-1 ring-gray-200">

          {/* Top Event Banner */}
          <div className="relative h-52 overflow-hidden bg-[#09090b] md:h-60">

            <img
              src="https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1400&q=85"
              alt="Music Fest 2026"
              className="h-full w-full object-cover opacity-70"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

            {/* Event category */}
            <span className="absolute left-5 top-5 rounded-full bg-white/95 px-4 py-2 text-xs font-bold text-black backdrop-blur md:left-7 md:top-7">
              MUSIC
            </span>

            {/* Status */}
            <span className="absolute right-5 top-5 flex items-center gap-2 rounded-full bg-emerald-500/90 px-4 py-2 text-xs font-bold text-white backdrop-blur md:right-7 md:top-7">
              <span className="h-2 w-2 rounded-full bg-white" />
              Confirmed
            </span>

            {/* Event title */}
            <div className="absolute bottom-6 left-5 text-white md:bottom-7 md:left-7">
              <p className="text-xs font-medium text-gray-300">
                Your upcoming experience
              </p>

              <h2 className="mt-1 text-3xl font-black tracking-tight md:text-4xl">
                Music Fest 2026
              </h2>
            </div>
          </div>

          {/* Main ticket body */}
          <div className="grid md:grid-cols-[1fr_280px]">

            {/* Information */}
            <div className="p-6 md:p-8">

              {/* Event info */}
              <div className="grid gap-5 sm:grid-cols-2">

                <div className="flex gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-lg">
                    📅
                  </div>

                  <div>
                    <p className="text-xs font-medium text-gray-400">
                      Date & Time
                    </p>

                    <p className="mt-1 text-sm font-bold">
                      20 Sep 2026
                    </p>

                    <p className="mt-0.5 text-sm text-gray-500">
                      6:00 PM
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-lg">
                    📍
                  </div>

                  <div>
                    <p className="text-xs font-medium text-gray-400">
                      Location
                    </p>

                    <p className="mt-1 text-sm font-bold">
                      Gurugram
                    </p>

                    <p className="mt-0.5 text-sm text-gray-500">
                      Event venue
                    </p>
                  </div>
                </div>

              </div>

              {/* Dashed separator */}
              <div className="my-7 border-t border-dashed border-gray-200" />

              {/* Ticket details */}
              <div className="grid gap-5 sm:grid-cols-2">

                <div>
                  <p className="text-xs font-medium text-gray-400">
                    Ticket Type
                  </p>

                  <p className="mt-1 text-sm font-bold">
                    General Admission
                  </p>
                </div>

                <div>
                  <p className="text-xs font-medium text-gray-400">
                    Ticket ID
                  </p>

                  <p className="mt-1 font-mono text-sm font-bold">
                    PRAPT-00123
                  </p>
                </div>

              </div>

              {/* Price */}
              <div className="mt-7 rounded-2xl bg-gray-50 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-400">
                      Total Paid
                    </p>

                    <p className="mt-1 text-xl font-black">
                      ₹499
                    </p>
                  </div>

                  <div className="rounded-xl bg-emerald-50 px-3 py-2 text-xs font-bold text-emerald-600">
                    Payment Successful
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-6 flex flex-wrap gap-3">
                <button className="rounded-xl bg-black px-5 py-3 text-sm font-bold text-white transition hover:bg-violet-600">
                  Download Ticket
                </button>

                <button className="rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm font-bold text-gray-700 transition hover:border-black">
                  Share Ticket
                </button>
              </div>
            </div>

            {/* QR Section */}
            <div className="relative flex flex-col items-center justify-center border-t border-dashed border-gray-200 bg-gray-50 p-7 md:border-l md:border-t-0">

              {/* Notches */}
              <div className="absolute -left-3 -top-3 hidden h-6 w-6 rounded-full bg-[#f7f7f8] md:block" />
              <div className="absolute -bottom-3 -left-3 hidden h-6 w-6 rounded-full bg-[#f7f7f8] md:block" />

              <div className="text-center">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400">
                  Scan to enter
                </p>

                {/* QR Placeholder */}
                <div className="mx-auto mt-5 flex h-44 w-44 items-center justify-center rounded-2xl border border-gray-200 bg-white p-3 shadow-sm">
                  <div className="flex h-full w-full items-center justify-center border-4 border-dashed border-gray-300">
                    <div className="text-center">
                      <p className="text-2xl font-black text-gray-800">
                        QR
                      </p>

                      <p className="mt-1 text-[9px] font-bold uppercase tracking-widest text-gray-400">
                        PRAPT
                      </p>
                    </div>
                  </div>
                </div>

                <p className="mt-4 text-xs text-gray-400">
                  Show this QR code at the entrance
                </p>

                <p className="mt-2 font-mono text-xs font-bold text-gray-700">
                  PRAPT-00123
                </p>
              </div>
            </div>

          </div>

          {/* Bottom strip */}
          <div className="border-t border-gray-100 bg-gray-950 px-6 py-4 text-center text-xs font-medium text-gray-400">
            Please carry your digital ticket for a smooth entry experience.
          </div>

        </div>

        {/* Empty / help section */}
        <div className="mt-8 flex flex-col items-center justify-between gap-4 rounded-2xl border border-gray-200 bg-white p-5 text-center sm:flex-row sm:text-left">
          <div>
            <p className="text-sm font-bold">
              Need help with your booking?
            </p>

            <p className="mt-1 text-xs text-gray-500">
              Contact support if you have any questions about your ticket.
            </p>
          </div>

          <button className="rounded-xl border border-gray-200 px-4 py-2.5 text-xs font-bold transition hover:border-black">
            Contact Support
          </button>
        </div>

      </div>
    </main>
  );
}

