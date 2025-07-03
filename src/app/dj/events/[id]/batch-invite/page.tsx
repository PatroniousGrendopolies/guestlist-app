'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';

interface PastGuest {
  id: string;
  name: string;
  email: string;
  phone: string;
  instagram?: string;
  lastEvent: string;
  attended: boolean;
  totalVisits: number;
}

interface EventInfo {
  id: string;
  name: string;
  date: string;
}

export default function DJBatchInvitePage() {
  const [eventInfo, setEventInfo] = useState<EventInfo | null>(null);
  const [pastGuests, setPastGuests] = useState<PastGuest[]>([]);
  const [selectedGuests, setSelectedGuests] = useState<Set<string>>(new Set());
  const [filterBy, setFilterBy] = useState<'all' | 'attended' | 'no-show'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [inviteMessage, setInviteMessage] = useState('');
  const [sendVia, setSendVia] = useState<{ sms: boolean; email: boolean }>({ sms: true, email: true });
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const [sendResult, setSendResult] = useState('');
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
      const mockEventInfo = {
        id: params.id as string,
        name: 'Saturday Night Sessions',
        date: 'Saturday, July 6, 2025'
      };

      const mockPastGuests: PastGuest[] = [
        {
          id: '1',
          name: 'Sarah Johnson',
          email: 'sarah@example.com',
          phone: '+1 (555) 123-4567',
          instagram: '@sarahj',
          lastEvent: 'Last Weekend Bash',
          attended: true,
          totalVisits: 3
        },
        {
          id: '2',
          name: 'Mike Chen',
          email: 'mike@example.com',
          phone: '+1 (555) 234-5678',
          lastEvent: 'Summer Vibes',
          attended: false,
          totalVisits: 1
        },
        {
          id: '3',
          name: 'Alex Rivera',
          email: 'alex@example.com',
          phone: '+1 (555) 345-6789',
          instagram: '@alexr',
          lastEvent: 'Last Weekend Bash',
          attended: true,
          totalVisits: 5
        },
        {
          id: '4',
          name: 'Jamie Smith',
          email: 'jamie@example.com',
          phone: '+1 (555) 456-7890',
          lastEvent: 'Friday Night Flow',
          attended: true,
          totalVisits: 2
        },
        {
          id: '5',
          name: 'Chris Davis',
          email: 'chris@example.com',
          phone: '+1 (555) 567-8901',
          lastEvent: 'Summer Vibes',
          attended: false,
          totalVisits: 1
        }
      ];

      setEventInfo(mockEventInfo);
      setPastGuests(mockPastGuests);
      
      // Set default message
      setInviteMessage(`DJ Shadow is playing at Nightlist on ${mockEventInfo.date} and invited you to the event. Click here to join the guest list: [LINK]`);
      
      setIsLoading(false);
    }, 1000);
  }, [router, params.id]);

  const filteredGuests = pastGuests.filter(guest => {
    const matchesSearch = guest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         guest.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    switch (filterBy) {
      case 'attended':
        return guest.attended && matchesSearch;
      case 'no-show':
        return !guest.attended && matchesSearch;
      default:
        return matchesSearch;
    }
  });

  const handleSelectGuest = (guestId: string) => {
    const newSelected = new Set(selectedGuests);
    if (newSelected.has(guestId)) {
      newSelected.delete(guestId);
    } else {
      newSelected.add(guestId);
    }
    setSelectedGuests(newSelected);
  };

  const handleSelectAll = () => {
    const allGuestIds = filteredGuests.map(guest => guest.id);
    setSelectedGuests(new Set(allGuestIds));
  };

  const handleSelectAllAttended = () => {
    const attendedGuestIds = filteredGuests
      .filter(guest => guest.attended)
      .map(guest => guest.id);
    setSelectedGuests(new Set(attendedGuestIds));
  };

  const handleClearSelection = () => {
    setSelectedGuests(new Set());
  };

  const getCharacterCount = () => {
    return inviteMessage.length;
  };

  const handleSendInvites = async () => {
    if (selectedGuests.size === 0) return;

    setIsSending(true);
    setSendResult('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const selectedCount = selectedGuests.size;
      const methods = [];
      if (sendVia.sms) methods.push('SMS');
      if (sendVia.email) methods.push('email');
      
      setSendResult(`Successfully sent ${selectedCount} invitations via ${methods.join(' and ')}!`);
      setSelectedGuests(new Set());
      
    } catch (error) {
      setSendResult('Failed to send invitations. Please try again.');
    } finally {
      setIsSending(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
          <p className="text-gray-600">Loading past guests...</p>
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
          <h1 className="text-2xl font-light mb-2">Invite Past Guests</h1>
          <p className="text-gray-300">{eventInfo.name} • {eventInfo.date}</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6">
        {/* Filters and Search */}
        <div className="flex flex-col lg:flex-row gap-4 mb-6">
          <div className="flex-1">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search guests by name or email..."
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-black transition-colors"
            />
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={() => setFilterBy('all')}
              className={`px-4 py-3 rounded-xl font-medium transition-colors ${
                filterBy === 'all' 
                  ? 'bg-black text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilterBy('attended')}
              className={`px-4 py-3 rounded-xl font-medium transition-colors ${
                filterBy === 'attended' 
                  ? 'bg-black text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Attended
            </button>
            <button
              onClick={() => setFilterBy('no-show')}
              className={`px-4 py-3 rounded-xl font-medium transition-colors ${
                filterBy === 'no-show' 
                  ? 'bg-black text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              No-Show
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3 mb-6">
          <button
            onClick={handleSelectAll}
            className="px-4 py-2 bg-gray-100 text-black rounded-lg font-medium hover:bg-gray-200 transition-colors"
          >
            Select All ({filteredGuests.length})
          </button>
          <button
            onClick={handleSelectAllAttended}
            className="px-4 py-2 bg-green-100 text-green-800 rounded-lg font-medium hover:bg-green-200 transition-colors"
          >
            Select All Attended ({filteredGuests.filter(g => g.attended).length})
          </button>
          <button
            onClick={handleClearSelection}
            className="px-4 py-2 bg-red-100 text-red-800 rounded-lg font-medium hover:bg-red-200 transition-colors"
          >
            Clear Selection
          </button>
        </div>

        {/* Guest List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8">
          {filteredGuests.map((guest) => (
            <div
              key={guest.id}
              className={`border-2 rounded-xl p-4 cursor-pointer transition-all ${
                selectedGuests.has(guest.id)
                  ? 'border-black bg-black text-white'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => handleSelectGuest(guest.id)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold">{guest.name}</h3>
                    {guest.attended ? (
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${
                        selectedGuests.has(guest.id)
                          ? 'bg-green-800 text-green-200'
                          : 'bg-green-100 text-green-800'
                      }`}>
                        Attended
                      </span>
                    ) : (
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${
                        selectedGuests.has(guest.id)
                          ? 'bg-red-800 text-red-200'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        No-Show
                      </span>
                    )}
                  </div>
                  
                  <div className={`space-y-1 text-sm ${
                    selectedGuests.has(guest.id) ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    <p>{guest.email}</p>
                    {guest.instagram && <p>{guest.instagram}</p>}
                    <p>Last event: {guest.lastEvent}</p>
                    <p>Total visits: {guest.totalVisits}</p>
                  </div>
                </div>
                
                <div className={`w-6 h-6 rounded border-2 flex items-center justify-center ${
                  selectedGuests.has(guest.id)
                    ? 'border-white bg-white'
                    : 'border-gray-300'
                }`}>
                  {selectedGuests.has(guest.id) && (
                    <svg className="w-4 h-4 text-black" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredGuests.length === 0 && (
          <div className="text-center py-12">
            <div className="text-4xl mb-4">👥</div>
            <h3 className="text-lg font-medium mb-2">No guests found</h3>
            <p className="text-gray-600">
              {searchQuery 
                ? 'Try adjusting your search terms' 
                : 'No past guests available for invitation'
              }
            </p>
          </div>
        )}

        {/* Invite Composer */}
        {selectedGuests.size > 0 && (
          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="text-lg font-medium mb-4">Compose Invitation</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  value={inviteMessage}
                  onChange={(e) => setInviteMessage(e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-black transition-colors resize-none"
                  placeholder="Write your invitation message..."
                />
                <p className="text-sm text-gray-500 mt-1">
                  Characters: {getCharacterCount()} {getCharacterCount() > 160 && '(SMS may be split)'}
                </p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Send via
                </label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={sendVia.sms}
                      onChange={(e) => setSendVia(prev => ({ ...prev, sms: e.target.checked }))}
                      className="w-4 h-4 accent-black"
                    />
                    <span>SMS</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={sendVia.email}
                      onChange={(e) => setSendVia(prev => ({ ...prev, email: e.target.checked }))}
                      className="w-4 h-4 accent-black"
                    />
                    <span>Email</span>
                  </label>
                </div>
              </div>

              {sendResult && (
                <div className={`p-3 rounded-xl ${
                  sendResult.includes('Failed') 
                    ? 'bg-red-50 text-red-700 border border-red-200' 
                    : 'bg-green-50 text-green-700 border border-green-200'
                }`}>
                  {sendResult}
                </div>
              )}
              
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleSendInvites}
                  disabled={isSending || selectedGuests.size === 0 || (!sendVia.sms && !sendVia.email)}
                  className="flex-1 bg-black text-white py-3 rounded-xl font-medium hover:bg-gray-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSending ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      Sending...
                    </div>
                  ) : (
                    `Send Invites (${selectedGuests.size})`
                  )}
                </button>
                
                <button
                  className="px-6 py-3 bg-white text-black border-2 border-black rounded-xl font-medium hover:bg-gray-50 transition-colors"
                >
                  Preview
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}