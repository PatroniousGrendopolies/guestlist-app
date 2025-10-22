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
  };
}

export default function EventsPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserAndEvents = async () => {
      try {
        // Using singleton supabase client
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

        // Fetch events with venue information
        const { data: eventsData, error: eventsError } = await supabase
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
              name
            )
          `
          )
          .order('date', { ascending: true });

        if (eventsError) {
          console.error('Error fetching events:', eventsError);
        } else {
          console.log('✅ Events fetched:', eventsData);
          setEvents(eventsData || []);
        }

        setIsLoading(false);
      } catch (error) {
        console.error('Error in fetchUserAndEvents:', error);
        setIsLoading(false);
      }
    };

    fetchUserAndEvents();
  }, [router]);

  const handleSignOut = async () => {
    // Using singleton supabase client
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
            <Link href="/dashboard" className="text-sm text-indigo-600 hover:text-indigo-500">
              ← Back to Dashboard
            </Link>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Events Management</h1>
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
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            {/* Header with Create Event button */}
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">All Events</h2>
              <Link
                href="/dashboard/events/create"
                className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                <svg
                  className="-ml-0.5 mr-1.5 h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                Create Event
              </Link>
            </div>

            {/* Events List */}
            {events.length === 0 ? (
              <div className="text-center py-12">
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
                    d="M8 7V3a1 1 0 011-1h6a1 1 0 011 1v4m-6 0h6M8 7h8v12a1 1 0 01-1 1H9a1 1 0 01-1-1V7z"
                  />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900">No events</h3>
                <p className="mt-1 text-sm text-gray-500">Get started by creating a new event.</p>
                <div className="mt-6">
                  <Link
                    href="/dashboard/events/create"
                    className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
                  >
                    <svg
                      className="-ml-0.5 mr-1.5 h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                    Create Event
                  </Link>
                </div>
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {events.map(event => (
                  <div
                    key={event.id}
                    className="relative rounded-lg border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between">
                      <div className="min-w-0 flex-1">
                        <h3 className="text-lg font-medium text-gray-900 truncate">{event.name}</h3>
                        <p className="text-sm text-gray-500 mt-1">{formatDate(event.date)}</p>
                        <p className="text-sm text-gray-500">
                          {event.venue?.name || 'Unknown Venue'}
                        </p>
                        <p className="text-sm text-gray-500">
                          Capacity: {event.max_total_capacity}
                        </p>
                      </div>
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusColor(event.status)}`}
                      >
                        {event.status}
                      </span>
                    </div>

                    <div className="mt-4 flex space-x-3">
                      <Link
                        href={`/dashboard/events/${event.id}`}
                        className="text-sm text-indigo-600 hover:text-indigo-500"
                      >
                        View Details
                      </Link>
                      <Link
                        href={`/dashboard/events/${event.id}/edit`}
                        className="text-sm text-gray-600 hover:text-gray-500"
                      >
                        Edit
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
