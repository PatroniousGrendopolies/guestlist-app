'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { MockInvitationService } from '@/lib/mock/invitationService';

interface PastGuest {
  id: string;
  name: string;
  instagram?: string;
  email: string;
  phone: string;
  lastAttended: {
    eventName: string;
    date: string;
  };
  totalVisits: number;
}

interface EventInfo {
  id: string;
  name: string;
  date: string;
}

export default function InvitePastGuestsPage() {
  const [eventInfo, setEventInfo] = useState<EventInfo | null>(null);
  const [pastGuests, setPastGuests] = useState<PastGuest[]>([]);
  const [selectedGuests, setSelectedGuests] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(true);
  const [sortBy, setSortBy] = useState<'alphabetical' | 'visits' | 'lastAttended'>('alphabetical');
  const router = useRouter();
  const params = useParams();

  useEffect(() => {
    // Check authentication
    const isAuthenticated = localStorage.getItem('dj_authenticated');
    if (!isAuthenticated) {
      router.push('/dj/login');
      return;
    }

    // Mock data - in real app, fetch from API
    setTimeout(() => {
      setEventInfo({
        id: params.id as string,
        name: 'Saturday Night Sessions',
        date: 'Saturday, July 6, 2025',
      });

      // Mock past guests data
      const allPastGuests = [
        {
          id: '1',
          name: 'Emma Wilson',
          instagram: '@emmaw',
          email: 'emma@example.com',
          phone: '+1 (555) 111-2222',
          lastAttended: {
            eventName: 'Friday Night Fever',
            date: 'June 14, 2025',
          },
          totalVisits: 8,
        },
        {
          id: '2',
          name: 'James Miller',
          instagram: '@jmiller',
          email: 'james@example.com',
          phone: '+1 (555) 333-4444',
          lastAttended: {
            eventName: 'Weekend Vibes',
            date: 'June 7, 2025',
          },
          totalVisits: 5,
        },
        {
          id: '3',
          name: 'Sophia Davis',
          email: 'sophia@example.com',
          phone: '+1 (555) 555-6666',
          lastAttended: {
            eventName: 'Friday Night Fever',
            date: 'June 14, 2025',
          },
          totalVisits: 12,
        },
        {
          id: '4',
          name: 'Oliver Brown',
          instagram: '@oliverb',
          email: 'oliver@example.com',
          phone: '+1 (555) 777-8888',
          lastAttended: {
            eventName: 'Summer Kickoff',
            date: 'May 31, 2025',
          },
          totalVisits: 3,
        },
        {
          id: '5',
          name: 'Isabella Martinez',
          instagram: '@bellamart',
          email: 'isabella@example.com',
          phone: '+1 (555) 999-0000',
          lastAttended: {
            eventName: 'Friday Night Fever',
            date: 'June 14, 2025',
          },
          totalVisits: 7,
        },
      ];

      // Filter out guests who have already been invited to this event
      const availableGuests = allPastGuests.filter(
        guest => !MockInvitationService.wasGuestInvited(guest.id, params.id as string)
      );

      setPastGuests(availableGuests);

      setIsLoading(false);
    }, 1000);
  }, [router, params.id]);

  // Sort guests based on selected criteria
  const sortedGuests = [...pastGuests].sort((a, b) => {
    switch (sortBy) {
      case 'alphabetical':
        return a.name.localeCompare(b.name);
      case 'visits':
        return b.totalVisits - a.totalVisits; // Descending order
      case 'lastAttended':
        return new Date(b.lastAttended.date).getTime() - new Date(a.lastAttended.date).getTime(); // Most recent first
      default:
        return 0;
    }
  });

  const handleGuestToggle = (guestId: string) => {
    setSelectedGuests(prev => {
      const newSet = new Set(prev);
      if (newSet.has(guestId)) {
        newSet.delete(guestId);
      } else {
        newSet.add(guestId);
      }
      return newSet;
    });
  };

  const handleSelectAll = () => {
    if (selectedGuests.size === sortedGuests.length) {
      setSelectedGuests(new Set());
    } else {
      setSelectedGuests(new Set(sortedGuests.map(g => g.id)));
    }
  };

  const handleNext = () => {
    if (selectedGuests.size > 0) {
      // Store selected guests in sessionStorage for the next screen
      sessionStorage.setItem('selectedPastGuests', JSON.stringify(Array.from(selectedGuests)));
      router.push(`/dj/events/${params.id}/invite-past-guests/customize`);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
          <p className="text-gray-600">Loading past guests...</p>
        </div>
      </div>
    );
  }

  if (!eventInfo) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-red-600">Event not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="p-6">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => router.push('/dj/dashboard')}
            className="text-gray-600 hover:text-black transition-colors mb-4 text-sm"
          >
            ← Dashboard
          </button>
          <h1 className="text-2xl font-light mb-1">Invite Past Guests</h1>
          <p className="text-gray-600">
            {eventInfo.name} • {eventInfo.date}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-6">
        <div className="max-w-4xl mx-auto">
          {/* Controls */}
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={handleSelectAll}
              className="bg-gray-100 text-gray-500 px-3 py-1 rounded-full text-sm hover:bg-gray-200 transition-colors"
            >
              {selectedGuests.size === sortedGuests.length ? 'Deselect All' : 'Select All'}
            </button>

            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">Sort by:</span>
              <select
                value={sortBy}
                onChange={e =>
                  setSortBy(e.target.value as 'alphabetical' | 'visits' | 'lastAttended')
                }
                className="bg-gray-100 text-gray-500 px-3 py-1 rounded-full text-sm border-none focus:outline-none hover:bg-gray-200 transition-colors"
              >
                <option value="alphabetical">Alphabetical</option>
                <option value="visits">Number of visits</option>
                <option value="lastAttended">Last attended</option>
              </select>
            </div>
          </div>

          {/* Guest List */}
          {sortedGuests.length === 0 ? (
            <div className="text-center py-12">
              <div className="mb-4">
                <svg
                  className="w-16 h-16 text-gray-300 mx-auto"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium mb-2">No Available Past Guests</h3>
              <p className="text-gray-600 text-sm max-w-md mx-auto">
                All your past guests have already been invited to this event, or you don't have any
                past guests yet.
              </p>
              <button
                onClick={() => router.push('/dj/dashboard')}
                className="mt-6 px-6 py-2 bg-black text-white rounded-xl font-medium hover:bg-gray-900 transition-colors"
              >
                Back to Dashboard
              </button>
            </div>
          ) : (
            <div className="space-y-3 pb-32">
              {sortedGuests.map(guest => (
                <div
                  key={guest.id}
                  onClick={() => handleGuestToggle(guest.id)}
                  className="bg-white border border-gray-200 rounded-xl p-2 cursor-pointer hover:border-gray-300 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    {/* Checkbox */}
                    <div className="flex-shrink-0">
                      <div
                        className={`w-6 h-6 rounded-full border-2 transition-colors ${
                          selectedGuests.has(guest.id)
                            ? 'bg-black border-black'
                            : 'bg-white border-gray-300'
                        }`}
                      >
                        {selectedGuests.has(guest.id) && (
                          <svg className="w-full h-full p-1" viewBox="0 0 24 24" fill="none">
                            <path
                              d="M5 13l4 4L19 7"
                              stroke="white"
                              strokeWidth="3"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        )}
                      </div>
                    </div>

                    {/* Guest Info */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <p className="text-sm">{guest.name}</p>
                          {guest.instagram && (
                            <a
                              href={`https://instagram.com/${guest.instagram.replace('@', '')}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs text-blue-600 hover:text-blue-800 transition-colors"
                              onClick={e => e.stopPropagation()}
                            >
                              {guest.instagram}
                            </a>
                          )}
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-gray-500">{guest.totalVisits} visits</p>
                          <p className="text-xs text-gray-500">
                            Last attended: {guest.lastAttended.date}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white p-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <p className="text-sm text-gray-500">
            {selectedGuests.size === 0
              ? 'No guests selected'
              : `${selectedGuests.size} guest${selectedGuests.size === 1 ? '' : 's'} selected`}
          </p>
          <button
            onClick={handleNext}
            disabled={selectedGuests.size === 0}
            className={`px-6 py-3 rounded-xl font-medium transition-colors ${
              selectedGuests.size > 0
                ? 'bg-black text-white hover:bg-gray-900'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
