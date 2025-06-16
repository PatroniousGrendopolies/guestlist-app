-- Simple schema to get started quickly
-- Create only the essential tables first

-- Create enums (skip if they exist)
DO $$ BEGIN
    CREATE TYPE event_status AS ENUM ('active', 'cancelled', 'completed', 'under_promoted');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE guest_tier AS ENUM ('regular', 'micro_promoter', 'vip', 'blocked');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE list_type AS ENUM ('dj_list', 'staff_list', 'vip_list', 'promoter_list');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE guest_entry_status AS ENUM ('pending', 'approved', 'denied');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Venues table
CREATE TABLE IF NOT EXISTS venues (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  address TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default venue if it doesn't exist
INSERT INTO venues (name, address) 
SELECT 'Datcha Nightclub', 'Montreal, QC'
WHERE NOT EXISTS (SELECT 1 FROM venues WHERE name = 'Datcha Nightclub');

-- Events table (using TEXT for day instead of enum)
CREATE TABLE IF NOT EXISTS events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  date DATE NOT NULL,
  day_of_week TEXT NOT NULL,
  venue_id UUID REFERENCES venues(id) ON DELETE CASCADE,
  status event_status DEFAULT 'active',
  max_total_capacity INTEGER DEFAULT 300,
  created_by_user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Guests table
CREATE TABLE IF NOT EXISTS guests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  phone TEXT,
  instagram_handle TEXT,
  guest_tier guest_tier DEFAULT 'regular',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Guest lists table
CREATE TABLE IF NOT EXISTS guest_lists (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  event_id UUID REFERENCES events(id) ON DELETE CASCADE,
  created_by_user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  list_type list_type NOT NULL,
  name TEXT NOT NULL,
  max_capacity INTEGER DEFAULT 75,
  current_capacity INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Guest list entries
CREATE TABLE IF NOT EXISTS guest_list_entries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  guest_list_id UUID REFERENCES guest_lists(id) ON DELETE CASCADE,
  guest_id UUID REFERENCES guests(id) ON DELETE CASCADE,
  status guest_entry_status DEFAULT 'pending',
  plus_ones_requested INTEGER DEFAULT 0,
  qr_code TEXT UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(guest_list_id, guest_id)
);

-- Enable RLS
ALTER TABLE venues ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE guests ENABLE ROW LEVEL SECURITY;
ALTER TABLE guest_lists ENABLE ROW LEVEL SECURITY;
ALTER TABLE guest_list_entries ENABLE ROW LEVEL SECURITY;

-- Simple RLS policies
CREATE POLICY "public_read_venues" ON venues FOR SELECT USING (true);
CREATE POLICY "authenticated_read_events" ON events FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "managers_manage_events" ON events FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'MANAGER')
);
CREATE POLICY "public_read_guests" ON guests FOR SELECT USING (true);
CREATE POLICY "public_create_guests" ON guests FOR INSERT WITH CHECK (true);
CREATE POLICY "public_read_guest_lists" ON guest_lists FOR SELECT USING (true);
CREATE POLICY "creators_manage_guest_lists" ON guest_lists FOR ALL USING (created_by_user_id = auth.uid());
CREATE POLICY "public_read_entries" ON guest_list_entries FOR SELECT USING (true);
CREATE POLICY "public_create_entries" ON guest_list_entries FOR INSERT WITH CHECK (true);