'use client';

import { useState, useEffect, useCallback, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

interface Guest {
  id: string;
  name: string;
  status: 'regular' | 'vip' | 'banned';
  plus_ones: number;
  checked_in: boolean;
  addedBy?: string;
}

function CheckInContent() {
  const [guest, setGuest] = useState<Guest | null>(null);
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
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

    const guestParam = searchParams.get('guest');
    if (guestParam) {
      try {
        const parsedGuest = JSON.parse(decodeURIComponent(guestParam));
        setGuest(parsedGuest);
        setPlusOnes(parsedGuest.plus_ones);
      } catch (error) {
        console.error('Error parsing guest data:', error);
        router.push('/doorperson/scanner');
      }
    } else {
      router.push('/doorperson/scanner');
    }
  }, [searchParams, router]);

  const handleCheckIn = async () => {
    if (!guest || isLoading) return;

    setIsLoading(true);

    try {
      // Simulate API call to check in guest
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Update guest status
      setGuest({ ...guest, checked_in: true, plus_ones: plusOnes });
      setIsCheckedIn(true);
      setTotalCheckedIn(prev => prev + 1 + plusOnes);
    } catch (error) {
      console.error('Check-in failed:', error);
    } finally {
      setIsLoading(false);
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

  if (!guest) {
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

  // Handle banned guests
  if (guest.status === 'banned') {
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
            <h2 className="text-xl font-semibold mb-2">{guest.name}</h2>
            <p className="text-red-600 text-lg font-semibold mb-4">BANNED</p>
            <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'} text-sm mb-2`}>
              Reason: Aggressive behavior
            </p>
            <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'} text-sm`}>
              Date: May 15, 2024
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
              {guest.name}
              {plusOnes > 0 && (
                <span className={`font-normal ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {' '}
                  +{plusOnes}
                </span>
              )}
            </h2>
            <div className="space-y-2 text-left">
              {guest.status === 'vip' && (
                <div className="flex justify-between">
                  <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>Status:</span>
                  <span className="font-medium">VIP Guest</span>
                </div>
              )}
              {guest.addedBy && (
                <div className="flex justify-between">
                  <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                    Invited by:
                  </span>
                  <span className="font-medium">{guest.addedBy}</span>
                </div>
              )}
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
            {guest.name}
            {guest.status === 'vip' && (
              <span
                className={`ml-2 ${isDarkMode ? 'bg-yellow-900 text-yellow-200' : 'bg-yellow-100 text-yellow-800'} px-2 py-1 rounded text-xs font-semibold`}
              >
                VIP
              </span>
            )}
          </h2>

          <div className="space-y-3">
            {guest.addedBy && (
              <div className="flex justify-between items-center">
                <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>Invited by:</span>
                <span className="font-medium">{guest.addedBy}</span>
              </div>
            )}

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
            disabled={isLoading}
            className={`w-full ${isDarkMode ? 'bg-white text-black hover:bg-gray-100' : 'bg-black text-white hover:bg-gray-900'} py-4 rounded-xl font-medium text-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {isLoading ? (
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
            disabled={isLoading}
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
