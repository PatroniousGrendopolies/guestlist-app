const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

// Use service role for admin access
const supabaseUrl = 'https://ohkrtsyqbfphsqessdzj.supabase.co';
const serviceRoleKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9oa3J0c3lxYmZwaHNxZXNzZHpqIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0OTQwMTgzOSwiZXhwIjoyMDY0OTc3ODM5fQ.zI9ndXiMmOJvwxFnnjggkKxVFRPHCLo-62fXRlhn6N8';

// Create client
const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

async function deploySchema() {
  console.log('🚀 Deploying comprehensive guestlist schema...');
  
  try {
    // First, let's test if we can access existing tables
    console.log('🧪 Testing current database access...');
    
    const { data: existingTables, error: tablesError } = await supabase
      .from('profiles')
      .select('email, role')
      .eq('email', 'patgoire@gmail.com')
      .maybeSingle();
      
    if (tablesError) {
      console.log('⚠️ Profiles table issue:', tablesError.message);
    } else {
      console.log('✅ Current profiles table access works:', existingTables?.role);
    }
    
    // Check if venues table already exists
    const { data: venueTest, error: venueError } = await supabase
      .from('venues')
      .select('name')
      .limit(1);
      
    if (!venueError) {
      console.log('✅ Schema already deployed! Venues table exists:', venueTest?.[0]?.name);
      return true;
    }
    
    console.log('📝 Schema not yet deployed. Need to deploy manually...');
    console.log('\n🎯 MANUAL DEPLOYMENT REQUIRED:');
    console.log('1. Go to: https://supabase.com/dashboard/project/ohkrtsyqbfphsqessdzj/sql');
    console.log('2. Copy the content of: supabase/migrations/20250616005319_comprehensive_guestlist_schema.sql');
    console.log('3. Paste it in the SQL Editor and click "Run"');
    console.log('\n⚡ This is the fastest way to deploy the schema!');
    
    return false;
    
  } catch (error) {
    console.error('💥 Error:', error);
    return false;
  }
}

deploySchema();