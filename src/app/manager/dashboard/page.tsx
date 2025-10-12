'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { SafeStorage } from '@/lib/utils/safeStorage';

interface Event {
  id: string;
  date: string;
  dayOfWeek: string;
  djNames: string;
  approvalRatio: number;
  totalGuests: number;
  approvedGuests: number;
  status: 'upcoming' | 'today' | 'past';
}

interface Alert {
  id: string;
  type: 'warning' | 'error' | 'info';
  message: string;
  action?: string;
  actionUrl?: string;
}

export default function ManagerDashboardPage() {
  const [managerName, setManagerName] = useState('');
  const [managerRole, setManagerRole] = useState('');
  const [events, setEvents] = useState<Event[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [isLoading, setIsLoading] = useState(true);
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
          const approvalRatio = (approvedGuests / totalGuests) * 100;
          
          const djOptions = [
            'DJ Marcus & Sarah Deep',
            'Techno Collective',
            'DJ Shadow & MC Solar',
            'Underground Sessions',
            'House Masters'
          ];
          
          const event: Event = {
            id: `event_${i}`,
            date: `${dayNames[eventDate.getDay()]} ${monthNames[eventDate.getMonth()]} ${eventDate.getDate()}`,
            dayOfWeek: dayNames[eventDate.getDay()],
            djNames: djOptions[i % djOptions.length],
            approvalRatio,
            totalGuests,
            approvedGuests,
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

  const getApprovalColor = (ratio: number) => {
    if (ratio >= 80) return 'text-green-600';
    if (ratio >= 65) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getApprovalBgColor = (ratio: number) => {
    if (ratio >= 80) return 'bg-green-100';
    if (ratio >= 65) return 'bg-yellow-100';
    return 'bg-red-100';
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
      <div className="border-b border-gray-200 p-6">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
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
      </div>

      <div className="max-w-6xl mx-auto p-6">
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
                      : 'bg-blue-50 border-blue-200'
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
                
                <p className="text-sm text-gray-600 mb-4">{event.djNames}</p>
                
                {/* Approval Ratio Pie Chart */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="relative w-16 h-16">
                    <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 100 100">
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        fill="transparent"
                        stroke="#E5E7EB"
                        strokeWidth="8"
                      />
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        fill="transparent"
                        stroke="#000000"
                        strokeWidth="8"
                        strokeDasharray={`${event.approvalRatio * 2.51} 251`}
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className={`text-xs ${getApprovalColor(event.approvalRatio)}`}>
                        {Math.round(event.approvalRatio)}%
                      </span>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm">
                      <span className="font-medium">{event.approvedGuests}/{event.totalGuests}</span> approved
                    </p>
                    <div className={`text-xs px-2 py-1 rounded-full inline-block ${getApprovalBgColor(event.approvalRatio)} ${getApprovalColor(event.approvalRatio)}`}>
                      {event.approvalRatio >= 80 ? 'Good' : event.approvalRatio >= 65 ? 'Warning' : 'Low'}
                    </div>
                  </div>
                </div>
                
                <button className="text-sm text-gray-500 hover:text-black transition-colors">
                  View full guest list →
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Navigation */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <button
            onClick={() => router.push('/manager/guests')}
            className="p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors text-left"
          >
            <h3 className="text-lg mb-2">Guest Database</h3>
            <p className="text-sm text-gray-600">Manage all-time guests</p>
          </button>
          
          <button
            onClick={() => router.push('/manager/users')}
            className="p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors text-left"
          >
            <h3 className="text-lg mb-2">User Management</h3>
            <p className="text-sm text-gray-600">DJs, Staff, Promoters</p>
          </button>
          
          <button
            onClick={() => router.push('/manager/analytics')}
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
    </div>
  );
}