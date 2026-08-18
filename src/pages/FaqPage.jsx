import PageBanner from "../components/ui/PageBanner";
import Faq from "../components/sections/Faq";
import Container from "../components/ui/Container";
import { Link } from "react-router-dom";

export default function FaqPage() {
  return (
    <>
      <PageBanner
        eyebrow="Questions & Answers"
        title="Everything You Need to Know"
        subtitle="Common questions answered honestly. If yours isn't here, just ask."
      />
      <Faq />
      <section className="py-16 bg-cream-light dark:bg-navy-900">
        <Container>
          <div className="max-w-xl mx-auto text-center glass rounded-2xl p-10">
            <p className="font-heading text-lg font-semibold text-navy-900 dark:text-white mb-2">Still have a question?</p>
            <p className="text-navy-700/70 dark:text-white/60 text-sm mb-6">
              Reach out directly — we respond within a few hours.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-gold-500 hover:bg-gold-400 text-navy-900 font-semibold px-8 py-4 rounded-full transition-colors duration-300"
            >
              Contact Us <span aria-hidden="true">→</span>
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
