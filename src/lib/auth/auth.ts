import NextAuth from 'next-auth';
import { authOptions } from './auth-options';

// Force Node.js runtime instead of Edge Runtime
export const runtime = 'nodejs';

// Initialize NextAuth with our auth options
const nextAuthConfig = NextAuth(authOptions);
export const { handlers, auth, signIn, signOut } = nextAuthConfig;
