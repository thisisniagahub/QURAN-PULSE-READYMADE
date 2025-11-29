# QuranPulse Deployment Guide

This guide explains how to deploy the QuranPulse application using various methods, from the simplest (Vercel) to containerized deployments (Docker).

## Prerequisites

Before deploying, you need:

1. A GitHub account to host the repository
2. A Supabase project with the QuranPulse database schema
3. Environment variables:
   - `VITE_SUPABASE_URL`: Your Supabase project URL
   - `VITE_SUPABASE_ANON_KEY`: Your Supabase anon key

## Method 1: Quick Deployment with Vercel (Recommended)

This is the fastest way to get your application online.

### Steps:

1. **Prepare your GitHub repository:**
   - Push your QuranPulse code to a GitHub repository
   - Make sure all files including `.gitignore`, `vercel.json`, and `package.json` are committed

2. **Create a Vercel account:**
   - Go to https://vercel.com
   - Sign up with your GitHub account

3. **Import your project:**
   - Click "New Project" 
   - Select your QuranPulse repository
   - Vercel will automatically detect it's a Vite project

4. **Configure environment variables:**
   - In the project settings, go to "Environment Variables"
   - Add:
     - `VITE_SUPABASE_URL`: Your Supabase project URL
     - `VITE_SUPABASE_ANON_KEY`: Your Supabase anon key

5. **Deploy:**
   - Click "Deploy"
   - Vercel will build and deploy your application automatically
   - You'll get a URL like `https://quranpulse.vercel.app`

6. **Set up custom domain (optional):**
   - In project settings, go to "Domains"
   - Add your custom domain

## Method 2: GitHub Actions + Vercel (Automated)

This method sets up automatic deployments when you push to your main branch.

### Steps:

1. **Set up Vercel:**
   - Complete steps 1-3 from Method 1

2. **Get Vercel tokens:**
   - Go to https://vercel.com/account/tokens
   - Create a new access token

3. **Get Vercel Project IDs:**
   - Go to your Vercel dashboard
   - Find your project and note the `Project ID`
   - Note your `Organization ID` from the dashboard URL

4. **Add GitHub secrets:**
   - Go to your repository on GitHub
   - Go to Settings > Secrets and variables > Actions
   - Add the following secrets:
     - `VERCEL_TOKEN`: Your Vercel access token
     - `VERCEL_ORG_ID`: Your Vercel organization ID
     - `VERCEL_PROJECT_ID`: Your Vercel project ID
     - `VITE_SUPABASE_URL`: Your Supabase project URL
     - `VITE_SUPABASE_ANON_KEY`: Your Supabase anon key

5. **Push to trigger deployment:**
   - Push any changes to your main branch
   - GitHub Actions will automatically deploy to Vercel

## Method 3: Docker Deployment

Use Docker for containerized deployment on any infrastructure.

### Steps:

1. **Build the Docker image:**
   ```bash
   docker build -t quranpulse .
   ```

2. **Run with environment variables:**
   ```bash
   docker run -d \
     --name quranpulse \
     -p 3000:3000 \
     -e VITE_SUPABASE_URL=your_supabase_url \
     -e VITE_SUPABASE_ANON_KEY=your_supabase_anon_key \
     quranpulse
   ```

3. **Or use docker-compose:**
   ```bash
   docker-compose up -d
   ```
   
   Make sure to update the `.env` file with your environment variables:
   ```
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

## Method 4: Manual Build and Deploy

For deployment to any static hosting service.

### Steps:

1. **Build the application locally:**
   ```bash
   npm run build
   ```

2. **Upload the `dist/` folder to your hosting service:**
   - Netlify, Firebase Hosting, AWS S3, etc.
   - Make sure to configure your hosting to serve `index.html` for all routes (for client-side routing)

3. **Configure environment variables:**
   - Set `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` as build-time environment variables

## Supabase Setup

Your application depends on Supabase for authentication and database. Make sure to:

1. Create a Supabase project at https://supabase.com
2. Import the QuranPulse database schema (see the ERD documentation)
3. Enable Row Level Security (RLS) policies
4. Configure authentication providers (Google, Email)
5. Note your project URL and anon key for environment variables

## Environment Variables

Required environment variables:

- `VITE_SUPABASE_URL`: Your Supabase project URL (e.g., https://your-project.supabase.co)
- `VITE_SUPABASE_ANON_KEY`: Your Supabase anon key (public key for client-side access)

## Post-Deployment Steps

1. **Configure PWA settings:**
   - The application is already configured as a PWA
   - Users can install it on their devices

2. **Set up analytics:**
   - Add your analytics tracking code if needed
   - The application is configured for PostHog analytics

3. **Configure SSL:**
   - If using Vercel, SSL is automatically handled
   - For other deployments, ensure HTTPS is configured

4. **Test the application:**
   - Verify all features work in the deployed environment
   - Test authentication, API calls, and database operations

## Troubleshooting

### Common Issues:

1. **Environment variables not loading:**
   - Ensure environment variables start with `VITE_`
   - Check that they are properly set in your deployment platform

2. **Supabase connection errors:**
   - Verify your Supabase URL and key are correct
   - Check that your Supabase project is active
   - Ensure authentication and RLS policies are properly configured

3. **Routing issues:**
   - For static hosting, ensure all routes serve `index.html`
   - Check the `vercel.json` or your hosting platform's redirect configuration

4. **Build errors:**
   - Ensure Node.js version is 18 or higher
   - Check that all dependencies install correctly
   - Verify TypeScript compilation passes

## Security Best Practices

1. **Never expose sensitive data** in environment variables
2. **Use secure connections** (HTTPS) in production
3. **Configure proper RLS policies** in Supabase
4. **Regularly rotate API keys** and tokens
5. **Implement proper input validation** on forms
6. **Update dependencies** regularly

## Scaling Considerations

- The application is designed to scale horizontally on Vercel
- Supabase handles database scaling automatically
- CDN is used for static assets
- Consider caching strategies for API responses