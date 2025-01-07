// components/ThemeWrapper.tsx
"use client"; // This ensures the component is treated as a client component

import { useEffect, useState } from "react";
import { ThemeProvider } from "@/components/theme-provider"; // Adjust the path if necessary

export const ThemeWrapper = ({ children }: { children: React.ReactNode }) => {
  const [mounted, setMounted] = useState(false);

  // Set mounted to true after the component mounts on the client side
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Prevent rendering during SSR
    return <>{children}</>;
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
    </ThemeProvider>
  );
};
