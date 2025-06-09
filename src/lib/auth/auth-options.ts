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
