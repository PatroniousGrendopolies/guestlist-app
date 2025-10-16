'use client';

export default function TestQRPage() {
  // Test guest data that will be encoded in the QR code
  const testGuest = {
    id: '123',
    name: 'Test Guest',
    status: 'vip',
    plus_ones: 2,
    addedBy: 'QR Test',
  };

  // Generate QR code URL using the API
  const qrData = JSON.stringify(testGuest);
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(qrData)}`;

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6">
      <h1 className="text-2xl font-light mb-2">Test QR Code</h1>
      <p className="text-gray-600 mb-8">Scan this with the Nightlist scanner</p>

      <div className="bg-white p-4 rounded-xl shadow-lg">
        <img src={qrUrl} alt="Test QR Code" className="w-72 h-72" />
      </div>

      <div className="mt-8 text-center">
        <p className="text-sm text-gray-600 mb-2">Encoded data:</p>
        <code className="bg-gray-100 px-3 py-1 rounded text-xs">
          {JSON.stringify(testGuest, null, 2)}
        </code>
      </div>

      <div className="mt-8 text-center max-w-md">
        <p className="text-sm text-gray-500">
          Take a photo of this QR code with your phone and show it to the scanner camera to test the
          QR scanning functionality.
        </p>
      </div>
    </div>
  );
}
