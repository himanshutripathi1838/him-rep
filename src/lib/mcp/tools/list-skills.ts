import { defineTool } from "@lovable.dev/mcp-js";
import { skillGroups } from "@/data/skills";

export default defineTool({
  name: "list_skills",
  title: "List skills",
  description:
    "List the technical skill groups (frontend, backend, data, AI/ML, cloud, tools) with the technologies in each.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => {
    const groups = skillGroups.map(({ title, note, items }) => ({ title, note, items }));
    return {
      content: [{ type: "text", text: JSON.stringify(groups, null, 2) }],
      structuredContent: { groups },
    };
  },
});
