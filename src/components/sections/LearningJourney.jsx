import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Container from "../ui/Container";
import Eyebrow from "../ui/Eyebrow";
import Reveal from "../ui/Reveal";
import Button from "../ui/Button";
import Icon from "../ui/Icon";
import { JOURNEY_STEPS } from "../../data/misc";

const EASE = [0.16, 1, 0.3, 1];

function TimelineNode({ step, index, progress, total }) {
  const start = index / total;
  const end = (index + 0.5) / total;
  const activeScale = useTransform(progress, [start, end], [0, 1]);
  const bg = useTransform(activeScale, [0, 1], ["rgba(27,59,111,0.12)", "#0A1628"]);

  return (
    <div className="relative flex-1 flex flex-col items-center text-center px-2">
      <motion.div
        style={{ backgroundColor: bg }}
        className="w-14 h-14 rounded-full flex items-center justify-center border-2 border-gold-500 relative z-10"
      >
        <motion.span style={{ opacity: activeScale }} className="absolute inset-0 rounded-full ring-4 ring-gold-500/30" />
        <Icon name={step.icon} size={22} className="text-gold-400" />
      </motion.div>
      <span className="mt-3 text-xs font-semibold text-gold-700">{`0${index + 1}`}</span>
      <h3 className="mt-1 font-heading text-sm sm:text-base font-semibold text-navy-900 dark:text-white">
        {step.title}
      </h3>
      <p className="mt-1.5 text-xs sm:text-sm text-navy-700/70 dark:text-white/70 leading-relaxed max-w-[180px]">
        {step.description}
      </p>
    </div>
  );
}

export default function LearningJourney() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 75%", "end 40%"],
  });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section ref={ref} className="py-24 lg:py-32 bg-white dark:bg-navy-800 overflow-hidden">
      <Container>
        <Reveal className="max-w-2xl mx-auto text-center mb-16 sm:mb-20">
          <Eyebrow>How It Works</Eyebrow>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-semibold text-navy-900 dark:text-white text-balance">
            Your Journey, Simplified
          </h2>
          <p className="mt-5 text-navy-700/80 dark:text-white/70 leading-relaxed">
            From your first message to steady, structured progress — here's exactly what to
            expect.
          </p>
        </Reveal>

        {/* Desktop horizontal timeline */}
        <div className="hidden lg:block relative">
          <div className="absolute top-7 left-0 right-0 h-[2px] bg-navy-900/10" />
          <motion.div
            style={{ scaleX: lineScale }}
            className="absolute top-7 left-0 right-0 h-[2px] bg-gold-500 origin-left"
          />
          <div className="flex">
            {JOURNEY_STEPS.map((step, i) => (
              <TimelineNode
                key={step.title}
                step={step}
                index={i}
                progress={scrollYProgress}
                total={JOURNEY_STEPS.length}
              />
            ))}
          </div>
        </div>

        {/* Mobile vertical timeline */}
        <div className="lg:hidden relative pl-8">
          <div className="absolute top-0 bottom-0 left-[27px] w-[2px] bg-navy-900/10" />
          <div className="space-y-10">
            {JOURNEY_STEPS.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.5, ease: EASE }}
                className="relative"
              >
                <div className="absolute -left-8 top-0 w-11 h-11 rounded-full bg-navy-900 border-2 border-gold-500 flex items-center justify-center">
                  <Icon name={step.icon} size={18} className="text-gold-400" />
                </div>
                <div className="pl-8">
                  <span className="text-xs font-semibold text-gold-700">{`0${i + 1}`}</span>
                  <h3 className="font-heading text-base font-semibold text-navy-900 dark:text-white">
                    {step.title}
                  </h3>
                  <p className="mt-1 text-sm text-navy-700/70 dark:text-white/70 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <Reveal className="mt-16 text-center">
          <Button href="#contact" variant="primary">Start With a Free Trial</Button>
        </Reveal>
      </Container>
    </section>
  );
}
