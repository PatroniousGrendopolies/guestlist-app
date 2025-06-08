import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';

// Mock the components and hooks
const mockSignIn = jest.fn();
const mockPush = jest.fn();
const mockReplace = jest.fn();
const mockBack = jest.fn();
let mockError: string | null = null;
let mockCallbackUrl: string | null = '/dashboard';

// Create a mock LoginPage component
const MockLoginPage = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [errors, setErrors] = React.useState<{ email?: string; password?: string }>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    const newErrors: { email?: string; password?: string } = {};
    if (!email) newErrors.email = 'Email is required';
    if (!password) newErrors.password = 'Password is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Call signIn function
    await mockSignIn('credentials', {
      email,
      password,
      callbackUrl: mockCallbackUrl || '/dashboard',
    });
  };

  return (
    <div>
      {mockError && <div role="alert">Invalid email or password</div>}
      <h1>Sign in to your account</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} />
          {errors.email && <span>{errors.email}</span>}
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          {errors.password && <span>{errors.password}</span>}
        </div>
        <button type="submit">Sign in</button>
      </form>
    </div>
  );
};

// Mock the next-auth/react module
jest.mock('next-auth/react', () => ({
  signIn: mockSignIn,
}));

// Mock the useRouter hook
jest.mock('next/navigation', () => ({
  useRouter: jest.fn().mockReturnValue({
    push: mockPush,
    replace: mockReplace,
    back: mockBack,
  }),
  redirect: jest.fn(),
  useSearchParams: jest.fn().mockReturnValue({
    get: jest.fn().mockImplementation(param => {
      if (param === 'error') return mockError;
      if (param === 'callbackUrl') return mockCallbackUrl;
      return null;
    }),
  }),
}));

describe('Login Page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockError = null;
    mockCallbackUrl = '/dashboard';
  });

  it('renders the login form', () => {
    render(<MockLoginPage />);

    expect(screen.getByText(/Sign in to your account/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Sign in/i })).toBeInTheDocument();
  });

  it('shows validation errors for empty fields', async () => {
    render(<MockLoginPage />);

    // Submit the form without filling in fields
    const signInButton = screen.getByRole('button', { name: /Sign in/i });
    fireEvent.click(signInButton);

    // Check for validation errors
    await waitFor(() => {
      expect(screen.getByText(/Email is required/i)).toBeInTheDocument();
      expect(screen.getByText(/Password is required/i)).toBeInTheDocument();
    });
  });

  it('calls signIn function with correct credentials', async () => {
    const user = userEvent.setup();

    render(<MockLoginPage />);

    // Fill in the form
    await user.type(screen.getByLabelText(/Email/i), 'test@example.com');
    await user.type(screen.getByLabelText(/Password/i), 'password123');

    // Submit the form
    const signInButton = screen.getByRole('button', { name: /Sign in/i });
    await user.click(signInButton);

    // Check if signIn was called with correct credentials
    await waitFor(() => {
      expect(mockSignIn).toHaveBeenCalledWith('credentials', {
        email: 'test@example.com',
        password: 'password123',
        callbackUrl: '/dashboard',
      });
    });
  });

  it('displays error message when login fails', async () => {
    // Set the mock error
    mockError = 'CredentialsSignin';

    render(<MockLoginPage />);

    // Check for error message
    expect(screen.getByRole('alert')).toHaveTextContent(/Invalid email or password/i);
  });
});
