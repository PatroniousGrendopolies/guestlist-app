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

async function debugEventCreation() {
  console.log('🔍 Debugging event creation...');
  
  try {
    // Get venue ID first
    const { data: venues, error: venueError } = await supabase
      .from('venues')
      .select('id')
      .limit(1);
    
    if (venueError || !venues || venues.length === 0) {
      console.log('❌ No venues found:', venueError);
      return;
    }
    
    const venueId = venues[0].id;
    console.log('✅ Found venue ID:', venueId);
    
    // Try creating a minimal event to see what fields are required
    const testEventData = {
      name: 'Test Event',
      date: '2025-01-01',
      day_of_week: 'wednesday',
      venue_id: venueId,
      max_total_capacity: 75,
      status: 'active',
      created_by_user_id: 'test-user-id'
    };
    
    console.log('🧪 Testing event creation with minimal data:', testEventData);
    
    const { data, error } = await supabase
      .from('events')
      .insert([testEventData])
      .select()
      .single();
    
    if (error) {
      console.log('❌ Event creation failed:', error);
      console.log('Error details:', {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code
      });
    } else {
      console.log('✅ Event created successfully:', data);
      
      // Clean up test event
      const { error: deleteError } = await supabase
        .from('events')
        .delete()
        .eq('id', data.id);
        
      if (deleteError) {
        console.log('⚠️ Could not delete test event:', deleteError.message);
      } else {
        console.log('🧹 Test event cleaned up');
      }
    }
    
  } catch (error) {
    console.error('💥 Debug failed:', error);
  }
}

debugEventCreation();