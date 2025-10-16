'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Toast, { useToast } from '@/components/ui/Toast';
import ErrorBoundary from '@/components/ui/ErrorBoundary';
import { SafeStorage } from '@/lib/utils/safeStorage';
import DebugPanel from '@/components/debug/DebugPanel';
import ExplosionAnimation from '@/components/ui/ExplosionAnimation';

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
  totalCapacity: number;
  spotsUsed: number;
  otherDJs?: string[];
}

// Helper function to format submission time
const formatSubmittedTime = (timestamp: string): string => {
  const now = new Date();
  const submitted = new Date(timestamp);
  const diffMs = now.getTime() - submitted.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 1) return 'just now';
  if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
  return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
};

export default function DJEventManagePage() {
  const [eventInfo, setEventInfo] = useState<EventInfo | null>(null);
  const [guests, setGuests] = useState<Guest[]>([]);
  const [guestListId, setGuestListId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'pending' | 'approved' | 'denied'>('pending');
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isApproving, setIsApproving] = useState<string | null>(null);
  const [showApprovalConfirmation, setShowApprovalConfirmation] = useState(false);
  const [approvedGuestNames, setApprovedGuestNames] = useState<string[]>([]);
  const [isApprovingAll, setIsApprovingAll] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showExplosion, setShowExplosion] = useState(false);
  const [explosionButtonPos, setExplosionButtonPos] = useState({ x: 50, y: 50 });
  const router = useRouter();
  const params = useParams();
  const { toast, showToast, hideToast } = useToast();

  // Handle approval confirmation timeout with proper cleanup
  useEffect(() => {
    if (showApprovalConfirmation && !isApprovingAll) {
      const timeoutId = setTimeout(() => {
        setShowApprovalConfirmation(false);
        setApprovedGuestNames([]);
      }, 3000);

      return () => clearTimeout(timeoutId);
    }
  }, [showApprovalConfirmation, isApprovingAll]);

  useEffect(() => {
    const loadEventData = async () => {
      try {
        // Check authentication
        const isAuthenticated = SafeStorage.getItem('dj_authenticated');
        if (!isAuthenticated) {
          router.push('/dj/login');
          return;
        }

        // Validate event ID
        if (!params.id || typeof params.id !== 'string') {
          setError('Invalid event ID');
          setIsLoading(false);
          return;
        }

        // Fetch event data from API
        const eventResponse = await fetch(`/api/events/${params.id}`);
        if (!eventResponse.ok) {
          throw new Error('Failed to fetch event data');
        }

        const data = await eventResponse.json();
        const event = data.event;

        // Find the DJ's guest list
        const djGuestList = event.guest_lists?.find((gl: any) => gl.list_type === 'dj_list');

        if (!djGuestList) {
          console.log('No DJ guest list found for this event');
          setError('No guest list found for this event');
          setIsLoading(false);
          return;
        }

        // Format event date
        const eventDate = new Date(event.date);
        const formattedDate = eventDate.toLocaleDateString('en-US', {
          weekday: 'long',
          month: 'long',
          day: 'numeric',
          year: 'numeric',
        });

        // Get other DJs from event
        const otherDJs = event.dj_assignments
          ?.filter((assignment: any) => assignment.dj.id !== 'current_dj_id') // TODO: filter by actual DJ ID
          .map((assignment: any) => assignment.dj.stage_name || `${assignment.dj.first_name} ${assignment.dj.last_name}`)
          .filter(Boolean);

        setEventInfo({
          id: event.id,
          name: event.name,
          date: formattedDate,
          totalCapacity: djGuestList.max_capacity,
          spotsUsed: djGuestList.current_capacity || 0,
          otherDJs: otherDJs?.length > 0 ? otherDJs : undefined,
        });

        // Store guest list ID for approve/deny operations
        setGuestListId(djGuestList.id);

        // Fetch guest list entries
        const entriesResponse = await fetch(`/api/guest-lists/${djGuestList.id}/entries`);
        if (!entriesResponse.ok) {
          throw new Error('Failed to fetch guest entries');
        }

        const entriesData = await entriesResponse.json();
        const entries = entriesData.entries || [];

        // Map entries to Guest interface
        const mappedGuests: Guest[] = entries.map((entry: any) => ({
          id: entry.id,
          name: entry.guest ? `${entry.guest.first_name} ${entry.guest.last_name}` : 'Unknown Guest',
          email: entry.guest?.email || '',
          phone: entry.guest?.phone || '',
          instagram: entry.guest?.instagram_handle,
          plusOnes: entry.plus_ones_requested || 0,
          status: entry.status,
          checkedIn: entry.checked_in_at != null,
          submittedAt: formatSubmittedTime(entry.created_at),
        }));

        setGuests(mappedGuests);
        setIsLoading(false);
      } catch (error) {
        console.error('Failed to load event data:', error);
        setError(error instanceof Error ? error.message : 'Failed to load event data');
        setIsLoading(false);
        showToast('Failed to load event data. Please try again.', 'error');
      }
    };

    loadEventData();
  }, [router, params.id]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleApproveGuest = async (guestId: string) => {
    if (!eventInfo || !guestListId) {
      showToast('Event data not loaded', 'error');
      return;
    }

    setIsApproving(guestId);

    try {
      const guest = guests.find(g => g.id === guestId);
      if (!guest) {
        throw new Error('Guest not found');
      }

      // Call approve API
      const response = await fetch(`/api/guest-lists/${guestListId}/approve`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ entry_ids: [guestId] }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to approve guest');
      }

      // Update local state
      setGuests(prev =>
        prev.map(g => (g.id === guestId ? { ...g, status: 'approved' as const } : g))
      );

      showToast(`${guest.name} approved successfully`, 'success');
    } catch (error) {
      console.error('Failed to approve guest:', error);
      showToast(
        error instanceof Error ? error.message : 'Failed to approve guest. Please try again.',
        'error'
      );
    } finally {
      setIsApproving(null);
    }
  };

  const handleDenyGuest = async (guestId: string) => {
    if (!guestListId) {
      showToast('Event data not loaded', 'error');
      return;
    }

    try {
      const guest = guests.find(g => g.id === guestId);
      if (!guest) {
        throw new Error('Guest not found');
      }

      // Call deny API
      const response = await fetch(`/api/guest-lists/${guestListId}/deny`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ entry_ids: [guestId] }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to deny guest');
      }

      // Update local state
      setGuests(prev =>
        prev.map(g => (g.id === guestId ? { ...g, status: 'denied' as const } : g))
      );

      showToast(`${guest.name} denied`, 'success');
    } catch (error) {
      console.error('Failed to deny guest:', error);
      showToast(
        error instanceof Error ? error.message : 'Failed to deny guest. Please try again.',
        'error'
      );
    }
  };

  const handleApproveAll = async (event: React.MouseEvent) => {
    if (!guestListId) {
      showToast('Event data not loaded', 'error');
      return;
    }

    const pendingGuests = filteredGuests.filter(guest => guest.status === 'pending');

    if (pendingGuests.length === 0) return;

    // Capture button position for explosion animation
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((rect.left + rect.width / 2) / window.innerWidth) * 100;
    const y = ((rect.top + rect.height / 2) / window.innerHeight) * 100;
    setExplosionButtonPos({ x, y });

    setIsApprovingAll(true);
    setApprovedGuestNames(pendingGuests.map(guest => guest.name));

    // Start explosion animation
    setShowExplosion(true);

    try {
      // Call approve API with all pending guest IDs (during explosion animation)
      const response = await fetch(`/api/guest-lists/${guestListId}/approve`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ entry_ids: pendingGuests.map(g => g.id) }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to approve guests');
      }

      // Update local state
      setGuests(prev => {
        return prev.map(guest => {
          if (guest.status === 'pending') {
            return { ...guest, status: 'approved' as const };
          }
          return guest;
        });
      });

      setIsApprovingAll(false);
    } catch (error) {
      console.error('Failed to approve all guests:', error);
      setIsApprovingAll(false);
      setShowExplosion(false);
      setApprovedGuestNames([]);
      showToast(
        error instanceof Error ? error.message : 'Failed to approve guests. Please try again.',
        'error'
      );
    }
  };

  const handleExplosionComplete = () => {
    setShowExplosion(false);
    // Skip the white approval confirmation screen - go straight back to main interface
    setShowApprovalConfirmation(false);
    setApprovedGuestNames([]);
  };

  const handleUpdatePlusOnes = (guestId: string, newPlusOnes: number) => {
    if (!eventInfo) {
      showToast('Event data not loaded', 'error');
      return;
    }

    // Prevent negative plus ones
    const validPlusOnes = Math.max(0, newPlusOnes);

    const guest = guests.find(g => g.id === guestId);
    if (!guest) {
      showToast('Guest not found', 'error');
      return;
    }

    // Calculate current capacity
    const currentApproved = guests.filter(g => g.status === 'approved');
    const currentUsed = currentApproved.reduce((total, g) => total + 1 + g.plusOnes, 0);

    // Calculate change in capacity
    const capacityChange = validPlusOnes - guest.plusOnes;
    const newTotalCapacity = currentUsed + capacityChange;

    // Check if increasing plus ones would exceed capacity
    if (capacityChange > 0 && newTotalCapacity > eventInfo.totalCapacity) {
      showToast(
        `Cannot add plus ones: would exceed capacity (${newTotalCapacity}/${eventInfo.totalCapacity})`,
        'warning'
      );
      return;
    }

    // Update the guest's plus ones
    setGuests(prev =>
      prev.map(guest => (guest.id === guestId ? { ...guest, plusOnes: validPlusOnes } : guest))
    );

    // Save to localStorage
    const existingGuests = (SafeStorage.getJSON('event_guests') || {}) as Record<
      string,
      { status?: string; plusOnes?: number }
    >;
    SafeStorage.setJSON('event_guests', {
      ...existingGuests,
      [guestId]: { ...existingGuests[guestId], plusOnes: validPlusOnes },
    });

    showToast(`Updated plus ones for ${guest.name}`, 'success');
  };

  // Debug functions for guest management
  const debugResetGuests = () => {
    setGuests([
      {
        id: '1',
        name: 'Sarah Johnson',
        email: 'sarah@example.com',
        phone: '+1 (555) 123-4567',
        instagram: '@sarahj',
        plusOnes: 2,
        status: 'pending',
        checkedIn: false,
        submittedAt: '2 hours ago',
      },
      {
        id: '2',
        name: 'Mike Chen',
        email: 'mike@example.com',
        phone: '+1 (555) 234-5678',
        plusOnes: 1,
        status: 'pending',
        checkedIn: false,
        submittedAt: '4 hours ago',
      },
    ]);
    SafeStorage.removeItem('event_guests');
    showToast('Reset guest list to initial state', 'success');
  };

  const debugFillToCapacity = () => {
    if (!eventInfo) return;

    const newGuests = [];
    let totalUsed = 0;

    // Add guests until near capacity
    for (let i = 1; totalUsed < eventInfo.totalCapacity - 5; i++) {
      const plusOnes = Math.floor(Math.random() * 3);
      newGuests.push({
        id: `debug${i}`,
        name: `Debug Guest ${i}`,
        email: `debug${i}@test.com`,
        phone: `+1 (555) ${i.toString().padStart(3, '0')}-0000`,
        instagram: `@debug${i}`,
        plusOnes,
        status: 'approved' as const,
        checkedIn: false,
        submittedAt: `${i} hours ago`,
      });
      totalUsed += 1 + plusOnes;
    }

    setGuests(newGuests);
    showToast(`Filled to near capacity (${totalUsed}/${eventInfo.totalCapacity})`, 'success');
  };

  const debugAddEdgeCaseGuests = () => {
    const edgeCases = [
      {
        id: 'edge1',
        name: 'Alexandriaaaaaa Constantinopolous-Van Der Berg',
        email: 'very.long.email.address.that.might.break.layouts@example.com',
        phone: '+1 (555) 999-0000',
        instagram: '@alexandriaaaaaa_constantinopolous_van_der_berg_official',
        plusOnes: 8,
        status: 'pending' as const,
        checkedIn: false,
        submittedAt: '30 seconds ago',
      },
      {
        id: 'edge2',
        name: 'X',
        email: 'x@x.co',
        phone: '+1',
        plusOnes: 0,
        status: 'pending' as const,
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
        status: 'pending' as const,
        checkedIn: false,
        submittedAt: '2 minutes ago',
      },
    ];

    setGuests(prev => [...prev, ...edgeCases]);
    showToast('Added edge case guests for testing', 'success');
  };

  const debugClearStorage = () => {
    SafeStorage.removeItem('event_guests');
    SafeStorage.removeItem('dj_authenticated');
    SafeStorage.removeItem('dj_email');
    window.location.reload();
  };

  const debugToggleLoading = () => {
    setIsLoading(prev => !prev);
  };

  const debugSimulateError = () => {
    showToast('Simulated network error occurred', 'error');
  };

  const filteredGuests = guests.filter(guest => {
    switch (activeTab) {
      case 'pending':
        return guest.status === 'pending';
      case 'approved':
        return guest.status === 'approved';
      case 'denied':
        return guest.status === 'denied';
      default:
        return true;
    }
  });

  const pendingCount = guests.filter(g => g.status === 'pending').length;
  const approvedCount = guests.filter(g => g.status === 'approved').length;
  const deniedCount = guests.filter(g => g.status === 'denied').length;

  // Calculate total spots used including plus ones
  const spotsUsed = guests
    .filter(g => g.status === 'approved')
    .reduce((total, guest) => total + 1 + guest.plusOnes, 0);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
          <p className="text-gray-600">Loading event...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-6">
        <div className="text-center max-w-md">
          <div className="text-4xl mb-4">⚠️</div>
          <h1 className="text-xl font-medium mb-2">Unable to load event</h1>
          <p className="text-gray-600 mb-6">{error}</p>
          <div className="space-y-3">
            <button
              onClick={() => window.location.reload()}
              className="w-full bg-black text-white py-3 rounded-xl hover:bg-gray-900 transition-colors"
            >
              Try Again
            </button>
            <button
              onClick={() => router.push('/dj/dashboard')}
              className="w-full bg-gray-100 text-black py-3 rounded-xl hover:bg-gray-200 transition-colors"
            >
              Back to Dashboard
            </button>
          </div>
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

  // Show approval confirmation screen
  if (showApprovalConfirmation) {
    const formatNames = (names: string[]) => {
      if (names.length === 1) return names[0];
      if (names.length === 2) return `${names[0]} and ${names[1]}`;
      if (names.length > 2) {
        const lastNames = names.slice(-2);
        const firstNames = names.slice(0, -2);
        return `${firstNames.join(', ')}, ${lastNames[0]} and ${lastNames[1]}`;
      }
      return '';
    };

    return (
      <div className="min-h-screen bg-white flex flex-col">
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center max-w-2xl mx-auto px-6">
            <p className="text-xl text-gray-500">
              {isApprovingAll ? 'Approving' : 'Approved'} {formatNames(approvedGuestNames)}
            </p>
          </div>
        </div>
        {!isApprovingAll && (
          <div className="pb-8 flex justify-center">
            <button
              onClick={() => {
                setShowApprovalConfirmation(false);
                setApprovedGuestNames([]);
              }}
              className="px-4 py-2 bg-gray-100 text-black rounded-full text-sm hover:bg-gray-200 transition-colors"
            >
              Return
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-white">
        {/* Header */}
        <div className="p-6">
          <div className="max-w-4xl mx-auto">
            <button
              onClick={() => router.push('/dj/dashboard')}
              className="text-gray-600 hover:text-black transition-colors mb-4 text-sm"
            >
              ← Dashboard
            </button>
            <h1 className="text-2xl font-light mb-1">{eventInfo.name}</h1>
            <p className="text-gray-600 mb-1">{eventInfo.date}</p>
            {eventInfo.otherDJs && eventInfo.otherDJs.length > 0 && (
              <p className="text-sm text-gray-500">With {eventInfo.otherDJs.join(', ')}</p>
            )}
          </div>
        </div>

        <div className="max-w-4xl mx-auto p-6">
          {/* Event Summary */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-4">Guest List Overview</h2>
            <div className="mb-4">
              <div className="relative">
                <div className="bg-gray-200 rounded-full h-4 relative overflow-hidden">
                  <div
                    className="bg-black h-4 rounded-full transition-all duration-300 relative"
                    style={{ width: `${(spotsUsed / eventInfo.totalCapacity) * 100}%` }}
                  >
                    <span className="absolute right-2 top-1/2 -translate-y-1/2 text-white text-[10px]">
                      {spotsUsed}
                    </span>
                  </div>
                  <span className="absolute right-2 top-1/2 -translate-y-1/2 text-black text-[10px]">
                    {eventInfo.totalCapacity}
                  </span>
                </div>
                <div className="flex justify-between mt-2">
                  <span className="text-xs text-gray-500">Approved</span>
                  <span className="text-xs text-gray-500">List capacity</span>
                </div>
              </div>
            </div>

            {/* Approve All Button */}
            <div className="mb-4">
              {activeTab === 'pending' && pendingCount > 0 ? (
                <button
                  onClick={handleApproveAll}
                  className="w-full px-6 py-3 bg-black text-white rounded-full font-medium hover:bg-gray-900 transition-colors"
                >
                  Approve All Pending
                </button>
              ) : (
                <div className="h-12"></div>
              )}
            </div>

            {/* Search Button */}
            <button
              onClick={() => router.push(`/dj/events/${params.id}/search`)}
              className="w-full px-6 py-3 bg-gray-100 text-black rounded-full font-medium hover:bg-gray-200 transition-colors mb-4"
            >
              Search Guests
            </button>

            {/* Filter Tabs */}
            <div className="flex gap-2">
              <button
                onClick={() => setActiveTab('pending')}
                className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === 'pending'
                    ? 'bg-gray-600 text-white'
                    : 'bg-gray-100 text-black hover:bg-gray-200'
                }`}
              >
                Pending ({pendingCount})
              </button>
              <button
                onClick={() => setActiveTab('approved')}
                className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === 'approved'
                    ? 'bg-gray-400 text-white'
                    : 'bg-gray-100 text-black hover:bg-gray-200'
                }`}
              >
                Approved ({approvedCount})
              </button>
              {deniedCount > 0 && (
                <button
                  onClick={() => setActiveTab('denied')}
                  className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === 'denied'
                      ? 'bg-gray-400 text-white'
                      : 'bg-gray-100 text-black hover:bg-gray-200'
                  }`}
                >
                  Denied ({deniedCount})
                </button>
              )}
            </div>
          </div>

          {/* Guest List */}
          <div className="space-y-4">
            {filteredGuests.length === 0 ? (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium">
                  {activeTab === 'pending' && 'No pending guests'}
                  {activeTab === 'approved' && 'No approved guests'}
                  {activeTab === 'denied' && 'No denied guests'}
                </h3>
              </div>
            ) : (
              filteredGuests.map(guest => (
                <div key={guest.id} className="bg-white border border-gray-200 rounded-xl p-4">
                  <div>
                    {/* Name and Plus Ones */}
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <div className="flex items-center gap-2 min-w-0">
                        <h3 className="text-lg truncate" title={guest.name}>
                          {guest.name}
                        </h3>
                        {guest.plusOnes > 0 && (
                          <span className="text-lg shrink-0">+{guest.plusOnes}</span>
                        )}
                      </div>
                      {/* Plus/Minus Controls - Right side */}
                      {guest.status === 'pending' && (
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => handleUpdatePlusOnes(guest.id, guest.plusOnes - 1)}
                            className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors text-sm"
                            disabled={guest.plusOnes <= 0}
                          >
                            <span className="leading-none">−</span>
                          </button>
                          <button
                            onClick={() => handleUpdatePlusOnes(guest.id, guest.plusOnes + 1)}
                            className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors text-sm"
                          >
                            <span className="leading-none">+</span>
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Instagram Handle */}
                    {guest.instagram && (
                      <a
                        href={`https://instagram.com/${guest.instagram.replace('@', '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-blue-600 hover:text-blue-800 transition-colors mb-2 block truncate"
                        title={guest.instagram}
                      >
                        {guest.instagram}
                      </a>
                    )}

                    {/* Status Badge and Action Buttons on same line */}
                    <div className="flex items-center justify-between">
                      <div>
                        {guest.checkedIn && (
                          <span className="bg-white text-black border border-gray-300 px-3 py-1 rounded-full text-xs">
                            Checked In
                          </span>
                        )}
                        {guest.status === 'approved' && !guest.checkedIn && (
                          <span className="bg-white text-black border border-gray-300 px-3 py-1 rounded-full text-xs">
                            Approved
                          </span>
                        )}
                        {guest.status === 'pending' && (
                          <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-xs">
                            Pending
                          </span>
                        )}
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-2">
                        {guest.status === 'pending' && (
                          <>
                            <button
                              onClick={() => handleDenyGuest(guest.id)}
                              className="px-3 py-1 bg-white text-black border border-black rounded-full text-xs hover:bg-gray-50 transition-colors"
                            >
                              Deny
                            </button>
                            <button
                              onClick={() => handleApproveGuest(guest.id)}
                              disabled={isApproving === guest.id}
                              className="px-3 py-1 bg-black text-white rounded-full text-xs hover:bg-gray-900 transition-colors disabled:opacity-50"
                            >
                              {isApproving === guest.id ? '...' : 'Approve'}
                            </button>
                          </>
                        )}

                        {/* View Details Button for non-pending */}
                        {guest.status !== 'pending' && (
                          <button
                            onClick={() => router.push(`/dj/events/${params.id}/guest/${guest.id}`)}
                            className="px-4 py-1.5 bg-gray-100 text-black rounded-full text-xs hover:bg-gray-200 transition-colors"
                          >
                            View Details
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Toast Notifications */}
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={hideToast}
      />

      {/* Debug Panel */}
      <DebugPanel
        onResetData={debugResetGuests}
        onFillToCapacity={debugFillToCapacity}
        onGenerateRandomGuests={debugAddEdgeCaseGuests}
        onClearStorage={debugClearStorage}
        onToggleLoading={debugToggleLoading}
        onSimulateError={debugSimulateError}
      />

      {/* Explosion Animation */}
      <ExplosionAnimation
        isVisible={showExplosion}
        onAnimationComplete={handleExplosionComplete}
        approvedNames={approvedGuestNames}
        buttonPosition={explosionButtonPos}
      />
    </ErrorBoundary>
  );
}
