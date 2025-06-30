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
          <h2 className="text-lg font-semibold mb-4">{eventInfo.name}</h2>
          <div className="space-y-2 text-sm text-gray-600 mb-4">
            <p><strong>Date:</strong> {eventInfo.date}</p>
            <p><strong>Venue:</strong> {eventInfo.venue}</p>
            <p><strong>Spots Available:</strong> {eventInfo.totalSpots - eventInfo.spotsUsed} remaining</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex-1 bg-gray-200 rounded-full h-2">
              <div 
                className="bg-black h-2 rounded-full transition-all duration-300"
                style={{ width: `${(eventInfo.spotsUsed / eventInfo.totalSpots) * 100}%` }}
              ></div>
            </div>
            <span className="text-sm font-medium">
              {eventInfo.spotsUsed}/{eventInfo.totalSpots}
            </span>
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
              <p className={`text-sm ${copyMessage.includes('Failed') ? 'text-red-600' : 'text-green-600'}`}>
                {copyMessage}
              </p>
            )}
          </div>
          
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-4">
              Active signups: <strong>{eventInfo.spotsUsed}</strong>
            </p>
          </div>
        </div>

        {/* Share Options */}
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-4">Share Options</h3>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => handleShare('sms')}
              className="flex items-center justify-center gap-2 p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
            >
              <span className="text-2xl">💬</span>
              <span className="font-medium">SMS</span>
            </button>
            
            <button
              onClick={() => handleShare('whatsapp')}
              className="flex items-center justify-center gap-2 p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
            >
              <span className="text-2xl">📱</span>
              <span className="font-medium">WhatsApp</span>
            </button>
            
            <button
              onClick={() => handleShare('instagram')}
              className="flex items-center justify-center gap-2 p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
            >
              <span className="text-2xl">📸</span>
              <span className="font-medium">IG Story</span>
            </button>
            
            <button
              onClick={() => handleShare('native')}
              className="flex items-center justify-center gap-2 p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
            >
              <span className="text-2xl">📤</span>
              <span className="font-medium">More</span>
            </button>
          </div>
        </div>

        {/* QR Code */}
        <div className="text-center">
          <h3 className="text-lg font-medium mb-4">QR Code for Posting</h3>
          <div className="inline-block bg-white p-4 rounded-xl border border-gray-200 mb-4">
            <canvas
              ref={qrCanvasRef}
              className="block"
              style={{ maxWidth: '200px', height: 'auto' }}
            />
          </div>
          <div>
            <button
              onClick={downloadQRCode}
              className="px-6 py-3 bg-black text-white rounded-xl font-medium hover:bg-gray-900 transition-colors"
            >
              Download QR Code
            </button>
          </div>
          <p className="text-sm text-gray-500 mt-2">
            Perfect for flyers, social media posts, and print materials
          </p>
        </div>

        {/* Tips */}
        <div className="mt-8 bg-blue-50 rounded-xl p-6">
          <h4 className="font-medium mb-3">💡 Sharing Tips</h4>
          <ul className="space-y-2 text-sm text-gray-700">
            <li>• Share early to give people time to plan</li>
            <li>• Post on Instagram Stories with the QR code</li>
            <li>• Send direct messages to your top supporters</li>
            <li>• Include the event in your DJ bio links</li>
          </ul>
        </div>
      </div>
    </div>
  );
}