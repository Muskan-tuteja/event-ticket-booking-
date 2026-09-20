import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  Building2,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  CalendarDays,
  Ticket,
  BarChart3,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function OrganizerLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        `${API_URL}/api/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email.trim().toLowerCase(),
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Login failed"
        );
      }

      /* =====================================================
         CHECK ROLE
      ===================================================== */

      if (data.user?.role !== "organizer") {
        setError(
          "This account is not registered as an Organizer. Please use the correct account."
        );
        return;
      }

      /* =====================================================
         SAVE LOGIN SESSION
      ===================================================== */

      if (data.session?.access_token) {
        localStorage.setItem(
          "prapt_access_token",
          data.session.access_token
        );

        sessionStorage.setItem(
          "prapt_access_token",
          data.session.access_token
        );
      }

      localStorage.setItem(
        "organizerLoggedIn",
        "true"
      );

      localStorage.setItem(
        "organizerEmail",
        data.user.email
      );

      localStorage.setItem(
        "organizerUser",
        JSON.stringify(data.user)
      );

      /* =====================================================
         REDIRECT
      ===================================================== */

      navigate("/organizer/dashboard");

    } catch (err) {
      setError(
        err?.message ||
          "Unable to login. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f6f7fb] text-slate-900">

      <div className="mx-auto flex min-h-screen max-w-[1600px]">

        {/* ===================================================
            LEFT BRAND SECTION
        =================================================== */}

        <div className="relative hidden overflow-hidden bg-black lg:flex lg:w-[46%]">

          {/* Glow */}
          <div className="absolute -left-32 -top-32 h-[420px] w-[420px] rounded-full bg-violet-600/30 blur-[110px]" />

          <div className="absolute -bottom-40 -right-20 h-[420px] w-[420px] rounded-full bg-indigo-500/20 blur-[110px]" />

          {/* Grid */}
          <div
            className="absolute inset-0 opacity-[0.08]"
            style={{
              backgroundImage:
                "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
              backgroundSize: "45px 45px",
            }}
          />

          <div className="relative z-10 flex w-full flex-col justify-between p-12 xl:p-16">

            {/* Logo */}
            <div className="flex items-center gap-3">

              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-xl font-black text-black shadow-xl">
                P
              </div>

              <div>
                <div className="text-xl font-black tracking-tight text-white">
                  PRAPT
                </div>

                <div className="text-xs text-white/45">
                  Event Ticketing Platform
                </div>
              </div>

            </div>

            {/* Main Content */}
            <div className="max-w-xl">

              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-white/70 backdrop-blur">

                <span className="h-2 w-2 rounded-full bg-emerald-400" />

                Organizer Dashboard

              </div>

              <h1 className="text-5xl font-black leading-[1.05] tracking-tight text-white xl:text-6xl">

                Your events.
                <span className="block text-violet-400">
                  One powerful dashboard.
                </span>

              </h1>

              <p className="mt-6 max-w-lg text-base leading-7 text-white/55">

                Manage your events, tickets, attendees and
                performance from one simple platform.

              </p>

              {/* Features */}
              <div className="mt-10 grid gap-4 sm:grid-cols-2">

                <Feature
                  icon={<CalendarDays size={18} />}
                  title="Manage Events"
                  text="Create and update your events."
                />

                <Feature
                  icon={<Ticket size={18} />}
                  title="Ticket Sales"
                  text="Track ticket sales in real time."
                />

                <Feature
                  icon={<BarChart3 size={18} />}
                  title="Analytics"
                  text="Understand your event performance."
                />

                <Feature
                  icon={<ShieldCheck size={18} />}
                  title="Secure Access"
                  text="Protected organizer account access."
                />

              </div>

            </div>

            {/* Footer */}
            <div className="flex items-center gap-3 text-sm text-white/40">

              <CheckCircle2 size={16} />

              <span>
                Everything you need to run your events.
              </span>

            </div>

          </div>
        </div>

        {/* ===================================================
            RIGHT LOGIN SECTION
        =================================================== */}

        <div className="flex w-full items-center justify-center px-5 py-10 lg:w-[54%] lg:px-10">

          <div className="w-full max-w-[520px]">

            {/* Mobile Logo */}
            <div className="mb-8 flex items-center gap-3 lg:hidden">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-black font-black text-white">
                P
              </div>

              <div>
                <div className="font-black">
                  PRAPT
                </div>

                <div className="text-xs text-slate-400">
                  Event Ticketing Platform
                </div>
              </div>

            </div>

            {/* Header */}
            <div className="mb-8">

              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-violet-100 bg-violet-50 px-3 py-1.5 text-xs font-bold text-violet-600">

                <Building2 size={14} />

                Organizer Login

              </div>

              <h2 className="text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">

                Welcome back

              </h2>

              <p className="mt-3 text-sm leading-6 text-slate-500">

                Sign in to manage your events, tickets and
                attendees.

              </p>

            </div>

            {/* Login Card */}
            <div className="rounded-[28px] border border-slate-200/80 bg-white p-6 shadow-[0_25px_70px_-30px_rgba(15,23,42,0.25)] sm:p-8">

              {/* Error */}
              {error && (
                <div className="mb-6 flex items-start gap-3 rounded-2xl border border-red-100 bg-red-50 p-4 text-sm text-red-600">

                  <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
                    !
                  </div>

                  <span className="leading-5">
                    {error}
                  </span>

                </div>
              )}

              <form
                onSubmit={handleLogin}
                className="space-y-5"
              >

                {/* Email */}
                <div>

                  <label className="mb-2 block text-sm font-bold text-slate-800">
                    Email Address
                  </label>

                  <div className="flex h-13 items-center rounded-2xl border border-slate-200 bg-slate-50/50 px-4 transition focus-within:border-violet-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-violet-500/10">

                    <Mail
                      size={18}
                      className="mr-3 shrink-0 text-slate-400"
                    />

                    <input
                      type="email"
                      value={email}
                      onChange={(e) =>
                        setEmail(e.target.value)
                      }
                      placeholder="you@example.com"
                      disabled={loading}
                      className="w-full bg-transparent text-sm font-medium text-slate-900 outline-none placeholder:text-slate-400 disabled:cursor-not-allowed"
                    />

                  </div>

                </div>

                {/* Password */}
                <div>

                  <div className="mb-2 flex items-center justify-between">

                    <label className="block text-sm font-bold text-slate-800">
                      Password
                    </label>

                    <button
                      type="button"
                      className="text-xs font-semibold text-violet-600 transition hover:text-violet-700"
                      onClick={() => {
                        alert(
                          "Password reset will be available soon."
                        );
                      }}
                    >
                      Forgot password?
                    </button>

                  </div>

                  <div className="flex h-13 items-center rounded-2xl border border-slate-200 bg-slate-50/50 px-4 transition focus-within:border-violet-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-violet-500/10">

                    <Lock
                      size={18}
                      className="mr-3 shrink-0 text-slate-400"
                    />

                    <input
                      type={
                        showPassword
                          ? "text"
                          : "password"
                      }
                      value={password}
                      onChange={(e) =>
                        setPassword(e.target.value)
                      }
                      placeholder="Enter your password"
                      disabled={loading}
                      className="w-full bg-transparent text-sm font-medium text-slate-900 outline-none placeholder:text-slate-400 disabled:cursor-not-allowed"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword(!showPassword)
                      }
                      className="ml-2 text-slate-400 transition hover:text-slate-800"
                    >
                      {showPassword ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>

                  </div>

                </div>

                {/* Remember */}
                <div className="flex items-center gap-2">

                  <input
                    id="remember"
                    type="checkbox"
                    className="h-4 w-4 rounded border-slate-300 accent-violet-600"
                  />

                  <label
                    htmlFor="remember"
                    className="text-xs font-medium text-slate-500"
                  >
                    Keep me signed in
                  </label>

                </div>

                {/* Login Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="group flex h-14 w-full items-center justify-center gap-3 rounded-2xl bg-slate-950 text-sm font-bold text-white shadow-lg shadow-slate-950/10 transition duration-300 hover:-translate-y-0.5 hover:bg-violet-600 hover:shadow-xl hover:shadow-violet-600/20 disabled:cursor-not-allowed disabled:opacity-60"
                >

                  {loading ? (
                    <>
                      <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                      Signing in...
                    </>
                  ) : (
                    <>
                      Login as Organizer

                      <ArrowRight
                        size={18}
                        className="transition-transform duration-300 group-hover:translate-x-1"
                      />
                    </>
                  )}

                </button>

              </form>

              {/* Divider */}
              <div className="my-7 flex items-center gap-4">

                <div className="h-px flex-1 bg-slate-100" />

                <span className="text-xs font-medium text-slate-400">
                  New to PRAPT?
                </span>

                <div className="h-px flex-1 bg-slate-100" />

              </div>

              {/* Register */}
              <Link
                to="/organizer/register"
                className="flex h-12 w-full items-center justify-center rounded-2xl border border-slate-200 bg-white text-sm font-bold text-slate-800 transition hover:border-slate-300 hover:bg-slate-50"
              >
                Create Organizer Account
              </Link>

              {/* Security */}
              <div className="mt-6 flex items-center justify-center gap-2 text-xs text-slate-400">

                <ShieldCheck size={14} />

                Secure organizer authentication

              </div>

            </div>

            {/* Back */}
            <Link
              to="/"
              className="mt-6 flex items-center justify-center text-sm font-medium text-slate-400 transition hover:text-slate-900"
            >
              ← Back to PRAPT website
            </Link>

          </div>
        </div>

      </div>
    </div>
  );
}

/* =========================================================
   FEATURE COMPONENT
========================================================= */

function Feature({ icon, title, text }) {
  return (
    <div className="group flex gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur transition hover:bg-white/[0.08]">

      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/10 text-violet-300">
        {icon}
      </div>

      <div>
        <h3 className="text-sm font-bold text-white">
          {title}
        </h3>

        <p className="mt-1 text-xs leading-5 text-white/40">
          {text}
        </p>
      </div>

    </div>
  );
}