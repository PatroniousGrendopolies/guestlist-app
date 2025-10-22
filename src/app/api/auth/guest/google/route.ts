// src/app/api/auth/guest/google/route.ts
import { NextResponse, type NextRequest } from 'next/server';
import { createAdminClient } from '@/utils/supabase/admin';
import { OAuth2Client } from 'google-auth-library';

const client = new OAuth2Client(process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID);

export async function POST(request: NextRequest) {
  const supabase = createAdminClient();

  try {
    const body = await request.json();
    const { credential } = body;

    if (!credential) {
      return NextResponse.json({ error: 'Missing credential' }, { status: 400 });
    }

    // Verify the Google token
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    if (!payload) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    const { sub: googleId, email, name, picture } = payload;

    if (!email || !googleId) {
      return NextResponse.json({ error: 'Missing required Google profile data' }, { status: 400 });
    }

    // Check if Google ID already exists
    const { data: existingAuth } = await supabase
      .from('guest_auth')
      .select('*, guest:guests(*)')
      .eq('google_id', googleId)
      .single();

    if (existingAuth) {
      // Update last login
      await supabase
        .from('guest_auth')
        .update({ last_login: new Date().toISOString() })
        .eq('id', existingAuth.id);

      return NextResponse.json({
        guest: {
          guestId: existingAuth.guest_id,
          email: existingAuth.email,
          name: `${existingAuth.guest.first_name} ${existingAuth.guest.last_name}`,
          verified: true,
        },
      });
    }

    // Create new guest
    const nameParts = (name || email).split(' ');
    const firstName = nameParts[0];
    const lastName = nameParts.slice(1).join(' ') || '';

    const { data: guest, error: guestError } = await supabase
      .from('guests')
      .insert({
        first_name: firstName,
        last_name: lastName,
        email: email,
        profile_photo_url: picture,
      })
      .select()
      .single();

    if (guestError) {
      console.error('Error creating guest:', guestError);
      return NextResponse.json({ error: 'Failed to create guest profile' }, { status: 500 });
    }

    // Create auth record
    const { error: authError } = await supabase
      .from('guest_auth')
      .insert({
        guest_id: guest.id,
        email: email,
        google_id: googleId,
        email_verified: true,
        email_verified_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (authError) {
      console.error('Error creating auth:', authError);
      // Rollback guest creation
      await supabase.from('guests').delete().eq('id', guest.id);
      return NextResponse.json({ error: 'Failed to create authentication' }, { status: 500 });
    }

    return NextResponse.json({
      guest: {
        guestId: guest.id,
        email: email,
        name: name || email,
        verified: true,
      },
    });
  } catch (error) {
    console.error('Google auth error:', error);
    return NextResponse.json({ error: 'Google authentication failed' }, { status: 500 });
  }
}
