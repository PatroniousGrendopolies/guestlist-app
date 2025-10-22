# TODO - Guestlist App Development

## Current Status
✅ Manager and DJ pages fully connected to real backend
✅ All core API routes created and tested
✅ Environment-based authentication setup (disabled in dev, enabled in production)

## Next Steps

### High Priority
- [ ] Connect Staff and Promoter role pages to real data
  - Similar to DJ pages: Dashboard, Event Manage, Guest Details
  - Use existing API endpoints where possible

- [x] Environment-based authentication setup
  - Auth disabled in local dev for fast UX iteration
  - Auth automatically enabled in production (Netlify)
  - Set `ENABLE_AUTH_IN_DEV=true` in `.env.local` to test auth locally

- [ ] Re-enable Row Level Security (RLS) policies on Supabase
  - Currently disabled for testing
  - Must enable before production deployment
  - Test each role can only access their data
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

## Available MCP Tools
- **Playwright MCP**: Installed for automated browser testing
  - Use for testing user flows, screenshots, and UI validation
  - Example: `mcp__playwright__*` tools

- **Netlify**: Deployment platform (not Vercel)
  - Vercel config files were removed
  - Deploy via git push or Netlify CLI

## Environment Variables (Netlify)
Required environment variables in Netlify dashboard:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY` (if needed for server operations)
