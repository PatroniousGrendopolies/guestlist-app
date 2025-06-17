import React from 'react';
import { Guest } from '../utils/types';
import { CheckIcon, XIcon, ClockIcon, UserPlusIcon } from 'lucide-react';
interface GuestCardProps {
  guest: Guest;
  onStatusChange?: (id: string, status: Guest['status']) => void;
  compact?: boolean;
}
const GuestCard: React.FC<GuestCardProps> = ({
  guest,
  onStatusChange,
  compact = false
}) => {
  const getStatusColor = (status: Guest['status']) => {
    switch (status) {
      case 'approved':
        return 'bg-green-900 text-green-300';
      case 'denied':
        return 'bg-red-900 text-red-300';
      case 'checked-in':
        return 'bg-blue-900 text-blue-300';
      default:
        return 'bg-yellow-900 text-yellow-300';
    }
  };
  const getStatusIcon = (status: Guest['status']) => {
    switch (status) {
      case 'approved':
        return <CheckIcon size={16} />;
      case 'denied':
        return <XIcon size={16} />;
      case 'checked-in':
        return <CheckIcon size={16} />;
      default:
        return <ClockIcon size={16} />;
    }
  };
  if (compact) {
    return <div className="flex items-center justify-between bg-gray-800 p-3 rounded-lg mb-2">
        <div>
          <h3 className="font-medium">{guest.name}</h3>
          <p className="text-xs text-gray-400">Added by: {guest.addedBy}</p>
        </div>
        <div className="flex items-center">
          {guest.additionalGuests > 0 && <span className="flex items-center mr-3 text-sm">
              <UserPlusIcon size={14} className="mr-1" />
              {guest.additionalGuests}
            </span>}
          <span className={`flex items-center px-2 py-1 rounded-full text-xs ${getStatusColor(guest.status)}`}>
            {getStatusIcon(guest.status)}
            <span className="ml-1">
              {guest.status.charAt(0).toUpperCase() + guest.status.slice(1)}
            </span>
          </span>
        </div>
      </div>;
  }
  return <div className="bg-gray-800 rounded-lg p-4 mb-4 shadow-md">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-lg font-medium">{guest.name}</h3>
        <span className={`flex items-center px-2 py-1 rounded-full text-xs ${getStatusColor(guest.status)}`}>
          {getStatusIcon(guest.status)}
          <span className="ml-1">
            {guest.status.charAt(0).toUpperCase() + guest.status.slice(1)}
          </span>
        </span>
      </div>
      <div className="mb-3 text-sm">
        <p>{guest.email}</p>
        <p>{guest.phone}</p>
        <p className="text-gray-400">
          Added by: {guest.addedBy} •{' '}
          {new Date(guest.timestamp).toLocaleTimeString()}
        </p>
        {guest.additionalGuests > 0 && <p className="flex items-center mt-1">
            <UserPlusIcon size={16} className="mr-1" />
            {guest.additionalGuests} additional{' '}
            {guest.additionalGuests === 1 ? 'guest' : 'guests'}
          </p>}
      </div>
      {onStatusChange && guest.status !== 'checked-in' && <div className="flex space-x-2">
          {guest.status !== 'approved' && <button onClick={() => onStatusChange(guest.id, 'approved')} className="flex-1 bg-green-700 hover:bg-green-600 text-white py-2 px-3 rounded-md text-sm flex items-center justify-center">
              <CheckIcon size={16} className="mr-1" /> Approve
            </button>}
          {guest.status !== 'denied' && <button onClick={() => onStatusChange(guest.id, 'denied')} className="flex-1 bg-red-700 hover:bg-red-600 text-white py-2 px-3 rounded-md text-sm flex items-center justify-center">
              <XIcon size={16} className="mr-1" /> Deny
            </button>}
          {(guest.status === 'approved' || guest.status === 'pending') && <button onClick={() => onStatusChange(guest.id, 'checked-in')} className="flex-1 bg-blue-700 hover:bg-blue-600 text-white py-2 px-3 rounded-md text-sm flex items-center justify-center">
              <CheckIcon size={16} className="mr-1" /> Check In
            </button>}
        </div>}
    </div>;
};
export default GuestCard;