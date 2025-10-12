'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { SafeStorage } from '@/lib/utils/safeStorage';

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
  addedBy: string;
}

interface EventInfo {
  id: string;
  name: string;
  date: string;
  venue: string;
  capacity: number;
  spotsUsed: number;
}

export default function PromoterEventManagePage() {
  const [eventInfo, setEventInfo] = useState<EventInfo | null>(null);
  const [allGuests, setAllGuests] = useState<Guest[]>([]);
  const [activeTab, setActiveTab] = useState<'my-list' | 'complete-guestlist'>('my-list');
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'approved' | 'denied'>('all');
  const [personFilter, setPersonFilter] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(true);
  const [shareEventId, setShareEventId] = useState<string | null>(null);
  const router = useRouter();
  const params = useParams();

  useEffect(() => {
    const loadEventData = async () => {
      try {
        // Check authentication
        const isAuthenticated = SafeStorage.getItem('promoter_authenticated');
        if (!isAuthenticated) {
          router.push('/promoter/login');
          return;
        }

        // Mock data loading
        await new Promise(resolve => setTimeout(resolve, 1000));

        setEventInfo({
          id: params.id as string,
          name: 'Saturday Night Sessions',
          date: 'Sat Jul 6',
          venue: 'Datcha',
          capacity: 50,
          spotsUsed: 28
        });

        // Mock guest data - mix of promoter's guests and others
        setAllGuests([
          {
            id: '1',
            name: 'Sarah Johnson',
            email: 'sarah@example.com',
            phone: '+1 (555) 123-4567',
            instagram: '@sarahj',
            plusOnes: 2,
            status: 'approved',
            checkedIn: false,
            submittedAt: '2 hours ago',
            addedBy: 'Alex'
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
            addedBy: 'Alex'
          },
          {
            id: '3',
            name: 'Emma Wilson',
            email: 'emma@example.com',
            phone: '+1 (555) 345-6789',
            instagram: '@emmaw',
            plusOnes: 0,
            status: 'approved',
            checkedIn: true,
            submittedAt: '1 day ago',
            addedBy: 'DJ Marcus'
          },
          {
            id: '4',
            name: 'David Rodriguez',
            email: 'david@example.com',
            phone: '+1 (555) 456-7890',
            plusOnes: 3,
            status: 'pending',
            checkedIn: false,
            submittedAt: '6 hours ago',
            addedBy: 'Staff John'
          },
          {
            id: '5',
            name: 'Lisa Park',
            email: 'lisa@example.com',
            phone: '+1 (555) 567-8901',
            instagram: '@lisap',
            plusOnes: 1,
            status: 'approved',
            checkedIn: false,
            submittedAt: '8 hours ago',
            addedBy: 'Alex'
          }
        ]);

        setIsLoading(false);
      } catch (error) {
        console.error('Failed to load event data:', error);
        setIsLoading(false);
      }
    };

    loadEventData();
  }, [router, params.id]);

  const handleShareEvent = async () => {
    if (!eventInfo) return;

    const shareUrl = `https://nightlist.app/guest/signup?event=${eventInfo.id}&promoter=alex`;
    const shareData = {
      title: `Join me at ${eventInfo.name}`,
      text: `You're invited to ${eventInfo.name} on ${eventInfo.date}. Join the guest list!`,
      url: shareUrl
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        return;
      } catch (error) {
        if ((error as Error).name === 'AbortError') {
          return;
        }
      }
    }

    // Fallback to clipboard
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(shareUrl);
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = shareUrl;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }
      
      setShareEventId(eventInfo.id);
      setTimeout(() => setShareEventId(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleApproveGuest = (guestId: string) => {
    setAllGuests(prev => prev.map(guest =>
      guest.id === guestId ? { ...guest, status: 'approved' as const } : guest
    ));
  };

  const handleDenyGuest = (guestId: string) => {
    setAllGuests(prev => prev.map(guest =>
      guest.id === guestId ? { ...guest, status: 'denied' as const } : guest
    ));
  };

  const handleUpdatePlusOnes = (guestId: string, newPlusOnes: number) => {
    const validPlusOnes = Math.max(0, newPlusOnes);
    setAllGuests(prev => prev.map(guest =>
      guest.id === guestId ? { ...guest, plusOnes: validPlusOnes } : guest
    ));
  };

  // Filter guests based on active tab
  const myGuests = allGuests.filter(guest => guest.addedBy === 'Alex');
  const displayGuests = activeTab === 'my-list' ? myGuests : allGuests;

  // Apply status filter
  const statusFilteredGuests = statusFilter === 'all' 
    ? displayGuests 
    : displayGuests.filter(guest => guest.status === statusFilter);

  // Apply person filter (only for complete guestlist)
  const filteredGuests = activeTab === 'complete-guestlist' && personFilter !== 'all'
    ? statusFilteredGuests.filter(guest => guest.addedBy === personFilter)
    : statusFilteredGuests;

  // Get unique people for filtering
  const uniquePeople = Array.from(new Set(allGuests.map(g => g.addedBy)));
  const personCounts = uniquePeople.reduce((acc, person) => {
    acc[person] = allGuests.filter(g => g.addedBy === person).length;
    return acc;
  }, {} as Record<string, number>);

  // Calculate capacity usage
  const approvedGuests = allGuests.filter(g => g.status === 'approved');
  const totalSpotsUsed = approvedGuests.reduce((total, guest) => total + 1 + guest.plusOnes, 0);

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
        <p className="text-gray-600">Event not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="p-6">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => router.push('/promoter/dashboard')}
            className="text-gray-600 hover:text-black transition-colors mb-4 text-sm"
          >
            ← Dashboard
          </button>
          <h1 className="text-2xl font-light mb-1">{eventInfo.name}</h1>
          <p className="text-gray-600 mb-1">{eventInfo.date} at {eventInfo.venue}</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6">
        {/* Capacity Meter */}
        <div className="mb-6">
          <div className="relative">
            <div className="bg-gray-200 rounded-full h-4 relative overflow-hidden">
              <div 
                className="bg-black h-4 rounded-full transition-all duration-300 relative"
                style={{ width: `${(totalSpotsUsed / eventInfo.capacity) * 100}%` }}
              >
                <span className="absolute right-2 top-1/2 -translate-y-1/2 text-white text-[10px]">
                  {totalSpotsUsed}
                </span>
              </div>
              <span className="absolute right-2 top-1/2 -translate-y-1/2 text-black text-[10px]">
                {eventInfo.capacity}
              </span>
            </div>
            <div className="flex justify-between mt-2">
              <span className="text-xs text-gray-500">Approved</span>
              <span className="text-xs text-gray-500">Total capacity</span>
            </div>
          </div>
        </div>

        {/* Share Invite */}
        <div className="mb-6">
          <p className="text-sm text-gray-600 mb-2">Share invite link:</p>
          <div className="flex items-center gap-2">
            <div className="flex-1 relative">
              <input
                type="text"
                value={`https://nightlist.app/guest/signup?event=${eventInfo.id}&promoter=alex`}
                readOnly
                className="w-full bg-gray-100 rounded-full px-4 py-2 text-xs font-mono pr-4"
              />
              <div className="absolute right-1 top-1 bottom-1 w-8 bg-gradient-to-l from-gray-100 via-gray-100/90 to-transparent rounded-r-full pointer-events-none"></div>
            </div>
            <button
              onClick={handleShareEvent}
              className="px-3 py-1.5 bg-black text-white rounded-full hover:bg-gray-900 transition-colors text-xs"
            >
              {shareEventId === eventInfo.id ? 'Copied!' : 'Share Invite'}
            </button>
          </div>
        </div>

        {/* Request Additional Spots */}
        <div className="mb-6">
          <button
            onClick={() => router.push(`/promoter/events/${eventInfo.id}/capacity`)}
            className="w-full bg-gray-100 text-black py-2 rounded-full text-sm hover:bg-gray-200 transition-colors"
          >
            Request additional spots
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setActiveTab('my-list')}
            className={`px-4 py-2 rounded-full text-sm transition-colors ${
              activeTab === 'my-list'
                ? 'bg-black text-white'
                : 'bg-gray-100 text-black hover:bg-gray-200'
            }`}
          >
            My List ({myGuests.length})
          </button>
          <button
            onClick={() => setActiveTab('complete-guestlist')}
            className={`px-4 py-2 rounded-full text-sm transition-colors ${
              activeTab === 'complete-guestlist'
                ? 'bg-black text-white'
                : 'bg-gray-100 text-black hover:bg-gray-200'
            }`}
          >
            Complete Guestlist ({allGuests.length})
          </button>
        </div>

        {/* Filters */}
        <div className="mb-6">
          {/* Status Filter */}
          <div className="flex gap-2 mb-3">
            <button
              onClick={() => setStatusFilter('all')}
              className={`px-3 py-1 rounded-full text-xs transition-colors ${
                statusFilter === 'all'
                  ? 'bg-gray-600 text-white'
                  : 'bg-gray-100 text-black hover:bg-gray-200'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setStatusFilter('pending')}
              className={`px-3 py-1 rounded-full text-xs transition-colors ${
                statusFilter === 'pending'
                  ? 'bg-gray-600 text-white'
                  : 'bg-gray-100 text-black hover:bg-gray-200'
              }`}
            >
              Pending
            </button>
            <button
              onClick={() => setStatusFilter('approved')}
              className={`px-3 py-1 rounded-full text-xs transition-colors ${
                statusFilter === 'approved'
                  ? 'bg-gray-600 text-white'
                  : 'bg-gray-100 text-black hover:bg-gray-200'
              }`}
            >
              Approved
            </button>
            <button
              onClick={() => setStatusFilter('denied')}
              className={`px-3 py-1 rounded-full text-xs transition-colors ${
                statusFilter === 'denied'
                  ? 'bg-gray-600 text-white'
                  : 'bg-gray-100 text-black hover:bg-gray-200'
              }`}
            >
              Denied
            </button>
          </div>

          {/* Person Filter (only for complete guestlist) */}
          {activeTab === 'complete-guestlist' && (
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => setPersonFilter('all')}
                className={`px-3 py-1 rounded-full text-xs transition-colors ${
                  personFilter === 'all'
                    ? 'bg-gray-600 text-white'
                    : 'bg-gray-100 text-black hover:bg-gray-200'
                }`}
              >
                All People
              </button>
              {uniquePeople.map(person => (
                <button
                  key={person}
                  onClick={() => setPersonFilter(person)}
                  className={`px-3 py-1 rounded-full text-xs transition-colors border border-gray-300 ${
                    personFilter === person
                      ? 'bg-gray-600 text-white border-gray-600'
                      : 'bg-white text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {person} ({personCounts[person]})
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Guest List */}
        <div className="space-y-3">
          {filteredGuests.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-lg mb-2">No guests found</h3>
              <p className="text-gray-600">
                {activeTab === 'my-list' 
                  ? 'Your approved guests will appear here.'
                  : 'Guests from all contributors will appear here.'}
              </p>
            </div>
          ) : (
            filteredGuests.map((guest) => (
              <div
                key={guest.id}
                className="bg-white border border-gray-200 rounded-xl p-4"
              >
                <div className="flex items-start justify-between">
                  {/* Guest Info */}
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <h3 className="text-base">{guest.name}</h3>
                        {guest.plusOnes > 0 && (
                          <span className="text-base">+{guest.plusOnes}</span>
                        )}
                      </div>
                      
                      {/* +/- Controls in top right */}
                      {guest.status === 'pending' && guest.addedBy === 'Alex' && (
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => handleUpdatePlusOnes(guest.id, guest.plusOnes - 1)}
                            className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors text-sm"
                            disabled={guest.plusOnes <= 0}
                          >
                            <span className="leading-none">−</span>
                          </button>
                          <button
                            onClick={() => handleUpdatePlusOnes(guest.id, guest.plusOnes + 1)}
                            className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors text-sm"
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
                        className="text-sm text-blue-600 hover:text-blue-800 transition-colors block mb-2"
                      >
                        {guest.instagram}
                      </a>
                    )}

                    {/* Bottom row: Status tags and Added by */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {guest.checkedIn && (
                          <span className="bg-white text-black border border-gray-300 px-2 py-1 rounded-full text-xs">
                            Checked In
                          </span>
                        )}
                        {guest.status === 'approved' && !guest.checkedIn && (
                          <span className="bg-white text-black border border-gray-300 px-2 py-1 rounded-full text-xs">
                            Approved
                          </span>
                        )}
                        {guest.status === 'pending' && (
                          <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-xs">
                            Pending
                          </span>
                        )}
                        {guest.status === 'denied' && (
                          <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-xs">
                            Denied
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        {/* Added by tag */}
                        <span className="bg-white text-gray-600 border border-gray-300 px-2 py-1 rounded-full text-xs">
                          {guest.addedBy}
                        </span>

                        {/* Action buttons for pending guests that belong to promoter */}
                        {guest.status === 'pending' && guest.addedBy === 'Alex' && (
                          <div className="flex gap-1">
                            <button
                              onClick={() => handleApproveGuest(guest.id)}
                              className="px-2 py-1 bg-black text-white rounded-full text-xs hover:bg-gray-900 transition-colors"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => handleDenyGuest(guest.id)}
                              className="px-2 py-1 bg-white text-black border border-black rounded-full text-xs hover:bg-gray-50 transition-colors"
                            >
                              Deny
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
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