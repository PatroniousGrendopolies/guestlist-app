import { NextRequest, NextResponse } from 'next/server';
import { hash } from 'bcrypt-ts';
import { promises as fs } from 'fs';
import path from 'path';
import { UserRole } from '../../../../lib/types';

// Path to the mock database file
const dbPath = path.join(process.cwd(), 'src', 'lib', 'auth', 'mock-db.json');

async function readUsers() {
  try {
    const data = await fs.readFile(dbPath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    // If the file doesn't exist, return an empty array
    return [];
  }
}

async function writeUsers(users: any) {
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

    const existingUser = users.find((u: any) => u.email === email);
    if (existingUser) {
      return NextResponse.json({ error: 'User with this email already exists' }, { status: 409 });
    }

    const hashedPassword = await hash(password, 10);

    const newUser = {
      id: String(users.length + 1),
      name,
      email,
      password: hashedPassword,
      role: UserRole.GUEST,
      emailVerified: null,
    };

    users.push(newUser);
    await writeUsers(users);

    return NextResponse.json(
      {
        message: 'User created successfully',
        user: { id: newUser.id, name: newUser.name, email: newUser.email, role: newUser.role },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
  }
}

