export enum UserRole {
  OWNER = 'OWNER',
  MANAGER = 'MANAGER',
  ASSISTANT_MANAGER = 'ASSISTANT_MANAGER',
  DOORPERSON = 'DOORPERSON',
  STAFF = 'STAFF',
  PROMOTER = 'PROMOTER',
  DJ = 'DJ',
  VIP = 'VIP',
  GUEST = 'GUEST',
}

// Defines the shape of the user object used in the application
export interface User {
  id: string;
  name?: string | null;
  email?: string | null;
  role: UserRole;
}

// This file can be expanded with other shared types as the application grows.
