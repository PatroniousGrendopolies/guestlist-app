'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { SafeStorage } from '@/lib/utils/safeStorage';

interface EventInfo {
  id: string;
  name: string;
  date: string;
  venue: string;
  currentCapacity: number;
  spotsUsed: number;
}

export default function PromoterCapacityRequestPage() {
  const [eventInfo, setEventInfo] = useState<EventInfo | null>(null);
  const [requestedSpots, setRequestedSpots] = useState(10);
  const [reason, setReason] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
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
          currentCapacity: 50,
          spotsUsed: 28
        });

        setIsLoading(false);
      } catch (error) {
        console.error('Failed to load event data:', error);
        setIsLoading(false);
      }
    };

    loadEventData();
  }, [router, params.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock success
      setShowSuccess(true);
      
      // Auto-redirect after 2 seconds
      setTimeout(() => {
        router.push(`/promoter/events/${eventInfo?.id}/manage`);
      }, 2000);
      
    } catch (error) {
      console.error('Failed to submit request:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

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

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-6">
          <div className="text-4xl mb-4">✓</div>
          <h1 className="text-xl mb-2">Request Submitted</h1>
          <p className="text-gray-600 mb-4">
            Your request for {requestedSpots} additional spots has been sent to the manager for approval.
          </p>
          <p className="text-sm text-gray-500">
            Redirecting to event management...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="p-6">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => router.push(`/promoter/events/${eventInfo.id}/manage`)}
            className="text-gray-600 hover:text-black transition-colors mb-4 text-sm"
          >
            ← Back to Event
          </button>
          <h1 className="text-2xl font-light mb-1">Request Additional Spots</h1>
          <p className="text-gray-600">{eventInfo.name} • {eventInfo.date}</p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto p-6">
        {/* Current Status */}
        <div className="bg-gray-50 rounded-xl p-6 mb-6">
          <h2 className="text-lg mb-4">Current Event Status</h2>

          <div className="relative">
            <div className="bg-gray-200 rounded-full h-4 relative overflow-hidden">
              <div
                className="bg-black h-4 rounded-full transition-all duration-300 relative"
                style={{ width: `${(eventInfo.spotsUsed / eventInfo.currentCapacity) * 100}%` }}
              >
                <span className="absolute right-2 top-1/2 -translate-y-1/2 text-white text-[10px]">
                  {eventInfo.spotsUsed}
                </span>
              </div>
              <span className="absolute right-2 top-1/2 -translate-y-1/2 text-black text-[10px]">
                {eventInfo.currentCapacity}
              </span>
            </div>
            <div className="flex justify-between mt-2">
              <span className="text-xs text-gray-500">Approved</span>
              <span className="text-xs text-gray-500">Available</span>
            </div>
          </div>
        </div>

        {/* Request Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="spots" className="block text-sm text-gray-600 mb-2">
              Additional spots requested
            </label>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setRequestedSpots(Math.max(1, requestedSpots - 5))}
                className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
              >
                -
              </button>
              <input
                id="spots"
                type="number"
                min="1"
                max="100"
                value={requestedSpots}
                onChange={(e) => setRequestedSpots(parseInt(e.target.value) || 1)}
                className="w-20 text-center px-3 py-2 border border-gray-200 rounded-full focus:border-black transition-colors"
              />
              <button
                type="button"
                onClick={() => setRequestedSpots(requestedSpots + 5)}
                className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
              >
                +
              </button>
              <span className="text-sm text-gray-600">spots</span>
            </div>
          </div>

          <div>
            <textarea
              id="reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              rows={4}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-black transition-colors resize-none"
              placeholder="Comments"
            />
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => router.push(`/promoter/events/${eventInfo.id}/manage`)}
              className="flex-1 bg-gray-100 text-black py-3 rounded-full text-sm hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-black text-white py-3 rounded-full text-sm hover:bg-gray-900 transition-colors disabled:bg-gray-400"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Request'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}