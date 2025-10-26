'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';
import { UserRole } from '@/types/enums';
import Link from 'next/link';

// Define User interface
interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
}

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const handleSignOut = async () => {
    // Using singleton supabase client
    await supabase.auth.signOut();
    router.push('/auth/login');
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // Using singleton supabase client
        const {
          data: { user: authUser },
          error: authError,
        } = await supabase.auth.getUser();

        if (!authUser) {
          router.push('/auth/login');
          return;
        }

        // TEMPORARY WORKAROUND: Force manager role for patgoire@gmail.com
        let profile = null;

        if (authUser.email === 'patgoire@gmail.com') {
          profile = {
            role: 'MANAGER',
            first_name: 'Patrick',
            last_name: 'Gregoire',
            email: 'patgoire@gmail.com',
          };
        } else {
          // Try to fetch from database for other users
          const { data: fetchedProfile } = await supabase
            .from('profiles')
            .select('role, first_name, last_name, email')
            .eq('id', authUser.id)
            .single();
          profile = fetchedProfile;
        }

        // Build the user object with profile data
        let userRole = UserRole.GUEST;
        if (profile?.role) {
          // Map string role to enum
          userRole = profile.role as UserRole;
        }

        const appUser: User = {
          id: authUser.id,
          email: authUser.email!,
          name: profile
            ? `${profile.first_name || ''} ${profile.last_name || ''}`.trim() || authUser.email!
            : authUser.email!,
          role: userRole,
        };

        setUser(appUser);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching user:', error);
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const role = user.role || UserRole.GUEST;

  // Role-specific content
  const roleContent: Record<UserRole, React.ReactNode> = {
    [UserRole.OWNER]: (
      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-xl"
        style={{ gap: 'var(--space-xl)' }}
      >
        <DashboardCard
          title="Venue Settings"
          description="Configure venue details and defaults"
          link="/dashboard/venue-settings"
        />
        <DashboardCard
          title="Staff Management"
          description="Manage all staff and permissions"
          link="/dashboard/staff"
        />
        <DashboardCard
          title="Events"
          description="Create and manage events"
          link="/dashboard/events"
        />
        <DashboardCard
          title="Analytics"
          description="View comprehensive analytics"
          link="/dashboard/analytics"
        />
        <DashboardCard
          title="Notifications"
          description="Manage system notifications"
          link="/dashboard/notifications"
        />
        <DashboardCard
          title="Financial Reports"
          description="Revenue and expense tracking"
          link="/dashboard/finance"
        />
      </div>
    ),
    [UserRole.MANAGER]: (
      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-xl"
        style={{ gap: 'var(--space-xl)' }}
      >
        <DashboardCard
          title="Staff Management"
          description="Manage doorpersons, promoters, and DJs"
          link="/dashboard/staff"
        />
        <DashboardCard
          title="Events"
          description="Create and manage events"
          link="/dashboard/events"
        />
        <DashboardCard
          title="Analytics"
          description="View attendance and performance"
          link="/dashboard/analytics"
        />
        <DashboardCard
          title="Guest Lists"
          description="Review all guest lists"
          link="/dashboard/guest-lists"
        />
        <DashboardCard
          title="Bans & Security"
          description="Manage banned guests"
          link="/dashboard/bans"
        />
        <DashboardCard
          title="Settings"
          description="Configure app settings"
          link="/dashboard/settings"
        />
      </div>
    ),
    [UserRole.ASSISTANT_MANAGER]: (
      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-xl"
        style={{ gap: 'var(--space-xl)' }}
      >
        <DashboardCard
          title="Guest Lists"
          description="Review and approve lists"
          link="/dashboard/guest-lists"
        />
        <DashboardCard
          title="Capacity Requests"
          description="Handle capacity increases"
          link="/dashboard/capacity-requests"
        />
        <DashboardCard
          title="Analytics"
          description="View basic analytics"
          link="/dashboard/analytics"
        />
        <DashboardCard
          title="Tonight's Event"
          description="View current event details"
          link="/dashboard/tonight"
        />
      </div>
    ),
    [UserRole.DOORPERSON]: (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-xl" style={{ gap: 'var(--space-xl)' }}>
        <DashboardCard
          title="QR Scanner"
          description="Scan QR codes to check in guests"
          link="/dashboard/scanner"
          primary
        />
        <DashboardCard
          title="Guest Lists"
          description="View tonight's guest lists"
          link="/dashboard/guest-lists"
        />
        <DashboardCard
          title="Manual Check-in"
          description="Check in guests without QR"
          link="/dashboard/manual-checkin"
        />
        <DashboardCard
          title="Security Alerts"
          description="View banned guests"
          link="/dashboard/security"
        />
      </div>
    ),
    [UserRole.PROMOTER]: (
      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-xl"
        style={{ gap: 'var(--space-xl)' }}
      >
        <DashboardCard
          title="My Guest Lists"
          description="Create and manage your lists"
          link="/dashboard/my-lists"
        />
        <DashboardCard
          title="Performance"
          description="View your attendance metrics"
          link="/dashboard/performance"
        />
        <DashboardCard
          title="Guest Signup Link"
          description="Get shareable signup links"
          link="/dashboard/signup-links"
        />
        <DashboardCard
          title="Analytics"
          description="Track your guest conversions"
          link="/dashboard/my-analytics"
        />
      </div>
    ),
    [UserRole.DJ]: (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-xl" style={{ gap: 'var(--space-xl)' }}>
        <DashboardCard
          title="My Guest Lists"
          description="Create and manage your lists"
          link="/dashboard/my-lists"
        />
        <DashboardCard
          title="My Events"
          description="View your upcoming events"
          link="/dashboard/my-events"
        />
        <DashboardCard
          title="Guest Signup Link"
          description="Share with your fans"
          link="/dashboard/signup-links"
        />
        <DashboardCard
          title="Fan Analytics"
          description="See who's coming to see you"
          link="/dashboard/fan-analytics"
        />
      </div>
    ),
    [UserRole.STAFF]: (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-xl" style={{ gap: 'var(--space-xl)' }}>
        <DashboardCard
          title="Tonight's Event"
          description="Share guest list link with friends"
          link="/dashboard/tonight"
        />
        <DashboardCard
          title="My Guest List"
          description="View who's coming tonight"
          link="/dashboard/my-guests"
        />
      </div>
    ),
    [UserRole.VIP]: (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-xl" style={{ gap: 'var(--space-xl)' }}>
        <DashboardCard
          title="My QR Code"
          description="Get your permanent entry QR"
          link="/dashboard/vip-qr"
        />
        <DashboardCard
          title="VIP History"
          description="View your visit history"
          link="/dashboard/vip-history"
        />
      </div>
    ),
    [UserRole.GUEST]: (
      <div className="text-center" style={{ padding: 'var(--space-6xl) 0' }}>
        <h2
          className="text-2xl font-light"
          style={{
            color: 'var(--color-black)',
            marginBottom: 'var(--space-lg)',
          }}
        >
          Welcome, Guest
        </h2>
        <p
          className="text-lg"
          style={{
            color: 'var(--color-gray-600)',
            marginBottom: 'var(--space-2xl)',
          }}
        >
          You should not be seeing this page.
        </p>
        <Link href="/guest/auth" className="btn btn-primary">
          Go to Guest Portal
        </Link>
      </div>
    ),
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--color-white)' }}>
      {/* Header */}
      <header style={{ borderBottom: '1px solid var(--color-gray-200)' }}>
        <div
          className="container flex items-center justify-between"
          style={{ padding: 'var(--space-xl)' }}
        >
          <div className="flex items-center gap-3xl">
            <h1 className="text-2xl font-light" style={{ color: 'var(--color-black)' }}>
              Nightlist
            </h1>
            <nav className="hidden md:flex items-center gap-xl">
              <Link
                href="/dashboard"
                className="text-sm nav-link"
                style={{
                  color: 'var(--color-gray-600)',
                  transition: 'color var(--transition-normal)',
                  textDecoration: 'none',
                }}
                onMouseEnter={e => ((e.target as HTMLElement).style.color = 'var(--color-black)')}
                onMouseLeave={e =>
                  ((e.target as HTMLElement).style.color = 'var(--color-gray-600)')
                }
              >
                Dashboard
              </Link>
              {(role === UserRole.MANAGER || role === UserRole.OWNER) && (
                <>
                  <Link
                    href="/dashboard/events"
                    className="text-sm nav-link"
                    style={{
                      color: 'var(--color-gray-600)',
                      transition: 'color var(--transition-normal)',
                      textDecoration: 'none',
                    }}
                    onMouseEnter={e =>
                      ((e.target as HTMLElement).style.color = 'var(--color-black)')
                    }
                    onMouseLeave={e =>
                      ((e.target as HTMLElement).style.color = 'var(--color-gray-600)')
                    }
                  >
                    Events
                  </Link>
                  <Link
                    href="/dashboard/staff"
                    className="text-sm nav-link"
                    style={{
                      color: 'var(--color-gray-600)',
                      transition: 'color var(--transition-normal)',
                      textDecoration: 'none',
                    }}
                    onMouseEnter={e =>
                      ((e.target as HTMLElement).style.color = 'var(--color-black)')
                    }
                    onMouseLeave={e =>
                      ((e.target as HTMLElement).style.color = 'var(--color-gray-600)')
                    }
                  >
                    Staff
                  </Link>
                  <Link
                    href="/dashboard/analytics"
                    className="text-sm nav-link"
                    style={{
                      color: 'var(--color-gray-600)',
                      transition: 'color var(--transition-normal)',
                      textDecoration: 'none',
                    }}
                    onMouseEnter={e =>
                      ((e.target as HTMLElement).style.color = 'var(--color-black)')
                    }
                    onMouseLeave={e =>
                      ((e.target as HTMLElement).style.color = 'var(--color-gray-600)')
                    }
                  >
                    Analytics
                  </Link>
                </>
              )}
            </nav>
          </div>
          <div className="flex items-center gap-xl">
            <div className="text-right">
              <p className="text-sm font-medium" style={{ color: 'var(--color-black)' }}>
                {user.name}
              </p>
              <p className="text-xs" style={{ color: 'var(--color-gray-500)' }}>
                {role}
              </p>
            </div>
            <button onClick={handleSignOut} className="btn btn-ghost btn-sm">
              Sign Out
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container" style={{ padding: 'var(--space-4xl) var(--space-xl)' }}>
        {/* Welcome Section */}
        <div style={{ marginBottom: 'var(--space-4xl)' }}>
          <h2
            className="text-3xl font-light"
            style={{
              color: 'var(--color-black)',
              marginBottom: 'var(--space-lg)',
            }}
          >
            {getGreeting()}, {user.name.split(' ')[0] || user.email.split('@')[0]}
          </h2>
          <p className="text-lg" style={{ color: 'var(--color-gray-600)' }}>
            {getRoleDescription(role)}
          </p>
        </div>

        {/* Role-specific content */}
        {roleContent[role]}
      </main>
    </div>
  );
}

// Helper component for dashboard cards
function DashboardCard({
  title,
  description,
  link,
  primary = false,
}: {
  title: string;
  description: string;
  link: string;
  primary?: boolean;
}) {
  return (
    <Link
      href={link}
      className={`card group ${primary ? 'border-2' : ''}`}
      style={{
        ...(primary && { borderColor: 'var(--color-black)' }),
        textDecoration: 'none',
      }}
    >
      <div className="card-body">
        <div>
          <h3
            className="text-lg font-medium"
            style={{
              color: 'var(--color-black)',
              marginBottom: 'var(--space-sm)',
              transition: 'color var(--transition-normal)',
            }}
          >
            {title}
          </h3>
          <p className="text-sm" style={{ color: 'var(--color-gray-600)' }}>
            {description}
          </p>
        </div>
      </div>
    </Link>
  );
}

// Helper functions
function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 18) return 'Good afternoon';
  return 'Good evening';
}

function getRoleDescription(role: UserRole): string {
  const descriptions: Record<UserRole, string> = {
    [UserRole.OWNER]: 'You have full access to all system features and settings.',
    [UserRole.MANAGER]: "Manage your venue's staff, events, and analytics.",
    [UserRole.ASSISTANT_MANAGER]: 'Assist with daily operations and guest list management.',
    [UserRole.DOORPERSON]: 'Check in guests and manage door operations.',
    [UserRole.PROMOTER]: "Build and manage your guest lists for tonight's event.",
    [UserRole.DJ]: 'Manage your guest lists and view your upcoming performances.',
    [UserRole.STAFF]: "Invite your friends to tonight's event.",
    [UserRole.VIP]: 'Welcome to your VIP portal.',
    [UserRole.GUEST]: 'Welcome to the guest portal.',
  };
  return descriptions[role] || 'Welcome to the dashboard.';
}
