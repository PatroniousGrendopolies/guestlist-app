-- Combined Migration Script for Guestlist App
-- Run this in Supabase SQL Editor: https://supabase.com/dashboard/project/ywgpjswkejhelbozxhrd/sql

-- ============================================================================
-- PART 1: Create Enums
-- ============================================================================

CREATE TYPE user_role AS ENUM (
    'OWNER',
    'MANAGER',
    'ASSISTANT_MANAGER',
    'DOORPERSON',
    'STAFF',
    'PROMOTER',
    'DJ',
    'VIP',
    'GUEST'
);

CREATE TYPE day_of_week AS ENUM ('monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday');
CREATE TYPE event_status AS ENUM ('active', 'cancelled', 'completed', 'under_promoted');
CREATE TYPE guest_tier AS ENUM ('regular', 'micro_promoter', 'vip', 'blocked');
CREATE TYPE list_type AS ENUM ('dj_list', 'staff_list', 'vip_list', 'promoter_list');
CREATE TYPE guest_entry_status AS ENUM ('pending', 'approved', 'denied');
CREATE TYPE invitation_status AS ENUM ('pending', 'accepted', 'declined');

-- ============================================================================
-- PART 2: Create Core Tables
-- ============================================================================

-- Profiles table (users/staff)
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  role user_role DEFAULT 'GUEST',
  given_name TEXT,
  stage_name TEXT,
  instagram_handle TEXT,
  phone TEXT,
  manager_permissions JSONB DEFAULT '{}',
  vip_qr_code TEXT UNIQUE,
  vip_max_plus_ones INTEGER DEFAULT 4,
  account_status TEXT DEFAULT 'active' CHECK (account_status IN ('active', 'suspended', 'inactive')),
  invited_by_user_id UUID REFERENCES profiles(id),
  default_capacity INTEGER,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Venues table
CREATE TABLE venues (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  address TEXT,
  lightspeed_location_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default venue
INSERT INTO venues (name, address) VALUES ('Datcha Nightclub', 'Montreal, QC');

-- Club schedule
CREATE TABLE club_schedule (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  venue_id UUID REFERENCES venues(id) ON DELETE CASCADE,
  day_of_week day_of_week NOT NULL,
  is_regular_night BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default schedule (Thu/Fri/Sat)
INSERT INTO club_schedule (venue_id, day_of_week, is_regular_night)
SELECT venues.id, 'thursday'::day_of_week, true FROM venues WHERE name = 'Datcha Nightclub'
UNION ALL
SELECT venues.id, 'friday'::day_of_week, true FROM venues WHERE name = 'Datcha Nightclub'
UNION ALL
SELECT venues.id, 'saturday'::day_of_week, true FROM venues WHERE name = 'Datcha Nightclub';

-- Events table
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

-- Guests table
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
  profile_photo_url TEXT,
  date_of_birth DATE,
  marketing_consent BOOLEAN DEFAULT false,
  last_login TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Event DJ assignments
CREATE TABLE event_dj_assignments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  event_id UUID REFERENCES events(id) ON DELETE CASCADE,
  dj_user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  invitation_sent_at TIMESTAMP WITH TIME ZONE,
  invitation_status invitation_status DEFAULT 'pending',
  is_returning_dj BOOLEAN DEFAULT false,
  display_order INTEGER,
  individual_capacity INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(event_id, dj_user_id)
);

-- Guest lists table
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
  conversion_rate DECIMAL(5,2) DEFAULT 0.0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Guest list entries
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

-- Plus ones table
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

-- Guest blocklist
CREATE TABLE guest_blocklist (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  guest_id UUID REFERENCES guests(id) ON DELETE CASCADE,
  blocked_by_user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  reason TEXT NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Guest authentication table
CREATE TABLE guest_auth (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    guest_id UUID REFERENCES guests(id) ON DELETE CASCADE,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT,
    google_id TEXT UNIQUE,
    email_verified BOOLEAN DEFAULT false,
    email_verified_at TIMESTAMP WITH TIME ZONE,
    last_login TIMESTAMP WITH TIME ZONE,
    reset_token TEXT,
    reset_token_expires TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    CONSTRAINT auth_method_check CHECK (
        (password_hash IS NOT NULL AND google_id IS NULL) OR
        (password_hash IS NULL AND google_id IS NOT NULL)
    )
);

-- Bans table
CREATE TABLE bans (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    guest_id UUID REFERENCES guests(id) ON DELETE CASCADE,
    banned_email TEXT,
    banned_phone TEXT,
    banned_instagram TEXT,
    banned_name TEXT,
    reason TEXT NOT NULL,
    duration_type TEXT NOT NULL CHECK (duration_type IN ('days', 'months', 'years', 'permanent')),
    duration_value INTEGER,
    expires_at TIMESTAMP WITH TIME ZONE,
    banned_by_user_id UUID REFERENCES profiles(id) NOT NULL,
    ban_lifted_by_user_id UUID REFERENCES profiles(id),
    ban_lifted_at TIMESTAMP WITH TIME ZONE,
    ban_lifted_reason TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    CONSTRAINT ban_identifier_check CHECK (
        guest_id IS NOT NULL OR
        banned_email IS NOT NULL OR
        banned_phone IS NOT NULL OR
        banned_instagram IS NOT NULL
    )
);

-- Capacity requests table
CREATE TABLE capacity_requests (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    requester_id UUID REFERENCES profiles(id) NOT NULL,
    event_id UUID REFERENCES events(id) NOT NULL,
    guest_list_id UUID REFERENCES guest_lists(id),
    current_limit INTEGER NOT NULL,
    requested_limit INTEGER NOT NULL,
    reason TEXT,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'denied')),
    approved_by_user_id UUID REFERENCES profiles(id),
    approved_at TIMESTAMP WITH TIME ZONE,
    denial_reason TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Venue settings table
CREATE TABLE venue_settings (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    venue_id UUID REFERENCES venues(id) ON DELETE CASCADE UNIQUE,
    default_event_capacity INTEGER DEFAULT 75,
    default_staff_capacity INTEGER DEFAULT 5,
    default_promoter_capacity INTEGER DEFAULT 20,
    default_dj_capacity INTEGER DEFAULT 75,
    default_max_plus_ones INTEGER DEFAULT 4,
    operating_schedule JSONB DEFAULT '[]',
    approval_warning_time TIME DEFAULT '15:00:00',
    approval_warning_threshold INTEGER DEFAULT 65,
    timezone TEXT DEFAULT 'America/Toronto',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default venue settings
INSERT INTO venue_settings (venue_id)
SELECT id FROM venues WHERE name = 'Datcha Nightclub';

-- ============================================================================
-- PART 3: Create Indexes
-- ============================================================================

CREATE INDEX idx_profiles_vip_qr ON profiles(vip_qr_code) WHERE vip_qr_code IS NOT NULL;
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
CREATE INDEX idx_guest_auth_email ON guest_auth(email);
CREATE INDEX idx_guest_auth_guest_id ON guest_auth(guest_id);
CREATE INDEX idx_guest_auth_google_id ON guest_auth(google_id) WHERE google_id IS NOT NULL;
CREATE INDEX idx_guest_auth_reset_token ON guest_auth(reset_token) WHERE reset_token IS NOT NULL;
CREATE INDEX idx_bans_guest_id ON bans(guest_id) WHERE is_active = true;
CREATE INDEX idx_bans_email ON bans(banned_email) WHERE is_active = true;
CREATE INDEX idx_bans_phone ON bans(banned_phone) WHERE is_active = true;
CREATE INDEX idx_bans_instagram ON bans(banned_instagram) WHERE is_active = true;
CREATE INDEX idx_bans_expires ON bans(expires_at) WHERE is_active = true;
CREATE INDEX idx_capacity_requests_requester ON capacity_requests(requester_id);
CREATE INDEX idx_capacity_requests_event ON capacity_requests(event_id);
CREATE INDEX idx_capacity_requests_status ON capacity_requests(status);

-- ============================================================================
-- PART 4: Enable Row Level Security
-- ============================================================================

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE venues ENABLE ROW LEVEL SECURITY;
ALTER TABLE club_schedule ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE guests ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_dj_assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE guest_lists ENABLE ROW LEVEL SECURITY;
ALTER TABLE guest_list_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE plus_ones ENABLE ROW LEVEL SECURITY;
ALTER TABLE guest_blocklist ENABLE ROW LEVEL SECURITY;
ALTER TABLE guest_auth ENABLE ROW LEVEL SECURITY;
ALTER TABLE bans ENABLE ROW LEVEL SECURITY;
ALTER TABLE capacity_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE venue_settings ENABLE ROW LEVEL SECURITY;

-- ============================================================================
-- PART 5: Create RLS Policies
-- ============================================================================

-- Service role has full access to everything
CREATE POLICY "service_role_all" ON profiles FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "service_role_venues" ON venues FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "service_role_schedule" ON club_schedule FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "service_role_events" ON events FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "service_role_guests" ON guests FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "service_role_dj_assignments" ON event_dj_assignments FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "service_role_guest_lists" ON guest_lists FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "service_role_entries" ON guest_list_entries FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "service_role_plus_ones" ON plus_ones FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "service_role_blocklist" ON guest_blocklist FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "service_role_guest_auth" ON guest_auth FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "service_role_bans" ON bans FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "service_role_capacity_requests" ON capacity_requests FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "service_role_venue_settings" ON venue_settings FOR ALL USING (auth.role() = 'service_role');

-- Venues (public read)
CREATE POLICY "authenticated_read_venues" ON venues FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "anon_read_venues" ON venues FOR SELECT USING (auth.role() = 'anon');

-- Events (authenticated read, managers write)
CREATE POLICY "authenticated_read_events" ON events FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "managers_manage_events" ON events FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role IN ('OWNER', 'MANAGER'))
);

-- Guests (public read/create for signup)
CREATE POLICY "authenticated_read_guests" ON guests FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "anon_read_guests" ON guests FOR SELECT USING (auth.role() = 'anon');
CREATE POLICY "anon_create_guests" ON guests FOR INSERT WITH CHECK (auth.role() = 'anon');
CREATE POLICY "authenticated_create_guests" ON guests FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Guest lists
CREATE POLICY "authenticated_read_guest_lists" ON guest_lists FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "anon_read_guest_lists" ON guest_lists FOR SELECT USING (auth.role() = 'anon');
CREATE POLICY "creators_manage_guest_lists" ON guest_lists FOR ALL USING (created_by_user_id = auth.uid());

-- Guest list entries
CREATE POLICY "authenticated_read_entries" ON guest_list_entries FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "anon_read_entries" ON guest_list_entries FOR SELECT USING (auth.role() = 'anon');
CREATE POLICY "anon_create_entries" ON guest_list_entries FOR INSERT WITH CHECK (auth.role() = 'anon');
CREATE POLICY "authenticated_create_entries" ON guest_list_entries FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- ============================================================================
-- PART 6: Create Helper Functions
-- ============================================================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for all tables
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_venues_updated_at BEFORE UPDATE ON venues
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_events_updated_at BEFORE UPDATE ON events
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_guests_updated_at BEFORE UPDATE ON guests
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_guest_lists_updated_at BEFORE UPDATE ON guest_lists
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_guest_list_entries_updated_at BEFORE UPDATE ON guest_list_entries
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to calculate ban expiration
CREATE OR REPLACE FUNCTION calculate_ban_expiration(
    duration_type TEXT,
    duration_value INTEGER
) RETURNS TIMESTAMP WITH TIME ZONE AS $$
BEGIN
    IF duration_type = 'permanent' THEN
        RETURN NULL;
    END IF;

    RETURN NOW() +
        CASE duration_type
            WHEN 'days' THEN INTERVAL '1 day' * duration_value
            WHEN 'months' THEN INTERVAL '1 month' * duration_value
            WHEN 'years' THEN INTERVAL '1 year' * duration_value
        END;
END;
$$ LANGUAGE plpgsql;

-- Trigger to set ban expiration
CREATE OR REPLACE FUNCTION set_ban_expiration() RETURNS TRIGGER AS $$
BEGIN
    NEW.expires_at := calculate_ban_expiration(NEW.duration_type, NEW.duration_value);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_ban_expiration_trigger
BEFORE INSERT OR UPDATE ON bans
FOR EACH ROW
EXECUTE FUNCTION set_ban_expiration();

-- ============================================================================
-- DONE! Your database schema is now set up.
-- ============================================================================
