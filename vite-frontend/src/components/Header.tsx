import React from 'react';
import { UserRole } from '../utils/types';
import { LogOutIcon } from 'lucide-react';
interface HeaderProps {
  role: UserRole;
  userName: string;
  onLogout: () => void;
}
const Header: React.FC<HeaderProps> = ({
  role,
  userName,
  onLogout
}) => {
  const roleLabels: Record<UserRole, string> = {
    doorman: 'Doorman',
    manager: 'Manager',
    promoter: 'Promoter',
    dj: 'DJ',
    guest: 'Guest'
  };
  return <header className="bg-gray-900 p-4">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold">Nightclub Guest List</h1>
          <p className="text-sm text-gray-400">
            {roleLabels[role]}: {userName}
          </p>
        </div>
        <button onClick={onLogout} className="p-2 rounded-full hover:bg-gray-800">
          <LogOutIcon size={20} />
        </button>
      </div>
    </header>;
};
export default Header;