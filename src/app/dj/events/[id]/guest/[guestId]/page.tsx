'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';

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
  checkInTime?: string;
  notes?: string;
}

interface EventInfo {
  id: string;
  name: string;
  date: string;
}

export default function DJGuestDetailPage() {
  const [eventInfo, setEventInfo] = useState<EventInfo | null>(null);
  const [guest, setGuest] = useState<Guest | null>(null);
  const [guestListId, setGuestListId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isApproving, setIsApproving] = useState(false);
  const [isDenying, setIsDenying] = useState(false);
  const router = useRouter();
  const params = useParams();

  useEffect(() => {
    const loadGuestData = async () => {
      // Check authentication
      const isAuthenticated = localStorage.getItem('dj_authenticated');
      if (!isAuthenticated) {
        router.push('/dj/login');
        return;
      }

      try {
        // Fetch guest entry data
        const entryResponse = await fetch(`/api/guest-list-entries/${params.guestId}`);
        if (!entryResponse.ok) {
          setGuest(null);
          setIsLoading(false);
          return;
        }

        const entryData = await entryResponse.json();
        const entry = entryData.entry;

        // Fetch event data
        const eventResponse = await fetch(`/api/events/${params.id}`);
        if (!eventResponse.ok) {
          setGuest(null);
          setIsLoading(false);
          return;
        }

        const eventDataResponse = await eventResponse.json();
        const event = eventDataResponse.event;

        // Format event date
        const eventDate = new Date(event.date);
        const formattedDate = eventDate.toLocaleDateString('en-US', {
          weekday: 'long',
          month: 'long',
          day: 'numeric',
          year: 'numeric',
        });

        setEventInfo({
          id: event.id,
          name: event.name,
          date: formattedDate,
        });

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

        // Format check-in time if available
        let checkInTime: string | undefined;
        if (entry.checked_in_at) {
          const checkedInDate = new Date(entry.checked_in_at);
          checkInTime = checkedInDate.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true,
          });
        }

        // Map entry to Guest interface
        const mappedGuest: Guest = {
          id: entry.id,
          name: entry.guest ? `${entry.guest.first_name} ${entry.guest.last_name}` : 'Unknown Guest',
          email: entry.guest?.email || '',
          phone: entry.guest?.phone || '',
          instagram: entry.guest?.instagram_handle,
          plusOnes: entry.plus_ones_requested || 0,
          status: entry.status,
          checkedIn: entry.checked_in_at != null,
          submittedAt: formatSubmittedTime(entry.created_at),
          checkInTime,
        };

        setGuest(mappedGuest);
        setGuestListId(entry.guest_list.id);
        setIsLoading(false);
      } catch (error) {
        console.error('Failed to load guest data:', error);
        setGuest(null);
        setIsLoading(false);
      }
    };

    loadGuestData();
  }, [router, params.id, params.guestId]);

  const handleApproveGuest = async () => {
    if (!guest || !guestListId) return;

    setIsApproving(true);

    try {
      // Call approve API
      const response = await fetch(`/api/guest-lists/${guestListId}/approve`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ entry_ids: [guest.id] }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to approve guest');
      }

      // Update local state
      setGuest(prev => {
        if (!prev) return null;
        return { ...prev, status: 'approved' as const };
      });
    } catch (error) {
      console.error('Failed to approve guest:', error);
      alert(error instanceof Error ? error.message : 'Failed to approve guest. Please try again.');
    } finally {
      setIsApproving(false);
    }
  };

  const handleDenyGuest = async () => {
    if (!guest || !guestListId) return;

    setIsDenying(true);

    try {
      // Call deny API
      const response = await fetch(`/api/guest-lists/${guestListId}/deny`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ entry_ids: [guest.id] }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to deny guest');
      }

      // Update local state
      setGuest(prev => {
        if (!prev) return null;
        return { ...prev, status: 'denied' as const };
      });
    } catch (error) {
      console.error('Failed to deny guest:', error);
      alert(error instanceof Error ? error.message : 'Failed to deny guest. Please try again.');
    } finally {
      setIsDenying(false);
    }
  };

  const handleUpdatePlusOnes = (newPlusOnes: number) => {
    if (!guest) return;

    setGuest(prev => (prev ? { ...prev, plusOnes: Math.max(0, newPlusOnes) } : null));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-white text-black border border-gray-300';
      case 'pending':
        return 'bg-gray-200 text-gray-700';
      case 'denied':
        return 'bg-white text-black border border-black';
      default:
        return 'bg-gray-200 text-gray-700';
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
          <p className="text-gray-600">Loading guest details...</p>
        </div>
      </div>
    );
  }

  if (!eventInfo || !guest) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h3 className="text-lg font-medium mb-2">Guest not found</h3>
          <button
            onClick={() => router.push(`/dj/events/${params.id}/manage`)}
            className="text-black hover:underline"
          >
            ← Guest List
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="p-6">
        <div className="max-w-2xl mx-auto">
          <button
            onClick={() => router.push(`/dj/events/${params.id}/manage`)}
            className="text-gray-600 hover:text-black transition-colors mb-4 text-sm"
          >
            ← Guest List
          </button>
          <h1 className="text-2xl font-light mb-2">Guest Details</h1>
          <p className="text-gray-600">{eventInfo.name}</p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto p-6">
        {/* Guest Info Card */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-2xl font-light mb-2">{guest.name}</h2>
              {guest.instagram && (
                <a
                  href={`https://instagram.com/${guest.instagram.replace('@', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg text-blue-600 hover:text-blue-800 transition-colors mb-1 block"
                >
                  {guest.instagram}
                </a>
              )}
              <span
                className={`inline-block px-3 py-1 rounded-lg text-sm ${getStatusColor(guest.status)}`}
              >
                {guest.status.charAt(0).toUpperCase() + guest.status.slice(1)}
              </span>
              {guest.checkedIn && (
                <span className="ml-2 bg-black text-white px-3 py-1 rounded-lg text-sm">
                  Checked In
                </span>
              )}
            </div>
          </div>

          {/* Guest Details */}
          <div className="space-y-4">
            <div>
              <h4 className="text-sm text-gray-500 mb-1">Plus Ones</h4>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleUpdatePlusOnes(guest.plusOnes - 1)}
                  className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
                  disabled={guest.plusOnes <= 0}
                >
                  -
                </button>
                <span className="text-lg w-8 text-center">{guest.plusOnes}</span>
                <button
                  onClick={() => handleUpdatePlusOnes(guest.plusOnes + 1)}
                  className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            <div>
              <p className="text-sm text-gray-500">Submitted {guest.submittedAt}</p>
            </div>

            {guest.checkInTime && (
              <div>
                <p className="text-sm text-gray-500">Check-in Time {guest.checkInTime}</p>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        {guest.status === 'pending' && (
          <div className="flex gap-4 mb-6">
            <button
              onClick={handleApproveGuest}
              disabled={isApproving}
              className="flex-1 bg-black text-white py-3 rounded-full hover:bg-gray-900 transition-colors disabled:opacity-50"
            >
              {isApproving ? 'Approving...' : 'Approve Guest'}
            </button>
            <button
              onClick={handleDenyGuest}
              disabled={isDenying}
              className="flex-1 bg-white text-black border border-black py-3 rounded-full hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              {isDenying ? 'Denying...' : 'Deny Guest'}
            </button>
          </div>
        )}

        {guest.status === 'approved' && !guest.checkedIn && (
          <div className="mb-6">
            <button
              onClick={handleDenyGuest}
              disabled={isDenying}
              className="w-full bg-white text-black border border-gray-300 py-3 rounded-full hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              {isDenying ? 'Removing...' : 'Remove Approval'}
            </button>
          </div>
        )}

        {guest.status === 'denied' && (
          <div className="mb-6">
            <button
              onClick={handleApproveGuest}
              disabled={isApproving}
              className="w-full bg-black text-white py-3 rounded-full hover:bg-gray-900 transition-colors disabled:opacity-50"
            >
              {isApproving ? 'Approving...' : 'Approve Guest'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
