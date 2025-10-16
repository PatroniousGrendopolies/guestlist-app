const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase client
const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://ohkrtsyqbfphsqessdzj.supabase.co';
const supabaseKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9oa3J0c3lxYmZwaHNxZXNzZHpqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTg0MTEwMjMsImV4cCI6MjAzMzk4NzAyM30.e5iudSjqHhXrLxP2_XOwm6LjQPvTQzaHEmU2lCpGZwE';

const supabase = createClient(supabaseUrl, supabaseKey);

async function createTables() {
  console.log('Creating guests and guest_auth tables...');

  const { error } = await supabase.rpc('exec_sql', {
    sql: `
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

-- Create indexes for guest auth
CREATE INDEX IF NOT EXISTS idx_guest_auth_email ON guest_auth(email);
CREATE INDEX IF NOT EXISTS idx_guest_auth_guest_id ON guest_auth(guest_id);
CREATE INDEX IF NOT EXISTS idx_guest_auth_google_id ON guest_auth(google_id) WHERE google_id IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_guest_auth_reset_token ON guest_auth(reset_token) WHERE reset_token IS NOT NULL;

-- Enable Row Level Security
ALTER TABLE guests ENABLE ROW LEVEL SECURITY;
ALTER TABLE guest_auth ENABLE ROW LEVEL SECURITY;

-- Create policies for guests table
CREATE POLICY IF NOT EXISTS "Guests can view own profile" ON guests
    FOR SELECT USING (auth.uid()::text = id::text);

CREATE POLICY IF NOT EXISTS "Guests can update own profile" ON guests
    FOR UPDATE USING (auth.uid()::text = id::text);

CREATE POLICY IF NOT EXISTS "Anonymous can create guest profiles" ON guests
    FOR INSERT WITH CHECK (true);

-- Create policies for guest_auth table
CREATE POLICY IF NOT EXISTS "Guests can view own auth" ON guest_auth
    FOR SELECT USING (guest_id::text = auth.uid()::text);

CREATE POLICY IF NOT EXISTS "Anonymous can create auth records" ON guest_auth
    FOR INSERT WITH CHECK (true);

CREATE POLICY IF NOT EXISTS "Guests can update own auth" ON guest_auth
    FOR UPDATE USING (guest_id::text = auth.uid()::text);
    `,
  });

  if (error) {
    console.error('Error creating tables:', error);
    // If RPC doesn't work, provide manual instructions
    console.log('\nPlease run the SQL manually in Supabase dashboard:');
    console.log('1. Go to https://supabase.com/dashboard/project/ohkrtsyqbfphsqessdzj/sql/new');
    console.log('2. Copy the SQL from /supabase/create_guests_table.sql');
    console.log('3. Run the query');
  } else {
    console.log('Tables created successfully!');
  }
}

createTables().catch(console.error);
