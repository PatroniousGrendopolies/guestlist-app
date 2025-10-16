'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function StaffLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Mock validation - detect user type from credentials
      if (email === 'dj@test.com' && password === 'password123') {
        // DJ credentials
        localStorage.setItem('dj_authenticated', 'true');
        localStorage.setItem('dj_email', email);
        router.push('/dj/dashboard');
      } else if (email === 'staff@test.com' && password === 'password123') {
        // Staff credentials
        localStorage.setItem('staff_authenticated', 'true');
        localStorage.setItem('staff_email', email);
        router.push('/staff/dashboard');
      } else if (email === 'promoter@test.com' && password === 'password123') {
        // Promoter credentials
        localStorage.setItem('promoter_authenticated', 'true');
        localStorage.setItem('promoter_email', email);
        router.push('/promoter/dashboard');
      } else {
        setError('Invalid email or password');
      }
    } catch (error) {
      setError('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="max-w-md w-full mx-auto p-6">
        <div className="text-center mb-8">
          <p className="text-sm text-gray-600 mb-2">Nightlist</p>
          <h1 className="text-2xl font-light mb-2">Login</h1>
          <p className="text-gray-600">Sign in to manage your guest lists</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm text-gray-600 mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-black transition-colors"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm text-gray-600 mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-black transition-colors"
              placeholder="Enter your password"
              required
            />
          </div>

          {error && <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">{error}</div>}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-black text-white py-3 rounded-full text-sm hover:bg-gray-900 transition-colors disabled:bg-gray-400"
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <a
            href="/auth/forgot-password"
            className="text-sm text-gray-600 hover:text-black transition-colors"
          >
            Forgot your password?
          </a>
        </div>

        <div className="mt-8 text-center">
          <p className="text-xs text-gray-500">
            Need help?{' '}
            <a href="/" className="text-black hover:underline">
              Go to main site
            </a>
          </p>
        </div>

        {/* Demo Credentials */}
        <div className="mt-8 p-4 bg-gray-50 rounded-xl">
          <h4 className="text-sm mb-2">Demo Credentials:</h4>
          <div className="space-y-2">
            <div>
              <p className="text-xs text-gray-600">DJ: dj@test.com / password123</p>
            </div>
            <div>
              <p className="text-xs text-gray-600">Staff: staff@test.com / password123</p>
            </div>
            <div>
              <p className="text-xs text-gray-600">Promoter: promoter@test.com / password123</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
