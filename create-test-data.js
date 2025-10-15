// Create test data for Manager Event Details page
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
  console.error('Missing Supabase credentials. Make sure .env.local exists.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function createTestData() {
  console.log('🚀 Creating test data for Manager Event Details page...\n');

  try {
    // 1. Get the default venue
    console.log('1. Fetching venue...');
    const { data: venues, error: venueError } = await supabase
      .from('venues')
      .select('id, name')
      .limit(1);

    if (venueError) throw venueError;
    if (!venues || venues.length === 0) {
      throw new Error('No venue found. Run migrations first!');
    }

    const venue = venues[0];
    console.log(`   ✅ Found venue: ${venue.name} (${venue.id})\n`);

    // 2. Create a test event
    console.log('2. Creating test event...');
    const { data: event, error: eventError } = await supabase
      .from('events')
      .insert({
        name: 'Saturday Night Sessions - Test Event',
        date: '2025-10-18',
        day_of_week: 'saturday',
        venue_id: venue.id,
        max_total_capacity: 150,
        status: 'active',
      })
      .select()
      .single();

    if (eventError) throw eventError;
    console.log(`   ✅ Created event: ${event.name} (${event.id})\n`);

    // 3. Create test guests
    console.log('3. Creating test guests...');
    const { data: guests, error: guestsError } = await supabase
      .from('guests')
      .insert([
        {
          first_name: 'Sarah',
          last_name: 'Martinez',
          email: `sarah.martinez.${Date.now()}@example.com`,
          phone: '+1 (555) 123-4567',
          instagram_handle: '@sarahmartinez',
        },
        {
          first_name: 'James',
          last_name: 'Chen',
          email: `james.chen.${Date.now()}@example.com`,
          phone: '+1 (555) 987-6543',
        },
        {
          first_name: 'Emily',
          last_name: 'Rodriguez',
          email: `emily.rodriguez.${Date.now()}@example.com`,
          phone: '+1 (555) 456-7890',
          instagram_handle: '@emilyrodriguez',
        },
        {
          first_name: 'Michael',
          last_name: 'Brown',
          email: `michael.brown.${Date.now()}@example.com`,
          phone: '+1 (555) 234-5678',
        },
        {
          first_name: 'Jessica',
          last_name: 'Taylor',
          email: `jessica.taylor.${Date.now()}@example.com`,
          phone: '+1 (555) 345-6789',
          instagram_handle: '@jesstaylor',
        },
      ])
      .select();

    if (guestsError) throw guestsError;
    console.log(`   ✅ Created ${guests.length} test guests\n`);

    // 4. Create guest lists
    console.log('4. Creating guest lists...');
    const { data: guestLists, error: listError } = await supabase
      .from('guest_lists')
      .insert([
        {
          event_id: event.id,
          list_type: 'dj_list',
          name: 'DJ Shadow Guest List',
          max_capacity: 50,
          status: 'active',
        },
        {
          event_id: event.id,
          list_type: 'promoter_list',
          name: 'Promoter Marcus List',
          max_capacity: 40,
          status: 'active',
        },
        {
          event_id: event.id,
          list_type: 'staff_list',
          name: 'Staff Alex List',
          max_capacity: 30,
          status: 'active',
        },
      ])
      .select();

    if (listError) throw listError;
    console.log(`   ✅ Created ${guestLists.length} guest lists\n`);

    // 5. Create guest list entries
    console.log('5. Adding guests to lists...');
    const { data: entries, error: entriesError } = await supabase
      .from('guest_list_entries')
      .insert([
        // DJ list - approved
        {
          guest_list_id: guestLists[0].id,
          guest_id: guests[0].id,
          status: 'approved',
          plus_ones_requested: 2,
        },
        {
          guest_list_id: guestLists[0].id,
          guest_id: guests[4].id,
          status: 'approved',
          plus_ones_requested: 1,
        },
        // Promoter list - approved
        {
          guest_list_id: guestLists[1].id,
          guest_id: guests[1].id,
          status: 'approved',
          plus_ones_requested: 1,
        },
        // Staff list - pending
        {
          guest_list_id: guestLists[2].id,
          guest_id: guests[2].id,
          status: 'pending',
          plus_ones_requested: 3,
        },
        // DJ list - denied
        {
          guest_list_id: guestLists[0].id,
          guest_id: guests[3].id,
          status: 'denied',
          plus_ones_requested: 0,
        },
      ])
      .select();

    if (entriesError) throw entriesError;
    console.log(`   ✅ Added ${entries.length} entries to guest lists\n`);

    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('✅ Test data created successfully!\n');
    console.log(`Event ID: ${event.id}`);
    console.log(`Test URL: http://localhost:3002/manager/events/${event.id}`);
    console.log('\n⚠️  Note: Authentication is disabled, so you can access directly');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
  } catch (error) {
    console.error('❌ Error creating test data:', error);
    process.exit(1);
  }
}

createTestData();
