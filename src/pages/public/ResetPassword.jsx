import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  }
);

export default function ResetPassword() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const role =
    searchParams.get("role") === "organizer"
      ? "organizer"
      : "customer";

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    let mounted = true;

    const checkRecoverySession = async () => {
      try {
        setError("");

        // Supabase automatically processes the recovery token
        // from the URL because detectSessionInUrl is enabled.
        const {
          data: { session },
          error: sessionError,
        } = await supabase.auth.getSession();

        if (sessionError) {
          throw sessionError;
        }

        if (!mounted) return;

        if (session) {
          setCheckingSession(false);
          return;
        }

        setError(
          "This password reset link is invalid or has expired. Please request a new link."
        );
      } catch (err) {
        console.error("Recovery session error:", err);

        if (mounted) {
          setError(
            err?.message ||
              "Unable to verify the reset link. Please request a new link."
          );
        }
      } finally {
        if (mounted) {
          setCheckingSession(false);
        }
      }
    };

    // Listen for Supabase recovery event
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (!mounted) return;

      if (event === "PASSWORD_RECOVERY" && session) {
        setError("");
        setCheckingSession(false);
      }
    });

    checkRecoverySession();

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!password || !confirmPassword) {
      setError("Please enter both passwords.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession();

      if (sessionError) {
        throw sessionError;
      }

      if (!session) {
        setError(
          "Your reset session has expired. Please request a new reset link."
        );
        return;
      }

      const { error: updateError } =
        await supabase.auth.updateUser({
          password: password,
        });

      if (updateError) {
        throw updateError;
      }

      setSuccess(
        "Password updated successfully! Redirecting to login..."
      );

      // Sign out the temporary recovery session
      await supabase.auth.signOut();

      setTimeout(() => {
        if (role === "organizer") {
          navigate("/organizer/login");
        } else {
          navigate("/login");
        }
      }, 1800);
    } catch (err) {
      console.error("Password update error:", err);

      setError(
        err?.message ||
          "Unable to update password. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  if (checkingSession) {
    return (
      <div className="min-h-screen bg-[#080808] flex items-center justify-center px-4">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-white/20 border-t-white rounded-full animate-spin mx-auto mb-5" />

          <h2 className="text-xl font-semibold text-white">
            Verifying reset link...
          </h2>

          <p className="text-gray-400 mt-2 text-sm">
            Please wait a moment.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#080808] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">

        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white text-black text-2xl font-black mb-5 shadow-xl">
            P
          </div>

          <h1 className="text-3xl font-bold text-white">
            Reset Password
          </h1>

          <p className="text-gray-400 mt-2">
            Create a new password for your PRAPT account.
          </p>
        </div>

        <div className="bg-white/[0.06] border border-white/10 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl">

          {error && (
            <div className="mb-5 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-5 rounded-xl border border-green-500/20 bg-green-500/10 px-4 py-3 text-sm text-green-300">
              {success}
            </div>
          )}

          {!success && (
            <form onSubmit={handleSubmit} className="space-y-5">

              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">
                  New Password
                </label>

                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) =>
                      setPassword(e.target.value)
                    }
                    placeholder="Enter new password"
                    autoComplete="new-password"
                    disabled={loading}
                    className="w-full rounded-xl bg-black/40 border border-white/10 px-4 py-3.5 pr-16 text-white placeholder-gray-500 outline-none transition focus:border-white/30 focus:ring-2 focus:ring-white/10 disabled:opacity-50"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword((prev) => !prev)
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">
                  Confirm Password
                </label>

                <div className="relative">
                  <input
                    type={
                      showConfirmPassword
                        ? "text"
                        : "password"
                    }
                    value={confirmPassword}
                    onChange={(e) =>
                      setConfirmPassword(e.target.value)
                    }
                    placeholder="Confirm new password"
                    autoComplete="new-password"
                    disabled={loading}
                    className="w-full rounded-xl bg-black/40 border border-white/10 px-4 py-3.5 pr-16 text-white placeholder-gray-500 outline-none transition focus:border-white/30 focus:ring-2 focus:ring-white/10 disabled:opacity-50"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword((prev) => !prev)
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                  >
                    {showConfirmPassword
                      ? "Hide"
                      : "Show"}
                  </button>
                </div>
              </div>

              <p className="text-xs text-gray-500">
                Password must contain at least 6 characters.
              </p>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-white text-black font-semibold py-3.5 transition hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading
                  ? "Updating Password..."
                  : "Update Password"}
              </button>
            </form>
          )}

          {!success && (
            <button
              type="button"
              onClick={() =>
                navigate(
                  role === "organizer"
                    ? "/organizer/login"
                    : "/login"
                )
              }
              className="w-full mt-5 text-sm text-gray-400 hover:text-white transition"
            >
              ← Back to Login
            </button>
          )}
        </div>

        <p className="text-center text-xs text-gray-600 mt-6">
          © {new Date().getFullYear()} PRAPT. All rights reserved.
        </p>
      </div>
    </div>
  );
}