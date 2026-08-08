import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { projects } from "@/data/projects";

export default defineTool({
  name: "list_projects",
  title: "List projects",
  description:
    "List the portfolio's engineering case studies with slug, name, category, tagline, year, stack and featured flag. Use get_project for the full case study.",
  inputSchema: {
    featuredOnly: z
      .boolean()
      .optional()
      .describe("When true, return only projects marked as featured."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ featuredOnly }) => {
    const items = (featuredOnly ? projects.filter((p) => p.featured) : projects).map((p) => ({
      slug: p.slug,
      name: p.name,
      category: p.category,
      tagline: p.tagline,
      year: p.year,
      featured: p.featured,
      stack: p.stack,
      url: `/projects/${p.slug}`,
    }));
    return {
      content: [{ type: "text", text: JSON.stringify(items, null, 2) }],
      structuredContent: { count: items.length, projects: items },
    };
  },
});
