import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import GuestList from '../components/GuestList';
import AnalyticsChart from '../components/AnalyticsChart';
import { fetchData, guests, users } from '../utils/mockData';
import { Guest } from '../utils/types';
import { ListIcon, BarChartIcon } from 'lucide-react';
const ManagerDashboard: React.FC = () => {
  const [guestList, setGuestList] = useState<Guest[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'list' | 'analytics'>('list');
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
  // Generate analytics data
  const statusData = [{
    name: 'Pending',
    value: guestList.filter(g => g.status === 'pending').length,
    fill: '#EAB308'
  }, {
    name: 'Approved',
    value: guestList.filter(g => g.status === 'approved').length,
    fill: '#22C55E'
  }, {
    name: 'Denied',
    value: guestList.filter(g => g.status === 'denied').length,
    fill: '#EF4444'
  }, {
    name: 'Checked In',
    value: guestList.filter(g => g.status === 'checked-in').length,
    fill: '#3B82F6'
  }];
  const promoterData = users.filter(user => user.role === 'promoter' || user.role === 'dj').map(user => {
    const userGuests = guestList.filter(guest => guest.addedById === user.id);
    const checkedIn = userGuests.filter(g => g.status === 'checked-in').length;
    return {
      name: user.name,
      value: checkedIn,
      fill: '#8B5CF6'
    };
  });
  return <div className="flex flex-col min-h-screen bg-black text-white">
      <Header role="manager" userName="Mary Manager" onLogout={() => window.location.reload()} />
      <div className="flex bg-gray-900 border-b border-gray-800">
        <button className={`flex-1 py-3 px-4 flex items-center justify-center ${activeTab === 'list' ? 'border-b-2 border-purple-500' : ''}`} onClick={() => setActiveTab('list')}>
          <ListIcon size={18} className="mr-2" />
          Guest List
        </button>
        <button className={`flex-1 py-3 px-4 flex items-center justify-center ${activeTab === 'analytics' ? 'border-b-2 border-purple-500' : ''}`} onClick={() => setActiveTab('analytics')}>
          <BarChartIcon size={18} className="mr-2" />
          Analytics
        </button>
      </div>
      <div className="flex-1 p-4">
        {loading ? <div className="flex items-center justify-center h-full">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
          </div> : <>
            {activeTab === 'list' && <GuestList guests={guestList} onStatusChange={handleStatusChange} />}
            {activeTab === 'analytics' && <div>
                <div className="bg-gray-800 rounded-lg p-4 mb-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-gray-700 rounded-lg p-3 text-center">
                      <p className="text-sm text-gray-400">Total Guests</p>
                      <p className="text-2xl font-bold">{guestList.length}</p>
                    </div>
                    <div className="bg-gray-700 rounded-lg p-3 text-center">
                      <p className="text-sm text-gray-400">Checked In</p>
                      <p className="text-2xl font-bold">
                        {guestList.filter(g => g.status === 'checked-in').length}
                      </p>
                    </div>
                    <div className="bg-gray-700 rounded-lg p-3 text-center">
                      <p className="text-sm text-gray-400">Conversion Rate</p>
                      <p className="text-2xl font-bold">
                        {Math.round(guestList.filter(g => g.status === 'checked-in').length / guestList.length * 100)}
                        %
                      </p>
                    </div>
                    <div className="bg-gray-700 rounded-lg p-3 text-center">
                      <p className="text-sm text-gray-400">Additional Guests</p>
                      <p className="text-2xl font-bold">
                        {guestList.reduce((sum, guest) => sum + guest.additionalGuests, 0)}
                      </p>
                    </div>
                  </div>
                </div>
                <AnalyticsChart title="Guest Status" data={statusData} />
                <AnalyticsChart title="Check-ins by Promoter/DJ" data={promoterData} />
              </div>}
          </>}
      </div>
    </div>;
};
export default ManagerDashboard;