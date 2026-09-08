import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/public/Home";
import Events from "./pages/public/Events";
import EventDetails from "./pages/public/EventDetails";
import Checkout from "./pages/public/Checkout";
import PaymentSuccess from "./pages/public/PaymentSuccess";
import MyTickets from "./pages/public/MyTickets";
import Login from "./pages/public/Login";
import Register from "./pages/public/Register";
import OrganizerDashboard from "./pages/organizer/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* PUBLIC WEBSITE */}

        <Route path="/" element={<Home />} />

        <Route path="/events" element={<Events />} />

        <Route
          path="/events/:id"
          element={<EventDetails />}
        />

        <Route
          path="/checkout/:id"
          element={<Checkout />}
        />

        <Route
          path="/payment-success"
          element={<PaymentSuccess />}
        />

        <Route
          path="/tickets"
          element={<MyTickets />}
        />

        <Route
          path="/login"
          element={<Login />}
        />
        <Route
  path="/register"
  element={<Register />}
/>

        {/* ORGANIZER */}

        <Route
          path="/organizer"
          element={<OrganizerDashboard />}
        />

        <Route
          path="/organizer/dashboard"
          element={<OrganizerDashboard />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;