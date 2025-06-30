'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

interface FormData {
  djName: string;
  givenName: string;
  email: string;
  phone: string;
  instagram: string;
  password: string;
  confirmPassword: string;
}

interface EventInfo {
  id: string;
  name: string;
  date: string;
}

export default function DJSignupPage() {
  const [formData, setFormData] = useState<FormData>({
    djName: '',
    givenName: '',
    email: '',
    phone: '',
    instagram: '',
    password: '',
    confirmPassword: ''
  });
  const [eventInfo, setEventInfo] = useState<EventInfo | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [step, setStep] = useState(1);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const eventId = searchParams.get('event');
    if (eventId) {
      // Simulate fetching event info
      setEventInfo({
        id: eventId,
        name: 'Saturday Night Sessions',
        date: 'Saturday, July 6th, 2025'
      });
    }
  }, [searchParams]);

  const validateStep1 = () => {
    const newErrors: Partial<FormData> = {};
    
    if (!formData.djName.trim()) {
      newErrors.djName = 'DJ/Stage name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }
    
    if (!formData.instagram.trim()) {
      newErrors.instagram = 'Instagram handle is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors: Partial<FormData> = {};
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleNextStep = () => {
    if (validateStep1()) {
      setStep(2);
    }
  };

  const handleSubmit = async () => {
    if (!validateStep2()) return;

    setIsLoading(true);
    
    try {
      // Simulate API call to create DJ account
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Redirect to email verification or login
      router.push('/dj/verify-email?email=' + encodeURIComponent(formData.email));
      
    } catch (error) {
      console.error('Signup failed:', error);
      setErrors({ email: 'An error occurred. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInstagramChange = (value: string) => {
    // Auto-format Instagram handle
    let formatted = value.replace(/[^a-zA-Z0-9._]/g, '');
    if (formatted && !formatted.startsWith('@')) {
      formatted = '@' + formatted;
    }
    handleInputChange('instagram', formatted);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-black text-white p-6">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-light tracking-tight mb-2">Nightlist</h1>
          <p className="text-gray-300">
            {eventInfo ? `Create account for ${eventInfo.name}` : 'Create DJ Account'}
          </p>
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="max-w-2xl mx-auto p-6">
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center space-x-4">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
              step >= 1 ? 'bg-black text-white' : 'bg-gray-200 text-gray-500'
            }`}>
              1
            </div>
            <div className={`h-1 w-16 ${step >= 2 ? 'bg-black' : 'bg-gray-200'}`}></div>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
              step >= 2 ? 'bg-black text-white' : 'bg-gray-200 text-gray-500'
            }`}>
              2
            </div>
          </div>
        </div>

        {/* Step 1: Personal Information */}
        {step === 1 && (
          <div>
            <div className="text-center mb-8">
              <h2 className="text-2xl font-light mb-2">Tell us about yourself</h2>
              <p className="text-gray-600">We need some basic information to set up your DJ profile</p>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  DJ/Stage Name *
                </label>
                <input
                  type="text"
                  value={formData.djName}
                  onChange={(e) => handleInputChange('djName', e.target.value)}
                  className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:border-black transition-colors ${
                    errors.djName ? 'border-red-500' : 'border-gray-200'
                  }`}
                  placeholder="DJ Shadow"
                />
                {errors.djName && <p className="text-red-500 text-sm mt-1">{errors.djName}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Given Name (Optional)
                </label>
                <input
                  type="text"
                  value={formData.givenName}
                  onChange={(e) => handleInputChange('givenName', e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-black transition-colors"
                  placeholder="John Smith"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:border-black transition-colors ${
                    errors.email ? 'border-red-500' : 'border-gray-200'
                  }`}
                  placeholder="dj@example.com"
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:border-black transition-colors ${
                    errors.phone ? 'border-red-500' : 'border-gray-200'
                  }`}
                  placeholder="+1 (555) 123-4567"
                />
                {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Instagram Handle *
                </label>
                <input
                  type="text"
                  value={formData.instagram}
                  onChange={(e) => handleInstagramChange(e.target.value)}
                  className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:border-black transition-colors ${
                    errors.instagram ? 'border-red-500' : 'border-gray-200'
                  }`}
                  placeholder="@djshadow"
                />
                {errors.instagram && <p className="text-red-500 text-sm mt-1">{errors.instagram}</p>}
              </div>
            </div>

            <button
              onClick={handleNextStep}
              className="w-full mt-8 bg-black text-white py-4 rounded-xl font-medium text-lg hover:bg-gray-900 transition-colors"
            >
              Continue
            </button>
          </div>
        )}

        {/* Step 2: Create Password */}
        {step === 2 && (
          <div>
            <div className="text-center mb-8">
              <h2 className="text-2xl font-light mb-2">Create your password</h2>
              <p className="text-gray-600">Choose a secure password for your account</p>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password *
                </label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:border-black transition-colors ${
                    errors.password ? 'border-red-500' : 'border-gray-200'
                  }`}
                  placeholder="Enter password"
                />
                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                <p className="text-gray-500 text-sm mt-1">Must be at least 8 characters</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm Password *
                </label>
                <input
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                  className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:border-black transition-colors ${
                    errors.confirmPassword ? 'border-red-500' : 'border-gray-200'
                  }`}
                  placeholder="Confirm password"
                />
                {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
              </div>
            </div>

            {/* Event Info Reminder */}
            {eventInfo && (
              <div className="bg-gray-50 rounded-xl p-4 my-6">
                <h4 className="font-medium mb-2">You're signing up for:</h4>
                <p className="text-gray-600">{eventInfo.name}</p>
                <p className="text-gray-600 text-sm">{eventInfo.date}</p>
              </div>
            )}

            <div className="space-y-4 mt-8">
              <button
                onClick={handleSubmit}
                disabled={isLoading}
                className="w-full bg-black text-white py-4 rounded-xl font-medium text-lg hover:bg-gray-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Creating Account...
                  </div>
                ) : (
                  'Create Account'
                )}
              </button>

              <button
                onClick={() => setStep(1)}
                disabled={isLoading}
                className="w-full bg-white text-black border-2 border-black py-4 rounded-xl font-medium hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                Back
              </button>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="text-center mt-8 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            Already have an account?{' '}
            <button
              onClick={() => router.push('/dj/login')}
              className="text-black font-medium hover:underline"
            >
              Sign in here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}