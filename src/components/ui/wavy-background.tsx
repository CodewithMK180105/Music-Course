"use client";
import { cn } from "@/lib/utils";
import React, { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { createNoise3D } from "simplex-noise";

export const WavyBackground = ({
  children,
  className,
  containerClassName,
  colors,
  waveWidth,
  backgroundFill,
  blur = 10,
  speed = "fast",
  waveOpacity = 0.5,
  ...props
}: {
  children?: React.ReactNode;
  className?: string;
  containerClassName?: string;
  colors?: string[];
  waveWidth?: number;
  backgroundFill?: string;
  blur?: number;
  speed?: "slow" | "fast";
  waveOpacity?: number;
  [key: string]: unknown;
}) => {
  const noise = createNoise3D();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const wRef = useRef<number>(0);
  const hRef = useRef<number>(0);
  const ntRef = useRef<number>(0);
  const animationIdRef = useRef<number | null>(null);

  // Memoize the wave colors
  const waveColors = useMemo(
    () =>
      colors ?? [
        "#38bdf8",
        "#818cf8",
        "#c084fc",
        "#e879f9",
        "#22d3ee",
      ],
    [colors]
  );

  // Get speed multiplier based on wave speed
  const getSpeed = useCallback(() => {
    switch (speed) {
      case "slow":
        return 0.001;
      case "fast":
        return 0.002;
      default:
        return 0.001;
    }
  }, [speed]);

  // Draw the waves on the canvas
  const drawWave = useCallback(
    (n: number) => {
      const ctx = ctxRef.current;
      if (!ctx) return;
      ntRef.current += getSpeed();
      for (let i = 0; i < n; i++) {
        ctx.beginPath();
        ctx.lineWidth = waveWidth || 50;
        ctx.strokeStyle = waveColors[i % waveColors.length];
        for (let x = 0; x < wRef.current; x += 5) {
          const y = noise(x / 800, 0.3 * i, ntRef.current) * 100;
          ctx.lineTo(x, y + hRef.current * 0.5);
        }
        ctx.stroke();
        ctx.closePath();
      }
    },
    [getSpeed, waveColors, waveWidth, noise]
  );

  // Render the wave animation
  const render = useCallback(() => {
    const ctx = ctxRef.current;
    if (!ctx) return;
    ctx.fillStyle = backgroundFill || "black";
    ctx.globalAlpha = waveOpacity || 0.5;
    ctx.fillRect(0, 0, wRef.current, hRef.current);
    drawWave(5);
    animationIdRef.current = requestAnimationFrame(render);
  }, [backgroundFill, waveOpacity, drawWave]);

  // Initialize the canvas
  const init = useCallback(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctxRef.current = ctx;
        wRef.current = ctx.canvas.width = window.innerWidth;
        hRef.current = ctx.canvas.height = window.innerHeight;
        ctx.filter = `blur(${blur}px)`;
        ntRef.current = 0;

        // Resize the canvas on window resize
        window.onresize = function () {
          if (ctxRef.current) {
            wRef.current = ctxRef.current.canvas.width = window.innerWidth;
            hRef.current = ctxRef.current.canvas.height = window.innerHeight;
            ctxRef.current.filter = `blur(${blur}px)`;
          }
        };
        render();
      }
    }
  }, [blur, render]);

  // Initialize and cleanup on component mount and unmount
  useEffect(() => {
    init();
    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
    };
  }, [init]);

  const [isSafari, setIsSafari] = useState(false);

  // Detect if the browser is Safari
  useEffect(() => {
    setIsSafari(
      typeof window !== "undefined" &&
        navigator.userAgent.includes("Safari") &&
        !navigator.userAgent.includes("Chrome")
    );
  }, []);

  return (
    <div
      className={cn(
        "h-screen flex flex-col items-center justify-center",
        containerClassName
      )}
    >
      <canvas
        className="absolute inset-0 z-0"
        ref={canvasRef}
        id="canvas"
        style={{
          ...(isSafari ? { filter: `blur(${blur}px)` } : {}),
        }}
      ></canvas>
      <div className={cn("relative z-10", className)} {...props}>
        {children}
      </div>
    </div>
  );
};
