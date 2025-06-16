# Database Migration Instructions

## Required Fields for Event Management

To complete the event creation functionality, please add these fields to the `events` table via the Supabase Dashboard SQL Editor:

### 🌐 Supabase Dashboard URL
https://supabase.com/dashboard/project/ohkrtsyqbfphsqessdzj/sql/new

### 📝 SQL Commands to Execute

```sql
-- Add missing event fields
ALTER TABLE events ADD COLUMN IF NOT EXISTS description TEXT;
ALTER TABLE events ADD COLUMN IF NOT EXISTS guest_list_deadline TIMESTAMP WITH TIME ZONE;
ALTER TABLE events ADD COLUMN IF NOT EXISTS dj_approval_deadline TIMESTAMP WITH TIME ZONE;
```

### ✅ After Migration

1. Uncomment the fields in `/src/app/dashboard/events/create/page.tsx`
2. The event creation form will support:
   - Event descriptions
   - Guest list submission deadlines
   - DJ approval deadlines
   - Full validation logic

### 🧪 Verification

Run this to test the migration worked:
```bash
node check-event-fields.js
```

### 📍 Current Status

- ✅ Event creation form UI is complete
- ✅ All validation logic is implemented
- ⏳ Database fields need manual addition
- ✅ Form works without optional fields for now

The event management system is functional at: http://localhost:3001/dashboard/events