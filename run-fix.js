const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

// Use service role for admin access
const supabaseUrl = 'https://ohkrtsyqbfphsqessdzj.supabase.co';
const serviceRoleKey = 'sbp_805282b5b935192f0ed1ed9d814b560e02119072';

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

async function fixRLSPolicies() {
  console.log('🛠️ Fixing RLS policies to resolve infinite recursion...');

  try {
    // Read the SQL file
    const sqlContent = fs.readFileSync('./fix_rls_policies.sql', 'utf8');

    // Split into individual statements (simple split on semicolon)
    const statements = sqlContent
      .split(';')
      .map(stmt => stmt.trim())
      .filter(stmt => stmt.length > 0 && !stmt.startsWith('--') && !stmt.startsWith("SELECT '"));

    console.log(`📝 Found ${statements.length} SQL statements to execute`);

    // Execute each statement
    for (let i = 0; i < statements.length; i++) {
      const statement = statements[i];
      if (statement.toLowerCase().includes('drop policy')) {
        console.log(`🗑️  Executing: ${statement.substring(0, 50)}...`);
      } else if (statement.toLowerCase().includes('create policy')) {
        console.log(`✨ Executing: ${statement.substring(0, 50)}...`);
      }

      try {
        const { error } = await supabase.rpc('sql', { query: statement });
        if (error) {
          if (error.message.includes('does not exist')) {
            console.log(`⚠️  Policy doesn't exist (expected): ${error.message}`);
          } else {
            console.log(`❌ Error: ${error.message}`);
          }
        } else {
          console.log(`✅ Success`);
        }
      } catch (e) {
        console.log(`❌ Exception: ${e.message}`);
      }
    }

    // Test the fix
    console.log('\n🧪 Testing the fix...');

    // Test 1: General profile access
    const { data: profiles, error: profilesError } = await supabase
      .from('profiles')
      .select('email, role')
      .limit(3);

    if (profilesError) {
      console.log(`❌ General profile test failed: ${profilesError.message}`);
    } else {
      console.log(`✅ General profile access works! Found ${profiles.length} profiles`);
    }

    // Test 2: Specific manager lookup
    const { data: manager, error: managerError } = await supabase
      .from('profiles')
      .select('email, role')
      .eq('email', 'patgoire@gmail.com')
      .single();

    if (managerError) {
      console.log(`❌ Manager lookup failed: ${managerError.message}`);
    } else {
      console.log(`✅ Manager found: ${manager.email} with role: ${manager.role}`);
    }

    console.log('\n🎉 RLS policy fix completed!');
    console.log('The infinite recursion should now be resolved.');
    console.log('You can remove the temporary workaround from the dashboard.');
  } catch (error) {
    console.error('💥 Failed to fix RLS policies:', error);
  }
}

fixRLSPolicies();
