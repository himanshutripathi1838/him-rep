import { createFileRoute } from "@tanstack/react-router";
import { Download } from "lucide-react";
import { ActionAnchor } from "@/components/site/Action";
import { Section } from "@/components/site/Section";
import { ResumeDownloadButton } from "@/components/site/ResumeDownloadButton";
import { Reveal } from "@/components/motion/Reveal";
import { achievements, education, experience, site } from "@/data/site";
import { skillGroups } from "@/data/skills";

export const Route = createFileRoute("/resume")({
  head: () => ({
    meta: [
      { title: "Resume — Himanshu Tripathi, Software Engineer" },
      {
        name: "description",
        content:
          "Resume of Himanshu Tripathi: AI/ML internship experience, seven shipped products, education, achievements and technical skills. Download as PDF.",
      },
      { property: "og:title", content: "Resume — Himanshu Tripathi" },
      {
        property: "og:description",
        content: "Experience, education, achievements and skills — with a downloadable PDF.",
      },
    ],
  }),
  component: Resume,
});

function Resume() {
  return (
    <>
      <Section className="pb-8">
        <Reveal>
          <p className="mono-label">Resume</p>
          <div className="mt-5 flex flex-wrap items-end justify-between gap-6">
            <h1 className="max-w-2xl text-4xl font-semibold text-gradient md:text-6xl">
              One page, no filler.
            </h1>
            <ResumeDownloadButton label="Download PDF" />
          </div>
        </Reveal>
      </Section>

      <Section className="pt-6">
        <Reveal>
          <article className="surface-card p-8 md:p-12">
            <header className="flex flex-wrap items-start justify-between gap-6 border-b border-border pb-8">
              <div>
                <h2 className="font-display text-2xl font-semibold text-foreground md:text-3xl">
                  {site.name}
                </h2>
                <p className="mt-2 font-mono text-xs text-accent">{site.roles.join(" · ")}</p>
              </div>
              <div className="space-y-1 font-mono text-xs text-muted-foreground">
                <p>{site.email}</p>
                <p>{site.phone}</p>
                <p>{site.location}</p>
              </div>
            </header>

            <div className="mt-10 grid gap-12 md:grid-cols-[1.5fr_1fr]">
              <div className="space-y-12">
                <ResumeBlock title="Experience">
                  {experience.map((role) => (
                    <div key={role.role}>
                      <div className="flex flex-wrap items-baseline justify-between gap-2">
                        <h4 className="text-base font-semibold text-foreground">
                          {role.role} · {role.company}
                        </h4>
                        <span className="font-mono text-xs text-muted-foreground">
                          {role.period}
                        </span>
                      </div>
                      <ul className="mt-4 space-y-2.5">
                        {role.highlights.map((item) => (
                          <li key={item} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
                            <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </ResumeBlock>

                <ResumeBlock title="Education">
                  {education.map((item) => (
                    <div key={item.title}>
                      <div className="flex flex-wrap items-baseline justify-between gap-2">
                        <h4 className="text-base font-semibold text-foreground">
                          {item.title}
                          {item.org && (
                            <span className="text-muted-foreground font-normal"> · {item.org}</span>
                          )}
                        </h4>
                        <span className="font-mono text-xs text-muted-foreground">
                          {item.period}
                        </span>
                      </div>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        {item.detail}
                      </p>
                    </div>
                  ))}
                </ResumeBlock>

                <ResumeBlock title="Achievements">
                  <ul className="space-y-2.5">
                    {achievements.map((item) => (
                      <li key={item} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
                        <span className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </ResumeBlock>
              </div>

              <div className="space-y-10">
                <ResumeBlock title="Skills">
                  <div className="space-y-5">
                    {skillGroups.slice(0, 6).map((group) => (
                      <div key={group.title}>
                        <p className="font-mono text-xs uppercase tracking-[0.14em] text-accent">
                          {group.title}
                        </p>
                        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                          {group.items.join(", ")}
                        </p>
                      </div>
                    ))}
                  </div>
                </ResumeBlock>

                <ResumeBlock title="Links">
                  <div className="space-y-2 font-mono text-xs">
                    <a
                      href={site.github}
                      target="_blank"
                      rel="noreferrer"
                      className="block text-muted-foreground transition-colors hover:text-foreground"
                    >
                      github.com/{site.githubHandle}
                    </a>
                    <a
                      href={site.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="block text-muted-foreground transition-colors hover:text-foreground"
                    >
                      linkedin.com/in/himanshu-tripathi
                    </a>
                  </div>
                </ResumeBlock>
              </div>
            </div>
          </article>
        </Reveal>
      </Section>
    </>
  );
}

function ResumeBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h3 className="mono-label">{title}</h3>
      <div className="mt-5 space-y-8">{children}</div>
    </section>
  );
}
