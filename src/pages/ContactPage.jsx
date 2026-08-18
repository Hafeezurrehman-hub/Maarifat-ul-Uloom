import PageBanner from "../components/ui/PageBanner";
import Contact from "../components/sections/Contact";
import SocialMedia from "../components/sections/SocialMedia";

export default function ContactPage() {
  return (
    <>
      <PageBanner
        eyebrow="Get in Touch"
        title="Let's Start Your Journey"
        subtitle="Book a free trial class, ask a question, or just say salaam. We'll be in touch within a few hours."
      />
      <Contact />
      <SocialMedia />
    </>
  );
}
