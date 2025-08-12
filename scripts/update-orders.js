import { createClient } from "@sanity/client";

// Create Sanity client
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  token: process.env.SANITY_API_TOKEN, // You'll need a token with write permissions
  apiVersion: "2024-01-01",
  useCdn: false,
});

async function updateOrders() {
  try {
    console.log("Starting order update process...");

    // Fetch all orders that don't have the required fields
    const orders = await client.fetch(`
      *[_type == "order" && status == "completed"] {
        _id,
        stripeSessionId,
        customerEmail,
        amount,
        currency,
        status,
        createdAt,
        updatedAt
      }
    `);

    console.log(`Found ${orders.length} orders to update`);

    if (orders.length === 0) {
      console.log("No orders found to update");
      return;
    }

    // Update each order with missing fields
    for (const order of orders) {
      console.log(`Updating order: ${order._id}`);

      try {
        await client
          .patch(order._id)
          .set({
            // Ensure all required fields exist with proper defaults
            stripeSessionId: order.stripeSessionId || "",
            customerEmail: order.customerEmail || "",
            amount: order.amount || 0,
            currency: order.currency || "usd",
            status: order.status || "completed",
            product: order.product || "fermi_source_code",
            createdAt: order.createdAt || new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          })
          .commit();

        console.log(`✅ Successfully updated order: ${order._id}`);
      } catch (error) {
        console.error(`❌ Failed to update order ${order._id}:`, error);
      }
    }

    console.log("Order update process completed!");
  } catch (error) {
    console.error("Error updating orders:", error);
  }
}

// Run the update
updateOrders();
