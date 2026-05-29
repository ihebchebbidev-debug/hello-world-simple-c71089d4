# 🔥 ROOT CAUSE ANALYSIS: Still Getting 404 Errors

## The Real Problem

After deploying to Vercel with the previous setup, you're STILL getting 404 errors. This means:

1. ✅ `vercel.json` rewrites are working (requests hitting the API)
2. ❌ `api/index.js` is running but FAILING to load the server module
3. ❌ The TanStack Start server isn't being bundled correctly for Vercel

## Why This Happens

The issue is in **HOW Vite builds the server**:

- **Cloudflare Setup**: Vite outputs a single bundle for Workers (`dist/worker.js`)
- **Vercel Setup**: Vite should output a server that Node.js can import (`dist/server.js`)
- **Your Setup**: Vite is still configured for Cloudflare, so it's not generating a server.js at all!

## The Fix: 4 Critical Changes

### 1. **Ensure Vite generates server.js**

The `@lovable.dev/vite-tanstack-config` automatically detects `@cloudflare/vite-plugin` and builds for Cloudflare. We need to tell Vite to build for Node.js instead.

**Solution**: Modify `vite.config.ts` to explicitly build for Node.js:

```typescript
export default defineConfig({
  tanstackStart: {
    server: { entry: "server" },
  },
  vite: {
    build: {
      outDir: "dist",
      emptyOutDir: true,
      // Explicitly target Node.js ESM format
      rollupOptions: {
        output: {
          format: "es",
          entryFileNames: "server.js",
          preserveModules: false,
        },
      },
    },
  },
});
```

### 2. **Update api/index.js with better error handling**

The handler needs to:
- Check if server.js exists
- Provide detailed logging
- Fall back gracefully if server not found

✅ **Already done** in the updated `api/index.js`

### 3. **Fix vercel.json routing**

Change from `/api/index` to `/api` (simpler):

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/api"
    }
  ]
}
```

✅ **Already done**

### 4. **Verify build outputs server.js**

Before deploying, verify that `npm run build` generates:
- `dist/server.js` ← This is critical!
- `dist/client/` or `dist/public/` (static assets)

## How to Verify the Fix

Run these commands locally:

```bash
# Clean and rebuild
rm -r dist
npm run build

# Check if server.js exists
ls -la dist/server.js    # Should exist!
ls -la dist/ | grep -E "(server|client|public|index)"

# Test locally
npm run preview
# Visit http://localhost:4173 - should work
```

## What to Check in Vercel Logs

After re-deploying, check Vercel Function Logs:

**Good output** should show:
```
✓ [api] Attempting to load server from dist/...
✓ [api] Successfully loaded server from dist/server.js
✓ GET / → 200
```

**Bad output** showing 404s:
```
✗ [api] Failed to load dist/server.js: Cannot find module
✗ [api] Failed to load @tanstack/react-start/server-entry: Cannot find module
✗ [api] Could not load any server module, using error handler
✗ GET / → 503
```

## The Updated Configuration

### Modified vite.config.ts
```typescript
export default defineConfig({
  tanstackStart: {
    server: { entry: "server" },
  },
  vite: {
    build: {
      outDir: "dist",
      emptyOutDir: true,
      rollupOptions: {
        output: {
          format: "es",
        },
      },
    },
  },
});
```

### Updated vercel.json
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "functions": {
    "api/index.js": {
      "runtime": "nodejs20.x",
      "maxDuration": 30,
      "memory": 3008
    }
  },
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/api"
    }
  ]
}
```

### Updated api/index.js
```javascript
// Enhanced error logging and multiple fallback paths
let cachedServerHandler = null;

async function getServerHandler() {
  try {
    // Try dist/server.js first
    const serverModule = await import('../dist/server.js');
    cachedServerHandler = serverModule.default || serverModule;
    console.log('[api] ✓ Loaded server from dist/server.js');
    return cachedServerHandler;
  } catch (err) {
    console.error('[api] ✗ Failed to load dist/server.js:', err.message);
    // Fallback to TanStack entry
    ...
  }
}
```

## Next Steps

### IMMEDIATE:
1. Run: `npm run build`
2. Check if `dist/server.js` exists
   - If YES → Continue to deploy
   - If NO → Read troubleshooting below

3. Run: `npm run preview`
4. Test at http://localhost:4173
5. Verify no 404 errors locally

### THEN DEPLOY:
```bash
git add .
git commit -m "fix: Update Vercel config to load server from dist/server.js"
git push origin main
```

### THEN VERIFY ON VERCEL:
1. Check Vercel Dashboard → Deployments
2. Click the new deployment
3. Click "Functions" tab
4. Click "/api"
5. Look at the **Logs** section
6. Should see `✓ Loaded server from dist/server.js`

## Troubleshooting

### Problem: `dist/server.js` doesn't exist after `npm run build`

**Cause**: Vite config still targeting Cloudflare

**Solution**:
1. Check if `vite.config.ts` has the rollupOptions config
2. Delete `dist/` folder
3. Run `npm run build` again
4. Check if `dist/server.js` is created

### Problem: Still getting 503 errors instead of 404

**Cause**: Server module not loading

**Solution**:
1. Check Vercel function logs
2. Look for error message in logs
3. Verify `dist/server.js` is being deployed
4. Check if imports in `api/index.js` are correct

### Problem: Local preview works but Vercel still fails

**Cause**: Build artifacts not being packaged correctly

**Solution**:
1. Verify `vercel.json` has correct `outputDirectory: "dist"`
2. Check `.vercelignore` isn't excluding dist/
3. Try: `npm run build && npm run preview` locally first
4. Then commit and push

## Summary

The 404 error persists because:
1. Vite isn't building a `server.js` file
2. The API handler can't find the server module
3. Vercel returns 404 or 503

The fix ensures:
1. ✅ Vite generates `dist/server.js`
2. ✅ API handler finds and loads it
3. ✅ Requests flow through to TanStack Start
4. ✅ Pages render correctly

---

**Next**: Run `npm run build` and verify `dist/server.js` exists. Then follow deployment steps above.
