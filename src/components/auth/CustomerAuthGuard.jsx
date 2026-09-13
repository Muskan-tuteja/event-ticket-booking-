import { Navigate, useLocation } from "react-router-dom";

export default function CustomerAuthGuard({ children }) {
  const location = useLocation();

  const accessToken =
    localStorage.getItem("prapt_access_token") ||
    sessionStorage.getItem("prapt_access_token");

  const customer =
    localStorage.getItem("prapt_customer") ||
    sessionStorage.getItem("prapt_customer");

  // Login nahi hai
  if (!accessToken || !customer) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location.pathname }}
      />
    );
  }

  return children;
}