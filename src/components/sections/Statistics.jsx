import { motion } from "framer-motion";
import Container from "../ui/Container";
import useCountUp from "../../hooks/useCountUp";
import { STATS } from "../../data/misc";

const EASE = [0.16, 1, 0.3, 1];

function Stat({ stat }) {
  const { ref, value } = useCountUp(stat.value);
  return (
    <div ref={ref} className="text-center">
      <p className="font-heading text-4xl sm:text-5xl font-bold text-navy-900 dark:text-white">
        {value}
        <span className="text-gold-500">{stat.suffix}</span>
      </p>
      <p className="mt-2 text-xs sm:text-sm font-semibold tracking-widest uppercase text-navy-700/60 dark:text-white/70">
        {stat.label}
      </p>
    </div>
  );
}

export default function Statistics() {
  return (
    <section className="py-20 lg:py-24 bg-white dark:bg-navy-800 border-y border-navy-900/5 dark:border-cream/10">
      <Container>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-6 lg:divide-x lg:divide-navy-900/10"
        >
          {STATS.map((stat) => (
            <Stat key={stat.label} stat={stat} />
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
