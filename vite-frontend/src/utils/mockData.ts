import { Guest, User, Event } from './types';
// Mock users
export const users: User[] = [{
  id: 'u1',
  name: 'John Doorman',
  role: 'doorman'
}, {
  id: 'u2',
  name: 'Mary Manager',
  role: 'manager'
}, {
  id: 'u3',
  name: 'Paul Promoter',
  role: 'promoter'
}, {
  id: 'u4',
  name: 'DJ Awesome',
  role: 'dj'
}];
// Mock guests
export const guests: Guest[] = [{
  id: 'g1',
  name: 'Alice Smith',
  email: 'alice@example.com',
  phone: '514-555-0101',
  additionalGuests: 2,
  status: 'approved',
  qrCode: 'qr-code-alice',
  addedBy: 'Paul Promoter',
  addedById: 'u3',
  timestamp: '2023-07-15T20:00:00Z'
}, {
  id: 'g2',
  name: 'Bob Johnson',
  email: 'bob@example.com',
  phone: '514-555-0102',
  additionalGuests: 0,
  status: 'pending',
  addedBy: 'DJ Awesome',
  addedById: 'u4',
  timestamp: '2023-07-15T21:00:00Z'
}, {
  id: 'g3',
  name: 'Charlie Brown',
  email: 'charlie@example.com',
  phone: '514-555-0103',
  additionalGuests: 1,
  status: 'checked-in',
  qrCode: 'qr-code-charlie',
  addedBy: 'Paul Promoter',
  addedById: 'u3',
  timestamp: '2023-07-15T19:30:00Z'
}, {
  id: 'g4',
  name: 'Diana Prince',
  email: 'diana@example.com',
  phone: '514-555-0104',
  additionalGuests: 3,
  status: 'denied',
  addedBy: 'DJ Awesome',
  addedById: 'u4',
  timestamp: '2023-07-15T22:00:00Z'
}];
// Mock events
export const events: Event[] = [{
  id: 'e1',
  name: 'Saturday Night Fever',
  date: '2023-07-15',
  guestListCap: 100,
  guests: guests
}];
// Helper function to simulate API calls
export const fetchData = <T,>(data: T, delay = 500): Promise<T> => {
  return new Promise(resolve => {
    setTimeout(() => resolve(data), delay);
  });
};