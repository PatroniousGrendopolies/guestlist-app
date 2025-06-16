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

interface Venue {
  id: string;
  name: string;
}

interface EventFormData {
  name: string;
  date: string;
  venue_id: string;
  max_total_capacity: number;
  status: string;
}

export default function CreateEventPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [venues, setVenues] = useState<Venue[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [formData, setFormData] = useState<EventFormData>({
    name: '',
    date: '',
    venue_id: '',
    max_total_capacity: 300,
    status: 'active'
  });

  useEffect(() => {
    const fetchUserAndVenues = async () => {
      try {
        // Check authentication and role
        const { data: { user: authUser }, error: authError } = await supabase.auth.getUser();
        
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

        // Fetch venues
        const { data: venuesData, error: venuesError } = await supabase
          .from('venues')
          .select('id, name')
          .order('name');

        if (venuesError) {
          console.error('Error fetching venues:', venuesError);
        } else {
          console.log('✅ Venues fetched:', venuesData);
          setVenues(venuesData || []);
          // Set default venue if available
          if (venuesData && venuesData.length > 0) {
            setFormData(prev => ({ ...prev, venue_id: venuesData[0].id }));
          }
        }

        setIsLoading(false);
      } catch (error) {
        console.error('Error in fetchUserAndVenues:', error);
        setIsLoading(false);
      }
    };

    fetchUserAndVenues();
  }, [router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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

    if (!formData.venue_id) {
      newErrors.venue_id = 'Venue is required';
    }

    if (formData.max_total_capacity < 1) {
      newErrors.max_total_capacity = 'Capacity must be at least 1';
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
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
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
                <label htmlFor="date" className="block text-sm font-medium text-gray-700">
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

              {/* Venue Selection */}
              <div>
                <label htmlFor="venue_id" className="block text-sm font-medium text-gray-700">
                  Venue *
                </label>
                <select
                  id="venue_id"
                  name="venue_id"
                  value={formData.venue_id}
                  onChange={handleInputChange}
                  className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${
                    errors.venue_id ? 'border-red-300' : ''
                  }`}
                >
                  <option value="">Select a venue</option>
                  {venues.map((venue) => (
                    <option key={venue.id} value={venue.id}>
                      {venue.name}
                    </option>
                  ))}
                </select>
                {errors.venue_id && <p className="mt-1 text-sm text-red-600">{errors.venue_id}</p>}
              </div>

              {/* Maximum Capacity */}
              <div>
                <label htmlFor="max_total_capacity" className="block text-sm font-medium text-gray-700">
                  Maximum Capacity *
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
                <p className="mt-1 text-sm text-gray-500">
                  Total number of guests that can attend this event
                </p>
              </div>

              {/* Event Status */}
              <div>
                <label htmlFor="status" className="block text-sm font-medium text-gray-700">
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
                  <option value="under_promoted">Under Promoted</option>
                  <option value="cancelled">Cancelled</option>
                </select>
                <p className="mt-1 text-sm text-gray-500">
                  Set the initial status for this event
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