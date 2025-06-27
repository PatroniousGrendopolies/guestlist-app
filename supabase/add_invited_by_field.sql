-- Add a field to track who invited each guest
ALTER TABLE guests 
ADD COLUMN IF NOT EXISTS invited_by_guest_id UUID REFERENCES guests(id),
ADD COLUMN IF NOT EXISTS invitation_status TEXT DEFAULT 'confirmed' CHECK (invitation_status IN ('pending', 'confirmed', 'declined'));

-- Create index for performance
CREATE INDEX IF NOT EXISTS idx_guests_invited_by ON guests(invited_by_guest_id) WHERE invited_by_guest_id IS NOT NULL;