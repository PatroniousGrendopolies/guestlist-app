-- Comprehensive Guestlist Management System Schema
-- This creates the complete database structure for nightclub guest list management

-- First, create enums for various status fields (skip invitation_status as it already exists)
CREATE TYPE day_of_week AS ENUM ('monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday');
CREATE TYPE event_status AS ENUM ('active', 'cancelled', 'completed', 'under_promoted');
CREATE TYPE guest_tier AS ENUM ('regular', 'micro_promoter', 'vip', 'blocked');
CREATE TYPE list_type AS ENUM ('dj_list', 'staff_list', 'vip_list', 'promoter_list');
CREATE TYPE guest_entry_status AS ENUM ('pending', 'approved', 'denied');

-- Venues table for future multi-venue support
CREATE TABLE venues (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  address TEXT,
  lightspeed_location_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default venue (Datcha)
INSERT INTO venues (name, address) VALUES ('Datcha Nightclub', 'Montreal, QC');

-- Club schedule table for operating days
CREATE TABLE club_schedule (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  venue_id UUID REFERENCES venues(id) ON DELETE CASCADE,
  day_of_week day_of_week NOT NULL,
  is_regular_night BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default schedule (Thu/Fri/Sat) - Fixed with proper enum casting
INSERT INTO club_schedule (venue_id, day_of_week, is_regular_night) 
SELECT venues.id, 'thursday'::day_of_week, true FROM venues WHERE name = 'Datcha Nightclub'
UNION ALL
SELECT venues.id, 'friday'::day_of_week, true FROM venues WHERE name = 'Datcha Nightclub'
UNION ALL  
SELECT venues.id, 'saturday'::day_of_week, true FROM venues WHERE name = 'Datcha Nightclub';

-- Enhanced events table
CREATE TABLE events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  date DATE NOT NULL,
  day_of_week day_of_week NOT NULL,
  venue_id UUID REFERENCES venues(id) ON DELETE CASCADE,
  status event_status DEFAULT 'active',
  max_total_capacity INTEGER DEFAULT 300,
  created_by_user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  lightspeed_event_id TEXT,
  predicted_attendance INTEGER,
  actual_attendance INTEGER,
  total_bar_sales DECIMAL(10,2),
  total_door_sales DECIMAL(10,2),
  paid_covers_count INTEGER,
  promotional_photos JSONB DEFAULT '[]'::jsonb,
  event_flyers JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enhanced guests table with tier system
CREATE TABLE guests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  phone TEXT,
  instagram_handle TEXT,
  postal_code TEXT,
  guest_tier guest_tier DEFAULT 'regular',
  total_events_attended INTEGER DEFAULT 0,
  conversion_rate DECIMAL(5,2) DEFAULT 0.0,
  last_attended_date DATE,
  vip_status_granted_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
  vip_status_granted_at TIMESTAMP WITH TIME ZONE,
  monthly_invite_allowance INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Event DJ assignments (many-to-many relationship)
CREATE TABLE event_dj_assignments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  event_id UUID REFERENCES events(id) ON DELETE CASCADE,
  dj_user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  invitation_sent_at TIMESTAMP WITH TIME ZONE,
  invitation_status invitation_status DEFAULT 'pending',
  is_returning_dj BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(event_id, dj_user_id)
);

-- Guest lists table with capacity and deadline management
CREATE TABLE guest_lists (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  event_id UUID REFERENCES events(id) ON DELETE CASCADE,
  created_by_user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  list_type list_type NOT NULL,
  name TEXT NOT NULL,
  max_capacity INTEGER DEFAULT 75,
  max_plus_size INTEGER DEFAULT 4,
  current_capacity INTEGER DEFAULT 0,
  list_deadline TIMESTAMP WITH TIME ZONE,
  approval_deadline TIMESTAMP WITH TIME ZONE,
  status event_status DEFAULT 'active',
  dj_photos JSONB DEFAULT '[]'::jsonb,
  dj_mixes_links JSONB DEFAULT '[]'::jsonb,
  dj_track_links JSONB DEFAULT '[]'::jsonb,
  conversion_rate DECIMAL(5,2) DEFAULT 0.0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Guest list entries (the main join table)
CREATE TABLE guest_list_entries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  guest_list_id UUID REFERENCES guest_lists(id) ON DELETE CASCADE,
  guest_id UUID REFERENCES guests(id) ON DELETE CASCADE,
  status guest_entry_status DEFAULT 'pending',
  plus_ones_requested INTEGER DEFAULT 0,
  plus_ones_checked_in INTEGER DEFAULT 0,
  qr_code TEXT UNIQUE,
  qr_code_used BOOLEAN DEFAULT false,
  checked_in_at TIMESTAMP WITH TIME ZONE,
  checked_in_by_user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  approved_by_user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  approved_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(guest_list_id, guest_id)
);

-- Plus ones table for optional contact collection
CREATE TABLE plus_ones (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  guest_list_entry_id UUID REFERENCES guest_list_entries(id) ON DELETE CASCADE,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  phone TEXT,
  qr_code TEXT UNIQUE,
  checked_in_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Guest blocklist table
CREATE TABLE guest_blocklist (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  guest_id UUID REFERENCES guests(id) ON DELETE CASCADE,
  blocked_by_user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  reason TEXT NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX idx_events_date ON events(date);
CREATE INDEX idx_events_venue ON events(venue_id);
CREATE INDEX idx_events_status ON events(status);
CREATE INDEX idx_guests_email ON guests(email);
CREATE INDEX idx_guests_tier ON guests(guest_tier);
CREATE INDEX idx_guest_lists_event ON guest_lists(event_id);
CREATE INDEX idx_guest_lists_creator ON guest_lists(created_by_user_id);
CREATE INDEX idx_guest_list_entries_list ON guest_list_entries(guest_list_id);
CREATE INDEX idx_guest_list_entries_guest ON guest_list_entries(guest_id);
CREATE INDEX idx_guest_list_entries_status ON guest_list_entries(status);
CREATE INDEX idx_guest_list_entries_qr ON guest_list_entries(qr_code);
CREATE INDEX idx_plus_ones_entry ON plus_ones(guest_list_entry_id);
CREATE INDEX idx_guest_blocklist_guest ON guest_blocklist(guest_id);
CREATE INDEX idx_guest_blocklist_active ON guest_blocklist(is_active);

-- Enable RLS on all tables
ALTER TABLE venues ENABLE ROW LEVEL SECURITY;
ALTER TABLE club_schedule ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE guests ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_dj_assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE guest_lists ENABLE ROW LEVEL SECURITY;
ALTER TABLE guest_list_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE plus_ones ENABLE ROW LEVEL SECURITY;
ALTER TABLE guest_blocklist ENABLE ROW LEVEL SECURITY;

-- Create simple RLS policies (avoiding infinite recursion)
-- Allow authenticated users to read all venue and schedule data
CREATE POLICY "authenticated_read_venues" ON venues FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "authenticated_read_schedule" ON club_schedule FOR SELECT USING (auth.role() = 'authenticated');

-- Allow anon users to read venue data (for guest signup)
CREATE POLICY "anon_read_venues" ON venues FOR SELECT USING (auth.role() = 'anon');

-- Events policies
CREATE POLICY "authenticated_read_events" ON events FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "managers_manage_events" ON events FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'MANAGER')
);

-- Guests policies  
CREATE POLICY "authenticated_read_guests" ON guests FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "anon_read_guests" ON guests FOR SELECT USING (auth.role() = 'anon');
CREATE POLICY "anon_create_guests" ON guests FOR INSERT WITH CHECK (auth.role() = 'anon');
CREATE POLICY "authenticated_create_guests" ON guests FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Guest lists policies
CREATE POLICY "authenticated_read_guest_lists" ON guest_lists FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "anon_read_guest_lists" ON guest_lists FOR SELECT USING (auth.role() = 'anon');
CREATE POLICY "creators_manage_guest_lists" ON guest_lists FOR ALL USING (created_by_user_id = auth.uid());

-- Guest list entries policies
CREATE POLICY "authenticated_read_entries" ON guest_list_entries FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "anon_read_entries" ON guest_list_entries FOR SELECT USING (auth.role() = 'anon');
CREATE POLICY "anon_create_entries" ON guest_list_entries FOR INSERT WITH CHECK (auth.role() = 'anon');
CREATE POLICY "authenticated_create_entries" ON guest_list_entries FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Plus ones policies
CREATE POLICY "authenticated_read_plus_ones" ON plus_ones FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "anon_read_plus_ones" ON plus_ones FOR SELECT USING (auth.role() = 'anon');
CREATE POLICY "anon_create_plus_ones" ON plus_ones FOR INSERT WITH CHECK (auth.role() = 'anon');

-- Blocklist policies (manager only)
CREATE POLICY "managers_manage_blocklist" ON guest_blocklist FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'MANAGER')
);

-- Service role full access on all tables
CREATE POLICY "service_role_venues" ON venues FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "service_role_schedule" ON club_schedule FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "service_role_events" ON events FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "service_role_guests" ON guests FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "service_role_dj_assignments" ON event_dj_assignments FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "service_role_guest_lists" ON guest_lists FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "service_role_entries" ON guest_list_entries FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "service_role_plus_ones" ON plus_ones FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "service_role_blocklist" ON guest_blocklist FOR ALL USING (auth.role() = 'service_role');