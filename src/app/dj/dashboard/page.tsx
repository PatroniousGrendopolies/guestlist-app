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
  const [copiedEventId, setCopiedEventId] = useState<string | null>(null);
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

    // Mock data - in real app, this would come from API
    setTimeout(() => {
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
          hasInvitedPastGuests: false
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
          hasInvitedPastGuests: true
        }
      ]);

      setPastEvents([
        {
          id: '3',
          name: 'Last Weekend Bash',
          date: 'June 29 2025',
          otherDJs: ['DJ Beats'],
          spotsUsed: 68,
          totalSpots: 75,
          conversionRate: 85,
          totalAttendees: 58,
          status: 'past'
        }
      ]);

      setIsLoading(false);
    }, 1000);
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
        hasInvitedPastGuests: false
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
        hasInvitedPastGuests: true
      }
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
    setUpcomingEvents(prev => prev.map(event => ({
      ...event,
      spotsUsed: event.totalSpots - 2, // Leave 2 spots
      pendingGuests: 3 // Add some pending
    })));
  };

  const generateRandomGuests = () => {
    setUpcomingEvents(prev => prev.map(event => ({
      ...event,
      pendingGuests: Math.floor(Math.random() * 10) + 1
    })));
    
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
        submittedAt: '30 seconds ago'
      },
      {
        id: 'edge2', 
        name: 'X',
        email: 'x@x.co',
        phone: '+1',
        plusOnes: 0,
        status: 'pending',
        checkedIn: false,
        submittedAt: '999 days ago'
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
        submittedAt: '2 minutes ago'
      }
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
                  <h3 className="text-lg font-medium mb-2">No upcoming events</h3>
                  <p className="text-gray-600">You'll see your future performances here once they're scheduled.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {upcomingEvents.map((event) => (
                    <div
                      key={event.id}
                      className="bg-white border border-gray-200 rounded-xl p-8"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="text-lg">{event.name}</h3>
                        <p className="text-xs text-gray-600">{event.date}</p>
                      </div>
                      
                      {event.otherDJs.length > 0 && (
                        <p className="text-sm text-gray-500 mb-4">
                          With {event.otherDJs.join(', ')}
                        </p>
                      )}
                      
                      {/* Invite Link */}
                      <div className="mb-8">
                        <p className="text-sm text-gray-600 mb-2">Invite guests to sign up for the list:</p>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 relative">
                            <input
                              type="text"
                              value={`https://nightlist.app/guest/signup?event=${event.id}&dj=shadow`}
                              readOnly
                              className="w-full bg-gray-100 rounded-full px-4 py-2 text-xs font-mono pr-4"
                            />
                            <div className="absolute right-1 top-1 bottom-1 w-8 bg-gradient-to-l from-gray-100 via-gray-100/90 to-transparent rounded-r-full pointer-events-none"></div>
                          </div>
                          <button
                            onClick={async (e) => {
                              e.stopPropagation();
                              const textToCopy = `https://nightlist.app/guest/signup?event=${event.id}&dj=shadow`;
                              
                              try {
                                // Try modern clipboard API first
                                if (navigator.clipboard && window.isSecureContext) {
                                  await navigator.clipboard.writeText(textToCopy);
                                } else {
                                  // Fallback for mobile Safari
                                  const textArea = document.createElement('textarea');
                                  textArea.value = textToCopy;
                                  textArea.style.position = 'fixed';
                                  textArea.style.left = '-999999px';
                                  document.body.appendChild(textArea);
                                  textArea.select();
                                  document.execCommand('copy');
                                  document.body.removeChild(textArea);
                                }
                                
                                setCopiedEventId(event.id);
                                setTimeout(() => setCopiedEventId(null), 2000);
                              } catch (err) {
                                console.error('Failed to copy:', err);
                              }
                            }}
                            className="px-3 py-1.5 bg-white border border-black text-black rounded-full hover:bg-gray-50 transition-colors text-xs"
                          >
                            {copiedEventId === event.id ? 'Copied!' : 'Copy'}
                          </button>
                        </div>
                      </div>
                      
                      {/* Action Buttons */}
                      <div className="flex gap-3">
                        <button
                          onClick={() => handleEventAction(event.id, 'manage')}
                          className="flex-1 bg-gray-800 text-white py-3 px-4 rounded-full text-sm hover:bg-gray-900 transition-colors min-h-[48px] flex items-center justify-center"
                        >
                          <span className="text-center leading-tight">
                            {event.pendingGuests && event.pendingGuests > 0 
                              ? 'Review pending guests' 
                              : 'Review guestlist'}
                          </span>
                        </button>
                        <button
                          onClick={() => router.push(`/dj/events/${event.id}/invite-past-guests`)}
                          className="flex-1 bg-gray-100 text-black py-3 px-4 rounded-full text-sm hover:bg-gray-200 transition-colors min-h-[48px] flex items-center justify-center"
                        >
                          <span className="text-center leading-tight">
                            Invite past guests
                          </span>
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
                  <h3 className="text-lg font-medium mb-2">No past events</h3>
                  <p className="text-gray-600">Your performance history will appear here after your first event.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {pastEvents.map((event) => (
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
                        <p className="text-sm text-gray-500 mb-4">
                          With {event.otherDJs.join(', ')}
                        </p>
                      )}
                      
                      <button
                        onClick={(e) => {
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