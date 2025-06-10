export enum UserRole {
  MANAGER = 'MANAGER',
  DOORMAN = 'DOORMAN',
  PROMOTER = 'PROMOTER',
  DJ = 'DJ', // Added missing role
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
