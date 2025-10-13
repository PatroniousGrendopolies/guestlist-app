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

interface DJ {
  id: string;
  name: string;
  email: string;
  phone: string;
  instagram?: string;
  totalEvents: number;
  avgAttendance: number;
  defaultCap: number;
  lastPerformed: string;
  status: 'active' | 'pending' | 'inactive';
  upcomingGigs: number;
  totalGuestsAdded: number;
}

export default function ManagerDashboardPage() {
  const [managerName, setManagerName] = useState('');
  const [managerRole, setManagerRole] = useState('');
  const [events, setEvents] = useState<Event[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [capacityRequests, setCapacityRequests] = useState<CapacityRequest[]>([]);
  const [guests, setGuests] = useState<Guest[]>([]);
  const [guestSearch, setGuestSearch] = useState('');
  const [guestFilter, setGuestFilter] = useState<string>('all');
  const [selectedGuests, setSelectedGuests] = useState<string[]>([]);
  const [guestSortColumn, setGuestSortColumn] = useState<'name' | 'attendance' | 'lastAttended' | 'addedBy'>('name');
  const [guestSortDirection, setGuestSortDirection] = useState<'asc' | 'desc'>('asc');
  const [djs, setDjs] = useState<DJ[]>([]);
  const [djSortColumn, setDjSortColumn] = useState<'name' | 'totalEvents' | 'avgAttendance' | 'lastPerformed'>('name');
  const [djSortDirection, setDjSortDirection] = useState<'asc' | 'desc'>('asc');
  const [showInviteDjModal, setShowInviteDjModal] = useState(false);
  const [inviteDjForm, setInviteDjForm] = useState({
    stageName: '',
    givenName: '',
    email: '',
    phone: '',
    upcomingGigDate: ''
  });
  const [selectedDjId, setSelectedDjId] = useState<string | null>(null);
  const [djModalTab, setDjModalTab] = useState<'overview' | 'guests' | 'history' | 'analytics'>('overview');
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

      // Generate mock capacity requests
      const mockCapacityRequests: CapacityRequest[] = [
        {
          id: 'cap_req_1',
          requesterName: 'DJ Marcus',
          requesterRole: 'dj',
          eventName: 'Saturday Night Sessions',
          eventDate: '2025-10-18',
          spotsRequested: 10,
          currentCapacity: 75,
          reason: 'Special guests coming from out of town'
        },
        {
          id: 'cap_req_2',
          requesterName: 'Sarah (Staff)',
          requesterRole: 'staff',
          eventName: 'Deep House Vibes',
          eventDate: '2025-10-20',
          spotsRequested: 5,
          currentCapacity: 60,
          reason: 'VIP table reservation'
        }
      ];

      // Add capacity request alerts - individual if 5 or fewer, grouped if more
      if (mockCapacityRequests.length <= 5) {
        mockCapacityRequests.forEach(req => {
          mockAlerts.push({
            id: `capacity_${req.id}`,
            type: 'info',
            message: `${req.requesterName} requests ${req.spotsRequested} additional spots for ${req.eventName}`,
            action: 'Review Request',
            actionUrl: '/manager/capacity-requests'
          });
        });
      } else {
        mockAlerts.push({
          id: 'capacity_requests',
          type: 'info',
          message: `${mockCapacityRequests.length} capacity increase requests pending`,
          action: 'Review Requests',
          actionUrl: '/manager/capacity-requests'
        });
      }

      // Generate mock guests
      const mockGuests: Guest[] = [
        {
          id: 'guest_1',
          name: 'Sarah Johnson',
          email: 'sarah.j@email.com',
          phone: '+1 555-0101',
          instagram: '@sarahjay',
          totalAttendance: 12,
          lastAttended: '2025-10-06',
          addedBy: ['DJ Marcus', 'Staff Sarah'],
          status: 'active'
        },
        {
          id: 'guest_2',
          name: 'Mike Chen',
          email: 'mike.chen@email.com',
          phone: '+1 555-0102',
          totalAttendance: 8,
          lastAttended: '2025-10-01',
          addedBy: ['DJ Shadow'],
          status: 'active'
        },
        {
          id: 'guest_3',
          name: 'Emma Wilson',
          email: 'emma.w@email.com',
          phone: '+1 555-0103',
          instagram: '@emmawilson',
          totalAttendance: 15,
          lastAttended: '2025-10-08',
          addedBy: ['DJ Marcus', 'DJ Shadow', 'Staff Tom'],
          status: 'active'
        },
        {
          id: 'guest_4',
          name: 'James Rodriguez',
          email: 'j.rodriguez@email.com',
          phone: '+1 555-0104',
          totalAttendance: 5,
          lastAttended: '2025-09-28',
          addedBy: ['Staff Sarah'],
          status: 'active'
        },
        {
          id: 'guest_5',
          name: 'Lisa Park',
          email: 'lisa.park@email.com',
          phone: '+1 555-0105',
          instagram: '@lisaparks',
          totalAttendance: 20,
          lastAttended: '2025-10-10',
          addedBy: ['DJ Marcus', 'Promoter Alex'],
          status: 'active'
        },
        {
          id: 'guest_6',
          name: 'David Kim',
          email: 'david.k@email.com',
          phone: '+1 555-0106',
          totalAttendance: 3,
          lastAttended: '2025-09-15',
          addedBy: ['DJ Shadow'],
          status: 'banned'
        },
        {
          id: 'guest_7',
          name: 'Rachel Green',
          email: 'rachel.g@email.com',
          phone: '+1 555-0107',
          instagram: '@rachelgreen',
          totalAttendance: 18,
          lastAttended: '2025-10-09',
          addedBy: ['DJ Marcus', 'Staff Tom'],
          status: 'active'
        },
        {
          id: 'guest_8',
          name: 'Tom Anderson',
          email: 'tom.a@email.com',
          phone: '+1 555-0108',
          totalAttendance: 7,
          lastAttended: '2025-10-02',
          addedBy: ['Staff Sarah'],
          status: 'active'
        },
        {
          id: 'guest_9',
          name: 'Nina Patel',
          email: 'nina.p@email.com',
          phone: '+1 555-0109',
          instagram: '@ninapatel',
          totalAttendance: 11,
          lastAttended: '2025-10-07',
          addedBy: ['DJ Marcus', 'Promoter Alex'],
          status: 'active'
        },
        {
          id: 'guest_10',
          name: 'Alex Turner',
          email: 'alex.t@email.com',
          phone: '+1 555-0110',
          totalAttendance: 6,
          lastAttended: '2025-09-25',
          addedBy: ['DJ Shadow'],
          status: 'active'
        },
        {
          id: 'guest_11',
          name: 'Sophie Martinez',
          email: 'sophie.m@email.com',
          phone: '+1 555-0111',
          instagram: '@sophiem',
          totalAttendance: 14,
          lastAttended: '2025-10-11',
          addedBy: ['DJ Marcus', 'Staff Tom', 'Staff Sarah'],
          status: 'active'
        },
        {
          id: 'guest_12',
          name: 'Chris Brown',
          email: 'chris.b@email.com',
          phone: '+1 555-0112',
          totalAttendance: 4,
          lastAttended: '2025-09-20',
          addedBy: ['Promoter Alex'],
          status: 'active'
        },
        {
          id: 'guest_13',
          name: 'Maya Singh',
          email: 'maya.s@email.com',
          phone: '+1 555-0113',
          instagram: '@mayasingh',
          totalAttendance: 9,
          lastAttended: '2025-10-05',
          addedBy: ['DJ Marcus'],
          status: 'active'
        },
        {
          id: 'guest_14',
          name: 'Jordan Lee',
          email: 'jordan.l@email.com',
          phone: '+1 555-0114',
          totalAttendance: 16,
          lastAttended: '2025-10-12',
          addedBy: ['DJ Shadow', 'Staff Tom'],
          status: 'active'
        },
        {
          id: 'guest_15',
          name: 'Olivia White',
          email: 'olivia.w@email.com',
          phone: '+1 555-0115',
          instagram: '@oliviawhite',
          totalAttendance: 10,
          lastAttended: '2025-10-04',
          addedBy: ['DJ Marcus', 'Promoter Alex'],
          status: 'active'
        }
      ];

      // Generate mock DJs
      const mockDJs: DJ[] = [
        {
          id: 'dj_1',
          name: 'DJ Marcus',
          email: 'marcus@email.com',
          phone: '+1 555-1001',
          instagram: '@djmarcus',
          totalEvents: 45,
          avgAttendance: 68,
          defaultCap: 75,
          lastPerformed: '2025-10-06',
          status: 'active',
          upcomingGigs: 3,
          totalGuestsAdded: 156
        },
        {
          id: 'dj_2',
          name: 'DJ Shadow',
          email: 'shadow@email.com',
          phone: '+1 555-1002',
          instagram: '@djshadow',
          totalEvents: 38,
          avgAttendance: 55,
          defaultCap: 60,
          lastPerformed: '2025-10-01',
          status: 'active',
          upcomingGigs: 2,
          totalGuestsAdded: 98
        },
        {
          id: 'dj_3',
          name: 'Sarah Deep',
          email: 'sarah.deep@email.com',
          phone: '+1 555-1003',
          instagram: '@sarahdeep',
          totalEvents: 52,
          avgAttendance: 72,
          defaultCap: 80,
          lastPerformed: '2025-10-10',
          status: 'active',
          upcomingGigs: 4,
          totalGuestsAdded: 203
        },
        {
          id: 'dj_4',
          name: 'MC Groove',
          email: 'mcgroove@email.com',
          phone: '+1 555-1004',
          totalEvents: 0,
          avgAttendance: 0,
          defaultCap: 50,
          lastPerformed: '',
          status: 'pending',
          upcomingGigs: 1,
          totalGuestsAdded: 0
        },
        {
          id: 'dj_5',
          name: 'Techno Tom',
          email: 'techno.tom@email.com',
          phone: '+1 555-1005',
          instagram: '@technotom',
          totalEvents: 28,
          avgAttendance: 48,
          defaultCap: 55,
          lastPerformed: '2025-09-22',
          status: 'active',
          upcomingGigs: 1,
          totalGuestsAdded: 72
        },
        {
          id: 'dj_6',
          name: 'Vinyl Vince',
          email: 'vinyl.v@email.com',
          phone: '+1 555-1006',
          instagram: '@vinylvince',
          totalEvents: 61,
          avgAttendance: 82,
          defaultCap: 90,
          lastPerformed: '2025-10-08',
          status: 'active',
          upcomingGigs: 5,
          totalGuestsAdded: 287
        },
        {
          id: 'dj_7',
          name: 'Bass Queen',
          email: 'bassqueen@email.com',
          phone: '+1 555-1007',
          instagram: '@bassqueen',
          totalEvents: 19,
          avgAttendance: 41,
          defaultCap: 45,
          lastPerformed: '2025-09-15',
          status: 'active',
          upcomingGigs: 0,
          totalGuestsAdded: 53
        },
        {
          id: 'dj_8',
          name: 'House Master',
          email: 'housemaster@email.com',
          phone: '+1 555-1008',
          instagram: '@housemaster',
          totalEvents: 34,
          avgAttendance: 61,
          defaultCap: 70,
          lastPerformed: '2025-10-03',
          status: 'active',
          upcomingGigs: 2,
          totalGuestsAdded: 142
        }
      ];

      setEvents(mockEvents);
      setAlerts(mockAlerts);
      setGuests(mockGuests);
      setDjs(mockDJs);
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

  // Guest management functions
  const handleGuestSort = (column: 'name' | 'attendance' | 'lastAttended' | 'addedBy') => {
    if (guestSortColumn === column) {
      setGuestSortDirection(guestSortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setGuestSortColumn(column);
      setGuestSortDirection('asc');
    }
  };

  const handleSelectGuest = (guestId: string) => {
    if (selectedGuests.includes(guestId)) {
      setSelectedGuests(selectedGuests.filter(id => id !== guestId));
    } else {
      setSelectedGuests([...selectedGuests, guestId]);
    }
  };

  const handleSelectAllGuests = () => {
    if (selectedGuests.length === filteredGuests.length) {
      setSelectedGuests([]);
    } else {
      setSelectedGuests(filteredGuests.map(g => g.id));
    }
  };

  // Filter and sort guests
  const filteredGuests = guests
    .filter(guest => {
      // Search filter
      const searchLower = guestSearch.toLowerCase();
      const matchesSearch =
        guest.name.toLowerCase().includes(searchLower) ||
        guest.email.toLowerCase().includes(searchLower) ||
        (guest.instagram?.toLowerCase().includes(searchLower));

      // Added by filter
      const matchesFilter = guestFilter === 'all' || guest.addedBy.includes(guestFilter);

      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      let comparison = 0;

      if (guestSortColumn === 'name') {
        comparison = a.name.localeCompare(b.name);
      } else if (guestSortColumn === 'attendance') {
        comparison = a.totalAttendance - b.totalAttendance;
      } else if (guestSortColumn === 'lastAttended') {
        comparison = a.lastAttended.localeCompare(b.lastAttended);
      } else if (guestSortColumn === 'addedBy') {
        comparison = a.addedBy.join(', ').localeCompare(b.addedBy.join(', '));
      }

      return guestSortDirection === 'asc' ? comparison : -comparison;
    });

  // Get unique "Added By" users for filter dropdown
  const addedByOptions = Array.from(
    new Set(guests.flatMap(g => g.addedBy))
  ).sort();

  // DJ management functions
  const handleDjSort = (column: 'name' | 'totalEvents' | 'avgAttendance' | 'lastPerformed') => {
    if (djSortColumn === column) {
      setDjSortDirection(djSortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setDjSortColumn(column);
      setDjSortDirection('asc');
    }
  };

  // Sort DJs
  const sortedDJs = [...djs].sort((a, b) => {
    let comparison = 0;

    if (djSortColumn === 'name') {
      comparison = a.name.localeCompare(b.name);
    } else if (djSortColumn === 'totalEvents') {
      comparison = a.totalEvents - b.totalEvents;
    } else if (djSortColumn === 'avgAttendance') {
      comparison = a.avgAttendance - b.avgAttendance;
    } else if (djSortColumn === 'lastPerformed') {
      if (!a.lastPerformed) return 1;
      if (!b.lastPerformed) return -1;
      comparison = a.lastPerformed.localeCompare(b.lastPerformed);
    }

    return djSortDirection === 'asc' ? comparison : -comparison;
  });

  // Handle invite DJ form submission
  const handleInviteDj = () => {
    if (!inviteDjForm.stageName || !inviteDjForm.email) return;

    const newDj: DJ = {
      id: `dj_new_${Date.now()}`,
      name: inviteDjForm.stageName,
      email: inviteDjForm.email,
      phone: inviteDjForm.phone,
      totalEvents: 0,
      avgAttendance: 0,
      defaultCap: 50,
      lastPerformed: '',
      status: 'pending',
      upcomingGigs: inviteDjForm.upcomingGigDate ? 1 : 0,
      totalGuestsAdded: 0
    };

    setDjs([...djs, newDj]);
    setShowInviteDjModal(false);
    setInviteDjForm({
      stageName: '',
      givenName: '',
      email: '',
      phone: '',
      upcomingGigDate: ''
    });
  };

  // Handle escape key to close modal
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && showInviteDjModal) {
        setShowInviteDjModal(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [showInviteDjModal]);

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
                    className={`bg-white border rounded-xl p-6 hover:bg-gray-50 transition-colors cursor-pointer ${
                      event.status === 'today' ? 'border-red-500 border-2' : 'border-gray-200'
                    }`}
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
                      <div className="relative h-6">
                        {/* Background layer - light gray (spots available) */}
                        <div className="absolute inset-0 bg-gray-200 rounded-full"></div>

                        {/* Middle layer - dark gray (pending + confirmed) */}
                        <div
                          className="absolute left-0 top-0 bottom-0 bg-gray-400 rounded-full transition-all duration-300"
                          style={{ width: `${((event.approvedGuests + event.pendingGuests) / event.totalGuests) * 100}%` }}
                        ></div>

                        {/* Top layer - black (confirmed only) */}
                        <div
                          className="absolute left-0 top-0 bottom-0 bg-black rounded-full transition-all duration-300"
                          style={{ width: `${(event.approvedGuests / event.totalGuests) * 100}%` }}
                        ></div>

                        {/* Numbers overlay */}
                        <div className="relative h-full flex items-center">
                          {/* Confirmed number (in black section) */}
                          {event.approvedGuests > 0 && (
                            <div className="pl-3">
                              <span className="text-white text-xs font-medium">
                                {event.approvedGuests}
                              </span>
                            </div>
                          )}

                          {/* Pending number (in gray section) */}
                          {event.pendingGuests > 0 && (
                            <div
                              className="absolute flex items-center justify-center"
                              style={{
                                left: `${(event.approvedGuests / event.totalGuests) * 100}%`,
                                width: `${(event.pendingGuests / event.totalGuests) * 100}%`
                              }}
                            >
                              <span className="text-white text-xs font-medium">
                                {event.pendingGuests}
                              </span>
                            </div>
                          )}

                          {/* Total spots (on right) */}
                          <div className="absolute right-3">
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
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl">All-Time Guests</h2>
              <div className="text-sm text-gray-600">
                {filteredGuests.length} {filteredGuests.length === 1 ? 'guest' : 'guests'}
              </div>
            </div>

            {/* Search and Filter Bar */}
            <div className="mb-6 flex gap-4">
              {/* Search Input */}
              <div className="relative flex-1">
                <svg
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <input
                  type="text"
                  placeholder="Search guests by name, email, or Instagram..."
                  value={guestSearch}
                  onChange={(e) => setGuestSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                />
              </div>

              {/* Filter by Added By */}
              <select
                value={guestFilter}
                onChange={(e) => setGuestFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent bg-white"
              >
                <option value="all">All Added By</option>
                {addedByOptions.map(user => (
                  <option key={user} value={user}>{user}</option>
                ))}
              </select>
            </div>

            {/* Bulk Actions */}
            {selectedGuests.length > 0 && (
              <div className="mb-4 flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <span className="text-sm text-gray-600">
                  {selectedGuests.length} selected
                </span>
                <button className="px-4 py-1.5 bg-black text-white rounded-full hover:bg-gray-900 transition-colors text-sm">
                  Add to Event
                </button>
                <button className="px-4 py-1.5 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors text-sm">
                  Ban Guests
                </button>
              </div>
            )}

            {/* Guests Table */}
            <div className="border border-gray-200 rounded-xl overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-4 py-3 text-left">
                      <input
                        type="checkbox"
                        checked={selectedGuests.length === filteredGuests.length && filteredGuests.length > 0}
                        onChange={handleSelectAllGuests}
                        className="rounded border-gray-300"
                      />
                    </th>
                    <th
                      className="px-4 py-3 text-left text-sm font-medium text-gray-600 cursor-pointer hover:text-black"
                      onClick={() => handleGuestSort('name')}
                    >
                      <div className="flex items-center gap-2">
                        Name
                        {guestSortColumn === 'name' && (
                          <span>{guestSortDirection === 'asc' ? '↑' : '↓'}</span>
                        )}
                      </div>
                    </th>
                    <th
                      className="px-4 py-3 text-left text-sm font-medium text-gray-600 cursor-pointer hover:text-black"
                      onClick={() => handleGuestSort('attendance')}
                    >
                      <div className="flex items-center gap-2">
                        Attendance
                        {guestSortColumn === 'attendance' && (
                          <span>{guestSortDirection === 'asc' ? '↑' : '↓'}</span>
                        )}
                      </div>
                    </th>
                    <th
                      className="px-4 py-3 text-left text-sm font-medium text-gray-600 cursor-pointer hover:text-black"
                      onClick={() => handleGuestSort('lastAttended')}
                    >
                      <div className="flex items-center gap-2">
                        Last Attended
                        {guestSortColumn === 'lastAttended' && (
                          <span>{guestSortDirection === 'asc' ? '↑' : '↓'}</span>
                        )}
                      </div>
                    </th>
                    <th
                      className="px-4 py-3 text-left text-sm font-medium text-gray-600 cursor-pointer hover:text-black"
                      onClick={() => handleGuestSort('addedBy')}
                    >
                      <div className="flex items-center gap-2">
                        Added By
                        {guestSortColumn === 'addedBy' && (
                          <span>{guestSortDirection === 'asc' ? '↑' : '↓'}</span>
                        )}
                      </div>
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredGuests.map((guest) => (
                    <tr
                      key={guest.id}
                      className="hover:bg-gray-50 transition-colors cursor-pointer"
                    >
                      <td className="px-4 py-3">
                        <input
                          type="checkbox"
                          checked={selectedGuests.includes(guest.id)}
                          onChange={() => handleSelectGuest(guest.id)}
                          className="rounded border-gray-300"
                          onClick={(e) => e.stopPropagation()}
                        />
                      </td>
                      <td className="px-4 py-3">
                        <div>
                          <div className="font-medium text-gray-900">{guest.name}</div>
                          <div className="text-xs text-gray-500">{guest.email}</div>
                          {guest.instagram && (
                            <div className="text-xs text-gray-400">{guest.instagram}</div>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700">
                        {guest.totalAttendance}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700">
                        {new Date(guest.lastAttended).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700">
                        {guest.addedBy.join(', ')}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${
                            guest.status === 'active'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-red-100 text-red-700'
                          }`}
                        >
                          {guest.status === 'active' ? 'Active' : 'Banned'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {filteredGuests.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                  No guests found matching your search criteria
                </div>
              )}
            </div>
          </div>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl">Nightlist Users - DJs</h2>
              <button
                onClick={() => setShowInviteDjModal(true)}
                className="px-6 py-2 bg-gray-200 text-black rounded-full hover:bg-gray-300 transition-colors text-sm"
              >
                + Invite New DJ
              </button>
            </div>

            {/* DJs Table */}
            <div className="border border-gray-200 rounded-xl overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th
                      className="px-4 py-3 text-left text-sm font-medium text-gray-600 cursor-pointer hover:text-black"
                      onClick={() => handleDjSort('name')}
                    >
                      <div className="flex items-center gap-2">
                        DJ Name
                        {djSortColumn === 'name' && (
                          <span>{djSortDirection === 'asc' ? '↑' : '↓'}</span>
                        )}
                      </div>
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                      Contact
                    </th>
                    <th
                      className="px-4 py-3 text-left text-sm font-medium text-gray-600 cursor-pointer hover:text-black"
                      onClick={() => handleDjSort('totalEvents')}
                    >
                      <div className="flex items-center gap-2">
                        Total Events
                        {djSortColumn === 'totalEvents' && (
                          <span>{djSortDirection === 'asc' ? '↑' : '↓'}</span>
                        )}
                      </div>
                    </th>
                    <th
                      className="px-4 py-3 text-left text-sm font-medium text-gray-600 cursor-pointer hover:text-black"
                      onClick={() => handleDjSort('avgAttendance')}
                    >
                      <div className="flex items-center gap-2">
                        Avg Attendance
                        {djSortColumn === 'avgAttendance' && (
                          <span>{djSortDirection === 'asc' ? '↑' : '↓'}</span>
                        )}
                      </div>
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                      Default Cap
                    </th>
                    <th
                      className="px-4 py-3 text-left text-sm font-medium text-gray-600 cursor-pointer hover:text-black"
                      onClick={() => handleDjSort('lastPerformed')}
                    >
                      <div className="flex items-center gap-2">
                        Last Performed
                        {djSortColumn === 'lastPerformed' && (
                          <span>{djSortDirection === 'asc' ? '↑' : '↓'}</span>
                        )}
                      </div>
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                      Upcoming Gigs
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {sortedDJs.map((dj) => (
                    <tr
                      key={dj.id}
                      className="hover:bg-gray-50 transition-colors cursor-pointer"
                      onClick={() => {
                        setSelectedDjId(dj.id);
                        setDjModalTab('overview');
                      }}
                    >
                      <td className="px-4 py-3">
                        <div>
                          <div className="font-medium text-gray-900">{dj.name}</div>
                          {dj.instagram && (
                            <div className="text-xs text-gray-400">{dj.instagram}</div>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="text-xs text-gray-600">
                          <div>{dj.email}</div>
                          <div>{dj.phone}</div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700">
                        {dj.totalEvents}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700">
                        {dj.avgAttendance > 0 ? dj.avgAttendance : '-'}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700">
                        {dj.defaultCap}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700">
                        {dj.lastPerformed
                          ? new Date(dj.lastPerformed).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric'
                            })
                          : '-'}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700">
                        {dj.upcomingGigs}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${
                            dj.status === 'active'
                              ? 'bg-green-100 text-green-700'
                              : dj.status === 'pending'
                              ? 'bg-yellow-100 text-yellow-700'
                              : 'bg-gray-100 text-gray-700'
                          }`}
                        >
                          {dj.status === 'pending' ? 'Pending invite accept' : dj.status.charAt(0).toUpperCase() + dj.status.slice(1)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
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

      {/* DJ Detail Modal */}
      {selectedDjId && (() => {
        const selectedDj = djs.find(dj => dj.id === selectedDjId);
        if (!selectedDj) return null;

        // Mock DJ guests for the Guests tab
        const djGuests = guests.filter(g => g.addedBy.includes(selectedDj.name));

        // Mock event history for the Event History tab (12 months)
        const eventHistory = Array.from({ length: selectedDj.totalEvents }, (_, i) => {
          const date = new Date();
          date.setMonth(date.getMonth() - i);
          return {
            id: `event_${i}`,
            date: date.toISOString().split('T')[0],
            eventName: ['Saturday Night Sessions', 'Deep House Vibes', 'Techno Warehouse', 'Underground Collective'][i % 4],
            attendance: Math.floor(Math.random() * 30) + 40,
            capacity: selectedDj.defaultCap,
            revenue: Math.floor(Math.random() * 2000) + 1000
          };
        });

        return (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
              {/* Modal Header */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-2xl font-light mb-1">{selectedDj.name}</h2>
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <span>{selectedDj.email}</span>
                      {selectedDj.instagram && (
                        <>
                          <span>•</span>
                          <span>{selectedDj.instagram}</span>
                        </>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedDjId(null)}
                    className="text-gray-400 hover:text-gray-600 text-2xl"
                  >
                    ×
                  </button>
                </div>

                {/* Performance Metrics */}
                {selectedDj.status === 'active' && (
                  <div className="grid grid-cols-4 gap-4 mt-6">
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="text-xs text-gray-600 mb-1">Total Events</div>
                      <div className="text-2xl font-light">{selectedDj.totalEvents}</div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="text-xs text-gray-600 mb-1">Avg Attendance</div>
                      <div className="text-2xl font-light">{selectedDj.avgAttendance}</div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="text-xs text-gray-600 mb-1">Total Guests</div>
                      <div className="text-2xl font-light">{selectedDj.totalGuestsAdded}</div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="text-xs text-gray-600 mb-1">Upcoming Gigs</div>
                      <div className="text-2xl font-light">{selectedDj.upcomingGigs}</div>
                    </div>
                  </div>
                )}
              </div>

              {/* Internal Tab Navigation */}
              <div className="px-6 border-b border-gray-200">
                <div className="flex gap-6">
                  <button
                    onClick={() => setDjModalTab('overview')}
                    className={`pb-3 text-sm transition-colors relative ${
                      djModalTab === 'overview' ? 'text-black' : 'text-gray-500 hover:text-black'
                    }`}
                  >
                    Overview
                    {djModalTab === 'overview' && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-black"></div>
                    )}
                  </button>
                  <button
                    onClick={() => setDjModalTab('guests')}
                    className={`pb-3 text-sm transition-colors relative ${
                      djModalTab === 'guests' ? 'text-black' : 'text-gray-500 hover:text-black'
                    }`}
                  >
                    Guests
                    {djModalTab === 'guests' && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-black"></div>
                    )}
                  </button>
                  <button
                    onClick={() => setDjModalTab('history')}
                    className={`pb-3 text-sm transition-colors relative ${
                      djModalTab === 'history' ? 'text-black' : 'text-gray-500 hover:text-black'
                    }`}
                  >
                    Event History
                    {djModalTab === 'history' && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-black"></div>
                    )}
                  </button>
                  <button
                    onClick={() => setDjModalTab('analytics')}
                    className={`pb-3 text-sm transition-colors relative ${
                      djModalTab === 'analytics' ? 'text-black' : 'text-gray-500 hover:text-black'
                    }`}
                  >
                    Analytics
                    {djModalTab === 'analytics' && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-black"></div>
                    )}
                  </button>
                </div>
              </div>

              {/* Modal Content */}
              <div className="flex-1 overflow-y-auto p-6">
                {/* Overview Tab */}
                {djModalTab === 'overview' && (
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Default Capacity
                      </label>
                      <input
                        type="number"
                        defaultValue={selectedDj.defaultCap}
                        className="w-32 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Hospitality Rider
                      </label>
                      <textarea
                        placeholder="Click to edit hospitality requirements..."
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                        rows={4}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Tech Rider
                      </label>
                      <textarea
                        placeholder="Click to edit technical requirements..."
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                        rows={4}
                      />
                    </div>
                  </div>
                )}

                {/* Guests Tab */}
                {djModalTab === 'guests' && (
                  <div>
                    <div className="mb-4 text-sm text-gray-600">
                      {djGuests.length} {djGuests.length === 1 ? 'guest' : 'guests'}
                    </div>
                    <div className="border border-gray-200 rounded-lg overflow-hidden">
                      <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-200">
                          <tr>
                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Name</th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Email</th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Attendance</th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Last Attended</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {djGuests.map((guest) => (
                            <tr key={guest.id} className="hover:bg-gray-50">
                              <td className="px-4 py-3 text-sm">{guest.name}</td>
                              <td className="px-4 py-3 text-sm text-gray-600">{guest.email}</td>
                              <td className="px-4 py-3 text-sm text-gray-700">{guest.totalAttendance}</td>
                              <td className="px-4 py-3 text-sm text-gray-700">
                                {new Date(guest.lastAttended).toLocaleDateString('en-US', {
                                  month: 'short',
                                  day: 'numeric',
                                  year: 'numeric'
                                })}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      {djGuests.length === 0 && (
                        <div className="text-center py-12 text-gray-500">
                          No guests added by this DJ yet
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Event History Tab */}
                {djModalTab === 'history' && (
                  <div>
                    <div className="mb-4 text-sm text-gray-600">
                      {eventHistory.length} {eventHistory.length === 1 ? 'event' : 'events'}
                    </div>
                    <div className="border border-gray-200 rounded-lg overflow-hidden">
                      <div className="max-h-96 overflow-y-auto">
                        <table className="w-full">
                          <thead className="bg-gray-50 border-b border-gray-200 sticky top-0">
                            <tr>
                              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Date</th>
                              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Event Name</th>
                              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Attendance</th>
                              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Capacity</th>
                              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Revenue</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200">
                            {eventHistory.map((event) => (
                              <tr key={event.id} className="hover:bg-gray-50">
                                <td className="px-4 py-3 text-sm text-gray-700">
                                  {new Date(event.date).toLocaleDateString('en-US', {
                                    month: 'short',
                                    day: 'numeric',
                                    year: 'numeric'
                                  })}
                                </td>
                                <td className="px-4 py-3 text-sm">{event.eventName}</td>
                                <td className="px-4 py-3 text-sm text-gray-700">{event.attendance}</td>
                                <td className="px-4 py-3 text-sm text-gray-700">{event.capacity}</td>
                                <td className="px-4 py-3 text-sm text-gray-700">${event.revenue.toLocaleString()}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      {eventHistory.length === 0 && (
                        <div className="text-center py-12 text-gray-500">
                          No event history available
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Analytics Tab */}
                {djModalTab === 'analytics' && (
                  <div className="text-center py-12 text-gray-500">
                    Analytics coming soon
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })()}

      {/* Invite DJ Modal */}
      {showInviteDjModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 max-w-md w-full mx-4">
            <h2 className="text-2xl mb-6">Invite New DJ</h2>

            <div className="space-y-4">
              {/* DJ/Stage Name - Required */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  DJ/Stage Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={inviteDjForm.stageName}
                  onChange={(e) => setInviteDjForm({ ...inviteDjForm, stageName: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                  placeholder="Enter DJ/Stage name"
                />
              </div>

              {/* Given Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Given Name
                </label>
                <input
                  type="text"
                  value={inviteDjForm.givenName}
                  onChange={(e) => setInviteDjForm({ ...inviteDjForm, givenName: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                  placeholder="Enter given name"
                />
              </div>

              {/* Email - Required */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  value={inviteDjForm.email}
                  onChange={(e) => setInviteDjForm({ ...inviteDjForm, email: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                  placeholder="Enter email address"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone
                </label>
                <input
                  type="tel"
                  value={inviteDjForm.phone}
                  onChange={(e) => setInviteDjForm({ ...inviteDjForm, phone: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                  placeholder="Enter phone number"
                />
              </div>

              {/* Upcoming Gig Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Upcoming Gig Date
                </label>
                <input
                  type="date"
                  value={inviteDjForm.upcomingGigDate}
                  onChange={(e) => setInviteDjForm({ ...inviteDjForm, upcomingGigDate: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                />
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowInviteDjModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-full hover:bg-gray-50 transition-colors text-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleInviteDj}
                disabled={!inviteDjForm.stageName || !inviteDjForm.email}
                className={`flex-1 px-4 py-2 rounded-full transition-colors text-sm ${
                  inviteDjForm.stageName && inviteDjForm.email
                    ? 'bg-black text-white hover:bg-gray-900'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                Send Invite
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
