import { useEffect } from "react";

/**
 * Site-wide smooth scrolling (Lenis) kept in sync with GSAP ScrollTrigger,
 * so the footer's scroll-driven motion stays accurate.
 */
export function SmoothScroll() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let cleanup = () => {};
    let cancelled = false;

    void (async () => {
      const [{ default: Lenis }, { default: gsap }, { ScrollTrigger }] = await Promise.all([
        import("lenis"),
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (cancelled) return;

      gsap.registerPlugin(ScrollTrigger);

      const lenis = new Lenis({
        duration: 1.1,
        lerp: 0.1,
        smoothWheel: true,
      });

      const onScroll = () => ScrollTrigger.update();
      lenis.on("scroll", onScroll);

      const raf = (time: number) => lenis.raf(time * 1000);
      gsap.ticker.add(raf);
      gsap.ticker.lagSmoothing(0);

      cleanup = () => {
        gsap.ticker.remove(raf);
        lenis.destroy();
      };
    })();

    return () => {
      cancelled = true;
      cleanup();
    };
  }, []);

  return null;
}
