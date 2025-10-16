'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { SafeStorage } from '@/lib/utils/safeStorage';
import Toast, { useToast } from '@/components/ui/Toast';

interface EventInfo {
  id: string;
  name: string;
  date: string;
  currentCapacity: number;
  spotsUsed: number;
}

export default function RequestCapacityPage() {
  const [eventInfo, setEventInfo] = useState<EventInfo | null>(null);
  const [spotsRequested, setSpotsRequested] = useState<number>(10);
  const [reason, setReason] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const params = useParams();
  const { toast, showToast, hideToast } = useToast();

  useEffect(() => {
    const loadEventData = async () => {
      try {
        // Check authentication
        const isAuthenticated = SafeStorage.getItem('dj_authenticated');
        if (!isAuthenticated) {
          router.push('/dj/login');
          return;
        }

        // Mock data loading
        await new Promise(resolve => setTimeout(resolve, 800));

        setEventInfo({
          id: params.id as string,
          name: 'Saturday Night Sessions',
          date: 'Saturday, July 6, 2025',
          currentCapacity: 75,
          spotsUsed: 23,
        });

        setIsLoading(false);
      } catch (error) {
        console.error('Failed to load event data:', error);
        showToast('Failed to load event data. Please try again.', 'error');
        setIsLoading(false);
      }
    };

    loadEventData();
  }, [router, params.id]);

  const handleSubmitRequest = async () => {
    if (!eventInfo) return;

    if (spotsRequested <= 0) {
      showToast('Please request at least 1 additional spot', 'warning');
      return;
    }

    if (!reason.trim()) {
      showToast('Please provide a reason for your request', 'warning');
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call to submit capacity request
      await new Promise(resolve => setTimeout(resolve, 1500));

      showToast('Capacity request submitted successfully', 'success');

      // Redirect back to event management page after a brief delay
      setTimeout(() => {
        router.push(`/dj/events/${params.id}/manage`);
      }, 1500);
    } catch (error) {
      console.error('Failed to submit capacity request:', error);
      showToast('Failed to submit request. Please try again.', 'error');
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
        <p className="text-red-600">Event not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="max-w-2xl mx-auto">
          <button
            onClick={() => router.push(`/dj/events/${params.id}/manage`)}
            className="text-gray-600 hover:text-black transition-colors mb-4 text-sm"
          >
            ← Back to Event
          </button>
          <h1 className="text-2xl font-light mb-1">Request Additional Spots</h1>
          <p className="text-gray-600">{eventInfo.name}</p>
          <p className="text-sm text-gray-500">{eventInfo.date}</p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto p-6">
        {/* Current Capacity Info */}
        <div className="bg-gray-50 rounded-xl p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">Current Capacity</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600 mb-1">Current Limit</p>
              <p className="text-2xl font-light">{eventInfo.currentCapacity}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Currently Used</p>
              <p className="text-2xl font-light">{eventInfo.spotsUsed}</p>
            </div>
          </div>
          <div className="mt-4">
            <div className="bg-gray-200 rounded-full h-2">
              <div
                className="bg-black h-2 rounded-full transition-all"
                style={{ width: `${(eventInfo.spotsUsed / eventInfo.currentCapacity) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Request Form */}
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              How many additional spots do you need? <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              min="1"
              max="100"
              value={spotsRequested}
              onChange={e => setSpotsRequested(parseInt(e.target.value) || 0)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              placeholder="Enter number of spots"
            />
            {spotsRequested > 0 && (
              <p className="mt-2 text-sm text-gray-600">
                New capacity would be: <strong>{eventInfo.currentCapacity + spotsRequested}</strong>
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Reason for request <span className="text-red-500">*</span>
            </label>
            <textarea
              value={reason}
              onChange={e => setReason(e.target.value)}
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent resize-none"
              placeholder="Explain why you need additional capacity..."
            />
            <p className="mt-1 text-xs text-gray-500">
              This will be sent to the event manager for review
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <button
              onClick={() => router.push(`/dj/events/${params.id}/manage`)}
              disabled={isSubmitting}
              className="flex-1 bg-gray-100 text-black py-3 rounded-full hover:bg-gray-200 transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmitRequest}
              disabled={isSubmitting || !reason.trim() || spotsRequested <= 0}
              className="flex-1 bg-black text-white py-3 rounded-full hover:bg-gray-900 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Submitting Request...' : 'Submit Request'}
            </button>
          </div>
        </div>

        {/* Info Box */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-4">
          <h3 className="font-medium text-blue-900 mb-2">How it works</h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Your request will be sent to the event manager for review</li>
            <li>• You'll be notified once your request is approved or denied</li>
            <li>• If approved, your new capacity will take effect immediately</li>
          </ul>
        </div>
      </div>

      {/* Toast Notifications */}
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={hideToast}
      />
    </div>
  );
}
