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

async function debugUserProfile() {
  console.log('🔍 Debugging user profile...');

  try {
    // Check if profiles table exists and has data
    const { data: profiles, error: profilesError } = await supabase
      .from('profiles')
      .select('*')
      .limit(5);

    if (profilesError) {
      console.log('❌ Error accessing profiles table:', profilesError);
    } else {
      console.log('✅ Profiles table data:', profiles);
    }

    // Try to get the specific user for patgoire@gmail.com
    const { data: userProfiles, error: userError } = await supabase
      .from('profiles')
      .select('*')
      .eq('email', 'patgoire@gmail.com');

    if (userError) {
      console.log('❌ Error finding user profile:', userError);
    } else {
      console.log('👤 User profile for patgoire@gmail.com:', userProfiles);
    }

    // Check auth users
    const { data: authUsers, error: authError } = await supabase.auth.admin.listUsers();
    if (authError) {
      console.log('❌ Error listing auth users:', authError);
    } else {
      console.log(
        '🔐 Auth users:',
        authUsers.users.map(u => ({ id: u.id, email: u.email }))
      );
    }
  } catch (error) {
    console.error('💥 Debug failed:', error);
  }
}

debugUserProfile();
