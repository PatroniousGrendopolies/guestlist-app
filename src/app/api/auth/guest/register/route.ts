// src/app/api/auth/guest/register/route.ts
import { NextResponse, type NextRequest } from 'next/server';
import { createClient } from '@/utils/supabase/server';
import * as bcrypt from 'bcryptjs';

export async function POST(request: NextRequest) {
  const supabase = await createClient();

  try {
    const body = await request.json();
    const { email, password, firstName, lastName, phone, instagramHandle } = body;

    // Validate required fields
    if (!email || !password || !firstName || !lastName) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Check if email already exists
    const { data: existingAuth } = await supabase
      .from('guest_auth')
      .select('id')
      .eq('email', email)
      .single();

    if (existingAuth) {
      return NextResponse.json(
        { error: 'Email already registered' },
        { status: 400 }
      );
    }

    // Create guest record
    const { data: guest, error: guestError } = await supabase
      .from('guests')
      .insert({
        first_name: firstName,
        last_name: lastName,
        email: email,
        phone: phone || null,
        instagram_handle: instagramHandle || null,
      })
      .select()
      .single();

    if (guestError) {
      console.error('Error creating guest:', guestError);
      return NextResponse.json(
        { error: 'Failed to create guest profile' },
        { status: 500 }
      );
    }

    // Hash password (on server side)
    const passwordHash = await bcrypt.hash(password, 10);

    // Create auth record
    const { error: authError } = await supabase
      .from('guest_auth')
      .insert({
        guest_id: guest.id,
        email: email,
        password_hash: passwordHash,
      })
      .select()
      .single();

    if (authError) {
      console.error('Error creating auth:', authError);
      // Rollback guest creation
      await supabase.from('guests').delete().eq('id', guest.id);
      return NextResponse.json(
        { error: 'Failed to create authentication' },
        { status: 500 }
      );
    }

    // Return guest session data
    return NextResponse.json({
      guest: {
        guestId: guest.id,
        email: email,
        name: `${guest.first_name} ${guest.last_name}`,
        verified: false,
      },
    });
  } catch (error) {
    console.error('Guest registration error:', error);
    return NextResponse.json(
      { error: 'Registration failed' },
      { status: 500 }
    );
  }
}
