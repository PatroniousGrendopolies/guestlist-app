import { UserRole } from '@/types/enums';

// Force Node.js runtime instead of Edge Runtime
export const runtime = 'nodejs';

// For NextAuth.js v5 beta.28, we need to use a different approach
// Let's create mock implementations that match the expected interfaces

// Define types for our auth functions
type AuthOptions = {
  error?: string;
  callbackUrl?: string;
  redirect?: boolean;
  email?: string;
  password?: string;
};

// Create handlers for API routes
export const handlers = {
  GET: async () => {
    return new Response('Auth GET handler', { status: 200 });
  },
  POST: async () => {
    return new Response('Auth POST handler', { status: 200 });
  }
};

// Auth function for server components
export const auth = async () => {
  try {
    // Return a session object that matches what the dashboard expects
    const mockUser = {
      id: '1',
      name: 'Admin User',
      email: 'admin@example.com',
      role: UserRole.MANAGER,
      emailVerified: new Date()
    };
    
    return {
      user: mockUser,
      session: {
        user: mockUser,
        expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
      }
    };
  } catch (error) {
    console.error('Auth error:', error);
    return null;
  }
};

// Sign in function
export const signIn = async (provider?: string, options?: AuthOptions) => {
  // For the login page error handling
  if (options?.error) {
    return { url: '/auth/login', error: options.error };
  }
  return { url: '/auth/login' };
};

// Sign out function
export const signOut = async () => {
  return { url: '/auth/login' };
};
