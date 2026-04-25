#!/bin/bash

echo "🧹 Clearing all caches..."

# Clear Next.js cache
echo "Clearing .next cache..."
rm -rf .next

# Clear node_modules cache
echo "Clearing node_modules cache..."
rm -rf node_modules/.cache

# Clear Sanity cache
echo "Clearing Sanity cache..."
rm -rf .sanity

# Clear npm cache
echo "Clearing npm cache..."
npm cache clean --force

# Clear package-lock and reinstall
echo "Reinstalling dependencies..."
rm -rf package-lock.json
npm install

# Type check to ensure everything is working
echo "Running type check..."
npx tsc --noEmit

echo "✅ Cache clearing complete!"
echo "You can now run: npm run dev"
echo ""
echo "💡 If you still see caching issues:"
echo "   - Try running: ./scripts/clear-cache.sh"
echo "   - Or restart your development server"
echo "   - In extreme cases, restart your computer" 