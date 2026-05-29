# Vercel Deployment Checklist

## Pre-Deployment ✓

- [ ] Node.js version is 20.x or higher
- [ ] Run `npm install` to get latest dependencies including `@vercel/node`
- [ ] Run `npm run build` to verify build succeeds locally
- [ ] Run `npm run preview` to test the production build works
- [ ] All changes committed to Git

## Vercel Project Setup ✓

- [ ] Project connected to GitHub repo
- [ ] Environment variables added to Vercel dashboard:
  - [ ] `SUPABASE_URL`
  - [ ] `SUPABASE_KEY`
  - [ ] Any other required API keys/config
- [ ] Node.js runtime is set to 18.x or 20.x (not 16.x or older)

## Deploy ✓

- [ ] Push code to GitHub (or use `vercel deploy --prod`)
- [ ] Monitor Vercel deployment progress
- [ ] Check deployment logs for errors

## Post-Deployment Validation ✓

- [ ] Visit production URL and verify homepage loads
- [ ] Test navigation between pages
- [ ] Test form submissions (e.g., quote form)
- [ ] Check browser console for errors
- [ ] Monitor Vercel Function Logs:
  - [ ] `/api` should show successful requests (200, 301, etc.)
  - [ ] No unhandled errors in the logs
- [ ] Verify Supabase connection:
  - [ ] Forms save data correctly
  - [ ] Newsletter signup works
- [ ] Check mobile responsiveness
- [ ] Test on different browsers

## If Deployment Fails ✓

1. Check Vercel build logs:
   - Look for npm install errors
   - Look for TypeScript compile errors
   - Look for missing environment variables

2. If Node version error:
   - Go to Vercel Dashboard > Settings > Environment
   - Set `NODE_VERSION` to `20.x`
   - Redeploy

3. If 404 errors on pages:
   - Clear Vercel cache: Settings > "Clear Cache"
   - Redeploy
   - Check `api/index.ts` logs for errors

4. If Supabase connection fails:
   - Verify `SUPABASE_URL` and `SUPABASE_KEY` in Vercel dashboard
   - Test Supabase connection locally first
   - Check Supabase project is active and API keys are correct

## Rollback ✓

If something goes wrong after deployment:

1. Go to Vercel Dashboard > Deployments
2. Find the previous working deployment
3. Click the three dots > "Redeploy"

This rolls back to the previous version immediately.

## Performance Monitoring ✓

After deployment, monitor:
- [ ] Vercel Analytics (Core Web Vitals)
- [ ] Error rates in Function Logs
- [ ] Response times
- [ ] Deployment autoscaling behavior

## Maintenance ✓

Regular checks:
- [ ] Review Vercel logs weekly for errors
- [ ] Update dependencies monthly: `npm update`
- [ ] Monitor Supabase quota usage
- [ ] Set up alerts for 500 errors

---

**Last Updated**: May 29, 2026
**App**: Protection Landing (TanStack Start + Supabase on Vercel)
**Status**: ✅ Configured for Vercel Deployment
