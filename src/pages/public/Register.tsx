import { Link, useNavigate } from "react-router-dom";
import { useState, type FormEvent } from "react";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function Register() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");

  const [agreeTerms, setAgreeTerms] = useState(false);
  const [loading, setLoading] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const passwordStrength =
    password.length === 0
      ? ""
      : password.length < 6
      ? "Weak"
      : password.length < 10
      ? "Good"
      : "Strong";

  const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setErrorMessage("");
    setSuccessMessage("");

    if (!fullName.trim() || !email.trim() || !password) {
      setErrorMessage("Please fill in all required fields.");
      return;
    }

    if (password.length < 6) {
      setErrorMessage("Password must be at least 6 characters.");
      return;
    }

    if (!agreeTerms) {
      setErrorMessage(
        "Please agree to the Terms of Service and Privacy Policy."
      );
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
          full_name: fullName.trim(),
          email: email.trim(),
          password,
          role: "customer",
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Registration failed.");
      }

      /*
       * IMPORTANT:
       * Registration ke baad customer ko automatically
       * login nahi karna hai.
       *
       * Isliye:
       * - prapt_customer save nahi karenge
       * - prapt_session save nahi karenge
       * - direct Home par nahi bhejenge
       */

      setSuccessMessage(
        "Account created successfully! Please login to continue."
      );

      // Form clear
      setFullName("");
      setEmail("");
      setPassword("");
      setAgreeTerms(false);

      /*
       * 2 seconds ke baad Login page
       */
      setTimeout(() => {
        navigate("/login", { replace: true });
      }, 2000);
    } catch (error) {
      console.error("REGISTER ERROR:", error);

      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#f7f7f8]">
      <div className="grid min-h-screen lg:grid-cols-2">

        {/* =====================================================
            LEFT — BRAND / VISUAL
        ===================================================== */}

        <div className="relative hidden overflow-hidden bg-[#09090b] lg:flex">

          <div className="absolute -left-32 -top-32 h-[500px] w-[500px] rounded-full bg-violet-600/20 blur-[120px]" />

          <div className="absolute -bottom-40 -right-20 h-[450px] w-[450px] rounded-full bg-blue-500/10 blur-[110px]" />

          <div className="absolute inset-0 opacity-[0.04] [background-image:linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] [background-size:60px_60px]" />

          <div className="relative z-10 flex w-full flex-col justify-between p-12 xl:p-16">

            <Link
              to="/"
              className="text-2xl font-black tracking-tight text-white"
            >
              PRAPT<span className="text-violet-500">.</span>
            </Link>

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

            {/* =====================================================
                SUCCESS POPUP / MESSAGE
            ===================================================== */}

            {successMessage && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-5 backdrop-blur-sm">

                <div className="w-full max-w-sm animate-[fadeIn_.25s_ease-out] rounded-3xl bg-white p-7 text-center shadow-2xl">

                  {/* Success Icon */}

                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">

                    <span className="text-3xl text-emerald-600">
                      ✓
                    </span>

                  </div>

                  <h3 className="mt-5 text-2xl font-black text-gray-900">
                    Account Created!
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-gray-500">
                    Your PRAPT account has been created successfully.
                  </p>

                  <p className="mt-2 text-sm font-semibold text-violet-600">
                    Please login to continue.
                  </p>

                  {/* Loading dots */}

                  <div className="mt-6 flex justify-center gap-1.5">

                    <span className="h-2 w-2 animate-bounce rounded-full bg-violet-600" />

                    <span className="h-2 w-2 animate-bounce rounded-full bg-violet-600 [animation-delay:0.15s]" />

                    <span className="h-2 w-2 animate-bounce rounded-full bg-violet-600 [animation-delay:0.3s]" />

                  </div>

                </div>

              </div>
            )}

            {/* =====================================================
                ERROR MESSAGE
            ===================================================== */}

            {errorMessage && (
              <div className="mt-6 flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">

                <span className="mt-0.5 font-bold">
                  !
                </span>

                <span>
                  {errorMessage}
                </span>

              </div>
            )}

            {/* =====================================================
                FORM
            ===================================================== */}

            <form
              onSubmit={handleRegister}
              className="mt-9 space-y-5"
            >

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
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    disabled={loading}
                    className="w-full rounded-2xl border border-gray-200 bg-white py-3.5 pl-11 pr-4 text-sm outline-none transition duration-200 placeholder:text-gray-400 focus:border-black focus:ring-4 focus:ring-gray-100 disabled:cursor-not-allowed disabled:opacity-60"
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
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={loading}
                    className="w-full rounded-2xl border border-gray-200 bg-white py-3.5 pl-11 pr-4 text-sm outline-none transition duration-200 placeholder:text-gray-400 focus:border-black focus:ring-4 focus:ring-gray-100 disabled:cursor-not-allowed disabled:opacity-60"
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
                    disabled={loading}
                    className="w-full rounded-2xl border border-gray-200 bg-white py-3.5 pl-11 pr-14 text-sm outline-none transition duration-200 placeholder:text-gray-400 focus:border-black focus:ring-4 focus:ring-gray-100 disabled:cursor-not-allowed disabled:opacity-60"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={loading}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-400 transition hover:text-black"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>

                </div>

                {/* Password Requirements */}

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
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  disabled={loading}
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
                type="submit"
                disabled={loading}
                className="group flex w-full items-center justify-center rounded-2xl bg-[#09090b] py-4 text-sm font-bold text-white shadow-lg transition duration-300 hover:-translate-y-0.5 hover:bg-violet-600 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 disabled:hover:bg-[#09090b]"
              >

                {loading ? (
                  <>
                    <span className="mr-3 h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    Creating account...
                  </>
                ) : (
                  <>
                    Create Account

                    <span className="ml-2 transition group-hover:translate-x-1">
                      →
                    </span>
                  </>
                )}

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