import { Link } from "@tanstack/react-router";
import { Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/site/BrandIcons";
import { navLinks, site } from "@/data/site";

export function Footer() {
  return (
    <footer className="border-t border-border px-6 py-14 md:px-10">
      <div className="mx-auto grid w-full max-w-6xl gap-10 md:grid-cols-[1.4fr_1fr]">
        <div>
          <p className="font-mono text-sm text-foreground">{site.initials}</p>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
            Designed &amp; developed by {site.name} — {site.role}. Built with a focus on
            architecture, measurable impact and maintainable code.
          </p>
          <div className="mt-6 flex items-center gap-3">
            <a
              href={site.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="inline-flex size-9 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:border-primary/60 hover:text-foreground"
            >
              <GithubIcon className="size-4" />
            </a>
            <a
              href={site.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="inline-flex size-9 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:border-primary/60 hover:text-foreground"
            >
              <LinkedinIcon className="size-4" />
            </a>
            <a
              href={`mailto:${site.email}`}
              aria-label="Email"
              className="inline-flex size-9 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:border-primary/60 hover:text-foreground"
            >
              <Mail className="size-4" />
            </a>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 text-sm">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>

      <div className="mx-auto mt-12 flex w-full max-w-6xl flex-col gap-2 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()} {site.name}. All rights reserved.
        </p>
        <p className="font-mono">{site.location}</p>
      </div>
    </footer>
  );
}
