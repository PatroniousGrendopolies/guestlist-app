'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { GuestAuthService } from '@/lib/auth/guest-auth';

const guestAuth = new GuestAuthService();

function GuestAuthContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLogin, setIsLogin] = useState(false); // Default to signup
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  // Event details from URL params or defaults
  const eventName = searchParams.get('event') || 'Summer Vibes';
  const djNames = searchParams.get('dj') || 'DJ Shadow & MC Solar';
  const eventDate = searchParams.get('date') || 'Saturday, June 24th, 2025';

  // Form state
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    fullName: '',
    phone: '',
    instagramHandle: ''
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const { guest, error } = await guestAuth.loginWithEmail(
        formData.email,
        formData.password
      );

      if (error) {
        setError(error);
      } else {
        setSuccess('Login successful! Redirecting...');
        sessionStorage.setItem('guestSession', JSON.stringify(guest));
        setTimeout(() => router.push('/guest/dashboard'), 1000);
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    // Parse full name into first and last
    const nameParts = formData.fullName.trim().split(' ');
    const firstName = nameParts[0] || '';
    const lastName = nameParts.slice(1).join(' ') || '';

    try {
      const { guest, error } = await guestAuth.registerWithEmail(
        formData.email,
        formData.password,
        {
          firstName,
          lastName,
          phone: formData.phone || undefined,
          instagramHandle: formData.instagramHandle || undefined
        }
      );

      if (error) {
        setError(error);
      } else {
        setSuccess('Account created! Please check your email to verify your account.');
        setTimeout(() => setIsLogin(true), 2000);
      }
    } catch (err) {
      setError('Signup failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    setError('Google authentication coming soon!');
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-4xl px-xl">
      <div className="w-full max-w-md">
        {/* Event Header */}
        <div className="text-center mb-4xl">
          <h1 className="text-4xl font-light mb-lg">Welcome to Nights</h1>
          <div className="space-y-sm">
            <p className="text-lg">To get on the list for</p>
            <p className="text-xl font-medium">{djNames}</p>
            <p className="text-lg text-gray-600">{eventDate}</p>
          </div>
        </div>

        {/* Auth Card */}
        <div className="card">
          <div className="card-body">
            {/* Google Auth Button */}
            <button
              onClick={handleGoogleAuth}
              className="btn btn-primary btn-lg w-full mb-xl"
            >
              Continue with Google
            </button>

            {/* Divider */}
            <div className="flex items-center mb-xl">
              <div className="flex-1 border-t border-gray-200"></div>
              <span className="px-lg text-sm text-gray-400">or</span>
              <div className="flex-1 border-t border-gray-200"></div>
            </div>

            {/* Toggle Buttons */}
            <div className="flex gap-sm mb-2xl">
              <button
                type="button"
                onClick={() => setIsLogin(false)}
                className={`flex-1 py-md px-lg text-center rounded-lg transition-all ${
                  !isLogin 
                    ? 'bg-black text-white' 
                    : 'bg-white text-black border border-gray-300'
                }`}
              >
                Sign up
              </button>
              <button
                type="button"
                onClick={() => setIsLogin(true)}
                className={`flex-1 py-md px-lg text-center rounded-lg transition-all ${
                  isLogin 
                    ? 'bg-black text-white' 
                    : 'bg-white text-black border border-gray-300'
                }`}
              >
                Sign In
              </button>
            </div>

            {/* Error/Success Messages */}
            {error && (
              <div className="p-lg mb-lg border border-gray-300 rounded-lg bg-gray-50">
                <p className="text-sm text-gray-700">{error}</p>
              </div>
            )}
            {success && (
              <div className="p-lg mb-lg border border-gray-300 rounded-lg bg-gray-50">
                <p className="text-sm text-gray-700">{success}</p>
              </div>
            )}

            {/* Forms */}
            {isLogin ? (
              /* Login Form */
              <form onSubmit={handleLogin} className="flex flex-col gap-lg">
                <div className="form-group">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    className="input"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    className="input"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="btn btn-primary btn-lg mt-lg"
                >
                  {isLoading ? 'Signing In...' : 'Sign In'}
                </button>

                <div className="text-center mt-lg">
                  <button
                    type="button"
                    onClick={() => setError('Password reset coming soon!')}
                    className="text-sm text-gray-500 hover:text-black transition-colors"
                  >
                    Forgot your password?
                  </button>
                </div>
              </form>
            ) : (
              /* Signup Form */
              <form onSubmit={handleSignup} className="flex flex-col gap-lg">
                <div className="form-group">
                  <label htmlFor="name" className="form-label">
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    className="input"
                    placeholder="First Last"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="signupEmail" className="form-label">
                    Email
                  </label>
                  <input
                    id="signupEmail"
                    type="email"
                    className="input"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone" className="form-label">
                    Phone
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    className="input"
                    placeholder="+1 (555) 123-4567"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>

                {/* Password fields only for signup */}
                <div className="form-group">
                  <label htmlFor="signupPassword" className="form-label">
                    Password
                  </label>
                  <input
                    id="signupPassword"
                    type="password"
                    className="input"
                    placeholder="Create a password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="confirmPassword" className="form-label">
                    Confirm Password
                  </label>
                  <input
                    id="confirmPassword"
                    type="password"
                    className="input"
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="btn btn-primary btn-lg mt-lg"
                >
                  {isLoading ? 'Creating Account...' : 'Create Account'}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Text */}
        <div className="text-center mt-3xl">
          <p className="text-sm text-gray-500">
            By continuing, you agree to our terms of service and privacy policy.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function GuestAuthPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    }>
      <GuestAuthContent />
    </Suspense>
  );
}