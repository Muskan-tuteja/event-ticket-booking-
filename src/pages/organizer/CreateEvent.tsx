import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function CreateEvent() {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);

  const [form, setForm] = useState({
    title: "",
    category: "Music",
    description: "",
    date: "",
    time: "",
    location: "",
    venue: "",
    image: "",
    generalPrice: "",
    generalQuantity: "",
    vipPrice: "",
    vipQuantity: "",
  });

  const updateForm = (field: string, value: string) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const nextStep = () => {
    if (step < 4) {
      setStep(step + 1);
    }
  };

  const previousStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const submitEvent = () => {
    navigate("/organizer/events");
  };

  return (
    <div className="min-h-screen bg-[#f7f7f8] text-gray-900">

      {/* HEADER */}
      <header className="border-b bg-white">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">

          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">
              Organizer Portal
            </p>

            <h1 className="text-xl font-black">
              Create Event
            </h1>
          </div>

          <Link
            to="/organizer/events"
            className="rounded-xl border px-4 py-2.5 text-sm font-semibold hover:bg-gray-50"
          >
            ← Back to Events
          </Link>

        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-10">

        {/* TITLE */}
        <div className="mb-10">

          <h2 className="text-3xl font-black md:text-4xl">
            Create your event
          </h2>

          <p className="mt-2 text-gray-500">
            Add your event details and submit it for approval.
          </p>

        </div>

        {/* PROGRESS */}
        <div className="mb-8 rounded-2xl border bg-white p-5">

          <div className="flex items-center justify-between">

            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="flex flex-1 items-center"
              >

                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
                    step >= item
                      ? "bg-black text-white"
                      : "bg-gray-100 text-gray-400"
                  }`}
                >
                  {step > item ? "✓" : item}
                </div>

                {item !== 4 && (
                  <div
                    className={`mx-3 h-1 flex-1 rounded-full ${
                      step > item
                        ? "bg-black"
                        : "bg-gray-100"
                    }`}
                  />
                )}

              </div>
            ))}

          </div>

          <div className="mt-3 grid grid-cols-4 text-center text-xs font-semibold text-gray-500">
            <span>Basic Info</span>
            <span>Date & Venue</span>
            <span>Tickets</span>
            <span>Review</span>
          </div>

        </div>

        {/* FORM */}
        <div className="rounded-3xl border bg-white p-6 shadow-sm md:p-8">

          {/* STEP 1 */}
          {step === 1 && (
            <section>

              <div className="mb-8">
                <h3 className="text-2xl font-black">
                  Basic Information
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  Tell people what your event is about.
                </p>
              </div>

              <div className="space-y-6">

                <div>
                  <label className="mb-2 block text-sm font-bold">
                    Event Name
                  </label>

                  <input
                    value={form.title}
                    onChange={(e) =>
                      updateForm("title", e.target.value)
                    }
                    placeholder="e.g. Music Fest 2026"
                    className="w-full rounded-xl border px-4 py-3 outline-none focus:border-black"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-bold">
                    Category
                  </label>

                  <select
                    value={form.category}
                    onChange={(e) =>
                      updateForm("category", e.target.value)
                    }
                    className="w-full rounded-xl border px-4 py-3 outline-none focus:border-black"
                  >
                    <option>Music</option>
                    <option>Technology</option>
                    <option>Comedy</option>
                    <option>Arts</option>
                    <option>Business</option>
                    <option>Sports</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-bold">
                    Event Description
                  </label>

                  <textarea
                    value={form.description}
                    onChange={(e) =>
                      updateForm("description", e.target.value)
                    }
                    rows={6}
                    placeholder="Describe your event..."
                    className="w-full resize-none rounded-xl border px-4 py-3 outline-none focus:border-black"
                  />
                </div>

              </div>

            </section>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <section>

              <div className="mb-8">
                <h3 className="text-2xl font-black">
                  Date & Venue
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  Where and when is your event happening?
                </p>
              </div>

              <div className="grid gap-6 md:grid-cols-2">

                <div>
                  <label className="mb-2 block text-sm font-bold">
                    Event Date
                  </label>

                  <input
                    type="date"
                    value={form.date}
                    onChange={(e) =>
                      updateForm("date", e.target.value)
                    }
                    className="w-full rounded-xl border px-4 py-3 outline-none focus:border-black"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-bold">
                    Start Time
                  </label>

                  <input
                    type="time"
                    value={form.time}
                    onChange={(e) =>
                      updateForm("time", e.target.value)
                    }
                    className="w-full rounded-xl border px-4 py-3 outline-none focus:border-black"
                  />
                </div>

              </div>

              <div className="mt-6 space-y-6">

                <div>
                  <label className="mb-2 block text-sm font-bold">
                    City / Location
                  </label>

                  <input
                    value={form.location}
                    onChange={(e) =>
                      updateForm("location", e.target.value)
                    }
                    placeholder="e.g. Gurugram"
                    className="w-full rounded-xl border px-4 py-3 outline-none focus:border-black"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-bold">
                    Venue
                  </label>

                  <input
                    value={form.venue}
                    onChange={(e) =>
                      updateForm("venue", e.target.value)
                    }
                    placeholder="e.g. Cyber Hub"
                    className="w-full rounded-xl border px-4 py-3 outline-none focus:border-black"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-bold">
                    Event Image URL
                  </label>

                  <input
                    value={form.image}
                    onChange={(e) =>
                      updateForm("image", e.target.value)
                    }
                    placeholder="https://..."
                    className="w-full rounded-xl border px-4 py-3 outline-none focus:border-black"
                  />
                </div>

              </div>

            </section>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <section>

              <div className="mb-8">
                <h3 className="text-2xl font-black">
                  Ticket Types
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  Configure the tickets you want to sell.
                </p>
              </div>

              {/* GENERAL */}
              <div className="rounded-2xl border p-5">

                <div className="flex items-center justify-between">

                  <div>
                    <h4 className="font-bold">
                      General Admission
                    </h4>

                    <p className="text-sm text-gray-500">
                      Standard event access
                    </p>
                  </div>

                  <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-bold">
                    Ticket 01
                  </span>

                </div>

                <div className="mt-5 grid gap-4 md:grid-cols-2">

                  <input
                    type="number"
                    value={form.generalPrice}
                    onChange={(e) =>
                      updateForm("generalPrice", e.target.value)
                    }
                    placeholder="Price ₹"
                    className="rounded-xl border px-4 py-3 outline-none focus:border-black"
                  />

                  <input
                    type="number"
                    value={form.generalQuantity}
                    onChange={(e) =>
                      updateForm("generalQuantity", e.target.value)
                    }
                    placeholder="Available quantity"
                    className="rounded-xl border px-4 py-3 outline-none focus:border-black"
                  />

                </div>

              </div>

              {/* VIP */}
              <div className="mt-5 rounded-2xl border p-5">

                <div className="flex items-center justify-between">

                  <div>
                    <h4 className="font-bold">
                      VIP
                    </h4>

                    <p className="text-sm text-gray-500">
                      Premium event access
                    </p>
                  </div>

                  <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-bold">
                    Ticket 02
                  </span>

                </div>

                <div className="mt-5 grid gap-4 md:grid-cols-2">

                  <input
                    type="number"
                    value={form.vipPrice}
                    onChange={(e) =>
                      updateForm("vipPrice", e.target.value)
                    }
                    placeholder="Price ₹"
                    className="rounded-xl border px-4 py-3 outline-none focus:border-black"
                  />

                  <input
                    type="number"
                    value={form.vipQuantity}
                    onChange={(e) =>
                      updateForm("vipQuantity", e.target.value)
                    }
                    placeholder="Available quantity"
                    className="rounded-xl border px-4 py-3 outline-none focus:border-black"
                  />

                </div>

              </div>

            </section>
          )}

          {/* STEP 4 */}
          {step === 4 && (
            <section>

              <div className="mb-8">
                <h3 className="text-2xl font-black">
                  Review Event
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  Check everything before submitting your event.
                </p>
              </div>

              {/* EVENT PREVIEW */}
              <div className="overflow-hidden rounded-2xl border">

                {form.image ? (
                  <img
                    src={form.image}
                    alt="Event"
                    className="h-56 w-full object-cover"
                  />
                ) : (
                  <div className="flex h-56 items-center justify-center bg-gray-100 text-gray-400">
                    Event Image Preview
                  </div>
                )}

                <div className="p-6">

                  <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-bold">
                    {form.category}
                  </span>

                  <h4 className="mt-4 text-2xl font-black">
                    {form.title || "Your Event Name"}
                  </h4>

                  <p className="mt-3 text-gray-500">
                    {form.description || "Event description"}
                  </p>

                  <div className="mt-5 grid gap-3 text-sm sm:grid-cols-2">

                    <div className="rounded-xl bg-gray-50 p-4">
                      📅 {form.date || "Event date"}
                    </div>

                    <div className="rounded-xl bg-gray-50 p-4">
                      ◷ {form.time || "Event time"}
                    </div>

                    <div className="rounded-xl bg-gray-50 p-4">
                      📍 {form.location || "Location"}
                    </div>

                    <div className="rounded-xl bg-gray-50 p-4">
                      🎪 {form.venue || "Venue"}
                    </div>

                  </div>

                </div>

              </div>

              {/* APPROVAL NOTICE */}
              <div className="mt-6 rounded-2xl border border-yellow-200 bg-yellow-50 p-5">

                <div className="flex gap-3">

                  <span className="text-xl">
                    ⏳
                  </span>

                  <div>
                    <h4 className="font-bold text-yellow-900">
                      Submit for approval
                    </h4>

                    <p className="mt-1 text-sm leading-6 text-yellow-800">
                      Your event will be reviewed by the PRAPT admin team
                      before it becomes publicly available.
                    </p>
                  </div>

                </div>

              </div>

            </section>
          )}

          {/* FOOTER ACTIONS */}
          <div className="mt-10 flex items-center justify-between border-t pt-6">

            {step > 1 ? (
              <button
                onClick={previousStep}
                className="rounded-xl border px-5 py-3 font-semibold hover:bg-gray-50"
              >
                ← Previous
              </button>
            ) : (
              <Link
                to="/organizer/events"
                className="rounded-xl border px-5 py-3 font-semibold hover:bg-gray-50"
              >
                Cancel
              </Link>
            )}

            {step < 4 ? (
              <button
                onClick={nextStep}
                className="rounded-xl bg-black px-6 py-3 font-bold text-white hover:bg-gray-800"
              >
                Continue →
              </button>
            ) : (
              <button
                onClick={submitEvent}
                className="rounded-xl bg-black px-6 py-3 font-bold text-white hover:bg-gray-800"
              >
                Submit for Approval ✓
              </button>
            )}

          </div>

        </div>

      </main>

    </div>
  );
}