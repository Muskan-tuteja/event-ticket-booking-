import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/public/Navbar";
import categoryMusic from "../../assests/categories/Music.jpg";
import categoryTechnology from "../../assests/categories/Technology.jpg";
import categoryComedy from "../../assests/categories/Comedy.jpg";
import categoryArts from "../../assests/categories/Arts.jpg";

import locationDelhi from "../../assests/location/Delhi.jpg";
import locationGurugram from "../../assests/location/Gurugram.jpg";
import locationNoida from "../../assests/location/Noida.jpg";
import locationMumbai from "../../assests/location/Mumbai.jpg";

import hero1 from "../../assests/hero/hero-1.jpg";
import hero2 from "../../assests/hero/hero-2.jpg";
import hero3 from "../../assests/hero/hero-3.jpg";
import heroVideo from "../../assests/hero/night_event_video.mp4";
const categories = [
  {
    name: "Music",
    count: "120+ Events",
    icon: "♪",
    description: "Concerts & live shows",
    image: categoryMusic,
  },
  {
    name: "Technology",
    count: "80+ Events",
    icon: "</>",
    description: "Tech & innovation",
    image: categoryTechnology,
  },
  {
    name: "Comedy",
    count: "45+ Events",
    icon: "☺",
    description: "Laugh & have fun",
    image: categoryComedy,
  },
  {
    name: "Arts & Culture",
    count: "60+ Events",
    icon: "✦",
    description: "Art & experiences",
    image: categoryArts,
  },
];

const locations = [
  {
    name: "Delhi",
    events: "240 Events",
    tag: "Capital vibes",
    image: locationDelhi,
  },
  {
    name: "Gurugram",
    events: "180 Events",
    tag: "Urban experiences",
    image: locationGurugram,
  },
  {
    name: "Noida",
    events: "120 Events",
    tag: "Something happening",
    image: locationNoida,
  },
  {
    name: "Mumbai",
    events: "320 Events",
    tag: "City that never sleeps",
    image: locationMumbai,
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
const heroSlides = [
  {
    type: "image",
    src: hero1,
    title: "Live the moment.",
    text: "Discover unforgettable experiences.",
  },
  {
    type: "image",
    src: hero2,
    title: "Feel the energy.",
    text: "Music, comedy, culture and more.",
  },
  {
    type: "image",
    src: hero3,
    title: "Make memories.",
    text: "Find your next experience with PRAPT.",
  },
  {
    type: "video",
    src: heroVideo,
    title: "Your next experience.",
    text: "Book. Experience. Remember.",
  },
];


export default function Home() {
   const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroSlides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const currentSlide = heroSlides[activeSlide];
  return (
    <div className="min-h-screen bg-white text-gray-950">
      <Navbar />

      {/* =========================================================
    HERO
========================================================= */}

<section className="relative overflow-hidden bg-[#09090b] text-white">

  {/* Background glow */}
  <div className="absolute -right-32 -top-32 h-[500px] w-[500px] rounded-full bg-violet-600/20 blur-[120px]" />

  <div className="absolute -bottom-40 left-1/4 h-[400px] w-[400px] rounded-full bg-blue-500/10 blur-[100px]" />

  {/* Grid pattern */}
  <div className="absolute inset-0 opacity-[0.04] [background-image:linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] [background-size:60px_60px]" />

  <div className="relative mx-auto max-w-7xl px-5 py-14 md:px-8 md:py-20 lg:py-24">

    {/* HERO CONTENT */}
    <div className="grid items-center gap-12 lg:grid-cols-[1fr_0.85fr]">

      {/* LEFT */}
      <div>

        {/* Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.07] px-4 py-2 text-xs font-semibold text-gray-300 backdrop-blur-xl">
          <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
          Discover experiences worth remembering
        </div>

        {/* Heading */}
        <h1 className="mt-7 text-5xl font-black leading-[0.98] tracking-[-0.04em] sm:text-6xl md:text-7xl lg:text-[76px]">
          Discover events.
          <br />

          <span className="bg-gradient-to-r from-gray-400 via-gray-300 to-gray-500 bg-clip-text text-transparent">
            Create memories.
          </span>
        </h1>

        {/* Description */}
        <p className="mt-7 max-w-xl text-base leading-7 text-gray-400 md:text-lg">
          Find concerts, conferences, workshops, comedy shows and
          unforgettable experiences happening around you.
        </p>

        {/* CTA */}
        <div className="mt-9 flex flex-wrap gap-3">

          <Link
            to="/events"
            className="group rounded-xl bg-white px-6 py-3.5 text-sm font-bold text-black transition duration-300 hover:-translate-y-0.5 hover:bg-gray-200"
          >
            Explore Events

            <span className="ml-2 inline-block transition group-hover:translate-x-1">
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

      </div>


      {/* RIGHT — IMAGE / VIDEO CAROUSEL */}
      <div className="relative">

        <div className="relative aspect-[4/5] overflow-hidden rounded-[32px] border border-white/10 bg-white/5 shadow-[0_30px_100px_rgba(0,0,0,0.55)] sm:aspect-square lg:aspect-[4/5]">

          {/* IMAGE */}
          {currentSlide.type === "image" && (
            <img
              key={currentSlide.src}
              src={currentSlide.src}
              alt="PRAPT event experience"
              className="h-full w-full object-cover transition-all duration-700"
            />
          )}

          {/* VIDEO */}
          {currentSlide.type === "video" && (
            <video
              key={currentSlide.src}
              src={currentSlide.src}
              autoPlay
              muted
              loop
              playsInline
              className="h-full w-full object-cover"
            />
          )}

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

          {/* Slide information */}
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">

            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-violet-300">
              PRAPT Experiences
            </p>

            <h2 className="mt-2 text-2xl font-black md:text-3xl">
              {currentSlide.title}
            </h2>

            <p className="mt-2 text-sm text-gray-300">
              {currentSlide.text}
            </p>

          </div>


          {/* Previous button */}
          <button
            type="button"
            onClick={() =>
              setActiveSlide(
                (prev) =>
                  (prev - 1 + heroSlides.length) %
                  heroSlides.length
              )
            }
            className="absolute left-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/30 text-lg text-white backdrop-blur-md transition hover:bg-white hover:text-black"
            aria-label="Previous slide"
          >
            ←
          </button>


          {/* Next button */}
          <button
            type="button"
            onClick={() =>
              setActiveSlide(
                (prev) =>
                  (prev + 1) % heroSlides.length
              )
            }
            className="absolute right-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/30 text-lg text-white backdrop-blur-md transition hover:bg-white hover:text-black"
            aria-label="Next slide"
          >
            →
          </button>

        </div>


        {/* Carousel dots */}
        <div className="mt-5 flex justify-center gap-2">

          {heroSlides.map((slide, index) => (
            <button
              key={slide.src}
              type="button"
              onClick={() => setActiveSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                activeSlide === index
                  ? "w-8 bg-white"
                  : "w-2 bg-white/30 hover:bg-white/60"
              }`}
            />
          ))}

        </div>

      </div>

    </div>


    {/* SEARCH BOX */}
    <div className="mt-14 rounded-[28px] border border-white/10 bg-white p-2 shadow-[0_25px_80px_rgba(0,0,0,0.4)] md:mt-16">

      <div className="grid gap-2 md:grid-cols-[1.6fr_1fr_1fr_1fr_auto]">

        {/* Search */}
        <div className="group flex items-center gap-3 rounded-2xl bg-gray-100 px-5 py-4 transition focus-within:bg-gray-50">

          <span className="text-xl text-gray-400">
            ⌕
          </span>

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


        {/* Search button */}
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
      className="w-fit text-sm font-bold underline underline-offset-4 transition hover:text-violet-600"
    >
      View all events →
    </Link>
  </div>

  <div className="mt-9 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
    {categories.map((category) => (
      <Link
        key={category.name}
        to="/events"
        className="group relative min-h-[330px] overflow-hidden rounded-[28px] bg-black text-white shadow-sm transition duration-500 hover:-translate-y-2 hover:shadow-[0_25px_60px_rgba(0,0,0,0.18)]"
      >
        {/* Background Image */}
        <img
          src={category.image}
          alt={`${category.name} events`}
          className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-110"
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-black/10" />

        {/* Violet Hover Overlay */}
        <div className="absolute inset-0 bg-violet-900/0 transition duration-500 group-hover:bg-violet-900/25" />

        {/* Content */}
        <div className="relative flex min-h-[330px] flex-col p-6">
          {/* Icon + Arrow */}
          <div className="flex items-center justify-between">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/20 bg-black/35 text-xl font-black text-white backdrop-blur-md transition duration-300 group-hover:rotate-3 group-hover:bg-white group-hover:text-black">
              {category.icon}
            </div>

            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/20 text-white/70 backdrop-blur-md transition duration-300 group-hover:translate-x-1 group-hover:bg-white group-hover:text-black">
              →
            </span>
          </div>

          {/* Bottom Content */}
          <div className="mt-auto">
            <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-violet-300">
              {category.count}
            </p>

            <h3 className="text-2xl font-black tracking-tight">
              {category.name}
            </h3>

            <p className="mt-2 max-w-[220px] text-sm leading-5 text-white/65">
              {category.description}
            </p>

            <div className="mt-5 h-px w-10 bg-white/30 transition-all duration-500 group-hover:w-20 group-hover:bg-violet-300" />
          </div>
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
  {/* Section Header */}
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

  {/* Location Cards */}
  <div className="mt-9 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
    {locations.map((location) => (
      <Link
        key={location.name}
        to="/events"
        className="group relative min-h-[280px] overflow-hidden rounded-[28px] bg-black text-white shadow-sm transition duration-500 hover:-translate-y-2 hover:shadow-[0_25px_60px_rgba(0,0,0,0.18)]"
      >
        {/* Background Image */}
        <img
          src={location.image}
          alt={`${location.name} events`}
          className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-110"
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-black/10" />

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-violet-900/0 transition duration-500 group-hover:bg-violet-900/20" />

        {/* Content */}
        <div className="relative flex h-[280px] flex-col p-6">
          {/* Location Icon */}
          <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/20 bg-black/30 text-lg backdrop-blur-md transition duration-300 group-hover:bg-white group-hover:text-black">
            ⌖
          </span>

          {/* Bottom Content */}
          <div className="mt-auto">
            <p className="mb-1 text-xs font-medium text-white/60">
              {location.tag}
            </p>

            <h3 className="text-3xl font-black tracking-tight">
              {location.name}
            </h3>

            <div className="mt-3 flex items-center justify-between">
              <p className="text-sm text-white/70">
                {location.events}
              </p>

              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/10 text-sm backdrop-blur transition duration-300 group-hover:translate-x-1 group-hover:bg-white group-hover:text-black">
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
  <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[32px] bg-[#09090b] text-white shadow-[0_30px_80px_rgba(0,0,0,0.15)]">

    {/* Background Image */}
    <img
      src="https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=2000&q=90"
      alt="Live event"
      className="absolute inset-0 h-full w-full object-cover"
    />

    {/* Dark Overlay */}
    <div className="absolute inset-0 bg-black/75" />

    {/* Gradient */}
    <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-black/30" />

    {/* Purple Glow */}
    <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-violet-600/30 blur-[110px]" />

    {/* Content */}
    <div className="relative grid min-h-[420px] items-center gap-10 px-7 py-14 md:px-12 md:py-16 lg:grid-cols-[1.2fr_0.8fr] lg:px-16">

      {/* LEFT CONTENT */}
      <div className="max-w-2xl">

        {/* Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold text-white/80 backdrop-blur-md">
          <span className="h-2 w-2 rounded-full bg-violet-400" />
          For organizers
        </div>

        {/* Heading */}
        <h2 className="mt-6 text-4xl font-black leading-tight tracking-[-0.03em] md:text-5xl lg:text-6xl">
          Turn your event
          <br />
          into an{" "}
          <span className="bg-gradient-to-r from-violet-300 to-white bg-clip-text text-transparent">
            experience.
          </span>
        </h2>

        {/* Description */}
        <p className="mt-6 max-w-xl text-base leading-7 text-white/65 md:text-lg">
          Create events, sell tickets, manage attendees and grow
          your audience — all from one powerful platform.
        </p>

        {/* Features */}
        <div className="mt-7 flex flex-wrap gap-3">
          <span className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold text-white/75 backdrop-blur-md">
            ✓ Easy event creation
          </span>

          <span className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold text-white/75 backdrop-blur-md">
            ✓ Ticket management
          </span>

          <span className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold text-white/75 backdrop-blur-md">
            ✓ Attendee analytics
          </span>
        </div>

        {/* CTA */}
        <Link
          to="/organizer"
          className="group mt-8 inline-flex items-center rounded-xl bg-white px-7 py-4 text-sm font-black text-black transition duration-300 hover:-translate-y-1 hover:bg-violet-500 hover:text-white hover:shadow-[0_15px_40px_rgba(139,92,246,0.35)]"
        >
          Start Organizing

          <span className="ml-2 text-lg transition duration-300 group-hover:translate-x-1">
            →
          </span>
        </Link>

      </div>

      {/* RIGHT VISUAL */}
      <div className="hidden lg:flex justify-end">
        <div className="relative w-[330px] overflow-hidden rounded-[28px] border border-white/15 bg-white/10 p-2 shadow-2xl backdrop-blur-md">

          {/* Image Card */}
          <div className="relative h-[330px] overflow-hidden rounded-[22px]">
            <img
              src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1000&q=90"
              alt="Event crowd"
              className="h-full w-full object-cover transition duration-700 hover:scale-105"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

            {/* Card Content */}
            <div className="absolute bottom-5 left-5 right-5">
              <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-violet-300">
                PRAPT ORGANIZER
              </p>

              <p className="mt-2 text-xl font-black">
                Your event starts here.
              </p>

              <p className="mt-1 text-xs text-white/60">
                Create. Sell. Manage. Grow.
              </p>
            </div>
          </div>

        </div>
      </div>

    </div>
  </div>
</section>

      {/* =========================================================
          FOOTER
      ========================================================= */}

      <footer className="relative overflow-hidden bg-[#09090b] text-white">

  {/* Background Glow */}
  <div className="pointer-events-none absolute -left-40 -top-40 h-96 w-96 rounded-full bg-violet-600/10 blur-[120px]" />
  <div className="pointer-events-none absolute -bottom-40 right-0 h-96 w-96 rounded-full bg-blue-500/10 blur-[120px]" />

  <div className="relative mx-auto max-w-7xl px-5 md:px-8">

    {/* ================= TOP FOOTER CTA ================= */}
    <div className="border-b border-white/10 py-14 md:py-16">

      <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-center">

        {/* Brand Message */}
        <div className="max-w-xl">

          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-lg font-black text-black">
              P
            </div>

            <div>
              <p className="text-xl font-black tracking-tight">
                PRAPT
              </p>

              <p className="text-[9px] font-semibold uppercase tracking-[0.25em] text-white/40">
                Experiences
              </p>
            </div>
          </div>

          <h2 className="mt-6 text-3xl font-black tracking-tight md:text-4xl">
            Don't miss the next
            <span className="text-violet-400"> experience.</span>
          </h2>

          <p className="mt-4 text-sm leading-6 text-white/50">
            Discover concerts, comedy, technology, culture and
            unforgettable experiences happening around you.
          </p>

        </div>


        {/* Newsletter */}
        <div className="w-full max-w-md">

          <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-white/40">
            Stay in the loop
          </p>

          <div className="flex rounded-2xl border border-white/10 bg-white/[0.06] p-1.5 backdrop-blur-md">

            <input
              type="email"
              placeholder="Enter your email"
              className="min-w-0 flex-1 bg-transparent px-4 py-3 text-sm text-white outline-none placeholder:text-white/30"
            />

            <button
              type="button"
              onClick={() =>
                alert("Thanks for subscribing! (Demo only)")
              }
              className="rounded-xl bg-white px-5 py-3 text-sm font-bold text-black transition duration-300 hover:bg-violet-500 hover:text-white"
            >
              Subscribe
            </button>

          </div>

          <p className="mt-2 text-[11px] text-white/30">
            Get event updates and new experiences in your inbox.
          </p>

        </div>

      </div>

    </div>


    {/* ================= MAIN LINKS ================= */}
    <div className="grid gap-10 py-14 sm:grid-cols-2 md:grid-cols-4">

      {/* Explore */}
      <div>
        <h3 className="text-sm font-bold">
          Explore
        </h3>

        <div className="mt-5 space-y-3 text-sm text-white/45">

          <Link
            to="/events"
            className="block transition hover:translate-x-1 hover:text-white"
          >
            All Events
          </Link>

          <Link
            to="/events"
            className="block transition hover:translate-x-1 hover:text-white"
          >
            Categories
          </Link>

          <Link
            to="/events"
            className="block transition hover:translate-x-1 hover:text-white"
          >
            Locations
          </Link>

          <Link
            to="/events"
            className="block transition hover:translate-x-1 hover:text-white"
          >
            Featured Events
          </Link>

        </div>
      </div>


      {/* For Organizers */}
      <div>
        <h3 className="text-sm font-bold">
          For Organizers
        </h3>

        <div className="mt-5 space-y-3 text-sm text-white/45">

          <Link
            to="/organizer"
            className="block transition hover:translate-x-1 hover:text-white"
          >
            Organizer Dashboard
          </Link>

          <Link
            to="/organizer/create-event"
            className="block transition hover:translate-x-1 hover:text-white"
          >
            Create an Event
          </Link>

          <Link
            to="/organizer/my-events"
            className="block transition hover:translate-x-1 hover:text-white"
          >
            Manage Events
          </Link>

          <Link
            to="/organizer/analytics"
            className="block transition hover:translate-x-1 hover:text-white"
          >
            Analytics
          </Link>

        </div>
      </div>


      {/* Account */}
      <div>
        <h3 className="text-sm font-bold">
          Your Account
        </h3>

        <div className="mt-5 space-y-3 text-sm text-white/45">

          <Link
            to="/login"
            className="block transition hover:translate-x-1 hover:text-white"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="block transition hover:translate-x-1 hover:text-white"
          >
            Create Account
          </Link>

          <Link
            to="/tickets"
            className="block transition hover:translate-x-1 hover:text-white"
          >
            My Tickets
          </Link>

          <Link
            to="/orders"
            className="block transition hover:translate-x-1 hover:text-white"
          >
            Order History
          </Link>

        </div>
      </div>


      {/* Support */}
      <div>
        <h3 className="text-sm font-bold">
          Support
        </h3>

        <div className="mt-5 space-y-3 text-sm text-white/45">

          <a
            href="mailto:support@prapt.com"
            className="block transition hover:translate-x-1 hover:text-white"
          >
            Contact Support
          </a>

          <a
            href="#"
            className="block transition hover:translate-x-1 hover:text-white"
          >
            Help Center
          </a>

          <a
            href="#"
            className="block transition hover:translate-x-1 hover:text-white"
          >
            Privacy Policy
          </a>

          <a
            href="#"
            className="block transition hover:translate-x-1 hover:text-white"
          >
            Terms & Conditions
          </a>

        </div>
      </div>

    </div>


    {/* ================= BOTTOM ================= */}
    <div className="border-t border-white/10 py-7">

      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">

        {/* Copyright */}
        <div>
          <p className="text-xs text-white/35">
            © 2026 PRAPT. All rights reserved.
          </p>

          <p className="mt-1 text-[11px] text-white/20">
            Discover. Book. Experience.
          </p>
        </div>


        {/* Social Buttons */}
        <div className="flex items-center gap-2">

          <a
            href="#"
            aria-label="Instagram"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-xs font-bold text-white/50 transition duration-300 hover:-translate-y-1 hover:bg-white hover:text-black"
          >
            IG
          </a>

          <a
            href="#"
            aria-label="LinkedIn"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-xs font-bold text-white/50 transition duration-300 hover:-translate-y-1 hover:bg-white hover:text-black"
          >
            IN
          </a>

          <a
            href="#"
            aria-label="X"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-xs font-bold text-white/50 transition duration-300 hover:-translate-y-1 hover:bg-white hover:text-black"
          >
            X
          </a>

          <a
            href="mailto:support@prapt.com"
            aria-label="Email"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-xs font-bold text-white/50 transition duration-300 hover:-translate-y-1 hover:bg-white hover:text-black"
          >
            @
          </a>

        </div>

      </div>

    </div>

  </div>
</footer>
    </div>
  );
}