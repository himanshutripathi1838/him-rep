import { Link } from "@tanstack/react-router";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

const base =
  "inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:opacity-60";

const variants = {
  primary:
    "bg-primary text-primary-foreground hover:brightness-110 hover:-translate-y-0.5 shadow-[0_10px_40px_-18px_var(--primary)]",
  outline:
    "border border-border bg-surface/40 text-foreground hover:border-primary/60 hover:-translate-y-0.5",
  ghost: "text-muted-foreground hover:text-foreground",
} as const;

const sizes = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-6 text-base",
} as const;

type Variant = keyof typeof variants;
type Size = keyof typeof sizes;

export function actionClass(variant: Variant = "primary", size: Size = "md", className?: string) {
  return cn(base, variants[variant], sizes[size], className);
}

type ActionLinkProps = {
  to: string;
  params?: Record<string, string>;
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
};

export function ActionLink({
  to,
  params,
  variant = "primary",
  size = "md",
  className,
  children,
}: ActionLinkProps) {
  const AnyLink = Link as unknown as (props: Record<string, unknown>) => ReactNode;
  return (
    <AnyLink
      to={to}
      {...(params ? { params } : {})}
      className={actionClass(variant, size, className)}
    >
      {children}
    </AnyLink>
  );
}

type ActionAnchorProps = ComponentProps<"a"> & { variant?: Variant; size?: Size };

export function ActionAnchor({
  variant = "outline",
  size = "md",
  className,
  ...props
}: ActionAnchorProps) {
  return <a className={actionClass(variant, size, className)} {...props} />;
}

type ActionButtonProps = ComponentProps<"button"> & { variant?: Variant; size?: Size };

export function ActionButton({
  variant = "primary",
  size = "md",
  className,
  ...props
}: ActionButtonProps) {
  return <button className={actionClass(variant, size, className)} {...props} />;
}
