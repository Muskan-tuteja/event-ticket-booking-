import express from "express";
import { supabaseAuth, supabaseAdmin } from "../config/supabase.js";

const router = express.Router();

/* =========================================================
   REGISTER
========================================================= */

router.post("/register", async (req, res) => {
  try {
    const {
      business_name,
      full_name,
      email,
      phone,
      password,
      role = "customer",
    } = req.body;

    // Normalize email
    const normalizedEmail = email?.trim().toLowerCase();

    /* =====================================================
       BASIC VALIDATION
    ===================================================== */

    if (!full_name || !normalizedEmail || !password) {
      return res.status(400).json({
        success: false,
        message: "Full name, email and password are required",
      });
    }

    /* =====================================================
       ROLE VALIDATION
    ===================================================== */

    if (!["customer", "organizer"].includes(role)) {
      return res.status(400).json({
        success: false,
        message: "Invalid registration role",
      });
    }

    /* =====================================================
       ORGANIZER VALIDATION
    ===================================================== */

    if (role === "organizer") {
      if (!business_name?.trim()) {
        return res.status(400).json({
          success: false,
          message: "Business / Organization name is required",
        });
      }

      if (!phone) {
        return res.status(400).json({
          success: false,
          message: "Phone number is required for organizer",
        });
      }

      if (!/^[0-9]{10}$/.test(phone)) {
        return res.status(400).json({
          success: false,
          message: "Please enter a valid 10-digit phone number",
        });
      }
    }

    /* =====================================================
       PASSWORD VALIDATION
    ===================================================== */

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters",
      });
    }

    /* =====================================================
       CHECK EMAIL ALREADY EXISTS IN PRAPT
       
       This prevents Customer email being used
       for Organizer registration.
    ===================================================== */

    const {
      data: existingProfile,
      error: existingProfileError,
    } = await supabaseAdmin
      .from("profiles")
      .select("id, full_name, email, role")
      .eq("email", normalizedEmail)
      .maybeSingle();

    if (existingProfileError) {
      console.error(
        "EXISTING PROFILE CHECK ERROR:",
        existingProfileError
      );

      return res.status(500).json({
        success: false,
        message: "Unable to verify email",
        error: existingProfileError.message,
      });
    }

    /* =====================================================
       EMAIL ALREADY EXISTS
    ===================================================== */

    if (existingProfile) {
      // Existing customer trying to register as organizer
      if (
        role === "organizer" &&
        existingProfile.role === "customer"
      ) {
        return res.status(409).json({
          success: false,
          code: "EMAIL_ALREADY_CUSTOMER",
          message:
            "This email is already registered as a Customer. Please use a different email for Organizer registration.",
        });
      }

      // Existing organizer trying to register again
      if (
        role === "organizer" &&
        existingProfile.role === "organizer"
      ) {
        return res.status(409).json({
          success: false,
          code: "EMAIL_ALREADY_ORGANIZER",
          message:
            "This email is already registered as an Organizer. Please use a different email.",
        });
      }

      // Existing organizer trying customer registration
      if (
        role === "customer" &&
        existingProfile.role === "organizer"
      ) {
        return res.status(409).json({
          success: false,
          code: "EMAIL_ALREADY_ORGANIZER",
          message:
            "This email is already registered as an Organizer. Please use a different email for Customer registration.",
        });
      }

      // Existing customer trying customer registration
      return res.status(409).json({
        success: false,
        code: "EMAIL_ALREADY_REGISTERED",
        message:
          "This email is already registered. Please use a different email.",
      });
    }

    /* =====================================================
       CREATE SUPABASE AUTH USER
    ===================================================== */

    const {
      data: authData,
      error: authError,
    } = await supabaseAuth.auth.signUp({
      email: normalizedEmail,
      password,

      options: {
        data: {
          full_name,
          role,

          ...(role === "organizer"
            ? {
                business_name: business_name.trim(),
                phone,
              }
            : {}),
        },
      },
    });

    /* =====================================================
       AUTH ERROR
    ===================================================== */

    if (authError) {
      console.error("SUPABASE AUTH ERROR:", authError);

      // Handle duplicate email from Supabase
      const authMessage = authError.message?.toLowerCase() || "";

      if (
        authMessage.includes("already registered") ||
        authMessage.includes("already exists") ||
        authMessage.includes("user already")
      ) {
        return res.status(409).json({
          success: false,
          code: "EMAIL_ALREADY_REGISTERED",
          message:
            role === "organizer"
              ? "Please use a different email for Organizer registration."
              : "Please use a different email.",
        });
      }

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

    /* =====================================================
       CREATE PROFILE
       
       profiles:
       id
       full_name
       email
       role

       Phone/business name NOT stored here
    ===================================================== */

    const {
      data: profile,
      error: profileError,
    } = await supabaseAdmin
      .from("profiles")
      .insert({
        id: user.id,
        full_name,
        email: normalizedEmail,
        role,
      })
      .select()
      .single();

    /* =====================================================
       PROFILE ERROR
    ===================================================== */

    if (profileError) {
      console.error("PROFILE ERROR:", profileError);

      return res.status(500).json({
        success: false,
        message: "User created but profile creation failed",
        error: profileError.message,
      });
    }

    /* =====================================================
       CREATE ORGANIZER RECORD
       
       organizers:
       id
       business_name
       phone
    ===================================================== */

    if (role === "organizer") {
      const {
        data: organizer,
        error: organizerError,
      } = await supabaseAdmin
        .from("organizers")
        .insert({
          id: user.id,
          business_name: business_name.trim(),
          phone,
        })
        .select()
        .single();

      /* ===================================================
         ORGANIZER ERROR
      =================================================== */

      if (organizerError) {
        console.error("ORGANIZER ERROR:", organizerError);

        return res.status(500).json({
          success: false,
          message: "Profile created but organizer record failed",
          error: organizerError.message,
        });
      }

      /* ===================================================
         SUCCESS - ORGANIZER
      =================================================== */

      return res.status(201).json({
        success: true,
        message: "Organizer registration successful",

        user: {
          id: user.id,
          email: user.email,
          role,
        },

        profile,
        organizer,

        session: authData.session,
      });
    }

    /* =====================================================
       SUCCESS - CUSTOMER
    ===================================================== */

    return res.status(201).json({
      success: true,
      message: "Customer registration successful",

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

    return res.status(500).json({
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

    /* =====================================================
       VALIDATION
    ===================================================== */

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    /* =====================================================
       SUPABASE LOGIN
    ===================================================== */

    const {
      data,
      error,
    } = await supabaseAuth.auth.signInWithPassword({
      email: email.trim().toLowerCase(),
      password,
    });

    /* =====================================================
       LOGIN ERROR
    ===================================================== */

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

    /* =====================================================
       GET PROFILE
    ===================================================== */

    const {
      data: profile,
      error: profileError,
    } = await supabaseAdmin
      .from("profiles")
      .select("id, full_name, email, role")
      .eq("id", data.user.id)
      .single();

    /* =====================================================
       PROFILE ERROR
    ===================================================== */

    if (profileError) {
      return res.status(500).json({
        success: false,
        message: "Profile not found",
        error: profileError.message,
      });
    }

    /* =====================================================
       LOGIN SUCCESS
    ===================================================== */

    return res.json({
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

    return res.status(500).json({
      success: false,
      message: "Login failed",
      error: error.message,
    });
  }
});

export default router;