const { Client } = require('pg');

// Direct connection using postgres client
const client = new Client({
  connectionString: 'postgresql://postgres.ohkrtsyqbfphsqessdzj:[YOUR-PASSWORD]@aws-0-ca-central-1.pooler.supabase.com:6543/postgres',
  ssl: {
    rejectUnauthorized: false
  }
});

async function applyDirectMigration() {
  console.log('🚀 Applying migration with direct PostgreSQL connection...');
  console.log('⚠️ Note: This requires manual password entry or environment variable');
  
  try {
    // This approach would require the actual database password
    // Let's try a different approach using the supabase admin API
    
    console.log('❌ Direct PostgreSQL connection requires password configuration');
    console.log('💡 Alternative: Use Supabase Dashboard SQL Editor');
    console.log('📝 Please run this SQL in the Supabase Dashboard:');
    console.log('');
    console.log('-- Add missing event fields');
    console.log('ALTER TABLE events ADD COLUMN IF NOT EXISTS description TEXT;');
    console.log('ALTER TABLE events ADD COLUMN IF NOT EXISTS guest_list_deadline TIMESTAMP WITH TIME ZONE;');
    console.log('ALTER TABLE events ADD COLUMN IF NOT EXISTS dj_approval_deadline TIMESTAMP WITH TIME ZONE;');
    console.log('');
    console.log('🌐 Go to: https://supabase.com/dashboard/project/ohkrtsyqbfphsqessdzj/sql/new');
    
  } catch (error) {
    console.error('💥 Connection failed:', error.message);
  }
}

applyDirectMigration();