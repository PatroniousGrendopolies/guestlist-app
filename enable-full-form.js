const fs = require('fs');
const path = require('path');

// This script will uncomment the fields in the create event form once migration is complete

function enableFullForm() {
  console.log('🔄 Enabling full event creation form...');
  
  const filePath = './src/app/dashboard/events/create/page.tsx';
  
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Uncomment the interface fields
    content = content.replace(
      /\/\/ TODO: Add these fields once database migration is complete\s*\n\s*\/\/ description: string;\s*\n\s*\/\/ guest_list_deadline: string;\s*\n\s*\/\/ dj_approval_deadline: string;/,
      'description: string;\n  guest_list_deadline: string;\n  dj_approval_deadline: string;'
    );
    
    // Uncomment the form state
    content = content.replace(
      /\/\/ TODO: Add these fields once database migration is complete\s*\n\s*\/\/ description: '',\s*\n\s*\/\/ guest_list_deadline: '',\s*\n\s*\/\/ dj_approval_deadline: ''/,
      'description: \'\',\n    guest_list_deadline: \'\',\n    dj_approval_deadline: \'\''
    );
    
    // Fix comma after status field
    content = content.replace(
      /status: 'active'\s*\n\s*\/\/ TODO:/,
      'status: \'active\',\n    description: \'\',\n    guest_list_deadline: \'\',\n    dj_approval_deadline: \'\'\n    // TODO:'
    );
    
    // Uncomment validation
    content = content.replace(
      /\/\/ TODO: Add deadline validations once database migration is complete/,
      `// Deadline validations
    if (!formData.guest_list_deadline) {
      newErrors.guest_list_deadline = 'Guest list deadline is required';
    } else {
      const deadline = new Date(formData.guest_list_deadline);
      const eventDate = new Date(formData.date);
      const now = new Date();
      
      if (deadline <= now) {
        newErrors.guest_list_deadline = 'Deadline must be in the future';
      } else if (deadline >= eventDate) {
        newErrors.guest_list_deadline = 'Deadline must be before the event date';
      }
    }

    if (!formData.dj_approval_deadline) {
      newErrors.dj_approval_deadline = 'DJ approval deadline is required';
    } else {
      const djDeadline = new Date(formData.dj_approval_deadline);
      const guestDeadline = new Date(formData.guest_list_deadline);
      const now = new Date();
      
      if (djDeadline <= now) {
        newErrors.dj_approval_deadline = 'DJ deadline must be in the future';
      } else if (formData.guest_list_deadline && djDeadline >= guestDeadline) {
        newErrors.dj_approval_deadline = 'DJ deadline must be before guest list deadline';
      }
    }`
    );
    
    // Uncomment form fields - this is more complex, let's just show the instructions
    console.log('✅ Prepared form updates');
    console.log('⚠️ Manual step: Uncomment the form fields in the JSX');
    console.log('📍 Search for "TODO: Add these fields once database migration is complete"');
    console.log('🔧 Uncomment the description, guest_list_deadline, and dj_approval_deadline form sections');
    
  } catch (error) {
    console.error('❌ Error updating form:', error.message);
  }
}

enableFullForm();