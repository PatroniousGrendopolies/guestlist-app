// Enum definitions that match the database schema
// These are defined here to avoid relying on the Prisma client before it's installed

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

export enum EntryStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  DENIED = 'DENIED',
  CHECKED_IN = 'CHECKED_IN',
  NO_SHOW = 'NO_SHOW',
}
