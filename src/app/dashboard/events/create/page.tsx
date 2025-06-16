'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';
import { UserRole } from '@/types/enums';
import Link from 'next/link';

interface User {
  id: string;
  email: string;
  role: UserRole;
}


interface DJInvitation {
  dj_name: string;
  given_name: string;
  email: string;
  phone: string;
}

interface EventFormData {
  name: string;
  date: string;
  venue_id: string;
  max_total_capacity: number;
  dj_count: number;
  dj_invitations: DJInvitation[];
}

export default function CreateEventPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [formData, setFormData] = useState<EventFormData>({
    name: '',
    date: '',
    venue_id: '',
    max_total_capacity: 75,
    dj_count: 1,
    dj_invitations: [{ dj_name: '', given_name: '', email: '', phone: '' }]
  });

  useEffect(() => {
    const fetchUserAndVenues = async () => {
      try {
        // Check authentication and role
        const { data: { user: authUser } } = await supabase.auth.getUser();
        
        if (!authUser) {
          router.push('/auth/login');
          return;
        }

        // TEMPORARY: Force manager role for patgoire@gmail.com
        if (authUser.email === 'patgoire@gmail.com') {
          const appUser: User = {
            id: authUser.id,
            email: authUser.email,
            role: UserRole.MANAGER,
          };
          setUser(appUser);
        } else {
          // For other users, fetch from database
          const { data: profile } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', authUser.id)
            .single();

          if (!profile || profile.role !== 'MANAGER') {
            router.push('/dashboard');
            return;
          }

          const appUser: User = {
            id: authUser.id,
            email: authUser.email!,
            role: UserRole.MANAGER,
          };
          setUser(appUser);
        }

        // Fetch venues (specifically Datcha)
        const { data: venuesData, error: venuesError } = await supabase
          .from('venues')
          .select('id, name')
          .eq('name', 'Datcha Nightclub')
          .single();

        if (venuesError) {
          console.error('Error fetching Datcha venue:', venuesError);
        } else {
          console.log('✅ Datcha venue fetched:', venuesData);
          // Automatically set Datcha as the venue
          setFormData(prev => ({ ...prev, venue_id: venuesData.id }));
        }

        setIsLoading(false);
      } catch (error) {
        console.error('Error in fetchUserAndVenues:', error);
        setIsLoading(false);
      }
    };

    fetchUserAndVenues();
  }, [router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (name === 'dj_count') {
      const count = parseInt(value);
      const newInvitations = Array.from({ length: count }, (_, i) => 
        formData.dj_invitations[i] || { dj_name: '', given_name: '', email: '', phone: '' }
      );
      setFormData(prev => ({ 
        ...prev, 
        dj_count: count,
        dj_invitations: newInvitations 
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleDJInputChange = (index: number, field: keyof DJInvitation, value: string) => {
    setFormData(prev => ({
      ...prev,
      dj_invitations: prev.dj_invitations.map((dj, i) => 
        i === index ? { ...dj, [field]: value } : dj
      )
    }));
    
    // Clear DJ-specific errors
    const errorKey = `dj_${index}_${field}`;
    if (errors[errorKey]) {
      setErrors(prev => ({ ...prev, [errorKey]: '' }));
    }
  };

  const getDayOfWeek = (dateString: string): string => {
    const date = new Date(dateString);
    const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    return days[date.getDay()];
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Event name is required';
    }

    if (!formData.date) {
      newErrors.date = 'Event date is required';
    } else {
      const eventDate = new Date(formData.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (eventDate < today) {
        newErrors.date = 'Event date cannot be in the past';
      }
    }

    if (formData.max_total_capacity < 1) {
      newErrors.max_total_capacity = 'Capacity must be at least 1';
    }

    // DJ validations
    if (formData.dj_count < 1 || formData.dj_count > 6) {
      newErrors.dj_count = 'Must have between 1 and 6 DJs';
    }

    // Validate each DJ invitation
    formData.dj_invitations.forEach((dj, index) => {
      if (!dj.dj_name.trim()) {
        newErrors[`dj_${index}_dj_name`] = 'DJ name is required';
      }
      if (!dj.given_name.trim()) {
        newErrors[`dj_${index}_given_name`] = 'Given name is required';
      }
      if (!dj.email.trim()) {
        newErrors[`dj_${index}_email`] = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(dj.email)) {
        newErrors[`dj_${index}_email`] = 'Valid email is required';
      }
      if (!dj.phone.trim()) {
        newErrors[`dj_${index}_phone`] = 'Phone number is required';
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Prepare event data without DJ invitations
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { dj_invitations, dj_count, ...eventBasicData } = formData;
      const eventData = {
        ...eventBasicData,
        day_of_week: getDayOfWeek(formData.date),
        created_by_user_id: user!.id,
        status: 'active' // Default status
      };

      console.log('🚀 Creating event with data:', eventData);

      const { data, error } = await supabase
        .from('events')
        .insert([eventData])
        .select()
        .single();

      if (error) {
        console.error('❌ Error creating event:', error);
        setErrors({ submit: 'Failed to create event. Please try again.' });
      } else {
        console.log('✅ Event created successfully:', data);
        
        // TODO: Handle DJ invitations here
        // For now, we'll store DJ invitation data for future implementation
        // In a real implementation, you would:
        // 1. Create DJ invitation records in the database
        // 2. Send invitation emails to each DJ
        // 3. Set up the invitation acceptance workflow
        
        console.log('📨 DJ invitations to be sent:', formData.dj_invitations);
        
        router.push('/dashboard/events');
      }
    } catch (error) {
      console.error('💥 Unexpected error:', error);
      setErrors({ submit: 'An unexpected error occurred. Please try again.' });
    }

    setIsSubmitting(false);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/auth/login');
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div>Loading...</div>
      </div>
    );
  }

  if (!user || user.role !== UserRole.MANAGER) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-6 sm:px-6 lg:px-8">
          <div>
            <Link href="/dashboard/events" className="text-sm text-indigo-600 hover:text-indigo-500">
              ← Back to Events
            </Link>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Create New Event</h1>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-500">
              {user.email}
            </span>
            <button
              onClick={handleSignOut}
              className="rounded-md bg-indigo-600 px-3.5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
            >
              Sign out
            </button>
          </div>
        </div>
      </header>

      <main>
        <div className="mx-auto max-w-2xl py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <form onSubmit={handleSubmit} className="space-y-6 bg-white shadow-sm rounded-lg p-6">
              {/* Event Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-black">
                  Event Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${
                    errors.name ? 'border-red-300' : ''
                  }`}
                  placeholder="e.g., Saturday Night Party"
                />
                {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
              </div>

              {/* Event Date */}
              <div>
                <label htmlFor="date" className="block text-sm font-medium text-black">
                  Event Date *
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${
                    errors.date ? 'border-red-300' : ''
                  }`}
                />
                {errors.date && <p className="mt-1 text-sm text-red-600">{errors.date}</p>}
              </div>


              {/* Maximum Guest List Size */}
              <div>
                <label htmlFor="max_total_capacity" className="block text-sm font-medium text-black">
                  Maximum Guest List Size *
                </label>
                <input
                  type="number"
                  id="max_total_capacity"
                  name="max_total_capacity"
                  value={formData.max_total_capacity}
                  onChange={handleInputChange}
                  min="1"
                  className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${
                    errors.max_total_capacity ? 'border-red-300' : ''
                  }`}
                />
                {errors.max_total_capacity && <p className="mt-1 text-sm text-red-600">{errors.max_total_capacity}</p>}
                <p className="mt-1 text-sm text-black">
                  Total allowed guestlist size (default: 75)
                </p>
              </div>

              {/* DJ Invitation Section */}
              <div className="border-t pt-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">DJ Invitations</h3>
                
                {/* Number of DJs */}
                <div className="mb-6">
                  <label htmlFor="dj_count" className="block text-sm font-medium text-black">
                    Number of DJs *
                  </label>
                  <select
                    id="dj_count"
                    name="dj_count"
                    value={formData.dj_count}
                    onChange={handleInputChange}
                    className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${
                      errors.dj_count ? 'border-red-300' : ''
                    }`}
                  >
                    {[1, 2, 3, 4, 5, 6].map(num => (
                      <option key={num} value={num}>{num} DJ{num > 1 ? 's' : ''}</option>
                    ))}
                  </select>
                  {errors.dj_count && <p className="mt-1 text-sm text-red-600">{errors.dj_count}</p>}
                  <p className="mt-1 text-sm text-black">
                    Select the number of DJs to invite for this event (maximum 6)
                  </p>
                </div>

                {/* DJ Details */}
                {formData.dj_invitations.map((dj, index) => (
                  <div key={index} className="mb-6 p-4 border border-gray-200 rounded-lg">
                    <h4 className="text-md font-medium text-gray-900 mb-3">DJ {index + 1}</h4>
                    
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      {/* DJ Name */}
                      <div>
                        <label htmlFor={`dj_name_${index}`} className="block text-sm font-medium text-black">
                          DJ Name *
                        </label>
                        <input
                          type="text"
                          id={`dj_name_${index}`}
                          value={dj.dj_name}
                          onChange={(e) => handleDJInputChange(index, 'dj_name', e.target.value)}
                          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${
                            errors[`dj_${index}_dj_name`] ? 'border-red-300' : ''
                          }`}
                          placeholder="e.g., DJ Awesome"
                        />
                        {errors[`dj_${index}_dj_name`] && <p className="mt-1 text-sm text-red-600">{errors[`dj_${index}_dj_name`]}</p>}
                      </div>

                      {/* Given Name */}
                      <div>
                        <label htmlFor={`given_name_${index}`} className="block text-sm font-medium text-black">
                          Given Name *
                        </label>
                        <input
                          type="text"
                          id={`given_name_${index}`}
                          value={dj.given_name}
                          onChange={(e) => handleDJInputChange(index, 'given_name', e.target.value)}
                          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${
                            errors[`dj_${index}_given_name`] ? 'border-red-300' : ''
                          }`}
                          placeholder="e.g., John"
                        />
                        {errors[`dj_${index}_given_name`] && <p className="mt-1 text-sm text-red-600">{errors[`dj_${index}_given_name`]}</p>}
                      </div>

                      {/* Email */}
                      <div>
                        <label htmlFor={`email_${index}`} className="block text-sm font-medium text-black">
                          Email *
                        </label>
                        <input
                          type="email"
                          id={`email_${index}`}
                          value={dj.email}
                          onChange={(e) => handleDJInputChange(index, 'email', e.target.value)}
                          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${
                            errors[`dj_${index}_email`] ? 'border-red-300' : ''
                          }`}
                          placeholder="dj@example.com"
                        />
                        {errors[`dj_${index}_email`] && <p className="mt-1 text-sm text-red-600">{errors[`dj_${index}_email`]}</p>}
                      </div>

                      {/* Phone */}
                      <div>
                        <label htmlFor={`phone_${index}`} className="block text-sm font-medium text-black">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          id={`phone_${index}`}
                          value={dj.phone}
                          onChange={(e) => handleDJInputChange(index, 'phone', e.target.value)}
                          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${
                            errors[`dj_${index}_phone`] ? 'border-red-300' : ''
                          }`}
                          placeholder="(555) 123-4567"
                        />
                        {errors[`dj_${index}_phone`] && <p className="mt-1 text-sm text-red-600">{errors[`dj_${index}_phone`]}</p>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Submit Error */}
              {errors.submit && (
                <div className="rounded-md bg-red-50 p-4">
                  <p className="text-sm text-red-600">{errors.submit}</p>
                </div>
              )}

              {/* Form Actions */}
              <div className="flex justify-end space-x-3">
                <Link
                  href="/dashboard/events"
                  className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
                >
                  Cancel
                </Link>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Creating...' : 'Create Event'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}