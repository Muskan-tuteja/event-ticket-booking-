
import { Link, useParams } from "react-router-dom";
import { events } from "../../data/events";

export default function EventDetails() {
  const { id } = useParams();

  const event = events.find(
    (item) => item.id === Number(id)
  );

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

          <p className="mt-2 text-sm text-gray-500">
            This event may have been removed or is no longer available.
          </p>

          <Link
            to="/events"
            className="mt-6 inline-flex rounded-xl bg-black px-6 py-3 text-sm font-bold text-white transition hover:bg-violet-600"
          >
            Browse Events →
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f7f7f8] text-[#111827]">

      {/* =====================================================
          HERO IMAGE
      ===================================================== */}

      <section className="relative overflow-hidden bg-[#09090b]">

        <div className="mx-auto max-w-7xl px-5 py-5 md:px-8 md:py-7">

          {/* Back */}
          <Link
            to="/events"
            className="mb-5 inline-flex items-center gap-2 text-sm font-semibold text-gray-400 transition hover:text-white"
          >
            ← Back to events
          </Link>

          <div className="relative h-[430px] overflow-hidden rounded-[32px] md:h-[560px]">

            <img
              src={event.image}
              alt={event.title}
              className="h-full w-full object-cover"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

            {/* Category */}
            <span className="absolute left-5 top-5 rounded-full bg-white/95 px-4 py-2 text-xs font-black uppercase tracking-wider text-black shadow-lg backdrop-blur md:left-7 md:top-7">
              {event.category}
            </span>

            {/* Favorite */}
            <button
              type="button"
              aria-label="Add event to favorites"
              className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full bg-black/30 text-xl text-white backdrop-blur transition hover:bg-white hover:text-black md:right-7 md:top-7"
            >
              ♡
            </button>

            {/* Hero Content */}
            <div className="absolute bottom-6 left-5 right-5 text-white md:bottom-9 md:left-9 md:right-9">

              <p className="text-xs font-bold uppercase tracking-[0.25em] text-violet-300">
                {event.category} experience
              </p>

              <h1 className="mt-3 max-w-4xl text-4xl font-black leading-[1.05] tracking-tight md:text-6xl">
                {event.title}
              </h1>

              <div className="mt-5 flex flex-wrap gap-3">

                <span className="rounded-full bg-white/10 px-4 py-2 text-sm font-semibold backdrop-blur">
                  📍 {event.location}
                </span>

                <span className="rounded-full bg-white/10 px-4 py-2 text-sm font-semibold backdrop-blur">
                  📅 {event.date}
                </span>

                <span className="rounded-full bg-white/10 px-4 py-2 text-sm font-semibold backdrop-blur">
                  ⏰ {event.time}
                </span>

              </div>

            </div>

          </div>
        </div>
      </section>

      {/* =====================================================
          CONTENT
      ===================================================== */}

      <div className="mx-auto max-w-7xl px-5 py-10 md:px-8 md:py-14">

        <div className="grid gap-8 lg:grid-cols-[1fr_390px]">

          {/* =================================================
              LEFT CONTENT
          ================================================= */}

          <div className="space-y-7">

            {/* About */}
            <section className="rounded-[28px] border border-gray-200 bg-white p-6 shadow-sm md:p-8">

              <p className="text-xs font-bold uppercase tracking-[0.25em] text-violet-600">
                About the event
              </p>

              <h2 className="mt-3 text-2xl font-black md:text-3xl">
                Experience something special
              </h2>

              <p className="mt-5 text-sm leading-7 text-gray-600 md:text-base">
                {event.description}
              </p>

            </section>

            {/* Event Details */}
            <section className="rounded-[28px] border border-gray-200 bg-white p-6 shadow-sm md:p-8">

              <p className="text-xs font-bold uppercase tracking-[0.25em] text-gray-400">
                Event information
              </p>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">

                <div className="rounded-2xl bg-gray-50 p-5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-sm">
                    📅
                  </div>

                  <p className="mt-4 text-xs font-bold uppercase tracking-wider text-gray-400">
                    Date
                  </p>

                  <p className="mt-1 font-black">
                    {event.date}
                  </p>
                </div>

                <div className="rounded-2xl bg-gray-50 p-5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-sm">
                    ⏰
                  </div>

                  <p className="mt-4 text-xs font-bold uppercase tracking-wider text-gray-400">
                    Time
                  </p>

                  <p className="mt-1 font-black">
                    {event.time}
                  </p>
                </div>

                <div className="rounded-2xl bg-gray-50 p-5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-sm">
                    📍
                  </div>

                  <p className="mt-4 text-xs font-bold uppercase tracking-wider text-gray-400">
                    Location
                  </p>

                  <p className="mt-1 font-black">
                    {event.location}
                  </p>
                </div>

                <div className="rounded-2xl bg-gray-50 p-5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-sm">
                    🎟️
                  </div>

                  <p className="mt-4 text-xs font-bold uppercase tracking-wider text-gray-400">
                    Ticket
                  </p>

                  <p className="mt-1 font-black">
                    General Admission
                  </p>
                </div>

              </div>

            </section>

            {/* Why PRAPT */}
            <section className="rounded-[28px] bg-[#09090b] p-6 text-white md:p-8">

              <p className="text-xs font-bold uppercase tracking-[0.25em] text-violet-400">
                Book with PRAPT
              </p>

              <h2 className="mt-3 text-2xl font-black">
                Everything you need for a great experience.
              </h2>

              <div className="mt-7 grid gap-5 sm:grid-cols-3">

                <div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">
                    🔒
                  </div>

                  <h3 className="mt-3 text-sm font-bold">
                    Secure booking
                  </h3>

                  <p className="mt-1 text-xs leading-5 text-gray-500">
                    Safe and secure ticket purchase.
                  </p>
                </div>

                <div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">
                    ⚡
                  </div>

                  <h3 className="mt-3 text-sm font-bold">
                    Instant confirmation
                  </h3>

                  <p className="mt-1 text-xs leading-5 text-gray-500">
                    Get your digital ticket instantly.
                  </p>
                </div>

                <div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">
                    🎟️
                  </div>

                  <h3 className="mt-3 text-sm font-bold">
                    Easy entry
                  </h3>

                  <p className="mt-1 text-xs leading-5 text-gray-500">
                    Simply scan your QR at the venue.
                  </p>
                </div>

              </div>

            </section>

          </div>

          {/* =================================================
              BOOKING CARD
          ================================================= */}

          <aside className="lg:sticky lg:top-6 lg:self-start">

            <div className="overflow-hidden rounded-[28px] border border-gray-200 bg-white shadow-[0_20px_60px_rgba(0,0,0,0.10)]">

              {/* Price header */}
              <div className="bg-[#09090b] p-6 text-white">

                <p className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500">
                  Tickets
                </p>

                <div className="mt-3 flex items-end justify-between">

                  <div>
                    <p className="text-xs text-gray-500">
                      Starting from
                    </p>

                    <p className="mt-1 text-4xl font-black">
                      ₹{event.price}
                    </p>
                  </div>

                  <span className="rounded-full bg-emerald-500/10 px-3 py-1.5 text-xs font-bold text-emerald-400">
                    Available
                  </span>

                </div>

              </div>

              <div className="p-6">

                {/* Quick details */}
                <div className="space-y-4">

                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100">
                      📅
                    </div>

                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                        Date
                      </p>

                      <p className="text-sm font-bold">
                        {event.date}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100">
                      ⏰
                    </div>

                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                        Time
                      </p>

                      <p className="text-sm font-bold">
                        {event.time}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100">
                      📍
                    </div>

                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                        Location
                      </p>

                      <p className="text-sm font-bold">
                        {event.location}
                      </p>
                    </div>
                  </div>

                </div>

                <div className="my-6 border-t border-dashed border-gray-200" />

                {/* CTA */}
                <Link
                  to={`/checkout/${event.id}`}
                  className="group flex w-full items-center justify-center rounded-2xl bg-[#09090b] py-4 text-sm font-black text-white transition duration-300 hover:-translate-y-0.5 hover:bg-violet-600 hover:shadow-lg"
                >
                  Book Tickets

                  <span className="ml-2 transition-transform duration-200 group-hover:translate-x-1">
                    →
                  </span>
                </Link>

                <p className="mt-4 text-center text-[11px] leading-5 text-gray-400">
                  Secure checkout • Digital ticket • Instant confirmation
                </p>

              </div>

            </div>

          </aside>

        </div>

      </div>

      {/* =====================================================
          MOBILE STICKY CTA
      ===================================================== */}

      <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-gray-200 bg-white/95 p-3 backdrop-blur lg:hidden">

        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">

          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
              From
            </p>

            <p className="text-xl font-black">
              ₹{event.price}
            </p>
          </div>

          <Link
            to={`/checkout/${event.id}`}
            className="flex flex-1 items-center justify-center rounded-xl bg-black py-3.5 text-sm font-bold text-white"
          >
            Book Tickets →
          </Link>

        </div>

      </div>

    </main>
  );
}

