import { ToolError, defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { projects } from "@/data/projects";

export default defineTool({
  name: "get_project",
  title: "Get project case study",
  description:
    "Get one project's full case study: overview, problem, goals, architecture, challenges, stack, features, results and lessons.",
  inputSchema: {
    slug: z.string().trim().min(1).describe("Project slug from list_projects, e.g. 'shiftlyin'."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ slug }) => {
    const project = projects.find((p) => p.slug === slug.toLowerCase());
    if (!project) {
      throw new ToolError(
        `No project with slug "${slug}". Known slugs: ${projects.map((p) => p.slug).join(", ")}.`,
      );
    }
    const { image: _image, ...rest } = project;
    return {
      content: [{ type: "text", text: JSON.stringify(rest, null, 2) }],
      structuredContent: { project: rest },
    };
  },
});
