import FeaturedCourses from "@/components/FeaturedCourses";
import HersoSection from "@/components/HersoSection";
import Instructors from "@/components/Instructors";
import MusicSchoolTestimonials from "@/components/TestimonialsCards";
import UpcomingWebinars from "@/components/UpcomingWebinars";
import WhyChoseUs from "@/components/WhyChoseUs";

export default function Home() {
  return (
    <main className="min-h-screen antialiased">
      {/* <h1 className="text-2xl text-center"> Chai aur code</h1> */}
      <HersoSection />
      <FeaturedCourses />
      <WhyChoseUs />
      <MusicSchoolTestimonials />
      <UpcomingWebinars />
      <Instructors />
    </main>
  );
}
