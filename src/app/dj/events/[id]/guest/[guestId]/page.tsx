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
  const [isLoading, setIsLoading] = useState(true);
  const [isApproving, setIsApproving] = useState(false);
  const [isDenying, setIsDenying] = useState(false);
  const router = useRouter();
  const params = useParams();

  useEffect(() => {
    // Check authentication
    const isAuthenticated = localStorage.getItem('dj_authenticated');
    if (!isAuthenticated) {
      router.push('/dj/login');
      return;
    }

    // Mock data - in real app, fetch from API using params.id and params.guestId
    setTimeout(() => {
      setEventInfo({
        id: params.id as string,
        name: 'Saturday Night Sessions',
        date: 'Saturday, July 6, 2025'
      });

      // Mock guest data based on guestId
      const mockGuests: Record<string, Guest> = {
        '1': {
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
        '2': {
          id: '2',
          name: 'Mike Chen',
          email: 'mike@example.com',
          phone: '+1 (555) 234-5678',
          plusOnes: 1,
          status: 'pending',
          checkedIn: false,
          submittedAt: '4 hours ago'
        },
        '3': {
          id: '3',
          name: 'Alex Rivera',
          email: 'alex@example.com',
          phone: '+1 (555) 345-6789',
          instagram: '@alexr',
          plusOnes: 0,
          status: 'approved',
          checkedIn: true,
          submittedAt: '1 day ago',
          checkInTime: '9:45 PM'
        },
        '4': {
          id: '4',
          name: 'Jamie Smith',
          email: 'jamie@example.com',
          phone: '+1 (555) 456-7890',
          plusOnes: 3,
          status: 'approved',
          checkedIn: false,
          submittedAt: '1 day ago'
        }
      };

      // Check for updated guest status from management page
      const storedGuests = localStorage.getItem('event_guests');
      let foundGuest = mockGuests[params.guestId as string];
      
      if (storedGuests && foundGuest) {
        const guestUpdates = JSON.parse(storedGuests);
        const guestUpdate = guestUpdates[params.guestId as string];
        if (guestUpdate) {
          foundGuest = { ...foundGuest, ...guestUpdate };
        }
      }
      
      setGuest(foundGuest || null);
      setIsLoading(false);
    }, 1000);
  }, [router, params.id, params.guestId]);

  const handleApproveGuest = async () => {
    if (!guest) return;
    
    setIsApproving(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setGuest(prev => {
        if (!prev) return null;
        const updatedGuest = { ...prev, status: 'approved' as const };
        
        // Save to localStorage for sync with management page
        const storedGuests = localStorage.getItem('event_guests');
        const guestUpdates = storedGuests ? JSON.parse(storedGuests) : {};
        guestUpdates[prev.id] = { status: 'approved' };
        localStorage.setItem('event_guests', JSON.stringify(guestUpdates));
        
        return updatedGuest;
      });
    } catch (error) {
      console.error('Failed to approve guest:', error);
    } finally {
      setIsApproving(false);
    }
  };

  const handleDenyGuest = async () => {
    if (!guest) return;
    
    setIsDenying(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setGuest(prev => {
        if (!prev) return null;
        const updatedGuest = { ...prev, status: 'denied' as const };
        
        // Save to localStorage for sync with management page
        const storedGuests = localStorage.getItem('event_guests');
        const guestUpdates = storedGuests ? JSON.parse(storedGuests) : {};
        guestUpdates[prev.id] = { status: 'denied' };
        localStorage.setItem('event_guests', JSON.stringify(guestUpdates));
        
        return updatedGuest;
      });
    } catch (error) {
      console.error('Failed to deny guest:', error);
    } finally {
      setIsDenying(false);
    }
  };

  const handleUpdatePlusOnes = (newPlusOnes: number) => {
    if (!guest) return;
    
    setGuest(prev => prev ? { ...prev, plusOnes: Math.max(0, newPlusOnes) } : null);
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
              <span className={`inline-block px-3 py-1 rounded-lg text-sm ${getStatusColor(guest.status)}`}>
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