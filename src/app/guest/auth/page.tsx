'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { GuestAuthService } from '@/lib/auth/guest-auth';
import { useToast, ToastProvider } from '@/components/ui/ToastProvider';
import ErrorBoundary from '@/components/ui/ErrorBoundary';
import { SafeStorage } from '@/lib/utils/safeStorage';

const guestAuth = new GuestAuthService();

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
    instagramHandle: ''
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
      const { guest, error } = await guestAuth.loginWithEmail(
        formData.email.trim(),
        formData.password
      );

      if (error) {
        setError(error);
        showToast(error, 'error');
      } else {
        setSuccess('Login successful! Redirecting...');
        showToast('Login successful!', 'success');
        
        // Use SafeStorage instead of sessionStorage
        SafeStorage.setItem('guestSession', JSON.stringify(guest));
        
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
      const { guest, error } = await guestAuth.registerWithEmail(
        formData.email.trim(),
        formData.password,
        {
          firstName: firstName,
          lastName: lastName,
          phone: formData.phone.trim() || undefined,
          instagramHandle: formData.instagramHandle.trim()
        }
      );

      if (error) {
        setError(error);
        showToast(error, 'error');
      } else {
        setSuccess('Account created! Please check your email to verify your account.');
        showToast('Account created successfully!', 'success');
        setTimeout(() => setIsLogin(true), 2000);
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

  const handleGoogleAuth = async () => {
    const message = 'Google authentication coming soon!';
    setError(message);
    showToast(message, 'info');
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
            <button
              onClick={handleGoogleAuth}
              className="bg-white text-black border border-gray-300 rounded-full py-3 px-6 text-sm w-full mb-xl hover:bg-gray-50 transition-colors flex items-center justify-center gap-3"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M17.64 9.20454C17.64 8.56636 17.5827 7.95272 17.4764 7.36363H9V10.845H13.8436C13.635 11.97 13.0009 12.9231 12.0477 13.5613V15.8195H14.9564C16.6582 14.2527 17.64 11.9454 17.64 9.20454Z" fill="#4285F4"/>
                <path fillRule="evenodd" clipRule="evenodd" d="M9 18C11.43 18 13.4673 17.1941 14.9564 15.8195L12.0477 13.5613C11.2418 14.1013 10.2109 14.4204 9 14.4204C6.65591 14.4204 4.67182 12.8372 3.96409 10.71H0.957272V13.0418C2.43818 15.9831 5.48182 18 9 18Z" fill="#34A853"/>
                <path fillRule="evenodd" clipRule="evenodd" d="M3.96409 10.71C3.78409 10.17 3.68182 9.59318 3.68182 9C3.68182 8.40682 3.78409 7.83 3.96409 7.29V4.95818H0.957272C0.347727 6.17318 0 7.54773 0 9C0 10.4523 0.347727 11.8268 0.957272 13.0418L3.96409 10.71Z" fill="#FBBC05"/>
                <path fillRule="evenodd" clipRule="evenodd" d="M9 3.57955C10.3214 3.57955 11.5077 4.03364 12.4405 4.92545L15.0218 2.34409C13.4632 0.891818 11.4259 0 9 0C5.48182 0 2.43818 2.01682 0.957272 4.95818L3.96409 7.29C4.67182 5.16273 6.65591 3.57955 9 3.57955Z" fill="#EA4335"/>
              </svg>
              Continue with Google
            </button>

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
                style={{ backgroundColor: !isLogin ? '#F3F4F6' : '#FFFFFF', color: !isLogin ? '#000000' : '#000000' }}
                className="flex-1 py-3 px-6 text-center text-sm transition-all rounded-t-xl border-l border-t border-r border-gray-200 -mb-px"
              >
                Sign up
              </button>
              <button
                type="button"
                onClick={handleSignInClick}
                style={{ backgroundColor: isLogin ? '#4B5563' : '#FFFFFF', color: isLogin ? '#FFFFFF' : '#000000' }}
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
                    className="px-4 py-2 border border-gray-200 rounded-xl focus:border-black transition-colors w-full"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
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
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    required
                  />
                  <input
                    id="lastName"
                    type="text"
                    className="px-4 py-2 border border-gray-200 rounded-xl focus:border-black transition-colors w-full flex-1"
                    placeholder="Last name"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
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
                    className="px-4 py-2 border border-gray-200 rounded-xl focus:border-black transition-colors w-full"
                    placeholder="+1 (555) 123-4567"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
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
                    onChange={(e) => {
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
                    className="px-4 py-2 border border-gray-200 rounded-xl focus:border-black transition-colors w-full"
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
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
  return (
    <ErrorBoundary>
      <ToastProvider>
        <Suspense fallback={
          <div className="min-h-screen flex items-center justify-center">
            <div className="text-lg">Loading...</div>
          </div>
        }>
          <GuestAuthContent />
        </Suspense>
      </ToastProvider>
    </ErrorBoundary>
  );
}