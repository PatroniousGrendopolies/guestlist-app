'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';

export default function StaffLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setError('Invalid email or password');
        return;
      }

      if (data.user) {
        // Fetch user profile to get role
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', data.user.id)
          .single();

        if (profileError || !profile) {
          setError('Unable to fetch user profile');
          return;
        }

        // Route based on role
        switch (profile.role) {
          case 'MANAGER':
            router.push('/manager/dashboard');
            break;
          case 'DJ':
            router.push('/dj/dashboard');
            break;
          case 'STAFF':
            router.push('/staff/dashboard');
            break;
          case 'PROMOTER':
            router.push('/promoter/dashboard');
            break;
          case 'DOORPERSON':
            router.push('/doorperson/scanner');
            break;
          default:
            router.push('/dashboard');
        }
        router.refresh();
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-6xl px-xl">
      <div className="w-full max-w-sm">
        {/* Header */}
        <div className="text-center mb-4xl">
          <h1 className="text-3xl font-light mb-lg">Nightlist</h1>
          <p className="text-lg text-gray-600">Sign in to access your dashboard</p>
        </div>

        {/* Login Card */}
        <div className="card">
          <div className="card-body">
            <form onSubmit={handleSubmit} className="flex flex-col gap-xl">
              {/* Error Message */}
              {error && (
                <div className="p-lg border border-gray-300 rounded-lg bg-gray-50">
                  <p className="text-sm text-gray-700">{error}</p>
                </div>
              )}

              {/* Email Field */}
              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  className="input"
                  placeholder="your@email.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                />
              </div>

              {/* Password Field */}
              <div className="form-group">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  className="input"
                  placeholder="Enter your password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                />
              </div>

              {/* Submit Button */}
              <button type="submit" disabled={isLoading} className="btn btn-primary btn-lg">
                {isLoading ? 'Signing in...' : 'Sign In'}
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Links */}
        <div className="text-center mt-3xl space-y-md">
          <p className="text-sm text-gray-500">
            Are you a guest?
            <a href="/guest/auth" className="ml-1 text-black hover:underline">
              Join the guest list
            </a>
          </p>
          <p className="text-sm text-gray-400">Contact your manager if you need access</p>
        </div>
      </div>
    </div>
  );
}
