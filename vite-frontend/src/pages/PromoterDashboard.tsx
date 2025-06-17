import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import GuestList from '../components/GuestList';
import { fetchData, guests } from '../utils/mockData';
import { Guest } from '../utils/types';
import { LinkIcon, CopyIcon, CheckIcon } from 'lucide-react';
const PromoterDashboard: React.FC = () => {
  const [guestList, setGuestList] = useState<Guest[]>([]);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  // Filter guests to only show those added by this promoter
  const promoterId = 'u3'; // Paul Promoter's ID
  const filteredGuests = guestList.filter(guest => guest.addedById === promoterId);
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
  const handleStatusChange = (id: string, status: Guest['status']) => {
    setGuestList(prevList => prevList.map(guest => guest.id === id ? {
      ...guest,
      status
    } : guest));
  };
  const copyLink = () => {
    // In a real app, this would be a unique link for this promoter
    navigator.clipboard.writeText('https://nightclub-app.com/signup/paul-promoter');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  // Calculate statistics
  const totalGuests = filteredGuests.length;
  const checkedInGuests = filteredGuests.filter(g => g.status === 'checked-in').length;
  const conversionRate = totalGuests > 0 ? Math.round(checkedInGuests / totalGuests * 100) : 0;
  const additionalGuests = filteredGuests.reduce((sum, guest) => sum + guest.additionalGuests, 0);
  return <div className="flex flex-col min-h-screen bg-black text-white">
      <Header role="promoter" userName="Paul Promoter" onLogout={() => window.location.reload()} />
      <div className="p-4">
        <div className="bg-gray-800 rounded-lg p-4 mb-4">
          <h2 className="text-lg font-medium mb-3">Your Guest List Link</h2>
          <div className="flex">
            <div className="bg-gray-900 flex-1 py-2 px-3 rounded-l-md truncate">
              https://nightclub-app.com/signup/paul-promoter
            </div>
            <button onClick={copyLink} className="bg-purple-700 hover:bg-purple-600 py-2 px-3 rounded-r-md flex items-center">
              {copied ? <CheckIcon size={18} /> : <CopyIcon size={18} />}
            </button>
          </div>
          <p className="mt-2 text-sm text-gray-400">
            Share this link with your guests to add them to your list
          </p>
        </div>
        <div className="bg-gray-800 rounded-lg p-4 mb-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-gray-700 rounded-lg p-3 text-center">
              <p className="text-sm text-gray-400">Your Guests</p>
              <p className="text-2xl font-bold">{totalGuests}</p>
            </div>
            <div className="bg-gray-700 rounded-lg p-3 text-center">
              <p className="text-sm text-gray-400">Checked In</p>
              <p className="text-2xl font-bold">{checkedInGuests}</p>
            </div>
            <div className="bg-gray-700 rounded-lg p-3 text-center">
              <p className="text-sm text-gray-400">Conversion Rate</p>
              <p className="text-2xl font-bold">{conversionRate}%</p>
            </div>
            <div className="bg-gray-700 rounded-lg p-3 text-center">
              <p className="text-sm text-gray-400">Additional Guests</p>
              <p className="text-2xl font-bold">{additionalGuests}</p>
            </div>
          </div>
        </div>
        <h2 className="text-lg font-medium mb-3">Your Guest List</h2>
        {loading ? <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
          </div> : <GuestList guests={filteredGuests} onStatusChange={handleStatusChange} />}
      </div>
    </div>;
};
export default PromoterDashboard;