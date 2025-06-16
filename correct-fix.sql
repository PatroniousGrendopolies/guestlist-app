-- CORRECT SYNTAX: PostgreSQL doesn't support IF NOT EXISTS for policies
-- Use DO blocks to handle existing policies gracefully

DO $$
BEGIN
    -- Try to create insert policy, ignore if it already exists
    BEGIN
        CREATE POLICY "allow_authenticated_event_insert" ON events
          FOR INSERT WITH CHECK (auth.role() = 'authenticated');
    EXCEPTION
        WHEN duplicate_object THEN
            -- Policy already exists, that's fine
            RAISE NOTICE 'Policy allow_authenticated_event_insert already exists, skipping';
    END;

    -- Try to create select policy, ignore if it already exists  
    BEGIN
        CREATE POLICY "allow_authenticated_event_select" ON events
          FOR SELECT USING (auth.role() = 'authenticated');
    EXCEPTION
        WHEN duplicate_object THEN
            -- Policy already exists, that's fine
            RAISE NOTICE 'Policy allow_authenticated_event_select already exists, skipping';
    END;
END $$;