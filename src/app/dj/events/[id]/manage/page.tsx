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
}

interface EventInfo {
  id: string;
  name: string;
  date: string;
  totalCapacity: number;
  spotsUsed: number;
}

export default function DJEventManagePage() {
  const [eventInfo, setEventInfo] = useState<EventInfo | null>(null);
  const [guests, setGuests] = useState<Guest[]>([]);
  const [activeTab, setActiveTab] = useState<'pending' | 'approved'>('pending');
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isApproving, setIsApproving] = useState<string | null>(null);
  const router = useRouter();
  const params = useParams();

  useEffect(() => {
    // Check authentication
    const isAuthenticated = localStorage.getItem('dj_authenticated');
    if (!isAuthenticated) {
      router.push('/dj/login');
      return;
    }

    // Mock data - in real app, fetch from API using params.id
    setTimeout(() => {
      setEventInfo({
        id: params.id as string,
        name: 'Saturday Night Sessions',
        date: 'Saturday, July 6th, 2025',
        totalCapacity: 75,
        spotsUsed: 23
      });

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
          submittedAt: '2 hours ago'
        },
        {
          id: '2',
          name: 'Mike Chen',
          email: 'mike@example.com',
          phone: '+1 (555) 234-5678',
          plusOnes: 1,
          status: 'pending',
          checkedIn: false,
          submittedAt: '4 hours ago'
        },
        {
          id: '3',
          name: 'Alex Rivera',
          email: 'alex@example.com',
          phone: '+1 (555) 345-6789',
          instagram: '@alexr',
          plusOnes: 0,
          status: 'approved',
          checkedIn: true,
          submittedAt: '1 day ago'
        },
        {
          id: '4',
          name: 'Jamie Smith',
          email: 'jamie@example.com',
          phone: '+1 (555) 456-7890',
          plusOnes: 3,
          status: 'approved',
          checkedIn: false,
          submittedAt: '1 day ago'
        }
      ]);

      setIsLoading(false);
    }, 1000);
  }, [router, params.id]);

  const handleApproveGuest = async (guestId: string) => {
    setIsApproving(guestId);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setGuests(prev => prev.map(guest =>
        guest.id === guestId ? { ...guest, status: 'approved' as const } : guest
      ));
    } catch (error) {
      console.error('Failed to approve guest:', error);
    } finally {
      setIsApproving(null);
    }
  };

  const handleDenyGuest = async (guestId: string) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setGuests(prev => prev.map(guest =>
        guest.id === guestId ? { ...guest, status: 'denied' as const } : guest
      ));
    } catch (error) {
      console.error('Failed to deny guest:', error);
    }
  };

  const handleApproveAll = async () => {
    const pendingGuests = filteredGuests.filter(guest => guest.status === 'pending');
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setGuests(prev => prev.map(guest =>
        guest.status === 'pending' ? { ...guest, status: 'approved' as const } : guest
      ));
    } catch (error) {
      console.error('Failed to approve all guests:', error);
    }
  };

  const handleUpdatePlusOnes = (guestId: string, newPlusOnes: number) => {
    setGuests(prev => prev.map(guest =>
      guest.id === guestId ? { ...guest, plusOnes: Math.max(0, newPlusOnes) } : guest
    ));
  };

  const filteredGuests = guests.filter(guest => {
    switch (activeTab) {
      case 'pending':
        return guest.status === 'pending';
      case 'approved':
        return guest.status === 'approved';
      default:
        return true;
    }
  });

  const pendingCount = guests.filter(g => g.status === 'pending').length;
  const approvedCount = guests.filter(g => g.status === 'approved').length;

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

  if (!eventInfo) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-red-600">Event not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-black text-white p-6">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => router.push('/dj/dashboard')}
            className="text-gray-400 hover:text-white transition-colors mb-4 text-sm"
          >
            ← Back to Dashboard
          </button>
          <h1 className="text-2xl font-light mb-2">{eventInfo.name}</h1>
          <p className="text-gray-300">{eventInfo.date}</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6">
        {/* Event Summary */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4">Guest List Overview</h2>
          <div className="relative">
            <div className="bg-gray-200 rounded-full h-3 relative">
              <div 
                className="bg-black h-3 rounded-full transition-all duration-300"
                style={{ width: `${(eventInfo.spotsUsed / eventInfo.totalCapacity) * 100}%` }}
              ></div>
              <span className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 bg-white px-1 text-sm font-semibold"
                style={{ left: `${(eventInfo.spotsUsed / eventInfo.totalCapacity) * 100}%` }}
              >
                {eventInfo.spotsUsed}
              </span>
              <span className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1 bg-white px-1 text-sm font-semibold">
                {eventInfo.totalCapacity}
              </span>
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={() => setActiveTab('pending')}
            className={`px-4 py-2 rounded-xl font-medium transition-colors ${
              activeTab === 'pending' 
                ? 'bg-black text-white' 
                : 'bg-gray-100 text-black hover:bg-gray-200'
            }`}
          >
            Pending ({pendingCount})
          </button>
          <button
            onClick={() => setActiveTab('approved')}
            className={`px-4 py-2 rounded-xl font-medium transition-colors ${
              activeTab === 'approved' 
                ? 'bg-black text-white' 
                : 'bg-gray-100 text-black hover:bg-gray-200'
            }`}
          >
            Approved ({approvedCount})
          </button>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <button
            onClick={() => router.push(`/dj/events/${params.id}/search`)}
            className="px-6 py-3 bg-gray-100 text-black rounded-xl font-medium hover:bg-gray-200 transition-colors"
          >
            Search Guests
          </button>
          
          {activeTab === 'pending' && pendingCount > 0 && (
            <button
              onClick={handleApproveAll}
              className="px-6 py-3 bg-black text-white rounded-xl font-medium hover:bg-gray-900 transition-colors whitespace-nowrap"
            >
              Approve All Pending
            </button>
          )}
        </div>

        {/* Guest List */}
        <div className="space-y-4">
          {filteredGuests.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium mb-2">No guests found</h3>
              <p className="text-gray-600">
                {`No guests in the ${activeTab} category yet`}
              </p>
            </div>
          ) : (
            filteredGuests.map((guest) => (
              <div
                key={guest.id}
                className="bg-white border border-gray-200 rounded-xl p-6"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 flex-1">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-semibold">{guest.name}</h3>
                        {guest.plusOnes > 0 && (
                          <span className="text-sm font-medium">+{guest.plusOnes}</span>
                        )}
                      </div>
                      {guest.instagram && (
                        <p className="text-sm text-gray-600">{guest.instagram}</p>
                      )}
                    </div>
                    
                    {/* Status Badge */}
                    {guest.checkedIn && (
                      <span className="bg-black text-white px-3 py-1 rounded-full text-xs font-semibold">
                        Checked In
                      </span>
                    )}
                    {guest.status === 'approved' && !guest.checkedIn && (
                      <span className="bg-black text-white px-3 py-1 rounded-full text-xs font-semibold">
                        Approved
                      </span>
                    )}
                    {guest.status === 'pending' && (
                      <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-xs font-semibold">
                        Pending
                      </span>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-3">
                    {/* Plus Ones Controls */}
                    {guest.status === 'pending' && (
                      <>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleUpdatePlusOnes(guest.id, guest.plusOnes - 1)}
                            className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                            disabled={guest.plusOnes <= 0}
                          >
                            <span className="text-lg leading-none">−</span>
                          </button>
                          <button
                            onClick={() => handleUpdatePlusOnes(guest.id, guest.plusOnes + 1)}
                            className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                          >
                            <span className="text-lg leading-none">+</span>
                          </button>
                        </div>
                        
                        {/* Action Buttons */}
                        <button
                          onClick={() => handleApproveGuest(guest.id)}
                          disabled={isApproving === guest.id}
                          className="px-6 py-2 bg-black text-white rounded-full font-medium hover:bg-gray-900 transition-colors disabled:opacity-50"
                        >
                          {isApproving === guest.id ? '...' : 'Approve'}
                        </button>
                        <button
                          onClick={() => handleDenyGuest(guest.id)}
                          className="px-6 py-2 bg-white text-black border border-black rounded-full font-medium hover:bg-gray-50 transition-colors"
                        >
                          Deny
                        </button>
                      </>
                    )}
                    
                    {/* View Details Button for non-pending */}
                    {guest.status !== 'pending' && (
                      <button
                        onClick={() => router.push(`/dj/events/${params.id}/guest/${guest.id}`)}
                        className="px-6 py-2 bg-gray-100 text-black rounded-full font-medium hover:bg-gray-200 transition-colors"
                      >
                        View Details
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}