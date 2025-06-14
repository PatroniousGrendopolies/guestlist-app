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
  const { data: { user }, error: userError } = await supabase.auth.getUser();

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
    return NextResponse.json({ error: 'Forbidden: Only managers can send invitations.' }, { status: 403 });
  }

  // 3. Parse and Validate Request Body
  let requestBody;
  try {
    requestBody = await request.json();
  } catch { // Removed unused variable 'e'
    return NextResponse.json({ error: 'Invalid request body: Must be JSON.' }, { status: 400 });
  }

  const { email, roleToAssign } = requestBody;

  if (!email || typeof email !== 'string' || !/\S+@\S+\.\S+/.test(email)) {
    return NextResponse.json({ error: 'Invalid email address provided.' }, { status: 400 });
  }

  if (!roleToAssign || !Object.values(UserRole).includes(roleToAssign as UserRole)) {
    return NextResponse.json({ error: `Invalid role specified. Must be one of: ${Object.values(UserRole).join(', ')}` }, { status: 400 });
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
        return NextResponse.json({ error: 'Failed to create invitation. Possible duplicate or constraint violation.' }, { status: 409 });
    }
    return NextResponse.json({ error: 'Failed to create invitation in database.' }, { status: 500 });
  }

  // 5. Return Success Response
  // Cookies are now handled by the cookieStore, so direct NextResponse is fine.
  return NextResponse.json({ message: 'Invitation created successfully.', invitation }, { status: 201 });
}
