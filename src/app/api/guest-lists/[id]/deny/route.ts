// src/app/api/guest-lists/[id]/deny/route.ts
import { NextResponse, type NextRequest } from 'next/server';
import { createClient } from '@/utils/supabase/server';

// POST /api/guest-lists/[id]/deny - Deny one or multiple guest entries
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
    console.error('Error fetching profile for denial:', profileError);
    return NextResponse.json({ error: 'Failed to verify user role.' }, { status: 500 });
  }

  // Check guest list exists and user has access
  const { data: guestList, error: listError } = await supabase
    .from('guest_lists')
    .select('id, created_by_user_id')
    .eq('id', guestListId)
    .single();

  if (listError || !guestList) {
    console.error('Error fetching guest list:', listError);
    return NextResponse.json({ error: 'Guest list not found.' }, { status: 404 });
  }

  // Only list creator, managers, and owners can deny guests
  if (
    profile.role !== 'MANAGER' &&
    profile.role !== 'OWNER' &&
    guestList.created_by_user_id !== user.id
  ) {
    return NextResponse.json(
      { error: 'Forbidden: Only list creators, managers, and owners can deny guests.' },
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

  const { entry_ids } = requestBody;

  // Validate entry_ids
  if (!Array.isArray(entry_ids) || entry_ids.length === 0) {
    return NextResponse.json({ error: 'entry_ids must be a non-empty array.' }, { status: 400 });
  }

  // 4. Update Guest List Entries to denied
  const { data: updatedEntries, error: updateError } = await supabase
    .from('guest_list_entries')
    .update({
      status: 'denied',
    })
    .eq('guest_list_id', guestListId)
    .in('id', entry_ids)
    .select(`
      *,
      guest:guests(id, first_name, last_name, email, phone, instagram_handle)
    `);

  if (updateError) {
    console.error('Error denying guest list entries:', updateError);
    return NextResponse.json(
      { error: 'Failed to deny guest list entries.', details: updateError.message },
      { status: 500 }
    );
  }

  // 5. Return Success Response
  return NextResponse.json(
    {
      message: `${updatedEntries?.length || 0} guest(s) denied successfully.`,
      entries: updatedEntries,
    },
    { status: 200 }
  );
}
