# User Downloads Component

This folder contains the main `UserDownloads` component that orchestrates the user download management interface in Sanity Studio.

## Structure

- **`user-downloads.tsx`** - Main component that manages state and data fetching
- **`index.ts`** - Barrel export for clean imports

## Usage

```tsx
import { UserDownloads } from "./user-downloads";

// Use in Sanity Studio
S.component(UserDownloads).title("User Download Management");
```

## Dependencies

This component depends on the shared components in the `./downloads/` folder:

- `StatsCards` - For displaying summary statistics
- `DownloadsSection` - For displaying the list of downloads
- `TokensSection` - For displaying active tokens
- `RefreshButton` - For refreshing data
- Shared types and utilities
