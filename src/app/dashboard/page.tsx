'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getUser, useSignOut } from '@/lib/auth/auth';
import { UserRole } from '@/lib/types'; // Corrected import path
import Link from 'next/link';



export default function DashboardPage() {
  const router = useRouter();
  const signOut = useSignOut();
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const currentUser = getUser();
    if (!currentUser) {
      router.push('/auth/login');
    } else {
      setUser(currentUser);
      setIsLoading(false);
    }
  }, [router]);

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen"><div>Loading...</div></div>;
  }

  if (!user) {
    return null; // Fallback, should be redirected
  }

  const role = user.role || UserRole.GUEST;

  // Role-specific content (ensure all roles from enum are handled)
  const roleContent: Record<UserRole, React.ReactNode> = {
    [UserRole.MANAGER]: (
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Manager Dashboard</h2>
        <p>Welcome, {user.name}. Here you can manage staff, events, and view analytics.</p>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <DashboardCard
            title="Staff Management"
            description="Manage doormen, promoters, and DJs"
            link="/dashboard/staff"
          />
          <DashboardCard
            title="Events"
            description="Create and manage events"
            link="/dashboard/events"
          />
          <DashboardCard
            title="Analytics"
            description="View attendance and performance metrics"
            link="/dashboard/analytics"
          />
          <DashboardCard
            title="Settings"
            description="Configure application settings"
            link="/dashboard/settings"
          />
        </div>
      </div>
    ),
    [UserRole.DOORMAN]: (
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Doorman Dashboard</h2>
        <p>Welcome, {user.name}. Scan QR codes to check in guests.</p>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <DashboardCard
            title="QR Scanner"
            description="Scan QR codes to check in guests"
            link="/dashboard/scanner"
          />
          <DashboardCard
            title="Guest Lists"
            description="View tonight's guest lists"
            link="/dashboard/guest-lists"
          />
          <DashboardCard
            title="Manual Check-in"
            description="Check in guests without QR codes"
            link="/dashboard/manual-checkin"
          />
        </div>
      </div>
    ),
    [UserRole.PROMOTER]: (
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Promoter Dashboard</h2>
        <p>Welcome, Promoter. Here you can manage your guest lists and track performance.</p>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <DashboardCard
            title="My Guest Lists"
            description="Create and manage your guest lists"
            link="/dashboard/my-lists"
          />
          <DashboardCard
            title="Performance"
            description="View your guest attendance metrics"
            link="/dashboard/performance"
          />
          <DashboardCard
            title="Guest Signup Link"
            description="Get shareable links for guests to sign up"
            link="/dashboard/signup-links"
          />
        </div>
      </div>
    ),
    [UserRole.DJ]: (
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">DJ Dashboard</h2>
        <p>Welcome, DJ. Here you can manage your guest lists and view your events.</p>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <DashboardCard
            title="My Guest Lists"
            description="Create and manage your guest lists"
            link="/dashboard/my-lists"
          />
          <DashboardCard
            title="My Events"
            description="View your upcoming events"
            link="/dashboard/my-events"
          />
        </div>
      </div>
    ),
    [UserRole.GUEST]: (
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Guest Dashboard</h2>
        <p>Welcome, Guest. You should not be seeing this page.</p>
      </div>
    ),
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Guestlist App</h1>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-500">
              Signed in as <span className="font-medium">{user.email}</span> ({role})
            </span>
            <button
              onClick={signOut}
              className="rounded-md bg-indigo-600 px-3.5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign out
            </button>
          </div>
        </div>
      </header>
      <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="rounded-lg border-4 border-dashed border-gray-200 p-4">
              {roleContent[role as keyof typeof roleContent]}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

// Helper component for dashboard cards
function DashboardCard({
  title,
  description,
  link,
}: {
  title: string;
  description: string;
  link: string;
}) {
  return (
    <Link
      href={link}
      className="block rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md"
    >
      <h3 className="mb-2 text-lg font-medium">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
    </Link>
  );
}
