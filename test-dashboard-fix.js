const { createClient } = require('@supabase/supabase-js');

// Test the current dashboard logic to see if we can make it work
const supabaseUrl = 'https://ohkrtsyqbfphsqessdzj.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9oa3J0c3lxYmZwaHNxZXNzZHpqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk0MDE4MzksImV4cCI6MjA2NDk3NzgzOX0.7CuqBIQ03WmR8YY5SzhPxwuS6RKQkscnY2_BUg3ejZg';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testCurrentSetup() {
  console.log('🧪 Testing current dashboard setup...');
  
  try {
    // Test 1: Can we access profiles table at all?
    console.log('\n1️⃣ Testing basic profile table access...');
    const { data: testData, error: testError } = await supabase
      .from('profiles')
      .select('count(*)')
      .limit(1);
      
    console.log('Basic access result:', { data: testData, error: testError?.message });

    // Test 2: Can we query for manager profile?
    console.log('\n2️⃣ Testing specific manager profile query...');
    const { data: managerData, error: managerError } = await supabase
      .from('profiles')
      .select('email, role')
      .eq('email', 'patgoire@gmail.com')
      .maybeSingle(); // Use maybeSingle instead of single to avoid errors if not found
      
    console.log('Manager query result:', { 
      data: managerData, 
      error: managerError?.message,
      errorCode: managerError?.code 
    });

    // Test 3: Try a more permissive query
    console.log('\n3️⃣ Testing general profiles query...');
    const { data: allData, error: allError } = await supabase
      .from('profiles')
      .select('email, role')
      .limit(5);
      
    console.log('General query result:', { 
      count: allData?.length, 
      error: allError?.message,
      errorCode: allError?.code,
      sample: allData?.[0] 
    });

    if (allError?.code === '42P17') {
      console.log('\n❌ CONFIRMED: Infinite recursion error still exists');
      console.log('RLS policies need to be fixed at the database level');
      console.log('The temporary workaround in dashboard code is still needed');
    } else if (allData?.length > 0) {
      console.log('\n✅ SUCCESS: Profile queries are working!');
      console.log('RLS policies appear to be fixed');
      console.log('You can remove the temporary workaround from dashboard');
    }

  } catch (error) {
    console.error('💥 Test failed with exception:', error);
  }
}

testCurrentSetup();