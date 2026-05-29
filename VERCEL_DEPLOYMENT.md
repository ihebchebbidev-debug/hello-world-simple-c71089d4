# Vercel Deployment Configuration

This application is configured for deployment on Vercel with TanStack Start framework.

## Required Environment Variables

Add these to your Vercel project settings or `.env.production.local`:

```
SUPABASE_URL=<your_supabase_project_url>
SUPABASE_KEY=<your_supabase_anon_key>
```

## Build Process

The build process:
1. Runs `npm run build` which uses Vite to compile the React app
2. Outputs static assets to `dist/`
3. Compiles the server handler to `api/index.ts`
4. Vercel packages everything into serverless functions and static hosting

## Deployment

1. Connect your GitHub repo to Vercel
2. Add environment variables in Vercel dashboard
3. Push to your branch to trigger deployment
4. Vercel will automatically:
   - Build with the `build` command
   - Deploy static assets
   - Deploy the `api/index.ts` serverless function
   - Route all requests through `/api/index`

## Local Testing

To test locally before deploying:

```bash
npm install
npm run build
npm run preview
```

Visit http://localhost:4173 to test the build.
