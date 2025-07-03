'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase/client';

export default function TestJoinPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // For testing, use the logged-in user's guest ID from session storage
      const sessionData = sessionStorage.getItem('guestSession');
      let primaryGuestId = '22dcdbdc-bb85-4439-aac4-ed032d1af01a'; // Default test ID
      
      if (sessionData) {
        const guestSession = JSON.parse(sessionData);
        primaryGuestId = guestSession.guestId;
      }

      // Create friend as a regular guest, linked to the inviter
      const { data, error } = await supabase
        .from('guests')
        .insert({
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          invited_by_guest_id: primaryGuestId,
          invitation_status: 'confirmed'
        })
        .select()
        .single();

      if (error) {
        console.error('Error adding to guest list:', error);
        // Still show success for demo purposes
      } else {
        console.log('Successfully created guest:', data);
      }

      setSuccess(true);
    } catch (err) {
      console.error('Failed to join guest list:', err);
      // Still show success for demo purposes
      setSuccess(true);
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
                You've been added to Patrick's guest list for Summer Vibes.
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
                  DJ Shadow & MC Solar<br />
                  Saturday, June 24, 2025<br />
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
            <strong>Patrick Gregoire</strong> invited you to join their guest list for
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
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
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
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
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
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
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
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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