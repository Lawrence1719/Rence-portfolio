# Pre-Deployment Checklist

Use this checklist to verify everything is working before deploying to production.

## ✅ Local Development

- [ ] **Dependencies installed**
  ```bash
  npm install
  # or
  pnpm install
  ```

- [ ] **Environment variables set**
  - [ ] Created `.env.local` file
  - [ ] Added `NEXT_PUBLIC_SUPABASE_URL`
  - [ ] Added `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - [ ] Values are correct (copy-pasted from Supabase dashboard)

- [ ] **Dev server runs without errors**
  ```bash
  npm run dev
  # Should see "✓ Ready in Xs" without errors
  ```

- [ ] **No TypeScript errors**
  - [ ] No red squiggly lines in editor
  - [ ] No errors in terminal
  - [ ] Run `npm run build` locally to test full build

## ✅ Authentication Testing

### Login Page
- [ ] Can navigate to `/login`
- [ ] Page loads with login form
- [ ] Form has email and password fields
- [ ] Form labels are visible
- [ ] Dark mode styling works
- [ ] Light mode styling works
- [ ] Page is responsive on mobile

### Login Functionality
- [ ] Login with valid credentials works
  - [ ] Redirects to `/admin`
  - [ ] No errors in console
  - [ ] Session cookie appears in DevTools
- [ ] Login with invalid email shows error
- [ ] Login with invalid password shows error
- [ ] Error messages are readable
- [ ] Can clear error by trying again
- [ ] Loading spinner appears while logging in

### Admin Dashboard
- [ ] Can navigate to `/admin` when logged in
- [ ] Dashboard loads with header
- [ ] Admin title is visible
- [ ] User email is displayed
- [ ] Logout button is present
- [ ] Dashboard cards are visible
- [ ] All content is readable
- [ ] Dark mode works
- [ ] Light mode works
- [ ] Page is responsive on mobile

### Logout Functionality
- [ ] Logout button works
- [ ] Redirects to `/login`
- [ ] Session cookie is cleared
- [ ] Cannot navigate to `/admin` after logout

### Route Protection
- [ ] Cannot access `/admin` without logging in
  - [ ] Automatically redirects to `/login`
- [ ] Cannot access `/admin/[anything]` without logging in
- [ ] After logging in, visiting `/login` redirects to `/admin`

## ✅ Responsive Design

Test on multiple devices (DevTools is fine):

### Mobile (< 640px)
- [ ] Login form is centered and readable
- [ ] Buttons are large enough to tap
- [ ] Text is not too small
- [ ] No horizontal scrolling
- [ ] Form fields are full width

### Tablet (640px - 1024px)
- [ ] Layout looks good
- [ ] Admin header fits nicely
- [ ] Content is readable

### Desktop (> 1024px)
- [ ] Login form is nicely centered
- [ ] Admin dashboard layout is optimal
- [ ] Header is properly spaced

## ✅ Theme Support

- [ ] Dark mode works on all pages
- [ ] Light mode works on all pages
- [ ] Theme toggle (if you have one) works
- [ ] Colors match your portfolio
- [ ] No weird color flashes

## ✅ Performance

- [ ] Login page loads quickly (< 2s)
- [ ] Admin dashboard loads quickly (< 2s)
- [ ] No layout shift (CLS)
- [ ] Smooth animations
- [ ] No console warnings or errors

## ✅ Browser Compatibility

Test in multiple browsers:
- [ ] Chrome/Chromium
- [ ] Firefox
- [ ] Safari
- [ ] Edge

## ✅ Build Process

- [ ] Production build succeeds
  ```bash
  npm run build
  # Should complete without errors
  ```

- [ ] No warnings during build
- [ ] Bundle size is reasonable
- [ ] Start command works
  ```bash
  npm start
  # Should serve production build
  ```

## ✅ Code Quality

- [ ] No TypeScript errors
- [ ] No console errors when running
- [ ] All imports are correct
- [ ] No unused variables
- [ ] Code is readable and maintainable

## ✅ Security Checks

- [ ] No hardcoded passwords in code
- [ ] No secrets in Git commits
- [ ] Environment variables not logged
- [ ] Sessions stored securely (HTTP-only cookies)
- [ ] CORS is properly configured
- [ ] Rate limiting considered (for production)

## ✅ Supabase Configuration

- [ ] Email/Password auth is enabled
- [ ] At least one test user exists
- [ ] User's email is verified (if required)
- [ ] No errors in Supabase logs
- [ ] RLS policies reviewed (if sensitive data)

## Deployment Steps

### Vercel (Recommended for Next.js)

1. Push code to Git repository
2. Connect repository to Vercel
3. Add environment variables in Vercel dashboard:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Deploy
5. Test login/logout on production
6. Monitor logs for errors

### Other Platforms

1. Ensure Node.js version 18+ is available
2. Set environment variables in platform settings
3. Run `npm run build` successfully
4. Ensure `npm start` command works
5. Test all authentication flows
6. Monitor for runtime errors

## Post-Deployment

- [ ] Test login/logout on production URL
- [ ] Check that dark/light mode works
- [ ] Verify responsive design on mobile
- [ ] Check for console errors (F12)
- [ ] Monitor Supabase logs for errors
- [ ] Set up error monitoring (Sentry, etc.)

## Optional Improvements

- [ ] Add password reset flow
- [ ] Add signup page
- [ ] Add email verification
- [ ] Add rate limiting on login attempts
- [ ] Add audit logging
- [ ] Add two-factor authentication
- [ ] Add role-based access control
- [ ] Add user management dashboard

---

## Troubleshooting During Deployment

### "Environment variables not found"
Solution: Ensure variables are added to platform's environment settings, not just `.env.local`

### "Cannot connect to Supabase"
Solution: Check Supabase URL and key are correct, ensure project is running

### "Session not persisting"
Solution: Check that cookies are properly configured in middleware

### "Middleware not executing"
Solution: Ensure middleware.ts is in project root, not in `/app`

---

**Ready to deploy!** Once all checkboxes are complete, your authentication system is production-ready.
