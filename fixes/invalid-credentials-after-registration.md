# Fix for Invalid Credentials After User Registration

## Problem

After a new user successfully registered through the registration page, they were unable to log in and received an "Invalid credentials" error.

## Root Cause

The application was using an in-memory JavaScript array (`mockUsers`) to store user data. In a development environment, different API routes (e.g., `/api/auth/register` and `/api/auth/login`) can be handled by separate, isolated server processes. When a user was created via the registration route, the in-memory array in that specific process was updated. However, when the user attempted to log in, the login route—running in a different process—was still referencing the original, unmodified in-memory array, and thus could not find the new user.

## Solution

To ensure data persistence and consistency across all API routes, the in-memory array was replaced with a simple file-based database (`mock-db.json`).

1.  A `mock-db.json` file was created to store the user objects.
2.  The registration API (`/api/auth/register`) was updated to read this JSON file, append the new user, and write the updated data back to the file.
3.  The login API (`/api/auth/login`) was updated to read from the same `mock-db.json` file to authenticate users.

This change guarantees that both registration and login operations work with the same, persistent data source, resolving the "Invalid credentials" error.
