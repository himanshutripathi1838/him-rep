import { createFileRoute } from "@tanstack/react-router";
import { Code2, GitBranch, GitPullRequest, Star } from "lucide-react";
import { GithubIcon } from "@/components/site/BrandIcons";
import { ActionAnchor } from "@/components/site/Action";
import { Section, SectionHeading } from "@/components/site/Section";
import { Reveal } from "@/components/motion/Reveal";
import { Counter } from "@/components/motion/Counter";
import { site } from "@/data/site";
import { projects } from "@/data/projects";

export const Route = createFileRoute("/github")({
  head: () => ({
    meta: [
      { title: "GitHub — Repositories & Activity | Himanshu Tripathi" },
      {
        name: "description",
        content:
          "Pinned repositories, top languages, contribution rhythm and recent activity for software engineer Himanshu Tripathi.",
      },
      { property: "og:title", content: "GitHub — Himanshu Tripathi" },
      {
        property: "og:description",
        content: "Pinned repositories, language mix and contribution rhythm.",
      },
    ],
  }),
  component: GitHubPage,
});

const ghStats = [
  { label: "Public repositories", value: 24, suffix: "", icon: GitBranch },
  { label: "Contributions this year", value: 640, suffix: "+", icon: GitPullRequest },
  { label: "Stars earned", value: 38, suffix: "", icon: Star },
  { label: "Primary languages", value: 6, suffix: "", icon: Code2 },
];

const languages = [
  { name: "TypeScript", share: 34 },
  { name: "Python", share: 26 },
  { name: "JavaScript", share: 18 },
  { name: "Java", share: 9 },
  { name: "CSS", share: 8 },
  { name: "Other", share: 5 },
];

const activity = [
  { action: "Pushed 7 commits to", repo: "shiftlyin", when: "2 days ago" },
  { action: "Opened pull request in", repo: "omni-docs", when: "5 days ago" },
  { action: "Released v0.3.0 of", repo: "pole-detection-pipeline", when: "1 week ago" },
  { action: "Reviewed a pull request in", repo: "kailora-web", when: "2 weeks ago" },
];

/** Deterministic pseudo-random intensity so SSR and client render identically. */
function intensity(index: number) {
  const x = Math.sin(index * 12.9898) * 43758.5453;
  const frac = x - Math.floor(x);
  const weekday = index % 7;
  const weekendPenalty = weekday === 0 || weekday === 6 ? 0.45 : 1;
  return Math.min(4, Math.floor(frac * 5 * weekendPenalty));
}

const heatmapLevels = [
  "bg-surface",
  "bg-primary/25",
  "bg-primary/45",
  "bg-primary/70",
  "bg-accent/80",
];

function GitHubPage() {
  const cells = Array.from({ length: 371 }, (_, i) => intensity(i));

  return (
    <>
      <Section className="pb-8">
        <Reveal>
          <p className="mono-label">Open source</p>
          <h1 className="mt-5 max-w-3xl text-4xl font-semibold text-gradient md:text-6xl">
            The commit history behind the case studies.
          </h1>
          <p className="mt-7 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            Most of my work happens in small, reviewable commits with descriptive messages — because
            future me is the primary reader.
          </p>
          <div className="mt-9">
            <ActionAnchor href={site.github} target="_blank" rel="noreferrer" variant="primary">
              <GithubIcon className="size-4" /> @{site.githubHandle}
            </ActionAnchor>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {ghStats.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 0.05}>
              <div className="h-full bg-background p-7">
                <stat.icon className="size-4 text-accent" />
                <p className="mt-5 font-display text-3xl font-semibold text-foreground">
                  <Counter to={stat.value} suffix={stat.suffix} />
                </p>
                <p className="mt-1 text-xs text-muted-foreground">{stat.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section className="border-y border-border bg-surface/20 py-20">
        <SectionHeading eyebrow="Contribution rhythm" title="Consistency over bursts." />
        <Reveal delay={0.08} className="mt-10">
          <div className="surface-card overflow-x-auto p-7">
            <div
              className="grid w-max grid-flow-col grid-rows-7 gap-1"
              role="img"
              aria-label="Contribution activity over the last 53 weeks"
            >
              {cells.map((level, i) => (
                <span
                  key={i}
                  className={`size-2.5 rounded-[3px] ${heatmapLevels[level]}`}
                  title={`Activity level ${level}`}
                />
              ))}
            </div>
            <div className="mt-6 flex items-center gap-2">
              <span className="mono-label">Less</span>
              {heatmapLevels.map((cls) => (
                <span key={cls} className={`size-2.5 rounded-[3px] ${cls}`} />
              ))}
              <span className="mono-label">More</span>
            </div>
          </div>
        </Reveal>
      </Section>

      <Section>
        <SectionHeading eyebrow="Pinned" title="Repositories worth reading." />
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {projects.slice(0, 4).map((project, i) => (
            <Reveal key={project.slug} delay={(i % 2) * 0.06}>
              <a
                href={project.github ?? site.github}
                target="_blank"
                rel="noreferrer"
                className="surface-card lift flex h-full flex-col p-7"
              >
                <div className="flex items-center gap-3">
                  <GithubIcon className="size-4 text-muted-foreground" />
                  <span className="font-mono text-sm text-foreground">{project.slug}</span>
                </div>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {project.tagline}
                </p>
                <div className="mt-6 flex flex-wrap items-center gap-4 font-mono text-xs text-muted-foreground">
                  <span className="flex items-center gap-2">
                    <span className="size-2 rounded-full bg-accent" />
                    {project.stack[0]}
                  </span>
                  <span>{project.year}</span>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section className="border-t border-border">
        <div className="grid gap-14 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Top languages" title="Where the lines live." />
            <div className="mt-10 space-y-4">
              {languages.map((lang, i) => (
                <Reveal key={lang.name} delay={i * 0.04}>
                  <div className="flex items-center justify-between border-b border-border pb-3">
                    <span className="font-mono text-sm text-foreground">{lang.name}</span>
                    <span className="font-mono text-xs text-muted-foreground">{lang.share}%</span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
          <div>
            <SectionHeading eyebrow="Recent activity" title="Latest movement." />
            <ul className="mt-10 space-y-5">
              {activity.map((item, i) => (
                <Reveal key={item.repo + item.when} delay={i * 0.04}>
                  <li className="flex flex-wrap items-baseline gap-2 text-sm text-muted-foreground">
                    <span>{item.action}</span>
                    <span className="font-mono text-foreground">{item.repo}</span>
                    <span className="font-mono text-xs text-muted-foreground">· {item.when}</span>
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </Section>
    </>
  );
}
