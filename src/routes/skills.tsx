import { createFileRoute } from "@tanstack/react-router";
import { Section, SectionHeading } from "@/components/site/Section";
import { Reveal } from "@/components/motion/Reveal";
import { Card3DList } from "@/components/ui/animated-3d-card";
import { skillGroups } from "@/data/skills";

export const Route = createFileRoute("/skills")({
  head: () => ({
    meta: [
      { title: "Skills & Toolkit — Himanshu Tripathi" },
      {
        name: "description",
        content:
          "Frontend, backend, AI/ML, database, cloud, languages and tooling that Himanshu Tripathi has shipped production work with — no fake percentages.",
      },
      { property: "og:title", content: "Skills & Toolkit — Himanshu Tripathi" },
      {
        property: "og:description",
        content: "Categorised engineering toolkit grounded in shipped projects.",
      },
    ],
  }),
  component: Skills,
});

function Skills() {
  return (
    <>
      <Section className="pb-8">
        <Reveal>
          <p className="mono-label">Toolkit</p>
          <h1 className="mt-5 max-w-3xl text-4xl font-semibold text-gradient md:text-6xl">
            Tools I've shipped with, grouped by where they earn their place.
          </h1>
          <p className="mt-7 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            No progress bars, no invented proficiency numbers. Everything listed here appears in a
            project on this site.
          </p>
        </Reveal>
      </Section>

      <Section className="pt-8">
        <Card3DList
          columns={3}
          gap="lg"
          size="md"
          variant="premium"
          cards={skillGroups.map((group, i) => ({
            id: group.title,
            title: group.title,
            description: group.note,
            meta: group.items,
            theme: ([
              "primary",
              "secondary",
              "info",
              "success",
              "neutral",
              "warning",
              "accent",
              "danger",
            ] as const)[i % 8]!,

            icon: <group.icon className="size-5" />,
          }))}
        />
      </Section>


      <Section className="border-t border-border">
        <SectionHeading
          eyebrow="Depth over breadth"
          title="Where I'd want to be judged."
          description="TypeScript across the stack, Python for anything model-shaped, and data modelling as the first design step. Everything else is learnable in a sprint."
        />
      </Section>
    </>
  );
}
