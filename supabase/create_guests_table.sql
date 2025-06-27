-- Create guests table if it doesn't exist
CREATE TABLE IF NOT EXISTS guests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  phone TEXT,
  instagram_handle TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  -- Additional fields for guest authentication
  profile_photo_url TEXT,
  date_of_birth DATE,
  marketing_consent BOOLEAN DEFAULT false,
  last_login TIMESTAMP WITH TIME ZONE
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_guests_email ON guests(email);
CREATE INDEX IF NOT EXISTS idx_guests_phone ON guests(phone) WHERE phone IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_guests_instagram ON guests(instagram_handle) WHERE instagram_handle IS NOT NULL;

-- Create guest_auth table if it doesn't exist
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

-- Enable Row Level Security
ALTER TABLE guests ENABLE ROW LEVEL SECURITY;
ALTER TABLE guest_auth ENABLE ROW LEVEL SECURITY;

-- Create policies for guests table
-- Allow guests to read their own data
CREATE POLICY "Guests can view own profile" ON guests
    FOR SELECT USING (auth.uid()::text = id::text);

-- Allow guests to update their own data
CREATE POLICY "Guests can update own profile" ON guests
    FOR UPDATE USING (auth.uid()::text = id::text);

-- Allow anonymous users to create guest profiles (for signup)
CREATE POLICY "Anonymous can create guest profiles" ON guests
    FOR INSERT WITH CHECK (true);

-- Create policies for guest_auth table
-- Allow reading own auth data
CREATE POLICY "Guests can view own auth" ON guest_auth
    FOR SELECT USING (guest_id::text = auth.uid()::text);

-- Allow anonymous to create auth records (for signup)
CREATE POLICY "Anonymous can create auth records" ON guest_auth
    FOR INSERT WITH CHECK (true);

-- Allow updating own auth record
CREATE POLICY "Guests can update own auth" ON guest_auth
    FOR UPDATE USING (guest_id::text = auth.uid()::text);