'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { MockInvitationService, InvitationRequest } from '@/lib/mock/invitationService';

interface EventInfo {
  id: string;
  name: string;
  date: string;
  venue: string;
}

interface PastGuest {
  id: string;
  name: string;
  instagram?: string;
  email: string;
  phone: string;
}

export default function CustomizeInvitationPage() {
  const [eventInfo, setEventInfo] = useState<EventInfo | null>(null);
  const [selectedGuests, setSelectedGuests] = useState<PastGuest[]>([]);
  const [messageTemplate, setMessageTemplate] = useState('');
  const [customMessage, setCustomMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const params = useParams();

  const CHARACTER_LIMIT = 160; // SMS character limit

  useEffect(() => {
    // Check authentication
    const isAuthenticated = localStorage.getItem('dj_authenticated');
    if (!isAuthenticated) {
      router.push('/dj/login');
      return;
    }

    // Get selected guests from session storage
    const selectedGuestIds = JSON.parse(sessionStorage.getItem('selectedPastGuests') || '[]');
    if (selectedGuestIds.length === 0) {
      router.push(`/dj/events/${params.id}/invite-past-guests`);
      return;
    }

    // Mock data - in real app, fetch from API
    setTimeout(() => {
      setEventInfo({
        id: params.id as string,
        name: 'Saturday Night Sessions',
        date: 'Saturday, July 6',
        venue: 'Datcha'
      });

      // Mock selected guests data (in real app, fetch based on selectedGuestIds)
      const mockGuests: PastGuest[] = [
        { id: '1', name: 'Emma Wilson', instagram: '@emmaw', email: 'emma@example.com', phone: '+1 (555) 111-2222' },
        { id: '2', name: 'James Miller', instagram: '@jmiller', email: 'james@example.com', phone: '+1 (555) 333-4444' },
        { id: '3', name: 'Sophia Davis', email: 'sophia@example.com', phone: '+1 (555) 555-6666' },
        { id: '4', name: 'Oliver Brown', instagram: '@oliverb', email: 'oliver@example.com', phone: '+1 (555) 777-8888' },
        { id: '5', name: 'Isabella Martinez', instagram: '@bellamart', email: 'isabella@example.com', phone: '+1 (555) 999-0000' }
      ].filter(g => selectedGuestIds.includes(g.id));

      setSelectedGuests(mockGuests);

      // Set default message template with shortened URL
      const longUrl = `https://nightlist.app/guest/signup?event=${params.id}&dj=shadow`;
      const shortUrl = MockInvitationService.shortenUrl(longUrl);
      const template = `Hey [Name], you're invited to DJ Shadow's guestlist on Saturday, July 6 at Datcha. Confirm here: ${shortUrl}`;
      setMessageTemplate(template);
      setCustomMessage(template);

      setIsLoading(false);
    }, 500);
  }, [router, params.id]);

  const handleSendInvitations = async () => {
    setIsSending(true);

    try {
      // Prepare invitation requests
      const invitationRequests: InvitationRequest[] = selectedGuests.map(guest => ({
        guestId: guest.id,
        guestName: guest.name,
        guestPhone: guest.phone,
        guestEmail: guest.email,
        eventId: eventInfo!.id,
        eventName: eventInfo!.name,
        eventDate: eventInfo!.date,
        eventVenue: eventInfo!.venue,
        message: MockInvitationService.personalizeMessage(customMessage, {
          Name: guest.name.split(' ')[0],
          EventName: eventInfo!.name,
          Date: eventInfo!.date,
          Venue: eventInfo!.venue
        }),
        djName: 'DJ Shadow' // In real app, get from auth
      }));

      // Send invitations with progress tracking
      let successCount = 0;
      await MockInvitationService.sendBulkInvitations(
        invitationRequests,
        (completed, total) => {
          // Could update UI with progress here
          console.log(`Sent ${completed}/${total} invitations`);
        }
      ).then(results => {
        successCount = results.filter(r => r.status === 'sent').length;
      });

      // Update event to mark that past guests have been invited
      // In real app, this would be an API call
      const events = JSON.parse(localStorage.getItem('dj_events') || '[]');
      const eventIndex = events.findIndex((e: any) => e.id === params.id);
      if (eventIndex !== -1) {
        events[eventIndex].hasInvitedPastGuests = true;
        localStorage.setItem('dj_events', JSON.stringify(events));
      }

      // Clear session storage
      sessionStorage.removeItem('selectedPastGuests');

      // Show success and redirect
      router.push(`/dj/events/${params.id}/invite-past-guests/success?count=${successCount}`);
    } catch (error) {
      console.error('Failed to send invitations:', error);
      setIsSending(false);
    }
  };

  const getPersonalizedPreview = () => {
    // Show preview with first guest's name
    if (selectedGuests.length > 0) {
      return customMessage.replace('[Name]', selectedGuests[0].name.split(' ')[0]);
    }
    return customMessage;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="p-6">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => router.push(`/dj/events/${params.id}/invite-past-guests`)}
            className="text-gray-600 hover:text-black transition-colors mb-4 text-sm"
          >
            ← Back
          </button>
          <h1 className="text-2xl font-light mb-1">Customize Your Message</h1>
          <p className="text-gray-600">
            Inviting {selectedGuests.length} guest{selectedGuests.length === 1 ? '' : 's'} to {eventInfo?.name}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Message Editor */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Your invitation message</label>
            <textarea
              value={customMessage}
              onChange={(e) => setCustomMessage(e.target.value)}
              maxLength={CHARACTER_LIMIT}
              className="w-full p-4 border border-gray-200 rounded-xl resize-none focus:outline-none focus:border-black transition-colors"
              rows={4}
              placeholder="Type your message..."
            />
            <div className="flex justify-end mt-2">
              <p className="text-xs text-gray-500">
                {customMessage.length}/{CHARACTER_LIMIT}
              </p>
            </div>
          </div>

          {/* Preview */}
          <div className="mb-6">
            <h3 className="text-sm font-medium mb-2">Preview</h3>
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-gray-700">{getPersonalizedPreview()}</p>
            </div>
          </div>

          {/* Selected Guests Summary */}
          <div className="mb-8">
            <h3 className="text-sm font-medium mb-2">Recipients</h3>
            <div className="bg-gray-50 rounded-xl p-4">
              <div className="flex flex-wrap gap-2">
                {selectedGuests.map((guest) => (
                  <span key={guest.id} className="bg-white px-3 py-1 rounded-full text-sm">
                    {guest.name}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Send Button */}
          <button
            onClick={handleSendInvitations}
            disabled={isSending || customMessage.trim().length === 0}
            className={`w-full py-4 rounded-xl font-medium transition-colors ${
              isSending || customMessage.trim().length === 0
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-black text-white hover:bg-gray-900'
            }`}
          >
            {isSending ? (
              <span className="flex items-center justify-center">
                <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></span>
                Sending invitations...
              </span>
            ) : (
              `Send ${selectedGuests.length} Invitation${selectedGuests.length === 1 ? '' : 's'}`
            )}
          </button>

          {/* Info Text */}
          <p className="text-xs text-gray-500 text-center mt-4">
            Invitations will be sent via SMS
          </p>
        </div>
      </div>
    </div>
  );
}