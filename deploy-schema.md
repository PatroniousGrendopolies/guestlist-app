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