import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import QRScanner from '../components/QRScanner';
import GuestList from '../components/GuestList';
import { fetchData, guests } from '../utils/mockData';
import { Guest } from '../utils/types';
import { ScanLineIcon, ListIcon } from 'lucide-react';
const DoormanDashboard: React.FC = () => {
  const [guestList, setGuestList] = useState<Guest[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'scan' | 'list'>('scan');
  const [lastScannedGuest, setLastScannedGuest] = useState<Guest | null>(null);
  useEffect(() => {
    const loadGuests = async () => {
      try {
        const data = await fetchData(guests);
        setGuestList(data);
      } catch (error) {
        console.error('Error loading guest list:', error);
      } finally {
        setLoading(false);
      }
    };
    loadGuests();
  }, []);
  const handleScan = (guestId: string) => {
    const guest = guestList.find(g => g.id === guestId);
    if (guest) {
      setLastScannedGuest(guest);
      // Update guest status to checked-in
      handleStatusChange(guestId, 'checked-in');
    }
  };
  const handleStatusChange = (id: string, status: Guest['status']) => {
    setGuestList(prevList => prevList.map(guest => guest.id === id ? {
      ...guest,
      status
    } : guest));
  };
  return <div className="flex flex-col min-h-screen bg-black text-white">
      <Header role="doorman" userName="John Doorman" onLogout={() => window.location.reload()} />
      <div className="flex bg-gray-900 border-b border-gray-800">
        <button className={`flex-1 py-3 px-4 flex items-center justify-center ${activeTab === 'scan' ? 'border-b-2 border-purple-500' : ''}`} onClick={() => setActiveTab('scan')}>
          <ScanLineIcon size={18} className="mr-2" />
          Scan
        </button>
        <button className={`flex-1 py-3 px-4 flex items-center justify-center ${activeTab === 'list' ? 'border-b-2 border-purple-500' : ''}`} onClick={() => setActiveTab('list')}>
          <ListIcon size={18} className="mr-2" />
          Guest List
        </button>
      </div>
      <div className="flex-1 p-4">
        {loading ? <div className="flex items-center justify-center h-full">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
          </div> : <>
            {activeTab === 'scan' && <div>
                <QRScanner onScan={handleScan} />
                {lastScannedGuest && <div className={`mt-4 p-4 rounded-lg ${lastScannedGuest.status === 'approved' || lastScannedGuest.status === 'checked-in' ? 'bg-green-900 border-l-4 border-green-500' : 'bg-red-900 border-l-4 border-red-500'}`}>
                    <h3 className="text-lg font-medium mb-1">
                      {lastScannedGuest.status === 'approved' || lastScannedGuest.status === 'checked-in' ? '✓ Guest Approved' : '✗ Entry Denied'}
                    </h3>
                    <p className="text-xl font-bold mb-1">
                      {lastScannedGuest.name}
                    </p>
                    <p className="mb-1">
                      {lastScannedGuest.additionalGuests > 0 && `+${lastScannedGuest.additionalGuests} additional ${lastScannedGuest.additionalGuests === 1 ? 'guest' : 'guests'}`}
                    </p>
                    <p className="text-sm opacity-80">
                      Added by: {lastScannedGuest.addedBy}
                    </p>
                  </div>}
              </div>}
            {activeTab === 'list' && <GuestList guests={guestList} onStatusChange={handleStatusChange} />}
          </>}
      </div>
    </div>;
};
export default DoormanDashboard;