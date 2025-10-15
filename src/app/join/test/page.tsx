'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';
import { useToast, ToastProvider } from '@/components/ui/ToastProvider';
import ErrorBoundary from '@/components/ui/ErrorBoundary';

function TestJoinContent() {
  const searchParams = useSearchParams();
  const { showToast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [inviterName, setInviterName] = useState<string>('Patrick Gregoire');
  const [error, setError] = useState<string>('');

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    instagramHandle: '',
  });

  const [privacyAccepted, setPrivacyAccepted] = useState(false);

  // Load inviter information on component mount
  useEffect(() => {
    const loadInviterInfo = async () => {
      const inviterId = searchParams.get('inviter');
      if (inviterId) {
        try {
          const supabase = createClient();
          const { data: inviter, error } = await supabase
            .from('guests')
            .select('first_name, last_name')
            .eq('id', inviterId)
            .single();

          if (!error && inviter) {
            setInviterName(`${inviter.first_name} ${inviter.last_name}`);
          }
        } catch (err) {
          console.error('Failed to load inviter info:', err);
        }
      }
    };

    loadInviterInfo();
  }, [searchParams]);

  // Form validation
  const validateForm = (): boolean => {
    if (!formData.firstName.trim()) {
      setError('First name is required');
      showToast('Please enter your first name', 'error');
      return false;
    }

    if (!formData.lastName.trim()) {
      setError('Last name is required');
      showToast('Please enter your last name', 'error');
      return false;
    }

    if (!formData.email.trim()) {
      setError('Email is required');
      showToast('Please enter your email', 'error');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address');
      showToast('Please enter a valid email address', 'error');
      return false;
    }

    if (!formData.phone.trim()) {
      setError('Phone number is required');
      showToast('Please enter your phone number', 'error');
      return false;
    }

    if (!formData.instagramHandle.trim()) {
      setError('Instagram handle is required');
      showToast('Please enter your Instagram handle', 'error');
      return false;
    }

    if (!privacyAccepted) {
      setError('You must accept the privacy policy to continue');
      showToast('Please accept the privacy policy', 'error');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validate form
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const supabase = createClient();
      // Get inviter ID from URL params
      const inviterId = searchParams.get('inviter');

      if (!inviterId) {
        setError('Invalid invitation link');
        showToast('Invalid invitation link', 'error');
        setIsSubmitting(false);
        return;
      }

      // Check if email is already registered
      const { data: existingGuest, error: checkError } = await supabase
        .from('guests')
        .select('id')
        .eq('email', formData.email.trim())
        .single();

      if (checkError && checkError.code !== 'PGRST116') {
        // PGRST116 = no rows returned
        console.error('Error checking existing guest:', checkError);
        setError('Failed to validate email');
        showToast('Failed to validate email', 'error');
        setIsSubmitting(false);
        return;
      }

      if (existingGuest) {
        setError('This email is already registered');
        showToast('This email is already registered', 'error');
        setIsSubmitting(false);
        return;
      }

      // Create friend as a regular guest, linked to the inviter
      const { data, error } = await supabase
        .from('guests')
        .insert({
          first_name: formData.firstName.trim(),
          last_name: formData.lastName.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          instagram_handle: formData.instagramHandle.trim(),
          invited_by_guest_id: inviterId,
          invitation_status: 'confirmed',
        })
        .select()
        .single();

      if (error) {
        console.error('Error adding to guest list:', error);
        setError('Failed to join guest list');
        showToast('Failed to join guest list', 'error');
      } else {
        console.log('Successfully created guest:', data);
        showToast('Successfully joined the guest list!', 'success');
        setSuccess(true);
      }
    } catch (err) {
      console.error('Failed to join guest list:', err);
      setError('An unexpected error occurred');
      showToast('An unexpected error occurred', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center py-6xl px-xl">
        <div className="w-full max-w-md text-center">
          <div className="card">
            <div className="card-body">
              <h1 className="text-2xl font-light mb-lg">🎉 You're on the list!</h1>
              <p className="text-gray-600 mb-xl">
                You've been added to {inviterName}'s guest list for Summer Vibes.
              </p>

              {/* QR Code */}
              <div className="w-32 h-32 mx-auto mb-lg rounded-lg overflow-hidden">
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=128x128&data=FRIEND-${formData.firstName}-${formData.lastName}-SUMMER-VIBES-2025`}
                  alt="QR Code for entry"
                  className="w-full h-full object-cover"
                />
              </div>

              <p className="text-sm text-gray-600 mb-xl">
                Show this QR code (or your friend's) at the door for entry.
              </p>

              <div className="space-y-md">
                <div className="text-sm text-gray-600">
                  DJ Shadow & MC Solar
                  <br />
                  Saturday, June 24, 2025
                  <br />
                  10:00 PM
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-6xl px-xl">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-4xl">
          <h1 className="text-3xl font-light mb-lg">You're Invited!</h1>
          <p className="text-lg">
            <strong>{inviterName}</strong> invited you to join their guest list for
          </p>
          <p className="text-xl font-medium mt-sm">DJ Shadow & MC Solar</p>
          <p className="text-lg text-gray-600">Saturday, June 24, 2025</p>
        </div>

        {/* Form Card */}
        <div className="card">
          <div className="card-body">
            <p className="text-sm text-gray-600 mb-xl text-center">
              Just enter your info to get on the list:
            </p>

            {/* Error Message */}
            {error && (
              <div className="p-lg mb-lg border border-red-300 rounded-lg bg-red-50">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-lg">
              <div className="flex gap-md">
                <div className="form-group flex-1">
                  <label htmlFor="firstName" className="form-label">
                    First Name
                  </label>
                  <input
                    id="firstName"
                    type="text"
                    className="px-4 py-2 border border-gray-200 rounded-xl focus:border-black transition-colors w-full"
                    placeholder="First"
                    value={formData.firstName}
                    onChange={e => setFormData({ ...formData, firstName: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group flex-1">
                  <label htmlFor="lastName" className="form-label">
                    Last Name
                  </label>
                  <input
                    id="lastName"
                    type="text"
                    className="px-4 py-2 border border-gray-200 rounded-xl focus:border-black transition-colors w-full"
                    placeholder="Last"
                    value={formData.lastName}
                    onChange={e => setFormData({ ...formData, lastName: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="phone" className="form-label">
                  Phone Number
                </label>
                <input
                  id="phone"
                  type="tel"
                  className="px-4 py-2 border border-gray-200 rounded-xl focus:border-black transition-colors w-full"
                  placeholder="+1 (555) 123-4567"
                  value={formData.phone}
                  onChange={e => setFormData({ ...formData, phone: e.target.value })}
                  required
                />
              </div>

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

              {/* Privacy Policy Checkbox */}
              <div className="form-group">
                <label className="flex items-start gap-md">
                  <input
                    type="checkbox"
                    checked={privacyAccepted}
                    onChange={e => setPrivacyAccepted(e.target.checked)}
                    className="mt-1"
                    required
                  />
                  <span className="text-sm text-gray-600">
                    I agree to the{' '}
                    <a href="/privacy" className="text-black underline" target="_blank">
                      privacy policy
                    </a>{' '}
                    and consent to receive event updates via text and email.
                  </span>
                </label>
              </div>

              <button
                type="submit"
                disabled={isSubmitting || !privacyAccepted}
                className="bg-black text-white rounded-full py-3 px-6 text-sm w-full mt-lg hover:bg-gray-900 transition-colors disabled:bg-gray-200 disabled:text-gray-400"
              >
                {isSubmitting ? 'Joining...' : 'Join Guest List'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function TestJoinPage() {
  return (
    <ErrorBoundary>
      <ToastProvider>
        <Suspense
          fallback={
            <div className="min-h-screen flex items-center justify-center">
              <div className="text-lg">Loading...</div>
            </div>
          }
        >
          <TestJoinContent />
        </Suspense>
      </ToastProvider>
    </ErrorBoundary>
  );
}
