export type UserRole = 'doorman' | 'manager' | 'promoter' | 'dj' | 'guest';
export interface Guest {
  id: string;
  name: string;
  email: string;
  phone: string;
  additionalGuests: number;
  status: 'pending' | 'approved' | 'denied' | 'checked-in';
  qrCode?: string;
  addedBy: string;
  addedById: string;
  timestamp: string;
}
export interface User {
  id: string;
  name: string;
  role: UserRole;
  email?: string;
}
export interface Event {
  id: string;
  name: string;
  date: string;
  guestListCap: number;
  guests: Guest[];
}