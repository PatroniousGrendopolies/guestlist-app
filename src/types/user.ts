// src/types/user.ts

export enum UserRole {
  DoorStaff = 'door_staff',
  Manager = 'manager',
  Staff = 'staff',
  Promoter = 'promoter',
  DJ = 'dj',
}

export interface UserProfile {
  id: string; // Corresponds to Supabase auth.users.id
  email?: string; // Corresponds to Supabase auth.users.email
  role: UserRole;
  firstName?: string;
  lastName?: string;
  // Add other profile-specific fields here as needed
}
