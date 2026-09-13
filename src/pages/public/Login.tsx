import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Login() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const [popup, setPopup] = useState({
    show: false,
    type: "",
    message: "",
  });

  // =========================================================
  // INPUT CHANGE
  // =========================================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =========================================================
  // POPUP
  // =========================================================

  const showPopup = (type, message) => {
    setPopup({
      show: true,
      type,
      message,
    });

    setTimeout(() => {
      setPopup({
        show: false,
        type: "",
        message: "",
      });
    }, 3500);
  };

  // =========================================================
  // LOGIN
  // =========================================================

  const handleLogin = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.email.trim()) {
      showPopup("error", "Please enter your email address.");
      return;
    }

    if (!formData.password) {
      showPopup("error", "Please enter your password.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formData.email.trim(),
            password: formData.password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Invalid email or password."
        );
      }

      // =====================================================
      // SAVE LOGIN DATA
      // =====================================================

      if (data.session?.access_token) {
        localStorage.setItem(
          "prapt_access_token",
          data.session.access_token
        );
      }

      if (data.session?.refresh_token) {
        localStorage.setItem(
          "prapt_refresh_token",
          data.session.refresh_token
        );
      }

      if (data.user) {
        localStorage.setItem(
          "prapt_user",
          JSON.stringify(data.user)
        );
      }

      if (data.profile) {
        localStorage.setItem(
          "prapt_profile",
          JSON.stringify(data.profile)
        );
      }

      // Customer role
      localStorage.setItem("prapt_role", "customer");

      // Remember me
      const rememberMe = document.getElementById("remember");

      if (rememberMe?.checked) {
        localStorage.setItem("prapt_remember", "true");
      } else {
        localStorage.removeItem("prapt_remember");
      }

      // =====================================================
      // SUCCESS POPUP
      // =====================================================

      showPopup(
        "success",
        "Login successful! Welcome to PRAPT."
      );

      // Small delay so user can see animation
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      console.error("Login error:", error);

      showPopup(
        "error",
        error.message || "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#f7f7f8]">

      {/* =====================================================
          ANIMATED POPUP
      ===================================================== */}

      {popup.show && (
        <div
          className="fixed right-5 top-5 z-[9999] w-[calc(100%-40px)] max-w-sm animate-[slideIn_.4s_ease-out]"
        >
          <div
            className={`overflow-hidden rounded-2xl border bg-white shadow-2xl ${
              popup.type === "success"
                ? "border-emerald-200"
                : "border-red-200"
            }`}
          >
            <div className="flex items-start gap-4 p-4">

              {/* Icon */}
              <div
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-lg font-bold ${
                  popup.type === "success"
                    ? "bg-emerald-100 text-emerald-600"
                    : "bg-red-100 text-red-600"
                }`}
              >
                {popup.type === "success" ? "✓" : "!"}
              </div>

              {/* Message */}
              <div className="flex-1">
                <p className="text-sm font-black text-gray-900">
                  {popup.type === "success"
                    ? "Success"
                    : "Login failed"}
                </p>

                <p className="mt-1 text-xs leading-5 text-gray-500">
                  {popup.message}
                </p>
              </div>

              {/* Close */}
              <button
                type="button"
                onClick={() =>
                  setPopup({
                    show: false,
                    type: "",
                    message: "",
                  })
                }
                className="text-gray-400 transition hover:text-black"
              >
                ×
              </button>
            </div>

            {/* Progress */}
            <div
              className={`h-1 ${
                popup.type === "success"
                  ? "bg-emerald-500"
                  : "bg-red-500"
              }`}
            />
          </div>
        </div>
      )}

      <div className="grid min-h-screen lg:grid-cols-2">

        {/* =====================================================
            LEFT — BRAND / VISUAL
        ===================================================== */}

        <div className="relative hidden overflow-hidden bg-[#09090b] lg:flex">

          {/* Glow */}
          <div className="absolute -right-32 -top-32 h-[500px] w-[500px] rounded-full bg-violet-600/20 blur-[120px]" />

          <div className="absolute -bottom-40 -left-20 h-[400px] w-[400px] rounded-full bg-blue-500/10 blur-[100px]" />

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

            {/* Center */}
            <div className="max-w-lg">

              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-xl">
                ✦
              </div>

              <h1 className="text-5xl font-black leading-[1.05] tracking-tight text-white xl:text-6xl">
                Your next
                <br />
                <span className="text-gray-500">
                  experience awaits.
                </span>
              </h1>

              <p className="mt-6 max-w-md text-base leading-7 text-gray-400">
                Discover concerts, workshops, comedy shows and
                unforgettable experiences around you.
              </p>

              {/* Stats */}
              <div className="mt-9 flex gap-8">

                <div>
                  <p className="text-2xl font-black text-white">
                    500+
                  </p>
                  <p className="mt-1 text-xs text-gray-500">
                    Events
                  </p>
                </div>

                <div>
                  <p className="text-2xl font-black text-white">
                    50K+
                  </p>
                  <p className="mt-1 text-xs text-gray-500">
                    Attendees
                  </p>
                </div>

                <div>
                  <p className="text-2xl font-black text-white">
                    20+
                  </p>
                  <p className="mt-1 text-xs text-gray-500">
                    Cities
                  </p>
                </div>

              </div>
            </div>

            {/* Bottom */}
            <p className="text-xs text-gray-600">
              Discover. Book. Experience.
            </p>

          </div>
        </div>

        {/* =====================================================
            RIGHT — LOGIN FORM
        ===================================================== */}

        <div className="flex items-center justify-center px-5 py-10 sm:px-8">

          <div className="w-full max-w-md">

            {/* Mobile Logo */}
            <div className="mb-10 text-center lg:hidden">
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
                Welcome back
              </p>

              <h2 className="mt-3 text-4xl font-black tracking-tight">
                Login to your account
              </h2>

              <p className="mt-3 text-sm leading-6 text-gray-500">
                Continue discovering and booking amazing events.
              </p>

            </div>

            {/* =================================================
                FORM
            ================================================= */}

            <form
              onSubmit={handleLogin}
              className="mt-9 space-y-5"
            >

              {/* Email */}
              <div>

                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-bold text-gray-800"
                >
                  Email address
                </label>

                <div className="group relative">

                  <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                    @
                  </span>

                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
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

                  <button
                    type="button"
                    onClick={() =>
                      showPopup(
                        "error",
                        "Forgot password will be connected next."
                      )
                    }
                    className="text-xs font-semibold text-gray-500 transition hover:text-black"
                  >
                    Forgot password?
                  </button>

                </div>

                <div className="relative">

                  <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                    •••
                  </span>

                  <input
                    id="password"
                    name="password"
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    className="w-full rounded-2xl border border-gray-200 bg-white py-3.5 pl-11 pr-16 text-sm outline-none transition duration-200 placeholder:text-gray-400 focus:border-black focus:ring-4 focus:ring-gray-100"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(!showPassword)
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-400 transition hover:text-black"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>

                </div>
              </div>

              {/* Remember */}
              <div className="flex items-center justify-between">

                <label className="flex cursor-pointer items-center gap-2 text-sm text-gray-600">

                  <input
                    id="remember"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 accent-black"
                  />

                  Remember me

                </label>

                <span className="text-xs text-gray-400">
                  Secure login
                </span>

              </div>

              {/* Login Button */}
              <button
                type="submit"
                disabled={loading}
                className="group flex w-full items-center justify-center rounded-2xl bg-[#09090b] py-4 text-sm font-bold text-white shadow-lg transition duration-300 hover:-translate-y-0.5 hover:bg-violet-600 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
              >

                {loading ? (
                  <>
                    <span className="mr-3 h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    Logging in...
                  </>
                ) : (
                  <>
                    Login
                    <span className="ml-2 transition group-hover:translate-x-1">
                      →
                    </span>
                  </>
                )}

              </button>

            </form>

            {/* Divider */}
            <div className="my-7 flex items-center gap-4">

              <div className="h-px flex-1 bg-gray-200" />

              <span className="text-xs font-medium text-gray-400">
                OR
              </span>

              <div className="h-px flex-1 bg-gray-200" />

            </div>

            {/* Register */}
            <div className="rounded-2xl border border-gray-200 bg-white p-5 text-center">

              <p className="text-sm text-gray-500">
                Don't have an account?
              </p>

              <Link
                to="/register"
                className="mt-2 inline-block text-sm font-black text-black underline underline-offset-4 transition hover:text-violet-600"
              >
                Create an account →
              </Link>

            </div>

            {/* Footer */}
            <p className="mt-8 text-center text-xs text-gray-400">
              By continuing, you agree to PRAPT's Terms &
              Privacy Policy.
            </p>

          </div>
        </div>

      </div>

      {/* =====================================================
          POPUP ANIMATION
      ===================================================== */}

     

    </main>
  );
}