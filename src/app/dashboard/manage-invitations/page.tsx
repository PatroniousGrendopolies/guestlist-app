// src/app/dashboard/manage-invitations/page.tsx
'use client';

import { useState, useTransition } from 'react';
import { UserRole } from '@/types/enums';

// Helper to get user-friendly role names if needed, or just use the enum values
const getFriendlyRoleName = (role: UserRole): string => {
  switch (role) {
    case UserRole.DJ: return 'DJ';
    case UserRole.PROMOTER: return 'Promoter';
    case UserRole.DOORMAN: return 'Door Staff';
    // Add other roles as needed, but managers typically invite DJs or Promoters
    default: return role.charAt(0).toUpperCase() + role.slice(1);
  }
};

// Define which roles a manager can assign through this form
const assignableRoles: UserRole[] = [
  UserRole.DJ,
  UserRole.PROMOTER,
  UserRole.DOORMAN, // Example: managers might also invite door staff
];


export default function ManageInvitationsPage() {
  const [email, setEmail] = useState('');
  const [roleToAssign, setRoleToAssign] = useState<UserRole>(assignableRoles[0] || UserRole.DJ);
  const [message, setMessage] = useState<string | null>(null);
  const [messageType, setMessageType] = useState<'success' | 'error' | 'info'>('info');
  const [isPending, startTransition] = useTransition();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage(null);

    if (!email || !roleToAssign) {
      setMessage('Email and role are required.');
      setMessageType('error');
      return;
    }

    startTransition(async () => {
      try {
        const response = await fetch('/api/invitations', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, roleToAssign }),
        });

        const result = await response.json();

        if (response.ok) {
          setMessage(result.message || 'Invitation sent successfully!');
          setMessageType('success');
          setEmail(''); // Clear email field on success
        } else {
          setMessage(result.error || 'Failed to send invitation.');
          setMessageType('error');
        }
      } catch (error) {
        console.error('Error sending invitation:', error);
        setMessage('An unexpected error occurred. Please try again.');
        setMessageType('error');
      }
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-lg border border-gray-200">
        <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">Manage User Invitations</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address to Invite
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="user@example.com"
              required
            />
          </div>

          <div>
            <label htmlFor="roleToAssign" className="block text-sm font-medium text-gray-700 mb-1">
              Assign Role
            </label>
            <select
              name="roleToAssign"
              id="roleToAssign"
              value={roleToAssign}
              onChange={(e) => setRoleToAssign(e.target.value as UserRole)}
              className="mt-1 block w-full px-4 py-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            >
              {assignableRoles.map((role) => (
                <option key={role} value={role}>
                  {getFriendlyRoleName(role)}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-150 ease-in-out"
          >
            {isPending ? 'Sending Invitation...' : 'Send Invitation'}
          </button>
        </form>

        {message && (
          <div className={`mt-6 p-4 rounded-md text-sm font-medium border ${
            messageType === 'success' ? 'bg-green-50 border-green-300 text-green-700' :
            messageType === 'error' ? 'bg-red-50 border-red-300 text-red-700' :
            'bg-blue-50 border-blue-300 text-blue-700' // info
          }`} role="alert">
            <p className="font-semibold">{messageType.charAt(0).toUpperCase() + messageType.slice(1)}</p>
            <p>{message}</p>
          </div>
        )}
      </div>
    </div>
  );
}
