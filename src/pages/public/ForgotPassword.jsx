import { Link, useSearchParams } from "react-router-dom";
import { useState } from "react";

// =====================================================
// PRAPT BACKEND
// =====================================================
const API_URL = "https://prapt-backend.onrender.com";

export default function ForgotPassword() {
  const [searchParams] = useSearchParams();

  // =====================================================
  // ACCOUNT ROLE
  // /forgot-password?role=customer
  // /forgot-password?role=organizer
  // =====================================================
  const requestedRole = searchParams.get("role");

  const role =
    requestedRole === "organizer" ? "organizer" : "customer";

  const isOrganizer = role === "organizer";

  // =====================================================
  // FORM STATE
  // =====================================================
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // =====================================================
  // TEXT
  // =====================================================
  const accountLabel = isOrganizer
    ? "Organizer account"
    : "Customer account";

  const portalLabel = isOrganizer
    ? "Organizer Portal"
    : "Customer Portal";

  const mainTitle = isOrganizer
    ? "Get back to your events."
    : "Get back to your experiences.";

  const description = isOrganizer
    ? "Reset your organizer account password securely and continue managing your events, tickets and attendees with PRAPT."
    : "Reset your customer account password securely and continue discovering and booking amazing events with PRAPT.";

  const emailPlaceholder = isOrganizer
    ? "organizer@example.com"
    : "you@example.com";

  // =====================================================
  // SUBMIT
  // =====================================================
  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setMessage("");

    const cleanEmail = email.trim().toLowerCase();

    if (!cleanEmail) {
      setError("Please enter your email address.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      setError("Please enter a valid email address.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        `${API_URL}/api/auth/forgot-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            email: cleanEmail,
            role,
          }),
        }
      );

      // =================================================
      // READ RESPONSE SAFELY
      // =================================================
      const contentType =
        response.headers.get("content-type") || "";

      const rawResponse = await response.text();

      if (!contentType.includes("application/json")) {
        console.error(
          "PRAPT BACKEND NON-JSON RESPONSE:",
          rawResponse
        );

        throw new Error(
          `Backend returned an unexpected response (${response.status}). Please check that the latest backend code is deployed on Render.`
        );
      }

      let data;

      try {
        data = JSON.parse(rawResponse);
      } catch (parseError) {
        console.error("JSON PARSE ERROR:", parseError);
        console.error("RAW RESPONSE:", rawResponse);

        throw new Error(
          "The backend returned an invalid response. Please try again."
        );
      }

      // =================================================
      // BACKEND ERROR
      // =================================================
      if (!response.ok) {
        throw new Error(
          data.message ||
            "Unable to send password reset link."
        );
      }

      // =================================================
      // SUCCESS
      // =================================================
      setMessage(
        data.message ||
          `If this email belongs to a ${isOrganizer ? "organizer" : "customer"} account, a password reset link has been sent.`
      );

      setEmail("");
    } catch (err) {
      console.error("FORGOT PASSWORD ERROR:", err);

      setError(
        err?.message ||
          "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // FEATURE LIST
  // =====================================================
  const features = isOrganizer
    ? [
        "Manage your events",
        "Track ticket sales",
        "Manage attendees",
      ]
    : [
        "Discover amazing events",
        "Book your tickets",
        "Manage your bookings",
      ];

  return (
    <div className="min-h-screen bg-[#f7f7f9]">
      <div className="grid min-h-screen lg:grid-cols-2">

        {/* =================================================
            LEFT BRAND SECTION
        ================================================= */}
        <div className="relative hidden overflow-hidden bg-[#09090b] lg:flex">

          {/* Grid background */}
          <div
            className="absolute inset-0 opacity-40"
            style={{
              backgroundImage: `
                linear-gradient(#ffffff12 1px, transparent 1px),
                linear-gradient(90deg, #ffffff12 1px, transparent 1px)
              `,
              backgroundSize: "48px 48px",
            }}
          />

          {/* Purple glow */}
          <div className="absolute -left-32 top-1/4 h-96 w-96 rounded-full bg-violet-700/30 blur-[120px]" />

          {/* Secondary glow */}
          <div className="absolute -bottom-40 right-0 h-96 w-96 rounded-full bg-violet-500/10 blur-[120px]" />

          <div className="relative z-10 flex w-full flex-col justify-between p-12 xl:p-16">

            {/* =================================================
                LOGO
            ================================================= */}
            <div>
              <div className="flex items-center gap-3">

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-xl font-black text-black">
                  P
                </div>

                <div>
                  <div className="text-xl font-black text-white">
                    PRAPT
                    <span className="text-violet-400">.</span>
                  </div>

                  <p className="text-xs text-white/40">
                    Event Ticketing Platform
                  </p>
                </div>

              </div>
            </div>

            {/* =================================================
                MAIN LEFT CONTENT
            ================================================= */}
            <div className="max-w-xl">

              {/* Portal badge */}
              <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-white/70">

                <span className="h-2 w-2 rounded-full bg-violet-400" />

                {portalLabel}

              </div>

              {/* Main heading */}
              <h2 className="text-5xl font-black leading-[1.05] tracking-tight text-white xl:text-6xl">
                {isOrganizer ? (
                  <>
                    Get back to
                    <br />
                    <span className="text-violet-400">
                      your events.
                    </span>
                  </>
                ) : (
                  <>
                    Get back to
                    <br />
                    <span className="text-violet-400">
                      your experiences.
                    </span>
                  </>
                )}
              </h2>

              {/* Description */}
              <p className="mt-7 max-w-lg text-base leading-7 text-white/50">
                {description}
              </p>

              {/* Features */}
              <div className="mt-10 space-y-4">

                {features.map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 text-sm text-white/70"
                  >

                    <div className="flex h-7 w-7 items-center justify-center rounded-full border border-white/10 bg-white/5 text-violet-300">
                      ✓
                    </div>

                    {item}

                  </div>
                ))}

              </div>

            </div>

            {/* =================================================
                FOOTER
            ================================================= */}
            <p className="text-xs text-white/30">
              © PRAPT · {isOrganizer ? "Organizer Platform" : "Customer Platform"}
            </p>

          </div>
        </div>

        {/* =================================================
            RIGHT FORM
        ================================================= */}
        <div className="flex items-center justify-center px-5 py-10 sm:px-8">

          <div className="w-full max-w-md">

            {/* =================================================
                MOBILE LOGO
            ================================================= */}
            <div className="mb-8 flex justify-center lg:hidden">

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-black text-xl font-black text-white shadow-lg">
                P
              </div>

            </div>

            {/* =================================================
                HEADING
            ================================================= */}
            <div className="mb-8">

              <div className="mb-4 text-xs font-bold uppercase tracking-[0.28em] text-violet-600">
                {accountLabel}
              </div>

              <h1 className="text-4xl font-black tracking-tight text-gray-950">
                Forgot password?
              </h1>

              <p className="mt-3 text-sm leading-6 text-gray-500">
                {isOrganizer
                  ? "Enter your organizer account email and we'll send you a secure password reset link."
                  : "Enter your customer account email and we'll send you a secure password reset link."}
              </p>

            </div>

            {/* =================================================
                CARD
            ================================================= */}
            <div className="rounded-[28px] border border-gray-200/80 bg-white p-6 shadow-[0_20px_60px_rgba(0,0,0,0.08)] sm:p-8">

              {/* =================================================
                  ERROR
              ================================================= */}
              {error && (
                <div className="mb-5 flex gap-3 rounded-2xl border border-red-200 bg-red-50 px-4 py-3.5 text-sm leading-5 text-red-600">

                  <span className="font-bold">
                    !
                  </span>

                  <span>
                    {error}
                  </span>

                </div>
              )}

              {/* =================================================
                  SUCCESS
              ================================================= */}
              {message && (
                <div className="mb-5 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3.5 text-sm leading-6 text-emerald-700">

                  <div className="font-bold">
                    Reset link sent
                  </div>

                  <div className="mt-1">
                    {message}
                  </div>

                </div>
              )}

              {/* =================================================
                  FORM
              ================================================= */}
              <form onSubmit={handleSubmit}>

                {/* Email label */}
                <label
                  htmlFor="forgot-email"
                  className="text-sm font-bold text-gray-900"
                >
                  Email address
                </label>

                {/* Email */}
                <div className="relative mt-2">

                  <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                    @
                  </div>

                  <input
                    id="forgot-email"
                    type="email"
                    value={email}
                    onChange={(e) =>
                      setEmail(e.target.value)
                    }
                    placeholder={emailPlaceholder}
                    disabled={loading}
                    autoComplete="email"
                    className="h-14 w-full rounded-2xl border border-gray-200 bg-gray-50 pl-11 pr-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-violet-500 focus:bg-white focus:ring-4 focus:ring-violet-500/10 disabled:cursor-not-allowed disabled:opacity-60"
                  />

                </div>

                {/* =================================================
                    SUBMIT BUTTON
                ================================================= */}
                <button
                  type="submit"
                  disabled={loading}
                  className="mt-5 h-14 w-full rounded-2xl bg-black text-sm font-bold text-white shadow-lg shadow-black/10 transition hover:-translate-y-0.5 hover:bg-violet-600 hover:shadow-violet-500/20 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading
                    ? "Sending reset link..."
                    : "Send reset link →"}
                </button>

              </form>

              {/* =================================================
                  BACK TO LOGIN
              ================================================= */}
              <Link
                to={
                  isOrganizer
                    ? "/organizer/login"
                    : "/login"
                }
                className="mt-6 block text-center text-sm font-semibold text-gray-500 transition hover:text-black"
              >
                ← Back to login
              </Link>

            </div>

            {/* =================================================
                SECURITY MESSAGE
            ================================================= */}
            <p className="mt-6 text-center text-xs text-gray-400">
              Your account security is important to us.
            </p>

          </div>
        </div>

      </div>
    </div>
  );
}