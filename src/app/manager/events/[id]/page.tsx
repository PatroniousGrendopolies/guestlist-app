'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { SafeStorage } from '@/lib/utils/safeStorage';

interface GuestListAPI {
  id: string;
  name: string;
  list_type: 'dj_list' | 'staff_list' | 'vip_list' | 'promoter_list';
  creator: {
    first_name: string;
    last_name: string;
  };
}

interface GuestListEntryAPI {
  id: string;
  guest_list_id: string;
  status: 'pending' | 'approved' | 'denied';
  plus_ones_requested: number;
  created_at: string;
  checked_in_at?: string;
  guest: {
    first_name: string;
    last_name: string;
    email: string;
    phone?: string;
    instagram_handle?: string;
  };
}

interface DJAssignmentAPI {
  dj: {
    first_name: string;
    last_name: string;
    stage_name?: string;
  };
}

interface EventAPI {
  id: string;
  name: string;
  date: string;
  day_of_week: string;
  max_total_capacity: number;
  venue?: {
    name: string;
  };
  guest_lists?: GuestListAPI[];
  dj_assignments?: DJAssignmentAPI[];
}

interface GuestOnList {
  id: string;
  name: string;
  email: string;
  phone: string;
  instagram?: string;
  plusOnes: number;
  addedBy: string;
  addedByRole: 'dj' | 'promoter' | 'staff' | 'manager';
  status: 'pending' | 'approved' | 'denied' | 'checked_in';
  submittedAt: string;
  checkedInAt?: string;
  guest_list_id: string;
}

interface EventDetails {
  id: string;
  name: string;
  date: string;
  dayOfWeek: string;
  djNames: string;
  venue: string;
  totalCapacity: number;
  approvedGuests: number;
  pendingGuests: number;
  deniedGuests: number;
  checkedInGuests: number;
  status: 'upcoming' | 'today' | 'past';
}

export default function EventDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const eventId = params.id as string;

  const [isLoading, setIsLoading] = useState(true);
  const [event, setEvent] = useState<EventDetails | null>(null);
  const [guests, setGuests] = useState<GuestOnList[]>([]);
  const [filterStatus, setFilterStatus] = useState<
    'all' | 'pending' | 'approved' | 'denied' | 'checked_in'
  >('all');
  const [filterAddedBy, setFilterAddedBy] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGuests, setSelectedGuests] = useState<Set<string>>(new Set());
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [messageText, setMessageText] = useState('');

  // Format date to "Tues Oct 9 at 9:30pm"
  const formatSubmittedDate = (dateString: string) => {
    const date = new Date(dateString);
    const days = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'];
    const months = [
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
    ];

    const dayName = days[date.getDay()];
    const monthName = months[date.getMonth()];
    const day = date.getDate();

    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // 0 should be 12
    const minutesStr = minutes < 10 ? '0' + minutes : minutes;

    return `${dayName} ${monthName} ${day} at ${hours}:${minutesStr}${ampm}`;
  };

  useEffect(() => {
    // Check authentication
    const isAuthenticated = SafeStorage.getItem('manager_authenticated');
    if (!isAuthenticated) {
      router.push('/manager/login');
      return;
    }

    const loadEventData = async () => {
      try {
        // Fetch event data
        const eventResponse = await fetch(`/api/events/${eventId}`);
        if (!eventResponse.ok) {
          console.error('Failed to fetch event');
          setIsLoading(false);
          return;
        }

        const { event: eventData }: { event: EventAPI } = await eventResponse.json();

        // Fetch all guest list entries for this event
        const allEntries: GuestOnList[] = [];
        if (eventData.guest_lists && eventData.guest_lists.length > 0) {
          await Promise.all(
            eventData.guest_lists.map(async (guestList: GuestListAPI) => {
              try {
                const entriesResponse = await fetch(
                  `/api/guest-lists/${guestList.id}/entries`
                );
                if (entriesResponse.ok) {
                  const { entries }: { entries: GuestListEntryAPI[] } = await entriesResponse.json();

                  // Map database entries to UI format
                  const mappedEntries = entries.map((entry: GuestListEntryAPI) => {
                    // Map list_type to role
                    let role: 'dj' | 'promoter' | 'staff' | 'manager' = 'staff';
                    if (guestList.list_type === 'dj_list') role = 'dj';
                    else if (guestList.list_type === 'promoter_list') role = 'promoter';
                    else if (guestList.list_type === 'staff_list') role = 'staff';
                    else if (guestList.list_type === 'vip_list') role = 'manager';

                    // Determine status - checked_in takes priority
                    let status: 'pending' | 'approved' | 'denied' | 'checked_in' = entry.status;
                    if (entry.checked_in_at) {
                      status = 'checked_in';
                    }

                    return {
                      id: entry.id,
                      name: `${entry.guest.first_name} ${entry.guest.last_name}`,
                      email: entry.guest.email || '',
                      phone: entry.guest.phone || '',
                      instagram: entry.guest.instagram_handle,
                      plusOnes: entry.plus_ones_requested || 0,
                      addedBy: guestList.creator
                        ? `${guestList.creator.first_name} ${guestList.creator.last_name}`
                        : 'Unknown',
                      addedByRole: role,
                      status,
                      submittedAt: entry.created_at,
                      checkedInAt: entry.checked_in_at,
                      guest_list_id: guestList.id,
                    };
                  });

                  allEntries.push(...mappedEntries);
                }
              } catch (error) {
                console.error(`Failed to fetch entries for guest list ${guestList.id}:`, error);
              }
            })
          );
        }

        // Format event date
        const eventDate = new Date(eventData.date);
        const days = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'];
        const months = [
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
        ];
        const formattedDate = `${days[eventDate.getDay()]} ${months[eventDate.getMonth()]} ${eventDate.getDate()}, ${eventDate.getFullYear()}`;

        // Format DJ names
        const djNames = eventData.dj_assignments
          ?.map((assignment: DJAssignmentAPI) => {
            const dj = assignment.dj;
            return dj.stage_name || `${dj.first_name} ${dj.last_name}`;
          })
          .join(' & ');

        // Calculate counts from entries
        const approvedGuests = allEntries.filter(
          e => e.status === 'approved' || e.status === 'checked_in'
        ).length;
        const pendingGuests = allEntries.filter(e => e.status === 'pending').length;
        const deniedGuests = allEntries.filter(e => e.status === 'denied').length;
        const checkedInGuests = allEntries.filter(e => e.status === 'checked_in').length;

        // Determine event status
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const eventDateOnly = new Date(eventData.date);
        eventDateOnly.setHours(0, 0, 0, 0);

        let status: 'upcoming' | 'today' | 'past' = 'upcoming';
        if (eventDateOnly < today) {
          status = 'past';
        } else if (eventDateOnly.getTime() === today.getTime()) {
          status = 'today';
        }

        const mappedEvent: EventDetails = {
          id: eventData.id,
          name: eventData.name,
          date: formattedDate,
          dayOfWeek: eventData.day_of_week,
          djNames: djNames || 'No DJs assigned',
          venue: eventData.venue?.name || 'Unknown venue',
          totalCapacity: eventData.max_total_capacity,
          approvedGuests,
          pendingGuests,
          deniedGuests,
          checkedInGuests,
          status,
        };

        setEvent(mappedEvent);
        setGuests(allEntries);
      } catch (error) {
        console.error('Error loading event data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadEventData();
  }, [router, eventId]);

  const handleApprove = async (guestIds: string[]) => {
    try {
      // Group guest IDs by their guest_list_id
      const guestsByList = new Map<string, string[]>();
      guestIds.forEach(guestId => {
        const guest = guests.find(g => g.id === guestId);
        if (guest) {
          const listEntries = guestsByList.get(guest.guest_list_id) || [];
          listEntries.push(guestId);
          guestsByList.set(guest.guest_list_id, listEntries);
        }
      });

      // Call approve API for each guest list
      await Promise.all(
        Array.from(guestsByList.entries()).map(async ([listId, entryIds]) => {
          const response = await fetch(`/api/guest-lists/${listId}/approve`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ entry_ids: entryIds }),
          });

          if (!response.ok) {
            console.error(`Failed to approve guests for list ${listId}`);
          }
        })
      );

      // Update local state
      setGuests(
        guests.map(g => (guestIds.includes(g.id) ? { ...g, status: 'approved' as const } : g))
      );
      setSelectedGuests(new Set());
    } catch (error) {
      console.error('Error approving guests:', error);
    }
  };

  const handleDeny = async (guestIds: string[]) => {
    try {
      // Group guest IDs by their guest_list_id
      const guestsByList = new Map<string, string[]>();
      guestIds.forEach(guestId => {
        const guest = guests.find(g => g.id === guestId);
        if (guest) {
          const listEntries = guestsByList.get(guest.guest_list_id) || [];
          listEntries.push(guestId);
          guestsByList.set(guest.guest_list_id, listEntries);
        }
      });

      // Call deny API for each guest list
      await Promise.all(
        Array.from(guestsByList.entries()).map(async ([listId, entryIds]) => {
          const response = await fetch(`/api/guest-lists/${listId}/deny`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ entry_ids: entryIds }),
          });

          if (!response.ok) {
            console.error(`Failed to deny guests for list ${listId}`);
          }
        })
      );

      // Update local state
      setGuests(guests.map(g => (guestIds.includes(g.id) ? { ...g, status: 'denied' as const } : g)));
      setSelectedGuests(new Set());
    } catch (error) {
      console.error('Error denying guests:', error);
    }
  };

  const handleSelectGuest = (guestId: string, checked: boolean) => {
    const newSelected = new Set(selectedGuests);
    if (checked) {
      newSelected.add(guestId);
    } else {
      newSelected.delete(guestId);
    }
    setSelectedGuests(newSelected);
  };

  const handleSendMessage = () => {
    const selectedGuestsList = guests.filter(g => selectedGuests.has(g.id));
    console.log(
      'Sending message to:',
      selectedGuestsList.map(g => g.phone)
    );
    console.log('Message:', messageText);
    // In real app: API call to send SMS
    setShowMessageModal(false);
    setMessageText('');
    setSelectedGuests(new Set());
  };

  const filteredGuests = guests.filter(guest => {
    // Status filter
    if (filterStatus !== 'all' && guest.status !== filterStatus) return false;

    // Added by filter
    if (filterAddedBy && guest.addedBy !== filterAddedBy) return false;

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        guest.name.toLowerCase().includes(query) ||
        guest.email.toLowerCase().includes(query) ||
        guest.phone.includes(query) ||
        guest.instagram?.toLowerCase().includes(query)
      );
    }

    return true;
  });

  const uniqueAdders = Array.from(new Set(guests.map(g => g.addedBy)));

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

  if (!event) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Event not found</p>
          <button
            onClick={() => router.push('/manager/dashboard')}
            className="text-black underline"
          >
            Return to dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-200">
        <div className="max-w-6xl mx-auto p-6">
          <button
            onClick={() => router.push('/manager/dashboard')}
            className="text-gray-600 hover:text-black transition-colors mb-4 flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Dashboard
          </button>

          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-3xl font-light tracking-tight mb-2">{event.name}</h1>
              <p className="text-gray-600 text-lg mb-1">{event.date}</p>
              <p className="text-gray-500">{event.djNames}</p>
            </div>
            {event.status === 'today' && (
              <span className="px-4 py-2 bg-black text-white rounded-full text-sm">Today</span>
            )}
          </div>

          {/* Capacity Meter */}
          <div>
            <div className="relative h-8 bg-gray-200 rounded-full overflow-hidden cursor-pointer">
              {/* Light gray background - click to show all guests */}
              <div
                className="absolute inset-0 hover:bg-gray-300 transition-colors"
                onClick={() => setFilterStatus('all')}
              ></div>

              {/* Gray bar shows total (approved + pending) - click to show pending */}
              <div
                className="absolute top-0 left-0 h-8 bg-gray-400 rounded-full transition-all duration-300 hover:bg-gray-500 z-[5]"
                style={{
                  width: `${((event.approvedGuests + event.pendingGuests) / event.totalCapacity) * 100}%`,
                }}
                onClick={e => {
                  e.stopPropagation();
                  setFilterStatus('pending');
                }}
              ></div>

              {/* Black bar shows approved guests on top - click to show approved */}
              <div
                className="absolute top-0 left-0 h-8 bg-black rounded-full transition-all duration-300 hover:bg-gray-800 z-10"
                style={{ width: `${(event.approvedGuests / event.totalCapacity) * 100}%` }}
                onClick={e => {
                  e.stopPropagation();
                  setFilterStatus('approved');
                }}
              ></div>

              {/* Approved number (white text on black) */}
              {event.approvedGuests > 0 && event.approvedGuests / event.totalCapacity > 0.08 && (
                <span className="absolute left-2 top-1/2 -translate-y-1/2 text-white text-sm font-medium z-20 pointer-events-none">
                  {event.approvedGuests}
                </span>
              )}

              {/* Pending number (white text on gray) - positioned on right side of gray bar */}
              {event.pendingGuests > 0 && event.pendingGuests / event.totalCapacity > 0.08 && (
                <span
                  className="absolute top-1/2 -translate-y-1/2 text-white text-sm font-medium z-20 pointer-events-none"
                  style={{
                    left: `calc(${((event.approvedGuests + event.pendingGuests) / event.totalCapacity) * 100}% - 24px)`,
                  }}
                >
                  {event.pendingGuests}
                </span>
              )}

              {/* Total capacity number (gray text on light gray background) */}
              {(event.approvedGuests + event.pendingGuests) / event.totalCapacity < 0.85 && (
                <span className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-600 text-sm font-medium z-10 pointer-events-none">
                  {event.totalCapacity}
                </span>
              )}
            </div>

            {/* Labels below meter */}
            <div className="relative mt-2">
              {/* Confirmed label - under black section */}
              <span className="absolute left-2 text-xs text-gray-500">Confirmed</span>

              {/* Pending label - under gray section */}
              {event.pendingGuests > 0 && (
                <span
                  className="absolute text-xs text-gray-500"
                  style={{
                    left: `calc(${((event.approvedGuests + event.pendingGuests) / event.totalCapacity) * 100}% - 24px)`,
                  }}
                >
                  Pending
                </span>
              )}

              {/* Spots available label - on right */}
              <span className="absolute right-2 text-xs text-gray-500">Spots available</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6">
        {/* Filters and Search */}
        <div className="mb-6">
          {/* Search */}
          <input
            type="text"
            placeholder="Search guests..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 border border-gray-200 rounded-full focus:outline-none focus:border-black mb-4"
          />

          {/* Status Filter Pills */}
          <div className="flex flex-wrap gap-2 mb-3">
            <button
              onClick={() => setFilterStatus('all')}
              className={`px-3 py-1 rounded-full text-sm transition-colors ${
                filterStatus === 'all'
                  ? 'bg-black text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilterStatus('approved')}
              className={`px-3 py-1 rounded-full text-sm transition-colors ${
                filterStatus === 'approved'
                  ? 'bg-black text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Approved
            </button>
            <button
              onClick={() => setFilterStatus('pending')}
              className={`px-3 py-1 rounded-full text-sm transition-colors ${
                filterStatus === 'pending'
                  ? 'bg-black text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Pending
            </button>
            <button
              onClick={() => setFilterStatus('denied')}
              className={`px-3 py-1 rounded-full text-sm transition-colors ${
                filterStatus === 'denied'
                  ? 'bg-black text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Denied
            </button>
            <button
              onClick={() => setFilterStatus('checked_in')}
              className={`px-3 py-1 rounded-full text-sm transition-colors ${
                filterStatus === 'checked_in'
                  ? 'bg-black text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Checked In
            </button>
          </div>

          {/* Added By Filter Pills */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setFilterAddedBy(null)}
              className={`px-3 py-1 rounded-full text-sm transition-colors ${
                filterAddedBy === null
                  ? 'bg-black text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All
            </button>
            {uniqueAdders.map(adder => (
              <button
                key={adder}
                onClick={() => setFilterAddedBy(adder)}
                className={`px-3 py-1 rounded-full text-sm transition-colors ${
                  filterAddedBy === adder
                    ? 'bg-black text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {adder}
              </button>
            ))}
          </div>
        </div>

        {/* Bulk Actions */}
        {selectedGuests.size > 0 && (
          <div className="mb-4 flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
            <span className="text-sm text-gray-600">
              {selectedGuests.size} guest{selectedGuests.size > 1 ? 's' : ''} selected
            </span>
            <button
              onClick={() => handleApprove(Array.from(selectedGuests))}
              className="bg-black text-white px-4 py-2 rounded-full hover:bg-gray-800 transition-colors text-sm"
            >
              Approve Selected
            </button>
            <button
              onClick={() => handleDeny(Array.from(selectedGuests))}
              className="bg-white text-black border border-gray-300 px-4 py-2 rounded-full hover:bg-gray-50 transition-colors text-sm"
            >
              Deny Selected
            </button>
            <button
              onClick={() => setShowMessageModal(true)}
              className="bg-white text-black border border-gray-300 px-4 py-2 rounded-full hover:bg-gray-50 transition-colors text-sm"
            >
              Message Guests
            </button>
            <button
              onClick={() => setSelectedGuests(new Set())}
              className="text-gray-600 hover:text-black transition-colors text-sm"
            >
              Clear Selection
            </button>
          </div>
        )}

        {/* Guest List Table */}
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 w-12"></th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Guest</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600"></th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Contact</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
                    Added By
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Status</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
                    Submitted
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredGuests.map((guest, index) => (
                  <tr
                    key={guest.id}
                    className={`border-b border-gray-100 hover:bg-gray-50 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}
                  >
                    <td className="py-3 px-4">
                      <input
                        type="checkbox"
                        checked={selectedGuests.has(guest.id)}
                        onChange={e => handleSelectGuest(guest.id, e.target.checked)}
                        className="w-4 h-4 rounded border-gray-300 cursor-pointer"
                      />
                    </td>
                    <td className="py-3 px-4">
                      <p className="text-sm font-medium">{guest.name}</p>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-sm">
                        {guest.plusOnes > 0 ? `+${guest.plusOnes}` : '-'}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <p className="text-sm text-gray-600">{guest.email}</p>
                      {guest.instagram && (
                        <p className="text-xs text-gray-500">{guest.instagram}</p>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      <span className="inline-block px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                        {guest.addedBy}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                        {guest.status === 'checked_in'
                          ? 'Checked In'
                          : guest.status.charAt(0).toUpperCase() + guest.status.slice(1)}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <p className="text-xs text-gray-500">
                        {formatSubmittedDate(guest.submittedAt)}
                      </p>
                      {guest.checkedInAt && (
                        <p className="text-xs text-gray-500">
                          In: {formatSubmittedDate(guest.checkedInAt)}
                        </p>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        {guest.status !== 'approved' && (
                          <button
                            onClick={() => handleApprove([guest.id])}
                            className="px-3 py-1 bg-white border border-gray-300 text-black rounded-full hover:bg-gray-50 transition-colors text-xs"
                          >
                            Approve
                          </button>
                        )}
                        {guest.status !== 'denied' && guest.status !== 'approved' && (
                          <button
                            onClick={() => handleDeny([guest.id])}
                            className="px-3 py-1 bg-white border border-gray-300 text-black rounded-full hover:bg-gray-50 transition-colors text-xs"
                          >
                            Deny
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filteredGuests.length === 0 && (
            <div className="p-8 text-center">
              <p className="text-gray-600">No guests found matching your filters.</p>
            </div>
          )}
        </div>
      </div>

      {/* Message Modal */}
      {showMessageModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-lg w-full mx-4">
            <h3 className="text-xl font-light mb-4">Message Guests</h3>
            <p className="text-sm text-gray-600 mb-4">
              Sending SMS to {selectedGuests.size} guest{selectedGuests.size > 1 ? 's' : ''}
            </p>
            <textarea
              value={messageText}
              onChange={e => setMessageText(e.target.value)}
              placeholder="Type your message here..."
              className="w-full h-32 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-black resize-none mb-4"
            />
            <div className="flex justify-end gap-3">
              <button
                onClick={() => {
                  setShowMessageModal(false);
                  setMessageText('');
                }}
                className="px-4 py-2 text-gray-600 hover:text-black transition-colors text-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleSendMessage}
                disabled={!messageText.trim()}
                className="bg-black text-white px-4 py-2 rounded-full hover:bg-gray-800 transition-colors text-sm disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Send Message
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
