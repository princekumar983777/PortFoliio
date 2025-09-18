# Multipage Portfolio Structure

This document outlines the new multipage structure for the portfolio website.

## Overview

The portfolio has been refactored from a single-page application to a multipage Next.js application with the following structure:

### Pages

1. **Homepage (`/`)** - Compact overview with preview sections
2. **Projects (`/projects`)** - Full projects showcase
3. **Courses (`/courses`)** - Learning journey and course progress
4. **AI Tools (`/ai-tools`)** - Interactive AI-powered widgets
5. **About (`/about`)** - Detailed background and experience
6. **Contact (`/contact`)** - Contact form and information

### Key Features

#### 1. **Shared Layout Component**
- Consistent navigation across all pages
- Breadcrumb navigation (except homepage)
- Scroll-to-top button
- Footer (except homepage)
- Page transition animations

#### 2. **Performance Optimizations**
- Dynamic imports for all section components
- Loading states with skeleton animations
- Code splitting for better performance

#### 3. **Navigation Enhancements**
- Updated navbar with Next.js routing
- Active page highlighting
- Mobile-responsive navigation
- Breadcrumb navigation for sub-pages

#### 4. **SEO Optimization**
- Individual metadata for each page
- Semantic HTML structure
- Proper heading hierarchy
- Meta descriptions for each section

#### 5. **User Experience**
- Smooth scroll animations
- Page transition effects using Framer Motion
- Responsive design across all devices
- Loading states and skeleton screens

## File Structure

```
src/app/
├── components/
│   ├── Layout.tsx              # Shared layout wrapper
│   ├── Navbar.tsx              # Updated navigation
│   ├── Breadcrumbs.tsx         # Navigation breadcrumbs
│   ├── ScrollToTop.tsx         # Scroll to top button
│   ├── PageTransition.tsx      # Page transition animations
│   ├── Footer.tsx              # Site footer
│   ├── ProjectsPreview.tsx     # Homepage projects preview
│   ├── CoursesPreview.tsx      # Homepage courses preview
│   ├── AIToolsPreview.tsx      # Homepage AI tools preview
│   ├── AboutPreview.tsx        # Homepage about preview
│   └── ContactPreview.tsx      # Homepage contact preview
├── sections/                   # Full section components
│   ├── HeroSection.tsx
│   ├── ProjectsSection.tsx
│   ├── CoursesSection.tsx
│   ├── AIToolsSection.tsx
│   ├── AboutSection.tsx
│   └── ContactSection.tsx
├── projects/
│   └── page.tsx                # Projects page
├── courses/
│   └── page.tsx                # Courses page
├── ai-tools/
│   └── page.tsx                # AI Tools page
├── about/
│   └── page.tsx                # About page
├── contact/
│   └── page.tsx                # Contact page
├── page.tsx                    # Homepage
└── layout.tsx                  # Root layout
```

## Usage

### Homepage
The homepage now displays preview sections with "View More" buttons that link to full pages. Each preview shows a limited number of items to maintain the overview nature.

### Individual Pages
Each section has its own dedicated page with:
- Full content display
- Breadcrumb navigation
- SEO-optimized metadata
- Dynamic loading for performance

### Navigation
- Sticky navbar with active page highlighting
- Mobile-responsive hamburger menu
- Breadcrumb navigation for better UX
- Scroll-to-top button for long pages

## Performance Features

1. **Dynamic Imports**: All section components are dynamically imported to reduce initial bundle size
2. **Loading States**: Skeleton animations while components load
3. **Code Splitting**: Each page loads only its required components
4. **Optimized Images**: Proper image optimization and lazy loading

## SEO Features

1. **Individual Meta Tags**: Each page has unique title and description
2. **Semantic HTML**: Proper heading structure and semantic elements
3. **Breadcrumb Navigation**: Improves site structure understanding
4. **Open Graph Ready**: Structured for social media sharing

## Animation Features

1. **Page Transitions**: Smooth fade-in animations between pages
2. **Scroll Animations**: Smooth scrolling to sections
3. **Loading Animations**: Skeleton screens during component loading
4. **Hover Effects**: Interactive elements with smooth transitions

## Development

To run the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:3000`.

## Build

To build for production:

```bash
npm run build
```

This will create an optimized production build with all performance optimizations applied.
