# Guestlist App

A streamlined mobile and web app built to handle nightclub guest list operations, featuring lightning-fast QR code check-in for doormen, seamless digital signup for guests, live analytics for managers, and efficient list distribution for promoters and DJs.

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Technology Stack

- **Frontend**: Next.js with TypeScript and Tailwind CSS
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js
- **Testing**: Jest and React Testing Library
- **Code Quality**: ESLint and Prettier
- **CI/CD**: GitHub Actions

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Database Setup

### Prerequisites

- PostgreSQL installed locally or a PostgreSQL database hosted in Canada (for Quebec privacy compliance)

### Setup Steps

1. Create a `.env` file in the root directory with the following content:

```
DATABASE_URL="postgresql://username:password@localhost:5432/guestlist?schema=public"
```

Replace `username`, `password`, and other values as needed for your PostgreSQL setup.

2. Install Prisma CLI (when Node.js version is updated to 18.18+):

```bash
npm install prisma --save-dev
```

3. Generate Prisma Client:

```bash
npx prisma generate
```

4. Run database migrations:

```bash
npx prisma migrate dev --name init
```

### Database Schema

The Prisma schema in `prisma/schema.prisma` defines the following models:

- `User`: For managers, doormen, promoters, and DJs
- `Event`: Nightclub events
- `Guest`: Guest information
- `GuestList`: Lists created by promoters/DJs
- `GuestListEntry`: Individual entries on guest lists with QR codes

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

### Edge Runtime Compatibility

This application uses Next.js middleware with Edge-safe code to ensure compatibility with Vercel's Edge Runtime. Authentication logic that requires Node.js features (like password hashing) is isolated to API routes running on Node.js runtime.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Quebec Privacy Compliance

To ensure compliance with Quebec privacy laws:

1. All data is stored in Canada
2. Only essential guest information is collected
3. Consent is explicitly obtained from guests
4. Right-to-be-forgotten functionality is implemented

## CI/CD Pipeline

This project uses GitHub Actions for continuous integration and deployment.

### Continuous Integration

On every push and pull request to the main branch, the CI pipeline:

1. Runs ESLint to check code quality
2. Verifies code formatting with Prettier
3. Runs database migrations on a test database
4. Executes all tests with Jest

### Continuous Deployment

When changes are pushed to the main branch and all tests pass:

1. The application is automatically built
2. The build is deployed to the production environment

### Setup Instructions

To set up the CI/CD pipeline:

1. Create the necessary GitHub repository secrets (see `.github/workflows/README.md`)
2. Choose your preferred deployment platform (Vercel or Netlify)
3. Uncomment the relevant deployment section in the workflow file

For detailed instructions, see the [CI/CD documentation](./.github/workflows/README.md).
