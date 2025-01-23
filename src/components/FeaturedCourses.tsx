"use client";
import Link from "next/link";
import courseData from "../data/music_courses.json";
import { BackgroundGradient } from "./ui/background-gradient";
import Image from "next/image";

interface Course {
  id: number;
  title: string;
  slug: string;
  description: string;
  price: number;
  instructor: string;
  isFeatured: boolean;
  image: string;
}

const FeaturedCourses = () => {
  const featuredCourses = courseData.courses.filter(
    (course: Course) => course.isFeatured
  );

  return (
    <div className="py-12 bg-slate-100 dark:bg-gray-900">
      <div>
        <div className="text-center">
          <h2 className="text-base text-teal-600 font-semibold tracking-wide uppercase">
            FEATURED COURSES
          </h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-600 dark:text-white sm:text-4xl">
            Learn With the Best
          </p>
        </div>
      </div>

      <div className="mt-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
          {featuredCourses.map((course: Course) => (
            <div className="flex justify-center" key={course.id}>
              {/* <BackgroundGradient className='flex flex-col rounded-[22px] bg-white dark:bg-zinc-900 overflow-hidden h-full max-w-sm'>
                                test
                            </BackgroundGradient> */}
              <BackgroundGradient className="rounded-[22px] max-w-sm p-4 sm:p-10 bg-white dark:bg-zinc-900">
                <div className="w-full h-52 overflow-hidden">
                  <Image
                    src={course.image}
                    alt="jordans"
                    height={400}
                    width={400}
                    className="object-cover"
                  />
                </div>
                <p className="text-base sm:text-xl text-black mt-4 mb-2 dark:text-neutral-200">
                  {course.title}
                </p>

                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  {course.description}
                </p>
                <div className="flex justify-between items-center">
                  <button className="flex items-center justify-between px-4 py-2 space-x-2 rounded-full bg-gradient-to-r from-purple-500 to-indigo-600 text-white dark:from-indigo-700 dark:to-purple-800 dark:hover:from-indigo-800 dark:hover:to-purple-900 hover:from-purple-600 hover:to-indigo-700 text-xs font-bold transition duration-300 ease-in-out mt-4 shadow-lg hover:shadow-xl">
                    <span className="whitespace-nowrap">Buy Now</span>
                    <span className="px-3 py-1 rounded-full bg-white text-indigo-600 dark:bg-gray-200 dark:text-indigo-700 text-[0.75rem] font-medium shadow-md">
                      {course.price}
                    </span>
                  </button>
                  <Link href={`/courses/${course.slug}`} className="test-[16px] mt-4" >
                    Learn More
                  </Link>
                </div>
              </BackgroundGradient>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-20 text-center">
        <Link
          href={"/courses"}
          className="px-4 py-2 rounded border border-neutral-600 text-neutral-700 bg-white hover:bg-gray-100 transition duration-200"
        >
          View All courses
        </Link>
      </div>
    </div>
  );
};

export default FeaturedCourses;
