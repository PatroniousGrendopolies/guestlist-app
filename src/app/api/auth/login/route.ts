import { NextRequest, NextResponse } from 'next/server';
import { UserRole } from '../../../../lib/types';
import { compare } from 'bcrypt-ts';

// Mock user database with a hashed password
// The original password is 'password123'
const mockUsers = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@example.com',
    password: '$2b$10$AdO.5YQ1R442mGHWMV5NzOUGiAfrwkgyIda/y69XOmNDniu.NC2cW',
    role: UserRole.MANAGER,
    emailVerified: new Date(),
  },
];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Find user
    const user = mockUsers.find(u => u.email === email);

    // Check if user exists
    if (!user) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Securely compare the provided password with the stored hash
    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Return user data (excluding password)
    const userWithoutPassword = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role, // Fixed typo here
    };

    return NextResponse.json({
      user: userWithoutPassword,
      message: 'Login successful',
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}


