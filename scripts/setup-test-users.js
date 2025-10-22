/**
 * Setup test user accounts in Supabase Auth
 *
 * This script creates test accounts for Manager, Staff, and Promoter roles
 * using the Supabase Admin API.
 */

const { createClient } = require('@supabase/supabase-js');

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

const testUsers = [
  {
    email: 'manager@venue.com',
    password: 'VenueManager123!',
    role: 'MANAGER',
    userData: {
      first_name: 'Alex',
      last_name: 'Manager',
      phone: '+1-555-0101'
    }
  },
  {
    email: 'staff.member@venue.com',
    password: 'StaffMember123!',
    role: 'STAFF',
    userData: {
      first_name: 'Staff',
      last_name: 'Member',
      phone: '+1-555-0102'
    }
  },
  {
    email: 'promoter@venue.com',
    password: 'PromoterTest123!',
    role: 'PROMOTER',
    userData: {
      first_name: 'Promo',
      last_name: 'Smith',
      phone: '+1-555-0103'
    }
  }
];

async function setupTestUsers() {
  console.log('Setting up test user accounts...\n');

  for (const user of testUsers) {
    console.log(`Processing ${user.email} (${user.role})...`);

    try {
      // Check if user already exists in auth
      const { data: existingUsers } = await supabase.auth.admin.listUsers();
      const existingAuth = existingUsers?.users?.find(u => u.email === user.email);

      if (existingAuth) {
        console.log(`  ✓ Auth account already exists (ID: ${existingAuth.id})`);

        // Check if profile exists
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', existingAuth.id)
          .single();

        if (!profile) {
          console.log('  → Creating profile...');
          const { error: profileError } = await supabase
            .from('profiles')
            .insert({
              id: existingAuth.id,
              email: user.email,
              role: user.role,
              first_name: user.userData.first_name,
              last_name: user.userData.last_name,
              phone: user.userData.phone
            });

          if (profileError) {
            console.error(`  ✗ Error creating profile: ${profileError.message}`);
          } else {
            console.log(`  ✓ Profile created`);
          }
        } else {
          console.log(`  ✓ Profile exists (Role: ${profile.role})`);
        }
      } else {
        // Create new auth user
        console.log('  → Creating auth account...');
        const { data: authData, error: authError } = await supabase.auth.admin.createUser({
          email: user.email,
          password: user.password,
          email_confirm: true,
          user_metadata: {
            first_name: user.userData.first_name,
            last_name: user.userData.last_name
          }
        });

        if (authError) {
          console.error(`  ✗ Error creating auth account: ${authError.message}`);
          continue;
        }

        console.log(`  ✓ Auth account created (ID: ${authData.user.id})`);

        // Create profile
        console.log('  → Creating profile...');
        const { error: profileError } = await supabase
          .from('profiles')
          .insert({
            id: authData.user.id,
            email: user.email,
            role: user.role,
            first_name: user.userData.first_name,
            last_name: user.userData.last_name,
            phone: user.userData.phone
          });

        if (profileError) {
          console.error(`  ✗ Error creating profile: ${profileError.message}`);
        } else {
          console.log(`  ✓ Profile created`);
        }
      }

      console.log('');
    } catch (error) {
      console.error(`  ✗ Unexpected error: ${error.message}\n`);
    }
  }

  console.log('Test user setup complete!');
  console.log('\nTest Credentials:');
  console.log('================');
  testUsers.forEach(user => {
    console.log(`${user.role}: ${user.email} / ${user.password}`);
  });
}

setupTestUsers().catch(console.error);
