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

async function checkPolicies() {
  console.log('🔍 Checking current RLS policies...');
  
  try {
    // Query to see all policies on events table
    const { data: eventPolicies, error: eventError } = await supabase.rpc('sql', {
      query: `
        SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual, with_check
        FROM pg_policies 
        WHERE tablename = 'events' OR tablename = 'profiles'
        ORDER BY tablename, policyname;
      `
    });
    
    if (eventError) {
      console.log('❌ Could not query policies (trying alternative method)');
      
      // Alternative: Check if we can disable RLS temporarily
      console.log('💡 SUGGESTED FIX:');
      console.log('The issue is that some existing RLS policies are causing infinite recursion.');
      console.log('We need to either:');
      console.log('1. Temporarily disable RLS on events table, OR');
      console.log('2. Drop the specific problematic policies');
      console.log('');
      console.log('🔧 Try this SAFE approach in Supabase SQL editor:');
      console.log('');
      console.log('-- Temporarily disable RLS to allow event creation');
      console.log('ALTER TABLE events DISABLE ROW LEVEL SECURITY;');
      console.log('');
      console.log('-- Test event creation, then re-enable with simpler policies');
      console.log('-- After testing, you can re-enable with:');
      console.log('-- ALTER TABLE events ENABLE ROW LEVEL SECURITY;');
      console.log('');
      
    } else {
      console.log('✅ Current policies:', eventPolicies);
    }
    
  } catch (error) {
    console.error('💥 Check failed:', error);
    console.log('');
    console.log('🔧 QUICK FIX - Disable RLS temporarily:');
    console.log('Run this in Supabase SQL editor:');
    console.log('');
    console.log('ALTER TABLE events DISABLE ROW LEVEL SECURITY;');
    console.log('');
    console.log('This will allow event creation to work while we fix the policies properly.');
  }
}

checkPolicies();