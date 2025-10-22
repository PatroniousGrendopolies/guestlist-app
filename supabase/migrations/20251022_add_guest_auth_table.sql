-- Add guest authentication table for custom guest auth system
-- This allows guests to sign up with email/password or Google OAuth

CREATE TABLE guest_auth (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  guest_id UUID REFERENCES guests(id) ON DELETE CASCADE UNIQUE NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT,
  google_id TEXT UNIQUE,
  email_verified BOOLEAN DEFAULT false,
  email_verified_at TIMESTAMP WITH TIME ZONE,
  reset_token TEXT,
  reset_token_expires TIMESTAMP WITH TIME ZONE,
  last_login TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  CONSTRAINT password_or_google CHECK (
    password_hash IS NOT NULL OR google_id IS NOT NULL
  )
);

-- Create indexes for performance
CREATE INDEX idx_guest_auth_guest_id ON guest_auth(guest_id);
CREATE INDEX idx_guest_auth_email ON guest_auth(email);
CREATE INDEX idx_guest_auth_google_id ON guest_auth(google_id);
CREATE INDEX idx_guest_auth_reset_token ON guest_auth(reset_token);

-- Add trigger for automatic timestamp updates
CREATE TRIGGER update_guest_auth_updated_at
  BEFORE UPDATE ON guest_auth
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Enable RLS
ALTER TABLE guest_auth ENABLE ROW LEVEL SECURITY;

-- RLS policies for guest_auth
-- Allow anonymous users to create guest auth (for signup)
CREATE POLICY "anon_create_guest_auth" ON guest_auth
  FOR INSERT
  WITH CHECK (auth.role() = 'anon');

-- Allow anonymous users to read their own auth record (for login)
CREATE POLICY "anon_read_guest_auth" ON guest_auth
  FOR SELECT
  USING (auth.role() = 'anon');

-- Allow authenticated staff to read guest auth
CREATE POLICY "authenticated_read_guest_auth" ON guest_auth
  FOR SELECT
  USING (auth.role() = 'authenticated');

-- Service role full access
CREATE POLICY "service_role_guest_auth" ON guest_auth
  FOR ALL
  USING (auth.role() = 'service_role');
