import { Navigate, useLocation } from "react-router-dom";

export default function CustomerAuthGuard({ children }) {
  const location = useLocation();

  const customer = localStorage.getItem("prapt_customer");

  // Login/Register pages ko allow karo
  if (
    location.pathname === "/login" ||
    location.pathname === "/register"
  ) {
    return children;
  }

  // Customer login nahi hai
  if (!customer) {
    return <Navigate to="/login" replace />;
  }

  return children;
}