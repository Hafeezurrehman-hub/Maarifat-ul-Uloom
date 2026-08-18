import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import Container from "../ui/Container";
import Eyebrow from "../ui/Eyebrow";
import FloatingBackground from "../ui/FloatingBackground";
import QuranBook3D from "../ui/QuranBook3D";
import Icon from "../ui/Icon";

const EASE = [0.16, 1, 0.3, 1];
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: EASE },
});

const trustItems = [
  { icon: "Globe", label: "Worldwide Online Classes" },
  { icon: "Wallet", label: "Affordable Monthly Fee" },
  { icon: "GraduationCap", label: "Qualified, Certified Teachers" },
];

const isTouchDevice =
  typeof window !== "undefined" && window.matchMedia("(hover: none)").matches;

export default function Hero() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const glowY = useTransform(scrollYProgress, [0, 1], [0, isTouchDevice ? 0 : 140]);
  const glowScale = useTransform(scrollYProgress, [0, 1], [1, isTouchDevice ? 1 : 1.25]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, isTouchDevice ? 0 : 60]);
  const contentOpacity = useTransform(scrollYProgress, [0, 1], [1, isTouchDevice ? 1 : 0.4]);
  const bookProgress = useTransform(scrollYProgress, [0, 0.75], [0, isTouchDevice ? 0.4 : 1]);
  const bookScale = useTransform(scrollYProgress, [0, 1], [1, isTouchDevice ? 1 : 1.12]);
  const bookY = useTransform(scrollYProgress, [0, 1], [0, isTouchDevice ? 0 : 60]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[100svh] flex items-center pt-24 pb-16 sm:pt-28 sm:pb-20 overflow-hidden bg-gradient-to-br from-navy-900 via-navy-800 to-navy-700 [perspective:1200px]"
    >
      <FloatingBackground variant="dark" />

      <motion.div style={{ scale: bookScale, y: bookY }} className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <div className="w-[220px] sm:w-[380px] lg:w-[520px] h-[286px] sm:h-[494px] lg:h-[676px] opacity-80 sm:opacity-90">
          <QuranBook3D progress={bookProgress} className="w-full h-full" />
        </div>
      </motion.div>

      <div className="absolute inset-0 bg-gradient-to-b from-navy-900/85 via-navy-900/60 to-navy-900/92 pointer-events-none" />

      <motion.div style={{ y: glowY, scale: glowScale }} className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] rounded-full bg-gold-500/10 blur-[100px] pointer-events-none" />

      <motion.div style={{ y: contentY, opacity: contentOpacity }} className="relative z-10 w-full">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <motion.div {...fadeUp(0)}>
              <Eyebrow light>Authentic Quranic Education, Delivered Globally</Eyebrow>
            </motion.div>

            <motion.h1
              {...fadeUp(0.12)}
              className="font-display text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-white leading-[1.1] text-balance"
            >
              Nurturing <em className="text-gold-400 not-italic font-medium italic">Faith</em>.
              <br />
              Building <em className="text-gold-400 not-italic font-medium italic">Futures</em>.
            </motion.h1>

            <motion.p {...fadeUp(0.24)} className="mt-5 sm:mt-6 text-sm sm:text-lg text-white/75 max-w-2xl mx-auto leading-relaxed px-2 sm:px-0">
              Learn to read, understand, and memorize the Qur'an with structured, one-to-one
              guidance from certified male and female teachers — rooted in tradition, taught with
              modern care.
            </motion.p>

            <motion.div {...fadeUp(0.36)} className="mt-7 sm:mt-9 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 bg-gold-500 hover:bg-gold-400 text-navy-900 font-semibold px-8 py-4 rounded-full transition-colors duration-300 w-full sm:w-auto justify-center"
              >
                Book a Free Trial Class <span aria-hidden="true">→</span>
              </Link>
              <Link
                to="/courses"
                className="inline-flex items-center gap-2 border border-white/40 hover:border-gold-500 text-white hover:text-gold-400 font-semibold px-8 py-4 rounded-full transition-colors duration-300 w-full sm:w-auto justify-center"
              >
                Explore Courses
              </Link>
            </motion.div>

            <motion.div {...fadeUp(0.48)} className="mt-10 sm:mt-12 flex flex-col sm:flex-row sm:flex-wrap items-center justify-center gap-y-3 gap-x-6 sm:gap-x-8">
              {trustItems.map((item) => (
                <div key={item.label} className="flex items-center gap-2 text-white/70 text-sm">
                  <Icon name={item.icon} size={18} className="text-gold-400" />
                  <span>{item.label}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </Container>
      </motion.div>
    </section>
  );
}
