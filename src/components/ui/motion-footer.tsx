"use client";

import * as React from "react";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUp, Mail, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import { site, navLinks } from "@/data/site";
import { GithubIcon, LinkedinIcon } from "@/components/site/BrandIcons";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const STYLES = `
.cinematic-footer-wrapper {
  -webkit-font-smoothing: antialiased;

  --pill-bg-1: color-mix(in oklch, var(--foreground) 3%, transparent);
  --pill-bg-2: color-mix(in oklch, var(--foreground) 1%, transparent);
  --pill-shadow: color-mix(in oklch, var(--background) 50%, transparent);
  --pill-highlight: color-mix(in oklch, var(--foreground) 10%, transparent);
  --pill-inset-shadow: color-mix(in oklch, var(--background) 80%, transparent);
  --pill-border: color-mix(in oklch, var(--foreground) 8%, transparent);

  --pill-bg-1-hover: color-mix(in oklch, var(--foreground) 8%, transparent);
  --pill-bg-2-hover: color-mix(in oklch, var(--foreground) 2%, transparent);
  --pill-border-hover: color-mix(in oklch, var(--foreground) 20%, transparent);
  --pill-shadow-hover: color-mix(in oklch, var(--background) 70%, transparent);
  --pill-highlight-hover: color-mix(in oklch, var(--foreground) 20%, transparent);
}

@keyframes footer-breathe {
  0% { transform: translate(-50%, -50%) scale(1); opacity: 0.6; }
  100% { transform: translate(-50%, -50%) scale(1.1); opacity: 1; }
}

@keyframes footer-scroll-marquee {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}

@keyframes footer-heartbeat {
  0%, 100% { transform: scale(1); filter: drop-shadow(0 0 5px color-mix(in oklch, var(--destructive) 50%, transparent)); }
  15%, 45% { transform: scale(1.2); filter: drop-shadow(0 0 10px color-mix(in oklch, var(--destructive) 80%, transparent)); }
  30% { transform: scale(1); }
}

.animate-footer-breathe { animation: footer-breathe 8s ease-in-out infinite alternate; }
.animate-footer-scroll-marquee { animation: footer-scroll-marquee 40s linear infinite; }
.animate-footer-heartbeat { animation: footer-heartbeat 2s cubic-bezier(0.25, 1, 0.5, 1) infinite; }

.footer-bg-grid {
  background-size: 60px 60px;
  background-image:
    linear-gradient(to right, color-mix(in oklch, var(--foreground) 3%, transparent) 1px, transparent 1px),
    linear-gradient(to bottom, color-mix(in oklch, var(--foreground) 3%, transparent) 1px, transparent 1px);
  mask-image: linear-gradient(to bottom, transparent, black 30%, black 70%, transparent);
  -webkit-mask-image: linear-gradient(to bottom, transparent, black 30%, black 70%, transparent);
}

.footer-aurora {
  background: radial-gradient(
    circle at 50% 50%,
    color-mix(in oklch, var(--primary) 15%, transparent) 0%,
    color-mix(in oklch, var(--accent) 15%, transparent) 40%,
    transparent 70%
  );
}

.footer-glass-pill {
  background: linear-gradient(145deg, var(--pill-bg-1) 0%, var(--pill-bg-2) 100%);
  box-shadow:
      0 10px 30px -10px var(--pill-shadow),
      inset 0 1px 1px var(--pill-highlight),
      inset 0 -1px 2px var(--pill-inset-shadow);
  border: 1px solid var(--pill-border);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.footer-glass-pill:hover {
  background: linear-gradient(145deg, var(--pill-bg-1-hover) 0%, var(--pill-bg-2-hover) 100%);
  border-color: var(--pill-border-hover);
  box-shadow:
      0 20px 40px -10px var(--pill-shadow-hover),
      inset 0 1px 1px var(--pill-highlight-hover);
  color: var(--foreground);
}

.footer-giant-bg-text {
  font-size: 15vw;
  line-height: 0.78;
  font-weight: 900;
  letter-spacing: -0.02em;
  color: transparent;
  -webkit-text-stroke: 1px color-mix(in oklch, var(--foreground) 5%, transparent);
  background: linear-gradient(180deg, color-mix(in oklch, var(--foreground) 10%, transparent) 0%, transparent 60%);
  -webkit-background-clip: text;
  background-clip: text;
}

.footer-text-glow {
  background: linear-gradient(180deg, var(--foreground) 0%, color-mix(in oklch, var(--foreground) 40%, transparent) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  filter: drop-shadow(0px 0px 20px color-mix(in oklch, var(--foreground) 15%, transparent));
}
`;

export type MagneticButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    as?: React.ElementType;
  };

export const MagneticButton = React.forwardRef<HTMLElement, MagneticButtonProps>(
  function MagneticButton({ className, children, as: Component = "button", ...props }, forwardedRef) {
    const localRef = useRef<HTMLElement | null>(null);

    useEffect(() => {
      if (typeof window === "undefined") return;
      const element = localRef.current;
      if (!element) return;

      const handleMouseMove = (e: MouseEvent) => {
        const rect = element.getBoundingClientRect();
        const h = rect.width / 2;
        const w = rect.height / 2;
        const x = e.clientX - rect.left - h;
        const y = e.clientY - rect.top - w;

        gsap.to(element, {
          x: x * 0.4,
          y: y * 0.4,
          rotationX: -y * 0.15,
          rotationY: x * 0.15,
          scale: 1.05,
          ease: "power2.out",
          duration: 0.4,
        });
      };

      const handleMouseLeave = () => {
        gsap.to(element, {
          x: 0,
          y: 0,
          rotationX: 0,
          rotationY: 0,
          scale: 1,
          ease: "elastic.out(1, 0.3)",
          duration: 1.2,
        });
      };

      element.addEventListener("mousemove", handleMouseMove);
      element.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        element.removeEventListener("mousemove", handleMouseMove);
        element.removeEventListener("mouseleave", handleMouseLeave);
        gsap.killTweensOf(element);
      };
    }, []);

    return (
      <Component
        ref={(node: HTMLElement | null) => {
          localRef.current = node;
          if (typeof forwardedRef === "function") forwardedRef(node);
          else if (forwardedRef)
            (forwardedRef as React.MutableRefObject<HTMLElement | null>).current = node;
        }}
        className={cn("cursor-pointer", className)}
        {...props}
      >
        {children}
      </Component>
    );
  },
);

const MARQUEE_ITEMS = [
  "Scalable Systems ✦",
  "Applied AI / ML ✦",
  "Production Backends ✦",
  "Type-Safe Frontends ✦",
  "Measured Results ✦",
];

const MarqueeItem = () => (
  <div className="flex shrink-0 items-center gap-10 pr-10">
    {MARQUEE_ITEMS.map((item) => (
      <span key={item} className="font-mono text-xs tracking-[0.25em] text-muted-foreground/70">
        {item}
      </span>
    ))}
  </div>
);

export function CinematicFooter({ className }: { className?: string }) {
  const wrapperRef = useRef<HTMLElement | null>(null);
  const giantTextRef = useRef<HTMLDivElement | null>(null);
  const headingRef = useRef<HTMLDivElement | null>(null);
  const linksRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!wrapperRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        giantTextRef.current,
        { y: "10vh", scale: 0.8, opacity: 0 },
        {
          y: "0vh",
          scale: 1,
          opacity: 1,
          ease: "power1.out",
          duration: 1.2,
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        },
      );

      gsap.fromTo(
        [headingRef.current, linksRef.current],
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          ease: "power3.out",
          duration: 1,
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        },
      );
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />

      <footer
        ref={wrapperRef as React.RefObject<HTMLElement>}
        className={cn(
          "cinematic-footer-wrapper relative isolate overflow-hidden border-t border-border bg-background",
          className,
        )}
      >
        {/* ambient layers */}
        <div className="pointer-events-none absolute inset-0 footer-bg-grid" aria-hidden />
        <div
          className="animate-footer-breathe pointer-events-none absolute left-1/2 top-1/2 size-[900px] footer-aurora blur-3xl"
          aria-hidden
        />

        {/* giant background wordmark */}
        <div
          ref={giantTextRef}
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 flex select-none justify-center"
        >
          <span className="footer-giant-bg-text whitespace-nowrap">HIMANSHU</span>
        </div>

        {/* marquee */}
        <div className="relative overflow-hidden border-b border-border/60 py-4">
          <div className="animate-footer-scroll-marquee flex w-max">
            <MarqueeItem />
            <MarqueeItem />
            <MarqueeItem />
            <MarqueeItem />
          </div>
        </div>

        <div className="relative mx-auto max-w-6xl px-6 pb-14 pt-20 md:pt-28">
          <div ref={headingRef} className="max-w-3xl">
            <p className="mono-label">Let's build something</p>
            <h2 className="footer-text-glow mt-5 text-4xl font-semibold md:text-6xl">
              Open to software engineering roles and serious side projects.
            </h2>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <MagneticButton
                as="a"
                href={`mailto:${site.email}`}
                className="footer-glass-pill inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-foreground"
              >
                <Mail className="size-4" />
                {site.email}
              </MagneticButton>
              <MagneticButton
                as="a"
                href={site.github}
                target="_blank"
                rel="noreferrer"
                className="footer-glass-pill inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm text-muted-foreground"
              >
                <GithubIcon className="size-4" />
                GitHub
              </MagneticButton>
              <MagneticButton
                as="a"
                href={site.linkedin}
                target="_blank"
                rel="noreferrer"
                className="footer-glass-pill inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm text-muted-foreground"
              >
                <LinkedinIcon className="size-4" />
                LinkedIn
              </MagneticButton>
            </div>
          </div>

          <div
            ref={linksRef}
            className="mt-16 flex flex-col gap-10 border-t border-border/60 pt-10 md:flex-row md:items-start md:justify-between"
          >
            <div className="flex flex-wrap gap-x-8 gap-y-3">
              {navLinks.map((link) => (
                <a
                  key={link.to}
                  href={link.to}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div className="flex flex-col items-start gap-3 md:items-end">
              <p className="inline-flex items-center gap-2 font-mono text-xs text-muted-foreground">
                <MapPin className="size-3.5" />
                {site.location}
              </p>
              <MagneticButton
                onClick={scrollToTop}
                aria-label="Back to top"
                className="footer-glass-pill inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs text-muted-foreground"
              >
                <ArrowUp className="size-3.5" />
                Back to top
              </MagneticButton>
            </div>
          </div>

          <div className="mt-12 flex flex-col items-center justify-between gap-3 text-xs text-muted-foreground md:flex-row">
            <p>
              © {new Date().getFullYear()} {site.name}. All rights reserved.
            </p>
          </div>

        </div>
      </footer>
    </>
  );
}
