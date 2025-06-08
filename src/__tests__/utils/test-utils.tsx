import React, { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { UserRole } from '@/types/enums';
import '@testing-library/jest-dom';

// Define types for mock session
export interface MockUser {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
  role?: UserRole;
}

export interface MockSession {
  user: MockUser | null;
  expires: string;
}

// Create a custom render method that includes providers if needed
const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
  render(ui, { ...options });

// Create mock users for testing
export const mockUsers = {
  manager: {
    id: '1',
    name: 'Test Manager',
    email: 'manager@example.com',
    role: UserRole.MANAGER,
  },
  doorman: {
    id: '2',
    name: 'Test Doorman',
    email: 'doorman@example.com',
    role: UserRole.DOORMAN,
  },
  promoter: {
    id: '3',
    name: 'Test Promoter',
    email: 'promoter@example.com',
    role: UserRole.PROMOTER,
  },
  dj: {
    id: '4',
    name: 'Test DJ',
    email: 'dj@example.com',
    role: UserRole.DJ,
  },
  guest: {
    id: '5',
    name: 'Test Guest',
    email: 'guest@example.com',
    role: UserRole.GUEST,
  },
};

// Mock next-auth session
export const mockSession = (user: MockUser | null): MockSession => ({
  user,
  expires: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
});

// Mock auth function for testing
jest.mock('@/lib/auth/auth', () => ({
  auth: jest.fn(),
}));

// Custom render for testing with auth context
export function renderWithAuth(ui: React.ReactElement, options?: RenderOptions) {
  return render(ui, options);
}

// Add a simple test to avoid the "no tests" error
describe('Test Utils', () => {
  it('should provide mock users with correct roles', () => {
    expect(mockUsers.manager.role).toBe(UserRole.MANAGER);
    expect(mockUsers.doorman.role).toBe(UserRole.DOORMAN);
    expect(mockUsers.promoter.role).toBe(UserRole.PROMOTER);
    expect(mockUsers.dj.role).toBe(UserRole.DJ);
    expect(mockUsers.guest.role).toBe(UserRole.GUEST);
  });

  it('should render components with renderWithAuth function', () => {
    const TestComponent = () => <div>Test Component</div>;
    const { getByText } = renderWithAuth(<TestComponent />);
    expect(getByText('Test Component')).toBeInTheDocument();
  });
});

// Re-export everything from testing-library
export * from '@testing-library/react';
export { customRender as render };
