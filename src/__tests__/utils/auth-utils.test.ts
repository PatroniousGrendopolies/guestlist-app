import { hasRole, hasAnyRole } from '@/lib/auth/role-utils';
import { UserRole } from '@/types/enums';
import '@testing-library/jest-dom';

// Define mock users directly in this file since test-utils.ts doesn't exist
const mockUsers = {
  manager: { id: '1', name: 'Manager', email: 'manager@example.com', role: UserRole.MANAGER },
  doorman: { id: '2', name: 'Doorman', email: 'doorman@example.com', role: UserRole.DOORPERSON },
  promoter: { id: '3', name: 'Promoter', email: 'promoter@example.com', role: UserRole.PROMOTER },
  dj: { id: '4', name: 'DJ', email: 'dj@example.com', role: UserRole.DJ },
  guest: { id: '5', name: 'Guest', email: 'guest@example.com', role: UserRole.GUEST },
};

describe('Auth Utilities', () => {
  describe('hasRole function', () => {
    it('returns true when user has the specified role', () => {
      expect(hasRole(mockUsers.manager, UserRole.MANAGER)).toBe(true);
      expect(hasRole(mockUsers.doorman, UserRole.DOORPERSON)).toBe(true);
      expect(hasRole(mockUsers.promoter, UserRole.PROMOTER)).toBe(true);
      expect(hasRole(mockUsers.dj, UserRole.DJ)).toBe(true);
      expect(hasRole(mockUsers.guest, UserRole.GUEST)).toBe(true);
    });

    it('returns false when user does not have the specified role', () => {
      expect(hasRole(mockUsers.manager, UserRole.DOORPERSON)).toBe(false);
      expect(hasRole(mockUsers.doorman, UserRole.GUEST)).toBe(false);
      expect(hasRole(mockUsers.guest, UserRole.MANAGER)).toBe(false);
    });

    it('returns false when user is null or undefined', () => {
      expect(hasRole(null, UserRole.MANAGER)).toBe(false);
      expect(hasRole(undefined, UserRole.MANAGER)).toBe(false);
    });

    it('returns false when user has no role property', () => {
      const userWithoutRole = { id: '4', name: 'No Role', role: undefined };
      expect(hasRole(userWithoutRole, UserRole.MANAGER)).toBe(false);
    });
  });

  describe('hasAnyRole function', () => {
    it('returns true when user has any of the specified roles', () => {
      expect(hasAnyRole(mockUsers.manager, [UserRole.MANAGER, UserRole.DOORPERSON])).toBe(true);
      expect(hasAnyRole(mockUsers.doorman, [UserRole.MANAGER, UserRole.DOORPERSON])).toBe(true);
      expect(hasAnyRole(mockUsers.guest, [UserRole.GUEST, UserRole.PROMOTER])).toBe(true);
    });

    it('returns false when user does not have any of the specified roles', () => {
      expect(hasAnyRole(mockUsers.guest, [UserRole.MANAGER, UserRole.DOORPERSON])).toBe(false);
      expect(hasAnyRole(mockUsers.manager, [UserRole.GUEST, UserRole.DJ])).toBe(false);
    });

    it('returns false when user is null or undefined', () => {
      expect(hasAnyRole(null, [UserRole.MANAGER, UserRole.DOORPERSON])).toBe(false);
      expect(hasAnyRole(undefined, [UserRole.MANAGER, UserRole.DOORPERSON])).toBe(false);
    });

    it('returns false when roles array is empty', () => {
      expect(hasAnyRole(mockUsers.manager, [])).toBe(false);
    });
  });
});
