import { defineField, defineType } from "sanity";

export default defineType({
  name: "conversionEvent",
  title: "Conversion Event",
  type: "document",
  fields: [
    defineField({
      name: "id",
      title: "ID",
      type: "string",
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: "timestamp",
      title: "Timestamp",
      type: "datetime",
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: "conversionType",
      title: "Conversion Type",
      type: "string",
      options: {
        list: [
          { title: "Purchase", value: "purchase" },
          { title: "Download", value: "download" },
          { title: "Signup", value: "signup" },
          { title: "Contact", value: "contact" },
        ],
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: "value",
      title: "Value",
      type: "number",
      validation: Rule => Rule.required().positive(),
    }),
    defineField({
      name: "currency",
      title: "Currency",
      type: "string",
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: "sessionId",
      title: "Session ID",
      type: "string",
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: "userId",
      title: "User ID",
      type: "string",
    }),
    defineField({
      name: "metadata",
      title: "Metadata",
      type: "object",
      fields: [
        {
          name: "key",
          title: "Key",
          type: "string",
        },
        {
          name: "value",
          title: "Value",
          type: "string",
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: "conversionType",
      subtitle: "timestamp",
      value: "value",
      currency: "currency",
    },
    prepare(value) {
      const { title, subtitle, value: conversionValue, currency } = value;
      return {
        title: title || "Unknown Conversion",
        subtitle: `${new Date(subtitle).toLocaleString()} - ${conversionValue} ${currency}`,
      };
    },
  },
});
