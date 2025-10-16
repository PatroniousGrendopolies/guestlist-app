'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';

interface Guest {
  id: string;
  name: string;
  email: string;
  phone: string;
  instagram?: string;
  plusOnes: number;
  status: 'pending' | 'approved' | 'denied';
  checkedIn: boolean;
  submittedAt: string;
}

interface EventInfo {
  id: string;
  name: string;
  date: string;
}

export default function DJEventSearchPage() {
  const [eventInfo, setEventInfo] = useState<EventInfo | null>(null);
  const [guests, setGuests] = useState<Guest[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const params = useParams();

  useEffect(() => {
    // Check authentication
    const isAuthenticated = localStorage.getItem('dj_authenticated');
    if (!isAuthenticated) {
      router.push('/dj/login');
      return;
    }

    // Mock data - in real app, fetch from API using params.id
    setTimeout(() => {
      setEventInfo({
        id: params.id as string,
        name: 'Saturday Night Sessions',
        date: 'Saturday, July 6, 2025',
      });

      let mockGuests = [
        {
          id: '1',
          name: 'Sarah Johnson',
          email: 'sarah@example.com',
          phone: '+1 (555) 123-4567',
          instagram: '@sarahj',
          plusOnes: 2,
          status: 'pending' as const,
          checkedIn: false,
          submittedAt: '2 hours ago',
        },
        {
          id: '2',
          name: 'Mike Chen',
          email: 'mike@example.com',
          phone: '+1 (555) 234-5678',
          plusOnes: 1,
          status: 'pending' as const,
          checkedIn: false,
          submittedAt: '4 hours ago',
        },
        {
          id: '3',
          name: 'Alex Rivera',
          email: 'alex@example.com',
          phone: '+1 (555) 345-6789',
          instagram: '@alexr',
          plusOnes: 0,
          status: 'approved' as const,
          checkedIn: true,
          submittedAt: '1 day ago',
        },
        {
          id: '4',
          name: 'Jamie Smith',
          email: 'jamie@example.com',
          phone: '+1 (555) 456-7890',
          plusOnes: 3,
          status: 'approved' as const,
          checkedIn: false,
          submittedAt: '1 day ago',
        },
        {
          id: '5',
          name: 'Taylor Brown',
          email: 'taylor@example.com',
          phone: '+1 (555) 567-8901',
          instagram: '@tbrown',
          plusOnes: 1,
          status: 'denied' as const,
          checkedIn: false,
          submittedAt: '3 days ago',
        },
      ];

      // Apply any status updates from localStorage
      const storedGuests = localStorage.getItem('event_guests');
      if (storedGuests) {
        const guestUpdates = JSON.parse(storedGuests);
        mockGuests = mockGuests.map(guest => {
          const guestUpdate = guestUpdates[guest.id];
          if (guestUpdate) {
            return { ...guest, ...guestUpdate };
          }
          return guest;
        });
      }

      setGuests(mockGuests);

      setIsLoading(false);
    }, 1000);
  }, [router, params.id]);

  const filteredGuests = guests.filter(
    guest =>
      guest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (guest.instagram && guest.instagram.toLowerCase().includes(searchQuery.toLowerCase())) ||
      guest.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
          <p className="text-gray-600">Loading guests...</p>
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
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="p-6">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => router.push(`/dj/events/${params.id}/manage`)}
            className="text-gray-600 hover:text-black transition-colors mb-4 text-sm"
          >
            ← Back to Guest List
          </button>
          <h1 className="text-2xl font-light mb-2">Search Guests</h1>
          <p className="text-gray-600">{eventInfo.name}</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6">
        {/* Search Input */}
        <div className="mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Search by name, IG or email"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 border border-gray-200 rounded-full text-sm focus:outline-none focus:border-black transition-colors"
              autoFocus
            />
          </div>
          {searchQuery && (
            <p className="text-xs text-gray-600 mt-2">
              {filteredGuests.length} guest{filteredGuests.length !== 1 ? 's' : ''} found
            </p>
          )}
        </div>

        {/* Results */}
        <div className="space-y-4">
          {searchQuery === '' ? (
            <div className="text-center py-12">
              <h3 className="text-lg mb-2">Start typing to search guests</h3>
            </div>
          ) : filteredGuests.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium mb-2">No guests found</h3>
              <p className="text-gray-600">Try searching with a different term</p>
            </div>
          ) : (
            filteredGuests.map(guest => (
              <button
                key={guest.id}
                onClick={() => router.push(`/dj/events/${params.id}/guest/${guest.id}`)}
                className="w-full bg-white border border-gray-200 rounded-xl p-6 hover:border-gray-300 transition-colors text-left"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="text-lg font-semibold">{guest.name}</h3>
                      {guest.checkedIn && (
                        <span className="bg-black text-white px-2 py-1 rounded text-xs font-semibold">
                          Checked In
                        </span>
                      )}
                      {guest.status === 'approved' && !guest.checkedIn && (
                        <span className="bg-black text-white px-2 py-1 rounded text-xs font-semibold">
                          Approved
                        </span>
                      )}
                      {guest.status === 'pending' && (
                        <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded text-xs font-semibold">
                          Pending
                        </span>
                      )}
                      {guest.status === 'denied' && (
                        <span className="bg-white text-black border border-black px-2 py-1 rounded text-xs font-semibold">
                          Denied
                        </span>
                      )}
                    </div>

                    {guest.instagram && <p className="text-sm text-gray-600">{guest.instagram}</p>}
                  </div>

                  <div className="flex items-center gap-4">
                    {/* Plus Ones Display */}
                    {guest.plusOnes > 0 && (
                      <span className="text-sm text-gray-600">+{guest.plusOnes}</span>
                    )}

                    {/* Arrow Icon */}
                    <svg
                      className="w-5 h-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </div>
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
