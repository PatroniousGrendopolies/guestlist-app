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

### 1.0 Event Creation Interface (Managers)
- [ ] 1.1 Create new events with date, venue, capacity
  - [ ] 1.1.1 Event creation form with date picker
  - [ ] 1.1.2 Venue selection (default: Datcha)
  - [ ] 1.1.3 Maximum capacity setting (default: 300)
  - [ ] 1.1.4 Event name and description fields
- [ ] 1.2 Set deadlines for guest list submissions
  - [ ] 1.2.1 Guest list deadline date/time picker
  - [ ] 1.2.2 DJ approval deadline setting
  - [ ] 1.2.3 Automatic deadline validation
- [ ] 1.3 Manage event status (active/cancelled/completed)
  - [ ] 1.3.1 Event status dropdown with proper transitions
  - [ ] 1.3.2 Status change notifications to DJs
  - [ ] 1.3.3 Event archiving for completed events
- [ ] 1.4 Event overview dashboard
  - [ ] 1.4.1 Upcoming events list view
  - [ ] 1.4.2 Event capacity and signup tracking
  - [ ] 1.4.3 DJ assignment status per event

### 2.0 Guest Signup Flow (Mobile-first)
- [ ] 2.1 Public guest registration form
  - [ ] 2.1.1 Mobile-responsive guest signup form
  - [ ] 2.1.2 First name, last name, email fields (required)
  - [ ] 2.1.3 Phone number field (optional)
  - [ ] 2.1.4 Form validation and error handling
- [ ] 2.2 Plus-one selection (up to 4)
  - [ ] 2.2.1 Plus-one quantity selector (0-4)
  - [ ] 2.2.2 Dynamic form adjustment based on plus-one count
  - [ ] 2.2.3 Plus-one capacity validation against event limits
- [ ] 2.3 Contact information collection
  - [ ] 2.3.1 Instagram handle field (optional)
  - [ ] 2.3.2 Postal code field for demographics
  - [ ] 2.3.3 Guest tier detection for returning guests
- [ ] 2.4 Signup confirmation page
  - [ ] 2.4.1 Confirmation page with next steps
  - [ ] 2.4.2 Expected approval timeline messaging
  - [ ] 2.4.3 Contact information for questions

### 3.0 DJ Dashboard & Workflow
- [ ] 3.1 DJ invitation system for events
  - [ ] 3.1.1 Manager can invite DJs to events
  - [ ] 3.1.2 DJ invitation email templates
  - [ ] 3.1.3 DJ acceptance/decline workflow
  - [ ] 3.1.4 DJ invitation status tracking
- [ ] 3.2 Guest list creation and management
  - [ ] 3.2.1 DJ can create named guest lists per event
  - [ ] 3.2.2 Guest list settings (capacity, plus-one limits)
  - [ ] 3.2.3 Guest list sharing with public URLs
- [ ] 3.3 Capacity tracking and limits (75 default)
  - [ ] 3.3.1 Real-time capacity counting
  - [ ] 3.3.2 Capacity warnings and limits enforcement
  - [ ] 3.3.3 Plus-one impact on capacity calculations
- [ ] 3.4 Guest approval/denial workflow
  - [ ] 3.4.1 Pending guest list with approve/deny buttons
  - [ ] 3.4.2 Batch approval for multiple guests
  - [ ] 3.4.3 Approval reason/notes (optional)
  - [ ] 3.4.4 Automatic notification emails to guests
- [ ] 3.5 QR code generation for approved guests
  - [ ] 3.5.1 Unique QR code generation per approved guest
  - [ ] 3.5.2 QR code email delivery system
  - [ ] 3.5.3 QR code security and single-use validation

### 4.0 Door Management System
- [ ] 4.1 QR code scanning for check-ins
  - [ ] 4.1.1 Mobile camera QR code scanner
  - [ ] 4.1.2 QR code validation and guest lookup
  - [ ] 4.1.3 Check-in confirmation and logging
  - [ ] 4.1.4 Plus-one check-in tracking
- [ ] 4.2 Guest status verification
  - [ ] 4.2.1 Guest approval status checking
  - [ ] 4.2.2 Guest blocklist verification
  - [ ] 4.2.3 Event capacity limit enforcement
- [ ] 4.3 Plus-one validation
  - [ ] 4.3.1 Plus-one count verification against registration
  - [ ] 4.3.2 Plus-one name collection (optional)
  - [ ] 4.3.3 Plus-one check-in tracking
- [ ] 4.4 Real-time capacity monitoring
  - [ ] 4.4.1 Live capacity dashboard for doormen
  - [ ] 4.4.2 Capacity alerts and warnings
  - [ ] 4.4.3 Event capacity reporting
- [ ] 4.5 Manual guest lookup backup
  - [ ] 4.5.1 Guest name/email search functionality
  - [ ] 4.5.2 Manual check-in for technical issues
  - [ ] 4.5.3 Guest list browsing interface

### 5.0 Basic Analytics
- [ ] 5.1 Manager dashboard with event metrics
  - [ ] 5.1.1 Event signup vs capacity metrics
  - [ ] 5.1.2 Check-in rates and attendance tracking
  - [ ] 5.1.3 DJ performance comparison
- [ ] 5.2 Real-time check-in progress
  - [ ] 5.2.1 Live check-in dashboard during events
  - [ ] 5.2.2 Real-time capacity utilization
  - [ ] 5.2.3 DJ-specific check-in rates
- [ ] 5.3 Basic conversion reporting
  - [ ] 5.3.1 Signup to approval conversion rates
  - [ ] 5.3.2 Approval to attendance conversion rates
  - [ ] 5.3.3 Historical event performance trends
- [ ] 5.4 DJ performance comparison
  - [ ] 5.4.1 DJ conversion rate rankings
  - [ ] 5.4.2 DJ capacity utilization metrics
  - [ ] 5.4.3 DJ consistency tracking

### Authentication ✅ COMPLETED
- [x] Role-based access (Manager, DJ, Guest)
- [x] Supabase authentication integration
- [x] RLS policies for data security

---

## Phase 2: Enhanced Platform (2-3 months) 🎯
**Goal**: Scale to multi-DJ events and add advanced guest management

### 6.0 Advanced Guest Management
**6.1 Guest Tier System**
- [ ] 6.1.1 Track guest conversion rates and attendance history
- [ ] 6.1.2 Implement micro-promoter tier for frequent attendees  
- [ ] 6.1.3 Add monthly invite allowances for micro-promoters
- [ ] 6.1.4 Create VIP status system with special privileges
- [ ] 6.1.5 Build promoter reward system

**6.2 Enhanced Guest Features**
- [ ] 6.2.1 Returning guest auto-fill with data lookup
- [ ] 6.2.2 Guest preference tracking (music, events)
- [ ] 6.2.3 Plus ones contact collection (optional)
- [ ] 6.2.4 Instagram integration for event photos

**6.3 Security & Blocklist**
- [ ] 6.3.1 Guest blocklist management for managers
- [ ] 6.3.2 Blocklist checking during signup process
- [ ] 6.3.3 Incident reporting and tracking system
- [ ] 6.3.4 Security alert notifications

### 7.0 Multi-DJ Event Support
**7.1 DJ Management**
- [ ] 7.1.1 Multiple DJs per event
- [ ] 7.1.2 Individual DJ capacity limits
- [ ] 7.1.3 DJ invitation and acceptance workflow
- [ ] 7.1.4 DJ media uploads (photos, mixes, tracks)
- [ ] 7.1.5 DJ performance analytics and rankings

**7.2 Advanced Scheduling**
- [ ] 7.2.1 Recurring event templates
- [ ] 7.2.2 DJ availability tracking
- [ ] 7.2.3 Automated DJ invitations
- [ ] 7.2.4 Schedule conflicts detection

### 8.0 Enhanced Analytics
**8.1 Detailed Reporting**
- [ ] 8.1.1 Guest conversion funnels
- [ ] 8.1.2 DJ performance detailed metrics
- [ ] 8.1.3 Demographic insights (postal codes)
- [ ] 8.1.4 Event profitability analysis
- [ ] 8.1.5 Attendance prediction models

**8.2 Contact Management**
- [ ] 8.2.1 Guest contact export functionality
- [ ] 8.2.2 Marketing campaign integration
- [ ] 8.2.3 Segmented guest communications

### 9.0 Security, Privacy, and Compliance
- [ ] 9.1 Implement end-to-end encryption for sensitive data
- [ ] 9.2 Create data minimization strategy (collect only essential information)
- [ ] 9.3 Develop consent management system for guests
- [ ] 9.4 Implement right-to-be-forgotten functionality
- [ ] 9.5 Add data residency controls for Quebec compliance
- [ ] 9.6 Create privacy policy and terms of service
- [ ] 9.7 Implement secure data access controls
- [ ] 9.8 Develop audit logging for compliance monitoring

---

## Phase 3: Business Intelligence Platform (3-6 months) 📊
**Goal**: Transform into comprehensive nightclub CRM with predictive analytics

### 10.0 Lightspeed POS Integration
**10.1 Revenue Tracking**
- [ ] 10.1.1 Integrate with Lightspeed POS API
- [ ] 10.1.2 Track individual guest bar spending
- [ ] 10.1.3 Calculate guest lifetime value
- [ ] 10.1.4 Revenue attribution to DJs/promoters

**10.2 Smart Pricing**
- [ ] 10.2.1 Dynamic cover charge suggestions
- [ ] 10.2.2 Promoter commission calculations
- [ ] 10.2.3 VIP package optimization

### 11.0 Advanced Analytics & AI
**11.1 Predictive Analytics**
- [ ] 11.1.1 Attendance prediction models
- [ ] 11.1.2 Revenue forecasting
- [ ] 11.1.3 Optimal pricing recommendations
- [ ] 11.1.4 Guest behavior prediction

**11.2 Business Intelligence**
- [ ] 11.2.1 Executive dashboards
- [ ] 11.2.2 Trend analysis and insights
- [ ] 11.2.3 Competitive benchmarking
- [ ] 11.2.4 ROI calculation for events/DJs

### 12.0 Multi-Venue Platform
**12.1 Venue Management**
- [ ] 12.1.1 Multi-venue support
- [ ] 12.1.2 Cross-venue guest tracking
- [ ] 12.1.3 Venue performance comparison
- [ ] 12.1.4 Centralized analytics

**12.2 Staff Management**
- [ ] 12.2.1 Staff guest list system
- [ ] 12.2.2 Role-based permissions expansion
- [ ] 12.2.3 Performance tracking
- [ ] 12.2.4 Training modules

### 13.0 Advanced Features
**13.1 Mobile Apps**
- [ ] 13.1.1 Native iOS/Android apps
- [ ] 13.1.2 Push notifications
- [ ] 13.1.3 Offline mode support
- [ ] 13.1.4 Advanced camera scanning

**13.2 Integration Ecosystem**
- [ ] 13.2.1 Social media integrations
- [ ] 13.2.2 Email marketing platforms
- [ ] 13.2.3 Accounting system connections
- [ ] 13.2.4 Third-party analytics tools

### 14.0 Offline Support and Error Handling
- [ ] 14.1 Create local caching system for guest lists
- [ ] 14.2 Implement offline-first architecture for doorman interface
- [ ] 14.3 Develop data synchronization on reconnection
- [ ] 14.4 Add comprehensive error handling for edge cases
- [ ] 14.5 Implement graceful degradation for poor connectivity
- [ ] 14.6 Create user feedback for connection status
- [ ] 14.7 Add retry mechanisms for failed operations
- [ ] 14.8 Develop conflict resolution for offline edits

---

## Current Sprint: Phase 1 MVP

### Immediate Next Steps
1. **1.1 Event Creation Interface** - Build manager dashboard for creating events
2. **2.1 Guest Signup Form** - Mobile-first public registration
3. **3.1 DJ Dashboard** - Event invitation and guest list management
4. **4.1 QR System** - Generation and scanning infrastructure

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