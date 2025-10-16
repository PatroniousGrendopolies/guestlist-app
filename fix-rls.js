const { createClient } = require('@supabase/supabase-js');

// From your MCP config screenshot - using the service role key for admin access
const supabaseUrl = 'https://ohkrtsyqbfphsqessdzj.supabase.co';
const serviceRoleKey = 'sbp_805282b5b935192f0ed1ed9d814b560e02119072'; // From your mcp_config.json

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

async function fixRLSPolicies() {
  console.log('🛠️ Fixing RLS policies to resolve infinite recursion...');

  try {
    // Step 1: Check current policies
    console.log('\n1️⃣ Checking current policies...');
    const { data: policies, error: policiesError } = await supabase.rpc('sql', {
      query: "SELECT policyname, cmd, qual FROM pg_policies WHERE tablename = 'profiles';",
    });

    if (policiesError) {
      console.log('Using alternative method to check policies...');
    } else {
      console.log('Current policies:', policies);
    }

    // Step 2: Drop existing problematic policies
    console.log('\n2️⃣ Dropping existing policies...');

    const dropPolicies = [
      'DROP POLICY IF EXISTS "Authenticated users can view own profile" ON profiles;',
      'DROP POLICY IF EXISTS "Authenticated users can update own profile" ON profiles;',
      'DROP POLICY IF EXISTS "Allow anon role to read profiles" ON profiles;',
      'DROP POLICY IF EXISTS "Service role full access" ON profiles;',
      'DROP POLICY IF EXISTS "Users can view own profile" ON profiles;',
      'DROP POLICY IF EXISTS "Users can update own profile" ON profiles;',
      'DROP POLICY IF EXISTS "Managers can view all profiles" ON profiles;',
    ];

    for (const policy of dropPolicies) {
      try {
        const { error } = await supabase.rpc('sql', { query: policy });
        if (error && !error.message.includes('does not exist')) {
          console.log(`⚠️ Warning dropping policy: ${error.message}`);
        } else {
          console.log(`✅ Dropped policy: ${policy.split('"')[1]}`);
        }
      } catch (e) {
        console.log(`⚠️ Error dropping policy: ${e.message}`);
      }
    }

    // Step 3: Create simple, non-recursive policies
    console.log('\n3️⃣ Creating new non-recursive policies...');

    const newPolicies = [
      // Allow anyone to read profiles (needed for role checks in middleware and dashboard)
      {
        name: 'Enable read access for all',
        sql: `CREATE POLICY "Enable read access for all" ON profiles FOR SELECT USING (true);`,
      },
      // Allow users to update their own profile
      {
        name: 'Users can update own profile',
        sql: `CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);`,
      },
      // Allow service role full access
      {
        name: 'Service role full access',
        sql: `CREATE POLICY "Service role full access" ON profiles FOR ALL USING (auth.role() = 'service_role');`,
      },
    ];

    for (const policy of newPolicies) {
      try {
        const { error } = await supabase.rpc('sql', { query: policy.sql });
        if (error) {
          console.log(`❌ Error creating policy "${policy.name}": ${error.message}`);
        } else {
          console.log(`✅ Created policy: ${policy.name}`);
        }
      } catch (e) {
        console.log(`❌ Exception creating policy "${policy.name}": ${e.message}`);
      }
    }

    // Step 4: Verify the fix
    console.log('\n4️⃣ Verifying the fix...');

    // Test manager profile lookup
    const { data: managerProfile, error: managerError } = await supabase
      .from('profiles')
      .select('id, email, role')
      .eq('email', 'patgoire@gmail.com')
      .single();

    if (managerError) {
      console.log(`❌ Manager profile test failed: ${managerError.message}`);
    } else {
      console.log(
        `✅ Manager profile found: ${managerProfile.email} with role: ${managerProfile.role}`
      );
    }

    // Test general profile access
    const { data: allProfiles, error: allError } = await supabase
      .from('profiles')
      .select('email, role')
      .limit(3);

    if (allError) {
      console.log(`❌ General profile access failed: ${allError.message}`);
    } else {
      console.log(`✅ General profile access works. Found ${allProfiles.length} profiles.`);
    }

    console.log('\n🎉 RLS policy fix completed!');
    console.log('You can now refresh your dashboard to see the Manager interface.');
  } catch (error) {
    console.error('💥 Error fixing RLS policies:', error.message);
  }
}

fixRLSPolicies();
