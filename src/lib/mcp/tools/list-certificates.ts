import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { certificates } from "@/data/certificates";

export default defineTool({
  name: "list_certificates",
  title: "List certificates",
  description:
    "List public certifications with title, issuer, year, category and detail. Optionally filter by category.",
  inputSchema: {
    category: z
      .enum(["Cloud", "Networking", "Development", "Security", "AI"])
      .optional()
      .describe("Return only certificates in this category."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ category }) => {
    const items = category ? certificates.filter((c) => c.category === category) : certificates;
    return {
      content: [{ type: "text", text: JSON.stringify(items, null, 2) }],
      structuredContent: { count: items.length, certificates: items },
    };
  },
});
