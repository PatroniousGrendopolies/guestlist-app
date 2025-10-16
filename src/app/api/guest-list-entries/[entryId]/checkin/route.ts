// src/app/api/guest-list-entries/[entryId]/checkin/route.ts
import { NextResponse, type NextRequest } from 'next/server';
import { createClient } from '@/utils/supabase/server';

// POST /api/guest-list-entries/[entryId]/checkin - Check in a guest
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ entryId: string }> }
) {
  const supabase = await createClient();
  const { entryId } = await params;

  // TEMPORARY: Auth disabled for testing - will be re-enabled later
  // Get authenticated user (doorperson)
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  // Temporarily allow unauthenticated access for testing
  const userId = user?.id || null;

  /* COMMENTED OUT FOR TESTING - RE-ENABLE WHEN AUTH IS RESTORED
  if (userError || !user) {
    return NextResponse.json({ error: 'Unauthorized: User not authenticated.' }, { status: 401 });
  }

  // Check if user has doorperson role
  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();

  if (profileError || !profile) {
    console.error('Error fetching profile for check-in:', profileError);
    return NextResponse.json({ error: 'Failed to verify user role.' }, { status: 500 });
  }

  // Only doorperson, managers, and owners can check in guests
  if (
    profile.role !== 'DOORPERSON' &&
    profile.role !== 'MANAGER' &&
    profile.role !== 'OWNER'
  ) {
    return NextResponse.json(
      { error: 'Forbidden: Only doorperson, managers, and owners can check in guests.' },
      { status: 403 }
    );
  }
  */

  // Parse request body (optional - to update plus_ones)
  let requestBody: { plus_ones?: number } = {};
  try {
    const body = await request.text();
    if (body) {
      requestBody = JSON.parse(body);
    }
  } catch (error) {
    console.error('Error parsing request body:', error);
    // Continue without body - it's optional
  }

  // Prepare update data
  const updateData: {
    checked_in_at: string;
    checked_in_by_user_id: string | null;
    plus_ones_requested?: number;
  } = {
    checked_in_at: new Date().toISOString(),
    checked_in_by_user_id: userId,
  };

  // If plus_ones is provided, update it
  if (typeof requestBody.plus_ones === 'number') {
    updateData.plus_ones_requested = requestBody.plus_ones;
  }

  // Update the guest list entry
  const { data: updatedEntry, error: updateError } = await supabase
    .from('guest_list_entries')
    .update(updateData)
    .eq('id', entryId)
    .select(`
      *,
      guest:guests(id, first_name, last_name, email, phone, instagram_handle, guest_tier),
      guest_list:guest_lists(id, name, event_id),
      checked_in_by:profiles!guest_list_entries_checked_in_by_user_id_fkey(id, first_name, last_name)
    `)
    .single();

  if (updateError) {
    console.error('Error checking in guest:', updateError);
    return NextResponse.json(
      { error: 'Failed to check in guest.', details: updateError.message },
      { status: 500 }
    );
  }

  // Return success response
  return NextResponse.json(
    {
      message: 'Guest checked in successfully.',
      entry: updatedEntry,
    },
    { status: 200 }
  );
}
