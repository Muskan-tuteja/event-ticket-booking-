import { BrowserRouter, Routes, Route } from "react-router-dom";

// ================= PUBLIC =================
import Home from "./pages/public/Home";
import Events from "./pages/public/Events";
import EventDetails from "./pages/public/EventDetails";
import Checkout from "./pages/public/Checkout";
import PaymentSuccess from "./pages/public/PaymentSuccess";
import MyTickets from "./pages/public/MyTickets";
import Login from "./pages/public/Login";
import Register from "./pages/public/Register";

// ================= ORGANIZER =================
import OrganizerLogin from "./pages/organizer/OrganizerLogin";
import OrganizerRegister from "./pages/organizer/OrganizerRegister";
import OrganizerDashboard from "./pages/organizer/Dashboard";
import MyEvents from "./pages/organizer/MyEvents";
import CreateEvent from "./pages/organizer/CreateEvent";
import EventManagement from "./pages/organizer/EventManagement";
import TicketsSales from "./pages/organizer/TicketsSales";
import Attendees from "./pages/organizer/Attendees";
import Analytics from "./pages/organizer/Analytics";
import Settings from "./pages/organizer/Settings";

// ================= SCANNER =================
import Scanner from "./pages/scanner/Scanner";

// ================= ADMIN =================
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminEvents from "./pages/admin/Events";
import AdminLayout from "./pages/admin/AdminLayout";
import Organizers from "./pages/admin/Organizers";
import Customers from "./pages/admin/Customers";
import Orders from "./pages/admin/Orders";
import Tickets from "./pages/admin/Tickets";
import Payments from "./pages/admin/Payments";
import AdminAnalytics from "./pages/admin/Analytics";
import AdminSettings from "./pages/admin/Settings";

// ================= AUTH =================
import CustomerAuthGuard from "./components/auth/CustomerAuthGuard";
import RoleSelectionPopup from "./components/RoleSelectionPopup";
function App() {
  return (
    <BrowserRouter>

      {/* Popup MUST be outside Routes */}
      <RoleSelectionPopup />

      <Routes>

        {/* CUSTOMER AUTHENTICATION */}
        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        {/* CUSTOMER / PUBLIC WEBSITE */}
        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/events"
          element={
            <CustomerAuthGuard>
              <Events />
            </CustomerAuthGuard>
          }
        />

        <Route
          path="/events/:id"
          element={
            <CustomerAuthGuard>
              <EventDetails />
            </CustomerAuthGuard>
          }
        />

        <Route
          path="/checkout/:id"
          element={
            <CustomerAuthGuard>
              <Checkout />
            </CustomerAuthGuard>
          }
        />

        <Route
          path="/payment-success"
          element={
            <CustomerAuthGuard>
              <PaymentSuccess />
            </CustomerAuthGuard>
          }
        />

        <Route
          path="/tickets"
          element={
            <CustomerAuthGuard>
              <MyTickets />
            </CustomerAuthGuard>
          }
        />

        {/* ORGANIZER */}
        <Route
          path="/organizer"
          element={<OrganizerLogin />}
        />

        <Route
          path="/organizer/login"
          element={<OrganizerLogin />}
        />

        <Route
          path="/organizer/register"
          element={<OrganizerRegister />}
        />

        <Route
          path="/organizer/dashboard"
          element={<OrganizerDashboard />}
        />

        <Route
          path="/organizer/events"
          element={<MyEvents />}
        />

        <Route
          path="/organizer/create-event"
          element={<CreateEvent />}
        />

        <Route
          path="/organizer/events/:id"
          element={<EventManagement />}
        />

        <Route
          path="/organizer/tickets"
          element={<TicketsSales />}
        />

        <Route
          path="/organizer/attendees"
          element={<Attendees />}
        />

        <Route
          path="/organizer/analytics"
          element={<Analytics />}
        />

        <Route
          path="/organizer/settings"
          element={<Settings />}
        />

        {/* SCANNER */}
        <Route
          path="/scanner"
          element={<Scanner />}
        />

        {/* ADMIN LOGIN */}
        <Route
          path="/admin/login"
          element={<AdminLogin />}
        />

        {/* ADMIN */}
        <Route
          path="/admin"
          element={<AdminLayout />}
        >
          <Route
            index
            element={<AdminDashboard />}
          />

          <Route
            path="events"
            element={<AdminEvents />}
          />

          <Route
            path="organizers"
            element={<Organizers />}
          />

          <Route
            path="customers"
            element={<Customers />}
          />

          <Route
            path="orders"
            element={<Orders />}
          />

          <Route
            path="tickets"
            element={<Tickets />}
          />

          <Route
            path="payments"
            element={<Payments />}
          />

          <Route
            path="analytics"
            element={<AdminAnalytics />}
          />

          <Route
            path="settings"
            element={<AdminSettings />}
          />
        </Route>

      </Routes>

    </BrowserRouter>
  );
}

export default App;