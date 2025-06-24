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