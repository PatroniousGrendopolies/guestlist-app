import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RoleSelector from './components/RoleSelector';
import DoormanDashboard from './pages/DoormanDashboard';
import ManagerDashboard from './pages/ManagerDashboard';
import PromoterDashboard from './pages/PromoterDashboard';
import GuestSignup from './pages/GuestSignup';
import GuestConfirmation from './pages/GuestConfirmation';
import { UserRole } from './utils/types';
export function App() {
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  // Handle role selection
  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
  };
  return <Router>
      <div className="bg-black text-white min-h-screen w-full">
        <Routes>
          <Route path="/" element={selectedRole ? <>
                  {selectedRole === 'doorman' && <DoormanDashboard />}
                  {selectedRole === 'manager' && <ManagerDashboard />}
                  {selectedRole === 'promoter' && <PromoterDashboard />}
                </> : <RoleSelector onSelect={handleRoleSelect} />} />
          <Route path="/signup/:promoterId" element={<GuestSignup />} />
          <Route path="/confirmation/:guestId" element={<GuestConfirmation />} />
        </Routes>
      </div>
    </Router>;
}