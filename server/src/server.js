import "dotenv/config";

import express from "express";
import cors from "cors";

import { supabaseAdmin } from "./config/supabase.js";
import authRoutes from "./routes/auth.js";

const app = express();


/* =========================================================
   MIDDLEWARE
========================================================= */

app.use(
  cors({
    origin: "http://localhost:5173",
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
        message: "Supabase connected, but organizers table is not ready",
        error: error.message,
      });
    }

    res.json({
      success: true,
      message: "PRAPT API + Supabase are connected",
    });
  } catch (error) {
    res.status(500).json({
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

app.listen(PORT, () => {
  console.log(`PRAPT Backend running on http://localhost:${PORT}`);
});