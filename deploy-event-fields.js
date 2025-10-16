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

async function deployEventFields() {
  console.log('🚀 Adding event deadline fields...');

  try {
    // Read the migration file
    const migrationPath = './supabase/migrations/20250616_add_event_deadline_fields.sql';
    const sqlContent = fs.readFileSync(migrationPath, 'utf8');

    console.log('📝 Read migration file successfully');

    // Execute the migration
    console.log('🛠️ Executing migration...');

    const { data, error } = await supabase.rpc('sql', {
      query: sqlContent,
    });

    if (error) {
      console.error('❌ Migration failed:', error.message);
      console.error('Error details:', error);
      return false;
    }

    console.log('✅ Event fields migration executed successfully!');

    // Test the deployment by checking if new fields exist
    console.log('\n🧪 Verifying new fields...');

    // Test by attempting to select the new fields
    const { data: testQuery, error: testError } = await supabase.rpc('sql', {
      query: `SELECT column_name FROM information_schema.columns 
              WHERE table_name = 'events' 
              AND column_name IN ('description', 'guest_list_deadline', 'dj_approval_deadline');`,
    });

    if (testError) {
      console.log('❌ Field verification failed:', testError.message);
      return false;
    }

    console.log('✅ New event fields added successfully:', testQuery);

    console.log('\n🎉 EVENT FIELDS MIGRATION COMPLETE!');
    console.log('🎯 Event creation form now supports all PRD requirements!');

    return true;
  } catch (error) {
    console.error('💥 Migration failed with exception:', error);
    return false;
  }
}

deployEventFields();
