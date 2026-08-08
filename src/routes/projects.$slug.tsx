import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight, ExternalLink } from "lucide-react";
import { GithubIcon } from "@/components/site/BrandIcons";
import { ActionAnchor } from "@/components/site/Action";
import { Section } from "@/components/site/Section";
import { Reveal } from "@/components/motion/Reveal";
import { getProject, projects, type Project } from "@/data/projects";
import { site } from "@/data/site";

export const Route = createFileRoute("/projects/$slug")({
  loader: ({ params }) => {
    const project = getProject(params.slug);
    if (!project) throw notFound();
    return { project };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Project unavailable" }, { name: "robots", content: "noindex" }],
      };
    }
    const { project } = loaderData;
    return {
      meta: [
        { title: `${project.name} — ${project.category} case study | Himanshu Tripathi` },
        { name: "description", content: project.tagline },
        { property: "og:title", content: `${project.name} — case study` },
        { property: "og:description", content: project.tagline },
      ],
    };
  },
  notFoundComponent: ProjectNotFound,
  component: ProjectCaseStudy,
});

function ProjectNotFound() {
  return (
    <Section>
      <p className="mono-label">Not found</p>
      <h1 className="mt-5 text-3xl font-semibold text-foreground md:text-4xl">
        That case study doesn't exist.
      </h1>
      <Link
        to="/projects"
        className="mt-8 inline-flex items-center gap-2 font-mono text-sm text-accent hover:text-foreground"
      >
        <ArrowLeft className="size-4" /> All projects
      </Link>
    </Section>
  );
}

function ProjectCaseStudy() {
  const { project } = Route.useLoaderData() as { project: Project };
  const index = projects.findIndex((p) => p.slug === project.slug);
  const next = projects[(index + 1) % projects.length];

  return (
    <article>
      <Section className="pb-10">
        <Reveal>
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-3.5" /> Projects
          </Link>
          <p className="mono-label mt-10">
            {project.category} · {project.year}
          </p>
          <h1 className="mt-5 max-w-3xl text-4xl font-semibold text-gradient md:text-6xl">
            {project.name}
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            {project.tagline}
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <ActionAnchor
              href={project.github ?? site.github}
              target="_blank"
              rel="noreferrer"
              variant="primary"
            >
              <GithubIcon className="size-4" /> View source
            </ActionAnchor>
            {project.demo ? (
              <ActionAnchor href={project.demo} target="_blank" rel="noreferrer">
                <ExternalLink className="size-4" /> Live demo
              </ActionAnchor>
            ) : null}
          </div>
        </Reveal>
      </Section>

      <Reveal className="px-6 md:px-10">
        <div className="mx-auto w-full max-w-6xl overflow-hidden rounded-xl border border-border">
          <img
            src={project.image}
            alt={`${project.name} hero visual`}
            width={1536}
            height={864}
            className="aspect-[16/9] w-full object-cover"
          />
        </div>
      </Reveal>

      <Section className="pb-12">
        <div className="grid gap-14 lg:grid-cols-[1.6fr_1fr]">
          <div className="space-y-14">
            <Block title="Overview">
              <p>{project.overview}</p>
            </Block>
            <Block title="Problem">
              <p>{project.problem}</p>
            </Block>
            <Block title="Goals">
              <BulletList items={project.goals} />
            </Block>
            <Block title="Architecture">
              <ol className="space-y-5">
                {project.architecture.map((item, i) => (
                  <li key={item} className="flex gap-4">
                    <span className="mt-0.5 font-mono text-xs text-accent">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
                      {item}
                    </p>
                  </li>
                ))}
              </ol>
            </Block>
            <Block title="Challenges">
              <div className="space-y-4">
                {project.challenges.map((challenge) => (
                  <div key={challenge.title} className="surface-card p-6">
                    <h4 className="text-base font-semibold text-foreground">{challenge.title}</h4>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      {challenge.body}
                    </p>
                  </div>
                ))}
              </div>
            </Block>
            <Block title="Lessons learned">
              <BulletList items={project.lessons} />
            </Block>
          </div>

          <aside className="space-y-10 lg:sticky lg:top-24 lg:self-start">
            <div className="surface-card p-7">
              <p className="mono-label">Results</p>
              <dl className="mt-5 space-y-4">
                {project.results.map((result) => (
                  <div key={result.label} className="border-b border-border pb-4 last:border-0 last:pb-0">
                    <dd className="font-display text-2xl font-semibold text-foreground">
                      {result.value}
                    </dd>
                    <dt className="mt-1 text-xs text-muted-foreground">{result.label}</dt>
                  </div>
                ))}
              </dl>
            </div>

            <div className="surface-card p-7">
              <p className="mono-label">Tech stack</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-md border border-border bg-surface/50 px-2.5 py-1 font-mono text-xs text-muted-foreground"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="surface-card p-7">
              <p className="mono-label">Features</p>
              <ul className="mt-5 space-y-2.5">
                {project.features.map((feature) => (
                  <li key={feature} className="flex gap-3 text-sm text-muted-foreground">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </Section>

      {next ? (
        <Section className="border-t border-border bg-surface/20">
          <Reveal>
            <p className="mono-label">Next case study</p>
            <Link
              to="/projects/$slug"
              params={{ slug: next.slug }}
              className="group mt-5 flex flex-wrap items-end justify-between gap-6"
            >
              <h2 className="text-3xl font-semibold text-gradient md:text-5xl">{next.name}</h2>
              <span className="inline-flex items-center gap-2 font-mono text-sm text-accent">
                Read
                <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
              </span>
            </Link>
          </Reveal>
        </Section>
      ) : null}
    </article>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Reveal>
      <section>
        <h2 className="mono-label">{title}</h2>
        <div className="mt-5 text-sm leading-relaxed text-muted-foreground md:text-base">
          {children}
        </div>
      </section>
    </Reveal>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <span className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
