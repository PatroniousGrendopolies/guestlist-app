#!/bin/bash

# Script to set up the database for the Guestlist App
# This script should be run after updating Node.js to version 18.18+

# Check Node.js version
NODE_VERSION=$(node -v)
REQUIRED_VERSION="v18.18.0"

# Compare versions
if [ "$(printf '%s\n' "$REQUIRED_VERSION" "$NODE_VERSION" | sort -V | head -n1)" = "$REQUIRED_VERSION" ]; then
  echo "Node.js version is compatible: $NODE_VERSION"
else
  echo "Error: Node.js version must be at least $REQUIRED_VERSION"
  echo "Current version: $NODE_VERSION"
  echo "Please update your Node.js version and try again."
  exit 1
fi

# Install dependencies
echo "Installing Prisma dependencies..."
npm install prisma @prisma/client

# Generate Prisma client
echo "Generating Prisma client..."
npx prisma generate

# Check if .env file exists
if [ ! -f .env ]; then
  echo "Creating .env file with example database URL..."
  echo 'DATABASE_URL="postgresql://username:password@localhost:5432/guestlist?schema=public"' > .env
  echo "Please update the DATABASE_URL in .env with your actual database credentials."
else
  echo ".env file already exists."
fi

# Ask if user wants to create database migrations
read -p "Do you want to create database migrations? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
  echo "Creating database migrations..."
  npx prisma migrate dev --name init
fi

echo "Database setup complete!"
