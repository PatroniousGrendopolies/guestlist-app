// src/app/api/doorperson/guest-entries/route.ts
import { NextResponse, type NextRequest } from 'next/server';
import { createClient } from '@/utils/supabase/server';

// GET /api/doorperson/guest-entries - Get guest entries for today's events
export async function GET(request: NextRequest) {
  const supabase = await createClient();

  // TEMPORARY: Auth disabled for testing - will be re-enabled later
  /* COMMENTED OUT FOR TESTING - RE-ENABLE WHEN AUTH IS RESTORED
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return NextResponse.json({ error: 'Unauthorized: User not authenticated.' }, { status: 401 });
  }

  // Check if user has doorperson/manager/owner role
  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();

  if (profileError || !profile) {
    console.error('Error fetching profile:', profileError);
    return NextResponse.json({ error: 'Failed to verify user role.' }, { status: 500 });
  }

  if (
    profile.role !== 'DOORPERSON' &&
    profile.role !== 'MANAGER' &&
    profile.role !== 'OWNER'
  ) {
    return NextResponse.json(
      { error: 'Forbidden: Only doorperson, managers, and owners can access guest entries.' },
      { status: 403 }
    );
  }
  */

  // Get query params
  const searchParams = request.nextUrl.searchParams;
  const eventId = searchParams.get('eventId');
  const searchQuery = searchParams.get('search');
  const filterBy = searchParams.get('filterBy'); // Filter by guest list name/creator
  const showCheckedIn = searchParams.get('showCheckedIn') === 'true';

  try {
    // Get today's date range
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    // Build query
    let query = supabase
      .from('guest_list_entries')
      .select(`
        id,
        status,
        plus_ones_requested,
        checked_in_at,
        guest:guests!inner (
          id,
          first_name,
          last_name,
          email,
          phone,
          guest_tier
        ),
        guest_list:guest_lists!inner (
          id,
          name,
          list_type,
          event:events!inner (
            id,
            name,
            date
          ),
          created_by:profiles!guest_lists_created_by_user_id_fkey (
            id,
            first_name,
            last_name
          )
        )
      `);

    // Filter by event (if specified) or today's events
    if (eventId) {
      query = query.eq('guest_lists.event_id', eventId);
    } else {
      query = query
        .gte('guest_lists.events.date', today.toISOString())
        .lt('guest_lists.events.date', tomorrow.toISOString());
    }

    // Only show approved entries
    query = query.eq('status', 'approved');

    // Filter by checked-in status
    if (!showCheckedIn) {
      query = query.is('checked_in_at', null);
    }

    // Execute query
    const { data: entries, error: entriesError } = await query;

    if (entriesError) {
      console.error('Error fetching guest entries:', entriesError);
      return NextResponse.json(
        { error: 'Failed to fetch guest entries.', details: entriesError.message },
        { status: 500 }
      );
    }

    // Transform data to match expected format
    let transformedEntries = (entries || []).map((entry: any) => ({
      entryId: entry.id,
      guestId: entry.guest.id,
      name: `${entry.guest.first_name} ${entry.guest.last_name}`,
      email: entry.guest.email,
      phone: entry.guest.phone,
      status: entry.guest.guest_tier === 'blocked' ? 'banned' : entry.guest.guest_tier,
      plusOnes: entry.plus_ones_requested,
      checkedIn: !!entry.checked_in_at,
      addedBy: entry.guest_list.created_by
        ? `${entry.guest_list.created_by.first_name} ${entry.guest_list.created_by.last_name}`
        : entry.guest_list.name,
      event: entry.guest_list.event.name,
    }));

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      transformedEntries = transformedEntries.filter(
        (entry: any) =>
          entry.name.toLowerCase().includes(query) ||
          entry.email?.toLowerCase().includes(query)
      );
    }

    // Apply "addedBy" filter
    if (filterBy && filterBy !== 'all') {
      transformedEntries = transformedEntries.filter(
        (entry: any) => entry.addedBy === filterBy
      );
    }

    // Sort alphabetically
    transformedEntries.sort((a: any, b: any) => a.name.localeCompare(b.name));

    return NextResponse.json(
      {
        entries: transformedEntries,
        count: transformedEntries.length,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error in doorperson guest entries endpoint:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
