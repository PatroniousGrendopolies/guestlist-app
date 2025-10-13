'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { SafeStorage } from '@/lib/utils/safeStorage';

interface Event {
  id: string;
  date: string;
  dayOfWeek: string;
  djNames: string;
  eventName: string;
  approvalRatio: number;
  totalGuests: number;
  approvedGuests: number;
  pendingGuests: number;
  status: 'upcoming' | 'today' | 'past';
}

interface Alert {
  id: string;
  type: 'warning' | 'error' | 'info';
  message: string;
  action?: string;
  actionUrl?: string;
}

interface CapacityRequest {
  id: string;
  requesterName: string;
  requesterRole: 'dj' | 'staff' | 'promoter';
  eventName: string;
  eventDate: string;
  spotsRequested: number;
  currentCapacity: number;
  reason?: string;
}

interface AttendanceRecord {
  eventDate: string;
  djNames: string;
  addedBy: string;
}

interface Guest {
  id: string;
  name: string;
  email: string;
  phone: string;
  instagram?: string;
  totalAttendance: number;
  lastAttended: string;
  addedBy: string[];
  status: 'active' | 'banned';
  notes?: string;
  upcomingEvents?: string[];
  attendanceHistory?: AttendanceRecord[];
}

export default function ManagerDashboardPage() {
  const [managerName, setManagerName] = useState('');
  const [managerRole, setManagerRole] = useState('');
  const [events, setEvents] = useState<Event[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [capacityRequests, setCapacityRequests] = useState<CapacityRequest[]>([]);
  const [guests, setGuests] = useState<Guest[]>([]);
  const [guestSearch, setGuestSearch] = useState('');
  const [activeTab, setActiveTab] = useState<'overview' | 'calendar' | 'guests' | 'users' | 'analytics'>('overview');
  const [isLoading, setIsLoading] = useState(true);
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const [showMonthPicker, setShowMonthPicker] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check authentication
    const isAuthenticated = SafeStorage.getItem('manager_authenticated');
    if (!isAuthenticated) {
      router.push('/manager/login');
      return;
    }

    // Get manager info
    const name = SafeStorage.getItem('manager_name') || 'Manager';
    const role = SafeStorage.getItem('manager_role') || 'manager';
    setManagerName(name);
    setManagerRole(role);

    // Mock data - 7 days of events
    setTimeout(() => {
      const today = new Date();
      const mockEvents: Event[] = [];
      const mockAlerts: Alert[] = [];

      for (let i = 0; i < 7; i++) {
        const eventDate = new Date(today);
        eventDate.setDate(today.getDate() + i);

        // Add events for certain days
        if (i % 2 === 0 || i === 1) {
          const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
          const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

          const totalGuests = Math.floor(Math.random() * 60) + 40;
          const approvedGuests = Math.floor(totalGuests * (0.5 + Math.random() * 0.4));
          const pendingGuests = totalGuests - approvedGuests;
          const approvalRatio = (approvedGuests / totalGuests) * 100;

          const djOptions = [
            'DJ Marcus & Sarah Deep',
            'Techno Collective',
            'DJ Shadow & MC Solar',
            'Underground Sessions',
            'House Masters'
          ];

          const eventNameOptions = [
            'Saturday Night Sessions',
            'Techno Warehouse',
            'Deep House Vibes',
            'Underground Collective',
            'House Party'
          ];

          const event: Event = {
            id: `event_${i}`,
            date: `${dayNames[eventDate.getDay()]} ${monthNames[eventDate.getMonth()]} ${eventDate.getDate()}`,
            dayOfWeek: dayNames[eventDate.getDay()],
            djNames: djOptions[i % djOptions.length],
            eventName: eventNameOptions[i % eventNameOptions.length],
            approvalRatio,
            totalGuests,
            approvedGuests,
            pendingGuests,
            status: i === 0 ? 'today' : i > 0 ? 'upcoming' : 'past'
          };

          mockEvents.push(event);

          // Generate alerts based on conditions
          if (i === 1 && approvalRatio < 65) {
            mockAlerts.push({
              id: `alert_${i}`,
              type: 'warning',
              message: `Tomorrow's event only ${Math.round(approvalRatio)}% approved`,
              action: 'Review Event',
              actionUrl: `/manager/events/${event.id}`
            });
          }

          if (i === 3) {
            mockAlerts.push({
              id: 'dj_missing',
              type: 'error',
              message: 'DJ Marcus hasn\'t accepted invite for Saturday',
              action: 'Send Reminder',
              actionUrl: `/manager/users/djs`
            });
          }
        }
      }

      // Add capacity requests alert
      mockAlerts.push({
        id: 'capacity_requests',
        type: 'info',
        message: '2 capacity increase requests pending',
        action: 'Review Requests',
        actionUrl: '/manager/capacity-requests'
      });

      setEvents(mockEvents);
      setAlerts(mockAlerts);
      setIsLoading(false);
    }, 1000);
  }, [router]);

  const handleLogout = () => {
    SafeStorage.removeItem('manager_authenticated');
    SafeStorage.removeItem('manager_email');
    SafeStorage.removeItem('manager_role');
    SafeStorage.removeItem('manager_name');
    router.push('/manager/login');
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
      <div className="border-b border-gray-200">
        <div className="max-w-6xl mx-auto p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-light tracking-tight mb-1">Manager Dashboard</h1>
              <p className="text-gray-600">Welcome back, {managerName}</p>
              <div className="text-xs text-gray-500 mt-1">
                Role: {managerRole.charAt(0).toUpperCase() + managerRole.slice(1)}
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => router.push('/manager/events/create')}
                className="bg-black text-white px-6 py-2 rounded-full hover:bg-gray-900 transition-colors text-sm"
              >
                Create Event
              </button>
              <button
                onClick={() => router.push('/manager/users')}
                className="bg-gray-100 text-black px-6 py-2 rounded-full hover:bg-gray-200 transition-colors text-sm"
              >
                Invite User
              </button>
              <button
                onClick={handleLogout}
                className="text-gray-600 hover:text-black transition-colors text-sm"
              >
                Logout
              </button>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex gap-8 border-b border-gray-200">
            <button
              onClick={() => setActiveTab('overview')}
              className={`pb-3 text-sm transition-colors relative ${
                activeTab === 'overview' ? 'text-black' : 'text-gray-500 hover:text-black'
              }`}
            >
              Overview
              {activeTab === 'overview' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-black"></div>
              )}
            </button>
            <button
              onClick={() => setActiveTab('calendar')}
              className={`pb-3 text-sm transition-colors relative ${
                activeTab === 'calendar' ? 'text-black' : 'text-gray-500 hover:text-black'
              }`}
            >
              Calendar
              {activeTab === 'calendar' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-black"></div>
              )}
            </button>
            <button
              onClick={() => setActiveTab('guests')}
              className={`pb-3 text-sm transition-colors relative ${
                activeTab === 'guests' ? 'text-black' : 'text-gray-500 hover:text-black'
              }`}
            >
              Guests
              {activeTab === 'guests' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-black"></div>
              )}
            </button>
            <button
              onClick={() => setActiveTab('users')}
              className={`pb-3 text-sm transition-colors relative ${
                activeTab === 'users' ? 'text-black' : 'text-gray-500 hover:text-black'
              }`}
            >
              Nightlist Users
              {activeTab === 'users' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-black"></div>
              )}
            </button>
            <button
              onClick={() => setActiveTab('analytics')}
              className={`pb-3 text-sm transition-colors relative ${
                activeTab === 'analytics' ? 'text-black' : 'text-gray-500 hover:text-black'
              }`}
            >
              Analytics
              {activeTab === 'analytics' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-black"></div>
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div>
            {/* Alerts Section */}
            {alerts.length > 0 && (
              <div className="mb-8">
                <h2 className="text-xl mb-4">Alerts</h2>
                <div className="space-y-3">
                  {alerts.map((alert) => (
                    <div
                      key={alert.id}
                      className={`p-4 rounded-xl border ${
                        alert.type === 'error'
                          ? 'bg-red-50 border-red-200'
                          : alert.type === 'warning'
                          ? 'bg-yellow-50 border-yellow-200'
                          : 'bg-gray-50 border-gray-200'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-gray-700">{alert.message}</p>
                        {alert.action && (
                          <button
                            onClick={() => router.push(alert.actionUrl || '#')}
                            className="text-sm bg-white border border-gray-300 px-3 py-1 rounded-full hover:bg-gray-50 transition-colors"
                          >
                            {alert.action}
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Week at a Glance */}
            <div className="mb-8">
              <h2 className="text-xl mb-4">Week at a Glance</h2>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {events.map((event) => (
                  <div
                    key={event.id}
                    className="bg-white border border-gray-200 rounded-xl p-6 hover:bg-gray-50 transition-colors cursor-pointer"
                    onClick={() => router.push(`/manager/events/${event.id}`)}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-lg">{event.date}</h3>
                      {event.status === 'today' && (
                        <span className="text-xs bg-black text-white px-2 py-1 rounded-full">
                          Today
                        </span>
                      )}
                    </div>

                    <p className="text-sm text-gray-600 mb-6">{event.djNames}</p>

                    {/* Capacity Meter */}
                    <div className="mb-4">
                      <div className="relative">
                        <div className="bg-gray-200 rounded-full h-7 flex overflow-hidden">
                          {/* Confirmed section (black) */}
                          <div
                            className="bg-black rounded-full flex items-center justify-start transition-all duration-300"
                            style={{ width: `${(event.approvedGuests / event.totalGuests) * 100}%` }}
                          >
                            {event.approvedGuests > 0 && (
                              <span className="text-white text-xs font-medium pl-3">
                                {event.approvedGuests}
                              </span>
                            )}
                          </div>
                          {/* Pending section (gray) - optional to show, currently just part of gray background */}
                          {/* Spots available shown on the right */}
                          <div className="flex-1 flex items-center justify-end pr-3">
                            <span className="text-gray-600 text-xs font-medium">
                              {event.totalGuests}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-between items-center mt-2">
                        <div className="flex gap-4 text-xs text-gray-600">
                          <span>Confirmed</span>
                          <span>Pending</span>
                        </div>
                        <span className="text-xs text-gray-600">Spots available</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Navigation */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <button
                onClick={() => setActiveTab('guests')}
                className="p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors text-left"
              >
                <h3 className="text-lg mb-2">Guest Database</h3>
                <p className="text-sm text-gray-600">Manage all-time guests</p>
              </button>

              <button
                onClick={() => setActiveTab('users')}
                className="p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors text-left"
              >
                <h3 className="text-lg mb-2">User Management</h3>
                <p className="text-sm text-gray-600">DJs, Staff, Promoters</p>
              </button>

              <button
                onClick={() => setActiveTab('analytics')}
                className="p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors text-left"
              >
                <h3 className="text-lg mb-2">Analytics</h3>
                <p className="text-sm text-gray-600">Performance insights</p>
              </button>

              {managerRole === 'owner' && (
                <button
                  onClick={() => router.push('/manager/settings')}
                  className="p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors text-left"
                >
                  <h3 className="text-lg mb-2">Venue Settings</h3>
                  <p className="text-sm text-gray-600">Owner only</p>
                </button>
              )}
            </div>
          </div>
        )}

        {/* Calendar Tab */}
        {activeTab === 'calendar' && (
          <div>
            <h2 className="text-2xl mb-6">Calendar</h2>
            <div className="bg-gray-50 rounded-xl p-8 text-center">
              <p className="text-gray-600">Calendar view coming soon</p>
            </div>
          </div>
        )}

        {/* Guests Tab */}
        {activeTab === 'guests' && (
          <div>
            <h2 className="text-2xl mb-6">All-Time Guests</h2>
            <div className="bg-gray-50 rounded-xl p-8 text-center">
              <p className="text-gray-600">Guest management coming soon</p>
            </div>
          </div>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <div>
            <h2 className="text-2xl mb-6">Nightlist Users</h2>
            <div className="bg-gray-50 rounded-xl p-8 text-center">
              <p className="text-gray-600">User management coming soon</p>
            </div>
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div>
            <h2 className="text-2xl mb-6">Analytics</h2>
            <div className="bg-gray-50 rounded-xl p-8 text-center">
              <p className="text-gray-600">Analytics content coming soon</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
