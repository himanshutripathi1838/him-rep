import React from "react";
import { motion } from "framer-motion";
import { GraduationCap, BookOpen, Code, Rocket, Cpu } from "lucide-react";
import { timeline } from "@/data/site";

// Map steps to specific icons
const icons = [BookOpen, GraduationCap, Code, Rocket, Cpu];

export function CareerRoadmap() {
  return (
    <div className="relative w-full py-10">
      {/* 1. Desktop Layout (>= md) */}
      <div className="hidden md:block relative w-full h-[1050px] max-w-4xl mx-auto overflow-hidden">
        {/* SVG Winding Road Background */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 800 1000"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="roadGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#10B981" /> {/* green-500 */}
              <stop offset="25%" stopColor="#FBBF24" /> {/* yellow-400 */}
              <stop offset="50%" stopColor="#F97316" /> {/* orange-500 */}
              <stop offset="75%" stopColor="#EF4444" /> {/* red-500 */}
              <stop offset="100%" stopColor="#EC4899" /> {/* pink-500 */}
            </linearGradient>
          </defs>

          {/* Thick Gradient Road Path */}
          <motion.path
            d="M 120 100 L 520 100 C 680 100, 680 300, 280 300 C 120 300, 120 500, 520 500 C 680 500, 680 700, 280 700 C 120 700, 120 900, 520 900 L 680 900"
            stroke="url(#roadGradient)"
            strokeWidth="38"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.8, ease: "easeInOut" }}
          />

          {/* Dashed White Center Line */}
          <motion.path
            d="M 120 100 L 520 100 C 680 100, 680 300, 280 300 C 120 300, 120 500, 520 500 C 680 500, 680 700, 280 700 C 120 700, 120 900, 520 900 L 680 900"
            stroke="white"
            strokeWidth="2"
            strokeDasharray="8 8"
            strokeLinecap="round"
            opacity="0.5"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.8, ease: "easeInOut", delay: 0.1 }}
          />
        </svg>

        {/* HTML Milestone Cards & Circles */}
        {timeline.map((step, i) => {
          const Icon = icons[i] || Code;
          const isOdd = i % 2 === 0; // index 0 (2020), 2 (2022-2026), 4 (2026-Present) are on the right
          const leftPercent = isOdd ? "65%" : "35%";
          const textLeftPercent = isOdd ? "75%" : "auto";
          const textRightPercent = isOdd ? "auto" : "75%";
          const topPercent = `${10 + i * 20}%`; // 10%, 30%, 50%, 70%, 90%

          return (
            <div key={step.year} className="absolute inset-0 pointer-events-none">
              {/* Step Circle with Icon */}
              <motion.div
                className="absolute flex items-center justify-center size-14 rounded-full bg-background border-4 border-muted shadow-lg pointer-events-auto cursor-pointer z-10"
                style={{
                  left: leftPercent,
                  top: topPercent,
                  transform: "translate(-50%, -50%)",
                }}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.12, borderColor: "var(--color-accent)" }}
                transition={{ type: "spring", stiffness: 200, damping: 15, delay: i * 0.2 }}
              >
                <Icon className="size-6 text-foreground" />
              </motion.div>

              {/* Step Content Card */}
              <motion.div
                className="absolute w-[240px] pointer-events-auto p-4 rounded-xl border border-border/80 bg-background/80 backdrop-blur-sm shadow-md"
                style={{
                  left: textLeftPercent,
                  right: textRightPercent,
                  top: topPercent,
                  transform: "translateY(-50%)",
                }}
                initial={{ opacity: 0, x: isOdd ? 40 : -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 100, damping: 16, delay: i * 0.2 + 0.1 }}
              >
                <span className="font-mono text-xs font-semibold text-accent uppercase tracking-wider">
                  {step.year}
                </span>
                <h4 className="mt-1 text-sm font-semibold text-foreground">
                  {step.title}
                </h4>
                <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">
                  {step.body}
                </p>
              </motion.div>
            </div>
          );
        })}
      </div>

      {/* 2. Mobile Layout (< md) */}
      <div className="md:hidden relative pl-10 border-l-4 border-gradient-to-b from-emerald-500 via-amber-400 to-pink-500 space-y-12 py-4">
        {timeline.map((step, i) => {
          const Icon = icons[i] || Code;
          return (
            <motion.div
              key={step.year}
              className="relative"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              {/* Step Icon Node */}
              <div className="absolute -left-[62px] top-0 flex size-10 items-center justify-center rounded-full bg-background border-2 border-muted shadow-md">
                <Icon className="size-4 text-foreground" />
              </div>

              {/* Content */}
              <div>
                <span className="font-mono text-xs font-semibold text-accent uppercase tracking-wider">
                  {step.year}
                </span>
                <h4 className="mt-1 text-base font-semibold text-foreground">
                  {step.title}
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
