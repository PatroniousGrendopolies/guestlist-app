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

    const { data: { user }, error: userError } = await supabase.auth.getUser();
    
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