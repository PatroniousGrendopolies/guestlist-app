// src/app/api/events/[id]/capacity/route.ts
import { NextResponse, type NextRequest } from 'next/server';
import { createClient } from '@/utils/supabase/server';

// GET /api/events/[id]/capacity - Get capacity statistics for an event
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const supabase = await createClient();
  const { id: eventId } = await params;

  // 1. Check if event exists
  const { data: event, error: eventError } = await supabase
    .from('events')
    .select('id, max_total_capacity')
    .eq('id', eventId)
    .single();

  if (eventError || !event) {
    if (eventError?.code === 'PGRST116') {
      return NextResponse.json({ error: 'Event not found.' }, { status: 404 });
    }
    console.error('Error fetching event:', eventError);
    return NextResponse.json(
      { error: 'Failed to fetch event from database.' },
      { status: 500 }
    );
  }

  // 2. Fetch guest lists for this event
  const { data: guestLists, error: listsError } = await supabase
    .from('guest_lists')
    .select('id, name, max_capacity, current_capacity')
    .eq('event_id', eventId)
    .eq('status', 'active');

  if (listsError) {
    console.error('Error fetching guest lists:', listsError);
    return NextResponse.json(
      { error: 'Failed to fetch guest lists from database.' },
      { status: 500 }
    );
  }

  // 3. Fetch aggregated entry statistics for this event
  // Count approved, pending, and checked-in entries across all guest lists
  const { data: entryStats, error: statsError } = await supabase
    .from('guest_list_entries')
    .select('status, guest_list_id, plus_ones_requested, checked_in_at')
    .in(
      'guest_list_id',
      guestLists?.map((list) => list.id) || []
    );

  if (statsError) {
    console.error('Error fetching entry statistics:', statsError);
    return NextResponse.json(
      { error: 'Failed to fetch entry statistics from database.' },
      { status: 500 }
    );
  }

  // 4. Calculate statistics
  let totalApproved = 0;
  let totalPending = 0;
  let totalCheckedIn = 0;

  entryStats?.forEach((entry) => {
    // Count the guest plus their plus ones
    const entryCount = 1 + (entry.plus_ones_requested || 0);

    if (entry.status === 'approved') {
      totalApproved += entryCount;
    } else if (entry.status === 'pending') {
      totalPending += entryCount;
    }

    if (entry.checked_in_at) {
      totalCheckedIn += 1; // Only count the primary guest for check-ins
    }
  });

  // 5. Build guest list details with utilization percentages
  const guestListDetails = guestLists?.map((list) => {
    const utilizationPercentage =
      list.max_capacity > 0 ? (list.current_capacity / list.max_capacity) * 100 : 0;

    return {
      id: list.id,
      name: list.name,
      current_capacity: list.current_capacity,
      max_capacity: list.max_capacity,
      utilization_percentage: Math.round(utilizationPercentage * 100) / 100, // Round to 2 decimals
    };
  }) || [];

  // 6. Return capacity statistics
  return NextResponse.json(
    {
      total_capacity: event.max_total_capacity,
      guest_lists: guestListDetails,
      total_approved: totalApproved,
      total_pending: totalPending,
      total_checked_in: totalCheckedIn,
    },
    { status: 200 }
  );
}
