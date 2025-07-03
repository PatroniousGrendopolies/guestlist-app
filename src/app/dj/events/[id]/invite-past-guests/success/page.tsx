'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useParams, useSearchParams } from 'next/navigation';

function SuccessPageContent() {
  const [inviteCount, setInviteCount] = useState(0);
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Get the count from query params
    const count = parseInt(searchParams.get('count') || '0');
    setInviteCount(count);

    // Auto-redirect after 3 seconds
    const timeout = setTimeout(() => {
      router.push('/dj/dashboard');
    }, 3000);

    return () => clearTimeout(timeout);
  }, [router, searchParams]);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6">
      <div className="text-center max-w-md">
        <div className="mb-6">
          <div className="w-20 h-20 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-2xl font-light mb-2">Invitations Sent!</h1>
          <p className="text-gray-600">
            Successfully sent invitations to {inviteCount} guest{inviteCount === 1 ? '' : 's'}
          </p>
        </div>

        <div className="space-y-3">
          <button
            onClick={() => router.push('/dj/dashboard')}
            className="w-full bg-black text-white py-3 rounded-xl font-medium hover:bg-gray-900 transition-colors"
          >
            Dashboard
          </button>
          <button
            onClick={() => router.push(`/dj/events/${params.id}/manage`)}
            className="w-full bg-gray-100 text-black py-3 rounded-xl font-medium hover:bg-gray-200 transition-colors"
          >
            View Guest List
          </button>
        </div>

        <p className="text-xs text-gray-500 mt-6">
          Redirecting to dashboard in a few seconds...
        </p>
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
      </div>
    }>
      <SuccessPageContent />
    </Suspense>
  );
}