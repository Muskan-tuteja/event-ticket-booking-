
import { Link } from "react-router-dom";
import { useState } from "react";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");

  const passwordStrength =
    password.length === 0
      ? ""
      : password.length < 6
      ? "Weak"
      : password.length < 10
      ? "Good"
      : "Strong";

  return (
    <main className="min-h-screen bg-[#f7f7f8]">

      <div className="grid min-h-screen lg:grid-cols-2">

        {/* =====================================================
            LEFT — BRAND / VISUAL
        ===================================================== */}

        <div className="relative hidden overflow-hidden bg-[#09090b] lg:flex">

          {/* Background glow */}
          <div className="absolute -left-32 -top-32 h-[500px] w-[500px] rounded-full bg-violet-600/20 blur-[120px]" />

          <div className="absolute -bottom-40 -right-20 h-[450px] w-[450px] rounded-full bg-blue-500/10 blur-[110px]" />

          {/* Grid */}
          <div className="absolute inset-0 opacity-[0.04] [background-image:linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] [background-size:60px_60px]" />

          <div className="relative z-10 flex w-full flex-col justify-between p-12 xl:p-16">

            {/* Logo */}
            <Link
              to="/"
              className="text-2xl font-black tracking-tight text-white"
            >
              PRAPT<span className="text-violet-500">.</span>
            </Link>

            {/* Main content */}
            <div className="max-w-lg">

              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-xl">
                ✦
              </div>

              <h1 className="text-5xl font-black leading-[1.05] tracking-tight text-white xl:text-6xl">
                Discover more.
                <br />

                <span className="text-gray-500">
                  Experience more.
                </span>
              </h1>

              <p className="mt-6 max-w-md text-base leading-7 text-gray-400">
                Create your PRAPT account and start discovering
                concerts, workshops, comedy shows and experiences
                happening around you.
              </p>

              {/* Benefits */}
              <div className="mt-9 space-y-4">

                {[
                  "Discover events around you",
                  "Book tickets instantly",
                  "Keep all your tickets in one place",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 text-sm text-gray-300"
                  >
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-xs text-white">
                      ✓
                    </span>

                    {item}
                  </div>
                ))}

              </div>
            </div>

            {/* Bottom */}
            <p className="text-xs text-gray-600">
              Discover. Book. Experience.
            </p>

          </div>
        </div>

        {/* =====================================================
            RIGHT — REGISTER FORM
        ===================================================== */}

        <div className="flex items-center justify-center px-5 py-10 sm:px-8">

          <div className="w-full max-w-md">

            {/* Mobile Logo */}
            <div className="mb-9 text-center lg:hidden">
              <Link
                to="/"
                className="text-3xl font-black tracking-tight"
              >
                PRAPT<span className="text-violet-600">.</span>
              </Link>
            </div>

            {/* Heading */}
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-violet-600">
                Get started
              </p>

              <h2 className="mt-3 text-4xl font-black tracking-tight">
                Create your account
              </h2>

              <p className="mt-3 text-sm leading-6 text-gray-500">
                Join PRAPT and start discovering amazing events.
              </p>
            </div>

            {/* Form */}
            <form className="mt-9 space-y-5">

              {/* Full Name */}
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-bold text-gray-800"
                >
                  Full name
                </label>

                <div className="relative">
                  <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                    ◯
                  </span>

                  <input
                    id="name"
                    type="text"
                    placeholder="Enter your full name"
                    autoComplete="name"
                    className="w-full rounded-2xl border border-gray-200 bg-white py-3.5 pl-11 pr-4 text-sm outline-none transition duration-200 placeholder:text-gray-400 focus:border-black focus:ring-4 focus:ring-gray-100"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-bold text-gray-800"
                >
                  Email address
                </label>

                <div className="relative">
                  <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                    @
                  </span>

                  <input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    autoComplete="email"
                    className="w-full rounded-2xl border border-gray-200 bg-white py-3.5 pl-11 pr-4 text-sm outline-none transition duration-200 placeholder:text-gray-400 focus:border-black focus:ring-4 focus:ring-gray-100"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="text-sm font-bold text-gray-800"
                  >
                    Password
                  </label>

                  {passwordStrength && (
                    <span
                      className={`text-xs font-bold ${
                        passwordStrength === "Strong"
                          ? "text-emerald-600"
                          : passwordStrength === "Good"
                          ? "text-amber-600"
                          : "text-red-500"
                      }`}
                    >
                      {passwordStrength}
                    </span>
                  )}
                </div>

                <div className="relative">
                  <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                    •••
                  </span>

                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a password"
                    autoComplete="new-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-2xl border border-gray-200 bg-white py-3.5 pl-11 pr-14 text-sm outline-none transition duration-200 placeholder:text-gray-400 focus:border-black focus:ring-4 focus:ring-gray-100"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-400 transition hover:text-black"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>

                {/* Password requirements */}
                <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2">
                  <span
                    className={`text-xs ${
                      password.length >= 8
                        ? "text-emerald-600"
                        : "text-gray-400"
                    }`}
                  >
                    {password.length >= 8 ? "✓" : "○"} 8+ characters
                  </span>

                  <span
                    className={`text-xs ${
                      /[A-Z]/.test(password)
                        ? "text-emerald-600"
                        : "text-gray-400"
                    }`}
                  >
                    {/[A-Z]/.test(password) ? "✓" : "○"} Uppercase
                  </span>

                  <span
                    className={`text-xs ${
                      /[0-9]/.test(password)
                        ? "text-emerald-600"
                        : "text-gray-400"
                    }`}
                  >
                    {/[0-9]/.test(password) ? "✓" : "○"} Number
                  </span>
                </div>
              </div>

              {/* Terms */}
              <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-gray-100 bg-gray-50 p-4">
                <input
                  type="checkbox"
                  className="mt-0.5 h-4 w-4 shrink-0 rounded border-gray-300 accent-black"
                />

                <span className="text-xs leading-5 text-gray-500">
                  I agree to PRAPT's{" "}
                  <button
                    type="button"
                    className="font-bold text-black underline underline-offset-2"
                  >
                    Terms of Service
                  </button>{" "}
                  and{" "}
                  <button
                    type="button"
                    className="font-bold text-black underline underline-offset-2"
                  >
                    Privacy Policy
                  </button>
                  .
                </span>
              </label>

              {/* Create Account */}
              <button
                type="button"
                className="group flex w-full items-center justify-center rounded-2xl bg-[#09090b] py-4 text-sm font-bold text-white shadow-lg transition duration-300 hover:-translate-y-0.5 hover:bg-violet-600 hover:shadow-xl"
              >
                Create Account

                <span className="ml-2 transition group-hover:translate-x-1">
                  →
                </span>
              </button>

            </form>

            {/* Login */}
            <div className="mt-7 rounded-2xl border border-gray-200 bg-white p-5 text-center">
              <p className="text-sm text-gray-500">
                Already have an account?
              </p>

              <Link
                to="/login"
                className="mt-2 inline-block text-sm font-black text-black underline underline-offset-4 transition hover:text-violet-600"
              >
                Login to PRAPT →
              </Link>
            </div>

            {/* Footer */}
            <p className="mt-7 text-center text-xs text-gray-400">
              Your account is protected with secure authentication.
            </p>

          </div>
        </div>

      </div>
    </main>
  );
}
