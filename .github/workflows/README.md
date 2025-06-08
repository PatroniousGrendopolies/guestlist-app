# CI/CD Pipeline Documentation

This document describes the CI/CD pipeline setup for the Guestlist App project.

## Overview

The CI/CD pipeline is implemented using GitHub Actions and consists of two main parts:

1. **Continuous Integration (CI)**: Runs tests and linting on every push and pull request
2. **Continuous Deployment (CD)**: Automatically deploys the application to production when changes are pushed to the main branch

## Workflow Files

- `ci.yml`: Handles testing and linting only
- `cd-vercel.yml`: Handles deployment to Vercel
- `cd-netlify.yml`: Handles deployment to Netlify
- `ci-cd.yml`: Combined workflow that handles both testing and deployment

## Required Secrets

To use these workflows, you need to set up the following secrets in your GitHub repository:

### For All Deployments
- `DATABASE_URL`: Connection string for your production database
- `NEXTAUTH_SECRET`: Secret key for NextAuth.js
- `PRODUCTION_URL`: Your production site URL

### For Vercel Deployment
- `VERCEL_TOKEN`: API token from Vercel

### For Netlify Deployment
- `NETLIFY_AUTH_TOKEN`: API token from Netlify
- `NETLIFY_SITE_ID`: ID of your Netlify site
- `NETLIFY_URL`: URL of your Netlify deployment

## Setting Up Secrets

1. Go to your GitHub repository
2. Click on "Settings"
3. Click on "Secrets and variables" → "Actions"
4. Click "New repository secret"
5. Add each required secret

## Choosing a Deployment Platform

The repository includes workflows for both Vercel and Netlify. Choose one based on your preference:

### Using Vercel
1. Create an account on Vercel
2. Create a new project
3. Generate a Vercel API token
4. Add the token as a GitHub secret
5. Use the `cd-vercel.yml` workflow or uncomment the Vercel section in `ci-cd.yml`

### Using Netlify
1. Create an account on Netlify
2. Create a new site
3. Generate a Netlify API token
4. Add the token and site ID as GitHub secrets
5. Use the `cd-netlify.yml` workflow or uncomment the Netlify section in `ci-cd.yml`

## Database Migrations

The CI workflow includes a step to run Prisma migrations. This ensures that your test database schema is up-to-date.

For production deployments, you should set up a migration step in your deployment process or run migrations manually before deploying.

## Compliance Considerations

Since the application needs to comply with Quebec privacy laws, ensure that:

1. Your database is hosted in Canada
2. Your deployment platform has Canadian region options
3. All data processing complies with local privacy regulations

## Monitoring and Logs

After deployment, you can monitor your application using:

- GitHub Actions run logs
- Vercel/Netlify deployment logs
- Application-specific monitoring tools
