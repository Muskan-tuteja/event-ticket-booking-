
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/public/Navbar";
import EventCard from "../../components/public/EventCard";
import { events } from "../../data/events";

export default function Events() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Categories");
  const [location, setLocation] = useState("All Locations");
  const [sort, setSort] = useState("Popular");

  const filteredEvents = useMemo(() => {
    let result = events.filter((event) => {
      const searchValue = search.trim().toLowerCase();

      const matchesSearch =
        !searchValue ||
        event.title.toLowerCase().includes(searchValue) ||
        event.category.toLowerCase().includes(searchValue) ||
        event.location.toLowerCase().includes(searchValue);

      const matchesCategory =
        category === "All Categories" ||
        event.category === category;

      const matchesLocation =
        location === "All Locations" ||
        event.location === location;

      return matchesSearch && matchesCategory && matchesLocation;
    });

    if (sort === "Price: Low to High") {
      result = [...result].sort((a, b) => a.price - b.price);
    }

    if (sort === "Price: High to Low") {
      result = [...result].sort((a, b) => b.price - a.price);
    }

    return result;
  }, [search, category, location, sort]);

  const clearFilters = () => {
    setSearch("");
    setCategory("All Categories");
    setLocation("All Locations");
    setSort("Popular");
  };

  const hasFilters =
    search.trim() ||
    category !== "All Categories" ||
    location !== "All Locations" ||
    sort !== "Popular";

  const categories = [
    "All",
    "Music",
    "Technology",
    "Comedy",
    "Arts",
  ];

  return (
    <div className="min-h-screen bg-[#f7f7f8] text-[#111827]">

      <Navbar />

      {/* =========================================================
          HERO
      ========================================================= */}

      <section className="relative overflow-hidden bg-[#09090b] text-white">

        {/* Glow */}
        <div className="absolute -right-32 -top-32 h-[420px] w-[420px] rounded-full bg-violet-600/20 blur-[110px]" />

        <div className="absolute -bottom-40 left-1/4 h-[350px] w-[350px] rounded-full bg-blue-500/10 blur-[100px]" />

        {/* Grid */}
        <div className="absolute inset-0 opacity-[0.04] [background-image:linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] [background-size:60px_60px]" />

        <div className="relative mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-20">

          <div className="max-w-3xl">

            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-xs font-bold text-gray-300 backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              {events.length}+ experiences to explore
            </div>

            <h1 className="mt-7 text-5xl font-black tracking-[-0.04em] md:text-7xl">
              Find your next
              <br />
              <span className="text-gray-500">
                unforgettable experience.
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-7 text-gray-400 md:text-lg">
              Discover concerts, comedy shows, conferences and
              experiences happening around you.
            </p>

          </div>
        </div>
      </section>

      {/* =========================================================
          FILTER PANEL
      ========================================================= */}

      <section className="relative mx-auto max-w-7xl px-5 md:px-8">

        <div className="-mt-7 rounded-[28px] border border-gray-200 bg-white p-3 shadow-[0_20px_60px_rgba(0,0,0,0.10)]">

          <div className="grid gap-2 lg:grid-cols-[2fr_1fr_1fr_1fr_auto]">

            {/* Search */}
            <div className="relative">

              <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-lg text-gray-400">
                ⌕
              </span>

              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search events, artists, experiences..."
                className="h-14 w-full rounded-2xl bg-gray-100 pl-11 pr-4 text-sm font-medium outline-none transition placeholder:text-gray-400 focus:bg-white focus:ring-2 focus:ring-black"
              />

              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-gray-400 hover:text-black"
                >
                  ✕
                </button>
              )}

            </div>

            {/* Category */}
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="h-14 rounded-2xl bg-gray-100 px-4 text-sm font-medium outline-none transition focus:bg-white focus:ring-2 focus:ring-black"
            >
              <option>All Categories</option>
              <option>Music</option>
              <option>Technology</option>
              <option>Comedy</option>
              <option>Arts</option>
            </select>

            {/* Location */}
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="h-14 rounded-2xl bg-gray-100 px-4 text-sm font-medium outline-none transition focus:bg-white focus:ring-2 focus:ring-black"
            >
              <option>All Locations</option>
              <option>Delhi</option>
              <option>Gurugram</option>
              <option>Noida</option>
            </select>

            {/* Sort */}
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="h-14 rounded-2xl bg-gray-100 px-4 text-sm font-medium outline-none transition focus:bg-white focus:ring-2 focus:ring-black"
            >
              <option>Popular</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
            </select>

            {/* Search */}
            <button
              type="button"
              className="h-14 rounded-2xl bg-[#09090b] px-7 text-sm font-bold text-white transition hover:bg-violet-600 active:scale-[0.98]"
            >
              Search
            </button>

          </div>

        </div>
      </section>

      {/* =========================================================
          CONTENT
      ========================================================= */}

      <main className="mx-auto max-w-7xl px-5 py-14 md:px-8">

        {/* Heading */}
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">

          <div>

            <p className="text-xs font-bold uppercase tracking-[0.25em] text-violet-600">
              Explore
            </p>

            <h2 className="mt-2 text-3xl font-black tracking-tight md:text-4xl">
              Upcoming Events
            </h2>

            <div className="mt-3 flex flex-wrap items-center gap-2 text-sm text-gray-500">

              <span>
                {filteredEvents.length}{" "}
                {filteredEvents.length === 1 ? "event" : "events"} found
              </span>

              {search && (
                <>
                  <span>•</span>
                  <span>
                    Results for "{search}"
                  </span>
                </>
              )}

            </div>

          </div>

          {hasFilters && (
            <button
              onClick={clearFilters}
              className="flex w-fit items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-bold transition hover:border-black"
            >
              Clear filters
              <span className="text-gray-400">✕</span>
            </button>
          )}

        </div>

        {/* =====================================================
            CATEGORY CHIPS
        ===================================================== */}

        <div className="mt-9 flex gap-2 overflow-x-auto pb-2">

          {categories.map((item) => {

            const active =
              (item === "All" &&
                category === "All Categories") ||
              item === category;

            return (
              <button
                key={item}
                onClick={() =>
                  setCategory(
                    item === "All"
                      ? "All Categories"
                      : item
                  )
                }
                className={`whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-bold transition duration-200 ${
                  active
                    ? "bg-[#09090b] text-white shadow-md"
                    : "border border-gray-200 bg-white text-gray-600 hover:border-gray-400 hover:text-black"
                }`}
              >
                {item === "All" ? "✦ All Events" : item}
              </button>
            );
          })}

        </div>

        {/* Active Filters */}
        {hasFilters && (
          <div className="mt-5 flex flex-wrap gap-2">

            {search && (
              <span className="rounded-full bg-violet-50 px-3 py-1.5 text-xs font-bold text-violet-700">
                Search: {search}
              </span>
            )}

            {category !== "All Categories" && (
              <span className="rounded-full bg-gray-100 px-3 py-1.5 text-xs font-bold text-gray-700">
                {category}
              </span>
            )}

            {location !== "All Locations" && (
              <span className="rounded-full bg-gray-100 px-3 py-1.5 text-xs font-bold text-gray-700">
                📍 {location}
              </span>
            )}

            {sort !== "Popular" && (
              <span className="rounded-full bg-gray-100 px-3 py-1.5 text-xs font-bold text-gray-700">
                ↕ {sort}
              </span>
            )}

          </div>
        )}

        {/* =====================================================
            EVENTS
        ===================================================== */}

        {filteredEvents.length > 0 ? (

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

            {filteredEvents.map((event) => (
              <div
                key={event.id}
                className="group transition duration-300 hover:-translate-y-1"
              >
                <EventCard event={event} />
              </div>
            ))}

          </div>

        ) : (

          /* =====================================================
             EMPTY STATE
          ===================================================== */

          <div className="mt-10 overflow-hidden rounded-[30px] border border-gray-200 bg-white">

            <div className="flex flex-col items-center px-6 py-20 text-center">

              <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-gray-100 text-3xl">
                ⌕
              </div>

              <h3 className="mt-6 text-2xl font-black">
                No events found
              </h3>

              <p className="mt-2 max-w-md text-sm leading-6 text-gray-500">
                We couldn't find anything matching your current
                search and filters. Try exploring another category
                or location.
              </p>

              <button
                onClick={clearFilters}
                className="mt-7 rounded-xl bg-black px-6 py-3 text-sm font-bold text-white transition hover:bg-violet-600"
              >
                Clear all filters
              </button>

            </div>

          </div>

        )}

      </main>

      {/* =========================================================
          ORGANIZER CTA
      ========================================================= */}

      <section className="mx-auto max-w-7xl px-5 pb-16 md:px-8">

        <div className="relative overflow-hidden rounded-[32px] bg-[#09090b] px-7 py-12 text-white md:px-14 md:py-14">

          <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-violet-600/20 blur-[100px]" />

          <div className="relative flex flex-col justify-between gap-9 md:flex-row md:items-center">

            <div className="max-w-2xl">

              <p className="text-xs font-bold uppercase tracking-[0.25em] text-violet-400">
                For organizers
              </p>

              <h2 className="mt-3 text-3xl font-black tracking-tight md:text-4xl">
                Have an event to share?
              </h2>

              <p className="mt-4 max-w-xl text-sm leading-7 text-gray-400 md:text-base">
                Create your event, sell tickets and manage your
                attendees with PRAPT.
              </p>

            </div>

            <Link
              to="/organizer"
              className="group flex w-fit items-center rounded-xl bg-white px-6 py-3.5 text-sm font-black text-black transition hover:-translate-y-0.5 hover:bg-gray-200"
            >
              Create an Event

              <span className="ml-2 transition group-hover:translate-x-1">
                →
              </span>
            </Link>

          </div>

        </div>

      </section>

    </div>
  );
}

