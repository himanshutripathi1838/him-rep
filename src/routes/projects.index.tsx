import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Section, SectionHeading } from "@/components/site/Section";
import { Reveal } from "@/components/motion/Reveal";
import { TiltCard } from "@/components/motion/TiltCard";
import { projects } from "@/data/projects";

export const Route = createFileRoute("/projects/")({
  head: () => ({
    meta: [
      { title: "Projects — Engineering Case Studies | Himanshu Tripathi" },
      {
        name: "description",
        content:
          "Seven production case studies: marketplace platform, YOLOv8 detection pipeline, AI document workspace, education platform, ordering platform and brand sites.",
      },
      { property: "og:title", content: "Projects — Himanshu Tripathi" },
      {
        property: "og:description",
        content: "Problem, architecture, challenges and results for every project.",
      },
    ],
  }),
  component: ProjectsIndex,
});

function ProjectsIndex() {
  return (
    <>
      <Section className="pb-8">
        <Reveal>
          <p className="mono-label">Work</p>
          <h1 className="mt-5 max-w-3xl text-4xl font-semibold text-gradient md:text-6xl">
            Seven projects, documented like engineering, not like a gallery.
          </h1>
          <p className="mt-7 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            Every entry covers the problem, the architecture, the parts that broke and what changed
            measurably afterwards.
          </p>
        </Reveal>
      </Section>

      <Section className="pt-8">
        <div className="grid gap-8 lg:grid-cols-2">
          {projects.map((project, i) => (
            <Reveal key={project.slug} delay={(i % 2) * 0.06}>
              <TiltCard
                to="/projects/$slug"
                params={{ slug: project.slug }}
                innerClassName="flex flex-col h-full"
              >
                <div className="overflow-hidden border-b border-border">
                  <img
                    src={project.image}
                    alt={`${project.name} visual`}
                    loading="lazy"
                    width={1536}
                    height={864}
                    className="aspect-[16/9] w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                </div>
                <div className="flex flex-1 flex-col p-7">
                  <p className="mono-label">
                    {project.category} · {project.year}
                  </p>
                  <h2 className="mt-4 text-xl font-semibold text-foreground">{project.name}</h2>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {project.tagline}
                  </p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {project.stack.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="rounded-md border border-border px-2.5 py-1 font-mono text-xs text-muted-foreground"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <span className="mt-6 inline-flex items-center gap-2 font-mono text-sm text-accent">
                    Case study
                    <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </Section>
    </>
  );
}
