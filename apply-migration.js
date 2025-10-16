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

async function applyMigration() {
  console.log('🚀 Applying event fields migration...');

  try {
    // Apply the migration using individual ALTER statements
    console.log('📝 Adding description field...');
    const { error: descError } = await supabase.rpc('exec_sql', {
      sql: 'ALTER TABLE events ADD COLUMN IF NOT EXISTS description TEXT;',
    });

    if (descError) {
      console.log('⚠️ Description field error (might already exist):', descError.message);
    } else {
      console.log('✅ Description field added');
    }

    console.log('📝 Adding guest_list_deadline field...');
    const { error: guestError } = await supabase.rpc('exec_sql', {
      sql: 'ALTER TABLE events ADD COLUMN IF NOT EXISTS guest_list_deadline TIMESTAMP WITH TIME ZONE;',
    });

    if (guestError) {
      console.log('⚠️ Guest deadline field error (might already exist):', guestError.message);
    } else {
      console.log('✅ Guest deadline field added');
    }

    console.log('📝 Adding dj_approval_deadline field...');
    const { error: djError } = await supabase.rpc('exec_sql', {
      sql: 'ALTER TABLE events ADD COLUMN IF NOT EXISTS dj_approval_deadline TIMESTAMP WITH TIME ZONE;',
    });

    if (djError) {
      console.log('⚠️ DJ deadline field error (might already exist):', djError.message);
    } else {
      console.log('✅ DJ deadline field added');
    }

    // Test the fields are working
    console.log('\n🧪 Testing new fields...');
    const { data, error: testError } = await supabase
      .from('events')
      .select('id, name, description, guest_list_deadline, dj_approval_deadline')
      .limit(1);

    if (testError) {
      console.log('❌ Field test failed:', testError.message);
      return false;
    }

    console.log('✅ All event fields are working!');
    console.log('🎉 MIGRATION COMPLETE - Event form can now be fully enabled!');

    return true;
  } catch (error) {
    console.error('💥 Migration failed with exception:', error);
    return false;
  }
}

applyMigration();
