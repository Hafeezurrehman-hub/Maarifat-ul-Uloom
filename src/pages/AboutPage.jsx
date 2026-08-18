import PageBanner from "../components/ui/PageBanner";
import About from "../components/sections/About";
import WhyChooseUs from "../components/sections/WhyChooseUs";
import LearningJourney from "../components/sections/LearningJourney";

export default function AboutPage() {
  return (
    <>
      <PageBanner
        eyebrow="Our Story"
        title="Rooted in Tradition. Focused on Tomorrow."
        subtitle="Learn who we are, what drives us, and why families around the world trust Maarifat-ul-Uloom with their children's education."
      />
      <About />
      <WhyChooseUs />
      <LearningJourney />
    </>
  );
}
