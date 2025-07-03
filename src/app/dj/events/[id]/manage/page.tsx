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
  otherDJs?: string[];
}

export default function DJEventManagePage() {
  const [eventInfo, setEventInfo] = useState<EventInfo | null>(null);
  const [guests, setGuests] = useState<Guest[]>([]);
  const [activeTab, setActiveTab] = useState<'pending' | 'approved' | 'denied'>('pending');
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isApproving, setIsApproving] = useState<string | null>(null);
  const [showApprovalConfirmation, setShowApprovalConfirmation] = useState(false);
  const [approvedGuestNames, setApprovedGuestNames] = useState<string[]>([]);
  const [isApprovingAll, setIsApprovingAll] = useState(false);
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
        date: 'Saturday, July 6, 2025',
        totalCapacity: 75,
        spotsUsed: 23,
        otherDJs: ['DJ Marcus', 'MC Groove']
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
      
      setGuests(prev => prev.map(guest => {
        if (guest.id === guestId) {
          const updatedGuest = { ...guest, status: 'approved' as const };
          
          // Save to localStorage for sync with detail page
          const storedGuests = localStorage.getItem('event_guests');
          const guestUpdates = storedGuests ? JSON.parse(storedGuests) : {};
          guestUpdates[guestId] = { status: 'approved' };
          localStorage.setItem('event_guests', JSON.stringify(guestUpdates));
          
          return updatedGuest;
        }
        return guest;
      }));
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
      
      setGuests(prev => prev.map(guest => {
        if (guest.id === guestId) {
          const updatedGuest = { ...guest, status: 'denied' as const };
          
          // Save to localStorage for sync with detail page
          const storedGuests = localStorage.getItem('event_guests');
          const guestUpdates = storedGuests ? JSON.parse(storedGuests) : {};
          guestUpdates[guestId] = { status: 'denied' };
          localStorage.setItem('event_guests', JSON.stringify(guestUpdates));
          
          return updatedGuest;
        }
        return guest;
      }));
    } catch (error) {
      console.error('Failed to deny guest:', error);
    }
  };

  const handleApproveAll = async () => {
    const pendingGuests = filteredGuests.filter(guest => guest.status === 'pending');
    
    if (pendingGuests.length === 0) return;
    
    setIsApprovingAll(true);
    setApprovedGuestNames(pendingGuests.map(guest => guest.name));
    setShowApprovalConfirmation(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setGuests(prev => {
        const storedGuests = localStorage.getItem('event_guests');
        const guestUpdates = storedGuests ? JSON.parse(storedGuests) : {};
        
        return prev.map(guest => {
          if (guest.status === 'pending') {
            const updatedGuest = { ...guest, status: 'approved' as const };
            guestUpdates[guest.id] = { status: 'approved' };
            return updatedGuest;
          }
          return guest;
        });
      });
      
      // Save all updates to localStorage
      const storedGuests = localStorage.getItem('event_guests');
      const guestUpdates = storedGuests ? JSON.parse(storedGuests) : {};
      pendingGuests.forEach(guest => {
        guestUpdates[guest.id] = { status: 'approved' };
      });
      localStorage.setItem('event_guests', JSON.stringify(guestUpdates));
      
      setIsApprovingAll(false);
      
      // Hide confirmation after 3 more seconds
      setTimeout(() => {
        setShowApprovalConfirmation(false);
        setApprovedGuestNames([]);
      }, 3000);
    } catch (error) {
      console.error('Failed to approve all guests:', error);
      setIsApprovingAll(false);
      setShowApprovalConfirmation(false);
      setApprovedGuestNames([]);
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
            filteredGuests.map((guest) => (
              <div
                key={guest.id}
                className="bg-white border border-gray-200 rounded-xl p-4"
              >
                <div className="flex items-center justify-between">
                  {/* Left side - Guest Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-lg">{guest.name}</h3>
                      {guest.plusOnes > 0 && (
                        <span className="text-lg">+{guest.plusOnes}</span>
                      )}
                      {/* Plus/Minus Controls */}
                      {guest.status === 'pending' && (
                        <div className="flex items-center gap-1 ml-2">
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
                    {guest.instagram && (
                      <a 
                        href={`https://instagram.com/${guest.instagram.replace('@', '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-blue-600 hover:text-blue-800 transition-colors mb-1 block"
                      >
                        {guest.instagram}
                      </a>
                    )}
                    {/* Status Badge */}
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
                  
                  {/* Right side - Action Buttons */}
                  <div className="flex flex-col gap-2">
                    {guest.status === 'pending' && (
                      <>
                        <button
                          onClick={() => handleApproveGuest(guest.id)}
                          disabled={isApproving === guest.id}
                          className="px-3 py-1 bg-black text-white rounded-full text-xs hover:bg-gray-900 transition-colors disabled:opacity-50"
                        >
                          {isApproving === guest.id ? '...' : 'Approve'}
                        </button>
                        <button
                          onClick={() => handleDenyGuest(guest.id)}
                          className="px-3 py-1 bg-white text-black border border-black rounded-full text-xs hover:bg-gray-50 transition-colors"
                        >
                          Deny
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
            ))
          )}
        </div>
      </div>
    </div>
  );
}