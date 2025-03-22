"use client";

import React, { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface DraggableCarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  pauseOnHover?: boolean; // Not used but kept for API compatibility
}

export function DraggableCarousel({
  children,
  className,
  pauseOnHover = false, // Default to false
  ...props
}: DraggableCarouselProps) {
  const [isDragging, setIsDragging] = useState(false);
  const constraintsRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Handle wheel event for horizontal scrolling
  const handleWheel = (e: React.WheelEvent) => {
    if (contentRef.current) {
      e.preventDefault();
      contentRef.current.scrollLeft += e.deltaY;
    }
  };

  return (
    <div
      ref={constraintsRef}
      className={cn("relative overflow-hidden", className)}
      {...props}
      onWheel={handleWheel}
    >
      <motion.div
        ref={contentRef}
        drag="x" // Allow horizontal dragging
        dragConstraints={constraintsRef}
        dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
        dragElastic={0.1} // Slight elasticity for smoother feel
        whileTap={{ cursor: "grabbing" }}
        onDragStart={() => setIsDragging(true)}
        onDragEnd={() => setIsDragging(false)}
        className={cn(
          "flex flex-nowrap gap-4 p-2 cursor-grab select-none overflow-x-auto scrollbar-hide",
          isDragging ? "cursor-grabbing" : "cursor-grab"
        )}
        style={{
          touchAction: "pan-y", // Allow vertical scrolling on touch devices
          WebkitOverflowScrolling: "touch", // Smooth scrolling on iOS
          scrollbarWidth: "none", // Hide scrollbar on Firefox
          msOverflowStyle: "none", // Hide scrollbar on IE/Edge
        }}
      >
        {children}
      </motion.div>

      {/* Visual indicators */}
      <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-[var(--gradient-from,white)] to-[var(--gradient-to,transparent)] pointer-events-none z-10"></div>
      <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-[var(--gradient-from,white)] to-[var(--gradient-to,transparent)] pointer-events-none z-10"></div>

      {/* Optional scroll indicators */}
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1 z-10">
        <span className="text-sm text-white/60 px-2 py-1 bg-primary/20 backdrop-blur-sm rounded-full">
          Drag or scroll to explore
        </span>
      </div>
    </div>
  );
}
