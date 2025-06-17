import React, { useState } from 'react';
import { Guest } from '../utils/types';
import GuestCard from './GuestCard';
import { SearchIcon, FilterIcon } from 'lucide-react';
interface GuestListProps {
  guests: Guest[];
  onStatusChange?: (id: string, status: Guest['status']) => void;
  compact?: boolean;
}
const GuestList: React.FC<GuestListProps> = ({
  guests,
  onStatusChange,
  compact = false
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<Guest['status'] | 'all'>('all');
  const filteredGuests = guests.filter(guest => {
    const matchesSearch = guest.name.toLowerCase().includes(searchTerm.toLowerCase()) || guest.email.toLowerCase().includes(searchTerm.toLowerCase()) || guest.phone.includes(searchTerm);
    const matchesStatus = statusFilter === 'all' || guest.status === statusFilter;
    return matchesSearch && matchesStatus;
  });
  return <div className="w-full">
      <div className="mb-4">
        <div className="relative">
          <SearchIcon size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input type="text" placeholder="Search guests..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="w-full bg-gray-800 text-white rounded-lg py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-purple-500" />
        </div>
      </div>
      <div className="flex space-x-2 mb-4 overflow-x-auto py-1">
        <button onClick={() => setStatusFilter('all')} className={`px-3 py-1 rounded-full text-sm whitespace-nowrap ${statusFilter === 'all' ? 'bg-purple-700 text-white' : 'bg-gray-800 text-gray-300'}`}>
          All
        </button>
        <button onClick={() => setStatusFilter('pending')} className={`px-3 py-1 rounded-full text-sm whitespace-nowrap ${statusFilter === 'pending' ? 'bg-yellow-700 text-white' : 'bg-gray-800 text-gray-300'}`}>
          Pending
        </button>
        <button onClick={() => setStatusFilter('approved')} className={`px-3 py-1 rounded-full text-sm whitespace-nowrap ${statusFilter === 'approved' ? 'bg-green-700 text-white' : 'bg-gray-800 text-gray-300'}`}>
          Approved
        </button>
        <button onClick={() => setStatusFilter('denied')} className={`px-3 py-1 rounded-full text-sm whitespace-nowrap ${statusFilter === 'denied' ? 'bg-red-700 text-white' : 'bg-gray-800 text-gray-300'}`}>
          Denied
        </button>
        <button onClick={() => setStatusFilter('checked-in')} className={`px-3 py-1 rounded-full text-sm whitespace-nowrap ${statusFilter === 'checked-in' ? 'bg-blue-700 text-white' : 'bg-gray-800 text-gray-300'}`}>
          Checked In
        </button>
      </div>
      {filteredGuests.length === 0 ? <div className="text-center py-8 text-gray-400">
          No guests match your search criteria
        </div> : <div>
          {filteredGuests.map(guest => <GuestCard key={guest.id} guest={guest} onStatusChange={onStatusChange} compact={compact} />)}
        </div>}
    </div>;
};
export default GuestList;