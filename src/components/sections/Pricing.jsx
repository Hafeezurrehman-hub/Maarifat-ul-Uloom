import Container from "../ui/Container";
import Eyebrow from "../ui/Eyebrow";
import Reveal from "../ui/Reveal";
import Button from "../ui/Button";
import Icon from "../ui/Icon";
import { StaggerGroup, StaggerItem } from "../ui/Stagger";

// NOTE: These are PLACEHOLDER prices/class counts — replace price, currency,
// and the feature list for each plan with your real numbers before publishing.
const PLANS = [
  {
    name: "Starter",
    price: "$20",
    period: "/month",
    classes: "8 classes / month (2x weekly)",
    features: ["1-to-1 live classes", "Noorani Qaida or Quran Reading", "Free first trial class", "Flexible scheduling"],
    highlight: false,
  },
  {
    name: "Standard",
    price: "$35",
    period: "/month",
    classes: "16 classes / month (4x weekly)",
    features: ["1-to-1 live classes", "Any single course", "Progress reports to parents", "Flexible scheduling", "Priority teacher matching"],
    highlight: true,
  },
  {
    name: "Complete",
    price: "$55",
    period: "/month",
    classes: "24 classes / month (6x weekly)",
    features: ["1-to-1 live classes", "Combine 2 courses (e.g. Hifz + Tajweed)", "Progress reports to parents", "Flexible scheduling", "Priority teacher matching"],
    highlight: false,
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 lg:py-32 bg-white dark:bg-navy-800">
      <Container>
        <Reveal className="max-w-2xl mx-auto text-center mb-16">
          <Eyebrow>Simple Pricing</Eyebrow>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-semibold text-navy-900 dark:text-white text-balance">
            One Simple Monthly Fee
          </h2>
          <p className="mt-5 text-navy-700/80 dark:text-white/70 leading-relaxed">
            No hidden charges, no long-term contracts. Start with a free trial class before
            choosing a plan.
          </p>
        </Reveal>

        <StaggerGroup className="grid sm:grid-cols-3 gap-6 lg:gap-7 max-w-5xl mx-auto items-start" stagger={0.1}>
          {PLANS.map((plan, i) => (
            <StaggerItem key={plan.name} direction={i === 0 ? "left" : i === PLANS.length - 1 ? "right" : "up"}>
              <div
                className={`relative rounded-2xl p-7 h-full flex flex-col ${
                  plan.highlight
                    ? "bg-navy-900 text-white shadow-3d-hover scale-[1.03]"
                    : "bg-cream-light dark:bg-navy-900/40 shadow-card"
                }`}
              >
                {plan.highlight && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gold-500 text-navy-900 text-xs font-semibold px-3 py-1 rounded-full">
                    Most Popular
                  </span>
                )}
                <h3 className={`font-heading text-lg font-semibold mb-1 ${plan.highlight ? "text-white" : "text-navy-900 dark:text-white"}`}>
                  {plan.name}
                </h3>
                <div className="flex items-end gap-1 mb-1">
                  <span className={`font-heading text-3xl font-bold ${plan.highlight ? "text-gold-400" : "text-navy-900 dark:text-white"}`}>
                    {plan.price}
                  </span>
                  <span className={`text-sm mb-1 ${plan.highlight ? "text-white/60" : "text-navy-700/60 dark:text-white/60"}`}>
                    {plan.period}
                  </span>
                </div>
                <p className={`text-xs mb-5 ${plan.highlight ? "text-white/60" : "text-navy-700/60 dark:text-white/60"}`}>
                  {plan.classes}
                </p>
                <ul className="space-y-2.5 mb-7 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className={`flex items-start gap-2 text-sm ${plan.highlight ? "text-white/85" : "text-navy-700/80 dark:text-white/70"}`}>
                      <Icon name="Check" size={16} className="text-gold-500 shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Button
                  href="#contact"
                  variant={plan.highlight ? "primary" : "secondary"}
                  showArrow={false}
                  className={plan.highlight ? "w-full justify-center" : "w-full justify-center !text-navy-900 dark:!text-white"}
                >
                  Get Started
                </Button>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>

        <p className="mt-8 text-center text-xs text-navy-700/50 dark:text-white/40">
          Exact pricing may vary by course and class frequency — confirm with us during your
          free trial.
        </p>
      </Container>
    </section>
  );
}
