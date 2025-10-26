'use client';

import { useState, useEffect, useCallback, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

interface GuestEntry {
  id: string;
  status: 'pending' | 'approved' | 'denied';
  plus_ones_requested: number;
  checked_in_at?: string;
  guest: {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    guest_tier: 'regular' | 'vip' | 'blocked' | 'micro_promoter';
  };
  guest_list: {
    id: string;
    name: string;
    event: {
      id: string;
      name: string;
    };
  };
}

function CheckInContent() {
  const [guestEntry, setGuestEntry] = useState<GuestEntry | null>(null);
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [plusOnes, setPlusOnes] = useState(0);
  const [totalCheckedIn, setTotalCheckedIn] = useState(47);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Check for dark mode preference
    const savedDarkMode = localStorage.getItem('doorperson_dark_mode');
    if (savedDarkMode === 'true') {
      setIsDarkMode(true);
    }

    const entryId = searchParams.get('entryId');
    if (entryId) {
      fetchGuestEntry(entryId);
    } else {
      console.error('No entry ID provided');
      router.push('/doorperson/scanner');
    }
  }, [searchParams, router]);

  const fetchGuestEntry = async (entryId: string) => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/guest-list-entries/${entryId}`);

      if (!response.ok) {
        throw new Error('Failed to fetch guest entry');
      }

      const data = await response.json();
      setGuestEntry(data.entry);
      setPlusOnes(data.entry.plus_ones_requested || 0);
    } catch (error) {
      console.error('Error fetching guest entry:', error);
      alert('Failed to load guest information. Please try again.');
      router.push('/doorperson/scanner');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCheckIn = async () => {
    if (!guestEntry || isSaving) return;

    setIsSaving(true);

    try {
      // Call API to check in guest
      const response = await fetch(`/api/guest-list-entries/${guestEntry.id}/checkin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          plus_ones: plusOnes,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Check-in failed');
      }

      const data = await response.json();
      console.log('Check-in successful:', data);

      // Update entry status
      setGuestEntry({ ...guestEntry, checked_in_at: new Date().toISOString(), plus_ones_requested: plusOnes });
      setIsCheckedIn(true);
      setTotalCheckedIn(prev => prev + 1 + plusOnes);
    } catch (error) {
      console.error('Check-in failed:', error);
      alert(
        error instanceof Error
          ? error.message
          : 'Failed to check in guest. Please try again.'
      );
    } finally {
      setIsSaving(false);
    }
  };

  const handleContinue = useCallback(() => {
    router.push('/doorperson/scanner');
  }, [router]);

  const handleBackToList = useCallback(() => {
    router.push('/doorperson/search');
  }, [router]);

  const handleGoBack = useCallback(() => {
    router.push('/doorperson/search');
  }, [router]);

  // Auto-redirect effect for success state
  useEffect(() => {
    if (isCheckedIn) {
      const timer = setTimeout(() => {
        handleContinue();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isCheckedIn, handleContinue]);

  if (isLoading || !guestEntry) {
    return (
      <div
        className={`min-h-screen ${isDarkMode ? 'bg-black text-white' : 'bg-white text-black'} flex items-center justify-center`}
      >
        <div
          className={`animate-spin rounded-full h-12 w-12 border-b-2 ${isDarkMode ? 'border-white' : 'border-black'}`}
        ></div>
      </div>
    );
  }

  const guestName = `${guestEntry.guest.first_name} ${guestEntry.guest.last_name}`;
  const isBlocked = guestEntry.guest.guest_tier === 'blocked';
  const isVIP = guestEntry.guest.guest_tier === 'vip';

  // Handle blocked guests
  if (isBlocked) {
    return (
      <div
        className={`min-h-screen ${isDarkMode ? 'bg-black text-white' : 'bg-white text-black'} flex flex-col items-center justify-center p-6`}
      >
        <div className="w-full max-w-sm text-center">
          <div className="text-6xl mb-6">⚠️</div>
          <h1 className="text-2xl font-bold text-red-600 mb-4">ALERT</h1>
          <div
            className={`${isDarkMode ? 'bg-red-950 border-red-800' : 'bg-red-50 border-red-200'} border rounded-xl p-6 mb-8`}
          >
            <h2 className="text-xl font-semibold mb-2">{guestName}</h2>
            <p className="text-red-600 text-lg font-semibold mb-4">BLOCKED</p>
            <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'} text-sm mb-2`}>
              This guest has been blocked from entry.
            </p>
            <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'} text-sm`}>
              Contact manager for details.
            </p>
          </div>
          <p className="text-red-600 font-bold text-lg mb-8">DO NOT ADMIT</p>
          <div className="space-y-3">
            <button
              onClick={() => {
                /* Call manager functionality */
              }}
              className="w-full bg-yellow-500 text-white py-4 rounded-xl font-medium hover:bg-yellow-600 transition-colors"
            >
              Call Manager
            </button>
            <button
              onClick={handleGoBack}
              className={`w-full ${isDarkMode ? 'bg-gray-800 text-white border-gray-700 hover:bg-gray-700' : 'bg-white text-black border-black hover:bg-gray-50'} border-2 py-4 rounded-xl font-medium transition-colors`}
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Success state after check-in
  if (isCheckedIn) {
    return (
      <div
        className={`min-h-screen ${isDarkMode ? 'bg-black text-white' : 'bg-white text-black'} flex flex-col items-center justify-center p-6`}
      >
        <div className="w-full max-w-sm text-center">
          <div className="text-6xl text-green-500 mb-6">✓</div>
          <h1 className="text-2xl font-bold text-green-600 mb-8">CHECKED IN</h1>

          <div className={`${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'} rounded-xl p-6 mb-8`}>
            <h2 className="text-xl font-semibold mb-4">
              {guestName}
              {plusOnes > 0 && (
                <span className={`font-normal ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {' '}
                  +{plusOnes}
                </span>
              )}
            </h2>
            <div className="space-y-2 text-left">
              {isVIP && (
                <div className="flex justify-between">
                  <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>Status:</span>
                  <span className="font-medium">VIP Guest</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                  Added by:
                </span>
                <span className="font-medium">{guestEntry.guest_list.name}</span>
              </div>
              <div className="flex justify-between">
                <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                  Event:
                </span>
                <span className="font-medium">{guestEntry.guest_list.event.name}</span>
              </div>
            </div>
          </div>

          <div
            className={`${isDarkMode ? 'bg-green-950 border-green-800' : 'bg-green-50 border-green-200'} border rounded-xl p-4 mb-8`}
          >
            <p className={`${isDarkMode ? 'text-green-400' : 'text-green-700'} font-medium`}>
              Total Tonight: {totalCheckedIn}
            </p>
          </div>

          <div className="space-y-3">
            <button
              onClick={handleContinue}
              className={`w-full ${isDarkMode ? 'bg-white text-black hover:bg-gray-100' : 'bg-black text-white hover:bg-gray-900'} py-4 rounded-xl font-medium text-lg transition-colors`}
            >
              Back to Scanner
            </button>
            <button
              onClick={handleBackToList}
              className={`w-full ${isDarkMode ? 'bg-gray-800 text-white border-gray-700 hover:bg-gray-700' : 'bg-white text-black border-black hover:bg-gray-50'} border-2 py-4 rounded-xl font-medium transition-colors`}
            >
              Back to List
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Default check-in confirmation state
  return (
    <div
      className={`min-h-screen ${isDarkMode ? 'bg-black text-white' : 'bg-white text-black'} flex flex-col items-center justify-center p-6`}
    >
      <div className="w-full max-w-sm">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-light mb-2">Confirm Check-In</h1>
        </div>

        {/* Guest Details */}
        <div className={`${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'} rounded-xl p-6 mb-8`}>
          <h2 className="text-xl font-semibold mb-4">
            {guestName}
            {isVIP && (
              <span
                className={`ml-2 ${isDarkMode ? 'bg-yellow-900 text-yellow-200' : 'bg-yellow-100 text-yellow-800'} px-2 py-1 rounded text-xs font-semibold`}
              >
                VIP
              </span>
            )}
          </h2>

          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>Added by:</span>
              <span className="font-medium">{guestEntry.guest_list.name}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>Event:</span>
              <span className="font-medium">{guestEntry.guest_list.event.name}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'} text-sm`}>
                Edit plus ones:
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setPlusOnes(Math.max(0, plusOnes - 1))}
                  className={`w-8 h-8 ${isDarkMode ? 'bg-gray-800 border-gray-700 hover:bg-gray-700' : 'bg-white border-gray-300 hover:bg-gray-50'} border rounded-lg transition-colors`}
                >
                  -
                </button>
                <span className="font-semibold w-8 text-center">{plusOnes}</span>
                <button
                  onClick={() => setPlusOnes(plusOnes + 1)}
                  className={`w-8 h-8 ${isDarkMode ? 'bg-gray-800 border-gray-700 hover:bg-gray-700' : 'bg-white border-gray-300 hover:bg-gray-50'} border rounded-lg transition-colors`}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={handleCheckIn}
            disabled={isSaving}
            className={`w-full ${isDarkMode ? 'bg-white text-black hover:bg-gray-100' : 'bg-black text-white hover:bg-gray-900'} py-4 rounded-xl font-medium text-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {isSaving ? (
              <div className="flex items-center justify-center gap-2">
                <div
                  className={`animate-spin rounded-full h-5 w-5 border-b-2 ${isDarkMode ? 'border-black' : 'border-white'}`}
                ></div>
                Checking In...
              </div>
            ) : (
              'Check In Guest'
            )}
          </button>

          <button
            onClick={handleGoBack}
            disabled={isSaving}
            className={`w-full ${isDarkMode ? 'bg-gray-800 text-white border-gray-700 hover:bg-gray-700' : 'bg-white text-black border-black hover:bg-gray-50'} border-2 py-4 rounded-xl font-medium transition-colors disabled:opacity-50`}
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}

export default function CheckInPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-black text-white flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
        </div>
      }
    >
      <CheckInContent />
    </Suspense>
  );
}
