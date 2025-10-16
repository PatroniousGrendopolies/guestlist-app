# Nightclub Guest List Management System - Master PRD
**Last Updated:** October 14, 2025
**Project:** Datcha Nightclub, Montreal

---

## Project Overview

A comprehensive guest list management platform for nightclubs. The system manages event creation, DJ invitations, guest registrations, capacity limits, QR code check-ins, and provides analytics for optimization.

### Core User Roles
- **Manager**: Creates events, invites DJs, reviews analytics, manages capacity
- **DJ**: Manages guest lists, approves/denies guests, monitors capacity
- **Promoter**: Tracks capacity, manages guest lists
- **Doorperson/Staff**: Scans QR codes, checks in guests, monitors capacity
- **Guest**: Signs up for events, receives QR codes, checks in

### Development Phases
This project follows a strategic 3-phase approach to deliver value quickly while building toward a comprehensive nightclub CRM platform.

---

## 📊 Overall Progress

**Phase 1 MVP**: ~30% Complete (4-6 weeks estimated)

| Component | Frontend UI | Backend Integration | Status |
|-----------|-------------|---------------------|---------|
| Infrastructure | ✅ 100% | ✅ 100% | **Complete** |
| Database Schema | ✅ 100% | ✅ 100% | **Complete** |
| Manager Dashboard | ✅ 95% | ❌ 10% | UI Complete |
| Doorperson Interface | ✅ 100% | ✅ 100% | **Complete** |
| Guest Auth | ✅ 100% | ⚠️ 50% | UI Complete |
| Event Creation | ✅ 100% | ❌ 0% | UI Only |
| Guest Signup | ❌ 0% | ❌ 0% | Not Started |
| DJ Dashboard | ✅ 100% | ❌ 0% | UI Only |
| QR Generation | ❌ 0% | ❌ 0% | Not Started |
| Analytics | ❌ 0% | ❌ 0% | Not Started |

**🚨 Critical Gap**: Beautiful frontend exists (90% UI complete) but **not connected to Supabase backend** (~15% backend integration)

---

## Phase 1: MVP Core Features (4-6 weeks) 🚀

**Goal**: Deploy a working guest list management system for immediate use

### ✅ 1.0 Infrastructure Setup **COMPLETE**

- [x] Next.js 15.3.3 with TypeScript
- [x] Supabase with PostgreSQL (Prisma installed but not used)
- [x] Supabase Authentication
- [x] Jest and React Testing Library
- [x] ESLint and Prettier
- [x] CI/CD pipeline
- [x] Canadian database hosting (Quebec compliance)
- [x] Project structure and folder organization

---

### ✅ 2.0 Database Schema **COMPLETE**

- [x] All 11 tables deployed
  - [x] `venues` - Venue information
  - [x] `events` - Event details, dates, capacity
  - [x] `profiles` - User profiles with roles
  - [x] `invitations` - User invitation system
  - [x] `guests` - Guest profiles with tier tracking
  - [x] `guest_lists` - DJ-specific lists
  - [x] `guest_list_entries` - Individual registrations
  - [x] `check_ins` - Check-in records
  - [x] `notifications` - Notification queue
  - [x] `blocklists` - Problem guest tracking
  - [x] `settings` - Venue settings
- [x] Relationships and foreign keys
- [x] Indexes for performance
- [ ] RLS policies (exist but have infinite recursion bug) ⚠️

**Status**: Schema deployed. RLS policies need debugging.

---

### ⚠️ 3.0 Authentication and User Management **PARTIAL** - 60% Complete

- [x] User model with role-based access control
- [x] Secure login functionality
- [x] Role-based authorization middleware
- [x] User invitation system 🎨 (UI exists, emails don't send)
  - [x] Invitations table schema
  - [x] RLS policies for invitations
  - [x] API endpoint for sending invitations
  - [x] Unified invite modal UI
  - [x] Invitation acceptance page
  - [ ] Email sending integration ❌
- [x] Password reset functionality ⚠️ (UI exists, backend unclear)
- [ ] Session management and token-based auth ❌
- [ ] User management API endpoints ❌
- [ ] User profile management ❌

**Status**: Login works, but email system and session management incomplete.

---

### 🎨 4.0 Event Management System **UI ONLY** - 50% Complete

- [x] Manager Event Creation Interface ✅ **UI Complete**
  - [x] Event creation form with custom calendar
  - [x] Venue selection (default: Datcha)
  - [x] Capacity settings (default: 300)
  - [x] DJ guest list limit (default: 75)
  - [x] DJ email invitation field
  - [x] Drag-and-drop DJ ordering
  - [ ] POST /api/events endpoint ❌
  - [ ] Form submission handler ❌
- [x] Manager Dashboard ✅ **UI Complete**
  - [x] Calendar view for events
  - [x] Event cards with capacity metrics
  - [x] Filter by event type
  - [x] Search functionality
  - [ ] GET /api/events endpoint ❌
  - [ ] Real data fetching ❌
- [ ] Event status management ❌
- [ ] Event editing and deletion ❌

**Status**: Beautiful UI exists but doesn't save or load data from database.

---

### ❌ 5.0 Guest Signup Flow **NOT STARTED** - 0% Complete

- [x] Guest auth page ✅ (UI skeleton only)
- [ ] Mobile-first guest signup form ❌
  - [ ] Name, email, phone fields
  - [ ] Plus-one selection (0-4)
  - [ ] Instagram handle (optional)
  - [ ] Event selection
- [ ] Guest signup API ❌
  - [ ] POST /api/guests
  - [ ] Input validation
  - [ ] Duplicate prevention
- [ ] Signup confirmation page ❌

---

### 🎨 6.0 DJ Dashboard and Workflow **UI COMPLETE** - 50% Complete

- [x] DJ dashboard UI ✅ **UI Complete**
  - [x] View assigned events (uses mock data)
  - [x] See pending guests (capacity meter with pending notifications)
  - [x] Monitor capacity (visual capacity bars)
  - [x] Share invite links (copy/share functionality)
  - [x] Past events section
  - [x] Responsive mobile-first design
  - [ ] Load real events from database ❌
  - [ ] Fetch guest list entries ❌
- [ ] Guest approval workflow ❌
  - [x] Approve/deny interface UI ✅
  - [ ] POST /api/guest-lists/[id]/approve ❌
  - [ ] POST /api/guest-lists/[id]/deny ❌
  - [ ] Connect approval actions to database ❌
- [x] Capacity tracking UI ✅ (Visual only, needs real data)
- [x] Guest list management UI ✅ (Interface exists, needs backend)
  - [x] Guest list view page
  - [x] Guest detail pages
  - [x] Batch invite interface
  - [x] Past guest re-invite flow
  - [ ] Backend CRUD operations ❌

**Status**: Complete UI with mock data. All backend integration needed.

---

### ✅ 7.0 Doorperson Interface **100% COMPLETE**

- [x] PIN-based authentication
- [x] QR code scanner
  - [x] Camera integration
  - [x] Real-time QR detection
  - [x] Guest verification
  - [x] qr-scanner library v1.4.2
- [x] Manual guest search backup
  - [x] Search by name/email
  - [x] Voice search input
  - [x] Filter by status
- [x] Check-in confirmation flow
  - [x] Success page with green checkmark
  - [x] 3-second auto-redirect
  - [x] Error states for invalid codes
- [x] Plus-one management
  - [x] Editable +/- buttons
  - [x] Real-time plus-one tracking
- [x] Real-time capacity monitoring
- [x] Problem guest alerts
- [x] Dark mode with persistence

**Status**: Production-ready. This is the only fully functional component with complete backend integration.

---

### ⚠️ 8.0 QR Code Generation and Delivery **PARTIAL** - 50% Complete

- [x] QR scanning (part of Doorperson interface) ✅
- [ ] QR code generation ❌
  - [ ] Select QR library (qrcode.react recommended)
  - [ ] Generate unique codes for approved guests
  - [ ] Secure QR code format
- [ ] QR code delivery ❌
  - [ ] Email template with QR code
  - [ ] SMS delivery option
  - [ ] Guest QR display page
- [ ] Security measures ❌
  - [ ] Single-use QR codes
  - [ ] QR expiration
  - [ ] Anti-forgery measures

**Status**: QR scanning 100% complete. QR generation not started.

---

### ❌ 9.0 Basic Analytics Dashboard **NOT STARTED** - 0% Complete

- [x] Manager dashboard has placeholder UI ✅
- [ ] Real-time check-in tracking ❌
- [ ] Signup vs check-in conversion ❌
- [ ] DJ performance comparison ❌
- [ ] Event metrics ❌
  - [ ] Total signups
  - [ ] Check-ins
  - [ ] Capacity utilization
- [ ] Analytics API endpoints ❌

---

## Current Sprint: Backend Integration 🔧

### 🚨 CRITICAL PRIORITY: Connect Frontend to Backend

**The Challenge**:
- 90% of frontend UI is complete
- ~15% of backend integration is complete
- Event creation form doesn't save to database
- Manager dashboard shows mock data
- DJ dashboard shows mock data
- No API endpoints for CRUD operations

### Immediate Next Steps (Priority Order)

1. **Event Management API** ❗ URGENT
   - Create `/api/events` endpoints (POST/GET/PATCH/DELETE)
   - Connect create event form to Supabase
   - Fetch real events for dashboard calendar
   - Implement real-time updates

2. **User Management Backend** ❗ URGENT
   - Connect invitation modal to send emails
   - Create user CRUD API endpoints
   - Fix RLS policies (infinite recursion issue)

3. **Guest Signup Backend**
   - Build guest registration API
   - Connect signup form to database
   - Implement approval workflow backend

4. **DJ Dashboard Backend**
   - Connect dashboard to load real events
   - Build guest list API endpoints
   - Implement approval/deny actions
   - Real-time capacity calculations

5. **QR Code Generation**
   - Select and integrate QR generation library
   - Generate codes for approved guests
   - Email/SMS delivery system

### Testing Checklist

- [ ] Manager can create events and see them persist after page refresh
- [ ] Manager can edit and delete events
- [ ] Manager dashboard calendar shows real events from database
- [ ] Manager can send invitations and emails are delivered
- [ ] Invited users can accept and create accounts
- [ ] DJ dashboard loads real assigned events
- [ ] DJ can approve/deny guests and changes persist
- [ ] RLS policies work without infinite recursion
- [ ] All role-based access controls function correctly
- [ ] Error handling works for network failures
- [ ] Loading states display during async operations
- [ ] Toast notifications show success/error messages

---

## Phase 2: Enhanced Platform (2-3 months) 🎯

**Status**: ❌ **NOT STARTED** - 0% Complete

**Goal**: Scale to multi-DJ events and add advanced guest management

### 10.0 Advanced Guest Management

**Guest Tier System**
- [ ] Track guest conversion rates and attendance history
- [ ] Implement micro-promoter tier for frequent attendees
- [ ] Add monthly invite allowances for micro-promoters
- [ ] Create VIP status system with special privileges
- [ ] Build promoter reward system

**Enhanced Guest Features**
- [ ] Returning guest auto-fill
- [ ] Guest preference tracking
- [ ] Plus-one contact collection (optional)
- [ ] Instagram integration for photos

**Security & Blocklist**
- [ ] Guest blocklist management for managers
- [ ] Blocklist checking during signup process
- [ ] Incident reporting system

---

### 11.0 Multi-DJ Event Support

**DJ Management**
- [ ] Multiple DJs per event
- [ ] Individual DJ capacity limits
- [ ] DJ invitation and acceptance workflow
- [ ] DJ media uploads (photos, mixes, tracks)
- [ ] DJ performance analytics

**Advanced Scheduling**
- [ ] Recurring event templates
- [ ] DJ availability tracking
- [ ] Automated DJ invitations
- [ ] Schedule conflicts detection

---

### 12.0 Enhanced Analytics

**Detailed Reporting**
- [ ] Guest conversion funnels
- [ ] DJ performance detailed metrics
- [ ] Demographic insights (postal codes)
- [ ] Event profitability analysis
- [ ] Attendance prediction models

**Contact Management**
- [ ] Guest contact export
- [ ] Marketing campaign integration
- [ ] Segmented guest communications

---

### 13.0 Notification System

**Email and SMS**
- [ ] Comprehensive notification system
- [ ] DJ invitation and reminder emails
- [ ] Guest signup and approval notifications
- [ ] Manager alert system

**Advanced Reminders**
- [ ] DJ approval reminders (every 5 signups, hourly on event day)
- [ ] Manager capacity alerts
- [ ] Event creation reminders (2 weeks out)
- [ ] Under-promotion detection alerts

---

## Phase 3: Business Intelligence Platform (3-6 months) 📊

**Status**: ❌ **NOT STARTED** - 0% Complete

**Goal**: Transform into comprehensive nightclub CRM with predictive analytics

### 14.0 Lightspeed POS Integration

**Revenue Tracking**
- [ ] Integrate with Lightspeed POS API
- [ ] Track individual guest bar spending
- [ ] Calculate guest lifetime value
- [ ] Revenue attribution to DJs/promoters

**Smart Pricing**
- [ ] Dynamic cover charge suggestions
- [ ] Promoter commission calculations
- [ ] VIP package optimization

---

### 15.0 Predictive Analytics and AI

**Predictive Analytics**
- [ ] Attendance prediction models
- [ ] Revenue forecasting
- [ ] Optimal pricing recommendations
- [ ] Guest behavior prediction

**Business Intelligence**
- [ ] Executive dashboards
- [ ] Trend analysis and insights
- [ ] Competitive benchmarking
- [ ] ROI calculation for events/DJs

---

### 16.0 Multi-Venue Platform

**Venue Management**
- [ ] Multi-venue support
- [ ] Cross-venue guest tracking
- [ ] Venue performance comparison
- [ ] Centralized analytics

**Staff Management**
- [ ] Staff guest list system
- [ ] Role-based permissions expansion
- [ ] Performance tracking
- [ ] Training modules

---

### 17.0 Advanced Features

**Mobile Apps**
- [ ] Native iOS/Android apps
- [ ] Push notifications
- [ ] Offline mode support
- [ ] Advanced camera scanning

**Integration Ecosystem**
- [ ] Social media integrations
- [ ] Email marketing platforms
- [ ] Accounting system connections
- [ ] Third-party analytics tools

---

## Technical Foundation ✅ COMPLETED

### Database Schema (Deployed)

All 11 tables deployed to Supabase:
- **venues**: Venue information and settings
- **events**: Event details, dates, capacity limits
- **profiles**: User profiles with role-based access
- **invitations**: User invitation system
- **guests**: Guest profiles with tier system
- **guest_lists**: DJ-specific lists with capacity management
- **guest_list_entries**: Individual guest registrations with QR codes
- **check_ins**: Check-in records
- **notifications**: Notification queue
- **blocklists**: Problem guest tracking
- **settings**: Venue settings

### Technology Stack

- **Frontend**: Next.js 15.3.3 (App Router), React 18, TypeScript, Tailwind CSS
- **Backend**: Supabase (PostgreSQL, Auth, Realtime, Storage)
- **Database**: Supabase PostgreSQL (Prisma installed but not used)
- **Authentication**: Supabase Auth with Row Level Security (RLS)
- **QR Code**: qr-scanner v1.4.2 (scanning), qrcode.react (generation - not implemented)
- **Deployment**: Vercel (frontend), Supabase Canada region (backend)
- **Compliance**: Canadian data residency for Quebec privacy laws

---

## Known Issues 🐛

1. **RLS Policies**: Infinite recursion bug in Supabase RLS policies
2. **Email System**: Invitation emails don't send (UI exists, no email service integrated)
3. **Session Management**: Incomplete token-based authentication
4. **API Endpoints**: Most backend endpoints missing (events, guests, guest-lists)
5. **Frontend-Backend Gap**: 90% UI vs 15% backend integration

---

## Success Metrics

- **Phase 1 MVP**: Functional guest list system for weekend events at Datcha (Currently ~30%)
- **Phase 2**: 50+ DJs using platform, 1000+ guests per event
- **Phase 3**: Multi-venue platform generating actionable business insights

---

## File Structure

```
src/app/
├── api/                    # API routes
│   ├── events/            # ❌ Not built yet
│   ├── guests/            # ❌ Not built yet
│   ├── guest-lists/       # ❌ Not built yet
│   └── invitations/       # ✅ Exists (emails don't send)
├── manager/               # ✅ UI complete (not connected)
├── dj/                    # ✅ UI complete (not connected)
├── doorperson/            # ✅ 100% complete
├── staff/                 # ⚠️ Partial
├── promoter/              # ⚠️ Partial
└── guest/                 # ⚠️ Auth page only

supabase/migrations/       # ✅ All migrations deployed
prisma/schema.prisma       # ✅ Schema file (for reference, not used)
```

---

**End of Master PRD**
