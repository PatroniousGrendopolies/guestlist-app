'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { GuestAuthService, GuestSession } from '@/lib/auth/guest-auth';
import { supabase } from '@/lib/supabase/client';
import { useToast, ToastProvider } from '@/components/ui/ToastProvider';
import ErrorBoundary from '@/components/ui/ErrorBoundary';
import { SafeStorage } from '@/lib/utils/safeStorage';

const guestAuth = new GuestAuthService();

interface GuestListEntry {
  id: string;
  status: 'pending' | 'approved' | 'denied';
  plus_ones_requested: number;
  guest_list: {
    id: string;
    name: string;
    event: {
      id: string;
      name: string;
      date: string;
      day_of_week: string;
    };
  };
}

function GuestDashboardContent() {
  const router = useRouter();
  const { showToast } = useToast();
  const [guest, setGuest] = useState<GuestSession | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [plusOneCount, setPlusOneCount] = useState(0);
  const [qrCode, setQrCode] = useState<string | null>(null);
  const [shareSupported, setShareSupported] = useState(false);
  const [friendsList, setFriendsList] = useState<any[]>([]);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [guestListEntry, setGuestListEntry] = useState<GuestListEntry | null>(null);

  useEffect(() => {
    const initializeSession = async () => {
      try {
        // Check for guest session using SafeStorage
        const sessionData = SafeStorage.getItem('guestSession');
        if (!sessionData) {
          showToast('Please sign in to continue', 'error');
          router.push('/guest/auth');
          return;
        }

        const guestSession = JSON.parse(sessionData);

        // Validate session and fetch latest guest data
        const currentGuest = await guestAuth.getGuestSession(guestSession.guestId);
        if (!currentGuest) {
          showToast('Session expired. Please sign in again.', 'error');
          SafeStorage.removeItem('guestSession');
          router.push('/guest/auth');
          return;
        }

        setGuest(currentGuest);

        // Load guest's plus-one count from database
        await loadGuestData(currentGuest.guestId);

        // Load guest list entries (for QR code generation)
        await loadGuestListEntries(currentGuest.guestId);

        // Load friends list
        await loadFriendsList(currentGuest.guestId);

        // Check if Web Share API is supported
        setShareSupported(typeof navigator !== 'undefined' && 'share' in navigator);
      } catch (err) {
        console.error('Session initialization error:', err);
        setError('Failed to load dashboard data');
        showToast('Failed to load dashboard data', 'error');
        router.push('/guest/auth');
      } finally {
        setIsLoading(false);
      }
    };

    initializeSession();
  }, [router, showToast]);

  // Refresh friends list when page comes back into focus
  useEffect(() => {
    const handleFocus = () => {
      if (guest) {
        loadFriendsList(guest.guestId);
      }
    };

    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, [guest]);

  const loadGuestData = async (guestId: string) => {
    try {
      // Using singleton supabase client
      // Load guest's invite allowance from database
      const { data: guestData, error: guestError } = await supabase
        .from('guests')
        .select('id, monthly_invite_allowance')
        .eq('id', guestId)
        .single();

      if (guestError) {
        console.error('Error loading guest data:', guestError);
        setPlusOneCount(0); // Default to 0 if error
      } else {
        setPlusOneCount(guestData?.monthly_invite_allowance || 0);
      }
    } catch (err) {
      console.error('Failed to load guest data:', err);
      setPlusOneCount(0);
    }
  };

  const loadGuestListEntries = async (guestId: string) => {
    try {
      // Fetch approved guest list entries for upcoming events
      const { data: entries, error: entriesError } = await supabase
        .from('guest_list_entries')
        .select(`
          id,
          status,
          plus_ones_requested,
          guest_list:guest_lists!inner (
            id,
            name,
            event:events!inner (
              id,
              name,
              date,
              day_of_week
            )
          )
        `)
        .eq('guest_id', guestId)
        .eq('status', 'approved')
        .gte('guest_lists.events.date', new Date().toISOString())
        .order('guest_lists.events.date', { ascending: true })
        .limit(1);

      if (entriesError) {
        console.error('Error loading guest list entries:', entriesError);
        setGuestListEntry(null);
        return;
      }

      if (entries && entries.length > 0) {
        // Set the first upcoming event entry
        setGuestListEntry(entries[0] as unknown as GuestListEntry);
      } else {
        setGuestListEntry(null);
      }
    } catch (err) {
      console.error('Failed to load guest list entries:', err);
      setGuestListEntry(null);
    }
  };

  const loadFriendsList = async (guestId: string) => {
    try {
      // Guest referral feature not yet implemented in database schema
      // TODO: Add invited_by_guest_id column to guests table
      // For now, return empty list to avoid errors
      setFriendsList([]);
    } catch (err) {
      console.error('Failed to load friends list:', err);
      setFriendsList([]);
    }
  };

  const handleSignOut = () => {
    SafeStorage.removeItem('guestSession');
    showToast('Signed out successfully', 'success');
    router.push('/guest/auth');
  };

  const handleUpdatePlusOne = async (change: number) => {
    if (!guest) return;

    const newCount = Math.max(0, Math.min(10, plusOneCount + change));
    const previousCount = plusOneCount;
    setPlusOneCount(newCount);

    // Update in database immediately (auto-save)
    try {
      // Using singleton supabase client
      const { error } = await supabase
        .from('guests')
        .update({ monthly_invite_allowance: newCount })
        .eq('id', guest.guestId);

      if (error) {
        console.error('Failed to update invite allowance:', error);
        showToast('Failed to update plus-one count', 'error');
        // Revert on error
        setPlusOneCount(previousCount);
      } else {
        showToast(`Plus-one count updated to ${newCount}`, 'success');
      }
    } catch (error) {
      console.error('Failed to update invite allowance:', error);
      showToast('Failed to update plus-one count', 'error');
      // Revert on error
      setPlusOneCount(previousCount);
    }
  };

  const handleShare = async () => {
    if (!guest) return;

    const shareData = {
      title: 'Join me at Summer Vibes!',
      text: `Hey! I'm on the guest list for DJ Shadow & MC Solar this Saturday. Want to come with me? Use my link to get on the list:`,
      url: `https://guestlist.app/join/test?inviter=${guest.guestId}`,
    };

    try {
      if (shareSupported) {
        // Use native share on mobile devices
        await navigator.share(shareData);
        showToast('Share successful!', 'success');
      } else {
        // Fallback: copy to clipboard on desktop
        await navigator.clipboard.writeText(`${shareData.text} ${shareData.url}`);
        showToast('Message copied to clipboard!', 'success');
      }
    } catch (error) {
      // User cancelled share or error occurred
      if (error instanceof Error && error.name !== 'AbortError') {
        console.error('Share failed:', error);
        showToast('Share failed. Please try copying the link instead.', 'error');
      }
    }
  };

  const handleCopyLink = async () => {
    if (!guest) return;

    try {
      await navigator.clipboard.writeText(
        `https://guestlist.app/join/test?inviter=${guest.guestId}`
      );
      setCopied(true);
      showToast('Link copied to clipboard!', 'success');
      setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
    } catch (err) {
      console.error('Failed to copy:', err);
      showToast('Failed to copy link', 'error');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-lg">Loading...</div>
        </div>
      </div>
    );
  }

  if (!guest) {
    return null;
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="container-sm py-xl">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl">Welcome back</h1>
              <p className="text-sm text-gray-500">{guest.name}</p>
            </div>
            <button
              onClick={handleSignOut}
              className="bg-gray-100 text-black rounded-full py-2 px-4 text-sm hover:bg-gray-200 transition-colors"
            >
              Sign Out
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container-sm py-4xl">
        <div className="flex flex-col gap-3xl">
          {/* Upcoming Event Card */}
          <div className="card">
            <div className="card-header">
              <h2 className="text-xl">
                {guestListEntry ? 'Your Upcoming Event' : 'No Upcoming Events'}
              </h2>
              {guestListEntry && (
                <p className="text-sm text-gray-500 mt-xs">
                  {new Date(guestListEntry.guest_list.event.date).toLocaleDateString('en-US', {
                    weekday: 'long',
                    month: 'long',
                    day: 'numeric',
                  })}{' '}
                  • 10:00 PM
                </p>
              )}
            </div>
            <div className="card-body">
              {!guestListEntry ? (
                <div className="text-center py-xl">
                  <p className="text-gray-600 mb-lg">
                    You're not currently on any guest lists for upcoming events.
                  </p>
                  <p className="text-sm text-gray-500">
                    Wait for a DJ or promoter to add you to their list.
                  </p>
                </div>
              ) : (
                <div className="flex flex-col gap-xl">
                  <div>
                    <h3 className="mb-sm">{guestListEntry.guest_list.event.name}</h3>
                    <p className="text-sm text-gray-600">
                      Added by {guestListEntry.guest_list.name}
                    </p>
                    {guestListEntry.plus_ones_requested > 0 && (
                      <p className="text-sm text-gray-600 mt-xs">
                        Plus {guestListEntry.plus_ones_requested}
                      </p>
                    )}
                  </div>

                  {/* QR Code Section - Only for approved entries */}
                  {guestListEntry.status === 'approved' && (
                    <div className="text-center p-xl bg-gray-50 rounded-lg">
                      <div className="w-32 h-32 mx-auto mb-lg rounded-lg overflow-hidden">
                        <img
                          src={`https://api.qrserver.com/v1/create-qr-code/?size=256x256&data=${encodeURIComponent(
                            JSON.stringify({
                              entryId: guestListEntry.id,
                              guestId: guest.guestId,
                              name: guest.name,
                              event: guestListEntry.guest_list.event.name,
                              plusOnes: guestListEntry.plus_ones_requested,
                              status: guestListEntry.status,
                            })
                          )}`}
                          alt="QR Code for entry"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <p className="text-sm text-gray-600">
                        Show this QR code at the door for entry
                      </p>
                    </div>
                  )}

                  {guestListEntry.status === 'pending' && (
                    <div className="text-center p-xl bg-yellow-50 border border-yellow-200 rounded-lg">
                      <p className="text-yellow-800 font-medium mb-xs">⏳ Pending Approval</p>
                      <p className="text-sm text-gray-600">
                        Your entry is waiting for approval. Check back soon!
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Plus One Management */}
          <div className="card">
            <div className="card-header">
              <h2 className="text-xl">Your Guest List</h2>
              <p className="text-sm text-gray-500 mt-xs">Bring friends to tonight's event</p>
            </div>
            <div className="card-body">
              <div className="flex flex-col gap-xl">
                <div className="flex items-center justify-between p-lg bg-gray-50 rounded-lg">
                  <div>
                    <p className="">Plus One Count</p>
                    <p className="text-sm text-gray-600">Additional guests you can bring</p>
                  </div>
                  <div className="flex items-center gap-md">
                    <button
                      onClick={() => handleUpdatePlusOne(-1)}
                      className="bg-gray-100 text-black rounded-full w-10 h-10 p-0 flex items-center justify-center text-sm hover:bg-gray-200 transition-colors disabled:bg-gray-200 disabled:text-gray-400"
                      disabled={plusOneCount === 0}
                    >
                      −
                    </button>
                    <span className="text-2xl w-8 text-center">{plusOneCount}</span>
                    <button
                      onClick={() => handleUpdatePlusOne(1)}
                      className="bg-gray-100 text-black rounded-full w-10 h-10 p-0 flex items-center justify-center text-sm hover:bg-gray-200 transition-colors disabled:bg-gray-200 disabled:text-gray-400"
                      disabled={plusOneCount >= 10}
                    >
                      +
                    </button>
                  </div>
                </div>

                {plusOneCount > 0 && (
                  <div className="p-lg border border-gray-200 rounded-lg">
                    <p className="text-sm text-gray-600 mb-md">
                      Share this link with your friends to add them to your guest list:
                    </p>
                    <div className="flex gap-sm mb-lg">
                      <input
                        type="text"
                        value={`https://guestlist.app/join/test?inviter=${guest.guestId}`}
                        readOnly
                        className="px-4 py-2 border border-gray-200 rounded-xl focus:border-black transition-colors text-sm flex-1 bg-gray-100"
                      />
                      <button
                        onClick={handleCopyLink}
                        className={`rounded-full py-2 px-4 text-sm transition-colors ${copied ? 'bg-black text-white hover:bg-gray-900' : 'bg-gray-100 text-black hover:bg-gray-200'}`}
                      >
                        {copied ? '✓ Copied!' : 'Copy'}
                      </button>
                    </div>
                    <button
                      onClick={handleShare}
                      className="bg-black text-white rounded-full py-3 px-6 text-sm w-full hover:bg-gray-900 transition-colors"
                    >
                      {shareSupported ? '📱 Share via Text/Social' : '📋 Copy Message'}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Friends List */}
          {friendsList.length > 0 && (
            <div className="card">
              <div className="card-header">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl">Friends Coming Tonight</h2>
                    <p className="text-sm text-gray-500 mt-xs">
                      {friendsList.length} friends on your list
                    </p>
                  </div>
                  <button
                    onClick={() => guest && loadFriendsList(guest.guestId)}
                    className="bg-gray-100 text-black rounded-full py-2 px-4 text-sm hover:bg-gray-200 transition-colors"
                  >
                    ↻ Refresh
                  </button>
                </div>
              </div>
              <div className="card-body">
                <div className="space-y-md">
                  {friendsList.map(friend => (
                    <div
                      key={friend.id}
                      className="flex items-center justify-between p-md bg-gray-50 rounded-lg"
                    >
                      <div>
                        <p className="">
                          {friend.first_name} {friend.last_name}
                        </p>
                        <p className="text-sm text-gray-600">{friend.phone}</p>
                      </div>
                      <div className="text-sm text-gray-500">
                        {new Date(friend.created_at).toLocaleDateString()}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Account Info */}
          <div className="card">
            <div className="card-header">
              <h2 className="text-xl">Account Settings</h2>
            </div>
            <div className="card-body">
              <div className="flex flex-col gap-lg">
                <div className="flex justify-between items-center py-md border-b border-gray-100">
                  <span className="text-sm">Email</span>
                  <span className="text-sm text-gray-600">{guest.email}</span>
                </div>
                <div className="flex justify-between items-center py-md border-b border-gray-100">
                  <span className="text-sm">Email Verified</span>
                  <span className={`text-sm ${guest.verified ? 'text-black' : 'text-gray-400'}`}>
                    {guest.verified ? 'Verified' : 'Not verified'}
                  </span>
                </div>
                {!guest.verified && (
                  <button className="bg-gray-100 text-black rounded-full py-2 px-4 text-sm hover:bg-gray-200 transition-colors">
                    Resend Verification Email
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Support */}
          <div className="card">
            <div className="card-body">
              <div className="text-center">
                <h3 className="mb-sm">Need Help?</h3>
                <p className="text-sm text-gray-600 mb-lg">
                  Contact our support team if you have any questions about tonight's event.
                </p>
                <button className="bg-gray-100 text-black rounded-full py-3 px-6 text-sm hover:bg-gray-200 transition-colors">
                  Contact Support
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function GuestDashboard() {
  return (
    <ErrorBoundary>
      <ToastProvider>
        <GuestDashboardContent />
      </ToastProvider>
    </ErrorBoundary>
  );
}
