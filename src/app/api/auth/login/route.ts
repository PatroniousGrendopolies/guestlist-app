import { NextRequest, NextResponse } from 'next/server';
import { compare } from 'bcrypt-ts';
import { promises as fs } from 'fs';
import path from 'path';
import { User } from '../../../../lib/types';

// The user type from the DB includes the password
interface UserWithPassword extends User {
  password?: string | null;
}

// Path to the mock database file
const dbPath = path.join(process.cwd(), 'src', 'lib', 'auth', 'mock-db.json');

async function readUsers(): Promise<UserWithPassword[]> {
  try {
    const data = await fs.readFile(dbPath, 'utf-8');
    return JSON.parse(data) as UserWithPassword[];
    } catch {

    // If file doesn't exist or is empty, return empty array
    return [];
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    const users = await readUsers();
    const user = users.find((u) => u.email === email);

    if (!user || !user.password) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    // Return user data (excluding password)
    const userWithoutPassword: User = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };

    return NextResponse.json({
      user: userWithoutPassword,
      message: 'Login successful',
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
  }
}



