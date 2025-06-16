-- SAFEST FIX: Just ensure events table allows authenticated inserts
-- This doesn't drop anything, just adds a simple policy

-- Add a simple policy to allow authenticated users to insert events
CREATE POLICY IF NOT EXISTS "allow_authenticated_event_insert" ON events
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Add a simple policy to allow authenticated users to select events  
CREATE POLICY IF NOT EXISTS "allow_authenticated_event_select" ON events
  FOR SELECT USING (auth.role() = 'authenticated');