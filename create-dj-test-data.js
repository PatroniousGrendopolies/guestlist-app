// create-dj-test-data.js
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Load .env.local
const envPath = path.join(__dirname, '.env.local');
const envContent = fs.readFileSync(envPath, 'utf8');
const env = {};
envContent.split('\n').forEach(line => {
  const [key, ...valueParts] = line.split('=');
  if (key && valueParts.length) {
    env[key.trim()] = valueParts.join('=').trim();
  }
});

const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase credentials in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function createDJTestData() {
  try {
    console.log('Creating DJ test data...\n');

    // 1. Create a test DJ profile
    const djId = '11111111-1111-1111-1111-111111111111'; // UUID for DJ Shadow
    const { data: djProfile, error: djError } = await supabase
      .from('profiles')
      .upsert(
        {
          id: djId,
          email: 'djshadow@test.com',
          first_name: 'Shadow',
          last_name: 'DJ',
          stage_name: 'DJ Shadow',
          role: 'DJ',
          account_status: 'active',
          default_capacity: 75,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
        { onConflict: 'id' }
      )
      .select()
      .single();

    if (djError) {
      console.error('❌ Error creating DJ profile:', djError);
      return;
    }

    console.log('✅ Created DJ profile:', djProfile.stage_name);

    // 2. Update the "DJ Shadow Guest List" to be owned by this DJ
    const { data: updatedList, error: listError } = await supabase
      .from('guest_lists')
      .update({ created_by_user_id: djId })
      .eq('name', 'DJ Shadow Guest List')
      .select()
      .single();

    if (listError) {
      console.error('❌ Error updating guest list:', listError);
      return;
    }

    console.log('✅ Updated guest list to be owned by DJ Shadow');
    console.log('   Guest List ID:', updatedList.id);

    // 3. Create a second test DJ for variety
    const dj2Id = '22222222-2222-2222-2222-222222222222';
    const { data: dj2Profile, error: dj2Error } = await supabase
      .from('profiles')
      .upsert(
        {
          id: dj2Id,
          email: 'djmarcus@test.com',
          first_name: 'Marcus',
          last_name: 'DJ',
          stage_name: 'DJ Marcus',
          role: 'DJ',
          account_status: 'active',
          default_capacity: 50,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
        { onConflict: 'id' }
      )
      .select()
      .single();

    if (dj2Error) {
      console.error('❌ Error creating DJ Marcus profile:', dj2Error);
    } else {
      console.log('✅ Created DJ profile:', dj2Profile.stage_name);
    }

    // 4. Create a guest list for DJ Marcus on the same event
    const eventId = 'a1416182-5a82-4219-8bf9-a514fa38d40c'; // Saturday Night Sessions
    const { data: marcusList, error: marcusListError } = await supabase
      .from('guest_lists')
      .insert({
        event_id: eventId,
        created_by_user_id: dj2Id,
        list_type: 'dj_list',
        name: 'DJ Marcus List',
        max_capacity: 50,
        max_plus_size: 5,
        current_capacity: 0,
        status: 'active',
        conversion_rate: 0,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (marcusListError) {
      console.error('❌ Error creating DJ Marcus guest list:', marcusListError);
    } else {
      console.log('✅ Created guest list for DJ Marcus');
      console.log('   Guest List ID:', marcusList.id);
    }

    console.log('\n✅ DJ test data created successfully!');
    console.log('\nTest DJ credentials:');
    console.log('DJ Shadow:');
    console.log('  - User ID:', djId);
    console.log('  - Email: djshadow@test.com');
    console.log('  - Guest List ID:', updatedList.id);
    console.log('\nDJ Marcus:');
    console.log('  - User ID:', dj2Id);
    console.log('  - Email: djmarcus@test.com');
    if (marcusList) {
      console.log('  - Guest List ID:', marcusList.id);
    }
    console.log('\nTest URL:');
    console.log(`http://localhost:3002/api/dj/guest-lists?dj_user_id=${djId}`);
  } catch (error) {
    console.error('❌ Error creating DJ test data:', error);
  }
}

createDJTestData();
