'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { SafeStorage } from '@/lib/utils/safeStorage';

export default function ManagerLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock validation for different manager types
      if (email === 'owner@datcha.com' && password === 'password123') {
        SafeStorage.setItem('manager_authenticated', 'true');
        SafeStorage.setItem('manager_email', email);
        SafeStorage.setItem('manager_role', 'owner');
        SafeStorage.setItem('manager_name', 'Sarah Chen');
        router.push('/manager/dashboard');
      } else if (email === 'manager@datcha.com' && password === 'password123') {
        SafeStorage.setItem('manager_authenticated', 'true');
        SafeStorage.setItem('manager_email', email);
        SafeStorage.setItem('manager_role', 'manager');
        SafeStorage.setItem('manager_name', 'Alex Rodriguez');
        router.push('/manager/dashboard');
      } else if (email === 'assistant@datcha.com' && password === 'password123') {
        SafeStorage.setItem('manager_authenticated', 'true');
        SafeStorage.setItem('manager_email', email);
        SafeStorage.setItem('manager_role', 'assistant');
        SafeStorage.setItem('manager_name', 'Jordan Kim');
        router.push('/manager/dashboard');
      } else {
        setError('Invalid email or password');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-light tracking-tight mb-2">Manager Login</h1>
          <p className="text-gray-600">Access venue management system</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          {error && (
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
              <p className="text-gray-700 text-sm">{error}</p>
            </div>
          )}

          <div>
            <label htmlFor="email" className="block text-sm text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black focus:border-black transition-colors"
              placeholder="manager@datcha.com"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black focus:border-black transition-colors"
              placeholder="password123"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-black text-white py-3 rounded-full hover:bg-gray-900 transition-colors disabled:opacity-50 text-sm"
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600 mb-2">Test accounts:</p>
          <div className="text-xs text-gray-500 space-y-1">
            <p>Owner: owner@datcha.com / password123</p>
            <p>Manager: manager@datcha.com / password123</p>
            <p>Assistant: assistant@datcha.com / password123</p>
          </div>
        </div>
      </div>
    </div>
  );
}