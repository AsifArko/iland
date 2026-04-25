import { defineField, defineType } from "sanity";

export default defineType({
  name: "proxyUrl",
  title: "Proxy URL",
  type: "document",
  fields: [
    defineField({
      name: "sessionId",
      title: "Stripe Session ID",
      type: "string",
      description: "The Stripe session ID from the payment",
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: "downloadUrl",
      title: "GitHub Download URL",
      type: "url",
      description: "The GitHub API URL for the download",
      validation: Rule => Rule.required().uri({ scheme: ["https"] }),
    }),
    defineField({
      name: "filename",
      title: "Download Filename",
      type: "string",
      description:
        "The filename for the download (e.g., iland-source-code.zip)",
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: "token",
      title: "Download Token",
      type: "string",
      description: "Secure token for download validation",
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: "expiresAt",
      title: "Expires At",
      type: "datetime",
      description: "When this download link expires",
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: "isExpired",
      title: "Is Expired",
      type: "boolean",
      initialValue: false,
      description: "Manual flag to mark as expired",
    }),
    defineField({
      name: "downloadCount",
      title: "Download Count",
      type: "number",
      initialValue: 0,
      description: "Number of times this link has been downloaded",
    }),
    defineField({
      name: "order",
      title: "Order",
      type: "reference",
      to: [{ type: "order" }],
      description: "Reference to the associated order",
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
      title: "sessionId",
      subtitle: "filename",
      expiresAt: "expiresAt",
      isExpired: "isExpired",
      downloadCount: "downloadCount",
    },
    prepare(value) {
      const { title, subtitle, isExpired, downloadCount } = value;
      const status = isExpired ? "Expired" : "Active";

      return {
        title: `Session: ${title?.substring(0, 20)}...`,
        subtitle: `${subtitle} • ${status} • ${downloadCount || 0} downloads`,
      };
    },
  },
});
