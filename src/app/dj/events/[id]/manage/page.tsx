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
  const [activeTab, setActiveTab] = useState<'pending' | 'approved' | 'attended'>('pending');
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
    const matchesSearch = guest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         guest.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    switch (activeTab) {
      case 'pending':
        return guest.status === 'pending' && matchesSearch;
      case 'approved':
        return guest.status === 'approved' && matchesSearch;
      case 'attended':
        return guest.checkedIn && matchesSearch;
      default:
        return matchesSearch;
    }
  });

  const pendingCount = guests.filter(g => g.status === 'pending').length;
  const approvedCount = guests.filter(g => g.status === 'approved').length;
  const attendedCount = guests.filter(g => g.checkedIn).length;

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
        <div className="bg-gray-50 rounded-xl p-6 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold mb-1">Guest List Overview</h2>
              <p className="text-gray-600">
                {eventInfo.spotsUsed}/{eventInfo.totalCapacity} spots filled
              </p>
            </div>
            <div className="w-32">
              <div className="bg-gray-200 rounded-full h-3 mb-1">
                <div 
                  className="bg-black h-3 rounded-full transition-all duration-300"
                  style={{ width: `${(eventInfo.spotsUsed / eventInfo.totalCapacity) * 100}%` }}
                ></div>
              </div>
              <p className="text-xs text-gray-500 text-center">
                {Math.round((eventInfo.spotsUsed / eventInfo.totalCapacity) * 100)}% full
              </p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-1 mb-6 bg-gray-100 rounded-xl p-1">
          <button
            onClick={() => setActiveTab('pending')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === 'pending' 
                ? 'bg-white text-black shadow-sm' 
                : 'text-gray-600 hover:text-black'
            }`}
          >
            Pending ({pendingCount})
          </button>
          <button
            onClick={() => setActiveTab('approved')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === 'approved' 
                ? 'bg-white text-black shadow-sm' 
                : 'text-gray-600 hover:text-black'
            }`}
          >
            Approved ({approvedCount})
          </button>
          <button
            onClick={() => setActiveTab('attended')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === 'attended' 
                ? 'bg-white text-black shadow-sm' 
                : 'text-gray-600 hover:text-black'
            }`}
          >
            Attended ({attendedCount})
          </button>
        </div>

        {/* Search and Actions */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search guests by name or email..."
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-black transition-colors"
            />
          </div>
          
          {activeTab === 'pending' && pendingCount > 0 && (
            <button
              onClick={handleApproveAll}
              className="px-6 py-3 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700 transition-colors whitespace-nowrap"
            >
              Approve All Pending
            </button>
          )}
        </div>

        {/* Guest List */}
        <div className="space-y-4">
          {filteredGuests.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-4xl mb-4">👥</div>
              <h3 className="text-lg font-medium mb-2">No guests found</h3>
              <p className="text-gray-600">
                {searchQuery 
                  ? 'Try adjusting your search terms' 
                  : `No guests in the ${activeTab} category yet`
                }
              </p>
            </div>
          ) : (
            filteredGuests.map((guest) => (
              <div key={guest.id} className="bg-white border border-gray-200 rounded-xl p-6">
                <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold">{guest.name}</h3>
                      {guest.checkedIn && (
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-semibold">
                          Checked In
                        </span>
                      )}
                      {guest.status === 'approved' && !guest.checkedIn && (
                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-semibold">
                          Approved
                        </span>
                      )}
                      {guest.status === 'pending' && (
                        <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs font-semibold">
                          Pending
                        </span>
                      )}
                    </div>
                    
                    <div className="space-y-1 text-sm text-gray-600">
                      <p>{guest.email}</p>
                      <p>{guest.phone}</p>
                      {guest.instagram && <p>{guest.instagram}</p>}
                      <p>Submitted {guest.submittedAt}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    {/* Plus Ones Control */}
                    <div className="text-center">
                      <label className="text-xs text-gray-500 block mb-1">Plus ones</label>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleUpdatePlusOnes(guest.id, guest.plusOnes - 1)}
                          className="w-8 h-8 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center"
                        >
                          -
                        </button>
                        <span className="w-8 text-center font-medium">{guest.plusOnes}</span>
                        <button
                          onClick={() => handleUpdatePlusOnes(guest.id, guest.plusOnes + 1)}
                          className="w-8 h-8 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    
                    {/* Action Buttons */}
                    {guest.status === 'pending' && (
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleApproveGuest(guest.id)}
                          disabled={isApproving === guest.id}
                          className="px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors disabled:opacity-50 text-sm"
                        >
                          {isApproving === guest.id ? '...' : 'Approve'}
                        </button>
                        <button
                          onClick={() => handleDenyGuest(guest.id)}
                          className="px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors text-sm"
                        >
                          Deny
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Export Button */}
        <div className="text-center mt-8">
          <button className="px-6 py-3 bg-white text-black border-2 border-black rounded-xl font-medium hover:bg-gray-50 transition-colors">
            Export Guest List
          </button>
        </div>
      </div>
    </div>
  );
}