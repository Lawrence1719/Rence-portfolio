# Quick Start: Admin Authentication

## 5-Minute Setup

### Step 1: Environment Variables
Add to your `.env.local`:
```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### Step 2: Create Test User in Supabase
1. Open Supabase Dashboard → Your Project
2. Go to "Authentication" → "Users"
3. Click "Add User" (or use the Email/Password provider)
4. Set email: `admin@example.com`
5. Set password: anything secure
6. Click "Create User"

### Step 3: Test It
```bash
npm run dev
```

Then open:
- `http://localhost:3000/login` - Login page
- Try logging in with your test credentials
- Should redirect to `/admin` dashboard
- Click "logout" to go back to login

## What Was Built

| Route | Purpose | Protected? |
|-------|---------|-----------|
| `/login` | Email/password login form | ❌ No (but redirects to /admin if logged in) |
| `/admin` | Dashboard home | ✅ Yes (server-side check) |
| `/admin/*` | Any admin subroute | ✅ Yes (layout protection) |

## Key Features

✅ Minimalist CLI-inspired design matching your portfolio
✅ Dark mode & light mode support
✅ Monospaced fonts (JetBrains Mono)
✅ Server-side session validation (secure)
✅ Responsive on mobile/tablet/desktop
✅ Error handling for failed logins
✅ Loading states on forms
✅ Logout functionality

## Files You Need to Know

```
app/login/page.tsx         ← User login form
app/admin/layout.tsx       ← Protected header + auth check
app/admin/page.tsx         ← Dashboard placeholder
app/admin/actions.ts       ← Logout server action
lib/supabase/server.ts     ← Auth helpers
middleware.ts              ← Route protection
```

## Troubleshooting

**"Blank page on /login"**
→ Check environment variables in `.env.local`

**"Always redirects to login"**
→ Make sure Supabase user exists in your database

**"Login works but no redirect to /admin"**
→ Check browser console for errors, refresh page

**"Dark mode not working"**
→ Theme is set in layout.tsx, should work with next-themes

## Next: Customize

### Add fields to login form
Edit `app/login/page.tsx` - add more Input fields in the form

### Change dashboard layout
Edit `app/admin/page.tsx` - add your own content and cards

### Add more admin pages
Create `app/admin/settings/page.tsx` - auto-protected by layout

### Change colors/styling
Edit `app/globals.css` - modify OKLCH color variables or Tailwind config

## Common Questions

**Q: Can I add OAuth (Google, GitHub, etc.)?**
A: Yes! Edit the login form to use `signInWithOAuth()` from Supabase. Not included in this starter to keep it minimal.

**Q: How do I add role-based access?**
A: Store roles in Supabase user metadata, check in layout before rendering content.

**Q: Is this secure for production?**
A: Yes! Uses server-side session validation, HTTP-only cookies, and middleware protection. Just ensure your Supabase RLS policies are set up.

**Q: Can I add a signup page?**
A: Yes! Create `app/signup/page.tsx` and use `supabase.auth.signUp()`.

---

**All set! Check [ADMIN_AUTH_SETUP.md](ADMIN_AUTH_SETUP.md) for full documentation.**
