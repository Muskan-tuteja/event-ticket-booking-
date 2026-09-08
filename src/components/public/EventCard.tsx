import { Link } from "react-router-dom";
import type { Event } from "../../types";

interface Props {
  event: Event;
}

export default function EventCard({ event }: Props) {
  return (
    <article className="group overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">

      {/* IMAGE */}
      <div className="relative overflow-hidden">

        <img
          src={event.image}
          alt={event.title}
          className="h-60 w-full object-cover transition duration-500 group-hover:scale-105"
        />

        {/* IMAGE OVERLAY */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-70" />

        {/* CATEGORY */}
        <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1.5 text-xs font-bold text-gray-900 shadow-sm backdrop-blur">
          {event.category}
        </span>

        {/* FAVORITE */}
        <button
          type="button"
          aria-label="Add event to favorites"
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/95 text-lg text-gray-700 shadow-sm backdrop-blur transition hover:scale-105 hover:bg-white"
        >
          ♡
        </button>

        {/* DATE BADGE */}
        <div className="absolute bottom-4 left-4 rounded-xl bg-white px-3 py-2 text-center shadow-lg">
          <p className="text-[10px] font-bold uppercase text-gray-400">
            Date
          </p>

          <p className="text-sm font-black text-gray-900">
            {event.date}
          </p>
        </div>

      </div>

      {/* CONTENT */}
      <div className="p-5">

        {/* TITLE */}
        <h3 className="line-clamp-1 text-xl font-black tracking-tight text-gray-950">
          {event.title}
        </h3>

        {/* DETAILS */}
        <div className="mt-4 space-y-2.5">

          <div className="flex items-center gap-3 text-sm text-gray-500">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gray-100">
              ◷
            </span>

            <span>
              {event.date} • {event.time}
            </span>
          </div>

          <div className="flex items-center gap-3 text-sm text-gray-500">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gray-100">
              ⌖
            </span>

            <span>{event.location}</span>
          </div>

        </div>

        {/* DIVIDER */}
        <div className="my-5 border-t border-gray-100" />

        {/* BOTTOM */}
        <div className="flex items-end justify-between gap-4">

          <div>
            <p className="text-xs font-medium text-gray-400">
              Starting from
            </p>

            <p className="mt-1 text-2xl font-black text-gray-950">
              ₹{event.price}
            </p>
          </div>

          <Link
            to={`/events/${event.id}`}
            className="rounded-xl bg-black px-4 py-2.5 text-sm font-bold text-white transition hover:bg-gray-800 active:scale-95"
          >
            View Details →
          </Link>

        </div>

      </div>

    </article>
  );
}