import { motion } from "framer-motion";
import Container from "./Container";
import Eyebrow from "./Eyebrow";

export default function PageBanner({ eyebrow, title, subtitle }) {
  return (
    <section className="relative pt-36 pb-20 bg-gradient-to-br from-navy-900 via-navy-800 to-navy-700 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-navy-900/60 to-navy-900/90 pointer-events-none" />
      <Container className="relative text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <Eyebrow light>{eyebrow}</Eyebrow>
          <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-semibold text-white mt-3 text-balance">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-4 text-white/70 max-w-2xl mx-auto leading-relaxed text-sm sm:text-base">
              {subtitle}
            </p>
          )}
        </motion.div>
      </Container>
    </section>
  );
}
