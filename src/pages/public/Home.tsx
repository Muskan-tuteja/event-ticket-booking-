import { Link } from "react-router-dom";
import Navbar from "../../components/public/Navbar";

const categories = [
  {
    name: "Music",
    count: "120+ Events",
    icon: "♪",
    description: "Concerts & live shows",
  },
  {
    name: "Technology",
    count: "80+ Events",
    icon: "</>",
    description: "Tech & innovation",
  },
  {
    name: "Comedy",
    count: "45+ Events",
    icon: "☺",
    description: "Laugh & have fun",
  },
  {
    name: "Arts & Culture",
    count: "60+ Events",
    icon: "✦",
    description: "Art & experiences",
  },
];

const locations = [
  {
    name: "Delhi",
    events: "240 Events",
    tag: "Capital vibes",
  },
  {
    name: "Gurugram",
    events: "180 Events",
    tag: "Urban experiences",
  },
  {
    name: "Noida",
    events: "120 Events",
    tag: "Something happening",
  },
  {
    name: "Mumbai",
    events: "320 Events",
    tag: "City that never sleeps",
  },
];

const events = [
  {
    id: 1,
    title: "Music Fest 2026",
    category: "Music",
    location: "Gurugram",
    date: "20 Sep 2026",
    time: "6:00 PM",
    price: 499,
    image:
      "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: 2,
    title: "Tech Summit 2026",
    category: "Technology",
    location: "Noida",
    date: "25 Sep 2026",
    time: "10:00 AM",
    price: 799,
    image:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: 3,
    title: "Comedy Night",
    category: "Comedy",
    location: "Delhi",
    date: "28 Sep 2026",
    time: "7:30 PM",
    price: 399,
    image:
      "https://images.unsplash.com/photo-1527224538127-2104bb71c51b?auto=format&fit=crop&w=1200&q=85",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-gray-950">
      <Navbar />

      {/* =========================================================
          HERO
      ========================================================= */}

      <section className="relative overflow-hidden bg-[#09090b] text-white">
        {/* Background effects */}
        <div className="absolute -right-32 -top-32 h-[500px] w-[500px] rounded-full bg-violet-600/20 blur-[120px]" />
        <div className="absolute -bottom-40 left-1/4 h-[400px] w-[400px] rounded-full bg-blue-500/10 blur-[100px]" />

        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.04] [background-image:linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] [background-size:60px_60px]" />

        <div className="relative mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24 lg:py-28">
          {/* Top badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.07] px-4 py-2 text-xs font-semibold text-gray-300 backdrop-blur-xl">
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
            Discover experiences worth remembering
          </div>

          {/* Heading */}
          <div className="mt-7 max-w-5xl">
            <h1 className="text-5xl font-black leading-[0.98] tracking-[-0.04em] sm:text-6xl md:text-7xl lg:text-[92px]">
              Discover events.
              <br />
              <span className="bg-gradient-to-r from-gray-400 via-gray-300 to-gray-500 bg-clip-text text-transparent">
                Create memories.
              </span>
            </h1>

            <p className="mt-7 max-w-2xl text-base leading-7 text-gray-400 md:text-lg">
              Find concerts, conferences, workshops, comedy shows and
              unforgettable experiences happening around you.
            </p>
          </div>

          {/* CTA */}
          <div className="mt-9 flex flex-wrap gap-3">
            <Link
              to="/events"
              className="group rounded-xl bg-white px-6 py-3.5 text-sm font-bold text-black transition duration-300 hover:-translate-y-0.5 hover:bg-gray-200"
            >
              Explore Events
              <span className="ml-2 transition group-hover:translate-x-1 inline-block">
                →
              </span>
            </Link>

            <Link
              to="/organizer"
              className="rounded-xl border border-white/15 bg-white/[0.05] px-6 py-3.5 text-sm font-bold text-white backdrop-blur transition duration-300 hover:-translate-y-0.5 hover:bg-white/10"
            >
              Become an Organizer
            </Link>
          </div>

          {/* =====================================================
              SEARCH BOX
          ===================================================== */}

          <div className="mt-16 rounded-[28px] border border-white/10 bg-white p-2 shadow-[0_25px_80px_rgba(0,0,0,0.4)] md:mt-20">
            <div className="grid gap-2 md:grid-cols-[1.6fr_1fr_1fr_1fr_auto]">
              {/* Search */}
              <div className="group flex items-center gap-3 rounded-2xl bg-gray-100 px-5 py-4 transition focus-within:bg-gray-50">
                <span className="text-xl text-gray-400">⌕</span>

                <input
                  type="text"
                  placeholder="Search events, artists..."
                  className="w-full bg-transparent text-sm font-medium text-gray-900 outline-none placeholder:text-gray-400"
                />
              </div>

              {/* Category */}
              <div className="relative">
                <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm text-gray-400">
                  ✦
                </span>

                <select className="h-full w-full appearance-none rounded-2xl bg-gray-100 px-10 py-4 text-sm font-medium text-gray-700 outline-none transition hover:bg-gray-50">
                  <option>All Categories</option>
                  <option>Music</option>
                  <option>Technology</option>
                  <option>Comedy</option>
                  <option>Arts & Culture</option>
                </select>
              </div>

              {/* Location */}
              <div className="relative">
                <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm text-gray-400">
                  ⌖
                </span>

                <select className="h-full w-full appearance-none rounded-2xl bg-gray-100 px-10 py-4 text-sm font-medium text-gray-700 outline-none transition hover:bg-gray-50">
                  <option>All Locations</option>
                  <option>Delhi</option>
                  <option>Gurugram</option>
                  <option>Noida</option>
                  <option>Mumbai</option>
                </select>
              </div>

              {/* Date */}
              <div className="relative">
                <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm text-gray-400">
                  ◷
                </span>

                <select className="h-full w-full appearance-none rounded-2xl bg-gray-100 px-10 py-4 text-sm font-medium text-gray-700 outline-none transition hover:bg-gray-50">
                  <option>Any Date</option>
                  <option>This Weekend</option>
                  <option>This Week</option>
                  <option>This Month</option>
                </select>
              </div>

              <Link
                to="/events"
                className="flex items-center justify-center rounded-2xl bg-black px-8 py-4 text-sm font-bold text-white transition duration-300 hover:bg-gray-800"
              >
                Search
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          TRUST FEATURES
      ========================================================= */}

      <section className="border-b border-gray-100 bg-white">
        <div className="mx-auto grid max-w-7xl divide-y divide-gray-100 px-5 py-7 sm:grid-cols-4 sm:divide-x sm:divide-y-0 md:px-8">
          {[
            ["✓", "Easy Booking", "Book tickets in minutes"],
            ["QR", "Digital Tickets", "Instant QR ticket"],
            ["$", "Secure Payments", "Safe checkout"],
            ["24", "24/7 Support", "We're here to help"],
          ].map(([icon, title, text]) => (
            <div
              key={title}
              className="flex items-center gap-4 px-4 py-4"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-xs font-black">
                {icon}
              </div>

              <div>
                <p className="text-sm font-bold">{title}</p>
                <p className="mt-0.5 text-xs text-gray-500">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================
          CATEGORIES
      ========================================================= */}

      <section className="mx-auto max-w-7xl px-5 py-20 md:px-8 lg:py-24">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-violet-500">
              Explore
            </p>

            <h2 className="mt-2 text-3xl font-black tracking-tight md:text-4xl">
              Browse by category
            </h2>

            <p className="mt-3 text-gray-500">
              Find something that matches your vibe.
            </p>
          </div>

          <Link
            to="/events"
            className="w-fit text-sm font-bold underline underline-offset-4"
          >
            View all events →
          </Link>
        </div>

        <div className="mt-9 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <Link
              key={category.name}
              to="/events"
              className="group relative overflow-hidden rounded-3xl border border-gray-200 bg-white p-6 transition duration-300 hover:-translate-y-1.5 hover:border-gray-300 hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)]"
            >
              <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-violet-50 transition duration-500 group-hover:scale-150" />

              <div className="relative">
                <div className="flex items-center justify-between">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-950 text-lg font-black text-white transition duration-300 group-hover:rotate-3 group-hover:bg-violet-600">
                    {category.icon}
                  </div>

                  <span className="text-gray-300 transition duration-300 group-hover:translate-x-1 group-hover:text-black">
                    →
                  </span>
                </div>

                <h3 className="mt-7 text-lg font-black">
                  {category.name}
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  {category.description}
                </p>

                <p className="mt-4 text-xs font-bold uppercase tracking-wider text-gray-400">
                  {category.count}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* =========================================================
          FEATURED EVENTS
      ========================================================= */}

      <section className="bg-[#f7f7f8]">
        <div className="mx-auto max-w-7xl px-5 py-20 md:px-8 lg:py-24">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-violet-500">
                Don't miss out
              </p>

              <h2 className="mt-2 text-3xl font-black tracking-tight md:text-4xl">
                Featured events
              </h2>

              <p className="mt-3 text-gray-500">
                Handpicked experiences you might love.
              </p>
            </div>

            <Link
              to="/events"
              className="w-fit rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm font-bold transition hover:border-black"
            >
              Explore all
            </Link>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <article
                key={event.id}
                className="group overflow-hidden rounded-[28px] border border-gray-200 bg-white transition duration-300 hover:-translate-y-2 hover:shadow-[0_25px_60px_rgba(0,0,0,0.12)]"
              >
                {/* Image */}
                <div className="relative overflow-hidden">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="h-64 w-full object-cover transition duration-700 group-hover:scale-110"
                  />

                  {/* Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-70" />

                  {/* Category */}
                  <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3.5 py-1.5 text-xs font-bold backdrop-blur">
                    {event.category}
                  </span>

                  {/* Favorite */}
                  <button
                    aria-label="Add event to favorites"
                    className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/95 text-lg text-gray-700 backdrop-blur transition hover:scale-110 hover:bg-white"
                  >
                    ♡
                  </button>

                  {/* Date badge */}
                  <div className="absolute bottom-4 left-4 rounded-2xl bg-white px-3 py-2 text-center shadow-lg">
                    <p className="text-[10px] font-bold uppercase text-gray-400">
                      SEP
                    </p>
                    <p className="text-lg font-black leading-none">
                      {event.date.split(" ")[0]}
                    </p>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-black tracking-tight">
                    {event.title}
                  </h3>

                  <div className="mt-4 space-y-2.5">
                    <p className="flex items-center gap-2 text-sm text-gray-500">
                      <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gray-100 text-xs">
                        ◷
                      </span>
                      {event.date} · {event.time}
                    </p>

                    <p className="flex items-center gap-2 text-sm text-gray-500">
                      <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gray-100 text-xs">
                        ⌖
                      </span>
                      {event.location}
                    </p>
                  </div>

                  <div className="my-5 border-t border-gray-100" />

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-gray-400">
                        Starting from
                      </p>

                      <p className="mt-1 text-xl font-black">
                        ₹{event.price}
                      </p>
                    </div>

                    <Link
                      to={`/events/${event.id}`}
                      className="rounded-xl bg-black px-5 py-3 text-sm font-bold text-white transition duration-300 hover:bg-violet-600"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          LOCATIONS
      ========================================================= */}

      <section className="mx-auto max-w-7xl px-5 py-20 md:px-8 lg:py-24">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-violet-500">
            Find events
          </p>

          <h2 className="mt-2 text-3xl font-black tracking-tight md:text-4xl">
            Explore by location
          </h2>

          <p className="mt-3 text-gray-500">
            Discover what's happening in your city.
          </p>
        </div>

        <div className="mt-9 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {locations.map((location) => (
            <Link
              key={location.name}
              to="/events"
              className="group relative min-h-[210px] overflow-hidden rounded-3xl bg-[#09090b] p-7 text-white transition duration-300 hover:-translate-y-1.5 hover:shadow-2xl"
            >
              {/* Decorative circles */}
              <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-violet-500/10 transition duration-700 group-hover:scale-[2]" />

              <div className="absolute bottom-0 right-0 h-32 w-32 rounded-full bg-white/[0.02] blur-2xl" />

              <div className="relative flex h-full flex-col">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-sm backdrop-blur">
                  ⌖
                </span>

                <div className="mt-auto">
                  <p className="mb-1 text-xs font-medium text-gray-500">
                    {location.tag}
                  </p>

                  <h3 className="text-2xl font-black">
                    {location.name}
                  </h3>

                  <div className="mt-3 flex items-center justify-between">
                    <p className="text-sm text-gray-400">
                      {location.events}
                    </p>

                    <span className="transition duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* =========================================================
          ORGANIZER CTA
      ========================================================= */}

      <section className="px-5 pb-20 md:px-8 lg:pb-24">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[32px] bg-[#09090b] px-7 py-14 text-white md:px-14 md:py-16">
          {/* Glow */}
          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-violet-600/20 blur-[100px]" />

          <div className="relative flex flex-col justify-between gap-10 lg:flex-row lg:items-center">
            <div className="max-w-2xl">
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-violet-400">
                For organizers
              </p>

              <h2 className="mt-3 text-3xl font-black tracking-tight md:text-5xl">
                Turn your event into an experience.
              </h2>

              <p className="mt-5 leading-7 text-gray-400">
                Create events, manage tickets, track attendees and grow
                your audience with PRAPT.
              </p>

              <div className="mt-7 flex flex-wrap gap-3 text-xs font-semibold text-gray-400">
                <span className="rounded-full border border-white/10 px-3 py-2">
                  ✓ Easy event creation
                </span>
                <span className="rounded-full border border-white/10 px-3 py-2">
                  ✓ Ticket management
                </span>
                <span className="rounded-full border border-white/10 px-3 py-2">
                  ✓ Attendee analytics
                </span>
              </div>
            </div>

            <Link
              to="/organizer"
              className="group flex w-fit items-center rounded-xl bg-white px-7 py-4 text-sm font-black text-black transition duration-300 hover:-translate-y-1 hover:bg-gray-200"
            >
              Start Organizing
              <span className="ml-2 transition group-hover:translate-x-1">
                →
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================================
          FOOTER
      ========================================================= */}

      <footer className="border-t border-gray-100 bg-white">
        <div className="mx-auto max-w-7xl px-5 py-12 md:px-8">
          <div className="grid gap-10 md:grid-cols-4">
            {/* Brand */}
            <div className="md:col-span-2">
              <Link
                to="/"
                className="text-2xl font-black tracking-tight"
              >
                PRAPT<span className="text-violet-600">.</span>
              </Link>

              <p className="mt-3 max-w-sm text-sm leading-6 text-gray-500">
                Discover. Book. Experience.
                <br />
                Your place for unforgettable events and experiences.
              </p>
            </div>

            {/* Explore */}
            <div>
              <h3 className="text-sm font-bold">Explore</h3>

              <div className="mt-4 space-y-3 text-sm text-gray-500">
                <Link
                  to="/events"
                  className="block transition hover:text-black"
                >
                  All Events
                </Link>

                <Link
                  to="/events"
                  className="block transition hover:text-black"
                >
                  Categories
                </Link>

                <Link
                  to="/events"
                  className="block transition hover:text-black"
                >
                  Locations
                </Link>
              </div>
            </div>

            {/* Account */}
            <div>
              <h3 className="text-sm font-bold">Account</h3>

              <div className="mt-4 space-y-3 text-sm text-gray-500">
                <Link
                  to="/login"
                  className="block transition hover:text-black"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  className="block transition hover:text-black"
                >
                  Register
                </Link>

                <Link
                  to="/tickets"
                  className="block transition hover:text-black"
                >
                  My Tickets
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-col justify-between gap-3 border-t border-gray-100 pt-6 text-xs text-gray-400 sm:flex-row">
            <p>© 2026 PRAPT. All rights reserved.</p>

            <p>Discover. Book. Experience.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}