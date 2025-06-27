-- Drop existing policies
DROP POLICY IF EXISTS "Guests can view own profile" ON guests;
DROP POLICY IF EXISTS "Guests can update own profile" ON guests;
DROP POLICY IF EXISTS "Anonymous can create guest profiles" ON guests;
DROP POLICY IF EXISTS "Guests can view own auth" ON guest_auth;
DROP POLICY IF EXISTS "Anonymous can create auth records" ON guest_auth;
DROP POLICY IF EXISTS "Guests can update own auth" ON guest_auth;

-- Temporarily disable RLS to test
ALTER TABLE guests DISABLE ROW LEVEL SECURITY;
ALTER TABLE guest_auth DISABLE ROW LEVEL SECURITY;

-- Alternative: Create more permissive policies for testing
-- ALTER TABLE guests ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE guest_auth ENABLE ROW LEVEL SECURITY;

-- Create policy that allows all operations for now (for testing)
-- CREATE POLICY "Allow all operations on guests" ON guests
--     FOR ALL USING (true) WITH CHECK (true);

-- CREATE POLICY "Allow all operations on guest_auth" ON guest_auth
--     FOR ALL USING (true) WITH CHECK (true);