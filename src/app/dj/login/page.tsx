'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function DJLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetMessage, setResetMessage] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

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
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setResetMessage('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setResetMessage('Password reset link sent to your email!');
      setResetEmail('');
    } catch (err) {
      setResetMessage('Failed to send reset email. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (showForgotPassword) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-light tracking-tight mb-2">Nightlist</h1>
            <h2 className="text-xl font-light mb-4">Reset Password</h2>
            <p className="text-gray-600">Enter your email to receive a reset link</p>
          </div>

          {/* Reset Form */}
          <form onSubmit={handleForgotPassword} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
              <input
                type="email"
                value={resetEmail}
                onChange={e => setResetEmail(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-black transition-colors"
                placeholder="your@email.com"
                required
              />
            </div>

            {resetMessage && (
              <div
                className={`p-3 rounded-xl ${
                  resetMessage.includes('Failed')
                    ? 'bg-red-50 text-red-700 border border-red-200'
                    : 'bg-green-50 text-green-700 border border-green-200'
                }`}
              >
                {resetMessage}
              </div>
            )}

            <div className="space-y-3">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-black text-white py-3 rounded-xl font-medium hover:bg-gray-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Sending...
                  </div>
                ) : (
                  'Send Reset Link'
                )}
              </button>

              <button
                type="button"
                onClick={() => setShowForgotPassword(false)}
                className="w-full bg-white text-black border-2 border-black py-3 rounded-xl font-medium hover:bg-gray-50 transition-colors"
              >
                Back to Login
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-light tracking-tight mb-2">Nightlist</h1>
          <h2 className="text-xl font-light mb-4">Login</h2>
          <p className="text-gray-600">Access your events and guest lists</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-black transition-colors"
              placeholder="your@email.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-black transition-colors"
              placeholder="Enter your password"
              required
            />
          </div>

          {error && (
            <div className="bg-red-50 text-red-700 p-3 rounded-xl border border-red-200">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-black text-white py-3 rounded-xl font-medium hover:bg-gray-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                Signing in...
              </div>
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        {/* Forgot Password */}
        <div className="text-center mt-6">
          <button
            onClick={() => setShowForgotPassword(true)}
            className="text-black font-medium hover:underline"
          >
            Forgot your password?
          </button>
        </div>

        {/* Sign Up Link */}
        <div className="text-center mt-8 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            Don't have an account?{' '}
            <button
              onClick={() => router.push('/dj/signup')}
              className="text-black font-medium hover:underline"
            >
              Sign up here
            </button>
          </p>
        </div>

        {/* Demo Credentials */}
        <div className="mt-8 p-4 bg-gray-50 rounded-xl">
          <h4 className="font-medium text-sm mb-2">Demo Credentials:</h4>
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
