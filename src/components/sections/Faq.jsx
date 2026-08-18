import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import Container from "../ui/Container";
import Eyebrow from "../ui/Eyebrow";
import Reveal from "../ui/Reveal";
import { FAQS } from "../../data/misc";

const EASE = [0.16, 1, 0.3, 1];

function FaqItem({ item, isOpen, onClick }) {
  return (
    <div
      className={`border-b border-navy-900/10 dark:border-cream/10 ${
        isOpen ? "border-l-2 border-l-gold-500 pl-4 -ml-4 sm:pl-5 sm:-ml-5" : ""
      } transition-all duration-300 ease-premium`}
    >
      <button
        onClick={onClick}
        aria-expanded={isOpen}
        className="w-full flex items-center justify-between gap-4 py-5 text-left hover:bg-navy-900/[0.03] transition-colors duration-200 ease-premium px-2 -mx-2 rounded-lg"
      >
        <span className="font-heading text-sm sm:text-base font-medium text-navy-900 dark:text-white">
          {item.q}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.25, ease: EASE }}
          className={`shrink-0 ${isOpen ? "text-gold-500" : "text-navy-700/50 dark:text-white/70"}`}
        >
          <Plus size={18} />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="overflow-hidden"
          >
            <p className="pb-5 px-2 -mx-2 text-sm text-navy-700/75 dark:text-white/70 leading-relaxed">{item.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" className="py-24 lg:py-32 bg-white dark:bg-navy-800">
      <Container>
        <Reveal className="max-w-2xl mx-auto text-center mb-14">
          <Eyebrow>FAQ</Eyebrow>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-semibold text-navy-900 dark:text-white text-balance">
            Your Questions, Answered
          </h2>
          <p className="mt-5 text-navy-700/80 dark:text-white/70 leading-relaxed">
            Everything you need to know before starting your journey with us.
          </p>
        </Reveal>

        <div className="max-w-3xl mx-auto">
          {/* FIX: each FAQ row slides in from the left individually as it
              scrolls into view, instead of the whole list fading in at once */}
          {FAQS.map((item, i) => (
            <Reveal key={item.q} direction="left" delay={Math.min(i * 0.06, 0.3)} duration={0.5}>
              <FaqItem
                item={item}
                isOpen={openIndex === i}
                onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
              />
            </Reveal>
          ))}
        </div>

        <Reveal className="text-center mt-10" delay={0.15}>
          <p className="text-sm text-navy-700/70 dark:text-white/70">
            Still have questions?{" "}
            <a href="#contact" className="text-gold-700 font-medium hover:text-gold-500 transition-colors">
              Contact Us
            </a>
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
