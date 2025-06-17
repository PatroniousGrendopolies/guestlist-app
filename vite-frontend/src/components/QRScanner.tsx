import React, { useState } from 'react';
import { ScanLineIcon, XIcon } from 'lucide-react';
// In a real implementation, we would use a library like react-qr-scanner
// This is a mock component for demonstration purposes
const QRScanner: React.FC<{
  onScan: (data: string) => void;
}> = ({
  onScan
}) => {
  const [scanning, setScanning] = useState(false);
  const startScanning = () => {
    setScanning(true);
    // Mock a successful scan after 2 seconds
    setTimeout(() => {
      // In a real app, this would be the actual QR code data
      onScan('g1');
      setScanning(false);
    }, 2000);
  };
  const stopScanning = () => {
    setScanning(false);
  };
  return <div className="w-full">
      <div className="bg-gray-800 rounded-lg p-4 mb-4 flex flex-col items-center">
        <div className={`w-full aspect-square max-w-md relative rounded-lg overflow-hidden mb-4 ${scanning ? 'border-2 border-purple-500' : 'bg-gray-700'}`}>
          {scanning ? <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-3/4 h-3/4 border-2 border-purple-500 rounded-lg relative">
                <div className="absolute top-0 left-0 w-full h-0.5 bg-purple-500 animate-scan"></div>
              </div>
              <style jsx>{`
                @keyframes scan {
                  0% {
                    transform: translateY(0);
                  }
                  50% {
                    transform: translateY(300px);
                  }
                  100% {
                    transform: translateY(0);
                  }
                }
                .animate-scan {
                  animation: scan 2s infinite;
                }
              `}</style>
            </div> : <div className="absolute inset-0 flex items-center justify-center text-gray-500">
              <ScanLineIcon size={64} />
            </div>}
        </div>
        {scanning ? <button onClick={stopScanning} className="bg-red-700 hover:bg-red-600 text-white py-3 px-6 rounded-lg flex items-center justify-center">
            <XIcon size={20} className="mr-2" /> Stop Scanning
          </button> : <button onClick={startScanning} className="bg-purple-700 hover:bg-purple-600 text-white py-3 px-6 rounded-lg flex items-center justify-center">
            <ScanLineIcon size={20} className="mr-2" /> Scan QR Code
          </button>}
      </div>
    </div>;
};
export default QRScanner;