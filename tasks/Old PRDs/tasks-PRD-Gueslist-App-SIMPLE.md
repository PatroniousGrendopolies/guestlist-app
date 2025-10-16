# Nightclub Guest List Management System - PRD

## Project Overview

A comprehensive guest list management platform for nightclubs, starting with Datcha Nightclub in Montreal. The system manages event creation, DJ invitations, guest registrations, capacity limits, QR code check-ins, and provides analytics for optimization.

## Development Phases

This project follows a strategic 3-phase approach to deliver value quickly while building toward a comprehensive nightclub CRM platform.

---

## 📊 Overall Progress

**Phase 1 MVP**: ~25% Complete (4-6 weeks estimated)

| Component | Frontend UI | Backend Integration | Status |
|-----------|-------------|---------------------|---------|
| Infrastructure | ✅ 100% | ✅ 100% | Complete |
| Database Schema | ✅ 100% | ✅ 100% | Complete |
| Manager Dashboard | ✅ 95% | ❌ 10% | UI Complete |
| Doorperson Interface | ✅ 100% | ✅ 100% | **Complete** |
| Guest Auth | ✅ 100% | ⚠️ 50% | UI Complete |
| Event Creation | ✅ 100% | ❌ 0% | UI Only |
| Guest Signup | ❌ 0% | ❌ 0% | Not Started |
| DJ Dashboard | ❌ 0% | ❌ 0% | Not Started |
| QR Generation | ❌ 0% | ❌ 0% | Not Started |
| Analytics | ❌ 0% | ❌ 0% | Not Started |

**🚨 Critical Gap**: Beautiful frontend exists but **not connected to Supabase backend**

---

## Phase 1: MVP Core Features (4-6 weeks) 🚀

**Goal**: Deploy a working guest list management system for immediate use

### Database Foundation ✅ COMPLETED

- [x] Core database schema with 5 essential tables deployed
- [x] Authentication and RLS policies configured
- [x] Supabase infrastructure set up

### Core Features

**Event Creation Interface (Managers)** 🎨 UI Complete - ❌ Not Connected

- [x] Create new events with date, venue, capacity 🎨 (Form exists, doesn't save)
- [ ] Set deadlines for guest list submissions ❌
- [ ] Manage event status (active/cancelled/completed) ❌
- [x] Event overview dashboard 🎨 (Calendar view, shows mock data)

**Guest Signup Flow (Mobile-first)** ❌ Not Started

- [ ] Public guest registration form ❌
- [ ] Plus-one selection (up to 4) ❌
- [ ] Contact information collection ❌
- [ ] Instagram handle integration ❌
- [ ] Signup confirmation page ❌
- 🎨 UI Complete: Guest auth page exists
- ❌ Backend: No registration API, no database connection

**DJ Dashboard & Workflow** ❌ Not Started

- [ ] DJ invitation system for events ❌
- [ ] Guest list creation and management ❌
- [ ] Capacity tracking and limits (75 default) ❌
- [ ] Guest approval/denial workflow ❌
- [ ] QR code generation for approved guests ❌
- ❌ UI: Dashboard not built
- ❌ Backend: No API endpoints

**Door Management System** ✅ **100% COMPLETE**

- [x] QR code scanning for check-ins ✅ (Camera scanning with qr-scanner lib)
- [x] Guest status verification ✅
- [x] Plus-one validation ✅ (Editable +/-)
- [x] Real-time capacity monitoring ✅
- [x] Manual guest lookup backup ✅ (Voice search, filters)
- **Additional**: PIN login, dark mode, problem guest alerts, mobile-optimized

**Basic Analytics** ❌ Not Started

- [ ] Manager dashboard with event metrics ❌
- [ ] Real-time check-in progress ❌
- [ ] Basic conversion reporting ❌
- [ ] DJ performance comparison ❌
- 🎨 UI: Placeholder metrics in manager dashboard
- ❌ Backend: No analytics data collection

### Authentication ⚠️ PARTIAL - Basic Structure Complete

- [x] Role-based access (Manager, DJ, Guest) ✅
- [x] Supabase authentication integration ✅
- [x] RLS policies for data security ✅ (Need fixes)
- [x] Login pages for all roles ✅
- [x] Guest auth page ✅
- [ ] Email invitations not sending ❌
- [ ] Session management incomplete ❌

---

## Phase 2: Enhanced Platform (2-3 months) 🎯

**Goal**: Scale to multi-DJ events and add advanced guest management

### Advanced Guest Management

**Guest Tier System**

- [ ] Track guest conversion rates and attendance history
- [ ] Implement micro-promoter tier for frequent attendees
- [ ] Add monthly invite allowances for micro-promoters
- [ ] Create VIP status system with special privileges
- [ ] Build promoter reward system

**Enhanced Guest Features**

- [ ] Returning guest auto-fill
- [ ] Guest preference tracking
- [ ] Plus ones contact collection (optional)
- [ ] Instagram integration for photos

**Security & Blocklist**

- [ ] Guest blocklist management for managers
- [ ] Blocklist checking during signup process
- [ ] Incident reporting system

### Multi-DJ Event Support

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

### Enhanced Analytics

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

## Phase 3: Business Intelligence Platform (3-6 months) 📊

**Goal**: Transform into comprehensive nightclub CRM with predictive analytics

### Lightspeed POS Integration

**Revenue Tracking**

- [ ] Integrate with Lightspeed POS API
- [ ] Track individual guest bar spending
- [ ] Calculate guest lifetime value
- [ ] Revenue attribution to DJs/promoters

**Smart Pricing**

- [ ] Dynamic cover charge suggestions
- [ ] Promoter commission calculations
- [ ] VIP package optimization

### Advanced Analytics & AI

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

### Multi-Venue Platform

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

### Advanced Features

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

## Current Sprint: Backend Integration 🔧

### 🚨 CRITICAL PRIORITY: Connect Frontend to Backend

**The Challenge**: We have beautiful UI but no backend integration
- 84% of frontend UI is complete
- ~15% of backend integration is complete
- Event creation form doesn't save to database
- Manager dashboard shows mock data
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

4. **DJ Dashboard** (Build UI + Backend)
   - Create interface (not started)
   - Connect to events and guest lists
   - Implement approval actions

### Success Metrics

- **Phase 1**: Functional guest list system for weekend events (Currently ~25%)
- **Phase 2**: 50+ DJs using platform, 1000+ guests per event
- **Phase 3**: Multi-venue platform generating actionable business insights

---

## Technical Foundation ✅ COMPLETED

### Database Schema (Deployed)

- **venues**: Venue information and settings
- **events**: Event details, dates, capacity limits
- **guests**: Guest profiles with tier system
- **guest_lists**: DJ-specific lists with capacity management
- **guest_list_entries**: Individual guest registrations with QR codes

### Technology Stack

- **Frontend**: Next.js 14 with TypeScript, Tailwind CSS
- **Backend**: Supabase (PostgreSQL, Auth, RLS)
- **Authentication**: Supabase Auth with RLS policies
- **Deployment**: Vercel with Canadian data residency
