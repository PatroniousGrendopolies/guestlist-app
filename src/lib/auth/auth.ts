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
    return { error: options.error };
  }
  
  // Check if this is a credentials login attempt
  if (provider === 'credentials' && options?.email && options?.password) {
    // Mock user check - in a real app this would check against a database
    const mockUser = {
      id: '1',
      name: 'Admin User',
      email: 'admin@example.com',
      password: 'password123',
      role: UserRole.MANAGER,
      emailVerified: new Date()
    };
    
    // Verify credentials
    if (options.email === mockUser.email && options.password === mockUser.password) {
      // Successful login - format expected by the login page
      console.log('Authentication successful');
      // In a real implementation, we would store the user in the session
      // For now, we'll just return success and let the login page handle the redirect
      return { error: null };
    } else {
      // Failed login
      console.log('Authentication failed: Invalid credentials');
      return { error: 'Invalid credentials' };
    }
  }
  
  // Default response for other cases
  return { error: 'Unsupported authentication method' };
};

// Sign out function
export const signOut = async () => {
  return { url: '/auth/login' };
};
