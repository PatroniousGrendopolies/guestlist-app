'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/lib/supabase/client';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // Add timeout to prevent freezing
      const loginPromise = supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      const timeoutPromise = new Promise<never>((_, reject) => 
        setTimeout(() => reject(new Error('Login timed out after 10 seconds')), 10000)
      );
      
      const result = await Promise.race([loginPromise, timeoutPromise]);
      const { error: authError } = result;

      if (authError) {
        // Map common Supabase error messages to more user-friendly ones
        console.error('Supabase login error:', authError);
        if (authError.message === 'Invalid login credentials') {
          setError('Incorrect email or password. Please try again.');
        } else if (authError.message.toLowerCase().includes('email not confirmed') || 
                   authError.message.toLowerCase().includes('email not verified') ||
                   authError.message.toLowerCase().includes('user not confirmed')) {
          // Catch variations like "Email not confirmed" or "User not confirmed"
          setError(
            'Your email address has not been confirmed. Please check your inbox for a confirmation link. If you cannot find it, you may need to register again.'
          );
        } else if (authError.message.toLowerCase().includes('too many')) {
          setError('Too many login attempts. Please wait a few minutes before trying again.');
        } else {
          // For other Supabase errors or less common ones
          console.error('Supabase login error:', authError.message);
          setError(`Login failed: ${authError.message}. Please try again or contact support.`);
        }
      } else {
        // Debug: Let's see what we get back
        const { data: { session } } = await supabase.auth.getSession();
        console.log('Login successful, session:', session);
        console.log('Redirecting to dashboard...');
        
        // On success, Supabase handles the session in a secure cookie.
        // We just need to redirect. router.refresh() helps ensure layout re-renders with new auth state.
        router.push('/dashboard');
        router.refresh();
      }
    } catch (err) { // Catching generic errors (e.g., network issues)
      console.error('Login request failed:', err);
      if (err instanceof Error && err.message?.includes('timed out')) {
        setError('Login timed out. Please check your internet connection and try again.');
      } else {
        setError('An unexpected error occurred. Please check your internet connection and try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
        <h1 className="mb-6 text-center text-2xl font-bold text-gray-900">
          Login to Guestlist App
        </h1>

        {error && <div className="mb-4 rounded-md bg-red-50 p-4 text-sm text-red-700">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
              placeholder="your@email.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
            />
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
            >
              {isLoading ? 'Signing in...' : 'Sign in'}
            </button>
          </div>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Don&apos;t have an account?{' '}
            <Link href="/auth/register" className="font-medium text-indigo-600 hover:text-indigo-500">
              Sign up
            </Link>
          </p>
          <p className="mt-2 text-sm text-gray-600">
            <Link href="/auth/forgot-password" className="font-medium text-indigo-600 hover:text-indigo-500">
              Forgot your password?
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
