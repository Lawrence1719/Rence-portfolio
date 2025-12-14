// Common tech stack options organized by category
export const TECH_STACK_OPTIONS = [
  // Frontend Frameworks
  { category: "Frontend Frameworks", items: ["React", "Vue", "Angular", "Svelte", "Next.js", "Nuxt", "Remix"] },
  // Backend Frameworks
  { category: "Backend Frameworks", items: ["Node.js", "Express", "Django", "Flask", "FastAPI", "Spring Boot", "NestJS", "Fastify"] },
  // Languages
  { category: "Languages", items: ["JavaScript", "TypeScript", "Python", "Java", "C#", "PHP", "Go", "Rust", "Ruby"] },
  // Styling
  { category: "Styling", items: ["Tailwind CSS", "CSS", "SASS", "Material-UI", "Bootstrap", "Styled Components"] },
  // Databases
  { category: "Databases", items: ["PostgreSQL", "MySQL", "MongoDB", "Firebase", "Redis", "SQLite", "Supabase"] },
  // DevOps & Tools
  { category: "DevOps & Tools", items: ["Docker", "Kubernetes", "Git", "GitHub", "CI/CD", "AWS", "Vercel", "Netlify"] },
  // Testing
  { category: "Testing", items: ["Jest", "Vitest", "Playwright", "Cypress", "Testing Library", "Mocha"] },
  // UI Libraries
  { category: "UI Libraries", items: ["shadcn/ui", "Headless UI", "Chakra UI", "Ant Design", "Radix UI"] },
  // State Management
  { category: "State Management", items: ["Redux", "Zustand", "Jotai", "Context API", "Pinia", "Vuex"] },
  // Other Tools
  { category: "Other Tools", items: ["GraphQL", "REST API", "WebSocket", "Socket.io", "Framer Motion", "Three.js"] },
];

// Flat list for easy searching
export const ALL_TECH_STACK = TECH_STACK_OPTIONS.flatMap((group) => group.items);
