/**
 * Comprehensive Test Data Creation Script
 *
 * This script creates realistic test data for the guestlist app:
 * - Test users for all roles (Manager, DJ, Staff, Promoter)
 * - Events (3 upcoming, 2 past)
 * - Guest lists for each role
 * - Guest entries with varied statuses (pending, approved, denied, checked-in)
 *
 * Run with: node scripts/create-comprehensive-test-data.js
 */

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase credentials in .env.local');
  console.error('Required: NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Test user credentials (documented for easy testing)
const TEST_USERS = {
  managers: [
    { email: 'manager@datcha.com', password: 'Manager123!', firstName: 'Sarah', lastName: 'Chen', role: 'MANAGER' },
    { email: 'manager2@datcha.com', password: 'Manager123!', firstName: 'Michael', lastName: 'Rodriguez', role: 'MANAGER' },
  ],
  djs: [
    { email: 'dj.shadow@music.com', password: 'DJShadow123!', firstName: 'DJ', lastName: 'Shadow', role: 'DJ' },
    { email: 'dj.luna@music.com', password: 'DJLuna123!', firstName: 'DJ', lastName: 'Luna', role: 'DJ' },
  ],
  staff: [
    { email: 'alex.staff@datcha.com', password: 'Staff123!', firstName: 'Alex', lastName: 'Thompson', role: 'STAFF' },
    { email: 'jamie.staff@datcha.com', password: 'Staff123!', firstName: 'Jamie', lastName: 'Kim', role: 'STAFF' },
  ],
  promoters: [
    { email: 'alex.promoter@marketing.com', password: 'Promoter123!', firstName: 'Alex', lastName: 'Martinez', role: 'PROMOTER' },
    { email: 'taylor.promoter@marketing.com', password: 'Promoter123!', firstName: 'Taylor', lastName: 'Johnson', role: 'PROMOTER' },
  ],
};

// Event data
const createEventData = (daysOffset, name, isPast = false) => {
  const date = new Date();
  date.setDate(date.getDate() + daysOffset);
  date.setHours(22, 0, 0, 0); // 10 PM

  const dayNames = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  const dayOfWeek = dayNames[date.getDay()];

  return {
    name,
    date: date.toISOString(),
    day_of_week: dayOfWeek,
    status: 'active',
    max_total_capacity: 300,
  };
};

async function createTestUsers() {
  console.log('\n📝 Creating test users...');
  const createdUsers = {};

  for (const [roleType, users] of Object.entries(TEST_USERS)) {
    createdUsers[roleType] = [];

    for (const userData of users) {
      try {
        // Create auth user
        const { data: authData, error: authError } = await supabase.auth.admin.createUser({
          email: userData.email,
          password: userData.password,
          email_confirm: true,
        });

        if (authError) {
          console.log(`⚠️  ${userData.email} might already exist, trying to fetch...`);

          // Try to get existing user
          const { data: { users }, error: listError } = await supabase.auth.admin.listUsers();
          const existingUser = users?.find(u => u.email === userData.email);

          if (existingUser) {
            console.log(`✓ Found existing user: ${userData.email}`);
            createdUsers[roleType].push({
              ...userData,
              id: existingUser.id,
            });
            continue;
          } else {
            throw authError;
          }
        }

        // Create profile
        const { error: profileError } = await supabase
          .from('profiles')
          .upsert({
            id: authData.user.id,
            email: userData.email,
            first_name: userData.firstName,
            last_name: userData.lastName,
            role: userData.role,
          });

        if (profileError) throw profileError;

        console.log(`✓ Created ${userData.role}: ${userData.email}`);
        createdUsers[roleType].push({
          ...userData,
          id: authData.user.id,
        });
      } catch (error) {
        console.error(`✗ Failed to create ${userData.email}:`, error.message);
      }
    }
  }

  return createdUsers;
}

async function createTestEvents(users) {
  console.log('\n📅 Creating test events...');

  const manager = users.managers[0];
  if (!manager) {
    throw new Error('No manager user found');
  }

  // Get or create venue
  let venue;
  const { data: existingVenues } = await supabase
    .from('venues')
    .select('*')
    .limit(1);

  if (existingVenues && existingVenues.length > 0) {
    venue = existingVenues[0];
    console.log(`✓ Using existing venue: ${venue.name}`);
  } else {
    const { data: newVenue, error: venueError } = await supabase
      .from('venues')
      .insert({
        name: 'Datcha Nightclub',
        address: '123 Main St, Montreal, QC',
      })
      .select()
      .single();

    if (venueError) throw venueError;
    venue = newVenue;
    console.log(`✓ Created venue: ${venue.name}`);
  }

  const events = [
    createEventData(3, 'Saturday Night Sessions'),    // 3 days from now
    createEventData(7, 'Summer Vibes'),               // 1 week from now
    createEventData(14, 'Full Moon Party'),           // 2 weeks from now
    createEventData(-7, 'Last Weekend Bash', true),   // 1 week ago
    createEventData(-14, 'New Year Kickoff', true),   // 2 weeks ago
  ];

  const createdEvents = [];
  for (const eventData of events) {
    try {
      const { data: event, error } = await supabase
        .from('events')
        .insert({
          ...eventData,
          venue_id: venue.id,
          created_by_user_id: manager.id,
        })
        .select()
        .single();

      if (error) throw error;

      console.log(`✓ Created event: ${event.name} (${event.date.split('T')[0]})`);
      createdEvents.push(event);
    } catch (error) {
      console.error(`✗ Failed to create event:`, error.message);
    }
  }

  return createdEvents;
}

async function createGuestListsAndEntries(events, users) {
  console.log('\n👥 Creating guest lists and entries...');

  for (const event of events) {
    const isPastEvent = new Date(event.date) < new Date();
    console.log(`\n  Event: ${event.name}`);

    // Create guest lists for each role type
    const guestLists = [];

    // DJ Lists
    for (const dj of users.djs) {
      const { data: guestList, error } = await supabase
        .from('guest_lists')
        .insert({
          event_id: event.id,
          name: `${dj.firstName} ${dj.lastName}`,
          list_type: 'dj_list',
          max_capacity: 75,
          created_by_user_id: dj.id,
        })
        .select()
        .single();

      if (!error) {
        guestLists.push({ ...guestList, ownerName: dj.firstName });
        console.log(`    ✓ Created DJ list: ${guestList.name}`);
      }
    }

    // Staff Lists
    for (const staff of users.staff) {
      const { data: guestList, error } = await supabase
        .from('guest_lists')
        .insert({
          event_id: event.id,
          name: `${staff.firstName} ${staff.lastName}`,
          list_type: 'staff_list',
          max_capacity: 5,
          created_by_user_id: staff.id,
        })
        .select()
        .single();

      if (!error) {
        guestLists.push({ ...guestList, ownerName: staff.firstName });
        console.log(`    ✓ Created Staff list: ${guestList.name}`);
      }
    }

    // Promoter Lists
    for (const promoter of users.promoters) {
      const { data: guestList, error } = await supabase
        .from('guest_lists')
        .insert({
          event_id: event.id,
          name: `${promoter.firstName} ${promoter.lastName}`,
          list_type: 'promoter_list',
          max_capacity: 20,
          created_by_user_id: promoter.id,
        })
        .select()
        .single();

      if (!error) {
        guestLists.push({ ...guestList, ownerName: promoter.firstName });
        console.log(`    ✓ Created Promoter list: ${guestList.name}`);
      }
    }

    // Create guest entries for each list
    await createGuestEntries(guestLists, event, isPastEvent);
  }
}

async function createGuestEntries(guestLists, event, isPastEvent) {
  const firstNames = ['Emma', 'Liam', 'Olivia', 'Noah', 'Ava', 'Ethan', 'Sophia', 'Mason', 'Isabella', 'William'];
  const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez'];

  for (const guestList of guestLists) {
    // Determine number of guests based on list type and whether it's past
    let numGuests;
    if (guestList.list_type === 'dj_list') {
      numGuests = isPastEvent ? 30 : 25; // DJs have more guests
    } else if (guestList.list_type === 'promoter_list') {
      numGuests = isPastEvent ? 12 : 8;
    } else {
      numGuests = isPastEvent ? 4 : 3;
    }

    for (let i = 0; i < numGuests; i++) {
      const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
      const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
      const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}${i}@email.com`;
      const phone = `+1${Math.floor(Math.random() * 9000000000 + 1000000000)}`;

      // Create guest
      const { data: guest, error: guestError } = await supabase
        .from('guests')
        .insert({
          first_name: firstName,
          last_name: lastName,
          email,
          phone,
          instagram_handle: Math.random() > 0.5 ? `@${firstName.toLowerCase()}${i}` : null,
        })
        .select()
        .single();

      if (guestError) {
        console.error(`      ✗ Failed to create guest: ${email}`);
        continue;
      }

      // Determine status and check-in
      let status = 'approved';
      let checkedInAt = null;

      if (!isPastEvent) {
        // For upcoming events: mix of approved and pending
        const rand = Math.random();
        if (rand < 0.15) status = 'pending';  // 15% pending
        else if (rand < 0.2) status = 'denied'; // 5% denied
      } else {
        // For past events: all approved, 80% checked in
        if (Math.random() < 0.8) {
          const eventDate = new Date(event.date);
          checkedInAt = new Date(eventDate.getTime() + Math.random() * 3 * 60 * 60 * 1000).toISOString(); // Checked in within 3 hours of event
        }
      }

      // Create guest list entry
      const plusOnes = Math.random() > 0.6 ? Math.floor(Math.random() * 3) : 0; // 40% have +1 to +3

      const { error: entryError } = await supabase
        .from('guest_list_entries')
        .insert({
          guest_list_id: guestList.id,
          guest_id: guest.id,
          plus_ones_requested: plusOnes,
          status,
          checked_in_at: checkedInAt,
          created_by_user_id: guestList.created_by_user_id,
        });

      if (entryError) {
        console.error(`      ✗ Failed to create entry for ${email}`);
      }
    }

    console.log(`      ✓ Created ${numGuests} guests for ${guestList.name}`);
  }
}

async function printCredentials(users) {
  console.log('\n\n═══════════════════════════════════════════════════════════');
  console.log('📋 TEST USER CREDENTIALS');
  console.log('═══════════════════════════════════════════════════════════\n');

  for (const [roleType, userList] of Object.entries(TEST_USERS)) {
    console.log(`${roleType.toUpperCase()}:`);
    for (const user of userList) {
      console.log(`  ${user.email}`);
      console.log(`  Password: ${user.password}`);
      console.log(`  Role: ${user.role}\n`);
    }
  }

  console.log('═══════════════════════════════════════════════════════════\n');
}

async function main() {
  console.log('🚀 Creating comprehensive test data for Guestlist App\n');

  try {
    const users = await createTestUsers();
    const events = await createTestEvents(users);
    await createGuestListsAndEntries(events, users);
    await printCredentials(users);

    console.log('✅ Test data creation complete!\n');
    console.log('You can now test the app with any of the credentials above.');
  } catch (error) {
    console.error('\n❌ Error creating test data:', error.message);
    console.error(error);
    process.exit(1);
  }
}

main();
