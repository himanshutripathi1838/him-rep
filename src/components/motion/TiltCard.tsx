import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

interface TiltCardProps {
  to: string;
  params?: Record<string, string>;
  className?: string; // class for the outer link container
  innerClassName?: string; // class for the animated inner container
  children: React.ReactNode;
}

export function TiltCard({ to, params, className, innerClassName, children }: TiltCardProps) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Subtle rotation of -10 to 10 degrees
    const rotateY = ((x / rect.width) - 0.5) * 10;
    const rotateX = ((y / rect.height) - 0.5) * -10;
    
    setMousePos({ x: rotateY, y: rotateX });
  };

  const handleMouseEnter = () => setHovered(true);
  
  const handleMouseLeave = () => {
    setHovered(false);
    setMousePos({ x: 0, y: 0 });
  };

  return (
    <Link
      to={to}
      params={params}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "relative block overflow-hidden rounded-2xl border border-border/80 bg-card transition-shadow duration-500",
        hovered ? "shadow-2xl shadow-primary/10 border-primary/40" : "shadow-md",
        className
      )}
      style={{ transformStyle: "preserve-3d", perspective: 1200 }}
    >
      <motion.div
        className={cn("w-full h-full", innerClassName)}
        animate={{
          rotateY: mousePos.x,
          rotateX: mousePos.y,
          scale: hovered ? 1.015 : 1,
        }}
        transition={{ type: "spring", stiffness: 180, damping: 20 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Glow effect */}
        <div
          className="pointer-events-none absolute inset-0 -z-10 transition-opacity duration-300"
          style={{
            opacity: hovered ? 1 : 0,
            background: `radial-gradient(circle 280px at ${mousePos.x * 4 + 50}% ${-mousePos.y * 4 + 50}%, rgba(56, 189, 248, 0.15), transparent 100%)`
          }}
        />
        
        {/* Shine Sweep */}
        <motion.div
          className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 skew-x-12 bg-gradient-to-r from-transparent via-white/10 to-transparent"
          animate={{ x: hovered ? "300%" : "0%" }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        />
        
        {children}
      </motion.div>
    </Link>
  );
}
