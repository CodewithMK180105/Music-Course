import FeaturedCourses from "@/components/FeaturedCourses";
import HersoSection from "@/components/HersoSection";
import MusicSchoolTestimonials from "@/components/TestimonialsCards";
import WhyChoseUs from "@/components/WhyChoseUs";

export default function Home() {
  return (
    <main className="min-h-screen antialiased">
      {/* <h1 className="text-2xl text-center"> Chai aur code</h1> */}
      <HersoSection />
      <FeaturedCourses />
      <WhyChoseUs />
      <MusicSchoolTestimonials />
    </main>
  );
}
