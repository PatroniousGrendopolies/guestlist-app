import { UserRole } from '@/types/enums';
import { auth } from '@/lib/auth/auth';
import { redirect } from 'next/navigation';

/**
 * Role-based access control utility functions
 */

/**
 * Check if the current user has one of the required roles
 * @param requiredRoles - Array of roles that are allowed to access the resource
 * @returns boolean - Whether the user has access
 */
export async function hasRole(requiredRoles: UserRole[]): Promise<boolean> {
  const session = await auth();

  if (!session || !session.user || !session.user.role) {
    return false;
  }

  return requiredRoles.includes(session.user.role);
}

/**
 * Higher-order function to protect routes based on user roles
 * @param requiredRoles - Array of roles that are allowed to access the resource
 * @param redirectPath - Path to redirect to if user doesn't have access
 */
export async function withRoleProtection(
  requiredRoles: UserRole[],
  redirectPath: string = '/unauthorized'
) {
  const hasAccess = await hasRole(requiredRoles);

  if (!hasAccess) {
    redirect(redirectPath);
  }
}

/**
 * Role-specific protection functions
 */

export async function protectManagerRoute(redirectPath: string = '/unauthorized') {
  return withRoleProtection([UserRole.MANAGER], redirectPath);
}

export async function protectDoormanRoute(redirectPath: string = '/unauthorized') {
  return withRoleProtection([UserRole.DOORMAN], redirectPath);
}

export async function protectPromoterRoute(redirectPath: string = '/unauthorized') {
  return withRoleProtection([UserRole.PROMOTER], redirectPath);
}

export async function protectDJRoute(redirectPath: string = '/unauthorized') {
  return withRoleProtection([UserRole.DJ], redirectPath);
}

export async function protectStaffRoute(redirectPath: string = '/unauthorized') {
  return withRoleProtection(
    [UserRole.MANAGER, UserRole.DOORMAN, UserRole.PROMOTER, UserRole.DJ],
    redirectPath
  );
}
