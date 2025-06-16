-- Fix RLS infinite recursion issue
-- This script removes problematic RLS policies and creates simpler ones

-- Drop existing problematic policies on events table
DROP POLICY IF EXISTS "managers_manage_events" ON events;
DROP POLICY IF EXISTS "authenticated_read_events" ON events;

-- Drop existing problematic policies on profiles table that might cause recursion
DROP POLICY IF EXISTS "profiles_select_own" ON profiles;
DROP POLICY IF EXISTS "profiles_update_own" ON profiles;

-- Create simple, non-recursive policies for events
CREATE POLICY "events_select_all" ON events
  FOR SELECT USING (auth.role() = 'authenticated' OR auth.role() = 'service_role');

CREATE POLICY "events_insert_authenticated" ON events
  FOR INSERT WITH CHECK (auth.role() = 'authenticated' OR auth.role() = 'service_role');

CREATE POLICY "events_update_authenticated" ON events
  FOR UPDATE USING (auth.role() = 'authenticated' OR auth.role() = 'service_role');

CREATE POLICY "events_delete_authenticated" ON events
  FOR DELETE USING (auth.role() = 'authenticated' OR auth.role() = 'service_role');

-- Create simple, non-recursive policies for profiles
CREATE POLICY "profiles_select_all" ON profiles
  FOR SELECT USING (auth.role() = 'authenticated' OR auth.role() = 'service_role');

CREATE POLICY "profiles_insert_service" ON profiles
  FOR INSERT WITH CHECK (auth.role() = 'service_role');

CREATE POLICY "profiles_update_service" ON profiles
  FOR UPDATE USING (auth.role() = 'service_role');

-- Grant full access to service role
GRANT ALL ON events TO service_role;
GRANT ALL ON profiles TO service_role;