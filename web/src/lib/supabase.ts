import { createClient, SupabaseClient } from "@supabase/supabase-js";

let supabaseInstance: SupabaseClient | null = null;

function getSupabaseClient(): SupabaseClient {
  // Return cached instance if it exists
  if (supabaseInstance) {
    return supabaseInstance;
  }

  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    // Always create a client, even with placeholder values
    // This prevents crashes during SSR/build
    supabaseInstance = createClient(
      supabaseUrl || 'https://placeholder.supabase.co',
      supabaseAnonKey || 'placeholder-key',
      {
        auth: {
          persistSession: false,
          autoRefreshToken: false,
        },
      }
    );
  } catch (error) {
    // If client creation fails, create a minimal placeholder client
    console.error("Failed to create Supabase client:", error);
    supabaseInstance = createClient(
      'https://placeholder.supabase.co',
      'placeholder-key',
      {
        auth: {
          persistSession: false,
          autoRefreshToken: false,
        },
      }
    );
  }

  return supabaseInstance;
}

// Export a getter function instead of direct instance
// This ensures the client is only created when actually needed
export const supabase = getSupabaseClient();

