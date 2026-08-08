import React, { useCallback, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const THEMES = {
  primary: "from-slate-700 via-slate-800 to-slate-900",
  secondary: "from-blue-600 via-blue-700 to-blue-800",
  accent: "from-indigo-600 via-indigo-700 to-indigo-800",
  success: "from-emerald-600 via-emerald-700 to-emerald-800",
  warning: "from-amber-600 via-amber-700 to-amber-800",
  danger: "from-red-600 via-red-700 to-red-800",
  info: "from-cyan-600 via-cyan-700 to-cyan-800",
  neutral: "from-gray-600 via-gray-700 to-gray-800",
} as const;

export type ThemeType = keyof typeof THEMES;

export interface Card3DProps {
  title: string;
  description: string;
  image?: string;
  icon?: React.ReactNode;
  meta?: string[];
  theme?: ThemeType;
  gradient?: string;
  onClick?: () => void;
  className?: string;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "minimal" | "premium";
  disabled?: boolean;
  loading?: boolean;
}

export interface CardData extends Omit<Card3DProps, "className" | "size" | "variant"> {
  id: string;
}

export interface Card3DListProps {
  cards: CardData[];
  className?: string;
  columns?: 1 | 2 | 3 | 4;
  gap?: "sm" | "md" | "lg" | "xl";
  size?: "sm" | "md" | "lg";
  variant?: "default" | "minimal" | "premium";
  animated?: boolean;
  staggerDelay?: number;
}

const SIZES = {
  sm: "min-h-64",
  md: "min-h-80",
  lg: "min-h-96",
} as const;

const VARIANTS = {
  default: "shadow-lg hover:shadow-2xl",
  minimal: "shadow-md hover:shadow-lg border border-white/10",
  premium: "shadow-xl hover:shadow-2xl ring-1 ring-white/20",
} as const;

const GRIDS = {
  1: "grid-cols-1",
  2: "grid-cols-1 md:grid-cols-2",
  3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
  4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
} as const;

const GAPS = {
  sm: "gap-4",
  md: "gap-6",
  lg: "gap-8",
  xl: "gap-10",
} as const;

const containerVariants = {
  hidden: { opacity: 0, scale: 0.98 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.15,
      duration: 0.5,
      ease: [0.23, 1, 0.32, 1] as const,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40, rotateX: -15, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    scale: 1,
    transition: { type: "spring" as const, stiffness: 100, damping: 12, mass: 0.7 },
  },
};

export const Card3D = React.forwardRef<HTMLDivElement, Card3DProps>(function Card3D(
  {
    title,
    description,
    image,
    icon,
    meta,
    theme = "primary",
    gradient,
    onClick,
    className,
    size = "md",
    variant = "default",
    disabled = false,
    loading = false,
  },
  ref,
) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const finalGradient = useMemo(() => gradient || THEMES[theme], [gradient, theme]);
  const patternId = useMemo(
    () => `pattern-${theme}-${title.replace(/\s+/g, "-").toLowerCase()}`,
    [theme, title],
  );

  const handleMove = useCallback(
    (e: React.MouseEvent) => {
      if (disabled) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setMousePos({
        x: (x / rect.width - 0.5) * 25,
        y: (y / rect.height - 0.5) * -25,
      });
    },
    [disabled],
  );

  const handleEnter = useCallback(() => {
    if (disabled) return;
    setHovered(true);
  }, [disabled]);

  const handleLeave = useCallback(() => {
    if (disabled) return;
    setHovered(false);
    setMousePos({ x: 0, y: 0 });
  }, [disabled]);

  const handleClick = useCallback(() => {
    if (disabled || loading || !onClick) return;
    onClick();
  }, [disabled, loading, onClick]);

  return (
    <motion.div
      ref={ref}
      variants={itemVariants}
      onMouseMove={handleMove}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onClick={handleClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick && !disabled ? 0 : undefined}
      style={{ transformStyle: "preserve-3d", perspective: 1200 }}
      animate={{
        rotateY: mousePos.x,
        rotateX: mousePos.y,
        scale: hovered && !disabled ? 1.02 : 1,
      }}
      transition={{ type: "spring", stiffness: 180, damping: 18 }}
      className={cn(
        "group relative isolate overflow-hidden rounded-2xl bg-gradient-to-br p-6",
        "transition-shadow duration-500",
        finalGradient,
        SIZES[size],
        VARIANTS[variant],
        disabled && "cursor-not-allowed opacity-60",
        onClick && !disabled && "cursor-pointer",
        className,
      )}
    >
      {/* image layer */}
      {image && (
        <div className="pointer-events-none absolute inset-0 -z-10">
          <img
            src={image}
            alt=""
            loading="lazy"
            className="size-full object-cover opacity-30 transition-transform duration-700 group-hover:scale-110"
          />
        </div>
      )}

      {/* dotted pattern */}
      <svg className="pointer-events-none absolute inset-0 -z-10 size-full opacity-25">
        <defs>
          <pattern id={patternId} width="22" height="22" patternUnits="userSpaceOnUse">
            <circle cx="1.5" cy="1.5" r="1.5" fill="currentColor" className="text-white/40" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${patternId})`} />
      </svg>

      {/* cursor glow */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.25),transparent_60%)]"
        animate={{ opacity: hovered && !disabled ? 1 : 0.35 }}
        transition={{ duration: 0.4 }}
      />

      {/* shine sweep */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent"
        animate={{ x: hovered && !disabled ? "300%" : "0%" }}
        transition={{ duration: 0.9, ease: "easeOut" }}
      />

      <div className="relative flex h-full flex-col" style={{ transform: "translateZ(40px)" }}>
        <div className="flex items-start justify-between">
          {icon && (
            <motion.div
              animate={{ rotate: hovered && !disabled ? 6 : 0, scale: hovered ? 1.08 : 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 14 }}
              className="flex size-11 items-center justify-center rounded-xl bg-white/15 text-white ring-1 ring-white/25 backdrop-blur-sm"
            >
              {icon}
            </motion.div>
          )}
          {!disabled && (
            <motion.span
              animate={{ opacity: hovered ? 1 : 0.4, scale: hovered ? 1.4 : 1 }}
              className="mt-2 block size-1.5 rounded-full bg-white"
            />
          )}
        </div>

        <div className="mt-auto pt-8">
          <h3 className="font-display text-xl font-semibold tracking-tight text-white">{title}</h3>
          <p className="mt-3 text-sm leading-relaxed text-white/75">{description}</p>

          {meta && meta.length > 0 && (
            <ul className="mt-5 flex flex-wrap gap-2">
              {meta.map((m) => (
                <li
                  key={m}
                  className="rounded-full bg-white/10 px-2.5 py-1 font-mono text-[11px] text-white/80 ring-1 ring-white/15"
                >
                  {m}
                </li>
              ))}
            </ul>
          )}

          {onClick && !disabled && (
            <motion.div
              animate={{ opacity: hovered ? 1 : 0.7, x: hovered ? 4 : 0 }}
              className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-white"
            >
              <span>{loading ? "Loading..." : "Explore"}</span>
              <span aria-hidden>→</span>
            </motion.div>
          )}
        </div>
      </div>

      {loading && (
        <div className="absolute inset-0 z-10 grid place-items-center rounded-2xl bg-black/40 backdrop-blur-sm">
          <div className="size-6 animate-spin rounded-full border-2 border-white/30 border-t-white" />
        </div>
      )}
    </motion.div>
  );
});

export const Card3DList: React.FC<Card3DListProps> = ({
  cards,
  className,
  columns = 3,
  gap = "md",
  size = "md",
  variant = "default",
  animated = true,
  staggerDelay = 0.08,
}) => {
  const customVariants = useMemo(
    () => ({
      ...containerVariants,
      visible: {
        ...containerVariants.visible,
        transition: { ...containerVariants.visible.transition, staggerChildren: staggerDelay },
      },
    }),
    [staggerDelay],
  );

  return (
    <motion.div
      variants={customVariants}
      initial={animated ? "hidden" : false}
      {...(animated ? { whileInView: "visible" as const } : {})}
      viewport={{ once: true, margin: "-60px" }}
      className={cn("grid", GRIDS[columns], GAPS[gap], className)}
    >
      {cards.map(({ id, ...card }) => (
        <Card3D key={id} {...card} size={size} variant={variant} />
      ))}
    </motion.div>
  );
};
