'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

interface EventInfo {
  id: string;
  name: string;
  date: string;
  venue: string;
  otherDJs: string[];
}

function DJInvitePageContent() {
  const [eventInfo, setEventInfo] = useState<EventInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Get invitation token from URL
    const token = searchParams.get('token');
    if (!token) {
      setError('Invalid invitation link');
      setIsLoading(false);
      return;
    }

    // Simulate fetching event details from invitation token
    setTimeout(() => {
      setEventInfo({
        id: 'evt_123',
        name: 'Saturday Night Sessions',
        date: 'Saturday, July 6, 2025',
        venue: 'Nightlist',
        otherDJs: ['DJ Shadow', 'MC Groove']
      });
      setIsLoading(false);
    }, 1000);
  }, [searchParams]);

  const handleAcceptInvite = () => {
    // Navigate to DJ signup flow
    router.push('/dj/signup?event=' + eventInfo?.id);
  };

  const handleDeclineInvite = () => {
    // Handle decline (could show confirmation)
    setError('Invitation declined');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
          <p className="text-gray-600">Loading invitation...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-6">
        <div className="w-full max-w-md text-center">
          <div className="text-4xl mb-4">❌</div>
          <h1 className="text-2xl font-light mb-4">Invalid Invitation</h1>
          <p className="text-gray-600 mb-8">{error}</p>
          <button
            onClick={() => window.close()}
            className="bg-black text-white px-6 py-3 rounded-xl font-medium hover:bg-gray-900 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-black text-white p-6">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-3xl font-light tracking-tight mb-2">Nightlist</h1>
          <p className="text-gray-300">DJ Performance Invitation</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-2xl mx-auto p-6">
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">🎧</div>
          <h2 className="text-2xl font-light mb-2">You're Invited to Perform!</h2>
          <p className="text-gray-600">You've been invited to DJ at the following event:</p>
        </div>

        {/* Event Details Card */}
        <div className="bg-gray-50 rounded-xl p-6 mb-8">
          <h3 className="text-xl font-semibold mb-4">{eventInfo?.name}</h3>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Date:</span>
              <span className="font-medium">{eventInfo?.date}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Venue:</span>
              <span className="font-medium">{eventInfo?.venue}</span>
            </div>
            
            {eventInfo?.otherDJs && eventInfo.otherDJs.length > 0 && (
              <div className="flex justify-between items-start">
                <span className="text-gray-600">Other DJs:</span>
                <div className="text-right">
                  {eventInfo.otherDJs.map((dj, index) => (
                    <div key={index} className="font-medium">{dj}</div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Benefits Section */}
        <div className="mb-8">
          <h4 className="text-lg font-medium mb-4">What you get:</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white border border-gray-200 rounded-xl p-4">
              <div className="text-2xl mb-2">👥</div>
              <h5 className="font-medium mb-1">Guest List Access</h5>
              <p className="text-sm text-gray-600">Manage up to 75 guests for your performance</p>
            </div>
            
            <div className="bg-white border border-gray-200 rounded-xl p-4">
              <div className="text-2xl mb-2">📊</div>
              <h5 className="font-medium mb-1">Performance Analytics</h5>
              <p className="text-sm text-gray-600">Track your draw and guest conversion rates</p>
            </div>
            
            <div className="bg-white border border-gray-200 rounded-xl p-4">
              <div className="text-2xl mb-2">📱</div>
              <h5 className="font-medium mb-1">Easy Sharing</h5>
              <p className="text-sm text-gray-600">Share event links via social media and messaging</p>
            </div>
            
            <div className="bg-white border border-gray-200 rounded-xl p-4">
              <div className="text-2xl mb-2">⚡</div>
              <h5 className="font-medium mb-1">Quick Approval</h5>
              <p className="text-sm text-gray-600">Batch approve guests with one click</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          <button
            onClick={handleAcceptInvite}
            className="w-full bg-black text-white py-4 rounded-xl font-medium text-lg hover:bg-gray-900 transition-colors"
          >
            Accept Invitation & Create Account
          </button>
          
          <button
            onClick={handleDeclineInvite}
            className="w-full bg-white text-black border-2 border-black py-4 rounded-xl font-medium hover:bg-gray-50 transition-colors"
          >
            Decline Invitation
          </button>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            Need help? Contact the venue manager who sent this invitation.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function DJInvitePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
          <p className="text-gray-600">Loading invitation...</p>
        </div>
      </div>
    }>
      <DJInvitePageContent />
    </Suspense>
  );
}