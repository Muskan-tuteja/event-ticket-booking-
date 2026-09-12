import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function OrganizerLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    // Demo authentication
    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    localStorage.setItem("organizerLoggedIn", "true");
    localStorage.setItem("organizerEmail", email);

    navigate("/organizer/dashboard");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f7f7f8] px-5">
      <div className="w-full max-w-md">

        <div className="mb-8 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-black text-xl font-black text-white">
            P
          </div>

          <h1 className="mt-5 text-3xl font-black">
            Organizer Login
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Login to manage your events and tickets
          </p>
        </div>

        <form
          onSubmit={handleLogin}
          className="rounded-3xl border border-gray-200 bg-white p-6 shadow-xl md:p-8"
        >
          <label className="text-sm font-semibold">
            Email
          </label>

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="organizer@example.com"
            className="mt-2 h-12 w-full rounded-xl border border-gray-200 px-4 text-sm outline-none focus:border-black"
          />

          <label className="mt-5 block text-sm font-semibold">
            Password
          </label>

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className="mt-2 h-12 w-full rounded-xl border border-gray-200 px-4 text-sm outline-none focus:border-black"
          />

          <button
            type="submit"
            className="mt-6 h-12 w-full rounded-xl bg-black text-sm font-bold text-white transition hover:bg-violet-600"
          >
            Login as Organizer
          </button>

          <p className="mt-6 text-center text-sm text-gray-500">
            Don't have an organizer account?{" "}
            <Link
              to="/organizer/register"
              className="font-bold text-black underline"
            >
              Register
            </Link>
          </p>

          <Link
            to="/"
            className="mt-4 block text-center text-sm font-medium text-gray-400 hover:text-black"
          >
            ← Back to website
          </Link>
        </form>

      </div>
    </div>
  );
}