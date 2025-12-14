# Rence Portfolio - Admin Dashboard Setup Guide

This portfolio now includes a **secret admin dashboard** that allows you to manage your projects through a user interface without editing code.

## 🎯 Features

- **Secret Admin Access**: Hidden keyboard shortcut (Ctrl + Shift + A) on the homepage
- **Secure Authentication**: Supabase Auth with email whitelist
- **Full CRUD Operations**: Create, Read, Update, and Delete projects
- **Project Visibility Control**: Public, Hidden, or Draft status for projects
- **Featured Projects**: Highlight your best work
- **Dynamic Routes**: Auto-generated project detail pages
- **Server-Side Rendering**: Optimized for SEO and performance
- **Type-Safe**: Full TypeScript support

## 🚀 Setup Instructions

### 1. Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Once created, go to **Project Settings > API**
3. Copy your `Project URL` and `anon public` key

### 2. Set Up Database

1. In your Supabase dashboard, go to **SQL Editor**
2. Copy the contents of `supabase-schema.sql` in the root of this project
3. Paste it into the SQL Editor and click **Run**

This will create:
- `projects` table with all necessary fields
- Row Level Security (RLS) policies
- Indexes for better performance
- Auto-updating timestamps

### 3. Configure Environment Variables

1. Create a `.env.local` file in the root directory (copy from `.env.example`):

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your-project-url.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# Admin Email Whitelist (comma-separated)
ADMIN_EMAILS=your-email@example.com,another-admin@example.com
```

2. Replace the values:
   - `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase anon/public key
   - `ADMIN_EMAILS`: Your email address(es) that can access the admin panel

### 4. Create an Admin Account

1. Go to your Supabase dashboard
2. Navigate to **Authentication > Users**
3. Click **Add User** (or **Invite User**)
4. Create a user with the email you added to `ADMIN_EMAILS`
5. Set a strong password

**Important**: Only emails listed in `ADMIN_EMAILS` will have access to the admin panel, even if other users exist in Supabase Auth.

### 5. Install Dependencies & Run

```bash
npm install
npm run dev
```

Your portfolio will be available at `http://localhost:3000`

## 🔐 Accessing the Admin Panel

### Method 1: Secret Keyboard Shortcut (Recommended)
1. Go to the homepage
2. Press **Ctrl + Shift + A** (Windows/Linux) or **Cmd + Shift + A** (Mac)
3. You'll be redirected to the admin login page

### Method 2: Direct URL
Navigate to: `http://localhost:3000/admin/login`

**Note**: There are no visible links to the admin panel on the public site for security.

## 📁 Project Structure

```
app/
├── admin/
│   ├── login/page.tsx          # Admin login page
│   ├── dashboard/page.tsx      # Admin dashboard overview
│   ├── layout.tsx              # Admin layout with sidebar
│   └── projects/
│       ├── page.tsx            # Projects list
│       ├── new/page.tsx        # Create new project
│       └── [id]/edit/page.tsx  # Edit project
├── projects/
│   ├── page.tsx                # Public projects list
│   └── [slug]/page.tsx         # Individual project page
components/
├── admin/
│   ├── admin-header.tsx        # Admin header with logout
│   ├── admin-sidebar.tsx       # Admin navigation
│   ├── project-form.tsx        # Project create/edit form
│   └── projects-table.tsx      # Projects management table
lib/
├── actions/
│   └── projects.ts             # Server actions for CRUD
├── supabase/
│   ├── client.ts               # Client-side Supabase
│   └── server.ts               # Server-side Supabase
└── types/
    └── project.ts              # TypeScript types
middleware.ts                    # Route protection
supabase-schema.sql             # Database schema
```

## 🎨 Managing Projects

### Creating a New Project

1. Log in to admin panel
2. Click **New Project** or navigate to `/admin/projects/new`
3. Fill in the form:
   - **Title**: Project name (slug auto-generated)
   - **Short Description**: Brief summary for project cards
   - **Full Description**: Detailed description for project page
   - **Tech Stack**: Comma-separated list of technologies
   - **GitHub URL**: Link to repository (optional)
   - **Live Demo URL**: Link to deployed project (optional)
   - **Image URL**: Direct link to project screenshot (optional)
   - **Status**: "In Progress" or "Completed"
   - **Visibility**: 
     - Public: Visible to everyone
     - Hidden: Not shown publicly
     - Draft: Work in progress
   - **Featured**: Toggle to feature on projects page

4. Click **Create Project**

### Editing a Project

1. Go to `/admin/projects`
2. Click the menu (⋮) on any project
3. Select **Edit**
4. Make your changes
5. Click **Update Project**

### Deleting a Project

1. Go to `/admin/projects`
2. Click the menu (⋮) on the project
3. Select **Delete**
4. Confirm deletion

## 🔒 Security Features

- **Email Whitelist**: Only specified emails can access admin routes
- **Middleware Protection**: All `/admin/*` routes are protected
- **Supabase RLS**: Database-level security policies
- **Authenticated Actions**: All CRUD operations require authentication
- **No Public Links**: Admin routes are not linked anywhere publicly

## 📊 Database Schema

### Projects Table

| Field | Type | Description |
|-------|------|-------------|
| id | UUID | Primary key |
| title | TEXT | Project name |
| slug | TEXT | URL-friendly identifier (unique) |
| short_description | TEXT | Brief project summary |
| full_description | TEXT | Detailed description |
| tech_stack | TEXT[] | Array of technologies |
| github_url | TEXT | Repository link (nullable) |
| live_demo_url | TEXT | Live demo link (nullable) |
| image_url | TEXT | Project image link (nullable) |
| status | TEXT | "Completed" or "In Progress" |
| visibility | TEXT | "Public", "Hidden", or "Draft" |
| featured | BOOLEAN | Whether project is featured |
| created_at | TIMESTAMP | Creation date |
| updated_at | TIMESTAMP | Last update date |

## 🚨 Troubleshooting

### Can't log in to admin panel
- Verify your email is in the `ADMIN_EMAILS` environment variable
- Check that the user exists in Supabase Auth
- Make sure environment variables are loaded (restart dev server)

### Projects not showing
- Check project visibility is set to "Public"
- Verify database connection in Supabase
- Check browser console for errors

### Database errors
- Ensure you ran the `supabase-schema.sql` script
- Verify RLS policies are enabled
- Check Supabase project is active

## 🔄 Deployment

### Environment Variables in Production

When deploying to Vercel, Netlify, or other platforms:

1. Add all environment variables from `.env.local`
2. Make sure `ADMIN_EMAILS` is set correctly
3. Restart/redeploy after changing environment variables

### Database Migrations

If you update the database schema:
1. Run new SQL in Supabase SQL Editor
2. Update TypeScript types in `lib/types/project.ts`
3. Redeploy your application

## 📝 Notes

- The homepage keyboard shortcut (Ctrl+Shift+A) only works on the client side
- Project slugs are auto-generated from titles
- All timestamps are automatically managed
- Image URLs should be direct links (consider using a service like Cloudinary or Supabase Storage)

## 🎉 You're All Set!

Your portfolio now has a powerful admin dashboard. You can manage your projects without touching code, while keeping the admin panel completely hidden from public view.

For support or questions, refer to:
- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com)
