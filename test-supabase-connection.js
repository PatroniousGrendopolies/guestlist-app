// Test Supabase Connection
// Run with: node test-supabase-connection.js

const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

// Read .env.local file
const envPath = path.join(__dirname, '.env.local');
const envFile = fs.readFileSync(envPath, 'utf8');
const envVars = {};

envFile.split('\n').forEach(line => {
  const match = line.match(/^([^=]+)=(.+)$/);
  if (match) {
    envVars[match[1].trim()] = match[2].trim();
  }
});

const supabaseUrl = envVars.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = envVars.NEXT_PUBLIC_SUPABASE_ANON_KEY;

console.log('\n🔍 Testing Supabase Connection...\n');
console.log('Supabase URL:', supabaseUrl);
console.log('Anon Key:', supabaseAnonKey ? '✓ Present' : '✗ Missing');

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('\n❌ Missing environment variables!');
  console.error('Make sure .env.local has:');
  console.error('  - NEXT_PUBLIC_SUPABASE_URL');
  console.error('  - NEXT_PUBLIC_SUPABASE_ANON_KEY');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testConnection() {
  try {
    // Test 1: Database Query - Check if venues table exists and has data
    console.log('\n📊 Test 1: Database Query (venues table)');
    const { data: venues, error: venuesError } = await supabase
      .from('venues')
      .select('*')
      .limit(5);

    if (venuesError) {
      console.error('❌ Database query failed:', venuesError.message);
    } else {
      console.log('✅ Database query successful!');
      console.log(`   Found ${venues.length} venue(s)`);
      if (venues.length > 0) {
        console.log('   Example:', venues[0]);
      }
    }

    // Test 2: Auth Service - Check if auth is responding
    console.log('\n🔐 Test 2: Auth Service');
    const { data: { session }, error: authError } = await supabase.auth.getSession();

    if (authError) {
      console.error('❌ Auth service error:', authError.message);
    } else {
      console.log('✅ Auth service responding!');
      console.log('   Current session:', session ? 'Logged in' : 'Not logged in (expected)');
    }

    // Test 3: Check table existence
    console.log('\n📋 Test 3: Checking critical tables...');
    const tables = ['profiles', 'events', 'guest_lists', 'guest_list_entries', 'guests', 'venues'];

    for (const tableName of tables) {
      const { error } = await supabase
        .from(tableName)
        .select('id')
        .limit(1);

      if (error && error.code === 'PGRST116') {
        console.log(`   ❌ ${tableName}: Does not exist`);
      } else if (error) {
        console.log(`   ⚠️  ${tableName}: Error - ${error.message}`);
      } else {
        console.log(`   ✅ ${tableName}: Exists`);
      }
    }

    console.log('\n✨ Connection test complete!\n');
  } catch (error) {
    console.error('\n❌ Unexpected error:', error);
    process.exit(1);
  }
}

testConnection();
