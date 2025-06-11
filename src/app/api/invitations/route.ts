// src/app/api/invitations/route.ts
import { NextResponse, type NextRequest } from 'next/server';
import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { UserRole } from '@/types/user'; // Assuming UserRole is in src/types/user.ts

export async function POST(request: NextRequest) {
  // const response = NextResponse.next(); // Not needed for initial Supabase client creation in API routes
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get: (name: string) => request.cookies.get(name)?.value,
        set: (name: string, value: string, options: CookieOptions) => {
          // When setting cookies from an API route, you need to set them on the response object
          // that will be returned. This is handled when constructing the final NextResponse.
          request.cookies.set({ name, value, ...options }); // For Supabase client to read its own writes during request
        },
        remove: (name: string, options: CookieOptions) => {
          request.cookies.set({ name, value: '', ...options }); // For Supabase client
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

  // Ensure UserRole.Manager is the correct enum value as stored in your DB/defined in your enum
  // If your enum values are lowercase in the DB (e.g., 'manager'), ensure UserRole.Manager maps to that.
  // For this example, assuming UserRole.Manager is 'Manager' or 'manager' as per your enum definition.
  if (profile.role !== UserRole.Manager) { 
    return NextResponse.json({ error: 'Forbidden: Only managers can send invitations.' }, { status: 403 });
  }

  // 3. Parse and Validate Request Body
  let requestBody;
  try {
    requestBody = await request.json();
  } catch (e) {
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
  // For API routes, cookies (if any were set by Supabase like session refresh)
  // need to be explicitly passed to the outgoing response.
  const finalResponse = NextResponse.json({ message: 'Invitation created successfully.', invitation }, { status: 201 });
  
  // Transfer cookies from the request's internal store (updated by Supabase client) to the actual response
  request.cookies.getAll().forEach((cookie) => {
    if(cookie.name.startsWith('sb-')){ // Only transfer Supabase-related cookies if necessary
        finalResponse.cookies.set(cookie.name, cookie.value, {
            domain: cookie.domain,
            path: cookie.path,
            sameSite: cookie.sameSite,
            secure: cookie.secure,
            httpOnly: cookie.httpOnly,
            expires: cookie.expires,
        });
    }
  });

  return finalResponse;
}
