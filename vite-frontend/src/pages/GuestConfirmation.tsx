import React from 'react';
import { useParams } from 'react-router-dom';
import QRGenerator from '../components/QRGenerator';
import { CheckIcon } from 'lucide-react';
const GuestConfirmation: React.FC = () => {
  const {
    guestId
  } = useParams<{
    guestId: string;
  }>();
  return <div className="flex flex-col min-h-screen bg-black text-white">
      <header className="bg-gray-900 p-4 text-center">
        <h1 className="text-xl font-bold">Nightclub Guest List</h1>
      </header>
      <div className="flex-1 p-4 flex flex-col items-center justify-center">
        <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md text-center">
          <div className="w-16 h-16 bg-green-700 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckIcon size={32} />
          </div>
          <h2 className="text-2xl font-bold mb-2">You're on the list!</h2>
          <p className="text-gray-300 mb-6">
            Show this QR code at the door for quick entry
          </p>
          <div className="mb-6">
            <QRGenerator value={guestId || ''} />
          </div>
          <div className="text-sm text-gray-400">
            <p>Event: Saturday Night Fever</p>
            <p>Date: July 15, 2023</p>
            <p>Venue: Datcha Nightclub</p>
          </div>
        </div>
      </div>
    </div>;
};
export default GuestConfirmation;