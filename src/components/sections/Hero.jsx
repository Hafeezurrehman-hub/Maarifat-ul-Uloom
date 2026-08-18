import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Container from "../ui/Container";
import Button from "../ui/Button";
import Eyebrow from "../ui/Eyebrow";
import FloatingBackground from "../ui/FloatingBackground";
import QuranBook3D from "../ui/QuranBook3D";
import Icon from "../ui/Icon";
import TypewriterText from "../ui/TypewriterText";

const EASE = [0.16, 1, 0.3, 1];

const HERO_PHRASES = [
  "Authentic Quranic Education, Delivered Globally",
  "Certified Male & Female Teachers",
  "One-to-One Online Classes",
  "Flexible Timings, Anywhere in the World",
];

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

// FIX: On touch devices, skip the scroll-linked parallax math below.
// Recomputing 7 useTransform values on every scroll tick was the main
// cause of the janky/stuttering mobile scroll.
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
  // Book is closed at the top of the page and opens as the visitor scrolls through the hero
  const bookProgress = useTransform(scrollYProgress, [0, 0.75], [0, isTouchDevice ? 0.4 : 1]);
  const bookScale = useTransform(scrollYProgress, [0, 1], [1, isTouchDevice ? 1 : 1.12]);
  const bookY = useTransform(scrollYProgress, [0, 1], [0, isTouchDevice ? 0 : 60]);

  return (
    <section
      ref={sectionRef}
      id="home"
      // FIX: min-h-[100svh] instead of min-h-screen — 100vh on mobile browsers
      // includes the address bar, which was causing extra height/reflow jumps
      className="relative min-h-[100svh] flex items-center pt-28 pb-20 overflow-hidden bg-gradient-to-br from-navy-900 via-navy-800 to-navy-700 bg-[length:200%_200%] animate-gradient-move [perspective:1200px]"
    >
      <FloatingBackground variant="dark" />

      {/* Large closed Qur'an, centered — opens page by page as the visitor scrolls */}
      <motion.div
        style={{ scale: bookScale, y: bookY }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none z-0"
      >
        <div className="w-[300px] sm:w-[420px] lg:w-[560px] h-[390px] sm:h-[546px] lg:h-[728px] opacity-90">
          <QuranBook3D progress={bookProgress} className="w-full h-full" />
        </div>
      </motion.div>
      {/* Navy scrim so headline text stays readable over the book */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy-900/80 via-navy-900/55 to-navy-900/90 pointer-events-none" />

      {/* Soft radial gold glow behind headline — drifts with scroll for depth */}
      <motion.div
        style={{ y: glowY, scale: glowScale }}
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-gold-500/10 blur-[100px] pointer-events-none"
      />

      <motion.div style={{ y: contentY, opacity: contentOpacity }} className="relative z-10">
      <Container>
        <div className="max-w-3xl mx-auto text-center">
          <motion.div {...fadeUp(0)}>
            <Eyebrow light>
              <TypewriterText words={HERO_PHRASES} />
            </Eyebrow>
          </motion.div>

          <motion.h1
            {...fadeUp(0.12)}
            className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white leading-[1.1] text-balance"
          >
            Nurturing <em className="text-gold-400 not-italic font-medium italic">Faith</em>.
            <br />
            Building <em className="text-gold-400 not-italic font-medium italic">Futures</em>.
          </motion.h1>

          <motion.p
            {...fadeUp(0.24)}
            className="mt-6 text-base sm:text-lg text-white/75 max-w-2xl mx-auto leading-relaxed"
          >
            Learn to read, understand, and memorize the Qur'an with structured, one-to-one
            guidance from certified male and female teachers — rooted in tradition, taught with
            modern care.
          </motion.p>

          <motion.div
            {...fadeUp(0.36)}
            className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button href="#contact" variant="primary">Book a Free Trial Class</Button>
            <Button href="#courses" variant="secondary" className="!text-white !border-white/40 hover:!border-gold-500 hover:!text-gold-400" showArrow={false}>
              Explore Courses
            </Button>
          </motion.div>

          <motion.div
            {...fadeUp(0.48)}
            className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-3"
          >
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
