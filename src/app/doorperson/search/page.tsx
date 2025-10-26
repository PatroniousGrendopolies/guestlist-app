'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

interface Guest {
  entryId: string;
  guestId: string;
  name: string;
  status: 'regular' | 'vip' | 'banned' | 'micro_promoter';
  plusOnes: number;
  checkedIn: boolean;
  email?: string;
  addedBy?: string;
  event?: string;
}

export default function ManualSearchPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [filterBy, setFilterBy] = useState<string>('all');
  const [showCheckedIn, setShowCheckedIn] = useState(false);
  const [allGuests, setAllGuests] = useState<Guest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [inviters, setInviters] = useState<string[]>([]);
  const router = useRouter();
  const recognitionRef = useRef<any>(null);

  // Fetch guests from API
  const fetchGuests = async () => {
    try {
      setIsLoading(true);
      const params = new URLSearchParams({
        showCheckedIn: showCheckedIn.toString(),
      });

      const response = await fetch(`/api/doorperson/guest-entries?${params}`);
      if (!response.ok) {
        throw new Error('Failed to fetch guest entries');
      }

      const data = await response.json();
      setAllGuests(data.entries || []);

      // Extract unique inviters for filter buttons
      const uniqueInviters = Array.from(
        new Set(
          (data.entries || [])
            .map((g: Guest) => g.addedBy)
            .filter(Boolean)
        )
      ) as string[];
      setInviters(uniqueInviters);
    } catch (error) {
      console.error('Failed to fetch guests:', error);
      setAllGuests([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Filter guests based on search and filters
  let filteredGuests = searchQuery
    ? allGuests.filter(
        guest =>
          guest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          guest.email?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : allGuests;

  // Apply "addedBy" filter
  if (filterBy !== 'all') {
    filteredGuests = filteredGuests.filter(guest => guest.addedBy === filterBy);
  }

  useEffect(() => {
    // Check authentication
    const isAuthenticated = localStorage.getItem('doorperson_authenticated');
    if (!isAuthenticated) {
      router.push('/doorperson/login');
      return;
    }

    // Check for dark mode preference
    const savedDarkMode = localStorage.getItem('doorperson_dark_mode');
    if (savedDarkMode === 'true') {
      setIsDarkMode(true);
    }

    // Fetch guests on mount
    fetchGuests();

    // Initialize speech recognition
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition =
        (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setSearchQuery(transcript);
        setIsListening(false);
      };

      recognitionRef.current.onerror = () => {
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
  }, [router]);

  // Refetch when showCheckedIn changes
  useEffect(() => {
    fetchGuests();
  }, [showCheckedIn]);

  const handleVoiceSearch = () => {
    if (recognitionRef.current && !isListening) {
      // Clear filters when starting voice search
      setFilterBy('all');
      setShowCheckedIn(false);
      setIsListening(true);
      recognitionRef.current.start();
    } else if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  const handleGuestSelect = (guest: Guest) => {
    // Navigate to check-in screen with entryId
    router.push(`/doorperson/checkin?entryId=${guest.entryId}`);
  };

  const handleBack = () => {
    router.push('/doorperson/scanner');
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-black text-white' : 'bg-white text-black'}`}>
      {/* Header */}
      <div
        className={`flex items-center justify-between p-4 border-b ${isDarkMode ? 'border-gray-800' : 'border-gray-200'}`}
      >
        <button
          onClick={handleBack}
          className={`${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-black'} transition-colors`}
        >
          ← Back
        </button>
        <h1 className="text-xl font-light">Manual Search</h1>
        <div className="w-8"></div>
      </div>

      <div className="p-4">
        {/* Search Input */}
        <div className="mb-4">
          <div className="relative flex gap-2">
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search by name or email..."
              className={`flex-1 ${isDarkMode ? 'bg-gray-900 border-gray-700 text-white' : 'bg-white border-gray-300 text-black'} border-2 rounded-xl px-4 py-4 placeholder-gray-400 focus:outline-none focus:border-black transition-colors`}
              autoFocus
            />
            <button
              onClick={handleVoiceSearch}
              className={`${isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50'} border-2 ${isDarkMode ? 'border-gray-700' : 'border-black'} px-4 rounded-xl transition-colors`}
              aria-label="Voice search"
            >
              {isListening ? (
                <svg
                  className="w-5 h-5 text-red-500 animate-pulse"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                  />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                  />
                </svg>
              )}
            </button>
          </div>
          {isListening && (
            <p className="text-sm text-center mt-2 text-red-500 animate-pulse">
              Listening... Speak now
            </p>
          )}
        </div>

        {/* Filter Buttons */}
        <div className="mb-4 space-y-3">
          {/* Show Checked In Toggle and Guest Count */}
          <div className="flex items-center justify-between">
            <button
              onClick={() => setShowCheckedIn(!showCheckedIn)}
              className={`px-3 py-1 border rounded-lg text-sm font-medium transition-colors ${
                showCheckedIn
                  ? 'bg-black text-white border-black'
                  : isDarkMode
                    ? 'border-gray-600 text-gray-400 hover:border-gray-500'
                    : 'border-gray-300 text-gray-600 hover:border-gray-400'
              }`}
            >
              {showCheckedIn ? 'Hide' : 'Show'} checked in
            </button>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setSearchQuery('')}
                className={`text-sm px-2 py-1 rounded transition-colors ${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-black'}`}
              >
                Clear
              </button>
            </div>
          </div>

          {/* Inviter Filter */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setFilterBy('all')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                filterBy === 'all'
                  ? 'bg-black text-white'
                  : isDarkMode
                    ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All
            </button>
            {inviters.map(inviter => (
              <button
                key={inviter}
                onClick={() => setFilterBy(inviter!)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filterBy === inviter
                    ? 'bg-black text-white'
                    : isDarkMode
                      ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {inviter}
              </button>
            ))}
          </div>
        </div>

        {/* Guest List */}
        <div className="space-y-3 pb-20">
          {isLoading ? (
            <div className="text-center py-12">
              <div
                className={`animate-spin rounded-full h-12 w-12 border-b-2 ${isDarkMode ? 'border-white' : 'border-black'} mx-auto mb-4`}
              ></div>
              <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Loading guests...
              </p>
            </div>
          ) : filteredGuests.length === 0 ? (
            <div className="text-center py-12">
              <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-2`}>
                No guests found
              </p>
              <p className={`${isDarkMode ? 'text-gray-500' : 'text-gray-400'} text-sm`}>
                Try searching with a different name or email
              </p>
            </div>
          ) : (
            filteredGuests.map(guest => (
              <button
                key={guest.entryId}
                onClick={() => handleGuestSelect(guest)}
                className={`w-full ${isDarkMode ? 'bg-gray-900 border-gray-800 hover:bg-gray-800' : 'bg-white border-gray-200 hover:bg-gray-50'} border rounded-xl p-4 text-left transition-colors`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-medium">{guest.name}</h3>
                        {guest.status === 'vip' && (
                          <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs font-semibold">
                            VIP
                          </span>
                        )}
                        {guest.status === 'banned' && (
                          <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs font-semibold">
                            BANNED
                          </span>
                        )}
                      </div>
                      {guest.plusOnes > 0 && <span className="text-sm">+{guest.plusOnes}</span>}
                    </div>
                    {guest.addedBy && (
                      <p
                        className={`text-sm ${isDarkMode ? 'text-gray-500' : 'text-gray-400'} mt-1`}
                      >
                        by {guest.addedBy}
                      </p>
                    )}
                  </div>
                  {guest.checkedIn && (
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-semibold ml-3">
                      CHECKED IN
                    </span>
                  )}
                </div>

                {/* Warning indicators */}
                {guest.status === 'banned' && (
                  <div className="mt-2 text-red-600 text-sm font-semibold">
                    ⚠️ DO NOT ADMIT - Contact Manager
                  </div>
                )}
              </button>
            ))
          )}
        </div>

        {/* Back Button - Fixed at bottom */}
        <div className="fixed bottom-6 left-4 right-4">
          <button
            onClick={handleBack}
            className={`w-full ${isDarkMode ? 'bg-gray-800 text-white hover:bg-gray-700' : 'bg-white text-black border-2 border-black hover:bg-gray-50'} py-4 rounded-xl font-medium transition-colors`}
          >
            Back to Scanner
          </button>
        </div>
      </div>
    </div>
  );
}
