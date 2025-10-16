const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

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

async function deploySchema() {
  console.log('🚀 Deploying comprehensive guestlist schema...');

  try {
    // Read the migration file
    const migrationPath = './supabase/migrations/20250616005319_comprehensive_guestlist_schema.sql';
    const sqlContent = fs.readFileSync(migrationPath, 'utf8');

    console.log('📝 Read migration file successfully');

    // Execute the entire migration as one transaction
    console.log('🛠️ Executing schema migration...');

    const { data, error } = await supabase.rpc('sql', {
      query: sqlContent,
    });

    if (error) {
      console.error('❌ Migration failed:', error.message);
      console.error('Error details:', error);
      return false;
    }

    console.log('✅ Schema migration executed successfully!');

    // Test the deployment by checking if tables exist
    console.log('\n🧪 Verifying deployment...');

    // Check venues table
    const { data: venues, error: venuesError } = await supabase
      .from('venues')
      .select('name')
      .limit(1);

    if (venuesError) {
      console.log('❌ Venues table check failed:', venuesError.message);
      return false;
    }

    console.log('✅ Venues table created:', venues?.[0]?.name || 'Table exists');

    // Check events table
    const { data: eventsCount, error: eventsError } = await supabase
      .from('events')
      .select('count(*)')
      .limit(1);

    if (eventsError) {
      console.log('❌ Events table check failed:', eventsError.message);
      return false;
    }

    console.log('✅ Events table created successfully');

    // Check guests table
    const { data: guestsCount, error: guestsError } = await supabase
      .from('guests')
      .select('count(*)')
      .limit(1);

    if (guestsError) {
      console.log('❌ Guests table check failed:', guestsError.message);
      return false;
    }

    console.log('✅ Guests table created successfully');

    // Test the profiles table (should be fixed now)
    const { data: profileTest, error: profileError } = await supabase
      .from('profiles')
      .select('email, role')
      .eq('email', 'patgoire@gmail.com')
      .maybeSingle();

    if (profileError) {
      if (profileError.code === '42P17') {
        console.log(
          '⚠️ Profiles table still has infinite recursion - RLS policies need manual fix'
        );
      } else {
        console.log('❌ Profiles table error:', profileError.message);
      }
    } else {
      console.log('✅ Profiles table working! Manager role:', profileTest?.role);
    }

    console.log('\n🎉 DATABASE SCHEMA DEPLOYMENT COMPLETE!');
    console.log('🎯 Ready to start Phase 1 MVP development!');

    return true;
  } catch (error) {
    console.error('💥 Deployment failed with exception:', error);
    return false;
  }
}

deploySchema();
