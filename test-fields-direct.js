const { createClient } = require('@supabase/supabase-js');

// Use service role for admin access
const supabaseUrl = 'https://ohkrtsyqbfphsqessdzj.supabase.co';
const serviceRoleKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9oa3J0c3lxYmZwaHNxZXNzZHpqIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0OTQwMTgzOSwiZXhwIjoyMDY0OTc3ODM5fQ.zI9ndXiMmOJvwxFnnjggkKxVFRPHCLo-62fXRlhn6N8';

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

async function testFieldsDirectly() {
  console.log('🧪 Testing which fields exist by attempting to use them...');
  
  try {
    // First get a venue ID for our test
    const { data: venues, error: venueError } = await supabase
      .from('venues')
      .select('id')
      .limit(1);
    
    if (venueError || !venues || venues.length === 0) {
      console.log('❌ No venues found, cannot test event creation');
      return;
    }
    
    const venueId = venues[0].id;
    console.log('✅ Found venue ID:', venueId);
    
    // Test if we can select the new fields (this will fail if they don't exist)
    console.log('\n🔍 Testing field existence with SELECT...');
    
    const { data: selectTest, error: selectError } = await supabase
      .from('events')
      .select('id, name, description, guest_list_deadline, dj_approval_deadline')
      .limit(1);
    
    if (selectError) {
      console.log('❌ Fields missing:', selectError.message);
      if (selectError.message.includes('description')) {
        console.log('🔧 Missing: description field');
      }
      if (selectError.message.includes('guest_list_deadline')) {
        console.log('🔧 Missing: guest_list_deadline field');
      }
      if (selectError.message.includes('dj_approval_deadline')) {
        console.log('🔧 Missing: dj_approval_deadline field');
      }
      
      console.log('\n📝 REQUIRED SQL MIGRATION:');
      console.log('ALTER TABLE events ADD COLUMN IF NOT EXISTS description TEXT;');
      console.log('ALTER TABLE events ADD COLUMN IF NOT EXISTS guest_list_deadline TIMESTAMP WITH TIME ZONE;');
      console.log('ALTER TABLE events ADD COLUMN IF NOT EXISTS dj_approval_deadline TIMESTAMP WITH TIME ZONE;');
      console.log('\n🌐 Execute at: https://supabase.com/dashboard/project/ohkrtsyqbfphsqessdzj/sql/new');
      
    } else {
      console.log('✅ All fields exist! Migration already complete.');
      console.log('🎉 Event form can be fully enabled.');
    }
    
  } catch (error) {
    console.error('💥 Test failed:', error);
  }
}

testFieldsDirectly();