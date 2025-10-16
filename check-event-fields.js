const { createClient } = require('@supabase/supabase-js');

// Use service role for admin access
const supabaseUrl = 'https://ohkrtsyqbfphsqessdzj.supabase.co';
const serviceRoleKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9oa3J0c3lxYmZwaHNxZXNzZHpqIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0OTQwMTgzOSwiZXhwIjoyMDY0OTc3ODM5fQ.zI9ndXiMmOJvwxFnnjggkKxVFRPHCLo-62fXRlhn6N8';

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

async function checkEventFields() {
  console.log('🔍 Checking current events table structure...');

  try {
    // Test by trying to select from events with new fields
    const { data, error } = await supabase
      .from('events')
      .select(
        'id, name, date, venue_id, status, max_total_capacity, description, guest_list_deadline, dj_approval_deadline'
      )
      .limit(1);

    if (error) {
      console.log('❌ Fields missing or error:', error.message);
      if (error.message.includes('column') && error.message.includes('does not exist')) {
        console.log(
          '🔧 Need to add missing fields to events table manually via Supabase dashboard'
        );
        console.log('📝 Required fields:');
        console.log('   - description (TEXT)');
        console.log('   - guest_list_deadline (TIMESTAMP WITH TIME ZONE)');
        console.log('   - dj_approval_deadline (TIMESTAMP WITH TIME ZONE)');
      }
      return false;
    }

    console.log('✅ All event fields are available!');
    console.log('📊 Current events table structure supports:');
    console.log('   ✓ Event name and description');
    console.log('   ✓ Date and venue selection');
    console.log('   ✓ Maximum capacity setting');
    console.log('   ✓ Guest list deadline');
    console.log('   ✓ DJ approval deadline');
    console.log('   ✓ Event status management');

    return true;
  } catch (error) {
    console.error('💥 Check failed with exception:', error);
    return false;
  }
}

checkEventFields();
