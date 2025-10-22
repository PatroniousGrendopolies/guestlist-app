'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

/**
 * Root page redirects to centralized login
 *
 * Authenticated users will be automatically routed to their
 * role-specific dashboard by the auth system.
 */
export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push('/auth/login');
  }, [router]);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
        <p className="text-gray-600">Redirecting...</p>
      </div>
    </div>
  );
}
