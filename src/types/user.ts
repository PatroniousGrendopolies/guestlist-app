// src/types/user.ts

export enum UserRole {
  Doorman = 'doorman',
  Manager = 'manager',
  Promoter = 'promoter',
  DJ = 'dj',
  // We might also want a 'Guest' role if guests can have accounts,
  // or an 'Admin' role for superuser privileges.
  // For now, sticking to the PRD roles.
}

export interface UserProfile {
  id: string; // Corresponds to Supabase auth.users.id
  email?: string; // Corresponds to Supabase auth.users.email
  role: UserRole;
  firstName?: string;
  lastName?: string;
  // Add other profile-specific fields here as needed
}
