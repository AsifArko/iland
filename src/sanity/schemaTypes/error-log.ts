import { defineField, defineType } from "sanity";

export default defineType({
  name: "errorLog",
  title: "Error Log",
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
      name: "errorType",
      title: "Error Type",
      type: "string",
      options: {
        list: [
          { title: "Client Error", value: "client" },
          { title: "Server Error", value: "server" },
          { title: "Database Error", value: "database" },
          { title: "External Error", value: "external" },
        ],
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: "message",
      title: "Error Message",
      type: "text",
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: "stack",
      title: "Stack Trace",
      type: "text",
    }),
    defineField({
      name: "url",
      title: "URL",
      type: "string",
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: "sessionId",
      title: "Session ID",
      type: "string",
    }),
    defineField({
      name: "userId",
      title: "User ID",
      type: "string",
    }),
    defineField({
      name: "ipAddress",
      title: "IP Address",
      type: "string",
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: "userAgent",
      title: "User Agent",
      type: "text",
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: "severity",
      title: "Severity",
      type: "string",
      options: {
        list: [
          { title: "Low", value: "low" },
          { title: "Medium", value: "medium" },
          { title: "High", value: "high" },
          { title: "Critical", value: "critical" },
        ],
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: "resolved",
      title: "Resolved",
      type: "boolean",
      initialValue: false,
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
      title: "message",
      subtitle: "timestamp",
      errorType: "errorType",
      severity: "severity",
      resolved: "resolved",
    },
    prepare(value) {
      const { title, subtitle, errorType, severity, resolved } = value;
      const status = resolved ? "✅ Resolved" : "❌ Open";
      return {
        title: title || "Unknown Error",
        subtitle: `${new Date(subtitle).toLocaleString()} - ${errorType} (${severity}) - ${status}`,
      };
    },
  },
});
