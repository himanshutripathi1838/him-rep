import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Section, SectionHeading } from "@/components/site/Section";
import { Reveal } from "@/components/motion/Reveal";
import { CareerRoadmap } from "@/components/site/CareerRoadmap";
import { achievements, education, experience, site, timeline } from "@/data/site";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Himanshu Tripathi, Software Engineer" },
      {
        name: "description",
        content:
          "The engineering story behind Himanshu Tripathi: problem solving, backend architecture, applied AI and modern frontend, year by year.",
      },
      { property: "og:title", content: "About Himanshu Tripathi" },
      {
        property: "og:description",
        content: "Engineering mindset, timeline, experience and achievements.",
      },
    ],
  }),
  component: About,
});

function About() {
  return (
    <>
      <Section className="pb-10">
        <div className="relative">
          <Reveal>
            <p className="mono-label flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-cyan-400 animate-pulse" />
              About // System Profile
            </p>
            <h1 className="mt-5 max-w-4xl text-4xl font-semibold leading-[1.1] text-gradient sm:text-5xl md:text-6xl tracking-tight">
              I like the part of engineering that happens after the demo works.
            </h1>
          </Reveal>
          
          <div className="mt-12 grid max-w-4xl gap-6 md:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.1 }}
              whileHover={{ 
                y: -6, 
                borderColor: "rgba(6, 182, 212, 0.3)", 
                boxShadow: "0 20px 30px -10px rgba(0, 0, 0, 0.4)" 
              }}
              className="relative p-7 rounded-2xl border border-white/5 bg-slate-950/45 backdrop-blur-md transition-colors duration-500 hover:bg-slate-950/70"
            >
              <div className="absolute top-4 right-4 size-1.5 rounded-full bg-cyan-500/50" />
              <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
                I started writing code because I wanted to understand why things break. That's still
                the centre of how I work: read the constraint, model the data, then write the smallest
                system that survives real usage. Frameworks come last.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.25 }}
              whileHover={{ 
                y: -6, 
                borderColor: "rgba(6, 182, 212, 0.3)", 
                boxShadow: "0 20px 30px -10px rgba(0, 0, 0, 0.4)" 
              }}
              className="relative p-7 rounded-2xl border border-white/5 bg-slate-950/45 backdrop-blur-md transition-colors duration-500 hover:bg-slate-950/70"
            >
              <div className="absolute top-4 right-4 size-1.5 rounded-full bg-cyan-500/50" />
              <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
                Since then I've shipped a two-sided marketplace with an auditable wallet, an AI
                document workspace with per-page extraction, and a computer vision pipeline whose
                accuracy numbers I can actually defend. {site.intro}
              </p>
            </motion.div>
          </div>
        </div>
      </Section>

      <Section className="border-y border-border bg-surface/20">
        <SectionHeading
          eyebrow="Career Path"
          title="From fundamentals to shipped systems."
          description="Each step here changed how I build, not just what I know."
        />
        <div className="mt-14">
          <CareerRoadmap />
        </div>
      </Section>

      <Section>
        <SectionHeading eyebrow="Experience" title="What I own day to day." />
        <div className="mt-14 space-y-8">
          {experience.map((role, i) => (
            <Reveal key={role.role} delay={i * 0.06}>
              <article className="surface-card p-8 md:p-10">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-semibold text-foreground md:text-2xl">
                      {role.role}
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">{role.company}</p>
                  </div>
                  <span className="font-mono text-xs text-muted-foreground">{role.period}</span>
                </div>
                <ul className="mt-7 space-y-3">
                  {role.highlights.map((item) => (
                    <li key={item} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
                      <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-8 grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
                  {role.metrics.map((metric) => (
                    <div key={metric.label} className="bg-background px-5 py-5">
                      <p className="font-display text-2xl font-semibold text-foreground">
                        {metric.value}
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground">{metric.label}</p>
                    </div>
                  ))}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section className="border-t border-border">
        <div className="grid gap-14 md:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Education" title="Foundations." />
            <div className="mt-10 space-y-6">
              {education.map((item) => (
                <Reveal key={item.title}>
                  <div className="surface-card p-7">
                    <h3 className="text-base font-semibold text-foreground">{item.title}</h3>
                    <p className="mt-1 font-mono text-xs text-muted-foreground">
                      {item.org} · {item.period}
                    </p>
                    <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                      {item.detail}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
          <div>
            <SectionHeading eyebrow="Achievements" title="Measurable outcomes." />
            <ul className="mt-10 space-y-4">
              {achievements.map((item, i) => (
                <Reveal key={item} delay={i * 0.05}>
                  <li className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" />
                    {item}
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
