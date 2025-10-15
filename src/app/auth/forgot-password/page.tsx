// src/app/auth/forgot-password/page.tsx
'use client';

import { useState, useTransition } from 'react';
import { createClient } from '@/utils/supabase/client';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const [messageType, setMessageType] = useState<'success' | 'error'>('success');
  const [isPending, startTransition] = useTransition();

  const handleResetRequest = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage(null);

    if (!email) {
      setMessage('Please enter your email address.');
      setMessageType('error');
      return;
    }

    startTransition(async () => {
      const supabase = createClient();

      // The redirect URL should point to your update password page
      const redirectTo = `${window.location.origin}/auth/update-password`;

      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo,
      });

      if (error) {
        // Display a generic message to prevent email enumeration attacks
        console.error('Password reset error:', error);
        setMessage('If an account exists for this email, a password reset link has been sent.');
        setMessageType('success');
      } else {
        setMessage('If an account exists for this email, a password reset link has been sent.');
        setMessageType('success');
        setEmail('');
      }
    });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-lg border border-gray-200">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Forgot Password</h1>
        <p className="text-center text-gray-600 mb-6">
          Enter your email address and we will send you a link to reset your password.
        </p>
        <form onSubmit={handleResetRequest} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="you@example.com"
              required
            />
          </div>
          <button
            type="submit"
            disabled={isPending}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isPending ? 'Sending...' : 'Send Reset Link'}
          </button>
        </form>
        {message && (
          <div
            className={`mt-6 p-4 rounded-md text-sm font-medium border ${
              messageType === 'success'
                ? 'bg-green-50 border-green-300 text-green-700'
                : 'bg-red-50 border-red-300 text-red-700'
            }`}
            role="alert"
          >
            {message}
          </div>
        )}
      </div>
    </div>
  );
}
