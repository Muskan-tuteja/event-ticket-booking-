import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function OrganizerRegister() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      alert("Please fill all fields");
      return;
    }

    // Demo registration
    localStorage.setItem("organizerName", name);
    localStorage.setItem("organizerEmail", email);

    alert("Organizer account created successfully");

    navigate("/organizer/login");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f7f7f8] px-5">
      <div className="w-full max-w-md">

        <div className="mb-8 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-black text-xl font-black text-white">
            P
          </div>

          <h1 className="mt-5 text-3xl font-black">
            Become an Organizer
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Create and manage your events with PRAPT
          </p>
        </div>

        <form
          onSubmit={handleRegister}
          className="rounded-3xl border border-gray-200 bg-white p-6 shadow-xl md:p-8"
        >
          <label className="text-sm font-semibold">
            Full Name
          </label>

          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            className="mt-2 h-12 w-full rounded-xl border border-gray-200 px-4 text-sm outline-none focus:border-black"
          />

          <label className="mt-5 block text-sm font-semibold">
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
            placeholder="Create password"
            className="mt-2 h-12 w-full rounded-xl border border-gray-200 px-4 text-sm outline-none focus:border-black"
          />

          <button
            type="submit"
            className="mt-6 h-12 w-full rounded-xl bg-black text-sm font-bold text-white transition hover:bg-violet-600"
          >
            Create Organizer Account
          </button>

          <p className="mt-6 text-center text-sm text-gray-500">
            Already have an account?{" "}
            <Link
              to="/organizer/login"
              className="font-bold text-black underline"
            >
              Login
            </Link>
          </p>

        </form>

      </div>
    </div>
  );
}