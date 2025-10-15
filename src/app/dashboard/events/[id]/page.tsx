'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';
import { UserRole } from '@/types/enums';
import Link from 'next/link';

interface User {
  id: string;
  email: string;
  role: UserRole;
}

interface Event {
  id: string;
  name: string;
  date: string;
  day_of_week: string;
  venue_id: string;
  status: string;
  max_total_capacity: number;
  created_at: string;
  venue?: {
    name: string;
    address: string;
  };
}

export default function EventDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const eventId = params.id as string;

  const [user, setUser] = useState<User | null>(null);
  const [event, setEvent] = useState<Event | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserAndEvent = async () => {
      try {
        const supabase = createClient();
        // Check authentication and role
        const {
          data: { user: authUser },
        } = await supabase.auth.getUser();

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

        // Fetch event details
        const { data: eventData, error: eventError } = await supabase
          .from('events')
          .select(
            `
            id,
            name,
            date,
            day_of_week,
            venue_id,
            status,
            max_total_capacity,
            created_at,
            venues:venue_id (
              name,
              address
            )
          `
          )
          .eq('id', eventId)
          .single();

        if (eventError) {
          console.error('Error fetching event:', eventError);
          router.push('/dashboard/events');
          return;
        }

        console.log('✅ Event fetched:', eventData);
        setEvent(eventData);
        setIsLoading(false);
      } catch (error) {
        console.error('Error in fetchUserAndEvent:', error);
        setIsLoading(false);
      }
    };

    fetchUserAndEvent();
  }, [router, eventId]);

  const handleSignOut = async () => {
    const supabase = createClient();
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

  if (!user || user.role !== UserRole.MANAGER || !event) {
    return null;
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'completed':
        return 'bg-gray-100 text-gray-800';
      case 'under_promoted':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-6 sm:px-6 lg:px-8">
          <div>
            <Link
              href="/dashboard/events"
              className="text-sm text-indigo-600 hover:text-indigo-500"
            >
              ← Back to Events
            </Link>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">{event.name}</h1>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-500">{user.email}</span>
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
        <div className="mx-auto max-w-4xl py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            {/* Event Overview */}
            <div className="bg-white shadow rounded-lg p-6 mb-6">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Event Details</h2>
                  <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Date</dt>
                      <dd className="mt-1 text-sm text-gray-900">{formatDate(event.date)}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Status</dt>
                      <dd className="mt-1">
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusColor(event.status)}`}
                        >
                          {event.status}
                        </span>
                      </dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Venue</dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        {event.venue?.name}
                        {event.venue?.address && (
                          <div className="text-xs text-gray-500">{event.venue.address}</div>
                        )}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Maximum Capacity</dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        {event.max_total_capacity} guests
                      </dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Day of Week</dt>
                      <dd className="mt-1 text-sm text-gray-900 capitalize">{event.day_of_week}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Created</dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        {new Date(event.created_at).toLocaleDateString()}
                      </dd>
                    </div>
                  </dl>
                </div>
                <div className="flex space-x-3">
                  <Link
                    href={`/dashboard/events/${event.id}/edit`}
                    className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                  >
                    Edit Event
                  </Link>
                </div>
              </div>
            </div>

            {/* Guest Lists Section (Placeholder for future) */}
            <div className="bg-white shadow rounded-lg p-6 mb-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Guest Lists</h3>
              <div className="text-center py-8">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <h4 className="mt-2 text-sm font-medium text-gray-900">No guest lists yet</h4>
                <p className="mt-1 text-sm text-gray-500">
                  Guest lists will appear here once DJs are invited and create their lists.
                </p>
              </div>
            </div>

            {/* Analytics Section (Placeholder for future) */}
            <div className="bg-white shadow rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Event Analytics</h3>
              <div className="text-center py-8">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
                <h4 className="mt-2 text-sm font-medium text-gray-900">No analytics data yet</h4>
                <p className="mt-1 text-sm text-gray-500">
                  Analytics will appear here once guests start signing up and checking in.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
