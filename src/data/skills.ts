import {
  Boxes,
  Cloud,
  Code2,
  Database,
  Layers,
  Server,
  Sparkles,
  Wrench,
} from "lucide-react";

export type SkillGroup = {
  title: string;
  icon: typeof Code2;
  note: string;
  items: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    title: "Frontend",
    icon: Layers,
    note: "Component architecture, accessibility, motion with intent.",
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "shadcn/ui", "Framer Motion", "Vite"],
  },
  {
    title: "Backend",
    icon: Server,
    note: "REST design, auth, background jobs, clean service boundaries.",
    items: ["Node.js", "Express", "FastAPI", "REST APIs", "JWT / OAuth", "WebSockets"],
  },
  {
    title: "AI / ML",
    icon: Sparkles,
    note: "Applied CV and LLM pipelines with measured evaluation.",
    items: ["PyTorch", "YOLOv8", "OpenCV", "scikit-learn", "OCR", "Prompt & RAG pipelines"],
  },
  {
    title: "Database",
    icon: Database,
    note: "Schema design first, indexes before optimisation guesses.",
    items: ["PostgreSQL", "MongoDB", "Firebase / Firestore", "SQL", "Redis basics"],
  },
  {
    title: "Cloud & Infra",
    icon: Cloud,
    note: "Deploys, storage, CI and observability for small teams.",
    items: ["AWS basics", "Vercel", "Docker", "Cloudinary", "GitHub Actions", "Firebase Hosting"],
  },
  {
    title: "Languages",
    icon: Code2,
    note: "Comfortable moving between typed and scripting worlds.",
    items: ["TypeScript", "JavaScript", "Python", "Java", "C++", "SQL"],
  },
  {
    title: "Tools",
    icon: Wrench,
    note: "The daily loop: version control, testing, profiling.",
    items: ["Git", "Postman", "Figma", "Jupyter", "Linux", "Vitest"],
  },
  {
    title: "Engineering practice",
    icon: Boxes,
    note: "How the work stays maintainable after the demo.",
    items: [
      "System design",
      "Code review",
      "Testing strategy",
      "Performance budgets",
      "Documentation",
    ],
  },
];
