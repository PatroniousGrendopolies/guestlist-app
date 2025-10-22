'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

/**
 * Promoter Login Redirect
 *
 * This page redirects to the centralized authentication page.
 * After login, users are automatically routed to the correct dashboard
 * based on their role in the database.
 */
export default function PromoterLoginPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to centralized auth with return URL
    router.push('/auth/login?redirect=/promoter/dashboard');
  }, [router]);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
        <p className="text-gray-600">Redirecting to login...</p>
      </div>
    </div>
  );
}
