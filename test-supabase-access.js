const { createClient } = require('@supabase/supabase-js');

// Use service role for admin access
const supabaseUrl = 'https://ohkrtsyqbfphsqessdzj.supabase.co';
const serviceRoleKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9oa3J0c3lxYmZwaHNxZXNzZHpqIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0OTQwMTgzOSwiZXhwIjoyMDY0OTc3ODM5fQ.zI9ndXiMmOJvwxFnnjggkKxVFRPHCLo-62fXRlhn6N8';

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

async function testSupabaseAccess() {
  console.log('🔍 Testing Supabase access and checking for SQL execution methods...');
  
  try {
    // Test basic table access
    const { data: events, error: eventsError } = await supabase
      .from('events')
      .select('id, name')
      .limit(1);
    
    if (eventsError) {
      console.log('❌ Basic table access failed:', eventsError.message);
      return;
    }
    
    console.log('✅ Basic Supabase access working');
    
    // List all available RPC functions
    console.log('\n🔍 Checking available RPC functions...');
    
    // Try to get schema information
    const { data: functions, error: funcError } = await supabase
      .rpc('version'); // This should always exist
      
    if (!funcError) {
      console.log('✅ RPC calls are working');
    }
    
    // Check what columns currently exist in events table
    console.log('\n📊 Current events table structure:');
    try {
      // Try to select all possible fields to see which ones exist
      const { data: testFields, error: fieldError } = await supabase
        .from('events')
        .select('*')
        .limit(1);
        
      if (!fieldError && testFields && testFields.length > 0) {
        console.log('Current fields:', Object.keys(testFields[0]));
        
        // Check specifically for our target fields
        const hasDescription = 'description' in testFields[0];
        const hasGuestDeadline = 'guest_list_deadline' in testFields[0];
        const hasDjDeadline = 'dj_approval_deadline' in testFields[0];
        
        console.log('✅ description field exists:', hasDescription);
        console.log('✅ guest_list_deadline field exists:', hasGuestDeadline);
        console.log('✅ dj_approval_deadline field exists:', hasDjDeadline);
        
        if (hasDescription && hasGuestDeadline && hasDjDeadline) {
          console.log('\n🎉 ALL FIELDS ALREADY EXIST! Migration not needed!');
          return true;
        }
      }
    } catch (err) {
      console.log('Table structure check failed:', err.message);
    }
    
    // Try alternative approaches for executing DDL
    console.log('\n🛠️ Checking for DDL execution capabilities...');
    
    // Check if we can access the Supabase management API
    console.log('💡 Alternative: Use Supabase CLI or Dashboard for schema changes');
    console.log('🌐 Dashboard: https://supabase.com/dashboard/project/ohkrtsyqbfphsqessdzj/sql/new');
    
  } catch (error) {
    console.error('💥 Test failed:', error);
  }
}

testSupabaseAccess();