import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';
import type { User } from '@supabase/supabase-js';

interface UseAuthOptions {
  redirectTo?: string;
  requiredRole?: 'MANAGER' | 'DJ' | 'STAFF' | 'PROMOTER' | 'DOORPERSON';
}

interface AuthState {
  user: User | null;
  loading: boolean;
  role: string | null;
}

/**
 * Custom hook to check Supabase authentication and optionally verify role
 *
 * @param options.redirectTo - URL to redirect to if not authenticated (default: /auth/login)
 * @param options.requiredRole - If provided, verifies user has this role
 * @returns AuthState with user, loading status, and role
 */
export function useAuth(options: UseAuthOptions = {}): AuthState {
  const { redirectTo = '/auth/login', requiredRole } = options;
  const router = useRouter();
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    loading: true,
    role: null,
  });

  useEffect(() => {
    let mounted = true;

    const checkAuth = async () => {
      try {
        // Check for active session
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession();

        if (error) {
          console.error('Auth check error:', error);
          router.push(redirectTo);
          return;
        }

        if (!session || !session.user) {
          router.push(redirectTo);
          return;
        }

        // Fetch user profile to get role
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', session.user.id)
          .single();

        if (profileError || !profile) {
          console.error('Profile fetch error:', profileError);
          router.push(redirectTo);
          return;
        }

        // Check role if required
        if (requiredRole && profile.role !== requiredRole) {
          console.warn(`Access denied: User has role ${profile.role}, required ${requiredRole}`);
          // Redirect to their correct dashboard
          switch (profile.role) {
            case 'MANAGER':
              router.push('/manager/dashboard');
              break;
            case 'DJ':
              router.push('/dj/dashboard');
              break;
            case 'STAFF':
              router.push('/staff/dashboard');
              break;
            case 'PROMOTER':
              router.push('/promoter/dashboard');
              break;
            case 'DOORPERSON':
              router.push('/doorperson/scanner');
              break;
            default:
              router.push('/dashboard');
          }
          return;
        }

        if (mounted) {
          setAuthState({
            user: session.user,
            loading: false,
            role: profile.role,
          });
        }
      } catch (err) {
        console.error('Unexpected auth error:', err);
        router.push(redirectTo);
      }
    };

    checkAuth();

    // Listen for auth state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_OUT' || !session) {
        router.push(redirectTo);
      } else if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
        // Re-check auth when state changes
        checkAuth();
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [router, redirectTo, requiredRole]);

  return authState;
}
