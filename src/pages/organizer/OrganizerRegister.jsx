import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  Building2,
  User,
  Mail,
  Phone,
  Lock,
  Eye,
  EyeOff,
  CalendarDays,
  Ticket,
  BarChart3,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function OrganizerRegister() {
  const navigate = useNavigate();

  const [businessName, setBusinessName] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    const cleanBusinessName = businessName.trim();
    const cleanName = name.trim();
    const cleanEmail = email.trim().toLowerCase();
    const cleanPhone = phone.replace(/\D/g, "");

    if (
      !cleanBusinessName ||
      !cleanName ||
      !cleanEmail ||
      !cleanPhone ||
      !password
    ) {
      setError("Please fill in all required fields.");
      return;
    }

    if (cleanPhone.length !== 10) {
      setError("Please enter a valid 10-digit phone number.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(`${API_URL}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          business_name: cleanBusinessName,
          full_name: cleanName,
          email: cleanEmail,
          phone: cleanPhone,
          password,
          role: "organizer",
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || "Organizer registration failed.");
      }

      setSuccess(
        "Organizer account created successfully. Redirecting to login..."
      );

      setTimeout(() => {
        navigate("/organizer/login");
      }, 1200);
    } catch (err) {
      console.error("Organizer registration error:", err);
      setError(err?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[100dvh] overflow-x-hidden bg-[#f6f7fb]">
      {/* AUTOFILL FIX + INPUT BASE STYLES */}
      <style>{`
        .register-input {
          width: 100%;
          min-width: 0;
          height: 100%;
          background: transparent;
          border: 0;
          outline: none;
          font-size: 16px; /* prevents iOS zoom on focus */
          color: #0f172a;
        }

        @media (min-width: 640px) {
          .register-input { font-size: 14px; }
        }

        .register-input::placeholder { color: #94a3b8; }
        .register-input:disabled { cursor: not-allowed; opacity: 0.6; }

        input:-webkit-autofill,
        input:-webkit-autofill:hover,
        input:-webkit-autofill:focus,
        input:-webkit-autofill:active {
          -webkit-box-shadow: 0 0 0 1000px #ffffff inset !important;
          -webkit-text-fill-color: #0f172a !important;
          caret-color: #0f172a !important;
          transition: background-color 9999s ease-in-out 0s;
        }

        input::selection {
          background: rgba(124, 58, 237, 0.18);
          color: #0f172a;
        }
      `}</style>

      <div className="grid min-h-[100dvh] lg:grid-cols-2">
        {/* ===================== LEFT BRAND SECTION (desktop) ===================== */}
        <section className="relative hidden overflow-hidden bg-[#08060d] lg:block">
          <div className="absolute -left-32 -top-32 h-[500px] w-[500px] rounded-full bg-violet-700/25 blur-[120px]" />
          <div className="absolute -bottom-40 -right-32 h-[500px] w-[500px] rounded-full bg-fuchsia-600/15 blur-[120px]" />

          <div
            className="absolute inset-0 opacity-[0.10]"
            style={{
              backgroundImage: `
                linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)
              `,
              backgroundSize: "48px 48px",
            }}
          />

          <div className="relative z-10 flex min-h-[100dvh] flex-col px-8 py-8 xl:px-16 xl:py-10">
            {/* Brand */}
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-xl font-black text-black shadow-2xl">
                P
              </div>

              <div>
                <h2 className="text-lg font-black tracking-tight text-white">
                  PRAPT
                </h2>
                <p className="text-xs text-white/45">Event Ticketing Platform</p>
              </div>
            </div>

            {/* Hero */}
            <div className="my-auto max-w-xl py-10">
              <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-xs font-semibold text-white/75 backdrop-blur-xl">
                <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.9)]" />
                Built for modern event organizers
              </div>

              <h1 className="text-4xl font-black leading-[1.05] tracking-[-0.04em] text-white xl:text-6xl">
                Turn your events
                <br />
                <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-fuchsia-400 bg-clip-text text-transparent">
                  into experiences.
                </span>
              </h1>

              <p className="mt-6 max-w-lg text-sm leading-7 text-white/55 xl:mt-7 xl:text-base">
                Create events, manage tickets, track attendees and grow your
                audience — all from one powerful organizer dashboard.
              </p>

              <div className="mt-8 grid max-w-2xl grid-cols-2 gap-3 xl:mt-10 xl:gap-4">
                <FeatureCard
                  icon={<CalendarDays size={19} />}
                  title="Create Events"
                  text="Launch and manage events easily."
                />
                <FeatureCard
                  icon={<Ticket size={19} />}
                  title="Manage Tickets"
                  text="Control ticket types and sales."
                />
                <FeatureCard
                  icon={<BarChart3 size={19} />}
                  title="Track Sales"
                  text="Monitor performance in real time."
                />
                <FeatureCard
                  icon={<CheckCircle2 size={19} />}
                  title="Manage Attendees"
                  text="Keep your guest list organized."
                />
              </div>
            </div>

            {/* Bottom */}
            <div className="flex items-center justify-between border-t border-white/10 pt-6 text-xs text-white/35">
              <span>© PRAPT</span>
              <span>Event management made simple.</span>
            </div>
          </div>
        </section>

        {/* ===================== RIGHT REGISTER SECTION ===================== */}
        <section className="flex min-h-[100dvh] items-start justify-center px-4 py-6 sm:items-center sm:px-8 sm:py-8 lg:px-12">
          <div className="w-full max-w-[560px]">
            {/* Mobile / tablet brand (left panel is hidden below lg) */}
            <div className="mb-6 flex items-center gap-3 lg:hidden">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-950 text-lg font-black text-white shadow-lg">
                P
              </div>
              <div>
                <h2 className="text-base font-black leading-none tracking-tight text-slate-950">
                  PRAPT
                </h2>
                <p className="mt-1 text-[11px] leading-none text-slate-400">
                  Event Ticketing Platform
                </p>
              </div>
            </div>

            {/* Header */}
            <div className="mb-5 sm:mb-6">
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-violet-100 bg-violet-50 px-3 py-1.5 text-[11px] font-bold text-violet-600 sm:mb-4 sm:px-3.5 sm:py-2 sm:text-xs">
                <Building2 size={14} />
                Organizer Registration
              </div>

              <h1 className="text-2xl font-black leading-tight tracking-[-0.035em] text-slate-950 sm:text-3xl lg:text-4xl">
                Create your organizer account
              </h1>

              <p className="mt-2 max-w-lg text-[13px] leading-6 text-slate-500 sm:text-sm">
                Register your organization and start managing your events with
                PRAPT.
              </p>
            </div>

            {/* Form Card */}
            <form
              onSubmit={handleRegister}
              className="rounded-3xl border border-slate-200 bg-white p-4 shadow-[0_20px_70px_rgba(15,23,42,0.08)] sm:rounded-[28px] sm:p-7"
            >
              {error && (
                <div className="mb-4 flex items-start gap-3 rounded-2xl border border-red-100 bg-red-50 px-3.5 py-3 text-[13px] text-red-600 sm:mb-5 sm:px-4 sm:py-3.5 sm:text-sm">
                  <div className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-red-500" />
                  <span className="break-words font-medium">{error}</span>
                </div>
              )}

              {success && (
                <div className="mb-4 flex items-start gap-3 rounded-2xl border border-emerald-100 bg-emerald-50 px-3.5 py-3 text-[13px] text-emerald-700 sm:mb-5 sm:px-4 sm:py-3.5 sm:text-sm">
                  <CheckCircle2 size={18} className="mt-0.5 shrink-0" />
                  <span className="break-words font-medium">{success}</span>
                </div>
              )}

              <div className="space-y-4">
                <InputField
                  label="Business / Organization Name"
                  icon={<Building2 size={18} />}
                >
                  <input
                    type="text"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    placeholder="Your business or organization name"
                    disabled={loading}
                    autoComplete="organization"
                    className="register-input"
                  />
                </InputField>

                <InputField label="Full Name" icon={<User size={18} />}>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your full name"
                    disabled={loading}
                    autoComplete="name"
                    className="register-input"
                  />
                </InputField>

                <InputField label="Email Address" icon={<Mail size={18} />}>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    disabled={loading}
                    autoComplete="email"
                    inputMode="email"
                    className="register-input"
                  />
                </InputField>

                {/* PHONE */}
                <div>
                  <label className="mb-2 block text-sm font-bold text-slate-900">
                    Phone Number
                  </label>

                  <div className="flex h-12 overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all duration-200 focus-within:border-violet-500 focus-within:ring-4 focus-within:ring-violet-500/10 sm:h-[54px]">
                    <div className="flex shrink-0 items-center gap-1.5 border-r border-slate-200 bg-slate-50 px-3 text-sm font-bold text-slate-600 sm:gap-2 sm:px-4">
                      <Phone size={16} className="text-slate-400" />
                      <span>+91</span>
                    </div>

                    <input
                      type="tel"
                      inputMode="numeric"
                      value={phone}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, "");
                        if (value.length <= 10) setPhone(value);
                      }}
                      placeholder="10-digit phone number"
                      maxLength={10}
                      disabled={loading}
                      autoComplete="tel"
                      className="register-input px-3 sm:px-4"
                    />
                  </div>
                </div>

                {/* PASSWORD */}
                <div>
                  <label className="mb-2 block text-sm font-bold text-slate-900">
                    Password
                  </label>

                  <div className="flex h-12 items-center rounded-2xl border border-slate-200 bg-white px-3.5 transition-all duration-200 focus-within:border-violet-500 focus-within:ring-4 focus-within:ring-violet-500/10 sm:h-[54px] sm:px-4">
                    <Lock size={18} className="mr-3 shrink-0 text-slate-400" />

                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Create a password"
                      disabled={loading}
                      autoComplete="new-password"
                      className="register-input flex-1"
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                      className="ml-2 shrink-0 rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                      tabIndex={-1}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>

                  <p className="mt-2 text-xs text-slate-400">
                    Use at least 6 characters.
                  </p>
                </div>
              </div>

              {/* BUTTON */}
              <button
                type="submit"
                disabled={loading}
                className="group mt-6 flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-slate-950 text-sm font-bold text-white shadow-lg shadow-slate-950/15 transition-all duration-200 hover:bg-violet-600 hover:shadow-violet-500/20 disabled:cursor-not-allowed disabled:opacity-60 sm:h-[54px] sm:hover:-translate-y-0.5"
              >
                {loading ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    Creating Account...
                  </>
                ) : (
                  <>
                    Create Organizer Account
                    <ArrowRight
                      size={17}
                      className="transition-transform duration-200 group-hover:translate-x-1"
                    />
                  </>
                )}
              </button>

              <p className="mt-5 text-center text-[13px] text-slate-500 sm:text-sm">
                Already have an organizer account?{" "}
                <Link
                  to="/organizer/login"
                  className="whitespace-nowrap font-bold text-slate-950 underline decoration-violet-400 decoration-2 underline-offset-4 transition hover:text-violet-600"
                >
                  Login
                </Link>
              </p>

              <Link
                to="/"
                className="mt-4 block text-center text-xs font-medium text-slate-400 transition hover:text-slate-900"
              >
                ← Back to PRAPT
              </Link>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
}

/* INPUT FIELD */

function InputField({ label, icon, children }) {
  return (
    <div>
      <label className="mb-2 block text-sm font-bold text-slate-900">
        {label}
      </label>

      <div className="flex h-12 items-center rounded-2xl border border-slate-200 bg-white px-3.5 transition-all duration-200 focus-within:border-violet-500 focus-within:ring-4 focus-within:ring-violet-500/10 sm:h-[54px] sm:px-4">
        <span className="mr-3 shrink-0 text-slate-400">{icon}</span>
        {children}
      </div>
    </div>
  );
}

/* FEATURE CARD */

function FeatureCard({ icon, title, text }) {
  return (
    <div className="group rounded-2xl border border-white/10 bg-white/[0.045] p-4 backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:bg-white/[0.08]">
      <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-violet-500/15 text-violet-300">
        {icon}
      </div>

      <h3 className="text-sm font-bold text-white">{title}</h3>

      <p className="mt-1 text-xs leading-5 text-white/40">{text}</p>
    </div>
  );
}
