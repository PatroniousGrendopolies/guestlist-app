# Guestlist App - Complete Repository Export

This document contains the complete source code and structure of the Guestlist App repository.

**Export Date:** $(date)
**Repository:** guestlist-app

---

## Table of Contents

1. [Project Structure](#project-structure)
2. [Configuration Files](#configuration-files)
3. [Source Code](#source-code)
4. [Documentation](#documentation)

---

## Project Structure

```
```
./fixes/invalid-credentials-after-registration.md
./test-dashboard-fix.js
./deploy-schema.md
./apply-migration.js
./__mocks__/fileMock.js
./__mocks__/styleMock.js
./PROGRESS_UPDATE.md
./tasks/tasks-PRD-Gueslist-App-SIMPLE.md
./tasks/tasks-PRD-Gueslist-App-OLD.md
./tasks/PRD-COMPLETE.md
./tasks/tasks-PRD-Gueslist-App.md
./.DS_Store
./.env.local
./netlify.toml
./vercel.json
./Frontend-Design-Specs.md
./test-supabase-access.js
./jest.setup.js
./test-db.js
./postcss.config.mjs
./MIGRATION_INSTRUCTIONS.md
./tsconfig.tsbuildinfo
./deploy-event-fields.js
./jest.config.js
./fix-rls-policies.sql
./debug-event-creation.js
./prisma/schema.prisma
./repo-export.md
./next-env.d.ts
./.prettierignore
./supabase/migrations/20250616_add_event_deadline_fields.sql
./supabase/migrations/20250615191953_fix_rls_policies.sql
./supabase/migrations/20250616005319_comprehensive_guestlist_schema_fixed.sql
./supabase/migrations/20250624_phase1_roles_and_auth.sql
./supabase/migrations/20250624_fix_profiles_role.sql
./supabase/migrations/20250616005319_comprehensive_guestlist_schema_minimal.sql
./supabase/migrations/simple_schema.sql
./supabase/migrations/20250616005319_comprehensive_guestlist_schema.sql
./supabase/add_invited_by_field.sql
./supabase/fix_guest_policies.sql
./supabase/create_guests_table.sql
./supabase/.temp/postgres-version
./supabase/.temp/project-ref
./supabase/.temp/rest-version
./supabase/.temp/gotrue-version
./supabase/.temp/pooler-url
./supabase/.temp/cli-latest
./supabase/.gitignore
./supabase/create_guest_list_entries.sql
./supabase/config.toml
./FRONTEND_PROGRESS.md
./fix-rls.js
./README.md
./jun 22 gitingest
./auth-implementation-roadmap.md
./temp-disable-rls.js
./public/file.svg
./public/vercel.svg
./public/next.svg
./public/globe.svg
./public/window.svg
./.gitignore
./package-lock.json
./package.json
./dev.log
./simple-fix.sql
./deploy-schema-chunked.js
./.netlify/state.json
./.netlify/netlify.toml
./.netlify/functions-internal/___netlify-server-handler/.env.local
./.netlify/functions-internal/___netlify-server-handler/server.js
./.netlify/functions-internal/___netlify-server-handler/run-config.json
./.netlify/functions-internal/___netlify-server-handler/package.json
./.netlify/functions-internal/___netlify-server-handler/___netlify-server-handler.mjs
./.netlify/functions-internal/___netlify-server-handler/.netlify/package.json
./.netlify/functions-internal/___netlify-server-handler/___netlify-server-handler.json
./.netlify/plugins/package-lock.json
./.netlify/plugins/package.json
./.netlify/deploy/v1/blobs/deploy/L2F1dGgvY29uZmlybQ
./.netlify/deploy/v1/blobs/deploy/L2Rhc2hib2FyZA
./.netlify/deploy/v1/blobs/deploy/L2Zhdmljb24uaWNv
./.netlify/deploy/v1/blobs/deploy/L3Rlc3QtcXI
./.netlify/deploy/v1/blobs/deploy/LzQwNA
./.netlify/deploy/v1/blobs/deploy/L2F1dGgvcmVnaXN0ZXI
./.netlify/deploy/v1/blobs/deploy/L2Rvb3JwZXJzb24vc2VhcmNo
./.netlify/deploy/v1/blobs/deploy/L2F1dGgvZXJyb3I
./.netlify/deploy/v1/blobs/deploy/L2F1dGgvdXBkYXRlLXBhc3N3b3Jk
./.netlify/deploy/v1/blobs/deploy/L2Rvb3JwZXJzb24vY2hlY2tpbg
./.netlify/deploy/v1/blobs/deploy/NTAwLmh0bWw
./.netlify/deploy/v1/blobs/deploy/L2Rhc2hib2FyZC9tYW5hZ2UtaW52aXRhdGlvbnM
./.netlify/deploy/v1/blobs/deploy/L2Rvb3JwZXJzb24vc2Nhbm5lcg
./.netlify/deploy/v1/blobs/deploy/L2d1ZXN0L2F1dGg
./.netlify/deploy/v1/blobs/deploy/L3Rlc3QtZGI
./.netlify/deploy/v1/blobs/deploy/L2Rvb3JwZXJzb24vbG9naW4
./.netlify/deploy/v1/blobs/deploy/L2luZGV4
./.netlify/deploy/v1/blobs/deploy/L2F1dGgvZm9yZ290LXBhc3N3b3Jk
./.netlify/deploy/v1/blobs/deploy/L2F1dGgvbG9naW4
./.netlify/deploy/v1/blobs/deploy/L2Rhc2hib2FyZC9ldmVudHMvY3JlYXRl
./.netlify/deploy/v1/blobs/deploy/L2d1ZXN0L2Rhc2hib2FyZA
./.netlify/deploy/v1/blobs/deploy/L3VuYXV0aG9yaXplZA
```

---

## Configuration Files


## File: `package.json`

```json
{
  "name": "guestlist-app",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev -H 0.0.0.0",
    "build": "next build",
    "start": "next start",
    "lint": "eslint ./src --ext .js,.jsx,.ts,.tsx",
    "lint:fix": "eslint ./src --ext .js,.jsx,.ts,.tsx --fix",
    "format": "prettier --write .",
    "format:check": "prettier --check .",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage"
  },
  "dependencies": {
    "@prisma/client": "^6.9.0",
    "@supabase/ssr": "^0.6.1",
    "@supabase/supabase-js": "^2.50.0",
    "@types/bcryptjs": "^2.4.6",
    "aws-sdk-mock": "^6.2.1",
    "bcrypt-ts": "^7.1.0",
    "bcryptjs": "^3.0.2",
    "mock-aws-s3": "^4.0.2",
    "next": "15.3.3",
    "next-auth": "^5.0.0-beta.28",
    "nock": "^13.3.0",
    "qr-scanner": "^1.4.2",
    "react": "^19.0.0",
    "react-dom": "^19.0.0"
  },
  "devDependencies": {
    "@eslint/eslintrc": "^3",
    "@netlify/plugin-nextjs": "^5.11.2",
    "@tailwindcss/postcss": "^4",
    "@testing-library/jest-dom": "^6.6.3",
    "@testing-library/react": "^16.3.0",
    "@testing-library/user-event": "^14.6.1",
    "@types/jest": "^29.5.14",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "@typescript-eslint/eslint-plugin": "^8.33.1",
    "@typescript-eslint/parser": "^8.33.1",
    "eslint": "^9.28.0",
    "eslint-config-next": "^15.3.3",
    "eslint-config-prettier": "^10.1.5",
    "eslint-plugin-import": "^2.31.0",
    "eslint-plugin-jsx-a11y": "^6.10.2",
    "eslint-plugin-prettier": "^5.4.1",
    "eslint-plugin-react": "^7.37.5",
    "eslint-plugin-react-hooks": "^5.2.0",
    "identity-obj-proxy": "^3.0.0",
    "jest": "^29.7.0",
    "jest-environment-jsdom": "^30.0.0-beta.3",
    "prettier": "^3.5.3",
    "prisma": "^6.9.0",
    "tailwindcss": "^4",
    "ts-jest": "^29.3.4",
    "typescript": "^5"
  }
}

```


## File: `tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}

```


## File: `README.md`

```markdown
# Guestlist App

A streamlined mobile and web app built to handle nightclub guest list operations, featuring lightning-fast QR code check-in for doormen, seamless digital signup for guests, live analytics for managers, and efficient list distribution for promoters and DJs.

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Technology Stack

- **Frontend**: Next.js with TypeScript and Tailwind CSS
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js
- **Testing**: Jest and React Testing Library
- **Code Quality**: ESLint and Prettier
- **CI/CD**: GitHub Actions

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Database Setup

### Prerequisites

- PostgreSQL installed locally or a PostgreSQL database hosted in Canada (for Quebec privacy compliance)

### Setup Steps

1. Create a `.env` file in the root directory with the following content:

```
DATABASE_URL="postgresql://username:password@localhost:5432/guestlist?schema=public"
```

Replace `username`, `password`, and other values as needed for your PostgreSQL setup.

2. Install Prisma CLI (when Node.js version is updated to 18.18+):

```bash
npm install prisma --save-dev
```

3. Generate Prisma Client:

```bash
npx prisma generate
```

4. Run database migrations:

```bash
npx prisma migrate dev --name init
```

### Database Schema

The Prisma schema in `prisma/schema.prisma` defines the following models:

- `User`: For managers, doormen, promoters, and DJs
- `Event`: Nightclub events
- `Guest`: Guest information
- `GuestList`: Lists created by promoters/DJs
- `GuestListEntry`: Individual entries on guest lists with QR codes

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

### Edge Runtime Compatibility

This application uses Next.js middleware with Edge-safe code to ensure compatibility with Vercel's Edge Runtime. Authentication logic that requires Node.js features (like password hashing) is isolated to API routes running on Node.js runtime.

### Deployment Options

This application can be deployed to either Vercel or Netlify. Both deployment configurations are included in the repository.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Quebec Privacy Compliance

To ensure compliance with Quebec privacy laws:

1. All data is stored in Canada
2. Only essential guest information is collected
3. Consent is explicitly obtained from guests
4. Right-to-be-forgotten functionality is implemented

## CI/CD Pipeline

This project uses GitHub Actions for continuous integration and deployment.

### Continuous Integration

On every push and pull request to the main branch, the CI pipeline:

1. Runs ESLint to check code quality
2. Verifies code formatting with Prettier
3. Runs database migrations on a test database
4. Executes all tests with Jest

### Continuous Deployment

When changes are pushed to the main branch and all tests pass:

1. The application is automatically built
2. The build is deployed to the production environment

### Setup Instructions

To set up the CI/CD pipeline:

1. Create the necessary GitHub repository secrets (see `.github/workflows/README.md`)
2. Choose your preferred deployment platform (Vercel or Netlify)
3. Uncomment the relevant deployment section in the workflow file

For detailed instructions, see the [CI/CD documentation](./.github/workflows/README.md).

```

## Source Code


## File: `src/__tests__/utils/test-utils.tsx`

```typescript
import React, { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { UserRole } from '@/types/enums';
import '@testing-library/jest-dom';

// Define types for mock session
export interface MockUser {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
  role?: UserRole;
}

export interface MockSession {
  user: MockUser | null;
  expires: string;
}

// Create a custom render method that includes providers if needed
const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
  render(ui, { ...options });

// Create mock users for testing
export const mockUsers = {
  manager: {
    id: '1',
    name: 'Test Manager',
    email: 'manager@example.com',
    role: UserRole.MANAGER,
  },
  doorman: {
    id: '2',
    name: 'Test Doorman',
    email: 'doorman@example.com',
    role: UserRole.DOORPERSON,
  },
  promoter: {
    id: '3',
    name: 'Test Promoter',
    email: 'promoter@example.com',
    role: UserRole.PROMOTER,
  },
  dj: {
    id: '4',
    name: 'Test DJ',
    email: 'dj@example.com',
    role: UserRole.DJ,
  },
  guest: {
    id: '5',
    name: 'Test Guest',
    email: 'guest@example.com',
    role: UserRole.GUEST,
  },
};

// Mock next-auth session
export const mockSession = (user: MockUser | null): MockSession => ({
  user,
  expires: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
});

// Mock auth function for testing
jest.mock('@/lib/auth/auth', () => ({
  auth: jest.fn(),
}));

// Custom render for testing with auth context
export function renderWithAuth(ui: React.ReactElement, options?: RenderOptions) {
  return render(ui, options);
}

// Add a simple test to avoid the "no tests" error
describe('Test Utils', () => {
  it('should provide mock users with correct roles', () => {
    expect(mockUsers.manager.role).toBe(UserRole.MANAGER);
    expect(mockUsers.doorman.role).toBe(UserRole.DOORPERSON);
    expect(mockUsers.promoter.role).toBe(UserRole.PROMOTER);
    expect(mockUsers.dj.role).toBe(UserRole.DJ);
    expect(mockUsers.guest.role).toBe(UserRole.GUEST);
  });

  it('should render components with renderWithAuth function', () => {
    const TestComponent = () => <div>Test Component</div>;
    const { getByText } = renderWithAuth(<TestComponent />);
    expect(getByText('Test Component')).toBeInTheDocument();
  });
});

// Re-export everything from testing-library
export * from '@testing-library/react';
export { customRender as render };

```


## File: `src/app/api/invitations/route.ts`

```typescript
// src/app/api/invitations/route.ts
import { NextResponse, type NextRequest } from 'next/server';
import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { cookies } from 'next/headers'; // Import cookies from next/headers
import { UserRole } from '@/types/enums';

export async function POST(request: NextRequest) {
  const cookieStore = await cookies(); // Await cookies() as per linter feedback

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get: (name: string) => {
          return cookieStore.get(name)?.value;
        },
        set: (name: string, value: string, options: CookieOptions) => {
          cookieStore.set(name, value, options); // Align with Supabase examples
        },
        remove: (name: string, options: CookieOptions) => {
          cookieStore.set(name, '', options); // Align with Supabase examples
        },
      },
    }
  );

  // 1. Get Authenticated User
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return NextResponse.json({ error: 'Unauthorized: User not authenticated.' }, { status: 401 });
  }

  // 2. Check if User is a Manager
  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();

  if (profileError || !profile) {
    console.error('Error fetching profile for invitation creation:', profileError);
    return NextResponse.json({ error: 'Failed to verify user role.' }, { status: 500 });
  }

  // Check if user has manager role
  if (profile.role !== UserRole.MANAGER) {
    return NextResponse.json(
      { error: 'Forbidden: Only managers can send invitations.' },
      { status: 403 }
    );
  }

  // 3. Parse and Validate Request Body
  let requestBody;
  try {
    requestBody = await request.json();
  } catch {
    // Removed unused variable 'e'
    return NextResponse.json({ error: 'Invalid request body: Must be JSON.' }, { status: 400 });
  }

  const { email, roleToAssign } = requestBody;

  if (!email || typeof email !== 'string' || !/\S+@\S+\.\S+/.test(email)) {
    return NextResponse.json({ error: 'Invalid email address provided.' }, { status: 400 });
  }

  if (!roleToAssign || !Object.values(UserRole).includes(roleToAssign as UserRole)) {
    return NextResponse.json(
      { error: `Invalid role specified. Must be one of: ${Object.values(UserRole).join(', ')}` },
      { status: 400 }
    );
  }

  // 4. Create Invitation in Database
  const { data: invitation, error: insertError } = await supabase
    .from('invitations')
    .insert({
      email: email,
      role_to_assign: roleToAssign as UserRole,
      invited_by_user_id: user.id,
    })
    .select()
    .single();

  if (insertError) {
    console.error('Error creating invitation:', insertError);
    if (insertError.code === '23505') {
      return NextResponse.json(
        { error: 'Failed to create invitation. Possible duplicate or constraint violation.' },
        { status: 409 }
      );
    }
    return NextResponse.json(
      { error: 'Failed to create invitation in database.' },
      { status: 500 }
    );
  }

  // 5. Return Success Response
  // Cookies are now handled by the cookieStore, so direct NextResponse is fine.
  return NextResponse.json(
    { message: 'Invitation created successfully.', invitation },
    { status: 201 }
  );
}

```


## File: `src/app/auth/accept-invitation/AcceptInvitationForm.tsx`

```typescript
'use client';

import { useState, useTransition, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

interface AcceptInvitationFormProps {
  acceptInvitationAction: (formData: FormData) => Promise<{
    status: 'success' | 'error' | 'info' | 'warning';
    message: string;
    assigned_role?: string;
  }>;
  initialToken: string | null;
}

function AcceptInvitationForm({ acceptInvitationAction, initialToken }: AcceptInvitationFormProps) {
  const searchParamsHook = useSearchParams();
  const [token, setToken] = useState(initialToken || '');
  const [message, setMessage] = useState<string | null>(null);
  const [messageType, setMessageType] = useState<'success' | 'error' | 'info' | 'warning'>('info');
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (!initialToken) {
      const tokenFromUrl = searchParamsHook.get('token');
      if (tokenFromUrl) {
        setToken(tokenFromUrl);
      }
    }
  }, [initialToken, searchParamsHook]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage(null);
    if (!token) {
      setMessage('Invitation token is missing.');
      setMessageType('error');
      return;
    }
    startTransition(async () => {
      const formData = new FormData();
      formData.append('token', token);
      const result = await acceptInvitationAction(formData);
      setMessage(result.message);
      setMessageType(result.status);
    });
  };

  if (!token && !searchParamsHook.get('token')) {
    return (
      <p className="text-red-500 p-4 text-center">
        Invitation token is missing. Please use the link provided in your invitation.
      </p>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-xl border border-gray-200">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Accept Your Invitation</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="token" className="block text-sm font-medium text-gray-700 mb-1">
            Invitation Token
          </label>
          <input
            type="text"
            name="token"
            id="token"
            value={token}
            onChange={e => setToken(e.target.value)}
            readOnly={!!initialToken || !!searchParamsHook.get('token')}
            className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-gray-50 disabled:opacity-75"
            required
            aria-describedby="token-description"
          />
          <p id="token-description" className="mt-2 text-xs text-gray-500">
            This token should be pre-filled from your invitation link.
          </p>
        </div>
        <button
          type="submit"
          disabled={isPending || !token}
          className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-150 ease-in-out"
        >
          {isPending ? 'Accepting Invitation...' : 'Accept Invitation'}
        </button>
      </form>
      {message && (
        <div
          className={`mt-6 p-4 rounded-md text-sm font-medium border ${
            messageType === 'success'
              ? 'bg-green-50 border-green-300 text-green-700'
              : messageType === 'error'
                ? 'bg-red-50 border-red-300 text-red-700'
                : messageType === 'warning'
                  ? 'bg-yellow-50 border-yellow-300 text-yellow-700'
                  : 'bg-blue-50 border-blue-300 text-blue-700'
          }`}
          role="alert"
        >
          <p className="font-semibold">
            {messageType.charAt(0).toUpperCase() + messageType.slice(1)}
          </p>
          <p>{message}</p>
        </div>
      )}
    </div>
  );
}

export default AcceptInvitationForm;

```


## File: `src/app/auth/accept-invitation/page.tsx`

```typescript
// src/app/auth/accept-invitation/page.tsx
import { cookies } from 'next/headers';
import { createServerClient, type CookieOptions } from '@supabase/ssr';
import AcceptInvitationForm from './AcceptInvitationForm';

// Force this page to be dynamically rendered on the server at request time
export const dynamic = 'force-dynamic';

// Server Component part with relaxed typing to bypass Next.js PageProps constraint bug
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function AcceptInvitationPage(props: any) {
  const searchParams = props?.searchParams as Record<string, string | string[]> | undefined;

  // Token from URL query params, passed to the client component as initialToken
  const tokenParam = searchParams?.token;
  const initialToken = typeof tokenParam === 'string' ? tokenParam : null;

  async function acceptInvitationAction(formData: FormData): Promise<{
    status: 'success' | 'error' | 'info' | 'warning';
    message: string;
    assigned_role?: string;
  }> {
    'use server'; // Marks this as a Server Action

    const tokenToAccept = formData.get('token') as string;

    if (!tokenToAccept) {
      return { status: 'error', message: 'Invitation token is required.' };
    }

    const cookieStore = await cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get: (name: string) => cookieStore.get(name)?.value,
          set: (name: string, value: string, options: CookieOptions) => {
            cookieStore.set(name, value, options);
          },
          remove: (name: string, options: CookieOptions) => {
            cookieStore.set(name, '', options);
          },
        },
      }
    );

    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      return {
        status: 'error',
        message:
          'You must be logged in to accept an invitation. Please log in and try the link again.',
      };
    }

    const { data, error } = await supabase.rpc('accept_invitation_and_assign_role', {
      p_token: tokenToAccept,
    });

    if (error) {
      console.error('Error calling accept_invitation_and_assign_role:', error);
      return { status: 'error', message: `Database error: ${error.message}` };
    }

    if (data && typeof data === 'object' && 'status' in data && 'message' in data) {
      const result = data as {
        status: 'success' | 'error' | 'info' | 'warning';
        message: string;
        assigned_role?: string;
      };
      return result;
    }

    return {
      status: 'error',
      message: 'Unexpected response from server when accepting invitation.',
    };
  }

  return (
    <AcceptInvitationForm
      acceptInvitationAction={acceptInvitationAction}
      initialToken={initialToken}
    />
  );
}

```


## File: `src/app/auth/confirm/page.tsx`

```typescript
'use client';
// Account confirmation landing page
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';

export default function ConfirmPage() {
  const router = useRouter();
  // Use the single Supabase client instance
  const [status, setStatus] = useState<'verifying' | 'redirecting'>('verifying');

  useEffect(() => {
    async function run() {
      await supabase.auth.getSession();
      setStatus('redirecting');
      const {
        data: { session },
      } = await supabase.auth.getSession();
      router.replace(session ? '/dashboard' : '/auth/login');
    }
    run();
  }, [router]);

  return (
    <div className="flex h-screen items-center justify-center">
      <p className="text-lg text-center">
        {status === 'verifying' ? 'Confirming your account…' : 'Redirecting…'}
      </p>
    </div>
  );
}

```


## File: `src/app/auth/error/page.tsx`

```typescript
'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Suspense } from 'react';

function ErrorContent() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');

  const errorMessages: Record<string, string> = {
    default: 'An error occurred during authentication.',
    configuration: 'There is a problem with the server configuration.',
    accessdenied: 'You do not have permission to sign in.',
    verification: 'The verification link was invalid or has expired.',
    credentials: 'Invalid email or password.',
    oauthcallback: 'There was a problem with the OAuth provider.',
    sessionrequired: 'You must be signed in to access this page.',
  };

  const errorMessage = error && errorMessages[error] ? errorMessages[error] : errorMessages.default;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
        <h1 className="mb-6 text-center text-2xl font-bold text-gray-900">Authentication Error</h1>

        <div className="mb-6 rounded-md bg-red-50 p-4 text-sm text-red-700">{errorMessage}</div>

        <div className="text-center">
          <Link
            href="/auth/login"
            className="inline-block rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Return to Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function AuthErrorPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
          <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
            <h1 className="mb-6 text-center text-2xl font-bold text-gray-900">Loading...</h1>
          </div>
        </div>
      }
    >
      <ErrorContent />
    </Suspense>
  );
}

```


## File: `src/app/auth/forgot-password/page.tsx`

```typescript
// src/app/auth/forgot-password/page.tsx
'use client';

import { useState, useTransition } from 'react';
import { supabase } from '@/lib/supabase/client';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const [messageType, setMessageType] = useState<'success' | 'error'>('success');
  const [isPending, startTransition] = useTransition();

  const handleResetRequest = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage(null);

    if (!email) {
      setMessage('Please enter your email address.');
      setMessageType('error');
      return;
    }

    startTransition(async () => {
      // Use the single Supabase client instance

      // The redirect URL should point to your update password page
      const redirectTo = `${window.location.origin}/auth/update-password`;

      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo,
      });

      if (error) {
        // Display a generic message to prevent email enumeration attacks
        console.error('Password reset error:', error);
        setMessage('If an account exists for this email, a password reset link has been sent.');
        setMessageType('success');
      } else {
        setMessage('If an account exists for this email, a password reset link has been sent.');
        setMessageType('success');
        setEmail('');
      }
    });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-lg border border-gray-200">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Forgot Password</h1>
        <p className="text-center text-gray-600 mb-6">
          Enter your email address and we will send you a link to reset your password.
        </p>
        <form onSubmit={handleResetRequest} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="you@example.com"
              required
            />
          </div>
          <button
            type="submit"
            disabled={isPending}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isPending ? 'Sending...' : 'Send Reset Link'}
          </button>
        </form>
        {message && (
          <div
            className={`mt-6 p-4 rounded-md text-sm font-medium border ${
              messageType === 'success'
                ? 'bg-green-50 border-green-300 text-green-700'
                : 'bg-red-50 border-red-300 text-red-700'
            }`}
            role="alert"
          >
            {message}
          </div>
        )}
      </div>
    </div>
  );
}

```


## File: `src/app/auth/login/page.tsx`

```typescript
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';

export default function StaffLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setError('Invalid email or password');
        return;
      }

      if (data.user) {
        router.push('/dashboard');
        router.refresh();
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-6xl px-xl">
      <div className="w-full max-w-sm">
        {/* Header */}
        <div className="text-center mb-4xl">
          <h1 className="text-3xl font-light mb-lg">Staff Portal</h1>
          <p className="text-lg text-gray-600">Sign in to access the management dashboard</p>
        </div>

        {/* Login Card */}
        <div className="card">
          <div className="card-body">
            <form onSubmit={handleSubmit} className="flex flex-col gap-xl">
              {/* Error Message */}
              {error && (
                <div className="p-lg border border-gray-300 rounded-lg bg-gray-50">
                  <p className="text-sm text-gray-700">{error}</p>
                </div>
              )}

              {/* Email Field */}
              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  className="input"
                  placeholder="your@email.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                />
              </div>

              {/* Password Field */}
              <div className="form-group">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  className="input"
                  placeholder="Enter your password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                />
              </div>

              {/* Submit Button */}
              <button type="submit" disabled={isLoading} className="btn btn-primary btn-lg">
                {isLoading ? 'Signing in...' : 'Sign In'}
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Links */}
        <div className="text-center mt-3xl space-y-md">
          <p className="text-sm text-gray-500">
            Are you a guest?
            <a href="/guest/auth" className="ml-1 text-black hover:underline">
              Join the guest list
            </a>
          </p>
          <p className="text-sm text-gray-400">Contact your manager if you need access</p>
        </div>
      </div>
    </div>
  );
}

```


## File: `src/app/auth/register/page.tsx`

```typescript
'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/lib/supabase/client';

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [consent, setConsent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!consent) {
      setError('You must agree to the terms to register.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      // Use the single Supabase client instance
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name,
          },
        },
      });

      if (error) {
        setError(error.message);
      } else if (data.user) {
        setSuccessMessage(
          'Registration successful! Please check your email for a verification link.'
        );
        setTimeout(() => {
          router.push('/auth/login');
        }, 3000);
      }
    } catch (error) {
      console.error('Registration request failed:', error);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
        <h1 className="mb-6 text-center text-2xl font-bold text-gray-900">Create an Account</h1>

        {successMessage && (
          <div className="mb-4 rounded-md bg-green-50 p-4 text-sm text-green-700">
            {successMessage}
          </div>
        )}
        {error && <div className="mb-4 rounded-md bg-red-50 p-4 text-sm text-red-700">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={name}
              onChange={e => setName(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm placeholder-gray-500 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
              placeholder="John Doe"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm placeholder-gray-500 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
              placeholder="your@email.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm placeholder-gray-500 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
            />
          </div>

          <div className="flex items-center">
            <input
              id="consent"
              name="consent"
              type="checkbox"
              checked={consent}
              onChange={e => setConsent(e.target.checked)}
              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <label htmlFor="consent" className="ml-2 block text-sm text-gray-900">
              I agree to the terms and conditions.
            </label>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading || !consent}
              className="w-full rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
            >
              {isLoading ? 'Registering...' : 'Register'}
            </button>
          </div>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link href="/auth/login" className="font-medium text-indigo-600 hover:text-indigo-500">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}

```


## File: `src/app/auth/update-password/page.tsx`

```typescript
// src/app/auth/update-password/page.tsx
'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';

export default function UpdatePasswordPage() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const [messageType, setMessageType] = useState<'success' | 'error'>('success');
  const [isPending, startTransition] = useTransition();

  const handleUpdatePassword = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage(null);

    if (password !== confirmPassword) {
      setMessage('Passwords do not match.');
      setMessageType('error');
      return;
    }

    if (password.length < 6) {
      setMessage('Password must be at least 6 characters long.');
      setMessageType('error');
      return;
    }

    startTransition(async () => {
      // Use the single Supabase client instance
      // Supabase client automatically handles the session from the recovery token in the URL.
      const { error } = await supabase.auth.updateUser({ password });

      if (error) {
        setMessage(`Error: ${error.message}`);
        setMessageType('error');
      } else {
        setMessage('Your password has been updated successfully! Redirecting to login...');
        setMessageType('success');
        // Redirect to login page after a short delay to allow the user to read the message
        setTimeout(() => {
          router.push('/auth/login');
        }, 2000);
      }
    });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-lg border border-gray-200">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Update Password</h1>
        <p className="text-center text-gray-600 mb-6">Enter your new password below.</p>
        <form onSubmit={handleUpdatePassword} className="space-y-6">
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              New Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Confirm New Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <button
            type="submit"
            disabled={isPending}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isPending ? 'Updating...' : 'Update Password'}
          </button>
        </form>
        {message && (
          <div
            className={`mt-6 p-4 rounded-md text-sm font-medium border ${
              messageType === 'success'
                ? 'bg-green-50 border-green-300 text-green-700'
                : 'bg-red-50 border-red-300 text-red-700'
            }`}
            role="alert"
          >
            {message}
          </div>
        )}
      </div>
    </div>
  );
}

```


## File: `src/app/dashboard/events/[id]/page.tsx`

```typescript
'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';
import { UserRole } from '@/types/enums';
import Link from 'next/link';

interface User {
  id: string;
  email: string;
  role: UserRole;
}

interface Event {
  id: string;
  name: string;
  date: string;
  day_of_week: string;
  venue_id: string;
  status: string;
  max_total_capacity: number;
  created_at: string;
  venue?: {
    name: string;
    address: string;
  };
}

export default function EventDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const eventId = params.id as string;

  const [user, setUser] = useState<User | null>(null);
  const [event, setEvent] = useState<Event | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserAndEvent = async () => {
      try {
        // Check authentication and role
        const {
          data: { user: authUser },
        } = await supabase.auth.getUser();

        if (!authUser) {
          router.push('/auth/login');
          return;
        }

        // TEMPORARY: Force manager role for patgoire@gmail.com
        if (authUser.email === 'patgoire@gmail.com') {
          const appUser: User = {
            id: authUser.id,
            email: authUser.email,
            role: UserRole.MANAGER,
          };
          setUser(appUser);
        } else {
          // For other users, fetch from database
          const { data: profile } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', authUser.id)
            .single();

          if (!profile || profile.role !== 'MANAGER') {
            router.push('/dashboard');
            return;
          }

          const appUser: User = {
            id: authUser.id,
            email: authUser.email!,
            role: UserRole.MANAGER,
          };
          setUser(appUser);
        }

        // Fetch event details
        const { data: eventData, error: eventError } = await supabase
          .from('events')
          .select(
            `
            id,
            name,
            date,
            day_of_week,
            venue_id,
            status,
            max_total_capacity,
            created_at,
            venues:venue_id (
              name,
              address
            )
          `
          )
          .eq('id', eventId)
          .single();

        if (eventError) {
          console.error('Error fetching event:', eventError);
          router.push('/dashboard/events');
          return;
        }

        console.log('✅ Event fetched:', eventData);
        setEvent(eventData);
        setIsLoading(false);
      } catch (error) {
        console.error('Error in fetchUserAndEvent:', error);
        setIsLoading(false);
      }
    };

    fetchUserAndEvent();
  }, [router, eventId]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/auth/login');
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div>Loading...</div>
      </div>
    );
  }

  if (!user || user.role !== UserRole.MANAGER || !event) {
    return null;
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'completed':
        return 'bg-gray-100 text-gray-800';
      case 'under_promoted':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-6 sm:px-6 lg:px-8">
          <div>
            <Link
              href="/dashboard/events"
              className="text-sm text-indigo-600 hover:text-indigo-500"
            >
              ← Back to Events
            </Link>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">{event.name}</h1>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-500">{user.email}</span>
            <button
              onClick={handleSignOut}
              className="rounded-md bg-indigo-600 px-3.5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
            >
              Sign out
            </button>
          </div>
        </div>
      </header>

      <main>
        <div className="mx-auto max-w-4xl py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            {/* Event Overview */}
            <div className="bg-white shadow rounded-lg p-6 mb-6">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Event Details</h2>
                  <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Date</dt>
                      <dd className="mt-1 text-sm text-gray-900">{formatDate(event.date)}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Status</dt>
                      <dd className="mt-1">
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusColor(event.status)}`}
                        >
                          {event.status}
                        </span>
                      </dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Venue</dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        {event.venue?.name}
                        {event.venue?.address && (
                          <div className="text-xs text-gray-500">{event.venue.address}</div>
                        )}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Maximum Capacity</dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        {event.max_total_capacity} guests
                      </dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Day of Week</dt>
                      <dd className="mt-1 text-sm text-gray-900 capitalize">{event.day_of_week}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Created</dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        {new Date(event.created_at).toLocaleDateString()}
                      </dd>
                    </div>
                  </dl>
                </div>
                <div className="flex space-x-3">
                  <Link
                    href={`/dashboard/events/${event.id}/edit`}
                    className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                  >
                    Edit Event
                  </Link>
                </div>
              </div>
            </div>

            {/* Guest Lists Section (Placeholder for future) */}
            <div className="bg-white shadow rounded-lg p-6 mb-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Guest Lists</h3>
              <div className="text-center py-8">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <h4 className="mt-2 text-sm font-medium text-gray-900">No guest lists yet</h4>
                <p className="mt-1 text-sm text-gray-500">
                  Guest lists will appear here once DJs are invited and create their lists.
                </p>
              </div>
            </div>

            {/* Analytics Section (Placeholder for future) */}
            <div className="bg-white shadow rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Event Analytics</h3>
              <div className="text-center py-8">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
                <h4 className="mt-2 text-sm font-medium text-gray-900">No analytics data yet</h4>
                <p className="mt-1 text-sm text-gray-500">
                  Analytics will appear here once guests start signing up and checking in.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

```


## File: `src/app/dashboard/events/create/page.tsx`

```typescript
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';
import { UserRole } from '@/types/enums';
import Link from 'next/link';

interface User {
  id: string;
  email: string;
  role: UserRole;
}

interface DJInvitation {
  dj_name: string;
  given_name: string;
  email: string;
  phone: string;
}

interface EventFormData {
  name: string;
  date: string;
  venue_id: string;
  max_total_capacity: number;
  dj_count: number;
  dj_invitations: DJInvitation[];
}

export default function CreateEventPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [formData, setFormData] = useState<EventFormData>({
    name: '',
    date: '',
    venue_id: '',
    max_total_capacity: 75,
    dj_count: 1,
    dj_invitations: [{ dj_name: '', given_name: '', email: '', phone: '' }],
  });

  useEffect(() => {
    const fetchUserAndVenues = async () => {
      try {
        // Check authentication and role
        const {
          data: { user: authUser },
        } = await supabase.auth.getUser();

        if (!authUser) {
          router.push('/auth/login');
          return;
        }

        // TEMPORARY: Force manager role for patgoire@gmail.com
        if (authUser.email === 'patgoire@gmail.com') {
          const appUser: User = {
            id: authUser.id,
            email: authUser.email,
            role: UserRole.MANAGER,
          };
          setUser(appUser);
        } else {
          // For other users, fetch from database
          const { data: profile } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', authUser.id)
            .single();

          if (!profile || profile.role !== 'MANAGER') {
            router.push('/dashboard');
            return;
          }

          const appUser: User = {
            id: authUser.id,
            email: authUser.email!,
            role: UserRole.MANAGER,
          };
          setUser(appUser);
        }

        // Fetch venues (specifically Datcha)
        const { data: venuesData, error: venuesError } = await supabase
          .from('venues')
          .select('id, name')
          .eq('name', 'Datcha Nightclub')
          .single();

        if (venuesError) {
          console.error('Error fetching Datcha venue:', venuesError);
        } else {
          console.log('✅ Datcha venue fetched:', venuesData);
          // Automatically set Datcha as the venue
          setFormData(prev => ({ ...prev, venue_id: venuesData.id }));
        }

        setIsLoading(false);
      } catch (error) {
        console.error('Error in fetchUserAndVenues:', error);
        setIsLoading(false);
      }
    };

    fetchUserAndVenues();
  }, [router]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    if (name === 'dj_count') {
      const count = parseInt(value);
      const newInvitations = Array.from(
        { length: count },
        (_, i) =>
          formData.dj_invitations[i] || { dj_name: '', given_name: '', email: '', phone: '' }
      );
      setFormData(prev => ({
        ...prev,
        dj_count: count,
        dj_invitations: newInvitations,
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleDJInputChange = (index: number, field: keyof DJInvitation, value: string) => {
    setFormData(prev => ({
      ...prev,
      dj_invitations: prev.dj_invitations.map((dj, i) =>
        i === index ? { ...dj, [field]: value } : dj
      ),
    }));

    // Clear DJ-specific errors
    const errorKey = `dj_${index}_${field}`;
    if (errors[errorKey]) {
      setErrors(prev => ({ ...prev, [errorKey]: '' }));
    }
  };

  const getDayOfWeek = (dateString: string): string => {
    const date = new Date(dateString);
    const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    return days[date.getDay()];
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Event name is required';
    }

    if (!formData.date) {
      newErrors.date = 'Event date is required';
    } else {
      const eventDate = new Date(formData.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (eventDate < today) {
        newErrors.date = 'Event date cannot be in the past';
      }
    }

    if (formData.max_total_capacity < 1) {
      newErrors.max_total_capacity = 'Capacity must be at least 1';
    }

    // DJ validations
    if (formData.dj_count < 1 || formData.dj_count > 6) {
      newErrors.dj_count = 'Must have between 1 and 6 DJs';
    }

    // Validate each DJ invitation
    formData.dj_invitations.forEach((dj, index) => {
      if (!dj.dj_name.trim()) {
        newErrors[`dj_${index}_dj_name`] = 'DJ name is required';
      }
      if (!dj.given_name.trim()) {
        newErrors[`dj_${index}_given_name`] = 'Given name is required';
      }
      if (!dj.email.trim()) {
        newErrors[`dj_${index}_email`] = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(dj.email)) {
        newErrors[`dj_${index}_email`] = 'Valid email is required';
      }
      if (!dj.phone.trim()) {
        newErrors[`dj_${index}_phone`] = 'Phone number is required';
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Prepare event data without DJ invitations
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { dj_invitations, dj_count, ...eventBasicData } = formData;
      // TEMPORARY: Use hardcoded user ID for patgoire@gmail.com
      const userId =
        user?.email === 'patgoire@gmail.com' ? 'c55fd137-6822-45fa-8cf8-023b912afe6a' : user!.id;

      const eventData = {
        ...eventBasicData,
        day_of_week: getDayOfWeek(formData.date),
        created_by_user_id: userId,
        status: 'active', // Default status
      };

      console.log('🚀 Creating event with data:', eventData);
      console.log('🆔 User object:', user);

      // Validate user ID before attempting to create event
      if (!user || !user.id) {
        console.error('❌ No valid user ID found');
        setErrors({ submit: 'Authentication error. Please refresh and try again.' });
        return;
      }

      const { data, error } = await supabase.from('events').insert([eventData]).select().single();

      if (error) {
        console.error('❌ Error creating event:', error);
        console.error('Error details:', {
          message: error.message,
          details: error.details,
          hint: error.hint,
          code: error.code,
        });
        setErrors({ submit: `Failed to create event: ${error.message}` });
      } else {
        console.log('✅ Event created successfully:', data);

        // TODO: Handle DJ invitations here
        // For now, we'll store DJ invitation data for future implementation
        // In a real implementation, you would:
        // 1. Create DJ invitation records in the database
        // 2. Send invitation emails to each DJ
        // 3. Set up the invitation acceptance workflow

        console.log('📨 DJ invitations to be sent:', formData.dj_invitations);

        router.push('/dashboard/events');
      }
    } catch (error) {
      console.error('💥 Unexpected error:', error);
      setErrors({ submit: 'An unexpected error occurred. Please try again.' });
    }

    setIsSubmitting(false);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/auth/login');
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div>Loading...</div>
      </div>
    );
  }

  if (!user || user.role !== UserRole.MANAGER) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-6 sm:px-6 lg:px-8">
          <div>
            <Link
              href="/dashboard/events"
              className="text-sm text-indigo-600 hover:text-indigo-500"
            >
              ← Back to Events
            </Link>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Create New Event</h1>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-500">{user.email}</span>
            <button
              onClick={handleSignOut}
              className="rounded-md bg-indigo-600 px-3.5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
            >
              Sign out
            </button>
          </div>
        </div>
      </header>

      <main>
        <div className="mx-auto max-w-2xl py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <form onSubmit={handleSubmit} className="space-y-6 bg-white shadow-sm rounded-lg p-6">
              {/* Event Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-black">
                  Event Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${
                    errors.name ? 'border-red-300' : ''
                  }`}
                  placeholder="e.g., Saturday Night Party"
                />
                {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
              </div>

              {/* Event Date */}
              <div>
                <label htmlFor="date" className="block text-sm font-medium text-black">
                  Event Date *
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${
                    errors.date ? 'border-red-300' : ''
                  }`}
                />
                {errors.date && <p className="mt-1 text-sm text-red-600">{errors.date}</p>}
              </div>

              {/* Maximum Guest List Size */}
              <div>
                <label
                  htmlFor="max_total_capacity"
                  className="block text-sm font-medium text-black"
                >
                  Maximum Guest List Size *
                </label>
                <input
                  type="number"
                  id="max_total_capacity"
                  name="max_total_capacity"
                  value={formData.max_total_capacity}
                  onChange={handleInputChange}
                  min="1"
                  className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${
                    errors.max_total_capacity ? 'border-red-300' : ''
                  }`}
                />
                {errors.max_total_capacity && (
                  <p className="mt-1 text-sm text-red-600">{errors.max_total_capacity}</p>
                )}
                <p className="mt-1 text-sm text-black">Total allowed guestlist size</p>
              </div>

              {/* DJ Invitation Section */}
              <div className="border-t pt-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">DJ Invitations</h3>

                {/* Number of DJs */}
                <div className="mb-6">
                  <label htmlFor="dj_count" className="block text-sm font-medium text-black">
                    Number of DJs *
                  </label>
                  <select
                    id="dj_count"
                    name="dj_count"
                    value={formData.dj_count}
                    onChange={handleInputChange}
                    className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${
                      errors.dj_count ? 'border-red-300' : ''
                    }`}
                  >
                    {[
                      { value: 1, label: 'One' },
                      { value: 2, label: 'Two' },
                      { value: 3, label: 'Three' },
                      { value: 4, label: 'Four' },
                      { value: 5, label: 'Five' },
                      { value: 6, label: 'Six' },
                    ].map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  {errors.dj_count && (
                    <p className="mt-1 text-sm text-red-600">{errors.dj_count}</p>
                  )}
                  <p className="mt-1 text-sm text-black">
                    Select the number of DJs to invite for this event (maximum 6)
                  </p>
                </div>

                {/* DJ Details */}
                {formData.dj_invitations.map((dj, index) => (
                  <div key={index} className="mb-6 p-4 border border-gray-200 rounded-lg">
                    <h4 className="text-md font-medium text-gray-900 mb-3">DJ {index + 1}</h4>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      {/* DJ Name */}
                      <div>
                        <label
                          htmlFor={`dj_name_${index}`}
                          className="block text-sm font-medium text-black"
                        >
                          DJ Name *
                        </label>
                        <input
                          type="text"
                          id={`dj_name_${index}`}
                          value={dj.dj_name}
                          onChange={e => handleDJInputChange(index, 'dj_name', e.target.value)}
                          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${
                            errors[`dj_${index}_dj_name`] ? 'border-red-300' : ''
                          }`}
                          placeholder="e.g., DJ Awesome"
                        />
                        {errors[`dj_${index}_dj_name`] && (
                          <p className="mt-1 text-sm text-red-600">
                            {errors[`dj_${index}_dj_name`]}
                          </p>
                        )}
                      </div>

                      {/* Given Name */}
                      <div>
                        <label
                          htmlFor={`given_name_${index}`}
                          className="block text-sm font-medium text-black"
                        >
                          Given Name *
                        </label>
                        <input
                          type="text"
                          id={`given_name_${index}`}
                          value={dj.given_name}
                          onChange={e => handleDJInputChange(index, 'given_name', e.target.value)}
                          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${
                            errors[`dj_${index}_given_name`] ? 'border-red-300' : ''
                          }`}
                          placeholder="e.g., John"
                        />
                        {errors[`dj_${index}_given_name`] && (
                          <p className="mt-1 text-sm text-red-600">
                            {errors[`dj_${index}_given_name`]}
                          </p>
                        )}
                      </div>

                      {/* Email */}
                      <div>
                        <label
                          htmlFor={`email_${index}`}
                          className="block text-sm font-medium text-black"
                        >
                          Email *
                        </label>
                        <input
                          type="email"
                          id={`email_${index}`}
                          value={dj.email}
                          onChange={e => handleDJInputChange(index, 'email', e.target.value)}
                          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${
                            errors[`dj_${index}_email`] ? 'border-red-300' : ''
                          }`}
                          placeholder="dj@example.com"
                        />
                        {errors[`dj_${index}_email`] && (
                          <p className="mt-1 text-sm text-red-600">{errors[`dj_${index}_email`]}</p>
                        )}
                      </div>

                      {/* Phone */}
                      <div>
                        <label
                          htmlFor={`phone_${index}`}
                          className="block text-sm font-medium text-black"
                        >
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          id={`phone_${index}`}
                          value={dj.phone}
                          onChange={e => handleDJInputChange(index, 'phone', e.target.value)}
                          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${
                            errors[`dj_${index}_phone`] ? 'border-red-300' : ''
                          }`}
                          placeholder="(555) 123-4567"
                        />
                        {errors[`dj_${index}_phone`] && (
                          <p className="mt-1 text-sm text-red-600">{errors[`dj_${index}_phone`]}</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Submit Error */}
              {errors.submit && (
                <div className="rounded-md bg-red-50 p-4">
                  <p className="text-sm text-red-600">{errors.submit}</p>
                </div>
              )}

              {/* Form Actions */}
              <div className="flex justify-end space-x-3">
                <Link
                  href="/dashboard/events"
                  className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
                >
                  Cancel
                </Link>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Creating...' : 'Create Event'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}

```


## File: `src/app/dashboard/events/page.tsx`

```typescript
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';
import { UserRole } from '@/types/enums';
import Link from 'next/link';

interface User {
  id: string;
  email: string;
  role: UserRole;
}

interface Event {
  id: string;
  name: string;
  date: string;
  day_of_week: string;
  venue_id: string;
  status: string;
  max_total_capacity: number;
  created_at: string;
  venue?: {
    name: string;
  };
}

export default function EventsPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserAndEvents = async () => {
      try {
        // Check authentication and role
        const {
          data: { user: authUser },
        } = await supabase.auth.getUser();

        if (!authUser) {
          router.push('/auth/login');
          return;
        }

        // TEMPORARY: Force manager role for patgoire@gmail.com
        if (authUser.email === 'patgoire@gmail.com') {
          const appUser: User = {
            id: authUser.id,
            email: authUser.email,
            role: UserRole.MANAGER,
          };
          setUser(appUser);
        } else {
          // For other users, fetch from database
          const { data: profile } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', authUser.id)
            .single();

          if (!profile || profile.role !== 'MANAGER') {
            router.push('/dashboard');
            return;
          }

          const appUser: User = {
            id: authUser.id,
            email: authUser.email!,
            role: UserRole.MANAGER,
          };
          setUser(appUser);
        }

        // Fetch events with venue information
        const { data: eventsData, error: eventsError } = await supabase
          .from('events')
          .select(
            `
            id,
            name,
            date,
            day_of_week,
            venue_id,
            status,
            max_total_capacity,
            created_at,
            venues:venue_id (
              name
            )
          `
          )
          .order('date', { ascending: true });

        if (eventsError) {
          console.error('Error fetching events:', eventsError);
        } else {
          console.log('✅ Events fetched:', eventsData);
          setEvents(eventsData || []);
        }

        setIsLoading(false);
      } catch (error) {
        console.error('Error in fetchUserAndEvents:', error);
        setIsLoading(false);
      }
    };

    fetchUserAndEvents();
  }, [router]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/auth/login');
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div>Loading...</div>
      </div>
    );
  }

  if (!user || user.role !== UserRole.MANAGER) {
    return null;
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'completed':
        return 'bg-gray-100 text-gray-800';
      case 'under_promoted':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-6 sm:px-6 lg:px-8">
          <div>
            <Link href="/dashboard" className="text-sm text-indigo-600 hover:text-indigo-500">
              ← Back to Dashboard
            </Link>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Events Management</h1>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-500">{user.email}</span>
            <button
              onClick={handleSignOut}
              className="rounded-md bg-indigo-600 px-3.5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
            >
              Sign out
            </button>
          </div>
        </div>
      </header>

      <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            {/* Header with Create Event button */}
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">All Events</h2>
              <Link
                href="/dashboard/events/create"
                className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                <svg
                  className="-ml-0.5 mr-1.5 h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                Create Event
              </Link>
            </div>

            {/* Events List */}
            {events.length === 0 ? (
              <div className="text-center py-12">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3a1 1 0 011-1h6a1 1 0 011 1v4m-6 0h6M8 7h8v12a1 1 0 01-1 1H9a1 1 0 01-1-1V7z"
                  />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900">No events</h3>
                <p className="mt-1 text-sm text-gray-500">Get started by creating a new event.</p>
                <div className="mt-6">
                  <Link
                    href="/dashboard/events/create"
                    className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
                  >
                    <svg
                      className="-ml-0.5 mr-1.5 h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                    Create Event
                  </Link>
                </div>
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {events.map(event => (
                  <div
                    key={event.id}
                    className="relative rounded-lg border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between">
                      <div className="min-w-0 flex-1">
                        <h3 className="text-lg font-medium text-gray-900 truncate">{event.name}</h3>
                        <p className="text-sm text-gray-500 mt-1">{formatDate(event.date)}</p>
                        <p className="text-sm text-gray-500">
                          {event.venue?.name || 'Unknown Venue'}
                        </p>
                        <p className="text-sm text-gray-500">
                          Capacity: {event.max_total_capacity}
                        </p>
                      </div>
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusColor(event.status)}`}
                      >
                        {event.status}
                      </span>
                    </div>

                    <div className="mt-4 flex space-x-3">
                      <Link
                        href={`/dashboard/events/${event.id}`}
                        className="text-sm text-indigo-600 hover:text-indigo-500"
                      >
                        View Details
                      </Link>
                      <Link
                        href={`/dashboard/events/${event.id}/edit`}
                        className="text-sm text-gray-600 hover:text-gray-500"
                      >
                        Edit
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

```


## File: `src/app/dashboard/manage-invitations/page.tsx`

```typescript
// src/app/dashboard/manage-invitations/page.tsx
'use client';

import { useState, useTransition } from 'react';
import { UserRole } from '@/types/enums';

// Helper to get user-friendly role names if needed, or just use the enum values
const getFriendlyRoleName = (role: UserRole): string => {
  switch (role) {
    case UserRole.DJ:
      return 'DJ';
    case UserRole.PROMOTER:
      return 'Promoter';
    case UserRole.DOORPERSON:
      return 'Door Staff';
    // Add other roles as needed, but managers typically invite DJs or Promoters
    default:
      return role.charAt(0).toUpperCase() + role.slice(1);
  }
};

// Define which roles a manager can assign through this form
const assignableRoles: UserRole[] = [
  UserRole.DJ,
  UserRole.PROMOTER,
  UserRole.DOORPERSON, // Example: managers might also invite door staff
];

export default function ManageInvitationsPage() {
  const [email, setEmail] = useState('');
  const [roleToAssign, setRoleToAssign] = useState<UserRole>(assignableRoles[0] || UserRole.DJ);
  const [message, setMessage] = useState<string | null>(null);
  const [messageType, setMessageType] = useState<'success' | 'error' | 'info'>('info');
  const [isPending, startTransition] = useTransition();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage(null);

    if (!email || !roleToAssign) {
      setMessage('Email and role are required.');
      setMessageType('error');
      return;
    }

    startTransition(async () => {
      try {
        const response = await fetch('/api/invitations', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, roleToAssign }),
        });

        const result = await response.json();

        if (response.ok) {
          setMessage(result.message || 'Invitation sent successfully!');
          setMessageType('success');
          setEmail(''); // Clear email field on success
        } else {
          setMessage(result.error || 'Failed to send invitation.');
          setMessageType('error');
        }
      } catch (error) {
        console.error('Error sending invitation:', error);
        setMessage('An unexpected error occurred. Please try again.');
        setMessageType('error');
      }
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-lg border border-gray-200">
        <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
          Manage User Invitations
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address to Invite
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="user@example.com"
              required
            />
          </div>

          <div>
            <label htmlFor="roleToAssign" className="block text-sm font-medium text-gray-700 mb-1">
              Assign Role
            </label>
            <select
              name="roleToAssign"
              id="roleToAssign"
              value={roleToAssign}
              onChange={e => setRoleToAssign(e.target.value as UserRole)}
              className="mt-1 block w-full px-4 py-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            >
              {assignableRoles.map(role => (
                <option key={role} value={role}>
                  {getFriendlyRoleName(role)}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-150 ease-in-out"
          >
            {isPending ? 'Sending Invitation...' : 'Send Invitation'}
          </button>
        </form>

        {message && (
          <div
            className={`mt-6 p-4 rounded-md text-sm font-medium border ${
              messageType === 'success'
                ? 'bg-green-50 border-green-300 text-green-700'
                : messageType === 'error'
                  ? 'bg-red-50 border-red-300 text-red-700'
                  : 'bg-blue-50 border-blue-300 text-blue-700' // info
            }`}
            role="alert"
          >
            <p className="font-semibold">
              {messageType.charAt(0).toUpperCase() + messageType.slice(1)}
            </p>
            <p>{message}</p>
          </div>
        )}
      </div>
    </div>
  );
}

```


## File: `src/app/dashboard/page.tsx`

```typescript
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';
import { UserRole } from '@/types/enums';
import Link from 'next/link';

// Define User interface
interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
}

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/auth/login');
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const {
          data: { user: authUser },
          error: authError,
        } = await supabase.auth.getUser();

        if (!authUser) {
          router.push('/auth/login');
          return;
        }

        // TEMPORARY WORKAROUND: Force manager role for patgoire@gmail.com
        let profile = null;

        if (authUser.email === 'patgoire@gmail.com') {
          profile = {
            role: 'MANAGER',
            first_name: 'Patrick',
            last_name: 'Gregoire',
            email: 'patgoire@gmail.com',
          };
        } else {
          // Try to fetch from database for other users
          const { data: fetchedProfile } = await supabase
            .from('profiles')
            .select('role, first_name, last_name, email')
            .eq('id', authUser.id)
            .single();
          profile = fetchedProfile;
        }

        // Build the user object with profile data
        let userRole = UserRole.GUEST;
        if (profile?.role) {
          // Map string role to enum
          userRole = profile.role as UserRole;
        }

        const appUser: User = {
          id: authUser.id,
          email: authUser.email!,
          name: profile
            ? `${profile.first_name || ''} ${profile.last_name || ''}`.trim() || authUser.email!
            : authUser.email!,
          role: userRole,
        };

        setUser(appUser);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching user:', error);
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const role = user.role || UserRole.GUEST;

  // Role-specific content
  const roleContent: Record<UserRole, React.ReactNode> = {
    [UserRole.OWNER]: (
      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-xl"
        style={{ gap: 'var(--space-xl)' }}
      >
        <DashboardCard
          title="Venue Settings"
          description="Configure venue details and defaults"
          link="/dashboard/venue-settings"
        />
        <DashboardCard
          title="Staff Management"
          description="Manage all staff and permissions"
          link="/dashboard/staff"
        />
        <DashboardCard
          title="Events"
          description="Create and manage events"
          link="/dashboard/events"
        />
        <DashboardCard
          title="Analytics"
          description="View comprehensive analytics"
          link="/dashboard/analytics"
        />
        <DashboardCard
          title="Notifications"
          description="Manage system notifications"
          link="/dashboard/notifications"
        />
        <DashboardCard
          title="Financial Reports"
          description="Revenue and expense tracking"
          link="/dashboard/finance"
        />
      </div>
    ),
    [UserRole.MANAGER]: (
      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-xl"
        style={{ gap: 'var(--space-xl)' }}
      >
        <DashboardCard
          title="Staff Management"
          description="Manage doorpersons, promoters, and DJs"
          link="/dashboard/staff"
        />
        <DashboardCard
          title="Events"
          description="Create and manage events"
          link="/dashboard/events"
        />
        <DashboardCard
          title="Analytics"
          description="View attendance and performance"
          link="/dashboard/analytics"
        />
        <DashboardCard
          title="Guest Lists"
          description="Review all guest lists"
          link="/dashboard/guest-lists"
        />
        <DashboardCard
          title="Bans & Security"
          description="Manage banned guests"
          link="/dashboard/bans"
        />
        <DashboardCard
          title="Settings"
          description="Configure app settings"
          link="/dashboard/settings"
        />
      </div>
    ),
    [UserRole.ASSISTANT_MANAGER]: (
      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-xl"
        style={{ gap: 'var(--space-xl)' }}
      >
        <DashboardCard
          title="Guest Lists"
          description="Review and approve lists"
          link="/dashboard/guest-lists"
        />
        <DashboardCard
          title="Capacity Requests"
          description="Handle capacity increases"
          link="/dashboard/capacity-requests"
        />
        <DashboardCard
          title="Analytics"
          description="View basic analytics"
          link="/dashboard/analytics"
        />
        <DashboardCard
          title="Tonight's Event"
          description="View current event details"
          link="/dashboard/tonight"
        />
      </div>
    ),
    [UserRole.DOORPERSON]: (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-xl" style={{ gap: 'var(--space-xl)' }}>
        <DashboardCard
          title="QR Scanner"
          description="Scan QR codes to check in guests"
          link="/dashboard/scanner"
          primary
        />
        <DashboardCard
          title="Guest Lists"
          description="View tonight's guest lists"
          link="/dashboard/guest-lists"
        />
        <DashboardCard
          title="Manual Check-in"
          description="Check in guests without QR"
          link="/dashboard/manual-checkin"
        />
        <DashboardCard
          title="Security Alerts"
          description="View banned guests"
          link="/dashboard/security"
        />
      </div>
    ),
    [UserRole.PROMOTER]: (
      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-xl"
        style={{ gap: 'var(--space-xl)' }}
      >
        <DashboardCard
          title="My Guest Lists"
          description="Create and manage your lists"
          link="/dashboard/my-lists"
        />
        <DashboardCard
          title="Performance"
          description="View your attendance metrics"
          link="/dashboard/performance"
        />
        <DashboardCard
          title="Guest Signup Link"
          description="Get shareable signup links"
          link="/dashboard/signup-links"
        />
        <DashboardCard
          title="Analytics"
          description="Track your guest conversions"
          link="/dashboard/my-analytics"
        />
      </div>
    ),
    [UserRole.DJ]: (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-xl" style={{ gap: 'var(--space-xl)' }}>
        <DashboardCard
          title="My Guest Lists"
          description="Create and manage your lists"
          link="/dashboard/my-lists"
        />
        <DashboardCard
          title="My Events"
          description="View your upcoming events"
          link="/dashboard/my-events"
        />
        <DashboardCard
          title="Guest Signup Link"
          description="Share with your fans"
          link="/dashboard/signup-links"
        />
        <DashboardCard
          title="Fan Analytics"
          description="See who's coming to see you"
          link="/dashboard/fan-analytics"
        />
      </div>
    ),
    [UserRole.STAFF]: (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-xl" style={{ gap: 'var(--space-xl)' }}>
        <DashboardCard
          title="Tonight's Event"
          description="Share guest list link with friends"
          link="/dashboard/tonight"
        />
        <DashboardCard
          title="My Guest List"
          description="View who's coming tonight"
          link="/dashboard/my-guests"
        />
      </div>
    ),
    [UserRole.VIP]: (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-xl" style={{ gap: 'var(--space-xl)' }}>
        <DashboardCard
          title="My QR Code"
          description="Get your permanent entry QR"
          link="/dashboard/vip-qr"
        />
        <DashboardCard
          title="VIP History"
          description="View your visit history"
          link="/dashboard/vip-history"
        />
      </div>
    ),
    [UserRole.GUEST]: (
      <div className="text-center" style={{ padding: 'var(--space-6xl) 0' }}>
        <h2
          className="text-2xl font-light"
          style={{
            color: 'var(--color-black)',
            marginBottom: 'var(--space-lg)',
          }}
        >
          Welcome, Guest
        </h2>
        <p
          className="text-lg"
          style={{
            color: 'var(--color-gray-600)',
            marginBottom: 'var(--space-2xl)',
          }}
        >
          You should not be seeing this page.
        </p>
        <a href="/guest/auth" className="btn btn-primary">
          Go to Guest Portal
        </a>
      </div>
    ),
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--color-white)' }}>
      {/* Header */}
      <header style={{ borderBottom: '1px solid var(--color-gray-200)' }}>
        <div
          className="container flex items-center justify-between"
          style={{ padding: 'var(--space-xl)' }}
        >
          <div className="flex items-center gap-3xl">
            <h1 className="text-2xl font-light" style={{ color: 'var(--color-black)' }}>
              Nightlist
            </h1>
            <nav className="hidden md:flex items-center gap-xl">
              <Link
                href="/dashboard"
                className="text-sm nav-link"
                style={{
                  color: 'var(--color-gray-600)',
                  transition: 'color var(--transition-normal)',
                  textDecoration: 'none',
                }}
                onMouseEnter={e => ((e.target as HTMLElement).style.color = 'var(--color-black)')}
                onMouseLeave={e =>
                  ((e.target as HTMLElement).style.color = 'var(--color-gray-600)')
                }
              >
                Dashboard
              </Link>
              {(role === UserRole.MANAGER || role === UserRole.OWNER) && (
                <>
                  <Link
                    href="/dashboard/events"
                    className="text-sm nav-link"
                    style={{
                      color: 'var(--color-gray-600)',
                      transition: 'color var(--transition-normal)',
                      textDecoration: 'none',
                    }}
                    onMouseEnter={e =>
                      ((e.target as HTMLElement).style.color = 'var(--color-black)')
                    }
                    onMouseLeave={e =>
                      ((e.target as HTMLElement).style.color = 'var(--color-gray-600)')
                    }
                  >
                    Events
                  </Link>
                  <Link
                    href="/dashboard/staff"
                    className="text-sm nav-link"
                    style={{
                      color: 'var(--color-gray-600)',
                      transition: 'color var(--transition-normal)',
                      textDecoration: 'none',
                    }}
                    onMouseEnter={e =>
                      ((e.target as HTMLElement).style.color = 'var(--color-black)')
                    }
                    onMouseLeave={e =>
                      ((e.target as HTMLElement).style.color = 'var(--color-gray-600)')
                    }
                  >
                    Staff
                  </Link>
                  <Link
                    href="/dashboard/analytics"
                    className="text-sm nav-link"
                    style={{
                      color: 'var(--color-gray-600)',
                      transition: 'color var(--transition-normal)',
                      textDecoration: 'none',
                    }}
                    onMouseEnter={e =>
                      ((e.target as HTMLElement).style.color = 'var(--color-black)')
                    }
                    onMouseLeave={e =>
                      ((e.target as HTMLElement).style.color = 'var(--color-gray-600)')
                    }
                  >
                    Analytics
                  </Link>
                </>
              )}
            </nav>
          </div>
          <div className="flex items-center gap-xl">
            <div className="text-right">
              <p className="text-sm font-medium" style={{ color: 'var(--color-black)' }}>
                {user.name}
              </p>
              <p className="text-xs" style={{ color: 'var(--color-gray-500)' }}>
                {role}
              </p>
            </div>
            <button onClick={handleSignOut} className="btn btn-ghost btn-sm">
              Sign Out
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container" style={{ padding: 'var(--space-4xl) var(--space-xl)' }}>
        {/* Welcome Section */}
        <div style={{ marginBottom: 'var(--space-4xl)' }}>
          <h2
            className="text-3xl font-light"
            style={{
              color: 'var(--color-black)',
              marginBottom: 'var(--space-lg)',
            }}
          >
            {getGreeting()}, {user.name.split(' ')[0] || user.email.split('@')[0]}
          </h2>
          <p className="text-lg" style={{ color: 'var(--color-gray-600)' }}>
            {getRoleDescription(role)}
          </p>
        </div>

        {/* Role-specific content */}
        {roleContent[role]}
      </main>
    </div>
  );
}

// Helper component for dashboard cards
function DashboardCard({
  title,
  description,
  link,
  primary = false,
}: {
  title: string;
  description: string;
  link: string;
  primary?: boolean;
}) {
  return (
    <Link
      href={link}
      className={`card group ${primary ? 'border-2' : ''}`}
      style={{
        ...(primary && { borderColor: 'var(--color-black)' }),
        textDecoration: 'none',
      }}
    >
      <div className="card-body">
        <div>
          <h3
            className="text-lg font-medium"
            style={{
              color: 'var(--color-black)',
              marginBottom: 'var(--space-sm)',
              transition: 'color var(--transition-normal)',
            }}
          >
            {title}
          </h3>
          <p className="text-sm" style={{ color: 'var(--color-gray-600)' }}>
            {description}
          </p>
        </div>
      </div>
    </Link>
  );
}

// Helper functions
function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 18) return 'Good afternoon';
  return 'Good evening';
}

function getRoleDescription(role: UserRole): string {
  const descriptions: Record<UserRole, string> = {
    [UserRole.OWNER]: 'You have full access to all system features and settings.',
    [UserRole.MANAGER]: "Manage your venue's staff, events, and analytics.",
    [UserRole.ASSISTANT_MANAGER]: 'Assist with daily operations and guest list management.',
    [UserRole.DOORPERSON]: 'Check in guests and manage door operations.',
    [UserRole.PROMOTER]: "Build and manage your guest lists for tonight's event.",
    [UserRole.DJ]: 'Manage your guest lists and view your upcoming performances.',
    [UserRole.STAFF]: "Invite your friends to tonight's event.",
    [UserRole.VIP]: 'Welcome to your VIP portal.',
    [UserRole.GUEST]: 'Welcome to the guest portal.',
  };
  return descriptions[role] || 'Welcome to the dashboard.';
}

```


## File: `src/app/dj/analytics/page.tsx`

```typescript
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface EventStats {
  id: string;
  name: string;
  date: string;
  signups: number;
  attended: number;
  conversionRate: number;
  totalImpact: number;
}

interface OverallStats {
  totalEvents: number;
  averageConversion: number;
  totalGuestsLifetime: number;
  bestPerformingEvent: string;
  thisMonthAttendees: number;
  lastMonthAttendees: number;
}

export default function DJAnalyticsPage() {
  const [eventStats, setEventStats] = useState<EventStats[]>([]);
  const [overallStats, setOverallStats] = useState<OverallStats | null>(null);
  const [timeRange, setTimeRange] = useState<'3months' | '6months' | '1year'>('6months');
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check authentication
    const isAuthenticated = localStorage.getItem('dj_authenticated');
    if (!isAuthenticated) {
      router.push('/dj/login');
      return;
    }

    // Mock data - in real app, fetch from API
    setTimeout(() => {
      setOverallStats({
        totalEvents: 8,
        averageConversion: 78,
        totalGuestsLifetime: 487,
        bestPerformingEvent: 'Summer Vibes',
        thisMonthAttendees: 67,
        lastMonthAttendees: 52,
      });

      setEventStats([
        {
          id: '1',
          name: 'Last Weekend Bash',
          date: 'June 29, 2025',
          signups: 68,
          attended: 58,
          conversionRate: 85,
          totalImpact: 58,
        },
        {
          id: '2',
          name: 'Friday Night Flow',
          date: 'June 21, 2025',
          signups: 72,
          attended: 45,
          conversionRate: 63,
          totalImpact: 45,
        },
        {
          id: '3',
          name: 'Summer Vibes',
          date: 'June 14, 2025',
          signups: 75,
          attended: 71,
          conversionRate: 95,
          totalImpact: 71,
        },
        {
          id: '4',
          name: 'Memorial Day Special',
          date: 'May 26, 2025',
          signups: 60,
          attended: 42,
          conversionRate: 70,
          totalImpact: 42,
        },
        {
          id: '5',
          name: 'Spring Break',
          date: 'May 19, 2025',
          signups: 55,
          attended: 38,
          conversionRate: 69,
          totalImpact: 38,
        },
      ]);

      setIsLoading(false);
    }, 1000);
  }, [router, timeRange]);

  const getTimeRangeLabel = () => {
    switch (timeRange) {
      case '3months':
        return 'Last 3 Months';
      case '6months':
        return 'Last 6 Months';
      case '1year':
        return 'Last 12 Months';
    }
  };

  const getGrowthPercentage = () => {
    if (!overallStats) return 0;
    const growth =
      ((overallStats.thisMonthAttendees - overallStats.lastMonthAttendees) /
        overallStats.lastMonthAttendees) *
      100;
    return Math.round(growth);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
          <p className="text-gray-600">Loading analytics...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-black text-white p-6">
        <div className="max-w-6xl mx-auto">
          <button
            onClick={() => router.push('/dj/dashboard')}
            className="text-gray-400 hover:text-white transition-colors mb-4 text-sm"
          >
            ← Back to Dashboard
          </button>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-light mb-2">Performance Analytics</h1>
              <p className="text-gray-300">Track your draw and conversion rates</p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setTimeRange('3months')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  timeRange === '3months'
                    ? 'bg-white text-black'
                    : 'bg-gray-800 text-white hover:bg-gray-700'
                }`}
              >
                3M
              </button>
              <button
                onClick={() => setTimeRange('6months')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  timeRange === '6months'
                    ? 'bg-white text-black'
                    : 'bg-gray-800 text-white hover:bg-gray-700'
                }`}
              >
                6M
              </button>
              <button
                onClick={() => setTimeRange('1year')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  timeRange === '1year'
                    ? 'bg-white text-black'
                    : 'bg-gray-800 text-white hover:bg-gray-700'
                }`}
              >
                1Y
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6">
        {/* Overall Stats */}
        {overallStats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-sm text-gray-600 font-medium mb-1">Total Events</h3>
              <p className="text-3xl font-bold">{overallStats.totalEvents}</p>
              <p className="text-sm text-gray-500 mt-1">{getTimeRangeLabel()}</p>
            </div>

            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-sm text-gray-600 font-medium mb-1">Average Conversion</h3>
              <p className="text-3xl font-bold">{overallStats.averageConversion}%</p>
              <p className="text-sm text-gray-500 mt-1">Signups to attendance</p>
            </div>

            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-sm text-gray-600 font-medium mb-1">This Month</h3>
              <p className="text-3xl font-bold">{overallStats.thisMonthAttendees}</p>
              <p
                className={`text-sm mt-1 ${
                  getGrowthPercentage() >= 0 ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {getGrowthPercentage() >= 0 ? '+' : ''}
                {getGrowthPercentage()}% from last month
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-sm text-gray-600 font-medium mb-1">Lifetime Total</h3>
              <p className="text-3xl font-bold">{overallStats.totalGuestsLifetime}</p>
              <p className="text-sm text-gray-500 mt-1">Guests brought</p>
            </div>
          </div>
        )}

        {/* Best Performing Event */}
        {overallStats && (
          <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 mb-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="text-2xl">🏆</div>
              <h3 className="text-lg font-semibold">Best Performing Event</h3>
            </div>
            <p className="text-gray-700">
              <strong>{overallStats.bestPerformingEvent}</strong> had your highest conversion rate
              at 95%
            </p>
          </div>
        )}

        {/* Event-by-Event Breakdown */}
        <div className="mb-8">
          <h2 className="text-xl font-medium mb-6">Event-by-Event Breakdown</h2>

          <div className="space-y-4">
            {eventStats.map(event => (
              <div key={event.id} className="bg-white border border-gray-200 rounded-xl p-6">
                <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-1">{event.name}</h3>
                    <p className="text-gray-600 text-sm">{event.date}</p>
                  </div>

                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
                    <div>
                      <div className="text-2xl font-bold text-blue-600">{event.signups}</div>
                      <div className="text-xs text-gray-500">Signups</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-green-600">{event.attended}</div>
                      <div className="text-xs text-gray-500">Attended</div>
                    </div>
                    <div>
                      <div
                        className={`text-2xl font-bold ${
                          event.conversionRate >= 80
                            ? 'text-green-600'
                            : event.conversionRate >= 60
                              ? 'text-yellow-600'
                              : 'text-red-600'
                        }`}
                      >
                        {event.conversionRate}%
                      </div>
                      <div className="text-xs text-gray-500">Conversion</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold">{event.totalImpact}</div>
                      <div className="text-xs text-gray-500">Total Impact</div>
                    </div>
                  </div>

                  <div className="lg:w-24">
                    <div className="bg-gray-200 rounded-full h-2 mb-1">
                      <div
                        className={`h-2 rounded-full transition-all duration-300 ${
                          event.conversionRate >= 80
                            ? 'bg-green-500'
                            : event.conversionRate >= 60
                              ? 'bg-yellow-500'
                              : 'bg-red-500'
                        }`}
                        style={{ width: `${event.conversionRate}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-500 text-center">{event.conversionRate}%</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Insights */}
        <div className="bg-blue-50 rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-4">📊 Insights & Tips</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-medium mb-2">Your Strengths:</h4>
              <ul className="space-y-1 text-gray-700">
                <li>• High conversion rates (78% average)</li>
                <li>• Consistent growth month-over-month</li>
                <li>• Strong repeat attendance</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Areas to Improve:</h4>
              <ul className="space-y-1 text-gray-700">
                <li>• Reduce no-show rates with reminders</li>
                <li>• Invite past guests who attended</li>
                <li>• Share links earlier for better planning</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Export Options */}
        <div className="text-center mt-8">
          <button className="px-6 py-3 bg-black text-white rounded-xl font-medium hover:bg-gray-900 transition-colors">
            Export Full Report
          </button>
        </div>
      </div>
    </div>
  );
}

```


## File: `src/app/dj/dashboard/page.tsx`

```typescript
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import DebugPanel from '@/components/debug/DebugPanel';
import { SafeStorage } from '@/lib/utils/safeStorage';

interface Event {
  id: string;
  name: string;
  date: string;
  otherDJs: string[];
  spotsUsed: number;
  totalSpots: number;
  status: 'upcoming' | 'past';
  pendingGuests?: number;
  hasInvitedPastGuests?: boolean;
  conversionRate?: number;
  totalAttendees?: number;
}

export default function DJDashboardPage() {
  const [djName, setDjName] = useState('');
  const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([]);
  const [pastEvents, setPastEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [shareEventId, setShareEventId] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Check authentication
    const isAuthenticated = localStorage.getItem('dj_authenticated');
    if (!isAuthenticated) {
      router.push('/dj/login');
      return;
    }

    // Get DJ info
    const email = localStorage.getItem('dj_email');
    setDjName('DJ Shadow'); // This would come from API

    // Mock data - in real app, this would come from API
    setTimeout(() => {
      setUpcomingEvents([
        {
          id: '1',
          name: 'Saturday Night Sessions',
          date: 'July 6 2025',
          otherDJs: ['DJ Marcus', 'MC Groove'],
          spotsUsed: 23,
          totalSpots: 75,
          status: 'upcoming',
          pendingGuests: 2,
          hasInvitedPastGuests: false,
        },
        {
          id: '2',
          name: 'Summer Vibes',
          date: 'July 12 2025',
          otherDJs: ['DJ Luna'],
          spotsUsed: 8,
          totalSpots: 75,
          status: 'upcoming',
          pendingGuests: 0,
          hasInvitedPastGuests: true,
        },
      ]);

      setPastEvents([
        {
          id: '3',
          name: 'Last Weekend Bash',
          date: 'June 29 2025',
          otherDJs: ['DJ Beats'],
          spotsUsed: 68,
          totalSpots: 75,
          conversionRate: 85,
          totalAttendees: 58,
          status: 'past',
        },
      ]);

      setIsLoading(false);
    }, 1000);
  }, [router]);

  const handleEventAction = (eventId: string, action: 'share' | 'manage' | 'invite') => {
    switch (action) {
      case 'share':
        router.push(`/dj/events/${eventId}/share`);
        break;
      case 'manage':
        router.push(`/dj/events/${eventId}/manage`);
        break;
      case 'invite':
        router.push(`/dj/events/${eventId}/batch-invite`);
        break;
    }
  };

  const handleLogout = () => {
    SafeStorage.removeItem('dj_authenticated');
    SafeStorage.removeItem('dj_email');
    router.push('/dj/login');
  };

  const handleCopyLink = async (event: Event) => {
    const shareUrl = `https://nightlist.app/guest/signup?event=${event.id}&dj=shadow`;

    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(shareUrl);
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = shareUrl;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }

      setShareEventId(event.id);
      setTimeout(() => setShareEventId(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleShareEvent = async (event: Event) => {
    const shareUrl = `https://nightlist.app/guest/signup?event=${event.id}&dj=shadow`;
    const shareData = {
      title: `Join me at ${event.name}`,
      text: `You're invited to ${event.name} on ${event.date}. Sign up for the guest list!`,
      url: shareUrl,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        return;
      } catch (error) {
        if ((error as Error).name === 'AbortError') {
          return;
        }
      }
    }

    // Fallback to copy if share not available
    handleCopyLink(event);
  };

  // Debug functions
  const resetData = () => {
    // Reset events to initial state
    setUpcomingEvents([
      {
        id: '1',
        name: 'Saturday Night Sessions',
        date: 'July 6 2025',
        otherDJs: ['DJ Marcus', 'MC Groove'],
        spotsUsed: 23,
        totalSpots: 75,
        status: 'upcoming',
        pendingGuests: 2,
        hasInvitedPastGuests: false,
      },
      {
        id: '2',
        name: 'Summer Vibes',
        date: 'July 12 2025',
        otherDJs: ['DJ Luna'],
        spotsUsed: 8,
        totalSpots: 75,
        status: 'upcoming',
        pendingGuests: 0,
        hasInvitedPastGuests: true,
      },
    ]);

    // Clear guest data from localStorage
    const keys = Object.keys(localStorage);
    keys.forEach(key => {
      if (key.startsWith('guest_') || key.startsWith('event_')) {
        localStorage.removeItem(key);
      }
    });
  };

  const fillToCapacity = () => {
    setUpcomingEvents(prev =>
      prev.map(event => ({
        ...event,
        spotsUsed: event.totalSpots - 2, // Leave 2 spots
        pendingGuests: 3, // Add some pending
      }))
    );
  };

  const generateRandomGuests = () => {
    setUpcomingEvents(prev =>
      prev.map(event => ({
        ...event,
        pendingGuests: Math.floor(Math.random() * 10) + 1,
      }))
    );

    // Add realistic edge case guests to localStorage for testing
    const edgeCaseGuests = [
      {
        id: 'edge1',
        name: 'Alexandriaaaaaa Constantinopolous-Van Der Berg',
        email: 'very.long.email.address.that.might.break.layouts@example.com',
        phone: '+1 (555) 999-0000',
        instagram: '@alexandriaaaaaa_constantinopolous_van_der_berg_official',
        plusOnes: 8,
        status: 'pending',
        checkedIn: false,
        submittedAt: '30 seconds ago',
      },
      {
        id: 'edge2',
        name: 'X',
        email: 'x@x.co',
        phone: '+1',
        plusOnes: 0,
        status: 'pending',
        checkedIn: false,
        submittedAt: '999 days ago',
      },
      {
        id: 'edge3',
        name: 'Test User With émojis 🎉🎊✨',
        email: 'emoji@test.com',
        phone: '+1 (555) 123-4567',
        instagram: '@test_émojis_🎉',
        plusOnes: 15,
        status: 'pending',
        checkedIn: false,
        submittedAt: '2 minutes ago',
      },
    ];

    SafeStorage.setJSON('edge_case_guests', edgeCaseGuests);
    console.log('Added edge case guests for testing');
  };

  const clearStorage = () => {
    window.location.reload();
  };

  const toggleLoading = () => {
    setIsLoading(prev => !prev);
  };

  const simulateError = () => {
    alert('Simulated error: Network connection failed');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="p-6">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-600 mb-2">Nightlist</p>
            <h1 className="text-3xl font-light tracking-tight mb-1">Hey {djName}!</h1>
            <p className="text-gray-600">Manage your events and guest lists</p>
          </div>
          <button
            onClick={handleLogout}
            className="text-gray-600 hover:text-black transition-colors text-sm"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6">
        {/* Events */}
        <>
          {/* Upcoming Events */}
          <div className="mb-8">
            <h2 className="text-xl mb-4">Upcoming Events</h2>
            {upcomingEvents.length === 0 ? (
              <div className="bg-gray-50 rounded-xl p-8 text-center">
                <h3 className="text-lg mb-2">No upcoming events</h3>
                <p className="text-gray-600">
                  You'll see your future performances here once they're scheduled.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {upcomingEvents.map(event => (
                  <div key={event.id} className="bg-white border border-gray-200 rounded-xl p-8">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="text-lg">{event.name}</h3>
                      <p className="text-xs text-gray-600">{event.date}</p>
                    </div>

                    {event.otherDJs.length > 0 && (
                      <p className="text-sm text-gray-500 mb-4">With {event.otherDJs.join(', ')}</p>
                    )}

                    {/* Capacity Meter */}
                    <div className="mb-4">
                      <div className="w-full">
                        <div className="relative">
                          {/* Pending label above the meter bar when it would conflict */}
                          {event.pendingGuests &&
                            event.pendingGuests > 0 &&
                            (() => {
                              const pendingCenterPosition =
                                ((event.spotsUsed + event.pendingGuests / 2) / event.totalSpots) *
                                100;
                              const wouldOverlapConfirmed = pendingCenterPosition < 25;
                              const wouldOverlapSpots = pendingCenterPosition > 70;

                              return wouldOverlapConfirmed || wouldOverlapSpots ? (
                                <div
                                  className="absolute -top-5 text-xs text-gray-500"
                                  style={{
                                    left: `${pendingCenterPosition}%`,
                                    transform: 'translateX(-50%)',
                                  }}
                                >
                                  Pending
                                </div>
                              ) : null;
                            })()}

                          <div className="bg-gray-200 rounded-full h-4 relative overflow-hidden">
                            {/* Pending + Confirmed (light gray) bar - shows total */}
                            <div
                              className="bg-gray-400 h-4 rounded-full transition-all duration-300 absolute top-0 left-0"
                              style={{
                                width: `${((event.spotsUsed + (event.pendingGuests || 0)) / event.totalSpots) * 100}%`,
                              }}
                            >
                              {/* Pending count inside the gray bar - only show if bar is wide enough */}
                              {event.pendingGuests &&
                                event.pendingGuests > 0 &&
                                event.pendingGuests / event.totalSpots > 0.08 && (
                                  <span
                                    className="absolute top-1/2 -translate-y-1/2 text-white text-[10px] z-20"
                                    style={{ right: '8px' }}
                                  >
                                    {event.pendingGuests}
                                  </span>
                                )}
                            </div>
                            {/* Confirmed (black) bar - shows on top */}
                            <div
                              className="bg-black h-4 rounded-full transition-all duration-300 relative z-10"
                              style={{ width: `${(event.spotsUsed / event.totalSpots) * 100}%` }}
                            >
                              <span className="absolute right-2 top-1/2 -translate-y-1/2 text-white text-[10px]">
                                {event.spotsUsed}
                              </span>
                            </div>
                            <span className="absolute right-2 top-1/2 -translate-y-1/2 text-black text-[10px] z-20">
                              {event.totalSpots}
                            </span>
                          </div>

                          <div className="flex justify-between mt-2 relative">
                            <span className="text-xs text-gray-500">Confirmed</span>

                            {/* Pending label below the meter (normal position) - hide if too close to edges */}
                            {event.pendingGuests &&
                              event.pendingGuests > 0 &&
                              (() => {
                                const pendingCenterPosition =
                                  ((event.spotsUsed + event.pendingGuests / 2) / event.totalSpots) *
                                  100;
                                const wouldOverlapConfirmed = pendingCenterPosition < 30;
                                const wouldOverlapSpots = pendingCenterPosition > 65;

                                return !wouldOverlapConfirmed && !wouldOverlapSpots ? (
                                  <span
                                    className="absolute text-xs text-gray-500"
                                    style={{
                                      left: `${pendingCenterPosition}%`,
                                      transform: 'translateX(-50%)',
                                    }}
                                  >
                                    Pending
                                  </span>
                                ) : null;
                              })()}

                            <span className="text-xs text-gray-500">Spots available</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Share Invite Link */}
                    <div className="mb-6">
                      <p className="text-sm text-gray-600 mb-2">Share invite link:</p>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 relative">
                          <input
                            type="text"
                            value={`https://nightlist.app/guest/signup?event=${event.id}&dj=shadow`}
                            readOnly
                            onClick={() => handleCopyLink(event)}
                            className={`w-full bg-gray-100 rounded-full px-4 py-2 text-xs font-mono pr-4 cursor-pointer hover:bg-gray-200 transition-opacity ${
                              shareEventId === event.id ? 'opacity-0' : 'opacity-100'
                            }`}
                          />
                          {shareEventId === event.id && (
                            <div className="absolute inset-0 flex items-center justify-center text-xs text-gray-600 pointer-events-none">
                              Copied!
                            </div>
                          )}
                          <div className="absolute right-1 top-1 bottom-1 w-8 bg-gradient-to-l from-gray-100 via-gray-100/90 to-transparent rounded-r-full pointer-events-none"></div>
                        </div>
                        <button
                          onClick={() => handleCopyLink(event)}
                          className="px-3 py-1.5 bg-white text-black border border-black rounded-full hover:bg-gray-50 transition-colors text-xs"
                        >
                          Copy
                        </button>
                        <button
                          onClick={() => handleShareEvent(event)}
                          className="px-3 py-1.5 bg-black text-white rounded-full hover:bg-gray-900 transition-colors text-xs"
                        >
                          Share
                        </button>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                      <button
                        onClick={() => router.push(`/dj/events/${event.id}/capacity`)}
                        className="flex-1 bg-white text-black border border-gray-300 py-2 rounded-full text-xs hover:bg-gray-50 transition-colors leading-tight"
                      >
                        Request additional spots
                      </button>

                      <button
                        onClick={() => handleEventAction(event.id, 'manage')}
                        className={`flex-1 py-2 rounded-full text-xs transition-colors leading-tight ${
                          event.pendingGuests && event.pendingGuests > 0
                            ? 'bg-gray-400 text-white hover:bg-gray-500'
                            : 'bg-gray-800 text-white hover:bg-gray-900'
                        }`}
                      >
                        {event.pendingGuests && event.pendingGuests > 0
                          ? 'Review pending guests'
                          : 'Review guestlist'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Past Events */}
          <div>
            <h2 className="text-xl mb-4">Past Events</h2>
            {pastEvents.length === 0 ? (
              <div className="bg-gray-50 rounded-xl p-8 text-center">
                <h3 className="text-lg mb-2">No past events</h3>
                <p className="text-gray-600">
                  Your performance history will appear here after your first event.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {pastEvents.map(event => (
                  <button
                    key={event.id}
                    onClick={() => router.push(`/dj/events/${event.id}`)}
                    className="w-full bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors text-left"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="text-lg">{event.name}</h3>
                      <p className="text-xs text-gray-600">{event.date}</p>
                    </div>
                    {event.otherDJs.length > 0 && (
                      <p className="text-sm text-gray-500 mb-4">With {event.otherDJs.join(', ')}</p>
                    )}

                    <button
                      onClick={e => {
                        e.stopPropagation();
                        router.push(`/dj/events/${event.id}/manage`);
                      }}
                      className="bg-gray-50 border border-gray-300 text-black px-4 py-2 rounded-full text-sm hover:bg-gray-100 transition-colors"
                    >
                      Review guestlist
                    </button>
                  </button>
                ))}
              </div>
            )}
          </div>
        </>
      </div>

      {/* Debug Panel */}
      <DebugPanel
        onResetData={resetData}
        onFillToCapacity={fillToCapacity}
        onGenerateRandomGuests={generateRandomGuests}
        onClearStorage={clearStorage}
        onToggleLoading={toggleLoading}
        onSimulateError={simulateError}
      />
    </div>
  );
}

```


## File: `src/app/dj/events/[id]/batch-invite/page.tsx`

```typescript
'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';

interface PastGuest {
  id: string;
  name: string;
  email: string;
  phone: string;
  instagram?: string;
  lastEvent: string;
  attended: boolean;
  totalVisits: number;
}

interface EventInfo {
  id: string;
  name: string;
  date: string;
}

export default function DJBatchInvitePage() {
  const [eventInfo, setEventInfo] = useState<EventInfo | null>(null);
  const [pastGuests, setPastGuests] = useState<PastGuest[]>([]);
  const [selectedGuests, setSelectedGuests] = useState<Set<string>>(new Set());
  const [filterBy, setFilterBy] = useState<'all' | 'attended' | 'no-show'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [inviteMessage, setInviteMessage] = useState('');
  const [sendVia, setSendVia] = useState<{ sms: boolean; email: boolean }>({
    sms: true,
    email: true,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const [sendResult, setSendResult] = useState('');
  const router = useRouter();
  const params = useParams();

  useEffect(() => {
    // Check authentication
    const isAuthenticated = localStorage.getItem('dj_authenticated');
    if (!isAuthenticated) {
      router.push('/dj/login');
      return;
    }

    // Mock data - in real app, fetch from API using params.id
    setTimeout(() => {
      const mockEventInfo = {
        id: params.id as string,
        name: 'Saturday Night Sessions',
        date: 'Saturday, July 6, 2025',
      };

      const mockPastGuests: PastGuest[] = [
        {
          id: '1',
          name: 'Sarah Johnson',
          email: 'sarah@example.com',
          phone: '+1 (555) 123-4567',
          instagram: '@sarahj',
          lastEvent: 'Last Weekend Bash',
          attended: true,
          totalVisits: 3,
        },
        {
          id: '2',
          name: 'Mike Chen',
          email: 'mike@example.com',
          phone: '+1 (555) 234-5678',
          lastEvent: 'Summer Vibes',
          attended: false,
          totalVisits: 1,
        },
        {
          id: '3',
          name: 'Alex Rivera',
          email: 'alex@example.com',
          phone: '+1 (555) 345-6789',
          instagram: '@alexr',
          lastEvent: 'Last Weekend Bash',
          attended: true,
          totalVisits: 5,
        },
        {
          id: '4',
          name: 'Jamie Smith',
          email: 'jamie@example.com',
          phone: '+1 (555) 456-7890',
          lastEvent: 'Friday Night Flow',
          attended: true,
          totalVisits: 2,
        },
        {
          id: '5',
          name: 'Chris Davis',
          email: 'chris@example.com',
          phone: '+1 (555) 567-8901',
          lastEvent: 'Summer Vibes',
          attended: false,
          totalVisits: 1,
        },
      ];

      setEventInfo(mockEventInfo);
      setPastGuests(mockPastGuests);

      // Set default message
      setInviteMessage(
        `DJ Shadow is playing at Nightlist on ${mockEventInfo.date} and invited you to the event. Click here to join the guest list: [LINK]`
      );

      setIsLoading(false);
    }, 1000);
  }, [router, params.id]);

  const filteredGuests = pastGuests.filter(guest => {
    const matchesSearch =
      guest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      guest.email.toLowerCase().includes(searchQuery.toLowerCase());

    switch (filterBy) {
      case 'attended':
        return guest.attended && matchesSearch;
      case 'no-show':
        return !guest.attended && matchesSearch;
      default:
        return matchesSearch;
    }
  });

  const handleSelectGuest = (guestId: string) => {
    const newSelected = new Set(selectedGuests);
    if (newSelected.has(guestId)) {
      newSelected.delete(guestId);
    } else {
      newSelected.add(guestId);
    }
    setSelectedGuests(newSelected);
  };

  const handleSelectAll = () => {
    const allGuestIds = filteredGuests.map(guest => guest.id);
    setSelectedGuests(new Set(allGuestIds));
  };

  const handleSelectAllAttended = () => {
    const attendedGuestIds = filteredGuests.filter(guest => guest.attended).map(guest => guest.id);
    setSelectedGuests(new Set(attendedGuestIds));
  };

  const handleClearSelection = () => {
    setSelectedGuests(new Set());
  };

  const getCharacterCount = () => {
    return inviteMessage.length;
  };

  const handleSendInvites = async () => {
    if (selectedGuests.size === 0) return;

    setIsSending(true);
    setSendResult('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      const selectedCount = selectedGuests.size;
      const methods = [];
      if (sendVia.sms) methods.push('SMS');
      if (sendVia.email) methods.push('email');

      setSendResult(`Successfully sent ${selectedCount} invitations via ${methods.join(' and ')}!`);
      setSelectedGuests(new Set());
    } catch (error) {
      setSendResult('Failed to send invitations. Please try again.');
    } finally {
      setIsSending(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
          <p className="text-gray-600">Loading past guests...</p>
        </div>
      </div>
    );
  }

  if (!eventInfo) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-red-600">Event not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-black text-white p-6">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => router.push('/dj/dashboard')}
            className="text-gray-400 hover:text-white transition-colors mb-4 text-sm"
          >
            ← Back to Dashboard
          </button>
          <h1 className="text-2xl font-light mb-2">Invite Past Guests</h1>
          <p className="text-gray-300">
            {eventInfo.name} • {eventInfo.date}
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6">
        {/* Filters and Search */}
        <div className="flex flex-col lg:flex-row gap-4 mb-6">
          <div className="flex-1">
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search guests by name or email..."
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-black transition-colors"
            />
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setFilterBy('all')}
              className={`px-4 py-3 rounded-xl font-medium transition-colors ${
                filterBy === 'all'
                  ? 'bg-black text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilterBy('attended')}
              className={`px-4 py-3 rounded-xl font-medium transition-colors ${
                filterBy === 'attended'
                  ? 'bg-black text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Attended
            </button>
            <button
              onClick={() => setFilterBy('no-show')}
              className={`px-4 py-3 rounded-xl font-medium transition-colors ${
                filterBy === 'no-show'
                  ? 'bg-black text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              No-Show
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3 mb-6">
          <button
            onClick={handleSelectAll}
            className="px-4 py-2 bg-gray-100 text-black rounded-lg font-medium hover:bg-gray-200 transition-colors"
          >
            Select All ({filteredGuests.length})
          </button>
          <button
            onClick={handleSelectAllAttended}
            className="px-4 py-2 bg-green-100 text-green-800 rounded-lg font-medium hover:bg-green-200 transition-colors"
          >
            Select All Attended ({filteredGuests.filter(g => g.attended).length})
          </button>
          <button
            onClick={handleClearSelection}
            className="px-4 py-2 bg-red-100 text-red-800 rounded-lg font-medium hover:bg-red-200 transition-colors"
          >
            Clear Selection
          </button>
        </div>

        {/* Guest List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8">
          {filteredGuests.map(guest => (
            <div
              key={guest.id}
              className={`border-2 rounded-xl p-4 cursor-pointer transition-all ${
                selectedGuests.has(guest.id)
                  ? 'border-black bg-black text-white'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => handleSelectGuest(guest.id)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold">{guest.name}</h3>
                    {guest.attended ? (
                      <span
                        className={`px-2 py-1 rounded text-xs font-semibold ${
                          selectedGuests.has(guest.id)
                            ? 'bg-green-800 text-green-200'
                            : 'bg-green-100 text-green-800'
                        }`}
                      >
                        Attended
                      </span>
                    ) : (
                      <span
                        className={`px-2 py-1 rounded text-xs font-semibold ${
                          selectedGuests.has(guest.id)
                            ? 'bg-red-800 text-red-200'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        No-Show
                      </span>
                    )}
                  </div>

                  <div
                    className={`space-y-1 text-sm ${
                      selectedGuests.has(guest.id) ? 'text-gray-300' : 'text-gray-600'
                    }`}
                  >
                    <p>{guest.email}</p>
                    {guest.instagram && <p>{guest.instagram}</p>}
                    <p>Last event: {guest.lastEvent}</p>
                    <p>Total visits: {guest.totalVisits}</p>
                  </div>
                </div>

                <div
                  className={`w-6 h-6 rounded border-2 flex items-center justify-center ${
                    selectedGuests.has(guest.id) ? 'border-white bg-white' : 'border-gray-300'
                  }`}
                >
                  {selectedGuests.has(guest.id) && (
                    <svg className="w-4 h-4 text-black" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredGuests.length === 0 && (
          <div className="text-center py-12">
            <div className="text-4xl mb-4">👥</div>
            <h3 className="text-lg font-medium mb-2">No guests found</h3>
            <p className="text-gray-600">
              {searchQuery
                ? 'Try adjusting your search terms'
                : 'No past guests available for invitation'}
            </p>
          </div>
        )}

        {/* Invite Composer */}
        {selectedGuests.size > 0 && (
          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="text-lg font-medium mb-4">Compose Invitation</h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                <textarea
                  value={inviteMessage}
                  onChange={e => setInviteMessage(e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-black transition-colors resize-none"
                  placeholder="Write your invitation message..."
                />
                <p className="text-sm text-gray-500 mt-1">
                  Characters: {getCharacterCount()}{' '}
                  {getCharacterCount() > 160 && '(SMS may be split)'}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Send via</label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={sendVia.sms}
                      onChange={e => setSendVia(prev => ({ ...prev, sms: e.target.checked }))}
                      className="w-4 h-4 accent-black"
                    />
                    <span>SMS</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={sendVia.email}
                      onChange={e => setSendVia(prev => ({ ...prev, email: e.target.checked }))}
                      className="w-4 h-4 accent-black"
                    />
                    <span>Email</span>
                  </label>
                </div>
              </div>

              {sendResult && (
                <div
                  className={`p-3 rounded-xl ${
                    sendResult.includes('Failed')
                      ? 'bg-red-50 text-red-700 border border-red-200'
                      : 'bg-green-50 text-green-700 border border-green-200'
                  }`}
                >
                  {sendResult}
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleSendInvites}
                  disabled={
                    isSending || selectedGuests.size === 0 || (!sendVia.sms && !sendVia.email)
                  }
                  className="flex-1 bg-black text-white py-3 rounded-xl font-medium hover:bg-gray-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSending ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      Sending...
                    </div>
                  ) : (
                    `Send Invites (${selectedGuests.size})`
                  )}
                </button>

                <button className="px-6 py-3 bg-white text-black border-2 border-black rounded-xl font-medium hover:bg-gray-50 transition-colors">
                  Preview
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

```


## File: `src/app/dj/events/[id]/guest/[guestId]/page.tsx`

```typescript
'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';

interface Guest {
  id: string;
  name: string;
  email: string;
  phone: string;
  instagram?: string;
  plusOnes: number;
  status: 'pending' | 'approved' | 'denied';
  checkedIn: boolean;
  submittedAt: string;
  checkInTime?: string;
  notes?: string;
}

interface EventInfo {
  id: string;
  name: string;
  date: string;
}

export default function DJGuestDetailPage() {
  const [eventInfo, setEventInfo] = useState<EventInfo | null>(null);
  const [guest, setGuest] = useState<Guest | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isApproving, setIsApproving] = useState(false);
  const [isDenying, setIsDenying] = useState(false);
  const router = useRouter();
  const params = useParams();

  useEffect(() => {
    // Check authentication
    const isAuthenticated = localStorage.getItem('dj_authenticated');
    if (!isAuthenticated) {
      router.push('/dj/login');
      return;
    }

    // Mock data - in real app, fetch from API using params.id and params.guestId
    setTimeout(() => {
      setEventInfo({
        id: params.id as string,
        name: 'Saturday Night Sessions',
        date: 'Saturday, July 6, 2025',
      });

      // Mock guest data based on guestId
      const mockGuests: Record<string, Guest> = {
        '1': {
          id: '1',
          name: 'Sarah Johnson',
          email: 'sarah@example.com',
          phone: '+1 (555) 123-4567',
          instagram: '@sarahj',
          plusOnes: 2,
          status: 'pending',
          checkedIn: false,
          submittedAt: '2 hours ago',
        },
        '2': {
          id: '2',
          name: 'Mike Chen',
          email: 'mike@example.com',
          phone: '+1 (555) 234-5678',
          plusOnes: 1,
          status: 'pending',
          checkedIn: false,
          submittedAt: '4 hours ago',
        },
        '3': {
          id: '3',
          name: 'Alex Rivera',
          email: 'alex@example.com',
          phone: '+1 (555) 345-6789',
          instagram: '@alexr',
          plusOnes: 0,
          status: 'approved',
          checkedIn: true,
          submittedAt: '1 day ago',
          checkInTime: '9:45 PM',
        },
        '4': {
          id: '4',
          name: 'Jamie Smith',
          email: 'jamie@example.com',
          phone: '+1 (555) 456-7890',
          plusOnes: 3,
          status: 'approved',
          checkedIn: false,
          submittedAt: '1 day ago',
        },
      };

      // Check for updated guest status from management page
      const storedGuests = localStorage.getItem('event_guests');
      let foundGuest = mockGuests[params.guestId as string];

      if (storedGuests && foundGuest) {
        const guestUpdates = JSON.parse(storedGuests);
        const guestUpdate = guestUpdates[params.guestId as string];
        if (guestUpdate) {
          foundGuest = { ...foundGuest, ...guestUpdate };
        }
      }

      setGuest(foundGuest || null);
      setIsLoading(false);
    }, 1000);
  }, [router, params.id, params.guestId]);

  const handleApproveGuest = async () => {
    if (!guest) return;

    setIsApproving(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));

      setGuest(prev => {
        if (!prev) return null;
        const updatedGuest = { ...prev, status: 'approved' as const };

        // Save to localStorage for sync with management page
        const storedGuests = localStorage.getItem('event_guests');
        const guestUpdates = storedGuests ? JSON.parse(storedGuests) : {};
        guestUpdates[prev.id] = { status: 'approved' };
        localStorage.setItem('event_guests', JSON.stringify(guestUpdates));

        return updatedGuest;
      });
    } catch (error) {
      console.error('Failed to approve guest:', error);
    } finally {
      setIsApproving(false);
    }
  };

  const handleDenyGuest = async () => {
    if (!guest) return;

    setIsDenying(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));

      setGuest(prev => {
        if (!prev) return null;
        const updatedGuest = { ...prev, status: 'denied' as const };

        // Save to localStorage for sync with management page
        const storedGuests = localStorage.getItem('event_guests');
        const guestUpdates = storedGuests ? JSON.parse(storedGuests) : {};
        guestUpdates[prev.id] = { status: 'denied' };
        localStorage.setItem('event_guests', JSON.stringify(guestUpdates));

        return updatedGuest;
      });
    } catch (error) {
      console.error('Failed to deny guest:', error);
    } finally {
      setIsDenying(false);
    }
  };

  const handleUpdatePlusOnes = (newPlusOnes: number) => {
    if (!guest) return;

    setGuest(prev => (prev ? { ...prev, plusOnes: Math.max(0, newPlusOnes) } : null));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-white text-black border border-gray-300';
      case 'pending':
        return 'bg-gray-200 text-gray-700';
      case 'denied':
        return 'bg-white text-black border border-black';
      default:
        return 'bg-gray-200 text-gray-700';
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
          <p className="text-gray-600">Loading guest details...</p>
        </div>
      </div>
    );
  }

  if (!eventInfo || !guest) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h3 className="text-lg font-medium mb-2">Guest not found</h3>
          <button
            onClick={() => router.push(`/dj/events/${params.id}/manage`)}
            className="text-black hover:underline"
          >
            ← Guest List
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="p-6">
        <div className="max-w-2xl mx-auto">
          <button
            onClick={() => router.push(`/dj/events/${params.id}/manage`)}
            className="text-gray-600 hover:text-black transition-colors mb-4 text-sm"
          >
            ← Guest List
          </button>
          <h1 className="text-2xl font-light mb-2">Guest Details</h1>
          <p className="text-gray-600">{eventInfo.name}</p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto p-6">
        {/* Guest Info Card */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-2xl font-light mb-2">{guest.name}</h2>
              {guest.instagram && (
                <a
                  href={`https://instagram.com/${guest.instagram.replace('@', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg text-blue-600 hover:text-blue-800 transition-colors mb-1 block"
                >
                  {guest.instagram}
                </a>
              )}
              <span
                className={`inline-block px-3 py-1 rounded-lg text-sm ${getStatusColor(guest.status)}`}
              >
                {guest.status.charAt(0).toUpperCase() + guest.status.slice(1)}
              </span>
              {guest.checkedIn && (
                <span className="ml-2 bg-black text-white px-3 py-1 rounded-lg text-sm">
                  Checked In
                </span>
              )}
            </div>
          </div>

          {/* Guest Details */}
          <div className="space-y-4">
            <div>
              <h4 className="text-sm text-gray-500 mb-1">Plus Ones</h4>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleUpdatePlusOnes(guest.plusOnes - 1)}
                  className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
                  disabled={guest.plusOnes <= 0}
                >
                  -
                </button>
                <span className="text-lg w-8 text-center">{guest.plusOnes}</span>
                <button
                  onClick={() => handleUpdatePlusOnes(guest.plusOnes + 1)}
                  className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            <div>
              <p className="text-sm text-gray-500">Submitted {guest.submittedAt}</p>
            </div>

            {guest.checkInTime && (
              <div>
                <p className="text-sm text-gray-500">Check-in Time {guest.checkInTime}</p>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        {guest.status === 'pending' && (
          <div className="flex gap-4 mb-6">
            <button
              onClick={handleApproveGuest}
              disabled={isApproving}
              className="flex-1 bg-black text-white py-3 rounded-full hover:bg-gray-900 transition-colors disabled:opacity-50"
            >
              {isApproving ? 'Approving...' : 'Approve Guest'}
            </button>
            <button
              onClick={handleDenyGuest}
              disabled={isDenying}
              className="flex-1 bg-white text-black border border-black py-3 rounded-full hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              {isDenying ? 'Denying...' : 'Deny Guest'}
            </button>
          </div>
        )}

        {guest.status === 'approved' && !guest.checkedIn && (
          <div className="mb-6">
            <button
              onClick={handleDenyGuest}
              disabled={isDenying}
              className="w-full bg-white text-black border border-gray-300 py-3 rounded-full hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              {isDenying ? 'Removing...' : 'Remove Approval'}
            </button>
          </div>
        )}

        {guest.status === 'denied' && (
          <div className="mb-6">
            <button
              onClick={handleApproveGuest}
              disabled={isApproving}
              className="w-full bg-black text-white py-3 rounded-full hover:bg-gray-900 transition-colors disabled:opacity-50"
            >
              {isApproving ? 'Approving...' : 'Approve Guest'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

```


## File: `src/app/dj/events/[id]/invite-past-guests/customize/page.tsx`

```typescript
'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { MockInvitationService, InvitationRequest } from '@/lib/mock/invitationService';

interface EventInfo {
  id: string;
  name: string;
  date: string;
  venue: string;
}

interface PastGuest {
  id: string;
  name: string;
  instagram?: string;
  email: string;
  phone: string;
}

export default function CustomizeInvitationPage() {
  const [eventInfo, setEventInfo] = useState<EventInfo | null>(null);
  const [selectedGuests, setSelectedGuests] = useState<PastGuest[]>([]);
  const [messageTemplate, setMessageTemplate] = useState('');
  const [customMessage, setCustomMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const params = useParams();

  const CHARACTER_LIMIT = 160; // SMS character limit

  useEffect(() => {
    // Check authentication
    const isAuthenticated = localStorage.getItem('dj_authenticated');
    if (!isAuthenticated) {
      router.push('/dj/login');
      return;
    }

    // Get selected guests from session storage
    const selectedGuestIds = JSON.parse(sessionStorage.getItem('selectedPastGuests') || '[]');
    if (selectedGuestIds.length === 0) {
      router.push(`/dj/events/${params.id}/invite-past-guests`);
      return;
    }

    // Mock data - in real app, fetch from API
    setTimeout(() => {
      setEventInfo({
        id: params.id as string,
        name: 'Saturday Night Sessions',
        date: 'Saturday, July 6',
        venue: 'Datcha',
      });

      // Mock selected guests data (in real app, fetch based on selectedGuestIds)
      const mockGuests: PastGuest[] = [
        {
          id: '1',
          name: 'Emma Wilson',
          instagram: '@emmaw',
          email: 'emma@example.com',
          phone: '+1 (555) 111-2222',
        },
        {
          id: '2',
          name: 'James Miller',
          instagram: '@jmiller',
          email: 'james@example.com',
          phone: '+1 (555) 333-4444',
        },
        { id: '3', name: 'Sophia Davis', email: 'sophia@example.com', phone: '+1 (555) 555-6666' },
        {
          id: '4',
          name: 'Oliver Brown',
          instagram: '@oliverb',
          email: 'oliver@example.com',
          phone: '+1 (555) 777-8888',
        },
        {
          id: '5',
          name: 'Isabella Martinez',
          instagram: '@bellamart',
          email: 'isabella@example.com',
          phone: '+1 (555) 999-0000',
        },
      ].filter(g => selectedGuestIds.includes(g.id));

      setSelectedGuests(mockGuests);

      // Set default message template with shortened URL
      const longUrl = `https://nightlist.app/guest/signup?event=${params.id}&dj=shadow`;
      const shortUrl = MockInvitationService.shortenUrl(longUrl);
      const template = `Hey [Name], you're invited to DJ Shadow's guestlist on Saturday, July 6 at Datcha. Confirm here: ${shortUrl}`;
      setMessageTemplate(template);
      setCustomMessage(template);

      setIsLoading(false);
    }, 500);
  }, [router, params.id]);

  const handleSendInvitations = async () => {
    setIsSending(true);

    try {
      // Prepare invitation requests
      const invitationRequests: InvitationRequest[] = selectedGuests.map(guest => ({
        guestId: guest.id,
        guestName: guest.name,
        guestPhone: guest.phone,
        guestEmail: guest.email,
        eventId: eventInfo!.id,
        eventName: eventInfo!.name,
        eventDate: eventInfo!.date,
        eventVenue: eventInfo!.venue,
        message: MockInvitationService.personalizeMessage(customMessage, {
          Name: guest.name.split(' ')[0],
          EventName: eventInfo!.name,
          Date: eventInfo!.date,
          Venue: eventInfo!.venue,
        }),
        djName: 'DJ Shadow', // In real app, get from auth
      }));

      // Send invitations with progress tracking
      let successCount = 0;
      await MockInvitationService.sendBulkInvitations(invitationRequests, (completed, total) => {
        // Could update UI with progress here
        console.log(`Sent ${completed}/${total} invitations`);
      }).then(results => {
        successCount = results.filter(r => r.status === 'sent').length;
      });

      // Update event to mark that past guests have been invited
      // In real app, this would be an API call
      const events = JSON.parse(localStorage.getItem('dj_events') || '[]');
      const eventIndex = events.findIndex((e: any) => e.id === params.id);
      if (eventIndex !== -1) {
        events[eventIndex].hasInvitedPastGuests = true;
        localStorage.setItem('dj_events', JSON.stringify(events));
      }

      // Clear session storage
      sessionStorage.removeItem('selectedPastGuests');

      // Show success and redirect
      router.push(`/dj/events/${params.id}/invite-past-guests/success?count=${successCount}`);
    } catch (error) {
      console.error('Failed to send invitations:', error);
      setIsSending(false);
    }
  };

  const getPersonalizedPreview = () => {
    // Show preview with first guest's name
    if (selectedGuests.length > 0) {
      return customMessage.replace('[Name]', selectedGuests[0].name.split(' ')[0]);
    }
    return customMessage;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="p-6">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => router.push(`/dj/events/${params.id}/invite-past-guests`)}
            className="text-gray-600 hover:text-black transition-colors mb-4 text-sm"
          >
            ← Back
          </button>
          <h1 className="text-2xl font-light mb-1">Customize Your Message</h1>
          <p className="text-gray-600">
            Inviting {selectedGuests.length} guest{selectedGuests.length === 1 ? '' : 's'} to{' '}
            {eventInfo?.name}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Message Editor */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Your invitation message</label>
            <textarea
              value={customMessage}
              onChange={e => setCustomMessage(e.target.value)}
              maxLength={CHARACTER_LIMIT}
              className="w-full p-4 border border-gray-200 rounded-xl resize-none focus:outline-none focus:border-black transition-colors"
              rows={4}
              placeholder="Type your message..."
            />
            <div className="flex justify-end mt-2">
              <p className="text-xs text-gray-500">
                {customMessage.length}/{CHARACTER_LIMIT}
              </p>
            </div>
          </div>

          {/* Preview */}
          <div className="mb-6">
            <h3 className="text-sm font-medium mb-2">Preview</h3>
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-gray-700">{getPersonalizedPreview()}</p>
            </div>
          </div>

          {/* Selected Guests Summary */}
          <div className="mb-8">
            <h3 className="text-sm font-medium mb-2">Recipients</h3>
            <div className="bg-gray-50 rounded-xl p-4">
              <div className="flex flex-wrap gap-2">
                {selectedGuests.map(guest => (
                  <span key={guest.id} className="bg-white px-3 py-1 rounded-full text-sm">
                    {guest.name}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Send Button */}
          <button
            onClick={handleSendInvitations}
            disabled={isSending || customMessage.trim().length === 0}
            className={`w-full py-4 rounded-xl font-medium transition-colors ${
              isSending || customMessage.trim().length === 0
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-black text-white hover:bg-gray-900'
            }`}
          >
            {isSending ? (
              <span className="flex items-center justify-center">
                <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></span>
                Sending invitations...
              </span>
            ) : (
              `Send ${selectedGuests.length} Invitation${selectedGuests.length === 1 ? '' : 's'}`
            )}
          </button>

          {/* Info Text */}
          <p className="text-xs text-gray-500 text-center mt-4">Invitations will be sent via SMS</p>
        </div>
      </div>
    </div>
  );
}

```


## File: `src/app/dj/events/[id]/invite-past-guests/page.tsx`

```typescript
'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { MockInvitationService } from '@/lib/mock/invitationService';

interface PastGuest {
  id: string;
  name: string;
  instagram?: string;
  email: string;
  phone: string;
  lastAttended: {
    eventName: string;
    date: string;
  };
  totalVisits: number;
}

interface EventInfo {
  id: string;
  name: string;
  date: string;
}

export default function InvitePastGuestsPage() {
  const [eventInfo, setEventInfo] = useState<EventInfo | null>(null);
  const [pastGuests, setPastGuests] = useState<PastGuest[]>([]);
  const [selectedGuests, setSelectedGuests] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(true);
  const [sortBy, setSortBy] = useState<'alphabetical' | 'visits' | 'lastAttended'>('alphabetical');
  const router = useRouter();
  const params = useParams();

  useEffect(() => {
    // Check authentication
    const isAuthenticated = localStorage.getItem('dj_authenticated');
    if (!isAuthenticated) {
      router.push('/dj/login');
      return;
    }

    // Mock data - in real app, fetch from API
    setTimeout(() => {
      setEventInfo({
        id: params.id as string,
        name: 'Saturday Night Sessions',
        date: 'Saturday, July 6, 2025',
      });

      // Mock past guests data
      const allPastGuests = [
        {
          id: '1',
          name: 'Emma Wilson',
          instagram: '@emmaw',
          email: 'emma@example.com',
          phone: '+1 (555) 111-2222',
          lastAttended: {
            eventName: 'Friday Night Fever',
            date: 'June 14, 2025',
          },
          totalVisits: 8,
        },
        {
          id: '2',
          name: 'James Miller',
          instagram: '@jmiller',
          email: 'james@example.com',
          phone: '+1 (555) 333-4444',
          lastAttended: {
            eventName: 'Weekend Vibes',
            date: 'June 7, 2025',
          },
          totalVisits: 5,
        },
        {
          id: '3',
          name: 'Sophia Davis',
          email: 'sophia@example.com',
          phone: '+1 (555) 555-6666',
          lastAttended: {
            eventName: 'Friday Night Fever',
            date: 'June 14, 2025',
          },
          totalVisits: 12,
        },
        {
          id: '4',
          name: 'Oliver Brown',
          instagram: '@oliverb',
          email: 'oliver@example.com',
          phone: '+1 (555) 777-8888',
          lastAttended: {
            eventName: 'Summer Kickoff',
            date: 'May 31, 2025',
          },
          totalVisits: 3,
        },
        {
          id: '5',
          name: 'Isabella Martinez',
          instagram: '@bellamart',
          email: 'isabella@example.com',
          phone: '+1 (555) 999-0000',
          lastAttended: {
            eventName: 'Friday Night Fever',
            date: 'June 14, 2025',
          },
          totalVisits: 7,
        },
      ];

      // Filter out guests who have already been invited to this event
      const availableGuests = allPastGuests.filter(
        guest => !MockInvitationService.wasGuestInvited(guest.id, params.id as string)
      );

      setPastGuests(availableGuests);

      setIsLoading(false);
    }, 1000);
  }, [router, params.id]);

  // Sort guests based on selected criteria
  const sortedGuests = [...pastGuests].sort((a, b) => {
    switch (sortBy) {
      case 'alphabetical':
        return a.name.localeCompare(b.name);
      case 'visits':
        return b.totalVisits - a.totalVisits; // Descending order
      case 'lastAttended':
        return new Date(b.lastAttended.date).getTime() - new Date(a.lastAttended.date).getTime(); // Most recent first
      default:
        return 0;
    }
  });

  const handleGuestToggle = (guestId: string) => {
    setSelectedGuests(prev => {
      const newSet = new Set(prev);
      if (newSet.has(guestId)) {
        newSet.delete(guestId);
      } else {
        newSet.add(guestId);
      }
      return newSet;
    });
  };

  const handleSelectAll = () => {
    if (selectedGuests.size === sortedGuests.length) {
      setSelectedGuests(new Set());
    } else {
      setSelectedGuests(new Set(sortedGuests.map(g => g.id)));
    }
  };

  const handleNext = () => {
    if (selectedGuests.size > 0) {
      // Store selected guests in sessionStorage for the next screen
      sessionStorage.setItem('selectedPastGuests', JSON.stringify(Array.from(selectedGuests)));
      router.push(`/dj/events/${params.id}/invite-past-guests/customize`);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
          <p className="text-gray-600">Loading past guests...</p>
        </div>
      </div>
    );
  }

  if (!eventInfo) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-red-600">Event not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="p-6">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => router.push('/dj/dashboard')}
            className="text-gray-600 hover:text-black transition-colors mb-4 text-sm"
          >
            ← Dashboard
          </button>
          <h1 className="text-2xl font-light mb-1">Invite Past Guests</h1>
          <p className="text-gray-600">
            {eventInfo.name} • {eventInfo.date}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-6">
        <div className="max-w-4xl mx-auto">
          {/* Controls */}
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={handleSelectAll}
              className="bg-gray-100 text-gray-500 px-3 py-1 rounded-full text-sm hover:bg-gray-200 transition-colors"
            >
              {selectedGuests.size === sortedGuests.length ? 'Deselect All' : 'Select All'}
            </button>

            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">Sort by:</span>
              <select
                value={sortBy}
                onChange={e =>
                  setSortBy(e.target.value as 'alphabetical' | 'visits' | 'lastAttended')
                }
                className="bg-gray-100 text-gray-500 px-3 py-1 rounded-full text-sm border-none focus:outline-none hover:bg-gray-200 transition-colors"
              >
                <option value="alphabetical">Alphabetical</option>
                <option value="visits">Number of visits</option>
                <option value="lastAttended">Last attended</option>
              </select>
            </div>
          </div>

          {/* Guest List */}
          {sortedGuests.length === 0 ? (
            <div className="text-center py-12">
              <div className="mb-4">
                <svg
                  className="w-16 h-16 text-gray-300 mx-auto"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium mb-2">No Available Past Guests</h3>
              <p className="text-gray-600 text-sm max-w-md mx-auto">
                All your past guests have already been invited to this event, or you don't have any
                past guests yet.
              </p>
              <button
                onClick={() => router.push('/dj/dashboard')}
                className="mt-6 px-6 py-2 bg-black text-white rounded-xl font-medium hover:bg-gray-900 transition-colors"
              >
                Back to Dashboard
              </button>
            </div>
          ) : (
            <div className="space-y-3 pb-32">
              {sortedGuests.map(guest => (
                <div
                  key={guest.id}
                  onClick={() => handleGuestToggle(guest.id)}
                  className="bg-white border border-gray-200 rounded-xl p-2 cursor-pointer hover:border-gray-300 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    {/* Checkbox */}
                    <div className="flex-shrink-0">
                      <div
                        className={`w-6 h-6 rounded-full border-2 transition-colors ${
                          selectedGuests.has(guest.id)
                            ? 'bg-black border-black'
                            : 'bg-white border-gray-300'
                        }`}
                      >
                        {selectedGuests.has(guest.id) && (
                          <svg className="w-full h-full p-1" viewBox="0 0 24 24" fill="none">
                            <path
                              d="M5 13l4 4L19 7"
                              stroke="white"
                              strokeWidth="3"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        )}
                      </div>
                    </div>

                    {/* Guest Info */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <p className="text-sm">{guest.name}</p>
                          {guest.instagram && (
                            <a
                              href={`https://instagram.com/${guest.instagram.replace('@', '')}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs text-blue-600 hover:text-blue-800 transition-colors"
                              onClick={e => e.stopPropagation()}
                            >
                              {guest.instagram}
                            </a>
                          )}
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-gray-500">{guest.totalVisits} visits</p>
                          <p className="text-xs text-gray-500">
                            Last attended: {guest.lastAttended.date}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white p-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <p className="text-sm text-gray-500">
            {selectedGuests.size === 0
              ? 'No guests selected'
              : `${selectedGuests.size} guest${selectedGuests.size === 1 ? '' : 's'} selected`}
          </p>
          <button
            onClick={handleNext}
            disabled={selectedGuests.size === 0}
            className={`px-6 py-3 rounded-xl font-medium transition-colors ${
              selectedGuests.size > 0
                ? 'bg-black text-white hover:bg-gray-900'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

```


## File: `src/app/dj/events/[id]/invite-past-guests/success/page.tsx`

```typescript
'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useParams, useSearchParams } from 'next/navigation';

function SuccessPageContent() {
  const [inviteCount, setInviteCount] = useState(0);
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Get the count from query params
    const count = parseInt(searchParams.get('count') || '0');
    setInviteCount(count);

    // Auto-redirect after 3 seconds
    const timeout = setTimeout(() => {
      router.push('/dj/dashboard');
    }, 3000);

    return () => clearTimeout(timeout);
  }, [router, searchParams]);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6">
      <div className="text-center max-w-md">
        <div className="mb-6">
          <div className="w-20 h-20 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-10 h-10 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-light mb-2">Invitations Sent!</h1>
          <p className="text-gray-600">
            Successfully sent invitations to {inviteCount} guest{inviteCount === 1 ? '' : 's'}
          </p>
        </div>

        <div className="space-y-3">
          <button
            onClick={() => router.push('/dj/dashboard')}
            className="w-full bg-black text-white py-3 rounded-xl font-medium hover:bg-gray-900 transition-colors"
          >
            Dashboard
          </button>
          <button
            onClick={() => router.push(`/dj/events/${params.id}/manage`)}
            className="w-full bg-gray-100 text-black py-3 rounded-xl font-medium hover:bg-gray-200 transition-colors"
          >
            View Guest List
          </button>
        </div>

        <p className="text-xs text-gray-500 mt-6">Redirecting to dashboard in a few seconds...</p>
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-white flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
        </div>
      }
    >
      <SuccessPageContent />
    </Suspense>
  );
}

```


## File: `src/app/dj/events/[id]/manage/page.tsx`

```typescript
'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Toast, { useToast } from '@/components/ui/Toast';
import ErrorBoundary from '@/components/ui/ErrorBoundary';
import { SafeStorage } from '@/lib/utils/safeStorage';
import DebugPanel from '@/components/debug/DebugPanel';
import ExplosionAnimation from '@/components/ui/ExplosionAnimation';

interface Guest {
  id: string;
  name: string;
  email: string;
  phone: string;
  instagram?: string;
  plusOnes: number;
  status: 'pending' | 'approved' | 'denied';
  checkedIn: boolean;
  submittedAt: string;
}

interface EventInfo {
  id: string;
  name: string;
  date: string;
  totalCapacity: number;
  spotsUsed: number;
  otherDJs?: string[];
}

export default function DJEventManagePage() {
  const [eventInfo, setEventInfo] = useState<EventInfo | null>(null);
  const [guests, setGuests] = useState<Guest[]>([]);
  const [activeTab, setActiveTab] = useState<'pending' | 'approved' | 'denied'>('pending');
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isApproving, setIsApproving] = useState<string | null>(null);
  const [showApprovalConfirmation, setShowApprovalConfirmation] = useState(false);
  const [approvedGuestNames, setApprovedGuestNames] = useState<string[]>([]);
  const [isApprovingAll, setIsApprovingAll] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showExplosion, setShowExplosion] = useState(false);
  const [explosionButtonPos, setExplosionButtonPos] = useState({ x: 50, y: 50 });
  const router = useRouter();
  const params = useParams();
  const { toast, showToast, hideToast } = useToast();

  // Handle approval confirmation timeout with proper cleanup
  useEffect(() => {
    if (showApprovalConfirmation && !isApprovingAll) {
      const timeoutId = setTimeout(() => {
        setShowApprovalConfirmation(false);
        setApprovedGuestNames([]);
      }, 3000);

      return () => clearTimeout(timeoutId);
    }
  }, [showApprovalConfirmation, isApprovingAll]);

  useEffect(() => {
    const loadEventData = async () => {
      try {
        // Check authentication
        const isAuthenticated = SafeStorage.getItem('dj_authenticated');
        if (!isAuthenticated) {
          router.push('/dj/login');
          return;
        }

        // Validate event ID
        if (!params.id || typeof params.id !== 'string') {
          setError('Invalid event ID');
          setIsLoading(false);
          return;
        }

        // Mock data loading with potential failure simulation
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Simulate random API failure in development (5% chance)
        if (process.env.NODE_ENV === 'development' && Math.random() < 0.05) {
          throw new Error('Simulated API failure');
        }

        setEventInfo({
          id: params.id as string,
          name: 'Saturday Night Sessions',
          date: 'Saturday, July 6, 2025',
          totalCapacity: 75,
          spotsUsed: 23,
          otherDJs: ['DJ Marcus', 'MC Groove'],
        });

        setGuests([
          {
            id: '1',
            name: 'Sarah Johnson',
            email: 'sarah@example.com',
            phone: '+1 (555) 123-4567',
            instagram: '@sarahj',
            plusOnes: 2,
            status: 'pending',
            checkedIn: false,
            submittedAt: '2 hours ago',
          },
          {
            id: '2',
            name: 'Mike Chen',
            email: 'mike@example.com',
            phone: '+1 (555) 234-5678',
            plusOnes: 1,
            status: 'pending',
            checkedIn: false,
            submittedAt: '4 hours ago',
          },
          {
            id: '3',
            name: 'Alex Rivera',
            email: 'alex@example.com',
            phone: '+1 (555) 345-6789',
            instagram: '@alexr',
            plusOnes: 0,
            status: 'approved',
            checkedIn: true,
            submittedAt: '1 day ago',
          },
          {
            id: '4',
            name: 'Jamie Smith',
            email: 'jamie@example.com',
            phone: '+1 (555) 456-7890',
            plusOnes: 3,
            status: 'approved',
            checkedIn: false,
            submittedAt: '1 day ago',
          },
        ]);

        setIsLoading(false);
      } catch (error) {
        console.error('Failed to load event data:', error);
        setError(error instanceof Error ? error.message : 'Failed to load event data');
        setIsLoading(false);
        showToast('Failed to load event data. Please try again.', 'error');
      }
    };

    loadEventData();
  }, [router, params.id]);

  const handleApproveGuest = async (guestId: string) => {
    if (!eventInfo) {
      showToast('Event data not loaded', 'error');
      return;
    }

    setIsApproving(guestId);

    try {
      // Check capacity before approving (atomic operation)
      const guest = guests.find(g => g.id === guestId);
      if (!guest) {
        throw new Error('Guest not found');
      }

      // Calculate current capacity INCLUDING any guests currently being approved
      const currentApproved = guests.filter(g => g.status === 'approved');
      const currentUsed = currentApproved.reduce((total, g) => total + 1 + g.plusOnes, 0);

      // Account for other guests currently being approved (race condition protection)
      const currentlyApproving = guests.filter(g => g.id !== guestId && isApproving === g.id);
      const pendingApprovalCapacity = currentlyApproving.reduce(
        (total, g) => total + 1 + g.plusOnes,
        0
      );

      const totalProjectedCapacity = currentUsed + pendingApprovalCapacity + 1 + guest.plusOnes;

      if (totalProjectedCapacity > eventInfo.totalCapacity) {
        showToast(
          `Cannot approve: would exceed capacity (${totalProjectedCapacity}/${eventInfo.totalCapacity})`,
          'warning'
        );
        setIsApproving(null);
        return;
      }

      // Simulate API call with potential failure
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          if (Math.random() < 0.1) {
            // 10% chance of failure
            reject(new Error('Network error'));
          } else {
            resolve(undefined);
          }
        }, 500);
      });

      setGuests(prev =>
        prev.map(guest => {
          if (guest.id === guestId) {
            const updatedGuest = { ...guest, status: 'approved' as const };

            // Save to localStorage for sync with detail page
            const existingGuests = SafeStorage.getJSON('event_guests') || {};
            const success = SafeStorage.setJSON('event_guests', {
              ...existingGuests,
              [guestId]: { status: 'approved' },
            });

            if (!success) {
              console.warn('Failed to save guest status to localStorage');
            }

            return updatedGuest;
          }
          return guest;
        })
      );

      showToast(`${guest.name} approved successfully`, 'success');
    } catch (error) {
      console.error('Failed to approve guest:', error);
      showToast(
        error instanceof Error ? error.message : 'Failed to approve guest. Please try again.',
        'error'
      );
    } finally {
      setIsApproving(null);
    }
  };

  const handleDenyGuest = async (guestId: string) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));

      setGuests(prev =>
        prev.map(guest => {
          if (guest.id === guestId) {
            const updatedGuest = { ...guest, status: 'denied' as const };

            // Save to localStorage for sync with detail page
            const storedGuests = localStorage.getItem('event_guests');
            const guestUpdates = storedGuests ? JSON.parse(storedGuests) : {};
            guestUpdates[guestId] = { status: 'denied' };
            localStorage.setItem('event_guests', JSON.stringify(guestUpdates));

            return updatedGuest;
          }
          return guest;
        })
      );
    } catch (error) {
      console.error('Failed to deny guest:', error);
    }
  };

  const handleApproveAll = async (event: React.MouseEvent) => {
    const pendingGuests = filteredGuests.filter(guest => guest.status === 'pending');

    if (pendingGuests.length === 0) return;

    // Capture button position for explosion animation
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((rect.left + rect.width / 2) / window.innerWidth) * 100;
    const y = ((rect.top + rect.height / 2) / window.innerHeight) * 100;
    setExplosionButtonPos({ x, y });

    setIsApprovingAll(true);
    setApprovedGuestNames(pendingGuests.map(guest => guest.name));

    // Start explosion animation
    setShowExplosion(true);

    try {
      // Simulate API call (during explosion animation)
      await new Promise(resolve => setTimeout(resolve, 1000));

      setGuests(prev => {
        return prev.map(guest => {
          if (guest.status === 'pending') {
            return { ...guest, status: 'approved' as const };
          }
          return guest;
        });
      });

      // Save all updates to localStorage using SafeStorage
      const existingGuests = (SafeStorage.getJSON('event_guests') || {}) as Record<
        string,
        { status: string }
      >;
      pendingGuests.forEach(guest => {
        existingGuests[guest.id] = { status: 'approved' };
      });
      SafeStorage.setJSON('event_guests', existingGuests);

      setIsApprovingAll(false);
    } catch (error) {
      console.error('Failed to approve all guests:', error);
      setIsApprovingAll(false);
      setShowExplosion(false);
      setApprovedGuestNames([]);
      showToast('Failed to approve guests. Please try again.', 'error');
    }
  };

  const handleExplosionComplete = () => {
    setShowExplosion(false);
    // Skip the white approval confirmation screen - go straight back to main interface
    setShowApprovalConfirmation(false);
    setApprovedGuestNames([]);
  };

  const handleUpdatePlusOnes = (guestId: string, newPlusOnes: number) => {
    if (!eventInfo) {
      showToast('Event data not loaded', 'error');
      return;
    }

    // Prevent negative plus ones
    const validPlusOnes = Math.max(0, newPlusOnes);

    const guest = guests.find(g => g.id === guestId);
    if (!guest) {
      showToast('Guest not found', 'error');
      return;
    }

    // Calculate current capacity
    const currentApproved = guests.filter(g => g.status === 'approved');
    const currentUsed = currentApproved.reduce((total, g) => total + 1 + g.plusOnes, 0);

    // Calculate change in capacity
    const capacityChange = validPlusOnes - guest.plusOnes;
    const newTotalCapacity = currentUsed + capacityChange;

    // Check if increasing plus ones would exceed capacity
    if (capacityChange > 0 && newTotalCapacity > eventInfo.totalCapacity) {
      showToast(
        `Cannot add plus ones: would exceed capacity (${newTotalCapacity}/${eventInfo.totalCapacity})`,
        'warning'
      );
      return;
    }

    // Update the guest's plus ones
    setGuests(prev =>
      prev.map(guest => (guest.id === guestId ? { ...guest, plusOnes: validPlusOnes } : guest))
    );

    // Save to localStorage
    const existingGuests = (SafeStorage.getJSON('event_guests') || {}) as Record<
      string,
      { status?: string; plusOnes?: number }
    >;
    SafeStorage.setJSON('event_guests', {
      ...existingGuests,
      [guestId]: { ...existingGuests[guestId], plusOnes: validPlusOnes },
    });

    showToast(`Updated plus ones for ${guest.name}`, 'success');
  };

  // Debug functions for guest management
  const debugResetGuests = () => {
    setGuests([
      {
        id: '1',
        name: 'Sarah Johnson',
        email: 'sarah@example.com',
        phone: '+1 (555) 123-4567',
        instagram: '@sarahj',
        plusOnes: 2,
        status: 'pending',
        checkedIn: false,
        submittedAt: '2 hours ago',
      },
      {
        id: '2',
        name: 'Mike Chen',
        email: 'mike@example.com',
        phone: '+1 (555) 234-5678',
        plusOnes: 1,
        status: 'pending',
        checkedIn: false,
        submittedAt: '4 hours ago',
      },
    ]);
    SafeStorage.removeItem('event_guests');
    showToast('Reset guest list to initial state', 'success');
  };

  const debugFillToCapacity = () => {
    if (!eventInfo) return;

    const newGuests = [];
    let totalUsed = 0;

    // Add guests until near capacity
    for (let i = 1; totalUsed < eventInfo.totalCapacity - 5; i++) {
      const plusOnes = Math.floor(Math.random() * 3);
      newGuests.push({
        id: `debug${i}`,
        name: `Debug Guest ${i}`,
        email: `debug${i}@test.com`,
        phone: `+1 (555) ${i.toString().padStart(3, '0')}-0000`,
        instagram: `@debug${i}`,
        plusOnes,
        status: 'approved' as const,
        checkedIn: false,
        submittedAt: `${i} hours ago`,
      });
      totalUsed += 1 + plusOnes;
    }

    setGuests(newGuests);
    showToast(`Filled to near capacity (${totalUsed}/${eventInfo.totalCapacity})`, 'success');
  };

  const debugAddEdgeCaseGuests = () => {
    const edgeCases = [
      {
        id: 'edge1',
        name: 'Alexandriaaaaaa Constantinopolous-Van Der Berg',
        email: 'very.long.email.address.that.might.break.layouts@example.com',
        phone: '+1 (555) 999-0000',
        instagram: '@alexandriaaaaaa_constantinopolous_van_der_berg_official',
        plusOnes: 8,
        status: 'pending' as const,
        checkedIn: false,
        submittedAt: '30 seconds ago',
      },
      {
        id: 'edge2',
        name: 'X',
        email: 'x@x.co',
        phone: '+1',
        plusOnes: 0,
        status: 'pending' as const,
        checkedIn: false,
        submittedAt: '999 days ago',
      },
      {
        id: 'edge3',
        name: 'Test User With émojis 🎉🎊✨',
        email: 'emoji@test.com',
        phone: '+1 (555) 123-4567',
        instagram: '@test_émojis_🎉',
        plusOnes: 15,
        status: 'pending' as const,
        checkedIn: false,
        submittedAt: '2 minutes ago',
      },
    ];

    setGuests(prev => [...prev, ...edgeCases]);
    showToast('Added edge case guests for testing', 'success');
  };

  const debugClearStorage = () => {
    SafeStorage.removeItem('event_guests');
    SafeStorage.removeItem('dj_authenticated');
    SafeStorage.removeItem('dj_email');
    window.location.reload();
  };

  const debugToggleLoading = () => {
    setIsLoading(prev => !prev);
  };

  const debugSimulateError = () => {
    showToast('Simulated network error occurred', 'error');
  };

  const filteredGuests = guests.filter(guest => {
    switch (activeTab) {
      case 'pending':
        return guest.status === 'pending';
      case 'approved':
        return guest.status === 'approved';
      case 'denied':
        return guest.status === 'denied';
      default:
        return true;
    }
  });

  const pendingCount = guests.filter(g => g.status === 'pending').length;
  const approvedCount = guests.filter(g => g.status === 'approved').length;
  const deniedCount = guests.filter(g => g.status === 'denied').length;

  // Calculate total spots used including plus ones
  const spotsUsed = guests
    .filter(g => g.status === 'approved')
    .reduce((total, guest) => total + 1 + guest.plusOnes, 0);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
          <p className="text-gray-600">Loading event...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-6">
        <div className="text-center max-w-md">
          <div className="text-4xl mb-4">⚠️</div>
          <h1 className="text-xl font-medium mb-2">Unable to load event</h1>
          <p className="text-gray-600 mb-6">{error}</p>
          <div className="space-y-3">
            <button
              onClick={() => window.location.reload()}
              className="w-full bg-black text-white py-3 rounded-xl hover:bg-gray-900 transition-colors"
            >
              Try Again
            </button>
            <button
              onClick={() => router.push('/dj/dashboard')}
              className="w-full bg-gray-100 text-black py-3 rounded-xl hover:bg-gray-200 transition-colors"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!eventInfo) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-red-600">Event not found</p>
      </div>
    );
  }

  // Show approval confirmation screen
  if (showApprovalConfirmation) {
    const formatNames = (names: string[]) => {
      if (names.length === 1) return names[0];
      if (names.length === 2) return `${names[0]} and ${names[1]}`;
      if (names.length > 2) {
        const lastNames = names.slice(-2);
        const firstNames = names.slice(0, -2);
        return `${firstNames.join(', ')}, ${lastNames[0]} and ${lastNames[1]}`;
      }
      return '';
    };

    return (
      <div className="min-h-screen bg-white flex flex-col">
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center max-w-2xl mx-auto px-6">
            <p className="text-xl text-gray-500">
              {isApprovingAll ? 'Approving' : 'Approved'} {formatNames(approvedGuestNames)}
            </p>
          </div>
        </div>
        {!isApprovingAll && (
          <div className="pb-8 flex justify-center">
            <button
              onClick={() => {
                setShowApprovalConfirmation(false);
                setApprovedGuestNames([]);
              }}
              className="px-4 py-2 bg-gray-100 text-black rounded-full text-sm hover:bg-gray-200 transition-colors"
            >
              Return
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-white">
        {/* Header */}
        <div className="p-6">
          <div className="max-w-4xl mx-auto">
            <button
              onClick={() => router.push('/dj/dashboard')}
              className="text-gray-600 hover:text-black transition-colors mb-4 text-sm"
            >
              ← Dashboard
            </button>
            <h1 className="text-2xl font-light mb-1">{eventInfo.name}</h1>
            <p className="text-gray-600 mb-1">{eventInfo.date}</p>
            {eventInfo.otherDJs && eventInfo.otherDJs.length > 0 && (
              <p className="text-sm text-gray-500">With {eventInfo.otherDJs.join(', ')}</p>
            )}
          </div>
        </div>

        <div className="max-w-4xl mx-auto p-6">
          {/* Event Summary */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-4">Guest List Overview</h2>
            <div className="mb-4">
              <div className="relative">
                <div className="bg-gray-200 rounded-full h-4 relative overflow-hidden">
                  <div
                    className="bg-black h-4 rounded-full transition-all duration-300 relative"
                    style={{ width: `${(spotsUsed / eventInfo.totalCapacity) * 100}%` }}
                  >
                    <span className="absolute right-2 top-1/2 -translate-y-1/2 text-white text-[10px]">
                      {spotsUsed}
                    </span>
                  </div>
                  <span className="absolute right-2 top-1/2 -translate-y-1/2 text-black text-[10px]">
                    {eventInfo.totalCapacity}
                  </span>
                </div>
                <div className="flex justify-between mt-2">
                  <span className="text-xs text-gray-500">Approved</span>
                  <span className="text-xs text-gray-500">List capacity</span>
                </div>
              </div>
            </div>

            {/* Approve All Button */}
            <div className="mb-4">
              {activeTab === 'pending' && pendingCount > 0 ? (
                <button
                  onClick={handleApproveAll}
                  className="w-full px-6 py-3 bg-black text-white rounded-full font-medium hover:bg-gray-900 transition-colors"
                >
                  Approve All Pending
                </button>
              ) : (
                <div className="h-12"></div>
              )}
            </div>

            {/* Search Button */}
            <button
              onClick={() => router.push(`/dj/events/${params.id}/search`)}
              className="w-full px-6 py-3 bg-gray-100 text-black rounded-full font-medium hover:bg-gray-200 transition-colors mb-4"
            >
              Search Guests
            </button>

            {/* Filter Tabs */}
            <div className="flex gap-2">
              <button
                onClick={() => setActiveTab('pending')}
                className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === 'pending'
                    ? 'bg-gray-600 text-white'
                    : 'bg-gray-100 text-black hover:bg-gray-200'
                }`}
              >
                Pending ({pendingCount})
              </button>
              <button
                onClick={() => setActiveTab('approved')}
                className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === 'approved'
                    ? 'bg-gray-400 text-white'
                    : 'bg-gray-100 text-black hover:bg-gray-200'
                }`}
              >
                Approved ({approvedCount})
              </button>
              {deniedCount > 0 && (
                <button
                  onClick={() => setActiveTab('denied')}
                  className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === 'denied'
                      ? 'bg-gray-400 text-white'
                      : 'bg-gray-100 text-black hover:bg-gray-200'
                  }`}
                >
                  Denied ({deniedCount})
                </button>
              )}
            </div>
          </div>

          {/* Guest List */}
          <div className="space-y-4">
            {filteredGuests.length === 0 ? (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium">
                  {activeTab === 'pending' && 'No pending guests'}
                  {activeTab === 'approved' && 'No approved guests'}
                  {activeTab === 'denied' && 'No denied guests'}
                </h3>
              </div>
            ) : (
              filteredGuests.map(guest => (
                <div key={guest.id} className="bg-white border border-gray-200 rounded-xl p-4">
                  <div>
                    {/* Name and Plus Ones */}
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <div className="flex items-center gap-2 min-w-0">
                        <h3 className="text-lg truncate" title={guest.name}>
                          {guest.name}
                        </h3>
                        {guest.plusOnes > 0 && (
                          <span className="text-lg shrink-0">+{guest.plusOnes}</span>
                        )}
                      </div>
                      {/* Plus/Minus Controls - Right side */}
                      {guest.status === 'pending' && (
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => handleUpdatePlusOnes(guest.id, guest.plusOnes - 1)}
                            className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors text-sm"
                            disabled={guest.plusOnes <= 0}
                          >
                            <span className="leading-none">−</span>
                          </button>
                          <button
                            onClick={() => handleUpdatePlusOnes(guest.id, guest.plusOnes + 1)}
                            className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors text-sm"
                          >
                            <span className="leading-none">+</span>
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Instagram Handle */}
                    {guest.instagram && (
                      <a
                        href={`https://instagram.com/${guest.instagram.replace('@', '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-blue-600 hover:text-blue-800 transition-colors mb-2 block truncate"
                        title={guest.instagram}
                      >
                        {guest.instagram}
                      </a>
                    )}

                    {/* Status Badge and Action Buttons on same line */}
                    <div className="flex items-center justify-between">
                      <div>
                        {guest.checkedIn && (
                          <span className="bg-white text-black border border-gray-300 px-3 py-1 rounded-full text-xs">
                            Checked In
                          </span>
                        )}
                        {guest.status === 'approved' && !guest.checkedIn && (
                          <span className="bg-white text-black border border-gray-300 px-3 py-1 rounded-full text-xs">
                            Approved
                          </span>
                        )}
                        {guest.status === 'pending' && (
                          <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-xs">
                            Pending
                          </span>
                        )}
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-2">
                        {guest.status === 'pending' && (
                          <>
                            <button
                              onClick={() => handleDenyGuest(guest.id)}
                              className="px-3 py-1 bg-white text-black border border-black rounded-full text-xs hover:bg-gray-50 transition-colors"
                            >
                              Deny
                            </button>
                            <button
                              onClick={() => handleApproveGuest(guest.id)}
                              disabled={isApproving === guest.id}
                              className="px-3 py-1 bg-black text-white rounded-full text-xs hover:bg-gray-900 transition-colors disabled:opacity-50"
                            >
                              {isApproving === guest.id ? '...' : 'Approve'}
                            </button>
                          </>
                        )}

                        {/* View Details Button for non-pending */}
                        {guest.status !== 'pending' && (
                          <button
                            onClick={() => router.push(`/dj/events/${params.id}/guest/${guest.id}`)}
                            className="px-4 py-1.5 bg-gray-100 text-black rounded-full text-xs hover:bg-gray-200 transition-colors"
                          >
                            View Details
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Toast Notifications */}
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={hideToast}
      />

      {/* Debug Panel */}
      <DebugPanel
        onResetData={debugResetGuests}
        onFillToCapacity={debugFillToCapacity}
        onGenerateRandomGuests={debugAddEdgeCaseGuests}
        onClearStorage={debugClearStorage}
        onToggleLoading={debugToggleLoading}
        onSimulateError={debugSimulateError}
      />

      {/* Explosion Animation */}
      <ExplosionAnimation
        isVisible={showExplosion}
        onAnimationComplete={handleExplosionComplete}
        approvedNames={approvedGuestNames}
        buttonPosition={explosionButtonPos}
      />
    </ErrorBoundary>
  );
}

```


## File: `src/app/dj/events/[id]/search/page.tsx`

```typescript
'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';

interface Guest {
  id: string;
  name: string;
  email: string;
  phone: string;
  instagram?: string;
  plusOnes: number;
  status: 'pending' | 'approved' | 'denied';
  checkedIn: boolean;
  submittedAt: string;
}

interface EventInfo {
  id: string;
  name: string;
  date: string;
}

export default function DJEventSearchPage() {
  const [eventInfo, setEventInfo] = useState<EventInfo | null>(null);
  const [guests, setGuests] = useState<Guest[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const params = useParams();

  useEffect(() => {
    // Check authentication
    const isAuthenticated = localStorage.getItem('dj_authenticated');
    if (!isAuthenticated) {
      router.push('/dj/login');
      return;
    }

    // Mock data - in real app, fetch from API using params.id
    setTimeout(() => {
      setEventInfo({
        id: params.id as string,
        name: 'Saturday Night Sessions',
        date: 'Saturday, July 6, 2025',
      });

      let mockGuests = [
        {
          id: '1',
          name: 'Sarah Johnson',
          email: 'sarah@example.com',
          phone: '+1 (555) 123-4567',
          instagram: '@sarahj',
          plusOnes: 2,
          status: 'pending' as const,
          checkedIn: false,
          submittedAt: '2 hours ago',
        },
        {
          id: '2',
          name: 'Mike Chen',
          email: 'mike@example.com',
          phone: '+1 (555) 234-5678',
          plusOnes: 1,
          status: 'pending' as const,
          checkedIn: false,
          submittedAt: '4 hours ago',
        },
        {
          id: '3',
          name: 'Alex Rivera',
          email: 'alex@example.com',
          phone: '+1 (555) 345-6789',
          instagram: '@alexr',
          plusOnes: 0,
          status: 'approved' as const,
          checkedIn: true,
          submittedAt: '1 day ago',
        },
        {
          id: '4',
          name: 'Jamie Smith',
          email: 'jamie@example.com',
          phone: '+1 (555) 456-7890',
          plusOnes: 3,
          status: 'approved' as const,
          checkedIn: false,
          submittedAt: '1 day ago',
        },
        {
          id: '5',
          name: 'Taylor Brown',
          email: 'taylor@example.com',
          phone: '+1 (555) 567-8901',
          instagram: '@tbrown',
          plusOnes: 1,
          status: 'denied' as const,
          checkedIn: false,
          submittedAt: '3 days ago',
        },
      ];

      // Apply any status updates from localStorage
      const storedGuests = localStorage.getItem('event_guests');
      if (storedGuests) {
        const guestUpdates = JSON.parse(storedGuests);
        mockGuests = mockGuests.map(guest => {
          const guestUpdate = guestUpdates[guest.id];
          if (guestUpdate) {
            return { ...guest, ...guestUpdate };
          }
          return guest;
        });
      }

      setGuests(mockGuests);

      setIsLoading(false);
    }, 1000);
  }, [router, params.id]);

  const filteredGuests = guests.filter(
    guest =>
      guest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (guest.instagram && guest.instagram.toLowerCase().includes(searchQuery.toLowerCase())) ||
      guest.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
          <p className="text-gray-600">Loading guests...</p>
        </div>
      </div>
    );
  }

  if (!eventInfo) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-red-600">Event not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="p-6">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => router.push(`/dj/events/${params.id}/manage`)}
            className="text-gray-600 hover:text-black transition-colors mb-4 text-sm"
          >
            ← Back to Guest List
          </button>
          <h1 className="text-2xl font-light mb-2">Search Guests</h1>
          <p className="text-gray-600">{eventInfo.name}</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6">
        {/* Search Input */}
        <div className="mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Search by name, IG or email"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 border border-gray-200 rounded-full text-sm focus:outline-none focus:border-black transition-colors"
              autoFocus
            />
          </div>
          {searchQuery && (
            <p className="text-xs text-gray-600 mt-2">
              {filteredGuests.length} guest{filteredGuests.length !== 1 ? 's' : ''} found
            </p>
          )}
        </div>

        {/* Results */}
        <div className="space-y-4">
          {searchQuery === '' ? (
            <div className="text-center py-12">
              <h3 className="text-lg mb-2">Start typing to search guests</h3>
            </div>
          ) : filteredGuests.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium mb-2">No guests found</h3>
              <p className="text-gray-600">Try searching with a different term</p>
            </div>
          ) : (
            filteredGuests.map(guest => (
              <button
                key={guest.id}
                onClick={() => router.push(`/dj/events/${params.id}/guest/${guest.id}`)}
                className="w-full bg-white border border-gray-200 rounded-xl p-6 hover:border-gray-300 transition-colors text-left"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="text-lg font-semibold">{guest.name}</h3>
                      {guest.checkedIn && (
                        <span className="bg-black text-white px-2 py-1 rounded text-xs font-semibold">
                          Checked In
                        </span>
                      )}
                      {guest.status === 'approved' && !guest.checkedIn && (
                        <span className="bg-black text-white px-2 py-1 rounded text-xs font-semibold">
                          Approved
                        </span>
                      )}
                      {guest.status === 'pending' && (
                        <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded text-xs font-semibold">
                          Pending
                        </span>
                      )}
                      {guest.status === 'denied' && (
                        <span className="bg-white text-black border border-black px-2 py-1 rounded text-xs font-semibold">
                          Denied
                        </span>
                      )}
                    </div>

                    {guest.instagram && <p className="text-sm text-gray-600">{guest.instagram}</p>}
                  </div>

                  <div className="flex items-center gap-4">
                    {/* Plus Ones Display */}
                    {guest.plusOnes > 0 && (
                      <span className="text-sm text-gray-600">+{guest.plusOnes}</span>
                    )}

                    {/* Arrow Icon */}
                    <svg
                      className="w-5 h-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </div>
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

```


## File: `src/app/dj/events/[id]/share/page.tsx`

```typescript
'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter, useParams } from 'next/navigation';

interface EventInfo {
  id: string;
  name: string;
  date: string;
  venue: string;
  spotsUsed: number;
  totalSpots: number;
}

export default function DJEventSharePage() {
  const [eventInfo, setEventInfo] = useState<EventInfo | null>(null);
  const [eventLink, setEventLink] = useState('');
  const [qrCodeData, setQrCodeData] = useState('');
  const [copyMessage, setCopyMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const qrCanvasRef = useRef<HTMLCanvasElement>(null);
  const router = useRouter();
  const params = useParams();

  useEffect(() => {
    // Check authentication
    const isAuthenticated = localStorage.getItem('dj_authenticated');
    if (!isAuthenticated) {
      router.push('/dj/login');
      return;
    }

    // Mock data - in real app, fetch from API using params.id
    setTimeout(() => {
      const mockEventInfo = {
        id: params.id as string,
        name: 'Saturday Night Sessions',
        date: 'Saturday, July 6, 2025',
        venue: 'Nightlist',
        spotsUsed: 23,
        totalSpots: 75,
      };

      const mockEventLink = `https://nightlist.app/guest/signup?event=${params.id}&dj=shadow`;

      setEventInfo(mockEventInfo);
      setEventLink(mockEventLink);
      setQrCodeData(mockEventLink);
      setIsLoading(false);

      // Generate QR code (simplified version - in real app, use a QR library)
      generateSimpleQR(mockEventLink);
    }, 1000);
  }, [router, params.id]);

  const generateSimpleQR = (text: string) => {
    const canvas = qrCanvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Simple placeholder QR code visualization
    canvas.width = 200;
    canvas.height = 200;

    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, 200, 200);

    ctx.fillStyle = '#ffffff';
    ctx.fillRect(10, 10, 180, 180);

    ctx.fillStyle = '#000000';
    ctx.font = '12px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('QR CODE', 100, 100);
    ctx.fillText('(Generated)', 100, 120);
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(eventLink);
      setCopyMessage('Link copied to clipboard!');
      setTimeout(() => setCopyMessage(''), 3000);
    } catch (err) {
      setCopyMessage('Failed to copy link');
      setTimeout(() => setCopyMessage(''), 3000);
    }
  };

  const handleShare = async (platform: 'sms' | 'whatsapp' | 'instagram' | 'native') => {
    const shareText = `${eventInfo?.name} is happening on ${eventInfo?.date} at ${eventInfo?.venue}. Join the guest list: ${eventLink}`;

    switch (platform) {
      case 'sms':
        window.open(`sms:?body=${encodeURIComponent(shareText)}`);
        break;
      case 'whatsapp':
        window.open(`https://wa.me/?text=${encodeURIComponent(shareText)}`);
        break;
      case 'instagram':
        // Instagram sharing would typically require their API
        setCopyMessage('Copy the link to share on Instagram Stories');
        handleCopyLink();
        break;
      case 'native':
        if (navigator.share) {
          try {
            await navigator.share({
              title: eventInfo?.name,
              text: shareText,
              url: eventLink,
            });
          } catch (err) {
            console.log('Sharing cancelled');
          }
        } else {
          handleCopyLink();
        }
        break;
    }
  };

  const downloadQRCode = () => {
    const canvas = qrCanvasRef.current;
    if (!canvas) return;

    const link = document.createElement('a');
    link.download = `${eventInfo?.name}-qr-code.png`;
    link.href = canvas.toDataURL();
    link.click();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
          <p className="text-gray-600">Loading event...</p>
        </div>
      </div>
    );
  }

  if (!eventInfo) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-red-600">Event not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-black text-white p-6">
        <div className="max-w-2xl mx-auto">
          <button
            onClick={() => router.push('/dj/dashboard')}
            className="text-gray-400 hover:text-white transition-colors mb-4 text-sm"
          >
            ← Dashboard
          </button>
          <h1 className="text-2xl font-light mb-2">Share Event Link</h1>
          <p className="text-gray-300">{eventInfo.name}</p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto p-6">
        {/* Event Details */}
        <div className="bg-gray-50 rounded-xl p-6 mb-6">
          <div className="space-y-2 text-sm text-gray-600 mb-4">
            <p>{eventInfo.date}</p>
            <p>{eventInfo.venue}</p>
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-600 mb-4">
              Active signups: <strong>{eventInfo.spotsUsed}</strong>
            </p>
          </div>
        </div>

        {/* Event Link */}
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-4">Event Link</h3>
          <div className="bg-gray-50 rounded-xl p-4 mb-4">
            <div className="flex items-center gap-2 mb-2">
              <input
                type="text"
                value={eventLink}
                readOnly
                className="flex-1 bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm font-mono"
              />
              <button
                onClick={handleCopyLink}
                className="px-4 py-2 bg-black text-white rounded-lg font-medium hover:bg-gray-900 transition-colors text-sm"
              >
                Copy
              </button>
            </div>
            {copyMessage && (
              <p
                className={`text-sm ${copyMessage.includes('Failed') ? 'text-red-600' : 'text-black'}`}
              >
                {copyMessage}
              </p>
            )}
          </div>

          <div className="text-center">
            <button
              onClick={() => handleShare('native')}
              className="w-full bg-black text-white py-4 rounded-xl font-medium text-lg hover:bg-gray-900 transition-colors"
            >
              Share Event
            </button>
          </div>
        </div>

        {/* Capacity Chart */}
        <div>
          <h3 className="text-lg font-medium mb-4">Event Capacity</h3>
          <div className="relative">
            <div className="bg-gray-200 rounded-full h-3 relative overflow-hidden">
              <div
                className="bg-black h-3 rounded-full transition-all duration-300 relative"
                style={{ width: `${(eventInfo.spotsUsed / eventInfo.totalSpots) * 100}%` }}
              >
                <span className="absolute right-2 top-1/2 -translate-y-1/2 text-white text-sm font-semibold">
                  {eventInfo.spotsUsed}
                </span>
              </div>
              <span className="absolute right-2 top-1/2 -translate-y-1/2 text-black text-sm font-semibold">
                {eventInfo.totalSpots}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

```


## File: `src/app/dj/invite/page.tsx`

```typescript
'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

interface EventInfo {
  id: string;
  name: string;
  date: string;
  venue: string;
  otherDJs: string[];
}

function DJInvitePageContent() {
  const [eventInfo, setEventInfo] = useState<EventInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Get invitation token from URL
    const token = searchParams.get('token');
    if (!token) {
      setError('Invalid invitation link');
      setIsLoading(false);
      return;
    }

    // Simulate fetching event details from invitation token
    setTimeout(() => {
      setEventInfo({
        id: 'evt_123',
        name: 'Saturday Night Sessions',
        date: 'Saturday, July 6, 2025',
        venue: 'Nightlist',
        otherDJs: ['DJ Shadow', 'MC Groove'],
      });
      setIsLoading(false);
    }, 1000);
  }, [searchParams]);

  const handleAcceptInvite = () => {
    // Navigate to DJ signup flow
    router.push('/dj/signup?event=' + eventInfo?.id);
  };

  const handleDeclineInvite = () => {
    // Handle decline (could show confirmation)
    setError('Invitation declined');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
          <p className="text-gray-600">Loading invitation...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-6">
        <div className="w-full max-w-md text-center">
          <div className="text-4xl mb-4">❌</div>
          <h1 className="text-2xl font-light mb-4">Invalid Invitation</h1>
          <p className="text-gray-600 mb-8">{error}</p>
          <button
            onClick={() => window.close()}
            className="bg-black text-white px-6 py-3 rounded-xl font-medium hover:bg-gray-900 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-black text-white p-6">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-3xl font-light tracking-tight mb-2">Nightlist</h1>
          <p className="text-gray-300">DJ Performance Invitation</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-2xl mx-auto p-6">
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">🎧</div>
          <h2 className="text-2xl font-light mb-2">You're Invited to Perform!</h2>
          <p className="text-gray-600">You've been invited to DJ at the following event:</p>
        </div>

        {/* Event Details Card */}
        <div className="bg-gray-50 rounded-xl p-6 mb-8">
          <h3 className="text-xl font-semibold mb-4">{eventInfo?.name}</h3>

          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Date:</span>
              <span className="font-medium">{eventInfo?.date}</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-600">Venue:</span>
              <span className="font-medium">{eventInfo?.venue}</span>
            </div>

            {eventInfo?.otherDJs && eventInfo.otherDJs.length > 0 && (
              <div className="flex justify-between items-start">
                <span className="text-gray-600">Other DJs:</span>
                <div className="text-right">
                  {eventInfo.otherDJs.map((dj, index) => (
                    <div key={index} className="font-medium">
                      {dj}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Benefits Section */}
        <div className="mb-8">
          <h4 className="text-lg font-medium mb-4">What you get:</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white border border-gray-200 rounded-xl p-4">
              <div className="text-2xl mb-2">👥</div>
              <h5 className="font-medium mb-1">Guest List Access</h5>
              <p className="text-sm text-gray-600">Manage up to 75 guests for your performance</p>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-4">
              <div className="text-2xl mb-2">📊</div>
              <h5 className="font-medium mb-1">Performance Analytics</h5>
              <p className="text-sm text-gray-600">Track your draw and guest conversion rates</p>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-4">
              <div className="text-2xl mb-2">📱</div>
              <h5 className="font-medium mb-1">Easy Sharing</h5>
              <p className="text-sm text-gray-600">
                Share event links via social media and messaging
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-4">
              <div className="text-2xl mb-2">⚡</div>
              <h5 className="font-medium mb-1">Quick Approval</h5>
              <p className="text-sm text-gray-600">Batch approve guests with one click</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          <button
            onClick={handleAcceptInvite}
            className="w-full bg-black text-white py-4 rounded-xl font-medium text-lg hover:bg-gray-900 transition-colors"
          >
            Accept Invitation & Create Account
          </button>

          <button
            onClick={handleDeclineInvite}
            className="w-full bg-white text-black border-2 border-black py-4 rounded-xl font-medium hover:bg-gray-50 transition-colors"
          >
            Decline Invitation
          </button>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            Need help? Contact the venue manager who sent this invitation.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function DJInvitePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-white flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
            <p className="text-gray-600">Loading invitation...</p>
          </div>
        </div>
      }
    >
      <DJInvitePageContent />
    </Suspense>
  );
}

```


## File: `src/app/dj/login/page.tsx`

```typescript
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function DJLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetMessage, setResetMessage] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Mock validation - detect user type from credentials
      if (email === 'dj@test.com' && password === 'password123') {
        // DJ credentials
        localStorage.setItem('dj_authenticated', 'true');
        localStorage.setItem('dj_email', email);
        router.push('/dj/dashboard');
      } else if (email === 'staff@test.com' && password === 'password123') {
        // Staff credentials
        localStorage.setItem('staff_authenticated', 'true');
        localStorage.setItem('staff_email', email);
        router.push('/staff/dashboard');
      } else if (email === 'promoter@test.com' && password === 'password123') {
        // Promoter credentials
        localStorage.setItem('promoter_authenticated', 'true');
        localStorage.setItem('promoter_email', email);
        router.push('/promoter/dashboard');
      } else {
        setError('Invalid email or password');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setResetMessage('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setResetMessage('Password reset link sent to your email!');
      setResetEmail('');
    } catch (err) {
      setResetMessage('Failed to send reset email. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (showForgotPassword) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-light tracking-tight mb-2">Nightlist</h1>
            <h2 className="text-xl font-light mb-4">Reset Password</h2>
            <p className="text-gray-600">Enter your email to receive a reset link</p>
          </div>

          {/* Reset Form */}
          <form onSubmit={handleForgotPassword} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
              <input
                type="email"
                value={resetEmail}
                onChange={e => setResetEmail(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-black transition-colors"
                placeholder="your@email.com"
                required
              />
            </div>

            {resetMessage && (
              <div
                className={`p-3 rounded-xl ${
                  resetMessage.includes('Failed')
                    ? 'bg-red-50 text-red-700 border border-red-200'
                    : 'bg-green-50 text-green-700 border border-green-200'
                }`}
              >
                {resetMessage}
              </div>
            )}

            <div className="space-y-3">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-black text-white py-3 rounded-xl font-medium hover:bg-gray-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Sending...
                  </div>
                ) : (
                  'Send Reset Link'
                )}
              </button>

              <button
                type="button"
                onClick={() => setShowForgotPassword(false)}
                className="w-full bg-white text-black border-2 border-black py-3 rounded-xl font-medium hover:bg-gray-50 transition-colors"
              >
                Back to Login
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-light tracking-tight mb-2">Nightlist</h1>
          <h2 className="text-xl font-light mb-4">Login</h2>
          <p className="text-gray-600">Access your events and guest lists</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-black transition-colors"
              placeholder="your@email.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-black transition-colors"
              placeholder="Enter your password"
              required
            />
          </div>

          {error && (
            <div className="bg-red-50 text-red-700 p-3 rounded-xl border border-red-200">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-black text-white py-3 rounded-xl font-medium hover:bg-gray-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                Signing in...
              </div>
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        {/* Forgot Password */}
        <div className="text-center mt-6">
          <button
            onClick={() => setShowForgotPassword(true)}
            className="text-black font-medium hover:underline"
          >
            Forgot your password?
          </button>
        </div>

        {/* Sign Up Link */}
        <div className="text-center mt-8 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            Don't have an account?{' '}
            <button
              onClick={() => router.push('/dj/signup')}
              className="text-black font-medium hover:underline"
            >
              Sign up here
            </button>
          </p>
        </div>

        {/* Demo Credentials */}
        <div className="mt-8 p-4 bg-gray-50 rounded-xl">
          <h4 className="font-medium text-sm mb-2">Demo Credentials:</h4>
          <div className="space-y-2">
            <div>
              <p className="text-xs text-gray-600">DJ: dj@test.com / password123</p>
            </div>
            <div>
              <p className="text-xs text-gray-600">Staff: staff@test.com / password123</p>
            </div>
            <div>
              <p className="text-xs text-gray-600">Promoter: promoter@test.com / password123</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

```


## File: `src/app/dj/signup/page.tsx`

```typescript
'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

interface FormData {
  djName: string;
  givenName: string;
  email: string;
  phone: string;
  instagram: string;
  password: string;
  confirmPassword: string;
}

interface EventInfo {
  id: string;
  name: string;
  date: string;
}

function DJSignupPageContent() {
  const [formData, setFormData] = useState<FormData>({
    djName: '',
    givenName: '',
    email: '',
    phone: '',
    instagram: '',
    password: '',
    confirmPassword: '',
  });
  const [eventInfo, setEventInfo] = useState<EventInfo | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [step, setStep] = useState(1);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const eventId = searchParams.get('event');
    if (eventId) {
      // Simulate fetching event info
      setEventInfo({
        id: eventId,
        name: 'Saturday Night Sessions',
        date: 'Saturday, July 6, 2025',
      });
    }
  }, [searchParams]);

  const validateStep1 = () => {
    const newErrors: Partial<FormData> = {};

    if (!formData.djName.trim()) {
      newErrors.djName = 'DJ/Stage name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }

    if (!formData.instagram.trim()) {
      newErrors.instagram = 'Instagram handle is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors: Partial<FormData> = {};

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleNextStep = () => {
    if (validateStep1()) {
      setStep(2);
    }
  };

  const handleSubmit = async () => {
    if (!validateStep2()) return;

    setIsLoading(true);

    try {
      // Simulate API call to create DJ account
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Redirect to email verification or login
      router.push('/dj/verify-email?email=' + encodeURIComponent(formData.email));
    } catch (error) {
      console.error('Signup failed:', error);
      setErrors({ email: 'An error occurred. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInstagramChange = (value: string) => {
    // Auto-format Instagram handle
    let formatted = value.replace(/[^a-zA-Z0-9._]/g, '');
    if (formatted && !formatted.startsWith('@')) {
      formatted = '@' + formatted;
    }
    handleInputChange('instagram', formatted);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-black text-white p-6">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-light tracking-tight mb-2">Nightlist</h1>
          <p className="text-gray-300">
            {eventInfo ? `Create account for ${eventInfo.name}` : 'Create DJ Account'}
          </p>
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="max-w-2xl mx-auto p-6">
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center space-x-4">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                step >= 1 ? 'bg-black text-white' : 'bg-gray-200 text-gray-500'
              }`}
            >
              1
            </div>
            <div className={`h-1 w-16 ${step >= 2 ? 'bg-black' : 'bg-gray-200'}`}></div>
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                step >= 2 ? 'bg-black text-white' : 'bg-gray-200 text-gray-500'
              }`}
            >
              2
            </div>
          </div>
        </div>

        {/* Step 1: Personal Information */}
        {step === 1 && (
          <div>
            <div className="text-center mb-8">
              <h2 className="text-2xl font-light mb-2">Tell us about yourself</h2>
              <p className="text-gray-600">
                We need some basic information to set up your DJ profile
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  DJ/Stage Name *
                </label>
                <input
                  type="text"
                  value={formData.djName}
                  onChange={e => handleInputChange('djName', e.target.value)}
                  className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:border-black transition-colors ${
                    errors.djName ? 'border-red-500' : 'border-gray-200'
                  }`}
                  placeholder="DJ Shadow"
                />
                {errors.djName && <p className="text-red-500 text-sm mt-1">{errors.djName}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Given Name (Optional)
                </label>
                <input
                  type="text"
                  value={formData.givenName}
                  onChange={e => handleInputChange('givenName', e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-black transition-colors"
                  placeholder="John Smith"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={e => handleInputChange('email', e.target.value)}
                  className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:border-black transition-colors ${
                    errors.email ? 'border-red-500' : 'border-gray-200'
                  }`}
                  placeholder="dj@example.com"
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={e => handleInputChange('phone', e.target.value)}
                  className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:border-black transition-colors ${
                    errors.phone ? 'border-red-500' : 'border-gray-200'
                  }`}
                  placeholder="+1 (555) 123-4567"
                />
                {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Instagram Handle *
                </label>
                <input
                  type="text"
                  value={formData.instagram}
                  onChange={e => handleInstagramChange(e.target.value)}
                  className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:border-black transition-colors ${
                    errors.instagram ? 'border-red-500' : 'border-gray-200'
                  }`}
                  placeholder="@djshadow"
                />
                {errors.instagram && (
                  <p className="text-red-500 text-sm mt-1">{errors.instagram}</p>
                )}
              </div>
            </div>

            <button
              onClick={handleNextStep}
              className="w-full mt-8 bg-black text-white py-4 rounded-xl font-medium text-lg hover:bg-gray-900 transition-colors"
            >
              Continue
            </button>
          </div>
        )}

        {/* Step 2: Create Password */}
        {step === 2 && (
          <div>
            <div className="text-center mb-8">
              <h2 className="text-2xl font-light mb-2">Create your password</h2>
              <p className="text-gray-600">Choose a secure password for your account</p>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Password *</label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={e => handleInputChange('password', e.target.value)}
                  className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:border-black transition-colors ${
                    errors.password ? 'border-red-500' : 'border-gray-200'
                  }`}
                  placeholder="Enter password"
                />
                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                <p className="text-gray-500 text-sm mt-1">Must be at least 8 characters</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm Password *
                </label>
                <input
                  type="password"
                  value={formData.confirmPassword}
                  onChange={e => handleInputChange('confirmPassword', e.target.value)}
                  className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:border-black transition-colors ${
                    errors.confirmPassword ? 'border-red-500' : 'border-gray-200'
                  }`}
                  placeholder="Confirm password"
                />
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
                )}
              </div>
            </div>

            {/* Event Info Reminder */}
            {eventInfo && (
              <div className="bg-gray-50 rounded-xl p-4 my-6">
                <h4 className="font-medium mb-2">You're signing up for:</h4>
                <p className="text-gray-600">{eventInfo.name}</p>
                <p className="text-gray-600 text-sm">{eventInfo.date}</p>
              </div>
            )}

            <div className="space-y-4 mt-8">
              <button
                onClick={handleSubmit}
                disabled={isLoading}
                className="w-full bg-black text-white py-4 rounded-xl font-medium text-lg hover:bg-gray-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Creating Account...
                  </div>
                ) : (
                  'Create Account'
                )}
              </button>

              <button
                onClick={() => setStep(1)}
                disabled={isLoading}
                className="w-full bg-white text-black border-2 border-black py-4 rounded-xl font-medium hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                Back
              </button>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="text-center mt-8 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            Already have an account?{' '}
            <button
              onClick={() => router.push('/dj/login')}
              className="text-black font-medium hover:underline"
            >
              Sign in here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function DJSignupPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-white flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
            <p className="text-gray-600">Loading...</p>
          </div>
        </div>
      }
    >
      <DJSignupPageContent />
    </Suspense>
  );
}

```


## File: `src/app/dj/verify-email/page.tsx`

```typescript
'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

function DJVerifyEmailPageContent() {
  const [email, setEmail] = useState('');
  const [isResending, setIsResending] = useState(false);
  const [resendMessage, setResendMessage] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const emailParam = searchParams.get('email');
    if (emailParam) {
      setEmail(decodeURIComponent(emailParam));
    }
  }, [searchParams]);

  const handleResendEmail = async () => {
    setIsResending(true);
    setResendMessage('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setResendMessage('Verification email sent! Check your inbox.');
    } catch (error) {
      setResendMessage('Failed to send email. Please try again.');
    } finally {
      setIsResending(false);
    }
  };

  const handleChangeEmail = () => {
    router.push('/dj/signup');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-black text-white p-6">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-3xl font-light tracking-tight mb-2">Nightlist</h1>
          <p className="text-gray-300">Verify your email address</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-2xl mx-auto p-6">
        <div className="text-center mb-8">
          <div className="text-6xl mb-6">📧</div>
          <h2 className="text-2xl font-light mb-4">Check your email</h2>
          <p className="text-gray-600 mb-4">We've sent a verification link to:</p>
          <p className="text-lg font-medium mb-6">{email}</p>
          <p className="text-gray-600">
            Click the link in the email to verify your account and access your DJ dashboard.
          </p>
        </div>

        {/* Instructions */}
        <div className="bg-gray-50 rounded-xl p-6 mb-8">
          <h3 className="font-medium mb-4">What to do next:</h3>
          <ol className="space-y-2 text-sm text-gray-700">
            <li className="flex items-start gap-2">
              <span className="bg-black text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-medium mt-0.5">
                1
              </span>
              Check your email inbox (and spam folder)
            </li>
            <li className="flex items-start gap-2">
              <span className="bg-black text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-medium mt-0.5">
                2
              </span>
              Click the verification link in the email
            </li>
            <li className="flex items-start gap-2">
              <span className="bg-black text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-medium mt-0.5">
                3
              </span>
              You'll be redirected to your DJ dashboard
            </li>
          </ol>
        </div>

        {/* Resend Section */}
        <div className="text-center">
          <p className="text-gray-600 mb-4">Didn't receive the email?</p>

          {resendMessage && (
            <div
              className={`mb-4 p-3 rounded-xl ${
                resendMessage.includes('Failed')
                  ? 'bg-red-50 text-red-700 border border-red-200'
                  : 'bg-green-50 text-green-700 border border-green-200'
              }`}
            >
              {resendMessage}
            </div>
          )}

          <div className="space-y-3">
            <button
              onClick={handleResendEmail}
              disabled={isResending}
              className="w-full bg-black text-white py-3 rounded-xl font-medium hover:bg-gray-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isResending ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Sending...
                </div>
              ) : (
                'Resend verification email'
              )}
            </button>

            <button
              onClick={handleChangeEmail}
              className="w-full bg-white text-black border-2 border-black py-3 rounded-xl font-medium hover:bg-gray-50 transition-colors"
            >
              Use different email address
            </button>
          </div>
        </div>

        {/* Support */}
        <div className="text-center mt-12 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500 mb-2">Still having trouble?</p>
          <p className="text-sm text-gray-500">
            Contact the venue manager who invited you for assistance.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function DJVerifyEmailPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-white flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
            <p className="text-gray-600">Loading...</p>
          </div>
        </div>
      }
    >
      <DJVerifyEmailPageContent />
    </Suspense>
  );
}

```


## File: `src/app/doorperson/checkin/page.tsx`

```typescript
'use client';

import { useState, useEffect, useCallback, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

interface Guest {
  id: string;
  name: string;
  status: 'regular' | 'vip' | 'banned';
  plus_ones: number;
  checked_in: boolean;
  addedBy?: string;
}

function CheckInContent() {
  const [guest, setGuest] = useState<Guest | null>(null);
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [plusOnes, setPlusOnes] = useState(0);
  const [totalCheckedIn, setTotalCheckedIn] = useState(47);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Check for dark mode preference
    const savedDarkMode = localStorage.getItem('doorperson_dark_mode');
    if (savedDarkMode === 'true') {
      setIsDarkMode(true);
    }

    const guestParam = searchParams.get('guest');
    if (guestParam) {
      try {
        const parsedGuest = JSON.parse(decodeURIComponent(guestParam));
        setGuest(parsedGuest);
        setPlusOnes(parsedGuest.plus_ones);
      } catch (error) {
        console.error('Error parsing guest data:', error);
        router.push('/doorperson/scanner');
      }
    } else {
      router.push('/doorperson/scanner');
    }
  }, [searchParams, router]);

  const handleCheckIn = async () => {
    if (!guest || isLoading) return;

    setIsLoading(true);

    try {
      // Simulate API call to check in guest
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Update guest status
      setGuest({ ...guest, checked_in: true, plus_ones: plusOnes });
      setIsCheckedIn(true);
      setTotalCheckedIn(prev => prev + 1 + plusOnes);
    } catch (error) {
      console.error('Check-in failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleContinue = useCallback(() => {
    router.push('/doorperson/scanner');
  }, [router]);

  const handleBackToList = useCallback(() => {
    router.push('/doorperson/search');
  }, [router]);

  const handleGoBack = useCallback(() => {
    router.push('/doorperson/search');
  }, [router]);

  // Auto-redirect effect for success state
  useEffect(() => {
    if (isCheckedIn) {
      const timer = setTimeout(() => {
        handleContinue();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isCheckedIn, handleContinue]);

  if (!guest) {
    return (
      <div
        className={`min-h-screen ${isDarkMode ? 'bg-black text-white' : 'bg-white text-black'} flex items-center justify-center`}
      >
        <div
          className={`animate-spin rounded-full h-12 w-12 border-b-2 ${isDarkMode ? 'border-white' : 'border-black'}`}
        ></div>
      </div>
    );
  }

  // Handle banned guests
  if (guest.status === 'banned') {
    return (
      <div
        className={`min-h-screen ${isDarkMode ? 'bg-black text-white' : 'bg-white text-black'} flex flex-col items-center justify-center p-6`}
      >
        <div className="w-full max-w-sm text-center">
          <div className="text-6xl mb-6">⚠️</div>
          <h1 className="text-2xl font-bold text-red-600 mb-4">ALERT</h1>
          <div
            className={`${isDarkMode ? 'bg-red-950 border-red-800' : 'bg-red-50 border-red-200'} border rounded-xl p-6 mb-8`}
          >
            <h2 className="text-xl font-semibold mb-2">{guest.name}</h2>
            <p className="text-red-600 text-lg font-semibold mb-4">BANNED</p>
            <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'} text-sm mb-2`}>
              Reason: Aggressive behavior
            </p>
            <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'} text-sm`}>
              Date: May 15, 2024
            </p>
          </div>
          <p className="text-red-600 font-bold text-lg mb-8">DO NOT ADMIT</p>
          <div className="space-y-3">
            <button
              onClick={() => {
                /* Call manager functionality */
              }}
              className="w-full bg-yellow-500 text-white py-4 rounded-xl font-medium hover:bg-yellow-600 transition-colors"
            >
              Call Manager
            </button>
            <button
              onClick={handleGoBack}
              className={`w-full ${isDarkMode ? 'bg-gray-800 text-white border-gray-700 hover:bg-gray-700' : 'bg-white text-black border-black hover:bg-gray-50'} border-2 py-4 rounded-xl font-medium transition-colors`}
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Success state after check-in
  if (isCheckedIn) {
    return (
      <div
        className={`min-h-screen ${isDarkMode ? 'bg-black text-white' : 'bg-white text-black'} flex flex-col items-center justify-center p-6`}
      >
        <div className="w-full max-w-sm text-center">
          <div className="text-6xl text-green-500 mb-6">✓</div>
          <h1 className="text-2xl font-bold text-green-600 mb-8">CHECKED IN</h1>

          <div className={`${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'} rounded-xl p-6 mb-8`}>
            <h2 className="text-xl font-semibold mb-4">
              {guest.name}
              {plusOnes > 0 && (
                <span className={`font-normal ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {' '}
                  +{plusOnes}
                </span>
              )}
            </h2>
            <div className="space-y-2 text-left">
              {guest.status === 'vip' && (
                <div className="flex justify-between">
                  <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>Status:</span>
                  <span className="font-medium">VIP Guest</span>
                </div>
              )}
              {guest.addedBy && (
                <div className="flex justify-between">
                  <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                    Invited by:
                  </span>
                  <span className="font-medium">{guest.addedBy}</span>
                </div>
              )}
            </div>
          </div>

          <div
            className={`${isDarkMode ? 'bg-green-950 border-green-800' : 'bg-green-50 border-green-200'} border rounded-xl p-4 mb-8`}
          >
            <p className={`${isDarkMode ? 'text-green-400' : 'text-green-700'} font-medium`}>
              Total Tonight: {totalCheckedIn}
            </p>
          </div>

          <div className="space-y-3">
            <button
              onClick={handleContinue}
              className={`w-full ${isDarkMode ? 'bg-white text-black hover:bg-gray-100' : 'bg-black text-white hover:bg-gray-900'} py-4 rounded-xl font-medium text-lg transition-colors`}
            >
              Back to Scanner
            </button>
            <button
              onClick={handleBackToList}
              className={`w-full ${isDarkMode ? 'bg-gray-800 text-white border-gray-700 hover:bg-gray-700' : 'bg-white text-black border-black hover:bg-gray-50'} border-2 py-4 rounded-xl font-medium transition-colors`}
            >
              Back to List
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Default check-in confirmation state
  return (
    <div
      className={`min-h-screen ${isDarkMode ? 'bg-black text-white' : 'bg-white text-black'} flex flex-col items-center justify-center p-6`}
    >
      <div className="w-full max-w-sm">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-light mb-2">Confirm Check-In</h1>
        </div>

        {/* Guest Details */}
        <div className={`${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'} rounded-xl p-6 mb-8`}>
          <h2 className="text-xl font-semibold mb-4">
            {guest.name}
            {guest.status === 'vip' && (
              <span
                className={`ml-2 ${isDarkMode ? 'bg-yellow-900 text-yellow-200' : 'bg-yellow-100 text-yellow-800'} px-2 py-1 rounded text-xs font-semibold`}
              >
                VIP
              </span>
            )}
          </h2>

          <div className="space-y-3">
            {guest.addedBy && (
              <div className="flex justify-between items-center">
                <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>Invited by:</span>
                <span className="font-medium">{guest.addedBy}</span>
              </div>
            )}

            <div className="flex items-center justify-between">
              <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'} text-sm`}>
                Edit plus ones:
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setPlusOnes(Math.max(0, plusOnes - 1))}
                  className={`w-8 h-8 ${isDarkMode ? 'bg-gray-800 border-gray-700 hover:bg-gray-700' : 'bg-white border-gray-300 hover:bg-gray-50'} border rounded-lg transition-colors`}
                >
                  -
                </button>
                <span className="font-semibold w-8 text-center">{plusOnes}</span>
                <button
                  onClick={() => setPlusOnes(plusOnes + 1)}
                  className={`w-8 h-8 ${isDarkMode ? 'bg-gray-800 border-gray-700 hover:bg-gray-700' : 'bg-white border-gray-300 hover:bg-gray-50'} border rounded-lg transition-colors`}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={handleCheckIn}
            disabled={isLoading}
            className={`w-full ${isDarkMode ? 'bg-white text-black hover:bg-gray-100' : 'bg-black text-white hover:bg-gray-900'} py-4 rounded-xl font-medium text-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {isLoading ? (
              <div className="flex items-center justify-center gap-2">
                <div
                  className={`animate-spin rounded-full h-5 w-5 border-b-2 ${isDarkMode ? 'border-black' : 'border-white'}`}
                ></div>
                Checking In...
              </div>
            ) : (
              'Check In Guest'
            )}
          </button>

          <button
            onClick={handleGoBack}
            disabled={isLoading}
            className={`w-full ${isDarkMode ? 'bg-gray-800 text-white border-gray-700 hover:bg-gray-700' : 'bg-white text-black border-black hover:bg-gray-50'} border-2 py-4 rounded-xl font-medium transition-colors disabled:opacity-50`}
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}

export default function CheckInPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-black text-white flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
        </div>
      }
    >
      <CheckInContent />
    </Suspense>
  );
}

```


## File: `src/app/doorperson/login/page.tsx`

```typescript
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function DoorpersonLoginPage() {
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleKeyPress = (key: string) => {
    if (key === 'delete') {
      setPin(pin.slice(0, -1));
      setError('');
    } else if (pin.length < 4) {
      setPin(pin + key);
      setError('');
    }
  };

  const handleLogin = async () => {
    if (pin.length !== 4) {
      setError('Please enter a 4-digit PIN');
      return;
    }

    setIsLoading(true);

    try {
      // TODO: Replace with actual authentication
      // For now, accept any 4-digit PIN
      if (pin === '1234' || pin === '0000' || pin.length === 4) {
        // Store doorperson session
        localStorage.setItem('doorperson_authenticated', 'true');
        router.push('/doorperson/scanner');
      } else {
        setError('Invalid PIN code');
        setPin('');
      }
    } catch {
      setError('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-black flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-sm">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-light tracking-tight mb-2">Nightlist</h1>
          <p className="text-gray-600 text-base">Log in to scanner</p>
        </div>

        {/* PIN Display */}
        <div className="text-center mb-8">
          <div className="flex justify-center gap-4 mb-4">
            {[0, 1, 2, 3].map(index => (
              <div
                key={index}
                className="w-4 h-4 rounded-full border-2 border-gray-300 flex items-center justify-center"
              >
                {pin[index] && <div className="w-2 h-2 bg-black rounded-full" />}
              </div>
            ))}
          </div>
          {error && <p className="text-red-600 text-sm mb-4">{error}</p>}
        </div>

        {/* PIN Keypad */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
            <button
              key={num}
              onClick={() => handleKeyPress(num.toString())}
              className="aspect-square bg-white border-2 border-black rounded-xl text-xl font-medium hover:bg-gray-50 transition-colors active:scale-95"
              disabled={isLoading}
            >
              {num}
            </button>
          ))}
          <div></div>
          <button
            onClick={() => handleKeyPress('0')}
            className="aspect-square bg-white border-2 border-black rounded-xl text-xl font-medium hover:bg-gray-50 transition-colors active:scale-95"
            disabled={isLoading}
          >
            0
          </button>
          <button
            onClick={() => handleKeyPress('delete')}
            className="aspect-square bg-white border-2 border-black rounded-xl text-xl font-medium hover:bg-gray-50 transition-colors active:scale-95"
            disabled={isLoading}
          >
            ⌫
          </button>
        </div>

        {/* Login Button */}
        <button
          onClick={handleLogin}
          disabled={pin.length !== 4 || isLoading}
          className="w-full bg-black text-white py-4 rounded-xl font-medium text-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-900 transition-colors"
        >
          {isLoading ? 'Logging in...' : 'Login'}
        </button>

        {/* Emergency Contact */}
        <div className="text-center mt-8 text-gray-500 text-sm">
          <p>Locked out? Contact manager</p>
        </div>
      </div>
    </div>
  );
}

```


## File: `src/app/doorperson/scanner/page.tsx`

```typescript
'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import QrScanner from 'qr-scanner';

interface Guest {
  id: string;
  name: string;
  status: 'regular' | 'vip' | 'banned';
  plus_ones: number;
  checked_in: boolean;
}

interface LastCheckInInfo {
  name: string;
  plusOnes: number;
  addedBy: string;
  time: string;
}

export default function QRScannerPage() {
  const [totalCheckedIn] = useState(47);
  const [lastCheckIn, setLastCheckIn] = useState<LastCheckInInfo>({
    name: 'Sarah Johnson',
    plusOnes: 2,
    addedBy: 'DJ Shadow',
    time: '9:45 PM',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showLastCheckInModal, setShowLastCheckInModal] = useState(false);
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const qrScannerRef = useRef<QrScanner | null>(null);

  useEffect(() => {
    // Check if doorperson is authenticated
    const isAuthenticated = localStorage.getItem('doorperson_authenticated');
    if (!isAuthenticated) {
      router.push('/doorperson/login');
      return;
    }

    // Check for dark mode preference
    const savedDarkMode = localStorage.getItem('doorperson_dark_mode');
    if (savedDarkMode === 'true') {
      setIsDarkMode(true);
    }

    // Start camera and QR scanner when component mounts
    startCamera();

    return () => {
      // Cleanup camera and QR scanner when component unmounts
      if (qrScannerRef.current) {
        qrScannerRef.current.destroy();
      }
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, [router]);

  const startCamera = async () => {
    try {
      if (!videoRef.current) {
        console.error('Video element not found');
        return;
      }

      // Create QR scanner instance
      qrScannerRef.current = new QrScanner(
        videoRef.current,
        result => handleQRCodeDetected(result.data),
        {
          preferredCamera: 'environment', // Use back camera on mobile
          highlightScanRegion: false, // We'll use our own scan overlay
          highlightCodeOutline: false,
          maxScansPerSecond: 5,
        }
      );

      // Start the scanner
      await qrScannerRef.current.start();
      setError('');
    } catch (err) {
      console.error('Error starting QR scanner:', err);
      setError('Camera access denied. Please enable camera permissions.');
    }
  };

  const handleManualSearch = () => {
    router.push('/doorperson/search');
  };

  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    localStorage.setItem('doorperson_dark_mode', newDarkMode.toString());
  };

  const handleLogout = () => {
    localStorage.removeItem('doorperson_authenticated');
    router.push('/doorperson/login');
  };

  const handleQRCodeDetected = async (qrData: string) => {
    if (isLoading) return;

    setIsLoading(true);

    try {
      // Parse the QR code data
      const guestData = JSON.parse(qrData);

      // Validate guest data structure
      if (!guestData.id || !guestData.name) {
        throw new Error('Invalid QR code format');
      }

      // Update last check-in info
      setLastCheckIn({
        name: guestData.name,
        plusOnes: guestData.plus_ones || 0,
        addedBy: guestData.addedBy || 'Scanner',
        time: new Date().toLocaleTimeString('en-US', {
          hour: 'numeric',
          minute: '2-digit',
          hour12: true,
        }),
      });

      // Navigate to check-in confirmation
      router.push(`/doorperson/checkin?guest=${encodeURIComponent(JSON.stringify(guestData))}`);
    } catch (error) {
      console.error('Error processing QR code:', error);
      setError('Invalid QR code. Please try again or use manual search.');
      setIsLoading(false);

      // Clear error after 3 seconds
      setTimeout(() => {
        setError('');
      }, 3000);
    }
  };

  // Fallback click handler for testing
  const handleVideoClick = async () => {
    if (isLoading) return;

    // This is just for testing - in production, only QR detection should work
    const mockGuest: Guest = {
      id: '123',
      name: 'Test Guest (Click)',
      status: 'vip',
      plus_ones: 2,
      checked_in: false,
    };

    handleQRCodeDetected(JSON.stringify(mockGuest));
  };

  return (
    <div
      className={`h-screen ${isDarkMode ? 'bg-black text-white' : 'bg-white text-black'} flex flex-col overflow-hidden`}
    >
      {/* Header */}
      <div
        className={`flex justify-between items-center p-4 border-b ${isDarkMode ? 'border-gray-800' : 'border-gray-200'}`}
      >
        <h1 className="text-xl font-light">Nightlist</h1>
        <button
          onClick={handleLogout}
          className={`${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-black'} transition-colors text-sm`}
        >
          Logout
        </button>
      </div>

      {/* Camera View */}
      <div className="flex-1 relative overflow-hidden min-h-0">
        {error ? (
          <div className="flex-1 flex items-center justify-center p-6">
            <div className="text-center">
              <div className="text-red-600 mb-4 text-4xl">📷</div>
              <p className="text-red-600 mb-4">{error}</p>
              <button
                onClick={() => {
                  setError('');
                  startCamera();
                }}
                className="bg-black text-white px-6 py-3 rounded-xl font-medium hover:bg-gray-900 transition-colors"
              >
                Retry Camera Access
              </button>
            </div>
          </div>
        ) : (
          <div className="relative w-full h-full">
            <video
              ref={videoRef}
              className="w-full h-full object-cover cursor-pointer"
              onClick={handleVideoClick}
            />

            {/* Scan Overlay */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-64 h-64 relative">
                {/* Corner indicators - black */}
                <div className="absolute top-0 left-0 w-12 h-12 border-t-4 border-l-4 border-black rounded-tl-xl"></div>
                <div className="absolute top-0 right-0 w-12 h-12 border-t-4 border-r-4 border-black rounded-tr-xl"></div>
                <div className="absolute bottom-0 left-0 w-12 h-12 border-b-4 border-l-4 border-black rounded-bl-xl"></div>
                <div className="absolute bottom-0 right-0 w-12 h-12 border-b-4 border-r-4 border-black rounded-br-xl"></div>
              </div>
            </div>

            {/* Loading overlay */}
            {isLoading && (
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
                  <p className="text-white">Scanning QR Code...</p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Instruction text below camera */}
      <div className="px-4 py-2">
        <p className={`text-center text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          {error
            ? 'Camera error - please retry'
            : isLoading
              ? 'Processing QR code...'
              : 'Point camera at guest QR code'}
        </p>
      </div>

      {/* Bottom Controls - Compact */}
      <div className="p-4 space-y-3">
        {/* Manual Search Button */}
        <button
          onClick={handleManualSearch}
          className={`w-full ${isDarkMode ? 'bg-gray-800 text-white hover:bg-gray-700' : 'bg-white text-black border-2 border-black hover:bg-gray-50'} py-3 rounded-xl font-medium transition-colors`}
        >
          Manual Search
        </button>

        {/* Stats - Compact boxes */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => setShowLastCheckInModal(true)}
            className={`${isDarkMode ? 'bg-gray-900 hover:bg-gray-800' : 'bg-gray-50 hover:bg-gray-100'} rounded-xl p-3 text-center transition-colors`}
          >
            <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} text-xs block`}>
              Last Check-in
            </span>
            <span className="text-sm font-medium mt-1 block truncate">
              {lastCheckIn.name} ({lastCheckIn.time})
            </span>
          </button>
          <div
            className={`${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'} rounded-xl p-3 text-center`}
          >
            <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} text-xs block`}>
              Total Tonight
            </span>
            <span className="font-semibold text-lg mt-1 block">{totalCheckedIn}</span>
          </div>
        </div>

        {/* Dark Mode Toggle - Smaller */}
        <div className="text-center">
          <button
            onClick={toggleDarkMode}
            className={`text-xs py-1 px-3 rounded-lg transition-colors ${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-black'}`}
          >
            {isDarkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
        </div>
      </div>

      {/* Last Check-in Modal */}
      {showLastCheckInModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div
            className={`${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'} rounded-xl p-6 max-w-sm w-full`}
          >
            <h3 className="text-xl font-medium mb-4">Last Check-in Details</h3>
            <div className="space-y-3">
              <div>
                <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} text-sm`}>
                  Name:
                </span>
                <p className="font-medium">{lastCheckIn.name}</p>
              </div>
              <div>
                <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} text-sm`}>
                  Plus Ones:
                </span>
                <p className="font-medium">{lastCheckIn.plusOnes}</p>
              </div>
              <div>
                <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} text-sm`}>
                  Added By:
                </span>
                <p className="font-medium">{lastCheckIn.addedBy}</p>
              </div>
              <div>
                <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} text-sm`}>
                  Check-in Time:
                </span>
                <p className="font-medium">{lastCheckIn.time}</p>
              </div>
            </div>
            <button
              onClick={() => setShowLastCheckInModal(false)}
              className="w-full mt-6 bg-black text-white py-3 rounded-xl font-medium hover:bg-gray-900 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

```


## File: `src/app/doorperson/search/page.tsx`

```typescript
'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

interface Guest {
  id: string;
  name: string;
  status: 'regular' | 'vip' | 'banned';
  plus_ones: number;
  checked_in: boolean;
  email?: string;
  addedBy?: string;
}

export default function ManualSearchPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [filterBy, setFilterBy] = useState<string>('all'); // 'all', 'DJ Shadow', 'Promoter Mike', etc.
  const [showCheckedIn, setShowCheckedIn] = useState(false);
  const router = useRouter();
  const recognitionRef = useRef<any>(null);

  // Complete mock guest list
  const allGuests: Guest[] = [
    {
      id: '1',
      name: 'Sarah Johnson',
      status: 'vip',
      plus_ones: 2,
      checked_in: false,
      email: 'sarah@example.com',
      addedBy: 'DJ Shadow',
    },
    {
      id: '2',
      name: 'Sam Johnston',
      status: 'regular',
      plus_ones: 1,
      checked_in: false,
      email: 'sam@example.com',
      addedBy: 'Promoter Mike',
    },
    {
      id: '3',
      name: 'Mike Problem',
      status: 'banned',
      plus_ones: 0,
      checked_in: false,
      email: 'mike@example.com',
      addedBy: 'Staff',
    },
    {
      id: '4',
      name: 'Jennifer Smith',
      status: 'vip',
      plus_ones: 3,
      checked_in: true,
      email: 'jen@example.com',
      addedBy: 'Manager',
    },
    {
      id: '5',
      name: 'Alex Chen',
      status: 'regular',
      plus_ones: 0,
      checked_in: false,
      email: 'alex@example.com',
      addedBy: 'DJ Shadow',
    },
    {
      id: '6',
      name: 'Maria Garcia',
      status: 'vip',
      plus_ones: 1,
      checked_in: false,
      email: 'maria@example.com',
      addedBy: 'DJ Tiesto',
    },
    {
      id: '7',
      name: 'David Lee',
      status: 'regular',
      plus_ones: 2,
      checked_in: true,
      email: 'david@example.com',
      addedBy: 'Promoter Sarah',
    },
    {
      id: '8',
      name: 'Emily Wilson',
      status: 'regular',
      plus_ones: 0,
      checked_in: false,
      email: 'emily@example.com',
      addedBy: 'Staff',
    },
  ];

  // Get unique inviters for filter buttons
  const inviters = Array.from(new Set(allGuests.map(g => g.addedBy).filter(Boolean)));

  // Filter and sort guests
  let filteredGuests = searchQuery
    ? allGuests.filter(
        guest =>
          guest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          guest.email?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : allGuests;

  // Apply filters
  if (!showCheckedIn) {
    filteredGuests = filteredGuests.filter(guest => !guest.checked_in);
  }

  if (filterBy !== 'all') {
    filteredGuests = filteredGuests.filter(guest => guest.addedBy === filterBy);
  }

  // Sort alphabetically by name
  filteredGuests.sort((a, b) => a.name.localeCompare(b.name));

  useEffect(() => {
    // Check authentication
    const isAuthenticated = localStorage.getItem('doorperson_authenticated');
    if (!isAuthenticated) {
      router.push('/doorperson/login');
    }

    // Check for dark mode preference
    const savedDarkMode = localStorage.getItem('doorperson_dark_mode');
    if (savedDarkMode === 'true') {
      setIsDarkMode(true);
    }

    // Initialize speech recognition
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition =
        (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setSearchQuery(transcript);
        setIsListening(false);
      };

      recognitionRef.current.onerror = () => {
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
  }, [router]);

  const handleVoiceSearch = () => {
    if (recognitionRef.current && !isListening) {
      // Clear filters when starting voice search
      setFilterBy('all');
      setShowCheckedIn(false);
      setIsListening(true);
      recognitionRef.current.start();
    } else if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  const handleGuestSelect = (guest: Guest) => {
    // Navigate to check-in screen with guest data
    router.push(`/doorperson/checkin?guest=${encodeURIComponent(JSON.stringify(guest))}`);
  };

  const handleBack = () => {
    router.push('/doorperson/scanner');
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-black text-white' : 'bg-white text-black'}`}>
      {/* Header */}
      <div
        className={`flex items-center justify-between p-4 border-b ${isDarkMode ? 'border-gray-800' : 'border-gray-200'}`}
      >
        <button
          onClick={handleBack}
          className={`${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-black'} transition-colors`}
        >
          ← Back
        </button>
        <h1 className="text-xl font-light">Manual Search</h1>
        <div className="w-8"></div>
      </div>

      <div className="p-4">
        {/* Search Input */}
        <div className="mb-4">
          <div className="relative flex gap-2">
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search by name or email..."
              className={`flex-1 ${isDarkMode ? 'bg-gray-900 border-gray-700 text-white' : 'bg-white border-gray-300 text-black'} border-2 rounded-xl px-4 py-4 placeholder-gray-400 focus:outline-none focus:border-black transition-colors`}
              autoFocus
            />
            <button
              onClick={handleVoiceSearch}
              className={`${isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50'} border-2 ${isDarkMode ? 'border-gray-700' : 'border-black'} px-4 rounded-xl transition-colors`}
              aria-label="Voice search"
            >
              {isListening ? (
                <svg
                  className="w-5 h-5 text-red-500 animate-pulse"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                  />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                  />
                </svg>
              )}
            </button>
          </div>
          {isListening && (
            <p className="text-sm text-center mt-2 text-red-500 animate-pulse">
              Listening... Speak now
            </p>
          )}
        </div>

        {/* Filter Buttons */}
        <div className="mb-4 space-y-3">
          {/* Show Checked In Toggle and Guest Count */}
          <div className="flex items-center justify-between">
            <button
              onClick={() => setShowCheckedIn(!showCheckedIn)}
              className={`px-3 py-1 border rounded-lg text-sm font-medium transition-colors ${
                showCheckedIn
                  ? 'bg-black text-white border-black'
                  : isDarkMode
                    ? 'border-gray-600 text-gray-400 hover:border-gray-500'
                    : 'border-gray-300 text-gray-600 hover:border-gray-400'
              }`}
            >
              {showCheckedIn ? 'Hide' : 'Show'} checked in
            </button>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setSearchQuery('')}
                className={`text-sm px-2 py-1 rounded transition-colors ${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-black'}`}
              >
                Clear
              </button>
            </div>
          </div>

          {/* Inviter Filter */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setFilterBy('all')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                filterBy === 'all'
                  ? 'bg-black text-white'
                  : isDarkMode
                    ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All
            </button>
            {inviters.map(inviter => (
              <button
                key={inviter}
                onClick={() => setFilterBy(inviter!)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filterBy === inviter
                    ? 'bg-black text-white'
                    : isDarkMode
                      ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {inviter}
              </button>
            ))}
          </div>
        </div>

        {/* Guest List */}
        <div className="space-y-3 pb-20">
          {filteredGuests.length === 0 ? (
            <div className="text-center py-12">
              <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-2`}>
                No guests found
              </p>
              <p className={`${isDarkMode ? 'text-gray-500' : 'text-gray-400'} text-sm`}>
                Try searching with a different name or email
              </p>
            </div>
          ) : (
            filteredGuests.map(guest => (
              <button
                key={guest.id}
                onClick={() => handleGuestSelect(guest)}
                className={`w-full ${isDarkMode ? 'bg-gray-900 border-gray-800 hover:bg-gray-800' : 'bg-white border-gray-200 hover:bg-gray-50'} border rounded-xl p-4 text-left transition-colors`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-medium">{guest.name}</h3>
                        {guest.status === 'vip' && (
                          <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs font-semibold">
                            VIP
                          </span>
                        )}
                        {guest.status === 'banned' && (
                          <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs font-semibold">
                            BANNED
                          </span>
                        )}
                      </div>
                      {guest.plus_ones > 0 && <span className="text-sm">+{guest.plus_ones}</span>}
                    </div>
                    {guest.addedBy && (
                      <p
                        className={`text-sm ${isDarkMode ? 'text-gray-500' : 'text-gray-400'} mt-1`}
                      >
                        by {guest.addedBy}
                      </p>
                    )}
                  </div>
                  {guest.checked_in && (
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-semibold ml-3">
                      CHECKED IN
                    </span>
                  )}
                </div>

                {/* Warning indicators */}
                {guest.status === 'banned' && (
                  <div className="mt-2 text-red-600 text-sm font-semibold">
                    ⚠️ DO NOT ADMIT - Contact Manager
                  </div>
                )}
              </button>
            ))
          )}
        </div>

        {/* Back Button - Fixed at bottom */}
        <div className="fixed bottom-6 left-4 right-4">
          <button
            onClick={handleBack}
            className={`w-full ${isDarkMode ? 'bg-gray-800 text-white hover:bg-gray-700' : 'bg-white text-black border-2 border-black hover:bg-gray-50'} py-4 rounded-xl font-medium transition-colors`}
          >
            Back to Scanner
          </button>
        </div>
      </div>
    </div>
  );
}

```


## File: `src/app/globals.css`

```css
@import 'tailwindcss';

:root {
  --background: #ffffff;
  --foreground: #171717;
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --font-sans: var(--font-geist-sans);
  --font-mono: var(--font-geist-mono);
}

@media (prefers-color-scheme: dark) {
  :root {
    --background: #0a0a0a;
    --foreground: #ededed;
  }
}

body {
  background: var(--background);
  color: var(--foreground);
  font-family: Arial, Helvetica, sans-serif;
}

/* Custom date input calendar styling */
input[type='date']::-webkit-calendar-picker-indicator {
  cursor: pointer;
}

/* Style the calendar popup to match design spec */
input[type='date']::-webkit-datetime-edit-fields-wrapper {
  padding: 0;
}

input[type='date']::-webkit-datetime-edit-text {
  color: #6b7280;
}

input[type='date']::-webkit-datetime-edit-month-field,
input[type='date']::-webkit-datetime-edit-day-field,
input[type='date']::-webkit-datetime-edit-year-field {
  color: #374151;
}

input[type='date']::-webkit-clear-button {
  display: none;
}

/* Firefox date input styling */
input[type='date']::-moz-clear-button {
  display: none;
}

```


## File: `src/app/guest/auth/page.tsx`

```typescript
'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { GuestAuthService } from '@/lib/auth/guest-auth';
import { useToast, ToastProvider } from '@/components/ui/ToastProvider';
import ErrorBoundary from '@/components/ui/ErrorBoundary';
import { SafeStorage } from '@/lib/utils/safeStorage';

const guestAuth = new GuestAuthService();

function GuestAuthContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { showToast } = useToast();
  const [isLogin, setIsLogin] = useState(false); // Default to signup

  // Debug function
  const handleSignInClick = () => {
    console.log('SIGN IN CLICKED - Before:', isLogin);
    setIsLogin(true);
    console.log('SIGN IN CLICKED - After setting to true');
  };

  const handleSignUpClick = () => {
    console.log('SIGN UP CLICKED - Before:', isLogin);
    setIsLogin(false);
    console.log('SIGN UP CLICKED - After setting to false');
  };
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Event details from URL params or defaults
  const eventName = searchParams.get('event') || 'Summer Vibes';
  const djNames = searchParams.get('dj') || 'DJ Shadow & MC Solar';
  const eventDate = searchParams.get('date') || 'Saturday, June 24, 2025';

  // Form state
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    fullName: '',
    phone: '',
    instagramHandle: '',
  });

  // Input validation
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string): { valid: boolean; message?: string } => {
    if (password.length < 8) {
      return { valid: false, message: 'Password must be at least 8 characters long' };
    }
    if (!/(?=.*[a-z])/.test(password)) {
      return { valid: false, message: 'Password must contain at least one lowercase letter' };
    }
    if (!/(?=.*[A-Z])/.test(password)) {
      return { valid: false, message: 'Password must contain at least one uppercase letter' };
    }
    if (!/(?=.*\d)/.test(password)) {
      return { valid: false, message: 'Password must contain at least one number' };
    }
    return { valid: true };
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Validate inputs
    if (!validateEmail(formData.email)) {
      setError('Please enter a valid email address');
      showToast('Please enter a valid email address', 'error');
      setIsLoading(false);
      return;
    }

    if (!formData.password) {
      setError('Please enter your password');
      showToast('Please enter your password', 'error');
      setIsLoading(false);
      return;
    }

    try {
      const { guest, error } = await guestAuth.loginWithEmail(
        formData.email.trim(),
        formData.password
      );

      if (error) {
        setError(error);
        showToast(error, 'error');
      } else {
        setSuccess('Login successful! Redirecting...');
        showToast('Login successful!', 'success');

        // Use SafeStorage instead of sessionStorage
        SafeStorage.setItem('guestSession', JSON.stringify(guest));

        setTimeout(() => router.push('/guest/dashboard'), 1000);
      }
    } catch (err) {
      const errorMessage = 'Login failed. Please try again.';
      setError(errorMessage);
      showToast(errorMessage, 'error');
      console.error('Login error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Validate inputs
    if (!formData.firstName.trim()) {
      setError('Please enter your first name');
      showToast('Please enter your first name', 'error');
      setIsLoading(false);
      return;
    }

    if (!formData.lastName.trim()) {
      setError('Please enter your last name');
      showToast('Please enter your last name', 'error');
      setIsLoading(false);
      return;
    }

    if (!formData.instagramHandle.trim()) {
      setError('Please enter your Instagram handle');
      showToast('Please enter your Instagram handle', 'error');
      setIsLoading(false);
      return;
    }

    if (!validateEmail(formData.email)) {
      setError('Please enter a valid email address');
      showToast('Please enter a valid email address', 'error');
      setIsLoading(false);
      return;
    }

    const passwordValidation = validatePassword(formData.password);
    if (!passwordValidation.valid) {
      setError(passwordValidation.message!);
      showToast(passwordValidation.message!, 'error');
      setIsLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      showToast('Passwords do not match', 'error');
      setIsLoading(false);
      return;
    }

    // Use the separate first and last name fields
    const firstName = formData.firstName.trim();
    const lastName = formData.lastName.trim();

    try {
      const { guest, error } = await guestAuth.registerWithEmail(
        formData.email.trim(),
        formData.password,
        {
          firstName: firstName,
          lastName: lastName,
          phone: formData.phone.trim() || undefined,
          instagramHandle: formData.instagramHandle.trim(),
        }
      );

      if (error) {
        setError(error);
        showToast(error, 'error');
      } else {
        setSuccess('Account created! Please check your email to verify your account.');
        showToast('Account created successfully!', 'success');
        setTimeout(() => setIsLogin(true), 2000);
      }
    } catch (err) {
      const errorMessage = 'Signup failed. Please try again.';
      setError(errorMessage);
      showToast(errorMessage, 'error');
      console.error('Signup error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    const message = 'Google authentication coming soon!';
    setError(message);
    showToast(message, 'info');
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-4xl px-xl">
      <div className="w-full max-w-md">
        {/* Event Header */}
        <div className="text-center mb-4xl">
          <h1 className="text-4xl font-light mb-lg">Welcome to Nightlist</h1>
          <div className="space-y-sm">
            <p className="text-lg font-light">To get on the list for</p>
            <p className="text-xl">{djNames}</p>
            <p className="text-lg text-gray-600">{eventDate}</p>
          </div>
        </div>

        {/* Auth Card */}
        <div className="card">
          <div className="card-body">
            {/* Google Auth Button */}
            <button
              onClick={handleGoogleAuth}
              className="bg-white text-black border border-gray-300 rounded-full py-3 px-6 text-sm w-full mb-xl hover:bg-gray-50 transition-colors flex items-center justify-center gap-3"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M17.64 9.20454C17.64 8.56636 17.5827 7.95272 17.4764 7.36363H9V10.845H13.8436C13.635 11.97 13.0009 12.9231 12.0477 13.5613V15.8195H14.9564C16.6582 14.2527 17.64 11.9454 17.64 9.20454Z"
                  fill="#4285F4"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M9 18C11.43 18 13.4673 17.1941 14.9564 15.8195L12.0477 13.5613C11.2418 14.1013 10.2109 14.4204 9 14.4204C6.65591 14.4204 4.67182 12.8372 3.96409 10.71H0.957272V13.0418C2.43818 15.9831 5.48182 18 9 18Z"
                  fill="#34A853"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M3.96409 10.71C3.78409 10.17 3.68182 9.59318 3.68182 9C3.68182 8.40682 3.78409 7.83 3.96409 7.29V4.95818H0.957272C0.347727 6.17318 0 7.54773 0 9C0 10.4523 0.347727 11.8268 0.957272 13.0418L3.96409 10.71Z"
                  fill="#FBBC05"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M9 3.57955C10.3214 3.57955 11.5077 4.03364 12.4405 4.92545L15.0218 2.34409C13.4632 0.891818 11.4259 0 9 0C5.48182 0 2.43818 2.01682 0.957272 4.95818L3.96409 7.29C4.67182 5.16273 6.65591 3.57955 9 3.57955Z"
                  fill="#EA4335"
                />
              </svg>
              Continue with Google
            </button>

            {/* Divider */}
            <div className="flex items-center mb-xl">
              <div className="flex-1 border-t border-gray-200"></div>
              <span className="px-lg text-sm text-gray-400">or</span>
              <div className="flex-1 border-t border-gray-200"></div>
            </div>

            {/* Toggle Buttons */}
            <div className="flex mb-6xl border-b border-gray-200">
              <button
                type="button"
                onClick={handleSignUpClick}
                style={{
                  backgroundColor: !isLogin ? '#F3F4F6' : '#FFFFFF',
                  color: !isLogin ? '#000000' : '#000000',
                }}
                className="flex-1 py-3 px-6 text-center text-sm transition-all rounded-t-xl border-l border-t border-r border-gray-200 -mb-px"
              >
                Sign up
              </button>
              <button
                type="button"
                onClick={handleSignInClick}
                style={{
                  backgroundColor: isLogin ? '#4B5563' : '#FFFFFF',
                  color: isLogin ? '#FFFFFF' : '#000000',
                }}
                className="flex-1 py-3 px-6 text-center text-sm transition-all rounded-t-xl border-l border-t border-r border-gray-200 -mb-px"
              >
                Sign In
              </button>
            </div>

            {/* Error/Success Messages */}
            {error && (
              <div className="p-lg mb-lg border border-gray-300 rounded-lg bg-gray-50">
                <p className="text-sm text-gray-700">{error}</p>
              </div>
            )}
            {success && (
              <div className="p-lg mb-lg border border-gray-300 rounded-lg bg-gray-50">
                <p className="text-sm text-gray-700">{success}</p>
              </div>
            )}

            {/* Forms */}
            {isLogin ? (
              /* Login Form */
              <form onSubmit={handleLogin} className="flex flex-col gap-lg">
                <div className="form-group">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    className="px-4 py-2 border border-gray-200 rounded-xl focus:border-black transition-colors w-full"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    className="px-4 py-2 border border-gray-200 rounded-xl focus:border-black transition-colors w-full"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={e => setFormData({ ...formData, password: e.target.value })}
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="bg-black text-white rounded-full py-3 px-6 text-sm w-full mt-lg hover:bg-gray-900 transition-colors disabled:bg-gray-200 disabled:text-gray-400"
                >
                  {isLoading ? 'Signing In...' : 'Sign In'}
                </button>

                <div className="text-center mt-lg">
                  <button
                    type="button"
                    onClick={() => {
                      const message = 'Password reset coming soon!';
                      setError(message);
                      showToast(message, 'info');
                    }}
                    className="text-sm text-gray-500 hover:text-black transition-colors"
                  >
                    Forgot your password?
                  </button>
                </div>
              </form>
            ) : (
              /* Signup Form */
              <form onSubmit={handleSignup} className="flex flex-col gap-lg">
                <div className="flex gap-xl">
                  <input
                    id="firstName"
                    type="text"
                    className="px-4 py-2 border border-gray-200 rounded-xl focus:border-black transition-colors w-full flex-1"
                    placeholder="First name"
                    value={formData.firstName}
                    onChange={e => setFormData({ ...formData, firstName: e.target.value })}
                    required
                  />
                  <input
                    id="lastName"
                    type="text"
                    className="px-4 py-2 border border-gray-200 rounded-xl focus:border-black transition-colors w-full flex-1"
                    placeholder="Last name"
                    value={formData.lastName}
                    onChange={e => setFormData({ ...formData, lastName: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="signupEmail" className="form-label">
                    Email
                  </label>
                  <input
                    id="signupEmail"
                    type="email"
                    className="px-4 py-2 border border-gray-200 rounded-xl focus:border-black transition-colors w-full"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone" className="form-label">
                    Phone
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    className="px-4 py-2 border border-gray-200 rounded-xl focus:border-black transition-colors w-full"
                    placeholder="+1 (555) 123-4567"
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="instagramHandle" className="form-label">
                    Instagram Handle
                  </label>
                  <input
                    id="instagramHandle"
                    type="text"
                    className="px-4 py-2 border border-gray-200 rounded-xl focus:border-black transition-colors w-full"
                    placeholder="@yourusername"
                    value={formData.instagramHandle}
                    onChange={e => {
                      let value = e.target.value;
                      // Always ensure @ symbol is at the beginning if there's any text
                      if (value.length > 0 && !value.startsWith('@')) {
                        value = '@' + value;
                      }
                      setFormData({ ...formData, instagramHandle: value });
                    }}
                    required
                  />
                </div>

                {/* Password fields only for signup */}
                <div className="form-group">
                  <label htmlFor="signupPassword" className="form-label">
                    Password
                  </label>
                  <input
                    id="signupPassword"
                    type="password"
                    className="px-4 py-2 border border-gray-200 rounded-xl focus:border-black transition-colors w-full"
                    placeholder="Create a password"
                    value={formData.password}
                    onChange={e => setFormData({ ...formData, password: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="confirmPassword" className="form-label">
                    Confirm Password
                  </label>
                  <input
                    id="confirmPassword"
                    type="password"
                    className="px-4 py-2 border border-gray-200 rounded-xl focus:border-black transition-colors w-full"
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={e => setFormData({ ...formData, confirmPassword: e.target.value })}
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="bg-black text-white rounded-full py-3 px-6 text-sm w-full mt-lg hover:bg-gray-900 transition-colors disabled:bg-gray-200 disabled:text-gray-400"
                >
                  {isLoading ? 'Creating Account...' : 'Create Account'}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Text */}
        <div className="text-center mt-3xl">
          <p className="text-sm text-gray-500">
            By continuing, you agree to our terms of service and privacy policy.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function GuestAuthPage() {
  return (
    <ErrorBoundary>
      <ToastProvider>
        <Suspense
          fallback={
            <div className="min-h-screen flex items-center justify-center">
              <div className="text-lg">Loading...</div>
            </div>
          }
        >
          <GuestAuthContent />
        </Suspense>
      </ToastProvider>
    </ErrorBoundary>
  );
}

```


## File: `src/app/guest/dashboard/page.tsx`

```typescript
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { GuestAuthService, GuestSession } from '@/lib/auth/guest-auth';
import { supabase } from '@/lib/supabase/client';
import { useToast, ToastProvider } from '@/components/ui/ToastProvider';
import ErrorBoundary from '@/components/ui/ErrorBoundary';
import { SafeStorage } from '@/lib/utils/safeStorage';

const guestAuth = new GuestAuthService();

function GuestDashboardContent() {
  const router = useRouter();
  const { showToast } = useToast();
  const [guest, setGuest] = useState<GuestSession | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [plusOneCount, setPlusOneCount] = useState(0);
  const [qrCode, setQrCode] = useState<string | null>(null);
  const [shareSupported, setShareSupported] = useState(false);
  const [friendsList, setFriendsList] = useState<any[]>([]);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initializeSession = async () => {
      try {
        // Check for guest session using SafeStorage
        const sessionData = SafeStorage.getItem('guestSession');
        if (!sessionData) {
          showToast('Please sign in to continue', 'error');
          router.push('/guest/auth');
          return;
        }

        const guestSession = JSON.parse(sessionData);

        // Validate session and fetch latest guest data
        const currentGuest = await guestAuth.getGuestSession(guestSession.guestId);
        if (!currentGuest) {
          showToast('Session expired. Please sign in again.', 'error');
          SafeStorage.removeItem('guestSession');
          router.push('/guest/auth');
          return;
        }

        setGuest(currentGuest);

        // Load guest's plus-one count from database
        await loadGuestData(currentGuest.guestId);

        // Check if Web Share API is supported
        setShareSupported(typeof navigator !== 'undefined' && 'share' in navigator);

        // Load friends list
        await loadFriendsList(currentGuest.guestId);
      } catch (err) {
        console.error('Session initialization error:', err);
        setError('Failed to load dashboard data');
        showToast('Failed to load dashboard data', 'error');
        router.push('/guest/auth');
      } finally {
        setIsLoading(false);
      }
    };

    initializeSession();
  }, [router, showToast]);

  // Refresh friends list when page comes back into focus
  useEffect(() => {
    const handleFocus = () => {
      if (guest) {
        loadFriendsList(guest.guestId);
      }
    };

    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, [guest]);

  const loadGuestData = async (guestId: string) => {
    try {
      // Load guest's plus-one settings from database
      const { data: guestData, error: guestError } = await supabase
        .from('guests')
        .select('id, plus_one_count')
        .eq('id', guestId)
        .single();

      if (guestError) {
        console.error('Error loading guest data:', guestError);
        setPlusOneCount(0); // Default to 0 if error
      } else {
        setPlusOneCount(guestData?.plus_one_count || 0);
      }
    } catch (err) {
      console.error('Failed to load guest data:', err);
      setPlusOneCount(0);
    }
  };

  const loadFriendsList = async (guestId: string) => {
    try {
      const { data, error } = await supabase
        .from('guests')
        .select('id, first_name, last_name, email, phone, created_at')
        .eq('invited_by_guest_id', guestId)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error loading friends list:', error);
        showToast('Failed to load friends list', 'error');
      } else {
        setFriendsList(data || []);
      }
    } catch (err) {
      console.error('Failed to load friends list:', err);
      showToast('Failed to load friends list', 'error');
    }
  };

  const handleSignOut = () => {
    SafeStorage.removeItem('guestSession');
    showToast('Signed out successfully', 'success');
    router.push('/guest/auth');
  };

  const handleUpdatePlusOne = async (change: number) => {
    if (!guest) return;

    const newCount = Math.max(0, Math.min(10, plusOneCount + change));
    const previousCount = plusOneCount;
    setPlusOneCount(newCount);

    // Update in database immediately (auto-save)
    try {
      const { error } = await supabase
        .from('guests')
        .update({ plus_one_count: newCount })
        .eq('id', guest.guestId);

      if (error) {
        console.error('Failed to update plus-one count:', error);
        showToast('Failed to update plus-one count', 'error');
        // Revert on error
        setPlusOneCount(previousCount);
      } else {
        showToast(`Plus-one count updated to ${newCount}`, 'success');
      }
    } catch (error) {
      console.error('Failed to update plus-one count:', error);
      showToast('Failed to update plus-one count', 'error');
      // Revert on error
      setPlusOneCount(previousCount);
    }
  };

  const handleShare = async () => {
    if (!guest) return;

    const shareData = {
      title: 'Join me at Summer Vibes!',
      text: `Hey! I'm on the guest list for DJ Shadow & MC Solar this Saturday. Want to come with me? Use my link to get on the list:`,
      url: `https://guestlist.app/join/test?inviter=${guest.guestId}`,
    };

    try {
      if (shareSupported) {
        // Use native share on mobile devices
        await navigator.share(shareData);
        showToast('Share successful!', 'success');
      } else {
        // Fallback: copy to clipboard on desktop
        await navigator.clipboard.writeText(`${shareData.text} ${shareData.url}`);
        showToast('Message copied to clipboard!', 'success');
      }
    } catch (error) {
      // User cancelled share or error occurred
      if (error instanceof Error && error.name !== 'AbortError') {
        console.error('Share failed:', error);
        showToast('Share failed. Please try copying the link instead.', 'error');
      }
    }
  };

  const handleCopyLink = async () => {
    if (!guest) return;

    try {
      await navigator.clipboard.writeText(
        `https://guestlist.app/join/test?inviter=${guest.guestId}`
      );
      setCopied(true);
      showToast('Link copied to clipboard!', 'success');
      setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
    } catch (err) {
      console.error('Failed to copy:', err);
      showToast('Failed to copy link', 'error');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-lg">Loading...</div>
        </div>
      </div>
    );
  }

  if (!guest) {
    return null;
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="container-sm py-xl">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl">Welcome back</h1>
              <p className="text-sm text-gray-500">{guest.name}</p>
            </div>
            <button
              onClick={handleSignOut}
              className="bg-gray-100 text-black rounded-full py-2 px-4 text-sm hover:bg-gray-200 transition-colors"
            >
              Sign Out
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container-sm py-4xl">
        <div className="flex flex-col gap-3xl">
          {/* Tonight's Event Card */}
          <div className="card">
            <div className="card-header">
              <h2 className="text-xl">Tonight's Event</h2>
              <p className="text-sm text-gray-500 mt-xs">Saturday, June 24 • 10:00 PM</p>
            </div>
            <div className="card-body">
              <div className="flex flex-col gap-xl">
                <div>
                  <h3 className="mb-sm">Summer Vibes</h3>
                  <p className="text-sm text-gray-600">
                    Join us for an unforgettable night of music and dancing. Dress code: Smart
                    casual.
                  </p>
                </div>

                {/* QR Code Section */}
                <div className="text-center p-xl bg-gray-50 rounded-lg">
                  <div className="w-32 h-32 mx-auto mb-lg rounded-lg overflow-hidden">
                    <img
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=128x128&data=GUEST-${guest?.guestId || 'DEMO'}-EVENT-SUMMER-VIBES-2025`}
                      alt="QR Code for entry"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="text-sm text-gray-600">Show this QR code at the door for entry</p>
                </div>
              </div>
            </div>
          </div>

          {/* Plus One Management */}
          <div className="card">
            <div className="card-header">
              <h2 className="text-xl">Your Guest List</h2>
              <p className="text-sm text-gray-500 mt-xs">Bring friends to tonight's event</p>
            </div>
            <div className="card-body">
              <div className="flex flex-col gap-xl">
                <div className="flex items-center justify-between p-lg bg-gray-50 rounded-lg">
                  <div>
                    <p className="">Plus One Count</p>
                    <p className="text-sm text-gray-600">Additional guests you can bring</p>
                  </div>
                  <div className="flex items-center gap-md">
                    <button
                      onClick={() => handleUpdatePlusOne(-1)}
                      className="bg-gray-100 text-black rounded-full w-10 h-10 p-0 flex items-center justify-center text-sm hover:bg-gray-200 transition-colors disabled:bg-gray-200 disabled:text-gray-400"
                      disabled={plusOneCount === 0}
                    >
                      −
                    </button>
                    <span className="text-2xl w-8 text-center">{plusOneCount}</span>
                    <button
                      onClick={() => handleUpdatePlusOne(1)}
                      className="bg-gray-100 text-black rounded-full w-10 h-10 p-0 flex items-center justify-center text-sm hover:bg-gray-200 transition-colors disabled:bg-gray-200 disabled:text-gray-400"
                      disabled={plusOneCount >= 10}
                    >
                      +
                    </button>
                  </div>
                </div>

                {plusOneCount > 0 && (
                  <div className="p-lg border border-gray-200 rounded-lg">
                    <p className="text-sm text-gray-600 mb-md">
                      Share this link with your friends to add them to your guest list:
                    </p>
                    <div className="flex gap-sm mb-lg">
                      <input
                        type="text"
                        value={`https://guestlist.app/join/test?inviter=${guest.guestId}`}
                        readOnly
                        className="px-4 py-2 border border-gray-200 rounded-xl focus:border-black transition-colors text-sm flex-1 bg-gray-100"
                      />
                      <button
                        onClick={handleCopyLink}
                        className={`rounded-full py-2 px-4 text-sm transition-colors ${copied ? 'bg-black text-white hover:bg-gray-900' : 'bg-gray-100 text-black hover:bg-gray-200'}`}
                      >
                        {copied ? '✓ Copied!' : 'Copy'}
                      </button>
                    </div>
                    <button
                      onClick={handleShare}
                      className="bg-black text-white rounded-full py-3 px-6 text-sm w-full hover:bg-gray-900 transition-colors"
                    >
                      {shareSupported ? '📱 Share via Text/Social' : '📋 Copy Message'}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Friends List */}
          {friendsList.length > 0 && (
            <div className="card">
              <div className="card-header">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl">Friends Coming Tonight</h2>
                    <p className="text-sm text-gray-500 mt-xs">
                      {friendsList.length} friends on your list
                    </p>
                  </div>
                  <button
                    onClick={() => guest && loadFriendsList(guest.guestId)}
                    className="bg-gray-100 text-black rounded-full py-2 px-4 text-sm hover:bg-gray-200 transition-colors"
                  >
                    ↻ Refresh
                  </button>
                </div>
              </div>
              <div className="card-body">
                <div className="space-y-md">
                  {friendsList.map(friend => (
                    <div
                      key={friend.id}
                      className="flex items-center justify-between p-md bg-gray-50 rounded-lg"
                    >
                      <div>
                        <p className="">
                          {friend.first_name} {friend.last_name}
                        </p>
                        <p className="text-sm text-gray-600">{friend.phone}</p>
                      </div>
                      <div className="text-sm text-gray-500">
                        {new Date(friend.created_at).toLocaleDateString()}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Account Info */}
          <div className="card">
            <div className="card-header">
              <h2 className="text-xl">Account Settings</h2>
            </div>
            <div className="card-body">
              <div className="flex flex-col gap-lg">
                <div className="flex justify-between items-center py-md border-b border-gray-100">
                  <span className="text-sm">Email</span>
                  <span className="text-sm text-gray-600">{guest.email}</span>
                </div>
                <div className="flex justify-between items-center py-md border-b border-gray-100">
                  <span className="text-sm">Email Verified</span>
                  <span className={`text-sm ${guest.verified ? 'text-black' : 'text-gray-400'}`}>
                    {guest.verified ? 'Verified' : 'Not verified'}
                  </span>
                </div>
                {!guest.verified && (
                  <button className="bg-gray-100 text-black rounded-full py-2 px-4 text-sm hover:bg-gray-200 transition-colors">
                    Resend Verification Email
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Support */}
          <div className="card">
            <div className="card-body">
              <div className="text-center">
                <h3 className="mb-sm">Need Help?</h3>
                <p className="text-sm text-gray-600 mb-lg">
                  Contact our support team if you have any questions about tonight's event.
                </p>
                <button className="bg-gray-100 text-black rounded-full py-3 px-6 text-sm hover:bg-gray-200 transition-colors">
                  Contact Support
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function GuestDashboard() {
  return (
    <ErrorBoundary>
      <ToastProvider>
        <GuestDashboardContent />
      </ToastProvider>
    </ErrorBoundary>
  );
}

```


## File: `src/app/join/[guestId]/page.tsx`

```typescript
'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';

interface InviterInfo {
  name: string;
  email: string;
  availableSpots: number;
}

export default function JoinGuestListPage() {
  const params = useParams();
  const router = useRouter();
  const guestId = params.guestId as string;

  const [inviterInfo, setInviterInfo] = useState<InviterInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
  });

  useEffect(() => {
    const fetchInviterInfo = async () => {
      try {
        // Get inviter information
        const { data: guest, error } = await supabase
          .from('guests')
          .select('first_name, last_name, email')
          .eq('id', guestId)
          .single();

        if (error || !guest) {
          setError('Invalid invitation link');
          setIsLoading(false);
          return;
        }

        setInviterInfo({
          name: `${guest.first_name} ${guest.last_name}`,
          email: guest.email,
          availableSpots: 2, // TODO: Get actual available spots from database
        });
      } catch (err) {
        setError('Failed to load invitation');
      } finally {
        setIsLoading(false);
      }
    };

    if (guestId) {
      fetchInviterInfo();
    }
  }, [guestId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      // TODO: Add the friend to the guest list
      // For now, just simulate success
      await new Promise(resolve => setTimeout(resolve, 1000));

      console.log('Adding friend to guest list:', {
        inviterGuestId: guestId,
        friendInfo: formData,
      });

      setSuccess(true);
    } catch (err) {
      setError('Failed to join guest list. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center py-6xl px-xl">
        <div className="text-lg">Loading invitation...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center py-6xl px-xl">
        <div className="text-center">
          <h1 className="text-2xl font-light mb-lg text-red-600">Invalid Link</h1>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center py-6xl px-xl">
        <div className="w-full max-w-md text-center">
          <div className="card">
            <div className="card-body">
              <h1 className="text-2xl font-light mb-lg">🎉 You're on the list!</h1>
              <p className="text-gray-600 mb-xl">
                You've been added to {inviterInfo?.name}'s guest list for Summer Vibes.
              </p>

              {/* QR Code placeholder */}
              <div className="w-32 h-32 bg-black mx-auto mb-lg rounded-lg flex items-center justify-center">
                <span className="text-white text-xs">QR CODE</span>
              </div>

              <p className="text-sm text-gray-600 mb-xl">
                Show this QR code (or your friend's) at the door for entry.
              </p>

              <div className="space-y-md">
                <div className="text-sm text-gray-600">
                  DJ Shadow & MC Solar
                  <br />
                  Saturday, June 24, 2025
                  <br />
                  10:00 PM
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-6xl px-xl">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-4xl">
          <h1 className="text-3xl font-light mb-lg">You're Invited!</h1>
          <p className="text-lg">
            <strong>{inviterInfo?.name}</strong> invited you to join their guest list for
          </p>
          <p className="text-xl font-medium mt-sm">DJ Shadow & MC Solar</p>
          <p className="text-lg text-gray-600">Saturday, June 24, 2025</p>
        </div>

        {/* Form Card */}
        <div className="card">
          <div className="card-body">
            <p className="text-sm text-gray-600 mb-xl text-center">
              Just enter your info to get on the list:
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-lg">
              {error && (
                <div className="p-lg border border-gray-300 rounded-lg bg-gray-50">
                  <p className="text-sm text-gray-700">{error}</p>
                </div>
              )}

              <div className="flex gap-md">
                <div className="form-group flex-1">
                  <label htmlFor="firstName" className="form-label">
                    First Name
                  </label>
                  <input
                    id="firstName"
                    type="text"
                    className="input"
                    placeholder="First"
                    value={formData.firstName}
                    onChange={e => setFormData({ ...formData, firstName: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group flex-1">
                  <label htmlFor="lastName" className="form-label">
                    Last Name
                  </label>
                  <input
                    id="lastName"
                    type="text"
                    className="input"
                    placeholder="Last"
                    value={formData.lastName}
                    onChange={e => setFormData({ ...formData, lastName: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="phone" className="form-label">
                  Phone Number
                </label>
                <input
                  id="phone"
                  type="tel"
                  className="input"
                  placeholder="+1 (555) 123-4567"
                  value={formData.phone}
                  onChange={e => setFormData({ ...formData, phone: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  className="input"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-primary btn-lg mt-lg"
              >
                {isSubmitting ? 'Joining...' : 'Join Guest List'}
              </button>
            </form>
          </div>
        </div>

        {/* Info */}
        <div className="text-center mt-3xl">
          <p className="text-sm text-gray-500">
            By joining, you agree to receive event updates via text.
          </p>
        </div>
      </div>
    </div>
  );
}

```


## File: `src/app/join/test/page.tsx`

```typescript
'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';
import { useToast, ToastProvider } from '@/components/ui/ToastProvider';
import ErrorBoundary from '@/components/ui/ErrorBoundary';

function TestJoinContent() {
  const searchParams = useSearchParams();
  const { showToast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [inviterName, setInviterName] = useState<string>('Patrick Gregoire');
  const [error, setError] = useState<string>('');

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    instagramHandle: '',
  });

  const [privacyAccepted, setPrivacyAccepted] = useState(false);

  // Load inviter information on component mount
  useEffect(() => {
    const loadInviterInfo = async () => {
      const inviterId = searchParams.get('inviter');
      if (inviterId) {
        try {
          const { data: inviter, error } = await supabase
            .from('guests')
            .select('first_name, last_name')
            .eq('id', inviterId)
            .single();

          if (!error && inviter) {
            setInviterName(`${inviter.first_name} ${inviter.last_name}`);
          }
        } catch (err) {
          console.error('Failed to load inviter info:', err);
        }
      }
    };

    loadInviterInfo();
  }, [searchParams]);

  // Form validation
  const validateForm = (): boolean => {
    if (!formData.firstName.trim()) {
      setError('First name is required');
      showToast('Please enter your first name', 'error');
      return false;
    }

    if (!formData.lastName.trim()) {
      setError('Last name is required');
      showToast('Please enter your last name', 'error');
      return false;
    }

    if (!formData.email.trim()) {
      setError('Email is required');
      showToast('Please enter your email', 'error');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address');
      showToast('Please enter a valid email address', 'error');
      return false;
    }

    if (!formData.phone.trim()) {
      setError('Phone number is required');
      showToast('Please enter your phone number', 'error');
      return false;
    }

    if (!formData.instagramHandle.trim()) {
      setError('Instagram handle is required');
      showToast('Please enter your Instagram handle', 'error');
      return false;
    }

    if (!privacyAccepted) {
      setError('You must accept the privacy policy to continue');
      showToast('Please accept the privacy policy', 'error');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validate form
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Get inviter ID from URL params
      const inviterId = searchParams.get('inviter');

      if (!inviterId) {
        setError('Invalid invitation link');
        showToast('Invalid invitation link', 'error');
        setIsSubmitting(false);
        return;
      }

      // Check if email is already registered
      const { data: existingGuest, error: checkError } = await supabase
        .from('guests')
        .select('id')
        .eq('email', formData.email.trim())
        .single();

      if (checkError && checkError.code !== 'PGRST116') {
        // PGRST116 = no rows returned
        console.error('Error checking existing guest:', checkError);
        setError('Failed to validate email');
        showToast('Failed to validate email', 'error');
        setIsSubmitting(false);
        return;
      }

      if (existingGuest) {
        setError('This email is already registered');
        showToast('This email is already registered', 'error');
        setIsSubmitting(false);
        return;
      }

      // Create friend as a regular guest, linked to the inviter
      const { data, error } = await supabase
        .from('guests')
        .insert({
          first_name: formData.firstName.trim(),
          last_name: formData.lastName.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          instagram_handle: formData.instagramHandle.trim(),
          invited_by_guest_id: inviterId,
          invitation_status: 'confirmed',
        })
        .select()
        .single();

      if (error) {
        console.error('Error adding to guest list:', error);
        setError('Failed to join guest list');
        showToast('Failed to join guest list', 'error');
      } else {
        console.log('Successfully created guest:', data);
        showToast('Successfully joined the guest list!', 'success');
        setSuccess(true);
      }
    } catch (err) {
      console.error('Failed to join guest list:', err);
      setError('An unexpected error occurred');
      showToast('An unexpected error occurred', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center py-6xl px-xl">
        <div className="w-full max-w-md text-center">
          <div className="card">
            <div className="card-body">
              <h1 className="text-2xl font-light mb-lg">🎉 You're on the list!</h1>
              <p className="text-gray-600 mb-xl">
                You've been added to {inviterName}'s guest list for Summer Vibes.
              </p>

              {/* QR Code */}
              <div className="w-32 h-32 mx-auto mb-lg rounded-lg overflow-hidden">
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=128x128&data=FRIEND-${formData.firstName}-${formData.lastName}-SUMMER-VIBES-2025`}
                  alt="QR Code for entry"
                  className="w-full h-full object-cover"
                />
              </div>

              <p className="text-sm text-gray-600 mb-xl">
                Show this QR code (or your friend's) at the door for entry.
              </p>

              <div className="space-y-md">
                <div className="text-sm text-gray-600">
                  DJ Shadow & MC Solar
                  <br />
                  Saturday, June 24, 2025
                  <br />
                  10:00 PM
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-6xl px-xl">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-4xl">
          <h1 className="text-3xl font-light mb-lg">You're Invited!</h1>
          <p className="text-lg">
            <strong>{inviterName}</strong> invited you to join their guest list for
          </p>
          <p className="text-xl font-medium mt-sm">DJ Shadow & MC Solar</p>
          <p className="text-lg text-gray-600">Saturday, June 24, 2025</p>
        </div>

        {/* Form Card */}
        <div className="card">
          <div className="card-body">
            <p className="text-sm text-gray-600 mb-xl text-center">
              Just enter your info to get on the list:
            </p>

            {/* Error Message */}
            {error && (
              <div className="p-lg mb-lg border border-red-300 rounded-lg bg-red-50">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-lg">
              <div className="flex gap-md">
                <div className="form-group flex-1">
                  <label htmlFor="firstName" className="form-label">
                    First Name
                  </label>
                  <input
                    id="firstName"
                    type="text"
                    className="px-4 py-2 border border-gray-200 rounded-xl focus:border-black transition-colors w-full"
                    placeholder="First"
                    value={formData.firstName}
                    onChange={e => setFormData({ ...formData, firstName: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group flex-1">
                  <label htmlFor="lastName" className="form-label">
                    Last Name
                  </label>
                  <input
                    id="lastName"
                    type="text"
                    className="px-4 py-2 border border-gray-200 rounded-xl focus:border-black transition-colors w-full"
                    placeholder="Last"
                    value={formData.lastName}
                    onChange={e => setFormData({ ...formData, lastName: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="phone" className="form-label">
                  Phone Number
                </label>
                <input
                  id="phone"
                  type="tel"
                  className="px-4 py-2 border border-gray-200 rounded-xl focus:border-black transition-colors w-full"
                  placeholder="+1 (555) 123-4567"
                  value={formData.phone}
                  onChange={e => setFormData({ ...formData, phone: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  className="px-4 py-2 border border-gray-200 rounded-xl focus:border-black transition-colors w-full"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="instagramHandle" className="form-label">
                  Instagram Handle
                </label>
                <input
                  id="instagramHandle"
                  type="text"
                  className="px-4 py-2 border border-gray-200 rounded-xl focus:border-black transition-colors w-full"
                  placeholder="@yourusername"
                  value={formData.instagramHandle}
                  onChange={e => {
                    let value = e.target.value;
                    // Always ensure @ symbol is at the beginning if there's any text
                    if (value.length > 0 && !value.startsWith('@')) {
                      value = '@' + value;
                    }
                    setFormData({ ...formData, instagramHandle: value });
                  }}
                  required
                />
              </div>

              {/* Privacy Policy Checkbox */}
              <div className="form-group">
                <label className="flex items-start gap-md">
                  <input
                    type="checkbox"
                    checked={privacyAccepted}
                    onChange={e => setPrivacyAccepted(e.target.checked)}
                    className="mt-1"
                    required
                  />
                  <span className="text-sm text-gray-600">
                    I agree to the{' '}
                    <a href="/privacy" className="text-black underline" target="_blank">
                      privacy policy
                    </a>{' '}
                    and consent to receive event updates via text and email.
                  </span>
                </label>
              </div>

              <button
                type="submit"
                disabled={isSubmitting || !privacyAccepted}
                className="bg-black text-white rounded-full py-3 px-6 text-sm w-full mt-lg hover:bg-gray-900 transition-colors disabled:bg-gray-200 disabled:text-gray-400"
              >
                {isSubmitting ? 'Joining...' : 'Join Guest List'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function TestJoinPage() {
  return (
    <ErrorBoundary>
      <ToastProvider>
        <Suspense
          fallback={
            <div className="min-h-screen flex items-center justify-center">
              <div className="text-lg">Loading...</div>
            </div>
          }
        >
          <TestJoinContent />
        </Suspense>
      </ToastProvider>
    </ErrorBoundary>
  );
}

```


## File: `src/app/layout.tsx`

```typescript
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import '@/styles/design-system.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Nightlist',
  description: 'Nightclub guest list management system',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>{children}</body>
    </html>
  );
}

```


## File: `src/app/manager/dashboard/page.tsx`

```typescript
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { SafeStorage } from '@/lib/utils/safeStorage';

interface Event {
  id: string;
  date: string;
  dayOfWeek: string;
  djNames: string;
  eventName: string;
  approvalRatio: number;
  totalGuests: number;
  approvedGuests: number;
  pendingGuests: number;
  status: 'upcoming' | 'today' | 'past';
}

interface Alert {
  id: string;
  type: 'warning' | 'error' | 'info' | 'capacity';
  message: string;
  action?: string;
  actionUrl?: string;
  capacityRequestId?: string;
}

interface CapacityRequest {
  id: string;
  requesterName: string;
  requesterRole: 'dj' | 'staff' | 'promoter';
  eventName: string;
  eventDate: string;
  spotsRequested: number;
  currentCapacity: number;
  reason?: string;
}

interface AttendanceRecord {
  eventDate: string;
  djNames: string;
  addedBy: string;
}

interface Guest {
  id: string;
  name: string;
  email: string;
  phone: string;
  instagram?: string;
  totalAttendance: number;
  lastAttended: string;
  addedBy: string[];
  status: 'active' | 'banned';
  notes?: string;
  upcomingEvents?: string[];
  attendanceHistory?: AttendanceRecord[];
}

interface DJ {
  id: string;
  name: string;
  email: string;
  phone: string;
  instagram?: string;
  totalEvents: number;
  avgAttendance: number;
  paidAttendance: number;
  avgRevenue: number;
  defaultCap: number;
  lastPerformed: string;
  status: 'active' | 'pending' | 'inactive';
  upcomingGigs: number;
  totalGuestsAdded: number;
}

interface Staff {
  id: string;
  name: string;
  email: string;
  phone: string;
  instagram?: string;
  role: string;
  totalEventsWorked: number;
  totalGuestsAdded: number;
  avgGuestsPerEvent: number;
  lastWorked: string;
  status: 'active' | 'pending' | 'inactive';
  upcomingShifts: number;
}

interface Promoter {
  id: string;
  name: string;
  email: string;
  phone: string;
  instagram?: string;
  totalEvents: number;
  totalGuestsAdded: number;
  avgAttendance: number;
  paidAttendance: number;
  conversionRate: number;
  avgRevenue: number;
  lastPerformed: string;
  defaultCap: number;
}

interface Manager {
  id: string;
  name: string;
  email: string;
  phone: string;
  instagram?: string;
  eventsCreated: number;
  avgRevenue: number;
  avgConversion: number; // as percentage, e.g., 67 for 67%
  avgTotalGuests: number;
  avgPaidGuests: number;
  lastActive: string;
  status: 'active' | 'pending' | 'inactive';
  team: string;
}

export default function ManagerDashboardPage() {
  const [managerName, setManagerName] = useState('');
  const [managerRole, setManagerRole] = useState('');
  const [events, setEvents] = useState<Event[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [capacityRequests, setCapacityRequests] = useState<CapacityRequest[]>([]);
  const [guests, setGuests] = useState<Guest[]>([]);
  const [guestSearch, setGuestSearch] = useState('');
  const [guestFilter, setGuestFilter] = useState<string>('all');
  const [selectedGuestId, setSelectedGuestId] = useState<string | null>(null);
  const [guestSortColumn, setGuestSortColumn] = useState<
    'name' | 'attendance' | 'lastAttended' | 'addedBy'
  >('name');
  const [guestSortDirection, setGuestSortDirection] = useState<'asc' | 'desc'>('asc');
  const [djs, setDjs] = useState<DJ[]>([]);
  const [djSortColumn, setDjSortColumn] = useState<
    | 'name'
    | 'totalEvents'
    | 'avgAttendance'
    | 'paidAttendance'
    | 'conversionRate'
    | 'avgRevenue'
    | 'lastPerformed'
  >('name');
  const [djSortDirection, setDjSortDirection] = useState<'asc' | 'desc'>('asc');
  const [staff, setStaff] = useState<Staff[]>([]);
  const [staffSortColumn, setStaffSortColumn] = useState<
    'name' | 'role' | 'totalEventsWorked' | 'totalGuestsAdded' | 'avgGuestsPerEvent' | 'lastWorked'
  >('name');
  const [staffSortDirection, setStaffSortDirection] = useState<'asc' | 'desc'>('asc');
  const [promoters, setPromoters] = useState<Promoter[]>([]);
  const [promoterSortColumn, setPromoterSortColumn] = useState<
    | 'name'
    | 'totalEvents'
    | 'totalGuestsAdded'
    | 'avgAttendance'
    | 'paidAttendance'
    | 'conversionRate'
    | 'avgRevenue'
    | 'lastPerformed'
  >('name');
  const [promoterSortDirection, setPromoterSortDirection] = useState<'asc' | 'desc'>('asc');
  const [managers, setManagers] = useState<Manager[]>([]);
  const [managerSortColumn, setManagerSortColumn] = useState<
    'name' | 'eventsCreated' | 'avgRevenue' | 'avgConversion' | 'avgTotalGuests' | 'avgPaidGuests'
  >('name');
  const [managerSortDirection, setManagerSortDirection] = useState<'asc' | 'desc'>('asc');
  const [selectedManagerId, setSelectedManagerId] = useState<string | null>(null);
  const [managerModalTab, setManagerModalTab] = useState<'overview' | 'guests' | 'history'>(
    'overview'
  );
  const [showInviteDjModal, setShowInviteDjModal] = useState(false);
  const [inviteDjForm, setInviteDjForm] = useState({
    stageName: '',
    givenName: '',
    email: '',
    phone: '',
    upcomingGigDate: '',
  });
  const [showInvitePromoterModal, setShowInvitePromoterModal] = useState(false);
  const [invitePromoterForm, setInvitePromoterForm] = useState({
    name: '',
    email: '',
    phone: '',
    instagram: '',
  });
  const [showInviteStaffModal, setShowInviteStaffModal] = useState(false);
  const [inviteStaffForm, setInviteStaffForm] = useState({
    name: '',
    email: '',
    phone: '',
    role: '',
  });
  const [inviteManagerForm, setInviteManagerForm] = useState({
    name: '',
    email: '',
    phone: '',
  });
  const [showInviteUserModal, setShowInviteUserModal] = useState(false);
  const [inviteUserType, setInviteUserType] = useState<'dj' | 'staff' | 'promoter' | 'manager'>('dj');
  const [selectedDjId, setSelectedDjId] = useState<string | null>(null);
  const [djModalTab, setDjModalTab] = useState<'overview' | 'guests' | 'history'>('overview');
  const [selectedStaffId, setSelectedStaffId] = useState<string | null>(null);
  const [staffModalTab, setStaffModalTab] = useState<'overview' | 'guests' | 'history'>('overview');
  const [selectedPromoterId, setSelectedPromoterId] = useState<string | null>(null);
  const [promoterModalTab, setPromoterModalTab] = useState<'overview' | 'guests' | 'history'>(
    'overview'
  );
  const [activeTab, setActiveTab] = useState<'overview' | 'calendar' | 'guests' | 'users'>(
    'overview'
  );
  const [userType, setUserType] = useState<'djs' | 'staff' | 'promoters' | 'managers'>('djs');
  const [isLoading, setIsLoading] = useState(true);
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const [showMonthPicker, setShowMonthPicker] = useState(false);
  const [eventHistorySortColumn, setEventHistorySortColumn] = useState<
    'date' | 'eventName' | 'attendance' | 'capacity' | 'revenue'
  >('date');
  const [eventHistorySortDirection, setEventHistorySortDirection] = useState<'asc' | 'desc'>(
    'desc'
  );
  const router = useRouter();

  useEffect(() => {
    // Check authentication
    const isAuthenticated = SafeStorage.getItem('manager_authenticated');
    if (!isAuthenticated) {
      router.push('/manager/login');
      return;
    }

    // Get manager info
    const name = SafeStorage.getItem('manager_name') || 'Manager';
    const role = SafeStorage.getItem('manager_role') || 'manager';
    setManagerName(name);
    setManagerRole(role);

    // Mock data - Generate events for current month and next month
    setTimeout(() => {
      const today = new Date();
      const mockEvents: Event[] = [];
      const mockAlerts: Alert[] = [];

      const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      const monthNames = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ];

      const djOptions = [
        'DJ Marcus & Sarah Deep',
        'Techno Collective',
        'DJ Shadow & MC Solar',
        'Underground Sessions',
        'House Masters',
        'Vinyl Vince',
        'Bass Queen',
        'Techno Tom',
      ];

      const eventNameOptions = [
        'Saturday Night Sessions',
        'Techno Warehouse',
        'Deep House Vibes',
        'Underground Collective',
        'House Party',
        'Vinyl Sessions',
        'Bass Night',
        'Warehouse Party',
      ];

      // Generate events for 60 days to cover current and next month
      for (let i = -15; i < 45; i++) {
        const eventDate = new Date(today);
        eventDate.setDate(today.getDate() + i);

        // Add events for Friday and Saturday nights, plus some weekday events
        const dayOfWeek = eventDate.getDay();
        const isFriday = dayOfWeek === 5;
        const isSaturday = dayOfWeek === 6;
        const isThursday = dayOfWeek === 4;
        const randomWeekday = Math.random() > 0.8;

        if (isFriday || isSaturday || isThursday || randomWeekday) {
          const totalGuests = Math.floor(Math.random() * 40) + 60; // 60-100 capacity
          const approvedGuests = Math.floor(Math.random() * 40) + 30; // 30-70 approved
          const pendingGuests = Math.floor(Math.random() * 15); // 0-15 pending
          const approvalRatio = (approvedGuests / totalGuests) * 100;

          const event: Event = {
            id: `event_${i}`,
            date: `${dayNames[eventDate.getDay()]} ${monthNames[eventDate.getMonth()]} ${eventDate.getDate()}`,
            dayOfWeek: dayNames[eventDate.getDay()],
            djNames: djOptions[Math.floor(Math.random() * djOptions.length)],
            eventName: eventNameOptions[Math.floor(Math.random() * eventNameOptions.length)],
            approvalRatio,
            totalGuests,
            approvedGuests,
            pendingGuests,
            status: i === 0 ? 'today' : i > 0 ? 'upcoming' : 'past',
          };

          mockEvents.push(event);

          // Generate alerts based on conditions
          if (i === 1 && approvalRatio < 65) {
            mockAlerts.push({
              id: `alert_${i}`,
              type: 'warning',
              message: `Tomorrow's event only ${Math.round(approvalRatio)}% approved`,
              action: 'Review Event',
              actionUrl: `/manager/events/${event.id}`,
            });
          }

          if (i === 3) {
            mockAlerts.push({
              id: 'dj_missing',
              type: 'error',
              message: "DJ Marcus hasn't accepted invite for Saturday",
              action: 'Send Reminder',
              actionUrl: `/manager/users/djs`,
            });
          }
        }
      }

      // Generate mock capacity requests
      const mockCapacityRequests: CapacityRequest[] = [
        {
          id: 'cap_req_1',
          requesterName: 'DJ Marcus',
          requesterRole: 'dj',
          eventName: 'Saturday Night Sessions',
          eventDate: '2025-10-18',
          spotsRequested: 10,
          currentCapacity: 75,
          reason: 'Special guests coming from out of town',
        },
        {
          id: 'cap_req_2',
          requesterName: 'Sarah (Staff)',
          requesterRole: 'staff',
          eventName: 'Deep House Vibes',
          eventDate: '2025-10-20',
          spotsRequested: 5,
          currentCapacity: 60,
          reason: 'VIP table reservation',
        },
      ];

      // Add capacity request alerts - individual if 5 or fewer, grouped if more
      if (mockCapacityRequests.length <= 5) {
        mockCapacityRequests.forEach(req => {
          mockAlerts.push({
            id: `capacity_${req.id}`,
            type: 'capacity',
            message: `${req.requesterName} requests ${req.spotsRequested} additional spots for ${req.eventName}`,
            capacityRequestId: req.id,
          });
        });
      } else {
        mockAlerts.push({
          id: 'capacity_requests',
          type: 'info',
          message: `${mockCapacityRequests.length} capacity increase requests pending`,
          action: 'Review Requests',
          actionUrl: '/manager/capacity-requests',
        });
      }

      // Generate mock guests
      const mockGuests: Guest[] = [
        {
          id: 'guest_1',
          name: 'Sarah Johnson',
          email: 'sarah.j@email.com',
          phone: '+1 555-0101',
          instagram: '@sarahjay',
          totalAttendance: 12,
          lastAttended: '2025-10-06',
          addedBy: ['DJ Marcus', 'Staff Sarah'],
          status: 'active',
        },
        {
          id: 'guest_2',
          name: 'Mike Chen',
          email: 'mike.chen@email.com',
          phone: '+1 555-0102',
          totalAttendance: 8,
          lastAttended: '2025-10-01',
          addedBy: ['DJ Shadow'],
          status: 'active',
        },
        {
          id: 'guest_3',
          name: 'Emma Wilson',
          email: 'emma.w@email.com',
          phone: '+1 555-0103',
          instagram: '@emmawilson',
          totalAttendance: 15,
          lastAttended: '2025-10-08',
          addedBy: ['DJ Marcus', 'DJ Shadow', 'Staff Tom'],
          status: 'active',
        },
        {
          id: 'guest_4',
          name: 'James Rodriguez',
          email: 'j.rodriguez@email.com',
          phone: '+1 555-0104',
          totalAttendance: 5,
          lastAttended: '2025-09-28',
          addedBy: ['Staff Sarah'],
          status: 'active',
        },
        {
          id: 'guest_5',
          name: 'Lisa Park',
          email: 'lisa.park@email.com',
          phone: '+1 555-0105',
          instagram: '@lisaparks',
          totalAttendance: 20,
          lastAttended: '2025-10-10',
          addedBy: ['DJ Marcus', 'Promoter Alex'],
          status: 'active',
        },
        {
          id: 'guest_6',
          name: 'David Kim',
          email: 'david.k@email.com',
          phone: '+1 555-0106',
          totalAttendance: 3,
          lastAttended: '2025-09-15',
          addedBy: ['DJ Shadow'],
          status: 'banned',
        },
        {
          id: 'guest_7',
          name: 'Rachel Green',
          email: 'rachel.g@email.com',
          phone: '+1 555-0107',
          instagram: '@rachelgreen',
          totalAttendance: 18,
          lastAttended: '2025-10-09',
          addedBy: ['DJ Marcus', 'Staff Tom'],
          status: 'active',
        },
        {
          id: 'guest_8',
          name: 'Tom Anderson',
          email: 'tom.a@email.com',
          phone: '+1 555-0108',
          totalAttendance: 7,
          lastAttended: '2025-10-02',
          addedBy: ['Staff Sarah'],
          status: 'active',
        },
        {
          id: 'guest_9',
          name: 'Nina Patel',
          email: 'nina.p@email.com',
          phone: '+1 555-0109',
          instagram: '@ninapatel',
          totalAttendance: 11,
          lastAttended: '2025-10-07',
          addedBy: ['DJ Marcus', 'Promoter Alex'],
          status: 'active',
        },
        {
          id: 'guest_10',
          name: 'Alex Turner',
          email: 'alex.t@email.com',
          phone: '+1 555-0110',
          totalAttendance: 6,
          lastAttended: '2025-09-25',
          addedBy: ['DJ Shadow'],
          status: 'active',
        },
        {
          id: 'guest_11',
          name: 'Sophie Martinez',
          email: 'sophie.m@email.com',
          phone: '+1 555-0111',
          instagram: '@sophiem',
          totalAttendance: 14,
          lastAttended: '2025-10-11',
          addedBy: ['DJ Marcus', 'Staff Tom', 'Staff Sarah'],
          status: 'active',
        },
        {
          id: 'guest_12',
          name: 'Chris Brown',
          email: 'chris.b@email.com',
          phone: '+1 555-0112',
          totalAttendance: 4,
          lastAttended: '2025-09-20',
          addedBy: ['Promoter Alex'],
          status: 'active',
        },
        {
          id: 'guest_13',
          name: 'Maya Singh',
          email: 'maya.s@email.com',
          phone: '+1 555-0113',
          instagram: '@mayasingh',
          totalAttendance: 9,
          lastAttended: '2025-10-05',
          addedBy: ['DJ Marcus'],
          status: 'active',
        },
        {
          id: 'guest_14',
          name: 'Jordan Lee',
          email: 'jordan.l@email.com',
          phone: '+1 555-0114',
          totalAttendance: 16,
          lastAttended: '2025-10-12',
          addedBy: ['DJ Shadow', 'Staff Tom'],
          status: 'active',
        },
        {
          id: 'guest_15',
          name: 'Olivia White',
          email: 'olivia.w@email.com',
          phone: '+1 555-0115',
          instagram: '@oliviawhite',
          totalAttendance: 10,
          lastAttended: '2025-10-04',
          addedBy: ['DJ Marcus', 'Promoter Alex'],
          status: 'active',
        },
      ];

      // Generate mock DJs
      const mockDJs: DJ[] = [
        {
          id: 'dj_1',
          name: 'DJ Marcus',
          email: 'marcus@email.com',
          phone: '+1 555-1001',
          instagram: '@djmarcus',
          totalEvents: 45,
          avgAttendance: 68,
          paidAttendance: 52,
          avgRevenue: 3200,
          defaultCap: 75,
          lastPerformed: '2025-10-06',
          status: 'active',
          upcomingGigs: 3,
          totalGuestsAdded: 156,
        },
        {
          id: 'dj_2',
          name: 'DJ Shadow',
          email: 'shadow@email.com',
          phone: '+1 555-1002',
          instagram: '@djshadow',
          totalEvents: 38,
          avgAttendance: 55,
          paidAttendance: 38,
          avgRevenue: 2800,
          defaultCap: 60,
          lastPerformed: '2025-10-01',
          status: 'active',
          upcomingGigs: 2,
          totalGuestsAdded: 98,
        },
        {
          id: 'dj_3',
          name: 'Sarah Deep',
          email: 'sarah.deep@email.com',
          phone: '+1 555-1003',
          instagram: '@sarahdeep',
          totalEvents: 52,
          avgAttendance: 72,
          paidAttendance: 58,
          avgRevenue: 3800,
          defaultCap: 80,
          lastPerformed: '2025-10-10',
          status: 'active',
          upcomingGigs: 4,
          totalGuestsAdded: 203,
        },
        {
          id: 'dj_4',
          name: 'MC Groove',
          email: 'mcgroove@email.com',
          phone: '+1 555-1004',
          totalEvents: 0,
          avgAttendance: 0,
          paidAttendance: 0,
          avgRevenue: 0,
          defaultCap: 50,
          lastPerformed: '',
          status: 'pending',
          upcomingGigs: 1,
          totalGuestsAdded: 0,
        },
        {
          id: 'dj_5',
          name: 'Techno Tom',
          email: 'techno.tom@email.com',
          phone: '+1 555-1005',
          instagram: '@technotom',
          totalEvents: 28,
          avgAttendance: 48,
          paidAttendance: 32,
          avgRevenue: 2400,
          defaultCap: 55,
          lastPerformed: '2025-09-22',
          status: 'active',
          upcomingGigs: 1,
          totalGuestsAdded: 72,
        },
        {
          id: 'dj_6',
          name: 'Vinyl Vince',
          email: 'vinyl.v@email.com',
          phone: '+1 555-1006',
          instagram: '@vinylvince',
          totalEvents: 61,
          avgAttendance: 82,
          paidAttendance: 68,
          avgRevenue: 4500,
          defaultCap: 90,
          lastPerformed: '2025-10-08',
          status: 'active',
          upcomingGigs: 5,
          totalGuestsAdded: 287,
        },
        {
          id: 'dj_7',
          name: 'Bass Queen',
          email: 'bassqueen@email.com',
          phone: '+1 555-1007',
          instagram: '@bassqueen',
          totalEvents: 19,
          avgAttendance: 41,
          paidAttendance: 28,
          avgRevenue: 1800,
          defaultCap: 45,
          lastPerformed: '2025-09-15',
          status: 'active',
          upcomingGigs: 0,
          totalGuestsAdded: 53,
        },
        {
          id: 'dj_8',
          name: 'House Master',
          email: 'housemaster@email.com',
          phone: '+1 555-1008',
          instagram: '@housemaster',
          totalEvents: 34,
          avgAttendance: 61,
          paidAttendance: 45,
          avgRevenue: 3100,
          defaultCap: 70,
          lastPerformed: '2025-10-03',
          status: 'active',
          upcomingGigs: 2,
          totalGuestsAdded: 142,
        },
      ];

      // Generate mock Staff
      const mockStaff: Staff[] = [
        {
          id: 'staff_1',
          name: 'Sarah Mitchell',
          email: 'sarah.mitchell@nightclub.com',
          phone: '+1 555-2001',
          instagram: '@sarahmitchell',
          role: 'Door Manager',
          totalEventsWorked: 42,
          totalGuestsAdded: 156,
          avgGuestsPerEvent: 3.7,
          lastWorked: '2025-10-11',
          status: 'active',
          upcomingShifts: 3,
        },
        {
          id: 'staff_2',
          name: 'Tom Bradley',
          email: 'tom.bradley@nightclub.com',
          phone: '+1 555-2002',
          instagram: '@tombradley',
          role: 'Door Manager',
          totalEventsWorked: 38,
          totalGuestsAdded: 124,
          avgGuestsPerEvent: 3.3,
          lastWorked: '2025-10-10',
          status: 'active',
          upcomingShifts: 2,
        },
        {
          id: 'staff_3',
          name: 'Alex Chen',
          email: 'alex.chen@nightclub.com',
          phone: '+1 555-2003',
          instagram: '@alexchen',
          role: 'Bar Manager',
          totalEventsWorked: 28,
          totalGuestsAdded: 89,
          avgGuestsPerEvent: 3.2,
          lastWorked: '2025-10-09',
          status: 'active',
          upcomingShifts: 4,
        },
        {
          id: 'staff_4',
          name: 'Jamie Rodriguez',
          email: 'jamie.r@nightclub.com',
          phone: '+1 555-2004',
          instagram: '@jamierodriguez',
          role: 'Security',
          totalEventsWorked: 52,
          totalGuestsAdded: 45,
          avgGuestsPerEvent: 0.9,
          lastWorked: '2025-10-12',
          status: 'active',
          upcomingShifts: 5,
        },
        {
          id: 'staff_5',
          name: 'Morgan Lee',
          email: 'morgan.lee@nightclub.com',
          phone: '+1 555-2005',
          instagram: '@morganlee',
          role: 'VIP Host',
          totalEventsWorked: 31,
          totalGuestsAdded: 198,
          avgGuestsPerEvent: 6.4,
          lastWorked: '2025-10-08',
          status: 'active',
          upcomingShifts: 2,
        },
        {
          id: 'staff_6',
          name: 'David Park',
          email: 'david.park@nightclub.com',
          phone: '+1 555-2006',
          instagram: '@davidpark',
          role: 'Security',
          totalEventsWorked: 47,
          totalGuestsAdded: 38,
          avgGuestsPerEvent: 0.8,
          lastWorked: '2025-10-11',
          status: 'active',
          upcomingShifts: 4,
        },
        {
          id: 'staff_7',
          name: 'Rachel Foster',
          email: 'rachel.foster@nightclub.com',
          phone: '+1 555-2007',
          instagram: '@rachelfoster',
          role: 'VIP Host',
          totalEventsWorked: 25,
          totalGuestsAdded: 175,
          avgGuestsPerEvent: 7.0,
          lastWorked: '2025-10-12',
          status: 'active',
          upcomingShifts: 3,
        },
        {
          id: 'staff_8',
          name: 'Marcus Johnson',
          email: 'marcus.j@nightclub.com',
          phone: '+1 555-2008',
          instagram: '@marcusjohnson',
          role: 'Bar Manager',
          totalEventsWorked: 35,
          totalGuestsAdded: 112,
          avgGuestsPerEvent: 3.2,
          lastWorked: '2025-10-10',
          status: 'active',
          upcomingShifts: 2,
        },
        {
          id: 'staff_9',
          name: 'Elena Vasquez',
          email: 'elena.v@nightclub.com',
          phone: '+1 555-2009',
          instagram: '@elenavasquez',
          role: 'Door Manager',
          totalEventsWorked: 44,
          totalGuestsAdded: 167,
          avgGuestsPerEvent: 3.8,
          lastWorked: '2025-10-09',
          status: 'active',
          upcomingShifts: 3,
        },
        {
          id: 'staff_10',
          name: "Kevin O'Brien",
          email: 'kevin.obrien@nightclub.com',
          phone: '+1 555-2010',
          instagram: '@kevinobrien',
          role: 'Security',
          totalEventsWorked: 55,
          totalGuestsAdded: 42,
          avgGuestsPerEvent: 0.8,
          lastWorked: '2025-10-12',
          status: 'active',
          upcomingShifts: 5,
        },
        {
          id: 'staff_11',
          name: 'Sophia Turner',
          email: 'sophia.turner@nightclub.com',
          phone: '+1 555-2011',
          instagram: '@sophiaturner',
          role: 'VIP Host',
          totalEventsWorked: 29,
          totalGuestsAdded: 189,
          avgGuestsPerEvent: 6.5,
          lastWorked: '2025-10-11',
          status: 'active',
          upcomingShifts: 2,
        },
        {
          id: 'staff_12',
          name: 'Andre Williams',
          email: 'andre.w@nightclub.com',
          phone: '+1 555-2012',
          instagram: '@andrewilliams',
          role: 'Door Manager',
          totalEventsWorked: 33,
          totalGuestsAdded: 128,
          avgGuestsPerEvent: 3.9,
          lastWorked: '2025-10-08',
          status: 'active',
          upcomingShifts: 3,
        },
        {
          id: 'staff_13',
          name: 'Lisa Thompson',
          email: 'lisa.thompson@nightclub.com',
          phone: '+1 555-2013',
          instagram: '@lisathompson',
          role: 'Bar Manager',
          totalEventsWorked: 22,
          totalGuestsAdded: 71,
          avgGuestsPerEvent: 3.2,
          lastWorked: '2025-10-07',
          status: 'active',
          upcomingShifts: 2,
        },
        {
          id: 'staff_14',
          name: 'Carlos Mendez',
          email: 'carlos.mendez@nightclub.com',
          phone: '+1 555-2014',
          instagram: '@carlosmendez',
          role: 'Security',
          totalEventsWorked: 49,
          totalGuestsAdded: 39,
          avgGuestsPerEvent: 0.8,
          lastWorked: '2025-10-10',
          status: 'active',
          upcomingShifts: 4,
        },
        {
          id: 'staff_15',
          name: 'Jessica Kim',
          email: 'jessica.kim@nightclub.com',
          phone: '+1 555-2015',
          instagram: '@jessicakim',
          role: 'VIP Host',
          totalEventsWorked: 27,
          totalGuestsAdded: 182,
          avgGuestsPerEvent: 6.7,
          lastWorked: '2025-10-09',
          status: 'active',
          upcomingShifts: 3,
        },
        {
          id: 'staff_16',
          name: 'Ryan Hughes',
          email: 'ryan.hughes@nightclub.com',
          phone: '+1 555-2016',
          instagram: '@ryanhughes',
          role: 'Door Manager',
          totalEventsWorked: 19,
          totalGuestsAdded: 78,
          avgGuestsPerEvent: 4.1,
          lastWorked: '2025-10-06',
          status: 'active',
          upcomingShifts: 2,
        },
        {
          id: 'staff_17',
          name: 'Nina Patel',
          email: 'nina.patel@nightclub.com',
          phone: '+1 555-2017',
          instagram: '@ninapatel',
          role: 'Bar Manager',
          totalEventsWorked: 31,
          totalGuestsAdded: 97,
          avgGuestsPerEvent: 3.1,
          lastWorked: '2025-10-11',
          status: 'active',
          upcomingShifts: 3,
        },
        {
          id: 'staff_18',
          name: 'Derek Stone',
          email: 'derek.stone@nightclub.com',
          phone: '+1 555-2018',
          instagram: '@derekstone',
          role: 'Security',
          totalEventsWorked: 41,
          totalGuestsAdded: 33,
          avgGuestsPerEvent: 0.8,
          lastWorked: '2025-10-12',
          status: 'active',
          upcomingShifts: 4,
        },
        {
          id: 'staff_19',
          name: 'Amanda Cruz',
          email: 'amanda.cruz@nightclub.com',
          phone: '+1 555-2019',
          instagram: '@amandacruz',
          role: 'VIP Host',
          totalEventsWorked: 24,
          totalGuestsAdded: 165,
          avgGuestsPerEvent: 6.9,
          lastWorked: '2025-10-10',
          status: 'active',
          upcomingShifts: 2,
        },
        {
          id: 'staff_20',
          name: 'Casey Wilson',
          email: 'casey.w@nightclub.com',
          phone: '+1 555-2020',
          instagram: '@caseywilson',
          role: 'Door Manager',
          totalEventsWorked: 0,
          totalGuestsAdded: 0,
          avgGuestsPerEvent: 0,
          lastWorked: '',
          status: 'pending',
          upcomingShifts: 1,
        },
      ];

      // Generate mock Promoters
      const mockPromoters: Promoter[] = [
        {
          id: 'promoter_1',
          name: 'Alex Martinez',
          email: 'alex.martinez@promo.com',
          phone: '+1 555-3001',
          instagram: '@alexpromotions',
          totalEvents: 28,
          totalGuestsAdded: 892,
          avgAttendance: 42,
          paidAttendance: 35,
          conversionRate: 83,
          avgRevenue: 2100,
          lastPerformed: '2025-10-11',
          defaultCap: 50,
        },
        {
          id: 'promoter_2',
          name: 'Taylor Swift Events',
          email: 'taylor@nightevents.com',
          phone: '+1 555-3002',
          instagram: '@taylorpromo',
          totalEvents: 35,
          totalGuestsAdded: 1245,
          avgAttendance: 48,
          paidAttendance: 41,
          conversionRate: 85,
          avgRevenue: 2450,
          lastPerformed: '2025-10-12',
          defaultCap: 60,
        },
        {
          id: 'promoter_3',
          name: 'Jordan Blake',
          email: 'jordan.blake@nightlife.com',
          phone: '+1 555-3003',
          instagram: '@jordanblake',
          totalEvents: 22,
          totalGuestsAdded: 756,
          avgAttendance: 38,
          paidAttendance: 30,
          conversionRate: 79,
          avgRevenue: 1800,
          lastPerformed: '2025-10-09',
          defaultCap: 45,
        },
        {
          id: 'promoter_4',
          name: 'Sam Rivera',
          email: 'sam.rivera@vipnights.com',
          phone: '+1 555-3004',
          instagram: '@samriveravip',
          totalEvents: 41,
          totalGuestsAdded: 1580,
          avgAttendance: 52,
          paidAttendance: 45,
          conversionRate: 87,
          avgRevenue: 2700,
          lastPerformed: '2025-10-10',
          defaultCap: 65,
        },
        {
          id: 'promoter_5',
          name: 'Chris Anderson',
          email: 'chris.a@nightclub.com',
          phone: '+1 555-3005',
          instagram: '@chrisanderson',
          totalEvents: 19,
          totalGuestsAdded: 634,
          avgAttendance: 35,
          paidAttendance: 28,
          conversionRate: 80,
          avgRevenue: 1650,
          lastPerformed: '2025-10-08',
          defaultCap: 40,
        },
        {
          id: 'promoter_6',
          name: 'Morgan Chen',
          email: 'morgan.chen@cityevents.com',
          phone: '+1 555-3006',
          instagram: '@morganchen',
          totalEvents: 33,
          totalGuestsAdded: 1098,
          avgAttendance: 45,
          paidAttendance: 38,
          conversionRate: 84,
          avgRevenue: 2250,
          lastPerformed: '2025-10-11',
          defaultCap: 55,
        },
        {
          id: 'promoter_7',
          name: 'Riley Foster',
          email: 'riley.foster@promo.com',
          phone: '+1 555-3007',
          instagram: '@rileyfoster',
          totalEvents: 25,
          totalGuestsAdded: 823,
          avgAttendance: 40,
          paidAttendance: 33,
          conversionRate: 83,
          avgRevenue: 1950,
          lastPerformed: '2025-10-07',
          defaultCap: 48,
        },
        {
          id: 'promoter_8',
          name: 'Casey Thompson',
          email: 'casey.t@events.com',
          phone: '+1 555-3008',
          instagram: '@caseythompson',
          totalEvents: 37,
          totalGuestsAdded: 1334,
          avgAttendance: 49,
          paidAttendance: 42,
          conversionRate: 86,
          avgRevenue: 2400,
          lastPerformed: '2025-10-12',
          defaultCap: 58,
        },
        {
          id: 'promoter_9',
          name: 'Drew Miller',
          email: 'drew.miller@nightlife.com',
          phone: '+1 555-3009',
          instagram: '@drewmiller',
          totalEvents: 16,
          totalGuestsAdded: 512,
          avgAttendance: 32,
          paidAttendance: 26,
          conversionRate: 81,
          avgRevenue: 1550,
          lastPerformed: '2025-10-06',
          defaultCap: 38,
        },
        {
          id: 'promoter_10',
          name: 'Quinn Davis',
          email: 'quinn.davis@vipevents.com',
          phone: '+1 555-3010',
          instagram: '@quinndavis',
          totalEvents: 44,
          totalGuestsAdded: 1678,
          avgAttendance: 54,
          paidAttendance: 47,
          conversionRate: 87,
          avgRevenue: 2850,
          lastPerformed: '2025-10-11',
          defaultCap: 68,
        },
      ];

      // Generate mock Managers
      const mockManagers: Manager[] = [
        {
          id: 'manager_1',
          name: 'Sarah Johnson',
          email: 'sarah.johnson@venue.com',
          phone: '+1 555-4001',
          instagram: '@sarahjohnson',
          eventsCreated: 45,
          avgRevenue: 3200,
          avgConversion: 67,
          avgTotalGuests: 120,
          avgPaidGuests: 85,
          lastActive: '2025-10-12',
          status: 'active',
          team: 'Operations',
        },
        {
          id: 'manager_2',
          name: 'Marcus Chen',
          email: 'marcus.chen@venue.com',
          phone: '+1 555-4002',
          instagram: '@marcuschen',
          eventsCreated: 38,
          avgRevenue: 2800,
          avgConversion: 72,
          avgTotalGuests: 95,
          avgPaidGuests: 68,
          lastActive: '2025-10-11',
          status: 'active',
          team: 'Nightlife',
        },
        {
          id: 'manager_3',
          name: 'Jessica Rodriguez',
          email: 'jessica.r@venue.com',
          phone: '+1 555-4003',
          instagram: '@jessicar',
          eventsCreated: 52,
          avgRevenue: 4100,
          avgConversion: 58,
          avgTotalGuests: 150,
          avgPaidGuests: 110,
          lastActive: '2025-10-13',
          status: 'active',
          team: 'Events',
        },
        {
          id: 'manager_4',
          name: 'David Kim',
          email: 'david.kim@venue.com',
          phone: '+1 555-4004',
          instagram: '@davidkim',
          eventsCreated: 31,
          avgRevenue: 2500,
          avgConversion: 64,
          avgTotalGuests: 88,
          avgPaidGuests: 56,
          lastActive: '2025-10-10',
          status: 'active',
          team: 'Marketing',
        },
        {
          id: 'manager_5',
          name: 'Emily Watson',
          email: 'emily.watson@venue.com',
          phone: '+1 555-4005',
          instagram: '@emilywatson',
          eventsCreated: 28,
          avgRevenue: 2200,
          avgConversion: 70,
          avgTotalGuests: 78,
          avgPaidGuests: 55,
          lastActive: '2025-10-09',
          status: 'active',
          team: 'Operations',
        },
        {
          id: 'manager_6',
          name: 'Robert Taylor',
          email: 'robert.taylor@venue.com',
          phone: '+1 555-4006',
          instagram: '@roberttaylor',
          eventsCreated: 42,
          avgRevenue: 3600,
          avgConversion: 75,
          avgTotalGuests: 135,
          avgPaidGuests: 101,
          lastActive: '2025-10-12',
          status: 'active',
          team: 'Nightlife',
        },
        {
          id: 'manager_7',
          name: 'Amanda Brooks',
          email: 'amanda.brooks@venue.com',
          phone: '+1 555-4007',
          instagram: '@amandabrooks',
          eventsCreated: 15,
          avgRevenue: 1800,
          avgConversion: 62,
          avgTotalGuests: 65,
          avgPaidGuests: 40,
          lastActive: '2025-10-08',
          status: 'pending',
          team: 'Events',
        },
        {
          id: 'manager_8',
          name: 'Michael Anderson',
          email: 'michael.a@venue.com',
          phone: '+1 555-4008',
          instagram: '@michaelanderson',
          eventsCreated: 48,
          avgRevenue: 3800,
          avgConversion: 69,
          avgTotalGuests: 142,
          avgPaidGuests: 98,
          lastActive: '2025-10-11',
          status: 'active',
          team: 'Operations',
        },
      ];

      setEvents(mockEvents);
      setAlerts(mockAlerts);
      setGuests(mockGuests);
      setDjs(mockDJs);
      setStaff(mockStaff);
      setPromoters(mockPromoters);
      setManagers(mockManagers);
      setIsLoading(false);
    }, 1000);
  }, [router]);

  const handleLogout = () => {
    SafeStorage.removeItem('manager_authenticated');
    SafeStorage.removeItem('manager_email');
    SafeStorage.removeItem('manager_role');
    SafeStorage.removeItem('manager_name');
    router.push('/manager/login');
  };

  // Guest management functions
  const handleGuestSort = (column: 'name' | 'attendance' | 'lastAttended' | 'addedBy') => {
    if (guestSortColumn === column) {
      setGuestSortDirection(guestSortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setGuestSortColumn(column);
      setGuestSortDirection('asc');
    }
  };

  // Filter and sort guests
  const filteredGuests = guests
    .filter(guest => {
      // Search filter
      const searchLower = guestSearch.toLowerCase();
      const matchesSearch =
        guest.name.toLowerCase().includes(searchLower) ||
        guest.email.toLowerCase().includes(searchLower) ||
        guest.instagram?.toLowerCase().includes(searchLower);

      // Added by filter
      const matchesFilter = guestFilter === 'all' || guest.addedBy.includes(guestFilter);

      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      let comparison = 0;

      if (guestSortColumn === 'name') {
        comparison = a.name.localeCompare(b.name);
      } else if (guestSortColumn === 'attendance') {
        comparison = a.totalAttendance - b.totalAttendance;
      } else if (guestSortColumn === 'lastAttended') {
        comparison = a.lastAttended.localeCompare(b.lastAttended);
      } else if (guestSortColumn === 'addedBy') {
        comparison = a.addedBy.join(', ').localeCompare(b.addedBy.join(', '));
      }

      return guestSortDirection === 'asc' ? comparison : -comparison;
    });

  // Get unique "Added By" users for filter dropdown
  const addedByOptions = Array.from(new Set(guests.flatMap(g => g.addedBy))).sort();

  // DJ management functions
  const handleDjSort = (
    column:
      | 'name'
      | 'totalEvents'
      | 'avgAttendance'
      | 'paidAttendance'
      | 'conversionRate'
      | 'avgRevenue'
      | 'lastPerformed'
  ) => {
    if (djSortColumn === column) {
      setDjSortDirection(djSortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setDjSortColumn(column);
      setDjSortDirection('asc');
    }
  };

  // Sort DJs
  const sortedDJs = [...djs].sort((a, b) => {
    let comparison = 0;

    if (djSortColumn === 'name') {
      comparison = a.name.localeCompare(b.name);
    } else if (djSortColumn === 'totalEvents') {
      comparison = a.totalEvents - b.totalEvents;
    } else if (djSortColumn === 'avgAttendance') {
      comparison = a.avgAttendance - b.avgAttendance;
    } else if (djSortColumn === 'paidAttendance') {
      comparison = a.paidAttendance - b.paidAttendance;
    } else if (djSortColumn === 'conversionRate') {
      const aRate =
        a.totalGuestsAdded > 0 && a.avgAttendance > 0
          ? (a.avgAttendance / a.totalGuestsAdded) * 100
          : 0;
      const bRate =
        b.totalGuestsAdded > 0 && b.avgAttendance > 0
          ? (b.avgAttendance / b.totalGuestsAdded) * 100
          : 0;
      comparison = aRate - bRate;
    } else if (djSortColumn === 'avgRevenue') {
      comparison = a.avgRevenue - b.avgRevenue;
    } else if (djSortColumn === 'lastPerformed') {
      if (!a.lastPerformed) return 1;
      if (!b.lastPerformed) return -1;
      comparison = a.lastPerformed.localeCompare(b.lastPerformed);
    }

    return djSortDirection === 'asc' ? comparison : -comparison;
  });

  // Staff management functions
  const handleStaffSort = (
    column:
      | 'name'
      | 'role'
      | 'totalEventsWorked'
      | 'totalGuestsAdded'
      | 'avgGuestsPerEvent'
      | 'lastWorked'
  ) => {
    if (staffSortColumn === column) {
      setStaffSortDirection(staffSortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setStaffSortColumn(column);
      setStaffSortDirection('asc');
    }
  };

  // Sort Staff
  const sortedStaff = [...staff].sort((a, b) => {
    let comparison = 0;

    if (staffSortColumn === 'name') {
      comparison = a.name.localeCompare(b.name);
    } else if (staffSortColumn === 'role') {
      comparison = a.role.localeCompare(b.role);
    } else if (staffSortColumn === 'totalEventsWorked') {
      comparison = a.totalEventsWorked - b.totalEventsWorked;
    } else if (staffSortColumn === 'totalGuestsAdded') {
      comparison = a.totalGuestsAdded - b.totalGuestsAdded;
    } else if (staffSortColumn === 'avgGuestsPerEvent') {
      comparison = a.avgGuestsPerEvent - b.avgGuestsPerEvent;
    } else if (staffSortColumn === 'lastWorked') {
      if (!a.lastWorked) return 1;
      if (!b.lastWorked) return -1;
      comparison = a.lastWorked.localeCompare(b.lastWorked);
    }

    return staffSortDirection === 'asc' ? comparison : -comparison;
  });

  // Promoter management functions
  const handlePromoterSort = (
    column:
      | 'name'
      | 'totalEvents'
      | 'totalGuestsAdded'
      | 'avgAttendance'
      | 'paidAttendance'
      | 'conversionRate'
      | 'avgRevenue'
      | 'lastPerformed'
  ) => {
    if (promoterSortColumn === column) {
      setPromoterSortDirection(promoterSortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setPromoterSortColumn(column);
      setPromoterSortDirection('asc');
    }
  };

  // Sort Promoters
  const sortedPromoters = [...promoters].sort((a, b) => {
    let comparison = 0;

    if (promoterSortColumn === 'name') {
      comparison = a.name.localeCompare(b.name);
    } else if (promoterSortColumn === 'totalEvents') {
      comparison = a.totalEvents - b.totalEvents;
    } else if (promoterSortColumn === 'totalGuestsAdded') {
      comparison = a.totalGuestsAdded - b.totalGuestsAdded;
    } else if (promoterSortColumn === 'avgAttendance') {
      comparison = a.avgAttendance - b.avgAttendance;
    } else if (promoterSortColumn === 'paidAttendance') {
      comparison = a.paidAttendance - b.paidAttendance;
    } else if (promoterSortColumn === 'conversionRate') {
      comparison = a.conversionRate - b.conversionRate;
    } else if (promoterSortColumn === 'avgRevenue') {
      comparison = a.avgRevenue - b.avgRevenue;
    } else if (promoterSortColumn === 'lastPerformed') {
      if (!a.lastPerformed) return 1;
      if (!b.lastPerformed) return -1;
      comparison = a.lastPerformed.localeCompare(b.lastPerformed);
    }

    return promoterSortDirection === 'asc' ? comparison : -comparison;
  });

  // Manager management functions
  const handleManagerSort = (
    column:
      | 'name'
      | 'eventsCreated'
      | 'avgRevenue'
      | 'avgConversion'
      | 'avgTotalGuests'
      | 'avgPaidGuests'
  ) => {
    if (managerSortColumn === column) {
      setManagerSortDirection(managerSortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setManagerSortColumn(column);
      setManagerSortDirection('asc');
    }
  };

  // Sort Managers
  const sortedManagers = [...managers].sort((a, b) => {
    let comparison = 0;

    if (managerSortColumn === 'name') {
      comparison = a.name.localeCompare(b.name);
    } else if (managerSortColumn === 'eventsCreated') {
      comparison = a.eventsCreated - b.eventsCreated;
    } else if (managerSortColumn === 'avgRevenue') {
      comparison = a.avgRevenue - b.avgRevenue;
    } else if (managerSortColumn === 'avgConversion') {
      comparison = a.avgConversion - b.avgConversion;
    } else if (managerSortColumn === 'avgTotalGuests') {
      comparison = a.avgTotalGuests - b.avgTotalGuests;
    } else if (managerSortColumn === 'avgPaidGuests') {
      comparison = a.avgPaidGuests - b.avgPaidGuests;
    }

    return managerSortDirection === 'asc' ? comparison : -comparison;
  });

  // Event History sorting handler
  const handleEventHistorySort = (
    column: 'date' | 'eventName' | 'attendance' | 'capacity' | 'revenue'
  ) => {
    if (eventHistorySortColumn === column) {
      setEventHistorySortDirection(eventHistorySortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setEventHistorySortColumn(column);
      setEventHistorySortDirection('asc');
    }
  };

  // Handle invite DJ form submission
  const handleInviteDj = () => {
    if (!inviteDjForm.stageName || !inviteDjForm.email) return;

    const newDj: DJ = {
      id: `dj_new_${Date.now()}`,
      name: inviteDjForm.stageName,
      email: inviteDjForm.email,
      phone: inviteDjForm.phone,
      totalEvents: 0,
      avgAttendance: 0,
      paidAttendance: 0,
      avgRevenue: 0,
      defaultCap: 50,
      lastPerformed: '',
      status: 'pending',
      upcomingGigs: inviteDjForm.upcomingGigDate ? 1 : 0,
      totalGuestsAdded: 0,
    };

    setDjs([...djs, newDj]);
    setShowInviteDjModal(false);
    setInviteDjForm({
      stageName: '',
      givenName: '',
      email: '',
      phone: '',
      upcomingGigDate: '',
    });
  };

  // Handle escape key to close modals
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (showInviteUserModal) {
          setShowInviteUserModal(false);
        } else if (showInviteDjModal) {
          setShowInviteDjModal(false);
        } else if (showInviteStaffModal) {
          setShowInviteStaffModal(false);
        } else if (showInvitePromoterModal) {
          setShowInvitePromoterModal(false);
        } else if (selectedGuestId) {
          setSelectedGuestId(null);
        } else if (selectedDjId) {
          setSelectedDjId(null);
        } else if (selectedStaffId) {
          setSelectedStaffId(null);
        } else if (selectedPromoterId) {
          setSelectedPromoterId(null);
        } else if (selectedManagerId) {
          setSelectedManagerId(null);
        }
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [
    showInviteUserModal,
    showInviteDjModal,
    showInviteStaffModal,
    showInvitePromoterModal,
    selectedGuestId,
    selectedDjId,
    selectedStaffId,
    selectedPromoterId,
    selectedManagerId,
  ]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-200">
        <div className="max-w-6xl mx-auto p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-light tracking-tight mb-1">Manager Dashboard</h1>
              <p className="text-gray-600">Welcome back, {managerName}</p>
              <div className="text-xs text-gray-500 mt-1">
                Role: {managerRole.charAt(0).toUpperCase() + managerRole.slice(1)}
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => router.push('/manager/events/create')}
                className="bg-black text-white px-6 py-2 rounded-full hover:bg-gray-900 transition-colors text-sm"
              >
                Create Event
              </button>
              <button
                onClick={() => {
                  setActiveTab('users');
                  setInviteUserType('dj'); // Default to DJ
                  setShowInviteUserModal(true);
                }}
                className="bg-gray-100 text-black px-6 py-2 rounded-full hover:bg-gray-200 transition-colors text-sm"
              >
                Invite User
              </button>
              <button
                onClick={handleLogout}
                className="text-gray-600 hover:text-black transition-colors text-sm"
              >
                Logout
              </button>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex gap-8 border-b border-gray-200">
            <button
              onClick={() => setActiveTab('overview')}
              className={`pb-3 text-sm transition-colors relative ${
                activeTab === 'overview' ? 'text-black' : 'text-gray-500 hover:text-black'
              }`}
            >
              Overview
              {activeTab === 'overview' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-black"></div>
              )}
            </button>
            <button
              onClick={() => setActiveTab('calendar')}
              className={`pb-3 text-sm transition-colors relative ${
                activeTab === 'calendar' ? 'text-black' : 'text-gray-500 hover:text-black'
              }`}
            >
              Calendar
              {activeTab === 'calendar' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-black"></div>
              )}
            </button>
            <button
              onClick={() => setActiveTab('guests')}
              className={`pb-3 text-sm transition-colors relative ${
                activeTab === 'guests' ? 'text-black' : 'text-gray-500 hover:text-black'
              }`}
            >
              Guests
              {activeTab === 'guests' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-black"></div>
              )}
            </button>
            <button
              onClick={() => setActiveTab('users')}
              className={`pb-3 text-sm transition-colors relative ${
                activeTab === 'users' ? 'text-black' : 'text-gray-500 hover:text-black'
              }`}
            >
              Nightlist Users
              {activeTab === 'users' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-black"></div>
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div>
            {/* Alerts Section */}
            {alerts.length > 0 && (
              <div className="mb-8">
                <h2 className="text-xl mb-4">Alerts</h2>
                <div className="space-y-3">
                  {alerts.map(alert => (
                    <div
                      key={alert.id}
                      className={`p-4 rounded-2xl border ${
                        alert.type === 'error'
                          ? 'bg-red-50 border-red-200'
                          : alert.type === 'warning'
                            ? 'bg-yellow-50 border-yellow-200'
                            : 'bg-gray-50 border-gray-200'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-gray-700">{alert.message}</p>
                        {alert.type === 'capacity' ? (
                          <div className="flex gap-2">
                            <button
                              onClick={() => {
                                console.log('Approved capacity request:', alert.capacityRequestId);
                                setAlerts(alerts.filter(a => a.id !== alert.id));
                              }}
                              className="text-sm bg-black text-white px-4 py-1.5 rounded-full hover:bg-gray-900 transition-colors"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => {
                                console.log('Denied capacity request:', alert.capacityRequestId);
                                setAlerts(alerts.filter(a => a.id !== alert.id));
                              }}
                              className="text-sm bg-white border border-gray-300 px-4 py-1.5 rounded-full hover:bg-gray-50 transition-colors"
                            >
                              Deny
                            </button>
                          </div>
                        ) : alert.action ? (
                          <button
                            onClick={() => router.push(alert.actionUrl || '#')}
                            className="text-sm bg-white border border-gray-300 px-3 py-1 rounded-full hover:bg-gray-50 transition-colors"
                          >
                            {alert.action}
                          </button>
                        ) : null}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* This Week */}
            <div className="mb-8">
              <h2 className="text-xl mb-4">This Week</h2>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {events.map(event => (
                  <div
                    key={event.id}
                    className={`bg-white border rounded-3xl p-6 hover:bg-gray-50 transition-colors cursor-pointer ${
                      event.status === 'today' ? 'border-red-500 border-2' : 'border-gray-200'
                    }`}
                    onClick={() => router.push(`/manager/events/${event.id}`)}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-lg">{event.date}</h3>
                      {event.status === 'today' && (
                        <span className="text-xs bg-black text-white px-2 py-1 rounded-full">
                          Today
                        </span>
                      )}
                    </div>

                    <p className="text-sm text-gray-600 mb-6">{event.djNames}</p>

                    {/* Capacity Meter */}
                    <div className="mb-4">
                      <div className="w-full">
                        <div className="relative">
                          <div className="bg-gray-200 rounded-full h-4 relative overflow-hidden">
                            {/* Pending + Confirmed (light gray) bar - shows total */}
                            <div
                              className="bg-gray-400 h-4 rounded-full transition-all duration-300 absolute top-0 left-0"
                              style={{
                                width: `${((event.approvedGuests + event.pendingGuests) / event.totalGuests) * 100}%`,
                              }}
                            >
                              {/* Pending count inside the gray bar - only show if bar is wide enough */}
                              {event.pendingGuests > 0 &&
                                event.pendingGuests / event.totalGuests > 0.08 && (
                                  <span
                                    className="absolute top-1/2 -translate-y-1/2 text-white text-[10px] z-20"
                                    style={{ right: '8px' }}
                                  >
                                    {event.pendingGuests}
                                  </span>
                                )}
                            </div>
                            {/* Confirmed (black) bar - shows on top */}
                            <div
                              className="bg-black h-4 rounded-full transition-all duration-300 relative z-10"
                              style={{
                                width: `${(event.approvedGuests / event.totalGuests) * 100}%`,
                              }}
                            >
                              <span className="absolute right-2 top-1/2 -translate-y-1/2 text-white text-[10px]">
                                {event.approvedGuests}
                              </span>
                            </div>
                            <span className="absolute right-2 top-1/2 -translate-y-1/2 text-black text-[10px] z-20">
                              {event.totalGuests}
                            </span>
                          </div>

                          <div className="flex justify-between mt-2 relative">
                            <span className="text-xs text-gray-500">Confirmed</span>

                            {/* Pending label below the meter (normal position) - hide if too close to edges */}
                            {event.pendingGuests > 0 &&
                              (() => {
                                const pendingCenterPosition =
                                  ((event.approvedGuests + event.pendingGuests / 2) /
                                    event.totalGuests) *
                                  100;
                                const wouldOverlapConfirmed = pendingCenterPosition < 30;
                                const wouldOverlapSpots = pendingCenterPosition > 65;

                                return !wouldOverlapConfirmed && !wouldOverlapSpots ? (
                                  <span
                                    className="absolute text-xs text-gray-500"
                                    style={{
                                      left: `${pendingCenterPosition}%`,
                                      transform: 'translateX(-50%)',
                                    }}
                                  >
                                    Pending
                                  </span>
                                ) : null;
                              })()}

                            <span className="text-xs text-gray-500">Total</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Calendar Tab */}
        {activeTab === 'calendar' && (
          <div>
            {/* Calendar Header with Month Navigation */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    const newDate = new Date(selectedMonth);
                    newDate.setMonth(newDate.getMonth() - 1);
                    setSelectedMonth(newDate);
                  }}
                  className="px-3 py-1.5 text-sm border border-gray-300 rounded-full hover:bg-gray-50 transition-colors"
                >
                  ‹
                </button>
                <div className="relative">
                  <button
                    onClick={() => setShowMonthPicker(!showMonthPicker)}
                    className="text-lg font-light hover:text-gray-600 transition-colors"
                  >
                    {selectedMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                  </button>
                  {showMonthPicker && (
                    <div className="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg p-4 z-50 min-w-[280px]">
                      <div className="grid grid-cols-3 gap-2 mb-4">
                        {[
                          'Jan',
                          'Feb',
                          'Mar',
                          'Apr',
                          'May',
                          'Jun',
                          'Jul',
                          'Aug',
                          'Sep',
                          'Oct',
                          'Nov',
                          'Dec',
                        ].map((month, idx) => (
                          <button
                            key={month}
                            onClick={() => {
                              const newDate = new Date(selectedMonth);
                              newDate.setMonth(idx);
                              setSelectedMonth(newDate);
                              setShowMonthPicker(false);
                            }}
                            className={`px-3 py-2 text-sm rounded-lg transition-colors ${
                              selectedMonth.getMonth() === idx
                                ? 'bg-black text-white'
                                : 'hover:bg-gray-100'
                            }`}
                          >
                            {month}
                          </button>
                        ))}
                      </div>
                      <div className="border-t border-gray-200 pt-3">
                        <input
                          type="number"
                          value={selectedMonth.getFullYear()}
                          onChange={e => {
                            const newDate = new Date(selectedMonth);
                            newDate.setFullYear(
                              parseInt(e.target.value) || new Date().getFullYear()
                            );
                            setSelectedMonth(newDate);
                          }}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black"
                          placeholder="Year"
                        />
                      </div>
                    </div>
                  )}
                </div>
                <button
                  onClick={() => {
                    const newDate = new Date(selectedMonth);
                    newDate.setMonth(newDate.getMonth() + 1);
                    setSelectedMonth(newDate);
                  }}
                  className="px-3 py-1.5 text-sm border border-gray-300 rounded-full hover:bg-gray-50 transition-colors"
                >
                  ›
                </button>
              </div>
              <button
                onClick={() => setSelectedMonth(new Date())}
                className="px-4 py-2 text-sm bg-gray-100 text-black rounded-full hover:bg-gray-200 transition-colors"
              >
                Today
              </button>
            </div>

            {/* Calendar Grid */}
            <div>
              {/* Day Headers */}
              <div className="grid grid-cols-7 gap-3 mb-3">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                  <div key={day} className="text-sm font-medium text-gray-600">
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar Days */}
              <div className="grid grid-cols-7 gap-3">
                {(() => {
                  const year = selectedMonth.getFullYear();
                  const month = selectedMonth.getMonth();
                  const firstDay = new Date(year, month, 1).getDay();
                  const daysInMonth = new Date(year, month + 1, 0).getDate();
                  const today = new Date();
                  const todayStr = today.toISOString().split('T')[0];

                  const days = [];

                  // Empty cells for days before month starts
                  for (let i = 0; i < firstDay; i++) {
                    days.push(<div key={`empty-${i}`} className="min-h-[120px]"></div>);
                  }

                  // Days of the month
                  for (let day = 1; day <= daysInMonth; day++) {
                    const date = new Date(year, month, day);
                    const dateStr = date.toISOString().split('T')[0];
                    const isToday = dateStr === todayStr;

                    // Find events for this day
                    const dayEvents = events.filter(event => {
                      // Parse the event.date string (e.g., "Mon Oct 13")
                      // Extract month and day from event.date format: "Mon Oct 13"
                      const parts = event.date.split(' ');
                      const eventMonthName = parts[1]; // "Oct"
                      const eventDay = parseInt(parts[2]); // 13

                      // Get the full month name from our date
                      const monthName = date.toLocaleDateString('en-US', { month: 'short' });

                      // Match if same month and same day
                      return eventMonthName === monthName && eventDay === day;
                    });

                    days.push(
                      <div
                        key={day}
                        onClick={() => {
                          if (dayEvents.length > 0) {
                            router.push(`/manager/events/${dayEvents[0].id}`);
                          } else {
                            // Navigate to create event page with pre-selected date
                            router.push(`/manager/events/create?date=${dateStr}`);
                          }
                        }}
                        className={`min-h-[120px] p-3 rounded-xl border transition-colors flex flex-col cursor-pointer ${
                          isToday
                            ? 'bg-white border-red-500/50 border-2'
                            : 'bg-white border-gray-100 hover:border-gray-300'
                        }`}
                      >
                        <div
                          className={`text-sm mb-2 ${
                            isToday ? 'font-bold text-black' : 'text-gray-400'
                          }`}
                        >
                          {day}
                        </div>
                        <div className="flex-1 space-y-1">
                          {dayEvents.map(event => (
                            <div key={event.id} className="cursor-pointer">
                              <div className="text-xs font-normal text-gray-900 leading-tight">
                                {event.djNames.split(' & ').map((name, idx, arr) => (
                                  <span key={idx}>
                                    {name}
                                    {idx < arr.length - 1 && <br />}
                                  </span>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                        {dayEvents.length > 0 && (
                          <div className="relative mt-2">
                            <div className="bg-gray-200 rounded-full h-3 relative overflow-hidden">
                              {/* Use the first event's data for the meter */}
                              {(() => {
                                const event = dayEvents[0];
                                const confirmedPercent =
                                  (event.approvedGuests / event.totalGuests) * 100;
                                const totalPercent =
                                  ((event.approvedGuests + event.pendingGuests) /
                                    event.totalGuests) *
                                  100;
                                const showConfirmedNumber = confirmedPercent > 15; // Show if black bar is wider than 15%
                                const showTotalNumber = totalPercent < 90; // Hide if gray bar takes up more than 90%

                                return (
                                  <>
                                    {/* Pending + Confirmed bar */}
                                    <div
                                      className="bg-gray-400 h-3 rounded-full absolute top-0 left-0"
                                      style={{ width: `${totalPercent}%` }}
                                    ></div>
                                    {/* Confirmed bar */}
                                    <div
                                      className="bg-black h-3 rounded-full relative z-10 flex items-center justify-between px-1"
                                      style={{ width: `${confirmedPercent}%` }}
                                    >
                                      {showConfirmedNumber && (
                                        <span className="text-white text-[9px]">
                                          {event.approvedGuests}
                                        </span>
                                      )}
                                    </div>
                                    {/* Total number on the right */}
                                    {showTotalNumber && (
                                      <span className="absolute right-1 top-1/2 -translate-y-1/2 text-black text-[9px] z-20">
                                        {event.totalGuests}
                                      </span>
                                    )}
                                  </>
                                );
                              })()}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  }

                  return days;
                })()}
              </div>
            </div>
          </div>
        )}

        {/* Guests Tab */}
        {activeTab === 'guests' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl">All-Time Guests</h2>
              <div className="text-sm text-gray-600">
                {filteredGuests.length} {filteredGuests.length === 1 ? 'guest' : 'guests'}
              </div>
            </div>

            {/* Search Bar */}
            <div className="mb-6">
              {/* Search Input */}
              <div className="relative">
                <svg
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <input
                  type="text"
                  placeholder="Search guests by name, email, or Instagram..."
                  value={guestSearch}
                  onChange={e => setGuestSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                />
              </div>
            </div>

            {/* Guests Table */}
            <div className="border border-gray-200 rounded-xl overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th
                      className="px-4 py-3 text-left text-sm font-medium text-gray-600 cursor-pointer hover:text-black"
                      onClick={() => handleGuestSort('name')}
                    >
                      <div className="flex items-center gap-2">
                        Name
                        {guestSortColumn === 'name' && (
                          <span>{guestSortDirection === 'asc' ? '↑' : '↓'}</span>
                        )}
                      </div>
                    </th>
                    <th
                      className="px-4 py-3 text-left text-sm font-medium text-gray-600 cursor-pointer hover:text-black"
                      onClick={() => handleGuestSort('attendance')}
                    >
                      <div className="flex items-center gap-2">
                        All Time Visits
                        {guestSortColumn === 'attendance' && (
                          <span>{guestSortDirection === 'asc' ? '↑' : '↓'}</span>
                        )}
                      </div>
                    </th>
                    <th
                      className="px-4 py-3 text-left text-sm font-medium text-gray-600 cursor-pointer hover:text-black"
                      onClick={() => handleGuestSort('lastAttended')}
                    >
                      <div className="flex items-center gap-2">
                        Last Attended
                        {guestSortColumn === 'lastAttended' && (
                          <span>{guestSortDirection === 'asc' ? '↑' : '↓'}</span>
                        )}
                      </div>
                    </th>
                    <th
                      className="px-4 py-3 text-left text-sm font-medium text-gray-600 cursor-pointer hover:text-black"
                      onClick={() => handleGuestSort('addedBy')}
                    >
                      <div className="flex items-center gap-2">
                        Added By
                        {guestSortColumn === 'addedBy' && (
                          <span>{guestSortDirection === 'asc' ? '↑' : '↓'}</span>
                        )}
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredGuests.map(guest => (
                    <tr
                      key={guest.id}
                      onClick={() => setSelectedGuestId(guest.id)}
                      className="hover:bg-gray-50 transition-colors cursor-pointer"
                    >
                      <td className="px-4 py-3">
                        <div>
                          <div className="font-medium text-gray-900">{guest.name}</div>
                          {guest.instagram && (
                            <a
                              href={`https://instagram.com/${guest.instagram.replace('@', '')}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={e => e.stopPropagation()}
                              className="text-xs text-gray-400 hover:text-gray-600 transition-colors"
                            >
                              {guest.instagram}
                            </a>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700">{guest.totalAttendance}</td>
                      <td className="px-4 py-3 text-sm text-gray-700">
                        {new Date(guest.lastAttended).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex flex-wrap gap-1">
                          {guest.addedBy.map((dj, idx) => (
                            <button
                              key={idx}
                              onClick={e => {
                                e.stopPropagation();
                                // Filter by this DJ
                                setGuestFilter(dj);
                              }}
                              className="text-xs px-2 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full transition-colors"
                            >
                              {dj}
                            </button>
                          ))}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {filteredGuests.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                  No guests found matching your search criteria
                </div>
              )}
            </div>
          </div>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <div>
            <div className="flex items-center justify-end mb-6">
              <button
                onClick={() => {
                  if (userType === 'djs') {
                    setShowInviteDjModal(true);
                  } else if (userType === 'staff') {
                    setShowInviteStaffModal(true);
                  } else if (userType === 'promoters') {
                    setShowInvitePromoterModal(true);
                  }
                }}
                className="px-6 py-2 bg-gray-200 text-black rounded-full hover:bg-gray-300 transition-colors text-sm"
              >
                + Invite New{' '}
                {userType === 'djs'
                  ? 'DJ'
                  : userType === 'staff'
                    ? 'Staff'
                    : userType === 'promoters'
                      ? 'Promoter'
                      : 'Manager'}
              </button>
            </div>

            {/* User Type Toggle */}
            <div className="mb-6 flex gap-2">
              <button
                onClick={() => setUserType('djs')}
                className={`px-4 py-2 rounded-full text-sm transition-colors ${
                  userType === 'djs'
                    ? 'bg-black text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                DJs
              </button>
              <button
                onClick={() => setUserType('staff')}
                className={`px-4 py-2 rounded-full text-sm transition-colors ${
                  userType === 'staff'
                    ? 'bg-black text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Staff
              </button>
              <button
                onClick={() => setUserType('promoters')}
                className={`px-4 py-2 rounded-full text-sm transition-colors ${
                  userType === 'promoters'
                    ? 'bg-black text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Promoters
              </button>
              <button
                onClick={() => setUserType('managers')}
                className={`px-4 py-2 rounded-full text-sm transition-colors ${
                  userType === 'managers'
                    ? 'bg-black text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Managers
              </button>
            </div>

            {/* DJs Table */}
            {userType === 'djs' && (
              <div className="border border-gray-200 rounded-xl overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th
                        className="px-4 py-3 text-left text-sm font-medium text-gray-600 cursor-pointer hover:text-black"
                        onClick={() => handleDjSort('name')}
                      >
                        <div className="flex items-center gap-2">
                          DJ Name
                          {djSortColumn === 'name' && (
                            <span>{djSortDirection === 'asc' ? '↑' : '↓'}</span>
                          )}
                        </div>
                      </th>
                      <th
                        className="px-4 py-3 text-left text-sm font-medium text-gray-600 cursor-pointer hover:text-black"
                        onClick={() => handleDjSort('totalEvents')}
                      >
                        <div className="flex items-center gap-2">
                          Total Events
                          {djSortColumn === 'totalEvents' && (
                            <span>{djSortDirection === 'asc' ? '↑' : '↓'}</span>
                          )}
                        </div>
                      </th>
                      <th
                        className="px-4 py-3 text-left text-sm font-medium text-gray-600 cursor-pointer hover:text-black"
                        onClick={() => handleDjSort('avgAttendance')}
                      >
                        <div className="flex items-center gap-2">
                          Avg Attendance
                          {djSortColumn === 'avgAttendance' && (
                            <span>{djSortDirection === 'asc' ? '↑' : '↓'}</span>
                          )}
                        </div>
                      </th>
                      <th
                        className="px-4 py-3 text-left text-sm font-medium text-gray-600 cursor-pointer hover:text-black"
                        onClick={() => handleDjSort('paidAttendance')}
                      >
                        <div className="flex items-center gap-2">
                          Paid Attendance
                          {djSortColumn === 'paidAttendance' && (
                            <span>{djSortDirection === 'asc' ? '↑' : '↓'}</span>
                          )}
                        </div>
                      </th>
                      <th
                        className="px-4 py-3 text-left text-sm font-medium text-gray-600 cursor-pointer hover:text-black"
                        onClick={() => handleDjSort('conversionRate')}
                      >
                        <div className="flex items-center gap-2">
                          Conversion Rate
                          {djSortColumn === 'conversionRate' && (
                            <span>{djSortDirection === 'asc' ? '↑' : '↓'}</span>
                          )}
                        </div>
                      </th>
                      <th
                        className="px-4 py-3 text-left text-sm font-medium text-gray-600 cursor-pointer hover:text-black"
                        onClick={() => handleDjSort('avgRevenue')}
                      >
                        <div className="flex items-center gap-2">
                          Avg Revenue
                          {djSortColumn === 'avgRevenue' && (
                            <span>{djSortDirection === 'asc' ? '↑' : '↓'}</span>
                          )}
                        </div>
                      </th>
                      <th
                        className="px-4 py-3 text-left text-sm font-medium text-gray-600 cursor-pointer hover:text-black"
                        onClick={() => handleDjSort('lastPerformed')}
                      >
                        <div className="flex items-center gap-2">
                          Last Gig
                          {djSortColumn === 'lastPerformed' && (
                            <span>{djSortDirection === 'asc' ? '↑' : '↓'}</span>
                          )}
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {sortedDJs.map(dj => (
                      <tr
                        key={dj.id}
                        className="hover:bg-gray-50 transition-colors cursor-pointer"
                        onClick={() => {
                          setSelectedDjId(dj.id);
                          setDjModalTab('overview');
                        }}
                      >
                        <td className="px-4 py-3">
                          <div>
                            <div className="font-medium text-gray-900">{dj.name}</div>
                            {dj.instagram && (
                              <div className="text-xs text-gray-400">{dj.instagram}</div>
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-700">{dj.totalEvents}</td>
                        <td className="px-4 py-3 text-sm text-gray-700">
                          {dj.avgAttendance > 0 ? dj.avgAttendance : '-'}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-700">
                          {dj.paidAttendance > 0 ? dj.paidAttendance : '-'}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-700">
                          {dj.totalGuestsAdded > 0 && dj.avgAttendance > 0
                            ? `${Math.round((dj.avgAttendance / dj.totalGuestsAdded) * 100)}%`
                            : '-'}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-700">
                          {dj.avgRevenue > 0 ? `$${dj.avgRevenue.toLocaleString()}` : '-'}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-700">
                          {dj.lastPerformed
                            ? new Date(dj.lastPerformed).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric',
                              })
                            : '-'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Staff View */}
            {userType === 'staff' && (
              <div className="border border-gray-200 rounded-xl overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th
                        className="px-4 py-3 text-left text-sm font-medium text-gray-600 cursor-pointer hover:text-black"
                        onClick={() => handleStaffSort('name')}
                      >
                        <div className="flex items-center gap-2">
                          Name
                          {staffSortColumn === 'name' && (
                            <span>{staffSortDirection === 'asc' ? '↑' : '↓'}</span>
                          )}
                        </div>
                      </th>
                      <th
                        className="px-4 py-3 text-left text-sm font-medium text-gray-600 cursor-pointer hover:text-black"
                        onClick={() => handleStaffSort('role')}
                      >
                        <div className="flex items-center gap-2">
                          Role
                          {staffSortColumn === 'role' && (
                            <span>{staffSortDirection === 'asc' ? '↑' : '↓'}</span>
                          )}
                        </div>
                      </th>
                      <th
                        className="px-4 py-3 text-left text-sm font-medium text-gray-600 cursor-pointer hover:text-black"
                        onClick={() => handleStaffSort('totalEventsWorked')}
                      >
                        <div className="flex items-center gap-2">
                          Total Events Worked
                          {staffSortColumn === 'totalEventsWorked' && (
                            <span>{staffSortDirection === 'asc' ? '↑' : '↓'}</span>
                          )}
                        </div>
                      </th>
                      <th
                        className="px-4 py-3 text-left text-sm font-medium text-gray-600 cursor-pointer hover:text-black"
                        onClick={() => handleStaffSort('totalGuestsAdded')}
                      >
                        <div className="flex items-center gap-2">
                          Total Guests Added
                          {staffSortColumn === 'totalGuestsAdded' && (
                            <span>{staffSortDirection === 'asc' ? '↑' : '↓'}</span>
                          )}
                        </div>
                      </th>
                      <th
                        className="px-4 py-3 text-left text-sm font-medium text-gray-600 cursor-pointer hover:text-black"
                        onClick={() => handleStaffSort('avgGuestsPerEvent')}
                      >
                        <div className="flex items-center gap-2">
                          Avg Guests/Event
                          {staffSortColumn === 'avgGuestsPerEvent' && (
                            <span>{staffSortDirection === 'asc' ? '↑' : '↓'}</span>
                          )}
                        </div>
                      </th>
                      <th
                        className="px-4 py-3 text-left text-sm font-medium text-gray-600 cursor-pointer hover:text-black"
                        onClick={() => handleStaffSort('lastWorked')}
                      >
                        <div className="flex items-center gap-2">
                          Last Worked
                          {staffSortColumn === 'lastWorked' && (
                            <span>{staffSortDirection === 'asc' ? '↑' : '↓'}</span>
                          )}
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {sortedStaff.map(staffMember => (
                      <tr
                        key={staffMember.id}
                        className="hover:bg-gray-50 transition-colors cursor-pointer"
                        onClick={() => {
                          setSelectedStaffId(staffMember.id);
                          setStaffModalTab('overview');
                        }}
                      >
                        <td className="px-4 py-3">
                          <div>
                            <div className="font-medium text-gray-900">{staffMember.name}</div>
                            <div className="text-xs text-gray-400">{staffMember.email}</div>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-700">{staffMember.role}</td>
                        <td className="px-4 py-3 text-sm text-gray-700">
                          {staffMember.totalEventsWorked > 0 ? staffMember.totalEventsWorked : '-'}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-700">
                          {staffMember.totalGuestsAdded > 0 ? staffMember.totalGuestsAdded : '-'}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-700">
                          {staffMember.avgGuestsPerEvent > 0
                            ? staffMember.avgGuestsPerEvent.toFixed(1)
                            : '-'}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-700">
                          {staffMember.lastWorked
                            ? new Date(staffMember.lastWorked).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric',
                              })
                            : '-'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Promoters View */}
            {userType === 'promoters' && (
              <div className="border border-gray-200 rounded-xl overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th
                        className="px-4 py-3 text-left text-sm font-medium text-gray-600 cursor-pointer hover:text-black"
                        onClick={() => handlePromoterSort('name')}
                      >
                        <div className="flex items-center gap-2">
                          Promoter Name
                          {promoterSortColumn === 'name' && (
                            <span>{promoterSortDirection === 'asc' ? '↑' : '↓'}</span>
                          )}
                        </div>
                      </th>
                      <th
                        className="px-4 py-3 text-left text-sm font-medium text-gray-600 cursor-pointer hover:text-black"
                        onClick={() => handlePromoterSort('totalEvents')}
                      >
                        <div className="flex items-center gap-2">
                          Total Events
                          {promoterSortColumn === 'totalEvents' && (
                            <span>{promoterSortDirection === 'asc' ? '↑' : '↓'}</span>
                          )}
                        </div>
                      </th>
                      <th
                        className="px-4 py-3 text-left text-sm font-medium text-gray-600 cursor-pointer hover:text-black"
                        onClick={() => handlePromoterSort('totalGuestsAdded')}
                      >
                        <div className="flex items-center gap-2">
                          Total Guests Added
                          {promoterSortColumn === 'totalGuestsAdded' && (
                            <span>{promoterSortDirection === 'asc' ? '↑' : '↓'}</span>
                          )}
                        </div>
                      </th>
                      <th
                        className="px-4 py-3 text-left text-sm font-medium text-gray-600 cursor-pointer hover:text-black"
                        onClick={() => handlePromoterSort('avgAttendance')}
                      >
                        <div className="flex items-center gap-2">
                          Avg Attendance
                          {promoterSortColumn === 'avgAttendance' && (
                            <span>{promoterSortDirection === 'asc' ? '↑' : '↓'}</span>
                          )}
                        </div>
                      </th>
                      <th
                        className="px-4 py-3 text-left text-sm font-medium text-gray-600 cursor-pointer hover:text-black"
                        onClick={() => handlePromoterSort('paidAttendance')}
                      >
                        <div className="flex items-center gap-2">
                          Paid Attendance
                          {promoterSortColumn === 'paidAttendance' && (
                            <span>{promoterSortDirection === 'asc' ? '↑' : '↓'}</span>
                          )}
                        </div>
                      </th>
                      <th
                        className="px-4 py-3 text-left text-sm font-medium text-gray-600 cursor-pointer hover:text-black"
                        onClick={() => handlePromoterSort('conversionRate')}
                      >
                        <div className="flex items-center gap-2">
                          Conversion Rate
                          {promoterSortColumn === 'conversionRate' && (
                            <span>{promoterSortDirection === 'asc' ? '↑' : '↓'}</span>
                          )}
                        </div>
                      </th>
                      <th
                        className="px-4 py-3 text-left text-sm font-medium text-gray-600 cursor-pointer hover:text-black"
                        onClick={() => handlePromoterSort('avgRevenue')}
                      >
                        <div className="flex items-center gap-2">
                          Avg Revenue
                          {promoterSortColumn === 'avgRevenue' && (
                            <span>{promoterSortDirection === 'asc' ? '↑' : '↓'}</span>
                          )}
                        </div>
                      </th>
                      <th
                        className="px-4 py-3 text-left text-sm font-medium text-gray-600 cursor-pointer hover:text-black"
                        onClick={() => handlePromoterSort('lastPerformed')}
                      >
                        <div className="flex items-center gap-2">
                          Last Event
                          {promoterSortColumn === 'lastPerformed' && (
                            <span>{promoterSortDirection === 'asc' ? '↑' : '↓'}</span>
                          )}
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {sortedPromoters.map(promoter => (
                      <tr
                        key={promoter.id}
                        className="hover:bg-gray-50 transition-colors cursor-pointer"
                        onClick={() => {
                          setSelectedPromoterId(promoter.id);
                          setPromoterModalTab('overview');
                        }}
                      >
                        <td className="px-4 py-3">
                          <div>
                            <div className="font-medium text-gray-900">{promoter.name}</div>
                            {promoter.instagram && (
                              <div className="text-xs text-gray-400">{promoter.instagram}</div>
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-700">{promoter.totalEvents}</td>
                        <td className="px-4 py-3 text-sm text-gray-700">
                          {promoter.totalGuestsAdded}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-700">
                          {promoter.avgAttendance > 0 ? promoter.avgAttendance : '-'}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-700">
                          {promoter.paidAttendance > 0 ? promoter.paidAttendance : '-'}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-700">
                          {promoter.conversionRate > 0 ? `${promoter.conversionRate}%` : '-'}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-700">
                          {promoter.avgRevenue > 0
                            ? `$${promoter.avgRevenue.toLocaleString()}`
                            : '-'}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-700">
                          {promoter.lastPerformed
                            ? new Date(promoter.lastPerformed).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric',
                              })
                            : '-'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Managers View */}
            {userType === 'managers' && (
              <div className="border border-gray-200 rounded-xl overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th
                        className="px-4 py-3 text-left text-sm font-medium text-gray-600 cursor-pointer hover:text-black"
                        onClick={() => handleManagerSort('name')}
                      >
                        <div className="flex items-center gap-2">
                          Manager Name
                          {managerSortColumn === 'name' && (
                            <span>{managerSortDirection === 'asc' ? '↑' : '↓'}</span>
                          )}
                        </div>
                      </th>
                      <th
                        className="px-4 py-3 text-left text-sm font-medium text-gray-600 cursor-pointer hover:text-black"
                        onClick={() => handleManagerSort('eventsCreated')}
                      >
                        <div className="flex items-center gap-2">
                          Events Created
                          {managerSortColumn === 'eventsCreated' && (
                            <span>{managerSortDirection === 'asc' ? '↑' : '↓'}</span>
                          )}
                        </div>
                      </th>
                      <th
                        className="px-4 py-3 text-left text-sm font-medium text-gray-600 cursor-pointer hover:text-black"
                        onClick={() => handleManagerSort('avgRevenue')}
                      >
                        <div className="flex items-center gap-2">
                          Avg Revenues
                          {managerSortColumn === 'avgRevenue' && (
                            <span>{managerSortDirection === 'asc' ? '↑' : '↓'}</span>
                          )}
                        </div>
                      </th>
                      <th
                        className="px-4 py-3 text-left text-sm font-medium text-gray-600 cursor-pointer hover:text-black"
                        onClick={() => handleManagerSort('avgConversion')}
                      >
                        <div className="flex items-center gap-2">
                          Avg Conversion
                          {managerSortColumn === 'avgConversion' && (
                            <span>{managerSortDirection === 'asc' ? '↑' : '↓'}</span>
                          )}
                        </div>
                      </th>
                      <th
                        className="px-4 py-3 text-left text-sm font-medium text-gray-600 cursor-pointer hover:text-black"
                        onClick={() => handleManagerSort('avgTotalGuests')}
                      >
                        <div className="flex items-center gap-2">
                          Avg Total Guests
                          {managerSortColumn === 'avgTotalGuests' && (
                            <span>{managerSortDirection === 'asc' ? '↑' : '↓'}</span>
                          )}
                        </div>
                      </th>
                      <th
                        className="px-4 py-3 text-left text-sm font-medium text-gray-600 cursor-pointer hover:text-black"
                        onClick={() => handleManagerSort('avgPaidGuests')}
                      >
                        <div className="flex items-center gap-2">
                          Avg Paid Guests
                          {managerSortColumn === 'avgPaidGuests' && (
                            <span>{managerSortDirection === 'asc' ? '↑' : '↓'}</span>
                          )}
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {sortedManagers.map(manager => (
                      <tr
                        key={manager.id}
                        className="hover:bg-gray-50 transition-colors cursor-pointer"
                        onClick={() => {
                          setSelectedManagerId(manager.id);
                          setManagerModalTab('overview');
                        }}
                      >
                        <td className="px-4 py-3">
                          <div>
                            <div className="font-medium text-gray-900">{manager.name}</div>
                            {manager.instagram && (
                              <div className="text-xs text-gray-400">{manager.instagram}</div>
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-700">{manager.eventsCreated}</td>
                        <td className="px-4 py-3 text-sm text-gray-700">
                          ${manager.avgRevenue.toLocaleString()}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-700">
                          {manager.avgConversion}%
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-700">
                          {manager.avgTotalGuests}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-700">{manager.avgPaidGuests}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Guest Detail Modal */}
      {selectedGuestId &&
        (() => {
          const selectedGuest = guests.find(g => g.id === selectedGuestId);
          if (!selectedGuest) return null;

          return (
            <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
                {/* Modal Header */}
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-start justify-between">
                    <div>
                      <h2 className="text-2xl font-light mb-1">{selectedGuest.name}</h2>
                      <div className="space-y-1">
                        {selectedGuest.email && (
                          <div className="text-sm text-gray-500">{selectedGuest.email}</div>
                        )}
                        {selectedGuest.instagram && (
                          <a
                            href={`https://instagram.com/${selectedGuest.instagram.replace('@', '')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-gray-500 hover:text-gray-700 transition-colors block"
                          >
                            {selectedGuest.instagram}
                          </a>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={() => setSelectedGuestId(null)}
                      className="text-gray-400 hover:text-gray-600 text-2xl"
                    >
                      ×
                    </button>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-3 mt-4">
                    <div className="bg-gray-50 rounded-lg p-2">
                      <div className="text-[10px] text-gray-600 mb-0.5">All Time Visits</div>
                      <div className="text-lg font-light">{selectedGuest.totalAttendance}</div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-2">
                      <div className="text-[10px] text-gray-600 mb-0.5">Last Attended</div>
                      <div className="text-lg font-light">
                        {new Date(selectedGuest.lastAttended).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Modal Content */}
                <div className="flex-1 overflow-y-auto p-6">
                  {/* Added By Section */}
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-3">Added to lists by</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedGuest.addedBy.map((dj, idx) => (
                        <div
                          key={idx}
                          className="text-sm px-3 py-2 bg-gray-100 text-gray-700 rounded-full"
                        >
                          {dj}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Attendance History Section */}
                  {selectedGuest.attendanceHistory &&
                    selectedGuest.attendanceHistory.length > 0 && (
                      <div className="mt-6">
                        <h3 className="text-sm font-medium text-gray-700 mb-3">
                          Attendance History
                        </h3>
                        <div className="border border-gray-200 rounded-lg overflow-hidden">
                          <div className="max-h-64 overflow-y-auto">
                            <table className="w-full">
                              <thead className="bg-gray-50 border-b border-gray-200 sticky top-0">
                                <tr>
                                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-600">
                                    Date
                                  </th>
                                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-600">
                                    DJ
                                  </th>
                                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-600">
                                    Added By
                                  </th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-gray-200">
                                {selectedGuest.attendanceHistory.map((record, idx) => (
                                  <tr key={idx} className="hover:bg-gray-50">
                                    <td className="px-4 py-3 text-sm text-gray-700">
                                      {record.eventDate}
                                    </td>
                                    <td className="px-4 py-3 text-sm text-gray-700">
                                      {record.djNames}
                                    </td>
                                    <td className="px-4 py-3 text-sm text-gray-500">
                                      {record.addedBy}
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    )}
                </div>
              </div>
            </div>
          );
        })()}

      {/* DJ Detail Modal */}
      {selectedDjId &&
        (() => {
          const selectedDj = djs.find(dj => dj.id === selectedDjId);
          if (!selectedDj) return null;

          // Mock DJ guests for the Guests tab
          const djGuests = guests.filter(g => g.addedBy.includes(selectedDj.name));

          // Mock event history for the Event History tab (12 months)
          const otherDjNames = [
            'DJ Shadow',
            'Sarah Deep',
            'Techno Tom',
            'Vinyl Vince',
            'Bass Queen',
            'House Master',
          ];
          const eventHistory = Array.from({ length: selectedDj.totalEvents }, (_, i) => {
            const date = new Date();
            date.setMonth(date.getMonth() - i);

            // Sometimes solo, sometimes with other DJs
            const hasOtherDjs = Math.random() > 0.4; // 60% chance of having other DJs
            const otherDjs = hasOtherDjs
              ? otherDjNames
                  .filter(name => name !== selectedDj.name)
                  .sort(() => 0.5 - Math.random())
                  .slice(0, Math.floor(Math.random() * 2) + 1) // 1-2 other DJs
              : [];

            return {
              id: `event_${i}`,
              date: date.toISOString().split('T')[0],
              eventName: [
                'Saturday Night Sessions',
                'Deep House Vibes',
                'Techno Warehouse',
                'Underground Collective',
              ][i % 4],
              attendance: Math.floor(Math.random() * 30) + 40,
              capacity: selectedDj.defaultCap,
              revenue: Math.floor(Math.random() * 2000) + 1000,
              otherDjs: otherDjs.join(', ') || '-',
            };
          }).sort((a, b) => {
            let comparison = 0;

            if (eventHistorySortColumn === 'date') {
              comparison = a.date.localeCompare(b.date);
            } else if (eventHistorySortColumn === 'eventName') {
              comparison = a.eventName.localeCompare(b.eventName);
            } else if (eventHistorySortColumn === 'attendance') {
              comparison = a.attendance - b.attendance;
            } else if (eventHistorySortColumn === 'capacity') {
              comparison = a.capacity - b.capacity;
            } else if (eventHistorySortColumn === 'revenue') {
              comparison = a.revenue - b.revenue;
            }

            return eventHistorySortDirection === 'asc' ? comparison : -comparison;
          });

          return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-xl w-full max-w-4xl max-h-[90vh] min-h-[500px] overflow-hidden flex flex-col">
                {/* Modal Header */}
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-start justify-between">
                    <div>
                      <h2 className="text-2xl font-light mb-1">{selectedDj.name}</h2>
                      <div className="flex items-center gap-3 text-sm text-gray-600">
                        <span>{selectedDj.email}</span>
                        {selectedDj.instagram && (
                          <>
                            <span>•</span>
                            <a
                              href={`https://instagram.com/${selectedDj.instagram.replace('@', '')}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={e => e.stopPropagation()}
                              className="text-gray-600 hover:text-gray-900 transition-colors"
                            >
                              {selectedDj.instagram}
                            </a>
                          </>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={() => setSelectedDjId(null)}
                      className="text-gray-400 hover:text-gray-600 text-2xl"
                    >
                      ×
                    </button>
                  </div>
                </div>

                {/* Internal Tab Navigation */}
                <div className="px-6 border-b border-gray-200">
                  <div className="flex gap-6">
                    <button
                      onClick={() => setDjModalTab('overview')}
                      className={`pb-3 text-sm transition-colors relative ${
                        djModalTab === 'overview' ? 'text-black' : 'text-gray-500 hover:text-black'
                      }`}
                    >
                      Overview
                      {djModalTab === 'overview' && (
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-black"></div>
                      )}
                    </button>
                    <button
                      onClick={() => setDjModalTab('guests')}
                      className={`pb-3 text-sm transition-colors relative ${
                        djModalTab === 'guests' ? 'text-black' : 'text-gray-500 hover:text-black'
                      }`}
                    >
                      Guests
                      {djModalTab === 'guests' && (
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-black"></div>
                      )}
                    </button>
                    <button
                      onClick={() => setDjModalTab('history')}
                      className={`pb-3 text-sm transition-colors relative ${
                        djModalTab === 'history' ? 'text-black' : 'text-gray-500 hover:text-black'
                      }`}
                    >
                      Event History
                      {djModalTab === 'history' && (
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-black"></div>
                      )}
                    </button>
                  </div>
                </div>

                {/* Modal Content */}
                <div className="flex-1 overflow-y-auto p-6">
                  {/* Overview Tab */}
                  {djModalTab === 'overview' && (
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Default Capacity
                        </label>
                        <input
                          type="number"
                          defaultValue={selectedDj.defaultCap}
                          className="w-32 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Hospitality Rider
                        </label>
                        <textarea
                          placeholder="Click to edit hospitality requirements..."
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                          rows={4}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Tech Rider
                        </label>
                        <textarea
                          placeholder="Click to edit technical requirements..."
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                          rows={4}
                        />
                      </div>
                    </div>
                  )}

                  {/* Guests Tab */}
                  {djModalTab === 'guests' && (
                    <div>
                      <div className="mb-4 text-sm text-gray-600">
                        {djGuests.length} {djGuests.length === 1 ? 'guest' : 'guests'}
                      </div>
                      <div className="border border-gray-200 rounded-lg overflow-hidden">
                        <table className="w-full">
                          <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                                Name
                              </th>
                              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                                IG Handle
                              </th>
                              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                                Attendance
                              </th>
                              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                                Last Attended
                              </th>
                              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                                Added By Other DJs
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200">
                            {djGuests.map(guest => (
                              <tr key={guest.id} className="hover:bg-gray-50">
                                <td className="px-4 py-3 text-sm">{guest.name}</td>
                                <td className="px-4 py-3 text-sm text-gray-600">
                                  {guest.instagram ? (
                                    <a
                                      href={`https://instagram.com/${guest.instagram.replace('@', '')}`}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      onClick={e => e.stopPropagation()}
                                      className="text-gray-600 hover:text-gray-900 transition-colors"
                                    >
                                      {guest.instagram}
                                    </a>
                                  ) : (
                                    '-'
                                  )}
                                </td>
                                <td className="px-4 py-3 text-sm text-gray-700">
                                  {guest.totalAttendance}
                                </td>
                                <td className="px-4 py-3 text-sm text-gray-700">
                                  {new Date(guest.lastAttended).toLocaleDateString('en-US', {
                                    month: 'short',
                                    day: 'numeric',
                                    year: 'numeric',
                                  })}
                                </td>
                                <td className="px-4 py-3">
                                  <div className="flex flex-wrap gap-1">
                                    {guest.addedBy
                                      .filter(djName => djName !== selectedDj.name)
                                      .map((djName, idx) => {
                                        const matchingDj = djs.find(d => d.name === djName);
                                        return matchingDj ? (
                                          <button
                                            key={idx}
                                            onClick={e => {
                                              e.stopPropagation();
                                              setSelectedDjId(matchingDj.id);
                                              setDjModalTab('overview');
                                            }}
                                            className="text-xs px-2 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full transition-colors"
                                          >
                                            {djName}
                                          </button>
                                        ) : (
                                          <span
                                            key={idx}
                                            className="text-xs px-2 py-1 bg-gray-100 text-gray-500 rounded-full"
                                          >
                                            {djName}
                                          </span>
                                        );
                                      })}
                                    {guest.addedBy.filter(djName => djName !== selectedDj.name)
                                      .length === 0 && '-'}
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                        {djGuests.length === 0 && (
                          <div className="text-center py-12 text-gray-500">
                            No guests added by this DJ yet
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Event History Tab */}
                  {djModalTab === 'history' && (
                    <div>
                      <div className="mb-4 text-sm text-gray-600">
                        {eventHistory.length} {eventHistory.length === 1 ? 'event' : 'events'}
                      </div>
                      <div className="border border-gray-200 rounded-lg overflow-hidden">
                        <div className="max-h-96 overflow-y-auto">
                          <table className="w-full">
                            <thead className="bg-gray-50 border-b border-gray-200 sticky top-0">
                              <tr>
                                <th
                                  className="px-4 py-3 text-left text-sm font-medium text-gray-600 cursor-pointer hover:text-black"
                                  onClick={() => handleEventHistorySort('date')}
                                >
                                  <div className="flex items-center gap-2">
                                    Date
                                    {eventHistorySortColumn === 'date' && (
                                      <span>{eventHistorySortDirection === 'asc' ? '↑' : '↓'}</span>
                                    )}
                                  </div>
                                </th>
                                <th
                                  className="px-4 py-3 text-left text-sm font-medium text-gray-600 cursor-pointer hover:text-black"
                                  onClick={() => handleEventHistorySort('eventName')}
                                >
                                  <div className="flex items-center gap-2">
                                    Event Name
                                    {eventHistorySortColumn === 'eventName' && (
                                      <span>{eventHistorySortDirection === 'asc' ? '↑' : '↓'}</span>
                                    )}
                                  </div>
                                </th>
                                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                                  Other DJs
                                </th>
                                <th
                                  className="px-4 py-3 text-left text-sm font-medium text-gray-600 cursor-pointer hover:text-black"
                                  onClick={() => handleEventHistorySort('attendance')}
                                >
                                  <div className="flex items-center gap-2">
                                    Attendance
                                    {eventHistorySortColumn === 'attendance' && (
                                      <span>{eventHistorySortDirection === 'asc' ? '↑' : '↓'}</span>
                                    )}
                                  </div>
                                </th>
                                <th
                                  className="px-4 py-3 text-left text-sm font-medium text-gray-600 cursor-pointer hover:text-black"
                                  onClick={() => handleEventHistorySort('capacity')}
                                >
                                  <div className="flex items-center gap-2">
                                    Capacity
                                    {eventHistorySortColumn === 'capacity' && (
                                      <span>{eventHistorySortDirection === 'asc' ? '↑' : '↓'}</span>
                                    )}
                                  </div>
                                </th>
                                <th
                                  className="px-4 py-3 text-left text-sm font-medium text-gray-600 cursor-pointer hover:text-black"
                                  onClick={() => handleEventHistorySort('revenue')}
                                >
                                  <div className="flex items-center gap-2">
                                    Revenue
                                    {eventHistorySortColumn === 'revenue' && (
                                      <span>{eventHistorySortDirection === 'asc' ? '↑' : '↓'}</span>
                                    )}
                                  </div>
                                </th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                              {eventHistory.map(event => (
                                <tr key={event.id} className="hover:bg-gray-50">
                                  <td className="px-4 py-3 text-sm text-gray-700">
                                    {new Date(event.date).toLocaleDateString('en-US', {
                                      month: 'short',
                                      day: 'numeric',
                                      year: 'numeric',
                                    })}
                                  </td>
                                  <td className="px-4 py-3 text-sm">{event.eventName}</td>
                                  <td className="px-4 py-3 text-sm text-gray-600">
                                    {event.otherDjs === '-' ? (
                                      '-'
                                    ) : (
                                      <div className="flex flex-wrap gap-1">
                                        {event.otherDjs.split(', ').map((djName, idx) => {
                                          const matchingDj = djs.find(d => d.name === djName);
                                          return matchingDj ? (
                                            <button
                                              key={idx}
                                              onClick={e => {
                                                e.stopPropagation();
                                                setSelectedDjId(matchingDj.id);
                                                setDjModalTab('overview');
                                              }}
                                              className="text-xs px-2 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full transition-colors"
                                            >
                                              {djName}
                                            </button>
                                          ) : (
                                            <span
                                              key={idx}
                                              className="text-xs px-2 py-1 bg-gray-100 text-gray-500 rounded-full"
                                            >
                                              {djName}
                                            </span>
                                          );
                                        })}
                                      </div>
                                    )}
                                  </td>
                                  <td className="px-4 py-3 text-sm text-gray-700">
                                    {event.attendance}
                                  </td>
                                  <td className="px-4 py-3 text-sm text-gray-700">
                                    {event.capacity}
                                  </td>
                                  <td className="px-4 py-3 text-sm text-gray-700">
                                    ${event.revenue.toLocaleString()}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                        {eventHistory.length === 0 && (
                          <div className="text-center py-12 text-gray-500">
                            No event history available
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })()}

      {/* Staff Detail Modal */}
      {selectedStaffId &&
        (() => {
          const selectedStaffMember = staff.find(s => s.id === selectedStaffId);
          if (!selectedStaffMember) return null;

          // Mock staff guests for the Guests tab
          const staffGuests = guests
            .filter(g => {
              // For this mock, we'll show guests added during events where this staff member worked
              // In a real app, you'd track this in the database
              return Math.random() > 0.7; // Randomly assign some guests to show in the tab
            })
            .slice(0, 15);

          // Mock event history for staff
          const eventHistory = Array.from(
            { length: selectedStaffMember.totalEventsWorked },
            (_, i) => {
              const date = new Date();
              date.setDate(date.getDate() - i * 3);

              return {
                id: `event_${i}`,
                date: date.toISOString().split('T')[0],
                eventName: [
                  'Saturday Night Sessions',
                  'Deep House Vibes',
                  'Techno Warehouse',
                  'Underground Collective',
                ][i % 4],
                hoursWorked: Math.floor(Math.random() * 4) + 4, // 4-8 hours
                guestsProcessed:
                  selectedStaffMember.role === 'Security'
                    ? Math.floor(Math.random() * 20) + 10
                    : Math.floor(Math.random() * 30) + 20,
                notes:
                  Math.random() > 0.7
                    ? [
                        'Excellent performance',
                        'Great teamwork',
                        'Handled difficult situation well',
                        'On time',
                      ][Math.floor(Math.random() * 4)]
                    : '-',
              };
            }
          ).sort((a, b) => b.date.localeCompare(a.date));

          return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-xl w-full max-w-4xl max-h-[90vh] min-h-[500px] overflow-hidden flex flex-col">
                {/* Modal Header */}
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-start justify-between">
                    <div>
                      <h2 className="text-2xl font-light mb-1">{selectedStaffMember.name}</h2>
                      <div className="flex items-center gap-3 text-sm text-gray-600">
                        <span>{selectedStaffMember.email}</span>
                        <span>•</span>
                        <span>{selectedStaffMember.phone}</span>
                        <span>•</span>
                        <span>{selectedStaffMember.instagram || 'Not provided'}</span>
                        <span>•</span>
                        <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                          {selectedStaffMember.role}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => setSelectedStaffId(null)}
                      className="text-gray-400 hover:text-gray-600 text-2xl"
                    >
                      ×
                    </button>
                  </div>
                </div>

                {/* Internal Tab Navigation */}
                <div className="px-6 border-b border-gray-200">
                  <div className="flex gap-6">
                    <button
                      onClick={() => setStaffModalTab('overview')}
                      className={`pb-3 text-sm transition-colors relative ${
                        staffModalTab === 'overview'
                          ? 'text-black'
                          : 'text-gray-500 hover:text-black'
                      }`}
                    >
                      Overview
                      {staffModalTab === 'overview' && (
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-black"></div>
                      )}
                    </button>
                    <button
                      onClick={() => setStaffModalTab('guests')}
                      className={`pb-3 text-sm transition-colors relative ${
                        staffModalTab === 'guests' ? 'text-black' : 'text-gray-500 hover:text-black'
                      }`}
                    >
                      Guests
                      {staffModalTab === 'guests' && (
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-black"></div>
                      )}
                    </button>
                    <button
                      onClick={() => setStaffModalTab('history')}
                      className={`pb-3 text-sm transition-colors relative ${
                        staffModalTab === 'history'
                          ? 'text-black'
                          : 'text-gray-500 hover:text-black'
                      }`}
                    >
                      Event History
                      {staffModalTab === 'history' && (
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-black"></div>
                      )}
                    </button>
                  </div>
                </div>

                {/* Modal Content */}
                <div className="flex-1 overflow-y-auto p-6">
                  {/* Overview Tab */}
                  {staffModalTab === 'overview' && (
                    <div className="space-y-6">
                      <div className="grid grid-cols-3 gap-3">
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <div className="text-xs text-gray-600 mb-1">Total Events Worked</div>
                          <div className="text-xl font-light">
                            {selectedStaffMember.totalEventsWorked}
                          </div>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <div className="text-xs text-gray-600 mb-1">Total Guests Added</div>
                          <div className="text-xl font-light">
                            {selectedStaffMember.totalGuestsAdded}
                          </div>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <div className="text-xs text-gray-600 mb-1">Avg Guests/Event</div>
                          <div className="text-xl font-light">
                            {selectedStaffMember.avgGuestsPerEvent.toFixed(1)}
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Status
                        </label>
                        <select
                          defaultValue={selectedStaffMember.status}
                          className="w-48 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                        >
                          <option value="active">Active</option>
                          <option value="inactive">Inactive</option>
                          <option value="pending">Pending</option>
                        </select>
                      </div>
                    </div>
                  )}

                  {/* Guests Tab */}
                  {staffModalTab === 'guests' && (
                    <div>
                      <div className="mb-4 text-sm text-gray-600">
                        {staffGuests.length} {staffGuests.length === 1 ? 'guest' : 'guests'} added
                      </div>
                      <div className="border border-gray-200 rounded-lg overflow-hidden">
                        <table className="w-full">
                          <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                                Name
                              </th>
                              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                                Email
                              </th>
                              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                                Attendance
                              </th>
                              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                                Last Attended
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200">
                            {staffGuests.map(guest => (
                              <tr key={guest.id} className="hover:bg-gray-50">
                                <td className="px-4 py-3 text-sm">{guest.name}</td>
                                <td className="px-4 py-3 text-sm text-gray-600">{guest.email}</td>
                                <td className="px-4 py-3 text-sm text-gray-700">
                                  {guest.totalAttendance}
                                </td>
                                <td className="px-4 py-3 text-sm text-gray-700">
                                  {new Date(guest.lastAttended).toLocaleDateString('en-US', {
                                    month: 'short',
                                    day: 'numeric',
                                    year: 'numeric',
                                  })}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                        {staffGuests.length === 0 && (
                          <div className="text-center py-12 text-gray-500">
                            No guests added by this staff member yet
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Event History Tab */}
                  {staffModalTab === 'history' && (
                    <div>
                      <div className="mb-4 text-sm text-gray-600">
                        {eventHistory.length} {eventHistory.length === 1 ? 'event' : 'events'}{' '}
                        worked
                      </div>
                      <div>
                        <div className="border border-gray-200 rounded-lg overflow-hidden">
                          <table className="w-full">
                            <thead className="bg-gray-50 border-b border-gray-200">
                              <tr>
                                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                                  Date
                                </th>
                                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                                  Event
                                </th>
                                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                                  Hours Worked
                                </th>
                                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                                  Guests Processed
                                </th>
                                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                                  Notes
                                </th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                              {eventHistory.map(event => (
                                <tr key={event.id} className="hover:bg-gray-50">
                                  <td className="px-4 py-3 text-sm text-gray-700">
                                    {new Date(event.date).toLocaleDateString('en-US', {
                                      month: 'short',
                                      day: 'numeric',
                                      year: 'numeric',
                                    })}
                                  </td>
                                  <td className="px-4 py-3 text-sm text-gray-900">
                                    {event.eventName}
                                  </td>
                                  <td className="px-4 py-3 text-sm text-gray-700">
                                    {event.hoursWorked}h
                                  </td>
                                  <td className="px-4 py-3 text-sm text-gray-700">
                                    {event.guestsProcessed}
                                  </td>
                                  <td className="px-4 py-3 text-sm text-gray-600 italic">
                                    {event.notes}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                        {eventHistory.length === 0 && (
                          <div className="text-center py-12 text-gray-500">
                            No event history available
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })()}

      {/* Promoter Detail Modal */}
      {selectedPromoterId &&
        (() => {
          const selectedPromoter = promoters.find(p => p.id === selectedPromoterId);
          if (!selectedPromoter) return null;

          // Mock promoter guests for the Guests tab
          const promoterGuests = guests.filter(g => g.addedBy.includes(selectedPromoter.name));

          // Mock event history for the promoter
          const otherPromoterNames = [
            'Alex Martinez',
            'Taylor Swift Events',
            'Jordan Blake',
            'Sam Rivera',
            'Morgan Chen',
          ];
          const eventHistory = Array.from({ length: selectedPromoter.totalEvents }, (_, i) => {
            const date = new Date();
            date.setMonth(date.getMonth() - i);

            // Sometimes solo, sometimes with other promoters
            const hasOtherPromoters = Math.random() > 0.6;
            const otherPromoters = hasOtherPromoters
              ? otherPromoterNames
                  .filter(name => name !== selectedPromoter.name)
                  .sort(() => 0.5 - Math.random())
                  .slice(0, Math.floor(Math.random() * 2) + 1)
              : [];

            return {
              id: `event_${i}`,
              date: date.toISOString().split('T')[0],
              eventName: [
                'Saturday Night Sessions',
                'Deep House Vibes',
                'Techno Warehouse',
                'Underground Collective',
              ][i % 4],
              attendance: Math.floor(Math.random() * 30) + 40,
              capacity: selectedPromoter.defaultCap,
              revenue: Math.floor(Math.random() * 2000) + 1000,
              otherPromoters: otherPromoters.join(', ') || '-',
            };
          }).sort((a, b) => b.date.localeCompare(a.date));

          return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-xl w-full max-w-4xl max-h-[90vh] min-h-[500px] overflow-hidden flex flex-col">
                {/* Modal Header */}
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-start justify-between">
                    <div>
                      <h2 className="text-2xl font-light mb-1">{selectedPromoter.name}</h2>
                      <div className="flex items-center gap-3 text-sm text-gray-600">
                        <span>{selectedPromoter.email}</span>
                        {selectedPromoter.instagram && (
                          <>
                            <span>•</span>
                            <a
                              href={`https://instagram.com/${selectedPromoter.instagram.replace('@', '')}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={e => e.stopPropagation()}
                              className="text-gray-600 hover:text-gray-900 transition-colors"
                            >
                              {selectedPromoter.instagram}
                            </a>
                          </>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={() => setSelectedPromoterId(null)}
                      className="text-gray-400 hover:text-gray-600 text-2xl"
                    >
                      ×
                    </button>
                  </div>
                </div>

                {/* Internal Tab Navigation */}
                <div className="px-6 border-b border-gray-200">
                  <div className="flex gap-6">
                    <button
                      onClick={() => setPromoterModalTab('overview')}
                      className={`pb-3 text-sm transition-colors relative ${
                        promoterModalTab === 'overview'
                          ? 'text-black'
                          : 'text-gray-500 hover:text-black'
                      }`}
                    >
                      Overview
                      {promoterModalTab === 'overview' && (
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-black"></div>
                      )}
                    </button>
                    <button
                      onClick={() => setPromoterModalTab('guests')}
                      className={`pb-3 text-sm transition-colors relative ${
                        promoterModalTab === 'guests'
                          ? 'text-black'
                          : 'text-gray-500 hover:text-black'
                      }`}
                    >
                      Guests
                      {promoterModalTab === 'guests' && (
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-black"></div>
                      )}
                    </button>
                    <button
                      onClick={() => setPromoterModalTab('history')}
                      className={`pb-3 text-sm transition-colors relative ${
                        promoterModalTab === 'history'
                          ? 'text-black'
                          : 'text-gray-500 hover:text-black'
                      }`}
                    >
                      Event History
                      {promoterModalTab === 'history' && (
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-black"></div>
                      )}
                    </button>
                  </div>
                </div>

                {/* Modal Content */}
                <div className="flex-1 overflow-y-auto p-6">
                  {/* Overview Tab */}
                  {promoterModalTab === 'overview' && (
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Default Capacity
                        </label>
                        <input
                          type="number"
                          defaultValue={selectedPromoter.defaultCap}
                          className="w-32 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Notes
                        </label>
                        <textarea
                          placeholder="Add notes about this promoter..."
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                          rows={6}
                        />
                      </div>
                    </div>
                  )}

                  {/* Guests Tab */}
                  {promoterModalTab === 'guests' && (
                    <div>
                      <div className="mb-4 text-sm text-gray-600">
                        {promoterGuests.length} {promoterGuests.length === 1 ? 'guest' : 'guests'}
                      </div>
                      <div className="border border-gray-200 rounded-lg overflow-hidden">
                        <table className="w-full">
                          <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                                Name
                              </th>
                              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                                IG Handle
                              </th>
                              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                                Attendance
                              </th>
                              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                                Last Attended
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200">
                            {promoterGuests.map(guest => (
                              <tr key={guest.id} className="hover:bg-gray-50">
                                <td className="px-4 py-3 text-sm">{guest.name}</td>
                                <td className="px-4 py-3 text-sm text-gray-600">
                                  {guest.instagram ? (
                                    <a
                                      href={`https://instagram.com/${guest.instagram.replace('@', '')}`}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      onClick={e => e.stopPropagation()}
                                      className="text-gray-600 hover:text-gray-900 transition-colors"
                                    >
                                      {guest.instagram}
                                    </a>
                                  ) : (
                                    '-'
                                  )}
                                </td>
                                <td className="px-4 py-3 text-sm text-gray-700">
                                  {guest.totalAttendance}
                                </td>
                                <td className="px-4 py-3 text-sm text-gray-700">
                                  {new Date(guest.lastAttended).toLocaleDateString('en-US', {
                                    month: 'short',
                                    day: 'numeric',
                                    year: 'numeric',
                                  })}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                        {promoterGuests.length === 0 && (
                          <div className="text-center py-12 text-gray-500">
                            No guests added by this promoter yet
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Event History Tab */}
                  {promoterModalTab === 'history' && (
                    <div>
                      <div className="mb-4 text-sm text-gray-600">
                        {eventHistory.length} {eventHistory.length === 1 ? 'event' : 'events'}
                      </div>
                      <div>
                        <div className="border border-gray-200 rounded-lg overflow-hidden">
                          <table className="w-full">
                            <thead className="bg-gray-50 border-b border-gray-200">
                              <tr>
                                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                                  Date
                                </th>
                                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                                  Event
                                </th>
                                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                                  Other Promoters
                                </th>
                                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                                  Attendance
                                </th>
                                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                                  Capacity
                                </th>
                                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                                  Revenue
                                </th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                              {eventHistory.map(event => (
                                <tr key={event.id} className="hover:bg-gray-50">
                                  <td className="px-4 py-3 text-sm text-gray-700">
                                    {new Date(event.date).toLocaleDateString('en-US', {
                                      month: 'short',
                                      day: 'numeric',
                                      year: 'numeric',
                                    })}
                                  </td>
                                  <td className="px-4 py-3 text-sm text-gray-900">
                                    {event.eventName}
                                  </td>
                                  <td className="px-4 py-3 text-sm text-gray-600">
                                    {event.otherPromoters}
                                  </td>
                                  <td className="px-4 py-3 text-sm text-gray-700">
                                    {event.attendance}
                                  </td>
                                  <td className="px-4 py-3 text-sm text-gray-700">
                                    {event.capacity}
                                  </td>
                                  <td className="px-4 py-3 text-sm text-gray-700">
                                    ${event.revenue.toLocaleString()}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                        {eventHistory.length === 0 && (
                          <div className="text-center py-12 text-gray-500">
                            No event history available
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })()}

      {/* Manager Detail Modal */}
      {selectedManagerId &&
        (() => {
          const selectedManager = managers.find(m => m.id === selectedManagerId);
          if (!selectedManager) return null;

          return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-xl w-full max-w-4xl max-h-[90vh] min-h-[500px] overflow-hidden flex flex-col">
                {/* Modal Header */}
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-start justify-between">
                    <div>
                      <h2 className="text-2xl font-light mb-1">{selectedManager.name}</h2>
                      <div className="flex items-center gap-3 text-sm text-gray-600">
                        <span>{selectedManager.email}</span>
                        <span>•</span>
                        <span>{selectedManager.team}</span>
                        {selectedManager.instagram && (
                          <>
                            <span>•</span>
                            <a
                              href={`https://instagram.com/${selectedManager.instagram.replace('@', '')}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={e => e.stopPropagation()}
                              className="text-gray-600 hover:text-gray-900 transition-colors"
                            >
                              {selectedManager.instagram}
                            </a>
                          </>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={() => setSelectedManagerId(null)}
                      className="text-gray-400 hover:text-gray-600 text-2xl"
                    >
                      ×
                    </button>
                  </div>
                </div>

                {/* Internal Tab Navigation */}
                <div className="px-6 border-b border-gray-200">
                  <div className="flex gap-6">
                    <button
                      onClick={() => setManagerModalTab('overview')}
                      className={`pb-3 text-sm transition-colors relative ${
                        managerModalTab === 'overview'
                          ? 'text-black'
                          : 'text-gray-500 hover:text-black'
                      }`}
                    >
                      Overview
                      {managerModalTab === 'overview' && (
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-black"></div>
                      )}
                    </button>
                    <button
                      onClick={() => setManagerModalTab('guests')}
                      className={`pb-3 text-sm transition-colors relative ${
                        managerModalTab === 'guests'
                          ? 'text-black'
                          : 'text-gray-500 hover:text-black'
                      }`}
                    >
                      Guests
                      {managerModalTab === 'guests' && (
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-black"></div>
                      )}
                    </button>
                    <button
                      onClick={() => setManagerModalTab('history')}
                      className={`pb-3 text-sm transition-colors relative ${
                        managerModalTab === 'history'
                          ? 'text-black'
                          : 'text-gray-500 hover:text-black'
                      }`}
                    >
                      Event History
                      {managerModalTab === 'history' && (
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-black"></div>
                      )}
                    </button>
                  </div>
                </div>

                {/* Modal Content */}
                <div className="flex-1 overflow-y-auto p-6">
                  {/* Overview Tab */}
                  {managerModalTab === 'overview' && (
                    <div className="space-y-6">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-gray-50 rounded-lg p-4">
                          <div className="text-sm text-gray-600 mb-1">Events Created</div>
                          <div className="text-2xl font-light">{selectedManager.eventsCreated}</div>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-4">
                          <div className="text-sm text-gray-600 mb-1">Avg Total Guests</div>
                          <div className="text-2xl font-light">
                            {selectedManager.avgTotalGuests}
                          </div>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-4">
                          <div className="text-sm text-gray-600 mb-1">Avg Paid Guests</div>
                          <div className="text-2xl font-light">{selectedManager.avgPaidGuests}</div>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-4">
                          <div className="text-sm text-gray-600 mb-1">Avg Revenue</div>
                          <div className="text-2xl font-light">
                            ${selectedManager.avgRevenue.toLocaleString()}
                          </div>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-4">
                          <div className="text-sm text-gray-600 mb-1">Avg Conversion</div>
                          <div className="text-2xl font-light">
                            {selectedManager.avgConversion}%
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Contact Information
                        </label>
                        <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                          <div className="flex items-center gap-2 text-sm">
                            <span className="text-gray-600">Email:</span>
                            <span className="text-gray-900">{selectedManager.email}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <span className="text-gray-600">Phone:</span>
                            <span className="text-gray-900">{selectedManager.phone}</span>
                          </div>
                          {selectedManager.instagram && (
                            <div className="flex items-center gap-2 text-sm">
                              <span className="text-gray-600">Instagram:</span>
                              <a
                                href={`https://instagram.com/${selectedManager.instagram.replace('@', '')}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-900 hover:text-gray-600 transition-colors"
                              >
                                {selectedManager.instagram}
                              </a>
                            </div>
                          )}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Notes
                        </label>
                        <textarea
                          placeholder="Add notes about this manager..."
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                          rows={6}
                        />
                      </div>
                    </div>
                  )}

                  {/* Guests Tab */}
                  {managerModalTab === 'guests' && (
                    <div className="text-center py-12 text-gray-500">
                      No guests tracked for this manager
                    </div>
                  )}

                  {/* Event History Tab */}
                  {managerModalTab === 'history' && (
                    <div className="text-center py-12 text-gray-500">
                      No event history available
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })()}

      {/* Invite DJ Modal */}
      {showInviteDjModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 max-w-md w-full mx-4">
            <h2 className="text-2xl mb-6">Invite New DJ</h2>

            <div className="space-y-4">
              {/* DJ/Stage Name - Required */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  DJ/Stage Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={inviteDjForm.stageName}
                  onChange={e => setInviteDjForm({ ...inviteDjForm, stageName: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                  placeholder="Enter DJ/Stage name"
                />
              </div>

              {/* Given Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Given Name</label>
                <input
                  type="text"
                  value={inviteDjForm.givenName}
                  onChange={e => setInviteDjForm({ ...inviteDjForm, givenName: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                  placeholder="Enter given name"
                />
              </div>

              {/* Email - Required */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  value={inviteDjForm.email}
                  onChange={e => setInviteDjForm({ ...inviteDjForm, email: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                  placeholder="Enter email address"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input
                  type="tel"
                  value={inviteDjForm.phone}
                  onChange={e => setInviteDjForm({ ...inviteDjForm, phone: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                  placeholder="Enter phone number"
                />
              </div>

              {/* Upcoming Gig Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Upcoming Gig Date
                </label>
                <input
                  type="date"
                  value={inviteDjForm.upcomingGigDate}
                  onChange={e =>
                    setInviteDjForm({ ...inviteDjForm, upcomingGigDate: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                />
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowInviteDjModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-full hover:bg-gray-50 transition-colors text-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleInviteDj}
                disabled={!inviteDjForm.stageName || !inviteDjForm.email}
                className={`flex-1 px-4 py-2 rounded-full transition-colors text-sm ${
                  inviteDjForm.stageName && inviteDjForm.email
                    ? 'bg-black text-white hover:bg-gray-900'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                Send Invite
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Invite Promoter Modal */}
      {showInvitePromoterModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 max-w-md w-full mx-4">
            <h2 className="text-2xl mb-6">Invite New Promoter</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm mb-2">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter name"
                  value={invitePromoterForm.name}
                  onChange={e =>
                    setInvitePromoterForm({ ...invitePromoterForm, name: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm mb-2">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  placeholder="Enter email address"
                  value={invitePromoterForm.email}
                  onChange={e =>
                    setInvitePromoterForm({ ...invitePromoterForm, email: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm mb-2">Phone</label>
                <input
                  type="tel"
                  placeholder="Enter phone number"
                  value={invitePromoterForm.phone}
                  onChange={e =>
                    setInvitePromoterForm({ ...invitePromoterForm, phone: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm mb-2">Instagram Handle</label>
                <input
                  type="text"
                  placeholder="@username"
                  value={invitePromoterForm.instagram}
                  onChange={e =>
                    setInvitePromoterForm({ ...invitePromoterForm, instagram: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                />
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowInvitePromoterModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-full hover:bg-gray-50 transition-colors text-sm"
              >
                Cancel
              </button>
              <button
                disabled={!invitePromoterForm.name || !invitePromoterForm.email}
                className={`flex-1 px-4 py-2 rounded-full transition-colors text-sm ${
                  invitePromoterForm.name && invitePromoterForm.email
                    ? 'bg-black text-white hover:bg-gray-900'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                Send Invite
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Invite Staff Modal */}
      {showInviteStaffModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 max-w-md w-full mx-4">
            <h2 className="text-2xl mb-6">Invite New Staff</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm mb-2">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter name"
                  value={inviteStaffForm.name}
                  onChange={e => setInviteStaffForm({ ...inviteStaffForm, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm mb-2">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  placeholder="Enter email address"
                  value={inviteStaffForm.email}
                  onChange={e => setInviteStaffForm({ ...inviteStaffForm, email: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm mb-2">Phone</label>
                <input
                  type="tel"
                  placeholder="Enter phone number"
                  value={inviteStaffForm.phone}
                  onChange={e => setInviteStaffForm({ ...inviteStaffForm, phone: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm mb-2">
                  Role <span className="text-red-500">*</span>
                </label>
                <select
                  value={inviteStaffForm.role}
                  onChange={e => setInviteStaffForm({ ...inviteStaffForm, role: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                >
                  <option value="">Select a role</option>
                  <option value="Door Manager">Door Manager</option>
                  <option value="Security">Security</option>
                  <option value="VIP Host">VIP Host</option>
                  <option value="Bar Manager">Bar Manager</option>
                </select>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowInviteStaffModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-full hover:bg-gray-50 transition-colors text-sm"
              >
                Cancel
              </button>
              <button
                disabled={!inviteStaffForm.name || !inviteStaffForm.email || !inviteStaffForm.role}
                className={`flex-1 px-4 py-2 rounded-full transition-colors text-sm ${
                  inviteStaffForm.name && inviteStaffForm.email && inviteStaffForm.role
                    ? 'bg-black text-white hover:bg-gray-900'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                Send Invite
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Unified Invite User Modal */}
      {showInviteUserModal && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 max-w-md w-full mx-4">
            {/* User Type Selection Buttons */}
            <div className="flex gap-2 mb-6 border-b border-gray-200 pb-4">
              <button
                onClick={() => setInviteUserType('dj')}
                className={`flex-1 py-2 px-4 text-sm rounded-lg transition-colors ${
                  inviteUserType === 'dj'
                    ? 'bg-black text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                DJ
              </button>
              <button
                onClick={() => setInviteUserType('staff')}
                className={`flex-1 py-2 px-4 text-sm rounded-lg transition-colors ${
                  inviteUserType === 'staff'
                    ? 'bg-black text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Staff
              </button>
              <button
                onClick={() => setInviteUserType('promoter')}
                className={`flex-1 py-2 px-4 text-sm rounded-lg transition-colors ${
                  inviteUserType === 'promoter'
                    ? 'bg-black text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Promoter
              </button>
              <button
                onClick={() => setInviteUserType('manager')}
                className={`flex-1 py-2 px-4 text-sm rounded-lg transition-colors ${
                  inviteUserType === 'manager'
                    ? 'bg-black text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Manager
              </button>
            </div>

            {/* DJ Form */}
            {inviteUserType === 'dj' && (
              <>
                <h2 className="text-2xl mb-6">Invite New DJ</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      DJ/Stage Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={inviteDjForm.stageName}
                      onChange={e => setInviteDjForm({ ...inviteDjForm, stageName: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                      placeholder="Enter DJ/Stage name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Given Name</label>
                    <input
                      type="text"
                      value={inviteDjForm.givenName}
                      onChange={e => setInviteDjForm({ ...inviteDjForm, givenName: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                      placeholder="Enter given name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      value={inviteDjForm.email}
                      onChange={e => setInviteDjForm({ ...inviteDjForm, email: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                      placeholder="Enter email address"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <input
                      type="tel"
                      value={inviteDjForm.phone}
                      onChange={e => setInviteDjForm({ ...inviteDjForm, phone: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                      placeholder="Enter phone number"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Upcoming Gig Date
                    </label>
                    <input
                      type="date"
                      value={inviteDjForm.upcomingGigDate}
                      onChange={e =>
                        setInviteDjForm({ ...inviteDjForm, upcomingGigDate: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                    />
                  </div>
                </div>
              </>
            )}

            {/* Staff Form */}
            {inviteUserType === 'staff' && (
              <>
                <h2 className="text-2xl mb-6">Invite New Staff</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm mb-2">
                      Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Enter name"
                      value={inviteStaffForm.name}
                      onChange={e => setInviteStaffForm({ ...inviteStaffForm, name: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-2">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      placeholder="Enter email address"
                      value={inviteStaffForm.email}
                      onChange={e => setInviteStaffForm({ ...inviteStaffForm, email: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-2">Phone</label>
                    <input
                      type="tel"
                      placeholder="Enter phone number"
                      value={inviteStaffForm.phone}
                      onChange={e => setInviteStaffForm({ ...inviteStaffForm, phone: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-2">
                      Role <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={inviteStaffForm.role}
                      onChange={e => setInviteStaffForm({ ...inviteStaffForm, role: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                    >
                      <option value="">Select a role</option>
                      <option value="Door Manager">Door Manager</option>
                      <option value="Security">Security</option>
                      <option value="VIP Host">VIP Host</option>
                      <option value="Bar Manager">Bar Manager</option>
                    </select>
                  </div>
                </div>
              </>
            )}

            {/* Promoter Form */}
            {inviteUserType === 'promoter' && (
              <>
                <h2 className="text-2xl mb-6">Invite New Promoter</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm mb-2">
                      Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Enter name"
                      value={invitePromoterForm.name}
                      onChange={e =>
                        setInvitePromoterForm({ ...invitePromoterForm, name: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-2">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      placeholder="Enter email address"
                      value={invitePromoterForm.email}
                      onChange={e =>
                        setInvitePromoterForm({ ...invitePromoterForm, email: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-2">Phone</label>
                    <input
                      type="tel"
                      placeholder="Enter phone number"
                      value={invitePromoterForm.phone}
                      onChange={e =>
                        setInvitePromoterForm({ ...invitePromoterForm, phone: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-2">Instagram</label>
                    <input
                      type="text"
                      placeholder="@username"
                      value={invitePromoterForm.instagram}
                      onChange={e =>
                        setInvitePromoterForm({ ...invitePromoterForm, instagram: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                    />
                  </div>
                </div>
              </>
            )}

            {/* Manager Form */}
            {inviteUserType === 'manager' && (
              <>
                <h2 className="text-2xl mb-6">Invite New Manager</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm mb-2">
                      Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Enter name"
                      value={inviteManagerForm.name}
                      onChange={e =>
                        setInviteManagerForm({ ...inviteManagerForm, name: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-2">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      placeholder="Enter email address"
                      value={inviteManagerForm.email}
                      onChange={e =>
                        setInviteManagerForm({ ...inviteManagerForm, email: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-2">Phone</label>
                    <input
                      type="tel"
                      placeholder="Enter phone number"
                      value={inviteManagerForm.phone}
                      onChange={e =>
                        setInviteManagerForm({ ...inviteManagerForm, phone: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                    />
                  </div>
                </div>
              </>
            )}

            {/* Modal Actions */}
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowInviteUserModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-full hover:bg-gray-50 transition-colors text-sm"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (inviteUserType === 'dj') {
                    handleInviteDj();
                  } else if (inviteUserType === 'staff') {
                    // Call staff invite handler
                  } else if (inviteUserType === 'promoter') {
                    // Call promoter invite handler
                  } else if (inviteUserType === 'manager') {
                    // Call manager invite handler
                  }
                  setShowInviteUserModal(false);
                }}
                disabled={
                  (inviteUserType === 'dj' && (!inviteDjForm.stageName || !inviteDjForm.email)) ||
                  (inviteUserType === 'staff' &&
                    (!inviteStaffForm.name || !inviteStaffForm.email || !inviteStaffForm.role)) ||
                  (inviteUserType === 'promoter' &&
                    (!invitePromoterForm.name || !invitePromoterForm.email)) ||
                  (inviteUserType === 'manager' &&
                    (!inviteManagerForm.name || !inviteManagerForm.email))
                }
                className={`flex-1 px-4 py-2 rounded-full transition-colors text-sm ${
                  (inviteUserType === 'dj' && inviteDjForm.stageName && inviteDjForm.email) ||
                  (inviteUserType === 'staff' &&
                    inviteStaffForm.name &&
                    inviteStaffForm.email &&
                    inviteStaffForm.role) ||
                  (inviteUserType === 'promoter' &&
                    invitePromoterForm.name &&
                    invitePromoterForm.email) ||
                  (inviteUserType === 'manager' &&
                    inviteManagerForm.name &&
                    inviteManagerForm.email)
                    ? 'bg-black text-white hover:bg-gray-900'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                Send Invite
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

```


## File: `src/app/manager/events/[id]/page.tsx`

```typescript
'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { SafeStorage } from '@/lib/utils/safeStorage';

interface GuestOnList {
  id: string;
  name: string;
  email: string;
  phone: string;
  instagram?: string;
  plusOnes: number;
  addedBy: string;
  addedByRole: 'dj' | 'promoter' | 'staff' | 'manager';
  status: 'pending' | 'approved' | 'denied' | 'checked_in';
  submittedAt: string;
  checkedInAt?: string;
}

interface EventDetails {
  id: string;
  name: string;
  date: string;
  dayOfWeek: string;
  djNames: string;
  venue: string;
  totalCapacity: number;
  approvedGuests: number;
  pendingGuests: number;
  deniedGuests: number;
  checkedInGuests: number;
  status: 'upcoming' | 'today' | 'past';
}

export default function EventDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const eventId = params.id as string;

  const [isLoading, setIsLoading] = useState(true);
  const [event, setEvent] = useState<EventDetails | null>(null);
  const [guests, setGuests] = useState<GuestOnList[]>([]);
  const [filterStatus, setFilterStatus] = useState<
    'all' | 'pending' | 'approved' | 'denied' | 'checked_in'
  >('all');
  const [filterAddedBy, setFilterAddedBy] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGuests, setSelectedGuests] = useState<Set<string>>(new Set());
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [messageText, setMessageText] = useState('');

  // Format date to "Tues Oct 9 at 9:30pm"
  const formatSubmittedDate = (dateString: string) => {
    const date = new Date(dateString);
    const days = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'];
    const months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];

    const dayName = days[date.getDay()];
    const monthName = months[date.getMonth()];
    const day = date.getDate();

    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // 0 should be 12
    const minutesStr = minutes < 10 ? '0' + minutes : minutes;

    return `${dayName} ${monthName} ${day} at ${hours}:${minutesStr}${ampm}`;
  };

  useEffect(() => {
    // Check authentication
    const isAuthenticated = SafeStorage.getItem('manager_authenticated');
    if (!isAuthenticated) {
      router.push('/manager/login');
      return;
    }

    // Mock event data
    setTimeout(() => {
      const mockEvent: EventDetails = {
        id: eventId,
        name: 'Saturday Night Sessions',
        date: 'Sat Oct 12, 2025',
        dayOfWeek: 'Saturday',
        djNames: 'DJ Marcus & Sarah Deep',
        venue: 'Datcha Nightclub',
        totalCapacity: 100,
        approvedGuests: 68,
        pendingGuests: 12,
        deniedGuests: 5,
        checkedInGuests: 42,
        status: 'upcoming',
      };

      const mockGuests: GuestOnList[] = [
        {
          id: 'g1',
          name: 'Sarah Martinez',
          email: 'sarah.m@email.com',
          phone: '+1 (555) 123-4567',
          instagram: '@sarahmartinez',
          plusOnes: 2,
          addedBy: 'DJ Shadow',
          addedByRole: 'dj',
          status: 'approved',
          submittedAt: '2025-10-10T14:30:00',
          checkedInAt: '2025-10-12T22:15:00',
        },
        {
          id: 'g2',
          name: 'James Chen',
          email: 'jchen@email.com',
          phone: '+1 (555) 987-6543',
          plusOnes: 1,
          addedBy: 'Promoter - Marcus',
          addedByRole: 'promoter',
          status: 'approved',
          submittedAt: '2025-10-11T09:15:00',
        },
        {
          id: 'g3',
          name: 'Emily Rodriguez',
          email: 'emily.r@email.com',
          phone: '+1 (555) 456-7890',
          instagram: '@emilyrodriguez',
          plusOnes: 3,
          addedBy: 'Staff - Alex',
          addedByRole: 'staff',
          status: 'pending',
          submittedAt: '2025-10-11T16:45:00',
        },
        {
          id: 'g4',
          name: 'Michael Brown',
          email: 'mbrown@email.com',
          phone: '+1 (555) 234-5678',
          plusOnes: 0,
          addedBy: 'DJ Luna',
          addedByRole: 'dj',
          status: 'denied',
          submittedAt: '2025-10-11T11:20:00',
        },
        {
          id: 'g5',
          name: 'Jessica Taylor',
          email: 'jtaylor@email.com',
          phone: '+1 (555) 345-6789',
          instagram: '@jesstaylor',
          plusOnes: 1,
          addedBy: 'DJ Shadow',
          addedByRole: 'dj',
          status: 'approved',
          submittedAt: '2025-10-10T18:00:00',
          checkedInAt: '2025-10-12T21:45:00',
        },
        {
          id: 'g6',
          name: 'David Kim',
          email: 'dkim@email.com',
          phone: '+1 (555) 567-8901',
          plusOnes: 2,
          addedBy: 'Promoter - Marcus',
          addedByRole: 'promoter',
          status: 'pending',
          submittedAt: '2025-10-11T20:15:00',
        },
        {
          id: 'g7',
          name: 'Lisa Anderson',
          email: 'landerson@email.com',
          phone: '+1 (555) 678-9012',
          plusOnes: 0,
          addedBy: 'Staff - Alex',
          addedByRole: 'staff',
          status: 'approved',
          submittedAt: '2025-10-10T12:30:00',
        },
      ];

      setEvent(mockEvent);
      setGuests(mockGuests);
      setIsLoading(false);
    }, 800);
  }, [router, eventId]);

  const handleApprove = (guestIds: string[]) => {
    setGuests(
      guests.map(g => (guestIds.includes(g.id) ? { ...g, status: 'approved' as const } : g))
    );
    setSelectedGuests(new Set());
    // In real app: API call to approve guests
  };

  const handleDeny = (guestIds: string[]) => {
    setGuests(guests.map(g => (guestIds.includes(g.id) ? { ...g, status: 'denied' as const } : g)));
    setSelectedGuests(new Set());
    // In real app: API call to deny guests
  };

  const handleSelectGuest = (guestId: string, checked: boolean) => {
    const newSelected = new Set(selectedGuests);
    if (checked) {
      newSelected.add(guestId);
    } else {
      newSelected.delete(guestId);
    }
    setSelectedGuests(newSelected);
  };

  const handleSendMessage = () => {
    const selectedGuestsList = guests.filter(g => selectedGuests.has(g.id));
    console.log(
      'Sending message to:',
      selectedGuestsList.map(g => g.phone)
    );
    console.log('Message:', messageText);
    // In real app: API call to send SMS
    setShowMessageModal(false);
    setMessageText('');
    setSelectedGuests(new Set());
  };

  const filteredGuests = guests.filter(guest => {
    // Status filter
    if (filterStatus !== 'all' && guest.status !== filterStatus) return false;

    // Added by filter
    if (filterAddedBy && guest.addedBy !== filterAddedBy) return false;

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        guest.name.toLowerCase().includes(query) ||
        guest.email.toLowerCase().includes(query) ||
        guest.phone.includes(query) ||
        guest.instagram?.toLowerCase().includes(query)
      );
    }

    return true;
  });

  const uniqueAdders = Array.from(new Set(guests.map(g => g.addedBy)));

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
          <p className="text-gray-600">Loading event...</p>
        </div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Event not found</p>
          <button
            onClick={() => router.push('/manager/dashboard')}
            className="text-black underline"
          >
            Return to dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-200">
        <div className="max-w-6xl mx-auto p-6">
          <button
            onClick={() => router.push('/manager/dashboard')}
            className="text-gray-600 hover:text-black transition-colors mb-4 flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Dashboard
          </button>

          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-3xl font-light tracking-tight mb-2">{event.name}</h1>
              <p className="text-gray-600 text-lg mb-1">{event.date}</p>
              <p className="text-gray-500">{event.djNames}</p>
            </div>
            {event.status === 'today' && (
              <span className="px-4 py-2 bg-black text-white rounded-full text-sm">Today</span>
            )}
          </div>

          {/* Capacity Meter */}
          <div>
            <div className="relative h-8 bg-gray-200 rounded-full overflow-hidden cursor-pointer">
              {/* Light gray background - click to show all guests */}
              <div
                className="absolute inset-0 hover:bg-gray-300 transition-colors"
                onClick={() => setFilterStatus('all')}
              ></div>

              {/* Gray bar shows total (approved + pending) - click to show pending */}
              <div
                className="absolute top-0 left-0 h-8 bg-gray-400 rounded-full transition-all duration-300 hover:bg-gray-500 z-[5]"
                style={{
                  width: `${((event.approvedGuests + event.pendingGuests) / event.totalCapacity) * 100}%`,
                }}
                onClick={e => {
                  e.stopPropagation();
                  setFilterStatus('pending');
                }}
              ></div>

              {/* Black bar shows approved guests on top - click to show approved */}
              <div
                className="absolute top-0 left-0 h-8 bg-black rounded-full transition-all duration-300 hover:bg-gray-800 z-10"
                style={{ width: `${(event.approvedGuests / event.totalCapacity) * 100}%` }}
                onClick={e => {
                  e.stopPropagation();
                  setFilterStatus('approved');
                }}
              ></div>

              {/* Approved number (white text on black) */}
              {event.approvedGuests > 0 && event.approvedGuests / event.totalCapacity > 0.08 && (
                <span className="absolute left-2 top-1/2 -translate-y-1/2 text-white text-sm font-medium z-20 pointer-events-none">
                  {event.approvedGuests}
                </span>
              )}

              {/* Pending number (white text on gray) - positioned on right side of gray bar */}
              {event.pendingGuests > 0 && event.pendingGuests / event.totalCapacity > 0.08 && (
                <span
                  className="absolute top-1/2 -translate-y-1/2 text-white text-sm font-medium z-20 pointer-events-none"
                  style={{
                    left: `calc(${((event.approvedGuests + event.pendingGuests) / event.totalCapacity) * 100}% - 24px)`,
                  }}
                >
                  {event.pendingGuests}
                </span>
              )}

              {/* Total capacity number (gray text on light gray background) */}
              {(event.approvedGuests + event.pendingGuests) / event.totalCapacity < 0.85 && (
                <span className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-600 text-sm font-medium z-10 pointer-events-none">
                  {event.totalCapacity}
                </span>
              )}
            </div>

            {/* Labels below meter */}
            <div className="relative mt-2">
              {/* Confirmed label - under black section */}
              <span className="absolute left-2 text-xs text-gray-500">Confirmed</span>

              {/* Pending label - under gray section */}
              {event.pendingGuests > 0 && (
                <span
                  className="absolute text-xs text-gray-500"
                  style={{
                    left: `calc(${((event.approvedGuests + event.pendingGuests) / event.totalCapacity) * 100}% - 24px)`,
                  }}
                >
                  Pending
                </span>
              )}

              {/* Spots available label - on right */}
              <span className="absolute right-2 text-xs text-gray-500">Spots available</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6">
        {/* Filters and Search */}
        <div className="mb-6">
          {/* Search */}
          <input
            type="text"
            placeholder="Search guests..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 border border-gray-200 rounded-full focus:outline-none focus:border-black mb-4"
          />

          {/* Status Filter Pills */}
          <div className="flex flex-wrap gap-2 mb-3">
            <button
              onClick={() => setFilterStatus('all')}
              className={`px-3 py-1 rounded-full text-sm transition-colors ${
                filterStatus === 'all'
                  ? 'bg-black text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilterStatus('approved')}
              className={`px-3 py-1 rounded-full text-sm transition-colors ${
                filterStatus === 'approved'
                  ? 'bg-black text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Approved
            </button>
            <button
              onClick={() => setFilterStatus('pending')}
              className={`px-3 py-1 rounded-full text-sm transition-colors ${
                filterStatus === 'pending'
                  ? 'bg-black text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Pending
            </button>
            <button
              onClick={() => setFilterStatus('denied')}
              className={`px-3 py-1 rounded-full text-sm transition-colors ${
                filterStatus === 'denied'
                  ? 'bg-black text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Denied
            </button>
            <button
              onClick={() => setFilterStatus('checked_in')}
              className={`px-3 py-1 rounded-full text-sm transition-colors ${
                filterStatus === 'checked_in'
                  ? 'bg-black text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Checked In
            </button>
          </div>

          {/* Added By Filter Pills */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setFilterAddedBy(null)}
              className={`px-3 py-1 rounded-full text-sm transition-colors ${
                filterAddedBy === null
                  ? 'bg-black text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All
            </button>
            {uniqueAdders.map(adder => (
              <button
                key={adder}
                onClick={() => setFilterAddedBy(adder)}
                className={`px-3 py-1 rounded-full text-sm transition-colors ${
                  filterAddedBy === adder
                    ? 'bg-black text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {adder}
              </button>
            ))}
          </div>
        </div>

        {/* Bulk Actions */}
        {selectedGuests.size > 0 && (
          <div className="mb-4 flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
            <span className="text-sm text-gray-600">
              {selectedGuests.size} guest{selectedGuests.size > 1 ? 's' : ''} selected
            </span>
            <button
              onClick={() => handleApprove(Array.from(selectedGuests))}
              className="bg-black text-white px-4 py-2 rounded-full hover:bg-gray-800 transition-colors text-sm"
            >
              Approve Selected
            </button>
            <button
              onClick={() => handleDeny(Array.from(selectedGuests))}
              className="bg-white text-black border border-gray-300 px-4 py-2 rounded-full hover:bg-gray-50 transition-colors text-sm"
            >
              Deny Selected
            </button>
            <button
              onClick={() => setShowMessageModal(true)}
              className="bg-white text-black border border-gray-300 px-4 py-2 rounded-full hover:bg-gray-50 transition-colors text-sm"
            >
              Message Guests
            </button>
            <button
              onClick={() => setSelectedGuests(new Set())}
              className="text-gray-600 hover:text-black transition-colors text-sm"
            >
              Clear Selection
            </button>
          </div>
        )}

        {/* Guest List Table */}
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 w-12"></th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Guest</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600"></th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Contact</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
                    Added By
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Status</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
                    Submitted
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredGuests.map((guest, index) => (
                  <tr
                    key={guest.id}
                    className={`border-b border-gray-100 hover:bg-gray-50 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}
                  >
                    <td className="py-3 px-4">
                      <input
                        type="checkbox"
                        checked={selectedGuests.has(guest.id)}
                        onChange={e => handleSelectGuest(guest.id, e.target.checked)}
                        className="w-4 h-4 rounded border-gray-300 cursor-pointer"
                      />
                    </td>
                    <td className="py-3 px-4">
                      <p className="text-sm font-medium">{guest.name}</p>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-sm">
                        {guest.plusOnes > 0 ? `+${guest.plusOnes}` : '-'}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <p className="text-sm text-gray-600">{guest.email}</p>
                      {guest.instagram && (
                        <p className="text-xs text-gray-500">{guest.instagram}</p>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      <span className="inline-block px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                        {guest.addedBy}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                        {guest.status === 'checked_in'
                          ? 'Checked In'
                          : guest.status.charAt(0).toUpperCase() + guest.status.slice(1)}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <p className="text-xs text-gray-500">
                        {formatSubmittedDate(guest.submittedAt)}
                      </p>
                      {guest.checkedInAt && (
                        <p className="text-xs text-gray-500">
                          In: {formatSubmittedDate(guest.checkedInAt)}
                        </p>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        {guest.status !== 'approved' && (
                          <button
                            onClick={() => handleApprove([guest.id])}
                            className="px-3 py-1 bg-white border border-gray-300 text-black rounded-full hover:bg-gray-50 transition-colors text-xs"
                          >
                            Approve
                          </button>
                        )}
                        {guest.status !== 'denied' && guest.status !== 'approved' && (
                          <button
                            onClick={() => handleDeny([guest.id])}
                            className="px-3 py-1 bg-white border border-gray-300 text-black rounded-full hover:bg-gray-50 transition-colors text-xs"
                          >
                            Deny
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filteredGuests.length === 0 && (
            <div className="p-8 text-center">
              <p className="text-gray-600">No guests found matching your filters.</p>
            </div>
          )}
        </div>
      </div>

      {/* Message Modal */}
      {showMessageModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-lg w-full mx-4">
            <h3 className="text-xl font-light mb-4">Message Guests</h3>
            <p className="text-sm text-gray-600 mb-4">
              Sending SMS to {selectedGuests.size} guest{selectedGuests.size > 1 ? 's' : ''}
            </p>
            <textarea
              value={messageText}
              onChange={e => setMessageText(e.target.value)}
              placeholder="Type your message here..."
              className="w-full h-32 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-black resize-none mb-4"
            />
            <div className="flex justify-end gap-3">
              <button
                onClick={() => {
                  setShowMessageModal(false);
                  setMessageText('');
                }}
                className="px-4 py-2 text-gray-600 hover:text-black transition-colors text-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleSendMessage}
                disabled={!messageText.trim()}
                className="bg-black text-white px-4 py-2 rounded-full hover:bg-gray-800 transition-colors text-sm disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Send Message
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

```


## File: `src/app/manager/events/create/page.tsx`

```typescript
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { SafeStorage } from '@/lib/utils/safeStorage';

interface DJ {
  id: string;
  name: string;
  email: string;
  stageName: string;
  capacity?: number;
}

interface NewDJ {
  stageName: string;
  givenName: string;
  email: string;
  phone: string;
  instagram: string;
}

export default function CreateEventPage() {
  const [eventTitle, setEventTitle] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [totalCapacity, setTotalCapacity] = useState(75);
  const [selectedDJs, setSelectedDJs] = useState<DJ[]>([]);
  const [capacityDistribution, setCapacityDistribution] = useState<'equal' | 'individual'>('equal');
  const [existingDJs, setExistingDJs] = useState<DJ[]>([]);
  const [showNewDJModal, setShowNewDJModal] = useState(false);
  const [newDJ, setNewDJ] = useState<NewDJ>({
    stageName: '',
    givenName: '',
    email: '',
    phone: '',
    instagram: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const [draggedDJId, setDraggedDJId] = useState<string | null>(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const router = useRouter();

  useEffect(() => {
    // Check authentication
    const isAuthenticated = SafeStorage.getItem('manager_authenticated');
    if (!isAuthenticated) {
      router.push('/manager/login');
      return;
    }

    // Load existing DJs
    const mockDJs: DJ[] = [
      { id: '1', name: 'Marcus Johnson', email: 'marcus@example.com', stageName: 'DJ Marcus' },
      { id: '2', name: 'Sarah Deep', email: 'sarah@example.com', stageName: 'Sarah Deep' },
      { id: '3', name: 'Alex Shadow', email: 'alex@example.com', stageName: 'DJ Shadow' },
      { id: '4', name: 'Mike Solar', email: 'mike@example.com', stageName: 'MC Solar' },
      { id: '5', name: 'Lisa Techno', email: 'lisa@example.com', stageName: 'Techno Lisa' },
    ];
    setExistingDJs(mockDJs);

    // Check for pre-selected date from URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    const preSelectedDate = urlParams.get('date');

    if (preSelectedDate) {
      // Use the date from URL parameter
      setEventDate(preSelectedDate);
      // Set current month to match the pre-selected date
      setCurrentMonth(new Date(preSelectedDate + 'T00:00:00'));
    } else {
      // Set default date to tomorrow
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      setEventDate(tomorrow.toISOString().split('T')[0]);
    }
  }, [router]);

  // ESC key handler to close modal
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && showNewDJModal) {
        setShowNewDJModal(false);
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [showNewDJModal]);

  // Keyboard navigation for DJ dropdown
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (searchTerm.trim() === '') return;

      const filtered = existingDJs.filter(
        dj =>
          dj.stageName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          dj.name.toLowerCase().includes(searchTerm.toLowerCase())
      );

      if (filtered.length === 0) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setHighlightedIndex(prev => Math.min(prev + 1, filtered.length - 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setHighlightedIndex(prev => Math.max(prev - 1, 0));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (highlightedIndex >= 0 && highlightedIndex < filtered.length) {
          handleAddExistingDJ(filtered[highlightedIndex]);
        }
      } else if (e.key === 'Escape') {
        e.preventDefault();
        setSearchTerm('');
        setHighlightedIndex(0);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [searchTerm, existingDJs, highlightedIndex, selectedDJs, capacityDistribution, totalCapacity]);

  // Reset highlighted index when search term changes
  useEffect(() => {
    setHighlightedIndex(0);
  }, [searchTerm]);

  // Close calendar when clicking outside
  useEffect(() => {
    if (!showCalendar) return;

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.calendar-container')) {
        setShowCalendar(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showCalendar]);

  // Close invite dropdown when clicking outside
  useEffect(() => {
    if (!showInviteDropdown) return;

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.invite-dropdown-container')) {
        setShowInviteDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showInviteDropdown]);

  const handleAddExistingDJ = (dj: DJ) => {
    if (!selectedDJs.find(selected => selected.id === dj.id)) {
      const newDJ = {
        ...dj,
        capacity:
          capacityDistribution === 'equal'
            ? Math.floor(totalCapacity / (selectedDJs.length + 1))
            : 25,
      };
      setSelectedDJs([...selectedDJs, newDJ]);

      // Redistribute capacity if equal distribution
      if (capacityDistribution === 'equal') {
        const updatedDJs = [...selectedDJs, newDJ].map(selectedDJ => ({
          ...selectedDJ,
          capacity: Math.floor(totalCapacity / (selectedDJs.length + 1)),
        }));
        setSelectedDJs(updatedDJs);
      }
    }
  };

  const handleRemoveDJ = (djId: string) => {
    const updated = selectedDJs.filter(dj => dj.id !== djId);
    setSelectedDJs(updated);

    // Redistribute capacity if equal distribution
    if (capacityDistribution === 'equal' && updated.length > 0) {
      const redistributed = updated.map(dj => ({
        ...dj,
        capacity: Math.floor(totalCapacity / updated.length),
      }));
      setSelectedDJs(redistributed);
    }
  };

  const handleCapacityChange = (djId: string, newCapacity: number) => {
    setSelectedDJs(selectedDJs.map(dj => (dj.id === djId ? { ...dj, capacity: newCapacity } : dj)));
  };

  const handleCreateNewDJ = () => {
    if (!newDJ.stageName.trim()) return;

    const id = `new_${Date.now()}`;
    const djToAdd: DJ = {
      id,
      name: newDJ.givenName || newDJ.stageName,
      email: newDJ.email,
      stageName: newDJ.stageName,
      capacity:
        capacityDistribution === 'equal'
          ? Math.floor(totalCapacity / (selectedDJs.length + 1))
          : 25,
    };

    setSelectedDJs([...selectedDJs, djToAdd]);
    setExistingDJs([...existingDJs, djToAdd]);

    // Reset form
    setNewDJ({ stageName: '', givenName: '', email: '', phone: '', instagram: '' });
    setShowNewDJModal(false);

    // Redistribute capacity if equal distribution
    if (capacityDistribution === 'equal') {
      const updatedDJs = [...selectedDJs, djToAdd].map(selectedDJ => ({
        ...selectedDJ,
        capacity: Math.floor(totalCapacity / (selectedDJs.length + 1)),
      }));
      setSelectedDJs(updatedDJs);
    }
  };

  const handleCreateEvent = async () => {
    if (!eventDate || selectedDJs.length === 0) return;

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Mock event creation success
      router.push('/manager/dashboard');
    } catch (error) {
      console.error('Failed to create event:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDragStart = (djId: string) => {
    setDraggedDJId(djId);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (targetDJId: string) => {
    if (!draggedDJId || draggedDJId === targetDJId) return;

    const draggedIndex = selectedDJs.findIndex(dj => dj.id === draggedDJId);
    const targetIndex = selectedDJs.findIndex(dj => dj.id === targetDJId);

    if (draggedIndex === -1 || targetIndex === -1) return;

    const newDJs = [...selectedDJs];
    // Swap positions
    [newDJs[draggedIndex], newDJs[targetIndex]] = [newDJs[targetIndex], newDJs[draggedIndex]];

    setSelectedDJs(newDJs);
    setDraggedDJId(null);
  };

  // Calendar helper functions
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    return { daysInMonth, startingDayOfWeek };
  };

  const generateCalendarDays = () => {
    const { daysInMonth, startingDayOfWeek } = getDaysInMonth(currentMonth);
    const days = [];
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }
    return days;
  };

  const handleDateSelect = (day: number) => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const selectedDate = new Date(year, month, day);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (selectedDate < today) return;
    const formattedDate = selectedDate.toISOString().split('T')[0];
    setEventDate(formattedDate);
    setShowCalendar(false);
  };

  const isDateSelected = (day: number) => {
    if (!eventDate) return false;
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const dateStr = new Date(year, month, day).toISOString().split('T')[0];
    return dateStr === eventDate;
  };

  const isPastDate = (day: number) => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const date = new Date(year, month, day);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const formatDisplayDate = (dateStr: string) => {
    if (!dateStr) return '';
    const date = new Date(dateStr + 'T00:00:00');
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  const filteredDJs = existingDJs.filter(
    dj =>
      dj.stageName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dj.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalAllocated = selectedDJs.reduce((sum, dj) => sum + (dj.capacity || 0), 0);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-200 p-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-light">Create Event</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6">
        <div className="space-y-8">
          {/* Event Title and Date */}
          <div className="flex flex-col md:flex-row gap-6">
            {/* Left: Event Title */}
            <div className="flex-1">
              <label className="block text-sm text-gray-700 mb-2">Event Title (optional)</label>
              <input
                type="text"
                value={eventTitle}
                onChange={e => setEventTitle(e.target.value)}
                placeholder="e.g., Summer Kickoff Party"
                className="w-full px-4 py-2 border border-gray-200 rounded-3xl focus:border-black transition-colors"
              />
            </div>

            {/* Right: Date Selection */}
            <div className="flex-1 relative calendar-container">
              <label className="block text-sm text-gray-700 mb-2">Event Date</label>
              <input
                type="text"
                value={formatDisplayDate(eventDate)}
                onClick={() => setShowCalendar(!showCalendar)}
                readOnly
                placeholder="Select date"
                className="w-full px-4 py-2 border border-gray-200 rounded-3xl focus:border-black transition-colors cursor-pointer"
              />

              {/* Custom Calendar Dropdown */}
              {showCalendar && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg p-4 z-20">
                  {/* Calendar Header */}
                  <div className="flex items-center justify-between mb-4">
                    <button
                      onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
                      className="text-gray-600 hover:text-black transition-colors p-1"
                      type="button"
                    >
                      ←
                    </button>
                    <h3 className="text-base font-medium">
                      {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                    </h3>
                    <button
                      onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
                      className="text-gray-600 hover:text-black transition-colors p-1"
                      type="button"
                    >
                      →
                    </button>
                  </div>

                  {/* Days of week */}
                  <div className="grid grid-cols-7 gap-1 mb-2">
                    {dayNames.map(day => (
                      <div key={day} className="text-center text-xs text-gray-500 font-medium py-1">
                        {day}
                      </div>
                    ))}
                  </div>

                  {/* Calendar days */}
                  <div className="grid grid-cols-7 gap-1">
                    {generateCalendarDays().map((day, index) => {
                      if (day === null) {
                        return <div key={`empty-${index}`} className="aspect-square" />;
                      }

                      const isSelected = isDateSelected(day);
                      const isPast = isPastDate(day);

                      return (
                        <button
                          key={day}
                          onClick={() => handleDateSelect(day)}
                          disabled={isPast}
                          type="button"
                          className={`
                            aspect-square rounded-full flex items-center justify-center text-sm
                            transition-colors
                            ${
                              isSelected
                                ? 'bg-black text-white font-medium'
                                : isPast
                                ? 'text-gray-300 cursor-not-allowed'
                                : 'hover:bg-gray-100 text-gray-900'
                            }
                          `}
                        >
                          {day}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* DJ Selection */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg">DJ Selection</h2>
              <div className="relative invite-dropdown-container">
                <button
                  onClick={() => setShowInviteDropdown(!showInviteDropdown)}
                  className="bg-gray-300 text-black px-6 py-3 rounded-full hover:bg-gray-400 transition-colors flex items-center gap-2"
                >
                  Invite New
                  <svg width="12" height="8" viewBox="0 0 12 8" fill="currentColor">
                    <path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>

                {/* Dropdown Menu */}
                {showInviteDropdown && (
                  <div className="absolute top-full right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg py-2 z-20 min-w-[160px]">
                    <button
                      onClick={() => {
                        setShowNewDJModal(true);
                        setShowInviteDropdown(false);
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors"
                    >
                      DJ
                    </button>
                    <button
                      onClick={() => {
                        // TODO: Add staff modal
                        setShowInviteDropdown(false);
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors"
                    >
                      Staff
                    </button>
                    <button
                      onClick={() => {
                        // TODO: Add promoter modal
                        setShowInviteDropdown(false);
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors"
                    >
                      Promoter
                    </button>
                    <button
                      onClick={() => {
                        // TODO: Add manager modal
                        setShowInviteDropdown(false);
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors"
                    >
                      Manager
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Search existing DJs */}
            <div className="mb-4 relative">
              <input
                type="text"
                placeholder="Search existing DJs..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-200 rounded-3xl focus:border-black transition-colors"
              />

              {/* Existing DJs list - dropdown style */}
              {searchTerm.trim() !== '' && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto z-10">
                  {filteredDJs.map((dj, index) => (
                    <div
                      key={dj.id}
                      className={`flex items-center justify-between p-3 border-b border-gray-100 last:border-b-0 transition-colors ${
                        index === highlightedIndex ? 'bg-gray-100' : 'hover:bg-gray-50'
                      }`}
                    >
                      <div>
                        <p className="font-medium">{dj.stageName}</p>
                        <p className="text-sm text-gray-600">{dj.name}</p>
                      </div>
                      <button
                        onClick={() => handleAddExistingDJ(dj)}
                        disabled={selectedDJs.some(selected => selected.id === dj.id)}
                        className="px-3 py-1 bg-black text-white rounded-full hover:bg-gray-900 transition-colors text-sm disabled:bg-gray-300 disabled:cursor-not-allowed"
                      >
                        {selectedDJs.some(selected => selected.id === dj.id) ? 'Added' : 'Add'}
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Selected DJs */}
            {selectedDJs.length > 0 && (
              <div>
                <h3 className="text-lg mb-3">Selected DJs</h3>
                <div className="space-y-3">
                  {selectedDJs.map(dj => (
                    <div
                      key={dj.id}
                      draggable
                      onDragStart={() => handleDragStart(dj.id)}
                      onDragOver={handleDragOver}
                      onDrop={() => handleDrop(dj.id)}
                      className={`flex items-center justify-between p-4 bg-gray-50 rounded-3xl transition-opacity ${
                        draggedDJId === dj.id ? 'opacity-50' : ''
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-3">
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className="text-gray-400 cursor-move"
                          >
                            <circle cx="7" cy="5" r="1.5" />
                            <circle cx="7" cy="10" r="1.5" />
                            <circle cx="7" cy="15" r="1.5" />
                            <circle cx="13" cy="5" r="1.5" />
                            <circle cx="13" cy="10" r="1.5" />
                            <circle cx="13" cy="15" r="1.5" />
                          </svg>
                          <div>
                            <p className="font-medium">{dj.stageName}</p>
                            <p className="text-sm text-gray-600">{dj.name}</p>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        {capacityDistribution === 'individual' && (
                          <div className="flex items-center gap-2">
                            <label className="text-sm text-gray-600">Allotted Capacity:</label>
                            <input
                              type="number"
                              min="0"
                              value={dj.capacity || 0}
                              onChange={e =>
                                handleCapacityChange(dj.id, parseInt(e.target.value) || 0)
                              }
                              className="w-16 px-3 py-1 bg-white border border-gray-200 rounded-full text-sm text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                            />
                          </div>
                        )}

                        <button
                          onClick={() => handleRemoveDJ(dj.id)}
                          className="text-gray-400 hover:text-red-600 transition-colors"
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Capacity Settings */}
          <div>
            <h2 className="text-lg mb-4">Capacity Settings</h2>

            <div className="space-y-6">
              {/* Capacity and Distribution Side by Side */}
              <div className="flex flex-col md:flex-row gap-6">
                {/* Left: Total Capacity Input */}
                <div className="flex-1">
                  <label className="block text-sm text-gray-700 mb-2">Total Guestlist Capacity</label>
                  <input
                    type="number"
                    min="1"
                    value={totalCapacity}
                    onChange={e => setTotalCapacity(parseInt(e.target.value) || 75)}
                    className="px-4 py-2 border border-gray-200 rounded-3xl focus:border-black transition-colors [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                </div>

                {/* Right: Distribution Settings */}
                <div className="flex-1">
                  <label className="block text-sm text-gray-700 mb-2">Distribution</label>
                  <div className="space-y-2">
                    <label className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="distribution"
                        checked={capacityDistribution === 'equal'}
                        onChange={() => setCapacityDistribution('equal')}
                        className="accent-black"
                      />
                      <span className="text-sm">Share capacity equally</span>
                    </label>
                    <label className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="distribution"
                        checked={capacityDistribution === 'individual'}
                        onChange={() => setCapacityDistribution('individual')}
                        className="accent-black"
                      />
                      <span className="text-sm">Set individual limits</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => router.push('/manager/dashboard')}
              className="flex-1 bg-gray-100 text-black py-3 rounded-full hover:bg-gray-200 transition-colors text-sm"
            >
              Cancel
            </button>
            <button
              onClick={handleCreateEvent}
              disabled={
                !eventDate ||
                selectedDJs.length === 0 ||
                isLoading ||
                (capacityDistribution === 'equal' && totalAllocated > totalCapacity)
              }
              className="flex-1 bg-black text-white py-3 rounded-full hover:bg-gray-900 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed text-sm"
            >
              {isLoading ? 'Creating Event...' : 'Create Event'}
            </button>
          </div>
        </div>
      </div>

      {/* New DJ Modal */}
      {showNewDJModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-6 z-50">
          <div className="bg-white rounded-3xl p-6 w-full max-w-sm">
            <h3 className="text-lg mb-4">Add New DJ</h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-700 mb-1">DJ Name *</label>
                <input
                  type="text"
                  value={newDJ.stageName}
                  onChange={e => setNewDJ({ ...newDJ, stageName: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-3xl focus:border-black transition-colors"
                  placeholder="DJ Marcus"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-1">Given Name</label>
                <input
                  type="text"
                  value={newDJ.givenName}
                  onChange={e => setNewDJ({ ...newDJ, givenName: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-3xl focus:border-black transition-colors"
                  placeholder="Marcus Johnson"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  value={newDJ.email}
                  onChange={e => setNewDJ({ ...newDJ, email: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-3xl focus:border-black transition-colors"
                  placeholder="marcus@example.com"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-1">Phone</label>
                <input
                  type="tel"
                  value={newDJ.phone}
                  onChange={e => setNewDJ({ ...newDJ, phone: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-3xl focus:border-black transition-colors"
                  placeholder="(555) 123-4567"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-1">
                  Instagram Handle (optional)
                </label>
                <input
                  type="text"
                  value={newDJ.instagram}
                  onChange={e => setNewDJ({ ...newDJ, instagram: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-3xl focus:border-black transition-colors"
                  placeholder="@djusername"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowNewDJModal(false)}
                className="flex-1 bg-gray-100 text-black py-2 rounded-full hover:bg-gray-200 transition-colors text-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateNewDJ}
                disabled={!newDJ.stageName.trim()}
                className="flex-1 bg-black text-white py-2 rounded-full hover:bg-gray-900 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed text-sm"
              >
                Add DJ
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

```


## File: `src/app/manager/login/page.tsx`

```typescript
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { SafeStorage } from '@/lib/utils/safeStorage';

export default function ManagerLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Mock validation for different manager types
      if (email === 'owner@datcha.com' && password === 'password123') {
        SafeStorage.setItem('manager_authenticated', 'true');
        SafeStorage.setItem('manager_email', email);
        SafeStorage.setItem('manager_role', 'owner');
        SafeStorage.setItem('manager_name', 'Sarah Chen');
        router.push('/manager/dashboard');
      } else if (email === 'manager@datcha.com' && password === 'password123') {
        SafeStorage.setItem('manager_authenticated', 'true');
        SafeStorage.setItem('manager_email', email);
        SafeStorage.setItem('manager_role', 'manager');
        SafeStorage.setItem('manager_name', 'Alex Rodriguez');
        router.push('/manager/dashboard');
      } else if (email === 'assistant@datcha.com' && password === 'password123') {
        SafeStorage.setItem('manager_authenticated', 'true');
        SafeStorage.setItem('manager_email', email);
        SafeStorage.setItem('manager_role', 'assistant');
        SafeStorage.setItem('manager_name', 'Jordan Kim');
        router.push('/manager/dashboard');
      } else {
        setError('Invalid email or password');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-light tracking-tight mb-2">Manager Login</h1>
          <p className="text-gray-600">Access venue management system</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          {error && (
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
              <p className="text-gray-700 text-sm">{error}</p>
            </div>
          )}

          <div>
            <label htmlFor="email" className="block text-sm text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black focus:border-black transition-colors"
              placeholder="manager@datcha.com"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black focus:border-black transition-colors"
              placeholder="password123"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-black text-white py-3 rounded-full hover:bg-gray-900 transition-colors disabled:opacity-50 text-sm"
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600 mb-2">Test accounts:</p>
          <div className="text-xs text-gray-500 space-y-1">
            <p>Owner: owner@datcha.com / password123</p>
            <p>Manager: manager@datcha.com / password123</p>
            <p>Assistant: assistant@datcha.com / password123</p>
          </div>
        </div>
      </div>
    </div>
  );
}

```


## File: `src/app/page.tsx`

```typescript
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';

export default function Home() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session) {
        router.push('/dashboard');
      } else {
        setIsLoading(false);
      }
    };

    checkSession();
  }, [router]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex min-h-screen flex-col">
        {/* Hero section */}
        <div className="relative isolate overflow-hidden bg-gray-900 pb-16 pt-14 sm:pb-20">
          <Image
            src="/nightclub-bg.jpg"
            alt="Nightclub background"
            className="absolute inset-0 -z-10 h-full w-full object-cover opacity-20"
            width={1920}
            height={1080}
            priority
          />
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
              <div className="text-center">
                <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
                  Guestlist App
                </h1>
                <p className="mt-6 text-lg leading-8 text-gray-300">
                  Streamline your nightclub guest list operations with lightning-fast QR code
                  check-in, seamless digital signup, and real-time analytics.
                </p>
                <div className="mt-10 flex items-center justify-center gap-x-6">
                  <Link
                    href="/auth/login"
                    className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Sign in
                  </Link>
                  <Link href="/guest-signup" className="text-sm font-semibold leading-6 text-white">
                    Guest Signup <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features section */}
        <div className="bg-white py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:text-center">
              <h2 className="text-base font-semibold leading-7 text-indigo-600">
                Efficient Guest Management
              </h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Everything you need to manage your nightclub guest lists
              </p>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Replace your manual WhatsApp and spreadsheet workflows with a secure, automated
                system.
              </p>
            </div>
            <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
              <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
                <div className="flex flex-col">
                  <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="h-5 w-5 flex-none text-indigo-600"
                    >
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
                    </svg>
                    QR Code Check-in
                  </dt>
                  <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                    <p className="flex-auto">
                      Lightning-fast check-in process for doormen with QR code scanning.
                    </p>
                  </dd>
                </div>
                <div className="flex flex-col">
                  <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="h-5 w-5 flex-none text-indigo-600"
                    >
                      <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zM7 10h2v7H7zm4-3h2v10h-2zm4 6h2v4h-2z" />
                    </svg>
                    Real-time Analytics
                  </dt>
                  <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                    <p className="flex-auto">
                      Track attendance, conversion rates, and promoter performance in real-time.
                    </p>
                  </dd>
                </div>
                <div className="flex flex-col">
                  <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="h-5 w-5 flex-none text-indigo-600"
                    >
                      <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z" />
                    </svg>
                    Privacy Compliant
                  </dt>
                  <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                    <p className="flex-auto">
                      Fully compliant with Quebec privacy laws with data stored in Canada.
                    </p>
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-white">
          <div className="mx-auto max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between lg:px-8">
            <div className="mt-8 md:order-1 md:mt-0">
              <p className="text-center text-xs leading-5 text-gray-500">
                &copy; {new Date().getFullYear()} Guestlist App. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

```


## File: `src/app/privacy/page.tsx`

```typescript
'use client';

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen py-4xl px-xl">
      <div className="container-sm">
        <div className="card">
          <div className="card-body">
            <h1 className="text-3xl font-light mb-xl">Privacy Policy</h1>

            <div className="space-y-lg text-sm text-gray-700">
              <p>
                <strong>Last updated:</strong> July 5, 2025
              </p>

              <div>
                <h2 className="text-lg font-medium text-black mb-md">Information We Collect</h2>
                <p>
                  When you join our guest list, we collect your name, email, phone number, and
                  optionally your Instagram handle. This information is used solely for event
                  management and communication purposes.
                </p>
              </div>

              <div>
                <h2 className="text-lg font-medium text-black mb-md">
                  How We Use Your Information
                </h2>
                <ul className="list-disc list-inside space-y-sm">
                  <li>To manage guest lists for events</li>
                  <li>To send event updates and confirmations via text and email</li>
                  <li>To verify your identity at the door</li>
                  <li>To improve our service and event experience</li>
                </ul>
              </div>

              <div>
                <h2 className="text-lg font-medium text-black mb-md">Information Sharing</h2>
                <p>
                  We do not sell, trade, or share your personal information with third parties
                  except as necessary to provide our services (such as sending text messages or
                  emails).
                </p>
              </div>

              <div>
                <h2 className="text-lg font-medium text-black mb-md">Data Security</h2>
                <p>
                  We implement appropriate security measures to protect your personal information
                  against unauthorized access, alteration, disclosure, or destruction.
                </p>
              </div>

              <div>
                <h2 className="text-lg font-medium text-black mb-md">Your Rights</h2>
                <p>
                  You may request to update or delete your information at any time by contacting us.
                  You can also opt out of text messages by replying STOP to any message.
                </p>
              </div>

              <div>
                <h2 className="text-lg font-medium text-black mb-md">Contact Us</h2>
                <p>
                  If you have any questions about this Privacy Policy, please contact us at
                  privacy@datcha.com
                </p>
              </div>
            </div>

            <div className="mt-xl pt-lg border-t border-gray-200">
              <button onClick={() => window.close()} className="btn btn-ghost">
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

```


## File: `src/app/promoter/dashboard/page.tsx`

```typescript
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { SafeStorage } from '@/lib/utils/safeStorage';

interface Event {
  id: string;
  name: string;
  date: string;
  dayOfWeek: string;
  venue: string;
  djs: string[];
  capacity: number;
  spotsUsed: number;
  pendingGuests: number;
  checkedIn: number;
  status: 'upcoming' | 'past';
}

export default function PromoterDashboardPage() {
  const [promoterName, setPromoterName] = useState('');
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [shareEventId, setShareEventId] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Check authentication
    const isAuthenticated = SafeStorage.getItem('promoter_authenticated');
    if (!isAuthenticated) {
      router.push('/promoter/login');
      return;
    }

    // Get promoter info
    SafeStorage.getItem('promoter_email'); // Used for future API calls
    setPromoterName('Alex'); // This would come from API

    // Mock data - 21 days of events
    setTimeout(() => {
      const today = new Date();
      const mockEvents: Event[] = [];

      for (let i = 0; i < 21; i++) {
        const eventDate = new Date(today);
        eventDate.setDate(today.getDate() + i);

        // Only add events for certain days (not every day)
        if (i % 3 === 0 || i % 5 === 0) {
          const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
          const monthNames = [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec',
          ];

          mockEvents.push({
            id: `event_${i}`,
            name:
              i === 0
                ? 'Saturday Night Sessions'
                : i === 3
                  ? 'Midweek Vibes'
                  : i === 5
                    ? 'Summer Nights'
                    : i === 6
                      ? 'Underground Sessions'
                      : i === 9
                        ? 'Rooftop Party'
                        : `Night ${i + 1}`,
            date: `${dayNames[eventDate.getDay()]} ${monthNames[eventDate.getMonth()]} ${eventDate.getDate()}`,
            dayOfWeek: dayNames[eventDate.getDay()],
            venue: 'Datcha',
            djs:
              i === 0
                ? ['DJ Marcus', 'MC Groove']
                : i === 3
                  ? ['DJ Luna']
                  : i === 5
                    ? ['DJ Shadow', 'MC Flow']
                    : i === 6
                      ? ['DJ Beats']
                      : ['DJ Electric'],
            capacity: 50, // Manager-configurable capacity
            spotsUsed: i === 0 ? 0 : Math.floor(Math.random() * 35) + 5,
            pendingGuests: i === 0 ? 8 : Math.floor(Math.random() * 8),
            checkedIn: Math.floor(Math.random() * 20),
            status: 'upcoming',
          });
        }
      }

      setEvents(mockEvents);
      setIsLoading(false);
    }, 1000);
  }, [router]);

  const handleCopyLink = async (event: Event) => {
    const shareUrl = `https://nightlist.app/guest/signup?event=${event.id}&promoter=alex`;

    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(shareUrl);
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = shareUrl;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }

      setShareEventId(event.id);
      setTimeout(() => setShareEventId(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleShareEvent = async (event: Event) => {
    const shareUrl = `https://nightlist.app/guest/signup?event=${event.id}&promoter=alex`;
    const shareData = {
      title: `Join me at ${event.name}`,
      text: `You're invited to ${event.name} on ${event.date}. Join the guest list!`,
      url: shareUrl,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        return;
      } catch (error) {
        if ((error as Error).name === 'AbortError') {
          return;
        }
      }
    }

    // Fallback to copy if share not available
    handleCopyLink(event);
  };

  const handleLogout = () => {
    SafeStorage.removeItem('promoter_authenticated');
    SafeStorage.removeItem('promoter_email');
    router.push('/promoter/login');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="p-6">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-600 mb-2">Nightlist</p>
            <h1 className="text-3xl font-light tracking-tight mb-1">Hey {promoterName}!</h1>
            <p className="text-gray-600">Invite friends to an upcoming night</p>
          </div>
          <button
            onClick={handleLogout}
            className="text-gray-600 hover:text-black transition-colors text-sm"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6">
        {/* Events for next 21 days */}
        <div className="mb-8">
          <h2 className="text-xl mb-4">Upcoming Events</h2>
          {events.length === 0 ? (
            <div className="bg-gray-50 rounded-xl p-8 text-center">
              <h3 className="text-lg mb-2">No upcoming events</h3>
              <p className="text-gray-600">Events will appear here once they&apos;re scheduled.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {events.map(event => (
                <div key={event.id} className="bg-white border border-gray-200 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-lg">{event.name}</h3>
                    <p className="text-xs text-gray-600">{event.date}</p>
                  </div>

                  {event.djs.length > 0 && (
                    <p className="text-sm text-gray-500 mb-4">With {event.djs.join(', ')}</p>
                  )}

                  <div className="mb-4">
                    {/* Capacity Meter */}
                    <div className="w-full">
                      <div className="relative">
                        {/* Pending label above the meter bar when it would conflict */}
                        {event.pendingGuests > 0 &&
                          (() => {
                            const pendingCenterPosition =
                              ((event.spotsUsed + event.pendingGuests / 2) / event.capacity) * 100;
                            const wouldOverlapConfirmed = pendingCenterPosition < 25;
                            const wouldOverlapSpots = pendingCenterPosition > 70;

                            return wouldOverlapConfirmed || wouldOverlapSpots ? (
                              <div
                                className="absolute -top-5 text-xs text-gray-500"
                                style={{
                                  left: `${pendingCenterPosition}%`,
                                  transform: 'translateX(-50%)',
                                }}
                              >
                                Pending
                              </div>
                            ) : null;
                          })()}

                        <div className="bg-gray-200 rounded-full h-4 relative overflow-hidden">
                          {/* Pending + Confirmed (light gray) bar - shows total */}
                          <div
                            className="bg-gray-400 h-4 rounded-full transition-all duration-300 absolute top-0 left-0"
                            style={{
                              width: `${((event.spotsUsed + event.pendingGuests) / event.capacity) * 100}%`,
                            }}
                          >
                            {/* Pending count inside the gray bar - only show if bar is wide enough */}
                            {event.pendingGuests > 0 &&
                              event.pendingGuests / event.capacity > 0.08 && (
                                <span
                                  className="absolute top-1/2 -translate-y-1/2 text-white text-[10px] z-20"
                                  style={{ right: '8px' }}
                                >
                                  {event.pendingGuests}
                                </span>
                              )}
                          </div>
                          {/* Confirmed (black) bar - shows on top */}
                          <div
                            className="bg-black h-4 rounded-full transition-all duration-300 relative z-10"
                            style={{ width: `${(event.spotsUsed / event.capacity) * 100}%` }}
                          >
                            <span className="absolute right-2 top-1/2 -translate-y-1/2 text-white text-[10px]">
                              {event.spotsUsed}
                            </span>
                          </div>
                          <span className="absolute right-2 top-1/2 -translate-y-1/2 text-black text-[10px] z-20">
                            {event.capacity}
                          </span>
                        </div>

                        <div className="flex justify-between mt-2 relative">
                          <span className="text-xs text-gray-500">Confirmed</span>

                          {/* Pending label below the meter (normal position) - hide if too close to edges */}
                          {event.pendingGuests > 0 &&
                            (() => {
                              const pendingCenterPosition =
                                ((event.spotsUsed + event.pendingGuests / 2) / event.capacity) *
                                100;
                              const wouldOverlapConfirmed = pendingCenterPosition < 30;
                              const wouldOverlapSpots = pendingCenterPosition > 65;

                              return !wouldOverlapConfirmed && !wouldOverlapSpots ? (
                                <span
                                  className="absolute text-xs text-gray-500"
                                  style={{
                                    left: `${pendingCenterPosition}%`,
                                    transform: 'translateX(-50%)',
                                  }}
                                >
                                  Pending
                                </span>
                              ) : null;
                            })()}

                          <span className="text-xs text-gray-500">Spots available</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Share Invite Link */}
                  <div className="mb-6">
                    <p className="text-sm text-gray-600 mb-2">Share invite link:</p>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 relative">
                        <input
                          type="text"
                          value={`https://nightlist.app/guest/signup?event=${event.id}&promoter=alex`}
                          readOnly
                          onClick={() => handleCopyLink(event)}
                          className={`w-full bg-gray-100 rounded-full px-4 py-2 text-xs font-mono pr-4 cursor-pointer hover:bg-gray-200 transition-opacity ${
                            shareEventId === event.id ? 'opacity-0' : 'opacity-100'
                          }`}
                        />
                        {shareEventId === event.id && (
                          <div className="absolute inset-0 flex items-center justify-center text-xs text-gray-600 pointer-events-none">
                            Copied!
                          </div>
                        )}
                        <div className="absolute right-1 top-1 bottom-1 w-8 bg-gradient-to-l from-gray-100 via-gray-100/90 to-transparent rounded-r-full pointer-events-none"></div>
                      </div>
                      <button
                        onClick={() => handleCopyLink(event)}
                        className="px-3 py-1.5 bg-white text-black border border-black rounded-full hover:bg-gray-50 transition-colors text-xs"
                      >
                        Copy
                      </button>
                      <button
                        onClick={async () => {
                          const shareUrl = `https://nightlist.app/guest/signup?event=${event.id}&promoter=alex`;
                          const shareData = {
                            title: `Join me at ${event.name}`,
                            text: `You're invited to ${event.name} on ${event.date}. Join the guest list!`,
                            url: shareUrl,
                          };

                          if (navigator.share) {
                            try {
                              await navigator.share(shareData);
                            } catch (error) {
                              if ((error as Error).name !== 'AbortError') {
                                console.error('Share failed:', error);
                              }
                            }
                          }
                        }}
                        className="px-3 py-1.5 bg-black text-white rounded-full hover:bg-gray-900 transition-colors text-xs"
                      >
                        Share
                      </button>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <button
                      onClick={() => router.push(`/promoter/events/${event.id}/capacity`)}
                      className="flex-1 bg-white text-black border border-gray-300 py-2 rounded-full text-xs hover:bg-gray-50 transition-colors leading-tight"
                    >
                      Request additional spots
                    </button>

                    <button
                      onClick={() => router.push(`/promoter/events/${event.id}/manage`)}
                      className={`flex-1 py-2 rounded-full text-xs transition-colors leading-tight ${
                        event.pendingGuests > 0
                          ? 'bg-gray-400 text-white hover:bg-gray-500'
                          : 'bg-gray-800 text-white hover:bg-gray-900'
                      }`}
                    >
                      {event.pendingGuests > 0 ? 'Review pending guests' : 'Review guestlist'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

```


## File: `src/app/promoter/events/[id]/capacity/page.tsx`

```typescript
'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { SafeStorage } from '@/lib/utils/safeStorage';

interface EventInfo {
  id: string;
  name: string;
  date: string;
  venue: string;
  currentCapacity: number;
  spotsUsed: number;
}

export default function PromoterCapacityRequestPage() {
  const [eventInfo, setEventInfo] = useState<EventInfo | null>(null);
  const [requestedSpots, setRequestedSpots] = useState(10);
  const [reason, setReason] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const router = useRouter();
  const params = useParams();

  useEffect(() => {
    const loadEventData = async () => {
      try {
        // Check authentication
        const isAuthenticated = SafeStorage.getItem('promoter_authenticated');
        if (!isAuthenticated) {
          router.push('/promoter/login');
          return;
        }

        // Mock data loading
        await new Promise(resolve => setTimeout(resolve, 1000));

        setEventInfo({
          id: params.id as string,
          name: 'Saturday Night Sessions',
          date: 'Sat Jul 6',
          venue: 'Datcha',
          currentCapacity: 50,
          spotsUsed: 28,
        });

        setIsLoading(false);
      } catch (error) {
        console.error('Failed to load event data:', error);
        setIsLoading(false);
      }
    };

    loadEventData();
  }, [router, params.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Mock success
      setShowSuccess(true);

      // Auto-redirect after 2 seconds
      setTimeout(() => {
        router.push(`/promoter/events/${eventInfo?.id}/manage`);
      }, 2000);
    } catch (error) {
      console.error('Failed to submit request:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
          <p className="text-gray-600">Loading event...</p>
        </div>
      </div>
    );
  }

  if (!eventInfo) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-gray-600">Event not found</p>
      </div>
    );
  }

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-6">
          <div className="text-4xl mb-4">✓</div>
          <h1 className="text-xl mb-2">Request Submitted</h1>
          <p className="text-gray-600 mb-4">
            Your request for {requestedSpots} additional spots has been sent to the manager for
            approval.
          </p>
          <p className="text-sm text-gray-500">Redirecting to event management...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="p-6">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => router.push(`/promoter/events/${eventInfo.id}/manage`)}
            className="text-gray-600 hover:text-black transition-colors mb-4 text-sm"
          >
            ← Back to Event
          </button>
          <h1 className="text-2xl font-light mb-1">Request Additional Spots</h1>
          <p className="text-gray-600">
            {eventInfo.name} • {eventInfo.date}
          </p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto p-6">
        {/* Current Status */}
        <div className="bg-gray-50 rounded-xl p-6 mb-6">
          <h2 className="text-lg mb-4">Current Event Status</h2>

          <div className="relative">
            <div className="bg-gray-200 rounded-full h-4 relative overflow-hidden">
              <div
                className="bg-black h-4 rounded-full transition-all duration-300 relative"
                style={{ width: `${(eventInfo.spotsUsed / eventInfo.currentCapacity) * 100}%` }}
              >
                <span className="absolute right-2 top-1/2 -translate-y-1/2 text-white text-[10px]">
                  {eventInfo.spotsUsed}
                </span>
              </div>
              <span className="absolute right-2 top-1/2 -translate-y-1/2 text-black text-[10px]">
                {eventInfo.currentCapacity}
              </span>
            </div>
            <div className="flex justify-between mt-2">
              <span className="text-xs text-gray-500">Approved</span>
              <span className="text-xs text-gray-500">Available</span>
            </div>
          </div>
        </div>

        {/* Request Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="spots" className="block text-sm text-gray-600 mb-2">
              Additional spots requested
            </label>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setRequestedSpots(Math.max(1, requestedSpots - 5))}
                className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
              >
                -
              </button>
              <input
                id="spots"
                type="number"
                min="1"
                max="100"
                value={requestedSpots}
                onChange={e => setRequestedSpots(parseInt(e.target.value) || 1)}
                className="w-20 text-center px-3 py-2 border border-gray-200 rounded-full focus:border-black transition-colors"
              />
              <button
                type="button"
                onClick={() => setRequestedSpots(requestedSpots + 5)}
                className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
              >
                +
              </button>
              <span className="text-sm text-gray-600">spots</span>
            </div>
          </div>

          <div>
            <textarea
              id="reason"
              value={reason}
              onChange={e => setReason(e.target.value)}
              rows={4}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-black transition-colors resize-none"
              placeholder="Comments"
            />
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => router.push(`/promoter/events/${eventInfo.id}/manage`)}
              className="flex-1 bg-gray-100 text-black py-3 rounded-full text-sm hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-black text-white py-3 rounded-full text-sm hover:bg-gray-900 transition-colors disabled:bg-gray-400"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Request'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

```


## File: `src/app/promoter/events/[id]/manage/page.tsx`

```typescript
'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { SafeStorage } from '@/lib/utils/safeStorage';

interface Guest {
  id: string;
  name: string;
  email: string;
  phone: string;
  instagram?: string;
  plusOnes: number;
  status: 'pending' | 'approved' | 'denied';
  checkedIn: boolean;
  submittedAt: string;
  addedBy: string;
}

interface EventInfo {
  id: string;
  name: string;
  date: string;
  venue: string;
  capacity: number;
  spotsUsed: number;
}

export default function PromoterEventManagePage() {
  const [eventInfo, setEventInfo] = useState<EventInfo | null>(null);
  const [allGuests, setAllGuests] = useState<Guest[]>([]);
  const [activeTab, setActiveTab] = useState<'my-list' | 'complete-guestlist'>('my-list');
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'approved' | 'denied'>(
    'all'
  );
  const [personFilter, setPersonFilter] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(true);
  const [shareEventId, setShareEventId] = useState<string | null>(null);
  const router = useRouter();
  const params = useParams();

  useEffect(() => {
    const loadEventData = async () => {
      try {
        // Check authentication
        const isAuthenticated = SafeStorage.getItem('promoter_authenticated');
        if (!isAuthenticated) {
          router.push('/promoter/login');
          return;
        }

        // Mock data loading
        await new Promise(resolve => setTimeout(resolve, 1000));

        setEventInfo({
          id: params.id as string,
          name: 'Saturday Night Sessions',
          date: 'Sat Jul 6',
          venue: 'Datcha',
          capacity: 50,
          spotsUsed: 28,
        });

        // Mock guest data - mix of promoter's guests and others
        setAllGuests([
          {
            id: '1',
            name: 'Sarah Johnson',
            email: 'sarah@example.com',
            phone: '+1 (555) 123-4567',
            instagram: '@sarahj',
            plusOnes: 2,
            status: 'approved',
            checkedIn: false,
            submittedAt: '2 hours ago',
            addedBy: 'Alex',
          },
          {
            id: '2',
            name: 'Mike Chen',
            email: 'mike@example.com',
            phone: '+1 (555) 234-5678',
            plusOnes: 1,
            status: 'pending',
            checkedIn: false,
            submittedAt: '4 hours ago',
            addedBy: 'Alex',
          },
          {
            id: '3',
            name: 'Emma Wilson',
            email: 'emma@example.com',
            phone: '+1 (555) 345-6789',
            instagram: '@emmaw',
            plusOnes: 0,
            status: 'approved',
            checkedIn: true,
            submittedAt: '1 day ago',
            addedBy: 'DJ Marcus',
          },
          {
            id: '4',
            name: 'David Rodriguez',
            email: 'david@example.com',
            phone: '+1 (555) 456-7890',
            plusOnes: 3,
            status: 'pending',
            checkedIn: false,
            submittedAt: '6 hours ago',
            addedBy: 'Staff John',
          },
          {
            id: '5',
            name: 'Lisa Park',
            email: 'lisa@example.com',
            phone: '+1 (555) 567-8901',
            instagram: '@lisap',
            plusOnes: 1,
            status: 'approved',
            checkedIn: false,
            submittedAt: '8 hours ago',
            addedBy: 'Alex',
          },
        ]);

        setIsLoading(false);
      } catch (error) {
        console.error('Failed to load event data:', error);
        setIsLoading(false);
      }
    };

    loadEventData();
  }, [router, params.id]);

  const handleShareEvent = async () => {
    if (!eventInfo) return;

    const shareUrl = `https://nightlist.app/guest/signup?event=${eventInfo.id}&promoter=alex`;
    const shareData = {
      title: `Join me at ${eventInfo.name}`,
      text: `You're invited to ${eventInfo.name} on ${eventInfo.date}. Join the guest list!`,
      url: shareUrl,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        return;
      } catch (error) {
        if ((error as Error).name === 'AbortError') {
          return;
        }
      }
    }

    // Fallback to clipboard
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(shareUrl);
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = shareUrl;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }

      setShareEventId(eventInfo.id);
      setTimeout(() => setShareEventId(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleApproveGuest = (guestId: string) => {
    setAllGuests(prev =>
      prev.map(guest => (guest.id === guestId ? { ...guest, status: 'approved' as const } : guest))
    );
  };

  const handleDenyGuest = (guestId: string) => {
    setAllGuests(prev =>
      prev.map(guest => (guest.id === guestId ? { ...guest, status: 'denied' as const } : guest))
    );
  };

  const handleUpdatePlusOnes = (guestId: string, newPlusOnes: number) => {
    const validPlusOnes = Math.max(0, newPlusOnes);
    setAllGuests(prev =>
      prev.map(guest => (guest.id === guestId ? { ...guest, plusOnes: validPlusOnes } : guest))
    );
  };

  // Filter guests based on active tab
  const myGuests = allGuests.filter(guest => guest.addedBy === 'Alex');
  const displayGuests = activeTab === 'my-list' ? myGuests : allGuests;

  // Apply status filter
  const statusFilteredGuests =
    statusFilter === 'all'
      ? displayGuests
      : displayGuests.filter(guest => guest.status === statusFilter);

  // Apply person filter (only for complete guestlist)
  const filteredGuests =
    activeTab === 'complete-guestlist' && personFilter !== 'all'
      ? statusFilteredGuests.filter(guest => guest.addedBy === personFilter)
      : statusFilteredGuests;

  // Get unique people for filtering
  const uniquePeople = Array.from(new Set(allGuests.map(g => g.addedBy)));
  const personCounts = uniquePeople.reduce(
    (acc, person) => {
      acc[person] = allGuests.filter(g => g.addedBy === person).length;
      return acc;
    },
    {} as Record<string, number>
  );

  // Calculate capacity usage
  const approvedGuests = allGuests.filter(g => g.status === 'approved');
  const totalSpotsUsed = approvedGuests.reduce((total, guest) => total + 1 + guest.plusOnes, 0);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
          <p className="text-gray-600">Loading event...</p>
        </div>
      </div>
    );
  }

  if (!eventInfo) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-gray-600">Event not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="p-6">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => router.push('/promoter/dashboard')}
            className="text-gray-600 hover:text-black transition-colors mb-4 text-sm"
          >
            ← Dashboard
          </button>
          <h1 className="text-2xl font-light mb-1">{eventInfo.name}</h1>
          <p className="text-gray-600 mb-1">
            {eventInfo.date} at {eventInfo.venue}
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6">
        {/* Capacity Meter */}
        <div className="mb-6">
          <div className="relative">
            <div className="bg-gray-200 rounded-full h-4 relative overflow-hidden">
              <div
                className="bg-black h-4 rounded-full transition-all duration-300 relative"
                style={{ width: `${(totalSpotsUsed / eventInfo.capacity) * 100}%` }}
              >
                <span className="absolute right-2 top-1/2 -translate-y-1/2 text-white text-[10px]">
                  {totalSpotsUsed}
                </span>
              </div>
              <span className="absolute right-2 top-1/2 -translate-y-1/2 text-black text-[10px]">
                {eventInfo.capacity}
              </span>
            </div>
            <div className="flex justify-between mt-2">
              <span className="text-xs text-gray-500">Approved</span>
              <span className="text-xs text-gray-500">Total capacity</span>
            </div>
          </div>
        </div>

        {/* Share Invite */}
        <div className="mb-6">
          <p className="text-sm text-gray-600 mb-2">Share invite link:</p>
          <div className="flex items-center gap-2">
            <div className="flex-1 relative">
              <input
                type="text"
                value={`https://nightlist.app/guest/signup?event=${eventInfo.id}&promoter=alex`}
                readOnly
                className="w-full bg-gray-100 rounded-full px-4 py-2 text-xs font-mono pr-4"
              />
              <div className="absolute right-1 top-1 bottom-1 w-8 bg-gradient-to-l from-gray-100 via-gray-100/90 to-transparent rounded-r-full pointer-events-none"></div>
            </div>
            <button
              onClick={handleShareEvent}
              className="px-3 py-1.5 bg-black text-white rounded-full hover:bg-gray-900 transition-colors text-xs"
            >
              {shareEventId === eventInfo.id ? 'Copied!' : 'Share Invite'}
            </button>
          </div>
        </div>

        {/* Request Additional Spots */}
        <div className="mb-6">
          <button
            onClick={() => router.push(`/promoter/events/${eventInfo.id}/capacity`)}
            className="w-full bg-gray-100 text-black py-2 rounded-full text-sm hover:bg-gray-200 transition-colors"
          >
            Request additional spots
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setActiveTab('my-list')}
            className={`px-4 py-2 rounded-full text-sm transition-colors ${
              activeTab === 'my-list'
                ? 'bg-black text-white'
                : 'bg-gray-100 text-black hover:bg-gray-200'
            }`}
          >
            My List ({myGuests.length})
          </button>
          <button
            onClick={() => setActiveTab('complete-guestlist')}
            className={`px-4 py-2 rounded-full text-sm transition-colors ${
              activeTab === 'complete-guestlist'
                ? 'bg-black text-white'
                : 'bg-gray-100 text-black hover:bg-gray-200'
            }`}
          >
            Complete Guestlist ({allGuests.length})
          </button>
        </div>

        {/* Filters */}
        <div className="mb-6">
          {/* Status Filter */}
          <div className="flex gap-2 mb-3">
            <button
              onClick={() => setStatusFilter('all')}
              className={`px-3 py-1 rounded-full text-xs transition-colors ${
                statusFilter === 'all'
                  ? 'bg-gray-600 text-white'
                  : 'bg-gray-100 text-black hover:bg-gray-200'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setStatusFilter('pending')}
              className={`px-3 py-1 rounded-full text-xs transition-colors ${
                statusFilter === 'pending'
                  ? 'bg-gray-600 text-white'
                  : 'bg-gray-100 text-black hover:bg-gray-200'
              }`}
            >
              Pending
            </button>
            <button
              onClick={() => setStatusFilter('approved')}
              className={`px-3 py-1 rounded-full text-xs transition-colors ${
                statusFilter === 'approved'
                  ? 'bg-gray-600 text-white'
                  : 'bg-gray-100 text-black hover:bg-gray-200'
              }`}
            >
              Approved
            </button>
            <button
              onClick={() => setStatusFilter('denied')}
              className={`px-3 py-1 rounded-full text-xs transition-colors ${
                statusFilter === 'denied'
                  ? 'bg-gray-600 text-white'
                  : 'bg-gray-100 text-black hover:bg-gray-200'
              }`}
            >
              Denied
            </button>
          </div>

          {/* Person Filter (only for complete guestlist) */}
          {activeTab === 'complete-guestlist' && (
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => setPersonFilter('all')}
                className={`px-3 py-1 rounded-full text-xs transition-colors ${
                  personFilter === 'all'
                    ? 'bg-gray-600 text-white'
                    : 'bg-gray-100 text-black hover:bg-gray-200'
                }`}
              >
                All People
              </button>
              {uniquePeople.map(person => (
                <button
                  key={person}
                  onClick={() => setPersonFilter(person)}
                  className={`px-3 py-1 rounded-full text-xs transition-colors border border-gray-300 ${
                    personFilter === person
                      ? 'bg-gray-600 text-white border-gray-600'
                      : 'bg-white text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {person} ({personCounts[person]})
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Guest List */}
        <div className="space-y-3">
          {filteredGuests.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-lg mb-2">No guests found</h3>
              <p className="text-gray-600">
                {activeTab === 'my-list'
                  ? 'Your approved guests will appear here.'
                  : 'Guests from all contributors will appear here.'}
              </p>
            </div>
          ) : (
            filteredGuests.map(guest => (
              <div key={guest.id} className="bg-white border border-gray-200 rounded-xl p-4">
                <div className="flex items-start justify-between">
                  {/* Guest Info */}
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <h3 className="text-base">{guest.name}</h3>
                        {guest.plusOnes > 0 && <span className="text-base">+{guest.plusOnes}</span>}
                      </div>

                      {/* +/- Controls in top right */}
                      {guest.status === 'pending' && guest.addedBy === 'Alex' && (
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => handleUpdatePlusOnes(guest.id, guest.plusOnes - 1)}
                            className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors text-sm"
                            disabled={guest.plusOnes <= 0}
                          >
                            <span className="leading-none">−</span>
                          </button>
                          <button
                            onClick={() => handleUpdatePlusOnes(guest.id, guest.plusOnes + 1)}
                            className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors text-sm"
                          >
                            <span className="leading-none">+</span>
                          </button>
                        </div>
                      )}
                    </div>

                    {guest.instagram && (
                      <a
                        href={`https://instagram.com/${guest.instagram.replace('@', '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-blue-600 hover:text-blue-800 transition-colors block mb-2"
                      >
                        {guest.instagram}
                      </a>
                    )}

                    {/* Bottom row: Status tags and Added by */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {guest.checkedIn && (
                          <span className="bg-white text-black border border-gray-300 px-2 py-1 rounded-full text-xs">
                            Checked In
                          </span>
                        )}
                        {guest.status === 'approved' && !guest.checkedIn && (
                          <span className="bg-white text-black border border-gray-300 px-2 py-1 rounded-full text-xs">
                            Approved
                          </span>
                        )}
                        {guest.status === 'pending' && (
                          <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-xs">
                            Pending
                          </span>
                        )}
                        {guest.status === 'denied' && (
                          <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-xs">
                            Denied
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        {/* Action buttons for pending guests that belong to promoter */}
                        {guest.status === 'pending' && guest.addedBy === 'Alex' ? (
                          <div className="flex gap-1">
                            <button
                              onClick={() => handleApproveGuest(guest.id)}
                              className="px-2 py-1 bg-black text-white rounded-full text-xs hover:bg-gray-900 transition-colors"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => handleDenyGuest(guest.id)}
                              className="px-2 py-1 bg-white text-black border border-black rounded-full text-xs hover:bg-gray-50 transition-colors"
                            >
                              Deny
                            </button>
                          </div>
                        ) : (
                          /* Added by tag - only show in complete guestlist view when no action buttons */
                          activeTab === 'complete-guestlist' && (
                            <span className="bg-white text-gray-600 border border-gray-300 px-2 py-1 rounded-full text-xs">
                              {guest.addedBy}
                            </span>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

```


## File: `src/app/promoter/login/page.tsx`

```typescript
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { SafeStorage } from '@/lib/utils/safeStorage';

export default function PromoterLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Mock validation for promoter
      if (email === 'promoter@test.com' && password === 'password123') {
        SafeStorage.setItem('promoter_authenticated', 'true');
        SafeStorage.setItem('promoter_email', email);
        router.push('/promoter/dashboard');
      } else {
        setError('Invalid email or password');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-light tracking-tight mb-2">Promoter Login</h1>
          <p className="text-gray-600">Sign in to manage your events</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-800 text-sm">{error}</p>
            </div>
          )}

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black"
              placeholder="promoter@test.com"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black"
              placeholder="password123"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-900 transition-colors disabled:opacity-50"
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">Test credentials: promoter@test.com / password123</p>
        </div>
      </div>
    </div>
  );
}

```


## File: `src/app/staff/dashboard/page.tsx`

```typescript
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface Event {
  id: string;
  name: string;
  date: string;
  djs: string[];
  spotsUsed: number;
  totalSpots: number;
  status: 'upcoming' | 'past';
}

export default function StaffDashboardPage() {
  const [staffName, setStaffName] = useState('');
  const [next7DaysEvents, setNext7DaysEvents] = useState<Event[]>([]);
  const [additionalEvents, setAdditionalEvents] = useState<Event[]>([]);
  const [showMoreEvents, setShowMoreEvents] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [shareEventId, setShareEventId] = useState<string | null>(null);
  const [capacityRequestEventId, setCapacityRequestEventId] = useState<string | null>(null);
  const [requestedCapacity, setRequestedCapacity] = useState(6);
  const [requestReason, setRequestReason] = useState('');
  const router = useRouter();

  useEffect(() => {
    // Simulate API call to get staff data
    setTimeout(() => {
      setStaffName('Alex');

      // Mock next 7 days events
      setNext7DaysEvents([
        {
          id: '1',
          name: 'Saturday Night Sessions',
          date: 'Sat Jul 6',
          djs: ['DJ Marcus', 'MC Groove'],
          spotsUsed: 3,
          totalSpots: 5,
          status: 'upcoming',
        },
        {
          id: '2',
          name: 'Summer Vibes',
          date: 'Fri Jul 12',
          djs: ['DJ Luna'],
          spotsUsed: 5,
          totalSpots: 5,
          status: 'upcoming',
        },
        {
          id: '3',
          name: 'Weekend Warmup',
          date: 'Sat Jul 13',
          djs: ['DJ Beats', 'MC Flow'],
          spotsUsed: 2,
          totalSpots: 5,
          status: 'upcoming',
        },
      ]);

      // Mock additional future events (loaded when "View more" is clicked)
      setAdditionalEvents([
        {
          id: '4',
          name: 'Late Night Sessions',
          date: 'Sat Jul 19',
          djs: ['DJ Shadow'],
          spotsUsed: 0,
          totalSpots: 5,
          status: 'upcoming',
        },
        {
          id: '5',
          name: 'Friday Night Fever',
          date: 'Fri Jul 25',
          djs: ['DJ Electric', 'MC Smooth'],
          spotsUsed: 1,
          totalSpots: 5,
          status: 'upcoming',
        },
      ]);

      setIsLoading(false);
    }, 1000);
  }, []);

  const handleLogout = () => {
    // Handle logout logic
    router.push('/');
  };

  const handleCopyLink = async (event: Event) => {
    const shareUrl = `https://nightlist.app/guest/signup?event=${event.id}&staff=alex`;

    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(shareUrl);
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = shareUrl;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }

      setShareEventId(event.id);
      setTimeout(() => setShareEventId(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleShareEvent = async (event: Event) => {
    const shareUrl = `https://nightlist.app/guest/signup?event=${event.id}&staff=alex`;
    const shareData = {
      title: `Join me at ${event.name}`,
      text: `You're invited to ${event.name} on ${event.date}. Join the guest list!`,
      url: shareUrl,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        return;
      } catch (error) {
        if ((error as Error).name === 'AbortError') {
          return;
        }
      }
    }

    // Fallback to copy if share not available
    handleCopyLink(event);
  };

  const handleCapacityRequest = async (eventId: string) => {
    // Simulate API call to request capacity increase
    console.log(`Requesting ${requestedCapacity} spots for event ${eventId}: ${requestReason}`);

    // Show success state
    setCapacityRequestEventId(null);
    setRequestReason('');
    setRequestedCapacity(6);

    // You could show a toast notification here
    alert('Capacity request sent to manager!');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="p-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-2">
            <p className="text-sm text-gray-600">Nightlist</p>
            <button
              onClick={handleLogout}
              className="text-gray-600 hover:text-black transition-colors text-sm"
            >
              Logout
            </button>
          </div>
          <h1 className="text-3xl font-light tracking-tight mb-1">Hey {staffName}!</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 pb-6">
        {/* Upcoming Events */}
        <div className="mb-8">
          <h2 className="text-xl mb-1">Datcha's Upcoming Events</h2>
          <p className="text-gray-600 mb-4">Invite friends to come by on your next shift</p>
          {next7DaysEvents.length === 0 ? (
            <div className="bg-gray-50 rounded-xl p-8 text-center">
              <h3 className="text-lg mb-2">No upcoming events</h3>
              <p className="text-gray-600">Your next events will appear here</p>
            </div>
          ) : (
            <div className="space-y-4">
              {next7DaysEvents.map(event => (
                <div key={event.id} className="bg-white border border-gray-200 rounded-xl p-8">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-lg">{event.name}</h3>
                    <p className="text-xs text-gray-600">{event.date}</p>
                  </div>

                  {event.djs.length > 0 && (
                    <p className="text-sm text-gray-500 mb-6">With {event.djs.join(', ')}</p>
                  )}

                  {/* Capacity Meter */}
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-600">Your confirmed guest list</span>
                    </div>
                    <div className="relative">
                      <div className="bg-gray-200 rounded-full h-4 relative">
                        <div
                          className="bg-black h-4 rounded-full transition-all duration-300"
                          style={{ width: `${(event.spotsUsed / event.totalSpots) * 100}%` }}
                        ></div>
                        <span className="absolute top-1/2 left-2 -translate-y-1/2 text-white text-[10px]">
                          {event.spotsUsed}
                        </span>
                        <span className="absolute top-1/2 right-2 -translate-y-1/2 text-black text-[10px]">
                          {event.totalSpots}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Share Invite Link */}
                  <div className="mb-6">
                    <p className="text-sm text-gray-600 mb-2">Share invite link:</p>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 relative">
                        <input
                          type="text"
                          value={`https://nightlist.app/guest/signup?event=${event.id}&staff=alex`}
                          readOnly
                          onClick={() => handleCopyLink(event)}
                          className={`w-full bg-gray-100 rounded-full px-4 py-2 text-xs font-mono pr-4 cursor-pointer hover:bg-gray-200 transition-opacity ${
                            shareEventId === event.id ? 'opacity-0' : 'opacity-100'
                          }`}
                        />
                        {shareEventId === event.id && (
                          <div className="absolute inset-0 flex items-center justify-center text-xs text-gray-600 pointer-events-none">
                            Copied!
                          </div>
                        )}
                        <div className="absolute right-1 top-1 bottom-1 w-8 bg-gradient-to-l from-gray-100 via-gray-100/90 to-transparent rounded-r-full pointer-events-none"></div>
                      </div>
                      <button
                        onClick={() => handleCopyLink(event)}
                        className="px-3 py-1.5 bg-white text-black border border-black rounded-full hover:bg-gray-50 transition-colors text-xs"
                      >
                        Copy
                      </button>
                      <button
                        onClick={() => handleShareEvent(event)}
                        className="px-3 py-1.5 bg-black text-white rounded-full hover:bg-gray-900 transition-colors text-xs"
                      >
                        Share
                      </button>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 mb-4">
                    <button
                      onClick={() => router.push(`/staff/events/${event.id}/manage`)}
                      className="flex-1 bg-gray-800 text-white py-2 rounded-full text-xs hover:bg-gray-900 transition-colors leading-tight"
                    >
                      Review Lists
                    </button>
                  </div>

                  {/* Capacity Request Section */}
                  <div className="pt-4">
                    {capacityRequestEventId === event.id ? (
                      <div className="space-y-3">
                        <p className="text-sm text-gray-600">Request additional spots:</p>
                        <div className="flex items-center gap-3">
                          <select
                            value={requestedCapacity}
                            onChange={e => setRequestedCapacity(Number(e.target.value))}
                            className="border border-gray-200 rounded-lg px-3 py-1 text-sm"
                          >
                            {[6, 7, 8, 9, 10].map(num => (
                              <option key={num} value={num}>
                                {num} spots
                              </option>
                            ))}
                          </select>
                          <input
                            type="text"
                            placeholder="Reason (optional)"
                            value={requestReason}
                            onChange={e => setRequestReason(e.target.value)}
                            className="flex-1 border border-gray-200 rounded-lg px-3 py-1 text-sm"
                          />
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleCapacityRequest(event.id)}
                            className="bg-black text-white px-4 py-1 rounded-full text-sm hover:bg-gray-900 transition-colors"
                          >
                            Send Request
                          </button>
                          <button
                            onClick={() => setCapacityRequestEventId(null)}
                            className="bg-gray-100 text-black px-4 py-1 rounded-full text-sm hover:bg-gray-200 transition-colors"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <button
                        onClick={() => setCapacityRequestEventId(event.id)}
                        className="w-full bg-gray-50 border border-gray-300 text-black px-4 py-2 rounded-full text-sm hover:bg-gray-100 transition-colors"
                      >
                        Request Additional Spots
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Additional Events Section */}
        {showMoreEvents && additionalEvents.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl mb-4">More Upcoming Events</h2>
            <div className="space-y-4">
              {additionalEvents.map(event => (
                <div key={event.id} className="bg-white border border-gray-200 rounded-xl p-8">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-lg">{event.name}</h3>
                    <p className="text-xs text-gray-600">{event.date}</p>
                  </div>

                  {event.djs.length > 0 && (
                    <p className="text-sm text-gray-500 mb-6">With {event.djs.join(', ')}</p>
                  )}

                  {/* Capacity Meter */}
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-600">Your confirmed guest list</span>
                    </div>
                    <div className="relative">
                      <div className="bg-gray-200 rounded-full h-4 relative">
                        <div
                          className="bg-black h-4 rounded-full transition-all duration-300"
                          style={{ width: `${(event.spotsUsed / event.totalSpots) * 100}%` }}
                        ></div>
                        <span className="absolute top-1/2 left-2 -translate-y-1/2 text-white text-[10px]">
                          {event.spotsUsed}
                        </span>
                        <span className="absolute top-1/2 right-2 -translate-y-1/2 text-black text-[10px]">
                          {event.totalSpots}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Share Invite Link */}
                  <div className="mb-6">
                    <p className="text-sm text-gray-600 mb-2">Share invite link:</p>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 relative">
                        <input
                          type="text"
                          value={`https://nightlist.app/guest/signup?event=${event.id}&staff=alex`}
                          readOnly
                          onClick={() => handleCopyLink(event)}
                          className={`w-full bg-gray-100 rounded-full px-4 py-2 text-xs font-mono pr-4 cursor-pointer hover:bg-gray-200 transition-opacity ${
                            shareEventId === event.id ? 'opacity-0' : 'opacity-100'
                          }`}
                        />
                        {shareEventId === event.id && (
                          <div className="absolute inset-0 flex items-center justify-center text-xs text-gray-600 pointer-events-none">
                            Copied!
                          </div>
                        )}
                        <div className="absolute right-1 top-1 bottom-1 w-8 bg-gradient-to-l from-gray-100 via-gray-100/90 to-transparent rounded-r-full pointer-events-none"></div>
                      </div>
                      <button
                        onClick={() => handleCopyLink(event)}
                        className="px-3 py-1.5 bg-white text-black border border-black rounded-full hover:bg-gray-50 transition-colors text-xs"
                      >
                        Copy
                      </button>
                      <button
                        onClick={() => handleShareEvent(event)}
                        className="px-3 py-1.5 bg-black text-white rounded-full hover:bg-gray-900 transition-colors text-xs"
                      >
                        Share
                      </button>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 mb-4">
                    <button
                      onClick={() => router.push(`/staff/events/${event.id}/manage`)}
                      className="flex-1 bg-gray-800 text-white py-2 rounded-full text-xs hover:bg-gray-900 transition-colors leading-tight"
                    >
                      Review Lists
                    </button>
                  </div>

                  {/* Capacity Request Section */}
                  <div className="pt-4">
                    {capacityRequestEventId === event.id ? (
                      <div className="space-y-3">
                        <p className="text-sm text-gray-600">Request additional spots:</p>
                        <div className="flex items-center gap-3">
                          <select
                            value={requestedCapacity}
                            onChange={e => setRequestedCapacity(Number(e.target.value))}
                            className="border border-gray-200 rounded-lg px-3 py-1 text-sm"
                          >
                            {[6, 7, 8, 9, 10].map(num => (
                              <option key={num} value={num}>
                                {num} spots
                              </option>
                            ))}
                          </select>
                          <input
                            type="text"
                            placeholder="Reason (optional)"
                            value={requestReason}
                            onChange={e => setRequestReason(e.target.value)}
                            className="flex-1 border border-gray-200 rounded-lg px-3 py-1 text-sm"
                          />
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleCapacityRequest(event.id)}
                            className="bg-black text-white px-4 py-1 rounded-full text-sm hover:bg-gray-900 transition-colors"
                          >
                            Send Request
                          </button>
                          <button
                            onClick={() => setCapacityRequestEventId(null)}
                            className="bg-gray-100 text-black px-4 py-1 rounded-full text-sm hover:bg-gray-200 transition-colors"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <button
                        onClick={() => setCapacityRequestEventId(event.id)}
                        className="w-full bg-gray-50 border border-gray-300 text-black px-4 py-2 rounded-full text-sm hover:bg-gray-100 transition-colors"
                      >
                        Request Additional Spots
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Load More Events Button */}
        {!showMoreEvents && additionalEvents.length > 0 && (
          <div className="text-center">
            <button
              onClick={() => setShowMoreEvents(true)}
              className="bg-gray-100 text-black px-6 py-3 rounded-full text-sm hover:bg-gray-200 transition-colors"
            >
              View more upcoming events
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

```


## File: `src/app/staff/events/[id]/manage/page.tsx`

```typescript
'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';

interface Guest {
  id: string;
  name: string;
  instagram?: string;
  plusOnes: number;
  status: 'approved' | 'pending' | 'denied';
  checkedIn: boolean;
  submittedAt: string;
  addedBy: string;
  addedByType: 'dj' | 'staff' | 'promoter';
}

interface EventInfo {
  id: string;
  name: string;
  date: string;
}

export default function StaffEventManagePage() {
  const params = useParams();
  const router = useRouter();
  const [eventInfo, setEventInfo] = useState<EventInfo | null>(null);
  const [activeTab, setActiveTab] = useState<'my-list' | 'full-event'>('my-list');
  const [myGuests, setMyGuests] = useState<Guest[]>([]);
  const [allGuests, setAllGuests] = useState<Guest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterTab, setFilterTab] = useState<'all' | 'checked-in' | 'pending'>('all');
  const [personFilter, setPersonFilter] = useState<string>('all');

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setEventInfo({
        id: params.id as string,
        name: 'Saturday Night Sessions',
        date: 'Saturday, July 6, 2025',
      });

      // Mock staff member's own guests (auto-approved since staff don't need approval)
      setMyGuests([
        {
          id: '1',
          name: 'Sarah Johnson',
          instagram: '@sarahj',
          plusOnes: 2,
          status: 'approved',
          checkedIn: false,
          submittedAt: '2 hours ago',
          addedBy: 'Alex',
          addedByType: 'staff',
        },
        {
          id: '2',
          name: 'Mike Chen',
          plusOnes: 1,
          status: 'approved',
          checkedIn: true,
          submittedAt: '4 hours ago',
          addedBy: 'Alex',
          addedByType: 'staff',
        },
        {
          id: '3',
          name: 'Emma Wilson',
          instagram: '@emmaw',
          plusOnes: 0,
          status: 'approved',
          checkedIn: false,
          submittedAt: '1 day ago',
          addedBy: 'Alex',
          addedByType: 'staff',
        },
      ]);

      // Mock full event guest list (including other staff, DJs, promoters)
      setAllGuests([
        // Staff guests (including own)
        {
          id: '1',
          name: 'Sarah Johnson',
          instagram: '@sarahj',
          plusOnes: 2,
          status: 'approved',
          checkedIn: false,
          submittedAt: '2 hours ago',
          addedBy: 'Alex',
          addedByType: 'staff',
        },
        {
          id: '2',
          name: 'Mike Chen',
          plusOnes: 1,
          status: 'approved',
          checkedIn: true,
          submittedAt: '4 hours ago',
          addedBy: 'Alex',
          addedByType: 'staff',
        },
        {
          id: '3',
          name: 'Emma Wilson',
          instagram: '@emmaw',
          plusOnes: 0,
          status: 'approved',
          checkedIn: false,
          submittedAt: '1 day ago',
          addedBy: 'Alex',
          addedByType: 'staff',
        },
        // Other staff guests
        {
          id: '4',
          name: 'Lisa Rodriguez',
          instagram: '@lisar',
          plusOnes: 1,
          status: 'approved',
          checkedIn: true,
          submittedAt: '3 hours ago',
          addedBy: 'Jordan',
          addedByType: 'staff',
        },
        // DJ guests
        {
          id: '5',
          name: 'Marcus Torres',
          instagram: '@marcust',
          plusOnes: 3,
          status: 'approved',
          checkedIn: false,
          submittedAt: '1 hour ago',
          addedBy: 'DJ Marcus',
          addedByType: 'dj',
        },
        {
          id: '6',
          name: 'Isabella Garcia',
          plusOnes: 2,
          status: 'pending',
          checkedIn: false,
          submittedAt: '30 minutes ago',
          addedBy: 'DJ Marcus',
          addedByType: 'dj',
        },
        {
          id: '7',
          name: 'Oliver Kim',
          instagram: '@oliverk',
          plusOnes: 1,
          status: 'approved',
          checkedIn: true,
          submittedAt: '5 hours ago',
          addedBy: 'MC Groove',
          addedByType: 'dj',
        },
        // Promoter guests
        {
          id: '8',
          name: 'Sophia Lee',
          instagram: '@sophial',
          plusOnes: 4,
          status: 'approved',
          checkedIn: false,
          submittedAt: '6 hours ago',
          addedBy: 'Taylor',
          addedByType: 'promoter',
        },
      ]);

      setIsLoading(false);
    }, 1000);
  }, [params.id]);

  const handleUpdatePlusOnes = (guestId: string, newPlusOnes: number) => {
    // Update both my guests and all guests arrays
    setMyGuests(prev =>
      prev.map(guest =>
        guest.id === guestId ? { ...guest, plusOnes: Math.max(0, newPlusOnes) } : guest
      )
    );
    setAllGuests(prev =>
      prev.map(guest =>
        guest.id === guestId ? { ...guest, plusOnes: Math.max(0, newPlusOnes) } : guest
      )
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-white text-black border border-gray-300';
      case 'pending':
        return 'bg-gray-200 text-gray-700';
      case 'denied':
        return 'bg-white text-black border border-black';
      default:
        return 'bg-gray-200 text-gray-700';
    }
  };

  const getAddedByColor = (type: string) => {
    switch (type) {
      case 'dj':
        return 'text-blue-600';
      case 'staff':
        return 'text-green-600';
      case 'promoter':
        return 'text-purple-600';
      default:
        return 'text-gray-600';
    }
  };

  const filterGuestsByTab = (guests: Guest[]) => {
    let filtered = guests;

    // Filter by status
    switch (filterTab) {
      case 'checked-in':
        filtered = filtered.filter(guest => guest.checkedIn);
        break;
      case 'pending':
        filtered = filtered.filter(guest => !guest.checkedIn && guest.status === 'approved');
        break;
      default:
        break;
    }

    // Filter by person
    if (personFilter !== 'all') {
      filtered = filtered.filter(guest => guest.addedBy === personFilter);
    }

    return filtered;
  };

  const myGuestCount = myGuests.length;
  const totalGuestCount = allGuests.length;
  const checkedInCount = allGuests.filter(g => g.checkedIn).length;
  const pendingCount = allGuests.filter(g => !g.checkedIn && g.status === 'approved').length;

  // Get unique people who added guests
  const uniquePeople = Array.from(new Set(allGuests.map(g => g.addedBy)));
  const personCounts = uniquePeople.reduce(
    (acc, person) => {
      acc[person] = allGuests.filter(g => g.addedBy === person).length;
      return acc;
    },
    {} as Record<string, number>
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="p-6">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => router.push('/staff/dashboard')}
            className="text-gray-600 hover:text-black transition-colors mb-4 text-sm"
          >
            ← Dashboard
          </button>
          <h1 className="text-2xl font-light mb-2">Guest Lists</h1>
          <p className="text-gray-600">{eventInfo?.name}</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6">
        {/* Tab Navigation */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setActiveTab('my-list')}
            className={`px-4 py-2 rounded-lg text-sm transition-colors ${
              activeTab === 'my-list'
                ? 'bg-gray-600 text-white'
                : 'bg-gray-100 text-black hover:bg-gray-200'
            }`}
          >
            My List ({myGuestCount})
          </button>
          <button
            onClick={() => setActiveTab('full-event')}
            className={`px-4 py-2 rounded-lg text-sm transition-colors ${
              activeTab === 'full-event'
                ? 'bg-gray-600 text-white'
                : 'bg-gray-100 text-black hover:bg-gray-200'
            }`}
          >
            Complete Guestlist ({totalGuestCount})
          </button>
        </div>

        {/* My List Tab */}
        {activeTab === 'my-list' && (
          <div>
            {myGuests.length === 0 ? (
              <div className="bg-gray-50 rounded-xl p-8 text-center">
                <h3 className="text-lg mb-2">No guests yet</h3>
                <p className="text-gray-600">Share your invite link to start building your list</p>
              </div>
            ) : (
              <div className="space-y-3">
                {myGuests.map(guest => (
                  <div key={guest.id} className="bg-white border border-gray-200 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-1">
                      {/* Left side - Guest Info */}
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="text-lg">{guest.name}</h3>
                          {guest.plusOnes > 0 && <span className="text-lg">+{guest.plusOnes}</span>}
                        </div>
                      </div>

                      {/* Right side - Controls */}
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleUpdatePlusOnes(guest.id, guest.plusOnes - 1)}
                          className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors text-sm"
                        >
                          −
                        </button>
                        <button
                          onClick={() => handleUpdatePlusOnes(guest.id, guest.plusOnes + 1)}
                          className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors text-sm"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* Bottom row - Instagram and Tags */}
                    <div className="flex items-center justify-between">
                      <div>
                        {guest.instagram && (
                          <a
                            href={`https://instagram.com/${guest.instagram.replace('@', '')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-blue-600 hover:text-blue-800 transition-colors"
                          >
                            {guest.instagram}
                          </a>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        {guest.checkedIn && (
                          <span className="px-2 py-1 rounded-lg text-xs bg-green-100 text-green-800">
                            Checked in
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Full Event Tab */}
        {activeTab === 'full-event' && (
          <div>
            {/* Person Filter Buttons */}
            <div className="flex gap-2 mb-4 flex-wrap">
              <button
                onClick={() => setPersonFilter('all')}
                className={`px-3 py-1 rounded-lg text-sm transition-colors ${
                  personFilter === 'all'
                    ? 'bg-gray-600 text-white'
                    : 'bg-gray-100 text-black hover:bg-gray-200'
                }`}
              >
                All
              </button>
              {uniquePeople.map(person => (
                <button
                  key={person}
                  onClick={() => setPersonFilter(person)}
                  className={`px-3 py-1 rounded-lg text-sm transition-colors ${
                    personFilter === person
                      ? 'bg-gray-600 text-white'
                      : 'bg-gray-100 text-black hover:bg-gray-200'
                  }`}
                >
                  {person} ({personCounts[person]})
                </button>
              ))}
            </div>

            <div className="space-y-3">
              {filterGuestsByTab(allGuests).map(guest => (
                <div key={guest.id} className="bg-white border border-gray-200 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-1">
                    {/* Left side - Guest Info */}
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg">{guest.name}</h3>
                        {guest.plusOnes > 0 && <span className="text-lg">+{guest.plusOnes}</span>}
                      </div>
                    </div>

                    {/* Right side - Controls (only for staff member's own guests) */}
                    {guest.addedByType === 'staff' && guest.addedBy === 'Alex' && (
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleUpdatePlusOnes(guest.id, guest.plusOnes - 1)}
                          className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors text-sm"
                        >
                          −
                        </button>
                        <button
                          onClick={() => handleUpdatePlusOnes(guest.id, guest.plusOnes + 1)}
                          className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors text-sm"
                        >
                          +
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Bottom row - Instagram and Tags */}
                  <div className="flex items-center justify-between">
                    <div>
                      {guest.instagram && (
                        <a
                          href={`https://instagram.com/${guest.instagram.replace('@', '')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-blue-600 hover:text-blue-800 transition-colors"
                        >
                          {guest.instagram}
                        </a>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      {guest.checkedIn && (
                        <span className="px-2 py-1 rounded-lg text-xs bg-green-100 text-green-800">
                          Checked in
                        </span>
                      )}
                      <span className="px-2 py-1 rounded-full border border-gray-300 text-gray-600 text-xs">
                        Added by: {guest.addedBy}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

```


## File: `src/app/staff/login/page.tsx`

```typescript
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function StaffLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Mock validation - detect user type from credentials
      if (email === 'dj@test.com' && password === 'password123') {
        // DJ credentials
        localStorage.setItem('dj_authenticated', 'true');
        localStorage.setItem('dj_email', email);
        router.push('/dj/dashboard');
      } else if (email === 'staff@test.com' && password === 'password123') {
        // Staff credentials
        localStorage.setItem('staff_authenticated', 'true');
        localStorage.setItem('staff_email', email);
        router.push('/staff/dashboard');
      } else if (email === 'promoter@test.com' && password === 'password123') {
        // Promoter credentials
        localStorage.setItem('promoter_authenticated', 'true');
        localStorage.setItem('promoter_email', email);
        router.push('/promoter/dashboard');
      } else {
        setError('Invalid email or password');
      }
    } catch (error) {
      setError('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="max-w-md w-full mx-auto p-6">
        <div className="text-center mb-8">
          <p className="text-sm text-gray-600 mb-2">Nightlist</p>
          <h1 className="text-2xl font-light mb-2">Login</h1>
          <p className="text-gray-600">Sign in to manage your guest lists</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm text-gray-600 mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-black transition-colors"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm text-gray-600 mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-black transition-colors"
              placeholder="Enter your password"
              required
            />
          </div>

          {error && <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">{error}</div>}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-black text-white py-3 rounded-full text-sm hover:bg-gray-900 transition-colors disabled:bg-gray-400"
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <a
            href="/auth/forgot-password"
            className="text-sm text-gray-600 hover:text-black transition-colors"
          >
            Forgot your password?
          </a>
        </div>

        <div className="mt-8 text-center">
          <p className="text-xs text-gray-500">
            Need help?{' '}
            <a href="/" className="text-black hover:underline">
              Go to main site
            </a>
          </p>
        </div>

        {/* Demo Credentials */}
        <div className="mt-8 p-4 bg-gray-50 rounded-xl">
          <h4 className="text-sm mb-2">Demo Credentials:</h4>
          <div className="space-y-2">
            <div>
              <p className="text-xs text-gray-600">DJ: dj@test.com / password123</p>
            </div>
            <div>
              <p className="text-xs text-gray-600">Staff: staff@test.com / password123</p>
            </div>
            <div>
              <p className="text-xs text-gray-600">Promoter: promoter@test.com / password123</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

```


## File: `src/app/test-db/page.tsx`

```typescript
'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase/client';

export default function TestDBPage() {
  const [result, setResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const testGuestInsert = async () => {
    setIsLoading(true);
    setResult('Testing...');

    try {
      // Test direct insert into guests table
      const { data, error } = await supabase
        .from('guests')
        .insert({
          first_name: 'Test',
          last_name: 'User',
          email: `test-${Date.now()}@example.com`,
          phone: '1234567890',
        })
        .select()
        .single();

      if (error) {
        setResult(`Error: ${error.message}\nDetails: ${JSON.stringify(error, null, 2)}`);
      } else {
        setResult(`Success! Created guest:\n${JSON.stringify(data, null, 2)}`);
      }
    } catch (err) {
      setResult(`Exception: ${err}`);
    } finally {
      setIsLoading(false);
    }
  };

  const testTableExists = async () => {
    setIsLoading(true);
    setResult('Checking tables...');

    try {
      // Test if guests table exists
      const { data, error } = await supabase.from('guests').select('count(*)').limit(1);

      if (error) {
        setResult(
          `Table check error: ${error.message}\nDetails: ${JSON.stringify(error, null, 2)}`
        );
      } else {
        setResult(`Guests table exists! Data: ${JSON.stringify(data, null, 2)}`);
      }
    } catch (err) {
      setResult(`Exception: ${err}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-xl">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-xl">Database Test Page</h1>

        <div className="flex gap-md mb-xl">
          <button onClick={testTableExists} disabled={isLoading} className="btn btn-secondary">
            Test Table Exists
          </button>
          <button onClick={testGuestInsert} disabled={isLoading} className="btn btn-primary">
            Test Guest Insert
          </button>
        </div>

        <div className="bg-gray-100 p-lg rounded-lg">
          <h3 className="font-medium mb-md">Result:</h3>
          <pre className="text-sm whitespace-pre-wrap">{result || 'Click a button to test...'}</pre>
        </div>
      </div>
    </div>
  );
}

```


## File: `src/app/test-qr/page.tsx`

```typescript
'use client';

export default function TestQRPage() {
  // Test guest data that will be encoded in the QR code
  const testGuest = {
    id: '123',
    name: 'Test Guest',
    status: 'vip',
    plus_ones: 2,
    addedBy: 'QR Test',
  };

  // Generate QR code URL using the API
  const qrData = JSON.stringify(testGuest);
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(qrData)}`;

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6">
      <h1 className="text-2xl font-light mb-2">Test QR Code</h1>
      <p className="text-gray-600 mb-8">Scan this with the Nightlist scanner</p>

      <div className="bg-white p-4 rounded-xl shadow-lg">
        <img src={qrUrl} alt="Test QR Code" className="w-72 h-72" />
      </div>

      <div className="mt-8 text-center">
        <p className="text-sm text-gray-600 mb-2">Encoded data:</p>
        <code className="bg-gray-100 px-3 py-1 rounded text-xs">
          {JSON.stringify(testGuest, null, 2)}
        </code>
      </div>

      <div className="mt-8 text-center max-w-md">
        <p className="text-sm text-gray-500">
          Take a photo of this QR code with your phone and show it to the scanner camera to test the
          QR scanning functionality.
        </p>
      </div>
    </div>
  );
}

```


## File: `src/app/unauthorized/page.tsx`

```typescript
import Link from 'next/link';

export default function UnauthorizedPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
        <h1 className="mb-6 text-center text-2xl font-bold text-gray-900">Access Denied</h1>

        <div className="mb-6 rounded-md bg-red-50 p-4 text-sm text-red-700">
          You do not have permission to access this resource.
        </div>

        <div className="text-center">
          <Link
            href="/dashboard"
            className="inline-block rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Return to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}

```


## File: `src/components/debug/DebugPanel.tsx`

```typescript
'use client';

import { useState } from 'react';

interface DebugPanelProps {
  onResetData?: () => void;
  onFillToCapacity?: () => void;
  onGenerateRandomGuests?: () => void;
  onClearStorage?: () => void;
  onToggleLoading?: () => void;
  onSimulateError?: () => void;
}

export default function DebugPanel({
  onResetData,
  onFillToCapacity,
  onGenerateRandomGuests,
  onClearStorage,
  onToggleLoading,
  onSimulateError,
}: DebugPanelProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showStorage, setShowStorage] = useState(false);

  // Only show in development (more flexible check)
  if (process.env.NODE_ENV === 'production') {
    return null;
  }

  const getStorageData = () => {
    const data: Record<string, any> = {};
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && (key.startsWith('dj_') || key.startsWith('guest_') || key.startsWith('event_'))) {
        try {
          data[key] = JSON.parse(localStorage.getItem(key) || '');
        } catch {
          data[key] = localStorage.getItem(key);
        }
      }
    }
    return data;
  };

  const clearAllStorage = () => {
    const keys = Object.keys(localStorage);
    keys.forEach(key => {
      if (key.startsWith('dj_') || key.startsWith('guest_') || key.startsWith('event_')) {
        localStorage.removeItem(key);
      }
    });
    onClearStorage?.();
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <button
          onClick={() => setIsOpen(true)}
          className="bg-red-500 text-white px-3 py-2 rounded-full text-xs hover:bg-red-600 transition-colors"
        >
          🐛 DEBUG
        </button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 bg-white border-2 border-red-500 rounded-xl p-4 shadow-lg max-w-sm">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-medium text-red-600">Debug Panel</h3>
        <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-gray-600">
          ✕
        </button>
      </div>

      <div className="space-y-2">
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={onResetData}
            className="px-2 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600 transition-colors"
          >
            Reset Data
          </button>
          <button
            onClick={onFillToCapacity}
            className="px-2 py-1 bg-orange-500 text-white text-xs rounded hover:bg-orange-600 transition-colors"
          >
            Fill to Capacity
          </button>
          <button
            onClick={onGenerateRandomGuests}
            className="px-2 py-1 bg-green-500 text-white text-xs rounded hover:bg-green-600 transition-colors"
          >
            Add Random Guests
          </button>
          <button
            onClick={onToggleLoading}
            className="px-2 py-1 bg-purple-500 text-white text-xs rounded hover:bg-purple-600 transition-colors"
          >
            Toggle Loading
          </button>
          <button
            onClick={onSimulateError}
            className="px-2 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600 transition-colors"
          >
            Simulate Error
          </button>
          <button
            onClick={clearAllStorage}
            className="px-2 py-1 bg-gray-500 text-white text-xs rounded hover:bg-gray-600 transition-colors"
          >
            Clear Storage
          </button>
        </div>

        <div className="pt-2 border-t border-gray-200">
          <button
            onClick={() => setShowStorage(!showStorage)}
            className="text-xs text-gray-600 hover:text-gray-800"
          >
            {showStorage ? 'Hide' : 'Show'} Storage Data
          </button>
        </div>

        {showStorage && (
          <div className="bg-gray-50 p-2 rounded text-xs max-h-40 overflow-y-auto">
            <pre className="text-xs">{JSON.stringify(getStorageData(), null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  );
}

```


## File: `src/components/ui/ErrorBoundary.tsx`

```typescript
'use client';

import React from 'react';

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    this.props.onError?.(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen bg-white flex items-center justify-center p-6">
          <div className="text-center max-w-md">
            <div className="text-4xl mb-4">😵</div>
            <h1 className="text-xl font-medium mb-2">Something went wrong</h1>
            <p className="text-gray-600 mb-6">
              We encountered an unexpected error. Please refresh the page or try again later.
            </p>
            <div className="space-y-3">
              <button
                onClick={() => window.location.reload()}
                className="w-full bg-black text-white py-3 rounded-xl hover:bg-gray-900 transition-colors"
              >
                Refresh Page
              </button>
              <button
                onClick={() => window.history.back()}
                className="w-full bg-gray-100 text-black py-3 rounded-xl hover:bg-gray-200 transition-colors"
              >
                Go Back
              </button>
            </div>

            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="mt-6 text-left">
                <summary className="cursor-pointer text-sm text-gray-500 hover:text-gray-700">
                  Show error details (dev only)
                </summary>
                <pre className="mt-2 p-3 bg-gray-50 rounded text-xs overflow-auto">
                  {this.state.error.stack}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

```


## File: `src/components/ui/ExplosionAnimation.tsx`

```typescript
'use client';

import { useState, useEffect } from 'react';

interface ExplosionAnimationProps {
  isVisible: boolean;
  onAnimationComplete: () => void;
  approvedNames: string[];
  buttonPosition?: { x: number; y: number };
}

export default function ExplosionAnimation({
  isVisible,
  onAnimationComplete,
  approvedNames,
  buttonPosition = { x: 50, y: 50 }, // Default to center
}: ExplosionAnimationProps) {
  const [animationPhase, setAnimationPhase] = useState<
    'explosion' | 'text' | 'fadeOut' | 'complete'
  >('explosion');

  useEffect(() => {
    if (!isVisible) {
      setAnimationPhase('explosion');
      return;
    }

    // Phase 1: Explosion animation (0.8s)
    const explosionTimer = setTimeout(() => {
      setAnimationPhase('text');
    }, 800);

    // Phase 2: Text display (2.5s)
    const textTimer = setTimeout(() => {
      setAnimationPhase('fadeOut');
    }, 3300);

    // Phase 3: Fade out (0.5s)
    const fadeOutTimer = setTimeout(() => {
      setAnimationPhase('complete');
      onAnimationComplete();
    }, 3800);

    return () => {
      clearTimeout(explosionTimer);
      clearTimeout(textTimer);
      clearTimeout(fadeOutTimer);
    };
  }, [isVisible, onAnimationComplete]);

  if (!isVisible) return null;

  const formatNames = (names: string[]) => {
    if (names.length === 1) return names[0];
    if (names.length === 2) return `${names[0]} and ${names[1]}`;
    if (names.length <= 4) {
      return `${names.slice(0, -1).join(', ')}, and ${names[names.length - 1]}`;
    }
    return `${names.slice(0, 3).join(', ')}, and ${names.length - 3} others`;
  };

  return (
    <div className="fixed inset-0 z-50 pointer-events-none">
      {/* Explosion Phase */}
      {animationPhase === 'explosion' && (
        <div className="absolute inset-0">
          {/* Multiple explosion circles radiating from button position */}
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-black"
              style={{
                left: `${buttonPosition.x}%`,
                top: `${buttonPosition.y}%`,
                transform: 'translate(-50%, -50%)',
                animation: `explode-${i} 0.8s ease-out forwards`,
                animationDelay: `${i * 0.05}s`,
              }}
            />
          ))}

          {/* Screen wipe overlay */}
          <div
            className="absolute inset-0 bg-black"
            style={{
              clipPath: `circle(0% at ${buttonPosition.x}% ${buttonPosition.y}%)`,
              animation: 'screenWipe 0.8s ease-out forwards',
              animationDelay: '0.2s',
            }}
          />
        </div>
      )}

      {/* Text Display Phase */}
      {(animationPhase === 'text' || animationPhase === 'fadeOut') && (
        <div
          className="absolute inset-0 bg-black flex items-center justify-center transition-opacity duration-500"
          style={{
            opacity: animationPhase === 'fadeOut' ? 0 : 1,
          }}
        >
          <div className="text-center text-white max-w-lg px-6">
            <h1
              className="text-3xl font-light mb-4 opacity-0"
              style={{
                animation: 'fadeInUp 0.6s ease-out forwards',
                animationDelay: '0.2s',
              }}
            >
              Approved
            </h1>
            <p
              className="text-lg text-gray-300 opacity-0"
              style={{
                animation: 'fadeInUp 0.6s ease-out forwards',
                animationDelay: '0.4s',
              }}
            >
              {formatNames(approvedNames)}
            </p>

            {/* Decorative particles */}
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-white rounded-full opacity-0"
                style={{
                  left: `${20 + Math.random() * 60}%`,
                  top: `${20 + Math.random() * 60}%`,
                  animation: `particle-float 2s ease-out forwards`,
                  animationDelay: `${0.6 + Math.random() * 0.5}s`,
                }}
              />
            ))}
          </div>
        </div>
      )}

      {/* CSS-in-JS Style injection */}
      <style jsx>{`
        @keyframes explode-0 {
          0% {
            width: 20px;
            height: 20px;
            opacity: 1;
          }
          100% {
            width: 300px;
            height: 300px;
            opacity: 0;
          }
        }
        @keyframes explode-1 {
          0% {
            width: 15px;
            height: 15px;
            opacity: 0.8;
          }
          100% {
            width: 250px;
            height: 250px;
            opacity: 0;
          }
        }
        @keyframes explode-2 {
          0% {
            width: 25px;
            height: 25px;
            opacity: 0.9;
          }
          100% {
            width: 400px;
            height: 400px;
            opacity: 0;
          }
        }
        @keyframes explode-3 {
          0% {
            width: 18px;
            height: 18px;
            opacity: 0.7;
          }
          100% {
            width: 350px;
            height: 350px;
            opacity: 0;
          }
        }
        @keyframes explode-4 {
          0% {
            width: 22px;
            height: 22px;
            opacity: 0.8;
          }
          100% {
            width: 450px;
            height: 450px;
            opacity: 0;
          }
        }
        @keyframes explode-5 {
          0% {
            width: 16px;
            height: 16px;
            opacity: 0.6;
          }
          100% {
            width: 320px;
            height: 320px;
            opacity: 0;
          }
        }
        @keyframes explode-6 {
          0% {
            width: 28px;
            height: 28px;
            opacity: 0.9;
          }
          100% {
            width: 500px;
            height: 500px;
            opacity: 0;
          }
        }
        @keyframes explode-7 {
          0% {
            width: 12px;
            height: 12px;
            opacity: 0.5;
          }
          100% {
            width: 280px;
            height: 280px;
            opacity: 0;
          }
        }

        @keyframes screenWipe {
          0% {
            clip-path: circle(0% at ${buttonPosition.x}% ${buttonPosition.y}%);
          }
          100% {
            clip-path: circle(150% at ${buttonPosition.x}% ${buttonPosition.y}%);
          }
        }

        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(30px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes particle-float {
          0% {
            opacity: 0;
            transform: translateY(0px) scale(0);
          }
          50% {
            opacity: 1;
            transform: translateY(-20px) scale(1);
          }
          100% {
            opacity: 0;
            transform: translateY(-40px) scale(0.5);
          }
        }
      `}</style>
    </div>
  );
}

```


## File: `src/components/ui/Toast.tsx`

```typescript
'use client';

import { useState, useEffect } from 'react';

interface ToastProps {
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  isVisible: boolean;
  onClose: () => void;
  duration?: number;
}

export default function Toast({ message, type, isVisible, onClose, duration = 5000 }: ToastProps) {
  useEffect(() => {
    if (isVisible && duration > 0) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  if (!isVisible) return null;

  const bgColor = {
    success: 'bg-green-50 border-green-200 text-green-800',
    error: 'bg-red-50 border-red-200 text-red-800',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
    info: 'bg-blue-50 border-blue-200 text-blue-800',
  }[type];

  const icon = {
    success: '✓',
    error: '✕',
    warning: '⚠',
    info: 'ℹ',
  }[type];

  return (
    <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-right duration-300">
      <div className={`${bgColor} border rounded-xl px-4 py-3 shadow-lg max-w-sm`}>
        <div className="flex items-center gap-3">
          <span className="text-lg">{icon}</span>
          <p className="text-sm flex-1">{message}</p>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 ml-2">
            ✕
          </button>
        </div>
      </div>
    </div>
  );
}

// Hook for using toast notifications
export function useToast() {
  const [toast, setToast] = useState<{
    message: string;
    type: 'success' | 'error' | 'warning' | 'info';
    isVisible: boolean;
  }>({
    message: '',
    type: 'info',
    isVisible: false,
  });

  const showToast = (message: string, type: 'success' | 'error' | 'warning' | 'info' = 'info') => {
    setToast({ message, type, isVisible: true });
  };

  const hideToast = () => {
    setToast(prev => ({ ...prev, isVisible: false }));
  };

  return {
    toast,
    showToast,
    hideToast,
  };
}

```


## File: `src/components/ui/ToastProvider.tsx`

```typescript
'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import Toast from './Toast';

interface ToastContextType {
  showToast: (message: string, type?: 'success' | 'error' | 'warning' | 'info') => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toast, setToast] = useState<{
    message: string;
    type: 'success' | 'error' | 'warning' | 'info';
    isVisible: boolean;
  }>({
    message: '',
    type: 'info',
    isVisible: false,
  });

  const showToast = (message: string, type: 'success' | 'error' | 'warning' | 'info' = 'info') => {
    setToast({ message, type, isVisible: true });
  };

  const hideToast = () => {
    setToast(prev => ({ ...prev, isVisible: false }));
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={hideToast}
      />
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}

```


## File: `src/lib/auth/auth-options.ts`

```typescript
// Removed bcrypt import for Edge Runtime compatibility
import { NextAuthConfig } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { UserRole } from '@/types/enums';
// Will be used when we integrate with the database
// import prisma from "@/lib/db/prisma";
// Removed bcrypt import for Vercel Edge Runtime compatibility

// Force Node.js runtime instead of Edge Runtime
export const runtime = 'nodejs';

// Type for credentials passed to the authorize function
// Will be used when we integrate with the database
// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface AuthorizeCredentials {
  email: string;
  password: string;
}

type JWTCallbackParams = {
  token: {
    id?: string;
    role?: UserRole;
    email?: string;
  };
  user?: {
    id: string;
    role: UserRole;
    email: string;
    name?: string;
    emailVerified?: Date;
  };
};

type SessionCallbackParams = {
  session: {
    user: {
      id?: string;
      role?: UserRole;
      email?: string;
      name?: string;
    };
  };
  token: {
    id?: string;
    role?: UserRole;
    email?: string;
  };
};

export const authOptions: NextAuthConfig = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials: Record<string, string> | undefined) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          // In production, this would use the actual Prisma client
          // This is a placeholder implementation until Prisma is properly installed
          const mockUsers = [
            {
              id: '1',
              name: 'Admin User',
              email: 'admin@example.com',
              // Plain text for Edge Runtime compatibility
              password: 'password123',
              role: UserRole.MANAGER,
              emailVerified: new Date(),
            },
          ];

          // In production, this would be a real database query
          const user = mockUsers.find(u => u.email === credentials.email);

          if (!user) {
            return null;
          }

          // Simple password comparison for Edge Runtime compatibility
          // In production, we would use proper password hashing not in Edge Runtime
          const passwordMatch = credentials.password === user.password;

          if (!passwordMatch) {
            return null;
          }

          return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            emailVerified: user.emailVerified,
          };
        } catch (error) {
          console.error('Authentication error:', error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: JWTCallbackParams) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }: SessionCallbackParams) {
      if (token) {
        session.user.id = token.id as string;
        session.user.role = token.role as UserRole;
        session.user.email = token.email as string;
      }
      return session;
    },
  },
  pages: {
    signIn: '/auth/login',
    error: '/auth/error',
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === 'development',
};

```


## File: `src/lib/auth/auth.ts`

```typescript
// Bridge between Supabase auth and test expectations
import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { UserRole } from '@/types/enums';

export interface AuthUser {
  id: string;
  name?: string;
  email: string;
  role: UserRole;
}

export interface AuthSession {
  user: AuthUser;
}

/**
 * Server-side authentication function that mimics NextAuth patterns
 * but uses Supabase under the hood. This provides compatibility with
 * existing test expectations.
 */
export async function auth(): Promise<AuthSession | null> {
  try {
    const cookieStore = await cookies();

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return cookieStore.get(name)?.value;
          },
          set(name: string, value: string, options: CookieOptions) {
            cookieStore.set({ name, value, ...options });
          },
          remove(name: string, options: CookieOptions) {
            cookieStore.set({ name, value: '', ...options });
          },
        },
      }
    );

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return null;
    }

    // Get user profile with role information
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('role, first_name, last_name')
      .eq('id', user.id)
      .single();

    if (profileError || !profile) {
      console.error('Auth: Error fetching user profile:', profileError);
      return null;
    }

    // Convert the role from database format to enum format
    // Handle both snake_case and UPPERCASE formats
    let userRole: UserRole;
    const roleString = profile.role?.toString().toUpperCase();

    switch (roleString) {
      case 'OWNER':
        userRole = UserRole.OWNER;
        break;
      case 'MANAGER':
        userRole = UserRole.MANAGER;
        break;
      case 'ASSISTANT_MANAGER':
        userRole = UserRole.ASSISTANT_MANAGER;
        break;
      case 'DOORPERSON':
      case 'DOORMAN': // For backward compatibility
      case 'DOOR_STAFF':
        userRole = UserRole.DOORPERSON;
        break;
      case 'STAFF':
        userRole = UserRole.STAFF;
        break;
      case 'PROMOTER':
        userRole = UserRole.PROMOTER;
        break;
      case 'DJ':
        userRole = UserRole.DJ;
        break;
      case 'VIP':
        userRole = UserRole.VIP;
        break;
      case 'GUEST':
        userRole = UserRole.GUEST;
        break;
      default:
        console.warn(`Auth: Unknown role ${profile.role}, defaulting to GUEST`);
        userRole = UserRole.GUEST;
    }

    const fullName = [profile.first_name, profile.last_name].filter(Boolean).join(' ');

    return {
      user: {
        id: user.id,
        email: user.email || '',
        name: fullName || user.email?.split('@')[0] || 'User',
        role: userRole,
      },
    };
  } catch (error) {
    console.error('Auth: Unexpected error during authentication:', error);
    return null;
  }
}

/**
 * Get the current session for client-side usage
 */
export async function getSession(): Promise<AuthSession | null> {
  return auth();
}

// Types are already exported above

```


## File: `src/lib/auth/guest-auth.ts`

```typescript
import { supabase as supabaseClient } from '@/lib/supabase/client';
import * as bcrypt from 'bcryptjs';

export interface GuestAuthData {
  email: string;
  password?: string;
  googleId?: string;
  guestId: string;
}

export interface GuestSession {
  guestId: string;
  email: string;
  name: string;
  verified: boolean;
}

export class GuestAuthService {
  private supabase = supabaseClient;

  /**
   * Register a new guest with email and password
   */
  async registerWithEmail(
    email: string,
    password: string,
    guestData: {
      firstName: string;
      lastName: string;
      phone?: string;
      instagramHandle?: string;
    }
  ): Promise<{ guest: GuestSession; error?: string }> {
    try {
      // Check if email already exists
      const { data: existingAuth } = await this.supabase
        .from('guest_auth')
        .select('id')
        .eq('email', email)
        .single();

      if (existingAuth) {
        return { guest: null!, error: 'Email already registered' };
      }

      // Create guest record
      const { data: guest, error: guestError } = await this.supabase
        .from('guests')
        .insert({
          first_name: guestData.firstName,
          last_name: guestData.lastName,
          email: email,
          phone: guestData.phone,
          instagram_handle: guestData.instagramHandle,
        })
        .select()
        .single();

      if (guestError) {
        return { guest: null!, error: 'Failed to create guest profile' };
      }

      // Hash password
      const passwordHash = await bcrypt.hash(password, 10);

      // Create auth record
      const { error: authError } = await this.supabase
        .from('guest_auth')
        .insert({
          guest_id: guest.id,
          email: email,
          password_hash: passwordHash,
        })
        .select()
        .single();

      if (authError) {
        // Rollback guest creation
        await this.supabase.from('guests').delete().eq('id', guest.id);
        return { guest: null!, error: 'Failed to create authentication' };
      }

      // Skip email verification for now (TODO: implement proper email service)
      // await this.sendVerificationEmail(email, guest.id);

      return {
        guest: {
          guestId: guest.id,
          email: email,
          name: `${guest.first_name} ${guest.last_name}`,
          verified: false,
        },
      };
    } catch (error) {
      console.error('Guest registration error:', error);
      return { guest: null!, error: 'Registration failed' };
    }
  }

  /**
   * Login with email and password
   */
  async loginWithEmail(
    email: string,
    password: string
  ): Promise<{ guest: GuestSession; error?: string }> {
    try {
      // Get auth record
      const { data: auth, error: authError } = await this.supabase
        .from('guest_auth')
        .select('*, guest:guests(*)')
        .eq('email', email)
        .single();

      if (authError || !auth) {
        return { guest: null!, error: 'Invalid credentials' };
      }

      // Verify password
      const validPassword = await bcrypt.compare(password, auth.password_hash);
      if (!validPassword) {
        return { guest: null!, error: 'Invalid credentials' };
      }

      // Update last login
      await this.supabase
        .from('guest_auth')
        .update({ last_login: new Date().toISOString() })
        .eq('id', auth.id);

      await this.supabase
        .from('guests')
        .update({ last_login: new Date().toISOString() })
        .eq('id', auth.guest_id);

      return {
        guest: {
          guestId: auth.guest_id,
          email: auth.email,
          name: `${auth.guest.first_name} ${auth.guest.last_name}`,
          verified: auth.email_verified,
        },
      };
    } catch (error) {
      console.error('Guest login error:', error);
      return { guest: null!, error: 'Login failed' };
    }
  }

  /**
   * Register/login with Google OAuth
   */
  async authenticateWithGoogle(googleProfile: {
    id: string;
    email: string;
    name: string;
    picture?: string;
  }): Promise<{ guest: GuestSession; error?: string }> {
    try {
      // Check if Google ID exists
      const { data: existingAuth } = await this.supabase
        .from('guest_auth')
        .select('*, guest:guests(*)')
        .eq('google_id', googleProfile.id)
        .single();

      if (existingAuth) {
        // Update last login
        await this.supabase
          .from('guest_auth')
          .update({ last_login: new Date().toISOString() })
          .eq('id', existingAuth.id);

        return {
          guest: {
            guestId: existingAuth.guest_id,
            email: existingAuth.email,
            name: `${existingAuth.guest.first_name} ${existingAuth.guest.last_name}`,
            verified: true, // Google accounts are pre-verified
          },
        };
      }

      // Create new guest
      const nameParts = googleProfile.name.split(' ');
      const firstName = nameParts[0];
      const lastName = nameParts.slice(1).join(' ') || '';

      const { data: guest, error: guestError } = await this.supabase
        .from('guests')
        .insert({
          first_name: firstName,
          last_name: lastName,
          email: googleProfile.email,
          profile_photo_url: googleProfile.picture,
        })
        .select()
        .single();

      if (guestError) {
        return { guest: null!, error: 'Failed to create guest profile' };
      }

      // Create auth record
      const { error: authError } = await this.supabase
        .from('guest_auth')
        .insert({
          guest_id: guest.id,
          email: googleProfile.email,
          google_id: googleProfile.id,
          email_verified: true,
          email_verified_at: new Date().toISOString(),
        })
        .select()
        .single();

      if (authError) {
        // Rollback guest creation
        await this.supabase.from('guests').delete().eq('id', guest.id);
        return { guest: null!, error: 'Failed to create authentication' };
      }

      return {
        guest: {
          guestId: guest.id,
          email: googleProfile.email,
          name: googleProfile.name,
          verified: true,
        },
      };
    } catch (error) {
      console.error('Google auth error:', error);
      return { guest: null!, error: 'Google authentication failed' };
    }
  }

  /**
   * Send password reset email
   */
  async sendPasswordReset(email: string): Promise<{ success: boolean; error?: string }> {
    try {
      const { data: auth } = await this.supabase
        .from('guest_auth')
        .select('id, guest_id')
        .eq('email', email)
        .single();

      if (!auth) {
        return { success: false, error: 'Email not found' };
      }

      // Generate reset token
      const resetToken = this.generateResetToken();
      const expiresAt = new Date();
      expiresAt.setHours(expiresAt.getHours() + 1); // 1 hour expiry

      await this.supabase
        .from('guest_auth')
        .update({
          reset_token: resetToken,
          reset_token_expires: expiresAt.toISOString(),
        })
        .eq('id', auth.id);

      // TODO: Send actual email
      console.log(`Password reset token for ${email}: ${resetToken}`);

      return { success: true };
    } catch (error) {
      console.error('Password reset error:', error);
      return { success: false, error: 'Failed to send reset email' };
    }
  }

  /**
   * Reset password with token
   */
  async resetPassword(
    token: string,
    newPassword: string
  ): Promise<{ success: boolean; error?: string }> {
    try {
      // Find valid token
      const { data: auth } = await this.supabase
        .from('guest_auth')
        .select('id')
        .eq('reset_token', token)
        .gt('reset_token_expires', new Date().toISOString())
        .single();

      if (!auth) {
        return { success: false, error: 'Invalid or expired token' };
      }

      // Hash new password
      const passwordHash = await bcrypt.hash(newPassword, 10);

      // Update password and clear token
      await this.supabase
        .from('guest_auth')
        .update({
          password_hash: passwordHash,
          reset_token: null,
          reset_token_expires: null,
        })
        .eq('id', auth.id);

      return { success: true };
    } catch (error) {
      console.error('Password reset error:', error);
      return { success: false, error: 'Failed to reset password' };
    }
  }

  /**
   * Verify email with token
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async verifyEmail(guestId: string, token: string): Promise<{ success: boolean }> {
    // TODO: Implement email verification with token validation
    try {
      await this.supabase
        .from('guest_auth')
        .update({
          email_verified: true,
          email_verified_at: new Date().toISOString(),
        })
        .eq('guest_id', guestId);

      return { success: true };
    } catch (error) {
      console.error('Email verification error:', error);
      return { success: false };
    }
  }

  /**
   * Get guest session by ID
   */
  async getGuestSession(guestId: string): Promise<GuestSession | null> {
    try {
      const { data: guest } = await this.supabase
        .from('guests')
        .select('*, auth:guest_auth(*)')
        .eq('id', guestId)
        .single();

      if (!guest) {
        return null;
      }

      return {
        guestId: guest.id,
        email: guest.email,
        name: `${guest.first_name} ${guest.last_name}`,
        verified: guest.auth?.email_verified || false,
      };
    } catch (error) {
      console.error('Get guest session error:', error);
      return null;
    }
  }

  /**
   * Check if guest is banned
   */
  async isGuestBanned(
    guestId?: string,
    email?: string,
    phone?: string,
    instagram?: string
  ): Promise<boolean> {
    try {
      const { data: ban } = await this.supabase.rpc('is_guest_banned', {
        p_guest_id: guestId,
        p_email: email,
        p_phone: phone,
        p_instagram: instagram,
      });

      return ban || false;
    } catch (error) {
      console.error('Ban check error:', error);
      return false;
    }
  }

  private generateResetToken(): string {
    return (
      Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
    );
  }

  private async sendVerificationEmail(email: string, guestId: string): Promise<void> {
    // TODO: Implement actual email sending
    const verificationToken = this.generateResetToken();
    console.log(`Verification link for ${email}: /verify?id=${guestId}&token=${verificationToken}`);
  }
}

```


## File: `src/lib/auth/role-utils.ts`

```typescript
import { UserRole } from '@/types/enums';

/**
 * Check if a user has a specific role
 * @param user The user object from the session
 * @param role The role to check
 * @returns boolean indicating if the user has the specified role
 */
export function hasRole(user: { role?: UserRole } | null | undefined, role: UserRole): boolean {
  if (!user || !user.role) {
    return false;
  }
  return user.role === role;
}

/**
 * Check if a user has any of the specified roles
 * @param user The user object from the session
 * @param roles Array of roles to check
 * @returns boolean indicating if the user has any of the specified roles
 */
export function hasAnyRole(
  user: { role?: UserRole } | null | undefined,
  roles: UserRole[]
): boolean {
  if (!user || !user.role || roles.length === 0) {
    return false;
  }
  return roles.includes(user.role);
}

/**
 * Check if a user has all of the specified roles
 * @param user The user object from the session
 * @param roles Array of roles to check
 * @returns boolean indicating if the user has all of the specified roles
 */
export function hasAllRoles(
  user: { role?: UserRole } | null | undefined,
  roles: UserRole[]
): boolean {
  if (!user || !user.role || roles.length === 0) {
    return false;
  }
  // This is a bit redundant since a user can only have one role in our current model,
  // but it's here for future extensibility if we move to a multi-role system
  return roles.every(role => user.role === role);
}

```


## File: `src/lib/db/prisma.ts`

```typescript
/**
 * Prisma client mock for development
 * This will be replaced with a proper Prisma setup once we fully integrate with the database
 */

// Define a simple mock Prisma client
const mockPrismaClient = {
  user: {
    findUnique: () => Promise.resolve(null),
    findMany: () => Promise.resolve([]),
    create: () => Promise.resolve({}),
    update: () => Promise.resolve({}),
    delete: () => Promise.resolve({}),
  },
  // Add other models as needed
};

// For development, we'll use a simple mock
// In production, this would be replaced with a real PrismaClient
const prisma = mockPrismaClient;

// Export the mock client
export default prisma;

```


## File: `src/lib/mock/invitationService.ts`

```typescript
// Mock Invitation Service
// This simulates a real SMS/Email invitation system for development

export interface InvitationRequest {
  guestId: string;
  guestName: string;
  guestPhone: string;
  guestEmail?: string;
  eventId: string;
  eventName: string;
  eventDate: string;
  eventVenue: string;
  message: string;
  djName: string;
}

export interface InvitationResponse {
  id: string;
  guestId: string;
  status: 'sent' | 'failed' | 'pending';
  sentAt: string;
  deliveredAt?: string;
  readAt?: string;
  errorMessage?: string;
}

export interface InvitationAnalytics {
  totalSent: number;
  delivered: number;
  read: number;
  failed: number;
  responses: {
    accepted: number;
    declined: number;
    noResponse: number;
  };
}

// Simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Store invitation history in localStorage
const INVITATION_STORAGE_KEY = 'nightlist_invitations';

export class MockInvitationService {
  // Send a single invitation
  static async sendInvitation(request: InvitationRequest): Promise<InvitationResponse> {
    await delay(Math.random() * 500 + 200); // 200-700ms delay

    // Simulate 90% success rate
    const isSuccess = Math.random() > 0.1;

    const invitation: InvitationResponse = {
      id: `inv_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      guestId: request.guestId,
      status: isSuccess ? 'sent' : 'failed',
      sentAt: new Date().toISOString(),
      errorMessage: isSuccess ? undefined : 'Failed to deliver message',
    };

    // Simulate delivery and read receipts for successful sends
    if (isSuccess) {
      // 95% get delivered
      if (Math.random() > 0.05) {
        invitation.deliveredAt = new Date(Date.now() + Math.random() * 60000).toISOString(); // 0-60s later

        // 70% of delivered get read
        if (Math.random() > 0.3) {
          invitation.readAt = new Date(Date.now() + Math.random() * 300000 + 60000).toISOString(); // 1-6min later
        }
      }
    }

    // Store in localStorage
    this.storeInvitation(request, invitation);

    return invitation;
  }

  // Send multiple invitations
  static async sendBulkInvitations(
    requests: InvitationRequest[],
    onProgress?: (completed: number, total: number) => void
  ): Promise<InvitationResponse[]> {
    const results: InvitationResponse[] = [];

    for (let i = 0; i < requests.length; i++) {
      const result = await this.sendInvitation(requests[i]);
      results.push(result);

      if (onProgress) {
        onProgress(i + 1, requests.length);
      }
    }

    return results;
  }

  // Shorten URLs in message (mock implementation)
  static shortenUrl(longUrl: string): string {
    // Mock URL shortening - in real app, use bit.ly, tinyurl, etc.
    const urlHash = btoa(longUrl).substring(0, 8).replace(/[+/=]/g, '');
    return `https://ntl.st/${urlHash}`;
  }

  // Personalize message by replacing variables
  static personalizeMessage(template: string, variables: Record<string, string>): string {
    let message = template;

    Object.entries(variables).forEach(([key, value]) => {
      const regex = new RegExp(`\\[${key}\\]`, 'g');
      message = message.replace(regex, value);
    });

    // Auto-shorten any URLs in the message
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    message = message.replace(urlRegex, url => this.shortenUrl(url));

    return message;
  }

  // Get invitation history for an event
  static getEventInvitations(eventId: string): InvitationResponse[] {
    const stored = localStorage.getItem(INVITATION_STORAGE_KEY);
    if (!stored) return [];

    const all = JSON.parse(stored);
    return all.filter((inv: any) => inv.request.eventId === eventId);
  }

  // Get invitation analytics for an event
  static getEventAnalytics(eventId: string): InvitationAnalytics {
    const invitations = this.getEventInvitations(eventId);

    const analytics: InvitationAnalytics = {
      totalSent: invitations.length,
      delivered: invitations.filter(inv => inv.deliveredAt).length,
      read: invitations.filter(inv => inv.readAt).length,
      failed: invitations.filter(inv => inv.status === 'failed').length,
      responses: {
        accepted: 0,
        declined: 0,
        noResponse: 0,
      },
    };

    // Simulate response rates for read messages
    invitations.forEach(inv => {
      if (inv.readAt) {
        const rand = Math.random();
        if (rand < 0.6) {
          analytics.responses.accepted++;
        } else if (rand < 0.8) {
          analytics.responses.declined++;
        } else {
          analytics.responses.noResponse++;
        }
      }
    });

    return analytics;
  }

  // Check if guest was already invited to an event
  static wasGuestInvited(guestId: string, eventId: string): boolean {
    const invitations = this.getEventInvitations(eventId);
    return invitations.some(inv => inv.guestId === guestId);
  }

  // Store invitation in localStorage
  private static storeInvitation(request: InvitationRequest, response: InvitationResponse) {
    const stored = localStorage.getItem(INVITATION_STORAGE_KEY);
    const invitations = stored ? JSON.parse(stored) : [];

    invitations.push({
      request,
      response,
      timestamp: new Date().toISOString(),
    });

    // Keep only last 1000 invitations
    if (invitations.length > 1000) {
      invitations.splice(0, invitations.length - 1000);
    }

    localStorage.setItem(INVITATION_STORAGE_KEY, JSON.stringify(invitations));
  }

  // Simulate guest response to invitation
  static async simulateGuestResponse(
    invitationId: string
  ): Promise<'accepted' | 'declined' | 'no_response'> {
    await delay(Math.random() * 2000 + 1000); // 1-3s delay

    const rand = Math.random();
    if (rand < 0.6) return 'accepted';
    if (rand < 0.8) return 'declined';
    return 'no_response';
  }

  // Clear all invitation history (for testing)
  static clearHistory() {
    localStorage.removeItem(INVITATION_STORAGE_KEY);
  }
}

```


## File: `src/lib/supabase/client.ts`

```typescript
import { createClient } from '@supabase/supabase-js';

// Read the Supabase credentials from the environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Create and export the Supabase client with better configuration
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
  global: {
    headers: {
      'User-Agent': 'guestlist-app/1.0',
    },
  },
});

```


## File: `src/lib/types.ts`

```typescript
export enum UserRole {
  OWNER = 'OWNER',
  MANAGER = 'MANAGER',
  ASSISTANT_MANAGER = 'ASSISTANT_MANAGER',
  DOORPERSON = 'DOORPERSON',
  STAFF = 'STAFF',
  PROMOTER = 'PROMOTER',
  DJ = 'DJ',
  VIP = 'VIP',
  GUEST = 'GUEST',
}

// Defines the shape of the user object used in the application
export interface User {
  id: string;
  name?: string | null;
  email?: string | null;
  role: UserRole;
}

// This file can be expanded with other shared types as the application grows.

```


## File: `src/lib/utils/safeStorage.ts`

```typescript
/**
 * Safe localStorage operations with error handling
 */

export class SafeStorage {
  private static isAvailable(): boolean {
    try {
      const test = '__storage_test__';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch {
      return false;
    }
  }

  static getItem(key: string): string | null {
    try {
      if (!this.isAvailable()) {
        console.warn('localStorage is not available');
        return null;
      }
      return localStorage.getItem(key);
    } catch (error) {
      console.error(`Failed to get item from localStorage: ${key}`, error);
      return null;
    }
  }

  static setItem(key: string, value: string): boolean {
    try {
      if (!this.isAvailable()) {
        console.warn('localStorage is not available');
        return false;
      }
      localStorage.setItem(key, value);
      return true;
    } catch (error) {
      console.error(`Failed to set item in localStorage: ${key}`, error);
      return false;
    }
  }

  static removeItem(key: string): boolean {
    try {
      if (!this.isAvailable()) {
        console.warn('localStorage is not available');
        return false;
      }
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error(`Failed to remove item from localStorage: ${key}`, error);
      return false;
    }
  }

  static getJSON<T>(key: string): T | null {
    try {
      const item = this.getItem(key);
      if (item === null) return null;
      return JSON.parse(item) as T;
    } catch (error) {
      console.error(`Failed to parse JSON from localStorage: ${key}`, error);
      return null;
    }
  }

  static setJSON<T>(key: string, value: T): boolean {
    try {
      const jsonString = JSON.stringify(value);
      return this.setItem(key, jsonString);
    } catch (error) {
      console.error(`Failed to stringify JSON for localStorage: ${key}`, error);
      return false;
    }
  }

  static clear(): boolean {
    try {
      if (!this.isAvailable()) {
        console.warn('localStorage is not available');
        return false;
      }
      localStorage.clear();
      return true;
    } catch (error) {
      console.error('Failed to clear localStorage', error);
      return false;
    }
  }
}

/**
 * Hook for using safe localStorage in React components
 */
export function useSafeStorage() {
  return {
    getItem: SafeStorage.getItem,
    setItem: SafeStorage.setItem,
    removeItem: SafeStorage.removeItem,
    getJSON: SafeStorage.getJSON,
    setJSON: SafeStorage.setJSON,
    clear: SafeStorage.clear,
  };
}

```


## File: `src/middleware.ts`

```typescript
// src/middleware.ts
import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { UserRole } from './types/enums';

// Define public paths that should always be accessible
const publicPaths = [
  '/',
  '/auth/login',
  '/auth/register',
  '/auth/forgot-password',
  '/auth/confirm',
  '/auth/error',
  '/auth/update-password',
  '/doorperson/login',
  '/doorperson/scanner',
  '/doorperson/search',
  '/doorperson/checkin',
];

// Temporarily disable middleware to debug database connection issues
const DISABLE_MIDDLEWARE = true;

// Define protected routes and the roles required to access them
// Expand this configuration based on your application's needs.
const protectedRoutesConfig: Record<string, UserRole[]> = {
  // Example: Only managers can access /admin and its sub-paths
  '/admin': [UserRole.MANAGER],
  // Dashboard is accessible to all authenticated users
  // '/dashboard': [UserRole.MANAGER], // Commented out to allow all roles
  // Add other role-specific routes here, e.g.:
  // '/dj-tools': [UserRole.DJ, UserRole.MANAGER], // DJs and Managers can access
};

export async function middleware(request: NextRequest) {
  // Temporarily disable middleware to test login issue
  if (DISABLE_MIDDLEWARE) {
    console.log('Middleware disabled, allowing all access to:', request.nextUrl.pathname);
    return NextResponse.next();
  }

  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({ name, value, ...options });
          response = NextResponse.next({ request: { headers: request.headers } });
          response.cookies.set({ name, value, ...options });
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({ name, value: '', ...options });
          response = NextResponse.next({ request: { headers: request.headers } });
          response.cookies.set({ name, value: '', ...options });
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { pathname } = request.nextUrl;

  // Allow access to public paths without further checks if they are explicitly listed
  if (publicPaths.includes(pathname)) {
    // If user is logged in and trying to access root, redirect to dashboard
    if (pathname === '/' && user) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
    return response; // Allow access to public paths
  }

  // If no user and trying to access a non-public path, redirect to login
  if (!user) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = '/auth/login';
    redirectUrl.searchParams.set(`redirectedFrom`, pathname);
    return NextResponse.redirect(redirectUrl);
  }

  // User is authenticated. If they are on the root path, redirect to dashboard.
  if (pathname === '/') {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // Only check profiles for routes that actually need role-based protection
  let userRole = UserRole.GUEST;

  // Check if this path actually needs role-based protection
  const needsRoleCheck = Object.keys(protectedRoutesConfig).some(routePrefix =>
    pathname.startsWith(routePrefix)
  );

  if (needsRoleCheck) {
    // Only do the database lookup if we actually need to check roles
    try {
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();

      console.log('Profile lookup result:', {
        userId: user.id,
        profile,
        error: profileError?.message,
        hasProfile: !!profile,
      });

      if (profile && !profileError) {
        userRole = profile.role as UserRole;
        console.log('User role set to:', userRole);
      } else {
        console.warn('Profile lookup failed:', profileError?.message);
        userRole = UserRole.GUEST;
      }
    } catch (dbError) {
      console.error('Database connection error:', dbError);
      userRole = UserRole.GUEST;
    }
  }

  // Check if the current path matches any configured protected route prefix
  for (const routePrefix in protectedRoutesConfig) {
    if (pathname.startsWith(routePrefix)) {
      const requiredRoles = protectedRoutesConfig[routePrefix];
      if (!requiredRoles.includes(userRole)) {
        // User does not have the required role for this specific route
        // Redirect to a general dashboard or an unauthorized page
        // Adding a query param can help the target page display a message
        return NextResponse.redirect(new URL('/dashboard?error=unauthorized_access', request.url));
      }
      // User has the required role for this specific route, allow access
      return response;
    }
  }

  // If the path is not public, not specifically role-restricted (or user has access),
  // and the user is logged in, allow access. This covers general authenticated areas like /dashboard.
  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - api/ (API routes)
     * - auth/ (authentication routes, handled by publicPaths or user status)
     *   (Note: /auth/ routes are implicitly handled by the publicPaths logic and user status checks.
     *    If a user is logged in and tries /auth/login, they should be redirected to dashboard.
     *    If not logged in, /auth/login should be accessible. This logic is above.)
     */
    '/((?!_next/static|_next/image|favicon.ico|api/).*)',
  ],
};

```


## File: `src/styles/design-system.css`

```css
/* Modern Minimal Design System for Guest List App */

:root {
  /* Typography */
  --font-primary:
    -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell',
    sans-serif;
  --font-weight-light: 300;
  --font-weight-normal: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;

  /* Colors - Black & White System */
  --color-black: #000000;
  --color-white: #ffffff;
  --color-gray-50: #fafafa;
  --color-gray-100: #f5f5f5;
  --color-gray-200: #e5e5e5;
  --color-gray-300: #d4d4d4;
  --color-gray-400: #a3a3a3;
  --color-gray-500: #737373;
  --color-gray-600: #525252;
  --color-gray-700: #404040;
  --color-gray-800: #262626;
  --color-gray-900: #171717;

  /* Spacing - Generous for airy feel */
  --space-xs: 0.5rem; /* 8px */
  --space-sm: 0.75rem; /* 12px */
  --space-md: 1rem; /* 16px */
  --space-lg: 1.5rem; /* 24px */
  --space-xl: 2rem; /* 32px */
  --space-2xl: 2.5rem; /* 40px */
  --space-3xl: 3rem; /* 48px */
  --space-4xl: 4rem; /* 64px */
  --space-5xl: 5rem; /* 80px */
  --space-6xl: 6rem; /* 96px */

  /* Border radius */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;
  --radius-2xl: 20px;
  --radius-full: 9999px;

  /* Shadows - Subtle for minimal design */
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);

  /* Transitions */
  --transition-fast: 150ms ease-in-out;
  --transition-normal: 250ms ease-in-out;
  --transition-slow: 350ms ease-in-out;
}

/* Base styles */
* {
  box-sizing: border-box;
}

body {
  font-family: var(--font-primary);
  font-weight: var(--font-weight-normal);
  color: var(--color-black);
  background-color: var(--color-white);
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Typography Scale */
.text-xs {
  font-size: 0.75rem;
  line-height: 1rem;
}
.text-sm {
  font-size: 0.875rem;
  line-height: 1.25rem;
}
.text-base {
  font-size: 1rem;
  line-height: 1.5rem;
}
.text-lg {
  font-size: 1.125rem;
  line-height: 1.75rem;
}
.text-xl {
  font-size: 1.25rem;
  line-height: 1.75rem;
}
.text-2xl {
  font-size: 1.5rem;
  line-height: 2rem;
}
.text-3xl {
  font-size: 1.875rem;
  line-height: 2.25rem;
}
.text-4xl {
  font-size: 2.25rem;
  line-height: 2.5rem;
}
.text-5xl {
  font-size: 3rem;
  line-height: 1;
}

/* Font weights */
.font-light {
  font-weight: var(--font-weight-light);
}
.font-normal {
  font-weight: var(--font-weight-normal);
}
.font-medium {
  font-weight: var(--font-weight-medium);
}
.font-semibold {
  font-weight: var(--font-weight-semibold);
}

/* Button System - Rounded, minimal */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-sm);
  padding: var(--space-lg) var(--space-2xl);
  border: none;
  border-radius: var(--radius-lg);
  font-family: inherit;
  font-size: var(--text-base);
  font-weight: var(--font-weight-medium);
  text-decoration: none;
  cursor: pointer;
  transition: all var(--transition-normal);
  white-space: nowrap;
  user-select: none;
  min-height: 48px; /* Touch-friendly */
}

.btn:focus {
  outline: 2px solid var(--color-black);
  outline-offset: 2px;
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Primary button - Black */
.btn-primary {
  background-color: var(--color-black);
  color: var(--color-white);
}

.btn-primary:hover:not(:disabled) {
  background-color: var(--color-gray-800);
  transform: translateY(-1px);
  box-shadow: var(--shadow-lg);
}

.btn-primary:active {
  transform: translateY(0);
}

/* Secondary button - White with black border */
.btn-secondary {
  background-color: var(--color-white);
  color: var(--color-black);
  border: 1px solid var(--color-black);
}

.btn-secondary:hover:not(:disabled) {
  background-color: var(--color-gray-50);
  transform: translateY(-1px);
  box-shadow: var(--shadow-lg);
}

/* Ghost button - Minimal */
.btn-ghost {
  background-color: transparent;
  color: var(--color-black);
  padding: var(--space-md) var(--space-lg);
}

.btn-ghost:hover:not(:disabled) {
  background-color: var(--color-gray-100);
}

/* Button sizes */
.btn-sm {
  padding: var(--space-md) var(--space-lg);
  font-size: var(--text-sm);
  min-height: 36px;
}

.btn-lg {
  padding: var(--space-xl) var(--space-3xl);
  font-size: var(--text-lg);
  min-height: 56px;
}

/* Input System */
.input {
  width: 100%;
  padding: var(--space-lg) var(--space-xl);
  border: 1px solid var(--color-gray-300);
  border-radius: var(--radius-lg);
  font-family: inherit;
  font-size: var(--text-base);
  background-color: var(--color-white);
  transition: all var(--transition-normal);
  min-height: 48px;
}

.input:focus {
  outline: none;
  border-color: var(--color-black);
  box-shadow: 0 0 0 3px rgb(0 0 0 / 0.1);
}

.input::placeholder {
  color: var(--color-gray-400);
}

.input:disabled {
  background-color: var(--color-gray-50);
  color: var(--color-gray-400);
  cursor: not-allowed;
}

/* Form group */
.form-group {
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
}

.form-label {
  font-size: var(--text-sm);
  font-weight: var(--font-weight-normal);
  color: var(--color-black);
}

/* Card system */
.card {
  background-color: var(--color-white);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--color-gray-200);
  overflow: hidden;
  transition: all var(--transition-normal);
}

.card:hover {
  box-shadow: var(--shadow-md);
  transform: translateY(-2px);
}

.card-body {
  padding: var(--space-2xl);
}

.card-header {
  padding: var(--space-2xl) var(--space-2xl) var(--space-lg);
  border-bottom: 1px solid var(--color-gray-200);
}

/* Layout utilities */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--space-xl);
}

.container-sm {
  max-width: 640px;
  margin: 0 auto;
  padding: 0 var(--space-xl);
}

.flex {
  display: flex;
}

.flex-col {
  flex-direction: column;
}

.items-center {
  align-items: center;
}

.justify-center {
  justify-content: center;
}

.justify-between {
  justify-content: space-between;
}

.gap-xs {
  gap: var(--space-xs);
}
.gap-sm {
  gap: var(--space-sm);
}
.gap-md {
  gap: var(--space-md);
}
.gap-lg {
  gap: var(--space-lg);
}
.gap-xl {
  gap: var(--space-xl);
}
.gap-2xl {
  gap: var(--space-2xl);
}
.gap-3xl {
  gap: var(--space-3xl);
}

/* Spacing utilities */
.p-xs {
  padding: var(--space-xs);
}
.p-sm {
  padding: var(--space-sm);
}
.p-md {
  padding: var(--space-md);
}
.p-lg {
  padding: var(--space-lg);
}
.p-xl {
  padding: var(--space-xl);
}
.p-2xl {
  padding: var(--space-2xl);
}
.p-3xl {
  padding: var(--space-3xl);
}
.p-4xl {
  padding: var(--space-4xl);
}
.p-5xl {
  padding: var(--space-5xl);
}
.p-6xl {
  padding: var(--space-6xl);
}

.py-xs {
  padding-top: var(--space-xs);
  padding-bottom: var(--space-xs);
}
.py-sm {
  padding-top: var(--space-sm);
  padding-bottom: var(--space-sm);
}
.py-md {
  padding-top: var(--space-md);
  padding-bottom: var(--space-md);
}
.py-lg {
  padding-top: var(--space-lg);
  padding-bottom: var(--space-lg);
}
.py-xl {
  padding-top: var(--space-xl);
  padding-bottom: var(--space-xl);
}
.py-2xl {
  padding-top: var(--space-2xl);
  padding-bottom: var(--space-2xl);
}
.py-3xl {
  padding-top: var(--space-3xl);
  padding-bottom: var(--space-3xl);
}
.py-4xl {
  padding-top: var(--space-4xl);
  padding-bottom: var(--space-4xl);
}
.py-5xl {
  padding-top: var(--space-5xl);
  padding-bottom: var(--space-5xl);
}
.py-6xl {
  padding-top: var(--space-6xl);
  padding-bottom: var(--space-6xl);
}

.px-xs {
  padding-left: var(--space-xs);
  padding-right: var(--space-xs);
}
.px-sm {
  padding-left: var(--space-sm);
  padding-right: var(--space-sm);
}
.px-md {
  padding-left: var(--space-md);
  padding-right: var(--space-md);
}
.px-lg {
  padding-left: var(--space-lg);
  padding-right: var(--space-lg);
}
.px-xl {
  padding-left: var(--space-xl);
  padding-right: var(--space-xl);
}
.px-2xl {
  padding-left: var(--space-2xl);
  padding-right: var(--space-2xl);
}
.px-3xl {
  padding-left: var(--space-3xl);
  padding-right: var(--space-3xl);
}

.m-xs {
  margin: var(--space-xs);
}
.m-sm {
  margin: var(--space-sm);
}
.m-md {
  margin: var(--space-md);
}
.m-lg {
  margin: var(--space-lg);
}
.m-xl {
  margin: var(--space-xl);
}
.m-2xl {
  margin: var(--space-2xl);
}
.m-3xl {
  margin: var(--space-3xl);
}
.m-4xl {
  margin: var(--space-4xl);
}
.m-5xl {
  margin: var(--space-5xl);
}
.m-6xl {
  margin: var(--space-6xl);
}

.my-xs {
  margin-top: var(--space-xs);
  margin-bottom: var(--space-xs);
}
.my-sm {
  margin-top: var(--space-sm);
  margin-bottom: var(--space-sm);
}
.my-md {
  margin-top: var(--space-md);
  margin-bottom: var(--space-md);
}
.my-lg {
  margin-top: var(--space-lg);
  margin-bottom: var(--space-lg);
}
.my-xl {
  margin-top: var(--space-xl);
  margin-bottom: var(--space-xl);
}
.my-2xl {
  margin-top: var(--space-2xl);
  margin-bottom: var(--space-2xl);
}
.my-3xl {
  margin-top: var(--space-3xl);
  margin-bottom: var(--space-3xl);
}
.my-4xl {
  margin-top: var(--space-4xl);
  margin-bottom: var(--space-4xl);
}
.my-5xl {
  margin-top: var(--space-5xl);
  margin-bottom: var(--space-5xl);
}
.my-6xl {
  margin-top: var(--space-6xl);
  margin-bottom: var(--space-6xl);
}

/* Text alignment */
.text-left {
  text-align: left;
}
.text-center {
  text-align: center;
}
.text-right {
  text-align: right;
}

/* Width utilities */
.w-full {
  width: 100%;
}
.max-w-xs {
  max-width: 320px;
}
.max-w-sm {
  max-width: 384px;
}
.max-w-md {
  max-width: 448px;
}
.max-w-lg {
  max-width: 512px;
}
.max-w-xl {
  max-width: 576px;
}
.max-w-2xl {
  max-width: 672px;
}

/* Height utilities */
.h-screen {
  height: 100vh;
}
.min-h-screen {
  min-height: 100vh;
}

/* Special components */
.page-header {
  padding: var(--space-6xl) 0 var(--space-4xl);
  text-align: center;
}

.page-header h1 {
  font-size: 2.5rem;
  font-weight: var(--font-weight-light);
  margin-bottom: var(--space-lg);
  letter-spacing: -0.025em;
}

.page-header p {
  font-size: var(--text-lg);
  color: var(--color-gray-600);
  max-width: 600px;
  margin: 0 auto;
}

/* Responsive design */
@media (max-width: 768px) {
  .container {
    padding: 0 var(--space-lg);
  }

  .container-sm {
    padding: 0 var(--space-lg);
  }

  .page-header {
    padding: var(--space-4xl) 0 var(--space-3xl);
  }

  .page-header h1 {
    font-size: 2rem;
  }

  .btn {
    padding: var(--space-lg) var(--space-xl);
  }

  .btn-lg {
    padding: var(--space-xl) var(--space-2xl);
  }
}

```


## File: `src/types/database.ts`

```typescript
import { UserRole } from './enums';

export interface Profile {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  role: UserRole;
  given_name?: string;
  stage_name?: string;
  instagram_handle?: string;
  phone?: string;
  manager_permissions?: Record<string, unknown>;
  vip_qr_code?: string;
  vip_max_plus_ones?: number;
  account_status: 'active' | 'suspended' | 'inactive';
  invited_by_user_id?: string;
  default_capacity?: number;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface Guest {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  instagram_handle?: string;
  guest_tier: 'regular' | 'micro_promoter' | 'vip' | 'blocked';
  total_events_attended: number;
  conversion_rate: number;
  last_attended_date?: string;
  vip_status_granted_by?: string;
  vip_status_granted_at?: string;
  monthly_invite_allowance: number;
  profile_photo_url?: string;
  date_of_birth?: string;
  marketing_consent: boolean;
  last_login?: string;
  created_at: string;
  updated_at: string;
}

export interface GuestAuth {
  id: string;
  guest_id: string;
  email: string;
  password_hash?: string;
  google_id?: string;
  email_verified: boolean;
  email_verified_at?: string;
  last_login?: string;
  reset_token?: string;
  reset_token_expires?: string;
  created_at: string;
  updated_at: string;
}

export interface Ban {
  id: string;
  guest_id?: string;
  banned_email?: string;
  banned_phone?: string;
  banned_instagram?: string;
  banned_name?: string;
  reason: string;
  duration_type: 'days' | 'months' | 'years' | 'permanent';
  duration_value?: number;
  expires_at?: string;
  banned_by_user_id: string;
  ban_lifted_by_user_id?: string;
  ban_lifted_at?: string;
  ban_lifted_reason?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface CapacityRequest {
  id: string;
  requester_id: string;
  event_id: string;
  guest_list_id?: string;
  current_limit: number;
  requested_limit: number;
  reason?: string;
  status: 'pending' | 'approved' | 'denied';
  approved_by_user_id?: string;
  approved_at?: string;
  denial_reason?: string;
  created_at: string;
  updated_at: string;
}

export interface VenueSettings {
  id: string;
  venue_id: string;
  default_event_capacity: number;
  default_staff_capacity: number;
  default_promoter_capacity: number;
  default_dj_capacity: number;
  default_max_plus_ones: number;
  operating_schedule: OperatingDay[];
  approval_warning_time: string; // HH:MM:SS format
  approval_warning_threshold: number; // percentage
  timezone: string;
  created_at: string;
  updated_at: string;
}

export interface OperatingDay {
  day: 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';
  is_open: boolean;
  open_time?: string; // HH:MM format
  close_time?: string; // HH:MM format
}

export interface Event {
  id: string;
  name: string;
  date: string;
  day_of_week: string;
  venue_id: string;
  status: 'active' | 'cancelled' | 'completed' | 'under_promoted';
  max_total_capacity: number;
  created_by_user_id: string;
  lightspeed_event_id?: string;
  predicted_attendance?: number;
  actual_attendance?: number;
  total_bar_sales?: number;
  total_door_sales?: number;
  paid_covers_count?: number;
  promotional_photos: string[];
  event_flyers: string[];
  created_at: string;
  updated_at: string;
}

export interface EventDjAssignment {
  id: string;
  event_id: string;
  dj_user_id: string;
  invitation_sent_at?: string;
  invitation_status: 'pending' | 'accepted' | 'declined';
  is_returning_dj: boolean;
  display_order?: number;
  individual_capacity?: number;
  created_at: string;
  updated_at: string;
}

export interface GuestList {
  id: string;
  event_id: string;
  created_by_user_id: string;
  list_type: 'dj_list' | 'staff_list' | 'vip_list' | 'promoter_list';
  name: string;
  max_capacity: number;
  max_plus_size: number;
  current_capacity: number;
  list_deadline?: string;
  approval_deadline?: string;
  status: 'active' | 'cancelled' | 'completed';
  conversion_rate: number;
  created_at: string;
  updated_at: string;
}

export interface GuestListEntry {
  id: string;
  guest_list_id: string;
  guest_id: string;
  status: 'pending' | 'approved' | 'denied';
  plus_ones_requested: number;
  plus_ones_checked_in: number;
  qr_code?: string;
  qr_code_used: boolean;
  checked_in_at?: string;
  checked_in_by_user_id?: string;
  approved_by_user_id?: string;
  approved_at?: string;
  created_at: string;
  updated_at: string;
}

// Utility types for forms and API responses
export interface CreateBanRequest {
  guest_id?: string;
  banned_email?: string;
  banned_phone?: string;
  banned_instagram?: string;
  banned_name?: string;
  reason: string;
  duration_type: 'days' | 'months' | 'years' | 'permanent';
  duration_value?: number;
}

export interface CreateCapacityRequest {
  event_id: string;
  guest_list_id?: string;
  requested_limit: number;
  reason?: string;
}

export interface CreateEventRequest {
  name: string;
  date: string;
  max_total_capacity?: number;
  djs: Array<{
    user_id?: string; // Existing DJ
    dj_name?: string; // New DJ name
    given_name?: string; // New DJ real name
    email?: string; // New DJ email
    invite_link?: string; // Generated invite link for new DJ
    individual_capacity?: number;
  }>;
  capacity_distribution: 'shared' | 'individual';
}

export interface GuestSignupRequest {
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  instagram_handle?: string;
  plus_ones_requested: number;
  guest_list_id: string;
  privacy_consent: boolean;
  marketing_consent?: boolean;
}

export interface InviteUserRequest {
  email?: string;
  phone?: string;
  role: UserRole;
  first_name?: string;
  last_name?: string;
  stage_name?: string; // For DJs
  default_capacity?: number;
  event_id?: string; // For DJ invitations
}

```


## File: `src/types/enums.ts`

```typescript
// Enum definitions that match the database schema
// These are defined here to avoid relying on the Prisma client before it's installed

export enum UserRole {
  OWNER = 'OWNER',
  MANAGER = 'MANAGER',
  ASSISTANT_MANAGER = 'ASSISTANT_MANAGER',
  DOORPERSON = 'DOORPERSON',
  STAFF = 'STAFF',
  PROMOTER = 'PROMOTER',
  DJ = 'DJ',
  VIP = 'VIP',
  GUEST = 'GUEST',
}

export enum EntryStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  DENIED = 'DENIED',
  CHECKED_IN = 'CHECKED_IN',
  NO_SHOW = 'NO_SHOW',
}

```


## File: `src/types/next-auth-modules.d.ts`

```typescript
// Type declarations for NextAuth modules
/* eslint-disable @typescript-eslint/no-explicit-any */
declare module 'next-auth' {
  export interface NextAuthConfig {
    providers: any[];
    callbacks?: {
      jwt?: (params: { token: any; user: any }) => Promise<any>;
      session?: (params: { session: any; token: any }) => Promise<any>;
    };
    pages?: {
      signIn?: string;
      error?: string;
    };
    session?: {
      strategy?: 'jwt' | 'database';
      maxAge?: number;
    };
    secret?: string;
    debug?: boolean;
  }
}

declare module 'next-auth/providers/credentials' {
  export default function Credentials(options: {
    name: string;
    credentials: Record<string, { label: string; type: string }>;
    authorize: (credentials: Record<string, string>) => Promise<any | null>;
  }): any;
}

// Removed bcrypt module declaration for Vercel Edge Runtime compatibility

```


## File: `src/types/next-auth.d.ts`

```typescript
import { DefaultSession, DefaultUser } from 'next-auth';
import { UserRole } from '@/types/enums';

// Extend the built-in session types
declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      role: UserRole;
    } & DefaultSession['user'];
  }

  // Extend the built-in user types
  interface User extends DefaultUser {
    id: string;
    role: UserRole;
    emailVerified?: Date | null;
  }
}

```


## File: `src/types/prisma.d.ts`

```typescript
// This is a temporary type declaration file for Prisma
// It will be replaced when Prisma is properly installed

declare module '@prisma/client' {
  export class PrismaClient {
    constructor(options?: {
      log?: Array<'query' | 'info' | 'warn' | 'error'>;
      datasources?: {
        db: {
          url: string;
        };
      };
    });
  }
}

```


## File: `src/types/user.ts`

```typescript
// src/types/user.ts
import { UserRole } from './enums';

export interface UserProfile {
  id: string; // Corresponds to Supabase auth.users.id
  email?: string; // Corresponds to Supabase auth.users.email
  role: UserRole;
  firstName?: string;
  lastName?: string;
  // Add other profile-specific fields here as needed
}

// Re-export UserRole for backward compatibility
export { UserRole };

```


## File: `src/utils/supabase/client.ts`

```typescript
// src/utils/supabase/client.ts
import { createBrowserClient } from '@supabase/ssr';

export function createClient() {
  // Create a supabase client on the browser with project's credentials
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

```

## Documentation


## File: `Frontend-Design-Specs.md`

```markdown
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
  url: 'https://invite-link',
});
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

## USER EXPERIENCE PATTERNS & REFINEMENTS

### Guest Card Layout (DJ/Promoter Management Pages)

**Compact Card Design:**

- **Line 1**: Name and +N count on left, +/- adjustment buttons on right
  - Example: `Sarah Johnson +2` [−][+]
  - +/- buttons only show for pending guests that belong to the current user
  - Buttons: `w-6 h-6 rounded-full border border-gray-300`
- **Line 2**: Instagram handle (if present) as blue clickable link
- **Line 3**: Status badge on left, action buttons on right (same line)
  - Status badge: "Pending", "Approved", "Checked In", or "Denied"
  - Action buttons (for pending guests): [Deny] [Approve]
- **No extra vertical spacing** - cards should be compact and scannable

**"Added By" Tag Rules:**

- **Never show** when viewing "My List" (redundant - all guests belong to user)
- **Never show** when Approve/Deny buttons are present (redundant - implies ownership)
- **Only show** in "Complete Guestlist" view for guests NOT belonging to current user

### Button Text Sizing - Adaptive

**Dynamic font sizing to prevent wrapping:**

- Default button text: `text-sm`
- If button text wraps to multiple lines: automatically use `text-xs` with `leading-tight`
- Examples:
  - "Request additional spots" → `text-xs leading-tight`
  - "Review pending guests" → `text-xs leading-tight`
- Keep one-word buttons at `text-sm` ("Copy", "Share", "Approve", etc.)

### Link Sharing Interface

**Copy vs Share distinction:**

- **"Copy" button**: Only copies to clipboard (no Web Share API)
  - Button text: "Copy" (not "Link")
  - Action: Direct clipboard copy with fallback for mobile Safari
- **"Share" button**: Triggers native share sheet
  - Uses Web Share API if available
  - Falls back to copy if not available
- **Link input field**:
  - Clicking the input field itself should copy the link (acts as secondary copy button)
  - Add `cursor-pointer hover:bg-gray-200` to indicate clickability

**Copy feedback animation:**

- When link is copied, link text should **completely disappear** (`opacity-0`)
- "Copied!" message should appear **centered** in the input field
- Use `transition-opacity` for smooth fade
- Auto-dismiss after 2 seconds
- Position: `absolute inset-0 flex items-center justify-center`

### Capacity Meter Label Positioning

**"Pending" label collision avoidance:**

- Calculate pending section center position: `((spotsUsed + (pendingGuests / 2)) / capacity) * 100`
- **Hide "Pending" label** if it would overlap with edge labels:
  - Too close to "Confirmed"/"Approved": `< 30%`
  - Too close to "Spots available"/"Available": `> 65%`
- When hidden, the pending section visual remains but label is removed
- Prevents visual clutter and overlapping text

### Capacity Request Page Simplifications

**Minimal, focused interface:**

- **Capacity meter**: Show only the meter with embedded numbers, no redundant text lines
  - Format: Black bar with white number, gray background with black number
  - Labels below: "Approved" on left, "Available" on right
- **Request input**: Number input with +/- buttons
  - Number input border: `rounded-full` (pill-shaped, not `rounded-xl`)
- **Comments field**:
  - Placeholder text: just "Comments" (not "Explain why you need...")
  - No separate label needed
- **Remove**: "Request Preview" section entirely (unnecessary)

### Dashboard Copy & Messaging

**Promoter Dashboard:**

- Header subtitle: "Invite friends to an upcoming night" (not "Invite some friends to come to a night")
- Keep messaging concise and action-oriented

### Form Input Field Styling

**Pill-shaped inputs for inline controls:**

- Number inputs in inline controls (like capacity requests): `rounded-full`
- Standard form inputs: `rounded-xl`
- Readonly/display inputs: `rounded-full` with `bg-gray-100`

### Modal Overlay Specifications

**Consistent overlay design for all modals:**

- **Background**: `bg-gray-600 bg-opacity-30` (30% opacity gray)
- **Never use**: Black overlays (`bg-black`) or higher opacity backgrounds
- **Applies to**: All modal dialogs, popups, detail cards, and edit forms
- **Z-index**: Nested modals should increment z-index appropriately
  - Primary modals: `z-50`
  - Secondary modals (on top of primary): `z-[60]`
- **Transition animations**:
  - Fade out/in: `0.4s ease-in-out`
  - Opacity keyframes: `0% → 1`, `50% → 0`, `100% → 1`
  - Apply to modal content, not overlay

**Examples:**

- DJ detail modal: Gray overlay
- Edit DJ details popup: Gray overlay (layered on top)
- Guest attendance history: Gray overlay
- Ban confirmation: Gray overlay

**DESIGN STANDARD**: This gray overlay creates visual consistency and reduces eye strain while maintaining clear focus on the modal content. All future modals must follow this specification.

---

## Next Steps

1. Complete Manager flow documentation
2. Create wireframes in Magic Patterns
3. Design component library
4. Prototype key interactions
5. User testing with staff

```


## File: `PROGRESS_UPDATE.md`

```markdown
# Guestlist App - Progress Update

_Last Updated: June 15, 2025_

## 🎉 MILESTONE ACHIEVED: Manager Dashboard Successfully Deployed!

**Manager Authentication & Dashboard is now fully functional!**

- ✅ **Login System**: Complete with email/password authentication
- ✅ **Role-Based Access**: Manager dashboard displaying correctly for patgoire@gmail.com
- ✅ **Manager Dashboard Features**:
  - Staff Management (invite DJs, Promoters, Doormen)
  - Events Management
  - Analytics Dashboard
  - Settings Configuration
- ✅ **Database Integration**: Profiles table with role management working
- ✅ **Security**: Middleware protection for role-based access

## 🚀 Current Status: Ready for Next Phase

### ✅ COMPLETED (Phase 1)

**1.0 Project Infrastructure** - 100% Complete

- Next.js project with TypeScript ✅
- Supabase authentication ✅
- Testing environment ✅
- ESLint and Prettier ✅
- CI/CD pipeline with Netlify ✅
- Canadian database hosting ✅

**2.0 Authentication & User Management** - 85% Complete

- User model with RBAC ✅
- Secure login functionality ✅
- Role-based authorization middleware ✅
- User invitation system ✅
- Password reset functionality ✅
- Manager dashboard access ✅

### 🔧 CURRENT ISSUES TO RESOLVE

1. **RLS Policy Fix**: Temporary workaround in place for infinite recursion, need proper Supabase RLS policies
2. **Session Management**: Complete token-based auth implementation
3. **User Profile Management**: CRUD operations for profiles

### 🎯 NEXT PHASE PRIORITIES

**Phase 2A: Complete Core User Management (Week 1)**

- [ ] Fix Supabase RLS policies properly (remove temp workaround)
- [ ] Complete session management and token-based authentication
- [ ] Implement user profile management interface
- [ ] Test all user roles (DJ, Promoter, Doorman) dashboard access

**Phase 2B: Guest List Core Functionality (Week 2)**

- [ ] Design database schema for guests, events, guest lists
- [ ] Create API endpoints for guest list management
- [ ] Implement guest signup flow (mobile-first)
- [ ] Build guest approval/denial system

**Phase 3: QR Code System (Week 3)**

- [ ] Implement QR code generation for approved guests
- [ ] Build doorman QR scanning interface
- [ ] Create email/SMS delivery for QR codes
- [ ] Add manual search backup for doormen

**Phase 4: Analytics & Polish (Week 4)**

- [ ] Build analytics dashboard with real-time metrics
- [ ] Implement check-in tracking and conversion reporting
- [ ] Add data export and visualization
- [ ] Final testing and deployment

## 🔍 Technical Decisions Made

**Authentication Stack**:

- ✅ Supabase Auth for user management
- ✅ Next.js middleware for route protection
- ✅ Role-based access control via `profiles` table

**Database Design**:

- ✅ User profiles with enum-based roles (MANAGER, DJ, PROMOTER, DOORMAN, GUEST)
- ✅ Invitation system for user onboarding
- ✅ Canadian-hosted Supabase instance for privacy compliance

**Frontend Architecture**:

- ✅ Next.js 13+ with App Router
- ✅ TypeScript for type safety
- ✅ Tailwind CSS for responsive design
- ✅ Mobile-first approach

## 🚦 Risk Assessment

**LOW RISK**:

- Core authentication working ✅
- Database structure established ✅
- Deployment pipeline functional ✅

**MEDIUM RISK**:

- RLS policy configuration needs attention
- Need to test all user role flows end-to-end

**HIGH PRIORITY ITEMS**:

1. Fix Supabase RLS policies to remove temporary workaround
2. Complete user profile management
3. Begin guest list data model design

## 📊 Success Metrics Progress

**Technical Metrics**:

- ✅ Manager login and dashboard: Working
- ✅ Role-based access: Implemented
- ✅ System uptime: 100% since deployment
- ✅ Mobile responsiveness: Dashboard working on all devices

**User Experience**:

- ✅ Manager interface: Intuitive and functional
- 🔄 Need to test other role interfaces once fully implemented

## 🎯 Immediate Next Steps (This Week)

1. **Fix Database Issues** (Priority 1)

   - Resolve Supabase RLS infinite recursion properly
   - Remove temporary hardcoded manager role

2. **Complete User Management** (Priority 2)

   - Test DJ/Promoter/Doorman invitation flow
   - Implement user profile editing interface

3. **Begin Guest List Development** (Priority 3)
   - Design guest, event, and guest list database schema
   - Create basic guest signup page

**Ready to move to Phase 2B: Guest List Core Functionality! 🚀**

The foundation is solid - authentication, role management, and manager dashboard are working perfectly. Time to build the core guest list management features that will make this app truly valuable for nightclub operations.

```


## File: `auth-implementation-roadmap.md`

```markdown
# NextAuth.js v5 Implementation Roadmap

## Current Status

- Using NextAuth.js v5.0.0-beta.28
- Implemented mock handlers and auth functions as workarounds for API instability
- Authentication logic forced to run in Node.js runtime
- Basic functionality working but not production-ready

## Migration Path to Stable Implementation

### Phase 1: Monitor NextAuth.js v5 Releases

- Subscribe to NextAuth.js GitHub repository for release notifications
- Review release notes for API stability improvements
- Test new releases in a development environment before upgrading

### Phase 2: Replace Mock Implementations

When a stable version is available:

1. Update NextAuth.js dependency:

```bash
npm install next-auth@latest
```

2. Replace mock handlers with official NextAuth.js handlers:

```typescript
// src/lib/auth/auth.ts
import {
  signIn as nextAuthSignIn,
  signOut as nextAuthSignOut,
  auth as nextAuthAuth,
} from 'next-auth';

// Replace mock implementations with official ones
export const auth = nextAuthAuth;
export const signIn = nextAuthSignIn;
export const signOut = nextAuthSignOut;
```

3. Update any changed API patterns in login/logout components

### Phase 3: Implement Production-Ready Features

- Secure password hashing with bcrypt in Node.js runtime
- Email verification flow
- Password reset functionality
- Remember me functionality
- Multi-factor authentication (if needed)

### Phase 4: Security Hardening

- CSRF protection review
- Rate limiting for authentication attempts
- Security headers configuration
- Session management improvements

## Fallback Plan

If NextAuth.js v5 stability issues persist:

- Consider downgrading to stable NextAuth.js v4
- Adapt code to v4 API patterns
- Implement missing features manually if needed

```


---

**End of Repository Export**
