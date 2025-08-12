# Scripts

This directory contains utility scripts for the iland project.

## update-orders.js

This script updates existing orders in Sanity with missing fields that are required by the admin downloads page.

### What it does

- Fetches all completed orders from Sanity
- Ensures all required fields exist with proper default values
- Updates the `updatedAt` timestamp for all orders

### When to run

Run this script when:

- The admin downloads page crashes with "Cannot read properties of null" errors
- You have existing orders that don't have all the required fields
- After adding new fields to the order schema

### How to run

1. **Ensure environment variables are set**:

   ```bash
   NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
   NEXT_PUBLIC_SANITY_DATASET=production
   SANITY_API_TOKEN=your_write_token
   ```

2. **Run the script**:

   ```bash
   npm run update-orders
   ```

   Or directly:

   ```bash
   node scripts/update-orders.js
   ```

### Required permissions

The `SANITY_API_TOKEN` must have **write permissions** to update documents in your Sanity dataset.

### Output

The script will:

- Show how many orders were found
- Log each order being updated
- Show success/failure for each update
- Provide a completion message

### Example output

```
Starting order update process...
Found 5 orders to update
Updating order: order_123
✅ Successfully updated order: order_123
Updating order: order_456
✅ Successfully updated order: order_456
...
Order update process completed!
```

### Safety

- This script only updates existing orders, it doesn't delete anything
- It preserves existing data and only adds missing fields
- It's safe to run multiple times
- It only affects orders with status "completed"

### Troubleshooting

If you get permission errors:

1. Check that your `SANITY_API_TOKEN` has write permissions
2. Verify the token is valid and not expired
3. Ensure the project ID and dataset are correct

If you get connection errors:

1. Check your internet connection
2. Verify Sanity is accessible
3. Check if there are any rate limits
