import express from "express";
import { supabaseAuth, supabaseAdmin } from "../config/supabase.js";

const router = express.Router();

/* =========================================================
   REGISTER
========================================================= */

router.post("/register", async (req, res) => {
  try {
    const {
      full_name,
      email,
      password,
      role = "customer",
    } = req.body;

    if (!full_name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Full name, email and password are required",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters",
      });
    }

    // Only allowed public registration roles
    if (!["customer", "organizer"].includes(role)) {
      return res.status(400).json({
        success: false,
        message: "Invalid registration role",
      });
    }

    // Create Supabase Auth user
    const {
      data: authData,
      error: authError,
    } = await supabaseAuth.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name,
          role,
        },
      },
    });

    if (authError) {
      return res.status(400).json({
        success: false,
        message: authError.message,
      });
    }

    const user = authData.user;

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User registration failed",
      });
    }

    // Create profile
    const {
      data: profile,
      error: profileError,
    } = await supabaseAdmin
      .from("profiles")
      .insert({
        id: user.id,
        full_name,
        email,
        role,
      })
      .select()
      .single();

    if (profileError) {
      return res.status(500).json({
        success: false,
        message: "User created but profile creation failed",
        error: profileError.message,
      });
    }

    // If organizer, create organizer record
    if (role === "organizer") {
      const {
        error: organizerError,
      } = await supabaseAdmin
        .from("organizers")
        .insert({
          id: user.id,
        });

      if (organizerError) {
        return res.status(500).json({
          success: false,
          message: "Profile created but organizer record failed",
          error: organizerError.message,
        });
      }
    }

    res.status(201).json({
      success: true,
      message: "Registration successful",
      user: {
        id: user.id,
        email: user.email,
        role,
      },
      profile,
      session: authData.session,
    });
  } catch (error) {
    console.error("REGISTER ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Registration failed",
      error: error.message,
    });
  }
});


/* =========================================================
   LOGIN
========================================================= */

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const {
      data,
      error,
    } = await supabaseAuth.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return res.status(401).json({
        success: false,
        message: error.message,
      });
    }

    if (!data.user) {
      return res.status(401).json({
        success: false,
        message: "Invalid login",
      });
    }

    // Get profile + role
    const {
      data: profile,
      error: profileError,
    } = await supabaseAdmin
      .from("profiles")
      .select("id, full_name, email, role")
      .eq("id", data.user.id)
      .single();

    if (profileError) {
      return res.status(500).json({
        success: false,
        message: "Profile not found",
        error: profileError.message,
      });
    }

    res.json({
      success: true,
      message: "Login successful",

      user: {
        id: data.user.id,
        email: data.user.email,
        full_name: profile.full_name,
        role: profile.role,
      },

      session: data.session,
    });
  } catch (error) {
    console.error("LOGIN ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Login failed",
      error: error.message,
    });
  }
});


export default router;