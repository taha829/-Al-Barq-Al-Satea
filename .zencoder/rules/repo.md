---
description: Repository Information Overview
alwaysApply: true
---

# Al Barq Al Satea Information

## Summary
Al Barq Al Satea is a React-based web application for a plastic manufacturing company in Jordan. Built with modern web technologies including React 18, TypeScript, Vite, and shadcn/ui components, it features a bilingual interface (Arabic/English) for showcasing plastic bags and table covers manufacturing services.

## Structure
**src/**: Main application source code with components, pages, contexts, and localization
**public/**: Static assets including favicon and placeholder images
**src/components/**: Reusable UI components including shadcn/ui library and custom components
**src/pages/**: Application pages (Home, About, Services, Contact, Order Booking)
**src/locales/**: Internationalization files for Arabic and English languages
**src/contexts/**: React contexts for language management

## Language & Runtime
**Language**: TypeScript/JavaScript
**Version**: TypeScript 5.8.3, React 18.3.1
**Build System**: Vite 5.4.19
**Package Manager**: npm (with Bun lockfile present)

## Dependencies
**Main Dependencies**:
- React 18.3.1 with React Router DOM 6.30.1
- shadcn/ui components (@radix-ui/* packages)
- TanStack Query 5.83.0 for data fetching
- React Hook Form 7.61.1 with Zod 3.25.76 validation
- Tailwind CSS 3.4.17 with animations
- Lucide React 0.462.0 for icons
- Date-fns 3.6.0 and Recharts 2.15.4

**Development Dependencies**:
- Vite with React SWC plugin
- ESLint 9.32.0 with TypeScript support
- Tailwind CSS with typography plugin
- PostCSS and Autoprefixer
- Lovable Tagger for development

## Build & Installation
```bash
npm install
npm run dev
npm run build
npm run preview
npm run lint
```

## Main Files & Resources
**Entry Point**: src/main.tsx
**Root Component**: src/App.tsx
**Configuration**: vite.config.ts, tailwind.config.ts, tsconfig.json
**Styling**: src/index.css with Tailwind CSS
**Components**: shadcn/ui component library in src/components/ui/
**Internationalization**: src/locales/ar.ts and src/locales/en.ts
**Pages**: Home, About, Services, Contact, Order Booking, and 404 pages