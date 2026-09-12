import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  CalendarDays,
  Check,
  ChevronDown,
  Filter,
  MapPin,
  Search,
  Sparkles,
  X,
} from "lucide-react";

import Navbar from "../../components/public/Navbar";
import EventCard from "../../components/public/EventCard";
import { events } from "../../data/events";
import heroVideo from "../../assests/hero/night_event_video.mp4";

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
        category === "All Categories" || event.category === category;

      const matchesLocation =
        location === "All Locations" || event.location === location;

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
    Boolean(search.trim()) ||
    category !== "All Categories" ||
    location !== "All Locations" ||
    sort !== "Popular";

  const categories = [
    { label: "All Events", value: "All Categories" },
    { label: "Music", value: "Music" },
    { label: "Technology", value: "Technology" },
    { label: "Comedy", value: "Comedy" },
    { label: "Arts", value: "Arts" },
  ];

  return (
    <div className="min-h-screen bg-[#f7f7f8] text-[#111827]">
      <Navbar />

      {/* =========================================================
    HERO — PREMIUM ANIMATED BACKGROUND
========================================================= */}
<section className="relative overflow-hidden bg-[#07070a] text-white">

  {/* =====================================================
      ANIMATED BACKGROUND
  ===================================================== */}
 {/* =====================================================
      BACKGROUND VIDEO
  ===================================================== */}
  <video
    className="absolute inset-0 h-full w-full object-cover"
    src={heroVideo}
    autoPlay
    muted
    loop
    playsInline
    preload="auto"
  />

  {/* =====================================================
      DARK OVERLAY
  ===================================================== */}
  <div className="absolute inset-0 bg-black/65" />

  {/* =====================================================
      LEFT DARK GRADIENT
  ===================================================== */}
  <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-black/20" />

  {/* =====================================================
      BOTTOM GRADIENT
  ===================================================== */}
  <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black/80 to-transparent" />
  {/* Purple animated glow */}
  <div
    className="
      pointer-events-none absolute
      -right-40 -top-40
      h-[520px] w-[520px]
      rounded-full
      bg-violet-600/20
      blur-[140px]
      animate-[pulse_5s_ease-in-out_infinite]
    "
  />

  {/* Blue animated glow */}
  <div
    className="
      pointer-events-none absolute
      -bottom-52 left-[15%]
      h-[500px] w-[500px]
      rounded-full
      bg-blue-600/15
      blur-[150px]
      animate-[pulse_7s_ease-in-out_infinite]
    "
  />

  {/* Pink glow */}
  <div
    className="
      pointer-events-none absolute
      left-[45%] top-[15%]
      h-[280px] w-[280px]
      rounded-full
      bg-fuchsia-500/10
      blur-[120px]
      animate-[pulse_6s_ease-in-out_infinite]
    "
  />

  {/* =====================================================
      MOVING LIGHT ORB
  ===================================================== */}

  <div
    className="
      pointer-events-none absolute
      left-[-120px] top-[30%]
      h-40 w-40
      rounded-full
      bg-violet-500/20
      blur-[80px]
      animate-[heroOrb_10s_linear_infinite]
    "
  />

  {/* =====================================================
      GRID
  ===================================================== */}

  <div
    className="
      pointer-events-none absolute inset-0
      opacity-[0.045]
      [background-image:linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)]
      [background-size:64px_64px]
    "
  />

  {/* =====================================================
      DIAGONAL LIGHT
  ===================================================== */}

  <div
    className="
      pointer-events-none absolute
      -left-[30%] top-[-80%]
      h-[220%] w-[25%]
      rotate-[25deg]
      bg-gradient-to-r
      from-transparent
      via-white/[0.035]
      to-transparent
      animate-[lightSweep_9s_ease-in-out_infinite]
    "
  />

  {/* =====================================================
      FLOATING PARTICLES
  ===================================================== */}

  <div className="pointer-events-none absolute inset-0 overflow-hidden">

    <span className="absolute left-[12%] top-[22%] h-1 w-1 rounded-full bg-violet-300/60 animate-ping" />

    <span
      className="absolute left-[30%] top-[65%] h-1.5 w-1.5 rounded-full bg-blue-300/50 animate-pulse"
      style={{ animationDelay: "800ms" }}
    />

    <span
      className="absolute left-[58%] top-[25%] h-1 w-1 rounded-full bg-white/40 animate-ping"
      style={{ animationDelay: "1200ms" }}
    />

    <span
      className="absolute right-[18%] top-[45%] h-1.5 w-1.5 rounded-full bg-violet-300/50 animate-pulse"
      style={{ animationDelay: "1600ms" }}
    />

    <span
      className="absolute right-[30%] bottom-[20%] h-1 w-1 rounded-full bg-blue-300/50 animate-ping"
      style={{ animationDelay: "2000ms" }}
    />

  </div>


  {/* =====================================================
      CONTENT
  ===================================================== */}

  <div className="relative z-10 mx-auto max-w-7xl px-5 pb-24 pt-14 md:px-8 md:pb-28 md:pt-20">

    <div className="max-w-4xl">

      {/* Badge */}
      <div
        className="
          inline-flex items-center gap-2
          rounded-full
          border border-white/10
          bg-white/[0.06]
          px-4 py-2
          text-xs font-bold
          text-gray-300
          backdrop-blur-xl
          transition-all duration-500
          hover:border-violet-400/30
          hover:bg-violet-500/10
          hover:text-white
        "
      >
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
        </span>

        {events.length}+ experiences to explore
      </div>


      {/* Heading */}
      <h1
        className="
          mt-7
          max-w-4xl
          text-5xl
          font-black
          leading-[0.98]
          tracking-[-0.055em]
          sm:text-6xl
          md:text-7xl
          lg:text-[80px]
        "
      >
        Find your next
        <br />

        <span
          className="
            bg-gradient-to-r
            from-gray-500
            via-gray-300
            to-violet-400
            bg-clip-text
            text-transparent
            bg-[length:200%_100%]
            animate-[gradientMove_5s_ease_infinite]
          "
        >
          unforgettable experience.
        </span>
      </h1>


      {/* Description */}
      <p className="mt-7 max-w-2xl text-base leading-7 text-gray-400 md:text-lg">
        Discover concerts, comedy shows, conferences and unique
        experiences happening around you.
      </p>


      {/* Trust row */}
      <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs font-semibold text-gray-500">

        <span className="flex items-center gap-2 transition hover:text-white">
          <CalendarDays className="h-4 w-4 text-violet-400" />
          Upcoming events
        </span>

        <span className="flex items-center gap-2 transition hover:text-white">
          <MapPin className="h-4 w-4 text-violet-400" />
          Multiple locations
        </span>

        <span className="flex items-center gap-2 transition hover:text-white">
          <Sparkles className="h-4 w-4 text-violet-400" />
          Curated experiences
        </span>

      </div>

    </div>

  </div>
</section>

      {/* =========================================================
          SEARCH / FILTER PANEL
      ========================================================= */}
      <section className="relative z-10 mx-auto max-w-7xl px-5 md:px-8">
        <div className="-mt-8 rounded-[28px] border border-gray-200/80 bg-white p-3 shadow-[0_25px_70px_rgba(0,0,0,0.12)]">
          <div className="grid gap-2 lg:grid-cols-[2fr_1fr_1fr_1fr_auto]">
            {/* Search */}
            <div className="relative">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />

              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Escape") {
                    setSearch("");
                  }
                }}
                placeholder="Search events, artists, experiences..."
                aria-label="Search events"
                className="h-14 w-full rounded-2xl bg-gray-100 pl-12 pr-11 text-sm font-medium text-gray-900 outline-none transition-all placeholder:text-gray-400 focus:bg-white focus:ring-2 focus:ring-black"
              />

              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  aria-label="Clear search"
                  className="absolute right-4 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full text-gray-400 transition hover:bg-gray-200 hover:text-black"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            {/* Category */}
            <div className="relative">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                aria-label="Filter by category"
                className="h-14 w-full appearance-none rounded-2xl bg-gray-100 px-4 pr-10 text-sm font-medium outline-none transition-all focus:bg-white focus:ring-2 focus:ring-black"
              >
                <option>All Categories</option>
                <option>Music</option>
                <option>Technology</option>
                <option>Comedy</option>
                <option>Arts</option>
              </select>

              <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            </div>

            {/* Location */}
            <div className="relative">
              <MapPin className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                aria-label="Filter by location"
                className="h-14 w-full appearance-none rounded-2xl bg-gray-100 pl-10 pr-10 text-sm font-medium outline-none transition-all focus:bg-white focus:ring-2 focus:ring-black"
              >
                <option>All Locations</option>
                <option>Delhi</option>
                <option>Gurugram</option>
                <option>Noida</option>
              </select>

              <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            </div>

            {/* Sort */}
            <div className="relative">
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                aria-label="Sort events"
                className="h-14 w-full appearance-none rounded-2xl bg-gray-100 px-4 pr-10 text-sm font-medium outline-none transition-all focus:bg-white focus:ring-2 focus:ring-black"
              >
                <option>Popular</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
              </select>

              <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            </div>

            {/* Search button */}
            <button
              type="button"
              onClick={() => {
                document
                  .getElementById("event-results")
                  ?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
              className="flex h-14 items-center justify-center gap-2 rounded-2xl bg-[#09090b] px-7 text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-violet-600 active:scale-[0.98]"
            >
              <Search className="h-4 w-4" />
              Search
            </button>
          </div>

          {/* Mobile filter indicator */}
          <div className="mt-2 flex items-center gap-2 px-2 py-1 text-xs text-gray-400 lg:hidden">
            <Filter className="h-3.5 w-3.5" />
            Use the filters above to refine events
          </div>
        </div>
      </section>

      {/* =========================================================
          CONTENT
      ========================================================= */}
      <main
        id="event-results"
        className="mx-auto max-w-7xl scroll-mt-8 px-5 py-14 md:px-8 md:py-16"
      >
        {/* Heading */}
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-violet-600">
              Explore
            </p>

            <h2 className="mt-2 text-3xl font-black tracking-[-0.03em] md:text-4xl">
              Upcoming Events
            </h2>

            <div className="mt-3 flex flex-wrap items-center gap-2 text-sm text-gray-500">
              <span className="font-medium">
                {filteredEvents.length}{" "}
                {filteredEvents.length === 1 ? "event" : "events"} found
              </span>

              {search && (
                <>
                  <span className="text-gray-300">•</span>

                  <span>
                    Results for{" "}
                    <span className="font-semibold text-gray-700">
                      "{search}"
                    </span>
                  </span>
                </>
              )}
            </div>
          </div>

          {hasFilters && (
            <button
              type="button"
              onClick={clearFilters}
              className="flex w-fit items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-bold text-gray-700 transition hover:border-gray-400 hover:text-black"
            >
              Clear filters
              <X className="h-4 w-4 text-gray-400" />
            </button>
          )}
        </div>

        {/* =====================================================
            CATEGORY CHIPS
        ===================================================== */}
        <div className="mt-9 flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map((item) => {
            const active = category === item.value;

            return (
              <button
                key={item.value}
                type="button"
                onClick={() => setCategory(item.value)}
                className={`group flex shrink-0 items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold transition-all duration-200 ${
                  active
                    ? "bg-[#09090b] text-white shadow-lg"
                    : "border border-gray-200 bg-white text-gray-600 hover:border-gray-400 hover:text-black"
                }`}
              >
                {active && <Check className="h-3.5 w-3.5" />}

                {item.label}
              </button>
            );
          })}
        </div>

        {/* =====================================================
            ACTIVE FILTERS
        ===================================================== */}
        {hasFilters && (
          <div className="mt-5 flex flex-wrap items-center gap-2">
            <span className="mr-1 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-gray-400">
              <Filter className="h-3.5 w-3.5" />
              Filters
            </span>

            {search && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-violet-50 px-3 py-1.5 text-xs font-bold text-violet-700">
                Search: {search}

                <button
                  type="button"
                  onClick={() => setSearch("")}
                  aria-label="Remove search filter"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            )}

            {category !== "All Categories" && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-bold text-gray-700">
                {category}

                <button
                  type="button"
                  onClick={() => setCategory("All Categories")}
                  aria-label="Remove category filter"
                >
                  <X className="h-3 w-3 text-gray-400" />
                </button>
              </span>
            )}

            {location !== "All Locations" && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-bold text-gray-700">
                <MapPin className="h-3 w-3" />
                {location}

                <button
                  type="button"
                  onClick={() => setLocation("All Locations")}
                  aria-label="Remove location filter"
                >
                  <X className="h-3 w-3 text-gray-400" />
                </button>
              </span>
            )}

            {sort !== "Popular" && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-bold text-gray-700">
                {sort}

                <button
                  type="button"
                  onClick={() => setSort("Popular")}
                  aria-label="Remove sorting"
                >
                  <X className="h-3 w-3 text-gray-400" />
                </button>
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
          <div className="relative mt-10 overflow-hidden rounded-[30px] border border-gray-200 bg-white">
            <div className="pointer-events-none absolute left-1/2 top-0 h-48 w-48 -translate-x-1/2 rounded-full bg-violet-100/70 blur-[70px]" />

            <div className="relative flex flex-col items-center px-6 py-20 text-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-gray-100">
                <Search className="h-8 w-8 text-gray-400" />
              </div>

              <h3 className="mt-6 text-2xl font-black tracking-tight">
                No events found
              </h3>

              <p className="mt-2 max-w-md text-sm leading-6 text-gray-500">
                We couldn't find anything matching your current search and
                filters. Try another category, location or search term.
              </p>

              <button
                type="button"
                onClick={clearFilters}
                className="mt-7 rounded-xl bg-black px-6 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-violet-600"
              >
                Clear all filters
              </button>
            </div>
          </div>
        )}
      </main>

     {/* =========================================================
    ORGANIZER CTA — PREMIUM ANIMATED
========================================================= */}

<section className="mx-auto max-w-7xl px-5 pb-16 md:px-8">

  <div className="group relative overflow-hidden rounded-[32px] bg-[#09090b] px-7 py-12 text-white shadow-[0_25px_80px_rgba(0,0,0,0.25)] transition-all duration-700 hover:-translate-y-1 hover:shadow-[0_35px_100px_rgba(0,0,0,0.4)] md:px-14 md:py-14">

    {/* =====================================================
        ANIMATED BORDER
    ===================================================== */}

    <div className="pointer-events-none absolute inset-0 rounded-[32px] border border-white/10 transition-colors duration-500 group-hover:border-violet-400/30" />

    {/* =====================================================
        MOVING SHINE
    ===================================================== */}

    <div
      className="
        pointer-events-none absolute -left-[120%] top-0
        h-full w-[60%]
        rotate-12
        bg-gradient-to-r
        from-transparent
        via-white/[0.07]
        to-transparent
        transition-all duration-[1400ms]
        group-hover:left-[130%]
      "
    />

    {/* =====================================================
        PURPLE GLOW
    ===================================================== */}

    <div
      className="
        pointer-events-none absolute
        -right-24 -top-24
        h-72 w-72
        rounded-full
        bg-violet-600/20
        blur-[100px]
        transition-all duration-700
        group-hover:scale-125
        group-hover:bg-violet-500/30
      "
    />

    {/* =====================================================
        BLUE GLOW
    ===================================================== */}

    <div
      className="
        pointer-events-none absolute
        -bottom-32 left-1/3
        h-64 w-64
        rounded-full
        bg-blue-500/10
        blur-[90px]
        transition-all duration-700
        group-hover:scale-125
      "
    />

    {/* =====================================================
        MOVING DOTS
    ===================================================== */}

    <div className="pointer-events-none absolute inset-0 overflow-hidden">

      <span className="absolute left-[12%] top-[25%] h-1 w-1 animate-pulse rounded-full bg-violet-300/70" />

      <span
        className="absolute left-[42%] top-[70%] h-1.5 w-1.5 animate-pulse rounded-full bg-blue-300/60"
        style={{ animationDelay: "700ms" }}
      />

      <span
        className="absolute right-[20%] top-[30%] h-1 w-1 animate-pulse rounded-full bg-white/50"
        style={{ animationDelay: "1200ms" }}
      />

      <span
        className="absolute right-[35%] bottom-[20%] h-1 w-1 animate-pulse rounded-full bg-violet-300/60"
        style={{ animationDelay: "1800ms" }}
      />

    </div>


    {/* =====================================================
        CONTENT
    ===================================================== */}

    <div className="relative z-10 flex flex-col justify-between gap-9 md:flex-row md:items-center">

      {/* LEFT */}

      <div className="max-w-2xl">

        {/* Badge */}

        <div
          className="
            inline-flex items-center gap-2
            rounded-full
            border border-white/10
            bg-white/[0.05]
            px-3 py-1.5
            text-[11px]
            font-bold
            uppercase
            tracking-wider
            text-gray-400
            backdrop-blur-md
            transition-all duration-500
            group-hover:border-violet-400/30
            group-hover:bg-violet-500/10
            group-hover:text-violet-200
          "
        >

          <Sparkles
            className="
              h-3.5 w-3.5
              text-violet-400
              transition-transform
              duration-500
              group-hover:rotate-12
              group-hover:scale-125
            "
          />

          For organizers

        </div>


        {/* Heading */}

        <h2
          className="
            mt-4
            text-3xl
            font-black
            tracking-[-0.03em]
            md:text-4xl
          "
        >

          Have an event to share?

          <span className="ml-2 inline-block text-violet-400 transition-transform duration-500 group-hover:translate-x-1">
            ✦
          </span>

        </h2>


        {/* Description */}

        <p className="mt-4 max-w-xl text-sm leading-7 text-gray-400 md:text-base">
          Create your event, sell tickets and manage your attendees with
          PRAPT.
        </p>

      </div>


      {/* =====================================================
          CTA BUTTON
      ===================================================== */}

      <Link
        to="/organizer"
        className="
          group/button
          relative
          flex
          w-fit
          shrink-0
          items-center
          gap-2
          overflow-hidden
          rounded-xl
          bg-white
          px-6
          py-3.5
          text-sm
          font-black
          text-black
          shadow-[0_10px_30px_rgba(255,255,255,0.08)]
          transition-all
          duration-300
          hover:-translate-y-1
          hover:scale-[1.03]
          hover:bg-gray-100
          hover:shadow-[0_15px_40px_rgba(255,255,255,0.15)]
          active:scale-95
        "
      >

        {/* Button shine */}

        <span
          className="
            absolute
            -left-20
            top-0
            h-full
            w-10
            rotate-12
            bg-black/10
            blur-sm
            transition-all
            duration-700
            group-hover/button:left-[120%]
          "
        />

        <span className="relative z-10">
          Create an Event
        </span>

        <ArrowRight
          className="
            relative z-10
            h-4 w-4
            transition-all
            duration-300
            group-hover/button:translate-x-1
          "
        />

      </Link>

    </div>

  </div>

</section>
    </div>
  );
}