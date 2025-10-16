# Guestlist App - Backend Integration Export

This document contains all files relevant to understanding how the frontend connects to the backend.

**Export Date:** $(date)

---

## Table of Contents

1. [Environment Configuration](#environment-configuration)
2. [Database Schema](#database-schema)
3. [Database Migrations](#database-migrations)
4. [API Routes](#api-routes)
5. [Supabase Client Setup](#supabase-client-setup)
6. [Authentication](#authentication)
7. [Type Definitions](#type-definitions)
8. [Middleware](#middleware)

---

# Environment Configuration


## File: `.env.local`

```
NEXT_PUBLIC_SUPABASE_URL=https://ohkrtsyqbfphsqessdzj.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9oa3J0c3lxYmZwaHNxZXNzZHpqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk0MDE4MzksImV4cCI6MjA2NDk3NzgzOX0.7CuqBIQ03WmR8YY5SzhPxwuS6RKQkscnY2_BUg3ejZg
```

# Database Schema


## File: `prisma/schema.prisma`

```prisma
// This is your Prisma schema file,
// learn more about it in the docs: https://pris.ly/d/prisma-schema

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// User model with role-based access control
model User {
  id            String    @id @default(uuid())
  email         String    @unique
  name          String
  password      String
  role          UserRole
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  events        Event[]   @relation("EventManager")
  guestLists    GuestList[] @relation("GuestListOwner")
  
  @@map("users")
}

enum UserRole {
  OWNER
  MANAGER
  ASSISTANT_MANAGER
  DOORPERSON
  STAFF
  PROMOTER
  DJ
  VIP
  GUEST
}

// Event model
model Event {
  id            String    @id @default(uuid())
  name          String
  date          DateTime
  description   String?
  managerId     String
  manager       User      @relation("EventManager", fields: [managerId], references: [id])
  guestLists    GuestList[]
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  
  @@map("events")
}

// Guest model
model Guest {
  id            String    @id @default(uuid())
  name          String
  email         String
  phone         String?
  privacyConsent Boolean  @default(false)
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  guestListEntries GuestListEntry[]
  
  @@map("guests")
}

// GuestList model
model GuestList {
  id            String    @id @default(uuid())
  name          String
  ownerId       String
  owner         User      @relation("GuestListOwner", fields: [ownerId], references: [id])
  eventId       String
  event         Event     @relation(fields: [eventId], references: [id])
  cap           Int?      // Optional cap on the number of guests
  entries       GuestListEntry[]
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  
  @@map("guest_lists")
}

// GuestListEntry model for individual guests on a list
model GuestListEntry {
  id            String    @id @default(uuid())
  guestListId   String
  guestList     GuestList @relation(fields: [guestListId], references: [id])
  guestId       String
  guest         Guest     @relation(fields: [guestId], references: [id])
  plusOnes      Int       @default(0) // Number of additional guests
  status        EntryStatus @default(PENDING)
  qrCode        String?   @unique
  checkedIn     Boolean   @default(false)
  checkedInAt   DateTime?
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  
  @@map("guest_list_entries")
}

enum EntryStatus {
  PENDING
  APPROVED
  DENIED
}

```

# Database Migrations


## File: `supabase/migrations/20250615191953_fix_rls_policies.sql`

```sql
-- Fix RLS policies for profiles table to remove infinite recursion

-- Drop all existing policies that might be causing infinite recursion
DROP POLICY IF EXISTS "Authenticated users can view own profile" ON profiles;
DROP POLICY IF EXISTS "Authenticated users can update own profile" ON profiles; 
DROP POLICY IF EXISTS "Allow anon role to read profiles" ON profiles;
DROP POLICY IF EXISTS "Service role full access" ON profiles;
DROP POLICY IF EXISTS "Users can view own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
DROP POLICY IF EXISTS "Managers can view all profiles" ON profiles;
DROP POLICY IF EXISTS "Enable read access for all users" ON profiles;
DROP POLICY IF EXISTS "Enable read access for authenticated users" ON profiles;
DROP POLICY IF EXISTS "Enable read access for anon users" ON profiles;

-- Create simple, non-recursive policies

-- Policy 1: Allow authenticated users (logged in users) to read all profiles
-- This is safe because it doesn't reference the same table in the condition
CREATE POLICY "authenticated_users_read_profiles" ON profiles
  FOR SELECT 
  USING (auth.role() = 'authenticated');

-- Policy 2: Allow anon users (unauthenticated) to read all profiles 
-- This is needed for middleware to check roles before user is fully authenticated
CREATE POLICY "anon_users_read_profiles" ON profiles
  FOR SELECT 
  USING (auth.role() = 'anon');

-- Policy 3: Allow service role full access for admin operations
CREATE POLICY "service_role_full_access" ON profiles
  FOR ALL 
  USING (auth.role() = 'service_role');

-- Policy 4: Allow users to update their own profile only
-- This uses auth.uid() which is safe and doesn't cause recursion
CREATE POLICY "users_update_own_profile" ON profiles
  FOR UPDATE 
  USING (auth.uid() = id);

-- Policy 5: Allow users to insert their own profile (for new user creation)
CREATE POLICY "users_insert_own_profile" ON profiles
  FOR INSERT 
  WITH CHECK (auth.uid() = id);
```


## File: `supabase/migrations/20250616005319_comprehensive_guestlist_schema.sql`

```sql
-- Comprehensive Guestlist Management System Schema
-- This creates the complete database structure for nightclub guest list management

-- First, create enums for various status fields
CREATE TYPE day_of_week AS ENUM ('monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday');
CREATE TYPE event_status AS ENUM ('active', 'cancelled', 'completed', 'under_promoted');
CREATE TYPE guest_tier AS ENUM ('regular', 'micro_promoter', 'vip', 'blocked');
CREATE TYPE list_type AS ENUM ('dj_list', 'staff_list', 'vip_list', 'promoter_list');
CREATE TYPE guest_entry_status AS ENUM ('pending', 'approved', 'denied');
CREATE TYPE invitation_status AS ENUM ('pending', 'accepted', 'declined');

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

-- Insert default schedule (Thu/Fri/Sat)
INSERT INTO club_schedule (venue_id, day_of_week, is_regular_night) 
SELECT venues.id, 'thursday', true FROM venues WHERE name = 'Datcha Nightclub'
UNION ALL
SELECT venues.id, 'friday', true FROM venues WHERE name = 'Datcha Nightclub'
UNION ALL  
SELECT venues.id, 'saturday', true FROM venues WHERE name = 'Datcha Nightclub';

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

-- Create functions for automatic timestamp updates
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_venues_updated_at BEFORE UPDATE ON venues FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_events_updated_at BEFORE UPDATE ON events FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_guests_updated_at BEFORE UPDATE ON guests FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_guest_lists_updated_at BEFORE UPDATE ON guest_lists FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_guest_list_entries_updated_at BEFORE UPDATE ON guest_list_entries FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_plus_ones_updated_at BEFORE UPDATE ON plus_ones FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_guest_blocklist_updated_at BEFORE UPDATE ON guest_blocklist FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Create function to automatically update current_capacity when guest list entries change
CREATE OR REPLACE FUNCTION update_guest_list_capacity()
RETURNS TRIGGER AS $$
BEGIN
    -- Update the current_capacity for the affected guest list
    UPDATE guest_lists 
    SET current_capacity = (
        SELECT COALESCE(SUM(1 + COALESCE(plus_ones_requested, 0)), 0)
        FROM guest_list_entries 
        WHERE guest_list_id = COALESCE(NEW.guest_list_id, OLD.guest_list_id)
        AND status = 'approved'
    )
    WHERE id = COALESCE(NEW.guest_list_id, OLD.guest_list_id);
    
    RETURN COALESCE(NEW, OLD);
END;
$$ language 'plpgsql';

-- Create triggers for automatic capacity updates
CREATE TRIGGER update_capacity_on_insert AFTER INSERT ON guest_list_entries FOR EACH ROW EXECUTE FUNCTION update_guest_list_capacity();
CREATE TRIGGER update_capacity_on_update AFTER UPDATE ON guest_list_entries FOR EACH ROW EXECUTE FUNCTION update_guest_list_capacity();
CREATE TRIGGER update_capacity_on_delete AFTER DELETE ON guest_list_entries FOR EACH ROW EXECUTE FUNCTION update_guest_list_capacity();

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
```


## File: `supabase/migrations/20250616005319_comprehensive_guestlist_schema_fixed.sql`

```sql
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

-- Insert default schedule (Thu/Fri/Sat)
INSERT INTO club_schedule (venue_id, day_of_week, is_regular_night) 
SELECT venues.id, 'thursday', true FROM venues WHERE name = 'Datcha Nightclub'
UNION ALL
SELECT venues.id, 'friday', true FROM venues WHERE name = 'Datcha Nightclub'
UNION ALL  
SELECT venues.id, 'saturday', true FROM venues WHERE name = 'Datcha Nightclub';

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

-- Create functions for automatic timestamp updates
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_venues_updated_at BEFORE UPDATE ON venues FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_events_updated_at BEFORE UPDATE ON events FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_guests_updated_at BEFORE UPDATE ON guests FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_guest_lists_updated_at BEFORE UPDATE ON guest_lists FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_guest_list_entries_updated_at BEFORE UPDATE ON guest_list_entries FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_plus_ones_updated_at BEFORE UPDATE ON plus_ones FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_guest_blocklist_updated_at BEFORE UPDATE ON guest_blocklist FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Create function to automatically update current_capacity when guest list entries change
CREATE OR REPLACE FUNCTION update_guest_list_capacity()
RETURNS TRIGGER AS $$
BEGIN
    -- Update the current_capacity for the affected guest list
    UPDATE guest_lists 
    SET current_capacity = (
        SELECT COALESCE(SUM(1 + COALESCE(plus_ones_requested, 0)), 0)
        FROM guest_list_entries 
        WHERE guest_list_id = COALESCE(NEW.guest_list_id, OLD.guest_list_id)
        AND status = 'approved'
    )
    WHERE id = COALESCE(NEW.guest_list_id, OLD.guest_list_id);
    
    RETURN COALESCE(NEW, OLD);
END;
$$ language 'plpgsql';

-- Create triggers for automatic capacity updates
CREATE TRIGGER update_capacity_on_insert AFTER INSERT ON guest_list_entries FOR EACH ROW EXECUTE FUNCTION update_guest_list_capacity();
CREATE TRIGGER update_capacity_on_update AFTER UPDATE ON guest_list_entries FOR EACH ROW EXECUTE FUNCTION update_guest_list_capacity();
CREATE TRIGGER update_capacity_on_delete AFTER DELETE ON guest_list_entries FOR EACH ROW EXECUTE FUNCTION update_guest_list_capacity();

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
```


## File: `supabase/migrations/20250616005319_comprehensive_guestlist_schema_minimal.sql`

```sql
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
```


## File: `supabase/migrations/20250616_add_event_deadline_fields.sql`

```sql
-- Add missing fields to events table for PRD requirements
-- Adding description, guest list deadline, and DJ approval deadline

ALTER TABLE events 
ADD COLUMN description TEXT,
ADD COLUMN guest_list_deadline TIMESTAMP WITH TIME ZONE,
ADD COLUMN dj_approval_deadline TIMESTAMP WITH TIME ZONE;
```


## File: `supabase/migrations/20250624_fix_profiles_role.sql`

```sql
-- Fix profiles table role column to use the new user_role enum
-- This needs to be run after the previous migration

-- First, we need to check if profiles table has a role column
DO $$ 
BEGIN
    -- Check if role column exists
    IF EXISTS (
        SELECT 1 
        FROM information_schema.columns 
        WHERE table_name = 'profiles' 
        AND column_name = 'role'
    ) THEN
        -- Temporarily remove the constraint
        ALTER TABLE profiles 
        ALTER COLUMN role TYPE TEXT;
        
        -- Update existing roles to new values
        UPDATE profiles 
        SET role = CASE 
            WHEN role = 'DOORMAN' THEN 'DOORPERSON'
            ELSE role
        END;
        
        -- Apply the new enum type
        ALTER TABLE profiles 
        ALTER COLUMN role TYPE user_role 
        USING role::user_role;
    ELSE
        -- Add role column if it doesn't exist
        ALTER TABLE profiles 
        ADD COLUMN role user_role DEFAULT 'GUEST';
    END IF;
END $$;

-- Update any existing test data or default users
-- Convert any DOORMAN roles to DOORPERSON
UPDATE profiles 
SET role = 'DOORPERSON' 
WHERE role::text = 'DOORMAN';

-- Ensure all staff accounts have proper fields
UPDATE profiles 
SET default_capacity = CASE
    WHEN role = 'STAFF' THEN 5
    WHEN role = 'PROMOTER' THEN 20
    WHEN role = 'DJ' THEN 75
    ELSE default_capacity
END
WHERE default_capacity IS NULL;
```


## File: `supabase/migrations/20250624_phase1_roles_and_auth.sql`

```sql
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
```


## File: `supabase/migrations/simple_schema.sql`

```sql
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
```

# RLS Policies & Security


## File: `fix-rls-policies.sql`

```sql
-- Fix RLS infinite recursion issue
-- This script removes problematic RLS policies and creates simpler ones

-- Drop existing problematic policies on events table
DROP POLICY IF EXISTS "managers_manage_events" ON events;
DROP POLICY IF EXISTS "authenticated_read_events" ON events;

-- Drop existing problematic policies on profiles table that might cause recursion
DROP POLICY IF EXISTS "profiles_select_own" ON profiles;
DROP POLICY IF EXISTS "profiles_update_own" ON profiles;

-- Create simple, non-recursive policies for events
CREATE POLICY "events_select_all" ON events
  FOR SELECT USING (auth.role() = 'authenticated' OR auth.role() = 'service_role');

CREATE POLICY "events_insert_authenticated" ON events
  FOR INSERT WITH CHECK (auth.role() = 'authenticated' OR auth.role() = 'service_role');

CREATE POLICY "events_update_authenticated" ON events
  FOR UPDATE USING (auth.role() = 'authenticated' OR auth.role() = 'service_role');

CREATE POLICY "events_delete_authenticated" ON events
  FOR DELETE USING (auth.role() = 'authenticated' OR auth.role() = 'service_role');

-- Create simple, non-recursive policies for profiles
CREATE POLICY "profiles_select_all" ON profiles
  FOR SELECT USING (auth.role() = 'authenticated' OR auth.role() = 'service_role');

CREATE POLICY "profiles_insert_service" ON profiles
  FOR INSERT WITH CHECK (auth.role() = 'service_role');

CREATE POLICY "profiles_update_service" ON profiles
  FOR UPDATE USING (auth.role() = 'service_role');

-- Grant full access to service role
GRANT ALL ON events TO service_role;
GRANT ALL ON profiles TO service_role;
```


## File: `safe-rls-fix.sql`

```sql
-- SAFE RLS Fix - Only adds policies, doesn't drop existing ones
-- This is a non-destructive approach to fix the infinite recursion

-- Add simple authenticated policies for events if they don't exist
DO $$
BEGIN
    -- Try to create events policies, ignore if they already exist
    BEGIN
        CREATE POLICY "events_authenticated_insert" ON events
          FOR INSERT WITH CHECK (auth.role() = 'authenticated');
    EXCEPTION
        WHEN duplicate_object THEN
            -- Policy already exists, skip
            NULL;
    END;

    BEGIN
        CREATE POLICY "events_authenticated_select" ON events
          FOR SELECT USING (auth.role() = 'authenticated');
    EXCEPTION
        WHEN duplicate_object THEN
            -- Policy already exists, skip
            NULL;
    END;

    BEGIN
        CREATE POLICY "events_authenticated_update" ON events
          FOR UPDATE USING (auth.role() = 'authenticated');
    EXCEPTION
        WHEN duplicate_object THEN
            -- Policy already exists, skip
            NULL;
    END;
END $$;
```


## File: `supabase/fix_guest_policies.sql`

```sql
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
```

# API Routes


## File: `src/app/api/invitations/route.ts`

```typescript
// src/app/api/invitations/route.ts
import { NextResponse, type NextRequest } from 'next/server';
import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { cookies } from 'next/headers'; // Import cookies from next/headers
import { UserRole } from '@/types/enums';

export async function POST(request: NextRequest) {
  const cookieStore = await cookies(); // Await cookies() as per linter feedback

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get: (name: string) => {
          return cookieStore.get(name)?.value;
        },
        set: (name: string, value: string, options: CookieOptions) => {
          cookieStore.set(name, value, options); // Align with Supabase examples
        },
        remove: (name: string, options: CookieOptions) => {
          cookieStore.set(name, '', options); // Align with Supabase examples
        },
      },
    }
  );

  // 1. Get Authenticated User
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return NextResponse.json({ error: 'Unauthorized: User not authenticated.' }, { status: 401 });
  }

  // 2. Check if User is a Manager
  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();

  if (profileError || !profile) {
    console.error('Error fetching profile for invitation creation:', profileError);
    return NextResponse.json({ error: 'Failed to verify user role.' }, { status: 500 });
  }

  // Check if user has manager role
  if (profile.role !== UserRole.MANAGER) {
    return NextResponse.json(
      { error: 'Forbidden: Only managers can send invitations.' },
      { status: 403 }
    );
  }

  // 3. Parse and Validate Request Body
  let requestBody;
  try {
    requestBody = await request.json();
  } catch {
    // Removed unused variable 'e'
    return NextResponse.json({ error: 'Invalid request body: Must be JSON.' }, { status: 400 });
  }

  const { email, roleToAssign } = requestBody;

  if (!email || typeof email !== 'string' || !/\S+@\S+\.\S+/.test(email)) {
    return NextResponse.json({ error: 'Invalid email address provided.' }, { status: 400 });
  }

  if (!roleToAssign || !Object.values(UserRole).includes(roleToAssign as UserRole)) {
    return NextResponse.json(
      { error: `Invalid role specified. Must be one of: ${Object.values(UserRole).join(', ')}` },
      { status: 400 }
    );
  }

  // 4. Create Invitation in Database
  const { data: invitation, error: insertError } = await supabase
    .from('invitations')
    .insert({
      email: email,
      role_to_assign: roleToAssign as UserRole,
      invited_by_user_id: user.id,
    })
    .select()
    .single();

  if (insertError) {
    console.error('Error creating invitation:', insertError);
    if (insertError.code === '23505') {
      return NextResponse.json(
        { error: 'Failed to create invitation. Possible duplicate or constraint violation.' },
        { status: 409 }
      );
    }
    return NextResponse.json(
      { error: 'Failed to create invitation in database.' },
      { status: 500 }
    );
  }

  // 5. Return Success Response
  // Cookies are now handled by the cookieStore, so direct NextResponse is fine.
  return NextResponse.json(
    { message: 'Invitation created successfully.', invitation },
    { status: 201 }
  );
}

```

# Supabase Client Setup


## File: `src/lib/supabase/client.ts`

```typescript
import { createClient } from '@supabase/supabase-js';

// Read the Supabase credentials from the environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Create and export the Supabase client with better configuration
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
  global: {
    headers: {
      'User-Agent': 'guestlist-app/1.0',
    },
  },
});

```


## File: `src/utils/supabase/client.ts`

```typescript
// src/utils/supabase/client.ts
import { createBrowserClient } from '@supabase/ssr';

export function createClient() {
  // Create a supabase client on the browser with project's credentials
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

```


## File: `src/lib/db/prisma.ts`

```typescript
/**
 * Prisma client mock for development
 * This will be replaced with a proper Prisma setup once we fully integrate with the database
 */

// Define a simple mock Prisma client
const mockPrismaClient = {
  user: {
    findUnique: () => Promise.resolve(null),
    findMany: () => Promise.resolve([]),
    create: () => Promise.resolve({}),
    update: () => Promise.resolve({}),
    delete: () => Promise.resolve({}),
  },
  // Add other models as needed
};

// For development, we'll use a simple mock
// In production, this would be replaced with a real PrismaClient
const prisma = mockPrismaClient;

// Export the mock client
export default prisma;

```

# Authentication Configuration


## File: `src/lib/auth/auth.ts`

```typescript
// Bridge between Supabase auth and test expectations
import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { UserRole } from '@/types/enums';

export interface AuthUser {
  id: string;
  name?: string;
  email: string;
  role: UserRole;
}

export interface AuthSession {
  user: AuthUser;
}

/**
 * Server-side authentication function that mimics NextAuth patterns
 * but uses Supabase under the hood. This provides compatibility with
 * existing test expectations.
 */
export async function auth(): Promise<AuthSession | null> {
  try {
    const cookieStore = await cookies();

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return cookieStore.get(name)?.value;
          },
          set(name: string, value: string, options: CookieOptions) {
            cookieStore.set({ name, value, ...options });
          },
          remove(name: string, options: CookieOptions) {
            cookieStore.set({ name, value: '', ...options });
          },
        },
      }
    );

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return null;
    }

    // Get user profile with role information
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('role, first_name, last_name')
      .eq('id', user.id)
      .single();

    if (profileError || !profile) {
      console.error('Auth: Error fetching user profile:', profileError);
      return null;
    }

    // Convert the role from database format to enum format
    // Handle both snake_case and UPPERCASE formats
    let userRole: UserRole;
    const roleString = profile.role?.toString().toUpperCase();

    switch (roleString) {
      case 'OWNER':
        userRole = UserRole.OWNER;
        break;
      case 'MANAGER':
        userRole = UserRole.MANAGER;
        break;
      case 'ASSISTANT_MANAGER':
        userRole = UserRole.ASSISTANT_MANAGER;
        break;
      case 'DOORPERSON':
      case 'DOORMAN': // For backward compatibility
      case 'DOOR_STAFF':
        userRole = UserRole.DOORPERSON;
        break;
      case 'STAFF':
        userRole = UserRole.STAFF;
        break;
      case 'PROMOTER':
        userRole = UserRole.PROMOTER;
        break;
      case 'DJ':
        userRole = UserRole.DJ;
        break;
      case 'VIP':
        userRole = UserRole.VIP;
        break;
      case 'GUEST':
        userRole = UserRole.GUEST;
        break;
      default:
        console.warn(`Auth: Unknown role ${profile.role}, defaulting to GUEST`);
        userRole = UserRole.GUEST;
    }

    const fullName = [profile.first_name, profile.last_name].filter(Boolean).join(' ');

    return {
      user: {
        id: user.id,
        email: user.email || '',
        name: fullName || user.email?.split('@')[0] || 'User',
        role: userRole,
      },
    };
  } catch (error) {
    console.error('Auth: Unexpected error during authentication:', error);
    return null;
  }
}

/**
 * Get the current session for client-side usage
 */
export async function getSession(): Promise<AuthSession | null> {
  return auth();
}

// Types are already exported above

```


## File: `src/lib/auth/auth-options.ts`

```typescript
// Removed bcrypt import for Edge Runtime compatibility
import { NextAuthConfig } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { UserRole } from '@/types/enums';
// Will be used when we integrate with the database
// import prisma from "@/lib/db/prisma";
// Removed bcrypt import for Vercel Edge Runtime compatibility

// Force Node.js runtime instead of Edge Runtime
export const runtime = 'nodejs';

// Type for credentials passed to the authorize function
// Will be used when we integrate with the database
// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface AuthorizeCredentials {
  email: string;
  password: string;
}

type JWTCallbackParams = {
  token: {
    id?: string;
    role?: UserRole;
    email?: string;
  };
  user?: {
    id: string;
    role: UserRole;
    email: string;
    name?: string;
    emailVerified?: Date;
  };
};

type SessionCallbackParams = {
  session: {
    user: {
      id?: string;
      role?: UserRole;
      email?: string;
      name?: string;
    };
  };
  token: {
    id?: string;
    role?: UserRole;
    email?: string;
  };
};

export const authOptions: NextAuthConfig = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials: Record<string, string> | undefined) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          // In production, this would use the actual Prisma client
          // This is a placeholder implementation until Prisma is properly installed
          const mockUsers = [
            {
              id: '1',
              name: 'Admin User',
              email: 'admin@example.com',
              // Plain text for Edge Runtime compatibility
              password: 'password123',
              role: UserRole.MANAGER,
              emailVerified: new Date(),
            },
          ];

          // In production, this would be a real database query
          const user = mockUsers.find(u => u.email === credentials.email);

          if (!user) {
            return null;
          }

          // Simple password comparison for Edge Runtime compatibility
          // In production, we would use proper password hashing not in Edge Runtime
          const passwordMatch = credentials.password === user.password;

          if (!passwordMatch) {
            return null;
          }

          return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            emailVerified: user.emailVerified,
          };
        } catch (error) {
          console.error('Authentication error:', error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: JWTCallbackParams) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }: SessionCallbackParams) {
      if (token) {
        session.user.id = token.id as string;
        session.user.role = token.role as UserRole;
        session.user.email = token.email as string;
      }
      return session;
    },
  },
  pages: {
    signIn: '/auth/login',
    error: '/auth/error',
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === 'development',
};

```


## File: `src/lib/auth/guest-auth.ts`

```typescript
import { supabase as supabaseClient } from '@/lib/supabase/client';
import * as bcrypt from 'bcryptjs';

export interface GuestAuthData {
  email: string;
  password?: string;
  googleId?: string;
  guestId: string;
}

export interface GuestSession {
  guestId: string;
  email: string;
  name: string;
  verified: boolean;
}

export class GuestAuthService {
  private supabase = supabaseClient;

  /**
   * Register a new guest with email and password
   */
  async registerWithEmail(
    email: string,
    password: string,
    guestData: {
      firstName: string;
      lastName: string;
      phone?: string;
      instagramHandle?: string;
    }
  ): Promise<{ guest: GuestSession; error?: string }> {
    try {
      // Check if email already exists
      const { data: existingAuth } = await this.supabase
        .from('guest_auth')
        .select('id')
        .eq('email', email)
        .single();

      if (existingAuth) {
        return { guest: null!, error: 'Email already registered' };
      }

      // Create guest record
      const { data: guest, error: guestError } = await this.supabase
        .from('guests')
        .insert({
          first_name: guestData.firstName,
          last_name: guestData.lastName,
          email: email,
          phone: guestData.phone,
          instagram_handle: guestData.instagramHandle,
        })
        .select()
        .single();

      if (guestError) {
        return { guest: null!, error: 'Failed to create guest profile' };
      }

      // Hash password
      const passwordHash = await bcrypt.hash(password, 10);

      // Create auth record
      const { error: authError } = await this.supabase
        .from('guest_auth')
        .insert({
          guest_id: guest.id,
          email: email,
          password_hash: passwordHash,
        })
        .select()
        .single();

      if (authError) {
        // Rollback guest creation
        await this.supabase.from('guests').delete().eq('id', guest.id);
        return { guest: null!, error: 'Failed to create authentication' };
      }

      // Skip email verification for now (TODO: implement proper email service)
      // await this.sendVerificationEmail(email, guest.id);

      return {
        guest: {
          guestId: guest.id,
          email: email,
          name: `${guest.first_name} ${guest.last_name}`,
          verified: false,
        },
      };
    } catch (error) {
      console.error('Guest registration error:', error);
      return { guest: null!, error: 'Registration failed' };
    }
  }

  /**
   * Login with email and password
   */
  async loginWithEmail(
    email: string,
    password: string
  ): Promise<{ guest: GuestSession; error?: string }> {
    try {
      // Get auth record
      const { data: auth, error: authError } = await this.supabase
        .from('guest_auth')
        .select('*, guest:guests(*)')
        .eq('email', email)
        .single();

      if (authError || !auth) {
        return { guest: null!, error: 'Invalid credentials' };
      }

      // Verify password
      const validPassword = await bcrypt.compare(password, auth.password_hash);
      if (!validPassword) {
        return { guest: null!, error: 'Invalid credentials' };
      }

      // Update last login
      await this.supabase
        .from('guest_auth')
        .update({ last_login: new Date().toISOString() })
        .eq('id', auth.id);

      await this.supabase
        .from('guests')
        .update({ last_login: new Date().toISOString() })
        .eq('id', auth.guest_id);

      return {
        guest: {
          guestId: auth.guest_id,
          email: auth.email,
          name: `${auth.guest.first_name} ${auth.guest.last_name}`,
          verified: auth.email_verified,
        },
      };
    } catch (error) {
      console.error('Guest login error:', error);
      return { guest: null!, error: 'Login failed' };
    }
  }

  /**
   * Register/login with Google OAuth
   */
  async authenticateWithGoogle(googleProfile: {
    id: string;
    email: string;
    name: string;
    picture?: string;
  }): Promise<{ guest: GuestSession; error?: string }> {
    try {
      // Check if Google ID exists
      const { data: existingAuth } = await this.supabase
        .from('guest_auth')
        .select('*, guest:guests(*)')
        .eq('google_id', googleProfile.id)
        .single();

      if (existingAuth) {
        // Update last login
        await this.supabase
          .from('guest_auth')
          .update({ last_login: new Date().toISOString() })
          .eq('id', existingAuth.id);

        return {
          guest: {
            guestId: existingAuth.guest_id,
            email: existingAuth.email,
            name: `${existingAuth.guest.first_name} ${existingAuth.guest.last_name}`,
            verified: true, // Google accounts are pre-verified
          },
        };
      }

      // Create new guest
      const nameParts = googleProfile.name.split(' ');
      const firstName = nameParts[0];
      const lastName = nameParts.slice(1).join(' ') || '';

      const { data: guest, error: guestError } = await this.supabase
        .from('guests')
        .insert({
          first_name: firstName,
          last_name: lastName,
          email: googleProfile.email,
          profile_photo_url: googleProfile.picture,
        })
        .select()
        .single();

      if (guestError) {
        return { guest: null!, error: 'Failed to create guest profile' };
      }

      // Create auth record
      const { error: authError } = await this.supabase
        .from('guest_auth')
        .insert({
          guest_id: guest.id,
          email: googleProfile.email,
          google_id: googleProfile.id,
          email_verified: true,
          email_verified_at: new Date().toISOString(),
        })
        .select()
        .single();

      if (authError) {
        // Rollback guest creation
        await this.supabase.from('guests').delete().eq('id', guest.id);
        return { guest: null!, error: 'Failed to create authentication' };
      }

      return {
        guest: {
          guestId: guest.id,
          email: googleProfile.email,
          name: googleProfile.name,
          verified: true,
        },
      };
    } catch (error) {
      console.error('Google auth error:', error);
      return { guest: null!, error: 'Google authentication failed' };
    }
  }

  /**
   * Send password reset email
   */
  async sendPasswordReset(email: string): Promise<{ success: boolean; error?: string }> {
    try {
      const { data: auth } = await this.supabase
        .from('guest_auth')
        .select('id, guest_id')
        .eq('email', email)
        .single();

      if (!auth) {
        return { success: false, error: 'Email not found' };
      }

      // Generate reset token
      const resetToken = this.generateResetToken();
      const expiresAt = new Date();
      expiresAt.setHours(expiresAt.getHours() + 1); // 1 hour expiry

      await this.supabase
        .from('guest_auth')
        .update({
          reset_token: resetToken,
          reset_token_expires: expiresAt.toISOString(),
        })
        .eq('id', auth.id);

      // TODO: Send actual email
      console.log(`Password reset token for ${email}: ${resetToken}`);

      return { success: true };
    } catch (error) {
      console.error('Password reset error:', error);
      return { success: false, error: 'Failed to send reset email' };
    }
  }

  /**
   * Reset password with token
   */
  async resetPassword(
    token: string,
    newPassword: string
  ): Promise<{ success: boolean; error?: string }> {
    try {
      // Find valid token
      const { data: auth } = await this.supabase
        .from('guest_auth')
        .select('id')
        .eq('reset_token', token)
        .gt('reset_token_expires', new Date().toISOString())
        .single();

      if (!auth) {
        return { success: false, error: 'Invalid or expired token' };
      }

      // Hash new password
      const passwordHash = await bcrypt.hash(newPassword, 10);

      // Update password and clear token
      await this.supabase
        .from('guest_auth')
        .update({
          password_hash: passwordHash,
          reset_token: null,
          reset_token_expires: null,
        })
        .eq('id', auth.id);

      return { success: true };
    } catch (error) {
      console.error('Password reset error:', error);
      return { success: false, error: 'Failed to reset password' };
    }
  }

  /**
   * Verify email with token
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async verifyEmail(guestId: string, token: string): Promise<{ success: boolean }> {
    // TODO: Implement email verification with token validation
    try {
      await this.supabase
        .from('guest_auth')
        .update({
          email_verified: true,
          email_verified_at: new Date().toISOString(),
        })
        .eq('guest_id', guestId);

      return { success: true };
    } catch (error) {
      console.error('Email verification error:', error);
      return { success: false };
    }
  }

  /**
   * Get guest session by ID
   */
  async getGuestSession(guestId: string): Promise<GuestSession | null> {
    try {
      const { data: guest } = await this.supabase
        .from('guests')
        .select('*, auth:guest_auth(*)')
        .eq('id', guestId)
        .single();

      if (!guest) {
        return null;
      }

      return {
        guestId: guest.id,
        email: guest.email,
        name: `${guest.first_name} ${guest.last_name}`,
        verified: guest.auth?.email_verified || false,
      };
    } catch (error) {
      console.error('Get guest session error:', error);
      return null;
    }
  }

  /**
   * Check if guest is banned
   */
  async isGuestBanned(
    guestId?: string,
    email?: string,
    phone?: string,
    instagram?: string
  ): Promise<boolean> {
    try {
      const { data: ban } = await this.supabase.rpc('is_guest_banned', {
        p_guest_id: guestId,
        p_email: email,
        p_phone: phone,
        p_instagram: instagram,
      });

      return ban || false;
    } catch (error) {
      console.error('Ban check error:', error);
      return false;
    }
  }

  private generateResetToken(): string {
    return (
      Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
    );
  }

  private async sendVerificationEmail(email: string, guestId: string): Promise<void> {
    // TODO: Implement actual email sending
    const verificationToken = this.generateResetToken();
    console.log(`Verification link for ${email}: /verify?id=${guestId}&token=${verificationToken}`);
  }
}

```


## File: `src/lib/auth/role-utils.ts`

```typescript
import { UserRole } from '@/types/enums';

/**
 * Check if a user has a specific role
 * @param user The user object from the session
 * @param role The role to check
 * @returns boolean indicating if the user has the specified role
 */
export function hasRole(user: { role?: UserRole } | null | undefined, role: UserRole): boolean {
  if (!user || !user.role) {
    return false;
  }
  return user.role === role;
}

/**
 * Check if a user has any of the specified roles
 * @param user The user object from the session
 * @param roles Array of roles to check
 * @returns boolean indicating if the user has any of the specified roles
 */
export function hasAnyRole(
  user: { role?: UserRole } | null | undefined,
  roles: UserRole[]
): boolean {
  if (!user || !user.role || roles.length === 0) {
    return false;
  }
  return roles.includes(user.role);
}

/**
 * Check if a user has all of the specified roles
 * @param user The user object from the session
 * @param roles Array of roles to check
 * @returns boolean indicating if the user has all of the specified roles
 */
export function hasAllRoles(
  user: { role?: UserRole } | null | undefined,
  roles: UserRole[]
): boolean {
  if (!user || !user.role || roles.length === 0) {
    return false;
  }
  // This is a bit redundant since a user can only have one role in our current model,
  // but it's here for future extensibility if we move to a multi-role system
  return roles.every(role => user.role === role);
}

```

# Type Definitions


## File: `src/types/database.ts`

```typescript
import { UserRole } from './enums';

export interface Profile {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  role: UserRole;
  given_name?: string;
  stage_name?: string;
  instagram_handle?: string;
  phone?: string;
  manager_permissions?: Record<string, unknown>;
  vip_qr_code?: string;
  vip_max_plus_ones?: number;
  account_status: 'active' | 'suspended' | 'inactive';
  invited_by_user_id?: string;
  default_capacity?: number;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface Guest {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  instagram_handle?: string;
  guest_tier: 'regular' | 'micro_promoter' | 'vip' | 'blocked';
  total_events_attended: number;
  conversion_rate: number;
  last_attended_date?: string;
  vip_status_granted_by?: string;
  vip_status_granted_at?: string;
  monthly_invite_allowance: number;
  profile_photo_url?: string;
  date_of_birth?: string;
  marketing_consent: boolean;
  last_login?: string;
  created_at: string;
  updated_at: string;
}

export interface GuestAuth {
  id: string;
  guest_id: string;
  email: string;
  password_hash?: string;
  google_id?: string;
  email_verified: boolean;
  email_verified_at?: string;
  last_login?: string;
  reset_token?: string;
  reset_token_expires?: string;
  created_at: string;
  updated_at: string;
}

export interface Ban {
  id: string;
  guest_id?: string;
  banned_email?: string;
  banned_phone?: string;
  banned_instagram?: string;
  banned_name?: string;
  reason: string;
  duration_type: 'days' | 'months' | 'years' | 'permanent';
  duration_value?: number;
  expires_at?: string;
  banned_by_user_id: string;
  ban_lifted_by_user_id?: string;
  ban_lifted_at?: string;
  ban_lifted_reason?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface CapacityRequest {
  id: string;
  requester_id: string;
  event_id: string;
  guest_list_id?: string;
  current_limit: number;
  requested_limit: number;
  reason?: string;
  status: 'pending' | 'approved' | 'denied';
  approved_by_user_id?: string;
  approved_at?: string;
  denial_reason?: string;
  created_at: string;
  updated_at: string;
}

export interface VenueSettings {
  id: string;
  venue_id: string;
  default_event_capacity: number;
  default_staff_capacity: number;
  default_promoter_capacity: number;
  default_dj_capacity: number;
  default_max_plus_ones: number;
  operating_schedule: OperatingDay[];
  approval_warning_time: string; // HH:MM:SS format
  approval_warning_threshold: number; // percentage
  timezone: string;
  created_at: string;
  updated_at: string;
}

export interface OperatingDay {
  day: 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';
  is_open: boolean;
  open_time?: string; // HH:MM format
  close_time?: string; // HH:MM format
}

export interface Event {
  id: string;
  name: string;
  date: string;
  day_of_week: string;
  venue_id: string;
  status: 'active' | 'cancelled' | 'completed' | 'under_promoted';
  max_total_capacity: number;
  created_by_user_id: string;
  lightspeed_event_id?: string;
  predicted_attendance?: number;
  actual_attendance?: number;
  total_bar_sales?: number;
  total_door_sales?: number;
  paid_covers_count?: number;
  promotional_photos: string[];
  event_flyers: string[];
  created_at: string;
  updated_at: string;
}

export interface EventDjAssignment {
  id: string;
  event_id: string;
  dj_user_id: string;
  invitation_sent_at?: string;
  invitation_status: 'pending' | 'accepted' | 'declined';
  is_returning_dj: boolean;
  display_order?: number;
  individual_capacity?: number;
  created_at: string;
  updated_at: string;
}

export interface GuestList {
  id: string;
  event_id: string;
  created_by_user_id: string;
  list_type: 'dj_list' | 'staff_list' | 'vip_list' | 'promoter_list';
  name: string;
  max_capacity: number;
  max_plus_size: number;
  current_capacity: number;
  list_deadline?: string;
  approval_deadline?: string;
  status: 'active' | 'cancelled' | 'completed';
  conversion_rate: number;
  created_at: string;
  updated_at: string;
}

export interface GuestListEntry {
  id: string;
  guest_list_id: string;
  guest_id: string;
  status: 'pending' | 'approved' | 'denied';
  plus_ones_requested: number;
  plus_ones_checked_in: number;
  qr_code?: string;
  qr_code_used: boolean;
  checked_in_at?: string;
  checked_in_by_user_id?: string;
  approved_by_user_id?: string;
  approved_at?: string;
  created_at: string;
  updated_at: string;
}

// Utility types for forms and API responses
export interface CreateBanRequest {
  guest_id?: string;
  banned_email?: string;
  banned_phone?: string;
  banned_instagram?: string;
  banned_name?: string;
  reason: string;
  duration_type: 'days' | 'months' | 'years' | 'permanent';
  duration_value?: number;
}

export interface CreateCapacityRequest {
  event_id: string;
  guest_list_id?: string;
  requested_limit: number;
  reason?: string;
}

export interface CreateEventRequest {
  name: string;
  date: string;
  max_total_capacity?: number;
  djs: Array<{
    user_id?: string; // Existing DJ
    dj_name?: string; // New DJ name
    given_name?: string; // New DJ real name
    email?: string; // New DJ email
    invite_link?: string; // Generated invite link for new DJ
    individual_capacity?: number;
  }>;
  capacity_distribution: 'shared' | 'individual';
}

export interface GuestSignupRequest {
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  instagram_handle?: string;
  plus_ones_requested: number;
  guest_list_id: string;
  privacy_consent: boolean;
  marketing_consent?: boolean;
}

export interface InviteUserRequest {
  email?: string;
  phone?: string;
  role: UserRole;
  first_name?: string;
  last_name?: string;
  stage_name?: string; // For DJs
  default_capacity?: number;
  event_id?: string; // For DJ invitations
}

```


## File: `src/types/user.ts`

```typescript
// src/types/user.ts
import { UserRole } from './enums';

export interface UserProfile {
  id: string; // Corresponds to Supabase auth.users.id
  email?: string; // Corresponds to Supabase auth.users.email
  role: UserRole;
  firstName?: string;
  lastName?: string;
  // Add other profile-specific fields here as needed
}

// Re-export UserRole for backward compatibility
export { UserRole };

```


## File: `src/types/enums.ts`

```typescript
// Enum definitions that match the database schema
// These are defined here to avoid relying on the Prisma client before it's installed

export enum UserRole {
  OWNER = 'OWNER',
  MANAGER = 'MANAGER',
  ASSISTANT_MANAGER = 'ASSISTANT_MANAGER',
  DOORPERSON = 'DOORPERSON',
  STAFF = 'STAFF',
  PROMOTER = 'PROMOTER',
  DJ = 'DJ',
  VIP = 'VIP',
  GUEST = 'GUEST',
}

export enum EntryStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  DENIED = 'DENIED',
  CHECKED_IN = 'CHECKED_IN',
  NO_SHOW = 'NO_SHOW',
}

```


## File: `src/types/next-auth.d.ts`

```typescript
import { DefaultSession, DefaultUser } from 'next-auth';
import { UserRole } from '@/types/enums';

// Extend the built-in session types
declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      role: UserRole;
    } & DefaultSession['user'];
  }

  // Extend the built-in user types
  interface User extends DefaultUser {
    id: string;
    role: UserRole;
    emailVerified?: Date | null;
  }
}

```

# Middleware


## File: `src/middleware.ts`

```typescript
// src/middleware.ts
import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { UserRole } from './types/enums';

// Define public paths that should always be accessible
const publicPaths = [
  '/',
  '/auth/login',
  '/auth/register',
  '/auth/forgot-password',
  '/auth/confirm',
  '/auth/error',
  '/auth/update-password',
  '/doorperson/login',
  '/doorperson/scanner',
  '/doorperson/search',
  '/doorperson/checkin',
];

// Temporarily disable middleware to debug database connection issues
const DISABLE_MIDDLEWARE = true;

// Define protected routes and the roles required to access them
// Expand this configuration based on your application's needs.
const protectedRoutesConfig: Record<string, UserRole[]> = {
  // Example: Only managers can access /admin and its sub-paths
  '/admin': [UserRole.MANAGER],
  // Dashboard is accessible to all authenticated users
  // '/dashboard': [UserRole.MANAGER], // Commented out to allow all roles
  // Add other role-specific routes here, e.g.:
  // '/dj-tools': [UserRole.DJ, UserRole.MANAGER], // DJs and Managers can access
};

export async function middleware(request: NextRequest) {
  // Temporarily disable middleware to test login issue
  if (DISABLE_MIDDLEWARE) {
    console.log('Middleware disabled, allowing all access to:', request.nextUrl.pathname);
    return NextResponse.next();
  }

  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({ name, value, ...options });
          response = NextResponse.next({ request: { headers: request.headers } });
          response.cookies.set({ name, value, ...options });
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({ name, value: '', ...options });
          response = NextResponse.next({ request: { headers: request.headers } });
          response.cookies.set({ name, value: '', ...options });
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { pathname } = request.nextUrl;

  // Allow access to public paths without further checks if they are explicitly listed
  if (publicPaths.includes(pathname)) {
    // If user is logged in and trying to access root, redirect to dashboard
    if (pathname === '/' && user) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
    return response; // Allow access to public paths
  }

  // If no user and trying to access a non-public path, redirect to login
  if (!user) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = '/auth/login';
    redirectUrl.searchParams.set(`redirectedFrom`, pathname);
    return NextResponse.redirect(redirectUrl);
  }

  // User is authenticated. If they are on the root path, redirect to dashboard.
  if (pathname === '/') {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // Only check profiles for routes that actually need role-based protection
  let userRole = UserRole.GUEST;

  // Check if this path actually needs role-based protection
  const needsRoleCheck = Object.keys(protectedRoutesConfig).some(routePrefix =>
    pathname.startsWith(routePrefix)
  );

  if (needsRoleCheck) {
    // Only do the database lookup if we actually need to check roles
    try {
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();

      console.log('Profile lookup result:', {
        userId: user.id,
        profile,
        error: profileError?.message,
        hasProfile: !!profile,
      });

      if (profile && !profileError) {
        userRole = profile.role as UserRole;
        console.log('User role set to:', userRole);
      } else {
        console.warn('Profile lookup failed:', profileError?.message);
        userRole = UserRole.GUEST;
      }
    } catch (dbError) {
      console.error('Database connection error:', dbError);
      userRole = UserRole.GUEST;
    }
  }

  // Check if the current path matches any configured protected route prefix
  for (const routePrefix in protectedRoutesConfig) {
    if (pathname.startsWith(routePrefix)) {
      const requiredRoles = protectedRoutesConfig[routePrefix];
      if (!requiredRoles.includes(userRole)) {
        // User does not have the required role for this specific route
        // Redirect to a general dashboard or an unauthorized page
        // Adding a query param can help the target page display a message
        return NextResponse.redirect(new URL('/dashboard?error=unauthorized_access', request.url));
      }
      // User has the required role for this specific route, allow access
      return response;
    }
  }

  // If the path is not public, not specifically role-restricted (or user has access),
  // and the user is logged in, allow access. This covers general authenticated areas like /dashboard.
  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - api/ (API routes)
     * - auth/ (authentication routes, handled by publicPaths or user status)
     *   (Note: /auth/ routes are implicitly handled by the publicPaths logic and user status checks.
     *    If a user is logged in and tries /auth/login, they should be redirected to dashboard.
     *    If not logged in, /auth/login should be accessible. This logic is above.)
     */
    '/((?!_next/static|_next/image|favicon.ico|api/).*)',
  ],
};

```

# Configuration Files


## File: `package.json`

```json
{
  "name": "guestlist-app",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev -H 0.0.0.0",
    "build": "next build",
    "start": "next start",
    "lint": "eslint ./src --ext .js,.jsx,.ts,.tsx",
    "lint:fix": "eslint ./src --ext .js,.jsx,.ts,.tsx --fix",
    "format": "prettier --write .",
    "format:check": "prettier --check .",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage"
  },
  "dependencies": {
    "@prisma/client": "^6.9.0",
    "@supabase/ssr": "^0.6.1",
    "@supabase/supabase-js": "^2.50.0",
    "@types/bcryptjs": "^2.4.6",
    "aws-sdk-mock": "^6.2.1",
    "bcrypt-ts": "^7.1.0",
    "bcryptjs": "^3.0.2",
    "mock-aws-s3": "^4.0.2",
    "next": "15.3.3",
    "next-auth": "^5.0.0-beta.28",
    "nock": "^13.3.0",
    "qr-scanner": "^1.4.2",
    "react": "^19.0.0",
    "react-dom": "^19.0.0"
  },
  "devDependencies": {
    "@eslint/eslintrc": "^3",
    "@netlify/plugin-nextjs": "^5.11.2",
    "@tailwindcss/postcss": "^4",
    "@testing-library/jest-dom": "^6.6.3",
    "@testing-library/react": "^16.3.0",
    "@testing-library/user-event": "^14.6.1",
    "@types/jest": "^29.5.14",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "@typescript-eslint/eslint-plugin": "^8.33.1",
    "@typescript-eslint/parser": "^8.33.1",
    "eslint": "^9.28.0",
    "eslint-config-next": "^15.3.3",
    "eslint-config-prettier": "^10.1.5",
    "eslint-plugin-import": "^2.31.0",
    "eslint-plugin-jsx-a11y": "^6.10.2",
    "eslint-plugin-prettier": "^5.4.1",
    "eslint-plugin-react": "^7.37.5",
    "eslint-plugin-react-hooks": "^5.2.0",
    "identity-obj-proxy": "^3.0.0",
    "jest": "^29.7.0",
    "jest-environment-jsdom": "^30.0.0-beta.3",
    "prettier": "^3.5.3",
    "prisma": "^6.9.0",
    "tailwindcss": "^4",
    "ts-jest": "^29.3.4",
    "typescript": "^5"
  }
}

```


## File: `tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}

```

# Documentation


## File: `deploy-schema.md`

```markdown
# Deploy Comprehensive Database Schema

## Instructions

1. **Go to Supabase Dashboard**: https://supabase.com/dashboard/project/ohkrtsyqbfphsqessdzj
2. **Navigate to SQL Editor**
3. **Copy the entire content** from the migration file:
   ```
   supabase/migrations/20250616005319_comprehensive_guestlist_schema.sql
   ```
4. **Paste and Run** in the SQL Editor

## What This Creates

✅ **9 Tables:**

- venues (Datcha Nightclub default)
- club_schedule (Thu/Fri/Sat default)
- events (enhanced with analytics fields)
- guests (with tier system)
- event_dj_assignments (many-to-many)
- guest_lists (with capacity management)
- guest_list_entries (main join table with QR codes)
- plus_ones (optional contact collection)
- guest_blocklist (security)

✅ **5 Enums:**

- day_of_week, event_status, guest_tier, list_type, guest_entry_status

✅ **Auto-Features:**

- Automatic timestamp updates
- Capacity calculations
- Performance indexes
- RLS policies (without infinite recursion!)

## After Deployment

Run this test to verify everything works:

```bash
cd "/Users/patrickgregoire/CascadeProjects/guestlist JUN 8/guestlist-app"
node test-dashboard-fix.js
```

If you see "SUCCESS" instead of infinite recursion errors, we're ready to build! 🚀

```


## File: `README.md`

```markdown
# Guestlist App

A streamlined mobile and web app built to handle nightclub guest list operations, featuring lightning-fast QR code check-in for doormen, seamless digital signup for guests, live analytics for managers, and efficient list distribution for promoters and DJs.

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Technology Stack

- **Frontend**: Next.js with TypeScript and Tailwind CSS
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js
- **Testing**: Jest and React Testing Library
- **Code Quality**: ESLint and Prettier
- **CI/CD**: GitHub Actions

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Database Setup

### Prerequisites

- PostgreSQL installed locally or a PostgreSQL database hosted in Canada (for Quebec privacy compliance)

### Setup Steps

1. Create a `.env` file in the root directory with the following content:

```
DATABASE_URL="postgresql://username:password@localhost:5432/guestlist?schema=public"
```

Replace `username`, `password`, and other values as needed for your PostgreSQL setup.

2. Install Prisma CLI (when Node.js version is updated to 18.18+):

```bash
npm install prisma --save-dev
```

3. Generate Prisma Client:

```bash
npx prisma generate
```

4. Run database migrations:

```bash
npx prisma migrate dev --name init
```

### Database Schema

The Prisma schema in `prisma/schema.prisma` defines the following models:

- `User`: For managers, doormen, promoters, and DJs
- `Event`: Nightclub events
- `Guest`: Guest information
- `GuestList`: Lists created by promoters/DJs
- `GuestListEntry`: Individual entries on guest lists with QR codes

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

### Edge Runtime Compatibility

This application uses Next.js middleware with Edge-safe code to ensure compatibility with Vercel's Edge Runtime. Authentication logic that requires Node.js features (like password hashing) is isolated to API routes running on Node.js runtime.

### Deployment Options

This application can be deployed to either Vercel or Netlify. Both deployment configurations are included in the repository.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Quebec Privacy Compliance

To ensure compliance with Quebec privacy laws:

1. All data is stored in Canada
2. Only essential guest information is collected
3. Consent is explicitly obtained from guests
4. Right-to-be-forgotten functionality is implemented

## CI/CD Pipeline

This project uses GitHub Actions for continuous integration and deployment.

### Continuous Integration

On every push and pull request to the main branch, the CI pipeline:

1. Runs ESLint to check code quality
2. Verifies code formatting with Prettier
3. Runs database migrations on a test database
4. Executes all tests with Jest

### Continuous Deployment

When changes are pushed to the main branch and all tests pass:

1. The application is automatically built
2. The build is deployed to the production environment

### Setup Instructions

To set up the CI/CD pipeline:

1. Create the necessary GitHub repository secrets (see `.github/workflows/README.md`)
2. Choose your preferred deployment platform (Vercel or Netlify)
3. Uncomment the relevant deployment section in the workflow file

For detailed instructions, see the [CI/CD documentation](./.github/workflows/README.md).

```


## File: `Frontend-Design-Specs.md`

```markdown
# Guest List App - Frontend Design Specifications

## Overview

This document contains the complete frontend design specifications for the Datcha nightclub guest list management app. All user flows, screens, and interactions have been methodically planned for implementation in Magic Patterns or similar design tools.

## User Types Overview

1. **Guest** - Public users signing up for events (Mobile-first)
2. **Doorperson** - Door staff checking in guests (PWA/iOS app)
3. **Staff** - Bartenders/employees with limited lists (Mobile-first)
4. **DJ** - Performers with event-specific lists (Mobile-first)
5. **Promoter** - Marketing staff with larger capacity (Mobile-first)
6. **Manager** - Venue management with full control (Desktop + Mobile)
7. **VIP** - Special guests with permanent access

---

## 1. GUEST FLOW

### Entry Points

- Social media link (Instagram, etc.)
- Text/DM invitation link
- Google Auth for expedited sign-in

### User Flows

#### Flow A: New Guest

1. Click invitation link → Landing/Auth screen
2. Select "Create a profile"
3. Input data screen (name, email, phone, Instagram handle)
4. Click "Confirm" → Email sent
5. Check email → Click confirmation link
6. Event selection/confirmation screen (with +N selection)
7. Submit → Waiting for approval screen
8. Receive approval text → Click link
9. View QR code ticket screen

#### Flow B: Returning Guest

1. Click invitation link → Landing/Auth screen
2. Sign in (Google Auth or email/phone)
3. Pre-filled data review screen
4. Event selection/confirmation screen (with +N selection)
5. Submit → Waiting for approval screen
6. Receive approval text → Click link
7. View QR code ticket screen

### Screen Inventory

#### Screen 1: Landing/Auth Screen

- Logo/Event branding
- "Continue with Google" button (prominent)
- "Sign in with Email" button
- "Create New Profile" button
- "Forgot Password?" link

#### Screen 2A: Email Sign In

- Email field
- Password field
- "Sign In" button
- "Forgot Password?" link
- "Back" button

#### Screen 2B: Forgot Password

- Email field
- "Send Reset Link" button
- Success/error messages

#### Screen 3: Create Profile

- Name field (required)
- Email field (required)
- Phone field (required)
- Instagram handle field (optional)
- Privacy policy checkbox (required)
- "Confirm" button

#### Screen 4: Email Confirmation Sent

- "Check your email" message
- Resend link option
- What to expect instructions

#### Screen 5: Event Selection

- List of upcoming events (up to 1 month)
  - Event name
  - Date/time
  - DJ/performer info
- Guest count selector (0 to +4, default max)
- "Submit to Guest List" button

#### Screen 6: Submission Confirmation

- "You've been submitted to the guest list"
- "You'll receive a text when approved"
- Event details summary

#### Screen 7: QR Code Ticket

- Event name and date
- Guest name + "and X guests"
- Large QR code
- "Modify Guest Count" button
- Status indicator (Active/Checked In)

#### Screen 8: Modify Guest Count

- Current count display
- New count selector
- "Update" button
- Error state: "Guest list full"

#### Screen 9: Denial Notification

- Polite message: "Unfortunately, the guest list for [event] is at capacity. We hope to see you at a future event!"
- "View Other Events" button

### Design Notes

- Mobile-first responsive design
- Email confirmation skipped for Google Auth users
- QR codes accessible via link in confirmation text
- Post-check-in shows "Checked In" status
- Instagram handle optional
- Email + password for returning non-Google users

---

## 2. DOORPERSON FLOW

### Entry Points

- Direct URL or bookmark on club device (tablet/phone)
- PIN auth for quick shift changes
- Progressive Web App (Phase 1), Native iOS (Phase 2)

### User Flows

#### Flow A: QR Code Scanning (Primary)

1. Login with PIN
2. Land on scan screen (camera active)
3. Guest shows QR → Automatic scan
4. See result screen (2-3 seconds) → Auto-return to scan

#### Flow B: Manual Search (Backup)

1. From scan screen → Tap "Search Guests"
2. Search/browse list
3. Tap guest name → See details (including +N and who invited)
4. Tap "Check In" → Confirmation → Back to list

### Screen Inventory

#### Screen 1: Login

- Venue logo
- PIN pad (large buttons)
- "OPEN LIST SCANNER" button

#### Screen 2: QR Scan (Main Screen)

- Camera view in rounded rectangle (85% of screen)
- Scan indicator overlay
- "Search Guests" button (bottom, always visible)
- "Checked in: 47/120" (top corner)

#### Screen 3A: Scan Success

- LARGE green checkmark
- Guest name (big text)
- "+3 guests" indicator
- "Added by: DJ Marcus"
- "Return to Scanner" button
- Auto-dismiss in 3 seconds

#### Screen 3B: Scan Denied

- LARGE red X
- Reason: "Not on list" / "Already checked in" / "Denied entry"
- "Back to Scan" button

#### Screen 4: Manual Search

- Search bar (top)
- Guest list (simple):
  - Name
  - Check mark if checked in
  - +N count

#### Screen 5: Guest Details

- Guest name (large)
- Status (Approved/Denied)
- Plus ones count
- Added by
- "Check In" button (huge, green)
- +/- buttons to modify guest count
- "Back" button

#### Screen 6: Manual QR Entry

- Text field for QR code
- Number pad
- "Submit" button

#### Screen 7: VIP Plus Count (Special Flow)

- "How many guests with [VIP Name]?"
- Number selector (0 to max set by manager)
- "Confirm" button

### Design Considerations

- **Night Mode Optimized**:
  - Dark theme with high contrast
  - Minimal white to avoid eye strain
  - Success = Bright green
  - Denied = Bright red
  - Text = High contrast white/yellow
- **Touch Targets**: Minimum 44x44pt
- **Speed**: Camera always ready, instant recognition
- Single shared door account
- Re-auth only on app open
- No override permissions
- Can modify +N counts
- Handles multiple simultaneous doormen

---

## 3. STAFF FLOW

### Entry Points

- Direct URL for staff
- Email invitation from manager
- Mobile-first interface

### User Flows

#### Flow A: Regular Night Guest List

1. Login → Dashboard
2. See tonight's event
3. Share invite link (expires after event)
4. Monitor signups (auto-approved)
5. If at capacity → Request more spots

### Screen Inventory

#### Screen 1: Staff Dashboard

- Welcome "Hey [Name]!"
- **Tonight's Event**:
  - Event name with DJ lineup
  - "Guest List: 3/5 spots used"
  - "Share Invite" button (large)
- **Your Stats**:
  - Friends who visited this month
  - Most recent attendees

#### Screen 2: Share Invite

- Tonight's event details
- Two prominent buttons:
  - "Copy Link" (copies to clipboard)
  - "Share" (triggers native share sheet)
- Invite expires: "Valid until [tonight 11:59 PM]"

#### Screen 3: My Guest List

- Date/Event header
- Capacity bar: "3/5 spots used"
- **If full**: "Request More Spots" button
- Simple list:
  - Guest names who signed up
  - +N count
  - Check-in status

#### Screen 4: Request Additional Capacity

- "Need more than 5 spots?"
- Number picker: 6-10
- Optional reason field
- "Send Request" button

### Key Features

- Default capacity: 5 guests
- No approval needed (link = approved)
- Event-specific expiring links
- Native share functionality
- Can request capacity increases
- Sees DJ lineups for events

---

## 4. DJ FLOW

### Entry Points

- Direct URL (TBD)
- Email invitation from manager with event details
- Mobile-first but desktop capable

### User Flows

#### Flow A: First Time Setup

1. Click invitation link (shows event date & all DJs)
2. Create account (name, email, phone, Instagram - required)
3. Verify email
4. Land on dashboard

#### Flow B: Event-Based List Generation

1. Login → Dashboard
2. See "My Upcoming Events"
3. Select specific event
4. Options:
   - "Generate/Share Link" → Get shareable link
   - "Invite Past Guests" → Batch invite screen
   - "Manage Current Guests" → Approval screen
5. Monitor signups with live updates

#### Flow C: Review & Approve Guests

1. Select event from dashboard
2. View pending guests
3. Review each guest
4. Approve/Deny individually or "Approve All"
5. Can modify +N counts

### Screen Inventory

#### Screen 1: DJ Dashboard

- Welcome "Hey [DJ Name]!"
- **Upcoming Events** section:
  - Event cards showing:
    - Event name & date
    - Other DJs playing that night
    - "23/50 spots filled"
    - "Share Link" button
    - "Manage Guests" button
    - "Invite Past Guests" button
- **Past Events** section (below):
  - Similar cards with attendance stats
  - "View Guest List" button
- Quick stats:
  - Last event conversion rate
  - Total guests brought lifetime

#### Screen 2: Event Guest Management

- Event header (name, date, capacity)
- Capacity bar: "23/50 spots filled"
- Tabs: "Pending (5)" | "Approved (18)" | "Attended"
- **"Approve All Pending" button** (prominent)
- Guest list with:
  - Name
  - +N count (editable with +/- buttons)
  - Quick approve/deny buttons

#### Screen 3: Share Event Link

- Event name & date at top
- Large link with copy button
- Share options: SMS, WhatsApp, IG Story
- QR code for posting
- "Active signups: 23"

#### Screen 4: Past Guests / Batch Invite

- Event selector dropdown
- Filter buttons: "All" | "Attended" | "Did Not Attend"
- Guest list with:
  - Checkbox
  - Guest name
  - Attendance status icon
  - Last event date
- Action buttons:
  - "Select All"
  - "Select All Attended"
  - "Clear Selection"
- Bottom bar: "Invite Selected (12)" button

#### Screen 5: Batch Invite Composer

- Editable text field with default:
  "[DJ Name] is playing at Datcha on [Date] and invited you to the event. Click here to join the guest list: [link]"
- Send via options:
  - ☑️ SMS
  - ☑️ Email
    (Both can be selected)
- Character count for SMS
- "Preview" button
- "Send Invites" button

#### Screen 6: DJ Analytics

- Event-by-event breakdown:
  - Signups vs attendance
  - Total impact metrics
- Best performing events
- Shows no-shows for future invitation decisions

### Key Features

- Default capacity: 75 guests per event
- Event-specific links (expire after event)
- Can access links 2 months in advance
- Can approve during event
- SMS notifications for pending guests
- Batch invite system for building following
- "Approve All" for efficiency

---

## 5. PROMOTER FLOW

### Entry Points

- Direct URL for promoters
- Email invitation from manager
- Mobile-first interface

### User Flows

#### Flow A: Event-Based Promotion

1. Login → Dashboard
2. Select upcoming event
3. Get event-specific link
4. Share link
5. Review/approve signups
6. Monitor attendance

### Screen Inventory

#### Screen 1: Promoter Dashboard

- Welcome "Hey [Promoter Name]!"
- **Tonight's Event** (if applicable):
  - Event name with DJ lineup
  - "Guest List: 8/20 spots used"
  - "Share Invite" button
  - "Review Guests" button
- **Upcoming Events**:
  - Next 3-4 events
  - Guest count for each
- **Quick Stats**:
  - This month: 67 attended
  - All-time guests: 487

#### Screen 2: Event Selection & Sharing

- Event details (date, DJs)
- "Guest List: 8/20 spots"
- Two buttons:
  - "Copy Event Link"
  - "Share" (native)
- Link expires after event

#### Screen 3: Guest Review/Approval

- Event header
- Capacity bar: "8/20 spots used"
- Tabs: "Pending (3)" | "Approved (5)" | "Attended"
- **"Approve All" button**
- Guest list with:
  - Name
  - +N count
  - Approve/deny buttons

#### Screen 4: Capacity Request

- Current limit: 20
- Request more spots
- Reason field
- Send to manager

#### Screen 5: Guest History & Batch Invite

- "My All-Time Guests"
- Filters: Attended/No-show
- Select guests
- Choose event
- Send batch invites

### Key Differences from Staff

- Higher capacity (20 vs 5)
- Guest history tools
- Batch invite features
- Otherwise similar event-based flow

---

## 6. VIP FLOW

### VIP Creation (Manager Side)

1. Manager adds VIP in dashboard
2. System generates permanent QR code
3. VIP receives welcome text with retrieval options

### VIP Guest Experience

- Permanent QR code (never expires)
- Bypasses DJ/promoter approval
- Not counted against DJ capacity
- Doorperson must enter +N count on scan

### QR Code Retrieval Methods (Phase 1)

1. **SMS Link** - Save from welcome text
2. **Email** - Star/flag welcome email
3. **Simple Portal** - vip.datcha.com with phone + PIN
4. **Screenshot** - Save QR to phone photos

### Phase 2

- Apple Wallet integration
- Google Wallet support

### VIP Status Removal

- Text notification: "Your VIP status at Datcha has been updated. Thank you for your past visits!"
- QR code deactivated immediately

---

## 7. MANAGER FLOW

### Entry Points

- Single URL for all users (e.g., datcha.guestlistapp.com)
- Desktop-first with mobile support
- Individual accounts with role-based permissions
- Standard login (no daily 2FA)

### Permission Levels

#### Owner (Full Access)

- ✓ All features below
- ✓ Venue settings (exclusive access)
- ✓ Create/manage all account types
- ✓ Full analytics access
- ✓ All administrative functions

#### Manager

- ✓ Create/edit events
- ✓ Invite DJs/staff/promoters
- ✓ Set capacity limits
- ✓ Manage ban list
- ✓ View full analytics
- ✓ Create assistant manager accounts
- ✓ Export capabilities
- ✗ Venue settings

#### Assistant Manager

- ✓ View events (create if enabled per account)
- ✓ View/approve/deny guest lists
- ✓ Handle capacity requests
- ✓ View basic analytics
- ✓ Limited guest database access
- ✗ Ban administration
- ✗ User account creation
- ✗ Venue settings

### User Flows

#### Flow A: Event Creation (Primary)

1. Login → Dashboard
2. Click "Create Event"
3. Select date and add DJs
4. Set capacity (shared or individual)
5. Send invitations
6. Monitor acceptance

#### Flow B: Daily Oversight

1. View dashboard alerts
2. Check approval ratios
3. Click event to view full guest list
4. Handle capacity requests
5. Monitor DJ responsiveness

#### Flow C: User Management

1. Navigate to Users section
2. Select user type tab
3. Invite new or review existing
4. Set permissions/capacities
5. View performance metrics

#### Flow D: Guest Database Management

1. Access all-time guest database
2. Search and filter guests
3. View attendance history
4. Add notes or photos
5. Ban if necessary

### Screen Inventory

#### Screen 1: Manager Dashboard

- **Alert Section** (top):
  - "DJ Marcus hasn't accepted invite for Saturday"
  - "Tonight's list only 65% approved" (3pm warning)
  - "2 capacity increase requests pending"
  - Missing event warnings
- **Week at a Glance**:

  - Event cards for next 7 days:
    - Date & formatted DJ names (comma + ampersand)
    - Approval ratio pie chart
    - "52/75 approved"
    - Click to view full guest list

- **Quick Actions**:
  - "Create Event" button
  - "Invite User" button

#### Screen 2: Event Creation

- Date picker (allows any date, highlights non-operating days)
- **DJ Selection**:
  - Dropdown: "Select existing DJ" with search
  - Shows list of recurring DJs
  - "Add New DJ" button → opens modal:
    - DJ/Stage name (required)
    - Given name (optional)
    - Email OR "Copy Invite Link"
    - Phone (optional)
  - Selected DJs list:
    - Drag handles for reordering
    - Remove button (X)
    - Individual capacity field (if applicable)
- **Capacity Settings**:
  - Total event capacity (default 75)
  - Distribution options:
    - "Share capacity equally"
    - "Set individual limits"
- "Create Event" button

#### Screen 3: Event Detail View

- Event header (date, total capacity, status)
- **Approval Overview**:
  - Large donut chart
  - Percentage approved
  - Alert if <65% after 3pm
- **Guest Lists by Source** (tabs):
  - DJ 1 (23/30)
  - DJ 2 (18/25)
  - Staff (8/15)
  - Promoters (5/10)
  - Direct adds (3)
- **Within each tab**:
  - Search bar
  - Guest list with:
    - Name
    - +N count
    - Status
    - Check-in status
  - "Approve All Pending" button
- **Actions**:
  - "Export Full List"
  - "Add Guest Directly"

#### Screen 4: All-Time Guest Database

- **Search Bar**: Name/Phone/Email/Instagram
- **Advanced Filters**:
  - Attendance: Frequent/Recent/Inactive
  - Date range
  - Added by (DJ/Staff/Promoter)
  - Status (Active/Banned)
- **Guest Table**:
  - Name
  - Contact info
  - Last attended
  - Total visits
  - Added by
- **Guest Profile (on click)**:
  - Full contact details
  - Instagram handle
  - Photo upload area
  - Attendance history timeline
  - Who has added them
  - Notes section
  - Actions dropdown (includes ban)

#### Screen 5: User Management Hub

- **Navigation Tabs**: DJs | Staff | Promoters | VIPs | Managers | Banned
- "+ Invite New [User Type]" button
- **User Cards** showing:
  - Name & role
  - Key metrics
  - Current settings
  - "View Details" button

#### Screen 6: DJ Management

- **Sort Options**:
  - Alphabetical
  - Date added to system
  - Conversion rate
  - Average list size
- **DJ List** with quick stats
- **DJ Detail Modal** (on click):
  - Contact info
  - Event history table:
    - Date
    - Guest list size
    - Conversion rate
  - All-time stats:
    - Total events
    - Average conversion
    - Total guests brought
  - Settings:
    - Default capacity
    - Active status
  - Actions:
    - "Send Reminder"
    - "Suspend"
    - "Remove"

#### Screen 7: Staff/Promoter Management

- Similar layout to DJ management
- **Detail Modal** shows:
  - All-time invites sent
  - Conversion rate
  - Tenure (member since)
  - Current nightly allowance
  - Recent activity (last 5 events)
  - Modify allowance setting
  - Suspend/Remove options

#### Screen 8: VIP Management

- Search bar for VIPs
- **VIP Cards** with photo/name
- **VIP Detail Modal**:
  - Photo upload/display
  - Full name
  - Contact information
  - Instagram handle
  - VIP since date
  - Statistics:
    - Total visits
    - Average +N
    - Favorite DJs
  - Notes field (multi-line)
  - "Revoke VIP Status" button

#### Screen 9: Manager Account Management

- List of all manager accounts
- Role indicators (Owner/Manager/Assistant)
- **For Assistant Managers**:
  - Toggle: "Allow event creation"
  - Other permission settings
- "Add New Manager" button
- Deactivate/Remove options

#### Screen 10: Ban Management

- **Add Ban** section:
  - Input fields:
    - Instagram handle
    - Name
    - Phone
    - Email
  - Duration dropdown:
    - 2 weeks
    - 1 month
    - 2/3/6 months
    - 1 year
    - Permanent
  - Reason/Notes field (required)
  - "Add to Ban List" button
- **Active Bans** list:
  - Search/filter options
  - Shows:
    - Banned person's info
    - Ban reason
    - Admin who banned
    - Start date
    - Expiry date
  - "Remove Ban" option

#### Screen 11: Capacity Requests

- Pending requests queue
- Each request shows:
  - Requester name & role
  - Event date
  - Current limit
  - Requested amount
  - Reason (if provided)
  - Time of request
- "Approve"/"Deny" buttons
- Auto-notification on decision

#### Screen 12: Venue Settings (Owner Only)

- **Venue Information**:
  - Name
  - Address
  - Phone
  - Email
  - Website
  - Social media links
- **Operating Schedule**:
  - Days of operation checkboxes
  - Default hours per day
  - Special closure dates
- **Default Settings**:
  - Event capacity: 75
  - Staff list size: 5
  - Promoter list size: 20
  - DJ list size: 75
  - Max plus ones: 4
  - Approval warning time: 3pm
  - Approval warning threshold: 65%
- "Save Settings" button

#### Screen 13: Analytics Dashboard

- Date range selector
- **Overview Metrics**:
  - Total guests this period
  - Average conversion rate
  - Top performing DJs
  - Busiest nights
- **Detailed Charts**:
  - Conversion by day of week
  - DJ performance comparison
  - Staff/Promoter effectiveness
  - Guest retention trends
- Export options
- (Phase 2: Lightspeed POS integration)

### Design Considerations

**Responsive Design**:

- Desktop-optimized for complex tasks
- Mobile-friendly for on-the-go checks
- Tablet support for event nights

**Real-time Updates**:

- Live approval ratios
- Instant capacity request alerts
- Auto-refresh on guest lists

**Smart Defaults**:

- Pre-populated operating days
- Remember last capacity settings
- Auto-format DJ name lists

**Permission-Based UI**:

- Hide features based on role
- Venue settings only for owners
- Adapt navigation to permissions

---

## Technical Implementation Notes

### Native Share Functionality

```javascript
// Web Share API for mobile sharing
navigator.share({
  title: 'Join me at Datcha',
  text: 'Custom invitation text',
  url: 'https://invite-link',
});
```

### Progressive Web App Features

- Camera access for QR scanning
- Offline capability for doorperson app
- Home screen installation
- Push notifications (Phase 2)

### Real-time Updates

- WebSocket connections for live guest counts
- Instant approval notifications
- Synchronized multi-device access

### Security Considerations

- PIN-based auth for doorperson
- Time-limited invite links
- QR code validation
- Rate limiting on signups

---

## Phase 1 vs Phase 2 Features

### Phase 1 (Launch)

- Core user flows
- Web-based implementation
- SMS/Email notifications
- Basic analytics

### Phase 2 (Post-Launch)

- Native iOS app for doorperson
- Apple/Google Wallet for VIPs
- Push notifications
- Advanced analytics
- Commission tracking
- Marketing tools

---

## DESIGN SYSTEM SPECIFICATIONS

### Core Design Principles

The Nightlist app follows a minimal, clean design philosophy with strict black and white aesthetics for maximum clarity and professional appearance.

### Color Palette

- **Primary Black**: `#000000` - Used for primary buttons, active states, text
- **White**: `#FFFFFF` - Used for backgrounds, button text on dark backgrounds
- **Gray Scale**:
  - `#F9FAFB` (gray-50) - Light background for secondary cards
  - `#F3F4F6` (gray-100) - Secondary button backgrounds
  - `#E5E7EB` (gray-200) - Borders, inactive elements
  - `#9CA3AF` (gray-400) - Muted text, placeholders
  - `#6B7280` (gray-500) - Secondary text
  - `#374151` (gray-700) - Dark text
- **No Red Text**: All error states and warnings use gray text only
- **Success Green**: Reserved only for check-in confirmations and success states

### Typography

- **Font Family**: System font stack (SF Pro on iOS, Roboto on Android, system defaults)
- **Font Weights**:
  - Regular (400) - ALL text content (no bold/medium/semibold anywhere)
  - Light (300) - Large headlines only when specified
- **Font Sizes** (Tailwind classes):
  - `text-xs` (12px) - Small labels, metadata
  - `text-sm` (14px) - Button text, secondary content, dates
  - `text-base` (16px) - Body text
  - `text-lg` (18px) - Event names, subheadings
  - `text-xl` (20px) - Section headers
  - `text-2xl` (24px) - Page titles
  - `text-3xl` (30px) - Dashboard welcomes
- **No Bold Text Rule**: Never use `font-medium`, `font-semibold`, or `font-bold` classes

### Button Specifications

- **Corner Radius**: `rounded-full` (fully pill-shaped) for ALL buttons
- **Padding**: `py-3 px-6` for standard buttons, `py-2 px-4` for small buttons
- **Primary Buttons**: Black background (`bg-black`), white text, hover to gray-900
- **Secondary Buttons**: Gray background (`bg-gray-100`), black text, hover to gray-200
- **Outline Buttons**: White background, thin black border (`border`), black text
- **Font Size**: `text-sm` for most buttons to maintain clean proportions
- **Font Weight**: Regular (400) - NO bold text on buttons
- **Disabled State**: `bg-gray-200 text-gray-400 cursor-not-allowed`

### Card & Container Specifications

- **Corner Radius**: `rounded-xl` for cards and major containers (NOT rounded-full)
- **Borders**:
  - Standard border width: `border` (1px) - never `border-2`
  - Border color: `border-gray-200`
  - **Exception**: No borders on gray background cards (e.g., past events)
- **Padding**: `p-6` for cards, `p-4` for smaller containers
- **Shadows**: Minimal or none - rely on borders for definition
- **Gray Cards**: Use `bg-gray-50` with NO borders, hover to `bg-gray-100`

### Layout & Spacing

- **Container Max Width**: `max-w-4xl mx-auto` for main content areas
- **Section Spacing**: `mb-6` between major sections, `mb-4` between related items
- **Grid Gaps**: `gap-3` for lists, `gap-4` for form layouts
- **Page Padding**: `p-6` for main content areas

### Form Elements

- **Input Fields**:
  - Corner radius: `rounded-xl`
  - Padding: `px-4 py-2`
  - Border: `border border-gray-200`
  - Focus: `focus:border-black` (no ring/shadow)
  - Background: `bg-gray-100` for readonly fields
- **Text Areas**: Same as inputs but with `resize-none`
- **Character Limits**: Display as gray text only, no red warnings

### Interactive Elements

- **Hover States**: Subtle color shifts only (gray-100 to gray-200, black to gray-900)
- **Focus States**: Black border, no outline rings
- **Active States**: No special styling beyond hover
- **Loading States**: Subtle opacity changes, black spinners
- **Transitions**: `transition-colors` for all interactive elements

### Capacity Meters & Progress Bars

- **Height**: `h-4` (thin bars)
- **Corner Radius**: `rounded-full`
- **Background**: `bg-gray-200`
- **Fill**: `bg-black`
- **Numbers**:
  - Size: `text-[10px]` (very small)
  - Position: Absolute positioned within bars
  - Colors: White on black fill, black on gray background

### Navigation & Headers

- **No Black Backgrounds**: All headers use white/transparent backgrounds (including search pages)
- **Back Buttons**: Gray text (`text-gray-600`) with hover to black
- **Breadcrumbs**: Simple text links, no special styling
- **Page Titles**: `text-2xl font-light` typically

### Filter Tabs & Controls

- **Active State**: Dark gray background (`bg-gray-600`) with white text
- **Inactive State**: Light gray background (`bg-gray-100`) with black text
- **Corner Radius**: `rounded-lg` (not full for tabs)
- **Padding**: `px-3 py-1`
- **Font Size**: `text-sm` (regular weight, no bold)

### Status Indicators

- **Approved**: Black background, white text
- **Pending**: Gray background (`bg-gray-200`), dark text
- **Denied**: White background, black text, black border
- **Success/Check-in**: Green background only for actual success states
- **All status badges**: `rounded-lg` corners

### Mobile Responsiveness

- **Touch Targets**: Minimum 44x44pt for all interactive elements
- **Text Scaling**: Maintain hierarchy across screen sizes
- **Button Sizing**: Full width on mobile when appropriate
- **Spacing**: Reduce padding on smaller screens but maintain proportions

### Animation & Transitions

- **Duration**: `transition-colors` (fast color changes)
- **Easing**: Default CSS transitions (no custom timing)
- **Loading**: Simple spinners with `animate-spin`
- **Auto-dismiss**: 3-second timeouts for success states

### Accessibility Compliance

- **Contrast**: All text meets WCAG AA standards
- **Focus Indicators**: Clear black borders on all focusable elements
- **Touch Targets**: 44x44pt minimum
- **Color Independence**: No information conveyed by color alone

### Brand Consistency

- **Logo Usage**: Minimal, clean presentation
- **Voice**: Professional, concise, friendly
- **No Decoration**: Avoid gradients, shadows, or ornamental elements
- **Consistent Spacing**: Use Tailwind's spacing scale consistently

### Quality Assurance Checklist

- [ ] All buttons use `rounded-full`
- [ ] All cards use `rounded-xl`
- [ ] No `border-2` used anywhere (only `border`)
- [ ] Gray cards have no borders
- [ ] No red text for errors/warnings
- [ ] Capacity meter numbers are `text-[10px]`
- [ ] Headers have no black backgrounds
- [ ] Button text is `text-sm`
- [ ] NO bold text anywhere (`font-medium`, `font-semibold`, `font-bold` forbidden)
- [ ] All interactive elements have proper hover states
- [ ] Instagram handles are blue and clickable
- [ ] Event dates use `text-sm`

---

## USER EXPERIENCE PATTERNS & REFINEMENTS

### Guest Card Layout (DJ/Promoter Management Pages)

**Compact Card Design:**

- **Line 1**: Name and +N count on left, +/- adjustment buttons on right
  - Example: `Sarah Johnson +2` [−][+]
  - +/- buttons only show for pending guests that belong to the current user
  - Buttons: `w-6 h-6 rounded-full border border-gray-300`
- **Line 2**: Instagram handle (if present) as blue clickable link
- **Line 3**: Status badge on left, action buttons on right (same line)
  - Status badge: "Pending", "Approved", "Checked In", or "Denied"
  - Action buttons (for pending guests): [Deny] [Approve]
- **No extra vertical spacing** - cards should be compact and scannable

**"Added By" Tag Rules:**

- **Never show** when viewing "My List" (redundant - all guests belong to user)
- **Never show** when Approve/Deny buttons are present (redundant - implies ownership)
- **Only show** in "Complete Guestlist" view for guests NOT belonging to current user

### Button Text Sizing - Adaptive

**Dynamic font sizing to prevent wrapping:**

- Default button text: `text-sm`
- If button text wraps to multiple lines: automatically use `text-xs` with `leading-tight`
- Examples:
  - "Request additional spots" → `text-xs leading-tight`
  - "Review pending guests" → `text-xs leading-tight`
- Keep one-word buttons at `text-sm` ("Copy", "Share", "Approve", etc.)

### Link Sharing Interface

**Copy vs Share distinction:**

- **"Copy" button**: Only copies to clipboard (no Web Share API)
  - Button text: "Copy" (not "Link")
  - Action: Direct clipboard copy with fallback for mobile Safari
- **"Share" button**: Triggers native share sheet
  - Uses Web Share API if available
  - Falls back to copy if not available
- **Link input field**:
  - Clicking the input field itself should copy the link (acts as secondary copy button)
  - Add `cursor-pointer hover:bg-gray-200` to indicate clickability

**Copy feedback animation:**

- When link is copied, link text should **completely disappear** (`opacity-0`)
- "Copied!" message should appear **centered** in the input field
- Use `transition-opacity` for smooth fade
- Auto-dismiss after 2 seconds
- Position: `absolute inset-0 flex items-center justify-center`

### Capacity Meter Label Positioning

**"Pending" label collision avoidance:**

- Calculate pending section center position: `((spotsUsed + (pendingGuests / 2)) / capacity) * 100`
- **Hide "Pending" label** if it would overlap with edge labels:
  - Too close to "Confirmed"/"Approved": `< 30%`
  - Too close to "Spots available"/"Available": `> 65%`
- When hidden, the pending section visual remains but label is removed
- Prevents visual clutter and overlapping text

### Capacity Request Page Simplifications

**Minimal, focused interface:**

- **Capacity meter**: Show only the meter with embedded numbers, no redundant text lines
  - Format: Black bar with white number, gray background with black number
  - Labels below: "Approved" on left, "Available" on right
- **Request input**: Number input with +/- buttons
  - Number input border: `rounded-full` (pill-shaped, not `rounded-xl`)
- **Comments field**:
  - Placeholder text: just "Comments" (not "Explain why you need...")
  - No separate label needed
- **Remove**: "Request Preview" section entirely (unnecessary)

### Dashboard Copy & Messaging

**Promoter Dashboard:**

- Header subtitle: "Invite friends to an upcoming night" (not "Invite some friends to come to a night")
- Keep messaging concise and action-oriented

### Form Input Field Styling

**Pill-shaped inputs for inline controls:**

- Number inputs in inline controls (like capacity requests): `rounded-full`
- Standard form inputs: `rounded-xl`
- Readonly/display inputs: `rounded-full` with `bg-gray-100`

### Modal Overlay Specifications

**Consistent overlay design for all modals:**

- **Background**: `bg-gray-600 bg-opacity-30` (30% opacity gray)
- **Never use**: Black overlays (`bg-black`) or higher opacity backgrounds
- **Applies to**: All modal dialogs, popups, detail cards, and edit forms
- **Z-index**: Nested modals should increment z-index appropriately
  - Primary modals: `z-50`
  - Secondary modals (on top of primary): `z-[60]`
- **Transition animations**:
  - Fade out/in: `0.4s ease-in-out`
  - Opacity keyframes: `0% → 1`, `50% → 0`, `100% → 1`
  - Apply to modal content, not overlay

**Examples:**

- DJ detail modal: Gray overlay
- Edit DJ details popup: Gray overlay (layered on top)
- Guest attendance history: Gray overlay
- Ban confirmation: Gray overlay

**DESIGN STANDARD**: This gray overlay creates visual consistency and reduces eye strain while maintaining clear focus on the modal content. All future modals must follow this specification.

---

## Next Steps

1. Complete Manager flow documentation
2. Create wireframes in Magic Patterns
3. Design component library
4. Prototype key interactions
5. User testing with staff

```

# Deployment Scripts


## File: `deploy-schema.js`

```javascript
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

// Use service role for admin access
const supabaseUrl = 'https://ohkrtsyqbfphsqessdzj.supabase.co';
const serviceRoleKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9oa3J0c3lxYmZwaHNxZXNzZHpqIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0OTQwMTgzOSwiZXhwIjoyMDY0OTc3ODM5fQ.zI9ndXiMmOJvwxFnnjggkKxVFRPHCLo-62fXRlhn6N8';

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

async function deploySchema() {
  console.log('🚀 Deploying comprehensive guestlist schema...');

  try {
    // Read the migration file
    const migrationPath = './supabase/migrations/20250616005319_comprehensive_guestlist_schema.sql';
    const sqlContent = fs.readFileSync(migrationPath, 'utf8');

    console.log('📝 Read migration file successfully');

    // Execute the entire migration as one transaction
    console.log('🛠️ Executing schema migration...');

    const { data, error } = await supabase.rpc('sql', {
      query: sqlContent,
    });

    if (error) {
      console.error('❌ Migration failed:', error.message);
      console.error('Error details:', error);
      return false;
    }

    console.log('✅ Schema migration executed successfully!');

    // Test the deployment by checking if tables exist
    console.log('\n🧪 Verifying deployment...');

    // Check venues table
    const { data: venues, error: venuesError } = await supabase
      .from('venues')
      .select('name')
      .limit(1);

    if (venuesError) {
      console.log('❌ Venues table check failed:', venuesError.message);
      return false;
    }

    console.log('✅ Venues table created:', venues?.[0]?.name || 'Table exists');

    // Check events table
    const { data: eventsCount, error: eventsError } = await supabase
      .from('events')
      .select('count(*)')
      .limit(1);

    if (eventsError) {
      console.log('❌ Events table check failed:', eventsError.message);
      return false;
    }

    console.log('✅ Events table created successfully');

    // Check guests table
    const { data: guestsCount, error: guestsError } = await supabase
      .from('guests')
      .select('count(*)')
      .limit(1);

    if (guestsError) {
      console.log('❌ Guests table check failed:', guestsError.message);
      return false;
    }

    console.log('✅ Guests table created successfully');

    // Test the profiles table (should be fixed now)
    const { data: profileTest, error: profileError } = await supabase
      .from('profiles')
      .select('email, role')
      .eq('email', 'patgoire@gmail.com')
      .maybeSingle();

    if (profileError) {
      if (profileError.code === '42P17') {
        console.log(
          '⚠️ Profiles table still has infinite recursion - RLS policies need manual fix'
        );
      } else {
        console.log('❌ Profiles table error:', profileError.message);
      }
    } else {
      console.log('✅ Profiles table working! Manager role:', profileTest?.role);
    }

    console.log('\n🎉 DATABASE SCHEMA DEPLOYMENT COMPLETE!');
    console.log('🎯 Ready to start Phase 1 MVP development!');

    return true;
  } catch (error) {
    console.error('💥 Deployment failed with exception:', error);
    return false;
  }
}

deploySchema();

```


## File: `deploy-schema-chunked.js`

```javascript
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

// Use service role for admin access
const supabaseUrl = 'https://ohkrtsyqbfphsqessdzj.supabase.co';
const serviceRoleKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9oa3J0c3lxYmZwaHNxZXNzZHpqIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0OTQwMTgzOSwiZXhwIjoyMDY0OTc3ODM5fQ.zI9ndXiMmOJvwxFnnjggkKxVFRPHCLo-62fXRlhn6N8';

// Create client
const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

async function deploySchema() {
  console.log('🚀 Deploying comprehensive guestlist schema...');

  try {
    // First, let's test if we can access existing tables
    console.log('🧪 Testing current database access...');

    const { data: existingTables, error: tablesError } = await supabase
      .from('profiles')
      .select('email, role')
      .eq('email', 'patgoire@gmail.com')
      .maybeSingle();

    if (tablesError) {
      console.log('⚠️ Profiles table issue:', tablesError.message);
    } else {
      console.log('✅ Current profiles table access works:', existingTables?.role);
    }

    // Check if venues table already exists
    const { data: venueTest, error: venueError } = await supabase
      .from('venues')
      .select('name')
      .limit(1);

    if (!venueError) {
      console.log('✅ Schema already deployed! Venues table exists:', venueTest?.[0]?.name);
      return true;
    }

    console.log('📝 Schema not yet deployed. Need to deploy manually...');
    console.log('\n🎯 MANUAL DEPLOYMENT REQUIRED:');
    console.log('1. Go to: https://supabase.com/dashboard/project/ohkrtsyqbfphsqessdzj/sql');
    console.log(
      '2. Copy the content of: supabase/migrations/20250616005319_comprehensive_guestlist_schema.sql'
    );
    console.log('3. Paste it in the SQL Editor and click "Run"');
    console.log('\n⚡ This is the fastest way to deploy the schema!');

    return false;
  } catch (error) {
    console.error('💥 Error:', error);
    return false;
  }
}

deploySchema();

```


## File: `apply-migration.js`

```javascript
const { createClient } = require('@supabase/supabase-js');

// Use service role for admin access
const supabaseUrl = 'https://ohkrtsyqbfphsqessdzj.supabase.co';
const serviceRoleKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9oa3J0c3lxYmZwaHNxZXNzZHpqIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0OTQwMTgzOSwiZXhwIjoyMDY0OTc3ODM5fQ.zI9ndXiMmOJvwxFnnjggkKxVFRPHCLo-62fXRlhn6N8';

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

async function applyMigration() {
  console.log('🚀 Applying event fields migration...');

  try {
    // Apply the migration using individual ALTER statements
    console.log('📝 Adding description field...');
    const { error: descError } = await supabase.rpc('exec_sql', {
      sql: 'ALTER TABLE events ADD COLUMN IF NOT EXISTS description TEXT;',
    });

    if (descError) {
      console.log('⚠️ Description field error (might already exist):', descError.message);
    } else {
      console.log('✅ Description field added');
    }

    console.log('📝 Adding guest_list_deadline field...');
    const { error: guestError } = await supabase.rpc('exec_sql', {
      sql: 'ALTER TABLE events ADD COLUMN IF NOT EXISTS guest_list_deadline TIMESTAMP WITH TIME ZONE;',
    });

    if (guestError) {
      console.log('⚠️ Guest deadline field error (might already exist):', guestError.message);
    } else {
      console.log('✅ Guest deadline field added');
    }

    console.log('📝 Adding dj_approval_deadline field...');
    const { error: djError } = await supabase.rpc('exec_sql', {
      sql: 'ALTER TABLE events ADD COLUMN IF NOT EXISTS dj_approval_deadline TIMESTAMP WITH TIME ZONE;',
    });

    if (djError) {
      console.log('⚠️ DJ deadline field error (might already exist):', djError.message);
    } else {
      console.log('✅ DJ deadline field added');
    }

    // Test the fields are working
    console.log('\n🧪 Testing new fields...');
    const { data, error: testError } = await supabase
      .from('events')
      .select('id, name, description, guest_list_deadline, dj_approval_deadline')
      .limit(1);

    if (testError) {
      console.log('❌ Field test failed:', testError.message);
      return false;
    }

    console.log('✅ All event fields are working!');
    console.log('🎉 MIGRATION COMPLETE - Event form can now be fully enabled!');

    return true;
  } catch (error) {
    console.error('💥 Migration failed with exception:', error);
    return false;
  }
}

applyMigration();

```


## File: `test-supabase-access.js`

```javascript
const { createClient } = require('@supabase/supabase-js');

// Use service role for admin access
const supabaseUrl = 'https://ohkrtsyqbfphsqessdzj.supabase.co';
const serviceRoleKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9oa3J0c3lxYmZwaHNxZXNzZHpqIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0OTQwMTgzOSwiZXhwIjoyMDY0OTc3ODM5fQ.zI9ndXiMmOJvwxFnnjggkKxVFRPHCLo-62fXRlhn6N8';

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

async function testSupabaseAccess() {
  console.log('🔍 Testing Supabase access and checking for SQL execution methods...');

  try {
    // Test basic table access
    const { data: events, error: eventsError } = await supabase
      .from('events')
      .select('id, name')
      .limit(1);

    if (eventsError) {
      console.log('❌ Basic table access failed:', eventsError.message);
      return;
    }

    console.log('✅ Basic Supabase access working');

    // List all available RPC functions
    console.log('\n🔍 Checking available RPC functions...');

    // Try to get schema information
    const { data: functions, error: funcError } = await supabase.rpc('version'); // This should always exist

    if (!funcError) {
      console.log('✅ RPC calls are working');
    }

    // Check what columns currently exist in events table
    console.log('\n📊 Current events table structure:');
    try {
      // Try to select all possible fields to see which ones exist
      const { data: testFields, error: fieldError } = await supabase
        .from('events')
        .select('*')
        .limit(1);

      if (!fieldError && testFields && testFields.length > 0) {
        console.log('Current fields:', Object.keys(testFields[0]));

        // Check specifically for our target fields
        const hasDescription = 'description' in testFields[0];
        const hasGuestDeadline = 'guest_list_deadline' in testFields[0];
        const hasDjDeadline = 'dj_approval_deadline' in testFields[0];

        console.log('✅ description field exists:', hasDescription);
        console.log('✅ guest_list_deadline field exists:', hasGuestDeadline);
        console.log('✅ dj_approval_deadline field exists:', hasDjDeadline);

        if (hasDescription && hasGuestDeadline && hasDjDeadline) {
          console.log('\n🎉 ALL FIELDS ALREADY EXIST! Migration not needed!');
          return true;
        }
      }
    } catch (err) {
      console.log('Table structure check failed:', err.message);
    }

    // Try alternative approaches for executing DDL
    console.log('\n🛠️ Checking for DDL execution capabilities...');

    // Check if we can access the Supabase management API
    console.log('💡 Alternative: Use Supabase CLI or Dashboard for schema changes');
    console.log(
      '🌐 Dashboard: https://supabase.com/dashboard/project/ohkrtsyqbfphsqessdzj/sql/new'
    );
  } catch (error) {
    console.error('💥 Test failed:', error);
  }
}

testSupabaseAccess();

```


---
**End of Backend Integration Export**
