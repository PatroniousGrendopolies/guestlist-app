import { render, screen } from '../utils/test-utils';
import Dashboard from '@/app/dashboard/page';
import { mockUsers, mockSession } from '../utils/test-utils';
import '@testing-library/jest-dom';

// Mock the auth function
jest.mock('@/lib/auth/auth', () => ({
  auth: jest.fn(),
}));

// Mock the redirect function from next/navigation
jest.mock('next/navigation', () => ({
  redirect: jest.fn(),
}));

describe('Dashboard Page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders manager content when user is a manager', async () => {
    // Mock the auth function to return manager session
    jest.requireMock('@/lib/auth/auth').auth.mockResolvedValue(mockSession(mockUsers.manager));

    // Render the component
    const DashboardComponent = await Dashboard();
    // Make sure we're not passing null to render
    if (DashboardComponent) {
      render(DashboardComponent);

      // Check if manager-specific content is rendered
      expect(screen.getByText(/Manager Dashboard/i)).toBeInTheDocument();
    } else {
      throw new Error('Dashboard component is null');
    }
  });

  it('renders doorman content when user is a doorman', async () => {
    // Mock the auth function to return doorman session
    jest.requireMock('@/lib/auth/auth').auth.mockResolvedValue(mockSession(mockUsers.doorman));

    // Render the component
    const DashboardComponent = await Dashboard();
    // Make sure we're not passing null to render
    if (DashboardComponent) {
      render(DashboardComponent);

      // Check if doorman-specific content is rendered
      expect(screen.getByText(/Doorman Dashboard/i)).toBeInTheDocument();
    } else {
      throw new Error('Dashboard component is null');
    }
  });

  it('renders guest content when user is a guest', async () => {
    // Mock the auth function to return guest session
    jest.requireMock('@/lib/auth/auth').auth.mockResolvedValue(mockSession(mockUsers.guest));

    // Render the component
    const DashboardComponent = await Dashboard();
    // Make sure we're not passing null to render
    if (DashboardComponent) {
      render(DashboardComponent);

      // Check if guest-specific content is rendered
      expect(screen.getByText(/Guest Dashboard/i)).toBeInTheDocument();
    } else {
      throw new Error('Dashboard component is null');
    }
  });
});
