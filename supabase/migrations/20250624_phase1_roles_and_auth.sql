-- Phase 1: User Roles Update and Guest Authentication
-- This migration updates the user role system and adds guest authentication

-- First, we need to handle the existing role enum if it exists
DO $$ 
BEGIN
    -- Check if user_role enum exists
    IF EXISTS (SELECT 1 FROM pg_type WHERE typname = 'user_role') THEN
        -- Rename old values if they exist
        ALTER TYPE user_role RENAME VALUE 'DOORMAN' TO 'DOORPERSON';
    END IF;
EXCEPTION
    WHEN others THEN
        -- If rename fails, we'll create fresh
        NULL;
END $$;

-- Create new user_role enum with all roles
DO $$ 
BEGIN
    -- Drop old enum if exists and create new one
    DROP TYPE IF EXISTS user_role CASCADE;
    
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
EXCEPTION
    WHEN duplicate_object THEN 
        NULL;
END $$;

-- Update profiles table with new fields
ALTER TABLE profiles 
ADD COLUMN IF NOT EXISTS given_name TEXT,
ADD COLUMN IF NOT EXISTS stage_name TEXT,
ADD COLUMN IF NOT EXISTS instagram_handle TEXT,
ADD COLUMN IF NOT EXISTS phone TEXT,
ADD COLUMN IF NOT EXISTS manager_permissions JSONB DEFAULT '{}',
ADD COLUMN IF NOT EXISTS vip_qr_code TEXT UNIQUE,
ADD COLUMN IF NOT EXISTS vip_max_plus_ones INTEGER DEFAULT 4,
ADD COLUMN IF NOT EXISTS account_status TEXT DEFAULT 'active' CHECK (account_status IN ('active', 'suspended', 'inactive')),
ADD COLUMN IF NOT EXISTS invited_by_user_id UUID REFERENCES profiles(id),
ADD COLUMN IF NOT EXISTS default_capacity INTEGER,
ADD COLUMN IF NOT EXISTS notes TEXT;

-- Create index for VIP QR codes
CREATE INDEX IF NOT EXISTS idx_profiles_vip_qr ON profiles(vip_qr_code) WHERE vip_qr_code IS NOT NULL;

-- Guest authentication table (separate from staff profiles)
CREATE TABLE IF NOT EXISTS guest_auth (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    guest_id UUID REFERENCES guests(id) ON DELETE CASCADE,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT, -- NULL for Google OAuth users
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

-- Create indexes for guest auth
CREATE INDEX IF NOT EXISTS idx_guest_auth_email ON guest_auth(email);
CREATE INDEX IF NOT EXISTS idx_guest_auth_guest_id ON guest_auth(guest_id);
CREATE INDEX IF NOT EXISTS idx_guest_auth_google_id ON guest_auth(google_id) WHERE google_id IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_guest_auth_reset_token ON guest_auth(reset_token) WHERE reset_token IS NOT NULL;

-- Update guests table to support authentication
ALTER TABLE guests
ADD COLUMN IF NOT EXISTS profile_photo_url TEXT,
ADD COLUMN IF NOT EXISTS date_of_birth DATE,
ADD COLUMN IF NOT EXISTS marketing_consent BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS last_login TIMESTAMP WITH TIME ZONE;

-- Bans table for managing banned guests
CREATE TABLE IF NOT EXISTS bans (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    -- Can ban by guest_id or by identifiers
    guest_id UUID REFERENCES guests(id) ON DELETE CASCADE,
    banned_email TEXT,
    banned_phone TEXT,
    banned_instagram TEXT,
    banned_name TEXT,
    -- Ban details
    reason TEXT NOT NULL,
    duration_type TEXT NOT NULL CHECK (duration_type IN ('days', 'months', 'years', 'permanent')),
    duration_value INTEGER, -- NULL for permanent bans
    expires_at TIMESTAMP WITH TIME ZONE, -- Calculated from duration
    -- Metadata
    banned_by_user_id UUID REFERENCES profiles(id) NOT NULL,
    ban_lifted_by_user_id UUID REFERENCES profiles(id),
    ban_lifted_at TIMESTAMP WITH TIME ZONE,
    ban_lifted_reason TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    -- Ensure at least one identifier is provided
    CONSTRAINT ban_identifier_check CHECK (
        guest_id IS NOT NULL OR 
        banned_email IS NOT NULL OR 
        banned_phone IS NOT NULL OR 
        banned_instagram IS NOT NULL
    )
);

-- Create indexes for ban lookups
CREATE INDEX IF NOT EXISTS idx_bans_guest_id ON bans(guest_id) WHERE is_active = true;
CREATE INDEX IF NOT EXISTS idx_bans_email ON bans(banned_email) WHERE is_active = true;
CREATE INDEX IF NOT EXISTS idx_bans_phone ON bans(banned_phone) WHERE is_active = true;
CREATE INDEX IF NOT EXISTS idx_bans_instagram ON bans(banned_instagram) WHERE is_active = true;
CREATE INDEX IF NOT EXISTS idx_bans_expires ON bans(expires_at) WHERE is_active = true;

-- Capacity requests table
CREATE TABLE IF NOT EXISTS capacity_requests (
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

-- Create indexes for capacity requests
CREATE INDEX IF NOT EXISTS idx_capacity_requests_requester ON capacity_requests(requester_id);
CREATE INDEX IF NOT EXISTS idx_capacity_requests_event ON capacity_requests(event_id);
CREATE INDEX IF NOT EXISTS idx_capacity_requests_status ON capacity_requests(status);

-- Venue settings table
CREATE TABLE IF NOT EXISTS venue_settings (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    venue_id UUID REFERENCES venues(id) ON DELETE CASCADE UNIQUE,
    -- Default capacities
    default_event_capacity INTEGER DEFAULT 75,
    default_staff_capacity INTEGER DEFAULT 5,
    default_promoter_capacity INTEGER DEFAULT 20,
    default_dj_capacity INTEGER DEFAULT 75,
    default_max_plus_ones INTEGER DEFAULT 4,
    -- Operating schedule (JSON array of day configurations)
    operating_schedule JSONB DEFAULT '[]',
    -- Approval settings
    approval_warning_time TIME DEFAULT '15:00:00', -- 3 PM
    approval_warning_threshold INTEGER DEFAULT 65, -- percentage
    -- Other settings
    timezone TEXT DEFAULT 'America/Toronto',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default venue settings
INSERT INTO venue_settings (venue_id)
SELECT id FROM venues WHERE name = 'Datcha Nightclub'
ON CONFLICT (venue_id) DO NOTHING;

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

-- Function to check if a guest is banned
CREATE OR REPLACE FUNCTION is_guest_banned(
    p_guest_id UUID DEFAULT NULL,
    p_email TEXT DEFAULT NULL,
    p_phone TEXT DEFAULT NULL,
    p_instagram TEXT DEFAULT NULL
) RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM bans
        WHERE is_active = true
        AND (expires_at IS NULL OR expires_at > NOW())
        AND (
            (p_guest_id IS NOT NULL AND guest_id = p_guest_id) OR
            (p_email IS NOT NULL AND banned_email = p_email) OR
            (p_phone IS NOT NULL AND banned_phone = p_phone) OR
            (p_instagram IS NOT NULL AND banned_instagram = p_instagram)
        )
    );
END;
$$ LANGUAGE plpgsql;

-- Update existing triggers
CREATE TRIGGER update_guest_auth_updated_at BEFORE UPDATE ON guest_auth 
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_bans_updated_at BEFORE UPDATE ON bans 
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_capacity_requests_updated_at BEFORE UPDATE ON capacity_requests 
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_venue_settings_updated_at BEFORE UPDATE ON venue_settings 
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- RLS Policies for new tables
ALTER TABLE guest_auth ENABLE ROW LEVEL SECURITY;
ALTER TABLE bans ENABLE ROW LEVEL SECURITY;
ALTER TABLE capacity_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE venue_settings ENABLE ROW LEVEL SECURITY;

-- Guest auth policies (guests can only access their own auth)
CREATE POLICY "guests_own_auth" ON guest_auth 
    FOR ALL USING (guest_id IN (
        SELECT id FROM guests WHERE email = current_setting('request.jwt.claims', true)::json->>'email'
    ));

CREATE POLICY "service_role_guest_auth" ON guest_auth 
    FOR ALL USING (auth.role() = 'service_role');

-- Bans policies (only managers and above can manage)
CREATE POLICY "managers_manage_bans" ON bans 
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM profiles 
            WHERE profiles.id = auth.uid() 
            AND profiles.role IN ('OWNER', 'MANAGER')
        )
    );

CREATE POLICY "service_role_bans" ON bans 
    FOR ALL USING (auth.role() = 'service_role');

-- Capacity requests policies
CREATE POLICY "users_own_requests" ON capacity_requests 
    FOR SELECT USING (requester_id = auth.uid());

CREATE POLICY "users_create_requests" ON capacity_requests 
    FOR INSERT WITH CHECK (requester_id = auth.uid());

CREATE POLICY "managers_manage_requests" ON capacity_requests 
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM profiles 
            WHERE profiles.id = auth.uid() 
            AND profiles.role IN ('OWNER', 'MANAGER', 'ASSISTANT_MANAGER')
        )
    );

CREATE POLICY "service_role_capacity_requests" ON capacity_requests 
    FOR ALL USING (auth.role() = 'service_role');

-- Venue settings policies (only owners can modify)
CREATE POLICY "authenticated_read_venue_settings" ON venue_settings 
    FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "owners_manage_venue_settings" ON venue_settings 
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM profiles 
            WHERE profiles.id = auth.uid() 
            AND profiles.role = 'OWNER'
        )
    );

CREATE POLICY "service_role_venue_settings" ON venue_settings 
    FOR ALL USING (auth.role() = 'service_role');

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT SELECT ON venue_settings TO anon, authenticated;
GRANT ALL ON guest_auth TO authenticated;
GRANT SELECT ON bans TO authenticated;