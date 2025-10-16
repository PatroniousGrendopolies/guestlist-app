'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import QrScanner from 'qr-scanner';

interface Guest {
  id: string;
  name: string;
  status: 'regular' | 'vip' | 'banned';
  plus_ones: number;
  checked_in: boolean;
}

interface LastCheckInInfo {
  name: string;
  plusOnes: number;
  addedBy: string;
  time: string;
}

export default function QRScannerPage() {
  const [totalCheckedIn] = useState(47);
  const [lastCheckIn, setLastCheckIn] = useState<LastCheckInInfo>({
    name: 'Sarah Johnson',
    plusOnes: 2,
    addedBy: 'DJ Shadow',
    time: '9:45 PM',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showLastCheckInModal, setShowLastCheckInModal] = useState(false);
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const qrScannerRef = useRef<QrScanner | null>(null);

  useEffect(() => {
    // Check if doorperson is authenticated
    const isAuthenticated = localStorage.getItem('doorperson_authenticated');
    if (!isAuthenticated) {
      router.push('/doorperson/login');
      return;
    }

    // Check for dark mode preference
    const savedDarkMode = localStorage.getItem('doorperson_dark_mode');
    if (savedDarkMode === 'true') {
      setIsDarkMode(true);
    }

    // Start camera and QR scanner when component mounts
    startCamera();

    return () => {
      // Cleanup camera and QR scanner when component unmounts
      if (qrScannerRef.current) {
        qrScannerRef.current.destroy();
      }
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, [router]);

  const startCamera = async () => {
    try {
      if (!videoRef.current) {
        console.error('Video element not found');
        return;
      }

      // Create QR scanner instance
      qrScannerRef.current = new QrScanner(
        videoRef.current,
        result => handleQRCodeDetected(result.data),
        {
          preferredCamera: 'environment', // Use back camera on mobile
          highlightScanRegion: false, // We'll use our own scan overlay
          highlightCodeOutline: false,
          maxScansPerSecond: 5,
        }
      );

      // Start the scanner
      await qrScannerRef.current.start();
      setError('');
    } catch (err) {
      console.error('Error starting QR scanner:', err);
      setError('Camera access denied. Please enable camera permissions.');
    }
  };

  const handleManualSearch = () => {
    router.push('/doorperson/search');
  };

  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    localStorage.setItem('doorperson_dark_mode', newDarkMode.toString());
  };

  const handleLogout = () => {
    localStorage.removeItem('doorperson_authenticated');
    router.push('/doorperson/login');
  };

  const handleQRCodeDetected = async (qrData: string) => {
    if (isLoading) return;

    setIsLoading(true);

    try {
      // Parse the QR code data
      const guestData = JSON.parse(qrData);

      // Validate guest data structure
      if (!guestData.id || !guestData.name) {
        throw new Error('Invalid QR code format');
      }

      // Update last check-in info
      setLastCheckIn({
        name: guestData.name,
        plusOnes: guestData.plus_ones || 0,
        addedBy: guestData.addedBy || 'Scanner',
        time: new Date().toLocaleTimeString('en-US', {
          hour: 'numeric',
          minute: '2-digit',
          hour12: true,
        }),
      });

      // Navigate to check-in confirmation
      router.push(`/doorperson/checkin?guest=${encodeURIComponent(JSON.stringify(guestData))}`);
    } catch (error) {
      console.error('Error processing QR code:', error);
      setError('Invalid QR code. Please try again or use manual search.');
      setIsLoading(false);

      // Clear error after 3 seconds
      setTimeout(() => {
        setError('');
      }, 3000);
    }
  };

  // Fallback click handler for testing
  const handleVideoClick = async () => {
    if (isLoading) return;

    // This is just for testing - in production, only QR detection should work
    const mockGuest: Guest = {
      id: '123',
      name: 'Test Guest (Click)',
      status: 'vip',
      plus_ones: 2,
      checked_in: false,
    };

    handleQRCodeDetected(JSON.stringify(mockGuest));
  };

  return (
    <div
      className={`h-screen ${isDarkMode ? 'bg-black text-white' : 'bg-white text-black'} flex flex-col overflow-hidden`}
    >
      {/* Header */}
      <div
        className={`flex justify-between items-center p-4 border-b ${isDarkMode ? 'border-gray-800' : 'border-gray-200'}`}
      >
        <h1 className="text-xl font-light">Nightlist</h1>
        <button
          onClick={handleLogout}
          className={`${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-black'} transition-colors text-sm`}
        >
          Logout
        </button>
      </div>

      {/* Camera View */}
      <div className="flex-1 relative overflow-hidden min-h-0">
        {error ? (
          <div className="flex-1 flex items-center justify-center p-6">
            <div className="text-center">
              <div className="text-red-600 mb-4 text-4xl">📷</div>
              <p className="text-red-600 mb-4">{error}</p>
              <button
                onClick={() => {
                  setError('');
                  startCamera();
                }}
                className="bg-black text-white px-6 py-3 rounded-xl font-medium hover:bg-gray-900 transition-colors"
              >
                Retry Camera Access
              </button>
            </div>
          </div>
        ) : (
          <div className="relative w-full h-full">
            <video
              ref={videoRef}
              className="w-full h-full object-cover cursor-pointer"
              onClick={handleVideoClick}
            />

            {/* Scan Overlay */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-64 h-64 relative">
                {/* Corner indicators - black */}
                <div className="absolute top-0 left-0 w-12 h-12 border-t-4 border-l-4 border-black rounded-tl-xl"></div>
                <div className="absolute top-0 right-0 w-12 h-12 border-t-4 border-r-4 border-black rounded-tr-xl"></div>
                <div className="absolute bottom-0 left-0 w-12 h-12 border-b-4 border-l-4 border-black rounded-bl-xl"></div>
                <div className="absolute bottom-0 right-0 w-12 h-12 border-b-4 border-r-4 border-black rounded-br-xl"></div>
              </div>
            </div>

            {/* Loading overlay */}
            {isLoading && (
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
                  <p className="text-white">Scanning QR Code...</p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Instruction text below camera */}
      <div className="px-4 py-2">
        <p className={`text-center text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          {error
            ? 'Camera error - please retry'
            : isLoading
              ? 'Processing QR code...'
              : 'Point camera at guest QR code'}
        </p>
      </div>

      {/* Bottom Controls - Compact */}
      <div className="p-4 space-y-3">
        {/* Manual Search Button */}
        <button
          onClick={handleManualSearch}
          className={`w-full ${isDarkMode ? 'bg-gray-800 text-white hover:bg-gray-700' : 'bg-white text-black border-2 border-black hover:bg-gray-50'} py-3 rounded-xl font-medium transition-colors`}
        >
          Manual Search
        </button>

        {/* Stats - Compact boxes */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => setShowLastCheckInModal(true)}
            className={`${isDarkMode ? 'bg-gray-900 hover:bg-gray-800' : 'bg-gray-50 hover:bg-gray-100'} rounded-xl p-3 text-center transition-colors`}
          >
            <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} text-xs block`}>
              Last Check-in
            </span>
            <span className="text-sm font-medium mt-1 block truncate">
              {lastCheckIn.name} ({lastCheckIn.time})
            </span>
          </button>
          <div
            className={`${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'} rounded-xl p-3 text-center`}
          >
            <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} text-xs block`}>
              Total Tonight
            </span>
            <span className="font-semibold text-lg mt-1 block">{totalCheckedIn}</span>
          </div>
        </div>

        {/* Dark Mode Toggle - Smaller */}
        <div className="text-center">
          <button
            onClick={toggleDarkMode}
            className={`text-xs py-1 px-3 rounded-lg transition-colors ${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-black'}`}
          >
            {isDarkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
        </div>
      </div>

      {/* Last Check-in Modal */}
      {showLastCheckInModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div
            className={`${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'} rounded-xl p-6 max-w-sm w-full`}
          >
            <h3 className="text-xl font-medium mb-4">Last Check-in Details</h3>
            <div className="space-y-3">
              <div>
                <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} text-sm`}>
                  Name:
                </span>
                <p className="font-medium">{lastCheckIn.name}</p>
              </div>
              <div>
                <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} text-sm`}>
                  Plus Ones:
                </span>
                <p className="font-medium">{lastCheckIn.plusOnes}</p>
              </div>
              <div>
                <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} text-sm`}>
                  Added By:
                </span>
                <p className="font-medium">{lastCheckIn.addedBy}</p>
              </div>
              <div>
                <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} text-sm`}>
                  Check-in Time:
                </span>
                <p className="font-medium">{lastCheckIn.time}</p>
              </div>
            </div>
            <button
              onClick={() => setShowLastCheckInModal(false)}
              className="w-full mt-6 bg-black text-white py-3 rounded-xl font-medium hover:bg-gray-900 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
