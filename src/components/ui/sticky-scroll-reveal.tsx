"use client";
import React, { useEffect, useRef, useState, useMemo } from "react";
import { useMotionValueEvent, useScroll } from "framer-motion";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ContentItem {
  title: string;
  description: string;
  content?: React.ReactNode; // Specify that content can be any valid React node
}

interface StickyScrollProps {
  content: ContentItem[];
  contentClassName?: string;
}

export const StickyScroll = ({ content, contentClassName }: StickyScrollProps) => {
  const [activeCard, setActiveCard] = React.useState(0);

  // Specify that the ref is pointing to an HTMLDivElement
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    // uncomment line 22 and comment line 23 if you DONT want the overflow container and want to have it change on the entire page scroll
    // target: ref
    container: ref,
    offset: ["start start", "end start"],
  });

  const cardLength = content.length;

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const cardsBreakpoints = content.map((_, index) => index / cardLength);
    const closestBreakpointIndex = cardsBreakpoints.reduce(
      (acc, breakpoint, index) => {
        const distance = Math.abs(latest - breakpoint);
        if (distance < Math.abs(latest - cardsBreakpoints[acc])) {
          return index;
        }
        return acc;
      },
      0
    );
    setActiveCard(closestBreakpointIndex);
  });

  const backgroundColors = [
    typeof window !== "undefined" && document.documentElement.classList.contains("dark")
      ? "var(--slate-900)"
      : "var(--slate-100)",
    typeof window !== "undefined" && document.documentElement.classList.contains("dark")
      ? "var(--black)"
      : "white",
    typeof window !== "undefined" && document.documentElement.classList.contains("dark")
      ? "var(--neutral-900)"
      : "#e9f5f9",
  ];
  

  // Memoize linearGradients array
  const linearGradients = useMemo(
    () => [
      "linear-gradient(to bottom right, var(--cyan-500), var(--emerald-500))",
      "linear-gradient(to bottom right, var(--pink-500), var(--indigo-500))",
      "linear-gradient(to bottom right, var(--orange-500), var(--yellow-500))",
    ],
    [] // Empty dependency array ensures this doesn't get recreated on each render
  );

  const [backgroundGradient, setBackgroundGradient] = useState(
    linearGradients[0]
  );

  useEffect(() => {
    setBackgroundGradient(linearGradients[activeCard % linearGradients.length]);
  }, [activeCard, linearGradients]); // Added linearGradients to dependencies

  return (
    <motion.div
      animate={{
        backgroundColor: backgroundColors[activeCard % backgroundColors.length],
      }}
      className="h-[30rem] overflow-y-auto flex justify-center relative space-x-10 p-10"
      ref={ref}
      style={{
        msOverflowStyle: "none", // Hide scrollbar for Internet Explorer 10+
        scrollbarWidth: "none", // Hide scrollbar for Firefox
      }}
    >
      <div className="div relative flex items-start px-4">
        <div className="max-w-2xl">
          {content.map((item, index) => (
            <div key={item.title + index} className="my-20">
              <motion.h2
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: activeCard === index ? 1 : 0.3,
                }}
                className="text-2xl font-bold  text-sky-900 dark:text-slate-100"
              >
                {item.title}
              </motion.h2>
              <motion.p
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: activeCard === index ? 1 : 0.3,
                }}
                className="text-kg text-700 dark:text-slate-300 max-w-sm mt-10"
              >
                {item.description}
              </motion.p>
            </div>
          ))}
          <div className="h-40" />
        </div>
      </div>
      <div
        style={{ background: backgroundGradient }}
        className={cn(
          "hidden lg:block h-60 w-80 rounded-md bg-white sticky top-10 overflow-hidden",
          contentClassName
        )}
      >
        {content[activeCard].content ?? null}
      </div>
    </motion.div>
  );
};
