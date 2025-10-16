const { createClient } = require('@supabase/supabase-js');

// Use your Supabase credentials
const supabaseUrl = 'https://ohkrtsyqbfphsqessdzj.supabase.co';
const supabaseAnonKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9oa3J0c3lxYmZwaHNxZXNzZHpqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk0MDE4MzksImV4cCI6MjA2NDk3NzgzOX0.7CuqBIQ03WmR8YY5SzhPxwuS6RKQkscnY2_BUg3ejZg';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testDatabase() {
  console.log('🔍 Testing database connection...');

  try {
    // Test basic auth
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();
    console.log('🔐 Auth test:', { user: user?.email, error: authError?.message });

    // Test profiles table access
    const { data: profiles, error: profilesError } = await supabase
      .from('profiles')
      .select('email, role')
      .limit(5);

    console.log('📊 Profiles test:', {
      success: !profilesError,
      error: profilesError?.message,
      errorCode: profilesError?.code,
      count: profiles?.length,
    });

    if (profiles) {
      console.log('📋 Sample profiles:', profiles);
    }

    // Test specific user lookup
    const { data: managerProfile, error: managerError } = await supabase
      .from('profiles')
      .select('*')
      .eq('email', 'patgoire@gmail.com')
      .single();

    console.log('👤 Manager profile test:', {
      found: !!managerProfile,
      role: managerProfile?.role,
      error: managerError?.message,
    });
  } catch (error) {
    console.error('💥 Test failed:', error.message);
  }
}

testDatabase();
