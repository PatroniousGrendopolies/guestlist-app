'use client';

import { useRouter } from 'next/navigation';

/**
 * Retrieves the current user from localStorage.
 * This is a client-side utility.
 * @returns The user object or null if not found.
 */
export const getUser = () => {
  if (typeof window === 'undefined') {
    return null;
  }
  const userStr = localStorage.getItem('user');
  if (userStr) {
    try {
      return JSON.parse(userStr);
    } catch (e) {
      console.error('Failed to parse user from localStorage', e);
      return null;
    }
  }
  return null;
};

/**
 * Signs the user out by clearing localStorage and redirecting to the login page.
 * This is a client-side utility and should be used in a component.
 */
export const useSignOut = () => {
  const router = useRouter();

  const signOut = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('user');
    }
    router.push('/auth/login');
    router.refresh(); // Ensures the page state is reset
  };

  return signOut;
};
