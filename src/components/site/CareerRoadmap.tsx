import React, { useState } from "react";
import { motion } from "framer-motion";
import { timeline } from "@/data/site";

const phaseLabels = [
  "PHASE 01 // COMPLETED",
  "PHASE 02 // COMPLETED",
  "PHASE 03 // ACADEMIC",
  "PHASE 04 // SHIPPED",
  "PHASE 05 // SYSTEM ACTIVE",
];

export function CareerRoadmap() {
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);
  const activeStep = 4; // Default active is the latest (index 4)
  const currentActive = hoveredStep !== null ? hoveredStep : activeStep;

  // Path lengths at each step (ratios from 0 to 1)
  const stepRatios = [0.12, 0.32, 0.52, 0.72, 0.92];
  const activeRatio = stepRatios[currentActive];

  return (
    <div className="relative w-full py-10">
      {/* 1. Desktop Layout (>= md) */}
      <div className="hidden md:block relative w-full h-[1150px] max-w-4xl mx-auto overflow-hidden">
        {/* SVG Centered Wavy Path with More Curves */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 800 1100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Base Dark Line (Inactive Path with higher curve offsets) */}
          <path
            d="M 400 0 C 400 40, 430 70, 440 110 C 460 190, 340 250, 360 330 C 380 410, 460 470, 440 550 C 420 630, 340 690, 360 770 C 380 850, 460 910, 440 990 C 430 1030, 400 1060, 400 1100"
            stroke="rgba(255, 255, 255, 0.08)"
            strokeWidth="3.5"
            fill="none"
            strokeLinecap="round"
          />

          {/* Active Glowing Cyan Line (Grows based on active step) */}
          <motion.path
            d="M 400 0 C 400 40, 430 70, 440 110 C 460 190, 340 250, 360 330 C 380 410, 460 470, 440 550 C 420 630, 340 690, 360 770 C 380 850, 460 910, 440 990 C 430 1030, 400 1060, 400 1100"
            stroke="#06b6d4" // cyan-500
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
            animate={{ pathLength: activeRatio }}
            transition={{ type: "spring", stiffness: 70, damping: 16 }}
            className="drop-shadow-[0_0_12px_rgba(6,182,212,0.9)]"
          />
        </svg>

        {/* Milestone Circles and Cards */}
        {timeline.map((step, i) => {
          const isLeft = i % 2 === 0; // alternating: index 0 (2020), 2 (2022-26), 4 (Present) on left
          const isRightPeak = i % 2 === 0; // peaks are on right for 0, 2, 4 (X = 440 / 55%)
          const leftPercent = isRightPeak ? "55%" : "45%";
          
          const textLeftPercent = isLeft ? "auto" : "52%";
          const textRightPercent = isLeft ? "52%" : "auto";
          const topPercent = `${10 + i * 20}%`; // 10%, 30%, 50%, 70%, 90%
          
          const isSelected = i <= currentActive;
          const isHovered = hoveredStep === i;

          return (
            <div key={step.year} className="absolute inset-0 pointer-events-none">
              {/* Step Circle with Number */}
              <motion.div
                className={`absolute flex items-center justify-center size-12 rounded-full bg-background border-2 transition-all duration-300 pointer-events-auto cursor-pointer z-20 ${
                  isSelected
                    ? "border-cyan-400 text-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.5)]"
                    : "border-slate-800 text-slate-500"
                }`}
                style={{
                  left: leftPercent,
                  top: topPercent,
                  transform: "translate(-50%, -50%)",
                }}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                onMouseEnter={() => setHoveredStep(i)}
                onMouseLeave={() => setHoveredStep(null)}
                whileHover={{ scale: 1.15 }}
                transition={{ type: "spring", stiffness: 200, damping: 15, delay: i * 0.15 }}
              >
                <span className="font-mono font-bold text-sm">{i + 1}</span>
              </motion.div>

              {/* Step Card */}
              <motion.div
                className={`absolute w-[290px] pointer-events-auto p-5 rounded-2xl border transition-colors duration-300 bg-slate-950/75 border-slate-900/90 backdrop-blur-md shadow-lg cursor-pointer ${
                  isHovered ? "border-cyan-500/40" : "border-slate-900/80"
                }`}
                style={{
                  left: textLeftPercent,
                  right: textRightPercent,
                  top: topPercent,
                  textAlign: isLeft ? "right" : "left",
                }}
                initial={{ opacity: 0, x: isLeft ? -40 : 40, y: "-50%", scale: 0.96 }}
                whileInView={{ opacity: 1, x: 0, y: "-50%", scale: 1 }}
                onMouseEnter={() => setHoveredStep(i)}
                onMouseLeave={() => setHoveredStep(null)}
                whileHover={{
                  x: isLeft ? -10 : 10,
                  y: "-50%",
                  scale: 1.03,
                  boxShadow: "0 20px 30px -10px rgba(0, 0, 0, 0.4)",
                }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 220, damping: 18, delay: i * 0.15 + 0.1 }}
              >
                <div
                  className={`flex flex-col ${
                    isLeft ? "items-end" : "items-start"
                  }`}
                >
                  <span className="font-mono text-[10px] font-medium tracking-[0.14em] text-cyan-400/80 uppercase">
                    {phaseLabels[i]}
                  </span>
                  <div className="mt-1.5 flex items-baseline gap-2">
                    {isLeft && (
                      <span className="font-mono text-[11px] text-muted-foreground">
                        ({step.year})
                      </span>
                    )}
                    <h4 className="text-base font-semibold text-foreground tracking-tight">
                      {step.title}
                    </h4>
                    {!isLeft && (
                      <span className="font-mono text-[11px] text-muted-foreground">
                        ({step.year})
                      </span>
                    )}
                  </div>
                  <p className="mt-2 text-[13px] text-muted-foreground leading-relaxed">
                    {step.body}
                  </p>
                </div>
              </motion.div>
            </div>
          );
        })}
      </div>

      {/* 2. Mobile Layout (< md) */}
      <div className="md:hidden relative pl-8 border-l-2 border-slate-800 space-y-12 py-4">
        {/* Mobile Active Path overlay */}
        <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-cyan-400 drop-shadow-[0_0_6px_rgba(6,182,212,0.8)]" style={{ height: "92%" }} />

        {timeline.map((step, i) => {
          return (
            <motion.div
              key={step.year}
              className="relative"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              {/* Step Node Circle */}
              <div className="absolute -left-[45px] top-0 flex size-8 items-center justify-center rounded-full bg-background border-2 border-cyan-400 text-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.35)] font-mono font-bold text-xs">
                {i + 1}
              </div>

              {/* Content */}
              <div>
                <span className="font-mono text-[10px] font-medium tracking-wider text-cyan-400/80 uppercase">
                  {phaseLabels[i]}
                </span>
                <h4 className="mt-1 text-base font-semibold text-foreground">
                  {step.title} <span className="font-mono text-xs text-muted-foreground">({step.year})</span>
                </h4>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  {step.body}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
