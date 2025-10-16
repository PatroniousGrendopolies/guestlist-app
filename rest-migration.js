const https = require('https');

// Supabase project details
const supabaseUrl = 'https://ohkrtsyqbfphsqessdzj.supabase.co';
const serviceRoleKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9oa3J0c3lxYmZwaHNxZXNzZHpqIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0OTQwMTgzOSwiZXhwIjoyMDY0OTc3ODM5fQ.zI9ndXiMmOJvwxFnnjggkKxVFRPHCLo-62fXRlhn6N8';

function makeRequest(sql) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify({ query: sql });

    const options = {
      hostname: 'ohkrtsyqbfphsqessdzj.supabase.co',
      path: '/rest/v1/rpc/query',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${serviceRoleKey}`,
        apikey: serviceRoleKey,
        'Content-Length': data.length,
      },
    };

    const req = https.request(options, res => {
      let body = '';
      res.on('data', chunk => (body += chunk));
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve({ success: true, data: body });
        } else {
          reject({ success: false, status: res.statusCode, error: body });
        }
      });
    });

    req.on('error', err => reject({ success: false, error: err.message }));
    req.write(data);
    req.end();
  });
}

async function applyRestMigration() {
  console.log('🚀 Attempting migration via REST API...');

  const migrations = [
    'ALTER TABLE events ADD COLUMN IF NOT EXISTS description TEXT;',
    'ALTER TABLE events ADD COLUMN IF NOT EXISTS guest_list_deadline TIMESTAMP WITH TIME ZONE;',
    'ALTER TABLE events ADD COLUMN IF NOT EXISTS dj_approval_deadline TIMESTAMP WITH TIME ZONE;',
  ];

  for (const sql of migrations) {
    try {
      console.log(`📝 Executing: ${sql}`);
      const result = await makeRequest(sql);
      console.log('✅ Success');
    } catch (error) {
      console.log(`❌ Failed: ${error.error || error.message}`);
      console.log('Status:', error.status);
    }
  }

  console.log('\n🧪 Manual verification needed at Supabase Dashboard');
  console.log('🌐 https://supabase.com/dashboard/project/ohkrtsyqbfphsqessdzj/editor');
}

applyRestMigration();
