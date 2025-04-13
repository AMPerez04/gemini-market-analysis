"use client";

import * as React from "react";
import { motion } from "framer-motion";

type GaugeChartProps = {
  /**
   * A simple string representing the grade (e.g., "A+", "B", "F").
   * Adjust gradeToFraction() if you want more fine-grained control.
   */
  grade: string;
};

export function GaugeChart({ grade }: GaugeChartProps) {
  // Convert letter grade to a fraction [0..1].
  // Adjust as needed for your grading scale.
  function gradeToFraction(g: string): number {
    switch (g) {
      case "A+":
        return 1.0;
      case "A":
        return 0.9;
      case "A-":
        return 0.85;
      case "B+":
        return 0.8;
      case "B":
        return 0.75;
      case "B-":
        return 0.7;
      case "C+":
        return 0.6;
      case "C":
        return 0.55;
      case "C-":
        return 0.50;
      case "D+":
        return 0.45;
      case "D":
        return 0.40;
      case "D-":
        return 0.35;
      case "F":
        return 0.0;
      default:
        return 0.5; // fallback to average
    }
  }



  const fraction = gradeToFraction(grade);

  // Basic geometry
  const radius = 40;
  const circumference = 2 * Math.PI * radius;

  // We'll show a 3/4 circle (270°) using strokeDasharray
  const arcLength = 0.75 * circumference;

  // At fraction = 1 (A+), strokeDashoffset should be 0 (fully filled).
  // At fraction = 0 (F), strokeDashoffset should be arcLength (no fill).
  const fillOffset = arcLength - arcLength * fraction;

  return (
    <div className="w-32 h-32 relative flex items-center justify-center">
      <svg width="120" height="120" viewBox="0 0 120 120">
        {/* Background arc (light gray) */}
        <circle
          cx="60"
          cy="60"
          r={radius}
          fill="none"
          stroke="#e5e7eb"
          strokeWidth="10"
          // We only draw the 3/4 arc
          strokeDasharray={arcLength}
          strokeDashoffset={0}
          // Rotate so arc starts at bottom-left and ends bottom-right
          transform="rotate(135 60 60)"
          strokeLinecap="round"
        />

        {/* Foreground arc (animates) */}
        {fraction > 0 && (
          <motion.circle
            cx="60"
            cy="60"
            r={radius}
            fill="none"
            stroke="#6366f1"
            strokeWidth="10"
            strokeDasharray={arcLength}
            strokeDashoffset={arcLength}
            transform="rotate(135 60 60)"
            strokeLinecap="round"
            animate={{ strokeDashoffset: fillOffset }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
        )}


        {/* Grade text in the center */}
        <text
          x="60"
          y="60"
          textAnchor="middle"
          dy="0.35em"
          fontSize="20"
          fill="var(--foreground)"
        >
          {grade}
        </text>
      </svg>

      {/* F label at bottom-left */}
      <div className="absolute left-6 bottom-5 text-xs text-muted-foreground">F</div>
      {/* A+ label at bottom-right */}
      <div className="absolute right-4 bottom-5 text-xs text-muted-foreground">A+</div>
    </div>
  );
}
