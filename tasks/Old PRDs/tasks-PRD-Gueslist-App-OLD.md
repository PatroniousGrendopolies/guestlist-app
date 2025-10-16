## Relevant Files

- `src/pages/index.tsx` - Main landing page for the application
- `src/pages/login.tsx` - Login page for staff, promoters, and DJs
- `src/pages/dashboard/[role].tsx` - Role-specific dashboard (manager, doorman, promoter, DJ)
- `src/pages/api/auth/[...nextauth].ts` - Authentication API routes
- `src/pages/api/guests/index.ts` - Guest list management API
- `src/pages/api/events/index.ts` - Event management API
- `src/components/QRScanner.tsx` - QR code scanning component for doormen
- `src/components/QRGenerator.tsx` - QR code generation for guests
- `src/components/GuestForm.tsx` - Guest signup form component
- `src/components/GuestList.tsx` - Guest list display component
- `src/components/Analytics/Dashboard.tsx` - Analytics dashboard for managers
- `src/lib/db/models/User.ts` - User model definition
- `src/lib/db/models/Guest.ts` - Guest model definition
- `src/lib/db/models/Event.ts` - Event model definition
- `src/lib/db/models/GuestList.ts` - Guest list model definition
- `src/lib/utils/privacy.ts` - Privacy and compliance utilities
- `src/lib/utils/offline.ts` - Offline support utilities
- `src/tests/` - Test files for components and utilities
- `prisma/schema.prisma` - Database schema definition

### Notes

- Unit tests should typically be placed alongside the code files they are testing (e.g., `MyComponent.tsx` and `MyComponent.test.tsx` in the same directory).
- Use `npx jest [optional/path/to/test/file]` to run tests. Running without a path executes all tests found by the Jest configuration.
- The application will use Next.js for the frontend and API routes, with Prisma for database access.
- All data must be stored in Canada to comply with Quebec privacy laws.

## 📊 Progress Summary

**Overall Project Status**: ~25% Complete (Phase 1 MVP in progress)

| Phase | Progress | Status |
|-------|----------|--------|
| **Phase 1: MVP** (4-6 weeks) | 30% | 🔄 In Progress |
| **Phase 2: Enhanced Platform** (2-3 months) | 0% | ⏳ Not Started |
| **Phase 3: Business Intelligence** (3-6 months) | 0% | ⏳ Not Started |

**Key Achievements**:
- ✅ Complete infrastructure and database setup
- ✅ Doorperson interface 100% functional (QR scanning, manual search, check-ins)
- 🎨 Manager dashboard UI complete (not connected to backend)
- ⚠️ Authentication working but incomplete (emails don't send)

**Critical Gap**: Frontend UI is 84% complete, but backend integration is only ~15% complete. No API endpoints for event/guest management.

---

## Development Phases

This project follows a strategic 3-phase approach to deliver value quickly while building toward a comprehensive nightclub CRM platform.

### Phase 1: MVP Core Features (4-6 weeks) 🚀

**Goal**: Deploy a working guest list management system for immediate use

**Database Foundation**: ✅ COMPLETED

- [x] Core database schema with 5 essential tables deployed
- [x] Authentication and RLS policies configured
- [x] Supabase infrastructure set up

**Core Features**:

- [x] **Event Creation Interface** (Managers) 🎨 **UI COMPLETE** - ❌ Not Connected to Backend

  - [x] Create new events with date, venue, capacity 🎨 (Form exists, doesn't save)
  - [ ] Set deadlines for guest list submissions ❌
  - [ ] Manage event status (active/cancelled/completed) ❌
  - [x] Calendar view and event cards ✅
  - [ ] **MISSING**: API endpoints for CRUD operations ❌

- [ ] **Guest Signup Flow** (Mobile-first) ❌ **NOT STARTED**

  - [ ] Public guest registration form ❌
  - [ ] Plus-one selection (up to 4) ❌
  - [ ] Contact information collection ❌
  - [ ] Instagram handle integration ❌
  - [x] Guest auth page exists 🎨 (Basic UI only)

- [ ] **DJ Dashboard & Workflow** ❌ **NOT STARTED**

  - [ ] DJ invitation system for events ❌
  - [ ] Guest list creation and management ❌
  - [ ] Capacity tracking and limits ❌
  - [ ] QR code generation for approved guests ❌
  - [x] Invitation backend exists ✅ (but emails don't send)

- [x] **Door Management System** ✅ **100% COMPLETE**
  - [x] QR code scanning for check-ins ✅ (qr-scanner library v1.4.2)
  - [x] Guest status verification ✅
  - [x] Plus-one validation ✅ (Editable +/- buttons)
  - [x] Real-time capacity monitoring ✅
  - [x] Manual search backup ✅ (Voice search, filters)
  - [x] PIN-based authentication ✅
  - [x] Dark mode with persistence ✅
  - [x] Problem guest alerts ✅

**Authentication**: ⚠️ **PARTIAL** - 60% Complete

- [x] Role-based access (Manager, DJ, Guest) ✅
- [x] Supabase authentication integration ✅
- [x] RLS policies for data security ⚠️ (Exist but have infinite recursion issue)
  - [x] 2.4.2 Implement `invitations` table and `invitation_status` enum in Supabase via SQL ✅
  - [x] 2.4.3 Define RLS policies for `invitations` table (manager create/read, invitee read, service role) ✅
  - [x] 2.4.4 Create API endpoint for sending invitations (`POST /api/invitations`) ✅
  - [x] 2.4.5 Create API endpoint/page for accepting invitations (`/auth/accept-invitation`) ✅
  - [x] 2.4.6 Develop UI for managers to send invitations ✅ (Unified invite modal)
  - [x] 2.4.7 Develop UI for accepting invitations ✅
  - [x] 2.5 Implement password reset functionality ⚠️ (UI exists, backend unclear)
  - [ ] 2.6 Add session management and token-based authentication ❌
  - [ ] 2.7 Create API endpoints for user management ❌
  - [ ] 2.8 Implement user profile management ❌
  - [ ] 2.9 Fix Supabase RLS policies to remove temporary hardcoded manager role workaround ⚠️
    - [ ] 2.9.1 Execute RLS policy fix SQL in Supabase dashboard (supabase/migrations/20250615191953_fix_rls_policies.sql) ❌
    - [ ] 2.9.2 Remove temporary hardcoded manager role from dashboard/page.tsx ❌
    - [ ] 2.9.3 Test all user roles work with proper database lookup ❌
    - [ ] 2.9.4 Verify no infinite recursion errors in profile queries ❌
  - [ ] **MISSING**: Email sending for invitations not implemented ❌

**Authentication Status**: Login pages work, but invitation emails don't send and session management is incomplete. RLS policies have infinite recursion bug.

## DEVELOPMENT PHASES

**PHASE 1 - MVP (4-6 weeks):** Core guest list functionality for immediate value
**PHASE 2 - Enhanced Platform (2-3 months):** Advanced features and analytics  
**PHASE 3 - Business Intelligence (3-6 months):** Full CRM and predictive analytics

---

## PHASE 1 - MVP DEVELOPMENT (4-6 weeks)

- [x] 3.0 Deploy Core Database Schema (Foundation for all phases) ✅ **COMPLETE** (except RLS issues)

  - [x] 3.1 Deploy comprehensive database schema to Supabase ✅
    - [x] 3.1.1 Create comprehensive schema migration file ✅
    - [x] 3.1.2 Execute schema migration in Supabase dashboard ✅
    - [x] 3.1.3 Verify all tables and relationships created correctly ✅
    - [ ] 3.1.4 Test RLS policies work without infinite recursion ⚠️ (Known issue: infinite recursion bug)

  **Database Status**: All 11 tables deployed (venues, events, profiles, invitations, guests, guest_lists, guest_list_entries, check_ins, notifications, blocklists, settings). RLS policies have infinite recursion issue that needs fixing.

- [ ] 4.0 Basic Event Management System (MVP) ⚠️ **PARTIAL** - 50% Complete (UI: 95%, Backend: 5%)

  - [x] 4.1 Create simple event creation for managers 🎨 (UI Complete, Backend Missing)
    - [x] 4.1.1 Build event creation form (name, date, venue) ✅ (Custom calendar, DJ selection)
    - [x] 4.1.2 Add DJ email invitation during event creation 🎨 (UI exists in unified modal)
    - [x] 4.1.3 Create basic event list view for managers ✅ (Calendar view, event cards)
    - [ ] 4.1.4 Implement event status management ❌
    - [ ] **MISSING**: POST /api/events endpoint to save events ❌
    - [ ] **MISSING**: GET /api/events endpoint to load events ❌
    - [ ] **MISSING**: Form submission handler with Supabase ❌
  - [ ] 4.2 DJ Dashboard and List Creation ❌ **NOT STARTED**
    - [ ] 4.2.1 Create DJ dashboard showing assigned events ❌
    - [ ] 4.2.2 Auto-create guest list when DJ accepts event ❌
    - [ ] 4.2.3 Generate unique signup link for DJ's list ❌
    - [ ] 4.2.4 Basic DJ list management interface ❌

  **Event Management Status**: Manager UI is beautiful and complete but doesn't save or load data. No backend integration. DJ dashboard not started.

- [ ] 5.0 Guest Signup and Management (MVP) ❌ **NOT STARTED** - 5% Complete

  - [ ] 5.1 Mobile-first guest signup page ❌
    - [ ] 5.1.1 Create responsive signup form (name, email, phone, +1s) ❌
    - [ ] 5.1.2 Implement guest list selection from active events ❌
    - [ ] 5.1.3 Add basic duplicate prevention (email check) ❌
    - [ ] 5.1.4 Create signup confirmation page ❌
    - [x] Guest auth page exists 🎨 (Basic UI skeleton only)
  - [ ] 5.2 Guest approval workflow ❌
    - [ ] 5.2.1 Create DJ approval interface for pending guests ❌
    - [ ] 5.2.2 Implement approve/deny functionality ❌
    - [ ] 5.2.3 Add basic capacity checking (75 guest default) ❌
    - [ ] 5.2.4 Send approval/denial notifications to guests ❌

  **Guest Management Status**: No guest signup form or approval workflow implemented. Only basic guest auth page exists with no functionality.

- [ ] 6.0 QR Code System (MVP) ⚠️ **PARTIAL** - 50% Complete (Scanning: 100%, Generation: 0%)

  - [ ] 6.1 QR code generation and delivery ❌ **NOT STARTED**
    - [ ] 6.1.1 Generate unique QR codes for approved guests ❌
    - [ ] 6.1.2 Create QR code email template and sending ❌
    - [ ] 6.1.3 Implement single-use QR code security ❌
    - [ ] 6.1.4 Add QR code display page for guests ❌
  - [x] 6.2 Doorman scanning interface ✅ **100% COMPLETE**
    - [x] 6.2.1 Create mobile-friendly scanning interface ✅ (PIN login, dark mode)
    - [x] 6.2.2 Implement camera QR code scanning ✅ (qr-scanner library v1.4.2)
    - [x] 6.2.3 Add manual guest search backup ✅ (Voice search, name/email/status filters)
    - [x] 6.2.4 Create check-in confirmation flow ✅ (Success page, 3s auto-redirect)
    - [x] Plus-one management with editable +/- buttons ✅
    - [x] Real-time capacity monitoring ✅
    - [x] Problem guest alerts ✅

  **QR Code Status**: Doorperson scanning interface is fully functional and production-ready. QR code generation and delivery system not started.

- [ ] 7.0 Basic Analytics Dashboard (MVP) ❌ **NOT STARTED** - 0% Complete
  - [ ] 7.1 Manager analytics overview ❌
    - [ ] 7.1.1 Show upcoming events with signup counts ❌
    - [ ] 7.1.2 Display real-time check-in status during events ❌
    - [ ] 7.1.3 Basic conversion reporting (signups vs check-ins) ❌
    - [ ] 7.1.4 Simple DJ performance comparison ❌
    - [x] Manager dashboard has placeholder for metrics 🎨 (No data collection)
  - [ ] 7.2 DJ analytics view ❌
    - [ ] 7.2.1 Show DJ's guest list status and count ❌
    - [ ] 7.2.2 Display check-in progress during event ❌
    - [ ] 7.2.3 Basic conversion rate for DJ's list ❌

  **Analytics Status**: No analytics implementation. Manager dashboard has visual placeholders but no data collection or reporting backend.

---

## PHASE 2 - ENHANCED PLATFORM (2-3 months)

**Phase 2 Status**: ❌ **NOT STARTED** - 0% Complete. All Phase 2 features are planned but not yet implemented. Phase 1 MVP must be completed first.

---

- [ ] 8.0 Advanced Guest Management Features ❌ **NOT STARTED**

  - [ ] 8.1 Guest Tier and Rewards System
    - [ ] 8.1.1 Track guest conversion rates and attendance history
    - [ ] 8.1.2 Implement micro-promoter tier for frequent attendees
    - [ ] 8.1.3 Add monthly invite allowances for micro-promoters
    - [ ] 8.1.4 Create VIP status system with special privileges
    - [ ] 8.1.5 Build promoter reward system (drinks/bottle service)
  - [ ] 8.2 Enhanced Guest Features
    - [ ] 8.2.1 Add Instagram handle and postal code collection
    - [ ] 8.2.2 Implement returning guest auto-fill
    - [ ] 8.2.3 Create guest preference tracking
    - [ ] 8.2.4 Add plus ones contact collection (optional)
  - [ ] 8.3 Guest Blocklist and Security
    - [ ] 8.3.1 Create guest blocklist management for managers
    - [ ] 8.3.2 Add blocklist checking during signup process
    - [ ] 8.3.3 Implement blocklist reasons and audit trail

- [ ] 9.0 Advanced Event and DJ Management ❌ **NOT STARTED**

  - [ ] 9.1 Enhanced Event Creation
    - [ ] 9.1.1 Add event photo/flyer upload functionality
    - [ ] 9.1.2 Implement club schedule awareness and event alerts
    - [ ] 9.1.3 Create event status tracking (active/cancelled/under_promoted)
    - [ ] 9.1.4 Add maximum capacity management per event
  - [ ] 9.2 DJ Management System
    - [ ] 9.2.1 Auto-invite DJs when added to events (email/SMS)
    - [ ] 9.2.2 Detect returning DJs vs new registrations
    - [ ] 9.2.3 Enable DJ access to past event lists and re-invites
    - [ ] 9.2.4 Add DJ media upload (photos, mixes, tracks)
  - [ ] 9.3 Staff and Promoter Lists
    - [ ] 9.3.1 Create staff guest list system (any upcoming night)
    - [ ] 9.3.2 Add promoter list management
    - [ ] 9.3.3 Implement capacity limits and deadline management

- [ ] 10.0 Notification and Communication System ❌ **NOT STARTED**

  - [ ] 10.1 Email and SMS Notifications ❌
    - [ ] 10.1.1 Implement comprehensive notification system
    - [ ] 10.1.2 Create DJ invitation and reminder emails
    - [ ] 10.1.3 Add guest signup and approval notifications
    - [ ] 10.1.4 Build manager alert system
  - [ ] 10.2 Advanced Reminders
    - [ ] 10.2.1 DJ approval reminders (every 5 signups, hourly on event day)
    - [ ] 10.2.2 Manager alerts for capacity approaching limits
    - [ ] 10.2.3 Event creation reminders (2 weeks out)
    - [ ] 10.2.4 Under-promotion detection alerts
  - [ ] 10.3 Contact Sharing Integration
    - [ ] 10.3.1 Research iOS contact sharing to app functionality
    - [ ] 10.3.2 Implement SMS-based staff invite system
    - [ ] 10.3.3 Create contact-to-invite workflow for staff

- [ ] 11.0 Enhanced Analytics and Reporting ❌ **NOT STARTED**
  - [ ] 11.1 Advanced Analytics Infrastructure ❌
    - [ ] 11.1.1 Implement guest conversion rate calculations
    - [ ] 11.1.2 Build DJ performance tracking system
    - [ ] 11.1.3 Add event success metrics aggregation
    - [ ] 11.1.4 Create guest lifetime value calculations
  - [ ] 11.2 Improved Dashboards
    - [ ] 11.2.1 Enhanced manager dashboard with detailed analytics
    - [ ] 11.2.2 Improved DJ analytics with conversion tracking
    - [ ] 11.2.3 Add data visualization components
    - [ ] 11.2.4 Create export functionality for analytics data

---

## PHASE 3 - BUSINESS INTELLIGENCE PLATFORM (3-6 months)

**Phase 3 Status**: ❌ **NOT STARTED** - 0% Complete. All Phase 3 features are planned for future development after Phase 1 MVP and Phase 2 enhancements are complete.

---

- [ ] 12.0 Predictive Analytics and AI Features ❌ **NOT STARTED**

  - [ ] 12.1 Predictive Analytics Engine
    - [ ] 12.1.1 Implement attendance prediction algorithms
    - [ ] 12.1.2 Create under-promotion detection system
    - [ ] 12.1.3 Add capacity warning predictions
    - [ ] 12.1.4 Build DJ conversion rate forecasting
  - [ ] 12.2 Guest Intelligence
    - [ ] 12.2.1 Track frequent attendee patterns
    - [ ] 12.2.2 Analyze VIP guest preferences and DJ affinities
    - [ ] 12.2.3 Build guest tier promotion algorithms
    - [ ] 12.2.4 Create guest segmentation and targeting

- [ ] 13.0 Lightspeed POS Integration ❌ **NOT STARTED**

  - [ ] 13.1 POS API Integration Setup ❌
    - [ ] 13.1.1 Research and implement Lightspeed API connection
    - [ ] 13.1.2 Create secure API credential management
    - [ ] 13.1.3 Build data synchronization workflows
  - [ ] 13.2 Sales Data Integration
    - [ ] 13.2.1 Pull bar sales data by event
    - [ ] 13.2.2 Import door sales and paid cover counts
    - [ ] 13.2.3 Correlate sales data with guest list analytics
    - [ ] 13.2.4 Create revenue per guest calculations
  - [ ] 13.3 Advanced Revenue Analytics
    - [ ] 13.3.1 Build revenue correlation analytics (guest lists vs sales)
    - [ ] 13.3.2 Create ROI analysis for DJ performance
    - [ ] 13.3.3 Implement profit optimization recommendations

- [ ] 14.0 Advanced Media and Content Management ❌ **NOT STARTED**

  - [ ] 14.1 Media Management System ❌
    - [ ] 14.1.1 Add photo/image upload and storage system
    - [ ] 14.1.2 Create DJ mix and track link management
    - [ ] 14.1.3 Implement event flyer upload functionality
  - [ ] 14.2 Content Marketing Features
    - [ ] 14.2.1 Create shareable event content for social media
    - [ ] 14.2.2 Build DJ promotional content templates
    - [ ] 14.2.3 Add guest invitation content customization

- [ ] 15.0 Future Ticket Sales Integration ❌ **NOT STARTED**

  - [ ] 15.1 Ticket Sales System ❌
    - [ ] 15.1.1 Design ticket sales schema integration
    - [ ] 15.1.2 Plan QR code unified scanning (guest list + tickets)
    - [ ] 15.1.3 Create payment processing foundation
  - [ ] 15.2 Unified Entry System
    - [ ] 15.2.1 Integrate ticket scanning with guest list scanning
    - [ ] 15.2.2 Create unified doorman interface for all entry types
    - [ ] 15.2.3 Add payment processing for cover charges

- [ ] 16.0 Enterprise Features and Multi-Venue Support ❌ **NOT STARTED**
  - [ ] 16.1 Multi-Venue Platform ❌
    - [ ] 16.1.1 Extend venue management for multiple locations
    - [ ] 16.1.2 Create venue-specific analytics and reporting
    - [ ] 16.1.3 Build cross-venue guest tracking
  - [ ] 16.2 Enterprise Analytics
    - [ ] 16.2.1 Create comprehensive business intelligence dashboard
    - [ ] 16.2.2 Add automated weekly/monthly reports
    - [ ] 16.2.3 Build custom reporting and data export tools

---

## ONGOING THROUGHOUT ALL PHASES

- [ ] 17.0 Security, Privacy, and Compliance ⚠️ **PARTIAL** - 35% Complete

  - [ ] 17.1 Data Security ⚠️
    - [ ] 17.1.1 Implement end-to-end encryption for sensitive data ❌
    - [x] 17.1.2 Create secure data access controls ⚠️ (RLS policies exist but have infinite recursion bug)
    - [ ] 17.1.3 Develop audit logging for compliance monitoring ❌
  - [ ] 17.2 Privacy Compliance ⚠️
    - [ ] 17.2.1 Develop consent management system for guests ❌
    - [ ] 17.2.2 Implement right-to-be-forgotten functionality ❌
    - [x] 17.2.3 Add data residency controls for Quebec compliance ✅ (Supabase hosted in Canada)
    - [ ] 17.2.4 Create privacy policy and terms of service ❌

  **Security Status**: Basic infrastructure in place (Canadian hosting, RBAC, RLS). Missing encryption, consent management, privacy policy, and audit logging. RLS policies need debugging.

- [ ] 18.0 Performance and Reliability ⚠️ **PARTIAL** - 10% Complete
  - [ ] 18.1 Offline Support ❌
    - [ ] 18.1.1 Create local caching system for guest lists ❌
    - [ ] 18.1.2 Implement offline-first architecture for doorman interface ❌
    - [ ] 18.1.3 Develop data synchronization on reconnection ❌
  - [ ] 18.2 Error Handling and Reliability ⚠️
    - [x] 18.2.1 Add comprehensive error handling for edge cases ⚠️ (QR scanner errors handled)
    - [ ] 18.2.2 Implement graceful degradation for poor connectivity ❌
    - [ ] 18.2.3 Create user feedback for connection status ❌
    - [ ] 18.2.4 Add retry mechanisms for failed operations ❌

  **Performance Status**: Basic error handling for QR scanning implemented. No offline caching, data synchronization, or comprehensive error recovery systems.
