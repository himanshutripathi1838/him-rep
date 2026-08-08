import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Download, Mail } from "lucide-react";

import portrait from "@/assets/portrait.jpg";
import DigitalSerenity from "@/components/ui/digital-serenity-animated-landing-page";
import { TiltCard } from "@/components/motion/TiltCard";
import { ActionAnchor, ActionLink } from "@/components/site/Action";
import { ResumeDownloadButton } from "@/components/site/ResumeDownloadButton";
import { Section, SectionHeading } from "@/components/site/Section";
import { Reveal } from "@/components/motion/Reveal";
import { Counter } from "@/components/motion/Counter";
import { experience, site, stats } from "@/data/site";
import { featuredProjects } from "@/data/projects";
import { skillGroups } from "@/data/skills";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Himanshu Tripathi — Software Engineer & AI/ML Engineer" },
      {
        name: "description",
        content:
          "Himanshu Tripathi builds scalable full-stack products and applied AI systems — production case studies, measurable results and engineering detail.",
      },
      { property: "og:title", content: "Himanshu Tripathi — Software Engineer" },
      {
        property: "og:description",
        content:
          "Full-stack and AI/ML engineer focused on scalable architecture, measurable impact and maintainable code.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <>
      <DigitalSerenity />
      <Hero />
      <Positioning />
      <CurrentWork />
      <FeaturedWork />
      <SkillsPreview />
      <CtaBand />
    </>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden px-6 pb-20 pt-12 md:px-10 md:pb-28 md:pt-16">
      <div aria-hidden className="grid-bg absolute inset-0 opacity-40" />
      <div
        aria-hidden
        className="absolute left-1/2 top-0 size-[560px] -translate-x-1/2 rounded-full opacity-30 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklab, var(--primary) 40%, transparent), transparent 70%)",
        }}
      />

      <div className="relative mx-auto flex w-full max-w-4xl flex-col items-center text-center">
        <motion.div
          className="relative w-full max-w-40 sm:max-w-44 md:max-w-52"
          initial={{ opacity: 0, y: 24, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div
            aria-hidden
            className="absolute -inset-4 rounded-full blur-2xl"
            style={{ background: "var(--gradient-primary)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.2, 0.45, 0.2] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="relative aspect-square overflow-hidden rounded-full border-2 border-border/60 bg-surface shadow-2xl"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            whileHover={{ scale: 1.04, rotate: -1 }}
          >
            <motion.img
              src={portrait}
              alt="Portrait of Himanshu Tripathi, software engineer"
              width={714}
              height={1080}
              initial={{ scale: 1.15, opacity: 0, filter: "blur(14px)" }}
              animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="aspect-square h-full w-full rounded-full object-cover object-top"
            />
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="mt-5 flex items-center gap-4 font-mono text-xs text-muted-foreground"
        >
          <span>{site.location}</span>
          <span className="text-border">·</span>
          <motion.a
            href={site.github}
            target="_blank"
            rel="noreferrer"
            whileHover={{ x: 2, y: -1 }}
            transition={{ type: "spring", stiffness: 400, damping: 18 }}
            className="group/link inline-flex items-center gap-1 text-foreground transition-colors hover:text-accent"
          >
            @{site.githubHandle}
            <motion.span
              className="inline-block"
              initial={{ rotate: 0 }}
              whileHover={{ rotate: 45 }}
              transition={{ type: "spring", stiffness: 400, damping: 18 }}
            >
              <ArrowUpRight className="size-3 transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
            </motion.span>
          </motion.a>
        </motion.div>

        <div className="mt-10 md:mt-14">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
              <span className="size-1.5 rounded-full bg-accent" />
              Open to software engineering roles
            </span>
          </Reveal>

          <h1 className="mx-auto mt-7 max-w-3xl text-4xl font-semibold leading-[1.05] text-gradient sm:text-5xl md:text-6xl lg:text-7xl">
            {site.name.split(" ").map((word, i) => (
              <span
                key={i}
                className="word-animate"
                style={{ animationDelay: `${200 + i * 150}ms` }}
              >
                {word}
              </span>
            ))}
          </h1>

          <Reveal delay={0.12}>
            <div className="mt-5 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 font-mono text-sm text-accent">
              {site.roles.map((role, i) => (
                <span key={role} className="flex items-center gap-3">
                  {i > 0 ? <span className="text-border">/</span> : null}
                  {role}
                </span>
              ))}
            </div>
          </Reveal>

          <p className="mx-auto mt-7 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            {site.intro.split(/\s+/).map((word, i) => (
              <span
                key={i}
                className="word-animate"
                style={{ animationDelay: `${500 + i * 40}ms` }}
              >
                {word}
              </span>
            ))}
          </p>

          <Reveal delay={0.24}>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <ActionLink to="/projects" size="lg">
                View projects <ArrowRight className="size-4" />
              </ActionLink>
              <ResumeDownloadButton variant="outline" size="lg" />
              <ActionLink to="/contact" variant="ghost" size="lg">
                <Mail className="size-4" /> Contact
              </ActionLink>
            </div>
          </Reveal>
        </div>
      </div>

      <div className="relative mx-auto mt-20 grid w-full max-w-6xl grid-cols-2 gap-px overflow-hidden rounded-xl border border-border bg-border md:grid-cols-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
            className="bg-background px-6 py-7"
          >
            <p className="font-display text-3xl font-semibold text-foreground md:text-4xl">
              <Counter to={stat.value} suffix={stat.suffix} />
            </p>
            <p className="mt-2 text-xs text-muted-foreground md:text-sm">{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

const pillars = [
  {
    title: "Problem solving",
    body: "Start from the constraint, not the framework. Most performance work is a data-model decision wearing a frontend costume.",
  },
  {
    title: "Backend & architecture",
    body: "Explicit state machines, auditable ledgers, guarded transitions. Systems that stay debuggable at 2am.",
  },
  {
    title: "Applied AI",
    body: "Models judged by honest validation, not demo screenshots. Data decisions beat architecture tweaks almost every time.",
  },
  {
    title: "Modern frontend",
    body: "Design systems and tokens over one-off styles. Motion that clarifies hierarchy instead of decorating it.",
  },
];

function Positioning() {
  return (
    <Section id="approach">
      <SectionHeading
        eyebrow="How I work"
        title="Engineering first, interface second, decoration never."
        description="Four things show up in everything I ship — whether it's a marketplace ledger, a detection pipeline or a marketing site."
      />
      <div className="mt-14 grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2">
        {pillars.map((pillar, i) => (
          <Reveal key={pillar.title} delay={i * 0.06}>
            <div className="h-full bg-background p-8">
              <p className="font-mono text-xs text-accent">0{i + 1}</p>
              <h3 className="mt-4 text-lg font-semibold text-foreground">{pillar.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{pillar.body}</p>
            </div>
          </Reveal>
        ))}
      </div>
      <Reveal delay={0.1} className="mt-10">
        <Link
          to="/about"
          className="inline-flex items-center gap-2 font-mono text-sm text-accent transition-colors hover:text-foreground"
        >
          Read the full story <ArrowRight className="size-4" />
        </Link>
      </Reveal>
    </Section>
  );
}

function CurrentWork() {
  const role = experience[0];
  if (!role) return null;
  return (
    <Section id="experience" className="border-y border-border bg-surface/20">
      <SectionHeading
        eyebrow="Current role"
        title="Applied computer vision, in production conditions."
      />
      <Reveal delay={0.08} className="mt-12">
        <article className="surface-card lift p-8 md:p-10">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h3 className="text-xl font-semibold text-foreground md:text-2xl">{role.role}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{role.company}</p>
            </div>
            <span className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
              <span className="size-1.5 animate-pulse rounded-full bg-accent" />
              {role.period}
            </span>
          </div>

          <p className="mt-6 max-w-3xl text-sm leading-relaxed text-muted-foreground md:text-base">
            {role.summary}
          </p>

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

          <div className="mt-8 flex flex-wrap gap-2">
            {role.stack.map((tech) => (
              <span
                key={tech}
                className="rounded-md border border-border bg-surface/50 px-2.5 py-1 font-mono text-xs text-muted-foreground"
              >
                {tech}
              </span>
            ))}
          </div>
        </article>
      </Reveal>
    </Section>
  );
}

function FeaturedWork() {
  return (
    <Section id="projects">
      <SectionHeading
        eyebrow="Selected work"
        title="Three case studies, written like engineering docs."
        description="Problem, architecture, the parts that broke, and what the numbers looked like afterwards."
      />
      <div className="mt-14 space-y-8">
        {featuredProjects.map((project, i) => (
          <Reveal key={project.slug} delay={i * 0.06}>
            <TiltCard
              to="/projects/$slug"
              params={{ slug: project.slug }}
              innerClassName="grid md:grid-cols-[1.1fr_1fr]"
            >
              <div className="overflow-hidden">
                <img
                  src={project.image}
                  alt={`${project.name} case study visual`}
                  loading="lazy"
                  width={1536}
                  height={864}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />
              </div>
              <div className="flex flex-col justify-between p-8 md:p-10">
                <div>
                  <p className="mono-label">
                    {project.category} · {project.year}
                  </p>
                  <h3 className="mt-4 text-2xl font-semibold text-foreground">{project.name}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {project.tagline}
                  </p>
                </div>
                <div className="mt-8">
                  <div className="flex flex-wrap gap-2">
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
                    Read case study
                    <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </div>
              </div>
            </TiltCard>
          </Reveal>
        ))}
      </div>
      <Reveal delay={0.1} className="mt-12">
        <ActionLink to="/projects" variant="outline" size="lg">
          All seven projects <ArrowRight className="size-4" />
        </ActionLink>
      </Reveal>
    </Section>
  );
}

function SkillsPreview() {
  return (
    <Section className="border-t border-border">
      <SectionHeading
        eyebrow="Toolkit"
        title="No percentages. Just what I've actually shipped with."
      />
      <div className="mt-14 grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
        {skillGroups.slice(0, 4).map((group, i) => (
          <Reveal key={group.title} delay={i * 0.05}>
            <div className="h-full bg-background p-7">
              <group.icon className="size-5 text-accent" />
              <h3 className="mt-5 text-base font-semibold text-foreground">{group.title}</h3>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{group.note}</p>
              <ul className="mt-5 space-y-1.5">
                {group.items.slice(0, 5).map((item) => (
                  <li key={item} className="font-mono text-xs text-muted-foreground">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
      <Reveal delay={0.1} className="mt-12">
        <ActionLink to="/skills" variant="outline">
          Full toolkit <ArrowRight className="size-4" />
        </ActionLink>
      </Reveal>
    </Section>
  );
}

function CtaBand() {
  return (
    <Section className="border-t border-border bg-surface/20">
      <Reveal className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
        <div className="max-w-xl">
          <h2 className="text-3xl font-semibold text-gradient md:text-4xl">
            Building something that needs to hold up in production?
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">
            I'm open to software engineering and AI/ML roles, and to focused freelance work.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <ActionLink to="/contact" size="lg">
            Start a conversation <ArrowRight className="size-4" />
          </ActionLink>
          <ResumeDownloadButton variant="outline" size="lg" label="Resume" />
        </div>
      </Reveal>
    </Section>
  );
}
