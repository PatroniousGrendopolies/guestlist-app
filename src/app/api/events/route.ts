// src/app/api/events/route.ts
import { NextResponse, type NextRequest } from 'next/server';
import { createClient } from '@/utils/supabase/server';

// GET /api/events - Fetch all events
export async function GET(request: NextRequest) {
  const supabase = await createClient();

  // Get query parameters for filtering
  const searchParams = request.nextUrl.searchParams;
  const status = searchParams.get('status');
  const venueId = searchParams.get('venue_id');
  const startDate = searchParams.get('start_date');
  const endDate = searchParams.get('end_date');

  // Build query
  let query = supabase
    .from('events')
    .select(`
      *,
      venue:venues(id, name, address),
      creator:profiles!events_created_by_user_id_fkey(id, first_name, last_name, email)
    `)
    .order('date', { ascending: false });

  // Apply filters
  if (status) {
    query = query.eq('status', status);
  }
  if (venueId) {
    query = query.eq('venue_id', venueId);
  }
  if (startDate) {
    query = query.gte('date', startDate);
  }
  if (endDate) {
    query = query.lte('date', endDate);
  }

  const { data: events, error } = await query;

  if (error) {
    console.error('Error fetching events:', error);
    return NextResponse.json(
      { error: 'Failed to fetch events from database.' },
      { status: 500 }
    );
  }

  return NextResponse.json({ events }, { status: 200 });
}

// POST /api/events - Create a new event
export async function POST(request: NextRequest) {
  const supabase = await createClient();

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
    console.error('Error fetching profile for event creation:', profileError);
    return NextResponse.json({ error: 'Failed to verify user role.' }, { status: 500 });
  }

  // Check if user has manager or owner role
  if (profile.role !== 'MANAGER' && profile.role !== 'OWNER') {
    return NextResponse.json(
      { error: 'Forbidden: Only managers and owners can create events.' },
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

  const { name, date, venue_id, max_total_capacity, day_of_week } = requestBody;

  // Validate required fields
  if (!name || typeof name !== 'string') {
    return NextResponse.json({ error: 'Event name is required.' }, { status: 400 });
  }

  if (!date) {
    return NextResponse.json({ error: 'Event date is required.' }, { status: 400 });
  }

  if (!venue_id) {
    return NextResponse.json({ error: 'Venue ID is required.' }, { status: 400 });
  }

  if (!day_of_week) {
    return NextResponse.json({ error: 'Day of week is required.' }, { status: 400 });
  }

  // 4. Create Event in Database
  const { data: event, error: insertError } = await supabase
    .from('events')
    .insert({
      name,
      date,
      venue_id,
      day_of_week,
      max_total_capacity: max_total_capacity || 300,
      created_by_user_id: user.id,
      status: 'active',
    })
    .select(`
      *,
      venue:venues(id, name, address),
      creator:profiles!events_created_by_user_id_fkey(id, first_name, last_name, email)
    `)
    .single();

  if (insertError) {
    console.error('Error creating event:', insertError);
    return NextResponse.json(
      { error: 'Failed to create event in database.', details: insertError.message },
      { status: 500 }
    );
  }

  // 5. Return Success Response
  return NextResponse.json(
    { message: 'Event created successfully.', event },
    { status: 201 }
  );
}
