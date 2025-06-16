-- Add missing fields to events table for PRD requirements
-- Adding description, guest list deadline, and DJ approval deadline

ALTER TABLE events 
ADD COLUMN description TEXT,
ADD COLUMN guest_list_deadline TIMESTAMP WITH TIME ZONE,
ADD COLUMN dj_approval_deadline TIMESTAMP WITH TIME ZONE;