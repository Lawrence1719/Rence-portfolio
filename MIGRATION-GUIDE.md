# 📦 Migrating Existing Projects to Database

If you have existing projects in your code (like in the old `projects` array), here's how to migrate them to the database.

## Option 1: Manual Entry (Recommended)

The easiest way is to manually add your projects through the admin UI:

1. Access admin panel (Ctrl + Shift + A or go to `/admin/login`)
2. Click **New Project**
3. Fill in the form with your project details
4. Set visibility to "Public"
5. Save

## Option 2: Bulk Insert via SQL

For multiple projects, you can insert them directly via Supabase SQL Editor:

```sql
-- Example: Insert your existing projects
INSERT INTO projects (
  title,
  slug,
  short_description,
  full_description,
  tech_stack,
  github_url,
  live_demo_url,
  image_url,
  status,
  visibility,
  featured
) VALUES
(
  'Never Stop Dreaming Trading',
  'never-stop-dreaming-trading',
  'A web-based IoT inventory and e-commerce platform for a small grocery business.',
  'A web-based IoT inventory and e-commerce platform for a small grocery business. It connects real-time IoT sensors with a Supabase backend to monitor stock and automate restocking alerts.',
  ARRAY['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Supabase', 'Node.js', 'Express', 'shadcn/ui'],
  'https://github.com/Lawrence1719/never-stop-dreaming-frontend',
  'https://never-stop-dreaming.vercel.app',
  '/images/ProjectImage.png',
  'In Progress',
  'Public',
  true
),
(
  'Subverb-ify',
  'subverb-ify',
  'Interactive Educational Website.',
  'An interactive educational website designed to help students learn about subject-verb agreement in an engaging and fun way.',
  ARRAY['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'ESLint'],
  'https://github.com/Lawrence1719/Subverb-ify-frontend',
  'https://subverb-ify.vercel.app/',
  NULL,
  'In Progress',
  'Public',
  false
),
(
  'CalculaStats',
  'calculastats',
  'Statistics Calculator',
  'A comprehensive statistics calculator built with React and TypeScript. Performs various statistical calculations including mean, median, mode, standard deviation, and more.',
  ARRAY['React', 'TypeScript', 'Tailwind CSS', 'Vite', 'Git', 'Vercel'],
  'https://github.com/Lawrence1719/CalculaStats',
  'https://calcula-stats.vercel.app/',
  NULL,
  'Completed',
  'Public',
  false
),
(
  'ArraySort',
  'arraysort',
  'Simple array sorting application.',
  'A simple and intuitive array sorting visualization tool built with vanilla JavaScript. Demonstrates various sorting algorithms with visual feedback.',
  ARRAY['HTML', 'CSS', 'JavaScript'],
  'https://github.com/Lawrence1719/ArraySort',
  'https://array-sort-mu.vercel.app/',
  NULL,
  'Completed',
  'Public',
  false
);
```

## Option 3: Migration Script

Create a one-time migration script:

```typescript
// scripts/migrate-projects.ts
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const oldProjects = [
  {
    title: "Never Stop Dreaming Trading",
    description: "A web-based IoT inventory and e-commerce platform...",
    tech: ["React", "TypeScript", "Vite", "Tailwind CSS", "Supabase", "Node.js", "Express", "shadcn/ui"],
    link: "https://never-stop-dreaming.vercel.app",
    github: "https://github.com/Lawrence1719/never-stop-dreaming-frontend",
    featured: true,
    inProgress: true,
    image: "/images/ProjectImage.png",
  },
  // ... other projects
];

async function migrate() {
  for (const project of oldProjects) {
    const slug = project.title
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-");

    const { data, error } = await supabase.from('projects').insert({
      title: project.title,
      slug: slug,
      short_description: project.description,
      full_description: project.description, // Add more detailed description if needed
      tech_stack: project.tech,
      github_url: project.github,
      live_demo_url: project.link,
      image_url: project.image || null,
      status: project.inProgress ? 'In Progress' : 'Completed',
      visibility: 'Public',
      featured: project.featured || false,
    });

    if (error) {
      console.error(`Error migrating ${project.title}:`, error);
    } else {
      console.log(`✅ Migrated: ${project.title}`);
    }
  }
}

migrate();
```

Run with:
```bash
npx ts-node scripts/migrate-projects.ts
```

## After Migration

1. **Verify**: Check admin panel to see all projects
2. **Edit**: Improve descriptions through the admin UI
3. **Images**: Update image URLs if needed
4. **Test**: Visit `/projects` to see them live
5. **Clean up**: Remove old hardcoded projects array from code

## Notes

- Slugs must be unique (database enforces this)
- Image URLs should be direct links or hosted on a CDN
- You can always edit projects through the admin panel after migration
- Consider setting one project as "featured" for the homepage

## Tips for Better Descriptions

When editing through admin panel, expand your project descriptions:

**Short Description** (for project cards):
- 1-2 sentences
- Focus on what the project does
- Example: "A web-based IoT inventory platform with real-time stock monitoring."

**Full Description** (for project detail pages):
- Multiple paragraphs
- Explain the problem solved
- Describe key features
- Mention your role and challenges
- Include technical highlights

Example:
```
This project was built to solve inventory management challenges for a small grocery business.

Key Features:
- Real-time IoT sensor integration
- Automated restocking alerts
- E-commerce functionality
- Admin dashboard for inventory tracking

I led the frontend development using React and TypeScript, implementing a responsive design with Tailwind CSS. The backend uses Supabase for real-time data synchronization.

Technical Highlights:
- Integrated IoT sensors with web platform
- Implemented real-time updates using Supabase subscriptions
- Built reusable component library with shadcn/ui
- Deployed on Vercel with CI/CD pipeline
```

Happy migrating! 🚀
