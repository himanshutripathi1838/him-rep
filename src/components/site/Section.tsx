import { useRef, type ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/utils";

type SectionProps = {
  id?: string;
  className?: string;
  children: ReactNode;
};

export function Section({ id, className, children }: SectionProps) {
  const ref = useRef<HTMLElement | null>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useSpring(useTransform(scrollYProgress, [0, 0.5, 1], [26, 0, -26]), {
    stiffness: 90,
    damping: 22,
    mass: 0.3,
  });

  return (
    <section ref={ref} id={id} className={cn("px-6 py-24 md:px-10 md:py-32", className)}>
      <motion.div
        {...(reduce ? {} : { style: { y } })}
        className="mx-auto w-full max-w-6xl will-change-transform"
      >
        {children}
      </motion.div>
    </section>
  );
}

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: SectionHeadingProps) {
  return (
    <Reveal className={cn("max-w-2xl", align === "center" && "mx-auto text-center")}>
      <p className="mono-label">{eyebrow}</p>
      <h2 className="mt-4 text-3xl font-semibold text-gradient md:text-5xl">{title}</h2>
      {description ? (
        <p className="mt-5 text-base leading-relaxed text-muted-foreground md:text-lg">
          {description}
        </p>
      ) : null}
    </Reveal>
  );
}
