# 🚀 Quick Start Guide - Admin Dashboard

## Setup in 5 Minutes

### 1. Create Supabase Project
```bash
# Go to https://supabase.com
# Create a new project
# Copy your Project URL and API keys
```

### 2. Run Database Schema
```sql
# Go to Supabase SQL Editor
# Run the SQL from supabase-schema.sql
```

### 3. Set Environment Variables
```bash
# Create .env.local file
cp .env.example .env.local

# Edit .env.local with your values:
NEXT_PUBLIC_SUPABASE_URL=your-url-here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-key-here
ADMIN_EMAILS=your-email@example.com
```

### 4. Create Admin User
```bash
# In Supabase Dashboard > Authentication > Users
# Click "Add User"
# Use the same email as in ADMIN_EMAILS
```

### 5. Run the App
```bash
npm install
npm run dev
```

## 🔑 Access Admin Panel

**Secret Shortcut on Homepage:**
- Press `Ctrl + Shift + A`

**Or go directly to:**
- `http://localhost:3000/admin/login`

Login with your Supabase credentials.

## ✅ Quick Test

1. **Create a project**: Go to Admin > Projects > New Project
2. **Set visibility**: Choose "Public"
3. **View public site**: Go to `/projects` to see your project
4. **Edit**: Go back to admin to modify or delete

## 📖 Full Documentation

See `ADMIN-SETUP.md` for complete documentation.

## 🆘 Common Issues

**Can't login?**
- Check email is in `ADMIN_EMAILS`
- Verify user exists in Supabase
- Restart dev server after .env changes

**No projects showing?**
- Set visibility to "Public"
- Check Supabase connection
- Look for errors in console

**Need help?**
- Check Supabase dashboard for errors
- Verify environment variables
- Review browser console

## 🎯 Key Features

✅ Secret admin access (no public links)
✅ Full project management UI
✅ Public/Hidden/Draft visibility
✅ Featured projects
✅ Auto-generated slugs
✅ Dynamic project pages
✅ Email-based access control

Enjoy managing your portfolio! 🎉
