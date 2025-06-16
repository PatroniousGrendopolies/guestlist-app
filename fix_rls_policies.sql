-- Fix RLS policies for profiles table to remove infinite recursion
-- This script will drop problematic policies and create new, simple ones

-- First, check what policies currently exist
SELECT 'Current policies before fix:' as message;
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual 
FROM pg_policies 
WHERE tablename = 'profiles';

-- Drop all existing policies that might be causing infinite recursion
DROP POLICY IF EXISTS "Authenticated users can view own profile" ON profiles;
DROP POLICY IF EXISTS "Authenticated users can update own profile" ON profiles; 
DROP POLICY IF EXISTS "Allow anon role to read profiles" ON profiles;
DROP POLICY IF EXISTS "Service role full access" ON profiles;
DROP POLICY IF EXISTS "Users can view own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
DROP POLICY IF EXISTS "Managers can view all profiles" ON profiles;
DROP POLICY IF EXISTS "Enable read access for all users" ON profiles;
DROP POLICY IF EXISTS "Enable read access for authenticated users" ON profiles;
DROP POLICY IF EXISTS "Enable read access for anon users" ON profiles;

-- Create simple, non-recursive policies
-- Policy 1: Allow authenticated users (logged in users) to read all profiles
-- This is safe because it doesn't reference the same table in the condition
CREATE POLICY "authenticated_users_read_profiles" ON profiles
  FOR SELECT 
  USING (auth.role() = 'authenticated');

-- Policy 2: Allow anon users (unauthenticated) to read all profiles 
-- This is needed for middleware to check roles before user is fully authenticated
CREATE POLICY "anon_users_read_profiles" ON profiles
  FOR SELECT 
  USING (auth.role() = 'anon');

-- Policy 3: Allow service role full access for admin operations
CREATE POLICY "service_role_full_access" ON profiles
  FOR ALL 
  USING (auth.role() = 'service_role');

-- Policy 4: Allow users to update their own profile only
-- This uses auth.uid() which is safe and doesn't cause recursion
CREATE POLICY "users_update_own_profile" ON profiles
  FOR UPDATE 
  USING (auth.uid() = id);

-- Policy 5: Allow users to insert their own profile (for new user creation)
CREATE POLICY "users_insert_own_profile" ON profiles
  FOR INSERT 
  WITH CHECK (auth.uid() = id);

-- Verify the new policies
SELECT 'New policies after fix:' as message;
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual 
FROM pg_policies 
WHERE tablename = 'profiles'
ORDER BY policyname;

-- Test the policies by trying to read from profiles
SELECT 'Testing profile access:' as message;
SELECT id, email, role, created_at 
FROM profiles 
WHERE email = 'patgoire@gmail.com';