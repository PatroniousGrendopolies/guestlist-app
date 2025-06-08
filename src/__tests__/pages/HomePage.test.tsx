import { render, screen } from '@testing-library/react';
import Home from '@/app/page';
import '@testing-library/jest-dom';

// Mock the auth function
jest.mock('@/lib/auth/auth', () => ({
  auth: jest.fn(),
}));

// Mock the redirect function from next/navigation
jest.mock('next/navigation', () => ({
  redirect: jest.fn(),
}));

describe('Home Page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders sign-in link when user is not authenticated', async () => {
    // Mock the auth function to return null (unauthenticated)
    jest.requireMock('@/lib/auth/auth').auth.mockResolvedValue(null);

    // Render the component
    const HomeComponent = await Home();
    if (HomeComponent) {
      render(HomeComponent);

      // Check if sign-in link is rendered
      expect(screen.getByText(/Sign In/i)).toBeInTheDocument();
    } else {
      throw new Error('Home component is null');
    }
  });
});
