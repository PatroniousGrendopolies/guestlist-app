// src/app/api/auth/guest/login/route.ts
import { NextResponse, type NextRequest } from 'next/server';
import { createAdminClient } from '@/utils/supabase/admin';
import * as bcrypt from 'bcryptjs';

export async function POST(request: NextRequest) {
  const supabase = createAdminClient();

  try {
    const body = await request.json();
    const { email, password } = body;

    // Validate required fields
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Get auth record with guest data
    const { data: auth, error: authError } = await supabase
      .from('guest_auth')
      .select('*, guest:guests(*)')
      .eq('email', email)
      .single();

    if (authError || !auth) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Verify password
    const validPassword = await bcrypt.compare(password, auth.password_hash);
    if (!validPassword) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Update last login
    await supabase
      .from('guest_auth')
      .update({ last_login: new Date().toISOString() })
      .eq('id', auth.id);

    await supabase
      .from('guests')
      .update({ last_login: new Date().toISOString() })
      .eq('id', auth.guest_id);

    // Return guest session data
    return NextResponse.json({
      guest: {
        guestId: auth.guest_id,
        email: auth.email,
        name: `${auth.guest.first_name} ${auth.guest.last_name}`,
        verified: auth.email_verified || false,
      },
    });
  } catch (error) {
    console.error('Guest login error:', error);
    return NextResponse.json(
      { error: 'Login failed' },
      { status: 500 }
    );
  }
}
