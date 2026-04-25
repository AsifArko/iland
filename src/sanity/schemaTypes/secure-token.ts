import { defineField, defineType } from "sanity";

export default defineType({
  name: "secureToken",
  title: "Secure Token",
  type: "document",
  fields: [
    defineField({
      name: "token",
      title: "Secure Token",
      type: "string",
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: "sessionId",
      title: "Stripe Session ID",
      type: "string",
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: "order",
      title: "Order",
      type: "reference",
      to: [{ type: "order" }],
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: "isUsed",
      title: "Is Used",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "createdAt",
      title: "Created At",
      type: "datetime",
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: "expiresAt",
      title: "Expires At",
      type: "datetime",
      validation: Rule => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "token",
      subtitle: "sessionId",
      media: "order",
    },
    prepare(value) {
      return {
        title: `Token: ${value.title?.substring(0, 8)}...`,
        subtitle: `Session: ${value.subtitle?.substring(0, 20)}...`,
      };
    },
  },
});
