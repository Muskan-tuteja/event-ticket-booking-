import { useState } from "react";
import type { FormEvent, ChangeEvent } from "react";
import { Link, useNavigate } from "react-router-dom";

type LoginResponse = {
  success?: boolean;
  message?: string;

  user?: {
    id: string;
    email: string;
    role: string;
  };

  profile?: {
    id: string;
    full_name: string;
    email: string;
    role: string;
  };

  session?: {
    access_token?: string;
    refresh_token?: string;
  };
};

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // =====================================================
  // EMAIL CHANGE
  // =====================================================

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setErrorMessage("");
  };

  // =====================================================
  // PASSWORD CHANGE
  // =====================================================

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setErrorMessage("");
  };

  // =====================================================
  // REMEMBER ME
  // =====================================================

  const handleRememberChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRememberMe(e.target.checked);
  };

  // =====================================================
  // LOGIN
  // =====================================================

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setErrorMessage("");
    setSuccessMessage("");

    // Validation
    if (!email.trim()) {
      setErrorMessage("Please enter your email address.");
      return;
    }

    if (!password) {
      setErrorMessage("Please enter your password.");
      return;
    }

    try {
      setLoading(true);

      // API URL
      const API_URL =
        import.meta.env.VITE_API_URL || "http://localhost:5000";

      // API request
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          email: email.trim(),
          password,
        }),
      });

      const data: LoginResponse = await response.json();

      // Login failed
      if (!response.ok || !data.success) {
        throw new Error(data.message || "Login failed.");
      }

      // =====================================================
      // IMPORTANT
      // Choose storage BEFORE using it anywhere.
      // =====================================================

      const storage = rememberMe
        ? localStorage
        : sessionStorage;

      // =====================================================
      // CLEAR OLD AUTH DATA
      // =====================================================

      localStorage.removeItem("prapt_access_token");
      localStorage.removeItem("prapt_refresh_token");
      localStorage.removeItem("prapt_user");
      localStorage.removeItem("prapt_profile");
      localStorage.removeItem("prapt_customer");

      sessionStorage.removeItem("prapt_access_token");
      sessionStorage.removeItem("prapt_refresh_token");
      sessionStorage.removeItem("prapt_user");
      sessionStorage.removeItem("prapt_profile");
      sessionStorage.removeItem("prapt_customer");

      // =====================================================
      // ACCESS TOKEN
      // =====================================================

      if (data.session?.access_token) {
        storage.setItem(
          "prapt_access_token",
          data.session.access_token
        );
      }

      // =====================================================
      // REFRESH TOKEN
      // =====================================================

      if (data.session?.refresh_token) {
        storage.setItem(
          "prapt_refresh_token",
          data.session.refresh_token
        );
      }

      // =====================================================
      // USER
      // =====================================================

      if (data.user) {
        storage.setItem(
          "prapt_user",
          JSON.stringify(data.user)
        );
      }

      // =====================================================
      // PROFILE
      // =====================================================

      if (data.profile) {
        storage.setItem(
          "prapt_profile",
          JSON.stringify(data.profile)
        );
      }

      // =====================================================
      // CUSTOMER AUTH
      // CustomerAuthGuard isi key ko check karega.
      // =====================================================

      const customerData = data.profile || data.user;

      if (customerData) {
        storage.setItem(
          "prapt_customer",
          JSON.stringify(customerData)
        );
      }

      // =====================================================
      // SUCCESS
      // =====================================================

      setSuccessMessage("Login successful!");

      // Home page
      setTimeout(() => {
        navigate("/", { replace: true });
      }, 700);

    } catch (error: unknown) {
      console.error("LOGIN ERROR:", error);

      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage(
          "Something went wrong. Please try again."
        );
      }
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

          {/* Purple Glow */}

          <div className="absolute -right-32 -top-32 h-[500px] w-[500px] rounded-full bg-violet-600/20 blur-[120px]" />

          {/* Blue Glow */}

          <div className="absolute -bottom-40 -left-20 h-[400px] w-[400px] rounded-full bg-blue-500/10 blur-[100px]" />

          {/* Grid */}

          <div className="absolute inset-0 opacity-[0.04] [background-image:linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] [background-size:60px_60px]" />

          {/* Content */}

          <div className="relative z-10 flex w-full flex-col justify-between p-12 xl:p-16">

            {/* Logo */}

            <Link
              to="/"
              className="text-2xl font-black tracking-tight text-white"
            >
              PRAPT
              <span className="text-violet-500">.</span>
            </Link>

            {/* Main Content */}

            <div className="max-w-lg">

              {/* Icon */}

              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-xl text-black">
                ✦
              </div>

              {/* Heading */}

              <h1 className="text-5xl font-black leading-[1.05] tracking-tight text-white xl:text-6xl">

                Your next

                <br />

                <span className="text-gray-500">
                  experience awaits.
                </span>

              </h1>

              {/* Description */}

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

            {/* Footer */}

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
                PRAPT
                <span className="text-violet-600">.</span>
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

            {/* =====================================================
                ERROR
            ===================================================== */}

            {errorMessage && (

              <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">

                {errorMessage}

              </div>

            )}

            {/* =====================================================
                SUCCESS
            ===================================================== */}

            {successMessage && (

              <div className="mt-6 rounded-2xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-600">

                {successMessage}

              </div>

            )}

            {/* =====================================================
                FORM
            ===================================================== */}

            <form
              onSubmit={handleSubmit}
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

                <div className="relative">

                  <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                    @
                  </span>

                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={email}
                    onChange={handleEmailChange}
                    placeholder="you@example.com"
                    autoComplete="email"
                    disabled={loading}
                    className="w-full rounded-2xl border border-gray-200 bg-white py-3.5 pl-11 pr-4 text-sm outline-none transition duration-200 placeholder:text-gray-400 focus:border-black focus:ring-4 focus:ring-gray-100 disabled:cursor-not-allowed disabled:opacity-60"
                  />

                </div>

              </div>

              {/* Password */}

              <div>

                <div className="flex items-center justify-between mb-2">
  <label className="text-sm font-semibold text-gray-900">
    Password
  </label>

  <Link
    to="/forgot-password?role=customer"
    className="text-sm font-semibold text-black hover:text-purple-600 transition-colors cursor-pointer"
  >
    Forgot password?
  </Link>
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
                    value={password}
                    onChange={handlePasswordChange}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    disabled={loading}
                    className="w-full rounded-2xl border border-gray-200 bg-white py-3.5 pl-11 pr-16 text-sm outline-none transition duration-200 placeholder:text-gray-400 focus:border-black focus:ring-4 focus:ring-gray-100 disabled:cursor-not-allowed disabled:opacity-60"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(
                        (previous) => !previous
                      )
                    }
                    disabled={loading}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-400 transition hover:text-black"
                  >
                    {showPassword
                      ? "Hide"
                      : "Show"}
                  </button>

                </div>

              </div>

              {/* Remember */}

              <div className="flex items-center justify-between">

                <label className="flex cursor-pointer items-center gap-2 text-sm text-gray-600">

                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={handleRememberChange}
                    disabled={loading}
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
                className="group flex w-full items-center justify-center rounded-2xl bg-[#09090b] py-4 text-sm font-bold text-white shadow-lg transition duration-300 hover:-translate-y-0.5 hover:bg-violet-600 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
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
              By continuing, you agree to PRAPT's Terms & Privacy Policy.
            </p>

          </div>

        </div>

      </div>

    </main>
  );
}