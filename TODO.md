# TODO - Guestlist App Development

## Current Status
✅ Manager and DJ pages fully connected to real backend
✅ All core API routes created and tested
✅ Authentication temporarily disabled for testing

## Next Steps

### High Priority
- [ ] Connect Staff and Promoter role pages to real data
  - Similar to DJ pages: Dashboard, Event Manage, Guest Details
  - Use existing API endpoints where possible

- [ ] Re-enable authentication and test role-based access
  - Set `DISABLE_MIDDLEWARE = false` in `/src/middleware.ts`
  - Re-enable Row Level Security (RLS) policies on Supabase
  - Test each role (Manager, DJ, Staff, Promoter) can only access their data
  - Verify unauthorized access is blocked

- [ ] Deploy to Netlify
  - Push latest changes
  - Verify environment variables are set
  - Test production build

### Medium Priority
- [ ] Add comprehensive test data
  - Multiple events with different dates
  - Guest lists with various statuses
  - Edge cases (capacity limits, denied guests, etc.)

- [ ] Guest signup flow
  - Public guest signup page
  - QR code generation
  - Email notifications

- [ ] Check-in functionality
  - QR code scanning
  - Manual check-in
  - Real-time capacity updates

### Low Priority
- [ ] Analytics dashboard
- [ ] Export guest lists
- [ ] Bulk operations (approve all, etc.)

## Recent Completed Work

### DJ Pages - Backend Integration (Latest Session)
- ✅ Created `/api/guest-list-entries/[entryId]` for single guest fetch
- ✅ Connected DJ Dashboard to fetch real events from `/api/events/[id]`
- ✅ Connected DJ Event Manage page with real guest entries
- ✅ Fixed infinite loop caused by `showToast` in useEffect dependencies
- ✅ Fixed guest name mapping to use nested object structure (`guest.first_name`, `guest.last_name`)
- ✅ Connected DJ Guest Details page with approve/deny functionality
- ✅ All changes committed and pushed to GitHub

### Manager Pages - Backend Integration (Previous Session)
- ✅ Created core API routes (`/api/events`, `/api/guest-lists`, etc.)
- ✅ Connected Manager Dashboard to real Supabase data
- ✅ Connected Manager Event Details page with capacity tracking
- ✅ Implemented approve/deny with database persistence

## Known Issues
- RLS is currently disabled - needs to be re-enabled with proper policies
- Middleware authentication is bypassed (`DISABLE_MIDDLEWARE = true`)
- Some guest list entries may have NULL `created_by_user_id` (test data)

## Technical Notes
- Using Next.js 15.3.3 with App Router
- Supabase for PostgreSQL database
- API routes follow pattern: `/src/app/api/...`
- All pages map snake_case DB fields to camelCase in frontend
