import Link from "next/link";
import React from "react";
import { Spotlight } from "./ui/Spotlight";
// h-auto md:h-[40rem]

const HersoSection = () => {
  return (
    <div className="h-screen w-full rounded-md flex flex-col items-center justify-center relative overflow-hidden mx-auto py-10 md:py-0">
      <div className="text-neutral-900 dark:text-neutral-50">
        <Spotlight
          className="-top-40 left-0 md:left-60 md:-top-20"
          fill="currentColor"
        />
      </div>
      <div className="p-4 relative z-10 w-full text-center">
        <h1
          className="text-4xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b 
                 from-neutral-900 to-neutral-50 dark:from-neutral-50 dark:to-neutral-900"
        >
          Master the art of Music
        </h1>
        <p className="mt-4 font-normal text-base md:text-lg text-neutral-600 dark:text-neutral-300 max-w-lg mx-auto">
          Dive into our comprehensive music courses and transform your musical
          journey today. Whether you&apos;re a beginner or looking to refine
          your skills, join us to unlock your true potential.
        </p>
        <div className="mt-4">
          <Link href={"/courses"}>Explore courses</Link>
        </div>
      </div>
    </div>
  );
};

export default HersoSection;
