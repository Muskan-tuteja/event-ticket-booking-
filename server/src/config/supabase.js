import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL;
const publishableKey = process.env.SUPABASE_PUBLISHABLE_KEY;
const secretKey = process.env.SUPABASE_SECRET_KEY;

if (!supabaseUrl || !publishableKey || !secretKey) {
  throw new Error("Supabase environment variables are missing");
}

// Used for normal authentication
export const supabaseAuth = createClient(
  supabaseUrl,
  publishableKey
);

// Used only on backend for privileged database operations
export const supabaseAdmin = createClient(
  supabaseUrl,
  secretKey,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
);