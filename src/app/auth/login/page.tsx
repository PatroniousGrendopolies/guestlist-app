'use client';

import { useState, FormEvent } from 'react';
import { signIn } from '@/lib/auth/auth';
import { useRouter } from 'next/navigation';

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

    // Add debugging to help troubleshoot
    console.log('Login attempt with:', { email, password });

    try {
      // Call our mock signIn function
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      // Log the result for debugging
      console.log('Sign in result:', result);

      if (result?.error) {
        // Handle error case
        console.error('Authentication error:', result.error);
        setError('Invalid email or password');
      } else {
        // Handle success case
        console.log('Authentication successful, redirecting to dashboard');
        
        // Create a mock session for the user
        const mockUser = {
          id: '1',
          name: 'Admin User',
          email: email,
          role: 'MANAGER'
        };
        
        // Store in localStorage for persistence (in a real app, this would be handled by NextAuth)
        if (typeof window !== 'undefined') {
          localStorage.setItem('user', JSON.stringify(mockUser));
        }
        
        // Redirect to dashboard
        router.push('/dashboard');
        router.refresh();
      }
    } catch (error) {
      // Handle unexpected errors
      console.error('Login error:', error);
      setError('Something went wrong. Please try again.');
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
              onChange={e => setEmail(e.target.value)}
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
              onChange={e => setPassword(e.target.value)}
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
      </div>
    </div>
  );
}
