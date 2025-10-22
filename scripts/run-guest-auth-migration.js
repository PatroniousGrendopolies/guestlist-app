/**
 * Run the guest_auth table migration
 * This creates the missing guest_auth table needed for guest authentication
 */

const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Error: Missing Supabase credentials');
  console.error('Make sure NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are set');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

async function runMigration() {
  console.log('Reading migration file...');

  const migrationPath = path.join(__dirname, '../supabase/migrations/20251022_add_guest_auth_table.sql');
  const sql = fs.readFileSync(migrationPath, 'utf8');

  console.log('Executing migration...\n');

  const { data, error } = await supabase.rpc('exec_sql', { sql_query: sql });

  if (error) {
    // The RPC might not exist, so try direct execution
    console.log('RPC method not available, trying direct SQL execution...');

    // Split into individual statements and execute one by one
    const statements = sql
      .split(';')
      .map(s => s.trim())
      .filter(s => s.length > 0 && !s.startsWith('--'));

    for (const statement of statements) {
      console.log(`Executing: ${statement.substring(0, 60)}...`);

      const { error: execError } = await supabase
        .from('guest_auth')
        .select('*')
        .limit(0);

      if (execError && execError.message.includes('does not exist')) {
        console.log('Table does not exist, this is expected before migration');
      }
    }

    // Since we can't execute DDL directly via REST API,
    // we need to use a different approach
    console.log('\n⚠️  Cannot execute DDL statements via Supabase REST API');
    console.log('\nPlease run this migration manually:');
    console.log('1. Go to https://supabase.com/dashboard/project/ywgpjswkejhelbozxhrd/sql/new');
    console.log('2. Copy and paste the SQL from:');
    console.log('   supabase/migrations/20251022_add_guest_auth_table.sql');
    console.log('3. Click "RUN" to execute the migration\n');

    console.log('SQL to run:');
    console.log('=' .repeat(70));
    console.log(sql);
    console.log('=' + '='.repeat(70));

    return;
  }

  console.log('✓ Migration completed successfully!');
  console.log(data);
}

runMigration().catch(error => {
  console.error('Migration failed:', error);
  process.exit(1);
});
