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
  type: 'warning' | 'error' | 'info' | 'capacity';
  message: string;
  action?: string;
  actionUrl?: string;
  capacityRequestId?: string;
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
  paidAttendance: number;
  avgRevenue: number;
  defaultCap: number;
  lastPerformed: string;
  status: 'active' | 'pending' | 'inactive';
  upcomingGigs: number;
  totalGuestsAdded: number;
}

interface Staff {
  id: string;
  name: string;
  email: string;
  phone: string;
  instagram?: string;
  role: string;
  totalEventsWorked: number;
  totalGuestsAdded: number;
  avgGuestsPerEvent: number;
  lastWorked: string;
  status: 'active' | 'pending' | 'inactive';
  upcomingShifts: number;
}

interface Promoter {
  id: string;
  name: string;
  email: string;
  phone: string;
  instagram?: string;
  totalEvents: number;
  totalGuestsAdded: number;
  avgAttendance: number;
  paidAttendance: number;
  conversionRate: number;
  avgRevenue: number;
  lastPerformed: string;
  defaultCap: number;
}

interface Manager {
  id: string;
  name: string;
  email: string;
  phone: string;
  instagram?: string;
  eventsCreated: number;
  avgRevenue: number;
  avgConversion: number; // as percentage, e.g., 67 for 67%
  avgTotalGuests: number;
  avgPaidGuests: number;
  lastActive: string;
  status: 'active' | 'pending' | 'inactive';
  team: string;
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
  const [selectedGuestId, setSelectedGuestId] = useState<string | null>(null);
  const [guestSortColumn, setGuestSortColumn] = useState<
    'name' | 'attendance' | 'lastAttended' | 'addedBy'
  >('name');
  const [guestSortDirection, setGuestSortDirection] = useState<'asc' | 'desc'>('asc');
  const [djs, setDjs] = useState<DJ[]>([]);
  const [djSortColumn, setDjSortColumn] = useState<
    | 'name'
    | 'totalEvents'
    | 'avgAttendance'
    | 'paidAttendance'
    | 'conversionRate'
    | 'avgRevenue'
    | 'lastPerformed'
  >('name');
  const [djSortDirection, setDjSortDirection] = useState<'asc' | 'desc'>('asc');
  const [staff, setStaff] = useState<Staff[]>([]);
  const [staffSortColumn, setStaffSortColumn] = useState<
    'name' | 'role' | 'totalEventsWorked' | 'totalGuestsAdded' | 'avgGuestsPerEvent' | 'lastWorked'
  >('name');
  const [staffSortDirection, setStaffSortDirection] = useState<'asc' | 'desc'>('asc');
  const [promoters, setPromoters] = useState<Promoter[]>([]);
  const [promoterSortColumn, setPromoterSortColumn] = useState<
    | 'name'
    | 'totalEvents'
    | 'totalGuestsAdded'
    | 'avgAttendance'
    | 'paidAttendance'
    | 'conversionRate'
    | 'avgRevenue'
    | 'lastPerformed'
  >('name');
  const [promoterSortDirection, setPromoterSortDirection] = useState<'asc' | 'desc'>('asc');
  const [managers, setManagers] = useState<Manager[]>([]);
  const [managerSortColumn, setManagerSortColumn] = useState<
    'name' | 'eventsCreated' | 'avgRevenue' | 'avgConversion' | 'avgTotalGuests' | 'avgPaidGuests'
  >('name');
  const [managerSortDirection, setManagerSortDirection] = useState<'asc' | 'desc'>('asc');
  const [selectedManagerId, setSelectedManagerId] = useState<string | null>(null);
  const [managerModalTab, setManagerModalTab] = useState<'overview' | 'guests' | 'history'>(
    'overview'
  );
  const [showInviteDjModal, setShowInviteDjModal] = useState(false);
  const [inviteDjForm, setInviteDjForm] = useState({
    stageName: '',
    givenName: '',
    email: '',
    phone: '',
    upcomingGigDate: '',
  });
  const [showInvitePromoterModal, setShowInvitePromoterModal] = useState(false);
  const [invitePromoterForm, setInvitePromoterForm] = useState({
    name: '',
    email: '',
    phone: '',
    instagram: '',
  });
  const [showInviteStaffModal, setShowInviteStaffModal] = useState(false);
  const [inviteStaffForm, setInviteStaffForm] = useState({
    name: '',
    email: '',
    phone: '',
    role: '',
  });
  const [inviteManagerForm, setInviteManagerForm] = useState({
    name: '',
    email: '',
    phone: '',
  });
  const [showInviteUserModal, setShowInviteUserModal] = useState(false);
  const [inviteUserType, setInviteUserType] = useState<'dj' | 'staff' | 'promoter' | 'manager'>('dj');
  const [selectedDjId, setSelectedDjId] = useState<string | null>(null);
  const [djModalTab, setDjModalTab] = useState<'overview' | 'guests' | 'history'>('overview');
  const [selectedStaffId, setSelectedStaffId] = useState<string | null>(null);
  const [staffModalTab, setStaffModalTab] = useState<'overview' | 'guests' | 'history'>('overview');
  const [selectedPromoterId, setSelectedPromoterId] = useState<string | null>(null);
  const [promoterModalTab, setPromoterModalTab] = useState<'overview' | 'guests' | 'history'>(
    'overview'
  );
  const [activeTab, setActiveTab] = useState<'overview' | 'calendar' | 'guests' | 'users'>(
    'overview'
  );
  const [userType, setUserType] = useState<'djs' | 'staff' | 'promoters' | 'managers'>('djs');
  const [isLoading, setIsLoading] = useState(true);
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const [showMonthPicker, setShowMonthPicker] = useState(false);
  const [eventHistorySortColumn, setEventHistorySortColumn] = useState<
    'date' | 'eventName' | 'attendance' | 'capacity' | 'revenue'
  >('date');
  const [eventHistorySortDirection, setEventHistorySortDirection] = useState<'asc' | 'desc'>(
    'desc'
  );
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

    // Fetch real data from API
    const fetchData = async () => {
      try {
        // Fetch events from API
        const eventsResponse = await fetch('/api/events');
        if (!eventsResponse.ok) {
          throw new Error('Failed to fetch events');
        }
        const eventsData = await eventsResponse.json();

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        // Transform API events to match dashboard Event interface
        const transformedEvents: Event[] = eventsData.events.map((apiEvent: any) => {
          const eventDate = new Date(apiEvent.date);
          const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
          const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

          // Determine if event is today, upcoming, or past
          const eventDateOnly = new Date(eventDate);
          eventDateOnly.setHours(0, 0, 0, 0);

          let status: 'today' | 'upcoming' | 'past' = 'upcoming';
          if (eventDateOnly.getTime() === today.getTime()) {
            status = 'today';
          } else if (eventDateOnly < today) {
            status = 'past';
          }

          return {
            id: apiEvent.id,
            date: `${dayNames[eventDate.getDay()]} ${monthNames[eventDate.getMonth()]} ${eventDate.getDate()}`,
            dayOfWeek: dayNames[eventDate.getDay()],
            djNames: 'TBD', // Placeholder until DJ data is connected
            eventName: apiEvent.name,
            approvalRatio: 0, // Placeholder - will calculate from guest lists
            totalGuests: 0, // Placeholder - will fetch from capacity endpoint
            approvedGuests: 0,
            pendingGuests: 0,
            status,
          };
        });

        // Sort events by date
        transformedEvents.sort((a, b) => {
          const dateA = new Date(a.date);
          const dateB = new Date(b.date);
          return dateB.getTime() - dateA.getTime();
        });

        // For now, use empty arrays for other data types
        // These will be populated from API in future iterations
        const mockAlerts: Alert[] = [];
        const mockGuests: Guest[] = [];
        const mockDJs: DJ[] = [];
        const mockStaff: Staff[] = [];
        const mockPromoters: Promoter[] = [];
        const mockManagers: any[] = [];

        // Set state with real events and placeholder data for others
        setEvents(transformedEvents);
        setAlerts(mockAlerts);
        setGuests(mockGuests);
        setDjs(mockDJs);
        setStaff(mockStaff);
        setPromoters(mockPromoters);
        setManagers(mockManagers);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        // On error, show empty state
        setEvents([]);
        setAlerts([]);
        setGuests([]);
        setDjs([]);
        setStaff([]);
        setPromoters([]);
        setManagers([]);
        setIsLoading(false);
      }
    };

    fetchData();
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

  // Filter and sort guests
  const filteredGuests = guests
    .filter(guest => {
      // Search filter
      const searchLower = guestSearch.toLowerCase();
      const matchesSearch =
        guest.name.toLowerCase().includes(searchLower) ||
        guest.email.toLowerCase().includes(searchLower) ||
        guest.instagram?.toLowerCase().includes(searchLower);

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
  const addedByOptions = Array.from(new Set(guests.flatMap(g => g.addedBy))).sort();

  // DJ management functions
  const handleDjSort = (
    column:
      | 'name'
      | 'totalEvents'
      | 'avgAttendance'
      | 'paidAttendance'
      | 'conversionRate'
      | 'avgRevenue'
      | 'lastPerformed'
  ) => {
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
    } else if (djSortColumn === 'paidAttendance') {
      comparison = a.paidAttendance - b.paidAttendance;
    } else if (djSortColumn === 'conversionRate') {
      const aRate =
        a.totalGuestsAdded > 0 && a.avgAttendance > 0
          ? (a.avgAttendance / a.totalGuestsAdded) * 100
          : 0;
      const bRate =
        b.totalGuestsAdded > 0 && b.avgAttendance > 0
          ? (b.avgAttendance / b.totalGuestsAdded) * 100
          : 0;
      comparison = aRate - bRate;
    } else if (djSortColumn === 'avgRevenue') {
      comparison = a.avgRevenue - b.avgRevenue;
    } else if (djSortColumn === 'lastPerformed') {
      if (!a.lastPerformed) return 1;
      if (!b.lastPerformed) return -1;
      comparison = a.lastPerformed.localeCompare(b.lastPerformed);
    }

    return djSortDirection === 'asc' ? comparison : -comparison;
  });

  // Staff management functions
  const handleStaffSort = (
    column:
      | 'name'
      | 'role'
      | 'totalEventsWorked'
      | 'totalGuestsAdded'
      | 'avgGuestsPerEvent'
      | 'lastWorked'
  ) => {
    if (staffSortColumn === column) {
      setStaffSortDirection(staffSortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setStaffSortColumn(column);
      setStaffSortDirection('asc');
    }
  };

  // Sort Staff
  const sortedStaff = [...staff].sort((a, b) => {
    let comparison = 0;

    if (staffSortColumn === 'name') {
      comparison = a.name.localeCompare(b.name);
    } else if (staffSortColumn === 'role') {
      comparison = a.role.localeCompare(b.role);
    } else if (staffSortColumn === 'totalEventsWorked') {
      comparison = a.totalEventsWorked - b.totalEventsWorked;
    } else if (staffSortColumn === 'totalGuestsAdded') {
      comparison = a.totalGuestsAdded - b.totalGuestsAdded;
    } else if (staffSortColumn === 'avgGuestsPerEvent') {
      comparison = a.avgGuestsPerEvent - b.avgGuestsPerEvent;
    } else if (staffSortColumn === 'lastWorked') {
      if (!a.lastWorked) return 1;
      if (!b.lastWorked) return -1;
      comparison = a.lastWorked.localeCompare(b.lastWorked);
    }

    return staffSortDirection === 'asc' ? comparison : -comparison;
  });

  // Promoter management functions
  const handlePromoterSort = (
    column:
      | 'name'
      | 'totalEvents'
      | 'totalGuestsAdded'
      | 'avgAttendance'
      | 'paidAttendance'
      | 'conversionRate'
      | 'avgRevenue'
      | 'lastPerformed'
  ) => {
    if (promoterSortColumn === column) {
      setPromoterSortDirection(promoterSortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setPromoterSortColumn(column);
      setPromoterSortDirection('asc');
    }
  };

  // Sort Promoters
  const sortedPromoters = [...promoters].sort((a, b) => {
    let comparison = 0;

    if (promoterSortColumn === 'name') {
      comparison = a.name.localeCompare(b.name);
    } else if (promoterSortColumn === 'totalEvents') {
      comparison = a.totalEvents - b.totalEvents;
    } else if (promoterSortColumn === 'totalGuestsAdded') {
      comparison = a.totalGuestsAdded - b.totalGuestsAdded;
    } else if (promoterSortColumn === 'avgAttendance') {
      comparison = a.avgAttendance - b.avgAttendance;
    } else if (promoterSortColumn === 'paidAttendance') {
      comparison = a.paidAttendance - b.paidAttendance;
    } else if (promoterSortColumn === 'conversionRate') {
      comparison = a.conversionRate - b.conversionRate;
    } else if (promoterSortColumn === 'avgRevenue') {
      comparison = a.avgRevenue - b.avgRevenue;
    } else if (promoterSortColumn === 'lastPerformed') {
      if (!a.lastPerformed) return 1;
      if (!b.lastPerformed) return -1;
      comparison = a.lastPerformed.localeCompare(b.lastPerformed);
    }

    return promoterSortDirection === 'asc' ? comparison : -comparison;
  });

  // Manager management functions
  const handleManagerSort = (
    column:
      | 'name'
      | 'eventsCreated'
      | 'avgRevenue'
      | 'avgConversion'
      | 'avgTotalGuests'
      | 'avgPaidGuests'
  ) => {
    if (managerSortColumn === column) {
      setManagerSortDirection(managerSortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setManagerSortColumn(column);
      setManagerSortDirection('asc');
    }
  };

  // Sort Managers
  const sortedManagers = [...managers].sort((a, b) => {
    let comparison = 0;

    if (managerSortColumn === 'name') {
      comparison = a.name.localeCompare(b.name);
    } else if (managerSortColumn === 'eventsCreated') {
      comparison = a.eventsCreated - b.eventsCreated;
    } else if (managerSortColumn === 'avgRevenue') {
      comparison = a.avgRevenue - b.avgRevenue;
    } else if (managerSortColumn === 'avgConversion') {
      comparison = a.avgConversion - b.avgConversion;
    } else if (managerSortColumn === 'avgTotalGuests') {
      comparison = a.avgTotalGuests - b.avgTotalGuests;
    } else if (managerSortColumn === 'avgPaidGuests') {
      comparison = a.avgPaidGuests - b.avgPaidGuests;
    }

    return managerSortDirection === 'asc' ? comparison : -comparison;
  });

  // Event History sorting handler
  const handleEventHistorySort = (
    column: 'date' | 'eventName' | 'attendance' | 'capacity' | 'revenue'
  ) => {
    if (eventHistorySortColumn === column) {
      setEventHistorySortDirection(eventHistorySortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setEventHistorySortColumn(column);
      setEventHistorySortDirection('asc');
    }
  };

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
      paidAttendance: 0,
      avgRevenue: 0,
      defaultCap: 50,
      lastPerformed: '',
      status: 'pending',
      upcomingGigs: inviteDjForm.upcomingGigDate ? 1 : 0,
      totalGuestsAdded: 0,
    };

    setDjs([...djs, newDj]);
    setShowInviteDjModal(false);
    setInviteDjForm({
      stageName: '',
      givenName: '',
      email: '',
      phone: '',
      upcomingGigDate: '',
    });
  };

  // Handle escape key to close modals
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (showInviteUserModal) {
          setShowInviteUserModal(false);
        } else if (showInviteDjModal) {
          setShowInviteDjModal(false);
        } else if (showInviteStaffModal) {
          setShowInviteStaffModal(false);
        } else if (showInvitePromoterModal) {
          setShowInvitePromoterModal(false);
        } else if (selectedGuestId) {
          setSelectedGuestId(null);
        } else if (selectedDjId) {
          setSelectedDjId(null);
        } else if (selectedStaffId) {
          setSelectedStaffId(null);
        } else if (selectedPromoterId) {
          setSelectedPromoterId(null);
        } else if (selectedManagerId) {
          setSelectedManagerId(null);
        }
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [
    showInviteUserModal,
    showInviteDjModal,
    showInviteStaffModal,
    showInvitePromoterModal,
    selectedGuestId,
    selectedDjId,
    selectedStaffId,
    selectedPromoterId,
    selectedManagerId,
  ]);

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
                onClick={() => {
                  setActiveTab('users');
                  setInviteUserType('dj'); // Default to DJ
                  setShowInviteUserModal(true);
                }}
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
                  {alerts.map(alert => (
                    <div
                      key={alert.id}
                      className={`p-4 rounded-2xl border ${
                        alert.type === 'error'
                          ? 'bg-red-50 border-red-200'
                          : alert.type === 'warning'
                            ? 'bg-yellow-50 border-yellow-200'
                            : 'bg-gray-50 border-gray-200'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-gray-700">{alert.message}</p>
                        {alert.type === 'capacity' ? (
                          <div className="flex gap-2">
                            <button
                              onClick={() => {
                                console.log('Approved capacity request:', alert.capacityRequestId);
                                setAlerts(alerts.filter(a => a.id !== alert.id));
                              }}
                              className="text-sm bg-black text-white px-4 py-1.5 rounded-full hover:bg-gray-900 transition-colors"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => {
                                console.log('Denied capacity request:', alert.capacityRequestId);
                                setAlerts(alerts.filter(a => a.id !== alert.id));
                              }}
                              className="text-sm bg-white border border-gray-300 px-4 py-1.5 rounded-full hover:bg-gray-50 transition-colors"
                            >
                              Deny
                            </button>
                          </div>
                        ) : alert.action ? (
                          <button
                            onClick={() => router.push(alert.actionUrl || '#')}
                            className="text-sm bg-white border border-gray-300 px-3 py-1 rounded-full hover:bg-gray-50 transition-colors"
                          >
                            {alert.action}
                          </button>
                        ) : null}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* This Week */}
            <div className="mb-8">
              <h2 className="text-xl mb-4">This Week</h2>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {events.map(event => (
                  <div
                    key={event.id}
                    className={`bg-white border rounded-3xl p-6 hover:bg-gray-50 transition-colors cursor-pointer ${
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
                      <div className="w-full">
                        <div className="relative">
                          <div className="bg-gray-200 rounded-full h-4 relative overflow-hidden">
                            {/* Pending + Confirmed (light gray) bar - shows total */}
                            <div
                              className="bg-gray-400 h-4 rounded-full transition-all duration-300 absolute top-0 left-0"
                              style={{
                                width: `${((event.approvedGuests + event.pendingGuests) / event.totalGuests) * 100}%`,
                              }}
                            >
                              {/* Pending count inside the gray bar - only show if bar is wide enough */}
                              {event.pendingGuests > 0 &&
                                event.pendingGuests / event.totalGuests > 0.08 && (
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
                              style={{
                                width: `${(event.approvedGuests / event.totalGuests) * 100}%`,
                              }}
                            >
                              <span className="absolute right-2 top-1/2 -translate-y-1/2 text-white text-[10px]">
                                {event.approvedGuests}
                              </span>
                            </div>
                            <span className="absolute right-2 top-1/2 -translate-y-1/2 text-black text-[10px] z-20">
                              {event.totalGuests}
                            </span>
                          </div>

                          <div className="flex justify-between mt-2 relative">
                            <span className="text-xs text-gray-500">Confirmed</span>

                            {/* Pending label below the meter (normal position) - hide if too close to edges */}
                            {event.pendingGuests > 0 &&
                              (() => {
                                const pendingCenterPosition =
                                  ((event.approvedGuests + event.pendingGuests / 2) /
                                    event.totalGuests) *
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

                            <span className="text-xs text-gray-500">Total</span>
                          </div>
                        </div>
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
            {/* Calendar Header with Month Navigation */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    const newDate = new Date(selectedMonth);
                    newDate.setMonth(newDate.getMonth() - 1);
                    setSelectedMonth(newDate);
                  }}
                  className="px-3 py-1.5 text-sm border border-gray-300 rounded-full hover:bg-gray-50 transition-colors"
                >
                  ‹
                </button>
                <div className="relative">
                  <button
                    onClick={() => setShowMonthPicker(!showMonthPicker)}
                    className="text-lg font-light hover:text-gray-600 transition-colors"
                  >
                    {selectedMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                  </button>
                  {showMonthPicker && (
                    <div className="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg p-4 z-50 min-w-[280px]">
                      <div className="grid grid-cols-3 gap-2 mb-4">
                        {[
                          'Jan',
                          'Feb',
                          'Mar',
                          'Apr',
                          'May',
                          'Jun',
                          'Jul',
                          'Aug',
                          'Sep',
                          'Oct',
                          'Nov',
                          'Dec',
                        ].map((month, idx) => (
                          <button
                            key={month}
                            onClick={() => {
                              const newDate = new Date(selectedMonth);
                              newDate.setMonth(idx);
                              setSelectedMonth(newDate);
                              setShowMonthPicker(false);
                            }}
                            className={`px-3 py-2 text-sm rounded-lg transition-colors ${
                              selectedMonth.getMonth() === idx
                                ? 'bg-black text-white'
                                : 'hover:bg-gray-100'
                            }`}
                          >
                            {month}
                          </button>
                        ))}
                      </div>
                      <div className="border-t border-gray-200 pt-3">
                        <input
                          type="number"
                          value={selectedMonth.getFullYear()}
                          onChange={e => {
                            const newDate = new Date(selectedMonth);
                            newDate.setFullYear(
                              parseInt(e.target.value) || new Date().getFullYear()
                            );
                            setSelectedMonth(newDate);
                          }}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black"
                          placeholder="Year"
                        />
                      </div>
                    </div>
                  )}
                </div>
                <button
                  onClick={() => {
                    const newDate = new Date(selectedMonth);
                    newDate.setMonth(newDate.getMonth() + 1);
                    setSelectedMonth(newDate);
                  }}
                  className="px-3 py-1.5 text-sm border border-gray-300 rounded-full hover:bg-gray-50 transition-colors"
                >
                  ›
                </button>
              </div>
              <button
                onClick={() => setSelectedMonth(new Date())}
                className="px-4 py-2 text-sm bg-gray-100 text-black rounded-full hover:bg-gray-200 transition-colors"
              >
                Today
              </button>
            </div>

            {/* Calendar Grid */}
            <div>
              {/* Day Headers */}
              <div className="grid grid-cols-7 gap-3 mb-3">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                  <div key={day} className="text-sm font-medium text-gray-600">
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar Days */}
              <div className="grid grid-cols-7 gap-3">
                {(() => {
                  const year = selectedMonth.getFullYear();
                  const month = selectedMonth.getMonth();
                  const firstDay = new Date(year, month, 1).getDay();
                  const daysInMonth = new Date(year, month + 1, 0).getDate();
                  const today = new Date();
                  const todayStr = today.toISOString().split('T')[0];

                  const days = [];

                  // Empty cells for days before month starts
                  for (let i = 0; i < firstDay; i++) {
                    days.push(<div key={`empty-${i}`} className="min-h-[120px]"></div>);
                  }

                  // Days of the month
                  for (let day = 1; day <= daysInMonth; day++) {
                    const date = new Date(year, month, day);
                    const dateStr = date.toISOString().split('T')[0];
                    const isToday = dateStr === todayStr;

                    // Find events for this day
                    const dayEvents = events.filter(event => {
                      // Parse the event.date string (e.g., "Mon Oct 13")
                      // Extract month and day from event.date format: "Mon Oct 13"
                      const parts = event.date.split(' ');
                      const eventMonthName = parts[1]; // "Oct"
                      const eventDay = parseInt(parts[2]); // 13

                      // Get the full month name from our date
                      const monthName = date.toLocaleDateString('en-US', { month: 'short' });

                      // Match if same month and same day
                      return eventMonthName === monthName && eventDay === day;
                    });

                    days.push(
                      <div
                        key={day}
                        onClick={() => {
                          if (dayEvents.length > 0) {
                            router.push(`/manager/events/${dayEvents[0].id}`);
                          } else {
                            // Navigate to create event page with pre-selected date
                            router.push(`/manager/events/create?date=${dateStr}`);
                          }
                        }}
                        className={`min-h-[120px] p-3 rounded-xl border transition-colors flex flex-col cursor-pointer ${
                          isToday
                            ? 'bg-white border-red-500/50 border-2'
                            : 'bg-white border-gray-100 hover:border-gray-300'
                        }`}
                      >
                        <div
                          className={`text-sm mb-2 ${
                            isToday ? 'font-bold text-black' : 'text-gray-400'
                          }`}
                        >
                          {day}
                        </div>
                        <div className="flex-1 space-y-1">
                          {dayEvents.map(event => (
                            <div key={event.id} className="cursor-pointer">
                              <div className="text-xs font-normal text-gray-900 leading-tight">
                                {event.djNames.split(' & ').map((name, idx, arr) => (
                                  <span key={idx}>
                                    {name}
                                    {idx < arr.length - 1 && <br />}
                                  </span>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                        {dayEvents.length > 0 && (
                          <div className="relative mt-2">
                            <div className="bg-gray-200 rounded-full h-3 relative overflow-hidden">
                              {/* Use the first event's data for the meter */}
                              {(() => {
                                const event = dayEvents[0];
                                const confirmedPercent =
                                  (event.approvedGuests / event.totalGuests) * 100;
                                const totalPercent =
                                  ((event.approvedGuests + event.pendingGuests) /
                                    event.totalGuests) *
                                  100;
                                const showConfirmedNumber = confirmedPercent > 15; // Show if black bar is wider than 15%
                                const showTotalNumber = totalPercent < 90; // Hide if gray bar takes up more than 90%

                                return (
                                  <>
                                    {/* Pending + Confirmed bar */}
                                    <div
                                      className="bg-gray-400 h-3 rounded-full absolute top-0 left-0"
                                      style={{ width: `${totalPercent}%` }}
                                    ></div>
                                    {/* Confirmed bar */}
                                    <div
                                      className="bg-black h-3 rounded-full relative z-10 flex items-center justify-between px-1"
                                      style={{ width: `${confirmedPercent}%` }}
                                    >
                                      {showConfirmedNumber && (
                                        <span className="text-white text-[9px]">
                                          {event.approvedGuests}
                                        </span>
                                      )}
                                    </div>
                                    {/* Total number on the right */}
                                    {showTotalNumber && (
                                      <span className="absolute right-1 top-1/2 -translate-y-1/2 text-black text-[9px] z-20">
                                        {event.totalGuests}
                                      </span>
                                    )}
                                  </>
                                );
                              })()}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  }

                  return days;
                })()}
              </div>
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

            {/* Search Bar */}
            <div className="mb-6">
              {/* Search Input */}
              <div className="relative">
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
                  onChange={e => setGuestSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                />
              </div>
            </div>

            {/* Guests Table */}
            <div className="border border-gray-200 rounded-xl overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
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
                        All Time Visits
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
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredGuests.map(guest => (
                    <tr
                      key={guest.id}
                      onClick={() => setSelectedGuestId(guest.id)}
                      className="hover:bg-gray-50 transition-colors cursor-pointer"
                    >
                      <td className="px-4 py-3">
                        <div>
                          <div className="font-medium text-gray-900">{guest.name}</div>
                          {guest.instagram && (
                            <a
                              href={`https://instagram.com/${guest.instagram.replace('@', '')}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={e => e.stopPropagation()}
                              className="text-xs text-gray-400 hover:text-gray-600 transition-colors"
                            >
                              {guest.instagram}
                            </a>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700">{guest.totalAttendance}</td>
                      <td className="px-4 py-3 text-sm text-gray-700">
                        {new Date(guest.lastAttended).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex flex-wrap gap-1">
                          {guest.addedBy.map((dj, idx) => (
                            <button
                              key={idx}
                              onClick={e => {
                                e.stopPropagation();
                                // Filter by this DJ
                                setGuestFilter(dj);
                              }}
                              className="text-xs px-2 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full transition-colors"
                            >
                              {dj}
                            </button>
                          ))}
                        </div>
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
            <div className="flex items-center justify-end mb-6">
              <button
                onClick={() => {
                  if (userType === 'djs') {
                    setShowInviteDjModal(true);
                  } else if (userType === 'staff') {
                    setShowInviteStaffModal(true);
                  } else if (userType === 'promoters') {
                    setShowInvitePromoterModal(true);
                  }
                }}
                className="px-6 py-2 bg-gray-200 text-black rounded-full hover:bg-gray-300 transition-colors text-sm"
              >
                + Invite New{' '}
                {userType === 'djs'
                  ? 'DJ'
                  : userType === 'staff'
                    ? 'Staff'
                    : userType === 'promoters'
                      ? 'Promoter'
                      : 'Manager'}
              </button>
            </div>

            {/* User Type Toggle */}
            <div className="mb-6 flex gap-2">
              <button
                onClick={() => setUserType('djs')}
                className={`px-4 py-2 rounded-full text-sm transition-colors ${
                  userType === 'djs'
                    ? 'bg-black text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                DJs
              </button>
              <button
                onClick={() => setUserType('staff')}
                className={`px-4 py-2 rounded-full text-sm transition-colors ${
                  userType === 'staff'
                    ? 'bg-black text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Staff
              </button>
              <button
                onClick={() => setUserType('promoters')}
                className={`px-4 py-2 rounded-full text-sm transition-colors ${
                  userType === 'promoters'
                    ? 'bg-black text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Promoters
              </button>
              <button
                onClick={() => setUserType('managers')}
                className={`px-4 py-2 rounded-full text-sm transition-colors ${
                  userType === 'managers'
                    ? 'bg-black text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Managers
              </button>
            </div>

            {/* DJs Table */}
            {userType === 'djs' && (
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
                      <th
                        className="px-4 py-3 text-left text-sm font-medium text-gray-600 cursor-pointer hover:text-black"
                        onClick={() => handleDjSort('paidAttendance')}
                      >
                        <div className="flex items-center gap-2">
                          Paid Attendance
                          {djSortColumn === 'paidAttendance' && (
                            <span>{djSortDirection === 'asc' ? '↑' : '↓'}</span>
                          )}
                        </div>
                      </th>
                      <th
                        className="px-4 py-3 text-left text-sm font-medium text-gray-600 cursor-pointer hover:text-black"
                        onClick={() => handleDjSort('conversionRate')}
                      >
                        <div className="flex items-center gap-2">
                          Conversion Rate
                          {djSortColumn === 'conversionRate' && (
                            <span>{djSortDirection === 'asc' ? '↑' : '↓'}</span>
                          )}
                        </div>
                      </th>
                      <th
                        className="px-4 py-3 text-left text-sm font-medium text-gray-600 cursor-pointer hover:text-black"
                        onClick={() => handleDjSort('avgRevenue')}
                      >
                        <div className="flex items-center gap-2">
                          Avg Revenue
                          {djSortColumn === 'avgRevenue' && (
                            <span>{djSortDirection === 'asc' ? '↑' : '↓'}</span>
                          )}
                        </div>
                      </th>
                      <th
                        className="px-4 py-3 text-left text-sm font-medium text-gray-600 cursor-pointer hover:text-black"
                        onClick={() => handleDjSort('lastPerformed')}
                      >
                        <div className="flex items-center gap-2">
                          Last Gig
                          {djSortColumn === 'lastPerformed' && (
                            <span>{djSortDirection === 'asc' ? '↑' : '↓'}</span>
                          )}
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {sortedDJs.map(dj => (
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
                        <td className="px-4 py-3 text-sm text-gray-700">{dj.totalEvents}</td>
                        <td className="px-4 py-3 text-sm text-gray-700">
                          {dj.avgAttendance > 0 ? dj.avgAttendance : '-'}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-700">
                          {dj.paidAttendance > 0 ? dj.paidAttendance : '-'}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-700">
                          {dj.totalGuestsAdded > 0 && dj.avgAttendance > 0
                            ? `${Math.round((dj.avgAttendance / dj.totalGuestsAdded) * 100)}%`
                            : '-'}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-700">
                          {dj.avgRevenue > 0 ? `$${dj.avgRevenue.toLocaleString()}` : '-'}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-700">
                          {dj.lastPerformed
                            ? new Date(dj.lastPerformed).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric',
                              })
                            : '-'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Staff View */}
            {userType === 'staff' && (
              <div className="border border-gray-200 rounded-xl overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th
                        className="px-4 py-3 text-left text-sm font-medium text-gray-600 cursor-pointer hover:text-black"
                        onClick={() => handleStaffSort('name')}
                      >
                        <div className="flex items-center gap-2">
                          Name
                          {staffSortColumn === 'name' && (
                            <span>{staffSortDirection === 'asc' ? '↑' : '↓'}</span>
                          )}
                        </div>
                      </th>
                      <th
                        className="px-4 py-3 text-left text-sm font-medium text-gray-600 cursor-pointer hover:text-black"
                        onClick={() => handleStaffSort('role')}
                      >
                        <div className="flex items-center gap-2">
                          Role
                          {staffSortColumn === 'role' && (
                            <span>{staffSortDirection === 'asc' ? '↑' : '↓'}</span>
                          )}
                        </div>
                      </th>
                      <th
                        className="px-4 py-3 text-left text-sm font-medium text-gray-600 cursor-pointer hover:text-black"
                        onClick={() => handleStaffSort('totalEventsWorked')}
                      >
                        <div className="flex items-center gap-2">
                          Total Events Worked
                          {staffSortColumn === 'totalEventsWorked' && (
                            <span>{staffSortDirection === 'asc' ? '↑' : '↓'}</span>
                          )}
                        </div>
                      </th>
                      <th
                        className="px-4 py-3 text-left text-sm font-medium text-gray-600 cursor-pointer hover:text-black"
                        onClick={() => handleStaffSort('totalGuestsAdded')}
                      >
                        <div className="flex items-center gap-2">
                          Total Guests Added
                          {staffSortColumn === 'totalGuestsAdded' && (
                            <span>{staffSortDirection === 'asc' ? '↑' : '↓'}</span>
                          )}
                        </div>
                      </th>
                      <th
                        className="px-4 py-3 text-left text-sm font-medium text-gray-600 cursor-pointer hover:text-black"
                        onClick={() => handleStaffSort('avgGuestsPerEvent')}
                      >
                        <div className="flex items-center gap-2">
                          Avg Guests/Event
                          {staffSortColumn === 'avgGuestsPerEvent' && (
                            <span>{staffSortDirection === 'asc' ? '↑' : '↓'}</span>
                          )}
                        </div>
                      </th>
                      <th
                        className="px-4 py-3 text-left text-sm font-medium text-gray-600 cursor-pointer hover:text-black"
                        onClick={() => handleStaffSort('lastWorked')}
                      >
                        <div className="flex items-center gap-2">
                          Last Worked
                          {staffSortColumn === 'lastWorked' && (
                            <span>{staffSortDirection === 'asc' ? '↑' : '↓'}</span>
                          )}
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {sortedStaff.map(staffMember => (
                      <tr
                        key={staffMember.id}
                        className="hover:bg-gray-50 transition-colors cursor-pointer"
                        onClick={() => {
                          setSelectedStaffId(staffMember.id);
                          setStaffModalTab('overview');
                        }}
                      >
                        <td className="px-4 py-3">
                          <div>
                            <div className="font-medium text-gray-900">{staffMember.name}</div>
                            <div className="text-xs text-gray-400">{staffMember.email}</div>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-700">{staffMember.role}</td>
                        <td className="px-4 py-3 text-sm text-gray-700">
                          {staffMember.totalEventsWorked > 0 ? staffMember.totalEventsWorked : '-'}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-700">
                          {staffMember.totalGuestsAdded > 0 ? staffMember.totalGuestsAdded : '-'}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-700">
                          {staffMember.avgGuestsPerEvent > 0
                            ? staffMember.avgGuestsPerEvent.toFixed(1)
                            : '-'}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-700">
                          {staffMember.lastWorked
                            ? new Date(staffMember.lastWorked).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric',
                              })
                            : '-'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Promoters View */}
            {userType === 'promoters' && (
              <div className="border border-gray-200 rounded-xl overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th
                        className="px-4 py-3 text-left text-sm font-medium text-gray-600 cursor-pointer hover:text-black"
                        onClick={() => handlePromoterSort('name')}
                      >
                        <div className="flex items-center gap-2">
                          Promoter Name
                          {promoterSortColumn === 'name' && (
                            <span>{promoterSortDirection === 'asc' ? '↑' : '↓'}</span>
                          )}
                        </div>
                      </th>
                      <th
                        className="px-4 py-3 text-left text-sm font-medium text-gray-600 cursor-pointer hover:text-black"
                        onClick={() => handlePromoterSort('totalEvents')}
                      >
                        <div className="flex items-center gap-2">
                          Total Events
                          {promoterSortColumn === 'totalEvents' && (
                            <span>{promoterSortDirection === 'asc' ? '↑' : '↓'}</span>
                          )}
                        </div>
                      </th>
                      <th
                        className="px-4 py-3 text-left text-sm font-medium text-gray-600 cursor-pointer hover:text-black"
                        onClick={() => handlePromoterSort('totalGuestsAdded')}
                      >
                        <div className="flex items-center gap-2">
                          Total Guests Added
                          {promoterSortColumn === 'totalGuestsAdded' && (
                            <span>{promoterSortDirection === 'asc' ? '↑' : '↓'}</span>
                          )}
                        </div>
                      </th>
                      <th
                        className="px-4 py-3 text-left text-sm font-medium text-gray-600 cursor-pointer hover:text-black"
                        onClick={() => handlePromoterSort('avgAttendance')}
                      >
                        <div className="flex items-center gap-2">
                          Avg Attendance
                          {promoterSortColumn === 'avgAttendance' && (
                            <span>{promoterSortDirection === 'asc' ? '↑' : '↓'}</span>
                          )}
                        </div>
                      </th>
                      <th
                        className="px-4 py-3 text-left text-sm font-medium text-gray-600 cursor-pointer hover:text-black"
                        onClick={() => handlePromoterSort('paidAttendance')}
                      >
                        <div className="flex items-center gap-2">
                          Paid Attendance
                          {promoterSortColumn === 'paidAttendance' && (
                            <span>{promoterSortDirection === 'asc' ? '↑' : '↓'}</span>
                          )}
                        </div>
                      </th>
                      <th
                        className="px-4 py-3 text-left text-sm font-medium text-gray-600 cursor-pointer hover:text-black"
                        onClick={() => handlePromoterSort('conversionRate')}
                      >
                        <div className="flex items-center gap-2">
                          Conversion Rate
                          {promoterSortColumn === 'conversionRate' && (
                            <span>{promoterSortDirection === 'asc' ? '↑' : '↓'}</span>
                          )}
                        </div>
                      </th>
                      <th
                        className="px-4 py-3 text-left text-sm font-medium text-gray-600 cursor-pointer hover:text-black"
                        onClick={() => handlePromoterSort('avgRevenue')}
                      >
                        <div className="flex items-center gap-2">
                          Avg Revenue
                          {promoterSortColumn === 'avgRevenue' && (
                            <span>{promoterSortDirection === 'asc' ? '↑' : '↓'}</span>
                          )}
                        </div>
                      </th>
                      <th
                        className="px-4 py-3 text-left text-sm font-medium text-gray-600 cursor-pointer hover:text-black"
                        onClick={() => handlePromoterSort('lastPerformed')}
                      >
                        <div className="flex items-center gap-2">
                          Last Event
                          {promoterSortColumn === 'lastPerformed' && (
                            <span>{promoterSortDirection === 'asc' ? '↑' : '↓'}</span>
                          )}
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {sortedPromoters.map(promoter => (
                      <tr
                        key={promoter.id}
                        className="hover:bg-gray-50 transition-colors cursor-pointer"
                        onClick={() => {
                          setSelectedPromoterId(promoter.id);
                          setPromoterModalTab('overview');
                        }}
                      >
                        <td className="px-4 py-3">
                          <div>
                            <div className="font-medium text-gray-900">{promoter.name}</div>
                            {promoter.instagram && (
                              <div className="text-xs text-gray-400">{promoter.instagram}</div>
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-700">{promoter.totalEvents}</td>
                        <td className="px-4 py-3 text-sm text-gray-700">
                          {promoter.totalGuestsAdded}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-700">
                          {promoter.avgAttendance > 0 ? promoter.avgAttendance : '-'}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-700">
                          {promoter.paidAttendance > 0 ? promoter.paidAttendance : '-'}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-700">
                          {promoter.conversionRate > 0 ? `${promoter.conversionRate}%` : '-'}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-700">
                          {promoter.avgRevenue > 0
                            ? `$${promoter.avgRevenue.toLocaleString()}`
                            : '-'}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-700">
                          {promoter.lastPerformed
                            ? new Date(promoter.lastPerformed).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric',
                              })
                            : '-'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Managers View */}
            {userType === 'managers' && (
              <div className="border border-gray-200 rounded-xl overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th
                        className="px-4 py-3 text-left text-sm font-medium text-gray-600 cursor-pointer hover:text-black"
                        onClick={() => handleManagerSort('name')}
                      >
                        <div className="flex items-center gap-2">
                          Manager Name
                          {managerSortColumn === 'name' && (
                            <span>{managerSortDirection === 'asc' ? '↑' : '↓'}</span>
                          )}
                        </div>
                      </th>
                      <th
                        className="px-4 py-3 text-left text-sm font-medium text-gray-600 cursor-pointer hover:text-black"
                        onClick={() => handleManagerSort('eventsCreated')}
                      >
                        <div className="flex items-center gap-2">
                          Events Created
                          {managerSortColumn === 'eventsCreated' && (
                            <span>{managerSortDirection === 'asc' ? '↑' : '↓'}</span>
                          )}
                        </div>
                      </th>
                      <th
                        className="px-4 py-3 text-left text-sm font-medium text-gray-600 cursor-pointer hover:text-black"
                        onClick={() => handleManagerSort('avgRevenue')}
                      >
                        <div className="flex items-center gap-2">
                          Avg Revenues
                          {managerSortColumn === 'avgRevenue' && (
                            <span>{managerSortDirection === 'asc' ? '↑' : '↓'}</span>
                          )}
                        </div>
                      </th>
                      <th
                        className="px-4 py-3 text-left text-sm font-medium text-gray-600 cursor-pointer hover:text-black"
                        onClick={() => handleManagerSort('avgConversion')}
                      >
                        <div className="flex items-center gap-2">
                          Avg Conversion
                          {managerSortColumn === 'avgConversion' && (
                            <span>{managerSortDirection === 'asc' ? '↑' : '↓'}</span>
                          )}
                        </div>
                      </th>
                      <th
                        className="px-4 py-3 text-left text-sm font-medium text-gray-600 cursor-pointer hover:text-black"
                        onClick={() => handleManagerSort('avgTotalGuests')}
                      >
                        <div className="flex items-center gap-2">
                          Avg Total Guests
                          {managerSortColumn === 'avgTotalGuests' && (
                            <span>{managerSortDirection === 'asc' ? '↑' : '↓'}</span>
                          )}
                        </div>
                      </th>
                      <th
                        className="px-4 py-3 text-left text-sm font-medium text-gray-600 cursor-pointer hover:text-black"
                        onClick={() => handleManagerSort('avgPaidGuests')}
                      >
                        <div className="flex items-center gap-2">
                          Avg Paid Guests
                          {managerSortColumn === 'avgPaidGuests' && (
                            <span>{managerSortDirection === 'asc' ? '↑' : '↓'}</span>
                          )}
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {sortedManagers.map(manager => (
                      <tr
                        key={manager.id}
                        className="hover:bg-gray-50 transition-colors cursor-pointer"
                        onClick={() => {
                          setSelectedManagerId(manager.id);
                          setManagerModalTab('overview');
                        }}
                      >
                        <td className="px-4 py-3">
                          <div>
                            <div className="font-medium text-gray-900">{manager.name}</div>
                            {manager.instagram && (
                              <div className="text-xs text-gray-400">{manager.instagram}</div>
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-700">{manager.eventsCreated}</td>
                        <td className="px-4 py-3 text-sm text-gray-700">
                          ${manager.avgRevenue.toLocaleString()}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-700">
                          {manager.avgConversion}%
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-700">
                          {manager.avgTotalGuests}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-700">{manager.avgPaidGuests}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Guest Detail Modal */}
      {selectedGuestId &&
        (() => {
          const selectedGuest = guests.find(g => g.id === selectedGuestId);
          if (!selectedGuest) return null;

          return (
            <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
                {/* Modal Header */}
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-start justify-between">
                    <div>
                      <h2 className="text-2xl font-light mb-1">{selectedGuest.name}</h2>
                      <div className="space-y-1">
                        {selectedGuest.email && (
                          <div className="text-sm text-gray-500">{selectedGuest.email}</div>
                        )}
                        {selectedGuest.instagram && (
                          <a
                            href={`https://instagram.com/${selectedGuest.instagram.replace('@', '')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-gray-500 hover:text-gray-700 transition-colors block"
                          >
                            {selectedGuest.instagram}
                          </a>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={() => setSelectedGuestId(null)}
                      className="text-gray-400 hover:text-gray-600 text-2xl"
                    >
                      ×
                    </button>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-3 mt-4">
                    <div className="bg-gray-50 rounded-lg p-2">
                      <div className="text-[10px] text-gray-600 mb-0.5">All Time Visits</div>
                      <div className="text-lg font-light">{selectedGuest.totalAttendance}</div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-2">
                      <div className="text-[10px] text-gray-600 mb-0.5">Last Attended</div>
                      <div className="text-lg font-light">
                        {new Date(selectedGuest.lastAttended).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Modal Content */}
                <div className="flex-1 overflow-y-auto p-6">
                  {/* Added By Section */}
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-3">Added to lists by</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedGuest.addedBy.map((dj, idx) => (
                        <div
                          key={idx}
                          className="text-sm px-3 py-2 bg-gray-100 text-gray-700 rounded-full"
                        >
                          {dj}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Attendance History Section */}
                  {selectedGuest.attendanceHistory &&
                    selectedGuest.attendanceHistory.length > 0 && (
                      <div className="mt-6">
                        <h3 className="text-sm font-medium text-gray-700 mb-3">
                          Attendance History
                        </h3>
                        <div className="border border-gray-200 rounded-lg overflow-hidden">
                          <div className="max-h-64 overflow-y-auto">
                            <table className="w-full">
                              <thead className="bg-gray-50 border-b border-gray-200 sticky top-0">
                                <tr>
                                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-600">
                                    Date
                                  </th>
                                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-600">
                                    DJ
                                  </th>
                                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-600">
                                    Added By
                                  </th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-gray-200">
                                {selectedGuest.attendanceHistory.map((record, idx) => (
                                  <tr key={idx} className="hover:bg-gray-50">
                                    <td className="px-4 py-3 text-sm text-gray-700">
                                      {record.eventDate}
                                    </td>
                                    <td className="px-4 py-3 text-sm text-gray-700">
                                      {record.djNames}
                                    </td>
                                    <td className="px-4 py-3 text-sm text-gray-500">
                                      {record.addedBy}
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    )}
                </div>
              </div>
            </div>
          );
        })()}

      {/* DJ Detail Modal */}
      {selectedDjId &&
        (() => {
          const selectedDj = djs.find(dj => dj.id === selectedDjId);
          if (!selectedDj) return null;

          // Mock DJ guests for the Guests tab
          const djGuests = guests.filter(g => g.addedBy.includes(selectedDj.name));

          // Mock event history for the Event History tab (12 months)
          const otherDjNames = [
            'DJ Shadow',
            'Sarah Deep',
            'Techno Tom',
            'Vinyl Vince',
            'Bass Queen',
            'House Master',
          ];
          const eventHistory = Array.from({ length: selectedDj.totalEvents }, (_, i) => {
            const date = new Date();
            date.setMonth(date.getMonth() - i);

            // Sometimes solo, sometimes with other DJs
            const hasOtherDjs = Math.random() > 0.4; // 60% chance of having other DJs
            const otherDjs = hasOtherDjs
              ? otherDjNames
                  .filter(name => name !== selectedDj.name)
                  .sort(() => 0.5 - Math.random())
                  .slice(0, Math.floor(Math.random() * 2) + 1) // 1-2 other DJs
              : [];

            return {
              id: `event_${i}`,
              date: date.toISOString().split('T')[0],
              eventName: [
                'Saturday Night Sessions',
                'Deep House Vibes',
                'Techno Warehouse',
                'Underground Collective',
              ][i % 4],
              attendance: Math.floor(Math.random() * 30) + 40,
              capacity: selectedDj.defaultCap,
              revenue: Math.floor(Math.random() * 2000) + 1000,
              otherDjs: otherDjs.join(', ') || '-',
            };
          }).sort((a, b) => {
            let comparison = 0;

            if (eventHistorySortColumn === 'date') {
              comparison = a.date.localeCompare(b.date);
            } else if (eventHistorySortColumn === 'eventName') {
              comparison = a.eventName.localeCompare(b.eventName);
            } else if (eventHistorySortColumn === 'attendance') {
              comparison = a.attendance - b.attendance;
            } else if (eventHistorySortColumn === 'capacity') {
              comparison = a.capacity - b.capacity;
            } else if (eventHistorySortColumn === 'revenue') {
              comparison = a.revenue - b.revenue;
            }

            return eventHistorySortDirection === 'asc' ? comparison : -comparison;
          });

          return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-xl w-full max-w-4xl max-h-[90vh] min-h-[500px] overflow-hidden flex flex-col">
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
                            <a
                              href={`https://instagram.com/${selectedDj.instagram.replace('@', '')}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={e => e.stopPropagation()}
                              className="text-gray-600 hover:text-gray-900 transition-colors"
                            >
                              {selectedDj.instagram}
                            </a>
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
                          className="w-32 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
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
                              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                                Name
                              </th>
                              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                                IG Handle
                              </th>
                              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                                Attendance
                              </th>
                              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                                Last Attended
                              </th>
                              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                                Added By Other DJs
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200">
                            {djGuests.map(guest => (
                              <tr key={guest.id} className="hover:bg-gray-50">
                                <td className="px-4 py-3 text-sm">{guest.name}</td>
                                <td className="px-4 py-3 text-sm text-gray-600">
                                  {guest.instagram ? (
                                    <a
                                      href={`https://instagram.com/${guest.instagram.replace('@', '')}`}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      onClick={e => e.stopPropagation()}
                                      className="text-gray-600 hover:text-gray-900 transition-colors"
                                    >
                                      {guest.instagram}
                                    </a>
                                  ) : (
                                    '-'
                                  )}
                                </td>
                                <td className="px-4 py-3 text-sm text-gray-700">
                                  {guest.totalAttendance}
                                </td>
                                <td className="px-4 py-3 text-sm text-gray-700">
                                  {new Date(guest.lastAttended).toLocaleDateString('en-US', {
                                    month: 'short',
                                    day: 'numeric',
                                    year: 'numeric',
                                  })}
                                </td>
                                <td className="px-4 py-3">
                                  <div className="flex flex-wrap gap-1">
                                    {guest.addedBy
                                      .filter(djName => djName !== selectedDj.name)
                                      .map((djName, idx) => {
                                        const matchingDj = djs.find(d => d.name === djName);
                                        return matchingDj ? (
                                          <button
                                            key={idx}
                                            onClick={e => {
                                              e.stopPropagation();
                                              setSelectedDjId(matchingDj.id);
                                              setDjModalTab('overview');
                                            }}
                                            className="text-xs px-2 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full transition-colors"
                                          >
                                            {djName}
                                          </button>
                                        ) : (
                                          <span
                                            key={idx}
                                            className="text-xs px-2 py-1 bg-gray-100 text-gray-500 rounded-full"
                                          >
                                            {djName}
                                          </span>
                                        );
                                      })}
                                    {guest.addedBy.filter(djName => djName !== selectedDj.name)
                                      .length === 0 && '-'}
                                  </div>
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
                                <th
                                  className="px-4 py-3 text-left text-sm font-medium text-gray-600 cursor-pointer hover:text-black"
                                  onClick={() => handleEventHistorySort('date')}
                                >
                                  <div className="flex items-center gap-2">
                                    Date
                                    {eventHistorySortColumn === 'date' && (
                                      <span>{eventHistorySortDirection === 'asc' ? '↑' : '↓'}</span>
                                    )}
                                  </div>
                                </th>
                                <th
                                  className="px-4 py-3 text-left text-sm font-medium text-gray-600 cursor-pointer hover:text-black"
                                  onClick={() => handleEventHistorySort('eventName')}
                                >
                                  <div className="flex items-center gap-2">
                                    Event Name
                                    {eventHistorySortColumn === 'eventName' && (
                                      <span>{eventHistorySortDirection === 'asc' ? '↑' : '↓'}</span>
                                    )}
                                  </div>
                                </th>
                                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                                  Other DJs
                                </th>
                                <th
                                  className="px-4 py-3 text-left text-sm font-medium text-gray-600 cursor-pointer hover:text-black"
                                  onClick={() => handleEventHistorySort('attendance')}
                                >
                                  <div className="flex items-center gap-2">
                                    Attendance
                                    {eventHistorySortColumn === 'attendance' && (
                                      <span>{eventHistorySortDirection === 'asc' ? '↑' : '↓'}</span>
                                    )}
                                  </div>
                                </th>
                                <th
                                  className="px-4 py-3 text-left text-sm font-medium text-gray-600 cursor-pointer hover:text-black"
                                  onClick={() => handleEventHistorySort('capacity')}
                                >
                                  <div className="flex items-center gap-2">
                                    Capacity
                                    {eventHistorySortColumn === 'capacity' && (
                                      <span>{eventHistorySortDirection === 'asc' ? '↑' : '↓'}</span>
                                    )}
                                  </div>
                                </th>
                                <th
                                  className="px-4 py-3 text-left text-sm font-medium text-gray-600 cursor-pointer hover:text-black"
                                  onClick={() => handleEventHistorySort('revenue')}
                                >
                                  <div className="flex items-center gap-2">
                                    Revenue
                                    {eventHistorySortColumn === 'revenue' && (
                                      <span>{eventHistorySortDirection === 'asc' ? '↑' : '↓'}</span>
                                    )}
                                  </div>
                                </th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                              {eventHistory.map(event => (
                                <tr key={event.id} className="hover:bg-gray-50">
                                  <td className="px-4 py-3 text-sm text-gray-700">
                                    {new Date(event.date).toLocaleDateString('en-US', {
                                      month: 'short',
                                      day: 'numeric',
                                      year: 'numeric',
                                    })}
                                  </td>
                                  <td className="px-4 py-3 text-sm">{event.eventName}</td>
                                  <td className="px-4 py-3 text-sm text-gray-600">
                                    {event.otherDjs === '-' ? (
                                      '-'
                                    ) : (
                                      <div className="flex flex-wrap gap-1">
                                        {event.otherDjs.split(', ').map((djName, idx) => {
                                          const matchingDj = djs.find(d => d.name === djName);
                                          return matchingDj ? (
                                            <button
                                              key={idx}
                                              onClick={e => {
                                                e.stopPropagation();
                                                setSelectedDjId(matchingDj.id);
                                                setDjModalTab('overview');
                                              }}
                                              className="text-xs px-2 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full transition-colors"
                                            >
                                              {djName}
                                            </button>
                                          ) : (
                                            <span
                                              key={idx}
                                              className="text-xs px-2 py-1 bg-gray-100 text-gray-500 rounded-full"
                                            >
                                              {djName}
                                            </span>
                                          );
                                        })}
                                      </div>
                                    )}
                                  </td>
                                  <td className="px-4 py-3 text-sm text-gray-700">
                                    {event.attendance}
                                  </td>
                                  <td className="px-4 py-3 text-sm text-gray-700">
                                    {event.capacity}
                                  </td>
                                  <td className="px-4 py-3 text-sm text-gray-700">
                                    ${event.revenue.toLocaleString()}
                                  </td>
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
                </div>
              </div>
            </div>
          );
        })()}

      {/* Staff Detail Modal */}
      {selectedStaffId &&
        (() => {
          const selectedStaffMember = staff.find(s => s.id === selectedStaffId);
          if (!selectedStaffMember) return null;

          // Mock staff guests for the Guests tab
          const staffGuests = guests
            .filter(g => {
              // For this mock, we'll show guests added during events where this staff member worked
              // In a real app, you'd track this in the database
              return Math.random() > 0.7; // Randomly assign some guests to show in the tab
            })
            .slice(0, 15);

          // Mock event history for staff
          const eventHistory = Array.from(
            { length: selectedStaffMember.totalEventsWorked },
            (_, i) => {
              const date = new Date();
              date.setDate(date.getDate() - i * 3);

              return {
                id: `event_${i}`,
                date: date.toISOString().split('T')[0],
                eventName: [
                  'Saturday Night Sessions',
                  'Deep House Vibes',
                  'Techno Warehouse',
                  'Underground Collective',
                ][i % 4],
                hoursWorked: Math.floor(Math.random() * 4) + 4, // 4-8 hours
                guestsProcessed:
                  selectedStaffMember.role === 'Security'
                    ? Math.floor(Math.random() * 20) + 10
                    : Math.floor(Math.random() * 30) + 20,
                notes:
                  Math.random() > 0.7
                    ? [
                        'Excellent performance',
                        'Great teamwork',
                        'Handled difficult situation well',
                        'On time',
                      ][Math.floor(Math.random() * 4)]
                    : '-',
              };
            }
          ).sort((a, b) => b.date.localeCompare(a.date));

          return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-xl w-full max-w-4xl max-h-[90vh] min-h-[500px] overflow-hidden flex flex-col">
                {/* Modal Header */}
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-start justify-between">
                    <div>
                      <h2 className="text-2xl font-light mb-1">{selectedStaffMember.name}</h2>
                      <div className="flex items-center gap-3 text-sm text-gray-600">
                        <span>{selectedStaffMember.email}</span>
                        <span>•</span>
                        <span>{selectedStaffMember.phone}</span>
                        <span>•</span>
                        <span>{selectedStaffMember.instagram || 'Not provided'}</span>
                        <span>•</span>
                        <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                          {selectedStaffMember.role}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => setSelectedStaffId(null)}
                      className="text-gray-400 hover:text-gray-600 text-2xl"
                    >
                      ×
                    </button>
                  </div>
                </div>

                {/* Internal Tab Navigation */}
                <div className="px-6 border-b border-gray-200">
                  <div className="flex gap-6">
                    <button
                      onClick={() => setStaffModalTab('overview')}
                      className={`pb-3 text-sm transition-colors relative ${
                        staffModalTab === 'overview'
                          ? 'text-black'
                          : 'text-gray-500 hover:text-black'
                      }`}
                    >
                      Overview
                      {staffModalTab === 'overview' && (
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-black"></div>
                      )}
                    </button>
                    <button
                      onClick={() => setStaffModalTab('guests')}
                      className={`pb-3 text-sm transition-colors relative ${
                        staffModalTab === 'guests' ? 'text-black' : 'text-gray-500 hover:text-black'
                      }`}
                    >
                      Guests
                      {staffModalTab === 'guests' && (
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-black"></div>
                      )}
                    </button>
                    <button
                      onClick={() => setStaffModalTab('history')}
                      className={`pb-3 text-sm transition-colors relative ${
                        staffModalTab === 'history'
                          ? 'text-black'
                          : 'text-gray-500 hover:text-black'
                      }`}
                    >
                      Event History
                      {staffModalTab === 'history' && (
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-black"></div>
                      )}
                    </button>
                  </div>
                </div>

                {/* Modal Content */}
                <div className="flex-1 overflow-y-auto p-6">
                  {/* Overview Tab */}
                  {staffModalTab === 'overview' && (
                    <div className="space-y-6">
                      <div className="grid grid-cols-3 gap-3">
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <div className="text-xs text-gray-600 mb-1">Total Events Worked</div>
                          <div className="text-xl font-light">
                            {selectedStaffMember.totalEventsWorked}
                          </div>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <div className="text-xs text-gray-600 mb-1">Total Guests Added</div>
                          <div className="text-xl font-light">
                            {selectedStaffMember.totalGuestsAdded}
                          </div>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <div className="text-xs text-gray-600 mb-1">Avg Guests/Event</div>
                          <div className="text-xl font-light">
                            {selectedStaffMember.avgGuestsPerEvent.toFixed(1)}
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Status
                        </label>
                        <select
                          defaultValue={selectedStaffMember.status}
                          className="w-48 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                        >
                          <option value="active">Active</option>
                          <option value="inactive">Inactive</option>
                          <option value="pending">Pending</option>
                        </select>
                      </div>
                    </div>
                  )}

                  {/* Guests Tab */}
                  {staffModalTab === 'guests' && (
                    <div>
                      <div className="mb-4 text-sm text-gray-600">
                        {staffGuests.length} {staffGuests.length === 1 ? 'guest' : 'guests'} added
                      </div>
                      <div className="border border-gray-200 rounded-lg overflow-hidden">
                        <table className="w-full">
                          <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                                Name
                              </th>
                              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                                Email
                              </th>
                              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                                Attendance
                              </th>
                              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                                Last Attended
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200">
                            {staffGuests.map(guest => (
                              <tr key={guest.id} className="hover:bg-gray-50">
                                <td className="px-4 py-3 text-sm">{guest.name}</td>
                                <td className="px-4 py-3 text-sm text-gray-600">{guest.email}</td>
                                <td className="px-4 py-3 text-sm text-gray-700">
                                  {guest.totalAttendance}
                                </td>
                                <td className="px-4 py-3 text-sm text-gray-700">
                                  {new Date(guest.lastAttended).toLocaleDateString('en-US', {
                                    month: 'short',
                                    day: 'numeric',
                                    year: 'numeric',
                                  })}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                        {staffGuests.length === 0 && (
                          <div className="text-center py-12 text-gray-500">
                            No guests added by this staff member yet
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Event History Tab */}
                  {staffModalTab === 'history' && (
                    <div>
                      <div className="mb-4 text-sm text-gray-600">
                        {eventHistory.length} {eventHistory.length === 1 ? 'event' : 'events'}{' '}
                        worked
                      </div>
                      <div>
                        <div className="border border-gray-200 rounded-lg overflow-hidden">
                          <table className="w-full">
                            <thead className="bg-gray-50 border-b border-gray-200">
                              <tr>
                                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                                  Date
                                </th>
                                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                                  Event
                                </th>
                                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                                  Hours Worked
                                </th>
                                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                                  Guests Processed
                                </th>
                                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                                  Notes
                                </th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                              {eventHistory.map(event => (
                                <tr key={event.id} className="hover:bg-gray-50">
                                  <td className="px-4 py-3 text-sm text-gray-700">
                                    {new Date(event.date).toLocaleDateString('en-US', {
                                      month: 'short',
                                      day: 'numeric',
                                      year: 'numeric',
                                    })}
                                  </td>
                                  <td className="px-4 py-3 text-sm text-gray-900">
                                    {event.eventName}
                                  </td>
                                  <td className="px-4 py-3 text-sm text-gray-700">
                                    {event.hoursWorked}h
                                  </td>
                                  <td className="px-4 py-3 text-sm text-gray-700">
                                    {event.guestsProcessed}
                                  </td>
                                  <td className="px-4 py-3 text-sm text-gray-600 italic">
                                    {event.notes}
                                  </td>
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
                </div>
              </div>
            </div>
          );
        })()}

      {/* Promoter Detail Modal */}
      {selectedPromoterId &&
        (() => {
          const selectedPromoter = promoters.find(p => p.id === selectedPromoterId);
          if (!selectedPromoter) return null;

          // Mock promoter guests for the Guests tab
          const promoterGuests = guests.filter(g => g.addedBy.includes(selectedPromoter.name));

          // Mock event history for the promoter
          const otherPromoterNames = [
            'Alex Martinez',
            'Taylor Swift Events',
            'Jordan Blake',
            'Sam Rivera',
            'Morgan Chen',
          ];
          const eventHistory = Array.from({ length: selectedPromoter.totalEvents }, (_, i) => {
            const date = new Date();
            date.setMonth(date.getMonth() - i);

            // Sometimes solo, sometimes with other promoters
            const hasOtherPromoters = Math.random() > 0.6;
            const otherPromoters = hasOtherPromoters
              ? otherPromoterNames
                  .filter(name => name !== selectedPromoter.name)
                  .sort(() => 0.5 - Math.random())
                  .slice(0, Math.floor(Math.random() * 2) + 1)
              : [];

            return {
              id: `event_${i}`,
              date: date.toISOString().split('T')[0],
              eventName: [
                'Saturday Night Sessions',
                'Deep House Vibes',
                'Techno Warehouse',
                'Underground Collective',
              ][i % 4],
              attendance: Math.floor(Math.random() * 30) + 40,
              capacity: selectedPromoter.defaultCap,
              revenue: Math.floor(Math.random() * 2000) + 1000,
              otherPromoters: otherPromoters.join(', ') || '-',
            };
          }).sort((a, b) => b.date.localeCompare(a.date));

          return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-xl w-full max-w-4xl max-h-[90vh] min-h-[500px] overflow-hidden flex flex-col">
                {/* Modal Header */}
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-start justify-between">
                    <div>
                      <h2 className="text-2xl font-light mb-1">{selectedPromoter.name}</h2>
                      <div className="flex items-center gap-3 text-sm text-gray-600">
                        <span>{selectedPromoter.email}</span>
                        {selectedPromoter.instagram && (
                          <>
                            <span>•</span>
                            <a
                              href={`https://instagram.com/${selectedPromoter.instagram.replace('@', '')}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={e => e.stopPropagation()}
                              className="text-gray-600 hover:text-gray-900 transition-colors"
                            >
                              {selectedPromoter.instagram}
                            </a>
                          </>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={() => setSelectedPromoterId(null)}
                      className="text-gray-400 hover:text-gray-600 text-2xl"
                    >
                      ×
                    </button>
                  </div>
                </div>

                {/* Internal Tab Navigation */}
                <div className="px-6 border-b border-gray-200">
                  <div className="flex gap-6">
                    <button
                      onClick={() => setPromoterModalTab('overview')}
                      className={`pb-3 text-sm transition-colors relative ${
                        promoterModalTab === 'overview'
                          ? 'text-black'
                          : 'text-gray-500 hover:text-black'
                      }`}
                    >
                      Overview
                      {promoterModalTab === 'overview' && (
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-black"></div>
                      )}
                    </button>
                    <button
                      onClick={() => setPromoterModalTab('guests')}
                      className={`pb-3 text-sm transition-colors relative ${
                        promoterModalTab === 'guests'
                          ? 'text-black'
                          : 'text-gray-500 hover:text-black'
                      }`}
                    >
                      Guests
                      {promoterModalTab === 'guests' && (
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-black"></div>
                      )}
                    </button>
                    <button
                      onClick={() => setPromoterModalTab('history')}
                      className={`pb-3 text-sm transition-colors relative ${
                        promoterModalTab === 'history'
                          ? 'text-black'
                          : 'text-gray-500 hover:text-black'
                      }`}
                    >
                      Event History
                      {promoterModalTab === 'history' && (
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-black"></div>
                      )}
                    </button>
                  </div>
                </div>

                {/* Modal Content */}
                <div className="flex-1 overflow-y-auto p-6">
                  {/* Overview Tab */}
                  {promoterModalTab === 'overview' && (
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Default Capacity
                        </label>
                        <input
                          type="number"
                          defaultValue={selectedPromoter.defaultCap}
                          className="w-32 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Notes
                        </label>
                        <textarea
                          placeholder="Add notes about this promoter..."
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                          rows={6}
                        />
                      </div>
                    </div>
                  )}

                  {/* Guests Tab */}
                  {promoterModalTab === 'guests' && (
                    <div>
                      <div className="mb-4 text-sm text-gray-600">
                        {promoterGuests.length} {promoterGuests.length === 1 ? 'guest' : 'guests'}
                      </div>
                      <div className="border border-gray-200 rounded-lg overflow-hidden">
                        <table className="w-full">
                          <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                                Name
                              </th>
                              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                                IG Handle
                              </th>
                              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                                Attendance
                              </th>
                              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                                Last Attended
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200">
                            {promoterGuests.map(guest => (
                              <tr key={guest.id} className="hover:bg-gray-50">
                                <td className="px-4 py-3 text-sm">{guest.name}</td>
                                <td className="px-4 py-3 text-sm text-gray-600">
                                  {guest.instagram ? (
                                    <a
                                      href={`https://instagram.com/${guest.instagram.replace('@', '')}`}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      onClick={e => e.stopPropagation()}
                                      className="text-gray-600 hover:text-gray-900 transition-colors"
                                    >
                                      {guest.instagram}
                                    </a>
                                  ) : (
                                    '-'
                                  )}
                                </td>
                                <td className="px-4 py-3 text-sm text-gray-700">
                                  {guest.totalAttendance}
                                </td>
                                <td className="px-4 py-3 text-sm text-gray-700">
                                  {new Date(guest.lastAttended).toLocaleDateString('en-US', {
                                    month: 'short',
                                    day: 'numeric',
                                    year: 'numeric',
                                  })}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                        {promoterGuests.length === 0 && (
                          <div className="text-center py-12 text-gray-500">
                            No guests added by this promoter yet
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Event History Tab */}
                  {promoterModalTab === 'history' && (
                    <div>
                      <div className="mb-4 text-sm text-gray-600">
                        {eventHistory.length} {eventHistory.length === 1 ? 'event' : 'events'}
                      </div>
                      <div>
                        <div className="border border-gray-200 rounded-lg overflow-hidden">
                          <table className="w-full">
                            <thead className="bg-gray-50 border-b border-gray-200">
                              <tr>
                                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                                  Date
                                </th>
                                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                                  Event
                                </th>
                                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                                  Other Promoters
                                </th>
                                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                                  Attendance
                                </th>
                                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                                  Capacity
                                </th>
                                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                                  Revenue
                                </th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                              {eventHistory.map(event => (
                                <tr key={event.id} className="hover:bg-gray-50">
                                  <td className="px-4 py-3 text-sm text-gray-700">
                                    {new Date(event.date).toLocaleDateString('en-US', {
                                      month: 'short',
                                      day: 'numeric',
                                      year: 'numeric',
                                    })}
                                  </td>
                                  <td className="px-4 py-3 text-sm text-gray-900">
                                    {event.eventName}
                                  </td>
                                  <td className="px-4 py-3 text-sm text-gray-600">
                                    {event.otherPromoters}
                                  </td>
                                  <td className="px-4 py-3 text-sm text-gray-700">
                                    {event.attendance}
                                  </td>
                                  <td className="px-4 py-3 text-sm text-gray-700">
                                    {event.capacity}
                                  </td>
                                  <td className="px-4 py-3 text-sm text-gray-700">
                                    ${event.revenue.toLocaleString()}
                                  </td>
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
                </div>
              </div>
            </div>
          );
        })()}

      {/* Manager Detail Modal */}
      {selectedManagerId &&
        (() => {
          const selectedManager = managers.find(m => m.id === selectedManagerId);
          if (!selectedManager) return null;

          return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-xl w-full max-w-4xl max-h-[90vh] min-h-[500px] overflow-hidden flex flex-col">
                {/* Modal Header */}
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-start justify-between">
                    <div>
                      <h2 className="text-2xl font-light mb-1">{selectedManager.name}</h2>
                      <div className="flex items-center gap-3 text-sm text-gray-600">
                        <span>{selectedManager.email}</span>
                        <span>•</span>
                        <span>{selectedManager.team}</span>
                        {selectedManager.instagram && (
                          <>
                            <span>•</span>
                            <a
                              href={`https://instagram.com/${selectedManager.instagram.replace('@', '')}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={e => e.stopPropagation()}
                              className="text-gray-600 hover:text-gray-900 transition-colors"
                            >
                              {selectedManager.instagram}
                            </a>
                          </>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={() => setSelectedManagerId(null)}
                      className="text-gray-400 hover:text-gray-600 text-2xl"
                    >
                      ×
                    </button>
                  </div>
                </div>

                {/* Internal Tab Navigation */}
                <div className="px-6 border-b border-gray-200">
                  <div className="flex gap-6">
                    <button
                      onClick={() => setManagerModalTab('overview')}
                      className={`pb-3 text-sm transition-colors relative ${
                        managerModalTab === 'overview'
                          ? 'text-black'
                          : 'text-gray-500 hover:text-black'
                      }`}
                    >
                      Overview
                      {managerModalTab === 'overview' && (
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-black"></div>
                      )}
                    </button>
                    <button
                      onClick={() => setManagerModalTab('guests')}
                      className={`pb-3 text-sm transition-colors relative ${
                        managerModalTab === 'guests'
                          ? 'text-black'
                          : 'text-gray-500 hover:text-black'
                      }`}
                    >
                      Guests
                      {managerModalTab === 'guests' && (
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-black"></div>
                      )}
                    </button>
                    <button
                      onClick={() => setManagerModalTab('history')}
                      className={`pb-3 text-sm transition-colors relative ${
                        managerModalTab === 'history'
                          ? 'text-black'
                          : 'text-gray-500 hover:text-black'
                      }`}
                    >
                      Event History
                      {managerModalTab === 'history' && (
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-black"></div>
                      )}
                    </button>
                  </div>
                </div>

                {/* Modal Content */}
                <div className="flex-1 overflow-y-auto p-6">
                  {/* Overview Tab */}
                  {managerModalTab === 'overview' && (
                    <div className="space-y-6">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-gray-50 rounded-lg p-4">
                          <div className="text-sm text-gray-600 mb-1">Events Created</div>
                          <div className="text-2xl font-light">{selectedManager.eventsCreated}</div>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-4">
                          <div className="text-sm text-gray-600 mb-1">Avg Total Guests</div>
                          <div className="text-2xl font-light">
                            {selectedManager.avgTotalGuests}
                          </div>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-4">
                          <div className="text-sm text-gray-600 mb-1">Avg Paid Guests</div>
                          <div className="text-2xl font-light">{selectedManager.avgPaidGuests}</div>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-4">
                          <div className="text-sm text-gray-600 mb-1">Avg Revenue</div>
                          <div className="text-2xl font-light">
                            ${selectedManager.avgRevenue.toLocaleString()}
                          </div>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-4">
                          <div className="text-sm text-gray-600 mb-1">Avg Conversion</div>
                          <div className="text-2xl font-light">
                            {selectedManager.avgConversion}%
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Contact Information
                        </label>
                        <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                          <div className="flex items-center gap-2 text-sm">
                            <span className="text-gray-600">Email:</span>
                            <span className="text-gray-900">{selectedManager.email}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <span className="text-gray-600">Phone:</span>
                            <span className="text-gray-900">{selectedManager.phone}</span>
                          </div>
                          {selectedManager.instagram && (
                            <div className="flex items-center gap-2 text-sm">
                              <span className="text-gray-600">Instagram:</span>
                              <a
                                href={`https://instagram.com/${selectedManager.instagram.replace('@', '')}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-900 hover:text-gray-600 transition-colors"
                              >
                                {selectedManager.instagram}
                              </a>
                            </div>
                          )}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Notes
                        </label>
                        <textarea
                          placeholder="Add notes about this manager..."
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                          rows={6}
                        />
                      </div>
                    </div>
                  )}

                  {/* Guests Tab */}
                  {managerModalTab === 'guests' && (
                    <div className="text-center py-12 text-gray-500">
                      No guests tracked for this manager
                    </div>
                  )}

                  {/* Event History Tab */}
                  {managerModalTab === 'history' && (
                    <div className="text-center py-12 text-gray-500">
                      No event history available
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
                  onChange={e => setInviteDjForm({ ...inviteDjForm, stageName: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                  placeholder="Enter DJ/Stage name"
                />
              </div>

              {/* Given Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Given Name</label>
                <input
                  type="text"
                  value={inviteDjForm.givenName}
                  onChange={e => setInviteDjForm({ ...inviteDjForm, givenName: e.target.value })}
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
                  onChange={e => setInviteDjForm({ ...inviteDjForm, email: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                  placeholder="Enter email address"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input
                  type="tel"
                  value={inviteDjForm.phone}
                  onChange={e => setInviteDjForm({ ...inviteDjForm, phone: e.target.value })}
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
                  onChange={e =>
                    setInviteDjForm({ ...inviteDjForm, upcomingGigDate: e.target.value })
                  }
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

      {/* Invite Promoter Modal */}
      {showInvitePromoterModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 max-w-md w-full mx-4">
            <h2 className="text-2xl mb-6">Invite New Promoter</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm mb-2">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter name"
                  value={invitePromoterForm.name}
                  onChange={e =>
                    setInvitePromoterForm({ ...invitePromoterForm, name: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm mb-2">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  placeholder="Enter email address"
                  value={invitePromoterForm.email}
                  onChange={e =>
                    setInvitePromoterForm({ ...invitePromoterForm, email: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm mb-2">Phone</label>
                <input
                  type="tel"
                  placeholder="Enter phone number"
                  value={invitePromoterForm.phone}
                  onChange={e =>
                    setInvitePromoterForm({ ...invitePromoterForm, phone: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm mb-2">Instagram Handle</label>
                <input
                  type="text"
                  placeholder="@username"
                  value={invitePromoterForm.instagram}
                  onChange={e =>
                    setInvitePromoterForm({ ...invitePromoterForm, instagram: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                />
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowInvitePromoterModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-full hover:bg-gray-50 transition-colors text-sm"
              >
                Cancel
              </button>
              <button
                disabled={!invitePromoterForm.name || !invitePromoterForm.email}
                className={`flex-1 px-4 py-2 rounded-full transition-colors text-sm ${
                  invitePromoterForm.name && invitePromoterForm.email
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

      {/* Invite Staff Modal */}
      {showInviteStaffModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 max-w-md w-full mx-4">
            <h2 className="text-2xl mb-6">Invite New Staff</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm mb-2">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter name"
                  value={inviteStaffForm.name}
                  onChange={e => setInviteStaffForm({ ...inviteStaffForm, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm mb-2">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  placeholder="Enter email address"
                  value={inviteStaffForm.email}
                  onChange={e => setInviteStaffForm({ ...inviteStaffForm, email: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm mb-2">Phone</label>
                <input
                  type="tel"
                  placeholder="Enter phone number"
                  value={inviteStaffForm.phone}
                  onChange={e => setInviteStaffForm({ ...inviteStaffForm, phone: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm mb-2">
                  Role <span className="text-red-500">*</span>
                </label>
                <select
                  value={inviteStaffForm.role}
                  onChange={e => setInviteStaffForm({ ...inviteStaffForm, role: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                >
                  <option value="">Select a role</option>
                  <option value="Door Manager">Door Manager</option>
                  <option value="Security">Security</option>
                  <option value="VIP Host">VIP Host</option>
                  <option value="Bar Manager">Bar Manager</option>
                </select>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowInviteStaffModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-full hover:bg-gray-50 transition-colors text-sm"
              >
                Cancel
              </button>
              <button
                disabled={!inviteStaffForm.name || !inviteStaffForm.email || !inviteStaffForm.role}
                className={`flex-1 px-4 py-2 rounded-full transition-colors text-sm ${
                  inviteStaffForm.name && inviteStaffForm.email && inviteStaffForm.role
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

      {/* Unified Invite User Modal */}
      {showInviteUserModal && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 max-w-md w-full mx-4">
            {/* User Type Selection Buttons */}
            <div className="flex gap-2 mb-6 border-b border-gray-200 pb-4">
              <button
                onClick={() => setInviteUserType('dj')}
                className={`flex-1 py-2 px-4 text-sm rounded-full transition-colors ${
                  inviteUserType === 'dj'
                    ? 'bg-black text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                DJ
              </button>
              <button
                onClick={() => setInviteUserType('staff')}
                className={`flex-1 py-2 px-4 text-sm rounded-full transition-colors ${
                  inviteUserType === 'staff'
                    ? 'bg-black text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Staff
              </button>
              <button
                onClick={() => setInviteUserType('promoter')}
                className={`flex-1 py-2 px-4 text-sm rounded-full transition-colors ${
                  inviteUserType === 'promoter'
                    ? 'bg-black text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Promoter
              </button>
              <button
                onClick={() => setInviteUserType('manager')}
                className={`flex-1 py-2 px-4 text-sm rounded-full transition-colors ${
                  inviteUserType === 'manager'
                    ? 'bg-black text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Manager
              </button>
            </div>

            {/* DJ Form */}
            {inviteUserType === 'dj' && (
              <>
                <h2 className="text-2xl mb-6">Invite New DJ</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      DJ/Stage Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={inviteDjForm.stageName}
                      onChange={e => setInviteDjForm({ ...inviteDjForm, stageName: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                      placeholder="Enter DJ/Stage name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Given Name</label>
                    <input
                      type="text"
                      value={inviteDjForm.givenName}
                      onChange={e => setInviteDjForm({ ...inviteDjForm, givenName: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                      placeholder="Enter given name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      value={inviteDjForm.email}
                      onChange={e => setInviteDjForm({ ...inviteDjForm, email: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                      placeholder="Enter email address"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <input
                      type="tel"
                      value={inviteDjForm.phone}
                      onChange={e => setInviteDjForm({ ...inviteDjForm, phone: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                      placeholder="Enter phone number"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Upcoming Gig Date
                    </label>
                    <input
                      type="date"
                      value={inviteDjForm.upcomingGigDate}
                      onChange={e =>
                        setInviteDjForm({ ...inviteDjForm, upcomingGigDate: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                    />
                  </div>
                </div>
              </>
            )}

            {/* Staff Form */}
            {inviteUserType === 'staff' && (
              <>
                <h2 className="text-2xl mb-6">Invite New Staff</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm mb-2">
                      Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Enter name"
                      value={inviteStaffForm.name}
                      onChange={e => setInviteStaffForm({ ...inviteStaffForm, name: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-2">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      placeholder="Enter email address"
                      value={inviteStaffForm.email}
                      onChange={e => setInviteStaffForm({ ...inviteStaffForm, email: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-2">Phone</label>
                    <input
                      type="tel"
                      placeholder="Enter phone number"
                      value={inviteStaffForm.phone}
                      onChange={e => setInviteStaffForm({ ...inviteStaffForm, phone: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-2">
                      Role <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={inviteStaffForm.role}
                      onChange={e => setInviteStaffForm({ ...inviteStaffForm, role: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                    >
                      <option value="">Select a role</option>
                      <option value="Door Manager">Door Manager</option>
                      <option value="Security">Security</option>
                      <option value="VIP Host">VIP Host</option>
                      <option value="Bar Manager">Bar Manager</option>
                    </select>
                  </div>
                </div>
              </>
            )}

            {/* Promoter Form */}
            {inviteUserType === 'promoter' && (
              <>
                <h2 className="text-2xl mb-6">Invite New Promoter</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm mb-2">
                      Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Enter name"
                      value={invitePromoterForm.name}
                      onChange={e =>
                        setInvitePromoterForm({ ...invitePromoterForm, name: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-2">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      placeholder="Enter email address"
                      value={invitePromoterForm.email}
                      onChange={e =>
                        setInvitePromoterForm({ ...invitePromoterForm, email: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-2">Phone</label>
                    <input
                      type="tel"
                      placeholder="Enter phone number"
                      value={invitePromoterForm.phone}
                      onChange={e =>
                        setInvitePromoterForm({ ...invitePromoterForm, phone: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-2">Instagram</label>
                    <input
                      type="text"
                      placeholder="@username"
                      value={invitePromoterForm.instagram}
                      onChange={e =>
                        setInvitePromoterForm({ ...invitePromoterForm, instagram: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                    />
                  </div>
                </div>
              </>
            )}

            {/* Manager Form */}
            {inviteUserType === 'manager' && (
              <>
                <h2 className="text-2xl mb-6">Invite New Manager</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm mb-2">
                      Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Enter name"
                      value={inviteManagerForm.name}
                      onChange={e =>
                        setInviteManagerForm({ ...inviteManagerForm, name: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-2">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      placeholder="Enter email address"
                      value={inviteManagerForm.email}
                      onChange={e =>
                        setInviteManagerForm({ ...inviteManagerForm, email: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-2">Phone</label>
                    <input
                      type="tel"
                      placeholder="Enter phone number"
                      value={inviteManagerForm.phone}
                      onChange={e =>
                        setInviteManagerForm({ ...inviteManagerForm, phone: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                    />
                  </div>
                </div>
              </>
            )}

            {/* Modal Actions */}
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowInviteUserModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-full hover:bg-gray-50 transition-colors text-sm"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (inviteUserType === 'dj') {
                    handleInviteDj();
                  } else if (inviteUserType === 'staff') {
                    // Call staff invite handler
                  } else if (inviteUserType === 'promoter') {
                    // Call promoter invite handler
                  } else if (inviteUserType === 'manager') {
                    // Call manager invite handler
                  }
                  setShowInviteUserModal(false);
                }}
                disabled={
                  (inviteUserType === 'dj' && (!inviteDjForm.stageName || !inviteDjForm.email)) ||
                  (inviteUserType === 'staff' &&
                    (!inviteStaffForm.name || !inviteStaffForm.email || !inviteStaffForm.role)) ||
                  (inviteUserType === 'promoter' &&
                    (!invitePromoterForm.name || !invitePromoterForm.email)) ||
                  (inviteUserType === 'manager' &&
                    (!inviteManagerForm.name || !inviteManagerForm.email))
                }
                className={`flex-1 px-4 py-2 rounded-full transition-colors text-sm ${
                  (inviteUserType === 'dj' && inviteDjForm.stageName && inviteDjForm.email) ||
                  (inviteUserType === 'staff' &&
                    inviteStaffForm.name &&
                    inviteStaffForm.email &&
                    inviteStaffForm.role) ||
                  (inviteUserType === 'promoter' &&
                    invitePromoterForm.name &&
                    invitePromoterForm.email) ||
                  (inviteUserType === 'manager' &&
                    inviteManagerForm.name &&
                    inviteManagerForm.email)
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
