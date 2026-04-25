# User Downloads Components

This directory contains the refactored user downloads management components, broken down from the original large `DownloadsTool` component into smaller, reusable pieces.

## Component Structure

### Main Component

- **`UserDownloads`** (`../user-downloads.tsx`) - Main orchestrator component that manages state and data fetching

### Sub-components

- **`StatsCards`** - Displays summary statistics (total orders, active downloads, active tokens, total revenue)
- **`DownloadsSection`** - Container for the list of download items
- **`TokensSection`** - Container for the list of active tokens
- **`DownloadItem`** - Individual download item display
- **`TokenItem`** - Individual token item display
- **`RefreshButton`** - Reusable refresh button component

### Shared Resources

- **`types.ts`** - Shared TypeScript interfaces for `DownloadInfo` and `TokenInfo`
- **`utils.ts`** - Shared utility functions for formatting, time calculations, and clipboard operations
- **`index.ts`** - Barrel export file for easy imports

## Usage

```tsx
import { UserDownloads } from "./user-downloads";

// Use in Sanity Studio
S.component(UserDownloads).title("User Download Management");
```

## Benefits of Refactoring

1. **Maintainability** - Each component has a single responsibility
2. **Reusability** - Components can be used independently
3. **Testability** - Smaller components are easier to test
4. **Readability** - Code is more organized and easier to understand
5. **Type Safety** - Shared types ensure consistency across components

## Data Flow

1. `UserDownloads` fetches data from API endpoints
2. Data is passed down to child components as props
3. Each component handles its own rendering logic
4. Utility functions provide consistent formatting and calculations
