import { defineMcp } from "@lovable.dev/mcp-js";
import getProfileTool from "./tools/get-profile";
import listProjectsTool from "./tools/list-projects";
import getProjectTool from "./tools/get-project";
import listSkillsTool from "./tools/list-skills";
import listCertificatesTool from "./tools/list-certificates";

export default defineMcp({
  name: "himanshu-tripathi-portfolio",
  title: "Himanshu Tripathi Portfolio",
  version: "0.1.0",
  instructions:
    "Read-only tools for Himanshu Tripathi's software engineering portfolio. Use `get_profile` for background, experience and contact links; `list_projects` and `get_project` for engineering case studies; `list_skills` for the tech stack; `list_certificates` for certifications.",
  tools: ([
    getProfileTool,
    listProjectsTool,
    getProjectTool,
    listSkillsTool,
    listCertificatesTool,
  ] as unknown[]) as Parameters<typeof defineMcp>[0]["tools"],
});
