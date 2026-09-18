import { supabaseAdmin } from "../config/supabase.js";

export const authMiddleware = async (req, res, next) => {
  try {
    // Authorization header check
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    // Token extract
    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Access token missing",
      });
    }

    // Verify token with Supabase
    const {
      data: { user },
      error,
    } = await supabaseAdmin.auth.getUser(token);

    if (error || !user) {
      return res.status(401).json({
        success: false,
        message: "Invalid or expired access token",
      });
    }

    // Get role/profile from database
    const { data: profile, error: profileError } = await supabaseAdmin
      .from("profiles")
      .select("id, full_name, email, role")
      .eq("id", user.id)
      .single();

    if (profileError || !profile) {
      return res.status(401).json({
        success: false,
        message: "User profile not found",
      });
    }

    // User information available to next middleware/route
    req.user = {
      id: user.id,
      email: user.email,
      full_name: profile.full_name,
      role: profile.role,
    };

    // Continue to next middleware/route
    next();
  } catch (error) {
    console.error("AUTH MIDDLEWARE ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Authentication verification failed",
    });
  }
};