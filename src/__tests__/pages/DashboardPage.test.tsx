import { render, screen, waitFor } from '../utils/test-utils';
import Dashboard from '@/app/dashboard/page';
import { mockUsers } from '../utils/test-utils';
import '@testing-library/jest-dom';

// Mock Supabase client
jest.mock('@/lib/supabase/client', () => ({
  supabase: {
    auth: {
      getUser: jest.fn(),
      signOut: jest.fn(),
    },
  },
}));

// Mock next/navigation
const mockPush = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

describe('Dashboard Page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders manager content when user is a manager', async () => {
    // Mock the Supabase auth to return manager user
    const { supabase } = jest.requireMock('@/lib/supabase/client');
    supabase.auth.getUser.mockResolvedValue({
      data: {
        user: {
          id: mockUsers.manager.id,
          email: mockUsers.manager.email,
          user_metadata: {
            full_name: mockUsers.manager.name,
            role: mockUsers.manager.role,
          },
        },
      },
    });

    render(<Dashboard />);

    // Wait for the component to load and render manager content
    await waitFor(() => {
      expect(screen.getByText(/Manager Dashboard/i)).toBeInTheDocument();
    });
  });

  it('renders doorman content when user is a doorman', async () => {
    // Mock the Supabase auth to return doorman user
    const { supabase } = jest.requireMock('@/lib/supabase/client');
    supabase.auth.getUser.mockResolvedValue({
      data: {
        user: {
          id: mockUsers.doorman.id,
          email: mockUsers.doorman.email,
          user_metadata: {
            full_name: mockUsers.doorman.name,
            role: mockUsers.doorman.role,
          },
        },
      },
    });

    render(<Dashboard />);

    // Wait for the component to load and render doorman content
    await waitFor(() => {
      expect(screen.getByText(/Doorman Dashboard/i)).toBeInTheDocument();
    });
  });

  it('renders guest content when user is a guest', async () => {
    // Mock the Supabase auth to return guest user
    const { supabase } = jest.requireMock('@/lib/supabase/client');
    supabase.auth.getUser.mockResolvedValue({
      data: {
        user: {
          id: mockUsers.guest.id,
          email: mockUsers.guest.email,
          user_metadata: {
            full_name: mockUsers.guest.name,
            role: mockUsers.guest.role,
          },
        },
      },
    });

    render(<Dashboard />);

    // Wait for the component to load and render guest content
    await waitFor(() => {
      expect(screen.getByText(/Guest Dashboard/i)).toBeInTheDocument();
    });
  });
});
