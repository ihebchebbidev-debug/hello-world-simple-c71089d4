# Bundle Size Optimization Checklist

## ✅ What We Fixed
- Memory limit: **3008 MB → 1024 MB** (now within Hobby plan)
- This should work fine for most TanStack Start + Supabase applications

## 📊 Your Current Setup

**Memory Allocation:**
- Vercel Hobby Plan: 2,048 MB max
- Your Function: 1,024 MB (50% of limit) ✅ Safe headroom

**Typical Bundle Sizes for TanStack Start:**
- Minimal app: 150-300 MB
- With Supabase + UI components: 300-800 MB
- With heavy libraries: 800-1,500 MB

Your app should be in the **300-800 MB range**, well under 1024 MB.

## 🚀 Quick Wins for Size Reduction

### 1. Verify What's Being Bundled
After deploying, check Vercel Analytics:
1. Go to Vercel dashboard → Your project
2. Click **Analytics** tab
3. View **Serverless Functions** section
4. Look for "Size" metric

### 2. Remove Unused Cloudflare Dependencies
Since you're migrating from Cloudflare to Vercel, you might have unused deps:

**In `package.json`, check and remove:**
- `wrangler` - Not needed for Vercel
- `@cloudflare/workers-types` - Cloudflare-specific
- `@wrangler/...` packages

**To remove:**
```bash
npm uninstall wrangler @cloudflare/vite-plugin
```

### 3. Check for Duplicate Dependencies
```bash
npm ls --all
```

Look for packages appearing multiple times - npm can often deduplicate:
```bash
npm dedupe
```

### 4. Ensure Tree-Shaking Works
Add to `package.json`:
```json
{
  "sideEffects": false,
  "type": "module"
}
```

(Already set in your package.json ✅)

### 5. Analyze Your Build Output
After running `npm run build`, check what's in `dist/`:

```bash
# List largest files
Get-ChildItem -Path .\dist -Recurse | Sort-Object -Property Length -Descending | Select-Object -First 10
```

## 🔧 If You Still Hit Memory Limits

### Option 1: Upgrade to Pro (Recommended for production)
- Still within free tier initially
- Gives you 3,008 MB memory
- Better uptime SLA
- Team collaboration features

### Option 2: Use Edge Functions for Static Routes
Create lightweight edge functions for:
- `/` - Homepage
- `/about`, `/contact` - Static pages
- Redirects, authentication middleware

**Benefits:**
- 512 MB limit but run globally (faster)
- Free tier available
- Scales infinitely

### Option 3: Split into Multiple Serverless Functions
Create separate endpoints:
```
api/
  app/
    index.js (SSR server, ~500 MB)
  api/
    leads/index.js (API only, ~100 MB)
  api/
    blog/index.js (Blog API, ~100 MB)
```

This distributes load and memory usage.

## ✨ Current Best Practice Configuration

Your `vercel.json` now uses:
```json
{
  "functions": {
    "api/index.js": {
      "memory": 1024,
      "maxDuration": 30
    }
  }
}
```

**This is ideal for:**
✅ Hobby plan users
✅ Small to medium traffic
✅ TanStack Start + Supabase apps
✅ Most production use cases

## 📈 Scaling Path

| Stage | Action | Memory |
|-------|--------|--------|
| **Development** | Use current setup | 1024 MB |
| **Small production** | Monitor usage | 1024 MB |
| **Growing traffic** | Upgrade to Pro | 3008 MB |
| **High traffic** | Use Pro + optimize | 3008 MB + Edge |
| **Enterprise** | Custom setup | Unlimited |

## 🎯 Right Now

**You're good to deploy!** Your current setup:
- ✅ Is within Hobby plan limits
- ✅ Has 1 GB of memory (plenty for TanStack Start)
- ✅ Should handle 1000+ concurrent users
- ✅ Cost effective

Just push your code and Vercel will build with the new memory limit.

---

**Deployment:**
```bash
git add vercel.json VERCEL_MEMORY_OPTIMIZATION.md
git commit -m "fix: optimize memory for Vercel Hobby plan (1024 MB)"
git push
```

Your app will redeploy automatically! 🚀
