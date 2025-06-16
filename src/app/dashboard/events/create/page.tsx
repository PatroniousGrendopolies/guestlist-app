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


interface EventFormData {
  name: string;
  date: string;
  venue_id: string;
  max_total_capacity: number;
  status: string;
  description: string;
  guest_list_deadline: string;
  dj_approval_deadline: string;
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
    max_total_capacity: 300,
    status: 'active',
    description: '',
    guest_list_deadline: '',
    dj_approval_deadline: ''
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
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
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

    // Venue is automatically set to Datcha, no validation needed

    if (formData.max_total_capacity < 1) {
      newErrors.max_total_capacity = 'Capacity must be at least 1';
    }

    // Deadline validations
    if (!formData.guest_list_deadline) {
      newErrors.guest_list_deadline = 'Guest list deadline is required';
    } else {
      const deadline = new Date(formData.guest_list_deadline);
      const eventDate = new Date(formData.date);
      const now = new Date();
      
      if (deadline <= now) {
        newErrors.guest_list_deadline = 'Deadline must be in the future';
      } else if (deadline >= eventDate) {
        newErrors.guest_list_deadline = 'Deadline must be before the event date';
      }
    }

    if (!formData.dj_approval_deadline) {
      newErrors.dj_approval_deadline = 'DJ approval deadline is required';
    } else {
      const djDeadline = new Date(formData.dj_approval_deadline);
      const guestDeadline = new Date(formData.guest_list_deadline);
      const now = new Date();
      
      if (djDeadline <= now) {
        newErrors.dj_approval_deadline = 'DJ deadline must be in the future';
      } else if (formData.guest_list_deadline && djDeadline >= guestDeadline) {
        newErrors.dj_approval_deadline = 'DJ deadline must be before guest list deadline';
      }
    }

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
      const eventData = {
        ...formData,
        day_of_week: getDayOfWeek(formData.date),
        created_by_user_id: user!.id,
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

              {/* Venue (Fixed to Datcha) */}
              <div>
                <label htmlFor="venue_display" className="block text-sm font-medium text-black">
                  Venue
                </label>
                <input
                  type="text"
                  id="venue_display"
                  value="Datcha Nightclub"
                  disabled
                  className="mt-1 block w-full rounded-md border-gray-300 bg-gray-50 shadow-sm sm:text-sm text-gray-900"
                />
                <p className="mt-1 text-sm text-black">
                  Events are created for your venue
                </p>
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
                  Total allowed guestlist size (default: 300)
                </p>
              </div>

              {/* Event Description */}
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-black">
                  Event Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={3}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  placeholder="Optional description of the event..."
                />
                <p className="mt-1 text-sm text-black">
                  Optional description for the event
                </p>
              </div>

              {/* Guest List Deadline */}
              <div>
                <label htmlFor="guest_list_deadline" className="block text-sm font-medium text-black">
                  Guest List Deadline *
                </label>
                <input
                  type="datetime-local"
                  id="guest_list_deadline"
                  name="guest_list_deadline"
                  value={formData.guest_list_deadline}
                  onChange={handleInputChange}
                  className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${
                    errors.guest_list_deadline ? 'border-red-300' : ''
                  }`}
                />
                {errors.guest_list_deadline && <p className="mt-1 text-sm text-red-600">{errors.guest_list_deadline}</p>}
                <p className="mt-1 text-sm text-black">
                  Deadline for guest list submissions
                </p>
              </div>

              {/* DJ Approval Deadline */}
              <div>
                <label htmlFor="dj_approval_deadline" className="block text-sm font-medium text-black">
                  DJ Approval Deadline *
                </label>
                <input
                  type="datetime-local"
                  id="dj_approval_deadline"
                  name="dj_approval_deadline"
                  value={formData.dj_approval_deadline}
                  onChange={handleInputChange}
                  className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${
                    errors.dj_approval_deadline ? 'border-red-300' : ''
                  }`}
                />
                {errors.dj_approval_deadline && <p className="mt-1 text-sm text-red-600">{errors.dj_approval_deadline}</p>}
                <p className="mt-1 text-sm text-black">
                  Deadline for DJs to approve/deny guests (must be before guest list deadline)
                </p>
              </div>

              {/* Event Status */}
              <div>
                <label htmlFor="status" className="block text-sm font-medium text-black">
                  Event Status
                </label>
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                >
                  <option value="active">Active</option>
                  <option value="cancelled">Cancelled</option>
                  <option value="completed">Completed</option>
                  <option value="under_promoted">Under Promoted</option>
                </select>
                <p className="mt-1 text-sm text-black">
                  Current status of the event
                </p>
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