'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';

interface InviterInfo {
  name: string;
  email: string;
  availableSpots: number;
}

export default function JoinGuestListPage() {
  const params = useParams();
  const router = useRouter();
  const guestId = params.guestId as string;

  const [inviterInfo, setInviterInfo] = useState<InviterInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
  });

  useEffect(() => {
    const fetchInviterInfo = async () => {
      try {
        // Using singleton supabase client
        // Get inviter information
        const { data: guest, error } = await supabase
          .from('guests')
          .select('first_name, last_name, email')
          .eq('id', guestId)
          .single();

        if (error || !guest) {
          setError('Invalid invitation link');
          setIsLoading(false);
          return;
        }

        setInviterInfo({
          name: `${guest.first_name} ${guest.last_name}`,
          email: guest.email,
          availableSpots: 2, // TODO: Get actual available spots from database
        });
      } catch (err) {
        setError('Failed to load invitation');
      } finally {
        setIsLoading(false);
      }
    };

    if (guestId) {
      fetchInviterInfo();
    }
  }, [guestId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      // TODO: Add the friend to the guest list
      // For now, just simulate success
      await new Promise(resolve => setTimeout(resolve, 1000));

      console.log('Adding friend to guest list:', {
        inviterGuestId: guestId,
        friendInfo: formData,
      });

      setSuccess(true);
    } catch (err) {
      setError('Failed to join guest list. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center py-6xl px-xl">
        <div className="text-lg">Loading invitation...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center py-6xl px-xl">
        <div className="text-center">
          <h1 className="text-2xl font-light mb-lg text-red-600">Invalid Link</h1>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center py-6xl px-xl">
        <div className="w-full max-w-md text-center">
          <div className="card">
            <div className="card-body">
              <h1 className="text-2xl font-light mb-lg">🎉 You're on the list!</h1>
              <p className="text-gray-600 mb-xl">
                You've been added to {inviterInfo?.name}'s guest list for Summer Vibes.
              </p>

              {/* QR Code placeholder */}
              <div className="w-32 h-32 bg-black mx-auto mb-lg rounded-lg flex items-center justify-center">
                <span className="text-white text-xs">QR CODE</span>
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
            <strong>{inviterInfo?.name}</strong> invited you to join their guest list for
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

            <form onSubmit={handleSubmit} className="flex flex-col gap-lg">
              {error && (
                <div className="p-lg border border-gray-300 rounded-lg bg-gray-50">
                  <p className="text-sm text-gray-700">{error}</p>
                </div>
              )}

              <div className="flex gap-md">
                <div className="form-group flex-1">
                  <label htmlFor="firstName" className="form-label">
                    First Name
                  </label>
                  <input
                    id="firstName"
                    type="text"
                    className="input"
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
                    className="input"
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
                  className="input"
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
                  className="input"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-primary btn-lg mt-lg"
              >
                {isSubmitting ? 'Joining...' : 'Join Guest List'}
              </button>
            </form>
          </div>
        </div>

        {/* Info */}
        <div className="text-center mt-3xl">
          <p className="text-sm text-gray-500">
            By joining, you agree to receive event updates via text.
          </p>
        </div>
      </div>
    </div>
  );
}
