// src/app/auth/accept-invitation/page.tsx
import { cookies } from 'next/headers';
import { createServerClient, type CookieOptions } from '@supabase/ssr';
import AcceptInvitationForm from './AcceptInvitationForm';

// Force this page to be dynamically rendered on the server at request time
export const dynamic = 'force-dynamic';

// Define a clear type for the page props for better readability and type safety
type AcceptInvitationPageProps = {
  params: { [key: string]: string };
  searchParams?: { [key: string]: string | string[] | undefined };
};

// Server Component part
export default async function AcceptInvitationPage({ searchParams }: AcceptInvitationPageProps) {
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

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return { status: 'error', message: 'You must be logged in to accept an invitation. Please log in and try the link again.' };
    }
    
    const { data, error } = await supabase.rpc('accept_invitation_and_assign_role', {
      p_token: tokenToAccept,
    });

    if (error) {
      console.error('Error calling accept_invitation_and_assign_role:', error);
      return { status: 'error', message: `Database error: ${error.message}` };
    }

    if (data && typeof data === 'object' && 'status' in data && 'message' in data) {
        const result = data as { status: 'success' | 'error' | 'info' | 'warning'; message: string; assigned_role?: string };
        return result;
    }

    return { status: 'error', message: 'Unexpected response from server when accepting invitation.' };
  }

  return (
    <AcceptInvitationForm
      acceptInvitationAction={acceptInvitationAction}
      initialToken={initialToken}
    />
  );
}
