import { defineTool } from "@lovable.dev/mcp-js";
import { site, stats, experience, education, achievements, timeline } from "@/data/site";

export default defineTool({
  name: "get_profile",
  title: "Get profile",
  description:
    "Get Himanshu Tripathi's public profile: role, intro, contact links, headline stats, experience, education, achievements and career timeline.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => {
    const profile = {
      name: site.name,
      role: site.role,
      roles: site.roles,
      intro: site.intro,
      email: site.email,
      location: site.location,
      github: site.github,
      linkedin: site.linkedin,
      resumeUrl: site.resumeUrl,
      stats,
      experience,
      education,
      achievements,
      timeline,
    };
    return {
      content: [{ type: "text", text: JSON.stringify(profile, null, 2) }],
      structuredContent: { profile },
    };
  },
});
