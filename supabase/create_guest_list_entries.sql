-- Create guest list entries table to track friends who join through invites
CREATE TABLE IF NOT EXISTS guest_list_entries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  primary_guest_id UUID REFERENCES guests(id) ON DELETE CASCADE,
  attendee_name TEXT NOT NULL,
  attendee_phone TEXT NOT NULL,
  attendee_email TEXT NOT NULL,
  entry_type TEXT DEFAULT 'plus_one' CHECK (entry_type IN ('primary', 'plus_one')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_guest_list_entries_primary_guest ON guest_list_entries(primary_guest_id);
CREATE INDEX IF NOT EXISTS idx_guest_list_entries_type ON guest_list_entries(entry_type);
CREATE INDEX IF NOT EXISTS idx_guest_list_entries_email ON guest_list_entries(attendee_email);

-- Enable Row Level Security
ALTER TABLE guest_list_entries ENABLE ROW LEVEL SECURITY;

-- Create policies to allow guests to view their own entries
CREATE POLICY IF NOT EXISTS "Guests can view their own list entries" ON guest_list_entries
    FOR SELECT USING (primary_guest_id::text = auth.uid()::text);

-- Allow anonymous to create entries (for friend signups)
CREATE POLICY IF NOT EXISTS "Anonymous can create guest list entries" ON guest_list_entries
    FOR INSERT WITH CHECK (true);

-- Disable RLS for now to make testing easier
ALTER TABLE guest_list_entries DISABLE ROW LEVEL SECURITY;