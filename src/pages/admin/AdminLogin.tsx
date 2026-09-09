import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LockKeyhole, Mail, Eye, EyeOff } from "lucide-react";

export default function AdminLogin() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    // UI demo only
    navigate("/admin");
  };

  return (
    <main className="flex min-h-screen bg-gray-50">

      {/* LEFT SIDE */}
      <section className="hidden flex-1 bg-black p-12 text-white lg:flex lg:flex-col lg:justify-between">

        <div>
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-lg font-black text-black">
              P
            </div>

            <div>
              <p className="text-xl font-black">
                PRAPT
              </p>

              <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-gray-400">
                Admin Portal
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-xl">

          <span className="rounded-full border border-white/20 px-4 py-2 text-xs font-semibold text-gray-300">
            ADMIN CONTROL CENTER
          </span>

          <h1 className="mt-7 text-5xl font-black leading-tight">
            Manage every
            <br />
            experience.
          </h1>

          <p className="mt-6 max-w-md text-base leading-7 text-gray-400">
            Manage events, organizers, customers, tickets,
            payments and platform activity from one place.
          </p>

        </div>

        <p className="text-sm text-gray-500">
          © 2026 PRAPT. All rights reserved.
        </p>

      </section>

      {/* LOGIN */}
      <section className="flex w-full items-center justify-center px-6 py-12 lg:w-[520px] lg:px-12">

        <div className="w-full max-w-md">

          <div className="mb-10 lg:hidden">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-black font-black text-white">
                P
              </div>

              <div>
                <p className="font-black">
                  PRAPT
                </p>
                <p className="text-[9px] font-bold uppercase tracking-widest text-gray-400">
                  Admin Portal
                </p>
              </div>
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold text-gray-500">
              Welcome back
            </p>

            <h2 className="mt-2 text-3xl font-black">
              Admin Login
            </h2>

            <p className="mt-2 text-sm leading-6 text-gray-500">
              Sign in to access the PRAPT administration portal.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="mt-8 space-y-5"
          >

            {/* EMAIL */}
            <div>
              <label className="mb-2 block text-sm font-semibold">
                Email address
              </label>

              <div className="relative">

                <Mail
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="email"
                  required
                  placeholder="admin@prapt.com"
                  className="h-12 w-full rounded-xl border border-gray-200 bg-white pl-11 pr-4 text-sm outline-none transition focus:border-black focus:ring-2 focus:ring-black/5"
                />

              </div>
            </div>

            {/* PASSWORD */}
            <div>

              <div className="mb-2 flex items-center justify-between">
                <label className="text-sm font-semibold">
                  Password
                </label>

                <button
                  type="button"
                  className="text-xs font-semibold text-gray-500 hover:text-black"
                >
                  Forgot password?
                </button>
              </div>

              <div className="relative">

                <LockKeyhole
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="Enter your password"
                  className="h-12 w-full rounded-xl border border-gray-200 bg-white pl-11 pr-12 text-sm outline-none transition focus:border-black focus:ring-2 focus:ring-black/5"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black"
                >
                  {showPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>

              </div>

            </div>

            {/* REMEMBER */}
            <label className="flex items-center gap-2 text-sm text-gray-600">
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300"
              />
              Remember me
            </label>

            <button
              type="submit"
              className="h-12 w-full rounded-xl bg-black font-bold text-white transition hover:bg-gray-800 active:scale-[0.99]"
            >
              Sign in to Admin
            </button>

          </form>

          <div className="mt-8 border-t border-gray-200 pt-6 text-center">
            <Link
              to="/"
              className="text-sm font-semibold text-gray-500 hover:text-black"
            >
              ← Back to PRAPT website
            </Link>
          </div>

        </div>

      </section>

    </main>
  );
}