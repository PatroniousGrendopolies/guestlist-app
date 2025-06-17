import React from 'react';
import { UserRole } from '../utils/types';
import { UserIcon, UserCheckIcon, MusicIcon, UsersIcon } from 'lucide-react';
interface RoleSelectorProps {
  onSelect: (role: UserRole) => void;
}
const RoleSelector: React.FC<RoleSelectorProps> = ({
  onSelect
}) => {
  const roleOptions: {
    role: UserRole;
    label: string;
    icon: React.ReactNode;
  }[] = [{
    role: 'doorman',
    label: 'Doorman',
    icon: <UserCheckIcon size={24} />
  }, {
    role: 'manager',
    label: 'Manager',
    icon: <UserIcon size={24} />
  }, {
    role: 'promoter',
    label: 'Promoter',
    icon: <UsersIcon size={24} />
  }, {
    role: 'dj',
    label: 'DJ',
    icon: <MusicIcon size={24} />
  }];
  return <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-md bg-gray-900 rounded-lg p-6 shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-8">
          Nightclub Guest List
        </h1>
        <h2 className="text-xl mb-6 text-center">Select your role</h2>
        <div className="grid grid-cols-2 gap-4">
          {roleOptions.map(option => <button key={option.role} onClick={() => onSelect(option.role)} className="flex flex-col items-center justify-center bg-gray-800 hover:bg-purple-900 text-white p-6 rounded-lg transition-all duration-200">
              <div className="mb-2">{option.icon}</div>
              <span>{option.label}</span>
            </button>)}
        </div>
      </div>
    </div>;
};
export default RoleSelector;