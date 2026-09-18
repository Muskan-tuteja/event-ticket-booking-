import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function RoleSelectionPopup() {
  const [showPopup, setShowPopup] = useState<boolean>(false);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Popup sirf Home page par show hoga
    if (location.pathname !== "/") {
      setShowPopup(false);
      return;
    }

    // Check both storages because Login.tsx uses
    // localStorage when "Remember me" is checked,
    // otherwise sessionStorage.
    const token =
      localStorage.getItem("prapt_access_token") ||
      sessionStorage.getItem("prapt_access_token");

    // Already logged in -> popup mat dikhao
    if (token) {
      setShowPopup(false);
      return;
    }

    // Logged out user -> 2 seconds baad popup
    const timer = window.setTimeout(() => {
      setShowPopup(true);
    }, 2000);

    return () => {
      window.clearTimeout(timer);
    };
  }, [location.pathname]);

  const handleCustomer = () => {
    setShowPopup(false);
    navigate("/register");
  };

  const handleOrganizer = () => {
    setShowPopup(false);
    navigate("/organizer/login");
  };

  const handleClose = () => {
    setShowPopup(false);
  };

  if (!showPopup) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 px-4 backdrop-blur-sm">
      <div className="relative w-full max-w-md rounded-3xl bg-white p-7 shadow-2xl">
        <button
          type="button"
          onClick={handleClose}
          className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-xl text-gray-500 transition hover:bg-gray-200 hover:text-black"
          aria-label="Close"
        >
          ×
        </button>

        <h2 className="mb-6 text-2xl font-black tracking-tight text-black">
          PRAPT<span className="text-purple-600">.</span>
        </h2>

        <div className="mb-7">
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.25em] text-purple-600">
            Welcome
          </p>

          <h1 className="text-3xl font-black leading-tight text-gray-900">
            How would you like
            <br />
            to continue?
          </h1>

          <p className="mt-3 text-sm leading-6 text-gray-500">
            Choose your account type to continue with PRAPT.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <button
            type="button"
            onClick={handleCustomer}
            className="rounded-2xl border border-gray-200 bg-white p-5 text-left transition duration-300 hover:-translate-y-1 hover:border-purple-300 hover:shadow-lg"
          >
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-purple-50 text-2xl">
              👤
            </div>

            <h3 className="text-lg font-bold text-gray-900">Customer</h3>

            <p className="mt-1 text-sm leading-5 text-gray-500">
              Discover events and book tickets.
            </p>

            <div className="mt-4 text-sm font-bold text-purple-600">
              Continue →
            </div>
          </button>

          <button
            type="button"
            onClick={handleOrganizer}
            className="rounded-2xl border border-gray-200 bg-white p-5 text-left transition duration-300 hover:-translate-y-1 hover:border-purple-300 hover:shadow-lg"
          >
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100 text-2xl">
              🎟️
            </div>

            <h3 className="text-lg font-bold text-gray-900">Organizer</h3>

            <p className="mt-1 text-sm leading-5 text-gray-500">
              Create and manage your events.
            </p>

            <div className="mt-4 text-sm font-bold text-purple-600">
              Continue →
            </div>
          </button>
        </div>

        <p className="mt-6 text-center text-xs text-gray-400">
          Select your account type to continue.
        </p>
      </div>
    </div>
  );
}

export default RoleSelectionPopup;
