import { useEffect, useRef } from "react";

/**
 * Subtle cursor-follow glow. Pointer-events none, disabled for
 * touch pointers and reduced-motion users.
 */
export function MouseGlow() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    const target = { x: window.innerWidth / 2, y: window.innerHeight * 0.3 };
    const current = { ...target };

    const onMove = (e: PointerEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
    };

    const loop = () => {
      current.x += (target.x - current.x) * 0.08;
      current.y += (target.y - current.y) * 0.08;
      el.style.transform = `translate3d(${current.x - 320}px, ${current.y - 320}px, 0)`;
      raf = requestAnimationFrame(loop);
    };

    el.style.opacity = "1";
    window.addEventListener("pointermove", onMove, { passive: true });
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-0 size-[640px] opacity-0 transition-opacity duration-700"
      style={{
        background:
          "radial-gradient(circle, color-mix(in oklab, var(--primary) 16%, transparent) 0%, transparent 62%)",
      }}
    />
  );
}
