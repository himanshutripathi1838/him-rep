import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { Award, Search, X } from "lucide-react";
import { Section } from "@/components/site/Section";
import { Reveal } from "@/components/motion/Reveal";
import { certificateCategories, certificates, type Certificate } from "@/data/certificates";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/certificates")({
  head: () => ({
    meta: [
      { title: "Certificates — Cloud, Networking, Security & AI | Himanshu Tripathi" },
      {
        name: "description",
        content:
          "Verified certifications across cloud, networking, development, security and AI — searchable and filterable gallery.",
      },
      { property: "og:title", content: "Certificates — Himanshu Tripathi" },
      {
        property: "og:description",
        content: "12+ certifications spanning cloud, networking, security, development and AI.",
      },
    ],
  }),
  component: Certificates,
});

function Certificates() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("All");
  const [active, setActive] = useState<Certificate | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return certificates.filter((cert) => {
      const matchesCategory = category === "All" || cert.category === category;
      const matchesQuery =
        !q ||
        cert.title.toLowerCase().includes(q) ||
        cert.issuer.toLowerCase().includes(q) ||
        cert.detail.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [query, category]);

  return (
    <>
      <Section className="pb-8">
        <Reveal>
          <p className="mono-label">Certifications</p>
          <h1 className="mt-5 max-w-3xl text-4xl font-semibold text-gradient md:text-6xl">
            Structured learning, kept current.
          </h1>
          <p className="mt-7 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            Cloud, networking, security, development and AI — each one taken to close a specific gap
            I hit while building.
          </p>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="mt-12 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <label className="relative w-full md:max-w-xs">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search certificates"
                aria-label="Search certificates"
                className="h-11 w-full rounded-lg border border-border bg-surface/40 pl-10 pr-4 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary/60"
              />
            </label>
            <div className="flex flex-wrap gap-2">
              {certificateCategories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategory(cat)}
                  className={cn(
                    "rounded-lg border px-3.5 py-2 font-mono text-xs transition-colors",
                    category === cat
                      ? "border-primary/70 bg-primary/15 text-foreground"
                      : "border-border text-muted-foreground hover:text-foreground",
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </Reveal>
      </Section>

      <Section className="pt-4">
        {filtered.length === 0 ? (
          <p className="text-sm text-muted-foreground">No certificates match that search.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((cert, i) => (
              <Reveal key={cert.id} delay={(i % 3) * 0.05}>
                <button
                  type="button"
                  onClick={() => setActive(cert)}
                  className="surface-card lift group flex h-full w-full flex-col p-7 text-left"
                >
                  <div className="flex items-start justify-between gap-4">
                    <span className="inline-flex size-10 items-center justify-center rounded-lg border border-border bg-surface/60">
                      <Award className="size-4 text-accent" />
                    </span>
                    <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                      {cert.category}
                    </span>
                  </div>
                  <h2 className="mt-6 text-base font-semibold text-foreground">{cert.title}</h2>
                  <p className="mt-2 text-sm text-muted-foreground">{cert.issuer}</p>
                  <p className="mt-6 flex-1 text-xs leading-relaxed text-muted-foreground opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    {cert.detail}
                  </p>
                  <span className="mt-6 font-mono text-xs text-accent">{cert.year}</span>
                </button>
              </Reveal>
            ))}
          </div>
        )}
      </Section>

      <AnimatePresence>
        {active ? (
          <motion.div
            className="fixed inset-0 z-[70] flex items-center justify-center px-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <button
              type="button"
              aria-label="Close preview"
              onClick={() => setActive(null)}
              className="absolute inset-0 bg-background/85 backdrop-blur-sm"
            />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label={active.title}
              initial={{ opacity: 0, y: 16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.98 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="surface-card relative z-10 w-full max-w-lg p-8"
            >
              <button
                type="button"
                onClick={() => setActive(null)}
                aria-label="Close"
                className="absolute right-5 top-5 inline-flex size-8 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:text-foreground"
              >
                <X className="size-4" />
              </button>
              <p className="mono-label">
                {active.category} · {active.year}
              </p>
              <h2 className="mt-4 text-xl font-semibold text-foreground">{active.title}</h2>
              <p className="mt-1 text-sm text-muted-foreground">{active.issuer}</p>
              <p className="mt-6 text-sm leading-relaxed text-muted-foreground">{active.detail}</p>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
