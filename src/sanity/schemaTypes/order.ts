import { defineField, defineType } from "sanity";

export default defineType({
  name: "order",
  title: "Order",
  type: "document",
  fields: [
    defineField({
      name: "stripeSessionId",
      title: "Stripe Session ID",
      type: "string",
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: "customerEmail",
      title: "Customer Email",
      type: "string",
      validation: Rule => Rule.required().email(),
    }),
    defineField({
      name: "amount",
      title: "Amount (in cents)",
      type: "number",
      validation: Rule => Rule.required().positive(),
    }),
    defineField({
      name: "currency",
      title: "Currency",
      type: "string",
      initialValue: "usd",
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "Pending", value: "pending" },
          { title: "Completed", value: "completed" },
          { title: "Failed", value: "failed" },
        ],
      },
      initialValue: "pending",
    }),
    defineField({
      name: "product",
      title: "Product",
      type: "string",
              initialValue: "iland_source_code",
    }),
    defineField({
      name: "downloadUrl",
      title: "Download URL",
      type: "url",
    }),
    defineField({
      name: "createdAt",
      title: "Created At",
      type: "datetime",
      readOnly: true,
    }),
    defineField({
      name: "updatedAt",
      title: "Updated At",
      type: "datetime",
      readOnly: true,
    }),
  ],
  preview: {
    select: {
      title: "customerEmail",
      subtitle: "stripeSessionId",
      status: "status",
    },
    prepare(value) {
      const { title, subtitle, status } = value;
      return {
        title: title || "No email",
        subtitle: `Session: ${subtitle} (${status})`,
      };
    },
  },
});
