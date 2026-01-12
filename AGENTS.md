# Agent Instructions: Raghavendra Dwivedi Portfolio

## Project Overview

This is a modern React portfolio website showcasing full-stack developer skills, experience, and GitHub contributions. Built with React 19, TypeScript, Vite, Framer Motion, and Tailwind CSS.

**Tech Stack:**
- **Framework**: React 19.2.3 + TypeScript ~5.8.2
- **Build Tool**: Vite 6.2.0
- **Styling**: Tailwind CSS (inline classes, no separate CSS files)
- **Animations**: Framer Motion 12.25.0
- **Icons**: Lucide React 0.562.0
- **Dev Server**: Port 3000, host 0.0.0.0

---

## Architecture

### Project Structure
```
/
├── App.tsx                    # Main application component
├── index.tsx                  # Entry point
├── types.ts                   # TypeScript interfaces
├── constants.ts               # Resume data and content
├── vite.config.ts            # Vite configuration with API key
├── tsconfig.json             # TypeScript configuration
├── components/
│   ├── ThemeContext.tsx       # Dark/light theme provider
│   ├── Navigation.tsx         # Navigation component
│   ├── GithubActivity.tsx     # GitHub contributions graph
│   ├── TextRoller.tsx         # Text animation for roles
│   ├── AnimatedSection.tsx    # Section animation wrapper
│   ├── AnimatedCard.tsx       # Card animation wrapper
│   └── UIComponents.tsx       # Reusable UI components
```

### Key Patterns

**Component Structure:**
- Functional components with `React.FC` type annotation
- Hooks: `useEffect`, `useState`, `useMemo` for state management
- Props: TypeScript interfaces for all component props

**Styling:**
- Tailwind CSS classes only - no separate CSS files
- Dark mode support via `dark:` prefix classes
- Responsive design using `md:`, `sm:` prefixes
- Custom animation classes defined in Tailwind config (e.g., `animate-pulse-glow`, `animate-slide-in-bottom`)

**Type Safety:**
- All components use TypeScript interfaces from `types.ts`
- No `any` types or type suppression
- Proper typing for API responses, component props, and event handlers

---

## Code Conventions

### TypeScript
- Use `React.FC` for functional components
- Import types/interfaces from `types.ts` when available
- Use `Record<string, T>` for dynamic key-value objects
- Prefer explicit return types for exported functions

### React
- Use functional components only (no class components)
- Use hooks for state and side effects
- Props destructuring with TypeScript types
- Conditional rendering with ternary operators or `&&`

### Styling
- Tailwind CSS only - no inline `style={{}}` objects
- Dark mode classes: `dark:bg-zinc-950`, `dark:text-white`
- Responsive breakpoints: `sm:`, `md:`, `lg:`
- Custom animations in Tailwind config (check for `animate-*` classes)

### Animations (Framer Motion)
- Use `motion.*` components for animated elements
- Common props: `initial`, `animate`, `transition`, `whileHover`
- Variants for complex animations (see `AnimatedSection.tsx`)

---

## Key Components

### App.tsx
Main component orchestrating all sections:
- Hero section with profile image and role text roller
- GitHub Activity section
- Skills grid
- Experience timeline
- Projects grid
- Achievements list
- Education section
- Contact/footer

**Important:**
- Uses `ThemeProvider` for dark mode support
- All sections wrapped in `AnimatedSection` for scroll animations
- Responsive design (mobile-first approach)

### ThemeContext.tsx
Provides dark/light theme switching:
- Context: `ThemeContext` with `theme` and `toggleTheme`
- Uses localStorage to persist theme preference
- Applies theme to `document.documentElement` class

### GithubActivity.tsx
Fetches and displays GitHub contributions:
- API: `https://github-contributions-api.jogruber.de/v4/raghavdwd?y=last`
- Handles loading and error states
- Generates contribution grid with GitHub's color scheme
- Responsive horizontal scrolling

### AnimatedSection.tsx
Wrapper for section animations:
- Accepts `direction`, `delay`, and `staggerDelay` props
- Uses Framer Motion variants
- Supports left, right, up, down, and scale directions

### UIComponents.tsx
Reusable components:
- `Badge`, `Card`, `SectionTitle`, `SkillCard`
- Consistent styling across the app
- Dark mode support

---

## Constants

### `RESUME_DATA` (constants.ts)
Contains all portfolio content:
- Personal info: name, role, email, location
- Social links: GitHub, LinkedIn, X, Portfolio, Email
- Skills: languages, frontend, backend, tools (arrays)
- Experience: array of job objects with points
- Education: degree, institution, year, coursework
- Projects: array of project objects with tech stacks
- Achievements: array with titles and descriptions

**Note:** When updating content, modify this file only.

---

## Environment Variables

- `GEMINI_API_KEY`: Set in `.env.local` file
- Injected via `process.env.GEMINI_API_KEY` in `vite.config.ts`
- Currently unused in code but available for AI features

---

## Development Workflow

### Running the App
```bash
npm install          # Install dependencies
npm run dev          # Start dev server on port 3000
npm run build        # Build for production
npm run preview      # Preview production build
```

### Making Changes

**Updating Content:**
- Edit `constants.ts` for text, links, projects, etc.

**Adding Sections:**
1. Create component in `components/`
2. Add section to `App.tsx`
3. Wrap in `AnimatedSection` for scroll animations
4. Use Tailwind CSS for styling

**Styling:**
- Add Tailwind classes only
- For custom animations, extend Tailwind config
- Ensure dark mode support with `dark:` prefix

**TypeScript:**
- Define interfaces in `types.ts` or inline
- No type suppression allowed
- Run `lsp_diagnostics` to check for errors

---

## Important Guidelines

1. **No External CSS:** All styling must use Tailwind classes
2. **Type Safety:** Maintain strict TypeScript typing
3. **Responsive:** Test mobile and desktop layouts
4. **Dark Mode:** Always include dark mode variants
5. **Performance:** Use `useMemo` for expensive computations
6. **API Calls:** Handle loading and error states properly
7. **Animations:** Keep animations subtle and performant
8. **Accessibility:** Use semantic HTML and proper ARIA labels

---

## GitHub Integration

- GitHub username: `raghavdwd`
- Contributions API: External proxy service
- Profile image: `https://github.com/raghavdwd.png`
- Ensure GitHub links use `target="_blank"` and `rel="noreferrer"`

---

## Build & Deploy

- Build output: `dist/` folder (default Vite)
- Static site: No server required
- Can be deployed to Netlify, Vercel, GitHub Pages
- Environment variables must be set on deployment platform

---

## Testing Notes

- No test framework currently configured
- Manual testing required for:
  - Dark mode toggle
  - Responsive layouts
  - GitHub activity loading
  - Scroll animations
  - All external links

---
