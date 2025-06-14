// src/types/user.ts
import { UserRole } from './enums';

export interface UserProfile {
  id: string; // Corresponds to Supabase auth.users.id
  email?: string; // Corresponds to Supabase auth.users.email
  role: UserRole;
  firstName?: string;
  lastName?: string;
  // Add other profile-specific fields here as needed
}

// Re-export UserRole for backward compatibility
export { UserRole };
