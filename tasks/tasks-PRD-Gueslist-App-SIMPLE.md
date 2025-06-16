# Nightclub Guest List Management System - PRD

## Project Overview

A comprehensive guest list management platform for nightclubs, starting with Datcha Nightclub in Montreal. The system manages event creation, DJ invitations, guest registrations, capacity limits, QR code check-ins, and provides analytics for optimization.

## Development Phases

This project follows a strategic 3-phase approach to deliver value quickly while building toward a comprehensive nightclub CRM platform.

---

## Phase 1: MVP Core Features (4-6 weeks) 🚀
**Goal**: Deploy a working guest list management system for immediate use

### Database Foundation ✅ COMPLETED
- [x] Core database schema with 5 essential tables deployed
- [x] Authentication and RLS policies configured  
- [x] Supabase infrastructure set up

### Core Features
**Event Creation Interface** (Managers)
- [ ] Create new events with date, venue, capacity
- [ ] Set deadlines for guest list submissions
- [ ] Manage event status (active/cancelled/completed)
- [ ] Event overview dashboard

**Guest Signup Flow** (Mobile-first)
- [ ] Public guest registration form
- [ ] Plus-one selection (up to 4)
- [ ] Contact information collection
- [ ] Instagram handle integration
- [ ] Signup confirmation page

**DJ Dashboard & Workflow**
- [ ] DJ invitation system for events
- [ ] Guest list creation and management
- [ ] Capacity tracking and limits (75 default)
- [ ] Guest approval/denial workflow
- [ ] QR code generation for approved guests

**Door Management System**
- [ ] QR code scanning for check-ins
- [ ] Guest status verification
- [ ] Plus-one validation
- [ ] Real-time capacity monitoring
- [ ] Manual guest lookup backup

**Basic Analytics**
- [ ] Manager dashboard with event metrics
- [ ] Real-time check-in progress
- [ ] Basic conversion reporting
- [ ] DJ performance comparison

### Authentication ✅ COMPLETED
- [x] Role-based access (Manager, DJ, Guest)
- [x] Supabase authentication integration
- [x] RLS policies for data security

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

## Current Sprint: Phase 1 MVP

### Immediate Next Steps
1. **Event Creation Interface** - Build manager dashboard for creating events
2. **Guest Signup Form** - Mobile-first public registration
3. **DJ Dashboard** - Event invitation and guest list management
4. **QR System** - Generation and scanning infrastructure

### Success Metrics
- **Phase 1**: Functional guest list system for weekend events
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