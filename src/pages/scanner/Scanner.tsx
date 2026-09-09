import { useState } from "react";
import { Link } from "react-router-dom";

type ScanStatus =
  | "idle"
  | "valid"
  | "invalid"
  | "used"
  | "wrong";

const events = [
  {
    id: 1,
    name: "Music Fest 2026",
    date: "20 Sep 2026",
    location: "Gurugram",
  },
  {
    id: 2,
    name: "Tech Summit 2026",
    date: "25 Sep 2026",
    location: "Noida",
  },
];

const history = [
  {
    name: "Riya Sharma",
    ticket: "VIP",
    time: "06:42 PM",
    status: "Valid",
  },
  {
    name: "Aman Gupta",
    ticket: "General",
    time: "06:38 PM",
    status: "Valid",
  },
  {
    name: "Karan Mehta",
    ticket: "General",
    time: "06:31 PM",
    status: "Valid",
  },
];

export default function Scanner() {
  const [selectedEvent, setSelectedEvent] = useState(events[0]);
  const [status, setStatus] = useState<ScanStatus>("idle");
  const [showEvents, setShowEvents] = useState(false);
  const [manualId, setManualId] = useState("");

  const simulateScan = () => {
    setStatus("valid");
  };

  const resetScanner = () => {
    setStatus("idle");
    setManualId("");
  };

  return (
    <div className="min-h-screen bg-[#f4f5f7] text-gray-900">

      {/* TOP BAR */}
      <header className="sticky top-0 z-40 border-b bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">

          <div className="flex items-center gap-3">

            <Link
              to="/organizer"
              className="flex h-10 w-10 items-center justify-center rounded-xl border text-lg transition hover:bg-gray-50"
            >
              ←
            </Link>

            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-gray-400">
                PRAPT
              </p>

              <h1 className="text-base font-black">
                Ticket Scanner
              </h1>
            </div>

          </div>

          <div className="flex items-center gap-2">

            <span className="hidden rounded-full bg-green-50 px-3 py-1.5 text-xs font-bold text-green-700 sm:block">
              ● Scanner Online
            </span>

            <button className="flex h-10 w-10 items-center justify-center rounded-xl border hover:bg-gray-50">
              ⋮
            </button>

          </div>

        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:py-8">

        {/* EVENT SELECTOR */}
        <section className="relative">

          <button
            onClick={() => setShowEvents(!showEvents)}
            className="flex w-full items-center justify-between rounded-2xl border bg-white p-4 text-left shadow-sm transition hover:border-gray-300"
          >

            <div className="flex items-center gap-3">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-black text-white">
                🎟
              </div>

              <div>
                <p className="text-xs font-medium text-gray-400">
                  SCANNING EVENT
                </p>

                <p className="mt-0.5 font-black">
                  {selectedEvent.name}
                </p>

                <p className="mt-0.5 text-xs text-gray-500">
                  {selectedEvent.date} · {selectedEvent.location}
                </p>
              </div>

            </div>

            <span className="text-gray-400">
              {showEvents ? "⌃" : "⌄"}
            </span>

          </button>

          {showEvents && (
            <div className="absolute left-0 right-0 top-full z-30 mt-2 overflow-hidden rounded-2xl border bg-white p-2 shadow-xl">

              {events.map((event) => (
                <button
                  key={event.id}
                  onClick={() => {
                    setSelectedEvent(event);
                    setShowEvents(false);
                    resetScanner();
                  }}
                  className="flex w-full items-center gap-3 rounded-xl p-3 text-left hover:bg-gray-50"
                >

                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100">
                    🎫
                  </div>

                  <div>
                    <p className="font-bold">
                      {event.name}
                    </p>

                    <p className="text-xs text-gray-500">
                      {event.date} · {event.location}
                    </p>
                  </div>

                </button>
              ))}

            </div>
          )}

        </section>

        {/* MAIN GRID */}
        <div className="mt-6 grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">

          {/* SCANNER */}
          <section className="rounded-3xl border bg-white p-5 shadow-sm sm:p-7">

            <div className="text-center">

              <p className="text-xs font-bold uppercase tracking-[0.18em] text-gray-400">
                Gate Check-in
              </p>

              <h2 className="mt-2 text-2xl font-black sm:text-3xl">
                Scan attendee ticket
              </h2>

              <p className="mx-auto mt-2 max-w-md text-sm text-gray-500">
                Point the camera at the QR code on the attendee's digital ticket.
              </p>

            </div>

            {/* SCANNER AREA */}
            <div className="mx-auto mt-7 max-w-md">

              <div className="relative aspect-square overflow-hidden rounded-[2rem] bg-[#101114] shadow-2xl">

                {/* Camera background */}
                <div className="absolute inset-0 opacity-20">
                  <div className="h-full w-full bg-[radial-gradient(circle_at_center,#ffffff_0%,transparent_35%)]" />
                </div>

                {/* Scanner corners */}
                <div className="absolute inset-8">

                  <span className="absolute left-0 top-0 h-12 w-12 rounded-tl-2xl border-l-4 border-t-4 border-white" />
                  <span className="absolute right-0 top-0 h-12 w-12 rounded-tr-2xl border-r-4 border-t-4 border-white" />
                  <span className="absolute bottom-0 left-0 h-12 w-12 rounded-bl-2xl border-b-4 border-l-4 border-white" />
                  <span className="absolute bottom-0 right-0 h-12 w-12 rounded-br-2xl border-b-4 border-r-4 border-white" />

                  {status === "idle" && (
                    <div className="absolute left-6 right-6 top-1/2 h-0.5 bg-white/80 shadow-[0_0_15px_rgba(255,255,255,0.8)]" />
                  )}

                </div>

                {/* IDLE */}
                {status === "idle" && (
                  <div className="absolute inset-x-0 bottom-10 text-center">

                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-3xl backdrop-blur">
                      ▦
                    </div>

                    <p className="mt-3 text-sm font-semibold text-white">
                      Ready to scan
                    </p>

                    <p className="mt-1 text-xs text-gray-400">
                      Camera access will be enabled here
                    </p>

                  </div>
                )}

                {/* VALID */}
                {status === "valid" && (
                  <ResultOverlay
                    icon="✓"
                    title="Valid Ticket"
                    text="Ticket verified successfully"
                    type="success"
                  />
                )}

                {/* INVALID */}
                {status === "invalid" && (
                  <ResultOverlay
                    icon="×"
                    title="Invalid Ticket"
                    text="This ticket could not be verified"
                    type="danger"
                  />
                )}

                {/* USED */}
                {status === "used" && (
                  <ResultOverlay
                    icon="!"
                    title="Already Used"
                    text="This ticket has already been checked in"
                    type="warning"
                  />
                )}

                {/* WRONG EVENT */}
                {status === "wrong" && (
                  <ResultOverlay
                    icon="!"
                    title="Wrong Event"
                    text="This ticket belongs to another event"
                    type="warning"
                  />
                )}

              </div>

              {/* SIMULATE */}
              <button
                onClick={simulateScan}
                className="mt-5 w-full rounded-2xl bg-black py-4 font-bold text-white transition hover:bg-gray-800 active:scale-[0.99]"
              >
                Simulate Scan
              </button>

              {/* MANUAL */}
              <div className="mt-5">

                <div className="flex items-center gap-3">
                  <div className="h-px flex-1 bg-gray-200" />
                  <span className="text-xs font-semibold text-gray-400">
                    OR
                  </span>
                  <div className="h-px flex-1 bg-gray-200" />
                </div>

                <div className="mt-4 flex gap-2">

                  <input
                    value={manualId}
                    onChange={(e) => setManualId(e.target.value)}
                    placeholder="Enter ticket ID"
                    className="h-12 min-w-0 flex-1 rounded-xl border bg-gray-50 px-4 text-sm outline-none transition focus:border-black focus:bg-white"
                  />

                  <button
                    onClick={simulateScan}
                    className="rounded-xl border bg-white px-5 text-sm font-bold transition hover:bg-gray-50"
                  >
                    Verify
                  </button>

                </div>

              </div>

            </div>

          </section>

          {/* RIGHT SIDE */}
          <div className="space-y-6">

            {/* CHECK-IN STATS */}
            <section className="rounded-3xl border bg-black p-6 text-white">

              <div className="flex items-center justify-between">

                <div>
                  <p className="text-sm text-gray-400">
                    Today's check-ins
                  </p>

                  <p className="mt-2 text-4xl font-black">
                    318
                  </p>
                </div>

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-2xl">
                  ✓
                </div>

              </div>

              <div className="mt-6">

                <div className="flex justify-between text-xs text-gray-400">
                  <span>318 checked in</span>
                  <span>428 total</span>
                </div>

                <div className="mt-2 h-2 rounded-full bg-white/10">
                  <div className="h-full w-[74%] rounded-full bg-white" />
                </div>

              </div>

            </section>

            {/* GATE STATUS */}
            <section className="rounded-3xl border bg-white p-6">

              <div className="flex items-center justify-between">

                <div>
                  <h3 className="font-black">
                    Gate Status
                  </h3>

                  <p className="mt-1 text-xs text-gray-500">
                    Current scanner
                  </p>
                </div>

                <span className="rounded-full bg-green-100 px-3 py-1.5 text-xs font-bold text-green-700">
                  Active
                </span>

              </div>

              <div className="mt-5 space-y-3">

                <Info
                  label="Event"
                  value={selectedEvent.name}
                />

                <Info
                  label="Gate"
                  value="Gate A"
                />

                <Info
                  label="Staff"
                  value="Scanner Staff"
                />

              </div>

            </section>

            {/* RECENT */}
            <section className="rounded-3xl border bg-white p-6">

              <div className="flex items-center justify-between">

                <div>
                  <h3 className="font-black">
                    Recent Check-ins
                  </h3>

                  <p className="mt-1 text-xs text-gray-500">
                    Latest verified tickets
                  </p>
                </div>

                <button className="text-xs font-bold underline">
                  View all
                </button>

              </div>

              <div className="mt-5 space-y-4">

                {history.map((person) => (
                  <div
                    key={person.name}
                    className="flex items-center gap-3"
                  >

                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-100 font-bold">
                      {person.name.charAt(0)}
                    </div>

                    <div className="min-w-0 flex-1">

                      <p className="truncate text-sm font-bold">
                        {person.name}
                      </p>

                      <p className="text-xs text-gray-400">
                        {person.ticket} · {person.time}
                      </p>

                    </div>

                    <span className="text-green-600">
                      ✓
                    </span>

                  </div>
                ))}

              </div>

            </section>

          </div>

        </div>

        {/* RESULT DETAILS */}
        {status !== "idle" && (
          <section className="mt-6 rounded-3xl border bg-white p-6 shadow-sm">

            <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">

              <div className="flex items-center gap-4">

                <div
                  className={`flex h-14 w-14 items-center justify-center rounded-2xl text-2xl font-black ${
                    status === "valid"
                      ? "bg-green-100 text-green-700"
                      : status === "invalid"
                      ? "bg-red-100 text-red-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {status === "valid"
                    ? "✓"
                    : status === "invalid"
                    ? "×"
                    : "!"}
                </div>

                <div>

                  <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
                    Scan Result
                  </p>

                  <h3 className="mt-1 text-xl font-black">
                    {status === "valid"
                      ? "Ticket verified"
                      : status === "invalid"
                      ? "Invalid ticket"
                      : status === "used"
                      ? "Ticket already used"
                      : "Ticket belongs to another event"}
                  </h3>

                </div>

              </div>

              {status === "valid" && (
                <div className="rounded-2xl bg-gray-50 px-5 py-4">

                  <p className="text-xs text-gray-400">
                    ATTENDEE
                  </p>

                  <p className="mt-1 font-black">
                    Riya Sharma
                  </p>

                  <p className="mt-1 text-sm text-gray-500">
                    VIP · 2 Tickets
                  </p>

                </div>
              )}

              <button
                onClick={resetScanner}
                className="rounded-xl bg-black px-6 py-3 text-sm font-bold text-white"
              >
                Scan Next
              </button>

            </div>

          </section>
        )}

      </main>

      {/* MOBILE BOTTOM NAV */}
      <div className="sticky bottom-0 border-t bg-white/95 px-4 py-3 backdrop-blur lg:hidden">

        <div className="mx-auto flex max-w-md items-center justify-around">

          <button className="flex flex-col items-center gap-1 text-xs font-bold">
            <span className="text-xl">▦</span>
            Scanner
          </button>

          <button className="flex flex-col items-center gap-1 text-xs text-gray-400">
            <span className="text-xl">✓</span>
            Check-ins
          </button>

          <button className="flex flex-col items-center gap-1 text-xs text-gray-400">
            <span className="text-xl">⚙</span>
            Settings
          </button>

        </div>

      </div>

    </div>
  );
}

function Info({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between border-b pb-3 last:border-0">
      <span className="text-sm text-gray-400">
        {label}
      </span>

      <span className="max-w-[60%] truncate text-right text-sm font-bold">
        {value}
      </span>
    </div>
  );
}

function ResultOverlay({
  icon,
  title,
  text,
  type,
}: {
  icon: string;
  title: string;
  text: string;
  type: "success" | "danger" | "warning";
}) {
  const styles = {
    success: "bg-green-500",
    danger: "bg-red-500",
    warning: "bg-yellow-500",
  };

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black/80 p-8 text-center backdrop-blur-sm">

      <div>

        <div
          className={`mx-auto flex h-20 w-20 items-center justify-center rounded-full text-4xl font-black text-white ${styles[type]}`}
        >
          {icon}
        </div>

        <h3 className="mt-5 text-2xl font-black text-white">
          {title}
        </h3>

        <p className="mt-2 text-sm text-gray-300">
          {text}
        </p>

      </div>

    </div>
  );
}