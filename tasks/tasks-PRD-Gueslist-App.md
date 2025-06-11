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

## Tasks

- [x] 1.0 Setup Project Infrastructure
  - [x] 1.1 Initialize Next.js project with TypeScript
  - [x] 1.2 Configure Prisma ORM with PostgreSQL database
  - [x] 1.3 Set up authentication with Supabase
  - [x] 1.4 Configure testing environment with Jest and React Testing Library
  - [x] 1.5 Set up ESLint and Prettier for code quality
  - [x] 1.6 Create CI/CD pipeline for automated testing and deployment
  - [x] 1.7 Configure database hosting in Canada for Quebec privacy compliance
  - [x] 1.8 Set up project structure and folder organization

- [ ] 2.0 Implement Authentication and User Management
  - [ ] 2.1 Create user model with role-based access control (doorman, manager, promoter, DJ)
    - [x] Define UserRole enum and UserProfile interface in TypeScript
    - [x] Create `profiles` table in Supabase with `user_role` ENUM and necessary columns
    - [x] Implement Supabase trigger to create basic profile on new user signup
  - [ ] 2.2 Implement secure login functionality for staff and promoters
  - [ ] 2.3 Develop role-based authorization middleware
  - [ ] 2.4 Create user invitation system for managers to invite DJs and promoters
  - [ ] 2.5 Implement password reset functionality
  - [ ] 2.6 Add session management and token-based authentication
  - [ ] 2.7 Create API endpoints for user management
  - [ ] 2.8 Implement user profile management

- [ ] 3.0 Develop Guest List Management Core Functionality
  - [ ] 3.1 Design and implement database schema for guests, events, and guest lists
  - [ ] 3.2 Create API endpoints for guest list creation and management
  - [ ] 3.3 Implement guest signup functionality with minimal required information
  - [ ] 3.4 Develop guest approval/denial system for managers and promoters
  - [ ] 3.5 Add support for +1s, +2+3s, etc. in guest registration
  - [ ] 3.6 Implement guest list capping functionality for managers
  - [ ] 3.7 Create duplicate prevention system with fuzzy matching
  - [ ] 3.8 Develop guest blocklisting functionality
  - [ ] 3.9 Implement data persistence for returning guests

- [ ] 4.0 Create Role-Specific User Interfaces
  - [ ] 4.1 Develop doorman interface with QR scanning and manual search
  - [ ] 4.2 Create manager dashboard for guest list review and approval
  - [ ] 4.3 Build promoter/DJ interface for link generation and guest list monitoring
  - [ ] 4.4 Design and implement guest signup page (mobile-first)
  - [ ] 4.5 Create responsive layouts for all user interfaces
  - [ ] 4.6 Implement high-contrast, touch-friendly design for doormen
  - [ ] 4.7 Add accessibility features (large tap targets, readable fonts, error states)
  - [ ] 4.8 Implement animations for successful actions (approvals, check-ins)

- [ ] 5.0 Implement QR Code Generation and Scanning
  - [ ] 5.1 Research and select QR code library for generation and scanning
  - [ ] 5.2 Implement secure, unique QR code generation for guests
  - [ ] 5.3 Develop QR code scanning functionality using device camera
  - [ ] 5.4 Create QR code delivery system via email and SMS
  - [ ] 5.5 Implement anti-forgery measures for QR codes
  - [ ] 5.6 Add QR code expiration and single-use functionality
  - [ ] 5.7 Develop clear visual feedback for scan results (accept/reject)
  - [ ] 5.8 Create manual override for QR scanning issues

- [ ] 6.0 Build Analytics Dashboard
  - [ ] 6.1 Design analytics data model for tracking metrics
  - [ ] 6.2 Implement real-time attendance tracking
  - [ ] 6.3 Create list conversion reporting (signups vs. check-ins)
  - [ ] 6.4 Develop promoter/DJ effectiveness metrics
  - [ ] 6.5 Add historical trends analysis
  - [ ] 6.6 Implement data visualization components
  - [ ] 6.7 Create export functionality for analytics data
  - [ ] 6.8 Add filtering and date range selection for analytics

- [ ] 7.0 Ensure Security, Privacy, and Compliance
  - [ ] 7.1 Implement end-to-end encryption for sensitive data
  - [ ] 7.2 Create data minimization strategy (collect only essential information)
  - [ ] 7.3 Develop consent management system for guests
  - [ ] 7.4 Implement right-to-be-forgotten functionality
  - [ ] 7.5 Add data residency controls for Quebec compliance
  - [ ] 7.6 Create privacy policy and terms of service
  - [ ] 7.7 Implement secure data access controls
  - [ ] 7.8 Develop audit logging for compliance monitoring

- [ ] 8.0 Implement Offline Support and Error Handling
  - [ ] 8.1 Create local caching system for guest lists
  - [ ] 8.2 Implement offline-first architecture for doorman interface
  - [ ] 8.3 Develop data synchronization on reconnection
  - [ ] 8.4 Add comprehensive error handling for edge cases
  - [ ] 8.5 Implement graceful degradation for poor connectivity
  - [ ] 8.6 Create user feedback for connection status
  - [ ] 8.7 Add retry mechanisms for failed operations
  - [ ] 8.8 Develop conflict resolution for offline edits
