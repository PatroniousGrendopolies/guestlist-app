// src/app/api/events/[id]/route.ts
import { NextResponse, type NextRequest } from 'next/server';
import { createClient } from '@/utils/supabase/server';

// GET /api/events/[id] - Fetch event with guest lists
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const supabase = await createClient();
  const { id } = await params;

  // Fetch event with related data
  const { data: event, error } = await supabase
    .from('events')
    .select(`
      *,
      venue:venues(id, name, address),
      creator:profiles!events_created_by_user_id_fkey(id, first_name, last_name, email),
      dj_assignments:event_dj_assignments(
        id,
        dj:profiles!event_dj_assignments_dj_user_id_fkey(id, first_name, last_name, stage_name),
        individual_capacity,
        display_order
      ),
      guest_lists(
        id,
        name,
        list_type,
        max_capacity,
        current_capacity,
        status,
        created_by_user_id
      )
    `)
    .eq('id', id)
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      return NextResponse.json({ error: 'Event not found.' }, { status: 404 });
    }
    console.error('Error fetching event:', error);
    return NextResponse.json(
      { error: 'Failed to fetch event from database.' },
      { status: 500 }
    );
  }

  return NextResponse.json({ event }, { status: 200 });
}

// PUT /api/events/[id] - Update event
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const supabase = await createClient();
  const { id } = await params;

  // 1. Get Authenticated User
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return NextResponse.json({ error: 'Unauthorized: User not authenticated.' }, { status: 401 });
  }

  // 2. Check if User is a Manager or Owner
  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();

  if (profileError || !profile) {
    console.error('Error fetching profile for event update:', profileError);
    return NextResponse.json({ error: 'Failed to verify user role.' }, { status: 500 });
  }

  if (profile.role !== 'MANAGER' && profile.role !== 'OWNER') {
    return NextResponse.json(
      { error: 'Forbidden: Only managers and owners can update events.' },
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

  // Build update object (only include provided fields)
  const updateFields: Record<string, unknown> = {};
  const allowedFields = [
    'name',
    'date',
    'day_of_week',
    'status',
    'max_total_capacity',
    'predicted_attendance',
    'actual_attendance',
    'total_bar_sales',
    'total_door_sales',
    'paid_covers_count',
  ];

  for (const field of allowedFields) {
    if (requestBody[field] !== undefined) {
      updateFields[field] = requestBody[field];
    }
  }

  if (Object.keys(updateFields).length === 0) {
    return NextResponse.json({ error: 'No fields to update provided.' }, { status: 400 });
  }

  // 4. Update Event in Database
  const { data: event, error: updateError } = await supabase
    .from('events')
    .update(updateFields)
    .eq('id', id)
    .select(`
      *,
      venue:venues(id, name, address),
      creator:profiles!events_created_by_user_id_fkey(id, first_name, last_name, email)
    `)
    .single();

  if (updateError) {
    if (updateError.code === 'PGRST116') {
      return NextResponse.json({ error: 'Event not found.' }, { status: 404 });
    }
    console.error('Error updating event:', updateError);
    return NextResponse.json(
      { error: 'Failed to update event in database.', details: updateError.message },
      { status: 500 }
    );
  }

  // 5. Return Success Response
  return NextResponse.json(
    { message: 'Event updated successfully.', event },
    { status: 200 }
  );
}

// DELETE /api/events/[id] - Delete event
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const supabase = await createClient();
  const { id } = await params;

  // 1. Get Authenticated User
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return NextResponse.json({ error: 'Unauthorized: User not authenticated.' }, { status: 401 });
  }

  // 2. Check if User is a Manager or Owner
  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();

  if (profileError || !profile) {
    console.error('Error fetching profile for event deletion:', profileError);
    return NextResponse.json({ error: 'Failed to verify user role.' }, { status: 500 });
  }

  if (profile.role !== 'MANAGER' && profile.role !== 'OWNER') {
    return NextResponse.json(
      { error: 'Forbidden: Only managers and owners can delete events.' },
      { status: 403 }
    );
  }

  // 3. Delete Event from Database
  const { error: deleteError } = await supabase.from('events').delete().eq('id', id);

  if (deleteError) {
    console.error('Error deleting event:', deleteError);
    return NextResponse.json(
      { error: 'Failed to delete event from database.', details: deleteError.message },
      { status: 500 }
    );
  }

  // 4. Return Success Response
  return NextResponse.json({ message: 'Event deleted successfully.' }, { status: 200 });
}
