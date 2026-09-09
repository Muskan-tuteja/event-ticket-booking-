import { useState } from "react";
import { Link } from "react-router-dom";

export default function Settings() {
  const [activeTab, setActiveTab] = useState("Profile");

  const tabs = ["Profile", "Organization", "Notifications", "Security"];

  return (
    <div className="min-h-screen bg-[#f7f7f8] text-gray-900">

      {/* HEADER */}
      <header className="sticky top-0 z-30 border-b bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 md:px-10">

          <div className="flex items-center gap-4">
            <Link
              to="/organizer"
              className="flex h-10 w-10 items-center justify-center rounded-xl border text-lg transition hover:bg-gray-50"
            >
              ←
            </Link>

            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-gray-400">
                Organizer Portal
              </p>

              <h1 className="text-xl font-black">
                Settings
              </h1>
            </div>
          </div>

          <div className="hidden items-center gap-3 sm:flex">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-black text-sm font-bold text-white">
              P
            </div>

            <div>
              <p className="text-sm font-bold">PRAPT Events</p>
              <p className="text-xs text-gray-400">Organizer</p>
            </div>
          </div>

        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-8 md:px-10">

        {/* TITLE */}
        <div>
          <h2 className="text-3xl font-black md:text-4xl">
            Account Settings
          </h2>

          <p className="mt-2 text-gray-500">
            Manage your organizer account and preferences.
          </p>
        </div>

        {/* SETTINGS LAYOUT */}
        <div className="mt-8 grid gap-6 lg:grid-cols-[230px_1fr]">

          {/* SIDEBAR */}
          <aside className="h-fit rounded-2xl border bg-white p-2">

            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-semibold transition ${
                  activeTab === tab
                    ? "bg-black text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <span>
                  {tab === "Profile" && "👤"}
                  {tab === "Organization" && "🏢"}
                  {tab === "Notifications" && "🔔"}
                  {tab === "Security" && "🔒"}
                </span>

                {tab}
              </button>
            ))}

          </aside>

          {/* CONTENT */}
          <section>

            {/* PROFILE */}
            {activeTab === "Profile" && (
              <div className="space-y-6">

                <SettingsCard
                  title="Profile"
                  description="Update your personal organizer information."
                >

                  <div className="flex flex-col gap-6 sm:flex-row sm:items-center">

                    <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-black text-2xl font-black text-white">
                      P
                    </div>

                    <div>
                      <h3 className="font-bold">
                        Profile photo
                      </h3>

                      <p className="mt-1 text-sm text-gray-500">
                        JPG, PNG or WEBP. Maximum 2MB.
                      </p>

                      <button className="mt-3 rounded-lg border px-4 py-2 text-sm font-semibold hover:bg-gray-50">
                        Upload Photo
                      </button>
                    </div>

                  </div>

                  <div className="mt-8 grid gap-5 sm:grid-cols-2">

                    <Input
                      label="Organizer Name"
                      value="PRAPT Events"
                    />

                    <Input
                      label="Email Address"
                      value="organizer@example.com"
                      type="email"
                    />

                    <Input
                      label="Phone Number"
                      value="+91 98765 43210"
                    />

                    <Input
                      label="City"
                      value="Gurugram"
                    />

                  </div>

                  <div className="mt-6">
                    <label className="text-sm font-bold">
                      About Organizer
                    </label>

                    <textarea
                      defaultValue="We organize music, technology and entertainment events."
                      rows={4}
                      className="mt-2 w-full resize-none rounded-xl border bg-white px-4 py-3 text-sm outline-none transition focus:border-black"
                    />
                  </div>

                  <SaveButton />

                </SettingsCard>

              </div>
            )}

            {/* ORGANIZATION */}
            {activeTab === "Organization" && (
              <SettingsCard
                title="Organization"
                description="Manage your event organization details."
              >

                <div className="grid gap-5 sm:grid-cols-2">

                  <Input
                    label="Organization Name"
                    value="PRAPT Events"
                  />

                  <Input
                    label="Organization Email"
                    value="events@prapt.com"
                  />

                  <Input
                    label="Website"
                    value="www.prapt.com"
                  />

                  <Input
                    label="GST / Tax ID"
                    value="Not added"
                  />

                </div>

                <div className="mt-6">

                  <label className="text-sm font-bold">
                    Organization Address
                  </label>

                  <textarea
                    defaultValue="Gurugram, Haryana, India"
                    rows={3}
                    className="mt-2 w-full resize-none rounded-xl border px-4 py-3 text-sm outline-none focus:border-black"
                  />

                </div>

                <SaveButton />

              </SettingsCard>
            )}

            {/* NOTIFICATIONS */}
            {activeTab === "Notifications" && (
              <SettingsCard
                title="Notifications"
                description="Choose which notifications you want to receive."
              >

                <div className="divide-y">

                  <Toggle
                    title="New ticket sales"
                    description="Get notified whenever someone purchases a ticket."
                    defaultChecked
                  />

                  <Toggle
                    title="Event approval updates"
                    description="Receive updates when your event is approved or rejected."
                    defaultChecked
                  />

                  <Toggle
                    title="Attendee check-ins"
                    description="Get updates about attendee check-ins."
                    defaultChecked
                  />

                  <Toggle
                    title="Marketing emails"
                    description="Receive tips and promotional updates from PRAPT."
                  />

                </div>

              </SettingsCard>
            )}

            {/* SECURITY */}
            {activeTab === "Security" && (
              <div className="space-y-6">

                <SettingsCard
                  title="Password"
                  description="Keep your organizer account secure."
                >

                  <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

                    <div>
                      <p className="font-bold">
                        Password
                      </p>

                      <p className="mt-1 text-sm text-gray-500">
                        Last changed 30 days ago
                      </p>
                    </div>

                    <button className="rounded-xl border px-5 py-3 text-sm font-bold hover:bg-gray-50">
                      Change Password
                    </button>

                  </div>

                </SettingsCard>

                <SettingsCard
                  title="Two-factor authentication"
                  description="Add an extra layer of security to your account."
                >

                  <div className="flex items-center justify-between gap-4">

                    <div>
                      <p className="font-bold">
                        Two-factor authentication
                      </p>

                      <p className="mt-1 text-sm text-gray-500">
                        Protect your account with an additional verification step.
                      </p>
                    </div>

                    <button className="rounded-xl border px-5 py-3 text-sm font-bold hover:bg-gray-50">
                      Enable
                    </button>

                  </div>

                </SettingsCard>

                <div className="rounded-2xl border border-red-200 bg-red-50 p-6">

                  <h3 className="font-black text-red-700">
                    Danger Zone
                  </h3>

                  <p className="mt-2 text-sm text-red-600">
                    Deleting your organizer account is permanent and cannot be undone.
                  </p>

                  <button className="mt-5 rounded-xl border border-red-300 bg-white px-5 py-3 text-sm font-bold text-red-600 hover:bg-red-100">
                    Delete Account
                  </button>

                </div>

              </div>
            )}

          </section>

        </div>

      </main>
    </div>
  );
}

/* ---------------- COMPONENTS ---------------- */

function SettingsCard({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">

      <div className="border-b p-6">
        <h3 className="text-lg font-black">
          {title}
        </h3>

        <p className="mt-1 text-sm text-gray-500">
          {description}
        </p>
      </div>

      <div className="p-6">
        {children}
      </div>

    </div>
  );
}

function Input({
  label,
  value,
  type = "text",
}: {
  label: string;
  value: string;
  type?: string;
}) {
  return (
    <div>
      <label className="text-sm font-bold">
        {label}
      </label>

      <input
        type={type}
        defaultValue={value}
        className="mt-2 h-12 w-full rounded-xl border bg-white px-4 text-sm outline-none transition focus:border-black focus:ring-1 focus:ring-black"
      />
    </div>
  );
}

function SaveButton() {
  return (
    <div className="mt-8 flex justify-end border-t pt-6">
      <button className="rounded-xl bg-black px-6 py-3 text-sm font-bold text-white transition hover:bg-gray-800">
        Save Changes
      </button>
    </div>
  );
}

function Toggle({
  title,
  description,
  defaultChecked = false,
}: {
  title: string;
  description: string;
  defaultChecked?: boolean;
}) {
  const [enabled, setEnabled] = useState(defaultChecked);

  return (
    <div className="flex items-center justify-between gap-5 py-5">

      <div>
        <p className="font-bold">
          {title}
        </p>

        <p className="mt-1 max-w-xl text-sm text-gray-500">
          {description}
        </p>
      </div>

      <button
        onClick={() => setEnabled(!enabled)}
        className={`relative h-7 w-12 shrink-0 rounded-full transition ${
          enabled ? "bg-black" : "bg-gray-200"
        }`}
      >
        <span
          className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow-sm transition ${
            enabled ? "left-6" : "left-1"
          }`}
        />
      </button>

    </div>
  );
}