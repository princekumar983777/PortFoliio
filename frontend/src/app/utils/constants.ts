export type NavLink = {
  id: string;
  label: string;
  href: string;
};

export const SITE = {
  name: "Prince's Portfolio",
  title: "Prince · Frontend Engineer",
  description: "Building modern web experiences with AI and code.",
};

export const NAV_LINKS: NavLink[] = [
  { id: "nav-hero", label: "Home", href: "#home" },
  { id: "nav-projects", label: "Projects", href: "#projects" },
  { id: "nav-courses", label: "Courses", href: "#courses" },
  { id: "nav-ai", label: "AI Tools", href: "#ai-tools" },
  { id: "nav-about", label: "About", href: "#about" },
  { id: "nav-contact", label: "Contact", href: "#contact" },
];

export type Project = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  image?: string;
  repo?: string;
  demo?: string;
};

export const PROJECTS: Project[] = [
  {
    id: "proj-1",
    title: "AI-Powered Portfolio",
    description: "Next.js + Tailwind portfolio with AI widgets and smooth UX.",
    tags: ["Next.js", "Tailwind", "TypeScript"],
    image: "/images/window.svg",
    repo: "https://github.com/",
    demo: "https://",
  },
  {
    id: "proj-2",
    title: "Realtime Dashboard",
    description: "Websocket data viz with performant charts and caching.",
    tags: ["React", "WebSocket", "Vite"],
    image: "/images/globe.svg",
  },
  {
    id: "proj-3",
    title: "Design System",
    description: "Composable UI kit with tokens and accessibility baked-in.",
    tags: ["Storybook", "A11y", "Design Tokens"],
    image: "/images/window.svg",
  },
];

export type Course = {
  id: string;
  title: string;
  provider: string;
  progressPercent: number; // 0-100
};

export const COURSES: Course[] = [
  { id: "course-1", title: "TypeScript Mastery", provider: "Udemy", progressPercent: 85 },
  { id: "course-2", title: "React Performance", provider: "Frontend Masters", progressPercent: 60 },
  { id: "course-3", title: "System Design", provider: "Educative", progressPercent: 40 },
];

export const CONTACT = {
  email: "hello@example.com",
  github: "https://github.com/",
  linkedin: "https://linkedin.com/in/",
  twitter: "https://twitter.com/",
};


