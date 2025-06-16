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