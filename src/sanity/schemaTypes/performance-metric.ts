import { defineField, defineType } from "sanity";

export default defineType({
  name: "performanceMetric",
  title: "Performance Metric",
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
      name: "metricName",
      title: "Metric Name",
      type: "string",
      options: {
        list: [
          { title: "Largest Contentful Paint (LCP)", value: "lcp" },
          { title: "First Input Delay (FID)", value: "fid" },
          { title: "Cumulative Layout Shift (CLS)", value: "cls" },
          { title: "First Contentful Paint (FCP)", value: "fcp" },
          { title: "Time to First Byte (TTFB)", value: "ttfb" },
          { title: "Load Time", value: "loadTime" },
        ],
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: "value",
      title: "Value",
      type: "number",
      validation: Rule => Rule.required(),
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
      title: "metricName",
      subtitle: "timestamp",
      value: "value",
      url: "url",
    },
    prepare(value) {
      const { title, subtitle, value: metricValue, url } = value;
      return {
        title: title || "Unknown Metric",
        subtitle: `${new Date(subtitle).toLocaleString()} - ${metricValue}ms on ${url}`,
      };
    },
  },
});
