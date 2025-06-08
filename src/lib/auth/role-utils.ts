import { UserRole } from '@/types/enums';

/**
 * Check if a user has a specific role
 * @param user The user object from the session
 * @param role The role to check
 * @returns boolean indicating if the user has the specified role
 */
export function hasRole(user: { role?: UserRole } | null | undefined, role: UserRole): boolean {
  if (!user || !user.role) {
    return false;
  }
  return user.role === role;
}

/**
 * Check if a user has any of the specified roles
 * @param user The user object from the session
 * @param roles Array of roles to check
 * @returns boolean indicating if the user has any of the specified roles
 */
export function hasAnyRole(
  user: { role?: UserRole } | null | undefined,
  roles: UserRole[]
): boolean {
  if (!user || !user.role || roles.length === 0) {
    return false;
  }
  return roles.includes(user.role);
}

/**
 * Check if a user has all of the specified roles
 * @param user The user object from the session
 * @param roles Array of roles to check
 * @returns boolean indicating if the user has all of the specified roles
 */
export function hasAllRoles(
  user: { role?: UserRole } | null | undefined,
  roles: UserRole[]
): boolean {
  if (!user || !user.role || roles.length === 0) {
    return false;
  }
  // This is a bit redundant since a user can only have one role in our current model,
  // but it's here for future extensibility if we move to a multi-role system
  return roles.every(role => user.role === role);
}
