import { defineField, defineType } from "sanity";

export default defineType({
  name: "download",
  title: "Download",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
    }),
    defineField({
      name: "gitRepository",
      title: "Git Repository",
      type: "object",
      fields: [
        defineField({
          name: "url",
          title: "Repository URL",
          type: "url",
          description:
            "GitHub, GitLab, or other Git repository URL (can be private)",
          validation: Rule =>
            Rule.required().uri({ scheme: ["http", "https"] }),
        }),
        defineField({
          name: "branch",
          title: "Branch",
          type: "string",
          initialValue: "master",
          description: "Branch to download (e.g., master, main, develop)",
          validation: Rule => Rule.required(),
        }),
        defineField({
          name: "includeNodeModules",
          title: "Include node_modules",
          type: "boolean",
          initialValue: false,
          description: "Whether to include node_modules in the download",
        }),
        defineField({
          name: "excludePatterns",
          title: "Exclude Patterns",
          type: "array",
          of: [{ type: "string" }],
          description:
            "Additional patterns to exclude (e.g., .env, .DS_Store, .gitignore)",
          options: {
            layout: "tags",
          },
        }),
      ],
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: "version",
      title: "Version",
      type: "string",
      initialValue: "1.0.0",
    }),
    defineField({
      name: "isActive",
      title: "Active",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "downloadCount",
      title: "Download Count",
      type: "number",
      initialValue: 0,
      readOnly: true,
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
      title: "title",
      subtitle: "version",
      branch: "gitRepository.branch",
    },
    prepare(value) {
      const { title, subtitle, branch } = value;
      return {
        title: title || "No title",
        subtitle: `Version: ${subtitle} (${branch || "master"})`,
      };
    },
  },
});
