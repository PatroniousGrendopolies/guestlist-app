// src/app/api/dj/guest-lists/route.ts
import { NextResponse, type NextRequest } from 'next/server';
import { createClient } from '@/utils/supabase/server';

// GET /api/dj/guest-lists - Get all guest lists for a DJ with event info and stats
export async function GET(request: NextRequest) {
  const supabase = await createClient();

  // TEMPORARY: Auth disabled for testing - will be re-enabled later
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  // For now, get dj_user_id from query param (will use authenticated user later)
  const searchParams = request.nextUrl.searchParams;
  const djUserId = searchParams.get('dj_user_id');

  if (!djUserId) {
    return NextResponse.json(
      { error: 'dj_user_id query parameter required' },
      { status: 400 }
    );
  }

  try {
    // Fetch all guest lists created by this DJ with event data
    const { data: guestLists, error: listsError } = await supabase
      .from('guest_lists')
      .select(`
        id,
        event_id,
        name,
        max_capacity,
        list_type,
        status,
        created_at,
        events (
          id,
          name,
          date,
          day_of_week,
          status,
          max_total_capacity
        )
      `)
      .eq('created_by_user_id', djUserId)
      .order('created_at', { ascending: false });

    if (listsError) {
      console.error('Error fetching guest lists:', listsError);
      return NextResponse.json(
        { error: 'Failed to fetch guest lists', details: listsError.message },
        { status: 500 }
      );
    }

    if (!guestLists || guestLists.length === 0) {
      return NextResponse.json({
        guestLists: [],
        upcomingEvents: [],
        pastEvents: [],
      });
    }

    // For each guest list, fetch entry statistics
    const guestListsWithStats = await Promise.all(
      guestLists.map(async guestList => {
        // Fetch all entries for this guest list
        const { data: entries, error: entriesError } = await supabase
          .from('guest_list_entries')
          .select('id, status, plus_ones_requested, checked_in_at')
          .eq('guest_list_id', guestList.id);

        if (entriesError) {
          console.error(`Error fetching entries for list ${guestList.id}:`, entriesError);
          return {
            ...guestList,
            approvedCount: 0,
            pendingCount: 0,
            deniedCount: 0,
            spotsUsed: 0,
            totalAttendees: 0,
          };
        }

        // Calculate statistics
        const approvedEntries = entries?.filter(e => e.status === 'approved') || [];
        const pendingEntries = entries?.filter(e => e.status === 'pending') || [];
        const deniedEntries = entries?.filter(e => e.status === 'denied') || [];

        // Spots used = approved entries + their plus ones
        const spotsUsed = approvedEntries.reduce(
          (total, entry) => total + 1 + (entry.plus_ones_requested || 0),
          0
        );

        // Total attendees = checked in entries + their plus ones
        const checkedInEntries = entries?.filter(e => e.checked_in_at) || [];
        const totalAttendees = checkedInEntries.reduce(
          (total, entry) => total + 1 + (entry.plus_ones_requested || 0),
          0
        );

        return {
          ...guestList,
          approvedCount: approvedEntries.length,
          pendingCount: pendingEntries.length,
          deniedCount: deniedEntries.length,
          spotsUsed,
          totalAttendees,
        };
      })
    );

    // Get all other guest lists for the same events (to show other DJs)
    const eventIds = guestListsWithStats.map(gl => gl.event_id);
    const { data: allEventGuestLists, error: allListsError } = await supabase
      .from('guest_lists')
      .select(`
        id,
        event_id,
        name,
        created_by_user_id
      `)
      .in('event_id', eventIds)
      .neq('created_by_user_id', djUserId);

    if (allListsError) {
      console.error('Error fetching other guest lists:', allListsError);
    }

    // Group other guest lists by event
    const otherListsByEvent: Record<string, string[]> = {};
    allEventGuestLists?.forEach(list => {
      if (!otherListsByEvent[list.event_id]) {
        otherListsByEvent[list.event_id] = [];
      }
      otherListsByEvent[list.event_id].push(list.name);
    });

    // Categorize events into upcoming and past
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const upcomingEvents: any[] = [];
    const pastEvents: any[] = [];

    guestListsWithStats.forEach(guestList => {
      const event = guestList.events;
      if (!event) return;

      const eventDate = new Date(event.date);
      eventDate.setHours(0, 0, 0, 0);

      const eventData = {
        id: event.id,
        guestListId: guestList.id,
        name: event.name,
        date: event.date,
        dayOfWeek: event.day_of_week,
        status: event.status,
        totalCapacity: event.max_total_capacity,
        listCapacity: guestList.max_capacity,
        spotsUsed: guestList.spotsUsed,
        approvedCount: guestList.approvedCount,
        pendingCount: guestList.pendingCount,
        deniedCount: guestList.deniedCount,
        totalAttendees: guestList.totalAttendees,
        otherDJs: otherListsByEvent[event.id] || [],
        hasInvitedPastGuests: false, // TODO: implement this tracking
      };

      if (eventDate >= today) {
        upcomingEvents.push(eventData);
      } else {
        // Calculate conversion rate for past events
        const conversionRate =
          guestList.approvedCount > 0
            ? Math.round((guestList.totalAttendees / guestList.spotsUsed) * 100)
            : 0;

        pastEvents.push({
          ...eventData,
          conversionRate,
        });
      }
    });

    // Sort by date
    upcomingEvents.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    pastEvents.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return NextResponse.json({
      guestLists: guestListsWithStats,
      upcomingEvents,
      pastEvents,
    });
  } catch (error) {
    console.error('Error in DJ guest lists API:', error);
    return NextResponse.json(
      {
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
