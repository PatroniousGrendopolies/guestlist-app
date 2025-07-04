'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';

interface Guest {
  id: string;
  name: string;
  instagram?: string;
  plusOnes: number;
  status: 'approved' | 'pending' | 'denied';
  checkedIn: boolean;
  submittedAt: string;
  addedBy: string;
  addedByType: 'dj' | 'staff' | 'promoter';
}

interface EventInfo {
  id: string;
  name: string;
  date: string;
}

export default function StaffEventManagePage() {
  const params = useParams();
  const router = useRouter();
  const [eventInfo, setEventInfo] = useState<EventInfo | null>(null);
  const [activeTab, setActiveTab] = useState<'my-list' | 'full-event'>('my-list');
  const [myGuests, setMyGuests] = useState<Guest[]>([]);
  const [allGuests, setAllGuests] = useState<Guest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterTab, setFilterTab] = useState<'all' | 'checked-in' | 'pending'>('all');
  const [roleFilter, setRoleFilter] = useState<'all' | 'staff' | 'dj' | 'promoter'>('all');

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setEventInfo({
        id: params.id as string,
        name: 'Saturday Night Sessions',
        date: 'Saturday, July 6, 2025'
      });

      // Mock staff member's own guests (auto-approved since staff don't need approval)
      setMyGuests([
        {
          id: '1',
          name: 'Sarah Johnson',
          instagram: '@sarahj',
          plusOnes: 2,
          status: 'approved',
          checkedIn: false,
          submittedAt: '2 hours ago',
          addedBy: 'Alex',
          addedByType: 'staff'
        },
        {
          id: '2',
          name: 'Mike Chen',
          plusOnes: 1,
          status: 'approved',
          checkedIn: true,
          submittedAt: '4 hours ago',
          addedBy: 'Alex',
          addedByType: 'staff'
        },
        {
          id: '3',
          name: 'Emma Wilson',
          instagram: '@emmaw',
          plusOnes: 0,
          status: 'approved',
          checkedIn: false,
          submittedAt: '1 day ago',
          addedBy: 'Alex',
          addedByType: 'staff'
        }
      ]);

      // Mock full event guest list (including other staff, DJs, promoters)
      setAllGuests([
        // Staff guests (including own)
        {
          id: '1',
          name: 'Sarah Johnson',
          instagram: '@sarahj',
          plusOnes: 2,
          status: 'approved',
          checkedIn: false,
          submittedAt: '2 hours ago',
          addedBy: 'Alex',
          addedByType: 'staff'
        },
        {
          id: '2',
          name: 'Mike Chen',
          plusOnes: 1,
          status: 'approved',
          checkedIn: true,
          submittedAt: '4 hours ago',
          addedBy: 'Alex',
          addedByType: 'staff'
        },
        {
          id: '3',
          name: 'Emma Wilson',
          instagram: '@emmaw',
          plusOnes: 0,
          status: 'approved',
          checkedIn: false,
          submittedAt: '1 day ago',
          addedBy: 'Alex',
          addedByType: 'staff'
        },
        // Other staff guests
        {
          id: '4',
          name: 'Lisa Rodriguez',
          instagram: '@lisar',
          plusOnes: 1,
          status: 'approved',
          checkedIn: true,
          submittedAt: '3 hours ago',
          addedBy: 'Jordan',
          addedByType: 'staff'
        },
        // DJ guests
        {
          id: '5',
          name: 'Marcus Torres',
          instagram: '@marcust',
          plusOnes: 3,
          status: 'approved',
          checkedIn: false,
          submittedAt: '1 hour ago',
          addedBy: 'DJ Marcus',
          addedByType: 'dj'
        },
        {
          id: '6',
          name: 'Isabella Garcia',
          plusOnes: 2,
          status: 'pending',
          checkedIn: false,
          submittedAt: '30 minutes ago',
          addedBy: 'DJ Marcus',
          addedByType: 'dj'
        },
        {
          id: '7',
          name: 'Oliver Kim',
          instagram: '@oliverk',
          plusOnes: 1,
          status: 'approved',
          checkedIn: true,
          submittedAt: '5 hours ago',
          addedBy: 'MC Groove',
          addedByType: 'dj'
        },
        // Promoter guests
        {
          id: '8',
          name: 'Sophia Lee',
          instagram: '@sophial',
          plusOnes: 4,
          status: 'approved',
          checkedIn: false,
          submittedAt: '6 hours ago',
          addedBy: 'Taylor',
          addedByType: 'promoter'
        }
      ]);

      setIsLoading(false);
    }, 1000);
  }, [params.id]);

  const handleUpdatePlusOnes = (guestId: string, newPlusOnes: number) => {
    // Update both my guests and all guests arrays
    setMyGuests(prev => prev.map(guest =>
      guest.id === guestId ? { ...guest, plusOnes: Math.max(0, newPlusOnes) } : guest
    ));
    setAllGuests(prev => prev.map(guest =>
      guest.id === guestId ? { ...guest, plusOnes: Math.max(0, newPlusOnes) } : guest
    ));
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

  const getAddedByColor = (type: string) => {
    switch (type) {
      case 'dj':
        return 'text-blue-600';
      case 'staff':
        return 'text-green-600';
      case 'promoter':
        return 'text-purple-600';
      default:
        return 'text-gray-600';
    }
  };

  const filterGuestsByTab = (guests: Guest[]) => {
    let filtered = guests;
    
    // Filter by status
    switch (filterTab) {
      case 'checked-in':
        filtered = filtered.filter(guest => guest.checkedIn);
        break;
      case 'pending':
        filtered = filtered.filter(guest => !guest.checkedIn && guest.status === 'approved');
        break;
      default:
        break;
    }
    
    // Filter by role
    if (roleFilter !== 'all') {
      filtered = filtered.filter(guest => guest.addedByType === roleFilter);
    }
    
    return filtered;
  };

  const myGuestCount = myGuests.length;
  const totalGuestCount = allGuests.length;
  const checkedInCount = allGuests.filter(g => g.checkedIn).length;
  const pendingCount = allGuests.filter(g => !g.checkedIn && g.status === 'approved').length;
  const staffCount = allGuests.filter(g => g.addedByType === 'staff').length;
  const djCount = allGuests.filter(g => g.addedByType === 'dj').length;
  const promoterCount = allGuests.filter(g => g.addedByType === 'promoter').length;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="p-6">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => router.push('/staff/dashboard')}
            className="text-gray-600 hover:text-black transition-colors mb-4 text-sm"
          >
            ← Dashboard
          </button>
          <h1 className="text-2xl font-light mb-2">Guest Lists</h1>
          <p className="text-gray-600">{eventInfo?.name}</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6">
        {/* Tab Navigation */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setActiveTab('my-list')}
            className={`px-4 py-2 rounded-lg text-sm transition-colors ${
              activeTab === 'my-list'
                ? 'bg-gray-600 text-white'
                : 'bg-gray-100 text-black hover:bg-gray-200'
            }`}
          >
            My List ({myGuestCount})
          </button>
          <button
            onClick={() => setActiveTab('full-event')}
            className={`px-4 py-2 rounded-lg text-sm transition-colors ${
              activeTab === 'full-event'
                ? 'bg-gray-600 text-white'
                : 'bg-gray-100 text-black hover:bg-gray-200'
            }`}
          >
            Complete Guestlist ({totalGuestCount})
          </button>
        </div>

        {/* My List Tab */}
        {activeTab === 'my-list' && (
          <div>
            {myGuests.length === 0 ? (
              <div className="bg-gray-50 rounded-xl p-8 text-center">
                <h3 className="text-lg mb-2">No guests yet</h3>
                <p className="text-gray-600">Share your invite link to start building your list</p>
              </div>
            ) : (
              <div className="space-y-3">
                {myGuests.map((guest) => (
                  <div key={guest.id} className="bg-white border border-gray-200 rounded-xl p-4">
                    <div className="flex items-start justify-between">
                      {/* Left side - Guest Info */}
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-lg">{guest.name}</h3>
                          {guest.plusOnes > 0 && (
                            <span className="text-lg">+{guest.plusOnes}</span>
                          )}
                        </div>
                        <div>
                          {guest.instagram && (
                            <a 
                              href={`https://instagram.com/${guest.instagram.replace('@', '')}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs text-blue-600 hover:text-blue-800 transition-colors block"
                            >
                              {guest.instagram}
                            </a>
                          )}
                        </div>
                      </div>
                      
                      {/* Top Right - Plus/Minus Controls */}
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleUpdatePlusOnes(guest.id, guest.plusOnes - 1)}
                          className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors text-sm"
                        >
                          −
                        </button>
                        <button
                          onClick={() => handleUpdatePlusOnes(guest.id, guest.plusOnes + 1)}
                          className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors text-sm"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    
                    {/* Bottom Right - Checked In Status */}
                    {guest.checkedIn && (
                      <div className="flex justify-end mt-2">
                        <span className="px-2 py-1 rounded-lg text-xs bg-green-100 text-green-800">
                          Checked in
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Full Event Tab */}
        {activeTab === 'full-event' && (
          <div>
            {/* Filter Controls */}
            <div className="flex gap-3 mb-4">
              {/* Status Dropdown */}
              <select
                value={filterTab}
                onChange={(e) => setFilterTab(e.target.value as 'all' | 'checked-in' | 'pending')}
                className="px-3 py-1 rounded-lg text-sm border border-gray-200 bg-white"
              >
                <option value="all">All ({totalGuestCount})</option>
                <option value="checked-in">Checked In ({checkedInCount})</option>
                <option value="pending">Pending Check-in ({pendingCount})</option>
              </select>
              
              {/* Role Filter Buttons */}
              <div className="flex gap-2">
                <button
                  onClick={() => setRoleFilter('all')}
                  className={`px-3 py-1 rounded-lg text-sm transition-colors ${
                    roleFilter === 'all'
                      ? 'bg-gray-600 text-white'
                      : 'bg-gray-100 text-black hover:bg-gray-200'
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setRoleFilter('staff')}
                  className={`px-3 py-1 rounded-lg text-sm transition-colors ${
                    roleFilter === 'staff'
                      ? 'bg-gray-600 text-white'
                      : 'bg-gray-100 text-black hover:bg-gray-200'
                  }`}
                >
                  Staff ({staffCount})
                </button>
                <button
                  onClick={() => setRoleFilter('dj')}
                  className={`px-3 py-1 rounded-lg text-sm transition-colors ${
                    roleFilter === 'dj'
                      ? 'bg-gray-600 text-white'
                      : 'bg-gray-100 text-black hover:bg-gray-200'
                  }`}
                >
                  DJ ({djCount})
                </button>
                <button
                  onClick={() => setRoleFilter('promoter')}
                  className={`px-3 py-1 rounded-lg text-sm transition-colors ${
                    roleFilter === 'promoter'
                      ? 'bg-gray-600 text-white'
                      : 'bg-gray-100 text-black hover:bg-gray-200'
                  }`}
                >
                  Promoter ({promoterCount})
                </button>
              </div>
            </div>

            <div className="space-y-3">
              {filterGuestsByTab(allGuests).map((guest) => (
                <div key={guest.id} className="bg-white border border-gray-200 rounded-xl p-4">
                  <div className="flex items-center justify-between">
                    {/* Left side - Guest Info */}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-lg">{guest.name}</h3>
                        {guest.plusOnes > 0 && (
                          <span className="text-lg">+{guest.plusOnes}</span>
                        )}
                        {/* Only show +/- controls for staff member's own guests */}
                        {guest.addedByType === 'staff' && guest.addedBy === 'Alex' && (
                          <div className="flex items-center gap-1 ml-2">
                            <button
                              onClick={() => handleUpdatePlusOnes(guest.id, guest.plusOnes - 1)}
                              className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors text-sm"
                            >
                              −
                            </button>
                            <button
                              onClick={() => handleUpdatePlusOnes(guest.id, guest.plusOnes + 1)}
                              className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors text-sm"
                            >
                              +
                            </button>
                          </div>
                        )}
                        {guest.checkedIn && (
                          <span className="px-2 py-1 rounded-lg text-xs bg-green-100 text-green-800 ml-2">
                            Checked in
                          </span>
                        )}
                      </div>
                      <div>
                        {guest.instagram && (
                          <a 
                            href={`https://instagram.com/${guest.instagram.replace('@', '')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-blue-600 hover:text-blue-800 transition-colors block"
                          >
                            {guest.instagram}
                          </a>
                        )}
                        <div className="flex items-center gap-2 text-xs">
                          <span className="px-2 py-1 rounded-full border border-gray-300 text-gray-600">
                            Added by: {guest.addedBy}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}