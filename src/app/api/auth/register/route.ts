import { NextRequest, NextResponse } from 'next/server';
import { hash } from 'bcrypt-ts';
import { promises as fs } from 'fs';
import path from 'path';
import { User, UserRole } from '../../../../lib/types';

// The user type from the DB includes the password and verification status
interface UserWithPassword extends User {
  password?: string | null;
  emailVerified: Date | null;
}

// Path to the mock database file
const dbPath = path.join(process.cwd(), 'src', 'lib', 'auth', 'mock-db.json');

async function readUsers(): Promise<UserWithPassword[]> {
  try {
    const data = await fs.readFile(dbPath, 'utf-8');
    return JSON.parse(data) as UserWithPassword[];
  } catch (_error) {
    // If file doesn't exist or is empty, return empty array
    return [];
  }
}

async function writeUsers(users: UserWithPassword[]) {
  await fs.writeFile(dbPath, JSON.stringify(users, null, 2));
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, password } = body;

    if (!name || !email || !password) {
      return NextResponse.json({ error: 'Name, email, and password are required' }, { status: 400 });
    }

    const users = await readUsers();

    const existingUser = users.find((u) => u.email === email);
    if (existingUser) {
      return NextResponse.json({ error: 'User with this email already exists' }, { status: 409 });
    }

    const hashedPassword = await hash(password, 10);

    const newUser: UserWithPassword = {
      id: String(users.length + 1),
      name,
      email,
      password: hashedPassword,
      role: UserRole.GUEST,
      emailVerified: null,
    };

    users.push(newUser);
    await writeUsers(users);

    const userWithoutPassword: User = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
    };

    return NextResponse.json(
      {
        message: 'User created successfully',
        user: userWithoutPassword,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
  }
}

