// src/app/api/guest-lists/[id]/entries/route.ts
import { NextResponse, type NextRequest } from 'next/server';
import { createClient } from '@/utils/supabase/server';

// GET /api/guest-lists/[id]/entries - Fetch all entries for a guest list
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const supabase = await createClient();
  const { id } = await params;

  // Get query parameters for filtering
  const searchParams = request.nextUrl.searchParams;
  const status = searchParams.get('status');

  // Build query with guest details
  let query = supabase
    .from('guest_list_entries')
    .select(`
      *,
      guest:guests(id, first_name, last_name, email, phone, instagram_handle, guest_tier),
      approved_by:profiles!guest_list_entries_approved_by_user_id_fkey(id, first_name, last_name),
      checked_in_by:profiles!guest_list_entries_checked_in_by_user_id_fkey(id, first_name, last_name)
    `)
    .eq('guest_list_id', id)
    .order('created_at', { ascending: false });

  // Apply status filter if provided
  if (status && ['pending', 'approved', 'denied'].includes(status)) {
    query = query.eq('status', status);
  }

  const { data: entries, error } = await query;

  if (error) {
    console.error('Error fetching guest list entries:', error);
    return NextResponse.json(
      { error: 'Failed to fetch guest list entries from database.' },
      { status: 500 }
    );
  }

  return NextResponse.json({ entries }, { status: 200 });
}

// POST /api/guest-lists/[id]/entries - Add a new guest to the list
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const supabase = await createClient();
  const { id: guestListId } = await params;

  // 1. Get Authenticated User
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return NextResponse.json({ error: 'Unauthorized: User not authenticated.' }, { status: 401 });
  }

  // 2. Check if User is authorized (manager, owner, or list creator)
  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();

  if (profileError || !profile) {
    console.error('Error fetching profile for guest list entry:', profileError);
    return NextResponse.json({ error: 'Failed to verify user role.' }, { status: 500 });
  }

  // Check guest list exists and user has access
  const { data: guestList, error: listError } = await supabase
    .from('guest_lists')
    .select('id, created_by_user_id, max_capacity, current_capacity')
    .eq('id', guestListId)
    .single();

  if (listError || !guestList) {
    console.error('Error fetching guest list:', listError);
    return NextResponse.json({ error: 'Guest list not found.' }, { status: 404 });
  }

  // Only list creator, managers, and owners can add guests
  if (
    profile.role !== 'MANAGER' &&
    profile.role !== 'OWNER' &&
    guestList.created_by_user_id !== user.id
  ) {
    return NextResponse.json(
      { error: 'Forbidden: Only list creators, managers, and owners can add guests.' },
      { status: 403 }
    );
  }

  // 3. Parse and Validate Request Body
  let requestBody;
  try {
    requestBody = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body: Must be JSON.' }, { status: 400 });
  }

  const { guest_id, plus_ones_requested } = requestBody;

  // Validate required fields
  if (!guest_id) {
    return NextResponse.json({ error: 'Guest ID is required.' }, { status: 400 });
  }

  // Validate plus_ones_requested
  const plusOnes = plus_ones_requested || 0;
  if (typeof plusOnes !== 'number' || plusOnes < 0) {
    return NextResponse.json({ error: 'Invalid plus_ones_requested value.' }, { status: 400 });
  }

  // Check if guest exists
  const { data: guest, error: guestError } = await supabase
    .from('guests')
    .select('id, first_name, last_name, email')
    .eq('id', guest_id)
    .single();

  if (guestError || !guest) {
    console.error('Error fetching guest:', guestError);
    return NextResponse.json({ error: 'Guest not found.' }, { status: 404 });
  }

  // 4. Create Guest List Entry
  const { data: entry, error: insertError } = await supabase
    .from('guest_list_entries')
    .insert({
      guest_list_id: guestListId,
      guest_id,
      plus_ones_requested: plusOnes,
      status: 'pending',
    })
    .select(`
      *,
      guest:guests(id, first_name, last_name, email, phone, instagram_handle, guest_tier)
    `)
    .single();

  if (insertError) {
    // Check for unique constraint violation
    if (insertError.code === '23505') {
      return NextResponse.json(
        { error: 'Guest is already on this list.' },
        { status: 409 }
      );
    }
    console.error('Error creating guest list entry:', insertError);
    return NextResponse.json(
      { error: 'Failed to add guest to list.', details: insertError.message },
      { status: 500 }
    );
  }

  // 5. Return Success Response
  return NextResponse.json(
    { message: 'Guest added to list successfully.', entry },
    { status: 201 }
  );
}
