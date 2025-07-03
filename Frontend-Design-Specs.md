# Guest List App - Frontend Design Specifications

## Overview
This document contains the complete frontend design specifications for the Datcha nightclub guest list management app. All user flows, screens, and interactions have been methodically planned for implementation in Magic Patterns or similar design tools.

## User Types Overview

1. **Guest** - Public users signing up for events (Mobile-first)
2. **Doorperson** - Door staff checking in guests (PWA/iOS app)
3. **Staff** - Bartenders/employees with limited lists (Mobile-first)
4. **DJ** - Performers with event-specific lists (Mobile-first)
5. **Promoter** - Marketing staff with larger capacity (Mobile-first)
6. **Manager** - Venue management with full control (Desktop + Mobile)
7. **VIP** - Special guests with permanent access

---

## 1. GUEST FLOW

### Entry Points
- Social media link (Instagram, etc.)
- Text/DM invitation link
- Google Auth for expedited sign-in

### User Flows

#### Flow A: New Guest
1. Click invitation link → Landing/Auth screen
2. Select "Create a profile"
3. Input data screen (name, email, phone, Instagram handle)
4. Click "Confirm" → Email sent
5. Check email → Click confirmation link
6. Event selection/confirmation screen (with +N selection)
7. Submit → Waiting for approval screen
8. Receive approval text → Click link
9. View QR code ticket screen

#### Flow B: Returning Guest
1. Click invitation link → Landing/Auth screen
2. Sign in (Google Auth or email/phone)
3. Pre-filled data review screen
4. Event selection/confirmation screen (with +N selection)
5. Submit → Waiting for approval screen
6. Receive approval text → Click link
7. View QR code ticket screen

### Screen Inventory

#### Screen 1: Landing/Auth Screen
- Logo/Event branding
- "Continue with Google" button (prominent)
- "Sign in with Email" button
- "Create New Profile" button
- "Forgot Password?" link

#### Screen 2A: Email Sign In
- Email field
- Password field
- "Sign In" button
- "Forgot Password?" link
- "Back" button

#### Screen 2B: Forgot Password
- Email field
- "Send Reset Link" button
- Success/error messages

#### Screen 3: Create Profile
- Name field (required)
- Email field (required)
- Phone field (required)
- Instagram handle field (optional)
- Privacy policy checkbox (required)
- "Confirm" button

#### Screen 4: Email Confirmation Sent
- "Check your email" message
- Resend link option
- What to expect instructions

#### Screen 5: Event Selection
- List of upcoming events (up to 1 month)
  - Event name
  - Date/time
  - DJ/performer info
- Guest count selector (0 to +4, default max)
- "Submit to Guest List" button

#### Screen 6: Submission Confirmation
- "You've been submitted to the guest list"
- "You'll receive a text when approved"
- Event details summary

#### Screen 7: QR Code Ticket
- Event name and date
- Guest name + "and X guests"
- Large QR code
- "Modify Guest Count" button
- Status indicator (Active/Checked In)

#### Screen 8: Modify Guest Count
- Current count display
- New count selector
- "Update" button
- Error state: "Guest list full"

#### Screen 9: Denial Notification
- Polite message: "Unfortunately, the guest list for [event] is at capacity. We hope to see you at a future event!"
- "View Other Events" button

### Design Notes
- Mobile-first responsive design
- Email confirmation skipped for Google Auth users
- QR codes accessible via link in confirmation text
- Post-check-in shows "Checked In" status
- Instagram handle optional
- Email + password for returning non-Google users

---

## 2. DOORPERSON FLOW

### Entry Points
- Direct URL or bookmark on club device (tablet/phone)
- PIN auth for quick shift changes
- Progressive Web App (Phase 1), Native iOS (Phase 2)

### User Flows

#### Flow A: QR Code Scanning (Primary)
1. Login with PIN
2. Land on scan screen (camera active)
3. Guest shows QR → Automatic scan
4. See result screen (2-3 seconds) → Auto-return to scan

#### Flow B: Manual Search (Backup)
1. From scan screen → Tap "Search Guests"
2. Search/browse list
3. Tap guest name → See details (including +N and who invited)
4. Tap "Check In" → Confirmation → Back to list

### Screen Inventory

#### Screen 1: Login
- Venue logo
- PIN pad (large buttons)
- "OPEN LIST SCANNER" button

#### Screen 2: QR Scan (Main Screen)
- Camera view in rounded rectangle (85% of screen)
- Scan indicator overlay
- "Search Guests" button (bottom, always visible)
- "Checked in: 47/120" (top corner)

#### Screen 3A: Scan Success
- LARGE green checkmark
- Guest name (big text)
- "+3 guests" indicator
- "Added by: DJ Marcus"
- "Return to Scanner" button
- Auto-dismiss in 3 seconds

#### Screen 3B: Scan Denied
- LARGE red X
- Reason: "Not on list" / "Already checked in" / "Denied entry"
- "Back to Scan" button

#### Screen 4: Manual Search
- Search bar (top)
- Guest list (simple):
  - Name
  - Check mark if checked in
  - +N count

#### Screen 5: Guest Details
- Guest name (large)
- Status (Approved/Denied)
- Plus ones count
- Added by
- "Check In" button (huge, green)
- +/- buttons to modify guest count
- "Back" button

#### Screen 6: Manual QR Entry
- Text field for QR code
- Number pad
- "Submit" button

#### Screen 7: VIP Plus Count (Special Flow)
- "How many guests with [VIP Name]?"
- Number selector (0 to max set by manager)
- "Confirm" button

### Design Considerations
- **Night Mode Optimized**:
  - Dark theme with high contrast
  - Minimal white to avoid eye strain
  - Success = Bright green
  - Denied = Bright red
  - Text = High contrast white/yellow
- **Touch Targets**: Minimum 44x44pt
- **Speed**: Camera always ready, instant recognition
- Single shared door account
- Re-auth only on app open
- No override permissions
- Can modify +N counts
- Handles multiple simultaneous doormen

---

## 3. STAFF FLOW

### Entry Points
- Direct URL for staff
- Email invitation from manager
- Mobile-first interface

### User Flows

#### Flow A: Regular Night Guest List
1. Login → Dashboard
2. See tonight's event
3. Share invite link (expires after event)
4. Monitor signups (auto-approved)
5. If at capacity → Request more spots

### Screen Inventory

#### Screen 1: Staff Dashboard
- Welcome "Hey [Name]!"
- **Tonight's Event**:
  - Event name with DJ lineup
  - "Guest List: 3/5 spots used"
  - "Share Invite" button (large)
- **Your Stats**:
  - Friends who visited this month
  - Most recent attendees

#### Screen 2: Share Invite
- Tonight's event details
- Two prominent buttons:
  - "Copy Link" (copies to clipboard)
  - "Share" (triggers native share sheet)
- Invite expires: "Valid until [tonight 11:59 PM]"

#### Screen 3: My Guest List
- Date/Event header
- Capacity bar: "3/5 spots used"
- **If full**: "Request More Spots" button
- Simple list:
  - Guest names who signed up
  - +N count
  - Check-in status

#### Screen 4: Request Additional Capacity
- "Need more than 5 spots?"
- Number picker: 6-10
- Optional reason field
- "Send Request" button

### Key Features
- Default capacity: 5 guests
- No approval needed (link = approved)
- Event-specific expiring links
- Native share functionality
- Can request capacity increases
- Sees DJ lineups for events

---

## 4. DJ FLOW

### Entry Points
- Direct URL (TBD)
- Email invitation from manager with event details
- Mobile-first but desktop capable

### User Flows

#### Flow A: First Time Setup
1. Click invitation link (shows event date & all DJs)
2. Create account (name, email, phone, Instagram - required)
3. Verify email
4. Land on dashboard

#### Flow B: Event-Based List Generation
1. Login → Dashboard
2. See "My Upcoming Events"
3. Select specific event
4. Options:
   - "Generate/Share Link" → Get shareable link
   - "Invite Past Guests" → Batch invite screen
   - "Manage Current Guests" → Approval screen
5. Monitor signups with live updates

#### Flow C: Review & Approve Guests
1. Select event from dashboard
2. View pending guests
3. Review each guest
4. Approve/Deny individually or "Approve All"
5. Can modify +N counts

### Screen Inventory

#### Screen 1: DJ Dashboard
- Welcome "Hey [DJ Name]!"
- **Upcoming Events** section:
  - Event cards showing:
    - Event name & date
    - Other DJs playing that night
    - "23/50 spots filled"
    - "Share Link" button
    - "Manage Guests" button
    - "Invite Past Guests" button
- **Past Events** section (below):
  - Similar cards with attendance stats
  - "View Guest List" button
- Quick stats:
  - Last event conversion rate
  - Total guests brought lifetime

#### Screen 2: Event Guest Management
- Event header (name, date, capacity)
- Capacity bar: "23/50 spots filled"
- Tabs: "Pending (5)" | "Approved (18)" | "Attended"
- **"Approve All Pending" button** (prominent)
- Guest list with:
  - Name
  - +N count (editable with +/- buttons)
  - Quick approve/deny buttons

#### Screen 3: Share Event Link
- Event name & date at top
- Large link with copy button
- Share options: SMS, WhatsApp, IG Story
- QR code for posting
- "Active signups: 23"

#### Screen 4: Past Guests / Batch Invite
- Event selector dropdown
- Filter buttons: "All" | "Attended" | "Did Not Attend"
- Guest list with:
  - Checkbox
  - Guest name
  - Attendance status icon
  - Last event date
- Action buttons:
  - "Select All"
  - "Select All Attended"
  - "Clear Selection"
- Bottom bar: "Invite Selected (12)" button

#### Screen 5: Batch Invite Composer
- Editable text field with default:
  "[DJ Name] is playing at Datcha on [Date] and invited you to the event. Click here to join the guest list: [link]"
- Send via options:
  - ☑️ SMS
  - ☑️ Email
  (Both can be selected)
- Character count for SMS
- "Preview" button
- "Send Invites" button

#### Screen 6: DJ Analytics
- Event-by-event breakdown:
  - Signups vs attendance
  - Total impact metrics
- Best performing events
- Shows no-shows for future invitation decisions

### Key Features
- Default capacity: 75 guests per event
- Event-specific links (expire after event)
- Can access links 2 months in advance
- Can approve during event
- SMS notifications for pending guests
- Batch invite system for building following
- "Approve All" for efficiency

---

## 5. PROMOTER FLOW

### Entry Points
- Direct URL for promoters
- Email invitation from manager
- Mobile-first interface

### User Flows

#### Flow A: Event-Based Promotion
1. Login → Dashboard
2. Select upcoming event
3. Get event-specific link
4. Share link
5. Review/approve signups
6. Monitor attendance

### Screen Inventory

#### Screen 1: Promoter Dashboard
- Welcome "Hey [Promoter Name]!"
- **Tonight's Event** (if applicable):
  - Event name with DJ lineup
  - "Guest List: 8/20 spots used"
  - "Share Invite" button
  - "Review Guests" button
- **Upcoming Events**:
  - Next 3-4 events
  - Guest count for each
- **Quick Stats**:
  - This month: 67 attended
  - All-time guests: 487

#### Screen 2: Event Selection & Sharing
- Event details (date, DJs)
- "Guest List: 8/20 spots"
- Two buttons:
  - "Copy Event Link"
  - "Share" (native)
- Link expires after event

#### Screen 3: Guest Review/Approval
- Event header
- Capacity bar: "8/20 spots used"
- Tabs: "Pending (3)" | "Approved (5)" | "Attended"
- **"Approve All" button**
- Guest list with:
  - Name
  - +N count
  - Approve/deny buttons

#### Screen 4: Capacity Request
- Current limit: 20
- Request more spots
- Reason field
- Send to manager

#### Screen 5: Guest History & Batch Invite
- "My All-Time Guests"
- Filters: Attended/No-show
- Select guests
- Choose event
- Send batch invites

### Key Differences from Staff
- Higher capacity (20 vs 5)
- Guest history tools
- Batch invite features
- Otherwise similar event-based flow

---

## 6. VIP FLOW

### VIP Creation (Manager Side)
1. Manager adds VIP in dashboard
2. System generates permanent QR code
3. VIP receives welcome text with retrieval options

### VIP Guest Experience
- Permanent QR code (never expires)
- Bypasses DJ/promoter approval
- Not counted against DJ capacity
- Doorperson must enter +N count on scan

### QR Code Retrieval Methods (Phase 1)
1. **SMS Link** - Save from welcome text
2. **Email** - Star/flag welcome email
3. **Simple Portal** - vip.datcha.com with phone + PIN
4. **Screenshot** - Save QR to phone photos

### Phase 2
- Apple Wallet integration
- Google Wallet support

### VIP Status Removal
- Text notification: "Your VIP status at Datcha has been updated. Thank you for your past visits!"
- QR code deactivated immediately

---

## 7. MANAGER FLOW

### Entry Points
- Single URL for all users (e.g., datcha.guestlistapp.com)
- Desktop-first with mobile support
- Individual accounts with role-based permissions
- Standard login (no daily 2FA)

### Permission Levels

#### Owner (Full Access)
- ✓ All features below
- ✓ Venue settings (exclusive access)
- ✓ Create/manage all account types
- ✓ Full analytics access
- ✓ All administrative functions

#### Manager
- ✓ Create/edit events
- ✓ Invite DJs/staff/promoters
- ✓ Set capacity limits
- ✓ Manage ban list
- ✓ View full analytics
- ✓ Create assistant manager accounts
- ✓ Export capabilities
- ✗ Venue settings

#### Assistant Manager
- ✓ View events (create if enabled per account)
- ✓ View/approve/deny guest lists
- ✓ Handle capacity requests
- ✓ View basic analytics
- ✓ Limited guest database access
- ✗ Ban administration
- ✗ User account creation
- ✗ Venue settings

### User Flows

#### Flow A: Event Creation (Primary)
1. Login → Dashboard
2. Click "Create Event"
3. Select date and add DJs
4. Set capacity (shared or individual)
5. Send invitations
6. Monitor acceptance

#### Flow B: Daily Oversight
1. View dashboard alerts
2. Check approval ratios
3. Click event to view full guest list
4. Handle capacity requests
5. Monitor DJ responsiveness

#### Flow C: User Management
1. Navigate to Users section
2. Select user type tab
3. Invite new or review existing
4. Set permissions/capacities
5. View performance metrics

#### Flow D: Guest Database Management
1. Access all-time guest database
2. Search and filter guests
3. View attendance history
4. Add notes or photos
5. Ban if necessary

### Screen Inventory

#### Screen 1: Manager Dashboard
- **Alert Section** (top):
  - "DJ Marcus hasn't accepted invite for Saturday"
  - "Tonight's list only 65% approved" (3pm warning)
  - "2 capacity increase requests pending"
  - Missing event warnings
  
- **Week at a Glance**:
  - Event cards for next 7 days:
    - Date & formatted DJ names (comma + ampersand)
    - Approval ratio pie chart
    - "52/75 approved"
    - Click to view full guest list

- **Quick Actions**:
  - "Create Event" button
  - "Invite User" button

#### Screen 2: Event Creation
- Date picker (allows any date, highlights non-operating days)
- **DJ Selection**:
  - Dropdown: "Select existing DJ" with search
  - Shows list of recurring DJs
  - "Add New DJ" button → opens modal:
    - DJ/Stage name (required)
    - Given name (optional)
    - Email OR "Copy Invite Link"
    - Phone (optional)
  - Selected DJs list:
    - Drag handles for reordering
    - Remove button (X)
    - Individual capacity field (if applicable)
  
- **Capacity Settings**:
  - Total event capacity (default 75)
  - Distribution options:
    - "Share capacity equally"
    - "Set individual limits"
  
- "Create Event" button

#### Screen 3: Event Detail View
- Event header (date, total capacity, status)
- **Approval Overview**:
  - Large donut chart
  - Percentage approved
  - Alert if <65% after 3pm
  
- **Guest Lists by Source** (tabs):
  - DJ 1 (23/30)
  - DJ 2 (18/25) 
  - Staff (8/15)
  - Promoters (5/10)
  - Direct adds (3)
  
- **Within each tab**:
  - Search bar
  - Guest list with:
    - Name
    - +N count
    - Status
    - Check-in status
  - "Approve All Pending" button
  
- **Actions**:
  - "Export Full List"
  - "Add Guest Directly"

#### Screen 4: All-Time Guest Database
- **Search Bar**: Name/Phone/Email/Instagram
- **Advanced Filters**:
  - Attendance: Frequent/Recent/Inactive
  - Date range
  - Added by (DJ/Staff/Promoter)
  - Status (Active/Banned)
  
- **Guest Table**:
  - Name
  - Contact info
  - Last attended
  - Total visits
  - Added by
  
- **Guest Profile (on click)**:
  - Full contact details
  - Instagram handle
  - Photo upload area
  - Attendance history timeline
  - Who has added them
  - Notes section
  - Actions dropdown (includes ban)

#### Screen 5: User Management Hub
- **Navigation Tabs**: DJs | Staff | Promoters | VIPs | Managers | Banned
- "+ Invite New [User Type]" button
- **User Cards** showing:
  - Name & role
  - Key metrics
  - Current settings
  - "View Details" button

#### Screen 6: DJ Management
- **Sort Options**:
  - Alphabetical
  - Date added to system
  - Conversion rate
  - Average list size
  
- **DJ List** with quick stats
- **DJ Detail Modal** (on click):
  - Contact info
  - Event history table:
    - Date
    - Guest list size
    - Conversion rate
  - All-time stats:
    - Total events
    - Average conversion
    - Total guests brought
  - Settings:
    - Default capacity
    - Active status
  - Actions:
    - "Send Reminder"
    - "Suspend"
    - "Remove"

#### Screen 7: Staff/Promoter Management
- Similar layout to DJ management
- **Detail Modal** shows:
  - All-time invites sent
  - Conversion rate
  - Tenure (member since)
  - Current nightly allowance
  - Recent activity (last 5 events)
  - Modify allowance setting
  - Suspend/Remove options

#### Screen 8: VIP Management
- Search bar for VIPs
- **VIP Cards** with photo/name
- **VIP Detail Modal**:
  - Photo upload/display
  - Full name
  - Contact information
  - Instagram handle
  - VIP since date
  - Statistics:
    - Total visits
    - Average +N
    - Favorite DJs
  - Notes field (multi-line)
  - "Revoke VIP Status" button

#### Screen 9: Manager Account Management
- List of all manager accounts
- Role indicators (Owner/Manager/Assistant)
- **For Assistant Managers**:
  - Toggle: "Allow event creation"
  - Other permission settings
- "Add New Manager" button
- Deactivate/Remove options

#### Screen 10: Ban Management
- **Add Ban** section:
  - Input fields:
    - Instagram handle
    - Name
    - Phone
    - Email
  - Duration dropdown:
    - 2 weeks
    - 1 month
    - 2/3/6 months
    - 1 year
    - Permanent
  - Reason/Notes field (required)
  - "Add to Ban List" button
  
- **Active Bans** list:
  - Search/filter options
  - Shows:
    - Banned person's info
    - Ban reason
    - Admin who banned
    - Start date
    - Expiry date
  - "Remove Ban" option

#### Screen 11: Capacity Requests
- Pending requests queue
- Each request shows:
  - Requester name & role
  - Event date
  - Current limit
  - Requested amount
  - Reason (if provided)
  - Time of request
- "Approve"/"Deny" buttons
- Auto-notification on decision

#### Screen 12: Venue Settings (Owner Only)
- **Venue Information**:
  - Name
  - Address
  - Phone
  - Email
  - Website
  - Social media links
  
- **Operating Schedule**:
  - Days of operation checkboxes
  - Default hours per day
  - Special closure dates
  
- **Default Settings**:
  - Event capacity: 75
  - Staff list size: 5
  - Promoter list size: 20
  - DJ list size: 75
  - Max plus ones: 4
  - Approval warning time: 3pm
  - Approval warning threshold: 65%
  
- "Save Settings" button

#### Screen 13: Analytics Dashboard
- Date range selector
- **Overview Metrics**:
  - Total guests this period
  - Average conversion rate
  - Top performing DJs
  - Busiest nights
  
- **Detailed Charts**:
  - Conversion by day of week
  - DJ performance comparison
  - Staff/Promoter effectiveness
  - Guest retention trends
  
- Export options
- (Phase 2: Lightspeed POS integration)

### Design Considerations

**Responsive Design**:
- Desktop-optimized for complex tasks
- Mobile-friendly for on-the-go checks
- Tablet support for event nights

**Real-time Updates**:
- Live approval ratios
- Instant capacity request alerts
- Auto-refresh on guest lists

**Smart Defaults**:
- Pre-populated operating days
- Remember last capacity settings
- Auto-format DJ name lists

**Permission-Based UI**:
- Hide features based on role
- Venue settings only for owners
- Adapt navigation to permissions

---

## Technical Implementation Notes

### Native Share Functionality
```javascript
// Web Share API for mobile sharing
navigator.share({
  title: 'Join me at Datcha',
  text: 'Custom invitation text',
  url: 'https://invite-link'
})
```

### Progressive Web App Features
- Camera access for QR scanning
- Offline capability for doorperson app
- Home screen installation
- Push notifications (Phase 2)

### Real-time Updates
- WebSocket connections for live guest counts
- Instant approval notifications
- Synchronized multi-device access

### Security Considerations
- PIN-based auth for doorperson
- Time-limited invite links
- QR code validation
- Rate limiting on signups

---

## Phase 1 vs Phase 2 Features

### Phase 1 (Launch)
- Core user flows
- Web-based implementation
- SMS/Email notifications
- Basic analytics

### Phase 2 (Post-Launch)
- Native iOS app for doorperson
- Apple/Google Wallet for VIPs
- Push notifications
- Advanced analytics
- Commission tracking
- Marketing tools

---

## DESIGN SYSTEM SPECIFICATIONS

### Core Design Principles
The Nightlist app follows a minimal, clean design philosophy with strict black and white aesthetics for maximum clarity and professional appearance.

### Color Palette
- **Primary Black**: `#000000` - Used for primary buttons, active states, text
- **White**: `#FFFFFF` - Used for backgrounds, button text on dark backgrounds
- **Gray Scale**:
  - `#F9FAFB` (gray-50) - Light background for secondary cards
  - `#F3F4F6` (gray-100) - Secondary button backgrounds
  - `#E5E7EB` (gray-200) - Borders, inactive elements
  - `#9CA3AF` (gray-400) - Muted text, placeholders
  - `#6B7280` (gray-500) - Secondary text
  - `#374151` (gray-700) - Dark text
- **No Red Text**: All error states and warnings use gray text only
- **Success Green**: Reserved only for check-in confirmations and success states

### Typography
- **Font Family**: System font stack (SF Pro on iOS, Roboto on Android, system defaults)
- **Font Weights**: 
  - Regular (400) - ALL text content (no bold/medium/semibold anywhere)
  - Light (300) - Large headlines only when specified
- **Font Sizes** (Tailwind classes):
  - `text-xs` (12px) - Small labels, metadata
  - `text-sm` (14px) - Button text, secondary content, dates
  - `text-base` (16px) - Body text
  - `text-lg` (18px) - Event names, subheadings
  - `text-xl` (20px) - Section headers
  - `text-2xl` (24px) - Page titles
  - `text-3xl` (30px) - Dashboard welcomes
- **No Bold Text Rule**: Never use `font-medium`, `font-semibold`, or `font-bold` classes

### Button Specifications
- **Corner Radius**: `rounded-full` (fully pill-shaped) for ALL buttons
- **Padding**: `py-3 px-6` for standard buttons, `py-2 px-4` for small buttons
- **Primary Buttons**: Black background (`bg-black`), white text, hover to gray-900
- **Secondary Buttons**: Gray background (`bg-gray-100`), black text, hover to gray-200
- **Outline Buttons**: White background, thin black border (`border`), black text
- **Font Size**: `text-sm` for most buttons to maintain clean proportions
- **Font Weight**: Regular (400) - NO bold text on buttons
- **Disabled State**: `bg-gray-200 text-gray-400 cursor-not-allowed`

### Card & Container Specifications
- **Corner Radius**: `rounded-xl` for cards and major containers (NOT rounded-full)
- **Borders**: 
  - Standard border width: `border` (1px) - never `border-2`
  - Border color: `border-gray-200`
  - **Exception**: No borders on gray background cards (e.g., past events)
- **Padding**: `p-6` for cards, `p-4` for smaller containers
- **Shadows**: Minimal or none - rely on borders for definition
- **Gray Cards**: Use `bg-gray-50` with NO borders, hover to `bg-gray-100`

### Layout & Spacing
- **Container Max Width**: `max-w-4xl mx-auto` for main content areas
- **Section Spacing**: `mb-6` between major sections, `mb-4` between related items
- **Grid Gaps**: `gap-3` for lists, `gap-4` for form layouts
- **Page Padding**: `p-6` for main content areas

### Form Elements
- **Input Fields**: 
  - Corner radius: `rounded-xl`
  - Padding: `px-4 py-2`
  - Border: `border border-gray-200`
  - Focus: `focus:border-black` (no ring/shadow)
  - Background: `bg-gray-100` for readonly fields
- **Text Areas**: Same as inputs but with `resize-none`
- **Character Limits**: Display as gray text only, no red warnings

### Interactive Elements
- **Hover States**: Subtle color shifts only (gray-100 to gray-200, black to gray-900)
- **Focus States**: Black border, no outline rings
- **Active States**: No special styling beyond hover
- **Loading States**: Subtle opacity changes, black spinners
- **Transitions**: `transition-colors` for all interactive elements

### Capacity Meters & Progress Bars
- **Height**: `h-4` (thin bars)
- **Corner Radius**: `rounded-full`
- **Background**: `bg-gray-200`
- **Fill**: `bg-black`
- **Numbers**: 
  - Size: `text-[10px]` (very small)
  - Position: Absolute positioned within bars
  - Colors: White on black fill, black on gray background

### Navigation & Headers
- **No Black Backgrounds**: All headers use white/transparent backgrounds (including search pages)
- **Back Buttons**: Gray text (`text-gray-600`) with hover to black
- **Breadcrumbs**: Simple text links, no special styling
- **Page Titles**: `text-2xl font-light` typically

### Filter Tabs & Controls
- **Active State**: Dark gray background (`bg-gray-600`) with white text
- **Inactive State**: Light gray background (`bg-gray-100`) with black text
- **Corner Radius**: `rounded-lg` (not full for tabs)
- **Padding**: `px-3 py-1`
- **Font Size**: `text-sm` (regular weight, no bold)

### Status Indicators
- **Approved**: Black background, white text
- **Pending**: Gray background (`bg-gray-200`), dark text
- **Denied**: White background, black text, black border
- **Success/Check-in**: Green background only for actual success states
- **All status badges**: `rounded-lg` corners

### Mobile Responsiveness
- **Touch Targets**: Minimum 44x44pt for all interactive elements
- **Text Scaling**: Maintain hierarchy across screen sizes
- **Button Sizing**: Full width on mobile when appropriate
- **Spacing**: Reduce padding on smaller screens but maintain proportions

### Animation & Transitions
- **Duration**: `transition-colors` (fast color changes)
- **Easing**: Default CSS transitions (no custom timing)
- **Loading**: Simple spinners with `animate-spin`
- **Auto-dismiss**: 3-second timeouts for success states

### Accessibility Compliance
- **Contrast**: All text meets WCAG AA standards
- **Focus Indicators**: Clear black borders on all focusable elements
- **Touch Targets**: 44x44pt minimum
- **Color Independence**: No information conveyed by color alone

### Brand Consistency
- **Logo Usage**: Minimal, clean presentation
- **Voice**: Professional, concise, friendly
- **No Decoration**: Avoid gradients, shadows, or ornamental elements
- **Consistent Spacing**: Use Tailwind's spacing scale consistently

### Quality Assurance Checklist
- [ ] All buttons use `rounded-full`
- [ ] All cards use `rounded-xl` 
- [ ] No `border-2` used anywhere (only `border`)
- [ ] Gray cards have no borders
- [ ] No red text for errors/warnings
- [ ] Capacity meter numbers are `text-[10px]`
- [ ] Headers have no black backgrounds
- [ ] Button text is `text-sm`
- [ ] NO bold text anywhere (`font-medium`, `font-semibold`, `font-bold` forbidden)
- [ ] All interactive elements have proper hover states
- [ ] Instagram handles are blue and clickable
- [ ] Event dates use `text-sm`

---

## Next Steps
1. Complete Manager flow documentation
2. Create wireframes in Magic Patterns
3. Design component library
4. Prototype key interactions
5. User testing with staff