// Enum definitions that match the Prisma schema
// These are defined here to avoid relying on the Prisma client before it's installed

export enum UserRole {
  MANAGER = 'MANAGER',
  DOORMAN = 'DOORMAN',
  PROMOTER = 'PROMOTER',
  DJ = 'DJ',
  GUEST = 'GUEST',
}

export enum EntryStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  DENIED = 'DENIED',
  CHECKED_IN = 'CHECKED_IN',
  NO_SHOW = 'NO_SHOW',
}
