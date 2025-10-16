// src/app/api/guest-list-entries/[entryId]/route.ts
import { NextResponse, type NextRequest } from 'next/server';
import { createClient } from '@/utils/supabase/server';

// GET /api/guest-list-entries/[entryId] - Fetch a single guest list entry
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ entryId: string }> }
) {
  const supabase = await createClient();
  const { entryId } = await params;

  const { data: entry, error } = await supabase
    .from('guest_list_entries')
    .select(`
      *,
      guest:guests(id, first_name, last_name, email, phone, instagram_handle, guest_tier),
      guest_list:guest_lists(id, name, event_id, max_capacity, current_capacity),
      approved_by:profiles!guest_list_entries_approved_by_user_id_fkey(id, first_name, last_name),
      checked_in_by:profiles!guest_list_entries_checked_in_by_user_id_fkey(id, first_name, last_name)
    `)
    .eq('id', entryId)
    .single();

  if (error) {
    console.error('Error fetching guest list entry:', error);
    return NextResponse.json(
      { error: 'Guest entry not found.' },
      { status: 404 }
    );
  }

  return NextResponse.json({ entry }, { status: 200 });
}
