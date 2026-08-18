import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import Container from "../ui/Container";
import Eyebrow from "../ui/Eyebrow";
import Reveal from "../ui/Reveal";
import Icon from "../ui/Icon";
import Tilt3D from "../ui/Tilt3D";
import { COURSES } from "../../data/courses";

const EASE = [0.16, 1, 0.3, 1];
const AUTO_ADVANCE_MS = 4000;

export default function Courses() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => setIndex((i) => (i + 1) % COURSES.length), []);
  const prev = () => setIndex((i) => (i - 1 + COURSES.length) % COURSES.length);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(next, AUTO_ADVANCE_MS);
    return () => clearInterval(timer);
  }, [paused, next]);

  const course = COURSES[index];

  return (
    <section id="courses" className="py-24 lg:py-32 bg-white dark:bg-navy-800 overflow-hidden">
      <Container>
        <Reveal className="max-w-2xl mx-auto text-center mb-16">
          <Eyebrow>Our Courses</Eyebrow>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-semibold text-navy-900 dark:text-white text-balance">
            A Course for Every Stage of the Journey
          </h2>
          <p className="mt-5 text-navy-700/80 dark:text-white/70 leading-relaxed">
            From first letters to full memorization — structured learning paths designed around your pace, age, and goals.
          </p>
        </Reveal>

        <div
          className="relative max-w-2xl mx-auto"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-64 h-64 rounded-full bg-gold-200/30 blur-3xl" />
          </div>

          <div className="relative h-[340px] sm:h-[300px] flex items-center justify-center">
            <AnimatePresence mode="popLayout">
              <motion.div
                key={course.title}
                initial={{ opacity: 0, y: 46, scale: 0.92 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -46, scale: 0.92 }}
                transition={{ duration: 0.6, ease: EASE }}
                className="absolute inset-0"
              >
                <Tilt3D max={8} scale={1.015} className="h-full">
                  <Link
                    to="/courses"
                    className="glass block h-full rounded-3xl p-9 sm:p-10 shadow-3d hover:shadow-3d-hover transition-shadow duration-300 ease-premium flex flex-col justify-center text-center"
                  >
                    <motion.div
                      style={{ transform: "translateZ(40px)" }}
                      animate={{ y: [0, -6, 0] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                      className="w-16 h-16 rounded-2xl bg-gold-200/60 shadow-gold flex items-center justify-center mx-auto mb-6"
                    >
                      <Icon name={course.icon} className="text-gold-700" size={28} />
                    </motion.div>
                    <h3 style={{ transform: "translateZ(24px)" }} className="font-heading text-2xl font-semibold text-navy-900 dark:text-white mb-3">
                      {course.title}
                    </h3>
                    <p style={{ transform: "translateZ(14px)" }} className="text-sm sm:text-base text-navy-700/75 dark:text-white/70 leading-relaxed max-w-md mx-auto mb-5">
                      {course.description}
                    </p>
                    <span style={{ transform: "translateZ(24px)" }} className="inline-flex items-center justify-center gap-1 text-sm font-semibold text-gold-700">
                      See All Courses <span aria-hidden="true">→</span>
                    </span>
                  </Link>
                </Tilt3D>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex items-center justify-center gap-4 mt-8">
            <button onClick={prev} aria-label="Previous course" className="w-10 h-10 rounded-full border border-navy-900/15 dark:border-cream/10 flex items-center justify-center text-navy-700 dark:text-white/80 hover:bg-gold-500 hover:text-white hover:border-gold-500 transition-colors duration-300 ease-premium">
              <ChevronLeft size={16} />
            </button>
            <div className="flex gap-2">
              {COURSES.map((c, i) => (
                <button key={c.title} onClick={() => setIndex(i)} aria-label={`Go to ${c.title}`} className={`h-2 rounded-full transition-all duration-300 ${i === index ? "w-6 bg-gold-500" : "w-2 bg-navy-900/15"}`} />
              ))}
            </div>
            <button onClick={next} aria-label="Next course" className="w-10 h-10 rounded-full border border-navy-900/15 dark:border-cream/10 flex items-center justify-center text-navy-700 dark:text-white/80 hover:bg-gold-500 hover:text-white hover:border-gold-500 transition-colors duration-300 ease-premium">
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </Container>
    </section>
  );
}
