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
