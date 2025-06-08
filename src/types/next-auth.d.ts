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
