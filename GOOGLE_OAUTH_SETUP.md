# Google OAuth Setup Guide

This guide explains how to configure Google OAuth for the guest authentication flow.

## Prerequisites

- Google Cloud Console account
- Access to the project's environment variables (Netlify)

## Step 1: Create Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Note your Project ID

## Step 2: Enable Google+ API

1. In the Google Cloud Console, go to "APIs & Services" > "Library"
2. Search for "Google+ API"
3. Click "Enable"

## Step 3: Configure OAuth Consent Screen

1. Go to "APIs & Services" > "OAuth consent screen"
2. Choose "External" user type
3. Fill in the required information:
   - App name: "Nightlist"
   - User support email: Your email
   - Developer contact email: Your email
4. Add scopes:
   - `./auth/userinfo.email`
   - `./auth/userinfo.profile`
5. Add test users (optional for development)
6. Save and continue

## Step 4: Create OAuth 2.0 Credentials

1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "OAuth client ID"
3. Choose "Web application"
4. Configure:
   - Name: "Nightlist Web Client"
   - Authorized JavaScript origins:
     ```
     http://localhost:3000
     https://fluffy-horse-f5ca43.netlify.app
     https://your-custom-domain.com (if applicable)
     ```
   - Authorized redirect URIs:
     ```
     http://localhost:3000
     https://fluffy-horse-f5ca43.netlify.app
     https://your-custom-domain.com (if applicable)
     ```
5. Click "Create"
6. **Copy the Client ID** - you'll need this for the next step

## Step 5: Add Environment Variables

### For Local Development

Add to `.env.local`:
```bash
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-client-id-here.apps.googleusercontent.com
```

### For Production (Netlify)

Run these commands:
```bash
netlify env:set NEXT_PUBLIC_GOOGLE_CLIENT_ID "your-client-id-here.apps.googleusercontent.com"
```

Or add via Netlify Dashboard:
1. Go to Site Settings > Environment Variables
2. Add key: `NEXT_PUBLIC_GOOGLE_CLIENT_ID`
3. Add value: Your Client ID
4. Save

## Step 6: Test the Integration

1. Start your development server: `npm run dev`
2. Go to `/guest/auth`
3. Click "Continue with Google"
4. You should see the Google account selection popup
5. After selecting an account, you should be redirected to the guest dashboard

## How It Works

### Flow Overview

```
User clicks "Continue with Google"
  ↓
Google OAuth popup appears
  ↓
User selects/logs into Google account
  ↓
Google returns ID token (JWT)
  ↓
Frontend sends token to /api/auth/guest/google
  ↓
Backend verifies token with Google
  ↓
Backend creates/updates guest record
  ↓
Backend creates/updates guest_auth record
  ↓
Frontend receives guest session
  ↓
User redirected to /guest/dashboard
```

### Security Notes

- ID tokens are verified server-side using Google's OAuth2Client
- No passwords are stored for Google-authenticated users
- Email addresses are automatically verified (from Google)
- Guest records link to Google ID for future logins

## Troubleshooting

### "Invalid Client ID"
- Check that NEXT_PUBLIC_GOOGLE_CLIENT_ID is set correctly
- Verify the Client ID matches what's in Google Cloud Console
- Make sure the environment variable starts with `NEXT_PUBLIC_` (required for Next.js client-side access)

### "Redirect URI Mismatch"
- Go to Google Cloud Console > Credentials
- Edit your OAuth 2.0 Client
- Add the exact URL you're testing from to "Authorized JavaScript origins"
- Add the same URL to "Authorized redirect URIs"

### "Access Blocked: This app's request is invalid"
- Complete the OAuth consent screen configuration
- Make sure you've added your test email to the test users list (if using external user type)
- Check that the required scopes are enabled

### Button Not Appearing
- Open browser console and check for errors
- Verify NEXT_PUBLIC_GOOGLE_CLIENT_ID is set
- Check that @react-oauth/google is installed: `npm list @react-oauth/google`
- Try clearing browser cache and reloading

## Files Modified

- `/src/app/guest/auth/page.tsx` - Added GoogleLogin component
- `/src/app/api/auth/guest/google/route.ts` - OAuth callback handler
- `package.json` - Added @react-oauth/google and google-auth-library

## Additional Resources

- [Google OAuth 2.0 Documentation](https://developers.google.com/identity/protocols/oauth2)
- [@react-oauth/google Documentation](https://www.npmjs.com/package/@react-oauth/google)
- [Next.js Environment Variables](https://nextjs.org/docs/basic-features/environment-variables)
