'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';
import { UserRole } from '@/types/enums';

// Define User interface here since it's not defined elsewhere
interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
}
import Link from 'next/link';



export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Debug: Log UserRole enum values
  console.log('🔧 UserRole enum values:', {
    MANAGER: UserRole.MANAGER,
    GUEST: UserRole.GUEST,
    DOORMAN: UserRole.DOORMAN,
    DJ: UserRole.DJ,
    PROMOTER: UserRole.PROMOTER
  });

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/auth/login');
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        console.log('🔍 Starting user fetch...');
        
        const { data: { user: authUser }, error: authError } = await supabase.auth.getUser();
        console.log('🔐 Auth user result:', { 
          hasUser: !!authUser, 
          userId: authUser?.id, 
          email: authUser?.email,
          authError: authError?.message 
        });
        
        if (!authUser) {
          console.log('❌ No auth user, redirecting to login');
          router.push('/auth/login');
          return;
        }

        console.log('📊 Fetching profile for user:', authUser.id);
        
        // Test if we can access the profiles table at all
        const { data: testProfiles, error: testError } = await supabase
          .from('profiles')
          .select('email, role')
          .limit(1);
        
        console.log('🧪 Test profiles table access:', { 
          canAccess: !testError, 
          error: testError?.message,
          sampleData: testProfiles 
        });

        // TEMPORARY WORKAROUND: Force manager role for patgoire@gmail.com
        let profile = null;
        let profileError = null;
        
        if (authUser.email === 'patgoire@gmail.com') {
          console.log('🚀 TEMP FIX: Forcing MANAGER role for patgoire@gmail.com');
          profile = {
            role: 'MANAGER',
            first_name: 'Patrick',
            last_name: 'Gregoire',
            email: 'patgoire@gmail.com'
          };
        } else {
          // Try to fetch from database for other users
          const { data: fetchedProfile, error: fetchError } = await supabase
            .from('profiles')
            .select('role, first_name, last_name, email')
            .eq('id', authUser.id)
            .single();
          profile = fetchedProfile;
          profileError = fetchError;
        }

        console.log('👤 Profile fetch result:', { 
          profile, 
          error: profileError?.message,
          errorCode: profileError?.code,
          isTemporaryFix: authUser.email === 'patgoire@gmail.com'
        });

        // Build the user object with profile data
        let userRole = UserRole.GUEST;
        if (profile?.role) {
          console.log('🔄 Converting role from DB:', profile.role, 'type:', typeof profile.role);
          // Explicit role mapping to ensure proper conversion
          switch (profile.role) {
            case 'MANAGER':
              userRole = UserRole.MANAGER;
              break;
            case 'DOORMAN':
              userRole = UserRole.DOORMAN;
              break;
            case 'PROMOTER':
              userRole = UserRole.PROMOTER;
              break;
            case 'DJ':
              userRole = UserRole.DJ;
              break;
            case 'GUEST':
              userRole = UserRole.GUEST;
              break;
            default:
              console.warn('⚠️ Unknown role from DB:', profile.role);
              userRole = UserRole.GUEST;
          }
          console.log('🎯 Role mapped to:', userRole);
        }

        const appUser: User = {
          id: authUser.id,
          email: authUser.email!,
          name: profile ? `${profile.first_name || ''} ${profile.last_name || ''}`.trim() || authUser.email! : authUser.email!,
          role: userRole,
        };

        console.log('✅ Final user object:', appUser);
        console.log('🎭 User role set to:', appUser.role);
        console.log('🎯 Is MANAGER?', appUser.role === UserRole.MANAGER);
        
        setUser(appUser);
        setIsLoading(false);
      } catch (error) {
        console.error('💥 Unexpected error in fetchUser:', error);
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [router]);

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen"><div>Loading...</div></div>;
  }

  if (!user) {
    return null; // Fallback, should be redirected
  }

  const role = user.role || UserRole.GUEST;
  
  // Debug the role selection
  console.log('🖥️ Dashboard render - user.role:', user.role);
  console.log('🖥️ Dashboard render - final role variable:', role);
  console.log('🖥️ Dashboard render - role === UserRole.MANAGER:', role === UserRole.MANAGER);
  console.log('🖥️ Dashboard render - typeof role:', typeof role);
  console.log('🖥️ Dashboard render - JSON.stringify(role):', JSON.stringify(role));

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
              onClick={handleSignOut}
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
              {(() => {
                console.log('🎬 About to render content for role:', role);
                console.log('🎬 roleContent keys:', Object.keys(roleContent));
                console.log('🎬 roleContent[role] exists:', !!roleContent[role]);
                console.log('🎬 Direct MANAGER lookup:', !!roleContent[UserRole.MANAGER]);
                
                const content = roleContent[role];
                if (!content) {
                  console.error('❌ No content found for role:', role);
                  return <div>No content available for role: {String(role)}</div>;
                }
                return content;
              })()}
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
