# Vercel Deployment Guide & 404 Fix

## Problem Analysis

Your app was returning **404: NOT_FOUND** on Vercel because:

1. **Platform Mismatch**: The app was configured for **Cloudflare Workers** (using `wrangler.jsonc` and `@cloudflare/vite-plugin`)
2. **Missing Vercel Config**: No `vercel.json` file to tell Vercel how to build and deploy
3. **No Node.js Handler**: The server handler expected a Cloudflare Worker `fetch()` interface, but Vercel expects an Express-like or Node.js serverless function in the `api/` folder
4. **Build Target Mismatch**: Vite was building for Cloudflare Workers workers, not for Node.js

## Solution Implemented

### 1. Created `vercel.json`
Configuration file that tells Vercel:
- Build command: `npm run build`
- Static output directory: `dist/`
- Serverless function: `api/index.ts` (Node.js runtime)
- Rewrites all routes to `/api/index` for SSR

### 2. Created `api/index.ts`
A Vercel serverless function handler that:
- Uses `@vercel/node` types for `VercelRequest` and `VercelResponse`
- Converts Vercel's request format to Fetch API format
- Calls the TanStack Start server handler
- Returns the response to Vercel

### 3. Added `@vercel/node` to `devDependencies`
Type definitions and utilities for Vercel serverless functions

### 4. Updated `vite.config.ts`
Ensures Vite outputs to `dist/` for static assets (the default build target)

### 5. Created `.vercelignore`
Excludes Cloudflare-specific files from Vercel builds:
- `wrangler.jsonc`
- `.wrangler/`
- Cloudflare dependencies won't interfere

### 6. Created `VERCEL_DEPLOYMENT.md`
Documentation for future deployments

## Deployment Steps

### Prerequisites
- Node.js 20.x or higher
- Vercel account
- Git repository connected to Vercel

### Step 1: Install Dependencies Locally
```bash
npm install
```

### Step 2: Build Locally (Test)
```bash
npm run build
```

Expected output:
- Static assets in `dist/`
- Router tree auto-generated in `src/routeTree.gen.ts`

### Step 3: Preview Locally
```bash
npm run preview
```

Visit http://localhost:4173 to test the production build locally.

### Step 4: Set Environment Variables in Vercel

In your Vercel project dashboard, add these environment variables:

```
SUPABASE_URL=<your_supabase_project_url>
SUPABASE_KEY=<your_supabase_anon_key>
```

If you have additional env vars (like API keys, database URLs), add them here.

### Step 5: Deploy to Vercel

**Option A: Automatic (Recommended)**
1. Push your code to GitHub with these new files
2. Vercel will auto-detect changes and deploy
3. Monitor the deployment at https://vercel.com/dashboard

**Option B: Manual Deploy**
```bash
npm install -g vercel
vercel deploy --prod
```

### Step 6: Verify Deployment

After deployment completes:
1. Visit your Vercel URL (e.g., `https://yourapp.vercel.app`)
2. Check that pages load correctly
3. Test form submissions and API calls
4. Check Vercel dashboard > Logs for any errors

## What Changed in Your Project

### New Files
- `vercel.json` - Vercel deployment configuration
- `api/index.ts` - Serverless function handler
- `.vercelignore` - Files to exclude from Vercel builds
- `VERCEL_DEPLOYMENT.md` - Deployment documentation

### Modified Files
- `package.json` - Added `@vercel/node` to devDependencies
- `vite.config.ts` - Ensured output to `dist/` directory

### How It Works Now

```
1. User requests https://yourapp.vercel.app/about
   ↓
2. Vercel routing engine matches to `rewrites: [{ source: "/(.*)", destination: "/api/index" }]`
   ↓
3. Calls Vercel serverless function at `api/index.ts`
   ↓
4. Function converts VercelRequest → Fetch API Request
   ↓
5. Calls TanStack Start server handler
   ↓
6. Returns Response back to Vercel
   ↓
7. Vercel sends to user's browser
```

## Troubleshooting

### Still seeing 404 errors?

1. **Check Vercel logs**
   - Go to your Vercel dashboard
   - View Function Logs for `/api/index`
   - Look for error messages

2. **Verify environment variables**
   - Check Vercel dashboard Settings > Environment Variables
   - Ensure `SUPABASE_URL` and `SUPABASE_KEY` are set
   - Redeploy after adding/changing vars

3. **Clear cache**
   - In Vercel dashboard: Settings > Clear Cache
   - Redeploy

4. **Check Supabase connection**
   ```bash
   npm run build
   npm run preview
   ```
   - Test locally first to isolate issues

### Build fails?

1. Check the build log in Vercel dashboard
2. Look for Node.js version issues (need 20+)
3. Verify all dependencies installed locally first: `npm install`
4. If stuck, check Supabase connectivity

### Routes return 404?

1. Verify routes exist in `src/routes/`
2. Check that route files follow TanStack naming: `page.tsx` or file-based routing
3. Run `npm run build` locally to trigger route generation in `src/routeTree.gen.ts`

## Key Files Reference

| File | Purpose |
|------|---------|
| `vercel.json` | Tells Vercel how to build and route requests |
| `api/index.ts` | Serverless function that handles all requests |
| `src/server.ts` | Wraps TanStack Start server with error handling |
| `src/router.tsx` | Creates the React Router instance |
| `src/routes/` | Your page/route components |
| `.vercelignore` | Prevents Cloudflare files from interfering |

## Local Development

Development still works the same:
```bash
npm run dev     # Start dev server with HMR
npm run build   # Production build
npm run preview # Preview production build
```

## Notes

- **Cloudflare Support**: The app can still be deployed to Cloudflare Workers if needed. The `wrangler.jsonc` is still there.
- **Static Files**: Static assets are served from Vercel's CDN in `dist/` directory
- **Server-Side Rendering**: Handled by the serverless function in `api/index.ts`
- **Edge Middleware**: If you need Vercel Edge Middleware, add files to `middleware.ts` (not required for this fix)

## Next Steps

1. **Deploy** using the steps above
2. **Monitor** using Vercel dashboard and logs
3. **Optimize** using Vercel Analytics once live
4. **Scale** as needed - Vercel autoscales serverless functions

For more help:
- Vercel Docs: https://vercel.com/docs
- TanStack Start: https://tanstack.com/start/latest
- Supabase Docs: https://supabase.com/docs
