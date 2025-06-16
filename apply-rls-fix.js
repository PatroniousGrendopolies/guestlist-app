const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

// Use service role for admin access
const supabaseUrl = 'https://ohkrtsyqbfphsqessdzj.supabase.co';
const serviceRoleKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9oa3J0c3lxYmZwaHNxZXNzZHpqIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0OTQwMTgzOSwiZXhwIjoyMDY0OTc3ODM5fQ.zI9ndXiMmOJvwxFnnjggkKxVFRPHCLo-62fXRlhn6N8';

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

async function applyRLSFix() {
  console.log('🔧 Fixing RLS infinite recursion issue...');
  
  try {
    // Test current event creation to confirm the issue
    console.log('🧪 Testing current event creation...');
    
    const testEventData = {
      name: 'Test Event',
      date: '2025-01-01',
      day_of_week: 'wednesday',
      venue_id: '13ac6d9b-f188-44ff-a4d9-4e0870efb5a0',
      max_total_capacity: 75,
      status: 'active',
      created_by_user_id: 'c55fd137-6822-45fa-8cf8-023b912afe6a'
    };
    
    const { data: testResult, error: testError } = await supabase
      .from('events')
      .insert([testEventData])
      .select()
      .single();
    
    if (testError) {
      console.log('❌ Current issue confirmed:', testError.message);
      
      if (testError.message.includes('infinite recursion')) {
        console.log('🎯 Infinite recursion detected - this needs to be fixed via Supabase Dashboard');
        console.log('');
        console.log('📝 MANUAL FIX REQUIRED:');
        console.log('1. Go to: https://supabase.com/dashboard/project/ohkrtsyqbfphsqessdzj/sql/new');
        console.log('2. Copy and paste the contents of fix-rls-policies.sql');
        console.log('3. Run the SQL commands');
        console.log('');
        console.log('🔍 The SQL commands are in: fix-rls-policies.sql');
        
        // Read and display the SQL fix
        try {
          const sqlFix = fs.readFileSync('./fix-rls-policies.sql', 'utf8');
          console.log('');
          console.log('📋 SQL TO EXECUTE:');
          console.log('=' .repeat(50));
          console.log(sqlFix);
          console.log('=' .repeat(50));
        } catch (readError) {
          console.log('⚠️ Could not read fix-rls-policies.sql file');
        }
      }
    } else {
      console.log('✅ Event creation works! Issue may be resolved.');
      
      // Clean up test event
      await supabase.from('events').delete().eq('id', testResult.id);
      console.log('🧹 Cleaned up test event');
    }
    
  } catch (error) {
    console.error('💥 Fix attempt failed:', error);
  }
}

applyRLSFix();