import Hero from "../components/sections/Hero";
import TrustMarquee from "../components/sections/TrustMarquee";
import ExploreMore from "../components/sections/ExploreMore";
import Statistics from "../components/sections/Statistics";
import Testimonials from "../components/sections/Testimonials";

// Home is a short, high-impact landing page — the full detail for each
// topic now lives on its own page (About, Courses, Teachers, Pricing, FAQ,
// Contact), reachable from the navbar/footer, so nothing is duplicated here.
export default function Home() {
  return (
    <>
      <Hero />
      <TrustMarquee />
      <ExploreMore />
      <Statistics />
      <Testimonials />
    </>
  );
}
