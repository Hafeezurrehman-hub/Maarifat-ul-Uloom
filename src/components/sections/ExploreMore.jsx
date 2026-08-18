import { Link } from "react-router-dom";
import Container from "../ui/Container";
import Eyebrow from "../ui/Eyebrow";
import Reveal from "../ui/Reveal";
import Icon from "../ui/Icon";
import { StaggerGroup, StaggerItem } from "../ui/Stagger";

// FIX: this is the "there's more to this site" signal for visitors —
// especially on mobile, where the full nav is hidden behind a hamburger
// icon and easy to miss. This grid sits right in the page flow so it's
// seen just from scrolling, no menu tap required.
const PAGES = [
  { icon: "Info", title: "About Us", text: "Our mission, values and why families trust us.", to: "/about" },
  { icon: "BookOpen", title: "Courses", text: "Every course, from Noorani Qaida to Hifz.", to: "/courses" },
  { icon: "GraduationCap", title: "Teachers", text: "Meet the team behind every class.", to: "/teachers" },
  { icon: "Wallet", title: "Pricing", text: "Simple monthly plans, no hidden fees.", to: "/pricing" },
  { icon: "HelpCircle", title: "FAQ", text: "Quick answers to common questions.", to: "/faq" },
  { icon: "MessageCircle", title: "Contact", text: "Book your free trial class today.", to: "/contact" },
];

export default function ExploreMore() {
  return (
    <section className="py-20 lg:py-28 bg-cream-light dark:bg-navy-900">
      <Container>
        <Reveal className="max-w-2xl mx-auto text-center mb-12">
          <Eyebrow>Explore the Site</Eyebrow>
          <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-semibold text-navy-900 dark:text-white text-balance">
            There's More to Discover
          </h2>
          <p className="mt-4 text-navy-700/80 dark:text-white/70 leading-relaxed">
            Everything you need to know — courses, teachers, pricing, and how to get started.
          </p>
        </Reveal>

        <StaggerGroup className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5" stagger={0.06}>
          {PAGES.map((p, i) => (
            <StaggerItem key={p.to} direction={i % 2 === 0 ? "left" : "right"}>
              <Link
                to={p.to}
                className="group flex items-center gap-4 bg-white dark:bg-navy-800/60 rounded-2xl p-5 shadow-card hover:shadow-card-hover transition-shadow duration-300 ease-premium h-full"
              >
                <div className="w-11 h-11 shrink-0 rounded-xl bg-gold-200/60 flex items-center justify-center">
                  <Icon name={p.icon} className="text-gold-700" size={20} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-heading text-sm font-semibold text-navy-900 dark:text-white mb-0.5">
                    {p.title}
                  </h3>
                  <p className="text-xs text-navy-700/65 dark:text-white/60 leading-snug">
                    {p.text}
                  </p>
                </div>
                <Icon
                  name="ChevronRight"
                  size={18}
                  className="text-navy-700/30 dark:text-white/30 group-hover:text-gold-500 group-hover:translate-x-0.5 transition-all duration-300 shrink-0"
                />
              </Link>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Container>
    </section>
  );
}
