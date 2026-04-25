import { defineField, defineType } from "sanity";

export default defineType({
  name: "systemMetric",
  title: "System Metric",
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
      name: "metricType",
      title: "Metric Type",
      type: "string",
      options: {
        list: [
          { title: "CPU Usage", value: "cpu" },
          { title: "Memory Usage", value: "memory" },
          { title: "Disk Usage", value: "disk" },
          { title: "Network Latency", value: "network" },
          { title: "Response Time", value: "response_time" },
          { title: "Error Rate", value: "error_rate" },
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
      name: "unit",
      title: "Unit",
      type: "string",
      validation: Rule => Rule.required(),
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
      title: "metricType",
      subtitle: "timestamp",
      value: "value",
      unit: "unit",
    },
    prepare(value) {
      const { title, subtitle, value: metricValue, unit } = value;
      return {
        title: title || "Unknown Metric",
        subtitle: `${new Date(subtitle).toLocaleString()} - ${metricValue} ${unit}`,
      };
    },
  },
});
