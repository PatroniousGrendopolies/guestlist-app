// src/utils/supabase/admin.ts
import { createClient } from '@supabase/supabase-js';

/**
 * Admin Supabase client that uses the service role key
 * This bypasses Row Level Security (RLS) and should only be used
 * in secure server-side contexts like API routes.
 *
 * NEVER expose this client to the browser!
 */
export function createAdminClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error('Missing Supabase URL or Service Role Key');
  }

  return createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
