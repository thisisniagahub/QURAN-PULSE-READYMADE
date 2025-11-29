# CI/CD Setup for QuranPulse

This document explains the continuous integration and deployment setup for the QuranPulse application.

## Overview

The QuranPulse project includes a comprehensive CI/CD pipeline that enables automated testing, building, and deployment. The setup includes:

- GitHub Actions for CI/CD workflows
- Automatic deployment to Vercel
- Environment variable management
- Build optimization

## GitHub Actions Workflow

The deployment workflow is defined in `.github/workflows/deploy.yml` and includes the following steps:

### 1. Trigger Events
- Push to `main` or `master` branches
- Pull requests to `main` or `master` branches

### 2. Build Process
- Checks out the code
- Sets up Node.js environment
- Installs dependencies
- Builds the project with environment variables
- Deploys to Vercel

### 3. Required Secrets
The workflow requires the following secrets to be configured in your GitHub repository:

- `VERCEL_TOKEN`: Your Vercel access token
- `VERCEL_ORG_ID`: Your Vercel organization ID
- `VERCEL_PROJECT_ID`: Your Vercel project ID
- `VITE_SUPABASE_URL`: Your Supabase project URL
- `VITE_SUPABASE_ANON_KEY`: Your Supabase anon key

## Setting Up GitHub Secrets

To configure the required secrets:

1. Go to your GitHub repository
2. Navigate to Settings > Secrets and variables > Actions
3. Click "New repository secret" for each of the following:
   - `VERCEL_TOKEN`
   - `VERCEL_ORG_ID`
   - `VERCEL_PROJECT_ID`
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`

### How to Get Vercel Tokens

- **VERCEL_TOKEN**: Go to https://vercel.com/account/tokens
- **VERCEL_ORG_ID**: Find in your Vercel dashboard URL or project settings
- **VERCEL_PROJECT_ID**: Find in your Vercel project settings

## Environment Variables

The application uses the following environment variables:

### Frontend Variables (Vite)
These are prefixed with `VITE_` and available to the frontend:

- `VITE_SUPABASE_URL`: Your Supabase project URL (e.g., https://your-project.supabase.co)
- `VITE_SUPABASE_ANON_KEY`: Your Supabase anon key

These must be configured as secrets in GitHub Actions because they are build-time variables.

### Vercel Environment Variables

When deploying to Vercel, you also need to configure these in your Vercel project settings:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

## Deployment Process

### 1. Development
Developers work on feature branches and create pull requests

### 2. Pull Request Checks
When a pull request is created:
- The workflow runs and builds the project (for testing)
- This ensures the code builds correctly before merging

### 3. Merge to Main
When code is merged to main:
- The workflow builds and deploys to Vercel automatically
- The deployment is available at your Vercel project URL

### 4. Production Deployment
- Adding `--prod` flag in the Vercel CLI deploys to production
- This happens automatically when pushing to main branch

## Build Configuration

### Vite Build
The application uses Vite for building, with the following configuration:
- Output directory: `dist/`
- PWA enabled
- Code splitting for optimized loading
- Asset optimization

### vercel.json
The `vercel.json` file configures Vercel deployment:
- Static build using `@vercel/static-build`
- SPA routing (all routes serve `index.html`)

## Testing the Pipeline

### Local Testing
To test the build process locally:
```bash
npm run build
```

### GitHub Actions Testing
- Create a pull request to trigger the workflow
- Check the Actions tab in GitHub for build logs
- Verify the deployment succeeds

## Rollback Strategy

### Vercel Deployments
Vercel automatically maintains previous deployments:
- Easy rollback through Vercel dashboard
- Git-based deployment history
- Preview deployments for pull requests

## Best Practices

### 1. Branch Strategy
- Use feature branches for development
- Create pull requests for code review
- Merge to main only after approval

### 2. Environment Management
- Use different environment variables for different stages
- Separate dev, staging, and production configurations
- Never hardcode sensitive information

### 3. Security
- Rotate tokens regularly
- Limit access to deployment secrets
- Monitor deployment logs for suspicious activity

### 4. Monitoring
- Check deployment logs regularly
- Set up notifications for failed deployments
- Monitor application performance after deployment

## Troubleshooting

### Common Issues and Solutions

1. **Build fails due to missing environment variables**
   - Ensure all required secrets are set in GitHub
   - Check that variable names match exactly

2. **Deployment fails on Vercel**
   - Verify Vercel tokens and project IDs are correct
   - Check Vercel deployment logs for specific errors

3. **Environment variables not available in deployed app**
   - Ensure variables are prefixed with `VITE_`
   - Check that variables are set in both GitHub and Vercel
   - Variables added in Vercel will be available to the deployed application

### Debugging Steps
1. Check the GitHub Actions logs
2. Review Vercel deployment logs
3. Verify environment variable configuration
4. Test builds locally before pushing
5. Check repository secrets configuration

## Adding New Environment Variables

To add new environment variables:

1. Update the GitHub Actions workflow if the variable is needed during build
2. Add the secret to GitHub repository secrets
3. In the Vercel project settings, add the variable for runtime
4. Update this documentation to reflect the new variable
5. Make sure frontend variables are prefixed with `VITE_`

## Maintenance

### Regular Maintenance Tasks
- Rotate access tokens regularly
- Review and update dependencies
- Check for deprecated GitHub Actions
- Monitor deployment times and optimize if needed
- Clean up old Vercel deployments periodically

### Updates
- Keep GitHub Actions versions up to date
- Update Node.js version when appropriate
- Review and update Vercel CLI version if needed
- Monitor for new Vercel features and configuration options

This CI/CD setup ensures a smooth, automated deployment process with proper security measures and monitoring capabilities.