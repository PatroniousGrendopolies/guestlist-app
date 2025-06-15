const { createClient } = require('@supabase/supabase-js');

// Try with anon key to disable RLS temporarily
const supabaseUrl = 'https://ohkrtsyqbfphsqessdzj.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9oa3J0c3lxYmZwaHNxZXNzZHpqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk0MDE4MzksImV4cCI6MjA2NDk3NzgzOX0.7CuqBIQ03WmR8YY5SzhPxwuS6RKQkscnY2_BUg3ejZg';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testDashboardLogic() {
  console.log('🧪 Testing dashboard logic with current user...');
  
  try {
    // Simulate what the dashboard does
    console.log('1. Testing auth user...');
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    console.log('Auth result:', { user: user?.email, error: authError?.message });
    
    if (!user) {
      console.log('No authenticated user - this is the issue!');
      console.log('The dashboard thinks no one is logged in.');
      return;
    }
    
    console.log('2. Testing profile fetch...');
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('role, first_name, last_name, email')
      .eq('id', user.id)
      .single();
      
    console.log('Profile result:', { 
      profile, 
      error: profileError?.message,
      errorCode: profileError?.code 
    });
    
    if (profileError) {
      console.log('❌ This is the exact error the dashboard is seeing!');
      console.log('The infinite recursion prevents role lookup.');
    } else {
      console.log('✅ Profile found! Role should be:', profile.role);
    }
    
  } catch (error) {
    console.error('💥 Test failed:', error);
  }
}

testDashboardLogic();