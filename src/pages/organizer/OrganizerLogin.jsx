import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function OrganizerLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
            email: email.trim(),
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

      /* =================================================
         ROLE CHECK
      ================================================= */

      if (data.user.role !== "organizer") {
        throw new Error(
          "This account is not registered as an organizer."
        );
      }

      /* =================================================
         SAVE TOKEN
      ================================================= */

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
        "organizerEmail",
        data.user.email
      );

      navigate("/organizer/dashboard");

    } catch (err) {
      setError(
        err?.message || "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f7f8] flex items-center justify-center px-5 py-10">

      <div className="w-full max-w-md">

        {/* LOGO */}
        <div className="text-center mb-8">

          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-black text-2xl font-black text-white shadow-lg">
            P
          </div>

          <h1 className="mt-6 text-3xl font-black tracking-tight">
            Welcome back
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Login to manage your PRAPT events
          </p>

        </div>

        {/* CARD */}
        <form
          onSubmit={handleLogin}
          className="rounded-3xl border border-gray-200 bg-white p-7 shadow-xl md:p-8"
        >

          {/* ERROR */}
          {error && (
            <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
              {error}
            </div>
          )}

          {/* EMAIL */}
          <label className="text-sm font-semibold text-gray-900">
            Email address
          </label>

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="organizer@example.com"
            disabled={loading}
            className="mt-2 h-13 w-full rounded-xl border border-gray-200 bg-white px-4 text-sm outline-none transition focus:border-black focus:ring-2 focus:ring-black/5 disabled:bg-gray-100"
          />

          {/* PASSWORD */}
          <div className="mt-5 flex items-center justify-between">

            <label className="text-sm font-semibold text-gray-900">
              Password
            </label>

            <Link
              to="/forgot-password?role=organizer"
              className="text-sm font-semibold text-violet-600 hover:text-black"
            >
              Forgot password?
            </Link>

          </div>

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            disabled={loading}
            className="mt-2 h-13 w-full rounded-xl border border-gray-200 bg-white px-4 text-sm outline-none transition focus:border-black focus:ring-2 focus:ring-black/5 disabled:bg-gray-100"
          />

          {/* LOGIN */}
          <button
            type="submit"
            disabled={loading}
            className="mt-6 h-13 w-full rounded-xl bg-black text-sm font-bold text-white transition hover:bg-violet-600 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Signing in..." : "Login as Organizer"}
          </button>

          {/* REGISTER */}
          <p className="mt-6 text-center text-sm text-gray-500">
            Don't have an organizer account?{" "}
            <Link
              to="/organizer/register"
              className="font-bold text-black underline"
            >
              Create account
            </Link>
          </p>

          {/* BACK */}
          <Link
            to="/"
            className="mt-5 block text-center text-sm font-medium text-gray-400 hover:text-black"
          >
            ← Back to PRAPT
          </Link>

        </form>

      </div>
    </div>
  );
}