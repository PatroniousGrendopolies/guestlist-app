// src/app/auth/update-password/page.tsx
'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';

export default function UpdatePasswordPage() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const [messageType, setMessageType] = useState<'success' | 'error'>('success');
  const [isPending, startTransition] = useTransition();

  const handleUpdatePassword = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage(null);

    if (password !== confirmPassword) {
      setMessage('Passwords do not match.');
      setMessageType('error');
      return;
    }

    if (password.length < 6) {
      setMessage('Password must be at least 6 characters long.');
      setMessageType('error');
      return;
    }

    startTransition(async () => {
      // Use the single Supabase client instance
      // Supabase client automatically handles the session from the recovery token in the URL.
      const { error } = await supabase.auth.updateUser({ password });

      if (error) {
        setMessage(`Error: ${error.message}`);
        setMessageType('error');
      } else {
        setMessage('Your password has been updated successfully! Redirecting to login...');
        setMessageType('success');
        // Redirect to login page after a short delay to allow the user to read the message
        setTimeout(() => {
          router.push('/auth/login');
        }, 2000);
      }
    });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-lg border border-gray-200">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Update Password</h1>
        <p className="text-center text-gray-600 mb-6">
          Enter your new password below.
        </p>
        <form onSubmit={handleUpdatePassword} className="space-y-6">
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              New Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
              Confirm New Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <button
            type="submit"
            disabled={isPending}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isPending ? 'Updating...' : 'Update Password'}
          </button>
        </form>
        {message && (
          <div className={`mt-6 p-4 rounded-md text-sm font-medium border ${
            messageType === 'success' ? 'bg-green-50 border-green-300 text-green-700' :
            'bg-red-50 border-red-300 text-red-700'
          }`} role="alert">
            {message}
          </div>
        )}
      </div>
    </div>
  );
}
