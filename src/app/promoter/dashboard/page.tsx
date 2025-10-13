'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { SafeStorage } from '@/lib/utils/safeStorage';

interface Event {
  id: string;
  name: string;
  date: string;
  dayOfWeek: string;
  venue: string;
  djs: string[];
  capacity: number;
  spotsUsed: number;
  pendingGuests: number;
  checkedIn: number;
  status: 'upcoming' | 'past';
}

export default function PromoterDashboardPage() {
  const [promoterName, setPromoterName] = useState('');
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [shareEventId, setShareEventId] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Check authentication
    const isAuthenticated = SafeStorage.getItem('promoter_authenticated');
    if (!isAuthenticated) {
      router.push('/promoter/login');
      return;
    }

    // Get promoter info
    SafeStorage.getItem('promoter_email'); // Used for future API calls
    setPromoterName('Alex'); // This would come from API

    // Mock data - 21 days of events
    setTimeout(() => {
      const today = new Date();
      const mockEvents: Event[] = [];
      
      for (let i = 0; i < 21; i++) {
        const eventDate = new Date(today);
        eventDate.setDate(today.getDate() + i);
        
        // Only add events for certain days (not every day)
        if (i % 3 === 0 || i % 5 === 0) {
          const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
          const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
          
          mockEvents.push({
            id: `event_${i}`,
            name: i === 0 ? 'Saturday Night Sessions' :
                  i === 3 ? 'Midweek Vibes' :
                  i === 5 ? 'Summer Nights' :
                  i === 6 ? 'Underground Sessions' :
                  i === 9 ? 'Rooftop Party' :
                  `Night ${i + 1}`,
            date: `${dayNames[eventDate.getDay()]} ${monthNames[eventDate.getMonth()]} ${eventDate.getDate()}`,
            dayOfWeek: dayNames[eventDate.getDay()],
            venue: 'Datcha',
            djs: i === 0 ? ['DJ Marcus', 'MC Groove'] :
                 i === 3 ? ['DJ Luna'] :
                 i === 5 ? ['DJ Shadow', 'MC Flow'] :
                 i === 6 ? ['DJ Beats'] :
                 ['DJ Electric'],
            capacity: 50, // Manager-configurable capacity
            spotsUsed: i === 0 ? 0 : Math.floor(Math.random() * 35) + 5,
            pendingGuests: i === 0 ? 8 : Math.floor(Math.random() * 8),
            checkedIn: Math.floor(Math.random() * 20),
            status: 'upcoming'
          });
        }
      }

      setEvents(mockEvents);
      setIsLoading(false);
    }, 1000);
  }, [router]);

  const handleCopyLink = async (event: Event) => {
    const shareUrl = `https://nightlist.app/guest/signup?event=${event.id}&promoter=alex`;

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
    const shareUrl = `https://nightlist.app/guest/signup?event=${event.id}&promoter=alex`;
    const shareData = {
      title: `Join me at ${event.name}`,
      text: `You're invited to ${event.name} on ${event.date}. Join the guest list!`,
      url: shareUrl
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

  const handleLogout = () => {
    SafeStorage.removeItem('promoter_authenticated');
    SafeStorage.removeItem('promoter_email');
    router.push('/promoter/login');
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
            <h1 className="text-3xl font-light tracking-tight mb-1">Hey {promoterName}!</h1>
            <p className="text-gray-600">Invite friends to an upcoming night</p>
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
        {/* Events for next 21 days */}
        <div className="mb-8">
          <h2 className="text-xl mb-4">Upcoming Events</h2>
          {events.length === 0 ? (
            <div className="bg-gray-50 rounded-xl p-8 text-center">
              <h3 className="text-lg mb-2">No upcoming events</h3>
              <p className="text-gray-600">Events will appear here once they&apos;re scheduled.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {events.map((event) => (
                <div
                  key={event.id}
                  className="bg-white border border-gray-200 rounded-xl p-6"
                >
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-lg">{event.name}</h3>
                    <p className="text-xs text-gray-600">{event.date}</p>
                  </div>

                  {event.djs.length > 0 && (
                    <p className="text-sm text-gray-500 mb-4">
                      With {event.djs.join(', ')}
                    </p>
                  )}

                  <div className="mb-4">
                    
                    {/* Capacity Meter */}
                    <div className="w-full">
                      <div className="relative">
                        {/* Pending label above the meter bar when it would conflict */}
                        {event.pendingGuests > 0 && (() => {
                          const pendingCenterPosition = ((event.spotsUsed + (event.pendingGuests / 2)) / event.capacity) * 100;
                          const wouldOverlapConfirmed = pendingCenterPosition < 25;
                          const wouldOverlapSpots = pendingCenterPosition > 70;
                          
                          return (wouldOverlapConfirmed || wouldOverlapSpots) ? (
                            <div 
                              className="absolute -top-5 text-xs text-gray-500"
                              style={{ 
                                left: `${pendingCenterPosition}%`,
                                transform: 'translateX(-50%)'
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
                            style={{ width: `${((event.spotsUsed + event.pendingGuests) / event.capacity) * 100}%` }}
                          >
                            {/* Pending count inside the gray bar - only show if bar is wide enough */}
                            {event.pendingGuests > 0 && (event.pendingGuests / event.capacity) > 0.08 && (
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
                            style={{ width: `${(event.spotsUsed / event.capacity) * 100}%` }}
                          >
                            <span className="absolute right-2 top-1/2 -translate-y-1/2 text-white text-[10px]">
                              {event.spotsUsed}
                            </span>
                          </div>
                          <span className="absolute right-2 top-1/2 -translate-y-1/2 text-black text-[10px] z-20">
                            {event.capacity}
                          </span>
                        </div>
                        
                        <div className="flex justify-between mt-2 relative">
                          <span className="text-xs text-gray-500">Confirmed</span>

                          {/* Pending label below the meter (normal position) - hide if too close to edges */}
                          {event.pendingGuests > 0 && (() => {
                            const pendingCenterPosition = ((event.spotsUsed + (event.pendingGuests / 2)) / event.capacity) * 100;
                            const wouldOverlapConfirmed = pendingCenterPosition < 30;
                            const wouldOverlapSpots = pendingCenterPosition > 65;

                            return (!wouldOverlapConfirmed && !wouldOverlapSpots) ? (
                              <span
                                className="absolute text-xs text-gray-500"
                                style={{
                                  left: `${pendingCenterPosition}%`,
                                  transform: 'translateX(-50%)'
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
                          value={`https://nightlist.app/guest/signup?event=${event.id}&promoter=alex`}
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
                        onClick={async () => {
                          const shareUrl = `https://nightlist.app/guest/signup?event=${event.id}&promoter=alex`;
                          const shareData = {
                            title: `Join me at ${event.name}`,
                            text: `You're invited to ${event.name} on ${event.date}. Join the guest list!`,
                            url: shareUrl
                          };

                          if (navigator.share) {
                            try {
                              await navigator.share(shareData);
                            } catch (error) {
                              if ((error as Error).name !== 'AbortError') {
                                console.error('Share failed:', error);
                              }
                            }
                          }
                        }}
                        className="px-3 py-1.5 bg-black text-white rounded-full hover:bg-gray-900 transition-colors text-xs"
                      >
                        Share
                      </button>
                    </div>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <button
                      onClick={() => router.push(`/promoter/events/${event.id}/capacity`)}
                      className="flex-1 bg-white text-black border border-gray-300 py-2 rounded-full text-xs hover:bg-gray-50 transition-colors leading-tight"
                    >
                      Request additional spots
                    </button>

                    <button
                      onClick={() => router.push(`/promoter/events/${event.id}/manage`)}
                      className={`flex-1 py-2 rounded-full text-xs transition-colors leading-tight ${
                        event.pendingGuests > 0
                          ? 'bg-gray-400 text-white hover:bg-gray-500'
                          : 'bg-gray-800 text-white hover:bg-gray-900'
                      }`}
                    >
                      {event.pendingGuests > 0
                        ? 'Review pending guests'
                        : 'Review guestlist'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}