import PageBanner from "../components/ui/PageBanner";
import Container from "../components/ui/Container";
import Eyebrow from "../components/ui/Eyebrow";
import Reveal from "../components/ui/Reveal";
import Icon from "../components/ui/Icon";
import { StaggerGroup, StaggerItem } from "../components/ui/Stagger";
import { Link } from "react-router-dom";

const PLANS = [
  {
    name: "Starter",
    price: "$20",
    period: "/month",
    classes: "8 classes / month (2x weekly)",
    features: [
      "1-to-1 live classes",
      "Any single course",
      "Progress reports to parents",
      "Flexible scheduling",
    ],
    cta: "Get Started",
    highlight: false,
  },
  {
    name: "Standard",
    price: "$35",
    period: "/month",
    classes: "16 classes / month (4x weekly)",
    features: [
      "1-to-1 live classes",
      "Any single course",
      "Progress reports to parents",
      "Flexible scheduling",
      "Priority teacher matching",
    ],
    cta: "Get Started",
    highlight: true,
    badge: "Most Popular",
  },
  {
    name: "Complete",
    price: "$55",
    period: "/month",
    classes: "20 classes / month (5x weekly)",
    features: [
      "1-to-1 live classes",
      "Any two courses combined",
      "Weekly progress reports",
      "Flexible scheduling",
      "Priority teacher matching",
      "Dedicated progress manager",
    ],
    cta: "Get Started",
    highlight: false,
  },
];

const NOTES = [
  { icon: "Gift", text: "Every plan starts with a free trial class — no payment needed." },
  { icon: "X", text: "No long-term contracts. Cancel or pause anytime with reasonable notice." },
  { icon: "RefreshCw", text: "Switch plans as your needs change — upgrades take effect next month." },
  { icon: "Globe", text: "Prices in USD. We accommodate families across all time zones." },
];

export default function PricingPage() {
  return (
    <>
      <PageBanner
        eyebrow="Pricing"
        title="Simple, Honest Pricing"
        subtitle="No hidden fees. No annual lock-in. Just a straightforward monthly plan that fits your family."
      />

      <section className="py-24 lg:py-32 bg-cream-light dark:bg-navy-900">
        <Container>
          <StaggerGroup className="grid sm:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto" stagger={0.1}>
            {PLANS.map((plan) => (
              <StaggerItem key={plan.name}>
                <div className={`relative rounded-2xl p-8 h-full flex flex-col transition-shadow duration-300 ${
                  plan.highlight
                    ? "bg-navy-900 dark:bg-navy-800 shadow-[0_20px_60px_rgba(10,22,40,0.35)]"
                    : "glass shadow-3d hover:shadow-3d-hover"
                }`}>
                  {plan.badge && (
                    <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gold-500 text-navy-900 text-xs font-bold px-4 py-1.5 rounded-full">
                      {plan.badge}
                    </span>
                  )}
                  <div>
                    <h3 className={`font-heading text-xl font-semibold mb-1 ${plan.highlight ? "text-white" : "text-navy-900 dark:text-white"}`}>
                      {plan.name}
                    </h3>
                    <div className="flex items-end gap-1 mt-3 mb-1">
                      <span className={`font-heading text-4xl font-bold ${plan.highlight ? "text-gold-400" : "text-navy-900 dark:text-white"}`}>
                        {plan.price}
                      </span>
                      <span className={`text-sm mb-1.5 ${plan.highlight ? "text-white/60" : "text-navy-700/60 dark:text-white/50"}`}>
                        {plan.period}
                      </span>
                    </div>
                    <p className={`text-xs mb-6 ${plan.highlight ? "text-white/55" : "text-navy-700/55 dark:text-white/45"}`}>
                      {plan.classes}
                    </p>
                    <ul className="space-y-3 mb-8 flex-1">
                      {plan.features.map((f) => (
                        <li key={f} className="flex items-center gap-2.5">
                          <Icon name="Check" size={15} className={plan.highlight ? "text-gold-400" : "text-gold-600"} />
                          <span className={`text-sm ${plan.highlight ? "text-white/85" : "text-navy-700/80 dark:text-white/75"}`}>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Link
                    to="/contact"
                    className={`mt-auto block text-center py-3.5 rounded-full font-semibold text-sm transition-colors duration-300 ${
                      plan.highlight
                        ? "bg-gold-500 hover:bg-gold-400 text-navy-900"
                        : "border-2 border-navy-900/20 dark:border-white/20 text-navy-900 dark:text-white hover:border-gold-500 hover:text-gold-700 dark:hover:text-gold-400"
                    }`}
                  >
                    {plan.cta}
                  </Link>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>

          <Reveal className="mt-16 max-w-2xl mx-auto">
            <div className="glass rounded-2xl p-8">
              <h3 className="font-heading text-lg font-semibold text-navy-900 dark:text-white mb-6 text-center">Good to know</h3>
              <ul className="space-y-4">
                {NOTES.map((note) => (
                  <li key={note.text} className="flex items-start gap-3">
                    <Icon name={note.icon} size={17} className="text-gold-600 mt-0.5 shrink-0" />
                    <span className="text-sm text-navy-700/80 dark:text-white/70 leading-relaxed">{note.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
