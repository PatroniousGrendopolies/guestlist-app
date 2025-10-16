import { render, screen, waitFor } from '@testing-library/react';
import Home from '@/app/page';
import '@testing-library/jest-dom';

// Mock Supabase client
jest.mock('@/lib/supabase/client', () => ({
  supabase: {
    auth: {
      getSession: jest.fn(),
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

// Mock Next.js Image component
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: { src: string; alt: string; [key: string]: unknown }) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} alt={props.alt || ''} />;
  },
}));

describe('Home Page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders sign-in link when user is not authenticated', async () => {
    // Mock the Supabase auth to return no session
    const { supabase } = jest.requireMock('@/lib/supabase/client');
    supabase.auth.getSession.mockResolvedValue({
      data: { session: null },
    });

    render(<Home />);

    // Wait for the component to load and render sign-in link
    await waitFor(() => {
      expect(screen.getByText(/Sign in/i)).toBeInTheDocument();
    });
  });

  it('redirects to dashboard when user is authenticated', async () => {
    // Mock the Supabase auth to return a session
    const { supabase } = jest.requireMock('@/lib/supabase/client');
    supabase.auth.getSession.mockResolvedValue({
      data: {
        session: {
          user: { id: '1', email: 'test@example.com' },
        },
      },
    });

    render(<Home />);

    // Wait for redirect to be called
    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/dashboard');
    });
  });
});
