import PageBanner from "../components/ui/PageBanner";
import Container from "../components/ui/Container";
import Eyebrow from "../components/ui/Eyebrow";
import Reveal from "../components/ui/Reveal";
import { StaggerGroup, StaggerItem } from "../components/ui/Stagger";
import Icon from "../components/ui/Icon";
import { Link } from "react-router-dom";

const QUALITIES = [
  { icon: "GraduationCap", title: "Verified Qualifications", text: "Every teacher holds a recognized Quranic ijazah or certification — not just self-reported." },
  { icon: "Users", title: "Male & Female Teachers", text: "All genders of students and families are accommodated with appropriate teacher matching." },
  { icon: "Heart", title: "Patience-First Approach", text: "We select for teaching temperament, not just knowledge — patience is non-negotiable." },
  { icon: "Clock", title: "Punctual & Consistent", text: "Teachers are held accountable to class times and attendance, respecting your schedule." },
  { icon: "TrendingUp", title: "Progress Tracking", text: "Every teacher maintains structured progress notes shared with parents regularly." },
  { icon: "Globe", title: "Multilingual Support", text: "Many teachers speak Urdu, Arabic, and English — communication is never a barrier." },
];

export default function TeachersPage() {
  return (
    <>
      <PageBanner
        eyebrow="Our Teachers"
        title="Every Class, a Qualified Teacher"
        subtitle="We don't just find teachers — we vet them for qualification, character, and actual teaching ability."
      />

      <section className="py-24 lg:py-32 bg-cream-light dark:bg-navy-900">
        <Container>
          <Reveal className="max-w-2xl mx-auto text-center mb-16">
            <Eyebrow>Our Vetting Process</Eyebrow>
            <h2 className="font-heading text-3xl sm:text-4xl font-semibold text-navy-900 dark:text-white text-balance">
              What Every Teacher at Maarifat-ul-Uloom Brings
            </h2>
            <p className="mt-5 text-navy-700/80 dark:text-white/70 leading-relaxed">
              Our hiring process evaluates every applicant on Quranic credential, teaching demo, communication, and background. Only qualified, patient, consistent teachers make it through.
            </p>
          </Reveal>

          <StaggerGroup className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6" stagger={0.08}>
            {QUALITIES.map((q) => (
              <StaggerItem key={q.title}>
                <div className="glass rounded-2xl p-7 h-full shadow-3d hover:shadow-3d-hover transition-shadow duration-300 ease-premium">
                  <div className="w-12 h-12 rounded-xl bg-gold-200/60 flex items-center justify-center mb-4">
                    <Icon name={q.icon} className="text-gold-700" size={22} />
                  </div>
                  <h3 className="font-heading text-base font-semibold text-navy-900 dark:text-white mb-2">{q.title}</h3>
                  <p className="text-sm text-navy-700/70 dark:text-white/65 leading-relaxed">{q.text}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>

          <div className="mt-16 text-center glass rounded-2xl p-10 max-w-2xl mx-auto">
            <p className="font-heading text-xl font-semibold text-navy-900 dark:text-white mb-3">
              Want to meet your teacher before committing?
            </p>
            <p className="text-navy-700/70 dark:text-white/60 mb-6 text-sm">
              Your free trial class is with a real assigned teacher — not a demo session. You'll see the teaching style firsthand.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-gold-500 hover:bg-gold-400 text-navy-900 font-semibold px-8 py-4 rounded-full transition-colors duration-300"
            >
              Book a Free Trial Class <span aria-hidden="true">→</span>
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
