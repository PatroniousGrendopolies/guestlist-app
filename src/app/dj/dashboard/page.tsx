'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface Event {
  id: string;
  name: string;
  date: string;
  otherDJs: string[];
  spotsUsed: number;
  totalSpots: number;
  status: 'upcoming' | 'past';
  conversionRate?: number;
  totalAttendees?: number;
}

interface QuickStats {
  lastEventConversion: number;
  totalGuestsLifetime: number;
  thisMonthAttendees: number;
}

export default function DJDashboardPage() {
  const [djName, setDjName] = useState('');
  const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([]);
  const [pastEvents, setPastEvents] = useState<Event[]>([]);
  const [quickStats, setQuickStats] = useState<QuickStats>({
    lastEventConversion: 85,
    totalGuestsLifetime: 487,
    thisMonthAttendees: 67
  });
  const [activeTab, setActiveTab] = useState<'events' | 'analytics'>('events');
  const [isLoading, setIsLoading] = useState(true);
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
          date: 'Sat, July 6th, 2025',
          otherDJs: ['DJ Marcus', 'MC Groove'],
          spotsUsed: 23,
          totalSpots: 75,
          status: 'upcoming'
        },
        {
          id: '2',
          name: 'Summer Vibes',
          date: 'Fri, July 12th, 2025',
          otherDJs: ['DJ Luna'],
          spotsUsed: 8,
          totalSpots: 75,
          status: 'upcoming'
        }
      ]);

      setPastEvents([
        {
          id: '3',
          name: 'Last Weekend Bash',
          date: 'Sat, June 29th, 2025',
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
    localStorage.removeItem('dj_authenticated');
    localStorage.removeItem('dj_email');
    router.push('/dj/login');
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
      <div className="bg-black text-white p-6">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-light tracking-tight mb-1">Hey {djName}!</h1>
            <p className="text-gray-300">Manage your events and guest lists</p>
          </div>
          <button
            onClick={handleLogout}
            className="text-gray-400 hover:text-white transition-colors text-sm"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6">
        {/* Tabs */}
        <div className="flex gap-1 mb-8 bg-gray-100 rounded-xl p-1">
          <button
            onClick={() => setActiveTab('events')}
            className={`px-6 py-3 rounded-lg font-medium transition-colors flex-1 ${
              activeTab === 'events' 
                ? 'bg-white text-black shadow-sm' 
                : 'text-gray-600 hover:text-black'
            }`}
          >
            Events
          </button>
          <button
            onClick={() => setActiveTab('analytics')}
            className={`px-6 py-3 rounded-lg font-medium transition-colors flex-1 ${
              activeTab === 'analytics' 
                ? 'bg-white text-black shadow-sm' 
                : 'text-gray-600 hover:text-black'
            }`}
          >
            Analytics
          </button>
        </div>

        {/* Events Tab */}
        {activeTab === 'events' && (
          <>
            {/* Upcoming Events */}
            <div className="mb-8">
              <h2 className="text-xl font-medium mb-4">Upcoming Events</h2>
              {upcomingEvents.length === 0 ? (
                <div className="bg-gray-50 rounded-xl p-8 text-center">
                  <h3 className="text-lg font-medium mb-2">No upcoming events</h3>
                  <p className="text-gray-600">You'll see your future performances here once they're scheduled.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {upcomingEvents.map((event) => (
                    <button
                      key={event.id}
                      onClick={() => handleEventAction(event.id, 'manage')}
                      className="w-full bg-white border border-gray-200 rounded-xl p-6 hover:border-gray-300 transition-colors text-left"
                    >
                      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold mb-1">{event.name}</h3>
                          <p className="text-gray-600 mb-2">{event.date}</p>
                          {event.otherDJs.length > 0 && (
                            <p className="text-sm text-gray-500">
                              Also playing: {event.otherDJs.join(', ')}
                            </p>
                          )}
                        </div>
                        
                        <div className="text-center">
                          <div className="text-lg font-semibold">
                            {event.spotsUsed}/{event.totalSpots}
                          </div>
                          <div className="text-xs text-gray-500">spots filled</div>
                          <div className="w-24 bg-gray-200 rounded-full h-2 mt-1">
                            <div 
                              className="bg-black h-2 rounded-full transition-all duration-300"
                              style={{ width: `${(event.spotsUsed / event.totalSpots) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Past Events */}
            <div>
              <h2 className="text-xl font-medium mb-4">Past Events</h2>
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
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl p-6 hover:border-gray-300 transition-colors text-left"
                    >
                      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold mb-1">{event.name}</h3>
                          <p className="text-gray-600 mb-2">{event.date}</p>
                          {event.otherDJs.length > 0 && (
                            <p className="text-sm text-gray-500">
                              Also played: {event.otherDJs.join(', ')}
                            </p>
                          )}
                        </div>
                        
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                          <div className="grid grid-cols-2 gap-4 text-center">
                            <div>
                              <div className="text-lg font-semibold">{event.spotsUsed}</div>
                              <div className="text-xs text-gray-500">invited</div>
                            </div>
                            <div>
                              <div className="text-lg font-semibold">{event.totalAttendees}</div>
                              <div className="text-xs text-gray-500">attended</div>
                            </div>
                          </div>
                          
                          <div className="text-center">
                            <div className="text-2xl font-bold text-black">{event.conversionRate}%</div>
                            <div className="text-xs text-gray-500">conversion rate</div>
                          </div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <>
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="bg-gray-50 rounded-xl p-4">
                <h3 className="text-sm text-gray-600 font-medium">Last Event Conversion</h3>
                <p className="text-2xl font-semibold">{quickStats.lastEventConversion}%</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-4">
                <h3 className="text-sm text-gray-600 font-medium">This Month Attendees</h3>
                <p className="text-2xl font-semibold">{quickStats.thisMonthAttendees}</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-4">
                <h3 className="text-sm text-gray-600 font-medium">Total Guests Lifetime</h3>
                <p className="text-2xl font-semibold">{quickStats.totalGuestsLifetime}</p>
              </div>
            </div>

            {/* Full Analytics Button */}
            <div className="text-center">
              <button
                onClick={() => router.push('/dj/analytics')}
                className="px-8 py-4 bg-black text-white rounded-xl font-medium hover:bg-gray-900 transition-colors"
              >
                View Full Analytics
              </button>
            </div>
          </>
        )}

        {/* Navigation hint */}
        <div className="mt-12 text-center text-gray-500 text-sm">
          <p>Use the action buttons above to manage your events and guest lists</p>
        </div>
      </div>
    </div>
  );
}