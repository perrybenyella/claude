# Office Chore Manager

## What This Is

A single-page React application for managing team chores with calendar visualization. Allows creating one-time and recurring chores, assigning them to team members, and viewing them in a monthly calendar interface.

**Status**: Fully functional MVP with in-memory storage (data resets on page refresh)

## Tech Stack

- **Frontend**: React 19 + TypeScript
- **Build Tool**: Vite 7
- **State Management**: Zustand 5
- **Date Utilities**: date-fns 4
- **Styling**: Vanilla CSS
- **Linting**: ESLint 9 with TypeScript ESLint

## Project Structure

```
chore-app/
├── src/
│   ├── components/          # React components organized by feature
│   │   ├── Calendar/        # Calendar header, month view, day cells
│   │   ├── Chores/          # Chore form, list, and individual items
│   │   └── Team/            # Team member form and list
│   ├── store/               # Zustand state management
│   │   └── useAppStore.ts   # Central app state and actions
│   ├── types/               # TypeScript type definitions
│   │   └── index.ts         # Core types (TeamMember, Chore, etc.)
│   ├── utils/               # Helper functions
│   │   ├── dateUtils.ts     # Date formatting and manipulation
│   │   └── recurrenceUtils.ts # Chore recurrence logic
│   ├── styles/              # CSS styling
│   ├── App.tsx              # Root component
│   └── main.tsx             # App entry point
├── public/                  # Static assets
├── dist/                    # Production build output (gitignored)
└── node_modules/            # Dependencies (gitignored)
```

## Key Files & Their Purpose

- `src/store/useAppStore.ts:44-147` - Zustand store with all state and actions
- `src/types/index.ts:1-38` - Core type definitions for the entire app
- `src/utils/recurrenceUtils.ts:10-25` - Logic for determining if a chore occurs on a given date
- `src/components/Chores/ChoreForm.tsx:5-178` - Complex form with recurring/one-time toggle
- `src/App.tsx:10-58` - Main layout and navigation structure
- `vite.config.ts:5-16` - Vite configuration with single-bundle output for offline use

## Essential Commands

```bash
# Development
cd chore-app
npm run dev          # Start dev server at http://localhost:5173

# Production
npm run build        # Build to dist/ folder (works offline)
npm run preview      # Preview production build locally

# Code Quality
npm run lint         # Run ESLint
```

## Core Concepts

### State Management
All application state lives in a single Zustand store (`useAppStore`). Components access state via selectors and call actions to update state.

### Chore Types
- **One-time**: Single date, stored in `chore.date`
- **Recurring**: Weekly pattern with `daysOfWeek` array (0=Sunday, 6=Saturday)

### Team Members
Each team member gets a randomly assigned color used throughout the UI for visual distinction.

### Calendar Logic
The calendar computes which chores appear on each day using `getChoresForDate()` which checks:
1. One-time chores: direct date match
2. Recurring chores: day-of-week match within start/end date range

## Data Persistence

**Important**: Data is stored in-memory only and resets on page refresh. The app warns users before leaving if data exists. To add localStorage persistence, use Zustand's `persist` middleware in `src/store/useAppStore.ts`.

## Development Guidelines

### Adding New Features or fixing bugs
**IMPORTANT**: When you work on a new feature or bug, create a git branch first. Then work on changes in that branch for the remainder of the session. 
1. Define types in `src/types/index.ts` if needed
2. Add state/actions to `src/store/useAppStore.ts`
3. Create components in appropriate feature folder
4. Add utility functions to `src/utils/` if logic is reusable

### Key Patterns
- Use functional components with hooks
- Access Zustand state with selectors: `useAppStore(state => state.property)`
- All state mutations go through Zustand actions using immutable patterns
- Keep components small and focused on single responsibility

## Additional Documentation

For detailed information on specific topics, refer to:

- `.claude/docs/architectural_patterns.md` - Design patterns, state management approach, component composition patterns, and code conventions

## Common Tasks

### Add a New Chore Field
1. Update `Chore` type in `src/types/index.ts`
2. Update `ChoreInput` type
3. Modify `ChoreForm.tsx` to include new field
4. Update store action in `useAppStore.ts` if needed

### Add New Recurrence Type
1. Update `RecurrencePattern` type in `src/types/index.ts`
2. Modify `doesChoreOccurOnDate()` in `src/utils/recurrenceUtils.ts`
3. Update `ChoreForm.tsx` UI to support new recurrence type

### Add Persistence
Wrap Zustand store with `persist` middleware:
```typescript
import { persist } from 'zustand/middleware'

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({ /* existing store */ }),
    { name: 'chore-app-storage' }
  )
)
```

## Troubleshooting

- **Build errors about modules**: Check `tsconfig.app.json:14` has `verbatimModuleSyntax: false`
- **Date issues**: Ensure date-fns functions are imported from `date-fns` package
- **State not updating**: Verify actions are defined in store and called correctly
- **Browser support**: Requires modern browsers (Chrome/Edge 90+, Firefox 88+, Safari 14+)
