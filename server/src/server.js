import "dotenv/config";

import express from "express";
import cors from "cors";

import { supabaseAdmin } from "./config/supabase.js";
import authRoutes from "./routes/auth.js";

const app = express();

/* =========================================================
   CORS
========================================================= */

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "https://event-ticket-booking-rust.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests without origin
      // Example: Postman / server-to-server
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(
        new Error(`CORS blocked for origin: ${origin}`)
      );
    },
    credentials: true,
  })
);

app.use(express.json());

/* =========================================================
   ROOT
========================================================= */

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "PRAPT Backend API is running",
  });
});

/* =========================================================
   HEALTH CHECK
========================================================= */

app.get("/api/health", async (req, res) => {
  try {
    const { error } = await supabaseAdmin
      .from("organizers")
      .select("id")
      .limit(1);

    if (error) {
      return res.status(500).json({
        success: false,
        message:
          "Supabase connected, but organizers table is not ready",
        error: error.message,
      });
    }

    return res.json({
      success: true,
      message: "PRAPT API + Supabase are connected",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Supabase connection failed",
      error: error.message,
    });
  }
});

/* =========================================================
   AUTH ROUTES
========================================================= */

app.use("/api/auth", authRoutes);

/* =========================================================
   SERVER
========================================================= */

const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`PRAPT Backend running on port ${PORT}`);
});