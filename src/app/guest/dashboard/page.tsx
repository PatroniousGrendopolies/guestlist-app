'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { GuestAuthService, GuestSession } from '@/lib/auth/guest-auth';
import { supabase } from '@/lib/supabase/client';

const guestAuth = new GuestAuthService();

export default function GuestDashboard() {
  const router = useRouter();
  const [guest, setGuest] = useState<GuestSession | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [plusOneCount, setPlusOneCount] = useState(0);
  const [qrCode, setQrCode] = useState<string | null>(null);
  const [shareSupported, setShareSupported] = useState(false);
  const [friendsList, setFriendsList] = useState<any[]>([]);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Check for guest session
    const sessionData = sessionStorage.getItem('guestSession');
    if (!sessionData) {
      router.push('/guest/auth');
      return;
    }

    try {
      const guestSession = JSON.parse(sessionData);
      setGuest(guestSession);
      // TODO: Load actual guest data from database
      setPlusOneCount(2); // Mock data
      setQrCode('mock-qr-code-data'); // Mock QR code
      
      // Check if Web Share API is supported
      setShareSupported(typeof navigator !== 'undefined' && 'share' in navigator);
      
      // Load friends list
      loadFriendsList(guestSession.guestId);
    } catch (err) {
      console.error('Invalid session data:', err);
      router.push('/guest/auth');
    } finally {
      setIsLoading(false);
    }
  }, [router]);

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

  const loadFriendsList = async (guestId: string) => {
    try {
      const { data, error } = await supabase
        .from('guests')
        .select('id, first_name, last_name, email, phone, created_at')
        .eq('invited_by_guest_id', guestId)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error loading friends list:', error);
      } else {
        setFriendsList(data || []);
      }
    } catch (err) {
      console.error('Failed to load friends list:', err);
    }
  };

  const handleSignOut = () => {
    sessionStorage.removeItem('guestSession');
    router.push('/guest/auth');
  };

  const handleUpdatePlusOne = async (change: number) => {
    const newCount = Math.max(0, Math.min(10, plusOneCount + change));
    setPlusOneCount(newCount);
    
    // Update in database immediately (auto-save)
    try {
      // TODO: Create a guest_list_entries table and update the plus_one count there
      // For now, we'll just update local state
      console.log(`Plus-one count updated to ${newCount} for guest ${guest?.guestId}`);
    } catch (error) {
      console.error('Failed to update plus-one count:', error);
      // Revert on error
      setPlusOneCount(plusOneCount);
    }
  };

  const handleShare = async () => {
    const shareData = {
      title: 'Join me at Summer Vibes!',
      text: `Hey! I'm on the guest list for DJ Shadow & MC Solar this Saturday. Want to come with me? Use my link to get on the list:`,
      url: `https://guestlist.app/join/${guest?.guestId}`
    };

    try {
      if (shareSupported) {
        // Use native share on mobile devices
        await navigator.share(shareData);
      } else {
        // Fallback: copy to clipboard on desktop
        await navigator.clipboard.writeText(`${shareData.text} ${shareData.url}`);
        alert('Link copied to clipboard!');
      }
    } catch (error) {
      // User cancelled share or error occurred
      console.log('Share cancelled or failed:', error);
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(`https://guestlist.app/join/${guest?.guestId}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
    } catch (err) {
      console.error('Failed to copy:', err);
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
              <h1 className="text-2xl font-medium">Welcome back</h1>
              <p className="text-sm text-gray-500">{guest.name}</p>
            </div>
            <button
              onClick={handleSignOut}
              className="btn btn-ghost btn-sm"
            >
              Sign Out
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container-sm py-4xl">
        <div className="flex flex-col gap-3xl">
          
          {/* Tonight's Event Card */}
          <div className="card">
            <div className="card-header">
              <h2 className="text-xl font-medium">Tonight's Event</h2>
              <p className="text-sm text-gray-500 mt-xs">Saturday, June 24th • 10:00 PM</p>
            </div>
            <div className="card-body">
              <div className="flex flex-col gap-xl">
                <div>
                  <h3 className="font-medium mb-sm">Summer Vibes</h3>
                  <p className="text-sm text-gray-600">
                    Join us for an unforgettable night of music and dancing. 
                    Dress code: Smart casual.
                  </p>
                </div>
                
                {/* QR Code Section */}
                <div className="text-center p-xl bg-gray-50 rounded-lg">
                  <div className="w-32 h-32 mx-auto mb-lg rounded-lg overflow-hidden">
                    <img 
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=128x128&data=GUEST-${guest?.guestId || 'DEMO'}-EVENT-SUMMER-VIBES-2025`}
                      alt="QR Code for entry"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="text-sm text-gray-600">
                    Show this QR code at the door for entry
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Plus One Management */}
          <div className="card">
            <div className="card-header">
              <h2 className="text-xl font-medium">Your Guest List</h2>
              <p className="text-sm text-gray-500 mt-xs">Bring friends to tonight's event</p>
            </div>
            <div className="card-body">
              <div className="flex flex-col gap-xl">
                <div className="flex items-center justify-between p-lg bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">Plus One Count</p>
                    <p className="text-sm text-gray-600">Additional guests you can bring</p>
                  </div>
                  <div className="flex items-center gap-md">
                    <button
                      onClick={() => handleUpdatePlusOne(-1)}
                      className="btn btn-ghost btn-sm w-10 h-10 p-0 flex items-center justify-center"
                      disabled={plusOneCount === 0}
                    >
                      −
                    </button>
                    <span className="text-2xl font-medium w-8 text-center">{plusOneCount}</span>
                    <button
                      onClick={() => handleUpdatePlusOne(1)}
                      className="btn btn-ghost btn-sm w-10 h-10 p-0 flex items-center justify-center"
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
                        value={`https://guestlist.app/join/${guest.guestId}`}
                        readOnly
                        className="input text-sm flex-1"
                      />
                      <button
                        onClick={handleCopyLink}
                        className={`btn btn-sm transition-all ${copied ? 'btn-primary' : 'btn-secondary'}`}
                      >
                        {copied ? '✓ Copied!' : 'Copy'}
                      </button>
                    </div>
                    <button
                      onClick={handleShare}
                      className="btn btn-primary w-full"
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
                    <h2 className="text-xl font-medium">Friends Coming Tonight</h2>
                    <p className="text-sm text-gray-500 mt-xs">{friendsList.length} friends on your list</p>
                  </div>
                  <button 
                    onClick={() => guest && loadFriendsList(guest.guestId)}
                    className="btn btn-ghost btn-sm"
                  >
                    ↻ Refresh
                  </button>
                </div>
              </div>
              <div className="card-body">
                <div className="space-y-md">
                  {friendsList.map((friend) => (
                    <div key={friend.id} className="flex items-center justify-between p-md bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium">{friend.first_name} {friend.last_name}</p>
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
              <h2 className="text-xl font-medium">Account Settings</h2>
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
                  <button className="btn btn-secondary btn-sm">
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
                <h3 className="font-medium mb-sm">Need Help?</h3>
                <p className="text-sm text-gray-600 mb-lg">
                  Contact our support team if you have any questions about tonight's event.
                </p>
                <button className="btn btn-ghost">
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