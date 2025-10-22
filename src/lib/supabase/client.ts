import { createBrowserClient } from '@supabase/ssr';

// Read the Supabase credentials from the environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Create and export the Supabase browser client for Next.js App Router
// This properly handles session cookies for SSR
export const supabase = createBrowserClient(supabaseUrl, supabaseAnonKey);
