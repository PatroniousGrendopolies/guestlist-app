'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface Event {
  id: string;
  name: string;
  date: string;
  djs: string[];
  spotsUsed: number;
  totalSpots: number;
  status: 'upcoming' | 'past';
}

export default function StaffDashboardPage() {
  const [staffName, setStaffName] = useState('');
  const [next7DaysEvents, setNext7DaysEvents] = useState<Event[]>([]);
  const [additionalEvents, setAdditionalEvents] = useState<Event[]>([]);
  const [showMoreEvents, setShowMoreEvents] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [shareEventId, setShareEventId] = useState<string | null>(null);
  const [capacityRequestEventId, setCapacityRequestEventId] = useState<string | null>(null);
  const [requestedCapacity, setRequestedCapacity] = useState(6);
  const [requestReason, setRequestReason] = useState('');
  const router = useRouter();

  useEffect(() => {
    // Simulate API call to get staff data
    setTimeout(() => {
      setStaffName('Alex');
      
      // Mock next 7 days events
      setNext7DaysEvents([
        {
          id: '1',
          name: 'Saturday Night Sessions',
          date: 'July 6 2025',
          djs: ['DJ Marcus', 'MC Groove'],
          spotsUsed: 3,
          totalSpots: 5,
          status: 'upcoming'
        },
        {
          id: '2',
          name: 'Summer Vibes',
          date: 'July 12 2025',
          djs: ['DJ Luna'],
          spotsUsed: 5,
          totalSpots: 5,
          status: 'upcoming'
        },
        {
          id: '3',
          name: 'Weekend Warmup',
          date: 'July 13 2025',
          djs: ['DJ Beats', 'MC Flow'],
          spotsUsed: 2,
          totalSpots: 5,
          status: 'upcoming'
        }
      ]);

      // Mock additional future events (loaded when "View more" is clicked)
      setAdditionalEvents([
        {
          id: '4',
          name: 'Late Night Sessions',
          date: 'July 19 2025',
          djs: ['DJ Shadow'],
          spotsUsed: 0,
          totalSpots: 5,
          status: 'upcoming'
        },
        {
          id: '5',
          name: 'Friday Night Fever',
          date: 'July 25 2025',
          djs: ['DJ Electric', 'MC Smooth'],
          spotsUsed: 1,
          totalSpots: 5,
          status: 'upcoming'
        }
      ]);

      setIsLoading(false);
    }, 1000);
  }, []);

  const handleLogout = () => {
    // Handle logout logic
    router.push('/');
  };

  const handleShareEvent = async (event: Event) => {
    const shareUrl = `https://nightlist.app/guest/signup?event=${event.id}&staff=alex`;
    const shareData = {
      title: `Join me at ${event.name}`,
      text: `You're invited to ${event.name} on ${event.date}. Join the guest list!`,
      url: shareUrl
    };

    // Force try Web Share API first on mobile devices
    if (navigator.share) {
      try {
        console.log('Attempting Web Share API...');
        await navigator.share(shareData);
        console.log('Share completed successfully');
        return;
      } catch (error) {
        console.error('Web Share API failed:', error);
        if (error.name === 'AbortError') {
          console.log('User cancelled the share');
          return;
        }
        // Continue to fallback on other errors
      }
    }

    // Fallback to clipboard only
    console.log('Falling back to clipboard');
    try {
      await copyToClipboard(shareUrl);
      setShareEventId(event.id);
      setTimeout(() => setShareEventId(null), 2000);
    } catch (clipboardError) {
      console.error('Clipboard fallback failed:', clipboardError);
    }
  };

  const copyToClipboard = async (text: string) => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
      } else {
        // Fallback for mobile Safari
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleCapacityRequest = async (eventId: string) => {
    // Simulate API call to request capacity increase
    console.log(`Requesting ${requestedCapacity} spots for event ${eventId}: ${requestReason}`);
    
    // Show success state
    setCapacityRequestEventId(null);
    setRequestReason('');
    setRequestedCapacity(6);
    
    // You could show a toast notification here
    alert('Capacity request sent to manager!');
  };


  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="p-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-2">
            <p className="text-sm text-gray-600">Nightlist</p>
            <button
              onClick={handleLogout}
              className="text-gray-600 hover:text-black transition-colors text-sm"
            >
              Logout
            </button>
          </div>
          <h1 className="text-3xl font-light tracking-tight mb-1">Hey {staffName}!</h1>
          <p className="text-gray-600">Manage your guest lists and events</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6">
        {/* Upcoming Events */}
        <div className="mb-8">
          <h2 className="text-xl mb-1">Datcha's Upcoming Events</h2>
          <p className="text-gray-600 mb-4">Invite friends to come by on your next shift</p>
          {next7DaysEvents.length === 0 ? (
            <div className="bg-gray-50 rounded-xl p-8 text-center">
              <h3 className="text-lg mb-2">No upcoming events</h3>
              <p className="text-gray-600">Your next events will appear here</p>
            </div>
          ) : (
            <div className="space-y-4">
              {next7DaysEvents.map((event) => (
                <div
                  key={event.id}
                  className="bg-white border border-gray-200 rounded-xl p-8"
                >
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-lg">{event.name}</h3>
                    <p className="text-xs text-gray-600">{event.date}</p>
                  </div>
                  
                  {event.djs.length > 0 && (
                    <p className="text-sm text-gray-500 mb-6">
                      With {event.djs.join(', ')}
                    </p>
                  )}
                  
                  {/* Capacity Meter */}
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-600">Your confirmed guest list</span>
                    </div>
                    <div className="relative">
                      <div className="bg-gray-200 rounded-full h-4 relative">
                        <div 
                          className="bg-black h-4 rounded-full transition-all duration-300"
                          style={{ width: `${(event.spotsUsed / event.totalSpots) * 100}%` }}
                        ></div>
                        <span className="absolute top-1/2 left-2 -translate-y-1/2 text-white text-[10px]">
                          {event.spotsUsed}
                        </span>
                        <span className="absolute top-1/2 right-2 -translate-y-1/2 text-black text-[10px]">
                          {event.totalSpots}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex gap-3 mb-4">
                    <button
                      onClick={() => handleShareEvent(event)}
                      className="flex-1 bg-black text-white py-2 rounded-full text-sm hover:bg-gray-900 transition-colors"
                    >
                      {shareEventId === event.id ? 'Link Copied!' : 'Share Invite'}
                    </button>
                    <button
                      onClick={() => router.push(`/staff/events/${event.id}/manage`)}
                      className="flex-1 bg-gray-100 text-black py-2 rounded-full text-sm hover:bg-gray-200 transition-colors"
                    >
                      Review Lists
                    </button>
                  </div>

                  {/* Capacity Request Section */}
                  <div className="border-t border-gray-200 pt-4">
                    {capacityRequestEventId === event.id ? (
                      <div className="space-y-3">
                        <p className="text-sm text-gray-600">Request additional spots:</p>
                        <div className="flex items-center gap-3">
                          <select
                            value={requestedCapacity}
                            onChange={(e) => setRequestedCapacity(Number(e.target.value))}
                            className="border border-gray-200 rounded-lg px-3 py-1 text-sm"
                          >
                            {[6, 7, 8, 9, 10].map(num => (
                              <option key={num} value={num}>{num} spots</option>
                            ))}
                          </select>
                          <input
                            type="text"
                            placeholder="Reason (optional)"
                            value={requestReason}
                            onChange={(e) => setRequestReason(e.target.value)}
                            className="flex-1 border border-gray-200 rounded-lg px-3 py-1 text-sm"
                          />
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleCapacityRequest(event.id)}
                            className="bg-black text-white px-4 py-1 rounded-full text-sm hover:bg-gray-900 transition-colors"
                          >
                            Send Request
                          </button>
                          <button
                            onClick={() => setCapacityRequestEventId(null)}
                            className="bg-gray-100 text-black px-4 py-1 rounded-full text-sm hover:bg-gray-200 transition-colors"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <button
                        onClick={() => setCapacityRequestEventId(event.id)}
                        className="bg-gray-50 border border-gray-300 text-black px-4 py-2 rounded-full text-sm hover:bg-gray-100 transition-colors"
                      >
                        Request Additional Spots
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Additional Events Section */}
        {showMoreEvents && additionalEvents.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl mb-4">More Upcoming Events</h2>
            <div className="space-y-4">
              {additionalEvents.map((event) => (
                <div
                  key={event.id}
                  className="bg-white border border-gray-200 rounded-xl p-8"
                >
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-lg">{event.name}</h3>
                    <p className="text-xs text-gray-600">{event.date}</p>
                  </div>
                  
                  {event.djs.length > 0 && (
                    <p className="text-sm text-gray-500 mb-6">
                      With {event.djs.join(', ')}
                    </p>
                  )}
                  
                  {/* Capacity Meter */}
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-600">Your confirmed guest list</span>
                    </div>
                    <div className="relative">
                      <div className="bg-gray-200 rounded-full h-4 relative">
                        <div 
                          className="bg-black h-4 rounded-full transition-all duration-300"
                          style={{ width: `${(event.spotsUsed / event.totalSpots) * 100}%` }}
                        ></div>
                        <span className="absolute top-1/2 left-2 -translate-y-1/2 text-white text-[10px]">
                          {event.spotsUsed}
                        </span>
                        <span className="absolute top-1/2 right-2 -translate-y-1/2 text-black text-[10px]">
                          {event.totalSpots}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex gap-3 mb-4">
                    <button
                      onClick={() => handleShareEvent(event)}
                      className="flex-1 bg-black text-white py-2 rounded-full text-sm hover:bg-gray-900 transition-colors"
                    >
                      {shareEventId === event.id ? 'Link Copied!' : 'Share Invite'}
                    </button>
                    <button
                      onClick={() => router.push(`/staff/events/${event.id}/manage`)}
                      className="flex-1 bg-gray-100 text-black py-2 rounded-full text-sm hover:bg-gray-200 transition-colors"
                    >
                      Review Lists
                    </button>
                  </div>

                  {/* Capacity Request Section */}
                  <div className="border-t border-gray-200 pt-4">
                    {capacityRequestEventId === event.id ? (
                      <div className="space-y-3">
                        <p className="text-sm text-gray-600">Request additional spots:</p>
                        <div className="flex items-center gap-3">
                          <select
                            value={requestedCapacity}
                            onChange={(e) => setRequestedCapacity(Number(e.target.value))}
                            className="border border-gray-200 rounded-lg px-3 py-1 text-sm"
                          >
                            {[6, 7, 8, 9, 10].map(num => (
                              <option key={num} value={num}>{num} spots</option>
                            ))}
                          </select>
                          <input
                            type="text"
                            placeholder="Reason (optional)"
                            value={requestReason}
                            onChange={(e) => setRequestReason(e.target.value)}
                            className="flex-1 border border-gray-200 rounded-lg px-3 py-1 text-sm"
                          />
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleCapacityRequest(event.id)}
                            className="bg-black text-white px-4 py-1 rounded-full text-sm hover:bg-gray-900 transition-colors"
                          >
                            Send Request
                          </button>
                          <button
                            onClick={() => setCapacityRequestEventId(null)}
                            className="bg-gray-100 text-black px-4 py-1 rounded-full text-sm hover:bg-gray-200 transition-colors"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <button
                        onClick={() => setCapacityRequestEventId(event.id)}
                        className="bg-gray-50 border border-gray-300 text-black px-4 py-2 rounded-full text-sm hover:bg-gray-100 transition-colors"
                      >
                        Request Additional Spots
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Load More Events Button */}
        {!showMoreEvents && additionalEvents.length > 0 && (
          <div className="text-center">
            <button
              onClick={() => setShowMoreEvents(true)}
              className="bg-gray-100 text-black px-6 py-3 rounded-full text-sm hover:bg-gray-200 transition-colors"
            >
              View more upcoming events
            </button>
          </div>
        )}
      </div>
    </div>
  );
}