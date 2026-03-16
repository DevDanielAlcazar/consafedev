'use client';

import { motion, useMotionTemplate, useMotionValue } from "motion/react";
import { MouseEvent } from "react";
import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  spotlightColor?: string;
}

export function GlassCard({ 
  children, 
  className,
  spotlightColor = "rgba(0, 95, 107, 0.15)" // Transformative Teal by default
}: GlassCardProps) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div
      className={cn(
        "relative group overflow-hidden rounded-3xl liquid-glass transition-all duration-500 hover:border-white/20",
        className
      )}
      onMouseMove={handleMouseMove}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              600px circle at ${mouseX}px ${mouseY}px,
              ${spotlightColor},
              transparent 80%
            )
          `,
        }}
      />
      <div className="relative z-10 h-full">
        {children}
      </div>
    </div>
  );
}
