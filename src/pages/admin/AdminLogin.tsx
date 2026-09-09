import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // UI DEMO ONLY
    navigate("/admin");
  };

  return (
    <main className="flex min-h-screen bg-[#f7f7f8]">

      {/* LEFT */}
      <section className="hidden w-1/2 bg-black p-12 text-white lg:flex lg:flex-col lg:justify-between">

        <div>
          <h1 className="text-3xl font-black">
            PRAPT
          </h1>

          <p className="mt-1 text-xs font-bold uppercase tracking-[0.25em] text-gray-500">
            Admin Portal
          </p>
        </div>

        <div className="max-w-lg">

          <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-2xl font-black text-black">
            P
          </div>

          <h2 className="text-5xl font-black leading-tight">
            Manage every
            <br />
            experience.
          </h2>

          <p className="mt-6 max-w-md leading-7 text-gray-400">
            Control events, organizers, customers, orders and platform
            operations from one secure dashboard.
          </p>

        </div>

        <p className="text-sm text-gray-500">
          © 2026 PRAPT. All rights reserved.
        </p>

      </section>

      {/* RIGHT */}
      <section className="flex w-full items-center justify-center px-6 py-12 lg:w-1/2">

        <div className="w-full max-w-md">

          {/* MOBILE LOGO */}
          <div className="mb-10 lg:hidden">
            <h1 className="text-3xl font-black">
              PRAPT
            </h1>

            <p className="mt-1 text-xs font-bold uppercase tracking-widest text-gray-400">
              Admin Portal
            </p>
          </div>

          <div className="mb-8">

            <p className="text-sm font-bold uppercase tracking-wider text-gray-400">
              Welcome back
            </p>

            <h2 className="mt-2 text-3xl font-black">
              Admin Sign In
            </h2>

            <p className="mt-2 text-gray-500">
              Sign in to manage the PRAPT platform.
            </p>

          </div>

          <form
            onSubmit={handleLogin}
            className="rounded-2xl border bg-white p-6 shadow-sm md:p-8"
          >

            {/* EMAIL */}
            <div>
              <label className="text-sm font-bold">
                Email address
              </label>

              <input
                type="email"
                placeholder="admin@example.com"
                required
                className="mt-2 h-12 w-full rounded-xl border px-4 text-sm outline-none transition focus:border-black focus:ring-1 focus:ring-black"
              />
            </div>

            {/* PASSWORD */}
            <div className="mt-5">

              <div className="flex items-center justify-between">

                <label className="text-sm font-bold">
                  Password
                </label>

                <button
                  type="button"
                  className="text-xs font-semibold text-gray-500 hover:text-black"
                >
                  Forgot password?
                </button>

              </div>

              <div className="relative mt-2">

                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  required
                  className="h-12 w-full rounded-xl border px-4 pr-12 text-sm outline-none transition focus:border-black focus:ring-1 focus:ring-black"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-400 hover:text-black"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>

              </div>

            </div>

            {/* REMEMBER */}
            <label className="mt-5 flex cursor-pointer items-center gap-2 text-sm text-gray-600">

              <input
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300"
              />

              Remember me

            </label>

            <button
              type="submit"
              className="mt-6 h-12 w-full rounded-xl bg-black font-bold text-white transition hover:bg-gray-800"
            >
              Sign In →
            </button>

          </form>

          <div className="mt-6 text-center">

            <Link
              to="/"
              className="text-sm font-semibold text-gray-500 hover:text-black"
            >
              ← Back to PRAPT website
            </Link>

          </div>

          <p className="mt-8 text-center text-xs leading-5 text-gray-400">
            Secure administrator access.
            <br />
            Authentication will be connected to the backend.
          </p>

        </div>

      </section>

    </main>
  );
}