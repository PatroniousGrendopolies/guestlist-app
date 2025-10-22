'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useToast, ToastProvider } from '@/components/ui/ToastProvider';
import ErrorBoundary from '@/components/ui/ErrorBoundary';
import { SafeStorage } from '@/lib/utils/safeStorage';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

function GuestAuthContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { showToast } = useToast();
  const [isLogin, setIsLogin] = useState(false); // Default to signup

  // Debug function
  const handleSignInClick = () => {
    console.log('SIGN IN CLICKED - Before:', isLogin);
    setIsLogin(true);
    console.log('SIGN IN CLICKED - After setting to true');
  };

  const handleSignUpClick = () => {
    console.log('SIGN UP CLICKED - Before:', isLogin);
    setIsLogin(false);
    console.log('SIGN UP CLICKED - After setting to false');
  };
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Event details from URL params or defaults
  const eventName = searchParams.get('event') || 'Summer Vibes';
  const djNames = searchParams.get('dj') || 'DJ Shadow & MC Solar';
  const eventDate = searchParams.get('date') || 'Saturday, June 24, 2025';

  // Form state
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    fullName: '',
    phone: '',
    instagramHandle: '',
  });

  // Input validation
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string): { valid: boolean; message?: string } => {
    if (password.length < 8) {
      return { valid: false, message: 'Password must be at least 8 characters long' };
    }
    if (!/(?=.*[a-z])/.test(password)) {
      return { valid: false, message: 'Password must contain at least one lowercase letter' };
    }
    if (!/(?=.*[A-Z])/.test(password)) {
      return { valid: false, message: 'Password must contain at least one uppercase letter' };
    }
    if (!/(?=.*\d)/.test(password)) {
      return { valid: false, message: 'Password must contain at least one number' };
    }
    return { valid: true };
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Validate inputs
    if (!validateEmail(formData.email)) {
      setError('Please enter a valid email address');
      showToast('Please enter a valid email address', 'error');
      setIsLoading(false);
      return;
    }

    if (!formData.password) {
      setError('Please enter your password');
      showToast('Please enter your password', 'error');
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/auth/guest/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email.trim(),
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Login failed');
        showToast(data.error || 'Login failed', 'error');
      } else {
        setSuccess('Login successful! Redirecting...');
        showToast('Login successful!', 'success');

        // Save session to localStorage
        SafeStorage.setItem('guestSession', JSON.stringify(data.guest));

        setTimeout(() => router.push('/guest/dashboard'), 1000);
      }
    } catch (err) {
      const errorMessage = 'Login failed. Please try again.';
      setError(errorMessage);
      showToast(errorMessage, 'error');
      console.error('Login error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Validate inputs
    if (!formData.firstName.trim()) {
      setError('Please enter your first name');
      showToast('Please enter your first name', 'error');
      setIsLoading(false);
      return;
    }

    if (!formData.lastName.trim()) {
      setError('Please enter your last name');
      showToast('Please enter your last name', 'error');
      setIsLoading(false);
      return;
    }

    if (!formData.instagramHandle.trim()) {
      setError('Please enter your Instagram handle');
      showToast('Please enter your Instagram handle', 'error');
      setIsLoading(false);
      return;
    }

    if (!validateEmail(formData.email)) {
      setError('Please enter a valid email address');
      showToast('Please enter a valid email address', 'error');
      setIsLoading(false);
      return;
    }

    const passwordValidation = validatePassword(formData.password);
    if (!passwordValidation.valid) {
      setError(passwordValidation.message!);
      showToast(passwordValidation.message!, 'error');
      setIsLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      showToast('Passwords do not match', 'error');
      setIsLoading(false);
      return;
    }

    // Use the separate first and last name fields
    const firstName = formData.firstName.trim();
    const lastName = formData.lastName.trim();

    try {
      const response = await fetch('/api/auth/guest/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email.trim(),
          password: formData.password,
          firstName: firstName,
          lastName: lastName,
          phone: formData.phone.trim() || null,
          instagramHandle: formData.instagramHandle.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Signup failed');
        showToast(data.error || 'Signup failed', 'error');
      } else {
        setSuccess('Account created! Redirecting to your dashboard...');
        showToast('Account created successfully!', 'success');

        // Auto-login after successful signup
        SafeStorage.setItem('guestSession', JSON.stringify(data.guest));

        setTimeout(() => router.push('/guest/dashboard'), 1000);
      }
    } catch (err) {
      const errorMessage = 'Signup failed. Please try again.';
      setError(errorMessage);
      showToast(errorMessage, 'error');
      console.error('Signup error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse: any) => {
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auth/guest/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          credential: credentialResponse.credential,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Google authentication failed');
        showToast(data.error || 'Google authentication failed', 'error');
      } else {
        setSuccess('Login successful! Redirecting...');
        showToast('Login successful!', 'success');

        // Save session to localStorage
        SafeStorage.setItem('guestSession', JSON.stringify(data.guest));

        setTimeout(() => router.push('/guest/dashboard'), 1000);
      }
    } catch (err) {
      const errorMessage = 'Google authentication failed. Please try again.';
      setError(errorMessage);
      showToast(errorMessage, 'error');
      console.error('Google auth error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleError = () => {
    const message = 'Google authentication was cancelled or failed';
    setError(message);
    showToast(message, 'error');
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-4xl px-xl">
      <div className="w-full max-w-md">
        {/* Event Header */}
        <div className="text-center mb-4xl">
          <h1 className="text-4xl font-light mb-lg">Welcome to Nightlist</h1>
          <div className="space-y-sm">
            <p className="text-lg font-light">To get on the list for</p>
            <p className="text-xl">{djNames}</p>
            <p className="text-lg text-gray-600">{eventDate}</p>
          </div>
        </div>

        {/* Auth Card */}
        <div className="card">
          <div className="card-body">
            {/* Google Auth Button */}
            <div className="mb-xl">
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={handleGoogleError}
                useOneTap
                theme="outline"
                size="large"
                width="100%"
                text="continue_with"
              />
            </div>

            {/* Divider */}
            <div className="flex items-center mb-xl">
              <div className="flex-1 border-t border-gray-200"></div>
              <span className="px-lg text-sm text-gray-400">or</span>
              <div className="flex-1 border-t border-gray-200"></div>
            </div>

            {/* Toggle Buttons */}
            <div className="flex mb-6xl border-b border-gray-200">
              <button
                type="button"
                onClick={handleSignUpClick}
                style={{
                  backgroundColor: !isLogin ? '#F3F4F6' : '#FFFFFF',
                  color: !isLogin ? '#000000' : '#000000',
                }}
                className="flex-1 py-3 px-6 text-center text-sm transition-all rounded-t-xl border-l border-t border-r border-gray-200 -mb-px"
              >
                Sign up
              </button>
              <button
                type="button"
                onClick={handleSignInClick}
                style={{
                  backgroundColor: isLogin ? '#4B5563' : '#FFFFFF',
                  color: isLogin ? '#FFFFFF' : '#000000',
                }}
                className="flex-1 py-3 px-6 text-center text-sm transition-all rounded-t-xl border-l border-t border-r border-gray-200 -mb-px"
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
                    className="px-4 py-2 border border-gray-200 rounded-xl focus:border-black transition-colors w-full"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
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
                    className="px-4 py-2 border border-gray-200 rounded-xl focus:border-black transition-colors w-full"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={e => setFormData({ ...formData, password: e.target.value })}
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="bg-black text-white rounded-full py-3 px-6 text-sm w-full mt-lg hover:bg-gray-900 transition-colors disabled:bg-gray-200 disabled:text-gray-400"
                >
                  {isLoading ? 'Signing In...' : 'Sign In'}
                </button>

                <div className="text-center mt-lg">
                  <button
                    type="button"
                    onClick={() => {
                      const message = 'Password reset coming soon!';
                      setError(message);
                      showToast(message, 'info');
                    }}
                    className="text-sm text-gray-500 hover:text-black transition-colors"
                  >
                    Forgot your password?
                  </button>
                </div>
              </form>
            ) : (
              /* Signup Form */
              <form onSubmit={handleSignup} className="flex flex-col gap-lg">
                <div className="flex gap-xl">
                  <input
                    id="firstName"
                    type="text"
                    className="px-4 py-2 border border-gray-200 rounded-xl focus:border-black transition-colors w-full flex-1"
                    placeholder="First name"
                    value={formData.firstName}
                    onChange={e => setFormData({ ...formData, firstName: e.target.value })}
                    required
                  />
                  <input
                    id="lastName"
                    type="text"
                    className="px-4 py-2 border border-gray-200 rounded-xl focus:border-black transition-colors w-full flex-1"
                    placeholder="Last name"
                    value={formData.lastName}
                    onChange={e => setFormData({ ...formData, lastName: e.target.value })}
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
                    className="px-4 py-2 border border-gray-200 rounded-xl focus:border-black transition-colors w-full"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
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
                    className="px-4 py-2 border border-gray-200 rounded-xl focus:border-black transition-colors w-full"
                    placeholder="+1 (555) 123-4567"
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="instagramHandle" className="form-label">
                    Instagram Handle
                  </label>
                  <input
                    id="instagramHandle"
                    type="text"
                    className="px-4 py-2 border border-gray-200 rounded-xl focus:border-black transition-colors w-full"
                    placeholder="@yourusername"
                    value={formData.instagramHandle}
                    onChange={e => {
                      let value = e.target.value;
                      // Always ensure @ symbol is at the beginning if there's any text
                      if (value.length > 0 && !value.startsWith('@')) {
                        value = '@' + value;
                      }
                      setFormData({ ...formData, instagramHandle: value });
                    }}
                    required
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
                    className="px-4 py-2 border border-gray-200 rounded-xl focus:border-black transition-colors w-full"
                    placeholder="Create a password"
                    value={formData.password}
                    onChange={e => setFormData({ ...formData, password: e.target.value })}
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
                    className="px-4 py-2 border border-gray-200 rounded-xl focus:border-black transition-colors w-full"
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={e => setFormData({ ...formData, confirmPassword: e.target.value })}
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="bg-black text-white rounded-full py-3 px-6 text-sm w-full mt-lg hover:bg-gray-900 transition-colors disabled:bg-gray-200 disabled:text-gray-400"
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
  const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '';

  if (!googleClientId) {
    console.warn('Google Client ID not configured');
  }

  return (
    <GoogleOAuthProvider clientId={googleClientId}>
      <ErrorBoundary>
        <ToastProvider>
          <Suspense
            fallback={
              <div className="min-h-screen flex items-center justify-center">
                <div className="text-lg">Loading...</div>
              </div>
            }
          >
            <GuestAuthContent />
          </Suspense>
        </ToastProvider>
      </ErrorBoundary>
    </GoogleOAuthProvider>
  );
}
