'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import DebugPanel from '@/components/debug/DebugPanel';
import { SafeStorage } from '@/lib/utils/safeStorage';

interface Event {
  id: string;
  name: string;
  date: string;
  otherDJs: string[];
  spotsUsed: number;
  totalSpots: number;
  status: 'upcoming' | 'past';
  pendingGuests?: number;
  hasInvitedPastGuests?: boolean;
  conversionRate?: number;
  totalAttendees?: number;
}

export default function DJDashboardPage() {
  const [djName, setDjName] = useState('');
  const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([]);
  const [pastEvents, setPastEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [shareEventId, setShareEventId] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Check authentication
    const isAuthenticated = localStorage.getItem('dj_authenticated');
    if (!isAuthenticated) {
      router.push('/dj/login');
      return;
    }

    // Get DJ info
    const email = localStorage.getItem('dj_email');
    setDjName('DJ Shadow'); // This would come from API

    // Fetch real data from API
    const fetchData = async () => {
      try {
        // For testing: fetch specific event that has guest lists
        // TODO: When auth is enabled, fetch all events where DJ has a guest list
        const testEventId = 'a1416182-5a82-4219-8bf9-a514fa38d40c';

        const response = await fetch(`/api/events/${testEventId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch event');
        }

        const data = await response.json();
        const event = data.event;

        // Find the DJ's guest list (for now, use the first DJ list)
        // Note: API returns guest_lists (snake_case), not guestLists
        const djGuestList = event.guest_lists?.find((gl: any) => gl.list_type === 'dj_list');

        if (!djGuestList) {
          console.log('No DJ guest list found for this event');
          console.log('Available guest lists:', event.guest_lists);
          setUpcomingEvents([]);
          setPastEvents([]);
          setIsLoading(false);
          return;
        }

        // Fetch entries for this guest list
        const entriesResponse = await fetch(`/api/guest-lists/${djGuestList.id}/entries`);
        let entries: any[] = [];
        if (entriesResponse.ok) {
          const entriesData = await entriesResponse.json();
          entries = entriesData.entries || [];
        }

        // Count entries by status
        const pendingCount = entries.filter((e: any) => e.status === 'pending').length;
        const approvedEntries = entries.filter((e: any) => e.status === 'approved');

        // Calculate spots used (approved entries + their plus ones)
        const spotsUsed = approvedEntries.reduce(
          (total: number, entry: any) => total + 1 + (entry.plus_ones_requested || 0),
          0
        );

        // Get other DJ names from other guest lists
        const otherDJs = event.guest_lists
          ?.filter((gl: any) => gl.list_type === 'dj_list' && gl.id !== djGuestList.id)
          .map((gl: any) => gl.name) || [];

        // Format date for display
        const eventDate = new Date(event.date);
        const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const formattedDate = `${monthNames[eventDate.getMonth()]} ${eventDate.getDate()} ${eventDate.getFullYear()}`;

        // Determine if event is upcoming or past
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const eventDateOnly = new Date(eventDate);
        eventDateOnly.setHours(0, 0, 0, 0);

        const eventData: Event = {
          id: event.id,
          name: event.name,
          date: formattedDate,
          otherDJs,
          spotsUsed,
          totalSpots: djGuestList.max_capacity,
          status: eventDateOnly >= today ? 'upcoming' : 'past',
          pendingGuests: pendingCount,
          hasInvitedPastGuests: false,
        };

        if (eventDateOnly >= today) {
          setUpcomingEvents([eventData]);
          setPastEvents([]);
        } else {
          // For past events, calculate conversion rate
          const checkedInEntries = entries.filter((e: any) => e.checked_in_at);
          const totalAttendees = checkedInEntries.reduce(
            (total: number, entry: any) => total + 1 + (entry.plus_ones_requested || 0),
            0
          );
          const conversionRate = spotsUsed > 0 ? Math.round((totalAttendees / spotsUsed) * 100) : 0;

          setPastEvents([{
            ...eventData,
            conversionRate,
            totalAttendees,
          }]);
          setUpcomingEvents([]);
        }

        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching event data:', error);
        // On error, show empty state
        setUpcomingEvents([]);
        setPastEvents([]);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [router]);

  const handleEventAction = (eventId: string, action: 'share' | 'manage' | 'invite') => {
    switch (action) {
      case 'share':
        router.push(`/dj/events/${eventId}/share`);
        break;
      case 'manage':
        router.push(`/dj/events/${eventId}/manage`);
        break;
      case 'invite':
        router.push(`/dj/events/${eventId}/batch-invite`);
        break;
    }
  };

  const handleLogout = () => {
    SafeStorage.removeItem('dj_authenticated');
    SafeStorage.removeItem('dj_email');
    router.push('/dj/login');
  };

  const handleCopyLink = async (event: Event) => {
    const shareUrl = `https://nightlist.app/guest/signup?event=${event.id}&dj=shadow`;

    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(shareUrl);
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = shareUrl;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }

      setShareEventId(event.id);
      setTimeout(() => setShareEventId(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleShareEvent = async (event: Event) => {
    const shareUrl = `https://nightlist.app/guest/signup?event=${event.id}&dj=shadow`;
    const shareData = {
      title: `Join me at ${event.name}`,
      text: `You're invited to ${event.name} on ${event.date}. Sign up for the guest list!`,
      url: shareUrl,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        return;
      } catch (error) {
        if ((error as Error).name === 'AbortError') {
          return;
        }
      }
    }

    // Fallback to copy if share not available
    handleCopyLink(event);
  };

  // Debug functions
  const resetData = () => {
    // Reset events to initial state
    setUpcomingEvents([
      {
        id: '1',
        name: 'Saturday Night Sessions',
        date: 'July 6 2025',
        otherDJs: ['DJ Marcus', 'MC Groove'],
        spotsUsed: 23,
        totalSpots: 75,
        status: 'upcoming',
        pendingGuests: 2,
        hasInvitedPastGuests: false,
      },
      {
        id: '2',
        name: 'Summer Vibes',
        date: 'July 12 2025',
        otherDJs: ['DJ Luna'],
        spotsUsed: 8,
        totalSpots: 75,
        status: 'upcoming',
        pendingGuests: 0,
        hasInvitedPastGuests: true,
      },
    ]);

    // Clear guest data from localStorage
    const keys = Object.keys(localStorage);
    keys.forEach(key => {
      if (key.startsWith('guest_') || key.startsWith('event_')) {
        localStorage.removeItem(key);
      }
    });
  };

  const fillToCapacity = () => {
    setUpcomingEvents(prev =>
      prev.map(event => ({
        ...event,
        spotsUsed: event.totalSpots - 2, // Leave 2 spots
        pendingGuests: 3, // Add some pending
      }))
    );
  };

  const generateRandomGuests = () => {
    setUpcomingEvents(prev =>
      prev.map(event => ({
        ...event,
        pendingGuests: Math.floor(Math.random() * 10) + 1,
      }))
    );

    // Add realistic edge case guests to localStorage for testing
    const edgeCaseGuests = [
      {
        id: 'edge1',
        name: 'Alexandriaaaaaa Constantinopolous-Van Der Berg',
        email: 'very.long.email.address.that.might.break.layouts@example.com',
        phone: '+1 (555) 999-0000',
        instagram: '@alexandriaaaaaa_constantinopolous_van_der_berg_official',
        plusOnes: 8,
        status: 'pending',
        checkedIn: false,
        submittedAt: '30 seconds ago',
      },
      {
        id: 'edge2',
        name: 'X',
        email: 'x@x.co',
        phone: '+1',
        plusOnes: 0,
        status: 'pending',
        checkedIn: false,
        submittedAt: '999 days ago',
      },
      {
        id: 'edge3',
        name: 'Test User With émojis 🎉🎊✨',
        email: 'emoji@test.com',
        phone: '+1 (555) 123-4567',
        instagram: '@test_émojis_🎉',
        plusOnes: 15,
        status: 'pending',
        checkedIn: false,
        submittedAt: '2 minutes ago',
      },
    ];

    SafeStorage.setJSON('edge_case_guests', edgeCaseGuests);
    console.log('Added edge case guests for testing');
  };

  const clearStorage = () => {
    window.location.reload();
  };

  const toggleLoading = () => {
    setIsLoading(prev => !prev);
  };

  const simulateError = () => {
    alert('Simulated error: Network connection failed');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="p-6">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-600 mb-2">Nightlist</p>
            <h1 className="text-3xl font-light tracking-tight mb-1">Hey {djName}!</h1>
            <p className="text-gray-600">Manage your events and guest lists</p>
          </div>
          <button
            onClick={handleLogout}
            className="text-gray-600 hover:text-black transition-colors text-sm"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6">
        {/* Events */}
        <>
          {/* Upcoming Events */}
          <div className="mb-8">
            <h2 className="text-xl mb-4">Upcoming Events</h2>
            {upcomingEvents.length === 0 ? (
              <div className="bg-gray-50 rounded-xl p-8 text-center">
                <h3 className="text-lg mb-2">No upcoming events</h3>
                <p className="text-gray-600">
                  You'll see your future performances here once they're scheduled.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {upcomingEvents.map(event => (
                  <div key={event.id} className="bg-white border border-gray-200 rounded-xl p-8">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="text-lg">{event.name}</h3>
                      <p className="text-xs text-gray-600">{event.date}</p>
                    </div>

                    {event.otherDJs.length > 0 && (
                      <p className="text-sm text-gray-500 mb-4">With {event.otherDJs.join(', ')}</p>
                    )}

                    {/* Capacity Meter */}
                    <div className="mb-4">
                      <div className="w-full">
                        <div className="relative">
                          {/* Pending label above the meter bar when it would conflict */}
                          {event.pendingGuests &&
                            event.pendingGuests > 0 &&
                            (() => {
                              const pendingCenterPosition =
                                ((event.spotsUsed + event.pendingGuests / 2) / event.totalSpots) *
                                100;
                              const wouldOverlapConfirmed = pendingCenterPosition < 25;
                              const wouldOverlapSpots = pendingCenterPosition > 70;

                              return wouldOverlapConfirmed || wouldOverlapSpots ? (
                                <div
                                  className="absolute -top-5 text-xs text-gray-500"
                                  style={{
                                    left: `${pendingCenterPosition}%`,
                                    transform: 'translateX(-50%)',
                                  }}
                                >
                                  Pending
                                </div>
                              ) : null;
                            })()}

                          <div className="bg-gray-200 rounded-full h-4 relative overflow-hidden">
                            {/* Pending + Confirmed (light gray) bar - shows total */}
                            <div
                              className="bg-gray-400 h-4 rounded-full transition-all duration-300 absolute top-0 left-0"
                              style={{
                                width: `${((event.spotsUsed + (event.pendingGuests || 0)) / event.totalSpots) * 100}%`,
                              }}
                            >
                              {/* Pending count inside the gray bar - only show if bar is wide enough */}
                              {event.pendingGuests &&
                                event.pendingGuests > 0 &&
                                event.pendingGuests / event.totalSpots > 0.08 && (
                                  <span
                                    className="absolute top-1/2 -translate-y-1/2 text-white text-[10px] z-20"
                                    style={{ right: '8px' }}
                                  >
                                    {event.pendingGuests}
                                  </span>
                                )}
                            </div>
                            {/* Confirmed (black) bar - shows on top */}
                            <div
                              className="bg-black h-4 rounded-full transition-all duration-300 relative z-10"
                              style={{ width: `${(event.spotsUsed / event.totalSpots) * 100}%` }}
                            >
                              <span className="absolute right-2 top-1/2 -translate-y-1/2 text-white text-[10px]">
                                {event.spotsUsed}
                              </span>
                            </div>
                            <span className="absolute right-2 top-1/2 -translate-y-1/2 text-black text-[10px] z-20">
                              {event.totalSpots}
                            </span>
                          </div>

                          <div className="flex justify-between mt-2 relative">
                            <span className="text-xs text-gray-500">Confirmed</span>

                            {/* Pending label below the meter (normal position) - hide if too close to edges */}
                            {event.pendingGuests &&
                              event.pendingGuests > 0 &&
                              (() => {
                                const pendingCenterPosition =
                                  ((event.spotsUsed + event.pendingGuests / 2) / event.totalSpots) *
                                  100;
                                const wouldOverlapConfirmed = pendingCenterPosition < 30;
                                const wouldOverlapSpots = pendingCenterPosition > 65;

                                return !wouldOverlapConfirmed && !wouldOverlapSpots ? (
                                  <span
                                    className="absolute text-xs text-gray-500"
                                    style={{
                                      left: `${pendingCenterPosition}%`,
                                      transform: 'translateX(-50%)',
                                    }}
                                  >
                                    Pending
                                  </span>
                                ) : null;
                              })()}

                            <span className="text-xs text-gray-500">Spots available</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Share Invite Link */}
                    <div className="mb-6">
                      <p className="text-sm text-gray-600 mb-2">Share invite link:</p>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 relative">
                          <input
                            type="text"
                            value={`https://nightlist.app/guest/signup?event=${event.id}&dj=shadow`}
                            readOnly
                            onClick={() => handleCopyLink(event)}
                            className={`w-full bg-gray-100 rounded-full px-4 py-2 text-xs font-mono pr-4 cursor-pointer hover:bg-gray-200 transition-opacity ${
                              shareEventId === event.id ? 'opacity-0' : 'opacity-100'
                            }`}
                          />
                          {shareEventId === event.id && (
                            <div className="absolute inset-0 flex items-center justify-center text-xs text-gray-600 pointer-events-none">
                              Copied!
                            </div>
                          )}
                          <div className="absolute right-1 top-1 bottom-1 w-8 bg-gradient-to-l from-gray-100 via-gray-100/90 to-transparent rounded-r-full pointer-events-none"></div>
                        </div>
                        <button
                          onClick={() => handleCopyLink(event)}
                          className="px-3 py-1.5 bg-white text-black border border-black rounded-full hover:bg-gray-50 transition-colors text-xs"
                        >
                          Copy
                        </button>
                        <button
                          onClick={() => handleShareEvent(event)}
                          className="px-3 py-1.5 bg-black text-white rounded-full hover:bg-gray-900 transition-colors text-xs"
                        >
                          Share
                        </button>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                      <button
                        onClick={() => router.push(`/dj/events/${event.id}/capacity`)}
                        className="flex-1 bg-white text-black border border-gray-300 py-2 rounded-full text-xs hover:bg-gray-50 transition-colors leading-tight"
                      >
                        Request additional spots
                      </button>

                      <button
                        onClick={() => handleEventAction(event.id, 'manage')}
                        className={`flex-1 py-2 rounded-full text-xs transition-colors leading-tight ${
                          event.pendingGuests && event.pendingGuests > 0
                            ? 'bg-gray-400 text-white hover:bg-gray-500'
                            : 'bg-gray-800 text-white hover:bg-gray-900'
                        }`}
                      >
                        {event.pendingGuests && event.pendingGuests > 0
                          ? 'Review pending guests'
                          : 'Review guestlist'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Past Events */}
          <div>
            <h2 className="text-xl mb-4">Past Events</h2>
            {pastEvents.length === 0 ? (
              <div className="bg-gray-50 rounded-xl p-8 text-center">
                <h3 className="text-lg mb-2">No past events</h3>
                <p className="text-gray-600">
                  Your performance history will appear here after your first event.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {pastEvents.map(event => (
                  <button
                    key={event.id}
                    onClick={() => router.push(`/dj/events/${event.id}`)}
                    className="w-full bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors text-left"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="text-lg">{event.name}</h3>
                      <p className="text-xs text-gray-600">{event.date}</p>
                    </div>
                    {event.otherDJs.length > 0 && (
                      <p className="text-sm text-gray-500 mb-4">With {event.otherDJs.join(', ')}</p>
                    )}

                    <button
                      onClick={e => {
                        e.stopPropagation();
                        router.push(`/dj/events/${event.id}/manage`);
                      }}
                      className="bg-gray-50 border border-gray-300 text-black px-4 py-2 rounded-full text-sm hover:bg-gray-100 transition-colors"
                    >
                      Review guestlist
                    </button>
                  </button>
                ))}
              </div>
            )}
          </div>
        </>
      </div>

      {/* Debug Panel */}
      <DebugPanel
        onResetData={resetData}
        onFillToCapacity={fillToCapacity}
        onGenerateRandomGuests={generateRandomGuests}
        onClearStorage={clearStorage}
        onToggleLoading={toggleLoading}
        onSimulateError={simulateError}
      />
    </div>
  );
}
