import { hasRole, hasAnyRole } from '@/lib/auth/role-utils';
import { UserRole } from '@/types/enums';
import { mockUsers } from './test-utils';
import '@testing-library/jest-dom';

describe('Auth Utilities', () => {
  describe('hasRole function', () => {
    it('returns true when user has the specified role', () => {
      expect(hasRole(mockUsers.manager, UserRole.MANAGER)).toBe(true);
      expect(hasRole(mockUsers.doorman, UserRole.DOORMAN)).toBe(true);
      expect(hasRole(mockUsers.promoter, UserRole.PROMOTER)).toBe(true);
      expect(hasRole(mockUsers.dj, UserRole.DJ)).toBe(true);
      expect(hasRole(mockUsers.guest, UserRole.GUEST)).toBe(true);
    });

    it('returns false when user does not have the specified role', () => {
      expect(hasRole(mockUsers.manager, UserRole.DOORMAN)).toBe(false);
      expect(hasRole(mockUsers.doorman, UserRole.GUEST)).toBe(false);
      expect(hasRole(mockUsers.guest, UserRole.MANAGER)).toBe(false);
    });

    it('returns false when user is null or undefined', () => {
      expect(hasRole(null, UserRole.MANAGER)).toBe(false);
      expect(hasRole(undefined, UserRole.MANAGER)).toBe(false);
    });

    it('returns false when user has no role property', () => {
      const userWithoutRole = { id: '4', name: 'No Role' };
      expect(hasRole(userWithoutRole, UserRole.MANAGER)).toBe(false);
    });
  });

  describe('hasAnyRole function', () => {
    it('returns true when user has any of the specified roles', () => {
      expect(hasAnyRole(mockUsers.manager, [UserRole.MANAGER, UserRole.DOORMAN])).toBe(true);
      expect(hasAnyRole(mockUsers.doorman, [UserRole.MANAGER, UserRole.DOORMAN])).toBe(true);
      expect(hasAnyRole(mockUsers.guest, [UserRole.GUEST, UserRole.PROMOTER])).toBe(true);
    });

    it('returns false when user does not have any of the specified roles', () => {
      expect(hasAnyRole(mockUsers.guest, [UserRole.MANAGER, UserRole.DOORMAN])).toBe(false);
      expect(hasAnyRole(mockUsers.manager, [UserRole.GUEST, UserRole.DJ])).toBe(false);
    });

    it('returns false when user is null or undefined', () => {
      expect(hasAnyRole(null, [UserRole.MANAGER, UserRole.STAFF])).toBe(false);
      expect(hasAnyRole(undefined, [UserRole.MANAGER, UserRole.STAFF])).toBe(false);
    });

    it('returns false when roles array is empty', () => {
      expect(hasAnyRole(mockUsers.manager, [])).toBe(false);
    });
  });
});
