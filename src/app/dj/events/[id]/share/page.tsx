'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter, useParams } from 'next/navigation';

interface EventInfo {
  id: string;
  name: string;
  date: string;
  venue: string;
  spotsUsed: number;
  totalSpots: number;
}

export default function DJEventSharePage() {
  const [eventInfo, setEventInfo] = useState<EventInfo | null>(null);
  const [eventLink, setEventLink] = useState('');
  const [qrCodeData, setQrCodeData] = useState('');
  const [copyMessage, setCopyMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const qrCanvasRef = useRef<HTMLCanvasElement>(null);
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
        date: 'Saturday, July 6th, 2025',
        venue: 'Nightlist',
        spotsUsed: 23,
        totalSpots: 75
      };

      const mockEventLink = `https://nightlist.app/guest/signup?event=${params.id}&dj=shadow`;
      
      setEventInfo(mockEventInfo);
      setEventLink(mockEventLink);
      setQrCodeData(mockEventLink);
      setIsLoading(false);

      // Generate QR code (simplified version - in real app, use a QR library)
      generateSimpleQR(mockEventLink);
    }, 1000);
  }, [router, params.id]);

  const generateSimpleQR = (text: string) => {
    const canvas = qrCanvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Simple placeholder QR code visualization
    canvas.width = 200;
    canvas.height = 200;
    
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, 200, 200);
    
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(10, 10, 180, 180);
    
    ctx.fillStyle = '#000000';
    ctx.font = '12px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('QR CODE', 100, 100);
    ctx.fillText('(Generated)', 100, 120);
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(eventLink);
      setCopyMessage('Link copied to clipboard!');
      setTimeout(() => setCopyMessage(''), 3000);
    } catch (err) {
      setCopyMessage('Failed to copy link');
      setTimeout(() => setCopyMessage(''), 3000);
    }
  };

  const handleShare = async (platform: 'sms' | 'whatsapp' | 'instagram' | 'native') => {
    const shareText = `${eventInfo?.name} is happening on ${eventInfo?.date} at ${eventInfo?.venue}. Join the guest list: ${eventLink}`;
    
    switch (platform) {
      case 'sms':
        window.open(`sms:?body=${encodeURIComponent(shareText)}`);
        break;
      case 'whatsapp':
        window.open(`https://wa.me/?text=${encodeURIComponent(shareText)}`);
        break;
      case 'instagram':
        // Instagram sharing would typically require their API
        setCopyMessage('Copy the link to share on Instagram Stories');
        handleCopyLink();
        break;
      case 'native':
        if (navigator.share) {
          try {
            await navigator.share({
              title: eventInfo?.name,
              text: shareText,
              url: eventLink
            });
          } catch (err) {
            console.log('Sharing cancelled');
          }
        } else {
          handleCopyLink();
        }
        break;
    }
  };

  const downloadQRCode = () => {
    const canvas = qrCanvasRef.current;
    if (!canvas) return;

    const link = document.createElement('a');
    link.download = `${eventInfo?.name}-qr-code.png`;
    link.href = canvas.toDataURL();
    link.click();
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
      <div className="bg-black text-white p-6">
        <div className="max-w-2xl mx-auto">
          <button
            onClick={() => router.push('/dj/dashboard')}
            className="text-gray-400 hover:text-white transition-colors mb-4 text-sm"
          >
            ← Back to Dashboard
          </button>
          <h1 className="text-2xl font-light mb-2">Share Event Link</h1>
          <p className="text-gray-300">{eventInfo.name}</p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto p-6">
        {/* Event Details */}
        <div className="bg-gray-50 rounded-xl p-6 mb-6">
          <div className="space-y-2 text-sm text-gray-600 mb-4">
            <p>{eventInfo.date}</p>
            <p>{eventInfo.venue}</p>
          </div>
          
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-4">
              Active signups: <strong>{eventInfo.spotsUsed}</strong>
            </p>
          </div>
        </div>

        {/* Event Link */}
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-4">Event Link</h3>
          <div className="bg-gray-50 rounded-xl p-4 mb-4">
            <div className="flex items-center gap-2 mb-2">
              <input
                type="text"
                value={eventLink}
                readOnly
                className="flex-1 bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm font-mono"
              />
              <button
                onClick={handleCopyLink}
                className="px-4 py-2 bg-black text-white rounded-lg font-medium hover:bg-gray-900 transition-colors text-sm"
              >
                Copy
              </button>
            </div>
            {copyMessage && (
              <p className={`text-sm ${copyMessage.includes('Failed') ? 'text-red-600' : 'text-black'}`}>
                {copyMessage}
              </p>
            )}
          </div>
          
          <div className="text-center">
            <button
              onClick={() => handleShare('native')}
              className="w-full bg-black text-white py-4 rounded-xl font-medium text-lg hover:bg-gray-900 transition-colors"
            >
              Share Event
            </button>
          </div>
        </div>

        {/* Capacity Chart */}
        <div>
          <h3 className="text-lg font-medium mb-4">Event Capacity</h3>
          <div className="relative">
            <div className="bg-gray-200 rounded-full h-3 relative">
              <div 
                className="bg-black h-3 rounded-full transition-all duration-300"
                style={{ width: `${(eventInfo.spotsUsed / eventInfo.totalSpots) * 100}%` }}
              ></div>
              <span className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 bg-white px-1 text-sm font-semibold"
                style={{ left: `${(eventInfo.spotsUsed / eventInfo.totalSpots) * 100}%` }}
              >
                {eventInfo.spotsUsed}
              </span>
              <span className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1 bg-white px-1 text-sm font-semibold">
                {eventInfo.totalSpots}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}