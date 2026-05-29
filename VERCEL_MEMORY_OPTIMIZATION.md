# Vercel Memory Optimization Guide

## Problem
Vercel Hobby plan serverless functions are limited to **2048 MB** of memory. Your function was requesting 3008 MB, which exceeds this limit.

## Solution Applied
✅ **Memory limit reduced to 1024 MB** in `vercel.json`

This is now within Hobby plan limits. If you need more memory in the future, upgrade to a Pro plan (team).

## Ways to Reduce Bundle Size & Memory Usage

### 1. **Code Splitting (Primary Optimization)**
Your TanStack Start app can use code splitting to reduce the server bundle size:

**In `vite.config.ts`, ensure routes are lazy-loaded:**
```typescript
// Routes should use lazy loading
export const Route = createFileRoute('/about')({
  component: () => import('./components/About').then(m => m.default)
})
```

### 2. **Tree-Shaking & Unused Dependencies**
Check for unused dependencies in `package.json`:

```bash
# Install npm-check-updates and analyze
npm ls --depth=0

# Remove unused packages
npm uninstall <unused-package>
```

### 3. **Environment Variables - Don't Bundle Secrets**
Ensure secrets are NOT hardcoded:

**✅ Good:**
```javascript
const dbUrl = process.env.DATABASE_URL; // Loaded at runtime
```

**❌ Bad:**
```javascript
const dbUrl = "postgresql://user:password@host"; // Bundled in code
```

### 4. **Optimize Dependencies**
- Replace heavy libraries with lighter alternatives
- Remove dev dependencies that leaked into production build
- Use `--prod` flag when installing: `npm install --prod`

### 5. **Check Current Bundle Size**

Run this locally to see your actual bundle size:
```bash
npm run build
```

Then check the dist/ folder:
```bash
# On Windows PowerShell:
Get-ChildItem -Path ".\dist" -Recurse | Measure-Object -Property Length -Sum
```

### 6. **Use Dynamic Imports for Heavy Libraries**
If you have large libraries (charts, editors, etc.), import them dynamically:

```javascript
// Instead of:
import * as Chart from 'chart.js';

// Do:
const Chart = await import('chart.js');
```

### 7. **Vercel Deployment Size Limits**

| Plan | Max Function Size | Max Memory |
|------|------------------|-----------|
| **Hobby (Free)** | 250 MB | 2,048 MB ❌ (your original request) |
| **Pro** | 250 MB | Up to 3,008 MB ✅ |
| **Enterprise** | Unlimited | Unlimited ✅ |

### 8. **Monitor Deployment Size**
After each deployment, Vercel shows you:
1. Build size
2. Function size
3. Memory used during execution

If still too large, consider:

#### Option A: Compress Dependencies
```bash
npm install --save-dev @vercel/ncc
```

#### Option B: Use Edge Functions Instead
For lightweight routes (static content, redirects), use Vercel Edge Functions - they have 512 MB limit but run at edge servers globally:

**Create `api/middleware.ts`:**
```typescript
export const config = {
  runtime: 'edge'
};

export default async (req: Request) => {
  // This runs on edge servers
  return new Response('Hello from edge');
};
```

#### Option C: Split into Multiple Functions
Create separate functions for different routes:
```
api/
  auth/
    index.js (small, handles auth only)
  api/
    index.js (small, handles API only)
  app/
    index.js (main app server)
```

## Current Configuration

Your `vercel.json` now has:
```json
{
  "functions": {
    "api/index.js": {
      "memory": 1024
    }
  }
}
```

✅ This is **within Hobby plan limits**

## Monitoring & Alerts

To get alerts if your function size approaches limits:

1. Go to **Vercel Dashboard** → Your Project → **Analytics**
2. Check **Serverless Function** tab
3. Monitor "Function Size" metric
4. If approaching 2048 MB, implement bundle optimizations above

## Next Steps

1. ✅ Deploy with new 1024 MB setting
2. Test if app still works (should be fine - most apps use <500 MB)
3. Monitor actual usage in Vercel Analytics
4. If you need more resources, upgrade to Pro plan for team

## Quick Deployment

```bash
git add vercel.json
git commit -m "fix: reduce memory to 1024MB for Hobby plan"
git push
```

Vercel will auto-deploy with the new memory limit!

---

**Questions?**
- If getting "Function exceeds maximum size" → Need Pro plan or reduce bundle
- If getting "Out of memory" errors → Apply optimizations above
- If performance is slow → May need to increase to 1536 MB (still within Hobby limits)
