import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { site } from "@/data/site";

const INTRO_MS = 3000;

/**
 * Intro overlay shown once per session: full name + a real runtime
 * progress counter that runs from 0% to 100% over 3 seconds.
 */
export function IntroOverlay() {
  const reduce = useReducedMotion();
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const raf = useRef<number>(0);

  useEffect(() => {
    if (reduce) return;
    if (sessionStorage.getItem("ht-intro-shown")) return;
    sessionStorage.setItem("ht-intro-shown", "1");
    setVisible(true);

    const start = performance.now();
    const tick = (now: number) => {
      const pct = Math.min(((now - start) / INTRO_MS) * 100, 100);
      setProgress(pct);
      if (pct < 100) {
        raf.current = window.requestAnimationFrame(tick);
      } else {
        window.setTimeout(() => setVisible(false), 160);
      }
    };
    raf.current = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(raf.current);
  }, [reduce]);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          key="intro"
          aria-hidden
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background px-6"
          exit={{ opacity: 0, filter: "blur(12px)" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex w-full max-w-md flex-col items-center gap-6">
            <motion.span
              initial={{ opacity: 0, filter: "blur(14px)", y: 8 }}
              animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="text-center font-display text-2xl font-semibold uppercase tracking-[0.18em] text-foreground sm:text-4xl"
            >
              {site.name}
            </motion.span>
            <div className="h-px w-full overflow-hidden bg-border">
              <div
                className="h-full bg-gradient-to-r from-primary to-accent"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="flex w-full items-center justify-between">
              <span className="mono-label">{site.role}</span>
              <span className="font-mono text-xs tabular-nums text-foreground">
                {Math.round(progress)}%
              </span>
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
