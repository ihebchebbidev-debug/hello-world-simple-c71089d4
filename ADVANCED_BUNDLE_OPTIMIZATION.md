# Advanced Bundle Size Reduction (Optional)

**Only needed if you exceed 1024 MB memory usage.**

## Step 1: Check Unused Dependencies

### Remove Cloudflare-specific packages
```bash
npm uninstall wrangler @cloudflare/vite-plugin @cloudflare/workers-types
```

### Analyze what's in node_modules
```bash
# See largest packages
npm ls --depth=0
```

## Step 2: Configure .vercelignore

Create `.vercelignore` to exclude unnecessary files from Vercel's build:

```
# Version control
.git
.gitignore
.env.example

# Documentation
*.md
docs/
DOCS/
README.*

# Build artifacts
dist/
build/
.next/
out/

# Development tools
.vscode
.idea
.DS_Store
Thumbs.db

# Turbopack/Webpack cache
.turbopack
.turbo

# Testing
coverage/
.nyc_output
cypress/videos
cypress/screenshots

# Cloudflare (if not using)
wrangler.json*
.wrangler/

# Environment
.env.local
.env.*.local

# Lock files (optional - Vercel can handle these)
# package-lock.json
# yarn.lock
```

## Step 3: Production-Only Dependencies

Ensure dev dependencies are NOT bundled:

**In `package.json`:**
```json
{
  "type": "module",
  "devDependencies": {
    "typescript": "^5.0.0",
    "vite": "^7.3.1",
    "eslint": "^8.0.0"
  },
  "dependencies": {
    "react": "^19.2.0",
    "react-dom": "^19.2.0"
  }
}
```

Run before deploying:
```bash
npm ci --omit=dev
```

## Step 4: Use npm Deduplicate

Remove duplicate packages:
```bash
npm dedupe
npm audit fix
```

## Step 5: Profile Your Build

Check what's taking up space:

```bash
# Install analysis tool
npm install --save-dev vite-plugin-visualizer

# Update vite.config.ts:
# import { visualizer } from 'vite-plugin-visualizer';
#
# export default {
#   plugins: [visualizer({ open: true })]
# }

npm run build

# This creates dist/stats.html - shows bundle breakdown
```

## Step 6: Code Splitting Optimization

In your `vite.config.ts`, ensure routes are code-split:

```typescript
import { manualChunks } from 'vite';

export default {
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': [
            'react',
            'react-dom',
            '@tanstack/react-router',
            '@tanstack/react-query'
          ],
          'ui': [
            '@radix-ui/react-dialog',
            '@radix-ui/react-dropdown-menu',
            'lucide-react'
          ],
          'supabase': ['@supabase/supabase-js']
        }
      }
    }
  }
}
```

## Step 7: Use Dynamic Imports

Heavy libraries should load on-demand:

```typescript
// Before: Loads immediately
import ReactQuill from 'react-quill';

// After: Loads only when needed
const ReactQuill = lazy(() => import('react-quill'));

export function Editor() {
  return (
    <Suspense fallback={<div>Loading editor...</div>}>
      <ReactQuill />
    </Suspense>
  );
}
```

## Step 8: Enable Compression

Add to `vercel.json`:

```json
{
  "env": {
    "NODE_ENV": "production"
  },
  "headers": [
    {
      "source": "/api/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=3600"
        }
      ]
    }
  ]
}
```

## Step 9: Monitor After Each Optimization

Check Vercel Dashboard → Analytics → Serverless Functions:
- **Build Size**: Should decrease
- **Function Size**: Should stay under 1024 MB
- **Execution Memory**: Monitor max used during requests

## Step 10: If Still Over Limit

### Option A: Upgrade to Pro Plan
Most reliable and recommended for production apps.

### Option B: Switch to Edge Functions for Static Routes
```bash
# Move static routes to edge
mkdir api/edge

# Create api/edge/homepage.ts
export const config = { runtime: 'edge' };

export default async (request: Request) => {
  const url = new URL(request.url);
  if (url.pathname === '/') {
    return new Response('Homepage');
  }
  return new Response('Not found', { status: 404 });
};
```

### Option C: Split into Multiple Functions
```bash
mkdir -p api/{ssr,api,static}

# api/ssr/index.js - Main SSR server
# api/api/leads.js - API endpoints  
# api/static/index.js - Static content
```

Then in `vercel.json`:
```json
{
  "functions": {
    "api/ssr/index.js": { "memory": 512 },
    "api/api/*.js": { "memory": 256 },
    "api/static/index.js": { "memory": 128 }
  }
}
```

---

## Summary Table

| Issue | Solution | Difficulty |
|-------|----------|------------|
| Over 2048 MB | Upgrade to Pro | ⭐ Easy |
| Over 1024 MB | Remove unused deps | ⭐ Easy |
| Over 800 MB | Code split & lazy load | ⭐⭐ Medium |
| Over 500 MB | Use Edge Functions | ⭐⭐ Medium |
| Over 300 MB | Full bundle optimization | ⭐⭐⭐ Hard |

**Current Status:** 1024 MB is healthy for most apps. You're good to go! 🚀
